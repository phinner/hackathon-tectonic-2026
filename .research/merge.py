import json, glob, re, sys, os
root = "/home/finley/Documents/kode/hackathon-tectonic-2026"
tax = open(f"{root}/app/data/taxonomy.ts").read()
def ids(const):
    block = tax[tax.index(f"export const {const}"):]
    block = block[:block.index("];")]
    return set(re.findall(r'id: "([^"]+)"', block))
allowed = {
    "sectors": ids("sectors"), "roles": ids("roles"), "regions": ids("regions"),
    "provinces": ids("provinces"), "workTimes": ids("workTimes"), "contractTypes": ids("contractTypes"),
}
cats = {"offre", "restrictions", "contrat", "demarches"}
out, seen, problems = [], set(), []
for f in sorted(glob.glob(f"{root}/.research/docs/*.json")):
    try:
        data = json.load(open(f))
    except Exception as e:
        problems.append(f"{f}: {e}"); continue
    for d in data:
        did = re.sub(r"[^a-z0-9-]", "-", d.get("id", "").lower()).strip("-")
        if not did or did in seen or not d.get("url", "").startswith("http"):
            problems.append(f"{f}: skip {did!r}"); continue
        if d.get("category") not in cats or d.get("importance") not in ("legal", "guidance"):
            problems.append(f"{f}: bad enum {did}"); continue
        scope = {}
        for k, v in (d.get("scope") or {}).items():
            if k in allowed and isinstance(v, list):
                good = [x for x in v if x in allowed[k]]
                if len(good) != len(v): problems.append(f"{f}: {did} dropped scope {set(v)-set(good)}")
                if good: scope[k] = good
        seen.add(did)
        doc = {
            "id": did, "title": d["title"], "category": d["category"], "importance": d["importance"],
            "summary": d["summary"], "body": d.get("body") or [], "keywords": d.get("keywords") or [],
            "scope": scope, "source": d.get("source", ""), "url": d["url"],
            "owner": {"name": d.get("owner", {}).get("name", ""), "team": re.sub(r"^level:\s*", "", d.get("owner", {}).get("team", ""))},
            "lastValidated": d.get("lastValidated") if re.match(r"^\d{4}-\d{2}-\d{2}$", str(d.get("lastValidated"))) else "2026-09-30",
            "status": d.get("status") if d.get("status") in ("valide", "obsolete", "a-verifier") else "valide",
        }
        if d.get("replacedBy"): doc["replacedBy"] = d["replacedBy"]
        if d.get("conflictsWith"): doc["conflictsWith"] = d["conflictsWith"]
        out.append(doc)
known = {d["id"] for d in out}
for d in out:
    if d.get("replacedBy") and d["replacedBy"] not in known: del d["replacedBy"]; d["status"] = "valide"
    if d.get("conflictsWith"): d["conflictsWith"] = [c for c in d["conflictsWith"] if c in known] or None
    if d.get("conflictsWith") is None: d.pop("conflictsWith", None)
with open(f"{root}/app/data/sources.ts", "w") as fh:
    fh.write("// Généré par .research/merge.py à partir des recherches dans .research/docs. Ne pas éditer à la main.\n\n")
    fh.write('import type { Doc } from "./documents";\n\n')
    fh.write("export const sourceDocuments: Doc[] = " + json.dumps(out, ensure_ascii=False, indent=2) + ";\n")
print(len(out), "docs;", len(problems), "problems")
print("\n".join(problems[:60]))

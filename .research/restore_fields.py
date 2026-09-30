# Restores non-translatable fields (scope, url, ids...) from the committed version, matched by id.
import json, subprocess, glob, os
root = os.path.dirname(os.path.abspath(__file__))
keep = ["category", "importance", "scope", "url", "lastValidated", "status", "replacedBy", "conflictsWith"]
for f in sorted(glob.glob(f"{root}/docs/*.json")):
    rel = os.path.relpath(f, os.path.dirname(root))
    old = {d["id"]: d for d in json.loads(subprocess.check_output(["git", "show", f"HEAD:{rel}"], cwd=os.path.dirname(root)))}
    new = json.load(open(f))
    fixed = 0
    for d in new:
        o = old.get(d["id"])
        if not o: print("unknown id", rel, d["id"]); continue
        for k in keep:
            if o.get(k) != d.get(k):
                fixed += 1
                if k in o: d[k] = o[k]
                else: d.pop(k, None)
        if d.get("owner", {}).get("name") != o["owner"]["name"]: d["owner"]["name"] = o["owner"]["name"]; fixed += 1
    json.dump(new, open(f, "w"), ensure_ascii=False, indent=2)
    if fixed: print(rel, "restored", fixed)

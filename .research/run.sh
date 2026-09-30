#!/usr/bin/env bash
# usage: run.sh <name> <topic>
name="$1"; topic="$2"
dir=/home/finley/Documents/kode/hackathon-tectonic-2026/.research
prompt="$(cat "$dir/brief.md")

TASK NAME: $name
YOUR TOPIC: $topic

OUTPUT FILE: $dir/docs/$name.json"
codex exec --skip-git-repo-check --ephemeral -m gpt-6-astra \
  -c service_tier='"fast"' -c model_reasoning_effort='"medium"' -c web_search='"live"' \
  --dangerously-bypass-approvals-and-sandbox -C "$dir" "$prompt" > "$dir/logs/$name.log" 2>&1
echo "DONE $name exit=$? $(python3 -c "import json;print(len(json.load(open('$dir/docs/$name.json'))))" 2>&1)"

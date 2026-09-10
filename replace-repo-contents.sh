#!/bin/bash
# Run this from inside your cloned Etskyy/portfolio repo, with this project's
# unzipped folder as a sibling directory (adjust NEW_SITE_DIR below if not).
#
# WARNING: This also wipes git history entirely and force-pushes a single
# fresh commit. This is irreversible on GitHub once pushed — every prior
# commit on this repo becomes unrecoverable (unless someone has an older
# local clone). Only do this if you're sure you don't want the old history.
set -e

NEW_SITE_DIR="../loxton-dev"
REMOTE_URL="https://github.com/Etskyy/portfolio.git"   # change if you use SSH instead
BRANCH="main"

if [ ! -d "$NEW_SITE_DIR" ]; then
  echo "Can't find $NEW_SITE_DIR — update NEW_SITE_DIR at the top of this script."
  exit 1
fi

if [ ! -d ".git" ]; then
  echo "This doesn't look like a git repo (no .git folder here). Run this from inside your cloned portfolio repo."
  exit 1
fi

read -p "This will PERMANENTLY erase this repo's git history on GitHub. Type YES to continue: " CONFIRM
if [ "$CONFIRM" != "YES" ]; then
  echo "Aborted. Nothing was changed."
  exit 1
fi

# Wipe everything, including git history
find . -mindepth 1 -maxdepth 1 -exec rm -rf {} +

# Copy in the new project (including dotfiles like .gitignore, .github/)
cp -a "$NEW_SITE_DIR"/. .

# Start a brand new history
git init -b "$BRANCH"
git remote add origin "$REMOTE_URL"
git add -A
git commit -m "Rebuild site with Astro"

echo ""
echo "Ready to push. This is the irreversible step — it force-overwrites"
echo "everything currently on GitHub for this repo. Run when ready:"
echo "  git push --force origin $BRANCH"

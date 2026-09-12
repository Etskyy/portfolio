---
title: "Getting a clean Jupyter setup working"
date: 2026-08-20
tags: ["Python", "Machine Learning"]
project: "ifn580-machine-learning"
---

Lost more time than I'd like to admit getting the IFN580 group environment consistent
across machines. Skipped Anaconda in favour of a plain VS Code plus venv setup, which
mostly worked, aside from a PowerShell execution policy block on one machine and a
OneDrive-related rendering issue in Jupyter that turned out to be a sync conflict on the
notebook file itself.

Documented the working setup for the group so we're not troubleshooting the same three
issues twice before Assignment 1 preprocessing gets underway properly.

#!/usr/bin/env node

const basePath = __dirname;
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const out = exec("npm outdated", (err, res) => {
  const outdatedDependencies = res
    .split("\n")
    .slice(1)
    .slice(0, -1)
    .map((e) => e.split(" ").filter((e) => e !== ""))
    .map((e) => ({ name: e[0], currentVersion: e[1] }));

  if (!outdatedDependencies.length) {
    console.log("All updated.");
    return;
  }

  console.log(outdatedDependencies);

  const command =
    "npm install " +
    outdatedDependencies
      .map((e) => {
        if (e.currentVersion.includes("experimental")) {
          return `${e.name}@experimental`;
        }

        return `${e.name}@latest`;
      })
      .join(" ");

  console.log(command);
  exec(command, (err, res) => {
    if (err) console.error(String(err));
    console.log(String(res));
  });
});

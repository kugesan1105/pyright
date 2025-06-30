#!/usr/bin/env node
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// Stash the base directory into a global variable.
global.__rootDirectory = __dirname + '/dist/';
console.log('Using root directory:', global.__rootDirectory);
require('./dist/pyright');

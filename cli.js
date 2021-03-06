#!/usr/bin/env node
'use strict';

var argv = require('optimist')
.usage('Usage: $0 --repo [git@bitbucket.org:your/dedicated/node_modules/git/repository.git] --verbose --cross-platform')
.describe('verbose', '[-v] Print progress log messages')
.describe('repo', 'git url to repository with node_modules content')
.describe('cross-platform', 'do not archive platform-specific files in node_modules')
.describe('incremental-install', 'start npm install with last node_modules instead of clearing them')
.describe('production', 'start npm install with production flag')
.describe('check-all-json-elements', 'Sha-1 calculated from all elements in package.json instead of only dependencies and devDependencies')
.alias('v', 'verbose')
.demand(['repo']).argv;

var checkoutNodeModules = require('./lib/checkout-node-modules');

checkoutNodeModules(process.cwd(), {
    verbose: argv.verbose,
    repo: argv.repo,
    crossPlatform: argv['cross-platform'],
    incrementalInstall: argv['incremental-install'],
    production: argv['production'],
    checkAllJsonElements: argv['check-all-json-elements']
})
.then(function () {
    process.exit(0);
})
.catch(function (error) {
    process.exit(1);
});

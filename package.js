Package.describe({
  name: 'purepattern:fullreact',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Full react transforms every collection in a list into an reactive array using observe-js',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/PurePattern/meteor-fullreact',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('purepattern:classjs@0.0.1');
  api.addFiles('fullreact.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('purepattern:fullreact');
  api.addFiles('fullreact-tests.js');
});

// ==UserScript==
// @description Replaces java imports with links to the corresponding file on github (or google code).
// @name gitmonkey
//
// @match https://github.com/*/*/blob/*.java
// @match https://code.google.com/p/*/source/browse/*.java
// ==/UserScript==

function githubMain() {
  var lines = document.getElementsByClassName('line');
  // There should only be one line beginning with 'package'
  packagedef = tokenizeGithubPath(linesStartingWith(lines, 'package')[0]);
  var imports = linesStartingWith(lines, 'import');

  // Just assume everything is under "com.example" for now
  var rootPackage = packagedef.slice(0, 2);

  var currentFile = new RegExp(rootPackage.join('/') + ".*$");
  var baseUrl = document.URL.replace(currentFile, "");

  for (i=0; i<imports.length; i++) {
    var lchildren = imports[i].children;
    var imp = lchildren[lchildren.length-2]; // Final child is semicolon
    var impstr = imp.innerHTML.split('.');

    // If this file is under the package subset within this repo...
    if (JSON.stringify(impstr.slice(0, 2)) == JSON.stringify(rootPackage)) {
      var linkUrl = baseUrl + impstr.join('/') + '.java';
      imp.innerHTML = '<a href=' + linkUrl + '>' + imp.innerHTML + '</a';
    }
  }
}

function googleCodeMain() {
  var lines = document.getElementsByClassName('source');
  // There should only be one line beginning with 'package'
  packagedef = tokenizeGoogleCodePath(linesStartingWith(lines, 'package')[0]);
  var imports = linesStartingWith(lines, 'import');

  // Just assume everything is under "com.example" for now
  var rootPackage = packagedef.slice(0, 2);

  var currentFile = new RegExp(rootPackage.join('/') + ".*$");
  var baseUrl = document.URL.replace(currentFile, "");

  for (i=0; i<imports.length; i++) {
    var line = imports[i];
    var impstr = tokenizeGoogleCodePath(line);

    // If this file is under the package subset within this repo...
    if (JSON.stringify(impstr.slice(0, 2)) == JSON.stringify(rootPackage)) {
      var linkUrl = baseUrl + impstr.join('/') + '.java';
      var lchildren = line.children;
      // First element is 'import', final two are semicolon and trailing junk
      for (c=1; c<line.children.length-2; c++) {
        lchildren[c].innerHTML = '<a href=' + linkUrl + '>' + lchildren[c].innerHTML + '</a';
      }
    }
  }
}

function tokenizeGithubPath(line) {
  var toks = Array.prototype.slice.call(line.children, 1, -1);
  return removePeriodsAndTrim(toks);
}

function tokenizeGoogleCodePath(line) {
  var toks = Array.prototype.slice.call(line.children, 1, -2);
  return removePeriodsAndTrim(toks);
}

function linesStartingWith(lines, word) {
  var ret = [];
  for (i=0; i<lines.length; i++) {
    var line = lines[i];
    if (line.children[0].innerHTML == word) {
      ret.push(line);
    }
  }
  return ret;
}

function removePeriodsAndTrim(tokens) {
  var ret = [];
  for (toki=0; toki<tokens.length; toki++) {
    var text = tokens[toki].innerHTML.trim();
    if (text != '.') {
      ret.push(text);
    }
  }

  return ret;
}

function main() {
  var googlePattern = 'https://code.google.com/';
  var githubPattern = 'https://github.com/';

  if (document.URL.slice(0, googlePattern.length) == googlePattern) {
    googleCodeMain();
  } else if (document.URL.slice(0, githubPattern.length) == githubPattern) {
    githubMain();
  }
}

main();

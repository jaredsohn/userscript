// ==UserScript==
// @name            GitHub hide pull requests from issues page
// @description     There's a separate pull request page, I see no point to have pull requests on issues page.
// @icon            https://github.com/favicon.ico
// @version         0.1.0
// @namespace       http://jakub-g.github.io/
// @author          http://jakub-g.github.io/
// @downloadURL     https://raw.github.com/jakub-g/greasemonkey-userscripts/master/github/noPullsInIssueList.user.js
// @userscriptsOrg  http://userscripts.org/scripts/show/...
// @grant none
// @include         http*://github.com/*/*/issues*
// ==/UserScript==

"use strict";

/**
 * Removes <a>'s from issue list if they point to pull request
 */
var prRemover = function () {
    var issues = document.querySelectorAll('.issue-list-group > li');

    Array.prototype.forEach.call(issues, function(iss){
      var a = iss.querySelector('a.js-navigation-open');
      // a && console.warn(a.href + !!a.href.match(/\/pull\//));
      if (a && a.href && !!a.href.match(/\/pull\//)) {
        iss.style.display = 'none';
      }
    });
};

/**
 * Mutation handler that listens to the Ajax-based changes in issue list.
 * Perhaps there's a more performant way to do it but it would probably require digging into GH's code.
 */
var mutationHandler = function(onMutationCb) {
    // select the target node
    var target = document.querySelector('#issues_list');

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        onMutationCb();
      });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
};

var main = function () {
    prRemover();
    mutationHandler(prRemover);
};

main();

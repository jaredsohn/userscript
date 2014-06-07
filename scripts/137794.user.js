// ==UserScript==
// @name           Github: Pull Request Links
// @namespace      https://github.com/skratchdot/github-pull-request-links.user.js
// @description    A user script to "linkify" the to/from branches on Pull Request pages.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-pull-request-links.user.js/raw/master/github-pull-request-links.user.js
// @updateURL      https://github.com/skratchdot/github-pull-request-links.user.js/raw/master/github-pull-request-links.user.js
// @version        1.3
// ==/UserScript==
/*global jQuery */
/*jslint browser: true */

/*
 * This function attempts to create links on the branch names
 * in pull requests.  It will only work if both branches use the
 * same repository name.  The repository name is grabbed from "source"
 * (i.e. the .js-current-repository selector).  We generate a link in the
 * format:
 * 
 *	/USERNAME/REPO/tree/BRANCH_NAME
 *
 *		USERNAME : grabbed from the .commit-ref selector. The 1st part of the string (split by colon).
 *		REPO : grabbed from the .js-current-repository selector
 *		BRANCH_NAME : grabbed from the .commit-ref selector. The 2nd part of the string (split by colon).
 * 
 */
(function () {
    'use strict';
    jQuery('.commit-ref').not('.editor-expander').css('cursor', 'pointer').click(function () {
        var repo = jQuery('.js-current-repository').text(),
            commitInfo = jQuery(this).text().trim().split(':');
        // When pull requests are coming from the same account, we need to make sure commitInfo[0]
        // is the account, and commitInfo[1] is the branch name.
        if (commitInfo.length === 1) {
            commitInfo = [jQuery('a.js-current-repository').attr('href').split('/')[1], commitInfo[0]];
        }
        if (repo.length > 0 && commitInfo.length === 2) {
            document.location = '/' + commitInfo[0] + '/' + repo + '/tree/' + commitInfo[1];
        }
    });
}());
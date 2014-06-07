// ==UserScript==
// @name           GitHub: gh-pages Link
// @namespace      https://github.com/skratchdot/github-gh-pages-link.user.js
// @description    If a repository has a gh-pages branch, then this will add links to the Github Page, as well as the gh-page source code.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @grant          none
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-gh-pages-link.user.js/raw/master/github-gh-pages-link.user.js
// @updateURL      https://github.com/skratchdot/github-gh-pages-link.user.js/raw/master/github-gh-pages-link.user.js
// @version        1.1
// ==/UserScript==
/*global jQuery, moment */
/*jslint browser: true, plusplus: true */

(function () {
	'use strict';

	// onDomReady : setup our page
	jQuery(document).ready(function () {
		var repo = jQuery('a.js-current-repository:first'),
			repoDescHomepage = jQuery('.repo-desc-homepage:first'),
			ghPage = jQuery('.js-navigation-open[data-name="gh-pages"]:first'),
			ghPageLink = repo.attr('href'),
			ghPageLinkSplit;
		if (repo.length && repoDescHomepage.length && ghPage.length && typeof ghPageLink === 'string') {
			// Build gh-page link
			ghPageLinkSplit = ghPageLink.split('/');
			if (ghPageLinkSplit.length !== 3) {
				return;
			}
			ghPageLink = 'http://' + ghPageLinkSplit[1] + '.github.com/' + ghPageLinkSplit[2];
			// Add html
			repoDescHomepage.append('<div style="margin-top:5px">' +
				'<span style="padding-right:5px;"><b>gh-pages:</b></span>' +
				'<span><a id="skratchdot-gh-pages-link" href="#"></a></span>' +
				'<span>&nbsp;&#8226;&nbsp;</span>' +
				'<span><a id="skratchdot-gh-pages-link-source" href="#">[gh-pages source]</a></span>' +
				'</div>');
			// Fix html
			jQuery('#skratchdot-gh-pages-link').attr('href', ghPageLink).text(ghPageLink);
			jQuery('#skratchdot-gh-pages-link-source').attr('href', ghPage.attr('href'));
		}
	});
}());
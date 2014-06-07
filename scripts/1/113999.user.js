// ==UserScript==
// @name           GameFAQs User Info Link in Header
// @namespace      OTACON120
// @version        1.1
// @description    Adds link to "Board User Info" page in site header
// @updateURL      http://userscripts.org/scripts/source/113999.meta.js
// @downloadURL    http://userscripts.org/scripts/source/113999.user.js
// @website        http://otacon120.com/user-scripts/gamefaqs-related/user-info-link-in-header/
// @include        http://*.gamefaqs.com/*
// @match          http://*.gamefaqs.com/*
// @grant          none
// ==/UserScript==

var welcomeMsg   = document.getElementsByClassName('masthead_strip')[0].getElementsByClassName('masthead_user')[0],
	userProfile  = welcomeMsg.getElementsByTagName('a')[0],
	userInfo     = document.createElement('a');

userInfo.href      = '/boards/user.php';
userInfo.innerHTML = 'User Info <i class="icon icon-th-list"></i>';

welcomeMsg.insertBefore(userInfo, userProfile.nextSibling);
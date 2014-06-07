// ==UserScript==
// @name           GameFAQs Feedback Link in Navigation
// @namespace      OTACON120
// @author         OTACON120
// @version        1.1
// @description    Adds a direct link to the GameFAQs feedback system into the site navigation
// @updateURL      http://userscripts.org/scripts/source/131026.meta.js
// @downloadURL    http://userscripts.org/scripts/source/131026.user.js
// @website        http://otacon120.com/user-scripts/gamefaqs-related/feedback-link-in-navigation/
// @include        http://www.gamefaqs.com/*
// @match          http://www.gamefaqs.com/*
// @grant          none
// ==/UserScript==

var feedbackLink = document.createElement('a'),
	navigation = document.getElementsByClassName('masthead_nav')[0].getElementsByTagName('nav')[0];

feedbackLink.href = '/features/feedback/';
feedbackLink.textContent = 'Feedback';

navigation.appendChild(feedbackLink);

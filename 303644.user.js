// ==UserScript==
// @name        twitter irccloud dark theme
// @namespace   twitter.irccloud.com
// @include     https://www.irccloud.com/*
// @version     1
// @grant       none
// @run-at document-end
// ==/UserScript==
thememeta = document.createElement('meta');
thememeta.name = 'twitter:widgets:theme';
thememeta.content = 'dark';

linkmeta = document.createElement('meta');
linkmeta.name = 'twitter:widgets:link-color';
linkmeta.content = '#fff';

head = document.getElementsByTagName('head')[0];

head.appendChild(thememeta);
head.appendChild(linkmeta);
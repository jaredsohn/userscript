// ==UserScript==
// @name       YouTube Logo-Link to Subscription Uploads
// @namespace  http://innovandalism.eu/
// @version    0.1
// @description  Change YouTube Logo Link to Subscription Uploads
// @match      http://*.youtube.com/*
// @match      http://youtube.com/*
// @match      https://*.youtube.com/*
// @match      https://youtube.com/*
// ==/UserScript==

document.getElementById('logo-container').href = '/feed/subscriptions/u';
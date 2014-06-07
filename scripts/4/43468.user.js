// ==UserScript==
// @name          Remove Chat in iGoogle
// @description   Removes the chat in iGoogle once it is disabled.
// @include       http://google.tld/ig*
// @include       http://*.google.tld/ig*
// @include       https://*.google.tld/ig*
// @include       https://google.tld/ig*
// @exclude       http://google.tld/ig/*
// @exclude       http://*.google.tld/ig/*
// @exclude       https://*.google.tld/ig/*
// @exclude       https://google.tld/ig/*
// ==/UserScript==
document.getElementById('enable_chat').style.display='none';
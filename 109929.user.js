// ==UserScript==
// @name           Reddit HTTPS
// @namespace      https://pay.reddit.com/user/MasterDefenestrator/
// @description    Re-write all links and form actions on Reddit to use HTTPS
// @include        http://www.reddit.com/*
// @include        https://pay.reddit.com/*
// ==/UserScript==

var forms = document.getElementsByTagName("form");
var links = document.getElementsByTagName("a");

for (var i = 0; i < forms.length; i++)
{
  forms[i].action = forms[i].action.replace(/^http:\/\/www.reddit.com/, "https://pay.reddit.com");
}

for (var i = 0; i < links.length; i++)
{
  links[i].href = links[i].href.replace(/^http:\/\/www.reddit.com/, "https://pay.reddit.com");
}
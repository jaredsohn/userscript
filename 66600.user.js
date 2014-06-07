// ==UserScript==
// @name           LibraryThing Talk and Groups Link Fixer
// @namespace      http://userscripts.org/users/brightcopy
// @description    Changes the main Talk link to always point to your posts and the Groups link to always point to your groups
// @include        http://*.librarything.tld/*
// @license        Public Domain
// ==/UserScript==

var link;

link = document.evaluate('//ul[@id="maintabs"]/li/a[@href="/talk"]',
    document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (link)
  link.setAttribute('href', '/talk.php?mode=yourposts');

link = document.evaluate('//ul[@id="maintabs"]/li/a[@href="/groups"]',
    document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (link)
  link.setAttribute('href', '/groups/yourgroups');

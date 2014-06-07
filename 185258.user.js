// ==UserScript==
// @name       Restore mSO name
// @namespace  http://scottbeeson.com
// @version    0.1
// @description  Adds your name back next to your gravitar
// @match      http://meta.stackoverflow.com/*
// @copyright  2012+, Scott Beeson
// ==/UserScript==

var identityDiv = $('.profile-me > div').first();
var fullname = identityDiv.attr('title');
identityDiv.append(fullname);
identityDiv.css('color', 'white');
identityDiv.css('vertical-align', 'top');
identityDiv.css('line-height', '34px');

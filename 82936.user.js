// ==UserScript==
// @name           Paperblog Redirect
// @namespace      http://userscripts.org/users/cyberdelia
// @description    Automatic redirect to original article on paperblog website.
// @include        http://*.paperblog.*/*
// @author         Timothée Peignier <timothee.peignier@tryphon.org>
// @copyright      2010
// @license        BSD License
// @version        0.1
// @lastupdated    2010-08-04
// ==/UserScript==
var url = document.getElementsByClassName('original')[0].href;
document.location.replace(url);
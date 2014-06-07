// ==UserScript==
// @name           What.CD Search in new Tab
// @namespace      What.CD
// @description    Open a new tab when searching something through the searchbar.
// @author         Z4ppy
// @include        https://what.cd/*
// @include        https://ssl.what.cd/*
// @grant          none
// @version        1.1
// @date           2013-03-09
// ==/UserScript==

/*
Changelog:
1.0    2012-01-15  Initial version
1.0.1  2012-08-27  Fix @include for https://what.cd
1.1    2013-03-09  Rewritten
*/

NodeList.prototype.forEach = Array.prototype.forEach;
var forms = document.querySelectorAll('#searchbars form');
forms.forEach(function(e) { e.target = '_blank' });
// ==UserScript==
// @name          Viadeo Fix
// @description   Removes the Join iframe that automatically appears when viewing a Viadeo profile
// @author        http://nils.hamerlinck.fr
// @version       1.0
// @include       http://*viadeo.com*
// ==/UserScript==

location.assign("javascript:$('join').remove();void(0)");

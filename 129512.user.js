// ==UserScript==
// @name          INSPIRE arxiv.org to in.arxiv India redirect
// @namespace     http://userscripts.org/users/442801
// @description   performs an arXiv to in.arxiv url substitution
// @author        Rob Atkinson
// @icon          http://home.fnal.gov/~atkinson/TR1/TR-1rf.jpg
// @identifier    http://userscripts.org/scripts/source/129512.user.js
// @source	  http://userscripts.org/scripts/show/129512
// @match         http://inspirehep*
// @match         http://arxiv.org/abs*
// @match         http://arxiv.org/ps*
// @match         http://arxiv.org/pdf*
// @match         http://arxiv.org/format*
// @include       http://inspirehep*
// @include       http://arxiv.org/abs*
// @include       http://arxiv.org/ps*
// @include       http://arxiv.org/pdf*
// @include       http://arxiv.org/format*
// @version       1.0
// ==/UserScript==

var rx = /(arxiv\.org)/gi;
var n = document.links.length;
var i=0;
for (var i=0; i<n+1; i++)
{
 var oldurl = document.links[i].href;
 document.links[i].href = oldurl.replace(rx, "in.$1");
}
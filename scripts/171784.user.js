// ==UserScript==
// @name           Search Digital-tunes releases by catalogue number on DB9
// @author         atagal, update by uohdontknow
// @include        htt*://www.digital-tunes.net*
// @grant unsafeWindow 
// @updateURL http://userscripts.org/scripts/source/171784.user.js
// @version        0.0.3
// @date           2014-03-04
// ==/UserScript==


var releases = document.getElementById("release-details");
textdivs = releases.getElementsByTagName("div");
var catno_orig = textdivs[3].innerHTML;
var text1 = catno_orig.search(/Cat. Num:/);
var catno_edit = catno_orig.substr(20,catno_orig.length);
var catnr = catno_edit.match(/[a-zA-Z0-9]+/);
catn1 = '<a target="_blank" title="Search on DB9" href="http://tracker.deepbassnine.com/torrents.php?cataloguenumber='+catnr+'">Cat. Num: '+catnr+'</a>';
textdivs[3].innerHTML = catn1;

// ==UserScript==
// @name          Via
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Log all referrers, and retrieve "via" links
// ==/UserScript==

/*
(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*/

var referrers = GM_getValue('referrers.' + location.href, '');
if(referrers.length) {
  referrers = referrers.split(' ');
} else {
  referrers = [];
}
if(document.referrer && referrers.indexOf(document.referrer) == -1) {
  referrers.push(document.referrer);
  GM_setValue('referrers.' + location.href, referrers.join(' '));
}
if(referrers.length) {
  GM_registerMenuCommand('Via', function() {
    var htmlParts = ['<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">',
                     '<title>Referrers for ' + document.title + '</title>',
                     '<ul>'];
    for(var c = 0, referrer; referrer = referrers[c]; c++) {
      htmlParts.push('<li><a href="' + referrer + '">' + decodeURI(referrer) + '</a></li>');
    }
    htmlParts.push('</ul>');
    var html = htmlParts.join('\n');
    GM_openInTab('data:text/html;charset=utf-8,' + encodeURI(html));
  });
}
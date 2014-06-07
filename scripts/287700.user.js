// ==UserScript==
// @name Middlecoin Filter
// @version 0.2
// @description Hides all but my addresses and displays time updated in local timezone.
// @match http://middlecoin.com/allusers.html
// @match http://www.middlecoin.com/allusers.html
// @match http://middlecoin2.s3-website-us-west-2.amazonaws.com/allusers.html
// @require http://code.jquery.com/jquery-latest.js
// @updateURL http://userscripts.org/scripts/source/287700.user.js
// ==/UserScript==
// Tips welcome - BTC:1MXEcXuqTp5ARQ8G9KLVCER3AAaWebw2q5

$("tbody tr").hide();
$("#1MXEcXuqTp5ARQ8G9KLVCER3AAaWebw2q5").parent().show();
//$("#YOURBTCADDRESS").parent().show();
//$("#YOURBTCADDRESS").parent().show();
//$("#YOURBTCADDRESS").parent().show();
var servertime = new Date($.trim($('#footer p').text().split('|')[0].replace('Page last updated ','')));
var localtime = 'Page last updated ' + servertime.toString();
$('#footer p').text(localtime);
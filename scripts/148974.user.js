// ==UserScript==
// @name        Wiener Börse#
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @namespace   wienerborse
// @description Wiener Börse script to highlight own shares
// @include     http://kurse.wienerborse.at/teledata_php/prices/dispatch_list.php?ISORT=A&PUSH=&ISORTMODE=0&CBELEM=0&MARKETTYPE=&TYPE=P&AUCLETTER=0&MARKETTYPE=&ISKEY=3
// @version     1
// ==/UserScript==

var $first = $("tr:first").siblings("tr").first();

var $elem = $("tr[title='ERSTE GROUP BANK AG']").css({"background-color": "yellow"}).detach();
$first.before($elem);
$elem = $("tr[title='ANDRITZ AG']").css({"background-color": "yellow"});
$first.before($elem);
$elem = $("tr[title='LENZING AG']").css({"background-color": "yellow"});
$first.before($elem);
$elem = $("tr[title='POLYTEC HOLDING AG']").css({"background-color": "yellow"});
$first.before($elem);
$elem = $("tr[title='VOESTALPINE AG']").css({"background-color": "yellow"});
$first.before($elem);
$elem = $("tr[title='ROSENBAUER INTERNATIONAL AG']").css({"background-color": "yellow"});
$first.before($elem);
$elem = $("tr[title='OMV AG']").css({"background-color": "yellow"});
$first.before($elem);
$elem = $("tr[title='TELEKOM AUSTRIA AG']").css({"background-color": "yellow"});
$first.before($elem);
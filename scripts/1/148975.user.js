// ==UserScript==
// @name        Börse Frankfurt
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @namespace   boersefrankfurt
// @description Börse Frankfurt highlighting
// @include     http://www.boerse-frankfurt.de/de/aktien/realtime-quotes#tab_id=dax
// @version     1
// ==/UserScript==

$("td a[href='/de/aktien/daimler+ag+ag+DE0007100000']").parent().parent().children("td").css({"background-color": "yellow"});
$("td a[href='/de/aktien/commerzbank+ag+ag+DE0008032004']").parent().parent().children("td").css({"background-color": "yellow"});
$("td a[href='/de/aktien/adidas+ag+ag+DE000A1EWWW0']").parent().parent().children("td").css({"background-color": "yellow"});
$("td a[href='/de/aktien/aareal+bank+ag+ag+DE0005408116']").parent().parent().children("td").css({"background-color": "yellow"});
// ==UserScript==
// @name           Whirlpool Thread QR Codes
// @namespace      http://tristanroberts.name/qrcodes
// @description    Adds a link to the QR code for a thread to allow you to keep reading on the go.
// @include        http://forums.whirlpool.net.au/forum-replies.cfm*
// ==/UserScript==

var code = "http://chart.apis.google.com/chart?chs=200x200&cht=qr&choe=UTF-8&chl=" + escape(document.location);
var elem = document.getElementById("breadcrumb").getElementsByTagName("li");
elem[elem.length - 1].innerHTML += " <small>(<a href=\"" + code + "\" target=\"_blank\">Q</a>)</small>";
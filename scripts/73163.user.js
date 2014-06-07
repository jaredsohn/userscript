// ==UserScript==
// @name           Appbrain QRCodes
// @namespace      http://goondroid.com
// @description    Adds QRCodes to the right sidebar of Android app pages on appbrain.com
// @details        I guess appbrain letting you queue applications to download at once is a "cool feature" but I don't really like that.
// @include        http://*.appbrain.com/app/*
// ==/UserScript==

var pname = window.location.pathname.match("[^/]+$");
var elem = document.getElementsByClassName('appPageRight')[0];
var market = "market://search?q=pname:"+pname;
var qrcode = "http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl="+market;
var newhtml = "<p><img src='"+qrcode+"' alt='qrcode'  /></p>";
elem.innerHTML = newhtml + elem.innerHTML;
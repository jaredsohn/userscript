// ==UserScript==
// @name           Cyrket QR fixer
// @namespace      http://darkfox.dk/
// @version        0.1
// @author         DarkFox
// @include        http://www.cyrket.com/p/*
// ==/UserScript==


function xpathFind (query) { return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }

(function(){
  var qrcodes = xpathFind("//img[@class='qrcode']");
  for (var i = 0; i < qrcodes.snapshotLength; i++) {
    var qr = qrcodes.snapshotItem(i);
    
    qr.style.width = "300px";
    qr.style.height = "300px";
    qr.parentNode.style.position = "absolute";
    qr.parentNode.style.right = "0px";
    qr.src = "http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl="+qr.parentNode.href;
  }
})();
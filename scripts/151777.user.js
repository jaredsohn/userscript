// ==UserScript==
// @name        Help Menu for Erply
// @namespace   erply.com
// @description Sidebar Menu with Links used specifically for Heartline Ministries.
// @include     https://*.erply.com/*
// @include     http://*.erply.com/*
// @exclude		https://*.erply.com/*/*popup.php*
// @version     1.7
// @grant       none
// ==/UserScript==

// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

var iconBarSpan    = document.evaluate("//*[@id='header_new_menu']/li[@id='generalSearch']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var node = iconBarSpan.snapshotItem(0);
node.outerHTML = '<li class="menulink noactivationnohoverable"><a href="#" id="heartlineHelpButton">Heartline</a></li>' + node.outerHTML;

var hiddenDiv = document.createElement("div");
hiddenDiv.innerHTML = '<div style="z-index:1000; height:400px; width:800px; border: 1px solid #666666; background: #FFF; text-align: left; position: absolute; top: 120px; left: 50%; margin-left: -400px; display:none" id="heartlineHelp">' +
		'<div style="padding: 10px 10px 10px 10px">' +
        '<h3><a href="http://erplytools.ryanalberts.com/heartline/index" target="_blank">Generate Barcode</a></h3><p>Link to generate our EAN-8 barcodes.</p>' +
		'<h3><a href="https://docs.google.com/spreadsheet/ccc?key=0AtK11EwEzjdMdC1zZmpUdWRrMUxLX3pBRUF3OTVSakE" target="_blank">Barcode Spreadsheet</a></h3><p>This has three sheets. (1) Explains the barcode system. (2) Artist - has the name of the artist with the 3 digit number association. (3) Style - the style name with the 3 digit number association.</p>' +
		'</div>' +
    '</div>';
	
document.body.insertBefore(hiddenDiv, document.body.firstChild);

$('#heartlineHelpButton').click(function(eventObject) {
    $('#heartlineHelp').toggle('slow');
    return false;
  });

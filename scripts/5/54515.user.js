// ==UserScript==
// @name           Revo4
// @namespace      weasel
// @include        http://www.revolutiontt.net/*
// ==/UserScript==
// Thx to clump for code help

// gets font node with "5.466 TB"
var uploaded = document.evaluate('//font[text()="Uploaded:"]/following-sibling::font',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
// gets font node with "3.420 TB"
var downloaded = document.evaluate('//font[text()="Downloaded:"]/following-sibling::font',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
// convert to numbers and subtract
var uploadedVal = Number(uploaded.innerHTML.replace(/[\s].*/,''));
var downloadedVal = Number(downloaded.innerHTML.replace(/[\s].*/,''));	

//* unit conversion
var uploadunits = uploaded.innerHTML.replace(/[\d.\s]*/,'');
var downloadunits = downloaded.innerHTML.replace(/[\d.\s]*/,'');
//*

var diff = ((uploadedVal*1) - (downloadedVal*1)).toFixed(3);
	
var difference = document.createElement('font');
difference.appendChild(document.createTextNode(' Difference: '));
var diffnode = document.createElement('font');
diffnode.setAttribute('color','lime');
diffnode.appendChild(document.createTextNode(diff+' '+uploadunits));
if (downloaded.nextSibling)
    downloaded.parentNode.insertBefore(diffnode,downloaded.nextSibling);
else
    downloaded.parentNode.appendChild(diffnode);
diffnode.parentNode.insertBefore(difference,diffnode);

//*
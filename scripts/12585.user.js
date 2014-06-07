// ==UserScript==
// @name          ShareaPic Plain Href Image Code
// @namespace     http://www.shareapic.net
// @description   Adds Plain Href Image Code to ShareaPic Album Pics
// @include       http://www.shareapic.net/*
// @include       http://shareapic.net/*
// ==/UserScript==

var iCode = document.getElementsByTagName('h2')[0];

if(iCode.textContent == "Image Code"){

	var singleLinkArr = [];

	var singleLinks = document.evaluate( '//a[@title= "Click for large image"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for (var s = 0; s < singleLinks.snapshotLength; s++){
		
		singleLinkArr.push(singleLinks.snapshotItem(s).href);

	}
	
	var afterHr = document.getElementsByTagName('hr')[1].nextSibling;
	
	var newT = document.getElementsByTagName('textarea')[0].cloneNode(false); 
	
	newT.id = 'gmLinks';

	afterHr.parentNode.insertBefore(newT, afterHr);	
	
	var b = document.createElement("b");
	
	b.id = 'newB';
	
	b.innerHTML = '<font size="-1">Plain Href</font>';
	
	afterHr.parentNode.insertBefore(b, document.getElementById('gmLinks'));	
	
	afterHr.parentNode.insertBefore(document.createElement("br"), document.getElementById('newB'));	
	
	afterHr.parentNode.insertBefore(document.createElement("br"), document.getElementById('newB').nextSibling);	
	
	afterHr.parentNode.insertBefore(document.createElement("br"), document.getElementById('newB').nextSibling);	
	
	afterHr.parentNode.insertBefore(document.createElement("br"), document.getElementById('gmLinks').nextSibling);
	
	var getNt = document.getElementById('gmLinks')
	
	for(var i=0; i<singleLinkArr.length; i++){
	
		getNt.value += singleLinkArr[i]+'\n';
	
	}	

}
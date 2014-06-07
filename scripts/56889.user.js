// ==UserScript==
// @name          Facebook Real Message Link
// @namespace     http://www.noteboxx.co.uk
// @description   Displays the pictures a normal A tag link within the new Facebook inbox interface. This can be used for opening inbox messages as new windows.
// @include       http://*facebook.com/*inbox/*
// @version       0.1 - 02nd September 2009
// ==/UserScript==

function addColumn(tblId)
{
	var a1 = document.createElement("a");
	var td1 = document.createElement("td");

	var aText = document.createTextNode("Click Link");
	a1.href="http://www.facebook.com/inbox/?ref=mb#/inbox/?folder=[fb]messages&tid="+tblId;
	a1.appendChild(aText);

	var table = document.getElementById(tblId);
	var newCell = table.rows[0].insertCell(-1);
	newCell.appendChild(a1);
}

function buildLinks(){

	var children = document.getElementById('gigaboxx_wrapper').getElementsByTagName('table');

	for (var i = 0; i<children.length;i++){
	  var item = children[i];
	  addColumn(item.id);
	}
}

buildLinks();
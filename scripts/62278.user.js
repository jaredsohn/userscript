// ==UserScript==
// @name           TH check/delete all
// @namespace      http://userscripts.org/users/110369
// @description    This is supposed to provide 'check all' and/or 'delete all' functionality to the inbox.
// @include        http://www.twilightheroes.com/messages-inbox.php
// ==/UserScript==

//If you want single-click deletion enabled, change the following value to true.
var youareadumbass=false;

var dfb;
var advTable = document.createElement("table");
var advRow = document.createElement("tr");
var advCell = document.createElement("td");
var zz=document.getElementsByTagName('form')[0];
advRow.insertBefore(advCell,null);
advTable.insertBefore(advRow,null);
zz.parentNode.insertBefore(advTable, zz);
if(youareadumbass)
	dfb='<input type="button" id="daButton" value="Delete All">';
else
	dfb='<input type="button" id="daButton" value="Check All">';
advCell.innerHTML=dfb;
var cfb=document.getElementById('daButton');
cfb.addEventListener("click",function(){xxx();},true);

function xxx(){
	var x=document.getElementsByName('delete[]');
	for(var y=0;y<x.length;y++)x[y].checked=true;
	if(youareadumbass)
		document.getElementsByTagName('form')[0].submit();}

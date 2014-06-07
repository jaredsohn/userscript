// ==UserScript==
// @name		IPTorrents - Modifications
// @description		The script works on www.iptorrents.com - it modifies and reduce size of the web. 
// @include		*iptorrents.com/*
// @namespace		http://userscripts.org/scripts/show/115121
// @downloadURL		https://userscripts.org/scripts/source/115121.user.js
// @updateURL		https://userscripts.org/scripts/source/115121.meta.js
// @version		1.9
// @author		Jasiek
// @grant		none
// ==/UserScript==


// VARS
var Regxp = new RegExp("iptorrents\.com\/torrents\/.*", "i");
var RegxpDet = new RegExp("iptorrents\.com\/details\.php.*", "i");

// OBJECTS
var BarTab = document.getElementById('Table_01');
var BarRow = BarTab.getElementsByTagName('tr')[3];
var BarCell = BarRow.getElementsByTagName('td')[0];
var Td1 = document.createElement('td');
var Td2 = document.createElement('td');

// BANER
BarCell.colSpan=20;
Td1.bgColor = ('#19191B');
Td1.width = "10";
Td1.innerHTML = "&nbsp;";   
Td2.bgColor = ('#19191B');
Td2.width = "10";
Td2.innerHTML = "&nbsp;"; 
BarRow.insertBefore(Td1,BarCell);
BarRow.appendChild(Td2);
var BarCell = BarRow.getElementsByTagName('td')[1];
var PocztaCell = BarRow.getElementsByTagName('td')[2];
//PocztaCell.width = "50";
BarTab.deleteRow(2);
BarTab.deleteRow(0);
var StaffRecommend = document.getElementsByTagName('table')[1];
if (location.href.match(Regxp))
{
	StaffRecommend.parentNode.removeChild(StaffRecommend);
}

// STATS from PROFILE BAR
if (BarCell.getElementsByTagName('b').length == 7)
{
	var UL_b = 3;
	var DL_b = 4;
}
if (BarCell.getElementsByTagName('b').length == 8)
{
	var UL_b = 4;
	var DL_b = 5;
}
var isGB = BarCell.getElementsByTagName('b')[UL_b].innerHTML.search(" GB") >= 0;
var isTB = BarCell.getElementsByTagName('b')[UL_b].innerHTML.search(" TB") >= 0;
if(isGB) var uploaded = parseFloat(BarCell.getElementsByTagName('b')[UL_b].innerHTML.replace(" GB",""));
if(isTB)
{
    var uploaded = parseFloat(BarCell.getElementsByTagName('b')[UL_b].innerHTML.replace(" TB",""));
	uploaded=uploaded*1000;
}
var isGB = BarCell.getElementsByTagName('b')[DL_b].innerHTML.search(" GB") >= 0;
var isTB = BarCell.getElementsByTagName('b')[DL_b].innerHTML.search(" TB") >= 0;
if(isGB) var downloaded = parseFloat(BarCell.getElementsByTagName('b')[DL_b].innerHTML.replace(" GB","")); 
if(isTB)
{
    var downloaded = parseFloat(BarCell.getElementsByTagName('b')[DL_b].innerHTML.replace(" TB",""));
	downloaded=downloaded*1000;
}
var diff = Math.round((uploaded-downloaded)*100)/100;
if (diff<0) diff='<font color="red">[ Ooops: <b>'+diff+' GB</b> ]</font>';
else diff='<font color="#00FF00">[ Safe: <b>'+diff+' GB</b> ]</font>';
BarCell.innerHTML = BarCell.innerHTML.replace('&nbsp;<a href="/peers/?u', diff +' &nbsp;<a href="/peers/?u');

// CATCH CLEAR NEW BUTTON and POPULAR TORRENTS
if (location.href.match(Regxp))
{	
	var allHrefs = document.links;
	for (var i = 0; i < allHrefs.length; i++)
	{   
		var s = allHrefs[i].href.match(/iptorrents\.com\/torrents\/(.*)mark_read$/i);
		if (s!=null) break;
   	}  
	BarCell.innerHTML = BarCell.innerHTML.replace('My Topics</a>','My Topics</a>&nbsp;&#8226;&nbsp;<b><a href="'+s[1]+'mark_read"><font color="orange">Clear NEW tag</font></a></b>');
	
	var kontener = document.getElementsByTagName('center')[0];
	var upform = document.getElementsByTagName('form')[1];
	if(kontener != null)
	{
		kontener.removeChild(upform.nextSibling);
	}
	
	var TorDiv = document.getElementById('torrents')
	var Torrenty = TorDiv.getElementsByTagName('table')[0];
	var BluRay720 = new RegExp(".*Blu-?Ray.*720p.*", "i");
	var BluRay720v2 = new RegExp(".*720p.*Blu-?Ray.*", "i");
	for (var j = 1; j < Torrenty.rows.length; j++)
	{
		if (parseInt(Torrenty.rows[j].cells[7].textContent) + parseInt(Torrenty.rows[j].cells[8].textContent) > 50)
		{
			var LinkStr = Torrenty.rows[j].cells[1].getElementsByTagName('a')[0].innerHTML;
			Torrenty.rows[j].cells[1].getElementsByTagName('a')[0].innerHTML = '<font color=yellow>'+LinkStr+'</font>';
		}
		
//My personal filter - you can use if you want :)
//		if (Torrenty.rows[j].cells[1].textContent.match(BluRay720) || Torrenty.rows[j].cells[1].textContent.match(BluRay720v2))
//		{
//			Torrenty.rows[j].setAttribute("bgcolor","MidnightBlue");
//		}
	}
}

// TITLE change for details
if (location.href.match(RegxpDet))
{
	for (var i = 1; i < 5; i++)
	{
		if (document.getElementsByTagName('table')[i].getAttribute("class")=="t0")
		{
			var TitleTab = document.getElementsByTagName('table')[i];
			break;
		}
	}
	var TitleRow = TitleTab.getElementsByTagName('tr')[0];
	var TitleCell = TitleRow.getElementsByTagName('td')[0];
	var s = TitleCell.textContent;
	document.title = TitleCell.textContent;
}
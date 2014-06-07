// Kids View!
// by    [ 6a159d036ab57cbcc4792bdb7558aa87 ]
// email [ cc4f81976a953f51937c812f575e71d9 ]
// version 0.2 BETA!
// 2007-05-11
// Copyright (c) 2007, DWL
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kids View!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kids View!
// @namespace     guru 
// @description   view kids web bbs
// @include       http://kids.kornet.net/*
// @include       http://kidsb.net/*
// ==/UserScript==

var help = 
"h : show help (this popup)\n" +
"p/n : previous/next article/page\n" +
"<num>+enter(only article list mode) : go to the number\n" +
"z : go to the recent article\n" + 
"r/enter/space(only article list mode) : read article\n" +
"q/i : quit reading\n" +
"s : select board\n" +
"c : censor on/off\n" +
"d : denial list\n" + 
"m : boss mode\n" +
"o : google.com\n"
;


var censorlist = new Array(
	"미칭게이",
	"김용옥",
	"Symond",
	"미친게이",
	"samsik"
	
);

var boardlist = "http://kidsb.net/blist.html";
//var boardlist = "http://kidsb.net/cgi-bin/Boardlist?blistsortbyname";

var censormode = true;

(function() {

// Constants
var glIsMain=false;
var idx = 1;
var site = 0;
var togo = 0;

// read cookie
	var cookiename = "KidsCensor=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(cookiename) == 0) 
		{ 
			c.substring(cookiename.length,c.length);
			if(c.match("true"))
			{
				censormode = true;
				break;
			}
		else if(c.match("false"))
			{
				censormode = false;
				break;
			}
	}
}

if(window.location.href.match('blist')) {site = 1; idx = 15;}
else if(window.location.href.match('Article')) {site = 3; idx = 3;}
else if(window.location.href.match('Boardname')) 	{site = 2;  idx = 6;}

var allCenters = document.getElementsByTagName('center');
if(allCenters.length > 0)
	var ct = allCenters[allCenters.length - 1];
	if(encodeURIComponent(ct.textContent).match(encodeURIComponent("키 즈 는")))
	{
		ct.textContent = ct.textContent.replace("키 즈 는", "키 즈 는 " + censorlist.length + " 명 을 제 외 한");
	}
	

if(site == 2)
{
	if(censormode)
	{
		var censored = 0;
		var allTables = document.getElementsByTagName('tr');
		for (var i = 0; i < allTables.length; i++) {
			var thisTable = allTables[i];
			var allTds = thisTable.getElementsByTagName('td');
			for(var j = 0 ; j < censorlist.length; j++) {
				if(encodeURIComponent(allTds[1].textContent).match(encodeURIComponent(censorlist[j])))
				{	
						thisTable.parentNode.removeChild(thisTable);
					//var str = encodeURIComponent(thisTable.textContent);
					//thisTable.textContent =str;
					i--;
					censored ++;
					break;
				}
								
			}
			var allhp = allTds[2].getElementsByTagName("a");
			var newhp;
			if(allhp.length > 0)
			{
				newhp = document.createTextNode(allhp[0].textContent);
				allhp[0].parentNode.replaceChild(newhp, allhp[0]);
			}
		}
		document.body.innerHTML += "<center> " + censored + "개의 문서가 검열되었음 </center>";
	}
	else
	{
		document.body.innerHTML += "<center> 검열 모드 정지 중 </center>";
	}
}
else if(site == 3 && censormode)
{ 
	var allTexts = document.getElementsByTagName("PRE");
	for(var j = 0 ; j < censorlist.length; j++) {
		var str = ": " + censorlist[j];
		if(allTexts.length > 0)
		{
			var txt = allTexts[0];
			if(encodeURIComponent(txt.textContent).match(encodeURIComponent(str)))
			{
				txt.textContent = "**** 검열된 문서 *****";
			}
		}
	}
}

var allLinks = document.getElementsByTagName('a');
if(site == 2 && (window.location.href.match("Position=P") || window.location.href.match("Position=L"))) idx = allLinks.length - 1;
idx = idx % allLinks.length;
m = allLinks[idx];
m.textContent = "***"+m.textContent;
window.addEventListener('keydown', keyHandler, false);

function keyHandler(event) {
    
  if ( event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
    return false;
  }

	if(site == 2)
	{
		if(event.keyCode >= 48 && event.keyCode <= 57) // numbers
		{
			togo = togo*10 + event.keyCode - 48;
			if(togo > 1000000000) togo = 0; // overflow prevention, I hope Kids remains forever even to have such number of articles
		}
		var base = window.location.href;
		var pos = base.lastIndexOf("=");
		base = base.substring(pos + 1, base - pos - 1);

		if(event.keyCode == 13) // enter
		{
			document.location.href = base + "P" + togo;
		}
		if(event.keyCode == 90) // z
			document.location.href = allLinks[5].href;
	}
		

  if(event.keyCode == 79) // o
  {
	document.location.href="http://www.google.com";
  }
 
  if(event.keyCode == 77) // m
  {
	if( document.body.style.display == "none")
		document.body.style.display = "block";
	else
		document.body.style.display = "none";
  }

  if(event.keyCode == 82 || (site == 2 && event.keyCode == 32) || (site != 2  && event.keyCode == 13)) // r, space, enter
	document.location.href = allLinks[idx].href;

  if(event.keyCode == 81 || event.keyCode == 73) // q, i
	{
		if(site == 1)
			document.location.href = "http://kidsb.net";
		else if(site == 2)
			document.location.href = boardlist;
		else if(site == 3)
		{
			var addr = document.location.href;
			addr = addr.replace("Article", "Boardname");
			document.location.href = addr;
		}
	}
	
	
	if(event.keyCode == 72)  // h
		alert(help);
	
	if(event.keyCode == 67)  // c
	{
		censormode = !censormode;
		if(censormode) 
			document.cookie = "KidsCensor=true; path=/";
		else
			document.cookie = "KidsCensor=false; path=/";
		document.location.reload();
	}
	
	if(event.keyCode == 83)  // s
		document.location.href = boardlist; 

  if(event.keyCode == 80) // p
  	if(site == 2)
			document.location.href = allLinks[3].href;
		else if(site == 3)
			document.location.href = allLinks[4].href;

  if(event.keyCode == 78) // n
		if(site == 2)
			document.location.href = allLinks[4].href;
		else if(site == 3)
			document.location.href = allLinks[3].href;

  if(event.keyCode == 74 || event.keyCode == 75) // j,k
  {
	
		idx = idx % allLinks.length;
	  	me = allLinks[idx];
	me.textContent = me.textContent.replace("***","");
  }
  
  if(event.keyCode == 68)
  {
  	var txt;
  	if(censorlist.length == 0)
  		txt = "검열 목록 없음";
  	else
  	{
  		txt = censorlist[0];
  		for(var i = 1; i < censorlist.length; i++)
  			txt = txt + "\n" + censorlist[i];
  	
  	}
  	alert(txt);
  }

  if (event.keyCode == 74)
  {
  	if(++idx >= allLinks.length)
  	{
  			idx = 0;
  			if(site == 2)
  				document.location.href = allLinks[4].href;
  	}
  }
  if (event.keyCode == 75) 
  {
	 	if(--idx<0) 
  	{
  	 	idx = allLinks.length-1;
  	 	if(site == 2)
  	 		document.location.href = allLinks[3].href;
  	}
  }
	
		
  if(event.keyCode == 74 || event.keyCode == 75)
  {
	//idx = idx % allLinks.length;
  	me = allLinks[idx];
	me.textContent = "***"+me.textContent;
	me.focus();
  }

  return false;
}

})();

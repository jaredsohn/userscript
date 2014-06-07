// ==UserScript==
// @name           Icon Helper
// @namespace      avxavxavx.newgrounds.com
// @description    Creates a helpful interface for icon mods.
// @include        http://*.newgrounds.com/flashicons
// @include        http://www.newgrounds.com/iconhelpers.php
// ==/UserScript==

var loc = String(document.location);
var username = String(document.location);
username = username.substring(username.indexOf("http://")+7, username.indexOf(".newgrounds.com"));
if(loc.indexOf("/flashicons") > -1)
{
	var icons = document.getElementsByTagName('img');
	var noIcons = new Array();
	var noLinks = new Array();
	var flashes = document.getElementsByTagName('a');
	var ache = document.getElementsByTagName('h1');
	var styles = document.getElementsByTagName('style');	
	styles[0].innerHTML = "a { text-decoration:none } body {background-color: #25272D; color: #FFF;} .red { color: #FF0000; }";	
	var missing = 0;
	if(flashes.length == 0)
	{
		var backto = document.createElement('a');
		backto.setAttribute('href', '');
		document.body.appendChild(backto);
		flashes[0] = backto;
	}
	for(var i = 0; i < icons.length; i++) {
		if(icons[i].src == "http://picon.ngfiles.com/icon_default.gif") {
			icons[i].src = displayIcon(flashes[i*2].href);
			noIcons.push(icons[i]);
			noLinks.push(flashes[i*2]);
			noLinks.push(flashes[(i*2)+1]);
			missing++;
		}
	}
	for(var i = 0; i < icons.length; i++) {
		if(i < missing) {
			icons[i].addEventListener('error', function (e) {this.src = "http://picon.ngfiles.com/icon_default.gif";}, false);
			icons[i].src = noIcons[i].src;
			icons[i].width = 90;
			icons[i].height = 90;
			icons[i].style.border = "2px solid black";
			icons[i].alt = "No 46x46 icon!";					
			var tempIn = noLinks[i*2].innerHTML;
			flashes[i*2].href = noLinks[i*2].href;
			flashes[(i*2)+1].href = noLinks[(i*2)+1].href;
			flashes[i*2].innerHTML = '<FONT style="COLOR: #FFCC00; FONT-WEIGHT: bold; font-family: Tahoma">'+tempIn+'</FONT>';
			flashes[i*2].target = "_blank";
			flashes[(i*2)+1].innerHTML = '<FONT style="COLOR: #FFFFFF; FONT-WEIGHT: bold; font-family: Tahoma">[<span class="red">Add Icon</span>]</FONT>';
			flashes[(i*2)+1].target = "_blank";
		} else {
			icons[i].src = "";
			flashes[i*2].innerHTML = "";
			flashes[(i*2)+1].innerHTML = "";
		}
	}
	if(missing > 0)
		ache[0].innerHTML = '<FONT style = "text-shadow: 2px 2px 4px gray; font-family: Tahoma">There are '+missing+' missing icons!</FONT>';
	else {
		ache[0].innerHTML = '<FONT style = "text-shadow: 2px 2px 4px gray; font-family: Tahoma">There are no missing icons here.</FONT><br><a href="http://'+username+'.newgrounds.com/"><FONT style="COLOR: #FFFFFF; FONT-WEIGHT: bold; font-family: Tahoma; font-size: 0.5em">[<span class="red">User Page</span>]</FONT></a> <a href="http://www.newgrounds.com/iconhelpers.php"><FONT style="COLOR: #FFFFFF; FONT-WEIGHT: bold; font-family: Tahoma; font-size: 0.5em">[<span class="red">Icon Helpers</span>]</FONT></a>';
	}	
	var favicon = document.createElement('link');
	favicon.setAttribute('rel', 'shortcut icon');
	favicon.setAttribute('type', 'image/png');
	favicon.setAttribute('href', 'http://img.ngfiles.com/favicon.ico');
	document.body.appendChild(favicon);
} else if(loc.indexOf("/iconhelpers") > -1) {
	var tables = document.getElementsByTagName('td');
	for(var i = 0; i < tables.length; i++)
	{
		if(tables[i].className == "which")
		{
			tables[i].childNodes[0].target = "_blank";
		}
	}
}
function displayIcon(URL)
{
	var pIndex = URL.indexOf("w/") + 2;
	var pNum = parseInt(URL.substring(pIndex, URL.length));
	if(pNum < 1000)
		pIndex = 0;
	else {
		var breaker = String(pNum);
		pIndex = parseInt(breaker.substring(0, breaker.length-3));
		pIndex *= 1000;
	}
	return 'http://picon.ngfiles.com/' + pIndex + '/portal_' + pNum + '.gif';
}
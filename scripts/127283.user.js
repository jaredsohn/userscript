// ==UserScript==
// @name           Beeradvocate Beer Goggles
// @namespace      http://userscripts.org/users/438563
// @description    To clean up and reorganize some of the beeradvocate data
// @include        http://*.beeradvocate.com/*
// @grant       none
// ==/UserScript==
console.log('This script grants no special privileges, so it runs without security limitations.');


var tabdata = document.getElementsByTagName('td');
var tables = document.getElementsByTagName('table');
//var divs = document.getElementsByTagName('div');
//var links = document.getElementsByTagName('a');


for (i=0; i<tables.length; i++)
{
	if (tables[i].width == 775) {tables[i].width = '100%';}
	if (tables[i].cellPadding == 5) {tables[i].width = '100%';}

}

for (i=0; i<tabdata.length; i++)
{
	//if (tabdata[i].id == 'sidebarRight') {tabdata[i].style.display = 'none';}
	if (tabdata[i].width == 125) {tabdata[i].style.display = 'none';}
	if (tabdata[i].firstChild.wholeText == '\nTHE BROS\n') {tabdata[i].style.display = 'none';}
	//if (tabdata[i].firstChild.wholeText == '\nBA SCORE\n') {tabdata[i].style.display = 'none';}
	if (tabdata[i].id == 'mainContent') {tabdata[i].width = '1024px';}
	if (tabdata[i].width == '33%') {tabdata[i].width = '50%';}

}
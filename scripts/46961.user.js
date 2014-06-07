// ==UserScript==
// @name           Netload Folder Links Only
// @namespace      freakz
// @description    Gives you just the links in a NetLoad.in Folder
// @include        http://netfolder.in/folder.php?folder_id=*
// @version        0.1
// ==/UserScript==

var links = document.getElementsByTagName('form')[0].getElementsByTagName('input')[0].value.split(',');
var i = links.length - 1;
var newbd = "";

while (i >= 0){
	newbd = newbd + links[i] + "<br>";
	i -= 1;
}

document.getElementsByTagName('body')[0].innerHTML = newbd;
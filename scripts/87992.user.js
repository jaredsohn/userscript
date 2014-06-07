// ==UserScript==
// @name           autoselect kotnet
// @namespace      http://userscripts.org/users/synck
// @description    autoselect university @ kotnet login
// @include        https://netlogin.kuleuven.be/
// @license        Creative Commons Attribution-NonCommercial-ShareAlike
// ==/UserScript==

var uniList = document.getElementById('inst');		//store list in variable

uniList.selectedIndex = "0";						//select first item in list (GroupT)
document.getElementsByTagName('form')[1].submit();	//submit form



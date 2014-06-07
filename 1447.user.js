// ==UserScript==
// @name          TEM pwnz ER
// @namespace     http://loucypher.wordpress.com/
// @include       http://extensionroom.mozdev.org/more-info*/*
// @description	  Adds search The Extensions Mirror on Extension Room. Screenshot: http://xrl.us/gwg2
// ==/UserScript==
// Changelog:
// 2005-08-04 - Changed search form to search link on install box
// 2006-07-11 - Fixed my careless


var main = document.getElementById('main');
var icon = main.getElementsByTagName('div')[1];
var extName = main.getElementsByTagName('h3')[0].firstChild.nodeValue;
var tem = document.createElement('a');
    tem.setAttribute('href', 'http://www.extensionsmirror.nl/index.php?act=Search&CODE=01' +
      '&keywords=' + extName + '&forums=20&searchsubs=1&results_type=topics');
  //tem.setAttribute('target', '_blank'); //open in new window/tab (optional)
    tem.setAttribute('style', 'float: left; margin-right: 1em');
    tem.innerHTML = '<img src="http://www.extensionsmirror.nl/logo/button1.jpg"' +
      ' alt="Find in TEM"' +
      ' title="Find ' + extName + ' in The Extensions Mirror" border="0">'
icon.insertBefore(tem, icon.firstChild);


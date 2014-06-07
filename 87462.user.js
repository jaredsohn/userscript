// ==UserScript==
// @name           Teletext
// @namespace      david.tools
// @include        http://www.teletext.ch/*
// ==/UserScript==
function  hideElementById(elementIdToIde)
{
	document.getElementById(elementIdToIde).style.display = 'none';
}

var divs = document.getElementsByTagName('div');
console.log(divs[1]);
divs[1].style.left = '0';
divs[1].style.top = '0';
divs[1].style.width = '0';
divs[1].style.marginLeft = '0';
divs[1].style.marginTop = '0';

document.getElementById('OUTLINE').style.height = '0';

hideElementById('TOPRIGHTADD');
hideElementById('FOOTER');
hideElementById('TOPLEFTADD');
hideElementById('TOPNAVI');
hideElementById('METANAVI');
hideElementById('MAINLEFTADD');

hideElementById('TOPADD');
hideElementById('MAINNAVIIMAGE');
hideElementById('DROPDOWNNAVI');
hideElementById('MAINNAVITEXT');
hideElementById('BOTTOM');

hideElementById('DROPDOWNNAVIIMAGE');
hideElementById('DROPDOWNNAVI');
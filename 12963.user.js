// ==UserScript==
// @name           Rastafari LMS Theme Image Fix
// @namespace      lms
// @include        https://my.neumont.edu/*
// @description    Updates the images at the top of the Neumont LMS to work with the Rastafari user style sheet
// ==/UserScript==

document.onLoad = fixLayout();
function fixLayout()
{
	//grab the elements we need
	var body = document.getElementsByTagName("body")[0];
	var titleImg = document.getElementsByTagName("img")[0];
	var topTable = document.getElementsByTagName("table")[0];
	var tDs = document.getElementsByTagName("td");

	//set the top image attributes
	topTable.setAttribute("style","background-color:#006F05;background:url(http://murz.net/lms_images/lms.gif);");
	titleImg.setAttribute("src","http://murz.net/lms_images/lms_title.gif");
	
	//create my 'tag'
	var tag = document.createElement('div');
	var red = document.createElement('div');
	var green = document.createElement('div');
	var yellow = document.createElement('div');
	var text = document.createElement('p');
	var links = document.createElement('p');
	tag.setAttribute("style","width:200px;height:30px;background:#333;border:2px solid #fff;");
	tag.setAttribute("id","tag");
	red.setAttribute("style","width:10px;height:30px;background:#AF1515;float:left;");
	yellow.setAttribute("style","width:10px;height:30px;background:#EFC400;float:left;");
	green.setAttribute("style","width:10px;height:30px;background:#006F05;float:left;");
	text.setAttribute("style","float:left;color:#fff;font-weight:bold;font-size:10px;margin:2px 0px 0px 10px;");
	text.innerHTML = "Theme coded by Mike Murray";
	links.setAttribute("style","float:left;color:#fff;font-weight:bold;font-size:10px;margin:0px 0px 0px 10px;");
	links.innerHTML = "using <a href='http://userstyles.org'>UserStyles</a> and <a href='http://addons.mozilla.org/firefox/748'>GreaseMonkey</a>";
	
	//add tag to body
	tDs[tDs.length - 1].appendChild(tag);
	
	//add elements to tag
	tag.appendChild(red);
	tag.appendChild(green);
	tag.appendChild(yellow);
	tag.appendChild(text);
	tag.appendChild(links);
}
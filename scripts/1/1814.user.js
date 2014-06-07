// ==UserScript==
// @name		HinduPrinterFriendly
// @description		Converts links to hindu.com as printer friendly link.
// @namespace     	http://saravan.blogspot.com
// @version		2005-11-6
// @include		http://*
// ==/UserScript==
// 
// Comments/Suggestions ? saravanannkl at gmail dot com
//
// Tested with
// 	Firefox 1.0.7/Greasemonkey 0.53
// 	Firefox 1.5 RC2/Greasemonkey 0.6.1.4
//	Internet Explorer 6/Turnabout Advanced Version 0.3.1.0 Build 4
//		- Printer friendly page formatting may not work in IE.
// 
// ChangeLog
// 2005-11-16
//	Added support for Business Line website.
//	Imporved printer friendly formatting.
// 2005-10-29
//	Added formatting for printer friendly page.
// 2005-09-24
//	First Release.
//
// BEGIN LICENSE BLOCK
// Copyright (C) 2005 Saravana Kumar
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You can download a copy of the GNU General Public License at
// http://www.gnu.org/licenses/gpl.txt
// or get a free printed copy by writing to the Free Software Foundation,
// Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
// 
// END LICENSE BLOCK 

// Ram registered all domain names with hindu on it.
// onra renda hindu host namegal
// yellaam host panna oru web server poadhumaa :D

var hinduHostNames = "www.hindu.com www.hinduonnet.com www.thehindu.com";
var blineHostNames = "www.blonnet.com www.thehindubusinessline.com";
var hinduPrinterPage = "http://www.hinduonnet.com/thehindu/thscrip/print.pl";
var numberRegExp = new RegExp("[0-9]+");
var hinduStoryFileFormat = new RegExp("[0-9]+.htm");

function addGlobalStyle(css) {
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild(elmStyle);
        elmStyle.innerHTML = css;
    } catch (e) {
        document.styleSheets[0].cssText += css;
    }
}

function rewriteLinks() {
	for (var i = document.links.length - 1; i >= 0; i--) {
		var elmLink = document.links[i];
		
		if (!elmLink.href || elmLink.pathname.indexOf("print.pl") != -1)
			continue;
		
		if(hinduHostNames.indexOf(elmLink.hostname) > -1)
			rewriteHinduLink(elmLink);
		else if(blineHostNames.indexOf(elmLink.hostname) > -1)
			rewriteBLineLink(elmLink);
	}
}

function rewriteHinduLink(elmLink) {
		var pathname = elmLink.pathname;
		if(pathname.charAt(0) == '/') pathname = pathname.substring(1);
						
		var pathSplit = pathname.split('/');

		if(pathSplit.length<4) return;

		var fileName = pathSplit[pathSplit.length-1];
		
		if(!hinduStoryFileFormat.test(fileName)) return;

		var prd ="th";

		if(!numberRegExp.test(pathSplit[0])) {
			prd = pathSplit[0];
			if( prd != "mp" && prd != "fr" && prd != "mag" && prd != "lr"
				&& prd != "op" && prd != "yw" && prd != "pp" && prd != "quest"
				&& prd != "edu" && prd != "br" && prd != "biz" && prd != "seta"
				&& prd != "lf" && prd !="thehindu")
			return;

			if(prd == "lf") prd = "thlf";
			if(prd == "quest") prd = "qu";
		}

		// Date format is different for the jobs page. so process it differently
		if(prd == "thehindu") {
			if(pathSplit[1]!="jobs")
				return;

			elmLink.href = hinduPrinterPage + "?file=" + fileName
							+ "&date=" + pathSplit[2] + "/&prd=" + pathSplit[1];
		}
		else {
			elmLink.href = hinduPrinterPage + "?file=" + fileName
							+ "&date=" + fileName.substr(0,4) + "/" + fileName.substr(4,2)
							+ "/" + fileName.substr(6,2) + "/&prd=" + prd;
		}
}

function rewriteBLineLink(elmLink) {
		var pathname = elmLink.pathname;
		if(pathname.charAt(0) == '/') pathname = pathname.substring(1);
						
		var pathSplit = pathname.split('/');

		if(pathSplit.length<4) return;

		var fileName = pathSplit[pathSplit.length-1];
		
		if(!hinduStoryFileFormat.test(fileName)) return;

		var prd ="bl";

		if(!numberRegExp.test(pathSplit[0])) {
			prd = pathSplit[0];
			if( prd != "iw" && prd != "ew" && prd != "catalyst" && prd!="mentor") //&& prd!="canvas"
				return;

			if(prd == "catalyst") prd = "ct";
			//if(prd == "canvas") prd = "cv";
			if(prd == "mentor") prd = "mn";
		}

		elmLink.href = hinduPrinterPage + "?file=" + fileName
				+ "&date=" + fileName.substr(0,4) + "/" + fileName.substr(4,2)
				+ "/" + fileName.substr(6,2) + "/&prd=" + prd;
}

function formatPrinterFriendlyPage() {
	// Add Global Style for the Printer Page.
	addGlobalStyle("body { font: 12px verdana, Times New Roman, Times, Serif; } p { font-size: 13px; } a { text-decoration: underline; color: #002bb8; background: none; } a:visited { color: #5a3696; } a:active { color: #faa700; } a:hover { text-decoration: none; }  li { font-size: 15; line-height: 1.1em; list-style-type: square; padding: 0; margin-bottom: .1em; font-style: normal; } li>i { font-style: normal; } td>i { font-style: normal; font-size: 14px; } b { font-size: 13px; } font>b { font-size: 19px; }");
	
	// Remove all embedded image ads.
	var allEmbedTags = document.getElementsByTagName('embed');
	for(var embedTagCnt = allEmbedTags.length - 1; embedTagCnt >=0 ; embedTagCnt--) {
		var elmEmbed = allEmbedTags[embedTagCnt];
		if(!elmEmbed) continue;
		elmEmbed.parentNode.removeChild(elmEmbed);
	}
	
	// Change the font colors to black and differenciate them by font weight.
	var allFontTags = document.getElementsByTagName('font');
	for(var fontTagCnt = allFontTags.length - 1; fontTagCnt >=0 ; fontTagCnt--) {
		var elmFont = allFontTags[fontTagCnt];
		if(!elmFont) continue;
		var fontStyle = getComputedStyle(elmFont, '');
		if(fontStyle.color == 'rgb(0, 0, 255)' && !elmFont.parentNode.href) {
			elmFont.style.color = '#000';
			//elmFont.style.fontSize = "16px";
			elmFont.style.fontSize = "18px";
		}
		else if(fontStyle.color == 'rgb(255, 0, 0)') {
			elmFont.style.color = '#000';
			elmFont.style.fontSize = "14px";
			elmFont.style.fontWeight = 'bold';
		}
	}
	
	// Change the style of horizontal lines
	var allHRTags = document.getElementsByTagName('hr');
	for(var hrTagCnt = allHRTags.length - 1; hrTagCnt >=0 ; hrTagCnt--) {
		var elmHR = allHRTags[hrTagCnt];
		if(!elmHR) continue;
		elmHR.style.color = 'rgb(170, 170, 170)';
		elmHR.style.borderWidth = "0.5px";
		elmHR.style.borderStyle = "solid";
	}
	
	// Remove any background color and highlight text by changing color and size.
	var allTableTags = document.getElementsByTagName('table');
	for(var tableTagCnt = allTableTags.length - 1; tableTagCnt >=0 ; tableTagCnt--) {
		var elmTable = allTableTags[tableTagCnt];
		
		if(!elmTable || !elmTable.bgColor || elmTable.bgColor.length==0) continue;
		
		elmTable.style.color = 'rgb(0, 0, 0)';
		//elmTable.style.backgroundColor = "rgb(249, 249, 249)";	
		//elmTable.style.fontSize = "12px";
		//elmTable.style.border = "1px solid rgb(170, 170, 170)";
		elmTable.style.backgroundColor = '#fff';
		elmFont.style.fontSize = "14";
		elmTable.style.fontWeight = "bold"; 
	}
				
	// Remove the ad
	var adTableResult = document.evaluate("//table[contains(@width, '250')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var adTable = adTableResult.singleNodeValue;
	if(adTable) {
		adTable.parentNode.removeChild(adTable);
	}
}

if(document.location.pathname.indexOf("thehindu/thscrip/print.pl") > -1)
	formatPrinterFriendlyPage();

rewriteLinks();
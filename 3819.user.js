/*
 Google Mail Quick Link using Google BookMarks
 version 0.1 BETA
 04-05-2006
 Copyright (c) 2006, Chris McKeever
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 I try to monitor the Grease Monkey Mail List.
 http://www.mozdev.org/mailman/listinfo/greasemonkey
 Please post questions/comments and suggestions.


 This script adds a Quick Link Nav Box to GMail.  It 
 populates the nav with links from google.com/bookmarks which are labeled GMqlink
 

 --------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "GMail Quick Links", and click Uninstall.

 --------------------------------------------------------------------
*/

// ==UserScript==
// @name          Add Quick Links - GMail
// @namespace     http://www.r2unit.com/greasemonkey
// @description   Adds Quick Link Navigation to GMAIL
// @include       http://mail.google.com/mail/*
// @include       http://www.google.com/bookmarks/*
// @include       http://google.com/bookmarks/*
// @include       https://mail.google.com/mail/*
// @exclude       http://mail.google.com/mail/help/*
// @exclude       https://mail.google.com/mail/help/*
// ==/UserScript==



(function() {

var loc = document.location.toString();
if(loc.match(/bookmark/)){
	var tdA = xpath("//td");
	var indexTD;
	var td = tdA[1].innerHTML;
	td = td.replace('&nbsp;',"&nbsp;|&nbsp;<a href='./url?url=https://mail.google.com/mail'><nobr>Mail</nobr></a>&nbsp;");
	tdA[1].innerHTML = td;
}


var getNode = getObjMethodClosure(document, "getElementById");
// wait till screen is drawn
if(!getNode('nav')) return;

var newNode = getObjMethodClosure(document, "createElement");
var newText = getObjMethodClosure(document, "createTextNode");

const linkRule = new Array(
	// Block in sidebar
	".linkBlock {-moz-border-radius: 5px; background: #ff6666; margin: 20px 7px 0 0; padding: 3px;}",
  	".linkBlockList {background: white; display:none}",
	".linkLoadingDiv {background: lightgrey; padding: 2px 0px 5px 2px; font-size: 8pt;}",
  	".linklistItem {color: #CC3333; font-size: 8pt;}",
  	".linkEditLink {color: #CC3333;}", 
	".linkEditDiv {text-align: right; padding: 2px 0px 5px 0; display:none;}" 
	);



styleInject(linkRule);

var linkBlock = newNode("div");
linkBlock.id = "nb_gm_1";
linkBlock.className = "linkBlock";

// header  
var linkBlockHeader = newNode("div");
linkBlockHeader.className = "s h";
linkBlock.appendChild(linkBlockHeader);

var linkTriangleImage = newNode("img");
linkTriangleImage.src = "/mail/images/opentriangle.gif";
linkTriangleImage.width = 11;
linkTriangleImage.height = 11;
linkTriangleImage.addEventListener("click", toggleLinkBlock, true);
linkBlockHeader.appendChild(linkTriangleImage);

var linkText = newNode("span");
linkText.appendChild(newText(" Quick Links"));
linkText.addEventListener("click", toggleLinkBlock, true);
linkBlockHeader.appendChild(linkText);

// loading message
var linkLoading = newNode("div");
linkLoading.className = "linkLoadingDiv";
linkLoading.appendChild(newText('BookMarks Loading...'));
linkBlock.appendChild(linkLoading);

// link list
var linkBlockList = newNode("div");
linkBlockList.className = "linkBlockList";
linkBlock.appendChild(linkBlockList);

// DIV and A for editing
var linkEditDiv = newNode("div");
linkEditDiv.className = "linkEditDiv";
linkBlockList.appendChild(linkEditDiv);

var lEditA = newNode('a');
lEditA.href = "javascript: top.location.href='http://google.com/bookmarks/lookup?q=label:GMqlink'";
lEditA.className = "lk cs linkEditLink";
lEditA.appendChild(newText("Edit Quick Links"));
linkEditDiv.appendChild(lEditA);


getNode('nav').insertBefore(linkBlock, getNode('nb_0'));

	GM_xmlhttpRequest({
    	method: 'GET',
    	url: "http://www.google.com/bookmarks/lookup?q=label:GMqlink&sort=title",
    	onload: function(responseDetails) {
		var La = responseDetails.responseText.match(/bkmk_href[^ >]+>([^<]*)/g);
		var Ua = responseDetails.responseText.match(/\.\/url[^ \n\r"]+(?=.*id=bkmk_href)/g);
		var indexc;
		if (!La){
		  var bmk = newNode("div");
    		  bmk.className = "cs linkListItem";
    		  bmk.appendChild(newText("No Quick Links set."));
		  linkBlockList.insertBefore(bmk, linkEditDiv);
		}else{
		  for (indexc = 0; indexc < La.length; indexc++){
			var label = La[indexc].replace(/bkmk_href[^ >]+>/,'');
			if (label.length > 20){
				label = label.substring(0,20) + "...";
			}
		      var url = Ua[indexc] .replace('.', 'http://google.com/bookmarks','');
			//alert(url);
			var bmk = new objLink(label,url);
			addLinkItem(bmk);
		  }
		}
		var blockdisp = getCookie('GMqlink');
		linkLoading.style.display = "none";
		linkEditDiv.style.display = "block";
		if (blockdisp == 1){
			linkBlockList.style.display  = "block";
		}else linkTriangleImage.src = "/mail/images/triangle.gif";
		
    	},
    	onerror: function(responseDetails) {
		linkLoading.innerHTML = "Error Loading Bookmarks";
    		}
  	});

function toggleLinkBlock() {
  	if (linkBlockList.style.display != "block") {
		setCookie('GMqlink', 1);
     		linkBlockList.style.display = "block";
		linkTriangleImage.src = "/mail/images/opentriangle.gif";
  	} else {
		setCookie('GMqlink', 0);
    		linkBlockList.style.display = "none";
		linkTriangleImage.src = "/mail/images/triangle.gif";
  	}
  
  	return false;
}

function addLinkItem(link) {
  	linkBlockList.insertBefore(link.createListItem('linkListItem',''), linkEditDiv);
}

// -----------------------------  Resource

function getObjMethodClosure(object, method) {
	// shorthand object reference
  	return function(arg) {
    		return object[method](arg); 
  	}
}

function styleInject(styRule) {
	// injects style elements into head
  	var styleNode = newNode("style");
  	document.body.appendChild(styleNode);

  	var styleSheet = document.styleSheets[document.styleSheets.length - 1];

  	for (var i=0; i < styRule.length; i++) {
    		styleSheet.insertRule(styRule[i], 0);
  	}
  
  	//styleSheet.insertRule(NORMAL_RULE, MESSAGE_BODY_FONT_RULE_INDEX);    
}

function xpath(pattern){
	// simple xpath parser
	var a_emt = new Array();
    	var sshot = document.evaluate(pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( sshot.snapshotLength > 0){
      		for (i=0; i< sshot.snapshotLength; i++){
        		a_emt[i] = sshot.snapshotItem(i);
      		}
      		return a_emt;
    	}
    	return null;
}

function setCookie(name, value) {
  var today = new Date();
  var expiry = new Date(today.getTime() + 24 * 60  * 60 * 1000);
                                                                                
  document.cookie = name + "=" + escape(value) +
            "; expires=" + expiry.toGMTString() +
            "; path=/";
}

function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");;
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

// ------------------------------ Link Object

function objLink(label,url){

	this.url = url;
  	this.label = label;
  
  	this.listItem = null;
}

objLink.prototype.createListItem = function(linkStyle,event) {
  	if (!this.listItem) {
    		this.listItem = newNode("div");
    		//this.listItem.className = "lk cs " + linkStyle;
		var a = newNode("a");
		a.href = this.url;
		a.target = "_blank";
		a.className = "lk cs " + linkStyle;
		a.appendChild(newText(this.label));
    		this.listItem.appendChild(a);
		if (event != ''){
	    		this.listItem.addEventListener("click", this[event], true);
		}
  	}
  
  	return this.listItem;
}


// ------------------------------ End Link Object


}) ();


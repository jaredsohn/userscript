// Identica Reply script
// version 0.3 BETA!
// 2008-07-03
// Copyright (c) 2008, Brad McCrorey
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Identica Reply", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Identica Reply
// @namespace     http://brad.globeproductions.com.au/greasemonkey/identica-reply.user.js
// @description   Script to install a "reply" button on identi.ca. Updated to 0.3 on 04-07-2008 to include   http://hewitt.controlezvous.ca
// @include       http://identi.ca/*
// @include        http://hewitt.controlezvous.ca/*
// ==/UserScript==
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};
safeGetElementsByClassName = function (className, tag, elm) {
	tag = tag || "*";
	elm = elm || document;
	var classes = className.split(" "),
		classesToCheck = [],
		elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
		current,
		returnElements = [],
		match;
	for(var k=0, kl=classes.length; k<kl; k+=1){
		classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
	}
	for(var l=0, ll=elements.length; l<ll; l+=1){
		current = elements[l];
		match = false;
		for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
			match = classesToCheck[m].test(current.className);
			if (!match) {
				break;
			}
		}
		if (match) {
			returnElements.push(current);
		}
	}
	return returnElements;
};

function user_name_only(str) {
	return str.substring(str.lastIndexOf('/') + 1, str.lastIndexOf('.'))
} 

function addReplyString(user) {
	alert(user);
	var theTarea = document.getElementById('status_textarea');
	theTarea.innerHTML = theTarea.innerHTML+'@'+user+' ';
}

var theLis = getElementsByClassName('notice_single');

for(i=0;i<theLis.length;i++) {
	var nickname = safeGetElementsByClassName('nickname', 'a', theLis[i]);
	var nicknameStrip = user_name_only(nickname+'.ignore');
	// var nicknameLink = '<a href="#" onclick="addReplyString(\''+nicknameStrip+'\');">reply</a>';
	var nicknameLink = "<a href=\"#\" onclick=\"document.getElementById('status_textarea').innerHTML = document.getElementById('status_textarea').innerHTML + '@"+nicknameStrip+" ';\">reply</a>";

	theLis[i].innerHTML = theLis[i].innerHTML+nicknameLink;
}



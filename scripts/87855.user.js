// GVN's Single Train Reputation Part 1
// version 0.1 BETA!
// Oct 09, 2010
// Copyright (c) 2010, blade™
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GVN's Single Train Reputation Part 1", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GVN's Single Train Reputation Part 1
// @description   Script for my brothers
// @include       http://forum.gamevn.com/reputation.php?*
// @exclude       http://forum.gamevn.com/showthread.php?*
// ==/UserScript==

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

function removeElementByID(id)	{
	var Node = document.getElementById(id);
	Node.parentNode.removeChild(Node);
}

function disableElementsByTagName(tagName)
{
	var array = document.getElementsByTagName(tagName);
	for (i=0;i<array.length;i++)
	{
		array[i].style.display = 'none';
	}
}

function disableElementsByClassName(className)
{
	var array = document.getElementsByClassName(className);
	for (i=0;i<array.length;i++)
	{
		array[i].style.display = 'none';
	}
}

disableElementsByTagName('table');
disableElementsByTagName('center');
disableElementsByTagName('br');
disableElementsByTagName('blockquote');
disableElementsByTagName('iframe');
disableElementsByClassName('below_body');

removeElementByID('header');
removeElementByID('breadcrumb');
removeElementByID('globalsearch');
removeElementByID('navbar');
removeElementByID('footer');
removeElementByID('pagetitle');
removeElementByID('AVIMControl');

document.forms[0].elements[2].value = "blade™_";
document.forms[0].submit();		

url = location.href;
window.location(url);

// ==UserScript==
// @name           Easy Reloader
// @author         bob23646
// @namespace      http://bob23646.deviantart.com/
// @description    double click to reload pages
// @include        http*://boards.4chan.org/*
// @exclude        http*://boards.4chan.org/*/res/*
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
function substr_count (haystack, needle, offset, length) {
    var pos = 0, cnt = 0;
     haystack += '';
    needle += '';
    if (isNaN(offset)) {offset = 0;}
    if (isNaN(length)) {length = 0;}
    offset--; 
    while ((offset = haystack.indexOf(needle, offset+1)) != -1){
        if (length > 0 && (offset+needle.length) > length){
            return false;
        } else{            cnt++;
        }
    } 
    return cnt;}   
function explode (delimiter, string, limit) {
    var emptyArray = { 0: '' };
    if ( arguments.length < 2 ||
        typeof arguments[0] == 'undefined' ||        typeof arguments[1] == 'undefined' ) {
        return null;
    }
    if ( delimiter === '' ||        delimiter === false ||
        delimiter === null ) {
        return false;
    }
     if ( typeof delimiter == 'function' ||
        typeof delimiter == 'object' ||
        typeof string == 'function' ||
        typeof string == 'object' ) {
        return emptyArray;    }
 
    if ( delimiter === true ) {
        delimiter = '1';
    }    
    if (!limit) {
        return string.toString().split(delimiter.toString());
    } else {
        var partA = splitted.splice(0, limit - 1);
        var partB = splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;    }
}
function dblClickGo()
{
	if (doReload == true)
	{
		window.location = url+anchor;
	}
	doReload = true;
}
function dblClickStop()
{
	doReload = false;
}
var doReload = true;
var anchor = '';
var reloadText = 'Reload Page';
var url = window.location.toString();
if (substr_count(url, '#') > 0)
{
	url = explode('#', url);
	url = url[0];
}
if (substr_count(window.location, '/res/') > 0)
{
	reloadText = 'Reload Thread';
	var posts = getElementsByClassName("reply", "td");
	if (posts.length > 0)
	{
		anchor = '.html#'+posts[posts.length-1].id;
	}
}
if (!document.getElementById("reloadLink"))
{
	var reloadDiv = document.createElement("div");
	var reloadHtml = '<div style="font-size:11px;padding-bottom:13px">Double click the background to reload.</div>'; 
	reloadDiv.innerHTML = reloadHtml;
	var centerEls = document.getElementsByTagName('center');
	var bottomCenter = centerEls[centerEls.length-2];
	bottomCenter.insertBefore(reloadDiv, bottomCenter.firstChild);
}
document.body.addEventListener('dblclick', dblClickGo, true);
var allClickyEls = new Array('blockquote', 'input', 'textarea');
for (keyVar in allClickyEls)
{
	var clickyEls = document.getElementsByTagName(allClickyEls[keyVar]);
	for (keyVar in clickyEls)
	{
		// some els don't have addEventListener, according to Chrome - script would halt
		if (clickyEls[keyVar].addEventListener != null)
		{
			clickyEls[keyVar].addEventListener('mousedown', dblClickStop, true);
		}
	}
}
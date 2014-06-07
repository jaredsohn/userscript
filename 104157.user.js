// ImageFAP direct images++'
// http://userscripts.org/scripts/show/35672
// based on ImageFAP direct images++
// http://userscripts.org/scripts/show/3923
// which in turn was based on ImageCASH direct images : http://userscripts.org/scripts/show/1792
// adapted and improved for ImageFAP
// Created: 21 apr 2006 (++)
// Created: 17 oct 2008 (++')
// Version : 081021'
// Copyright (c) 2006-2008 darodi (++)
// Copyright (c) 2008 nips9901 (++')

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; see the file COPYING. If not, write to the
// Free Software Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.


// ==UserScript==
// @name          ImageFAP direct images++'
// @namespace     http://nipsden.blogspot.com
// @description   Bypass the individual pages for images hosted by ImageFAP 
// @include       http://*imagefap.com/gallery/*
// @include       http://*imagefap.com/gallery.php?*gid=*
// @include       http://*imagefap.com/ajax_gallery_display.php?*
// ==/UserScript==

//CHANGELOG:
//*version 081021'
// + use incremental filenames if no original filename is provided
// + print filename and url at start of wget command for easier lookup
// + quote directory names in md/mkdir command
// - minor code cleanup
//*version 081020'
// + wget script includes deep directory creation
// + persistent configuration (see about:config)
// + menu-toggable inclusion of wget script (Tools -> Greasemonkey -> User script commands)
//*version 081019'
// + provide link to the original individual page too
// + wget script uses the original file name
// + wget script by default includes user agent (browser) and referer (replaced page)
// + wget script tries to adapt slightly to OS
// + slightly different display of script (font and width)
// - code modified to use XPath, and reorganized
// - removed original commented-out code of no use to this version
//*version 080615
// + wget script include added
// + wget script menu command added
// - CleanDisplay removed (obsolete)
//*version 080405
// - new include added
//*version 080112
// - cleanDisplay added. 
//*version 0.6(20/11/07)
//  - code cleaned, optimized and decode function removed
//*version 0.5(13/09/07)
//  -modified to work with  "  :: prev ::  | 1  | 2  | 3  |  :: next ::  " links
//*version 0.4 (22/09/06):
//   - modified to work with imagefap changes, the link is taken from the thumbnail
//*version 0.3 (30/04/06):
//   - works when onclick is not active.
//*version 0.2 (29/04/06): 
//   - now, not only the value of the variable 'xk' changes everytime, but its name too!
//     I had to adapt the regexp for matching. 'xk=[^;]*' becomes 'split[^;]*;[^;]*'
//   - include for the userscript changed ( thanks buergi ;) )
//*version 0.1 (21/04/06): first release

// NOTES: See the original ImageFAP direct images++ version 080615 for notes on
//  the decrypt() function

//--------------------------------------------------------------------------

//CONFIGURATION : 

// persistent (about:config) keys
// show_wget_script (bool) (Modifiable through GM's menu-commands)
// wget_script_sleep (int) (Only modifiable by hand)

//include wget script?
var wgetScriptInclude = GM_getValue("show_wget_script", false);
//sleep between files
var wgetScriptSleep = GM_getValue("wget_script_sleep", 30);
// Extra arguments for wget
var wgetArgs = '--user-agent="'+navigator.userAgent+'" --referer="#REF#"';
// uncomment if the extra arguments annoy you
// var wgetArgs='';

var wgetCommand;
// ToDo: Any better way?
var isWin = (navigator.platform.indexOf("Win") != -1);
if (isWin) { // Windows' commands
//command line for minimized download
//	wgetCommand = "start /MIN \"\" wget "+wgetArgs+" -O \"#FN#\" \"#URL#\"";
//command line background download
	wgetCommand = "start /b \"\" wget "+wgetArgs+" -O \"#FN#\" \"#URL#\"";
} else { // UNIX family commands
	wgetCommand = "wget -O '#FN#' '#URL#' "+wgetArgs;
}

//--------------------------------------------------------------------------

// FUNCTIONS:

var sBuilder = null, Anchors = null, FileNames = null;

// Objectified construction of the script file by file
function ScriptBuilder() {
 function comm(s) { return (isWin?'@REM':'#')+s; }
 var fidx=1;
 function nextfile(ifapname) {
	var s=''+fidx;
	while (s.length<3) { s = '0'+s; }
	var ext=ifapname.substring(ifapname.lastIndexOf('.'));
	fidx++;
	return 'image-'+s+ext;
 }
 this.self = this;
 var _txt = '', _pre = '';
 if (!isWin) _pre+='#!/bin/sh<br/>';
 _pre+=comm(' Gallery source: '+window.location.href+'<br/>');
 // Add a file
 this.add = function (filename, url, referer) {
	if (filename.indexOf('/') != -1) {
		var dirs = filename.split('/');
		var prefix = '';
		for (var i=0;i<dirs.length-1;++i){
			makedir(prefix+dirs[i]);
			prefix += dirs[i]+'/';
		}
	}
	var fn=filename;
	if (fn=='') fn=nextfile(url.substring(url.lastIndexOf('/')));
	_txt += wgetCommand.replace(/#FN#/, fn).replace(/#URL#/, url).replace(/#REF#/, referer)+'<br/>';
	if (isWin) { // I'm not sure why's the sleep anyway...
		_txt += 'sleep '+wgetScriptSleep+'<br/>';
	}
 };
 // Get the script text
 this.get = function() {
	return _pre+comm(' Wget commands')+'<br/>'+_txt;
 };
 var _dirs = new Array();
 function makedir(p) {
	if (_dirs.indexOf(p) != -1) return;
	if (_dirs.length==0)
		_pre += comm(" Directories")+"<br/>";
	if (isWin)
		_pre += 'md "'+p.replace('/', '\\')+'"<br/>';
	else
		_pre += 'mkdir \''+p+'\'<br/>';
	_dirs.push(p);
 }
}

function xpath(query, resultType) {
 if (resultType==null) resultType=XPathResult.ANY_TYPE; //FIRST_ORDERED_NODE_TYPE for first
 return document.evaluate(query, document, null, resultType, null );
}

function changeGalleryLinks() {
	for (var i=0; i<Anchors.snapshotLength; i++) {
		var anchor = Anchors.snapshotItem(i);
		if (!anchor.href.search(/image\.php\?id=[^\&|$]*/) || anchor.childNodes.length == 0) continue;
		var oldref = anchor.href;
		// oldHref can be read with getAttribute
		anchor.setAttribute("oldHref", oldref);
		anchor.href = anchor.childNodes[0].src.replace(/thumb/,"full")
		// Add also link to intermediate page in case the user wants to use it too
		var il = document.createElement("A");
		il.href = oldref;
		il.innerHTML = "[Std]";
		var fn = FileNames.snapshotItem(i);
		if (fn==null) continue;
		fn.parentNode.insertBefore(il, fn.nextSibling);
		fn.parentNode.insertBefore(document.createTextNode("\u00a0"), il);//nbsp
	}
}

function buildScript() {
	var sb = new ScriptBuilder();
	for (var i=0; i<Anchors.snapshotLength; i++) {
		var anchor = Anchors.snapshotItem(i);
		var fn = FileNames.snapshotItem(i);
		sb.add(fn.innerHTML, anchor.href, anchor.getAttribute("oldHref"));// anchor already processed
	}
	return sb;
}

function wgetScriptMenuCommand(){
	var newBody = '<html><body>';
	newBody += buildScript().get();
	newBody += '</body></html>';
	document.body.innerHTML = newBody;
}

// HERE STARTS EXECUTION

Anchors = xpath('//table/tbody/tr[1]/td/a[contains(@href, "image.php")]', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
// They should be in the same order as the anchors. Used for wget script AND to
// provide links to intermediate page
FileNames = xpath('//table/tbody/tr[2]/td/font[2]/i', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

changeGalleryLinks();
GM_registerMenuCommand( "Generate wget script", wgetScriptMenuCommand);
GM_registerMenuCommand("Toggle auto generation of wget script", function() {
	var nv=!GM_getValue("show_wget_script", false);
	GM_log((nv?'Enabled ':'Disabled ')+"ImageFap ++'s wget script");
	GM_setValue("show_wget_script", nv);
});

if (wgetScriptInclude) {
	if (Anchors.snapshotLength != FileNames.snapshotLength) { return; } // FAIL!
	sBuilder = buildScript();
	var body = document.getElementsByTagName("body")[0];
	var element = document.createElement("div"); 
	element.style.padding='20px';
	element.style.margin='auto';
	element.style.border='1px solid';
	element.style.width='85%';
	element.style.fontFamily='monospace';
	element.innerHTML="<h1><center>wget script added by ImageFap++'</center></h1>"+sBuilder.get();
	body.appendChild(element); 
}

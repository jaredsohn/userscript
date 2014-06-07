// Yahoo Mail Google Gadget Cleanup
// Version 0.1.5
// Copyright (c) 2008, SpanishGringo
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Mobile Yahoo Mail Cleanup - Google Gadget
// @namespace      http://www.google.com/ig
// @description    Clean up Mobile Yahoo Mail in your Google Gadget
// @author        Michael Freeman (http://spanishgringo.blogspot.com)
// @datecreated   March 10 2008
// @lastupdated   Sept 17 2008
// @include        http://intl.m.yahoo.com/p/mail*
// @exclude        http://intl.m.yahoo.com/p/mail/messagedetail*
// ==/UserScript==

document.getElementById('top').style.display = 'none';
document.styleSheets[0].insertRule('body { line-height:1.1;}',0);
document.styleSheets[0].insertRule('a { font-size:11px; line-height:.8;}',0);
document.styleSheets[0].insertRule('.g { border-top:1px solid #BCC7CC; margin-top:0px; padding:0px 3px; font-weight:bold;font-size: 13px; }',0);


var arr = document.getElementsByTagName('div');
arr[arr.length-1].style.display='none';
arr[arr.length-2].style.display='none';
arr[arr.length-3].style.display='none';
	for (i=0;i< arr.length;i++){
		if(arr[i].className=='e'){
			arr[i].style.display='none';
			break;
		}
	}
// ==UserScript==
// @name          HKgalden X PKM Icon
// @namespace     
// @description   Use Latest Pokemon icon in HKgalden!!
// @include       http://hkgalden.com/view/*
// @include       https://hkgalden.com/view/*
// @include       http://hkgalden.com/reply/*
// @include       https://hkgalden.com/reply/*
// @include       http://m.hkgalden.com/reply/*
// @include       https://m.hkgalden.com/reply/*
// ==/UserScript==

/*

    Copyright (C) 2013  中質改圖專員

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.

*/

//Caution! the URL of the new icon must not include char 'z'
//since it may inculde the code of Z_Z which is 'z'

var win=this.unsafeWindow;
win.processStocks = function (json) {

	var etray = document.getElementById('EmotionTray');
	
	var clone = etray.cloneNode(true);
	
	if (etray) {
	
	    var excel = new Array();
	    for (var k = 0; k < 3; ++k) {
	            excel[k] = new Array();
	    }
	
	    for (var i = 0, l = json.feed.entry.length; i < l; ++i) {
	        var entry = json.feed.entry[i];
	        var title = entry.gsx$code.$t;
	        //var title = (entry.title.type == 'html') ? entry.title.$t : escape(entry.title.$t);
	        excel[0][i] = title;
	    }
	
	    for (var i = 0, l = json.feed.entry.length; i < l; ++i) {
	        var entry = json.feed.entry[i];
	        var title = entry.gsx$img.$t;
	        excel[1][i] = title;
	    }
	
	    for (var i = 0, l = json.feed.entry.length; i < l; ++i) {
	        var entry = json.feed.entry[i];
	        var title = entry.gsx$link.$t;
	        excel[2][i] = title;
	    }
	
	    for (var k = 0; k < 3; ++k) {
	        var tr=document.createElement('tr');
	        for (var i = 0, l = excel[k].length; i < l; ++i) {
	            var td=tr.appendChild(document.createElement('td'));
	            td.innerHTML=excel[k][i];
	        }
	    //etray.parentNode.insertBefore(tr,etray);
	    }
	    
	    var allImgs,thisImg; 
	    allImgs = document.evaluate('.//img[@alt]', 
	    etray, 
	    null, 
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	    
	    for (var i=0;i<allImgs.snapshotLength;++i) { 
	        var thisImg = allImgs.snapshotItem(i);
	        //var dsrc = escape(thisImg.src)
	        for (var j = 0, l = excel[1].length; j < l; ++j) {
	        		//var tempsrc = escape(excel[1][j]);
	            //if ( dsrc == tempsrc)
	            if ( thisImg.src.search(excel[1][j]) != -1){
	                thisImg.src = excel[2][j];
	             }
	        }
	    }
	    
	    var allA,thisA; 
	    allA = document.evaluate('//a[@data-code]', 
	    document, 
	    null, 
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	    
	    var tr=document.createElement('tr');
	    for (var i=0;i<allA.snapshotLength;++i) { 
	        var thisA = allA.snapshotItem(i);
	        var dcode = escape(thisA.attributes.getNamedItem('data-code').value);
	        for (var j = 0, l = excel[1].length; j < l; ++j) {
	        	 	var tempcode = escape(excel[0][j]);
	            if (dcode == tempcode){
	                thisA.attributes.getNamedItem('data-code').value = '[img]' + excel[2][j] + '[/img]';

	       			}
	    		}

			}
	     
   etray.parentNode.insertBefore(clone,etray);
	}     
           
}  
        
var URL = 'https://spreadsheets.google.com/feeds/list/0ApEyQph2NSyNdERvRHF6MDBQbW5lTzZZd2F5QnZPdFE/od6/public/values?alt=json-in-script&callback=processStocks';
var srcURL = document.createElement('script');
srcURL.src = URL;
var doc = document.querySelector('head');
doc.appendChild(srcURL);

//var print = 'DIUJOELAM';
//alert(print);



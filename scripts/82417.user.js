/**
 * @version	1.5
 * @author	Allen Choong
 * @created	2010-07-27
 *
 * The image links are not available by default, using this script to generate image links.
 * The links are generated at the bottom of page. Then one can download the images with
 * favorite download manager. For personal use only.
 *
 * Changelog
 * 1.5	2012-12-21	The last page is always empty, remove it.
 * 1.4	2012-10-15	Changes of the elements
 * 1.3	2012-03-12	Adding new domain, http://*.78du.com/*
 * 1.2	2011-04-09	Disable "Enable right click context", seems not working on Firefox 4,
 *					Enabling right click needs to be done web browser
 * 1.1	2010-11-15	Add new include URL
 *					Enable right click context menu
 */

// ==UserScript==
// @name           qiuhu.com Image Link
// @namespace      http://allencch.wordpress.com/
// @description    Generate image links. For personal use only.
// @include        http://qiuhu.com/comic/*
// @include			http://www.qiuhu.com/comic/*
// @include			http://*.78du.com/*
// @grant			none
// ==/UserScript==


function padZero(num,width) {
	s = num.toString();
	while(s.length<width)
		s = "0" + s;
	return s;
}

function getImageLink() {
	return document.getElementById('PicNow').src;
}

function getNumPages() {
	var pages = document.getElementById('PageSelect2');
	var length = pages.length -1;
	return length;
}

window.generateLink = function() {
	//Enable right click context
	/*with(document.wrappedJSObject || document) {
		alert(this);
		onmouseup = null;
		onmousedown = null;
		oncontextmenu = null;
	}//*/
	
	var mainDiv,newElement;	
	//mainDiv = document.getElementById('foot');
	
	mainDiv = document.getElementById('c3');
	/*for(var i=0;i<divs.length;i++) {
		if(divs[i].className == 'cl970') {
			mainDiv = divs[i];
			break;
		}
	}//*/
	
	if(mainDiv) {
		newElement = document.createElement('div');
		newElement.setAttribute('id','gm_elem');
		newElement.setAttribute('style','text-align:center');
		mainDiv.parentNode.insertBefore(newElement,mainDiv.nextSibling);
	}

	var gmElem = document.getElementById('gm_elem');
	
	
	//Generate all the links element
	var myLinks = new Array();
	var myText = new Array();
	
	var numPages = getNumPages();
	var link = getImageLink();
	
	
	var path = link.substring(0,link.lastIndexOf('/')+1);
	var filename = link.substring(link.lastIndexOf('/')+1);
	var suffix = filename.substring(filename.lastIndexOf('.'));
	var width = filename.length - 4; //-4 for image suffix
	
	for(var i=0;i<numPages;i++) {
		//myLinks[i] = getImageLink(i+1);
		myLinks[i] = path + padZero(i+1,width) + suffix;
		myText[i] = '<a target="_blank" href="'+myLinks[i]+'">'+padZero(i+1,3)+'</a> ';
	}
	
	if(gmElem){
		gmElem.innerHTML = '<hr>';
		for(var i=0;i<numPages;i++) {
			gmElem.innerHTML += myText[i];
			if((i+1)%20 == 0)
				gmElem.innerHTML += '<br/>';
		}
		gmElem.innerHTML += 'end';
	}
}

window.setTimeout(generateLink(),1*1000);
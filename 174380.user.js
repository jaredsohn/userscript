/**
 * @version	1.1
 * @author	Allen Choong Chieng Hoon
 * @date	2013-07-27
 *
 * The image links are not available by default, using this script to generate image links.
 * The links are generated at the bottom of page. Then one can download the images with
 * favorite download manager. For personal use only.
 *
 * Changelog:
 * 1.1	2013-09-19	Change solve the "%20" problem
 */

// ==UserScript==
// @name        imanhua Image Link
// @namespace   http://allencch.wordpress.com
// @description Display image URL
// @include     http://www.imanhua.com/comic/*
// @version     1.1
// ==/UserScript==


function padZero(num,width) {
	s = num.toString();
	while(s.length<width)
		s = "0" + s;
	return s;
}

function getNumPages() {
	var select = document.getElementById('pageSelect');
	return select.children.length;
}

function getImageLink() {
	return document.getElementById('mangaFile').src;
}

window.generateLink = function() {
	var mainDiv,newElement;	
	mainDiv = document.getElementById('mangaBox');
	
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
	var filename = decodeURIComponent(link.substring(link.lastIndexOf('/')+1));
	
	var match = filename.match(/[^\d]*?(\d+)\./);
	var width = match[1].length;

	
	//var suffix = filename.substring(filename.lastIndexOf('.'));
	//var width = filename.length - 4; //-4 for image suffix
	
	for(var i=0;i<numPages;i++) {
		var regex = new RegExp(match[1]);
		myLinks[i] = path + filename.replace(regex,padZero(i+1,width));

		//myLinks[i] = getImageLink(i+1);
		//myLinks[i] = path + padZero(i+1,width) + suffix;
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
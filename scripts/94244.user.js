/**
 * @version	1.0
 * @author	Allen Choong
 * @created	2011-01-05
 *
 * The image links are not available by default, using this script to generate image links.
 * The links are generated at the bottom of page. Then one can download the images with
 * favorite download manager. For personal use only.
 * Modified from www.kyo.cn 1.3
 *
 */

// ==UserScript==
// @name           www.8zmh.com Image Link
// @namespace      http://allencch.wordpress.com/
// @description    Generate image URL
// @include        http://www.8zmh.com/html_comic/*
// ==/UserScript==



function padZero(num,width) {
	s = num.toString();
	while(s.length<width)
		s = "0" + s;
	return s;
}

function getImageLink() {
	return document.getElementById('disp').src;
}

function getNumPages() {
	var pages = document.getElementsByClassName('TextRed');
	var length = pages[0].innerHTML;
	return length;
}

window.generateLink = function() {
	var mainDiv,newElement;	
	mainDiv = document.getElementById('mhllym5');

	if(mainDiv) {
		newElement = document.createElement('div');
		newElement.setAttribute('id','gm_elem');
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
	var match = filename.match(/[^\d]*?(\d+)\./);

	
	var width = match[1].length;
	
	for(var i=0;i<numPages;i++) {
		var regex = new RegExp(match[1]);
		myLinks[i] = path + filename.replace(regex,padZero(i+1,width));
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
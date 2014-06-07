/**
 * @version	1.2
 * @author	Allen Choong Chieng Hoon
 * @date	2012-07-26
 *
 * The image links are not available by default, using this script to generate image links.
 * The links are generated at the bottom of page. Then one can download the images with
 * favorite download manager. For personal use only.
 *
 * Changelog:
 * 1.2	2013-12-25	Add more includes
 * 1.1	2012-12-21	The last page is empty, remove it.
 * 1.0	2012-07-26	First release	
 */

// ==UserScript==
// @name        www.manhua8.com image links
// @namespace   http://allencch.wordpress.com
// @include		http://*.manhua8.net/*
// @include		http://*.manhua2.net/*
// @include		http://*.manhua1.net/*
// @include     http://*.manhua8.com/*
// @include		http://*.manhua2.com/*
// @include		http://*.manhua1.com/*
// @version     1.0
// ==/UserScript==


function padZero(num,width) {
	s = num.toString();
	while(s.length<width)
		s = "0" + s;
	return s;
}


window.generateLink = function() {
	//Prepare the links location
	var mainDiv,newElement;	
	var mainDivs = document.getElementsByClassName('picPager');
	mainDiv = mainDivs[mainDivs.length -1];
	
	if(mainDiv) {
		newElement = document.createElement('div');
		newElement.setAttribute('id','gm_elem');
		newElement.setAttribute('style','text-align:center');
		mainDiv.parentNode.insertBefore(newElement,mainDiv.nextSibling);
	}
	
	var gmElem = document.getElementById('gm_elem');
	
	//Get the image links as the template
	link = document.getElementById('comicImg').src;
	
	//Get the number of files
	numPages = document.getElementById('bottomSelect').length -1;
	
	//Generate all the links element
	var myLinks = new Array();
	var myText = new Array();
	
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
/**
 * @author	Allen Choong
 * @date	2013-07-29
 *
 * The image links are not available by default, using this script to generate image links.
 * The links are generated at the bottom of page. Then one can download the images with
 * favorite download manager.
 *
 */

// ==UserScript==
// @name        xemh Image Link
// @namespace   http://allencch.wordpress.com
// @description Generate image link
// @include     http://www.xemh.com/comic/*
// @version     1.0
// ==/UserScript==


function acAjaxReq()
{
	var req = false;
	// For Safari, Firefox, and other non-MS browsers
	if(window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} 
		catch(e) {
			req = false;
	    }
	} 
	else if(window.ActiveXObject) {
		// For Internet Explorer on Windows
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch(e) {
			try {                         
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch(e) {
				req = false;
			}
		}
	}
	return req;
}

function padZero(num,width) {
	s = num.toString();
	while(s.length<width)
		s = "0" + s;
	return s;
}

function getPath(str) {
	var index = str.lastIndexOf('.');
	return str.substring(0,index);
}

function getPageLink(num) {
	return location.protocol + '//' + location.hostname + getPath(location.pathname) +"_" + num + '.html';
}



function getNumPages() {
	var pages = document.getElementById('selectpage');
	return pages.children.length;
}



function xhr(num,max,gmElem,myLinks) {
	if(num<max) {
		var req = acAjaxReq();
		req.onreadystatechange = function() {
			if(req.readyState == 4) {
				//var parser = new DOMParser();
				var response = req.responseText;
				var imgSrc = response.match(/img\s+onload.*?src="([^"]+)/)[1];
				
				var text = '<a target="_blank" style="color:blue"  href="'+imgSrc+'">' + padZero(num+1,3) + '</a> ';
				gmElem.innerHTML += text;
				if((num+1)%20 == 0)
					gmElem.innerHTML+='<br/>';
				xhr(num+1,max,gmElem,myLinks);//*/
				
			}
		}
		req.open("GET",myLinks[num],true);
		req.send(null);
	}
	else 
		gmElem.innerHTML += 'end';
}


window.generateLink = function() {
	var mainDiv,newElement;	
	mainDiv = document.getElementsByClassName('mark-box')[0];
	
	if(mainDiv) {
		newElement = document.createElement('div');
		newElement.setAttribute('id','gm_elem');
		newElement.setAttribute('style','color:blue;text-align:center');
		mainDiv.parentNode.insertBefore(newElement,mainDiv.nextSibling);
	}
	
	var gmElem = document.getElementById('gm_elem');
	
	//Generate all the links element
	var myLinks = new Array();
	
	var numPages = getNumPages();
	
	for(var i=0;i<numPages;i++) {
		myLinks[i] = getPageLink(i+1);
	}
		
	if(gmElem) {
		gmElem.innerHTML = '<hr>';
		
		//Now, need to get the image src from all the generated links
		xhr(0,numPages,gmElem,myLinks);
	}
}


function generateButton() {
	var mainDiv,newElement;	
	mainDiv = document.getElementsByClassName('mark-box')[0];
	
	//Inject script
	var script = document.createElement('script');
	script.appendChild(document.createTextNode(acAjaxReq + "\n"));
	script.appendChild(document.createTextNode(padZero + "\n"));
	script.appendChild(document.createTextNode(getPath + "\n"));
	script.appendChild(document.createTextNode(getPageLink+"\n"));
	script.appendChild(document.createTextNode(getNumPages+"\n"));
	script.appendChild(document.createTextNode(xhr+"\n"));
	
	
	if(mainDiv) {
		newElement = document.createElement('div');
		newElement.setAttribute('id','gmScript');
		newElement.setAttribute('style','text-align:center');
		mainDiv.parentNode.insertBefore(script,mainDiv.nextSibling);
		mainDiv.parentNode.insertBefore(newElement,mainDiv.nextSibling);
	}
	
	
	var gmElem = document.getElementById('gmScript');
	
	if(gmElem){
		gmElem.innerHTML = '<a href="javascript:generateLink()">click here</a>';
	}
}

window.setTimeout(generateButton(),1000);
/**
 * @version	1.6
 * @author	Allen Choong
 * @created	2010-07-17
 *
 * The image links are not available by default, using this script to generate image links.
 * The links are generated at the bottom of page. Then one can download the images with
 * favorite download manager.
 * 
 * Changelog:
 * 2011-01-28	1.6 The javascript file name read the the site is changed
 * 2010-12-18	1.5	There is great changes towards the website, it uses jQuery to generate the pages.
 *					Therefore, I don't know how to disable the hotkey. And I uses the Chrome method to generate the pages.
 * 2010-12-09	1.4	Due to generating more than 400 links failed in Firefox, thus create another method for Google Chrome.
 *					However, Google Chrome cannot use unsafeWindow, therefore injecting the functions to the page.
 * 1.3				Disable onkeyup page navigation
 */
 
// ==UserScript==
// @name           comic.xxbh.net Image Link
// @namespace      http://allencch.wordpress.com/
// @description    The image links are not available by default, using this script to generate image links
// @include        http://comic.xxbh.net/*
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

function getPageLink(num) {
	var link = location.protocol + '//' + location.hostname + location.pathname + '?page=' + num;
	return link;
}


function getServers(filename) {
	var req = acAjaxReq();
	req.onreadystatechange = function() {
		if(req.readyState == 4) {
			var servers = new Array();
	
			var response = req.responseText;
			
			var match = response.match(/img_svr\[(\d+)\](.*?)(http.*?)"/mg);
			for(var i=0;i<match.length;i++) {
				var match2 = match[i].match(/(http.*?)"/);
				servers[i] = match2[1];
			}
			
			//Generate links
			var unsafeWindow = this["unsafeWindow"] || window;
			
			var mainDiv,newElement;	
			mainDiv = document.getElementById('main');

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
			
			for(var i=0;i<unsafeWindow.maxPage;i++) {
				myLinks[i] = servers[unsafeWindow.img_s - 1] + unsafeWindow.images_arr[i+1];
				myText[i] = '<a target="_blank" href="'+myLinks[i]+'">'+padZero(i+1,3)+'</a> ';
			}
			
			if(gmElem){
				
				gmElem.innerHTML = '<hr>';
				for(var i=0;i<unsafeWindow.maxPage;i++) {
					gmElem.innerHTML += myText[i];
					if((i+1)%20 == 0)
						gmElem.innerHTML += '<br/>';
				}
				gmElem.innerHTML += 'end';
			}
		}
	}
	req.open("GET",filename,true);
	//req.overrideMimeType('text/html; charset=big5');
	req.send(null);
}


window.generateLink = function() {
	//Disable onkeyup event for page navigation
	var unsafeWindow = this["unsafeWindow"] || window;
	unsafeWindow.document.onkeyup = null;
	
	//Get Javascript file
	var file;
	var scripts = document.getElementsByTagName('script');
	for(var i=0;i<scripts.length;i++) {
		//match the filename
		match = scripts[i].src.match(/j_cont.*?\.js/);
		if(match) {
			file = scripts[i].src;
			break;
		}
	}
	file = file.replace(/http:\/\/(.*?)\//,'http://' + location.hostname + '/');
	
	
	getServers(file);	
}


//window.setTimeout(generateLink(),1*1000);
window.setTimeout(function() {
		//if(navigator.userAgent.match("Chrome") != null) { //Check for Chrome
		var mainDiv,newElement;	
		mainDiv = document.getElementById('main');
		
		//Inject script
		var script = document.createElement('script');
		script.appendChild(document.createTextNode(padZero + "\n"));
		script.appendChild(document.createTextNode(getServers + "\n"));
		script.appendChild(document.createTextNode(acAjaxReq + "\n"));
		
		if(navigator.userAgent.match("Chrome") != null) {
			script.appendChild(document.createTextNode('window.generateLink ='+ window.generateLink + "\n"));
		}
		else {
			script.appendChild(document.createTextNode('window.generateLink ='+ generateLink + "\n"));
		}
		
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
		
	},
	1*1000);
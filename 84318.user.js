/**
 * @version	1.0
 * @author	Allen Choong
 * @created	2010-08-24
 *
 * The image links are not available by default, using this script to generate image links.
 * The links are generated at the bottom of page. Then one can download the images with
 * favorite download manager. For personal use only.
 *
 * Features:
 * - Enable right click context menu
 */

// ==UserScript==
// @name           www.nonadm.com Image Link
// @namespace      http://allencch.wordpress.com
// @description    Generate image links
// @include        http://www.nonadm.com/manhua/*
// ==/UserScript==

var g_main = 'volpage2';
var g_img = 'Img';

/**
 * \brief Create Ajax Request
 *
 * Modified from other source. Shorten all the ajax function.
 * Example: <br/>
	var req=AjaxReq();
	req.onreadystatechange = function() {
		if(req.readyState==4) {
			document.getElementById("id").innerHTML=req.responseText;
		}
	};
	req.open("GET","test.php",true);
	req.send(null);
 */
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
	var index = str.lastIndexOf('/');
	return str.substring(0,index+1);
}

function getPageLink(num) {
	return location.pathname + '?' + 'ch=1-' + num;
}

function getImageLink() {
	return document.getElementById(g_img).src;
}

function getNumPages() {
	var pages = document.getElementsByName('select2')[0];
	var length = pages.options.length;
	return length;
}

function siteFunc(p) {
	//var p = unsafeWindow.p;
	var num = unsafeWindow.num;
	var sid = unsafeWindow.sid;
	var did = unsafeWindow.did;
	var itemid = unsafeWindow.itemid;
	var page = unsafeWindow.page;
	var code = unsafeWindow.code;
	
	var img="";	
	if(p<10) img="00"+p;else if(p<100) img="0"+p;else img=p;
	var m=(parseInt((p-1)/10)%10)+(((p-1)%10)*3);
	img+="_"+code.substring(m,m+3);
	//document.getElementById("TheImg").src="http://img"+sid+".8comic.com/"+did+"/"+itemid+"/"+num+"/"+img+".jpg";
	//initpage(page,p,"pageindex");
	return "http://img"+sid+".8comic.com/"+did+"/"+itemid+"/"+num+"/"+img+".jpg";
}

function xhr(num,max,gmElem,myLinks) {
	if(num<max) {
		var req = acAjaxReq();
		req.onreadystatechange = function() {
			if(req.readyState == 4) {
				var parser = new DOMParser();
				var response = req.responseText;
				
				alert(response);
				
				var dom = parser.parseFromString(response,'text/xml');
				

				imgSrc = dom.getElementById(g_img).getAttribute('src');
				
				var text = '<a target="_blank" href="'+imgSrc+'">'+padZero(num+1,3)+'</a> ';
				gmElem.innerHTML += text;
				
				xhr(num+1,max,gmElem,myLinks);
			}
		}
		req.open("GET",myLinks[num],true);
		req.overrideMimeType('text/html; charset=big5');
		req.send(null);
		
	}
}

//Modified from http://diveintogreasemonkey.org/download/
function enableMouse() {
	var e, i, all;

    unsafeWindow.document.onmouseup = null;
    unsafeWindow.document.onmousedown = null;
    unsafeWindow.document.oncontextmenu = null;

    all = unsafeWindow.document.getElementsByTagName("*");
    for (i = 0; i < all.length; i += 1) {
        e = all[i];
        e.onmouseup = null;
        e.onmousedown = null;
        e.oncontextmenu = null;
    }
}

window.generateLink = function() {
	enableMouse();


	var mainDiv,newElement;	
	//mainDiv = document.getElementById(g_main);
	mainDiv = document.getElementsByClassName('pagebtn')[1];

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
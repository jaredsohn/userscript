// ==UserScript==
// @name           LinkBucks/ShareCash Links cleaner
// @author	ionbladez
// @version	2010-09-21
// @description    Completely destroys a chance of a linkbucks or sharecash link on the current page. Replaces with a direct link for faster loading and less spam/viruses
// @include        http://*.*
// ==/UserScript==

	var myTitle = document.title;	 // just the page's title, originally.
	var detected = checkPage();
	var changeTarget = false;	 // change link target to new window, if true.
	var silent = true;		 // no prompting.
	var changeTitle = true;	 // if true, update the title to how many links on the page exist.
	var waitLong = 3000;	 // Wait to change title back. (in ms)
	var changeText = true;	 // If true, also filter the text inside links

	if(detected != false) {
    if (silent==true) {
    cleanPage();
    } else {
    alert(checkPage());
    }
	}

function checkPage() {
	var returned = "";
	if (document.body.innerHTML.indexOf("linkbucks",0)>-1 || document.body.innerHTML.indexOf("sharecash",0)>-1) {
	cleanPage();
	returned = "Linkbucks/sharecash links detected. Cleaning links...";
	} else {
	returned = false;
	}
	return returned;
}

function cleanPage() {
	var Links = 0;
	for (var i2=0; i2 < document.getElementsByTagName("a").length; i2++) {
    var theLink = document.getElementsByTagName("a")[i2].href;
    var theText = document.getElementsByTagName("a")[i2].innerHTML;

	theLink = theLink.replace(/http:\/\/(.*)\.linkbucks(.*)url\//g, '');
	theLink = theLink.replace(/http:\/\/(.*)\.sharecash\.(.*)url\//g, '');
	theLink = theLink.replace(/http:\/\/(.*)\.anonym\.to\/\?/g, '');
	theLink = theLink.replace(/http:\/\/anonym\.to\/\?/g, '');

	if (changeText==true) {	
	theText = theText.replace(/http:\/\/(.*)\.linkbucks(.*)url\//g, '<sup>[' + i2 + ']</sup> ');
	theText = theText.replace(/http:\/\/(.*)\.sharecash\.(.*)url\//g, '<sup>[' + i2 + ']</sup> ');
	theText = theText.replace(/http:\/\/(.*)\.anonym\.to\/\?/g, '<sup>[' + i2 + ']</sup> ');
	theText = theText.replace(/http:\/\/anonym\.to\/\?/g, '<sup>[' + i2 + ']</sup> ');
	document.getElementsByTagName("a")[i2].innerHTML = theText;
	}

	document.getElementsByTagName("a")[i2].href = theLink;

	if (changeTarget==true) document.getElementsByTagName("a")[i2].setAttribute("target", "_blank");
	Links++;
	}

	if (changeTitle==true) {
  document.title = "Cleaned links on page. Total links: " + Links;
	var timerId = setTimeout(document.title = myTitle, waitLong);
	}
}

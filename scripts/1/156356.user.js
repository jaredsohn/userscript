// ==UserScript==
// @name           Questionablecontent last read strip
// @description    adds link to last read strip 
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @include        http://*questionablecontent.net/*
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/156356.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/156356.user.js
// @version        1.2
// ==/UserScript==

/*Changelog
1.2
-fix for main page
1.1
-redirect from 'questionablecontent.net/' to 'www.questionablecontent.net'
1.0
-initial release
*/

function main() {
	if (window.location.href == "http://questionablecontent.net/") window.location.href = "http://www.questionablecontent.net/";
	//console.log('QC: Start')
	if(typeof(Storage)=="undefined") {
	   alert("Sorry, your browser doesn't spupport HTML5 localStorage.");
	}
	if(localStorage.getItem('qclastvisit')==null) {
		localStorage['qclastvisit']=0;
	}

	var comic=getComicNumber();
	//console.log('QC: comic ' + comic);
	if(comic!=0) {
		if(localStorage['qclastvisit']<comic) {
			localStorage['qclastvisit']=comic;
		}
	}

	var last = localStorage.getItem('qclastvisit');
	link = document.createElement('li');
	link.innerHTML = '<a href="http://www.questionablecontent.net/view.php?comic=' + last + '">Last read (' + last + ')</a>';
	navig = document.getElementById('comicnav');
	navig.appendChild(link);
}

function getComicNumber() {
	number=document.getElementById('strip');
	if (number==null) {
		number = document.getElementById('comic').getElementsByTagName('img')[0];;
	}
	url=number.src;
	if(url.substr(7,3)=='www') {
		url = (url.substr(0,7) + url.substr(11,url.length-11));
	}
	comic = url.substr(38, url.length-42);
	
	url2=document.URL;
	if(url2.substr(url2.length-9)=='index.php') {
		comic=0;
	}
	if(url2.substr(url2.length-4)=='net/') {
		comic=0
	}
	return comic;
}

main();
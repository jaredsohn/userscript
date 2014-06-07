// ==UserScript==
// @name           FanFiction Layout
// @namespace      ld
// @Author 		   Lee Davies
// @homepage	   http://www.leedavies87.co.uk
// @description    Slightly modifies the site for better template.
// @lastupdated    30/07/2013
// @version        1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @match          *://www.fanfiction.net/s/* 
// @grant          none
// ==/UserScript==
document.body.childNodes[5].childNodes[1].childNodes[1].innerHTML += "<p><b>Template:</b> <a href='#' id='useLight'>Light</a> or <a href='#' id='useDark'>Dark</a></p>";

// User Selection with Event Listener
var useLight = document.getElementById('useLight');
var useDark = document.getElementById('useDark');
useLight.addEventListener("click", function() { customStyle('light'); }, false);
useDark.addEventListener("click", function() { customStyle('dark'); }, false);

function customStyle (style){
	if (style == 'light') {
		localStorage.setItem('style', 'light');
		document.body.setAttribute('style', 'background-color:#FFF !important;  color:#000 !important;');
		document.querySelector('div#content_parent').setAttribute('style', 'background-color:#fff !important;');
		document.querySelector('div#content_wrapper_inner').setAttribute('style', 'width: 90% !important; margin: auto; border: none !important;');
		document.querySelector('div#content_wrapper').setAttribute('style', 'background-color:#fff !important; margin: auto !important; color:#000 !important;');
		// document.querySelector('div#ctemplate').setAttribute('style', 'background-color:#FFF !important;  color:#000 !important; text-align:center;');
		document.querySelectorAll('tr')[1].setAttribute('style', 'background-color:#fff;');
		document.querySelectorAll('tr')[2].setAttribute('style', 'background-color:#fff;');
		document.querySelectorAll('tr')[1].childNodes[0].setAttribute('style', 'text-align: center; color:#000;}');
		cLink();

	} else if (style == 'dark') {
		console.log('useDarj');
		localStorage.setItem('style', 'dark');
		document.body.setAttribute('style', 'background-color:#191919 !important;  color:#dfdfdf !important;');
		document.querySelector('div#content_parent').setAttribute('style', 'background-color:#191919 !important;');
		document.querySelector('div#content_wrapper_inner').setAttribute('style', 'background-color:#191919 !important; width: 90% !important; margin: auto !important; color:#dfdfdf !important; border: none !important;');
		document.querySelector('div#content_wrapper').setAttribute('style', 'background-color:#191919 !important; margin: auto !important; color:#dfdfdf !important; border: none !important;');
		// document.querySelector('div#ctemplate').setAttribute('style', 'background-color:#191919 !important;  color:#dfdfdf !important; text-align:center; font-size: 1.5em;');
		document.querySelectorAll('tr')[1].setAttribute('style', 'background-color:#191919;'); //review box color use to be #313131
		document.querySelectorAll('tr')[2].setAttribute('style', 'background-color:#454545;');
		//document.querySelectorAll('tr')[1].childNodes[0].setAttribute('style', 'text-align: center; color:#dfdfdf;}');
		cLink();
	} else {
		customStyle('light');
	};
}

if (localStorage.getItem("style") == null) {
	customStyle("light");
} else {
	customStyle(localStorage.getItem("style"));
}

//other stuff
document.querySelector('#p_footer').hidden = true;

//Style Link Elements
function cLink(){
	var a = document.getElementsByTagName('a');
	for (var i = 0; i < a.length; i++) {
		a[i].setAttribute('style', 'color:#800');
	};
}



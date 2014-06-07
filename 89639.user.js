// ==UserScript==
// @name           calender
// @namespace      http://www.plurk.com/
// @description    calender
// @include        http://www.plurk.com/*
// ==/UserScript==

(function (window) {
_time="23:59:59"

function showCalendar(gomonth)
{	
	var jscript = document.createElement('script');
	jscript.setAttribute('language','JavaScript');
	jscript.setAttribute('src','http://dl.dropbox.com/u/9578781/calendar2.js');  	  
	document.getElementsByTagName('head')[0].appendChild(jscript);    
	
	var style = document.createElement('link');
    style.setAttribute('href','http://dl.dropbox.com/u/9578781/calendar3.css');
    style.setAttribute('rel','stylesheet');
    style.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(style);
	
	var ftb=document.getElementById('filter_tab')
	var buttom = document.createElement('li');
	buttom.setAttribute('id','calbuttom');
	buttom.innerHTML="<a title='show Calendar' onclick='showCal()' href='#' class='off_tab'>Calendar</a>";
	ftb.appendChild(buttom);
	
}

window.addEventListener("load", function(){
	setTimeout(function(){
		if(document.getElementById('filter_tab')!=null){showCalendar(0);}
	},2000);
	
}, false);

})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);
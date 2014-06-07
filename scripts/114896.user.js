// ==UserScript==
// @name          directory listing ( apache )
// @namespace     http://userscripts.org/scripts/show/114896
// @description	  add style to directory listing - works great with Apache/2.2.14
// @include       http://localhost*
// @include       http://*
// @version       1.0
// ==/UserScript==


/* apache:  used for automatically sorting by 'date modified, descending'
if(window.location.search.substring(1) == "" || window.location.search.substring(1) != "C=M;O=D"){ 
	if(document.referrer.indexOf("?C=M;O=D") != 1 && window.location.href.indexOf("index.") != 1 &&  window.location.href.indexOf(".") != 1){ 
		if(document.title.indexOf("Index of ") != -1){ 
			window.location.href=window.location.href+"?C=M;O=D"; 
		} 
	} 
} 
*/
var title="Index of ";  // for apache
if(document.title.indexOf(title) != -1){ 
	
		var input = document.getElementsByTagName("tr"); 
		o="even"; 
		for (var i = 0; i < (input.length-1);  i++) { 
			if(i>1){ 
				input[i].setAttribute("class",o); 
				if(o=="odd"){ 
					o="even"; 
				}else{ 
					o="odd"; 
				}
			}
		} 
			
		GM_addStyle(" \
html { \
    color: #E9BB64; \
    font-family: 'Times New Roman',Times,serif; \
    font-size: 14px; \
    letter-spacing: 1px; \
} \
body { \
    background-color: #5E5E5E; \
    border: 0 solid #6E6E6E; \
    bottom: 0; \
    color: #E9BB64; \
    font-family: 'Times New Roman',Times,serif; \
    left: 0; \
    letter-spacing: 1px; \
    margin: 0; \
    overflow: auto; \
    padding: 0; \
    right: 0; \
    top: 0; \
} \
table { \
    background-color: #5E5E5E; \
    border: 0 solid #6E6E6E; \
    border-collapse: collapse; \
    padding: 0; \
	width:75%; \
} \
td { \
    border: 0 solid #6E6E6E; \
    color: #E9BB64; \
    font-family: 'Times New Roman',Times,serif; \
    font-size: 14px; \
    letter-spacing: 1px; \
    padding: 10px; \
    vertical-align: top; \
	text-align:left; \
} \
tr.odd { \
    background-color: #5E5E5E; \
} \
tr.even { \
    background-color: #6E6E6E; \
} \
th { \
	text-align: left; \
} \
div { \
    background-color: #5E5E5E; \
    border: 0 solid #6E6E6E; \
    color: #E9BB64; \
    font-family: 'Times New Roman',Times,serif; \
    font-size: 14px; \
    letter-spacing: 1px; \
    padding: 0; \
} \
span { \
    border: 0 solid #6E6E6E; \
    color: #E9BB64; \
    font-family: 'Times New Roman',Times,serif; \
    letter-spacing: 1px; \
    padding: 14px; \
} \
img { \
    border: 0 solid #6E6E6E; \
    height: 16px; \
    width: 16px; \
} \
h1 { \
    color: #E9BB64; \
    display: inline; \
    font-size: 30px; \
    font-weight: bold; \
    letter-spacing: 2px; \
} \
input[type='text'] { \
    border: 2px solid #4A4444; \
    color: #4A4444; \
    font-family: verdana,sans-serif; \
    font-size: 11px; \
    letter-spacing: 1px; \
    padding-left: 3px; \
    width: 100%; \
} \
textarea { \
    border: 2px solid #4A4444; \
    color: #4A4444; \
    font-family: verdana,sans-serif; \
    font-size: 11px; \
    height: 150px; \
    letter-spacing: 1px; \
    padding-left: 3px; \
    width: 100%; \
} \
input[type='submit'], input[type='button'] { \
    background-color: #4A4444; \
    border: 2px solid; \
    font-family: verdana,sans-serif; \
    font-size: 11px; \
    font-weight: bold; \
    letter-spacing: 1px; \
    padding-left: 3px; \
    width: 100%; \
} \
select { \
    border: 2px solid #4A4444; \
    color: #4A4444; \
    font-family: verdana,sans-serif; \
    font-size: 11px; \
    letter-spacing: 1px; \
    padding-left: 3px; \
    width: 100%; \
} \
option { \
    color: #4A4444; \
    font-family: verdana,sans-serif; \
    font-size: 11px; \
    letter-spacing: 1px; \
    padding-left: 3px; \
    width: 100%; \
} \
A:link { \
    color: #DADADA; \
    font-weight: bold; \
    text-decoration: underline; \
} \
A:visited { \
    color: #DADADA; \
    font-weight: bold; \
    text-decoration: underline; \
} \
A:active { \
    color: #E9BB64; \
    font-weight: bold; \
    text-decoration: none; \
} \
A:hover { \
    color: #E9BB64; \
    font-weight: bold; \
    text-decoration: none; \
} \
hr { \
    background-color: #5F8B85; \
    border: 10px solid #5F8B85; \
    color: #5F8B85; \
} \
"); 
} 

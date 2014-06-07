// ==UserScript==
// @name          Craigslist-Easy
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Makes Craigslist a bit more readable and monocrome...
// @include       http://*.craigslist.org/*
// @include       http://*.craigslist.ca/*
// @exclude       http://*.craigslist.org/
// @exclude       http://*.craigslist.ca/


// @version       0.1
// ==/UserScript==


function getElementsByClass(elementtype,className)
{
	var result = [];
	var elements = document.getElementsByTagName(elementtype);
	for(var i = 0; i < elements.length; ++i)
		if(elements[i].className == className)
			result.push(elements[i]);

	return result;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function stripHTML(oldString) {
  return oldString.replace(/<(?:.|\s)*?>/g, "");
}

var css = '.hp #topban {margin-bottom:15px;}.hp #topban h2 {font-size:1.9em;font-weight:normal;}.ban {text-align: left;background: none;border: none;}.hp .ban a {padding:0px;color:#000000;}.hp .col ul li a {font-size: 1.1em;line-height: 1.5em;border-bottom: 1px solid #EAEAEA;color: #333333;}.hp .col h4.ban {background: none;border-bottom:1px solid gray;border-top: none;font-size:1.2em;font-weight:normal;text-align:left;}.hp #leftbar, .hp #rightbar {background: #F4F4F4;border: none;}.hp #topban {margin-bottom: 0px;}.hp #main td {padding:0 10px;}.hp #leftlinks {margin-left:5px;text-align:left;}.hp #leftbar, .hp #rightbar {text-align:left;}.hp #leftbar li, .hp #leftbar a, .hp #rightbar li, .hp #rightbar a  {  border-bottom: 1px solid #EAEAEA;  color: #333333;}';

// ==UserScript==
// @author         ondy1985 <ondy1985(at)gmail(dot)com>
// @name           Travian Bookmarks
// @namespace      Travian:ondy1985
// @description    Allows you to add your own bookmarks to your left menu
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*
// ==/UserScript==

function getElementsByTagAndClassName(tagName, className) {
	var elements = document.getElementsByTagName(tagName);
	var toReturn = new Array();
	var j = 0;
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == className) {
			toReturn[j++] = elements[i];
		}
	}
	return toReturn;
}

function getServerName() {
	var data = location.href.match(/([\w]+[.]travian.[\w]+([.][\w]+)?)/i);
	return "http://" + data[1];
}

function readCookie(cookiename) {
	var reg = new RegExp(cookiename + "=([^;\n\r]*);?", "i");
	var data = reg.exec(document.cookie);
	if (data == null || data.length <= 1) {
		return null;	
	}	
	return data[1];
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readBookmarks() {	
	var value = readCookie("TQL_BOOKMARKS");
	if (value == null ) {
		return new Array();
	}
	var arr = value.split(/[|]{2}/);
	var ret = new Array();
	for (var i = 0; i < arr.length; i++) {
		var b = arr[i].split(/[:][=]/);
		ret.push(b);
	}
	return ret;
}

var addFunc = "var name = prompt('Enter name for this bookmark', '');"
	+"	if (name != null) {var string = name + ':=' + location.href;"
	+"	var data = document.cookie.match(/TQL_BOOKMARKS=(.*:=.*)?;?/i);"
	+"	var oldvalue;"
	+"	if (data == null ||data.length <= 1 || data[1] == '') {"
	+"		oldvalue = '';"
	+"	} else {"
	+"		oldvalue = data[1] + '||';"
	+"	}"
	+"	var newValue = oldvalue + string;"
	+"	var date = new Date();"
	+"	date.setTime(date.getTime()+(365*24*60*60*1000));"
	+"	var expires = '; expires='+date.toGMTString();"
	+"	document.cookie = 'TQL_BOOKMARKS='+newValue+expires+'; path=/';}";
	
function readHtmlBookmarks() {
	var arr = readBookmarks();
	var html = "";
	for (var i = 0; i < arr.length; i++) {
		html += '<a href="' + arr[i][1] + '">' + arr[i][0] + '</a>';
	}
	
	return html;
}
	
var html = '<p>' + readHtmlBookmarks() + '<br /><a href="#" onclick="'+addFunc+'">Add bookmark</a></p>';

document.getElementById("side_navi").innerHTML += html;
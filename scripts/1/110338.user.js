// Sahibinden.com Son Gezilen Ilanlar
// version 0.1
// 2011-08-14
// Copyright (c) 2011, Sahibinden Hacker
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sahibinden.com Son Gezilen Ilanlar
// @namespace     http://userscripts.org/users/sahibinden
// @description   Sahibinden.com'da son gezdiginiz ilanlari sayfanin en altinda gosterir
// @include       http://www.sahibinden.com/*
// @match         http://www.sahibinden.com/*
// ==/UserScript==

function $(id) {
    return document.getElementById(id);
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

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


function getData(key) {
    if (GM_getValue) {
        return GM_getValue(key)
    }else{
        // read from cookie
        return readCookie(key)
    }
}

function setData(key, value) {
    if (GM_setValue) {
        GM_setValue(key, value)
    }else{
        // write to cookie
        return createCookie(key, value, 300);
    }
}

function getList() {
    list = getData("_listingHistory");
    result = [];
    if(list) {
        listings = list.split('|');
        for(i in listings) {
            var item = listings[i].split(',');
            result.push(item);
        }
    }
    return result;
}

var style = '#_listingHistory { position:fixed; bottom: -116px; left:0; right:0; height:140px; z-index:1000;} #_listingHistory.visible {bottom:0;}' + 
'#_listingButton, #_listingHistoryList { background-color:rgba(0,0,0,0.7); }'+
'#_listingHistoryList { height:100px; padding:10px;}'+
'#_listingButton { cursor:hand; display:inline-block; height:14px; line-height:14px; color:#fff;padding:5px 20px; margin-left:20px; border-radius: 5px 5px 0 0;}'+
'#_listingHistoryList li { float:left; margin:0 5px;}' +
'#_listingHistoryList img { display:block; margin:0 auto;}' +
'#_listingHistoryList a { display:block; background-color:transparent; color:#fff; width:120px; text-align:center;}';

function togglerClick(){
    var bar = document.getElementById("_listingHistory");
    if (bar.getAttribute("class") == 'visible') {
        bar.setAttribute('class', '');
    }else{
        bar.setAttribute('class', 'visible');
    }
}

(function(){
    // url,title,thumb|url,title,thumb
    var listings = getList();
    
    // Ilan sayfasinda miyiz
    if (/^\/(ilan|listing)\//.test(document.location.pathname)) {
        var url = $("navtab").getElementsByTagName('a')[0].href.replace("http://www.sahibinden.com","");
        var newListings = [];
        var i = 0;
        for(listing in listings){
            if (i < 9) {
                if ( ! (listings[listing][0] == url) ) {
                    newListings.push(listings[listing].join(','));
                    i++;
                }
            }
        }
        
        var title = $("classifiedTitle").innerHTML.replace(',', '&#44;').replace('|','&#124;');
        var img = $("adDefaultImage").getElementsByTagName('img')[0].src;
        var metas = document.getElementsByTagName('meta');
        for (m in metas) {
            if (metas[m].name == "og:image") {
                img = metas[m].content;
            }
        }
        var row = url+','+title+','+img;
        
        newListings = newListings.reverse()
        newListings.push(row);
        newListings = newListings.reverse().join('|');

        setData("_listingHistory", newListings);
        
        
        listings = getList();
    }


    addGlobalStyle(style);
    var Body = document.getElementsByTagName('body')[0],
        Bar = document.createElement('div'), 
        Button = document.createElement('span'),
        List = document.createElement('ul');
    
    listHTML = '';
    for(listing in listings){
        var l = listings[listing];
        listHTML += '<li><a href="' + l[0] + '" title="' + l[1] + '"><img src="' + l[2] + '" /> '+ l[1].substr(0, 20) + '...</a></li>';
    }
    
    List.innerHTML = listHTML;
    
    Bar.setAttribute("id", '_listingHistory');
    
    Button.setAttribute("id", '_listingButton');
    Button.innerHTML = 'Son Gezdiğiniz İlanlar';
    Button.addEventListener('click', togglerClick, false);
    
    List.setAttribute("id", '_listingHistoryList');
    
    Bar.appendChild(Button);
    Bar.appendChild(List);
    Body.insertBefore(Bar, Body.firstChild);
})();

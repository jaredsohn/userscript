// ==UserScript==
// @name          FIM Dark Background
// @namespace     http://www.herpderp.com
// @description   Change background image / layout / text 
// @include       http://*.fimfiction.net/*
// @include       http://poni.0au.de/*
// ==/UserScript==
// Changelog
// 26/05/2012 Bottom background image added
// 19/03/2012 Fixed for opera

// Opera functionality
GM_addStyle=function(css){ document.documentElement.appendChild(document.createElement('style')).appendChild(document.createTextNode(css)); };
GM_openInTab=window.open;
GM_deleteValue=function(k){ return localStorage.removeItem(k); }
GM_setValue=function(k,v){ return localStorage.setItem(k,v); }
GM_getValue=function(k){ return localStorage.getItem(k); }
GM_listValues=function(){ var i=0,ii=localStorage.length,ret=[]; for(;i<ii;++i){ ret.push(localStorage.key(i)); } return ret; };
GM_xmlhttpRequest=function(obj){ return; };
  
// Colors
GM_addStyle("div.content div.content_box div.main div.chapter_content div.textarea textarea chapter_content content_format_sans_serif content_format_wob content_format_big { background-color: #333; width:80%; height:500; !important; }"); 
GM_addStyle("div.content div.inner { max-width:85%; !important; }"); 
GM_addStyle("div.content div.inner_margin { width:80%; max-width:85%; !important; }"); 
GM_addStyle("div.content div.content_box div.main div.chapter_content { max-width:100%; !important; }"); 

//images
GM_addStyle(".content { background-image: url('http://www.herpderp.com/fim/base.png') !important; }"); 
GM_addStyle("div.filter_box { background-image: url('http://www.herpderp.com/fim/base2.png') !important; }"); 
GM_addStyle("div.related_stories { background-image: url('http://www.herpderp.com/fim/base3.png') !important; }"); 
GM_addStyle(".latest_stories { background-image: url('http://www.herpderp.com/fim/base4.png') !important; }"); 
GM_addStyle(".story { background-color: #DFD9C9; !important; }"); 
GM_addStyle(".arrow { background-image: url('http://www.herpderp.com/fim/arrow.png') !important; }"); 
GM_addStyle(".calendar { background-image: url('http://www.herpderp.com/fim/calendar.png') !important; }"); 
GM_addStyle("div.content_background { background-image: url('http://www.herpderp.com/fim/bg.png') !important; }"); 


//text size in big mode
GM_addStyle(".content_format_big {font-size:1.4em!important;}");
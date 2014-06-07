// ==UserScript==
// @name           Tusfiles Auto Downloader Rev 2014
// @description    Automatically download From Tusfiles
// @namespace      http://cepot-gaul.blogspot.com/
// @author         Mohammed Dikdik Rahmadi
// @version        4.0.1
// @date           24-03-2014
// @include        http://www.tusfiles.net/*
// @include        https://www.tusfiles.net/*
// @include        http://tusfiles.net/*
// @include        https://tusfiles.net/*
// @include        http://z.tusfiles.net/*
// @include        http://t.tusfiles.net/*
// ==/UserScript==

var f= $('form'); 
if(f[0].quick != null) { 
//uncheck "use out download manager 
f[0].quick.checked = false;

var d= $( "input[value='Direct download link']" ); 
if(d != null) d.click(); 
}

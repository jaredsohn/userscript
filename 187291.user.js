// ==UserScript==
// @name           Tusfiles Auto Download [Kaum Ndaloe 2014]
// @description    Tusfiles Automatically Download 
// @icon            http://www.gravatar.com/avatar/bdb861650cd3b4a7be02052005302d6b.png
// @namespace      http://kaumndaloe.blogspot.com/
// @author         Kaum Ndaloe
// @version        V.1
// @date           1-1-2014
// @include        http://www.tusfiles.net/*
// @include        http://tusfiles.net/*
// ==/UserScript==

var f= $('form'); 
if(f[0].quick != null) { 
//uncheck "use out download manager 
f[0].quick.checked = false;

var d= $( "input[value='Download File']" ); 
if(d != null) d.click(); 
}

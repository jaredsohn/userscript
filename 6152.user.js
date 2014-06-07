// JavaScript Document
// ==UserScript==
// @name          Google Plus
// @description   Enhance your google browsing experience by adding a collection of handy searches to the main page.
// @include       *google.com/ig
// @include       *www.google.com/ig
// ==/UserScript==

var searchesbox = document.createElement("div");
searchesbox.innerHTML = '<div style="color:#F8F8F8; border: 1px dotted grey; background-color: #F8F8F8; padding-top:2px; font-family:verdana; font-size:0.9em; width:14%; height:20px; position:absolute;"> <a href="http://wikipedia.org" style="color:#F8F8F8;"> <img src="http://mudshark.brookes.ac.uk/heike/Wikipedia-favicon.gif" border="0px"></img> </a> <a href="http://www.yahoo.com/" style="color:#F8F8F8;"> <img src="http://www.fetchbook.info/images/favicon_yahoo.gif" border="0px"> </a> </img> <a href="http://del.icio.us/search/?fr=del_icio_us&p=&type=all" style="color:#F8F8F8;"> <img src="http://bonq.net/sandbox/links/images/del.icio.us.favicon.gif" border="0px"> </a> </img> <a href="http://www.msn.com/" style="color:#F8F8F8;"> <img src="http://www.favicon.jp/icon/img402a15063b5bd.png" border="0px"> </a> </img> <a href="http://www.amazon.com/" style="color:#F8F8F8;"> <img src="http://img.infoplease.com/images/amazon_favicon.gif" border="0px"> </a> </img> <a href="http://www.ebay.com/" style="color:#F8F8F8;"> <img src="http://www.makikoitoh.com/images/favicons/fav_ebay.gif" border="0px"> </a> </img> <a href="http://digg.com/" style="color:#F8F8F8;"> <img src="http://www.dcs.shef.ac.uk/~stc/images/favicon_digg.PNG" border="0px"> </a> </img> </div>'			
document.body.insertBefore(searchesbox, document.body.firstChild);







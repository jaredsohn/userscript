
// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
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
// @name          Amazon to Flipkart
// @namespace     http://shekispeaks.wordpress.com
// @description   Converts Amazon Pages to Flipkart
// @include       http://amazon.com/*
// @include       http://www.amazon.com/*
// ==/UserScript==
//alert("amazon");
window.addEventListener(
    'load', 
    function() { var metas = document.getElementsByTagName('META');
                 var i;
                 for (i = 0; i < metas.length; i++)
                	if (metas[i].getAttribute('NAME') == "title")
                     		break;
		 if(i<metas.length)
		 {
                	var bookName = metas[i].getAttribute('CONTENT');
                	var book = bookName.substring(12);
			
			var bookarray=book.split(' ');
			var searchstr=bookarray[0];
			for (i=1;i<bookarray.length;i++)
				searchstr=searchstr+"+"+bookarray[i];
                	window.location.href = "http://www.flipkart.com/search.php?dd=0&query="+searchstr 
		}
	       },
    true);



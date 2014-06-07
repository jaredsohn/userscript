// ==UserScript==
// @name           VaticanDocs
// @namespace      TheRuleofNorm
// @description    Widens Document Pages on the Vatican Website
// @include        http://www.vatican.va/*
// @include        http://vatican.va/*
// ==/UserScript==

	window.bytes_new_width = function()
	{
	    // define new size
	    var new_size = "100%";
	 
	    // get the main table and reset its width
	    var tbl = document.getElementsByTagName('table');
	    var l = tbl.length;
	    for (var i=0; i<l; i++)
	    {
	        // there is only one table with a width
	        // attribute of 609
	        if (tbl[i].getAttribute("width") == 609) 
	        {
	            tbl[i].setAttribute("width", new_size);
	        }
	    }
	 
	}
	 
window.addEventListener("load", window.bytes_new_width, false);



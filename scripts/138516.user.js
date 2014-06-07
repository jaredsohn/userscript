	// ==UserScript==
	// @name                Better Sina
	// @namespace	        http://userscripts.org/
	// @description	        simple script to make sina simpler
	// @include				http://*.sina.com.cn/*
	// @run-at document-start
	// ==/UserScript==

	// Remove Share
	var elmDeleted = document.getElementById("sinashareto");
	elmDeleted.parentNode.removeChild(elmDeleted);
	
	// Remove H Pics
	var elmDeleted = document.getElementById("slideTJ");
	elmDeleted.parentNode.removeChild(elmDeleted);
	
	// Remove Weibo Rec
	var elmDeleted = document.getElementById("ipylcf01");
	elmDeleted.parentNode.removeChild(elmDeleted);
	
	// Remove Comments
	var elmDeleted = document.getElementById("comment_wrapper");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("HSpace_10");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("blk_n001_025");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("line_c8d8f2_1px");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("blkComment");
	elmDeleted.parentNode.removeChild(elmDeleted);
	
	// Other things
	var elmDeleted = document.getElementById("moreInfo");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("blkContentBtmSearch");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("btmSearch");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("hotwords");
	elmDeleted.parentNode.removeChild(elmDeleted);
	var elmDeleted = document.getElementById("sTb4");
	elmDeleted.parentNode.removeChild(elmDeleted);

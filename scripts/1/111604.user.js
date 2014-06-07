// ==UserScript==
// @name            View Image info on Hover
// @author          Kirk Wallace
// @description     Hover images (screenshots/coverart) to get their details without having to right click view image info
// @license         Creative Commons Attribution License
// @version	    0.1.1
// @include         http*
// @released        2011-3-21
// @updated         2011-3-23
// @compatible      Greasemonkey
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

//0.1.1 fixed for ajax thanks to TnS for the bind("DOMNodeInserter" 
//	fixed animation to be less intruding hopefully per request

		    function showSize(w, h, s) {
  		  	$("#content").append("<div id='text' style='position:fixed; left:0; bottom:40px; text-align:center; font-size:14px; color:#fff; padding:5px 0 10px 0px;background:#121212 url(httpx://img832.imageshack.us/img8l32/3545/quotej.png) left top no-repeat; border-top:1px solid #444; border-bottom:none; -moz-border-radius:5px; -webkit-border-radius:5px; -o-border-radius:5px; border-radius:5px;'></div>");
		    	$("#text").animate(
				{ 
		    		 height:'2em', width:'32%'
  				}, 200 ).text(w + "x" + h +"px | Host: " + s);
		    }
			function showSrc(s) {
				$("#text").text("Source " + s);
		    }

			function hideSize() {
		    		$("#text").animate(
				{ 
		    		width:'0',
  				}, 200 ).text("");
		    }
			 
		$('img').hover(
		  		function() { 
				  	var link = jQuery(this).attr('src');
				  	var height = this.naturalHeight;
				  	var width = this.naturalWidth;
		     			showSize(width, height, link);

		     		//showSrc(link); 
		    	}, 
		 		function() { hideSize() });

		  
// ==/UserScript==
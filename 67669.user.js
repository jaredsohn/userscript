// ==UserScript==
// @name           IDG.se bildspel som ajax
// @version        0.3.0
// @namespace      http://tapiren.se/category/userscripts
// @include        http://*.idg.se/*
// ==/UserScript==

(function(){
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
	GM_JQ.type = 'text/javascript';

	document.getElementsByTagName('head')[0].appendChild(GM_JQ);

	var image = new Array();
	var text = new Array();
	var selected = 0;
	var total = 0;

	// Vänta till sidan är laddad
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { 
			window.setTimeout(GM_wait,100); 
		} else { 
			$ = unsafeWindow.jQuery; letsJQuery(); 
		}
	}
	GM_wait();
	
	// Sidan har laddats färdigt.
	function letsJQuery() {
		getImages(document.location.href.split("?")[0]+"?showGallery=true&allimages=true");
	}
	
	// Hämta alla bilder för galleriet och cache:a dessa
	function getImages(url)
	{
		$.ajax({
			type: "GET",
			url: url,
			error: function(xhr, desc, exceptionobj) {
				return true;
			},
			success: function(responseText, responseCode) {
				var i = 0;
				var divs = $(responseText).find("div.picture_wrapper");
				$(divs).each(function() {
					text[i] = $(this).find("div.text").text();
					image[i] = $(this).find("img").attr("src");
					
					i++;
				});
				total = i;
				
				var index = querySt("img");
				if (index > 0) {
					selected = querySt("img")-1;
				}
				
				rewriteLinks();
			}
		});
	}
	
	// Gör om länkarna så att de hämtar våra cachade bilder istället
	function rewriteLinks()
	{
		if ($('div.previous a').length == 0) {
			$('div.previous').html('<a href="'+document.location.href+'">&laquo;</a>');
		}
		if ($('.next a').length == 0) {
			$('div.next').html('<a href="'+document.location.href+'">&raquo;</a>');
		}
		
		$('.next a,.picture a').click(function() {
			if (selected+1 < total)
			{
				setImage(++selected);
			}
			return false;
		});
		$('.previous a').click(function() {
			if (selected > 0) {
				setImage(--selected);
			}
			return false;
		});
		
		$("#mycarousel li a").click(function() {
			selected = $("#mycarousel li a").index(this);
			setImage(selected);
			
			return false;
		});
	}
	
	// Visa vald bild
	function setImage(imageid)
	{
		$(".jcarousel-big-picture .picture img").attr("src", image[imageid]);
		$(".jcarousel-big-picture div.text").text(text[imageid]);
		$(".counter").html((imageid+1)+"/"+total);
	}
	
	// Hämta en parameter från frågesträngen
	function querySt(ji) {
		var hu = document.location.href;
		var gy = hu.split("&");
		for (i=0;i<gy.length;i++) {
			var ft = gy[i].split("=");
			if (ft[0] == ji) {
				return ft[1].split("#")[0];
			}
		}
	}

})();

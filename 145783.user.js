// ==UserScript==
// @name           Cerlestes Ore Graph Hover
// @description    Makes trend graphs bigger on hover
// @author         Han Prower
// @grant          none
// @include        http://ore.cerlestes.de/*
// @version        0.2
// ==/UserScript==


// CONFIGURABLE SETTINGS //

var newWidth = 440; //set the width of the large graph here
					// width is 1.1 times bigger than height (e.g. 440 width by 400 height)
					// max width is 574 due to the Google chart API limits

// END OF CONFIGURABLE SETTINGS //
//
//
// DO NOT EDIT BELOW THIS LINE //

$('body').ajaxComplete(function() {
	$('.pricetrend img').hover(function(e) {
		if ((newWidth == null) || (isNaN(newWidth) == true)) newWidth = 440;
		if (newWidth > 574) newWidth = 574;
		
		var newHeight = newWidth / 1.1;
		var newHeight = Math.round(newHeight);
		
		var source = $(this).attr("src");
		var newSize = "chs="+newWidth+"x"+newHeight;
		var source=source.replace("chs=220x200",newSize);
		
		var newimage='<img src="'+source+'" >';
		var newdiv='<div style="display:none;position:absolute;padding:5px;border:1px solid black;border-radius:4px;background-color:white;" id="largegraph" >'+newimage+'</div>';

		jQuery(newdiv);
		jQuery(document.body).append(newdiv);

		$('#largegraph').stop(1, 1).fadeIn();
		if (e.pageX < newWidth) {
			$('#largegraph').offset({
				left: newWidth + e.pageX - $('#largegraph').outerWidth()
			});
		}
		else {
			$('#largegraph').offset({
				left: e.pageX - $('#largegraph').outerWidth()
			});
		}
		$('#largegraph').offset({
			top: e.pageY - $('#largegraph').outerHeight()
		});
		$('#largegraph').stop(1, 1).fadeIn();
	},
	function () {
		$('#largegraph').remove();
	});
	$(".pricetrend img").mousemove(function(e){
		if (e.pageX < newWidth) {
			$('#largegraph').offset({
				left: newWidth + e.pageX - $('#largegraph').outerWidth()
			});
		}
		else {
			$('#largegraph').offset({
				left: e.pageX - $('#largegraph').outerWidth()
			});
		}
		$('#largegraph').offset({
			top: e.pageY - $('#largegraph').outerHeight()
		});
	});
});

// EOF //
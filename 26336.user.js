// ==UserScript==
// @name           One Simple Manga Ajax Viewer
// @namespace      InstantKarma
// @description    New improved jQuery version now with 100% more jQuery goodness.
// @include        http://www.onemanga.com/*/*/*/
// ==/UserScript==

(function(){
  
GM_xmlhttpRequest({
   method: "GET",
   url: "http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js",
   onload: run
});

var OM_maxPreloadImages = 3;
var OM_preloadArray = new Array();
var OM_preloadedArray = new Array();
var OM_imageBuffer;
var OM_nextPageURL;
var OM_loadingImageURL = 'data:image/gif;base64,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';


function run(details) {

	if (details.status != 200) {
		GM_log("no jQuery found!");
		return;
	}

	eval(details.responseText);
	
	var $ = jQuery;
	
	
	
	
	$(window).bind( 'load', function(){
		initializeImageBuffer();
		initializeImageArray();
		$('.one-page a').bind('click',function(){
			$('.one-page img').attr('src', OM_loadingImageURL);
			addImageToArrayFrom(OM_nextPageURL);
			return false;
		});
		$('.one-page img').bind('load', function(){
			if (this.src == OM_loadingImageURL){
				this.src = OM_preloadedArray.shift();
				scroll(0,0);
			}
		})
		
		$('body').css('background', 'black none repeat scroll 0 0');
		$('.one-page img').css('border', 'none');
		$('.one-page a').css('color', 'black');
		unsafeWindow.document.getElementById('manga_list').onchange = null;
			
	});
}

function initializeImageArray(){
	OM_nextPageURL = $('.one-page a').attr('href');
	addImageToArrayFrom(OM_nextPageURL);
}

function initializeImageBuffer() {
	OM_imageBuffer = unsafeWindow.document.createElement('img');
	$(OM_imageBuffer).bind('load', function() {
		if(OM_preloadArray[0]) {
			OM_preloadedArray.push(OM_preloadArray[0]);
			this.src = OM_preloadArray.shift();
			console.log(this.src);
		}
	});
}

function updateImageBuffer(){
	$(OM_imageBuffer).trigger('load');
}

function addImageToArrayFrom(url){
		$.get(url, null, function (data, textStatus) {
			if (textStatus != '404'){
				OM_preloadArray.push($(data).find('.one-page img').attr('src'));
				var imagesToPreload = OM_maxPreloadImages - OM_preloadedArray.length;
				if(OM_preloadArray.length < imagesToPreload){
					addImageToArrayFrom($(data).find('.one-page a').attr('href'));
				} else {
					OM_nextPageURL = $(data).find('.one-page a').attr('href');
					updateImageBuffer();
				}
			}
		})
}

})();
// ==UserScript==
// @name			Netdate.dk Plus
// @namespace		netdate_dk_plus
// @description		Netdate.dk Plus
// @version			0.002
// @require			http://sizzlemctwizzle.com/updater.php?id=122301&days=1
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @include			http://netdate.dk/profile/*
// @include			http://netdate.dk/matchmaker/match_suggestions*
// ==/UserScript==

$(document).ready(function(){
	if ($('#user_gallery_thumbs').html().length == 0) {
		return false;
	}

	var thumbsCount = 0
	var imageOpen = 0
	
	if ($("#user_gallery_thumbs a").length == 0) {
		$.each($("#user_gallery_thumbs li"), function(key, value) {
			var content = $(this).html();
			
			$(this).html('<a href="javascript:void(0);">'+content+'</a>')
		});
	}
	
	$.each($("#user_gallery_thumbs a"), function(key, value) {
		$(this).attr("href", "javascript:void(0);");
		$("img", this).attr("rel",key);
		thumbsCount++
	});
	
	thumbsCount--
	
	$("#user_gallery_thumbs img").click( function() {
		var src = $(this).attr("src").replace("/xsmall_","/xlarge_");
		imageOpen = $(this).attr('rel');
		
		if ($('#lightbox_bg').length == 0){
			$('body').append('<div id="lightbox_bg" style="position:absolute; top:0px; left:0px; height:'+$(document).height()+'px; width:100%; background-color:#000; z-index:2000; opacity: 0.5; -khtml-opacity: 0.5; -moz-opacity:0.5; filter: alpha(opacity=50);"></div><div id="lightbox_content" style="-webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -o-user-select: none; user-select: none; position:absolute; margin-top:20px; top:0px; left:0px; width:100%; z-index:2001;"> <div style="padding-botton: 5px; font-size:25px; color:#FFF; font-weight:bold; text-align:center;"> <span style="cursor:pointer;" id="imagePrevLightbox"> < </span> <span style="cursor:pointer;" id="closeLightbox"> x </span> <span style="cursor:pointer;" id="imageNextLightbox"> > </span> </div> <img id="lightbox_image" style="background:#FFF; border: solid 10px #FFF; display:block; margin:0px auto;" alt="" src="'+src+'" /></div>');
		};
		
		$("#imagePrevLightbox").click(function() {
			if (imageOpen == 0) {
				imageOpen = thumbsCount
			}else{
				imageOpen--
			}

			$('#lightbox_image').attr('src',$('img[rel="'+imageOpen+'"]').attr("src").replace("/xsmall_","/xlarge_"));
		});
		
		$("#closeLightbox").click(function() {
			$('#lightbox_bg').remove();
			$('#lightbox_content').remove();
		});
		
		$("#imageNextLightbox").click(function() {
			if (imageOpen == thumbsCount) {
				imageOpen = 0;
			}else{
				imageOpen++
			}
			
			$('#lightbox_image').attr('src',$('img[rel="'+imageOpen+'"]').attr("src").replace("/xsmall_","/xlarge_"));
		});
	});
});

$(window).resize(function() {
	$('#lightbox_bg').css('height',$(document).height())
});
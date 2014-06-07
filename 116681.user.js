// ==UserScript==
// @name	sankaku image viewer
// @namespace	 sankaku
// @description	Allow view image by clicking on icon near image thumbnail
// @version	0.1
// @include http://chan.sankakucomplex.com/post/index*
// @include http://chan.sankakucomplex.com/?tags=*
// ==/UserScript==

//append layout fix
GM_addStyle("div.content {width: 75% !important;}");
// append content-background
GM_addStyle("span.thumb {background-color: #333;}");
// notice style feature
GM_addStyle("#notice { position: fixed; top: 0; right:0; padding: 10px !important; background-color: #FF761C; color: #fff !important; border: double 3px #fff; z-index: 50003 }");
//append main styles
GM_addStyle("a.image-view-link { display: inline-block; width: 20px; height: 20px; position: relative; float: right; } .success-load { color: #68C21E !important} .fail-load { color: #BA1F14 !important}");
GM_addStyle("#big-image {display:block; margin: 0 auto} #viewer-controls { padding: 3px; whitespace: nowrap } .r1-unit {font-size: 110%} .r2-unit {font-size: 125%} .r3-unit {font-size: 130%} .r4-unit {font-size: 145%} .r5-unit {font-size: 155%}");


(function($){
	// load SimpleModal plugin
	var simpleModalLoaded= false;
	unsafeWindow.jQuery.getScript('http://simplemodal.googlecode.com/files/jquery.simplemodal.1.4.1.min.js',
		function(data, textStatus){
			simpleModalLoaded = true;
			$.modal = unsafeWindow.jQuery.modal;
	});

	$(function(){
		// addpend load image links after ajax load next page (for autopaging mode)
		$('.content').ajaxComplete(function() {
			$('.content .thumb:not(.haspreview)').each(function(){
				var thumbSpan = $(this);
				thumbSpan.addClass('haspreview');
				var link = thumbSpan.children('a:last');
				// exclude dowloadable content
				if(!link.children('img').is('[src$=download-preview.png]'))
				{
					thumbSpan.prepend('<a href="#" class="image-view-link" title="view image" data-url="'+link.attr('href')+'">◥</a>');
				}
			}); 
		});

		var modalSettings = {
			opacity: 85,
			overlayCss:{
				'background-color': '#000'
			},
			containerCss: {
				'border': 'solid 2px #FF761D',
				'background-color': '#333',
				'padding': '0 5px 5px',
				'color': '#fafafa'
			},
			overlayClose: true,
			zIndex: 50000,
			onShow: function(){
				$('#notice').hide();
			}
		};	
		
		$('.image-view-link').live('click', function(event){
			event.preventDefault();
			var link = $(this);
			var content = $.ajax({
					url: $(this).attr('data-url'),
					beforeSend: function(jqXHR, settings)
					{
						link.text('◣');//bottom right triangle
					},
					error: function(jqXHR, textStatus, errorThrown)
					{
						link.text('◥').removeClass('success-load').addClass('fail-load');//:(
						alert(textStatus);
					},
					dataFilter: function(data, type)
					{			
						$.showImage($('#post-view', data), function(){
							link.text('◥').removeClass('fail-load').addClass('success-load');//green triangle
						});
					}
				});
		});
		// show image in simpleModal
		$.showImage = function(data, beforeLoad)
		{
			if(simpleModalLoaded)
			{
				// show progress message
				$('#notice').text('Loading Content...').show();
				// tools separator
				var 	SPT= ' | ';
				
				
				var	imageSource = $('#image', data);
				var	highresLink = $('#highres', data).attr('target','_blank');
				var	addfavLink = $('#add-to-favs a', data);
				var	rating = $('#rating a', data).text('★'); 
				// collect additional controls
				var	additional = $('<div id="viewer-controls">Original:</div>').append(highresLink, SPT, addfavLink, SPT, 'rating: ',rating,SPT,'<a href="#" class="simplemodal-close">close</a>');
				// fit image size to viewport size
				var size = $.resizeToViewPort(imageSource.attr('width'), imageSource.attr('height'));
				// create image
				var img = $('<img>').attr(
					{
						src: imageSource.attr('src'),
						title: imageSource.attr('alt'),
						width: size.width,
						height: size.height,
						id: 'big-image'
					});
				// create image container
				var imageContainer= $('<div>').attr('id','big-image-container').append(additional, img);
				
				if(beforeLoad)
					beforeLoad();
				$('#notice').text('Loading Image...').show();
				// bind image load event
				img.load(function(){
					$.modal(imageContainer, modalSettings);
				});
			}
		};
		// fit size to viewport
		$.resizeToViewPort = function(widthString, heightString){
			var	width = Number(widthString),
					height = Number(heightString);
			var	viewportWidth = $(unsafeWindow).width() - 20,
					viewportHeight = $(unsafeWindow).height() -40;
			if(height > viewportHeight)
			{
				width = viewportHeight * width / height;
				height = viewportHeight;
			}
			if(width > viewportWidth)
			{
				height = viewportWidth * height / width
				width = viewportWidth;
			}
			height = Math.round(height);
			width= Math.round(width);
			
			return {
				width: width,
				height: height
			}
		}
		
		$('#notice').click(function(){
			$(this).hide();
		});
	});
})(unsafeWindow.jQuery)
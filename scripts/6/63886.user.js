// ==UserScript==
// @name			rave.cz fotoalbum fixer
// @namespace	CodeBit
// @include		http://www.rave.cz/fotky/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
(function($) {
	$.fn.thumbPopup = function(options)
	{
		//Combine the passed in options with the default settings
		settings = jQuery.extend({
			popupId: "thumbPopup",
			popupCSS: {'border': '10px solid #FFFFFF', 'background': '#FFFFFF'},
			imgSmallFlag: "_t",
			imgLargeFlag: "_l",
			cursorTopOffset: 5,
			cursorLeftOffset: 20,
			loadingHtml: "<span style='padding: 2px;'>Loading</span>"
		}, options);
		
		//Create our popup element
		popup =
		$("<div />")
		.css(settings.popupCSS)
		.attr("id", settings.popupId)
		.css("position", "absolute")
		.appendTo("body").hide();
		
		//Attach hover events that manage the popup
		$(this)
		.hover(setPopup)
		.mousemove(updatePopupPosition) //hybe sa obrazok s mysou
		.mouseout(hidePopup);
		
		function setPopup(event)
		{
			var fullImgURL = $(this).attr("src").replace(settings.imgSmallFlag, settings.imgLargeFlag);
			
			$(this).data("hovered", true);
			
			//Load full image in popup
			$("<img />")
			.bind("load", {thumbImage: this}, function(event)
			{
				//Only display the larger image if the thumbnail is still being hovered
				if ($(event.data.thumbImage).data("hovered") == true) {
					$(popup).empty().append(this);
					updatePopupPosition(event);
					$(popup).show();
				}
				$(event.data.thumbImage).data("cached", true);
			})
			.attr("src", fullImgURL);
			
			//If no image has been loaded yet then place a loading message
			if ($(this).data("cached") != true) {
				$(popup).append($(settings.loadingHtml));
				$(popup).show();
			}
			
			updatePopupPosition(event);			
		}
		
		function updatePopupPosition(event)
		{
			var windowSize = getWindowSize();
			var popupSize = getPopupSize();
			if ( (windowSize.width - popupSize.width - settings.cursorLeftOffset) > event.pageX + 15){
				$(popup).css("left", windowSize.width - popupSize.width - settings.cursorLeftOffset);
			} else {
				$(popup).css("left", settings.cursorLeftOffset);
			}
			$(popup).css("top", windowSize.scrollTop + settings.cursorTopOffset);
			/*
			if (windowSize.width + windowSize.scrollLeft < event.pageX + popupSize.width + settings.cursorLeftOffset){
				$(popup).css("left", windowSize.width - popupSize.width); //$(popup).css("left", event.pageX - popupSize.width - settings.cursorLeftOffset);
			} else {
				$(popup).css("left", windowSize.width - popupSize.widtht); //$(popup).css("left", event.pageX + settings.cursorLeftOffset);
			}
			if (windowSize.height + windowSize.scrollTop < event.pageY + popupSize.height + settings.cursorTopOffset){
				$(popup).css("top", event.pageY - popupSize.height - settings.cursorTopOffset);
			} else {
				$(popup).css("top", event.pageY + settings.cursorTopOffset);
			}
			*/
		}
		
		function hidePopup(event)
		{
			$(this).data("hovered", false);
			$(popup).empty().hide();
		}
		
		function getWindowSize() {
			return {
				scrollLeft: $(window).scrollLeft(),
				scrollTop: $(window).scrollTop(),
				width: $(window).width(),
				height: $(window).height()
			};
		}
		
		function getPopupSize() {
			return {
				width: $(popup).width(),
				height: $(popup).height()
			};
		}

		//Return original selection for chaining
		return this;
	};
})(jQuery);

$(function(){
	$("img[src*='m.jpg']").thumbPopup({imgSmallFlag: "m.", imgLargeFlag: "."});
});

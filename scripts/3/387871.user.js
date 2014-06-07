// ==UserScript==
// @name        Hummingbird SFW
// @version     0.1
// @description Hide images in Hummingbird Threads in spoilers - cuz oppai. 
// @match       http://forums.hummingbird.me/*
// @copyright   2014+, cybrox
// ==/UserScript==

Ember.CloakedView.reopen({

	/**
	 * Add event listener for when it
	 * will insert content to the DOM
	 */
	didInsertElement: function(){

		/* Get the post container and all image tags / iframes (youtube) in it */
		var postBody = $("#"+this.elementId).find(".right-side-block");
		var postElem = postBody.find("img, iframe").not(".avatar");

		/* Handle every element that has been found in this posts */
		$.each(postElem, function(i, element){
			var thisElement = $(element);
			var thisTypeIs  = (thisElement.is("img")) ? "image" : "youtube frame";

			if(thisTypeIs == "image"){
				var thisElementIs = (thisElement.parent().is("a")) ? $(element).parent() : $(element);
				var targetElement = (thisElement.parent().is(".lightbox-wrapper")) ? thisElementIs.parent() : thisElementIs;
			} else {
				var targetElement = thisElement;
			}

			targetBlkText = "Click to show hidden "+thisTypeIs;
			targetElement.wrap("<div class=\"sfwBody\" id=\"newNsfw\" style=\"display:none;\"></div>");
			$("#newNsfw")
				.wrap("<div class=\"sfw\" style=\"width:100%;margin:15px 0;background:#f1f1f1;\"></div>")
				.before("<div class=\"sfwHead\" id=\"newHead\" style=\"padding:10px 3%;\">"+targetBlkText+"</div>")
				.removeAttr("id");
			$("#newHead")
				.removeAttr("id")
				.click(function(){
					$(this).siblings().slideToggle(500);
				});
		});
	}
});
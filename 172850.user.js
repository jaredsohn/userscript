// ==UserScript==
// @name       Adding Buttons to Feedly
// @namespace  http://cloud.feedly.com/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version    0.1
// @description  Add Next/Previous to feedly.com"
// @match      http://cloud.feedly.com/*
// @run-at document-end
// ==/UserScript==

var buttons_html = '<div style="float:left;margin-bottom:10px;"><span class="button" title="next article"><a id="next-button">NEXT</a></span><span class="button" title="previous article"><a id="prev-button">PREVIOUS</a></span></div>';


setTimeout(function()
{
	$(buttons_html).insertBefore('#floatingPageActionMarkAsRead').fadeIn();
	$(".button").css("display", "inline-block;");
	$(".button").css("font-size", "14px");
	$(".button").css("color", "#444");
	$(".button").css("margin-right", "20px");
	$(".button").css("text-shadow", "0 0 1px");
	$("#button-next #button-previous").css("underline", "none");
	
	var content_index = -1;

	$("#next-button").on('click', function(event)
	{	
		event.preventDefault();
		event.stopPropagation();

		if (content_index <= $(".section").length)
		{
			content_index = content_index + 1;
			$("#section" + content_index).goTo();
			console.log("current:" + content_index);
		}

	});

	$("#prev-button").on('click', function(event)
	{
		event.preventDefault();
		event.stopPropagation();

		if (content_index >= 0)
		{
			content_index = content_index - 1;
			$("#section" + content_index).goTo();
			console.log("current:" + content_index);
		}
	});


	(function($) 
	{
	    $.fn.goTo = function() 
	    {
	        $('html, body').animate(
	        {
	            scrollTop: $(this).offset().top + 'px'
	        }, 'fast');
	        return this; // for chaining...
	    }
	})(jQuery);

},5000);
// ==UserScript==
// @name Perfect 4chan image expander and scroller
// @version 1.4
// @date 2012-08-27
// @namespace http://userscripts.org/users/471458
// @author pegasusph
// @description Replace images with their sources. If a image's width or height is larger than window's, automatically reduce it to fit. Also, press Ctrl to activate smooth scroll through images; and then up or down to navigate. Press Ctrl again to deactivate.
// @include https://boards.4chan.org/*/res/*
// @include http://boards.4chan.org/*/res/*
// ==/UserScript==

function addJQuery(callback)
{
	// Inject jquery into body
	var script = document.createElement('script');
	script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
	
	// Wait for load event, inject callback function into document so it will exist
	script.addEventListener('load', function()
	{
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}, false);

	document.body.appendChild(script);
}

function main()
{
    var currentImageId = 0;
    var totalImages = 0;
    var scroll = 0;

    $("a.fileThumb").attr("id", function(aNiceId) {
        totalImages += 1;
        return "imageId" + (aNiceId + 1);
    });

	$('a.fileThumb').each(function()
	{
		$(this).children('img')
			.attr('src', $(this).attr('href'))
			.css('height', 'auto')
			.css('width', 'auto');
	});

    $('img').load(function() {
        if ($(this).height() > $(window).height()) {
            $(this).css({height: $(window).height()});
        }

        if ($(this).width() > $(window).width() - 70) {
            $(this).css({width: $(window).width() - 70});
        }
	});

    $(document).keydown(function(e)
    {
        if (e.ctrlKey) {
            scroll = !scroll;
            return;
        }

        if (scroll) {
            switch (e.keyCode) {
                case 38:  // Key code 38 = Up arrow
                    if (currentImageId > 1) {
                        currentImageId -= 1;
                        $('html, body').animate({scrollTop: $("#imageId" + currentImageId).offset().top - ($(window).height() - $("#imageId" + currentImageId).children(":first").height()) / 2}, 200);
                    }

                    break;

                case 40:  // Key code 40 = Down arrow
                    if (currentImageId < totalImages) {
                        currentImageId += 1;
                        $('html, body').animate({scrollTop: $("#imageId" + currentImageId).offset().top - ($(window).height() - $("#imageId" + currentImageId).children(":first").height()) / 2}, 200);
                    }

                    break;
            }
        }
    });
}

addJQuery(main);
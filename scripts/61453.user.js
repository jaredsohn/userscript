// ==UserScript==
// @name           Huffington Post Slideshow Fixer
// @namespace      http://www.huffingtonpost.com/
// @description    Lets you navigate through Huffington Post slideshows without loading a new page for each slide.
// @include        http://www.huffingtonpost.com*
// ==/UserScript==
function SlideBonerInjector() {
	window['SlideBoner'] = {
	    next: function() {
			if (oSlideshowPoll.current_slidenumber < oSlideshowPoll.aSlides.length)
				SlideBoner.changeSlide(oSlideshowPoll.current_slidenumber);
			else
				SlideBoner.changeSlide(0);

			return false;

	    },
	    prev: function() {
			if (oSlideshowPoll.current_slidenumber > 1)
				SlideBoner.changeSlide(oSlideshowPoll.current_slidenumber-2);
			else
				SlideBoner.changeSlide(oSlideshowPoll.aSlides.length-1);

			return false;
	    },
	    interrupt: function(e)
	    {
	        var ev = e || window.event;
			var slide_offset;

	        try {
		        var slide_ob = e.rangeParent.href.replace(/.*slidenumber=/, '').replace('#slide_image', '');
		        var slide_id = oSlideshowPoll.ids_crypted_id[slide_ob];
		        slide_offset = oSlideshowPoll.aSlides_id_key[slide_id];

			} catch (err) {
				return true;
			}

			if (slide_offset) {
				SlideBoner.changeSlide(slide_offset);
		        return false;			
			}

			return true;


	    },
		changeSlide: function(slide_offset) {

			slide = oSlideshowPoll.aSlides[slide_offset];	

			var image_url = "http://images.huffingtonpost.com/gadgets/slideshows/" + slide.slide_id + "/slide_" + slide.slide_id + "_" + slide.slideimage_id + "_large.jpg";
	        $("slide_image_" + slide.slide_id).src = image_url;        

			if (slide.caption)
				D.getElementsByClassName('slideshow_poll_just_caption').pop().innerHTML = slide.caption;

			if (slide.title)
				D.getElementsByClassName('slideshow_poll_photo_title').pop().innerHTML = slide.title;

			oSlideshowPoll.current_slidenumber = slide_offset+1;

		},
	    init: function() {

			if (typeof oSlideshowPoll == 'undefined')
			{
				setTimeout(SlideBoner.init, 100);
				return true;
			}


	        document.onclick = SlideBoner.interrupt;
	        D.getElementsByClassName('slideshow_poll_nav_button_left').pop().innerHTML = '<h2><a href="#" onclick="return SlideBoner.prev();"><img width="63" height="30" src="/images/slideshow/poll/v2/btn-back-business.gif"/></a></h2>';
	        D.getElementsByClassName('slideshow_poll_nav_button_right').pop().innerHTML = '<h2><a href="#" onclick="return SlideBoner.next();"><img width="63" height="30" src="/images/slideshow/poll/v2/btn-next-business.gif"/></a></h2>';
	    }
	};
	SlideBoner.init();	
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + SlideBonerInjector + ")();";

document.body.appendChild(script);

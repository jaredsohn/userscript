// ==UserScript==
// @name           Nordic-T Image Resize
// @namespace      https://nordic-t.me
// @include 	   *nordic-t.me/forums.php*
// @description    Resizes images to 800*600, click on image for original size.
// @version        1.2
// ==/UserScript==

var loaded = false;

function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}

function imgresizelol () {
	(function(jQuery) {
    jQuery.fn.resize = function(options) {
 
        var settings = jQuery.extend({
            scale: 1,
            maxWidth: null,
			maxHeight: null
        }, options);
 
        return this.each(function() {
			
			if(this.tagName.toLowerCase() != "img") {
				// Only images can be resized
				return jQuery(this);
			} 

			var width = this.naturalWidth;
			var height = this.naturalHeight;
			if(!width || !height) {
				// Ooops you are an IE user, let's fix it.
				var img = document.createElement('img');
				img.src = this.src;
				
				width = img.width;
				height = img.height;
			}
			
			if(settings.scale != 1) {
				width = width*settings.scale;
				height = height*settings.scale;
			}
			
			var pWidth = 1;
			if(settings.maxWidth != null) {
				pWidth = width/settings.maxWidth;
			}
			var pHeight = 1;
			if(settings.maxHeight != null) {
				pHeight = height/settings.maxHeight;
			}
			var reduce = 1;
			
			if(pWidth < pHeight) {
				reduce = pHeight;
			} else {
				reduce = pWidth;
			}
			
			if(reduce < 1) {
				reduce = 1;
			}
			
			var newWidth = width/reduce;
			var newHeight = height/reduce;
			
			return jQuery(this)
				.attr("width", newWidth)
				.attr("height", newHeight);
			
        });
    }
})(jQuery);
}

function showTits () {
    jQuery('div[style="overflow: hidden; max-width:800px;"]').css({"overflow" : "visible", "max-height" : "none", "max-width" : "none"});

	jQuery("img[border=0]").resize({
    maxWidth: 800,
    maxHeight: 600
	});

   jQuery('img[border=0]').click(function() {
   	if(jQuery(this).attr('width') || jQuery(this).attr('height')) {
   		jQuery(this).removeAttr('width')
        jQuery(this).removeAttr('height');
   	} else {
   		jQuery(this).resize({
    	maxWidth: 800,
    	maxHeight: 600
	});
   	}

	});
}

if(loaded == false) {
	window.addEventListener ("load", mainFunc, false);
}

if (document.readyState == "complete" && loaded == false) {
    mainFunc ();
}

function mainFunc () {
	addFunction(imgresizelol, true);
	addFunction(showTits, true);
	var loaded = true;
}
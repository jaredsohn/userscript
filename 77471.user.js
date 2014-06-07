// ==UserScript==
// @name           Image hover preview
// @namespace      devenv
// @include        *
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
      cur_img = null;
      shown = false;
      $(document).bind('mousemove', function(e) {
	if(shown) {
	  if(cur_img) {
	    $('#devenv_image_preview').css('top', e.pageY + 10).css('left', e.pageX + 10);
	  }
	} else {
	  if(cur_img && (e.shiftKey || e.ctrlKey || e.altKey)) {
	    width = cur_img.width();
	    height = cur_img.height();
	    scale = 1;
	    if(e.ctrlKey) {
	      scale = scale * 2;
	    }
	    if(e.altKey) {
	      scale = scale * 4;
	    }
	    if(e.shiftKey && e.ctrlKey) {
	      scale = 16;
	    }
	    if(scale == 1) {
	      width = "auto";
	      height = "auto";
	    } else {
	      width = width * scale + "px";
	      height = height * scale + "px";
	    }
	    $('body').append("<img id='devenv_image_preview' src='"+cur_img.attr('src')+"' style='position: absolute; top: "+(e.pageY+10)+"px; left: "+(e.pageX+10)+"px; width: "+width+"; height: "+height+";'/>");
	    shown = true;
	  }
	}
      });
      $('img').bind('mouseover', function(e) {
	cur_img = $(this);
      });
      $('img').bind('mouseout', function() {
	if(cur_img) {
	  $('#devenv_image_preview').remove();
	  cur_img = null;
	  shown = false;
	}
      });
    }
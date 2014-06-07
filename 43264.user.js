// ==UserScript==
// @name           line highlight
// @namespace      aweomse
// @description    highlights where your mouse is, making it easier to read large text blocks
// @include        *
// ==/UserScript==
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
       var bwidth = $("html").width();
	   var bheight = $(window).height();
	   $(window).keydown(function(event){
  if(event.shiftKey && event.altKey ) {

	   var mouseThis = 0;
	   $().mousemove(function(e){
      mouseThis = e.pageY;

	  var bheight = ($("html").height())-mouseThis;
	  $("#overlay1").css({height: mouseThis-12});
	  $("#overlay2").css({top: mouseThis+13, height:bheight});
	  }); 
	  $("body").append(
					   '<style>'+
					   '#overlay1 {'+
					   '	background:#000;'+
					   '	position:absolute;'+
					   '	z-index:268435455;'+
					   '	top:0;'+
					   '	left:0;'+
					   '	width:'+bwidth+'px;'+
					   '}'+
					   '#overlay2 {'+
					    '	background:#000;'+
					   '	position:absolute;'+
					   '	left:0;'+
					   '	width:'+bwidth+'px;'+
					   '	z-index:268435455;'+
					   '}'+
					   '</style>'+
					   '<div id="overlay1" class="overlay"></div>'+
					   '<div id="overlay2" class="overlay"></div>'
					   );
	  
	  
	  
	   
	   $("#overlay1").css({opacity: .5});
	  $("#overlay2").css({opacity: .5});
  }
  if(event.keyCode == 13) {
	$(".overlay").remove();  
  }
  
								  });
	   
	   
    }
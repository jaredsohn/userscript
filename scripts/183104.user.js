// ==UserScript==
// @name       i-programmer cleanup
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description quick n diry cleanup for i-programmer includes print preview
// @match      http://*.i-programmer.info/*
// @copyright  2013, jaykk
// ==/UserScript==


// are we in print mode ?

if ((window.location.search.indexOf('?print=1') !== -1) && (window.location.search.indexOf('tmpl=component') !== -1)) {
    document.body.className = document.body.className + " print";
}

var css = 'body.print { max-width: 50rem; margin: 2rem auto; }',
    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);


function cleanup (){
    // cleanup
    
    $('.nopad td:nth-child(3)').remove();
    $('.greyline').remove();
    $('.contentpaneopen').css('width', '100%');
    $('.nopad').css('width', 'auto');
    
    if ($('body').hasClass('print')) {
        $('#disqus_thread').remove();
        $('.konafilter').remove();
        $('.buttonheading').remove();
    } else {
        // add print button                    
        $('.contentheading').append("<a href='?print=1&tmpl=component' style='float:right'><img src='/images/M_images/printButton.png'></a>")
    }
}

if (typeof jQuery == 'undefined') {	
	function getScript(url, success) {
		var script     = document.createElement('script');
		     script.src = url;		
		var head = document.getElementsByTagName('head')[0],
		done = false;
		script.onload = script.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;
				success();
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			};
		};
		head.appendChild(script);
	};
	
	getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', function() {
		if (typeof jQuery=='undefined') {
            console.error("something went horribly wrong :( couldn't load jQuery");
		} else {
            jQuery( document ).ready(function( $ ) {        
				cleanup();
            });		
		}
	
	});
	
} else { // jQuery was already loaded
	cleanup();
};
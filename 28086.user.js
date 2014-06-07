// ==UserScript==
// @name          jQueryForDelicious
// @namespace     http://www.wysmedia.com
// @description	  Play nicely with jQuery and Del.icio.us
// @author        Adwin Wijaya
// @homepage      http://www.wysmedia.com
// @include       http://del.icio.us/*
// THIS SCRIPT WAS BASED ON DELICIOUS PRETIFFIER ... I JUST CHANGED to JQUERY and add a better look for "saved by xxxx people " colors 
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js';  // you can change this to your own jquery or latest jquery
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { jQuery = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
jQuery.noConflict();
	var newstyle = "<style>body { font-family:'Lucida Grande', Arial, Verdana ! important; font-size:110% ! important; color: #666 ! important; } a { color:#white !important; } .posts li .desc a:visited, #fp-recent ol a:visited, #fp-popular ol a:visited {color:#aaa ! important; } .posts li .desc a:hover, #fp-recent ol a:hover, #fp-popular ol a:hover { color:#fff ! important; background-color: #39c ! important; text-decoration: none ! important; } .posts li .desc a:visited:hover, #fp-recent ol a:visited:hover, #fp-popular ol a:visited:hover {color:#fff ! important; background-color: #aaa ! important; text-decoration: none ! important; } .meta a { color:#aaa ! important; } .meta a.tag:hover { color: #39c ! important; background-color: transparent ! important; text-decoration: underline ! important; } #header { background-color:#fff ! important; } .alwaysblue a:visited { color:#39c ! important; } </style>";
	
    jQuery('body').prepend(newstyle);
    
    jQuery('.pop').css('color','white !important');
   
     re = new RegExp("[0-9]+", "g");

    jQuery('a.pop').each(function(i){
        str = jQuery(this).text();
        result = str.match(re);
        
        savedby = result[0];

        if(savedby < 100){
            jQuery(this).css('background-color','#CFDDFF');
        }else if(savedby >= 100 && savedby < 500){
            jQuery(this).css('background-color','#3333DD');
        }else if (savedby >= 500 && savedby <= 1000){
            jQuery(this).css('background-color','#003366');
        }else
        {
           jQuery(this).css('background-color','#330033');
        }
    });
}


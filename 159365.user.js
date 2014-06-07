// ==UserScript==
// @name        Remove shit from shoutbox
// @namespace   http://tus-wa.com/
// @description Removes shitty posts by dumb morons
// @include     http://www.tus-wa.com/*
// @include     http://tus-wa.com/*
// @grant       none
// @version     1
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
    
    var dumbUsers = ['taner'];

    $('#shouts_container').bind('DOMSubtreeModified', function() {
        $(this).children('div').each(function() {        	        	
        	var user = $(this).find('.shoutmessage > a').first().html();        	
        	if ($.inArray(user, dumbUsers) != -1) {        		
                $(this).hide();
            }            
        })    
    });
    
});
// ==UserScript==
// @name            Facebook Link Accelerator
// @decsription     Removes annoying redirects from external links speeding up links to outside sites.
// @author          Dennis Baker
// @version         1.1
// @namespace       DennisBaker
// @license         CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include         http://*facebook.com*
// ==/UserScript==

var fileref=document.createElement('script');
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", 
            "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
document.getElementsByTagName("head")[0].appendChild(fileref);
setTimeout(unbindFB,3000);


function unbindFB() { 
    jQuery.noConflict();
    jQuery('a').each(function() { href=$(this).attr('href'); 
        if (href && href.substring(0,7)=="http://" && href.substring(7,16)!='www.faceb')
            jQuery(this).unbind('click').css('color','#040') 
    });
}


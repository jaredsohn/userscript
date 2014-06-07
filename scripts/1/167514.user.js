// ==UserScript==
// @name          Reddit comment browser
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Browse posts top comments with j and k
// @author        k
// @include       http://www.reddit.com/*/comments/*
// @include       https://reddit.com/*/comments/*
// @run-at document-end
// ==/UserScript==
function scroll(evt, topComments) {
	
    evt.stopPropagation();

    if (topComments.length<1 || evt.target.nodeName.toLowerCase()=='textarea') {
            return;
    }
    if (evt.charCode == 75) { // shift K
        $('html').animate({scrollTop : $(topComments[0]).position().top},'fast');
    } else if (evt.charCode == 106) { // j

        var currentScroll = $(window).scrollTop();

		var nearest = Math.round($(document).height());
        topComments.each(function(index,el) {

            if (Math.round($(el).position().top-currentScroll)> 0 && Math.round($(el).position().top-currentScroll) < Math.round(nearest)) {
                nearest = Math.round($(el).position().top);

                return false;
            }
        });

        $('html').animate({scrollTop : nearest},'fast');
    } else if (evt.charCode == 107) {
		var currentScroll = $(window).scrollTop();
        
		var nearest = -1;

        topComments.each(function(index,el) {
            // continue tant qu'il y a des élements proches
            if ((Math.round($(el).position().top-currentScroll)< 0 && Math.round($(el).position().top-currentScroll) < Math.round(nearest)) || nearest==-1) {
                nearest = Math.round($(el).position().top);
            }
        })
        $('html').animate({scrollTop : nearest},'fast');
    }
    
    return;
}


var topComments = $('div.nestedlisting > div.thing');
document.addEventListener("keypress", function(evt){
                          scroll(evt, topComments);
                         });

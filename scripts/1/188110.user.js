// ==UserScript==
// @name       yande.re
// @namespace  http://ysmood.org
// @version    0.1
// @description  Show big thumbs on yande.re.
// @match      https://yande.re/post*
// @copyright  Jan 2014, ys
// ==/UserScript==

(function($) {
    
	$('#post-list-posts').find('li, .inner').removeAttr('style');
    $('#post-list-posts li').css({
        margin: 10,
        float: 'none'
    });
    $('#post-list-posts').find('.inner img').removeAttr('width').removeAttr('height');
    
    $('body').keyup(function(e){
        if (e.target.tagName == "INPUT")
            return;

        var url = '';
        switch(e.originalEvent.keyIdentifier) {
            case 'Right':
                url = $('.next_page').attr('href');
                if (url)
                	location.href = url;
                break;

            case 'Left':
                url = $('.previous_page').attr('href');
                if (url)
                	location.href = url;
                break;
        }
    });

})(jQuery);
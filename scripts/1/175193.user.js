// ==UserScript==
// @name       Pinterest(new layout) declutter
// @namespace  http://userscripts.org/users/510245
// @version    1.0
// @description  remove clutter on Pinterest
// @match      http://pinterest.com/*
// @copyright  2013+, Jordan Panagsagan
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at     document-start
// ==/UserScript==

function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

addNewStyle (
    '.pinMeta, .pinUserAttribution, .PinCommentList {display:none} .item.jActive {z-index:660}'
)


;!function(){
    var itemEl = '.Grid > .item', t;
    $(document).on('mouseenter',itemEl,function(){
        var $el = $(this);
        t = setTimeout(function(){
        	$el.not($el).removeClass('jActive').end().addClass('jActive').find('.pinMeta, .pinUserAttribution').slideDown(200);
            clearTimeout(t);
            console.log('active');
        }, 500);
    }).on('mouseleave',itemEl, function(){
        clearTimeout(t);
        var $el = $(this);
        $el.find('.pinMeta, .pinUserAttribution, .PinCommentList').stop().slideUp(100, function() { $el.removeClass('jActive') });
    });
}();
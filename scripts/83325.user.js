// ==UserScript==
// @name           Condense muro thread
// @namespace      20after4.deviantart.com
// @description    Collapse the images from a muro thread to create a page of continuous images
// @include        http://forum.deviantart.com/devart/drawplz/*
// ==/UserScript==
with (unsafeWindow) {
    $('<a href="#">Condense Thread</a>').appendTo('#forum .catbar .ar').click(function(e) {
        var head = $("<div></div>").css({
            'position':'absolute',
            'background':'url(http://st.deviantart.net/news/muro-launch/header.jpg?1) -141px -12px no-repeat scroll',
            'width':'100%',
            'height':'124px',
            'width':'600px',
            'padding':'5px',
            'left':'0px',
            'top':'0px',
            'text-align':'right'
        });

        var box=$('<div style="width:460px;margin-top:140px"></div>');
        $('img.drawplz').appendTo(box);
        $('body')
        // optional:
        $(document.body).css({'background-image':'none'})
                        .html('').append(head).append(box);
            
        $("<a href='#' style='font-family:monospace;color:white' title='Reload "+location.href+"'>[ Click to reload ]</a>")
            .appendTo(head)
            .click(function(e){
                e.preventDefault();
                window.location.reload();
            });
        e.preventDefault();
    });
}
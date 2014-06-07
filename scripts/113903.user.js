// ==UserScript==
// @name Baraholka images.
// @namespace http://shtucer.ru/
// @version 0.06
// @source http://shtucer.ru/
// @description Baraholka!
// @exclude http://*leprosorium.ru/users/*
// @include http://baraholka.leprosorium.ru/*
// @include http://baraholka.leprosorium.ru/pages/*
// @require       http://code.jquery.com/jquery-1.9.1.js
// @require     http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @downloadURL http://userscripts.org/scripts/source/113903.user.js
// @updateURL http://userscripts.org/scripts/source/113903.meta.js
// @grant   all
// ==/UserScript==



window.addEventListener("load", improveMe, true);

function improveMe(event) {
    markImages('');
    $("#content_left_inner").bind("DOMNodeInserted", function(){
        markImages($(this));
    });  

}

function markImages(ctx){
    $('div.post.ord div.dt img', ctx).each(
                           function(pos){
                               //alert(this.height+"x"+this.width);
                               if (this.height > 500 || this.width > 500) {
                                   $(this).css({"border": "solid 3px red"});
                               }
                           }
                          )
}
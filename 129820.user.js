// ==UserScript==
// @name        reddit.com - Uppers and downers
// @namespace   v1
// @include     *.reddit.com/*
// ==/UserScript==

function main(){
    var tt=$('<div class="linkinfo" style="padding:2px 4px;position:absolute"><span class="upvotes" /> / <span class="downvotes" /></div>').appendTo('body').hide();
    $('div.content .score').live({
        mouseenter:function(e){var o=$(this).thing();tt.fadeIn(300).find('.upvotes').text('+'+o.attr('data-ups')+' ').next().text('-'+o.attr('data-downs')+' ')},
        mousemove:function(e){tt.css({top:e.pageY+10,left:e.pageX+5})},
        mouseleave:function(e){tt.hide()}
    })
}
var s=document.createElement("script");s.textContent="("+main.toString()+")()";document.head.appendChild(s);
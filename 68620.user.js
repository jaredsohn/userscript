// ==UserScript==
// @name           ThumbHoverPreviews
// @namespace      http://20after4.deviantart.com
// @description    show 300px preview image when hovering a thumbnail.
// @include        http://*.deviantart.com/*
// ==/UserScript==

with(unsafeWindow){
    $j(function(){
        var hover_style = {
            'position':'absolute',
            'z-index':300,
            'padding':'5px',
//            'border':'5px solid white',
            'background-color':'black',
            '-moz-border-radius':'4px'
        };

        var $win=jQuery(window);

        $hover = $j('<div id="thumb_hover"></div>').css(hover_style).prependTo($j('body')).hide();
        $j('.shadow img').hover(function(e) {
            var $thumb = $j(this);
            $hover.hide();

            var xOffset = 25/$win.height();
            var yOffset = e.pageX > 400 ? -330 : 40;
            var posTop = Math.max($win.scrollTop()+10,e.pageY-100-(e.pageY*xOffset));
            var src = $thumb.attr('src');
            var newsrc = src.replace('/150/','/300W/');
            $hover.html('<img src="'+newsrc+'"/></div>')
                  .css({top:posTop+'px',left:e.pageX+yOffset+'px'})
            setTimeout(function(){
                $hover.show(60);
              },40);
        });
    });
}
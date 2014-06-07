// ==UserScript==
// @name        naturalnews.com -- linkify slides
// @namespace   http://www.naturalnews.com
// @include     *naturalnews.com*
// @grant       none
//

// ==/UserScript==
jQuery(function($) {
    var $firstSlide;
    var $slides = $('.slide').each(function(i, elm) {
        var $this = $(this);
        var onclick = $this.attr('onclick');
        var start = 'parent.location.href=\''.length;
        var end = onclick.lastIndexOf('.html');
        var url = onclick.substring(start, end) + '.html';
        
        $this.prop('onclick', null);	// IE 7-9
        $this.removeAttr('onclick');	// everything else
        
        var $a = $('<a/>')
                .css('display', 'block')
                .css('opacity', '')
                .attr('href', url)
                .html($this.html());
        $.each(this.attributes, function(i, attr) {
            $a.attr(attr.name, attr.value);
        });
        $this.replaceWith($a);
        if (i == 0) {
            $firstSlide = $a;
        }
    });
    var interval = 500;
    var enough = 10;
    var i = 0;
    var t = setInterval(lazy, interval);
    function lazy() {
        $firstSlide.css('opacity', '');
        if (i++ == enough) {
            clearInterval(t);
        }
    }
});

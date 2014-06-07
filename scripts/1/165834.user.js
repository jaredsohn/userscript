// ==UserScript==
// @name        The Old Reader colorful tags
// @namespace   http://userscripts.org/scripts/show/165834
// @version     2.5
// @description change the tags colors based on their names
// @match       http://theoldreader.com/*
// @match       https://theoldreader.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @copyright   2013+, Syl
// ==/UserScript==

// https://github.com/roselan/jquery-observe-plugin
(function( $ ){

  $.fn.observe = function( callback, options ) {  

    var settings = $.extend( {
            attributes: true, 
            childList: true, 
            characterData: true
        }, 
        options );

    return this.each(function() {        
        var self = this,
            observer,
            MutationObserver = window.MutationObserver || 
                               window.WebKitMutationObserver || 
                               window.MozMutationObserver; 
        
        if (MutationObserver && callback) {
            observer = new MutationObserver(function(mutations) { 
                callback.call(self, mutations);
            });              
            observer.observe(this, settings);
        }         
    });
  };
})( jQuery );


(function() {

var g_saturation = 1.0;     // 0.0 is grey, 1.0 is colorful
var g_value = 160;          // lightness between 0 and 255, 0 means black
var g_post_intensity = 0.05 // post background intensity

var g_labels = [];
var g_row_colors = JSON.parse(GM_getValue('row_colors', '{}'));



function hash(value) {
    // http://en.wikipedia.org/wiki/Fowler_Noll_Vo_hash
    var fnv_prime = 0x1000193;
    var h = 0x811C9DC5;
    for (var i in value) {
        h *= fnv_prime;
        h ^= value[i];
    }
    return h & 0x7FFFFFFF;
}

function hsv_to_rgb(h, s, v)
{
	var i;
	var f, p, q, t;
	if(s == 0) {
		// achromatic (grey)
        v &= 0xFF;
		return (v * 0xFFFF) | (v * 0xFF) | v;
	}
	h /= 60.0;			// sector 0 to 5
	i = Math.floor(h);
	f = h - i;			// factorial part of h
	p = v * (1.0 - s);
	q = v * (1.0 - s * f);
	t = v * (1.0 - s * (1.0 - f));
    var r, g, b;
	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		default:
			r = v;
			g = p;
			b = q;
			break;
    }
	return	Math.floor(r) * 0xFFFF + Math.floor(g) * 0xFF + Math.floor(b);
}


function interpolate_rgb(first, last, ratio) {
    var result = 0;
    var a, b, shift;
    for (var i = 0; i < 3; ++i) {
        shift = i * 8;
        a = (first >> shift) & 0xFF;
        b = (last >> shift) & 0xFF;
        result |= (Math.floor(a + (b - a) * ratio)) << shift;
    }
    return result;
}


function update_row_colors() {
    var data_feed, css = ".post blockquote { background-color: rgba(0, 0, 0, 0.05); }\
.commented .name:after { font-family: FontAwesome; content: \"\\f075\"; }\n";

    for (var key in g_labels) {
        if (key in g_row_colors)
            continue;
        data_feed = $('.posts .label-feed[href="'+key+'"]').parents('.well').attr('data-feed');
        if (!data_feed)
            continue;
        g_row_colors[key] = { 'data_feed': data_feed };
        color = hsv_to_rgb(hash(key) % 360, g_saturation, g_value);
        g_row_colors[key]['color'] = ('000000' + interpolate_rgb(0xf7f7f7, color, g_post_intensity).toString(16)).slice(-6);
    }
    for (var key in g_row_colors)
        css += 'div.well[data-feed="' + g_row_colors[key]['data_feed'] + '"] { background-color: #' + g_row_colors[key]['color'] + '; }\n';
    
    GM_addStyle(css);
    GM_setValue('row_colors', JSON.stringify(g_row_colors));
}

function check_comments() {
    console.log('check comment');
    $('.posts .comments h3[data-count!="0"]').parents('.well').each(function() {
        //$(this).find('.header .name').after($('<i class="icon-comment"></i>'));
        $(this).addClass('commented');
    });
}

function update() {
    var color   = 0;
    var key     = null;
    var updated = false;
    $('#sidebar .folders-list li.sort-item a').each(function(i) {
        key = $(this).attr('href');
        if (key && !(key in g_labels)) {
            updated = true;
            color = hsv_to_rgb(hash(key) % 360, g_saturation, g_value);
            g_labels[key] = ('000000' + color.toString(16)).slice(-6);
        }
    });
    
    if (updated) {
        var css = '';
        for (var key in g_labels)
            css += 'a.label-feed[href="' + key + '"] { background-color: #' + g_labels[key] + '; }\n';
        GM_addStyle(css);
        update_row_colors();
        check_comments();
        $('.posts').observe(function (mutations) { update_row_colors(); check_comments(); });
    }
}

$('#sidebar .folders-list').observe(function (mutations) { update(); });
update();

})();
// ==UserScript==
// @name       Realm of the Mad God flash window expander
// @namespace  http://thunders.spb.ru/user-scripts/src/rotmg-userscript.js
// @version    0.2.3
// @description  Resize flash window to 1280x1024, 1024x768, 800x600, 640x480. Added Buttons to change Size dynamically =) Saves settings to Cookies.
// @include    http://www.realmofthemadgod.com/*
// @source     http://thunders.spb.ru/user-scripts/rotmg/
// @require    http://jquery.com/src/jquery-latest.min.js
// @copyright  2012+, thunder (ingame thunderspb @ EUNorth Server)
// @author     thunder, thunder@blackdeath.ru
// ==/UserScript==

/*
0.2.3
 - Fixed some bugs =)

0.2
 - Cleared original footer of the page
 - Added buttons with sizes: 1280x1024, 1024x768, 800x600, 640x480
 - Added functions for wsaving settings into cookie
 - Added Forum and Wiki links
 - Added Clear Cookies (CC) button
*/

// Defaults
var _def_w = 1024, _def_h = 768,
    _p_first = $("p:first"),
    _span_style = {
        'padding':'5px',
        'margin':'3px',
        'background-color':'gray',
        'color':'white',
        'cursor':'hand'
    },
    _link_forum = _link_wiki = "",
    _c_pref = '_thunder_rotmg_'   
    ;

// Set New Size function, Resizes window, sets cookie, highlights button deps on current size 
function setNewSize(_n_w, _n_h) {
    $("embed").attr("width", _n_w).attr("height", _n_h);
    $("div.us-settings p").css("width", _n_w);
    $.cookie(_c_pref+'w', _n_w, { expires: 7 });
    $.cookie(_c_pref+'h', _n_h, { expires: 7 });
    $("div.us-settings p span").css(_span_style);
    $("div.us-settings p span#"+_n_w+"x"+_n_h).css({"background-color":"lime","color":"black"});
}

$(document).ready(function()
{
    var _c_w = $.cookie(_c_pref+'w');
    var _c_h = $.cookie(_c_pref+'h');
    _link_forum = "<a href='"+$('p:first a:first').attr('href')+"' target='_blank'>"+$('p:first a:first').text()+"</a>";
    _link_wiki = "<a href='"+$('p:first a:last').attr('href')+"' target='_blank'>"+$('p:first a:last').text()+"</a>";
    try {
        if (_c_w != null && _c_h != null) { _def_w = _c_w; _def_h = _c_h; $.cookie(_c_pref+'w', _с_w, { expires: 7 }); $.cookie(_c_pref+'h', _с_h, { expires: 7 }); }
    } catch(e) {
        
    }
    
    
    $("embed").attr("width", _def_w).attr("height", _def_h); // sets default size 1024x768 if not set in cookies
    _p_first.text("").next().text(""); // clears footer of the page
    
    // Adding settings buttons
    $("<div class='us-settings'><p style='width:"+_def_w+";text-align:right;'></p></div>").insertAfter("embed");
    $("div.us-settings p").append("Settings: <span id='1280x1024'>1280x1024</span><span id='1024x768'>1024x768</span><span id='800x600'>800x600</span><span id='640x480'>640x480</span><span>"+_link_forum+"</span><span>"+_link_wiki+"</span><span id='cc' title='Clear Cookies :)'>CC</span>");
    $("div.us-settings p span").css(_span_style).click(function(){
        if ($(this).attr('id') == 'cc') {
            // if clicked Clear Cookies -- Clearing Cookies =)))
            $.cookie(_c_pref+'w', null);
            $.cookie(_c_pref+'h', null);
            alert("Cookies deleted. You may to realod this page to complete. Default size will be set to 1024x768.");
        } else {
            _sel_size = $(this).attr('id').split("x");
            setNewSize(_sel_size[0], _sel_size[1]);
        }
    });
    // setting visual style on buttons depending on current selected size
    $("div.us-settings p span#"+_def_w+"x"+_def_h+"").css({"background-color":"lime","color":"black"});
    
});

/*!
 * JQuery Cookie Plugin
 *
*/
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);
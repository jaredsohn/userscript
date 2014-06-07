/*

Copyright (C) 2013 James Rodrigues

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// ==UserScript==
// @name           highlight_gaf
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.0.0/lodash.min.js
// @namespace      com.zombie.highlight
// @description    Highlights your posts on the NeoGAF
// @include        http://www.neogaf.com/forum/*
// @include        http://www.neogaf.net/forum/*
// @include        http://neogaf.com/forum/*
// @include        http://neogaf.net/forum/*
// ==/UserScript==

// Your colors
// Use can use http://www.colorpicker.com/ to get colors in the hex format
// below.
var my_color = '#9DB4C4';
var friend_color = '#A7BF97';
var mod_color = '#C49D9D';

// User list in the format:
// "username": color
var highlight_list = {
    "MY_USER_NAME": my_color,
    "FRIEND1": friend_color,
    "FRIEND2": friend_color,
    "MOD1": mod_color,
    "MOD2": mod_color
};

// Users you don't care to see.
var block_list = [
    "USER_I_DONT_LIKE",
    "USER_I_DONT_LIKE2"
];

// Areas to highlight
var highlight_settings = {
    avatar: true,
    posts: true,
    threads: true,
    quotes: true,

    // Enable for NeoGAF Pro Dark compatibility tweaks.
    // http://userstyles.org/styles/56218/neogaf-pro-dark
    dark_compat: false
};


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// Don't edit anything below this line, unless you know what you're doing.
(function ($, _) {
    function _setClasses(users) {
        var script = "<style type='text/css'>";
        var colors = _.uniq(_.values(users));
        var list = {};

        _.each(colors, function(v, k) {
            var ukey = _.uniqueId("z_");
            script += "." + ukey + " { background-color: " + v + "; } ";
            list[v] = ukey;
        });

        script += "</style>";
        $('head').append(script);

        return list;
    }

    function manageThreads(users, hl_areas, colors) {
        if(hl_areas.threads) {
            // var threads = $('form').find('.alt2 > a');
            // var threads = $('form').find('td > a');
            var threads = $('form').find('td[align="center"] > a');

            _.each(threads, function(v, k) {
                var _class = colors[users[v.text]];

                if(_class) {
                    $(v).closest('tr').children().removeClass().addClass(_class);
                }
            });
        }
    }

    function managePosts(user_list, block_list, hl_areas, colors) {
        if(hl_areas.avatar || hl_areas.posts || !_.isEmpty(block_list)) {
            // var _big_name = $('#posts').find('.bigusername');
            var _big_name = $('.postbit-details-username').find('a');

            _.each(_big_name, function(v, key) {
                var _valid_color = colors[user_list[v.text]];
                var _valid_block = _.contains(block_list, v.text);
                // var _name = $(v).closest('td');
                var _name = $(v);

                // Block users
                if(_valid_block) {
                    // _name.closest('table').hide();
                    _name.closest('.postbit').hide();
                }

                if(_valid_color) {
                    if(hl_areas.posts) {
                        // _name.siblings().removeClass().addClass(_valid_color);
                        _name.closest('.postbit').removeClass('mypost').addClass(_valid_color);
                    }

                    if(!hl_areas.avatar) {
                        // _name.removeClass().addClass(_valid_color);
                        _name.closest('.postbit-details').addClass('mypost');
                    }
                    else {
                        _name.closest('.postbit-details').addClass(_valid_color);
                    }
                }
            });
        }
    }

    function manageQuotes(user_list, hl_areas, colors) {
        if(hl_areas.quotes) {
            // var _quotes = $('.post').find('.smallfont').find('strong');
            var _quotes = $('blockquote').find('.cite').find('strong');

            _.each(_quotes, function(v, k) {
                // var _valid_color = colors[user_list[v.innerHTML]];

                // if(_valid_color) {
                    // var t = $(v).parent().next().find('td').removeClass().addClass(_valid_color);
                    var t = $(v).parent().parent();
                    t.attr('data-username', '');
                    t.css('background-color', user_list[v.innerHTML]);

                    if(hl_areas.dark_compat) {
                        t.css({
                            "border-radius": "6px 6px 6px 6px",
                            "box-shadow": "0 2px 2px #000000"
                        });
                    }
                // }
            });
        }
    }

    var color_map = _setClasses(highlight_list);

    //$(function() {
        if(_.contains(location.href, "forumdisplay") || _.contains(location.href, "subscription")) {
            manageThreads(highlight_list, highlight_settings, color_map);
            return;
        }

        managePosts(highlight_list, block_list, highlight_settings, color_map);
        manageQuotes(highlight_list, highlight_settings, color_map);
    // });

}(jQuery, (this._||_)));

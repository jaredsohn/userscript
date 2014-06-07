// {{{ === License ===  
// Enhanced Douban Collecting Dialog
// a greasemonkey script offers del.icio.us-style douban subject
// collecting experience
// Version: 0.3.3
// Copyright (c) 2008 Wu Yuntao <http://luliban.com/blog/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Enhanced Douban Collecting Dialog 
// @namespace       http://blog.luliban.com/
// @description     a greasemonkey script offers del.icio.us-style douban subject collecting experience
// @include         http://www.douban.com/*
// @require         http://www.douban.com/js/jquery5685.js
// ==/UserScript==
//
// }}}

/* {{{ === Global variables ===  
 */
var console = unsafeWindow.console || { log: function() {} };
var parser = null;
/* }}} */

/* {{{ === Collecting dialog ===  
 */
$.fn.collect = function(options) {
    if (!this.length) return this;

    var options = $.extend({
        tagFolder: true
    }, options || {});

    this.click(function() {
        dialog_wait();
    });

    /* Wait until dialog loaded
     */
    function dialog_wait() {
        var dialog = $('#dialog');
        if (dialog.html() == null || dialog.children().attr('class') == 'loadpop') {
            window.setTimeout(dialog_wait, 100);
        } else {
            console.log("Dialog loaded");
            if (options.tagFolder == false) {
                $('#showtags').html('缩起 ▲');
                $('#advtags').show();
                $('#foldcollect').val('U');
                refine_dialog();
            };
            if (!unsafeWindow.DOUBAN) {
                console.log("Fetch douban api and parser");
                $.ajax({ async: false, dataType: 'script', url: '/js/api.js?v=2' });
                $.ajax({ async: false, dataType: 'script', url: '/js/api-parser.js?v=1' });
                window.DOUBAN = unsafeWindow.DOUBAN;
                DOUBAN.apikey = '9e339c9d951cdb9cda9ad5d8bf5692d4';
            }
            new TagSuggest(dialog);
        }
    }

    // Copied from /js/douban13359.js
    function refine_dialog() {
        var top = ($(window).height() - $('#dialog').height()) / 2 + 140;
        console.log(top);
	    $('#dialog,#overlay').css('top', top);
        var oheight = ($.browser.msie?11:26),
            dialog = $('#dialog')[0],
            w = dialog.offsetWidth,
            left = (document.body.offsetWidth - w) / 2 + 'px';
    
        $('#overlay').css({ height: dialog.offsetHeight+oheight,
                            width: w+26, left:left });
        dialog.style.left=left;
    }
}

/* }}} */

/* {{{ === Douban tag suggestion ===  
 * add tag suggestion
 */
function TagSuggest(dialog) {
    var tag_list = new Array();
    var done = false;
    var category = parser.category();

    // start fetching
    tag_fetch(1);
    tag_wait();
    tag_style();

    // fetch tags using douban api
    function tag_fetch(index) {
        var method_dict = {
            "book": DOUBAN.getUserBookTags,
            "movie": DOUBAN.getUserMovieTags,
            "music": DOUBAN.getUserMusicTags
        };

        var params = {
            id: parser.user_id(),
            startindex: index,
            maxresults: 50,
            callback: tag_parse
        };
        method_dict[category](params);
    }

    // parse titles of tags
    function tag_parse(result) {
        var tags = DOUBAN.parseTags(result);
        $.each(tags.entries, function() {
            tag_list.push(this.title);
        });
        if ((tags.startIndex + 49) < tags.totalResults) {
            tag_fetch(tags.startIndex + 50);
        } else {
            done = true;
        }
    }

    // add tag style
    function tag_style() {
        if ($('style#tag-style').html() == null) {
            var style = 'ul.tag-matches { position: fixed; width: 180px; border-left: 1px solid #eeffee; border-right: 1px solid #eeffee; background: #ffffff; } '
                      + 'ul.tag-matches li { padding: 2px 5px; color: #060; border-bottom: 1px solid #eeffee; } '
                      + 'ul.tag-matches li:hover { background: #eeffee; cursor: pointer; } '
            $('head').append('<style type="text/css" id="tag-style">' + style + '</style>');
        }
    }

    // check if tags are ready
    function tag_wait() {
        if (!done) {
            window.setTimeout(tag_wait, 100);
        } else {
            console.log('All tags have been fetched. Ready to suggest');
            dialog.find('input[name="tags"]').attr('autocomplete', 'off');
            dialog.find('input[name="tags"]').tagSuggest({
                tags: tag_list,
                matchClass: 'tag-matches',
                tagContainer : 'ul', 
                tagWrap : 'li', 
                delay : 1.0
            });
        }
    }
}
/* }}} */

/* {{{ === Douban parser ===  
 */
// Douban Page Parser which may change frequently
function Parser() {
    // initialize parameters necessary
    this._subject_category = null;
    this._user_id = null;
    this.category_dict = { 'C': 'book', 'M': 'movie', 'W': 'music' };
};

$.extend(Parser.prototype, {
    // get user id
    user_id: function() {
        if (!this._user_id) {
            var user_id = null;
            // access a subject page to get the user's id
            $.ajax({ async: false, url: '/subject/3024234/', success:
                function(data) {
                    user_id = data.match(/href=\"\/people\/(\w+)\/recs\?add=W(\d+)\"\ class=\"j\ a_rec_btn/)[1];
                }
            });
            this._user_id = user_id;
        }
        return this._user_id;
    },

    // get category
    category: function() {
        // parse category from window.location.href where urls match:
        // '^/(movie|book/music)/mine?status=(wish|collect|do)',
        // '^/(movie|book/music)/(recommended|top250|(tag/.*))',
        // '^/people/.*/(movie|book/music)tags/.*',
        var cate = window.location.href.match(/(book|movie|music)/);
        if (cate != null) {
            this._subject_category = cate[1];
        }
        // parse category from name of recommand button where urls match:
        // '^/subject/.*',
        else if ($('.a_rec_btn').html() != null) {
            // a quick solution to get category code via name of recommand button;
            // like 'rbtn-M-2078864-'
            var code = $('.a_rec_btn').attr('name').split('-')[1];
            this._subject_category = this.category_dict[code];
        }
        // parse title of dialog
        // like '我看过这本书...'
        else {
            var title = $('#dialog').find('h2').html();
            if (title.match(/(书|杂志)/)) {
                this._subject_category = 'book';
            } else if (title.match(/电影|电视剧/)) {
                this._subject_category = 'movie';
            } else if (title.match(/唱片/)) {
                this._subject_category = 'music';
            } else {
                throw new Error("CategoryNotFound: Can not find the category of the subject which is needed for tag suggestion. Please report the URL, " + location.href + "to douban group, http://www.douban.com/group/topic/3293752/");
            }
        }
        // console.log(this._subject_category);
        return this._subject_category;
    },
});
/* }}} */

/* {{{ === Main entry ===  
 */
$(function() {
    parser = new Parser();
    $('.a_collect_btn').collect({ tagFolder: false });
});
/* }}} */

/* {{{ === jQuery tag suggestion plugin ===  
  @author: remy sharp / http://remysharp.com
  @url: http://remysharp.com/2007/12/28/jquery-tag-suggestion/
  @usage: setGlobalTags(['javascript', 'jquery', 'java', 'json']); 
          // applied tags to be used for all implementations
          $('input.tags').tagSuggest(options);
          
          The selector is the element that the user enters their tag list
  @params:
    matchClass - class applied to the suggestions, defaults to 'tagMatches'
    tagContainer - the type of element uses to contain the suggestions, defaults to 'span'
    tagWrap - the type of element the suggestions a wrapped in, defaults to 'span'
    sort - boolean to force the sorted order of suggestions, defaults to false
    url - optional url to get suggestions if setGlobalTags isn't used.  Must return array of suggested tags
    tags - optional array of tags specific to this instance of element matches
    delay - optional sets the delay between keyup and the request - can help throttle ajax requests, defaults to zero delay
    separator - optional separator string, defaults to ' ' (Brian J. Cardiff)
  @license: Creative Commons License - ShareAlike http://creativecommons.org/licenses/by-sa/3.0/
  @version: 1.4
  @changes: fixed filtering to ajax hits
*/

(function ($) {
    var globalTags = [];

    // creates a public function within our private code.
    // tags can either be an array of strings OR
    // array of objects containing a 'tag' attribute
    window.setGlobalTags = function(tags /* array */) {
        globalTags = getTags(tags);
    };
    
    function getTags(tags) {
        var tag, i, goodTags = [];
        for (i = 0; i < tags.length; i++) {
            tag = tags[i];
            if (typeof tags[i] == 'object') {
                tag = tags[i].tag;
            } 
            goodTags.push(tag.toLowerCase());
        }
        
        return goodTags;
    }
    
    $.fn.tagSuggest = function (options) {
        var defaults = { 
            'matchClass' : 'tagMatches', 
            'tagContainer' : 'span', 
            'tagWrap' : 'span', 
            'sort' : true,
            'tags' : null,
            'url' : null,
            'delay' : 0,
            'separator' : ' '
        };

        var i, tag, userTags = [], settings = $.extend({}, defaults, options);

        if (settings.tags) {
            userTags = getTags(settings.tags);
        } else {
            userTags = globalTags;
        }

        return this.each(function () {
            var tagsElm = $(this);
            var elm = this;
            var matches, fromTab = false;
            var suggestionsShow = false;
            var workingTags = [];
            var currentTag = {"position": 0, tag: ""};
            var tagMatches = document.createElement(settings.tagContainer);
            
            function showSuggestionsDelayed(el, key) {
                if (settings.delay) {
                    if (elm.timer) clearTimeout(elm.timer);
                    elm.timer = setTimeout(function () {
                        showSuggestions(el, key);
                    }, settings.delay);
                } else {
                    showSuggestions(el, key);
                }
            }

            function showSuggestions(el, key) {
                workingTags = el.value.split(settings.separator);
                matches = [];
                var i, html = '', chosenTags = {}, tagSelected = false;

                // we're looking to complete the tag on currentTag.position (to start with)
                currentTag = { position: currentTags.length-1, tag: '' };
                
                for (i = 0; i < currentTags.length && i < workingTags.length; i++) {
                    if (!tagSelected && 
                        currentTags[i].toLowerCase() != workingTags[i].toLowerCase()) {
                        currentTag = { position: i, tag: workingTags[i].toLowerCase() };
                        tagSelected = true;
                    }
                    // lookup for filtering out chosen tags
                    chosenTags[currentTags[i].toLowerCase()] = true;
                }

                if (currentTag.tag) {
                    // collect potential tags
                    if (settings.url) {
                        $.ajax({
                            'url' : settings.url,
                            'dataType' : 'json',
                            'data' : { 'tag' : currentTag.tag },
                            'async' : false, // wait until this is ajax hit is complete before continue
                            'success' : function (m) {
                                matches = m;
                            }
                        });
                    } else {
                        for (i = 0; i < userTags.length; i++) {
                            if (userTags[i].indexOf(currentTag.tag) === 0) {
                                matches.push(userTags[i]);
                            }
                        }                        
                    }
                    
                    matches = $.grep(matches, function (v, i) {
                        return !chosenTags[v.toLowerCase()];
                    });

                    if (settings.sort) {
                        matches = matches.sort();
                    }                    

                    for (i = 0; i < matches.length; i++) {
                        html += '<' + settings.tagWrap + ' class="_tag_suggestion">' + matches[i] + '</' + settings.tagWrap + '>';
                    }

                    tagMatches.html(html);
                    suggestionsShow = !!(matches.length);
                } else {
                    hideSuggestions();
                }
            }

            function hideSuggestions() {
                tagMatches.empty();
                matches = [];
                suggestionsShow = false;
            }

            function setSelection() {
                var v = tagsElm.val();

                // tweak for hintted elements
                // http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
                if (v == tagsElm.attr('title') && tagsElm.is('.hint')) v = '';

                currentTags = v.split(settings.separator);
                hideSuggestions();
            }

            function chooseTag(tag) {
                var i, index;
                for (i = 0; i < currentTags.length; i++) {
                    if (currentTags[i].toLowerCase() != workingTags[i].toLowerCase()) {
                        index = i;
                        break;
                    }
                }

                if (index == workingTags.length - 1) tag = tag + settings.separator;

                workingTags[i] = tag;

                tagsElm.val(workingTags.join(settings.separator));
                tagsElm.blur().focus();
                setSelection();
            }

            function handleKeys(ev) {
                fromTab = false;
                var type = ev.type;
                var resetSelection = false;
                
                switch (ev.keyCode) {
                    case 37: // ignore cases (arrow keys)
                    case 38:
                    case 39:
                    case 40: {
                        hideSuggestions();
                        return true;
                    }
                    case 224:
                    case 17:
                    case 16:
                    case 18: {
                        return true;
                    }

                    case 8: {
                        // delete - hide selections if we're empty
                        if (this.value == '') {
                            hideSuggestions();
                            setSelection();
                            return true;
                        } else {
                            type = 'keyup'; // allow drop through
                            resetSelection = true;
                            showSuggestionsDelayed(this);
                        }
                        break;
                    }

                    case 9: // return and tab
                    case 13: {
                        if (suggestionsShow) {
                            // complete
                            chooseTag(matches[0]);
                            
                            fromTab = true;
                            return false;
                        } else {
                            return true;
                        }
                    }
                    case 27: {
                        hideSuggestions();
                        setSelection();
                        return true;
                    }
                    case 32: {
                        setSelection();
                        return true;
                    }
                }

                if (type == 'keyup') {
                    switch (ev.charCode) {
                        case 9:
                        case 13: {
                            return true;
                        }
                    }

                    if (resetSelection) { 
                        setSelection();
                    }
                    showSuggestionsDelayed(this, ev.charCode);            
                }
            }

            tagsElm.after(tagMatches).keypress(handleKeys).keyup(handleKeys).blur(function () {
                if (fromTab == true || suggestionsShow) { // tweak to support tab selection for Opera & IE
                    fromTab = false;
                    tagsElm.focus();
                }
            });

            // replace with jQuery version
            tagMatches = $(tagMatches).click(function (ev) {
                if (ev.target.nodeName == settings.tagWrap.toUpperCase() && $(ev.target).is('._tag_suggestion')) {
                    chooseTag(ev.target.innerHTML);
                }                
            }).addClass(settings.matchClass);

            // initialise
            setSelection();
        });
    };
})($);
/* }}} */

// ==UserScript==
// @name            Tieba.OpenTail.ManagerDetector
// @description     A discerning tail that highlights managers on current page
// @namespace       me@itianda.com
// @include         http://tieba.baidu.com/*
// @version         1.0.2
// @grant           none
// @updateURL       https://userscripts.org/scripts/source/180487.meta.js
// @downloadURL     https://userscripts.org/scripts/source/180487.user.js
// ==/UserScript==


(function(undefined) {
    window.__opentail__ = $.extend(window.__opentail__ || {}, new function() {
        var _this = this;
        var opentail = function() {return window.__opentail__ || _this};
        opentail().tails = $.extend(opentail().tails || {}, {
            'ManagerDetector': function(type) {
                if(type == 'fire') {
                    var environment = arguments[1];
                    var tt_l = '<br/><br/>————';
                    var rs_l = '<span class="edit_font_color"><strong>';
                    var rs_t = '</strong></span>';
                    var post_type = environment.post_type();
                    var content = environment.content();
                    var tail_text = '';
                    if(post_type == 'reply' || post_type == 'repost') {
                        var authors = [];
                        $.each($('.l_post'), function(i, e) {
                            var author = $(e).data('field').author;
                            if($.grep(authors, function(e) {return e.id == author.id;}).length == 0) {
                                authors.push(author);
                            }
                        });

                        var managers = $.grep(authors, function(e) {return e.bawu != 0;});
                        if(managers.length == 0) {
                            tail_text = tt_l + '暂未发现吧务，大家可以放心水贴';
                        } else {
                            tail_text = tt_l + '侦测到吧务' + rs_l + managers.length + rs_t +
                                '只，' + (managers.length == 1? 'TA': 'TA们') + '是' +
                                $.map(managers, function(e) {
                                    return '#' + rs_l + e.name + rs_t + '#';
                                }).join(' ');
                        }
                    } else if(post_type == 'topic') {
                        tail_text = tt_l + '假装吧务不在，楼主先光明正大地水一贴';
                    }
                    environment.content(content + tail_text);
                }
            }
        });
    });
}).apply(window);
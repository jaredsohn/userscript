// ==UserScript==
// @name            Tieba.OpenTail.WaterBeeDetector
// @description     A tail that spotlights the user with the most experience points
// @namespace       me@itianda.com
// @include         http://tieba.baidu.com/*
// @version         1.0.9
// @grant           none
// @updateURL       https://userscripts.org/scripts/source/180721.meta.js
// @downloadURL     https://userscripts.org/scripts/source/180721.user.js
// ==/UserScript==


(function(undefined) {
    window.__opentail__ = $.extend(window.__opentail__ || {}, new function() {
        var _this = this;
        var opentail = function() {return window.__opentail__ || _this;};
        opentail().tails = $.extend(opentail().tails || {}, {
            'WaterBeeDetector': function(type) {
                if(type == 'fire') {
                    var environment = arguments[1];
                    var tt_l = '<br/><br/>————';
                    var rs_l = '<span class="edit_font_color"><strong>';
                    var rs_t = '</strong></span>';
                    var post_type = environment.post_type();
                    var content = environment.content();
                    var tail_text = '';
                    if(post_type == 'reply' || post_type == 'repost') {
                        var $bee = $('.l_post').sort(function(a, b) {
                            return $(b).data('field').author.grade_exp - $(a).data('field').author.grade_exp;
                        }).eq(0);
                        var bee = $bee.data('field').author;
                        var bee_icons = [];
                        if($bee.find('.icon_wrap .icon_meizhi').length != 0) {
                            $.ajax({
                                global: false,
                                async: false,
                                type: 'post',
                                url: '/encourage/get/meizhi/panel',
                                data: {
                                    user_id: bee.id,
                                    type: 1
                                },
                                dataType: 'json',
                                success: function(json) {
                                    if(json.no == 0) {
                                        var data = json.data;
                                        var vote_arr = data.vote_count;
                                        var max_percent = Math.max(vote_arr.meizhi, vote_arr.weiniang, vote_arr.renyao);
                                        switch(max_percent) {
                                            case vote_arr.meizhi:
                                                bee_icons.push('妹纸');
                                                break;
                                            case vote_arr.weiniang:
                                                bee_icons.push('伪娘');
                                                break;
                                            case vote_arr.renyao:
                                                bee_icons.push('人妖');
                                                break;
                                            default:
                                                bee_icons.push('绅士');
                                        }
                                    } else {
                                        bee_icons.push('绅士');
                                    }
                                },
                                error: function() {
                                    bee_icons.push('绅士');
                                }
                            });
                        }
                        $bee.find('.icon_wrap a[locate]').each(function() {
                            bee_icons.push($(this).attr('title'));
                        });
                        if($bee.find('.icon_wrap .icon_fanclub').length != 0) {
                            bee_icons.push('粉丝会员');
                        }
                        var me = window.PageData.user;
                        if(bee.id == me.id) {
                            tail_text = tt_l + '水神在此，孰敢造次？';
                        } else {
                            tail_text = tt_l + '侦测到' + rs_l + (bee.grade_level > 9? '大': '小') +
                                '水笔' + rs_t + '一只，TA是' + $.map(bee_icons, function(e) {
                                    return '[' + rs_l + e + rs_t + ']';
                                }).join('+') + (bee_icons.length != 0? '——': '') + '#' + rs_l + bee.name + rs_t + '#[Exp=' + rs_l + bee.grade_exp + rs_t + ']';
                        }
                    } else if(post_type == 'topic') {
                        tail_text = tt_l + '颤抖吧，水笔们！';
                    }
                    environment.content(content + tail_text);
                }
            }
        });
    });
}).apply(window);
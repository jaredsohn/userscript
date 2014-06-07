// ==UserScript==
// @name            Tieba.OpenTail.Commendation
// @description     A delusive tail randomly merging other post authors into the predefined performance artists who consider your post as worth commendation
// @namespace       me@itianda.com
// @include         http://tieba.baidu.com/*
// @version         1.0.3
// @grant           none
// @updateURL       https://userscripts.org/scripts/source/182638.meta.js
// @downloadURL     https://userscripts.org/scripts/source/182638.user.js
// ==/UserScript==


(function(undefined) {
    var shuffle = function(list) {
        var _list = [].concat(list);
        for(var j, x, i = _list.length; i; j = Math.floor(Math.random() * i), x = _list[--i], _list[i] = _list[j], _list[j] = x) {}
        return _list;
    };
    var unique = function(list) {
        var _list = [];
        $.each(list, function(i, e) {
            if(_list.indexOf(e) == -1) {
                _list.push(e);
            }
        });
        return _list;
    };
    window.__opentail__ = $.extend(window.__opentail__ || {}, new function() {
        var _this = this;
        var opentail = function() {return window.__opentail__ || _this;};
        opentail().tails = $.extend(opentail().tails || {}, {
            'Commendation': function(type) {
                if(type == 'fire') {
                    var environment = arguments[1];
                    (function() {
                        var tt_l = environment.tt_l || '<br/><br/>————';
                        var rs_l = environment.rs_l || '<span class="edit_font_color"><strong>';
                        var rs_t = environment.rs_t || '</strong></span>';
                        var default_predefined_users_text = '吉川萌 叶山丽子 星杏奈 村上丽奈 松本麻里奈 白石曈 朝冈实岭 饭岛爱 三浦爱佳 吉野纱莉 铃木麻奈美 大浦安娜 安倍夏树 及川奈央 松岛枫 酒井千美 美竹凉子 中谷美结 泷泽萝拉 苍井空 小泽玛利亚 波多野结衣';
                        var predefined_users_text = $.trim(localStorage['Commendation.preferences.predefined_users']);
                        var predefined_users = predefined_users_text.length > 0? predefined_users_text.split(/\s+/): [];
                        var post_type = environment.post_type();
                        var content = environment.content();
                        var tail_text = '';
                        var wrap_users = function(users) {
                            return $.map(users, function(e) {
                                return '#' + rs_l + e + rs_t + '#';
                            });
                        };
                        var make_tail = function(users, limit) {
                            var _users = shuffle(unique(predefined_users.concat(users)));
                            if(_users.length == 0) {
                                _users = shuffle(default_predefined_users_text.split(/\s+/));
                            }
                            _users = _users.slice(0, limit || 10);
                            return tt_l + wrap_users(_users).join(' ') + '等' + rs_l + '行为♀艺术家' + rs_t + '觉得赞';
                        };
                        if(post_type == 'topic') {
                            (function() {
                                var authors = unique($.map($('.j_thread_list .j_user_card'), function(e) {
                                    return $(e).data('field').un;
                                }));
                                authors = $.grep(authors, function(e) {return e != PageData.user.name;});
                                tail_text = make_tail(authors, 10);
                            })();
                        } else if(post_type == 'reply' || post_type == 'repost') {
                            (function() {
                                var authors = unique($.map($('.l_post'), function(e) {
                                    return $(e).data('field').author.name;
                                }));
                                authors = $.grep(authors, function(e) {return e != PageData.user.name;});
                                tail_text = make_tail(authors, post_type == 'reply'? 10: 5);
                            })();
                        }
                        environment.content(content + tail_text);
                    })();
                } else if(type == 'select') {
                    if(localStorage['Commendation.preferences.predefined_users'] === undefined) {
                        localStorage['Commendation.preferences.predefined_users'] = default_predefined_users_text;
                    }
                    var preferences = {
                        predefined_users: localStorage['Commendation.preferences.predefined_users']
                    };
                    console.log(preferences.predefined_users + ' -> predefined_users');
                    $('<span id="commendation-option"></span>')
                        .append(
                            $('<label for="predefined_users"></label>')
                        )
                        .append(
                            $('<span> 赞美者 </span>')
                        )
                        .append(
                            $('<input id="predefined_users" placeholder="输入赞美者，以空格分隔"/>').val(preferences.predefined_users)
                        )
                        .appendTo(opentail().widget);
                    opentail().widget.find('#commendation-option #predefined_users').change(function() {
                        console.log('predefined_users -> ' + $(this).val());
                        localStorage['Commendation.preferences.predefined_users'] = $(this).val();
                    });
                } else if(type == 'unselect') {
                    opentail().widget.find('#commendation-option').remove();
                }
            }
        });
    });
}).apply(window);
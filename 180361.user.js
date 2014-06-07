// ==UserScript==
// @name            Tieba.OpenTail
// @description     A pluggable tail manager which comes with a default tail
// @namespace       me@itianda.com
// @include         http://tieba.baidu.com/*
// @version         1.1.4
// @grant           none
// @updateURL       https://userscripts.org/scripts/source/180361.meta.js
// @downloadURL     https://userscripts.org/scripts/source/180361.user.js
// ==/UserScript==


// Tail manager
(function(undefined) {
    window.__opentail__ = $.extend(window.__opentail__ || {}, new function() {
        var _this = this;
        var opentail = function() {return window.__opentail__ || _this};
        var traitor = (window.__traitor__ = window.__traitor__ || {});
        traitor.actions = traitor.actions || $.Callbacks();
        traitor.actions.add(function(environment) {
            console.log('setup traitor action');
            if(opentail().widget.find('#tail-status').prop('checked')) {
                var func = opentail().tails[opentail().widget.find('#tail-name').val()];
                func('fire', environment);
            }
        });
        setTimeout(function() {
            if($('.j_poster_signature').length == 0) {
                return setTimeout(arguments.callee, 0);
            }
            opentail().tails = opentail().tails || {};
            var tails = [];
            for(var k in opentail().tails) {
                tails.push(k);
            }
            tails = tails.sort();
            var preferences = {
                tail_status: localStorage['__opentail__.preferences.tail_status'] == 'true',
                tail_name: 'Default'
            }
            var tail_name = localStorage['__opentail__.preferences.tail_name'];
            if(tails.indexOf(tail_name) == -1) {
                preferences.tail_name = 'Default';
            } else {
                preferences.tail_name = tail_name;
            }
            opentail().widget = $('<span id="opentail()-widget"></span>').append(
                '<span> | </span>' +
                '<label for="tail-status">' +
                    '<input id="tail-status" type="checkbox"' +
                        (preferences.tail_status? ' checked="checked"': '') +
                    '/>' +
                    '<span> </span>' +
                    '<span>使用小尾巴</span>' + 
                '</label>' +
                '<span> </span>' +
                '<select id="tail-name"></select>'
            ).appendTo('.j_poster_signature');
            opentail().widget.find('#tail-status').click(function() {
                console.log('tail_status -> ' + $(this).prop('checked'));
                localStorage['__opentail__.preferences.tail_status'] = $(this).prop('checked');
            });
            $.each(tails, function(i, e) {
                opentail().widget.find('#tail-name').append(
                    $('<option></option>').val(e).text(e)
                );
            });
            opentail().widget.find('#tail-name')
                .data('value', preferences.tail_name)
                .val(preferences.tail_name)
                .change(function() {
                console.log('tail_name -> ' + $(this).val());
                localStorage['__opentail__.preferences.tail_name'] = $(this).val();
                opentail().tails[$(this).data('value')]('unselect');
                $(this).data('value', $(this).val())
                opentail().tails[$(this).data('value')]('select');
            });
            opentail().tails[preferences.tail_name]('select');
        },
        0);
    });
}).apply(window);


// Default tail
(function(undefined) {
    window.__opentail__ = $.extend(window.__opentail__ || {}, new function() {
        var _this = this;
        var opentail = function() {return window.__opentail__ || _this};
        opentail().tails = $.extend(opentail().tails || {}, {
            'Default': function(type) {
                if(type == 'fire') {
                    var environment = arguments[1];
                    var content = environment.content();
                    environment.content(content + opentail().widget.find('#default-option #tail_text').val());
                } else if(type == 'select') {
                    console.log('select');
                    var preferences = {
                        tail_text: localStorage['Default.preferences.tail_text']
                    };
                    console.log(preferences.tail_text + ' -> tail_text');
                    $('<span id="default-option"></span>')
                        .append(
                            $('<label for="tail_text"></label>')
                        )
                        .append(
                            $('<span> 文本 </span>')
                        )
                        .append(
                            $('<input id="tail_text" placeholder="输入你的小尾巴"/>').val(preferences.tail_text)
                        )
                        .appendTo(opentail().widget);
                    opentail().widget.find('#default-option #tail_text').change(function() {
                        console.log('tail_text -> ' + $(this).val());
                        localStorage['Default.preferences.tail_text'] = $(this).val();
                    });
                } else if(type == 'unselect') {
                    console.log('unselect');
                    opentail().widget.find('#default-option').remove();
                }
            }
        });
    });
}).apply(window);
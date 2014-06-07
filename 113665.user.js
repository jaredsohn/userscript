// ==UserScript==
// @name           Jiepang Radar
// @namespace      http://jiepang.com/venue/
// @include        http://jiepang.com/venue/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require        http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js
// @resource       css http://119.254.231.36:8080/static/main.css?v=2
// ==/UserScript==


$(function() {
    APP_ID = '100116';
    SERVER = 'http://119.254.231.36:8080';
    RADAR_BTN = '<a id="radar-btn" href="#">添加雷达</a>';
    EMPTY_TXT = '想发送短信通知的内容';
    RADAR_POPUP_HEADER_TMPL = '<div class="dialog-header"><h2>{{= title}}</h2></div>';
    RADAR_POPUP_SETTING_TMPL = '<div class="radar-setting item"><h3>雷达设置</h3>'
        + '<div class="sub-item"><label>短信通知发送给：</label>'
        + '<input type="radio" name="send-to" value="0" checked>被侦测的好友&nbsp;&nbsp;'
        + '<input type="radio" name="send-to" value="1">自己</div>'
        + '<div class="sub-item"><label>侦测范围：</label><select name="range">'
        + '<option value="0">本地</option><option value="500">500米</option>'
        + '<option value="1000">1000米</option><option value="2000">2000米</option>'
        + '</select></div><div class="sub-item"><label>起止时间：</label>'
        + '<input type="text" class="text" name="start">'
        + '&nbsp;-&nbsp;<input type="text" class="text" name="end">'
        + '<p class="tip">日期格式：2011-09-18 00:00:00</p></div>';
    RADAR_POPUP_TEXTAREA_TMPL = '<div class="sub-item">'
        + '<textarea class="empty" name="txt">{{= txt}}</textarea></div>';

    $.template('radar_popup_header', RADAR_POPUP_HEADER_TMPL);
    $.template('radar_popup_setting', RADAR_POPUP_SETTING_TMPL);
    $.template('radar_popup_textarea', RADAR_POPUP_TEXTAREA_TMPL);

    var css = GM_getResourceText('css'),
        venue = $('#venue-title').text(),
        uid = $('#btn-login').length ? 0 : $('#utilities-me > a').attr('href').split('/')[2],
        guid = window.location.href.split('/').pop(),
        _token_key = 'jiepang-radar-' + uid,

        showPopup = function() {
            if ($('#add-radar').length) {
                return;
            }

            unsafeWindow.J.app.tagFriend('', '', false, 'tag');
            var i = setInterval(function() {
                var $dlg = $('#dialog-tag-friend'),
                    win = $(window);
                if ($dlg.length) {
                    clearInterval(i);

                    var $content = $dlg.find('.dialog-popup-content'),
                        $frm = $dlg.find('form'),
                        $submitBtn = $frm.find('input[type=submit]'),
                        $textarea;

                    $dlg.attr('id', 'add-radar');
                    $.tmpl('radar_popup_header', {
                        'title': '在' + venue + '添加雷达'
                    }).prependTo($content);
                    $frm.wrap('<div class="dialog-content"></div>')
                        .find('h3').text('需要侦测的好友？');
                    $submitBtn.before($.tmpl('radar_popup_setting'));
                    $.tmpl('radar_popup_textarea', {
                        txt: EMPTY_TXT
                    }).appendTo('.radar-setting');

                    $dlg.css('top', Math.floor((win.height() - $dlg.height()) / 2) - 35);
                    $dlg.find('textarea').focus(function() {
                        if ($(this).val() === EMPTY_TXT) {
                            $(this).val('').removeClass('empty');
                        }
                    }).blur(function() {
                        if (!$.trim($(this).val())) {
                            $(this).val(EMPTY_TXT).addClass('empty');
                        }
                    });

                    $frm.submit(function() {
                        var sendTo = $('input[name="send-to"]:checked').val(),
                            range = $('select[name="range"]').val(),
                            friends = $.map($('input[name="friend_names[]"]'), function(e) {
                                return $(e).val();
                            }),
                            start = $.trim($('input[name="start"]').val()),
                            end = $.trim($('input[name="end"]').val()),
                            txt = $.trim($('textarea[name="txt"]').val()),
                            dataStr = $.param({
                                'guid': guid,
                                'uid': uid,
                                'send-to': sendTo,
                                'range': range,
                                'friends': friends,
                                'start': start,
                                'end': end,
                                'txt': (txt === EMPTY_TXT) ? '' : txt
                            });
                        console.log(sendTo);

                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: SERVER + '/radar/new',
                            data: dataStr,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            onload: function(response) {
                                var success = $.parseJSON(response.responseText)['success'];
                                if (success) {
                                    $dlg.remove();
                                }
                            }
                        });

                        return false;
                    });
                }
            }, 500);
        },

        getAccessToken = function() {
            var href = window.location.href;
            window.location.href = 'https://jiepang.com/oauth/authorize?response_type=code&client_id='
                    + APP_ID + '&redirect_uri=' + encodeURIComponent(SERVER + '/oauth/authorize')
                    + '&state=' + encodeURIComponent(href) + '||||' + uid;
        },

        setAccessToken = function(value) {
            GM_getValue(_token_key, value);
        };

    GM_addStyle(css);

    $(RADAR_BTN).appendTo('.venue-actions').click(function(e) {
        e.preventDefault();
        var token = GM_getValue(_token_key);
        if (!token) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: SERVER + '/oauth/token/' + uid,
                onload: function(response) {
                    var token = $.parseJSON(response.responseText)['token'];
                    if (token) {
                        setAccessToken(token);
                        showPopup();
                    } else {
                        getAccessToken();
                    }
                }
            });
        } else {
            showPopup();
        }
    });
});
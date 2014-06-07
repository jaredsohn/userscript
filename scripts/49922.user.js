//
// ==UserScript==
// @name        Yahoo! Profiles Blast Emoji Supporter
// @description Add support for Yahoo! Profiles blast emoji input
// @include     http://profiles.yahoo.co.jp/-/edit/blast/*
// ==/UserScript==
//
// 2009/05/24 version 0.1    Initial version

(function(){
    var isEmojiWindowOpen = false;
    var isEmojiWindowInitialized = false;

    function setStyle(){
        var style =
            <><![CDATA[
                #emojidialog {
                    position: absolute;
                    border: 1px solid #666666;
                    margin-top: 0.2em;
                    padding: 0em 0.5em 0.5em 0.5em;
                    background: #ffffff;
                    display: none;
                }
                #emojiclosebutton {
                    text-align: right;
                }
            ]]></>;
        GM_addStyle(style);
    }

    // set up jQuery variable
    var $;
    // Add jQuery
    var GM_JQ = document.createElement("script");
    GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
    GM_JQ.type = "text/javascript";
    document.body.appendChild(GM_JQ);
    // Check if jQuery's loaded
    var checker = setInterval(function() {
        if (typeof($ = unsafeWindow.jQuery) != "undefined") {
            clearInterval(checker);
            letsJQuery();
        }
    }, 100);
    // All your GM code must be inside this function
    function letsJQuery() {
        $('#contentBodyCount').after('<br /><a href="#" id="emojiprompt">絵文字一覧を表示する</a>');
        $('#emojiprompt').click(function(e) {
            e.preventDefault();
            if (isEmojiWindowOpen) {
                closeEmojiWindow();
            } else {
                openEmojiWindow();
            }
        });
    }
    function openEmojiWindow() {
        if (!isEmojiWindowInitialized) {
            var emojidialog = '<div id="emojidialog">';
            setStyle();
            var emojiidx = [
                '3', '6', '8', '9',
                '10', '11', '12', '13', '14', '16', '17', '18', '19',
                '20', '21', '22', '24', '26', '27', '28', '29',
                '30', '33', '34', '35',
                '48',
                '51', '52', '54', '56', '58', '59',
                '60', '61', '62', '63', '67', '68', '69',
                '70', '71', '72', '73', '74', '75', '76', '79',
                '82', '85', '87', '89',
                '93', '94', '95', '96', '98',
                '101', '104', '105', '106', '108',
                '110', '111', '114',
                '122', '125', '127', '128',
                '132', '137',
                '140', '144',
                '150', '151', '152',
                '162', '167', '168', '169',
                '171', '173', '174', '175', '176', '177', '178', '179',
                '182', '188',
                '190', '192', '193', '194', '195', '196', '198',
                '208', '209',
                '210', '211', '212', '213', '214', '215', '216', '217',
                '221', '222', '223',
                '234', '235', '236', '237',
                '243', '244', '245', '246', '247', '248', '249',
                '250', '251', '252', '253', '254', '257', '258', '259',
                '262',
                '271', '274',
                '280', '281', '284', '287', '289',
                '290', '291', '298',
                '305', '306', '307', '308',
                '316', '318', '319',
                '322', '326', '327',
                '334', '336', '339',
                '345', '349',
                '352', '353', '354', '357',
                '361', '364', '369',
                '372', '374',
                '389',
                '399',
                '407', '409',
                '414',
                '422', '425', '426',
                '458',
                '477', '478',
            ];
            for (var i in emojiidx) {
                emojidialog += '<a href="#emojiicon' + i + '" name="emojiicon">';
                emojidialog += '<img src="http://i.yimg.jp/images/mail/emoji/15/ew_icon_s' + i + '.gif" width="15" height="15">';
                emojidialog += '</a>';
                if (i % 24 == 0) {
                    emojidialog += '<br />';
                }
            }
            emojidialog += '<br /><div id="emojiclosebutton"><a href="#" id="emojiclose">閉じる</a></div>';
            emojidialog += '</div>';
            $('#emojiprompt').after(emojidialog);
            $('a[name=emojiicon]').click(function(e) {
                e.preventDefault();
                var id = $(this).attr('href');
                var s = '{{s0}}';
                if (id.match(/#emojiicon(\d+)/)) {
                    s = '{{s' + RegExp.$1 + '}}';
                }
                var blst = $('#contentBody').val();
                blst += s;
                $('#contentBody').val(blst);
//                $('#contentBody').focus();
                // キーボードイベントを送って入力可能な残り文字数を更新させる
                var event = document.createEvent('KeyboardEvent');
                event.initKeyEvent("keydown", true, true, null, false, false, false, false, 65, 0);
                document.getElementById('contentBody').dispatchEvent(event);
            });
            $('#emojiclose').click(function(e) {
                e.preventDefault();
                closeEmojiWindow();
            });
            isEmojiWindowInitialized = true;
        }
        $('#emojidialog').show();
        isEmojiWindowOpen = true;
        $('#emojiprompt').text('絵文字一覧を閉じる');
    }
    function closeEmojiWindow() {
        $('#emojidialog').hide();
        isEmojiWindowOpen = false;
        $('#emojiprompt').text('絵文字一覧を表示する');
    }
})();
// ==UserScript==
// @name       TF2R Emoticons
// @version    1.2.7
// @namespace  http://www.tf2calculator.com
// @include    http://tf2r.com/*
// @copyright  2013+, Hans, thanks to Iwasawafag for advice on regex and general help
// ==/UserScript==
$(function() {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + include + ')();'));
    document.head.appendChild(script);
    $('head').append('<style>.ufmes{min-height:16px !important;}.hansWarn{border: 1px solid green; padding: 5px; margin: 10px auto; background-repeat: repeat; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; -moz-box-shadow: 0px 0px 15px #88ff88; -webkit-box-shadow: 0px 0px 15px #88ff88; box-shadow: 0px 0px 15px #88ff88; margin: 5px auto 5px; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAN0lEQVQImWO0NjX4/fsPAwZg+v37DysrCxYJBgYGrHJMEApTjgnOQpNjQlaFLIcigSyHLgGXAwANmBii3SQyqgAAAABJRU5ErkJggg%3D%3D");display:block;}#nicechat,#nicechat2{display:none;}</style>');

    function include() {
        window.emoticonLoadFailed = function(image) {
            $(image).replaceWith($(image).attr('alt'));
        }
        var emoticon2 = function(message) {
                message = message.replace(/:[a-z0-9-_]+?:/ig, function(match) {
                    return img = '<img src="http://cdn.steamcommunity.com/economy/emoticon/' + match.substr(1, match.length - 2) + '" onerror="emoticonLoadFailed(this);" alt="' + match + '" style="margin-bottom:-5px;" title="' + match + '">';
                });
                return message;
            };
        setTimeout(function() {
            var originalAddMess = AddMess;
            AddMess = function(msg) {
                msg.message = emoticon2(msg.message);
                originalAddMess(msg);
            };
        }, 200);
        $('.ufmes').each(function() {
            $(this).html(emoticon2($(this).html()));
        });
        var hansAccept = window.localStorage.hansAccept;
        hansAccept = window.localStorage["hansAccept"];
        if (!hansAccept) {
            if (window.location.href == 'http://tf2r.com/chat.html') {
                $('#feedtext,#sendfeed').hide();
                $('.indent .text_holder').after('<div class="userfeedpost hansWarn" style="background-color: rgb(42, 39, 37); display: block;"><div class="ufinf"><div class="ufname"><a href="http://tf2r.com/user/76561198009112834.html" style="color:#837768;">_Hands</a></div><div class="ufavatar"><a href="http://tf2r.com/user/76561198009112834.html"><img src="http://media.steampowered.com/steamcommunity/public/images/avatars/89/899b468e680add873c255e95242cc315bc510bdd.jpg"></a></div></div><div class="ufmes">Hi! Thanks for installing my emoticon script. Please keep in mind that most people don\'t use the script, so you might look very stupid when spamming emoticons. The moderators are not very fond of spam ( <a href="http://tf2r.com/user/76561198063431914.html" alt="example">example</a>), but as long as you\'re not spamming and keep it on an acceptable level, you\'ll be fine. Use it to make people using the steam emoticons look less stupid to you, not to make yourself look more stupid to others! <input type="submit" value="I get it, let me chat!" style="position:absolute;bottom:4px;right:24px;height:17px;line-height:0;" onclick="$(\'#feedtext,#sendfeed\').show();$(\'.hansWarn\').remove();window.localStorage.hansAccept = \'Accepted\';"></div></div>');
            }
        }
    }
});
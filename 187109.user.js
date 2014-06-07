// ==UserScript==
// @name       BG HTML5 Video
// @namespace  http://userscripts.org/scripts/review/187109
// @version    0.3
// @description  Replace flowplayer with video tag
// @match      http://*/*
// @match      https://*/*
// @match      http://btvnews.bg/*
// @match      http://novanews.bg/*
// @match      http://www.bodybuilding.com/*
// @copyright  2013+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function() {
    function html5_video($player, url, width, height) {
        console.log('url: ' + url);
        if(! /\.mp4$/.test(url)) {
            return;
        }
        $player.replaceWith('<video width="' + width + '" height="' + height + '" controls src="' + url +'"/>');
    }
    function parse_flashvars(flashvars) {
        if(flashvars.indexOf('&') != -1) {
            var result = {};
            var vars = flashvars.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                result[pair[0]] = pair[1];
            }
            return result;
        } else {
            return eval(flashvars);
        }
    }
    $('.article_embed_player, .article_player, .player').each(function() {
        function trigger_click($element) {
            $element.trigger('click');
            $element.removeAttr('onclick');
            $element.off('click');
            for(var i = 0; i < $element.children().length; ++i) {
                trigger_click($element.children(i));
            }
        }
        trigger_click($(this));
    });
    function replace_flash() {
        function replace_flowplayer($player, flashvars) {
            console.log('flowplayer');
            var url = flashvars.clip.url;
            var width = $player.width();
            var height = $player.height();
            var $a = $player.closest('a');
            var cnt = $a.contents();
            $a.replaceWith(cnt);
            html5_video($player, url, width, height);
        }
        $('embed').each(function() {
            console.log('embed');
            debugger;
            var $player = $(this);
            var flashvars = parse_flashvars($player.attr('flashvars'));
            var url = flashvars.file;
            var width = flashvars.width;
            var height = flashvars.height;
            html5_video($player, url, width, height);
        });
        $('object').each(function() {
            console.log('object');
            var $player = $(this);
            var flashvars = parse_flashvars($player.find('param[name=flashvars]').attr('value'));
            if($player.attr('data') && $player.attr('data').indexOf('flowplayer') != -1) {
                replace_flowplayer($player, flashvars);
                return;
            }
            var width = $player.attr('width');
            var height = $player.attr('height');
            var $video = $player.find('video');
            var url;
            if ($video.length == 1) {
                url = $video.attr('file');
            } else {
                url = flashvars.file;
            }
            html5_video($player, url, width, height);
        });
    }
    setTimeout(replace_flash, 500);
});
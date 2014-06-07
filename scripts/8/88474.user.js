// ==UserScript==
// @name           TED Download
// @namespace      TED Download
// @description    TED Download
// @include        http://www.ted.com/talks/lang/*
// @grant       none
// ==/UserScript==

(function() {
    //$('#downloadTalk').trigger('click');
    var subtitle = 'http://greatdreamers.sinaapp.com/tedsubs/?url=' + encodeURIComponent(window.location.href) + '&lang=';

    var noscript = $('#flash_message').html();
    $('.talk-wrapper').append('<div style="display:none">' + noscript + '</div>');
    var mp4 = $('#no-flash-video-download').attr('href');

    var pathArray = mp4.split('/');
    var mp4name = pathArray[pathArray.length - 1];

    $('.talk-wrapper').append('<style>.subtitles{margin:10px 0 0;font-size:12px;background-color:yellow;padding:10px} .subtitles a, .subtitles strong {margin-right:1em;} .videos {position:relative; padding-top:20px; height:0px;overflow:hidden;}</style><div class="subtitles"><strong>Download</strong><a href="' + mp4 +'">' + mp4name +'</a><a href="' + subtitle +'eng">English Subtitle</a><a href="' + subtitle +'chs">简体中文字幕</a><a href="' + subtitle +'cht">繁體中文字幕</a></div>');
})();
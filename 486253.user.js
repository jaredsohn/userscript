// ==UserScript==
// @name        SME.sk s HTML5 prehravacom videa namiesto Flashu
// @namespace   http://jansokoly.com
// @include     http://*.sme.sk/*
// @version     1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $('[id^=smeplayer_id]').each(function() {
        var videoElement = $(this)

        var videoId = videoElement.attr('id').substr(12);
        var videoChild = videoElement.children(':eq(0)');

        if (videoChild.prop('tagName').toLowerCase() == 'embed') {
            // tv.sme.sk, kde su videa spustane automaticky

            videoChild.css('display', 'none');
            st_create_html5_video_code('smeplayer_id' + videoId, new Array(630, 354, 'autoplay', videoId, ''));
        }
        else {
            // embedovane videa v clankoch, ktore nie su spustane automaticky

            var stillSource = videoElement.find('img:eq(0)').attr('src');

            jQuery('<a/>', {
               id: 'playHTML5Video',
               href: '#',
               title: '',
               rel: 'external',
               text: 'Spustiť HTML5 video',
               onclick: "st_create_html5_video_code('smeplayer_id" + videoId + "', new Array(480, 270, 'autoplay', " + videoId + ", '" + stillSource + "')); return false;"
            }).insertAfter(this);
        }

        return false;
    });
});
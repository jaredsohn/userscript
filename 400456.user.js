// ==UserScript==
// @name           Free SoundSnap 2014
// @namespace      Free SoundSnap 2014
// @description    Download unlimited free sounds from SoundSnap.
// @include        http://www.soundsnap.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author         drhouse
// @version        1.0.1
// ==/UserScript==

$(document).ready(function () {
    
    var mod = $('#jp_audio_0').attr('src');
    var link = '<br><a href="'+mod+'">Free Download</a>';
    var title = 'div.image_corners_content.audio-box-corners-CONTENTS > table > tbody > tr:nth-child(6) > td';
    $(title).append(link);
    
});

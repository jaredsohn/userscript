// ==UserScript==
// @name           Download TED subtitle english, portuguese, and 日本語
// @namespace      asllearner/saviski 
// @description    Dowload TED Subtitle	in english, portuguese, and 日本語(revised　from a script by saviski) 
// @include        http://www.ted.com/talks/*
// ==/UserScript==

unsafeWindow.$('download_dialog').querySelector('div').innerHTML += '<h3>Legenda</h3><dl class="downloads"><dt>Download <a href="http://tedtalksubtitledownload.appspot.com/get_subtitle?tedtalkid=' + unsafeWindow.talkID + '&lang=por_br&timeIntro=15330">Portuguese</a>&nbsp;</dt><dt><a href="http://tedtalksubtitledownload.appspot.com/get_subtitle?tedtalkid=' + unsafeWindow.talkID + '&lang=eng_US &timeIntro=15330">US english</a>&nbsp;</dt><dt><a href="http://tedtalksubtitledownload.appspot.com/get_subtitle?tedtalkid=' + unsafeWindow.talkID + '&lang=ja_JP &timeIntro=15330">Japanese</a>&nbsp;Subtitles</dt><dd>Download in english, portuguese, and japanese (日本語)</dd></dl>'
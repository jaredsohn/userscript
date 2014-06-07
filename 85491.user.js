// ==UserScript==
// @name           Download TED subtitle
// @namespace      saviski
// @description    Dowload TED Subtitle
// @include        http://www.ted.com/talks/*
// ==/UserScript==

unsafeWindow.$('download_dialog').querySelector('div').innerHTML += '<h3>Legenda</h3><dl class="downloads"><dt><a href="http://tedtalksubtitledownload.appspot.com/get_subtitle?tedtalkid=' + unsafeWindow.talkID + '&lang=por_br&timeIntro=15330">Download pt-br Subtitles</a></dt><dd>Download das legendas em português</dd></dl>'
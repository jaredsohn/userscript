// ==UserScript==
// @name       OpenSubtitles auto-start subtitle download
// @version    0.1
// @description  Automatically start download on OpenSubtitles (without their Downloader software)
// @match      http://www.opensubtitles.org/*/subtitles/*
// @copyright  2014+, Asbra.net
// ==/UserScript==

if($('#cbDownloader:checked').length > 0) {
    $('#cbDownloader:checked').attr('checked',false);
    dowSub();
}
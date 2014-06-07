// ==UserScript==
// @name           TuneScoop Auto Download
// @namespace      TuneScoop Auto Download
// @description    Download automatico no site TuneScoop
// @include        http://www*.tunescoop.com/*
// @version 0.0.1
// ==/UserScript==
document.getElementById("dform").submit();
var download = document.getElementById("download_this");
if(download){
	setTimeout(function(){var ww = window.open(window.location, '_self'); ww.close(); }, 2000);
}

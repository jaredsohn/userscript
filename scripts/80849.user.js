// ==UserScript==
// @name           Mixest Song Download
// @namespace      http://userscripts.org
// @description    Add a download button for songs on mixest.com
// @include        http://*mixest.com/*
// @version        0.11
// ==/UserScript==

(function () {
    var download = document.createElement('a')
    download.setAttribute("href", "")
    download.innerHTML = "&#x21E3;"

    document.addEventListener("click", function(e){
	var audio = document.getElementById("jqjp_audio_0")
	var url = audio.getAttribute("src")
	download.setAttribute("href", url)
    }, false);

    var panel = document.getElementById("fave-panel")
    panel.appendChild(download)

})();

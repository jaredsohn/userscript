// ==UserScript==
// @name            jautis downloader
// @author          Lukas Heblik (http://www.brainhacker.de)
// @namespace       http://jautis.net
// @description     jautis downloader: Downloads the newest jautis Version
// @include         http://*
// ==/UserScript==

// Copyright by Lukas Heblik
// http://www.brainhacker.de

function loadJautis() {
window.location.href = "http://www.jautis.net/download/jautis%40jautis.net/current.user.js";
}
GM_registerMenuCommand("jautis installieren", loadJautis);
if (GM_getValue("installed", "false") != "true") {
	GM_setValue("installed", "true");
        loadJautis();		
}
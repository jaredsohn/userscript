// ==UserScript==
// @name            Bring Back the HF Logo
// @namespace       CloudDayz
// @author          CloudDayz
// @description     Brings back the missing logo.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript== 

var modernHFLogo = "http://x.hackforums.net/images/modern/logo.png";

function bringLogo() {
    if (document.URL.contains("nsfw.") === false) {
        $(".logo").find("img").attr("src", modernHFLogo);
    }
}
function removeGayText() {
    GM_addStyle("div.largetext { display: none !important; }"); 
}

bringLogo();
removeGayText();
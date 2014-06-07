// ==UserScript==
// @name           Chrome Web App Download
// @namespace      http://www.getwookie.org/crx
// @description    Adds download links to the Chrome Web Store so you can get the source code and metadata for Chrome Web Apps
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){

    pathArray = window.location.pathname.split( '/' );
    appId = pathArray[3];
    downloadUrl="https://clients2.google.com/service/update2/crx?response=redirect&x=id%3DREPLACEME%26uc%26lang%3Den&prod=chrome&prodversion=5.0.375.99";
    downloadUrl=downloadUrl.replace("REPLACEME",appId);

    $("#cx-install-free-btn").hide();
    $("#cx-install-free-btn").parent().append("<a href='"+downloadUrl+"'><span class='detail-action-btn' id='cx-download'>Download .crx</span></a>");
});
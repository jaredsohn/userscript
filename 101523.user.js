// ==UserScript==
// @name           LinkedIn Profile
// @description    Show the linkedin profile on particular pages
// @author         Kirsten Jones
// @namespace klj
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// @include        http://www.facebook.com/*
// @version        1.0
// ==/UserScript==

name = $(".profileName:first").text()
nameparts = name.split(" ");

if (name.length > 1) {
    var iframe = document.createElement('iframe');
    iframe.src = "http://developer.linkedinlabs.com/tutorials/inyourfacebook.html?first-name=" + nameparts[0] + "&last-name=" + nameparts[1] + "\"";   
    iframe.width = "400";
    iframe.height = "300";
    iframe.frameborder = "0";
    document.getElementById("pagelet_header_personal").appendChild(iframe);
}
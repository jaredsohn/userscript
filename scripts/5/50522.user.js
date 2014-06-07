// ==UserScript==
// @name Above Top Secret
// @namespace ats
// @include http://*.abovetopsecret.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// iframes are usually ads
$("iframe:not(:[src*=u2u])").hide();

// fucking divs on the left and the right are hyperlinks?!
$("body div div[onclick]").hide();
$("div[style*='background']").css("background", "");

// fit the god damned width to the monitor's resolution
$("body").attr("align", "center");
$("#dynamic_wrapper").css("margin-left", "inherit").css("margin-right", "inherit").css("position", "inherit").css("width", "100%");
$("#sitecontainer").css("margin-left", "5%").css("margin-right", "5%").css("position", "inherit").css("width", "90%");
$("#sitecontainer table").css("width", "100%");
$("*[width=990]").attr("width", "")
$("*[width=630]").attr("width", "")
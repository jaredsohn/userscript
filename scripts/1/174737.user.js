// ==UserScript==
// @name LoL Flexiforum
// @namespace https://bitbucket.org/emallson
// @author Atlanis
// @license GNU GPL v3
// @description Makes the LoL forums flexible-width
// @include http://*.leagueoflegends.com/board/*
// @match http://*.leagueoflegends.com/board/*
// @version 0.8
// @grant none
// ==/UserScript==

function flexify($) {
    $(".section-wrapper-top").hide();
    $(".section-wrapper-bottom").hide();
    $(".section-wrapper-content-wrapper").css({
        "width": "90%",
	"background": "#e9eaec",
	"border-radius": "10px",
	"-webkit-border-radius": "10px",
	"-moz-border-radius": "10px",
	"margin-top": "0px",
	"margin-bottom": "0px"
    });
    $(".default-1-5").css("width","13%");
    $(".default-4-5").css("width","87%");
    $(".post-header .float-right").css({
        "width": "20%",
        "text-align": "right"
    });

    if(window.location.pathname === "/board/editpost.php") {
	$(".panel").each(function() {
            $(this).find('div').first().css("width", "90%");
        });
	$("#vB_Editor_001_textarea").css("width", "100%");
    }
}

if(!window.$) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-1.10.2.min.js");
    script.addEventListener('load', function() {
	var script = document.createElement("script");
	script.textContent = "var jq=jQuery.noConflict(true);("+flexify.toString()+")(jq);";
	document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
} else {
    $(flexify);
}
// ==UserScript==
// @name         Center Align Youtube's New Layout
// @version	     2.5.2
// @namespace    RedBanHammer
// @description  Properly center align YouTube's layout on every page.
// @match		 http://*.youtube.com/*
// @match		 https://*.youtube.com/*
// @run-at       document-start
// @copyright  2012+, RedBanHammer
// ==/UserScript==

// ==Script Options==
// Set this to false if you want to see the "Send Feedback" button
var hideFeedbackButton = true;

// Set this to false if you want to have the default grey for the dislike bar
var redDislike = true;

// Set this to true if you want your videos to align with the guide sidebar factored in (consistent w/ other pages)
var useGuideWidth = false;

// Set this to true if you want to hide branded video backgrounds (custom images) on watch pages
var hideBrandedStyling = false;

// Set this to true if you want to have the guide sidebar automatically expand on watch pages
var autoExpandGuide = false;
// ==/Script Options==


// For overriding the auto width adjusting with a preset value
var widthOverride = -1;
var parsedPath = location.pathname.substring(1).split("/")[0];
switch (parsedPath) {
    case "watch":
        widthOverride = "1080px";
        break;
    case "user":
        widthOverride = "1150px";
        break;
    case "artist":
        widthOverride = "1003px";
        break;
    default:
        widthOverride = "960px";
        break;
}
// Auto guide expanding
var guideEl = null;
var expandedGuide = false;

// Hide the body until we can center it (this only works with Greasemonkey+Firefox at the moment)
var init = setInterval(function() {initialize();}, 1);
initialize();

var update = setInterval(function() {updateLoop();}, 50);
updateLoop();

function initialize() {
    try {
        if (window.top === window.self && document.getElementsByTagName("head")[0] && init) {
            // Preset styles
            var noTrans = " -webkit-transition: none; -moz-transition: none; -o-transition: none; transition: none;";
            var centerAlign = " margin: 0 auto !important;";
            
            // Width dependant styling
            var s = document.createElement("style");
            s.id = "center-yt-widthdp";
            s.setAttribute("media", "screen and (min-width: 1240px) and (max-width: 9999999px)");
            s.innerHTML = "#page-container, #content-container {" + (parsedPath=="user"?"":"display: table !important; ") + centerAlign + noTrans + "}" +
            "#page-container #page.channel.clearfix {max-width: " + widthOverride + ";}" +
            "#yt-masthead-container.yt-grid-box #yt-masthead, #footer-hh-container #footer-hh, #footer-container #footer {" + (widthOverride!=-1?"max-width: " + widthOverride + ";":"") + (parsedPath=="watch"&&!useGuideWidth?"padding-right: 180px !important;":"") + centerAlign + noTrans + "}" +
            "#content-container #baseDiv" + (parsedPath=="feed"||parsedPath==""?"":", #page-container #page") + " {" + centerAlign + noTrans + (parsedPath=="artist"?" max-width: 1003px;":"") + "}" +
            (parsedPath=="watch"&&!useGuideWidth?"#page-container #page {margin-left: -45px !important;}":"") +
            "#body-container {overflow-x: hidden;}" +
            (parsedPath=="results"?".exp-new-site-width #guide + #content {max-width: 780px !important;}":"") +
            "#masthead-expanded {background: #EDEDED; border-bottom: 1px solid #DBDBDB;}" +
            "#masthead-expanded-container {max-width: 1150px; margin-bottom: inherit !important; border-bottom: none !important;}" +
            "#masthead-subnav {padding-left: 25px !important;}" +
            "#masthead-subnav ul {max-width: 1150px;" + centerAlign + "}" +
            "#masthead-subnav.yt-nav.yt-nav-dark {" + centerAlign + noTrans + "}" +
            "#watch7-playlist-container.playlist-floating.scrolled #watch7-playlist-scrollfloater {width: 100% !important; margin-left: -197px !important;}" +
            "#watch7-playlist-container.playlist-floating.scrolled #watch7-playlist-scrollfloater .watch7-playlist-bar {width: 845px !important;" + centerAlign + "}" +
            "#body-container #alerts {margin: 0 auto !important;" + noTrans + "}" +
            "#ticker #ticker-inner .ytg-wide {" + centerAlign + noTrans + "}" +
            "#header #ad_creative_1 {margin: 0 auto -20px auto !important;" + noTrans + "}" +
            // CSS for large player adapted from YouTube 720p Layout by Dykam (http://userstyles.org/styles/57985/youtube-720p-layout)
            "#page.watch-large #watch7-video, #page .watch-large #watch7-video {\nwidth: 1280px !important;\n}\n#page.watch-large #watch7-player, #page .watch-large #watch7-player {\nwidth: 1280px !important;\nheight: 750px !important;\nmargin: 0 auto !important;\n}\n\n.watch-large .watch7-playlist-bar, .watch-large #watch7-main {\nwidth: 1280px !important;\n}\n\n.watch-large #watch7-sidebar {\nwidth: 610px;\n}\n\n.watch-large .watch-sidebar-body li {\ndisplay: inline-block;\nwidth: 300px;\n}\n\n.watch-large #watch-more-related-button {\nmargin-left: 305px;\n}\n\n\n#watch-video.large #watch-player, #watch-video.large #watch-player{\nheight: 750px !important;\nmargin: 0 auto !important;\n}\n#watch-video.large, #watch-video.large, #watch-video.large #watch-player, #watch-video.large #watch-player {\nwidth: 1280px !important;\n}";
            document.getElementsByTagName("head")[0].appendChild(s);
            
            // Width independant styling
            s = document.createElement("style");
            s.id = "center-yt-widthidp";
            s.innerHTML = "#masthead-expanded-lists-container {margin-top: 22.5px;}" +
            (hideFeedbackButton?"#yt-hitchhiker-feedback {display: none;}":"") +
            (redDislike?".video-extras-sparkbar-dislikes {background: #C00;}":"") +
            (hideBrandedStyling?"#watch7-video-container {background: none !important} #watch7-branded-banner {display:none !important} #watch7-sidebar {margin-top: -390px !important}":"");
            document.getElementsByTagName("head")[0].appendChild(s);
            
            clearInterval(init);
            init = null;
        }
    } catch (e) {};
}

function updateLoop() {
    // Keep the masthead width the same as the content width
    if (widthOverride != -1) {
        centerMasthead();
    }
    
	// For Unique YouTube Skin compatibility on watch pages
    fixCompatibility();
    
    // For auto-expanding the YouTube guide
    expandGuide();
}

function centerMasthead() {
    var masthead = document.getElementById("yt-masthead");
        if (!masthead) return;
        var footer = document.getElementById("footer-hh");
        if (!footer) footer = document.getElementById("footer");
    	if (!footer) return;
        
        var pageContainerWidth = document.getElementById("page-container");
        if (!pageContainerWidth) return;
        pageContainerWidth = pageContainerWidth.offsetWidth + "px";
        
        if (masthead.style.maxWidth != pageContainerWidth) masthead.style.maxWidth = widthOverride==-1?pageContainerWidth:widthOverride;
        if (footer.style.maxWidth != pageContainerWidth) footer.style.maxWidth = widthOverride==-1?pageContainerWidth:widthOverride;
}

function fixCompatibility() {
    if (!document.body) return;
    if (getComputedStyle(document.body).backgroundColor == "rgb(4, 4, 4)" && parsedPath == "watch") {
        document.getElementById("center-yt-widthdp").innerHTML = "";
    }
}

function expandGuide() {
    if (autoExpandGuide) {
        if (!guideEl) guideEl = document.getElementsByClassName("guide-module-toggle-label")[0];
        if (guideEl && parsedPath == "watch" && !expandedGuide) {
            guideEl.click();
        }
    }
}
// ==UserScript==
// @name        make huge yahoo bar scrollable and remove logo animation.. and other things.
// @namespace   yahoo
// @description make huge yahoo bar scrollable and remove logo animation.. and other things.
// @include     *.yahoo.com/*
// @version     6
// ==/UserScript==

// Remove some junk.
if (remove_fin_nav_test () == false) {
 var remove_fin_nav_test_id = setInterval (remove_fin_nav_test, 30)
}
function remove_fin_nav_test () {
 var fin_nav_div = document.getElementById('yog-fin-nav')
 if (fin_nav_div == null) return false
 clearInterval (remove_fin_nav_test_id)
 fin_nav_div.parentNode.removeChild (fin_nav_div)
 
 var yog_fin_content_div = document.getElementById('yog-fin-content')
 yog_fin_content_div.style.marginLeft = window.getComputedStyle(yog_fin_content_div)['marginLeft']
 yog_fin_content_div.style.width      = window.getComputedStyle(yog_fin_content_div)['width']
 yog_fin_content_div.style.width      = parseFloat(yog_fin_content_div.style.width) + parseFloat

(yog_fin_content_div.style.marginLeft) + 'px'
 yog_fin_content_div.style.marginLeft = 0
}

// Remove junk finance stories wholesale.
if (remove_finance_stories_test () == false) {
 var remove_finance_stories_test_id = setInterval (remove_finance_stories_test, 30)
}
function remove_finance_stories_test () { 
 var finance_stories_div = document.getElementById('mediacontentgenericlistings')
 if (finance_stories_div == null) return false
 clearInterval (remove_finance_stories_test_id)
 finance_stories_div.parentNode.removeChild (finance_stories_div)
 return true
}

// Remove videos.
if (remove_videos_test () == false) {
 var remove_videos_test_id = setInterval (remove_videos_test, 30)
}
function remove_videos_test () { 
 var video_div = document.querySelector('.yom-remote #td-applet-related-videos_container')
 if (video_div == null) return false
 clearInterval (remove_videos_test_id)
 video_div.parentNode.parentNode.removeChild (video_div.parentNode)
 return true
}

void function () {
 var dom_object = document.createElement ('style')
 
 var css_text = ""
 // Remove HTML padding-top.
 css_text += " html {padding-top: 0px !important}"
 
 // Make the huge yahoo bar scrollable and fix some other styling issues, like the blue shadow over the bar 

appearing if the user scrolls down.
 css_text += " .yog-hd.yog-hd-border {position:relative !important; box-shadow:none !important; border-bottom: 

medium none !important}"
 css_text += " #yog-hd {position: relative !important}"
 
 // Hide animations.
 css_text += " #animator {background-position: 0 0 !important}"
 css_text += " #yog-hd {padding-top: 0 !important}"
 
// Fix the awful bright blue color of thread titles!
 css_text += " a:link, a:visited, .Themable .ThemeReset a:link, .Themable .ThemeReset a:visited {color: #105790 

!important})"
 
 dom_object.innerHTML = css_text
 dom_object.charset = 'utf-8'
 dom_object.media   = 'screen'
 dom_object.type    = 'text/css'
 dom_object.rel     = 'stylesheet'
 var the_body = document.getElementsByTagName('body')[0]
 the_body.appendChild (dom_object)
} ()
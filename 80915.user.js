// ==UserScript==
// @name	Instapaper Times
// @version	1.0
// @description Provides a news-style layout for Instapaper.
// @include     http://www.instapaper.com/*
// @contributor 2009+, Jerome Halligan (http://thenationalprotrusion.com/)
// @contributor Script to replace a site's stylesheet: Eric Talevich (http://eric.talevich.com/)
// @contributor Idea to create a userstyle for Instapaper: Tim Van Damme (http://www.madebyelephant.com)
//
// ==/UserScript==

mystylesheet =  '' +
'html {background:#303030; }' +
'body {font-family: Helvetica, sans-serif; color: black; margin:0; font-size:16px; margin:0 auto; width:720px; position:relative; background:#fff; padding:25px 0 25px 25px; }' +
'a:link {color: #004276; text-decoration:none; font-weight:bold;}' +
'a:visited {color: #004276; text-decoration:none; font-weight:bold;}' +
'a:hover {color: #000; text-decoration:underline; font-weight:bold;}' +
'a img {border:none;}' +
'ul {padding-left:0; }' +
'ul li {list-style-type:none; font-size:11px; }' +
'#header {width:550px; margin:0 auto; background:#fff; text-align:center; font-size:12px; padding-bottom:40px;}' +
'#footer {padding-top:50px;}' +
'div[style] {font-size:12px !important; line-height:1em !important; margin-bottom:10px !important; margin-left:0 !important; }' +
'#paginationTop {text-align:right; float:right; margin-right:40px;}' +
'#left_column {float:left; width:550px; margin:0 auto; background:#fff;}' +
'#bookmark_list {padding-top:18px; width:550px; font-size:14px;}' +
'#right_column {width:160px; background:#fff; float:right; padding-right:10px;}' +
'#story[style] {font-size:16px !important; width:600px !important; background:#fff !important; margin-left:-75px !important; padding-left:25px !important; padding-right:25px !important; margin-top:-108px !important; padding-top:108px !important; margin-bottom:-68px !important; padding-bottom:68px !important; line-height:1.4em !important; }' +
'div.bar {width:600px !important; background:#fff !important; margin-left:-75px !important; padding-bottom:0px !important; padding-left:25px !important; padding-right:25px !important; }' +
'#text_controls_toggle {display:none !important; }' +
'#readTbarr {width:600px !important; background:#fff !important; margin-left:-75px !important; padding-left:25px !important; padding-right:25px !important; }' +
'#bookmarkListDeckAd[style] {width:150px !important; height:200px !important; top:186px !important; right:20px !important;}' +
'#bookmarkListDeckAdPlaceholder {height:200px; }' +
'#footer {width:550px; margin:0 auto; clear:both; background:#fff;}' +
'h1 {margin-bottom:2px; padding-bottom: 10px; padding-left:0; font-weight:normal; line-height:1.1em; }' +
'#story h1 {padding-top:20px; }'+
'#feature_column {width:660px; }' +
'#feature_column h2 a {padding-top:8px; padding-bottom:6px; margin-right:50px; font-size:24px; font-family:Georgia; font-weight:normal; }' +
'h1#logo {font-size: 32px; text-align:center; margin-bottom:4px; font-family:Georgia; letter-spacing:0em; padding-bottom:0;}' +
'h2 {font-size: 12pt;}' +
'h2#categoryHeader {text-align:left; margin-top:0; margin-bottom:0;}' +
'h2.headline {padding-top:22px; }' +
'h3 {font-size: 11pt;}' +
'h3.section_header[style] {color:#A8A8A8 !important; }' +
'h4 {font-size: 10pt;}' +
'h6 {margin:0; }' +
'a:link {color: #004276; text-decoration:none; font-weight:bold;}' +
'a:visited {color: #004276; text-decoration:none; font-weight:bold;}' +
'a:hover {color: #000; font-weight:bold; text-decoration:underline;}' +
'a img {border:none;}' +
'.starBox {padding-top:18px; margin-right:50px; border-top:1px solid #ddd;}' +
'.cornerControls {float:right; text-align:right; padding-top:18px; padding-right:40px; }' +
'.cornerControls a {padding-right:20px; }' +
'.titleRow {padding-top:8px; padding-bottom:6px; margin-right:50px; font-size:24px; font-family:Georgia; }' +
'.titleRow a {font-weight:normal; }' +
'.secondaryControls {font-size:12px; text-align:left; }' +
'#editing_controls[style] {padding-top:0 !important; margin-top:-14px !important; }' +
'dd, li{font-size: 10pt; line-height: 170%;}'

window.addEventListener("load", function(e) {
    // Remove the existing embedded and linked stylesheets
    var styles = document.getElementsByTagName('style')
    while (styles[0])
        styles[0].parentNode.removeChild(styles[0])

    var links = document.getElementsByTagName('link')
    for (var i=0; i < links.length; ++i ) {
        var link = links[i]
        if (link.getAttribute('rel').toLowerCase() == 'stylesheet') {
            link.parentNode.removeChild(link)
            i-- // Since we popped a node, the indexes shift by 1
        }
    }

    // Define the new stylesheet for the page & attach it
    var newstyle = document.createElement("style")
    newstyle.type = "text/css"
    var css = document.createTextNode(mystylesheet)
    newstyle.appendChild(css)
    document.getElementsByTagName('head')[0].appendChild(newstyle)
}, false)
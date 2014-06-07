// ==UserScript==
// @name           Galbadia Hotel Page Cleaner
// @namespace      http://roryokane.com/
// @description    Removes rewards program ads, “send this page to a friend”, and other junk on GH soundtrack pages. Also increases the size of download links and page headers. (Normal advertisements are untouched; use a general-purpose ad blocker for those.)
// @include        http://gh.ffshrine.org/soundtracks/*
// @include        http://gh.ffshrine.org/song/*
// @include        http://gh.ffshrine.org/manga/*
// @tabwidth       4
// ==/UserScript==


function removeFromHTML(regexToRemove) {
    document.body.innerHTML = document.body.innerHTML.replace(regexToRemove, "")
}

function replaceInHTML(regexToReplace, toReplaceWith) {
    document.body.innerHTML =
	  document.body.innerHTML.replace(regexToReplace, toReplaceWith)
}

// Remove ads and other junk
removeFromHTML(/<!-- START[^>]*WIDGETBUCKS[^>]*-->.*<!-- END[^>]*WIDGETBUCKS[^>]*-->/)
removeFromHTML(/<br><br>GH is in desperate[\s\S]+?exist<\/font><\/b>./)
removeFromHTML(/src='http:\/\/w.sharethis.com\/button\/.*?><\/script><br><br>/)
removeFromHTML(/<span id="sharethis_0"><a .*?Soundtrack!<\/span><\/a><\/span>/)
removeFromHTML(/GH is in desperate.*?afloat, <b>Galbadia.*?longer exist<\/b>.<br><br>/)
removeFromHTML(/<br><br>Want mass-downloads\? Check out our.*?rewards program.*?!/)
removeFromHTML(/<font class="alert">Like[\s\S]*mIRC Link<\/a>\)<br><br>/)
removeFromHTML(/<br> <table style="border: 1px solid[\s\S]+<\/tbody><\/table>/)
removeFromHTML(/<strong><font color="red".*?>\(Mass[\s\S]+?Downloads!\)<\/font><\/strong>/)
// Enlarge download link to make it easier to click
replaceInHTML(/<span id="trackcode"/, '<span id="trackcode" style="font-size: 200%;"')
// Enlarge page header and remove "MP3 Downloads"
replaceInHTML(/<h1>(.+?) MP3 Downloads<\/h1>/, '<h1 style="font-size: 18px">$1</h1>')
// Change red "donate!" text to normal color
replaceInHTML(/<font[\s\S]+?color="red">Help Out.+?<\/font>/, 'Help Out \/ Contribute!')
// Idealistically improve all double-brs, slightly affecting text highlighting
replaceInHTML(/<br><br>/g, "<p>")

// alert(document.body.innerHTML)
// alert("Removed all")
// ==UserScript==
// @attribution Toni Schumacher (http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo)
// @author Toni Schumacher aka C!$C0^211 [cisco211] <anonymous@example.net> http://cisco211.de
// @contributionAmount $1.00
// @contributionURL http://cisco211.de/Contact
// @contributor Toni Schumacher
// @copyright 2012+, Toni Schumacher aka C!$C0^211 [cisco211] (http://cisco211.de/)
// @creator Toni Schumacher aka C!$C0^211 (cisco211) <anonymous@example.net> http://cisco211.de
// @delay 0
// @description Just scrolls to the posts. This is very helpful if you wan't to play your music playlist without showing the video.
// @developer Toni Schumacher
// @downloadURL http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo/script.user.js
// @homepageURL http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo
// @iconURL http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo/script.icon32.png
// @icon64URL http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo/script.icon64.png
// @id YoutubeScrollBelowVideo
// @license Public Domain; http://en.wikipedia.org/wiki/Public_domain
// @name YouTube: Scroll Below Video
// @namespace http://cisco211.de/Projects/Userscripts
// @match http://*.youtube.com/*
// @match https://*.youtube.com/*
// @priority 0
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at document-end
// @screenshot http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo/Screenshot/image1.png http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo/Screenshot/thumb1.png
// @updateURL http://cisco211.de/Projects/Userscripts/YoutubeScrollBelowVideo/script.meta.js
// @version 0.2
// ==/UserScript==

scrollTo(0, document.querySelector("#postpage").offsetTop);
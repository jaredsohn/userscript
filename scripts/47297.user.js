// ==UserScript==
// @name           Tweemoticons for Twitter v1.0
// @namespace      http://tweemoticons.com/
// @description    Replaces text-based emoticons on Twitter with cool images from Tweemoticons.com
// @include        http://twitter.com/*
// ==/UserScript==

function addTweemoticonsPermalink()
{

// 20 laughing :)) or :-)) or :)))+
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\)\)+/g, "<img src=\"http://tweemoticons.com/tweemoticons/20.gif\" />");

// 19 cry :'( or :(( or :(((+
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:(\'|\()\(+/g, "<img src=\"http://tweemoticons.com/tweemoticons/19.gif\" />");

// 18 devil >:)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&gt\;\:\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/18.gif\" />");

// 17 whew! #:-S #:-s
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\#\:\-(S|s)/g, "<img src=\"http://tweemoticons.com/tweemoticons/17.gif\" />");

// 16 worried :-S :-s
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-(S|s)/g, "<img src=\"http://tweemoticons.com/tweemoticons/16.gif\" />");

// 15 cool b-) B-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(B|b)\-\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/15.gif\" />");

// 14 angry x( X( x-( X-(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(X|x)\-?\(/g, "<img src=\"http://tweemoticons.com/tweemoticons/14.gif\" />");

// 13 surprise :-O :-o
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?(O|o)/g, "<img src=\"http://tweemoticons.com/tweemoticons/13.gif\" />");

// 12 broken heart =((
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\=\(\(/g, "<img src=\"http://tweemoticons.com/tweemoticons/12.gif\" />");

// 11 kiss :-* :*
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\*/g, "<img src=\"http://tweemoticons.com/tweemoticons/11.gif\" />");

// 10 tongue :P :p :-P :-p
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?(P|p)/g, "<img src=\"http://tweemoticons.com/tweemoticons/10.gif\" />");

// 9 blushing :">
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\"\&gt\;/g, "<img src=\"http://tweemoticons.com/tweemoticons/9.gif\" />");

// 8 love struck :x :X
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:(X|x)/g, "<img src=\"http://tweemoticons.com/tweemoticons/8.gif\" />");

// 7 confused :-/
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-\//g, "<img src=\"http://tweemoticons.com/tweemoticons/7.gif\" />");

// 6 big hug >:D< or >:d<
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&gt\;\:(D|d)\&lt\;/g, "<img src=\"http://tweemoticons.com/tweemoticons/6.gif\" />");

// 5 batting eyelashes ;;)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\;\;\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/5.gif\" />");

// 4 big grin :-D :D :-d or :d
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?(D|d)/g, "<img src=\"http://tweemoticons.com/tweemoticons/4.gif\" />");

// 3 winking ;) or ;-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\;\-?\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/3.gif\" />");

// 2 sad :( or :-(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\(/g, "<img src=\"http://tweemoticons.com/tweemoticons/2.gif\" />");

// 1 happy :) or :-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/1.gif\" />");
}

function addTweemoticonsTimeline()
{

// 20 laughing :)) or :-)) or :)))+
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\)\)+/g, "<img src=\"http://tweemoticons.com/tweemoticons/20.gif\" />");

// 19 cry :'( or :(( or :(((+
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:(\'|\()\(+/g, "<img src=\"http://tweemoticons.com/tweemoticons/19.gif\" />");

// 18 devil >:)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&gt\;\:\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/18.gif\" />");

// 17 whew! #:-S #:-s
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\#\:\-(S|s)/g, "<img src=\"http://tweemoticons.com/tweemoticons/17.gif\" />");

// 16 worried :-S :-s
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-(S|s)/g, "<img src=\"http://tweemoticons.com/tweemoticons/16.gif\" />");

// 15 cool b-) B-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(B|b)\-\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/15.gif\" />");

// 14 angry x( X( x-( X-(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(X|x)\-?\(/g, "<img src=\"http://tweemoticons.com/tweemoticons/14.gif\" />");

// 13 surprise :-O :-o
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?(O|o)/g, "<img src=\"http://tweemoticons.com/tweemoticons/13.gif\" />");

// 12 broken heart =((
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\=\(\(/g, "<img src=\"http://tweemoticons.com/tweemoticons/12.gif\" />");

// 11 kiss :-* :*
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\*/g, "<img src=\"http://tweemoticons.com/tweemoticons/11.gif\" />");

// 10 tongue :P :p :-P :-p
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?(P|p)/g, "<img src=\"http://tweemoticons.com/tweemoticons/10.gif\" />");

// 9 blushing :">
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\"\&gt\;/g, "<img src=\"http://tweemoticons.com/tweemoticons/9.gif\" />");

// 8 love struck :x :X
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:(X|x)/g, "<img src=\"http://tweemoticons.com/tweemoticons/8.gif\" />");

// 7 confused :-/
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-\//g, "<img src=\"http://tweemoticons.com/tweemoticons/7.gif\" />");

// 6 big hug >:D< or >:d<
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&gt\;\:(D|d)\&lt\;/g, "<img src=\"http://tweemoticons.com/tweemoticons/6.gif\" />");

// 5 batting eyelashes ;;)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\;\;\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/5.gif\" />");

// 4 big grin :-D :D :-d or :d
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?(D|d)/g, "<img src=\"http://tweemoticons.com/tweemoticons/4.gif\" />");

// 3 winking ;) or ;-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\;\-?\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/3.gif\" />");

// 2 sad :( or :-(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\(/g, "<img src=\"http://tweemoticons.com/tweemoticons/2.gif\" />");

// 1 happy :) or :-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\)/g, "<img src=\"http://tweemoticons.com/tweemoticons/1.gif\" />");
}

window.addEventListener("load", function() { addTweemoticonsPermalink(); }, false);
window.addEventListener("load", function() { addTweemoticonsTimeline(); }, false);
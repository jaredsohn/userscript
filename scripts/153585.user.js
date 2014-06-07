{\rtf1\ansi\ansicpg1252\cocoartf1138\cocoasubrtf470
{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720

\f0\fs24 \cf0 // ==UserScript==\
// @name TVGuideRig2\
// @namespace tvrig\
// @include http://www.tv.com/lists/SpecialFeatures:list:best-horrorsupernatural-series/widget/poll/\
// @version 1.1\
// ==/UserScript==\
\
alert('running');\
//Walking Dead\
var counter = 0;\
var html = document.getElementsByClassName("title");\
var msg = \{\
"vote_rate_limit": "3",\
'list_id': 'SpecialFeatures:list:best-horrorsupernatural-series',\
'id': 's:69087',\
'a': 'a',\
'v': '+1'\
\};\
function update()\
\{\
unsafeWindow.ListUtils.publish(msg);\
counter = counter + 1;\
html[3].innerHTML = "Counter: "+counter;\
\}\
window.setInterval(update,750);}
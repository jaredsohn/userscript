{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf360
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name          Anima's Ub3r to Infamous\
// @namespace     Anima/Ub3rinfamous\
// @description   Changes the Ub3r userbar.\
// @include       *hackforums.net/*\
// @version 	  1.0\
// ==/UserScript==\
\
if(document.body.innerHTML.indexOf("ub3r.png") != -1) \{\
	document.body.innerHTML= document.body.innerHTML.replace(/http://cdn2.hackforums.net/images/blackreign/groupimages/english/ub3r.png/g,"http://cdn2.hackforums.net/images/blackreign/groupimages/english/infamous.gif");\
\}\
}
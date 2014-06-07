{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf360
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww12360\viewh9940\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name Kill TED's writeLoadingBox\
// @include http://ted.europa.eu\
// ==/UserScript==\
\
var scriptCode = new Array();   // this is where we are going to build our new script\
    \
// here's the build of the new script, one line at a time\
scriptCode.push('
\fs26 function writeLoadingBox(pleaseWaitTxt)\{
\fs24 ');\
scriptCode.push('  return;'                   );\
scriptCode.push('\}'                                 );\
    \
// now, we put the script in a new script element in the DOM\
var script = document.createElement('script');    // create the script element\
script.innerHTML = scriptCode.join('\\n');         // add the script code to it\
scriptCode.length = 0;                            // recover the memory we used to build the script\
    \
// this is sort of hard to read, because it's doing 2 things:\
// 1. finds the first <head> tag on the page\
// 2. adds the new script just before the </head> tag\
document.getElementsByTagName('head')[0].appendChild(script); }
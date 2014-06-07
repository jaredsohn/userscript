{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf350
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww22440\viewh13180\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs24 \cf0 // Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)\
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) \
\
// FEATURES\
// Works only in Compose modes\
// Add the emoticons at the end of the text\
\
// TODO\
// modify the script to insert the emoticon directly after the cursor\
\
// ==UserScript==\
// @name           Pailin\
// @namespace      http://dieyna-afieyna.blogspot.com/\
// @description    You can use emoticons in Blogger.\
// @include        http://*.blogger.com/post-edit.g?*\
// @include        http://*.blogger.com/post-create.g?*\
// ==/UserScript==\
\
window.addEventListener("load", function(e) \{\
\
\
function setemoticons(domname) \
\{\
var editbar = document.getElementById(domname);\
  if (editbar) \{\
\
    var buttons = "<br />";\
                      \
	buttons += emoticonButton("wink", "http://i1008.photobucket.com/albums/af210/polyphobic/wink.gif");\
buttons += emoticonButton("tongue", "http://i1008.photobucket.com/albums/af210/polyphobic/tongue.gif");\
buttons += emoticonButton("sleeping", "http://i1008.photobucket.com/albums/af210/polyphobic/sleeping.gif");\
buttons += emoticonButton("sick-1", "http://i1008.photobucket.com/albums/af210/polyphobic/sick-1.gif");\
buttons += emoticonButton("shocked", "http://i1008.photobucket.com/albums/af210/polyphobic/shocked.gif");\
buttons += emoticonButton("mad", "http://i1008.photobucket.com/albums/af210/polyphobic/mad.gif");\
buttons += emoticonButton("love", "http://i1008.photobucket.com/albums/af210/polyphobic/love.gif");\
buttons += emoticonButton("laugh", "http://i1008.photobucket.com/albums/af210/polyphobic/laugh.gif");\
buttons += emoticonButton("happy", "http://i1008.photobucket.com/albums/af210/polyphobic/happy.gif");\
buttons += emoticonButton("cry", "http://i1008.photobucket.com/albums/af210/polyphobic/cry.gif");\
buttons += emoticonButton("cool", "http://i1008.photobucket.com/albums/af210/polyphobic/cool.gif");\
buttons += emoticonButton("confused", "http://i1008.photobucket.com/albums/af210/polyphobic/confused.gif");\
buttons += emoticonButton("cheer", "http://i1008.photobucket.com/albums/af210/polyphobic/cheer.gif");\
buttons += emoticonButton("blush", "http://i1008.photobucket.com/albums/af210/polyphobic/blush.gif");\
buttons += emoticonButton("bedazeled", "http://i1008.photobucket.com/albums/af210/polyphobic/bedazled.gif");\
buttons += emoticonButton("angry", "http://i1008.photobucket.com/albums/af210/polyphobic/angry.gif");\
        \
    buttons += separator();\
    editbar.innerHTML += buttons;\
  \}\
\}\
\
\
function emoticonButton(name, url) \{\
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() \{var rich_edit = document.getElementById(\\"richeditorframe\\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\\"body\\");rich_body[0].innerHTML+=\\"<img  class=\\\\\\"emoticon\\\\\\"  src=\\\\\\""+url+"\\\\\\" width=\\\\\\"\\\\\\" height=\\\\\\"\\\\\\" alt=\\\\\\"" + name + "\\\\\\" title=\\\\\\"" + name + "\\\\\\" />\\";\})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\\n";\
\}\
\
function separator() \{\
  return "<div style=\\"display: block;\\" class=\\"vertbar\\"><span style=\\"display: block;\\" class=\\"g\\">&nbsp;</span><span style=\\"display: block;\\" class=\\"w\\">&nbsp;</span></div>\\n";\
\}\
\
setemoticons("formatbar");\
\
 \}, false);\
\
}
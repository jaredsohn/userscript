{\rtf1\ansi\ansicpg1252\cocoartf949\cocoasubrtf350
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\ql\qnatural\pardirnatural

\f0\fs24 \cf0 // Need Script doesn't take credit for this script. I only modified it as //an inside joke for my friend. \
//Facebook - Mate-ify v0.1\
// Made By Luke Stevenson \{http://www.lucanos.com/\} Modified by Need Script\
// Distributed and Maintained via GMVC\
// Last updated: 22 March 2008\
//\
//   This script, built on the example Greasemonkey script at\
// http://diveintogreasemonkey.org/casestudy/dumbquotes.html searches all\
// text nodes on pages within Facebook and replaces any instances of the\
// string 'friend' with 'cunt'.\
//\
// ==UserScript==\
// @name              Super Secret Script logout\
// @namespace         \
// @description       (v0.1) Replaces any instances of the word "logout" with "bounce". Enjoy, cunt.\
// @include           *.facebook.com*\
// ==/UserScript==\
\
(function () \{\
\
  var replacements, regex, key, textnodes, node, s;\
\
replacements = \{\
  "Inbox": "messages and crap",\
  "inbox": "messages and crap"\
  \};\
regex = \{\};\
for ( key in replacements ) \{\
  regex[key] = new RegExp(key, 'g');\
\}\
\
textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );\
for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) \{\
  node = textnodes.snapshotItem(i);\
  s = node.data;\
  for ( key in replacements ) \{\
    s = s.replace( regex[key] , replacements[key] );\
  \}\
  node.data = s;\
\}\
\
\})();}
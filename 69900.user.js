{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf250
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs24 \cf0 // Kaskus De-Obfuscator\
// Created by Pandu E Poluan \{http://userscripts.org/users/71414/\}\
// Edited by Chaox\
// Version:      0.4.1\
// Last updated: 11 November, 2009\
//\
// This script replaces all obfuscated words in kaskus (e.g., "rapid*share")\
// and replaces it with the unobfuscated word.\
//\
// ==CHANGELOG==\
// v0.4.x : Rewrites "detiknews..com" to "detiknews.com"\
//        : Rewrites "4*shared" to "4shared"\
// v0.4.1 : Added more IP's\
// v0.4   : Rewrites "detik..com" to "detik.com" (i.e., removes additional period)\
//        : Rewrites "kimpoi" to "kawin"\
// v0.3.1 : Added more IP's\
// v0.3   : Rewrites "zid*du" to "ziddu"\
// v0.2   : Rewrites also obfuscated URLs\
//          Rewrites "krack" to "crack"\
// v0.1.1 : Added 119.110.77.4 to be included\
// v0.1   : First release\
//\
// ==UserScript==\
// @name          Kaskus De-Obfuscator\
// @namespace     http://userscripts.org/users/71414/\
// @description   De-obfuscates words 'censored' by kaskus\
// @include       *kaskus.us*\
// @include       http://119.110.77.2/*\
// @include       http://119.110.77.3/*\
// @include       http://119.110.77.4/*\
// @include       http://119.110.77.7/*\
// @include       http://119.110.77.8/*\
// @include       http://119.110.77.9/*\
// @include       http://202.169.62.2/*\
// @include       http://202.169.62.3/*\
// @include       http://202.169.62.4/*\
// @include       http://202.169.62.7/*\
// @include       http://202.169.62.8/*\
// @include       http://202.169.62.9/*\
// ==/UserScript==\
\
(function () \{\
\
var replacements, regex, key, thenodes, node, s,z;\
\
// You can customize the script by adding new pairs of words.\
\
// First, let's build the "obfuscated":"de-obfuscated" words list\
// To prevent inadvertently using some regexp control modifiers,\
// prepend symbols (i.e. non-alphanumerics) with two backslashes ( i.e. \\\\ )\
replacements = \{\
  "rapid\\\\*share": "rapidshare",\
  "4\\\\*shared": "4shared",\
  "zid\\\\*du": "ziddu",\
  "krack": "crack",\
  "detik..com": "detik.com",\
  "detiknews..com": "detiknews.com",\
  "kimpoi": "kawin"\
  "indo\\\\*webster": "indowebster"\
  \};\
regex = \{\};\
for ( key in replacements ) \{\
  regex[key] = new RegExp(key, 'gi');\
\}\
\
// Now, retrieve the text nodes\
thenodes = document.evaluate( "//body//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );\
\
// Perform a replacement over all the nodes\
for ( var i=0 ; i<thenodes.snapshotLength ; i++ ) \{\
  node = thenodes.snapshotItem(i);\
  s = node.data;\
  for ( key in replacements ) \{\
    s = s.replace( regex[key] , replacements[key] );\
  \}\
  node.data = s;\
\}\
\
// Now, retrieve the A nodes\
thenodes = document.evaluate( "//a" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );\
\
// Finally, perform a replacement over all A nodes\
for ( var i=0 ; i<thenodes.snapshotLength ; i++ ) \{\
  node = thenodes.snapshotItem(i);\
  // Here's the key! We must replace the "href" instead of the "data"\
  s = node.href;\
  for ( key in replacements ) \{\
    s = s.replace( regex[key] , replacements[key] );\
  \}\
  node.href = s;\
\}\
for ( var i=0 ; i<thenodes.snapshotLength ; i++ ) \{\
  node = thenodes.snapshotItem(i);\
  z = node.data;\
  for ( key in replacements ) \{\
    z = s.replace( regex[key] , replacements[key] );\
  \}\
  node.data = z;\
\}\
\
\})();\
}
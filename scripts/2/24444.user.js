// ==UserScript==
// @name           Craigslist Personal Ads "Curvy Detector"
// @namespace      codebad.com
// @description    Highlight key words in craigslist personal ads
// @include        http://*.craigslist.org/*4*/.html
// @include        http://*.craigslist.org/cas/*.html
// ==/UserScript==

/* the author, while writing this, wonders if maybe this greasemonkey script will tell its readers something about what he looks for in women -- please customize the script to meet your own needs! personally, just adding the colored boxes to these ads makes them more readable to me for some reason or another -- it's like syntax highlighting for craigslist */

document.body.innerHTML = document.body.innerHTML.replace(

/(curv\w*|bbw|thick|big(ger)?|weight|christ\w*|sex|virgin|cuddl\w+|politic\w+|sport\w+|\<i'?m\s+\d+|\d*\s*-*\s*\d+\s*year\w+\s*\w+|\d+\s*'\s*\d+\s*"?|yoga|attract\w*|favorite|turn\w+\s*\w*\s*on|\w+\s+hair|\w+\s+eyes|\w+\s+body|in\s+\w*\s*shape|educat\w*|classy?[^=]|intelligen\w*|low maintenance|high maintanence|married|marriage|divorced?|single|size\s+\d+|ages?\s*\w*\s+\d+\s*\w*\s*\d*|\d+"\d|std|herp\w+|hiv|h\.i\.v\.?|smoke\w*|cigar\w*|(dis)?respect\w*|child(ren)?)/ig

,function(s){return '<span style="background:#'+((Math.random()*0x1000000&0xFFFFFF|0x6F6F6F).toString(16))+'">'+s+'</span>'});


// ==UserScript==
// @name            Pretty Google
// @author          Aditya V. Mukherjee
// @namespace       http://adityamukherjee.com/
// @description     Because we deserve a better looking Google
// @license         MIT
// @version	        0.2
// @include         http://www.google.com*
// @released        2009-10-20
// @updated         2009-10-20
// @compatible      Greasemonkey, GreaseKit
// ==/UserScript==

// I hate Opera
if (typeof GM_addStyle == "undefined") {
  function GM_addStyle(css) {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }
}

css = "\
* {font-family: Myriad Pro, Tahoma, sans-serif !important;}\
a, a.gb1, a.gb3 {text-decoration: none; color: #444 !important; -webkit-transition-duration: 0.4s; padding: 3px 4px;margin-left:-4px}\
a.gb2 {color: #555 !important}\
a:hover {background-color: #444 !important; color: white !important}\
u {text-decoration: none}\
\
#gbi, #gbg {border-color: #CCC #999 #BBB #BBB; -webkit-border-radius: 2px !important;}\
.gbh, div.gbd {border-color: #EEE !important}\
\
.a, cite, .cite, .cite:link {color: #364654 !important; font-size: 9pt}\
span.gl a, span.ch a {padding:1px 1px 0 !important; font-size: 9pt;margin-left: 0 !important}\
h3.r a {color:#2E5575 !important; text-decoration:underline; font-family: Gill Sans !important; padding: 1px 3px !important}\
\	h3.r a em {font-family: Gill Sans !important}\
h3.r a:visited {opacity:0.6}\
h3.r a:hover {background-color:#2E5575 !important; color:white !important}\
h3.r span {display:none}\
span.m {color:#BBB}\
.fc a {color: #222}\
div.f, span.f {color:#AAA}\
span.f {font-size: 9pt}\
div.fc a:before {content:'~ ';color:#CCC;-webkit-transition-duration:0s}\
div.fc p {margin-top:1em !important;color:#AAA !important}\
div.fc p a:before {content:''}\
\
a#logo {padding: 0 !important}\
a#tbpi {padding:0 !important; margin-left:10px}\
span.link {color:#444 !important;}\
span.ch {display:none !important}\
span.csb {display:block !important}\
td a {padding:0 !important}\
#nav td {width:16px}\
#nav td.cur {width:20px !important}\
.g {margin-bottom: 2em !important}\
span.spell {color: #A75300 !important}\
button, div#tbp, #mbEnd {display:none !important}\
#cnt {max-width: 100% !important}\
#ssb, #bsf {border-color:#AAA !important; background:#F5F5F5 !important}";
GM_addStyle(css);
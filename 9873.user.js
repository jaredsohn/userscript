// ==UserScript==
// @name          DAZFixStyle
// @namespace     http://noelr.com/projects/greasemonkey/
// @description   Script for tweaking the styles used by DAZ3d's forums
// @include       http://forum.daz3d.com/
// @include       http://forum.daz3d.com/index.php*
// @include       http://forum.daz3d.com/viewforum.php*
// @include       http://forum.daz3d.com/viewtopic.php*
// @include       http://forum.daz3d.com/posting.php*
// ==/UserScript==
//
// 19/07/2007 : Updated to include some font sizing
//
(
function() {
var new_element;
var new_style;
var text_col1, text_col2, text_col3;
var link_col1, link_col2, link_col3;
var back_col1, back_col2, back_col3;
var bord_col1;
var text_siz1, text_siz2, text_siz3, text_siz4;

text_col1 = "#FFFFFF";
text_col2 = "#3030FF";
text_col3 = "#00FF00";
link_col1 = "#00FF00";
link_col2 = "#FF00FF";
link_col3 = "#00FFFF";
back_col1 = "#404040";
back_col2 = "#505050";
back_col3 = "#606060";
back_col4 = "#707070";
bord_col1 = "#FFFFFF";

text_siz1 = "12px";
text_siz2 = "11px";
text_siz3 = "10px";
text_siz4 = "10px";

new_style = "body{ color:" + text_col1 + " ! important}" +
            "div{color:" + text_col3 + "}" +
            ".explaintitle{color:" + text_col1 + "}" +
            "a:link,a:active{color:" + link_col1 + ";text-decoration:underline}" +
            "a:visited,a.postlink{color:" + link_col2 + ";text-decoration:underline}" +
            "a:hover{color:" + link_col3 + "}" +
            "a.topictitle:visited{color:" + link_col2 + "}" +
            "a.topictitle:hover{color:" + link_col3 + "}" +
            "td.cat{background:" + back_col2 + "; color:" + text_col3 + "}" +
            ".row1{background:" + back_col1 + "; color:" + text_col3 + "}" +
            ".row2,.helpline{background:" + back_col1 + "; color:" + text_col3 + "}" +
            ".row3{background:" + back_col1 + "; color:" + text_col3 + "}" +
            "td.spacerow{background:" + back_col3 + "}" +
            "td.rowpic{background:" + back_col1 + "}" +
            "th{background-image:none;color:" + text_col1 + "}" +
            ".bodyline{ background: " + back_col1 + "; width: 100%; border: solid 1px " + bord_col1 + ";}" +
            ".forumline{background:" + back_col3 + "; border:solid 1px " + bord_col1 + ";}" +
            ".maintitle,h1{color:" + text_col1 + "}" +
            ".postdetails{color:" + text_col1 + "}" +
            ".quote{background:" + back_col3 + ";border:1px solid " + bord_col1 + ";color:" + text_col3 + "}" +
            ".code{background:" + back_col3 + ";border:solid 1px " + bord_col1 + ";color:" + text_col2 + "}" +
            ".errorline{background:" + back_col4 + ";border:1px solid " + bord_col1 + "}" +
            "a.but,a.but:hover,a.but:visited{color:#000000;text-decoration:underline}" +
            ".topbkg{background-image:none}" +
            ".nav{color:" + text_col1 + "}" +
            ".topnav{background-image:none }" + 
            ".topnav{font-size: " + text_siz1 + " }" +
            ".topictitle{font-size: " + text_siz1 + " }" +
            ".postbody{font-size: " + text_siz1 + " }" +
            ".genmed{font-size: " + text_siz2 + " }" +
            ".quote{font-size: " + text_siz2 + " }" +
            ".gensmall{font-size: " + text_siz3 + " }" +
            ".name{font-size: " + text_siz4 + " }" +
            ".postdetails{font-size: " + text_siz4 + " }"
            ;

  new_element = document.createElement ("STYLE");
  new_element.innerHTML = "<style>" + new_style + "</style>";
  document.getElementsByTagName('head')[0].appendChild(new_element);
})();

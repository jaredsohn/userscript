// ==UserScript==
// @name           ICHC SizeFixer
// @namespace      no u
// @include        http://www.icanhazchat.com/*
// @include        http://icanhazchat.com/*
// @version        1.0
// ==/UserScript==

LoadMeSlowly();

function LoadMeSlowly(){ 
var t = document.getElementById("activeUserList");
t.setAttribute("Class","");
var s = "position:absolute; z-index:0;    overflow:auto;    top:475px;    left:4px;    width:98.5%;    height:316px;    text-align:left;    font-size:small;    padding-left:4px;    text-decoration:none;    background-color:#efefef;    padding-top:4px;    border-style:solid;    border-color:#dddddd;    border-width:thin;        -moz-border-radius:10px 10px 10px 10px;    -webkit-border-radius:10px 10px 10px 10px;    /* for IE */    filter:alpha(opacity=80);    /* CSS3 standard */    opacity:0.8;"
t.setAttribute("style", s);

 var r =" position:absolute; \
    z-index:0;\
    top:800px;\
    left:0px;\
    font-size:smaller;\
    width:100%;\
    color:White;\
    background-color:#efefef;\
    border:solid 1px white;\
    padding-top:4px;\
    -moz-border-radius:10px 10px 10px 10px;\
    -webkit-border-radius:10px 10px 10px 10px;\
          filter:alpha(opacity=70);\
        opacity:0.70;"

		var t2  = document.getElementById("footer");
		t2.setAttribute("Class","");
		t2.setAttribute("style", r);
}
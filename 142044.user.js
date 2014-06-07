// ==UserScript==
// @name        imdb picture download
// @namespace   http://www.imdb.com/media
// @include     http://www.imdb.com/*
// @include     http://imdb.com/*
// @version     1.0
// ==/UserScript==

var con=document.getElementById("controls");

var address=document.getElementById("primary-img").getAttribute("src");
var address2=new String(address);
address2=address2.substring(0,87);
address2+="jpg";

var di=document.createElement("div");
di.setAttribute("id","divESG");
di.setAttribute("Align","center");

var a1=document.createElement("a");
a1.setAttribute("href",address2);
a1.setAttribute("class","btn secondary small");
var txtDownload=document.createTextNode("Download");
a1.appendChild(txtDownload);



di.appendChild(a1);
con.appendChild(di);
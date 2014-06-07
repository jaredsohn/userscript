// ==UserScript==
// @name          Slashdot Sidebar Toggle
// @namespace     http://loucypher.wordpress.com/
// @include       http://slashdot.org/*
// @include       http://*.slashdot.org/*
// @description	  Toggle left/right sidebar when click on left/right edge of the body and saves/restores the results with GM_setValue/GM_getValue
// ==/UserScript==

// Last updated: 2006-11-06

var img = "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAABkCAMAAAC4nkCEAAAAFXRFWHRDcmVhdGlvbiBU\
aW1lAAfWCwYWDSr5t7B2AAAAB3RJTUUH1gsGFhMlaEhxSAAAAAlwSFlzAAAOwwAADsMB\
x2+oZAAAAwBQTFRFZWVlZmZmaGhoaWlpa2trbGxsdHR0dXV1dnZ2d3d3eHh4eXl5enp6\
fHx8fX19fn5+gICAgYGBg4ODhISEh4eHiIiIiYmJioqKi4uLjY2Njo6OkJCQkZGRkpKS\
k5OTmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKio\
qampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1uLi4ubm5urq6vLy8\
vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3N\
zs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e\
39/f4ODg4eHh4uLi4+Pj5OTk5ubmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAA5Evs2AAAAg5JREFUeNrNlFt30kAUhSmIYilabQuVqhUpFrAt\
FkWhcrMVBHJhksltJreGxtb//wtM13JlzvCWpQ++fitzztlnn53Ur7sw8GxiYCQJs8nl\
KPVfgfnTTPr1TGRgaxw4lTfKPAY5yyeKpAsxGG6V699VxL5wrped/OEyBuIrh1ItZbIn\
hb6qnxZsKQbyYSa9LxKR1fCCwKfqgk1KiakjMZm4QV/hwbumLnPg+ANZcqB+Tv89GE3X\
upjW2hyGpiQzKvsgk97+BvaRvQ2D4SZeAOBZRvlSAoBidNRSfnCgcoJnHHgy4kHjIQFP\
orb7AmFFvagtZ5TjUCuhUZ8bx7XqmcRAsfrpvNUDRUto5VITgvFiPJiAJ6Xdg9Jehx2d\
V8Kh7xIVAMU3oy2DJ812vVoB4Guv226dakCL77vU0uAVWrq6lJKI27s3agL2UUTh6stL\
fjBrcGAJQEt5d0OE4ApL7090IF8NbJKCXyBX/5gDiSpFbQsCZYlyb8KVb+M1o5SEibq4\
WrvTZy/4S+40i5oCwXM87mDQRd651nZMmYFaNOnGBMVA33Z/rtQiU9urhK6lP0axlgu8\
Ihj1JvL0D4hsMjFaqtI0FkfvRxfnCROV60p8oqS8xidKTlGQqP5ZLf8WbD077D5qO8CX\
7F0gFwzw+8zeOsZRQ51zqRQ2BWaUd0Owgk1W1LEjcbK8SGTU34DfEXvra2vJwIQAAAAA\
SUVORK5CYII=";

if(document.getElementById("links")) {
  var ls = document.createElement("div");
  ls.id = "lsToggle";
  ls.title = "Hide left sidebar";
  var lImg = ls.appendChild(document.createElement("img"));
  lImg.src = img;
  lImg.style.marginTop = "140px";
  ls.setAttribute("style", "background-color: transparent; " +
                           "color: transparent; width: 16px; " +
                           "height: 100%; position: fixed; top: 0; " +
                           "left: 0; z-index: 5; cursor: pointer; " +
                           "padding: 0;");
  ls.addEventListener("click", function(event) {
    contents = document.getElementById("contents");
    links = document.getElementById("links");
    if(!links.style.display) {
      links.style.display = "none";
      contents.style.marginLeft = "1em";
      this.title = "Show left sidebar";
      GM_setValue("hideLeft", true);
    } else {
      links.removeAttribute("style");
      contents.removeAttribute("style");
      this.title = "Hide left sidebar";
      GM_setValue("hideLeft", false);
    }
  }, false);

  document.body.insertBefore(ls, document.body.firstChild);

  var configLeft = GM_getValue("hideLeft");
  if(configLeft) {
    document.getElementById("links").style.display = "none";
    document.getElementById("contents").style.marginLeft = "1em";
  }
}

if(document.getElementById("slashboxes")) {
  var rs = document.createElement("div");
  rs.id = "rsToggle";
  rs.title = "Hide right sidebar";
  var rImg = lImg.cloneNode(true);
  rs.appendChild(rImg);
  rs.setAttribute("style", "background-color: transparent; " +
                           "color: transparent; width: 16px; " +
                           "height: 100%; position: fixed; top: 0; " +
                           "right: 0; z-index: 5; cursor: pointer; " +
                           "padding: 0;");
  rs.addEventListener("click", function(event) {
    articles = document.getElementById("articles");
    slashbox = document.getElementById("slashboxes");
    if(!slashbox.style.display) {
      slashbox.style.display = "none";
      articles.style.marginRight = "1em";
      this.title = "Show right sidebar";
      GM_setValue("hideRight", true);
    } else {
      slashbox.removeAttribute("style");
      articles.removeAttribute("style");
      this.title = "Hide right sidebar";
      GM_setValue("hideRight", false);
    }
  }, false);

  document.body.insertBefore(rs, document.body.firstChild);

  var configRight = GM_getValue("hideRight");
  if(configRight) {
    document.getElementById("slashboxes").style.display = "none";
    document.getElementById("articles").style.marginRight = "1em";
  }
}


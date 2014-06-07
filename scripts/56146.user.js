// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Mangatoshokan Info Bar
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Displays a information bar when moving the cursor to the upper edge of the website, intended for the use with http://userscripts.org/scripts/show/52058
// @include        http://www.mangatoshokan.com/read/*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

var ch_select = document.getElementsByClassName("reader")[0].getElementsByTagName("select")[0];
var pg_select = document.getElementsByClassName("reader")[0].getElementsByTagName("select")[1];

var ch_options = ch_select.getElementsByTagName("option");
var pg_options = pg_select.getElementsByTagName("option");

var complete = /Series End/.test(ch_options[ch_options.length - 1].textContent);
if (complete) {
   ch_max = ch_options.length - 1;
}
else {
   ch_max = ch_options.length;
}
var pg_max = pg_options[pg_options.length - 1].textContent.match(/\d*/);

var ch_now;
for (i = 0; i < ch_options.length; i++) {
   if (ch_options[i].getAttribute("selected") == "selected") {
      ch_now = ch_options[i].textContent;
   }
}

var pg_now;
for (i = 0; i < pg_options.length; i++) {
   if (pg_options[i].getAttribute("selected") == "selected") {
      pg_now = pg_options[i].textContent;
   }
}

//alert(ch_now+"/"+ch_max+"//"+pg_now+"/"+pg_max);

var tl_now = document.getElementById("infobar").getElementsByTagName("div")[0].getElementsByTagName("a")[0].textContent;
var tl_now_by = document.getElementById("infobar").getElementsByTagName("div")[0].getElementsByTagName("a")[1].textContent;
tl_now_by = " by " + tl_now_by;

//alert(tl_now+"/"+tl_now_by);

var info_div = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
var ch_div = info_div.appendChild(document.createElement("div"));
var ch_now_a = ch_div.appendChild(document.createElement("a"));
var ch_max_a = ch_div.appendChild(document.createElement("a"));
var tl_div = info_div.appendChild(document.createElement("a"));
var tl_now_a = tl_div.appendChild(document.createElement("a"));
var tl_now_by_a = tl_div.appendChild(document.createElement("a"));
var pg_div = info_div.appendChild(document.createElement("div"));
var pg_now_a = pg_div.appendChild(document.createElement("a"));
var pg_max_a = pg_div.appendChild(document.createElement("a"));

info_div.setAttribute("style", "font-size: 12 px;padding: 12px; width: 75%; margin-right: 12.5%; margin-left: 12.5%; background-color: black; background-color: rgba(0, 0, 0, 0.75); -moz-border-radius-bottomleft: 5px; -moz-border-radius-bottomright: 5px; display: none;");
ch_div.setAttribute("style", "left: 12px; top: 12px; position: absolute;");
ch_now_a.setAttribute("style", "font-size: 110%; font-weight: bold; color: white; display: inline-block;");
ch_max_a.setAttribute("style", "font-size: 90%; color: white; display: inline-block;");
tl_div.setAttribute("style", "text-align: center; display: block;");
tl_now_a.setAttribute("style", "font-size: 110%; color: white; font-weight: bold; font-style: italic;");
tl_now_by_a.setAttribute("style", "font-size: 90%; color: white; font-weight: bold; font-style: italic;");
pg_div.setAttribute("style", "right: 12px; top: 12px; position: absolute;");
pg_now_a.setAttribute("style", "font-size: 110%; font-weight: bold; color: white; display: inline-block;");
pg_max_a.setAttribute("style", "font-size: 90%; color: white; display: inline-block;");

ch_now_a.appendChild(document.createTextNode("Chapter: " + ch_now));
ch_max_a.appendChild(document.createTextNode("\u00A0(of " + ch_max + ")"));
tl_now_a.appendChild(document.createTextNode(tl_now));
tl_now_by_a.appendChild(document.createTextNode(tl_now_by));
pg_now_a.appendChild(document.createTextNode("Page: " + pg_now));
pg_max_a.appendChild(document.createTextNode("\u00A0(of " + pg_max + ")"));

function show_hide_infobar (event) {
   var new_style = info_div.getAttribute("style");
   if ((window.scrollY > 50) && (event.clientY < 45)) {
      new_style = new_style.replace(/none/, "block");
      new_style += "position: absolute; top: " + window.scrollY + "px;";
      info_div.setAttribute("style", new_style);
   }
   else {
      new_style = new_style.replace(/block.*/, "none;");
      info_div.setAttribute("style", new_style);
   }
}

document.addEventListener("mousemove", function (e) {show_hide_infobar(e)}, false);
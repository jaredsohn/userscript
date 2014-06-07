// ==UserScript==
// @name Hexagon.cc New Torrent Mod
// @namespace http://whitehat.servehttp.com/
// @include http://*.hexagon.cc/torrents/new
// ==/UserScript==

function Init() {
//RENAME OLD TITLE FIELD
var title_input_old = document.getElementById(“torrent_resource_query”);
var title_input_class = title_input_old.getAttribute(“class”);
var title_input_type = title_input_old.getAttribute(“type”);
var title_input_size = title_input_old.getAttribute(“size”);
var title_input_name = title_input_old.getAttribute(“name”);

title_input_old.removeAttribute(“name”);
title_input_old.setAttribute(“autocomplete”, “off”);

var title_div_old = title_input_old.parentNode.parentNode.parentNode;
var title_li_old = title_div_old.parentNode;
var title_label_old = title_li_old.childNodes1;
title_label_old.innerHTML = “Resource”;

//ADD NEW TITLE FIELD
var fields_ul = title_li_old.parentNode;
var title_li_new = document.createElement(“li”);

var title_label_new = document.createElement(“label”);
title_label_new.innerHTML = “Title”;
title_li_new.appendChild(title_label_new);

var title_div1_new = document.createElement(“div”);
title_div1_new.setAttribute(“class”, “mock_field”);
title_li_new.appendChild(title_div1_new);

var title_p1_new = document.createElement(“p”);
title_p1_new.innerHTML = “Give your torrent a title.”
title_div1_new.appendChild(title_p1_new);

var title_div2_new = document.createElement(“div”);
title_div2_new.setAttribute(“class”, “field_container”);
title_div1_new.appendChild(title_div2_new);

var title_p2a_new = document.createElement(“p”);
var title_p2b_new = document.createElement(“p”);
title_div2_new.appendChild(title_p2a_new);
title_div2_new.appendChild(title_p2a_new);

var title_div3_new = document.createElement(“div”);
title_div3_new.setAttribute(“class”, “error”);
title_div2_new.appendChild(title_div3_new);

var title_input_new = document.createElement(“input”);
title_input_new.setAttribute(“id”, “torrent_title”);
title_input_new.setAttribute(“class”, title_input_class);
title_input_new.setAttribute(“type”, title_input_type);
title_input_new.setAttribute(“size”, title_input_size);
title_input_new.setAttribute(“name”, title_input_name);
title_input_new.setAttribute(“autocomplete”, “on”);
title_p2a_new.appendChild(title_input_new);

var fields_spacing = fields_ul.childNodes0;
fields_ul.insertBefore(title_li_new, title_li_old);
fields_ul.insertBefore(fields_spacing, title_li_old);

//ADD RESOURCE GUID SHOW / HIDE
//to be implemented at a future time.
}

Init();
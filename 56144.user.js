// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Wikipedia - What links here improvements
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Additional links for the "Pages that link to ..." page
// @include        *.wikipedia.org/*
// @include        *.wikia.com/*
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

//this is needed to check if we are on a what-links-here page
var whatlinkshere_input = document.getElementById("mw-whatlinkshere-target");

if (whatlinkshere_input) {
   //alert(whatlinkshere_input);
   //alert(window.location.href);

   var filter_fieldset = document.getElementById("bodyContent").getElementsByTagName("fieldset")[1];

   var old_loc = (window.location.href.indexOf("index.php") == -1) ? filter_fieldset.getElementsByTagName("a")[0].getAttribute("href") : window.location.href;
   var plain_loc = old_loc.replace(/&hidetrans=[0-1]?/,"").replace(/&hidelinks=[0-1]?/,"").replace(/&hideredirs=[0-1]?/,"")
   //alert(plain_loc);

   var show_all_href = plain_loc;

   var only_tr_href = plain_loc + "&hidelinks=1&hideredirs=1";
   var only_links_href = plain_loc + "&hidetrans=1&hideredirs=1";
   var only_rd_href = plain_loc + "&hidetrans=1&hidelinks=1";

   filter_fieldset.appendChild(document.createTextNode("|\u00A0"));
   var add_filter_text_show_all = filter_fieldset.appendChild(document.createElement("a"));
   add_filter_text_show_all.setAttribute("href", show_all_href);
   add_filter_text_show_all.appendChild(document.createTextNode("Show all"));

   var add_filter_div = filter_fieldset.appendChild(document.createElement("div"));

   add_filter_div.setAttribute("style", "margin: 0px; padding: 0px; padding-top: 7px;");

   add_filter_div.appendChild(document.createTextNode("Show only"));

   var only_list = add_filter_div.appendChild(document.createElement("ul"));
   only_list.setAttribute("style", "margin-top: 0px;");

   var only_transclusions_li = only_list.appendChild(document.createElement("li"));
   var only_transclusions_a = only_transclusions_li.appendChild(document.createElement("a"));
   only_transclusions_a.setAttribute("href", only_tr_href);
   only_transclusions_a.appendChild(document.createTextNode("transclusions"));

   var only_links_li = only_list.appendChild(document.createElement("li"));
   var only_links_a = only_links_li.appendChild(document.createElement("a"));
   only_links_a.setAttribute("href", only_links_href);
   only_links_a.appendChild(document.createTextNode("links"));

   var only_redirects_li = only_list.appendChild(document.createElement("li"));
   var only_redirects_a = only_redirects_li.appendChild(document.createElement("a"));
   only_redirects_a.setAttribute("href", only_rd_href);
   only_redirects_a.appendChild(document.createTextNode("redirects"));
}
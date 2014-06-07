// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Pixiv easier tag search
// @namespace      http://www.w3.org/1999/xhtml 
// @description    drag and drop tags onto the search field
// @include        http://www.pixiv.net/*
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

var searchBox = document.getElementById("pageHeader").getElementsByTagName("form")[0].getElementsByClassName("text")[0];
//alert(searchBox);

if(searchBox) {
   if(searchBox.tagName.toLowerCase() == "input") {
      //the change event isn't fired for drag and drop, therefore we use mousemove
      searchBox.addEventListener("mousemove", function(e) {update_tag_box()}, false);
   }
}

function update_tag_box() {

   if (searchBox.value.indexOf("http") != -1) {
      //we remove the URL part and the tag(s) remain
      searchBox.value = searchBox.value.replace(/https?:\/\/.*\?tag=/," ");
      //we have to decode the tag(s); else they will be double encoded when submitting the search (and won't work!)
      searchBox.value = decodeURIComponent(searchBox.value);
      //for convenience we focus the input; else [enter] would submit the link instead of submitting the complete search
      searchBox.focus();
   }

   if (searchBox.value.slice(0,1) == " ") {
      searchBox.value = searchBox.value.slice(1);
   }
}
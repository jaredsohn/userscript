// ==UserScript==
// @name          Google Reader 30Boxes
// @namespace     http://at-aka.blogspot.com/
// @description   Add 30Boxes events from Google Reader search box.
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// @include       http://reader.google.com/*
// @include       https://reader.google.com/*
// ==/UserScript==

(function() {

function _g30_add_event ()
{
  var searchbox = document.getElementById('search-input');
  var searchtxt = searchbox.value;
  var url_30box = "http://30boxes.com/index.php?action=newEvent&input=";
  window.open(url_30box+searchtxt);
}

function _g30_append_button ()
{
  var mk30box = document.createElement("button");
  var mk30box_label = document.createTextNode("30Boxes");
  var search = document.getElementById('web-search-form');
  mk30box.setAttribute("type","button");
  mk30box.appendChild(mk30box_label);
  mk30box.addEventListener("click",function(){_g30_add_event();},true);
  search.appendChild(mk30box);
}

_g30_append_button();

})();

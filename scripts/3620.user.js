// ==UserScript==
// @name          Gmail 30Boxes
// @namespace     http://at-aka.blogspot.com/
// @description   Add 30Boxes events from Gmail search box.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

(function() {
var search = document.getElementById('s');

function _g30_add_event ()
{
  var searchbox = search.firstChild;
  var searchtxt = searchbox.value;
  var url_30box = "http://30boxes.com/index.php?action=newEvent&input=";
  window.open(url_30box+searchtxt);
}

function _g30_append_button ()
{
  var mk30box = document.createElement("button");
  var mk30box_label = document.createTextNode("30Boxes");
  mk30box.setAttribute("type","button");
  mk30box.appendChild(mk30box_label);
  mk30box.addEventListener("click",function(){_g30_add_event();},true);
  search.appendChild(mk30box);
}

_g30_append_button();

})();

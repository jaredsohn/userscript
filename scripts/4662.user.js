// Function GMT_key is copied from a script by Mark Wilkinson (http://kremvax.net/firefox/)
// at http://kremvax.net/firefox/googlereadershoworiginal.user.js
//
// ==UserScript==
// @name          Google Reader - wide view
// @namespace     http://at-aka.blogspot.com/
// @description   Hide/Show headers and footers in Google Reader
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// @include       http://reader.google.com/*
// @include       https://reader.google.com/*
// ==/UserScript==

(function() {

var ids = [// header
           "logo-container","global-info","search","top-nav",
           // footer
           "promo","footer",
           // share
           "drawer",
           "sharing-box-marker","subscribe-area"];

function _greader_toggle_hide_and_show ()
{
  var length = ids.length;
  var is_visible = document.getElementById(ids[0]).style.display != "none";

  for (var i=0; i<length; i++){
    document.getElementById(ids[i]).style.display = is_visible?"none":"block";
  }
}

function GRT_key(event) {
  element = event.target;
  elementName = element.nodeName.toLowerCase();
  if (elementName == "input") {
    typing = (element.type == "text" || element.type == "password");
  } else {
    typing = (elementName == "textarea");
  }
  if (typing) return true; 
  if (String.fromCharCode(event.which)=="w" && !event.ctrlKey) {
    _greader_toggle_hide_and_show();
    try {
      event.preventDefault();
    } catch (e) {
    }
    return false;
  }
  return true;
}

document.addEventListener("keypress", GRT_key, false);

})();

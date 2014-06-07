// ==UserScript==
// @name        everything-lowercase
// @namespace   http://subtlecoolness.com/
// @description This script will convert all uppercase letters in a GMail message to lowercase
// @include     http://mail.google.com/*
// @include     https://mail.google.com/*
// ==/UserScript==

var _gmail = null;
var _view = null;

window.addEventListener('load', _load, true);

function _load()
{
 if (unsafeWindow.gmonkey)
 {
  unsafeWindow.gmonkey.load('1.0', _init);
 }
}

function _init(_g)
{
 _gmail = _g;
 _gmail.registerViewChangeCallback(_everything_lowercase);
}

function _everything_lowercase(_v)
{
 _view = _gmail.getActiveViewType();
 if (_view == "cv")
 {
  var _cv_element = _gmail.getActiveViewElement();
  var _msg_divs = _cv_element.getElementsByClassName('ii');
  for (i = 0; i < _msg_divs.length; i++)
  {
   var _this_div = _msg_divs[i];
   var _div_html = _this_div.innerHTML;
   _this_div.innerHTML = _div_html.toLowerCase();
  }
 }
}
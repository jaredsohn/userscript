// ==UserScript==
// @name        okcupid_height_warning
// @namespace   gleske.net
// @description Flag users which are equal or taller than me
// @include     http://www.okcupid.com/profile/*
// @version     1.0
// ==/UserScript==

// CONFIGURE VARS
//what is your height in inches?
var _myheight=67;
var _minheight=53;
// END CONFIGURE VARS


var _el=$("ajax_height");
//get the height values
var _height=_el.innerHTML.split(" ");
//parse out the feet
var _hft=eval(_height[0].substring(0,_height[0].length-1));
//parse out the inches
var _hin=eval(_height[1].substring(0,_height[1].length-1));

//convert height into inches
var _inches=_hft*12+_hin;

//warn if user equal to 5' 7" and highlight users red who are taller than that
if(_inches === _myheight || _inches === _minheight)
{
  _el.style.backgroundColor="#fff88d";//light yellow
}
else if(_inches > _myheight || _inches < _minheight)
{
  _el.style.backgroundColor="#ff9b9b";//light red
}

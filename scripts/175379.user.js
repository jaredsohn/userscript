// ==UserScript==
// @name        Disable Twinoid sliding menus
// @description Stops Twinoid menus from sliding out when you hover over the cube / your name (you can still click it)
// @namespace   rulesy-twinoid
// @version     1
// @include     http://www.die2nite.com/*
// @include     http://teacher-story.com/*
// @include     http://hotel.en.muxxu.com/*
// @include     http://arkadeo.com/*
// @include     http://www.kadokado.com/*
// @include     http://fever.en.muxxu.com/*
// ==/UserScript==

unsafeWindow._tid.onOverLeftCorner = function(){};
unsafeWindow._tid.onOverRightCorner = function(){};
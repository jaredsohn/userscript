// ==UserScript==
// @name        imgur to gfycat
// @namespace   imgur
// @description pushes imgur to to html5
// @include     http://*imgur.com/*.gif
// @exclude     http://gfycat.com/fetch*
// @version     1
// @grant       none
// ==/UserScript==

window.location.href = "http://gfycat.com/fetch/" + window.location.href + "?r=" + Math.random();
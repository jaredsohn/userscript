// ==UserScript==
// @name        iminus to gfycat
// @namespace   treas0n
// @description pushes iminus to html5
// @include     http://i.minus.com/*.gif
// @exclude     http://gfycat.com/fetch*
// @version     1
// @grant       none
// ==/UserScript==

window.location.href = "http://gfycat.com/fetch/" + window.location.href + "?r=" + Math.random();
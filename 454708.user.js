// ==UserScript==
// @name            loop html5 video
// @description     loops the html5 video in firefox's top level video document
// @author          hollander
// @version         0.1
// @include         *.webm
// @include         *.ogv
// @include         *.mp4
// @include         *.m4v
// ==/UserScript==
document.getElementsByTagName('video')[0].loop = true;

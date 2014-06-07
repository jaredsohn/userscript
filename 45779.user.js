// ==UserScript==
// @name           Ow.ly Frame Remover
// @namespace      troynt+owly@gmail.com
// @description    Removes Ow.ly Header Frame
// @include        http://ow.ly/*
// @exclude        http://ow.ly/url/*
// ==/UserScript==
var frames = document.getElementsByTagName('frame');
window.location.href = frames[1].src;
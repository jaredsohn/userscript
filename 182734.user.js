// ==UserScript==
// @id             plug.dj-egwere7f-025b-154e-abaf-a560f324febb@scriptish
// @name           Plug Meme Text
// @version        1.0
// @namespace      
// @author         Strategetical
// @description    Superior /me things
// @include        https://plug.dj/*
// @include        http://plug.dj/*
// @run-at         document-end
// ==/UserScript==

var stylething = document.createElement("style");
stylething.setAttribute("id", "stylething");
document.getElementsByTagName("head")[0].appendChild(stylething);
document.getElementById("stylething").innerHTML += "#chat .emote .text{font-style:normal!important;font-weight:bold!important;color:#A9FF6F!important;}";
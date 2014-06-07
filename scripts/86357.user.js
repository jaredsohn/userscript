// ==UserScript==
// @name            Pirate off
// @namespace       reddit.PirateOff
// @author          FDA
// @description     Remove pirate shit
// @version         1.0.0
// @include         http://reddit.*
// @include         http://*.reddit.*
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML.replace(/be commentin'/g,"comments");
document.body.innerHTML=document.body.innerHTML.replace(/be savin'/g,"save");
document.body.innerHTML=document.body.innerHTML.replace(/stow/g,"hide");
document.body.innerHTML=document.body.innerHTML.replace(/be squawkin'/g,"report");
document.body.innerHTML=document.body.innerHTML.replace(/permasail/g,"permanent link");
document.body.innerHTML=document.body.innerHTML.replace(/avast! be ye certain?/g,"are you sure?");
// ==UserScript==
// @name        Medusa-Model-Wiki
// @description Medusa-Model-Wiki
// @include     http://medusa.regionh.dk/*
// @include     http://medusa.regionh.dk/*
// ==/UserScript==



var ModelFormValue    = document.getElementById ("txtModel");
var ModelFormLabel    = document.getElementById ("lblModel");
document.getElementById("lblModel").innerHTML = '<a href="http://facitwiki/wiki/index.php/' + ModelFormValue.value + '" target="_blank"><b>Model ...</b></a>';


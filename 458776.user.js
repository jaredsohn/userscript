// ==UserScript==
// @name       Re-enable autocomplete on Zonza.tv
// @namespace  http://autocomplete.zonza.graingert.co.uk/
// @version    0.1
// @description  Re-enable autocomplete on Zonza.tv
// @match      https://*.zonza.tv/authentication/login/*
// @match      https://zonza.tv/authentication/login/*
// @match      http://*.zonza.tv/authentication/login/*
// @match      http://zonza.tv/authentication/login/*

// @copyright  2012+, Thomas Grainger
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("loginform").removeAttribute("autocomplete");
    document.getElementById("id_password").removeAttribute("autocomplete");
    document.getElementById("id_username").removeAttribute("autocomplete");
});
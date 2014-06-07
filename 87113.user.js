// ==UserScript==
// @name           a
// @namespace      a
// @include        http://muare.vn/*
// ==/UserScript==
window.setTimeout(function() { document.getElementById("vB_Editor_QR_textarea").value  = "up"; document.getElementById("vB_Editor_QR_textarea").form.submit(); }, 120000*Math.random());
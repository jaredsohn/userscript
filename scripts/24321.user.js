// ==UserScript==
// @name           Angel Auto-login
// @namespace      http://freecog.net/2008/
// @description    Automatically logs you in to Angel.
// @include        https://angel.rose-hulman.edu/Angel/*
// ==/UserScript==

function get_el(id) { return document.getElementById(id); }

var form = get_el("frmLogon");

if (form && get_el("username").value && get_el("password").value) {
	form.submit();
}

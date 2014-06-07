// ==UserScript==
// @name          Fuck Telefonica
// @description   No more "Ayuda en la Busqueda" Crap!
// @include       http://www.ayudaenlabusqueda.com.ar/*
// ==/UserScript==

var querystring = /^.*\?(.*)/.exec(window.location.href)[1];
var query = /^.?query=(\w*)&?/.exec(querystring)[1];
window.location.href = "http://www.google.com/search?q=" + query;

// ==UserScript==
// @name          trve pOT Favicon
// @include       http://forum.mods.de/*
// ==/UserScript==

var vodka = document.createElement('link');
vodka.setAttribute('type', 'image/x-icon');
vodka.setAttribute('rel', 'shortcut icon');
vodka.setAttribute('href', 'data:image/x-icon;base64,R0lGODlhEAAQAMICAAAAAP/ezv///wAAAP///////////////yH/C05FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQJCgACACwAAAIAEAANAAADJSi63P4OyEGrHWKEzXvPXsiBYkiWX6ahG3NZI7SsgTzHNoDbVQIAIfkECQoAAgAsAAACABAADQAAAycoutz+EEg5qh2qhs37FoMncuA4hqaIpl3JXRYJWs4KMfatALI+DwkAIfkECQoAAgAsAAACABAADQAAAycoutz+cIEJhrXshs35Gl3oCaAokqaJpuEqaptLYe43PGUQSeNOWgkAIfkECQoAAgAsAAACABAADQAAAycoutz+EEg5qh2qhs37FoMncuA4hqaIpl3JXRYJWs4KMfatALI+DwkAIfkECQoAAgAsAAACABAADQAAAyMoutz+cMhJpRgh670v/5oHfuLYXZiZMRUVQksawPFLAzY9JQAh+QQBCgACACwAAAIAEAANAAADJig6o/5vhMAadHLqylvWYLiE5OSUJPahUMVeQqfB7Uxj9i0AuV4lADs=');
var head = document.getElementsByTagName('head')[0];
head.appendChild(vodka);




// ==UserScript==
// @id servicedeskfixer
// @name servicedeskfixer
// @description ServiceDesk fixer
// @include http://portalservicedesk.sita.aero/*
// @include https://servicedesk.sita.aero/*
// ==/UserScript==
//
// All your base are belong to us
var yourbases = document.getElementsByTagName("base");
for (var i=0; i<yourbases.length;i++) {
var yourbase=yourbases[i];
yourbase.parentNode.removeChild(yourbase);
}
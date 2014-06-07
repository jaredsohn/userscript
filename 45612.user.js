// ==UserScript==
// @name           Origó fórum
// @namespace      http://forum.origo.hu/
// @include        http://forum.origo.hu/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        0.1
// ==/UserScript==

$(function() {
  $("#wrapper").css("width", "80%");
  $("#layout, #content-td, #content").css("width", "100%");
  $(".comment, .text").css("width", "100%");
  $("form.search").css("background-color", "#FFFF99");
  $(".pager").css("width", "650px");
  $(".search").css("width", "350px");
  $(".title, .user").css("background-color", "#FFCC99").css("color", "black");
  $(".text").css("background-color", "#FFFFCC");
  $(".footer").css("background-color", "white");
  
  commentboxs = $(".comment").toArray();
  
});
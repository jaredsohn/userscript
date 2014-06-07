// ==UserScript==
// @name           Yammhide
// @namespace      kovacsdaniel
// @description    rejtsd el a fránya trend dobozt
// @version        0.1
// @include        http://yamm.hu/*
// // ==/UserScript==

$(document).ready(function(){

 $(".sidebar-menu").hide();
    $("a").click(function () {
      $(this).hide();
      return true;
    });

$('#sidebar').append('<br><div class="noborder" style="margin-left:1px;padding-top:23px;padding-bottom:3px"><div><h2 style="color:#1A1A1A;margin-left:10px">Trend doboz rejtése</h2><div id="noborder" style="color:#AAAAAA;font-size:11px;margin-left:13px;"><a href="#">Rejtem!</a></div></div>');

// ==UserScript==
// @name          CuentoCabrones
// @description	  Mejora la mierda de presentacion que tiene la pagina
// @include       http://www.cuantocabron.com/*
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {

$("#banner1").hide();
$("#friends").hide();
$("#navup").append($("#search"));
$("#search").css("display","block");
$(".section").replaceWith($("#cats,.separator,.best_rated,.separator,.last_year"));
$("#menu").css("float", "none");
$(".pre").hide();
$(".source,.tags,.report_entry").hide();
$('div[id *= "comment"]').hide();
$('.box.expl').hide();
$("#logo").hide();
$('input[name = "submitBusqueda"]').hide();
$('a[href *= "busqueda_avanzada"]').hide();
$(".distinguished").hide();
$(".tag").hide();
$("#navup").append($(".pager"));
$("ul#nav").css("padding-top","20px");
$('img[src *= "memetienda"]').hide()
$("#cats").hide();
$("#cats").before("<a id='memes'>Mostrar memes</a>");
$("#memes").css("font-size","20px");
$("#cats").css("-webkit-column-count","2");
$("#cats > li > a").css("color","gray");
$("#cats > li > a").css("line-height","1.5")
var x = 1;
$("#memes").click(function() {
    if (x == 1) {
      $("#cats").fadeIn();  
      
    }
    else {
      
      $("#cats").fadeOut();
    }
    x *= -1;
});

var stories = $(".box.story");
var counter = 0;
var actual_story = stories[0];
var anterior;
$(".box.story").hide();
$(actual_story).show();

if ( stories.length > 1 ) {
  $(actual_story).before("<a id='atras'>Atras </a>");
  $(actual_story).before("<a id='siguiente'>Siguiente</a>");
  $("#atras").hide();
}
$("#siguiente").click(function() {
  if ( counter < stories.length ) {
    counter += 1;
    if ( counter > 0 ) {
      $("#atras").fadeIn();
    }
    
    $(actual_story).hide();
    actual_story = stories[counter];
    $(actual_story).show();
  
    if ( counter == stories.length - 1 ) {
      $("#siguiente").fadeOut();
    }
  }
});
$("#atras").click(function() {
  if ( counter > 0 ) {
    if ( counter < stories.length) {
      $("#siguiente").fadeIn();
    }
    counter -= 1;
    $(actual_story).hide();
    actual_story = stories[counter];
    $(actual_story).show();
  }
  if ( counter == 0 ) {
    $("#atras").fadeOut();
  }
});

});
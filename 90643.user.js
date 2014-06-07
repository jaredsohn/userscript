// ==UserScript==
// @name           zive.cz - Placena inzerce
// @author         moen
// @namespace      monnef.tk
// @include        http://www.zive.cz/*
// @description    Castecne zneviditelneni clanku inzerce
// @description    http://monnef.tk/blog/internet/zivecz-clanky-placena-inzerce/
// @homepage       http://userscripts.org/scripts/show/90643
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant          none
// ==/UserScript==

var className="adfix572"; // changed class name to not collide with adBlock
var classNameDotted = '.'+className;
var insertString = ' '+className;
var insertClassName = function(t){ t.className+=insertString };
                                               
this.$ = this.jQuery = jQuery.noConflict(true);

// paid ads (center of a page in articles)
$(".arlist").each(function(){
  if (this.innerHTML.match(/Inzerce<\/span>/)) {
    insertClassName(this);
  }
});

// center of a page in articles, e.g. xmas czc  
$(".arlist-pr").css("background", "none"); // remove gray bg
$(".arlist-pr").each(function(){insertClassName(this);})

// at the end we modify stuff by its class
$(classNameDotted).css("opacity","0.1");

// bottom ad bar
$(document).ready(function() {
	$("#pf-wrapper").css("display", "none");
  $('.'+className).hover(
    function() {
      $(this).stop().animate({"opacity": "0.95"}, "slow");
    },
    function() {
      $(this).stop().animate({"opacity": "0.2"}, "slow");
  });
});

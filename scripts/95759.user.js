//
// ==UserScript==
// @name          GMapsPane
// @namespace     http://userscripts.org/
// @description   Append "show/hide panes" button when viewing maps
// @author        SkyManPHP
// @include       http://maps.google.com/*
// @include       https://maps.google.com/*
// @include       http://*.maps.google.com/*
// @include       https://*.maps.google.com/*
// @version       0.2.0
// ==/UserScript==
//

alert("loaded!!!");

var fileref = document.createElement('script');
fileref.setAttribute("type", "text/javascript");
fileref.setAttribute("src", "http://code.jquery.com/jquery-1.5.min.js");
fileref.load = function() {
alert("loaded!");
};

var pane_hidden = false;
var pane_el = $(".onegoogle noprint, #header");

$(".end-edge-links").append('<img class="bar-icon-divider bar-divider" src="http://maps.gstatic.com/mapfiles/transparent.png">');

var toolbtn = $('<a href="javascript:void"></a>').click(function(){
   if (pane_hidden) {
	$(pane_el).slideUp();
   } else {
	$(pane_el).slideDown();
   }
   $(this).children("span").text((pane_hidden)?"Показать панель":"Скрыть панель");
   pane_hidden = not pane_hidden;
});

$(toolbtn).append('<span class="link-text">Показать панель</span>);
$(".end-edge-links").append(toolbtn);
// ==UserScript==
// @name        Tcl Commands Navigation
// @namespace   http://tcl.tk
// @include     http://*.tcl.tk/man/tcl8.5/TclCmd/*
// @require     http://code.jquery.com/jquery.min.js
// @author      heinrichmartin
// @version     0.2
// ==/UserScript==

// @history     0.2   fix anchors (drop ajax page load)
// @history     0.1   first version

$("body").wrapInner('<div id="container" style="margin-left: 20%;"></div>').before(
   '<div id="navigator" style="float: left; height: 100%; width: 20%; border: 0px; ' +
   'position: fixed; top: 0; left: 0; overflow-y: scroll;"><ul></ul></div>'
);
$("div#navigator ul").load("http://www.tcl.tk/man/tcl8.5/TclCmd/contents.htm table a", function(){
   $(this).find("a").wrap("<li/>");
   $(this).append($("div#navigator ul li").get().sort(function(a,b){
      a = $(a).text().toLowerCase();
	  b = $(b).text().toLowerCase();
	  return (a < b) ? -1 : (a > b) ? 1 : 0;
   }));
});

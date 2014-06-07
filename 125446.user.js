// ==UserScript==
// @id             ZHGoodness
// @name           ZH Goodness
// @version        1.1
// @namespace      http://vcx.bz/user-scripts
// @author         Daniel Pruessner
// @description    Removes the cruft from ZH
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @include        http://*zerohedge.com/*
// @run-at         document-end
// ==/UserScript==

$(function(){
  $("div#sidebar-left").detach();
  $("div#sidebar-right").detach();

  $("div#main").css('margin-right', '0px');
  $("div#main").css('margin-left', '0px');

  $("div#squeeze").css('margin-right', '0px');
  $("div#squeeze").css('margin-left', '0px');
  alert("b");
});

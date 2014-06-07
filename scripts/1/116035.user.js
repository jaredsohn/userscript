// ==UserScript==
// @name			Faved By
// @version			1.1
// @namespace		http://twitter.com/foooomio
// @include			http://favstar.fm/users/*
// @include			http://*.favstar.fm/users/*
// ==/UserScript==

(function(d, func){
  var h = d.getElementsByTagName("head")[0];
  var s = d.createElement("script");
  s.textContent = "(" + func.toString() + ")(jQuery);";
  h.appendChild(s);
})(document, function($) {
  var pathname = location.pathname.split('/');
  var username = pathname[2];
  
  var hostname = location.hostname.split('.');
  var text = hostname[0] === "ja" ? "Favしてくれた人" : "Faved By";
  
  var element = $('\
    <li class="fs-last" id="faved_by">\
    <div class="fs-pointer"></div>\
    <a href="/users/' + username + '/favs_from">' + text + '</a>\
    </li>');

  if(pathname[3] === "favs_from") {
    element.addClass("fs-selected");
    $(".fs-selected").removeClass("fs-selected");
  }
    
  $(".fs-nav-menu:first .fs-last")
    .removeClass("fs-last")
    .after(element);
  
  //$("#oldest").remove();
});
// ==UserScript==
// @name		Pic Linker
// @description		If a pic links to another one, the other one will be displayed.
// @author		FB55
// @include		*
// ==/UserScript==

for(var a = document.getElementsByTagName("a").length - 1;a >= 0;) {
  var b = document.getElementsByTagName("a")[a];
  if(b.href)if(b.getElementsByTagName("img"))for(var e = b.getElementsByTagName("img").length - 1;e >= 0;) {
    function f(c) {
      var d = c.getElementsByTagName("img")[e];
      if(c.href != d.src) {
        d.src = c.href;
        d.setAttribute("width", "");
        d.setAttribute("height", "");
        c.href = ""
      }
    }
    b.href.match(/jpg$/) && f(b);
    b.href.match(/gif$/) && f(b);
    b.href.match(/png$/) && f(b);
    b.href.match(/bmp$/) && f(b);
    e--
  }a--
};
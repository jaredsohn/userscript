// ==UserScript==
// @name        Remove *bars
// @namespace   http://fluidapp.com
// @description Remove annoying, fixed position right sidebar, which you don't relly need, right?
// @include     *.campfirenow.com/*
// @author      Łukasz Korecki
// ==/UserScript==

(function () {
  
    // do yer thang!
    var side = document.getElementById("Sidebar");
    var left = document.getElementsByClassName("Left")[0];
    var hide = function() {
        side.style.display = "none";
        left.style.width = "99%";
    };
    var show = function() {
      side.style.display = "block";
      left.style.width = "70%";
    };

    hide();
    var toggler = "<button id='toggler'>Toggle Sidebar</button>";
    var ls = document.getElementById("corner_logo");
    ls.innerHTML = toggler + ls.innerHTML;

    document.getElementById("toggler").addEventListener("click", function() {
      if(side.style.display == "none") {
        show();
      } else {
        hide();
      }
      return false;
    });
  
})();

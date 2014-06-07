// ==UserScript==
// @name           Reddit Image Preloader
// @namespace      nbarrientos
// @description    Preloads images and shows them when an icon is clicked
// @version        0.7
// @copyright      2010-2012 Nacho Barrientos
// @license        MIT
// @include        http://*reddit.com/*
// ==/UserScript==

(function(){
  function GM_wait() {
    if(typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') { // FF
        $ = unsafeWindow.jQuery; 
        GM_rip_exec_jQuery();
    } else if (typeof $ != 'undefined') { // Opera
        GM_rip_exec_jQuery();
    } else {
      window.setTimeout(GM_wait,75);
    }
  }

  function GM_rip_switch_visibility(expando, button) {
    var showing = button.data("showing");
    showing ? expando.hide() : expando.show();
    button.toggleClass("collapsed")
          .toggleClass("expanded")
          .data("showing", !showing);
   }

  function GM_rip_img_onload(event) {
    var entry = $(event.data.entry);
    var expando = $(event.data.expando);
    var expando_button = $("<div></div>").addClass("expando-button video")
                              .toggleClass("collapsed", true)
                              .data("showing", false)
                              .css("marginTop", "5px");
    $("p.title", entry).after(expando_button);
    $(this).show();
    expando_button.click(function() {
        GM_rip_switch_visibility(expando, expando_button);
    });
    $(this).click(function() {
        GM_rip_switch_visibility(expando, expando_button);
    });
  }

  function GM_rip_exec_jQuery() {
    $(".entry").each(function() {
        var link = $("a.title", this);
        var href = link.attr("href");
        var pattern = /\.(jpg|png|gif)$/i;
        if(pattern.test(href)) {
            var expando = $(".expando", this);
            var inner = $("<div></div>").addClass("md").appendTo(expando);
            var img = $("<img/>").css("width", "100%")
                                 .css("overflow", "visible")
                                 .bind("load", {entry: this, expando: expando}, GM_rip_img_onload)
                                 .attr("src", href)
                                 .appendTo(inner);
            expando.children(".error").hide();
        }
   });
  }
  GM_wait();
})();

// ==UserScript==
// @name           Emboldened Inquiries
// @author         Pieter Vande Bruggen, Hans van de Bruggen
// @namespace      http://github.com/pvande
// @description    Highlights questions in your email, so that you can more easily respond to them.
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// @version        0.5
// ==/UserScript==

window.addEventListener("load", function() {
  var api = (unsafeWindow || window.frames.js || {}).gmonkey;
  if (!api) { return; }

  function embolden(parent) {
    var conversations = parent.getElementsByClassName('gt');
    for (var i = 0; i < conversations.length; i++) {
      var c = conversations.item(i);
      c.innerHTML = c.innerHTML.replace(
        /(\w|\s|['";:&,-\/]|<a.*\/a>)*?\?/mg,
        function(x) { return '<b style="background:#F1F5EC; color:#00681C;">' + x + '</b>'; }
      );
    }
  }

  setTimeout(function() {
    api.load("1.0", function(gmail) {
      gmail.registerViewChangeCallback(function() {
        if (gmail.getActiveViewType() != 'cv') { return; }

        var view = gmail.getActiveViewElement();
        embolden(view);

        view.addEventListener("DOMNodeInserted", function(event) {
          embolden(event.target);
        }, true);
      });
    });
  }, 1000);
}, true);
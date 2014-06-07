// ==UserScript==
// @name           RuWikiBlackout
// @namespace      su.gornostaev
// @description    Убирает заглушку с ru.wikipedia.org
// @version        1.0
// @author         Sergey TheDeadOne Gornostaev
// @license        BSD
// @include        http://ru.wikipedia.org/*
// @match          http://ru.wikipedia.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  $("#siteNotice").css({"display":"none"});
  $("#mw-head,#mw-panel,#footer,#catlinks,#firstHeading,#bodyContent,#mw-dismissable-notice").css({"display":"block"});
}

addJQuery(main);

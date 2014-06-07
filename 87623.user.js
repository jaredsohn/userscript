// ==UserScript==
// @name           w3intra lite
// @namespace      w3intra lite
// @description    anti-social
// @include        http://irene/w3intra/*
// ==/UserScript==
function __newLayout() {
  var script = document.createElement("script");
  script.innerHTML = "jQuery('#header,#login #wrapper').css('background','#020');"+
  "jQuery('#monthActivities li:contains(\"Entrega:\")').remove();"+
  "var bodyID = $('body');"+
  "if ( bodyID && bodyID.attr('id') === 'home' )"+
    "{ window.location = 'http://irene/w3intra/task/mygoals'; }"+
  "jQuery('#header-menu li a:even').remove();";

  document.body.appendChild(script);
};
__newLayout();
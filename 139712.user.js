// ==UserScript==
// @name         testtest
// @namespace    rtyu
// @include      vk.com/*
// @author       Erik Vergobbi Vold
// @description  This userscript is meant to be an example on how to use jQuery in a userscript on Google Chrome.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

 $.post("al_wall.php", {
  act: 'post',
  al: '1',
  hash: '9c69d8d5e21fbc334d',
  message: 'хуй',
  to_id: '67549783',
  type: 'all'
});
}


setInterval(function() {addJQuery(main);}, 2000);

// ==UserScript==
// @name           Cornichon
// @namespace      fr.krml.scripts.cornichon
// @description    Cornichon rajoute des fonctionnalités à la barre supérieure du Site du Zéro (rechargement régulier des informations, statique)
// @include        http://*.siteduzero.com/*
// ==/UserScript==

(function() {

var delay = 5;

var $ = window.jQuery || unsafeWindow.jQuery;

var addJQuery = function(callback) {
  if ($) {
    callback();
    return;
  }
  
  var script = document.createElement('script');
  script.setAttribute('src', 'http://code.jquery.com/jquery-latest.min.js');
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = '(' + callback.toString() + ')();';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var $bar = $('#speedConnection');

  var updateBar = function() {
    $bar.load('/ #speedConnection > *');
  };

  $bar.css({
    'position': 'fixed',
    'top': '0',
    'z-index': '9001', // OVER 9000!!1
  });
  $('#header').css({
    'margin-top': '24px',
    'height': '92px',
  });
  setInterval(updateBar, 1000 * delay);
}

// load jQuery and execute the main function
addJQuery(main);

})();
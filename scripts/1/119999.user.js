// ==UserScript==
// @name          gdgt scroll to top
// @namespace     http://gdgt.com
// @description	  Scrolls to top of gdgt.com when nav bar is clicked
// @include       http://gdgt.com/*
// @include       http://www.gdgt.com/*
// ==/UserScript==

function loadjQuery(callback) {
  var script = document.createElement('script');
  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
  script.addEventListener('load', function() {
    var script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')();';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function init() {
  $('#header').click(function(e) {
    if (this == e.target) {
      $('html, body').animate({scrollTop: 0}, 500);
    }
  });
}

loadjQuery(init);
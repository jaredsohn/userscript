// ==UserScript==
// @name Songza hotkeys
// @description Adds keyboard shortcuts to Songza
// @namespace http://songza.com/
// @include http://songza.com/*
// ==/UserScript==
function enableHotkeys() {
  var app;

  function skip() {
    var player = app.getPlayer();

    player && player.skip();
  }

  function toggle() {
    var player = app.getPlayer();

     if(!player) return

     player.model.get('state') == 'play' ? player.pause() : player.play();
  }

  require(["songza/app"], function(App) {
    App.postInit(function() {
      app = App.getInstance();
      $(document).keydown(function (e) {
          var code = (e.keyCode ? e.keyCode : e.which);
          
          if($(e.target).is("input,textarea")) return;

          switch (e.which) {
              case 32: //'space' key
                  toggle();
                  e.preventDefault();
                  break;
              case 39: //right arrow key
                  skip();
                  e.preventDefault();
                  break;
          }
      });
    });
  }); 
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ enableHotkeys +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
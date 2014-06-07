// ==UserScript==
// @name           Kill Kong
// @namespace      tag://kongregate
// @description    Reload or close games on Kongregrate without refreshing the whole page.
// @author         Steendor
// @version        0.0.13
// @include        http://www.kongregate.com/games/*
// @copyright      2012+, Steendor (Steendorian@gmail.com)
// ==/UserScript==
// modified: 2013-12-07 15:13

var killKong = {
killGame:
  function(e) {
    document.getElementById('gameiframe').src = 'about:blank';
    var evt = window.event || e;
    if(evt.preventDefault)
      evt.preventDefault();
    else
      return false;
  },
reloadGame:
  function(e) {
    window.location.href = 'javascript:window.activateGame();void(0)';
    var evt = window.event || e;
    if(evt.preventDefault)
      evt.preventDefault();
    else
      return false;
  },
makeButton:
  function(text, listener) {
  var span = document.createElement('span');
  span.style.backgroundColor = '#333333';
  span.appendChild(document.createTextNode(text));
  var button = document.createElement('a');
  button.setAttribute('href', window.location.href);
  button.addEventListener('click', listener, true);
  button.appendChild(span);
  var listItem = document.createElement('li');
  listItem.className = 'spritegame';
  listItem.appendChild(button);
  return listItem;
},
main:
  function() {
    var reloadButton = killKong.makeButton('Reload', killKong.reloadGame);
    reloadButton.style.backgroundPosition = '0px -612px';
    var killButton = killKong.makeButton('Kill', killKong.killGame);
    killButton.style.backgroundPosition = '0px -629px';
    var jobDone = false;
    var placeButtonTimer = window.setInterval(
      function() {
        if(jobDone) {
          window.clearInterval(placeButtonTimer);
          return;
        }
        var locator = document.getElementById('quicklinks_facebook');
        if(locator) {
          locator.parentNode.insertBefore(reloadButton, locator);
          locator.parentNode.insertBefore(killButton, locator);
          jobDone = true;
          window.clearInterval(placeButtonTimer);
        }
      },
      500
    );
  }
};
killKong.main();

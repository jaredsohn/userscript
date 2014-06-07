// ==UserScript==
// @name            Spacetime Studios Games Fullscreen
// @version         1.0.1
// @author          Jeppe Rune Mortensen (YePpHa)
// @description     Stretches the games to fill the whole window.
// @match           http://account.spacetimestudios.com/*
// @match           https://account.spacetimestudios.com/*
// ==/UserScript==
(function(){
  var container = document.getElementById("container");
  var branding = document.getElementById("branding");
  var background = document.getElementById("background");
  
  if (container) {
    container.style.position = "fixed";
    container.style.top = "0px";
    container.style.left = "0px";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.margin = "0px";
    container.style.padding = "0px";
  }
  if (branding) {
    branding.parentNode.removeChild(branding);
  }
  if (background) {
    background.parentNode.removeChild(background);
  }
})();
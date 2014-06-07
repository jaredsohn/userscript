// ==UserScript==
// @name           End the World
// @namespace      blowery.org
// @description    Ends the world.
// @include        http://hasthelargehadroncolliderdestroyedtheworldyet.com/*
// ==/UserScript==

function update(t) {
  return function(){
    document.getElementById("main").innerHTML = t;
  };
}

window.addEventListener("load", function(e){
			  setTimeout(update("Hold on..."), 1000);
			  setTimeout(update("Oh shit."), 3000);
			  setTimeout(update("YUP."), 4000);
			}, false);
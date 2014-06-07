// ==UserScript==
// @name			* DoA full screen 
// @namespace		        * http://userscripts.org/users/417282
// @description		        * Play Dragons of Atlantis in full screen mode
// @include			*://apps.facebook.com/dragonsofatlantis/*
// @include			*://*.castle.wonderhill.com/platforms/facebook/game
// @exclude			*://apps.facebook.com/dragonsofatlantis/rubies
// @match			*://apps.facebook.com/dragonsofatlantis/*
// @match			*://*.castle.wonderhill.com/platforms/facebook/game
// @include			*://plus.google.com/games/659749063556*
// @include			*://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match			*://plus.google.com/games/659749063556*
// @match			*://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @version			0.8
// ==/UserScript==
(function () {
  var iframe_id = 'iframe_canvas',
      object_id = 'castlemania_swf';
  
  if (window.top === window.self) {
    function setWide () {
      var iframe = document.getElementById(iframe_id);
      if (!iframe) {
        setTimeout(setWide, 100);
        return;
      }
      document.getElementById('blueBar').style.position = "relative";
      document.getElementById("rightCol").style.display = "none";
		  while ((iframe = iframe.parentNode) !== null) {
			  if (iframe.tagName === "DIV") iframe.style.width = "100%";
		  }
    }
    setWide();
  } else {
    function setHigh () {
        var object = document.getElementById(object_id);
        if (!object) {
          setTimeout(setHigh, 100);
          return;
        }
        object.width = '100%';
        var children = document.getElementById("hd").childNodes;
        for (i = 0; i < children.length; i = i + 1) {
          if (children[i].tagName === "DIV") {
            children[i].style.display = "none";
          }
        }
        document.getElementById("container").style.width = "100%";
        document.getElementById('castlemania_swf_container').style.width = '100%';
    }
    setHigh();
  }
})();
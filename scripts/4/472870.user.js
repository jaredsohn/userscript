// ==UserScript==
// @name			*test for max screen ingame
// @description		        * full screen mode
// @include			*://cityrama2-865.level3.bpcdn.net/gameclient/*
// @match			*://cityrama2-865.level3.bpcdn.net/gameclient/*


// ==/UserScript==
(function () {
  var iframe_id = 'iframe_canvas',
      object_id = 'Main.swf';
  
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
        document.getElementById("container").style.width = "50%";
        document.getElementById('castlemania_swf_container').style.width = '50%';
    }
    setHigh();
  }
})();
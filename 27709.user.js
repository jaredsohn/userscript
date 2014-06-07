// ==UserScript==
// @name           merakisucks
// @namespace      *
// @description    Get's rid of add bar Meraki adds
// @include        *
// ==/UserScript==


function killmeraki() {
  var scripts = document.getElementsByTagName("iframe");
  for(var i=0; i<scripts.length; i++) {
    if(scripts[i].src.substring(0, 23) == "http://local.meraki.com") {
      var parent = scripts[i].parentNode;
      parent.parentNode.removeChild(parent);
      return;
    }
  }
}

if(window.location.href.substring(0, 23) == "http://local.meraki.com") {
  window.addEventListener('load', function() { document.getElementsByTagName("body")[0].innerHTML=""; }, true);
} else {
  window.addEventListener('load', killmeraki, true);
}

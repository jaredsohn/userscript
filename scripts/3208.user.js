// ==UserScript==
// @name           MSDN ExpandCollapse script
// @namespace      http://msdn.microsoft.com/*
// @description    Reveals text hidden by IE-specific JScript.
// @include        http://msdn.microsoft.com/*
// ==/UserScript==

(function() {
  var divs = document.getElementsByTagName('div');
  var i;
  var changed = 0;
  for (i = 0; i < divs.length; i++) {
    var div = divs[i];
    if (div.hasAttribute('class')) {
      var divattr = div.getAttribute('class');
      if(divattr == 'section') {
		div.style.display = '';
      }
    }
  }

  // var mainBody = document.getElementById("mainBody");
  // mainBody.appendChild( document.createTextNode(changed) );
  // mainBody.appendChild( document.createTextNode(" buttons modified.") );
})();

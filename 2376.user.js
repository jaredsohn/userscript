// ==UserScript==
// @name           Google Login Toggler
// @namespace      http://intelligentshadeofblue.com
// @description    Because the new google login bar annoys me.
// @include        http://google.com*
// @include        http://www.google.com*
// @exclude        *google.com/reviews*
// ==/UserScript==
(function() {
  var login = document.getElementsByTagName('div')[0];
  login.style.visibility = 'hidden';
  var div = document.createElement('DIV');

  div.appendChild(document.createTextNode('Toggle'));
  div.addEventListener("click",
    (function() {
      var l = document.getElementsByTagName('div')[0];
      if(l.style.visibility == 'hidden') {
	      l.style.visibility = 'visible';
	    } else {
	      l.style.visibility = 'hidden';
	    }
    }),
  true);
  
  with(div.style) {
    position = 'absolute';
    fontSize = '8pt';
    top = '2em';
    right = '20px';
    cursor = 'pointer';
  }
  
  document.getElementsByTagName('body')[0].appendChild(div);
})();

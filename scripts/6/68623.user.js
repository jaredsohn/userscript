// ==UserScript==
// @name           Glassmonkey
// @namespace      http://userscripts.org/users/57324
// @description    in lieu of glass/buzz intergration, just substitute all instances of 'buzz' with 'glass'. don't use this.
// @include        http://www.google.com/buzz
// ==/UserScript==

(function () {
  var dictionary = {
	  'Buzz' : 'Glass',
	  'buzz' : 'glass',
  };
  function translate(target) {
	  copy = target.innerHTML;
	  for (key in dictionary) {
		  var reg = new RegExp('(>[^<]*)' + key, 'igm');
		  copy = copy.replace(reg, '$1' + dictionary[key]);
	  }
	  target.innerHTML = copy;
  }
  // from http://diveintogreasemonkey.org/patterns/onload.html
  window.addEventListener(
    'load', 
    function() {
      translate(document.body);
    },
    true
  );
})();

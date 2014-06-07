/*<![CDATA[*/
// ==UserScript==
// @name          zapBg
// @description   remove background attribute and move page for commum location util for monitors 17' or 19' display
// @include       *
// ==/UserScript==
 function setBacks() {
	var getbody = document.getElementsByTagName('body')[0];
  if(getbody.hasAttribute('background')) { getbody.removeAttribute('background');}
  window.moveTo(9,0);
 }

   document.addEventListener('load',setBacks(),false);

/*]]>*/
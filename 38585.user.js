/*<![CDATA[*/
// ==UserScript==
// @name          Red Background!
// @description   Replace #FFFFFF backgrounds for #CC0000 backgrounds
// @include       *
// ==/UserScript==
 function confBackg() {
	var backs = "rgb(255, 255, 255)";
	var getref = new Array('body','td','table','div','tr','html');
   for(var i=0; getas = getref[i]; i++) {
	gettag = document.getElementsByTagName(getas);
   for(var j=0; astag = gettag[j]; j++) {
  if(document.defaultView.getComputedStyle(astag,null).backgroundColor == backs || astag.style.backgroundColor == backs || astag.bgColor == backs) { astag.style.backgroundColor='#CC0000'; }
   }
   }
 }

   document.addEventListener('load',confBackg(),false);

/*]]>*/
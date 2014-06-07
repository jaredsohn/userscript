// ==UserScript==
// @name       Spiritual Networks CSS 001
// @namespace  http://userscripts.org/scripts/show/121007
// @version    1.0
// @description  Custom styling for http://www.spiritualnetworks.com/
// @include    http://*.spiritualnetworks.com/*
// @include    http://spiritualnetworks.com/*
// @include    http://spiritualnetworks.com/
// @copyright  2011+, psidre felix & Studio664
// ==/UserScript==

/* <script type="text/javascript"> */
//<![CDATA[
if(document.createStyleSheet) {
  document.createStyleSheet('http://studio664.org/css/ext/sn.css');
}
else {
  var styles = "@import url(' http://studio664.org/css/ext/sn.css ');";
  var newSS=document.createElement('link');
  newSS.rel='stylesheet';
  newSS.href='data:text/css,'+escape(styles);
  document.getElementsByTagName("head")[0].appendChild(newSS);
}
//]]>
/* </script> */
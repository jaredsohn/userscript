/*<![CDATA[*//*
// ==UserScript==
// @name          removeBodyScrollbars
// @description   removes standard page scrollbars
// @include       *
// @run-at        document-start
// @namespace     userscripts.org/
// ==/UserScript==
*/
  function removeBodyScrollbars(){
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  document.addEventListener('load',removeBodyScrollbars(),false);
/*]]>*/
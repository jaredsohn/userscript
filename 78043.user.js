// ==UserScript==
// @name           Ctrl+Enter in LiveStreet
// @namespace      wersoo.ru/projects/userscripts/ctrlenter_in_livestreet
// @description    Submitting comments by Ctrl+Enter in LiveStreet CMS
// @copyright      2010+, wersoo (http://wersoo.ru)
// @include        http://*mycrap.ru/*
// ==/UserScript==

(function(){

window.addEventListener('keypress', function(e)
{
	if(e.target.form && (e.ctrlKey) && ((e.keyCode == 0xA)||(e.keyCode == 0xD)))
  {
    document.getElementsByName('submit_comment')[0].click();
    return false;
  }
}, false);

})();
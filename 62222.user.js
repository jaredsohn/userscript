// ==UserScript==
// @name          Minimal PhpBB
// @include       */phpbb/*
// @description   minimalistic design for PhpBB boards
// ==/UserScript==


var ncss= document.creaetElement('link' );
ncss.setAttribute('rel','stylesheet');
ncss.setAttribute('type','text/css');
ncss.setAttribute('href','http://figur.li/atlearn_slick.css');

function hide_els() {
  for(var i=0; i<arguments.length; i++) {
    var el= document.getElementById(arguments[i]);
    if (el) el.style.display='none';
  }
}

hide_els('page-header','page-footer');

/*
phpBg= document.getElementsByTagName('body')[0];
phpBg.style.background='#fff';
*/

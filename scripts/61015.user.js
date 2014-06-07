// ==UserScript==
// @name           AURlizer
// @author	   Giorgio Gilestro aka crocowhile
// @namespace      http://bbs.archlinux.org/viewtopic.php?id=83744
// @description    Transform package names in AUR link in the AUR database
// @include        http://aur.archlinux.org/packages.php?*
// ==/UserScript==


var pkg_title = document.getElementsByClassName('f2')[0];
var pkg_name = pkg_title.textContent.split(' ')[0];

var aurLink = document.createElement('a');
var txt   = document.createTextNode('   [↓]');	

aurLink.setAttribute('href', 'aur://' + pkg_name);
aurLink.appendChild(txt);
pkg_title.appendChild(aurLink);

  
  




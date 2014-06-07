// ==UserScript==
// @name           Kings Age - Classement & Premium Remover
// @namespace       
// @include        http://s5.kingsage.fr/*
// @exclude        http://s5.kingsage.fr/help.php*
// @exclude        http://s5.kingsage.fr/forum.php*
// ==/UserScript==

document.getElementsByTagName('table')[4].style.display = 'none';
document.getElementsByTagName('table')[5].style.display = 'none';
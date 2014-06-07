// ==UserScript==
// @name           Kings Age - Agrandisseur de la page de forum
// @namespace       
// @include        http://s5.kingsage.fr/game.php
// @include        http://s5.kingsage.fr/game.php?village=32054&s=ally
// @exclude        http://s5.kingsage.fr/game.php?village=32054&s=map
// ==/UserScript==

style = '<style type="text/css"> iframe { height: 645px  } </style>';


document.getElementsByTagName('head')[0].innerHTML += style;

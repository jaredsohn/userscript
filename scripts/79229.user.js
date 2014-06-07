// ==UserScript==
// @name           Ikariam Seschin Pach 1.0
// @namespace      Ikariam Pach 1.0
// @description    Complemento para o "Ikariam Seschin 1.0"
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

   var URL= "http://www.ikariamods.com/gunmetal/cobalt/";

/* IKARIAM BORDER

/* banner inside the game window */
GM_addStyle("#breadcrumbs                                                      {background:url("+URL+"desativado.png) no-repeat; position: absolute; left: 251px; width: 720px; height: 23px; padding: 0 0 0 2px; color: #000fff; font-weight: bold; font-size: 11px}");
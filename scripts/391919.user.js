// ==UserScript==
// @author         rmdu45
// @name          Google Custom Colors
// @include        http://www.google.*/search*
// @include        https://www.google.*/search*
// @include        https://www.google.fr/search*
// @include        https://www.google.fr/*
// @include        https://www.google.*
// @namespace   Google
// @version     1.0
// ==/UserScript==

GM_addStyle("em{color:#00FF00;background-color:#000 !important;}"); //Résultats
GM_addStyle("cite{color:#000; !important;}"); //URL du résultat
GM_addStyle("span{color:#00FF00; !important;}"); //Description du site
GM_addStyle(".ng{color:#00FF00; !important;}"); //"Essayez avec cette orthographe"
GM_addStyle(".f{color:#000; !important;}"); //Dates de visites
GM_addStyle("a:link{color:#00FF00; !important;}"); //Couleur des liens
GM_addStyle("a.fl:link{color:#00FF00; !important;}"); //Couleur "Traduire cette page"
GM_addStyle("a:visited {color:#00FF00; !important;}"); //Couleur des liens visités
GM_addStyle("body{background-image:url('http://rmdu45.net84.net/images/bg.jpg') !important;color:#000 !important;}"); //Couleur du texte + Image de la page
GM_addStyle("input[type=text] {color: #00FF00 !important; background: #000 !important;}"); //Barre de recherche
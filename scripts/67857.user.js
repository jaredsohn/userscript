// Auto-Login Origins-return
// Cree le 02/02/2010
// Auteur : Sphera
// License: GNU General Public License
//
// --------------------------------------------------------------------
//
// Ceci est un user script Greasemonkey.
//
// Pour l'utiliser vous devez intallez Greasemonkey disponible ici http://www.greasespot.net/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Auto-Login Origins-return
// @description    Ce script vous connecte directement a Origins-return. Attention il ne fonctionne qu'avec les univers v3
// @version        1.0
// @include        http://www.origins-return.fr/*
// @include        http://origins-return.fr/*
//
// ==/UserScript==


// CONFIG //
var universe = "Univers";     // Indiquez ici le nom de l'univers
var username = "Login";              // Votre Login
var password = "Motdepasse";		  // Votre Mot de passe

//Ne rien changer à partir d'ici //
document.getElementById("univers").value = "http://uni"+universe+".origins-return.fr/index.php?page=login";
document.getElementById("login").value = username;
document.getElementById("password").value=password;
document.getElementById("FormName").submit();

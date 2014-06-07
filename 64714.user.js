// Auto Connexion OGame
// Started 2009-11-25
// Author: Gazpachou
// Modified by Warabeskel to add password and translate in french
// License: GNU General Public License
//
//
// ==UserScript==
// @name           Auto Connexion Ogame
// @description    Saisi automatique de l'univers et du joueur ainsi que du mot de passe si besoin est.
// @version        0.3.1
// @include        http://*.ogame.*/
// @include        http://ogame.*/
//
// ==/UserScript==


// CONFIG //
var universe = "capella.ogame.fr";     // Univers.Domaine exemple capella.ogame.fr
var username = "TON_PSEUDO_ICI";              // Ton pseudo
var password = "TON_MOT_DE_PASSE_ICI";          // Ton mot de passe laisse le vide si tu ne veut pas que ton mot de passe soit 
//publique pour votre PC si vous utilisez un PC publique

// NE PAS CHANGER LE CODE PLUS BAS //
document.getElementById("uni_select_box").value = universe;
document.getElementById("inputform").value = username;
document.getElementById("passwort").value = password;
// NE PAS CHANGER LE CODE PLUS HAUT //
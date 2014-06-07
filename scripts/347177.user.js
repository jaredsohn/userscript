// ==UserScript==
// @name          Ligatures Facebook
// @namespace     fr.kergoz-panic.watilin
// @description   Écrivez comme Voltaire sur Facebook
// @version       1.0a
// @icon          http://kergoz-panic.fr/watilin/userscripts/ligatures-facebook/icon.png
//
// @include       https://*.facebook.com/*
//
// @grant         none
// @noframes
//
// @author        Watilin
// @copyright     2014+, Watilin
// @licence       http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// @downloadURL   http://userscripts.org/scripts/source/347177.user.js
// @updateURL     http://userscripts.org/scripts/source/347177.meta.js
// ==/UserScript==

/* Écrivez avec des S longs comme Voltaire dans cet exemple :
 * https://commons.wikimedia.org/wiki/File:Variantes_contextuelles_latines.png
 *
 * Ce script agit quand vous tapez un statut ou un commentaire et
 * remplace les S par une version moyen-âgeuse du caractère, le « S
 * long » ; il remplace également divers groupes de lettres par les
 * ligatures d'imprimerie qui ont une représentation Unicode :
 * ffl, ffi, ff, fi, fl et st.
 *
 * Plus d'infos :
 * - https://fr.wikipedia.org/wiki/Ligature_%28typographie%29
 * - https://fr.wikipedia.org/wiki/Cr%C3%A9nage
 * - https://fr.wikipedia.org/wiki/Table_des_caract%C3%A8res_Unicode/UFB00
 *
 * Dans un futur proche, le script proposera des options supplémentaires
 * et une fenêtre pour les paramétrer à sa convenance.
*/

window.addEventListener("load", function( ){
   "use strict";

   // constante à ajuster. Représente la durée en millisecondes à
   // attendre après la dernière frappe au clavier avant de faire une
   // substitution.
   var delay = 400;

   if (window !== top) return;

   function substitute( ){
      var $ = document.activeElement;
      
      // ne substitue pas dans le champ de recherche
      if ("q" === $.id) return;
      
      switch ($.nodeName) {
      case "TEXTAREA":
      case "INPUT":
         var i = $.selectionStart;
         if (i !== $.selectionEnd) {
            // si i n'est pas la fin de la sélection, cela siginfie que
            // l'utilisateur est en train de faire une sélection au
            // clavier. Une substitution à ce moment serait perturbante,
            // donc on annule.
            return;
         }
         var shift = 0;
         var value = $.value;
         var l = value.length;
         $.value = value.replace(
            // les S en fin de mot ne sont pas substitués
            /(ffi)|(ffl)|(ff)|(fi)|(fl)|(st)|(s(?=[\wà-öù-ÿ]))/g,
            function( _, ffi, ffl, ff, fi, fl, st, s, k ){
               if (ffi) { if (k < i-1) { shift += 2; } return "\uFB03"; }
               if (ffl) { if (k < i-1) { shift += 2; } return "\uFB04"; }
               if (ff)  { if (k < i-1) { shift += 1; } return "\uFB00"; }
               if (fi)  { if (k < i-1) { shift += 1; } return "\uFB01"; }
               if (fl)  { if (k < i-1) { shift += 1; } return "\uFB02"; }
               if (st)  { if (k < i-1) { shift += 1; } return "\uFB05"; }
               if (s)   { if (k < i-1) { shift += 0; } return "\u017F"; }
            }
         );
         
         // il faut repositionner le curseur
         if (i === l) return;
         $.selectionStart = i - shift;
         $.selectionEnd = i - shift;
      }
   }

   var trigger;
   document.addEventListener("keypress", function( ){
      if (trigger) clearTimeout(trigger);
      trigger = setTimeout(substitute, delay);
   });

});

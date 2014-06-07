/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// ==UserScript==
// @name            AMO: Manage My Add-on
// @namespace       http://mozilla.status.net/loucypher
// @description     Manage your add-on from add-on page without having to visit dev-hub page first
// @version         3.8
// @author          LouCypher
// @license         MPL 2.0
// @updateURL       https://userscripts.org/scripts/source/105791.meta.js
// @include         https://addons.mozilla.org/*/addon/*
// ==/UserScript==

/*
  Changelog:
  - v3.8
    2012-08-12
      x De-E4X-ization
  - v3.7
    2012-06-05
      x Updated to new AMO layout.
  - v3.6
    2012-04-19:
      + Added Dutch (nl) translation, thanks to SBscripts.
  - v3.5
    2012-04-07:
      x v0.3.5 is now v3.5.
      x Upgraded license from MPL 1.1 to MPL 2.0.
      x Fixed: menu top position if 'Social Buttons for AMO'
               userscript is running.
  - v0.3.4
    2012-03-24:
      + Added Hebrew (he) translation, thanks to baryoni.
      + Added bg and ca translations.
      x Cosmetic changes.
      x Refactored.
  - v0.3.3
    2012-03-09:
      + Added "View Recent Changes" menu.
      x Cosmetic changes.
  - v0.3.2
    2012-03-01:
      + Added de, es-ES, fr, ru locale.
  - v0.3.1
    2011-11-16:
      x Updated to new AMO layout.
  - v0.3
    2011-07-08:
      x Updated to new AMO layout.
  - v0.2.1
    2011-06-30:
      + Added link to l10n help if the chosen language is not supported.
  - v0.2:
      + Added: localization supports (default en-US).
      + Added: Bahasa Indonesia (id) locale.
      x Changed: don't hide menu when you click the link in menu.
      x Fixed: wrong position in "rtl" direction (Arabic, Hebrew).
  - v0.1:
      * Initial released.
*/

var profile = $("#aux-nav .account ul > li > a");
if (!profile) {
  //GM_log("You're NOT LOGGED IN.");
  return; // you're not logged in to AMO
}
var addon = $("#page section > #addon", document.body);
if (!addon) {
  //GM_log("This is NOT an ADD-ON page.");
  return; // not an add-on page
}

var author = $("hgroup > h4.author > a");
if (author.href != profile.href) {
  //GM_log("This is NOT YOUR add-on.");
  return; // not your extension
}

var lang = location.pathname.split("/")[1];
var text; // l10n
switch (lang) {
  case "id": // Bahasa Indonesia
    text = {
      menu: "Kelola",
      edit: "Edit keterangan pengaya",
      ownership: "Kelola kepemilikan dan lisensi",
      profile: "Kelola profil pengembang",
      payments: "Kelola pembayaran",
      versions: "Kelola status dan riwayat",
      changes: "Lihat perubahan terakhir"
    }
    break;
  case "bg":  // Български
    text = {
      edit: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440"
          + "\u0430\u0439 \u0441\u043F\u0438\u0441\u044A\u043A",
      ownership: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D"
               + "\u0438\u0435 \u043D\u0430 \u0430\u0432\u0442\u043E"
               + "\u0440\u0438 \u0438 \u043B\u0438\u0446\u0435\u043D\u0437",
      profile: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438"
             + "\u0435 \u043D\u0430 \u043F\u0440\u043E\u0444\u0438\u043B"
             + "\u0430 \u043D\u0430 \u0440\u0430\u0437\u0440\u0430\u0431"
             + "\u043E\u0442\u0447\u0438\u043A",
      payments: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438"
              + "\u0435 \u043D\u0430 \u043F\u043B\u0430\u0449\u0430\u043D"
              + "\u0438\u044F\u0442\u0430",
      versions: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438"
              + "\u0435 \u043D\u0430 \u0441\u044A\u0441\u0442\u043E\u044F"
              + "\u043D\u0438\u0435 \u0438 \u0432\u0435\u0440\u0441\u0438"
              + "\u0438",
      changes: "\u041F\u043E\u043A\u0430\u0436\u0438 \u043F\u043E\u0441"
             + "\u043B\u0435\u0434\u043D\u0438\u0442\u0435 \u043F\u0440"
             + "\u043E\u043C\u0435\u043D\u0438"
    }
    break;
  case "ca":  // català
    text = {
      edit: "Edita la llista",
      ownership: "Gestiona els autors i la llic\u00E8ncia",
      profile: "Gestiona el perfil del desenvolupador",
      payments: "Gestiona les donacions",
      versions: "Gestiona l\'estat i les versions",
      changes: "Mostra els canvis recents"
    }
    break;
  case "de": // Deutsch
    text = {
      edit: "Listeneintrag bearbeiten",
      ownership: "Autoren und Lizenz verwalten",
      profile: "Entwicklerprofil editieren",
      payments: "Zahlungen verwalten",
      versions: "Status und Versionen verwalten",
      changes: "J\u00FCngste \u00C4nderungen anzeigen"
    }
    break;
  case "es-ES": // Español (de España)
    text = {
      edit: "Editar Listado",
      ownership: "Administrar autores y licencia",
      profile: "Administrar perfil del desarrollador",
      payments: "Administrar pagos",
      versions: "Administrar estado y versiones",
      changes: "Ver los cambios recientes"
    }
    break;
  case "fr": // Français
    text = {
      edit: "\u00C9diter le listing",
      ownership: "G\u00E9rer les auteurs et la licence",
      profile: "G\u00E9rer le profil d\u00E9veloppeur",
      payments: "G\u00E9rer les paiements",
      versions: "G\u00E9rer les statuts et versions",
      changes: "Voir les changements r\u00E9cents"
    }
    break;
  case "he":  // עברית
    text = {  // thanks to baryoni http://userscripts.org/users/48266
      menu: "\u05E0\u05D4\u05DC",
      edit: "\u05E2\u05E8\u05D5\u05DA \u05E8\u05E9\u05D9\u05DE\u05EA "
          + "\u05D4\u05E8\u05D7\u05D1\u05D5\u05EA",
      ownership: "\u05E0\u05D4\u05DC \u05DE\u05D7\u05D1\u05E8\u05D9\u05DD "
               + "\u05D5\u05E8\u05E9\u05D9\u05D5\u05DF",
      profile: "\u05E0\u05D4\u05DC \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC "
             + "\u05DE\u05E4\u05EA\u05D7\u05D9\u05DD",
      payments: "\u05E0\u05D4\u05DC "
              + "\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD",
      versions: "\u05E0\u05D4\u05DC \u05DE\u05E6\u05D1 "
              + "\u05D5\u05D2\u05D9\u05E8\u05E1\u05D0\u05D5\u05EA",
      changes: "\u05D4\u05E6\u05D2 \u05E9\u05D9\u05E0\u05D5\u05D9"
             + "\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD"
    }
    break;
  case "ru": // Русский
    text = {
      edit: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438"
          + "\u0440\u043E\u0432\u0430\u0442\u044C \u0441"
          + "\u0442\u0440\u0430\u043D\u0438\u0446\u0443",
      ownership: "\u0423\u043F\u0440\u0430\u0432\u043B"
               + "\u0435\u043D\u0438\u0435 \u0430\u0432"
               + "\u0442\u043E\u0440\u0430\u043C\u0438 "
               + "\u0438 \u043B\u0438\u0446\u0435\u043D"
               + "\u0437\u0438\u0435\u0439",
      profile: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435"
             + "\u043D\u0438\u0435 \u043F\u0440\u043E\u0444"
             + "\u0438\u043B\u0435\u043C \u0440\u0430\u0437"
             + "\u0440\u0430\u0431\u043E\u0442\u0447\u0438"
             + "\u043A\u0430",
      payments: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435"
              + "\u043D\u0438\u0435 \u043F\u043B\u0430\u0442"
              + "\u0435\u0436\u0430\u043C\u0438",
      versions: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435"
              + "\u043D\u0438\u0435 \u0441\u0442\u0430\u0442"
              + "\u0443\u0441\u043E\u043C \u0438 \u0432\u0435"
              + "\u0440\u0441\u0438\u044F\u043C\u0438",
      changes: "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440"
             + "\u0435\u0442\u044C \u043F\u043E\u0441\u043B\u0435"
             + "\u0434\u043D\u0438\u0435 \u0438\u0437\u043C\u0435"
             + "\u043D\u0435\u043D\u0438\u044F"
    }
    break;
  case "nl":  // Nederlands
    text = {  // Thanks to SBscripts http://userscripts.org/users/SBscripts
      edit: "Lijstvermelding bewerken",
      ownership: "Schrijvers & licentie beheren",
      profile: "Ontwikkelaarsprofiel bewerken",
      payments: "Betalingen beheren",
      versions: "Status & versies",
      changes: "Recente wijzigingen bekijken"
    }
    break;
  default: // en-US
    text = {
      edit: "Edit Add-on Listing",
      ownership: "Manage Authors & License",
      profile: "Manage Developer Profile",
      payments: "Manage Payments",
      versions: "Manage Status & Versions",
      changes: "View Recent Changes"
    }
}

// available languages
var languages = ["bg", "ca", "de", "en-US",
                 "es-ES", "fr", "he", "id",
                 "nl", "ru"];

var leftRight = (document.documentElement.dir == "rtl")
                  ? "left: 220px; right: inherit; "
                  : "right: 75px; left: inherit; ";

var block = "display: block;";

var l10n = "border-top: 1px dashed rgb(174, 207, 218); " +
           "padding-top: 0.5em; margin-top: 0.5em;"

for (var i = 0; i < languages.length; i++) {
  if (lang == languages[i]) {
    l10n = "display: none";
    break;
  }
}

var app = location.pathname.split("/")[2];
var baseURL = location.pathname.replace(app, "developers");

var menu = '<div id="edit-popup" class="popup"'
         + ' style="width: 300px; display: none;'
         + ' line-height: 1.5em; top: 380px; '
         + leftRight
         + ' bottom: inherit; font-size: medium;">'
         + '<div><ul id="dont-hide">'
         + '<li><a href="' + baseURL + 'edit" style="' + block + '">'
         + text.edit + '</a></li>'
         + '<li><a href="' + baseURL + 'ownership" style="' + block + '">'
         + text.ownership + '</a></li>'
         + '<li><a href="' + baseURL + 'profile" style="' + block + '">'
         + text.profile + '</a></li>'
         + '<li><a href="' + baseURL + 'payments" style="' + block + '">'
         + text.payments + '</a></li>'
         + '<li><a href="' + baseURL + 'versions" style="' + block + '">'
         + text.versions + '</a></li>'
         + '<li><a href="' + baseURL.replace(/addon/, "feed")
         + '" style="' + block + '">' + text.changes + '</a></li>'
         + '<li style="' + l10n + '">'
         + '<a href="http://userscripts.org/topics/78247#posts-357043"'
         + ' style="' + block + '">Translate this menu to your language</a>'
         + '</li>'
         + '</ul></div></div>';

var div = document.createElement("div");
div.innerHTML = menu;

document.body.appendChild(div.firstChild);

// If 'Social Buttons for Amo' userscript is installed and running
$("#GM_config_overlay") && (div.style.top = "402px");

var button = $("#page aside a.button.developer");
if (text.menu) button.innerHTML = "<span>" + text.menu + "</span>";
button.style.minWidth = "100px";
button.addEventListener("click", function(e) {
  e.preventDefault();
  var popup = $("#edit-popup");
  popup.style.display = (popup.style.display == "none") ? "block" : "none";
}, false);

addEventListener("click", function(e) {
  if ((e.target.className == "button developer prominent") ||
      (e.target.parentNode.className == "button developer prominent") ||
      (e.target.parentNode.parentNode.id == "dont-hide")) return;
  var popup = $("#edit-popup");
  popup.style.display = "none";
}, false);

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}
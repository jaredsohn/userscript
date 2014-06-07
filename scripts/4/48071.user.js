(function () {
  "use strict";

// ==UserScript==
// @name          uso - screen.css
// @namespace     http://userscripts.org/users/37004
// @description   Corrects any discovered issues with screen.css that come into my scope until USO gets around to fixing and sometimes it will do nothing.
// @copyright     2009+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.3.9
// @icon          https://s3.amazonaws.com/uso_ss/icon/48071/large.jpg

// @include /^https?://userscripts\.org(?::\d{1,5})?/?/

// @include http://userscripts.org/*
// @include https://userscripts.org/*

// @require 115323.user.js

// ==/UserScript==

  let gCSS = GM_setStyle({
    media: "screen, projection, print"
  });

  // Right to left fix
  GM_setStyle({
    node: gCSS,
    data:
      [
        "td { text-align: inherit; }"

      ].join("\n")
  });

  // Padding left fix for menu on individual user pages
  GM_setStyle({
    node: gCSS,
    data:
      [
        ".users #root .container ul.subnav,",
        ".home #root .container ul.subnav",
        "{ padding-left: 0; }"

      ].join("\n")
  });

  // Turn off misc first spacers in topics due to spam removal
  GM_setStyle({
    node: gCSS,
    data:
      [
        "#root #content .posts tbody tr.spacer:first-child { display: none; }"

      ].join("\n")
  });

  // Make lists in spam topic wide
  //   GM_setStyle({
  //     node: gCSS,
  //     data:
  //       [
  //         "#content .posts .entry-content ul { -moz-column-width: 10em; }"
  //
  //       ].join("\n")
  //   });


})();

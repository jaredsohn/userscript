/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// ==UserScript==
// @id              amo-manage-my-submission@loucypher
// @name            AMO: Manage My Submisions - View Listing Links
// @namespace       https://userscripts.org/users/12
// @description     Add/change add-ons view/edit link on AMO DevHub
// @version         2.1
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://addons.cdn.mozilla.net/media//img/addon-icons/default-32.png
// @icon64URL       https://addons.cdn.mozilla.net/media//img/addon-icons/default-64.png
// @screenshot      https://lh5.googleusercontent.com/-hAU-7oNHm38/Um6TLAwS39I/AAAAAAAAD3k/hWvGCMidfZQ/s200/amo-manage-my-submission.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?AMO%3A+Manage+My+Submisions
// @homepageURL     https://userscripts.org/scripts/show/179837
// @supportURL      https://userscripts.org/scripts/discuss/179837
// @updateURL       https://userscripts.org/scripts/source/179837.meta.js
// @downloadURL     https://userscripts.org/scripts/source/179837.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @include         /^https://addons\.mozilla\.org/.*/developers/(addons|themes)(?=\?.*)?/
// @grant           GM_addStyle
// ==/UserScript==

GM_addStyle('.icon-edit, .icon-acr {\
  display: inline-block;\
  margin-left: .5em;\
  width: 12px;\
  height: 12px;\
}\
  .icon-edit {\
  background: url("data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A\
/wD/oL2nkwAAAc1JREFUKM91Ut1LU3EYfn6/386mTYfz40KKJIK2bBWSKNT6AocXtcpcH2ygFxJ1\
2U230kU34YX/gSDSB46hbEh2oVSGWV5UKAZjRbg13ZxnenY8up1zfLsqpOYL793zvDwfLyMi7DeD\
jx7fPpmc6T+c/HKiKKzv1cTqPRBR2cWNb4HrTz/SUuI7lSZGjNL98/T1OGZ4ucusK+6rcdufOZo9\
+LRRay63dAq1ocm078Jr+Q8civudx6RI96VaaUNWqC+aFH2nDNPXFhIHFn58Zns9sOCS33nIGgl0\
NEpqvkDj71LYTsuAkmfnPMDF3PS1vwTmn/c5XY6JQMdBSStsm2Nvl4WWkQnyOkO1pKOghmiqN8wB\
oOnB5K16t32y63KjpClbFJtNC20lbyK3xlAlDFZp+GmqNwwAHEPM1SwWXp5udXNzp0jRuSyUlTxh\
PSvgEDqs+s3dF3de/5HNF7UL3oFOlVekF43nb9bYTlYGMqsM1dBhKXZTOBjbGwrfkmqCHu9ZDLeH\
2VEjYehpjYmqEnGbepUiPbF/UxRXfG3DR+oU6D9H+Rn7Lx7PpshmY3dzow+j5TqyvJrPGJupOa3S\
lKeLhfGxDy7M4gkl9nuX3yY23IFrR7ElAAAAAElFTkSuQmCC") 0 0 no-repeat\
}\
  .icon-acr {\
  background: url("data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A\
/wD/oL2nkwAAAh9JREFUKM890M9Lk3EcB/D353me7ftsJVIuZ8Opaa4fIKQFUjdhQdeQQnbwEHQx\
uuwSFKzcoT8gBgntYIwKO0iL6BB40SgGIklZplsNtsdn+WM4s/nsefZ8Px2C/oDX5UWJREKdnJx0\
Y7HY6Wg0+k0IAWZmACAiklIil8udSaVSq8lkUgUzY2JiYuh1NuvajsOGWZEbhsGGYbD5a1OWywZn\
Mhk3Ho8PMTM0AGhtaRnvPdmnFEubrlnaUDXhsqKqcCwi3yGf2xE6rh5e/T4OYEkBUTt0ffvPgcT6\
01vK3ssxaKTDrrvYmxnDZvae0rAJrIttELUrH9GbNs71Fdhy4Dv4QV6rgO5gB6l2k3Q7D8/vNWLL\
gTnYX/iAE2nNhXp5OP32lPboEvRrM6xvlcnTHWQ/M7TROXJag9zkGp1/mHkgoXYpBK74agcRXadG\
j72Cgu2i/i6NwNob5K0meuwVCEENfbceIXAFzIzU6I3F1fUvnIy2s7etk+8Mgu9eIPa2dfL9kTae\
fz/Hj6/fXPy/lB/unRowqk8+ha7y7O0rREe72DRNvPJLmnqR5YHKLv282D8F4B/Y/ZofmTW2EAkd\
wdLyZ0i5DCLCBhHOho9hYWEe+/v7IwDSND09/SwcDseKxaLTbDY9UkoEg0Hs7OzAdV0QEbxerxMI\
BDylUum5VqvVYkIIR9M0jxCCmZkURWG/3w8pJRERSyk91WrVsSwr9heceQ7HMuS8nAAAAABJRU5E\
rkJggg==") 0 0 no-repeat\
}');

var items = $$("#sorter + .items > .item.addon > .info");
if (items.length) {
  var editLink, viewLink, tooltip;
  for (var i = 0; i < items.length; i++) {
    editLink = $("h3 a", items[i]);
    if (editLink) {
      tooltip = $("a.tooltip", items[i]);
      editLink.parentNode.appendChild(addLink(editLink.getAttribute("href"),
                                              tooltip.title,
                                              "icon-edit"));
      viewLink = $(".more-actions-popup > ul:last-child > li a", items[i]);
      if (viewLink) {
        editLink.href = viewLink.getAttribute("href");
        editLink.title = viewLink.textContent;
        editLink.classList.add("tooltip");

        var addonId = items[i].parentNode.dataset.addonid;
        var acrLink = editLink.parentNode.appendChild(addLink("../compatibility/reporter?guid=" +
                                                              addonId,
                                                              "Compatibility reports",
                                                              "icon-acr"));
      }
      else
        editLink.href = "/" + document.documentElement.lang + "/" + document.body.dataset.app
                      + editLink.href.match(/\/(addon|theme)\/.*\//)[0].toString()
                                     .replace(/\/theme\//, "/addon/");
    }
  }
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}

function $$(aSelector, aNode) {
  return (aNode || document).querySelectorAll(aSelector);
}

function addLink(aHref, aTitle, aClassName) {
  var link = document.createElement("a");
  link.href = aHref;
  link.className = aClassName + " tooltip";
  link.title = aTitle;
  return link;
}

// ==UserScript==
// @name          Firefox Password Manager Workaround (Arcor/Freenet)
// @namespace     boardraider@camp-firefox.de
// @description   http://userscripts.org/scripts/show/50340
// @version       0.2
// @date          2009-05-28
// @copyright     2009, boardraider
// @license       GPL 2 or later
// @include       http://www.freenet.de/freenet/
// @include       http://www.freenet.de/freenet/index.html
// @include       http://www.arcor.de/
// @include       http://www.arcor.de/index.html
// @include       http://www.arcor.de/pksc/index_pub.jsp*
// @include       https://www.arcor.de/login/login.jsp*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------

(function () {

var domain = window.location.host.match(/[^\.]+\.[^\.]+$/);
var formName, fakeValue;
if (domain) {
  domain = domain[0];
  switch (domain) {
    case "freenet.de": 
      formName = "loginform";
      fakeValue = "Passwort";
      break;
    case "arcor.de": 
      formName = "login";
      fakeValue = "Online-Passwort";
      break;
    default:
      formName = "formname";
      fakeValue = "fakevalue";
  }
}

// make password field visible 
var passInput = document.evaluate("//form[@name = '" + formName + "']" +
  "//input[@type = 'password']", document, null,
  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (!passInput) {
  return; 
}
passInput.style.display = "block";
// remove fake password field
var fakeInput = document.evaluate("//form[@name = '" + formName + "']" +
  "//input[@value = '" + fakeValue + "']", document, null,
  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
passInput.parentNode.removeChild(fakeInput);

})();
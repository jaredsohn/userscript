// ==UserScript==
// @name            Adf my id skipper FoxySpeed
// @description     Automatically skips the adf.my.id intersitials
// @version        1.0
// updateURL       http://userscripts.org/scripts/source/399654.meta.js
// @updateURL      http://userscripts.org/scripts/source/399654.meta.js
// @downloadURL    http://userscripts.org/scripts/source/399654.user.js
// @author         Ismail Iddakuo
// @Original-s-    1.0 http://userscripts.org/scripts/show/170509
// @include     *adf.my.id*
// @grant none
// ==/UserScript==

countdownArea = document.getElementById("area"); // Find the skip link location
countdownArea.innerHTML = "<form method='POST'><input type='hidden' name='hidden' value='15'><input type='hidden' name='image' value='+'><input type='submit' class='skip' value=' ' name='image'></form>"; // Add the skip form
countdownArea.getElementsByTagName("form")[0].submit(); // Simulate a user submit
}
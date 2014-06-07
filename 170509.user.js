// ==UserScript==
// @name        Adf my id skipper
// @description Automatically skips the adf.my.id intersitials
// @include     *adf.my.id*
// @version     1.0
// @grant none
// ==/UserScript==

countdownArea = document.getElementById("area"); // Find the skip link location
countdownArea.innerHTML = "<form method='POST'><input type='hidden' name='hidden' value='15'><input type='hidden' name='image' value='+'><input type='submit' class='skip' value=' ' name='image'></form>"; // Add the skip form
countdownArea.getElementsByTagName("form")[0].submit(); // Simulate a user submit
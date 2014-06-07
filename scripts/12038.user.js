// Log me the !@#$ in already.

// ==UserScript==
// @name           Photobucket Log Me In Already
// @namespace      http://InternetDuctTape.com
// @description    Takes you directly to your album if you visit http://photobucket.com while already logged in.
// @include        http://photobucket.com/
// ==/UserScript==


(function() {
  var welcome = document.getElementById("welcomeUser");
  if (welcome) {
    location.replace(welcome.href);
  }
 })();

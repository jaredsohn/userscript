// ==UserScript==
// @name           PhishTank Nexter
// @namespace      http://www.invisibill.net/
// @description    After voting on a PhishTank submission, auto-clicks to the next unverified submission.
// @include        http://www.phishtank.com/phish_detail.php?phish_id=*
// @author         InvisiBill
// @copyright      2010
// @version        1.0
// @lastupdated    2010-06-09
// ==/UserScript==

headings = document.getElementsByTagName("h3");
for (var i=0; i<headings.length; i++) {
  if (headings[i].innerHTML.match(/You said: <b>I/)) { location.href = "http://www.phishtank.com/next_unverified_phish.php"; }
}
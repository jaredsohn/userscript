// ==UserScript==
// @name        EKMS
// @grant       none
// @namespace   http://userscripts.org/users/502497
// @description Fillin
// @include     *ekms*
// @version     1
// ==/UserScript==

document.getElementById("txtEmail").value = "wesley.de.keirsmaeker@hpcds.com";
document.getElementById("txtSubject").value = "";
document.getElementById("txtProvidedBy").value = "Wesley De Keirsmaeker";
document.getElementById("txtReviewedBy").value = "Wesley De Keirsmaeker";
document.getElementById("txtApprovedBy").value = "Wesley De Keirsmaeker";
document.getElementById("pnlDCs_sdbewgiupdates@hpcds.com").checked=true;
document.getElementById("pnlDCs_vermeumi").checked=true;
document.getElementById("pnlDCs_vermulst").click();
setTimeout(function() {document.getElementById("pnlOtherEmail_txtOtherEmails").value = "wendy.merens@hpcds.com; mita.voortmans@hpcds.com";},9000);

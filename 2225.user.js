// ==UserScript==

// @name           Heiseforenmail
// @namespace      http://diveintogreasemonkey.org/download/

// @description    Setzt die Checkbox "Antworten auf diesen Beitrag per E-Mail",
//                 wenn man Postings im Heiseforum schreibt.

// @include        http://www.heise.de/*write*
// @include        http://heise.de/*write*

// ==/UserScript==
 
(function() {
    document.getElementsByName("mail_if_answer")[0].checked = true;
}) ();



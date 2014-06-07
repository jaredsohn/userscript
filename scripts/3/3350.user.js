// ==UserScript==
// @name          Rediff Mail Ad Remover
// @description	  Removes ads from the free version of Rediff Mail (Ad at the top of the screen while reading the mail)
// @include       http://f1mail.rediff.com/*
// ==/UserScript==


tables = document.getElementsByTagName("TABLE");

tables[3].style.display = "none";

GM_log("RediffMail : Removed the AD");

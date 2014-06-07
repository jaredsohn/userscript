// ==UserScript==
// @name           4Chan Cookie-less Tripname, Email, Subject, and Comment (or Signature)
// @namespace      4chancookieless
// @include        http://*.4chan.org/*
// ==/UserScript==
document.getElementsByName("name")[0].value = "Your Trip (EG: moot#faggot)";
document.getElementsByName("email")[0].value = "Email, sage, or noko";
document.getElementsByName("sub")[0].value = "I would advise against this.";
document.getElementsByName("com")[0].value = "##your signature or comment here##";

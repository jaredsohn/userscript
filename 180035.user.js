// ==UserScript==
// @id             D9E7C4B1-8C4E-F17A-C1F5-9482D8DEE161
// @name           GMail Mobile for Desktop
// @version        1.0
// @namespace      cakyus@gmail.com
// @author         Yus Uf
// @description    GMail Mobile on Desktop
// @include        https://mail.google.com/mail/mu/*
// @run-at         document-end
// ==/UserScript==

// hide top-right gmail global menu
// ie. link to G+, Google Apps, G+ Notification, etc

document.getElementsByClassName('gb_6')[0].style.display = 'none';

// maximize "Subject:" textbox
document.getElementById('cmcsubj').style.width = '90%';

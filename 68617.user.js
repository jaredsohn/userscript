// ==UserScript==
// @name          BuzzUp
// @namespace     http://labs.ajeya.net/buzzup
// @description   Does not show the unread count for Buzz
// @version       1.1 2010-2-24
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==


element = document.ElementById(":i3");
element.innerHTML = "Inbox";

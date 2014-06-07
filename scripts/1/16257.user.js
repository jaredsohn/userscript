// ==UserScript==
// @name          Gmail LiveJournal comment form warning remover
// @namespace     http://henrik.nyh.se
// @description   When you reply to a LiveJournal comment in the embedded form of notification e-mails, Gmail will ask for confirmation ("You are submitting information to an external page. Are you sure?"). This script disables that warning for LiveJournal comment forms only.
// @include       https://mail.google.tld/mail/*
// @include       http://mail.google.tld/mail/*
// @include       https://mail.google.tld/a/*
// @include       http://mail.google.tld/a/*
// ==/UserScript==

document.body.addEventListener('submit', function(event) {
  var form = event.target;
  if (form.action == 'http://www.livejournal.com/talkpost_do.bml')
    form.setAttribute('onsubmit', null);
}, true);

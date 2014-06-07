// ==UserScript==
// @name           GMail Select All Button for Spam in Basic HTML View
// @namespace      real.billy
// @description    Adds a 'Select All' button to the Spam folder in GMail's basic HTML view
// @include        http://mail.google.com/mail/h/*/?s=m*
// ==/UserScript==

function selectAllMessageCheckboxes() {
  for (var i = 0; i < document.getElementsByName('t').length; i++) {
    document.getElementsByName('t')[i].checked = true;
  }
}

var input = document.createElement('input');
input.setAttribute('type', 'button');
input.addEventListener("click", selectAllMessageCheckboxes, true);
input.setAttribute('value', 'Select All');
document.getElementsByName('nvp_a_dl')[0].parentNode.appendChild(input);

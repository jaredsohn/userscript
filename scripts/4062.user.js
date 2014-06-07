// ==UserScript==
// @name          jigsawinitmycontacts
// @description   Clears the date Acquired field and sets Contact Status to any.
// @include       http://www.jigsaw.com/rvi/MyContacts.do*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

var form;
form = document.forms.namedItem("MyContactsForm");

if (form != null) {
  var input;

  // Clear the begin date.
  input = form.elements.namedItem("beginDT");

  if (input != null) {
    input.value = "";
  }

  // Set the contact type to 0, for "any".
  input = form.elements.namedItem("myContactType");

  if (input != null) {
    input.value = 0;
  } 
}

// ==UserScript==
// @name         MediaWiki: Prevent anon editing
// @namespace    http://vyznev.net/
// @description  Prevent editing without logging in on MediaWiki sites
// @include      *action=edit*
// @include      *action=submit*
// ==/UserScript==

if ( !document.getElementById('pt-logout') ) {
  var editForm = document.forms.namedItem('editform');
  if ( editForm ) {
    var saveButton = editForm.elements.namedItem('wpSave');
    if ( saveButton ) {
      saveButton.disabled = true;
    }
  }
}

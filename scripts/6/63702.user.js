// ==UserScript==
// @name           lighthouse: Edit your comments
// @description    Adds ability to edit your own ticket comments.
// @include        https://*.lighthouseapp.com/projects/*/tickets/*
//
// Mouseover the comment and an edit button will appear to the
// top-right of the comment.
// ==/UserScript==

(function(global) {
  var $$ = global.$$, doc = global.document,
   action = doc.forms.length > 2 && doc.forms[2].action;

  action && $$('ul.info .tticket').each(function(element) {
    var version, match = element.id.match(/-(\d+)-(\d+)$/);
    if (match && !element.hasClassName('attachment')) {
      version = match[2];
      element
        .insert("<a href='" + action + "/versions/" + version + "' class='edit' style='display:none'>edit</a>")
        .observe('mouseover', function() {
          element.down('.edit').show();
        })
        .observe('mouseout', function() {
          element.down('.edit').hide();
        });
    }
  });
})(this.unsafeWindow || this);
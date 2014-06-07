// ==UserScript==
// @name        Gmail - Header Subject and Snippet Tooltips
// @namespace	  http://gmail.header.subject.and.snippet.tooltips/kepp
// @include	    https://mail.google.com/mail/?*
// @include	    http://mail.google.com/mail/?*
// @description	Sets the "title" attributes on headers so email subject and snippet tooltips show on hover.
// @version     20100228
// ==/UserScript==

/*
 20091116 - First version
 20100228 - Simplified code
            Changed tooltip to include both the title and snippet text so
              everything can be seen at once when hovering.
*/

(function() {

  function processEmails( event ) {

    // would like a better xpath to do this
    var xpath = "//td/div//div/span/preceding-sibling::span[@id]";
    var res = document.evaluate( xpath, document, null,
              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

    for ( var i = 0, email; email = res.snapshotItem( i ); i++ ) {
      addTitle( email );
    }
  }

  function addTitle( email ) {
    var snip = email.nextElementSibling;

    var titleText = email.textContent + snip.textContent; // email subject

    email.title = titleText;
    snip.title = titleText;
  }

  document.addEventListener( "DOMNodeInserted", processEmails, false );

})();
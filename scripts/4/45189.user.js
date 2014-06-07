// ==UserScript==
// @name           Insert LaTex into Google Docs
// @namespace      tawn.co.uk
// @description    Adds a button for inserting LaTeX into Google Docs
// @include        https://docs.google.com/Doc?*
// ==/UserScript==

/*
  Code for google docs toolbar button based on "Google Docs Comment Toggler" by Arthaey Angosii
*/

window.addEventListener("load", function() {

    var mathTexURL = "http://www.forkosh.dreamhost.com/mathtex.cgi?";

    var LaTeXicon = "data:image/gif;base64,R0lGODlhLQAPAOMAAP///wAAAFxcXA4ODjQ0NLCwsEZGRgQEBCQkJHR0dNbW1hgYGAgICJKSkhQUFAYGBiH5BAEAAAAALAAAAAAtAA8AAATiEMhJV6M4653FCANRKMEiLQeCMIGKBAaXfIFwgvFkBHrDAybJayJIcCSgCcGIGRyUgIMhUZgcggCB4gggBLZFTUvSMBoOl0mN7AgECPAXg0JCJGyZQoCJMBi8aQAJXxQHAxhzFWsaOzoTC1hDhYcUBBgCixlOAA0MWAswElcYhhIFRloTBQQHT2IIdEwUmaKUCbKmlpiBqnuVGYNbhW8vuAqwSJQUjURYE5KTZLIFzl7CAAUvbwQrAYEK3G4EObUYCQ8BB1WcBwEM5FzxpRQFePH3HPMTA+v4/hMNtMEJ94NLBAA7";

    function insertLaTeX() {
        var editorFrame = document.getElementById("wys_frame");
        if (!editorFrame)
            return;

        var editorDocument = editorFrame.contentDocument;
        if (!editorDocument)
            return;

	var LaTeX = prompt("Type the LaTeX code to enter:", "");

	if (LaTeX != null)
	  editorDocument.execCommand("insertimage", false, mathTexURL + LaTeX);


    }

    function insertAfter(anchorNode, newNode) {
        if (!anchorNode || !newNode) return;
        anchorNode.parentNode.insertBefore(newNode, anchorNode.nextSibling);
    }

    function addGoogleDocsToolbarButton(buttonId, buttonTitle, buttonContent, action) {
        var toolbar = document.getElementById("editor-toolbar");
        if (!toolbar) return;

        // create all these elements DOM-wise because...
        var buttonDiv = document.createElement("div");
        buttonDiv.id = buttonId;
        buttonDiv.title = buttonTitle;
        buttonDiv.className = "goog-toolbar-button goog-inline-block";
        buttonDiv["aria-disabled"] = false;
        buttonDiv.role = "button";
        
        var outerBox = document.createElement("div");
        outerBox.className = "goog-toolbar-button-outer-box goog-inline-block";
        
        var innerBox = document.createElement("div");
        innerBox.className = "goog-toolbar-button-inner-box goog-inline-block";
        
        // ...we need to call addEventListener on the innermost div element
        var toggleButton = document.createElement("div");
        //toggleButton.textContent = buttonContent;
	toggleButton.innerHTML = buttonContent;
        toggleButton.addEventListener("click", action, true);

        // add a separator to the end of the toolbar
        toolbar.innerHTML += "<div id=':t' class='goog-toolbar-separator goog-inline-block' style='-moz-user-select: none;' role='separator'> </div>";

        // compose and add the "Toggle Comments" button
        innerBox.appendChild(toggleButton);
        outerBox.appendChild(innerBox);
        buttonDiv.appendChild(outerBox);
        insertAfter(toolbar.lastChild, buttonDiv);
    }



    function init() {
      addGoogleDocsToolbarButton("+insertLaTeX", "Insert LaTeX", "<img src=\""+ LaTeXicon + "\">", insertLaTeX);
    }

    init();
    
}, true);

// ==UserScript==
// @name           Google Quote-Adder
// @description    Adds a button that puts quotemarks around your Google search string. The semicolon key also works.
// @include        http*://www.google.tld/*
// ==/UserScript==

(function (){
  function addQuotes(e) {
    // Compute the search box from the targeted element
    var f = e.target.form;
    var b = f.elements.namedItem('q');
    // Original code follows
    s = b.selectionStart;
    e = b.selectionEnd;
    if (s != e) {
      b.value = b.value.substr(0,s) + b.value.substr(e);
    }
    c = b.value.lastIndexOf('"',s);
    while ((b.value[c+1] == ' ') || (b.value[c+1] == ';'))  
      {c += 1;}
    while ((b.value[s-1] == ' ') || (b.value[s-1] == ';'))  
      {s += -1;}
    b.value = b.value.substr(0,c+1) + '"' + b.value.slice(c+1,s) + '"' + b.value.slice(s);
    b.focus();
    b.selectionStart = s+2;   // +2 because we added 2 quotemarks
    b.selectionEnd = s+2;
  }
  function handleKey(evt){
    // On semicolon, run addQuotes (pass the key event)
  	if (evt.which == 59) {
  	  addQuotes(evt);
  	  evt.preventDefault();
  	}
  }
  // Setup: Look for search buttons
  var srchbtns = document.querySelectorAll("#gbqfb, #gbqfba, button[aria-label='Google Search']");
  if (srchbtns.length > 0){ 
    for (var i=0; i<srchbtns.length; i++){
      // Check for adjacent search box
      var sb = srchbtns[i].form.elements.namedItem('q');
      if (sb){
        // Add Quotes button next to search button
        var btn = document.createElement("button");
        btn.name = "quote-button";
        btn.className = srchbtns[i].className;
        btn.style.marginLeft = "4px";
        btn.appendChild(document.createTextNode("Quote"))
        if (srchbtns[i].nextSibling) srchbtns[i].parentNode.insertBefore(btn, srchbtns[i].nextSibling);
        else srchbtns[i].parentNode.appendChild(btn);
        btn.addEventListener("click", addQuotes, true);
        // Add semicolon handler to the search box
        sb.addEventListener("keypress", handleKey, true);
      }
    }
  } else {
    // Apparently this page doesn't have a search form
  }
})();


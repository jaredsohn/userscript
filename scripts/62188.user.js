// ==UserScript==
// @name          Egg to Ofx
// @namespace     http://chrisroos.co.uk/
// @description   Adds a button to the Egg statement and recent transactions pages that allows you to download them as Ofx.
// @include       *egg.local*
// @include       *egg.com*
// ==/UserScript==

(function() {
  try {
    
    // Create the following string preference (in about:config) to send html to a different server
    //   'greasemonkey.scriptvals.http://chrisroos.co.uk//Egg to Ofx.egg2ofxService'
    //   (i.e. 'greasemonkey.scriptvals.<@namespace>/<@name>.<key>')
    // Set the value to the URL of the server, e.g. http://egg2ofx.local/ for testing the local server
    // IMPORTANT.  To revert to the default value you'll need to Reset the preference in about:config
    //   so that it reverts to the 'default' state.
    
    var egg2ofxServiceDefault = 'http://egg2ofx.seagul.co.uk/';
    var egg2ofxService        = GM_getValue('egg2ofxService', egg2ofxServiceDefault);
    var transactionsTable;
    
    GM_log('Using the server at ' + egg2ofxService);
    
    if (transactionsTable = document.getElementById('tblTransactionsTable')) {
      var f = document.createElement('form');
      f.setAttribute('id', 'convertToOfxForm');
      f.setAttribute('method', 'POST');
      f.setAttribute('action', egg2ofxService);
      f.setAttribute('style', 'margin: 0.4em;')
    
      var b = document.createElement('input');
      b.setAttribute('type', 'button');
      b.setAttribute('value', 'Download as OFX');
      b.setAttribute('style', 'padding: 0.4em; background-color: #c5ec60; border-right: 1px solid; border-bottom: 1px solid;')
      var convertToOfxFormSubmitFunction = function() { 
        var msg = '*IMPORTANT* This will send your transactions to the server at \'' + egg2ofxService + '\' to be converted.\n\n'
        msg += 'If you are sending them to \'' + egg2ofxServiceDefault + '\' then I assure you that I won\'t keep the data but I can\'t make any guarantees about other providers.\n\n'
        msg += 'If you want to be competely safe then your best bet is to run a copy of the egg2ofx service yourself, or use the egg2ofx rubygem binary.\n\n'
        msg += 'Are you sure you wish to continue?'
        if (confirm(msg)) {
          var h = document.createElement('input');
          h.setAttribute('type', 'hidden');
          h.setAttribute('name', 'documentHtml');
          h.setAttribute('value', document.body.innerHTML);
          var f = document.getElementById('convertToOfxForm')
          f.appendChild(h);
          f.submit();
        }
      }
      b.addEventListener('click', convertToOfxFormSubmitFunction, true);
    
      f.appendChild(b);
      
      transactionsTable.parentNode.insertBefore(f, transactionsTable);
    }
  } catch(e) {
    GM_log('ERROR')
    GM_log(e);
  }
})()
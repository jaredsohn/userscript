// ==UserScript==
// @name           QuiBids quiet alerts
// @description    Remove annoying and unnecessary alert dialogs
// @namespace      http://www.quibids.com
// @include        http://www.quibids.com/*
// ==/UserScript==

(function() {
  if ('undefined' == typeof __PAGE_SCOPE_RUN__) { // unsandbox, please!
    var src = arguments.callee.caller.toString();
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.innerHTML = "const __PAGE_SCOPE_RUN__ = true;\n(" + src + ')();';
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
  } else { // unsandboxed -- here we go!
    fix_up_alerts();
  }
})();

function fix_up_alerts()
{
  Dialog.alert = function(t,opts){
     // the AJAX already updates the button right under us this is extraneous
     if (t.match(/Auction (added|removed)/))
      return;
     // the AJAX already updates the button right under us this is extraneous
     if (t.match(/Bid-O-Matic was.*deactivated/))
      return;
     // add CRs
     t=t.replace("<br>","\n");
     // strip HTML (which we can't show anyways)
     t=t.replace(/(<([^>]+)>)/ig,"")
     alert(t);
   }; 
}
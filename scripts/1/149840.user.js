// ==UserScript==
// @name        Xero Hot Keys
// @namespace   Seifer - http://userscripts.org/users/seifer
// @include     https://go.xero.com/*
// @version     0.10
// ==/UserScript==

(function(){
var FormAction = document.getElementById('frmMain').getAttribute('action') ;
var Help_AccountsPayable_Edit = "Hot Key                          Action\r\nCtrl+Enter                      Save invoice & add new\r\nCtrl+Shift+Enter           Save draft & add new";

document.addEventListener('keydown', function(e) {

  // pressed ctrl+enter
  if (e.keyCode == 13 && !e.shiftKey && e.ctrlKey) {
   if(FormAction = '/AccountsPayable/Edit.aspx') {
     Invoice.save('ApproveAndAdd');
   }
  }

  // pressed ctrl+shift+enter
 if (e.keyCode == 13 && e.shiftKey && e.ctrlKey) {
   if(FormAction = '/AccountsPayable/Edit.aspx') {
     Invoice.save('SaveDraftAndAdd');
   }
  }

  // pressed ctrl+?
 if (e.keyCode == 191 && !e.shiftKey && e.ctrlKey) {
   if(FormAction = '/AccountsPayable/Edit.aspx') {
     alert(Help_AccountsPayable_Edit);
   }
  }

}, false);
})();

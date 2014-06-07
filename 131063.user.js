// ==UserScript== 
// @name        Give Me Paste Back
// @author      Michael Soh 
// @namespace   8DDyj2fcDcsAEM29wn3pPzYS2XLwcBp1RQ3o8HAH_givemepaste
// @description Will allow you to paste into input areas that have paste removed
// @version     0.2
// @license     GPL 3.0 
// @include     * 
//  
// @require     http://tailgate.googlecode.com/hg/greasemonkey_scripts/jquery/jquery-1.7.1.min.js
// @require     http://usocheckup.redirectme.net/131063.js
// ==/UserScript== 


$(document).ready(function() {
     $('input').each(function() {
          if ('onpaste' in this) {
               this.removeAttribute('onpaste');

               if ('onpaste' in this) {
                    GM_log("Could not remove onpaste attribute from " + this.id);
                    GM_log("onpaste still exists! Trying to set the function...");
                    this.onpaste = function() { return true; }
                    if ('onpaste' in this) GM_log("onpaste still exists! (3) No solution found.");
               }
          }
          
          if ('oncopy' in this) {
               this.removeAttribute('oncopy');

               if ('oncopy' in this) {
                    GM_log("Could not remove oncopy attribute from " + this.id);
                    GM_log("oncopy still exists! Trying to set the function...");
                    this.oncopy = function() { return true; }
                    if ('oncopy' in this) GM_log("oncopy still exists! (3) No solution found.");
               }
          }
     });
});

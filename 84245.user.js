// ==UserScript==
// @name           Expand www.aguse.jp result without a click
// @description    Open the list of all outbound-connecting objects with just one click.
// @license        GNU GPL v3: http://www.gnu.org/licenses/gpl.html
// @version        3.4.4
// @author         k2jp
// @namespace      http://d.hatena.ne.jp/k2jp/
// @match          *://www.aguse.jp/*
// @exclude        about:blank
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// @require        https://code.jquery.com/jquery-latest.min.js
// @grant          none
// ==/UserScript==
// Home URL          : http://userscripts.org/scripts/show/84245
// ChangeLog
//              3.4.4: Added missing self and changed the name of functions
//              3.4.3: Use self instead of this.
//              3.4.2: Use match metadata instead of include for better scheme support.
//              3.4.1: Added checking for existance of variables before test their methods.
//              3.4  : Refactored.
//              3.3b : Stop using "unsafeWindow".
//              3.2a : Use var instead of let for better compatibility.
//              3.1a : Use require in the Metadata Block insted of getting jQuery via unsafeWindow.
//                     Added "grant none" into Metadata Block.
//              3.0b : Rewrote because of Website renewal. Displaying national flags is NOT supported at this moment.
//              2.1  : Refactored(Added removeEventListerner and eliminated redundant IFs)
//              2.0  : Now you can open "other websites records on the same server" with JUST ONE CLICK too.
//              1.3  : Bug fix: When the number of outbound-connecting objects is 20, the second argument of setAllOuterLinks will be 10 again and again and...loop
//              1.2  : Eliminated an ugly "setInterval" function call
//              1.1  : Event switched to from "load" to "DOMNodeInserted".
//              1.0.1: See http://www.greasespot.net/2011/04/breaking-change-inject-into-aboutblank.html
//              1.0  : [STABLE] Corrected 2nd parameter of the function setAllOuterLinks: (total number of results) - 10
//              0.5  : Better setTimeout with clearInterval.
//              0.4.2: Added URL as comment(No code change)
//              0.4.1: Changed Comment a little bit(No code changed).
//              0.4  : Added clearInterval after 60 seconds.
//              0.3.1: Updated too long description(No code changed).
//              0.3  : Added another clearInterval case: The number of outbound-connecting objects is lower than 11.
//              0.2  : Refactored(Eliminated rudundant recursive IFs).
//              0.1.1: Inactivate the "Next 10 results" button when all expanded to the end.
//              0.0.1: First Release.
// The list of outbound-connecting objects or other websites on the same server is limitted to 10 results by default.
// You can click "Show next 10 records" button each time...to the end.
// But clicking, clicking and clicking...eternally are too boring to death.
// This script helps you to expand them with just ONE click, overwriting the default value from 10 to its total number-10.

(function(){
  var self = this;
  
  // Avoid conflict
  self.$ = self.jQuery = jQuery.noConflict(true);
  
  // Selectors targetting total num and hidden rows
  self.CONFS = [ {
                  TOTAL_NUM:   "#nd",
                  HIDDEN_ROWS: "#rdtbl tr[class!=thead]:hidden"
                },{
                  TOTAL_NUM:   "#outercnt",
                  HIDDEN_ROWS: "#outertbl tr[class!=thead]:hidden"
                }
              ];

  // Show hidden rows if total num exists and hiddn rows exist.
  self.openNextAll = function(totalNum, hiddenRows){
    totalNum &&
    totalNum.length &&
    (~~totalNum.text() > 10) &&
    hiddenRows &&
    hiddenRows.length &&
    hiddenRows.show();
  };

  // Call functions, passing Selector APIs
  self.openNextAlls = function(){
    CONFS.forEach(
        function(elem){
          self.openNextAll( $(elem.TOTAL_NUM), $(elem.HIDDEN_ROWS) );
        }
    );
  };

  // Call when there are inserted nodes.
  addEventListener("DOMNodeInserted", self.openNextAlls, false);

})();
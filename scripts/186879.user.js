// ==UserScript==
// @name           Expand www.aguse.jp result without a click MOD
// @description    Open the list of all outbound-connecting objects with just one click.
// @license        GNU GPL v3: http://www.gnu.org/licenses/gpl.html
// @version        3.5.0
// @author         k2jp
// @namespace      http://d.hatena.ne.jp/k2jp/
// @match          *://www.aguse.jp/*
// @exclude        about:blank
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// @require        https://code.jquery.com/jquery-latest.min.js
// @grant          none
// ==/UserScript==
// Home URL          : https://userscripts.org/scripts/show/186879
// ChangeLog
//              3.5.0: Folk from https://userscripts.org/scripts/show/84245 clicking next buttons instead of jQuery#show()
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
                  NEXT_BUTTON: "#next_10r",
                  HIDDEN_ROWS: "#rdtbl tr[class!=thead]:hidden"
                },{
                  TOTAL_NUM:   "#outercnt",
                  NEXT_BUTTON: "#next_10",
                  HIDDEN_ROWS: "#outertbl tr[class!=thead]:hidden"
                }
              ];

  // Trigger a click event on the next button if total num exists and hiddn rows exist.
  self.clickNext = function(totalNum, nextButton, hiddenRows){
    totalNum &&
    totalNum.length &&
    (~~totalNum.text() > 10) &&
    hiddenRows &&
    hiddenRows.length &&
    nextButton &&
    nextButton.length &&
    nextButton.trigger("click");
  };

  // Call functions, passing Selector APIs
  self.clickNexts = function(){
    CONFS.forEach(
        function(elem){
          self.clickNext( $(elem.TOTAL_NUM), $(elem.NEXT_BUTTON), $(elem.HIDDEN_ROWS) );
        }
    );
  };

  // Call when there are inserted nodes.
  addEventListener("DOMNodeInserted", self.clickNexts, false);

})();
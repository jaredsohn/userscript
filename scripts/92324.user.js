// ==UserScript==
// @name           ISIS MailMining
// @namespace      http://userscripts.org/users/vovcacik
// @description    Mail mining pro ISIS
// @include        https://isis.vse.cz/auth/student/spoluzaci.pl?*
// @license        Creative Commons Attribution-Share Alike http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.11
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100);}
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  function Miner(id) {
    var self = this;
    var recipients = new Array();
    
    init = function() {
        populateRecipients();
    }
    
    populateRecipients = function() {
        $("a[href^='../lide/clovek.pl']").each(function() {
            name = $(this).text();
            url = $(this).attr('href');
            recipients[recipients.length] = new Recipient(name, url);
        });
    }
    
    self.getEmails = function() {        
        result = "";
        for(i=0; i<recipients.length; i++) {
            r = recipients[i];
            result = result + '"' + r.getName() + '" <' + r.getEmail() + '>, ';
        }
        return result; 
    }
    
    self.getEmailsLength = function() {
        return recipients.length;
    }
    init();
  }
  
  function Recipient(name, url) {
      var self = this;
      var regexEmail = /id=(\d{4,5})/i;
      var email = "";
      
      init = function() {
          var result = regexEmail.exec(url);
          email = result[1] + "@isis.vse.cz";
      }
      
      self.getName = function() {
          return name;
      }
      
      self.getEmail = function() {
          return email;
      }
      
      init();
  }
  var miner = new Miner("mailminer");
  prompt(miner.getEmailsLength() + " adresátů:", miner.getEmails());
}

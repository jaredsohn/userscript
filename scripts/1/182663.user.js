// ==UserScript==
// @name        RX-V475 WebControl Restore
// @namespace   http://userscripts.org/users/benh57
// @include     http://192.168.*
// @version     1
// @run-at document-start
// @grant       GM_addStyle
// ==/UserScript==
            
(function(open) {
      unsafeWindow.XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
    
      this.origOnload = this.onload;
      this.onload = function (httpObj) { 
      var xmlData = this.responseXML;
       
      if (xmlData) {     
        
            var Cmd = ["Service","System", "Main_Zone", "Zone_2", "Zone_3", "Zone_4", 
"Tuner", "USB", "HD_Radio" , "NET_RADIO" , "SERVER" , "SiriusXM" , 
"Rhapsody" , "Napster" , "Pandora" , "AirPlay","iPod_USB"];

        var cmdname = "";
        for ( var i = 0; i < Cmd.length; i++ ) {
            var zone = xmlData.getElementsByTagName(Cmd[i]);
            if (zone.length == 1) {
            cmdname = Cmd[i];
            break;
            }
        } 
        
        if (cmdname == "System") {    
             var Val = xmlData.getElementsByTagName("Model_Name");
                if (Val.length) {
                if (Val[0].firstChild) {
                    Val[0].firstChild.nodeValue = "RX-V675";
                }
            } 
        }
        }
        this.origOnload();
      }
        open.call(this, method, url, async, user, pass);
      };
    })(unsafeWindow.XMLHttpRequest.prototype.open);


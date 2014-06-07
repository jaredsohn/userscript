// ==UserScript==
// @name FriBID
// @namespace http://userscripts.org/edwtjo
// @description FriBID on Skandiabanken
// @include https://secure3.skandiabanken.se/login/login.aspx?t=sb
// ==/UserScript==
//

var bid = {
init: function () {},
start: function () {
         this.initAuth();
         this.initPlugin();
       },
initAuth: function() {
            var typePlugin = this.isInstalled();
            if (typePlugin != false) {
              if (typePlugin == "Plugin") {
                var objHldr = document.createElement("object");
                objHldr.setAttribute("id", "authenticateMoz");
                objHldr.setAttribute("name", "authenticateMozillaFirefox");
                objHldr.setAttribute("type", "application/x-personal-authentication");
                objHldr.setAttribute("width", "0");
                objHldr.setAttribute("height", "0");
                document.body.appendChild(objHldr);
              } else {
                var objHldr = document.createElement("object");
                objHldr.setAttribute("id", "authenticateIE");
                objHldr.setAttribute("name", "authenticateInternetExplorer");
                objHldr.setAttribute("classid", "CLSID:DD137900-E4D7-4b86-92CC-2E968F846047");
                objHldr.setAttribute("width", "0");
                objHldr.setAttribute("height", "0");
                document.body.appendChild(objHldr);
              }
            }
          },
initPlugin: function() {
              var typePlug = this.isInstalled();
              if (typePlug == "Plugin") {
                var objHldr = document.createElement("object");
                objHldr.setAttribute("id", "pluginId");
                objHldr.setAttribute("name", "version");
                objHldr.setAttribute("type", "application/x-personal-version");
                objHldr.setAttribute("width", "0");
                objHldr.setAttribute("height", "0");
                document.body.appendChild(objHldr);
              } else {
                var objHldr = document.createElement("object");
                objHldr.setAttribute("id", "pluginId");
                objHldr.setAttribute("name", "version");
                objHldr.setAttribute("classid", "CLSID:E5C324CC-4029-43CA-8D57-4A10480B9016");
                objHldr.setAttribute("width", "0");
                objHldr.setAttribute("height", "0");
                document.body.appendChild(objHldr);
              }
            }, 
isInstalled: function() {
               var installed = false;
               try {
                 var xObj = new ActiveXObject("Nexus.AuthenticationCtl");
                 if(xObj) {
                   installed = true;
                 }
                 return installed;
               } catch (e) {
                 var installed = false;
                 if( navigator.mimeTypes["application/x-personal-authentication"] !== null )
                 {
                   installed = "Plugin";
                 } else {}
                 return installed;
               }
             }
};

document.addEventListener("click", function(e) {
       if (e.target.id == "ctl00_cphMainContentWide_rbtnBankID") {
       } else if (e.target.id == "ctl00_cphMainContentWide_NextButtonControl_btnNext") {
       bid.start();
       } else {}
    }, true);

// ==UserScript==
// @name           RDUMACFormatter
// @namespace      http://userscripts.org/users/477161
// @version        1.4
// @description    Puts MAC addresses in cannonical format ('1,6,aa:bb:cc:dd:ee:ff')
// @author         Diego Nuevo (diegonuevo@gmail.com)
// @contributor    Roberto Mateos
// @downloadURL    http://userscripts.org/scripts/source/138673.user.js
// @updateURL      http://userscripts.org/scripts/source/138673.user.js
// @include        http://*:8100/adminui/PSearch.jsp*
// @include        http://*:8100/adminui/Search.jsp*
// ==/UserScript==

document.addEventListener('load', function (event) {
  document.forms.namedItem("searchdevices").addEventListener('submit', function (event) {
    var devid = document.forms.namedItem("searchdevices").elements.namedItem("SearchQuery").value;
    var type = document.forms.namedItem("searchdevices").elements.namedItem("type").value;
    if(type == "macaddress" && devid.length >= 12 && devid.substring(0,4)!="1,6,")
    {
      devid = devid.replace(/[\.\:]/gi,"");
      var mac = "1,6," + devid.substring(0,2) + ":" +
      devid.substring(2,4) + ":" + 
      devid.substring(4,6) + ":" + 
      devid.substring(6,8) + ":" + 
      devid.substring(8,10) + ":" + 
      devid.substring(10,12);
      document.forms.namedItem("searchdevices").elements.namedItem("SearchQuery").value = mac;
    }
    else if(type == "duid" && devid.indexOf(":") == -1 && devid.length >= 20)
    {
      var devid = devid.replace(/[\.\:]/gi,"");
      var duid = devid.substring(0,2);
      for (var i = 2; i + 2 <= devid.length; i+=2)
      {
        duid = duid + ":" + devid.substring(i,i+2);
      }
      document.forms.namedItem("searchdevices").elements.namedItem("SearchQuery").value = duid;
    }
  }, true);
}, true);
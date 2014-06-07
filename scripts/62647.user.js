// ==UserScript==
// @name	TH HP/MP restore
// @namespace	http://userscripts.org/users/29327/scripts
// @description	Adds links to HP/MP restoration locations
// @include	*twilightheroes.com/header.php
// ==/UserScript==

// Get the TD full of &nbsp; (4th column)
var emptyTD = document.getElementsByTagName('td')[3];

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.twilightheroes.com/space-station/radiation-lab.php",
  headers: {
    "User-Agent": navigator.userAgent
  },
  onload: function(response) {
    if (!response.responseXML)
      response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    var rsp = response.responseText;
    
    var from = rsp.indexOf("not supposed to be here");
    if (from==-1)
    {
      emptyTD.innerHTML = "<a href=space-station/radiation-lab.php target=main><img src=http://xtraterrestrial.googlepages.com/radiation-lab.gif style='border:0px;'></a> <a href=space-station/sickbay.php target=main><img src=http://xtraterrestrial.googlepages.com/sickbay.gif style='border:0px;'></a>";
    } else {
      emptyTD.innerHTML = "<a href=enlightenment-center.php target=main><img src=http://xtraterrestrial.googlepages.com/radiation-lab.gif style='border:0px;'></a> <a href=hospital.php target=main><img src=http://xtraterrestrial.googlepages.com/sickbay.gif style='border:0px;'></a>";
    }
  }
});



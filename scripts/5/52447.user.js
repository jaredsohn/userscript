// ==UserScript==
// @name           Arcanodiode Bounty Day
// @namespace      http://caigawalker.plus.com/
// @description    Adds a holiday-style announcement to the main page when there is an arcanodiode bounty.
// @include        *.kingdomofloathing.com/main.php
// @include        *127.0.0.1:*/main.php
// ==/UserScript==

(function() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://" + document.location.hostname + ":" + document.location.port + "/bhh.php",
    headers: { "User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/html", },
    onload: function(resp) {
      if(resp.status == "200" && resp.responseText.indexOf("These are the things I'm currently paying bounties on:") != -1 && resp.responseText.indexOf("arcanodiodes") != -1) {
        var img1 = '<img src="http://images.kingdomofloathing.com/itemimages/lucre.gif">';
        var img2 = '<img src="http://images.kingdomofloathing.com/itemimages/diode.gif">';
        var msg = '<b>Today is Arcanodiode Bounty Day!</b><br>You should speak to the <a href="bhh.php">Bounty Hunter Hunter</a>.';
        var tables = document.getElementsByTagName("table");
        tables[tables.length - 3].innerHTML += '<tr><td align="center"><table><tr align="center"><td>' + img1 + '</td><td>' + img2 + '</td><td>' + img1 + '</td><td>' + img2 + '</td></tr><tr align="center"><td colspan=4>' + msg + '</td></tr><tr align="center"><td>' + img2 + '</td><td>' + img1 + '</td><td>' + img2 + '</td><td>' + img1 + '</td></tr></table></td></tr>';
      }
    }
  });
}) ();

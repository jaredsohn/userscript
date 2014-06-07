// ==UserScript==
// @name           AE Guild Database
// @namespace      http://www.litwerx.com/ae/
// @description    This script posts astro information to a database. Can be used for any AE Game server. Very simple. All automatic. When your scout views an astro the data is auto-posted to your database.
// @include        http://*.astroempires.com/*
// @exclude        http://*.astroempires.com/login.aspx*
// @exclude        http://*.astroempires.com/home.aspx*
// ==/UserScript==
var elmNewContent = document.createElement('aedb');

elmNewContent.innerHTML = '<div style=" position:fixed; top:0; left:0; border: 0px;"><table width="100%" cellspacing="5" cellpadding="5" border="0"><tr><td align="center"><b><a href="http://www.litwerx.com/aetesting.php" target="_blank">Active</a></b></td></tr></table></div>';

// Comment this line out if you don't want the Database link to appear in the top left corner of the screen.
document.body.appendChild(elmNewContent);

// Send data to off-site database
if ( (document.location.href.match(/base.aspx\?base/)) || (document.location.href.match(/map.aspx\?loc/)) || (document.location.href.match(/map.aspx\?cmp/))) {

var xmlhttp;
var url = window.location.href; 
 
function loadXMLDoc(url) {
  xmlhttp=GetXmlHttpObject();
  if (xmlhttp==null) {
    alert ("Your browser does not support XMLHTTP!");
    return;
  }
  xmlhttp.onreadystatechange=stateChanged;
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
}

function GetXmlHttpObject() {
  if (window.XMLHttpRequest) { return new XMLHttpRequest(); }
  if (window.ActiveXObject) { return new ActiveXObject("Microsoft.XMLHTTP"); }
  return null;
}

function stateChanged() {
  if (xmlhttp.readyState==4) {
    if (xmlhttp.status==200) {
      var page_source_code = xmlhttp.responseText;
      var page_data = "url=" + encodeURIComponent(window.location.toString()) + "&html=" + encodeURIComponent(page_source_code) + "&user=" + dbaeUser + "&pass=" + dbaePass;

      GM_xmlhttpRequest({
        method:"POST",
        url:"http://www.litwerx.com/ae/database.php",
        headers:{
          "User-Agent":"AEDB",
          "Content-Type":"application/x-www-form-urlencoded"
        },
        data: "" + page_data
      });
    } else {
      alert("Problem retrieving XML data:" + xmlhttp.statusText);
    }
  }
}
loadXMLDoc(url);
  
} // end if
// End send data to off-site database
// ==UserScript==
// @name           [JAGERMEISTER]
// @namespace      http://beta.ourdatabase.info/beta/forum
// @description    [testing]
// @include        http://*.astroempires.com*
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////////////////

var version = 0.01;

//http://(SERVER).astroempires.com/(PAGE).com?(PARAMS)
var currURL = window.location.toString().match("http:\/\/(.*?)\.astroempires\.com\/(.*?).aspx\\??(.*?)?");

//Properties of an AE Page
var AEPage = Object();
AEPage.Server = currURL[1].toUpperCase();
AEPage.Initial = AEPage.Server.substring(0, 1).toUpperCase();
AEPage.Page = currURL[2].toUpperCase();
AEPage.Params = {};

if (currURL[3]) {
  for (var i = 0; i < currURL[3].split("&").length; i++) {
    AEPage.Params[currURL[3].split("&")[i].split("=")[0]] = unescape(currURL[3].split("&")[i].split("=")[1]);
  }
}

//set window title
window.document.title = AEPage.Initial + " - " + AEPage.Page + (AEPage.Params.map ? " : " + AEPage.Params.map : (AEPage.Params.loc ? " : " + AEPage.Params.loc : ""));
var p1 = "info=(.*?)\">(.*?)</a></b>(.*?)</td><td align=\"center\">(.*?)</td><td align=\"center\">(.*?)</td><td align=\"center\">(.*?)</td><td align=\"center\"( class=\"gray inactive\")?>(<a href=\"base.aspx?base=(.*?)&view=structures&upgrade=(.*?)&id=(.*?)\">)?(.*)(</a>)?</td>";

switch (AEPage.Page) {
  case "BASE":
    if (AEPage.Params.view) {
      if (AEPage.Params.view.toUpperCase() == "STRUCTURES") {
        var struc_rows = document.getElementById("base_structures").rows[1].cells[0].childNodes[0].rows;
        for (var i = 0; i < struc_rows.length; i += 1) {
          alert(struc_rows[i].innerHTML.replace(",", ""));
          var xyz = struc_rows[i].innerHTML.replace(",", "").match(p1);

          if (xyz)
            alert(xyz[0]);
          else
            struc_rows[i].style.display = "none";
        }
      }
    }
    break;
  default:
    window.document.title = "Script Pass Over";
}







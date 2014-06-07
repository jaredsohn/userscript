// ==UserScript==
// @name           Coup D Bungie gp
// @namespace      http://www.bungie.net/
// @description    Coup D Bungie - GamePiranha.com
// @include        http://*bungie.net/*
// @exclude        http://*bungie.net/
// @exclude        http://*bungie.net/Online/*
// @exclude        http://*bungie.net/*Forums/createpost.aspx*
// ==/UserScript==

Array.prototype.Contains = function(O)
{
    for (var I = 0; I < this.length; I++)
    {
        if (this[I] == O)
        {
            return true;
        }
    }
    return false;
};

function getCookie(name) {var results = document.cookie.match(name + "=(.*?)(;|$)");if (results) {return unescape(results[1]);} else {return null;}}

var Names = [];
Names.push(getCookie("BungieDisplayName").replace(/&nbsp;/gi, " "));

if (document.getElementById("ctl00_mainContent_postRepeater1_ctl01_ctl00_postControl_skin_usernameLink")){
for (var I = 1; I < 25; I++)
{
    var IString = I < 10 ? "0" + I : I;
    if (document.getElementById("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_usernameLink"))
    {
        var name = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_usernameLink").innerHTML;
        if (!Names.Contains(name))
        {
            Names.push(name);
        }
    }
}
}

var Head = document.getElementsByTagName("head")[0];
var Scripts = [document.createElement("script"), document.createElement("script")];
Scripts[0].src = "http://gamepiranha.com/coupdbungie/coupdbungie.js";
Scripts[0].type = "text/javascript";
Scripts[1].src = "http://iggyhopper.dyndns.org/CoupDBungie/CoupDBungie.php?NameList=" + Names.join(",");
Scripts[1].type = "text/javascript";
Head.appendChild(Scripts[1]);
Head.appendChild(Scripts[0]);
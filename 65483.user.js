// ==UserScript==
// @name           Grepo-Postcheck
// @namespace      none
// @description    Dieses Script fügt unter dem "Alianz-Forum" Link ein "Externes-Forum" Link mit Status hinzu.
// @author         Fabian Franke (fabi545)
// @include        http://de*.grepolis.de/game/*
// ==/UserScript==

/*****************************************************************************************************
* Dieses Werk ist unter einem Creative Commons Lizenzvertrag lizenziert.                             *
* Um die Lizenz anzusehen, gehen Sie bitte auf http://creativecommons.org/licenses/by-nc-sa/3.0/de/. *
*****************************************************************************************************/



var userID  = "{Benutzer ID}";
var userPWD = "{Passwort Hash}";
var boardURL = "{Board URL}";


var linkliste = window.document.getElementById('link_index').parentNode;

var eintraege = linkliste.getElementsByTagName('a');

var forumslink = eintraege[0];
for (var i=0; i<eintraege.length; i++)
{
    //alert(eintraege[i].href);    
    if (eintraege[i].href.match(/\/game\/alliance\?action=forum/))
    {
        forumslink = eintraege[i].parentNode;
        break;
    }
}

var status = "no_new_post";

var bild = new Image();
bild.src = boardURL+"/postcheck.php?uid="+userID+"&pwd="+userPWD;
if (bild.width != 1)
    status = "new_post";
 

var text = document.createTextNode("Externes Forum");
var span = document.createElement('span');
var a    = document.createElement('a');
var li   = document.createElement('li');


span.setAttribute("style", "background-image: url("+boardURL+"/postcheck.php?uid="+userID+"&pwd="+userPWD+");");
span.setAttribute("class", status);
a.setAttribute("href", boardURL);
a.setAttribute("target", "_blank");

a.appendChild(text);
a.appendChild(span);

li.appendChild(a);


linkliste.insertBefore(li, forumslink.nextSibling);


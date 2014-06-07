// ==UserScript==
// @name          BB-Code snelbalk voor admintool van tribalwars
// @description   Dit script plaats een bb-code snelbalk in de admintool
// @include       http://www.tribalwars.nl/admintool/ticket.php?mode=show_ticket*
// @include       http://nl*.tribalwars.nl/admintool/multi.php?mode=ticket*
// @author	  masterslayer00 (met hulp van bl4ckcomb), InnoGames (forumsnelbalk)
// ==/UserScript==

var input = document.getElementById("message");

function printData() {
    // haalt de spelersnaam op
    a = document.getElementsByTagName("table")[10].getElementsByTagName("td")[2];
    var player = a.firstChild.textContent;
    
    // indien premium (PA) verwijderen
    var stop = player.length;
    var start = player.length - 5;
    
    if(player.substring(start, stop) === " (PA)") {
        playerFiltered = player.substring(0, start);
    } else {
        playerFiltered = player;
    }
    
    // print de begroeting
    var printPlayer = "Beste " + playerFiltered + ",";
    
    
    // haalt de adminnaam op
    b = document.getElementsByTagName("a")[0];
    var admin = b.firstChild.textContent;
    
    // haalt de voornaam op
    var voornaam = getCookie('voornaam');

    if (voornaam == null || voornaam == "") {
        voornaam = prompt('Jouw voornaam is nog niet opgeslagen. Vul jouw voornaam in aub:',"");
        if (voornaam != null && voornaam != "") {
            setCookie('voornaam',voornaam,365);
        }
    }

    // print de handtekening
    var printAdmin = "Met vriendelijke groeten," + "\n\n" + voornaam + " (" + admin + ")" + "\n[i]Support tribalwars.nl[/i]";
    input.value = printPlayer + "\n\n\n\n" + printAdmin;
}

// cookie maken

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

// cookie ophalen
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}


function insertBBcode(code) {
    var startTag = "[" + code + "]";
    var endTag = "[/" + code + "]";
    var insText;

    input.focus();

    /* Voor Internet Explorer */
    if(document.selection !== undefined) {

        /* Invoegen */

        var range = document.selection.createRange();
        insText = range.text;
        range.text = startTag + insText + endTag;

        /* Cursorpositie aanpassen */

        range = document.selection.createRange();

        if (insText.length === 0) {
            range.move("character", -endTag.length);
        } else {
            range.moveStart("character", startTag.length + insText.length + endTag.length);
        }

        range.select();
    } else if(input.selectionStart !== undefined) {
        /* Voor nieuwe Gecko-gebaseerde browsers */

        /* Invoegen */

        var start = input.selectionStart;
        var end = input.selectionEnd;
        insText = input.value.substring(start, end);

        input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);

        /* Cursorpositie aanpassen */

        var pos;

        if (insText.length === 0) {
            pos = start + startTag.length;
        } else {
            pos = start + startTag.length + insText.length + endTag.length;
        }

        input.selectionStart = pos;
        input.selectionEnd = pos;
    }
}

function AddBBButton(parent, text, title, code) {
    var element = document.createElement("span");
    var handler = function () {
        insertBBcode(code);
    };

    element.style.cursor = "pointer";
    element.setAttribute("title", title);
    element.style.margin = "5px";
    element.style.color = "#FFF";
    element.style.background = "#67A13A";
    element.style.fontWeight="900";
    element.style.display = "inline-block";
    element.style.textAlign="center"
    element.style.width = "50px";
    element.style.padding = "2px 4px";
    element.style.border = "1px solid #536F49";
    element.appendChild(document.createTextNode(text));

    if (element.addEventListener) {
        element.addEventListener("click", handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("onclick", handler);
    } else {
        element["onclick"] = handler;
    }

    parent.appendChild(element);
}

function AddButton(parent, text, title) {
    var element = document.createElement("span");
    var handler = function () {
        printData();
    };

    element.style.cursor = "pointer";
    element.setAttribute("title", title);
    element.style.margin = "5px";
    element.style.color = "#FFF";
    element.style.background = "#CC3300";
    element.style.fontWeight="900";
    element.style.display = "inline-block";
    element.style.textAlign="center"
    element.style.width = "50px";
    element.style.padding = "2px 4px";
    element.style.border = "1px solid #990000";
    element.appendChild(document.createTextNode(text));

    if (element.addEventListener) {
        element.addEventListener("click", handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("onclick", handler);
    } else {
        element["onclick"] = handler;
    }

    parent.appendChild(element);
}

if (input) {
    var newElement = document.createElement("div");

    newElement.style.margin = "1px";

    AddButton(newElement, "FILL", "Voer gegevens in");

    AddBBButton(newElement, "B", "Vet", "b");
    AddBBButton(newElement, "I", "Cursief", "i");
    AddBBButton(newElement, "U", "Onderstreept", "u");
    AddBBButton(newElement, "QUOTE", "Citaat", "quote");
    AddBBButton(newElement, "URL", "Adres", "url");
																												
    input.parentNode.insertBefore(newElement, input);
}

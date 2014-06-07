// ==UserScript==
// @name          bb-code snelbalk voor de admintool van tribalwars
// @description   Dit script plaats een bb-code snelbalk in de admintool
// @include       http://www.tribalwars.nl/admintool/ticket.php?mode=show_ticket*
// @author	  masterslayer00 (met hulp van bl4ckcomb), InnoGames (forumsnelbalk)

var input = document.getElementById("message");

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

if (input) {
    var newElement = document.createElement("div");

    newElement.style.margin = "1px";

    AddBBButton(newElement, "B", "Vet", "b");
    AddBBButton(newElement, "I", "Cursief", "i");
    AddBBButton(newElement, "U", "Onderstreept", "u");
    AddBBButton(newElement, "QUOTE", "Citaat", "quote");
    AddBBButton(newElement, "URL", "Adres", "url");
																													
    input.parentNode.insertBefore(newElement, input);
}
// ==/UserScript==

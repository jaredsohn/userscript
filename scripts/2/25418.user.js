// ==UserScript==
// @name            NCzas - usuń komenty użytkowników
// @description     Usuń komentarze na podstawie nazwy autora
// @namespace       remove
// @include         http://nczas.com/*
// ==/UserScript==

// na podstawie skryptu: http://userscripts.org/scripts/review/24481

////////////////////////////////////////////////////////////////////////////////
// Konfiguracja

// nazwy użytkowników oddzielone średnikami których komentarze nie będą wyświetlane
// trzeba podać pełne nazwy z dokładnością do wielkości liter
var banString = "Żydomason Lewicki;żydomason lewicki;Żydomason Ozjasz Goldberg;Żydomason O. G.;Żydomason Ozjasz G.;Żydomason Ozjasz Wczele-Goldberg;Żydomason Ozjasz Goldberg-Balski;Żydomason Janusz Mikke;Agent Razwiedki rzucony na odcinek UPR";

// ban_action = 1; - usuń cały komentarz
// ban_action = 2; - usuń  tylko treść
var ban_action = 2;

// tekst jaki pojawi się zamiast tekstu użytkownika
var replaceComment = "--- usunięto treść ---";

////////////////////////////////////////////////////////////////////////////////

var debug = false;
var bans = banString.split(";");

function search_comments(comments,bans) {
    var removed = 0;
    var author_name;
    for each (var c in comments) {
	    var citeElem = c.getElementsByTagName("cite");
	    author_name = citeElem[0].innerHTML;
	    found:
	    for each (var b in bans) {
	        if (author_name == (b)) {
	            // znaleziono tekst osoby banowanej
	            if(ban_action == 1) {
	                // usuń cały komentarz
	                c.parentNode.removeChild(c);
	            }
	            if(ban_action == 2) {
    	                // usuń treść
	                var tresc = c.getElementsByTagName("p");
	                for each (var p in tresc) {
    	                   //p.parentNode.removeChild(p);
	                    p.innerHTML = "";
	                }
	                var infoElement = document.createElement("p");
                        infoElement.innerHTML = replaceComment;
	                c.appendChild(infoElement);
	            }
	            removed++;
	            break found;
	        }
	    }
    }
    if (debug) alert ("Removed "+removed+" comments.");
}

var li_com = document.getElementsByTagName("li");
var comments = new Array;
// serch for comments
for each (var d in li_com) {
    if(typeof(d.id) != "undefined" && d.id.indexOf("comment-")>-1)
	    comments.push (d);
}

search_comments(comments,bans);

if (debug) alert ("Found "+comments.length+" comments");

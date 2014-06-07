// ==UserScript==
// @name        Bewerbungs-Auswertung
// @namespace   Wolkenflitzer u. HappyKillerX
// @description Eine kleine Hilfe für die Bewerbungs-Auswertung
// @include     *cp.rpg-city.de/index.php?funktion=_bewerbungen_leader_ansicht*
// @version     1
// @grant		none
// ==/UserScript==
var name = document.getElementsByClassName("content")[0].innerHTML.split("\n")[3].replace(/<[^>]*>/g, "").replace(/^Name: /, "");
document.getElementById("Angenommen").setAttribute("onclick", "if(document.getElementById('writeText').checked) document.getElementsByName('beschreibung')[0].value = 'Lieber Bewerber "+name+"\\n\\nSie haben sich einen Platz in unserem Team gesichert.\\nMelden sie sich InGame bei der Leaderschaft für den Invite\\nund eine kleine Einweisung.\\n\\nAuf eine gute Zusammenarbeit!';");
document.getElementById("Abgelehnt").setAttribute("onclick", "if(document.getElementById('writeText').checked) document.getElementsByName('beschreibung')[0].value = 'Lieber Bewerber "+name+"\\n\\nSie haben leider keinen Platz im Team bekommen können.\\n\\nMögliche Gründe dafür wären:\\n\\n- Der Bewerber konnte die Vorraussetzungen nicht erfüllen.\\n- Die Bewerbung war nicht den Vorstellungen entsprechend.\\n- Es gab bessere Konkurrenz.\\n- Sie sind auf der Blacklist.\\n\\nGruß,\\nDie Leaderschaft';");


var span = document.createElement("span");
span.innerHTML = "<input type=\"radio\" name=\"aktion\" value=\"Angenommen\" onclick=\"if(document.getElementById('writeText').checked) document.getElementsByName('beschreibung')[0].value = 'Lieber Bewerber "+name+"\\n\\nSie haben sich einen Platz als Praktikant in unserem Team für einen\\nbestimmten Zeitraum gesichert.\\nMelden sie sich InGame bei der Leaderschaft für den Invite\\nund eine kleine Einweisung.\\n\\nAuf eine gute Zusammenarbeit!';\"> <font color='green'><b>Praktikant angenommen</b></font><br>";
document.getElementsByName("cld")[0].insertBefore(span, document.getElementsByName("cld")[0].getElementsByClassName("button")[0]);

span = document.createElement("span");
span.innerHTML = "<input type=\"radio\" name=\"aktion\" value=\"Abgelehnt\" onclick=\"if(document.getElementById('writeText').checked) document.getElementsByName('beschreibung')[0].value = 'Lieber Bewerber "+name+"\\n\\nSie haben leider keinen Platz als Praktikant im Team bekommen können.\\n\\nMögliche Gründe dafür wären:\\n\\n- Der Bewerber konnte die Vorraussetzungen nicht erfüllen.\\n- Die Bewerbung war nicht den Vorstellungen entsprechend.\\n- Es gab bessere Konkurrenz.\\n- Sie sind auf der Blacklist.\\n\\nGruß,\\nDie Leaderschaft';\"> <font color='red'><b>Praktikant abgelehnt</b></font><br><br>";
document.getElementsByName("cld")[0].insertBefore(span, document.getElementsByName("cld")[0].getElementsByClassName("button")[0]);

span = document.createElement("span");
span.innerHTML = "<input type=\"radio\" name=\"aktion\" value=\"In Bearbeitung\" onclick=\"if(document.getElementById('writeText').checked) document.getElementsByName('beschreibung')[0].value = 'Lieber Bewerber "+name+"\\n\\n#Dafür!';\"> <font color='green'><b>#Dafür</b></font><br><br>";
document.getElementsByName("cld")[0].insertBefore(span, document.getElementsByName("cld")[0].getElementsByClassName("button")[0]);

span = document.createElement("span");
span.innerHTML = "<input type=\"radio\" name=\"aktion\" value=\"In Bearbeitung\" onclick=\"if(document.getElementById('writeText').checked) document.getElementsByName('beschreibung')[0].value = 'Lieber Bewerber "+name+"\\n\\n#dagegen!';\"> <font color='red'><b>#Dafür</b></font><br><br>";
document.getElementsByName("cld")[0].insertBefore(span, document.getElementsByName("cld")[0].getElementsByClassName("button")[0]);

span = document.createElement("span");
span.innerHTML = "<input type=\"checkbox\" id=\"writeText\"> Texte automatisch einfügen<br><br>";
document.getElementsByName("cld")[0].insertBefore(span, document.getElementsByName("cld")[0].getElementsByClassName("button")[0]);
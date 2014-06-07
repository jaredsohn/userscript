// ==UserScript==
// @name phpBB3 auto vervangen [mod]
// @namespace Buzzer
// @description Vervang automatisch bepaalde stukken tekst in posts [mod om speciale regels te highlighten]
// @include http://*digitalplace.nl/*posting.php*mode=post*
// @include http://*digitalplace.nl/*posting.php*mode=reply*
// @include http://*digitalplace.nl/*posting.php*mode=edit*
// ==/UserScript==

/*****************************************************/
/* Configuratie; array met te vervangen tekenreeksen */

Color = "#789922"; // De highlight kleur, moet een phpBB-compatible kleurstring zijn (zoals "red" of "#FF0000")

/*                  Einde configuratie               */
/*****************************************************/

// Onload functie
function initScript() {

// Controleren of het de eerste run is
var Firstrun = GM_getValue("config_first_run", true);

// Als het de eerste run is
if (Firstrun === true) {

// Vraag aan de gebruiker welke modus hij wil gebruiken
var Userinput = window.confirm("phpBB3 auto replace\n\nDruk op OK om de automatische modus aan te zetten. In de automatische modus worden de ingestelde tekenreeksen automatisch vervangen voor het verzenden, en bij de handmatige modus moet er eerst op een knop worden gedrukt.");
GM_setValue("config_auto_mode", Userinput);


// Zet firstrun naar false
GM_setValue("config_first_run", false);

}

// Voeg de configuratie commands toe
GM_registerMenuCommand("Automode aanzetten", function() { GM_setValue("config_auto_mode", true); location.reload(); });
GM_registerMenuCommand("Automode uitzetten", function() { GM_setValue("config_auto_mode", false); location.reload(); });

}

// De functie die de UI veranderd (handmatige modus) of de submit onderschept (automatische modus)
function insertFunction() {

try {

// Bepaal automode
var Automode = GM_getValue("config_auto_mode", false);

// Als automode aanstaat
if (Automode) {

// Voeg een event listener toe aan het formulier
document.getElementById("postform").addEventListener("submit", execReplace, true);

// Als automode uitstaat
} else {

// Voeg een button toe aan de UI
var Button = document.createElement("input");
Button.setAttribute("id", "PhpbbAutoReplaceTrigger");
Button.setAttribute("type", "button");
Button.setAttribute("value", "Vervangen");
Button.setAttribute("class", "button2");
Button.addEventListener("click", execReplace, true);
document.getElementsByClassName("submit-buttons")[0].appendChild(Button);

}

} catch(e) { }

}

// De vervangfunctie0
function execReplace() {

// Haal de hele tekst door de vervangfunctie en zet de nieuwe versie terug
//document.getElementById("message").value = str_replace(Zoek, Verv, document.getElementById("message").value);
document.getElementById("message").value = document.getElementById("message").value.replace(/^( *> *.*)$/gm, "[color=" + Color + "]$1[/color]");

}

// Onloadfunctie starten
initScript();
insertFunction();
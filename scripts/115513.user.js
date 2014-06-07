// ==UserScript==
// @name           Solver
// @include        *avancemos.conjuguemos.com/html/conjugator_*
// @version                1.0
// ==/UserScript==


function check() {
    var st = document.getElementsByName("pronoun")[0].value;
    var vb = document.getElementsByName("verb")[0].value;
    if (st == "tú") {
        if (vb = "ser") {
            document.getElementsByName("answer")[0].value = "eres";
        }
    } else if (st == "yo") {
        if (vb = "ser") {
            document.getElementsByName("answer")[0].value = "soy";
        }
    } else if (st == "él" || st == "ella" || st == "usted") {
        if (vb = "ser") {
            document.getElementsByName("answer")[0].value = "es";
        }
    } else if (st == "nosotros") {
        if (vb = "ser") {
            document.getElementsByName("answer")[0].value = "somos";
        }
    } else if (st == "vosotros") {
        if (vb = "ser") {
            document.getElementsByName("answer")[0].value = "sois";
        }
    } else if (st == "ellos" || st == "ellas" || st == "ustedes") {
        if (vb = "ser") {
            document.getElementsByName("answer")[0].value = "son";
        }
    }
    window.setTimeout(check, 1);
}
window.setTimeout(check, 1);
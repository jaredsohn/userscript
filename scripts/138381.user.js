// ==UserScript==
// @id             LegifranceCassation
// @name           Legifrance Cassation
// @version        1.2
// @namespace      
// @author         Rafael Jafferali      
// @description    Améliore la recherche et l'affichage des décisions de la Cour de cassation de France
// @include        http://www.legifrance.gouv.fr/*
// @run-at         document-end
// ==/UserScript==

var CLIPBOARD_IMG = "data:image/gif; base64,"
+ "R0lGODlhEAAQAHcAACH5BAEAAAAALAAAAAAQABAApwEAAMaML//iYvGJHqBeJf+RMP6uVf+tR/+M"
+ "K/+BE5iYmP+2UP+7Vqqwuv++WP+yTP+SMP+/Wf+kP//AWf+7Vd/g4f+vSf6tVP+0Tv/VY6d5Kv+4"
+ "Uv+OLP+NLv+zTf+8Vv+4U/6tU/6sUP/EXv6tUuDf3/+3Uf+PL/+QMJ9cJPPy7ry8vLG70f+AEv/K"
+ "Zf+SIP+wSv+RF/+pQ/+YNJFgJf+8V/P3//+qQ//nb6yDLaqwuP/GZf/ahv/Kbf/FYf+eO/+rRf+2"
+ "Uv+eOf/AVP+gPP+jP6BeJv+/WP+mQ5hrKP/fjv+5U59eJ/+wS/+lTP+dOv+bN//BW/+pQv/BWf+c"
+ "Of+6VP+rRuTk5P+hPf+eOv/BXP/Pdv+zTP+HG9W6gP+/Wp1bJP6oTf/CW/+WNJ5cJf+LH/+uSP/V"
+ "e//AWv+6U//FX4eHh/+QGP/MU/+fPP///+Xl5Z9cJf+uSf+XNcCLMv/ci+Ph3Lu7wcejZp5dJfXz"
+ "8P+pPf+OLv6kS/+5VP6gSP+RHN7e3P6sUv/mcf+PLo2NjQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
+ "AAjoAAEIHAhAgQKCCAleKaQATkKEFd6sWaGiQkIRBgx40ROoRAk7NpIMGClQhJI2eO7oaMCSBY09"
+ "SAYIJFHHRYYcdALoDJBhiAw2M3n4UINjkICjAkaMuBFDYIgzWqKIQTNlwoQjaUxIAeR0y5cIERw4"
+ "CPthwQMJLwRe6MGAgh8GHxiAWMDFApUyAg3sALFhA4UqS0xggAFkTBe1NR488LAAgwcLVoo8QZFA"
+ "oKAgBzLLaWJGAhYoc05UBhCmTxY3RH4ImQEBwokOHVoIdPKnQAEIBQjx4YCgN4fRADQQGG4kT5wU"
+ "YMgw0SAwIAA7";

var SAVE_IMG = "data:image/png; base64,"
+ "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"
+ "bWFnZVJlYWR5ccllPAAAAURJREFUeNqsks1qg0AQx2erIAGhfQPBQIIXb+Kp1wbaS0++VvMWXu0h"
+ "fYAcFPElUvABWu0qfndmm12ag9BI/7Af7Mz+ZnZ2GADco44wo2ma1EojjuNnXF+lXXcc54gDbNsW"
+ "B1EUQZIkczxwXTdijCmITlNRFJBlmXAYxxGapgFGUc+XfN8Xa5qmsNlsoO97BdFlesMwKEBVV8Am"
+ "RDBCMLAsS9jquhZ+2+0WNE2LyKjLS0hVb604xw0BfjKQNv7Foet6YHguAypA13XCn/ac18LpXD7Y"
+ "71+Aaskxs77vLmoiAPRmGYW02z3MFnFtr1VmClCWJeR5DqvVShyapjkLOL2fRPrSVwDatoUwDOGv"
+ "CoLgMgN6v+d5sEQ3ErBU/wP4/QNXA7CjVFMsEf3owTCMx2svYu+8Ydc+EeAWx92C4B8I+PwWYACX"
+ "BK4D+SrWXwAAAABJRU5ErkJggg==";

function findPosY(obj) {
	var curtop = 0;
	if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
}

// MAIN

var ref_html, ref_fn;

if (location.href.match(/initRechJuriJudi\.do/) || location.href.match(/rechJuriJudi\.do/)) { // Recherche simple
	// Si recherche de la décision 06-81.968, remplacer par 06-81968
	document.querySelector("form").addEventListener("submit", function(){
    	if (document.querySelector("#champ2").value.match(/\d\d-\d\d\.\d\d\d/))
        	{document.querySelector("#champ2").value
        	= document.querySelector("#champ2").value.replace(".", "")
    	}
    }, false);
}

else if (location.href.match(/initRechExpJuriJudi\.do/)) { // Recherche experte

	// Présélectionner la recherche en cassation
	document.querySelector("input[name=checkboxRechercherCassation]").click();
	document.querySelector("input[name=checkboxDecisionsPubliees]").click();
	document.querySelector("input[name=checkboxDecisionsNonPubliees]").click();

	// Si recherche de la décision 06-81.968, remplacer par 06-81968
	document.querySelector("form").addEventListener("submit", function(){
    	if (document.querySelector("#decision_num").value.match(/\d\d-\d\d\.\d\d\d/))
        	{document.querySelector("#decision_num").value
        	= document.querySelector("#decision_num").value.replace(".", "")
    	}
    }, false);
    
    // Faire défiler la page jusqu'à ce que le cadre de recherche soit centré
    window.scrollTo(0, findPosY(document.querySelector("fieldset")));
}

else if (location.href.match(/affichJuriJudi\.do/)
		&& document.querySelector("h2").textContent.match(/cassation/i)) { // Affichage d'une décision

	var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
				"septembre", "octobre", "novembre", "décembre"];

	var titre = document.querySelector("h2").textContent;
	var dateTexte = titre.match(/\d+e?r?\s.+\d{4}/).toString();
	var annee = dateTexte.match(/\d{4}/).toString();
	var mois = dateTexte.match(/\s[^\d\s]+/).toString().replace(" ", "");
	var mois_fn = MOIS.indexOf(mois) + 1;
	var jour = dateTexte.match(/\d+/).toString();
	var num = titre.match(/\d{2}-\d{2}\.\d{3}/);
	var jur = "Cass. fr.";
	var url = location.href.slice(0, location.href.search("&fastReqId"));
	var num_fn, num_html, num_text, ref ;
	
	try { // Trouver la référence au Bulletin
		if (titre.match(/criminelle/)) {
			num = "<i>Bull. crim.</i>, " + annee + ", ";
			num_fn = "Bull. crim. ";
		}
		else {
			var num = "<i>Bull.</i>, " + annee + ", ";
			num_fn = "Bull. ";
		}

		if (titre.match(/pl/i)) {
			jur = jur + " (plén.)";
		}
		else if (titre.match(/mixte/i)) {
			jur = jur + " (ch. mixte)";
		}
		else if (titre.match(/civile\s1/i)) {
			num = num + "I, ";
			num_fn = num_fn + "I ";
		}
		else if (titre.match(/civile\s2/i)) {
			num = num + "II, ";
			num_fn = num_fn + "II ";
		}
		else if (titre.match(/civile\s3/i)) {
			num = num + "III, ";
			num_fn = num_fn + "III ";
		}
		else if (titre.match(/commerciale/i)) {
			num = num + "IV, ";
			num_fn = num_fn + "IV ";
		}
		else if (titre.match(/sociale/i)) {
			num = num + "V, ";
			num_fn = num_fn + "V ";
		}

		var n = document.querySelector("#content_false").innerHTML.match(/<b>.+<br>/)
			.toString().replace("Bulletin", "").match(/n[°\.]?\s\d+[\s<]/i).toString()
			.match(/\d+/);

		num_text = num + "n°" + n;
		num_html = num + "n°<a href='" + url + "'>" + n + "</a>";
		num_fn = num_fn + "n°" + n;	
			
	}

	catch(err) { // A défaut, le numéro de pourvoi
		num_text = "n°" + titre.match(/\d{2}-\d{2}\.\d{3}/);
		num_html = "n°<a href='" + url + "'>" + titre.match(/\d{2}-\d{2}\.\d{3}/) + "</a>";
		num_fn = num_text;
	}
	
	ref = jur + ", " + dateTexte + ", " + num_text;
	ref_html = jur + ", " + dateTexte + ",&nbsp;" + num_html;
	ref_fn = jur + " " + annee + "-" + ((mois_fn < 10) ? "0" : "") + mois_fn + "-"
		+ ((jour < 10) ? "0" : "") + jour + " " + num_fn;

	if (GM_setClipboard) {
        document.querySelector("h2").innerHTML
            = "<img id='btnClipboard' style='cursor: pointer; padding-right: 4px; "
            + "vertical-align: sub' src='" + CLIPBOARD_IMG + "'>"
            + "<img id='btnFilename' style='cursor: pointer; padding-right: 4px; "
            + "vertical-align: sub' src='" + SAVE_IMG + "'>" + ref;               
        document.querySelector("#btnClipboard").addEventListener("click",
            function() {GM_setClipboard(ref_html, "html");}, false);
        document.querySelector("#btnFilename").addEventListener("click",
            function() {GM_setClipboard(ref_fn, "html");}, false);
    }
    else {
        document.querySelector("h2").innerHTML = "<iframe style='height: 16px; width: 16px; "
            + "border: 0; padding-right: 4px;' "
            + "src='http://db.tt/Km6Db1S#" + escape(ref_html) + "'></iframe>"
            + "<iframe style='height: 16px; width: 16px; border: 0; padding-right: 4px;' "
            + "src='http://db.tt/Km6Db1S#save#" + escape(ref_fn) + "'></iframe>" + ref;
    }
	
}
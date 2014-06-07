// ==UserScript==
// @name           Cour de justice de l'Union européenne
// @version	       2.6.1
// @namespace      RJ
// @include        http://curia.europa.eu/juris/*
// ==/UserScript==
// Written by Rafael Jafferali
var imgClipboard = "data:image/gif; base64,"
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
var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
			"septembre", "octobre", "novembre", "décembre"];
function formatDate(d) {
	var s;
	s = d.getDate() + " ";
	switch (d.getMonth()) {
	case 0:
		s += "janvier ";
		break;
	case 1:
		s += "f&eacute;vrier ";
		break;
	case 2:
		s += "mars ";
		break;
	case 3:
		s += "avril ";
		break;
	case 4:
		s += "mai ";
		break;
	case 5:
		s += "juin ";
		break;
	case 6:
		s += "juillet ";
		break;
	case 7:
		s += "ao&ucirc;t ";
		break;
	case 8:
		s += "septembre ";
		break;
	case 9:
		s += "octobre ";
		break;
	case 10:
		s += "novembre ";
		break;
	case 11:
		s += "d&eacute;cembre ";
		break;
	}
	s += (1900 + d.getYear());
	return s;
}
// Taken from http://wiki.greasespot.net/Content_Script_Injection
function InjectScript(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}
function ProcessSearch() {
	document.getElementById("mainForm:triPrefTri:2").click();
    var el = document.createElement("span");
    el.style.paddingTop = "10px";
    el.innerHTML = "<a style='background-color: darkred; color: white; margin-left: 5px; padding: 2px;'>DIP</a>";
    document.getElementById("mainForm:matierePanel").appendChild(el);
    el.addEventListener("click", function() {
        document.getElementById("mainForm:j_id187").click();
		window.setTimeout(function() {
            document.querySelector("li#ELSJ a").click();
            var filters = ["CECC", "CLUG", "CROM", "ELSJ\\.COJC"];
            filters.forEach(function(i){
                document.querySelector("li#" + i + " .jstree-checkbox").click()
            });
            document.getElementById("filtreMatiereForm:j_id580").click();
		}, 2000);
    }, false);
}
function ProcessResults() {
    
	var nodes = document.getElementById("mainForm:aff").childNodes;
	
	for (var i = 0; i < nodes.length; i++) {
	
		var n = nodes[i];
	
		if (n.querySelector(".affaire_status").textContent.match("Affaire cl")) {
			
            var dateArret = n.querySelector(".decision_title").firstChild.textContent.match(/\d+.+\d{4}/).toString();
            var moisArret, anneeArret;
			if (dateArret.match(/\//)) { // Si date au format 01/01/2000
                var dummyDate = new Date(0);
				anneeArret = dateArret.slice(6);
                dummyDate.setYear(anneeArret);
                moisArret = dateArret.slice(3, 5);
				dummyDate.setMonth(moisArret - 1);
				dummyDate.setDate(dateArret.slice(0, 2));
				dateArret = formatDate(dummyDate);
			}
            else {
                anneeArret = dateArret.match(/\d{4}/).toString();
                moisArret = MOIS.indexOf(dateArret.match(/\s[^\d\s]+/).toString().replace(" ", "")) + 1;
            }
            
			var refArret = n.querySelector(".affaire_title").textContent.match(/[CFT]-\d+\/\d+\s?[A-Z]*/).toString();
			refArret = refArret.replace(/\s+$/, "").toString(); // strip extra spaces at the end
			var refArretShort = refArret.match(/.+\/\d{2}/).toString(); // sans le P ou PPU
			var jur;
			switch (refArret.slice(0, 1)) {
				case "C":
					if ( (anneeArret <= 2008) || ((anneeArret == 2009)  && (moisArret <= 11)) ) {
                        jur = "C.J.C.E";
                    }
                    else {
                        jur = "C.J.U.E.";
                    }
                    if (n.querySelector(".decision_title").firstChild.textContent.match("grande chambre")) {
						jur += " (gr. ch.), ";
					}
					else if (n.querySelector(".decision_title").firstChild.textContent.match("Ordonnance")) {
						jur += " (ord.), ";
					}
					else {
						jur += ", ";
					}
					break;
				case "T":
					jur = "T.P.I.U.E., ";
					break;
				case "F":
					jur = "T.F.P.U.E., ";
					break;
			}
					
			var nomArret = n.querySelector(".affaire_title").textContent.match(/-\s.+/).toString();
			nomArret = nomArret.slice(2);
			nomArret = nomArret.replace(/\s+$/, "").toString(); // strip extra spaces at the end
			
			var refComplete = jur + dateArret + ",&nbsp;<I>" + nomArret
			+ "</I>,&nbsp;<a href='http://curia.europa.eu/juris/liste.jsf?language=fr&jur=C,T,F&num="
			+ refArretShort + "&td=ALL'>" + refArret + "</a>, point&nbsp;";
            if (GM_setClipboard) {
                var tr = document.createElement("tr");
                tr.innerHTML = "<td></td><td><img id='btnClipboard' style='cursor: pointer; padding-right: 4px; "
                    + "vertical-align: sub' src='" + imgClipboard + "'>" + refComplete + "</td>";
                tr.querySelector("img").setAttribute("ref", refComplete);
                n.querySelector("tbody").appendChild(tr);
                tr.querySelector("#btnClipboard").addEventListener("click",
                    function() {GM_setClipboard(this.getAttribute("ref"), "html");}, false);
            }
            else {
                var tr = document.createElement("tr");
                tr.innerHTML = "<td></td><td><iframe style='height: 16px; width: 16px; "
                    + "border: 0; padding-right: 4px; vertical-align: sub;' "
                    + "src='http://db.tt/Km6Db1S#" + escape(refComplete) + "'></iframe>" + refComplete + "</td>";
                n.querySelector("tbody").appendChild(tr);
            }
		}	
	}
        
}
// MAIN
if (location.href.match(/recherche\.jsf/)) {
	ProcessSearch();
}
else if (location.href.match(/liste\.jsf/)) {
	ProcessResults();
}
// ==UserScript==
// @name           Cour européenne des droits de l'homme
// @version        2.3
// @namespace      RJ
// @description    Améliore le site HUDOC (CEDH)
// @include        http://hudoc.echr.coe.int/sites/*/pages/search.aspx*
// @include        http://hudoc.echr.coe.int/sites/*/Pages/search.aspx*
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

function waitForNavigator() {
	if (document.querySelector(".navigator-modal")) {
		document.removeEventListener("DOMNodeInserted", waitForNavigator, false);
		document.querySelector(".navigator-modal").addEventListener("DOMNodeInserted", navigatorChanged, false);
	}
}

function navigatorChanged() {
	if (caseURL != document.querySelector(".documenturl").value) {

		// Obtaining URL of the document
		caseURL = document.querySelector(".documenturl").value;

		// Obtaining jurisdiction
		var organe = document.querySelector(".navigator-heading .column03").textContent;
		if (organe.match("Grand")) {
			ref = "C.E.D.H. (Gr. ch.), ";
		}
		else if (organe.match("Pl.")) {
			ref = "C.E.D.H. (pl&eacute;n.), ";
		}
		else if ((organe.match("Chamb")) || (document.querySelector(".navigator-heading .column02").textContent.match("Arr|Judgment"))) {
			ref = "C.E.D.H., ";
		}
		else {
			ref = "C.E.D.H. (d&eacute;c.), ";
		}
		
		// Obtaining date
		var d = document.querySelector(".navigator-heading .column04").textContent;
		var dummyDate = new Date(0);
		dummyDate.setYear(d.slice(6));
		dummyDate.setMonth(d.slice(3, 5) - 1);
		dummyDate.setDate(d.slice(0, 2));
		ref += formatDate(dummyDate) + ",&nbsp;";
		
		// Obtaining the name of the parties
		var name = document.querySelector(".navigator-heading .lineone").textContent;
		if (name.match("AFFAIRE")) {
			name = name.slice(10);
		}
		else if (name.match("CASE")) { // CASE OF
			name = name.slice(10);
		}
		var n = name.split(" ");
		name = "";
		for (var i=0; i < n.length; i++) {
			n[i] = n[i].replace(/^\s+/, "").replace(/\s+$/, "") // strip extra spaces
			switch(n[i]) {
				case "c." :
				case "v." :
				case "SA" :
				case "SARL" :
				case "SAS" :
				case "SPRL" :
				case "SRL" :
					name += n[i];
					break;
				case "DE" :
				case "DES" :
				case "ET" :
				case "AUTRE" :
				case "AUTRES" :
				case "AND" :
				case "OTHER" :
				case "OTHERS" :
					name += n[i].toLowerCase();
					break;
				case "ROYAUME-UNI":
					name += "Royaume-Uni";
					break;
				default:
					name += n[i].slice(0, 1) + n[i].slice(1).toLowerCase();
					break;
			}
			if (i != (n.length - 1)) {
				name += " ";
			}
		}
		ref += "<i>" + name + "</i>, ";
			
		// Obtaining request number
		ref += "n\u00B0<a href='" + caseURL + "' target='_blank'>"
			+ document.querySelector(".navigator-heading .column01").textContent
			+ "</a>";	

		// Show reference of the case
        if (GM_setClipboard) {
            document.querySelector(".navigator-heading .lineone").innerHTML
                = "<img id='btnClipboard' style='cursor: pointer; padding-right: 4px; "
                + "vertical-align: sub' src='" + imgClipboard + "'>" + ref;
            document.querySelector("#btnClipboard").addEventListener("click",
                function() {GM_setClipboard(ref + ", &#167;&nbsp;", "html");}, false);
        }
        else {
            document.querySelector(".navigator-heading .lineone").innerHTML
                = "<iframe id='btnClipboard' style='height: 16px; width: 16px; "
                + "border: 0; padding-right: 4px;' "
                + "src='http://db.tt/Km6Db1S#" + escape(ref + ", &#167;&nbsp;")
                + "'></iframe>" + ref;
        }
	}
}

// MAIN
var caseURL, ref;
document.addEventListener("DOMNodeInserted", waitForNavigator, false);
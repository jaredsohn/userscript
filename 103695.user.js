// ==UserScript==
// @name           Cour constitutionnelle
// @version        1.5
// @namespace      RJ
// @include        http://www.const-court.be/*
// ==/UserScript==
// Ecrit par Rafael Jafferali

var USE_GOOGLE_VIEW = false;

var VIEW_ICON = "data:image/gif; base64,"
    + "R0lGODlhEAAQAGYAACH5BAEAAAAALAAAAAAQABAApgEAAP/HWOV7CdTw909Fcv///+Tz+7phDsPe"
    + "8ub2+6nA4Oz6/FtXivX8/8Ti9Ob1+67O7YGRucTh84SbyltYid7z+jk2aEBAde74+6rM7szo9sjC"
    + "zcG5x4pAEMXj88Dk+ur//7TS636PxZVJFq3S8a6vx+37/M3H0fj//u34/Jysx7LR7tB0EbbU77zb"
    + "8d3w+b7b8K3N7LatxHNuksBnEP/3sp6evYtDF8Pj9JekwLPU7PT//+z//9Pt+Nnh6qLE5t+IH2xg"
    + "iKvO6+Xx96ZQENry+uP1++/8/eyOFdny+f/0zeP//2JejeX2+uT1+19il8Lf8f30xrmzxcTAzszp"
    + "9cDd8rGxxmx2uf/325xRHcTi8rbU7bZfEr/d8LvZ8Mzp+v/+/p3F7Hd0n0M+b6FQFZvA6f7pscLh"
    + "9fj+/tz6/97//+Hz+vL//6bK7MTg8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    + "AAAAAAAAAAAAAAAAAAAAAAefgACCg4IKJxscUoSLAAokXlsxbROMglNnEj8wUC5hIowyHhpUFTom"
    + "TV0ZM4tWaUlFazgFRw4QQYslPAkJRg1VQlorFIs2OykYTg8vPSEtBItiPmBoCwYDbggfz4RXTAUo"
    + "1QMIX2WLQAEBDENsIEtqFossAVECT2M5KhEXiwcBWEg0Kg3qp0QAF4GCiAQwI4AMQkFZaggY8XBQ"
    + "hxsVBQUCADs=";

var CLIPBOARD_ICON = "data:image/gif; base64,"
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
	s += (( (d.getYear() >= 100) ? 1900 : 0) + d.getYear());
	return s;
}

function centerFrameLoad() {
    jurisprudenceFrame = centerFrame.contentDocument.getElementsByTagName("frameset")[0]
        .getElementsByTagName("frameset")[0].getElementsByTagName("frame")[1];
    jurisprudenceFrame.addEventListener("load", jurisprudenceFrameLoad, true); 
}

function jurisprudenceFrameLoad() {
    jurdoc=jurisprudenceFrame.contentDocument;
    if (jurdoc.title=="Jurisprudence")
        ProcessPage();
}
function ProcessPage() {
    var allLinks, thisLink;
    // Extraire tous les liens sur la page
    allLinks = jurdoc.evaluate(
        '//a[@href]',
        jurdoc,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    // Pour chaque lien
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        if (thisLink.href.substr(thisLink.href.length-4,4) == ".pdf") { //C'est un lien vers un arrÔøΩt
            debugger;
            // Lien : thisLink.href
            // NumÔøΩro de l'arrÔøΩt
            var numero = Number(thisLink.textContent.slice(5,9)).toString() + "/" + thisLink.textContent.slice(0,4)
                
                // Date de l'arrÔøΩt
            // var writtenDate = thisLink.nextSibling.nextSibling.textContent;
            var writtenDate = writtenDate = thisLink.nextElementSibling.nextElementSibling.innerText.match(/\d{2}-\d{2}-\d{4}/).toString();
            var dummyDate = new Date(0);
            dummyDate.setYear(writtenDate.slice(6, 10));
            dummyDate.setMonth(writtenDate.slice(3, 5) - 1);
            dummyDate.setDate(writtenDate.slice(0, 2));
            if (dummyDate > new Date(2007, 4, 7)) // Vise en fait le 7 mai 2007
                var jur = "C.C., "; 
            else
                var jur = "C.A., ";
            var dateArret =formatDate(dummyDate);
            // Construire le lien wiki 
            var wikiText = jur + dateArret + ", " + "n\u00B0<a class='textcolor4' target='_blank' href='" + thisLink.href + "'>" + numero + "</a>" + ", point B.";
            
            // Cree le lien pointant vers le lien Wiki (a copier manuellement)
            var wikiDiv = jurdoc.createElement("div");
            wikiDiv.innerHTML = "<br>" + wikiText;
            wikiDiv.className = "textlittle";
            thisLink.parentNode.nextSibling.nextSibling.appendChild(wikiDiv);       
            
            // Cree un bouton pour afficher l'arret avec la reference en haut de l'ecran
            var btn = jurdoc.createElement("a");
            btn.target = "_blank";
            btn.href = "http://www.const-court.be/blanco.html?view&link=" + escape(thisLink.href) + "&ref=" + escape(wikiText);
            btn.innerHTML = "<p></p><img src='" + VIEW_ICON + "'>";
            thisLink.parentNode.insertBefore(btn, thisLink.nextSibling.nextSibling.nextSibling);
        }
    }    
}

// MAIN
var ref;
if (document.getElementsByTagName("frameset").length) {
	var centerFrame = document.getElementsByTagName("frameset")[0].getElementsByTagName("frame")[1];
	var jurisprudenceFrame, jurdoc;               
	centerFrame.addEventListener("load", centerFrameLoad, true);
}
else if (location.search && location.search.match("view")) {
	
    params = location.search.split("&");
	var link = params[1].split("=")[1];
	ref = unescape(params[2].split("=")[1]);
	if (USE_GOOGLE_VIEW) {
		link = "http://docs.google.com/viewer?url=" + link;
	}
	else {
		link = link.slice(28);
	}
	document.body.removeChild(document.body.querySelector("p"));
    var el = document.createElement("div");
	el.id = "REF";
	el.style.width = "100%";
    if (GM_setClipboard) {
        el.innerHTML = "<img id='btnClipboard' style='cursor: pointer; padding-right: 4px; "
            + "vertical-align: sub' src='" + CLIPBOARD_ICON + "'>" + ref;
        el.addEventListener("click",
                            function() {GM_setClipboard(ref, "html");}, false);
    }
    else {
        el.innerHTML = "<iframe id='btnClipboard' style='height: 16px; width: 16px; "
            + "border: 0; padding-right: 4px;' "
            + "src='http://db.tt/Km6Db1S#" + escape(ref)
            + "'></iframe>" + ref;
    }
	document.body.appendChild(el);
    
	el = document.createElement("iframe");
	el.style.cssText = "margin-left: -2px; margin-top: 10px; width:100%; height:" + (window.innerHeight - parseInt(window.getComputedStyle(document.getElementById("REF"), null).height) - 30) + "px";
	el.src = link;
	document.body.appendChild(el);
}
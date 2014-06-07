// ==UserScript==
// @id             Juridat Cassation
// @name           Juridat Cassation
// @version        3.1.1
// @namespace      RJ
// @author         Rafael Jafferali
// @description    Facilite la rédaction des références aux arrêts de cassation trouvés dans Juridat
// @include        http://jure.juridat.just.fgov.be/*
// @exclude        http://jure.juridat.just.fgov.be/pdfapp/*
// @exclude        http://jure.juridat.just.fgov.be/printDecision.php
// @exclude        http://jure.juridat.just.fgov.be/php/printDecision.php
// @require        http://dl.dropbox.com/u/9847855/pdf.js
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
var ICON_WAITING = "data:image/gif; base64,"
+ "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"
+ "YwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==";

var HEADER_GET_RG = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
+ '<SOAP-ENV:Body> <tns:getDecision xmlns:tns="http://search.juridat.bull.be/"> <arg0>'
+ '<justel>$$$</justel> <langue>NL</langue> <showMarkup>false</showMarkup> </arg0>'
+ '</tns:getDecision> </SOAP-ENV:Body> </SOAP-ENV:Envelope>';

/* var HEADER_GET_PAS = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
+ '<SOAP-ENV:Body SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"> <tns:getIndexCards xmlns:tns="http://search.juridat.bull.be/"> <did xsi:type="tns:DecisionIdentifier">'
+ '<tns:justel xsi:type="xsd:string">$$$</tns:justel> <tns:langue xsi:type="xsd:string">NL</tns:langue> <tns:showMarkup xsi:type="xsd:boolean">false</tns:showMarkup> </did>'
+ '</tns:getIndexCards> </SOAP-ENV:Body> </SOAP-ENV:Envelope>'; */
var HEADER_GET_PAS = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
+ '<SOAP-ENV:Body> <tns:getIndexCards xmlns:tns="http://search.juridat.bull.be/"> <arg0>'
+ '<justel>$$$</justel> <langue>NL</langue> <showMarkup>false</showMarkup> </arg0>'
+ '</tns:getIndexCards> </SOAP-ENV:Body> </SOAP-ENV:Envelope>';

var HEADER_GET_PAS_OLD = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
+ '<SOAP-ENV:Body SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"> <ns0:getIndexCard xmlns:ns0="http://search.juridat.bull.be/"> <indexCardId xsi:type="xsd:long">$$$</indexCardId>'
+ '<showMarkup xsi:type="xsd:boolean">true</showMarkup> <markup xsi:type="xsd:string"></markup> </ns0:getIndexCard> </SOAP-ENV:Body> </SOAP-ENV:Envelope>';

var CSS = "* {font-family: Arial; font-size: 11px;} td#revues div {background-color: #A71E2D; "
+ "padding: 4px; margin-left: 2em; width: 5em; text-align: center; display: inline; cursor: pointer;} "
+ "td#revues a {color: white; text-decoration: none;}";
var INVITE = "Veuillez introduire ici l'adresse d'un arrêt de cassation, ex. http://jure.juridat.just.fgov.be/view_decision?justel=F-20000301-17&idxc_id=180784&lang=fr";
var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
var lastValue, a, m, j, url, dateArret, date_fn, num, Pas, Pas_fn, ref_fn, RG, alreadyClicked, JSqLogIn, ifrJSq, JSqMsg;
PDFJS.disableWorker = true;
function $(sel){
    return document.querySelector(sel);
}
function ShowReference() {
    var ref;
    if (Pas == "") {
        Pas = a + ", " + ((a < 2000) ? "I, " : "") + "n\u00B0";
        Pas_fn = "n\u00B0";
    }
    if ( Pas != "SHOW_RG" ) {
        ref = "Cass.,&nbsp;<a href='" + url + "'>" + dateArret + "</a>,&nbsp;<i>Pas.</i>, " + Pas;
        ref_fn = "Cass. " + a + "-" + m + "-" + j + " " + Pas_fn ;
    }
    else {
        ref = "Cass.,&nbsp;<a href='" + url + "'>" + dateArret + "</a>, n\u00B0 " + RG;
        ref_fn = "Cass. " + a + "-" + m + "-" + j + " n\u00B0 " + RG;
    }
    if (GM_setClipboard) {
        $("td#result").innerHTML
        = "<img id='btnFilename' style='cursor: pointer; padding-left: 5px; padding-right: 5px; "
        + "vertical-align: sub' src='" + SAVE_IMG + "'>"
        + "<img id='btnClipboard' style='cursor: pointer; padding-left: 5px; padding-right: 5px; "
        + "vertical-align: sub' src='" + CLIPBOARD_IMG + "'>" + ref;
        $("#btnFilename").addEventListener("click",
                                           function() {GM_setClipboard(ref_fn);}, false);
        $("#btnClipboard").addEventListener("click",
                                            function() {GM_setClipboard(ref, "html");}, false);
    }
    else {
        $("td#result").innerHTML = "<iframe id='btnFilename' style='height: 16px; width: 16px; border: 0; padding-left: 5px; padding-right: 5px; vertical-align: sub;' "
        + "src='http://dl.dropbox.com/u/9847855/ClipboardInterface.html?w=6b30e753#save#" + escape(ref_fn) + "'></iframe>"
        + "<iframe id='btnClipboard' style='height: 16px; width: 16px; border: 0; padding-left: 5px; padding-right: 5px; vertical-align: sub;' "
        + "src='http://dl.dropbox.com/u/9847855/ClipboardInterface.html?w=6b30e753#" + escape(ref) + "'></iframe>" + ref;
    }
}
function AnalyseReference(forceAnalysis) {
    
    url = $("input#url").value;
    
    if (! ( (url != lastValue) || forceAnalysis ) ) {return};
    
    if (url.match(/http:\/\/jure\.juridat\.just\.fgov\.be\/view_decision\.html\?justel=[FN]-\d{8}-\d+&idxc_id=\d+&lang=\w{2}/)) {  
        
        lastValue = url;
        
        a = url.slice(61, 65);
        m = url.slice(65, 67);
        j = url.slice(67, 69);
        dateArret = j.replace("01", "1er").replace(/0(?=\d)/, "") + " " + MOIS[m - 1] + " " + a;
        date_fn = a + "-" + m + "-" + j;
        num = 0; Pas = ""; AC=""; Pas_fn=""; AC_fn=""; RG = ""; alreadyClicked = false;
        ShowReference();
        $("td#revues").innerHTML = "<img src='" + ICON_WAITING + "' style='padding-right: 4px'>Recherche du numéro de l'arrêt en cours";    
        
        if ( (a < 1966) || ( (a == 1966) && (m < 9) ) ) {
                GM_xmlhttpRequest({
                method: "POST",
                url: "http://jure.juridat.just.fgov.be/PRDJURSEARCH/JuridatSearchSoapHttpPort",
                data: HEADER_GET_PAS_OLD.replace("$$$", url.match(/idxc_id=.+&/).toString().match(/\d+/).toString()),
                headers: {
                    "Content-type": "text/xml; charset=utf-8",
                    "SOAPAction" : ""
                },
                onload: function(response) { 
                    // Pasicrisie
                    var ref = response.responseText.match(/PASICRISIE.+ns0:pub_date>/).toString();
                    Pas = ref.match(/\d{4}/).toString() + ", " + (a < 2000 ? "I, " : "");
                    Pas_fn = (ref.match(/\d{4}/).toString() != a) ? "Pas. " + ref.match(/\d{4}/).toString() + " " : "";
                    Pas += ref.match(/P\.\d+/).toString().replace("P.","p. ");
                    Pas_fn += ref.match(/P\.\d+/).toString().replace("P.","p. ");
                    // Display result
                    ShowReference();
                    $("td#revues").innerHTML = "";
                }
            });                    
        }
        
        else if (a < 2001) {
                GM_xmlhttpRequest({
                method: "POST",
                // url: "http://jure.juridat.just.fgov.be/PRDJURSEARCH/JuridatSearchSoapHttpPort",
                url: "http://jure.juridat.just.fgov.be/JuridatSearchCombined/Juridat-Search",             
                data: HEADER_GET_PAS.replace("$$$", url.match(/[FN]-\d{8}-\d+/).toString().replace("F", "N")),
                headers: {
                    "Content-type": "text/xml; charset=utf-8"
                },
                onload: function(response) {
                    // Pasicrisie
                    var ref = response.responseText.match(/PASICRISIE.+pub_date>/).toString();
                    Pas = ref.match(/\d{4}/).toString() + ", " + (a < 2000 ? "I, " : "");
                    Pas_fn = (ref.match(/\d{4}/).toString() != a) ? "Pas. " + ref.match(/\d{4}/).toString() + " " : "";
                    if (ref.match(/P\.\d+/)) {
                        Pas += ref.match(/P\.\d+/).toString().replace("P.","p. ");
                        Pas_fn += ref.match(/P\.\d+/).toString().replace("P.","p. ");
                    }
                    else {
                        Pas += "n\u00B0" + ref.match(/\d+\)/).toString().replace(")","");
                        Pas_fn += "n\u00B0" + ref.match(/\d+\)/).toString().replace(")","");
                    }
                    // Display result
                    ShowReference();
                    $("td#revues").innerHTML = "";
                }
            });                    
        }
            
        else { 
        	GM_xmlhttpRequest({
            	method: "POST",
                url: "http://jure.juridat.just.fgov.be/JuridatSearchCombined/Juridat-Search",
                data: HEADER_GET_RG.replace("$$$", url.match(/[FN]-\d{8}-\d+/).toString().replace("F", "N")),
                headers: {
                    "Content-type": "text/xml; charset=utf-8"
                },
                onload: function(response) { 
                    RG = response.responseText.match(/<dec_role.+dec_role>/).toString()
                    if (RG.match(/\w\d{6}\w/)) {
                        RG = RG.match(/\w\d{6}\w/).toString();
                        RG = RG.slice(0,1) + "." + RG.slice(1,3) + "." + RG.slice(3,7) + "." + RG.slice(7);
                    }
                    else {
                        RG = RG.match(/\w\.\d{2}\.\d{4}\.\w/).toString();
                    }
                    Pas = a + ", n\u00B0 " + RG;
                    Pas_fn = "n\u00B0";
                    ShowReference();
                    $("td#revues").innerHTML = "<div id='Pas'><a href='http://www.jurisquare.be/fr/journal/pasicrisie/index.html#date" + j + "-" + m + "-" + a + "-" + RG + "' target='_blank'>Pasicrisie</a></div>"
                    if (GM_setClipboard) {
                        $("div#Pas").addEventListener("click", function() {GM_setClipboard(ref_fn);}, false);
                    }
                    if (JSqLogIn) {
                    	$("td#revues").innerHTML += "<img src='" + ICON_WAITING + "' style='padding-left: 60px; padding-right: 4px'>Recherche du numéro de l'arrêt en cours";
                        document.body.removeChild(ifrJSq);
                        ifrJSq = document.createElement("iframe");
                        ifrJSq.src = "http://www.jurisquare.be/fr/journal/pasicrisie/index.html#date" + j + "-" + m + "-" + a + "-" + RG;
                        ifrJSq.style.display = "none";
                        document.body.appendChild(ifrJSq);
                    }
                }
            }); 
       } 
    }
}

function ProcessPage() {
    
    document.body.innerHTML = "";
    
    GM_addStyle(CSS);
    
    var form = document.createElement("form");
    form.style.marginBottom = "0";
    form.innerHTML = "<table style='padding: 4px; table-layout: fixed; width: 100%;'><tbody><tr style='height: 18px;'>"
    + "<td style='width: 40%;'><input id='url' style='width: 100%;'></td>"
    + "<td style='width: 30%; padding-left: 4px;' id='result'></td>"
    + "<td style='width: 30%;' id='revues'></td>"
    + "</tr></tbody></table>";
    document.body.appendChild(form);
    $("input#url").placeholder = INVITE;
    
    ifrJSq = document.createElement("iframe");
    ifrJSq.src = "http://www.jurisquare.be/fr/index.html";
    ifrJSq.style.display = "none";
    document.body.appendChild(ifrJSq);
    window.addEventListener("message", ReceiveMessage, false);
    
    var ifr = document.createElement("iframe");
    ifr.src = url ? url : "http://jure.juridat.just.fgov.be/?";
    ifr.style.border = "0";
    ifr.style.width = "100%";
    ifr.style.height = (window.innerHeight - window.getComputedStyle(form).height.match(/\d+/).toString()) + "px";
    document.body.appendChild(ifr);
    
    $("input#url").addEventListener("keydown", function(e){
        if (e.which == 13) {
            e.preventDefault();
        }
    }, false);
    
    $("input#url").addEventListener("keyup", function(){window.setTimeout(AnalyseReference, 500)}, false);           
    
    $("input#url").addEventListener("mousedown", function(e){
        if (document.activeElement == $("input")) {
            AnalyseReference(true);
        }
        else {
            $("input#url").select();
            $("input#url").focus();
            e.preventDefault();
        }        
    }, false);
     
    if (url) {
        $("input#url").value = url;
        JSqLogIn = true;
        AnalyseReference();
    }
}
function ReceiveMessage(msg) {
    if (msg.origin == "http://www.jurisquare.be") {
        if (msg.data == "LoginRequired") {
            document.querySelector("td#revues").innerHTML = "Pour détecter les numéros d'arrêts, connectez-vous à <div style='margin: 5px;'><a href='http://www.jurisquare.be/fr/index.html' target='_blank'>Jurisquare</a></div> et rechargez cette page";
            JSqLogIn = false;
        }
        else if (msg.data == "LoginOkay" && (!url)) {
            document.querySelector("td#revues").innerHTML = "Connecté à Jurisquare!";
            JSqLogIn = true;
        }
        else { // received Pasicrisie URL            
            if (!JSqMsg) {
                // Wait for further messages to arrive
                window.setTimeout(TreatJSqURL, 500);
            }
            JSqMsg = msg.data;
        }
    }
}
function TreatJSqURL() {
    if (JSqMsg.match(/\/n-\d+/)) { // URL Suffices
    	num = JSqMsg.match(/\/n-\d+/).toString().match(/\d+/).toString();
        Pas = a + ", n\u00B0" + num;
        Pas_fn = "n\u00B0" + num;
        ShowReference();
        $("td#revues").innerHTML = "<div id='Pas'><a href='" + JSqMsg + "' target='_blank'>Pasicrisie</a></div>"
        if (GM_setClipboard) {
        	$("div#Pas").addEventListener("click", function() {GM_setClipboard(ref_fn);}, false);
        }
        JSqMsg = "";
    }
    else { // PDF must be loaded
    	GM_xmlhttpRequest({
	   		method: "GET",
	    	url: JSqMsg,
			overrideMimeType: "plain/text; charset=x-user-defined",
			onload: function(response) {
		  		// Decode PDF to Uint8Array
		   		var text = response.responseText,
		   		len = text.length,
		   		arr = new Uint8Array(len);
		    	for (i = 0; i < len; ++i) {
		        	arr[i] = text.charCodeAt(i) & 0xFF;
		    	}
		    	// Analyse PDF
			    PDFJS.getDocument(arr).then(function(pdf){
		            pdf.getPage(1).then(function(page){
	    	            var data = page.getTextContent().data;
                        num = data.match(/N[°o]\s?\d+(re|e)\s(ch|CH)/)[0].toString().match(/\d+/).toString();
                        num = num.slice(0, num.length - 1);
                        Pas = a + ", n\u00B0" + num;
            			Pas_fn = "n\u00B0" + num;
            			ShowReference();
            			$("td#revues").innerHTML = "<div id='Pas'><a href='" + JSqMsg + "' target='_blank'>Pasicrisie</a></div>";
            			if (GM_setClipboard) {
               				$("div#Pas").addEventListener("click", function() {GM_setClipboard(ref_fn);}, false);
            			}
                        JSqMsg = "";
	                });
	            });
	       }
	  });
   }
}
// MAIN
if (window == window.top) {
    if (location.href.match(/view_decision/)) {
        url = location.href;
    }
    ProcessPage();
}

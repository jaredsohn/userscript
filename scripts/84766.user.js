// ==UserScript==
// @name           Jurisquare GM Script
// @version        2.3.1
// @namespace      RJ
// @author         Rafael Jafferali
// @description    Améliore le fonctionnement de Jurisquare (www.jurisquare.be)
// @include        http://www.jurisquare.be*
// @run-at         document-end
// ==/UserScript==
debugger;
var PDF_ICON = "data:image/gif; base64,"
    + "R0lGODlhEAAQAPcAAFoAAGMAAHMYGG6Ov3KQv3KRv3aTvXqVu3uVvH6XulWAyFmBxliCxV2ExF6E"
    + "xGGIw2KJw2WKwmeLwWmMwWyOwIwACJQAAJwhIa0ACLUAAL05OZxCQr1KSr1SWsYAAM4ICM4QENYY"
    + "GM4pMd45OecIEPcQEPcYGO85OfcpKf8xOc5KSt5KStZja+dKSu9CSu9KSudaWu9SUu9SWudaY+dz"
    + "c+97e/9zc/8A/4KavIWdvoigwIuiwoyiwo+lxJGnxpKoxpWryJesyZmtypywzJ2xzaO20am71Ky+"
    + "1q/A2LPD2t6EhN61veeMjO+cnO+trdLi+tTj+tbk+tfl+9nm+9vn+9zo+97p++/W1ufv9+Dq/OHs"
    + "/OPt/OXu/Obv/Ojw/erx/evy/e3z/e/0/fD2/vL3/vT4/vX5/vf6/vn7/////xQCgBQCQBLtDNdN"
    + "rxQCgBEGqNdN4xQCgBLtFAAAAJEFyCJ8mBLt4JEFURQHqJEFbRLuOAAAABLtPAAAAJEFyFWi2BLu"
    + "CJEFURQHSBLtWAAAAJEFyFWi2BLuJJEFURQHSJEFbRLuaAAABAAAAOaERAAAAgAABAAAMAAAACJ8"
    + "oNSLsf3QAAAAMAAABBQAABLrmJD7bAAAIAAAAFWi4BLuOAAAAAAAIADwqgAAIAAAAAAAAJDnvJDV"
    + "hhLuCJD7bJD7cZDVhpDnvBQAABLt5JDnyBLujJDuGJD7eAH//wAABBLtaAAAABLujJDuGJEFcP//"
    + "/5EFbZEJvBQAAAAAAFWi4BLuSJEJklWi4AAAABLunN3tDt3tIGKmyAACvGKm1AAAAAAAAAAAAAAA"
    + "AAAAABLuaBLu7BSjUBSjUBLuoOb8I8OlLsYaoBLu2MLCzQAABMLC4xSo8BSjUAAAAxSgLcXS4BSg"
    + "ABLu1BLupP///xLvQMNclMEgcP///8LC40SV1RSjUGMboGMboEUEtRQAABSo8KR+UAAAAAAAAOqG"
    + "1OqG1OqG1OqG1AACXBLvJN1sdBLvLKR+UKR+UObgowAACeaCsAAABCH5BAEAADcALAAAAAAQABAA"
    + "AAjcAG8ITGKkCJEgPnbkSJBAoMMbSNCcMVOGzBgxCdI0fHhkYsWLYTJqvNGBgwYVM2DIgOFCBBiR"
    + "Gm28SIHChIkSJkhg+MKw54kQIEB4+OABQ4YKXrpw2aIlgYUAAARsmLrhwgalTLNsvDFETBgwX1Zg"
    + "1ZLFygGHQr5+uTKiSVYrVQw4BALWSw0sTJyUrUKFgMMfX7xcaeHEyYoWMZRMoeCwR1IYS8jCXcJC"
    + "igSHPLrMYCKZ7xQpUSA41EGDRmcqn6NAceAwx1vPoKE8WeAQBwIEBgoMmBDhQQMGChQEBAA7";
var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
            "septembre", "octobre", "novembre", "décembre"];
var RG_counter = 0;
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
function DefaultLibrarySearch() {
    InjectScript(function(){
        var LS = new LibrarySearch;
        LS.request.searchInOwnAssets = true;
        LS.request.order = "alpha";
        LS.pushState();
        location.reload();
    });
}
function ProcessResults(e) {
    try {var r = e.target.querySelector("h5") || e.target.querySelector("h1");} catch(err) {}
    if (r && r.querySelector("a") && r.querySelector("a").href) {
        var a = r.querySelector("a");
        var el = document.createElement("a");
        el.href = a.href.replace(/index\.html.*/, "document.pdf");
        el.target = "_blank";
        var img = document.createElement("img");
        img.src = PDF_ICON;
        img.style.paddingRight = "5px";
        el.appendChild(img);
        r.insertBefore(el, a);
        
        // Pasicrisie     
        if (location.href.match(/pasicrisie/) && ( document.querySelector("div.filterlist a") || ( document.querySelector("span#resultCount") && document.querySelector("span#resultCount").textContent == "1" )  ) ) { 
        // Filterlist vise à s'assurer que les filtres d'année ont déjà été appliqués, ou seulement un résultat
            if (document.querySelector("input.searchfield").value.match(/"\s\d+/)) { // Recherche par numéro à la Pasicrisie
                var num = document.querySelector("input.searchfield").value.match(/"\s\d+/).toString().match(/\d+/);
                if (a.innerText.search(num) >= 0) {
                    location.href = el.href;
                }
            }
            else if (document.querySelector("input.searchfield").value.match(/"\s\w\.\d{2}\.\d{4}\.\w/)) { // Recherche par numéro de rôle
              	if (window.self === window.top) {
               		location.href = el.href;
              	}
              	else {
                  	window.top.postMessage(el.href, "http://jure.juridat.just.fgov.be/");
               	}
            }
            GM_xmlhttpRequest({ // affichage des résumés
                method: "GET",
                url: a.href,
                onload: function(response) {
                    var summary = response.responseText.match(/Résumé<\/p>[\s\S]*?<\/p>/).toString().match(/<p>[\s\S]+/).toString().replace(/<.?p>/g,"").replace(/^\s+|\s+$/g,"").replace(/\s\s*/g," ");
                    r.nextElementSibling.innerText += "\n" + summary;
                }
            }); 
        }
    }  
}
function addPasicrisieSearch() {
    var btn = document.createElement("input");
    btn.style.cssText = window.getComputedStyle(document.querySelector("input.searchbutton")).cssText;
    btn.type="submit";
    btn.value="Pasicrisie";
    if (!location.href.match(/content|library/)) {
        document.querySelector("input.searchfield").style.width = "403px";
    }
    document.querySelector("div.searchform").insertBefore(btn, document.querySelector("div.searchform div"));
    btn.addEventListener("click", function(){
        var d = document.querySelector("input.searchfield").value.replace(/\//g, "-");
        if (!location.href.match(/pasicrisie/)) {
            location.href = "http://www.jurisquare.be/fr/journal/pasicrisie/index.html#date" + d;
        }
        else {
            location.hash = "#date" + d;
            location.reload();
        }
    }, false);
}
function PasicrisieSearch() {
    
    // If called with the Pasicrisie button, fill in search field
    if (location.hash && location.hash.match(/date/)) {
        // Run search
        var d = location.hash.slice(5).split("-");
        var val = '"' + d[0].replace(/0(?=\d)/, "") + ( (d[0] == 1) ? "er" : "" ) + " " + MOIS[d[1].replace(/0(?=\d)/, "") - 1] + " " + d[2] + '"';
        if (d[3]) { val += " " + d[3]; }
        document.querySelector("input.searchfield").value = val;
        document.querySelector("input.searchbutton").click();
    }
    
    // If search is run with judgement date, select the year of the judgement as a filter
    if (!document.querySelector(".selected")) {
        var d = document.querySelector("input.searchfield").value.match(/"\d.+\s\d{4}"/);
        if (d) {
            
            function selectFilter(e) {
                if (e.target.querySelector("a").title == y) {
                    e.target.querySelector("a").click();
                    document.querySelectorAll("div.filterbox")[1].removeEventListener("DOMNodeInserted", selectFilter, false);
                }
            }
            // Set new filter
            var y = d.toString().match(/\d{4}/).toString();
            document.querySelectorAll("div.filterbox")[1].addEventListener("DOMNodeInserted", selectFilter, false);
        }
    }    
}
// MAIN
if ( (window.self !== window.top) && (location.href == "http://www.jurisquare.be/fr/index.html")) {
	if (document.querySelector("input.button") && document.querySelector("input.button").value.match("log in")) {
    	window.top.postMessage("LoginRequired", "http://jure.juridat.just.fgov.be/");
	}
	else {
    	window.top.postMessage("LoginOkay", "http://jure.juridat.just.fgov.be/");
	}
}
if (location.href == "http://www.jurisquare.be/fr/library/index.html") {
  	DefaultLibrarySearch();
}
if (document.querySelector("input.searchbutton") && document.querySelector("input.searchfield")) {
   	addPasicrisieSearch();
}
if (document.getElementById("results")) {
   	document.getElementById("results").addEventListener("DOMNodeInserted", ProcessResults, false);
}
if (location.href.match(/pasicrisie/)) {
    PasicrisieSearch();
}
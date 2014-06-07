// ==UserScript==
// @name itu-sis anasayfadan node seçme
// @description itü öğrenci işleri anasayfasında tüm nodelar için link oluşturur
// @include http://www.sis.itu.edu.tr/
// ==/UserScript==

var linkText = "http://node*.sis.itu.edu.tr:8092/pls/pprd/twbkwbis.P_WWWLogin";
var elem = document.getElementsByTagName('td').item(1);
var linkElement;

elem.appendChild(document.createElement("br");

for(var i = 1; i < 10; i += 1) {
    linkElement = document.createElement("a");
    linkElement.setAttribute("href", linkText.replace("*", i);
    linkElement.setAttribute("target", "Giris");
    linkElement.innerHTML = i;
    elem.appendChild(linkElement);
    elem.appendChild(document.createTextNode(" ");
}


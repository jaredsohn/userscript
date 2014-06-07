// ==UserScript==
// @name       Socialcast Taskliste Datumskorrektur
// @namespace  http://appropos.de/
// @version    0.1
// @description  Korrigiert in der Taskliste eines Projekts das Fertigstellungsdatum
// @match      https://appropos-de.socialcast.com/projects/*
// @copyright  2013, Alexander Winizki
// ==/UserScript==
var tasks = document.getElementsByClassName("set_due_date");
for (idx in tasks) {
    var elem = tasks[idx];
    
    if (elem.getAttribute) {
        if (elem.getAttribute("data-selected-date")) {
             var date = elem.getAttribute("data-selected-date").split("-");
            elem.firstChild.nodeValue = new Date( date[0], date[1]-1, date[2]).toLocaleDateString();
        }
	}
}

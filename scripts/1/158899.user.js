// ==UserScript==
// @name           P&T - Spendenwert Anzeige
// @namespace      P&T-Tools
// @description    Spendenwert Anzeige in der Übersicht
// @include        http://www.producers-and-traders.de/index.php?section=a&section2=a

// ==/UserScript==

    var div_selection = document.getElementsByTagName("tbody")[0];
	var insert_before = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[2];

    function get_value() {
        var element = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
        
        element = element.replace('.',''); 		// Tausenderpunkt entfernen
        element = element.replace(',',''); 		// Komma in Punkt verwandeln, wenn vorhanden
        element = parseFloat(element); 	        // € entfernen
        return element;
    };


    var spendenwert = get_value() / 100;
    var test = Math.round(spendenwert*1000)/1000
    
   
    var create_tr = document.createElement("tr");
    create_tr.innerHTML = ("<td>Spendenwert:</td><td align='right'>"+ test +" €</td>");
	div_selection.insertBefore(create_tr,insert_before);
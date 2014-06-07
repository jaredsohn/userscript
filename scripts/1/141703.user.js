// ==UserScript==
// @include        http://nl*.tribalwars.nl/*&screen=info_command*&type=other*
// @name           Date Notation Fix
// @version        1.0.1
// @author		   Warre
// @description    Fixt de notatie van de datum bij inkomende aanvalen en ondersteuningen.
// ==/UserScript==

/** Extra Info
- De tool verandert de datum notatie van aug 20, 2012 15:00:00:400 terug naar 20.08.12 15:00:00:400
- De tool werkt alleen bij inkomende aanvallen en ondersteuningen (niet bij bv berichten)
- Deze tool zou er normaal voor moeten zorgen dat alle taggers terug werken (zowel die van het sangu packge als de gewone taggers)
- Duckje heeft de datum notatie veranderd, dit wordt binnen een week doorgevoerd (rond het weekend van de 25 ste) 
**/

(function () { 
	if (document.URL.match("screen=info_command") && document.URL.match("type=other")) {
		var getold = document.getElementById('content_value').getElementsByTagName('table')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML;
		var ms = document.getElementById('content_value').getElementsByTagName('table')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
		var getoldchild = document.getElementById('content_value').getElementsByTagName('table')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0];
		var getoldparent = document.getElementById('content_value').getElementsByTagName('table')[0].getElementsByTagName('tr')[5];
		getoldparent.removeChild(getoldchild);
		var getoldchild2 = document.getElementById('content_value').getElementsByTagName('table')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0];
		getoldparent.removeChild(getoldchild2);
		
		var maand = getold.split(' ')[0];
		var datum = getold.split(' ')[1].split(',')[0];
		var jaar = getold.split(' ')[2].slice(2);
		var tijd = getold.split(' ')[3];
		var uurminsec = tijd.split(':');
		var maandArray = {"jan" : "01", "feb" : "02", "maa" : "03", "apr" : "04","mei" : "05","jun" : "06","jul" : "07", "aug" : "08", "sep" : "09", "okt" : "10", "nov" : "11", "dec" : "12"};
		var makenew = document.getElementById('content_value').getElementsByTagName('table')[0].getElementsByTagName('tr')[5];
		makenew.innerHTML = '<td colspan="2">Aankomst:</td><td>'+ datum +'.'+ maandArray[maand] +'.'+ jaar +' '+ uurminsec[0] +':'+ uurminsec[1] +':'+ uurminsec[2] +'<span class="small grey">'+ ms +'</span></td>';
	}
})();

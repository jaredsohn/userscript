// ==UserScript==
// @name           skilldependencies
// @author         Greensky
// @namespace      noname
// @description    Zeigt die Vorraussetzungen für die naechste Stufe unter Weiterbildungen an. 
// @include        http://www.pennergame.de/skills/
// ==/UserScript==


//getskills("Angriff",1)
//getskills("Verteidigung",2)
//getskills("Geschicklichkeit",3)
getskills("Sprechen",4)
getskills("Bildungsstufe",5)
getskills("Musik",7)
getskills("Sozialkontakte",8)
getskills("Konzentration",9)
getskills("Taschendiebstahl",10)

function getskills(wbname,tabellennr){
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: 'http://www.pennergame.de/skill/info/'+wbname+'/',
      onload: function(responseDetails) {
    		try
		     {
          var Kenntnisse = responseDetails.responseText.split('Erforderliche Kenntnisse</strong></td>\n</tr>\n')[1].split('<\/table>')[0].replace(/<div class=.+<\/div><\/div>/g,"").replace(/<span.+\">/g,'').replace(/<\/span>/g,'')
          document.getElementsByClassName('listshop')[0].getElementsByTagName('tbody')[(1*document.getElementsByClassName('listshop')[0].getElementsByTagName('tbody').length-(11-tabellennr))].getElementsByTagName('td')[4].innerHTML=document.getElementsByClassName('listshop')[0].getElementsByTagName('tbody')[(1*document.getElementsByClassName('listshop')[0].getElementsByTagName('tbody').length-(11-tabellennr))].getElementsByTagName('td')[4].innerHTML+'<br><br><b>Vorraussetzungen:</b><br>'+Kenntnisse
         }
		    catch(err)
		     {}
	  }	
	});
}

/* TEM LA FIRME - Analyseur de parcelle
*/




// ==UserScript==
// @name           TEM Best Parcelle v2
// @version        V2 Build 001
// @namespace      TEM La Firme - Best Parcelle v2
// @description    Analyseur de parcelle v2
// @include        http://www.tem-la-firme.com/bunker_survie-logistique.html?section=carte_*
// ==/UserScript==






/* RELEASE
 -------------------------------------------------- */

var ScriptName = 'TEM Best Parcelle';                                 // Nom du script
var ScriptVersion = '0.1';                                            // Version du script pour les mises a jour majeures
var ScriptBuild = '003';                                              // Sous-version du script pour les mises a jour mineures
var ScriptDate = '07/29/2009';                                        // Date de la publication (MM/JJ/AAAA)

var Div = document.getElementsByTagName('div');
for (var k = 0; k < Div.length; k++) {
  if(Div[k].id == 'carte') {
    if (Div[k].getElementsByTagName('table').length > 0) {
      var Table = Div[k].getElementsByTagName('table')[0];
      if (Table) {
        var BestCoord = 0;
        var BestCoordAdd = 0;
        var BestValue = 0;
        var BestValueAdd = 0;
		var BestCoordaccess = 0;
		var BestValueaccess = 0;
        var BestCell;
        for (var i = 0; i < Table.rows.length; i++) {
          var CoordText = Table.rows[i].innerHTML.match(/coordonnees\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)/g);
          for (var j = 0; j < CoordText.length; j++) {
            var Coord = CoordText[j].match(/coordonnees\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)/);
				// Moyenne harmonique            
            var Moy = 2/((1/parseInt(Coord[2]))+(1/parseInt(Coord[3])));
            if (Moy > BestValue) {
              BestValue = Moy;
              BestCoord = Coord[1];
            }
            // Première version, équivalente à la moyenne arithmétique
            if (parseInt(Coord[2])+parseInt(Coord[3]) > BestValueAdd) {
              BestValueAdd = parseInt(Coord[2])+parseInt(Coord[3]);
              BestCoordAdd = Coord[1];
            }
			//max accesibilité sans prise en compte richesse
			var access = parseInt(Coord[3])
			if (access > BestValueaccess) {
				BestValueaccess = access;
				BestCoordaccess = Coord[1];
			}
          }
        }
        document.getElementById(BestCoord).style.border = "1px solid #00FF00 !important";
        document.getElementById(BestCoord).setAttribute("style","border:1px solid #00FF00 !important");
        document.getElementById(BestCoordAdd).style.border = "1px solid #00FFFF !important";
        document.getElementById(BestCoordAdd).setAttribute("style","border:1px solid #00FFFF !important");
		document.getElementById(BestCoordaccess).style.border = "1px solid #0000FF !important";
        document.getElementById(BestCoordaccess).setAttribute("style","border:1px solid #0000FF !important");
        break;
      }
    }
  }
}

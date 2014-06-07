// ==UserScript==
// @name        Empire Board
// @namespace   Bertrand
// @include     http://monde1.empireimmo.com/agency/agency.php?type=*
// @version     1.2.3
// @grant       none
// ==/UserScript==

var arrayLignes = document.getElementById("tblBuildings").rows; //on récupère les lignes du tableau
var longueur = arrayLignes.length;//on peut donc appliquer la propriété length


for(var i=0; i<longueur; i++)//on peut directement définir la variable i dans la boucle
{


	var arrayColonnes = arrayLignes[i].cells;//on récupère les cellules de la ligne

    if(i==0){
   	var colonne = arrayLignes[i].insertCell(5);
	colonne.innerHTML = 'Points';
	var colonne = arrayLignes[i].insertCell(5);
	colonne.innerHTML = 'Rentabilisé';	
	var colonne = arrayLignes[i].insertCell(5);
	colonne.innerHTML = 'Gains';
	}
	else
	{
	var prix = parseInt(arrayColonnes[1].innerHTML.replace('€','').replace(' ','').replace(' ',''));
	var loyer = parseInt(arrayColonnes[2].innerHTML.replace('€', '').replace(' ','').replace(' ',''));
	var charges = parseInt(arrayColonnes[3].innerHTML.replace('€', '').replace(' ','').replace(' ',''));
	var taxes = parseInt(arrayColonnes[4].innerHTML.replace('€', '').replace(' ','').replace(' ',''));
	var gains=loyer-charges-taxes;
    var points=prix/2100;
	var renta=prix/(loyer-charges-taxes); 
	if(renta<0)
	renta='-';
	else
	renta=number_format(renta, 0, ',',' ')+' jours';
	
	var rentaJour=(loyer-charges-taxes)*100/prix;
	
	var colonne = arrayLignes[i].insertCell(5);
	colonne.innerHTML = number_format(points, 0, ',', ' ');
	var colonne = arrayLignes[i].insertCell(5);
	colonne.innerHTML = renta;

	var colonne = arrayLignes[i].insertCell(5);
	colonne.innerHTML = format(gains)+" €";

	}
        
    arrayLignes[i].deleteCell(4);    
    arrayLignes[i].deleteCell(3);    
    arrayLignes[i].deleteCell(2);    

    
}
function format(number){
 	return number_format(number, 0, ',', ' '); 
}
function number_format (number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
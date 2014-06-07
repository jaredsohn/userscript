// ==UserScript==
// @name          do_commerce_color_for_ff
// @namespace     teste en cour
// @description	  Colorise les prix des ressources avec un code couleur en fonction du taux (seulement la catégorie achat) v0.0
// @author        lankou2976
// @include       http://*.desert-operations.fr/*
// ==/UserScript==

(function() {

		
		// valide l'activation du script 
		
		var signature = document.getElementById('blockFoot');
		signature.innerHTML = "<small><a href='http://loclamor.servhome.org/my_js/#comcolor' target='_blank'>DO commerce color 2.0 pour FireFox est ACTIF</a> - Code prix : <span style='color: darkred;'>20&#37; --&gt; </span><span style='color: red;'>19&#37; --&gt; </span><span style='color: orange;'>15&#37; --&gt; </span><span style='color: yellow;'>2&#37; --&gt; -2&#37;</span><span style='color: green;'> --&gt; -15&#37;</span><span style='color: lawngreen;'> --&gt; -20&#37;</span></small>";
		
		var objectSelect = document.getElementsByName('object_id')[0];
		var numSelect = objectSelect.selectedIndex;
		//signature.innerHTML = numSelect + "." + objectSelect.getElementsByTagName('option')[numSelect].innerHTML;
		var selected = objectSelect.getElementsByTagName('option')[numSelect].innerHTML;
		var taux = 0; //parseFloat(((numSelect==0)?1000:(numSelect==1)?500:(numSelect==2)?7:1));
		var forms = document.getElementsByTagName('form');
		
		switch (numSelect) {
			case 0:
				//var qqt = parseFloat((trim(trim((td_qqt.innerHTML)).replace('Or',''))).replace('.', '').replace('.', '').replace('.', '').replace(',','').replace(' M','00000'));
				var ressource = 'Or';
				taux = parseFloat(1000);
				break;
			case 1:
				//var qqt = parseFloat((trim(trim((td_qqt.innerHTML)).replace('Pétrole',''))).replace('.', '').replace('.', '').replace('.', '').replace(',','').replace(' M','00000'));
				var ressource = 'Pétrole';
				taux = parseFloat(500);
				break;
			case 2:
				//var qqt = parseFloat((trim(trim((td_qqt.innerHTML)).replace('Munitions',''))).replace('.', '').replace('.', '').replace('.', '').replace(',','').replace(' M','00000'));
				var ressource = 'Munitions';
				taux = parseFloat(7);
				break;
			default:
				taux = 1;
				//Fantassin [Cout : 120 Argent ]
				var  tableauSelected = selected.split(new RegExp("[:]+", "g"));
				var ressource = tableauSelected[0].replace(' [Coût ','');
				//signature.innerHTML = ressource;
				taux = parseFloat(trim(tableauSelected[1].replace('Argent ]','')).replace('.', '').replace('.', ''));
				//signature.innerHTML = ressource + "_" + taux;
				
		}
		
		if (taux != 1) {
			for (var i=2; i<forms.length; i++) {
				var td_qqt = forms[i].parentNode.getElementsByTagName('td')[0];
				var qqt = parseFloat((trim(trim((td_qqt.innerHTML)).replace(ressource,''))).replace('.', '').replace('.', '').replace('.', '').replace(',','').replace(' M','00000'));
				var td_ppx = forms[i].parentNode.getElementsByTagName('td')[1];
				
				var ppx = parseFloat((trim(trim((td_ppx.innerHTML)).replace('Argent',''))).replace('.', '').replace('.', '').replace('.', '').replace(',','').replace(' M','00000'));
				var px_std = parseFloat(qqt * taux);
				var pourcent = parseFloat(Math.round((ppx - px_std)/px_std*1000)/10);
				
				// Math.round(variable*100)/100
				if (pourcent <= 20 && pourcent > 19) {
					var Vcolor = "darkred";
				}
				else {
					if (pourcent > 15 && pourcent <= 19) {
						var Vcolor = "red";
					}
					else {
						if (pourcent > 2 && pourcent <= 15) {
							var Vcolor = "orange";
						}
						else {
							if (pourcent >= -2 && pourcent <= 2) {
								var Vcolor = "yellow";
							}
							else {
								if (pourcent >= -15 && pourcent < -2) {
									var Vcolor = "green";
								}
								else {
									if (pourcent >= -20 && pourcent < -15) {
										var Vcolor = "lawngreen";
									}
									else {
										var Vcolor = "white";
									}
								}
							}
						}
					}
				}
				td_ppx.innerHTML = "<span style='color: " + Vcolor + ";'>" + td_ppx.innerHTML + " (" + pourcent + "&#37;)</span>";
				td_ppx.innerHTML = (td_ppx.innerHTML).replace('(NaN%)','');
				var input_lot = forms[i].parentNode.getElementsByTagName('td')[2].getElementsByTagName('input');
				if (input_lot.length > 0)
					input_lot[0].value = qqt;
			}
		}

	function trim (myString)
	{
		return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
	} 
})();
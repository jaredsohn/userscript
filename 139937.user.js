// ==UserScript==
// @name            The West - Market best bids
// @description     Market utility for highlighting the best bids.
// @namespace       http://userscripts.org/scripts/139937
// @icon
// @author	    	Esperiano            
// @include         http://*.thewest.*/game.php*
// @include         http://*.the-west.*/game.php*
// @exclude         http://www.the-west.*
// @exclude         http://forum.the-west.*
// ==/UserScript==








PDAM_inject = function(){
	if (document.getElementById('PDAM_js'))
		{ alert("Script già installato"); return; }
	var pdamjs = document.createElement('script');
	pdamjs.setAttribute('type', 'text/javascript');
	pdamjs.setAttribute('language', 'javascript'); 
	pdamjs.setAttribute('id', 'PDAM_js');
	pdamjs.innerHTML = "("+(function(){

/*inizio corpo script*/

var windows = document.getElementById("windows");
windows.addEventListener ('DOMNodeInserted', OnNodeInserted, false);
function OnNodeInserted (event) {
	 		if ($("#market_buytable").length){
	 			var compra = document.getElementById("market_buytable");
	 			var oggetti = compra.getElementsByClassName("row");
	 			var nrow=oggetti.length-1;
		 		
		 		//Ricavo la quantità dei pezzi in vendita
		 		var qta=oggetti[nrow].getElementsByClassName("mpb_stack");
				qta=qta[0].getElementsByTagName("div");
				qta=qta[0].textContent;
		 		
		 		//Ricavo il compra subito dell'oggetto in vendita
		 		if(oggetti[nrow].getElementsByClassName("mpb_buynow")){
		 			var compraora_original = oggetti[nrow].getElementsByClassName("mpb_buynow");		//PREZZO COMPRA ORA ASTA
		 			compraora = compraora_original[0].textContent;	
		 			compraora = compraora.replace("$","");
		 			compraora = compraora.replace(/\./g,"");
		 			compraora = compraora.replace(/\,/g,"");											//PREZZO COMPRA ORA SENZA PUNTI(ITA), VIRGOLE(ENG) E $
		 		}																						//DA RIVEDERE!!
		 		//Rivavo il prezzo d'asta dell'oggetto in vendita
		 		var asta_original=oggetti[nrow].getElementsByClassName("mpb_bid");
				asta=asta_original[0].textContent;
				asta=asta.replace("$","");
				asta=asta.replace(/\./g,"");
				asta=asta.replace(/\,/g,"");
				
				var miglior_prezzo=compraora/qta;
				if(!compraora||(asta<compraora&&asta)){
					miglior_prezzo=asta/qta;
					}
		 		
		 		//Ricavo il nome dell'oggetto in vendita
		 		var nomeoggetto_original = oggetti[nrow].getElementsByClassName("mpb_article");
		 		var oggetton;
		 		var prezzoggetto;
		 		nomeoggetto = nomeoggetto_original[0].textContent;						
		 		for (i=0;i<185206;i++){										
		 			if (ItemManager.get(i)){
		 				oggetton = ItemManager.get(i).name;					
		 				if (oggetton == nomeoggetto){
			 				prezzoggetto=ItemManager.get(i).price;			
			 			}		 		
		 			}
		 		}
		 		if (miglior_prezzo < prezzoggetto){
					nomeoggetto_original[0].style.color='green';
					compraora_original[0].style.color='green';
					compraora_original[0].style.fontWeight = 'bold';
					nomeoggetto_original[0].style.fontWeight = 'bold';
				}
				if (miglior_prezzo > prezzoggetto){
					nomeoggetto_original[0].style.color='red';
					compraora_original[0].style.color='red';
					compraora_original[0].style.fontWeight = 'bold';
					nomeoggetto_original[0].style.fontWeight = 'bold';
				}
				if (miglior_prezzo <= prezzoggetto*0.75){
					nomeoggetto_original[0].style.color='blue';
					compraora_original[0].style.color='blue';
					compraora_original[0].style.fontWeight = 'bold';
					nomeoggetto_original[0].style.fontWeight = 'bold';
				}
	 		}
}

/*fine corpo script*/
	}).toString()+")();";
	document.body.appendChild(pdamjs);
};

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1)
setTimeout(PDAM_inject, 2500, false);

/*
TO DO LIST:

Migliorare il metodo per recuperare il prezzo dell'oggetto da ItemManager (troppo pesante ora)
Migliorare la colorazione tra compra ora e asta (colorare solo il prezzo migliore)

*/






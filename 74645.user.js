// ==UserScript==
// @name           Larkinor -The Isle-
// @namespace      std
// @description    Felvételi check
// @include        http://larkinor.index.hu/*
// @include        http://217.20.130.29/cgi-bin/larkinor.run?oldalTipus=otKarakterlap&melyik=*
// ==/UserScript==

//Klánház
var node_list = document.getElementsByTagName('input');
for(var i=0;i<node_list.length;i++){
	var node = node_list[i];
	if(node.getAttribute('value') == "otKlanBelsoPage"){
		var name = prompt("Kérlek add meg helyesen! a karaktered nevét!");
		var chPage = "http://217.20.130.29/cgi-bin/larkinor.run?oldalTipus=otKarakterlap&melyik=" + name;
		blankPage = window.open(chPage,"_blank"); 
		blankPage.focus();
	}
}

//getTulajdonsagok
		var title_node = document.getElementsByTagName('title');
		var sdx=-1;
		//Variables
		var fail = "";	
		var noob = false;		
		var tpszint = 0; 
		var ero = 0; 
		var iq = 0; 
		var szerencse = 0; 
		var ugyesseg = 0; 
		var kitartas = 0; 	
		var rablas = 0; 
		var lopas = 0; 
		var zsebeles = 0; 		
		var sereg = 0; 
		//var klan;
		
		for(var j=0;j<title_node.length;j++){
			if(title_node[j].innerHTML.indexOf("Larkinor Karakter Info")>0){ 
					sdx=i;  
			}  
		}
		if (sdx>-1) {
			var td_list = document.getElementsByTagName('td');
			tpszint = td_list[2].innerHTML.substring((td_list[2].innerHTML.indexOf("Tapasztalati szint: ") + 21),td_list[2].innerHTML.length); //done
			ero = td_list[5].innerHTML.substring((td_list[5].innerHTML.indexOf("Erő: ") + 6),td_list[2].innerHTML.length);
			iq = td_list[9].innerHTML.substring((td_list[9].innerHTML.indexOf("IQ: ") + 5),td_list[9].innerHTML.length);
			szerencse = td_list[11].innerHTML.substring((td_list[11].innerHTML.indexOf("Szerencse: ") + 12),td_list[11].innerHTML.length);
			ugyesseg = td_list[13].innerHTML.substring((td_list[13].innerHTML.indexOf("Ügyesség: ") + 11),td_list[13].innerHTML.length);
			kitartas = td_list[15].innerHTML.substring((td_list[15].innerHTML.indexOf("Kitartás: ") + 11),td_list[15].innerHTML.length);
			rablas = td_list[27].innerHTML.substring((td_list[27].innerHTML.indexOf("Rablás: ") + 9),td_list[27].innerHTML.length);
			lopas = td_list[28].innerHTML.substring((td_list[28].innerHTML.indexOf("Lopás: ") + 8),td_list[28].innerHTML.length);
			zsebeles = td_list[29].innerHTML.substring((td_list[29].innerHTML.indexOf("Zsebelés: ") + 11),td_list[29].innerHTML.length);
			sereg = td_list[33].innerHTML.substring((td_list[33].innerHTML.indexOf("Kiirtott sereg: ") + 17),td_list[33].innerHTML.length);
			//klan = td_list[43]innerHTML.substring((td_list[43].innerHTML.indexOf("Klán: ") + 7),td_list[43].innerHTML.length);	
//makeFailString	
		if(tpszint < 30){
			fail = fail + "- Nem vagy elég tapasztalt.\n";
			noob = true;
		} 
		if((ero > 1) && (iq > 1)){
			fail = fail + "- Nem vagy tiszta karakter, vagy legyél jó mágus, vagy kemény harcos!\n";
			noob = true;
		} 
		if((iq > 1) && (ugyesseg > 1)){
			fail = fail + "- Mi nem hiszünk az ügyes mágusokban...\n";
			noob = true;
		}
		if(kitartas < 75){
			fail = fail + "- Nem vagy elég kitartó ehhez a csapathoz.\n";
			noob = true;
		}
		if(rablas != 0){
			fail = fail + "- Ez nem rablóklán!\n";
			noob = true;	
		}
		if(lopas != 0){
			fail = fail + "- Sajnos nem támogatjuk az enyveskezűeket!\n";
			noob = true;
		}
		if(zsebeles != 0){
			fail = fail + "- Ez nem rablótanya!\n";
			noob = true;
		}
		if(sereg < 1000){
			fail = fail + "- Még nem szereztél elég tapasztalatot a szigeten.\n";
			noob = true;
		}
//Eredmény		
		if(noob == true) {
			var uzi = "FAIL";
			if(fail != ""){
				var answer2 = confirm("\n" + fail)
				if (answer2){
						window.close();
				} else { }
			} else { };
		} else {
			var answer = confirm("A karaktered megfelelt a felvételi követelményeknek, de ez még nem jelenti azt, hogy egyenes utad van a klánba, jelezdd a fórumban a csatlakozási szándékod!")
			if (answer){
					window.close();
			} else { }
		}
}
// ==UserScript==
// @name           Gangs Dominants
// @namespace      11235813[Bande:Dritteliga Penner] adapté et traduit par LeonBuzz
// @description    Voir les bandes dominantes dans les quartiers
// @include        http://*clodogame.fr/city/district/
// ==/UserScript==
GM_xmlhttpRequest({
    method: 'GET',
    url: "http://"+window.location.host+"/city_list/",

    onload: function(responseDetails) {
		var cont = responseDetails.responseText;
		var tbl = document.getElementsByTagName("table")[0];
		tbl.style.width = "600px";
		var tr = tbl.getElementsByTagName("tr");
		var cont = cont.replace(/(<\/sup>|<sup>)/g,'');
		var cont = cont.replace(/\s+/g,'');
		for(a=1;a<tr.length;a++) {
			var akt = tr[a];
			var teil = akt.getElementsByTagName("td")[0].textContent;
			var teil = teil.replace(/\s+/g,'');
//			alert('a='+a+' t='+teil);
			var teil_1 = cont.split(teil)[1].split("city_bandenname")[1].split("&city")[0].split("=")[1];
			var id_1 = cont.split(teil)[1].split("city_bande")[1].split("&city")[0].split("=")[1].split("&")[0];
			if(teil_1.match(/\&eigenheim/g)) {
				teil_1 = teil_1.split("&eigenheim")[0];
			}
			akt.getElementsByTagName('td')[0].style.color = '#00ff00';
			var td = document.createElement("td");
			td.innerHTML = "<a href='http://"+window.location.host+"/profil/bande:"+id_1+"/'>"+teil_1+"</a>";
			akt.appendChild(td);
//			akt.style.width = "600px";		
		}
	}
				  });
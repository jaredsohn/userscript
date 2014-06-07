// ==UserScript==
// @name           Bandenvorherrschaft pennergame 4.0 
// @namespace      11235813[Bande:DABEI]
// @description    Zeigt vorherrschende Bande bei Stadtteilen an
// @include        http://*game*/city/district/
// ==/UserScript==
GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.pennergame.de/city_list/",

    onload: function(responseDetails) {
		var cont = responseDetails.responseText;
		var tbl = document.getElementsByTagName("table")[0];
		tbl.width = "750px";
		var tr = tbl.getElementsByTagName("tr");
		for(a=0;a<tr.length;a++) {
			var akt = tr[a];
			var teil = akt.getElementsByTagName("td")[0].textContent;
			var teil_1 = cont.split(teil)[1].split("city_bandenname")[1].split("&city")[0].split("=")[1];
//alert(teil_1);
			var id_1 = cont.split(teil)[1].split("city_bande")[1].split("&city")[0].split("=")[1].split("&")[0];
//alert(id_1);
			if(teil_1.match(/\&eigenheim/)) {
				teil_1 = teil_1.split("&eigenheim")[0];
			}

//alert(id_1);
			var td = document.createElement("td");
			td.innerHTML = "<a href='http://"+window.location.host+"/profil/bande:"+id_1+"/'>"+teil_1+"</a>";
			akt.appendChild(td);
			
		}
	}
				  });


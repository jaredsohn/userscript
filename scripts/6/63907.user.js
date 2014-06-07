// ==UserScript==
// @name          AllenamentiStanze 2.0.0
// @version		2.0.0 
// @date		02/12/2009
// @description	Colora risorse "Allenamenti" e "Stanze" in base a disponibilita' di risorse e capienza magazzini; controllo produzione alcol
// @author        Mozzicone[ITA], mitm[ITA]
// @include       http://s*.vendetta*.*/vendetta/*
// ==/UserScript==

function get_values(req){
	var matches = req.responseText.match(/<th.*?th>/g);
	if(matches.length >= 33){
		var conta = 0;
		if(matches.length == 37) conta = 4;	// contrabbando
		var values = '';
		for(var i = 21 + conta; i < 29 + conta; i++){
			var value = parseInt(matches[i].replace(/[^\d-]/g, ''));
			values += value + ';';
		}
		var matches = req.responseText.match(/th>.*?<img/g);
		for(var i = 0; i < 4; i++){
			var value = matches[i].replace('th>', '');
			value = value.replace(' <img', '');
			values += value + ';';
		}
		return(values);
	} else {
		return(null);
	}
}

function modify_xml (risorsa, risorsa_now, magazzino, tipo){
	var rewrite = '';
	if(tipo==1){
		var img = "vendetta/img/R1K.gif";
		var testo = "A:";
	}
	if(tipo==2){
		var img = "vendetta/img/R2K.gif";
		var testo = "M:";
	}
	if(tipo==4){
		var img = "vendetta/img/R4K.gif";
		var testo = "D:";
	}	
	if(risorsa != 0){
		var tmp = parseInt(risorsa.replace(/\./g, ""));
		if(tmp > magazzino) {
			rewrite += '<b>' + testo + '</b> <font color=red>' + risorsa + ' (' +  Math.ceil((tmp - magazzino)/150000) + ')</font><img src="' + img + '">&nbsp;&nbsp; ';
		} else {
			var confronto = parseInt(risorsa_now.replace(/\./g, "")) - tmp;
			var addon = confronto < 0?'<font color=green> [' + number_format ((parseInt(risorsa_now.replace(/\./g, "")) - tmp), 0, ",", ".") + ']</font>':'';
			rewrite += '<b>' + testo + '</b> ' + risorsa + addon + ' <img src="' + img + '">&nbsp;&nbsp; ';
		}
	}
	return(rewrite);
}

function number_format( number, decimals, dec_point, thousands_sep ) 
	{
		var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
		var d = dec_point == undefined ? "." : dec_point;
		var t = thousands_sep == undefined ? "," : thousands_sep, s = n < 0 ? "-" : "";
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}

(function() {
	
	if ((location.pathname.search('forschung') != -1 ) || (location.pathname.search('konst') != -1 )) {
		var req = new XMLHttpRequest();
		var content=document.location.href;
		content=content.replace('forschung','res');
		content=content.replace('konst','res');
		req.open("GET",content, false); 
		req.send();
		var val = get_values(req);
		if (val) { 
			var valori = val.split(';');
		} else {
			alert('Devi avere almeno livello 1 di Armeria, Fabbrica Munizioni, Distilleria e Bar per utilizzare lo script');
			return(0);
		}
		var prodArmi = valori[0];
		var prodMuni = valori[1];
		var prodAlcol = valori[2];
		var prodDoll = valori[3];
		var MagazzinoArmi = valori[4];
		var MagazzinoMuni = valori[5];
		var Cassaforte = valori[7];
		var armi_now = valori[8];
		var muni_now = valori[9];
		var doll_now = valori[11];

		var statusAlcol = (prodAlcol > 0)?'positive':'negative';		
			
		var anchorTags = document.getElementsByTagName("th");
		
		for (var bb = 0; bb < anchorTags.length ; bb = bb + 1) {
			if ( anchorTags[bb].innerHTML.search('B1K.gif') != -1 ) { 
				inizio = bb;
				break;
			}
		}
		
		if (location.pathname.search('forschung.php') != -1 ) { inizio = 0};
		
		for (var i = inizio; i < anchorTags.length ; i = i + 4)
		{
			if (anchorTags[i].innerHTML.search('B5K.gif') != -1 && statusAlcol == 'negative')
			{
				posStatus = anchorTags[i].innerHTML.indexOf("<br>");
				htmlStatus = anchorTags[i].innerHTML.substring(0,posStatus) + "<b><font color=red> Low Production!</font></b>" + anchorTags[i].innerHTML.substring(posStatus);
				anchorTags[i].innerHTML = htmlStatus;
			}
			
			th = anchorTags[i].innerHTML;
			var indice = 0;
			var start  = 0;
			var armi = 0;
			var muni = 0;
			var doll = 0;

			if(th.indexOf('R1K') != -1) indice++;	//armi
			if(th.indexOf('R2K') != -1) indice++;	//munizioni
			if(th.indexOf('R4K') != -1) indice++;	//dollari

			var fixed_start = th.substring(0, th.indexOf('</table> <b>') + 9);
			var fixed_end = th.substring(th.lastIndexOf('<b>'));
			var old_rewrite = th.replace(fixed_start, '');
			old_rewrite = old_rewrite.replace(fixed_end, '');
			var records  = old_rewrite.split('<\/b> ');

			if(indice > 1){
				var armi = records[1].substring(0, records[1].indexOf(' <img src="vendetta/img/R1K.gif'));
				var muni = records[2].substring(0, records[2].indexOf(' <img src="vendetta/img/R2K.gif'));
			}

			if(indice == 1 || indice == 3) {
				var doll = records[indice].substring(0, records[indice].indexOf(' <img src="vendetta/img/R4K.gif'));
			}

			var rewrite = '';
			rewrite += modify_xml(armi, armi_now, MagazzinoArmi, 1);
			rewrite += modify_xml(muni, muni_now, MagazzinoMuni, 2);
			rewrite += modify_xml(doll, doll_now, Cassaforte, 4);
			anchorTags[i].innerHTML = fixed_start + rewrite + fixed_end;
			
		}
	}
})();

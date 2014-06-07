// ==UserScript==
// @name           logger fp
// @namespace      local
// @include        http://www.fotka.pl/konto_przyjaciel_ranking.php
// @copyright	   bozar
// @version        1.0.1
// ==/UserScript==

// oparte na bazie loggera średniej

///////////////////////////////////////////////////////////////
var tabelka = document.getElementsByTagName("table")[0];
if (tabelka){
	aktualizuj(pobierzPunkty());
	insertAfter(tabelka.parentNode, generujWykres(), tabelka);
}
///////////////////////////////////////////////////////////////


function generujWykres(){
	var dane = GM_getValue("fp_logger")
	
	var html = '<object type="application/x-shockwave-flash" data="http://www.smrw.lodz.pl/~bozar/fotka/amline.swf" width="570" height="300"> <param name="movie" value="http://www.smrw.lodz.pl/~bozar/fotka/amline.swf"> <param name="width" value="600" /> <param name="height" value="400" /> <param name="id" value="amline" /> <param name="quality" value="high">                                 <param name="flashvars" value="chart_data=';
	html += encodeURIComponent(konwertujDoXML(dane)) + '&chart_settings=';
	html += encodeURIComponent('<settings>  <balloon><on_off>0</on_off></balloon>' + '	<font>Tahoma</font><text_size>10</text_size><decimals_separator>.</decimals_separator><digits_after_decimal>0</digits_after_decimal><background><alpha>90</alpha><border_alpha>10</border_alpha></background><plot_area><margins><left>50</left><right>40</right><bottom>65</bottom></margins></plot_area><grid><x><alpha>10</alpha><approx_count>6</approx_count></x><y_left><alpha>10</alpha></y_left></grid><axes><x><width>1</width><color>0D8ECF</color></x><y_left><width>1</width><color>0D8ECF</color></y_left></axes><values><x><rotate>0</rotate></x><y_left><skip_first>0</skip_first></y_left></values><indicator><color>0D8ECF</color><x_balloon_text_color>FFFFFF</x_balloon_text_color><line_alpha>50</line_alpha><selection_color>0D8ECF</selection_color><selection_alpha>20</selection_alpha></indicator><zoom_out_button></zoom_out_button><legend><enabled>0</enabled><graph_on_off>0</graph_on_off></legend><graphs><graph gid="0"><color>0d8ecf</color><color_hover>FF0F00</color_hover><selected>1</selected><bullet>round</bullet><bullet_size>3</bullet_size></graph></graphs><labels><label lid="0"><y>25</y><text_size>13</text_size><align>center</align></label></labels></settings>');	
	html += '"/> </object>';
	
	var divNaWykres = document.createElement("div");
	divNaWykres.innerHTML = html;
	divNaWykres.style.margin = "20px";
	divNaWykres.style.textAlign = "center";
	return divNaWykres;		
}

function konwertujDoXML(dane){
	var out = '<chart><series>'
	var pary = dane.split(" ")
	for(i=0; i<pary.length; i++){
		var d =  pary[i].split(",")[0];		
		out += "<value xid='" + i + "'>" + d + "</value>";
	}
	out += '</series><graphs><graph gid="0">';
	for(i=0; i<pary.length; i++){
		var srednia =  pary[i].split(",")[1];
		out += "<value xid='" + i + "'>" + srednia + '</value>';
	}
	out += '</graph></graphs></chart>';
	
	return out;
}

function dataSQL(today){	
	return today.getFullYear() + "-" + 
				(((today.getMonth()+1)>=10) ? (today.getMonth()+1) : ("0"+(today.getMonth()+1))) + "-" + 
				(((today.getDate())>=10) ? (today.getDate()) : ("0"+(today.getDate())))
}


function aktualizuj(val){
	//jak nie ma ciastka, utwórz je, wpisz średnią i dodaj separator
	//jak jest ciastko, poprównaj dziśiejszą datę z ostatnią
	////jak jest większa, to dopisz i dodaj separator
	
	// GM_log("wyłowiona wartosć: "+val);

	var s = GM_getValue("fp_logger");
	// GM_log("strumień bazy danych: "+s);
	
	var today = new Date();	
	var dziś = dataSQL(today);

	if(s==null){
		GM_setValue("fp_logger", (dziś + "," + val))
	}else{
		var pozycje = s.split(" "); // otrzymujemy tablicę par data|punkty
		var punkty = [];
		var daty = [];
		for(i=0; i<pozycje.length; i++){
			punkty[i] = pozycje[i].split(",")[1];
			daty[i] = pozycje[i].split(",")[0];	
			//// GM_log("W dniu " + daty[i] + " wynosiła " + punkty[i])
		}
		//mamy dwie teraz jednakowo indeksowane tablice, zawierające punkty i daty
		
		//bierzemy ostatnią datę w formacie rrrr-mm-dd i przekształcamy ją na Date(r,m,d)
		var o = daty[daty.length-1];
		var ost = new Date(	parseInt(o.split("-")[0], 10),
							parseInt(o.split("-")[1], 10) - 1,
							parseInt(o.split("-")[2], 10));		
		ost.setHours
		
		// GM_log("ostatnia data zapisana w bazie: " + dataSQL(ost));
		
		//bierzemy dziśiejszą datę, odejmujemy od niej ostatnią i patrzymy czy różnica przekracza 1 dzień		
		var delta = (today.getTime() - ost.getTime()) / (1000*60*60*24);
		
		
		
		// GM_log("Porównywanie " + dataSQL(ost) + " z " + dataSQL(today) + ": delta=" + delta);
		
		if(delta<1){
			//data była już w bazie, więc tylko uaktualniamy dzisiejszą pozycję
			daty.pop();
			daty.push(dziś);			
			punkty.pop();
			punkty.push(val);
			// GM_log("uaktualnienie ostatniej pozycji");
		}else if(delta>=1 && delta<2){
			//minął tylko jeden dzień. dodanie nowej pozycji
			daty.push(dziś);
			punkty.push(val);
			// GM_log("minął tylko jeden dzień. dodanie nowej pozycji: " + dziś + " " + val)
		}else if(delta>=2){	
			//minął więcej niż 1 dzień, więc trzeba wygenerować "puste" pozycje
			//generujemy od następnego dnia po ostatnim w wpisie w bazie aż do bieżącego dnia WYŁĄCZNIE
			// GM_log("minął więcej niż 1 dzień, więc trzeba wygenerować puste pozycje");
			for(i=Math.floor(delta)-1; i>0; i--){				
				var staraData = new Date();				
				staraData.setTime( today.getTime() - i*1000*60*60*24 );
				daty.push(dataSQL(staraData));
				punkty.push("");			
				
				// GM_log("generowanie pustej daty " + dataSQL(staraData));
			}
			// i wstawiamy bieżącą, jak poprzednio
			daty[daty.length] = dziś;
			punkty[punkty.length] = val;
		}	
		
		//teraz od nowa zapisujemy wszystkie wartości
		var out = "";
		for(i=0; i<daty.length-1; i++){
			out += daty[i] + "," + punkty[i] + " ";
		}
		out += daty.pop() + "," + punkty.pop();	//w tej sposób unikamy " " na końcu
		
		GM_setValue("fp_logger", out);
		// GM_log("zapisywanie strumienia: "+out);
	}
	//w tym momencie w ciastku mamy strumień danych w formacie akceptowalnym przez
	//flashowy wykres
}

function pobierzPunkty(){	
	var komórki = document.getElementsByClassName("td1")
					
    for(i=0; i<komórki.length; i++){ 
		var loginFP = komórki[i].firstChild.innerHTML;
		
		if(loginFP == unsafeWindow.ad_zalogowany_login){
			var punktyMulti = komórki[i].nextSibling.textContent;
			return punktyMulti.match(/\(.?\d+\)/)[0].match(/\d+/); // OMG!
		}
    } 	
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

function $(id){
	return document.getElementById(id);
}
	

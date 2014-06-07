// ==UserScript==
// @name           logger sredniej
// @namespace      local
// @include        http://www.fotka.pl/konto_glosy.php
// @copyright	   bozar
// @version        1.0.1
// ==/UserScript==


var $ = unsafeWindow.$;

var średnia = Math.round(średniaHD() * 1000000) / 1000000
if(średnia>0){
	aktualizuj(średnia)
	linkDoWykresu()		
}


function linkDoWykresu(){
	//z powodu oszczędności miejsca, wykres będzie popupem, aktywowanym kliknięciem linku
	var linki = document.getElementsByTagName("a");	
		
	var link = document.createElement("A")
	link.innerHTML = "Wykres"
	link.style.paddingLeft = "1em"
	link.style.cursor = "pointer";
	link.addEventListener('click', pokazPopup2, true)
	
	$("a.k10:contains('Wyzeruj moją średnią')").after(link);
}

function pokazPopup2(){
	var dane = GM_getValue("dane-" + unsafeWindow.ad_zalogowany_login)
	//dane = dane.replace(/\\n/g,"\n");
	var popup = window.open("", "Wykres", "height=400,width=600")
	var html = '<html><body><object type="application/x-shockwave-flash" data="http://www.smrw.lodz.pl/~bozar/fotka/amline.swf" width="600" height="400"> <param name="movie" value="http://www.smrw.lodz.pl/~bozar/fotka/amline.swf"> <param name="width" value="600" /> <param name="height" value="400" /> <param name="id" value="amline" /> <param name="quality" value="high"> <param name="flashvars" value="chart_data=';
	html += encodeURIComponent(konwertujDoXML(dane)) + '&chart_settings=';
	html += encodeURIComponent('<settings><balloon><on_off>0</on_off></balloon><font>Tahoma</font><text_size>10</text_size><hide_bullets_count>18</hide_bullets_count><decimals_separator>.</decimals_separator><digits_after_decimal>2</digits_after_decimal><background><alpha>90</alpha><border_alpha>10</border_alpha></background><plot_area><margins><left>50</left><right>40</right><bottom>65</bottom></margins></plot_area><grid><x><alpha>10</alpha><approx_count>8</approx_count></x><y_left><alpha>10</alpha></y_left></grid><axes><x><width>1</width><color>0D8ECF</color></x><y_left><width>1</width><color>0D8ECF</color></y_left></axes><values><x><rotate>0</rotate></x><y_left><skip_first>0</skip_first></y_left></values><indicator><color>0D8ECF</color><x_balloon_text_color>FFFFFF</x_balloon_text_color><line_alpha>50</line_alpha><selection_color>0D8ECF</selection_color><selection_alpha>20</selection_alpha></indicator><zoom_out_button><text_color_hover>FF0F00</text_color_hover></zoom_out_button><legend><enabled>0</enabled><graph_on_off>0</graph_on_off></legend><graphs><graph gid="0"><title>Średnia</title><color>FF0000</color><bullet>square</bullet><bullet_size>3</bullet_size><bullet_color>000000</bullet_color><selected>1</selected></graph></graphs><labels><label lid="0"><y>25</y><text_size>13</text_size><align>center</align></label></labels></settings>');
	
	html += '"/> </object></body></html>';
		
	popup.document.open()	
	popup.document.write(html);
	popup.document.close() 
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
		var średnia =  pary[i].split(",")[1];
		out += "<value xid='" + i + "'>" + średnia + '</value>';
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

	var s = GM_getValue("dane-" + unsafeWindow.ad_zalogowany_login)
	
	var today = new Date();	
	var dziś = dataSQL(today);

	if(s==null){
		GM_setValue("dane-" + unsafeWindow.ad_zalogowany_login, (dziś + "," + val))
	}else{
		var pozycje = s.split(" ") // otrzymujemy tablicę par data|średnia
		var średnie = []
		var daty = []
		for(i=0; i<pozycje.length; i++){
			średnie[i] = pozycje[i].split(",")[1]
			daty[i] = pozycje[i].split(",")[0]		
		//GM_log("W dniu " + daty[i] + " wynosiła " + średnie[i])
		}
		//mamy dwie teraz jednakowo indeksowane tablice, zawierające średnie i daty
		
		//bierzemy ostatnią datę w formacie rrrr-mm-dd i przekształcamy ją na Date(r,m,d)
		var o = daty[daty.length-1];
		var ost = new Date(	parseInt(o.split("-")[0], 10),
							parseInt(o.split("-")[1], 10) - 1,
							parseInt(o.split("-")[2], 10));	
		//GM_log(ost)
		
		//bierzemy dziśiejszą datę, odejmujemy od niej ostatnią i patrzymy czy różnica przekracza 1 dzień
		var delta = (today.getTime() - ost.getTime()) / (1000*60*60*24)
		//GM_log("Porównywanie " + ost + " z " + today + ": delta=" + delta)
		
		if(delta>1 && delta<2){
			//minął dokładnie 1 dzień. dodanie nowej pozycji
			daty[daty.length] = dziś
			średnie[średnie.length] = val			
		}else if(delta>=2){	
			//minął więcej niż 1 dzień, więc trzeba wygenerować "puste" pozycje
			//generujemy od następnego dnia po ostatnim w wpisie w bazie aż do bieżącego dnia WYŁĄCZNIE
			for(i=Math.floor(delta)-1; i>0; i--){
				var staraData = new Date();				
				staraData.setTime( today.getTime() - i*1000*60*60*24 );
				daty[daty.length] = dataSQL(staraData);
				średnie[średnie.length] = '';				
			}
			// i wstawiamy bieżącą, jak poprzednio
			daty[daty.length] = dziś;
			średnie[średnie.length] = val;		
		}else{
			//nie minał dzień. aktualizacja ostatniej pozycji. datę zostawiamy w spokoju
			średnie[średnie.length - 1] = val
			//GM_log("Zaktualizwano pozycję " )
		}		
		
		//teraz od nowa zapisujemy wszystkie wartości
		var out = "";
		for(i=0; i<daty.length-1; i++){
			out = out + daty[i] + "," + średnie[i] + " "
		}
		out = out + daty[daty.length-1] + "," + średnie[średnie.length-1]	//w tej sposób unikamy "\\n" na końcu
		
		GM_setValue("dane-" + unsafeWindow.ad_zalogowany_login, out)
		//GM_log(out)
	}
	//w tym momencie w ciastku mamy strumień danych w formacie akceptowalnym przez
	//flashowy wykres
}


function średniaHD(){
	var listaOcen = wczytajOcenyOtrz()
	if (listaOcen==null) return 0
	var ilosc = 0
	var suma = 0
	for(i=0; i<11; i++){
		suma += (i+1) * parseInt(listaOcen[i])
		ilosc += parseInt(listaOcen[i])
	}	
	return (suma / ilosc)
}

function wczytajOcenyOtrz(){
	var tabelkaObiekt = $("td.count");
	var oceny = [];
    for(i=11; i<22; i++){
        oceny.push(parseInt(tabelkaObiekt[i].textContent));
    }
	return oceny;
}

function div(op1, op2) {
	return (op1 / op2 - op1 % op2 / op2)
}

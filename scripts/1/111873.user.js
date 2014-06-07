// ==UserScript==
// @name           Lista działów
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/forum/*
// @version        1.0.1
// ==/UserScript==

var u = unsafeWindow;
var $ = u.$;


var działy = [
["Fotka.pl", "fotka.pl"],
["Hydepark", "hydepark"],
["Miasto Fotki", "miasto_fotki"],
["Fotka.tv", "fotka.tv"],
["Książka, komiks", "ksiazka_komiks"],
["Film", "film"],
["Muzyka", "muzyka"],
["Taniec i kultura", "taniec_i_kultura"],
["Kulinaria", "kulinaria"],
["Gry i elektronika", "gry_i_elektronika"],
["Fotografia", "fotografia"],
["Sport", "sport"],
["Motoryzacja", "motoryzacja"],
["Moda i uroda", "moda_i_uroda"],
["Randka", "randka"],
["Seks", "seks"],
["Humor", "humor"],
["Szkoła", "szkola"],
["5-10-15", "5-10-15"],
["Czat", "czat"]];
if( $("#logowanie span[title='Fotka Przyjaciel']").length > 0 ){
	działy.unshift(["Przyjaciele", "przyjaciele"]);
}


var ostatnie = JSON.parse(GM_getValue("lista_działów", "[]"));




var gdzie = $("div.html table tbody tr:eq(0) td:eq(0)");
var dropdown = $("<select/>");
dropdown.css({"padding": 0, "font-size": "8pt"});

var g1 = $("<optgroup/>");
g1.attr("label", "3 Ostatnio używane");
dropdown.append(g1);

for(var i in ostatnie){
	for(var nr in działy){
		if(ostatnie[i] == działy[nr][1]){
			var o = $("<option/>");
			o.html(działy[nr][0]);
			o.val(działy[nr][1]);
			g1.append(o);
		}
	}
}

var g2 = $("<optgroup/>");
g2.attr("label", "Wszystkie fora");
dropdown.append(g2);

for(var nr in działy){
	var o = $("<option/>");
	o.html(działy[nr][0]);
	o.val(działy[nr][1]);
	g2.append(o);
}

dropdown.append(g1);
dropdown.append(g2);

var forum = document.location.href.split("/")[4];
if(forum){
	dropdown.val(forum);	
	gdzie.append("&nbsp;&nbsp;|&nbsp;&nbsp;");
	gdzie.append(dropdown);
	gdzie.change(function(e){
		var val = e.target.value;

		var nieByło = true;		// sprawdzenie czy wybrany dział był w 3 ostatnio używanych
		for(var nr in ostatnie){
			if(ostatnie[nr] == val){
				nieByło = false;
				break;
			}
		}

		if(nieByło){
			ostatnie.unshift(val);	// dodaj jako pierwsze
		}else{
			ostatnie.unshift(ostatnie.splice(ostatnie.indexOf(val), 1)[0]);	// przesuń na 1 pozycję
		}

		while(ostatnie.length > 3){
			ostatnie.pop();
		}

		setTimeout(function(){
			GM_setValue("lista_działów", JSON.stringify(ostatnie))
		} ,0);

		document.location.href = "http://www.fotka.pl/forum/" + e.target.value;
	});
}
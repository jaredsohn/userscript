// ==UserScript==
// @name        Oficjalna lista hańby od Wykopoczty
// @version     1.0 final
// @description Oznacza osoby będące na wykopocztowej lisćie hańby, jak i wolontariuszy wykopoczty. Umożliwia dostosowanie wyglądu i wyłączenie którejś z list. Aby to zrobić, wejdź w swoje ustawienia na Wykopie i kliknij "Dodatek Wykopoczty"
// @match       http://wykop.pl/*
// @match       http://www.wykop.pl/*
// @updateURL   http://userscripts.org/scripts/source/389289.user.js
// @copyright   2014, Michał Krawczak
// ==/UserScript==

function main()
{
	if(!('_mk' in window))
	{
		window._mk = {};
	}

	if(!('wp' in window._mk))
	{
		_mk.wp = {};
	}

	// listy i zwiazane z nimi _domyslne_ ustawienia: 
	_mk.wp.listy = 
	[
		{
			id: "listahanby", // identyfikator
			nazwa: "Lista hańby", // nazwa pod jaka lista bedzie widoczna w panelu 
			nicki:  
			[
				'choleryk', 'kacperjasper', 'mumiok1', 'woiownik', 'maemi',
				'krisq', 'devaitis', 'fishkul', 'dawix', 'g4nzu', 'aczikibom',
				'zuberek90', 'bisqpx', 'poprostustefan', 'Vladarionpl', 'K-H',
				'Markos90', 'Harold', 'Krzakol', 'ciszejtambopopolicjezadzwonie',
				'damian1123', 'Menzo', 'Kochany', 'Saliwan', 'michal_gol', 'zoru',
				'kamosblue', 'megawatt', 'ksionc', 'Preclowski', 'ihopeudie','pottymouth',
				'djvonski', 'KERW', 'PomaranczowyKrol', 'tandus', 'xircom2', 'polok20',
				'JanSerce', 'flamner', 'Prezesss', 'borntobewild', 'micky1', 'Aleoledacfaraddadf',
				'Phillippus', 'ledniowski99', 'oooMaXooo', 'retardo', 'aniolziom',
				'terminator2', 'Tigran', 'pietrass', 'Thou', 'shadow_no', 'betonkomorkowy', 'IF22I',
				'Agreas', 'Zakakaikane', 'qski', 'pietrek3121', 'shownomercy', 'JoLemon', 'Nexiu',
				'gtk90', 'zawszespoko', 'nokio', 'geometria', 'Radus', 'kozio23', 'gerkemateusz',
				'Bugiii', 'Eshirael', 'exohm', 'oczkers', 'paffnucy', 'trueno2', 'thirtyseconds',
				'Szczypiornista666', 'Colo99', 'notavailable', 'delbana', 'cimathel', 'picofrico',
				'dziadu90', 'markret', 'koters', 'NamalowanyPrzezSmutek', 'Elrok', 'Czerwony_Krokodyl',
				'ann_onim', 'Raych', 'Mcmaker', 'lol2x', 'martin-marti', 'kroy', 'mariusz83wach', 'katius',
				'martin87pl', 'ratuj_bobry', 'Tomasz_T', 'observethe', 'gadu-gadu', 'blisher', 'KingaM',
				'michuck', 'Nodun', 'pozdro_techno', 'hilemz', 'rbk17', 'zioomek', 'elgruby', '100cash',
				'damietoo', 'acysiel', 'duffman', 'fiLord', 'Drill', 'emtei', 'enyn6', 'hidden', 'j3th',
				'infernos', 'spidero', 'japko', 'k__d', 'Kicam', 'kielonek', 'kijana', 'komornikzmc',
				'komputer11', 'KredaFreda', 'LegalnaMarihuana', 'marcio15', 'matijass', 'DAbr0z',
				'mini_o', 'mlodyinaiwny', 'NameMaciek', 'noisy', 'Sindarin', 'onlyangel', 'Ozzy85',
				'PLAN_B', 'Porazka_Sezonu', 'reebot', 'scapegoat', 'Sevven', 'Skippermaxx', 'styroslaw',
				'sysiut', 'thomasho', 'tomatow', 'verzz', 'Wakizasheez', 'womabo', 'xbonio', 'yave',
                                'G4NzU', 'Maemi', 'WOiOwnik', 'KrisQ'
			],
			kolor: "purple", // kolor nicka dla osob z tej listy (pusty string = bez zmiany koloru)
			koperta: false, // czy dodac koperte?
			przekreslenie: true, // czy przekreslic?
			pochylenie: false, // czy przekreslic?
            pioro: false // czy dodac pioro?
		},
		{
			id: "wolontariusze", // identyfikator
			nazwa: "Wolontariusze", // nazwa pod jaka lista bedzie widoczna w panelu 
			nicki:  
			[ 
				'wykpopowa_ona', 'dropsky', 'theia', 'MiernaBabcia', 
				'wow', 'zoniu', 'belette', 'szoorstki', 'onde', 'tobiasty', 
				'BankierPL', 'BQG', 'kicioch', 'JezelyPanPozwoly', 'chorinek', 
				'gorzka', 'Mala_Mi123', 'polok20', 'tunia', 'mustek36', 
				'L_DiCarlo', 'WilkEuroazjatycki', 'piostrass007', 'tiris',
				'kuki_1988', 'omka', 'Bartek_', 'Bladi89', 
				'mroczne_knowania', 'filip_k', 'RYBCZAN', "Poirytowany"
			],
			kolor: "", // kolor nicka dla osob z tej listy (pusty string = bez zmiany koloru)
			koperta: true, // czy dodac koperte?
			przekreslenie: false, // czy przekreslic?
			pochylenie: false, // czy przekreslic?
            pioro: false // czy dodac pioro?
		},
        {
            id: "organizatorzy",
            nazwa: "Organizatorzy",
            nicki:
            [
                'MistrzuYoda', 'Dreszczyk', 'kerly', 'chomi', 'zdechly_jez', 'speerpre', 'tomix', 'GrabkaMan', "Wykopoczta"
            ],
			kolor: "", // kolor nicka dla osob z tej listy (pusty string = bez zmiany koloru)
			koperta: false, // czy dodac koperte?
			przekreslenie: false, // czy przekreslic?
			pochylenie: false, // czy przekreslic?
            pioro: true // czy dodac pioro?
            
        }
	];

    _mk.wp.kolorki = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
    
	// na pozniej
	_mk.wp.czy_nocny = null;

	// ktore parametry z powyzszej listy beda przechowywane w localStorage i modyfikowalne w panelu
	_mk.wp.parametry_wyswietlania =
	{ 
		kolor: 
		{
			typ: "color", 
			nazwa: "Kolor nicka",
			funkcja: function(kolor)
			{ 
				return "color: " + kolor + " !important; "; 
			}
		},
		koperta: 
		{
			typ: "bool", 
			nazwa: "Koperta przy nicku?",
			funkcja: function(czy_koperta)
			{ 
				var koperta = _mk.wp.czy_nocny? _mk.wp.koperta_nocny: _mk.wp.koperta_dzienny;
				var styl = "";
				styl += "background-position: right center; ";
				styl += "background-repeat: no-repeat; ";
				styl += "padding-right: 21px; ";
				styl += "background-image: " + koperta + "; "; 
				return czy_koperta == "true"? styl: "";         
			}
		},
		pioro: 
		{
			typ: "bool", 
			nazwa: "Pióro przy nicku?",
			funkcja: function(czy_pioro)
			{ 
				var pioro = _mk.wp.czy_nocny? _mk.wp.pioro_nocny: _mk.wp.pioro_dzienny;
				var styl = "";
				styl += "background-position: right center; ";
				styl += "background-repeat: no-repeat; ";
				styl += "padding-right: 24px; ";
				styl += "background-image: " + pioro + "; "; 
				return czy_pioro == "true"? styl: "";         
			}
		},
		przekreslenie: 
		{
			typ: "bool", 
			nazwa: "Przekreślony nick?",
			funkcja: function(czy_przekreslony)
			{ 
				return czy_przekreslony == "true"? "text-decoration: line-through !important; ": ""; 
			}
		},
		pochylenie: 
		{
			typ: "bool", 
			nazwa: "Pochylony nick?",
			funkcja: function(czy_pochylony)
			{ 
				return czy_pochylony == "true"? "font-style:italic !important; ": ""; 
			}
		}
	}

	// uruchamiane tylko raz, po pierwszym uruchomieniu wykopu z zainstalowanym skryptem
	_mk.wp.instaluj = function()
	{
		localStorage["wykopoczta_wtyczka_zainstalowana"] = "true";
		for(i in _mk.wp.listy)
		{
			var lista = _mk.wp.listy[i];
			for(nazwa_parametru in _mk.wp.parametry_wyswietlania)
			{
				var parametr = _mk.wp.parametry_wyswietlania[nazwa_parametru];
				localStorage["wykopoczta_"+lista.id+"_"+nazwa_parametru] = lista[nazwa_parametru];
			}
		}
	}


	// uruchamiane za kazdym wywolaniem skryptu
	_mk.wp.odpalaj_pan = function()
	{
        if(!("wykopoczta_wtyczka_zainstalowana" in localStorage) || !("wykopoczta_organizatorzy_kolor" in localStorage))
		{
			_mk.wp.instaluj();
		}
		if(location.href.indexOf("wykop.pl/ustawienia/") != -1)
		{
			_mk.wp.dodaj_przycisk_ustawien();
		}
		var nick_profilu = "";
		var profil = null;
		if(location.href.indexOf("wykop.pl/ludzie/") != -1)
		{
			profil = $("div.userstory h2.x-big.lheight28");
			nick_profilu = profil.contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[0].wholeText.trim();
		}
		_mk.wp.czy_nocny = $("body").hasClass("nightmode");
		$("head").append($("<style>"));
		_mk.wp.styleSheet = document.styleSheets[document.styleSheets.length-1];
		for(i in _mk.wp.listy)
		{
			var lista = _mk.wp.listy[i];
			var reguly = "";
			for(nazwa_parametru in _mk.wp.parametry_wyswietlania)
			{
				var parametr = _mk.wp.parametry_wyswietlania[nazwa_parametru];
				var ustawienie = localStorage["wykopoczta_"+lista.id+"_"+nazwa_parametru];
				var funkcja = parametr.funkcja;
				var regula = funkcja(ustawienie);
				reguly += regula;
			}
			selektory = ".wykopoczta-" + lista.id;
			for(j in lista.nicki)
			{
				var nick = lista.nicki[j];
				var selektor = _mk.wp.stworz_selektor(nick);
				selektory += selektor;
				if(nick_profilu && nick == nick_profilu)
				{
					profil.addClass("wykopoczta-" + lista.id);
				}
				if(j%8==7)
				{
					var styl = selektory + "{" + reguly + "}"; 
					_mk.wp.dodaj_styl(styl);
					selektory = ".wykopoczta-" + lista.id;
				}
			}
			var styl = selektory + "{" + reguly + "}"; 
			_mk.wp.dodaj_styl(styl);
		}
		_mk.wp.dodaj_styl("a.showProfileSummary:hover strong{background:none !important;padding:0px !important;}");
		_mk.wp.dodaj_styl("a.link.gray span{background:none !important;padding:0px !important;}");
		_mk.wp.dodaj_styl("a.link.gray:hover span{background:none !important;padding:0px !important;}");
	   // _mk.wp.dodaj_styl("a.showProfileSummary strong{background:none !important;padding:0px !important;}");
	   // _mk.wp.dodaj_styl("a.fleft{background:none !important;padding:0px !important;}");
		_mk.wp.dodaj_styl("div.quickpoint.avatar a,div.quickpoint.avatar a:hover, div.usercardlink>a.fleft:first-child{background:none !important;padding-right:0px!important;}");
	}

	_mk.wp.stworz_selektor = function(nick)
	{
		var wynik = "";
		wynik += ",a.showProfileSummary:hover[href=\"http://www.wykop.pl/ludzie/"+nick+"/\"] ";
		wynik += ",#user[href=\"http://www.wykop.pl/ludzie/"+nick+"/\"] ";
		wynik += ",a[href=\"http://www.wykop.pl/ludzie/"+nick+"/\"] strong";
		wynik += ",div.usercardlink a[href=\"http://www.wykop.pl/ludzie/"+nick+"/\"] ";
		wynik += ",a.link.gray:hover[href=\"http://www.wykop.pl/ludzie/"+nick+"/\"]";
		wynik += ",a.link.gray:hover[href=\"http://www.wykop.pl/ludzie/"+nick+"/\"] span";
		wynik += ",a:hover[href=\"http://www.wykop.pl/ludzie/"+nick+"/\"] strong";
		wynik += ",ul.conversations>li>a[href=\"http://www.wykop.pl/wiadomosc-prywatna/konwersacja/"+nick+"/\"]>span>span.strong";
		return wynik;
	}
		
	// dodaje regulke CSS
	_mk.wp.dodaj_styl = function(styl)
	{
		try{
		_mk.wp.styleSheet.insertRule(styl, 0);
		} catch(e){console.log(e);}
		console.log(styl);
	}

	// dodaje przycisk ladujacy ustawienia
	_mk.wp.dodaj_przycisk_ustawien = function()
	{
		var linki = $("div.scale>div.filters");
		linki.append($("<a>").addClass("fleft").addClass("marginleft10").html("Dodatek Wykopoczty").click(_mk.wp.ustawienia))
	}

	// otwiera ustawienia
	_mk.wp.ustawienia = function()
	{
		var przyciemniacz = $("<div style='width:100%;height:100%;position:fixed;top:0px;left:0px;z-index:250;opacity:0;background:#222222;'>").fadeTo("slow",0.7).click(_mk.wp.zamknij_ustawienia);
        var formularz = $("<div style='position:fixed;top:10%;bottom:10%;overflow-y:auto;left:30%;width:40%;z-index:251;opacity:0;padding:20px;border:1px solid gray;'>").fadeTo("slow",0.95);
		$("body").append(przyciemniacz).append(formularz);
		formularz.html("<h3 class='xx-large lheight20 '>Dostępne listy:</h3>").css("border-radius","10px").css("background-color", $("body").css("background-color"));
		for(i in _mk.wp.listy)
		{
			var lista = _mk.wp.listy[i];
			if(typeof lista != "object")
			{
				continue;
			}
			formularz.append($("<p></p>").html(lista.nazwa + " ("+lista.nicki.length+" nicków, <a onclick=\"$('#akapit_lista_nickow_"+lista.id+"').toggle();\">wyświetl</a>)").css("margin-top","22px"));
            var akapit_lista_nickow = $("<p id=\"akapit_lista_nickow_"+lista.id+"\">").addClass("x-small");
            var lista_nickow = [];
            for(i in lista.nicki)
            {
                var nick = lista.nicki[i];
                if(typeof nick == "string")
                {
               		lista_nickow.push("<a href=\"http://wykop.pl/ludzie/"+nick+"\">"+nick+"</a>");
                }
            }
            akapit_lista_nickow.html(lista_nickow.join(" &bull; ")).hide();
            formularz.append(akapit_lista_nickow);
			for(nazwa_parametru in _mk.wp.parametry_wyswietlania)
			{
				var parametr = _mk.wp.parametry_wyswietlania[nazwa_parametru];
				var akapit = $("<p></p>").html(parametr.nazwa + "<br/>").addClass("small").addClass("cc6");
				formularz.append(akapit);
				if(parametr.typ == "color")
				{
                    try{
					var stara_wartosc = localStorage["wykopoczta_"+lista.id+"_"+nazwa_parametru];
                    var select = $("<select name=\""+"wykopoczta_"+lista.id+"_"+nazwa_parametru+"\"></select>").val(stara_wartosc).change(function()
					{ 
						//alert($(this).val())
						localStorage[$(this).attr("name")] = $(this).val();
					});
                    for(i in _mk.wp.kolorki)
                    {
                        var kolor = _mk.wp.kolorki[i];
                        if(typeof kolor == "string")
                        {
                            select.append($("<option value=\""+kolor+"\">"+kolor+"</option>").prop("selected", kolor == stara_wartosc).css("color", kolor))
                        }
                    }
                    select.append($("<option value=\"\">(nie koloruj)</option>").prop("selected", stara_wartosc == ""));
					akapit.append(select);
                    }catch(e){alert(e);}
				}
				else if(parametr.typ == "bool")
				{
					var stara_wartosc = localStorage["wykopoczta_"+lista.id+"_"+nazwa_parametru];
					akapit.append($("<input name=\""+"wykopoczta_"+lista.id+"_"+nazwa_parametru+"\" type=\"checkbox\"></input>").prop("checked", stara_wartosc == "true").change(function()
					{ 
						localStorage[$(this).attr("name")] = $(this).is(":checked");
					}));
				}
			}
			
		}
		formularz.append($("<input type=\"submit\" value=\"zamknij\">").click(_mk.wp.zamknij_ustawienia));
		_mk.wp.przyciemniacz = przyciemniacz;
			_mk.wp.formularz = formularz;
	}

	// zamyka ustawienia bez zapisywania
	_mk.wp.zamknij_ustawienia = function()
	{
		_mk.wp.przyciemniacz.remove();
		_mk.wp.przyciemniacz = null;
		_mk.wp.formularz.remove();
		_mk.wp.formularz = null;
	}

	_mk.wp.koperta_dzienny = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAICAYAAAAm06XyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3gIUDTUFm9jhPQAAAStJREFUGNONkbFKw1AYhc9JVIQu4lA7Fhcnl6K5g5vQqdBBafICAQfJG5iUJi/QxcWx0CGmCj5A3TqkWZwKXcS94iKCFe79nVqyFD3z93HgHDph+gnwG5APAIK/Q4D7gOxuAXiDmJzEmYh1nSed502WCrNz0tyKyBNIZQHQeeL5GvSF0ldROnR6Wa0sOb2spqJ0KJS+Bv088XwA2loBRexOKna1IYYzapmrcBScXN1tq3AUUMtcDGcVu9ooYneycqxywxKLOix4AgwMTdM+2Hs3NE0BBrDgLbGol/m1rLpZS2sZUxBNYzcoYretbR4Xsduexm5AQaS1jFU3a62Xc27SF5KPArhGcFkknfmmwU7D7MgiHgjci8gFnTD9AvAKMBPg5x8/7QDSAXD4C2G0fLHygd4VAAAAAElFTkSuQmCC)";
	_mk.wp.koperta_nocny = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3gIUAAswhHatMAAAATFJREFUKM+NkDFLA1EQhGdvc5dCk0PuXWOnPyHYWdkHUtnEToOd2OivMJ1gZ2ll5W8ISRlShoD6A7LvheS0ece7tTEiQTADyzTzweyQiJwTEalqwJYiIlZVJREpAHyq6gsRvf8HquoBEXUA7NSI6DWEcBVF0QOAJEmS20ajIZtQURTGe39HREdVVZ0y830EAHmeD7IsawGYeu/HzrkeAFq3dM71vPdjANMsy1p5ng8AANbaiapifdbaroi4+Xw+FJHOtztrbXcjN6n9riYiN0R0GUI4YeZDANdE1A8hvDHzs4jsG2P6P8NZaydlWR4z8yOAZhzHZ2maLjZ/Xi6Xe2VZPgFYhRAu4jgeRqpaZ+YRgJkxpv0XCABpmi6MMW0AM2YeqWqdRGQFYAXgA9trF0DzCz56o1d8Wi0iAAAAAElFTkSuQmCC)";

    _mk.wp.pioro_dzienny = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAANCAYAAABGkiVgAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3gIUEwcsIqKjWgAAAdhJREFUOMt9k0toE1EUhr9zm0lqpYSCBRELgS5FXAhVbKIV3Qh2sBsFreJCI0lxJbiVbNy5kNrUhRspuBErNuNGFB9kVERFBLOs4MIXqFVCa/OY4yKNDuPMHLhwH+d+97/3/FdUlW5MXH2eaXmtgiCTwCZCQtCSqtRUtFeFqlPILv6X04XuLT1K9A9ab4AtRIVyY2Fq9Fh3aM+4p9rSdO4Wxz7700y3078hWYwFwlus3tP+iZb3ay5B8kQwMfFXsng5RcL1wUvgXSW/fcW/YJn0DlXdHNxg/u00A4G1TyKcTBjZuFAcHVF0frzsXgQ4dOXZVrvsOir6GGFnpFIgAJXbdwq7rgOUSpjKhWzFLleH7Fn3IYbdPkEDMVBNBS59r1OM6kEZZBiylwUWVRkLMNJxSpd9wA+rK/X7E9NPh62UvrqVzzkAHnIu5NV/xkBluVMTPEGOp9atzzSN99HJ534AjE9Xt0mP7A8x7pe463e8pnJNadcti+/Ntjlrz7h7EDLSI0MR3o2GKvJA0COITiqy1GzJGSAd7jKfUJFapKXqfY05kNdAnyDnwwoQEu/NauNS5DcFOHyzlvz9dekAokeBfYAFyNrhstYawAtVfWKRnJ2fGvkWhP4Bg5WiEKMjBpMAAAAASUVORK5CYII=)";
    _mk.wp.pioro_nocny = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3gIUEwcbmh8GVQAAAW9JREFUOMu1lMFKW0EYhc8ZUoSiyJ0McSVmV7rRhdBK3BWKrgXBjQ8g+Aa2u7pwW0qhQrsqfQGJbyBZtSQgusmmdaVkxiyCKM2d080lJJcEb1p6NsP8//wfc87AUBKKyHt/AGCPZCvG+NE5V590lkWgIYQNSacAzFD5sFwuv/kraLfbXUrT9DuAcq4VjTErSZKc52fMY7dM0/T9GCAAGEkvx82Mhbbb7ZlOp7MTQvhG8gjA7Yg9skVy01r7edx8KZfdWozxU5IkzwE8yaJZALANoA7gGsBba+1XAHGSu1Juv0VyOVd7BeBKUq3X611Uq9X7xyLL23+drb8BvBiy/cw596MIcOT1QwiLkn4CkKSGMWZW0kqWYc1a20BBDezHGI9J3klqkqxJYgZsTgMcQL33+yRXAVySXM96DwB+AfiAKcUQwnyM8QyAAMyRfNfv908qlcpNVptalATv/a6kp865L9kj/ZNY9EOZRgb/QX8AdZuW7Ntn8/oAAAAASUVORK5CYII=)";
    
	_mk.wp.odpalaj_pan();
}

if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        // Firefox
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        // Chrome
        addJQuery(main);
    }
} else {
    // Opera
    main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")()";
    document.body.appendChild(script);
}
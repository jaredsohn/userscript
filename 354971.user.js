// ==UserScript==
// @name			Duolingo Dictionary Script by CyberZero
// @namespace		http://cyberzero.tk/
// @version			0.6
// @description		Megmutatja a felhasználó saját szótárát
// @match			http://www.duolingo.com/*
// @match			https://www.duolingo.com/*
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright		2014, CyberZero
// ==/UserScript==

/*
Ha segíteni szeretnél a program más nyelvekre való fordításában, akkor
megtalálsz a FB-on.

If you would like to help in translating the program to other languages,
you can find me on FB.

https://www.facebook.com/TheCyberZero
*/

//névtelen függvény a biztonság kedvéért
(function(){
    //css formázás
    GM_addStyle(		
		'.szotartabla{width:260px; table-layout:fixed; word-break: break-all; word-wrap: break-word; margin-top:20px;}'+
		'.szotartabla tr{width:260px;}'+
		'.szotartabla td{width:130px; text-align:center;}'
	);
	
	//globális változók
	var nyelv='en',
		nyelv2='en',
		tartalmazoElem,
		szavak=[],
		szohalmaz=[],
		egyedi=[],
		szavakszama=0,
		osszeslekeres=0,
		lekereseddig=0,
		htmlke='',
		szovegek={
            'en':{
				betolto:'Loading...',
				szazalek:'Loaded: ',
				nemvolt:'You haven\'t learned a word yet.',
				szotar:'Dictionary',
				elrejtes:'Hide',
                nyomtatas:'Print',
				ab	:'Abkhazian',
				aa	:'Afar',
				af	:'Afrikaans',
				sq	:'Albanian',
				am	:'Amharic',
				ar	:'Arabic',
				hy	:'Armenian',
				as	:'Assamese',
				ay	:'Aymara',
				az	:'Azerbaijani',
				ba	:'Bashkir',
				eu	:'Basque',
				bn	:'Bengali, Bangla',
				dz	:'Bhutani',
				bh	:'Bihari',
				bi	:'Bislama',
				br	:'Breton',
				bg	:'Bulgarian',
				my	:'Burmese',
				be	:'Byelorussian',
				km	:'Cambodian',
				ca	:'Catalan',
				zh	:'Chinese',
				co	:'Corsican',
				ht	:'Croatian',
				cs	:'Czech',
				da	:'Danish',
				nl	:'Dutch',
				en	:'English, American',
				eo	:'Esperanto',
				et	:'Estonian',
				fo	:'Faeroese',
				fj	:'Fiji',
				fi	:'Finnish',
				fr	:'French',
				fy	:'Frisian',
				gb	:'Gaelic (Scots Gaelic)',
				gl	:'Galician',
				ka	:'Georgian',
				de	:'German',
				el	:'Greek',
				kl	:'Greenlandic',
				gn	:'Guarani',
				gu	:'Gujarati',
				ha	:'Hausa',
				iw	:'Hebrew',
				hi	:'Hindi',
				hu	:'Hungarian',
				is	:'Icelandic',
				in	:'Indonesian',
				ia	:'Interlingua',
				ie	:'Interlingue',
				ik	:'Inupiak',
				ga	:'Irish',
				it	:'Italian',
				ja	:'Japanese',
				jw	:'Javanese',
				kn	:'Kannada',
				ks	:'Kashmiri',
				kk	:'Kazakh',
				rw	:'Kinyarwanda',
				ky	:'Kirghiz',
				rn	:'Kirundi',
				ko	:'Korean',
				ku	:'Kurdish',
				lo	:'Laothian',
				la	:'Latin',
				lv	:'Latvian, Lettish',
				ln	:'Lingala',
				lt	:'Lithuanian',
				mk	:'Macedonian',
				mg	:'Malagasy',
				ms	:'Malay',
				ml	:'Malayalam',
				mt	:'Maltese',
				mi	:'Maori',
				mr	:'Marathi',
				mo	:'Moldavian',
				mn	:'Mongolian',
				na	:'Nauru',
				ne	:'Nepali',
				no	:'Norwegian',
				oc	:'Occitan',
				or	:'Oriya',
				om	:'Oromo, Afan',
				ps	:'Pashto, Pushto',
				fa	:'Persian',
				pl	:'Polish',
				pt	:'Portuguese',
				pa	:'Punjabi',
				qu	:'Quechua',
				rm	:'Rhaeto-Romance',
				ro	:'Romanian',
				ru	:'Russian',
				sm	:'Samoan',
				sg	:'Sangro',
				sa	:'Sanskrit',
				sr	:'Serbian',
				sh	:'Serbo-Croatian',
				st	:'Sesotho',
				tn	:'Setswana',
				sn	:'Shona',
				sd	:'Sindhi',
				si	:'Singhalese',
				ss	:'Siswati',
				sk	:'Slovak',
				sl	:'Slovenian',
				so	:'Somali',
				es	:'Spanish',
				su	:'Sudanese',
				sw	:'Swahili',
				sv	:'Swedish',
				tl	:'Tagalog',
				tg	:'Tajik',
				ta	:'Tamil',
				tt	:'Tatar',
				te	:'Tegulu',
				th	:'Thai',
				bo	:'Tibetan',
				ti	:'Tigrinya',
				to	:'Tonga',
				ts	:'Tsonga',
				tr	:'Turkish',
				tk	:'Turkmen',
				tw	:'Twi',
				uk	:'Ukrainian',
				ur	:'Urdu',
				uz	:'Uzbek',
				vi	:'Vietnamese',
				vo	:'Volapuk',
				cy	:'Welsh',
				wo	:'Wolof',
				xh	:'Xhosa',
				ji	:'Yiddish',
				yo	:'Yoruba',
				zu	:'Zulu'			
			},
			'hu':{
				betolto:'Betöltés folyamatban...',
				szazalek:'Betöltve: ',
				nemvolt:'Még nem tanultál meg szavakat.',
				szotar:'Szótár',
				elrejtes:'Elrejtés',
                nyomtatas:'Nyomtatás',
				ab	:'Abház',
				aa	:'Messze',
				af	:'Afrikaans',
				sq	:'Albán',
				am	:'Amhara',
				ar	:'Arab',
				hy	:'Örmény',
				as	:'Asszámi',
				ay	:'Aymara',
				az	:'Azerbajdzsáni',
				ba	:'Baskír',
				eu	:'Baszk',
				bn	:'Bengáli, Bangla',
				dz	:'Bhutani',
				bh	:'Bihari',
				bi	:'Bislama',
				br	:'Breton',
				bg	:'Bolgár',
				my	:'Burmai',
				be	:'Belorusz',
				km	:'Kambodzsai',
				ca	:'Katalán',
				zh	:'Kínai',
				co	:'Korzikai',
				ht	:'Horvát',
				cs	:'Cseh',
				da	:'Dán',
				nl	:'Holland',
				en	:'Angol, amerikai',
				eo	:'Eszperantó',
				et	:'Észt',
				fo	:'Feröer-szigetek',
				fj	:'Fidzsi-szigetek',
				fi	:'Finn',
				fr	:'Francia',
				fy	:'Fríz',
				gb	:'Gael (skót gael)',
				gl	:'Galíciai',
				ka	:'Grúz',
				de	:'Német',
				el	:'Görög',
				kl	:'Greenlandic',
				gn	:'Guarani',
				gu	:'Gudzsaráti',
				ha	:'Hausza',
				iw	:'Héber',
				hi	:'Hindi',
				hu	:'Magyar',
				is	:'Izlandi',
				in	:'Indonéz',
				ia	:'Interlingua',
				ie	:'Interlingue',
				ik	:'Inupiak',
				ga	:'Ír',
				it	:'Olasz',
				ja	:'Japán',
				jw	:'Jávai',
				kn	:'Kannada',
				ks	:'Kasmíri',
				kk	:'Kazah',
				rw	:'Kinyarwanda',
				ky	:'Kirgiz',
				rn	:'Kirundi',
				ko	:'Koreai',
				ku	:'Kurd',
				lo	:'Laothian',
				la	:'Latin',
				lv	:'Lett, lett',
				ln	:'Lingala',
				lt	:'Litván',
				mk	:'Macedóniai',
				mg	:'Madagaszkári',
				ms	:'Maláj',
				ml	:'Malayalam',
				mt	:'Máltai',
				mi	:'Maori',
				mr	:'Marathi',
				mo	:'Moldvai',
				mn	:'Mongol',
				na	:'Nauru',
				ne	:'Nepáli',
				no	:'Norvég',
				oc	:'Okszitán',
				or	:'Oriya',
				om	:'Oromo, Afan',
				ps	:'Pastu, Pushto',
				fa	:'Perzsa',
				pl	:'Lengyel',
				pt	:'Portugál',
				pa	:'Pandzsábi',
				qu	:'Quechua',
				rm	:'Rétoromán',
				ro	:'Román',
				ru	:'Orosz',
				sm	:'Szamoai',
				sg	:'Sangro',
				sa	:'Szanszkrit',
				sr	:'Szerb',
				sh	:'Szerb-horvát',
				st	:'Sesotho',
				tn	:'Setswana',
				sn	:'Shona',
				sd	:'Szindhi',
				si	:'Szingaléz',
				ss	:'Szinghaléz',
				sk	:'Szlovák',
				sl	:'Szlovén',
				so	:'Szomáliai',
				es	:'Spanyol',
				su	:'Szudáni',
				sw	:'Szuahéli',
				sv	:'Svéd',
				tl	:'Tagalog',
				tg	:'Tádzsik',
				ta	:'Tamil',
				tt	:'Tatár',
				te	:'Tegulu',
				th	:'Thai',
				bo	:'Tibeti',
				ti	:'Tigrinya',
				to	:'Tonga',
				ts	:'Tsonga',
				tr	:'Török',
				tk	:'Türkmén',
				tw	:'Twi',
				uk	:'Ukrán',
				ur	:'Urdu',
				uz	:'Üzbég',
				vi	:'Vietnami',
				vo	:'Volapük',
				cy	:'Walesi',
				wo	:'Wolof',
				xh	:'Hosza',
				ji	:'Jiddis',
				yo	:'Joruba',
				zu	:'Zulu	 '
			}
		};
	
	//a html body eleme
	var test=document.querySelector('body');
	
	//ha már betöltodött a body és az osztalya global-valami alakú, akkor kinyerjük belole a nyelvet
    var talalatok=test.className.match(/global-(\w+)/) ;//["global-hu", "hu"]
    if(test&&talalatok){
		nyelv=talalatok[1]; //hu
	}

    //készítünk egy div-et, beletöltjük a paraméterben megadott html kódot
	//és visszatérünk az elso gyermekével, amit a htmlKod-ban töltünk bele
    function elkeszit(htmlKod) {
        var kulso=document.createElement('div');
        kulso.innerHTML=htmlKod;
        return kulso.firstChild;
    }
	
	//nyelv alapján betölti a megadott szöveget a tömbbol
	//kicseréli benne a helyettesítoket (pl.: %fhn%-t a felhasznalonev-re)
	//és visszaadja a szöveget végeredményül
	function szovegBetoltes(mit) {
        var kinyert;
        if (szovegek[nyelv] && szovegek[nyelv][mit]) //ha léteezik a nyelv az adatok között és a szöveg is benne amit keresünk
				kinyert=szovegek[nyelv][mit]; //akkor azt megadja
        else if (szovegek.en[mit]) //ha nem, akkor megnézi, hogy az alap szövegekben benne van-e amit keresünk
				kinyert=szovegek.en[mit]; //ha igen akkor azt adja meg
        else kinyert=mit;//ha nem, akkor a mit paramétert írja be amire rákerestünk			
		return kinyert;
    }

	//készítünk egy html elemet az elkeszit függvénnyel
	//majd a szelektora alapján megkeressük az elemet
	//ha létezik akkor
	//a keresett elem szüloje elé beszúrja a tartalmazó elemet
	//egy új divet szúr be (tartalmazoElem) a keresett szüloje és
	//a fában, a keresett elem azonos szintjén lévo ot követo csomópont közé	
	function tartalmazoElemKeszit(keresettSzelektora,osztalya){
        tartalmazoElem=elkeszit(
			'<div class="'+osztalya+'">'+
				szovegBetoltes('betolto')+
			'</div>'
		);
        var keresett=document.querySelector(keresettSzelektora);
        if(keresett)keresett.parentNode.insertBefore(tartalmazoElem, keresett.nextSibling);
    }
	
	 //az AJAx-tól itt kapjuk meg a valaszt
	function visszacsatolas(valasz){ //a saját szótáram rekurzívan kinyerve
		try{
			var adat=JSON.parse(valasz.responseText);	//a valaszban lévo JSON-kód tömb
			
			var aktualis=adat.vocab.map(
				function(szo){
					return szo['forms_data'].map(
						function(urlap){
							return [urlap['surface_form'], urlap['skill']['language'], urlap['pos_key'], urlap['skill']['short'], urlap['strength'].toFixed(8)];
						});
				});
			
			szavak=szavak.concat.apply(szavak,aktualis);
			szavakszama+=adat.vocab.length; //ebben még duplikálás van
			
			if(adat.vocab.length==0){
				if(szavak.length>0){
					szavak=szavak.filter(
						function(el,i,a){
							if(i==a.indexOf(el)) return 1;
						return 0}
					);
								
					//halmazzá alakítjuk, hogy minden csak egyszer szerepeljen benne és összefuzzük sztirnggé
					
					//var osszefuz='';
					$.each(szavak, function(i, el){
						if($.inArray(el[0], egyedi) === -1){
							egyedi.push(el[0]);
							szohalmaz.push(el);
							//osszefuz+=el[0]+'+';
						}
					});
					
					var osszefuzesek=[];
					var hanyszor=Math.floor(egyedi.length/10);
					var maradek=egyedi.length%10;
					for(i=0;i<hanyszor;i++){
						osszefuzesek[i]='';
						for(var j=0; j<10; j++){
							osszefuzesek[i]+=egyedi[i*10+j]+"+";							
						}
						osszefuzesek[i]=osszefuzesek[i].slice(0,-1);
					}
					if(maradek>0){
						osszefuzesek[hanyszor]='';
						for(i=0;i<maradek;i++){						
							osszefuzesek[hanyszor]+=egyedi[hanyszor*10+i]+"+";
						}
						osszefuzesek[hanyszor]=osszefuzesek[hanyszor].slice(0,-1);
					}					
									
					nyelv2=szohalmaz[0][1]; //az elso elem nyelve a nyelv
					
					egyedi=[];	
					osszeslekeres=osszefuzesek.length;
					for(i=0;i<osszeslekeres;i++){
						ajaxKeres("http://d.duolingo.com/words/hints/"+nyelv2+"/"+nyelv+"?format=new&sentence="+osszefuzesek[i]+"&cache=true&_="+(new Date().getTime()),visszacsatolas2);
					}									
				} else {
					tartalmazoElem.innerHTML=szovegBetoltes('nemvolt');
				}
			} else {
				tartalmazoElem.innerHTML=szovegBetoltes('szazalek')+Math.round(100*szavakszama/adat.vocab_count)+"%";
				ajaxKeres("http://www.duolingo.com/words?page="+(adat.page+1)+"&sort_by=word&desc=false&_="+(new Date().getTime()),visszacsatolas);
			}
        } catch(e){ //hiba esetén kiírjuk a log-ba
			console.log('Hiba!');
            console.log(e.message);
            if(e.stack) console.log(e.stack);
		}
	}
	
	function visszacsatolas2(valasz){ //a jelentések
		try{
			var adat=JSON.parse(valasz.responseText);
			
			//magyar értékek kiszurése egy asszociációs tömbbe
			//amelynek kulcsai az angol szava
			//és hozzájuk egy tömb tartozik a magyar jelentésekkel	
			for(i=0;i<adat.tokens.length;i++){
				if(adat.tokens[i]['hint_table']!=null){
					//hogy a length foglalt szóra ne akadjon ki kulcsként
					//és azért végére írom a cz-t, hogy az abc sorrendet ne szúrja el
					var bovitett=adat.tokens[i].value+'cz';
					egyedi[bovitett]=[];
					for(j=0;j<adat.tokens[i]['hint_table']['rows'].length;j++){					
						for(z=0;z<adat.tokens[i]['hint_table']['rows'][j]['cells'].length;z++)
							if(adat.tokens[i]['hint_table']['rows'][j]['cells'][z]['hint'])
								egyedi[bovitett].push(adat.tokens[i]['hint_table']['rows'][j]['cells'][z]['hint']);
					}
				};
			}

			lekereseddig++;
			if(lekereseddig==osszeslekeres) vegezetul();
			
		} catch(e){ //hiba esetén kiírjuk a log-ba
			console.log('Hiba!');
            console.log(e.message);
            if(e.stack) console.log(e.stack);
		}
	}
	
	function vegezetul(){
		//többszöri magyar értékek kiszurése
		for (var kulcs in egyedi){		
			var seged=[];
			$.each(egyedi[kulcs], function(i, el){
				if($.inArray(el, seged) === -1) seged.push(el);
			});
			egyedi[kulcs]=seged;
		}
		
		//szótár elkészítése				
		htmlke+='<table class="szotartabla" border="1px black">'+
				'<tr><th>'+szovegBetoltes(nyelv2)+'</th><th>'+szovegBetoltes(nyelv)+'</th></tr>';
		for (var kulcs in egyedi){
			htmlke+='<tr>';				
			var javitott=kulcs.slice(0,-2); //levágjuk a CZ-t, amit beraktunk, hogy ne okozzon hibát a length foglalt szó
			if(egyedi[kulcs].length<=1){
				htmlke+='<td>'+javitott+'</td><td>'+egyedi[kulcs][0]+'</td>';
				htmlke+='</tr>';
			} else {
				htmlke+='<td rowspan="'+egyedi[kulcs].length+'">'+javitott+'</td><td>'+egyedi[kulcs][0]+'</td>';
				htmlke+='</tr>';
				for(i=1;i<egyedi[kulcs].length;i++)
					htmlke+='<tr><td>'+egyedi[kulcs][i]+'</td></tr>';
			}									
		}
		htmlke+='</table>';
		
		//kiürítjük a tartalmazo elembol a betöltés feliratot
		tartalmazoElem.innerHTML='';
		tartalmazoElem.appendChild(elkeszit(
		'<iframe id="nyomtatni"></iframe>'));
			//$('#nyomtatni').contents().find('body').innerHTML='KAKA';
			//$('#nyomtatni').contents().find('body').append(elkeszit(htmlke));
			//itt kéne a nyomtatni div-be másolni a táblázatot
				//de a FF hibás ezért rá kell rakni egy gombnyomásra
		
		tartalmazoElem.appendChild(elkeszit(
		'<a id="szotarkibe" class="btn btn-primary btn-block btn-lg" href="javascript:;">'+szovegBetoltes('szotar')+'</a>'));
		tartalmazoElem.appendChild(elkeszit(
		'<a id="nyomtatas" class="btn btn-primary btn-block btn-lg" href="javascript:;">'+szovegBetoltes('nyomtatas')+'</a>'));
		tartalmazoElem.appendChild(elkeszit(htmlke));

		$('#nyomtatni').hide(); //frame
		$('.szotartabla').hide();
		$('#nyomtatas').hide(); //gomb
		
		$('#szotarkibe').click(
			function(){
				//ide került a nyomtatni div urítése és feltöltése
				$('#nyomtatni').contents().find('body').innerHTML='';
				$('#nyomtatni').contents().find('body').append(elkeszit(htmlke));
				kattintas(1);
			}
		);
		
		$('#nyomtatas').click(
			function(){
				kattintas2();
			}
		);
	}
	
	function kattintas(szov){
		if(szov==1){
			$('#szotarkibe').text(szovegBetoltes('elrejtes'));
			$('#szotarkibe').click(
				function(){
					kattintas(0);
				}
			);
			
			//kinézetváltás
			$('#szotarkibe').removeClass("btn-primary");
			$('#szotarkibe').addClass("btn-standard");
			
			$('.szotartabla').show();
            $('#nyomtatas').show();
		}else{
			$('#szotarkibe').text(szovegBetoltes('szotar'));
			$('#szotarkibe').click(
				function(){
					kattintas(1);
				}
			);
			
			//kinézetváltás
			$('#szotarkibe').removeClass("btn-standard");
			$('#szotarkibe').addClass("btn-primary");
			
			$('.szotartabla').hide();
            $('#nyomtatas').hide();
		}
	}
	
    function kattintas2(){	
        $('#nyomtatni').get(0).contentWindow.print();
    }
    
	function ajaxKeres(url,cb){
		GM_xmlhttpRequest({
			method: "GET",
			url:	url, //lekérjük a felhasználó adatlapját
			onload:	cb
		});
	}

	function mukodj(){
		if (typeof jQuery === "function") {
			//ezzel ellenörzöm, hogy készen áll-e már az oldal
			//ha már létezik az elem, csak akkor folytatódik, egyébként kilép
			if(document.querySelector('.szotar')){return;}	
			
			//ha egy másik fülre kattint majd vissza, akkor újra nyerje ki a szólistát
			//ne az eddigiekhez adja hozzá
			szavak=[];
			szohalmaz=[];
            egyedi=[];
			szavakszama=0;
			osszeslekeres=0;
			lekereseddig=0;
			htmlke='';
			
			//ebbol az elembol tudjuk meg, hogy melyik oldalon vagyunk
			//ha még nem áll készen akkor kilépünk (az idozítés miatt újra próbálkozik)
			var app=document.querySelector('#app');
			if(!app){return;}
			
			if(app.className.match(/\bhome\b/)){ //ha a fooldalon lapon vagyunk			
				//a megadott elembe elkészítjük az új divünket a betöltés felirattal
				tartalmazoElemKeszit('#app .sidebar-progress','szotar');
				
				//kérés a szerverhez amiben lekérjük az adatait
				ajaxKeres("http://www.duolingo.com/words?page=1&sort_by=word&desc=false&_="+(new Date().getTime()),visszacsatolas);
			}
		} else {
			jQueryBetolto("1.9.1");
		}
	}
	
	function jQueryBetolto(verzio) {
		var jqVersion   = verzio || "1.7.2";
		var D           = document;
		var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
		var scriptNode  = D.createElement ('script');
		scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
						+ jqVersion
						+ '/jquery.min.js';
		targ.appendChild (scriptNode);
	}	
	

    
	//az oldal AJAXot használ oldalváltáshoz, ettol kezdve 2 másodpercenként elindul a "mukodj"
	//1mp-el az oldal betöltodése után, ha gyorsabban betöltodne
	//azonnali betöltodés (ha véletlenül készen állna rá az odal már az elején)
	window.setInterval(mukodj,2000);
    window.setTimeout(mukodj,1000);
    mukodj();
})();
scr_meta=<><![CDATA[
// ==UserScript==
// @name           Eaten by Ants
// @namespace      http://userscripts.org/scripts/show/66633
// @description    Hilfestellung für Eaten By Ants
// @include        http://*.eatenbyants.de/*
// @author         derboss
// @info           Hilfestellung für Eaten By Ants
// @version        1.1.18
// ==/UserScript==
]]></>.toString();

var Daten_Ameisen = {
	'Camponotus herculeanus'	: ['Monogyn', 10000	  , 0.4   , 0.4   , 'Einheimische'  , 'Protein' , 0    ],
	'Camponotus ligniperda'		: ['Monogyn', 10000	  , 0.4   , 0.4   , 'Einheimische'  , 'Protein' , 0    ],
	'Formica fusca'				: ['Polygyn', 5000	  , 0.2   , 0.2   , 'Einheimische'  , 'Protein' , 2000 ],
	'Lasius emarginatus'		: ['Monogyn', 50000	  , 0.1   , 0.11  , 'Einheimische'  , 'Protein' , 0    ],
	'Lasius flavus'				: ['Monogyn', 100000  , 0.1   , 0.02  , 'Einheimische'  , 'Protein' , 0    ],
	'Lasius niger'				: ['Monogyn', 50000	  , 0.1   , 0.15  , 'Einheimische'  , 'Protein' , 0    ],
	'Myrmica rubra'				: ['Polygyn', 20000	  , 0.15  , 0.2   , 'Einheimische'  , 'Protein' , 5000 ],
	'Myrmica ruginodis'			: ['Polygyn', 100000  , 0.2   , 0.2   , 'Einheimische'  , 'Protein' , 10000],
	'Temnothorax nylanderi'		: ['Monogyn', 250	  , 0.05  , 0.1   , 'Einheimische'  , 'Protein' , 0    ],
	'Solenopsis fugax'			: ['Monogyn', 250000  , 0.07  , 0.1   , 'Einheimische'  , 'Protein' , 0    ],
	'Lasius fuliginosus'		: ['Polygyn', 1000000 , 0.1   , 0.11  , 'Einheimische'  , 'Protein' , 0    ],
	'Formica sanguinea'			: ['Polygyn', 10000	  , 0.3   , 0.3   , 'Einheimische'  , 'Protein' , 2000 ],
	'Ponera coarctata'			: ['Polygyn', 125	  , 0.05  , 0.1   , 'Einheimische'  , 'Protein' , 150  ],
	'Messor barbarus'			: ['Monogyn', 100000  , 0.4   , 0.4   , 'Südeuropäische', 'Korn'    , 0    ],
	'Messor structor'			: ['Polygyn', 100000  , 0.35  , 0.35  , 'Südeuropäische', 'Korn'    , 10000],
	'Anochetus ghilianii'		: ['Monogyn', 100	  , 0.12  , 0.12  , 'Südeuropäische', 'Protein' , 0    ],
	'Pheidole pallidula'		: ['Monogyn', 250000  , 0.1   , 0.2   , 'Südeuropäische', 'Protein' , 0    ],
	'Aphaenogaster senilis'		: ['Monogyn', 10000	  , 0.3   , 0.3   , 'Südeuropäische', 'Protein' , 0    ],
	'Camponotus cruentatus'		: ['Monogyn', 100000  , 0.45  , 0.45  , 'Südeuropäische', 'Protein' , 0    ],
	'Cataglyphis velox'			: ['Polygyn', 10000   , 0.4   , 0.6   , 'Südeuropäische', 'Protein' , 5000 ],
	'Plagiolepis pygmaea'		: ['Polygyn', 500000  , 0.025 , 0.025 , 'Südeuropäische', 'Protein' , 100000    ],
	'Lasius grandis'			: ['Monogyn', 100000  , 0.1   , 0.09  , 'Südeuropäische', 'Protein' , 0    ],
	'Crematogaster scutellaris'	: ['Monogyn', 100000  , 0.1   , 0.2   , 'Südeuropäische', 'Protein' , 0    ],
	'Acromyrmex spec.'			: ['Monogyn', 100000  , 0.55  , 0.45  , 'Exotische'     , 'Blatt'   , 0    ],
	'Acromyrmex versicolor'		: ['Polygyn', 100000  , 0.55  , 0.45  , 'Exotische'     , 'Blatt'   , 20000],
	'Messor alexandri'			: ['Monogyn', 100000  , 0.4   , 0.4   , 'Exotische'     , 'Korn'    , 0    ],
	'Camponotus substitutus'	: ['Monogyn', 80000	  , 0.45  , 0.45  , 'Exotische'     , 'Protein' , 0    ],
	'Polyrhachis dives'			: ['Polygyn', 100000  , 0.3   , 0.5   , 'Exotische'     , 'Protein' , 10000],
	'Myrmecia pavida'			: ['Monogyn', 1000	  , 0.3   , 0.5   , 'Exotische'     , 'Protein' , 0    ],
	'Pheidologeton diversus'	: ['Polygyn', 100000  , 0.3   , 0.4   , 'Exotische'     , 'Protein' , 25000],
	'Myrmecocystus mexicanus'	: ['Monogyn', 120000  , 0.3   , 0.5   , 'Exotische'     , 'Protein' , 0    ],
	'Myrmecia chrysogaster'		: ['Monogyn', 1000	  , 0.3   , 0.4   , 'Exotische'     , 'Protein' , 0    ],
	'Camponotus sericeus'		: ['Monogyn', 50000	  , 0.6   , 0.6   , 'Exotische'     , 'Protein' , 0    ],
	'Marsameise'				: ['Monogyn', 500	  , 0.4   , 0.4   , 'Sonder'        , 'Protein' , 0    ],
};
var Daten_Futter = {
	//  Sorte                       Futter   , ZRate,VRate, F-ID
	'Mehlwürmer'				: ['Protein' , 1.2  , 0.3 , 401 ],
	'Maden'						: ['Protein' , 1.1  , 0   , 402 ],
	'Grashüpfer'				: ['Protein' , 0.95 , 0   , 403 ],
	'Baumwanzen'				: ['Protein' , 0.75 , 0   , 404 ],
	'Regenwürmer'				: ['Protein' , 0.85 , 0   , 405 ],
	'Käferlarven'				: ['Protein' , 0.65 , 0   , 406 ],
	'Waldschaben'				: ['Protein' , 2.5  , 0.6 , 407 ],
	'Heimchen'					: ['Protein' , 1.75 , 0.45, 408 ],
	'Osterei'					: ['Protein' , 0,5  , 0   , 409 ],
	'Grassamen'					: ['Körner'  , 0.3  , 0   , 411 ],		
	'Löwenzahnsamen'			: ['Körner'  , 0.5  , 0   , 412 ],
	'Brombeerblätter'			: ['Blätter' , 2    , 0   , 421 ],
	'Zuckerwasser'				: ['Zucker'  , 0.7  , 0   , 451 ],
	'Honig'						: ['Zucker'  , 0.3  , 0   , 452 ],
	'gemixtes Zuckerwasser'		: ['Zucker'  , 0.6  , 0   , 453 ],
}
var Daten_Zubehör = {
	//	Nester
	'Haselnuss'                 : ['Nest'  , 1000   ],
	'Reagenzglas'				: ['Nest'  , 10     ],
	'kleines Nest'				: ['Nest'  , 100    ],
	'mittleres Nest'			: ['Nest'  , 500    ],
	'großes Nest'				: ['Nest'  , 2500   ],
	'mittleres YTong Nest'		: ['Nest'  , 15000  ],
	'großes YTong Nest'			: ['Nest'  , 100000 ],
	'riesiges YTong Nest'		: ['Nest'  , 200000 ],
	//	Formis
	'Mini Arena'				: ['Formi' , 30     ],
	'kleines Formicarium'		: ['Formi' , 100    ],
	'mittleres Formicarium'		: ['Formi' , 500    ],
	'großes Formicarium'		: ['Formi' , 2500   ],
	'mittlere Anlage'			: ['Formi' , 15000  ],
	'große Anlage'				: ['Formi' , 100000 ],
	'riesige Anlage'			: ['Formi' , 200000 ],
}

//	Wenn der Vorschlag nicht Vorhanden ist geht er nach ABC vor. Und nicht die Letzte Fütterung.
var VorschlagFutterOn= false;	//	Futter Vorschlagen		
var VorschlagProtein = 407;		//	Mehlwürmer
var VorschlagKörner  = 412;		//	Löwenzahnsamen
var VorschlagBlätter = 421;		//	Brombeerblätter
var VorschlagZucker  = 453;		//	gemixtes Zuckerwasser

///////////////////////////////////////////
//                                       //
//  Ab hier keine Änderungen mehr Nötig  //
//                                       //
///////////////////////////////////////////

init();
mainmenu();
main();

function main(){
	var adr = document.location.href;
	var Error = document.getElementById("error");
	var cat; var showInfoFutterErrorAbfangen2;
	mylog("main, page=" + adr);
	if (adr.indexOf("ameisenzimmer.php") != -1){
		if(document.getElementById("error")){
			var ErrorText = getArt(Error.innerHTML);
			if(ErrorText.search("Nicht genug") != -1){adr = adr + "&cat=9";}
			if(ErrorText.search("gefüttert") != -1){
				adr = adr + "&cat=9";
				if (showInfoFutterErrorAbfangen){
					showInfoFutterErrorAbfangen2 = true;
					var ErrorDiv = document.getElementById("main").getElementsByTagName("div")[3];
					ErrorDiv.style.display = "none";
					var ErrorDivKurz =  document.getElementById("main").getElementsByTagName("div")[0].innerHTML;
					ErrorDivKurzNeu = ErrorDivKurz.replace('<br><br><center><div',"<center><div");
					ErrorDivKurzNeu = ErrorDivKurzNeu.replace('</div></center><br>',"</div></center>");
					document.getElementById("main").getElementsByTagName("div")[0].innerHTML = ErrorDivKurzNeu;
				}
			}
		}
		if (showInfoShopZuchtEnterDrehen){
			var ZuchtDIV = document.getElementById("main").getElementsByTagName("div")[3];
			var ZuchtListe = ZuchtDIV.getElementsByTagName("div") ;
			for (var i = 1; i < ZuchtListe.length; i++){
				var ZuchtTest = ZuchtListe[i].getElementsByTagName("td")[0].innerHTML;
				if (ZuchtTest.indexOf("Art ") != -1){if (ZuchtListe[i].getElementsByTagName("td")[4].innerHTML == "Anzahl: "){cat = "8";}}
			}
		}
		if (adr.indexOf("cat=1") != -1){cat = "1";}if (adr.indexOf("cat=2") != -1){	cat = "2";}
		if (adr.indexOf("cat=3") != -1){cat = "3";}if (adr.indexOf("cat=4") != -1){	cat = "4";}
		if (adr.indexOf("cat=5") != -1){cat = "5";}if (adr.indexOf("cat=6") != -1){	cat = "6";}
		if (adr.indexOf("cat=7") != -1){cat = "7";}if (adr.indexOf("cat=8") != -1){	cat = "8";}
		if (adr.indexOf("cat=9") != -1){cat = "9";}
		switch (cat) {
			case "9":
				mylog("main, Ameisenzimmer Formicarium Detail");
				var Formicarium = document.getElementById("main").getElementsByTagName("h3")[0];
				var FormicariumArt = getArt(Formicarium.innerHTML);
				var Ameisen_Info  = Daten_Ameisen[FormicariumArt];
				Formicarium.innerHTML = Formicarium.innerHTML + " <font color=red>(" + Ameisen_Info[0] + ")</font> ";
				var ShopItemNest = document.getElementById("main").getElementsByTagName("td")[19];
				var ShopItemNestArt = ShopItemNest.innerHTML;
				for (var i = 5; i < 20 ; i++){
					var FutterDIV = document.getElementsByTagName("div")[i];var FutterDIVTest = FutterDIV.getElementsByTagName("b")[0];
					if(FutterDIVTest != undefined){if(FutterDIVTest.innerHTML == "Futter"){var FutterDIVNr = i;if(showInfoOrginalFutterOff){FutterDIV.style.display = "none";}}}
				}
				FutterDetail = document.getElementById("shopitem");
				FutterGebenZ = document.getElementsByTagName("form")[0];
				FutterGebenZInhalt = FutterGebenZ.innerHTML;
				FutterGebenP = document.getElementsByTagName("form")[1];
				FutterGebenPInhalt = FutterGebenP.innerHTML;
				FutterDetailTbl1 = FutterDetail.getElementsByTagName("tbody")[1];
				FutterDetailTbl2 = FutterDetail.getElementsByTagName("tbody")[2];
				JetztKöniginnen = FutterDetailTbl1.getElementsByTagName("td")[1].innerHTML;
				JetztArbeiter = FutterDetailTbl1.getElementsByTagName("td")[3].innerHTML;
				JetztEier = FutterDetailTbl1.getElementsByTagName("td")[5].innerHTML;
				JetztLarven  = FutterDetailTbl1.getElementsByTagName("td")[7].innerHTML;
				JetztPuppen  = FutterDetailTbl1.getElementsByTagName("td")[9].innerHTML;
				JetztPunte1  = FutterDetailTbl2.getElementsByTagName("td")[0].innerHTML;
				JetztPunte2  = FutterDetailTbl2.getElementsByTagName("td")[1].innerHTML;
				JetztNest    = FutterDetailTbl2.getElementsByTagName("td")[3].innerHTML;
				NestPlatz    = runden(Daten_Zubehör[JetztNest][1] / Daten_Ameisen[FormicariumArt][2]);
				JetztFormi   = FutterDetailTbl2.getElementsByTagName("td")[5].innerHTML;
				FormiPlatz   = runden(Daten_Zubehör[JetztFormi][1] / Daten_Ameisen[FormicariumArt][3]);
				JetztHunger1 = FutterDetailTbl2.getElementsByTagName("td")[6].innerHTML.replace('Hunger ','');
				JetztHunger1 = JetztHunger1.replace('Körnervorrat:','(Körner):');
				JetztHunger2 = FutterDetailTbl2.getElementsByTagName("td")[7].innerHTML;
				JetztHunger3 = FutterDetailTbl2.getElementsByTagName("td")[8].innerHTML.replace('Hunger ','');
				JetztHunger4 = FutterDetailTbl2.getElementsByTagName("td")[9].innerHTML;
				JetztKolonie = parseInt(JetztArbeiter) + parseInt(JetztLarven) + parseInt(JetztPuppen);
				if (JetztKöniginnen >= 2){
					KöniginnenPlus = (JetztKöniginnen-1) * Daten_Ameisen[FormicariumArt][6];
					MaxGröße = Daten_Ameisen[FormicariumArt][1] + KöniginnenPlus;
				}else MaxGröße = Daten_Ameisen[FormicariumArt][1];
				VorschlagNestPlatz  = MaxGröße * Daten_Ameisen[FormicariumArt][2];
				VorschlagFormiPlatz = MaxGröße * Daten_Ameisen[FormicariumArt][3];
				if (VorschlagNestPlatz <= 10){VorschlagNest = 'Reagenzglas';
					}else if (VorschlagNestPlatz <= 100)   {VorschlagNest = 'kleines Nest';
					}else if (VorschlagNestPlatz <= 500)   {VorschlagNest = 'mittleres Nest';
					}else if (VorschlagNestPlatz <= 2500)  {VorschlagNest = 'großes Nest';
					}else if (VorschlagNestPlatz <= 15000) {VorschlagNest = 'mittleres YTong Nest';
					}else if (VorschlagNestPlatz <= 100000){VorschlagNest = 'großes YTong Nest';
					}else if (VorschlagNestPlatz <= 200000){VorschlagNest = 'riesiges YTong Nest';
				}
				if (JetztNest == 'Haselnuss'){VorschlagNest = 'Haselnuss';}
				if (FormicariumArt == 'Acromyrmex spec.' || FormicariumArt == 'Acromyrmex versicolor' || FormicariumArt == 'Polyrhachis dives'){
					if (VorschlagNestPlatz <= 30){VorschlagNest = 'Mini Arena';
						}else if (VorschlagNestPlatz <= 100)   {VorschlagNest = 'kleines Formicarium';
						}else if (VorschlagNestPlatz <= 500)   {VorschlagNest = 'mittleres Formicarium';
						}else if (VorschlagNestPlatz <= 2500)  {VorschlagNest = 'großes Formicarium';
						}else if (VorschlagNestPlatz <= 15000) {VorschlagNest = 'mittlere Anlage';
						}else if (VorschlagNestPlatz <= 100000){VorschlagNest = 'große Anlage';
						}else if (VorschlagNestPlatz <= 200000){VorschlagNest = 'riesige Anlage';
					}
				}
				if (NestPlatz >= VorschlagNestPlatz / Daten_Ameisen[FormicariumArt][2]){NestBerechnungFarbe = "green";}else{NestBerechnungFarbe = "red";}
				if (VorschlagFormiPlatz <= 30){VorschlagFormi = 'Mini Arena';
					}else if (VorschlagFormiPlatz <= 100)   {VorschlagFormi = 'kleines Formicarium';
					}else if (VorschlagFormiPlatz <= 500)   {VorschlagFormi = 'mittleres Formicarium';
					}else if (VorschlagFormiPlatz <= 2500)  {VorschlagFormi = 'großes Formicarium';
					}else if (VorschlagFormiPlatz <= 15000) {VorschlagFormi = 'mittlere Anlage';
					}else if (VorschlagFormiPlatz <= 100000){VorschlagFormi = 'große Anlage';
					}else if (VorschlagFormiPlatz <= 200000){VorschlagFormi = 'riesige Anlage';
				}
				if(FormiPlatz >= VorschlagFormiPlatz / Daten_Ameisen[FormicariumArt][3]){FormiBerechnungFarbe = "green";}else{FormiBerechnungFarbe = "red";}
				NestTT  = '<a class="tooltip" href="#"><font color="'+NestBerechnungFarbe+'">'+JetztNest+'</font><span><table width="100%" border="0">';
				NestTT += '<tr><td>Arbeiter Max:</td> <td>&nbsp;</td><td>'+formatZahl(Daten_Ameisen[FormicariumArt][1])+'</td></tr>';
				if (JetztKöniginnen >= 2){NestTT += '<tr><td>Königinnen:</td><td>'+JetztKöniginnen+' *</td><td>'+formatZahl(KöniginnenPlus)+'</td></tr>';}
				if (JetztKöniginnen >= 2){NestTT += '<tr><td>Zusammen:</td><td>&nbsp;</td><td><b>'+formatZahl(MaxGröße)+'</b></td></tr>';}
				NestTT += '<tr><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td></tr>';
				NestTT += '<tr><td colspan="3">Vorschlag für Nest:</td></tr>';
				NestTT += '<tr><td colspan="3"><b>'+VorschlagNest+'</b></td></tr>';
				NestTT += '<tr><td>Platz:</td> <td>&nbsp;</td><td>'+formatZahl(runden(Daten_Zubehör[VorschlagNest][1]/Daten_Ameisen[FormicariumArt][2]))+'</td></tr>';
				NestTT += '</table></span></a>' ;
				FormiTT  = '<a class="tooltip" href="#"><font color="'+FormiBerechnungFarbe+'">'+JetztFormi+'</font><span><table width="100%" border="0">';
				FormiTT += '<tr><td>Arbeiter Max:</td> <td>&nbsp;</td><td>'+formatZahl(Daten_Ameisen[FormicariumArt][1])+'</td></tr>';
				if (JetztKöniginnen >= 2){FormiTT += '<tr><td>Königinnen:</td><td>'+JetztKöniginnen+' *</td><td>'+formatZahl(KöniginnenPlus)+'</td></tr>';}
				if (JetztKöniginnen >= 2){FormiTT += '<tr><td>Zusammen:</td><td>&nbsp;</td><td><b>'+formatZahl(MaxGröße)+'</b></td></tr>';}
				FormiTT += '<tr><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td></tr>';
				FormiTT += '<tr><td colspan="3">Vorschlag für Formicarium:</td></tr>';
				FormiTT += '<tr><td colspan="3"><b>'+VorschlagFormi+'</b></td></tr>';
				FormiTT += '<tr><td>Platz:</td> <td>&nbsp;</td><td>'+formatZahl(runden(Daten_Zubehör[VorschlagFormi][1]/Daten_Ameisen[FormicariumArt][3]))+'</td></tr>';
				FormiTT += '</table></span></a>' ;
				FutterDetailTbl1Neu  = '<tr class="color1"><td class="liste">Königinnen: </td><td class="liste" style="text-align: right;">'+JetztKöniginnen+'</td></tr>';
				FutterDetailTbl1Neu += '<tr class="color2"><td class="liste">Arbeiterinnen: </td><td style="text-align: right;" class="liste">'+formatZahl(JetztArbeiter)+'</td></tr>';
				FutterDetailTbl1Neu += '<tr class="color1"><td class="liste">Eier: </td><td style="text-align: right;" class="liste">'+formatZahl(JetztEier)+'</td></tr>';
				FutterDetailTbl1Neu += '<tr class="color2"><td class="liste">Larven: </td><td style="text-align: right;" class="liste">'+formatZahl(JetztLarven)+'</td></tr>';
				FutterDetailTbl1Neu += '<tr class="color1"><td class="liste">Puppen: </td><td style="text-align: right;" class="liste">'+formatZahl(JetztPuppen)+'</td></tr>';
				if(showInfoIBKolonieDetail){FutterDetailTbl1Neu += '<tr class="color2"><td class="liste">Kolonie: </td><td style="text-align: right;" class="liste">'+formatZahl(JetztKolonie)+'</td></tr>';}
				FutterDetailTbl2Neu  = '<tr><td style="vertical-align: middle;">'+JetztPunte1+'</td><td>'+formatZahl(JetztPunte2)+'</td></tr>';
				if(showInfoIBMaxArbeiterDetail){FutterDetailTbl2Neu += '<tr><td style="vertical-align: middle;">Max Arbeiter: </td><td>'+formatZahl(MaxGröße)+'</td></tr>';}
				FutterDetailTbl2Neu += '<tr><td style="vertical-align: middle;">Nest: </td><td>'+NestTT+'</td></tr>';
				if (showInfoIBPlatzDetail){FutterDetailTbl2Neu += '<tr><td style="vertical-align: middle;">Platz: </td><td>'+formatZahl(NestPlatz)+'</td></tr>';}
				FutterDetailTbl2Neu += '<tr><td style="vertical-align: middle;">Formicarium:&nbsp;&nbsp;&nbsp;</td><td>'+FormiTT+'</td></tr>';
				if (showInfoIBPlatzDetail){FutterDetailTbl2Neu += '<tr><td style="vertical-align: middle;">Platz: </td><td>'+formatZahl(FormiPlatz)+'</td></tr>';}
				FutterDetailTbl2Neu += '<tr><td style="vertical-align: middle;">'+JetztHunger1+'</td><td style="vertical-align: middle;">'+JetztHunger2+'</td></tr>';
				FutterDetailTbl2Neu += '<tr><td style="vertical-align: middle;">'+JetztHunger3+'</td><td style="vertical-align: middle;">'+JetztHunger4+'</td></tr>';
				FutterDetailTbl1.innerHTML = FutterDetailTbl1Neu;FutterDetailTbl2.innerHTML = FutterDetailTbl2Neu;Privat(2);
				if(showInfoIBFutter){
					if (typeof FutterGeben1InhaltMenge == 'undefined'){FutterGeben1InhaltMenge = 1;}
					if (typeof FutterGeben2InhaltMenge == 'undefined'){FutterGeben2InhaltMenge = 1;}
					if (showInfoFutterMarkieren){FutterGebenZInhalt = FutterGebenZInhalt.replace('<input value="1" name="amount" style="width: 30px; text-align: right;" type="text">','<input value="' + FutterGeben1InhaltMenge + '" onfocus="this.select()" name="amount" style="width: 30px; text-align: right;" type="text">');}
					if (VorschlagFutterOn){
						FutterGebenZInhalt = FutterGebenZInhalt.replace(' selected="selected"','');
						FutterGebenZInhalt = FutterGebenZInhalt.replace('value="'+VorschlagKörner+'"','value="'+VorschlagKörner+'" selected="selected"');
						FutterGebenZInhalt = FutterGebenZInhalt.replace('value="'+VorschlagZucker+'"','value="'+VorschlagZucker+'" selected="selected"');
					}
					Info = '<form action="/ameisenzimmer.php" method="post">'+FutterGebenZInhalt+'</form>';
					var FutterVorhandenTest = document.getElementsByTagName("div")[FutterDIVNr].getElementsByTagName("div")[0];
					var FOben1 = 0;var FUnten1 = 0;var FOben2 = 0;var FUnten2 = 0;var FOben3 = 0;var FUnten3 = 0;
					if (FutterVorhandenTest.innerHTML.indexOf("kein") != -1 && !showInfoFutterLeerTabelle){Info += '<br>';}else{
						if (!showInfoFutterLeerTabelle || FutterVorhandenTest.innerHTML.indexOf("kein") == -1 ){
							var FutterDIV = document.getElementsByTagName("div")[FutterDIVNr].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
							for (var i = 1; i < FutterDIV.length; i++){
								FArt = FutterDIV[i].getElementsByTagName("td")[0].innerHTML;
								FMenge = parseFloat(FutterDIV[i].getElementsByTagName("td")[1].innerHTML);
								FZustand = parseInt(FutterDIV[i].getElementsByTagName("td")[3].innerHTML.replace ('%',""));
								if(Daten_Futter[FArt][0] == "Zucker" || Daten_Futter[FArt][0] == "Körner"){
									if(FZustand >= 99){FOben1 = FOben1 + FMenge;}if(FZustand >= 50 && FZustand <= 98){FOben2 = FOben2 + FMenge;}if(FZustand >= 0 && FZustand <= 49){FOben3 = FOben3 + FMenge;}
								}else{
									if(FZustand >= 99){FUnten1 = FUnten1 + FMenge;}if(FZustand >= 50 && FZustand <= 98){FUnten2 = FUnten2 + FMenge;}if(FZustand >= 0 && FZustand <= 49){FUnten3 = FUnten3 + FMenge;}
								}
							}
						}
						if(showInfoIBFutterDetail){
							Info += '<table width="240" border="0">';
							Info += '<tr><td><font color=green>&nbsp; 99% bis 100%</font></td><td>&nbsp; ' + FOben1.toFixed(2).replace('.',',') + '</td><td>&nbsp; Gramm</td></tr>';
							Info += '<tr><td><font color=yellow>&nbsp; 50% bis&nbsp; 98%</td><td>&nbsp; ' + FOben2.toFixed(2).replace('.',',') + '</td><td>&nbsp; Gramm</td></tr>';
							Info += '<tr><td><font color=red>&nbsp;&nbsp;&nbsp; 0% bis&nbsp; 49%</td><td>&nbsp; ' + FOben3.toFixed(2).replace('.',',') + '</td><td>&nbsp; Gramm</td></tr>';
							Info += '</table>';
						}
					}
					if (showInfoFutterMarkieren){FutterGebenPInhalt = FutterGebenPInhalt.replace('<input value="1" name="amount" style="width: 30px; text-align: right;" type="text">','<input value="' + FutterGeben2InhaltMenge + '" onfocus="this.select()" name="amount" style="width: 30px; text-align: right;" type="text">');}
					if (VorschlagFutterOn){
						FutterGebenPInhalt = FutterGebenPInhalt.replace(' selected="selected"','');
						FutterGebenPInhalt = FutterGebenPInhalt.replace('value="'+VorschlagProtein+'"','value="'+VorschlagProtein+'" selected="selected"');
						FutterGebenPInhalt = FutterGebenPInhalt.replace('value="'+VorschlagBlätter+'"','value="'+VorschlagBlätter+'" selected="selected"');
					}
					Info += '<form action="/ameisenzimmer.php" method="post">'+FutterGebenPInhalt+'</form>';
					if(showInfoIBFutterDetail){
						if (FutterVorhandenTest.innerHTML.indexOf("kein") != -1 && !showInfoFutterLeerTabelle){Info += '<br><div id="FutterPlatzhalter">Momentan liegt kein Futter im Formicarium</div>';}else{
							Info += '<table width="240" border="0">';
							Info += '<tr><td><font color=green>&nbsp; 99% bis 100%</font></td><td>&nbsp; ' + FUnten1.toFixed(2).replace('.',',') + '</td><td>&nbsp; Gramm</td></tr>';
							Info += '<tr><td><font color=yellow>&nbsp; 50% bis 98%</td><td>&nbsp; ' + FUnten2.toFixed(2).replace('.',',') + '</td><td>&nbsp; Gramm</td></tr>';
							Info += '<tr><td><font color=red>&nbsp;&nbsp;&nbsp; 0% bis 49%</td><td>&nbsp; ' + FUnten3.toFixed(2).replace('.',',') + '</td><td>&nbsp; Gramm</td></tr>';
							Info += '</table>';
							if (showInfoFutterErrorAbfangen && showInfoFutterErrorAbfangen2){Info += '<br><a tooltip="linkalert-tip" href="javascript:togglefutter();"><font tooltip="linkalert-tip" color="yellow">' + ErrorDiv.innerHTML + '</font></a>';}else{
								Info += '<br><a tooltip="linkalert-tip" href="javascript:togglefutter();"><font tooltip="linkalert-tip" color="white">Futterliste Zeigen</font></a>';
							}
							Info += '<div id="FutterPlatzhalter"></div>';
						}
						Info += '<br>';
					}
				}else Info = "";

				Info += '</center></div>';
				FutterDetail.innerHTML = FutterDetail.innerHTML + Info;
				if(showInfoIBFutterDetail){
					var FutterEinblenden = document.getElementById("FutterPlatzhalter");
					var D = FutterNeuAnzeigen();
					if (D != ""){FutterEinblenden.parentNode.insertBefore(D,FutterEinblenden.nextSibling);}
				}
			break;
			case "8":
				mylog("main, Ameisenzimmer - Futtertierzucht");
				if (showInfoShopZuchtEnterDrehen){
					var ZuchtDIV = document.getElementById("main").getElementsByTagName("div")[3];
					var ZuchtListe = ZuchtDIV.getElementsByTagName("div") ;
					for (var i = 0; i < ZuchtListe.length; i++){
						var ZuchtTest = ZuchtListe[i].getElementsByTagName("td")[0].innerHTML;
						if (ZuchtTest == "Art "){
							var FormInhalt = ZuchtListe[i].getElementsByTagName("form")[0].innerHTML;
							var FormInhaltNeu = FormInhalt.replace('<input name=\"add\" value=\"+\" type=\"submit\">','defaultenterja');
							var FormInhaltNeu = FormInhaltNeu.replace('<input name=\"remove\" value=\"-\" type=\"submit\">','defaultenternein');
							var FormInhaltNeu = FormInhaltNeu.replace('defaultenterja'  ,'<input name=\"remove\" value=\"-\" type=\"submit\">');
							var FormInhaltNeu = FormInhaltNeu.replace('defaultenternein','<input name=\"add\" value=\"+\" type=\"submit\">');
							var FormInhaltNeu = FormInhaltNeu.replace('name="amount"','name="amount" onfocus="this.select()"');
							ZuchtListe[i].getElementsByTagName("form")[0].innerHTML = FormInhaltNeu;
						}
					}
				}
				Privat(3);
			break;
			case "7":
				mylog("main, Ameisenzimmer - Frei");
			break;
			case "6":
				mylog("main, Ameisenzimmer - Frei");
			break;
			case "5":
				mylog("main, Ameisenzimmer - Aktion");
				putAktionEnde()
			break;
			case "4":
				mylog("main, Ameisenzimmer - Möbel");
			break;
			case "3":
				mylog("main, Ameisenzimmer - Ereignisse");
			break;
			case "2":
				mylog("main, Ameisenzimmer - Lager");
				var LagerDIV = document.getElementById("main").getElementsByTagName("div")[3];
				AmeisenTabelle		= LagerDIV.getElementsByTagName("tbody")[0];
				FutterTabelle		= LagerDIV.getElementsByTagName("tbody")[1];
				ZubehoerTabelle		= LagerDIV.getElementsByTagName("tbody")[2];
				FormiNestTabelle	= LagerDIV.getElementsByTagName("tbody")[3];
				MoebelTabelle		= LagerDIV.getElementsByTagName("tbody")[4];
			break;
			case "1":
			default:
				mytest("main, Ameisenzimmer - Formicarium Übersicht");
				if (showInfoUebersicht){
					Formicarium = document.evaluate('//div[@id="shopitem"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					for (var i = 0; i < Formicarium.snapshotLength; i++) {
						FormicariumInner = Formicarium.snapshotItem(i);
						if (FormicariumInner.getElementsByTagName("a")[0].innerHTML != "neues Formicarium einrichten"){
							Art = FormicariumInner.getElementsByTagName("td")[14].getElementsByTagName("b")[0];
							ArtLand = Daten_Ameisen[Art.innerHTML][4];
							Sorte = Daten_Ameisen[Art.innerHTML][0];
							Punkte = FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[3].innerHTML;
							PunkteNeu = FormicariumInner.getElementsByTagName("table")[1];
							PunkteNeu.innerHTML = '<tr class="color2"><td class="liste">' + FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[2].innerHTML + ' </td><td style="text-align: right;" class="liste">' + formatZahl(Punkte) + '</td></tr>' + PunkteNeu.innerHTML ;
							FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[2].innerHTML = 'Kolonie max:';
							JetztNest  = FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[5];
							JetztFormi = FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[7];
							JetztKöniginnen = FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[3].innerHTML;
							if (JetztKöniginnen >= 2){KöniginnenPlus = (JetztKöniginnen-1) * Daten_Ameisen[Art.innerHTML][6];MaxGröße = formatZahl(Daten_Ameisen[Art.innerHTML][1] + KöniginnenPlus);
							}else MaxGröße = formatZahl(Daten_Ameisen[Art.innerHTML][1]);
							FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[3].innerHTML = MaxGröße;
							if (JetztKöniginnen >= 2){KöniginnenPlus = (JetztKöniginnen-1) * Daten_Ameisen[Art.innerHTML][6];MaxGröße = Daten_Ameisen[Art.innerHTML][1] + KöniginnenPlus;
							}else MaxGröße = Daten_Ameisen[Art.innerHTML][1];
							VorschlagNestPlatz  = MaxGröße * Daten_Ameisen[Art.innerHTML][2];
							VorschlagFormiPlatz = MaxGröße * Daten_Ameisen[Art.innerHTML][3];
							if (VorschlagNestPlatz <= 10){VorschlagNest = 'Reagenzglas';
								}else if (VorschlagNestPlatz <= 100)   {VorschlagNest = 'kleines Nest';
								}else if (VorschlagNestPlatz <= 500)   {VorschlagNest = 'mittleres Nest';
								}else if (VorschlagNestPlatz <= 2500)  {VorschlagNest = 'großes Nest';
								}else if (VorschlagNestPlatz <= 15000) {VorschlagNest = 'mittleres YTong Nest';
								}else if (VorschlagNestPlatz <= 100000){VorschlagNest = 'großes YTong Nest';
								}else if (VorschlagNestPlatz <= 200000){VorschlagNest = 'riesiges YTong Nest';
							}
							if (Art.innerHTML == 'Acromyrmex spec.' || Art.innerHTML == 'Acromyrmex versicolor' || Art.innerHTML == 'Polyrhachis dives'){
								if (VorschlagNestPlatz <= 30){VorschlagNest = 'Mini Arena';
									}else if (VorschlagNestPlatz <= 100)   {VorschlagNest = 'kleines Formicarium';
									}else if (VorschlagNestPlatz <= 500)   {VorschlagNest = 'mittleres Formicarium';
									}else if (VorschlagNestPlatz <= 2500)  {VorschlagNest = 'großes Formicarium';
									}else if (VorschlagNestPlatz <= 15000) {VorschlagNest = 'mittlere Anlage';
									}else if (VorschlagNestPlatz <= 100000){VorschlagNest = 'große Anlage';
									}else if (VorschlagNestPlatz <= 200000){VorschlagNest = 'riesige Anlage';
								}
							}
							if (runden(Daten_Zubehör[JetztNest.innerHTML][1]/ Daten_Ameisen[Art.innerHTML][2]) >= VorschlagNestPlatz / Daten_Ameisen[Art.innerHTML][2]){NestBerechnungFarbe = "green";}else{NestBerechnungFarbe = "red";}
							if (JetztNest.innerHTML == 'Haselnuss'){VorschlagNest = 'Haselnuss';NestBerechnungFarbe = "green";}
							if (VorschlagFormiPlatz <= 30){VorschlagFormi = 'Mini Arena';
								}else if (VorschlagFormiPlatz <= 100)   {VorschlagFormi = 'kleines Formicarium';
								}else if (VorschlagFormiPlatz <= 500)   {VorschlagFormi = 'mittleres Formicarium';
								}else if (VorschlagFormiPlatz <= 2500)  {VorschlagFormi = 'großes Formicarium';
								}else if (VorschlagFormiPlatz <= 15000) {VorschlagFormi = 'mittlere Anlage';
								}else if (VorschlagFormiPlatz <= 100000){VorschlagFormi = 'große Anlage';
								}else if (VorschlagFormiPlatz <= 200000){VorschlagFormi = 'riesige Anlage';
							}
							if(runden(Daten_Zubehör[JetztFormi.innerHTML][1]/ Daten_Ameisen[Art.innerHTML][3]) >= VorschlagFormiPlatz / Daten_Ameisen[Art.innerHTML][3]){FormiBerechnungFarbe = "green";}else{FormiBerechnungFarbe = "red";}
							NestTT  = '<a class="tooltip" href="#"><font color="'+NestBerechnungFarbe+'">'+JetztNest.innerHTML+'</font><span><table width="100%" border="0">';
							NestTT += '<tr><td>Arbeiter Max:</td> <td>&nbsp;</td><td>'+formatZahl(Daten_Ameisen[Art.innerHTML][1])+'</td></tr>';
							if (JetztKöniginnen >= 2){NestTT += '<tr><td>Königinnen:</td><td>'+JetztKöniginnen+' *</td><td>'+formatZahl(KöniginnenPlus)+'</td></tr>';}
							if (JetztKöniginnen >= 2){NestTT += '<tr><td>Zusammen:</td><td>&nbsp;</td><td><b>'+formatZahl(MaxGröße)+'</b></td></tr>';}
							NestTT += '<tr><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td></tr>';
							NestTT += '<tr><td colspan="3">Vorschlag für Nest:</td></tr>';
							NestTT += '<tr><td colspan="3"><b>'+VorschlagNest+'</b></td></tr>';
							NestTT += '<tr><td>Platz:</td> <td>&nbsp;</td><td>'+formatZahl(runden(Daten_Zubehör[VorschlagNest][1]/Daten_Ameisen[Art.innerHTML][2]))+'</td></tr>';
							NestTT += '</table></span></a>' ;
							FormiTT  = '<a class="tooltip" href="#"><font color="'+FormiBerechnungFarbe+'">'+JetztFormi.innerHTML+'</font><span><table width="100%" border="0">';
							FormiTT += '<tr><td>Arbeiter Max:</td> <td>&nbsp;</td><td>'+formatZahl(Daten_Ameisen[Art.innerHTML][1])+'</td></tr>';
							if (JetztKöniginnen >= 2){FormiTT += '<tr><td>Königinnen:</td><td>'+JetztKöniginnen+' *</td><td>'+formatZahl(KöniginnenPlus)+'</td></tr>';}
							if (JetztKöniginnen >= 2){FormiTT += '<tr><td>Zusammen:</td><td>&nbsp;</td><td><b>'+formatZahl(MaxGröße)+'</b></td></tr>';}
							FormiTT += '<tr><td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td></tr>';
							FormiTT += '<tr><td colspan="3">Vorschlag für Formicarium:</td></tr>';
							FormiTT += '<tr><td colspan="3"><b>'+VorschlagFormi+'</b></td></tr>';
							FormiTT += '<tr><td>Platz:</td> <td>&nbsp;</td><td>'+formatZahl(runden( Daten_Zubehör[VorschlagFormi][1]/Daten_Ameisen[Art.innerHTML][3]))+'</td></tr>';
							FormiTT += '</table></span></a>' ;
							FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[5].innerHTML = formatZahl(FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[5].innerHTML)
							FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[7].innerHTML = formatZahl(FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[7].innerHTML)
							FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[9].innerHTML = formatZahl(FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[9].innerHTML)
							FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[11].innerHTML = formatZahl(FormicariumInner.getElementsByTagName("table")[1].getElementsByTagName("td")[11].innerHTML)
							FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[0].innerHTML = ArtLand + ' Art:'
							if (showInfoUGynArt){
								FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[0].innerHTML = FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[0].innerHTML +  '<br><a class="tooltip" href="#">Königinnen:<span>Gibt an wieviele Königinnen eine Kolonie dieser Art haben kann.<br>monogyn: eine Königin<br>polygyn: mehrere Königinnen</span></a>';
								FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[1].innerHTML = FormicariumInner.getElementsByTagName("table")[2].getElementsByTagName("td")[1].innerHTML +  '<br>' + Sorte;
							}
							JetztNest.innerHTML = NestTT;
							JetztFormi.innerHTML = FormiTT;
						}
					}
				}
				Privat(1)
			break;
		}
	}
	if (adr.indexOf("internet.php") != -1){
		var Message = document.getElementById("message");
		var VerkaufMessage = "";
		if (showInfoKAMenuAnzeigen){
			if(document.getElementById("message")){
				MessageText = Message.innerHTML;
				if(MessageText.search("Anzeige wurde aufgegeben") != -1){
					adr = adr + "?cat=2";
					VerkaufMenge = Message.getElementsByTagName("b")[0].innerHTML;
					VerkaufPreis = Message.getElementsByTagName("b")[1].innerHTML;
					VerkaufMessage  = '<tr><td>&nbsp;&nbsp;<font color=yellow>'+VerkaufMenge+'</font></td></tr>';
					VerkaufMessage += '<tr><td>&nbsp;&nbsp;<font color=yellow>zu '+VerkaufPreis+' Angeboten.</font></td></tr>';
					Message.style.display = "none";
					Message.parentNode.removeChild(Message);
					mytest('Test, 433 =>'+adr+'\n' + VerkaufMenge + '\n' + VerkaufPreis);
				}
			}
		}
		if (adr.indexOf("internet.php?cat=1") != -1){cat = "1";}if (adr.indexOf("internet.php?cat=2") != -1){	cat = "2";}
		if (adr.indexOf("internet.php?cat=3") != -1){cat = "3";}if (adr.indexOf("internet.php?cat=4") != -1){	cat = "4";}
		if (adr.indexOf("internet.php?cat=5") != -1){cat = "5";}
		switch (cat) {
			case "1":
				mylog("main, Internet - Forschung");
				putAktionEnde();
			break;
			case "2":
				mytest("main, 431 - Internet - Kleinanzeigen");
				if (showInfoKAMenuAnzeigen){
					var Main = document.getElementById("main")
					Main.innerHTML = Main.innerHTML.replace('<br><br>','<br>');
					Main.innerHTML = Main.innerHTML.replace('Hier in den Kleinanzeigen kannst du von anderen Mitspielern Ameisen und Zubehör kaufen.<br>','<center><h3>Kleinanzeigen Übersicht</h3></center>');
					Main.innerHTML = Main.innerHTML.replace('<b>Kleinanzeigen: Sonstiges</b> (<a href="/internet.php?cat=2&amp;subcat=0&amp;action=showants">wechsel zu Ameisen</a>)<br><a href="/internet.php?cat=2&amp;subcat=1&amp;action=showitems">Futter</a>| <a href="/internet.php?cat=2&amp;subcat=2&amp;action=showitems">Zubehör</a>','');
					Main.innerHTML = Main.innerHTML.replace('<b>Kleinanzeigen: Ameisen</b> (<a href="/internet.php?cat=2&amp;subcat=0&amp;action=showitems">wechsel zu Sonstiges</a>)<br><a href="/internet.php?cat=2&amp;subcat=1&amp;action=showants">einheimische</a>| <a href="/internet.php?cat=2&amp;subcat=2&amp;action=showants">südeuropäische</a>| <a href="/internet.php?cat=2&amp;subcat=3&amp;action=showants">exotische</a>','');
					var MenuObenTest = document.getElementById("main").getElementsByTagName("div")[3].getElementsByTagName("a")[1];
					var MenuOben = document.getElementById("main").getElementsByTagName("h3")[0];
					var KleinAnzeigenDIV = document.getElementById("main").getElementsByTagName("tbody")[2].getElementsByTagName("tr");
					var A = KleinAnzeigenDIV[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
					for (var i = 1; i < KleinAnzeigenDIV.length; i++){
						if (A == 'Art'){
							KAArt	= KleinAnzeigenDIV[i].getElementsByTagName("td")[0];
							KAArtInner = KAArt.innerHTML
							if (typeof KAListe == 'undefined'){var KAListe = '<tr><td>&nbsp; <a href="#'+KAArtInner+'">'+KAArtInner+'</a></td></tr>';}
							if (KAListe.indexOf(KAArtInner) == -1){KAListe += '<tr><td>&nbsp; <a href="#'+KAArtInner+'">'+KAArtInner+'</a></td></tr>';}
							KAPreis	= KleinAnzeigenDIV[i].getElementsByTagName("td")[4];
							KAPreisInner = KAPreis.innerHTML.replace(' €','');
							KAPreisInner = parseFloat(KAPreis.innerHTML.replace('.',''));
							KAVerkaeufer = KleinAnzeigenDIV[i].getElementsByTagName("td")[5].getElementsByTagName("a")[0];
							KAVerkaeuferLang = KAVerkaeufer.innerHTML;
							KAVerkaeuferInner = KAVerkaeufer.innerHTML.substring(0,7);
							KAVerkaeufer.innerHTML = KAVerkaeuferInner;
							KAKaufen = KleinAnzeigenDIV[i].getElementsByTagName("td")[6];
							if(KAPreisInner > showInfoShopBlockenEuro && showInfoShopBlocken){
								KAKaufen.innerHTML = '<form action=/internet.php method=post><input type=submit value="Block" disabled=\"disabled\"></form>';
								KAArt.innerHTML = '<font color=red id="' + KAArtInner + '">' + KAArtInner + '</font>';
							}else{
								ConfirmText  = 'Was Kaufen:\\t'	+KleinAnzeigenDIV[i].getElementsByTagName("td")[0].innerHTML+'\\n';
								ConfirmText += 'Verkäufer:\\t'	+KAVerkaeuferLang+'\\n';
								ConfirmText += 'Preis:\\t\\t'	+KAPreis.innerHTML+'\\n';
								KAKaufen.innerHTML = KAKaufen.innerHTML.replace("<form ","<form onsubmit=\"return confirm('"+ConfirmText+"')\" ");
								KAArt.innerHTML = '<span id="' + KAArtInner + '">' + KAArtInner + '</span>';
							}
						}else{
							KAArt	= KleinAnzeigenDIV[i].getElementsByTagName("td")[0];
							KAArtInner = KAArt.innerHTML
							if (typeof KAListe == 'undefined'){var KAListe = '<tr><td>&nbsp; <a href="#'+KAArtInner+'">'+KAArtInner+'</a></td></tr>';}
							if (KAListe.indexOf(KAArtInner) == -1){KAListe += '<tr><td>&nbsp; <a href="#'+KAArtInner+'">'+KAArtInner+'</a></td></tr>';}
							KAPreis	= KleinAnzeigenDIV[i].getElementsByTagName("td")[2];
							KAPreisInner = KAPreis.innerHTML.replace(' €','');
							KAPreisInner = parseFloat(KAPreis.innerHTML.replace('.',''));
							KAVerkaeufer = KleinAnzeigenDIV[i].getElementsByTagName("td")[4].getElementsByTagName("a")[0];
							KAVerkaeuferLang = KAVerkaeufer.innerHTML;
							KAVerkaeuferInner = KAVerkaeufer.innerHTML.substring(0,9);
							KAVerkaeufer.innerHTML = KAVerkaeuferInner;
							KAKaufen = KleinAnzeigenDIV[i].getElementsByTagName("td")[5];
							if(KAPreisInner > showInfoShopBlockenEuro && showInfoShopBlocken){
								KAKaufen.innerHTML = '<form action=/internet.php method=post><input type=submit value="Block" disabled=\"disabled\"></form>';
								KAArt.innerHTML = '<font color=red>' + KAArtInner + '</font>';
							}else{
								ConfirmText  = 'Was Kaufen:\\t\\t'		+KleinAnzeigenDIV[i].getElementsByTagName("td")[0].innerHTML+'\\n';
								ConfirmText += 'Verkäufer:\\t\\t'		+KAVerkaeuferLang+'\\n';
								ConfirmText += 'Menge:\\t\\t\\t'		+formatZahl(KleinAnzeigenDIV[i].getElementsByTagName("td")[1].innerHTML)+' Stück\\n';
								ConfirmText += 'Stück Preis:\\t\\t'		+KleinAnzeigenDIV[i].getElementsByTagName("td")[3].innerHTML.replace('c','€')+'\\n';
								ConfirmText += 'Gesamt Preis:\\t\\t'	+KAPreis.innerHTML+'\\n';
								KAKaufen.innerHTML = KAKaufen.innerHTML.replace("<form ","<form onsubmit=\"return confirm('"+ConfirmText+"')\" ");
								KAArt.innerHTML = '<span id="' + KAArtInner + '">' + KAArtInner + '</span>';
							}
						}
					}
					if (typeof KAListe == 'undefined'){KAListe='<br>&nbsp;&nbsp;Keine Angebote gefunden.<br><br>';}
					ShopART1 = "<font>";ShopART2 = "<font>";ShopART3 = "<font>";ShopART4 = "<font>";ShopART5 = "<font>";
					if (adr.indexOf('subcat=1&action=showants') != -1){ShopART1 = "<font color=red>";}
					if (adr.indexOf('subcat=2&action=showants') != -1){ShopART2 = "<font color=red>";}
					if (adr.indexOf('subcat=3&action=showants') != -1){ShopART3 = "<font color=red>";}
					if (adr.indexOf('subcat=1&action=showitems') != -1){ShopART4 = "<font color=red>";}
					if (adr.indexOf('subcat=2&action=showitems') != -1){ShopART5 = "<font color=red>";}
					var Info = '<br>';
					Info += '<table width=\"470\" border=\"0\" align=\"center\">';
					Info += '  <tr align=\"center\">';
					Info += '    <td><table class=liste style=\"border:1px solid #3cac56;\" align=\"center\">';
					Info += '      <tr><td width=\"200\" style=\"text-align:center;\"><b>&nbsp; Was Kaufen</b></td></tr>';
					Info += '      <tr><td>&nbsp; <a href="/internet.php?cat=2&amp;subcat=1&amp;action=showants">' + ShopART1 + 'Einheimische Ameisen</font></a></td></tr>';
					Info += '     <tr><td>&nbsp; <a href="/internet.php?cat=2&amp;subcat=2&amp;action=showants">' + ShopART2 + 'Südeuropäische Ameisen</font></a></td></tr>';
					Info += '     <tr><td>&nbsp; <a href="/internet.php?cat=2&amp;subcat=3&amp;action=showants">' + ShopART3 + 'Exotische Ameisen</font></a></td></tr>';
					Info += '     <tr><td>&nbsp; <a href="/internet.php?cat=2&amp;subcat=1&amp;action=showitems">' + ShopART4 + 'Futter</font></a></td></tr>';
					Info += '     <tr><td>&nbsp; <a href="/internet.php?cat=2&amp;subcat=2&amp;action=showitems">' + ShopART5 + 'Zubehör</font></a></td></tr>';
					Info += '     <tr><td><br>&nbsp;&nbsp;Block Grenze: '+GM_getValue("showInfoShopBlockenEuro","500")+' €</td></tr>';
					Info += VerkaufMessage;
					Info += '   </table></td>';
					Info += '   <td><table width=\"200\" class=liste style=\"border:1px solid #3cac56;\">';
					Info += '     <tr><td width=\"145\" style=\"text-align:center;\"><b>&nbsp;Kleinanzeigen</b></td></tr>';
					Info += KAListe;
					Info += '      </tr>';
					Info += '    </table></td>';
					Info += '  </tr>';
					Info += '</table>';
					Info += '<br><a tooltip="linkalert-tip" href="javascript:toggleverkauf();"><font tooltip="linkalert-tip" color="yellow"><b>Verkaufen Anzeigen</b></font></a>';
					Info += '<div id="FutterPlatzhalter"></div>';
				}
				var InfoBereich;
				InfoBereich = document.getElementById("InfoBereich");
				if (InfoBereich){ 
					InfoBereich.innerHTML = Info;
				}else{ 
					InfoBereich = document.createElement("div");
					InfoBereich.id = "InfoBereich";
					MenuOben.parentNode.insertBefore(InfoBereich,MenuOben.nextSibling);
					InfoBereich.innerHTML = Info;
					var FutterPlatzhalter = document.getElementById("FutterPlatzhalter");
					if (showInfoKAMenuAnzeigen){
						var D = VerkaufenNeuAnzeigen();
						if (D != ""){FutterPlatzhalter.parentNode.insertBefore(D,FutterPlatzhalter.nextSibling);}
						var VerkaufOrginal = document.getElementById("main").getElementsByTagName("table")[8];
						VerkaufOrginal.style.display = "none";
					}
				}
			break;
			case "3":
				mylog("main, Internet - Arbeitsamt");
				putAktionEnde()
			break;
			case "4":
				mylog("main, Internet - Immobilien");
				var WohnungDIV = document.getElementById("main").getElementsByTagName("div")[5];
				if (WohnungDIV.innerHTML.indexOf("Regalplätze: 2") != -1){WohnungDIV.innerHTML = WohnungDIV.innerHTML.replace('Regalplätze: 2','Regalplätze: 2<br><br><b>Nächstes ist</b><br>alter Schuppen  (3 Regalplätze)<br><br>Punkte: 2000<br>Kosten: 100,00 €');}
				if (WohnungDIV.innerHTML.indexOf("Regalplätze: 3") != -1){WohnungDIV.innerHTML = WohnungDIV.innerHTML.replace('Regalplätze: 3','Regalplätze: 3<br><br><b>Nächstes ist</b><br>Dachboden bei Oma Gertrude (4 Regalplätze)<br><br>Punkte: 500<br>Kosten: 500,00 €');}
				if (WohnungDIV.innerHTML.indexOf("Regalplätze: 4") != -1){WohnungDIV.innerHTML = WohnungDIV.innerHTML.replace('Regalplätze: 4','Regalplätze: 4<br><br><b>Nächstes ist</b><br>Wohnung in Hochhaus (6 Regalplätze)<br><br>Punkte: 50.000<br>Kosten: 2.000,00 €');}
				if (WohnungDIV.innerHTML.indexOf("Regalplätze: 6") != -1){WohnungDIV.innerHTML = WohnungDIV.innerHTML.replace('Regalplätze: 6','Regalplätze: 6<br><br><b>Nächstes ist</b><br>Haus (8 Regalplätze)<br><br>Punkte: 5.000<br>Kosten: 5.000,00 €');}
				if (WohnungDIV.innerHTML.indexOf("Regalplätze: 8") != -1){WohnungDIV.innerHTML = WohnungDIV.innerHTML.replace('Regalplätze: 8','Regalplätze: 8<br><br><b>Nächstes ist</b><br>Schloss (12 Regalplätze)<br><br>Punkte: 1.000.000<br>Kosten: 45.000,00 €');}
			break;
			case "5":
				mylog("main, Internet - Online-Möbelhaus");
			break;
			default:
				mylog("main, Internet - Übersicht");
				var AktionTest = document.getElementById("status").getElementsByTagName("table")[0].innerHTML;
				if (AktionTest.indexOf("Aktion: keine") == -1){
					var AktionEnde = document.getElementById("status").getElementsByTagName("span")[0].innerHTML;
					AktionEnde = AktionEnde.replace ("bis ","");
					var MomentaneAktion = document.getElementById("main").getElementsByTagName("div")[4];
					MomentaneAktionNeu = MomentaneAktion.innerHTML.replace ("€","€ <div id=\"endeneu\">Ende Am: " + AktionEnde + "</div>");
					MomentaneAktion.innerHTML = MomentaneAktionNeu;
				}
			break;
		}
	}
	if (adr.indexOf("shop.php") != -1){
		if (adr.indexOf("cat=1") != -1){cat = "1";}if (adr.indexOf("cat=2") != -1){	cat = "2";}
		if (adr.indexOf("cat=3") != -1){cat = "3";}if (adr.indexOf("cat=4") != -1){	cat = "4";}
		switch (cat) {
			case "1":
				mylog("main, Ameisenschop - einheimische Ameisen");
				if (showInfoShopInfoAnzeigen){
					var ShopDIV = document.getElementById("main").getElementsByTagName("div")[4];
					var ShopListe = ShopDIV.getElementsByTagName("table");
					for (var i = 0; i < ShopListe.length; i++){
						var ShopArt = ShopListe[i].innerHTML;
						AArt = ShopListe[i].getElementsByTagName("b")[0].innerHTML;
						var Zusatz = "<br>max. Koloniegröße:  "	+ formatZahl(Daten_Ameisen[AArt][1]);
						Zusatz += "<br>Königinnen: "+ Daten_Ameisen[AArt][0];
						Zusatz += "<br>Platzbedarf (Nest): "+ Daten_Ameisen[AArt][2];
						Zusatz += "<br>Platzbedarf (Formi): "+ Daten_Ameisen[AArt][3];
						ShopArt = ShopArt.replace ("€","€ " + Zusatz);
						ShopListe[i].innerHTML = ShopArt;
					}
				}
			break;
			case "2":
				mylog("main, Ameisenschop - südeuropäische Ameisen");
				if (showInfoShopInfoAnzeigen){
					var ShopDIV = document.getElementById("main").getElementsByTagName("div")[4];
					var ShopListe = ShopDIV.getElementsByTagName("table");
					for (var i = 0; i < ShopListe.length; i++){
						var ShopArt = ShopListe[i].innerHTML;
						AArt = getArt(ShopListe[i].getElementsByTagName("b")[0].innerHTML);
						var Zusatz = "<br>max. Koloniegröße:  "	+ formatZahl(Daten_Ameisen[AArt][1]);
						Zusatz += "<br>Königinnen: "+ Daten_Ameisen[AArt][0];
						Zusatz += "<br>Platzbedarf (Nest): "+ Daten_Ameisen[AArt][2];
						Zusatz += "<br>Platzbedarf (Formi): "+ Daten_Ameisen[AArt][3];
						ShopArt = ShopArt.replace ("€","€ " + Zusatz);
						ShopListe[i].innerHTML = ShopArt;
					}
				}
			break;
			case "3":
				mylog("main, Ameisenschop - exotische Ameisen");
				if (showInfoShopInfoAnzeigen){
					var ShopDIV = document.getElementById("main").getElementsByTagName("div")[4];
					var ShopListe = ShopDIV.getElementsByTagName("table");
					for (var i = 0; i < ShopListe.length; i++){
						var ShopArt = ShopListe[i].innerHTML;
						AArt = getArt(ShopListe[i].getElementsByTagName("b")[0].innerHTML);
						var Zusatz = "<br>max. Koloniegröße:  "	+ formatZahl(Daten_Ameisen[AArt][1]);
						Zusatz += "<br>Königinnen: "+ Daten_Ameisen[AArt][0];
						Zusatz += "<br>Platzbedarf (Nest): "+ Daten_Ameisen[AArt][2];
						Zusatz += "<br>Platzbedarf (Formi): "+ Daten_Ameisen[AArt][3];
						ShopArt = ShopArt.replace ("€","€ " + Zusatz);
						ShopListe[i].innerHTML = ShopArt;
					}
				}
			break;
			case "4":
				mylog("main, Ameisenschop - Futter");
				if (showInfoShopInfoAnzeigen){
					var ShopDIV = document.getElementById("main").getElementsByTagName("div")[4];
					var ShopListe = ShopDIV.getElementsByTagName("table");
					for (var i = 0; i < ShopListe.length; i++){
						var ShopArt = ShopListe[i].innerHTML;
						FArt = getArt(ShopListe[i].getElementsByTagName("b")[0].innerHTML).split(" ")[0];
						var Zusatz = "<br>Futterart:  "	+ Daten_Futter[FArt][0];
						Zusatz += "<br>Zersetzungsrate: "+ Daten_Futter[FArt][1];
						ZusatzTest = Daten_Futter[FArt][2];
						if(ZusatzTest != 0){Zusatz += "<br>Vermehrungsrate: "+ Daten_Futter[FArt][2];}
						ShopArt = ShopArt.replace ("€","€ " + Zusatz);
						ShopListe[i].innerHTML = ShopArt;
					}
				}
			break;
			default:
				mylog("main, Ameisenschop - Übersicht");
			break;
		}
	}
	if (adr.indexOf("editmyprofile.php") != -1){Urlaub();}
	if (adr.indexOf("message.php") != -1){Privat(4);}
	if (adr.indexOf("draussen.php?cat=4&subcat=3") != -1){putAktionEnde()}
}
//////////////////////////////////////////
//                                      //
//            Functionen                //
//                                      //
//////////////////////////////////////////
function init(){
	mylog ("init startet");
	GetVariables();
}
function GetVariables(){
	mylog("GetVariables");
	SoundLief					 = GM_getValue('SoundLief',0);
	showInfoIBFutter			 = GM_getValue('showInfoIBFutter',true);
	showInfoIBFutterDetail		 = GM_getValue('showInfoIBFutterDetail',true);
	showInfoOrginalFutterOff	 = GM_getValue('showInfoOrginalFutterOff',true);
	showInfoShopBlocken			 = GM_getValue('showInfoShopBlocken',true);
	showInfoShopBlockenEuro		 = GM_getValue('showInfoShopBlockenEuro','500');
	showInfoShopInfoAnzeigen	 = GM_getValue('showInfoShopInfoAnzeigen',true);
	showInfoShopZuchtEnterDrehen = GM_getValue('showInfoShopZuchtEnterDrehen',true);
	showInfoFutterErrorAbfangen  = GM_getValue('showInfoFutterErrorAbfangen',true);
	showInfoPlaySound			 = GM_getValue('showInfoPlaySound',false);
	showInfoPlayDatei			 = GM_getValue('showInfoPlayDatei','http://eba.pytalhost.de/Caution.wav');
	showInfoNotiz				 = GM_getValue('showInfoNotiz','Notiz Block');
	showInfoNotizAnzeigen		 = GM_getValue('showInfoNotizAnzeigen',true);
	showInfoKAMenuAnzeigen		 = GM_getValue('showInfoKAMenuAnzeigen',true);
	showInfoKALink				 = GM_getValue('showInfoKALink',false);
	showInfoLexikonNeu			 = GM_getValue('showInfoLexikonNeu',true);
	showInfoKALinkNeu			 = GM_getValue('showInfoKALinkNeu',"1");
	showInfoFutterMarkieren		 = GM_getValue('showInfoFutterMarkieren',true);
	showInfoUebersicht			 = GM_getValue('showInfoUebersicht',true);
	showInfoIBPlatzDetail		 = GM_getValue('showInfoIBPlatzDetail',true);
	showInfoIBMaxArbeiterDetail	 = GM_getValue('showInfoIBMaxArbeiterDetail',true);
	showInfoIBKolonieDetail		 = GM_getValue('showInfoIBKolonieDetail',true);
	showInfoFormatZahlen		 = GM_getValue('showInfoFormatZahlen',true);
	showInfoTastatur			 = GM_getValue('showInfoTastatur',true);
	showInfoUGynArt				 = GM_getValue('showInfoUGynArt',true);
	showInfoFutterLeerTabelle	 = GM_getValue('showInfoFutterLeerTabelle',false);
}
function SetVariables(){
	mylog("SetVariables");
	GM_setValue("showInfoIBFutter",showInfoIBFutter);
	GM_setValue("showInfoIBFutterDetail",showInfoIBFutterDetail);
	GM_setValue("showInfoOrginalFutterOff",showInfoOrginalFutterOff);
	GM_setValue("showInfoShopBlocken",showInfoShopBlocken);
	GM_setValue("showInfoShopInfoAnzeigen",showInfoShopInfoAnzeigen);
	GM_setValue("showInfoShopZuchtEnterDrehen",showInfoShopZuchtEnterDrehen);
	GM_setValue("showInfoFutterErrorAbfangen",showInfoFutterErrorAbfangen);
	GM_setValue("showInfoPlaySound",showInfoPlaySound);
	GM_setValue("showInfoNotizAnzeigen",showInfoNotizAnzeigen);
	GM_setValue("showInfoKAMenuAnzeigen",showInfoKAMenuAnzeigen);
	GM_setValue("showInfoKALink",showInfoKALink);
	GM_setValue("showInfoLexikonNeu",showInfoLexikonNeu);
	GM_setValue("showInfoFutterMarkieren",showInfoFutterMarkieren);
	GM_setValue("showInfoUebersicht",showInfoUebersicht);
	GM_setValue("showInfoIBPlatzDetail",showInfoIBPlatzDetail);
	GM_setValue("showInfoIBMaxArbeiterDetail",showInfoIBMaxArbeiterDetail);
	GM_setValue("showInfoIBKolonieDetail",showInfoIBKolonieDetail);
	GM_setValue("showInfoFormatZahlen",showInfoFormatZahlen);
	GM_setValue("showInfoTastatur",showInfoTastatur);
	GM_setValue("showInfoUGynArt",showInfoUGynArt);
	GM_setValue("showInfoFutterLeerTabelle",showInfoFutterLeerTabelle);

}
var AnotherAutoUpdater = {
	//	Orginal Code By	http://userscripts.org/scripts/show/38017		Version 1.1.9
	id: '66633',
	days: 0.5,
	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
	time: new Date().getTime(),
	call: function(response) {
		GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
	},
	compare: function(xpr,response) {
		this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
			GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		mylog("Auto Update Script\n\n\nAlte Version ==> " + this.version + "\nNeue Version ==> " + this.xversion);
		if ( (+this.xversion > +this.version) && (confirm('Eine Neue Verson vom - '+this.xname+' - Script ist Verfügbar. \n\nDeine Version '+this.version+' \nNeue Version: '+ this.xversion + '\n\nMöchtest du Updaten ?\n\n')) ) {
			GM_setValue('updated_'+this.id, this.time+'');
			top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
		} else if ( (this.xversion) && (+this.xversion > +this.version) ) {
			if(confirm('Soll Autoupdate für das Script Beendet werden ?')) {
			GM_setValue('updated_'+this.id, 'off');
			GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
			alert('Automatisches Update kann im Submenü eingeschaltet werden.');
			} else {
				GM_setValue('updated_'+this.id, this.time+'');
			}
		} else {
			if(response) alert('Kein Update für das - '+this.name+' - Script vorhanden');
			GM_setValue('updated_'+this.id, this.time+'');
		}
	},
	check: function() {
	if (GM_getValue('updated_'+this.id, 0) == "off")
		GM_registerMenuCommand("Einschalten vom - "+this.name+" - Update.", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Neue Script Version suchen ? ", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    }
  }
}
function mainmenu(){
	var adr = document.location.href;
	var MainMenu = document.getElementById("shopmenucats");
	if(MainMenu){
		if (showInfoKALink){
			if (showInfoKALinkNeu == '1'){MainMenu.innerHTML = MainMenu.innerHTML.replace('cat=2&amp;subcat=0&amp;clearsort=1','cat=2&amp;subcat=1&amp;action=showants&amp;clearsort=1');}
			if (showInfoKALinkNeu == '2'){MainMenu.innerHTML = MainMenu.innerHTML.replace('cat=2&amp;subcat=0&amp;clearsort=1','cat=2&amp;subcat=2&amp;action=showants&amp;clearsort=1');}
			if (showInfoKALinkNeu == '3'){MainMenu.innerHTML = MainMenu.innerHTML.replace('cat=2&amp;subcat=0&amp;clearsort=1','cat=2&amp;subcat=3&amp;action=showants&amp;clearsort=1');}
			if (showInfoKALinkNeu == '4'){MainMenu.innerHTML = MainMenu.innerHTML.replace('cat=2&amp;subcat=0&amp;clearsort=1','cat=2&amp;subcat=1&amp;action=showitems&amp;clearsort=1');}
			if (showInfoKALinkNeu == '5'){MainMenu.innerHTML = MainMenu.innerHTML.replace('cat=2&amp;subcat=0&amp;clearsort=1','cat=2&amp;subcat=2&amp;action=showitems&amp;clearsort=1');}
		}
		if (adr.indexOf("lexikon.php") != -1 && showInfoLexikonNeu){MainMenu.innerHTML += '<a href="http://forum.eatenbyants.de/viewtopic.php?f=7&t=3205" target="_blank">Igels How to EBA</a><br>';}
		if (showInfoNotizAnzeigen){MainMenu.innerHTML += '<textarea name="KonfigTxt" id="KonfNotiz" cols="18" rows="4">' + showInfoNotiz + '</textarea><br><br>';}
		if (adr.indexOf("internet.php?cat=2") != -1){
			TopLink  = "<style type=\"text/css\">div#footerTopLink{position:fixed;bottom:1px;right:10px;background-color:rgb(0, 48, 18);border-left:1px solid rgb(60, 172, 86);border-right:1px solid rgb(60, 172, 86);border-top:1px solid rgb(60, 172, 86);height: 22px;width:40px;z-index: 200;}div#footerTopLink a{text-decoration: none;color:rgb(255, 248, 215);}</style>";
			TopLink += "<div id=\"footerTopLink\"><a href=\"#\">Top</a></div>";
		}else TopLink = "";
		MainMenu.innerHTML += '<a href="javascript:toggledisplay();"><font color=red>Script Einstellungen</font></a><br>' + TopLink;
		var AktionTest = document.getElementById("status").getElementsByTagName("table")[0].innerHTML;
		if (AktionTest.indexOf("Aktion: keine") == -1){
			if (SoundLief !=0 ){GM_setValue("SoundLief",0);}
		}else{
			document.getElementById("status").getElementsByTagName("table")[0].innerHTML = document.getElementById("status").getElementsByTagName("table")[0].innerHTML.replace('Aktion: keine','Aktion: <font color=red><b>keine</b></font>');
			if (SoundLief <= 1){
				SoundLief = SoundLief +1;
				GM_setValue("SoundLief",SoundLief);
				if (showInfoPlaySound){
					MainMenu.innerHTML += "<object classid=\"clsid:166B1BCA-3F9C-11CF-8075-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=10,1,1,0\" width=\"1\" height=\"1\" title=\"Alarm Sound\">";
					MainMenu.innerHTML += "  <param name=\"src\" value=\"http://eba.pytalhost.de\">";
					MainMenu.innerHTML += "  <embed src=\"" + showInfoPlayDatei + "\" pluginspage=\"http://www.adobe.com/shockwave/download/\" width=\"1\" height=\"1\"></embed>";
					MainMenu.innerHTML += "</object>";
				}
			}
		}
	}
	var KonfigEinblenden = document.getElementsByTagName("head")[0];
	var D = KonfigHTML();
	if (D != ""){
		KonfigEinblenden.parentNode.insertBefore(D,KonfigEinblenden.nextSibling);
		AddKonfigEventlisteners();
	}
}
function Urlaub(){ 
	var MainDIV = document.getElementById("main");
	var MessageDIV = MainDIV.getElementsByTagName("div")[1];
	if (MessageDIV.innerHTML.indexOf("Kann Urlaubsmodus nicht aktivieren") != -1){MessageDIV.innerHTML = '<font color="red"><br><br><b>ACHTUNG</b><br><br><b>ACHTUNG</b><br><br></font>' + MessageDIV.innerHTML + '<font color="red"><br><br><b>ACHTUNG</b><br><br><b>ACHTUNG</b><br><br></font>';}
}
function KonfigHTML(){ 
	var adr = document.location.href;
	if (showInfoTastatur){
		var AlleLinks = document.links;
		for(var i = 0; i < AlleLinks.length; i++){
			if (AlleLinks[i].innerHTML.indexOf("nächstes Formicarium")  != -1){AlleLinks[i].id = "nav-next-link";}
			if (AlleLinks[i].innerHTML.indexOf("voriges Formicarium")  != -1){AlleLinks[i].id = "nav-prev-link";}
		}
		Navi = '<script type="text/javascript">';
		Navi +='var Navigator ={_nextId: null, _prevId: null,';
		Navi +='	Initialize: function( nextId, prevId ){this._nextId = nextId;this._prevId = prevId;';
		Navi +='		if ( window.navigator.userAgent.toLowerCase().indexOf("msie") != -1 ){document.body.onkeydown = this._handleOnKeyDownEvent;';
		Navi +='		}else{	window.onkeydown = this._handleOnKeyDownEvent;}';
		Navi +='	},';
		Navi +='	NextSite: function(){this._followLink( this._nextId );},';
		Navi +='	PrevSite: function(){this._followLink( this._prevId );},';
		Navi +='	_handleOnKeyDownEvent: function(e)	{';
		Navi +='		if ( !Navigator._isTargetValid(e) ){return;	}';
		Navi +='		switch ( Navigator._getEventKeyCode(e) ){';
		Navi +='		case 37:';
		Navi +='			Navigator.PrevSite();';
		Navi +='			break;';
		Navi +='		case 39:';
		Navi +='			Navigator.NextSite();';
		Navi +='			break;';
		Navi +='		}';
		Navi +='	},';
		Navi +='	_isTargetValid: function(e){';
		Navi +='		var target = null;';
		Navi +='		if ( e && e.target ){target = e.target;';
		Navi +='		}else if ( window.event && window.event.srcElement ){target = window.event.srcElement;';
		Navi +='		}else{return true;}';
		Navi +='		if ( target.nodeType == 3 )	{target = target.parentNode;}';
		Navi +='		switch ( target.tagName.toLowerCase() )	{';
		Navi +='			case "textarea":';
		Navi +='			case "input":';
		Navi +='			case "select":';
		Navi +='				return false;';
		Navi +='			default:';
		Navi +='				return true;';
		Navi +='		}';
		Navi +='	},';
		Navi +='	_getEventKeyCode: function(e){';
		Navi +='		if ( window.event )	{return window.event.keyCode;}';
		Navi +='		else if ( e.which )	{return e.which;}';
		Navi +='		return 0;';
		Navi +='	},';
		Navi +='	_followLink: function(id){';
		Navi +='		var link = document.getElementById(id);';
		Navi +='		if ( link ){window.open(link.href, "_self");}';
		Navi +='	}';
		Navi +='};';
		Navi +='Navigator.Initialize( "nav-next-link", "nav-prev-link" );';
		Navi +='</script>';
	}else Navi = '';
	if (document.getElementById("DivKonfigurieren")) return "";
	var NewDiv = document.createElement("div");
	NewDiv.id = "DivKonfigurieren";
	var KB = "<script type='text/javascript'>\nfunction toggledisplay()\n";
	KB += "{ var e = document.getElementById('KonfigBoxes');\n";
	KB += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
	KB += "}\n</script>";
	NewDiv.innerHTML = KB;
	var hiddenDiv=document.createElement("div");
	hiddenDiv.id = "KonfigBoxes";
	hiddenDiv.style.display = "none";
	KB = "\n<center><h2><font color=red>Konfiguration des Scriptes</font></h2><a  target=\"_blank\" href='http://userscripts.org/scripts/show/66633'>Link zum Skript</a><br><br>";
	KB += "<font color=white>";
	KB += "<table class=liste style=\"border:1px solid #3cac56;\" align=\"center\" width=\"600\">";
	KB += "  <tr><td colspan=\"3\"><b>Ameisenzimmer</b></td></tr>";
	KB += "  <tr>";
	KB += "    <td width=\"20\">&nbsp;<input type='checkbox' name='KonfigBox' id='KonfUebersicht'";if (showInfoUebersicht) KB += " checked";KB += "></td>";
	KB += "    <td width=\"300\">&nbsp;Übersicht Anpassen</td>";
	KB += "    <td width=\"80\">&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td width=\"20\">&nbsp;<input type='checkbox' name='KonfigBox' id='KonfUGynArt'";if (showInfoUGynArt) KB += " checked";KB += "></td>";
	KB += "    <td width=\"300\">&nbsp;Übersicht - Gyn Art Anzeigen</td>";
	KB += "    <td width=\"80\">&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfShopZuchtEnterDrehen'";if (showInfoShopZuchtEnterDrehen) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Futtertierzucht - Enter ist jetzt Futter Entfernen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfIBFutter'";if (showInfoIBFutter) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Füttern oben Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfIBFutterDetail'";if (showInfoIBFutterDetail) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Futter Details Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfIBPlatzDetail'";if (showInfoIBPlatzDetail) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Nest & Formi Platz Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfIBMaxArbeiterDetail'";if (showInfoIBMaxArbeiterDetail) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Max Arbeiter Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfIBKolonieDetail'";if (showInfoIBKolonieDetail) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Kolonie Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfFutterErrorAbfangen'";if (showInfoFutterErrorAbfangen) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Gefüttert Ausblenden und als Link Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfOrginalFutterOff'";if (showInfoOrginalFutterOff) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Orginal Füttern Ausblenden</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfFutterLeerTabelle'";if (showInfoFutterLeerTabelle) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Formicarium Detail - Leere Futter Tabelle Anzeigen</td>";
	KB += "    <td>&nbsp;Default Off</td>";
	KB += "  </tr>";
	KB += "  <tr><td colspan=\"3\">&nbsp;</td></tr>";
	KB += "  <tr><td colspan=\"3\"><b>Internet</b></td></tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfKAMenuAnzeigen'";if (showInfoKAMenuAnzeigen) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Kleinanzeigen - Oben neues Menü Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='showInfoShopBlocken'";if (showInfoShopBlocken) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Kleinanzeigen - Filtern. <input type='text' onfocus='this.select()' name='KonfigTxt' id='KonfShopBlockenEuro' size='2' value='" + showInfoShopBlockenEuro + "'> €</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfKALink'";if (showInfoKALink) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Kleinanzeigen - Default Link Ändern</td>";
	KB += "    <td>&nbsp;Default Off</td>";
	KB += "  </tr>";
	KALinkDisabled = "";
	//if (!showInfoKALink){KALinkDisabled = " disabled";}else{KALinkDisabled = "";}
	KB += "  <tr>";
	KB += "    <td>&nbsp;";
	KB += "    <td>&nbsp;<input name=\"KonfigRad\" id=\"KonfKALinkNeu\" type=\"radio\" value=\"1\" ";if (showInfoKALinkNeu =='1' && showInfoKALink){KB += " checked";}KB += KALinkDisabled + ">Einheimische Ameisen</td>";
	KB += "    <td>&nbsp;</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;";
	KB += "    <td>&nbsp;<input name=\"KonfigRad\" id=\"KonfKALinkNeu\" type=\"radio\" value=\"2\" ";if (showInfoKALinkNeu =='2'){KB += " checked";}KB +=  KALinkDisabled + ">Südeuropäische Ameisen</td>";
	KB += "    <td>&nbsp;</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;";
	KB += "    <td>&nbsp;<input name=\"KonfigRad\" id=\"KonfKALinkNeu\" type=\"radio\" value=\"3\" ";if (showInfoKALinkNeu =='3'){KB += " checked";}KB += KALinkDisabled + ">Exotische Ameisen</td>";
	KB += "    <td>&nbsp;</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;";
	KB += "    <td>&nbsp;<input name=\"KonfigRad\" id=\"KonfKALinkNeu\" type=\"radio\" value=\"4\" ";if (showInfoKALinkNeu =='4'){KB += " checked";}KB += KALinkDisabled + ">Futter</td>";
	KB += "    <td>&nbsp;</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;";
	KB += "    <td>&nbsp;<input name=\"KonfigRad\" id=\"KonfKALinkNeu\" type=\"radio\" value=\"5\" ";if (showInfoKALinkNeu =='5'){KB += " checked";}KB += KALinkDisabled + ">Zubehör</td>";
	KB += "    <td>&nbsp;</td>";
	KB += "  </tr>";
	KB += "  <tr><td colspan=\"3\">&nbsp;</td></tr>";
	KB += "  <tr><td colspan=\"3\"><b>Ameisenshop</b></td></tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfShopInfoAnzeigen'";if (showInfoShopInfoAnzeigen) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Shop - Detail Infos zu den Angeboten Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr><td colspan=\"3\">&nbsp;</td></tr>";
	KB += "  <tr><td colspan=\"3\"><b>Sonstiges</b></td></tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfFormatZahlen'";if (showInfoFormatZahlen) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;1.000 Trennzeichen Einfügen<br>&nbsp;&nbsp;&nbsp;(Kann Probleme mit Anderen Scripten geben)</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfTastatur'";if (showInfoTastatur) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Tastatursteuerung Formi Details Pfeil links/rechts</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfFutterMarkieren'";if (showInfoFutterMarkieren) KB += " checked";KB += "></td>";
	KB += "    <td>&nbsp;Alten Wert Markieren</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfLexikonNeu'";if (showInfoLexikonNeu) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Lexikon - Nützliche Links zum Forum Einblenden</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfNotizAnzeigen'";if (showInfoNotizAnzeigen) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Notiz Block Anzeigen</td>";
	KB += "    <td>&nbsp;Default On</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;<input type='checkbox' name='KonfigBox' id='KonfPlaySound'";if (showInfoPlaySound) KB += " checked";KB += "></td></td>";
	KB += "    <td>&nbsp;Sound Abspielen wen keine Aktion Aktiv ist</td>";
	KB += "    <td>&nbsp;Default Off</td>";
	KB += "  </tr>";
	KB += "  <tr>";
	KB += "    <td>&nbsp;</td>";
	KB += "    <td colspan=\"2\">&nbsp;<input type='text' onfocus='this.select()' name='KonfigTxt' id='KonfPlayDatei' size='60' value='" + showInfoPlayDatei + "'></td>";
	KB += "  </tr>";
	KB += "</table></font><br><a href='" + adr + "'>Seite aktualisieren</a><br><br>";
	KB += Navi;
	hiddenDiv.innerHTML = KB;
	NewDiv.appendChild(hiddenDiv);
	return NewDiv;
}
function AddKonfigEventlisteners(){
	var Boxes = document.getElementsByName("KonfigBox");
	var Txte = document.getElementsByName("KonfigTxt");
	var Radi = document.getElementsByName("KonfigRad");
	for each (Box in Boxes){Box.addEventListener("click",KonfigBox_tick,false);}
	for each (Txt in Txte){Txt.addEventListener("blur", function(){KonfigTxt_tick();}, false);}
	for each (Rad in Radi){Rad.addEventListener("click",KonfigRadio_tick,false);}
}
function KonfigRadio_tick(){
	mylog("KonfigRadio_tick");
	var Radi = document.getElementsByName("KonfigRad");
	for (var i=0;i<Radi.length;i++){ 
		var Rad=Radi[i];
		var VarNam = Rad.id.replace ("Konf","showInfo");
		var NewVal = Rad.checked;
		var Che = Rad.value;
		if (NewVal){GM_setValue(VarNam,Che);}
	}
}
function KonfigBox_tick(){
	mylog("KonfigBox_tick ");
	var Boxes = document.getElementsByName("KonfigBox");
	for (var i=0;i<Boxes.length;i++){ 
		var Box=Boxes[i];
		var VarNam = Box.id.replace ("Konf","showInfo");
		var OldVal = eval(VarNam);
		var NewVal = Box.checked;
		eval(VarNam + " = " + NewVal);
		if (VarNam == "showInfoPlaySound" && OldVal == false ){GM_setValue("SoundLief",0);}
		if (VarNam == "showInfoKALink" && OldVal == true){GM_setValue("showInfoKALinkNeu",1);}
	}
	SetVariables();
}
function KonfigTxt_tick(){
	mylog("KonfigTxt_tick");
	var Txte = document.getElementsByName("KonfigTxt");
	for (var i=0;i<Txte.length;i++){ 
		var Txt=Txte[i];
		var VarNam = Txt.id.replace ("Konf","showInfo");
		var NewVal = Txt.value;
		GM_setValue(VarNam,NewVal);
		if (VarNam == 'showInfoPlayDatei' && NewVal == ''){GM_setValue('showInfoPlayDatei','http://eba.pytalhost.de/Caution.wav');}
	}
}
function putAktionEnde(){
	mylog("putAktionEnde");
	var adr = document.location.href;
	var Jetzt = new Date().getTime();
	if (adr.indexOf("draussen.php?cat=4&subcat=3") != -1){DD = 4;}else{DD = 3;}
	var DauerDIV = document.getElementById("main").getElementsByTagName("div")[DD];
	var F = DauerDIV.getElementsByTagName("table");
	for (var i = 0; i < F.length; i++){
		Dauer = F[i].innerHTML.slice(F[i].innerHTML.indexOf('Dauer: ')+7, F[i].innerHTML.indexOf('<br> Kosten:')).split(":");
		TD	= F[i].getElementsByTagName("td")[1];
		TD.innerHTML = TD.innerHTML.replace(' €',' &euro; <br>Ende ca.: <b>' + new Date(Jetzt + Dauer[0] * 60 * 60 * 1000 + Dauer[1] * 60 * 1000).toLocaleString() + '</b>');
	}
}
function VerkaufenNeuAnzeigen(){ 
	if (showInfoKAMenuAnzeigen){
		var adr = document.location.href;
		if (document.getElementById("DivVerkaufenNeu")) return "";
		var NewDiv = document.createElement("div");
		NewDiv.id = "DivVerkaufenNeu";
		var FB = "<script type='text/javascript'>\nfunction toggleverkauf()\n";
		FB += "{ var e = document.getElementById('VerkaufenBoxes');\n";
		FB += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
		FB += "}\n</script>";
		NewDiv.innerHTML = FB;
		var hiddenDiv=document.createElement("div");
		hiddenDiv.id = "VerkaufenBoxes";
		hiddenDiv.style.display = "none";
		var VerkaufOrginalForm =  document.getElementById("main").getElementsByTagName("table")[6].getElementsByTagName("form")[0].innerHTML;
		VerkaufOrginalForm = VerkaufOrginalForm.replace('name="price_cent"','name="price_cent" onfocus="this.select()"');
		VerkaufOrginalForm = VerkaufOrginalForm.replace('name="amount"','name="amount" onfocus="this.select()"');
		VerkaufenSicherheisAbfrage = "";
		VerkaufenSicherheisAbfrage = "onsubmit=\"return confirm('\t\t\t\tSicher ?')\"              ";
		FB += '<br>';
		FB += '<table class=liste style=\"border:1px solid #3cac56;\" align=\"center\">';
		FB += '	  <tr>';
		FB += '		<td width=\"180\" style=\"text-align:center;\"><br><form ' + VerkaufenSicherheisAbfrage + ' action="/internet.php" method="post">' + VerkaufOrginalForm + '</form><br></td>';
		FB += '	  </tr>';
		FB += '	<tr>';
		FB += '</table>';
		hiddenDiv.innerHTML = FB;
		NewDiv.appendChild(hiddenDiv);
		return NewDiv; 
	}
}
function getArt(Text){
	mylog("getArt(" + Text + ")");
	var Art=Text;
	var Teile = Text.split(">");
	if (Teile.length > 1) 
	{ Art = Teile[1]; }
	Art = trim(Art);
	var Art = Art.replace("Formicarium ", "");
	return Art;
}
function trim(T){
	var ret;
	ret = T;
	while ( (ret.substr(0,1) != escape(ret.substr(0,1)) && ret.length>0) )
	{ ret = ret.substr(1); }
	return ret;
}
function runden(Zahl) {
	Zahl = Math.round(Zahl);
	return Zahl
}
function FutterNeuAnzeigen(){ 
	var adr = document.location.href;
	if (document.getElementById("DivFutterNeu")) return "";
	var NewDiv = document.createElement("div");
	NewDiv.id = "DivKonfigurieren";
	var FB = "<script type='text/javascript'>\nfunction togglefutter()\n";
	FB += "{ var e = document.getElementById('FutterBoxes');\n";
	FB += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
	FB += "}\n</script>";
	NewDiv.innerHTML = FB;
	var hiddenDiv=document.createElement("div");
	hiddenDiv.id = "FutterBoxes";
	hiddenDiv.style.display = "none";
	var MainDiv = document.getElementById("main");
	for (var i = 1; i < 20 ; i++){
		var FutterDIV = MainDiv.getElementsByTagName("div")[i];
		if(FutterDIV != undefined){
			var FutterDIVTest = FutterDIV.getElementsByTagName("b")[0];
			if(FutterDIVTest != undefined){if(FutterDIVTest.innerHTML == "Futter"){var FutterDIVNr = i;}}
		}
	}
	FutterDIV = MainDiv.getElementsByTagName("div")[FutterDIVNr];
	var FutterDIVTabelle = FutterDIV.getElementsByTagName("table")[0];
	if (FutterDIVTabelle == undefined){
	FB += '<br>';}else{FB += '<br><br><table class=liste>'+FutterDIVTabelle.innerHTML + '</table><br><a tooltip="linkalert-tip" href="javascript:togglefutter();"><font tooltip="linkalert-tip" color="white">Futterliste Ausblenden</font></a>' ;}
	FB += '<br>' ;
	hiddenDiv.innerHTML = FB;
	NewDiv.appendChild(hiddenDiv);
	return NewDiv;
}
function formatZahl(zahl, k, fix) {
	if (showInfoFormatZahlen){
		if(!k) k = 0;
		var neu = '';
		var dec_point = ',';
		var thousands_sep = '.';
		var f = Math.pow(10, k);
		zahl = '' + parseInt(zahl * f + (.5 * (zahl > 0 ? 1 : -1)) ) / f ;
		var idx = zahl.indexOf('.');
		if(fix){zahl += (idx == -1 ? '.' : '' ) + f.toString().substring(1);}
		var sign = zahl < 0;
		if(sign) zahl = zahl.substring(1);
		idx = zahl.indexOf('.');
		if( idx == -1) idx = zahl.length;
		else neu = dec_point + zahl.substr(idx + 1, k);
		while(idx > 0){if(idx - 3 > 0)neu = thousands_sep + zahl.substring( idx - 3, idx) + neu; else neu = zahl.substring(0, idx) + neu; idx -= 3;}
		return (sign ? '-' : '') + neu;
	}else return (zahl);
}
function mylog(Text){if (!debugging) return;var Jetzt = new Date();GM_log(Jetzt.toLocaleString() + "\n" + Text);}
function mytest(Text){if (!testing) return;GM_log("\n" + Text); }
function Privat(Stichwort){if (typeof Privat_Aktion != 'undefined'){Privat_Aktion(Stichwort);}}
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
if (typeof debugging == 'undefined'){var debugging;}if (typeof testing == 'undefined'){var testing;}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//      todo Liste
//      - Ameisenzimmer / Lager         / Ameisen,Futter, usw sortieren einbauen ( Aber erst mal was ins Lager Bekommen )
//
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//--------------- Cut ---------------------//
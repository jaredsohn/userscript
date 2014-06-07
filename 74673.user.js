// ==UserScript==
// @name         ROMFiltteri
// @namespace    ROMFiltteri
// @description  Piilottaa/korostaa valitsemiesi kayttajien viestit. V2.01
// @include      http://keskustelu.kauppalehti.fi/*
// ==/UserScript==

/* ROMfilteri V2.01 piilottaa ja korostaa haluamiesi käyttäjien viestejä ja tarjoaa linkkiä uusiin viesteihin.

VAATII: Firefox-selaimen ja Greasemonkey-lisäosan

OHJE:

1) Asenna Greasemonkey Firefoxiin tästä
	https://addons.mozilla.org/en-US/firefox/addon/748

2) Avaa sitten tämä tiedosto uudelleen Firefoxilla ja salli Greasemonkeyn asentaa se.
	http://userscripts.org/scripts/source/74673.user.js

3) Suodatus on käytössä.

KOTISIVU
http://userscripts.org/scripts/show/74673

POISTAMINEN:

Suodatuksen voi kytkeä tilapäisesti päälle/pois painamalla apinan naamaa selaimen oikeassa alakulmassa.

Kokonaan suodatuksen saa poistettua koneelta valitsemalla valikosta:
Tools->Greasemonkey->Manage User Scripts
ja painamalla Uninstall-nappia, kun tämä on valittuna.

ONGELMIA?
Käytä Firefox-selainta ja asenna Greasemonkey.
Onko Grease Monkey asennettu ja käytössä?
Onko tämä scripta asennettu ja sallittu Greasemonkeyssä?

Tämän tiedoston nimen lopun pitää päättyä ".user.js", muutoin Greasemonkey ei älyä asentaa tätä.

*/
Nimimerkit= {};

RomInit();
RomInit=null;

// Lisää valikot. Nämä näkee Tools>Greasemonkey>User script commands valikosta,
// tai klikaamalla oikeanpuoleisella hiirellä apinan päätä selaimen oikeassa alakulmassa.
if (GM_registerMenuCommand) {
	GM_registerMenuCommand('Näytä/Aseta nimimerkkien pistelista',function() {
		var tmp=prompt("Näytä/Aseta nimimerkkien pistelista."+
		               "\nVoit kopioida nimimerkkilistan tästä ja ottaa sen käyttöön toisella tietokoneellasi liittämällä tähän.\n"+
		               "\nLista on muotoa ({'nimimerkki1':1, 'nimimerkki2':-3})\n"+
		               "Listan tulee alkaa ja päättyä sulkuihin ja kaarisulkuihin, kuten yllä.\n\n",GM_getValue("nimimerkit",Nimimerkit));		
		if (tmp) {
			try  {			
			Nimimerkit = eval(tmp);
			if (typeof(Nimimerkit) == "object") {
				GM_setValue("nimimerkit", uneval(Nimimerkit));
			} else {
				alert("Nimimerkkilistassa oli virhe, listaa ei voitu ottaa käyttöön.");
			}
		   } catch(e) {
		   	alert("Nimimerkkilistassa oli virhe, listaa ei voitu ottaa käyttöön!");
		   }
		}});			
	GM_registerMenuCommand('Näytä luetut ketjut -lista',function() {prompt("Lista ketjujen viimeisimmistä luetuista viesteistä.",GM_getValue("ketjut","[]"));});
	GM_registerMenuCommand('Unohda kaikki luetut ketjut',function() {if (confirm("Haluatko todella unohtaa kaikki luetut ketjut?")) GM_setValue("ketjut","[]");});
	GM_registerMenuCommand('ROMfilterin kotisivu ja uusin versio',function() {window.location.href ="http://userscripts.org/scripts/show/74673";});
}

function RomInit() {
	// Asetuksia

	// Piilotetaanko myös viestin otsikkorivi
	// 0; = ei piiloteta
	// 1; = piilota otsikkorivi
	var PiilotaOtsikkorivi=0;

	// Viestin taustaväriksi valitaan tältä listalta sen mukaan monta pistettä olet antanut kirjoittajalle.
	// Ensimmäinen on taustaväri yhden pisteen saaneille. Pisteiden kasvaessa siirrytään värilistalla oikealle.
	// Voit kirjoittaa listalle niin monta väriä kuin haluat.
	var KorostusVari= ["#F4F4FB","#F2F2F8","#EBEBF6","#E0E0F3","#D9D9F0","#ddddee","#ccccdd","#bbbbcc"];
	var HimmennysVari=["#555555","#888888","#aaaaaa","#bbbbbb","#cccccc","#dddddd","#eeeeee","#ffffff"];

	// --------------------------------------------------------------------------------------------------
	// Alla on piilotuksen hoitava koodi, tätä ei tarvitse muuttaa, ellei keskustelupalstan rakenne muutu
	// --------------------------------------------------------------------------------------------------

	//GM_setValue("anarray",uneval(Nimimerkit));
	try {
	Nimimerkit = eval(GM_getValue("nimimerkit",uneval(Nimimerkit)));
   } catch(err) {
   	Nimimerkit={};
   }
	if (Nimimerkit==undefined) {
		Nimimerkit={};
	}
	if (typeof(Nimimerkit) != "object") {
		Nimimerkit={};
	}
	
	// Hae listalta nimierkin saamat pisteet
	var haePisteet=function(nimi) {
		try {
		var tmp=Nimimerkit[nimi];
	   } catch(err) {
	   	tmp="";
		}
		if(isNaN(tmp)) return ""; else return tmp;
	};

	// Luo hakutoiminnot valmiiksi, saattaa nopeuttaa hiukan
	// Hae viestin tunnusnumero
	var findMessageID=/messageID=([\w\d]+)/i;
	// Hae viestiketjun tunnusnumero
	var findThreadID=/threadID=([\w\d]+)/i;
	// Hae sivun ensimmäisen viestin järjestysnumero ketjussa
	var findStart=/[\?\&]+start=([\w\d]+)/i;

	// Aseta tyylit tämän scriptan lisäämille elementeille
	var tmpStyle='line-height:40px; font-size:40px;text-decoration:none;color:#ddd;cursor: pointer;! important;'
	addGlobalStyle('.GMVotePlus  { '+tmpStyle+' } a:hover .GMVotePlus {color:#0f0;! important;} .GMVotePlusH {color:#0f0;! important; }');
	addGlobalStyle('.GMVoteMinus { '+tmpStyle+' } a:hover .GMVoteMinus {color:#f00;! important;}');
	addGlobalStyle('.GMVoteBan   { '+tmpStyle+' } a:hover .GMVoteBan {color:#f00;! important;}');
	addGlobalStyle('.GMVotePts   { '+tmpStyle+' } a:hover .GMVotePts {color:#f00;! important;}');
	addGlobalStyle('.messagebox a:link, .messagebox a:visited {color:#026297; text-decoration:none;} .messagebox a:hover {text-decoration:underline;}');
	addGlobalStyle('.jive-thread-row-paginator a:visited {color:#aaaaaa;}');
	addGlobalStyle('a.GMuusi           { color:#080;}');
	addGlobalStyle('.messagebox a.GMlukemattomia   { color:#ff6297;}');
	addGlobalStyle('.messagebox a.GMkaikkiluettu   { color:#aaaaaa;}');
	addGlobalStyle('.GMkaikkiluettu     { color:#aaaaaa;}');
	//addGlobalStyle('.jive-thread-row-paginator a.GMkaikkiluettu:link {color:#026297;}');

	var Ketjut = {};
	Ketjut = eval(GM_getValue("ketjut",uneval(Ketjut)));
	var viestienLkm=0;
	var allElements = document.getElementsByClassName("messagebox");
	// Käy kaikki sivun viestit läpi
	for (var i=0;i<allElements.length; i++) {
		// Ota yksi viesti käsittelyyn
		var viesti=allElements[i];
		// Hae viestin sisältämä otsikkolaatiko
		var header=getElementsByClassName("messagebox_header",viesti);
		var Nimimerkki="";
		// Hae otsikkolaatikon sisältä tämän viestin kirjoittajan nimimerkki
		// Tämä kohta voi muuttua sivun rakenteen muuttuessa
		var t=header[0];
		if (t) { t=t.firstChild; while (t && t.nodeType!=1){ t=t.nextSibling;} }
		if (t) { t=t.firstChild; while (t && t.nodeType!=1){ t=t.nextSibling;} }
		if (t) if (t.title) { Nimimerkki=t.title;}

		// Hae viestin sivupalkki
		var hide=getElementsByClassName("messagebox_sidebar",viesti);
		var pisteet="";
		if (hide[0] && header[0]) {
				viestienLkm++;
				// Valitse taulun rivi joka sisältää tämän viestin sisällön ja sivupalkin
				var tr=hide[0];

				// Lisää sivupalkkiin + ja - napit ja nimierkin pisteet
				var newElement = document.createElement('a');
				newElement.className="GMVote";
				pisteet=haePisteet(Nimimerkki);
				if (0==pisteet) pisteet="";
				newElement.innerHTML=
				'<span class="GMVotePlus" title="'+Nimimerkki+'">+</span>&nbsp;'+
				'<span class="GMVoteMinus" title="'+Nimimerkki+'">-</span><br>'+
				'<span class="GMVotePts" title="pisteet">'+pisteet+'</span>';
				if (tr) tr.appendChild(newElement);
				newElement=newElement.firstChild;
		}

		// Piilota viestit
		if(header[0]) {
			// Löytyikö viestille kirjoittaja?
			if (Nimimerkki) {
				// Jos pisteet -5 tai vähemmän, piilota
				if (pisteet<=-5) {
					// Hae viestin sisältö piilotettavaksi
					// jos sisältö löytyi, piilota se
					if (hide[0]) {
						// Valitse taulun rivi joka sisältää tämän viestin sisällön ja sivupalkin
						var tr=hide[0].parentNode;
						if (PiilotaOtsikkorivi) tr=tr.parentNode;
						// Piilota taulun rivi jos se löytyi
						if (tr) tr.style.display = 'none';
						// Hae tämän viestin alapalkki
						var hideb=getElementsByClassName("messagebox_footer",viesti);
						// Jos alapalkki löytyi, piilota myös sen sisältävä taulun rivi
						if (hideb[0]) {var tr2=hideb[0].parentNode;
							if (tr2) tr2.style.display = 'none';
						}
						// Lisää nappi, jolla sisällön saa takaisin näkyviin
						var newElement = document.createElement('div');
						// Napin sisältö joka hakee viestin osat sisältävät taulun rivit ja palauttaa ne näkyviin tai piilottaa uudelleen
						newElement.innerHTML='<a href="" onClick="javascript:var elem=this.parentNode;'+
						' do { elem = elem.nextSibling;} while(elem && elem.nodeType !== 1);'+
						' if (elem) {if (elem.style.display==\'none\') {elem.style.display=\'block\';}else{elem.style.display=\'none\';}} '+
						' do { elem = elem.nextSibling;} while(elem && elem.nodeType !== 1);'+
						' if (elem) {if (elem.style.display==\'none\') {elem.style.display=\'block\';}else{elem.style.display=\'none\';}} '+
						' return false;" >Näytä/piilota suodatettu viesti</a>';
						// Lisää näytä/piilota nappi sivulle ennen viestin sisältöä
						if (tr) tr.parentNode.insertBefore(newElement,tr);
					}
				}

				//	Korosta viestit
				if (pisteet>0) {
					// Hae viestin sisältö korostettavaksi
					var korosta=getElementsByClassName("messagebox_content",viesti);
					// jos sisältö löytyi, korosta se
					if (korosta[0]) {
						// Valitse asetuslistalta korostusväri pisteiden määrän mukaan
						if (pisteet>KorostusVari.length) pisteet=KorostusVari.length;
						korosta[0].style.backgroundColor=KorostusVari[pisteet-1];
					}
				} else if (pisteet<0) {
					// Hae viestin sisältö korostettavaksi
					var korosta=getElementsByClassName("messagebox_content",viesti);
					// jos sisältö löytyi, korosta se
					var tpist=-pisteet;
					if (korosta[0]) {
						// Valitse asetuslistalta korostusväri pisteiden määrän mukaan
						if (tpist>HimmennysVari.length) tpist=HimmennysVari.length;
						korosta[0].style.color=HimmennysVari[tpist-1];
					}
				}
			}
			// Nouki sivun viimeisen viestin tunnus ja ketjun tunnus tallennettavaksi
			if (allElements.length==(i+1)) {
				var footer=getElementsByClassName("messagebox_footer",viesti);
				if (footer[0]) {  		
					//alert(footer[0]);
					var messageID=findMessageID.exec(footer[0].innerHTML);
					var threadID=findThreadID.exec(footer[0].innerHTML);
				}
			}
		}
	} //<-- kaikkien viestien läpikäyntisilmukka
		
	// Jos viimeisin joskus aiemmin tässä ketjussa luettu viesti on tällä sivulla
	// siirrä ruutu sitä seuraavan viestin kohdalle
	// Hae sivun osoitteesta ketjun tunnusnumero
	var tmpthreadID=findThreadID.exec(window.location.href);
	if (tmpthreadID && tmpthreadID[1]) {
		// Jos numero löytyi, hae sen perusteella muistista viimeisen ketjusta näytetyn viestin tunnus
		var tmpmessageID=HaeViimeinenLuettu(tmpthreadID[1]);
		if (tmpmessageID) {		
			// hae kaikki sivun ankkurit ja linkit
			var ankkurit = document.getElementsByTagName('a');
			for (var i = 0; i < ankkurit.length; i++) {
				// Jos ankkurin nimi vastaa viimeksi luetun viestin tunnusta,
				if (ankkurit[i].name==tmpmessageID) {
					// etsi seuraavan viestin edessä oleva ankkuri
					for(var j=(i+1); j<ankkurit.length;j++) {
						// ankkurin erottaa linkistä, koska sillä on nimi ja ei ole linkin kohdetta
						if ((ankkurit[j].name) && (!ankkurit[j].href)) {
							var IkkunanYlalaitaan=true;
							// Siirrä ruutu ankkurin kohdalle niin, että se osuu ruudun ylälaitaan
							ankkurit[j].scrollIntoView(IkkunanYlalaitaan);
							// Oikea kohta löytyi, voi lopettaa
							break;
							// Miksi ei hypätty suoraan asettamalla sivun urlin perään #?
							// Jotta ei tarvitse painaa back nappia kahdesti
						}
					} 
				}
			}
		}		
	}
	
	// Tallenna aiemmin noukittu sivun viimeisimmän viestin tunnus tämän ketjun viimeisimmäksi luetuksi viestiksi
	if(messageID && messageID[1] &&threadID && threadID[1]) {
		var ketjunSivu=findStart.exec(window.location.href);
		var viestiNro=viestienLkm;
		if (ketjunSivu && ketjunSivu[1]) viestiNro-=-ketjunSivu[1];
		MerkitseLuetuksi(threadID[1],messageID[1],viestiNro,false);
		GM_registerMenuCommand('Unohda, että luin jo tätä ketjua',function() {MerkitseLuetuksi(threadID[1],"","",true);});
		GM_registerMenuCommand('En halua seurata tätä ketjua',function() {MerkitseLuetuksi(threadID[1],"","100000",true);});
	}
	
	
	// Jos ollaan Aihelistasivulla, hae parilliset ja parittomat aihelistarivit
	var aiheet=getElementsByClassName("jive-even");
	LinkitLukemattomiin(aiheet);
	aiheet=getElementsByClassName("odd");
	LinkitLukemattomiin(aiheet);
	
	// Lisää keskustelun aloitussivulle kunkin aiheen yhteyteen linkki: "Uusia X" 
	function LinkitLukemattomiin(aiheet) {
		for (var i=0;i<aiheet.length;i++) {
			var ketjuID=findThreadID.exec(aiheet[i].innerHTML);		
			if (ketjuID && ketjuID[1]) {
				var lkmE=getElementsByClassName("jive-msg-count",aiheet[i]);				
				if (lkmE[0]) {
					var vastauksiaKetjussa=trimmaa(lkmE[0].innerHTML);
					var aihe=getElementsByClassName("jive-thread-name",aiheet[i]);				
					if(aihe[0]) {					
						var luettuja=HaeLuettujenLkm(ketjuID[1]);					
						var viestiID=HaeViimeinenLuettu(ketjuID[1]);		
						var lukematta=vastauksiaKetjussa-(-1)-luettuja;
						var newElement = document.createElement('a');
						var luettuja15=parseInt(luettuja/15)*15;						
						newElement.href="thread.jspa?threadID="+ketjuID[1]+"&tstart=0"
						if (luettuja15>0) newElement.href+="&start="+luettuja15;//+"#"+viestiID; //http://keskustelu.kauppalehti.fi/5/i/keskustelu/message.jspa?messageID=3995696#3995696
						// Välillä palvelimen pääsivu antaa liian pieniä viestimääriä, tämä estää hämmentävät negatiiviset luetut
						if(lukematta<0) lukematta=0;
						newElement.innerHTML="Uusia&nbsp;"+lukematta;
						if (lukematta>0) {
							if (luettuja>0) {
								newElement.className="GMlukemattomia"; 
								//if (aihe[0]) aihe[0].appendChild(newElement);
								aihe[0].insertBefore(newElement,aihe[0].firstChild.nextSibling.nextSibling.nextSibling);
							} else {
								//newElement.innerHTML="Uusi";
								//newElement.className="GMuusi"; 
								//if (aihe[0]) aihe[0].insertBefore(newElement,aihe[0].firstChild);
							}							
						} else { 
							newElement.className="GMkaikkiluettu"; 
							var linkit=aiheet[i].getElementsByTagName("a");
							aiheet[i].className+=" GMkaikkiluettu";
							for (var j=0;j<linkit.length;j++) {
								linkit[j].className="GMkaikkiluettu";
							}
						}
					}
				}
			}		
		}
	}
		
	// Poista ylimääräiset välilyönnit tekstin alusta ja lopusta
	function trimmaa(str) { return str.replace(/^\s+|\s+$/g,""); }
	
	// Lisää sivulle lapsielementti after-lapsielementin perään
	function insertAfter(after, newNode ) {
		if (after.nextSibling) { 
			after.parent.insertBefore(newNode, after.nextSibling);
		} else {
			after.parent.appendChild(newNode)
		}
	}
	
	// Merkitse muistiin ketjun viimeinen luettu viesti ja luettujen lukumäärä
	// Pakolla=true asettaa tiedot myös vaikka ne olisivat tyhjät tai viestinumero olisi pienempi kuin viimeisin
	function MerkitseLuetuksi(threadID,messageID,lkm,pakolla) {		
		var o=Ketjut[threadID];	
		if (o!=null) {
			if (o[0]<messageID||pakolla) o[0]=messageID;
			if (o[1]<lkm||pakolla) o[1]=lkm;
		} else {
			o=[messageID,lkm];
			Ketjut[threadID]=o;
		}
		GM_setValue("ketjut",uneval(Ketjut));
	}
	
	// Hae ketjun viimeisen luetun viestin tunnusnumero
	function HaeViimeinenLuettu(threadID) {
		var o=Ketjut[threadID];
		if (o==null) return "";
		return o[0];
	}
	
	// Hae ketjun luettujen viestin lukumäärä
	function HaeLuettujenLkm(threadID) {
		var o=Ketjut[threadID];
		if (o==null) return "";
		return o[1];
	}
		
	function addGlobalStyle(css) {
		 var head, style;
		 head = document.getElementsByTagName('head')[0];
		 if (!head) { return; }
		 style = document.createElement('style');
		 style.type = 'text/css';
		 style.innerHTML = css;
		 head.appendChild(style);
	}

} //<-- RomInit() loppuu

// Hae sivulta annetun luokan lapsielementit luokan nimen perusteella
function getElementsByClassName(classname, node) {
	// Hae koko sivulta jos nodea ei annettu
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	// Käy läpi kaikki sivun elementit
	for(var i=0,j=els.length; i<j; i++)
		// jos elementti vastaa hakua lisää se listalle
		if(re.test(els[i].className))a.push(els[i]);
	return a;
}

function plussaa(nimi,vote) {
	var oli=false;
	var pisteet=vote;
	var oli=Nimimerkit[nimi];
	if (!isNaN(oli)) pisteet+=oli;
	Nimimerkit[nimi]=pisteet;
	GM_setValue("nimimerkit", uneval(Nimimerkit));
	return pisteet;
};

function nayta(box,pisteet) {
	var pts=getElementsByClassName("GMVotePts",box);
	pts[0].innerHTML=pisteet;
}

// Seuraa sivulla tapahtuvia + ja - painalluksia
document.addEventListener('click', clickf,false);

function clickf(event) {
	var t=event.target;
	if(!t) return;
	// Älä välitä muista painalluksista kuin + ja - nappeihin osuneista
	if("GMVotePlus"==t.className) { nayta(t.parentNode,plussaa(t.title,1));}
	if("GMVoteMinus"==t.className) { nayta(t.parentNode,plussaa(t.title,-1));}
};
RomInit=null;
// LOPPU
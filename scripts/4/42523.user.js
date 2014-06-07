// ==UserScript==
// @name           Cudownosci
// @namespace      http://userscripts.org/scripts/show/42523
// @include        http://s*.travian*.*/build.php*
// ==/UserScript==

//CEL:
/**
	Pomoc do określania problemów w dostawach surowców do Cudu (w szczególności zboża).
	
	1. pobieram aktualny stan spichlerzy
	2. wyznaczam aktualne zużycie (przeliczone na sekundy)
	3. sprawdzam na ile wystarczy aktualny zapas i...

	4a. jeżeli zapasu wystarczy do kolejnej dostawy - dodaję ilość zboża do aktualnego stanu i GoTo 2

	4b. jeżeli zapasu nie wystarczy do kolejnej dostawy - podaję czas od kiedy będzie brakować do kiedy (to będzie czas kolejnej dostawy) 
		po podaniu czasów znów GoTo 2

	Wynik: lista terminów kiedy nie wystarczy zboża. 
			Oczywiście nie uwzględnia nowych dostaw wojska, które przyjdą w tzw. międzyczasie. 
			Tu proponuję ustalić - dla skrypta - jakąś wartość graniczną, powiedzmy 10-20% pojemności spichlerzy. 
			To oczywiście spowoduje - na papierze - zwiększenie zapotrzebowania na cropa, ale w praktyce może się okazać przydatne :)
			
*/
window.addEventListener("load", function () {

var STALA_NAZWA_SKRYPTU="cudownosci"
var STALA_WERSJA_SKRYPTU="0.2.1"
var STALA_AKTUALNOSC_SKRYPTU="2009-02-22 20:42"
var infoWe=STALA_NAZWA_SKRYPTU + " [wersja: " + STALA_WERSJA_SKRYPTU + " - " + STALA_AKTUALNOSC_SKRYPTU + "]";
/** drewno, glina, żelazo, zboże w tablicach */
var tSurowcowAktualnie	= new Array(4);	//stan aktualny
var tSurowcowProdukcja	= new Array(4);	//produkcja na godzinę
var tSurowcowMagazyny	= new Array(4);	//pojemność magazynów
var tSurowcowNazwy		= new Array("DREWNO","GLINA","ŻELAZO","ZBOŻE");
var teraz = new Date();
	
var pelnyLog="\n"


/* MAIN - tu jest początek */

function main(){
	dodajDoLogu("START: " + infoWe + "\n\n");

	//GM_log("\tstart::wyznaczyć aktualne ilości dostępne");
	var tekst="";
	for(var i=0; i<4; i++) {
		var liniaSurowcow = document.getElementById("l" + (4-i));
		var tabSurMag = liniaSurowcow.innerHTML.split("/");
		
		tSurowcowAktualnie[i] = tabSurMag[0];
		tSurowcowMagazyny[i] = tabSurMag[1];
		tSurowcowProdukcja[i] = liniaSurowcow.title;
		
		tekst+="\n"+tSurowcowNazwy[i]+"\t"+tSurowcowAktualnie[i]+"\t"+tSurowcowMagazyny[i]+"\t"+tSurowcowProdukcja[i];
	}
	//GM_log("\n\n[stan aktualny]: "+tekst);
	//GM_log("\tstop ::wyznaczyć aktualne ilości dostępne");

	if (czyToRynek()) {	//czy to rynek?
		//GM_log("TO JEST RYNEK");
		sprawdzmyDostawy();
	}
	dodajMenuInformacjiOSkrypcie();
	dodajDoLogu("\n\nSTOP : " + infoWe);
	GM_log(pelnyLog + "\n ");
}

/* MAIN - tu jest koniec */


/**
* dodajMenuInformacjiOSkrypcie
*/
function dodajMenuInformacjiOSkrypcie() {
	GM_registerMenuCommand("Informacje o '" + STALA_NAZWA_SKRYPTU + "' wersja " + STALA_WERSJA_SKRYPTU, function(e) {
		var instrukcja="Podaję informację o aktualnym stanie zboża.\nAnalizowane są dostawy do osady.\n\nWYNIKI ZAPISANE SĄ W LOGU Greasemonkey.\n";
			instrukcja+="\nI N S T R U K C J A\n\t0. Wejdź do rynku w monitorowanej osadzie.\n\t1. Uruchom konsolę błędów.\n\t2. Wyczyść aktualnie wyświetlane informacje.";
			instrukcja+="\n\t3. Odśwież stronę rynku.\n\n\t4. Wynik zapisany jest w konsoli błędów\n"; 
		alert(instrukcja + "\n\n\t\tskrypt: " + STALA_NAZWA_SKRYPTU + "\n\t\twersja: " + STALA_WERSJA_SKRYPTU + "\n\t\tautor: AndySad");
	});
}

function dodajDoLogu(informacja){
	pelnyLog+="\n" + informacja;
}

function doKiedy(dodajSekundy){
	return godzina=czasWSekundach(teraz.getHours()+":"+teraz.getMinutes()+":"+teraz.getSeconds()) + dodajSekundy;
}
function doKiedyCzytelnie(dodajSekundy){
	var godzina=doKiedy(dodajSekundy);
	return czasCzytelnie(godzina);
}

function poszukajDziur(zbozeWMagazynie,zbozePojemnosc,zbozeProdukcjaNaGodzine,tabDostawCzas,tabDostawZboze){
/*
1. pobieram aktualny stan spichlerzy //@zbozeWMagazynie
2. wyznaczam aktualne zużycie (przeliczone na sekundy) 
3. sprawdzam na ile wystarczy aktualny zapas i...
4a. jeżeli zapasu wystarczy do kolejnej dostawy - dodaję ilość zboża do aktualnego stanu i GoTo 2
4b. jeżeli zapasu nie wystarczy do kolejnej dostawy - podaję czas od kiedy będzie brakować 
	do kiedy (to będzie czas kolejnej dostawy) po podaniu czasów znów GoTo 2

wynikiem będzie - oby pusta - lista terminów kiedy nie wystarczy zboża. 
Oczywiście nie uwzględnię nowych dostaw wojska, które przyjdą w tzw. międzyczasie. 
Tu proponuje ustalić - dla skrypta - jakąś wartość graniczną, powiedzmy 10-20% pojemności spichlerzy. 
To oczywiście spowoduje - na papierze - zwiększenie zapotrzebowania na cropa, ale w praktyce może się okazać przydatne :)
*/
	//GM_log("START:: \tposzukajDziur(" + zbozeWMagazynie + "," + zbozePojemnosc + "," + zbozeProdukcjaNaGodzine + ",[" + tabDostawCzas + "],[" + tabDostawZboze + "])");
		
	if (zbozeProdukcjaNaGodzine <0 ){
		var zuzycieNaSekunde=Math.abs(zbozeProdukcjaNaGodzine / 3600); 	//ad. 2
		var minZapasow=0.0;
		var naIleWystarczy=parseInt(zbozeWMagazynie/zuzycieNaSekunde);
		var naIleCiagleDostawy=0;
		var naIleWystarczyDostawa=0;
		var nieciagleDostawy="";
		var ileTrwaDziura=0
		var kiedySkonczySieZboze=0;
		var ciagleNieciagleDostawy="";
		var ileWDostawach=0;
		
		var brakujeOd=0;
				
		for (var i=0; i<tabDostawCzas.length; i++){
			//GM_log("\t\t--> poszukajDziur::for[1]::" + i + "::" + czasCzytelnie(tabDostawCzas[i]) + "::" + tabDostawZboze[i]);
			naIleWystarczy=parseInt(zbozeWMagazynie/zuzycieNaSekunde);	//ad. 3
			naIleWystarczyDostawa=parseInt(parseInt(tabDostawZboze[i])/zuzycieNaSekunde);
			brakujeDo=parseInt(tabDostawCzas[i]);
				
			if (naIleWystarczy >= parseInt(tabDostawCzas[i])){ 			//ad. 4a
				//GM_log("\t\t\t--> poszukajDziur::if[1]::wystarczy na " + czasCzytelnie(naIleWystarczy) + " [czyli do " + doKiedyCzytelnie(naIleWystarczy) + "]");
				zbozeWMagazynie=parseInt(zbozeWMagazynie) + parseInt(tabDostawZboze[i]);
				naIleWystarczy=parseInt(zbozeWMagazynie/zuzycieNaSekunde);	//ad. 3
				naIleCiagleDostawy=naIleWystarczy;
				kiedySkonczySieZboze=naIleCiagleDostawy;
				
				//GM_log("\t\t\t<-- poszukajDziur::if[1]::wystarczy; dodano już do stanu zboze z dostawy nr " + (i+1) + "; aktualny stan magazynu: " + zbozeWMagazynie);
			}
			else { 	//będzie dziura										//ad. 4b
				//GM_log("--> poszukajDziur::else[1]::"+czasCzytelnie(tabDostawCzas[i]) + "::" + tabDostawZboze[i]);
				/**
				* 	nastepna dostawa przyjdzie.
				*	czyDojdzie zanim skonczy się poprzednie zboże:
				*		T: dodać nowa dostawę, przeliczyć na ile wystarczy
				*		N: przeliczyć na ile wystarczy
				*/
				
				if (kiedySkonczySieZboze>=brakujeDo) { //
					//GM_log("{0001}::następna dostawa ["+i+"] dojdzie na czas ::"+kiedySkonczySieZboze+">="+brakujeDo);
					ileWDostawach+=parseInt(tabDostawZboze[i]);
					naIleWystarczaDostawy=parseInt(ileWDostawach/zuzycieNaSekunde);
				}
				else {
					//GM_log("{0001}::następna dostawa ["+i+"] nie dojdzie na czas ::"+kiedySkonczySieZboze+"<"+brakujeDo);
					brakujeOd=kiedySkonczySieZboze;
					ileWDostawach=parseInt(tabDostawZboze[i]);
					naIleWystarczaDostawy=parseInt(ileWDostawach/zuzycieNaSekunde);
					ileTrwaDziura=Math.abs(brakujeDo-brakujeOd);
					nieciagleDostawy+="\nod "+ doKiedyCzytelnie(brakujeOd)+ " braki zboża przez "+czasCzytelnie(ileTrwaDziura)+";";	
				}
				kiedySkonczySieZboze=brakujeDo+naIleWystarczyDostawa;
				
				
				//nieciagleDostawy+="; kolejna dostawa wystarczy na "+czasCzytelnie(naIleWystarczyDostawa)+" do "+doKiedyCzytelnie(kiedySkonczySieZboze);
				
				//GM_log("{002}::"+czasCzytelnie(kiedySkonczySieZboze));
			}
			//GM_log("<-- poszukajDziur::for[1]::" + i + "::" + tabDostawCzas[i] + "::" + tabDostawZboze[i]);
		}
		var podsumujmy="PODSUMOWANIE ZAOPATRZENIA ZBOŻOWEGO:\n";
			podsumujmy+="["+teraz.getHours()+":"+teraz.getMinutes()+":"+teraz.getSeconds()+"]";
			podsumujmy+="\nciągłość dostaw zboża zapewniona przez "+czasCzytelnie(naIleCiagleDostawy);
			podsumujmy+=" [do "+doKiedyCzytelnie(naIleCiagleDostawy)+"]\n";
			podsumujmy+=nieciagleDostawy;
			podsumujmy+="\n\n!!! OD "+doKiedyCzytelnie(kiedySkonczySieZboze)+" CAŁKOWICIE BRAKUJE DOSTAW ZBOŻA!!!";
		
		dodajDoLogu(podsumujmy);
	}
	else {
		dodajDoLogu("Nie ma problemów ze zbożem.\nProdukcja wynosi: " + zbozeProdukcjaNaGodzine + "/godz.");
	}
	//GM_log("STOP :: \tposzukajDziur()");
}
function sprawdzmyDostawy(){
	//GM_log("START::\tsprawdzmyDostawy()");
	//każdy z handlarzy rozłozony jest na tablice:
	var dostawyCzas 	= new Array();
	var dostawyDrewna 	= new Array();
	var dostawyGliny 	= new Array();
	var dostawyZelaza 	= new Array();
	var dostawyZboza 	= new Array();
	//wszyscy handlarze w drodze z/do osady
	var handlarzeOrazNazwyGrup = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
	//może nikt nie przybywa, ani nie wybywa?
	//GM_log("start::\tsprawdzmyDostawy()[1]: " + handlarzeOrazNazwyGrup.snapshotLength);
	if (handlarzeOrazNazwyGrup.snapshotLength == 0) { 
		//GM_log("start::\tsprawdzmyDostawy()[2]");
		return; 
	}
	//teraz bierzemy tylko takich co coś przynoszą :)
	//GM_log("start::\tsprawdzmyDostawy()[3]: " + handlarzeOrazNazwyGrup.snapshotItem(0).textContent);
	//if (handlarzeOrazNazwyGrup.snapshotItem(0).textContent != "Przybywający handlarze:") {
	var info=handlarzeOrazNazwyGrup.snapshotItem(0).textContent
	if (info.substring(0,12)!= "Przybywający") {
		//GM_log("start::\tsprawdzmyDostawy()[4]");
		//poszukajDziur(zbozeWMagazynie,zbozePojemnosc,zbozeProdukcjaNaGodzine,tabDostawCzas,tabDostawZboze)
		poszukajDziur(tSurowcowAktualnie[3],tSurowcowMagazyny[3],tSurowcowProdukcja[3],dostawyCzas, dostawyZboza);
		 
		return; 
	}
	//zbieramy informacje o dostawach
	
	//każdy z dostawców podaje informację o czasie dostawy oraz ilościach poszczególnych surowców
	for(var i=1; i<handlarzeOrazNazwyGrup.snapshotLength; i++) {
		var tablicaHandlarzy = handlarzeOrazNazwyGrup.snapshotItem(i);
		//GM_log("start::\tsprawdzmyDostawy()[5]: for(i=" + i + ")" + tablicaHandlarzy);
		//for(var x=0;x<tablicaHandlarzy.length;x++){
		//	GM_log("start::\tsprawdzmyDostawy()[5]: for(i=" + i + ")(x=" + x + ")" + tablicaHandlarzy(x));
		//}
		if (tablicaHandlarzy.nodeName == "P") { break; } //???
		var czasDostawy = tablicaHandlarzy.childNodes[1].childNodes[2].childNodes[1].childNodes[0].innerHTML;
			dostawyCzas[i-1] = czasWSekundach(czasDostawy);
		
		var niesioneSurowce = tablicaHandlarzy.lastChild.lastChild.lastChild.lastChild;
		//GM_log("[6] "+tablicaHandlarzy.lastChild.lastChild.lastChild.lastChild);
			dostawyDrewna[i-1] = parseInt(niesioneSurowce.childNodes[1].nodeValue.replace("|", ""));
			dostawyGliny[i-1] = parseInt(niesioneSurowce.childNodes[3].nodeValue.replace("|", ""));
			dostawyZelaza[i-1] = parseInt(niesioneSurowce.childNodes[5].nodeValue.replace("|", ""));
			dostawyZboza[i-1] = parseInt(niesioneSurowce.childNodes[7].nodeValue.replace("|", ""));	
	}
	//GM_log("start::\tsprawdzmyDostawy()[6]\tdocierające dostawy:: \n\n\t\t\tczasy: \t\t" + dostawyCzas
	//		+ "\n\t\t\tdrewno: \t" + dostawyDrewna
	//		+ "\n\t\t\tglina : \t" + dostawyGliny
	//		+ "\n\t\t\tżelazo: \t" + dostawyZelaza
	//		+ "\n\t\t\tzboże : \t" + dostawyZboza);
	
	poszukajDziur(tSurowcowAktualnie[3],tSurowcowMagazyny[3],tSurowcowProdukcja[3],dostawyCzas, dostawyZboza);
	
	//GM_log("STOP ::\tsprawdzmyDostawy()");
}
function czyToRynek(){
	//GM_log("START::czyToRynek()");
	var url=document.location.href;
	if (url.search(/build\.php/) != -1) {
		//GM_log("start::czyToRynek()[1]: "+url);
		var maps = xpathEvaluate('//map[contains(@name, "map")]');
		if (! (maps.snapshotLength == 2)) {
			//GM_log("start::czyToRynek()[2]: " + maps);
			var tParam = podajParametrURL(document.location.href, "t");
			if (!tParam) {
				//GM_log("start::czyToRynek()[3]: " + tParam);
				var destinationPlayerLink = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr[@class="left"]/td/a[contains(@href, "uid")]');
				if (destinationPlayerLink.snapshotLength == 0) {
					//GM_log("start::czyToRynek()[4]: " + destinationPlayerLink);
					return xpEval('//input[contains(@class, "fm")]').snapshotLength == 7;
				}
				//GM_log("stop ::czyToRynek()[3]");
			}
			//GM_log("stop ::czyToRynek()[2]");
		}
		//GM_log("stop ::czyToRynek()[1]");
	}
	return false;
	//GM_log("STOP ::czyToRynek()");
}
function czasCzytelnie(ileSekund) {
	var d = Math.floor((ileSekund/86400));
	var h = Math.floor((ileSekund%86400)/3600);
	var m = Math.floor((ileSekund%3600)/60);
	var s = Math.floor((ileSekund%60));
	var txtTime = "";
	//if (d!=0) {	
	//	txtTime += d + ", " + ((h<10)?"0":"");
	//}
	if (d!=0) {
		if (d==1){
			//txtTime += d + " dzień i ";
			txtTime += " jutra, godzina ";
		}
		else if (d==2){
			txtTime += " pojutrza, godzina ";
		}
		else if (d>1){
			txtTime += d + " dni i ";
		} 
		//txtTime += d + ", " + ((h<10)?"0":"");
	}
	txtTime += "" + (h) + ":" + ((m < 10)?("0"+m):m) + ":" + ((s < 10)?("0"+s):s);
	return txtTime;
}

function czasWSekundach(txt) { 
	//GM_log("[[10]]: "+txt);
	var t = txt.split(":"); 
	
	var v = (3600 * parseInt(t[0])) + (60 * parseInt(t[1])) + (1 * parseInt(t[2]));
	return v; 
}

function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}
function xpEval(xpathExpr) { return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }

function podajParametrURL(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
		 	res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}




main();


},false);
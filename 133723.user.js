// ==UserScript==
// @name           Narzędzie nauki
// @namespace      http://userscripts.org/users/look997
// @description    Narzędzie nauki języka
// @include        *translate.google.pl*
// @version        0.1
// ==/UserScript==

var $ = function(selector,context){return(context||document).querySelector(selector)};
if (arguments.callee.done) { return; }
arguments.callee.done = true;


if($("body").getAttribute("alt") != "stop"){
function callback() { // GŁÓWNA FUNKCJA
var lh = location.hash;
if($("body").getAttribute("alt") != "stop" && lh != '' && location.hash.replace('|','') == location.hash){
	/*
	zdania: znika jedna lisa a druga zamienia się na inputy, przyciski zamień, test, błędy znikają, po prawej pojawia się zdanie (raczej sama dźwięk powinien być)
	dodawacz nowych tematów i części(częściowo)
	//cloneNode dla li i inputów z pętli
	dodanie tekstu nieuzupełnienia do pustych pól formularza po sprawdzeniu testu (dla wszystkich inputów placeholder="puste" z color: red;)
	dodanie tymczasowo do title inputów prawidłowych odpowiedzi
	podmiana wyglądu menu wyboru tematu
	spróbowanie dodania czytacza
	dodanie Google Translate pod menu (poprzez AJAX)
	dodanie title="ukryte na czas testu" tylko jeśli jakiś styl od przewijania jest aktywowany, czyli gdy skośny napis się nie mieści
	*/
	ladStruktur(); // ładowanie struktury fiszki
	
	nazStr = "| "+document.title; // nazwa strony
	secDzEl = $("#kontener .secdz"); 
	window.secDzDoK = secDzEl.cloneNode(true); // kopia struktury działu
	
	teEl = [];
	
	document.onkeydown = przechwyc; // tylko do enter w formularzu
	
	for(ii=0; ii<JSON.parse(localStorage.getItem("nazTematy")).length; ii++){ // generowanie menu wyboru tematów
		var optionMenuT = document.createElement("option");
		optionMenuT.name = JSON.parse(localStorage.getItem("nazTematy"))[ii];
		optionMenuT.appendChild(document.createTextNode(JSON.parse(localStorage.getItem("tematy"))[ii]));
		$("#tematy").appendChild(optionMenuT);		
	}
	
	pRazMenu(); // pierwszy raz	generowanie menu działów
	window.onpopstate = pRazMenu; // śledzenie zmiany adresu i generowanie menu działów
	
	
	$("#tematy").addEventListener("click", function(event){ // wybór tematu
		if(event.target.tagName == "OPTION" && event.target.name != $('#podglowek').name){
			genMenu(event.target.name);
		}
	}, false);
	
	$("#nav menu").addEventListener("click", function(event){ // wybór części
		etpn = event.target.name;
		if(JSON.parse(localStorage.getItem(etpn+"En")) == null || etpn == $("#kontener").name){
			event.preventDefault();
		}
	}, false);
	
	
	
	// Dodawanie elementów
	$("#nav .dodTem").addEventListener("click", dodTem, false);
	$("#nav .zapTem").addEventListener("click", zapTem, false);
	
	
	$(".dodDzial .naraz").addEventListener("click", narazF, false);
	$(".dodDzial .osobno").addEventListener("click", osobnoF, false);
	$(".dodDzial .zapDz").addEventListener("click", zapiszDzial, false);
	$(".dodDzial .edyDz").addEventListener("click", edytujDzial, false);
	$(".dodDzial .anuEDz").addEventListener("click", anuEDzial, false);
	
	
	
	// element w banelu prawym
	$("#nav").appendChild($("#gt-form-c"));
	$("body").appendChild($("#gt-ft"));
	
	
	$("#gt-form-c").className = "tracos";
	
	
$("body").setAttribute("alt", "stop");
$("#fiszstart").style.display = "none";}
}

function pRazMenu() { // generowanie menu działów
	var lh = location.hash;
	lh = lh.replace("#","");
	lh = lh.split("/");
	//alert(location.hash.replace('|','') != location.hash);
	if(
	  (
		  location.hash != '' || location.hash.replace('|','') != location.hash
	  ) &&
	  (
		  (
			$(".secdz:first-of-type") &&
			!($(".secdz:first-of-type").id)
		  ) ||
		  (
			lh[1] &&
			$(".secdz:first-of-type") &&
			$(".secdz:first-of-type").id &&
			localStorage.getItem("dzial"+lh[1]) &&
			$(".secdz:first-of-type").id.replace("sec", "") != JSON.parse(localStorage.getItem("dzial"+lh[1]))[0]
		  )
	  )
	  ) {
		genMenu(lh[0]);
		$("html").setAttribute("alt", "praz");
	} else 
	if(( location.hash == '' || location.hash.replace('|','') != location.hash) && ($(".secdz:first-of-type") && $(".secdz:first-of-type").id)){
		history.replaceState({module:"leave"}, document.title, "#"+"angielski"+"/"+$(".secdz:first-of-type").id.replace("sec", ""));
	} else  
	if(( lh == '' || location.hash.replace('|','') != location.hash)){
		genMenu(JSON.parse(localStorage.getItem("nazTematy"))[0]); // domyślnie
	}
	
}

function genMenu(nazTemat) {
	var lh = location.hash;
	lh = lh.replace("#","");
	lh = lh.split("/"); 
	if(JSON.parse(localStorage.getItem("nazCz"+nazTemat))){
		$("#nav menu").innerHTML = "";
		for(ii=0; ii<JSON.parse(localStorage.getItem("nazCz"+nazTemat)).length; ii++){
			var liMenu = document.createElement("li");
			var aMenu = document.createElement("a");
			aMenu.name = JSON.parse(localStorage.getItem("nazCz"+nazTemat))[ii];
			aMenu.href = "#"+nazTemat+"/"+JSON.parse(localStorage.getItem("nazCz"+nazTemat))[ii];
			aMenu.appendChild(document.createTextNode(JSON.parse(localStorage.getItem("cz"+nazTemat))[ii]))
			liMenu.appendChild(aMenu);
			$("#nav menu").appendChild(liMenu);
		}
		
		var lh = location.hash;
		lh = lh.replace("#","");
		lh = lh.split("/");
		if(location.hash == "" || !(JSON.parse(localStorage.getItem("dzial"+lh[1]))) ){
			genWebFisz(JSON.parse(localStorage.getItem("nazCz"+nazTemat))[1]); $("#kontener").name = JSON.parse(localStorage.getItem("nazCz"+nazTemat))[1]; // domyślny
			//location.hash = nazTemat+"/"+JSON.parse(localStorage.getItem("nazCz"+nazTemat))[1];
			history.replaceState({module:"leave"}, document.title, "#"+nazTemat+"/"+JSON.parse(localStorage.getItem("nazCz"+nazTemat))[1]);
			indexT = JSON.parse(localStorage.getItem("nazTematy")).indexOf(nazTemat);
			document.title = JSON.parse(localStorage.getItem("cz"+nazTemat))[1]+" - "+JSON.parse(localStorage.getItem("tematy"))[indexT]+" "+nazStr;
			//alert("Adres: "+location.href+" nie istnieje, przekierowano na stronę główną działu.");
		} else {
			genWebFisz(lh[1]); $("#kontener").name = lh[1];
			//alert('f');
			history.replaceState({module:"leave"}, document.title, "#"+nazTemat+"/"+lh[1]);
			indexCz = JSON.parse(localStorage.getItem("nazCz"+nazTemat)).indexOf(lh[1]);
			indexT = JSON.parse(localStorage.getItem("nazTematy")).indexOf(nazTemat);
			document.title = JSON.parse(localStorage.getItem("cz"+nazTemat))[indexCz]+" - "+JSON.parse(localStorage.getItem("tematy"))[indexT]+" "+nazStr;
		}
		
		
		$('#podglowek').name = nazTemat;
	} else {
		indexT = JSON.parse(localStorage.getItem("nazTematy")).indexOf(lh[0]);
		$("#tematy").options[indexT].selected = true;
	}
}

function genWebFisz(nazCzesci){
	
	klaDod("#article .dodDzial", "niewidoczne");
	var tymDzEn = JSON.parse(localStorage.getItem(nazCzesci+"En"));
	var tymDzPl = JSON.parse(localStorage.getItem(nazCzesci+"Pl"));
	
	$("#article").removeChild($("#kontener"));
	nzk = document.createElement("div");
	nzk.id = "kontener";
	$("#article").appendChild(nzk);
	
	for(ii = 1; ii<=tymDzEn.length; ii++){
		teEl[ii] = secDzDoK.cloneNode(true);
		$("#kontener").appendChild(teEl[ii]);
		
		var tymDzial = JSON.parse(localStorage.getItem("dzial"+nazCzesci));
		$("#kontener > .secdz:nth-of-type("+ii+")").id = tymDzial[(ii-1)]+"sec";
		$("#kontener > .secdz:nth-of-type("+ii+") > .elnarz:nth-of-type(1)").id = tymDzial[ii-1];
		$("#kontener > .secdz:nth-of-type("+ii+") > h1:nth-of-type(1)").appendChild(document.createTextNode(JSON.parse(localStorage.getItem("nazDzialy"+nazCzesci))[ii-1]));
		
		for(to=1; tymDzEn[ii-1].length >=to; to++){
			var liEn = document.createElement("li");
			var liPl = document.createElement("li");
			var liInEn = document.createElement("li");
			var liInPl = document.createElement("li");
			var liInputEn = document.createElement("input");
			var liInputPl = document.createElement("input");
			
			liInputEn.setAttribute("x-webkit-speech","x-webkit-speech");
			liInputPl.setAttribute("x-webkit-speech","x-webkit-speech");
			liInEn.className = liInPl.className = liEn.className = liPl.className = "list";
			
			liInEn.appendChild(liInputEn);
			liInPl.appendChild(liInputPl);
			$("#kontener > .secdz:nth-of-type("+ii+") .listdz.endz .inputlist").appendChild(liInEn);
			$("#kontener > .secdz:nth-of-type("+ii+") .listdz.pldz .inputlist").appendChild(liInPl);
			

			liEn.appendChild(document.createTextNode(tymDzEn[ii-1][to-1]));
			liPl.appendChild(document.createTextNode(tymDzPl[ii-1][to-1]));
			liEn.addEventListener("mouseover", doCzytania, false);
			liPl.addEventListener("mouseover", doCzytania, false);
			liEn.addEventListener("mouseout", zCzytania, false);
			liPl.addEventListener("mouseout", zCzytania, false);
			$("#kontener > .secdz:nth-of-type("+ii+") .listdz.endz:nth-of-type(1) .textlist:nth-of-type(1)").appendChild(liEn);
			$("#kontener > .secdz:nth-of-type("+ii+") .listdz.pldz .textlist").appendChild(liPl);
		}
		
		$("#kontener > .secdz:nth-of-type("+ii+") .za").innerHTML += JSON.parse(localStorage.getItem(nazCzesci+"PoFisz"))[ii-1];
		$("#kontener > .secdz:nth-of-type("+ii+") .przed").innerHTML += JSON.parse(localStorage.getItem(nazCzesci+"PrzedFisz"))[ii-1];
		
		var IdEl = "#"+tymDzial[ii-1];
		wymEl(IdEl); // Wyrównuje szerokości przycisków nad listami i list
		werPattern(IdEl); // dodaje walidację słowa do każdego inputa
		
		$(IdEl+" .losBut").addEventListener("click", losSort, false);
		$(IdEl+" .porzBut").addEventListener("click", porzSort, false);
		$(IdEl+" .zamEnPlBut").addEventListener("click", zamEnPl, false);	
		$(IdEl+" .testBut").addEventListener("click", testDz, false);
		$(IdEl+" .sprawdzBut").addEventListener("click", sprawdzDz, false);
		$(IdEl+" .zapBut").addEventListener("click", zapiszDz, false);
		$(IdEl+" .nZapBut").addEventListener("click", anulujDz, false);
		$(IdEl+" .zazBledyBut").addEventListener("click", zazBledyDz, false);
		$(IdEl+" .bezBledowBut").addEventListener("click", bezBledowDz, false);
		
	}
}

function zamEnPl(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	klaZmien(inId+":not(.trwaTest) .endz", "defUkr");
	klaZmien(inId+":not(.trwaTest) .pldz", "defUkr");
	klaZmien(inId, "zamEnPl");
}

function zazBledyDz(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
		
	if (!(localStorage.getItem("infiniteScrollEnabled") == true || localStorage.getItem("infiniteScrollEnabled") == false)) {
		// init variable/set default variable for item
		//localStorage.getItem("test"+inId, tabInvalid);
		lstpl = localStorage.getItem("testpl"+inId);
		lsten = localStorage.getItem("testen"+inId);
		
		if(lstpl){
		klaDod(inId+ " .zazBledyBut", "niewidoczne");
		klaKas(inId+ " .bezBledowBut", "niewidoczne");
		tabTestWynikpl = lstpl.split(",");
		
		var liczEl = document.querySelectorAll(inId+" .pllist .list").length;
		for(var nrInval = 1; nrInval <= liczEl; nrInval++){
			if(tabTestWynikpl[nrInval] == "nie"){
				klaDod(inId+ ".elnarz:not(.trwaTest) .slowek .pldz .textlist li:nth-of-type("+nrInval+")", "kolBledu");
			} else {
				klaDod(inId+ ".elnarz:not(.trwaTest) .slowek .pldz .textlist li:nth-of-type("+nrInval+")", "kolPoprawny");
			}
		}
		
		klaDod(inId+ ".elnarz .slowek", "zazBledy");
		}
		if(lsten){
		klaDod(inId+ " .zazBledyBut", "niewidoczne");
		klaKas(inId+ " .bezBledowBut", "niewidoczne");
		tabTestWyniken = lsten.split(",");
		
		var liczEl = document.querySelectorAll(inId+" .enlist .list").length;
		for(var nrInval = 1; nrInval <= liczEl; nrInval++){
			if(tabTestWyniken[nrInval] == "nie"){
				klaDod(inId+ ".elnarz:not(.trwaTest) .slowek .endz .textlist li:nth-of-type("+nrInval+")", "kolBledu");
			} else {
				klaDod(inId+ ".elnarz:not(.trwaTest) .slowek .endz .textlist li:nth-of-type("+nrInval+")", "kolPoprawny");
			}
		}
		
		klaDod(inId+ ".elnarz .slowek", "zazBledy");
		}
	} else {var varLog = 'Nie zaznaczę błędów z poprzednich testów ponieważ localStorage jest wyłączone.'; cosole.log(varLog); alert(varLog);}
}

function bezBledowDz(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	klaKas(inId+ " .zazBledyBut", "niewidoczne");
	klaDod(inId+ " .bezBledowBut", "niewidoczne");
	klaKas(inId+ ".elnarz .slowek", "zazBledy");
}

function testDz(event) {inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	klaDod(inId+ ".elnarz", "trwaTest");
	
	losSort(event);
	ukryjList(event);
	
	$(inId+' .listdz.defUkr input[tabindex="1"]').focus();
	klaKas(inId+ " .porzBut", "niewidoczne");
	klaDod(inId+ " .testBut", "niewidoczne");
	klaKas(inId+ " .sprawdzBut", "niewidoczne");
	klaKas(inId+ " .nZapBut", "niewidoczne");
	klaDod(inId+ " .zazBledyBut", "niewidoczne");
	klaDod(inId+ " .bezBledowBut", "niewidoczne");
	klaKas(inId+ ".elnarz .slowek", "zazBledy");
	klaDod(inId+ "sec.secdz", "ukryte");
	$(inId+"sec .przed").setAttribute("title", "ukryte na czas testu");
	$(inId+"sec .za").setAttribute("title", "ukryte na czas testu");
	
}

function sprawdzDz(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	klaDod(inId+ " .slowek", "sprawdz");
	
	var liczEl = document.querySelectorAll(inId+" .pllist .list").length;
	tabInvalid = [];
	
	for(nrInval = 1; nrInval <= liczEl; nrInval++){
		if($(inId+ ".elnarz .slowek.sprawdz .defUkr .inputlist li:nth-of-type("+nrInval+") input").value != "" &&
		   $(inId+ ".elnarz .slowek.sprawdz .defUkr .inputlist li:nth-of-type("+nrInval+") input:valid") != null){
			tabInvalid[nrInval] = 'tak';
		} else if($(inId+ ".elnarz .slowek.sprawdz .defUkr .inputlist li:nth-of-type("+nrInval+") input").value == "" ||
				  $(inId+ ".elnarz .slowek.sprawdz .defUkr .inputlist li:nth-of-type("+nrInval+") input:invalid") != null){
			tabInvalid[nrInval] = 'nie';
		}
	}
	
	klaDod(inId+ " .sprawdzBut", "niewidoczne");
	klaKas(inId+ " .zapBut", "niewidoczne");
}

function zapiszDz(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	
	if (!(localStorage.getItem("infiniteScrollEnabled") == true || localStorage.getItem("infiniteScrollEnabled") == false)) {
		// init variable/set default variable for item
		if(klaJest(inId+ ".elnarz .slowek.sprawdz .defUkr","pldz")){
			localStorage.setItem("testpl"+inId, tabInvalid);
		}
		if(klaJest(inId+ ".elnarz .slowek.sprawdz .defUkr","endz")){
			localStorage.setItem("testen"+inId, tabInvalid);
		}
	} else {var varLog = 'Wynik nie zostanie zapisany ponieważ localStorage jest wyłączone.'; cosole.log(varLog); alert(varLog);}
	zapAnuDz(event);
}

function anulujDz(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	zapAnuDz(event);
}

function zapAnuDz(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	klaKas(inId+ " .slowek", "sprawdz");
	$(inId+" form").reset();
	
	klaDod(inId+ " .sprawdzBut", "niewidoczne");
	klaKas(inId+ " .testBut", "niewidoczne");
	klaDod(inId+ " .zapBut", "niewidoczne");
	klaDod(inId+ " .nZapBut", "niewidoczne");
	klaKas(inId+ ".elnarz", "trwaTest");
	klaKas(inId+ " .zazBledyBut", "niewidoczne");
	klaKas(inId+ "sec.secdz", "ukryte");
	$(inId+"sec .przed").removeAttribute("title");
	$(inId+"sec .za").removeAttribute("title");
	porzSort(event);
	ukryjList(event);
	klaDod(inId+".zamEnPl .endz", "defUkr");
	klaKas(inId+".zamEnPl .pldz", "defUkr");	
	klaKas(inId+":not(.zamEnPl) .endz", "defUkr");
	klaDod(inId+":not(.zamEnPl) .pldz", "defUkr");
}

function shuffle(A,i) {
	for(i=A.length;i;A.push(A.splice(~~(Math.random()*(i--)),1)));
}

function genTab(liczb){ // Generuje określoną liczbę komórek z kolejnymi liczbami od 1 w górę
	var tab = [];
	for (l=1; l<=liczb; l++){
		tab[l-1] = l;
	}
	return tab;
}

function losSort(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id; // Losowo sortuje elementy listy
	liczEl = document.querySelectorAll(inId+" .enlist .list").length;
	
	shuffle(lTab=genTab(liczEl));
	
	for(inI = 1; inI<=liczEl; inI++){
		inIT = inI-1;
		$(inId+" .enlist .list:nth-of-type("+inI+")").style.webkitBoxOrdinalGroup = 
		$(inId+" .pllist .list:nth-of-type("+inI+")").style.webkitBoxOrdinalGroup = 
		$(inId+" .eninput .list:nth-of-type("+inI+")").style.webkitBoxOrdinalGroup = 
		$(inId+" .plinput .list:nth-of-type("+inI+")").style.webkitBoxOrdinalGroup = lTab[inIT];
		$(inId+" .enlist .list:nth-of-type("+inI+")").style.MozBoxOrdinalGroup = 
		$(inId+" .pllist .list:nth-of-type("+inI+")").style.MozBoxOrdinalGroup = 
		$(inId+" .eninput .list:nth-of-type("+inI+")").style.MozBoxOrdinalGroup = 
		$(inId+" .plinput .list:nth-of-type("+inI+")").style.MozBoxOrdinalGroup = lTab[inIT];
		$(inId+" .eninput .list:nth-of-type("+inI+")").firstChild.setAttribute("tabindex", lTab[inIT]);
		$(inId+" .plinput .list:nth-of-type("+inI+")").firstChild.setAttribute("tabindex", lTab[inIT]);
	}
	$(inId+" .sprawdzBut").setAttribute("tabindex", inI+1); // mało istotne
	
	klaDod(inId+" .slowek", "shuffle");
	klaDod(inId+" .losBut", "niewidoczne");
	klaKas(inId+" .porzBut", "niewidoczne");	
}

function porzSort(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id; // Porządkuje elementy listy
	var liczEl = document.querySelectorAll(inId+" .enlist .list").length;
	
	if(klaJest(inId+" .slowek","shuffle")){
		for(inI = 1; inI<=liczEl; inI++){
			$(inId+" .enlist .list:nth-of-type("+inI+")").removeAttribute('style');
			$(inId+" .pllist .list:nth-of-type("+inI+")").removeAttribute('style');
			$(inId+" .eninput .list:nth-of-type("+inI+")").removeAttribute('style');
			$(inId+" .plinput .list:nth-of-type("+inI+")").removeAttribute('style');
			$(inId+" .enlist .list:nth-of-type("+inI+")").removeAttribute('style');
			$(inId+" .pllist .list:nth-of-type("+inI+")").removeAttribute('style');
			$(inId+" .eninput .list:nth-of-type("+inI+")").removeAttribute('style');
			$(inId+" .plinput .list:nth-of-type("+inI+")").removeAttribute('style');
		}
		klaKas(inId+" .slowek", "shuffle");
	}
	
	klaDod(inId+ " .porzBut", "niewidoczne");
	klaKas(inId+" .losBut", "niewidoczne");
}

function ukryjList(event){ inId = "#"+event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
		klaZmien(inId+ " .slowek .listdz.defUkr .textlist", "niewidoczne");
		klaZmien(inId+ " .slowek .listdz.defUkr .inputlist", "niewidoczne");
}

function klaZmien(inEl, nazKlas) {
	if(klaJest(inEl,nazKlas)) {
		var reg = new RegExp('(\\s|^)'+nazKlas+'(\\s|$)');
		$(inEl).className=$(inEl).className.replace(reg,' ');
	}
	else if ($(inEl)) $(inEl).className=$(inEl).className.replace(/\s*$/," "+nazKlas);
}

function klaJest(ele,cls) {if($(ele)) {
	return $(ele).className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	} else return null
}
function klaDod(ele,cls) {
	if ($(ele) && !klaJest(ele,cls)){
		$(ele).className=$(ele).className.replace(/\s*$/," "+cls);
	}
}
function klaKas(ele,cls) {
	if (klaJest(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		$(ele).className=$(ele).className.replace(reg,' ');
	}
}

function wymEl(inEl) { // Określa szerokość inputa na podstawie szerokości tekstu którym ma być uzupełniony
	var szerTe = document.querySelector(inEl+" .testBut").clientWidth;	
	klaKas(inEl+ " .sprawdzBut", "niewidoczne");
	var szerSp = document.querySelector(inEl+" .sprawdzBut").clientWidth;	
	klaDod(inEl+ " .sprawdzBut", "niewidoczne");
	klaKas(inEl+ " .zapBut", "niewidoczne");
	var zapSp = document.querySelector(inEl+" .zapBut").clientWidth;	
	klaDod(inEl+ " .zapBut", "niewidoczne");
	
	if(szerSp > szerTe){
		if(szerSp > zapSp){	var szerLBut = szerSp; }
		else {	var szerLBut = zapSp; }
	}
	else if(szerTe > zapSp) {
		var szerLBut = szerTe;		
	} else { var szerLBut = zapSp; }
	document.querySelector(inEl+" .testBut").style.width = szerLBut+"px";
	document.querySelector(inEl+" .sprawdzBut").style.width = szerLBut+"px";
	document.querySelector(inEl+" .zapBut").style.width = szerLBut+"px";
	
	
	klaDod(inEl+ " .nZapBut", "niewidoczne");
	var szerNZ = document.querySelector(inEl+" .nZapBut").clientWidth;	
	klaDod(inEl+ " .nZapBut", "niewidoczne");
	klaDod(inEl+ " .zazBledyBut", "niewidoczne");
	var szerZB = document.querySelector(inEl+" .zazBledyBut").clientWidth;	
	klaKas(inEl+ " .zazBledyBut", "niewidoczne");
	klaKas(inEl+ " .bezBledowBut", "niewidoczne");
	var zapBB = document.querySelector(inEl+" .bezBledowBut").clientWidth;	
	klaDod(inEl+ " .bezBledowBut", "niewidoczne");
	
	if(szerZB > szerNZ){
		if(szerZB > zapBB){	var szerRBut = szerZB; }
		else {	var szerRBut = zapBB; }
	}
	else if(szerNZ > zapBB) {
		var szerRBut = szerNZ;		
	} else { var szerRBut = zapBB; }
	document.querySelector(inEl+" .nZapBut").style.width = szerRBut+"px";
	document.querySelector(inEl+" .zazBledyBut").style.width = szerRBut+"px";
	document.querySelector(inEl+" .bezBledowBut").style.width = szerRBut+"px";

	minSzer = szerLBut + szerRBut + 12;

	var szerEn = document.querySelector(inEl+" .enlist").clientWidth;
	var szerPl = document.querySelector(inEl+" .pllist").clientWidth;
	if(szerEn > szerPl){
		if(szerEn > minSzer) {var szerWlas = szerEn;}
		else {var szerWlas = minSzer;}
	}
	else if(szerPl > minSzer){
		var szerWlas = szerPl;		
	} else {var szerWlas = minSzer;}
	
	document.querySelector(inEl+" .eninput").style.width = szerWlas+"px";
	document.querySelector(inEl+" .plinput").style.width = szerWlas+"px";
	document.querySelector(inEl+" .enlist").style.width = szerWlas+"px";
	document.querySelector(inEl+" .pllist").style.width = szerWlas+"px";
	document.querySelector(inEl+" .porzDiv").style.width = szerWlas+"px";
	document.querySelector(inEl+" .butDiv").style.width = szerWlas+"px";
}

function werPattern(inId){
	var liczEl = document.querySelectorAll(inId+" .enlist .list").length
	
	for(inI = 1; inI<=liczEl; inI++){
		var valEn = $(inId+" .enlist .list:nth-of-type("+inI+")").firstChild.nodeValue;
		$(inId+" .eninput .list:nth-of-type("+inI+") input").setAttribute("pattern", "^"+valEn+"{1}$");
		var valPl = $(inId+" .pllist .list:nth-of-type("+inI+")").firstChild.nodeValue;
		$(inId+" .plinput .list:nth-of-type("+inI+") input").setAttribute("pattern", "^"+valPl+"{1}$");
	}
}

function przechwyc(e) {
	var kod = (window.event) ? window.event.keyCode : e.which;
	
	if(kod == 13){ // wciśnięty enter
		inId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
		if(inId != ""){
			var liczEl = document.querySelectorAll(inId+" .defUkr .list").length;
			var nrFocInp = e.target.getAttribute("tabindex");
			if(nrFocInp < liczEl/2){
			
			$(inId+" .listdz.defUkr input[tabindex='"+((nrFocInp*1)+1)+"']").focus();
			} else if (nrFocInp == (liczEl/2)){
			}
			return false
		}
	}
}


function dodTem() {
	klaDod("#dodTemat > li:nth-of-type(1)","niewidoczne"); // ukryj button
	klaKas("#dodTemat > li:nth-of-type(2)","niewidoczne"); // pokaż input
	
	
}

function zapTem() {
	var lh = location.hash;
	lh = lh.replace("#","");
	lh = lh.split("/");
	
	var dTiv = $("#dodTemat input").value;
	pNazdTiv = dTiv.replace(/[^a-zA-Z0-9]/g, '');
	nazdTiv = pNazdTiv.toLowerCase();
	if(nazdTiv!=""){
	var liMenu = document.createElement("li");
	var aMenu = document.createElement("a");
	aMenu.name = nazdTiv;
	aMenu.href = "#"+lh[0]+"/"+nazdTiv;
	aMenu.appendChild(document.createTextNode(dTiv))
	liMenu.appendChild(aMenu);
	$("#nav menu").appendChild(liMenu);
	
	history.replaceState({module:"leave"}, document.title, "#"+lh[0]+"/"+nazdTiv);
	
	
	$("#article").removeChild($("#kontener"));
	nzk = document.createElement("div");
	nzk.id = "kontener";
	$("#article").appendChild(nzk);
	
	$("#kontener").name = nazdTiv;
	

	klaKas(".dodDzial","niewidoczne")
	klaKas("#dodTemat > li:nth-of-type(1)","niewidoczne"); // pokaż button
	klaDod("#dodTemat > li:nth-of-type(2)","niewidoczne"); // ukryj input
	
	} else {alert("Wpisz dozwoloną nazwę (zawierającą znaki a-z i/lub A-Z i/lub 0-9).");}
}

function narazF() {
	klaKas("div.dodDzial","wosobno");
}

function osobnoF() {
	klaDod("div.dodDzial","wosobno");
}

function zapiszDzial() {
	
	pNazDE = $(".dodDzial .nazDzialuEdy").value.replace(/[^a-zA-Z0-9]/g, '');
	pNazDE = pNazDE.toLowerCase();
	tabLinii = [];
	tabLinii2 = [];
	if(klaJest("div.dodDzial", "wosobno")){
		var tabLinii = $(".dodDzial .formosobno textarea:nth-of-type(1)").value.split(/\n/);
		var tabLinii2 = $(".dodDzial .formosobno textarea:nth-of-type(2)").value.split(/\n/);
	} else {
		var dtabLinii = $(".dodDzial .formnaraz textarea").value.split(/\n/);
		tabLiWier = [];
		for(var licz=0; licz<=dtabLinii.length-1; licz++){
			tabLiWier[licz] = dtabLinii[licz].split(" - ");
			tabLinii[licz] = tabLiWier[licz][0];
			tabLinii2[licz] = tabLiWier[licz][1];
		}
	}//.replace(/\s*$/," "+nazKlas);
	
	var lh = location.hash;
	lh = lh.replace("#","");
	lh = lh.split("/");
	
	var nazDzJest = 0;
	ttttndoP = JSON.parse(localStorage.getItem("nazCz"+lh[0]));
	for(ndjN=0; ndjN<ttttndoP.length; ndjN++){if(ndjN[ndjN]){nazDzJest = 1;}}
	if(nazDzJest == 1){
		jspNC = JSON.parse(localStorage.getItem("nazCz"+lh[0]));
		jspNC[jspNC.length] = $("#kontener").name;
		localStorage.setItem("nazCz"+lh[0],  JSON.stringify(jspNC) );
		
		
		jspC = JSON.parse(localStorage.getItem("cz"+lh[0]));
		jspC[jspC.length] = $('#nav a[name="'+($("#kontener").name)+'"]').firstChild.nodeValue;
		localStorage.setItem("cz"+lh[0], JSON.stringify(jspC));
	}
	
	if(localStorage.getItem("dzial"+$("#kontener").name)){
		jspDz = JSON.parse(localStorage.getItem("dzial"+$("#kontener").name));
		jspDz[jspDz.length] = pNazDE;
		localStorage.setItem("dzial"+$("#kontener").name, JSON.stringify(jspDz) );
	} else {
		localStorage.setItem("dzial"+$("#kontener").name, "["+JSON.stringify(pNazDE)+"]" );
	}
	
	
	if(localStorage.getItem("nazDzialy"+$("#kontener").name)){
		jspnDz = JSON.parse(localStorage.getItem("nazDzialy"+$("#kontener").name));
		jspnDz[jspnDz.length] = $(".dodDzial .nazDzialuEdy").value;
		localStorage.setItem("nazDzialy"+$("#kontener").name, JSON.stringify(jspnDz) );
	} else {
		localStorage.setItem("nazDzialy"+$("#kontener").name, "["+JSON.stringify($(".dodDzial .nazDzialuEdy").value)+"]" );
	}
	
	
	if($(".dodDzial .przedDzEdy").value != undefined){unJSpPrzedDz = $(".dodDzial .przedDzEdy").value} else {unJSpPrzedDz = '';}
	if(localStorage.getItem($("#kontener").name+"PrzedFisz")){
		jspPrzedDz = JSON.parse(localStorage.getItem($("#kontener").name+"PrzedFisz"));
		jspPrzedDz[jspPrzedDz.length] = unJSpPrzedDz;
		localStorage.setItem($("#kontener").name+"PrzedFisz", JSON.stringify(jspPrzedDz) );
	} else {
		localStorage.setItem($("#kontener").name+"PrzedFisz", "["+JSON.stringify(unJSpPrzedDz)+"]" );
	}
	
	
	if($(".dodDzial .poDzEdy").value != undefined){unJSpPoDz = $(".dodDzial .poDzEdy").value} else {unJSpPoDz = '';}
	if(localStorage.getItem($("#kontener").name+"PoFisz")){
		jspPoDz = JSON.parse(localStorage.getItem($("#kontener").name+"PoFisz"));
		jspPoDz[jspPoDz.length] = unJSpPoDz;
		localStorage.setItem($("#kontener").name+"PoFisz", JSON.stringify(jspPoDz) );
	} else {
		localStorage.setItem($("#kontener").name+"PoFisz", "["+JSON.stringify(unJSpPoDz)+"]" );
	}
	
	
	if(localStorage.getItem($("#kontener").name+"En")){
		jspEn = JSON.parse(localStorage.getItem($("#kontener").name+"En"));
		jspEn[jspEn.length] = tabLinii;
		localStorage.setItem($("#kontener").name+"En", JSON.stringify(jspEn));	
	} else {
		localStorage.setItem($("#kontener").name+"En", "["+JSON.stringify(tabLinii)+"]");		
	}
	
	if(localStorage.getItem($("#kontener").name+"Pl")){
		jspPl = JSON.parse(localStorage.getItem($("#kontener").name+"Pl"));
		jspPl[jspPl.length] = tabLinii2;
		localStorage.setItem($("#kontener").name+"Pl", JSON.stringify(jspPl));	
	} else {
		localStorage.setItem($("#kontener").name+"Pl", "["+JSON.stringify(tabLinii2)+"]");		
	}
	
	//} else {alert("Wpisz prawidłowo dane.");}
}

function edytujDzial() {
	
	
}

function anuEDzial() {
	klaDod("div.dodDzial","wosobno");	
}






if (document.addEventListener) { // Uruchomienie Głównej funkcji
	document.addEventListener("DOMContentLoaded", function(){

//alert(longString);
/*var te = document.createCDATASection("Special Offer & Book Sale");

document.getElementsByTagName("body")[0].appendChild(te);
document.getElementsByTagName("body")[0].innerHTML += <str><![CDATA[
  Lorem ipsum dolor sit amet,
  venenatis penatibus etiam.
  Nec purus cras elit nec.
  Elit pharetra hymenaeos.
  Donec at cubilia pulvinar elit.
  Aliquet pretium tortor montes maecenas ante amet vel bibendum.
]]</str>.toString();*/

GM_addStyle((<><![CDATA[
.slowek ul, .slowek ul li, .slowek ul li input, .slowek ul li input:focus, .elnarz div { /* restart */
	padding: 0;
	margin: 0;
	border: 0;
	display: -webkit-box;
	display: -moz-box;
	outline: none;
}

nav menu {
	list-style: none;
}

header {
	background: rgba(247, 247, 247, .45);
	margin: 0 0 8px 0;
	padding: 8px;
	border-bottom: 1px solid rgba(227, 227, 227, .61);
}

header h1 {
	padding: 0;
	margin: 0;
}

#podglowek {
	display: -webkit-box;
	display: -moz-box;
	-webkit-box-orient: horizontal;
	-moz-box-orient: horizontal;
	margin: 8px;
}

body {
	display: -webkit-box;
	display: -moz-box;
	-webkit-box-orient: vertical;
	-moz-box-orient: vertical;
	margin: 0;
	width: 100%;
}

html {
	overflow-y: scroll;	
}

#kontener {
	-webkit-box-orient: vertical;
	-moz-box-orient: vertical;
	-webkit-box-pack: start;
	-moz-box-pack: start;
	-webkit-box-flex: 1;
	-moz-box-flex: 1;
}

#article {
	display: -webkit-box;
	display: -moz-box;
	-webkit-box-flex: 1;
	-moz-box-flex: 1;
	margin: 5px;	
}

.secdz {
	width: 100%;	
}

#nav {
	margin: 5px;
}

#konsel {
	/*overflow: hidden;
	width: 50px;
	padding-right: 30px;*/
}

#tematy {
	width: -moz-calc(100%-10px);
}

#nav menu {
	padding-left: 0;
	margin-bottom: 0;
	
}

#nav menu li a:link, #nav menu li button {
	color: #15C;
	text-decoration: none;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	font-size: 16px;
	font-family: serif;
	text-align:	start !important;
	width: auto !important;
	height: auto !important;
	-moz-transition: all 0.14s ease-in-out;
	-webkit-transition: all 0.14s ease-in-out;
}

#nav menu li button{
	/*text-indent: -3px;*/
}

#nav menu:nth-of-type(2) {
	opacity: 0;
	visibility: hidden;
	
}
#nav:hover menu:nth-of-type(2) {
	color: black;
	opacity: 1 !important;
	visibility: visible;
	-moz-transition: all 0.14s ease-in-out;
	-webkit-transition: all 0.14s ease-in-out;
}
#nav:hover menu li button {
	color: black;
}

#nav menu li button:hover {
	text-decoration: underline;
}

#nav menu li a:visited, #nav menu li button:visited {
	color: #15C;
}

#nav menu li a:hover {
	color: #15C;
	text-decoration: underline;
}

.secdz h1 {
	padding: 0;
	margin: 0;
}

.elnarz .przyciski .bezBledowBut {
	border: 1px solid rgba(255, 0, 0, .21);
}

.fxbug {
    position: relative;
	overflow: hidden;
}

.secdz.ukryte .za p, .secdz.ukryte .przed p {
	visibility: hidden;
}

.secdz .za p, .secdz .przed p {
	margin: 8px 0;
}

.secdz.ukryte .za, .secdz.ukryte .przed {
	width: auto;
	position: relative !important;
	background: #F9F9F9;
	overflow: hidden;
	border-radius: 4px;
}

.secdz.ukryte .za [title], .secdz.ukryte .przed [title] {
	background: red;
}

.secdz .za, .secdz .przed {
	display: -webkit-box !important;
	-webkit-box-orient: vertical;
	-webkit-box-pack: start !important;
	-webkit-box-align: start !important;
	display: -moz-box !important;
	-moz-box-orient: vertical;
	-moz-box-pack: start !important;
	-moz-box-align: start !important;
}

.secdz.ukryte .za .komukr, .secdz.ukryte .przed .komukr {
	position: absolute !important;
	display: -webkit-box !important;
	display: -moz-box !important;
	top: 60px;
	left: 50px;
	font-size: 17pt;
	font-weight: 1000;
	font-family: Verdana;
	-webkit-transform:rotate(25deg);
	-webkit-user-select: none;
	-moz-transform:rotate(25deg);
	-moz-user-select: none;
	cursor: default;
}

.secdz .za .komukr, .secdz .przed .komukr {
}

.elnarz:not(.trwaTest) .slowek.zazBledy .textlist li.kolBledu {
	color: red !important;
}

.elnarz:not(.trwaTest) .slowek.zazBledy .textlist li.kolPoprawny {
	color: green !important;
}

.elnarz .slowek.sprawdz input:invalid,
.elnarz .slowek.sprawdz input:read-only:invalid {
	color: red !important;
}

.elnarz .slowek.sprawdz input:valid,
.elnarz .slowek.sprawdz input:read-only:valid {
	color: green !important;
}

.elnarz .slowek.sprawdz input:disabled {
	color: green !important;
}
.elnarz .endz, .elnarz.zamEnPl .pldz {
	-webkit-box-ordinal-group: 1;
	-moz-box-ordinal-group: 1;
}


.elnarz .pldz, .elnarz.zamEnPl .endz {
	-webkit-box-ordinal-group: 3;
	-moz-box-ordinal-group: 3;
}
 
.elnarz .slowek .sep {
	-webkit-box-ordinal-group: 2;
	-moz-box-ordinal-group: 2;
}

#contentWrapper {
	display: none;
}

.przyciski {
	margin-bottom: 5px !important;
	z-index: 3;
}

.elnarz .przyciski > div{
	opacity: 0;
	visibility: hidden;
	-moz-transition: all 0.14s ease-in-out;
	-webkit-transition: all 0.14s ease-in-out;
}

.elnarz:hover .przyciski > div {
	opacity: 1 !important;
	opacity: 0;
	visibility: visible;
	top: 0;
}

.przyciski div button {
	padding: 2px 3px;
	margin: 2px;
	border: 1px solid rgba(179, 179, 179,.45);
	background: white/*rgba(235, 235, 235, .45)*/;
    cursor: pointer;
}

.przyciski div button:hover {
	border: 1px solid rgba(159, 159, 159,.95);
	box-shadow: 0 0 2px rgba(219, 219, 219, 0.78);
}

.slowek ul.textlist li, .slowek ul.inputlist li input  {
	font-size: 10pt;
	font-family: Verdana;
	padding: 3px 3px;
	margin-bottom: 5px;
	height: auto;
}


.slowek ul li.list, .slowek ul.inputlist li input  {
	-webkit-box-flex: 1;
	-moz-box-flex: 1;
}

.slowek ul.inputlist li  input{
	text-indent: -1px;
	background: #EBEBEB;
}

.elnarz .przyciski .butDiv {
	display: -webkit-box !important;
	-webkit-box-pack: center !important;
	-webkit-box-align: center !important;
	display: -moz-box !important;
	-moz-box-pack: center !important;
	-moz-box-align: center !important;
}

.slowek ul.textlist li {
	margin-right: 16px;
	padding-left: 30px;
	display: inline-block !important;
}

.slowek ul {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	display: -moz-box;
	-moz-box-orient: vertical;
	padding: 0;
	margin: 0;
	list-style: none;
}

.slowek {
	display: -webkit-box;
	-webkit-box-orient: horizontal;
	display: -moz-box;
	-moz-box-orient: horizontal;
	z-index: 4;
}

.elnarz, .elnarz form, .secdz  {
	display: -webkit-box;
	-moz-box-orient: vertical;
	display: -moz-box;
	-webkit-box-orient: vertical;
	margin-bottom: 10px;	
}

body {
	-webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
}

.niewidoczne {
	display: none !important;
}

.sep {
	width: 1px;
	height: auto;
	margin: 0 2px !important;
	padding: 0;
	background: rgba(207, 207, 207, .85);
}

.zamEnPlDiv {
	width: 21px;
	height: auto;
	padding: 0;	
	margin: 0 !important;
	display: -webkit-box;
	display: -moz-box;
}

.zamEnPlDiv button {	
	font-size: 70%;
	font-family: Arial;
	display: -webkit-box;
	display: -moz-box;
	margin: 2px 0 !important;
	-webkit-box-flex: 1;
	-moz-box-flex: 1;
	text-align: center;
}

body {
	color: black !important;
}


/*  tłumacz na boku */
html[alt='praz'] #gt-form-c {
    max-width: 495px !important;
}

html[alt='praz'] #gt-ft-res {
    position: static !important;
}

html[alt='praz'] #gt-appname, html[alt='praz'] #gt-lang-submit {
	display: none !important;
}

html[alt='praz'] #gt-text-c {
    -moz-box-orient: vertical !important;
    display: -moz-box !important;
}

html[alt='praz'] #gt-text-c > * {
	max-width: 100% !important;
	width: 35em !important;
}

html[alt='praz'] #gt-res-c {
    margin: 20px 0 0 !important;
}

html[alt='praz'] #gt-form-c {
    border-top: 1px dashed #CCCCCC !important;
    padding-top: 12px !important;
    margin-top: 8px !important;
}

html[alt='praz'] #gt-form {
    margin-left: 4px !important;
}

html[alt='praz'] .e_lg #gt-res-p {
    padding-left: 0 !important;
}

html[alt='praz'] .e_lg #gt-src-p {
    padding-right: 0 !important;
}

html[alt='praz'] .e_lg #gt-text-c, html[alt='praz'] .e_lg #gt-appbar, html[alt='praz'] .e_md #gt-text-c, html[alt='praz'] .e_md #gt-appbar {
    padding: 14px 0 !important;
}

html[alt='praz'] #gt-appbar {
    border-bottom: 0 !important;
}


html[alt='praz'] #gt-form-c.tracos .goog-flat-menu-button {
    background-color: #F5F5F5 !important;
    background-image: -moz-linear-gradient(center top , #F5F5F5, #F1F1F1) !important;
    border: 1px solid #DCDCDC !important;
    border-radius: 2px 2px 2px 2px !important;
}

#konsel {
	display: none;
}

/* Edytor */

html body div article#article div.dodDzial div.przyciski div.forma button.naraz,
html body div article#article div.dodDzial.wosobno div.przyciski div.forma button.osobno {
	border: 1px solid rgba(0, 0, 250, 1);
}

html body div article#article div.dodDzial.wosobno div.przyciski div.forma button.naraz {
	border: 1px solid rgba(179, 179, 179,.45);
}

html body div article#article div.dodDzial div.formnaraz,
html body div article#article div.dodDzial.wosobno div.formosobno {
	display: block;
}

html body div article#article div.dodDzial.wosobno div.formnaraz,
html body div article#article div.dodDzial div.formosobno {
	display: none;
}

html body div article#article div.dodDzial div.przyciski > div {
	display: inline-block;
}
]]></>).toString());

$('#ft-l').innerHTML += '<a id="fiszstart" target="_blank" href="http://translate.google.pl/#angielski/czas">Fiszki</a>';
//$('#fiszstart').addEventListener('click', function(){location.hash = "angielski/czas"; callback();}, false);
	
		if(localStorage.length != 0){
			pRaz();//callback();
		} else { // tylko gdy nie ma bazy w localStorage (czyli raz)
			pRaz();
		}
	}, false);
} else {alert("Zmień przeglądarkę.");alert("Seria: ZRÓB TO!");}




function pRaz() { // pobranie raz z json danych podstawowych i przypisanie do localStorage
	//jsonpScript = document.createElement('script');
	
	
bazaraz = {
	"tematy": ["Angielski", "Fiszki własne"],
	"nazTematy": ["angielski", "wlasne"],
	"czangielski": ["Alfabet", "Czas, początkujący od zera", "Liczby"],
	"nazCzangielski": ["alfabet", "czas", "liczby"],
	"dzialczas": ["tydzien", "miesiac", "poryroku", "porydnia"],
	"nazDzialyczas": ["Tydzień", "Miesiące", "Pory roku", "Pory dnia"],
	"czasPrzedFisz": ["", ""],
	"czasPoFisz": [
		"<p>			Zwróć uwagę, iż dni tygodnia w języku angielskim piszę się z dużej litery.		</p>		<p>			Tłumaczenie wyrażeń typu: w poniedziałek, we wtorek, tłumaczymy używając przyimka ON, czyli on Monday, on Tuesday.		</p>		<p>			What day is it?  Jaki jest dziś dzień?		</p>		<p>			It's Monday - Jest poniedziałek		</p>",
		"<p>Miesiące w języku angielskim również pisze się z dużej literki. Przed nazwami miesięcy używamy przyimka IN, np:</p>	<p>w maju - in May</p>	<p>w styczniu - in January</p>	<p>I was born in September - Urodziłem się we wrześniu</p>"],
	"czasEn": [
		["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
		["January","February","March","April","May","June","July","August","September","October","November","December"]
	],
	"czasPl": [
		["poniedziałek","wtorek","środa","czwartek","piątek","sobota","niedziela"],
		["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"]
	],
	
	"dzialliczby": ["liczebniki", "dodinflicz"],
	"nazDzialyliczby": ["Liczebniki", "Dodatkowe informacje o liczebnikach"],
	"liczbyPrzedFisz": ["", ""],
	"liczbyPoFisz": ["", ""],
	"liczbyEn": [
		["1","2","3","4","5","6","7"],
		["1-szy"]
	],
	"liczbyPl": [
		["one","two","three","four","five","six","seven"],
		["second"]
	],
	"pl": "",
	"en": "losBut=, , ,"
};
localStorage.setItem("tematy", JSON.stringify(bazaraz["tematy"]));
localStorage.setItem("nazTematy", JSON.stringify(bazaraz["nazTematy"]));
localStorage.setItem("nazCzangielski", JSON.stringify(bazaraz["nazCzangielski"]));
localStorage.setItem("czangielski", JSON.stringify(bazaraz["czangielski"]));
localStorage.setItem("dzialczas", JSON.stringify(bazaraz["dzialczas"]));
localStorage.setItem("nazDzialyczas", JSON.stringify(bazaraz["nazDzialyczas"]));
localStorage.setItem("czasPrzedFisz", JSON.stringify(bazaraz["czasPrzedFisz"]));
localStorage.setItem("czasPoFisz", JSON.stringify(bazaraz["czasPoFisz"]));
localStorage.setItem("czasEn", JSON.stringify(bazaraz["czasEn"]));
localStorage.setItem("czasPl", JSON.stringify(bazaraz["czasPl"]));
localStorage.setItem("dzialliczby", JSON.stringify(bazaraz["dzialliczby"]));
localStorage.setItem("nazDzialyliczby", JSON.stringify(bazaraz["nazDzialyliczby"]));
localStorage.setItem("liczbyPrzedFisz", JSON.stringify(bazaraz["liczbyPrzedFisz"]));
localStorage.setItem("liczbyPoFisz", JSON.stringify(bazaraz["liczbyPoFisz"]));
localStorage.setItem("liczbyEn", JSON.stringify(bazaraz["liczbyEn"]));
localStorage.setItem("liczbyPl", JSON.stringify(bazaraz["liczbyPl"]));


callback(); // główna część skryptu
	//jsonpScript.parentNode.removeChild(jsonpScript);
	//delete jsonpScript;

	//var jsonB = document.createTextNode(jsJS);
	//jsonpScript.appendChild(jsonB);
	
	
	//var kontenerNarz = document.createElement("div");
	//kontenerNarz.id = "kontenerNarz";
	//document.body.appendChild(kontenerNarz);
	//$('#kontenerNarz').appendChild(jsonpScript);
}

function ladStruktur(){
	var longString = <><![CDATA[
	<div id="podglowek"><article id="article">
		<div id="kontener"><section id="" class="secdz">
			<h1></h1>
			<section class="fxbug"><section class="przed">
				<span class="komukr niewidoczne">ukryte na czas testu</span>
			</section></section>
			<div id="" class="elnarz"> <form onsubmit="return false" novalidate="novalidate">
				<div class="przyciski">
				<div style="margin: 0;">
					<div class="porzDiv butCon">
						<button type="submit" class="losBut" title="Sortuj listy losowo">Losuj</button>
						<button type="submit" class="porzBut niewidoczne" title="Sortuj listy według kolejności">Uporządkuj</button>
					</div>
					<div class="zamEnPlDiv butCon">
						<button class="zamEnPlBut" title="Zamień listy miejscami"><></button>
					</div>
					<div class="butDiv butCon">
						<button type="submit" class="testBut" title="Wykonaj test">Test</button>
						<button type="submit" class="sprawdzBut niewidoczne" title="Sprawdź popełnione błędy w teście">Sprawdź</button>
						<button type="submit" class="zapBut niewidoczne" title="Zapisz wynik testu">Zapisz</button>
						<button type="submit" class="nZapBut niewidoczne" title="Przerwij test">Anuluj</button>
						<button type="submit" class="zazBledyBut" title="Zaznacz błędy z wcześniejszych zapisanych testów">Błędy</button>
						<button type="submit" class="bezBledowBut niewidoczne" title="Usuń zaznaczenie błędów z wcześniejszych zapisanych testów">Czysty</button>
					</div>
				</div>
				</div>
				<div class="slowek">
					<div class="listdz endz">
						<ul class="textlist enlist">
							<!-- <li class="list"></li> -->
						</ul>
						<ul class="inputlist eninput niewidoczne">
							<!-- <li class="list">
								<input x-webkit-speech="x-webkit-speech" pattern="">
							</li> -->
						</ul>
					</div>
					<div class="sep"></div>
					<div class="listdz pldz defUkr">
						<ul class="textlist pllist">
							<!-- <li class="list"></li> -->
						</ul>
						<ul class="inputlist plinput niewidoczne">
							<!-- <li class="list">
								<input x-webkit-speech="x-webkit-speech" pattern="">
							</li> -->
						</ul>
					</div>
				</div>
			</form>	</div>
			<section class="fxbug"><section class="za">
				<span class="komukr niewidoczne">ukryte na czas testu</span>
			</section><section/>
		</section>
		</div>
		<div class="dodDzial niewidoczne">
			<div class="przyciski">
				<div class="forma">
					<span>Formuarz:</span>
					<button type="submit" class="naraz" title="Pojedynczy formularz">Pojedynczy</button>
					<button type="submit" class="osobno" title="Osobne formularze dla list">2 osobne</button>
				</div>
				<div class="zaedyt">
					<button type="submit" class="zapDz" title="Zapisz dział">Zapisz</button>
					<button type="submit" class="anuEDz niewidoczne" title="Anuluj edycję działu">Anuluj</button>
					<button type="submit" class="edyDz niewidoczne" title="Edytuj dział">Edytuj</button>
				</div>
			</div>
			<input class="nazDzialuEdy" style="display: block; width: 310px" placeholder="Nazwa działu"></input>
			<div class="formnaraz" style="width: 316px">
				<textarea style="width: 310px" placeholder='Fiszki: pierwsza i druga wersja rozdzielona " - " kolejne elementy listy rozdzielone Enterem.'></textarea>
			</div>
			<div class="formosobno" class="" style="width: 316px">
				<textarea style="width: 150px" placeholder="Fiszki: tylko lewa strona, kolejne elementy listy rozdzielone Enterem."></textarea>
				<textarea style="width: 150px" placeholder="Fiszki: tylko prawa strona, kolejne elementy listy rozdzielone Enterem."></textarea>
			</div>
			
			<textarea class="przedDzEdy" style="display: block; width: 310px;" placeholder="Tekst wyświetlany przed fiszką."></textarea>
			<textarea class="poDzEdy" style="display: block; width: 310px" placeholder="Tekst wyświetlany za fiszką."></textarea>
		</div>
	</article>
	<nav id="nav">
		
		<div id="konsel"><select id="tematy">
			<!-- <option name=""></option>-->
		</select>
		<button type="submit" class="dodDzial" title="Dodaj nowy dział">+</button>
		</div>
		<menu class="">
			<!--<li name=""></li>-->
		</menu>
		<menu id="dodTemat" style="margin:0; padding:0;">
			<li><button type="submit" class="dodTem niewidoczne">Dodaj temat</button></li>
			<li><input placeholder="Dodaj nowy temat"><button type="submit" class="zapTem" title="Zapisz ten temat i przejdź do dodawania zagadnień">+</button></li>
		</menu>
		
		<!--<iframe src="http://www.ivona.com/pl/"></iframe>-->
	</nav>
	</div>
]]></>.toString();

document.getElementsByTagName("body")[0].innerHTML += longString;
}


function czytCzek() {
	setTimeout(function(){
		if($("#gt-src-listen").getAttribute("aria-pressed") == 'true'){
			console.log("pętla");
			czytCzek(); // pętla
		} else {
			console.log(globEvent.target+" sprawdza najechanie");
			if(globEvent.target.className == "list"){
				console.log("po czytaniu");
				doCzytania(globEvent);
			}
		}
	},100);
}

		

function tlumCzek() {
	setTimeout(function(){
		if(( 'PR' == zPR && !($("#result_box").firstChild)) || ('PR' != zPR && tlumPrzed == $("#result_box").firstChild.firstChild.nodeValue)){
			console.log("pętla");
			tlumCzek(); // pętla
		} else {
			console.log("ok");
			$("#gt-src-wrap").style.position = "static";
			$("#gt-src-listen").style.position = "absolute";
			//$("#gt-src-listen").style.visibility = "visible";
			$("#gt-src-listen").style.opacity = "1";
			$("#gt-src-listen").style.cursor = "auto";
			pKF = '';
			if(takPDPC == '1'){
				console.log("przypisane do po czytaniu");
				$("#gt-src-listen").addEventListener("click", czytCzek, false);
				takPDPC = '';
			}
		}
	},100);
}
takPDPC = '1';
pKF = '';
tlumPrzed = '';
function doCzytania(event){
	globEvent = event;
	console.log(event.target.firstChild.nodeValue +' == '+ $("#source").value);
	if(/*tlumPrzed != '' &&*/ event.target.firstChild.nodeValue == $("#source").value){
		console.log('takstop');
		pKF = 'stop';
	} else {
		console.log(tlumPrzed+" nie zatrzywywać");
		pKF = '';
	}
	
	if($("#gt-src-listen").getAttribute("aria-pressed") == 'false' && pKF != 'stop') {
		pKF = 'stop';
		zPR = "";
		$("#gt-src-listen").style.top = event.target.offsetTop+"px";
		$("#gt-src-listen").style.left = event.target.offsetLeft+"px";
		//$("#gt-src-listen").style.visibility = "hidden";
		$("#gt-src-listen").style.opacity = "0";
		$("#gt-src-listen").style.cursor = "progress";
		
		var tekstDoCzytania = event.target.firstChild.nodeValue;
		$("#source").value = tekstDoCzytania;
		if($("#result_box span")){
			tlumPrzed = $("#result_box").firstChild.firstChild.nodeValue;
			tlumCzek();
		} else {
			console.log("pierwszy raz");
			tlumPrzed = '*/+';			
			zPR = "PR";
			tlumCzek();
		}
		
		
		//$("#miesiacsec").innerHTML = ($("#result_box").nextSibling);
		
	}
}

function zCzytania(event){
	if($("#gt-src-listen").getAttribute("aria-pressed") != 'false') {
		$("#source").value = '';
		$("#gt-src-wrap").style.position = "absolute";
		$("#gt-src-listen").style.position = "relative";
		$("#gt-src-listen").style.top = event.target.offsetTop+"px";
		$("#gt-src-listen").style.left = event.target.offsetLeft+"px";
	}
	
	
}


}
// ==UserScript==
// @name        Farmienie die steamme i plemiona
// @namespace   Farmienie die steamme i plemiona
// @include     http://de*.die-staemme.de/game.php*screen=place
// @include     http://de*.die-staemme.de/game.php*screen=place&mode=command
// @include     http://pl*.plemiona.pl/game.php*screen=place
// @include     http://pl*.plemiona.pl/game.php*try=confirm&screen=place
// @include     http://pl*.plemiona.pl/game.php*try=confirm&screen=place&mode=command
// @version     1
// @grant       none
// ==/UserScript==

if (location.href.match(/try=confirm&screen=place/) && document.documentElement.innerHTML.indexOf("error_box")==-1 ) {
	var randomTime = Math.random()*2500;
	while(randomTime<800) {
		randomTime = Math.random()*2500;
	}
	setTimeout(function() {document.forms[0].submit.click();window.location.href(window.location.href.replace('try=confirm&',''));}, randomTime);
}
else {
pojemnosc = 0;
pojemnoscLK = 80;
pojemnoscPik = 25;
pojemnoscMiecz = 15;
pojemnoscTopor = 10;

wysylajZwiad=false;

wioski = [];
if (location.href.match(/de98/) ) {
wioski = ["508|251", "511|250", "503|253", "499|244", "503|253", "507|247"];
pojemnosc = 5000;
wysylajZwiad=true;
}
else if (location.href.match(/de100/) ) {
wioski = ["422|310", "422|306", "424|307", "422|311", "422|306", "426|308"];
pojemnosc = 5000;
wysylajZwiad=true;
}
else if (location.href.match(/pl78/) ) {
wioski = ["515|593", "517|593", "514|593", "516|592", "513|593"];
pojemnosc = 1800;
wysylajZwiad=false;
}

var pikow = 0;
var mieczy = 0;
var toporow = 0;
var zwiadu = 0;
var lekkiej = 0;

var hrefs = document.querySelectorAll('[href]');
for(var i=0; i<hrefs.length; i++) {
	if(hrefs[i].href.indexOf("unit_input")!=-1) {
		var href = hrefs[i].href;
		var liczba = parseInt(hrefs[i].innerHTML.replace("(","").replace(")",""));
		if(href.indexOf("spy")!=-1) {
			zwiadu = liczba;
		}
		else if(href.indexOf("axe")!=-1) {
			toporow = liczba;
		}
		else if(href.indexOf("spear")!=-1) {
			pikow = liczba;
		}
		else if(href.indexOf("sword")!=-1) {
			mieczy = liczba;
		}
		else if(href.indexOf("light")!=-1) {
			lekkiej = liczba;
		}
	}
}
var end=false;
for(var i=0; i<wioski.length && !end; i++) {
	if(document.documentElement.innerHTML.indexOf(wioski[i])==-1) {
		var wioska = wioski[i].split("|");
		var x = wioska[0];
		var y = wioska[1];
		document.getElementById("inputx").value = x;
		document.getElementById("inputy").value = y;
		end=true;
	}
}
if(!end) {
    var h = document.createElement("h1");
    h.textContent = "Farmienie zakończone";
    h.style.color = "blue";
    h.style.textAlign = "center";
    var main = document.getElementsByClassName("main")[0];
    main.insertBefore(h,main.firstChild);
	var odswiezaj = true;
    var time = 1000;
    var secondsBeforeRefresh = Math.floor(Math.random() * (100 - 30 + 1)) + 30; //losowy czas do odswiezenia pomiedzy 30, a 100 sekund
    setInterval(function() {
        if(odswiezaj) {
        	if(secondsBeforeRefresh==0) {
                document.write(secondsBeforeRefresh); 
                document.location.reload(true);
            }
        	else {
                h.textContent = "Farmienie zakończone (odświeżenie strony za " + secondsBeforeRefresh + " sekund)"; 
                document.title = window.location.href.replace('http://','').substring(0,window.location.href.indexOf('.')-7) + " - " + secondsBeforeRefresh + " sekund";
                secondsBeforeRefresh--;
            }
        }
    }, time);
    
    var aktywacja = document.createElement("button");
    aktywacja.textContent = "Wstrzymaj autofarmienie";
    aktywacja.style.textalign = "center";
    aktywacja.setAttribute("text-align","center");
    aktywacja.setAttribute("margin", "0 auto");
    aktywacja.onclick = function() {
        if(odswiezaj) {odswiezaj=false; aktywacja.textContent = "Wznów autofarmienie";}
        else {odswiezaj=true; aktywacja.textContent = "Wstrzymaj autofarmienie";}
    };
    main.insertBefore(aktywacja,main.childNodes[1]);
}
else {
    document.title = window.location.href.replace('http://','').substring(0,window.location.href.indexOf('.')-7) + " - farmienie...";
	var wyborPikow = 0;
	var wyborMieczy = 0;
	var wyborToporow = 0;
	var wyborZwiadu = 0;
	var wyborLekkiej = 0;

	if(lekkiej*pojemnoscLK>=pojemnosc) {
		wyborLekkiej = Math.ceil(pojemnosc/pojemnoscLK);
		lekkiej-=wyborLekkiej;
	}
	else if(lekkiej*pojemnoscLK+pikow*pojemnoscPik>=pojemnosc)  {
		var pozostalaPojemnosc = pojemnosc-(pojemnoscLK*lekkiej);
		wyborLekkiej = lekkiej;
		wyborPikow = Math.ceil(pozostalaPojemnosc/pojemnoscPik);
		lekkiej-=wyborLekkiej;
		pikow-=wyborPikow;
	}
	else if(pikow*pojemnoscPik+toporow*pojemnoscTopor>=pojemnosc) {
		var pozostalaPojemnosc = pojemnosc-(pojemnoscPik*pikow);
		wyborPikow = pikow;
		wyborToporow = Math.ceil(pozostalaPojemnosc/pojemnoscTopor);
		pikow-=wyborPikow;
		toporow-=wyborToporow;
	}
	else if(pikow*pojemnoscPik+mieczy*pojemnoscMiecz) {
		var pozostalaPojemnosc = pojemnosc-(pojemnoscPik*pikow);
		wyborPikow = pikow;
		wyborMieczy = Math.ceil(pozostalaPojemnosc/pojemnoscMiecz);
		pikow-=wyborPikow;
		mieczy-=wyborMieczy;
	}
	else if(toporow*pojemnoscTopor+mieczy*pojemnoscMiecz) {
		var pozostalaPojemnosc = pojemnosc-(pojemnoscTopor*pikow);
		wyborToporow = toporow;
		wyborMieczy = Math.ceil(pozostalaPojemnosc/pojemnoscMiecz);
		toporow-=wyborToporow;
		mieczy-=wyborMieczy;
	}
	if(zwiadu>0 && wysylajZwiad) {
		wyborZwiadu=1;
		zwiadu--;
	}
	
	document.getElementById('unit_input_spy').value=wyborZwiadu;
	document.getElementById('unit_input_spear').value=wyborPikow;
	document.getElementById('unit_input_sword').value=wyborMieczy;
	document.getElementById('unit_input_axe').value=wyborToporow;
	document.getElementById('unit_input_light').value=wyborLekkiej;

	var randomTime = Math.random()*5000;
	while(randomTime<2000) {
		randomTime = Math.random()*5000;
	}
	setTimeout(function() {document.getElementById('target_attack').click();}, randomTime);
}
}
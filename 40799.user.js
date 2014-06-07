// ==UserScript==
// @name           Neptun Autologin Script
// @version        0.1
// @namespace      neptunautologin
// @include        ---
// ==/UserScript==

var user = new Array();

/*----------------------------------------------------------------------------
  BEÁLLÍTÁSOK:
  ----------------------------------------------------------------------------*/

var autologin = -1;
user.push(["felhasznaló", "jelszo"]);

/*----------------------------------------------------------------------------
   ENNYI! A többi kód már a script magja, ne módosítsd :)
  ----------------------------------------------------------------------------*/

var timer;


window.addEventListener('load', function(){
	// Login mező átalakítása
	
	// Régi elrejtése (kell az ellenőrzéshez)
	var usermezo = getById("user");
	usermezo.style.display = "none";

	// Új létrehozása
	var ujusermezo = document.createElement("select");
	ujusermezo.id="user_sel";
	ujusermezo.className = "bevitelimezo";
	ujusermezo.setAttribute('name', 'user_sel');

	// Felhasználók legördülő listájának feltöltése
	var s = "";
	s+='<option id="' + user[0][0]+ '" value="' + user[0][0] + '">' + user[0][0] + '</option>';
	for(var i=1;i<user.length;i++) {
		s+='<option id="' + user[i][0]+ '" value="' + user[i][0] + '">' + user[i][0] + '</option>';
	}
	
	ujusermezo.innerHTML = s;
	usermezo.parentNode.appendChild(ujusermezo);
	
	
	// Alapértelmezett user, jelszó beállítása (első beírt felhasználóé):
	getById("pwd").value = user[0][1];
	getById("user").value = user[0][0];
	
	// Legördülő menü eseménye: Frissíti az adatokat
	getById("user_sel").addEventListener('change', function(){
	
		getById("user").value = user[getById("user_sel").selectedIndex][0];
		getById("pwd").value = user[getById("user_sel").selectedIndex][1];
	
	}, true);

	// Automatikus bejelentkezés kijelzése:
	getById('lblVersion').innerHTML= 'Auto-bejelentkezés: ';
	getById('lblVersion').innerHTML+= '<span id="autologinvissza">' + autologin + '</span> ';	
	getById('lblVersion').innerHTML+= '<a id="autologincancel" href="#">[Ne!]</a>';	

	// Automatikus bejelentkezés megszakító esemény
	getById('autologincancel').addEventListener('click', function(){
		clearTimeout(timer);
		getById('lblVersion').innerHTML = 'Autologin lefújva!';
	} ,true);
	
	// Ha kértünk autologint, megkapjuk :)
	if (autologin !=-1) {
		timer = setInterval( visszaszamol, 1000);
	}
	
}, true);

function visszaszamol() {
	autologin--;
	getById('autologinvissza').innerHTML=autologin;
	if ( autologin == 0 )  {
		clearTimeout(timer);
		getById("Submit").click();	
	}
	
}


function getById(o) { return document.getElementById(o); }


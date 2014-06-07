// ==UserScript==
// @name           FiltrForum
// @namespace      localhost
// @include        http://www.fotka.pl/forum/list.php*
// ==/UserScript==
// autor bozar88.fotka.pl

//////////////////////////////
// początej programu
utworzPanel();
zastosuj();
// koniec programu ;)
//////////////////////////////

function zapisz(){	
	var c1 = document.getElementById("Otwarte");
	var c2 = document.getElementById("Zamknięte");
	var c3 = document.getElementById("Przyklejone");
	
	createCookie("ust_otw", c1.checked, 999);
	createCookie("ust_zam", c2.checked, 999);
	createCookie("ust_prz", c3.checked, 999);			 
	
	window.location.reload();
}

function zastosuj(){
	var OTW_N = "http://s.fotka.pl/img/forum/t_normal_new.gif";
	var OTW_B = "http://s.fotka.pl/img/forum/t_normal.gif";
	var HOT_N = "http://s.fotka.pl/img/forum/t_hot_new.gif";
	var HOT_B = "http://s.fotka.pl/img/forum/t_hot.gif";
	var PRZYK = "http://s.fotka.pl/img/forum/t_sys2_new.gif";
	var ZAMKN = "http://s.fotka.pl/img/forum/t_x.gif";
		
	var c1 = document.getElementById("Otwarte");
	var c2 = document.getElementById("Zamknięte");
	var c3 = document.getElementById("Przyklejone");
		
	c1.checked = (readCookie("ust_otw")=="true");
	c2.checked = (readCookie("ust_zam")=="true");
	c3.checked = (readCookie("ust_prz")=="true");
	
	// w przypadku pierwszego uruchomienia
	if (readCookie("ust_otw")==null) c1.checked=true;
	if (readCookie("ust_zam")==null) c2.checked=true;
	if (readCookie("ust_prz")==null) c3.checked=true;
	
	var tr = document.getElementsByTagName("tr");
	
	for(i=4; i<tr.length; i++){		
		var ikonka = tr[i].firstChild.firstChild;		
		if(ikonka != null){		
			if(!c1.checked && (ikonka.src == OTW_N || ikonka.src == OTW_B || ikonka.src == HOT_N || ikonka.src == HOT_B)){
				tr[i].style.display = "none";
			}else if(!c2.checked && ikonka.src == ZAMKN){
				tr[i].style.display = "none";
			}else if(!c3.checked && ikonka.src == PRZYK){
				tr[i].style.display = "none";
			}
		}	
	}
}


function utworzPanel(a,b,c){
	var gdzie = document.getElementsByTagName("form")[0];
	var form = 	document.createElement("form");
	var etykieta = document.createElement("span");
	etykieta.innerHTML = "<b>Pokazuj tematy: </b>";
	form.appendChild(etykieta);
	
	nowyCheckbox("Otwarte",form);
	nowyCheckbox("Zamknięte",form);
	nowyCheckbox("Przyklejone",form);
	
	gdzie.insertBefore(form, gdzie.firstChild);	
}


function nowyCheckbox(nazwa, gdzie){
	var chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = nazwa;
	chkbox.name = nazwa;
	chkbox.addEventListener("click", zapisz, true)
	var etykietka = document.createElement("span");
	etykietka.innerHTML = nazwa;
	
	gdzie.appendChild(chkbox);
	gdzie.appendChild(etykietka);		
}




///////////////////////////////////////////////////////////////
// credits: http://www.quirksmode.org/js/cookies.html 


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
	
 
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
} 
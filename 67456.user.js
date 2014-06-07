// ==UserScript==
// @name          PITSTOP f1.sport.pl (RC)
// @description   skrypt wspomagajacy portal f1.pitstop.pl v.1.2
// @include	  http://f1.pl*
// ==/UserScript==


var exp = new Date();
var exp_end = new Date();
exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * 30));			// 30dni
exp_end.setTime(exp.getTime() - (1000 * 60 * 60 * 24 * 30));


function setCookie(name, value, expires) {
	document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
}

function getCookie (name) {
    var dc = document.cookie;
    var cname = name + "=";

    if (dc.length > 0) {              
		begin = dc.indexOf(cname);       
		if (begin != -1) {           
			begin += cname.length;       
			end = dc.indexOf(";", begin);
				if (end == -1) end = dc.length;
				return unescape(dc.substring(begin, end));
			} 
		}
		return null;
}

function isCookie (name) {
  var dc = document.cookie;
  var cname = name + "=";
  	if(dc.length > 0) {
     		if(dc.indexOf(cname) != -1) { return 1; }
     		else { return 0; }
   	}
}


function wolaj() {  
  if((document.getElementById('user').value.length < 3) || (document.getElementById('pass').value.length < 3)) {
    elmZapisz.checked = false;
    alert('Nie podales imienia lub hasla! Popraw dane!');
  }
  else { 
    if(elmZapisz.checked == true) { setCookie("F1XXX", "XXX", exp_end); } 
    else { setCookie("F1XXX", document.getElementById('user').value + "/" + document.getElementById('pass').value, exp); }
  } 
}

var elmZapisz = document.createElement('input');
elmZapisz.type = 'checkbox';
elmZapisz.id = 'newzapis';
elmZapisz.addEventListener('mousedown', wolaj, false);

var allHTMLtags = new Array();
var elmTD;

function putCheckbox() {
  	allHTMLtags = document.getElementsByTagName('td');
  	elmTD = allHTMLtags[5];
  	elmTD.appendChild(elmZapisz);
}

function putLabel() {
  	var newLabel = document.createTextNode('Zapamiętaj:');
	allHTMLtags = document.getElementsByTagName('td');
	elmTD = allHTMLtags[4];
	elmTD.appendChild(newLabel);
}

if(isCookie('F1XXX') == 1) {
  	if(!(document.getElementById('profil'))) {
  		var val = window.location.toString().substring(14,23);
  		if(val == "Logowanie") {
			putLabel();
			putCheckbox();
  			var dane = getCookie('F1XXX').split("/");
			document.getElementById('user').value = dane[0];
			document.getElementById('pass').value = dane[1];
			elmZapisz.checked = true;
			var newUrl = document.getElementsByTagName('input');	// przekierowuje na strone glowna
			newUrl[6].value = "/";					// -- || --
			var zly_login = document.getElementsByTagName('div');
		  	var blad = 0;
		  	for(i=0; zly_login.length > i; i++) {
	      			if(zly_login[i].getAttribute('class') == 'tx-newloginbox-pi1-info-header') { blad = 1; break; }
	    		}
			if(blad != 1) { document.forms[0].submit(); } 
			else { 
	  			elmZapisz.checked = false;
				setCookie("F1XXX", "XXX", exp_end); 
	  			alert('NIEPOPRAWNY LOGIN LUB HASLO!'); 
	  		}
		}
		else {
			window.location.href = window.location.href.replace(window.location.toString(),'http://f1.sport.pl/Logowanie.81.0.html');

		}
	}
	else {
	  	var new_wyl = document.getElementById('wyl');
	  	new_wyl.href = '?logout';
   		var logout = window.location.toString();
   		logout = logout.substring(logout.indexOf('?')+1);	
		if(logout == 'logout') {
    			setCookie("F1XXX", "XXX", exp_end);
    			document.getElementById('wyloguj').submit();
  		}
 	}
}
else {
	var val = window.location.toString().substring(14,23);
	if(val == "Logowanie") {
		putLabel();
		putCheckbox();	
		var newUrl = document.getElementsByTagName('input');		// przekierowuje na strone glowna
		newUrl[6].value = "/";	
	}
}


// CZESC SKRYPTU DOTYCZACA KOEMNTARZY

var allHTMLtags = new Array();
function GetElementByClass(theClass) {
  allHTMLtags = document.getElementsByTagName('*');
  for(i=0; i<allHTMLtags.length; i++) {
    if(allHTMLtags[i].className==theClass) {
      allHTMLtags[i].style.margin = "10px 0px 0px 0px";
    }
  }
}

if(document.getElementById('current')) {
	GetElementByClass('f1comments_form');

	var komentarz = document.getElementById('tx_comments_pi1_content');
	komentarz.style.width = '450px';
	komentarz.setAttribute('rows', '10');
	
// POJAWIL SIE JAKIS DZIWNY BIAŁY ZNAK W POLU CAPTCHA, to go usuwamy!
	
	var newCaptcha = document.getElementsByTagName('input');
	for(i=0; newCaptcha.length > i; i++) {
   		if(newCaptcha[i].getAttribute('name')=='tx_comments_pi1[captcha]') {
 			newCaptcha[i].value = ""; break;
 		}
 	}	
 	
}




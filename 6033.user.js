// ==UserScript==
// @name		  Ogame alliances color
// @namespace	 li-on@wp.pl
// @description   Ogame coloring alliances PL
// @include	   http://*/game/galaxy.php*
// ==/UserScript==    

//tu mozna ustwaic swoje kolory
var pakt_kolor='#00FF00'; //kolor dla sojuszy z paktami
var wrog_kolor='#FF0000'; //kolor wrogich sojuszy
var inne_kolor='#0000FF'; //kolor dla innych wybranych sojuszy


var loc = document.location;
var reg = /http:\/\/(.*?)\/game\/(.*?)\?session=(.*?)/i;
var result = reg.exec( loc );
var server = result[1];


var pakt = GM_getValue('pakt_'+server);
if(pakt==null){
	pakt='|wstaw_liste_sojuszy|';
}

var wrog = GM_getValue('wrog_'+server);
if(wrog==null){
	wrog='|wstaw_liste_sojuszy|';
}

var inne = GM_getValue('inne_'+server);
if(inne==null){
	inne='|wstaw_liste_sojuszy|';
}


String.prototype.trim = function() { return this.replace(/^\s*|\s*$/, ''); };

var th = document.getElementsByTagName('a');
for(i=0;i<th.length;i++){
	x=th[i].innerHTML.trim();
	x=x.substring(0,x.length-1);
	if(pakt.indexOf('|'+x+'|')!=-1 && x.length>1){
		th[i].style.color=pakt_kolor;
	}
	if(wrog.indexOf('|'+x+'|')!=-1 && x.length>1){
		th[i].style.color=wrog_kolor;
	}
	if(inne.indexOf('|'+x+'|')!=-1 && x.length>1){
		th[i].style.color=inne_kolor;
	}
}

//guziki

function f_pakt(){
	var d=prompt("Lista paktow, nazwy oddziel znakiem |, znak ten musi znajdowac sie tez na poczatku i koncu listy",pakt);
	GM_setValue('pakt_'+server,d);
}

function f_wrog(){
	var d=prompt("Lista wrogow, nazwy oddziel znakiem |, znak ten musi znajdowac sie tez na poczatku i koncu listy",wrog);
	GM_setValue('wrog_'+server,d);
}

function f_inne(){
	var d=prompt("Dowolne, nazwy oddziel znakiem |, znak ten musi znajdowac sie tez na poczatku i koncu listy",inne);
	GM_setValue('inne_'+server,d);
}

x = document.createElement('div');
x.style.textAlign='center';
y = document.createElement('input');
y.setAttribute('type','button');
y.value='Pakty';
y.addEventListener('click',f_pakt,true);
x.appendChild(y);

y = document.createElement('input');
y.setAttribute('type','button');
y.value='Wrogie';
y.addEventListener('click',f_wrog,true);
x.appendChild(y);

y = document.createElement('input');
y.setAttribute('type','button');
y.value='Inne';
y.addEventListener('click',f_inne,true);
x.appendChild(y);

document.body.appendChild(x);
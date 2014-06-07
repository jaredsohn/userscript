// ==UserScript==
// @name dbw_quest_stat
// @description pomoce dla graczy BW
// @include http://r*.bloodwars.interia.pl/?a=msg*
// @include http://r*.bloodwars.net/?a=msg*
// @include http://r*.fr.bloodwars.net/?a=msg*
// ==/UserScript==
// authors: dreamerman
// don't use with a_skrypty_dbw.js

var text_jezyk = new Array(['Poniższe linki odsyłają do zewnętrznych stron.', 'Dodaj raport na'], ['Following links opens external pages.', 'Add report on'], ['Following links opens external pages.', 'Add report on']);

//this is same as $$ func included into bw sites but some browser have problem with it
function gebi(a) { return document.getElementById(a); }

//adds new DOM element
function Dodajelem(tojciec, ttyp, tparams, ttext) {
	var temp_elem = document.createElement(ttyp);
    for(var key in tparams) temp_elem.setAttribute(key, tparams[key]);
	if (ttext!=null) temp_elem.innerHTML = ttext;
	tojciec.appendChild(temp_elem); }

function Ustaldomene() {
	var czi1 = document.URL.indexOf('.');
	var czi2 = document.URL.indexOf('/',8);
	var czs1 = document.URL.substr(czi1+1,czi2-czi1-1);
	czi1 = 0;
	if (czs1=='bloodwars.interia.pl') czi1=0;
	else if (czs1=='bloodwars.net') czi1=1;
	else if (czs1=='fr.bloodwars.net') czi1=2;
	return czi1; }

function Zwroc_adres_kloca() {
    var tab_elem = document.getElementsByTagName("span");
    for (var i=0;i<tab_elem.length;i++) {
        if (tab_elem[i].getAttribute('class')=='panel-cell') return parseInt(tab_elem[i].innerHTML);
    }
	return '???';
}
	
//wlasciwa funkcja wykonujaca dzialania
function Dzialaj_dbw()
{
//dodaj potrzebne funkcje do kodu strony
Dodajelem(document.body, 'script', {'type':'text/javascript'}, "function Dodajelem(tojciec, ttyp, tparams, ttext) { var temp_elem = document.createElement(ttyp); for(var key in tparams) temp_elem.setAttribute(key, tparams[key]); if (ttext!=null) temp_elem.innerHTML = ttext; tojciec.appendChild(temp_elem); }");
Dodajelem(document.body, 'script', {'type':'text/javascript'}, "function post_to_url(path, params, method) { method = method || 'post'; var form = document.createElement('form'); form.setAttribute('method', method); form.setAttribute('action', path); form.setAttribute('target', '_blank'); for(var key in params) Dodajelem(form, 'input', {'type':'hidden','name':key,'value':params[key]},null); Dodajelem(form, 'input', {'type':'submit','name':'submit','id':'dbw_submit'},null); document.body.appendChild(form); $$('dbw_submit').click(); document.body.removeChild(form); }");

var czi1 = 0, czi2 = 0, czi3 = 0; //czi -> chwilowa zmienna integer
var bw_domena = Ustaldomene();
var tab_elem = document.getElementsByTagName("div");
var temp_str = "";
	for (var i=0;i<tab_elem.length;i++) {
	if (tab_elem[i].className == "msg-content msg-quest") {
		var temp_tab2=tab_elem[i].getElementsByTagName("img");	//<<--- ADDED
		if (temp_tab2.length>0) {
		tab_elem = document.getElementsByTagName("a"); //szukamy linka do wiadomosci
		for (var i=0;i<tab_elem.length;i++) {
			if (tab_elem[i].innerHTML.indexOf('showmsg.php')>-1 && tab_elem[i].getAttribute('target')!='_blank') { //link do raportu
				tab_elem[i].parentNode.innerHTML = tab_elem[i].parentNode.innerHTML + '<br /><br />'+text_jezyk[bw_domena][0]+'<br />';
				var temp_str = "javascript:post_to_url('https://spreadsheets.google.com/spreadsheet/formResponse?hl=en_US&formkey=dEFoT2NaMkRuaEM4NExZZDZnODQwYVE6MQ&ifq',{'entry.0.single':'"+tab_elem[i].innerHTML.replace(/&amp;/g, '&')+"','entry.1.single':'"+Zwroc_adres_kloca()+"'});";
				Dodajelem(tab_elem[i].parentNode, 'a', {'href':'JavaScript:void(0);','onclick':temp_str},text_jezyk[bw_domena][1]+' "Global Quest Stats"');
				break; }
		}
		break; }
	}
	}
}   //koniec Dzialaj_dbw()


if (document.readyState=='complete') Dzialaj_dbw();
else window.addEventListener('load', function() { Dzialaj_dbw() }, false);

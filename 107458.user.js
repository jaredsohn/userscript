// ==UserScript==
// @name a_skrypty_dbw
// @description pomoce dla graczy BW
// @include http://r*.bloodwars.interia.pl/*
// @include http://r*.bloodwars.net/*
// @include http://r*.fr.bloodwars.net/*
// ==/UserScript==
// authors: dreamerman


var text_jezyk = new Array(['PUNKTY', 'RASA', 'Członków', 'Lista członków', '', 'W SUMIE W TRENINGU:', 'PODSUMOWANIE', 'nazwa', 'obrażeń / zabici', 'pkt życia', 'rep', 'Link do sygnatury dla forum:', 'Poniższe linki odsyłają do zewnętrznych stron.', 'Analiza raportu by', 'Graficzna prezentacja by', 'Dodaj raport na', 'Mistrzowie Areny'], ['POINTS', 'RACE', 'Members', 'Members list', 'len', 'TOTAL', 'SUMMARY', 'Clan', 'dmg / kills', 'HP', 'hon', 'Link to forum signature:', 'Following links opens external pages.', 'Analysis of the report by', 'Graphical presentation by', 'Add report on', 'Masters of Arena'], ['POINTS', 'RACE', '', '', 'lfr', 'TOTAL', 'SOMMAIRE', 'Clan', 'Dégâts / Tués', 'Pts DE VIE', 'pdh', 'Link to signature:', 'Following links opens external pages.', 'Analyse des rapport by', 'Présentation graphique by', 'Add report on', 'Champions d`arène']);

//this is same as $$ func included into bw sites but some browser have problem with it
function gebi(a) { return document.getElementById(a); }

//adds new DOM element
function Dodajelem(tojciec, ttyp, tparams, ttext) {
	var temp_elem = document.createElement(ttyp);
    for(var key in tparams) temp_elem.setAttribute(key, tparams[key]);
	if (ttext!=null) temp_elem.innerHTML = ttext;
	tojciec.appendChild(temp_elem); }
	
//http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
	form.setAttribute("target", "_blank");
    for(var key in params) Dodajelem(form, 'input', {'type':'hidden','name':key,'value':params[key]},null);
	Dodajelem(form, 'input', {'type':'submit','name':'submit','id':'dbw_submit'},null);
    document.body.appendChild(form);
	gebi('dbw_submit').click();		//form.submit nie dziala z google docs
	document.body.removeChild(form); }
	
//ustala na jakiej stronie aktualnie jest przegladarka
function Ustalstrone() {
    var tempret = 0;
    if (document.URL.indexOf("?a=main") > 0) tempret = 3;  //sala tronowa
    if (document.URL.indexOf("?a=townshop") > 0) tempret = 4;  //sklep
    if (document.URL.indexOf("?a=equip") > 0) tempret = 5;  //zbrojownia
    if (document.URL.indexOf("?a=trade") > 0) tempret = 6;  //handel
    if (document.URL.indexOf("?a=ambush") > 0) tempret = 7;  //zasadzka
    if (document.URL.indexOf("?a=quest") > 0) tempret = 8;  //wyprawa
    if (document.URL.indexOf("?a=msg") > 0) tempret = 9;  //wiadomosci
    if (document.URL.indexOf("?a=profile") > 0) tempret = 10;  //profil gracza
    if (document.URL.indexOf("?a=rank") > 0) tempret = 12;  //ranking
    if (document.URL.indexOf("?a=aliance") > 0) tempret = 11;  //podglad klanu
    if (document.URL.indexOf("?a=training") > 0) tempret = 13;  //trening
    return tempret; }

function Ustaldomene() {
	var czi1 = document.URL.indexOf('.');
	var czi2 = document.URL.indexOf('/',8);
	var czs1 = document.URL.substr(czi1+1,czi2-czi1-1);
	czi1 = 0;
	if (czs1=='bloodwars.interia.pl') czi1=0;
	else if (czs1=='bloodwars.net') czi1=1;
	else if (czs1=='fr.bloodwars.net') czi1=2;
	return czi1; }

//new code by yohannj: http://forum.fr.bloodwars.net/index.php?page=Thread&postID=2239779#post2239779
//probably from lvlCalc script for BW on userscripts.org
function Ustallvl(pkt_gracza) {
	var temp_val = 1, clvl = 0;
/*	while (temp_val<=pkt_gracza)
		{ temp_val = temp_val * 1.1;
		clvl=clvl+1; }
	return clvl; */
	var niveau = Math.floor(Math.log(1.1 * pkt_gracza) / Math.log(1.1));
	var niveauSup = Math.floor(Math.log(0.0011 * (pkt_gracza*1000+999)) / Math.log(1.1));
	if (niveau != niveauSup) niveau = niveau + "-" + niveauSup;
	return niveau ;
	}

function Koszt_stat(lvl_statu) {
	var czl1 = 0;
	if (lvl_statu < 0 || lvl_statu > 99) czl1 = 0;	//poza zasiegiem zwroc 0
	else { for (var czl2=1;czl2<=lvl_statu;czl2++) czl1 = czl1 + Math.ceil(10 * Math.pow(1.2, czl2-1));	}
	return czl1; }
	
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
var bw_strona = Ustalstrone();
var bw_domena = Ustaldomene();
switch (bw_strona)
{
case 1: //strona logowania
    break;
case 0: //sala tronowa
	break;
case 3:
    break;
case 4: //sklep
    break;
case 8: //strona wypraw
    break;
case 9: //wiadomosci
	var tab_elem = document.getElementsByTagName("div");
	var temp_str = "", typ_wiadomosci = 0;
    for (var i=0;i<tab_elem.length;i++)
		{ if (tab_elem[i].className == "amblist rlr fll")
        {	typ_wiadomosci = 1; //raport z walki, oblezenia, expy
			break; }
		else if (tab_elem[i].className == "msg-content msg-quest")
		{	typ_wiadomosci = 2; //raport z wyprawy
			break; }
		}
	if (typ_wiadomosci == 1) {
		var tab_id = -1;
		var licznik_tab = new Array(0, 0);
		var tablica_danych = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		tab_elem = document.getElementsByTagName("td");
		for (var i=0;i<tab_elem.length;i++) {
			if (tab_elem[i].className=="atkHit") tab_id=0;
			else if (tab_elem[i].className=="defHit") tab_id=1;
			else tab_id=-1;
			if (tab_id > -1) {
				if (licznik_tab[tab_id]==0) {
					//czytanie dmg i zabitych
					czi1 = tab_elem[i+1].innerHTML.indexOf("/");
					czs1 = tab_elem[i+1].innerHTML;
					czi2 = parseInt(czs1.substr(0,czi1-1));
					czi3 = parseInt(czs1.substr(czi1+1));
					tablica_danych[2+tab_id] = tablica_danych[2+tab_id] + czi2;
					tablica_danych[4+tab_id] = tablica_danych[4+tab_id] + czi3;
					licznik_tab[tab_id]=1; }
				else { //czytanie pkt zycia
					czi1 = tab_elem[i].innerHTML.indexOf("/");
					czs1 = tab_elem[i].innerHTML;
					czi2 = parseInt(czs1.substr(0,czi1-1));
					czi3 = parseInt(czs1.substr(czi1+1));
					tablica_danych[6+tab_id] = tablica_danych[6+tab_id] + czi2;
					tablica_danych[8+tab_id] = tablica_danych[8+tab_id] + czi3;
					//repa
					czs1 = tab_elem[i+1].innerHTML;
					czi2 = parseInt(czs1);
					tablica_danych[10+tab_id] = tablica_danych[10+tab_id] + czi2;
					licznik_tab[tab_id]=0; }
			}
		}
		tab_elem = document.getElementsByTagName("tr");
		for (var i=0;i<tab_elem.length;i++) {
			if (tab_elem[i].className=="versus") {
				var temp_elems = tab_elem[i].getElementsByTagName("td");
				tablica_danych[0] = temp_elems[0].innerHTML;
				tablica_danych[1] = temp_elems[2].innerHTML;
				break; }
		}
		tab_elem = document.getElementsByTagName("div"); //szukanie podsumowania oblezenia
		for (var i=0;i<tab_elem.length;i++) {
			if (tab_elem[i].className=="ambsummary") {
				var temp_elem = document.createElement('table');
				temp_elem.className = 'fight';
				temp_elem.setAttribute('cellspacing', '0');
				temp_elem.setAttribute('cellpadding', '0');
				temp_elem.setAttribute('style','width: 100%; text-align: left');
				temp_elem.innerHTML = '<tr class="tblheader"><td colspan="6" style="text-align: center !important;">'+text_jezyk[bw_domena][6]+'</td></tr><tr class="tblheader"><td width="10%"></td><td width="20%">'+text_jezyk[bw_domena][7]+'</td><td width="24%">'+text_jezyk[bw_domena][8]+'</td><td width="20%">'+text_jezyk[bw_domena][9]+'</td><td width="16%">'+text_jezyk[bw_domena][10]+'</td><td width="10%"></td></tr>';
				temp_elem.innerHTML = temp_elem.innerHTML + '<tr><td></td><td>' + tablica_danych[0] + '</td><td>' + tablica_danych[2] + ' / ' + tablica_danych[4] + '</td><td>' + tablica_danych[6] + ' / ' + tablica_danych[8] + '</td><td>' + tablica_danych[10] + '</td><td></td></tr>';
				temp_elem.innerHTML = temp_elem.innerHTML + '<tr><td></td><td>' + tablica_danych[1] + '</td><td>' + tablica_danych[3] + ' / ' + tablica_danych[5] + '</td><td>' + tablica_danych[7] + ' / ' + tablica_danych[9] + '</td><td>' + tablica_danych[11] + '</td><td></td></tr>';
				tab_elem[i].appendChild(temp_elem);
				break; }
		}
		tab_elem = document.getElementsByTagName("a"); //szukamy linka do wiadomosci
		for (var i=0;i<tab_elem.length;i++) {
			if (tab_elem[i].innerHTML.indexOf('showmsg.php')>-1) { //link do raportu
				tab_elem[i].parentNode.innerHTML = tab_elem[i].parentNode.innerHTML + '<br /><br />'+text_jezyk[bw_domena][12]+'<br />';
				var temp_str = "javascript:post_to_url('http://bw.dck.nspace.pl/report/get_url',{'raport_url':'"+tab_elem[i].innerHTML.replace(/&amp;/g, '&')+"'});";
				if (bw_domena==0) { Dodajelem(tab_elem[i].parentNode, 'a', {'href':'JavaScript:void(0);','style':'font-weight: 700;','onclick':temp_str},text_jezyk[bw_domena][13]+' michaldck');
					tab_elem[i].parentNode.innerHTML = tab_elem[i].parentNode.innerHTML + '<br />'; }
				Dodajelem(tab_elem[i].parentNode, 'a', {'href':'http://www.dreamerman.cba.pl/bw/analizuj.php?linkr=' + escape(tab_elem[i].innerHTML),'target':'_blank'},text_jezyk[bw_domena][14]+' dreamerman');
				tab_elem[i].parentNode.innerHTML = tab_elem[i].parentNode.innerHTML + '<br />';
				Dodajelem(tab_elem[i].parentNode, 'a', {'href':'JavaScript:void(0);','onclick':'JavaScript:post_to_url("https://spreadsheets.google.com/spreadsheet/formResponse?authkey=CPqAkYYE&hl=en_US&formkey=dF9TMjJuN0FicmhaWm5OWmxERVZoc0E6MQ&ifq",{"entry.0.single":"'+tab_elem[i].innerHTML.replace(/&amp;/g, '&')+'"});'},text_jezyk[bw_domena][15]+' '+text_jezyk[bw_domena][16]);
				break; }
		}
	} else if (typ_wiadomosci==2) { //raport z wyprawy
		tab_elem = document.getElementsByTagName("a"); //szukamy linka do wiadomosci
		for (var i=0;i<tab_elem.length;i++) {
			if (tab_elem[i].innerHTML.indexOf('showmsg.php')>-1 && tab_elem[i].getAttribute('target')!='_blank') { //link do raportu
				tab_elem[i].parentNode.innerHTML = tab_elem[i].parentNode.innerHTML + '<br /><br />'+text_jezyk[bw_domena][12]+'<br />';
				var temp_str = "javascript:post_to_url('https://spreadsheets.google.com/spreadsheet/formResponse?hl=en_US&formkey=dEFoT2NaMkRuaEM4NExZZDZnODQwYVE6MQ&ifq',{'entry.0.single':'"+tab_elem[i].innerHTML.replace(/&amp;/g, '&')+"','entry.1.single':'"+Zwroc_adres_kloca()+"'});";
				Dodajelem(tab_elem[i].parentNode, 'a', {'href':'JavaScript:void(0);','style':'font-weight: 700;','onclick':temp_str},text_jezyk[bw_domena][15]+' "Global Quest Stats"');
				tab_elem[i].parentNode.innerHTML = tab_elem[i].parentNode.innerHTML + '<br />';
				if (bw_domena==0) Dodajelem(tab_elem[i].parentNode,'a',{'href':'http://www.bw.h15.pl/','target':'_blank'},text_jezyk[bw_domena][15]+' bw.stats (bw.h15.pl)');
				break; }
		}
	}
	break;
case 10: //profil gracza
	return 0;
    var tab_elem = document.getElementsByTagName("td");
    var temp_str = '<b>'+text_jezyk[bw_domena][0]+'</b>';
    for (var i=0;i<tab_elem.length;i++) {
        if (tab_elem[i].innerHTML == temp_str) {
			var pkt_gracza = tab_elem[i+1].innerHTML;
            tab_elem[i+1].innerHTML = pkt_gracza + " | " + Ustallvl(pkt_gracza) + "lvl";
            break; }
    }
	//wyszukiwanie id gracza i nr serwera
    tab_elem = document.getElementsByTagName("a");
    for (var i=0;i<tab_elem.length;i++) {
		czi1 = tab_elem[i].innerHTML.indexOf('uid=');
        if (czi1>-1) {
			czs1 = tab_elem[i].innerHTML.substr(czi1+4);
			czi2 = parseInt(czs1);
			czs1 = tab_elem[i].innerHTML.substr(8,2);
			czi3 = parseInt(czs1);
            break; }
    }
	var temp_elem = gebi('content-mid'); //dodajemy info o sygnaturze
	if (temp_elem!=null) { Dodajelem(temp_elem,'div',{'align':'center','style':'margin-top: 15px'},text_jezyk[bw_domena][11]+' "http://zk.nakoz.org/'+czi2+'r'+czi3+text_jezyk[bw_domena][4]+'.png"<br /><a href="http://zk.nakoz.org/'+czi2+'r'+czi3+text_jezyk[bw_domena][4]+'.png">SHOW</a><br />INFO: <a href="http://forum.bloodwars.interia.pl/thread.php?threadid=949855">CLICK</a>'); }
    break;
case 11: //podglad klanu - clan view
	return 0;
    var tab_elem = document.getElementsByTagName("td");
	var lczlonkow = 0, nr_lcz = 0, temp_val = 0;
	var temp_str = '<b>'+text_jezyk[bw_domena][2]+'</b>';
    for (var i=0;i<tab_elem.length;i++)
		{ if (tab_elem[i].innerHTML == temp_str)
			{ lczlonkow = parseInt(tab_elem[i+1].innerHTML.substr(0,3));
            break; } }
	if (lczlonkow > 0)
	{ temp_str = '<b>'+text_jezyk[bw_domena][3]+'</b>';
		for (var i=0;i<tab_elem.length;i++)
		{ if (tab_elem[i].innerHTML == temp_str)
			{ nr_lcz = i;
				break; } }
		if (nr_lcz>0)
		{ nr_lcz = nr_lcz + 7;
			for (var i=0;i<lczlonkow;i++)
			{ nr_lcz = nr_lcz + 7;
			temp_val = tab_elem[nr_lcz].innerHTML;
			tab_elem[nr_lcz].innerHTML = temp_val + '&nbsp;(' + Ustallvl(temp_val) + 'lvl)'; }
		}
	}
	break;
case 13: //trening
	for (var i=0;i<9;i++)
		{ czi1 = parseInt(gebi('stat_'+i).innerHTML);
		czi2 = czi2 + Koszt_stat(czi1); }
	var temp_elem2 = gebi('experience').parentNode;
	temp_elem2.setAttribute('style','padding-top: 20px;');
	Dodajelem(temp_elem2,'span',{'style':''},'<br />'+text_jezyk[bw_domena][5]);
	var temp_str = czi2.toString();
	Dodajelem(temp_elem2,'span',{'style':'font-weight: bold; text-align: right; padding-left: 20px;'},temp_str.replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
	break;
default:
    window.status = "Nie rozpoznano strony! -> " + bw_strona;
}   //koniec switch-a
}   //koniec Dzialaj_dbw()


if (document.readyState=='complete') Dzialaj_dbw();
else window.addEventListener('load', function() { Dzialaj_dbw() }, false);

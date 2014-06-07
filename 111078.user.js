 // ==UserScript==
// @name           Desert Operations Script mirror
// @namespace      Dooperations
// @description    Skrypt do Desert Operations pisany od nowa historia nizej
// @include        http://*desert-operations.com/*
// @include        http://*desertops*
// ==/UserScript==


var polowki = GM_getValue('polowki');
if(!polowki) polowki = 1;
var dc=document;
function rand(minimum,maximum){  
   var losowe = minimum+(Math.random()*(maximum-minimum));  
   return Math.round(losowe);  
} 
function implode (glue, pieces) {
    var i = '', retVal='', tGlue='';
    if (arguments.length === 1) {        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (pieces instanceof Array) {            return pieces.join(glue);
        }
        else {
            for (i in pieces) {
                retVal += tGlue + pieces[i];                tGlue = glue;
            }
            return retVal;
        }
    }    else {
        return pieces;
    }
}
function explode(item,delimiter) {
	tempArray=new Array(1);
	var Count=0;
	var tempString=new String(item);
	while (tempString.indexOf(delimiter)>0) {
		tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
		tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
		Count=Count+1
	}
	tempArray[Count]=tempString;
	return tempArray;
} 
function StrSeek( Str, arr ) {
  var bck =Str;
  for( var i=0; i != arr.length-1; i++ ) {
    bck = bck.split( arr[i] );
	if( bck.length > 1 ) bck =bck[1];
	else return null;
  }
  bck =bck.split( arr[i] );
  return bck.length > 1 ? bck[0] : null;
}
function BodySeek( gdzie, arr ) { return StrSeek( gdzie, arr ); }
function sreplace(f, r, s){
	var ra = r instanceof Array, sa = s instanceof Array, l = (f = [].concat(f)).length, r = [].concat(r), i = (s = [].concat(s)).length;
	while(j = 0, i--)
		while(s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j < l);
	return sa ? s : s[0];
}
function ofertyDoTablicy(x){
	var wiersze = dc.getElementsByTagName('tr');
	var tablica = [];
	for(var i=0;i<wiersze.length;i++){
		if(wiersze[i].className == 'odd' && i > 3) tablica.push(wiersze[i]);
		if(wiersze[i].className == 'even' && i > 3) tablica.push(wiersze[i]);
	}
	if(x > 0){
		return tablica[x];
	}
	return tablica; 
}
function czas(){
	var czas = new Date();
	var godzina = czas.getHours();
	var minuta = czas.getMinutes();
	var sekundy = czas.getSeconds();
	if (minuta < 10){
		minuta = "0" + minutes
	}
	var czz = document.createElement('div');
	czz.style.position='fixed';
	czz.style.top='0px';
	czz.style.right='0px';
	czz.style.opacity='0.7'
		czz.innerHTML=godzina+':'+minuta+':'+sekundy;
	document.body.appendChild(czz);
}
function cenaOrazIlosc(){
	var tablicazLiczbami = [];
	var siema = ofertyDoTablicy();
	var wyr3 = /^[\s]+[0-9]+[\s]+M/;
	var wyr4 = /[\s][\s][\s]+[0-9]+[\s]*M/g;
	var ty;
	var yt;
	var ilosc = [];
	var cena = [];
	for(var a = 0;a<siema.length; a++){
		ty = siema[a].innerHTML;
		ty = ty.replace(/<(?:.|\s)*?>/g,'');
		ty = ty.replace(/[\.,]/g,'');
		yt = ty.replace(/^[\s]+[0-9]+[\s]*[A-Za-zŻłó\-0-9-]+/, '');
		if(wyr3.test(ty)==true){
			ilosc[a] = ty.match(/^[\s]+[0-9]+[\s]*M/g);
		}else{
			ilosc[a] = ty.match(/^[\s]+[0-9]+/);
		}
		if(wyr4.test(yt)==true){
			cena[a] = yt.match(/[\s][\s]+[0-9]+[\s]*M/);
		}else{
			cena[a] = yt.match(/[\s][\s]+[0-9]+/);
		}
		tablicazLiczbami[a] = 'ilosc:' + ilosc[a] + ',' + cena[a] + 'cena';
	}
	return tablicazLiczbami;
}
function ceny(){
	var cojest = window.location.toString();
	cojest = BodySeek(cojest, ['&object_id=','&']);
	switch(cojest)
	{
		case 'r_2': return 1000;
		case 'r_3': return 500;
		case 'r_4': return 7;
	}
	var obj = dc.getElementsByName('object_id')[0];
	obj = obj.options[obj.selectedIndex].text;
	obj = BodySeek(obj, [':', 'P']);
	obj = parseInt(obj.replace(/[\s\.,]/g, ''));
	if(obj) return obj;

	
}
function procentCenyGodziwej(){
	var tzL = cenaOrazIlosc();
	var tzP = [];
	var tempil;
	var tempce;
	var rex = /[0-9]+[\s]*M/;
	for(var t = 1; t<tzL.length; t++){
		tempil = BodySeek(tzL[t], ['ilosc:', ',']);
		tempce = BodySeek(tzL[t], [',', 'cena']);
		if(rex.test(tempil)){
			tempce = parseInt(tempce) * 100000;
			tempil = parseInt(tempil) * 100000;
		}else{
			tempil=parseInt(tempil);
			if(tempil*ceny() > 1000000000){
				tempce = parseInt(tempce) * 100000;
			}
			if(rex.test(tempce)){
				tempce = parseInt(tempce) * 100000;
			}else{
				tempce=parseInt(tempce);
			}
		}
		tzP[t]= tempce/tempil;
		tzP[t] = Math.round(tzP[t] * 100 / ceny());
		if(tzP[t] < 50) tzP[t] = Math.round( ( (tempce*100000) / tempil ) * 100 / ceny());
		if(tzP[t] > 7999999) tzP[t] = Math.round( ( tempce / (tempil*100000) ) * 100 / ceny());
	}
	return tzP; // Done Procent w formie liczby
}
function wklepNaStrone(){
	var pro = procentCenyGodziwej();
	var wiersze = dc.getElementsByTagName('tr');
	var tablica = [];
	var proc;
	for(var i=0;i<wiersze.length;i++){
		var td = document.createElement('td');
		if(pro[i-13] < 85){
			td.style.color='lime';
		}
		if(pro[i-13] > 85 && pro[i-13] < 95){
			td.style.color='#99FF33';
		}
		if(pro[i-13] > 95 && pro[i-13] < 105){
			td.style.color='#FFFF66';
		}
		if(pro[i-13] > 105 && pro[i-13] < 115){
			td.style.color='#FF9933';
		}
		if(pro[i-13] > 115){
			td.style.color='red';
		}
		td.innerHTML = pro[i-13]+'%';
		if(wiersze[i].className == 'odd' && i > 3) wiersze[i].appendChild(td);
		if(wiersze[i].className == 'even' && i > 3) wiersze[i].appendChild(td);
	}
}
function rozszyfruj(){
	var ale = document.getElementById('captchaFormForm');
	var ale1=document.createElement('div');
	var cx = rand(5,205);
	ale1.innerHTML= '<input name="buy" value="OK"><input name="captcha.y" value="25"><input name="captcha.x" value="18">';
	ale.appendChild(ale1);
	ale.submit();
}
function czekamNaObrazek(){
	if(document.getElementById('captchaImg')){
		rozszyfruj();
		return true;
	}else{
		setTimeout(czekamNaObrazek, 5);
	}
}

function kupWybranaOferte(ilosc, ktorya){
	var foremki = document.getElementsByName('queryString');
					for(var er=0;er<foremki.length; er++){
						foremki[er].value=window.location;		
					}
					if(ktorya){
						ktorya = ktorya+2;
					}else{
						ktorya=2;
					}
		
			window.location = 'javascript: function captcha(eForm,res) {    if ($("captchaForm") != null) {        $("captchaForm").remove();    }    var scrOff = getScrollY();    var top = 0;    var splitCount = 0;    if (eForm.splitted_count != undefined && eForm.splitted_count != null) {        if(true) {splitCount = (eForm.splitted_count.value * '+polowki+');} else {splitCount = ('+ilosc+')}    } if (res > 0) {splitCount = res}    var tid = eForm.tid.value;    var qs = eForm.queryString.value;    new (Ajax.Request)("Webservices/getCaptcha.php", {parameters: {splitCount: splitCount, tid: tid, buy: "OK", qs: qs, imgPrfx: "images/classic", top: top}, method: "post", onSuccess: function (transport) {elements = $$("body");elements[0].insert(transport.responseText);new (Effect.Grow)("captchaForm", {duration: 0.0, direction: "top-left"});}});}; captcha(document.forms['+ktorya+'], 0); void 0; ';//
			var captchaaa=GM_getValue('captchaaa');
			/*if(captchaaa == '1'){
				GM_setValue('captchaaa', '2');
				czekamNaObrazek();
			}else{
				GM_setValue('captchaaa', '1');
			}//czekamNaObrazek();*/

}
function wybranieOfertyNajtanszej(){
	var oferty = procentCenyGodziwej();
	for(var op = 1; op<oferty.length; op++){
		if(oferty[op] <110)
		{
				return op;
		}
		
	}
	return false;
}
function zlapanieOfertyNajtanszej(){
	var licz = wybranieOfertyNajtanszej();
	if(licz==false){
		return false;
	}
	var ofta = cenaOrazIlosc()[licz];
	if(ofta) {
		ofta = BodySeek(ofta, ['ilosc:', ',']);
		ofta = parseInt(sreplace('M', '00000', ofta.replace(/[\s]+/g,'')));
		kupWybranaOferte(ofta,(licz-1));
		return ofta;
	}
return false;
	

}
function wybranieOfertyNajwiekszej(){
	var pierwszyRekord = cenaOrazIlosc()[1];

	if(pierwszyRekord) {
		pierwszyRekord = BodySeek(pierwszyRekord, ['ilosc:', ',']); // tylko pierwsza oferta mnie interesuje bo jest najwyzsza, zawsze.
		pierwszyRekord = parseInt(sreplace('M', '00000', pierwszyRekord.replace(/[\s]+/g,'')));
		if(pierwszyRekord > 999999999) {
			kupWybranaOferte(pierwszyRekord, 0);
			return pierwszyRekord;
		}
	}
	return false
}
function kupnoOdKogos(){
	var pierwszyRekord = cenaOrazIlosc()[1] // tylko pierwsza oferta mnie interesuje bo jest najwyzsza, zawsze.
	if(pierwszyRekord){
		pierwszyRekord = BodySeek(pierwszyRekord, ['ilosc:', ',']);
		pierwszyRekord = parseInt(sreplace('M', '00000', pierwszyRekord.replace(/[\s]+/g,'')));	
		kupWybranaOferte(pierwszyRekord,0);
		return pierwszyRekord;
	}
	return false
}
function jakiesMenu(){
		var cM = document.createElement('div');
		var pN = document.createElement('input');
		var bN = document.createElement('input');
		pN.id = 'pn';
		pN.type = 'text';
		bN.type='button';
		bN.value='wybierz';
		var polowkiq=GM_getValue('polowki');
		if(polowkiq=='1'){
			var zaznacz = '<font color="lime">(teraz łapie)</font>';
		}
		else{
			var zaznacz = '';
			if(polowkiq =='2'){
				var zaznaczw = '<font color="lime">(teraz łapie)</font>';
			}else{
				var zaznaczw = '';
			}
			
		}
		
		if(polowkiq!='2') var zaznaczw = '';
		bN.setAttribute('onClick', "javascript: var siemana = document.getElementById('pn'); window.open('handel.php?mode=1&username='+siemana.value+'&skrypt=1&username_partly=1&search_user=Szukaj+oferty', '0')");
		cM.style.position='relative';
		cM.style.top='0px';
		cM.style.right='0px';
		cM.innerHTML = '<div class="infopanel"><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_2&goods_partly=1&skrypt=1&co=2&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Złoto</strong></a><a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_3&goods_partly=1&skrypt=1&co=2&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Ropa</strong></a><<a style="display: block;color:lime" href="handel.php?mode=1&object_id=r_4&goods_partly=1&skrypt=1&search_goods=Szukaj+oferty" target="0"><img id="friendsArrow" src="images/classic/arrow_down.jpg" class="icon"> <strong>Ammo</strong></a><a href="uebersicht.php?polowki=1&ok">Łap połówki</a>'+zaznacz+'<br><a href="uebersicht.php?polowki=2&ok">Łap całe oferty</a>'+zaznaczw+'</div>';
		document.body.appendChild(cM);
		cM.appendChild(pN);
		cM.appendChild(bN);
	}
function odpalHnadle(){
	var strona=BodySeek(window.location.toString(), ['world1/','.php']);
	var strona2=BodySeek(window.location.toString(), ['world2/','.php']);
	var skrypt=BodySeek(window.location.toString(), ['&skrypt=','&']);
	var polowkia=BodySeek(window.location.toString(), ['?polowki=','&']);
	var odkogos = BodySeek(window.location.toString(), ['&username','&']);
	if(strona == 'uebersicht' || strona2 == 'uebersicht' || strona == '/uebersicht' || strona2 == '/uebersicht'){
		//czas();
		if(polowkia){
			GM_setValue('polowki', polowkia);
			if(polowkia == '1'){
				alert('BD ŁAPAŁ POŁÓWKI');
			}
			else{
				alert('BD ŁAPAŁ CAŁE OFERTY');
			}
		}
		jakiesMenu();
		return false;
	}
	if(!skrypt){
		wklepNaStrone();
		return false;
	}
	if(odkogos){
		if(kupnoOdKogos() == false) window.location=window.location;
		return false;
	}else{
		if(wybranieOfertyNajwiekszej() == false) window.location=window.location;
		return false;
	}
	window.location=window.location;
}
odpalHnadle();


/**************************************/


/*Dziękóweczka, Pozdrowienia od SzpaQ*/




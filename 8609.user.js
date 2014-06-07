//Sin conocimiento en scripts y mucho menos Polaco 
//se logró traducir el Wiadomosci original.

//La herramienta es muy util pero aún hay que detallarla
// A DISFRUTARLA Y A SEGUIR APORTANDO IDEAS 

// ==UserScript==
// @name           Wiadomosci traducido por Tieso v0.1
// @namespace      li-on@wp.pl
// @description    Administrador de mensajes traducido por Tieso v0.1
// @include        http://*/game/messages.php*
// @include	http://*/bericht.php*
// ==/UserScript==

var adres = document.location;//potrzebne
var reg = /http:\/\/(.*?)\/game\/(.*?)\?session=(.*?)/i;
var result = reg.exec(adres);
var server = result[1];//potrzebne

var typy=new Array(1,2,3,4,5,6,7,0,10);
var nazwy=new Array("RS","Flota","Recogida","Defensa","Alineacion","Msjs","Batallas","Entrega y espias","Todo");//categories names

var str = GM_getValue('wiadomosci_'+server);
if(str!=null && str!=''){
	var wiadomosci=str.split('##');
}else{
	var wiadomosci=new Array();
}
il_wiad=wiadomosci.length;

function zapisz(){
	str=wiadomosci.join('##');
	GM_setValue('wiadomosci_'+server,str);
}
	

function zapamietaj(){//save message
	var data=this.parentNode.parentNode.previousSibling.previousSibling.childNodes[3].innerHTML;
	var od=this.parentNode.parentNode.previousSibling.previousSibling.childNodes[5].innerHTML;
	var temat=this.parentNode.parentNode.previousSibling.previousSibling.childNodes[7].innerHTML;
	var tresc=this.parentNode.nextSibling.innerHTML;
	var typ=0;//inne
	if(od.indexOf(unescape("Dow%F3dztwo%20floty"))==0){//fleet other
			typ=2;
			if(temat.indexOf("Raport szpiegowski")!=-1) typ=1;//spy reports
	}
	if(od.indexOf("Flota")==0) typ=3;//recyclers
	if(od.indexOf("Perymetr Obrony")==0) typ=4;//scans
	if(od.indexOf("Sojusz")==0) typ=5;//ally messages
	if(od.indexOf("[")!=-1 && typ!=5) typ=6;//player messages
	temat=escape(temat);	
	tresc=escape(tresc);		
	var wiadomosc=data+"||"+od+"||"+temat+"||"+tresc+"||"+typ;
	wiadomosci[il_wiad++]=wiadomosc;
	zapisz();
}

function zapamietaj_rw(){//save battle report
	var tresc=document.getElementsByTagName("center")[0].innerHTML;
	var z1=tresc.indexOf("<td>")+6;
	var z2=tresc.indexOf("Agresor")+8;//Attacker name start
	var z3=tresc.indexOf("<br>",z2);
	var z4=tresc.indexOf(unescape("Obro%u0144ca"))+8;//Defender name start
	var z5=tresc.indexOf("<br>",z4);
	var data=tresc.substring(z1,z1+15);
	var agresor=tresc.substring(z2,z3);
	var obronca=tresc.substring(z4,z5);
	
	var wiadomosc=data+"|| RW ||"+escape(agresor+" vs. "+obronca)+"||"+escape(tresc)+"||7";
	wiadomosci[il_wiad++]=wiadomosc;
	zapisz();
}

function pokaz_rw(){//show battle report
	var obj=this.parentNode.parentNode.nextSibling.firstChild.firstChild;
	if(obj.style.display=='none'){
		obj.style.display='block';
	}else{
		obj.style.display='none';
	}
}

function usun(){//delete message
	var do_us=parseInt(this.getAttribute('num'));
	var typ_w=parseInt(this.getAttribute('wiadom'));
	wiadomosci.splice(do_us,1);
	il_wiad--;
	zapisz();
	pokaz(typ_w);
	return true;
}

function pokaz(typw){//show category
	var tabela=document.getElementsByTagName("table")[6];
	while(tabela.firstChild) tabela.removeChild(tabela.firstChild);
	//tabela.innerHTML='';
	tbody=document.createElement('tbody');
	
	w=document.createElement('tr');
	x=document.createElement('th');
	x.setAttribute('colspan','4');
	x.setAttribute('width','519');
	x.className='c';
	x.innerHTML="Administrador de mensajes";
	w.appendChild(x);
	tbody.appendChild(w);
	
//wybor typu wiadomosci
	w=document.createElement('tr');
	x=document.createElement('th');
	x.setAttribute('colspan','4');
	x.setAttribute('width','519');
	
	for(i=0;i<typy.length;i++){
		y=document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('wiadom',typy[i]);
		y.setAttribute('value',nazwy[i]);
		y.addEventListener('click',pokaz2,true);
		x.appendChild(y);
	}
	w.appendChild(x);
	tbody.appendChild(w);
//	

	w=document.createElement('tr');
	x=document.createElement('th');
	x.innerHTML="Accion";//headers like in message table
	w.appendChild(x);
	x=document.createElement('th');
	x.innerHTML="Fecha";
	w.appendChild(x);
	x=document.createElement('th');
	x.innerHTML="De";
	w.appendChild(x);
	x=document.createElement('th');
	x.innerHTML="Asunto";
	w.appendChild(x);
	tbody.appendChild(w);
	for(i=0;i<il_wiad;i++){
		var wiadomosc=wiadomosci[i].split('||');
		if(!wiadomosc[4]) wiadomosc[4]=0;//kompatybilnosc wstecz
		if(parseInt(wiadomosc[4])==typw || typw==10){
		w=document.createElement('tr');
		x=document.createElement('th');
		
		y=document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('num',i);
		y.setAttribute('wiadom',typw);
		y.setAttribute('value','Eliminar');
		y.addEventListener('click',usun,true);
		x.appendChild(y);
		w.appendChild(x);
		
		x=document.createElement('th');
		x.innerHTML=wiadomosc[0];
		w.appendChild(x);
		
		x=document.createElement('th');
		x.innerHTML=wiadomosc[1];
		w.appendChild(x);
		
		x=document.createElement('th');
		if(parseInt(wiadomosc[4])==7){//rw ukryte
			y=document.createElement('font');
			y.setAttribute("color","red");
			y.innerHTML=unescape(wiadomosc[2]);
			y.addEventListener('click',pokaz_rw,true);
			x.appendChild(y);
		}else{
			x.innerHTML=unescape(wiadomosc[2]);
		}
		w.appendChild(x);
		tbody.appendChild(w);

		w=document.createElement('tr');
		x=document.createElement('td');
		x.className='b';
		x.setAttribute('colspan','4');
		x.setAttribute('width','519');
		if(parseInt(wiadomosc[4])==7){//rw ukryte
			y=document.createElement('center');
			y.style.display='none';
			y.innerHTML=unescape(wiadomosc[3]);
			x.appendChild(y);
		}else{
			x.innerHTML=unescape(wiadomosc[3]);
		}
		w.appendChild(x);
		tbody.appendChild(w);
		}
	}
	//tabela.style['position']="relative";
	//tabela.style['top']="1";
	tabela.appendChild(tbody);
	return true;
}

function pokaz2(){
	var do_pok=parseInt(this.getAttribute('wiadom'));
	pokaz(do_pok);
	return true;
}

if(adres.href.indexOf("bericht.php")==-1){

	var td=document.getElementsByTagName("td");
	for(i=20;i<td.length;i++){
		if(td[i].className=='b' && td[i].innerHTML==' '){
			w=document.createElement('input');
			w.setAttribute('type','button');
			w.setAttribute('value','Grabar'); //save button
			w.addEventListener('click',zapamietaj,true);
			td[i].appendChild(w);
		}
	}

	var tabela=document.getElementsByTagName("table")[6].childNodes[1];
	w=document.createElement('tr');
	x=document.createElement('th');
	x.setAttribute('colspan','4');
	x.setAttribute('width','519');

	for(i=0;i<typy.length;i++){
		y=document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('wiadom',typy[i]);
		y.setAttribute('value',nazwy[i]);
		y.addEventListener('click',pokaz2,true);
		x.appendChild(y);
	}
	w.appendChild(x);
	tabela.insertBefore(w,tabela.firstChild);
		

}else{//zapis RW
	var body=document.getElementsByTagName("body")[0];
	w=document.createElement('input');
	w.setAttribute('type','button');
	w.setAttribute('value','Grabar batalla');//save battle report button
	w.addEventListener('click',zapamietaj_rw,true);
	body.appendChild(w);
	body.insertBefore(w,body.firstChild);
	
}

str = GM_getValue("fr");
	if(str==null){ //copyright and no warranty message
	alert(unescape("Niniejszy%20skrypt%20jest%20darmowy%20mo%u017Cesz%20go%20%0Arozprowadza%u0107%20dalej%20i/lub%20modyfikowa%u0107%20%0Apod%20warunkiem%20nie%20pobierania%20z%20tego%20tytu%u0142u%20%0Aop%u0142at%20%28z%20wyj%u0105tkiem%20ceny%20no%u015Bnika%29%0Ai%20zachowania%20tej%20informacji%0ANiniejszy%20skrypt%20rozpowszechniany%20jest%20%0A%0ABEZ%20JAKIEJKOLWIEK%20GWARANCJI%20%0A%0AU%u017Cywanie%20skryptu%20mo%u017Ce%20by%u0107%20niezgodne%20z%20regulaminem%20gry"));
	GM_setValue("fr","lion")
	}
// ==UserScript==
// @name            Suma transportu
// @description     Suma lecacych do nas surowcow
// @version         2.0
// @date            2006-11-03
// @creator         Lukasz Tatera <admin@foxgame.xorg.pl>
// @include         http://*/game/overview.php*
// ==/UserScript==

function kropka(wart){
	var wynik="";
	var wyraz='';
	var dlugosc=0;
	wyraz=wart.toString();
	dlugosc=wyraz.length;
	maks=wyraz.length;
	reszta=(dlugosc%3);
	if(reszta>0){
	wyraz1=wyraz.substring(0,reszta);
	wynik=wyraz1;
	dlugosc=dlugosc-reszta;
	wyraz=wyraz.substring(reszta);
	}
	while(dlugosc>2){
	wyraz1=wyraz.substring(0,3);
	dlugosc=dlugosc-3;
	if(dlugosc==maks-3 && reszta==0)wynik+=wyraz1;
	else wynik+='.'+wyraz1;
	wyraz=wyraz.substring(3);
	}
	return wynik;
	
}

function getElementsByClassName(clsName,htmltag,what){
   var arr = new Array();
   var elems = document.getElementsByTagName(htmltag);
   for ( var cls, i = 0; ( elem = elems[i] ); i++ ){
      if ( elem.className == clsName && elem.getAttribute("onmouseover")!=undefined && elem.getAttribute("onmouseover").indexOf(what)!=-1){
         arr[arr.length] = elem;
      }
   }
   return arr;
} 

var planeta = document.evaluate("/html/body/center/table[last()]/tbody/tr[last()-1]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerHTML;
// Suma dla misji : Transportuj
var transport=getElementsByClassName("owntransport","a","Metal");
var metal_t=krysztal_t=deuter_t=metal_t_p=krysztal_t_p=deuter_t_p=0;
for(i=0;i<transport.length;i++){
tekst=transport[i].getAttribute("onmouseover");
tekst_caly=transport[i].parentNode;
temp=tekst_caly.innerHTML.substring(tekst_caly.innerHTML.lastIndexOf('planet')+8);
me=tekst.substring(tekst.indexOf('Metal: ')+7);
kr=tekst.substring(tekst.indexOf('Kryszta')+10);
de=tekst.substring(tekst.indexOf('Deuter: ')+8);
if(temp.indexOf(planeta)){
metal_t_p+=parseInt(me.substring(me.indexOf('br')-1,0));
krysztal_t_p+=parseInt(kr.substring(kr.indexOf('br')-1,0));
deuter_t_p+=parseInt(de.substring(0,de.length-2));
}
metal_t+=parseInt(me.substring(me.indexOf('br')-1,0).replace(/\./g,''));
krysztal_t+=parseInt(kr.substring(kr.indexOf('br')-1,0).replace(/\./g,''));
deuter_t+=parseInt(de.substring(0,de.length-2).replace(/\./g,''));
}

// Suma dla misji : Stacjonuj
var station=getElementsByClassName("owndeploy","a","Metal");
var metal_s=krysztal_s=deuter_s=metal_s_p=krysztal_s_p=deuter_s_p=0;
for(i=0;i<station.length;i++){
tekst=station[i].getAttribute("onmouseover");
tekst_caly=station[i].parentNode;
temp=tekst_caly.innerHTML.substring(tekst_caly.innerHTML.lastIndexOf('planet')+8);
me=tekst.substring(tekst.indexOf('Metal: ')+7);
kr=tekst.substring(tekst.indexOf('Kryszta')+10);
de=tekst.substring(tekst.indexOf('Deuter: ')+8);
if(temp.indexOf(planeta)){
metal_s_p+=parseInt(me.substring(me.indexOf('br')-1,0));
krysztal_s_p+=parseInt(kr.substring(kr.indexOf('br')-1,0));
deuter_s_p+=parseInt(de.substring(0,de.length-2));
}
metal_s+=parseInt(me.substring(me.indexOf('br')-1,0).replace(/\./g,''));
krysztal_s+=parseInt(kr.substring(kr.indexOf('br')-1,0).replace(/\./g,''));
deuter_s+=parseInt(de.substring(0,de.length-2).replace(/\./g,''));
}

// Suma dla misji : Zbieraj
var zbieraj=getElementsByClassName("ownharvest","a","Metal");
var metal_z=krysztal_z=deuter_z=metal_z_p=krysztal_z_p=deuter_z_p=0;
for(i=0;i<zbieraj.length;i++){
tekst=zbieraj[i].getAttribute("onmouseover");
tekst_caly=zbieraj[i].parentNode;
temp=tekst_caly.innerHTML.substring(tekst_caly.innerHTML.lastIndexOf('planet')+8);
me=tekst.substring(tekst.indexOf('Metal: ')+7);
kr=tekst.substring(tekst.indexOf('Kryszta')+10);
de=tekst.substring(tekst.indexOf('Deuter: ')+8);
if(temp.indexOf(planeta)){
metal_z_p+=parseInt(me.substring(me.indexOf('br')-1,0));
krysztal_z_p+=parseInt(kr.substring(kr.indexOf('br')-1,0));
deuter_z_p+=parseInt(de.substring(0,de.length-2));
}
metal_z+=parseInt(me.substring(me.indexOf('br')-1,0).replace(/\./g,''));
krysztal_z+=parseInt(kr.substring(kr.indexOf('br')-1,0).replace(/\./g,''));
deuter_z+=parseInt(de.substring(0,de.length-2).replace(/\./g,''));
}


// Suma dla misji : Napadaj
var napadaj=getElementsByClassName("ownattack","a","Metal");
var metal_n=krysztal_n=deuter_n=metal_n_p=krysztal_n_p=deuter_n_p=0;
for(i=0;i<napadaj.length;i++){
tekst=napadaj[i].getAttribute("onmouseover");
tekst_caly=napadaj[i].parentNode;
temp=tekst_caly.innerHTML.substring(tekst_caly.innerHTML.lastIndexOf('planet')+8);
me=tekst.substring(tekst.indexOf('Metal: ')+7);
kr=tekst.substring(tekst.indexOf('Kryszta')+10);
de=tekst.substring(tekst.indexOf('Deuter: ')+8);
if(temp.indexOf(planeta)){
metal_n_p+=parseInt(me.substring(me.indexOf('br')-1,0));
krysztal_n_p+=parseInt(kr.substring(kr.indexOf('br')-1,0));
deuter_n_p+=parseInt(de.substring(0,de.length-2));
}
metal_n+=parseInt(me.substring(me.indexOf('br')-1,0).replace(/\./g,''));
krysztal_n+=parseInt(kr.substring(kr.indexOf('br')-1,0).replace(/\./g,''));
deuter_n+=parseInt(de.substring(0,de.length-2).replace(/\./g,''));
}

var main = document.evaluate("/html/body/center/table[last()]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
//c = document.createElement("table");
//c.width=519;
c=main;
x = document.createElement("tr");
y = document.createElement("td");
y.innerHTML = 'Suma surowcow';
y.colSpan = 4;
y.className = 'c';
x.appendChild(y);	
c.appendChild(x);


// Misja :transportuj
if(metal_t!=0 || krysztal_t!=0 || deuter_t!=0){
x = document.createElement("tr");
y = document.createElement("th");
y.innerHTML = 'Surowce z misji <span class="return owntransport">transportuj</span>';
y.colSpan=3;
x.appendChild(y);		
z = document.createElement("th");
tabela=document.createElement("table");
tabela.width='100%';
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Metal: ';
nazwa.className = 'c';
nazwa.width='30%';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(metal_t);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Krysztal: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(krysztal_t);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Deuter: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(deuter_t);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
z.appendChild(tabela);
x.appendChild(z);			
c.appendChild(x);
}
if(metal_s!=0 || krysztal_s!=0 || deuter_s!=0){
// Misja :stacjonuj
x = document.createElement("tr");
y = document.createElement("th");
y.innerHTML = 'Surowce z misji <span class="return owntransport">stacjonuj</b>';
y.colSpan=3;
x.appendChild(y);		
z = document.createElement("th");
tabela=document.createElement("table");
tabela.width='100%';
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Metal: ';
nazwa.className = 'c';
nazwa.width='30%';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(metal_s);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Krysztal: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(krysztal_s);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Deuter: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(deuter_s);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
z.appendChild(tabela);
x.appendChild(z);			
c.appendChild(x);
}
if(metal_z!=0 || krysztal_z!=0 || deuter_z!=0){
// Misja : zbieraj
x = document.createElement("tr");
y = document.createElement("th");
y.innerHTML = 'Surowce z misji <span class="return owntransport">zbieraj</span>';
y.colSpan=3;
x.appendChild(y);		
z = document.createElement("th");
tabela=document.createElement("table");
tabela.width='100%';
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Metal: ';
nazwa.className = 'c';
nazwa.width='30%';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(metal_z);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Krysztal: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(krysztal_z);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Deuter: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(deuter_z);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
z.appendChild(tabela);
x.appendChild(z);			
c.appendChild(x);
}
if(metal_n!=0 || krysztal_n!=0 || deuter_n!=0){
// Misja : napadaj
x = document.createElement("tr");
y = document.createElement("th");
y.innerHTML = 'Surowce z misji <span class="return owntransport">napadaj</span>';
y.colSpan=3;
x.appendChild(y);		
z = document.createElement("th");
tabela=document.createElement("table");
tabela.width='100%';
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Metal: ';
nazwa.className = 'c';
nazwa.width='30%';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(metal_n);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Krysztal: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(krysztal_n);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Deuter: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(deuter_n);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
z.appendChild(tabela);
x.appendChild(z);			
c.appendChild(x);
}
if(metal_t+metal_s+metal_z+metal_n!=0 || krysztal_t+krysztal_s+krysztal_z+krysztal_n!=0 || deuter_t+deuter_s+deuter_z+deuter_n!=0){
// Misja : napadaj
x = document.createElement("tr");
y = document.createElement("th");
y.innerHTML = '<span class="return owntransport">Wszystkie surowce w powietrzu</span>';
y.colSpan=3;
x.appendChild(y);		
z = document.createElement("th");
tabela=document.createElement("table");
tabela.width='100%';
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Metal: ';
nazwa.className = 'c';
nazwa.width='30%';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(metal_t+metal_s+metal_z+metal_n);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Krysztal: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(krysztal_t+krysztal_s+krysztal_z+krysztal_n);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
wiersz = document.createElement("tr");
nazwa = document.createElement("td");
nazwa.innerHTML = 'Deuter: ';
nazwa.className = 'c';
wartosc = document.createElement("td");
wartosc.innerHTML = kropka(deuter_t+deuter_s+deuter_z+deuter_n);
wartosc.className = 'c';
wartosc.align = 'right';
wiersz.appendChild(nazwa);
wiersz.appendChild(wartosc);
tabela.appendChild(wiersz);
z.appendChild(tabela);
x.appendChild(z);			
c.appendChild(x);
}
//main.parentNode.insertBefore(c,main);
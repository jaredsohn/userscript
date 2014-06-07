// ==UserScript==
// @name          Ogame planet order
// @namespace     li-on@wp.pl
// @description   Ogame Your planet order PL
// @include       http://*/game/*.php*session=*
// ==/UserScript==

//Planet order which you want
var kolejnosc=new Array(1,5,4,11,2,9,10,7,8,6,3);
//koniec konfiguracji

var sel=document.getElementsByTagName('select');
var il2=kolejnosc.length;
var akt=0;
if(sel[0]!=null && sel[0].getAttribute('onchange')=='haha(this)'){
	var il1=sel[0].length;
	if(il1!=il2) alert('Konfiguracja skryptu jest nieprawidlowa');
	var opcje=new Array();
	for(var i=il2-1;i>=0;i--){//zapisywanie i usuwanie
		opcje[i]=document.createElement('option');
		opcje[i].text=sel[0].options[i].text;
		if(opcje[i].text.indexOf('Ksi')==0 && opcje[i].text.indexOf('yc')==5){//moon detect - without 2 chars (Ksiezyc)
			//zn=opcje[i].text.charCodeAt(4);
			//alert(zn);
			opcje[i].text='- '+opcje[i].text;
		}
		opcje[i].value=sel[0].options[i].value;
		opcje[i].selected=sel[0].options[i].selected;
		sel[0].remove(i);
		//sel[0].options[i];
	}
	for(i=0;i<il2;i++){
		if(opcje[i].selected){
			akt=i;
		}
		sel[0].add(opcje[kolejnosc[i]-1],null);
	}		
}

var th=document.getElementsByTagName('th');
var t=document.location.href;
if(t.indexOf('flotten2.php')!=-1){
	var linki=new Array();
	var j=0;
	for(i=0;i<il2-1;i++,j++){
		if(j==akt) j++;
		linki[j]=th[18+i].innerHTML;
	}
	i=0;
	for(j=0;j<il2;j++,i++){
		if(kolejnosc[j]-1==akt) j++;
		th[18+i].innerHTML=linki[kolejnosc[j]-1];	
	}
}
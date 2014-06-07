//Niniejszy skrypt jest darmowy mozesz go 
//rozprowadzac dalej i/lub modyfikowac 
//pod warunkiem nie pobierania z tego tytulu oplat
//(z wyjatkiem ceny nosnika)
//i zachowania tej informacji

//Niniejszy skrypt rozpowszechniany jest 
// BEZ JAKIEJKOLWIEK GWARANCJI 

//Uzywanie skryptu moze byc niezgodne z regulaminem gry

// ==UserScript==
// @name           Lista planet 2
// @namespace      li-on@wp.pl
// @description    Dodaje liste planet na gorze strony
// @include        http://*/game/*.php*
// ==/UserScript==

var sel=document.getElementsByTagName('select');
if(sel[0]!=null && sel[0].getAttribute('onchange')=='haha(this)'){
	var il=sel[0].length;
	//var opcje=new Array();
	var pl=0;
	var x=new Array();//planety
	var y=new Array();//moony
	var k=new Array();//koordy
	var tab=document.getElementsByTagName('body')[0];
	var c=document.createElement('div');
	c.style.position="fixed";
	c.style.top="5px"; //od gory
	
	c.style.right="5px"; //do prawej
	//c.style.left="2px"; //do lewej
	document.getElementsByTagName('body')[0].style.marginRight="100px"; //tresc do lewej
	//document.getElementsByTagName('body')[0].style.marginLeft="100px"; //tresc do prawej
	
	c.style.display="block";
	c.style.background="#202020"; //tlo - kolor
	
	var html='<center>';
	var komorki=document.getElementsByTagName("td");
	
	//surowce
	html+='<table width="150">';
	var m=0;
	if(komorki[6].innerHTML=='') m=1;
	for(i=0;i<4;i++){
		html+='<tr><td class="c" vailgn="center">'+komorki[6+m+i].innerHTML+'</td>';
		html+='<td class="l" vailgn="center" align="center"><b>'+komorki[12+m+i].innerHTML+'<br>'+komorki[18+m+i].innerHTML+'</b></td></tr>';
	}
	html+="</table><br>";
	
	//lista planet
	html+='<table width="150">';
	var regk=/(\[\d+:\d+:\d+\])/;
	for(var i=0;i<il;i++){//zapisywanie planet
		s=sel[0].options[i].text;
		if(s.indexOf("Ksi\u0119\u017Cyc")==-1){
			k[pl]=s.match(regk)[1];
			if(sel[0].options[i].selected)
				x[pl]='<font color="red"><b>'+s.replace(k[pl],'')+'</b></font>';
			else
				x[pl]='<a href="'+sel[0].options[i].value+'">'+s.replace(k[pl],'')+'</a>';
			y[pl]='';
			pl++;
		}
	}
	for(var i=0;i<il;i++){//zapisywanie moonow
		s=sel[0].options[i].text;
		if(s.indexOf("Ksi\u0119\u017Cyc")!=-1){
			t=k.indexOf(s.match(regk)[1]);
			if(sel[0].options[i].selected)
				y[t]='<font color="red"><b>'+s.replace(k[t],'').replace('(Ksi\u0119\u017Cyc)','')+'</b></font>';
			else
				y[t]='<a href="'+sel[0].options[i].value+'">'+s.replace(k[t],'').replace('(Ksi\u0119\u017Cyc)','')+'</a>';
		}
	}
	
	
	for(i=0;i<pl;i++){
		if(y[i]!=''){
			html+='<tr><td class="c" align="center" rowspan="2">'+k[i]+'</td>';
			html+='<td class="l">'+x[i]+'</td></tr>';
			html+='<tr><td class="l">'+y[i]+'</td></tr>';
		}else{
			html+='<tr><td class="c" align="center">'+k[i]+'</td>';
			html+='<td class="l">'+x[i]+'</td></tr>';
		}
	}
	
	html+="</table></center>";
	//koniec listy planet
	/*
	//pole wyboru
	html+=sel[0].parentNode.previousSibling.previousSibling.innerHTML+'<br>';
	html+='<select size="1" onchange="haha(this)">'+sel[0].innerHTML+'</select>';
	regpzp=/(<input[^>]+>)/ig;
	przyciski=sel[0].parentNode.innerHTML.match(regpzp);
	if(przyciski.length>=2){
		html+='<br>'+przyciski[0]+przyciski[1]+'<br>';
	}
	//koniec pole wyboru
	*/
	c.innerHTML=html;
	tab.appendChild(c);
	
	sel[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display='none';	//ukrywa dotychczasowy naglowek
	
}

str = GM_getValue("fr");
	if(str==null){ 
	alert(unescape("Niniejszy%20skrypt%20jest%20darmowy%20mo%u017Cesz%20go%20%0Arozprowadza%u0107%20dalej%20i/lub%20modyfikowa%u0107%20%0Apod%20warunkiem%20nie%20pobierania%20z%20tego%20tytu%u0142u%20%0Aop%u0142at%20%28z%20wyj%u0105tkiem%20ceny%20no%u015Bnika%29%0Ai%20zachowania%20tej%20informacji%0ANiniejszy%20skrypt%20rozpowszechniany%20jest%20%0A%0ABEZ%20JAKIEJKOLWIEK%20GWARANCJI%20%0A%0AU%u017Cywanie%20skryptu%20mo%u017Ce%20by%u0107%20niezgodne%20z%20regulaminem%20gry"));
	GM_setValue("fr","lion")
	}

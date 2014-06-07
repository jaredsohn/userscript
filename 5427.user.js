
// ==UserScript==
// @name          Travian2GM
// @author	      Michael Schimpl using code from Thorsten Zoerner
// @description	  Deutsch: Verwendet Thorsten Zoerners TravianGM-Code. 1) Funktioniert nun auch für travian.at, travian.org, usw... 2) Suchfilter für richtigen td-tag angepasst 3) Gibt den Zeitpunkt an, zu dem die Resource gebaut werden kann.
// @include       http://*.travian.*/*
// ==/UserScript==

function reverseNumsort (a, b) {
  return b - a; 
}

function Del(Word) {
  a = Word.indexOf("<");
  b = Word.indexOf(">");
  len = Word.length;
  c = Word.substring(0, a);
  if(b == -1)
  b = a;
  d = Word.substring((b + 1), len);
  Word = c + d;
  tagCheck = Word.indexOf("<");
  if(tagCheck != -1)
  Word = Del(Word);
  return Word;
}


window.setTimeout(function() {
  tds=document.getElementsByTagName("td");
  for(i=0;i<tds.length;i++){
  	td=tds[i];
  	if(td.innerHTML.search(/\|/) > 0 && td.innerHTML.search(/td/) < 0) {
  		clearstr=Del(td.innerHTML);
  		if(clearstr.length>5) {
  			j=clearstr.indexOf("|");
  			holz=clearstr.substr(0,j);
  			j++;
  			clearstr=clearstr.substr(j);
  			prod_holz=document.getElementById("l1").title;
  			haben_holz=document.getElementById("l1").innerHTML;
  			haben_holz=haben_holz.substr(0,haben_holz.indexOf("/"));
  			hr_holz=((holz-haben_holz)/prod_holz)*3600000;
  			if(hr_holz<0) hr_holz=0;
  
  			j=clearstr.indexOf("|");
  			lehm=clearstr.substr(0,j);
  			j++;
  			clearstr=clearstr.substr(j);
  			prod_lehm=document.getElementById("l2").title;
  			haben_lehm=document.getElementById("l2").innerHTML;
  			haben_lehm=haben_lehm.substr(0,haben_lehm.indexOf("/"));
  			hr_lehm=((lehm-haben_lehm)/prod_lehm)*3600000;
  			if(hr_lehm<0) hr_lehm=0;
  
  			j=clearstr.indexOf("|");
  			eisen=clearstr.substr(0,j);
  			j++;
  			clearstr=clearstr.substr(j);
  			prod_eisen=document.getElementById("l3").title;
  			haben_eisen=document.getElementById("l3").innerHTML;
  			haben_eisen=haben_eisen.substr(0,haben_eisen.indexOf("/"));
  			hr_eisen=((eisen-haben_eisen)/prod_eisen)*3600000;
  			if(hr_eisen<0) hr_eisen=0;
  
  			j=clearstr.indexOf("|");
  			getreide=clearstr.substr(0,j);
  			j++;
  			clearstr=clearstr.substr(j);
  			prod_getreide=document.getElementById("l4").title;
  			haben_getreide=document.getElementById("l4").innerHTML;
  			haben_getreide=haben_getreide.substr(0,haben_getreide.indexOf("/"));
  			hr_getreide=((getreide-haben_getreide)/prod_getreide)*3600000;
  			if(hr_getreide<0) hr_getreide=0;
  
  			//alert(getreide);
  		}
  		hr_arr = new Array(Math.round(hr_holz), Math.round(hr_lehm), Math.round(hr_eisen), Math.round(hr_getreide));
      hr_arr.sort(reverseNumsort);
      var ts = new Date();
      ts.setTime(ts.getTime() + hr_arr[0]);
      td.title=ts.toLocaleString();
    }
	}
},50);

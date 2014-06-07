// ==UserScript==
// @name           LA - Auto Heal
// @namespace      Legendarena
// @include        *legendarena.com/advancedsearch.php?*
// @include        *legendarena.com/battle.php?*
// ==/UserScript==

var xmlhttp,a,s,money,cur,max,stop,text;

function checkHealth(){
	
	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET","timeinfo.php",false);
	xmlhttp.send(null);
	
	text=xmlhttp.responseText;
	
	a=text.indexOf("Life:");
	s=text.substring(a+9,a+28);
	
	a=s.indexOf("/");
	max=parseInt(s.substring(a+1,s.length));
	cur=parseInt(s.substring(0,a));
	
	if (max!=cur){
		
		a=text.indexOf("Money:");
		s=text.substring(a+9,a+32);
		money=parseInt(s);
		if ((max-cur)>money){
			alert("not enough money to heal!!")
			stop='true';
		}
		else{
			xmlhttp=new XMLHttpRequest()
			xmlhttp.open("GET","potionshop.php?action=healmyself",false);
			xmlhttp.send(null);			
		}
	}
	
}
	stop=false;

document.addEventListener('click', function(event) {

	if (event.target.href.match("battletemp")){
	checkHealth();

	if (stop) {
	event.stopPropagation();
    event.preventDefault();
	stop=false;
	}
	}
}, true);
// ==UserScript==
// @name           LA - Events and avg. EXP
// @namespace      Legendarena
// @include        *legendarena.com*
// @exclude  	   *legendarena.com/
// ==/UserScript==

var xmlhttp,text,a,b,s,le,ge,Texp,Cexp,stam,avg;

function loadEvents(){
	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET","stats.php",false);
	xmlhttp.send(null);
	
	text=xmlhttp.responseText;
	
	a=text.indexOf("There are");
	le=parseInt(text.substring(a+9,a+12));
	
	b=text.indexOf("global events");
	s=text.substring(a,b);
	a=s.indexOf("and");
	ge=parseInt(s.substring(a+3,a+6));
	

	allLinks = document.evaluate(
		'//a[@href="stats.php"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	allLinks.snapshotItem(0).innerHTML="News/Stats["+le+"/"+ge+"]";
}

function loadExp(){
	allLinks = document.evaluate(
		'//td[@class="stats"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	s=allLinks.snapshotItem(4).innerHTML;
	a=s.indexOf("/");
	stam=parseInt(s.substring(a-5,a))
	
	s=allLinks.snapshotItem(6).innerHTML;
	a=s.indexOf("/");
	Cexp=parseInt(s.substring(a-9,a));
	Texp=parseInt(s.substring(a+1,s.length));
	
	avg=(Texp-Cexp)/stam;
	
	s=allLinks.snapshotItem(0);
	s.innerHTML=s.innerHTML+"</br>"+avg.toFixed(0)+" EXP/stam </br> to level";
	
	s.parentNode.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode.parentNode.nextSibling);
	s.parentNode.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode.parentNode.nextSibling);
	s.parentNode.parentNode.parentNode.parentNode.removeChild(s.parentNode.parentNode.parentNode.nextSibling);
	
}

	loadEvents();
	loadExp();
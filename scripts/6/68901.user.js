// ==UserScript==// @name				Loginsplitter// @version    	1.0// @description  	mehrere Einloggmöglichkeiten// @author			--virus--// @include			http://*.die-staemme.de/game.php*screen=place&mode=sim*
// ==/UserScript==

//alert(document.cookie);

//name="luke";
//document.cookie="hi="+name;

function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }

function save(){
	save="last_simu=";
	for(i=0;i<24;i+=2){
		save+=document.getElementsByTagName("input")[i].value+"/";
	}
	document.cookie=save;
}


table=findByInner(document,"Verteidiger");
result=table[0].parentNode;
row=result.getElementsByTagName("td");
if(row.length!=0){
	units=new Array();
	for(i=2;i<14;i++){
		c=i-2; 
		units[c]=row[i].firstChild.nodeValue;
	}
	a=0;
	link_js="";
	for(i=0;i<24;i+=2){
		link_js+='document.getElementsByTagName("input")['+i+'].value='+units[a]+';';
		a++;
	}
} 

var derSatz = document.cookie;
alert(derSatz);
var Suche = /last_simu=(\d+)|(\d+)/;
var Ergebnis = Suche.exec(derSatz);
alert(Ergebnis);

table=findByInner(document, "Überlebende Truppen des Verteidigers einfügen");
pos=table[0].parentNode;
link=document.createElement("a");
text=document.createTextNode("Letzte Simulation");
link.href="javascript:"+link_js;
link.appendChild(text);
pos.insertBefore(link, document.getElementsByTagName("form")[0]);

document.addEventLisener("submit",save(),true);



// ==UserScript==
// @name           Freundesliste by basti1012 fuer pennergame 4.0 
// @namespace      by basti1012 (visit pennerhack.foren-city.de.de)
// @description    Zeigt in der Freundesliste  geld promille punkte und angreifbare freunde an 
// @include        *pennergame.de/friendlist/*
// ==/UserScript==
	


GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('<a href="/profil/id:')[2];
			var userid = text1.split('/">')[0];

			var userp = content.split('src="http://www.pennergame.de/headline/')[2];
			var userpoints = userp.split('/?size=34"')[0];


      var angriffmax = Math.floor(userpoints*1.5);
      var angriffmin = Math.floor(userpoints*0.8);
      
      GM_setValue("angriffmax",angriffmax);
      GM_setValue("angriffmin",angriffmin);
      GM_setValue("userpoints",userpoints);


}});










var table = document.getElementsByTagName("table")[0];
var tr = table.getElementsByTagName("tr");

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Sms&nbsp;&nbsp;";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[5]);


var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;fight";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[6]);






var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;promille&nbsp;&nbsp;";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[7]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;geld&nbsp;&nbsp;";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[8]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;punkte";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[9]);





x=2;
vorne(x);
function vorne(x){
if(x<=20){


try{
var my_tables = document.getElementsByTagName("table")[0];
var my_td4 = my_tables.getElementsByTagName("tr")[x];
var id2 = my_td4.innerHTML.split('<a href="/profil/id:')[1].split('/')[0];
var name = my_td4.innerHTML.split('bold;">')[1].split('</a>')[0];
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
var fight ='<a href="/messages/write/?to='+id2+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a><a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';

try{
promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="' + sig + id2 + '.jpg"></div>&nbsp;&nbsp;';
}catch(e){
promillee='-';
}

my_td4.innerHTML +=fight;
var newtd12 = document.createElement('td');
newtd12.innerHTML+= promillee;
tr[x].insertBefore(newtd12, tr[x].getElementsByTagName('td')[4]);
info(id2,x);
}catch(e){
x++;
vorne(x);
}




}
}



function info(id2,x) {	

 GM_xmlhttpRequest({
 method: 'GET',
   	 url: 'http://www.pennergame.de/dev/api/user.'+id2+'.xml',
	 onload: function(responseDetails) {
         var parser = new DOMParser();
         var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

	 	var namepp = dom.getElementsByTagName('name')[0].textContent;
		var idp = dom.getElementsByTagName('id')[0].textContent;
	 	var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
		var position = dom.getElementsByTagName('position')[0].textContent;
	 	var reg_since = dom.getElementsByTagName('reg_since')[0].textContent;
	 	var points = dom.getElementsByTagName('points')[0].textContent;
	 	var city = dom.getElementsByTagName('city')[0].textContent;
		var idbande = dom.getElementsByTagName('id')[1].textContent;
		var namebande = dom.getElementsByTagName('name')[1].textContent;
try{
	 	var cash = dom.getElementsByTagName('cash')[0].textContent/100;
}catch(e){
var cash ='-';
}



var points=points;
var maxatt =    GM_getValue("angriffmax");
var minatt =  GM_getValue("angriffmin");
var userpoints = GM_getValue("userpoints");


if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
var colorr = "red"; 
}

if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
var colorr = "green"; 
}


var highlightita = 5000;
var highlightit0 = 5001;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;

if (cash <= highlightita){
	farbe = "white";
}
if (cash >= highlightit0){
	var farbe = "#F91805";
}
if (cash >= highlightit1){
	var farbe = "#EE4611";
}
if (cash >= highlightit2){
	var farbe = "#F6A008";
}
if (cash >= highlightit3){
	var farbe = "#D9EA14";
}
if (cash >= highlightit4){
	var farbe = "#0EF905";
}
if (cash >= highlightit5){
	var farbe = "#450FEF";
}








var newtd13 = document.createElement('td');
var newtd14 = document.createElement('td');
newtd14.innerHTML= '<font style=\"color:'+colorr+'; font-size:100%;\"><b>'+points+'</b></fonts>';
newtd13.innerHTML= '<font style=\"color:'+farbe+'; font-size:100%;\"><b>'+cash+'&euro;</b></font>&nbsp;&nbsp;&nbsp;&nbsp;';

tr[x].insertBefore(newtd14, tr[x].getElementsByTagName('td')[6]);

tr[x].insertBefore(newtd13, tr[x].getElementsByTagName('td')[5]);
x++;
vorne(x);
}});

}










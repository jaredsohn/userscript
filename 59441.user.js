// ==UserScript==
// @name           Memberlist bei Basti1012 fuer pennergame 4.0
// @description    Zeigt vile extra funktionen in der banden member liste an 
// @include        *pennergame.de/gang/memberlist*

// ==/UserScript==


var table = document.getElementsByTagName("table")[0];
var tr = table.getElementsByTagName("tr");

var t2 = table.getElementsByTagName("tr")[1];
var z3 = t2.getElementsByTagName("th")[4];
z3.innerHTML= 'Geld';


var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;Online";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[6]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;Sms";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[7]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;Fight";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[8]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;Promille";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[9]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;Urlaub";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[10]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;Zuletzt";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[11]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "&nbsp;&nbsp;Info";
tr[1].insertBefore(newth, tr[1].getElementsByTagName('th')[12]);





x=2;
vorne(x);
function vorne(x){
if(x<=32){
try{
var tabler = document.getElementsByTagName("table")[0];
var trr = tabler.getElementsByTagName("tr")[x];
var id2 = trr.innerHTML.split('href="/profil/id:')[1].split('/')[0];


var zuletzt = trr.getElementsByTagName("td")[4];

var zuletzt1 = zuletzt.innerHTML.split('Zuletzt gesehen am:')[1].split('span>')[0];
var zuletzt2 = zuletzt1.split('>')[1].split('<')[0];
try{
var urlaub2 = zuletzt1.split('>')[3].split('<')[0];
}catch(e){
var urlaub2 = 'Aktiv';
}



var newtd11 = document.createElement('td');
newtd11.innerHTML+= zuletzt2;
tr[x].insertBefore(newtd11, tr[x].getElementsByTagName('td')[4]);

var newtd11 = document.createElement('td');
newtd11.innerHTML+= urlaub2;
tr[x].insertBefore(newtd11, tr[x].getElementsByTagName('td')[4]);



var name = trr.innerHTML.split('>')[2].split('<')[0];
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
try{
promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="' + sig + id2 + '.jpg"></div>&nbsp;&nbsp;';
}catch(e){
promillee='-';
}
var fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
var smss ='<a href="/messages/write/?to='+id2+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';








var newtd6 = document.createElement('td');
newtd6.innerHTML+= promillee;
tr[x].insertBefore(newtd6, tr[x].getElementsByTagName('td')[4]);

var newtd7 = document.createElement('td');
newtd7.innerHTML+= fight;
tr[x].insertBefore(newtd7, tr[x].getElementsByTagName('td')[4]);

var newtd8 = document.createElement('td');
newtd8.innerHTML+= smss;
tr[x].insertBefore(newtd8, tr[x].getElementsByTagName('td')[4]);

}catch(e){
//x++;
//vorne(x);
}
hinten(x,id2);
}
}












function hinten (x,id2){



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
try{
		var cash = dom.getElementsByTagName('cash')[0].textContent;
}catch(e){
var cash = '--';
}
		var idbande = dom.getElementsByTagName('id')[1].textContent;
		var namebande = dom.getElementsByTagName('name')[1].textContent;





         GM_xmlhttpRequest({
         method: 'GET',
                url: 'http://www.pennergame.de/profil/id:'+id2+'/',
                onload: function(responseDetails) {
                var content = responseDetails.responseText;
var suche = content.search("Ist gerade Online");
		try{
		if (suche != -1) {
		var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>&nbsp;&nbsp;";
		}else {
		var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>&nbsp;&nbsp;";
		};
		}catch(e){
		var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
		}







var newtd9 = document.createElement('td');
newtd9.innerHTML+= cash;
tr[x].insertBefore(newtd9, tr[x].getElementsByTagName('td')[4]);

var newtd10 = document.createElement('td');
newtd10.innerHTML+= online2a;
tr[x].insertBefore(newtd10, tr[x].getElementsByTagName('td')[5]);




x++;
vorne(x);
}});
}});
}
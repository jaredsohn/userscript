// ==UserScript==
// @name           Post ausgangsdurchsucher und eingangsdurchsucher pennergame 4.0
// Version         1.1
// @namespace      by basti1012 (visit http://pennerhack.forren-city.de)
// @description    durchsucht deine ganze post nach namen und sticwoerter und die gefundene postnachrichten werden dann angezeit
// @include        http://*pennergame.de/messages/*
// ==/UserScript==
// Dieses Script ist Copyright by basti1012 wem es nicht gefallen tut der muss es ja nicht benutzen






var url = document.location.href;
//if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
}
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
}











//if(f == null){
GM_setValue("f",0)
//}












//GM_deleteValue("l");
//GM_deleteValue("x");
content = document.getElementsByClassName('listshop')[0];
	content.style.width="1250px";

  var mytable = document.createElement('table');
  mytable.innerHTML = "<span style='font-size:medium'><b>Post eingang und ausgangssuche</b><br><div id='sucher'</div></span>";
  mytable.bgColor = "black";
  content.appendChild(mytable);

  var mytr0 = document.createElement('tr');
  mytr0.innerHTML = '<span style="font-size:small"><input type="text" id="textin" value"such begriff eingeben" site="37" ><input type="button"  name="postsuchen"  value="Suchen">';
  mytable.appendChild(mytr0);











document.getElementsByName("postsuchen")[0].addEventListener('click', function postsuchesr() {
var Post = document.getElementById('textin').value;
GM_setValue("Post", Post);
var table = document.getElementsByClassName("pagenum");
ff = table.length*20;
GM_setValue("ff", ff);

for(var i=0;i<table.length;i++) {
a=Number(i)+Number(1);
GM_setValue("a", a);
suchen(Post)
}



},false); 










function suchen (Post){

for(y=1;y<=a;y++){
		GM_xmlhttpRequest({
		method:"GET",
  		url: ''+link+'/messages/'+y+'/',
         		onload:function(responseDetails) {
			contenta = responseDetails.responseText;

           		nachricht = contenta.split('<h1>Posteingang</h1>')[1];
            		nachricht1 = nachricht.split('class="pagenum')[0];
for(x=1;x<=21;x++){
try{
           		msglist = nachricht1.split('class="msglist')[x];
            		msglist1 = msglist.split('</tr>')[0];

           		id = msglist1.split('/messages/read/')[1];
            		id1 = id.split('/')[0];

ausgabe(id1,Post)
}catch(e){}
}

}});
}
}






function ausgabe(id1,Post){



		GM_xmlhttpRequest({
		method:"GET",
  		url: ''+link+'/messages/read/'+id1+'/',
         		onload:function(responseDetails) {
			contenta = responseDetails.responseText;

           		such = contenta.split('Nachricht lesen')[1];
            		such1 = such.split('Impressum')[0];

f=GM_getValue("f");
f++;
aa = GM_getValue("ff")-GM_getValue("f")
GM_setValue("f",f);

document.getElementById('sucher').innerHTML = 'Noch zu durchsuchen '+aa+'';

			  var suche = such1.search(GM_getValue("Post"));
			  if (suche != -1) {




name = contenta.split('href="/profil/id:')[2].split('</a>')[0];
betreff = contenta.split('&nbsp;<strong>')[2].split('</strong>')[0];

betreff1 ='&nbsp;<a href="/messages/read/'+id1+'/"><span style="color:red;float:left; font-size:small">'+betreff+'</span> </a>';
name1 = '&nbsp;<a href="/profil/id:'+name+'</a>&nbsp;';






var mytr3 = document.createElement('tr');
mytr3.innerHTML = ""+name1+"&nbsp; "+betreff1+"<br>";
mytable.appendChild(mytr3);


}
}});




}







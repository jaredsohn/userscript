// ==UserScript==
// @name           HighscoresScript _ID_und_3Uhr_Gewinn_rechner__pennergame_4.0_Hamburg_u_Berlin
// @namespace      zeigt in highscore geld promille onlinstatus reg an. Ganz neu auf Den Scripte markt der Id rechner und 3 uhr rechner mit eingebaut. Hamburg Berlin Pennergame 4.0 
// @author         basti1012 pennerhack.foren-city.de
// @include        *pennergame.de/highscore/user/*
// @include        *pennergame.de/highscore/joindate/*
// @exclude        http://pennergame.de/highscore/gang/*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var apiurl = 'http://berlin.pennergame.de/dev/api/';
  var mediaurl = 'http://mediaberlin.pennergame.de/img/';
  var link = 'http://berlin.pennergame.de/';
  var siglink = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}

else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var apiurl = 'http://www.pennergame.de/dev/api/';
  var mediaurl = 'http://media.pennergame.de/img/';
  var link = 'http://www.pennergame.de/';
  var siglinkl = 'http://inodes.pennergame.de/de_DE/signaturen/';
};


try {
	var body_split = document.body.innerHTML.split('href="/profil/id:');
	var body_split_2 = body_split[1].split('/');
	var id = body_split_2[0];
	punkte =document.getElementsByClassName('el2')[2].innerHTML;
	    var angriffmax = Math.floor(punkte*1.5);
      var angriffmin = Math.floor(punkte*0.8);
      
      GM_setValue("angriffmax",angriffmax);
      GM_setValue("angriffmin",angriffmin);
      GM_setValue("punkte",punkte);

idende = Math.round(id/100)*100;
//alert(idende)
GM_setValue("idende",idende);
} catch (err){}




suchtable =document.getElementsByTagName('table')[0].innerHTML;
GM_setValue("suchtable",suchtable);







var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[5]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Ergebniss";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[6]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "3 Uhr";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[7]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Reg-Datum";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[8]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Online sms angriff Promille";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[9]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Geld";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[10]);



hauptfeld = GM_getValue("suchtable")
for(a=1;a<=20;a++){
id = hauptfeld.split('profil/id:')[a];
id1 = id.split('/')[0];

punkte = hauptfeld.split('class="col5">')[a];
punkte1 = punkte.split('</td>')[0];

mitte(id1,a,punkte1)

}



















function mitte(id1,a,punkte1){

id3 = GM_getValue("idende");
























var tr1 = document.getElementsByTagName('table')[0];
var tr2 = tr1.getElementsByTagName('tr')[a];
var tr3 = tr2.getElementsByTagName('td')[5].innerHTML = '';
















				GM_xmlhttpRequest({
					method: 'GET',
					url: ''+link+'/dev/api/user.'+id1+'.xml',
					onload: function(responseDetails) {
						var parser = new DOMParser();
						var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
						var name = dom.getElementsByTagName('name')[0].textContent;
						var id = dom.getElementsByTagName('id')[0].textContent;
						var platz = dom.getElementsByTagName('position')[0].textContent;
						var punkte = dom.getElementsByTagName('points')[0].textContent;
						var reg = dom.getElementsByTagName('reg_since')[0].textContent;



if(id < id3){
fab = 'red';

id4 = id3/100;
ida =Math.round((id/id4)*100)/100;
ergo = ida;


}

if(id > id3){
fab = 'green';
id4 = id3/100;
ida =Math.round((id/id4)*100)/100;
ergo = ida;

}


dreiuhr = punkte1-punkte;


if(dreiuhr == 0){

fab1 = 'yellow';

}else if(dreiuhr < 0){


fab1 = 'red';



}else if(dreiuhr > 0){

fab1 = 'green';


}

						try{
							var cash = dom.getElementsByTagName('cash')[0].textContent/100;
						}catch(e){
							cash='';
						}

	
						var fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
						var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
						if (cash <= 1000000){
							farbe1 = "black";}
						if (cash <= 900000){
							var farbe1 = "gray";}
						if (cash <= 800000){
							farbe1 = "blue";}
						if (cash <= 700000){
							var farbe1 = "cyan";}
						if (cash <= 600000){
							farbe1 = "red";}
						if (cash <= 500000){
							var farbe1 = "green";}
						if (cash <= 400000){
							farbe1 = "magenta";}
						if (cash <= 300000){
							farbe1 = "orange";}
						if (cash <= 200000){
							var farbe1 = "yellow";}
						if (cash <= 100000){
							var farbe1 = "";}

						rest(dreiuhr,ergo,fab,fab1,a, link, id, name, farbe1, cash, punkte, reg);
					}
				});
			}


function rest(dreiuhr,ergo,fab,fab1,a,link,id,name,farbe1,cash,punkte,reg){


       GM_xmlhttpRequest({
              method: 'GET',
              url: ''+link+'/profil/id:' + id + '/',
              onload: function(responseDetails) {
                    var content = responseDetails.responseText;
                    try{
                          plunder = content.split('class="user_db.item.quality item">&nbsp;<strong>')[1];
                          plunder1 = plunder.split('</strong>')[0];
                    }catch(e){
                          plunder1 = '-';
                    }
                    var suche = content.search("Ist gerade Online");
                    try{
                          if (suche != -1) {
                                var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>";
                          }else {
                                var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>";
                          }
                    }catch(e){
                    }
                    var suche = content.search("scht oder vom Spiel verbannt");
                    try{
                          if (suche != -1) {
                                ganzereihe ='red';
                          }else{
                                ganzereihe = '';
                          }
                    }catch(e){
                    }
                     try{
                          var location1 = content.split('Stadtteil</strong></td>')[1];
                          var location2 = location1.split('td>')[0];
                          var location22 = location2.split('>')[1];
                          var location3 = location22.split('<')[0];
                     }catch(e){
                          var location3 = '<font style=\"color:red; font-size:100%;\"><b>premium</b></font>';
                      }

      promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>';
      fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
      sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
		
var online = document.createElement('td');
online.innerHTML = online2a+sms+fight+promille;
tr[a].insertBefore(online, tr[a].getElementsByTagName('td')[12]);

var sms = document.createElement('td');
sms.innerHTML = '<font style=\"color:'+fab+'; font-size:100%;\"><b>'+ergo+'%</b></font>';
tr[a].insertBefore(sms, tr[a].getElementsByTagName('td')[6]);

var angriff = document.createElement('td');
angriff.innerHTML = '<font style=\"color:'+fab1+'; font-size:100%;\"><b>'+dreiuhr+' </b></font>';
tr[a].insertBefore(angriff, tr[a].getElementsByTagName('td')[7]);

var casha = document.createElement('td');
casha.innerHTML = reg;
tr[a].insertBefore(casha, tr[a].getElementsByTagName('td')[8]);

var dreiuhre = document.createElement('td');
dreiuhre.innerHTML = '<font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+'</font>';
tr[a].insertBefore(dreiuhre, tr[a].getElementsByTagName('td')[10]);

































	
              }
      });
}












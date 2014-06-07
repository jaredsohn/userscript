// ==UserScript==
// @name               Angrifswarner im NG Style PG 4.0 Hamburg Berlin 
// @namespace    by basti1012/pennerhack moded by niceguy0815 (visit: http://pennerhack.foren-city.de)
// @description    Angriffwarner mit online und geld weg warner pennergame 4,0 mit Auto Update Funktion. Jetzt auch für Muenchen
// @version           1.4
// @include            http://*.pennergame.de*
// @exclude           http://newboard.pennergame.de
// @exclude           http://change.pennergame.de/*
// @exclude           http://*.pennergame.de/logout/*
// @exclude           http://*.pennergame.de/redirect/?site=*
// ==/UserScript==

// Update Funktion
GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://userscripts.org/scripts/show/64908",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var angriffsw = acontent.split(/b>\s*/)[4];			
			var angriffsw1 = angriffsw.split(/\s*<br/)[0];	
if(angriffsw1 ==1.4){
}else{
alert("Es giebt eine neue Version vom Angrifswarners im NG Style,\nVersion "+angriffsw1+" \nBitte mache ein Update, ansonsten kommt dieser Hinweiss immer wieder. Nachdem du Ok geklickt hast kommt ein Update Fenster wo du entscheiden kannst ob du das neue Script installieren willst . Mit dem klick auf  INSALLIEREN wird die Vorg�ngerversion gel�scht und die neue insalliert.\n\nMfg Niceguy0815");
window.location.href = 'http://userscripts.org/scripts/source/64908.user.js';
}
}});


var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
var fightUrl = 'http://berlin.pennergame.de/fight/overview/';

}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var fightUrl = 'http://www.pennergame.de/fight/overview/';

}
if (url.indexOf("http://muenchen.pennergame")>=0) {
var link = "http://muenchen.pennergame.de"
var fightUrl = 'http://muenchen.pennergame.de/fight/overview/';

}
if (url.indexOf("http://www.muenchen.pennergame")>=0) {
var link = "http://www.muenchen.pennergame.de"
var fightUrl = 'http://www.muenchen.pennergame.de/fight/overview/';

}
			
GM_xmlhttpRequest({
	method: 'GET',
	url: fightUrl,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/bereits auf/)){
			try{
				var idausgang = content.split('bereits auf')[1].split("Angriff abbrechen")[0];
				var idaus = idausgang.split('<a href="/profil/id:')[1].split("/")[0];
				var TimeOfImpact2 = content.split(".2010")[1].split("<br />")[0];
   
					GM_xmlhttpRequest({
  						method: 'GET',
   						url: ''+link+'/dev/api/user.'+idaus+'.xml',
   							 onload: function(responseDetails,id2) {
      								var parser = new DOMParser();
      								var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      								var name = dom.getElementsByTagName('name')[0].textContent;
      								var id2 = dom.getElementsByTagName('id')[0].textContent;
      									try {
      										var name1 = dom.getElementsByTagName('name')[1].textContent;
      										var id21 = dom.getElementsByTagName('id')[1].textContent;
      									}catch (e) {
      										var name1 =  '-';
      										var id21 = '-';
      									}
      									try {
      										var cash = dom.getElementsByTagName('cash')[0].textContent;
      									}catch (e) {
      										var cash = '0';
      									}

     				if (cash >= 1000) {
      			 	var color = "yellow";}
     				if (cash >= 15000){
      				var color = "orange";}
      				if (cash >= 20000){
      				var color = "#006400";}
      				if (cash >= 25000){
        			var color = "red";}
        			if (cash >= 30000){
        			var color = "blue";}
        			if (cash >= 40000){
        			var color = "black";}

					var penner = 'Penner:<font style=\"color:#006400;\"> </font> <a href="/profil/id:'+id2+'/"><font style=\"color:#006400;\"><b>'+name+'</b></font></a>'
					var bande = 'Bande: <font style=\"color:#006400;\"></font><a href="/profil/bande:'+id21+'/"><font style=\"color:#006400;\"><b>'+name1+'</b></font></a>'
					
					var sms ='<a title="Nachricht schreiben" href="'+link+'/messages/write/?to='+id2+'"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" style=\"margin-bottom:2px;\"</a>';
					
					   GM_xmlhttpRequest({             
method: 'GET',
url: ''+link+'/profil/id:'+id2+'/',
onload: function(responseDetails){
var content = responseDetails.responseText;
var suche = content.search("Ist gerade Online");
try{
if (suche != -1) {
var onlinex = '<img src="http://static.pennergame.de/img/pv4/icons/on.png" width="13" height="13" title="Online">';
var on = '1';
}
else {
var on = '2';
var onlinex = '<img src="http://i48.tinypic.com/n33d4w.png" width="13" height="13" title="Offline">';
};
}catch(e){
var on = '3';
var onlinex = '<font style=\"color:black; font-size:100%;\" title="Penner wurde gelöscht."><b>X</b></font>';
}
try {
		var geschlecht2 = content.split('http://static.pennergame.de/img/pv4/')[3];
		var geschlecht  = geschlecht2.split('"')[0];
		if(geschlecht == 'icons/female.jpg'){var geschpic = "http://i45.tinypic.com/2ztiu5c.png";}
      else if(geschlecht == 'icons/male.jpg'){var geschpic = "http://i47.tinypic.com/2zz3n86.png";}
	   else if(geschlecht == 'plunder/nikolaus.png'){var geschpic = "http://static.pennergame.de/img/pv4/plunder/nikolaus.png";}
	   else if(geschlecht == 'plunder/valday.png'){var geschpic = "http://static.pennergame.de/img/pv4/plunder/valday.png";}
	   else if(geschlecht == 'premiummedia/img/js/swfobject.js'){var geschpic = "http://i48.tinypic.com/16m4w2p.png";}
	     else if(geschlecht == 'icons/new_msg.gif'){var geschpic = "http://i45.tinypic.com/2j64gwm.gif";}
		 if(geschpic == 'http://i45.tinypic.com/2j64gwm.gif'){var geschpictooltip = "Du hast eine neue Nachricht deshalb wurde das Geschlechtszeichen ausgeblendet! Es erscheint wieder wenn du die Nachricht gelesaen hast.";}
		 else if(geschpic == 'http://i48.tinypic.com/16m4w2p.png'){var geschpictooltip = "Premium Profil";}
		 else if(geschpic == 'http://static.pennergame.de/img/pv4/plunder/nikolaus.png'){var geschpictooltip = "Rote Schleife";}
		 else if(geschpic == 'http://static.pennergame.de/img/pv4/plunder/valday.png'){var geschpictooltip = "Be my Valentine!";}
		 else if(geschpic == 'http://i45.tinypic.com/2ztiu5c.png'){var geschpictooltip = "Frau";}
		 else if(geschpic == 'http://i47.tinypic.com/2zz3n86.png'){var geschpictooltip = "Mann";}
var geschlecht_imagex = '<div style="display:inline-block;"><img src="'+geschpic+'" height="17" width="17" title="'+geschpictooltip+'"></img></div>';

	} catch(err) {
var geschlecht_imagex = '<font style=\"color:green; font-size:17px;\"><b>P</b></font>';
var geschpic = "http://i48.tinypic.com/16m4w2p.png";
}   



// Gesch. Piclinks:
// Post icons/new_msg.gif
//  Nicolaus Plunder http://static.pennergame.de/img/pv4/plunder/nikolaus.png
// female http://i48.tinypic.com/2lk90lc.png  - http://i45.tinypic.com/2ztiu5c.png
// male http://i45.tinypic.com/17zojs.png   -  http://i47.tinypic.com/2zz3n86.png

					var cash6 = cash/100;
					var tbody = document.getElementsByClassName('zabsolute zleft')[0];
					tbody.innerHTML += '<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-12px; margin-left:-14px;" class="icon ok zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext"><font style=\"color:#000000; font-size:106%;\"><u><b>Dein laufender Kampf:</b></u></font><p><div style=\"color:#000000; font-size:12px; margin-right:-55px;\">'+penner+' <div style=\"margin-left:187px; margin-top:-22px; margin-bottom:2px;\">'+onlinex+'&nbsp;'+sms+'&nbsp;'+geschlecht_imagex+'</div></div><div style=\"color:#000000; font-size:12px; margin-right:-55px;\">'+bande+'</div><div style=\"color:#000000; font-size:12px; margin-right:-35px;\">Geld:<font style=\"color:#006400; font-size:12px;\"> <b>'+cash6+'&euro; </b><font style=\"color:#000000; font-size:12px;\"> &nbsp; Ende:</font><b><font style=\"color:#006400; font-size:12px;\">'+TimeOfImpact2+'</b></font></font>Uhr</div></font></div></div>';
					

				}});
				}});

			}catch(e){}			
		}
	}
});

var ausweich = 'Ausweichen';

GM_xmlhttpRequest({
	method: 'GET',
	url: fightUrl,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/warning/)){
            var part = content.split("warning")[1].split("<td>")[1];
            var TimeOfImpact = part.split("</td>")[0];				
try{
   var incoming1 = content.split(''+ausweich+'</strong></td>')[1];
}catch(e){
}				
  var allincoming = incoming1.split('</table>')[0];
  var anzahl = allincoming.split('<tr').length-1;	
  var id1 = allincoming.split('<a href="/profil/id:')[1]							
  var id2 = id1.split('/')[0];

gegnersuuchen(id2,anzahl,TimeOfImpact);

   }
}});



function gegnersuuchen(id2,anzahl,TimeOfImpact){

GM_xmlhttpRequest({
  method: 'GET',
   url: ''+link+'/dev/api/user.' + id2 + '.xml',
    onload: function(responseDetails,id2) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      var name = dom.getElementsByTagName('name')[0].textContent;
      var id2 = dom.getElementsByTagName('id')[0].textContent;
      try {
      var name1 = dom.getElementsByTagName('name')[1].textContent;
      var id21 = dom.getElementsByTagName('id')[1].textContent;
      }catch (e) {
      var name1 =  '-';
      var id21 = '-';
      }

      try {
      var cash = dom.getElementsByTagName('cash')[0].textContent;
      }catch (e) {
      var cash = '0';
      }

      if (cash >= 1000) {
        var color = "yellow";
      }
     
      if (cash >= 15000){
        var color = "orange";

      }
      if (cash >= 20000){
        var color = "#006400";

      }
      if (cash >= 25000){
        var color = "red";

      }
      if (cash >= 30000){
        var color = "blue";

      }
      if (cash >= 40000){
        var color = "black";
      }



geld(cash);
GM_setValue('cash',cash);


function geld(cash){
var cash1 = GM_getValue('cash');
if(cash == Number(cash1)){
}else{
var cash3 = cash/100;
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML += '<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-10px; margin-left:-10px;" class="icon ok zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext"><font style=\"color:#000000; font-size:12px;\"><u><b>Achtung:</b></u></font><p>Dein Ziel hat soeben Geld ausgegeben oder dazuverdient bitte checke ob der angriff sich noch lohnt. Aktuelles Geld des Gegners<font style=\"color:'+color+'; font-size:11px;\"><b> '+cash3+'</b></font>.</div></div>';
}
}

var sms2 ='<a title="Nachricht schreiben" href="'+link+'/messages/write/?to='+id2+'"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" width="15" height="11"</a>';

GM_xmlhttpRequest({             
method: 'GET',
url: ''+link+'/profil/id:'+id2+'/',
onload: function(responseDetails){
var content = responseDetails.responseText;
var suche = content.search("Ist gerade Online");

try{
if (suche != -1) {
var online = '<img src="http://static.pennergame.de/img/pv4/icons/on.png" width="11" height="11" title="Online">';
var on = '1';
}
else {
var on = '2';
var online = '<img src="http://i48.tinypic.com/n33d4w.png" width="11" height="11" title="Offline">';
};
}catch(e){
var on = '3';
var online = '<font style=\"color:black; font-size:100%;\" title="Penner wurde gelöscht."><b>X</b></font>';
}
try {
		var geschlecht3 = content.split('http://static.pennergame.de/img/pv4/')[3];
		var geschlechty  = geschlecht3.split('"')[0];
		if(geschlechty == 'icons/female.jpg'){var geschpic2 = "http://i45.tinypic.com/2ztiu5c.png";}
      else if(geschlechty == 'icons/male.jpg'){var geschpic2 = "http://i47.tinypic.com/2zz3n86.png";}
	    else if(geschlechty == 'plunder/nikolaus.png'){var geschpic2 = "http://static.pennergame.de/img/pv4/plunder/nikolaus.png";}
		 else if(geschlechty == 'plunder/valday.png'){var geschpic = "http://static.pennergame.de/img/pv4/plunder/valday.png";}
		else if(geschlechty == 'premiummedia/img/js/swfobject.js'){var geschpic2 = "http://i48.tinypic.com/16m4w2p.png";}
		else if(geschlechty == 'icons/new_msg.gif'){var geschpic2 = "http://i45.tinypic.com/2j64gwm.gif";}
		 if(geschpic2 == 'http://i45.tinypic.com/2j64gwm.gif'){var geschpictooltip2 = "Du hast eine neue Nachricht deshalb wurde das Geschlechtszeichen ausgeblendet! Es erscheint wieder wenn du die Nachricht gelesaen hast.";}
		 else if(geschpic2 == 'http://i48.tinypic.com/16m4w2p.png'){var geschpictooltip2 = "Premium Profil";}
		 else if(geschpic2 == 'http://static.pennergame.de/img/pv4/plunder/nikolaus.png'){var geschpictooltip2 = "Rote Schleife";}
		 else if(geschpic2 == 'http://static.pennergame.de/img/pv4/plunder/valday.png'){var geschpictooltip = "Be my Valentine!";}
		 else if(geschpic2 == 'http://i45.tinypic.com/2ztiu5c.png'){var geschpictooltip2 = "Frau";}
		 else if(geschpic2 == 'http://i47.tinypic.com/2zz3n86.png'){var geschpictooltip2 = "Mann";}
var geschlecht_imagex2 = '<div style="display:inline-block;"><img src="'+geschpic2+'" height="17" width="17" title="'+geschpictooltip2+'"></img></div>';
	} catch(err) {
var geschlecht_imagex2 = '<font style=\"color:green; font-size:17px;\"><b>P</b></font>';
var geschpic2 = "http://i48.tinypic.com/16m4w2p.png";

}   
//  http://static.pennergame.de/img/pv4/plunder/nikolaus.png
// Gesch. Piclinks:
// female http://i48.tinypic.com/2lk90lc.png  - http://i45.tinypic.com/2ztiu5c.png
// male http://i45.tinypic.com/17zojs.png   -  http://i47.tinypic.com/2zz3n86.png



GM_setValue('on',on);
gegneron(on);

var cash3 = cash/100;
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML +='<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-10px; margin-left:-10px;" class="icon fight zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext">'
+'<font style=\"color:#000000; font-size:106%;\"><u><b>Eingehende K&auml;mpfe  '+anzahl+'</b></u></font><p>'
+'<div style=\"color:#000000; font-size:12px; margin-right:-55px;\">Name: <a href="/profil/id:'+id2+'/"><font style=\"color:#006400; font-size:12px;\"><b>'+name+'</b></font></a><div style=\"margin-left:187px; margin-top:-22px; margin-bottom:2px;\">'+online+'&nbsp;'+sms2+'&nbsp;'+geschlecht_imagex2+'</div></div>'
+'<div style=\"color:#000000; font-size:12px; margin-right:-55px;\">Bande: <a href="/profil/bande:'+id21+'/"><font style=\"color:#006400; font-size:12px;\"><b>'+name1+'</b></font></a></div>'
+'<div style=\"color:#000000; font-size:12px; margin-right:-25px;\">Geld: <font style=\"color:#006400; font-size:12px;\"><b>'+cash3+'&euro; </b></font>'
+'<b></b> &nbsp;&nbsp;Ende: <font style=\"color:#006400; font-size:12px;\"> <b>'+TimeOfImpact+'</b></font> Uhr</div></div></div>';



function gegneron(on){
var online1 = GM_getValue('on');
if(on == Number(online1)){
}else
if(on == 1){
var wasistlos = 'Deiner gegner ist onliene';
}else 
if(on == 2){
var wasistlos = 'Deiner gegner ist offline';
}else
if(on == 3){
var wasistlos = 'Deiner gegner wurde von Pennergame geloescht. Bitte breche den Kampf ab!';
}
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML += '<div style="height: 83px; top: 105px; left: -1px; padding-top:3px;  background: url(http://i45.tinypic.com/3136tg4.png);" id="notifyme" class="zabsolute zleft"><div style="margin-top:-12px; margin-right:-10px; margin-left:-10px;" class="icon ok zleft" id="nicon">&nbsp;</div><div style="margin-top:6px;" class="zleft right" id="ntext"><font style=\"color:#000000; font-size:12px;\"><u><b>Achtung</b></u></font><p>Dein Ziel hat sich gerade ein oder ausgelogt aktueller Status deines Gegners  '+wasistlos+'.</div></div>';
}
}});
}});
}
// copyright by basti1012 
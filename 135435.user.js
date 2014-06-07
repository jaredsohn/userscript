// ==UserScript==
// @name           Codes smileys v0.1
// @namespace      Codessmileys 0.1
// @description    Utilisez des smileys sur la PB avec des codes
// @include	       http://www.french-brony.com/
// @include        http://www.french-brony.com/chatbox/index.forum*


// ==/UserScript==

var zonemessage= document.getElementById('message');
var message = zonemessage.value;
var boutonsubmit = document.getElementById('submit_button');
// alert (zonemessage.value);


boutonsubmit.addEventListener('mouseover', function() { 
smiley();
},
 false) 

 zonemessage.addEventListener('keydown', function() {  
if (event.keyCode==191 || event.keyCode==32)
{
smiley();  

}
},
 false) 

 
 var smiley = function() {
	zonemessage= document.getElementById('message');
message = zonemessage.value;

 var reg=new RegExp(":kodokpop:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1338938709-ockodokpop2.png[/img]");

 var reg=new RegExp(":applepop:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1338938336-applepop.png[/img]");

 var reg=new RegExp(":drizzle:", "g");
message=message.replace(reg,"[img]http://img11.hostingpics.net/pics/987877513px1298486927579.png[/img]");

 var reg=new RegExp(":shary:", "g");
message=message.replace(reg,"[img]http://img208.imageshack.us/img208/8610/capturecopier14.png[/img]");

 var reg=new RegExp(":wonderfultavi:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1338938168-octaviawunderful.png[/img]");

 var reg=new RegExp(":octaclap:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1338922072-octaviaclapplz.gif[/img]");

 var reg=new RegExp(":isaycat:", "g");
message=message.replace(reg,"[img]http://img15.hostingpics.net/pics/728773Isaycat.png[/img]");

 var reg=new RegExp(":cadence:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1339002324-cadence.png[/img]");

 var reg=new RegExp(":cadence2:", "g");
message=message.replace(reg,"[img]http://i.imgur.com/RwIBO.png[/img]");

 var reg=new RegExp(":sunshine:", "g");
message=message.replace(reg,"[img]http://i.imgur.com/FGhyo.gif[/img]");

 var reg=new RegExp(":cadence3:", "g");
message=message.replace(reg,"[img]http://i.imgur.com/hNJ9O.png[/img]");

 var reg=new RegExp(":haprot:", "g");
message=message.replace(reg,"[img]http://i.imgur.com/mMj8p.gif[/img]");

 var reg=new RegExp(":kodok:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1339018532-ockodok.png[/img]");

 var reg=new RegExp(":w:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1339021493-W.png[/img]");

var reg=new RegExp(":partyhard:", "g");
message=message.replace(reg,"[img]http://img11.hostingpics.net/pics/531826partyamo.png[/img]");
 
 var reg=new RegExp(":srsly:", "g");
message=message.replace(reg,"[img]http://img11.hostingpics.net/pics/770222srsly.png[/img]");
 
 var reg=new RegExp(":tree:", "g");
message=message.replace(reg,"[img]http://img15.hostingpics.net/pics/220538theresatree.png[/img]");
 
 var reg=new RegExp(":celestia:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1339026245-celestiakawai.png[/img]");

 var reg=new RegExp(":futashy:", "g");
message=message.replace(reg,"[img]http://img15.hostingpics.net/pics/863641Futashy.png[/img]");
 var reg=new RegExp(":w2:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1339026423-W2.png[/img]");
 var reg=new RegExp(":melon:", "g");
message=message.replace(reg,"[img]http://image.noelshack.com/fichiers/2012/23/1339020532-trriplikemelon.png[/img]");

 var reg=new RegExp(":partydog:", "g");
message=message.replace(reg,"[img]http://img11.hostingpics.net/pics/697399partydog.png[/img]");
 var reg=new RegExp(":partydog2:", "g");
message=message.replace(reg,"[img]http://img11.hostingpics.net/pics/916591partydog2.png[/img]");
 var reg=new RegExp(":ohyoudog:", "g");
message=message.replace(reg,"[img]http://img15.hostingpics.net/pics/926836ohyoudog.png[/img]");
 var reg=new RegExp(":rire:", "g");
message=message.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/39.gif[/img]");
 var reg=new RegExp(":oui:", "g");
message=message.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/37.gif[/img]");

// -----------------------


/*  



 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");
 var reg=new RegExp("::", "g");
message=message.replace(reg,"[img][/img]");

*/

// ajoutez les smileys ici en vous basant sur le modèle qui suit, mettez un code de la forme :smiley:, sinon ça ne marchera pas, le : servant à faire la vérification du texte. 
/* modèle :

var reg=new RegExp("code","g");
message=message.replace(reg,"[img]http://URLimage[/img]");

*/



// fin des smileys à ajouter

document.getElementById('message').value = message;
	
};
 


/* NOTES :
- Prochaine version : 
	- adaptabilité aux MP et aux forums, si j'ai pas la flemme (convertira automatiquement les codes en images dans la zone de saisie de texte, donc même ceux qui n'ont pas le script le verront).
	- Plus de smileys ofc.
	- S'arranger pour que la vérification ne requiert pas d'espace ou de taper un autre caractère parce que c'est chiant 
	- Ajout d'une liste officielle de smileys, sans doute à côté du truc pour les smileys. (ben oui c'est une version 0.1, y'a pas encore ça)
	
	
	*/
// ==UserScript==
// @name           post ausgangsdurchsucher und eingangsdurchsucher pennergam berlin 
// Version         Erste funktionstuechtige beta version by basti1012
// @namespace      by basti1012 (visit http://pennerhack.forren-city.de)
// @description    durchsucht deine anze post nach namen und sticw�rter und die gefundn postnachrichten erden dann angezeit
// @include        http://*berlin.pennergame.de/messages/*
// @exclude        http://*www.pennergame.de*
// ==/UserScript==
// Dieses Script ist Copyright by basti1012 wem es nicht gefallen tut der muss es ja nicht benutzen


var post = GM_getValue("post");
if (post == null){
post = 'betreff';
GM_setValue("post" , post);
};

if (document.location.href.indexOf('berlin.pennergame.de/messages/out/')>=0) {
  var pgurl = 'http://berlin.pennergame.de/';
  var smsurl = 'http://berlin.pennergame.de/messages/out/';
  var suchurl = '/messages/out/';
}
else {
  var smsurl = 'http://berlin.pennergame.de/messages/';
  var suchurl = '/messages/';
  var pgurl = 'http://berlin.pennergame.de/';
}





GM_deleteValue("l");
GM_deleteValue("x");
var content = document.getElementById('content');

var url = document.location.href;
  var mytable = document.createElement('table');
  mytable.innerHTML = "<span style='font-size:medium'><b>Post eingang und ausgangssuche</b></span>";
  mytable.bgColor = "black";
  content.appendChild(mytable);

  var mytr0 = document.createElement('tr');
  mytr0.innerHTML = '<span style="font-size:small"><input type="text" id="textin" value"such begriff eingeben" site="7" ><input type="button"  name="postsuchen"  value="Suchen">';
  mytable.appendChild(mytr0);

document.getElementsByName("postsuchen")[0].addEventListener('click', function postsuchesr() {
var Post = document.getElementById('textin').value;
GM_setValue("Post", Post);

f=0;

var x = GM_getValue("x");
if (x == null){
	x = '1';
	GM_setValue("x", x);
};

var x = GM_getValue("x");
if (x == 0){
	x = '1';
	GM_setValue("x", x);
};


var l = GM_getValue("l");
if (l == 0){
	l = '0';
	GM_setValue("l", l);
};

var l = GM_getValue("l");
if (l == null){
	l = '0';
	GM_setValue("l", l);
};



function smsfelder(f,x){

	x = GM_getValue("x");
	if(f<=21){
		GM_xmlhttpRequest({
		   method:"GET",
  		 url: ''+smsurl+''+x+'/',
         		onload:function(responseDetails) {

          		  content = responseDetails.responseText;

var k = x-1;
try{
      PAGNITON = content.split('<a class="pagenum')[k+1];
      PAGNITON1 = PAGNITON.split('</tbody></table>')[0];
      siete = PAGNITON1.split('href="'+suchurl+'')[1];
      siete1 = siete.split('/">')[0];

          feld0 = content.split('<div class="listshop">')[1];
          feld1 = feld0.split('</table>')[0];

           	var sms0 = content.split('<tr class="msglist')[f+1];//SCHLIFE
           	var sms1 = sms0.split('</tr>')[0];

           		sucherlink = sms1.split('<a href="')[1];//SCHLIFE
            		sucherlink1 = sucherlink.split('/"><strong>')[0];

		GM_xmlhttpRequest({
		method:"GET",
  		url: 'http://berlin.pennergame.de'+sucherlink1+'/',
         		onload:function(responseDetails) {
			contenta = responseDetails.responseText;

           		nachrichtennhalt = contenta.split('<div class="listshop">')[1];
            		nachrichtennhalt1 = nachrichtennhalt.split('</table>')[0];

			  var suche = nachrichtennhalt1.search(""+GM_getValue("Post")+"");
			  if (suche != -1) {

				l++;
				GM_setValue("l", l);
          				  betreff = sms1.split('<strong>')[1];//SCHLIFE
          				  betreff1 = betreff.split('</strong>')[0];

          				  profil = sms1.split('<a href="/profil/id:')[1];//SCHLIFE
           				  profil1 = profil.split('</a>')[0];

           				  link = sms1.split('<a href="')[1];//SCHLIFE
            				  link1 = link.split('<strong>')[0];

					  var i = x-1;

					  var mytr3 = document.createElement('tr');
					  mytr3.innerHTML = "<span style='color:red;float:right; font-size:small'>BETREFF:</span> ";
					  mytable.appendChild(mytr3);

  					  var mytr2 = document.createElement('tr');
 					  mytr2.innerHTML = "<span style='color:red;float:right; font-size:small'>AN:</span>";
  					  mytable.appendChild(mytr2);

  					  var mytd2 = document.createElement('td');
  					  mytd2.innerHTML += '<span style="float:left; font-size:small"><a href="/profil/id:'+profil1+'</span>';
  					  mytr2.appendChild(mytd2);

					  var mytd3 = document.createElement('td');
					  mytr3.appendChild(mytd3);
					  mytd3.innerHTML += '<span style="float:left; font-size:small"><a href="'+pgurl+''+link1+''+betreff1+'</a></span><font style=\"color:green; font-size:100%;\"><b>['+i+''+f+']</b></font>';

						}

						if(f<=18){
						f++;
						smsfelder(f);
						}else{
						x++;
						GM_setValue("x", x)
						f=0;
						l = GM_getValue("l");

  						 var mytr1 = document.createElement('tr');
 						 mytr1.innerHTML = "<span style='float:right;color;yellow; font-size:small'>Gefunden  Insgesamt<font style=\"color:green; font-size:100%;\"><b>["+l+"]</b></font>   </span>";
  						 mytable.appendChild(mytr1);

  						 var mytd1 = document.createElement('td');
  						 mytd1.innerHTML += "<span style='float:left;color;yellow; font-size:small'>  Seite  <font style=\"color:green; font-size:100%;\"><b>["+x+"] </b></font> </span>";
  						 mytr1.appendChild(mytd1);

									 smsfelder(f,x)

									}
								}
							});
							}catch(e){
							alert("suche beendet ");
						}

					}
				});
			}
	
}
smsfelder(f);

},false); 






var newdiv = document.createElement('div');
newdiv.setAttribute('style', 'padding-bottom:10px;padding-left:30px;margin-top:-20px;color:#fff;background:url(http://media.pennergame.de/img/content_31.jpg);position:relative;');
newdiv.innerHTML = '<strong>Anleitung zum Posteingangs und Ausgangssuche</strong><br>'
+'Ihr gibt einen Suchbegriff ein.'
+'Ihr k&ouml;nnt nach Absender,Inhalt ,Absende Datum ,oder nach Betreff der Nachricht suchen.'
+'Einfach das Such Wort eingeben und auf Suche klicken'
+'Die Suche kann einige Miunten dauern jenachdem wie voll euer Eingang oder Ausgang ist .'
+'Habe bei mir getestet und bei 1000 Nachrichten kann das schon ca 5 Minuten dauern.'
+'Also Suche klicken und zur&uuml;ck lehnen und zukucken ,alle gefundenen Nachrichten,'
+'Die den Suchebegriff beinhalten werden aufgelistet mit Link und Profillink der Nachricht.<br>'
+'<strong>Mfg Basti1012</strong>';

document.getElementById("fix").insertBefore(newdiv, document.getElementById("footer"));













// Copyright by basti1012 
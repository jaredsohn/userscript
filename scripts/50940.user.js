// ==UserScript==
// @name          travian farmauswertung
// @description	  videl
// @include       http://*.travian.org/*
// @include       *travian*
// @exclude       http://forum.travian.*
// @exclude	  http://*.travian.*/index.php*
// @exclude	  http://*.travian.*/anleitung.php*
// @exclude	  http://*.travian.*/chat/*
// @exclude	  http://*.travian.*/impressum.php*
// @exclude       http://*.travian.*/karte2.php*
// @exclude       http://*.travian.*/admin.php*
// ==/UserScript==
//
// Version 0.0.1 alpha (12.05.2007 21:40)
//
// Copyright (C) 2005 by moi
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//



var tstrings = ["Jeder deiner","In Ausbildung","In Produktion","Handel nach:","Zu wenig Händler","keine Händler","Zu wenig Rohstoffe","keine Rohstoffe","Übersicht","annehmen","Betreff:",
		"Truppen im Dorf","Truppen unterwegs","Truppen in anderen Dörfern","Siedler unterwegs","Gefangene Truppen","Ankommende Truppen","Eigene Truppen","Rückkehr von","großes Fest","",
		" Stufe ","Angreifer","Verteidiger","Beute","Verluste"," greift "," späht ","Gefangene","","",
		"Einheiten:","Bauauftrag:","Truppen schicken","Farm","Händler schicken","Handelsziel","aufnehmen","entfernen","Verlassenes Tal erkunden","Optionen:",
		"Beschreibung","Spieler Profil","Dörfer"];


function blau() {
  url = "http://farmstats.mine.nu/kb.php";
  
	if (window.location.pathname == "/berichte.php") {
     
		
	   if (window.location.search.match(/^\?id=(\d+)/)) {
		  var repid = RegExp.$1;
			}
		 
		 var tlist = document.getElementsByTagName('table');
		 
     var vnum = 1;
		 var defender = "";
     for (var i=0; i<tlist.length; i++) {
		    //alert (tlist[i].getAttribute("id"));
				//alert (tlist[i].getAttribute("class"));
                    //var report = tlist[i].innerHTML;
                    //alert(report); 

		 		 if (tlist[i].getAttribute("id") == "report_surround") {
		          var dorfid = tlist[i].innerHTML;
						 	var matche =  /(wurde angegriffen|beliefert|unterst.tzt|Natur)/.test(dorfid);
							if (matche == true) {break;};

							dorfid = dorfid.replace(/<a href=\"spieler.php\?uid=(\d+)\">/,"\{xangreiferid\}$1\{/xsangreiferid\}");
							dorfid = dorfid.replace(/<a href=\"spieler.php\?uid=(\d+)\">/,"\{xverteidigerid\}$1\{/xverteidigerid\}");
							dorfid = dorfid.replace(/<a href=\"karte.php\?d=(\d+)\&amp;c=[\w|\d]+\">/,"\{xangreiferdorfid\}$1\{/xangreiferdorfid\}");
							dorfid = dorfid.replace(/<a href=\"karte.php\?d=(\d+)\&amp;c=[\w|\d]+\">/,"\{xverteidigerdorfid\}$1\{/xverteidigerdorfid\}");
							dorfid = dorfid.replace(/<(\/)?b>/g,"");
              dorfid = dorfid.replace(/<\/?[^>]+(>|$)/g," ");
							dorfid = dorfid.replace(/am\s*(\d+.\d+.\d+)\s*um\s*(\d+.\d+.\d+)/,"<xdate>$1</xdate><xtime>$2</xtime>");
							dorfid = dorfid.replace(/\{/g,"<");
							dorfid = dorfid.replace(/\}/g,">");
							dorfid = dorfid.replace(/[^<]*/m,"");
							dorfid = dorfid.replace(/(<\/[^>]*)[^<]*/g,"$1>");
							dorfid = dorfid.replace(/\s/g," ");
							
							
							
							}
							
				 if (tlist[i].getAttribute("id") == "attacker") {
				      var angreifer = tlist[i].innerHTML;
							
		          angreifer = angreifer.replace(/<(\/)?b>/g,"");
							angreifer = angreifer.replace(/<\/?[^>]+(>|$)/g," ");
							angreifer = angreifer.replace(/<\/?[^>]+(>|$)/g," ");

							angreifer = angreifer.replace(/Einheiten\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/,"<xEinheitenAngreifer>$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:$11</xEinheitenAngreifer>");
							angreifer = angreifer.replace(/Verluste\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/,"<xVerlusteAngreifer>$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:$11</xVerlusteAngreifer>");
							angreifer = angreifer.replace(/Gefangene\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/,"<xGefangeneAngreifer>$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:$11</xGefangeneAngreifer>");
          
							angreifer = angreifer.replace(/Einheiten\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/,"<xEinheitenAngreifer>$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:0</xEinheitenAngreifer>");
							angreifer = angreifer.replace(/Verluste\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/,"<xVerlusteAngreifer>$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:0</xVerlusteAngreifer>");
							angreifer = angreifer.replace(/Gefangene\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/,"<xGefangeneAngreifer>$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:0</xGefangeneAngreifer>");

              
							angreifer = angreifer.replace(/Info\s+(([\wüäöß,]+\s)+)/g,"<xinfo>$1</xinfo>");
							angreifer = angreifer.replace(/Beute\s*(\d*)\s*\|\s*(\d*)\s*\|\s*(\d*)\s*\|\s*(\d*)/,"<xbeute>$1:$2:$3:$4</xbeute>");
						  

							angreifer = angreifer.replace(/[^<]*/m,"");
							angreifer = angreifer.replace(/(<\/[^>]*)[^<]*/g,"$1>");
							angreifer = angreifer.replace(/\s/g," ");
							
							//alert(angreifer);
							
							}
							
						if (tlist[i].getAttribute("class") == "defender") {
						  //alert (vnum);
				      var verteidiger = tlist[i].innerHTML;
							verteidiger = verteidiger.replace(/Keulenschwinger/,">[xeinheiten]Keulenschwinger[/xeinheiten]<");
							verteidiger = verteidiger.replace(/Legio/,">[xeinheiten]Legio[/xeinheiten]<");
							verteidiger = verteidiger.replace(/Phalanx/,">[xeinheiten]Phalanx[/xeinheiten]<");
							
							verteidiger = verteidiger.replace(/<\/?[^>]+(>|$)/g," ");
							verteidiger = verteidiger.replace(/<\/?[^>]+(>|$)/g," ");
							verteidiger = verteidiger.replace(/\[/g,"<");
							verteidiger = verteidiger.replace(/\]/g,">");
							
							verteidiger = verteidiger.replace(/Einheiten\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g,"<xEinheitenVerteidiger"+vnum+">$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:$11</xEinheitenVerteidiger"+vnum+">");
							verteidiger = verteidiger.replace(/Verluste\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g,"<xVerlusteVerteidiger"+vnum+">$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:$11</xVerlusteVerteidiger"+vnum+">");
									
									
							verteidiger = verteidiger.replace(/Einheiten\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g,"<xEinheitenVerteidiger"+vnum+">$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:0</xEinheitenVerteidiger"+vnum+">");
							verteidiger = verteidiger.replace(/Verluste\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g,"<xVerlusteVerteidiger"+vnum+">$1:$2:$3:$4:$5:$6:$7:$8:$9:$10:0</xVerlusteVerteidiger"+vnum+">");
					
							verteidiger = verteidiger.replace(/[^<]*/m,"");
							verteidiger = verteidiger.replace(/(<\/[^>]*)[^<]*/g,"$1>");
							verteidiger = verteidiger.replace(/\s/g," ");
					    
						  defender = defender+verteidiger;
						  //alert (defender);
					
							vnum =vnum+1;
							}
									
							

		 



}

if (vnum > 1)
{
report = (dorfid+angreifer+defender);

    i=1;
    var stat=document.createElement("iframe");
		stat.setAttribute("hspace","0");
		stat.setAttribute("vspace","0");
		stat.setAttribute("frameborder","0");
		stat.setAttribute("marginheight","0");
		stat.setAttribute("marginwidth","0");
				
		stat.setAttribute("src",url+"?&kbid="+repid+"&welt="+urlEncode(window.location.host)+"&bericht="+urlEncode(report)); 
		//alert (stat.src);
		stat.setAttribute("width","0");
		stat.setAttribute("height","0");
		tlist[i].parentNode.insertBefore(stat,tlist[i]);

  


}
}
}
function urlEncode(inStr) {
outStr=' '; //not '' for a NS bug!
for (i=0; i < inStr.length; i++) {
aChar=inStr.substring(i, i+1);
switch(aChar){
case '%': outStr += "%25"; break; case ',': outStr += "%2C"; break;
case '/': outStr += "%2F"; break; case ':': outStr += "%3A"; break;
case '~': outStr += "%7E"; break; case '!': outStr += "%21"; break;
case '"': outStr += "%22"; break; case '#': outStr += "%23"; break;
case '$': outStr += "%24"; break; case "'": outStr += "%27"; break;
case '`': outStr += "%60"; break; case '^': outStr += "%5E"; break;
case '&': outStr += "%26"; break; case '(': outStr += "%28"; break;
case ')': outStr += "%29"; break; case '+': outStr += "%2B"; break;
case '{': outStr += "%7B"; break; case '|': outStr += "%7C"; break;
case '}': outStr += "%7D"; break; case ';': outStr += "%3B"; break;
case '<': outStr += "%3C"; break; case '=': outStr += "%3D"; break;
case '>': outStr += "%3E"; break; case '?': outStr += "%3F"; break;
case 'ä': outStr += "ae"; break; case 'ö': outStr += "oe"; break;
case 'ä': outStr += "Ae"; break; case 'Ö': outStr += "Oe"; break;
case 'ü': outStr += "ue"; break; case 'Ü': outStr += "Ue"; break;
case 'ß': outStr += "ss"; break;
case '[': outStr += "%5B"; break; case '\\': outStr += "%5C"; break;
case ']': outStr += "%5D"; break; case ' ': outStr += "+"; break;
default: outStr += aChar;
}
}
return outStr.substring(1, outStr.length);
}


function test(){
	alert('test');
}


function festsort (a, b) {
  return parseInt(a) - parseInt(b);
}


blau();
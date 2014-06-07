// ==UserScript==
// @name          Bei-uns.de BuddyBox
// @description   Fuegt eine Box hinzu auf der die OnlineFreunde erscheinen
// @include       *bei-uns.de*
// ==/UserScript==

//
// By Madboy 2008
//

//Version 1.0
function showhidelisten(){
  ebenenX = document.getElementsByTagName('div')
  var ebenenid2 = 1;
  if(document.getElementById('BuddyBox1b').style.visibility=='hidden'){
    document.getElementById('BuddyBox1b').style.visibility='visible';
  }
  else{
    document.getElementById('BuddyBox1b').style.visibility='hidden';
  }
  for( var lli = 1; lli <= ebenenX.length; lli++)
  {
    ebenenid2 = ebenenid2 + 1
    if(document.getElementById('BuddyBox' + ebenenid2 + 'aa').style.visibility=='hidden'){  
      document.getElementById('BuddyBox' + ebenenid2 + 'aa').style.visibility='visible';
    }
    else{
      document.getElementById('BuddyBox' + ebenenid2 + 'aa').style.visibility='hidden';
    }
  }
}

function BuddyListe(){
  if(intiit==0){  
    var frrr = document.getElementById('fo').href;
    GM_xmlhttpRequest({
		  method: "GET",
		  url: frrr,
		  onload: function(xhr) {
		    xhr.responseText;
        var text = xhr.responseText;
		    //Summierter Abstand
        var top = 58;
        var ebenenid1 = 1;
        //OnlineUser auslesen
        var online = 'Derzeit online (';
        var px1 = text.indexOf(online, px1);
        px1 += online.length;
        var px2 = text.indexOf('):</h3>', px1);
        neuertext = text.substring(px1, px2);
        var elm = document.getElementById("sa");
        var elm_parent = elm.parentNode;
        var div = document.createElement("div");
        elm_parent.insertBefore(div, elm);
        if(neuertext==1){
          div.innerHTML = '<div id="BuddyBox1b" style="position: absolute; width: 220px; height: 300px; z-index: 55; left:260px; top:60px"><table border="0" width="220" cellpadding="0" bgcolor="#E8E8E8" style="border-collapse: collapse"><tr><td width="4" bgcolor="#000000"></td><td width="216"><p style="margin-top: 0; margin-bottom: 0"><font color="#000000" face="Verdana" size="1">' + neuertext + ' Freund online:</font></p></td></tr></table></div>';
        }
        if(neuertext>1){
          div.innerHTML = '<div id="BuddyBox1b" style="position: absolute; width: 220px; height: 300px; z-index: 55; left:260px; top:60px"><table border="0" width="220" cellpadding="0" bgcolor="#E8E8E8" style="border-collapse: collapse"><tr><td width="4" bgcolor="#000000"></td><td width="216"><p style="margin-top: 0; margin-bottom: 0"><font color="#000000" face="Verdana" size="1">' + neuertext + ' Freunde online:</font></p></td></tr></table></div>';
        }
        var anzahl1 = neuertext * 5;
		    var p1 = 0;
		    var start = 'Freunde / Ignorierliste';
		    var k = 0;
        var elm = document.getElementById("sa");
        var elm_parent = elm.parentNode;
        var div = document.createElement("div");
        elm_parent.insertBefore(div, elm);
        var s ='';
        for( var ii = 1; ii <= anzahl1; ii++){
  		    k += 1;
          p1 = text.indexOf(start, p1);
          p1 += start.length;
          var p2 = text.indexOf('Geburtstagserinnerungen', p1);
          start = text.substring(p1, p2);
          start = '<a href="';
          p1 = text.indexOf(start, p1);
          p1 += start.length;
          p2 = text.indexOf('"', p1);
          start = text.substring(p1, p2);
 			    //Ausgabe 1. Freund
          if(k==1){
            top = top + 14;
            ebenenid1 = ebenenid1 +1
            s += '<div id="BuddyBox' + ebenenid1 + 'aa" style="position: absolute; width: 220px; height: 20px; z-index: 55; left:260px; top:' + top + 'px;"><table border="0" width="220" height="14" cellpadding="0" bgcolor="#FFFFFF" style="border-collapse: collapse;"><tr><td width="4" bgcolor="#000000"></td><td width="156"><font face="Verdana" size="1"><a href="' + start + '">';
          }
          if(k==2){
            var abschneiden = start.length - 12; 
            s+= start.slice(7, abschneiden); + '</font></td></a>';
          }
          if(k==3){
            s+= '<td width="60" bgcolor="#E8E8E8" align="center"><a href="' + start + '?nb=1"><img src="http://img510.imageshack.us/img510/6604/14layervisiblere1.png" height="14" alt="Profil versteckt aufrufen"></a>&nbsp;';
          }
          if(k==4){
            s+= '<a href="' + start + '"><img src="http://media.bei-uns.de/s/pn2.gif" alt="Nachricht schreiben"></a>&nbsp;';
          }
          if(k==5){
            s+= '<a href="' + start + '"><img src="http://media.bei-uns.de/s/icon/loeschen.gif" alt="Freund l&#246;schen"></a></td></tr></table></div>';
            k=0;
          }
          div.innerHTML = s;
        }
        intiit = 1;
			}
    });
  }
  else{
    showhidelisten();
  }
}
 
  var intiit = 0;

  var elm = document.getElementById("sa");
  var elm_parent = elm.parentNode;
  var div20 = document.createElement("div");
  elm_parent.insertBefore(div20, elm);
  div20.innerHTML = '<div style="position: absolute; width: 100px; height: 20px; z-index: 155; left:252px; top:40px" id="BuddyBox2"><img border="0" onclick="BuddyListe()" src="http://img519.imageshack.us/img519/7315/248674889hk6.png" alt="Online Freunde anzeigen"><a href="javascript:BuddyListe()"><font color="#FFFFFF" face="Verdana" size="1">Buddy Liste</a></font></div>';
  div20.addEventListener("click", BuddyListe, false);

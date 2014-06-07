// ==UserScript==
// @name        GalaxyInfo-fr
// @namespace   by rudolph
// @description Add coords and ranks in galaxy view
// @include     http://*.ogame.*/game/index.php?page=galaxy*
// @version     1
// ==/UserScript==

function dot(word)
 {
  var step=String(word);
  word="";
  for (j = 0, i = step.length - 1; i >= 0; i--, j++)
   {
    word=step.charAt(i)+((j > 0) && (j % 3 == 0)? ".": "")+word;
   }
  return word;
 }


function getdata(uurl,id,uni)
 {
GM_xmlhttpRequest({
  method: "GET",
  url: uurl,
  onload: function(response) {
    var paso=response.responseText;
    var paso2;
    var score;
    var coords;
    var moon;
    var i=0;
    var galax;
    var syst;
    var pos;
    var urlgal;
    var arraycoords=new Array();
    paso=paso.split('<positions>');
    paso2=paso[1].split('</positions>');
    paso2=paso2[0].split('<position type="');
    score=paso2[1].split('score="');
    score=score[1].split('"');
    score=dot(score[0]);
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>Points: "+score+"</span></li>";

    score=paso2[2].split('score="');
    score=score[1].split('"');
    score=dot(score[0]);
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>Economie: "+score+"</span></li>";

    score=paso2[4].split('score="');
    score=score[1].split('"');
    score=dot(score[0]);
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>Militaire: "+score+"</span></li>";

    if (paso2[4].indexOf('ships="')>-1)
     {
      score=paso2[4].split('ships="');
      score=score[1].split('"');
      score=dot(score[0]);
      document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>Vaisseaux: "+score+"</span></li>";
     }


    score=paso2[7].split('score="');
    score=score[1].split('"');
    score=dot(score[0]);
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>Détruits: "+score+"</span></li>";

    score=paso2[3].split('score="');
    score=score[1].split('"');
    score=dot(score[0]);
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>Recherches: "+score+"</span></li><br>";


   paso2=paso[1].split('<planets>');
   paso2=paso2[1].split('<planet id="');

   i=i+1;
   coords=paso2[i].split('coords="');
   coords=coords[1].split('"');
   if(coords[1].indexOf('<moon id=')>-1)
    {
     coords=coords[0].split(':');
     galax=coords[0];
     syst=coords[1];
     pos=coords[2];
     urlgal="http://uni"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
     arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+" L PM</a>";
    }
   else
    {
     coords=coords[0].split(':');
     galax=coords[0];
     syst=coords[1];
     pos=coords[2];
     urlgal="http://uni"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
     arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+" PM</a>";
    }


  while (paso2[i+1]!=undefined)
    {
     i=i+1;
     coords=paso2[i].split('coords="');
     coords=coords[1].split('"');
     if(coords[1].indexOf('<moon id=')>-1)
       {
        coords=coords[0].split(':');
        galax=coords[0];
        syst=coords[1];
        pos=coords[2];
        urlgal="http://uni"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
        arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+" L</a>";
       }
     else
       {
        coords=coords[0].split(':');
        galax=coords[0];
        syst=coords[1];
        pos=coords[2];
        urlgal="http://uni"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
        arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+"</a>";
       }
    }
 arraycoords=arraycoords.sort();
 i=0;
 while (i<arraycoords.length-1)
   {
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li>"+parseInt(i+1)+": "+arraycoords[i]+"</li>";
    i=i+1;
   }
  }
});
 }


function galaxydata()
{
 if (document.getElementById('galaxytable')!=null && document.getElementById('divgalaxydata')==null)
  {
   var link= document.createElement("div");
   link.id = "divgalaxydata";
   document.getElementById('galaxytable').getElementsByTagName('tr')[18].appendChild( link );
 
   var i=2;
   var idstep;
   var uniurl;
   var uni;
   while (i<17)
    {
     idstep=document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByTagName('td')[7].innerHTML;
     if (idstep.indexOf('<div id="player')>-1)
      {
       idstep=idstep.split('<div id="player');
       idstep=idstep[1].split('"');
       if (idstep[0]!="" && document.getElementById("dataindicatorX323"+idstep[0])==null)
        {
         uniurl=document.URL.split('uni');
         uni=uniurl[1].split('/game/index');
         uniurl="http://uni"+uni[0]+"/api/playerData.xml?id="+idstep[0];
         getdata(uniurl,idstep[0],uni[0]);
         link= document.createElement("div");
         link.id = "dataindicatorX323"+idstep[0];
         document.getElementById("player"+idstep[0]).appendChild(link);
        }
      }
     i=i+1;
    }
 }
}

 setInterval (galaxydata, 1100);
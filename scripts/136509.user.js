// ==UserScript==
// @name        GalaxyInfo-es
// @namespace   by trusreno
// @description Add coords and ranks in galaxy view
// @include     http://*.ogame.*/game/index.php?page=*
// @version     2.3.4
// @grant       GM_xmlhttpRequest
// @require     http://userscripts.org/scripts/source/118453.user.js
// @updateURL   http://userscripts.org/scripts/source/136509.meta.js
// @downloadURL https://userscripts.org/scripts/source/136509.user.js
// ==/UserScript==

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if ((typeof(oGameVersionCheck) !="undefined"))
 {
  oGameVersionCheck('GalaxyInfo','5.6.4','http://userscripts.org/scripts/show/136509');
 }



function donatefunc()
{
 if(document.getElementById("divdonate")==null)
  {
   var link= document.createElement("div");
   link.id = "divdonate";
   link.innerHTML=' Agradecemos<br>su colaboración<br><br><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="JY99QNNSFRVLE"><input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal. La forma rápida y segura de pagar en Internet."><img alt="" border="0" src="http://img.tecnologiapyme.com/original/11511.jpg" width="24" height="14"><img alt="" border="0" src="https://www.paypalobjects.com/es_ES/i/scr/pixel.gif" width="1" height="1"></form>';
   link.setAttribute("style","position:fixed; top:11%; left: 0.5%; z-index:250; background-color: green;");
   document.body.appendChild( link );
   setTimeout('document.getElementById("divdonate").style.visibility="hidden";',5000);
  }
 else
  {
   document.getElementById("divdonate").style.visibility="visible";
   setTimeout('document.getElementById("divdonate").style.visibility="hidden";',5000);
  }
}


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
    var points;
    var economy;
    var military;
    var ships;
    var destroyed;
    var research;
    var mainplanet;
    var numPoints;
    var numEconomy;
    var numMilitary;
    var numResearch;
    var defenses;
    var arraycoords=new Array();


    if(uni.indexOf('us.')>-1 || uni.indexOf('org.')>-1)
     {
      points="Points";
      economy="Economy";
      military="Military";
      ships="Ships";
      destroyed="Destroyed";
      lost="Lost";
      research="Research";
      mainplanet="HW";
      defenses="Ap.Defense";
     }
    else if(uni.indexOf('fr.')>-1)
     {
      points="Points";
      economy="Économíe";
      military="Militaire";
      ships="Vaisseaux";
      destroyed="Détruits";
      lost="Perdus";
      research="Recherches";
      mainplanet="PM";
      defenses="Ap.Défense";
     }
    else
     {
      points="Puntos";
      economy="Economia";
      military="Militar";
      ships="Naves";
      destroyed="Destruidos";
      lost="Perdidos";
      research="Investigacion";
      mainplanet="PP";
      defenses="Ap.Defensas";
     }

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>ID: "+"<a href=\""+uurl+"\" target=\"_blank\">"+id+"</a>"+"</span></li>";

    paso=paso.split('<positions>');
    paso2=paso[1].split('</positions>');
    paso2=paso2[0].split('<position type="');
    if(paso2[7]==undefined)
     {
      return;
     }

    score=paso2[1].split('score="');
    score=score[1].split('"');
    numPoints=score[0];
    var vPoints=dot(score[0]);

    score=paso2[2].split('score="');
    score=score[1].split('"');
    numEconomy=score[0];
    var vEconomy=dot(score[0]);

    score=paso2[4].split('score="');
    score=score[1].split('"');
    numMilitary=score[0];
    var vMilitary=dot(score[0]);

    var vShips=0;

    if (paso2[4].indexOf('ships="')>-1)
     {
      score=paso2[4].split('ships="');
      score=score[1].split('"');
      vShips=dot(score[0]);
     }

    score=paso2[7].split('score="');
    score=score[1].split('"');
    var vDestroyed=dot(score[0]);

    score=paso2[5].split('score="');
    score=score[1].split('"');
    var vLost=dot(score[0]);


    score=paso2[3].split('score="');
    score=score[1].split('"');
    numResearch=score[0];
    var vResearch=dot(score[0]);

    paso2=parseInt(numEconomy)+parseInt(numMilitary)+parseInt(numResearch)-parseInt(numPoints);

    var vDefenses=0;
    if(paso2>0)
    {
     vDefenses=dot(paso2);
    }


    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>"+points+": "+vPoints+"</span></li>";

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>"+economy+": "+vEconomy+"</span></li>";

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>"+military+": "+vMilitary+"</span></li>";

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>"+defenses+": "+vDefenses+"</span></li>";

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>Nº "+ships+": "+vShips+"</span></li>";

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>"+destroyed+": "+vDestroyed+"</span></li>";

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>"+lost+": "+vLost+"</span></li>";

    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li><span>"+research+": "+vResearch+"</span></li><br>";


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
     urlgal="http://"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
     arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+" M "+mainplanet+"</a>";
    }
   else
    {
     coords=coords[0].split(':');
     galax=coords[0];
     syst=coords[1];
     pos=coords[2];
     urlgal="http://"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
     arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+" "+mainplanet+"</a>";
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
        urlgal="http://"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
        arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+" M</a>";
       }
     else
       {
        coords=coords[0].split(':');
        galax=coords[0];
        syst=coords[1];
        pos=coords[2];
        urlgal="http://"+uni+"/game/index.php?page=galaxy&galaxy="+galax+"&system="+syst+"&position="+pos;
        arraycoords[i]="<a href=\""+urlgal+"\">"+galax+":"+syst+":"+pos+"</a>";
       }
    }
 arraycoords=arraycoords.sort();

 var ni=0;
 var paso3;
 var gl;
 var gl2;
 var ss;
 var ss2;
 var pl;
 var pl2;
 var sw=true;

 i=0;
 while (arraycoords[i]==undefined || arraycoords[i]=="")
   {
    i=i+1;
    ni=i;
   }
 if (arraycoords[i+1]!=undefined)
   {
    while (sw==true)
     {
      sw=false;
      i=ni;
      while(arraycoords[i+1]!=undefined)
       {
        paso=arraycoords[i].split(':');
        paso2=arraycoords[i+1].split(':');
        gl=paso[1].split('">');
        gl2=paso2[1].split('">');
        ss=parseInt(paso[2]);
        ss2=parseInt(paso2[2]);
        pl=paso[3];
        pl2=paso2[3];
        if(pl.charAt(2)=="<" || pl.charAt(2)==" ")
          {
           pl=parseInt(pl.charAt(0)+pl.charAt(1));
          }
        else
          {
           pl=parseInt(pl.charAt(0));
          }
        if(pl2.charAt(2)=="<" || pl2.charAt(2)==" ")
          {
           pl2=parseInt(pl2.charAt(0)+pl2.charAt(1));
          }
        else
          {
           pl2=parseInt(pl2.charAt(0));
          }


        if ((gl[1]==gl2[1] && ss>ss2) || (gl[1]==gl2[1] && ss==ss2 && pl>pl2))
         {
          paso3=arraycoords[i+1];
          arraycoords[i+1]=arraycoords[i];
          arraycoords[i]=paso3;
          sw=true;
          }
        i=i+1;
       }
   }
 }

 i=0;
 while (i<arraycoords.length-1)
   {
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+"<li>"+parseInt(i+1)+": "+arraycoords[i]+"</li>";
    i=i+1;
   }
    document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML=document.getElementById("player"+id).getElementsByTagName('ul')[0].innerHTML+'<br><a id="hrefdonate'+id+'" href="javascript:donatefunc()">Donate/Donar(Gal.Inf)</a><br>';
    document.getElementById("hrefdonate"+id).addEventListener('click',donatefunc,false);
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
 
   if (document.getElementById('galaxytable').getElementsByClassName('bdaySlot')[0]!=undefined)
     {
      var i=5;
     }
   else
     {
      var i=4;
     }
   var idstep;
   var uniurl;
   var uni;
   while (i<19)
    {
     idstep=document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByTagName('td')[7].innerHTML;

     if (idstep.indexOf('<div id="player')>-1)
      {
       idstep=idstep.split('<div id="player');
       idstep=idstep[1].split('"');
       if (idstep[0]!="" && document.getElementById("dataindicatorX323"+idstep[0])==null)
        {
         if(document.URL.indexOf('uni')>-1)
          {
           uniurl=document.URL.split('uni');
           uni=uniurl[1].split('/game/index');
           uniurl="http://uni"+uni[0]+"/api/playerData.xml?id="+idstep[0];
           getdata(uniurl,idstep[0],uni[0]);
           link= document.createElement("div");
           link.id = "dataindicatorX323"+idstep[0];
           document.getElementById("player"+idstep[0]).appendChild(link );
          }
          else
          {
           uniurl=document.URL.split('//');
           uni=uniurl[1].split('/game/index');
           uniurl="http://"+uni[0]+"/api/playerData.xml?id="+idstep[0];
           getdata(uniurl,idstep[0],uni[0]);
           link= document.createElement("div");
           link.id = "dataindicatorX323"+idstep[0];
           document.getElementById("player"+idstep[0]).appendChild(link );
          }
        }
      }
     i=i+1;
    }
 }
}

 if (document.URL.indexOf('galaxy')>-1)
  {
   var int=setInterval (galaxydata, 1100);
  }

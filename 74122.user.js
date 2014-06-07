// ==UserScript==
// @name Ds_Markt
// @description Verteilt Rohstoffe auf Dörfer
// @author Farbdose
// @namespace http://osor.de/
// @include http://de*.die-staemme.de/game.php*overview_villages&mode=prod
// @include http://de*.die-staemme.de/game.php*screen=market&mode=send
// @include http://de*.die-staemme.de/game.php*screen=market
// @include http://de*.die-staemme.de/game.php*screen=market&try=confirm_send
// ==/UserScript==

(function()
{
 var On=0;
 var inputholz=new Array();
 var inputlehm=new Array();
 var inputeisen=new Array();

 function aktuelleid()
 {
    var ort = document.getElementsByTagName("a");
    for (i=0;i<ort.length;i ++)
    {
      ortwert=new String(ort[i].href);
      zeichen=ortwert.search(/village.+/);
      if(zeichen!=-1 && zeichen<=50)
      {
       i=ort.length;
       return ortwert.slice(ortwert.search(/=.+/)+1,ortwert.search(/&.+/));
      }
    }
 }
 var aktiv=0;
 var source=0;

 function einlesen()
 {
   var holz="";
   var lehm="";
   var eisen="";
   var speicher="";
   var haendler="";
   var td=document.getElementsByTagName("td");
   for (i=0;i<td.length;i ++)
   {
    info=new String(td[i].innerHTML);
    zeichen=info.search(/Holz.+/);
    if(zeichen!=-1 && zeichen<=50)
    {
     info = info.replace(/<span class="grey">.<\/span>/g, "");
     info = info.replace(/<img.src=.graphic......png?....title=...... alt=..>/g, "");
     info = info.replace(/<img.src=.graphic.......png?....title=....... alt=..>/g, "");
     resi = info.split(" ");
     if(holz!=""){holz = holz+","+resi[0];}else{holz=resi[0];}
     if(lehm!=""){lehm = lehm+","+resi[1];}else{lehm=resi[1];}
     if(eisen!=""){eisen = eisen+","+resi[2];}else{eisen=resi[2];}
     if(speicher!=""){speicher = speicher+","+td[i+1].innerHTML;}else{speicher = td[i+1].innerHTML;}
     var haendlerwert=td[i+2].innerHTML.slice(td[i+2].innerHTML.indexOf(">")+1,td[i+2].innerHTML.length-4 );
     haendlerwert=haendlerwert.slice(haendlerwert.length/2+1)
     if(haendler!=""){haendler = haendler+","+haendlerwert;}else{haendler = haendlerwert;}
    }
   }

   var edit=document.getElementsByTagName("input");
   var ids="";
   for (i=0;i<edit.length;i ++)
   {
    info=new String(edit[i].id);
    zeichen=info.search(/edit.+/);
    if(zeichen!=-1  && zeichen<=3)
    { if(ids!=""){ids = ids+","+edit[i].id.slice(11);}else{ids=edit[i].id.slice(11);} }
   }
   alert("Daten eingelesen");
   GM_setValue("vorhandenesHolz",holz)
   GM_setValue("vorhandenerlehm",lehm)
   GM_setValue("vorhandenesEisen",eisen)
   GM_setValue("vorhandenerspeicher",speicher)
   GM_setValue("haendler",haendler)
   GM_setValue("ids",ids)

 }

 function formserstellen(resiart,i,inputort)
 {
   eval(resiart+"Prozent=\"eval("+resiart+"Prozent"+i+")\";");
   eval("einput"+resiart+"=document.createElement('input');");
   eval("einput"+resiart+".name=\""+resiart+i+"\";");
   eval("gmvariablename="+resiart+"Prozent;");
   gmvariablename=gmvariablename.slice(5,gmvariablename.length-1);
   var gmvariable=GM_getValue(gmvariablename,"75");
   eval("einput"+resiart+".value=gmvariable;");
   eval("einput"+resiart+".size=2;");
   eval("inputort.appendChild(einput"+resiart+");");
   eval("einput"+resiart+"2=new Array(einput"+resiart+");");
   eval("input"+resiart+"=input"+resiart+".concat(einput"+resiart+"2);");
 }

 function prozentspeichern()
 {
  var holzProzent;
  var lehmProzent;
  var eisenProzent;
  for(i=0;i<inputholz.length;i ++)
  {
   eval("holzProzent=\"holzProzent"+(i-(-1))+"\";");
   GM_setValue(holzProzent,inputholz[i].value);
   eval("lehmProzent=\"lehmProzent"+(i-(-1))+"\";");
   GM_setValue(lehmProzent,inputlehm[i].value);
   eval("eisenProzent=\"eisenProzent"+(i-(-1))+"\";");
   GM_setValue(eisenProzent,inputeisen[i].value);
  }
  alert("Gespeichert");
 }

 function draw()
 {
   if(On==0)
   {
    var ort = document.getElementsByTagName("table");
    for (i=0;i<ort.length;i ++)
    {
      ortwert=new String(ort[i].innerHTML);
      zeichen=ortwert.search(/Dorf.+/);
      if(zeichen!=-1 && zeichen<=50)
      {
       var neuerort=ort[i].getElementsByTagName("tr");
       for (i=0;i<neuerort.length;i ++)
       {
        if(i==0)
        {

         var save = document.createElement('a');
         save.href="javascript:;";
         save.addEventListener('click',prozentspeichern,true);
         save.innerHTML = ' <img width="11" height="11" src="http://ni01.homeftp.org/media/save.jpg">';

         var eTh = document.createElement('th');
         var eTxt = document.createTextNode('Zielmenge');
         var ref = neuerort[i].getElementsByTagName('th')[GM_getValue("Zielspalte","3")-1];
         eTh.appendChild(eTxt);
         saveort=neuerort[i].insertBefore(eTh,ref);
         saveort.appendChild(save)
        }
        else
        {
         var inputort=neuerort[i].insertCell(GM_getValue("Zielspalte","3")-1);
         formserstellen("holz",i,inputort);
         formserstellen("lehm",i,inputort);
         formserstellen("eisen",i,inputort);
        }
       }
       i=ort.length;
      }
    }
    On=1;
   }
   else
   {
    var ort = document.getElementsByTagName("table");
    for (i=0;i<ort.length;i ++)
    {
      ortwert=new String(ort[i].innerHTML);
      zeichen=ortwert.search(/Dorf.+/);
      if(zeichen!=-1 && zeichen<=50)
      {
       var neuerort=ort[i].getElementsByTagName("tr");
       for (i=0;i<neuerort.length;i ++)
       {
        neuerort[i].deleteCell(GM_getValue("Zielspalte","3")-1);
       }
       i=ort.length;
      }
    }
    On=0;
   }
 }

 function eingabe()
 {
   var ort = document.getElementsByTagName("th");
   var l = document.createElement('a');
   l.href="javascript:;";
   l.addEventListener('click',draw,true);
   l.innerHTML = 'Einstellungen';
   var timer=0;
   for (i=0;i<ort.length;i ++)
   {
    ortwert=new String(ort[i].innerHTML);
     if(ortwert=="Dorf") { timer=1; }
     if(timer!=0){ timer=timer+1; }
     if(ortwert=="Rohstoffe")
     {
      GM_setValue("Zielspalte",timer);
      ort[i].appendChild(l);
      i=ort.length;
     }
   }
 }

 function differenzberechnen(resiart)
 {
   var vorhandenesholz=GM_getValue("vorhandenesHolz","0").split(",");
   var vorhandeneslehm=GM_getValue("vorhandenerlehm","0").split(",");
   var vorhandeneseisen=GM_getValue("vorhandenesEisen","0").split(",");
   var vorhandenerspeicher=GM_getValue("vorhandenerspeicher","0").split(",");
   var stopp=0;
   var stopp2=0;
   var hoehe=0;
   var differenz=0;
   var vorhandenesresiart=0;
   eval("vorhandenesresiart=vorhandenes"+resiart+";");
   for(i=0;stopp==0;i ++)
   {
    eval(resiart+"Prozent=\""+resiart+"Prozent\"+(i-(-1));");
    eval("gmvariablename="+resiart+"Prozent;");

    if(GM_getValue(gmvariablename,"-1")!=-1)
    {
     if(hoehe==0){hoehe=(vorhandenesresiart[i])/(((50)/GM_getValue(gmvariablename,"0"))*vorhandenerspeicher[i]);}else{hoehe=hoehe+(vorhandenesresiart[i])/(((50)/GM_getValue(gmvariablename,"0"))*vorhandenerspeicher[i]);}
    }
    else
    {
     zielhoehe=hoehe/i;
     for(i=0;stopp2==0;i ++)
     {
     eval(resiart+"Prozent=\""+resiart+"Prozent\"+(i-(-1));");
     eval("gmvariablename="+resiart+"Prozent;");
     if(GM_getValue(gmvariablename,"-1")!=-1)
      {
       if(differenz==0){ differenz=Math.round(Math.round(vorhandenesresiart[i]-(zielhoehe*(((50)/GM_getValue(gmvariablename,"0"))*vorhandenerspeicher[i])))/1000)*1000; } else { differenz=differenz+","+Math.round(Math.round(vorhandenesresiart[i]-(zielhoehe*(((50)/GM_getValue(gmvariablename,"0"))*vorhandenerspeicher[i])))/1000)*1000; }
      }
      else
      {
       stopp2=1;
      }
     }
     stopp=1;
    }
   }
  return differenz.split(",");
 }

 function garnicht(doerfer,resiart,dorfnummer)
 {
   var ok=0;
   for (i=0;i<doerfer.length;i ++)
   {
    if(doerfer[i].split("|")[resiart]<=-1)
    { ok=1;
    i=doerfer.length;
    }
   }
   returnwert=new Array(2);

   if(ok==1)
   {

    var dorf=doerfer[dorfnummer-1].split("|");
    if(dorf[resiart]>=1){returnwert[0]=true;}
    if(dorf[resiart]<=0){returnwert[0]=false;}
    returnwert[1]=dorf[resiart];
   }
   else
   {
    returnwert[0]=false;
    returnwert[1]=0;
   }
   return returnwert;
 }

 function dorfnumber(doerfer,aid)
 {
   for(i=0;i<doerfer.length;i ++)
   {
    var id=doerfer[i].split("|")[1];
    if(id==aid){return parseInt(doerfer[i].split("|")[0].slice(4,5));}
   }
 }

 function transferberechnen(resiart,ueberschuss,array)
 {
   for(i=0;i<array.length;i ++)
   {
    var wert=array[i].split("|")[resiart];
    if(wert<=-1)
    {
     returnwert=new Array(4);
     var number=array[i].split("|")[0].slice(4,5);
     if(wert*(-1)>ueberschuss)
     {
      returnwert[0]=number;
      returnwert[1]=ueberschuss;
      returnwert[2]=ueberschuss-(wert*(-1));
      returnwert[3]=0;
     }
     else
     {
      returnwert[0]=number;
      returnwert[1]=wert*(-1);
      returnwert[2]=0;
      returnwert[3]=ueberschuss-(wert*(-1));
     }
     return returnwert;
     i=array.length;
    }
   }
 }

 function vorschlagformatieren(werte)
 {
  werte=werte.split(",");
  var returnwert=new Array(0,0,0,0);
  var search=werte[0].split("|")[2];
  returnwert[0]=search;
  for(i=0;i<werte.length;i ++)
  {
   var splitter=werte[i].split("|");
   if(splitter[2]==search)
   {
    returnwert[splitter[1]-1]=splitter[0];
   }
  }
  return returnwert;
 }

 function aktuellehaendler()
 {
  var ort = document.getElementsByTagName("th");
  for (i=0;i<ort.length;i ++)
  {
   ortwert=new String(ort[i].innerHTML);
   zeichen=ortwert.search(/ndler.+/);
   if(zeichen!=-1 && zeichen<=50)
   {
    var returnwert=ortwert.slice(zeichen-(-7),ortwert.search(/\/.+/));
    i=ort.length;
   }
  }
  return returnwert;
 }

 function transportanpassen(transport)
 {
  var returnwert=new Array();
  if((transport[1]-(-transport[2])-(-transport[3]))/1000<=aktuellehaendler())
  { returnwert=transport;  }
  else
  {
   returnwert[0]=transport[0];
   var x=(1000*aktuellehaendler())/(transport[1]-(-transport[2])-(-transport[3]));
   returnwert[1]=Math.round(Math.round(x*transport[1])/1000)*1000;
   returnwert[2]=Math.round(Math.round(x*transport[2])/1000)*1000;
   returnwert[3]=Math.round(Math.round(x*transport[3])/1000)*1000;
  }
  return returnwert;
 }

 function differenzaendern(vorhandenes,dex1,neuerwert)
 {
  vorhandenes[dex1]=neuerwert;
  return vorhandenes;
 }

 function uebergabe()
 {
  var transport=GM_getValue("uebergabe");
  GM_setValue("transport",transport)
 }

 function editform()
 {
  document.forms[0].elements[0].setAttribute('readonly', true, 'true');
  document.forms[0].elements[1].setAttribute('readonly', true, 'true');
  document.forms[0].elements[2].setAttribute('readonly', true, 'true');
  document.forms[0].elements[3].setAttribute('readonly', true, 'true');
  document.forms[0].elements[4].setAttribute('readonly', true, 'true');
  document.forms[0].elements[5].setAttribute('readonly', true, 'true');
  document.forms[0].elements[6].addEventListener('click',uebergabe,true);
 }

 function ausgabeausgeben(transport,dorfnummer)
 {
   if(transport[0]>dorfnummer)
   { var index=transport[0]-1; }
   else { var index=transport[0]; }
   var kords=document.getElementsByTagName("option")[index].value.split("|");
   document.getElementById("inputx").value=kords[0];
   document.getElementById("inputy").value=kords[1];
   document.forms[0].elements[5].selectedIndex=index;
   document.forms[0].elements[0].value=transport[1];
   document.forms[0].elements[1].value=transport[2];
   document.forms[0].elements[2].value=transport[3];
 }

 var differenzholz=0;
 var differenzlehm=0;
 var differenzeisen=0;
 var ausgabe="";
 function vorschlagen()
 {
   var vorhandenesholz=GM_getValue("vorhandenesHolz","0").split(",");
   var vorhandenerlehm=GM_getValue("vorhandenerlehm","0").split(",");
   var vorhandeneseisen=GM_getValue("vorhandenesEisen","0").split(",");
   var vorhandenerspeicher=GM_getValue("vorhandenerspeicher","0").split(",");
   var haendler=GM_getValue("haendler","0").split(",");
   var ids=GM_getValue("ids","0").split(",");
   if(differenzholz==0){differenzholz=differenzberechnen("holz");}
   if(differenzlehm==0){differenzlehm=differenzberechnen("lehm");}
   if(differenzeisen==0){differenzeisen=differenzberechnen("eisen");}

   var ausf=0;
   for(i=0;i<differenzholz.length;i ++)
   {
    if(ausf==0){var ausf="Dorf"+(i-(-1))+"|"+ids[i]+"|"+differenzholz[i]+"|"+differenzlehm[i]+"|"+differenzeisen[i]+"|"+haendler[i]+"";}else{ausf=ausf+",Dorf"+(i-(-1))+"|"+ids[i]+"|"+differenzholz[i]+"|"+differenzlehm[i]+"|"+differenzeisen[i]+"|"+haendler[i];}
   }
   var doerfer = ausf.split(",");
   var doerfer2= ausf.split(",");
   var aid=aktuelleid();
   var dorfnummer=dorfnumber(doerfer,aid);
   weiterholz=garnicht(doerfer,2,dorfnummer);
   weiterlehm=garnicht(doerfer,3,dorfnummer);
   weitereisen=garnicht(doerfer,4,dorfnummer);
   if(weiterholz[0]==true)
   {
    transfer=transferberechnen(2,weiterholz[1],doerfer);
    differenzholz=differenzaendern(differenzholz,parseInt(transfer[0])-1,transfer[2]);
    differenzholz=differenzaendern(differenzholz,parseInt(dorfnummer)-1,transfer[3]);
    ausgabe=ausgabe+transfer[1]+"|2|"+transfer[0]+",";
    vorschlagen();
   }
   else if(weiterlehm[0]==true)
   {
    transfer=transferberechnen(3,weiterlehm[1],doerfer);
    differenzlehm=differenzaendern(differenzlehm,parseInt(transfer[0])-1,transfer[2]);
    differenzlehm=differenzaendern(differenzlehm,parseInt(dorfnummer)-1,transfer[3]);
    ausgabe=ausgabe+transfer[1]+"|3|"+transfer[0]+",";
    vorschlagen();
   }
   else if(weitereisen[0]==true)
   {
    transfer=transferberechnen(4,weitereisen[1],doerfer);
    differenzeisen=differenzaendern(differenzeisen,parseInt(transfer[0])-1,transfer[2]);
    differenzeisen=differenzaendern(differenzeisen,parseInt(dorfnummer)-1,transfer[3]);
    ausgabe=ausgabe+transfer[1]+"|4|"+transfer[0]+",";
    vorschlagen();
   }
   else if(ausgabe!="")
   {
    var transport=vorschlagformatieren(ausgabe);
    transport=transportanpassen(transport);
    ausgabeausgeben(transport,dorfnummer);
    editform();
    GM_setValue("uebergabe",transport.join())
    GM_setValue("dorfnummer",dorfnummer)
   }
   else
   {
    alert("Kein Vorschlag vorhanden");
   }
   return 0;
 }

 function drawvorschlag()
 {
    var vors = document.createElement('a');
    vors.href="javascript:;";
    vors.addEventListener('click',vorschlagen,true);
    vors.innerHTML = ' Vorschlag';
    var vors2 = document.createElement('th');
    vors2.innerHTML = 'Rohstoffe';
    var ort = document.getElementsByTagName("tr");
    for (i=0;i<ort.length;i ++)
    {
      ortwert=new String(ort[i].innerHTML);
      zeichen=ortwert.search(/Rohstoffe.+/);
      if(zeichen!=-1 && zeichen<50)
      {
        ort[i].innerHTML="";
        var vors3 =ort[i].appendChild(vors2);
        vors3.appendChild(vors);
        i=ort.length
      }
    }
 }

 function abgeschickt()
 {
  if(GM_getValue("transport","0")!=0)
  {
   var transport=GM_getValue("transport","0").split(",");
   var dorfnummer=GM_getValue("dorfnummer","0");
   var vorhandenesholz=GM_getValue("vorhandenesHolz","0").split(",");
   var vorhandenerlehm=GM_getValue("vorhandenerlehm","0").split(",");
   var vorhandeneseisen=GM_getValue("vorhandenesEisen","0").split(",");
   vorhandenesholz=differenzaendern(vorhandenesholz,transport[0]-1,vorhandenesholz[transport[0]-1]-(-transport[1]));
   vorhandenerlehm=differenzaendern(vorhandenerlehm,transport[0]-1,vorhandenerlehm[transport[0]-1]-(-transport[2]));
   vorhandeneseisen=differenzaendern(vorhandeneseisen,transport[0]-1,vorhandeneseisen[transport[0]-1]-(-transport[3]));
   vorhandenesholz=differenzaendern(vorhandenesholz,dorfnummer-1,vorhandenesholz[dorfnummer-1]-transport[1]);
   vorhandenerlehm=differenzaendern(vorhandenerlehm,dorfnummer-1,vorhandenerlehm[dorfnummer-1]-transport[2]);
   vorhandeneseisen=differenzaendern(vorhandeneseisen,dorfnummer-1,vorhandeneseisen[dorfnummer-1]-transport[3]);
   GM_setValue("vorhandenesHolz",vorhandenesholz.join())
   GM_setValue("vorhandenerlehm",vorhandenerlehm.join())
   GM_setValue("vorhandenesEisen",vorhandeneseisen.join())

  }
 }

 function editabschickform()
 {
  document.forms[0].elements[0].addEventListener('click',abgeschickt,true);
  GM_setValue("uebergabe","")
 }

var url = window.location.href.slice(window.location.href.length-5,window.location.href.length);
if(url=="=prod")
{ eingabe(); einlesen(); }
if(url=="_send")
{ editabschickform(); }
if(url=="=send" || url=="arket")
{ drawvorschlag(); }


}());





// ==UserScript==
// @name DivokeKmeny Utility v0.1
// @author Walrus.
// @description: Pocita vzdalenosti vesnic v DK a casy pro jednotlive druhy vojska
// @description: Nedostatecne mnozstvi surovin pro stavbu vyznacuje cervene.
// @include      http://*ignames.net/*
// ==/UserScript==


var jednotka_nazev=new Array("kopiník","šermíř","sekerník","špeh","l.kavalerie","t.kavalerie","beranidlo","katapult","šlechtic");
var jednotka_rychlost=new Array(18, 22, 18, 9, 10, 11, 30, 30, 35);
var jednotka_zkratka=new Array("kopi","šerm","seker","špeh","l.kav","t.kav","beran","katap","šlech");

// V tomhle radku vyberte, ktere jednotky se budou pocitat (ty s jednickou :O)
var jednotka_pocitat=new Array(0,0,0,1,1,0,0,0,0);



var td=0;
var prvni=1;
var txt=0;
var pocx=0;
var pocy=0;
var konx=0;
var kony=0;
var vyber=0;
var sour=0;
var vzdal=0;
var dx=0;
var dy=0;
var jedncas=0;
var lkavalcas=0;
var sekercas=0;

var vzor=/[0-9]+\|[0-9]+/;
var vzor2=/table/;

var cislonakonci=/[0-9]+$/

var spanelements=document.getElementsByTagName('span')
var thiselement, thistd;

var woodcount=0;
var stonecount, ironcount;
var curcount=0;

var woodspeed=0;
var stonespeed=0;
var ironspeed=0;

var a_imgtxt=new Array(/holz[.]png/,/lehm[.]png/,/eisen[.]png/);



for (ispan=0; ispan<spanelements.length; ispan++) {
  thiselement=spanelements[ispan];
  if (thiselement.id=='wood') {
    woodcount=Number(thiselement.innerHTML);
    woodspeed=Number(thiselement.title);
    //alert(woodspeed)
  }
  if (thiselement.id=='stone') {
    stonecount=Number(thiselement.innerHTML);
    stonespeed=Number(thiselement.title);
  }
  if (thiselement.id=='iron') {
    ironcount=Number(thiselement.innerHTML);
    ironspeed=Number(thiselement.title);
  }
  
}
td=document.getElementsByTagName('td');
for (j=0; j<td.length; j++) {

  thistd=td[j];
  
  // tady se zkusi porovnat potrebne mnozstvi surovin

  imgtxt=/holz[.]png/;
    if ((imgtxt.test(thistd.innerHTML)) && (cislonakonci.test(thistd.innerHTML))) {

      var ccislo=thistd.innerHTML.match(cislonakonci)
      tcurcount=ccislo[0];
      var curcount=Number(tcurcount);
      var staci=woodcount-curcount;
      if(staci<0) {
        var tcas=txtcas(Math.round(((curcount-woodcount)/woodspeed)*60));
        thistd.className="warn";
        thistd.innerHTML+="<br><i>"+tcas+"</i>";
      }
    }
  
  imgtxt=/lehm[.]png/;
    if ((imgtxt.test(thistd.innerHTML)) && (cislonakonci.test(thistd.innerHTML))) {

      var ccislo=thistd.innerHTML.match(cislonakonci)
      tcurcount=ccislo[0];
      var curcount=Number(tcurcount);
      var staci=stonecount-curcount;
      if(staci<0) {
        var tcas=txtcas(Math.round(((curcount-stonecount)/stonespeed)*60));
        thistd.className="warn"
        thistd.innerHTML+="<br><i>"+tcas+"</i>";
      }
    }
  
  imgtxt=/eisen[.]png/;
    if ((imgtxt.test(thistd.innerHTML)) && (cislonakonci.test(thistd.innerHTML))) {

      var ccislo=thistd.innerHTML.match(cislonakonci)
      tcurcount=ccislo[0];
      var curcount=Number(tcurcount);
      var staci=ironcount-curcount;
      if(staci<0) {
        var tcas=txtcas(Math.round(((curcount-ironcount)/ironspeed)*60));
        thistd.className="warn"
        thistd.innerHTML+="<br><i>"+tcas+"</i>";
      }
    }
  
  
  txt="";
  txt=td[j].innerHTML;
  if ((vzor.test(txt)) && (!(vzor2.test(txt)))) {
    vyber=txt.match(vzor);
    sour=vyber[0].split('|');
    if (prvni==1) {
      pocx=sour[0];
      pocy=sour[1];
      prvni=0;
      //td[j].innerHTML+= ' '+pocx;
    }
    else {
      konx=sour[0];
      kony=sour[1];
      dx=(konx-pocx);
      dy=(kony-pocy);
      vzdal=Math.sqrt((dx*dx)+(dy*dy));
      vzdal=(Math.round(vzdal*10))/10;
      if (vzdal>0) {
        td[j].innerHTML+= '<br><i>'+vzdal+' polí</i>';
        for (poradi=0; poradi<jednotka_pocitat.length; poradi++) {
          if (jednotka_pocitat[poradi]==1) {
            jedncas=txtcas(Math.round(vzdal*jednotka_rychlost[poradi]));
            td[j].innerHTML+= '<br><i>'+jednotka_zkratka[poradi]+': '+jedncas+'</i>';
          }
        }
      }
    }
  }
}


function txtcas(minuty) {
  var hodiny=Math.floor(minuty/60);
  minuty-=(hodiny*60);
  minuty=""+minuty;
  //var txt_cas=""+hodiny+"&loz;"
  var txt_cas=""+hodiny+"<sup>h</sup>"
  if (minuty.length<2) {
    txt_cas=txt_cas.concat('0');
  }
  txt_cas=txt_cas.concat(minuty);
  txt_cas=txt_cas.concat('<sup>m</sup>');
  return txt_cas;
}


//if (vzor.test(titulek.innerhtml)==true)

  

// ==UserScript==
// @name           HAC naplata - Izracun vremena
// @namespace      frenky.nn@gmail.com
// @description    HAC naplata - Izracun vremena
// @include        https://prodaja.hac.hr/naplata/ispis_det_datum.jsp
// ==/UserScript==

var DEBUG = false;
var total_drive_time=0;

//ovo ce nam vratiti datum iz dva vektora [godina,mjesec,dan] [sati,minute]
window.getDateFromDtm=function(date, time){
  var year=date[2];
  var month=date[1]-1;
  var day=date[0];

  var hour=time[0];
  var min=time[1];

  var dtm= new Date();
  dtm.setFullYear(year);
  dtm.setMonth(month);
  dtm.setDate(day);

  dtm.setHours(hour);
  dtm.setMinutes(min);
  dtm.setSeconds(0);
  dtm.setMilliseconds(0);
  if (DEBUG){
    GM_log(dtm);
  }
  return dtm;
}

window.hacDodajVrijeme=function(){
  //Prvo nadjemo definiciju tablice
  var thElemets = document.getElementsByTagName("th");
  index=thElemets.length-1;
  if (DEBUG){
    GM_log(index+"***: '"+thElemets[index].firstChild.nodeValue+"'");
    GM_log(index+': '+thElemets[index].parentNode);
  }
  //Pa kreiramo svoju kolumnu
  var newRow = document.createElement("TH");
  newRow.className="pozadina-crvena";
  newRow.innerHTML="Trajanje puta";
  newRow.align="center";
  thElemets[index].parentNode.appendChild(newRow);
  if (DEBUG){
    GM_log(index+": '"+thElemets[index].firstChild.nodeValue+"'");
  }

  //I onda nadjemo sve redove u toj tablici i ovisno o sadrzaju dodajemo
  //svoj sadrzaj
  var trElemets = document.getElementsByTagName("tr");
  if (DEBUG){
    GM_log(trElemets.length);
  }
  for (var i=0;i<trElemets.length;i++){
    //Od svakog reda nadjemo pojedine celije
    var tdElemets = trElemets[i].getElementsByTagName("td");
    try{
      if (DEBUG){
        GM_log("+++++"+tdElemets.length);
      }
      //uzimam samo celije od redova koji imaju duzinu 11
      //jer me samo oni zanimaju kad racunam vrijeme
      if (tdElemets.length==11){
        if (DEBUG){
          for (var j=0;j<tdElemets.length;j++){
            GM_log(j+"***"+tdElemets[j].firstChild.nodeValue);
            GM_log(j+"***"+tdElemets[j].className);
          }
        }

        var datum_ulaska = tdElemets[3].firstChild.nodeValue.split(".");
        var vrijeme_ulaska = tdElemets[4].firstChild.nodeValue.split(":");

        var datum_izlaska = tdElemets[5].firstChild.nodeValue.split(".");
        var vrijeme_izlaska = tdElemets[6].firstChild.nodeValue.split(":");

        var dtm_start=getDateFromDtm(datum_ulaska,vrijeme_ulaska);
        var dtm_end=getDateFromDtm(datum_izlaska,vrijeme_izlaska);

        var drive_time=(dtm_end.getTime() - dtm_start.getTime())/60000;

        var newRow = document.createElement("TD");
        newRow.className=tdElemets[0].className;
        newRow.align="right";
        //Ovo sam mogao izvaditi iz trenutnog if-a, no ovako je manje kôda :)
        if (tdElemets[0].className == "slova-plava"){
          newRow.innerHTML="&nbsp;";
          trElemets[i].appendChild(newRow);
        }else{
          newRow.innerHTML=drive_time+" min";
          total_drive_time=total_drive_time+drive_time;
          trElemets[i].appendChild(newRow);
          if (DEBUG){
            GM_log("Total time:"+total_drive_time);
          }
        }
      //ako element ima klasu "verdana11Bold" onda je to neki "Zbroj prometa" dio, pa cemo
      //mi tu takodjer dodati svoju zavrsnu sumu.
      }else if (tdElemets[0].className == "verdana11Bold"){
        if (DEBUG){
            GM_log("Zakljucno - Total time:"+total_drive_time);
        }
        newRow.className=tdElemets[0].className;
        newRow.align="right";
        if (total_drive_time>60){
          var sati=Math.floor(total_drive_time/60);
          var minute=total_drive_time-sati*60;
          newRow.innerHTML=sati+"h " + minute +"min";
        }else{
          newRow.innerHTML=total_drive_time+" min";
        }
        trElemets[i].appendChild(newRow);
      }
    }catch(err){
      if (DEBUG){
        GM_log("ERROR:"+err);
      }
    }
  }
}

hacDodajVrijeme();

// ==UserScript==
// @name        casy do rozvrhu
// @namespace   whatever
// @description Přidá časy hodin do rozvrhu v systému KOS.
// @include     https://kos.is.cvut.cz/kos/* 
// @include     file:///C:/MYSELF/Programing/webprograming/rozvrhfel.htm
// @version     1
// ==/UserScript==

var path = "/html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td/table/tbody";
var jmeno_path = "/html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr/td[5]"; 
var tisk_path = "/html/body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[7]/td";
var casy =  ["7:30 - 9:00","9:15 - 10:45","11:00 - 12:30","12:45 - 14:15","14:30 - 16:00","16:15 - 17:45","18:00 - 19:30", "20:30"];
var casy2 = [
["7:30", "8:15"],
["8:15", "9:00"],
["9:15", "10:00"],
["10:00", "10:45"],
["11:00", "11:45"],
["11:45", "12:30"],
["12:45", "13:30"],
["13:30", "14:15"],
["14:30", "15:15"],
["15:15", "16:00"],
["16:15", "17:00"],
["17:00", "17:45"],
["18:00", "18:45"],
["19:00", "19:30"],
["19:30", "20:30"]];
/*
  Vygeneruje radek obsahujici casy v poli casy
  
  */  
function generujRadekCasu() {
  var radek = document.createElement("tr");
  //Nadpis vlevo
  var nadpis = document.createElement("th");
  nadpis.style.backgroundColor = "#336699";
  nadpis.style.color = "white";
  nadpis.innerHTML = "Čas";
  radek.appendChild(nadpis);
  
  //Pridat casy    
  for(var i=0; i<casy2.length; i++) {
    var td = document.createElement("td");
    td.innerHTML = casy2[i].join(" - ");
    td.style.textAlign = "center";
    
    td.style.fontWeight = "bold";
    td.style.backgroundColor = "#99CCFF";

    radek.appendChild(td);
  }
  return radek;
}

window.TABULKA_ROZVRHU = null;
window.addEventListener("load", function() {
  //Najdu tabulku
  if(TABULKA_ROZVRHU==null)
    TABULKA_ROZVRHU = getElementByXpath(path);
  if(TABULKA_ROZVRHU==null) {
    //Zkusit to bez tbody???
    return;
  }
  //debug
    //console.log(TABULKA_ROZVRHU);
  //Odebrat puvodni radek casu
  TABULKA_ROZVRHU.removeChild(TABULKA_ROZVRHU.parentNode.rows[1]);
  //Pridam novy radek na radek 2
  
  TABULKA_ROZVRHU.insertBefore(generujRadekCasu(), TABULKA_ROZVRHU.parentNode.rows[1]);
  
  
  /*BONUS*/
  //Bublinky pri hover
  for(var i=2; i<TABULKA_ROZVRHU.rows.length; i++) {
    //Prvni sloupec je den
    for(var j=1; j<TABULKA_ROZVRHU.rows[i].cells.length; j++) {
      if(TABULKA_ROZVRHU.rows[i].cells[j].title!=""&&TABULKA_ROZVRHU.rows[i].cells[j].title!=null) {
        //Nastaveni bublinky
        pridejBublinku(TABULKA_ROZVRHU.rows[i].cells[j]);
      }
    }
  }
  /*EXPORT TABULKY*/
  var button = document.createElement("input");
  button.onclick = (function() {window.exportujRozvrh();}).bind(window);
  button.value = "Exportovat rozvrh";
  button.type = "button";
  getElementByXpath(tisk_path).appendChild(button);
  
  
  /**ZOBRAZENI AKTUALNI HODINY **/
  casovac(TABULKA_ROZVRHU.parentNode);
  function casovac(table) {
    //Pocet radek ktere neobsahuji rozvrh
    const row_padding = 2;
    //Pocet sloupcu ktere se preskoci
    const cell_padding = 1;
    //Casy, ukladaji se pro detekci vyznamnych zmen
    var day, hr, min, sec;
    //Pozice v poli casu
    var timepos = 0;
    //Rozmezi casu pro vypocet procent
    var range = [0,0];
    //Elementy ktere se zrovna pouzivaji
    var tr, td;
    //Reference na this
    var _this = this;
    //Vytvori css selektory pro tridu
    assignStyles();
    //Spusti debug, sama se inicializuje volanim debug funkci
    var debug = false;
    
    //Rychlost obnovovani casu
    this.speed = 1000;
    //Updatne casy, pokud se nejaky (vyznamne) zmenil, pusti event
    //paremetr funguje jen pri debug - vynuti skok v case o sekundy
    this.updateTime = function(seconds) { 
      
      var nday,nhr,nmin,nsec;
      
      if(!debug) {
        var datetime = new Date();//new Date();
        nday = datetime.getDay()-1; //nedele: -1, pondeli:0, patek: 4
        nhr = datetime.getHours();
        nmin = datetime.getMinutes();  
        nsec = datetime.getSeconds();  
      }
      else {
        fakeTime(seconds==null?1:seconds);
      }
      
      if(nday<5&&nday>=0) {
        //Detekce zmen
        if(nday!==day) {
          day = nday;
          hr = nhr;
          min = nmin;
          sec = nsec;
          onDayChange();
        }
        
        if(nhr!=hr||nmin!=min||nsec!=sec) {
          hr = nhr;
          min = nmin;
          sec = nsec;
          onTimeChange(); 
        } 
      }
      else
        console.log(nday);
      //Znova spustit timeout
      if(!debug)
        setTimeout(function() {updateTime();}, _this.speed);
       
      function fakeTime(step) {
        if(step==null)
          step = 5*60;
        if(day==null) {
          nday = 0;
          nhr = 7;
          nmin = 30;
          nsec = 0;
        }
        else {
          nday = day;
          nhr = hr;
          nmin = min;
          nsec = sec+step;
          if(nsec>59) {
            nsec = nsec%60;
            nmin = min+Math.ceil(nsec/60);
          }
          if(nmin>59) {
            nmin = nmin%60;
            nhr = hr+Math.ceil(nmin/60);
          }
          if(nhr>=20) {
            nhr = 7;
            nmin = 30;
            nday=day+1;                                     
            if(nday>5)
              nday=0;
          }
          console.log("(",nday,") ",nhr,":",nmin,":",nsec);
        }
      }
    }
    //Pri zmene dne
    function onDayChange() {  
      //Zrusit znacku - pokud nejaka je
      clearTimer();
      //radek odpovida cislu dne
      tr = table.rows[day*2+row_padding];  
      console.log(day,tr);
      td = null;
      onHourChange(); 
    }
    //Pri zmene casu - tzn. kontrola kazdou minutu
    function onTimeChange() {
      if(hr*60+min>=range[1]) {
        onHourChange();
      }
      else {
        updateTimer();
      }  
    }
    //Pri zmene (vyucovaci) hodiny
    function onHourChange() {
      clearTimer();
      //casy prevedene na cisla
      var t1,t2;
      //Pozice bunky
      var index = td==null?0:td.cellIndex+1;
      if(tr.cells.length<=index)
        return false;
      //Nalezeni bunky aktualni hodiny
      if(td==null) {
        //Prvni spusteni: Najit bunku odpovidajici nasemu casu
        
        for(var i=0,l=casy2.length; i<l; i++) {
          //Rozdelim casy na hodiny a minuty
          t1 = casy2[i][0].split(":");
          t2 = casy2[i][1].split(":");
          //console.log(t1,t2,[hr,min]);
          //Zjistim, zda se aktualni cas nachazi v intervalu
          if(isTimeBigger(hr, min, 1*t1[0], 1*t1[1]) && isTimeBigger(1*t2[0], 1*t2[1], hr, min)) {
            //Skocim na bunku
            var pos = 0;     //pocet projitych bunek
            var ipos = 0;    //pocet projitych casu
            while(ipos<i) {
              pos++;
              ipos+=1+getSpan(tr.cells[pos+cell_padding]);
            }
            td = tr.cells[pos+cell_padding];
            console.log(td);
            //taky si ulozim pozici v poli casu
            timepos = ipos-getSpan(td); //ipos je pocet hodin pred touhle bunkou, ale vcetne tehle bunky a jejiho poctu, odecitam vsak pouze jeji span, pokud ma bunka span, muzem zacinat uprostred, ale vse se pocita z rozmeru bunky
            //nactu skutecne casove hodnoty
            getTimeVals(td, timepos);        
            console.log(i, ipos, pos, getSpan(td));
            break;
          }
          else
            console.log(hr,min,t1,t2);
        }
        if(td==null) {
          console.error(hr,min,tr, t1, t2);
          throw new Error("No suitable cell was found!");
        }      
      }
      else {
        //Skok o hodinu dale
        timepos++;
        //Skok i o vic, pokud posledni pole zahrnovalo vic hodin
        timepos+=getSpan(td);
        //Preskocit na dalsi bunku, spocitat casy
        td = tr.cells[index];
        getTimeVals(td, timepos);
      }
      //Zapamatovat si puvodni CSS tridu pro pripadne obnoveni
      if(td.oldClassName==null) {
        td.oldClassName = td.className;
        td.className+=" timer";
      }
      //Vykreslit casoznacku
      updateTimer();
    }    
    
    function updateTimer() {
      if(td==null)
        return false;
        
      var current = min+hr*60+sec/60-range[0];
      var percent = (current/(range[1]-range[0]))*100;
      //console.log(current,range,percent);
      //Vynulovat styly
      
      //Prestavky jsou mimo cas!
      if(percent<0) {
        td.style.borderLeft = "1px solid green";
        td.style.backgroundPosition="-10% center";
      }
      else if(percent>100) {
        td.style.borderRight = "1px solid green";
        td.style.backgroundPosition="-10% center";
      }
      else {
        td.style.borderLeft = "";
        td.style.borderRight = "";
        td.style.backgroundPosition=percent+"% center";
      }
    
    }
    //Zjisti casove rozmezi a konecny cas bunky
    function getTimeVals(cell, index) {
        //Zapamatuju si, kdy je treba preskocit na dalsi bunku
        t1 = casy2[index][0].split(":");
        t2 = casy2[index+getSpan(cell)][1].split(":");
          

        //Ulozim si rozmezi pro procenta
        range = [t1[0]*60+1*t1[1], t2[0]*60+1*t2[1]];
        console.log(range);
    }
    //vypocte, zda tabulka zabira vic jak jedno pole
    function getSpan(cell) {
        var span = cell.getAttribute("colspan");
        if(span==null||span==""||span==0) {
          return 0;
        }
        return span-1;
    }
    //odstrani znacku z aktualni bunky
    function clearTimer() {
      if(tr!=null&&td!=null) {
        td.className = td.oldClassName;
        td.style.borderLeft = "";
        td.style.borderRight = "";
        td.style.backgroundPosition = "";
        td.oldClassName = null;
      }  
    }
    function assignStyles() {
      if(window.blblblblstylealreadyassigned)
        return;
      var styletext = "td.timer {background-repeat:repeat-y;"+
                  "background-image: url('data:image/gif;base64,R0lGODlhAQABAIABAP8AAP///yH+CFBJWEVMISEhACwAAAAAAQABAAACAkQBADs=');}";
      var head = document.head,
      style = document.createElement('style');
      
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = styletext;
      } else {
        style.appendChild(document.createTextNode(styletext));
      }
      
      head.appendChild(style);
      window.blblblblstylealreadyassigned = true;
    }
    function isTimeBigger(h1,m1,h2,m2) {
      return h1>h2||(h1==h2&&m1>=m2);
    
    }
    /**TADY SE SPUSTI NEKONECNY INTERVAL **/
    var clock = setTimeout(function() {updateTime();}, this.speed);
    window.step = function(seconds) {
      debug = true;
      updateTime(seconds);
    }          
    window.changespeed = function(speed) {
      _this.speed = speed;
    }
  }
});
function pridejBublinku(bunka) {
  var text = bunka.title;
  text = text.replace(/ +\- +/g, "<br />");
  text = text.replace(/\[([^\]:]+):([^\]]+)\]/g, "<span style=\"font-weight: bold\">$1: </span>$2");
  text = text.replace(/(\( ?kolize ?\))/gi, "<div style=\"font-weight: bold; color: red;\">(KOLIZE)</div>");
  assignTooltip(bunka, text, true);
  //bunka.title = '';
  //Zmena css
  bunka.style.cursor="pointer"; 
}


window.exportujRozvrh = function() {
  //Prazdna zalozka/okno
  var okno = window.open(); 
  //Okno nevyskoci pokud tato funkce neni volana z onclick eventu
  if(okno==null)
    alert("Vypni popup blocker.");
  if(TABULKA_ROZVRHU==null) {
    alert("Nepovedlo se identifikovat tabulku s rozvrhem.");
    okno.close();  
  }
  //Zacit psat do dokumentu
  okno.document.open();
  okno.document.write("<!DOCTYPE html><html>\n<head>\n<title>"+getElementByXpath(jmeno_path).innerHTML+" - Rozvrh hodin</title>\n<meta charset=\"utf-8\" />");
  okno.document.write("<style type=\"text/css\">\n");
  okno.document.write("* {font-family: \"Helvetica\",\"Arial\",sans-serif;font-size: 11px;}\n");
  okno.document.write(".ttHeader {background-color: #336699;color: #FFFFFF;height: 19px;text-align: center;font-weight: bold}\n");
  okno.document.write(".ttKolize {background-color:#CC0033;color:#FFFFFF;font-size:10px;height:38px;text-align:center;}\n");
  okno.document.write(".ttCviceni {background-color:#CCC;color:#000;font-size:10px;height:38px;text-align:center;}\n");
  okno.document.write(".ttPrednaska {background-color:#CCDDEE;color:#000;font-size:10px;height:38px;text-align:center;}\n");
  okno.document.write(".ttDays {background-color: #336699;color: #FFFFFF;font-size: 11px;text-align: center;}\n");
  okno.document.write("</style>\n");
  okno.document.write("</head>\n");
  okno.document.write("<body>\n");
  okno.document.write("<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"1\" id=\"tabulka\">\n");
  okno.document.write(TABULKA_ROZVRHU.innerHTML);
  okno.document.write("</table>\n");
  okno.document.write("<div id=\"tooltip\" style=\"position: absolute; background-color: rgba(0, 0, 0, 0.8); border: 1px solid black; color: white; min-width: 100px; min-height: 40px; z-index: 9999999; display: none; top: 500px; left: 748px;\"></div>\n");
  okno.document.write("<script type=\"text-javascript\">\n");
  okno.document.write("var tooltip = document.getElementById(\"tooltip\");\n");
  okno.document.write(showTooltip.toString()+'\n');
  okno.document.write(assignTooltip.toString()+'\n');
  okno.document.write(pridejBublinku.toString()+'\n');
  okno.document.write("</script>\n");
  
  okno.document.write("</body></html>");  
  okno.document.close();
  console.log(okno); 
  var tbl = okno.document.getElementById("tabulka");
  for(var i=2; i<tbl.rows.length; i++) {
    //Prvni sloupec je den
    for(var j=1; j<tbl.rows[i].cells.length; j++) {
      tbl.rows[i].cells[j].onclick = null;
      tbl.rows[i].cells[j].setAttribute("onclick", "");
      if(tbl.rows[i].cells[j].title!=""&&tbl.rows[i].cells[j].title!=null) {
        //Nastaveni bublinky
        pridejBublinku(tbl.rows[i].cells[j]);
      }
    }
  }  
  
}


//Zobrazi bublinku - potrebuje to vyladit jak esteticky tak programove
var tooltip = document.createElement("div");
//tooltip.style.position = "fixed";
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "rgba(0,0,0,0.8)";
tooltip.style.border = "1px solid black";
tooltip.style.color = "white";
tooltip.style.minWidth = "100px";
tooltip.style.minHeight = "40px";
tooltip.style.zIndex = "9999999";
tooltip.style.display = "none";

tooltip.innerHTML = "Tooltip";
document.body.appendChild(tooltip);
function assignTooltip(element, callback, cache) {
    element.tooltipEvents = {
      "move": function(event){showTooltip(event, cache?this.cachedTooltip:(typeof callback=="string"?callback:callback(element)))},
      "in":   function(event){this.cachedTooltip=(typeof callback=="string"?callback:callback(element))},
      "out":  function(event){tooltip.style.display="none";}
    
    }
    //Nahrada za addEventListener:
    element.onmousemove = element.tooltipEvents.move;
    element.onmouseout = element.tooltipEvents.out;
    
    //element.setAttribute("onmouseout", element.tooltipEvents.out.toString());
    if(cache==true) {
      element.cachedTooltip=(typeof callback=="string"?callback:callback(element));
      element.onmouseover = element.tooltipEvents['in'];
    }
}
function showTooltip(event, content) {
   var x, y;
   if (document.all!=null) { // grab the x-y pos.s if browser is IE
      x = event.clientX + document.body.scrollLeft;
      y = event.clientY + document.body.scrollTop;
   }
   else {  // grab the x-y pos.s if browser is NS
      x = event.pageX;
      y = event.pageY;
   }  
   tooltip.innerHTML = content;
   tooltip.style.top = (y*1+10)+"px";
   tooltip.style.left = (x*1+8)+"px";
   //console.log("Tooltip at ["+tooltip.style.top+", "+tooltip.style.left+"].");
   //console.log(tooltip);
   if(tooltip.style.display!="block") {
     tooltip.style.display = "block";
   }
}
//Elm by xpath
//http://stackoverflow.com/questions/10596417/is-there-a-way-to-get-element-by-xpath-in-javascript
function getElementByXpath(path) {
    return document.evaluate(path, document, null, 9, null).singleNodeValue;
};
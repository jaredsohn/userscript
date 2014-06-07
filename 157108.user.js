// ==UserScript==
// @name        ISAS Prumerator
// @namespace   cz.bkralik
// @description Pocita prumery v ISASu zshk.cz
// @include     http://isas.zshk.cz/prubezna-klasifikace.php?zobraz=predmety
// @include     http://isas.zshk.cz/prubezna-klasifikace.php?pololeti=*&zobraz=predmety
// @match       http://isas.zshk.cz/prubezna-klasifikace.php?zobraz=predmety
// @match       http://isas.zshk.cz/prubezna-klasifikace.php?pololeti=*&zobraz=predmety
// @version     1.3.2
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.

  var suma = 0;
  var pocet = 0;
  var sudy = false;
  jQ('table.isas-tabulka > tbody').append('<tr><td colspan="6"><hr></td></tr>');
  jQ('table.isas-tabulka > tbody > tr[class!="zahlavi"]').each(function() {
    var trbunka = jQ(this);

    if(trbunka.find("hr").length !== 0)
    {
      if(pocet!=0)
      {
        var prumer = Math.round(10*suma/pocet)/10;
        trbunka.before('<tr class="'+((sudy)? "sudy" : "lichy")+'"><td colspan="6"><b>prumer: '+prumer+'</b> (soucet: '+suma+', pocet: '+pocet+')</td></tr>');
        sudy=!sudy;
      }
      suma = 0;
      pocet = 0;
      
    }
    else
    {
      var tdbunky = trbunka.find("td") 
      if((tdbunky.length !== 0) && (tdbunky[2].innerHTML.indexOf('N', 0)===-1) && !isNaN(tdbunky[2].innerHTML))
      {  //mame td, budeme parsovat
        var mocnost = 1;
        if(tdbunky[3].innerHTML.indexOf('hou dv', 0)!==-1)
          mocnost=2;          
        if(tdbunky[3].innerHTML.indexOf('hou t', 0)!==-1)
          mocnost=3;
          
        var znamka = parseInt(tdbunky[2].innerHTML);

        suma = suma + znamka*mocnost;
        pocet = pocet + mocnost;
      }
    }
    trbunka.removeClass("sudy lichy") 
    trbunka.toggleClass("lichy", !sudy);
    trbunka.toggleClass("sudy", sudy);
    sudy=!sudy;
  });
  var paticka = jQ('#stranka > tbody > tr > td.zapati');
  paticka.html(paticka.html()+'     |     <b>Prumerator</b> script v1.3.2 by <a href="mailto:bkralik@bkralik.cz">bkralik</a>');
}

// load jQuery and execute the main function
addJQuery(main);
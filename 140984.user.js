// ==UserScript==
// @name           Fritz!Box GesprÃ¤chskosten
// @namespace      wktools.net
// @include        http://fritz.box/cgi-bin*pagename=foncalls*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var monate=[0,"Januar", "Februar", "Maerz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
$(document).ready(function () {
	minutenpreis=22; // Preis in Cent
  window.setTimeout(function(){
    gesPreis=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    monat=(new Date()).getMonth()+1;
    jahr=(new Date()).getYear()-100;
//alert(jahr)
    $('#tClient tr').each(function(){
      if($(this).children(".c6").length){
        nextTd=$(this).children(".c6")[0];
        text="Preis";
        type="th";
      }else{
        nextTd=$(this).children(".c6a")[0];
        text="0ct";
        if($(this).hasClass("in") && $(this).hasClass("failed")){
          datum=$(this).children(".c3").children().children()[0].title.split(".");
          console.log(datum);
          zeileMonat=parseInt(datum[1]);
          zeileJahr=datum[2].split(" ")[0];
          nummer=$(this).children(".c8").children().children()[0].title.split(" ");
          nummer=nummer[nummer.length-1];
//          console.log(nummer);
          minuten=$(nextTd).children().children()[0].title;
//          minuten.css("font-weight", "bold");
          if(minuten!="0:00" && nummer.match(/^01[^8]\d+/)){
	    minuten=minuten.split(":");
	    minuten=parseInt(minuten[0])*60 + parseInt(minuten[1]);
            preis=minuten*minutenpreis;
            text=preis+"ct";
            if(zeileMonat<=monat && zeileJahr==jahr || zeileMonat>=monat && zeileJahr==jahr-1){
              gesPreis[zeileMonat]+=preis;
//console.log(zeileMonat, gesPreis[zeileMonat], preis);
              text+=".";
            }
          }
        }
        type="td";
      }
      td=document.createElement(type);
      td.appendChild(document.createTextNode(text));
      td.style.backgroundColor=nextTd.style.backgroundColor;
      this.insertBefore(td, nextTd);      
    })
    text="";
    for(i=monat,j=0;j<12;i--,j++){
      if(!gesPreis[i])continue;
//alert(monate[i]+": "+gesPreis[i]/100+" EUR\n");

      text+=monate[i]+": "+gesPreis[i]/100+" EUR\n";
      if(i==1)i=13;
    }
    alert(text);
  }, 5000);
});

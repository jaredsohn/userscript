// ==UserScript==
// @name           Beursig.nl
// @namespace      kasperfish
// @include        http://www.beursig.nl/forum/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

///////////////////////////////////////////////INSTELLINGEN///////////////////////////////////////////////////////////////////////////////////
//Pas hieronder de lijst aan met de aandelen die u in een bepaalde kleur wilt weergeven op het forum van Beursig.nl. 
//Vul de lijst aan volgens dit patroon "naam1" : "htmlkleur1", "naam2" : "htmlkleur2" . Het is het gemakkelijkst als u voor elk aandeel 
//een nieuwe regel gebruikt. Vergeet de comma's tussen de aandelen niet!
//De naam van het aandeel moet exact hetzelfde zijn zoals het is weergegeven op het forum van Beursig.nl. Op volgende website kunt u eenvoudig
//HTML kleuren selecteren http://html-color-codes.info/
//U kunt zo elk aandeel dat u bezit een andere kleur geven of u kunt aandelen groeperen per sector. 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var myStockandColors={

"Ageas":"#E1F5A9",
"KBC Group":"#D8F6CE",
"Nyrstar":"#E3CEF6",
"Bekaert":"#E3CEF6",
"Mobistar":"#F6CED8"

};
var ads=1; //0: er wordt geen reclame getoond; 1: er wordt reclame getoond

//Hieronder niets veranderen tenzij je weet waar je mee bezig bent
if(!ads){
$("#page-body center").html("adds removed by userscript");
$(".row1").html("");}
  for (key in myStockandColors){
  $("li:contains('" + key + "')").css({'background-color': myStockandColors[key]});
  }


 $('ul.linklist.rightside').prepend('<li class="icon-bump" id="toggle_index"><a  href="#">Indices</a> </li>');
$('#toggle_index').click(function() {
$(koersen).toggle();
}); 

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.beursduivel.be/",
  onload: function(response) {
    beursduivelText=response.responseText;
    koersen=$(beursduivelText).find("div.panel.table.indices").css({ position:'absolute',top:'5px',left:'5px',background:'#CEE3F6',display:'none', border:'1px solid black'});
    $(koersen).find("table").css({float:'left',padding:'10px'});
    $(koersen).find(".neg").css({color:'red'});
    $(koersen).find(".pos").css({color:'green'});
    $(koersen).find("td").css({'text-align': 'right','padding-right':'5px'});
    $('body').prepend(koersen);

  }
});
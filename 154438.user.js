// ==UserScript==
// @name        UpdateOProjekt
// @namespace   Sarxes
// @include     http://*.ogame.de/game/index.php?page=resourceSettings*
// @include     http://*.oprojekt.net/index.php?show=mines*
// ==/UserScript==

const URL = document.URL;

function trim(s) { return s ? s.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : ""; }

// OGame-Daten auslesen
if(URL.search(/resourceSettings/) != -1) {
  
  // Planeten-IDs
  var planetenids = new Array();
  var planetList = document.getElementById('planetList');
  var divs = planetList.getElementsByTagName('div');
  for(var i=0; i<divs.length; i++) 
    if(divs[i].getAttribute('class') == "smallplanet") 
      planetenids.push( divs[i].getAttribute('id').split('-')[1] );
 
  // Stammdaten
  var universum = document.getElementsByTagName('title')[0].innerHTML.split(' ')[0];
  var playerid = document.getElementsByName('ogame-player-id')[0].getAttribute('content');
  var username = document.getElementsByName('ogame-player-name')[0].getAttribute('content');  
  var planetid = document.getElementsByName('ogame-planet-id')[0].getAttribute('content');
  var planetname = document.getElementsByName('ogame-planet-name')[0].getAttribute('content');
               
  var planettemp = 0; 
  for(var i=0; i<divs.length; i++) 
    if(divs[i].getAttribute('class') == "smallplanet") 
      if(divs[i].getAttribute('id').split('-')[1] == planetid) {
        var tooltip = divs[i].getElementsByTagName('a')[0].getAttribute('title');
        planettemp = parseInt(trim(tooltip.split('°C')[1]).split(' ')[1]);
      }
    
  // Planeten-Details
  var inhalt = document.getElementById('inhalt');
  var trs = inhalt.getElementsByTagName('table')[0].getElementsByTagName('tr');
  var MetSt = KriSt = DeuSt = FkwSt = Plasma = MetPro = KriPro = DeuPro = FkwPro = Geol = 0;
  
  var imgs = inhalt.getElementsByTagName('img');
  if(imgs.length > 0)
    Geol = parseInt(imgs[0].getAttribute('title').split('%')[0].split('+')[1]);
  
  for(var i=0; i<trs.length; i++) {
    var tds = trs[i].getElementsByTagName('td');
    if(tds.length > 6) {
      var label = tds[0].innerHTML;
      var selects = tds[6].getElementsByTagName('select'); 
      
      var stufe = parseInt(trim(label.split('Stufe')[1]).split(')')[0]);
      var prozent = selects.length > 0 ? parseInt(selects[0].value) : 0;
      
      if(trim(label).split(' ')[0] == "Metallmine")               { MetSt = stufe;  MetPro = prozent; }
      if(trim(label).split(' ')[0] == "Kristallmine")             { KriSt = stufe;  KriPro = prozent; }
      if(trim(label).split(' ')[0] == "Deuterium-Synthetisierer") { DeuSt = stufe;  DeuPro = prozent; }
      if(trim(label).split(' ')[0] == "Fusionskraftwerk")         { FkwSt = stufe;  FkwPro = prozent; }
      if(trim(label).split(' ')[0] == "Plasmatechnik")            { Plasma = stufe; }
    }
  }
  
  // Daten speichern                                                   
  var planetdaten = '';
  planetdaten += planetname + ';' + planettemp;
  planetdaten += ';' + MetSt + ';' + MetPro;
  planetdaten += ';' + KriSt + ';' + KriPro;
  planetdaten += ';' + DeuSt + ';' + DeuPro;
  planetdaten += ';' + FkwSt + ';' + FkwPro;
  
  GM_setValue("index_"+universum+"_"+username, playerid);
  GM_setValue(universum+"_"+playerid+"_username", username);
  GM_setValue(universum+"_"+playerid+"_planets", planetenids.join(';'));
  GM_setValue(universum+"_"+playerid+"_plasma", Plasma);
  GM_setValue(universum+"_"+playerid+"_geologe", Geol);
  GM_setValue(universum+"_"+playerid+"_planet"+planetid, planetdaten);
  
}

// Daten eintragen
if(URL.search(/oprojekt/) != -1) {

  var username = "";
  var myForm = null;
  var articles = document.getElementsByTagName('article');
  
  if(articles.length > 0) {
  
    // Username auslesen
    for(var i=0; i<articles.length; i++) {
      var forms = articles[i].getElementsByTagName('form'); 
      if(forms.length > 0 && forms[0].getAttribute('id') == "myForm") {
        var h3 = articles[i].getElementsByTagName('h3')[0];
        username = h3.innerHTML;
        myForm = forms[0];
      }
    }
    
    // Universum auslesen
    var universum = null;
    var tables = myForm.getElementsByTagName('table');
    var selects_table2 = tables[2].getElementsByTagName('select'); 
    if(selects_table2.length == 1) {
      universum = trim(tables[2].getElementsByTagName('td')[3].innerHTML);
    }
    
    // Player & damit Daten gespeichert?
    var playerid = 0;
    if(universum) playerid = GM_getValue("index_"+universum+"_"+username,0);
        
    if(playerid > 0) {
    
      // Daten laden
      var prefix = universum+"_"+playerid+"_";
      var planetids = GM_getValue(prefix+"planets","").split(';');
      
      var PlaName = new Array();  var PlaTemp = new Array();
      var MetSt = new Array();    var MetPro = new Array();
      var KriSt = new Array();    var KriPro = new Array();
      var DeuSt = new Array();    var DeuPro = new Array();
      var FkwSt = new Array();    var FkwPro = new Array();
      
      for(var i=0; i<planetids.length; i++) {
        var daten = GM_getValue(prefix+"planet"+planetids[i],";;;0;;0;;0;;0").split(';');
        PlaName.push(daten[0]);   PlaTemp.push(daten[1]);
        MetSt.push(daten[2]);     MetPro.push(daten[3]);
        KriSt.push(daten[4]);     KriPro.push(daten[5]);
        DeuSt.push(daten[6]);     DeuPro.push(daten[7]);
        FkwSt.push(daten[8]);     FkwPro.push(daten[9]);
      } 
      var geologe = GM_getValue(prefix+"geologe",0);
      var plasma  = GM_getValue(prefix+"plasma",0);
      
      var styleNoChange = "border:1px gray solid;";
      var styleWithChange = "border:1px orange solid;";
    
      // Minen-Tabelle
      var trs = tables[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      for(var i=0; i<trs.length; i++) {
        var inputs  = trs[i].getElementsByTagName('input');
        var selects = trs[i].getElementsByTagName('select');
        if( i < planetids.length ) {
        
          inputs[0].setAttribute("style",  ( inputs[0].value==PlaName[i] ? styleNoChange : styleWithChange ) );
          inputs[1].setAttribute("style",  ( inputs[1].value==MetSt[i]   ? styleNoChange : styleWithChange ) );
          inputs[2].setAttribute("style",  ( inputs[2].value==KriSt[i]   ? styleNoChange : styleWithChange ) );
          inputs[3].setAttribute("style",  ( inputs[3].value==DeuSt[i]   ? styleNoChange : styleWithChange ) );
          inputs[4].setAttribute("style",  ( inputs[4].value==FkwSt[i]   ? styleNoChange : styleWithChange ) );
          inputs[5].setAttribute("style",  ( inputs[5].value==PlaTemp[i] ? styleNoChange : styleWithChange ) );
          selects[0].setAttribute("style", ( selects[0].value==MetPro[i] ? styleNoChange : styleWithChange ) );
          selects[1].setAttribute("style", ( selects[1].value==KriPro[i] ? styleNoChange : styleWithChange ) );
          selects[2].setAttribute("style", ( selects[2].value==DeuPro[i] ? styleNoChange : styleWithChange ) );
          selects[3].setAttribute("style", ( selects[3].value==FkwPro[i] ? styleNoChange : styleWithChange ) );
          
          inputs[0].value  = PlaName[i];    inputs[1].value  = MetSt[i];
          inputs[2].value  = KriSt[i];      inputs[3].value  = DeuSt[i]; 
          inputs[4].value  = FkwSt[i];      inputs[5].value  = PlaTemp[i];
          selects[0].value = MetPro[i];     selects[1].value = KriPro[i];
          selects[2].value = DeuPro[i];     selects[3].value = FkwPro[i];
          
        } else {                                              
        
          inputs[0].setAttribute("style",styleNoChange);  inputs[1].setAttribute("style",styleNoChange);
          inputs[2].setAttribute("style",styleNoChange);  inputs[3].setAttribute("style",styleNoChange);
          inputs[4].setAttribute("style",styleNoChange);  inputs[5].setAttribute("style",styleNoChange);
          selects[0].setAttribute("style",styleNoChange); selects[1].setAttribute("style",styleNoChange);
          selects[2].setAttribute("style",styleNoChange); selects[3].setAttribute("style",styleNoChange);           
        
          inputs[0].value  = "";    inputs[1].value  = "";
          inputs[2].value  = "";    inputs[3].value  = ""; 
          inputs[4].value  = "";    inputs[5].value  = "";
          selects[0].value = 0;     selects[1].value = 0;
          selects[2].value = 0;     selects[3].value = 0;
        
        }        
      }
      
      // weitere Planeten
      if(trs.length < planetids.length) {
        var morePla = planetids.length - trs.length;
        var newTr = document.createElement("tr");
        var newTd = document.createElement("td");
        newTd.setAttribute('style','color:orange;');
        newTd.setAttribute('colspan','7');       
        newTd.innerHTML = "UpdateOProjekt: Es sind Daten für "+morePla+" weitere"+(morePla>1?"":"n")+" Planet"+(morePla>1?"en":"")+" vorhanden."
            + "<br/>Nach dem Hinzufügen muss 2x auf \"Minen updaten\" geklickt werden.";
        newTr.appendChild(newTd);
        tables[0].appendChild(newTr);      
      }
      
      // Plasmatechnik
      var input = tables[1].getElementsByTagName('input')[0];       
      input.setAttribute("style", ( input.value==plasma ? styleNoChange : styleWithChange ) );
      input.value = plasma;
      
      // Geologe     
      var select = tables[2].getElementsByTagName('select')[0];    
      select.setAttribute("style", ( select.value==geologe ? styleNoChange : styleWithChange ) );
      select.value = geologe;
    
    }
    
  }
  
}
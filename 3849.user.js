// KoL Simulator Link
// version 0.41
// Copyright (c) 2006, bkim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           KoL Simulator Link
// @namespace      http://userscripts.org/scripts/show/3849
// @include        http://cif.rochester.edu/~code/kol/index.html*
// @include        http://cif.rochester.edu.nyud.net:8090/~code/kol/index.html*
// @include        http://localhost:42424/~code/kol/index.html*
// @include        http://www.hardcoreoxygenation.com/Ayvuir/index.html*
// @include        http://sol.kolmafia.us/index.html*
// @description    Version 0.4 provides basic loading of current equipment, passive skills, moons and effects. now with hardcore filter!
// ==/UserScript==

var debug = false;
var localVersion = 0.41;
var namespace = "http://userscripts.org/scripts/source/3849.user.js";


var myHost = "";
var myMethod = 'GET';
var user_agent = 'Mozilla/4.0 (compatible) Greasemonkey';
var accept = 'application/atom+xml,application/xml,text/xml';

var charSheet = "";
var equipSheet = "";
var menuSheet = "";
var charPane = "";
var searchPlayerPane = "";

var charId = "";                  // character ID needed for class retrieval
var slotSelects = new Array();    // list of equipment form inputs, used variously
var skillClasses = new Array();   // list of passive skill forms
var buffGroups = new Array();     // list of buff forms
var lastAcc = new Object();       // last accessory, used due to weird handling by KoL
var invEquipItems = new Array();  // sorted array of normalized inventory items
var bankedSkills = new Array();   // sorted array of normalized skills

var processingComplete = new Array();

buildIntegrationForm();
if(window.location.host != 'localhost:42424'){
  checkForUpdate();
}

document.getElementById('serverURL').addEventListener("change", updateFromServer, false);
document.getElementById('hcequip').addEventListener("click", hardcoreFilter, false);
document.getElementById('hcpassive').addEventListener("click", hardcoreFilter, false);
document.getElementById('hcbuff').addEventListener("click", hardcoreFilter, false);
document.getElementById('hcattack').addEventListener("click", hardcoreFilter, false);



function updateFromServer(){
  myHost = this.value;
  processingComplete = new Array(false,false,false,false);
  
  kolXHR('charsheet.php',         parseCharSheet);  //0
  kolXHR('inventory.php?which=2', parseEquipSheet); //1
  kolXHR('compactmenu.php',       parseMenuSheet);  //2
  kolXHR('charpane.php',          parseCharPane);   //3
  
  document.getElementById('serverURL').selectedIndex = 0;
  statusMessage("loading from <b>"+myHost+"</b>...", false, false);
}

function parseCharSheet(responseDetails){
  charSheet = responseDetails.responseText;
  statusMessage("Character received...", false, true);
  
  updateName();
  updateStats();  
  updateSign();
  updatePath();
  updateSkills();
  updateEffects();
  updateFamiliar();
  
  complete(2);
}

function parseMenuSheet(responseDetails){
  menuSheet = responseDetails.responseText;
  statusMessage("Menu received", false, true);
  
  updateMoons();
  complete(0);
}

function updateMoons(){
  var moonFindRE = /moon\d+\.gif/g;
  var moons = menuSheet.match(moonFindRE);
  if(!  moons){return};
  nrbDebug(moons[0] + "/" + moons[1]);
  while(document.images[0].src.indexOf(moons[0]) < 0 ||
        document.images[1].src.indexOf(moons[1]) < 0 ){
    unsafeWindow.CycleMoon();
  }
}

function parseCharPane(responseDetails){
  charPane = responseDetails.responseText;
  statusMessage("Charpane received", false, true);
  updateMCD();
  complete(3);
}

function parseSearchPlayer(responseDetails){
  searchPlayerPane = responseDetails.responseText;
  statusMessage("Search player received", false, true);
  updateClass();
}


function updateMCD(){
  var mcdFindRE = /(MC|Mind Control).*?\d+/;
  var mcdCleanRE = /.*>/;  
  var formCharacter = document.forms.namedItem("character");
  var mcd = charPane.match(mcdFindRE);
if(!  mcd){return};
  mcd = mcd[0].replace(mcdCleanRE,'');
  selectChange(formCharacter.elements.namedItem("mcd"), mcd);
}

function updateEquipment(){
  var formEquip = document.forms.namedItem("equipment");
  var equipFindRE = /(Hat|Weapon|Off-Hand|Pants|Shirt|Accessory|Familiar):<\/td>.*?(none(?=<\/font>)|<b>[^>]*(?=<\/b>))/g;
  var equipCleanRE = /.*>/;
  
  var equip = equipSheet.match(equipFindRE);
  var currentAcc = 1;
  
if(!  equip){return};
  for(var i = 0; i < equip.length; i++){
    nrbDebug(equip[i].replace(equipCleanRE, ""));
    if(equip[i].indexOf("Hat:") != -1){
      selectChange(slotSelects[0], equip[i].replace(equipCleanRE, ""));
    }else if(equip[i].indexOf("Weapon:") != -1){
      selectChange(slotSelects[1], equip[i].replace(equipCleanRE, ""));
    }else if(equip[i].indexOf("Off-Hand:") != -1){
      selectChange(slotSelects[2], equip[i].replace(equipCleanRE, ""));
    }else if(equip[i].indexOf("Shirt:") != -1){
      selectChange(slotSelects[3], equip[i].replace(equipCleanRE, ""));
    }else if(equip[i].indexOf("Pants:") != -1){
      selectChange(slotSelects[4], equip[i].replace(equipCleanRE, ""));
    }else if(equip[i].indexOf("Accessory:") != -1){
      selectChange(slotSelects[4+currentAcc], equip[i].replace(equipCleanRE, ""));
      currentAcc++;
    }else if(equip[i].indexOf("Familiar:") != -1){
      var feq = equip[i].replace(equipCleanRE, "");
      switch( feq ){
        case "Lead Necklace": case "Tiny nose-bone fetish": break;
        default:
          feq = "Familiar-Specific +5 lbs.";
      }
      selectChange(slotSelects[8], feq);
    }
  }
  
  
  nrbDebug("doing availability");
  var invFindRE = /item\(\d+\)[';]{2}>([^<]|<\/td><td(| valign=top)><b>).+?(?=<)/g;
  var invCleanRE = /.*>/;
  
  var inv = equipSheet.match(invFindRE);
  if(!inv) return;
  for(var i = 0; i < inv.length; i++){
    invEquipItems[i] = normalize(inv[i].replace(/.*>/,""));
  }
  invEquipItems.sort();
  nrbDebug(invEquipItems);
}

function createPublishLinks(){

  for(var i = 0; i < slotSelects.length; i++){
    if(!document.getElementById("publish_"+slotSelects[i].name)){
      newElement = document.createElement('a');
      newElement.innerHTML = '&nbsp;[publish]';
      newElement.href = "#"; 
      newElement.class = "publish";
      newElement.id = "publish_"+slotSelects[i].name;
      newElement.addEventListener("click", publishEquip, false);
      slotSelects[i].parentNode.insertBefore(newElement, slotSelects[i].previousSibling);
    }
  }
}

function inSortedArray(sarray, item){
  var start = 0;
  var end = sarray.length - 1;
  var mid = Math.floor(end/2);
  while((item != sarray[mid]) && (start <= end)){
    if(item < sarray[mid]){
      end = mid - 1;
    }else{
      start = mid + 1;
    }
    mid = start + Math.floor((end-start)/2);
  }
  return item == sarray[mid];
}

function hardcoreFilter(){
  var formEquip = document.forms.namedItem("equipment");
  var tempSelect;
  var hc = this.checked;
  switch(this.id){
    case 'hcequip':
      for(var i = 0; i < slotSelects.length; i++){ // 1; i++){// 
        if(slotSelects[i].name == "familiarequip") continue;
        for(var j = 0; j < slotSelects[i].options.length; j++){
          if(hc){
            if(slotSelects[i].options[j].value != "(None)" &&
              !inSortedArray(invEquipItems, normalize(slotSelects[i].options[j].value) ) ){
              slotSelects[i].options[j].style.visibility = "hidden";
              slotSelects[i].options[j].style.display = "inline";
              slotSelects[i].options[j].style.position = "absolute";
              
            }
          }else{
              slotSelects[i].options[j].style.visibility = "visible";
              slotSelects[i].options[j].style.display = "block";
              slotSelects[i].options[j].style.position = "static";
          }
        }
      }
      break;
    case 'hcpassive':
      var newSpan;
      var c;
      for(i = 0; i < skillClasses.length; i++){
        for(j = 0; j < skillClasses[i].elements.length; j++){
          c = skillClasses[i].elements[j]; //a checkbox
          t = c.nextSibling;               //a text node or a span (if we've been here before)
          b = t.nextSibling;               //a line break
          if(t.nodeName == '#text'){
            newSpan = document.createElement("span");
            newSpan.innerHTML = t.nodeValue;
            skillClasses[i].replaceChild(newSpan, t);
            t = c.nextSibling;
          }
          if(hc && !inSortedArray(bankedSkills, normalize(c.name))){
            c.checked = false;
            c.style.display = "none";
            t.style.display = "none";
            b.style.display = "none";
          }else{
            c.style.display = "inline";
            t.style.display = "inline";
            b.style.display = "inline";
          }
        }
      }
      break; 
    case 'hcbuff':
      var newSpan;
      var c;
      var forceHide;
      for(var i = 0; i < buffGroups.length; i++){
        forceHide = false;
        switch(buffGroups[i].name){
          case 'common': case 'oyster': case 'knoblab': continue;
          case 'reagent':
            if(inSortedArray(bankedSkills, "advancedsaucecrafting")) continue;
            break;
          case 'snowcones':
            if(inSortedArray(bankedSkills, "summonsnowcone")) continue;
            break;
        }
        nrbDebug(buffGroups[i].name+" "+forceHide);
        for(var j = 0; j < buffGroups[i].elements.length; j++){
          if(buffGroups[i].elements[j].name == 'flavour') continue;
          c = buffGroups[i].elements[j]; //a checkbox
          t = c.nextSibling;               //a text node or a span (if we've been here before)
          b = t.nextSibling;               //a line break
          if(t.nodeName == '#text'){
            newSpan = document.createElement("span");
            newSpan.innerHTML = t.nodeValue;
            buffGroups[i].replaceChild(newSpan, t);
            t = c.nextSibling;
          }
          if(forceHide || (hc && !inSortedArray(bankedSkills, normalize(c.name)))){
            c.checked = false;
            c.style.display = "none";
            t.style.display = "none";
            b.style.display = "none";
          }else{
            c.style.display = "inline";
            t.style.display = "inline";
            b.style.display = "inline";
          }
        }
      }
      break;  
    case 'hcattack':
      combatForm = document.forms.namedItem("combatform");
      attMethod = combatForm.elements.namedItem("attackmethod");      
      for(var i = 0; i < attMethod.options.length; i++){
        switch(attMethod.options[i].value){
          case 'Weapon': case 'Spices/Scroll/Tooth': continue;
        }
        if(hc && !inSortedArray(bankedSkills, normalize(attMethod.options[i].value))){          
            attMethod.options[i].style.visibility = "hidden";
            attMethod.options[i].style.display = "inline";
            attMethod.options[i].style.position = "absolute";
        }else{
            attMethod.options[i].style.visibility = "visible";
            attMethod.options[i].style.display = "block";
            attMethod.options[i].style.position = "static";
        }
      }
    break;
  }
}



function parseEquipSheet(responseDetails){
  equipSheet = responseDetails.responseText;
  statusMessage("Equipment received...", false, true);
  var formEquip = document.forms.namedItem("equipment");
  slotSelects = new Array(formEquip.elements.namedItem("hat"),
                          formEquip.elements.namedItem("weapon"),
                          formEquip.elements.namedItem("offhand"),
                          formEquip.elements.namedItem("shirt"),
                          formEquip.elements.namedItem("pants"),
                          formEquip.elements.namedItem("acc1"),
                          formEquip.elements.namedItem("acc2"),
                          formEquip.elements.namedItem("acc3"),
                          formEquip.elements.namedItem("familiarequip")
                          );
  
  updateEquipment();
  createPublishLinks();
  
  complete(1);
}

function publishEquip(){
  var sel = this.nextSibling.nextSibling;
  statusMessage("Equipping <b>"+sel.value+"</b>...", false, false);
  var publishFindRE = new RegExp(">"+sel.value+".*?inv_equip.*?(?=\">)","gi");
  var publishCleanRE = /.*href="/;
  var publish = equipSheet.match(publishFindRE);
  if(publish){
    if(publish[0].indexOf("unequip") == -1 ){
      if(sel.name.indexOf("acc") != -1){
        var accUneqRE = new RegExp("href=\"[^\"]*?unequip[^\"]*?"+sel.name+"[^\"]*(?=\")","gi");
        var toUnequip = equipSheet.match(accUneqRE);
        if(toUnequip){
          statusMessage("Unequipping...", false, false);
          lastAcc = sel;
          GM_xmlhttpRequest({
            method: myMethod, url: myHost+toUnequip[0].replace(publishCleanRE,"")+'&rnd='+Math.random(),
            headers:{'User-agent':user_agent,'Accept': accept,},
            onload: publishAccUnequipCleanup
          });
          return;
        } /* unequip */
      }/* end acc */
      else if(sel.name == "offhand") {/* check for dual wield */
        var dualFindRE = new RegExp(">"+sel.value+".*?dualwield[^\"]*","gi");
        var dualCleanRE = /^.*href="/;
        var dual = equipSheet.match(dualFindRE);
        if(dual){
          GM_xmlhttpRequest({
              method: myMethod, url: myHost+dual[0].replace(dualCleanRE,"")+'&rnd='+Math.random(),
              headers:{'User-agent':user_agent,'Accept': accept,},
              onload: publishEquipCleanup
          });
          return;
        }
      }/* end dual */
      nrbDebug( "updating equip..."); 
      GM_xmlhttpRequest({
          method: myMethod, url: myHost+publish[0].replace(publishCleanRE,"")+'&rnd='+Math.random(),
          headers:{'User-agent':user_agent,'Accept': accept,},
          onload: publishEquipCleanup
      });
    }else{
      statusMessage("You already have the <b>"+sel.value+"</b> equipped.", true, true);
    }
  }else{
    statusMessage("don't have that item... maybe try again", true, true);
  }
  
}

function publishAccUnequipCleanup(responseDetails){
  equipSheet = responseDetails.responseText;
  statusMessage("Equipping <b>"+lastAcc.value+"</b>...", false, false);
  
  var publishFindRE = new RegExp(">"+lastAcc.value+".*?inv_equip.*?(?=\">)","gi");
  var publishCleanRE = /.*href="/;
  var publish = equipSheet.match(publishFindRE);
  
  GM_xmlhttpRequest({
      method: myMethod, url: myHost+publish[0].replace(publishCleanRE,"")+'&rnd='+Math.random(),
      headers:{'User-agent':user_agent,'Accept': accept,},
      onload: publishEquipCleanup
  });
  lastAcc = null;
}

function publishEquipCleanup(responseDetails){
  equipSheet = responseDetails.responseText;
  if(equipSheet.match(/You equip|Item equipped/)){
    result = equipSheet.match(/Results.*?<td>.*?(?=<\/td>)/gi);
    result = result[0].replace(/^.*(<\/center><blockquote>|<tr><td>)/gi,"");
    if(result){
      statusMessage(result.replace(/<.blockquote>/gi,""), false, true); 
    }
  }else{
    statusMessage("definitely don't have that item... don't try again", true, true);
  }
  nrbDebug( "completed equip..."+responseDetails.responseText); 
}

function selectChange(sel, val){
  for(var i = 0; i < sel.options.length; i++){
    if(normalize(sel.options[i].value) == normalize(val)){
      highlightChange(sel);
      sel.selectedIndex = i;
      /* if(sel.wrappedJSObject.onchange.toString().length != 41){
        sel.wrappedJSObject.onchange();
      }*/
      return;
    }
  }
}

function normalize(txt){
  return txt.toLowerCase().replace(/[- ']/g,"");
}

function highlightChange(x){
  x.style.backgroundColor = "#e1e1ff";
}

function updateSign(){
  /* do sign... only needed for MCD thus far, but MCD has moved */
  var signFindRE  = /Sign:.*?(?=<\/b>)/;
  var signCleanRE = /.*The /
  var sign = charSheet.match(signFindRE);
if(!  sign){return};
  sign = sign[0].replace(signCleanRE,"");
}

function updateName(){
  var formCharacter = document.forms.namedItem("character");
  var nameFindRE = /(showplayer.*?(?=<\/a>))/g;
  var nameCleanRE = /.*>/;
  var idCleanRE = /(showplayer.*?=|".*)/g;
  var charName = charSheet.match(nameFindRE);
  charId = charName[0].replace(nameCleanRE,"");
  charName = charName[0].replace(nameCleanRE,"");
  if(!document.getElementById("characterName")){
    var newElement = document.createElement("div");
    newElement.id = "characterName";
    newElement.style.fontSize = "150%";
    newElement.style.fontWeight = "bold";
    formCharacter.insertBefore(newElement, formCharacter.elements.namedItem("charclass") );
  }
  document.getElementById("characterName").innerHTML = charName;
  kolXHR('searchplayer.php?searching=Yep.&searchstring='+charName, parseSearchPlayer);   //3
}


function updateStats(){
  var statOrder = new Array("muscle","mysticality","moxie");
/* do stats stuff */
  var formCharacter = document.forms.namedItem("character");
  var statsFindRE = /(Muscle|Mysticality|Moxie):(<\/td><td><table><tr><td><b>\d+<\/b> \(base: |<\/td><td><table><tr><td><b>)\d+/g;
  var statsCleanRE = /.*(>|: )/;
  var stats = charSheet.match(statsFindRE);
if(!  stats){return};
  for(i = 0; i < stats.length; i++){
    formCharacter.elements.namedItem("base"+statOrder[i]).setAttribute('value',stats[i].replace(statsCleanRE,""));   
    highlightChange(formCharacter.elements.namedItem("base"+statOrder[i]));
  }
}

function updateClass(){
  var formCharacter = document.forms.namedItem("character");
  var selectClass = formCharacter.elements.namedItem("charclass");
/* do class stuff */
  
  var classFindRE = new RegExp(charId+".*?(?=<\/td><\/tr>)","ig");
  var classCleanRE = /.*>/;
  var charClass = searchPlayerPane.match(classFindRE);
  charClass = normalize(charClass[0].replace(classCleanRE,""));
  selectChange(selectClass, charClass);
}

function updatePath(){
  var formCharacter = document.forms.namedItem("character");  
  /* do path */
  var pathFindRE  = /Path:.*?(?=<\/b>)/;
  var pathCleanRE = /.*<b>/
  var path = charSheet.match(pathFindRE);
if(!  path){return};
  path = path[0].replace(pathCleanRE,"");
  if(path == "Oxygenarian" || path == "Boozetafarian"){
    formCharacter.elements.namedItem("fullness").value = 0;
    highlightChange(formCharacter.elements.namedItem("fullness")); 
  }
}

function updateSkills(){
/* do passive skill stuff */
  var skillsFindRE = /skill\(\d+\).+?(?=<\/a>)/ig ;
  var skillsCleanRE = /.*>/;
  var skills = charSheet.match(skillsFindRE);
if(!  skills){return};
  skillClasses = new Array("scpassive","ttpassive", "ppassive", "spassive",
                            "spassive", "dbpassive", "gnome");
  for(var i = 0; i < skillClasses.length; i++){
    skillClasses[i] = document.forms.namedItem(skillClasses[i]);
  }
  for(var i = 0; i < skills.length; i++){
    var ss = normalize(skills[i].replace(skillsCleanRE,""));
    bankedSkills[i] = ss;
    nrbDebug( ss ); 
    for(j = 0; j < skillClasses.length; j++){
      for(k = 0; k < skillClasses[j].elements.length; k++){
        if(ss == normalize(skillClasses[j].elements[k].name)){
          skillClasses[j].style.display = "block";
          highlightChange(skillClasses[j].elements[k]);
          skillClasses[j].elements[k].checked = true;
          if(skillClasses[j].elements[k].name == "doublefistedskullsmashing"){
            skillClasses[j].elements[k].wrappedJSObject.onclick();
          }
        }
      }
    }
  } 
  bankedSkills.sort();
}

function updateEffects(){
  var formCharacter = document.forms.namedItem("character");  
/* do effect stuff */
  var fxFindRE = /eff\(\d+\).+?(?= \()/ig ;
  var fxCleanRE = /.*>/;
  var fx = charSheet.match(fxFindRE);
  buffGroups = new Array("scbuff",  "ttbuff",   "pbuff", 
                         "sbuff",   "atbuff",   "dbbuff", 
                         "common",  "reagent",  "knoblab", 
                         "oyster",  "snowcones");
  for(var i = 0; i < buffGroups.length; i++){
    buffGroups[i] = document.forms.namedItem(buffGroups[i]);
  }
  nrbDebug( "***FX***"); 
if(!  fx){return};
  for(var i = 0; i < fx.length; i++){
    var fxs = fx[i].replace(fxCleanRE,"").toLowerCase().replace(/[ '-]/g,"");
    /* handle special naming cases */
    switch(fxs){
      case "empathy":          fxs = "empathyofthenewt";    break;
      case "jalape&ntilde;osaucesphere":  fxs = "jalapenosaucesphere";  break;
      case "jaba&ntilde;erosaucesphere": fxs = "jabanerosaucesphere"; break;
    }
    /* handle special effects */
    var formCone = buffGroups[10];
   
    switch(fxs){
      case "stomachofsteel":  formCharacter.elements.namedItem("fullness").value = 20;
                              highlightChange(formCharacter.elements.namedItem("fullness"));  break;
      case "blacktongue":     formCone.elements[1].checked = true; highlightChange(formCone.elements[1]);   break;
      case "bluetongue":      formCone.elements[2].checked = true; highlightChange(formCone.elements[2]);   break;
      case "redtongue":       formCone.elements[3].checked = true; highlightChange(formCone.elements[3]);   break;
      case "orangetongue":    formCone.elements[4].checked = true; highlightChange(formCone.elements[4]);   break;
      case "greentongue":     formCone.elements[5].checked = true; highlightChange(formCone.elements[5]);   break;
      case "purpletongue":    formCone.elements[6].checked = true; highlightChange(formCone.elements[6]);   break;
      break;
    }
    nrbDebug( fxs); 
    for(var j = 0; j < buffGroups.length; j++){
      var formGroup = buffGroups[j];
      for(var k = 0; k < formGroup.elements.length; k++){
        if(fxs == formGroup.elements[k].name ||
           "the"+fxs == formGroup.elements[k].name ){
          formGroup.style.display = "block";
          highlightChange(formGroup.elements[k]);
          formGroup.elements[k].checked = true; 
          if(formGroup.elements[k].wrappedJSObject.onclick.toString().length != 41){
            //formGroup.elements[k].wrappedJSObject.onclick();
          }
        }
      }
    }
  }
}

function updateFamiliar(){
  var formCharacter = document.forms.namedItem("character"); 
/* do familiar */
  var famFindRE = /familiar.php.*(?= kill)/;
  var famCleanRE = /([^\/]+(?=\.gif)|\d+$)/g;
  var fam = charSheet.match(famFindRE);
  var newFam = "";
  fam = fam[0].match(famCleanRE);
if(!  fam){return};
  switch(fam[0]){
    case "familiar12":  case "familiar24":
      newFam = 'Blood-Faced Volleyball'; break;
    case "familiar2":   newFam = 'Leprechaun'; break;
    case "familiar15":  case "familiar34":  case "familiar35":  
    case "familiar36":  case "familiar37": case "familiar49":
      newFam = 'Baby Gravy Fairy'; break;
    case "familiar42":  case "familiar23": 
      newFam = 'Cheshire Bitten'; break;
    case "familiar22":  case "familiar41":  
      newFam = 'Coffee Pixie'; break;
    case "hat2":  newFam = 'Hovering Sombrero'; break;
    case "familiar39":  newFam = 'Pygmy Bugbear Shaman'; break;
  }
  if(!newFam)return;
  nrbDebug( "*** FAMILIAR ***" + 
    Math.min(20, Math.floor(Math.sqrt(fam[1]))) +
    "lb " + fam[0]+"="+newFam); 
  selectChange(formCharacter.elements.namedItem("familiar"), newFam);
  formCharacter.elements.namedItem("weight").value = Math.min(20, Math.floor(Math.sqrt(fam[1])));
  highlightChange(formCharacter.elements.namedItem("weight")); 
}



function setOpacity(obj, opacity) {
  opacity = (opacity == 100)?99.999:opacity;
  
  // IE/Win
  obj.style.filter = "alpha(opacity:"+opacity+")";
  
  // Safari<1.2, Konqueror
  obj.style.KHTMLOpacity = opacity/100;
  
  // Older Mozilla and Firefox
  obj.style.MozOpacity = opacity/100;
  
  // Safari 1.2, newer Firefox and Mozilla, CSS3
  obj.style.opacity = opacity/100;
  
  lastLoadingFade = opacity;
}

var lastLoadingFade = 0;
function fadeLoading() {
    if (lastLoadingFade > 0) {
      setOpacity(document.getElementById("loading"), lastLoadingFade - 10);
      window.setTimeout(fadeLoading, 100);
    }
}

function statusMessage(message, error, fade){
  var loading = document.getElementById("loading");
  loading.innerHTML = message;
  if(error){
    loading.style.backgroundColor = "#f00";
    loading.style.color = "#fff";
  }else{
    loading.style.backgroundColor = "transparent";
    loading.style.color = "inherit";  
  }
  setOpacity(loading, 100);
  if(fade){
    fadeLoading();
  }
}

function checkForUpdate(){
		
		//update notification information
		var now = new Date();
		var lastUpdate = GM_getValue("LAST_UPDATE", false)*1.0;
		var serverVersion = GM_getValue("SERVER_VERSION", false)*1.0;
		var updateAvailable = serverVersion > localVersion;
    if(updateAvailable){
      document.getElementById("updateLink").style.display = "inline";
    }
		if(!lastUpdate || (now.getTime() - lastUpdate) > 60480000){
      statusMessage("checking for new version...",false,false);
			GM_xmlhttpRequest({
				method: 'GET',	
        url: namespace,
        headers: {'User-agent': user_agent,'Accept': accept},
				onload: function(serverScript) {
					newServerVersion = serverScript.responseText.match(/\/\/ version (.*)/g);
          if(newServerVersion){
  					newServerVersion = newServerVersion[0].replace(/\/\/ version (.*)/g,"$1");
            statusMessage(newServerVersion+" found!",false,true);
  					GM_setValue("SERVER_VERSION", newServerVersion+" ");
  					GM_setValue("LAST_UPDATE", now.getTime()+" ");
          }else{
            statusMessage("Update server problem",true,true);
          }
				}
			});
		}
}

function complete(completed){
  var actuallyComplete = true;
  processingComplete[completed] = true;
  for(var i; i < processingComplete.length; i++){
    actuallyComplete = actuallyComplete && processingComplete[i];
  }
  if(actuallyComplete){
    unsafeWindow.GoCalc();
  }
}

function kolXHR(url, parseFunction){
   GM_xmlhttpRequest({
      method: myMethod, 
      url: myHost + url + ((url.indexOf('?') > 0) ? '&' : '?') + 'rnd='+Math.random(),
      headers:{'User-agent':user_agent,
               'Accept': accept,},
      onload: parseFunction
  });
}

function buildIntegrationForm(){
  var prefixes = new Array("","www.","www2.","www3.","www4.","www5.");
  
  var integrationForm = '<form id="integrationForm" style="display:block;position:fixed;top:0px;right:0px;text-align:right;margin:2px;"><span id="loading"></span><select id="serverURL" style="font-size:90%;"><option>Choose your server...</option><option value="http://127.0.0.1:60080/">KoLMafia Relay</option>';
  for( var i = 0; i < prefixes.length; i++ ){
    integrationForm += '<option value="http://'+prefixes[i]+'kingdomofloathing.com/">'+prefixes[i]+'kingdomofloathing.com</option>';
  }
  integrationForm += '</select> v'+localVersion+'<a href="'+namespace+'" style="display:none;" id="updateLink">Update Available</a><br clear="both"/>';
  integrationForm += 'Hardcore: <input type="checkbox" id="hcequip"/>Gear <input type="checkbox" id="hcpassive"/>Passives <input type="checkbox" id="hcbuff"/>Buffs <input type="checkbox" id="hcattack"/>Attacks  </br>';
  integrationForm += '<textarea id="_DEBUG" align="right" style="font-size:9px;height:200px;width:200px;display:'+((debug)?'inline':'none')+';"></textarea>';
  document.body.innerHTML += integrationForm+"</form>";
}

function nrbDebug(val){
  if(!debug) return;
  document.getElementById("_DEBUG").value = 
    val+"\n"+document.getElementById("_DEBUG").value.substring(0,1024);
}
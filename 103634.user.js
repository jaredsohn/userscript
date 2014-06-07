// ==UserScript==
// @name           Mafia Wars Weapon Stats.
// @namespace      http://userscripts.org/scripts/show/103634
// @description    Mafia Wars Weapon Stats.	
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/* 
// @include        http://facebook-ca2.mafiawars.zynga.com/mwfb/*
// @include        https://facebook-ca2.mafiawars.zynga.com/mwfb/*
// @contributor	   DutchKingCobra,Spockholm  
// @version        4.5
// ==/UserScript==

/*
TODO
hmmmm .. :?>
*/
(function() { 
var SCRIPT = {
 update:1, 
 id:103634,
 version:4.5,
 ColorIndicators:1,
 consumables:1,
 count:1,
 loot:1
};

var news="code cleanup , looks tweaked "; 


GM_addStyle(
  "input.bttn { width:120px; }\
   input.mwsActionLink {border-radius:10px;font-size:10px; background-color:black; color:#00FF00 !important; font-weight:bold; cursor:pointer;}\
   div.mwsPopupFrame {z-index: 1000; bottom:40px; left:20px; right:20px; top:20px;\
   position:fixed; overflow: auto;}\
   div.mwsPopupContent {padding:10px; font-family:'lucida grande',tahoma,verdana,arial,sans-serif; font-size:11px;\
   background-color:#000000; color:#E9E9AF; border:1px solid #FFD927;border-radius:10px;}\
   div.mwsPopupContent td {'lucida grande',tahoma,verdana,arial,sans-serif; font-size:11px; }\
   div.mwsPopup td, div.mwsPopup p {font-size:12px;}\
   div.mwsPopupTitle {font-weight:bold; font-size:16px; color:#FFD927;}\
   div.mwsAnalysis {font-weight:bold; color:#FFD927;}\
   a.mwsDismissLink {color:#E9E9AF;}\
   a.mwsLootView {color:#FFD927; text-decoration:none; margin-left:10px;}\
   a.mwsLootSort {color:#FFD927; font-weight:bold;}\
   table.mwsLootTable tr td {padding:0 10px 0 5px;}\
   tr.mwsLightRow td {background-color:#1D1D1D;}\
   td.mwsNumber {text-align:right;}\
   font.yellow {color:#FFD927;}\
   font.green {font-weight:bold; color:#00FF00;}\
   font.red {font-weight:bold; color:red;}\
   input.request_form_submit {margin-left:0 !important; margin-right:5px;}"
);

// Loot types.
var TYPE = {weapon: 0, armor: 1, vehicle: 2, animal: 3 ,other:4 , henchman:5};
var typeName = ["Weapon", "Armor", "Vehicle", "Animal" ,"Other" , "Henchman"];

// Inventory.
var dictionary;
var lootTable;
var lootSort;
var weapons;
var armor;
var vehicles; 
var animals;
var henchman; 
var other;
var lootCnt;
var index;

// Globals.
var innerPage;
var timer;
var mwsize = 0;
var itemdblen = 0;
var refreshtable = 0; 
var clan500X=101;
//
giftableLoot = new Array(); 
giftableLoot[0] ="New York";
giftableLoot[1] ="Cuba";
giftableLoot[2] ="Moscow";
giftableLoot[3] ="Bangkok";
giftableLoot[4] ="Italy";
giftableLoot[5] ="Brazil";
giftableLoot[6] ="Las Vegas";
giftableLoot[7] ="Special event";
giftableLoot[8]="Market Place";
giftableLoot[9]="Jobs";	
giftableLoot[10]="Fighting"; 
giftableLoot[11]="Robbing";
giftableLoot[12] ="Property";
giftableLoot[13] ="Challenge Mission";
giftableLoot[14] ="Operations";	
giftableLoot[15] ="Declare War";
giftableLoot[16] ="Mission"; 
giftableLoot[17] ="Secret Stash";
giftableLoot[18] ="War Rewards";
giftableLoot[19] ="Boss Fight";
giftableLoot[20] ="Freedom Fighters Event";
giftableLoot[21] ="unknown"; 
giftableLoot[22] ="none"; 
giftableLoot[23] ="Chicago"; 
giftableLoot[24] ="South Africa"; 
giftableLoot[25] ="London"; 
giftableLoot[26] ="VIP"; 
giftableLoot[27] ="Arena"; 

// Entry point.
addToolButtons();
function onProfile() { return $xfirst('.//form[@id="change_title"]', innerPage); }
function tryAgain() { window.setTimeout(addToolButtons, 200); }
function handleContentModified(e) { if (ignoreElement(e.target)) return; window.setTimeout(addToolButtons, 200); }
function addToolButtons() {	
innerPage = $("inner_page");
  	    if (!innerPage) {
		  tryAgain();
    return;
  }
  setListenContent(true);
    if (onProfile()) { 
 	  if (!$("inventoryAction")) {
      setListenContent(false);	 
    var titleElt = $xfirst('.//div[@id="mw_like_button"]', innerPage);	 
	 //lastChild(titleElt).style.display = "none";
	  var link = makeElement('input', titleElt, {'id':'inventoryAction', 'class':'mwsActionLink tab_on','type':'button' ,'value':'Analyze Inventory'});
     // link.appendChild(document.createTextNode('Analyze Inventory'));
	  link.addEventListener('click',startmwst, false);
      //var list = $xlist('.//strong[@class="good"]', innerPage);	
	  setListenContent(true);  
	  
    }
  }	 
} 
function setListenContent(on) {
  var elt = $('mainDiv'); 
    if (!elt) {return; }
         if (on) { elt.addEventListener('DOMSubtreeModified', handleContentModified, false);} else { elt.removeEventListener('DOMSubtreeModified', handleContentModified, false); }
}

function ignoreElement(element) {
  var parentElt = element.parentNode;
  if (parentElt) {
    var id = parentElt.id;
    if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
      return true;
  }

  var id = element.id;
  if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
    return true;

  return false;
}
//----------------------------------------------------------------------------
function $click(elt) { var evt = document.createEvent('MouseEvents'); evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); elt.dispatchEvent(evt); }
//function $xlist(q, e) { return document.evaluate(q, e || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }
function $xfirst(q, e) { return document.evaluate(q, e || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }
function $(id) { return document.getElementById(id); }

function makeElement(type, appendto, attributes) { 
var element = document.createElement(type);
 if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (appendto) { appendto.appendChild(element); }	
  return element;
  }

/////// SORTING
function sortName(x,y) { return (x.n == y.n) ? 0 : ((x.n < y.n) ? -1 : 1); }
function sortAttack(x,y) { return (y.a != x.a) ? (y.a - x.a) : (y.d - x.d); }
function sortDefense(x,y) { return (y.d != x.d) ? (y.d - x.d) : (y.a - x.a); }
function sortOwned(x,y) { return y.c - x.c; }
function sortUnused(x,y) { return y.c - y.u - x.c + x.u; }
function sortType(x,y) { return x.t - y.t; }
function sortSource(a,b) { var x = a.s.toLowerCase();var y = b.s.toLowerCase(); return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
function valAttack(x) { return x.a;	}
function valDefense(x) { return x.d; }
function sortcons(a,b) { var x = a.n.toLowerCase();var y = b.n.toLowerCase(); return ((x < y) ? -1 : ((x > y) ? 1 : 0)); } 
//function sortEquipped(a,b) { return b - a; } 
//////////////////=========================================

function startmwst() { 
itemdblen=0;
inventoryPopup();
userid=unsafeWindow.User.id; if(userid == undefined || userid == 0){ $('ErrorMsg').innerHTML+='Error: user.id ='+userid; return; }
mwsize=unsafeWindow.User.mafia_size; if(mwsize == undefined || mwsize == 0){ $('ErrorMsg').innerHTML+='Error:mwsize ='+mwsize;  return; }
local_xw_sig=unsafeWindow.local_xw_sig; if(local_xw_sig == undefined || local_xw_sig == 0){ $('ErrorMsg').innerHTML+='Error:local_xw_sig ='+local_xw_sig; return;  }
var xw_city1 = $('mw_city_wrapper').className; if(xw_city1 ==undefined || xw_city1 == 0){ $('ErrorMsg').innerHTML+='Error:xw_city1 ='+xw_city1; return;  }
xw_city = xw_city1.replace("mw_city","");
if (mwsize > 501) { mwsize=501; }

loadInventory(function(){
});

}


 
function grab_settings(){	 
//grab settings
ShowSuggestions= GM_getValue('MWSTSuggestions','');
showwaritems = GM_getValue('showwaritems','');	
showpropitems = GM_getValue('showpropitems','');
showfightloot = GM_getValue('showfightloot','');
showmarketloot = GM_getValue('showmarketloot',''); 
showbossfightitems = GM_getValue('showbossfightitems','');
showspecialeventitems = GM_getValue('showspecialeventitems',''); 
showVIPitems=GM_getValue('showVIPitems','');
showArenaitems=GM_getValue('showArenaitems','');
clanperksX=GM_getValue('clanperks','0');
  //inventoryPopup();
  dictionary = {};
  weapons = [];
  armor = [];
  vehicles = [];
  animals = [];
  henchman = [];
  consumables = [];
  lootCnt = 0; 
  sort_types();
}	

function sort_types() { 
//alert(itemdblen);	
itemdblen = itemdblen + 3
     for (var i = 1; i < itemdblen; i++) {
          if (itemdatabase[i] == null || itemdatabase[i] == undefined) { }
          else{
		  TypeIs=itemdatabase[i].type;
	      if (TypeIs == 1) { type=TYPE.weapon;weptype=weapons; } 
          else if (TypeIs == 2) { type=TYPE.armor;weptype=armor; }
	      else if (TypeIs == 3) { type=TYPE.vehicle;weptype=vehicles; } 
	      else if (TypeIs == 8) { type=TYPE.animal;weptype=animals; } 
	      else if (TypeIs == 13) { type=TYPE.henchman;weptype=henchman; } 
	      else{ type=TYPE.other;weptype=consumables; } 
		        item = itemdatabase[i]; 
		        var name = itemdatabase[i].name;
                var namepic = itemdatabase[i].imagesrc; 
	            cnt = parseInt(itemdatabase[i].quantity);
	            // alert("name=" + item.name + " attack=" + item.attack +" defense=" + item.defense +" id=" + item.id +" count=" + cnt +" type=" + type +" location=" +  item.location +" namepic=" + namepic +" tradeable=" + item.tradeable+' equipped offense='+item.equipped_offense+' equipped_defense='+item.equipped_defense);
                addInventoryItem(item.name, item.attack, item.defense, item.id, cnt, type, item.location,namepic,item.tradeable,item.equipped_offense ,item.equipped_defense, weptype);
	      }
    }	
  
 if (refreshtable ==1){ get_active_weapons(); } else{ inventoryReport(); }
} 

function addInventoryItem(name, att, def, gid, cnt, type, source,namepic,tradeable,equipped_offense,equipped_defense,items) {
	//Add visual indicator 
	indicator='';
	if (SCRIPT.ColorIndicators){

    if (cnt == 0){ name="<font color='#c0c0c0'>"+name+"</font>"; }	
	//giftable and war stuf  
	if (tradeable != null && tradeable == 1){  
		   indicator+='<b>(</b><font color="green" title="item is listed as a giftable item."><b>+</b></font><b>)</b>'; 
	 } 
	 
	if (source == '8' && showspecialeventitems == 1) { indicator+='<b>(</b><font color="#cc9900" title="item is a special event item.">SE</font><b>)</b>'; }
	if (source == '9' && showmarketloot == 1){ indicator+='<b>(</b><font color="yellow" title="item is a marketplace item.">MP</font><b>)</b>'; }	
	if (source == '10' && showspecialeventitems == 1) { indicator+='<b>(</b><font color="#cc9900" title="item is a special event item.">SE</font><b>)</b>'; }
	if (source == '11' && showfightloot ==1){ indicator+='<b>(</b><font color="dodgerblue" title="item is a fightloot item.">FL</font><b>)</b>'; }
	if (source == '14' && showpropitems ==1){ indicator+='<b>(</b><font color="MEDIUMORCHID" title="item is a Property item.">PI</font><b>)</b>'; }
	if (source == '20' && showwaritems == 1){ indicator+='<b>(</b><font color="cyan" title="item is a WAR reward.">WR</font><b>)</b>'; }
	if (source == '22' && showbossfightitems == 1){ indicator+='<b>(</b><font color="red" title="item is a boss fight reward.">BF</font><b>)</b>'; }
	if (source == '25' && showVIPitems == 1){ indicator+='<b>(</b><font color="gold" title="item is a VIP item.">VIP</font><b>)</b>'; }
    if (source == '26' && showArenaitems == 1){ indicator+='<b>(</b><font color="silver" title="item is a Arena item.">AR</font><b>)</b>'; }
}
if (source == 0){source = "unknown 0";}	
else if(source == 1){source = "New York";}
else if(source == 2){source ="Cuba";}	
else if(source == 3){source ="Moscow";}
else if(source == 4){source ="Bangkok";}
else if(source == 5){source ="Las Vegas";}
else if(source == 6){source ="Italy";} 	
else if(source == 7){source ="Challenge Mission";} 
else if(source == 8){source ="Special event";}
else if(source == 9){source ="Market Place";}
else if(source == 10){source ="Special event";} 
else if(source == 11){source ="Fighting";} 
else if(source == 12){source ="Robbing";}	
else if(source == 13){source ="Operations";}
else if(source == 14){source ="Property";}
else if(source == 15){source ="Declare War";} 
else if(source == 16){source ="Mission";} 
else if(source == 17){source="location 17 ???";}
else if(source == 18){source ="Brazil";} 
else if(source == 19){source ="Secret Stash";}
else if(source == 20){source ="War Rewards";}
else if(source == 21){source ="Jobs";}
else if(source == 22){source ="Boss Fight";}
else if(source == 23){source ="Freedom Fighters Event";} 
else if(source == 25){source ="VIP";} 
else if(source == 26){source ="Arena";} 
else if(source == 40){source ="Chicago";}
else if(source == 41){source ="London";}
else if(source == 42){source ="South Africa";}
else{source = "unknown location=" + source;}
var inventoryItem = {n:name, a:att, d:def, g:gid, c:cnt, u:0, t:type, s:source,i:namepic,tr:tradeable,uia:equipped_offense,uid:equipped_defense,x:indicator};

  items.push(inventoryItem);
   dictionary[gid] = inventoryItem; 
   lootCnt += (type != TYPE.other) ? cnt : 0;  
     
} 

function inventoryPopup() {
  showPopup("inventoryPopup", "Mafia Wars Inventory Analysis Revived - v" + SCRIPT.version);
}

function inventoryReport() {
if (refreshtable == 1){ refreshtable =0; return; } else{ }	
  
  var html = '<table border="0" align="center" width="100%" summary="">'
	+'<tr>'
	+'<td valign="top" id="activeweaponsattacktable">weapons attack</td>'	
	+'<td valign="top" id="activeweaponsdefensetable">weapons defense</td>'
	+'<td valign="top">'
	+'<center><span id="updatespan" ></span><br><input class="bttn" type="submit" value="goto USO" id="visituso"></center><br><br><br>'
	+ '<center><iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FMafia-Wars-Stats-Tool-Revived%2F176786662375618&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=dark&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe></center><br>'
	//options for indicators  
    + "<form name='form1' id='form1' >"	
	+ "<table style='border:1px solid red;border-radius:10px;' width='100%'><tr><td>" 
    + "<div id='showmwsize' style='text-align:center;'></div><br>" 	
	+ "<input type='checkbox' name='showsuggestionscbx' id='showsuggestionscbx' value='Show weapons i don\'t own.'> Show weapons i don\'t own.<br>"
   	+ "</td></tr></table><br>"
   	+ "<table style='border:1px solid #FFD927;border-radius:10px;' width='100%'><tr><td>"
    + "CLANPERK 500+ times <select name='clanperks' id='clanperks'></select><br>" 
	+ "INDICATORS:<br>" 
    + "<input type='checkbox' name='showwaritems' id='showwaritems' value='War items'>War Loot <b>(</b><font color='cyan' title='item is a WAR reward.'>WR</font><b>)</b><br>"
    + "<input type='checkbox' name='showfightloot' id='showfightloot' value='Fight Loot'>Fight Loot <b>(</b><font color='dodgerblue' title='item is a fightloot item.'>FL</font><b>)</b><br>"
    + "<input type='checkbox' name='showmarketloot' id='showmarketloot' value='Market Items'>Market Place <b>(</b><font color='yellow' title='item is a marketplace item.'>MP</font><b>)</b><br> " 
	+ "<input type='checkbox' name='showbossfightitems' id='showbossfightitems' value='Boss Fight'>Boss Fight <b>(</b><font color='red' title='item is a boss fight reward.'>BF</font><b>)</b><br> " 
	+ "<input type='checkbox' name='showspecialeventitems' id='showspecialeventitems' value='special event'>Special Event <b>(</b><font color='#cc9900' title='item is a special event reward.'>SE</font><b>)</b><br> " 
	+ "<input type='checkbox' name='showpropitems' id='showpropitems' value='Property'>Property <b>(</b><font color='mediumorchid' title='item is a property item.'>PI</font><b>)</b><br> "
	+ "<input type='checkbox' name='showVIPitems' id='showVIPitems' value='VIP'>VIP <b>(</b><font color='gold' title='item is a VIP item.'>VIP</font><b>)</b><br> "
	+ "<input type='checkbox' name='showArenaitems' id='showArenaitems' value='Arena'>Arena<b>(</b><font color='silver' title='item is a Arena item.'>AR</font><b>)</b><br> "
	
	
	+ "<input class='bttn' type='button' value='Update Overview' id='updatetable'>"
    + "</td></tr></table></form><br><br>" 
    //statistics
    + "<table style='border:1px solid #FFD927;border-radius:10px;' summary='' id='statistics' style='visibility:hidden;' width='100%'><tr><td>Fans:</td><td id='fans'></td></tr><tr><td>Installs:</td><td id='installs'></td></tr><tr><td>Discussions:</td><td id='discussions'></td></tr><tr><td>Reviews:</td><td id='reviews'></td></tr><tr><td>Rating:</td><td id='rating'></center></td></tr></table></td><br>"
	+'</td>'
	+'<td valign="top"><input type="button" class="xbttn" title="Close" style="text-align:right;color:red;font-size:15px;font-weight:bold;" id="DismissX" value="X"></td>'
	+'</tr>'
	+'<tr><td colspan="4" id="analysis"></td></tr>'
	+'</table>'; 
	
  
  if (SCRIPT.consumables) { html += "<br><br><b><div style='text-align:left;color:#FFD927;'>Consumables</div></b><div id='Toggleconsumable' style='text-align:left;cursor:pointer;'>(<font color='#FFD927'>Toggle</font>)</div><br><div id='consumablesdiv' style='text-align:left;'></div>"; }

	 
  if (SCRIPT.loot) { 
   getLootOverview();
    html += "<span style='text-align:left;'>"
  	  +"<p>"	
      + img("Giftable Loot", "icon_sendgift_25x16") + "<b>GIFTABLE LOOT</b>"
      + "(<span style='text-align: center; cursor:pointer; color:#FFD927;' id='togglegiftloot'>Toggle</span>)"
      + "<div id='mwsAdvancedSection' style='display:none'>" + getLootAdvanced() + "</div>"
	  +"</span>";
  }

  showPopupResults("inventoryPopup", html);
  
 if(ShowSuggestions == 1){ $('form1').elements['showsuggestionscbx'].checked = true; }else{ $('form1').elements['showsuggestionscbx'].checked = false; }  
 if(showwaritems == 1){ $('form1').elements['showwaritems'].checked = true; }else{ $('form1').elements['showwaritems'].checked = false; }  
 if(showfightloot  == 1){ $('form1').elements['showfightloot'].checked = true; }else{ $('form1').elements['showfightloot'].checked = false; }  
 if(showmarketloot  == 1){ $('form1').elements['showmarketloot'].checked = true; }else{ $('form1').elements['showmarketloot'].checked = false; }  
 if(showbossfightitems  == 1){ $('form1').elements['showbossfightitems'].checked = true; }else{ $('form1').elements['showbossfightitems'].checked = false; }  
 if(showspecialeventitems  == 1){ $('form1').elements['showspecialeventitems'].checked = true; }else{ $('form1').elements['showspecialeventitems'].checked = false; }  
 if(showpropitems == 1){ $('form1').elements['showpropitems'].checked = true; }else{ $('form1').elements['showpropitems'].checked = false; }  
 if(showVIPitems == 1){ $('form1').elements['showVIPitems'].checked = true; }else{ $('form1').elements['showVIPitems'].checked = false; }  
 if(showArenaitems == 1){ $('form1').elements['showArenaitems'].checked = true; }else{ $('form1').elements['showArenaitems'].checked = false; }  
  
    
 //       clanperk x500 multiplier
c="";
for (var cp = 0; cp < clan500X; cp++) {
 c+="<option value='" + cp + "'>" + cp + "</option>";
 }
 $('clanperks').innerHTML+=c;
//set clanperks to last selected 
 $('form1').elements['clanperks'].value = clanperksX;   
 $('showmwsize').innerHTML='Mafia size : '+ mwsize;
   	
   	if (SCRIPT.loot) {
    lootSort = "n/a";
    setLootSortActions();
    }	
  
get_active_weapons();
init_e_listeners();   
Check4updates(); 

} 

function get_active_weapons(){ 	
  var limit = (mwsize > 501) ? 501 : mwsize;  
  
  var wAtt = getItemsReport(weapons, "watt" ,sortAttack, valAttack, limit);
  var wDef = getItemsReport(weapons, "wdef" , sortDefense, valDefense, limit);
  var aAtt = getItemsReport(armor,  "watt" ,sortAttack, valAttack, limit);
  var aDef = getItemsReport(armor,  "wdef" ,sortDefense, valDefense, limit);
  var vAtt = getItemsReport(vehicles,  "watt" ,sortAttack, valAttack, limit);
  var vDef = getItemsReport(vehicles,  "wdef" ,sortDefense, valDefense, limit); 
  var aniAtt = getItemsReport(animals,  "watt" ,sortAttack, valAttack, limit);
  var aniDef = getItemsReport(animals,  "wdef" ,sortDefense, valDefense, limit); 
  var hmenAtt = getItemsReport(henchman,  "watt" ,sortAttack, valAttack, limit);
  var hmenDef = getItemsReport(henchman,  "wdef" ,sortDefense, valDefense, limit);
 clanperksAdds500X = clanperksX * 500;
  var att = wAtt.val + aAtt.val + vAtt.val + aniAtt.val + hmenAtt.val + clanperksAdds500X;
  var def = wDef.val + aDef.val + vDef.val +aniDef.val + hmenDef.val + clanperksAdds500X;
  
activeweapsatthtml=""
   + img("Mafia Attack Strength", "icon_mafia_attack_22x16_01")
      + " <b>ATTACK: " + att + "</b>"
      + "<br><b><font class='yellow'>Weapons (" + wAtt.val + ")</font></b>" + wAtt.rep
      + "<br><b><font class='yellow'>Armor (" + aAtt.val + ")</font></b>" + aAtt.rep
      + "<br><b><font class='yellow'>Vehicles (" + vAtt.val + ")</font></b>" + vAtt.rep	
	 + "<br><b><font class='yellow'>Animals (" + aniAtt.val + ")</font></b>" + aniAtt.rep	
	 + "<br><b><font class='yellow'>Henchman (" + hmenAtt.val + ")</font></b>" + hmenAtt.rep	
      + "</td><td>&nbsp;</td><td valign='top'>"	;
	  
 activeweapsdefhtml=''
      + img("Mafia Defense Strength", "icon_mafia_defense_22x16_01")
      + " <b>DEFENSE: " + def + "</b>"
      + "<br><b><font class='yellow'>Weapons (" + wDef.val + ")</font></b>" + wDef.rep
      + "<br><b><font class='yellow'>Armor (" + aDef.val + ")</font></b>" + aDef.rep
      + "<br><b><font class='yellow'>Vehicles (" + vDef.val + ")</font></b>" + vDef.rep
	  + "<br><b><font class='yellow'>Animals (" + aniDef.val + ")</font></b>" + aniDef.rep
	  + "<br><b><font class='yellow'>Henchman (" + hmenDef.val + ")</font></b>" + hmenDef.rep
      + "</td>";   
 	  
  var analysisres = "";
  if (mwsize < 501) { analysisres += "<br><font class='red'>You have less then 501 mafia. Missing mafia members: " + (501 - mwsize) + ".</font>"; }
  if (wAtt.miss > 0) { analysisres += "<br><font class='red'>You dont have enough weapons for your mafia! Missing weapons: " + wAtt.miss + ".</font>"; }
  if (aAtt.miss > 0) { analysisres += "<br><font class='red'>You dont have enough armors for your mafia! Missing armors: " + aAtt.miss + ".</font>"; }
  if (vAtt.miss > 0) { analysisres += "<br><font class='red'>You dont have enough vehicles for your mafia! Missing vehicles: " + vAtt.miss + ".</font>"; }	
  if (aniAtt.miss > 0) { analysisres += "<br><font class='red'>You dont have enough animals for your mafia! Missing animals: " + aniAtt.miss + ".</font>"; } 
  if (hmenAtt.miss > 0) { analysisres += "<br><font class='red'>You dont have enough henchman for your mafia! Missing henchman: " + hmenAtt.miss + ".</font>"; } 
	
  analysisres += "<br>Weakest <u>attack</u> items: weapon [" + wAtt.weak + "], armor [" + aAtt.weak + "], vehicle [" + vAtt.weak + "], animal [" + aniAtt.weak + "], henchman [" + hmenAtt.weak + "].";
  analysisres += "<br>Weakest <u>defense</u> items: weapon [" + wDef.weak + "], armor [" + aDef.weak + "], vehicle [" + vDef.weak + "], animal [" + aniDef.weak + "], henchman [" + hmenDef.weak + "].";
  
  $('activeweaponsattacktable').innerHTML=activeweapsatthtml; 	
  $('activeweaponsdefensetable').innerHTML=activeweapsdefhtml; 
  $('analysis').innerHTML="<div class='mwsAnalysis' style='text-align:center;'>" + analysisres + "</div>";  
  
  refreshtable=0;  
 
}

 
function init_e_listeners(){ 
     $("form1").addEventListener("click", function(e) { 
	 cbxid=e.target.id;
	  cbx=$('form1').elements[cbxid].checked;
     if (cbx == true){ GM_setValue(cbxid,'1'); } else if (cbx == false){ GM_setValue(cbxid,'0'); } else{} 
  	 }, false);
   $("clanperks").addEventListener("click", function(e) { cpX=document.getElementById('clanperks').value ; GM_setValue('clanperks',cpX); }, false); 
  
   $("DismissX").addEventListener("click", function(e) { document.getElementById('updatespan').innerHTML=""; popup.style.display = "none"; }, false);  
  
   $("visituso").addEventListener("click", function(e) { top.location.href='http://userscripts.org/scripts/show/103634'; }, false); 
  
   $("Toggleconsumable").addEventListener("click", function(e) { consumablesdiv=document.getElementById('consumablesdiv'); if(consumablesdiv.innerHTML==''){ consumablesdiv.innerHTML=''+get_consumeables(); } else{ consumablesdiv.innerHTML=''; } }, false);     
  
   $("togglegiftloot").addEventListener("click", function(e) { togglegiftloot=document.getElementById('mwsAdvancedSection'); if(togglegiftloot.style.display!='none'){ togglegiftloot.style.display='none'; } else { togglegiftloot.style.display='block' ; } }, false);     
 
   $("showsuggestionscbx").addEventListener("click", function(e) {
   suggcbx=$('form1').elements['showsuggestionscbx'].checked;
   if (suggcbx == true){ GM_setValue('MWSTSuggestions','1'); } else if (suggcbx == false){ GM_setValue('MWSTSuggestions','0'); } else{} 
   $('updatespan').innerHTML="";
   popup.style.display = "none";
   startmwst(); 
   }, false);	
   
   $("updatetable").addEventListener("click", function(e) {
   $('activeweaponsattacktable').innerHTML=''; 
   $('activeweaponsdefensetable').innerHTML='';
   refreshtable=1; 
   grab_settings()	;
   }, false); 

}  


function get_consumeables(){
html="";
consumables.sort(sortcons);
for (i=0;i < consumables.length;i++){  
       if (ShowSuggestions == 0 && consumables[i].c == 0){
                   }else{		
  	                      html+= consumables[i].n+' '+consumables[i].c+'<br>'; 
	  } 
}
	return html;
}

function img(title, icon) {
  return "<img src='http://mwfb.static.zynga.com/mwfb/graphics/" + icon + ".gif'" + " title='" + title + "'>";
}

function getCategoryReport(category) {
  var report = "";
  var cnt = 0;
  for (var i = 1; i < itemdblen; i++) {
 var item = dictionary[i];
     if (item) { 
	 //if (i == '19026'){alert(' item.n ' + item.n +' item.t ' + item.t + ' item.s ' + item.s + ' item.tr '+ item.tr +' item.c '+item.c+' item.uia'+item.uia);}
		
		     if (item.tr == 1 && item.s == category && item.t != 4){ 
		   	       if (ShowSuggestions == 0 && item.c == 0){
                   }else{		     
	             	     item.s = category;
	             	     lootTable.push(item);
	             	     report += "<br>" + item.c + " " + item.n + " [" + item.a + "," + item.d + "] ";
	             	     cnt += item.c;  
		    	 }
			 } 
	
    }else if (!item){
	
	}
  }	  
   return (cnt > 0)
      ? "<p><div><b><font class='yellow'>" + category + " (" + cnt + ")</font></b>" + report + "</div>"
      : "";
}

function getLootOverview() {
  lootTable = [];
  
  for (var i = 0; i < giftableLoot.length; i++) {  
  getCategoryReport(giftableLoot[i]);
  }

} 	 
function getLootAdvanced() {
  var html = "<table class='mwsLootTable' cellspacing='0'>";
  html += "<tr class='mwsLightRow'><td>" + getLootSortLink("Name") + "</td><td>"
      + getLootSortLink("Attack") + "</td><td>" + getLootSortLink("Defense") + "</td><td>"
      + getLootSortLink("Unused") + "</td><td>" + getLootSortLink("Owned") + "</td><td>"
      + getLootSortLink("Type") + "</td><td>" + getLootSortLink("Source") + "</td></tr>";
  for (var i = 0; i < lootTable.length; i++) {
    var item = lootTable[i];
    var style = (i % 2 == 0) ? '' : " class='mwsLightRow'";
    html += "<tr " + style + "><td>" + item.n + "</td><td class='mwsNumber'>" + item.a
        + "</td><td class='mwsNumber'>" + item.d + "</td><td class='mwsNumber'>" + (item.c - item.u)
        + "</td><td class='mwsNumber'>" + item.c + "</td><td>" + typeName[item.t]
        + "</td><td>" + item.s+ "</tr>";
  }
  html += "</table>";
  return html;
 
}

function getLootSortLink(column) {
  return "<a href='#' class='mwsLootSort' id='mwsLoot" + column + "'>" + column + "</a>";
}

function setLootSortActions() {
  setLootSortAction("Name", sortName);
  setLootSortAction("Attack", sortAttack);
  setLootSortAction("Defense", sortDefense);
  setLootSortAction("Unused", sortUnused);
  setLootSortAction("Owned", sortOwned);
  setLootSortAction("Type", sortType);
  setLootSortAction("Source", sortSource);

}

function setLootSortAction(column, sortMethod) {
  $("mwsLoot" + column).addEventListener("click", function(e) {
    if (lootSort != column) {
      lootSort = column;
      lootTable.sort(sortMethod);
      $("mwsAdvancedSection").innerHTML = getLootAdvanced();
      setLootSortActions();
    }
  }, false);
}


function getItemsReport(items,activewep ,sortMethod, valMethod, limit) {
  var report = "";
  var value = 0;
  var missing = 0;
  var cnt = limit;
  items.sort(sortMethod);
  var minim;
  var difference = function (a, b) { return Math.abs(a - b) }
 
     for(var i = 0; (cnt > 0) && (i < items.length); i++) { 
 
          if (ShowSuggestions == 0 && items[i].c == 0){
          }else{
          if (activewep== 'watt' && items[i].uia > 0){ var used = (cnt > items[i].uia) ? items[i].uia : cnt; }
          else if (activewep== 'wdef' && items[i].uid > 0){ var used = (cnt > items[i].uid) ? items[i].uid : cnt; }
          else { var used = (cnt > items[i].c) ? items[i].c : cnt; }
		  value += valMethod(items[i]) * used;
	      cnt -= used;
          minim = valMethod(items[i]);
	      report += "<br>" + used + ' <span id="'+ items[i].n +'" title="'+items[i].s+'">' + items[i].n + "</span>" + items[i].x + " [" + items[i].a + "," + items[i].d + "] ";
     }	

   }
  if (cnt > 0) missing = cnt;
  return {rep:report, val:value, miss:missing, weak:minim};
}

function createPopup(id, title) {
  var html = "<div class='mwsPopupContent'>";
  html += "<div class='mwsPopupTitle' id='" + id + "Title'>" + title + "</div>";
  html += "<p id='" + id + "Processing'><blink><font class='red'>Loading Inventory please wait<marquee scrollamount='5' direction='right' width='40'>...</marquee></font></blink><br>By DutchKingCobra<br>Thanks to Spockholm(assassin-a-nators grab inventory code!).</p><br><table id='ErrorMsg' style='text-align:left;font-size:14px;color:red;' align='center'></table><br></table>";
  html += "<p id='" + id + "Results'></p>";
  html += "[ <a href='#' class='mwsDismissLink' id='" + id + "Dismiss'>dismiss popup</a> ]<br></div>";

  popup = document.createElement("div");
  popup.id = id;
  popup.className = "mwsPopupFrame";
  popup.innerHTML = html;
  document.body.appendChild(popup);
  
  $(id + "Dismiss").addEventListener("click", function(e) {	 
    popup.style.display = "none"; 	
	}, false);  
	 	 
  return popup;
}

function showPopup(id, title) {
  var popup = $(id);
  if (!popup) {
    popup = createPopup(id, title)
  }
  $(id + "Title").innerHTML = title;
  $(id + "Processing").style.display = "";
  $(id + "Results").style.display = "none";
  popup.style.display = "";
}

function showPopupResults(id, html) {
  $(id + "Processing").style.display = "none";
  var results = $(id + "Results");
  results.innerHTML = html;
  results.style.display = "";
}
 
///////// UPDATE
//check for updates
function Check4updates(e) {	 
IsChrome = navigator.userAgent;
if (IsChrome.indexOf('Chrome') != -1) { 
$('updatespan').innerHTML="";
return ;}
 
fan='';installs='';discussions='';reviews='';rating='';
document.getElementById('updatespan').innerHTML="<blink>Checking...</blink>"; 
var sourceUrl = "http://userscripts.org/scripts/source/" + SCRIPT.id + ".meta.js";
    GM_xmlhttpRequest({method: "GET", url: sourceUrl,
      onload: function(details) {
	       if (details.readyState == 4 && details.status == 200) {
           var m = /\/\/ @version *([0-9.]+)/.exec(details.responseText); 
		   var f1= /\/\/ @uso:fans *([0-9.]+)/.exec(details.responseText); 
		   var i1= /\/\/ @uso:installs *([0-9.]+)/.exec(details.responseText); 
		   var d1= /\/\/ @uso:discussions *([0-9.]+)/.exec(details.responseText); 
		   var r1= /\/\/ @uso:reviews *([0-9.]+)/.exec(details.responseText); 
		   var r2= /\/\/ @uso:rating *([0-9.]+)/.exec(details.responseText);
		   if (f1[1] != null || f1[1] != ''){
		   fan = f1[1].split(",",1);	
		   $('fans').innerHTML=fan;
		   installs = i1[1].split(",",1);	   
		   $('installs').innerHTML=installs;
		   discussions = d1[1].split(",",1); 
		   $('discussions').innerHTML=discussions;
		   reviews = r1[1].split(",",1);	
		   $('reviews').innerHTML=reviews;    
		   rating = r2[1].split(",",1); 
		   $('rating').innerHTML=rating; 
		   $('statistics').style.visibility='visible';  
	         	if (m && (m[1] != SCRIPT.version)) {
	         	$('updatespan').innerHTML="<input type='submit' class='bttn' id='getupdatebttn' value='Click to update!'>";
	         	$("getupdatebttn").addEventListener("click", function(e) { top.location.href="http://userscripts.org/scripts/source/" + SCRIPT.id + ".user.js"; }, false); 
	         	} else { 
	         	$('updatespan').innerHTML="<input id='noupdatebttn' type='submit' class='bttn' value='No updates.'>";
	         	$('noupdatebttn').disabled=true;
	         	}
		 } 

	   } else if(details.readyState == 4 && details.status != 200){
		   $('updatespan').innerHTML="<input id='noupdatebttn' type='submit' class='bttn' value='ErrorCode "+ details.status +"'>";
	       $('noupdatebttn').disabled=true;
		   $('fans').innerHTML='<font color="#ff0000">x</font>';
		   $('installs').innerHTML='<font color="#ff0000">x</font>';
		   $('discussions').innerHTML='<font color="#ff0000">x</font>';
		   $('reviews').innerHTML='<font color="#ff0000">x</font>';   
		   $('rating').innerHTML='<font color="#ff0000">x</font>'; 
		   $('statistics').style.visibility='visible';
		   
		 } else	{ } 
		 
      }
    });
}


/////// no more cookies COOKIES
/* 
function getCookie(mwsize){
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==mwsize){
    return unescape(y);
    }
  }
}

function setCookie(mwsize,value,exdays){
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=mwsize + "=" + c_value;
}

*/
////////////////////////////////////////////////////////////
         // Spockholms imported modified code 	//
////////////////////////////////////////////////////////////

function loadInventory(){
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		unsafeWindow.User.clicks++;
		var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'xw_city': xw_city,
			'clicks': unsafeWindow.User.clicks
		};
		unsafeWindow.$.ajax({
			type: "POST",
			url: preurl+'xw_controller=inventory&xw_action=view&from_controller=inventory',
			data: params,
			cache: false,
			success: function(response){
			itemdatabase={};
			if (response.indexOf('ERROR') != -1) {  $('ErrorMsg').innerHTML+=response; }
			var ZyngaItems = unsafeWindow.jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
				//var ZyngaItems = unsafeWindow.jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
			for (x in ZyngaItems) {
				ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
				itemdatabase[ZyngaItems[x].id] = ZyngaItems[x]; //{quantity: ZyngaItems[x].quantity}  
				if (ZyngaItems[x].id > itemdblen){
				//if(ZyngaItems[x].name == 'Unseen Blade'){alert(JSON.stringify(ZyngaItems[x]))}
				itemdblen=ZyngaItems[x].id;
				}else{	}
			}
			window.setTimeout(grab_settings,50);
				
				
			},
			error: function(){
				$('ErrorMsg').innerHTML+='Requesting inventory failed :( <br>Close and retry ..';
				}
		});
	}

})()
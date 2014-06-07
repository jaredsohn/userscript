// ==UserScript==
// @name           Macedónok
// @description    csatajelentés
// @author         -
// @include        http://*.grepolis.com/*
// ==/UserScript==

if(location.href.match(/action=view/)) { 
  var auhOutput='';
  var aulOutput='';
  var duhOutput='';
  var dulOutput='';
  var resourcesOutput="";
  var imageURL = 'http://' + location.href.split('/')[2] + '/images/game/units/';
  for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
    if (document.getElementsByTagName('div')[c].getAttribute('class')=='menu_inner') {
      var MenuInner=document.getElementsByTagName('div')[c];
      break;
    }
  }
  townName = new Array();
  townOwner = new Array();
  townOwnerAlly = new Array();
  for(var c = 0; c < document.getElementsByTagName('li').length; c++) {
    if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_name') {
      if (document.getElementsByTagName('li')[c].innerHTML.match("<a")) townName.push(document.getElementsByTagName('li')[c].getElementsByTagName('a')[0].href.split("town_id=")[1].split("&")[0]);
    }
    if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner') {
      if (document.getElementsByTagName('li')[c].innerHTML.match(">")) townOwner.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
    }
    if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner_ally') {
      if (document.getElementsByTagName('li')[c].innerHTML.match(">")) townOwnerAlly.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
    }
  }
  var BerichtTitel = "[quote][b][ally]Macedónok[/ally] Jelentés konvertáló[/b]  [quote] [player]"+townOwner[0]+"[/player] [b]vs.[/b] [player]"+townOwner[1]+"[/player][/quote]";
  for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
    if (document.getElementsByTagName('div')[c].getAttribute('class')=='report_units_overview') {
      var ReportFormat=document.getElementsByTagName('div')[c];
      break;
    }
  }
  if (ReportFormat) {
    var ReportArea = document.createElement("textarea");
    ReportArea.setAttribute('id', 'ReportTextArea');
    ReportArea.setAttribute('onclick', 'this.select()');
    ReportArea.setAttribute('style', 'z-index: 1; position: absolute; top: 100px; left: 1px; display:none; border:0px; width:745px; height:250px;');
    ReportFormat.appendChild(ReportArea);
  }
  if (document.getElementById('ReportTextArea')) {
    var MenuLI = MenuInner.getElementsByTagName('ul').length-1;
    var BerichtMenue = document.createElement("div");
    BerichtMenue.setAttribute('style', 'float:left;');
    BerichtMenue.innerHTML='<a onclick="document.getElementById(\'ReportTextArea\').style.display=\'block\'" href="#" class="submenu_link"><span class="left">&nbsp;</span><span class="middle">Konvertáló</span><span class="right">&nbsp;</span>&nbsp;</a>';
    MenuInner.getElementsByTagName('ul')[MenuLI].insertBefore(BerichtMenue, MenuLI.nextSibling);
  }
  if (document.getElementById('report_booty_bonus_fight')) {
    var reportBBF = document.getElementById('report_booty_bonus_fight');
    for(var c = 0; c < reportBBF.getElementsByTagName('span').length; c++) {
      if (reportBBF.getElementsByTagName('span')[c].getAttribute('class')=='fight_bonus morale') {
        var morale = trim(reportBBF.getElementsByTagName('span')[c].innerHTML.split("</span>")[1]);
        if (typeof morale != 'undefine') var fight_bonus = morale;
      }
      if (reportBBF.getElementsByTagName('span')[c].getAttribute('class')=='fight_bonus luck') {
        var luck = trim(reportBBF.getElementsByTagName('span')[c].innerHTML.split("</span>")[1]);
        if (typeof luck != 'undefine') var fight_bonus = fight_bonus+"\n"+luck;
      }
      if (reportBBF.getElementsByTagName('span')[c].getAttribute('class')=='fight_bonus oldwall') {
        var oldwall = trim(reportBBF.getElementsByTagName('span')[c].innerHTML.split("</span>")[1]);
        if (typeof oldwall != 'undefine') var fight_bonus = fight_bonus+"\n"+oldwall;
      }
    }
    var fight_bonus = "[b]Bónuszok[/b]:\n\n[quote]"+fight_bonus+"";
  }
  if (document.getElementById('resources')) {
    var resources = document.getElementById('resources');
    for(var c = 0; c < resources.getElementsByTagName('div').length; c++) {
      if (resources.getElementsByTagName('div')[c].getAttribute('class')=='wood_img') {
        var wood = resources.getElementsByTagName('div')[c].parentNode.getElementsByTagName('span')[0].innerHTML;
      }
      if (resources.getElementsByTagName('div')[c].getAttribute('class')=='stone_img') {
        var stone = resources.getElementsByTagName('div')[c].parentNode.getElementsByTagName('span')[0].innerHTML;
      }
      if (resources.getElementsByTagName('div')[c].getAttribute('class')=='iron_img') {
        var iron = resources.getElementsByTagName('div')[c].parentNode.getElementsByTagName('span')[0].innerHTML;
      }
    }
    if (document.getElementById('load')) {
      var load = document.getElementById('load').innerHTML;
      resourcesOutput+="[/quote]\n\n[b] "+load+"[/b]\n\n";
    }    
    if (wood) resourcesOutput+="[quote]Fa: "+wood+"\n";
    if (stone) resourcesOutput+="Kő: "+stone+"\n";
    if (iron) resourcesOutput+="Ezüst: "+iron+"[/quote] ";
  }
 
  for(var c = 0; c < document.getElementsByTagName('script').length; c++) {
    if (document.getElementsByTagName('script')[c].innerHTML.match(/ReportViewer.initialize/)) {
      var ReportObj = document.getElementsByTagName('script')[c].innerHTML.split('ReportViewer.initialize(')[1].split(')')[0];
      if (typeof object2String(JSON.parse(ReportObj).result.att_units)  != 'undefine') {
        var attUnits = object2String(JSON.parse(ReportObj).result.att_units);
        if (attUnits.match("had:{")) {
          var attUnitsHad = attUnits.split("had:{")[1].split('},')[0].split(',');          
        }   
        if (attUnits.match("lost:{")) {
          var attUnitsLost = attUnits.split("lost:{")[1].split('}')[0].split(',');
        }             
      }
      if (typeof object2String(JSON.parse(ReportObj).result.def_units)  != 'undefine') {
        var def_units = object2String(JSON.parse(ReportObj).result.def_units);
        if (def_units.match("had:{")) {
          var defUnitsHad = def_units.split("had:{")[1].split('},')[0].split(',');
        }
        if (def_units.match("lost:{")) {
          var defUnitsLost = def_units.split("lost:{")[1].split('}')[0].split(',');
        }      
      }
      if (attUnitsHad) {
        for(var auh = 0; auh < attUnitsHad.length; auh++) {
          auhImage = '[img]'+imageURL+attUnitsHad[auh].split(':')[0]+'_40x40.png[/img]';
          auhUnits = attUnitsHad[auh].split(':')[1];
          auhOutput = auhOutput+auhImage+' '+auhUnits+' ';
        }
      } else var auhOutput = 'Nincs ';
      if (attUnitsLost) {
        for(var aul = 0; aul < attUnitsLost.length; aul++) {
          aulImage = '[img]'+imageURL+attUnitsLost[aul].split(':')[0]+'_40x40.png[/img]';
          aulUnits = attUnitsLost[aul].split(':')[1];  
          aulOutput = aulOutput+aulImage+' '+aulUnits+' ';    
        }
      } else var aulOutput = 'Nincs ';
      if (defUnitsHad) {
        for(var duh = 0; duh < defUnitsHad.length; duh++) {
          duhImage = '[img]'+imageURL+defUnitsHad[duh].split(':')[0]+'_40x40.png[/img]';
          duhUnits = defUnitsHad[duh].split(':')[1];  
          duhOutput = duhOutput+duhImage+' '+duhUnits+' ';     
        }
      } else var duhOutput = 'Nincs '; 
      if (defUnitsLost) {
        for(var dul = 0; dul < defUnitsLost.length; dul++) {
          dulImage = '[img]'+imageURL+defUnitsLost[dul].split(':')[0]+'_40x40.png[/img]';
          dulUnits = defUnitsLost[dul].split(':')[1];  
          dulOutput = dulOutput+dulImage+' '+dulUnits+' ';    
        }
      } else var dulOutput = 'Nincs '; 
      if (document.getElementById('ReportTextArea')) {
        document.getElementById('ReportTextArea').innerHTML = ""+BerichtTitel+"\n\n"+fight_bonus+resourcesOutput+"\n\n[b] Csapatok[/b]: [player]"+townOwner[0]+"[/player]\n\n[quote]"+auhOutput+"[/quote]\n\n[b]Veszteség[/b]: [player]"+townOwner[0]+"[/player]\n\n[quote]"+aulOutput+"[/quote]\n\n[b]Csapatok[/b]: [player]"+townOwner[1]+"[/player]\n\n[quote]"+duhOutput+"[/quote]\n\n[b]Veszteség[/b]: [player]"+townOwner[1]+"[/player]\n\n[quote]"+dulOutput+"[/quote]\n#########[ [b]Macedónok[/b] ]#########[/quote]\n[quote][url=http://hu.grepostats.com/world/hu2/alliance/6/members]Szövetség statisztika[/url] by:[player]Corvette[/player][/quote]";
      }
      break;
    }
  }  
}
function trim (zeichenkette) {
  return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
}
function object2String(obj) {
    var val, output = "";
    if (obj) {    
        output += "{";
        for (var i in obj) {
            val = obj[i];
            switch (typeof val) {
                case ("object"):
                    if (val[0]) {
                        output += i + ":" + array2String(val) + ",";
                    } else {
                        output += i + ":" + object2String(val) + ",";
                    }
                    break;
                case ("string"):
                    output += i + ":'" + escape(val) + "',";
                    break;
                default:
                    output += i + ":" + val + ",";
            }
        }
        output = output.substring(0, output.length-1) + "}";
    }
    return output;
}
function readData(Obj,method) {
    myData = JSON.parse(ReportObj, function (key, value) {
        var type;
        if (value && typeof value === 'object') {
            type = value.type;
            if (typeof type === 'string' && typeof window[type] === 'function') {
                return new (window[type])(value);
            }
        }
        if (key==method) rdOutput = value;
    });
    return rdOutput;
}
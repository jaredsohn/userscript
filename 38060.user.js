// Travian:RicercaUtenti
// ==UserScript==
// @name           Travian:Ricerca Utenti
// @Author         Baruch
// @email          srryicantsayit@midispmanonpossodirlo.it
// @namespace      http://travianscript.at.ua
// @description    Aggiunge una comoda barra di ricerca
// @version        7.12.30
// @include        http://*.travian.*/*.php*
// @exclude        http://*.travian.*/login.php
// @exclude        http://*.travian.*/logout.php
// @exclude        http://forum.travian.*
// ==/UserScript==



function createCookie(name,value,days){
  if (days){
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name){
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++){
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function trans(str){
  var tld = location.hostname.substring(location.hostname.lastIndexOf('.')+1,location.hostname.length);
  
  switch(tld){
    case "ae":
      lang = "ar";
      break;
    case "at":
    case "de":
    case "org":
      lang = "de";
      break;
    case "bg":
      lang = "bg";
      break;
    case "cz":
      lang = "cz";
      break;
    case "hu":
      lang = "hu";
      break;
    case "lt":
      lang = "lt";
      break;
    case "nl":
      lang = "nl";
      break;
    case "pl":
      lang = "pl";
      break;
    case "pt":
    case "br":
      lang = "pt";
      break;
    case "ru":
      lang = "ru";
      break;
    case "se":
      lang = "se";
      break;
    case "sk":
      lang = "sk";
      break;
    case "tr":
      lang = "tr";
      break;
	case "it":
	 lang = "it";
	 break;
    default:
      lang = "en";
  }

  if(lang == "en"){
    return str;
  }

  var langs = [];
  
  langs['ar'] = [];
  langs['ar']['Search'] = 'بحث';
  langs['ar']['Players'] = 'لاعبين';
  langs['ar']['Villages'] = 'قرى';
  langs['ar']['Alliances'] = 'تحالفات';
  langs['ar']['Attackers'] = 'مهاجمين';
  langs['ar']['Defenders'] = 'مدافعين';
  
  langs['bg'] = [];
  langs['bg']['Search'] = 'Търси';
  langs['bg']['Players'] = 'Играч';
  langs['bg']['Villages'] = 'Град';
  langs['bg']['Alliances'] = 'Клан';
  langs['bg']['Attackers'] = 'Атака';
  langs['bg']['Defenders'] = 'Защита';

  langs['cz'] = [];
  langs['cz']['Search'] = 'Hledat';
  langs['cz']['Players'] = 'Hráči';
  langs['cz']['Villages'] = 'Vesnice';
  langs['cz']['Alliances'] = 'Aliance';
  langs['cz']['Attackers'] = 'Útočníci';
  langs['cz']['Defenders'] = 'Obránci';

  langs['de'] = [];
  langs['de']['Search'] = 'Suchen';
  langs['de']['Players'] = 'Spieler';
  langs['de']['Villages'] = 'Dörfer';
  langs['de']['Alliances'] = 'Allianzen';
  langs['de']['Attackers'] = 'Angreifer';
  langs['de']['Defenders'] = 'Verteidiger';

  langs['hu'] = [];
  langs['hu']['Search'] = 'Keresés';
  langs['hu']['Players'] = 'Játékosok';
  langs['hu']['Villages'] = 'Falvak';
  langs['hu']['Alliances'] = 'Klánok';
  langs['hu']['Attackers'] = 'Támadók';
  langs['hu']['Defenders'] = 'Védők';
  
  langs['lt'] = [];
  langs['lt']['Search'] = 'Paieška';
  langs['lt']['Players'] = 'Žaidėjai';
  langs['lt']['Villages'] = 'Gyvenvietės';
  langs['lt']['Alliances'] = 'Aljansai';
  langs['lt']['Attackers'] = 'Atakuojantys';
  langs['lt']['Defenders'] = 'Besigynantys';
  
  langs['nl'] = [];
  langs['nl']['Search'] = 'Zoeken';
  langs['nl']['Players'] = 'Spelers';
  langs['nl']['Villages'] = 'Dorpen';
  langs['nl']['Alliances'] = 'Allianties';
  langs['nl']['Attackers'] = 'Aanvallers';
  langs['nl']['Defenders'] = 'Verdedigers';

  langs['pl'] = [];
  langs['pl']['Search'] = 'Szukaj';
  langs['pl']['Players'] = 'Gracze';
  langs['pl']['Villages'] = 'Osady';
  langs['pl']['Alliances'] = 'Sojusze';
  langs['pl']['Attackers'] = 'Napastnicy';
  langs['pl']['Defenders'] = 'Obrońcy';

  langs['pt'] = [];
  langs['pt']['Search'] = 'Pesquisar';

  langs['pt']['Players'] = 'Jogador';
  langs['pt']['Villages'] = 'Aldeias';
  langs['pt']['Alliances'] = 'Alianças';
  langs['pt']['Attackers'] = 'Ataque';
  langs['pt']['Defenders'] = 'Defesa';

  langs['ru'] = [];
  langs['ru']['Search'] = 'Найти';
  langs['ru']['Players'] = 'Игроки';
  langs['ru']['Villages'] = 'Деревни';
  langs['ru']['Alliances'] = 'Альянсы';
  langs['ru']['Attackers'] = 'Атака';
  langs['ru']['Defenders'] = 'Защита';

  langs['se'] = [];
  langs['se']['Search'] = 'Sök';
  langs['se']['Players'] = 'Spelare';
  langs['se']['Villages'] = 'By';
  langs['se']['Alliances'] = 'Allians';
  langs['se']['Attackers'] = 'Off';
  langs['se']['Defenders'] = 'För';

  langs['sk'] = [];
  langs['sk']['Search'] = 'Hľadať';
  langs['sk']['Players'] = 'Hráči';
  langs['sk']['Villages'] = 'Dediny';
  langs['sk']['Alliances'] = 'Aliancie';
  langs['sk']['Attackers'] = 'Útočníci';
  langs['sk']['Defenders'] = 'Obranci';
  
  langs['tr'] = [];
  langs['tr']['Search'] = 'Arama';
  langs['tr']['Players'] = 'Oyuncu';
  langs['tr']['Villages'] = 'Köy';
  langs['tr']['Alliances'] = 'Birlik';
  langs['tr']['Attackers'] = 'Saldırı';
  langs['tr']['Defenders'] = 'Savunma';
 
 langs['it'] = [];
  langs['it']['Search'] = 'Cerca';
  langs['it']['Players'] = 'Giocatori';
  langs['it']['Villages'] = 'Villaggi';
  langs['it']['Alliances'] = 'Alleanze';
  langs['it']['Attackers'] = 'Attaccanti';
  langs['it']['Defenders'] = 'Difensori';
  
  if(langs[lang][str] != null){
    return langs[lang][str];
  }
  return str;
}

function selected(opt){
  var selectedOption = readCookie('traviansearch_selected_option');
  if(opt == selectedOption){
    return ' selected="yes" ';
  }
  
  return false;
}

window.selectOption = function(opt){
  if(opt != "" && opt != 0){
    document.getElementById('hidden_field_placeholder').innerHTML='<input type="hidden" name="id" value="' + opt + '">';
    createCookie('traviansearch_selected_option',Number(opt),365);
  }else{
    document.getElementById('hidden_field_placeholder').innerHTML='';
    createCookie('traviansearch_selected_option',0,365);
  }
}

var searchform = '<form action="statistiken.php" method="POST" style="padding:10px; border:1px solid #c0c0c0;width:98%;margin-bottom:10px;-moz-border-radius:5px;" id="searchform">';
searchform += '<span id="hidden_field_placeholder"></span>';
searchform += '<input type="text" maxlength="20" size="10" value="" name="spieler" id="searchbox_player" class="fm f80" style="margin:2px;" />';
searchform += '<select class="fm f80" style="margin:2px; padding:1px;" id="opsel">';
searchform += '<option value="0"' + selected(0) + '>' + trans('Players') + '</option>';
searchform += '<option value="2"' + selected(2) + '>' + trans('Villages') + '</option>';
searchform += '<option value="4"' + selected(4) + '>' + trans('Alliances') + '</option>';
searchform += '<option value="31"' + selected(31) + '>' + trans('Attackers') + '</option>';
searchform += '<option value="32"' + selected(32) + '>' + trans('Defenders') + '</option>';
searchform += '</select>';
searchform += '<input type="submit" value="' + trans('Search') + '" class="std" />';
searchform += '</form>';

var rightSidebar = document.getElementById('lright1');
if(!rightSidebar){
  var lright1DIV = document.createElement('div');
  var lmidlcDIV = document.getElementById('lmidlc');
  
  lright1DIV.setAttribute('id','lright1');
  rightSidebar = lmidlcDIV.parentNode.appendChild(lright1DIV);
}
rightSidebar.innerHTML = searchform + rightSidebar.innerHTML;


window.addEventListener("load", function(e) {
  var cookieVal = readCookie('traviansearch_selected_option');
  
  if(cookieVal){
    selectOption(cookieVal);
  }
  
  document.getElementById('opsel').addEventListener("change",function(){
    selectOption(this.value);
    document.getElementById("searchbox_player").focus();
  },false);
}, false);
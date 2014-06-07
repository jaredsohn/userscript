/* TEM LA FIRME - Meteo

Creation (MM/JJ/AAAA): 03/22/2007
Gillou
http://lggillou.free.fr/script/temweather.user.js

Teste sous GreaseMonkey 0,8.20091209.4

Script sous license Creative Commons (http://creativecommons.org/licenses/by-nc-nd/2.0/fr/)

*/




// ==UserScript==
// @name           TEM La Firme - Weather
// @version        V0.2 Build 013
// @namespace      TEM La Firme - Weather
// @description    Rempli automatiquement le panneau des sorties programmées en fonction de votre configuration
// @include        http://www.tem-la-firme.com/bunker*
// ==/UserScript==






/* RELEASE
   -------------------------------------------------- */

var ScriptName = 'TEM La Firme - Weather';                            // Nom du script
var ScriptVersion = '0.2';                                            // Version du script pour les mises a jour majeures
var ScriptBuild = '013';                                              // Sous-version du script pour les mises a jour mineures
var ScriptDate = '12/13/2009';                                        // Date de la publication (MM/JJ/AAAA)

/* SCRIPT
   -------------------------------------------------- */

var ServerMinuteOfChangingWeather = 10; // Minute de chaque heure a partir de laquelle le vent change

function GMsetValue(Name, Value) {
  window.setTimeout(function(){GM_setValue(Name, Value);}, 0);
}
unsafeWindow.GMsetValue = GMsetValue;

function GetField(String, Index, SeparatorKey) {
  if (String.length > 0) {
    var A_Get = new Array();
    A_Get = String.split(SeparatorKey);
    if (A_Get.length > Index) {
      return A_Get[Index];
    }
  }
  return '';
}

function RSet(string, length, character) { // Ajoute X caractere a gauche pour avoir la longueur voulu
  string = new String(string); // Pour etre sur que c'est bien un string
  if (string.length >= length) {
    return string;
  }
  else if (character.length == 1) {
    for (var i = 0; i < (length-string.length+1); i++) {
      string = character+string;
    }
    return string;
  }
}

function caseInsensitiveSort(a, b) { // Tri sans tenir compte de la casse
  var ret = 0;
  a = a.toLowerCase();
  b = b.toLowerCase();
  if(a > b)
  ret = 1;
  if(a < b)
  ret = -1;
  return ret;
}

//-------------------------------------------

function P_Out(name, out, hStart, hEnd) {
  this.name = name;
  this.out = out;
  this.hStart = hStart;
  this.hEnd = hEnd;
}

function P_Weather(name, checked) {
  this.name = name;
  this.checked = checked;
}

function SetWeather() {
  var Div = document.getElementById('centre');
  var DivSub = Div.getElementsByTagName('div')[0].getElementsByTagName('div');
  var inc = 0;
  
  for (var k = 1; k < DivSub.length; k++) {
    var Divs = DivSub[k].getElementsByTagName('div');
    
    if (DivSub[k].getElementsByTagName('input').length == 2) {
      var InputName = DivSub[k].getElementsByTagName('input')[0].name;
      
      for (var j = 0; j < Divs.length; j++) {
        for (var i = 0; i < A_Weather.length; i++) {
          if (Divs[j].innerHTML.match(A_Weather[i].name)) {
            inc++;
            if ((A_Weather[i].checked == false) || (inc == 24)) {
              document.getElementsByName(InputName)[0].checked = true;
              document.getElementsByName(InputName)[1].checked = false;
            }
            else {
              document.getElementsByName(InputName)[0].checked = false;
              document.getElementsByName(InputName)[1].checked = true;
            }
          }
        }
      }
    }
  }
  
  if (inc < 24) {
    alert('Un ou plusieurs vents sont inconnus!\nVeuillez les ajouter via le panneau de configuration des vents.');
  }
}
unsafeWindow.SetWeather = SetWeather;

function SaveOut() {
  var Div = document.getElementById('centre');
  var DivSub = Div.getElementsByTagName('div')[0].getElementsByTagName('div');
  var inc = 0;
  var A_Out = new Array();
  
  for (var k = 1; k < DivSub.length; k++) {
    var Divs = DivSub[k].getElementsByTagName('div');
    
    if (DivSub[k].getElementsByTagName('input').length == 2) {
      var InputName = DivSub[k].getElementsByTagName('input')[0].name;
      
      for (var j = 0; j < Divs.length; j++) {
        for (var i = 0; i < A_Weather.length; i++) {
          if (Divs[j].innerHTML.match(A_Weather[i].name)) {
            inc++;
            A_Out[inc-1] = new P_Out(A_Weather[i].name, ((document.getElementsByName(InputName)[0].checked == false)?'Sortie':'Retour'), 0, 0);
          }
        }
      }
    }
  }
  
  if (A_Out.length == 24) {
    var date = new Date();
    var hStart = date.getHours();
    var mStart = date.getMinutes();
    if (mStart > ServerMinuteOfChangingWeather) { if (hStart == 23) { hStart=0 } else { hStart=hStart+1; } }
    for (var i = 0; i < A_Out.length; i++) {
      var Value = A_Out[i].name+'|'+A_Out[i].out+'|'+((parseInt(hStart+i)>23)?parseInt(hStart+i-24):parseInt(hStart+i));
      GMsetValue('H'+i, Value);
    }
    GMsetValue('Start', ''+date.getTime());
  }
  
  
}
unsafeWindow.SaveOut = SaveOut;

function getServerTime() {
  if (document.getElementById('console')) {
    var Div = document.getElementById('console');
    if (Div.getElementsByTagName('script')) {
      var Script = Div.getElementsByTagName('script');
      var ScriptTime = '';
      for (var k = 0; k < Script.length; k++) {
        if (Script[k].innerHTML.match(/disp_clock\(/)) {
          ScriptTime = Script[k].innerHTML.match(/disp_clock\(\'([0-9]+)\'\,\'([0-9\-]+)\'\,\'([0-9\-]+)/);//'
        }
      }
      if (ScriptTime.length > 0) {
        var StartTime = ScriptTime[2].split('-');
        var EndTime = ScriptTime[3];
        return new Date('20' + StartTime[0] + '/' + StartTime[1] + '/' + StartTime[2] + ' ' + StartTime[3] + ':' + StartTime[4] + ':' + StartTime[5]);
      }
    }
  }
  else if (document.title.match(/([^\@]+)\[([0-9]+)\s\:\s([0-9]+)\s\:\s([0-9]+)\]([^\@]+)/)) {
    var currentTitle = document.title.match(/([^\@]+)\[([0-9]+)\s\:\s([0-9]+)\s\:\s([0-9]+)\]([^\@]+)/);
    var date = new Date();
    return new Date(date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + currentTitle[2] + ':' + currentTitle[3] + ':' + currentTitle[4]);
  }
  return new Date();
}

function ShowOut() {
  var date = getServerTime();
  var Hour = date.getHours();
  var Min = date.getMinutes();
  if (date.getTime()-dateOut > 86400000) {
    alert('Il n\'y a pas de programmation en m\351moire.');
  }
  else {
    var Value = '';
    date.setTime(dateOut);
    var HourOut = date.getHours();
    date = new Date();
    if (Hour > HourOut || date.getTime()-dateOut > 3600000) {
      var Begin = true;
    }
    else {
      var Begin = false
    } 
    for (var i = 0; i < 24; i++) {
      if (((Hour == A_Out[i].hStart && Min >= ServerMinuteOfChangingWeather) || (Hour == A_Out[i].hEnd && Min < ServerMinuteOfChangingWeather)) && Begin == true) {
        Value += '['+RSet(A_Out[i].hStart, 2, '0')+':'+RSet(A_Out[i].hEnd, 2, '0')+']\t '+A_Out[i].out+'\t '+A_Out[i].name+'\n';
      }
      else {
        Value += ' '+RSet(A_Out[i].hStart, 2, '0')+':'+RSet(A_Out[i].hEnd, 2, '0')+'\t '+A_Out[i].out+'\t '+A_Out[i].name+'\n';
      }
    }
    alert(Value);
  }
}
unsafeWindow.ShowOut = ShowOut;

function Reload() {
  DivForm.innerHTML = Content;
  SetWeather();
}
unsafeWindow.Reload = Reload;

function LoadWeatherDiv(index, name, checked) {
  var Background;
  if (checked == false) {
    Background = '../images/bunker/logistique/choice_02.gif';
  }
  else {
    Background = '../images/bunker/logistique/choice_01.gif';
  }

  var DivWeather = document.createElement('div');
  DivWeather.setAttribute('style', 'position:relative;top:0px;left:0px;width:427px;height:84px;background-image:url('+Background+');background-repeat:no-repeat;');
  DivWeather.setAttribute('id', 'weather'+index);
  
  var DivBunker = document.createElement('div');
  DivBunker.setAttribute('class', 'scroll');
  DivBunker.setAttribute('style', 'position:absolute;top:30px;left:273px; line-height:9px;');
  DivBunker.innerHTML = 'Bunker<br />Retour';
  
  var DivSortir = document.createElement('div');
  DivSortir.setAttribute('class', 'scroll');
  DivSortir.setAttribute('style', 'position:absolute;top:35px;left:357px; line-height:9px;');
  DivSortir.innerHTML = 'Sortir';
  
  var DivDelete = document.createElement('div');
  DivDelete.setAttribute('class', 'scroll');
  DivDelete.setAttribute('style', 'position:absolute;top:11px;left:112px;');
  DivDelete.innerHTML = '<a style="cursor:pointer" onclick="DeleteWeather('+index+')">Supprimer</a>';
  
  var DivName = document.createElement('div');
  DivName.setAttribute('class', 'scroll');
  DivName.setAttribute('style', 'position:absolute;top:33px;left:22px;');
  DivName.innerHTML = name;
  
  var DivFalse = document.createElement('div');
  DivFalse.setAttribute('style', 'position:absolute;top:54px;left:278px;');
  DivFalse.innerHTML = '<input name="radio'+index+'" type="radio" value="0" '+(checked==false?'checked':'')+
  ' onClick="document.getElementById(\'weather'+index+'\').style.background=\'url(../images/bunker/logistique/choice_02.gif)\';" />';
  
  var DivTrue = document.createElement('div');
  DivTrue.setAttribute('style', 'position:absolute;top:54px;left:359px;');
  DivTrue.innerHTML = '<input name="radio'+index+'" type="radio" value="1" '+(checked==true?'checked':'')+
  ' onClick="document.getElementById(\'weather'+index+'\').style.background=\'url(../images/bunker/logistique/choice_01.gif)\';" />';
  
  DivWeather.appendChild(DivBunker);
  DivWeather.appendChild(DivSortir);
  DivWeather.appendChild(DivDelete);
  DivWeather.appendChild(DivName);
  DivWeather.appendChild(DivFalse);
  DivWeather.appendChild(DivTrue);
  DivForm.getElementsByTagName('form')[0].appendChild(DivWeather);
}
unsafeWindow.LoadWeatherDiv = LoadWeatherDiv;

function DeleteWeather(index) {
  A_WeatherTmp = new Array();
  var j = 0;
  for (var i = 0; i < A_Weather.length; i++) {
    if (i != index) {
      A_WeatherTmp[j] = A_Weather[i];
      j++;
    }
  }
  A_Weather = new Array();
  A_Weather = A_WeatherTmp;
  Config();
}
unsafeWindow.DeleteWeather = DeleteWeather;

function AddWeather() {
  var name = document.getElementById('weatherName').value;
  if (name.length > 0) {
    var found = false;
    for (var i = 0; i < A_Weather.length; i++) {
      if (A_Weather[i].name == name) {
        found = true;
      }
    }
    if (found == false) {
      A_Weather[A_Weather.length] = new P_Weather(name, false);
      Config();
    }
    else {
      alert('Ce temps existe d\351j\340.');
    }
  }
  else {
    alert('Vous devez saisir un temps.');
  }
}
unsafeWindow.AddWeather = AddWeather;

function SaveWeather() {
  var Weather= '';
  var check;
  for (var i = 0; i < A_Weather.length; i++) {
    check = document.getElementsByName('radio'+i)[1].checked;
    A_Weather[i].checked = check;
    Weather += A_Weather[i].name+'='+(check==true?'1':'0');
    if (i < A_Weather.length-1) {
      Weather += '|';
    }
  }
  GMsetValue('Weather', Weather);
  alert('Les param\350tres ont \351t\351 sauv\351s.');
}
unsafeWindow.SaveWeather = SaveWeather;

function Config() {
  DivForm.removeChild(DivForm.getElementsByTagName('form')[0]);
  
  var Form = document.createElement('form');
  DivForm.appendChild(Form);
  
  for (var i = 0; i < A_Weather.length; i++) {
    LoadWeatherDiv(i, A_Weather[i].name, A_Weather[i].checked);
  } 
  
  var DivAdd = document.createElement('div');
  DivAdd.setAttribute('id', 'divAdd');
  DivAdd.content = 'Temps&nbsp;';
  var InputName = document.createElement('input');
  InputName.setAttribute('type','text');
  InputName.setAttribute('id','weatherName');
  InputName.setAttribute('name','weatherName');
  DivAdd.appendChild(InputName);
  DivForm.appendChild(DivAdd);
  var ButtonAdd = document.createElement('input');
  ButtonAdd.setAttribute('type','button');
  ButtonAdd.setAttribute('id','addWeather');
  ButtonAdd.setAttribute('name','addWeather');
  ButtonAdd.setAttribute('value','Ajouter');
  ButtonAdd.setAttribute('onclick', 'AddWeather()');
  DivAdd.appendChild(ButtonAdd);
  Form.appendChild(DivAdd);

  var DivSave = document.createElement('div');
  DivSave.setAttribute('id', 'divSave');
  var ButtonSave = document.createElement('input');
  ButtonSave.setAttribute('type','button');
  ButtonSave.setAttribute('id','saveConfig');
  ButtonSave.setAttribute('name','saveConfig');
  ButtonSave.setAttribute('value','Sauver');
  ButtonSave.setAttribute('onclick', 'SaveWeather();Reload()');
  DivSave.appendChild(ButtonSave);
  DivForm.appendChild(DivSave);
  var ButtonCancel = document.createElement('input');
  ButtonCancel.setAttribute('type','button');
  ButtonCancel.setAttribute('id','cancelConfig');
  ButtonCancel.setAttribute('name','cancelConfig');
  ButtonCancel.setAttribute('value','Annuler');
  ButtonCancel.setAttribute('onclick', 'Reload()');
  DivSave.appendChild(ButtonCancel);
  Form.appendChild(DivSave);
}
unsafeWindow.Config = Config;

var img64 = 'data:image/gif;base64,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';

var DefaultWeather = 'Aucun vent signal\351=1|'+
'Le flux de Thunupa=0|'+
'Le porteur d\'Espoir=1|'+
'La m\351lancolie de Thorn=0|'+
'Arcadia Planitia=0|'+
'L\'haleine terreuse=0|'+
'Le Bouclier Noir=0|'+
'La vague Viking=0|'+
'La Turbine=0|'+
'Intihuatana=0|'+
'L\'Avalanche=0|'+
'La t\352te de fer=0|'+
'L\'esprit de Pilia l\'ancien=0|'+
'La Force du Woukhataa=0|'+
'La parole sableuse=0|'+
'L\'abstrus Corpus=1|'+
'Big Quake breath=0|'+
'Les Corridors de N\351cropolia=0|'+
'Le Hululeur=0|'+
'La Pouss\351e Chaude=1|'+
'Terres lugubres=0|'+
'Brouillard de pierre=0|'+
'Le Souffle de Grave Digger=0|'+
'Mort froide=0|'+
'Le Tamanduar\351=0|'+
'Crachin granuleux=0';
var Weather = GM_getValue('Weather', DefaultWeather);

var A_Weather = new Array();
var A_Get = Weather.split('|');
A_Get.sort(caseInsensitiveSort);
for (var i = 0; i < A_Get.length; i++) {
  A_Weather[i] = new P_Weather(GetField(A_Get[i], 0, '='), (GetField(A_Get[i], 1, '=')=='1'?true:false));
}

var dateOut = parseInt(GM_getValue('Start', '0'));
var A_Out = new Array();
var Separator = new RegExp("[|]+", "g");
for (var i = 0; i < 24; i++) {
  var get = GM_getValue('H'+i, '');
  var H = parseInt(GetField(get, 2, Separator));
  var Out = GetField(get, 1, Separator);
  var Name = GetField(get, 0, Separator);
  var HEnd = ((H == 23) ? 0 : H+1);
  A_Out[i] = new P_Out(Name, Out, H, HEnd);
}

if (document.getElementById('centre') && document.getElementsByName('submit')) {
  var Div = document.getElementById('centre');
  if (Div.getElementsByTagName('div').length > 0) {
    var A_Div = Div.getElementsByTagName('div')[0].getElementsByTagName('div');
    var IndexSubmit = -1;
    for (var i = 0; i < A_Div.length; i++) {
      if (A_Div[i].innerHTML.match('submit')) {
        IndexSubmit = i;
      }
    }
    if (IndexSubmit > -1 && document.getElementsByName('submit').length > 0) {
      if (document.getElementsByName('submit')[0].value == 'Valider cette programmation') {
      
        var DivSub = Div.getElementsByTagName('div')[0].getElementsByTagName('div');
        var DivForm = Div.getElementsByTagName('div')[0];
        
        A_Div[IndexSubmit].removeChild(document.getElementsByName('submit')[0]);
        
        var ButtonSubmit = document.createElement('input');
        ButtonSubmit.setAttribute('type','submit');
        ButtonSubmit.setAttribute('id','submit');
        ButtonSubmit.setAttribute('name','submit');
        ButtonSubmit.setAttribute('value','Valider cette programmation');
        ButtonSubmit.setAttribute('style', 'position:absolute;top:14px;left:50px;background-color:#FF0000;color:#FFFFFF;width:190px');
        ButtonSubmit.setAttribute('onclick', 'SaveOut(); return true;');
        A_Div[IndexSubmit].appendChild(ButtonSubmit);
        
        var ButtonConfig = document.createElement('input');
        ButtonConfig.setAttribute('type','button');
        ButtonConfig.setAttribute('id','config');
        ButtonConfig.setAttribute('name','config');
        ButtonConfig.setAttribute('value','Configurer les temps');
        ButtonConfig.setAttribute('style', 'position:absolute;top:14px;left:250px;background-color:#FF0000;color:#FFFFFF;width:140px;');
        ButtonConfig.setAttribute('onclick', 'Config()');
        A_Div[IndexSubmit].appendChild(ButtonConfig);
        
        DivForm.id = 'formSubmit';
        var Content = DivForm.innerHTML;
        
        SetWeather();
      }
    }
  }
}

if (document.getElementById('basdepage')) {
  var div = document.getElementById('basdepage');
  if (div.getElementsByTagName('div').length > 0) {
    var divButton = div.getElementsByTagName('div')[0];
    var CheckOut = document.createElement('a');
    CheckOut.setAttribute('href', '#');
    CheckOut.setAttribute('onclick', 'javascript:ShowOut();');
    CheckOut.setAttribute('style', 'border:0px;');
    CheckOut.innerHTML = '<img src="'+img64+'" alt="Sorties" border="0" />';
    divButton.innerHTML = '';
    divButton.appendChild(CheckOut);
  }
}

var CSSStr = '#formSubmit a {text-decoration:none;}'+
'#formSubmit a:link,a:visited{color:#EAD896}'+
'#formSubmit a:hover{color:#FFFFFF;}'+
'#divSave, #divAdd {position:relative;top:0px;left:0px;width:427px;height:52px;background-image:url(../images/bunker/logistique/planificateur_validation.gif);background-repeat:no-repeat;}'+
'#addWeather {position:absolute;top:14px;left:220px;background-color:#FF0000;color:#FFFFFF;width:160px}'+
'#weatherName {position:absolute;top:14px;left:50px;width:160px;background-color:#310808;color:#EAD896}'+
'#saveConfig {position:absolute;top:14px;left:50px;background-color:#FF0000;color:#FFFFFF;width:160px}'+
'#cancelConfig {position:absolute;top:14px;left:220px;background-color:#FF0000;color:#FFFFFF;width:160px}';

GM_addStyle(CSSStr);

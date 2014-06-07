// ==UserScript==
// @name           Matchid_anzeigen
// @namespace      matchid
// @version        1.1
// @date           2010-06-29
// @description    Zeigt die Match-ID im goalkick.cs an
// @include        http://www.torschuss.ch/*?link=tip
// @include        http://www.goalkick.ch/*?link=tip
// @include        http://www.goal-kick.ch/*?link=tip
// @include        http://www.wm2010.3imedia.de
// @include        http://wm2010.3imedia.de
// ==/UserScript==


function stristr(haystack, needle, bool) {
  // Finds first occurrence of a string within another, case insensitive  
  // version: 1006.1915
  // discuss at: http://phpjs.org/functions/stristr
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfxied by: Onno Marsman
  var pos = 0;
  haystack += '';
  pos = haystack.toLowerCase().indexOf( (needle+'').toLowerCase() );    if (pos == -1){
    return false;
  } else{
    if (bool) {
      return haystack.substr( 0, pos );
    } else {
      return haystack.slice( pos );
    }
  }
}

function makeVisCaller(){
  var inputs = document.getElementsByTagName("input");
  var aTags = document.getElementsByTagName("a");
  makeVisible(inputs,aTags);
}

function makeVisible(inputs,aTags){
  for(var i = 0, n = inputs.length; i < n; i++){
    if(inputs[i].name.substr(0,7) == "matchid"){
      var st = document.createTextNode('Tipps anzeigen');
      var s = document.createElement('a');
      s.appendChild(st);
      s.href='http://www.torschuss.ch/clients/c19812/goalkick_main/frame.php?matchid='+inputs[i].value+'&link=tipsoffriends';
      s.target='_blank';
      s.style.textDecoration='none';
      s.className='link';
      inputs[i].parentNode.appendChild(s);
    }
  }
  
  var appendA = new Array();
  for(var i = 0, n = aTags.length; i < n; i++){
    if(stristr(aTags[i].href,"matchid") && stristr(aTags[i].href,"matchranking")){
      var alink = aTags[i].href;
      aLink = alink.substr(63,10);
      var st = document.createTextNode('Tipps anzeigen');
      var s = document.createElement('a');
      s.appendChild(st);
      s.href='http://www.torschuss.ch/clients/c19812/goalkick_main/frame.php?'+aLink+'&link=tipsoffriends';
      s.target='_blank';
      s.style.textDecoration='none';
      s.className='link';
      appendA[appendA.length] = new Array(s,aTags[i]);
    }
  }
  for(var i = 0, n = appendA.length; i < n; i++){
    appendA[i][1].parentNode.appendChild(appendA[i][0]);
  }
}

var headlines = document.getElementsByTagName("h1");
var isTipSite = false;
for(var i = 0, n = headlines.length; i < n; i++){
  if(headlines[i].innerHTML == "Tippen") {
    isTipSite = true;
    break;
  }
}

if(isTipSite){
  makeVisCaller();
}


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_140', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_140', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=140&version=1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();
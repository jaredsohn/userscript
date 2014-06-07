// ==UserScript==
// @name           Freeblog.hu humancheck
// @version        10.03.14
// @namespace      http://userscripts.org
// @include        http://*.hu/archives/*
// ==/UserScript==


function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

window.addEventListener('load', function(e){
  if(!document.getElementById('blossom-humancheck')){
    return;
  }
  
  if(document.getElementById('blossom-humancheck').getAttribute('class') == 'bhc-Calendar'){
    
    var napok = ['vasárnap','hétfő','kedd','szerda','csütörtök','péntek','szombat'];
    document.getElementById('blossom-comment-C-HCValue').value = napok[new Date().getDay()];
    
  }else{
    
    var re = /Mennyi (\S+) ([+|-]) (\S+)\?/;
    var matches = re.exec($x('id("blossom-humancheck")/label')[0].innerHTML);
    var szamok = [];
    szamok['nulla'] = 0;
    szamok['egy'] = 1;
    szamok['kettő'] = 2;
    szamok['három'] = 3;
    szamok['négy'] = 4;
    szamok['öt'] = 5;
    szamok['hat'] = 6;
    szamok['hét'] = 7;
    szamok['nyolc'] = 8;
    szamok['kilenc'] = 9;
    szamok['tíz'] = 10;
    szamok['tizenegy'] = 11;
    szamok['tizenkettő'] = 12;
    szamok['tizenhárom'] = 13;
    szamok['tizennégy'] = 14;
    szamok['tizenöt'] = 15;
    szamok['tizenhat'] = 16;
    szamok['tizenhét'] = 17;
    szamok['tizennyolc'] = 18;
    szamok['tizenkilenc'] = 19;
    szamok['húsz'] = 20;
    szamok['huszonegy'] = 21;
    szamok['huszonkettő'] = 22;
    szamok['huszonhárom'] = 23;
    szamok['huszonnégy'] = 24;
    szamok['huszonöt'] = 25;
    szamok['huszonhat'] = 26;
    szamok['huszonhét'] = 27;
    szamok['huszonnyolc'] = 28;
    szamok['huszonkilenc'] = 29;
    szamok['harminc'] = 30;
    szamok['0'] = 0;
    szamok['1'] = 1;
    szamok['2'] = 2;
    szamok['3'] = 3;
    szamok['4'] = 4;
    szamok['5'] = 5;
    szamok['6'] = 6;
    szamok['7'] = 7;
    szamok['8'] = 8;
    szamok['9'] = 9;
    szamok['10'] = 10;
    szamok['11'] = 11;
    szamok['12'] = 12;
    szamok['13'] = 13;
    szamok['14'] = 14;
    szamok['15'] = 15;
    szamok['16'] = 16;
    szamok['17'] = 17;
    szamok['18'] = 18;
    szamok['19'] = 19;
    szamok['20'] = 20;
    szamok['21'] = 21;
    szamok['22'] = 22;
    szamok['23'] = 23;
    szamok['24'] = 24;
    szamok['25'] = 25;
    szamok['26'] = 26;
    szamok['27'] = 27;
    szamok['28'] = 28;
    szamok['29'] = 29;
    szamok['30'] = 30;
    
    switch(matches[2]){
      case '-':
        document.getElementById('blossom-comment-C-HCValue').value = szamok[matches[1]] - szamok[matches[3]];
        break;
      case '+':
        document.getElementById('blossom-comment-C-HCValue').value = szamok[matches[1]] + szamok[matches[3]];
        break;
    }
    
  }
  
}, false);
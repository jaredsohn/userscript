// ==UserScript==
// @name           Player SP Worth
// @namespace      GLB
// @description    Calculate total SP worth of a player.
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==

var dojoElement = document.getElementById('dojoscript');
if (dojoElement == null) {
    var script = document.createElement('script');
    script.id = 'dojoElement';
    script.src="http://o.aolcdn.com/dojo/1.2.3/dojo/dojo.xd.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}

function getElementsByClassName(classname, par)
{
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){      
      if(re.test(els[i].className))
      { a.push(els[i]); }
   }
   return a;
};

window.addEventListener('load', function(event) {

  var SPvalue = 0
  var SPvalueNEQ = 0
  var inetAddress = window.location+"";
  page = ""

  if (inetAddress.match("skill_points.pl") != null) { 
    page = "skill_points"
    var attribList = getElementsByClassName('attribute_value',document) 
  }
  else if (inetAddress.match("player.pl") != null) { 
    page = "profile"
    var attribList = getElementsByClassName('stat_head_tall',document) 
  }


  for(var i=0;i<attribList.length;++i) {
    if (page == "skill_points")
    { 
      attribVal = parseFloat(attribList[i].innerHTML)
      eqVal = 0 
    }
    else if (page == "profile")
    { 
      attribVal = parseFloat(attribList[i].nextSibling.innerHTML) 
      EQtest = attribList[i].nextSibling.innerHTML.indexOf("+")
      eqVal = 0
      if (EQtest >= 0)
      { eqVal = parseFloat(attribList[i].nextSibling.innerHTML.substring(EQtest)) }
    }
    SPvalue = SPvalue + attribVal
    attribValNEQ = attribVal - eqVal
    SPvalueNEQ = SPvalueNEQ + attribValNEQ
    if (attribVal > 48.06) 
    { SPvalue = SPvalue + (attribVal-48.06) }
    if (attribVal > 60.51) 
    { SPvalue = SPvalue + (attribVal-60.51) }
    if (attribVal > 67.97) 
    { SPvalue = SPvalue + (attribVal-67.97) }
    if (attribVal > 73.24) 
    { SPvalue = SPvalue + (attribVal-73.24) }
    if (attribVal > 77.28) 
    { SPvalue = SPvalue + (attribVal-77.28) }
    if (attribVal > 80.53) 
    { SPvalue = SPvalue + (attribVal-80.53) }
    if (attribVal > 83.25) 
    { SPvalue = SPvalue + (attribVal-83.25) }
    if (attribVal > 85.58) 
    { SPvalue = SPvalue + (attribVal-85.58) }
    if (attribVal > 87.6) 
    { SPvalue = SPvalue + (attribVal-87.6) }
    if (attribVal > 89.4) 
    { SPvalue = SPvalue + (attribVal-89.4) }
    if (attribVal > 91.01) 
    { SPvalue = SPvalue + (attribVal-91.01) }
    if (attribVal > 92.46) 
    { SPvalue = SPvalue + (attribVal-92.46) }
    if (attribVal > 93.79) 
    { SPvalue = SPvalue + (attribVal-93.79) }
    if (attribVal > 95) 
    { SPvalue = SPvalue + (attribVal-95) }
    if (attribVal > 96.13) 
    { SPvalue = SPvalue + (attribVal-96.13) }
    if (attribVal > 97.18) 
    { SPvalue = SPvalue + (attribVal-97.18) }
    if (attribVal > 98.15) 
    { SPvalue = SPvalue + (attribVal-98.15) }
    if (attribVal > 99.06) 
    { SPvalue = SPvalue + (attribVal-99.06) }
    if (attribVal > 99.99) 
    { SPvalue = SPvalue + (attribVal-99.99) }
    if (attribVal > 100) 
    { SPvalue = SPvalue + (attribVal-100) }

    if (attribValNEQ > 48.06) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-48.06) }
    if (attribValNEQ > 60.51) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-60.51) }
    if (attribValNEQ > 67.97) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-67.97) }
    if (attribValNEQ > 73.24) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-73.24) }
    if (attribValNEQ > 77.28) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-77.28) }
    if (attribValNEQ > 80.53) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-80.53) }
    if (attribValNEQ > 83.25) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-83.25) }
    if (attribValNEQ > 85.58) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-85.58) }
    if (attribValNEQ > 87.6) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-87.6) }
    if (attribValNEQ > 89.4) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-89.4) }
    if (attribValNEQ > 91.01) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-91.01) }
    if (attribValNEQ > 92.46) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-92.46) }
    if (attribValNEQ > 93.79) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-93.79) }
    if (attribValNEQ > 95) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-95) }
    if (attribValNEQ > 96.13) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-96.13) }
    if (attribValNEQ > 97.18) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-97.18) }
    if (attribValNEQ > 98.15) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-98.15) }
    if (attribValNEQ > 99.06) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-99.06) }
    if (attribValNEQ > 99.99) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-99.99) }
    if (attribValNEQ > 100) 
    { SPvalueNEQ = SPvalueNEQ + (attribValNEQ-100) }
  }

  var SAList = getElementsByClassName('skill_level',document) 

  for(var i=0;i<Math.min(SAList.length,10);++i) {
    SAVal = parseFloat(SAList[i].innerHTML)
    SPvalue = SPvalue + SAVal
    SPvalueNEQ = SPvalueNEQ +SAVal
    if (SAVal > 2) 
    { SPvalue = SPvalue + (SAVal-2) }
    if (SAVal > 4) 
    { SPvalue = SPvalue + (SAVal-4) }
    if (SAVal > 6) 
    { SPvalue = SPvalue + (SAVal-6) }
    if (SAVal > 8) 
    { SPvalue = SPvalue + (SAVal-8) }

    if (SAVal > 2) 
    { SPvalueNEQ = SPvalueNEQ + (SAVal-2) }
    if (SAVal > 4) 
    { SPvalueNEQ = SPvalueNEQ + (SAVal-4) }
    if (SAVal > 6) 
    { SPvalueNEQ = SPvalueNEQ + (SAVal-6) }
    if (SAVal > 8) 
    { SPvalueNEQ = SPvalueNEQ + (SAVal-8) }

  }

if (page == "skill_points")
{ var unspentSpan = document.getElementById('skill_points') 

  var unspentSP = parseFloat(unspentSpan.innerHTML)
  SPvalue = SPvalue + unspentSP
  SPvalueNEQ = SPvalueNEQ + unspentSP

  var temp = inetAddress.split("player_id=")
  var playerId = temp[1]
  var playerLevel

  GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(thepage) {
        var response1=thepage.responseText
        var temp1 = response1.split('"current_stats_value">')
        var temp2 = temp1[1].split('<')
        playerLevel = temp2[0]
        var thedatadiv = document.createElement('div');
        thedatadiv.class = "playerhead";
        thedatadiv.innerHTML = '<div style="float: left; margin-left: 20px; position: relative; top: +20px;"><b>Level: '+playerLevel+ '<br>SP Value: '+Math.round(SPvalue*100)/100+'</b></div>'
        var spot = getElementsByClassName('playerhead',document)
        spot[0].parentNode.appendChild(thedatadiv)
      }
  });
}
else if (page == "profile") {
var spot = getElementsByClassName('large_title_bar',document)
thedatadiv = document.createElement('div')
thedatadiv.setAttribute('style','float: left; margin-left: 10px; font-size: 15px;')
thedatadiv.innerHTML = 'SP Value: ?' 
if (SPvalue > 0) 
{ thedatadiv.innerHTML = 'SP Value: '+Math.round(SPvalue*100)/100 + ' (with equip)' + ' : '+Math.round(SPvalueNEQ*100)/100 + ' (no attrib equip)'}
spot[0].appendChild(thedatadiv)

}         
}, 'false');
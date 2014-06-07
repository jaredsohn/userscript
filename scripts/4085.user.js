// Naltrexone's KoL Scripts
// 
// ==UserScript==
// @name           Naltrexone's KoL Scripts - Bang Potion Minder
// @include        *kingdomofloathing.com/inventory.php*
// @include        *kingdomofloathing.com/multiuse.php*
// @include        *kingdomofloathing.com/main.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/charsheet.php*
// @include        *kingdomofloathing.com/ascend.php*
// @description    Version 1.1
// ==/UserScript==


/********************************** Recent Changes **********************************************
Recent Updates:
Version 1.1: Updated script to non-disruptively tag items in the "Result:" pane
             when opening a large or small box on the inventory screen.

   
********************************************************************************************/
GM_setValue("scriptVer","1.1");
GM_setValue("scriptName","Bang Potion Minder");
GM_setValue("scriptURL","http://batmantis.com/kol/BangPotionMinder.user.js");


function updateScriptBox() {
//  if (updateNeeded) {
    mainPageBody.innerHTML = addedHTML + '</table></center>' + oldHTML;
//  } 
// Only adding the box if there's a problem-- people were complaining about it.
//  else {
//    mainPageBody.innerHTML = oldHTML + addedHTML + '</table></center>';	  	
//  }
}

function trimString(targetString) {
  targetString = targetString.replace( /^\s+/g, "" );
  targetString = targetString.replace( /\s+$/g, "" );
  return targetString;
}

function checkForUpdate() {
	// If possible, grab the latest version of this script from Batmantis
	// and see if it's newer than this version.
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: GM_getValue("scriptURL"),
	  headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	  onload: function(responseDetails) {
			if (responseDetails.status == "200") {
				var strHTML = responseDetails.responseText;
				var newVer = strHTML.match(/description\s*Version \w+\.\w+/);
				if (newVer.length > 0) {
				  newVer[0] = newVer[0].substring(newVer[0].indexOf('Version') + 8);
				  GM_setValue("scriptWebVer",newVer[0]);
				} else {
				  GM_setValue("scriptWebVer","Error");		  
				}
			} else {
	                  GM_setValue("scriptWebVer","Error");		  
			}
	  }
	});
}

function getPotionName(candidateText) {
  var potionName = '';
  if (candidateText.indexOf('bubbly potion') >= 0)       { potionName='bubbly potion'; }
  if (candidateText.indexOf('cloudy potion') >= 0)       { potionName='cloudy potion'; }
  if (candidateText.indexOf('dark potion') >= 0)         { potionName='dark potion'; }
  if (candidateText.indexOf('effervescent potion') >= 0) { potionName='effervescent potion'; }
  if (candidateText.indexOf('fizzy potion') >= 0)        { potionName='fizzy potion'; }
  if (candidateText.indexOf('milky potion') >= 0)        { potionName='milky potion'; }
  if (candidateText.indexOf('murky potion') >= 0)        { potionName='murky potion'; }                                                
  if (candidateText.indexOf('smoky potion') >= 0)        { potionName='smoky potion'; }                                                
  if (candidateText.indexOf('swirly potion') >= 0)       { potionName='swirly potion'; }                                                	
  
  return potionName;
}

if (window.location.pathname == "/main.php") {

  checkForUpdate();
  var needUpdate = ((GM_getValue("scriptWebVer","Error") != "Error") && ((GM_getValue("scriptWebVer")+0.0) > (GM_getValue("scriptVer") + 0.0)));
  
  if (needUpdate) {
    var boxColor = 'red';	
  } else {
    var boxColor = 'blue';
  }
  
  var mainPageBody= document.getElementsByTagName("body")[0];
  var oldHTML = mainPageBody.innerHTML;
  var addedHTML = '<center><table style="border: 1px solid ' + boxColor + '; margin-bottom: 4px;" width=95% cellpadding=1 cellspacing=0>' +
      '<tr><td bgcolor=' + boxColor + '><font color=white size=-2><b>' + GM_getValue("scriptName") + '</b> Script ' + GM_getValue("scriptVer") + ':</font></td></tr>' +
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Installed and active.</font></td></tr>';
  if (GM_getValue("scriptWebVer","Error") == "Error") {
    addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to check website for updated version of script.</font></td></tr>';	
    updateScriptBox();
  } else {
    if (needUpdate) {
      addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is out-of-date. Click <a href="' + GM_getValue("scriptURL") + '" TARGET="_blank">here</a> for Version ' + GM_getValue("scriptWebVer") + '</font></td></tr>';	  	
      updateScriptBox();
    } else {
      addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is latest version.</font></td></tr>';		
//      updateScriptBox();    
    }	
  }
}

if (window.location.pathname == "/charpane.php") {
  // Multis on the same workstation will not have the same effects per bang potion
  // so we need to know who is logged in currently.
  var charName = document.getElementsByTagName("b")[0].innerHTML;
  GM_setValue("CurCharName",charName);
}

if ((window.location.pathname == "/inventory.php") ||
    (window.location.pathname == "/multiuse.php"))
 {
    var itemElements = document.getElementsByTagName("td");
    var effectName = '';
    var effectText = '';
    var potionName = '';
    var firstPart = '';
    var secondPart = '';
    var alreadyStoredEffect = 0;
    var charName = GM_getValue("CurCharName",''); // Gotta be careful about the multis.
    
    for (var i=0; i < itemElements.length; i++ ) {   	
      curItem = document.getElementsByTagName("td")[i];      

        // If the player just drank a potion, we need to capture its effect and store it.    
        if ((alreadyStoredEffect==0) && (curItem.innerHTML.indexOf('You drink the ') > 0) && (curItem.innerHTML.indexOf('potion.') > 0)) {
          potionName = curItem.innerHTML.substring(curItem.innerHTML.indexOf('You drink the ') + 14,
            curItem.innerHTML.indexOf('potion')+6);
          
          if (curItem.innerHTML.indexOf('liquid fire') > 0) { effectName = 'Gain 1-3 Drunkenness'; } 
          else { 
            if (curItem.innerHTML.indexOf('hit points') > 0) { effectName = 'Gain 14-16 HP and MP'; }
            else {    	
              effectName = trimString(curItem.getElementsByTagName("b")[0].innerHTML); 
            }
          }          
           
          if (effectName.indexOf('<') > 0) { effectName = trimString(effectName.substring(0,effectName.indexOf('<'))); }
          if (effectName == 'Object Detection') { effectName = effectName + ' (+12.5% Item Drops: 10 Adv)'; }
          if (effectName == 'Confused') { effectName = effectName + ' (-30% Mys: 20 Adv)'; }
          if (effectName == "Izchak's Blessing") { effectName = effectName + ' (+25% Mox: 10 Adv)'; }
          if (effectName == 'Sleepy') { effectName = effectName + ' (-30% Mus: 20 Adv)'; }                              
          if (effectName == 'Strange Mental Acuity') { effectName = effectName + ' (+25% Mys: 10 Adv)'; }                              
          if (effectName == 'Strength of Ten Ettins') { effectName = effectName + ' (+25% Mus: 10 Adv)'; }                              
          if (effectName == 'Teleportitis') { effectName = effectName + ' (10 Adv)'; }                              
          
          GM_setValue(charName + '-' + potionName, effectName);
          
          alreadyStoredEffect = 1;
        }
        else {          
          if ((window.location.pathname != "/multiuse.php") && (curItem.innerHTML.indexOf('<td') < 0)) { //avoid outer layer of nested tables & multi use page
      
            potionName = getPotionName(curItem.innerHTML);
          
            if (potionName != '') { 
              effectText = GM_getValue(charName +'-' + potionName, '(Effect: Not Yet Known)');
              if (curItem.innerHTML.indexOf('<br>') >= 0) {
                firstPart = curItem.innerHTML.substring(0, curItem.innerHTML.indexOf('<br>')+3);
                secondPart = curItem.innerHTML.substring(curItem.innerHTML.indexOf('<br>')+4);
              } else {
                firstPart = curItem.innerHTML + '<br> ';
                secondPart = '';	
              }
              curItem.innerHTML = firstPart + '<strong>' + effectText + '</strong><br>' + secondPart;
            }
          }          
       }
    }
    
    // Handle items in the drop down list on the "Use Multiple Items" page.
    if (window.location.pathname == "/multiuse.php") {
      var itemElements = document.getElementsByTagName("option");
    
      for (var i=0; i < itemElements.length; i++ ) {   	
        curItem = document.getElementsByTagName("option")[i];
        
        var potionName = getPotionName(curItem.innerHTML);
        if (potionName != '') {curItem.innerHTML = curItem.innerHTML + '  ' + GM_getValue(charName +'-' + potionName, '(Unknown Effect)');}
      }
    	
    }

}
if (window.location.pathname == "/charsheet.php") {
  var charName = GM_getValue("CurCharName",''); // Gotta be careful about the multis.
  var docBody = document.getElementsByTagName("body")[0];
  docBody.innerHTML = docBody.innerHTML + 
    '<BR><center><table style="border: 1px solid blue; margin-bottom: 4px;" width=95% cellpadding=1 cellspacing=0>' +
    '<tr><td style="color: white;" align=center bgcolor=blue colspan=2><b>Bang Potion Effects (Current Ascension):</b></td></tr>' +
    '<tr><td><b>bubbly potion</b>:</td><td>' + GM_getValue(charName +'-bubbly potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>cloudy potion</b>:</td><td>' + GM_getValue(charName +'-cloudy potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>dark potion</b>:</td><td>' + GM_getValue(charName +'-dark potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>effervescent potion</b>:</td><td>' + GM_getValue(charName +'-effervescent potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>fizzy potion</b>:</td><td>' + GM_getValue(charName +'-fizzy potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>milky potion</b>:</td><td>' + GM_getValue(charName +'-milky potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>murky potion</b>:</td><td>' + GM_getValue(charName +'-murky potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>smoky potion</b>:</td><td>' + GM_getValue(charName +'-smoky potion', '(Unknown Effect)') + '</td></tr>'+ 
    '<tr><td><b>swirly potion</b>:</td><td>' + GM_getValue(charName +'-swirly potion', '(Unknown Effect)') + '</td></tr>'+ 
    '</table></center>';
}

// If the player is ascending, we need to clear these values-- they don't keep from one ascension to the next.
if (window.location.pathname == "/ascend.php") {
  var charName = GM_getValue("CurCharName",''); // Gotta be careful about the multis.	
  GM_setValue(charName + '-bubbly potion', '(Unknown Effect)');
  GM_setValue(charName + '-cloudy potion', '(Unknown Effect)');
  GM_setValue(charName + '-dark potion', '(Unknown Effect)');
  GM_setValue(charName + '-effervescent potion', '(Unknown Effect)');
  GM_setValue(charName + '-fizzy potion', '(Unknown Effect)');
  GM_setValue(charName + '-milky potion', '(Unknown Effect)');
  GM_setValue(charName + '-murky potion', '(Unknown Effect)');
  GM_setValue(charName + '-smoky potion', '(Unknown Effect)');
  GM_setValue(charName + '-swirly potion', '(Unknown Effect)');
}
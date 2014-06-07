// ==UserScript==
// @name    Facebook School Vandals Autocleaner
// @namespace   schoolvandals
// @description   Autocleans your school
// @include   https://fb.schoolvandals.net/*
// @include   https://apps.facebook.com/schoolvandals/*
// @include   http://apps.facebook.com/schoolvandals/*
// @include   http://www.schoolvandals.net/*
// @version 0.1.05
// @contributor Fragger
// ==/UserScript==

//Update Checker script from http://userscripts.org/scripts/show/20145
var SUC_script_num = 48759;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

GM_registerMenuCommand('Facebook School Vandals Autocleaner - Set Max Coins', maxCoins);
GM_registerMenuCommand('Facebook School Vandals Autocleaner - Set Refresh Delay', refreshDelay);

if(document.location.toString().indexOf('https://fb.schoolvandals.net') != -1) {
  var mainURL = 'https://fb.schoolvandals.net/';
} else if(document.location.toString().indexOf('http://www.schoolvandals.net') != -1) {
  var mainURL = 'http://www.schoolvandals.net/';
} else {
  return;
}

var roomTagged = xpath("//span[contains(@id,'room_') and contains(text(),' |')]/a");
var spotTagged = xpath("//a[contains(@title,'Clean ')]/..");
var weaponPage = xpath("//span[contains(@id,'weapon_')]");
var fatiguetimer = document.getElementById('fatigue_timer');
var coins = parseInt(document.getElementById('coins').innerHTML);
if ( coins < 1 || GM_getValue('needCoins', false) ) {
  var coinButton = xpath("//div[contains(text(),'coins in lunch money')]/../../td/button");
  if (coinButton.snapshotLength > 0) {
    GM_setValue('needCoins', false);
    coinButton.snapshotItem(0).click();
  } else {
    document.location = mainURL + 'principal';
  }
} else if ( roomTagged.snapshotLength > 0 ) {
  document.location = roomTagged.snapshotItem(0).href;
} else if ( spotTagged.snapshotLength > 0 ) {
  document.location = document.location + '&slot_id=' + spotTagged.snapshotItem(0).id.split('slot_')[1];
} else if ( weaponPage.snapshotLength > 0 ) {
  var weaponSelect = xpath("//span[contains(@id,'weapon_') and contains(text()[4],'00:00:30')]");
  if ( weaponSelect.snapshotLength > 0 ) {
    var weaponSelectedEl = weaponSelect.snapshotItem(0);
    var maxCoins = GM_getValue('maxCoins','');
    if( maxCoins != '' && parseInt(weaponSelect.snapshotItem(0).innerHTML.split('Cost</span> &nbsp;')[1].split(' Coins')[0]) > maxCoins ) {
      for(var i = 0; i<weaponPage.snapshotLength; i++) {
        if(parseInt(weaponPage.snapshotItem(i).innerHTML.split('Cost</span> &nbsp;')[1].split(' Coins')[0])<=maxCoins) {
          weaponSelectedEl = weaponPage.snapshotItem(i);
        }
      }
    }
    var weaponSelected = xpath("//a[img/@id='weapon_" + weaponSelectedEl.id.split('weapon_')[1].split('_text')[0] + "']");
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,
      0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var cb = weaponSelected.snapshotItem(0); 
    if ( fatiguetimer ) {
      window.setTimeout(function(){cb.dispatchEvent(evt);}, ((parseInt(fatiguetimer.innerHTML.split(':')[2])+1)+parseInt(fatiguetimer.innerHTML.split(':')[1])*60+parseInt(fatiguetimer.innerHTML.split(':')[0])*60*60)*1000);
    } else {
      cb.dispatchEvent(evt);
    }
  } else {
    GM_setValue('needCoins', true);
    document.location = mainURL + 'principal';
  }
} else if ( document.location != mainURL ) {
  document.location = mainURL;
}

window.setTimeout(function(){document.location = mainURL;}, GM_getValue('refreshDelay', 5)*60*1000);


function maxCoins() {
  var maxCoinsInput = prompt('Enter the maximum amount of coins you would like to use\nwhen cleaning any one tag (enter blank for no maximum):', GM_getValue('maxCoins',''));
  var setMaxCoins;
  if( (setMaxCoins = numberCheck(maxCoinsInput,true)) !== false ) {
    GM_setValue('maxCoins', setMaxCoins);
  }
}

function refreshDelay() {
  var refeshDelayInput = prompt('Enter the time in minutes between each refresh:', GM_getValue('refreshDelay', 5));
  var setRefeshDelay;
  if( (setRefeshDelay = numberCheck(refeshDelayInput)) !== false ) {
    GM_setValue('refreshDelay', setRefeshDelay);
    document.location = mainURL;
  }
}

function numberCheck(number, allowBlank) {
  if( isNaN(parseInt(number)) ) {
    if( allowBlank && number.replace(/^\s\s*/, '').replace(/\s\s*$/, '') == '' ) {
      return '';
    } else if( number!==null ) {
      if( allowBlank ) {
        alert('Please input a number or blank!');
      } else {
        alert('Please input a number!');
      }
    }
  return false;
  } else {
    return parseInt(number);
  }
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

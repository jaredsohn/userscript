// ==UserScript==
// @name    Facebook Mafia Wars Mafia to Facebook Friend Adder
// @namespace   mafiawars
// @description   Add's friends from your Mafia Wars Mafia to your Facebook Friends so you can help and be helped on jobs...etc
// @include   http://www.facebook.com/s.php?k=100000080*
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://www.facebook.com/*
// @version 0.1.05
// @contributor Fragger
// ==/UserScript==

//Update Checker script from http://userscripts.org/scripts/show/20145
var SUC_script_num = 49109;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


GM_registerMenuCommand('Mafia Wars to Facebook Friend - Get Mafia Wars Mafia', getMWMafia);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Get Facebook Friends', getFBFriends);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Add Mafia to FB Friends', addtoFBFriendsinit);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Set Add Me Message', setAddMeMessage);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Set Friends List', setFriendsList);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Set Invite Delay', setInviteDelay);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Set # of people to invite', setInviteNumber);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Clear All Lists', clearAllLists);
GM_registerMenuCommand('Mafia Wars to Facebook Friend - Clear All Settings', clearAllSettings);


if(GM_getValue('running','false')=='true' && window.location.pathname == '/s.php' && window.location.href.indexOf('&sid=') != -1 ) {
  clickaddasfriend();
}

function getMWMafiaFromPage() {
  var MWmafia = getList('MWmafia');
  var list =  $x("//div[@id='app10979261223_inner_page']/div/div/div/a/img");
  var run = false;
  var uid;
  list.forEach(function(i){
    run = true;
    uid = i.getAttribute('uid');
    if (MWmafia.indexOf(uid) == -1) {
      MWmafia.push(uid);
    }
  });
  if (MWmafia != '' && run) {
    setList('MWmafia', MWmafia);
    return true;
  } else {
    return false;
  }
}

function getMWMafia() {
  if(!getMWMafiaFromPage()) {
    alert('Are you on the Mafia Wars My Mafia>My Mafia page?');
    return;
  }
  var nextpage = xpath("//div[@id='app10979261223_inner_page']/div/div/b[1]/following-sibling::a[1]");
  if(nextpage.snapshotLength>0) {
    event('click', nextpage.snapshotItem(0));
    window.setTimeout(getMWMafia, 3000);
  } else {
    var MWmafia = getList('MWmafia');
    alert('Done! You have '+MWmafia.length+' Mafia Wars mafia.');
  }
}

function getFBFriendsFromPage() {
  var FBfriends = getList('FBfriends');
  var list =  $x("//a[@class='UIObjectListing_Title']");
  var run = false;
  var uid;
  list.forEach(function(i){
    run = true;
    uid = (i.getAttribute('href')).split('?id=')[1];
    if (FBfriends.indexOf(uid) == -1) {
      FBfriends.push(uid);
    }
  });
  if (FBfriends != '' && run) {
    setList('FBfriends', FBfriends);
    return true;
  } else {
    return false;
  }
}

function getFBFriends() {
  if(!getFBFriendsFromPage()) {
    alert('Are you on the Facebook All Friends page?');
    return;
  }
  var nextpage = xpath("//span[@class='UIPager_ButtonWrapper']/a[@class='UIPager_Button UIPager_ButtonForward']");
  if(nextpage.snapshotLength>0) {
    event('click', nextpage.snapshotItem(0));
    window.setTimeout(getFBFriends, 3000);
  } else {
    var FBfriends = getList('FBfriends');
    alert('Done! You have '+FBfriends.length+' Facebook friends.');
  }
}

function addtoFBFriendsinit() {
  GM_setValue('running','true');
  if (GM_getValue('MWmafia','') == '') {
    alert('You need to scan your Mafia Wars Mafia before running this.');
    return;
  }
  if (GM_getValue('FBfriends','') == '') {
    alert('You need to scan your Facebook Friends before running this.');
    return;
  }
  if (GM_getValue('addmemsg','') == '') {
    alert('You need to set a message to send to people when you add them as friends before running this.');
    return;
  }
  var friendsReqed = getList('friendsReqed');
  GM_setValue('reqedLength', friendsReqed.length);
  addtoFBFriends();
}

function addtoFBFriends() {
  var MWmafia = getList('MWmafia');
  var FBfriends = getList('FBfriends');
  var friendsReqed = getList('friendsReqed');
 
  for(var Mid in MWmafia) {
    if (FBfriends.indexOf(MWmafia[Mid]) == -1 && friendsReqed.indexOf(MWmafia[Mid]) == -1) {
      window.location.href = 'http://www.facebook.com/s.php?k=100000080&id='+MWmafia[Mid];
      return;
    }
  }
  GM_setValue('running','false');
  alert('Finished adding all of your Mafia that we know of that currently are not your friend\'s.  ' + friendsReqed.length + ' people invited.');
}

function clickaddasfriend() {
  var addasfriend = xpath("//a[contains(text(),'Add as Friend')]");
  if(addasfriend.snapshotLength>0) {
    event('click', addasfriend.snapshotItem(0));
    window.setTimeout(setupandsendreq, GM_getValue('inviteDelay', 10)*1000);
  } else {
    addreqedtolist();
  }
}

function setupandsendreq() {
  var addfriendsubmit = xpath("//input[@id='dialog_button1' and @value='Add Friend']"); //"//input[@id='dialog_button2' and @value='Cancel']");//
  if(addfriendsubmit.snapshotLength==0) {
    window.setTimeout(setupandsendreq,1000);
  } else {
    var warning = xpath("//h2[contains(text(),'Warning!')]");
    if(warning.snapshotLength>0) {
      var friendsReqed = getList('friendsReqed');
      GM_setValue('running','false');
      alert('Warning you are getting close to hitting a block, stopping for now... Try adding more people tomorrow or something.  ' + friendsReqed.length + ' people invited so far.');
    } else {
      var friendlist = GM_getValue('friendlist','');
      if(friendlist!='') {
        var addtolist = xpath("//span[contains(text(),'Add to list')]");
        if(addtolist.snapshotLength>0) {
          event('mousedown', addtolist.snapshotItem(0));
          var userlist = xpath("//a[@class='UISelectList_Label' and contains(text(),'"+friendlist+"')]");
          if(userlist.snapshotLength>0) {
            event('mouseup', userlist.snapshotItem(0));
          } else {
            GM_setValue('running','false');
            alert('Error friends list "'+friendlist+'" not found!');
            return;
          }
        } else {
          window.setTimeout(setupandsendreq, 1000);
        }
      }
      window.location.href = "javascript:void((function(){show('addMsgBox'); hide('addMsg'); ge('message').focus(); return false;})());"
      var msgbox = xpath("//textarea[@id='message']");
      if(msgbox.snapshotLength>0) {
        msgbox.snapshotItem(0).value = GM_getValue('addmemsg');
      } else {
        window.setTimeout(setupandsendreq, 1000);
      }
      window.setTimeout(function(){addfriendsubmit.snapshotItem(0).click(); addreqedtolist();}, 1000);
    }
  }
}

function addreqedtolist() {
  var addfriendsubmit = xpath("//input[@id='dialog_button1' and @value='Add Friend']"); //"//input[@id='dialog_button2' and @value='Cancel']");//
  if(addfriendsubmit.snapshotLength==0) {
    var fid = parseInt(window.location.href.split('&id=')[1]);
    var MWmafia = getList('MWmafia');
    var friendsReqed = getList('friendsReqed');
    friendsReqed.push(fid);
    setList('friendsReqed', friendsReqed);
    if(friendsReqed.length-GM_getValue('reqedLength') < GM_getValue('inviteNumber', 100)) {
      addtoFBFriends();
    } else {
      GM_setValue('running','false');
      alert('Compleated ' + GM_getValue('inviteNumber', 100) + ' friend requests, run again to do more, but just don\'t do too many.  ' + friendsReqed.length + ' people invited so far.');
    }
  } else {
    window.setTimeout(addreqedtolist,1000);
  }
}

function clearAllSettings() {
  if (window.confirm('Are you sure you want to clear all of\nFacebook Mafia Wars Mafia to Facebook Friend Adder\'s\nSettings?\n\nThis can not be undone.\n')) {
    if(typeof GM_listValues == 'function' && typeof GM_deleteValue == 'function') {
      var values = GM_listValues();
      for (var i in values) {
        GM_deleteValue(values[i]);
      }
    } else {
      alert('Error! In order to do this you need at least GreaseMonkey version: 0.8.20090123.1, please upgrade and try again.');
    }
  }
}

function clearAllLists() {
  if (window.confirm('Are you sure you want to clear all of\nFacebook Mafia Wars Mafia to Facebook Friend Adder\'s\nLists? These include the Mafia and Facebook lists.\n\nDo this to recheck/add friends.\n')) {
    if(typeof GM_listValues == 'function' && typeof GM_deleteValue == 'function') {
      GM_deleteValue('MWmafia');
      GM_deleteValue('FBfriends');
      GM_deleteValue('friendsReqed');
    } else {
      alert('Error! In order to do this you need at least GreaseMonkey version: 0.8.20090123.1, please upgrade and try again.');
    }
  }
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function $x(p,c) {
  var i, r = [], x=document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (i=x.iterateNext()) r.push(i);
  return r;
}

function event(evntname, obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent(evntname, true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(evt);
}

function getList(listname) {
  var list = GM_getValue(listname,'');
  if (list != '') {
    list = list.split(',');
  } else {
    list = new Array();
  }
  return list;
}

function setList(listname, array) {
  GM_setValue(listname, array.join(','));
}

function setFriendsList() {
  var list = prompt('Enter Exactly the name of the friends list you would like to add to:', GM_getValue('friendlist',''));
  if( list !== null ) {
    GM_setValue('friendlist', list);
  }
}

function setAddMeMessage() {
  var msg = prompt('Enter the message you would like to send when requesting friends:', GM_getValue('addmemsg','I\'m already a member of your Mafia, but add me back as a friend so we can help each other on jobs.'));
  if( msg !== null ) {
    GM_setValue('addmemsg', msg);
  }
}

function setInviteDelay() {
  var delay = prompt('Enter the time in seconds between each invite:', GM_getValue('inviteDelay', 10));
  var setInviteDelay;
  if( (setInviteDelay = numberCheck(delay)) !== false ) {
    GM_setValue('inviteDelay', setInviteDelay);
  }
}

function setInviteNumber() {
  var number = prompt('Enter the number of people to invite each run:', GM_getValue('inviteNumber', 100));
  var setInviteNumber;
  if( (setInviteNumber = numberCheck(number)) !== false ) {
    GM_setValue('inviteNumber', setInviteNumber);
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

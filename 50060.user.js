// ==UserScript==
// @name    Final Auto Help 
// @namespace   mafiawars
// @description   Help jobs in your friends list
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://www.facebook.com/*
// @version 0.1.04
// @contributor ntas,Fragger
// ==/UserScript==

GM_registerMenuCommand('Get Mafia Wars Mafia', getMWMafia);
GM_registerMenuCommand('Help Friends to finish Jobs', helpFriendsinit);
GM_registerMenuCommand('Set Help Delay', setHelpDelay);
GM_registerMenuCommand('Clear All Lists', clearAllLists);
GM_registerMenuCommand('Clear All Settings', clearAllSettings);

//if(GM_getValue('running','false')=='true'&& GM_getValue('MWmafia','') != ''){
//  window.setTimeout(helpFriendsinit,GM_getValue('helpDelay', 10)*1000);
//}

function getMWMafiaFromPage() {
  var MWmafia = getList('MWmafia');
  var list =  $x("//td[@id='app10979261223_content_row']/div/div/a/img");
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
  var nextpage = xpath("//td[@id='app10979261223_content_row']/div/b[1]/following-sibling::a[1]");
  if(nextpage.snapshotLength>0) {
    event('click', nextpage.snapshotItem(0));
    window.setTimeout(getMWMafia, 1000);
  } else {
    var MWmafia = getList('MWmafia');
    alert('Done! You have '+MWmafia.length+' Mafia Wars mafia.');
  }
}

function helpFriendsinit() {
  GM_setValue('running','true');
  if (GM_getValue('MWmafia','') == '') {
    alert('You need to scan your Mafia Wars Mafia before running this.');
    return;
  }
  ifrm = document.createElement("IFRAME"); 
  ifrm.setAttribute("src",'http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id=2809728&skip_interstitial=1'); 
  ifrm.setAttribute("id","addFrame"); 
  ifrm.style.width = 10+"px"; 
  ifrm.style.height = 10+"px"; 
  document.body.appendChild(ifrm);
  window.setTimeout(helpFriends,1000);
}
var tmp = 0; 
function helpFriends() {
	var MWmafia = getList('MWmafia');
	var ifrm = document.getElementById("addFrame") 
	ifrm.setAttribute("src",'http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id='+MWmafia[tmp]+'&skip_interstitial=1'); 
	top.document.title = 'Friend:'+tmp;
	tmp++;
	if (tmp<MWmafia.length) window.setTimeout(helpFriends,1000); else 
	{
	 GM_setValue('running','false');
	 window.setTimeout(helpFriendsinit,GM_getValue('helpDelay', 10)*1000);
	 //alert("Finish adding"+tmp);
	 tmp=0;
	 return; 
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

function setHelpDelay() {
  var delay = prompt('Enter the time in seconds between each help:', GM_getValue('helpDelay', 10));
  var setHelpDelay;
  if( (setHelpDelay = numberCheck(delay)) !== false ) {
    GM_setValue('helpDelay', setHelpDelay);
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
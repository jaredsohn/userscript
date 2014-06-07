// ==UserScript==
// @name           Mafia Wars Job Helper
// @namespace      mafiawars
// @description    Automatically do mafia friends jobs in Mafia Wars to gain experience points
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://www.facebook.com/*
// @version		 0.1.04
// @contributor Pinnedunderjeep
// @contributor Fragger
// @contributor ntas
// ==/UserScript==



GM_registerMenuCommand('MW Job Helper - Set Help Delay', setHelpDelay);
GM_registerMenuCommand('MW Job Helper - Get Mafia Wars Mafia', getMWMafia);
GM_registerMenuCommand('MW Job Helper - Get Facebook Friends', getFBFriends);
GM_registerMenuCommand('MW Job Helper - Do Jobs', helpFriendsinit);



var helpDelay = GM_getValue('helpDelay');
var tmp;
var finished = false;
var MWmafiaLength = 0;
var loopJob = null;
var skip = null;

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
    alert('You have '+MWmafia.length+' Mafia Wars mafia, Now go to\nFacebook All Friends page\nand run GET FACEBOOK FRIENDS function');
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
 	oldMafia = getList('MWmafia');
	filterFBFriends();
    var FBfriends = getList('FBfriends');
	var newMafia = getList('MWmafia');
    alert('Done! You have '+newMafia.length+' in your mafia that you can help (out of '+oldMafia.length+' ttl mafia');
  }
}

function filterFBFriends() {
  var MWmafia = getList('MWmafia');
  var FBfriends = getList('FBfriends');
  var friendsReqed = getList('friendsReqed');
  var newArray = new Array();
  var arrPointer;

for(var Mid in FBfriends) {
	if (MWmafia.indexOf(FBfriends[Mid]) > -1) {
		arrPointer = MWmafia.indexOf(FBfriends[Mid])
		newArray.push(MWmafia[arrPointer]);
	}
}
	setList('MWmafia', newArray);
  GM_setValue('running','false');
}


function helpFriendsinit() {
helpDelay = GM_getValue('helpDelay');
  GM_setValue('running','true');
  if (GM_getValue('MWmafia','') == '') {
    alert('You need to scan your Mafia Wars Mafia before running this.');
    return;
  }
if (!skip) {
 	 skip = prompt('Enter # of friends to skip:', 0);
	if (parseInt(skip) > 0) {
		tmp = skip;
	} else {
		tmp = 0; 
	}
}
if (!loopJob) {
	loopJob = prompt('Loop through list when complete?(0=NO, 1=YES)',0);
		if (parseInt(loopJob) !=(0 || 1)) {
			loopJob = 0;
		}
}

	

  ifrm = document.createElement("IFRAME"); 
  ifrm.setAttribute("src",'http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id=2809728&skip_interstitial=1'); 
  ifrm.setAttribute("id","addFrame"); 
  ifrm.style.width = 10+"px"; 
  ifrm.style.height = 10+"px"; 
  document.body.appendChild(ifrm);
	if (finished == false) {
	  window.setTimeout(helpFriends,(helpDelay*1000));
	} else {
		return;
	}
}


function helpFriends() {
	var MWmafia = getList('MWmafia');
	var ifrm = document.getElementById("addFrame") 
	ifrm.setAttribute("src",'http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id='+MWmafia[tmp]+'&skip_interstitial=1'); 
	top.document.title = 'Friend: '+tmp;
	tmp++;
	if (tmp<MWmafia.length) window.setTimeout(helpFriends,(helpDelay*1000)); else 
	{
	 GM_setValue('running','false');
	finished = true;
if (parseInt(loopJob) == 1) {
	GM_setValue('running','true');
	finished = false;
	tmp = skip;
	window.setTimeout(helpFriendsinit,GM_getValue('helpDelay', 10)*1000);
} else {
 	 top.document.title = "Finished Doing Jobs!";
	 tmp=0;
	 return; 
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

function setHelpDelay() {
  var delay = prompt('Enter the time in seconds between each help:', GM_getValue('helpDelay', 10));
  var setHelpDelay;
  if( (setHelpDelay = numberCheck(delay)) !== false ) {
    GM_setValue('helpDelay', setHelpDelay);
  }
}

function setList(listname, array) {
  GM_setValue(listname, array.join(','));
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

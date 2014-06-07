// ==UserScript==
// @name    Add hit List
// @namespace   mafiawars
// @description   Add hit List
// @include   http://www.facebook.com/s.php?k=100000080*
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://www.facebook.com/*
// @version 0.1.04
// @contributor ntas
// ==/UserScript==


GM_registerMenuCommand('Start to Add Hit List', hitlist);
GM_registerMenuCommand('Stop', stop);
GM_registerMenuCommand('Set Add Hit List ID', setID);
GM_registerMenuCommand('Set Add Hit List Delay', setDelay);
GM_registerMenuCommand('Set Hit List Bounty', setBounty);

if(GM_getValue('running','true')=='true' && window.location.href.indexOf('hitlist') != -1 ) {
	clickSetBounty();
}

function clickSetBounty() {
  var setBount = xpath("//input[@value='Set Bounty']");
  var amountBounty = xpath("//input[@value='10000']");
  
  if(amountBounty.snapshotLength>0) {
    amountBounty.snapshotItem(0).value = GM_getValue('bounty',10000);
  }
  
  if(setBount.snapshotLength>0) {
    event('click', setBount.snapshotItem(0));
  } 
  window.setTimeout(change, GM_getValue('delay', 10000));
}

function change()
{
 window.location.href = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=hitlist&xw_action=set&target_id='+GM_getValue('ID',10);
}

function hitlist()
{
  GM_setValue('running','true');
  change();
}
function stop()
{
 GM_setValue('running','false');
 }
 
function setID() {
  var tmpid = prompt('Enter ID Mafia:', GM_getValue('ID', 10));
  var setID;
  if( (setID = numberCheck(tmpid)) !== false ) {
    GM_setValue('ID', setID);
  }
}

function setDelay() {
  var tmpdelay = prompt('Enter the time (s) between each time adding hit list', GM_getValue('delay', 1000));
  var setDelay;
  if( (setDelay = numberCheck(tmpdelay)) !== false ) {
    GM_setValue('delay', setDelay);
  }
}

function setBounty() {
  var tmpbounty = prompt('Enter amount of Bounty:', GM_getValue('bounty',1000));
  var setBounty;
  if( (setBounty = numberCheck(tmpbounty)) !== false ) 
  {
    GM_setValue('bounty', setBounty);
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

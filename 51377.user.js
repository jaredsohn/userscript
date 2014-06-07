// ==UserScript==
// @name    Artful Attack
// @namespace   mafiawars
// @description   Attack only when the opponent heal in order to get more chance to take out him
// @include   http://www.facebook.com/s.php?k=100000080*
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://www.facebook.com/*
// @version 0.1.04
// @contributor ntas
// ==/UserScript==


GM_registerMenuCommand('Start to Attack', start);
GM_registerMenuCommand('Stop', stop);
GM_registerMenuCommand('Set ID', setID);
GM_registerMenuCommand('Set Delay', setDelay);

if(GM_getValue('running','true')=='true' && window.location.href.indexOf('hitlist') != -1) {
	check();
}

if(GM_getValue('running','true')=='true' && window.location.href.indexOf('fight') != -1) {
	window.setTimeout(addHit, GM_getValue('delay', 10000));
}

function check() {
  var status = null;
  status = document.getElementsByClassName("message_body");
  if (status.length==0)
  {
	attack();
  } else 
  window.setTimeout(addHit, GM_getValue('delay', 10000));
}

function attack()
{
window.location.href = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=fight&xw_action=attack&opponent_id='+GM_getValue('ID',10);
}

function addHit()
{
 window.location.href = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=hitlist&xw_action=set&target_id='+GM_getValue('ID',10);
}

function start()
{
  GM_setValue('running','true');
  addHit();
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

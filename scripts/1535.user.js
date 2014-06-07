/**
 * Livejournal useful user popup
 * Adds a useful popup box when you mouse over a username
 *
 * 2005 Sept 19 - Fixed code so it correctly handles users vs. communities vs. syndicated feeds.
 */

// ==UserScript==
// @name      LiveJournal Useful User Popup
// @namespace   http://ryan.freebern.org
// @description   Adds a useful popup box when you mouse over a username
// @include     http://*.livejournal.com/*
// ==/UserScript==

function checkPopup(ev) {
  var div = document.getElementById('lj_userpopup');
  if (div) {
	pos = findPos(div);
	var thisWidth = pos[0] + div.offsetWidth;
	var thisHeight = pos[1] + div.offsetHeight;
	if ( ((ev.pageX <= pos[0] + 1) || (ev.pageX >= thisWidth - 1)) || ((ev.pageY <= pos[1] + 1) || (ev.pageY >= thisHeight - 1)) ) {
		div.parentNode.removeChild(div);
	}
  }
  return true;
}

document.addEventListener('mousemove', checkPopup, false);

function findPos(obj) {
  var x = 0, y = 0;
  while (obj.offsetParent) {
    x += obj.offsetLeft;
    y += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return [x,y];
}

function mouseover(ev) {
  var pos = findPos(this);
  var user = this.getAttribute('name');
  var account = this.getAttribute('account');
  var div = document.createElement('div');
  div.id = 'lj_userpopup';
  div.style.cssText = 'border: 1px black solid; padding: 10px; background: Cornsilk; color: Black; position: absolute; z-index: 2001; left: '+(pos[0]-11)+'px; top: '+(pos[1]-11)+'px; text-align: left;';
  if (account == 1) {
	div.innerHTML = '<img src="http://stat.livejournal.com/img/userinfo.gif" alt="[info]" style="border: none; vertical-align: middle;" height="17" width="17">';
	div.innerHTML += '<b>'+user+'</b><br/><span style="font-size: 70%;">';
    div.innerHTML += '&raquo; <a href="http://www.livejournal.com/users/'+user+'">View Journal</a><br/>';
  } else if (account == 2) {
    div.innerHTML = '<img src="http://stat.livejournal.com/img/community.gif" alt="[info]" style="border: none; vertical-align: middle;" height="17" width="17">';
	div.innerHTML += '<b>'+user+'</b><br/><span style="font-size: 70%;">';
	div.innerHTML += '&raquo; <a href="http://www.livejournal.com/community/'+user+'">View Journal</a><br/>';
  } else if (account == 3) {
    div.innerHTML = '<img src="http://stat.livejournal.com/img/syndicated.gif" alt="[info]" style="border: none; vertical-align: middle;" height="17" width="17">';
	div.innerHTML += '<b>'+user+'</b><br/><span style="font-size: 70%;">';
	div.innerHTML += '&raquo; <a href="http://www.livejournal.com/users/'+user+'">View Journal</a><br/>';
  }
  div.innerHTML += '&raquo; <a href="http://www.livejournal.com/userinfo.bml?user='+user+'&mode=full">User Info</a><br/>';
  
  if (account < 3) {
    div.innerHTML += '&raquo; <a href="http://www.livejournal.com/allpics.bml?user='+user+'">User Pics</a><br/>';
    div.innerHTML += '&raquo; <a href="http://www.livejournal.com/users/'+user+'/calendar">Archive</a><br/>';
    div.innerHTML += '&raquo; <a href="http://www.livejournal.com/users/'+user+'/friends">Friends</a><br/>';
    div.innerHTML += '&raquo; <a href="http://www.livejournal.com/tools/memories.bml?user='+user+'">Memories</a></span>';
  }
  document.body.appendChild(div);
}

function newLJUser(user, accountType) {
  var img = 'userinfo';
  if (accountType == 2) img = 'community';
  if (accountType == 3) img = 'syndicated';

  var base = '<div style="display: inline;" id="%USER%popup" name="%USER%" account="%ACCOUNT%"><a href="#">';
  base += '<img src="http://stat.livejournal.com/img/%IMG%.gif" alt="[info]" style="border: none; vertical-align: middle; text-decoration: none;" ';
  base += 'height="17" width="17"></a><a href="#"><b>%USER%</b></a></div>';
  
  base = base.replace(/%ACCOUNT%/g, accountType);
  base = base.replace(/%IMG%/g, img);
  return base.replace(/%USER%/g, user);
}

var spans = document.getElementsByTagName('span');
for (var i = 0; i < spans.length; i++) {
  var span = spans[i];
  if (span.hasAttribute('class') && (span.getAttribute('class') == 'ljuser')) {
	span.innerHTML.match(/<b>(.*)<\/b>/);
	var user = RegExp.$1;
	var accountType = 1;
	if (span.innerHTML.match(/community\.gif/)) accountType = 2;
	if (span.innerHTML.match(/syndicated\.gif/)) accountType = 3;
	span.innerHTML = newLJUser(user, accountType);
	popup = document.getElementById(user + 'popup');
	popup.addEventListener('mouseover', mouseover, false);
  }
}
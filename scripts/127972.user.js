// ==UserScript==
// @name           TV Arsivi Reklam Gec
// @namespace      tv.tvarsivi.reklamgec
// @description    TVArsivi.com'da reklamları kolayca geçmenizi sağlar.
// @author         sanilunlu
// @version		   1.6
// 
// @include        http://tvarsivi.com/player.php*
// @include        https://tvarsivi.com/player.php*
// 
// ==/UserScript==

function getScrollBarWidth() {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
}

function clickLink(link) {
	var cancelled = false;

	if (document.createEvent) {
		var event = document.createEvent("MouseEvents");
		event.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0,
			false, false, false, false,
			0, null);
		cancelled = !link.dispatchEvent(event);
	}
	else if (link.fireEvent) {
		cancelled = !link.fireEvent("onclick");
	}

	if (!cancelled) {
		window.location = link.href;
	}
}

function listele() {
	var alink = document.getElementById('listele').getElementsByTagName('a')[0];
	win = window.open(alink.href, 'listeleWin', 'status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,scrollbars=1,height=300,width=1020');
	win.onload = function() {
		winOpened = true;
		win.scrollTo(0,250);
	}
	win.onclick = function() {
		setTimeout(function() {
			win.close();
		}, 100);
	}
}

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function reklamGec(minJump) {
	var alink = document.getElementById('sonraki').getElementsByTagName('a')[0].href;
	var alink1 = alink.substr(0, alink.indexOf('&z=') + 3);
	var alink2 = alink.indexOf('&', alink.indexOf('&z=')+1) > 0 ? alink.substr(alink.indexOf('&', alink.indexOf('&z=')+1)) : '';
	var datetime = alink.substr(alink.indexOf('&z=') + 3, alink.indexOf('&', alink.indexOf('&z=')+1) > 0 ? alink.indexOf('&', alink.indexOf('&z=')+1) : alink.length).replace(/\%\d\d/g, ' ');
	var date = parseDate(datetime);
	var newdate = new Date(date.getTime() + minJump * 60000);
	var newlink = alink1 + newdate.getFullYear() + '-' 
						 + padStr(newdate.getMonth()+1) + '-' 
						 + padStr(newdate.getDate()) + '%20' 
						 + padStr(newdate.getHours()) + ':' 
						 + padStr(newdate.getMinutes()) + ':' 
						 + padStr(newdate.getSeconds())
						 + alink2;
	window.location.href = newlink;
	return;
	win = window.open(newlink, 'listeleWin', 'status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,scrollbars=1,height=300,width=1020');
	win.onload = function() {
		winOpened = true;
		win.scrollTo(0,250);
	}
}

function addButtons() {
	var el = document.createElement('div');
	el.className = 'rklmDugme';
	el.style.cursor = 'pointer';
	var el5 = el.cloneNode(true);
	el5.style.width = '100%';
	el5.style.backgroundColor = 'gray';
	el.style.backgroundColor = 'lightgray';

	var el2 = el.cloneNode(true);
	var el3 = el.cloneNode(true);
	el3.style.backgroundColor = 'gray';
	var el4 = el3.cloneNode(true);

	el.innerHTML = '-5&lt;&lt;&lt;&lt;';
	el2.innerHTML = '-1&lt;&lt;';
	el3.innerHTML = '&gt;&gt;+1';
	el4.innerHTML = '&gt;&gt;&gt;&gt;+5';
	el5.innerHTML = 'LISTELE';
	el5.style.cursor = 'move';
	
	el.addEventListener('click', function() { reklamGec(-6); }, false);
	el2.addEventListener('click', function() { reklamGec(-2); }, false);
	el3.addEventListener('click', function() { reklamGec(+0); }, false);
	el4.addEventListener('click', function() { reklamGec(+4); }, false);
	el5.addEventListener('click', listele, false);
	
	var player = document.getElementById('playertd');
	player.insertBefore(el4, player.firstChild);
	player.insertBefore(el3, player.firstChild);
	player.insertBefore(el2, player.firstChild);
	player.insertBefore(el, player.firstChild);
	player.appendChild(el5);
}

function winResize() {
	window.resizeTo(400 + getScrollBarWidth() + (window.outerWidth - window.innerWidth), 350 + (window.outerHeight - window.innerHeight));
	window.scrollTo(0, 59);
}

setTimeout(function() {
	var sty = document.createElement('style');
	sty.type = 'text/css';
	var csssty = '.rklmDugme { width:25%; float: left; font-weight: bold;  } .rklmDugme:hover { background-color: white !important; color: red !important; } ';
	if (sty.styleSheet)
		sty.styleSheet.cssText = csssty;
	else
		sty.appendChild(document.createTextNode(csssty));
	document.getElementsByTagName('head')[0].appendChild(sty);

	var rek = document.getElementById('reklamigec');
	if (rek && rek.getElementsByTagName('a').length > 0) {
		clickLink(rek.getElementsByTagName('a')[0]);
		setTimeout(addButtons, 5000);
	} else {
		addButtons();
	}
}, 500);

document.getElementById('jsplayer').height = '320px';
document.getElementById('jsplayer').width = '400px';
var tds = document.getElementById('distablo').getElementsByTagName('td');
for(var i = 0; i < tds.length; i++)
	if(tds[i].width == '10') {
		tds[i].width = "0";
		break;
	}

document.body.onload = function() {
    window.resizeTo(420, 405);
	setTimeout(function() {
		winResize();
	}, 500);
}

setTimeout(function() {
	winResize();
}, 1500);

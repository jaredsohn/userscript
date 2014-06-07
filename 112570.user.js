// ==UserScript==
// @name          Itschi-Kommentare Mag-Ich
// @namespace     http://www.itschi.net/
// @description   Erweitert Itschi
// @include       http://www.itschi.net/*

// ==UserScript==
voteCounter = 0;

function remove(e) {
	e.parentNode.removeChild(e);
}

function search(tag, has) {
	has = has.split('=');
	var e = document.getElementsByTagName(tag)
	for (var x in e) {
		if (has[1].substr(has[1].length-1) == '*') {
			if (e[x].getAttribute && e[x].getAttribute(has[0]).substr(0, has[1].length-1) == has[1].substr(0, has[1].length-1))
				return e[x];
		} else {
			if (e[x].getAttribute && e[x].getAttribute(has[0]) == has[1])
				return e[x];
		}
	}
}

// no ajax
document.onclick = function () { return true; }

// no ads
remove(document.getElementById('ad')); // usermax
remove(search('a', 'class=social')); // facebook
remove(search('a', 'class=social')); // twitter

// no feedback
remove(search('a', 'class=feedback'));

// permalinks
function ic_loop() {
	var eDiv = document.getElementsByTagName('div');
	for (var x in eDiv) {
		if (eDiv[x].getAttribute && eDiv[x].getAttribute('id') && eDiv[x].getAttribute('id').match(/^feed_commentBox_/g))
			ic_feed(eDiv[x]);
	}
}
setInterval(ic_loop, 100);
ic_loop();

function ic_feed(e) {
	var id = e.getAttribute('id').replace(/^feed_commentBox_/g, '');
	
	// permalink
	var time = e.parentNode.getElementsByTagName('font')[e.parentNode.getElementsByTagName('font').length-1];
	if (time.innerHTML.indexOf('<a href') == -1)
		time.innerHTML = '<a href="?feed='+id+'">'+time.innerHTML+'</a>';
	
	// icons
	if (time.parentNode.getElementsByTagName('a')[2].innerHTML.indexOf('<img') == -1) {
		time.parentNode.getElementsByTagName('a')[1].innerHTML = '<img src="http://cdn1.iconfinder.com/data/icons/miniicons2/comment_left.gif" width="9" height="9">';
		time.parentNode.getElementsByTagName('a')[2].innerHTML = '<img src="http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/hand_pro.png" width="9" height="9">';
	}
	
	// votes
	var comments = document.getElementById('feed_comments_'+id).getElementsByTagName('div');
	for (var i in comments) {
		if (comments[i] && comments[i].tagName == 'DIV' && comments[i].getAttribute('id') && comments[i].getAttribute('id').match(/^feed_comments_/g))
			ic_comment(id, comments[i]);
	}
}

function ic_comment(f, e) {
	var id = e.getAttribute('id').replace(/^feed_comments_/g, '');
	var menu = document.getElementById('feed_comments_'+id).getElementsByTagName('font')[0].parentNode.parentNode;
	if (menu.innerHTML.indexOf('DevMeVotebox') == -1) {
		menu.parentNode.style.width = '400px';
		voteCounter++;
		menu.innerHTML += '<div id="DevMeVotebox'+voteCounter+'" style="float: right;"></div>';
		loadScript('http://api.dm.tl/votes?u=http://www.itschi.net/?feed='+f+'%26c='+id+'&boxID='+voteCounter+'&size=small');
	}
}

function loadScript(src) {
	var s = document.createElement('script');
	s.src = src;
	document.body.appendChild(s);
}

// Statistik fÃ¼r mich, um zu schauen, ob und wer das Skript nutzt.
var username = document.cookie.replace(/^.*?(;[\s]*)?username=([^;]+);.*/g, '$2');
new Image().src = 'http://itschi.net.tc/_script_stat.php?u='+encodeURIComponent(username);
// ==/UserScript==
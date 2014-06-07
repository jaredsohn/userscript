// ==UserScript==
// @name           Friendfeed Keyboard Shortcuts
// @namespace      http://userscripts.org/users/44035
// @description    Like Google Reader keyboard shortcuts, but for FF! w00t.
// @include        http://friendfeed.com/*
// @include         http://beta.friendfeed.com/*
// @exclude        http://friendfeed.com/settings*
// @version	0.5
// by Trent Olson [http://friendfeed.com/trentono] and Hao Chen [http://friendfeed.com/bitfaker]
// ==/UserScript==

unsafeWindow.document.onkeydown = KeyCheck;
unsafeWindow.document.onkeyup = checkModifier;
unsafeWindow.document.onclick = mouseUse;


var currentCluster, currentEntry;
var modifierShift = 0;
var f=0, g=0;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.selectedEntry { margin-left: -18px; padding-left: 13px; border-left: 5px solid #D7E4F4;}');

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}

function addHandlers() {	// if "Comment" link is clicked, go into typing mode
	$('.feed').find('.l_comment').each(function () {
		this.onclick = function () {
			unsafeWindow.document.onkeydown = typingComment;
			unsafeWindow.document.onclick = typingMouse;
			}
		});
	$('.feed').find('.l_editcomment').each(function () {
		this.onclick = function () {
			unsafeWindow.document.onkeydown = typingComment;
			unsafeWindow.document.onclick = typingMouse;
			}
		});		
	$('input.query').each(function () { 
		this.onfocus = function () {
			unsafeWindow.document.onkeydown = typingComment;
			unsafeWindow.document.onclick = typingMouse;
			}
		this.onblur = function () {
			unsafeWindow.document.onkeydown = KeyCheck;
			unsafeWindow.document.onclick = mouseUse;
			}
		});
	$('.sharebox textarea.title').each(function () {
		this.onfocus = function () {
			unsafeWindow.document.onkeydown = typingComment;
			unsafeWindow.document.onclick = typingMouse;
			}
		this.onblur = function () {
			this.onblur;
			unsafeWindow.document.onkeydown = KeyCheck;
			unsafeWindow.document.onclick = mouseUse;
			}
		});
}

GM_wait();
addHandlers();


function mouseUse(event) {
	var tgt = event.target;
	if ($(tgt).parents('.entry').length != 0) {
		var oldEntry = currentEntry;
		oldEntry.toggleClass('selectedEntry');
		currentCluster = $(tgt).parents('.cluster');
		currentEntry = $(tgt).parents('.entry').toggleClass('selectedEntry');
	}
}

function checkModifier(event) {

	var key = event.keyCode;
	if (key == 16) modifierShift = 0;
	
}

function KeyCheck(event)
{
	var key = event.keyCode;
	switch(key)
	{
		case 16: //shift
			modifierShift = 1;
			break;
		case 65: // a  -- todo: need to fix odd entry selection behaviour after expanding cluster
			triggerClick(currentCluster.find('.l_expandcluster'));
			break;
		case 67: //c  -- todo: clear out comment form (the 'c' keypress appears in the form)
			triggerClick(currentEntry.find('.l_comment'));
			event.preventDefault();
			unsafeWindow.document.onkeydown = typingComment;
			unsafeWindow.document.onclick = typingMouse;
			break;
		case 68: // d
			if (g) {
				g=0;
				location.href = '/summary?days=1';
			}
			break;
		case 69: //e
			if (g) {
				g=0;
				location.href = '/public';
			} else {
				triggerClick(currentEntry.find('.l_expandcomments'));
			}
			break;
		case 74: //j  -- suggested behaviour when at bottom of page: move to first entry on next page (and vice versa with 'k')
			var oldEntry = currentEntry;
			currentEntry = currentEntry.toggleClass('selectedEntry').next('.entry').toggleClass('selectedEntry');
			if (currentEntry.length != 0) {
				$.scrollTo(currentEntry, 1, {offset: -150} );
			} else {
				var oldCluster = currentCluster;
				currentCluster = currentCluster.next('.cluster');
				if(currentCluster.length != 0) {
					currentEntry = currentCluster.find('.entry:first');
					currentEntry.toggleClass('selectedEntry');
					$.scrollTo( currentEntry, 1, {offset: -150} );
				} else {
					currentCluster = oldCluster;
					currentEntry = oldEntry.toggleClass('selectedEntry');
				}
			}
			break;
		case 75: //k
			currentEntry = currentEntry.toggleClass('selectedEntry').prev('.entry').toggleClass('selectedEntry');
			if (currentEntry.length != 0) {
				$.scrollTo( currentEntry, 1, {offset: -150} );
			} else {
				currentCluster = currentCluster.prev('.cluster');
				if(currentCluster.length != 0) {
					currentEntry = currentCluster.find('.entry:last');
					currentEntry.toggleClass('selectedEntry');
					$.scrollTo( currentEntry, 1, {offset: -150} );
				} else {
					currentCluster = $('.feed .cluster:first');
					currentEntry = currentCluster.find('.entry:first');
					currentEntry.toggleClass('selectedEntry');
				}
			}
			break;
		case 72: //h
			if (g) {
				g=0;
				location.href = '/';
			} else {
				var link = currentEntry.find('.l_hideone');
				if (link.length == 0) link = currentEntry.find('.l_unhideone');
				triggerClick(link);
			}
			break;
		case 76: //l
			var link = currentEntry.find('.l_unlike');
			if (link.length == 0) link = currentEntry.find('.l_like');
			triggerClick(link);
			break;
		case 13: //enter
			if (f) {
				openLink(currentCluster.find('.summary .l_person:first'));
				endHover(currentCluster.find('.summary .l_person:first'));
				f=0;
				break;
			}
		case 86: // v
			openLink(currentEntry.find('.main'));
			break;
		case 70: // f
			if (!f) {
				triggerHover(currentCluster.find('.summary .l_person:first'));
				f=1;
			} else {
				endHover(currentCluster.find('.summary .l_person:first'));
				f=0;
			}
			break;
		case 71: // g
			g=1;
			break;
		case 77: // m
			if (g) {
				g=0;
				var profile = document.getElementById('header').getElementsByTagName('a')[0].href;
				location.href = profile;
			} else {
				triggerClick(currentEntry.find('.l_expandmedia'));
				triggerClick(currentEntry.find('.l_audio'));
				triggerClick(currentEntry.find('a.l_play'));
			}
			break;
		case 80: // p
			event.preventDefault();
			$('.sharebox textarea.title').each(function () { this.focus(); });
			break;
		case 82: // r
			if (g) {
				g=0;
				location.href = '/rooms/';
			} else {
				location.href = location.href;
			}
			break;
		case 83: // s
			if (g) {
				g=0;
				location.href = '/settings/subscriptions';
			} else {
				event.preventDefault();
				triggerClick(currentEntry.find('.l_more'));
				triggerClick($('.l_reshare'));
				unsafeWindow.document.onkeydown = typingComment;
				unsafeWindow.document.onclick = typingMouse;
			}
			break;
		case 84: // t  -- doesn't function yet
			triggerClick($('.tabs .selected').next('.tab').find('a'));
			break;
		case 87: // w
			if (g) {
				g=0;
				location.href = '/summary?days=7';
			}
			break;
		case 191: // /
			if (modifierShift) {
				showHelp();
				break;
			}
			event.preventDefault();
			$('input.query').each(function () { this.focus(); });
			break;
	}
	addHandlers();
}

function endHover(link) {
	link.each(function () { 
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("mouseout", true, true);
		this.dispatchEvent(evt);
	});
}

function triggerHover(link) {
	link.each(function () { 
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("mouseover", true, true);
		this.dispatchEvent(evt);
	});
}

// todo: make a pretty help, not just a fugly alert box.
function showHelp() {
	alert("friendfeed keyboard shortcuts:\nj: down (next entry)\nk: up (previous entry)\nl: like/unlike\n" +
		"c: comment\nh: hide/unhide\ne: expand comments\nm: expand media\n" +
		"a: expand all itmes in cluster (buggy)\nv or ENTER: open link in new tab/window\n" + 
		"f: show/hide poster's userpopup\n\t(if userpopup open: ENTER: open user's page)\n" +
		"p: post\n/: search\nr: refresh page\ng then m: go to \"My Feed\"\ng then r: go to \"Rooms\"\n" +
		"g then e: go to \"Everyone\"\ng then h: go to \"Home\" feed\ng then s: go to Friend Settings\n" + 
		"g then d: go to Best of Day\ng then w: go to Best of Week\n?: this help");
}

function openLink(link) {
	link.each(function () {
		unsafeWindow.open(this.href);
	});
}

function triggerClick(link) {
	link.each(function () { 
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", true, true);
		this.dispatchEvent(evt);
	});
}	

function typingMouse(event) {
	if (event.target.value == "Post" || event.target.value == "Search" || event.target.value == "Share on FriendFeed") {
		unsafeWindow.document.onkeydown = KeyCheck;
		unsafeWindow.document.onclick = mouseUse;
		return;
	}
}

function typingComment(event) {
	var key = event.keyCode;
	if (key == 13) {
		unsafeWindow.document.onkeydown = KeyCheck;
		unsafeWindow.document.onclick = mouseUse;
	}
	if (key == 27) {
		triggerClick(currentEntry.find('.l_cancelcomment'));
		unsafeWindow.document.onkeydown = KeyCheck;
		unsafeWindow.document.onclick = mouseUse;
	}
	// todo:  cancelling the comment form via mouseclick needs to return the onkeydown event handlers to KeyCheck, mouseUse
}
	


var o=$.scrollTo=function(a,b,c){o.window().scrollTo(a,b,c)};o.defaults={axis:'y',duration:1};o.window=function(){return $($.browser.safari?'body':'html')};$.fn.scrollTo=function(l,m,n){if(typeof m=='object'){n=m;m=0}n=$.extend({},o.defaults,n);m=m||n.speed||n.duration;n.queue=n.queue&&n.axis.length>1;if(n.queue)m/=2;n.offset=j(n.offset);n.over=j(n.over);return this.each(function(){var a=this,b=$(a),t=l,c,d={},w=b.is('html,body');switch(typeof t){case'number':case'string':if(/^([+-]=)?\d+(px)?$/.test(t)){t=j(t);break}t=$(t,this);case'object':if(t.is||t.style)c=(t=$(t)).offset()}$.each(n.axis.split(''),function(i,f){var P=f=='x'?'Left':'Top',p=P.toLowerCase(),k='scroll'+P,e=a[k],D=f=='x'?'Width':'Height';if(c){d[k]=c[p]+(w?0:e-b.offset()[p]);if(n.margin){d[k]-=parseInt(t.css('margin'+P))||0;d[k]-=parseInt(t.css('border'+P+'Width'))||0}d[k]+=n.offset[p]||0;if(n.over[p])d[k]+=t[D.toLowerCase()]()*n.over[p]}else d[k]=t[p];if(/^\d+$/.test(d[k]))d[k]=d[k]<=0?0:Math.min(d[k],h(D));if(!i&&n.queue){if(e!=d[k])g(n.onAfterFirst);delete d[k]}});g(n.onAfter);function g(a){b.animate(d,m,n.easing,a&&function(){a.call(this,l)})};function h(D){var b=w?$.browser.opera?document.body:document.documentElement:a;return b['scroll'+D]-b['client'+D]}})};function j(a){return typeof a=='object'?a:{top:a,left:a}}

function letsJQuery() 
{
	currentCluster = $('.feed .cluster:first');
	currentEntry = currentCluster.find('.entry:first');
	currentEntry.toggleClass('selectedEntry');

	at = new RegExp(/name="at" value="([\S\s]*?)"/ig).exec(unsafeWindow.gShareMainForm);
	//console.log(at[1].toString());
}
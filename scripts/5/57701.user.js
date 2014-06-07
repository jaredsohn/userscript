// ==UserScript==
// @name           Facebook Refresh 2 Alpha
// @description    Complete Rewrite of Previous Version
// @version        2.0.3
// @include        http://www.new.facebook.com/*
// @exclude       http://*.facebook.com/inbox/
// ==/UserScript==
var scr_name='Facebook Refresh 2 Alpha';
var scr_version='2.0.3';
var scr_id='24225';

// Refresh Settings
var reload = GM_getValue("reload", 30); // Amount of seconds between reloads
GM_registerMenuCommand("Set Refresh Time", function(){
var time = prompt("Seconds between refreshes:\n(must be greater than 20)", reload/1000);
window.location.reload();
if (time >= 20) {
GM_setValue("reload", time);
reload = GM_getValue("reload", 30);
} else if (time < 20) {
alert('The number must be greater than 20!');
} else {
alert('Must be a number!');
}
});

function $(element) { return document.getElementById(element); }

// Parse the response and replace the parts of the page
function Refresh(html) {
if ( $('home_main') && (updated=/<div id="home_main"[^>]*>((?:.|\n)*?)<a href="\/feed_prefs\.php" class="prefs_link">Options for Top Stories<\/a><\/div>/.exec(html)) ) { $('home_main').innerHTML = updated[1]+'<a href="/feed_prefs.php" class="prefs_link">Options for Top Stories</a></div></div>'; }
if ( $('home_main') && (updated=/<div id="home_main"[^>]*>((?:.|\n)*?)<a onclick="HomeFeed\.getInstance()\.loadOlder(); return false;">Show Older Stories<\/a><\/div>/.exec(html)) ) {$('home_main').innerHTML = updated[1]+'<a onclick="HomeFeed.getInstance().loadOlder(); return false;">Show Older Stories</a></div></div>'; }
if ( $('nav_inbox') && (updated=/<a [^>]*id="nav_inbox">(.*?)<\/a>/.exec(html)) ) { $('nav_inbox').innerHTML = updated[1]; }
//if ( $('content') && (url.match(/topic\.php/i) != null) && (updated=/<div id="content"[^>]*>((?:.|\n)*?)<\/div><\/div>\n<\/div>/.exec(html)) ) { $('content').innerHTML = updated[1]; }
//if ( $('messages') && (updated=/<div [^>]*id="messages">((?:.|\n)*?)<div class="msg_divide_bottom">&nbsp;<\/div><\/div>/.exec(html)) ) { $('messages').innerHTML = updated[1]+'<div class="msg_divide_bottom">&nbsp;</div>'; }
//if ( $('wall_posts') && (updated=/<div [^>]*id="wall_posts">((?:.|\n)*?)(<\/div>\n<\/div>|<\/div><div id="see_all_posts")/.exec(html)) ) { $('wall_posts').innerHTML = updated[1]; }
//if ( $('megaboxx') && (updated=/<table [^>]*id="megaboxx">((?:.|\n)*?)<\/table>/.exec(html)) ) { $('megaboxx').innerHTML = updated[1]; }
 setTimeout(function () { XHR(); }, reload);
}

// Get the abosolute url of the current page
function current_url() {
  if (window.location.hash.match(/\.php/)) {
      return 'http://'+window.location.host+window.location.hash.split('#')[1] + "#refresh";
    } else if (window.location.hash != '') {
      return window.location.hash.split('#')[0] + '#refresh';
    } else {
      return window.location.href;
    }
}

// Get updated source of current page
function XHR() {
  if (((last_press + wait) - (Math.round(new Date().getTime() / 1000))) <= 0) {
GM_xmlhttpRequest({
    method: 'GET',
    url: current_url(),
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
    html = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
	Refresh(html);
    }
});
  } else {
    setTimeout(function () { XHR(); }, reload);
  }
}

// Pauses the update when you are typing
var last_press = 0;
var wait = 5;
document.addEventListener("keydown", function(e) { last_press = Math.round(new Date().getTime() / 1000) }, false);

if (self.location == top.location) { // Don't run the script in an iframe
// Run the script
url = current_url();
reload = reload * 1000;
setTimeout(function () { XHR(); }, reload);
 }

// Auto update script
// I know everyone and their mother has wrote one, but I thought I'd toss my hat in
if (GM_getValue('updated', 0) == 0) {
GM_setValue('updated', Math.round(new Date().getTime() / 1000));
} else if (GM_getValue('updated', 0) != 'off') {
GM_registerMenuCommand("Auto Update "+scr_name, function(){GM_setValue('updated', Math.round(new Date().getTime() / 1000));});
}
if ( (Math.round(new Date().getTime() / 1000) > (GM_getValue('updated', 0) + 6)) && (GM_getValue('updated', 0) != 'off') ) {
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/review/'+scr_id+'?format=txt',
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(xpr) {
	version=/scr_version='(.*)';/i.exec(xpr.responseText);
	scr_name=/scr_name='(.*)';/i.exec(xpr.responseText);
	if ( (version[1] != scr_version) && (confirm('A new version of the '+scr_name[1]+' userscript is available. Do you want to update?')) ) {
	GM_setValue('updated', Math.round(new Date().getTime() / 1000));
	document.location.href = 'http://userscripts.org/scripts/source/'+scr_id+'.user.js';
	} else if (version[1] != scr_version) {
		if(confirm('Do you want to turn of auto updating for this script?')) {
		GM_setValue('updated', 'off');
		GM_registerMenuCommand("Auto Update "+scr_name[1], function(){GM_setValue('updated', Math.round(new Date().getTime() / 1000));});
		} else {
		GM_setValue('updated', Math.round(new Date().getTime() / 1000));
		}
	} else {
		GM_setValue('updated', Math.round(new Date().getTime() / 1000));
	}
	}
});
}
}
// ==UserScript==
// @name           Popmundo Forum Patroller
// @namespace      http://popodeus.com
// @description    Citizen patrol in the Popmundo forums. Like and unlike cool and bad posts. Tag offensive posts!
// @include        http://www*.popmundo.com/Common/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=100428&days=1
// @version        2
// @copyright      http://popodeus.com/ No rights to alter and redistribute without prior written approval.
// ==/UserScript==

var version = 2;
var loc = document.location.href.toLowerCase();
var ref = document.referrer.toLowerCase();
var POSTURL1 = 'http://popodeus.com/rpc/forum/vote/add';
var ERRURL1 = 'http://popodeus.com/log-error.jsp';
var TAGLISTURL = 'http://popodeus.com/scripts/report-reasons.jsp';
var TAGIMGURL = 'http://popodeus.com/forum-search/tags/image/POSTID';
var default_list = 'Offensive,Wrong forum,Wrong language';
var vote_buttons = {
	'fx-up': { title: 'Like!', value: '+', icon: 'vote_up' },	
	'fx-down': { title: 'Boo!', value: '-', icon: 'vote_down' }	
};
function fail(msg) {
	GM_log("Script has failed: " + msg);
	GM_xmlhttpRequest({
		method:'POST',
		url:ERRURL1,
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		data: 'err=' + encodeURIComponent(msg),
		onload: handler
	});
}
function $xx(root, xpath) {
	if (!xpath) {
		xpath = root;
		root = document;
	}
	return document.evaluate(xpath, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function $x(root, xpath) {
	var elem = $xx(root, xpath);
	if (elem && elem.snapshotLength == 1) {
		return elem.snapshotItem(0);
	} else {
		return null;
	}
}
function doit(send, handler) {
	if (!handler) handler = function() { };
	var link = $('a[href*="folderid"][target="menu"]').eq(0);
	if (link) {
		send.folder = $(link).attr('href').match(/folderid=(\d+)/)[1];
	}
	try {
		var tmp = $x("id('cn')/table[1]/tbody/tr[2]/td[2]").textContent;
		send.topic = tmp.replace(/\n/g, '').substring(tmp.lastIndexOf('»')).trim();
	} catch (ex) {
		fail(ex);
	}
	var str = '';
	for (var key in send) { str += key + "=" + encodeURIComponent(send[key]) + "&"; }
	str = str.substring(0, str.length-1);
	GM_xmlhttpRequest({
		method:'POST',
		url:POSTURL1,
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		data: str,
		onload: handler
	});
}
// Vote on forum posts
if (loc.indexOf('cn.asp?a=v&t=') > 0 || loc.indexOf('cn.asp?action=view&threadid=') > 0) {
	GM_addStyle('@import url(http://res1.popodeus.com/forum-search/tagger-style.css)');

	function hoovon() {
		try {
			$('#popodeus-f-vote').insertAfter(this).css('display', 'block');
			$('#fx-info').insertAfter(this).hide();
			$('#fx-tagging').toggle(this.className != 'messageBoxOfficial');
			var box = this.getElementsByClassName('box0');
			if (box) {
				var links = box[0].getElementsByTagName('a');
				var ok = false;
				var i = 0;
				for (i = 0; i < links.length; i++) {
					var link = links[i]; 
					if (link.href.indexOf("cn.asp?") >= 0) {
						var postid = link.innerHTML;
						$('#fx-stats').html('<img width="120" height="18" src="'+TAGIMGURL.replace(/POSTID/, postid)+'" alt="'+postid+' statistics">');
						ok = true;
						break;
					}
				}
				if (!ok) {
					fail('Could not find post id for ' + location.href);
				}
			}
		} catch(ex) { 
			fail(ex);
		}
	}
	function hoovoff() {
		$('#popodeus-f-vote').css('display', 'none');
	}
	function hideVoteInfo() {
		$('#fx-info').fadeOut();
	}
	function sendClick(txt, node) {
		try {
			var links = node.getElementsByTagName('a')
			for (var i = 0; i < links.length; i++) {
				var link = links[i];
				if (link.href.indexOf('a=v&t=') > 0) {
					var tmp = link.href.match(/t=(\d+)&n=(\d+)/);
					var id = tmp[1] + '.' + tmp[2];
					var dbg = "Tagged as " + txt;
					$('#fx-info').html(dbg).css('display', 'block');
					$('#popodeus-f-vote').fadeOut('fast');
					doit({postid:id,tag:txt}, function(res) {
						GM_log(res.responseText);
						setTimeout(hideVoteInfo, 1500);
					});
					break;
				}
			}
		} catch(ex) {
			fail(ex);
		}
	}
	function voteclick() {
		sendClick($(this).attr('alt'), this.parentNode.parentNode.previousSibling.previousSibling);
	}
	function tagclick() {
		sendClick($(this).html(), this.parentNode.parentNode.previousSibling.previousSibling);
	}
	function activate() {
		var iface = '<div id="popodeus-f-vote" style="display: none;">';
		iface += '<span id="fx-voting">';
		for (var btn in vote_buttons) {
			var props = vote_buttons[btn];
			iface += '<img src="http://res1.popodeus.com/scripts/gfx/'+props.icon+'.png" alt="'+props.value+'" id="'+btn+'" title="'+props.title+'"/> ';
		}
		iface += '</span>';
		
		var taglist = GM_getValue('taglist', default_list);
		var tags = taglist.split(",");
		iface += '<span id="fx-tagging">';
		for (var i=0; i<tags.length; i++) {
			iface += '<span class="tag'+i+'">'+tags[i]+'</span>';
		}
		iface += '</span>';
		iface += '<span id="fx-stats"></span>'
		iface += '<div id="fx-info" style="display: none">Vote info comes here</div>';
		iface += '</div>';
		
		$(document).ready(function() {
			$('body').append(iface);
			$('#fx-voting > img').click( voteclick );
			$('#fx-tagging > span').click( tagclick );
			$('div.messageBox,div.messageBoxOfficial').mouseenter(hoovon);
			$('#popodeus-f-vote').mouseleave(hoovoff);
			$('#cn').mouseleave(hoovoff);
		});
	}

	var taglist = GM_getValue('taglist');
	var taglist_refresh = GM_getValue('taglist.refresh');
	var now = parseInt(new Date().getTime()/1000);
	if (!taglist || !taglist_refresh || now - taglist_refresh > 24*60*60) {
		GM_xmlhttpRequest({
			method:'GET',
			url:TAGLISTURL,
			onload: function(ret) {
				if (ret.status == 200) {
					var list = ret.responseText;
					GM_log("Refreshed tag list: " + list);
					GM_setValue('taglist.refresh', now);
					if (list.length > 0 && list.indexOf(",") > 0) {
						GM_setValue('taglist', list);
					} else {
						// boo...
						GM_setValue('taglist', default_list);
					}
					activate();
				}
			}
		});
	} else {
		activate();
	}
}
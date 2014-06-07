/*
 * LJ Memento, by chris t.  (lifftchi)
 * Provides a handy way of annotating people on Livejournal, so that
 * you can add some state to your interactions if you've got the
 * memory of a goldfish, like me.
 *
 * Based on LiveJournal Better User Popup, by RustyDragon
 *
 * version a -- apr. 16 2005
 * version b -- aug. 22 2006
 *
 * Changelog:
 * version a
 *  - Initial release (nonfunctional)
 * version b
 *  - First functional version.
 */

// ==UserScript==
// @name	LJ Memento
// @namespace	http://facepunch.org
// @description	Annote people with unparalled depravity!
// @version 	a
// @include	http://*.livejournal.com/*
// @exclude	http://pics.livejournal.com/*
// ==/UserScript==

// GM_log("start here") ;



// some options.  we don't know what many of them do, so we're going
// to ignore them for the nonce.

const ACCOUNT_USER      = 1;
const ACCOUNT_COMMUNITY = 2;
const ACCOUNT_SYNDICATE = 3;
const ACCOUNT_OPENID    = 4;


const LOADING_USERPIC = '?LOADING?';
const LOADING_MEMENTOS = '?LOADING?';

const NO_USERPIC = '[]';
const NO_MEMENTO = '[]' ;

// more options.
var option_userpic_cache = GM_getValue('options.userpic_cache', false) ;
var option_popup_delay = GM_getValue('options.popup_delay', 500) ;
var option_popup_opacity = GM_getValue('options.popup_opacity', '1.0') ;

// for external connect.
// raises questions about security and such, doesn't it?

// var mothership = GM_getValue('options.mothership', false) ;
// var mothership_username = GM_getValue('options.mothership_username', false) ;
// var mothership_password = GM_getValue('options.mothership_password', false) ;

var mothership = 'http://facepunch.org/lj_memento/lj_memento.php' ;
var mothership_username = 'anonymous' ;
var mothership_password = '' ;

// bookkeeping.
// are you sure it wouldn't be just as fast to just regenerate some
// of this stuff?

// this is a cache of urls.  _actual_ userpic is not cached.
var userpic_cache = (option_userpic_cache) ? null : new Array() ;

// we aren't using these for now.
var memento_cache = new Array() ;

// FIXME adjust model!
var userpic_layers = new Array() ;

// 'lj_mmt_memento_username' => html layer content
// not a cache, please note.
var memento_layers = new Array() ;
var timer = null ;

// add one global listener to clear the div
document.addEventListener('mousemove', check_popup, false) ;

// and one on each ljuser span to show the div.
var nodes = document.evaluate('//span[@class="ljuser"]', document, 
		null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null) ;
for(var n=0; n<nodes.snapshotLength; n++) {
	var span = nodes.snapshotItem(n) ;
	span.addEventListener('mouseover', make_popup, false) ;
}

function make_popup(ev) {

	if(ev.ctrlKey) {
		return ;
	}

	var pos = find_position(this) ;

	this.innerHTML.match(/<b>(.*)<\/b>/) ;
	if(RegExp.$1) {
		var user = RegExp.$1 ;
	} else { 	// should catch the rest.  i hope.
		this.innerHTML.match(/<a.*>(.*)<\/a>/) ;
		var user = RegExp.$1 ;
	}
	var type = 0 ;

	if(this.innerHTML.indexOf('userinfo.gif') > 0) {
		type = ACCOUNT_USER ;
	} else if(this.innerHTML.indexOf('community.gif') > 0) {
		type = ACCOUNT_COMMUNITY ;
	} else if(this.innerHTML.indexOf('syndicated.gif') > 0) {
		type = ACCOUNT_SYNDICATE ;
	} else if(this.innerHTML.indexOf('openid-profile.gif') > 0) {
		type = ACCOUNT_OPENID ;
		this.innerHTML.match(/bml\?userid=(\d*)&/) ;
		var openid_user = RegExp.$1 ;

		this.innerHTML.match(/<\/a><a href="(.*?)" rel="nofollow"/);
		var openid_user_hp = RegExp.$1 ;
	}

	if(type == 0) {
		GM_log('Unknown account type:' + this.innerHTML) ;
		return ;
	}

	var popup_html = '' ; 	// quote "we need this for speed and to
				// avoid auto-closing tags"
	var span_id = user ;
	userpic_layers[span_id] = LOADING ;
	memento_layers[span_id] = LOADING ;

	// top row.
	popup_html =  '<div style="white-space:nowrap; margin:0; \
				margin-bottom:10px; padding:0">' ;
	popup_html += get_userinfo_icon(type) ;
	popup_html += get_formatted_username(user, type) ;
	popup_html += get_memento_form(user, this) ;
	popup_html += '</div>' ;

	// remainder.
	popup_html += get_userpic_span(user) ;
	popup_html += get_memento_span(user) ;

	// delay slightly.  i have a feeling you can't actually set
	// the timer with a real function, owing to gm sandboxing.

	timer = window.setTimeout(function() {
		var div = document.createElement('div') ;
		div.id = 'lj_memento' ;
		div.style.cssText = 
				'border:1px #000 solid;' +
				'padding:10px;' +
				'background:#def;' +
				'color:#000;' +
				'position:absolute;' +
				'z-index:2001;' +
				'left:' + (pos[0] - 11) + 'px;' +
				'top:' + (pos[1] - 11) + 'px;' +
				'text-align:left;' +
				'width:500px;' ;
		div.innerHTML = popup_html ;

		// I am less than thrilled with this prospect.
		var old_popup = document.getElementById('lj_memento') ;
		if(old_popup) {
			old_popup.parentNode.removeChild(old_popup) ;
		}

		document.body.appendChild(div) ;
		var mmt_button = document.getElementById('mmt_submit');
		mmt_button.addEventListener("click", 
				post_mementos, true) ;

		// from betteruserpopup:
		// "We need this because loadUserPic might end 
		// before we get here"

		fill_userpic(span_id, userpic_layers[span_id]) ;
		fill_memento(span_id, memento_layers[span_id]) ;

		clear_timer() ;
	}, option_popup_delay) ;  // PHEW.  timer.

	// async load userpic, mementos.
	load_userpic(user, type) ;
	load_mementos(user) ;

}

// bits of indirection.

function get_userinfo_icon(type) {
	switch(type) {
		case ACCOUNT_USER:
			return '<img ' + 
			'src="http://stat.livejournal.com/img/userinfo.gif" '+ 
			'alt="[?]" style="border:none; '+
			'vertical-align:middle;"'+
			'height="17" width="17">' ;
			break ;
		case ACCOUNT_COMMUNITY:
			return '<img ' +
			'src="http://stat.livejournal.com/img/community.gif" '+
			'alt="[?] style="border:none; vertical-align:bottom;" '+
			'height="17" width="17">' ;
			break ;
		case ACCOUNT_SYNDICATE:
			return '<img '
			'src="http://stat.livejournal.com/img/syndicated.gif" '+
			'alt="[?] style="border:none; vertical-align:bottom;" '+
			'height="17" width="17">' ;
			break ;
		case ACCOUNT_OPENID:
			return '<img' +
			'src="http://stat.livejournal.com/img/openid-profile.gif" '+
			'alt="[?] style="border:none; vertical-align:bottom;" '+
			'height="17" width="17">' ;
			break ;
		default:
			return '' ;
			break ;
	}
}

function get_formatted_username(user, type) {
	switch(type) {
		case ACCOUNT_COMMUNITY:
			return '<b><a href="http://community.livejournal.com/' 
			+ user + '/">' + user + '</a></b>' ;
			break ;
		case ACCOUNT_USER:
		case ACCOUNT_SYNDICATE:
		case ACCOUNT_OPENID:
		default:
			return '<b><a href="http://' + user +
			'.livejournal.com">' + user + '</a></b> ' ;
			break ;
	}
}

// MEMENTO CONTENT

function get_memento_form(journal, obj) {

	// not a real form so that it won't submit on click.

	var ref = find_reference(obj) ;
	form_html = '<div style="display:inline;" id="mmt_form">'
	form_html += '<input type="text" style="border:1px solid black;"'
			+ 'name="note"> ' ;
	form_html += '<button style="border:1px solid black;" '
			+ 'name="click" value="true" id="mmt_submit">'
			+ 'add note</button>' ;
	form_html += '<input type="hidden" name="journal" value="'
			+ journal + '">' ;
	form_html += '<input type="hidden" name="secret" value="0">' ;
	form_html += '<input type="hidden" name="ref" value="'
			+ ref + '">' ;
	form_html += '</div>' ;
//	GM_log(form_html) ;
	return form_html ;
}

function get_memento_span(user) {
	return '<span id="lj_mmt_memento_' + user +
			'" style="position:absolute; left:120px; top: 45px;">' 
			+ LOADING + '</span>' ;
}

function load_mementos(user) {

	var form_data = 'user=' +
			encodeURIComponent(mothership_username) ;
	form_data += '&' ;
	form_data += 'pass=' +
			encodeURIComponent(mothership_password) ;
	form_data += '&' ;
	form_data += 'journal=' + user ;
	GM_xmlhttpRequest({ method: 'POST', url: mothership, 
			headers: { 'User-Agent':'lj memento' ,
				'Content-type':
					'application/x-www-form-urlencoded' },
			onerror: function(res) {
				GM_log('load_memento error: ' + res) ;
			},
			data: form_data,
			onload: function(res) {
//				GM_log('load? ' + res.responseText) ;
				var parser ;
				var dw = new XPCNativeWrapper(
						window,"DOMParser()") ;
				parser = new dw.DOMParser() ;

				var dom = parser.parseFromString(
						res.responseText,
						"text/xml") ;
				var list = dom.getElementsByTagName('note') ;
				var m ;
				var ref ;
				var cache = new Array() ;

				for(var i=0; i<list.length; i++) {
					m = list[i].
						getElementsByTagName('n')[0].
						textContent ;
					ref = list[i].
						getElementsByTagName('r')[0].
						textContent ;
					// great.  now cache it.
					cache[m] = ref ;
//					GM_log(m + ':' + ref) ;
				}
				memento_cache[user] = cache ;
				instantiate_mementos(user, cache) ;
			}
	}) ;
}

function post_mementos() {
	var subject ;
	var form_data = 'user=' +
			encodeURIComponent(mothership_username) ;
	form_data += '&' ;
	form_data += 'pass=' +
			encodeURIComponent(mothership_password) ;
	var fields = document.getElementById("mmt_form").childNodes ;
	for (var i=0 ; i<fields.length ; i++) {
		if(!fields[i].name) continue ;
		if(fields[i].name=='journal') subject = fields[i].value ;
		form_data += '&' ;
		form_data += encodeURIComponent(fields[i].name) ;
		form_data += '=' ;
		form_data += encodeURIComponent(fields[i].value) ;
	}

	GM_xmlhttpRequest({ method: 'POST', url: mothership, 
			headers: { 'User-Agent':'lj memento' ,
				'Content-type':
					'application/x-www-form-urlencoded' },
			onerror: function(res) {
				GM_log('memento error: ' + res) ;
			},
			onload: function(res) {
				load_mementos(subject) ;
			},

			data: form_data
	}) ;
//	GM_log("posted:" + form_data) ;

	load_mementos(subject) ;
//	GM_log("reloading for" + subject) ;

	// FIXME this is lame
//	var old_popup = document.getElementById('lj_memento') ;
//	if(old_popup) {
//		old_popup.parentNode.removeChild(old_popup) ;
//	}
}


function instantiate_mementos(user, m) {

	// wow, these variables are poorly named.  why did i do this?

	// i don't even know if this func has any use, so i'm leaving
	// this in.
//	GM_log('instantiate!') ;

	var mmt_html ;
	var row ;

	mmt_html = ''
	for(var i in m) {
		row = format_memento(i, m[i]) ;
		mmt_html += row ;
	}

	fill_memento(user, mmt_html) ;
	return ;
}

function format_memento(m, ref) {
	return "<div class='mmt_item' " +
			"padding-left:10px; clear:right;'>" + m + 
			"<a href='" + ref + "'>" + REFERENCE +
			"</a></div>";
}

// USERPICS.

function get_userpic_span(user) {
	return '<span id="lj_mmt_userpic_' + user + '" style="float:left;">' 
			+ LOADING + '</span>' ;
}

function load_userpic(user, type) {

 	if(type != ACCOUNT_USER) {
 		return ;
 	}

 	var pic = get_userpic_cached(user) ;
	rss_url = 'http://www.livejournal.com/users/' + user + '/data/rss' ;

	if(pic == undefined) {
		set_userpic_cached(user, LOADING_USERPIC) ;
		pic = userpic_supplicant(user, rss_url) ;
	} else if(pic == LOADING_USERPIC) {
		return ; // userpic is loading; do nothing.
	} else if(pic == NO_USERPIC) {
		fill_userpic(user, pic) ;
	}

	// having handled caching. . .

	instantiate_userpic(pic, user) ;
}

// for caching userpics -- structure will come together.  have faith.

function set_userpic_cached(user, userpic) {
	if(option_userpic_cache) {
		gm_setValue('user.' + user, userpic) ;
	}
	else {
		userpic_cache[user] = userpic ;
	}
}

function get_userpic_cached(user) {
	if(option_userpic_cache) {
		return GM_getValue('user.' + user, undefined) ;
	}
	else {
//		GM_log("returning " + userpic_cache[user]) ;
		return userpic_cache[user] ;
	}
}

// for actually downloading the damned things.

function userpic_supplicant(user, src) {
	GM_xmlhttpRequest({ method: 'GET', url: src, 
			headers: { 'User-Agent':'lj memento' },
			onerror: function(res) {
				GM_log('userpic error: ' + res) ;
			},
			onload: function(res) {
				var parser ;
				var dw = new XPCNativeWrapper(
						window,"DOMParser()") ;
				parser = new dw.DOMParser() ;

				var dom = parser.parseFromString(
						res.responseText,
						"text/xml") ;
				var d_img = xpath('//image', dom) ;
				if(d_img.length == 0) {
					set_userpic_cached(user, NO_USERPIC) ;
					fill_userpic(user, NO_USERPIC) ;
					return ;
				}

				var nodes = xpath('//image/url/text()', dom) ;
				var img_url = nodes[0].nodeValue ;
//				img_url.match(/userpic\/(.*)$/) ;
//				var userpic = RegExp.$1 ;
				set_userpic_cached(user, img_url) ;

				instantiate_userpic(img_url, user) ;
			}
		}) ;
	}

function instantiate_userpic(img_url, user) {

	var w = new XPCNativeWrapper(window, "Image()") ;
	var img = new w.Image() ;

	img.onload = function() {
		fill_userpic(user, get_formatted_userpic(img_url)) ;
	}
	img.src = img_url ;
	return ;
}

function get_formatted_userpic(url) {
	return '<img src="' + url + '" style="border:1px grey solid;" ' +
	'alt="userpic"/>' ;
}

// utility functions

function fill_userpic(user, text) {
	userpic_layers[user] = text ;

	var s = document.getElementById('lj_mmt_userpic_' + user) ;
	if(s) {
		s.innerHTML = text ;
	}
}

function fill_memento(id, text) {
	/*
	 * maybe we should make this unconditionally fill from cache.
	 * there may in that case be scoping problems.
	 */
	memento_layers[id] = text ;

//	GM_log("fill memento") ;
	var s = document.getElementById('lj_mmt_memento_' + id) ;
	if(s) {
		s.innerHTML = text ;
	}
}

function check_popup(ev) {
	var div = document.getElementById('lj_memento') ;
	if(div) {
		pos = find_position(div) ;
		var w = pos[0] + div.offsetWidth ;
		var h = pos[1] + div.offsetHeight ;

		if(	((ev.pageX <= pos[0] +1) ||
				(ev.pageX >= w - 1)) ||
			((ev.pageY <= pos[1] + 1) ||
				(ev.pageY >= h - 1))	) { 

			clear_timer() ;
			div.parentNode.removeChild(div) ;
		}
	}
	return true ;
}

function find_reference(obj) {
	/*
	 * takes a dom node, and walks the tree trying to figure out an
	 * appropriate url to return as a reference.
	 */
	var linkdiv ;
	var link ;

	// if we're in the header line of a comment, return a link to
	// the comment.

	linkdiv = obj.childNodes ;
	for(var i=0 ; i<linkdiv.length ; i++) {
		if(linkdiv[i].getAttribute && 
				linkdiv[i].getAttribute("id") &&
				linkdiv[i].getAttribute("id").match(/ljcmt/)) {
			link = obj.getElementsByTagName('a') ;
			for(var j=0 ; j<link.length ; j++) {
				if(link[j].textContent.match(/link/i)) {
					return link[j].href ;
				}
			}
		}
	}


	// if we're in the header of a post, return a link to the
	// post.  if we're being mentioned in an entry, return a link 
	// to the entry.

	linkdiv = obj.getElementsByTagName('div') ;
	for(var i=0 ; i<linkdiv.length ; i++) {
		if(linkdiv[i].className &&
				linkdiv[i].className.match(/permalink/)) {
			link = linkdiv[i].getElementsByTagName('a') ;
			return link[0].href ;
		}
	}

	// if none of these apply, but we can check the parent, do
	// so.

	if (obj.parentNode) { return find_reference(obj.parentNode) ; }

	// if we've reached the top, return the current url (yes, even 
	// if it's useless.)

	else { 
		return location.href ; 
	}

}


function find_position(obj) {
	var x = 0, y = 0 ;
	while(obj.offsetParent) {
		x += obj.offsetLeft ;
		y += obj.offsetTop ;
		obj = obj.offsetParent ;
	}
	return [x,y] ;
}

function clear_timer() {
	if(timer != null) {
		clearTimeout(timer) ;
		timer = null ;
	}
}

function xpath(expr, doc) {
	if(!doc) {
		doc = document
	}

	var nodes = doc.evaluate(expr, doc, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) ;
	var ret = [] ;
	for (var n=0 ; n < nodes.snapshotLength ; n++) {
		ret.push(nodes.snapshotItem(n)) ;
	}
	return ret ;
}

const LOADING = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t'+
		'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'+
'fySDhGYQdDWGQyUhADs="> Loading...' ;

const REFERENCE ='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAo'+
'AAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP////'+
'///8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7'+
'Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC">'

// LJ Instant Comment
// version 0.12
// 2007-11-13
// Copyright (c) 2005-2007, Tim Babych
// Homepage: http://clear.com.ua/projects/firefox/instant_comment
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "LJ Instant Comment", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            LJ Instant Comment 
// @namespace      lj_instant_comment
// @description	 v0.12 Adds "Instant Comment" link besides "Comment on this"
// @include      http://*.livejournal.com/*
// ==/UserScript==

	// cyrillic quotes
//	_smart_quotes_regexp = '$1\u00ab$2\u00bb$3'

	// latin quotes 
	_smart_quotes_regexp = '$1\u201c$2\u201d$3'

// change those to customize your input box
_window_width  = 300
_window_height = 70
_left_offset = 200

// change to customize Instant Links naming
_link_title = "Instant Comment"

//================================
//	WORKHORSES
//================================

// triggerd by clicking Instant Comment link
function post_comment(){
	
	dd = document.getElementById('instant_comment')
	
	if (dd.getAttribute('caller_entry_id') == this.id) // hide-unhide
		if (dd.style.display == 'block' ) {
			hide_div(dd)
			return
		} else
			dd.style.display = 'block'
	else {
		// insert it in da new place
		dd.style.left = (findPosX(this) - _left_offset) + "px"
		dd.style.top = (findPosY(this) + 20) + "px"
		dd.setAttribute('caller_entry_id', this.id)
		dd.firstChild.value = ''
		dd.style.display = 'block'
	} 
	
	// workaround near firefox 1.0 bug with focus()
	hScroll = window.pageXOffset; vScroll = window.pageYOffset
	dd.firstChild.focus()
	window.scrollTo(hScroll, vScroll)
}

// triggered when user presses Ctrl+Enter
function trigger_submit_on_ctrl_enter(e) {
	//hide on Esc
	if (e.keyCode==27) {
		hide_div(this.parentNode)
	}

	// not enter and (ctrl or alt)
	if (! (e.keyCode==13 && (e.ctrlKey || e.altKey))) 
		return
	
	msgText = zakavych(this.value)
	msgEncoded = encodeURIComponent(msgText)

	reply = document.getElementById(this.parentNode.getAttribute('caller_entry_id'))
	reply.style.border = "3px solid rgb(0,250,0)"
	reply.style.padding = "3px"
	reply.setAttribute('mycolor', 200)
	reply.setAttribute('step', -5)

	fading = function(){
		elem = reply
		mycolor = parseInt(elem.getAttribute('mycolor'))
		step = parseInt(elem.getAttribute('step'))
		if ( mycolor> 250)
			step -= 5
		if ( mycolor < 50)
			step += 5
		mycolor += step
		elem.style.borderColor = "rgb("+mycolor+", 250,"+mycolor+")"
		elem.setAttribute('mycolor', mycolor)
		reply.setAttribute('step', step)
	}

	anim = window.setInterval(fading, 15)
	hide_div(this.parentNode)
	
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: reply.getAttribute('orig_href'),
	    onload: function(responseDetails) {
		var s = responseDetails.responseText
		try {
		    tokens = ["lj_form_auth", "chal", "cookieuser", "chrp1", "journal"]
		    token_str = '&usertype=cookieuser'
		    for (key in tokens) {
		        token = tokens[key]
		        r = new RegExp('["\']'+token+'["\'].+?value=["\'](\\S+?)["\']')
		        token_str += '&'+token+'='+r.exec(s)[1]
		    }
		} catch(err) {
			window.clearInterval(anim); 
			reply.style.borderColor="red"			
			window.alert('Error getting LJ auth token. \nMake sure you are logged in and not banned.')
			return
		}
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://www.livejournal.com/talkpost_do.bml',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey Instant Comment',
				'Content-type': 'application/x-www-form-urlencoded',
			},
    		data: 'itemid='+reply.getAttribute('itemid')+'&body='+msgEncoded+token_str,
			onload: function(responseDetails) {
				window.clearInterval(anim); 
				// we check for the first line of the comment				
				needle = msgText.split("\n")[0]
				// or just for URL in that line
				if (urls_in_post = needle.match('https?://\\S+'))
				    needle = urls_in_post[0]
				    
				if (responseDetails.responseText.indexOf(needle) == -1) {
				    // Text was not found in responce
					reply.style.borderColor="red"
					homepage = "\n\nIf the error repeats, please contact me.\nTim Babych, http://clear.com.ua"
					if (responseDetails.responseText.indexOf("Frank's nibbling on the wires") != -1) {
					    window.alert("Your comment was not posted. \nFrank's nibbling on the wires."+homepage)
					} else {
            			window.alert('Your comment was not posted.\nPosted msg was "'+msgText+'"'+homepage)
            		
            		// UNCOMMENT This to see actual error page given by LJ	
                    // window.document.body.innerHTML = responseDetails.responseText
            		}
				} else {
					reply.style.borderColor="green"				
				}
			}
		});

		
	    }
	})
}

// hide input div, return focus to page
function hide_div(div){
	div.style.display = 'none'
	div.firstChild.blur()
}


//================================
//	INIT
//================================

d = document.createElement('DIV')
d.id = "instant_comment"
d.setAttribute('caller_entry_id', false)
if (navigator.userAgent.indexOf("Mac") !=-1)
    hint = 'Alt+Enter to post'
else
    hint = 'Ctrl+Enter to post'
d.innerHTML = "<textarea id='instant_comment_textarea'></textarea><br/><small>"+hint+"</small>"
d.firstChild.addEventListener("keydown", trigger_submit_on_ctrl_enter, false);
document.body.appendChild(d)
//--------------------------------------------------------

/* 
NAME.livejournal.com/123456.html
community.livejournal.com/NAME/123456.html
users.livejournal.com/NAME/123456.html
*/
get_itemid_regexp = /([\w\d-]+)\.livejournal\.com\/([\w\d]*\/)?(\d+)\.html/ 
var allReplies
allReplies = document.evaluate(
    "//a[contains(@href, '?mode=reply')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allReplies.snapshotLength; i++) {
	thisOne = allReplies.snapshotItem(i);

	t = document.createTextNode(' - ')
	thisOne.parentNode.insertBefore(t, thisOne.nextSibling);
	
	params =  get_itemid_regexp.exec(thisOne.href)

	if (!params)
		// unmatched url, may be dead or greatest journal ?
		continue

	a = document.createElement('a')
	linktxt = document.createTextNode(_link_title)
	a.href = 'javascript:void(0)'
	
	if (params[1] == 'community' || params[1] == 'users')
		journal =  params[2].substr(0, params[2].length -1)
	else 
		journal = params[1]
		
	itemid = params[3]

	a.setAttribute('itemid', itemid)
	a.setAttribute('orig_href', thisOne.href)
	a.id = 'insta_'+journal + itemid
	a.addEventListener("click", post_comment, false);	
	a.appendChild(linktxt)
	t.parentNode.insertBefore(a, t.nextSibling);
}
//-----------------------------------------------------------------------
GM_addStyle(
" #instant_comment { position: absolute; display: none;	border: 1px solid #999;"+
"	background: #ececec; padding: 1px; text-align: center; z-index:99}"+
"#instant_comment textarea { width:"+_window_width+"px; height:"+_window_height+"px; min-height: 10px;"+
"	margin: 1px; border:1px solid #999; padding-left: 3px;	background: white; color:black; }"+
"#instant_comment textarea:focus { border:1px solid black; }"+
"#instant_comment small { color:#999; font: 10px Arial }"
)
//-----------------------------------------------------------------------

//====================================
//	ROUTINES
//====================================

function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} 
	return curleft;
}

function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} 
	return curtop;
}

function zakavych(text) {
	
	replacements = [
	
	// smart quotes
	[/(\s+|^)"([^\"]+?)"(\s+|$|\.|\,)/g, _smart_quotes_regexp],

	// ukrainian apostrophe
	[/([\u0406-\u0491])[\*'`]([\u0406-\u0491])/g, '$1\u2019$2'],

	// trademark (TM) and such
	[/\((tm|TM|\u0422\u041C|\u0442\u043C)\)/g, '\u2122'],
	
	// copyright (C) and such
	[/\([cC\u0421\u0441]\)/g, '\u00a9'],
	
	// registered (R) and such
	[/\([rR\u0420\u0440]\)/g, '\u00ae'],
	
	// mdash -- one or two minuses surrounded by spaces
	[/(\s+|^)--?(\s+)/g, '$1\u2014$2'],
	
	// **bold**	
	[/\*{2}(.+?)\*{2}/g, '<b>$1</b>'],
	
	// //italic//
	[/([^\:]|^)\/{2}(.+?)\/{2}/g, '$1<i>$2</i>'],
	
	// --strikeout--
	[/-{2}(.+?)-{2}/g, '<s>$1</s>'],

	// __underlined__
	[/_{2}(.+?)_{2}/g, '<u>$1</u>'],
	
	// ndash for number ranges: 1995-2005
	[/(\s)(\d+)-(\d+)(\s)/g, '$1$2\u2013$3$4'],
	
	// ellipsis	
	[/\.\.\./g, '\u2026']
	
	];

	s = text
	for( i=0; i < replacements.length; i++) {
		s = s.replace(replacements[i][0], replacements[i][1])
	}
	
	return s
}

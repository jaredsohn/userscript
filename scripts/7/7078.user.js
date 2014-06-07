// ==UserScript==
// @name            LJ Instant Tag 
// @namespace     http://carranza-collective/greasemonkey
// @description	 Adds "Quick Tag" link besides "Comment on this", allows you to tag entries without leaving the page.  Version 0.1
// @include      http://*.livejournal.com/*
// ==/UserScript==

/*
 	Script courtesy of Joel Carranza,
	joel.carranza@gmail.com
	http://www.carranza-collective.com/joel/software/flickr-discussion-images/
	Modified from instanttag.user.js script from http://clear.com.ua/projects/firefox/instant_tag
	Licensed under GPL (http://www.gnu.org/copyleft/gpl.html)
	
	Change Log
	----------
	0.1 - Initial Release (1/11/2007)
    
*/

// change those to customize your input box
_window_width  = 300
_window_height = 70
_left_offset = 200

// change to customize Quick Links naming
_link_title = "Quick Tag"

var tagList = new Array();
if(GM_getValue('tagList'))
	tagList = GM_getValue('tagList').split(/\s*,\s*/);
var tagListMaxSize = 25;

var journal_username = document.URL.replace(/http:\/\/(\w+)\.livejournal.com\/.*/,"$1");

//================================
//	WORKHORSES
//================================

// triggerd by clicking Quick Tag link
function post_comment(){
	

	dd = document.getElementById('instant_tag')
	dd_list = document.getElementById('instant_tag_list')
	while(dd_list.hasChildNodes()) {
		dd_list.firstChild.removeEventListener("click", trigger_add_tag, false);
		dd_list.removeChild(dd_list.firstChild);
	}
	
	for(var i=0;i<tagList.length;++i)
	{
		var li = document.createElement('LI');
		li.appendChild(document.createTextNode(tagList[i]));	
		li.addEventListener("click", trigger_add_tag, false);
		
		dd_list.appendChild(li);
	}



	if (dd.getAttribute('tag_caller_entry_id') == this.id) // hide-unhide
		if (dd.style.display == 'block' ) {
			hide_div(dd)
			return
		} else
			dd.style.display = 'block'
	else {
		// insert it in da new place
		dd.style.left = (findPosX(this) - _left_offset) + "px"
		dd.style.top = (findPosY(this) + 20) + "px"
		dd.setAttribute('tag_caller_entry_id', this.id)
		dd.firstChild.value = ''
		dd.style.display = 'block'
	} 
	
	// workaround near firefox 1.0 bug with focus()
	hScroll = window.pageXOffset; vScroll = window.pageYOffset
	dd.firstChild.focus()
	window.scrollTo(hScroll, vScroll)
}

function trigger_add_tag(e) {
	var textarea = document.getElementById('instant_tag').firstChild;
	var tags = textarea.value.split(/\s*,\s*/);
	var newTag = this.textContent;
	if(tags.indexOf(newTag) == -1)
	{
		if(textarea.value.match(/^\s*$/))
			textarea.value = newTag;
		else
			textarea.value += ','+newTag;
	}
	textarea.focus();
	return false;
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
	
	var newTags = this.value.split(/\s*,\s*/);
	for(var i=0;i<tagList.length && newTags.length < tagListMaxSize;++i)
	{
		if(newTags.indexOf(tagList[i]) == -1)
			newTags.push(tagList[i]);
	}
	newTags.sort();
	tagList = newTags;
	GM_setValue('tagList',newTags.join(','));

	msgbody = encodeURIComponent(this.value)

	reply = document.getElementById(this.parentNode.getAttribute('tag_caller_entry_id'))
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
		var lj_form_auth = /lj_form_auth.+?value=?["']([^"']+?)["']/.exec(s)[1]
		var chal = /chal.+?value=?["']([^"']+?)["']/.exec(s)[1]
		
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://www.livejournal.com/edittags.bml',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: 'itemid='+reply.getAttribute('itemid')+'&journal='+reply.getAttribute('journal')+'&edittags='+msgbody+'&chal='+chal+'&lj_form_auth='+lj_form_auth,
			onload: function() {
				window.clearInterval(anim); 
				reply.style.borderColor="green"
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
d.id = "instant_tag"
d.setAttribute('tag_caller_entry_id', false)
if (navigator.userAgent.indexOf("Mac") !=-1)
    hint = 'Alt+Enter to post'
else
    hint = 'Ctrl+Enter to post'

d.innerHTML = '<textarea></textarea><ul id="instant_tag_list"></ul><small>'+hint+"</small>";
d.firstChild.addEventListener("keydown", trigger_submit_on_ctrl_enter, false);
d.style.display = "none"

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
	if(journal == journal_username)
	{
		a.setAttribute('journal', journal)
		a.setAttribute('itemid', itemid)
		a.setAttribute('orig_href', thisOne.href)
		a.id = 'instatag_'+journal + itemid
		a.addEventListener("click", post_comment, false);	
		a.appendChild(linktxt)
	
		t = document.createTextNode(' - ')
		thisOne.parentNode.insertBefore(t, thisOne.nextSibling);
		t.parentNode.insertBefore(a, t.nextSibling);
	}
}
//-----------------------------------------------------------------------
addGlobalStyle(
" #instant_tag { position: absolute; display: none;	border: 1px solid #999;"+
"	background: #ececec; padding: 1px; text-align: center; z-index:99}"+
"#instant_tag textarea { width:"+_window_width+"px; height:"+_window_height+"px; min-height: 10px;"+
"	margin: 1px; border:1px solid #999; padding-left: 3px;	background: white; color:black; }"+
"#instant_tag textarea:focus { border:1px solid black; }"+
"#instant_tag small { color:#999; font: 10px Arial }" +
"#instant_tag_list li { font-weight: bold; display:inline; margin: 4px }" 
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

function addGlobalStyle(css) {
    style = document.createElement('STYLE');
    style.type = 'text/css';
    style.innerHTML = css;
    document.body.appendChild(style);
}
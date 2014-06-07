// ==UserScript==
// @name           T-I Keys
// @namespace      Epxionx
// @description    Keystroke navigation for T-I
// @include        http://www.torrent-invites.com/*
// @exclude        
// ==/UserScript==

var	ANNOUNCE_KEY       = 65;//a
var	NEWS_KEY           = 78;//n
var	DISCUSSION_KEY     = 68;//d
var	HELP_KEY           = 72;//h
var	INTRO_KEY          = 82;//r
var	OFFTOPIC_KEY       = 79;//o
var	RECRUITMENT_KEY    = 69;//e
var	SUGGESTIONS_KEY    = 85;//u
var	COMPETITION_KEY    = 67;//c
var	GFX_KEY            = 71;//g
var	BONUSES_KEY        = 66;//b
var	INVITES_KEY        = 73;//i
var	SEEDBOXES_KEY      = 83;//s
var	TRACKERS_KEY       = 84;//t
var	REQUEST_KEY        = 81;//q
var	VIP_KEY            = 86;//v
var	THEBLOCK_KEY       = 75;//k
var	HOME               = 36;//home

if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
}

if(!GM_getValue("mod"))
    GM_setValue("mod", 1 );

if(!GM_getValue("hlColor"))
    GM_setValue("hlColor", "#CCC");

unsafeWindow.onload = function() {

    if(document.location == "http://www.torrent-invites.com/forum.php")
	{
	    color = GM_getValue("hlColor");
		
	    for(i=0;i<document.links.length;i++)
		{
		    if(document.links[i].href == "http://www.torrent-invites.com/announcements/")
			    document.links[i].innerHTML = "<strong><span style='color:"+color+"'>A</span>nnouncements</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/bittorrent-news/")
			    document.links[i].innerHTML = "<strong>BitTorrent <span style='color:"+color+"'>N</span>ews</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/discussions-reviews/")
			    document.links[i].innerHTML = "<strong><span style='color:"+color+"'>D</span>iscussions & Reviews</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/help/")
			    document.links[i].innerHTML = "<strong><span style='color:"+color+"'>H</span>elp</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/introductions/")
			    document.links[i].innerHTML = "<strong>Int<span style='color:"+color+"'>r</span>oductions</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/off-topic/")
			    document.links[i].innerHTML = "<strong><span style='color:"+color+"'>O</span>ff-Topic</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/staff-recruitment/")
			    document.links[i].innerHTML = "<strong>Staff R<span style='color:"+color+"'>e</span>cruitment</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/suggestions/")
			    document.links[i].innerHTML = "<strong>S<span style='color:"+color+"'>u</span>ggestions</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/competition-invites/")
			    document.links[i].innerHTML = "<strong><span style='color:"+color+"'>C</span>ompetition Invites</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/gfx-section/")
			    document.links[i].innerHTML = "<strong><span style='color:"+color+"'>G</span>FX Section</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/give-bonuses/")
			    document.links[i].innerHTML = "<strong>Give <span style='color:"+color+"'>B</span>onuses</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/give-invites/")
			    document.links[i].innerHTML = "<strong>Give <span style='color:"+color+"'>I</span>nvites</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/give-seedboxes/")
			    document.links[i].innerHTML = "<strong>Give <span style='color:"+color+"'>S</span>eedboxes</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/opentrackers/")
			    document.links[i].innerHTML = "<strong>Open<span style='color:"+color+"'>T</span>rackers</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/requests/")
			    document.links[i].innerHTML = "<strong>Re<span style='color:"+color+"'>q</span>uests</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/v-i-p-s-only/")
			    document.links[i].innerHTML = "<strong><span style='color:"+color+"'>V</span>.I.P.s Only</strong>";
		    if(document.links[i].href == "http://www.torrent-invites.com/chopping-block/")
			    document.links[i].innerHTML = "<strong>The Chopping Bloc<span style='color:"+color+"'>k</span>!</strong>";
		}
	}
}

unsafeWindow.onkeydown = function(e) {
    eventobj = window.event?event:e;
	key = eventobj.keyCode?eventobj.keyCode:eventobj.charCode;
	mkey = GM_getValue("mod");
	str = String(document.activeElement);

	//Don't trigger shortcut keys when the following elements are active
	if(str.search("HTMLInputElement") > -1 || 
	   str.search("HTMLTextAreaElement") > -1 ||
	   str.search("HTMLSelectElement") > -1)
	    return;
	
    if(e.shiftKey && e.ctrlKey && e.altKey && key == 67)
	{
	    color = prompt("Set the key highlight color","#FFFFFF");
		GM_setValue("hlColor",color);
		return;
	}
	
    if(e.shiftKey && e.ctrlKey && e.altKey && key == 77)
	{
		mkey++;
		if(mkey > 2)
		    mkey = 0;
			
		switch(mkey)
		{
		case 0: alert("Modifier is now 'SHIFT'");break;
		case 1: alert("Modifier is now 'CTRL+ALT'");break;
		case 2: alert("Modifier is now 'NONE'");break;
		default: break;
		}
		
		GM_setValue("mod",mkey);
		return;
	}
	
    if(mkey != 2)
	{
        if(mkey == 0 && e.shiftKey)
		    jumpTo(key);
		else if (mkey == 1 && e.ctrlKey && e.altKey)
		    jumpTo(key);
	}
	else
	    jumpTo(key);
}

function jumpTo (k)
{
	switch (key)
	{
	case ANNOUNCE_KEY: document.location.assign("http://www.torrent-invites.com/announcements/");break;
	case NEWS_KEY: document.location.assign("http://www.torrent-invites.com/bittorrent-news/");break;
	case DISCUSSION_KEY:  document.location.assign("http://www.torrent-invites.com/discussions-reviews/");break;
	case HELP_KEY: document.location.assign("http://www.torrent-invites.com/help/");break;
	case INTRO_KEY: document.location.assign("http://www.torrent-invites.com/introductions/");break;
	case OFFTOPIC_KEY: document.location.assign("http://www.torrent-invites.com/off-topic/");break;
	case RECRUITMENT_KEY: document.location.assign("http://www.torrent-invites.com/staff-recruitment/");break;
	case SUGGESTIONS_KEY: document.location.assign("http://www.torrent-invites.com/suggestions/");break;
	case COMPETITION_KEY: document.location.assign("http://www.torrent-invites.com/competition-invites/");break;
	case GFX_KEY: document.location.assign("http://www.torrent-invites.com/gfx-section/");break;
	case BONUSES_KEY: document.location.assign("http://www.torrent-invites.com/give-bonuses/");break;
	case INVITES_KEY: document.location.assign("http://www.torrent-invites.com/give-invites/");break;
	case SEEDBOXES_KEY: document.location.assign("http://www.torrent-invites.com/give-seedboxes/");break;
	case TRACKERS_KEY: document.location.assign("http://www.torrent-invites.com/opentrackers/");break;
	case REQUEST_KEY: document.location.assign("http://www.torrent-invites.com/requests/");break;
	case VIP_KEY: document.location.assign("http://www.torrent-invites.com/v-i-p-s-only/");break;
	case THEBLOCK_KEY: document.location.assign("http://www.torrent-invites.com/chopping-block/");break;
	case HOME: document.location.assign("http://www.torrent-invites.com/forum.php");break;
	default: break;
	}
}

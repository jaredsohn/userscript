// ==UserScript==
// @name  Facebook Friends Tab Extender
// @namespace  http://userscripts.org/scripts/show/30044
// @author  http://userscripts.org/users/59449
// @include  http://*.facebook.com/friends/*
// @description  In Facebook extends the options available on friends lists
// @version 2.3.1
// ==/UserScript==

var ftreptxt = "";  //ftabsreplacetext
var thisurl = document.location.href.toLowerCase();
var urlMatch;

if (/friends\/\?all/i.test(thisurl)) urlMatch = 0; //All my friends
else if (/friends\/\?recent/i.test(thisurl)) urlMatch = 2; //All my friends recent updates
else if (/friends\/\?id=/i.test(thisurl)) urlMatch = 3; //Friends of friends
else if (/friends\/\?mutual/i.test(thisurl)) urlMatch = 4; //Mutual friends of friends
else urlMatch = 1;

//new Facebook design
if (document.getElementById('friend_pills')){
ftreptxt += "<div class=\"PillFilter_pillfilter\">";
ftreptxt += "<label>Showing:</label>";
//Everyone
ftreptxt += "<a href=\"#\" id=\"friend_pills_tab_2\" class=\"PillFilter_filter";
if (urlMatch == 0 || urlMatch == 3) ftreptxt += " Tabset_selected";
ftreptxt += "\" onclick=\"return Tabset.getInstance(&quot;friend_pills&quot;).selectTab(&quot;friend_pills_tab_2&quot;,function() {Friends.refreshView('everyone'); return false;; }.bind(this),null);\">";
ftreptxt += "<span class=\"tl\"><span class=\"tr\"><span class=\"br\"><span class=\"bl\">Everyone</span></span></span></span></a>";

//Status Updates
ftreptxt += "<a href=\"#\" id=\"friend_pills_tab_0\" class=\"PillFilter_filter";
if (urlMatch == 1) ftreptxt += " Tabset_selected";
ftreptxt += "\" onclick=\"return Tabset.getInstance(&quot;friend_pills&quot;).selectTab(&quot;friend_pills_tab_0&quot;,function() {Friends.refreshView('status'); return false;; }.bind(this),null);\">";
ftreptxt += "<span class=\"tl\"><span class=\"tr\"><span class=\"br\"><span class=\"bl\">Status Updates</span></span></span></span></a>";

//Recently Updated
ftreptxt += "<a href=\"#\" id=\"friend_pills_tab_1\" class=\"PillFilter_filter";
if (urlMatch == 2) ftreptxt += " Tabset_selected";
ftreptxt += "\" onclick=\"return Tabset.getInstance(&quot;friend_pills&quot;).selectTab(&quot;friend_pills_tab_1&quot;,function() {Friends.refreshView('recent'); return false;; }.bind(this),null);\">";
ftreptxt += "<span class=\"tl\"><span class=\"tr\"><span class=\"br\"><span class=\"bl\">Recently Updated</span></span></span></span></a>";

//Mutual (Inserted)
if (urlMatch == 3 || urlMatch == 4){
ftreptxt += "<a href=\"#\" id=\"friend_pills_tab_5\" class=\"PillFilter_filter";
if (urlMatch == 4) ftreptxt += " Tabset_selected";
ftreptxt += "\" onclick=\"return Tabset.getInstance(&quot;friend_pills&quot;).selectTab(&quot;friend_pills_tab_5&quot;,function() {Friends.refreshView('mutual'); return false;; }.bind(this),null);\">";
ftreptxt += "<span class=\"tl\"><span class=\"tr\"><span class=\"br\"><span class=\"bl\">Mutual</span></span></span></span></a>";
}

//Grid (Inserted)
ftreptxt += "<a href=\"#\" class=\"PillFilter_filter\" id=\"friend_pills_tab_4\" ";
ftreptxt += "onclick=\"return Tabset.getInstance(&quot;friend_pills&quot;).selectTab(&quot;friend_pills_tab_4&quot;,function() {Friends.refreshView('grid'); return false;; }.bind(this),null);\">";
ftreptxt += "<span class=\"tl\"><span class=\"tr\"><span class=\"br\"><span class=\"bl\">Grid</span></span></span></span></a>";

/*
//More...
ftreptxt += "<a href=\"#\" class=\"PillFilter_filter\" id=\"friend_pills_tab_3\" ";
ftreptxt += "onclick=\"return Tabset.getInstance(&quot;friend_pills&quot;).selectTab(&quot;friend_pills_tab_3&quot;,function() {Friends.refreshView('advanced'); return false;; }.bind(this),null);\">";
ftreptxt += "<span class=\"tl\"><span class=\"tr\"><span class=\"br\"><span class=\"bl\">More...</span></span></span></span></a>";
*/
ftreptxt += "</div>";
document.getElementById('friend_pills').innerHTML = ftreptxt;
}

ftreptxt = "";
//old Facebook design
if (document.getElementById('ftabs')) {
	ftreptxt += "<a href=\"#everyone\" onclick=\"Friends.refreshView('everyone');return false;\" ";
	if (urlMatch == 0 || urlMatch == 3) ftreptxt += "class=\"first active\" ";
	ftreptxt += "id=\"fmpt_everyone\">Everyone</a>";

	ftreptxt += "<a href=\"#status\" onclick=\"Friends.refreshView('status');return false;\" ";
	if (urlMatch == 1) ftreptxt += "class=\"first active\" ";
	ftreptxt += "id=\"fmpt_status\">Status Updates</a>";

	ftreptxt += "<a href=\"#recent\" onclick=\"Friends.refreshView('recent');return false;\" ";
	if (urlMatch == 2) ftreptxt += "class=\"first active\" ";
	ftreptxt += "id=\"fmpt_recent\">Recently Updated</a>";
	
	if (urlMatch == 3 || urlMatch == 4){
		ftreptxt += "<a href=\"#mutual\" onclick=\"Friends.refreshView('mutual');return false;\" ";
		if (urlMatch == 4) ftreptxt += "class=\"first active\" ";
		ftreptxt += "id=\"fmpt_mutual\">Mutual</a>";
	}
		
	ftreptxt += "<a href=\"#\" onclick=\"Friends.filterView('grid');return false;\" id=\"fmpt_grid\">Grid</a>";

	ftreptxt += "<a href=\"#advanced\" onclick=\"Friends.refreshView('advanced');return false;\" class=\"last\" id=\"fmpt_advanced\">More...</a>";
	
	document.getElementById('ftabs').innerHTML=ftreptxt;	
}

//2008-08-01 Removed More view from new.facebook - access by clicking (Everyone)
//2008-07-26 <span class="bl"><span class="br"> swapped
//2008-07-22 PillFilter_filter Tabset_selected
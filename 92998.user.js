// ==UserScript==

// @name           LUEbar 2.0
// @namespace      categoryfilter
// @description    Makes the userbar less shitty.
// @include        http://*endoftheinter.net/*
// @include        https://*endoftheinter.net/*
// @exclude	   http://endoftheinter.net/
// @exclude	   https://endoftheinter.net/
// @exclude        http://u.endoftheinter.net/u.php*
// @exclude 	   https://u.endoftheinter.net/u.php*

// ==/UserScript==

//Version 2010.12.17

//Auto updater

var SUC_script_num = 92876;

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}



//USER Customizations - feel free to add more.

var customboards =  '<li><a href="//boards.endoftheinter.net/showtopics.php?board=5749">Starcraft</a></li>'

//USER Customizations stops.



if (GM_getValue('ULBEDREREOD','error') == 'error' || GM_getValue('FEKDFIGGLEOGIRG','error') == 'error'){
	var userName = prompt("Please enter your username","Username");
	var userId = prompt("Please enter your userID","UserID");

	GM_setValue("ULBEDREREOD", userName);
	GM_setValue("FEKDFIGGLEOGIRG", userId);
}

if( location.href.indexOf('/resetluebar') != -1 ) {
	var userName = prompt("Please enter your username","Username");
	var userId = prompt("Please enter your userID","UserID");

	GM_setValue("ULBEDREREOD", userName);
	GM_setValue("FEKDFIGGLEOGIRG", userId);
}

var username = GM_getValue("ULBEDREREOD");
var userID = GM_getValue("FEKDFIGGLEOGIRG");

//Remove old menu

var divs = document.getElementsByTagName('div');
	for(var i=0; i<divs.length; i++) {
		if (divs[i].className == 'menubar') {
		  	divs[i].parentNode.removeChild(divs[i]);
	}
}

var createtopic = location.href.replace("showtopics.php?","postmsg.php?");
var createpost = location.href.replace("showmessages.php?","postmsg.php?");
var searchboards = location.href.replace("showtopics.php?","search.php?");
var linkreport = location.href.replace("linkme.php?","linkreport.php?");
var archiveboards = "//archives.endoftheinter.net/search.php?board=" + document.location.search.match(/board=(-?\d+)/)[1];

//Still trying to implement - Kinda hard when taggin changes page to page. Might just rip it off the userbar but 

//that could just become cumbersome.
//var tagtopic = location.href.replace(location.href, location.href + "&h=c3b14");
//<li><a href="' + tagtopic + '"> Tag this Topic</a></li>
//var taglink = location.href.replace("linkme.php?","linkme.php?h=7efce&f=1&");
//</li><li><a href="' + taglink +'">Tag this Link</a></li>

// Create menu item

var logo = document.createElement("div");

logo.innerHTML = 
'<div id="navbar"><div id="centernav">'+
'<ul><li><a href="//endoftheinter.net/main.php">Homepage</a>'+
	'<ul>'+
		'<li><a href="//endoftheinter.net/profile.php?user=' + userID + '">My Profile</a></li>'+
		'<li><a href="//endoftheinter.net/links.php?mode=comments">Link History</a></li>'+
		'<li><a href="//endoftheinter.net/inbox.php">Private Messages</a></li><li class="divider"></li>'+
		'<li><a href="//endoftheinter.net/showfavorites.php">Tagged Topics</a></li>'+
		'<li><a href="//links.endoftheinter.net/links.php?mode=fav">Tagged Links</a></li>'+
		'<li><a href="//endoftheinter.net/links.php?mode=user&userid=' + userID + '">Links I\'ve added</a></li><li class="divider"></li>'+
		'<li><a href="//endoftheinter.net/loser.php?userid=' + userID + '">My Statistics</a></li>'+
		'<li><a href="//endoftheinter.net/stats.php">Site Statistics</a></li>'+
		'<li><a href="//endoftheinter.net/userlist.php">User List</a></li><li class="divider"></li>'+
		'<li><a href="//endoftheinter.net/logout.php">Logout</a></li>'+
	'</ul></li>'+
	
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=42">Boards</a>'+
	'<ul>'+
		'<li><a href="//boards.endoftheinter.net/boardlist.php">Boards List</a></li>'+
		'<li class="divider"></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=444">Humans Anonymous</a></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=58">Mostly Harmless</a></li><li class="divider"></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=73">Fitness</a></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=78">Requests</a></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=419">LL Mart</a></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=57">Suicide</a></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=45">Site Suggestions</a></li>'+
		'<li class="divider"></li>' 
		+ customboards + 
		'<li class="divider"></li>'+
		'<li><a href="' + createtopic + '"> Create a Topic</a></li>'+
		'<li><a href="' + createpost + '"> Post New Message</a></li>'+
		'<li><a href="//endoftheinter.net/showfavorites.php">Tagged Topics</a></li>'+
		'<li><a href="' + archiveboards + '">Search the Archives</a></li>'+
		'<li><a href="' + searchboards  + '">Search Current Board</a></li>'+
	'</ul></li>'+
	
		'<li><a href="//links.endoftheinter.net/links.php?mode=new">New Links</a>'+
	'<ul>'+
		'<li><a href="//links.endoftheinter.net/links.php?mode=topvotedweek">Links of the Week</a></li>'+
		'<li><a href="//links.endoftheinter.net/links.php?mode=topvoted">Top Voted Links</a></li>'+
		'<li><a href="//links.endoftheinter.net/links.php?mode=all">All Links</a></li><li class="divider"></li>'+
		'<li><a href="//links.endoftheinter.net/add.php">Create a Link</a></li>'+
		'<li><a href="' + linkreport + '">Report this Link</a><li><a href="//links.endoftheinter.net/links.php?mode=fav">Tagged Links</a></li>'+
		'<li><a href="//links.endoftheinter.net/lsearch.php">Search Links</a></li>'+
	'</ul></li>'+
	
		'<li><a href="//endoftheinter.net/history.php">Message History</a>'+
	'<ul>'+
	'</ul></li>'+
	
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=-84">Moderator</a>'+
	'<ul>'+
	
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=-86">Suspensions & Bans</a></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=-85">Moderator Social</a></li>'+
		'<li><a href="//boards.endoftheinter.net/showtopics.php?board=56">Complaints Department</a></li>'+
		'<li class="divider"></li>'+
		'<li><a href="//endoftheinter.net/admin.php">Link Reports</a></li>'+
		'<li><a href="//endoftheinter.net/userpic_queue.php">Userpics Queue</a></li>'+
		'<li><a href="//endoftheinter.net/pollqueue.php">Poll Queue</a></li>'+
		'<li class="divider"></li>'+
		'<li><a href="//eti.no-jons.com/deadlinks.php">Dead Links</a></li>'+
		'<li><a href="//eti.no-johns.com/polls.php">Poll Searcher</a></li>'+
	
		
	'</ul></li>'+
	
		'<li><a href="//wiki.endoftheinter.net/index.php/Main_Page">Wiki</a>'+
	'<ul>'+
		'<li><a href="//wiki.endoftheinter.net/index.php/Help:FAQ">FAQ</a></li>'+
		'<li><a href="//wiki.endoftheinter.net/index.php/Help:Rules">Site Rules</a></li>'+
		'<li><a href="//wiki.endoftheinter.net/index.php/LL_Mart_Rules">LL Mart Rules</a></li>'+
		'<li><a href="//wiki.endoftheinter.net/index.php/Help:Serious_Discussion_Rules_and_Guidelines">SD Rules</a></li>'+
		'<li><a href="//wiki.endoftheinter.net/index.php/Help:Contents">Wiki Guidelines</a></li></ul></li></ul></div></div>';

//Who the fuck has multiple body tags....
document.body.insertBefore(logo, document.body.firstChild);

//Style the menu items

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle(' body { margin-top: 32px; }  #p-cactions { top: 4em;} #p-logo { top: 32px;} .body { margin-top: 40px; } #navbar, #navbar ul {  padding: 0;  margin: 0;  list-style: none; font-size: 9pt; font-family: "Arial",sans-serif; line-height: 14px;} #navbar a:link { text-decoration: none; color: #DDE3EB; } #navbar a:hover { text-decoration: none; color: #DDE3EB; background-color: #2E5A7F; } #navbar a:visited { text-decoration: none; color: #DDE3EB; } #navbar a:active { text-decoration: none; color: #DDE3EB; }  #navbar li:hover ul {  display: block; }  #navbar {  top: 0px;  left: 0px;  width: 100%;  height: 30px;  position: fixed;  background-color: #4B73AA;  z-index: 50; }  #navbar a {  display: block;  padding: 2px 0px; }  #navbar li {  width:200px;  margin: 4px 0px 0px 6px;  border: 2px solid #2E5A7F;  float: left;  text-align: center;  font-weight: bold; }  #navbar li ul {  display: none;  position: absolute;  width:200px;  background-color: #4B73AA;  margin-top: 2px;  margin-left: -2px;  border-left: 2px solid #2E5A7F;  border-bottom: 2px solid #2E5A7F;  border-right: 2px solid #2E5A7F;  z-index: 50; }  #navbar li ul li {  width:200px;  position: relative;  margin: 0px;  border: none;  text-align: left; } #navbar li ul li a {  padding: 2px 4px; }  #navbar li .divider {  border-bottom: 2px solid #2E5A7F; }  div.userbar {  top: 28px;  left: 0px;  width: 100%;  padding: 2px 0px;  position: fixed; z-index: 0; } #centernav { width:1300px; margin:0 auto; }');
// ==UserScript==

// @name           LUEbar Chrome
// @namespace      categoryfilter
// @description    Makes the userbar less shitty.
// @include        http://*endoftheinter.net/*
// @include        https://*endoftheinter.net/*
// @exclude	   http://endoftheinter.net/
// @exclude	   https://endoftheinter.net/
// @exclude        http://u.endoftheinter.net/u.php*
// @exclude 	   https://u.endoftheinter.net/u.php*

// ==/UserScript==

//Version 2011.3.18

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

// Create menu item

var logo = document.createElement("div");

logo.innerHTML = '<div id="navbar"><div id="centernav"><ul><li><a href="//endoftheinter.net/main.php">Home</a><ul><li><a href="//endoftheinter.net/editprofile.php">Edit My Profile</a></li><li><a href="//endoftheinter.net/history.php">Message History</a></li><li><a href="//endoftheinter.net/links.php?mode=comments">Link History</a></li><li><a href="//images.endoftheinter.net/imagemap.php">Imagemap History</a></li><li><a href="//endoftheinter.net/inbox.php">Private Messages</a></li><li class="divider"></li><li><a href="//endoftheinter.net/showfavorites.php">Tagged Topics</a></li><li><a href="//links.endoftheinter.net/links.php?mode=fav">Tagged Links</a></li><li class="divider"></li><li><a href="//endoftheinter.net/stats.php">Site Statistics</a></li><li><a href="//endoftheinter.net/userlist.php">User List</a></li><li class="divider"></li><li><a href="//endoftheinter.net/logout.php">Logout</a></li></ul></li><li><a href="//boards.endoftheinter.net/boardlist.php">Boards</a><ul><li><a href="//boards.endoftheinter.net/showtopics.php?board=42">Life, the Universe, and Everything</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=51">Pipe Mania</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=444">Humans Anonymous</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=58">Mostly Harmless</a></li><li class="divider"></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=73">Fitness</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=47">LUE++</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=5749">Starcraft</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=77">Strong Homo</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=74">Relation Ship</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=75">Music</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=2600">LUEtari 2600</a></li><li class="divider"></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=56">Complaints Department</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=78">Requests</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=419">LL Mart</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=54494">Referral Mania</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=57">Suicide</a></li><li><a href="//boards.endoftheinter.net/showtopics.php?board=45">Site Suggestions</a></li><li class="divider"></li><li><a href="' + createtopic + '"> Create a Topic</a></li><li><a href="' + createpost + '"> Post New Message</a></li><li><a href="//endoftheinter.net/showfavorites.php">Tagged Topics</a></li><li><a href="//archives.endoftheinter.net/">Search the Archives</a></li><li><a href="' + searchboards  + '">Search Current Board</a></li></ul></li><li><a href="//links.endoftheinter.net/links.php?mode=new">LUElinks</a><ul><li><a href="//links.endoftheinter.net/links.php?mode=topvotedweek">Links of the Week</a></li><li><a href="//links.endoftheinter.net/links.php?mode=topvoted">Top Voted Links</a></li><li><a href="//links.endoftheinter.net/links.php?mode=all">All Links</a></li><li class="divider"></li><li><a href="//links.endoftheinter.net/add.php">Create a Link</a></li><li><a href="' + linkreport + '">Report this Link</a><li><a href="//links.endoftheinter.net/links.php?mode=fav">Tagged Links</a></li><li><a href="//links.endoftheinter.net/lsearch.php">Search Links</a></li></ul></li><li><a href="//wiki.endoftheinter.net/index.php/Main_Page">LUEpedia</a><ul><li><a href="//wiki.endoftheinter.net/index.php?title=Dramalinks%2Fcurrent&action=edit&section&editintro=Dramalinks%2Fcurrent%2Fdoc">Edit Dramalinks</a></li> <li><a href="//wiki.endoftheinter.net/index.php/Special:Statistics">Statistics</a></li></ul></li><li><a target="_blank" href="http://lueradio.kyrosiris.com:8004/">LUEradio</a><ul><li><a href="//wiki.endoftheinter.net/index.php/Lueradio">LUEradio Wiki</a></li><li><a target="_blank" href="http://lueradio.kyrosiris.com:8004/home.html">Listen Now</a></li></ul></li><li><a href="//wiki.endoftheinter.net/index.php/Help:FAQ">Help</a><ul><li><a href="//wiki.endoftheinter.net/index.php/Help:Rules">Site Rules</a></li><li><a href="//wiki.endoftheinter.net/index.php/LL_Mart_Rules">LL Mart Rules</a></li><li><a href="//wiki.endoftheinter.net/index.php/Help:Serious_Discussion_Rules_and_Guidelines">SD Rules</a></li><li><a href="//wiki.endoftheinter.net/index.php/Help:Contents">Wiki Guidelines</a></li></ul></li></ul></div></div>';

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
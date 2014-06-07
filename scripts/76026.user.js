// ==UserScript==
// @name           Kongregate Profile Enhancer
// @namespace      KPE
// @description    Makes Profiles Better!
// @include        http://www.kongregate.com/accounts/*
// @include        http://www.wolfthatissavage.com/updateS.php
// @version        1.0.1
// ==/UserScript==

/* Created by SavageWolf (http://www.wolfthatissavage.com) */

var ver = "1.0.1";
if(unsafeWindow.checkUpdate){unsafeWindow.checkUpdate("www.wolfthatissavage.com/creations/KPE.user.js", "KPE Script", ver, "SavageWolf");}

//Die if not the right page!
if(document.getElementById("accountinfo").getElementsByTagName("div")[0].getElementsByTagName("h1")[0].getElementsByTagName("span")[0].innerHTML.split("'")[0] == null){throw("incorrect page")};

//Declare functions
secondText = "";
function add(text, useDark){
	if(useDark){
		//document.getElementById("secondary").innerHTML += text;
		secondText += text;
	}else{
		document.getElementById("feature").innerHTML += text;
	};
};

function getElementsByClass(searchClass, node, tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

//Get data
var user = {};

//User name, avatar ect.
user.name = document.getElementById("accountinfo").getElementsByTagName("div")[0].getElementsByTagName("h1")[0].getElementsByTagName("span")[0].innerHTML.split("'")[0];
user.avatar = document.getElementById("accountinfo").getElementsByTagName("img")[0].src;
user.stats = document.getElementById("accountinfo").getElementsByTagName("div")[0].getElementsByTagName("h1")[0].innerHTML.split("</span>")[1];
user.myName = document.getElementById("mystuff").getElementsByTagName("h3")[0].getElementsByTagName("a")[0].innerHTML;

//About me
user.about = document.getElementById("main").getElementsByTagName("p")[0].innerHTML;

//Is this the user's profile?
if(document.getElementById("accountinfo").getElementsByTagName("div")[0].getElementsByTagName("ul")[0] != null){
	user.isMe = true;
}else{
	user.isMe = false;
};

//Links and such
if(!user.isMe){
	user.links = document.getElementById("relationship_links").innerHTML;
};

//Generic stats
user.generic = new Array();
var i = 0;
while(true){
	if(document.getElementById("memberinfo").getElementsByTagName("li")[i] == null){
		break;
	};
	user.generic[i] = new Array();
	user.generic[i][0] = document.getElementById("memberinfo").getElementsByTagName("li")[i].getElementsByTagName("strong")[0].innerHTML;
	user.generic[i][1] = document.getElementById("memberinfo").getElementsByTagName("li")[i].innerHTML.split("</strong>")[1];
	i ++;
};

//Games
user.games = {};
if(document.getElementById("gamesby") != null){
	user.games.hasGames = true;
}else{
	user.games.hasGames = false;
};
if(user.games.hasGames){
	user.games.games = new Array();
	var i = 0;
	while(i < document.getElementById("gamesby").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.games.games[i] = {};
		user.games.games[i].name = document.getElementById("gamesby").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.games.games[i].url = document.getElementById("gamesby").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.games.games[i].icon = document.getElementById("gamesby").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
	if(document.getElementById("gamesby").getElementsByTagName("div")[0].getElementsByTagName("ul")[0] != null){
		user.games.pages = document.getElementById("gamesby").getElementsByTagName("div")[0].getElementsByTagName("ul")[0].innerHTML;
	};
};

//Sounds
user.sounds = {};
var i = 0;
while(i < document.getElementsByTagName("div").length){
	if(document.getElementsByTagName("div")[i].className == "my_sounds"){
		document.getElementsByTagName("div")[i].id = "my_sounds";
		user.sounds.hasSounds = true;
		break;
	};
	i ++;
};

if(user.sounds.hasSounds){
	user.sounds.sounds = new Array();
	var i = 0;
	while(i < document.getElementById("my_sounds").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.sounds.sounds[i] = {};
		user.sounds.sounds[i].name = document.getElementById("my_sounds").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.sounds.sounds[i].url = document.getElementById("my_sounds").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.sounds.sounds[i].icon = document.getElementById("my_sounds").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
	if(document.getElementById("my_sounds").getElementsByTagName("div")[0].getElementsByTagName("ul")[0] != null){
		user.sounds.pages = document.getElementById("my_sounds").getElementsByTagName("div")[0].getElementsByTagName("ul")[0].innerHTML;
	};
};

//Art
user.art = {};
var i = 0;
while(i < document.getElementsByTagName("div").length){
	if(document.getElementsByTagName("div")[i].className == "my_artworks"){
		document.getElementsByTagName("div")[i].id = "my_art";
		user.art.hasArt = true;
		break;
	};
	i ++;
};

if(user.art.hasArt){
	user.art.art = new Array();
	var i = 0;
	while(i < document.getElementById("my_art").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.art.art[i] = {};
		user.art.art[i].name = document.getElementById("my_art").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.art.art[i].url = document.getElementById("my_art").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.art.art[i].icon = document.getElementById("my_art").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
	if(document.getElementById("my_art").getElementsByTagName("div")[0].getElementsByTagName("ul")[0] != null){
		user.art.pages = document.getElementById("my_art").getElementsByTagName("div")[0].getElementsByTagName("ul")[0].innerHTML;
	};
};

//FavGames
user.favGames = {};
if(document.getElementById("favorites") != null){
	user.favGames.hasFavGames = true;
}else{
	user.favGames.hasFavGames = false;
};
if(user.favGames.hasFavGames){
	user.favGames.favGames = new Array();
	var i = 0;
	while(i < document.getElementById("favorites").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.favGames.favGames[i] = {};
		user.favGames.favGames[i].name = document.getElementById("favorites").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.favGames.favGames[i].url = document.getElementById("favorites").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.favGames.favGames[i].icon = document.getElementById("favorites").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
};

//Supported Games
user.supGames = {};
if(document.getElementById("supported") != null){
	user.supGames.hasSupGames = true;
}else{
	user.supGames.hasSupGames = false;
};
if(user.supGames.hasSupGames){
	user.supGames.supGames = new Array();
	var i = 0;
	while(i < document.getElementById("supported").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.supGames.supGames[i] = {};
		user.supGames.supGames[i].name = document.getElementById("supported").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.supGames.supGames[i].url = document.getElementById("supported").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.supGames.supGames[i].icon = document.getElementById("supported").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
};

//Contribs
user.contribs = {};
var i = 0;
while(i < document.getElementsByTagName("div").length){
	if(document.getElementsByTagName("div")[i].className == "my_shared_contents"){
		document.getElementsByTagName("div")[i].id = "my_contribs";
		user.contribs.hasContribs = true;
		break;
	};
	i ++;
};
if(user.contribs.hasContribs){
	user.contribs.contribs = new Array();
	var i = 0;
	while(i < document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.contribs.contribs[i] = {};
		user.contribs.contribs[i].name = document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.contribs.contribs[i].game = document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("em")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.contribs.contribs[i].gameUrl = document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("em")[0].getElementsByTagName("a")[0].href;
		
		user.contribs.contribs[i].url = document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("span")[0].getElementsByTagName("a")[0].href;
		
		user.contribs.contribs[i].icon = document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
	if(document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("ul")[0] != null){
		user.contribs.pages = document.getElementById("my_contribs").getElementsByTagName("div")[0].getElementsByTagName("ul")[0].innerHTML;
	};
};

//Cards
user.cards = {};
var i = 0;
if(document.getElementById("cards") != null){
	user.cards.hasCards = true;
}else{
	user.cards.hasCards = false;
};
if(user.cards.hasCards){
	user.cards.cards = new Array();
	var i = 0;
	while(i < document.getElementById("cards").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.cards.cards[i] = {};
		user.cards.cards[i].name = document.getElementById("cards").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.cards.cards[i].url = document.getElementById("cards").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.cards.cards[i].icon = document.getElementById("cards").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
};

//Awards
user.awards = {};
var i = 0;
if(document.getElementById("raffle_entries") != null){
	user.awards.hasAwards = true;
}else{
	user.awards.hasAwards = false;
};
if(user.awards.hasAwards){
	user.awards.awards = new Array();
	var i = 0;
	while(i < document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.awards.awards[i] = {};
		
		if(document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0] != null){
			
			user.awards.awards[i].name = document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		}else{
			user.awards.awards[i].name = document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].innerHTML;
		};
		
		if(document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0] != null){
			user.awards.awards[i].url = document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		}else{
			user.awards.awards[i].url = "/";
		};
		
		if(document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0] != null){
			user.awards.awards[i].icon = document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		}else{
			user.awards.awards[i].icon = document.getElementById("raffle_entries").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("img")[0].src;
		};
		i ++;
	};
	if(document.getElementById("raffle_entries").getElementsByTagName("ul")[0] != null){
		user.awards.pages = document.getElementById("raffle_entries").getElementsByTagName("ul")[0].innerHTML;
	};
};

//Friends
user.friends = {};
var i = 0;
if(document.getElementById("friends") != null){
	user.friends.hasFriends = true;
}else{
	user.friends.hasfriends = false;
};
if(user.friends.hasFriends){
	user.friends.friends = new Array();
	var i = 0;
	while(i < document.getElementById("friends").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.friends.friends[i] = {};
		user.friends.friends[i].name = document.getElementById("friends").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.friends.friends[i].url = document.getElementById("friends").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.friends.friends[i].icon = document.getElementById("friends").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
};

//Fans
user.fans = {};
var i = 0;
if(document.getElementById("fans") != null){
	user.fans.hasFans = true;
}else{
	user.fans.hasFans = false;
};
if(user.fans.hasFans){
	user.fans.fans = new Array();
	var i = 0;
	while(i < document.getElementById("fans").getElementsByTagName("div")[0].getElementsByTagName("dl").length){
		user.fans.fans[i] = {};
		user.fans.fans[i].name = document.getElementById("fans").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].innerHTML;
		
		user.fans.fans[i].url = document.getElementById("fans").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dd")[0].getElementsByTagName("a")[0].href;
		
		user.fans.fans[i].icon = document.getElementById("fans").getElementsByTagName("div")[0].getElementsByTagName("dl")[i].getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
		i ++;
	};
};

//shoutbox
user.shoutBox = {}
user.shoutBox.HTML = document.getElementById("listings").innerHTML;

/*
 ***************
 */
//Load content and clear
/*
 ***************
 */
document.getElementById("feature").innerHTML = "";
document.getElementById("secondary").innerHTML = "";
//document.getElementById("primarywrap").innerHTML += "<div id='newProfile' style='margin-left:100px;margin-right:100px;'></div>";


//Layout and such
if(user.games.hasGames){
	document.getElementById("primarywrap").style.backgroundColor = "#eeeeff";
};

if(user.stats.indexOf("kongregate.com/images/presentation/curator_icon.gif") != -1){
	document.getElementById("primarywrap").style.backgroundColor = "#ffffee";
};

if(user.stats.indexOf("kongregate.com/images/presentation/moderator_icon.gif") != -1){
	document.getElementById("primarywrap").style.backgroundColor = "#ffffee";
};

if(user.stats.indexOf("kongregate.com/images/presentation/staff_icon.gif") != -1){
	document.getElementById("primarywrap").style.backgroundColor = "#ffeeee";
};
//Draw main

add("<h1><img src='"+user.avatar+"' /> "+user.name+"'s Profile "+user.stats+"</h1>");
if(user.isMe){
	add("<div id='newusersettings'>(<a href='/accounts/"+user.name+"/edit_profile'>Edit Profile</a> - <a href='/accounts/"+user.name+"/edit'>Edit Settings</a> - <a href='/accounts/"+user.name+"/referrals'>Referrals</a> - <a href='/accounts/"+user.name+"/contacts'>Contacts</a>)</div>");
}else{
	add("<div id='relationship_links' class='flow_list clear'>"+user.links+"</div>");
};

//about me
add("<h2>About Me</h2>");
user.about = user.about.replace(/\[\[nl\]\]/ig, "<br/>");
user.about = user.about.replace(/\[\[hr\]\]/ig, "<hr/>");
user.about = user.about.replace(/\[\[ign:.*\]\]/ig, "");
add("<div id='newaboutme'>"+user.about+"</div>");

//Generic Stats
add("<br/><br/><h2>Stats</h2>");
generic=""
var i = 0;
while(true){
	if(user.generic[i] == null){
		break;
	};
	generic += "<tr><td width='150px'><b>"+user.generic[i][0]+"</b></td><td>"+user.generic[i][1]+"</td></tr>";
	i ++;
};
add("<table>"+generic+"</table>");

//Badges
add("<h2><a href='http://www.kongregate.com/accounts/"+user.name+"/badges'>Badges</a>", true);
add("</h2><div id='newbadges' class='wrapper'><img src='http://cdn3.kongregate.com/images/spinner_big.gif'/></div>", true);

//Games
if(user.games.hasGames){
	add("<h2>Games", true);
	if(user.isMe){add(" <a href='http://www.kongregate.com/accounts/"+user.name+"/revenue_summary'><span style='font-size:80%'>(Revenue)</span></a>", true)};
	add("</h2><div id='newgames' class='wrapper'>", true);
	gameData = "<table width='100%'><tr>";
	doItAgain = false;
	var i = 0;
	while(i < user.games.games.length){
		gameData += "<td width='16%' align='center'><a href='"+user.games.games[i].url+"'><img src='"+user.games.games[i].icon+"'/></a></td>";
		i ++;
		if(i > 5){
			doItAgain = true;
			break;
		};
	};
	gameData += "</tr><tr>";
	i = 0;
	while(i < user.games.games.length){
		gameData += "<td align='center'><b><a href='"+user.games.games[i].url+"'>"+user.games.games[i].name+"</a></b></td>";
		i ++;
		if(i > 5){
			doItAgain = true;
			break;
		};
	};
	if(user.isMe){
		gameData += "</tr><tr>";
		i = 0;
		while(i < user.games.games.length){
			gameData += "<td align='center'><a href='"+user.games.games[i].url+"/edit'>(edit)</a></td>";
			i ++;
			if(i > 5){
				doItAgain = true;
				break;
			};
		};
	};
	if(doItAgain){
		gameData += "</tr><tr>";
		var i = 6;
		while(i < user.games.games.length){
			gameData += "<td width='16%' align='center'><a href='"+user.games.games[i].url+"'><img src='"+user.games.games[i].icon+"'/></a></td>";
			i ++;
		};
		gameData += "</tr><tr>";
		i = 6;
		while(i < user.games.games.length){
			gameData += "<td align='center'><b><a href='"+user.games.games[i].url+"'>"+user.games.games[i].name+"</a></b></td>";
			i ++;
		};
		if(user.isMe){
			gameData += "</tr><tr>";
			i = 6;
			while(i < user.games.games.length){
				gameData += "<td align='center'><a href='"+user.games.games[i].url+"/edit'>(edit)</a></td>";
				i ++;
			};
		};
	};
	gameData += "</tr></table>";
	add(gameData, true);
	if(user.games.pages){
		add("<ul class='pagination'>"+user.games.pages+"</ul>", true);
	};
	add("</div>", true);
};

//Sounds
if(user.sounds.hasSounds){
	add("<h2>Sounds</h2>", true);
	add("<div id='newsounds' class='wrapper'>", true);
	soundsData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.sounds.sounds.length){
		soundsData += "<td width='16%' align='center'><a href='"+user.sounds.sounds[i].url+"'><img src='"+user.sounds.sounds[i].icon+"'/></a></td>";
		i ++;
	};
	soundsData += "</tr><tr>";
	i = 0;
	while(i < user.sounds.sounds.length){
		soundsData += "<td align='center'><b><a href='"+user.sounds.sounds[i].url+"'>"+user.sounds.sounds[i].name+"</a></b></td>";
		i ++;
	};
	soundsData += "</tr></table>";
	add(soundsData, true);
	if(user.sounds.pages){
		add("<ul class='pagination'>"+user.sounds.pages+"</ul>", true);
	};
	add("</div>", true);
};

//Art
if(user.art.hasArt){
	add("<h2>Art</h2>", true);
	add("<div id='newart' class='wrapper'>", true);
	artData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.art.art.length){
		artData += "<td width='16%' align='center'><a href='"+user.art.art[i].url+"'><img src='"+user.art.art[i].icon+"'/></a></td>";
		i ++;
	};
	artData += "</tr><tr>";
	i = 0;
	while(i < user.art.art.length){
		artData += "<td align='center'><b><a href='"+user.art.art[i].url+"'>"+user.art.art[i].name+"</a></b></td>";
		i ++;
	};
	artData += "</tr></table>";
	add(artData, true);
	if(user.art.pages){
		add("<ul class='pagination'>"+user.art.pages+"</ul>", true);
	};
	add("</div>", true);
};

//FavGames
if(user.favGames.hasFavGames){
	add("<h2><a href='http://www.kongregate.com/accounts/"+user.name+"/favorites'>Favorite Games</a></h2>", true);
	add("<div id='newfavgames' class='wrapper'>", true);
	favGamesData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.favGames.favGames.length){
		favGamesData += "<td width='16%' align='center'><a href='"+user.favGames.favGames[i].url+"'><img src='"+user.favGames.favGames[i].icon+"'/></a></td>";
		i ++;
	};
	favGamesData += "</tr><tr>";
	i = 0;
	while(i < user.favGames.favGames.length){
		favGamesData += "<td align='center'><b><a href='"+user.favGames.favGames[i].url+"'>"+user.favGames.favGames[i].name+"</a></b></td>";
		i ++;
	};
	favGamesData += "</tr></table>";
	add(favGamesData, true);
	add("</div>", true);
};

//SupportedGames
if(user.supGames.hasSupGames){
	add("<h2><a href='http://www.kongregate.com/accounts/"+user.name+"/supported_games'>Supported Games</a></h2>", true);
	add("<div id='newsupgames' class='wrapper'>", true);
	supGamesData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.supGames.supGames.length){
		supGamesData += "<td width='16%' align='center'><a href='"+user.supGames.supGames[i].url+"'><img src='"+user.supGames.supGames[i].icon+"'/></a></td>";
		i ++;
	};
	supGamesData += "</tr><tr>";
	i = 0;
	while(i < user.supGames.supGames.length){
		supGamesData += "<td align='center'><b><a href='"+user.supGames.supGames[i].url+"'>"+user.supGames.supGames[i].name+"</a></b></td>";
		i ++;
	};
	supGamesData += "</tr></table>";
	add(supGamesData, true);
	add("</div>", true);
};

//User Contenet
if(user.contribs.hasContribs){
	add("<h2>Contributions</h2>", true);
	add("<div id='newcontribs' class='wrapper'>", true);
	contribsData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.contribs.contribs.length){
		contribsData += "<td width='16%' align='center'><a href='"+user.contribs.contribs[i].url+"'><img src='"+user.contribs.contribs[i].icon+"'/></a></td>";
		i ++;
	};
	contribsData += "</tr><tr>";
	i = 0;
	while(i < user.contribs.contribs.length){
		contribsData += "<td align='center'><b><a href='"+user.contribs.contribs[i].url+"'>"+user.contribs.contribs[i].name+"</a></b></td>";
		i ++;
	};
	contribsData += "</tr><tr>";
	i = 0;
	while(i < user.contribs.contribs.length){
		contribsData += "<td align='center'>in: <b><a href='"+user.contribs.contribs[i].gameUrl+"'>"+user.contribs.contribs[i].game+"</a></b></td>";
		i ++;
	};
	contribsData += "</tr></table>";
	add(contribsData, true);
	if(user.contribs.pages){
		add("<ul class='pagination'>"+user.contribs.pages+"</ul>", true);
	};
	add("</div>", true);
};

//Cards
if(user.cards.hasCards){
	add("<h2><a href='http://www.kongregate.com/accounts/"+user.name+"/card_album'>Cards</a></h2>", true);
	add("<div id='newcards' class='wrapper'>", true);
	cardsData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.cards.cards.length){
		cardsData += "<td width='12.5%' align='center'><a href='"+user.cards.cards[i].url+"'><img src='"+user.cards.cards[i].icon+"' border='0'/></a></td>";
		i ++;
	};
	cardsData += "</tr><tr>";
	i = 0;
	while(i < user.cards.cards.length){
		cardsData += "<td align='center'><b><a href='"+user.cards.cards[i].url+"'>"+user.cards.cards[i].name+"</a></b></td>";
		i ++;
	};
	cardsData += "</tr></table>";
	add(cardsData, true);
	add("</div>", true);
};

//Awards
if(user.awards.hasAwards){
	add("<h2>Awards</h2>", true);
	add("<div id='newawards' class='wrapper'>", true);
	awardsData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.awards.awards.length){
		awardsData += "<td width='12.5%' align='center'><a href='"+user.awards.awards[i].url+"'><img src='"+user.awards.awards[i].icon+"' border='0'/></a></td>";
		i ++;
	};
	awardsData += "</tr><tr>";
	i = 0;
	while(i < user.awards.awards.length){
		awardsData += "<td align='center'><b><a href='"+user.awards.awards[i].url+"'>"+user.awards.awards[i].name+"</a></b></td>";
		i ++;
	};
	awardsData += "</tr></table>";
	add(awardsData, true);
	if(user.awards.pages){
		add("<ul class='pagination'>"+user.awards.pages+"</ul>", true);
	};
	add("</div>", true);
};

//Friends
if(user.friends.hasFriends){
	add("<h2><a href='http://www.kongregate.com/accounts/"+user.name+"/friends'>Friends</a></h2>", true);
	add("<div id='newfriends' class='wrapper'>", true);
	friendsData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.friends.friends.length){
		friendsData += "<td width='12.5%' align='center'><a href='"+user.friends.friends[i].url+"'><img src='"+user.friends.friends[i].icon+"' border='0'/></a></td>";
		i ++;
	};
	friendsData += "</tr><tr>";
	i = 0;
	while(i < user.friends.friends.length){
		friendsData += "<td align='center'><b><a href='"+user.friends.friends[i].url+"'>"+user.friends.friends[i].name+"</a></b></td>";
		i ++;
	};
	friendsData += "</tr></table>";
	add(friendsData, true);
	add("</div>", true);
};

//Fans
if(user.fans.hasFans){
	add("<h2><a href='http://www.kongregate.com/accounts/"+user.name+"/fans'>Fans</a></h2>", true);
	add("<div id='newfans' class='wrapper'>", true);
	fansData = "<table width='100%'><tr>";
	var i = 0;
	while(i < user.fans.fans.length){
		fansData += "<td width='12.5%' align='center'><a href='"+user.fans.fans[i].url+"'><img src='"+user.fans.fans[i].icon+"' border='0'/></a></td>";
		i ++;
	};
	fansData += "</tr><tr>";
	i = 0;
	while(i < user.fans.fans.length){
		fansData += "<td align='center'><b><a href='"+user.fans.fans[i].url+"'>"+user.fans.fans[i].name+"</a></b></td>";
		i ++;
	};
	fansData += "</tr></table>";
	add(fansData, true);
	add("</div>", true);
};

//Shoutbox
add("<div id='listings'>"+user.shoutBox.HTML+"</div>", true);

doneOne = false;
//Badges AJAX
var badgesGot = new XMLHttpRequest();
badgesGot.open("GET", "/accounts/"+user.name+"/badges.json", true);
badgesGot.onreadystatechange = function() {
	if (badgesGot.readyState === 4) {
		if (badgesGot.status === 200 || badgesGot.status === 304) {
			user.rawBadges = JSON.parse(badgesGot.responseText);
			if(doneOne){drawBadges()};
			doneOne = true;
		}else{
			alert("Something bad has happened...");
		};
	}
}
badgesGot.send(null);

var badgesAll = new XMLHttpRequest();
badgesAll.open("GET", "/badges.json", true);
badgesAll.onreadystatechange = function() {
	if (badgesAll.readyState === 4) {
		if (badgesAll.status === 200 || badgesAll.status === 304) {
			badges = JSON.parse(badgesAll.responseText);
			if(doneOne){drawBadges()};
			doneOne = true;
		}else{
			alert("Something bad has happened...");
		};
	}
}
badgesAll.send(null);

function drawBadges(){
	document.getElementById("newbadges").innerHTML = "";
	user.badges = {}
	user.badges.e = new Array();
	user.badges.m = new Array();
	user.badges.h = new Array();
	user.badges.i = new Array();
	//Sort them into difficulties
	var j = 0;
	while(j < user.rawBadges.length){
		var i = 0;
		while(i < badges.length){
			if(user.rawBadges[j].badge_id == badges[i].id){
				switch(badges[i].difficulty){
					case "easy":
						user.badges.e.push(badges[i]);
						break;
					case "medium":
						user.badges.m.push(badges[i]);
						break;
					case "hard":
						user.badges.h.push(badges[i]);
						break;
					case "impossible":
						user.badges.i.push(badges[i]);
						break;
				};
			};
			i++;
		};
		j++
	};
	
	//Now lets actualy draw them!
	addb("<br/><br/><h3>Easy ("+user.badges.e.length+")</h3>");
	badgeTable = "<table><tr>";
	i = 0;
	while(i < 20){
		badgeTable += "<td>"+drawBadge(user.badges.e[i].icon_url, user.badges.e[i].name, user.badges.e[i].difficulty, user.badges.e[i].description, user.badges.e[i].games[0].title, user.badges.e[i].games[0].url)+"</td>";
		i ++;
		if(user.badges.e[i] == null){
			break;
		};
	};
	badgeTable += "</tr></table>"
	addb(badgeTable);
	
	addb("<br/><h3>Medium ("+user.badges.m.length+")</h3>");
	badgeTable = "<table><tr>";
	i = 0;
	while(i < 20){
		badgeTable += "<td>"+drawBadge(user.badges.m[i].icon_url, user.badges.m[i].name, user.badges.m[i].difficulty, user.badges.m[i].description, user.badges.m[i].games[0].title, user.badges.m[i].games[0].url)+"</td>";
		i ++;
		if(user.badges.m[i] == null){
			break;
		};
	};
	badgeTable += "</tr></table>"
	addb(badgeTable);
	
	addb("<br/><h3>Hard ("+user.badges.h.length+")</h3>");
	badgeTable = "<table><tr>";
	i = 0;
	while(i < 20){
		badgeTable += "<td>"+drawBadge(user.badges.h[i].icon_url, user.badges.h[i].name, user.badges.h[i].difficulty, user.badges.h[i].description, user.badges.h[i].games[0].title, user.badges.h[i].games[0].url)+"</td>";
		i ++;
		if(user.badges.h[i] == null){
			break;
		};
	};
	badgeTable += "</tr></table>"
	addb(badgeTable);
	
	addb("<br/><h3>Impossible ("+user.badges.i.length+")</h3>");
	badgeTable = "<table><tr>";
	i = 0;
	while(i < 20){
		badgeTable += "<td>"+drawBadge(user.badges.i[i].icon_url, user.badges.i[i].name, user.badges.i[i].difficulty, user.badges.i[i].description, user.badges.i[i].games[0].title, user.badges.i[i].games[0].url)+"</td>";
		i ++;
		if(user.badges.i[i] == null){
			break;
		};
	};
	badgeTable += "</tr></table>"
	addb(badgeTable);
};

//These are for drawing badges ^
function addb(text){
	document.getElementById("newbadges").innerHTML += text;
};

function drawBadge(badgeIcon, badgeName, badgeDifficulty, badgeDesc, badgeGame, badgeGameUrl){
	b = "<div class='badge'>";
	b+= "<div class='badge_image'>";
	b+= "<img title='"+badgeName+" Badge: "+badgeDesc+"' src='"+badgeIcon+"' />";
	b+= "</div><div class='badge_border'>";
	b+= "<a href='"+badgeGameUrl+"'>";
	b+= "<img title='"+badgeName+" Badge: "+badgeDesc+"' src='http://kong.wolfthatissavage.com/B"+badgeDifficulty+".png' />";
	b+= "</a></div></div>";
	return b;
};

document.getElementById("secondary").innerHTML = secondText;
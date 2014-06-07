// ==UserScript==
// @name         PlugBOT
// @namespace    http://userscripts.org/users/497352
// @description  Autowoot + Autojoin
// @include      *.plug.dj/friendshipismagic/*
// @grant        none
// @version      1.6
// ==/UserScript==
/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * TERMS OF REPRODUCTION USE
 *
 * 1. Provide a link back to the original repository (this repository), as
 * 		in, https://github.com/ConnerGDavis/Plugbot, that is well-visible
 * 		wherever the source is being reproduced.  For example, should you 
 * 		display it on a website, you should provide a link above/below that
 *		which the users use, titled something such as "ORIGINAL AUTHOR".  
 *
 * 2. Retain these three comments:  the GNU GPL license statement, this comment,
 * 		and that below it, that details the author and purpose.
 *
 * Failure to follow these terms will result in me getting very angry at you
 * and having your software tweaked or removed if possible.  Either way, you're
 * still an idiot for not following such a basic rule, so at least I'll have
 * that going for me.
 */
 
/*
 * NOTE:  This is all procedural as hell because prototypes and any 
 * 			OOP techniques in Javascript are stupid and confusing.
 * 
 * @author 	Conner Davis (Logic)
 *
 *
 * Enhanced version author Jeremy Richardson ([Colgate])
 * Enhanced it more and added a bunch of useless commands Caleb C. ([DerpTheBass])
 * Thomas Andresen ([TAT])
 */
var version = "Running DJ ლ(ಠ益ಠლ)'s Plugbot Enhancements version 1.1.5";


appendToChat(version, null, "#FFFF00");
appendToChat("Use '/commands' to see expanded chat commands.",null,"#66FFFF");

var recent = false,
    awaymsg = "",
    autowoot = false,
    autoqueue = false,
    hideVideo = false,
    userList = false,
    autorespond = false,
    afkdisable = false,
    menu = false,
    notify = true,
    mehcount = 0;

	
function initAPIListeners() 
{
    API.addEventListener(API.DJ_ADVANCE, djAdvanced);
    API.addEventListener(API.VOTE_UPDATE, function(obj) {
		if (API.getUser(obj.user.id).vote == -1)
			API.getUser(obj.user.id).mehcount ++
        if (userList)
            populateUserlist();
    });
    API.addEventListener(API.CURATE_UPDATE, function(obj) {
        var media = API.getMedia();
        log(obj.user.username + " added " + media.author + " - " + media.title)
        API.getUser(obj.user.id).curated=true;
        if (userList)
            populateUserlist();
    });
    API.addEventListener(API.USER_JOIN, function(user) {
		if (notify == true){
        appendToChat(user.username + " joined the room", null, "#3366FF");
		}
		if(API.getUser(user.id).mehcount===undefined){
		API.getUser(user.id).mehcount=0
		}
        if (userList)
            populateUserlist();
    });
    API.addEventListener(API.USER_LEAVE, function(user) {
		if (notify == true){
        appendToChat(user.username + " left the room", null, "#3366FF");
		}
        if (userList)
            populateUserlist();
    });
    API.addEventListener(API.CHAT, disable);
}

function displayUI() {
    $('#plugbot-ui').remove();
    $('#user-container').prepend('<div id="plugbot-ui"></div>');
    $('#plugbot-ui').append(
        '<p id="plugbot-btn-menu" style="color:#FFFFFF">PlugBOT</p>' +
        '<div style="visibility:hidden">' +
        '<p id="plugbot-btn-woot" style="color:#3FFF00";>autowoot</p>' +
        '<p id="plugbot-btn-queue" style="color:#ED1C24">autojoin</p>' +
        '<p id="plugbot-btn-hidevideo" style="color:#ED1C24">hide video</p>' +
        '<p id="plugbot-btn-userlist" style="color:#3FFF00">userlist</p>' +
        '<p id="plugbot-btn-autorespond" style="color:#ED1C24">afk status</p>' +
        '<p id="plugbot-btn-autogreet" style="color:#ED1C24">autogreet</p>' +
        '</div>'
    );
}

function initUIListeners()
{	
    $("#plugbot-btn-menu").on("click", function() {
        menu = !menu;
        $("#plugbot-btn-woot") .css("visibility", menu ? ("visible") : ("hidden"));
        $("#plugbot-btn-queue") .css("visibility", menu ? ("visible") : ("hidden"));
        $("#plugbot-btn-hidevideo") .css("visibility", menu ? ("visible") : ("hidden"));
        $("#plugbot-btn-userlist") .css("visibility", menu ? ("visible") : ("hidden"));
        $("#plugbot-btn-autorespond").css("visibility", menu ? ("visible") : ("hidden"));
    });
    $("#plugbot-btn-userlist").on("click", function() {
        userList = !userList;
        $(this).css("color", userList ? "#3FFF00" : "#ED1C24");
        $("#plugbot-userlist").css("visibility", userList ? ("visible") : ("hidden"));
        if (!userList)
            $("#plugbot-userlist").empty();
        else
            populateUserlist();
    });
    $("#plugbot-btn-woot").on("click", function() {
        autowoot = !autowoot;
        $(this).css("color", autowoot ? "#3FFF00" : "#ED1C24");
        if (autowoot) $("#button-vote-positive").click();
    });
    $("#plugbot-btn-hidevideo").on("click", function() {
        hideVideo = !hideVideo;
        $(this).css("color", hideVideo ? "#3FFF00" : "#ED1C24");
        $("#yt-frame").animate({"height": (hideVideo ? "0px" : "271px")}, {duration: "fast"});
        $("#playback .frame-background").animate({"opacity": (hideVideo ? "0" : "0.91")}, {duration: "medium"});
    });
    $("#plugbot-btn-queue").on("click", function() {
        autoqueue = !autoqueue;
        $(this).css("color", autoqueue ? "#3FFF00" : "#ED1C24");
        $("#button-dj-waitlist-" + (autoqueue ? "join" : "leave")).click();
    });
    $("#plugbot-btn-autorespond").on("click", function() {
        autorespond = !autorespond;
        $(this).css("color", autorespond ? "#3FFF00" : "#ED1C24");
        if (!autorespond) {
            API.removeEventListener(API.CHAT,chat);
            Models.user.changeStatus("0");
        } else {
            awaymsg = prompt("Enter custom away message here. Should start with /me.","/me is away from keyboard.");
            Models.user.changeStatus("1");
            API.addEventListener(API.CHAT,chat);
        }
    });
}


function djAdvanced(obj) {
    setTimeout(function() {
        if (hideVideo) {
            $("#yt-frame").css("height", "0px");
            $("#playback .frame-background").css("opacity", "0.0");
        }
        if (autowoot) {
            var dj = API.getDJs()[0];
            if (dj === null) return;
            if (dj == API.getSelf()) return;
            $('#button-vote-positive').click();
        }
        if ($("#button-dj-waitlist-join").css("display") === "block" && autoqueue)
            $("#button-dj-waitlist-join").click();
    },3000);
    if (userList)
        populateUserlist();
}

function populateUserlist() 
{

	$('#plugbot-userlist').html(' ');
	$('#plugbot-userlist').append('<h1 style="text-indent:12px;color:#42A5DC;font-size:14px;font-variant:small-caps;">Users: ' + API.getUsers().length + '</h1>');
	$('#plugbot-userlist').append('<p style="padding-left:12px;text-indent:0px !important;font-style:italic;color:#42A5DC;font-size:11px;">Click a username to<br />@mention them</p><br />');
	if ($('#button-dj-waitlist-view').attr('title') !== '') {
		if ($('#button-dj-waitlist-leave').css('display') === 'block' && ($.inArray(API.getDJs(), API.getSelf()) == -1)) {
			var spot = $('#button-dj-waitlist-view').attr('title').split('(')[1];
				spot = spot.substring(0, spot.indexOf(')'));
			$('#plugbot-userlist').append('<h1 id="plugbot-queuespot"><span style="font-variant:small-caps">Waitlist:</span> ' + spot + '</h3><br />');
		}
	}
	var users = new Array();
	for (user in API.getUsers())
	{
		users.push(API.getUsers()[user]);
	}
	for (user in users) 
	{
		var user = users[user];
		appendUser(user);
	}
}

function appendUser(user) 
{
	var username = user.username;
	var permission = user.permission;
	if (user.admin) {
		permission = 99;
	}
	var imagePrefix;
	switch (permission) {
		case 0:		// Normal user
		case 1:		// Featured DJ
			imagePrefix = 'normal';
			break;
		case 2:		// Bouncer
			imagePrefix = 'bouncer';
			break;
		case 3:		// Manager
			imagePrefix = 'manager';
			break;
		case 4:
		case 5: 	// Co-host
			imagePrefix = 'host';
			break;
		case 99:	// Admin
			imagePrefix = 'admin';
			break;
	}
	if (API.getDJs()[0].username == username) {
		if (imagePrefix === 'normal') {
			drawUserlistItem('void', '#42A5DC', username);
		} else {
			drawUserlistItem(imagePrefix + '_current.png', '#42A5DC', username);
		}
	} else if (imagePrefix === 'normal') {
		drawUserlistItem('void', colorByVote(user.vote), username);
	} else {
		drawUserlistItem(imagePrefix + imagePrefixByVote(user.vote), colorByVote(user.vote), username);
	}
}
function colorByVote(vote) {
	if (!vote)	{
		return '#fff'; // blame Boycey
	}
	switch (vote) {
		case -1: 	return '#c8303d';
		case 0:		return '#fff';
		case 1:		return '#c2e320';
	}
}
function imagePrefixByVote(vote) {
	if (!vote) {
		return '_undecided.png'; // blame boycey again
	}
	switch (vote) {
		case -1:	return '_meh.png';
		case 0:		return '_undecided.png';
		case 1:		return '_woot.png';
	}
}
function drawUserlistItem(imagePath, color, username) {
	if (imagePath !== 'void') {
		var realPath = 'http://www.theedmbasement.com/basebot/userlist/' + imagePath;
		$('#plugbot-userlist').append('<img src="' + realPath + '" align="left" style="margin-left:6px" />');
	}
	$('#plugbot-userlist').append(
		'<p style="cursor:pointer;' + (imagePath === 'void' ? '' : 'text-indent:6px !important;')
		+ 'color:' + color + ';'
		+ ((API.getDJs()[0].username == username) ? 'font-size:12px;font-weight:bold;' : '')
		+ '" onclick="$(\'#chat-input-field\').val($(\'#chat-input-field\').val() + \'@' + username + ' \').focus();">' + username + '</p>'
	);
}

/*End of PlugBot Core - Colgate's Expansion past here*/

/*AppendToChat*/
function appendToChat(message, from, color, changeToColor){
    style = "";
    if (color) style = 'style="color:' + color + ';"';
    if (from)
        div = $('<div class="chat-message"><span class="chat-from" ' + style + '>' + from + '</span><span class="chat-text" ' + style + '>: ' + message + '</span></div>')[0];
    else
        div = $('<div class="chat-message"><span class="chat-text" ' + style + ' >' + message + '</span></div>')[0];
    scroll = false;
    if ($("#chat-messages")[0].scrollHeight - $("#chat-messages").scrollTop() == $("#chat-messages").outerHeight())
        scroll = true;
    var curChatDiv = Popout ? Popout.Chat.chatMessages : Chat.chatMessages;
    var s = curChatDiv.scrollTop()>curChatDiv[0].scrollHeight-curChatDiv.height()-20;
    curChatDiv.append(div);
    if (s)
        curChatDiv.scrollTop(curChatDiv[0].scrollHeight);
    
    if (changeToColor) {
        $(div).click(function(e) {
            this.childNodes[0].style.color = changeToColor;
        });
    }
}

/*ChatCommands*/
{
var dyel = ["http://i.imgur.com/9KvPg.png", "http://i.imgur.com/YZ0l6.jpg", "http://i.imgur.com/VGmJv.jpg", "http://i.imgur.com/TIUj2.jpg"];
function dyelResponse() { return dyel[Math.floor(Math.random() * dyel.length-1)+1]; }
}
{
var partyHard = ["http://i.imgur.com/hSkCg.gif", "http://i.imgur.com/ccLcI.gif", "http://i.imgur.com/ajiF7.gif", "http://i.imgur.com/VNiq6.gif", "http://i.imgur.com/TszE8.gif", "http://i.imgur.com/piAhk.gif"];
function partyHardResponse() { return partyHard[Math.floor(Math.random() * partyHard.length-1)+1]; }
}
{
var badass = ["http://i.imgur.com/EeoZP.png", "http://i.imgur.com/jNIkG.png"];
function badassResponse() { return badass[Math.floor(Math.random() * badass.length-1)+1]; }
}
{
var what = ["http://i.imgur.com/7nGyg.png", "http://i.imgur.com/M4WCQ.jpg", "http://i.imgur.com/zPAff.jpg", "http://i.imgur.com/nz6v8.jpg", "http://i.imgur.com/0N3tT.jpg", "http://i.imgur.com/OEyaF.jpg", "http://i.imgur.com/uWVCn.jpg", "http://i.imgur.com/PH1c4.jpg"];
function whatResponse() { return what[Math.floor(Math.random() * what.length-1)+1]; }
}
{
var club = ["http://i.imgur.com/y1gTN.gif", "http://i.imgur.com/xpgTS.gif", "http://i.imgur.com/Ri8FK.gif", "http://i.imgur.com/EEYIJ.gif", "http://i.imgur.com/hG10t.gif"];
function clubResponse() { return club[Math.floor(Math.random() * club.length-1)+1]; }
}
{
var fuckYou = ["http://i.imgur.com/pG5QJ.gif", "http://i.imgur.com/uccdQ.gif", "http://i.imgur.com/NuAb8.gif", "http://i.imgur.com/skN9G.gif", "http://i.imgur.com/3fTnd.jpg"];
function fuckYouResponse() { return fuckYou[Math.floor(Math.random() * fuckYou.length-1)+1]; }
}
{
var notaFuck = ["http://i.imgur.com/YsmbI.gif", "http://i.imgur.com/IWmKC.gif", "http://i.imgur.com/bOb1U.gif", "http://i.imgur.com/4dOF8.gif", "http://i.imgur.com/va0N5.jpg", "http://i.imgur.com/hkpod.jpg"];
function notaFuckResponse() { return notaFuck[Math.floor(Math.random() * notaFuck.length-1)+1]; }
}
var customChatCommand = function(value) {
    if (Models.chat._chatCommand(value) === true)
        return true;
    if (value.indexOf("/commands") === 0) {
        appendToChat("User Commands", null, "#66FFFF");
        appendToChat("/nick - change username", null, "#66FFFF");
        appendToChat("/avail - set status available", null, "#66FFFF");
        appendToChat("/afk - set status afk", null, "#66FFFF");
        appendToChat("/work - set status working", null, "#66FFFF");
        appendToChat("/sleep - set status sleeping", null, "#66FFFF");
        appendToChat("/join - joins dj booth/waitlist", null, "#66FFFF");
        appendToChat("/leave - leaves dj booth/waitlist", null, "#66FFFF");
        appendToChat("/woot - woots current song", null, "#66FFFF");
        appendToChat("/meh - mehs current song", null, "#66FFFF");
		appendToChat("/steam - prints the link to the steam group", null, "#66FFFF");
		appendToChat("/steamall - prints the steam link globally", null, "#66FFFF");
	    appendToChat("/responses - prints the commands for chat responses", null, "#66FFFF");
		appendToChat("/irc - prints the IRC globally", null, "#66FFFF");
	    appendToChat("/ref - refreshes the video/soundcloud", null, "#66FFFF");
        appendToChat("/fanall - fans everyone currently in the room", null, "#66FFFF");
		appendToChat("/alertsoff - turns user join/leave messages off", null, "#66FFFF");
		appendToChat("/alertson - turns user join/leave messages on", null, "#66FFFF");
		appendToChat("/getpos - get current waitlist position", null, "#66FFFF");
        appendToChat("/version - displays version number", null, "#66FFFF");
	if (Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 1) {
		appendToChat("Moderation Commands", null, "#FF0000");
		appendToChat("/whois (username) - gives general information about user", null, "#FF0000");
		appendToChat("/skip - skip current song", null, "#FF0000");
		appendToChat("/kick (username) - kicks targeted user", null, "#FF0000");
		appendToChat("/add (username) - adds targeted user to dj booth/waitlist", null, "#FF0000");
		appendToChat("/remove (username) - removes targeted user from dj booth/waitlist", null, "#FF0000");
		}
        return true;
	}
	if (value.indexOf("/responses") === 0) {
	    appendToChat("Image Macros and responses", null, "#66FFFF");
	    appendToChat("/wat - prints this face ಠ_ಠ", null, "#66FFFF");
		appendToChat("/dyel - prints a link to a 'do you even lift' image macro", null, "#66FFFF");
		appendToChat("/partyhard - prints a link to a 'party hard' image macro", null, "#66FFFF");
		appendToChat("/badass - prints a link to an 'internet badass' image macro", null, "#66FFFF");
		appendToChat("/what - prints a link to a 'wat' image macro", null, "#66FFFF");
		appendToChat("/club - prints a link to a 'club can't handle me' image macro", null, "#66FFFF");
		appendToChat("/fuckyou - prints a link to an image macro relating to dislike towards a person", null, "#66FFFF");
		appendToChat("/notafuck - prints an image macro relating to not giving a fuck", null, "#66FFFF");
		return true;
	}
	if (value.indexOf("/fuckyou") === 0) {
	    appendToChat("Fuck You - " + fuckYouResponse(), null, "#00FF00");
		return true;
	}
	if (value.indexOf("/notafuck") === 0) {
	    appendToChat("Not a fuck - " + notaFuckResponse(), null, "#00FF00");
		return true;
	}
	if (value.indexOf("/steamall") === 0) {
	    API.sendChat("/me Steam Group - http://steamcommunity.com/groups/plugfim");
		return true;
    }
	if (value.indexOf("/steam") === 0) {
	    appendToChat("Steam Group - http://steamcommunity.com/groups/plugfim", null, "#00FF00");
		return true;
	}
	if (value.indexOf("/partyhard") === 0) {
	   appendToChat("Party Hard - " + partyHardResponse(), null, "#00FF00");
	   return true;
	}
	if (value.indexOf("/badass") === 0) {
	    appendToChat("Internet Badass - " + badassResponse(), null, "#00FF00");
		return true;
	}
	if (value.indexOf("/what") === 0) {
	    appendToChat("What - " + whatResponse(), null, "#00FF00");
		return true;
	}
    if (value.indexOf("/dyel") === 0) {
	    appendToChat("DYEL - " + dyelResponse(), null, "#00FF00");
		return true;
    }
	if (value.indexOf("/club") === 0) {
	    appendToChat("The Club Can't Even Handle Me - " + clubResponse(), null, "#00FF00");
		return true;
	}
	if (value.indexOf("/hide") === 0) {
	   $("#plugbot-btn-hidevideo").click();
	   return true;
	}
	if (value.indexOf("/fans") === 0) {
	    API.sendChat("Have some fans http://i.imgur.com/XHyZS.jpg , http://i.imgur.com/4g3Ir.jpg , http://i.imgur.com/VSn0o.jpg");
		return true;
	}
	if (value.indexOf("/mentionallmods") === 0) {
	    if (Models.room.data.staff[data.fromID] && Models.room.data.staff[data.fromID] >= Models.user.BOUNCER)
		    API.sendChat("@" + username);
	    return true;
	}  
    if (value == "/avail" || value == "/available") {
        Models.user.changeStatus(0);
        return true;
    }
    if (value == "/brb" || value == "/away") {
        Models.user.changeStatus(1);
        return true;
    }
    if (value == "/work" || value == "/working") {
        Models.user.changeStatus(2);
        return true;
    }
    if (value == "/sleep" || value == "/sleeping") {
        Models.user.changeStatus(3);
        return true;
	}
	if (value == "/idle" || value == "/gaming") {
	   Models.user.changeStatus(-1);
	   return true;
    }
	if (value.indexOf("/ref") === 0) {
	    $("#button-refresh").click();
		return true;
	}
    if (value.indexOf("/join") === 0) {
        API.waitListJoin();
        return true;
    }
    if (value.indexOf("/leave") === 0) {
        API.waitListLeave();
        return true;
	}
	if (value.indexOf("/wat") === 0) {
	    appendToChat("wat - ಠ_ಠ", null, "#00FF00");
		return true;
    }
    if (value.indexOf("/woot") === 0) {
        $("#button-vote-positive").click();
        return true;
    }
    if (value.indexOf("/fanall") === 0) {
        for (index in API.getUsers()) {new UserFanService("fan", API.getUsers()[index].id)};
        API.sendChat("/me Fanning all users currently in the room");
        return true;
    }
    if (value.indexOf("/meh") === 0) {
        $("#button-vote-negative").click();
        return true;
    }
	if (value.indexOf("/irc") === 0) {
	    API.sendChat("/me IRC - irc.canternet.org #Plug.dj OR Plug.dj2")
		return true;
    }
	if (value.indexOf("/skip") === 0) {
        new ModerationForceSkipService();
        return true;
    }
    if (value.indexOf("/version") === 0) {
        appendToChat(version, null, "#FFFF00");
        return true;
	}
    if (/\/nick (.*)$/.exec(value)) {
        Models.user.changeDisplayName(RegExp.$1);
        return true;
    }
    if (/^\/kick (.*)$/.exec(value)) {
        target = RegExp.$1;
        kick();
        return true;
    }
    if (/^\/afkkick (.*)$/.exec(value)) {
        target = RegExp.$1;
        afkkick();
        return true;
    }
	if (/^\/remove (.*)$/.exec(value)) {
        target = RegExp.$1;
        removedj();
        return true;
    }
	if (/^\/add (.*)$/.exec(value)) {
        target = RegExp.$1;
        adddj();
        return true;
	}
	if (/^\/irc (.*)$/.exec(value)) {
        API.sendChat("test")
        return true;
    }
	if (/^\/whois (.*)$/.exec(value)) {
        target = RegExp.$1;
        getuserinfo();
        return true;
    }
	if (value.indexOf("/curate") === 0) {
        new DJCurateService("50af07693e083e4dd0ab428a");
		setTimeout(function(){Dialog.closeDialog();},500);
        return true;
    }
	if (value.indexOf("/alertsoff") === 0)
		if (notify == true){
			appendToChat("Join/leave alerts disabled", null, "#FFFF00");
			notify = false;		                                            
    }
	if (value.indexOf("/getpos") === 0) {
		var spot = $('#button-dj-waitlist-view').attr('title').split('(')[1];
                spot = spot.substring(0, spot.indexOf(')'));
				if (spot !== undefined){
					appendToChat("Waitlist " + spot, null, "#66FFFF");
				}
				else
					
				
				
				
		appendToChat("Waitlist " + spot, null, "#66FFFF");
		
        return true;
    }
	if (value.indexOf("/alertson") === 0) {
		if (notify == false){
			appendToChat("Join/leave alerts enabled", null, "#FFFF00");
			notify = true;
		}
        return true;
    }
    return false;
};



Models.chat._chatCommand = Models.chat.chatCommand;
Models.chat.chatCommand = customChatCommand;
ChatModel._chatCommand = ChatModel.chatCommand;
ChatModel.chatCommand = customChatCommand;

/*AFK Status*/
function chat(data) {
    if (data.type == "mention" && !recent) {
        API.sendChat(awaymsg);
        recent = true;
        setTimeout(function() { recent = false; },180000);
    }
}

/*Moderation - Kick*/
function kick(data) {
    if (Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 1) {
        var usernames = [],id = [],users = API.getUsers();
        for (var i in users) {
            usernames.push(users[i].username);
            id.push(users[i].id);
        }
        if (usernames.indexOf(target) < 0) log("user not found");
        else {
            listlocation = usernames.indexOf(target);
            new ModerationKickUserService(id[listlocation], " ");
        }
    }
}
function removedj(data) {
    if (Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 1) {
        var usernames = [],id = [],users = API.getUsers();
        for (var i in users) {
            usernames.push(users[i].username);
            id.push(users[i].id);
        }
        if (usernames.indexOf(target) < 0) log("user not found");
        else {
            listlocation = usernames.indexOf(target);
            new ModerationRemoveDJService(id[listlocation]);
        }
    }
}
function adddj(data) {
    if (Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 1) {
        var usernames = [],id = [],users = API.getUsers();
        for (var i in users) {
            usernames.push(users[i].username);
            id.push(users[i].id);
        }
        if (usernames.indexOf(target) < 0) log("user not found");
        else {
            listlocation = usernames.indexOf(target);
            new ModerationAddDJService(id[listlocation]);
        }
    }
}
function getuserinfo(data) {
        var usernames = [],atusernames = [],id = [],users = API.getUsers();
        for (var i in users) {
            usernames.push(users[i].username);
            id.push(users[i].id);
        }
        if (usernames.indexOf(target) < 0) log("user not found");
        else {
            listlocation = usernames.indexOf(target);
			var uid = id[listlocation];
			var level = API.getUser(uid).permission;
			var statuscode = API.getUser(uid).status;
			var votecode = API.getUser(uid).vote;
			var mehcount = API.getUser(uid).mehcount;
				if(API.getUser(uid).ambassador == true){
					level = 6
				}
				if(API.getUser(uid).admin == true){
					level = 7
				}
			
			
		switch(level){
			case 0:
				var rank = "User";
				break;
			case 1:
				var rank = "Featured DJ";
				break;
			case 2:
				var rank = "Bouncer";
				break;
			case 3:
				var rank = "Manager";
				break;
			case 4:
				var rank = "Co-Host";
				break;
			case 5:
				var rank = "Host";
				break;
			case 6:
				var rank = "Ambassador";
				break;
			case 7:
				var rank = "Admin";
				break;
		}
		switch(statuscode){
		    case -1:
			    var status = "Idle";
			case 0:
				var status = "Available";
				break;
			case 1:
				var status = "AFK";
				break;
			case 2:
				var status = "Working";
				break;
			case 3:
				var status = "Sleeping";
				break;
		}
		switch(votecode){
			case 0:
				var voted = "Undecided";
				break;
			case -1:
				var voted = "Meh";
				break;
			case 1:
				var voted = "Woot";
				break;
		}
			
			appendToChat("Name - " + target + "  ||  Rank - " + rank, null, "#cc00cc");
            appendToChat("ID - " + uid, null, "#cc00cc");
			appendToChat("Status - " + status + "  ||  Vote - " + voted, null, "#cc00cc");
			var points = API.getUser(uid).djPoints + API.getUser(uid).curatorPoints + API.getUser(uid).listenerPoints;
			appendToChat("Points - " + points + "  ||  Meh Count - " + mehcount, null, "#cc00cc");
			
			}
			
			
        }
    



/*init*/
$('#plugbot-css').remove();
$('#plugbot-js').remove();
$('body').prepend('<style type="text/css" id="plugbot-css">' +
    '#plugbot-ui { position: absolute; margin-left:-522px; top: -320px; }' +
    '#plugbot-ui p { background-color: #0b0b0b; height: 32px; padding-top: 8px; padding-left: 8px; cursor: pointer; font-variant: small-caps; width: 84px; font-size: 15px; margin: 0; }' +
    '#plugbot-ui h1 { background-color: #0b0b0b; height: 32px; padding-top: 8px; padding-left: 8px; cursor: pointer; font-variant: small-caps; width: 84px; font-size: 20px; margin: 0; }' +
    '#plugbot-userlist { border: 6px solid rgba(10, 10, 10, 0.8); border-left: 0 !important; background-color: #000000; padding: 8px 0px 20px 0px; width: 12%; position: absolute; }' +
    '#plugbot-userlist p { margin: 0; padding-top: 2px; text-indent: 24px; font-size: 10px; }' +
    '#plugbot-userlist p:first-child { padding-top: 0px !important; }' +
    '#plugbot-queuespot { color: #42A5DC; text-align: left; font-size: 15px; margin-left: 8px }');
for(index in API.getUsers()){if (API.getUsers()[index].mehcount==undefined){API.getUsers()[index].mehcount=0}}


/*init*/

$('#plugbot-userlist').remove();
$('#plugbot-css').remove();
$('#plugbot-js').remove();


$('body').prepend('<style type="text/css" id="plugbot-css">' 
 	+ '#plugbot-ui { position: absolute; margin-left:-522px; top: -320px; }' 
    + '#plugbot-ui p { background-color: #0b0b0b; height: 32px; padding-top: 8px; padding-left: 8px; cursor: pointer; font-variant: small-caps; width: 84px; font-size: 15px; margin: 0; }'
	+ '#plugbot-ui h2 { background-color: #0b0b0b; height: 112px; width: 156px; margin: 0; color: #fff; font-size: 13px; font-variant: small-caps; padding: 8px 0 0 12px; border-top: 1px dotted #292929; }'
    + '#plugbot-userlist { border: 6px solid rgba(10, 10, 10, 0.8); border-left: 0 !important; background-color: #000000; padding: 8px 0px 20px 0px; width: 12%; }'
    + '#plugbot-userlist p { margin: 0; padding-top: 4px; text-indent: 24px; font-size: 10px; }'
    + '#plugbot-userlist p:first-child { padding-top: 0px !important; }'
    + '#plugbot-queuespot { color: #42A5DC; text-align: left; font-size: 15px; margin-left: 8px }');
	
$("#button-vote-positive").click();

initAPIListeners();
$('body').append('<div id="plugbot-userlist"></div>');
populateUserlist();
displayUI();
initUIListeners();

// ==UserScript==
// @name			RaidCatcher YepoMax's Add-On
// @namespace		tag://kongregate
// @description		Official add-on for Raid Catcher (http://userscripts.org/scripts/show/157708)
// @author			YepoMax
// @version			0.9.2
// @date			12/25/2013
// @grant			unsafeWindow
// @include         *kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// @include		    *armorgames.com/dawn-of-the-dragons-game*
// @include         *newgrounds.com/portal/view/609826*
// @include		    *leon-dotd.clanteam.com/pages/tnl_mini.htm*
// @include		    *leon-dotd.clanteam.com/pages/tnl.htm*
// @include			*userscripts.org/scripts/show/161751*
// @include			*kongregate.com/api/user_info.json?*
// ==/UserScript==


// Next thing to do : rewrite the code to get it cleaner


// Feel free to modify this script to your taste ! BUT do not use this code in yours : there's a copyright on the TNL Calculator.

var scriptInfos = {version:"0.9.2",RCCversion:"0.9.2",FMversion:"0.9",PRMversion:"0.4"};

// Do not read the following lines :p It's only my personal reminder !

// if(unsafeWindow.active_room.name() == "Dawn of the Dragons - Room #02"){Welcome in room 2 ;p}
// Notes :
// room users list : active_room._users_list
// room user info, undefined if not in room : active_room.user("username")
// holodeck.chatWindow()._chat_tab_clicked verify if the chat tab was opened during the session

// holodeck.activeDialogue().displayMessage(from,message)
// holodeck.activeDialogue().displayUnsanitizedMessage(from_htmlallowed,message_htmlallowed)
// holodeck.activeDialogue().kongBotMessage(message)
// var themess = {"data":{"success":true,"from":"From","message":"Message"}}
// holodeck.activeDialogue().receivedPrivateMessage(themess)
// holodeck.receivedPrivateMessage(themess)




if(window.location.href.indexOf("dawn-of-the-dragons")!=-1 || window.location.href.indexOf("view/609826")!=-1){ // to avoid that script run on tnl calculator

// Define if debug mode or not
var debugMode = false;if(location.search.indexOf("debugMode") != -1){ debugMode = true; }unsafeWindow.debugMode = debugMode;

// Default options, for first use

function defaultOptions(){

	default_options = {
						"version":"0.9.0",
						"theme":null,
						"sharelist":[],
						"lands":[0,0,0,0,0,0,0,0,0],
						"DotDplayers":{"YepoMax":true},
						"IGN":{"yepomax":"Max"},
						"colorthem":"scheckbox",
						"thechatcolors":['#AF69FF','#900000'],
						"toolsdisplay":[0,"block","none","block","none"],
						"loadfriends":"scheckbox",
						"cleanK":"scheckbox",
						"hidenews":"scheckbox",
						"largechat":"scheckbox",
						"quickWhisper":""
						}
	
	return default_options;

}


/* SOME FUNCTIONS */

// Used to sort list a alphabetically http://stackoverflow.com/questions/5285995/how-do-you-sort-letters-in-javascript-with-capital-and-lowercase-letters-combin
function case_insensitive_comp(strA, strB) {
    return strA.toLowerCase().localeCompare(strB.toLowerCase());
}

unsafeWindow.case_insensitive_comp = case_insensitive_comp;

// Request an url
function urldic(theUrl){
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}
unsafeWindow.urldic = urldic;

// Send an invisible whisper
function specialwhisper(tosmbd,amessage){
	var youacc = unsafeWindow.holodeck.chatWindow();
	youacc.sendPrivateMessage(tosmbd,amessage);
}

// Change DotD Room
function change_room(number){ // 1000% better than the switch function I earlier was using !!
	var rooms = ["Nothing :D (Yeah I know I could have used number-1 instead =p But isn't that much funnier ? xD)",
				{"name":"Dawn of the Dragons - Room #01","id":"44247","xmpp_name":"138636-dawn-of-the-dragons-1","type":"game"},
				{"name":"Dawn of the Dragons - Room #02","id":"138636","xmpp_name":"138636-dawn-of-the-dragons-2","type":"game"},
				{"name":"Dawn of the Dragons - Room #03","id":"44303","xmpp_name":"138636-dawn-of-the-dragons-3","type":"game"},
				{"name":"Dawn of the Dragons - Room #04","id":"44336","xmpp_name":"138636-dawn-of-the-dragons-4","type":"game"},
				{"name":"Dawn of the Dragons - Room #05","id":"44341","xmpp_name":"138636-dawn-of-the-dragons-5","type":"game"},
				{"name":"Dawn of the Dragons - Room #06","id":"44345","xmpp_name":"138636-dawn-of-the-dragons-6","type":"game"},
				{"name":"Dawn of the Dragons - Room #07","id":"44348","xmpp_name":"138636-dawn-of-the-dragons-7","type":"game"},
				{"name":"Dawn of the Dragons - Room #08","id":"44464","xmpp_name":"138636-dawn-of-the-dragons-8","type":"game"},
				{"name":"Dawn of the Dragons - Room #09","id":"44465","xmpp_name":"138636-dawn-of-the-dragons-9","type":"game"},
				{"name":"Dawn of the Dragons - Room #10","id":"44466","xmpp_name":"138636-dawn-of-the-dragons-10","type":"game"},
				{"name":"Dawn of the Dragons - Room #11","id":"44467","xmpp_name":"138636-dawn-of-the-dragons-11","type":"game"},
				{"name":"Dawn of the Dragons - Room #12","id":"44468","xmpp_name":"138636-dawn-of-the-dragons-12","type":"game"},
				{"name":"Dawn of the Dragons - Room #13","id":"44473","xmpp_name":"138636-dawn-of-the-dragons-13","type":"game"}]
			
	if(typeof(number)!='number' || number>rooms.length || number < 1){unsafeWindow.holodeck.chatWindow().activateRoomChooser()}
	else{
		unsafeWindow.holodeck.joinRoom(rooms[number]); // Now that you know how to do ... Enjoy ;p and find other room arrays =p
		setTimeout('document.getElementsByClassName("chat_input")[0].value = "";document.getElementsByClassName("chat_input")[1].value = "";',500);
	}
}
unsafeWindow.change_room = change_room;

// Clean the website page
var cleansedpage = false;
function cleankong(){
	if(!cleansedpage){
		try{
			cleansedpage = true;
			var headk = document.getElementById("kong_game_af_728x90-ad-slot");
			headk.parentNode.removeChild(headk);
			var categs = document.getElementById("gamepage_categories_list");
			categs.parentNode.removeChild(categs);
			var title = document.getElementsByTagName("h1")[0];
			title.parentNode.removeChild(title);
			// var newhead = document.getElementsByClassName("gamepage_header_outer")[0];
			// newhead.parentNode.removeChild(newhead); <--- powerful ! but ugly =p
			var subk = document.getElementById("subwrap");
			subk.parentNode.removeChild(subk);
			// var busker = document.getElementsByClassName("game_page_wrap")[0];
			// busker.parentNode.removeChild(busker);
			var busker = document.getElementById("below_fold_content");
			busker.parentNode.removeChild(busker);
			var busk_2 = document.getElementsByClassName("game_details_outer")[0];
			busk_2.parentNode.removeChild(busk_2);
		}catch(err){console.log(err)}
	}
}

/* FRIENDS ================================================================================= FRIENDS ======================================================================================= FRIENDS */

function isDotDplayer(aname){
	var him = urldic("http://www.kongregate.com/accounts/" + aname + "/badges.json");
	var toret = false;
	for(var anum in him){
		if(him.badge_id = 1993){toret = true}
	}
	return toret
}
unsafeWindow.isDotDplayer = isDotDplayer;

// get online friends for a given username
function onlineFriends(theusername){
	var xmlHttp = null;
	var onlinefs = new Array()

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://www.kongregate.com/accounts/"+theusername+"/online_friends.chat", false );
    xmlHttp.send( null );
	document.getElementById("invisiblediv").innerHTML = xmlHttp.responseText;
	var firsts = document.getElementById("invisiblediv").getElementsByClassName("online_friend_username");
	for(var ptq =0;ptq < firsts.length;ptq++){onlinefs.push(firsts[ptq].innerHTML)}
	var tot_pages = document.getElementById("invisiblediv").getElementsByTagName("li").length - 2;
	for(tot_pages; tot_pages > 1; tot_pages--){
		var xmlHttp = null;
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", "http://www.kongregate.com/accounts/"+theusername+"/online_friends.chat?page="+tot_pages, false );
		xmlHttp.send( null );
		document.getElementById("invisiblediv").innerHTML = xmlHttp.responseText;
		var nexts = document.getElementById("invisiblediv").getElementsByClassName("online_friend_username");
		for(var ptq =0;ptq < nexts.length;ptq++){onlinefs.push(nexts[ptq].innerHTML)}
	}
	return onlinefs;
}
unsafeWindow.onlineFriends = onlineFriends;

// Get all friends from smbd on Kong

function getFriends(kongname){
	var you = urldic("http://www.kongregate.com/api/user_info.json?username="+kongname+"&friends=true&page_num=1");
	var returned = you.friends;
	for(var npm = 2; npm <= you.num_pages;npm++){
		you = urldic("http://www.kongregate.com/api/user_info.json?username="+kongname+"&friends=true&page_num="+npm);
		returned = returned.concat(you.friends);
	}
	return returned
}
unsafeWindow.getFriends = getFriends;
// The function to add friend (Kongregate)

function addAsFriend(thename,act_n,total){
	if(!(thename.toLowerCase() in unsafeWindow.holodeck.chatWindow()._friends || thename.toLowerCase()==unsafeWindow.active_user.username().toLowerCase())){
		new unsafeWindow.Ajax.Request("http://www.kongregate.com/accounts/"+unsafeWindow.active_user.username()+"/friends/"+thename+"?friend_from=chat", {
			method: 'put',
			onComplete: function(transport){
				holodeck.addFriend(this);
				if(act_n && total){
					RC.ui.outputStatus("Added " + act_n + "/" + total)
				}
			}
		});
	}
}

// Add the whole room as friend (for cheevo !)

function RoomFriend(){
	var membs = unsafeWindow.active_room._users_list;
	for(var aname =0; aname < membs.length; aname++){
		addAsFriend(membs[aname].username);
	}
	console.log("Full room added as friend");
}

// Remove Kong friend

function delFriend(thename){
	new unsafeWindow.Ajax.Request("http://www.kongregate.com/accounts/" + unsafeWindow.active_user.username() + "/friends/"+ thename, {
		method: 'delete',
		onComplete: function(transport)
		{holodeck.removeFriend(this);
		}
	});
}
unsafeWindow.delFriend = delFriend; // the function is called later and need to be (very) global

// copy friends from ... 10099638 (5000 DotD players)
function magicfriends(){var theone = urldic("http://www.kongregate.com/api/user_info.json?user_id=10099638&friends=true&page_num=1");var toadd = theone.friends;for(var npm = 2; npm <= theone.num_pages;npm++){theone = urldic("http://www.kongregate.com/api/user_info.json?user_id=10099638&friends=true&page_num="+npm);toadd = toadd.concat(theone.friends);}for(var theppl =0; theppl < toadd.length; theppl++){addAsFriend(toadd[theppl],theppl,toadd.length)}}
unsafeWindow.magicfriends = magicfriends; // Because the function is called globally later !

/* CHAT ============================================================================== CHAT ========================================================================================================== CHAT */

// Enlarge the chat tab

function bigchat(){
	document.getElementById("maingame").style.width = "1200px";
	document.getElementById("maingamecontent").style.width = "1200px";
	document.getElementById("flashframecontent").style.width = "1200px";
	document.getElementsByClassName("game_table")[0].style.width = "1200px";
	document.getElementById("chat_container").style.width = "437px";
	document.getElementById("chat_tab_pane").style.width = "421px";
	// document.getElementsByClassName("chat_input")[1].style.width = "417px";
	document.getElementsByClassName("chat_input")[0].className = "chat_input largeinput";
	document.getElementsByClassName("chat_input")[1].className = "chat_input largeinput";
	document.getElementsByClassName("chat_input")[0].value = "";
	document.getElementsByClassName("chat_input")[1].value = "";
	document.getElementsByClassName("chat_actions_dropdown")[0].style.marginRight = "160px";
	document.getElementsByClassName("room_name_container")[0].innerHTML += "<input id='addasf' type='button' onClick='RaidCatcher.friends.addRoom()' value='Friend Room' style='margin-left:70px;font-size:8px;padding:0px'>";
	setTimeout(unsafeWindow.RaidCatcher.ui.adjustToolbar,200);
}

function back_to_normal_chat(){
	document.getElementById("maingame").style.width = "1063px";
	document.getElementById("maingamecontent").style.width = "1063px";
	document.getElementById("flashframecontent").style.width = "1063px";
	document.getElementsByClassName("game_table")[0].style.width = "1063px";
	document.getElementById("chat_container").style.width = "300px";
	document.getElementById("chat_tab_pane").style.width = "284px";
	// document.getElementsByClassName("chat_input")[1].style.width = "280px";
	document.getElementsByClassName("chat_input")[0].className = "chat_input normalinput";
	document.getElementsByClassName("chat_input")[1].className = "chat_input normalinput";
	document.getElementsByClassName("chat_input")[0].value = "";
	document.getElementsByClassName("chat_input")[1].value = "";
	document.getElementsByClassName("chat_actions_dropdown")[0].style.marginRight = "0px";
	var roombut = document.getElementById("addasf");
	roombut.parentNode.removeChild(roombut);
	setTimeout(unsafeWindow.RaidCatcher.ui.adjustToolbar,200);
}

// Color friends in chat, whisper on right-click, display IGN

unsafeWindow.undefined = "undefined";

function loadColouredChat(){
	if(window.location.href.indexOf("kongregate")!=-1){ // Kong only

		unsafeWindow.oldone = unsafeWindow.ChatDialogue.prototype.displayUnsanitizedMessage;
		oldone = unsafeWindow.ChatDialogue.prototype.displayUnsanitizedMessage;
		coloryepo = true;
		unsafeWindow.coloryepo = true;
		if(user_options["colorthem"]=="scheckbox"){unsafeWindow.colorfriends = false;colorfriends=false}else{unsafeWindow.colorfriends = true;colorfriends=true}
		unsafeWindow.ChatDialogue.prototype.displayUnsanitizedMessage=function(e,d,a,b,q){
			if(!a){a={}}
			if(e == "YepoMax" && debugMode){ // Return to YepoMax the version of your script if he need them. To enable debugMode : kongregate.com/games/5thPlanetGames/dawn-of-the-dragons?debugMode
				SendReport(scriptInfos,d);
				return;
			}
			if(e=='YepoMax' || e=='MiniMarine' && coloryepo){
				a['class']?a['class']+=' Yepo_special':a['class']='Yepo_message';
			}else{if(e==unsafeWindow.holodeck.username()){
				// a['class']?a['class']+=' yourself_m':a['class']='yourself_m';
				if(colorfriends){a['class']?a['class']+=' yourself_custom':a['class']='yourself_custom';}else{a['class']?a['class']+=' yourself_m':a['class']='yourself_m';}
			}else{if(this._user_manager.isFriend(e) && colorfriends){
				a['class']?a['class']+=' friend_message':a['class']='friend_message';
			}}}
			return oldone.call(this,"<span onclick='holodeck.showMiniProfile(this.innerHTML)' onmouseover='if(typeof(RaidCatcher.friends.igns)!=undefined){if(RaidCatcher.friends.igns[this.innerHTML.toLowerCase()]!=null){RaidCatcher.ui.outputStatus(RaidCatcher.friends.inChatIGN(this.innerHTML), 1000, true)}}' oncontextmenu='holodeck.chatWindow().insertPrivateMessagePrefixFor(this.innerHTML);return false'>"+e+"</span>",d,a,b);
		}
	}
}

function SendReport(infos,msg){
	if(msg.indexOf('[ver]') != -1){
		specialwhisper('YepoMax',JSON.stringify(scriptInfos));
	}
}

/* ========================================================================================== CUSTOMIZED ALERT AND CONFIRM ========================================================================================== */

// Alert tab

function Kongalert(htmlcode){
	unsafeWindow.holodeck.showAlertTab();
	document.getElementById("alert_tab_pane").innerHTML = htmlcode;
}
unsafeWindow.Kongalert = Kongalert;

// Alert, add-on style

function alertY(atext){
	document.getElementById("overlay").style.display = "block";
	document.getElementById("overlay").style.opacity = "1";
	document.getElementById("overlay").style.background = "rgba(0, 0, 0, 0.5)";
	document.getElementById("overlay").innerHTML += "<div id='alertYepo' style='position:fixed;opacity:1;top:50%;left:50%;max-width:260px;max-height:90px;margin-top:-60px;margin-left:-130px'> \
													<div style='background-color:#a3a3a3;width:260px;height:15px;border-top-left-radius:6px;border-top-right-radius:6px;'> <label style='margin-left:4px'><b>YepoMax's add-on</b></label> <a href='#' style='float:right;color:black;margin-right:4px' onClick='closealert();return false'>CLOSE</a> </div> \
													<div style='background-color:#cccccc;width:240px;height:65px;text-align:center;border-bottom-right-radius:6px;border-bottom-left-radius:6px;padding:10px'><label style='position:absolu;top:50%'>"+atext+"</label></div></div>"
}
unsafeWindow.alertY = alertY;

// Confirm, add-on style

function confirmY(aquestion,globalfuncstr){
	document.getElementById("overlay").style.display = "block";
	document.getElementById("overlay").style.opacity = "1";
	document.getElementById("overlay").style.background = "rgba(0, 0, 0, 0.5)";
	document.getElementById("overlay").innerHTML += "<div id='alertYepo' style='position:fixed;opacity:1;top:50%;left:50%;max-width:260px;max-height:90px;margin-top:-60px;margin-left:-130px'> \
													<div style='background-color:#a3a3a3;width:260px;height:15px;border-top-left-radius:6px;border-top-right-radius:6px;'> <label style='margin-left:4px'><b>YepoMax's add-on</b></label> <a href='#' style='float:right;color:black;margin-right:4px' onClick='closealert();return false'>CLOSE</a> </div> \
													<div style='background-color:#cccccc;width:240px;height:50px;padding:10px'><label id='thequestion' style='position:absolu;top:50%'>"+aquestion+"</label></div> \
													<div style='background-color:#cccccc;width:260px;height:20px;text-align:center;border-bottom-right-radius:6px;border-bottom-left-radius:6px;'><a href='#' onClick='"+globalfuncstr+"();closealert();return false' style='float:left;margin-left:10px;color:black;margin-bottom:2px;'>Yes</a><a href='#' onClick='closealert();return false' style='float:right;margin-right:10px;color:black;margin-bottom:2px;'>NO</a></div></div>";
}
unsafeWindow.confirmY = confirmY;

unsafeWindow.closealert = function(){
	document.getElementById("overlay").style.display = "none";
	var alertwin = document.getElementById("alertYepo");
	alertwin.parentNode.removeChild(alertwin);
}

/* ======================================================================================================================================================================================================================== */

/* TO ANY DEV : === THEME TEMPLATE ===

theme = {
			name: THEME_NAME,
			tab_heads: list_of_strings_OR_string,
			tab_heads_font: list_of_strings_OR_string, // optional
			background: string,
			background_font: string, // optional
			raids: list_of_four_strings, // colors from normal to nightmare
			raids_font: list_of_four_strings_OR_string //optional
		}

*/	

function genBaseThemes(){blackandwhite=[];blueandblue=[];pinkandpink=[];orangeandorange=[];for(var e=0;e<20;e++){blackandwhite.push(["white","black"][e%2]);blueandblue.push(["#0040ff","#0c31f0"][e%2]);pinkandpink.push(["#EE30A7","#8B1C62"][e%2]);orangeandorange.push(["#fa2","#e13f26"][e%2])}var t={1:{name:1,tab_heads:["#b40000","#895c9d","#3a75c4","green","yellow","orange","#cf33e1","#11e7c1","#ffdb66"],background:"#83afcc",raids:["#d5e8c7","#eae9cf","#decaca","#e0d6df"]},2:{name:2,tab_heads:blackandwhite,tab_heads_font:"grey",background:"#a1a1a1",raids:["#bcbcbc","#999","#909090","#898989"]},3:{name:3,tab_heads:blueandblue,tab_heads_font:"grey",background:"linear-gradient(#180099,#020080)",background_font:"grey",raids:["#0084db","#0063e9","#2c44bf","#3156c3"]},4:{name:4,tab_heads:pinkandpink,tab_heads_font:"white",background:"#FF83FA",raids:["#FF00FF","#cb05cb","#ffa2ff","#990099"]},5:{name:5,tab_heads:orangeandorange,background:"http://wallike.com/wp-content/uploads/2013/04/autumn-leaves-wallpaper1-640x426.jpg",background_font:"white",raids:["#fffa4b","#fdf72f","#ffe350","#ffd600"]},"null":{name:null,tab_heads:"silver",tab_heads_font:"black",background:"#ddd",background_font:"rgb(102, 102, 102)",raids:["#d5e8c7","#eae9cf","#decaca","#e0d6df"],raids_font:["black","black","black","black"]}};return t}


function loadHTML(){
/* ---------- HTML PACK ---------- */
/* Super website to get other hexa colors : http://www.color-hex.com you'll find what you need ! *//* And here : the images (base64) : */base64 = {tab1:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA3SURBVEhLY5w1axYDbQATbYwFmTpqNFrYjgbIaIDgz26jKWQ0hYymEJKqpNEsM5plRrPMYMkyAIbyAgrhG5xwAAAAAElFTkSuQmCC",tab2:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA2SURBVEhLY7AqPUYjxEAjc4HGjhqNFrajATIaIPiz22gKGU0hoymEpCppNMuMZpnRLDNYsgwAwv8foJ9m9LUAAAAASUVORK5CYII=",tab3:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA1SURBVEhLY9zCQCvARCuDGRhGjUYL29EAGQ0Q/NltNIWMppDRFEJSlTSaZUazzGiWGSxZBgDJ4gDwfAFqmAAAAABJRU5ErkJggg==",tab4:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA3SURBVEhLY+yMmctAG8BEG2NBpo4ajRa2owEyGiD4s9toChlNIaMphKQqaTTLjGaZ0SwzWLIMAFzRAb7hRyb6AAAAAElFTkSuQmCC",back1:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA3SURBVEhLYzxz5gwDbQATbYwFmTpqNFrYjgbIaIDgz26jKWQ0hYymEJKqpNEsM5plRrPMYMkyAMW8AqArbzNMAAAAAElFTkSuQmCC",back2:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA2SURBVEhLY7AqPUYjxEAjc4HGjhqNFrajATIaIPiz22gKGU0hoymEpCppNMuMZpnRLDNYsgwAwv8foJ9m9LUAAAAASUVORK5CYII=",back3:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA1SURBVEhLY9zCQCvARCuDGRhGjUYL29EAGQ0Q/NltNIWMppDRFEJSlTSaZUazzGiWGSxZBgDJ4gDwfAFqmAAAAABJRU5ErkJggg==",back4:"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA3SURBVEhLY+yMmctAG8BEG2NBpo4ajRa2owEyGiD4s9toChlNIaMphKQqaTTLjGaZ0SwzWLIMAFzRAb7hRyb6AAAAAElFTkSuQmCC",theme1:"iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFBgbuCQnuCAjwFhbnERHtFhboFRXtGRnnHx/mGBjqGBjsGBjwHD/wMg3nMg3oNA/pNBDmNRHoOBTqPhzmOxjrOxjsPRrsPx3rPxzsISHuJCTuKirnKyvtMjLsB1f5B1j5C1n2DVr1D1z1CVj4C1z+EVzzEV30FF7zFWD0E2L/F2T/LHL/MXb/QB/mQB3rQB7uVQ7kWA/pWhHqWxPsXRbrXRXsRCLtRyjkUzTrWDrvdAbidgvifxXpYyTiZCDrZiPsdjrtYEPxfEPvFvI7GPM9Pfg9HvJBF/JgGfJiHfNkIOFAIvJFJvJIKPFKMvNSKvNtBoL/DIH1CoH5CYP9CYT/DIP5DIX/EYP1EIf/For/GYz/Ho7/ErD/F7H/I4z2KI/2IpD/JZL/LJH2KJP/LZb/MJf/Npr/OZz/Pp7/KLf/LLj/Mbr/Or3/VI3/QqD/SKP/QsD/5gUF5ggI6wQE7AQE8gIC8QQE9gEB9w8P+AEB+gUF/QIC/QUF+wkJ+Q0N/gkJ/w0N9RQU9BgY+RER+BUV/hER/xYW+RgY8QQr9gEq9QMs+wEr/AEr/wMt/ww0/xA4/ywC/i4E/zkS3Qx18wRT/wFV/wVY/wxd9AV98gh+/18P/2IUnx7fgx3ohB7qgiPhkjXvoRbmoRvlpB/nrS3trzLugUnymUHwt1PpuFXq9g6C/wGA/gWB+QmB+wyD/AqD/wqE/wyF+hCF/xGI/xaK/x2O7A6i6xOj6hak7xKl8gqk8Qyl/Air9BOp8hmp9his+Bas/RCu/yGQ3Rjd7ArH6RrH6R3H7BrJ8RzN6CDH4jLilv8tl/8wtv8mt/8puP8rvf87/4MH/4cQ/4gR/60L/64M/7Mb/7Me/7Qf/7cn/7gt2f8e2f8h2v8m2/8p2/8s3P8u3f823/8//9YN/9cR/9gW/9gZ/9ke/9kh/9om/946/948//8a//8d//8i//8l//8p//8u//8z//82//87//8+wP9Cwf9Hwv9I/99C4v9T//9B//9F//9J//9NAAAABpDgPwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAScSURBVDhPTdJ7VJN1HAbw11IJ8iAD2gnbHG5gBOaFWykVCIjQnXEzsNJAICoQBsyxsYFscnUouRHWKa0sDrzCuKwQukmoGXqwnEm6xR1Zsfcd6oxx6fT9ve924Dk7++tznuf7bi92MD0zOzv7CciH3/zY3t5+4kRhbm5uXh585eZev261zs3NvQjBDqZn5OTkIPjMt3YoyEdQkJtHklbr4uJ/FHw/LSMzMxPcV893/dTS0gKNAkE+qoMvs9lqXVhYtEOY/iA8PPyzrq7W1lY0bYe/o8b5+QUKvnsgA8GdO7/+5MIFClZU5NMRUPD+PcsrECwr6wCCYWFhP1+8CLC5ubmicAlaLDMzyFEwPT39aYBhly/jOK5SqQR2eJwkLRaSfHkZfGT79lOn7LCqyCYB/jNPki+hYFn7U9PS0tzc3M6cuXQJdlWqqkqhEG0X5CO48O8sDd/bZ4Nffn7uXE9Pg1pVWSksLCgAKLhFkn8vzM5GoWBvpqRu2uTgEBoa+kVPT093t6qqulIoEokKILeMRssSTN6XmprqEBwc/Gk3igoawdnh/WVwv5+f38MInj6taWgAWI0ahZA/jcZ78w8eRKJge5NToNEONR/BzyMUienGAqPx7ujoKH3j3jeSU1JSVjGZzBeeO69pg6dWoWVKHjcaZywjI7bGPRDHVUFBQYHbzrdpEKyuQZVABwdh+9o1BCOw1xOf8vV1dAyEBAR1dACsBoiuFAlvDk4Z746MREAisfh4BJ1c3V1d/f37+vpUqpoaMVUoEv1x8w4xMzyMYASWiOLk5O7q7s7w7zurVqnFdKDxtztT5MzQEA3j4ry8HnJycoUEBDQ3wZ/YjJhELJGIJgCSf0EQjIesWL0awcAAvKkZpyA4qDxGECRBGJYgtpKCj/2AN8GLhqMjYVpSdAwkZBlczWS4MlyYv+Df47gaPwqNKEVjYwRhgnEDfSOHg63cwnBmMJioDlcfpQ4EJxkbI8cJvW06LpHD4azwWMtgrH0cP4trcLVGIhbLIKjRPD59W297aj7ARz0gzszvNBpo1MAyMJmkGBonTHpDRCSaTohbz+Gsp+CWHeA09UqJhGqUFd3Q3Rib1uuRA5jA43F46yDOm3e0QeqVStRYIisuQXDitg3G8XkQBBmbOzpoqJSUQKTFOp1ufBwad0MwPt/L05OHphm/dnbaoEyhUMhkUqlON2bQX42iYEICOB8o9HAJ0WoRrFUqoU9WUiaVEkPjesPVqGgIgrwNXDTtEtKprYfANEBFiVRaQgxNGwwD/TExMdEwzeXScCs0arW9AGsV4ACWnjxpGhgY6I+O3h2DxSZ4crk+PhtZrG0hveB6USWcqCgrOzQxMTE9PT1wBRpjMP4Grqenj4/vOtbWkF6UejhScURxRC4/NDk5aTKZiCv9MI7xvbnQyII0NlKwt762FlyZXC4vrfuYIEli12sQLNbbe+Oat5ZBLYKA4FNaNwWvjoGGfO+kJIBsFovdCCeipwFYLi8vpyG8ZTRM8o5NWvM2m8VmP0vfSEHYlZfT0Dz0Kj39ZFLSnnfYkJAlWE7l8OE6o9lsHqbg/14hEkFM0ojgAAAAAElFTkSuQmCC",theme2:"iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAACAgIEBAQGBgYICAgKCgoPDw8QEBAUFBQWFhYYGBgcHBwgICAh4eHiIiIn5+fp6enq6urr6+vsLCwt7e3v7+/xcXFx8fHy8vLz8/P19fX39/f4eHh5OTk5eXl5+fn7+/v9vb29/f3+Pj4+fn5+vr6+/v7/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwq6VIAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAQFJREFUOE+lVdkSgjAMbBGsCAiieOGBF2r+/wNVUKRt0smMfe1mu9lsQIj/T3CC33HQyTUcWcAEzixGBXUPB+TT3qEPAxqYQ78VGhjBhcWoOdNU4BrlRqcjgSlcTSTKGMKdxehXFgzVKJcIDmsmRh7GGBXGhwC9ElaspzNAJVoax8aIO3LDx2ENs7woyuZ+4YjZtrsr9ztNqs4op9UkDpUKhIjh4QAK4X0qQ9ashVB6asn0BPa00fQM2q6dGt+F3pqZnrnRMLUKKTM9CdxYoYhQPjtmIzyNFtA2+luo+4gYjQL9khBojPBltLX3WHBlYX6YiOBmDr5+1wm1LS0v/9/xBGqAgCRHwJo3AAAAAElFTkSuQmCC",theme3:"iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHrSURBVFhHpVjBcQIxELs0QA+0kJ7TJsMxZmydViuZMMODcLbllbRayPFz+xuv++/jfM0/d96M9XKXPA1XHgjsL7F/LVop77eAa4nj1vOUrjIq2tCAEAI4VlZvg1t23p83YOB434nqV3bws+gXsOQTGa4ckHeMvzr+gsbG27ViLwEdxa6OAv+7zUgjVzFi4DZTmW/fSdL5ZheYWrzT2HiKmvOoJvK9u9nZJtFGDe+KYxeRtCSYFF7Sfmmn2VEEj2R08YSyVSTZh6ti72SCJ8dhDKCKMgYQ6NJOJgdmxXSilNxYjKmekxEBaL/HQJl2HLNcbZTuKjAqYCXSeno6fWSTztIeO2c1+rY2FQZLDHbU8T2duv2+F6vjKnZ3Qo7M2M3Y4hJGNkum2hTRtR+pK2+TK5YeqT73KVRv337nmtesGWTIl/TIq2tzdVJ9VJY3Zta4S4n6eYeUzRWTiGYUTggfIzUAsrmqohTFo1DpiTrK1pCQTtnUMlqBFuCxlyEhmZQDcTMpTYiurz6SQB/OyDCxWhudjrpojMz4nfS0ch7F0j9haFs8pZuAZqN2daXdqFWd4SfxeMrm6gCiZh1811ErMn1CyacmFCvJ9EkOkB3evBCy97b+IyC9Fh1nFpyPQsXfnO5paF0dRfoyvJ5tojenussBqwAAAABJRU5ErkJggg==",theme4:"iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABpSURBVFhH7ZXLCQAgDEMzgcM5UVd0AkfRTlBojvog1xAI+egobITChmzVJNqqSUS45TxWd+JGuAhXOajUiTpV98WAfDAga0wbW9uGbNUk2qpJRLjlPFZ3Qk64CFc5qNSJOlWnyYC8PyAXbb18WXGhRdMAAAAASUVORK5CYII=",theme5:"iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURX8zAH8zAX80AYAzAYA0AYA0AoE1A4A2AoA2A4E1BIE2BIE3BYI3BoI3B4I4BYI4BoM4B4M5CIM6CIQ6CoU9DIU9DYU+DYY+Doc+D4dAEIhBEolCEYlCE4lDFIpDFYpEFYxHGoxIGo5KG41KHY5MH49MIJBOIpFPJJJQJJFQJZNTJ5NTKJRTKZZXLJZXLZZYLZZYLpdZMJdaMZlcMptfNptfOJtgOJ1jPJ5lPp9lP55mP6BoQaFqRKFqRaNsRqJsR6NtSKZyTqdzT6hyT6dzUKl2U6p3Va19W/8yCv9qAK+AYP/YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGM7t1AAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAABUUlEQVQ4T43T2VrCMBAF4NMliqCyqRUVEZUq4r7hjrstff/3cVL4SpNmIdd/z2QyUyTS+SkD23HxQHJd4EjB4liCLupKJsFD+H2NExJXUNExIZEh0LtcInBrcBl8c2FiWekxY2Y3TfxAzeIm8A9lm5tAWO5HKQccVlxz3msTdJJkFZ8GGNKSeNX3CMkANzr32KCkxfuIH4wxULrfvRKpzRSlEBsKNwoJ1a8zxaFfdGukWsO84vBBgnR31J8kxaHojol1ikqCnsffq6d0+USe5u+rmVi6liZiPVRhecqXO0upRvtM5Mp1+OoHPscOPCd7cMOYT7sMmAfGLz5254Ft4G42a31phmquH+1unwDnwlJoEgMhrjjr6WfPLOvW2MyWUyoMR3VHF03rmlHp79kjG5vpoGXdR97JAi6s+0hsCIw0Cyk000NDt7fCP7OMK62L/gEBRpvETJDXtAAAAABJRU5ErkJggg==",theme6:"iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAABppJREFUWEftltlTU2cYxkUDREBZJ0FUFiEsEglL2EEghLCEQFgSBQShiCKKAhqtEhFcAwdKW9urtuOtTP+BMl5zwXDBtffeAoNlmDADvH3eCPRwJChu05mamd/kO+e8z/M++c75vpN9+759/u8zcOZsoweQAW8gl8Dn+JrHV5sni/WM3GI9G9fa1l515Wq3cL2nb7Lvhm0WvNpgtqf3xmT3tR6h7bt2E2pVrPmiAWvrLJqW82327+/cnX7qGF75YfxHGhsbJ2F0jBzDI2CYHj95SoNDD+luv51sttvLYOpCx0V7veWM5rOHM9fU+phr6lqvXe+Z/unnZ85nv/xKA/cHqevKVUJQslrPUk1t/Rb19VZqaGii9vYOutTZRZhB56XOy9PswV6fHNBYWeVRVV2jRBOH3T4w99vvf6xjBqih8ZwrBK69l2pzLdXVW7h+HfVzVVVmR6WpWsHeHx0QYkVDY9Of9weHSBDGqLGpmYxG06eyUmE0vagwVio+KpihtNwHv9SBW7Zyb+A+8e0pLzduUfZ27AQz5RWVExUVlc8ZHrvOvb22k4agXSktK3dwjz2H05eUttpst+YGhx5QtbmGDKVlUl6WllXUATUIRbMghscb5yzQzO+gc/mUGMrmuMeeghXpijUtLa3TDsfwOqacdMUlm6xj/LpYX2LTlxiUaLDjc1JYqPOrrKwaxXay1nSuWayXek1zrw8Kl3+6QA5T+717A856i5UKCovEvC4s0rUX6fSe7sygV1RVm4U7d/uXHj1+QsZKk9RDfOwsKCiyc8/3hsvLO60639o21XHxEiEE5eWf3gIGNgR1Gyo3Nz/IZKoeQaiFhw8fEc+2WO9mPMU9dw2WlZ3jodPpTS3nW5ex31BObp6L7Jxc/n6JxsrdDHB7x2/dur049OCBa6ayc126TdYwns9567XlC+9lYOLebr0zMrNk5RVGoR77DkJQZmb2Jk6M69yJtdoMf8yugMWyeh8br8FQJtbyeCkzK3sU3xbAXtuuo6/Avd0GS9OmexcX6yf512IsZgbH6p2EqalpCr3eIPT29r0ZwLaChSHVLmjTM4T09Aw/9gDsJa2Z5N5ug6WkpMrTMzJns7NzCGMxEympaaFSoSY5xR+rSujt65vHaqGCgkKpbhG6kdQ0rWszZQ/4Tki8WTPLvd0GS0rSyMErQBKe4zhIKszKyha6u6/93d/fTwgo1awmaZLHk5NTtnTsAdhLWss93QdLTFTLwStAEp7jeKtBfMLJIDwT41e7r61+f+cO8QxL6t8kqk8J0h/CHoC9pPXc032w+PgEOZgFJGEiLi7edStjY+MUWFkjXV1XFrECCQtCWjufkHBSAP7SYOyh0SRPcDCJP/d0H0wVG+sN/gIkJkYVOwPU0TEqPzyDwuXLXQs3b9oI42110LxRxcYJCLDjC5o9dLriGTxzUt0k93b7jJ2IjpYB4cSJaJLgxLHl1Kmk0QsXOpb6+m5QBkJFR8eI61ZxLMSoVO/MFDeMjIzyiIlR1emKi51arMpt/twTvd0GY3FEZKQpIiJyGZCY8IiIebPZvNbT00O4HbgWIb6+CO34bpsvriuxWF4a8TaIi4+n8H/9l7kn99519z927LgKTAGSwrv2ycRE6fmF48fDR46Hh7+zajcbhYUd9cQM2UymKteWIvHlXru/ktjo6NFj8iNhYXbgBPQeltBUgMbtn77Q0COeoF2n0722Wq2EmRF7cg8793zvS5wLlMpQjUKhnAbrgNywplAqR0OPHPHbyTQ4OMQDOmV4eLitpMTwurOzc52fK5EXe09zrw8KtVkUEhLSGhwcPAdIilKppKioqHk0twQGBqpBKAjagMfqsLCwOjzkL6urzdTc3OKaKYnPHPfYUyguDgoK8kEvR0BA4AogMfiVpFarKSMz05mbmzuTkpIygWfvOZOm1U7o9fqZ2tpaJ986vHsJt2qbnj3Zm3vsORgLDvv7Kw4fPvwCrAASg1nBdhHtWgx5+fn4q2yg0tJS/J8vJz1e5Fqt1rVyAwICtuk2vF6w90eFYtGhQ4c8/Pz8FL6+vg4fH985sA5IjK+vHxr7k79/gCsEf/MPkNZtaOfYiz3Z+6ODbQoPHvTxkcvlrWDa29vbCWiPOFnLHuz1yYGkBl5eXhpPLy+7zNNzCizLZJ60K1yDWtaw9rMHEhvKZDL5AZlMdeCAzLR//34BTILZDV5tfPM5gWu4ljVfNJTYHI098JEBbyCXwOdkXPPVAn1r9F+dgX8AWSjXXSVk8HEAAAAASUVORK5CYII="};/* Theme 6 is no theme */style = '<style type="text/css"><!--.chat_AP{width:40px;height:16px;text-align:center;border-radius:3px;}.Yepo_message .chat_message_window_username{color:#0092d4 !important}.Yepo_special .chat_message_window_username{color:#ec5e00 !important}.yourself_m .chat_message_window_username{color:#900000 !important}.normalinput{width:280px !important;}.largeinput{width:417px !important;}.onglet{display:inline-block;font-size: 14px;text-align: center;width: 75px;height:15px;padding:5px;}.ft{color: #5e5e5e;border: 2px #adadad solid;border-radius:0px;border-top-left-radius:15px;border-top-right-radius:15px;background-color:#e9e9e9;box-shadow:#b9c4ff 2px 0px 5px;}.fb{color: #5e5e5e;border: 2px #adadad solid;border-radius:0px;background-color:#e9e9e9;box-shadow:#b9c4ff 2px 0px 5px;}.ft:hover{color: #000;border: 2px #adadad solid;border-radius:0px;border-top-left-radius:15px;border-top-right-radius:15px;background-color:#ececec;}.fb:hover{color: #000;border: 2px #adadad solid;border-radius:0px;background-color:#ececec;}.ft:active{color: #000;border: 2px #adadad solid;border-radius:15px;background-color:#d2d2d2;}.fb:active{color: #000;border: 2px #adadad solid;border-radius:15px;background-color:#d2d2d2;}.oo{font-weight: bold;font-size: 12px;height:14px;color: #000;border: 2px #adadad solid;border-radius:15px;margin-top:-1px;background-color:#d2d2d2;box-shadow:#b9c4ff 2px 2px 5px;}.contenu{border: 2px #adadad solid;width:261px;height:525px;box-shadow:#b9c4ff 2px 2px 5px;padding:5px;margin-top:-2px;}.oc{display:block;}.fc{display:none;}.tout{margin:auto;padding:-5px;width:285px;height:555px;}.ybut {-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;box-shadow:inset 0px 1px 0px 0px #ffffff;background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) );background:-moz-linear-gradient( center top, #ededed 5%, #dfdfdf 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed", endColorstr="#dfdfdf");background-color:#ededed;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:1px solid #dcdcdc;display:inline-block;color:#777777;font-family:arial;font-size:10px;font-weight:bold;padding:6px 24px;text-decoration:none;text-shadow:1px 1px 0px #ffffff;}.ybut:hover {background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #dfdfdf), color-stop(1, #ededed) );background:-moz-linear-gradient( center top, #dfdfdf 5%, #ededed 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#dfdfdf", endColorstr="#ededed");background-color:#dfdfdf;}.ybut:active {position:relative;top:1px;}.ytext {-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;box-shadow:inset 0px 1px 0px 0px #ffffff;background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) );background:-moz-linear-gradient( center top, #ededed 5%, #dfdfdf 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed", endColorstr="#dfdfdf");background-color:#ededed;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:1px solid #dcdcdc;display:inline-block;color:#777777;font-family:arial;font-size:10px;font-weight:bold;padding:6px 24px;text-decoration:none;text-shadow:1px 1px 0px #ffffff;}.scheckbox{width:19px;height:25px;padding:2px 11px 3px 8px;background:url("http://www.hostingpics.net/thumbs/87/74/09/mini_877409greycheckbox.png") no-repeat transparent;}.scheckbox:hover {background-position: 0px -25px;}.scheckboxsel{width:19px;height:25px;padding:2px 11px 3px 8px;background:url("http://www.hostingpics.net/thumbs/87/74/09/mini_877409greycheckbox.png") no-repeat transparent;background-position: 0px -50px;}.scheckboxsel:hover {background-position: 0px -75px;}.sradio{width:19px;height:25px;padding:2px 11px 3px 8px;background:url("http://dotdtools.clanteam.com/images/greyradio.png") no-repeat transparent;}.sradio:hover {background-position: 0px -25px;}.sradiosel{width:19px;height:25px;padding:2px 11px 3px 8px;background:url("http://dotdtools.clanteam.com/images/greyradio.png") no-repeat transparent;background-position: 0px -50px;}.sradiosel:hover {background-position: 0px -75px;}.RCC_theme{ cursor: pointer; }.RCC_theme:hover{border: red solid 2px; margin: -2px;}--></style>';/* Last opened tools and loading friend list or not */if(user_options["loadfriends"]=="scheckbox"){flisl = "<label><u>Kongregate friends :</u><br><br> Your list is <b>not</b> loading.<br>If you want the list to load at startup, check the option in option tab.<br><br>Click refresh icon to load your list.</label>"}else{flisl = "<label><u>Kongregate friends :</u><br><br> Your list is loading ... </label>"}/* TNC Calculator */LEONTNL = '<iframe id="TNLframe" src="http://leon-dotd.clanteam.com/pages/tnl_mini.htm" onerror="this.src=\'http://leon.dx.am/pages/tnl_mini.htm\'" style="height: 475px; width: 263px;overflow-x: hidden;"></iframe>';/* Private raids manager */if(window.location.href.indexOf("kongregate")!=-1){PRM = '<i><label style="color:grey;font-size:10px;margin:3px 0px">The easiest way to share raids to your friends !<br>Set a friend list (max. 20 friends) to begin the experience.<br>Click the name to remove from friend list.</label></i><br><br><div align="center"><table><tr><td style="border-top-left-radius:6px 6px;height:140px;width:120px;border: solid #c0d6e4 1px;overflow:auto;max-height:120px"><div id="friendlist" style="height:140px;width:120px;overflow-y:scroll;overflow-x:hidden;max-height:140px"><label><u>Friend List :</u></label></div></td><td align="center" valign="middle" style="border-top-right-radius:6px 6px;border: solid #c0d6e4 1px;width:110px;"><label><u>Add friend to list :</u></label><br><br><form action="javascript:RaidCatcher.friends.add(document.getElementById(\'newfriend\'))"><input type="text" id="newfriend" size=10><br><input type="button" class="ybut" value="ADD" style="margin:20px 20px" onClick="RaidCatcher.friends.add(document.getElementById(\'newfriend\'))"></form></td></tr><tr><td colspan=2 align="center" style="border-bottom-left-radius:35px 25px;border-bottom-right-radius:35px 25px;border: solid #c0d6e4 1px"><form action="javascript:RaidCatcher.sharePR(document.getElementById(\'raidurl\'))"><input type="text" id="raidurl" size=25 style="margin:5px 0px" placeholder="Insert your raid url here"><br><input type="button" class="ybut" style="margin:2px 0px" value="SHARE" onClick="RaidCatcher.sharePR(document.getElementById(\'raidurl\'))"></form></td></tr></table></div>';}else{PRM = '<label> Sorry, this tab is only avaible on <a href="http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons" target="_blank">Kongregate.com</a> </label>';}guildshare = '<br><h6> Nothing here atm, sorry =s </h6>';/* RaidCatcher Customizer : */YepoRCC = '<h4> RaidCatcher Customizer </h4><label style="float:right;color: #898989; font-size: 8pt;margin-top:-14px;">version '+scriptInfos.RCCversion+' </label><br><table id="RCCUST"><tr><th colspan=6 style="padding-bottom:16px;"><u>Edit Theme</u></th></tr><tr><td colspan=3><u>Theme Name</u></td><td colspan=2><input size=8 id="themeName_RCC" onchange="RaidCatcher.customize.rename(this.value);" /></td><td></td></tr><tr><td colspan=3> <u>Background : </u> </td><td colspan=2 valign="middle"> <input type="text" id="bgcolorinput" size=8 onchange="RaidCatcher.customize.updateColorSample(this);RaidCatcher.customize.changeBackgroundColor(this.value, document.getElementById(\'bgfontinput\').value);"/> </td><td align="center" valign="middle"> <div id="bgcolorinputSAMPLE" style="width:20px;height:20px;"> </div> </td></tr><tr><td colspan=3> <u>Background Font :</u> </td><td colspan=2 valign="middle"> <input type="text" id="bgfontinput" size=8 onchange="RaidCatcher.customize.updateColorSample(this);RaidCatcher.customize.changeBackgroundColor(document.getElementById(\'bgcolorinput\').value, this.value);"/> </td><td align="center" valign="middle"> <div id="bgfontinputSAMPLE" style="width:20px;height:20px;"> </div> </td></tr><tr></tr><td colspan=3><u>Tabs :</u><select style="float:right;" id="selectedTab_RCC" onclick="RaidCatcher.customize.adjustTabCount()" onchange="typeof(RaidCatcher.customize.theme.tab_heads) == \'string\'?document.getElementById(\'tabscolor\').value = RaidCatcher.customize.theme.tab_heads:document.getElementById(\'tabscolor\').value = RaidCatcher.customize.theme.tab_heads[this.selectedIndex];RaidCatcher.customize.updateColorSample(document.getElementById(\'tabscolor\'));"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></td><td colspan=2><input type="text" size=8 id="tabscolor" onchange="RaidCatcher.customize.updateColorSample(this);RaidCatcher.customize.setTabColor(this); RaidCatcher.customize.changeTabsHeadsColors(RaidCatcher.customize.theme.tab_heads, RaidCatcher.customize.theme.tab_heads_font);"/></td><td align="center"><div id="tabscolorSAMPLE" style="width: 20px; height: 20px;"></div></td></tr><tr><td colspan=3><u>Tabs Font :</u><select style="float:right;" id="selectedTabFont_RCC" onclick="RaidCatcher.customize.adjustTabCount()" onchange="typeof(RaidCatcher.customize.theme.tab_heads_font) == \'string\'?document.getElementById(\'tabsfont\').value = RaidCatcher.customize.theme.tab_heads_font:document.getElementById(\'tabsfont\').value = RaidCatcher.customize.theme.tab_heads_font[this.selectedIndex];RaidCatcher.customize.updateColorSample(document.getElementById(\'tabsfont\'));"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></td><td colspan=2><input type="text" size=8 id="tabsfont" onchange="RaidCatcher.customize.updateColorSample(this);RaidCatcher.customize.setTabFont(this);RaidCatcher.customize.changeTabsHeadsColors(RaidCatcher.customize.theme.tab_heads, RaidCatcher.customize.theme.tab_heads_font);"/></td><td align="center"><div id="tabsfontSAMPLE" style="width: 20px; height: 20px;"></div></td></tr><tr><td colspan=3> <u>Raids :</u> <select id="selectedDiffRaid_RCC" style="float:right;" onchange="document.getElementById(\'raidcolor\').value = RaidCatcher.customize.theme.raids[this.selectedIndex];RaidCatcher.customize.updateColorSample(document.getElementById(\'raidcolor\'));"><option>N</option><option>H</option><option>L</option><option>NM</option></select> </td> <td colspan=2> <input type="text" onchange="RaidCatcher.customize.updateColorSample(this);RaidCatcher.customize.theme.raids[document.getElementById(\'selectedDiffRaid_RCC\').selectedIndex] = this.value; RaidCatcher.customize.changeRaidsColors(RaidCatcher.customize.theme.raids, RaidCatcher.customize.theme.raids_font);" id="raidcolor" size=8/> </td> <td align="center"> <div id="raidcolorSAMPLE" style="width:20px;height:20px;"></div> </td></tr><tr><td colspan=3> <u>Raids Font :</u> <select id="selectedDiffRaidFont_RCC" style="float:right;" onchange="document.getElementById(\'raidfont\').value = RaidCatcher.customize.theme.raids_font[this.selectedIndex];RaidCatcher.customize.updateColorSample(document.getElementById(\'raidfont\'));"><option>N</option><option>H</option><option>L</option><option>NM</option></select> </td> <td colspan=2> <input type="text" onchange="RaidCatcher.customize.updateColorSample(this);RaidCatcher.customize.theme.raids_font[document.getElementById(\'selectedDiffRaidFont_RCC\').selectedIndex] = this.value; RaidCatcher.customize.changeRaidsColors(RaidCatcher.customize.theme.raids, RaidCatcher.customize.theme.raids_font);" id="raidfont" size=8/> </td> <td align="center"> <div id="raidfontSAMPLE" style="width:20px;height:20px;"></div> </td></tr><tr><td colspan=3 align="center"><input type="button" value="SAVE THEME" onclick="RaidCatcher.customize.saveTheme( RaidCatcher.customize.theme );" class="ybut"/></td><td colspan=3 align="center"><input type="button" value="DELETE THEME" onclick="RaidCatcher.customize.deleteTheme( RaidCatcher.customize.theme.name );" class="ybut"/></td></tr><tr><th colspan=6 style="padding-bottom:16px;padding-top:16px;"> <u>Default Themes</u> </th></tr><tr><td><img class="RCC_theme" onClick="RaidCatcher.customize.loadTheme(1)" src="data:image/png;base64,'+base64.theme1+'" /><td><img class="RCC_theme" onClick="RaidCatcher.customize.loadTheme(2)" src="data:image/png;base64,'+base64.theme2+'" /></td><td><img class="RCC_theme" onClick="RaidCatcher.customize.loadTheme(3)" src="data:image/png;base64,'+base64.theme3+'" /></td><td><img class="RCC_theme" onClick="RaidCatcher.customize.loadTheme(4)" src="data:image/png;base64,'+base64.theme4+'" /></td><td><img class="RCC_theme" onClick="RaidCatcher.customize.loadTheme(5)" src="data:image/png;base64,'+base64.theme5+'" /></td><td><img class="RCC_theme" onClick="RaidCatcher.customize.loadTheme(\'null\')" src="data:image/png;base64,'+base64.theme6+'" /></td></tr><tr><th colspan=6 style="padding-bottom:16px;padding-top:16px;"><u> Your Themes </u></th></tr></table>';chatcolors = user_options["thechatcolors"];/* Friends Manager */if(window.location.href.indexOf("kongregate")!=-1){friendmanager = '<h4> Friend Manager </h4><table style="margin-top:12px"><tr><td><input class="ytext" type="text" size=18 id="akongname" placeholder="Insert name here"></td><td><input type="button" class="ybut" style="margin-left:2px" value="Add friend" onClick="RaidCatcher.friends.addKong(document.getElementById(\'akongname\'));"></td></tr><tr><td><input type="button" class="ybut" style="margin:4px 0px" value="Add all room as friend" onClick="RaidCatcher.friends.addRoom()"></td><td><input style="margin-top:4px;margin-left:2px" type="button" class="ybut" value="Magic Friends" onClick="RaidCatcher.friends.addalot()"></td></tr></table><table style="padding-top:10px;padding-left:2px"><tr><td rowspan=5><div id="kongflist" style="height:140px;width:180px;overflow-y:scroll;overflow-x:hidden;max-height:140px;border:solid 1px #8F8F8F">'+flisl+'</div></td><td style="height:27px;padding-left:5px"><input type="text" placeholder="Search" size=6 onkeyup="RaidCatcher.friends.search(this)" class="ytext"></td></tr><tr><td style="height:27px;padding-left:5px"><input onClick="var thelist = prompt(\'The json format list of friend you want to delete in the input below.\\nOutput from this website : http://pictures-gallery.comeze.com/DotD/DotDfriends.php is json format.\\nNote : The list below is your full friend list. If you see no name, please press the refresh button on Friends tab.\',JSON.stringify(RaidCatcher.friends.konglist));RaidCatcher.friends.removeKongs(JSON.parse(thelist));" type="button" class="ybut" value="-- Delete --"></td></tr><tr><td style="height:27px;padding-left:5px"><input onClick="RaidCatcher.friends.removeAllKong()" type="button" class="ybut" value="Delete All"></td></tr><tr><td style="height:27px;padding-left:5px"><input type="button" class="ybut" value="IGN" onClick="RaidCatcher.friends.IGNmanage()" style="padding:3px 17px"></td></tr><tr><td style="padding-left:5px"><img style="margin-top:6px;" onClick="document.getElementById(\'kongflist\').innerHTML = \'<label><u>Kongregate friends :</u><br><br> Refreshing ... </label>\';RaidCatcher.friends.updateKonglist()" src="http://dotdtools.clanteam.com/images/mini-refresh.png" onerror="this.src = \'http://img4.hostingpics.net/pics/915813minirefresh.png\'" /></td></tr><tr><td colspan=2 style="height:14px"><div id="igndisp" style="display:none;background-color:rgba(0,0,0,0.15);height:12px;width:180px;padding:1px"></div></td></tr><tr><td colspan=2 style="padding-top:8px;"><span class="scheckbox" id="tocolor" onClick="RaidCatcher.selcs(\'tocolor\');RaidCatcher.ui.showCustomColors(this.className);RaidCatcher.actopts();"></span> Color names in chat </td></tr><tr class="colsel_un_h"><td colspan=2 style="padding-top:16px;"><label><b>You :</b></label> </td></tr><tr class="colsel_un_h"><td colspan=2 style="padding-top:6px;">Preset colors : <select id="select_y_color" name="your_color" onchange="document.getElementById(\'hexcol_you\').value = this.value;RaidCatcher.friends.changecolor([document.getElementById(\'hexcol\').value,document.getElementById(\'hexcol_you\').value])"><option selected disabled>Pick yours</option><option value="#900000">Default</option><option value="#6e3c99">Purple</option><option value="#48ba25">Green</option><option value="#FF00CC">Pink</option><option value="#111111">Black</option></select></td></tr><tr class="colsel_un_h"><td colspan=2 style="padding:2px 0px"><nobr>Or use a <a href="http://www.color-hex.com/" target="_blank">hex code</a> : <input type="text" value="'+chatcolors[1]+'" id="hexcol_you" maxlength="7" size="8"> <input type="button" class="ybut" onClick="RaidCatcher.friends.changecolor([document.getElementById(\'hexcol\').value,document.getElementById(\'hexcol_you\').value]);" value="SET"></nobr></td></tr><tr class="colsel_un_h"><td colspan=2 style="padding-top:8px;"><label><b>Friends :</b></label></td></tr><tr class="colsel_un_h"><td colspan=2 style="padding-top:6px;">Preset colors : <select id="select_f_color" name="friends_color" onchange="document.getElementById(\'hexcol\').value = this.value;RaidCatcher.friends.changecolor([document.getElementById(\'hexcol\').value,document.getElementById(\'hexcol_you\').value])"><option selected disabled>Choose one</option><option value="#6e3c99">Purple</option><option value="#48ba25">Green</option><option value="#e10000">Red</option><option value="#FF00CC">Pink</option><option value="#111111">Black</option></select></td></tr><tr class="colsel_un_h"><td colspan=2 style="padding:2px 0px">Or use a <a href="http://www.color-hex.com/" target="_blank">hex code</a> : <input type="text" value="'+chatcolors[0]+'" id="hexcol" maxlength="7" size="8"> <input type="button" class="ybut" onClick="RaidCatcher.friends.changecolor([document.getElementById(\'hexcol\').value,document.getElementById(\'hexcol_you\').value]);" value="SET"></td></tr></table>';}else{friendmanager = '<label> Sorry, this tab is only avaible on <a href="http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons" target="_blank">Kongregate.com</a> </label>';}/* Yeah more to come ;)friendtab = '<p id="ongfm" class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.switcht(\'FManage\', this, \'tocome\',\'ongmtc\')"> <a> Friend Manager </a> </p><div id="FManage" style="display:block">'+friendmanager+'</div><p id="ongmtc" class="panel_handle spritegame mts closed_link" style="text-align:left" onclick="RaidCatcher.ui.switcht(\'tocome\', this, \'FManage\', \'ongfm\')"> <a> More </a> </p><div id="tocome" style="display:none">More coming soon ...</div>';*/landcalc = '<i><label style="color:grey;font-size:10px;margin:3px 0px"> Each time you buy a land, price grow up. Always buy 10 lands at once to have them at the lowest price. </label></i><br><br><div align="center"><table style="border:3px solid #c0c0c0;border-radius: 5px 5px 25px 25px;background-color:grey;"><tr><td><table style="border:3px solid #c0c0c0;border-radius: 5px;background-color:white;"><tr><td colspan=3 style="border-bottom:2px solid #c0c0c0;"><B> Set up your land calculator </B></td></tr><tr><td class="landline"> Cornfield </td><td> <input class="landline" type="text" id="Cor" size=4 value="0" onkeyup="RaidCatcher.lands.show()"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Cor\').value = parseInt(document.getElementById(\'Cor\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Stable </td><td> <input class="landline" type="text" id="Sta" size=4 value="0" onkeyup="RaidCatcher.lands.show()"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Sta\').value = parseInt(document.getElementById(\'Sta\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Barn </td><td> <input class="landline" type="text" id="Bar" size=4 value="0" onkeyup="RaidCatcher.lands.show()"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Bar\').value = parseInt(document.getElementById(\'Bar\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Store </td><td> <input class="landline" type="text" id="Sto" size=4 value="0" onkeyup="RaidCatcher.lands.show()"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Sto\').value = parseInt(document.getElementById(\'Sto\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Pub </td><td> <input class="landline" type="text" id="Pub" size=4 value="0" onkeyup="RaidCatcher.lands.show()"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Pub\').value = parseInt(document.getElementById(\'Pub\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Inn </td><td> <input class="landline" type="text" id="Inn" size=4 value="0" onkeyup="RaidCatcher.lands.show()"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Inn\').value = parseInt(document.getElementById(\'Inn\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Sentry Tower </td><td> <input class="landline" id="Sen" type="text" size=4 onkeyup="RaidCatcher.lands.show()" value="0"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Sen\').value = parseInt(document.getElementById(\'Sen\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Fort </td><td> <input class="landline" type="text" id="For" onkeyup="RaidCatcher.lands.show()" size=4 value="0"> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'For\').value = parseInt(document.getElementById(\'For\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr><tr><td class="landline"> Castle </td><td> <input class="landline" type="text" id="Cas" onkeyup="RaidCatcher.lands.show()" value="0" size=4> </td><td> <input class="landline" type="button" onClick="document.getElementById(\'Cas\').value = parseInt(document.getElementById(\'Cas\').value) + 10;RaidCatcher.lands.show()" value="+10"> </td></tr></table></td></tr><tr><td align="center" style="padding-top:4px;"><div id="your_income"> <label><b>Your income : 0/hr</b></label> </td></tr></table></div>';links = '<h4> Useful links </h4><iframe style="display:inline;height: 510px; width: 263px;overflow-x: hidden;" src="http://leon-dotd.clanteam.com/pages/links_mini.htm" onerror="this.src = \'http://leon.dx.am/pages/links_mini.htm\'"></iframe>';calculators = '<p class="panel_handle spritegame mts opened_link" style="text-align:left" id="onctnl" onclick="RaidCatcher.ui.switcht(\'TNLCalc\', this,\'LandCalc\', \'onclnd\')"> <a> To Next Level Estimator </a> </p><div id="TNLCalc" style="display:block">'+LEONTNL+'</div><p id="onclnd" class="panel_handle spritegame mts closed_link" style="text-align:left" onclick="RaidCatcher.ui.switcht(\'LandCalc\', this, \'TNLCalc\', \'onctnl\')"> <a> Land Calculator </a> </p><div id="LandCalc" style="display:none">'+landcalc+'</div>';sharing = '<p id="oncprm" class="panel_handle spritegame mts opened_link" style="text-align:left" onclick="RaidCatcher.ui.switcht(\'PRManage\', this, \'Guildm\',\'oncgs\')"> <a> Private Raids Manager </a> </p><div id="PRManage" style="display:block">'+PRM+'</div><p id="oncgs" class="panel_handle spritegame mts closed_link" style="text-align:left" onclick="RaidCatcher.ui.switcht(\'Guildm\', this, \'PRManage\', \'oncprm\')"> <a> NOTHING </a> </p><div id="Guildm" style="display:none">'+guildshare+'</div>';Yoptions = '<h4> Add-on options </h4><span style="float:right;margin-top:-12px;">'+unsafeWindow.active_user.username()+'</span><br><span class="scheckbox" onClick="RaidCatcher.selcs(\'hNt\');RaidCatcher.actopts()" id="hNt"></span> Hide \"News\" tab <br><label style="padding-top:2px;"> Opened sub-tab at start : </label><br>&nbsp&nbsp&nbsp<span type="radio" onClick="RaidCatcher.olr=RaidCatcher.radio(RaidCatcher.olr,this);RaidCatcher.actopts()" class="sradio" name="openedtool" id="disptnl"></span> Calculators <br>&nbsp&nbsp&nbsp<span type="radio" onClick="RaidCatcher.olr=RaidCatcher.radio(RaidCatcher.olr,this);RaidCatcher.actopts()" class="sradio" id="dispprm" name="openedtool"></span> Sharing <br>&nbsp&nbsp&nbsp<span type="radio" onClick="RaidCatcher.olr=RaidCatcher.radio(RaidCatcher.olr,this);RaidCatcher.actopts()" class="sradio" id="disprcc" name="openedtool"></span> RC Customizer <br>&nbsp&nbsp&nbsp<span type="radio" onClick="RaidCatcher.olr=RaidCatcher.radio(RaidCatcher.olr,this);RaidCatcher.actopts()" class="sradio" id="displc" name="openedtool"></span> Links <br>&nbsp&nbsp&nbsp<span type="radio" onClick="RaidCatcher.olr=RaidCatcher.radio(RaidCatcher.olr,this);RaidCatcher.actopts()" class="sradio" id="dispfm" name="openedtool"></span> Friends <br><span class="scheckbox" id="tabfriend" onClick="RaidCatcher.selcs(\'tabfriend\');RaidCatcher.actopts()"></span> Load friend list at startup <br><span class="scheckboxsel" id="Colorraiddiff" onClick="RaidCatcher.selcs(\'Colorraiddiff\');RaidCatcher.colordiff()"></span> Color boss difficulty in raid search <br><span class="scheckbox" id="CyanYepo" onClick="RaidCatcher.selcs(\'CyanYepo\');RaidCatcher.actopts()"></span> Disable YepoMax\'s color <br><span class="scheckbox" id="largechat" onClick="RaidCatcher.selcs(\'largechat\');RaidCatcher.actopts()"></span> Enlarge chat <br><span class="scheckbox" onClick="RaidCatcher.selcs(\'clnk\');RaidCatcher.actopts()" id="clnk"></span> Clean game page <div class="help_icon" onmouseover="RaidCatcher.ui.tooltip.show(RaidCatcher.$(this).get(\'tooltip\'))" onmouseout="RaidCatcher.ui.tooltip.hide" tooltip="Checking this option will delete the useless part of the Kongregate page to play the game. To get them back, uncheck the option and reload the page.)"></div><br><br>Quick Whisper : <input type="text" class="ytext" name="quickWhisper" onchange="RaidCatcher.actopts();" /> <div class="help_icon" tooltip="Type here a valid Kong name that you want to reach by typping \'/qw Your Message\' in chat." onmouseover="RaidCatcher.ui.tooltip.show(RaidCatcher.$(this).get(\'tooltip\'))" onmouseout="RaidCatcher.ui.tooltip.hide"></div>';themestyle = "<div id='themestyle' style='display:none'></div>";YepoTools = style + themestyle + '<div id="friendcolorstyle" style="display:none"><style type="text/css"><!-- .friend_message .chat_message_window_username{color:'+chatcolors[0]+' !important} .yourself_custom .chat_message_window_username{color:'+chatcolors[1]+' !important} --></style></div><br><div class="tout"><div style="margin:0px;"><div onMouseDown="RaidCatcher.addui.pos_prec=RaidCatcher.addui.changer(this,\'t\',RaidCatcher.addui.pos_prec)" id="1" class="onglet oo"><label>Calculators</label></div><div onMouseDown="RaidCatcher.addui.pos_prec=RaidCatcher.addui.changer(this,\'t\',RaidCatcher.addui.pos_prec)" id="2" class="onglet ft"><label>Sharing</label></div><div onMouseDown="RaidCatcher.addui.pos_prec=RaidCatcher.addui.changer(this,\'t\',RaidCatcher.addui.pos_prec)" id="3" class="onglet ft"><label>RC Cust</label></div></div><div style="margin:0px;"><div onMouseDown="RaidCatcher.addui.pos_prec=RaidCatcher.addui.changer(this,\'b\',RaidCatcher.addui.pos_prec)" id="4" class="onglet fb"><label>Links</label></div><div onMouseDown="RaidCatcher.addui.pos_prec=RaidCatcher.addui.changer(this,\'b\',RaidCatcher.addui.pos_prec)" id="5" class="onglet fb"><label>Friends</label></div><div onMouseDown="RaidCatcher.addui.pos_prec=RaidCatcher.addui.changer(this,\'b\',RaidCatcher.addui.pos_prec)" id="6" class="onglet fb"><label>Options</label></div></div><div id="c1" class="contenu oc">' + calculators + '</div><div id="c2" class="contenu fc">' + sharing + '</div><div id="c3" class="contenu fc">' + YepoRCC + '</div><div id="c4" class="contenu fc">' + links + '</div><div id="c5" class="contenu fc">' + friendmanager + '</div><div id="c6" class="contenu fc">' + Yoptions + '</div></div>';/*  src="http://dotdtools.clanteam.com/addonfeed.html" */YepoNews = '<br><label><B><u>YepoMax\'s Add-On News :</u></B></label><iframe id="lastsect" class="Yepo_iframe" scrolling="no" style="height: 550px; width: 280px;"></iframe><br><br><label><p style="color: #898989; font-size: 8pt">Version '+scriptInfos.version+'</p><div id="invisiblediv" style="display:none"></label></div>';
/* ---------- HTML END ---------- */
}

if(window.top == window.self){
	unsafeWindow.addonInit = false;
	window.addIt = function (nbft){
		RC = unsafeWindow.RaidCatcher 			// Get out from GM sandbox.
		if(typeof RC === 'object'){				// Raidcatcher is found, tab UI can be created.
		
			loadHTML();
			loadColouredChat();
		
			var holodeck = unsafeWindow.holodeck;
			RC.ui.addTabBase("Tools", YepoTools);
			RC.ui.addTabBase("News", YepoNews,function(){document.getElementById("lastsect").src = "http://dotdtools.clanteam.com/addonfeed.html";setTimeout("document.getElementById('lastsect').className = 'Yepo_iframe'",100)});

			// document.getElementById("quicklinks_favorite_block").innerHTML += '<a href="#" onClick="alert(\'ooooh\');return false;">SuperLight Game</a>';
			
			RC.selcs = function(spanid){
				var cofs = document.getElementById(spanid).className;
				if(cofs=="scheckbox"){
					document.getElementById(spanid).className = "scheckboxsel";
				}else{document.getElementById(spanid).className = "scheckbox";}
			}
			RC.radio = function(last,that){
				document.getElementById(last).className = "sradio";
				that.className = "sradiosel";
				return that.id
			}

			RC.addui = {
				pos_prec : "t",
				changer: function(ongl,pos_act,pos_anc){
					document.getElementsByClassName("onglet oo")[0].className = "onglet f" + pos_anc;
					document.getElementsByClassName("contenu oc")[0].className = "contenu fc";
					ongl.className = "onglet oo";
					document.getElementById("c"+ongl.id).className = "contenu oc";
					return pos_act
				}
			}
			
			RC.lands = {
				calc: function(){
					var prices = [4000,15000,25000,50000,75000,110000,300000,600000,1200000];
					var incomes = [100,300,400,700,900,1200,2700,4500,8000];
					var numbs = [document.getElementById("Cor").value,document.getElementById("Sta").value,document.getElementById("Bar").value,document.getElementById("Sto").value,document.getElementById("Pub").value,document.getElementById("Inn").value,document.getElementById("Sen").value,document.getElementById("For").value,document.getElementById("Cas").value];
					var ratio = new Array();
					var your_incomes = 0;
					for(var ind = 0; ind < prices.length; ind++){
						ratio.push((prices[ind] + prices[ind]*numbs[ind]/10) / incomes[ind]);
						your_incomes += (incomes[ind]*numbs[ind]);
					}
					user_options["lands"] = numbs;
					localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options));
					if(your_incomes > 1000000){
						your_incomes = Math.round(your_incomes/1000)/1000 + "m";
					}
					return [ratio, your_incomes]
				},
				show: function(){
					var landss = document.getElementsByClassName("landline");
					for(var cells=0; cells < landss.length;cells++){
						landss[cells].style.backgroundColor = "white";
					}
					calc_ret = RC.lands.calc();
					var ratios = calc_ret[0];
					document.getElementById("your_income").innerHTML = " <label><b>Your income : " + calc_ret[1] + "/hr</b></label> ";
					var min_index = ratios.indexOf(Math.min.apply(Math, ratios));
					landss[3*min_index].style.backgroundColor = "#fbfb78";
					landss[3*min_index +1].style.backgroundColor = "#fbfb78";
					landss[3*min_index +2].style.backgroundColor = "#fbfb78";
				}
			}

			RC.ui.switcht = function(id1,span1,id2,span2){
				RC.ui.toggleDisplay(id1, span1);
				if(document.getElementById(id2).style.display == 'block' && document.getElementById(id1).style.display =='block'){
					RC.ui.toggleDisplay(id2, document.getElementById(span2))
				}
				RC.actopts();
			}				

			/* Just ask YepoMax if you want an uncompressed version of the script */
			RC.customize={changeTabsHeadsColors:function(e,t){t?t:t=["black"];var n=document.getElementsByClassName("tab_head");if(typeof e=="string"){e=[e]}if(typeof t=="string"){t=[t]}var r=0;var i=0;for(var s=0;s<n.length;s++){s>=e.length?r=e.length-1:r=s;s>=t.length?i=t.length-1:i=s;n[s].style.backgroundColor=e[r];n[s].style.color=t[i]}},changeBackgroundColor:function(e,t){t?t:t="#666";if(e.indexOf(".")==-1&&e.indexOf("-")==-1){document.getElementById("DotDRaidTabPane").style.backgroundColor=e;document.getElementById("DotDRaidTabPane").style.backgroundImage="none"}else{if(e.indexOf(".")!=-1){document.getElementById("DotDRaidTabPane").style.backgroundImage="url('"+e+"')"}else{document.getElementById("DotDRaidTabPane").style.background=e}}document.getElementsByClassName("room_name_container h6_alt mbs")[1].style.color=t;document.getElementsByClassName("room_name_container h6_alt mbs")[1].onunload=function(){alert("EHO")};document.getElementsByClassName("room_name_container h6_alt mbs")[2].style.color=t},changeRaidsColors:function(e,t){t?t:t=["black"];if(typeof t=="string"){t=[t,t,t,t]}if(t.length!=4){t=[t[0],t[0],t[0],t[0]]}document.getElementById("themestyle").innerHTML='<style type="text/css"> 																		<!--  																		#dotd_tab_pane ul li.tab div.RaidDiff1{background-color:'+e[0]+";} 																		#dotd_tab_pane ul li.tab div.RaidDiff1 span.name{color:"+t[0]+";} 																		#dotd_tab_pane ul li.tab div.RaidDiff2{background-color:"+e[1]+";} 																		#dotd_tab_pane ul li.tab div.RaidDiff2 span.name{color:"+t[1]+";} 																		#dotd_tab_pane ul li.tab div.RaidDiff3{background-color:"+e[2]+";} 																		#dotd_tab_pane ul li.tab div.RaidDiff3 span.name{color:"+t[2]+";} 																		#dotd_tab_pane ul li.tab div.RaidDiff4{background-color:"+e[3]+";}--> 																		#dotd_tab_pane ul li.tab div.RaidDiff4 span.name{color:"+t[3]+";} 																		</style>"},loadTheme:function(e){if(typeof e!="object"){e=RC.customize.themes[e]}RC.customize.changeTabsHeadsColors(e.tab_heads,e.tab_heads_font);RC.customize.changeBackgroundColor(e.background,e.background_font);RC.customize.changeRaidsColors(e.raids,e.raids_font);if(typeof e.tab_heads_font=="undefined"){e.tab_heads_font="black"}if(typeof e.raids_font=="undefined"){e.raids_font=["black","black","black","black"]}else{if(typeof e.raids_font=="string"){e.raids_font=[e.raids_font,e.raids_font,e.raids_font,e.raids_font]}}document.getElementById("themeName_RCC").value=e.name;e.background?document.getElementById("bgcolorinput").value=e.background:document.getElementById("bgcolorinput").value="";RC.customize.updateColorSample(document.getElementById("bgcolorinput"));e.background_font?document.getElementById("bgfontinput").value=e.background_font:document.getElementById("bgfontinput").value="";e.background_font?document.getElementById("bgfontinputSAMPLE").style.backgroundColor=e.background_font:document.getElementById("bgfontinputSAMPLE").style.backgroundColor="rgb(102, 102, 102)";document.getElementById("raidcolor").value=e.raids[document.getElementById("selectedDiffRaid_RCC").selectedIndex];document.getElementById("raidcolorSAMPLE").style.backgroundColor=e.raids[document.getElementById("selectedDiffRaid_RCC").selectedIndex];document.getElementById("raidfont").value=e.raids_font[document.getElementById("selectedDiffRaidFont_RCC").selectedIndex];document.getElementById("raidfontSAMPLE").style.backgroundColor=document.getElementById("raidfont").value;typeof e.tab_heads=="string"?document.getElementById("tabscolor").value=e.tab_heads:document.getElementById("tabscolor").value=e.tab_heads[document.getElementById("selectedTab_RCC").selectedIndex];document.getElementById("tabscolorSAMPLE").style.backgroundColor=document.getElementById("tabscolor").value;typeof e.tab_heads_font=="string"?document.getElementById("tabsfont").value=e.tab_heads_font:document.getElementById("tabsfont").value=e.tab_heads_font[document.getElementById("selectedTabFont_RCC").selectedIndex];document.getElementById("tabsfontSAMPLE").style.backgroundColor=document.getElementById("tabsfont").value;RC.customize.theme=JSON.parse(JSON.stringify(e));user_options["theme"]=e.name;localStorage.setItem(unsafeWindow.active_user.username()+"_add-on_options",JSON.stringify(user_options))},saveTheme:function(e){if(!(e.name in RC.customize.themes)){RC.customize.themes[e.name]=e}else{if(!(e.name in RC.customize.default_themes)){if(confirm("Do you want to delete the previous theme named "+e.name+" ?")){RC.customize.themes[e.name]=e}}else{alert("This name is already used by a default theme.")}}localStorage.setItem("__RAIDCATCHER_CUSTOMIZER_THEMES",JSON.stringify(RC.customize.themes));RC.customize.updateYourThemesTable()},deleteTheme:function(e){if(e!=null){if(typeof e=="object"){e=e.name}if(!(e in RC.customize.default_themes)&&confirm("Do you really want to delete the theme named "+e+" ?")){delete RC.customize.themes[e];localStorage.setItem("__RAIDCATCHER_CUSTOMIZER_THEMES",JSON.stringify(RC.customize.themes));RC.customize.loadTheme("null")}else{if(e in RC.customize.default_themes){alert("You cannot remove default theme !")}}RC.customize.updateYourThemesTable()}},rename:function(e){var t=JSON.parse(JSON.stringify(RC.customize.theme));t.name=e;RC.customize.theme=t},loadYourThemes:function(){var e=document.getElementById("RCCUST");var t=document.createElement("tr");var n=0;for(var r in RC.customize.themes){if(!(r in RC.customize.default_themes)){if(RC.customize.themes.hasOwnProperty(r)){n++;var i=document.createElement("td");var s=document.createElement("div");s.style.height="40px";s.style.width="40px";s.className="RCC_theme";s.style.fontWeight="bold";s.innerHTML=r;s.onclick=function(){RC.customize.loadTheme(this.innerHTML)};i.appendChild(s);t.appendChild(i);if(!(n%6)){e.appendChild(t);t=document.createElement("tr")}}}}if(n%6){e.appendChild(t)}},updateYourThemesTable:function(){var e=document.getElementById("RCCUST");var t=e.getElementsByTagName("tr").length;for(var n=13;n<t;n++){var r=e.getElementsByTagName("tr")[13];e.removeChild(r)}RC.customize.loadYourThemes()},default_themes:genBaseThemes(),themes:JSON.parse(localStorage.getItem("__RAIDCATCHER_CUSTOMIZER_THEMES")),theme:{},setTabFont:function(e){if(typeof RC.customize.theme.tab_heads_font=="string"&&document.getElementById("selectedTabFont_RCC").selectedIndex==0){RC.customize.theme.tab_heads_font=e.value}else{if(typeof RC.customize.theme.tab_heads_font=="string"){RC.customize.theme.tab_heads_font=[RC.customize.theme.tab_heads_font];for(var t=1;t<document.getElementsByClassName("tab_head").length;t++){RC.customize.theme.tab_heads_font.push(RC.customize.theme.tab_heads_font[0])}}RC.customize.theme.tab_heads_font[document.getElementById("selectedTabFont_RCC").selectedIndex]=e.value}},setTabColor:function(e){if(typeof RC.customize.theme.tab_heads=="string"&&document.getElementById("selectedTab_RCC").selectedIndex==0){RC.customize.theme.tab_heads=e.value}else{if(typeof RC.customize.theme.tab_heads=="string"){RC.customize.theme.tab_heads=[RC.customize.theme.tab_heads];for(var t=1;t<document.getElementsByClassName("tab_head").length;t++){RC.customize.theme.tab_heads.push(RC.customize.theme.tab_heads[0])}}RC.customize.theme.tab_heads[document.getElementById("selectedTab_RCC").selectedIndex]=e.value}},updateColorSample:function(e){if(e.value.toLowerCase().indexOf("gradient")==-1){document.getElementById(e.id+"SAMPLE").style.background="";document.getElementById(e.id+"SAMPLE").style.backgroundColor=e.value}else{document.getElementById(e.id+"SAMPLE").style.backgroundColor="";document.getElementById(e.id+"SAMPLE").style.background=e.value}},adjustTabCount:function(){var e=document.getElementById("selectedTab_RCC");var t=document.getElementById("selectedTabFont_RCC");for(var n=5;n<e.children.length;n++){e.removeChild(e.children[n]);t.removeChild(t.children[n])}for(var n=5;n<document.getElementsByClassName("tab_head").length;n++){if(document.getElementsByClassName("tab_head")[n].style.display!="none"){var r=document.createElement("option");var i=document.createElement("option");r.innerHTML=(n+1).toString();i.innerHTML=(n+1).toString();e.appendChild(r);t.appendChild(i)}}}}			

			RC.customize.loadYourThemes();

			var imeo = holodeck.chatWindow();
			var privf = new Array();
			for(var afn in imeo._friends){
				privf.push(afn)
			}
			
			if(user_options["loadfriends"]=="scheckboxsel"){
				var tmpon = onlineFriends(unsafeWindow.active_user.username()).sort(case_insensitive_comp);
				var tmpfr = getFriends(unsafeWindow.active_user.username()).sort(case_insensitive_comp);
			}else{
				tmpon = new Array();
				tmpfr = new Array();
			}
			
			RC.friends = {

				konglist: tmpfr,
				sharelist: user_options["sharelist"],
				online: tmpon,
				igns: user_options["IGN"], // LOWER CASE KEYS
				dotdsure: user_options["DotDplayers"],
			
				add: function(finput){
					if(typeof(finput)=='string'){var aname = finput}else{var aname = finput.value}
					userexist = urldic("http://www.kongregate.com/api/user_info.json?username="+aname).success;
					if(aname && RC.friends.sharelist.length < 20 && RC.friends.sharelist.indexOf(aname)==-1){
						if(aname != unsafeWindow.active_user.username() && userexist){
							RC.friends.sharelist.push(aname);
							user_options["sharelist"] = RC.friends.sharelist;
							localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options));
							RC.friends.update();
						}else{alertY("The user doesn't exist or you inserted your own name.")}
					}else{if(RC.friends.sharelist.length==20){alertY("You are allowed to add max of 20 names to your friend list.")}}
					if(typeof(finput)!='string'){finput.value = "";}
				},
			
				remove: function(fname){
					RC.friends.sharelist.splice(RC.friends.sharelist.indexOf(fname),1);
					RC.friends.update();
					user_options["sharelist"] = RC.friends.sharelist;
					localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options));
				},

				update: function(){
					document.getElementById("friendlist").innerHTML = "<label><u>Friend List :</u></label>";
					for(var friend = 0; friend < RC.friends.sharelist.length; friend ++){
						document.getElementById("friendlist").innerHTML += "<br><a href='#' onClick='RaidCatcher.friends.remove(\""+RC.friends.sharelist[friend]+"\");return false'>"+RC.friends.sharelist[friend]+"</a>";
					}
				},
				
				addKong: function(akongname){
					if(typeof akongname != "string"){var akongname2 = akongname.value;akongname.value = ""}else{var akongname2 = akongname}
					userexist = urldic("http://www.kongregate.com/api/user_info.json?username="+akongname2).success;
					if(akongname2 != unsafeWindow.active_user.username() && userexist){
						addAsFriend(akongname2);
						RC.ui.outputStatus(akongname2+" added as friend");
						if(!(akongname2 in privf)){privf.push(akongname2);privf.sort(case_insensitive_comp)}
						setTimeout(function(){
							RC.friends.konglist = getFriends(unsafeWindow.active_user.username());
							RC.friends.displayKong();},1000);
					}else{alertY("The Kongregate user doesnt exist or the name is yours.");}
				},
				
				removeKong: function(aname){
					aname = aname.toLowerCase();
					privf.splice(privf.indexOf(aname),privf.indexOf(aname)-1);
					delFriend(aname);
					RC.ui.outputStatus("Removing "+aname+" ...");
					setTimeout(function(){
						RC.friends.konglist = getFriends(unsafeWindow.active_user.username()).sort(case_insensitive_comp);
						RC.friends.displayKong();},1000);
				},
				
				removeKongs: function(alistofnames){
					
					if(confirm("Delete the list you just inserted ?")){
						for(var ind_f = 0; ind_f < alistofnames.length; ind_f ++){
							RC.friends.removeKong(alistofnames[ind_f]);
						}
					}
				},
				
				isKnown: function(aname){
					var toret = false;
					for(var akey in RC.friends.dotdsure){
						if(akey.toLowerCase() == aname.toLowerCase()){toret = true}
					}
					return toret
				},
				
				isInRoom: function(aname){
					var toret = false;
					var hisusername = false;
					for(var userind = 0; userind < unsafeWindow.active_room._users_list.length;userind++){
						if(aname.toLowerCase() == unsafeWindow.active_room._users_list[userind].username.toLowerCase()){toret = true;hisusername = unsafeWindow.active_room._users_list[userind].username}
					}
					return [toret,hisusername]
				},
				
				getCorrectUsernamesFromRoom: function(){ // this function is for ppl that have a private profile, with lower letters usernames. It will correct some username (ppl in room) without the API.
					for(var thefriend =0; thefriend < privf.length; thefriend++){
						if(RC.friends.isInRoom(privf[thefriend])[0]){privf[thefriend] = RC.friends.isInRoom(privf[thefriend])[1];}
					}
				},

				updatewithKnowns: function(alist){
					for(var anumb = 0; anumb < alist.length; anumb++){
						if(RC.friends.isKnown(alist[anumb])){alist[anumb] = RC.friends.LowerToUpper(alist[anumb]);}
					}
					return alist
				},
				
				LowerToUpper: function(aname){
					for(smbd in RC.friends.dotdsure){if(smbd.toLowerCase()==aname.toLowerCase()){return smbd}}
				},
				
				dispIGN: function(aname){
					if(RC.friends.igns[aname.toLowerCase()]!=null){
						document.getElementById("igndisp").innerHTML = "<label>IGN : "+RC.friends.igns[aname.toLowerCase()]+"</label>";
						document.getElementById("igndisp").style.display = "block";
					}
				},
				
				noIGN: function(){
					document.getElementById("igndisp").style.display = "none";
				},
				
				inChatIGN: function(aname){
					return aname + " - IGN : " + RC.friends.igns[aname.toLowerCase()]
				},
				
				dispFriend: function(aname){
					var fvars = urldic("http://www.kongregate.com/api/user_info.json?username="+aname);
					if(fvars.user_vars.gender == null){fgender = '<label style="color:#c0c0c0">private</label>';}else{fgender=fvars.user_vars.gender}
					if(fvars.user_vars.age == null){fage = '<label style="color:#c0c0c0">priv.</label>';}else{fage = fvars.user_vars.age}
					if(fvars.user_vars.game_title == null){nwg = '<label style="color:#c0c0c0">nothing</label>';}else{nwg = fvars.user_vars.game_title}
					aname = fvars.user_vars.username;
					if(RC.friends.isOnline(aname)){var connect = '<span style="margin-left:5px;background-color:#029402;border-radius:10px;padding:0px 4px;font-size:5px;vertical-align:middle"></span>'}else{var connect = '<span style="margin-left:5px;background-color:#940202;border-radius:10px;padding:0px 4px;font-size:5px;vertical-align:middle"></span>'}
					var template = '<div id="profile" style="background-color:#efefef;height:140px"><a href="#" onClick="RaidCatcher.friends.displayKong();return false"> <<< Back to friend list </a><br> \
									<div onmouseover="RaidCatcher.friends.dispIGN(\''+aname+'\')" onmouseout="RaidCatcher.friends.noIGN()" oncontextmenu="RaidCatcher.friends.IGNmanage();document.getElementById(\'nkn\').value=\''+aname+'\';return false" style="margin-top:12px;margin-bottom:5px"><img style="margin-left:2px;margin-bottom:-2px" src="'+fvars.user_vars.chat_avatar_url+'"/><label style="color:#466d3d;font-size:12px;"> <u><b>'+aname+'</b></u> </label> <span style="border-radius:5px;background-color:#522a96;padding:0px 2px;color:#c0c0c0">'+fvars.user_vars.level+'</span>'+connect+'</div> \
									<div style="margin-top:4px"><label> Gender : '+fgender+'</label><span style="float:right"><label>Age : '+fage+'</label></span></div> \
									<div style="margin-bottom:2px"><label style="font-size:8px"> Last played : </label><i style="font-size:9px">'+nwg+'</i></div> \
									<a href="#" onClick="RaidCatcher.friends.removeKong(\''+aname+'\');return false" style="font-size:9px">Delete from Kongregate friends</a> \
									<div style="margin-top:24px;font-size:10px"><a href="#" onClick="RaidCatcher.friends.whisp(\''+aname+'\');RaidCatcher.friends.displayKong();return false"> Whisper </a><a style="float:right;" href="#" onClick="RaidCatcher.friends.add(\''+aname+'\');return false">Add to share list</a></div></div> \
									';
					document.getElementById("kongflist").innerHTML = template;
					if(!(RC.friends.isKnown(aname))){
						if(!isDotDplayer(aname)){document.getElementById("profile").style.backgroundColor = "#f8dede";RC.friends.dotdsure[aname] = false;}else{RC.friends.dotdsure[aname] = true}user_options["DotDplayer"] = RC.friends.dotdsure;localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options));
					}else{
						if(!(RC.friends.dotdsure[aname])){document.getElementById("profile").style.backgroundColor = "#f8dede";}
					}
					return aname
				},
				
				isShare: function(aname){
					var result = false;
					for(var theppl = 0; theppl < RC.friends.sharelist.length; theppl++){
						if(RC.friends.sharelist[theppl].toLowerCase() == aname.toLowerCase()){result = true}
					}
					return result
				},
				
				isOnline: function(aname){
					var result = false;
					for(var theppl = 0; theppl < RC.friends.online.length; theppl++){
						if(RC.friends.online[theppl].toLowerCase() == aname.toLowerCase()){result = true}
					}
					return result
				},
				
				search: function(tinput){
					if(RC.friends.konglist.length > 0){
						strlist = "";
						for(var fri = 0; fri < RC.friends.konglist.length; fri++){if(RC.friends.konglist[fri].toLowerCase().indexOf(tinput.value.toLowerCase())!==-1){
							strlist += "<a href='#' oncontextmenu='RaidCatcher.friends.IGNmanage();document.getElementById(\"nkn\").value=\""+RC.friends.konglist[fri]+"\";return false' onmouseover='RaidCatcher.friends.dispIGN(\""+RC.friends.konglist[fri]+"\")' onmouseout='RaidCatcher.friends.noIGN()' onClick='RaidCatcher.friends.konglist["+fri+"] = RaidCatcher.friends.dispFriend(\""+RC.friends.konglist[fri]+"\");return false'";
							if(RC.friends.konglist[fri].toLowerCase() in imeo._mutings){strlist += " style='color:#585858'"}if(RC.friends.isShare(RC.friends.konglist[fri])){strlist += " style='color:#483698'"}
							strlist += ">"+RC.friends.konglist[fri]+"</a>";
							if(RC.friends.isOnline(RC.friends.konglist[fri])){strlist += "  <span style='background-color:#029402;border-radius:10px;padding:0px 4px;margin-left:10px;font-size:5px;vertical-align:middle'></span>"}
							strlist += " <a href='#' style='float:right' onClick='RaidCatcher.friends.removeKong(\""+RC.friends.konglist[fri]+"\");setTimeout(RaidCatcher.friends.displayKong,1000);return false'> Delete </a><br>";
						}}
						strlist += "<br>Total of : "+RC.friends.konglist.length+" friends";
						document.getElementById("kongflist").innerHTML = "<u>Your Kongregate friends :</u><br>" + strlist;
					}
				},
				
				whisp: function(aname){
					imeo.insertPrivateMessagePrefixFor(aname);
					holodeck.setTab(0);
					return false
				},
				
				addRoom: function(){
					RoomFriend();
					RC.ui.outputStatus("Adding room users as friend ...");
					setTimeout(function(){
						RC.friends.konglist = getFriends(unsafeWindow.active_user.username()).sort(case_insensitive_comp);
						RC.friends.displayKong();},1000);
				},
				
				addalot: function(){
					confirmY("This will add 5000 friends (if you don't already have them).\nBe patient ... May bug at starting but no worries :)\n\n(This will take about 20 minutes)","(function(){document.getElementById(\"thequestion\").innerHTML = \"Starting ...<br><br>You can still play while waiting :)\";magicfriends();RaidCatcher.ui.outputStatus(\"Wait wait wait ...\");})")
					},
				
				backup: function(){
					if(localStorage.getItem("friendbackup") == null){
						if(confirm("This will save your friend list.\nWhy to do that ?\nTo get red cheevo on Dawn.\nHow ?\nClick ok, click 'Delete all', click 'Magic Friend' then on Dawn click 'Show Army', refresh the page and if the army is now updated on Kong, reclick this 'Backup' button")){
							if(RC.friends.konglist.length ==0){RC.friends.konglist = privf.sort(case_insensitive_comp)}
							localStorage.setItem("friendbackup",JSON.stringify(RC.friends.konglist));
							alert("Done.\nYou can have only 1 backup friend list");
					}}else{if(confirm("Get your back-up list back ?\nIf you want to set a new back-up list, you'll have to wait for the next add-on version, sorry ...")){
						RC.friends.removeAllKong();
						oldlist = JSON.parse(localStorage.getItem("friendbackup"));
						for(var x in oldlist){addAsFriend(oldlist[x])}
					}}
				},
				
				displayKong: function(){
					strlist = "";
					if(RC.friends.konglist.length ==0){RC.friends.getCorrectUsernamesFromRoom();RC.friends.konglist = RC.friends.updatewithKnowns(privf.sort(case_insensitive_comp));strlist = "<label style='color:red'>/!\\ </label><label style='color:#c0c0c0;font-size:10px'><i> Your profile is private. The list may show some errors.</i></label><br>"}
					for(var fri = 0; fri < RC.friends.konglist.length; fri++){
						strlist += "<a href='#' oncontextmenu='RaidCatcher.friends.IGNmanage();document.getElementById(\"nkn\").value=\""+RC.friends.konglist[fri]+"\";return false' onmouseover='RaidCatcher.friends.dispIGN(\""+RC.friends.konglist[fri]+"\")' onmouseout='RaidCatcher.friends.noIGN()' onClick='RaidCatcher.friends.konglist["+fri+"] = RaidCatcher.friends.dispFriend(\""+RC.friends.konglist[fri]+"\");return false'";
						if(RC.friends.konglist[fri].toLowerCase() in imeo._mutings){strlist += " style='color:#585858'"}if(RC.friends.isShare(RC.friends.konglist[fri])){strlist += " style='color:#483698'"}
						strlist += ">"+RC.friends.konglist[fri]+"</a>";
						if(RC.friends.isOnline(RC.friends.konglist[fri])){strlist += "  <span style='background-color:#029402;border-radius:10px;padding:0px 4px;margin-left:10px;font-size:5px;vertical-align:middle'></span>"}
						strlist += " <a href='#' style='float:right' onClick='RaidCatcher.friends.removeKong(\""+RC.friends.konglist[fri]+"\");setTimeout(RaidCatcher.friends.displayKong,1000);return false'> Delete </a><br>";
					}if(RC.friends.konglist.length == 0){strlist += "<br> If you have friends but you see nobody here, it mean you have a private Kong profile. Make it public to be able to display."}else{strlist += "<br>Total of : "+RC.friends.konglist.length+" friends"}
					document.getElementById("kongflist").innerHTML = "<u>Your Kongregate friends :</u><br>" + strlist;
				},
				
				removeAllKong: function(){
					confirmY("Remove all your Kongregate Friends ?","(function(){for(var fri in RaidCatcher.friends.konglist){delFriend(RaidCatcher.friends.konglist[fri]);};RaidCatcher.ui.outputStatus(\"Removing all friends ...\");})");
				},
				
				options: function(){
					if(document.getElementById("coloropts").style.display == "none"){document.getElementById("gotocopt").style.display = "none";document.getElementById("closecopt").style.display = "block";document.getElementById("coloropts").style.display = "block";}
					else{document.getElementById("coloropts").style.display = "none";document.getElementById("gotocopt").style.display = "block";document.getElementById("closecopt").style.display = "none"}
				},
				
				updateKonglist: function(){
					RC.friends.konglist = RC.friends.updatewithKnowns(getFriends(unsafeWindow.active_user.username()).sort(case_insensitive_comp));
					RC.friends.online = onlineFriends(unsafeWindow.active_user.username()).sort(case_insensitive_comp);
					RC.friends.displayKong();
				},
				
				IGNmanage: function(){
					var IGNManager = '<div id="ignmanage" style="width:180px;height:140px;background-color:rgba(0,0,0,0.05);"> \
								<table><tr><td style="width:55px;font-size:8px"><label>Kong name : </label></td><td valign="middle"><input id="nkn" type="text" size=13 class="ytext" placeholder="Requiered"></td></tr> \
								<tr><td style="width:55px;font-size:8px"><label>DotD name : </label></td><td valign="middle"><input id="nignn" type="text" size=13 class="ytext" placeholder="Requiered for new"></td></tr> \
								<tr><td colspan=2 align="center" style="padding-top:5px"><input type="button" class="ybut" value="Add or modify an IGN" onClick="RaidCatcher.friends.newIGN(document.getElementById(\'nkn\').value,document.getElementById(\'nignn\').value)"></td></tr> \
								<tr><td colspan=2 align="center"><input type="button" class="ybut" value="Delete an IGN" onClick="RaidCatcher.friends.removeIGN(document.getElementById(\'nkn\')"></td></tr> \
								<tr><td colspan=2 align="center"><input type="button" class="ybut" value="Back to friend list" onClick="RaidCatcher.friends.displayKong()"></td></tr> \
								</table>';
					document.getElementById("kongflist").innerHTML = IGNManager;
				},
				
				newIGN: function(aname,theign){
					if(aname!="" && theign!=""){
						RC.friends.igns[aname.toLowerCase()] = theign;
						document.getElementById("nignn").value="";
						document.getElementById("nkn").value="";
						user_options["IGN"] = RC.friends.igns;
						localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options));
					}
				},
				
				removeIGN: function(aname){
					if(aname in RaidCatcher.friends.igns){
						delete RC.friends.igns[aname];
						user_options["IGN"] = RC.friends.igns;
						localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options));
					}
				},
				
				exportIGNs: function(){

					prompt("Copy the following text and share it to anyone you want to share your IGNs list with.", "[[[IGNs]]]"+ JSON.stringify(RC.friends.igns) + "[[[/IGNs]]]");

				},
				
				importIGNs: function( string ){
				
					try{ var igns = JSON.parse( string.replace("[[[IGNs]]]", "").replace("[[[/IGNs]]]", "") ); 

						for(var kn in igns){

							if(igns.hasOwnProperty(kn)){

								RC.friends.newIGN(kn, igns[kn]);

							}

						}

					}catch(e){ }

				},

				changecolor: function(thecolors){
					console.log("Changing colors chat colors to ([friends,you]) : [" + thecolors[0] + "," + thecolors[1] + "]")
					document.getElementById("friendcolorstyle").innerHTML = '<style type="text/css"><!-- .friend_message .chat_message_window_username{color:'+thecolors[0]+' !important} .yourself_custom .chat_message_window_username{color:'+thecolors[1]+' !important} --></style>';
					user_options["thechatcolors"] = thecolors;
					localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options));
				}
			};

			setTimeout(function(){RC.friends.update();if(user_options["loadfriends"]=="scheckboxsel"){RC.friends.konglist = RC.friends.updatewithKnowns(RC.friends.konglist);RC.friends.displayKong()}},7000);

			RC.sharePR = function(raidtoshare){
			
				function linkIsValid(input){
					if(typeof(raidtoshare)!='string'){raidstring = raidtoshare.value;}else{raidstring = raidtoshare;}
					return raidstring.indexOf("http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons?kv_action_type=raidhelp")!=-1;
				}
				if(linkIsValid(raidtoshare)){
					// Log raid is beeing shared
					holodeck.chatWindow().insert('<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <i>Your raid is beeing shared to your Private Raid Manager list</i> </div>');

					(function shareLoop(link,list,index){
						if(typeof(link)!='string'){raidstring = link.value;}else{raidstring = link.replace("/share ","");}
						if(index < list.length){
							specialwhisper(RC.friends.sharelist[index],raidstring);
							RC.ui.outputStatus("Sent to "+RC.friends.sharelist[index]);
							index++;
							setTimeout(function(){shareLoop(link,list,index);},2000);
						}else{
							// Log raid has been shared
							holodeck.chatWindow().insert('<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <i>Your raid is now shared !</i> </div>');
							if(typeof(link)!='string'){link.placeholder = "Raid has been sent";link.value = "";}
						}
					})(raidtoshare,RC.friends.sharelist,0);
					
				}else{alertY("Please enter a valid Kongregate raid url !")}
			}
			
			RC.ui.showCustomColors = function(theclass){
			
				var opposite = 'none';
				if(theclass == 'scheckboxsel'){opposite = ''}
				var hid = document.getElementsByClassName("colsel_un_h");
				for(var els = 0; els < hid.length;els ++){
					hid[els].style.display = opposite;
				}
			}
			
			RC.colordiff = function(){
				if(document.getElementById("Colorraiddiff").className=="scheckboxsel"){
					var coldif = ["black","green","#f8f000","red","purple"];
					var diffs = document.getElementById("RaidBossDifficultySearch").options;
					for (var di = 0; di < diffs.length; di++){
						diffs[di].style.color = coldif[di];
					}
				}else{
					var diffs = document.getElementById("RaidBossDifficultySearch").options;
					for (var di = 0; di < diffs.length; di++){
						diffs[di].style.color = "black";
					}
				}
			}

			// Options
			
			RC.startopts = function(chks){
				var idp=0;
				var tabss = [document.getElementById("disptnl"),document.getElementById("dispprm"),document.getElementById("disprcc"),document.getElementById("displc"),document.getElementById("dispfm")];
				tabss[chks[0]].className = "sradiosel";
				RC.olr = tabss[chks[0]].id;
				if(chks[0]>2){RC.addui.pos_prec="b"}
				document.getElementsByClassName("onglet oo")[0].className = "onglet ft";
				document.getElementsByClassName("contenu oc")[0].className = "contenu fc";
				document.getElementById((chks[0]+1).toString()).className = "onglet oo";
				document.getElementById("c"+(chks[0]+1).toString()).className = "contenu oc";
				var lands_n = user_options["lands"];
				document.getElementById("Cor").value = lands_n[0];
				document.getElementById("Sta").value = lands_n[1];
				document.getElementById("Bar").value = lands_n[2];
				document.getElementById("Sto").value = lands_n[3];
				document.getElementById("Pub").value = lands_n[4];
				document.getElementById("Inn").value = lands_n[5];
				document.getElementById("Sen").value = lands_n[6];
				document.getElementById("For").value = lands_n[7];
				document.getElementById("Cas").value = lands_n[8];
				RC.lands.show();
				document.getElementById("tocolor").className = user_options["colorthem"];
				document.getElementById("largechat").className = user_options["largechat"];
				document.getElementById("tabfriend").className = user_options["loadfriends"];
				document.getElementsByName("quickWhisper")[0].value = user_options["quickWhisper"];
				RC.ui.showCustomColors(document.getElementById("tocolor").className);
				setTimeout(function(){if(document.getElementById("clnk").className=="scheckboxsel"){cleankong()}},200);
				if(chks[1]){RC.ui.switcht('LandCalc', 'onclnd', 'TNLCalc', 'onctnl');document.getElementById('onclnd').className="panel_handle spritegame mts opened_link";}
				if(chks[2]){RC.ui.switcht('Guildm', 'oncgs', 'PRManage', 'oncprm');document.getElementById('oncgs').className="panel_handle spritegame mts opened_link";}
			}
			
			RC.hideNews = function(){
				if(document.getElementById("hNt").className=="scheckboxsel"){document.getElementsByClassName('tab_head')[5].style.display = "none"
				}else{document.getElementsByClassName('tab_head')[5].style.display = "block";}
			}
			
			RC.actopts = function(){
				RC.hideNews();
				var tabss = [document.getElementById("disptnl").className,document.getElementById("dispprm").className,document.getElementById("disprcc").className,document.getElementById("displc").className,document.getElementById("dispfm").className];
				var t1 = 0;var t2 = 0;
				if(document.getElementById("LandCalc").style.display=="block"){t1 = 1}
				if(document.getElementById("Guildm").style.display=="block"){t2 = 1}
				user_options["toolsdisplay"] = [tabss.indexOf("sradiosel"),t1,t2];
				user_options["largechat"] = document.getElementById("largechat").className;
				user_options["hidenews"] = document.getElementById("hNt").className;
				user_options["cleanK"] = document.getElementById("clnk").className;
				user_options["colorthem"] = document.getElementById("tocolor").className;
				user_options["loadfriends"] = document.getElementById("tabfriend").className;
				user_options["quickWhisper"] = document.getElementsByName("quickWhisper")[0].value;
				if(document.getElementById("tocolor").className=="scheckbox"){unsafeWindow.colorfriends = false;colorfriends=false}else{unsafeWindow.colorfriends = true;colorfriends=true}
				if(document.getElementById("CyanYepo").className=="scheckboxsel"){unsafeWindow.coloryepo = false;coloryepo=false}else{unsafeWindow.coloryepo = true;coloryepo=true}
				if(!largechat && document.getElementById("largechat").className == "scheckboxsel"){
					largechat = true;
					bigchat();
				}else{if(document.getElementById("largechat").className == "scheckbox" && largechat){back_to_normal_chat();largechat = false}}
				if(document.getElementById("clnk").className=="scheckboxsel"){cleankong()}
				
				localStorage.setItem(unsafeWindow.active_user.username() + "_add-on_options",JSON.stringify(user_options))
			}
			
			setTimeout(function(){
					
				checks = user_options["toolsdisplay"];

				document.getElementById("hNt").className = user_options["hidenews"];
				document.getElementById("clnk").className = user_options["cleanK"];
				
				RC.startopts(checks);
				RC.hideNews();
				RC.colordiff();
				
				},400);

			var thm = user_options["theme"];
			if(user_options["theme"]!=null){setTimeout(function(){RC.customize.loadTheme(RC.customize.themes[user_options["theme"]])},200)}
			else{RC.customize.theme = RC.customize.default_themes[null];}
			unsafeWindow.myFuncInit=true;
			
			// AP array
			// Source : http://dotd.wikia.com/wiki/Achievements/Detailed_List

			RC.APrewards = {
				"Be Prepared (Consumables collection)":[ [25,50,100,250,500,false,false], [5,10,15,20,25] ],
				"Killer of the Kobold Chief (Chieftain Horgrak)":[ [5,10,25,50,100,250,1000], [5,10,50,100,250,500,1000] ],
				"Spendthrift (Spend gold)":[ [5,10,25,50,100,250,false], ["100K","1M","10M","100M","1B","10B"] ],
				"Prudent (Deposit gold)":[ [5,10,25,50,100,250,false], ["100K","1M","10M","100M","1B","10B"] ],
				"Planetary (Spend PC)":[ [25,50,100,250,500,1000,2000], [50,100,250,750,2000,5000,1000] ],
				"Risk Taker (PC - expedition)":[ [10,25,50,100,250,500,1000], [1,5,10,25,75,200,500] ],
				"Seeker of Legends":[ [25,50,100,250,500,1000,2000], [1,2,3,4,5,6,7] ],
				"Combined Arms (Troop collection)": [ [50,100,250,500,1000,2000,false], [15,25,50,100,200,400] ],
				"Supreme Commander (General collection)": [ [25,50,100,250,500,1000,2000], [5,10,20,35,50,75,100] ],
				"Popular (Army size)": [ [5,10,25,50,100,250,500], [10,50,100,250,500,1000,5000] ],
				"Jeers of the Crowd (PvP - Colosseum, lose)":[ [25,50,100,false,false,false,false], [25,100,500] ],
				"Duelist (PvP - Duel, win)": [ [5,10,25,50,100,250,false], [10,50,250,1000,5000,25000] ],
				"Training Dummy (PvP - Duel, lose)": [ [5,10,25,50,100,false,false], [25,100,500,2500,10000] ],
				"Skirmisher (PvP - Skirmish, win)": [ [5,10,25,50,100,250,false], [10,50,250,1000,5000,25000] ],
				"Overrun (PvP - Skirmish, lose)": [ [5,10,25,50,100,250,false], [25,100,500,2500,10000] ],
				"Lord of the Lists (PvP - Joust, win)": [ [5,10,25,50,100,250], [10,50,250,1000,5000,25000] ],
				"Lanced (PvP - Joust, lose)": [ [5,10,25,50,100], [25,100,500,2500,10000] ]
			}

			var awards = [ [ [10,25,50,100,250,500,1000], [5,10,20,30,45,75,125] ],
						   [ [10,25,50,100,250,500,1000], [10,50,100,250,500,1000,5000] ],
						   [ [50,100,250,500,1000,2000,false], [10,50,100,250,500,1000] ],
						   [ [25,50,100,250,500,1000,2000], [10,50,100,250,500,1000,5000] ],
						   [ [25,50,100,250,500,1000,false], [10,50,100,250,500,1000] ],
						   [ [25,50,100,250,500,1000,2000], [50,250,500,1000,2500,10000,25000] ],
						   [ ["..."], ["Sorry !"]]
						 ];

			var names = [["Master at Arms (Main Hand collection)","Ambidextrous (Off Hand collection)","Many Faces (Helm collection)","Varied Vestments (Chest collection)","Warm Hands (Gloves collection)","Fashionable (Pants collection)","If the Shoe fits… (Boots collection)","My Preciouses (Ring collection)"],
						["Big Game Hunter (Ataxes)","Four Arms Bad (Briareus the Butcher)","Lion Tamer (Bloodmane)","Metal Zombie Master(Ironclad)","Anger Management (Gunnar the Berserk)","Impaling the Impaler (Maraak the Impaler)",
						"Super Scorpion Smasher (Hargamesh)", "Winners Don't Use Alchemy (Krugnug)", "Aquatic Supremacy (Thaltherda the Sea-Slitherer)", "Scorpion Smasher (Mazalu)","Hand of Justice (Bloody Alice)",
						"Calamari (Scylla)", "Hellhound Hacker (Kerberos)", "Deanimator (Zombie Horde)", "Serpent Slayer (Nidhogg)", "Erakka Cracker (Erakka-Sak)", "Back to School (Headmaster Grimsly)", "Riddle Me This (Riddler Gargoyle)",
						"Her Last Duel (The Baroness)", "Grin and Bear It (Hurkus the Eviscerator)"],
						["The Harder They Fall (General Grune)","Dark Corners of the World (Lurking Horror)","Broken Bat (Gravlok the Night-Hunter)","Decapitator (Hydra)","He's Dead! (Stein)",
						"Yeti Killer (Kang-Gsod)","Wexx on, Wexx off (Wexxa the Worm-Tamer)","Hardboiled Hero (Rift the Mauler)","King of Statues (Leonine Watcher)","Qwil Kill (Teremarthu)", "Go to Hell (Z'ralk'thalat)", "Unhammered (Malleus Vivorum)",
						"Slayer of the Black Worm (Erebus the Black)","Irresistible Force (Sir Cai)","Air Freshener (Bogstench)","Beseiger (Ulfrik)","Cleanser (Tainted Erebus)","Running the Asylum (Guilbert the Mad)",
						"Sing Along (Sisters of the Song)","What're You Looking At? (Mesyra the Watcher)","Astrapios! (Nimrod the Hunter)","Master of Illusions (Phaedra the Deceiver)","Thirteenth! (Centurion Marius)","Batrachian Bloodbath (Frog-Men Assassins)","Gorilla War (Burbata the Spine-Crusher)",
						"Modern Day Hero (Lord Tyranthius)","Bone Dragon Breaker (Nalagarst)","Greater Destiny (Kalaxia the Far-Seer)","Ravager of the Red Drake (Bellarius the Guardian)","Bestiarius Maximus (Tisiphone the Vengeful)",
						"White Wyrm, Red Blood (Mardachus the Destroyer)","Shadow Warrior (Tenebra the Shadow-Mistress)","Fool's Gold (Valanazes the Gold)","Slayer in the Lair (Dragon's Lair)",
						"Hit the Road, Jack (Jack)", "...and Broke His Crown (Jack's Revenge)", "Cave Caracallam! (Caracalla)","Fangs for the Memories (Count Siculus' Phantom)","The Slayer Slain (Ruzzik the Slayer)",
						"Bug Basher (Arachna)","Djinn and Tonic (Al-Azab)","Eyes of the Beast (Deathglare)", "Rocked the Roc (Ragetalon)", "Quadruple Kill (Tetrarchos)","Shark-Fin Soup (Scuttlegore)","Crazy Like a Fox (Lunatics)","Braving the Ban Hammer (Felendis & Shaoquin -> Banhammer Bros)","Antagonist (Agony)","Anna's Avenger (Prince Obyron)","This Little Piggie... (Hammer)","Catch of the Day (Dirthax)","Flower Power (Giant Dreadbloom)","Burning Down the House (Rhalmarius the Despoiler)","Ave Victor! (Batiatus' Elite Gladiators)","Mauling the Manticore (Krasgore)","Horsing Around (Xessus of the Grim Wood)","Three Blind Eyes (Malchar the Tri-Eyed)","Bugger Off (N'rlux the Devourer)","No Sex Please, We're Krunan (Salome the Seductress)"],
						
						["Harpy Hunter (Celeano)", "Death Amongst the Mushrooms (Groblar Deathcap)"],
						["Master of the Arena (Batiatus' Gladiators)","Snake Eyes (Tithrasia)","Silver Bullet (The Black Moon Pack)","Blob Burster (Varlachleth)","Breaker of the Bronze Man (Euphronios)","Supreme Slaughter (Slaughterers Six)"],
						["Destroyer (SP - Attack)", "Bulwark of West Kruna (SP - Defense)", "Energetic (SP - Energy)", "I See  (SP - Perception)"],
						["From Farmhand to Savior (Burden's Rest quest)", "Warrior and Adventurer (Faedark Valley)"]
						];
						
			for(var theaps = 0; theaps < awards.length; theaps++){
				var thenames = names[theaps];
				for(var inda = 0;inda < thenames.length;inda++){
					RC.APrewards[thenames[inda]] = awards[theaps];
				}
			}
			
			RC.searchAP = function(astring){
				var returneds = new Array();
				for(var key in RC.APrewards){
					if(key.toLowerCase().indexOf(astring.toLowerCase())!=-1){
						returneds.push(key)
					}
				}
				return returneds
			}
			
			RC.displayOneAP = function(thekey){
				var colors = ["#a52a2a", "grey","green","#3563bd","#7542cc","orange","red"];
				
				var outter = ['<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <b>' + thekey + '</b> :<br><table><tr>',
							'</tr></table></div></div>'];
							
				var HTMLcell = "";
							
				for(var index = 0; index < RC.APrewards[thekey][1].length; index ++){
					var APAmout = RC.APrewards[thekey][0][index];
					var APCondition = RC.APrewards[thekey][1][index];
					HTMLcell += '<td class="chat_AP" style="color:white;background-color:' + colors[index] + '" onmouseover="this.innerHTML = \'' + RC.APrewards[thekey][1][index] + '\'" onmouseout="this.innerHTML = \'' + RC.APrewards[thekey][0][index] + '\'">' + RC.APrewards[thekey][0][index] + '</td>';

				}

				imeo.insert(outter[0] + HTMLcell + outter[1]);
			}
			
			RC.settings.addonVersion = {
			
				compare: function( version1, version2 ){
				
					list1 = version1.split(".");
					list2 = version2.split(".");
					
					var most_recent = version1;
					var i = 0;
					
					while(i < list1.length && i < list2.length){
					
						if(list1[i] != list2[i]){
						
							if(parseInt(list1[i]) < parseInt(list2[i])){
								most_recent = version2;
							}
							i = list1.length + list2.length;
						
						}
						
						i++;
					
					}
					
					if(i != list1.length + list2.length + 1){
						if(list2.length > list1.length){
							most_recent = version2;
						}
					}
					
					return most_recent;
				
				},
			
				check: function(){
				
					var time = new Date();
					time = time.getTime();
					
					localStorage.setItem("__ADD-ON_LATEST_VERSION", JSON.stringify( {"latest_version": scriptInfos.version, "last_check": time}) );

					var iframe = document.createElement("iframe");
					iframe.style.display = "none";
					iframe.src = "http://userscripts.org/scripts/show/161751";
					
					var body = document.getElementsByTagName("body")[0];
					
					body.appendChild(iframe);
					
					RC.settings.addonVersion.finishCheck( body, iframe, time, scriptInfos.version );
				
				},
				
				finishCheck: function( parent, iframe, time, version ){

					if( JSON.parse(localStorage.getItem("__ADD-ON_LATEST_VERSION"))["last_check"] > time ){
						parent.removeChild(iframe);
						if(RC.settings.addonVersion.compare(version, JSON.parse(localStorage.getItem("__ADD-ON_LATEST_VERSION"))["latest_version"]) != version){
							// Need to update !
							imeo.insert('<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <b style="font:14px;"> There\'s a new add-on version ! </b> <br /> You should download it (you can get it <a href="#" onclick="window.open(\'http://userscripts.org/scripts/source/161751.user.js\');">here</a>). </div>');
						}
					}else{
						setTimeout( function(){RC.settings.addonVersion.finishCheck( parent, iframe, time, version );}, 100);
					}

				}
			
			}
			
			// Commands :
			
			RC.commands = {
			
				avaible_details: {
					"w": "Send private message (whisper) to user. Usage : /w KongName message",
					"whisper": "See /w",
					"msg": "See /w",
					"bug": "Report bug to Kong. Usage : /bug shortreport",
					"commands": "Display avaible commands.",
					"afk": "Set you afk on Kong chat.",
					"invite": "Invite smbd to your private room. Usage : /invite KongName",
					"reload": "Reaload current game.",
					"kick": "Moderator/Admin command only.",
					"mute": "Mute smbd. Usage : /mute KongName",
					"unmute": "Unmute smbd. Usage : /unmute KongName",
					"mutelist": "Display your muted ppl list.",
					"help": "Send you to RaidCatcher problem report.",
					"donate": "Link to donate to RaidCatcher authors.",
					"clear": "Clear your chat.",
					"version": "Display your current RaidCatcher version.",
					"update": "Link to RaidCatcher script page.",
					"perc": "Display perception tiers",
					"ad": "Advertise RaidCatcher.",
					"lmgtfy": "Create a 'Let Me Google That For You' link"
				},
				
				findExplanation: function( string ){ // Find explanation for commands if any
				
					if(RC.commands.avaible_details.hasOwnProperty(string)){
						string = string + " &nbsp;&nbsp;<i style='color:grey;'>" + RC.commands.avaible_details[string] + "</i>";
					}
					return "/" + string;
				
				},
				
				runCommands: function( command, text ){
				
					if(text == undefined){text = "";}
					if(text.indexOf("/" + command + " ") == -1 && text != ""){ text = "/" + command + " " + text; }
					if(holodeck._chat_commands.hasOwnProperty(string)){
						holodeck._chat_commands[string][0](text);
					}
				
				}
			
			}

			holodeck.addChatCommand('add-on',function(chat,msg){
				document.getElementsByClassName('chat_input')[1].value = 'Try the RaidCatcher add-on ! Link : http://userscripts.org/scripts/show/161751';
				holodeck.activeDialogue().sendInput();
				imeo.insertInActiveChatInput("");
				return false
			});
			holodeck.addChatCommand('ads',function(chat,msg){
				document.getElementsByClassName('chat_input')[1].value = 'DotD Scripts - http://userscripts.org/groups/442';
				holodeck.activeDialogue().sendInput();
				imeo.insertInActiveChatInput("");
				return false
			});
			
			// ry as 'reach YepoMax'
			holodeck.addChatCommand('ry',function(chat,msg){
				holodeck.sendWhisper(holodeck,"/w YepoMax "+msg.replace('/ry ',''));
				imeo.insertInActiveChatInput("");
				return false
			});
			
			holodeck.addChatCommand('qw',function(chat,msg){
				if(document.getElementsByName("quickWhisper")[0].value != ""){
					holodeck.sendWhisper(holodeck,"/w " + document.getElementsByName("quickWhisper")[0].value + " "+msg.replace('/qw ',''));
					imeo.insertInActiveChatInput("");
				}else{
					var template = '<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> You have no quick whisper set, set one in Tools - Options. </div>';
					imeo.insert(template);
				}
				return false
			});
			
			holodeck.addChatCommand('share',function(chat,msg){
				RC.sharePR(msg);
				imeo.insertInActiveChatInput("");
				return false
			});
			
			holodeck.addChatCommand('friend',function(chat,msg){
				imeo.insertInActiveChatInput("");
				RC.friends.addKong(msg.replace('/friend ',''));
				return false
			});
			
			holodeck.addChatCommand('froom',function(chat,msg){
				imeo.insertInActiveChatInput("");
				RC.friends.addRoom();
				return false
			});
			
			holodeck.addChatCommand('wiki',function(chat,msg){
				if(msg.replace("/wiki ","").toLowerCase() == "help"){
					imeo.insert('<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <b style="font:14px;"> WIKI chat command help </b> <br><br> Usage : /room keyword <br><br> Bring you to DotD wiki and search your keyword on the wiki. </div>');
				}else{
					window.open('http://dotd.wikia.com/wiki/Special:Search?search='+msg.replace('/wiki ','')+'&fulltext=Search');
				}
				imeo.insertInActiveChatInput("");
				return false
			});
			
			holodeck.addChatCommand('destroy',function(chat,msg){
				imeo.insertInActiveChatInput("");
				if(msg.indexOf("skip")==-1){
					// document.getElementById("gameholder").innerHTML = '<iframe id="ytplayer" type="text/html" width="760" height="570" src="https://www.youtube.com/embed/C2yD2tyryKc?autoplay=1" frameborder="0" allowfullscreen>';
					document.getElementById("gameiframe").src = 'https://www.youtube.com/embed/gz3F-02FwZc?autoplay=1';
					Kongalert("<div style='height:500px;width:300px;background-color:white;padding:10px'><h1>BOOM !</h1></div>");
				}else{
					document.getElementById("gameiframe").src = "";
				}
				return false
			});
			
			holodeck.addChatCommand('ver',function(chat,msg){
				imeo.insertInActiveChatInput("");
				if(largechat){var ftg = 'YepoMax\'s add-on version';}else{var ftg = 'Add-on version';}
				var give = '<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <b>'+ftg+'</b> : '+scriptInfos.version+' \
							<a href="http://userscripts.org/scripts/show/161751" target="_blank" style="float:right"> Go to script page </a>';
				imeo.insert(give);
				RC.settings.addonVersion.check();
				return false
			});
			
			holodeck.addChatCommand('room',function(chat,msg){
				if(msg.replace("/room ","").toLowerCase() == "help"){
					imeo.insert('<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <b style="font:14px;"> ROOM chat command help </b> <br><br> Usage : /room integer <br><br> Bring you to the DotD Kongregate chat room number *integer*, full or not. </div>');
				}else{
					change_room(parseInt(msg.replace("/room ","")));
					var give = '<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <i>Moving to DotD room '+parseInt(msg.replace("/room ",""))+'</div>';
					imeo.insert(give);
				}
				imeo.insertInActiveChatInput("");
				return false
			});
			
			holodeck.addChatCommand('ap',function(chat,msg){
				var args = msg.replace("/ap ","");
				if(args.toLowerCase() != "help"){
					if(args!=""){
						var thes = RC.searchAP(args);
					}else{var thes = [];}
					if(thes.length == 0){
						var template = '<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> Nothing was found, sorry ! </div>';
						imeo.insert(template);
					}else{
						for(var indx = 0; indx < thes.length; indx++){
							RC.displayOneAP(thes[indx]);
						}
					}
				}else{
					imeo.insert('<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <b style="font:14px;"> AP chat command help </b> <br><br> Usage : /ap keyword <br><br>Display the AP rewards for the AP that matches your keyword.<br>Mouse over a reward to get its condition (amount of nm raids, gold, PvP wins, ...).<br><br><a href="http://dotd.wikia.com/wiki/Achievements/Detailed_List" target="_blank">See here for the full AP detailed list</a> </div>');
				}
				imeo.insertInActiveChatInput("");
				return false
			});
			
			holodeck.addChatCommand('comment',function(chat,msg){
				imeo.insertInActiveChatInput("");
				window.open('http://userscripts.org/reviews/new?script_id=161751');
				return false
			});
			
			holodeck.addChatCommand('rt',function(chat,msg){
				imeo.insertInActiveChatInput("");
				holodeck.setTab(14); // switch to RAIDS tab
				return false;
			});
			
			holodeck.addChatCommand('commands',function(chat,msg){
				imeo.insertInActiveChatInput("");
				var html = '<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#deeaf6"> <b style="font:14px;"> Avaible Chat Commands </b> <br>';
				for(var com in holodeck._chat_commands){
					if(holodeck._chat_commands.hasOwnProperty(com)){
						html += '<br> ' + RC.commands.findExplanation(com);
					}
				}
				html += '</div>';
				imeo.insert(html);
				return false;
			});
			
			// RC.settings.addonVersion.check();	

		
		}else if (!unsafeWindow.addonInit){
			console.log("addIt " + nbft);
			if(t < 10) setTimeout("addIt("+(++nbft)+")", 500, ++nbft);
		}
	}
}

function getUserVars( tries ){

	try{ var user_atm = unsafeWindow.active_user.username(); }catch(e){ user_atm = "Guest"; }

	if(user_atm == "Guest" && tries < 50){
		setTimeout( function(){ getUserVars( tries + 1); }, 100 );
	}else{

		localStorage.getItem("__RAIDCATCHER_CUSTOMIZER_THEMES")?1:localStorage.setItem("__RAIDCATCHER_CUSTOMIZER_THEMES", JSON.stringify(genBaseThemes()));

		if(localStorage.getItem(unsafeWindow.active_user.username() + "_add-on_options") == null){
			
			user_options = defaultOptions();
			unsafeWindow.user_options = user_options; // So you can access your option easily from console !
			
		}else{
		
			user_options = JSON.parse(localStorage.getItem(unsafeWindow.active_user.username() + "_add-on_options"));
			if(user_options["version"].split(".")[1] < 9){ user_options = defaultOptions(); }
			unsafeWindow.user_options = user_options; // So you can access your option easily from console !
			runFirstFunctions();
		
		}
		
	}
}

function runlargechat(tries){
	try{document.getElementsByClassName("chat_input")[1];var chatLoaded = true;}catch(err){var chatLoaded = false;}
	if(tries < 30){
		if(chatLoaded){
			setTimeout(bigchat, 400);
			largechat = true;
		}
		else{
			setTimeout(function(){runlargechat(tries+1);}, 300);
		}
	}
}

var largechat = false;

function runFirstFunctions(){
	if(user_options["largechat"]=="scheckboxsel"){setTimeout(function(){runlargechat(0);},1200);}
	if(user_options["cleanK"]=="scheckboxsel"){cleankong();}
	// document.getElementsByClassName("room_name")[4].style.display = "inline"; // Trying to correct a bug that occurs some time on top of chat
}

/* ---------------------------- CALLING SOME FUNCTIONS HERE ---------------------------- */


getUserVars(0);


function loadAddOn( loaded, tries ){ // loaded = RaidCatcher is loaded and user_options are loaded (depend on computer speed and Kong response)
	
	if(loaded || tries > 24){
		console.log("Add-on is now loading !");
		addIt(1);
	}else{
		console.log("...");
		try{document.getElementById("RaidCatcher_options_formatRaids").checked; user_options; loaded = true;}catch(err){}
		setTimeout(function(){ loadAddOn(loaded,tries+1); },600); // Yeah 600ms is very fast hehe you'll see how it is efficient ! (and light, no worries :p)
	}
}

setTimeout(function(){loadAddOn(false,0);}, 200);



// End of add-on

}else{ 

	if(window.location.href.indexOf("clanteam")==-1 && window.location.href.indexOf("kongregate")==-1){
		
		function getLastVersion(){
		
			var infos_divs = document.getElementsByClassName("script_summary");
			
			for(var d = 0; d < infos_divs.length; d++){
			
				var inner = infos_divs[d].getElementsByTagName("p")[0];
				if(inner.getElementsByTagName("b")[0].innerHTML.indexOf("Version") != -1){
				
					var latest_version = inner.innerHTML.replace(inner.getElementsByTagName("b")[0].outerHTML, "");
					
				
				}
			
			}
			
			return latest_version;
		}
		
		var latest_version = getLastVersion();
		
		var iframe = document.createElement("iframe");
		iframe.style.display = "none";
		iframe.src = "http://www.kongregate.com/api/user_info.json?" + latest_version;
		
		document.getElementsByTagName("body")[0].appendChild(iframe);
	
	}else{
		if(window.location.href.indexOf("kongregate")!=-1){
		
			var latest_version = location.search.replace("?", "");
			var time = new Date();
			localStorage.setItem("__ADD-ON_LATEST_VERSION", JSON.stringify( {"latest_version": latest_version, "last_check": time.getTime()}) );
		
		}
		else{// Save class and Machaon options on TNL Estimator
			console.log("Start tnl backup");function saveclass(){localStorage.setItem("lastclass",document.getElementById('current_class').selectedIndex);}function savemach(){localStorage.setItem("machused",document.getElementById("machaon_general_used").checked);}document.getElementById('current_class').addEventListener("change",saveclass,false);document.getElementById("machaon_general_used").addEventListener("click",savemach,false);if(localStorage.getItem("lastclass") != null){document.getElementById('current_class').options[localStorage.getItem("lastclass")].selected = true;}if(localStorage.getItem("machused") != null){document.getElementById("machaon_general_used").checked = JSON.parse(localStorage.getItem("machused"))}
		}
	}
}
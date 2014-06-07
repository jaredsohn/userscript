// ==UserScript==
// @name           Corruptsource iBranch
// @namespace      Use on corruptsources version of world.
// @description    Allows a faster and easier way to Kill Mobs
// @include        *.corruptsource.ca/*iBranch.php*
// ==/UserScript==


var Version = "1.0.0.4";
var autoRaidDamage = true;
var bHandler = true;
var aHit = new Array();

var mobLinks = new Array();
var mobHref = new Array();

var northRoom = 0;
var southRoom = 0;
var eastRoom = 0;
var westRoom = 0; 
var curRoom = 0;

var processing = 0;
var qhelper = 0;

var pic;
var name;
var description;
var mapHtml;
var questHelpInfo;
var attackbg = 2;

function refreshRoom() {
    gotoRoom(curRoom, curRoom);
}

function gotoRoom(destRoom, lastRoom)
{

    if(processing)
		return;
	
	processing = 1;
	
	unsafeWindow.$('#span_roomName').html("<img src=\"http://quiver.outwar.com/images/ajax-loader.gif\" height=15px width=15px />");
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://" + unsafeWindow.server + ".outwar.com/ajax_changeroomb.php?room=" + destRoom + "&lastroom=" + lastRoom,
		headers: {
		"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
		"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			var data = unsafeWindow.jQuery.parseJSON(response.responseText);
			var mapHtml = data.mapHtml;
			var roomDetails = data.roomDetails;
		
			Loading = 0;
			pic = data.pic;
			name = data.name;
			description = data.description;
	
			northRoom = data.north;
			southRoom = data.south;
			eastRoom = data.east;
			westRoom = data.west;
			curRoom = data.curRoom;

			if(roomDetails) {
				if(roomDetails.indexOf("><img src") != -1) 
				{ 
					roomDetails = roomDetails.replace(/><img src/g, "<img alt=\"\" src");
				}
				if(roomDetails.indexOf("/mob.php") != -1) 
				{ 
					roomDetails = roomDetails.replace(/\/mob.php/g, "http://outwar.com/mob.php"); 
				}
			}

			unsafeWindow.$('#roomDetails').html(roomDetails);
			unsafeWindow.$('#span_roomName').html("<b>- "  + name + " -</b>");
			unsafeWindow.$('#span_roomDesc').html(description + "<br>");
			unsafeWindow.$('#mapHtml').html(mapHtml);
			var Links = document.getElementById("roomDetails").getElementsByTagName('a');
			if(Links) {
				loadEvents(Links);
			}
		 
	
			if(mapHtml.indexOf("/images") != -1) mapHtml = mapHtml.replace(/\/images/g, "http://outwar.com/images");
			unsafeWindow.$('#mapHtml').html(mapHtml);
	
			unsafeWindow.Shadowbox.setup();
	
			processing = 0;
		}}
	);
}

//start of where keyboard use
var key1="87";  //W
var key2="119"; //w
var key3="83";  //S
var key4="115"; //s
var key5="68";  //D
var key6="100"; //d
var key7="65";  //A
var key8="97";  //a
var key9="66";  //B
var key10="98"; //b
var key11="71"; //G
var key12="103";//g
var key13="81"; //Q
var key14="113";//q
var x='';
var movement;
movement = true;
var Loading = 0;

function loadEvents(links){
		mobLinks = [];
		mobHref = [];
		var count = 0;
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.indexOf("somethingelse.php?") > 0) {
				var curLink;				
				curLink = links[i].href.replace(/outwar.corruptsource.ca/g, unsafeWindow.server + ".outwar.com");	
				mobHref[count] = curLink;
				mobLinks[count] = links[i];
				var link = document.createElement('a');
				link.setAttribute('href',"javascript:void()");				                                
				link.setAttribute("style","color:RED");
				link.setAttribute("id", curLink);
				link.appendChild(document.createTextNode('iBranch'));	
				count++;	
				link.addEventListener("click", function() {
					ScrollBottom("attackDetails")
					unsafeWindow.$('#span_roomName').html("<img src=\"http://quiver.outwar.com/images/ajax-loader.gif\" height=15px width=15px />");
					Loading++;
					this.parentNode.removeChild(this);
					var battleResults;
					GM_xmlhttpRequest({
						method: "GET",
						url: this.id,
						headers: {
						"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
						"Accept": "text/xml"            // If not specified, browser defaults will be used.
						},
						onload: function(response) {
							var data = response.responseText
							battleResults = getBattleResults(data);
							Append(battleResults);
						}
					});
				}, false);
				links[i].parentNode.appendChild(link);
				links[i].parentNode.removeChild(links[i]);				
			}
		}
}

function Append(data)
{
	Loading--;
	unsafeWindow.$("#attackDetails").append("<div class=\"Attack_" + attackbg + "\">" + data + "</div>");
	if(Loading <= 0)
	{
		unsafeWindow.$('#span_roomName').html("");
		refreshStats()
		Loading = 0;
	}
	if(attackbg == 1) attackbg = 2;
	else if(attackbg == 2) attackbg = 1;
	ScrollBottom("attackDetails")
}

function ScrollBottom(divid)
{
	var objDiv = document.getElementById(divid);
	objDiv.scrollTop = objDiv.scrollHeight;
}
function clearDiv(divid)
{
	var objDiv = document.getElementById(divid);
	objDiv.innerHTML = "";
}


function handler(e)
{

     x=e.keyCode;


    if(northRoom)
    {
	
            if (x==key1)
                gotoRoom(northRoom, curRoom);
            if (x==key2)
                gotoRoom(northRoom, curRoom);
    }
    if(southRoom)
    {
            if (x==key3)
                gotoRoom(southRoom, curRoom);
            if (x==key4)
                gotoRoom(southRoom, curRoom);
    }
    if(eastRoom)
    {
            if (x==key5)
                gotoRoom(eastRoom, curRoom);
            if (x==key6)
                gotoRoom(eastRoom, curRoom);
    }
    if(westRoom)
    {
            if (x==key7)
                gotoRoom(westRoom, curRoom);
            if (x==key8)
                gotoRoom(westRoom, curRoom);
    }
}



document.getElementById("whref").addEventListener("click", function () {
         if(northRoom)
            gotoRoom(northRoom, curRoom);
     }, false);

document.getElementById("shref").addEventListener("click", function () {
         if(southRoom)
            gotoRoom(southRoom, curRoom);
     }, false);

document.getElementById("ahref").addEventListener("click", function () {
         if(westRoom)
            gotoRoom(westRoom, curRoom);
     }, false);

document.getElementById("dhref").addEventListener("click", function () {
         if(eastRoom)
            gotoRoom(eastRoom, curRoom);
     }, false);
	 
document.getElementById("clear").addEventListener("click", function () {
         clearDiv("attackDetails")
     }, false);
	 
function getBattleResults(data)
{             
	var battle = "";
	var winnings = "";     
	if(data.indexOf('<font size="3"><b>WIN:') != -1)
	{
		var templootarray;
		templootarray = data.split('<font size="3"><b>WIN:')
		templootarray = templootarray[1].split('</b></font')
		winnings = templootarray[0];
		winnings = winnings.replace("<br>"," ")
	}
	if(data.indexOf('<div id="result_notice_window" style="display: block">') != -1)
	{	
		var temparray;
		temparray = data.split('<div id="result_notice_window" style="display: block">')
		temparray = temparray[1].split('</font></a></font></div></div>')
		var battle = temparray[0].replace("<img src=","<input type='hidden' ")
		battle = battle.replace("<br>"," ")
		battle = battle.replace("<br>"," ")
		battle = battle.replace("<br>"," ")
		battle = battle.replace("<br>"," ")
		battle = battle.replace("View Battle Actions"," ")
		battle = battle.replace("<div style=\"font-size:11pt;\">"," ")
	}
	else
	{
		return "Error";
	}
			
	return battle + " " + winnings;
}

function refreshStats() 
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://" + unsafeWindow.server + ".outwar.com/userstats.php",
		headers: {
		"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
		"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {

		if(response.responseText.indexOf("You must be logged in to use this page") != -1)
		{
			unsafeWindow.$('#error_login').show()
			unsafeWindow.$('#iBranch_content').hide();
			return;
		}
		else{
			unsafeWindow.$('#iBranch_content').show();
		}
			
		var stats = unsafeWindow.jQuery.parseJSON(response.responseText);

		unsafeWindow.$('#exp').html(stats.exp);
		unsafeWindow.$('#rage').html(stats.rage);
		unsafeWindow.$('#level').html(stats.level);
		}
	});
}

document.getElementById("AAM").addEventListener("click", function () {
	for (var i = 0; i < mobHref.length; i++) {
		unsafeWindow.$('#span_roomName').html("<img src=\"http://quiver.outwar.com/images/ajax-loader.gif\" height=15px width=15px />");
		attackAll(0)
	}
		mobLinks = [];
		mobHref = [];
}, false);

function attackAll(i)
{
		Loading++;
		var battleResults;
		document.getElementById(mobHref[i]).parentNode.removeChild(document.getElementById(mobHref[i]));
		GM_xmlhttpRequest({
			method: "GET",
			url: mobHref[i],
			headers: {
			"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
			},
				onload: function(response) {
				var data = response.responseText
				battleResults = getBattleResults(data);
				Append(battleResults);
				if(i < mobHref.length - 1)
				{
					attackAll(i + 1)
				}
				else
				{
					unsafeWindow.$('#span_roomName').html("");
				}
			}
		});
}

function checkVersion()
{
	var curVersion = unsafeWindow.$('#version').html();
	if(Version != curVersion)
	{
		unsafeWindow.$('#iBranch_version').show();
	}	
}		

unsafeWindow.$('#iBranch_content').show();
window.addEventListener('keydown', handler, true);
unsafeWindow.$('.error').hide();
gotoRoom(0,0);
refreshStats();
checkVersion();

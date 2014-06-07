// ==UserScript==
// @name           SoundGlee Staff Plugin
// @namespace      OriginNRG@SoundGlee
// @include        http://www.plug.dj/soundglee/
// @include        http://plug.dj/soundglee/
// @include        www.plug.dj/soundglee/
// @include        plug.dj/soundglee/
// @include        socketio.plug.dj/soundglee/
// @include        http://socketio.plug.dj/soundglee/
// @version        0.5.5
// @updateURL      https://originnrg.googlecode.com/files/SG_Staff_Plug.js
// @downloadURL    https://originnrg.googlecode.com/files/SG_Staff_Plug.js
// ==/UserScript==

// Coding by OriginNRG@SoundGlee and Asdboy@SoundGlee

setTimeout(function() {

var version = "Running SoundGlee Staff Script Version 0.5.5 BETA<br>Created for SoundGlee Staff Only.<BR>Do not share this out!";
var version2 = "ALL EXTRAS ARE NOW DISABLED. WE HAVE HAD TO HAVE A MASSIVE OVERHAUL OF RULES AND REGULATIONS. PLEASE READ THE NEW RULES IN THE INFO PANEL. ALL LINKS ETC FOR THIS SCRIPT WILL BE RE-ADDED AT A LATER DATE!";
var version3 = ".";
var changeLog = "Created by OriginNRG@SoundGlee based on BassPlug";
appendToChat(version, null, "#00E1FF");
appendToChat(version2, null, "#09FF00");
appendToChat(version3, null, "#FFFF00");

if(localStorage.getItem("soundglee") !== "yes"){
    soundgleeOptions = {};
    soundgleeOptions.autoWoot = true;
    soundgleeOptions.autoJoin = true;
    soundgleeOptions.autoRespond = false;
    soundgleeOptions.userlist = true;
    soundgleeOptions.hideVideo = false;
    soundgleeOptions.alerts = true;
    soundgleeOptions.stream = true;
    soundgleeOptions.menu = true;
    soundgleeOptions.debug = false;
    soundgleeOptions.strobe = false;
    soundgleeOptions.lights = false;
    soundgleeOptions.awayMessage = "";
}

soundGlee = {};
soundGlee.mehcount = 0;
soundGlee.recent = false;
soundGlee.recentEmotes = false;

var recent = false,
    awaymsg = "",
    autowoot = true,
    autoqueue = true,
    hideVideo = false,
    userList = true,
    autorespond = false,
    recentEmote = false,
    animation = true,
    menu = true,
    alerts = true,
    strobe = false,
    debug = false,
    lights = false;
    if (DB.settings.streamDisabled = false) {
        var streambuttoncolor = "#78E700";
        var stream = true;
    }else{
        var streambuttoncolor = "#ED1C24";
        var stream = false;
    }

function initAPIListeners()
{
    API.addEventListener(API.DJ_ADVANCE, djAdvanced);
    API.addEventListener(API.VOTE_UPDATE, function(obj) {
        if(debug){
            console.log("[SoundGlee] Updating user vote...");
        }
        if (API.getUser(obj.user.id).vote == -1)
            API.getUser(obj.user.id).mehcount++;
        if(debug){
            console.log("[SoundGlee] Adding to users meh count...");
        }
        if (userList)
            populateUserlist();
        if(debug){
            console.log("[SoundGlee] Populating Userlist...");
        }
    });
    API.addEventListener(API.CURATE_UPDATE, function(obj) {
        if (alerts) {
            var media = API.getMedia();
            log(obj.user.username + " added " + media.author + " - " + media.title);
            API.getUser(obj.user.id).curated=true;
            if (userList)
                populateUserlist();
            if(debug){
                console.log("[SoundGlee] Populating Userlist...");
            }
        }
    });
    API.addEventListener(API.USER_JOIN, function(user) {
        if (alerts){
            appendToChat(user.username + " joined the room", null, "#E90E82");
            if(debug){
                console.log("[SoundGlee] Displaying join alert");
            }
        }
        if(API.getUser(user.id).mehcount===undefined){
            API.getUser(user.id).mehcount=0
        }
        if (userList)
            populateUserlist();
        if(debug){
            console.log("[SoundGlee] Populating Userlist...");
        }
    });
    API.addEventListener(API.USER_LEAVE, function(user) {
        if (alerts){
            appendToChat(user.username + " left the room", null, "#E90E82");
        }
        if (userList)
            populateUserlist();
        if(debug){
            console.log("[SoundGlee] Populating Userlist...");
        }
    });
    API.addEventListener(API.DJ_ADVANCE, function(){
        if(strobe){
            $("#strobe-menu").click();
            strobe = false;
        }
        if(lights){
            $("#lights-menu").click();
            lights = false;
        }
    });
	if (typeof API != "undefined") {
	
	// see http://blog.plug.dj/api-documentation/
	console.log(API.getSelf());
	console.log("Chat Moderator Ready");
	
	API.addEventListener(API.CHAT, chatMod); // listen for new chat msg
	
	function chatMod(msg) {
		// test if message contains adf.ly link
		if(/adf.ly/i.test(msg.message)) {
			// delete the chat that contained one of the criteria
			API.moderateDeleteChat(msg.chatID);
			console.log(msg);
		}
		if(/shukbob.net/i.test(msg.message)) {
			// delete the chat that contained one of the criteria
			API.moderateDeleteChat(msg.chatID);
			console.log(msg);
		}
	  }
    }
    API.addEventListener(API.CHAT, disable);
}





function displayUI(data) {

    if (Models.room.data.staff[API.getSelf().id] >= Models.user.BOUNCER) {
        $('#user-container').prepend('<div id="plugbot-ui"></div>');
        $('#plugbot-ui').append(
				'<div id="plugbot-links" style="min-width: 120px; max-height: 98.6%; overflow-x: hidden; overflow-y: auto; position: fixed; z-index: 99; border-style: solid; border-width: 1px; border-color: #000; background-color: rgba(10, 10, 10, 0.5); border-right: 0 !important; padding: 0px 0px 12px 0px;">' +
				
            	'<p id="plugbot-btn-menu" style="color:#FF0066; "><b>SoundGlee</b></p>' +
                '<div style="width: 100%; visibility:visible">' +
                '<p id="plugbot-btn-woot" style="color:#78E700">AutoWoot</p>' +
				'<p id="plugbot-btn-queue" style="color:#78E700">AutoJoin</p>' +
                '<p id="plugbot-btn-hidevideo" style="color:#78E700">Hide Video</p>' +
                '<p id="plugbot-btn-userlist" style="color:#78E700">Userlist</p>' +
                '<p id="plugbot-btn-animationoff" style="color:#78E700">Animation</p>' +
                '<p id="plugbot-btn-stream" style="color:streambuttoncolor">Stream</p>' +
                '<p id="plugbot-btn-alerts" style="color:#78E700">Alerts</p>' +
				'</div>' +
				
				'<div id="plugbot-links2">' +
				'<p id="plugbot-btn-menu2" style="color:#FF0066; margin-top:20px;"><b>Sponsor</b></p>' +
				'<div style="width: 100%; visibility:visible">' +
				'<p id="plugbot-btn-soundgleewebsite" style="color:#FFA400;">Website</p>' +
				'<p id="plugbot-btn-facebook" style="color:#FFA400;">Facebook</p>' +
				'<p id="plugbot-btn-twitter" style="color:#FFA400">Twitter</p>' +
				'<p id="plugbot-btn-youtube" style="color:#FFA400">YouTube</p>' +
				'<p id="plugbot-btn-soundcloud" style="color:#FFA400">SoundCloud</p>' +
				'<p id="plugbot-btn-spreadshirt" style="color:#FFA400">SpreadShirt</p>' +
				'<p id="plugbot-btn-submissions" style="color:#FFA400">Submissions</p>' +
				'</div>' +
				
				'<p id="plugbot-btn-menu3" style="color:#FF0066; margin-top:20px;"><b>Help</b></p>' +
				'<div style="width: 100%; visibility:visible">' +
				'<p id="plugbot-btn-welcome" style="color:#3F92D2;">Welcome</p>' +
				'<p id="plugbot-btn-justwoot" style="color:#3F92D2;">WOOT</p>' +
				'<p id="plugbot-btn-chromead" style="color:#3F92D2;">Chrome AD</p>' +
				'<p id="plugbot-btn-bassplugad" style="color:#3F92D2">BassPlug AD</p>' +
				'<p id="plugbot-btn-winbooth" style="color:#3F92D2">Woot Booth</p>' +
				'</div>' +
				
				'<p id="plugbot-btn-menu4" style="color:#FF0066; margin-top:20px;"><b>Threshold</b></p>' +
				'<div style="width: 100%; visibility:visible">' +
				'<p id="plugbot-btn-5mehs" style="color:#AD66D5;">5 Mehs</p>' +
				'<p id="plugbot-btn-7mehs" style="color:#AD66D5">7 Mehs</p>' +
				'<p id="plugbot-btn-10mehs" style="color:#AD66D5">10 Mehs</p>' +
				'<p id="plugbot-btn-15mehs" style="color:#AD66D5">15 Mehs</p>' +
				'</div>' +
				
				'<p id="plugbot-btn-menu5" style="color:#FF0066; margin-top:20px;"><b>Commands</b></p>' +
				'<div style="width: 100%; visibility:visible">' +
				'<p id="plugbot-btn-lock" style="color:#ED1C24;">Lock</p>' +
				'<p id="plugbot-btn-unlock" style="color:#ED1C24">Unlock</p>' +
				'<p id="plugbot-btn-skip" style="color:#ED1C24">Skip</p>' +
				'<p id="plugbot-btn-lockskip" style="color:#ED1C24">Lock-Skip</p>' +
				'<p id="plugbot-btn-skiphistory" style="color:#ED1C24">History</p>' +
				'<p id="plugbot-btn-clearchat" style="color:#ED1C24">Clear Chat</p>' +
				'<p id="plugbot-btn-cap1" style="color:#ED1C24">Cap Min</p>' +
				'<p id="plugbot-btn-cap200" style="color:#ED1C24">Cap Max</p>' +
                '</div>' +
				
				'<p id="plugbot-btn-menu6" style="color:#FFFFFF; margin-top:20px;"><b>Other</b></p>' +
				'<div style="width: 100%; visibility:visible">' +
				'<p id="plugbot-btn-aboutplug" style="color:#FFFFFF">About Script</p>' +
                '</div>' +
                '</div>' +
				'</div>' 
        );
    }else{
        $('#user-container').prepend('<div id="plugbot-ui"></div>');
        $('#plugbot-ui').append(
            '<p id="plugbot-btn-menu" style="color:#E90E82 ">SoundGlee</p>' +
                '<div style="width: 100%; visibility:visible">' +
                '<p id="plugbot-btn-woot" style="color:#78E700">Autowoot</p>' +
                '<p id="plugbot-btn-queue" style="color:#ED1C24">Autojoin</p>' +
                '<p id="plugbot-btn-userlist" style="color:#78E700">Userlist</p>' +
                '<p id="plugbot-btn-animationoff" style="color:#78E700">Animation</p>' +
                '<p id="plugbot-btn-stream" style="color:streambuttoncolor">Stream</p>' +
                '<p id="plugbot-btn-alerts" style="color:#ED1C24">Alerts</p>' +
                '</div>'
        );
    }
    $('#dj-console').prepend('<div id="strobe"></div>');
    $('#strobe').append(
        '<p id="strobe-menu">Strobe</p>' +
            '<p id="lights-menu">Lights</p>' +
            '</div>'
    );
}
function initUIListeners()
{
    $("#strobe-menu") .hover(function(){
            $(this).css("border-style", "ridge");
            $(this).css("font-weight", "900");
        },
        function(){
            $(this).css("border-style", "solid");
            $(this).css("font-weight", "normal");
        });
    $("#lights-menu") .hover(function(){
            $(this).css("border-style", "ridge");
            $(this).css("font-weight", "900");
        },
        function(){
            $(this).css("border-style", "solid");
            $(this).css("font-weight", "normal");
        });
    $("#plugbot-btn-menu") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-menu7") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-ocommands") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-soundgleewebsite") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-oeta") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-olock") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-ounlock") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-cap1") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-cap200") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-clearchat") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-aboutplug") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-links") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-justwoot") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-menu2") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-menu3") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-menu4") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-menu5") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-menu6") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-woot") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-winbooth") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-queue") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-hidevideo") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-userlist") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-autorespond") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-animationoff") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-stream") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#plugbot-btn-alerts") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-facebook") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-twitter") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-youtube") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-soundcloud") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-spreadshirt") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-chromead") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-bassplugad") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-changename") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-addplaylist") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-wootad") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-welcome") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-youdj") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-themes") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-5mehs") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-7mehs") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-10mehs") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-15mehs") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-lock") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-unlock") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-skip") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-lockskip") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-submissions") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-aboutplug") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
		$("#plugbot-btn-rulesall") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-ruleswoot") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-ruleseng") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-rulesnospam") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-rules10mins") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-rulesemme") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
	$("#plugbot-btn-ruleshistory") .hover(function(){
            $(this).css("background-color", "rgba(39, 39, 39, 0.5)");
        },
        function(){
            $(this).css("background-color", "rgba(10, 10, 10, 0.5)");
        });
    $("#strobe-menu").on("click", function() {
        $(this).css("color", !strobe ? "#00FFDE" : "#3B3B3B");
        $(this).css("border-color", !strobe ? "#00FFDE" : "#3B3B3B");
        /*        $("#lights-menu").css("border-color", "#00FFDE");
         $("#lights-menu").css("color", "#00FFDE");*/
        if(!strobe){
            if(lights){
                $("#lights-menu").click();
            }
            RoomUser.audience.strobeMode(true);
            updateChat("","You hit the strobe!");
            strobe = true;
        }else{
            RoomUser.audience.strobeMode(false);
            strobe = false;
        }
    });
    $("#lights-menu").on("click", function() {
        $(this).css("color", !lights ? "#00FFDE" : "#3B3B3B");
        $(this).css("border-color", !lights ? "#00FFDE" : "#3B3B3B");
        /*$("#strobe-menu").css("border-color", "#00FFDE");
         $("#strobe-menu").css("color", "#00FFDE");*/
        if(!lights){
            if(strobe){
                $("#strobe-menu").click();
            }
            RoomUser.audience.lightsOut(true);
            updateChat("","You set the mood!");
            lights = true;
        }else{
            RoomUser.audience.lightsOut(false);
            lights = false;
        }
    });
    $("#plugbot-btn-userlist").on("click", function() {
        userList = !userList;
        $(this).css("color", userList ? "#78E700" : "#ED1C24");
        $("#plugbot-userlist").css("visibility", userList ? ("visible") : ("hidden"));
        $("#plugbot-userlist").css("overflow", userList ? ("auto") : ("hidden"));
        if (!userList)
            $("#plugbot-userlist").empty();
        else
            populateUserlist();
    });
    $("#plugbot-btn-woot").on("click", function() {
        autowoot = !autowoot;
        $(this).css("color", autowoot ? "#78E700" : "#ED1C24");
        if (autowoot) $("#button-vote-positive").click();
    });
    $("#plugbot-btn-hidevideo").on("click", function() {
        hideVideo = !hideVideo;
        $(this).css("color", hideVideo ? "#78E700" : "#ED1C24");
        $("#yt-frame").animate({"height": (hideVideo ? "0px" : "271px")}, {duration: "fast"});
    });
    $("#plugbot-btn-queue").on("click", function() {
        autoqueue = !autoqueue;
        $(this).css("color", autoqueue ? "#78E700" : "#ED1C24");
        $("#button-dj-waitlist-" + (autoqueue ? "join" : "leave")).click();
    });
    $("#plugbot-btn-autorespond").on("click", function() {
        autorespond = !autorespond;
        $(this).css("color", autorespond ? "#78E700" : "#ED1C24");
        if (!autorespond) {
            API.removeEventListener(API.CHAT,chat);
        } else {
            awaymsg = prompt("The message the you enter here will be sent if someone mentions you.\nAdd /user/ to the beginning of your afk message if you want to reply to the person who mentions you.","/me is away from keyboard.");
            if(awaymsg != null){
                !autorespond;
                $("#plugbot-btn-autorespond").css("color", autorespond, "#ED1C24");
                API.addEventListener(API.CHAT,chat);
            }
        }
    });
    $("#plugbot-btn-animationoff").on("click", function() {
        animation = !animation;
        $(this).css("color", !animation ? "#ED1C24" : "#78E700");
        if (!animation) {
            animSpeed = 999999999;
        } else {
            animSpeed = 83;
        }
    });
    $("#plugbot-btn-stream").on("click", function() {
        stream = !stream;
        $(this).css("color", !stream ? "#78E700" : "#ED1C24");
        if(stream){
            API.sendChat("/stream off");
        }else{
            API.sendChat("/stream on");
        }
    });
    $("#plugbot-btn-alerts").on("click", function() {
        $(this).css("color", !alerts ? "#78E700" : "#ED1C24");
        if(alerts){
            API.sendChat("/alertsoff");
        }else{
            API.sendChat("/alertson");
        }
    });
	$("#plugbot-btn-welcome").on("click", function() {
        Models.chat.sendChat("/em - Welcome, Rules of the Lobby can be found at Top Left of SoundGlee Radio by clicking \"Info\".");
    });
	$("#plugbot-btn-clearchat").on("click", function() {
        Models.chat.sendChat("/clear");
    });
	$("#plugbot-btn-cap1").on("click", function() {
        Models.chat.sendChat("/cap 1");
    });
	$("#plugbot-btn-cap200").on("click", function() {
        Models.chat.sendChat("/cap 200");
    });
	$("#plugbot-btn-facebook").on("click", function() {
        Models.chat.sendChat("/em - Like us on Facebook : http://bit.ly/SoundGleeFB");
    });
	$("#plugbot-btn-twitter").on("click", function() {
        Models.chat.sendChat("/em - Follow us on Twitter : http://bit.ly/10SMxNF");
    });
	$("#plugbot-btn-youtube").on("click", function() {
        Models.chat.sendChat("/em - Subscribe to us on YouTube : http://bit.ly/SoundGleeYT");
    });
	$("#plugbot-btn-soundcloud").on("click", function() {
        Models.chat.sendChat("/em - Follow us on SoundCloud: http://bit.ly/ZaNxWq");
    });
	$("#plugbot-btn-spreadshirt").on("click", function() {
        Models.chat.sendChat("/em - Buy SoundGlee Clothing here - http://soundglee.spreadshirt.com");
    });
	$("#plugbot-btn-chromead").on("click", function() {
        Models.chat.sendChat("/em - Got Chrome? Want to prevent from being kicked? Go get an AutoWoot! We recommend you use this Chrome Plugin: http://bit.ly/ZBdAIj");
    });
	$("#plugbot-btn-bassplugad").on("click", function() {
        Models.chat.sendChat("/em - Want to prevent from being kicked? Go get an AutoWoot! We recommend you use this Plugin: http://bit.ly/10TCAKV");
    });
	$("#plugbot-btn-changename").on("click", function() {
        Models.chat.sendChat("/em - You can change your Name + Avatar by clicking on your name to show the options at the bottom right of lobby!");
    });
	$("#plugbot-btn-winbooth").on("click", function() {
        Models.chat.sendChat("/em - When you are in the DJ booth - Remember to WOOT or MEH each song that is played until you are DJing or you will be removed.");
    });
	$("#plugbot-btn-addplaylist").on("click", function() {
        Models.chat.sendChat("/em - Would you like to add this to your playlist? Click \"Add this\" at the TOP LEFT");
    });
	$("#plugbot-btn-wootad").on("click", function() {
        Models.chat.sendChat("/em - WOOT! to make your avatar dance and earn points to unlock new avatars!");
    });
	$("#plugbot-btn-youdj").on("click", function() {
        Models.chat.sendChat("/em - Would you like to be the DJ? If so add songs to your playlist by clicking \"My Playlist\" at top left. Add songs then click DJ button bottom right of the SoundGlee Lobby.");
    });
	$("#plugbot-btn-featureddj").on("click", function() {
        Models.chat.sendChat("/em - Featured DJs are Featured on SoundGlee's YouTube! - If it is your birthday you get featured for a day!");
    });
	$("#plugbot-btn-themes").on("click", function() {
        Models.chat.sendChat("/em - Theme: Any videos can be played in our room. As long as your song doesn't reach the Meh threshold then it won't be skipped.");
    });
	$("#plugbot-btn-5mehs").on("click", function() {
        Models.chat.sendChat("/em - 5 Mehs = Skip current track!");
    });
	$("#plugbot-btn-7mehs").on("click", function() {
        Models.chat.sendChat("/em - 7 Mehs = Skip current track!");
    });
	$("#plugbot-btn-10mehs").on("click", function() {
        Models.chat.sendChat("/em - 10 Mehs = Skip current track!");
    });
	$("#plugbot-btn-15mehs").on("click", function() {
        Models.chat.sendChat("/em - 15 Mehs = Skip current track!");
    });
	$("#plugbot-btn-justwoot").on("click", function() {
        Models.chat.sendChat("/em - WOOT!");
    });
	$("#plugbot-btn-whatmehs").on("click", function() {
        alert("Meh Thresholds (This can vary depending how many listeners are AFK but this is a general rule)\n\n0-20 Listeners - 5 Mehs\n20-50 Listeners - 7 Mehs\n50-100 Listeners - 10/15 Mehs\n100+ Listeners - 15/20 Mehs");
    });
	$("#plugbot-btn-submissions").on("click", function() {
        Models.chat.sendChat("/em - Use our DropBox function to submit songs instantly via SoundCloud - http://bit.ly/ZdKrHS or email us at submissions@soundglee.com");
    });
	$("#plugbot-btn-rulesall").on("click", function() {
        setTimeout(function(){
                Models.chat.sendChat("/em - SoundGlee Lobby Rules!");
            }, 100);
		setTimeout(function(){
                Models.chat.sendChat("/em - 1. Woot if you are in the DJ Booth!");
            }, 1100);
		setTimeout(function(){
                Models.chat.sendChat("/em - 2. English language only in chat");
            }, 2100);
		setTimeout(function(){
                Models.chat.sendChat("/em - 3. No Spam/Advertising links in chat");
            }, 3100);
		setTimeout(function(){
                Models.chat.sendChat("/em - 4. Max 10 mins Song");
            }, 4100);
		setTimeout(function(){
                Models.chat.sendChat("/em - 5. Dont use /me or /em (SoundGlee Plug.dj Staff Only)");
            }, 5100);
		setTimeout(function(){
                Models.chat.sendChat("/em - 6. Do not play songs that are on the recent history.");
            }, 6100);
    });
	$("#plugbot-btn-soundgleewebsite").on("click", function() {
        Models.chat.sendChat("/em - Visit our Website! - http://www.soundglee.com");
    });
	$("#plugbot-btn-ruleswoot").on("click", function() {
        Models.chat.sendChat("/em - RULE: Woot if you are in the DJ booth!");
    });
	$("#plugbot-btn-ruleseng").on("click", function() {
        Models.chat.sendChat("/em - RULE: English language only in chat.");
    });
	$("#plugbot-btn-rulesnospam").on("click", function() {
        Models.chat.sendChat("/em - RULE: No Spam/Advertising links in chat.");
    });
	$("#plugbot-btn-rules10mins").on("click", function() {
        Models.chat.sendChat("/em - RULE: Max 10 mins Song.");
    });
	$("#plugbot-btn-rulesemme").on("click", function() {
        Models.chat.sendChat("/em - RULE: Dont use /me - /em (SoundGlee Plug.dj Staff Only)");
    });
	$("#plugbot-btn-ruleshistory").on("click", function() {
        Models.chat.sendChat("/em - RULE: Do not play songs that are on the recent history.");
    });
	$("#plugbot-btn-oeta").on("click", function() {
        Models.chat.sendChat("/eta");
    });
	$("#plugbot-btn-olock").on("click", function() {
        Models.chat.sendChat("/olock");
    });
	$("#plugbot-btn-ounlock").on("click", function() {
        Models.chat.sendChat("/ounlock");
    });
	$("#plugbot-btn-lock").on("click", function() {
        if (Models.room.data.staff[API.getSelf().id] > 2){
            new RoomPropsService(Slug,true,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
            return true;
        }else{
            modChat("","Sorry, you have to be at least a manager to do that.");
            return true;
        }
    });
	$("#plugbot-btn-unlock").on("click", function() {
       	 if (Models.room.data.staff[API.getSelf().id] > 2){
       	     new RoomPropsService(Slug,false,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
       	     return true;
      	  }else{
      	      modChat("","Sorry, you have to be at least a manger to do that");
      	      return true;
     	   }
    });
	$("#plugbot-btn-skip").on("click", function() {
        if (Models.room.data.staff[API.getSelf().id] > 1){
            new ModerationForceSkipService();
            return true;
        }else{
            modChat("","Sorry, you have to be at least a bouncer to do that.");
            return true;
        }
    });
	$("#plugbot-btn-lockskip").on("click", function() {
        if (Models.room.data.staff[API.getSelf().id] > 2){
            new RoomPropsService(Slug,true,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
            setTimeout(function(){
                new ModerationForceSkipService();
            }, 100);
            setTimeout(function(){
                new RoomPropsService(Slug,false,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
            },300);
            return true;
        }else{
            modChat("", "Sorry, you have to be at least a manager to do that.");
            return true;
        }
    });
	$("#plugbot-btn-ocommands").on("click", function() {
        alert("O Commands (Origin Commands)\n\nThese commands are only available when OriginNRG@SoundGlee is online as these are commands that interact with his script.\n\nCodes subject to change.");
    });
	$("#plugbot-btn-aboutplug").on("click", function() {
        alert("SoundGlee Plug BETA 0.5.5 (June 2013)\nFor SoundGlee Staff only!\n\nOriginal base code by ,DerpTheBass'\n\nEdited by OriginNRG@SoundGlee\n\nThanks to all SoundGlee Staff!");
    });
	

	
}

function addGlobalStyle(css){
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if(!head){
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
{
    //Changes the look of plug
    addGlobalStyle('#button-chat-collapse, #button-chat-collapse {background: url(http://i.imgur.com/jqbkAOH.png);');
    addGlobalStyle('#button-chat-expand, #button-chat-expand {background: url(http://i.imgur.com/6dFswPF.png);');
    addGlobalStyle('#chat, #chat {border-style: solid; border-width: 1px; border-color: #000; ');
    addGlobalStyle('#playback, #playback {border-style: solid; border-width: 1px; border-color: #000; ');
    addGlobalStyle('#meta-frame, #meta-frame {border-style: solid; border-width: 1px; border-color: #000; ');
    addGlobalStyle('#user-container, #user-container {border-style: solid; border-width: 1px; border-color: #000; ');
    addGlobalStyle('#meta-frame, #meta-frame {width: 349px;}');
    addGlobalStyle('.frame-background, .frame-background {opacity: 0.83;}');
	addGlobalStyle('#room-wheel, #room-wheel {background-image: max-height:0px;max-width:0px;}');
	addGlobalStyle('#dj-console, #dj-console {background-image: url(http://i.imgur.com/IpyhanS.gif);min-height:33px;min-width:131px;}');
	//addGlobalStyle('html{background: url("") no-repeat scroll center top #424242;');
//Changes the color of user's names in chat
    addGlobalStyle('.chat-from-featureddj, .chat-from-featureddj {color: #00B8FF !important;}');
    addGlobalStyle('.chat-from-manager, .chat-from-manager {color: #04BD04 !important;}');
    addGlobalStyle('.chat-from-cohost, .chat-from-cohost {color: #C807D1 !important;}');
    addGlobalStyle('.chat-from-host, .chat-from-host {color: #7B00FF !important;}');
//Changes the icons and background color
    addGlobalStyle('.chat-host, .chat-host {background-image: url(http://i.imgur.com/zSFh9Kv.png); no repeat 0 5px);}');
    addGlobalStyle('.chat-cohost, .chat-cohost {background-image: url(http://i.imgur.com/zSFh9Kv.png); no repeat 0 5px;}');
    addGlobalStyle('.chat-manager, .chat-manager {background-image: url(http://i.imgur.com/ClBhjpm.png); no repeat 0 5px;}');
	addGlobalStyle('.chat-bouncer, .chat-bouncer {background-image: url(http://i.imgur.com/AmyqdG9.png); no repeat 0 5px;}');
    addGlobalStyle('.chat-message:nth-child(2n), .chat-message:nth-child(2n) {background-color: rgba(0, 0, 0, 0.45);}');
    addGlobalStyle('.chat-update:nth-child(2n), .chat-update:nth-child(2n) {background-color: rgba(0, 0, 0, 0.45);}');
    addGlobalStyle('.chat-mention:nth-child(1n), .chat-mention:nth-child(1n) {background-color: rgba(82, 0, 255, 0.12);}');
    addGlobalStyle('.chat-moderation:nth-child(1n), .chat-moderation:nth-child(1n) {background-color: rgba(255, 0, 0, 0.09);}');
    addGlobalStyle('.chat-skip:nth-child(1n), .chat-skip:nth-child(1n) {background-color: rgba(255, 0, 0, 0.09);}');
    addGlobalStyle('.chat-emote:nth-child(2n), .chat-emote:nth-child(2n) {background-color: rgba(0, 0, 0, 0.45);}');
}

var words = {
// Syntax: 'Search word' : 'Replace word',
"SoundGlee Music Network" : "SoundGlee Staff Script 0.5.5",
"When you DJ you will play..." : "Up Next...",
"©2012 Plug DJ, LLC." : "©2013 SoundGlee",
"Points" : "Points",
"Now Playing" : "Now Playing",
"Time Remaining" : "Time Remaining",
"Volume" : "Volume",
"Current DJ" : "Current DJ",
"Crowd Response" : "Crowd Response",
"Fans":"Fans"};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}

function djAdvanced(obj) {
    setTimeout(function() {
        if (hideVideo) {
            $("#yt-frame").css("height", "0px");
            $("#playback .playback-container").css("opacity", "0.0");
        }
        if (autowoot) {
            var dj = API.getDJs()[0];
            if (dj === null) return;
            if (dj == API.getSelf()) return;
            $('#button-vote-positive').click();
        }
        if ($("#button-dj-waitlist-join").css("display") === "block" && autoqueue)
            $("#button-dj-waitlist-join").click();
    },100);
    if (userList)
        populateUserlist();
}

function populateUserlist()
{

    $('#plugbot-userlist').html(' ');
    $('#plugbot-userlist').append('<h1 style="text-indent:12px;color:#E90E82;font-size:14px;font-variant:small-caps;">Users: ' + API.getUsers().length + '</h1>');
    if ($('#button-dj-waitlist-view').attr('title') !== '') {
        if ($('#button-dj-waitlist-leave').css('display') === 'block' && ($.inArray(API.getDJs(), API.getSelf()) == -1)) {
            var spot = $('#button-dj-waitlist-view').attr('title').split('(')[1];
            spot = spot.substring(0, spot.indexOf(')'));
            $('#plugbot-userlist').append('<h1 id="plugbot-queuespot"><span style="font-variant:small-caps;color:#E90E82;">Waitlist: ' + spot + '</span>');
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
        case 0:        // Normal user
            imagePrefix = 'normal'
            break;
        case 1:        // Featured DJ
            imagePrefix = 'featured';
            break;
        case 2:    	// Bouncer
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
        return '#DDDDDD'; // blame Boycey
    }
    switch (vote) {
        case -1: 	return '#F43636';
        case 0:		return '#DDDDDD';
        case 1:		return '#95F436';
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
        $('#plugbot-userlist').append('<img src="' + realPath + '" align="left" style="margin-left:6px; position: absolute; margin-top: .3%;" />');
    }
    $('#plugbot-userlist').append(
			 '<p style="cursor:pointer;' + (imagePath === 'void' ? '' : 'text-indent:24px !important;')
            + 'color:' + color + ';'
            + ((API.getDJs()[0].username == username) ? 'font-size:12px;font-weight:bold;' : '')
            + '">'
			+ '<a onclick="javascript:Models.chat.sendChat(\'@' + username + ' Woot or Meh to remain in the DJ Booth Please!\');">'
		    + '<img src="http://i.imgur.com/tb8qHjT.png"></a> '
			+ ' <a style="color:' + color + ';" onclick="$(\'#chat-input-field\').val($(\'#chat-input-field\').val() + \'@' + username + ' \').focus();">' + username + '</a> '
			+ ' </p>'
    );
}

/*AppendToChat*/
function appendToChat(message, from, color){
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
}
/*Different chat message types*/
var systemChat = function(from, message){
    Models.chat.receive({
        type: "system",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
var messageChat = function(from, message){
    Models.chat.receive({
        type: "message",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
var emoteChat = function(from, message){
    Models.chat.receive({
        type: "emote",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
var modChat = function(from, message){
    Models.chat.receive({
        type: "moderation",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
var mentionChat = function(from, message){
    Models.chat.receive({
        type: "mention",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
var skipChat = function(from, message){
    Models.chat.receive({
        type: "skip",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
var updateChat = function(from, message){
    Models.chat.receive({
        type: "update",
        from: from,
        message: message,
        language: Models.user.data.language
    })
};
/*ChatCommands*/
var customChatCommand = function(value) {
    if (Models.chat._chatCommand(value) === true)
        return true;
    if (value.indexOf("/cmd") === 0) {
        appendToChat("<center><strong>User Commands -</strong></center><br>" +
            "<strong>'/change'</strong> - <em>displays the changelog for this version</em><br>" +
            "<strong>'/deltab'</strong> - <em>Deletes the P.P userlist tab</em><br>" +
            "<strong>'/nick'</strong> - <em>change username</em>" +
            "<strong>'/avail'</strong> - <em>set status available</em><br>" +
            "<strong>'/afk'</strong> - <em>set status afk</em><br>" +
            "<strong>'/work'</strong> - <em>set status working</em><br>" +
            "<strong>'/sleep'</strong> - <em>set status sleeping</em><br>" +
            "<strong>'/join'</strong> - <em>joins dj booth/waitlist</em><br>" +
            "<strong>'/leave'</strong> - <em>leaves dj booth/waitlist</em><br>" +
            "<strong>'/strobe'</strong> - <em>toggles the strobe (for you only)</em><br>" +
            "<strong>'/lights'</strong> - <em>toggles the lights (for you only)</em><br>" +
            "<strong>'/woot'</strong> - <em>woots current song</em><br>" +
            "<strong>'/meh'</strong> - <em>mehs current song</em><br>" +
            "<strong>'/curate'</strong> - <em>adds the current song to your active playlist</em><br>" +
            "<strong>'/emotes'</strong> - <em>prints the commands for chat responses</em><br>" +
            "<strong>'/fan @(username)'</strong> - <em>fans the targeted user</em><br>" +
            "<strong>'/unfan @(username)'</strong> - <em>unfans the targeted user</em><br>" +
            "<strong>'/hide'</strong> - <em>hides the video without muting the sound</em><br>" +
            "<strong>'/ref'</strong> - <em>refreshes the video/soundcloud</em><br>" +
            "<strong>'/alertsoff'</strong> - <em>turns curate notices and user join/leave messages off</em><br>" +
            "<strong>'/alertson'</strong> - <em>turns curate notices and user join/leave messages on</em><br>" +
            "<strong>'/edit on'</strong> - <em>Turns on editing mode, it will allow you to edit mostly anything on the page</em><br>" +
            "<strong>'/edit off'</strong> - <em>Turns off editing mode</em><br>" +
            "<strong>'/getpos'</strong> - <em>get current waitlist position</em><br>" +
            "<strong>'/version'</strong> - <em>displays version number</em><br>", null, "#F700FA");
        if (Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 1) {
            appendToChat("<center><strong>Moderation Commands -</strong></center><br>" +
                "<strong>'/skip'</strong> - <em>skips current song</em><br>" +
                "<strong>'/kick @(username)'</strong> - <em>kicks targeted user</em><br>" +
                "<strong>'/add @(username)'</strong> - <em>adds targeted user to dj booth/waitlist</em><br>" +
                "<strong>'/remove @(username)'</strong> - <em>removes targeted user from dj booth/waitlist</em><br>" +
                "<strong>'/whois @(username)'</strong> - <em>gives general information about user</em><br>", null, "#FF0000");
            if(Models.room.data.staff[API.getSelf().id] && Models.room.data.staff[API.getSelf().id] > 2) {
                appendToChat("<strong>'/lock'</strong> - <em>locks the DJ booth</em><br>" +
                    "<strong>'/unlock'</strong> - <em>unlocks the DJ booth</em><br>" +
                    "<strong>'/lockskip'</strong> - <em>Locks the DJ booth, skips, and unlocks</em><br>"
                    , null, "#FF0000");
            }
        }
        return true;
    }
    if (value.indexOf("/emotes") === 0) {
        appendToChat("<center><strong>Emotes -</strong></center>" +
            "<strong>'/wut'</strong> - <em>Willett must have said something, you give a look of disgust</em><br>" +
            "<strong>'/eyeroll'</strong> - <em>You roll your eyes in dissaproval</em><br>" +
            "<strong>'/boxofwats'</strong> - <em>You lack the vocabulary to describe how weird that last post was, so you provide a box of wats instead</em><br>" +
            "<strong>'/420'</strong> - <em>You look a little high...</em><br>" +
            "<strong>'/yuno'</strong> - <em>Y U NO USE THIS EMOTES!?</em><br>" +
            "<strong>'/fans'</strong> - <em>That random foreign guy keeps asking for fans again, help him out!</em><br>" +
            "<strong>'/cry'</strong> - <em>Dem feels</em><br>" +
            "<strong>'/throw'</strong> - <em>You thow an unkown object out of the chatbox</em><br>" +
            "<strong>Protip: </strong>Replace the slash in front of a command with a '.' and put a message after it to add the emote to the message!"
            , null, "#66FFFF");
        return true;
    }
//Response commands
    if (/^.wut (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function() {API.sendChat(RegExp.$1+" ಠ_ಠ")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (/^.fans (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function() {API.sendChat(RegExp.$1+" Have some fans http://i.imgur.com/XHyZS.jpg , http://i.imgur.com/4g3Ir.jpg , http://i.imgur.com/VSn0o.jpg")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (/^.throw (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function() {API.sendChat(RegExp.$1+" (ノಠ益ಠ)ノ彡 ")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (/^.eyeroll (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat(RegExp.$1+" ¬_¬")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (/^.cry (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat(RegExp.$1+" ಥ_ಥ")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (/^.420 (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat(RegExp.$1+" ≖‿≖")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (/^.yuno (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat(RegExp.$1+" ლ(ಥ益ಥლ)")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (/^.boxofwats (.*)$/.exec(value)) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat(RegExp.$1+" (>-_-)>[wats]")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }

    /******************************************************************************************/
    if (value.indexOf("/throw") === 0) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat("/me (ノಠ益ಠ)ノ彡")}, 50);
            recentEmote = true;
            setTimeout(function(){recentEmote = false;},60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (value.indexOf("/wut") === 0) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat("/me  ಠ_ಠ ")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (value.indexOf("/420") === 0) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat("/me ≖‿≖")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (value.indexOf("/eyeroll") === 0) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat("/me ¬_¬")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (value.indexOf("/boxofwats") === 0) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat("/me (>-_-)>[wats]")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (value.indexOf("/yuno") === 0) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat("/me ლ(ಥ益ಥლ)")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    if (value.indexOf("/cry") === 0) {
        if(!recentEmote){
            setTimeout(function(){API.sendChat("/me ಥ_ಥ")}, 50);
            recentEmote = true;
            setTimeout(function(){ recentEmote = false; },60000);
            return true;
        }else{
            appendToChat("Wait until the emote timer is done!", null, "#C50000");
            return true;
        }
    }
    //Moderation
    if (value.indexOf("/lockskip") === 0){
        if (Models.room.data.staff[API.getSelf().id] > 2){
            new RoomPropsService(Slug,true,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
            setTimeout(function(){
                new ModerationForceSkipService();
            }, 100);
            setTimeout(function(){
                new RoomPropsService(Slug,false,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
            },300);
            return true;
        }else{
            modChat("", "Sorry, you have to be at least a manager to do that.");
            return true;
        }
    }
    if (value.indexOf("/fixbooth") === 0){
        if (Models.room.data.staff[API.getSelf().id] > 2){
            var fixOver = false;
            fixBooth();
            return true;
        }else{
            modChat("", "Sorry, you have to be at least a manager to do that.");
            return true;
        }
    }
    if (value.indexOf("/cancelfix") === 0){
        if (Models.room.data.staff[API.getSelf().id] > 2){
            cancelFix = true;
            API.sendChat("/me FixBooth Canceled");
            return true;
        }else{
            modChat("", "Sorry, you have to be at least a manager to do that.");
            return true;
        }
    }
    if (value.indexOf("/skip") === 0) {
        if (Models.room.data.staff[API.getSelf().id] > 1){
            new ModerationForceSkipService();
            return true;
        }else{
            modChat("","Sorry, you have to be at least a bouncer to do that.");
            return true;
        }
    }
	if (value.indexOf("/history") === 0) {
        if (Models.room.data.staff[API.getSelf().id] > 1){
            new ModerationForceSkipService();
			Models.chat.sendChat("/em - This track is still in the history, please check next time!");
            return true;
        }else{
            modChat("","Sorry, you have to be at least a bouncer to do that.");
            return true;
        }
    }
    if (/^\/kick @(.*)$/.exec(value)) {
        if (Models.room.data.staff[API.getSelf().id] > 1){
            reg = RegExp.$1;
            target = reg.trim();
            kick();
            return true;
        }else{
            modChat("","Sorry, you have to be at least a bouncer to do that.");
            return true;
        }
    }
    if (/^\/remove @(.*)$/.exec(value)) {
        if (Models.room.data.staff[API.getSelf().id] > 1){
            reg = RegExp.$1;
            target = reg.trim();
            removedj();
            return true;
        }else{
            modChat("","Sorry, you have to be at least a bouncer to do that.");
            return true;
        }
    }
    if (/^\/add @(.*)$/.exec(value)) {
        if (Models.room.data.staff[API.getSelf().id] > 1){
            reg = RegExp.$1;
            target = reg.trim();
            adddj();
            return true;
        }else{
            modChat("","Sorry, you have to be at least a bouncer to do that.");
            return true;
        }
    }
    if (/^\/whois @(.*)$/.exec(value)) {
        if (Models.room.data.staff[API.getSelf().id] > 1){
            reg = RegExp.$1;
            target = reg.trim();
            getuserinfo();
            return true;
        }else{
            modChat("","Sorry, you have to be at least a bouncer to do that.");
            return true;
        }
    }
    if (value.indexOf("/lock") === 0) {
        if (Models.room.data.staff[API.getSelf().id] > 2){
            new RoomPropsService(Slug,true,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
            return true;
        }else{
            modChat("","Sorry, you have to be at least a manager to do that.");
            return true;
        }
    }
    if (value.indexOf("/unlock") === 0) {
        if (Models.room.data.staff[API.getSelf().id] > 2){
            new RoomPropsService(Slug,false,Models.room.data.waitListEnabled,Models.room.data.maxPlays,Models.room.data.maxDJs);
            return true;
        }else{
            modChat("","Sorry, you have to be at least a manger to do that");
            return true;
        }
    }
    //Misc
    if (/^\/fan @(.*)$/.exec(value)) {
        reg = RegExp.$1;
        target = reg.trim();
        fan();
        return true;
    }
    if (/^\/unfan @(.*)$/.exec(value)) {
        reg = RegExp.$1;
        target = reg.trim();
        unfan();
        return true;
    }
    if (value.indexOf("/strobe") === 0){
        $("#strobe-menu").click();
        return true;
    }
    if (value.indexOf("/edit on") === 0){
        document.body.contentEditable=true;
        return true;
    }
    if (value.indexOf("/edit off") === 0){
        document.body.contentEditable=false;
        return true;
    }
    if (value.indexOf("/lights") === 0){
        $("#lights-menu").click();
        return true;
    }
    if (value.indexOf("/change") === 0) {
        appendToChat(changeLog, null, "#BAFFAB");
        return true;
    }
    if (value.indexOf("/deltab") === 0) {
        var div = document.getElementById("pdpUsersToggle");
        div.parentNode.removeChild(div);
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
    if (value.indexOf("/woot") === 0) {
        $("#button-vote-positive").click();
        return true;
    }
    if (value.indexOf("/meh") === 0) {
        $("#button-vote-negative").click();
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
    var playlistID = Models.playlist.getSelected().id;
    if (value.indexOf("/curate") === 0) {
        new DJCurateService(playlistID);
        setTimeout(function(){Dialog.closeDialog();}, 1000);
        return true;
    }
    if (value.indexOf("/alertsoff") === 0)
        if (alerts){
            appendToChat("Join/leave/curate alerts disabled", null, "#FFFF00");
            alerts = false;
            return true;
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
        if (!alerts){
            appendToChat("Join/leave/curate alerts enabled", null, "#FFFF00");
            alerts = true;
        }
        return true;
    }
    return false;
};

Models.chat._chatCommand = Models.chat.chatCommand;
Models.chat.chatCommand = customChatCommand;
ChatModel._chatCommand = ChatModel.chatCommand;

/*AFK Status*/
function chat(data) {
    if (data.type == "mention" && !recent) {
        if (/^\/user\/ (.*)$/.exec(awaymsg)) {
            setTimeout(function() {API.sendChat("@"+data.from+" "+RegExp.$1)}, 50);
            recent = true;
            setTimeout(function(){recent=false;},180000);
        }else if(!recent){
            API.sendChat(awaymsg);
            recent = true;
            setTimeout(function() { recent = false; },180000);
        }
    }
}

//Fan / Unfan
function fan(data) {
    var usernames = [],id = [],users = API.getUsers();
    for (var i in users) {
        usernames.push(users[i].username);
        id.push(users[i].id);
    }
    if (usernames.indexOf(target) < 0) log("user not found");
    else {
        listlocation = usernames.indexOf(target);
        new UserFanService("fan", id[listlocation]);
    }
}

function unfan(data) {
    var usernames = [],id = [],users = API.getUsers();
    for (var i in users) {
        usernames.push(users[i].username);
        id.push(users[i].id);
    }
    if (usernames.indexOf(target) < 0) log("user not found");
    else {
        listlocation = usernames.indexOf(target);
        new UserFanService("unfan", id[listlocation]);
    }
}
/*AutoJoin Disable/Enable*/
function disable(data) {
    if (data.type == "mention" && Models.room.data.staff[data.fromID] && Models.room.data.staff[data.fromID] >= Models.user.BOUNCER && data.message.indexOf("!disable") > 0) {
        if (autoqueue) {
            $("#plugbot-btn-queue").click();
            setTimeout(function(){ Dialog.closeDialog(); },500);
            API.waitListLeave();
            API.sendChat("@" + data.from + " Autojoin disabled");
        } else
            API.sendChat("@" + data.from + " Autojoin was not enabled");
    }
    if (data.message.indexOf("-strobe on") === 0 && data.fromID === "50aeb07e96fba52c3ca04ca8") {
        if(lights){
            RoomUser.audience.lightsOut(false);
        }
        if (!strobe){
            RoomUser.audience.strobeMode(true);
            updateChat("",",DerpTheBass' hit the strobe!");
            strobe = true;
        }else{
            updateChat("Strobe is already on!");
        }
    }
    if (data.message.indexOf("-strobe off") === 0 && data.fromID === "50aeb07e96fba52c3ca04ca8") {
        if(lights){
            RoomUser.audience.lightsOut(false);
        }
        if (strobe){
            RoomUser.audience.strobeMode(false);
            strobe = false;
        }
    }
    if (data.message.indexOf("-lights on") === 0 && data.fromID === "50aeb07e96fba52c3ca04ca8") {
        if (!lights){
            if(strobe){
                RoomUser.audience.strobeMode(false);
            }
            RoomUser.audience.lightsOut(true);
            updateChat("",",DerpTheBass' set the mood");
            lights = true;
        }
    }
    if (data.message.indexOf("-lights off") === 0 && data.fromID === "50aeb07e96fba52c3ca04ca8") {
        if (lights){
            if(strobe){
                RoomUser.audience.strobeMode(false);
            }
            RoomUser.audience.lightsOut(false);
            lights = false;
        }
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
/*History Check*/
Models.history.load();
var skippedsongs = [];
API.addEventListener(API.DJ_UPDATE, repeatcheck);
function repeatcheck(user) {
    var historylist=Models.history.data;
    var currentID=Models.room.data.media.cid;
    for(var j=1; j<49;j++) {
        if (historylist[j].media.cid == currentID) {
            if ($.inArray(currentID, skippedsongs) == -1) {
                systemChat("","This song is still in the history ("+j+"/50)");
                if (Models.room.data.staff[API.getSelf().id] > 1) {systemChat("", "Type /history to skip this");}
				systemChat("","Please double check the history playlist to see if this message is true!");
                skippedsongs.push(currentID);
                break;
            }
        }
    }
}

//Fixbooth
function fixBooth(){
    fixover = false;
    var DJName = API.getDJs()[0].username;
    var boothFix = prompt("1st name is the user who will be put on deck. The 2nd name is optional and is the user who the first name will replace.", "User1 ||| User2");
    var fixUser = boothFix.split(" ||| ", 5);
    firstUser = fixUser[0];
    secondUser = fixUser[1];
    if (!fixover && boothFix != null) {
        if (boothFix.indexOf(" ||| ") > -1) {
            API.sendChat("/em - Registering FixBooth: Replacing " + secondUser + " with " + firstUser);
            if (DJName === secondUser) {
                API.addEventListener(API.DJ_ADVANCE, boothAdvanceA);
                new RoomPropsService(Slug, true, Models.room.data.waitListEnabled, Models.room.data.maxPlays, Models.room.data.maxDJs);
                function boothAdvanceA() {
                    setTimeout(function () {
                        API.sendChat("/remove " + secondUser);
                    }, 50);
                    setTimeout(function () {
                        API.sendChat("/add " + firstUser);
                    }, 100);
                    setTimeout(function () {
                        new RoomPropsService(Slug, false, Models.room.data.waitListEnabled, Models.room.data.maxPlays, Models.room.data.maxDJs);
                    }, 150);
                    setTimeout(function () {
                        fixover = true;
                        API.removeEventListener(API.DJ_ADVANCE, boothAdvanceA);
                    }, 200);
                }
            } else {
                API.addEventListener(API.DJ_ADVANCE, boothAdvanceB);
                function boothAdvanceB() {
                    if (DJName === secondUser) {
                        API.sendChat("true");
                        API.addEventListener(API.DJ_ADVANCE, boothAdvanceC);
                        new RoomPropsService(Slug, true, Models.room.data.waitListEnabled, Models.room.data.maxPlays, Models.room.data.maxDJs);
                        function boothAdvanceC() {
                            setTimeout(function () {
                                API.sendChat("/remove " + secondUser);
                            }, 50);
                            setTimeout(function () {
                                API.sendChat("/add " + firstUser);
                            }, 100);
                            setTimeout(function () {
                                new RoomPropsService(Slug, false, Models.room.data.waitListEnabled, Models.room.data.maxPlays, Models.room.data.maxDJs);
                            }, 150);
                            setTimeout(function () {
                                fixover = true;
                                API.removeEventListener(API.DJ_ADVANCE, boothAdvanceC);
                                API.removeEventListener(API.DJ_ADVANCE, boothAdvanceB);
                            }, 200);
                        }
                    }
                }
            }
        } else {
            API.sendChat("/em - Registering FixBooth: Replacing " + DJName + " with " + firstUser);
            new RoomPropsService(Slug, true, Models.room.data.waitListEnabled, Models.room.data.maxPlays, Models.room.data.maxDJs);
            API.addEventListener(API.DJ_ADVANCE, boothAdvanceD);
            function boothAdvanceD() {
                setTimeout(function () {
                    new ModerationRemoveDJService(API.getDJs()[1].id);
                }, 50);
                setTimeout(function () {
                    API.sendChat("/add " + firstUser);
                }, 100);
                setTimeout(function () {
                    new RoomPropsService(Slug, false, Models.room.data.waitListEnabled, Models.room.data.maxPlays, Models.room.data.maxDJs);
                }, 150);
                setTimeout(function () {
                    fixover = true;
                    API.removeEventListener(API.DJ_ADVANCE, boothAdvanceD);
                }, 200);
            }
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

for(index in API.getUsers()){if (API.getUsers()[index].mehcount==undefined){API.getUsers()[index].mehcount=0}}

/*Large Chat*/
function displayUI2(){
    var btn = document.createElement('div');
	
	//rotate an element
	function rotate(el, angle)
	{
		$(el).css({
			'-webkit-transform': 'rotate(' + angle + 'deg)',
			'-moz-transform': 'rotate(' + angle + 'deg)',
			'-ms-transform': 'rotate(' + angle + 'deg)',
			'-o-transform': 'rotate(' + angle + 'deg)',
			'transform': 'rotate(' + angle + 'deg)'});
	}
	
	//change an element's width
	function changeWidth(selector, diff)
	{
		$(selector).width($(selector).width() + diff);
	}
	
	//change an element's left
	function changeLeft(selector, diff)
	{
		$(selector).css({left: (parseInt($(selector).css('left'), 10) + diff) + 'px'});
	}
	
	function toggleVideo() {
		var pbWidth = $('#playback').width();
		if (!$('#playback').is(":visible"))
		{
			$('#playback').show();
			//invert the pbWidth so we don't need two copies
			//of the code that actually changes the width
			pbWidth = -pbWidth;
			rotate(btn, 90);
		}
		else
		{
			$('#playback').hide();
			rotate(btn, -90);
		}
		
		//easy css width change
		changeWidth('#chat', pbWidth);
		changeWidth('#chat-messages', pbWidth);
		changeWidth('.chat-input', pbWidth);
		changeWidth('#bottom-chat-line', pbWidth);
		changeWidth('#chat-header', pbWidth);
		changeWidth('#top-chat-line', pbWidth);
		changeWidth('#chat-input-field', pbWidth);
		
		//easy css left change
		changeLeft('#chat-mention-suggestion', -pbWidth);
		changeLeft('#chat', -pbWidth);
		
		//this one's a pain, mod the width in the stylesheet directly
		$.each(document.styleSheets, function(i, styleSheet) {
			$.each(styleSheet.cssRules, function(j, rule) {
				if (rule.selectorText == '.chat-message, .chat-mention, .chat-emote, .chat-skip, .chat-moderation, .chat-system, .chat-update' || rule.selectorText == '.chat-superuser' || rule.selectorText == '.chat-moderator' || rule.selectorText == '.chat-bouncer' || rule.selectorText == '.chat-manager' || rule.selectorText == '.chat-cohost' || rule.selectorText == '.chat-host' || rule.selectorText == '.chat-admin' || rule.selectorText == '.chat-ambassador')
				{
					rule.style.width = (parseInt(rule.style.width, 10) + pbWidth) + 'px';
				}
			})
		});
		
		//pin chat to the bottom
		$('#chat-messages').scrollTop($("#chat-messages")[0].scrollHeight);
	}
	
	//style our button and rotate it for expand mode
	$(btn).css({
		'backgroundImage': 'url(http://i.imgur.com/jqbkAOH.png)',
		'right': '32px',
		'width': '30px'
	}).addClass('button-chat-size');
	rotate(btn, 90);
	
	//since we're adding another button next to the input,
	//we've gotta shrink it
	changeWidth('.chat-input', -32);
	changeWidth('#chat-input-field', -32);
	
	//add the button
	$('#chat').append(btn);
	
	//when the button is clicked, it toggles the video
	$(btn).click(toggleVideo);
	
	//when chat expanded/contracted, need to keep the button in the right spot
	$('#button-chat-expand').click(function(){
		$(btn).css({top: $('#button-chat-collapse').css('top')});
	});
	$('#button-chat-collapse').click(function(){
		$(btn).css({top: $('#button-chat-expand').css('top')});
	});
}

/*init*/

$('#plugbot-userlist').remove();
$('#plugbot-css').remove();
$('#plugbot-js').remove();


$('body').prepend('<style type="text/css" id="plugbot-css">'
    + '#strobe {position: absolute; top: 66px;}'
    + '#strobe-menu {position: absolute; color:#3B3B3B; font-variant: small-caps; left: 10px; font-size: 12px; cursor: pointer; padding: 2px 2px 2px 2px;  border-style: solid; border-width: 1px; border-radius: 4px; border-color: #3B3B3B; margin-bottom: 1px; margin-top: 3px;}'
    + '#lights-menu {position: absolute; left: 240px; color:#3B3B3B; left: 268px; font-variant: small-caps; font-size: 12px; cursor: pointer; padding: 2px 2px 2px 2px;  border-style: solid; border-width: 1px; border-radius: 4px; border-color: #3B3B3B; margin-bottom: 1px; margin-top: 3px;}'
    + '#plugbot-ui { position: absolute; left: 325.9px; top: -601.78px;}'
    + '#plugbot-ui p { border-style: solid; border-width: 1px; border-color: #000; background-color: rgba(10, 10, 10, 0.5); height: 18px; padding-top: 2%; padding-left: 2%; padding-right: 2%; cursor: pointer; font-variant: small-caps; width: 80px; font-size: 13px; margin: 2.5%; }'
    + '#plugbot-ui h2 { border-style: solid; border-width:  1px; border-color: #000 ; height: 9000px; width: 156px; margin: 2.5%; color: #fff; font-size: 12px; font-variant: small-caps; padding: 8px 0 0 13px; }'
	+ '#plugbot-uicontain {min-width: 120px; max-height: 98.6%; overflow-x: hidden; overflow-y: auto; position: fixed; z-index: 99; border-style: solid; border-width: 1px; border-color: #000; background-color: rgba(10, 10, 10, 0.5); border-right: 0 !important; padding: 0px 0px 12px 0px; }'
    + '#plugbot-userlist {white-space: nowrap; max-width: 150px; max-height: 98.6%; overflow-x: hidden; overflow-y: auto; position: fixed; z-index: 99; border-style: solid; border-width: 1px; border-color: #000; background-color: rgba(10, 10, 10, 0.5); border-left: 0 !important; padding: 0px 0px 12px 0px; }'
    + '#plugbot-userlist p {padding-right: 15px; margin: 0; padding-top: 4px; text-indent: 24px; font-size: 86%; color: #C3C3C3; }'
    + '#plugbot-userlist p:first-child { padding-top: 0px !important; }'
    + '#plugbot-queuespot { color: #58FAF4; text-align: left; font-size: 15px; margin-left: 8px }');


$("#button-vote-positive").click();

initAPIListeners();
$('body').append('<div id="plugbot-userlist"></div>');
populateUserlist();
displayUI();
displayUI2();
initUIListeners();

}, 5000);
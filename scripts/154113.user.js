// ==UserScript==
// @name        Friendcodes.com Awesomizer
// @namespace   http://friendcodes.com
// @description Combined script for Friendcodes' most popular scripts and skins
// @include     http*://*.friendcodes.com/*
// @include     http*://friendcodes.com/*
// @exclude     http*://*friendcodes.com/*/handwrite/*
// @exclude     http*://*friendcodes.com/*/cometchat/modules/*
// @exclude     http*://*friendcodes.com/*/cometchat/plugins/*
// @exclude     http*://*friendcodes.com/forums/attachment.php?attachmentid*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceURL
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// @version     11.5.6
// ==/UserScript==

//Warning: If you change things, they will be different

//--First run installation--
if (GM_getValue("skin") == null) {
	GM_setValue("skin","Default+");
	alert("Thanks for installing FC Awesomizer! You can change your options at the bottom of the page.");
}
GM_setValue("version","11-5-6");

//Hide page till it's done
var curtain;
var show_curtain = function() {
    if (document.body) {
        curtain = document.createElement('div');
        curtain.setAttribute('style', 'height: 100%; width:100%; position: fixed; z-index:999999; top: 0px; left: 0px; color: #000000; background-color: #ffffff; vertical-align: middle; text-align: center; z-index: 10000;');
        curtain.textContent = "";
        document.body.appendChild(curtain);
    } else {
        window.addEventListener("DOMNodeInserted", schedule_curtain, false);   
    }
};
var schedule_curtain = function() {
    if (document.body) {
        window.removeEventListener("DOMNodeInserted", schedule_curtain, false);
        show_curtain();
    }
};
var hide_curtain = function() {
    if (curtain && curtain.parentNode) {
        curtain.parentNode.removeChild(curtain);
    }
};
setTimeout(hide_curtain,2500); //In case we get stuck
show_curtain();



function getByClass (className, parent) {
  parent || (parent=document);
  var descendants=parent.getElementsByTagName('*'), i=-1, e, result=[];
  while (e=descendants[++i]) {
    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
  }
  return result;
}

//Function to get a random integer
function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Function used later to change skin
function savenew(event) {
	var dropdown = document.getElementById("customchanger");
	if (dropdown.value == GM_getValue("skin")) return;
	if (dropdown.value == "Mobile") {
		GM_setValue("skin","Default+");
		window.location = "http://www.friendcodes.com/?styleid=58";
		return;
	}
	
	GM_setValue("skin", dropdown.value);
	
	//--Usage Stats--
	//Get a random identifyer, links submissions together, nothing else
	if (GM_getValue("statId") == null) {
		GM_setValue("statId",getRandomInt(1,99999));
	}

	//Ugly way to send stuff, but it's easy!
	var invisImg = document.createElement('iframe');
	var safeSkin = GM_getValue("skin").replace("+","Plus").replace(/ /g,"-");
	invisImg.src = "http://hello2u.konata.ca/usage.php?id=" + GM_getValue("statId") + "&ver=" + GM_getValue("version") + "&skin=" + safeSkin;
	invisImg.style.height = "1px";
	document.body.appendChild(invisImg);
	
	//Reload and apply skin
	invisImg.addEventListener("load",setTimeout(function () {window.location.reload();}, 150));
}
//Music toggle function
function mToggle(event) {
	var dropdown = document.getElementById("customchanger2");
	if (dropdown.value == GM_getValue("music")) return;
	GM_setValue("music", dropdown.value);
	window.location.reload();
}
//Cursor toggle function
function cToggle(event) {
	var dropdown = document.getElementById("cursorchanger");
	if (dropdown.value == GM_getValue("cursor")) return;
	GM_setValue("cursor", dropdown.value);
	window.location.reload();
}

//Insert active style fast so the old one doesn't show
function applyStyle() {
    GM_addStyle('*{ text-transform: none !important; } .main-width{width:80% !important;}html,body{cursor:url(https://dl.dropbox.com/u/20887877/fcCursor.ico),auto !important;}a:hover, .cometchat_userlist{cursor:url(https://dl.dropbox.com/u/20887877/fchand.ico),auto !important;}textarea{cursor:url(https://dl.dropbox.com/u/20887877/fctext.ico),auto !important;}.cometchat_optionsimages,#cometchat_userstab_icon{ background-attachment:scroll !important; background-color:transparent !important; background-repeat:no-repeat !important; } .cometchat_name a { color:white !important; text-decoration: underline; text-align:left; }  .cometchat_name a:hover { color:white !important; background-color:transparent !important; text-decoration: none; text-align:left; }  .cometchat_optionsimages,#cometchat_userstab_icon,.cometchat_chatboxtabtitlemouseover,.cometchat_chatboxtabtitlemouseover2{ background-image:url(http://www.friendcodes.com/forums/cometchat/themes/default/images/cometchat.png) !important; opacity: .95 !important; } .cometchat_tabpopup { opacity: .95 !important; background: transparent !important; }  .cometchat_optionsimages {background-position:10px -309px !important; opacity: .95 !important;} #cometchat_userstab_icon{background-position:0 -753px !important;} .cometchat_chatboxtabtitlemouseover {background-position:195px -457px !important; } .cometchat_chatboxtabtitlemouseover2 {background-position:205px -457px !important;}  .cometchat_chatboxmessagecontent a{ color:white !important; background-color:transparent !important; } .cometchat_chatboxmessagecontent { background:transparent !important; } .cometchat_chatboxmessagefrom { background:transparent !important; } .cometchat_userlist_hover{ background:#468dff !important; color: white !important; opacity: .95 !important; } .cometchat_tabmouseovertext{ color:white !important; background-color:transparent !important; text-decoration: none !important; } #cometchat_base{ border-left:none !important; border-right:none !important; border-top:none !important; border-top-left-radius: 15px !important; border-top-right-radius: 15px !important; background: #468dff url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png) !important ; white-space:nowrap !important; opacity: .95 !important; } .cometchat_tab { border-left:1px solid black !important; border-right:none !important; border-top:1px solid black !important; border-top-left-radius: 15px !important; border-top-right-radius: 15px !important; border-top:0px solid transparent !important; position: relative; top: 3px; color:white !important; text-shadow: 1px 1px 0 black !important;  } .cometchat_tabclick { background-color:transparent !important; color:white !important; text-decoration:none !important; border-bottom:0px solid black !important; position: relative; top: -3px; padding-top:6px !important; padding-left:10px !important; -moz-border-radius-bottomleft: 0px !important; -moz-border-radius-bottomright: 0px !important; -webkit-border-bottom-left-radius: 0px !important; -webkit-border-bottom-right-radius: 0px !important; } .cometchat_usertabclick { width:140px !important; -moz-border-radius-bottomleft: 0px !important; -moz-border-radius-bottomright: 0px !important; -webkit-border-bottom-left-radius: 0px !important; -webkit-border-bottom-right-radius: 0px !important; } .cometchat_userstabclick { width: 176px !important; padding-left: 9px !important; } #cometchat_userstab_text{ color:white !important; } #cometchat_optionsbutton { top: 3px !important; border-right: none !important; border-bottom: none !important; width: 25px !important; border-top-right-radius: 15px !important; border-top-left-radius: 15px !important; } .cometchat_tabmouseover { background-color: #468dff !important; } .cometchat_tabcontent,.cometchat_traycontent { background:#468dff !important; color: white !important; border-bottom:1px solid black !important; } .cometchat_tabcontenttext { color: white !important; } .cometchat_tabcontent,.cometchat_traycontent { background:white!important; color: black !important; border-bottom:1px solid black !important; } .cometchat_tabcontenttext { color:black !important; } .cometchat_chatboxmessagecontent a{ color: black !important; background-color:white !important; } .cometchat_tabsubtitle{ background:white !important; } .cometchat_tooltip_content { border-top-right-radius: 15px !important; border-top-left-radius: 15px !important; border-bottom-right-radius: 15px !important; border-bottom-left-radius: 15px !important; border-left:1px solid black !important; border-right:1px solid black !important; } .cometchat_trayicon { position:relative !important; border-top-right-radius: 15px !important; border-top-left-radius: 15px !important; border-right:1px solid black !important; border-left:none !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; top: 3px !important; border-bottom:none !important; } .cometchat_trayclick { background-color:transparent !important; border-top-right-radius: 15px !important; border-top-left-radius: 15px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; border-bottom:none !important; top: -3px !important; } .cometchat_trayclick img { padding-top:3px; } .cometchat_name { color:white !important; } #cometchat_hide { padding-top:9px !important; border-top-right-radius: 15px !important; border-top-left-radius: 15px !important; border-left:1px solid black !important; border-right:none !important; } #cometchat_hidden { background: #468dff url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png) repeat-x top left !important; color: transparent !important; border-top-right-radius: 15px !important; border-top-left-radius: 15px !important; border-top: none !important; border-left:none !important; border-right:none !important; } #cometchat_hidden_content { border-top-right-radius: 15px !important; border-top-left-radius: 15px !important; border-top: none !important; border-left:none !important; border-right:none !important; } #cometchat_base:after { content:"" !important; } .cometchat_textarea { background:white !important; color:black !important; } .cometchat_tabtitle,.cometchat_userstabtitle { background: #468dff url(http://www.friendcodes.com/forums/cometchat/themes/default/images/cometchat.png) scroll !important; background-attachment:scroll !important; background-color:#468dff !important; background-image:url(http://www.friendcodes.com/forums/cometchat/themes/default/images/cometchat.png) !important; opacity: .95 !important; } .cometchat_tabtitle{ border-left:1px solid black !important; border-right:1px solid black !important; border-top:none !important; border-bottom:1px solid black !important; background-position:195px -424px !important; border-top-left-radius: 15px !important; border-top-right-radius: 15px !important; background: #468dff url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png) repeat-x top left !important; text-shadow: 1px 1px 0 black !important; } .cometchat_tabsubtitle{ background:#468dff !important; } .cometchat_userstabtitle,.cometchat_traytitle { background-position:205px -424px !important; border-left:1px solid black !important; border-right:1px solid black !important; border-bottom:1px solid black !important; border-top:none !important; border-top-left-radius: 15px !important; border-top-right-radius: 15px !important; color: white !important; background: #468dff url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png) repeat-x top left !important; text-shadow: 1px 1px 0 black !important; } .cometchat_name a:link { color: white !important; } .cometchat_message { color: white !important; } #cometchat_searchbar { display: block !important; } #cometchat_userslist_offline { display:block !important; } #cometchat_base { background: transparent url() repeat-x top left !important; !important; border-top:none !important; } #cometchat_chatbox_right,#cometchat_chatbox_left { border-left:1px solid black !important; border-right:none !important; border-top:1px solid black !important; border-top-left-radius: 15px !important; border-top-right-radius: 15px !important; border-top:0px solid transparent !important; color:white !important; background: #4C91FC !important; position:relative; top:4px; text-shadow: 1px 1px 0 black !important; padding-left:2px !important; padding-right:0px !important; margin-right:2px; margin-left:2px; } .cometchat_tab { background-color: #4C91FC !important; background-image:url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png); border-bottom: 1px black !important; border-bottom-width: 1px !important; } .cometchat_trayicon { background: #4C91FC url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png) repeat-x top left !important; } .cometchat_userstabclick { background: #4C91FC url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png) repeat-x top left !important; border-bottom:1px solid black !important; } .cometchat_tabclick { border-bottom:1px solid black !important; } #cometchat_hide { padding-top:7px !important; top: 3px !important; position:relative !important; background-color: #4C91FC !important; } .cometchat_userstabtitle,.cometchat_traytitle { background: #4C91FC url(http://i306.photobucket.com/albums/nn247/hello2u1/chatbar-3.png) repeat-x top left !important; } #cometchat_trayicon_themechanger,#cometchat_trayicon_share,#cometchat_trayicon_announcements { display:none;}');
    
	//Shorten Profile sidebars and other global CSS fixes
	GM_addStyle('.signaturecontainer img{max-height:250px;}.groups div ul { max-height:250px; overflow:auto;}.pollresultsblock,#mygroups .blockrow,#recentgroups .blockrow,#sidebar{background:transparent !important;}#footer select { max-width: 150px;}'); 

	//Change cursor, comes after main skin to overwrite
	if (GM_getValue("cursor") == "System Cursors") {GM_addStyle('html,body{cursor:auto !important;}a:hover, .cometchat_userlist{cursor:pointer !important;}textarea{cursor:auto !important;}');}
	else if (GM_getValue("cursor") == "Blue Cursors") {GM_addStyle('html,body{cursor:url(https://dl.dropbox.com/u/20887877/fcCursor.ico),auto !important;}a:hover, .cometchat_userlist{cursor:url(https://dl.dropbox.com/u/20887877/fchand.ico),auto !important;}textarea{cursor:url(https://dl.dropbox.com/u/20887877/fctext.ico),auto !important;}');}
	else if (GM_getValue("cursor") == "Red Cursors") {GM_addStyle('html,body{cursor:url(https://dl.dropbox.com/u/20887877/fcrnb/fcCursor.ico),auto !important;}a:hover, .cometchat_userlist{cursor:url(https://dl.dropbox.com/u/20887877/fcrnb/fchand.ico),auto !important;}textarea{cursor:url(https://dl.dropbox.com/u/20887877/fcrnb/fctext.ico),auto !important;}');}
	//Do nothing for Theme Cursors
}
applyStyle();

window.addEventListener("DOMContentLoaded", function(e) {
	//Insert active style again so it isn't overwritten
	applyStyle();

	//Wait for page to load so everything applies correctly

	//--Add friendcodes + music to profiles--
	var pathname = window.location.pathname;
	if ( pathname.indexOf("member.php") > -1 || (pathname.indexOf("/members/") > -1 && pathname.indexOf("albums") == -1 ) ) { //Make sure it's a profile we're seeing

		var str= pathname.replace('/forums/members/','');
		var userid = str.match(/\d+/);

		str = str.replace(userid,'').replace('/','');
		var username = str.substring(0,str.lastIndexOf("."))

		var nodes = getByClass("member_summary"), i=-1, node; //Should only be one
		if (nodes.length >= 1) { //else it's not the profile.
			var width = nodes[0].width;
			width = "99%";
			
			//Get Bibliography info in case it's a video id
			var numLists = getByClass("blockbody userprof_content userprof_content_border").length-1;
			var lastList = getByClass("blockbody userprof_content userprof_content_border")[numLists];
			var fields = lastList.getElementsByTagName('dd');
			if (fields.length != 0) {
				var i = 0;
				while (!lastList.getElementsByTagName('dt')[i].innerHTML.match("Biography") && i < fields.length - 1) {
					i++;
				}
				var fieldHTML = fields[i].innerHTML;
				var video = fieldHTML;
				fieldHTML = fieldHTML.replace("<br>"," ");
				//Strip to the space first, then the < in case there's no space
				if (fieldHTML.indexOf(" ") != -1) fieldHTML = fieldHTML.substring(0,fieldHTML.indexOf(" "));
				if (fieldHTML.indexOf("<") != -1) fieldHTML = fieldHTML.substring(0,fieldHTML.indexOf("<"));
				video = fieldHTML;
			}
			//Find a place to put the FCs
			nodes = getByClass("userinfo"), i=-1, node; //Should only be one
			while (node=nodes[++i]) {
				//Fetch them and put them in an iframe
				if (GM_getValue("music") == "Enable Profile Music") {
					node.innerHTML+='<iframe id="music" border="0" src="http://hello2u.konata.ca/getyoutube.php?id=' + userid + '&video=' + video + '#bottom" style="margin:0px !important;border:0px !important;padding-top:1px !important;overflow:hidden !important;border-radius:0px;width:'+width+' !important;height:35px;"></iframe>';
				}
				if (GM_getValue("music") == "Enable Profile Video" || GM_getValue("music") == "Enable Profile Videos") {
					node.innerHTML+='<iframe id="music" border="0" src="http://hello2u.konata.ca/getyoutube.php?id=' + userid + '&video=' + video + '#bottom" style="margin:0px !important;border:0px !important;padding:0px !important;overflow:hidden !important;border-radius:0px;width:'+width+' !important;height:250px;"></iframe>';
				}
			}
		}
	}

	if (document.getElementById("footer_select")) { //Make sure there is a footer
		//--Add Custom skin changer--
		var dropdown = document.createElement('select');
		var op = new Array();
		var i = 0;
		var numOps = 3;
		/*
		while ( i < numOps ) {
			op[i] = document.createElement('option');
			i++;
		}
		i=0;

		op[0].innerHTML="Default";
		op[1].innerHTML="Default+";
		op[2].innerHTML="Red and Black (Alpha)";
		
		while ( i < numOps ) {
			if (op[i].innerHTML == GM_getValue("skin")) {
				dropdown.selectedIndex = i;
				op[i].selected="selected";
				break;
			}
			i++;
		}
		i=0;


		while ( i < numOps ) {
			dropdown.appendChild(op[i]);
			i++;
		}
		i=0;

		dropdown.id = "customchanger";

		document.getElementById("footer_select").appendChild(dropdown);
		dropdown.addEventListener('change', savenew, true);
		*/

		//Setup Profile music toggle
		dropdown = document.createElement('select');
		numOps = 3;
		op = new Array();
		while ( i < numOps ) {
			op[i] = document.createElement('option');
			i++;
		}
		i=0;

		if (GM_getValue("music") == null) { GM_setValue("music", "Enable Profile Music"); }

		op[0].innerHTML="Disable Profile Music";
		op[1].innerHTML="Enable Profile Music";
		op[2].innerHTML="Enable Profile Videos";

		while ( i < numOps ) {
			if (op[i].innerHTML == GM_getValue("music")) {
				dropdown.selectedIndex = i;
				op[i].selected="selected";
				break;
			}
			i++;
		}
		i=0;

		while ( i < numOps ) {
			dropdown.appendChild(op[i]);
			i++;
		}
		i=0;

		dropdown.id = "customchanger2";

		document.getElementById("footer_select").appendChild(dropdown);
		dropdown.addEventListener('change', mToggle);

		//Cursor Changer
		dropdown = document.createElement('select');
		numOps = 4;
		op = new Array();
		while ( i < numOps ) {
			op[i] = document.createElement('option');
			i++;
		}
		i=0;

		if (GM_getValue("cursor") == null) { GM_setValue("cursor", "Theme Cursors"); }

		op[0].innerHTML="Theme Cursors";
		op[1].innerHTML="System Cursors";
		op[2].innerHTML="Red Cursors";
		op[3].innerHTML="Blue Cursors";

		while ( i < numOps ) {
			if (op[i].innerHTML == GM_getValue("cursor")) {
				dropdown.selectedIndex = i;
				op[i].selected="selected";
				break;
			}
			i++;
		}
		i=0;

		while ( i < numOps ) {
			dropdown.appendChild(op[i]);
			i++;
		}
		i=0;

		dropdown.id = "cursorchanger";

		document.getElementById("footer_select").appendChild(dropdown);
		dropdown.addEventListener('change', cToggle);
	}

	//April Fools: Harlem Shake
	/*var hs = document.createElement("a");
	hs.href="javascript:null();";
	hs.innerHTML=" Do the Harlem Shake";
	hs.setAttribute("id", "hals");
	hs.addEventListener('click',function() { 
	GM_addStyle('@keyframes shake { 0% { transform: rotate(0deg); } 30% { transform: rotate(-5deg); } 50% { transform: rotate(0deg); } 70% { transform: rotate(5deg); } 100% { transform: rotate(0deg); } } @keyframes shake2 { 0% { transform: rotate(0deg); } 30% { transform: rotate(-3deg); } 50% { transform: rotate(0deg); font-size:12px; } 70% { transform: rotate(7deg); } 100% { transform: rotate(0deg); font-size:8px;} } @keyframes inout { 0% { width: 100%; } 30% { width: 90%; } 50% { width: 70%; } 70% { width: 90%; } 100% { width: 100%;} } @keyframes shuffle { 0% { transform: translate(0px,0px); } 30% { transform: translate(-3px,2px); } 50% { transform: translate(1px,-2px); } 70% { transform: translate(3px,2px); } 100% { transform: translate(0px,0px);} }');
	GM_addStyle('#hals { animation-name: shake2; animation-duration: 0.65s; animation-iteration-count: infinite; animation-timing-function: linear; }');
	setTimeout(function(){
	GM_addStyle('p, h2, h3, h4, h5 { animation-name: shuffle; animation-duration: 0.65s; transform-origin:50% 50%; animation-iteration-count: infinite; animation-timing-function: linear; } img { transition: top .75s, opacity .75s; animation-name: shake; animation-duration: 0.65s; transform-origin:50% 50%; animation-iteration-count: infinite; animation-timing-function: linear; } body, .main-width { animation-name: inout; animation-duration: 1s; transform-origin:50% 50%; animation-iteration-count: infinite; animation-timing-function: linear; } span, a { animation-name: shake2; animation-duration: 0.5s; transform-origin:50% 50%; animation-iteration-count: infinite; animation-timing-function: linear; }');}
	, 19500);
	var vid = document.createElement("iframe");
	vid.src="https://www.youtube.com/v/X3aCTwXNTX8&autoplay=1";
	vid.style.height="1px";
	document.body.appendChild(vid);
	}
	);
	document.getElementById("footer_select").appendChild(hs);*/

	//Get username and id
	if ((GM_getValue("username") == null || GM_getValue("FCid") == "") && getByClass("welcomelink").length == 1) {
		uName = getByClass("welcomelink")[0].getElementsByTagName("a")[0].innerHTML;
		var profurl= getByClass("welcomelink")[0].getElementsByTagName("a")[0].href.replace('/forums/members/','');
		var userid = profurl.match(/\d+/);
		GM_setValue("FCid",parseInt(userid));
		GM_setValue("username",uName);
	}

	//--Replace Chat link with one using username--
	if (document.getElementById("navtabs")) {
		var i = 1;
		var listItems = document.getElementById("navtabs").getElementsByTagName('li');
		while (!(listItems[i].innerHTML.match("Chat")) && i < (listItems.length - 2)) {
			i++;
		}
		var tabToReplace = document.getElementById("navtabs").getElementsByTagName('li')[i];
		if (tabToReplace.innerHTML.match("chat")) tabToReplace.innerHTML='<a class="navtab" href="javascript:window.open(&quot;http://hello2u.konata.ca/fcirc.php?nick=' + GM_getValue("username").replace(/ /g,'_') + '&quot;,&quot;0&quot;,&quot;toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=640,height=470,left=256,top=232&quot;);null();" target="_self">Chat</a>';
	}

	//Minor fix- Blog this Post -> Blog This Post
	var i = 0;
	while (i < getByClass("postlinking").length) {
		if ((getByClass("blog",getByClass("postlinking")[i])[0].innerHTML).indexOf("Blog this Post") > -1) getByClass("blog",getByClass("postlinking")[i])[0].innerHTML="Blog This Post";
		i++;
	}

	hide_curtain(); //Done loading, lets go!
	//-Anything past here runs after curtain is lifted-
});
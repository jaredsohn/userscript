// ==UserScript==
// @name           Wall Manager Sidekick (MouseHunt)
// @description    Assists Wall Manager with MouseHunt posts
// @include        http://www.mousehuntgame.com/*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @include        http://apps.facebook.com/mousehunt/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.41
// @copyright      Hazado
// ==/UserScript== 
(function() { 

	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;
	
	var version = "1.41";
    var appID="10337532241";
    var scriptID="114634";
    var appName="MouseHunt";

	function $(ID,root) {return (root||document).getElementById(ID);}

	// Returns index to text S in a string. Works nicely as a boolean expression.
	String.prototype.find = function(s) {
		return (this.indexOf(s) != -1);
	};

	// Returns true if string starts with text S
	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	// Short form for evaluate function, returns a DOM node selection
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	}

	// Short form for evaluate function, returns a single DOM node
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	}

	// Clicks object E. Only fires the click event, not any events that open links.
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	// params:
	//	a: element tag, such as html, body, a, img
	//	b: properties list as a JSON object
	//	c: an array of child elements
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	}

	function sendMessage(s){
		try {
			top.location.hash = s;
		} catch (e) {
			console.log(""+e);
			if (window != top) top.location.href = "http://dummy.facebook.com/?#"+s;			
		}
	}

	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed

		var doorMark=$('wmDoor_app'+appID);
		if (doorMark) return; //already posted to door

		var attachment={
			appID:appID,
			name:appName, 
			version:version,
			thumbsSource:'www.mousehuntgame.com',
			flags:{httpsTrouble:true,requiresTwo:false,skipResponse:false,alterLink:true},
			alterLink: {find: "www.mousehuntgame.com",replace: "apps.facebook.com/mousehunt",},
			icon:"http://photos-h.ak.fbcdn.net/photos-ak-snc1/v27562/85/10337532241/app_1_10337532241_9144.gif",
			desc:appName+" Sidekick (ver "+version+")",
			
			accText: {
				Charms		:	'Charms',
				Help		:	'Help',
				KingsCredit	:	'Kings Credit',
				SUPERbrie	:	'SUPERbrie',
				Other		:	'Other',
			},

			tests: [
				{url:"slst1=newmappiece",ret:"exclude"},
				{url:"slst1=leveledup",ret:"exclude"},
				{url:"slst1=convertible_open",ret:"exclude"},
				{url:"slst1=toy_built",ret:"exclude"},
				{url:"slst1=toy_first_build",ret:"exclude"},
				{url:"slst1=toy_reward_claimed",ret:"exclude"},
				{url:"slst1=scoreboard",ret:"exclude"},
				{url:"slst1=tournament_reward",ret:"exclude"},
				{url:"slst1=usedpotion",ret:"exclude"},
				{link:"Join the Hunt",ret:"exclude"},
				{url:"hunterprofile.php",ret:"exclude"},
				{url:"travel.php?",ret:"exclude"},
				{link:"Claim Gift",ret:"exclude"},
				{body:"Share Attraction Charms with friends to celebrate!",ret:"Charms"},
				{link:"Claim Power Charm",ret:"Charms"},
				{link:"Claim Power Charms",ret:"Charms"},
				{link:"Claim Luck Charm",ret:"Charms"},
				{link:"Claim Luck Charms",ret:"Charms"},
				{link:"Claim Super Luck Charm",ret:"Charms"},
				{link:"Claim Super Luck Charms",ret:"Charms"},
				{link:"Claim Super Power Charm",ret:"Charms"},
				{link:"Claim Super Power Charms",ret:"Charms"},
				{link:"Claim King's Credit",ret:"KingsCredit"},
				{link:"Claim King's Credits",ret:"KingsCredit"},
				{link:"Claim SUPERbrie+",ret:"SUPERbrie"},
				{link:"Claim Dark Chocolate Char",ret:"Other"},
				{link:"Claim Dark Chocolate Chars",ret:"Other"},
				{link:"Claim Magic Essences",ret:"Other"},
				{link:"Claim Magic Essence",ret:"Other"},
				{link:"Claim Gold",ret:"Other"},
				{link:"Claim Spooky Charm",ret:"Charms"},
				{link:"Claim Spooky Charms",ret:"Charms"},
				{url:"draw.php?",ret:"Help"},
			],

			menu: {
				// Provide a menu tree below as a JSON object
				// Accepted menu item types include: separator, optionblock, link, checkbox, radio, select, hidden, textarea
				
				SSsection_main:{type:"section",label:"MouseHunt Manager Options ("+version+")",kids:{
					SSupdateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/114634.user.js"},
					SSsep:{type:"separator",label:"Basics",kids:{
						Charms:{type:"checkbox",label:"Get Charms"},
						KingsCredit:{type:"checkbox",label:"Get King's Credit"},
						SUPERbrie:{type:"checkbox",label:"Get SUPERbrie+"},
						Other:{type:"checkbox",label:"Get Other Mousehunt Items"},
						Help:{type:"checkbox",label:"Send Ticket to Person"},
					}},
					
				}},
			}
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+appID,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	

	var main = {

		run : function (){
			//console.log("run");
			try{
				var statusCode=0;
				var doc=document.documentElement;
				var text=doc.textContent;
				var html=doc.innerHTML;
			} catch(e){window.setTimeout(main.run,500);return;}

			//console.log("past init");

			//check page for various texts
			if (html.find('You have successfully entered'))statusCode=1;
			if (html.find('You cannot claim gifts you sent.'))statusCode=-1;
			else if (html.find('You have already entered'))statusCode=-6;
			else if (html.find('You received'))statusCode=1;
			else if (html.find('Sorry, none left'))statusCode=-2;
			else if (html.find('You have already claimed'))statusCode=-6; //already claimed
			else if (html.find('You may only give up to'))statusCode=-3;
			else if (html.find('A draw is not currently running'))statusCode=-3;
			else if (html.find('Only your friends are allowed'))statusCode=-12;
			else if (doc.textContent=="")statusCode=-5;  //no document body
			else if (html.find('Event Mice'))statusCode=-2;

			//console.log("past tests");
			
			if (statusCode!=0) sendMessage("status="+statusCode);						
			else window.setTimeout(function(e){main.run();},500);
		},

	};

	
	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/')) {
		dock();
		return;
	}
	main.run();

})(); // anonymous function wrapper end
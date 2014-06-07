// ==UserScript==
// @name           Wall Manager Sidekick (EA)
// @description    Assists Wall Manager with Empires posts
// @include        /^https?:\/\/(.*)\.empire\.zynga\.com\//
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.17.1
// @copyright      Charlie Ewing & Joe Simmons
// ==/UserScript== 
(function() { 

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.17";

  	// Return as quickly as possible if we are not in an iframe
  	//if (unsafeWindow.parent == unsafeWindow || typeof unsafeWindow.parent == 'undefined') return;

	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}

	Array.prototype.inArray = function(value) {
		for(var i=this.length-1; i>=0; i--) {
			if(this[i]==value) return true;
		}
		return false;
	};

	Array.prototype.inArrayWhere = function(value) {
		for(var i=0,l=this.length; i<l; i++) {
			if(this[i]==value) return i;
		}
		return false;
	};

	String.prototype.find = function(s) {
		return (this.indexOf(s) != -1);
	};

	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	String.prototype.getUrlParam = function(s) {
		var params=this.split("?");
		if (params.length>0) return params[1].split("#")[0].split(s+"=")[0].split("&")[0];			
		return "";
	};

	String.prototype.getHashParam = function(s,param) {
		var params = this.split("#");
		if (params.length>0) return params[1].split(s+"=")[0].split("&")[0];
		return "";
	};

	// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
	// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
	// See script page for syntax examples: http://userscripts.org/scripts/show/51532
	function $g(que, O) {
		if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
		var obj=O||({del:false,type:6,node:document}), r, t,
			idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
		if(idclass_re.test(que)) {
			var s=que.split(' '), r=new Array(), c;
			for(var n=0; n<s.length; n++) {
				switch(s[n].substring(0,1)) {
					case '#': r.push(document.getElementById(s[n].substring(1))); break;
					case '.': c=document.getElementsByClassName(s[n].substring(1));
		  				if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
				}
			}
			if(r.length==1) r=r[0];
		} else if(xp_re.test(que)) {
			r = (obj['doc']||document).evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
			if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
		}
		if(r && obj['del']===true) {
			if(r.nodeType==1) r.parentNode.removeChild(r);
			else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
			else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
		} return r;
	};

	
	function selectNodes(element,xPath) {
		return $g(xPath, {type:7, node:element});
	};

	function selectSingleNode(element,xPath) {
		var nodes=$g(xPath, {type:7, node:element});
		if (nodes!=null) return nodes.snapshotItem(0);
		return null;
	};


	function fireEvent(element,event){
    		var evt = document.createEvent("HTMLEvents");
    		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    		return !element.dispatchEvent(evt);
	};

	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	}

	function dock(){
		//alert('trying to dock');

		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app164285363593426');
		if (doorMark) return; //already posted to door

		var attachment={
			appID:'164285363593426',
			alias:'EA',
			hrefKey:'sendKey',
			name:'Empires & Allies',
			thumbsSource:['assets.empire.zynga.com','empire.static.zgncdn.com'],
			flags:{httpsTrouble:false},

			accText: {
				coins10:'10 Coins',coins25:'25 Coins',coins50:'50 Coins',energy1:'1 Energy',sendxk1:'Liberty Bond',
				wood10:'10 Wood',oil10:'10 Oil',au1:'Gold',al1:'1 Aluminum',cu1:'1 Copper',fe1:'1 Iron',
				u1:'1 Uranium',al5:'5 Aluminum',coins200:'200 coins',oil100:'100 Oil',wood25:'25 Wood',
				coins100:'100 Coins',xk1:'Liberty Bond',au5:'5 Gold',oil50:'50 Oil',oil25:'25 Oil',
				wood100:'100 Wood',u5:'5 Uranium',cu5:'5 Copper',wood50:'50 Wood',fe5:'5 Iron',
				sendparts:"Parts",send:"Unknown",token:"Prize Token",
			},

			tests: [
				{link:"go play",ret:"exclude"},
				{link:"send thank you gift",ret:"exclude"},

				{url:'crew_tend_reminder',ret:'exclude'},
				{url:'neighbor_crew_apply',ret:'exclude'},
				{url:'crew_completion_reminder',ret:'exclude'},
				{url:'energy_request',ret:'exclude'},
				{url:'battle_lost_request_gift',ret:'exclude'},
				{url:'neighbor_request_',ret:'exclude'},

				{url:"ask_for_token",ret:"token"},
				{url:"ask_for_parts",ret:"sendparts"},
				{url:'battle_won_allies',ret:'send'},

				{url:'LB_AskForParts',ret:'send'},
				{url:'LB_AskForEnergy',ret:'energy1'},
				{url:'LB_Passing',ret:'coins50'},
				{url:'PlacementReward',ret:'coins100'},
				{url:'ParticipationReward',ret:'energy1'},
				{url:'LB_Summary',ret:'coins100'},

				{url:'level_up',ret:'coins25'},
				{url:'help_research',ret:'coins25'},
				{url:'market_built',ret:'coins25'},
				{url:'market_built',ret:'coins25'},
				{url:'market_buy_complete',ret:'coins25'},
				{url:'research_building',ret:'coins25'},
				{url:'upgrade_complete_',ret:'coins25'},
				{url:'out_of_coins',ret:'coins25'},
				{url:'daily_bonus',ret:'coins25'},
				{url:'pvp_immunity_crew_invite',ret:'coins25'},
				{url:'quest_complete',ret:'coins25'},
				{url:'defeated_villain',ret:'coins25'},

				{url:'frType=powerup_complete',ret:"coins100"},

				{url:'out_of_oil',ret:'oil10'},				
				{url:'Q0300',ret:'oil10'},
				{url:'pvp_defeat_attacker_via_crew',ret:'oil10'},
				{url:'pvp_repel_wins',ret:'oil10'},
				{url:'pve_repel_wins',ret:'oil10'},
				{url:'pvp_defender_wins',ret:'oil10'},
				{url:'pvp_defender_loses',ret:'oil10'},

				{url:'camp_battle_won_19',ret:'oil50'},
				{url:'camp_battle_won_18',ret:'coins100'},
				{url:'camp_battle_won_17',ret:'energy1'},
				{url:'camp_battle_won_16',ret:'au5'},
				{url:'camp_battle_won_15',ret:'xk1'},
				{url:'camp_battle_won_14',ret:'coins100'},
				{url:'camp_battle_won_13',ret:'wood25'},
				{url:'camp_battle_won_12',ret:'oil100'},
				{url:'camp_battle_won_11',ret:'coins200'},
				{url:'camp_battle_won_10',ret:'al5'},
				{url:'camp_battle_won_9',ret:'oil50'},
				{url:'camp_battle_won_8',ret:'fe5'},
				{url:'camp_battle_won_7',ret:'wood50'},
				{url:'camp_battle_won_6',ret:'cu5'},
				{url:'camp_battle_won_5',ret:'energy1'},
				{url:'camp_battle_won_4',ret:'coins100'},
				{url:'camp_battle_won_3',ret:'u5'},
				{url:'camp_battle_won_2',ret:'wood100'},
				{url:'camp_battle_won_1',ret:'coins100'},
				{url:'camp_battle_won_0',ret:'oil25'},

				{url:'out_of_wood',ret:'wood10'},
				{url:'Q0299',ret:'wood10'},

				{url:'out_of_aluminum',ret:'al1'},
				{url:'request_aluminum',ret:'al1'},
				{url:'out_of_copper',ret:'cu1'},
				{url:'request_copper',ret:'cu1'},
				{url:'out_of_gold',ret:'au1'},
				{url:'request_gold',ret:'au1'},
				{url:'out_of_iron',ret:'fe1'},
				{url:'request_iron',ret:'fe1'},
				{url:'out_of_uranium',ret:'u1'},
				{url:'request_uranium',ret:'u1'},
	
				{url:'ask_for_xk01',ret:'sendxk1'},

				{url:'energy_reques',ret:'energy1'},
				{url:'out_of_energy',ret:'energy1'},
				{url:'friend_visit',ret:'energy1'},
				{url:'friend_helped',ret:'energy1'},
									
				{url:'help_contract',ret:'coins10'},
				{url:'help_repel_invasion',ret:'coins10'},
	
				{url:'new_nation',ret:'coins50'},
				{url:'pvp_repel_crew_invite',ret:'coins50'},
				{url:'pvp_attacker_wins',ret:'coins50'},
				{url:'pvp_attacker_loses',ret:'coins50'},
				{url:'pvp_repel_loses',ret:'coins50'},
				{url:'pve_repel_loses',ret:'coins50'},
				{url:'pvp_thank_defender',ret:'coins50'},

				{url:"g_pvp_spin_win",ret:"coins50"},
				{url:"support_building",ret:"coins25"},

				{url:'battle_won',ret:'coins25'},
				{url:'frType=Q',ret:'coins25'},


			],

			menu: {
				section_main:{type:"section",label:"Empires & Allies Manager Options ("+version+")",kids:{
					updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/104472.user.js'},
					MCA:{type:'link',label:'Install Message Center Assistant',href:'http://userscripts.org/scripts/source/107344.user.js'},
					sep:{type:'separator',label:'Resources',kids:{
						coinblock:{type:"optionblock",label:"Coins:",kids:{
							coins200:{type:'checkbox',label:'200'},
							coins100:{type:'checkbox',label:'100'},
							coins50:{type:'checkbox',label:'50'},
							coins25:{type:'checkbox',label:'25'},
							coins10:{type:'checkbox',label:'10'},
						}},
						woodblock:{type:"optionblock",label:"Wood:",kids:{
							wood100:{type:'checkbox',label:'100'},
							wood50:{type:'checkbox',label:'50'},
							wood25:{type:'checkbox',label:'25'},
							wood10:{type:'checkbox',label:'10'},
						}},
						oilblock:{type:"optionblock",label:"Oil:",kids:{
							oil100:{type:'checkbox',label:'100'},
							oil50:{type:'checkbox',label:'50'},
							oil25:{type:'checkbox',label:'25'},
							oil10:{type:'checkbox',label:'10'},
						}},
						mineblock:{type:"optionblock",label:"Minerals:",kids:{
							al5:{type:'checkbox',label:'Aluminum 5',kids:{
								al1:{type:'checkbox',label:'1'},
							}},
							fe5:{type:'checkbox',label:'Iron 5',kids:{
								fe1:{type:'checkbox',label:'1'},
							}},
							au5:{type:'checkbox',label:'Gold 5',kids:{
								au1:{type:'checkbox',label:'1'},
							}},
							cu5:{type:'checkbox',label:'Copper 5',kids:{
								cu1:{type:'checkbox',label:'1'},
							}},
							u5:{type:'checkbox',label:'Uranium 5',kids:{
								u1:{type:'checkbox',label:'1'},
							}},
							z5:{type:'checkbox',label:'Element-Z 5',kids:{
								z1:{type:'checkbox',label:'1'},
							}},
						}},
						otherblock:{type:"optionblock",label:"Other:",kids:{
							energy1:{type:'checkbox',label:'Energy 1'},				
							xk1:{type:'checkbox',label:'Get Liberty Bond'},
							token:{type:'checkbox',label:'Prize Token'},				
						}},
					}},
					sendsep:{type:"separator",label:"Send Items",kids:{
						sendall:{type:"checkbox",label:"Send All (or check items below)"},
						sendxk1:{type:'checkbox',label:'Send Liberty Bond'},
						sendparts:{type:'checkbox',label:'Send Research Parts'},
						send:{type:"checkbox",label:"Send Other"},
					}},
				}},
			}
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app164285363593426','data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	

	var main = {

		sendMessage : function (s){
			unsafeWindow.top.location.hash = s;
		},

		run : function (){
			// check that we are in the overlay window
			//try{if (!unsafeWindow.location.href.find('overlayed=true')) return;}
			//catch(e){window.setTimeout(main.run,500);return;}

			try{
				var statusCode=0;
				var doc=document.documentElement;
				var text=doc.textContent;
				var html=doc.innerHTML;
				var gameLoaded=unsafeWindow.location.href.startsWith('http://fb-client-0.empire.zynga.com/flash.php?') && html.contains('object id="flashapp"');
			} catch(e){window.setTimeout(main.run,500);return;}

			//check page for various texts
			if (html.find("You've already claimed this reward"))statusCode=-6; //already claimed
			else if (html.find('You just sent'))statusCode=1;  //success send
			else if (html.find('reached your reward limit'))statusCode=-3; //over limit
			else if (html.find('Your inventory cannot hold any more of this item!'))statusCode=-3;  //over limit
			else if (html.find('You have exceeded your daily limit of gifts'))statusCode=-3; //all daily limit reached
			else if (html.find('Here is one as a reward'))statusCode=1;  //success send one get one
			else if (html.find("Here's a reward of"))statusCode=1;  //success send
			else if (html.find('You just got'))statusCode=1;  //success get
			else if (html.find('You gave '))statusCode=1;  //success give/get one
			else if (html.find('all the rewards have been claimed'))statusCode=-2;  //out of rewards
			else if (html.find('Sorry! These feed rewards have all been collected'))statusCode=-2; //out of rewards

			else if (html.find('you need to reach a higher level before using this reward'))statusCode=-1;  //level too low to claim
			else if (html.find('You cannot accept this reward'))statusCode=-1;  //data missing error
			else if (html.find('Sorry, there was an error with your gift'))statusCode=-1;  //g
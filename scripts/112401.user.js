// ==UserScript==

// @name           Wall Manager Sidekick (Maplestory Adventures)

// @description    Assists Wall Manager with Maplestory Adventures posts]

// @include        http://pg.msa.social.nexon.net/MSAWeb/*

// @include        http://apps.facebook.com/maplestoryadventures/*

// @include        http://www.facebook.com/*

// @exclude        http://www.facebook.com/profile*

// @exclude        http://www.facebook.com/editaccount*

// @exclude        http://www.facebook.com/friends/*

// @exclude        http://www.facebook.com/settings*

// @exclude        http://www.facebook.com/help/*

// @exclude        http://www.facebook.com/logout*

// @exclude        http://www.facebook.com/login*

// @exclude        http://www.facebook.com/ajax/*

// @exclude        http://www.facebook.com/reqs*

// @exclude        http://www.facebook.com/campaign/*

// @exclude        http://www.facebook.com/notifications*

// @exclude        http://www.facebook.com/editprofile*

// @exclude        http://www.facebook.com/posted*

// @exclude        http://www.facebook.com/plugins*

// @exclude        http://www.facebook.com/home.php?sk=group_*

// @exclude        http://www.facebook.com/*/posts/*

// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/

// @version        0.0.3

// @require        http://sizzlemctwizzle.com/updater.php?id=101606&days=1

// @copyright      Ninboy

// ==/UserScript==

(function() { 

	var version = "0.0.3";



	function $(ID,root) {return (root||document).getElementById(ID);}



	String.prototype.find = function(s) {

		return (this.indexOf(s) != -1);

	};



	String.prototype.startsWith = function(s) {

		return (this.substring(0, s.length) == s);

	};



	function selectNodes(xPath,params){

		params=(params||{});

		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);

	}



	function selectSingleNode(xPath,params){

		params=params||{}; params['type']=9;

		return selectNodes(xPath,params).singleNodeValue;

	}



	function fireEvent(element,event){

    		var evt = document.createEvent("HTMLEvents");

    		evt.initEvent(event, true, true );

    		return !element.dispatchEvent(evt);

	};



	function click(e) {

		if(!e && typeof e=='string') e=document.getElementById(e);

		if(!e) return;

		var evObj = e.ownerDocument.createEvent('MouseEvents');

		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);

		e.dispatchEvent(evObj);

	};

	

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

		var door=$('wmDock');

		if (!door) return;



		var doorMark=$('wmDoor_app191616050877248');

		if (doorMark) return;



	

		var attachment={

			appID:'191616050877248',

			alias:'MsA',

			hrefKey:'feed_id',

			name:'Maplestory Adventures',

			thumbsSource:'<your_game_assets_url_here>',

			flags:{httpsTrouble:false,requiresTwo:false,alterLink:true},



			alterLink:{

			  find: 'apps.facebook.com/maplestoryadventures',

			  replace: 'pg.msa.social.nexon.net/MSAWeb'

			},

			

			accText: {

				MysteryBox : 'Mystery Box',

				MobKill : 'Boss Killings',

				CollectionComplete : 'Completed Collections',

				QuestItem : 'Send Items',

				QuestComplete : 'Bonus Experience',

				MonsterGrade : 'New Monster Registered',

				LevelUp : 'Level Up',

				DailyBonus : 'Daily Bonus',

				HeartLevelUp : 'HeartLevelUp',

			},



			tests: [

				{url:"viral_type=MysteryBox",ret:"MysteryBox"},

				{url:"viral_type=MobKill",ret:"MobKill"},

				{url:"viral_type=CollectionComplete",ret:"CollectionComplete"},

				{url:"viral_type=QuestItem",ret:"QuestItem"},

				{url:"viral_type=QuestComplete",ret:"QuestComplete"},

				{url:"viral_type=MonsterGrade",ret:"MonsterGrade"},

				{url:"viral_type=LevelUp",ret:"LevelUp"},

				{url:"viral_type=DailyBonus",ret:"DailyBonus"},

				{url:"viral_type=HeartLevelUp",ret:"HeartLevelUp"}

			],



			menu: {

				MsA_section_main:{type:"section",label:"Maplestory Adventures Manager Options ("+version+")",kids:{

					MsA_updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/112401.user.js"},

					MsA_sep:{type:"separator",label:"Bonus Gold",kids:{

						MobKill:{type:"checkbox",label:"From bosses fights"},

						CollectionComplete:{type:"checkbox",label:"From completed collections"},

						MonsterGrade:{type:"checkbox",label:"New registered monsters"},

					}},

	

					MsA_expseparator:{type:"separator",label:"Bonus EXP",kids:{

						QuestComplete:{type:"checkbox",label:"From quest completed"},

						LevelUp:{type:"checkbox",label:"From friend's level up"},

						HeartLevelUp:{type:"checkbox",label:"From friend's heart's level up"},

					}},

	

					MsA_itemsseparator:{type:"separator",label:"Free Items",kids:{

						MysteryBox:{type:"checkbox",label:"Get Mystery Boxes items"},

						DailyBonus:{type:"checkbox",label:"Get 'playing 5 days in a row' items"},

					}},

	

					MsA_helpseparator:{type:"separator",label:"Help Friends",kids:{

						QuestItem:{type:"checkbox",label:"Help Out Friends"},

					}},

				}},

			}

		};



		attString=JSON.stringify(attachment);

		door.appendChild(createElement('div',{id:'wmDoor_app191616050877248','data-ft':attString}));

		window.setTimeout(function(){click(door);},1000);

	};

	



	var main = {

		sendMessage : function (s){

			unsafeWindow.top.location.hash = s;

		},



		run : function (){

			try{

				var statusCode=0;

				var doc=document.documentElement;

				var text=doc.textContent;

				var html=doc.innerHTML;				



			} catch(e){window.setTimeout(main.run,500);return;}

			

		  //***** The WM script can recieve and act on the following statusCode values:     *****

		  /*

			    1: Acceptance, no stipulations

			    0: Unknown return, use this only if your script encounters unplanned results and can still communicate a result

			   -1: Failure, generic

			   -2: Failure, none left

			   -3: Over Gift Limit failure

			   -4: Over Gift Limit, still allows sending gift, marked as accepted

			   -5: Identified server error

			   -6: Already got, failure marked as accepted

			   -7: Identified server down for repairs

			   -8: Problem finding a required action link

			   -9: reserved for WM functions

			  -10: reserved for WM functions

			  -11: Identified as expired

			  -12: Post source is not a neighbor and neighbor status is required. Future WM version will auto-add neighbor if possible.



			  //additional codes may now exist, please check the wiki support site for information

		  */

		  //*************************************************************************************



			if (html.find("has no more"))statusCode=-2;

			else if (html.find('is all out of '))statusCode=-2;

			else if (html.find('You are too late!'))statusCode=-1;

			else if (html.find("Nice! You've successfully sent the item to")) statusCode=1;

			else if (html.find("You've obtained")) statusCode=1;

			else if (html.find("just sent you")) statusCode=1;



			var link;

			if (statusCode!=0) main.sendMessage("status="+statusCode+(link?link:''))						

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
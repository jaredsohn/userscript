// ==UserScript==
// @name           Wall Manager Sidekick (HoN)
// @description    Assists Wall Manager with Heroes of Neverwinter
// @include        http://apps.facebook.com/neverwinterheroes/claimloot.php?
// @include        http://fbhonp.atari.com/client/claimloot.php?*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.7.1
// @copyright      Charlie Ewing
// ==/UserScript== 
(function() { 

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.7";
	var thisApp='156366727771379';
	var thisScript='115953';

	function $(ID,root) {return (root||document).getElementById(ID);}

	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	//sorts an array in such a way as to prevent
	//finding pea before peanut, or pea before english pea, and then effectively swapping their order
	//now also finds ash in cashew and places ash after cashew
	Array.prototype.fixOrder = function(){
		if (this.length>1) for (var i=this.length-1;i>0;i--) {
			for (var i2=i-1;i2>0;i2--){
				if (this[i].contains(this[i2])){
					var b=this[i];
					this[i]=this[i2];
					this[i2]=b;
					b=null;
				}
			}
		}
		return this;
	};

	//reconstruct an array, turning it into definitions using a prefix
	Array.prototype.toDefinitions = function(prefix){
		if (this) for (var i=0;(this[i]);i++) this[i]=prefix+this[i].noSpaces().toLowerCase();
		return this;
	};


	//returns the merge of any number of JSON objects
	//pass JSON objects as comma separated parameters
	//var newJSON = mergeJSON(a,b,c...n)
	//note: overwrites preexisting entries from earlier passed objects
	function mergeJSON () {
		var ret = {};
		for (var a=0,len=arguments.length;a<len;a++) for (var v in arguments[a]) ret[v] = arguments[a][v];
      		return ret;
	};

	//short form for evaluate
	//returns a snapshot object
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	};

	//short form for evaluate with single node return
	//returns the actual node, not the snapshot
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	};

	//clicks an object using the mouse
	//does not run default actions like opening links
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
	};

	//sidekick ability to pass information via hash parameter
	function sendMessage(s){
		unsafeWindow.top.location.hash = s;
	};

	//use this array to replace texts for purposely screwed up test texts below
	//this allows to search correctly yet not display stuff wrong in recognition
	//or in the options menu when using quick arrays and the createMenuFromArray function below
	//keep all the text here in lowercase
	var screwyTexts = {};

	//mark all these as new while building the menus
	//this array is accessed directly by createmenufromarray so you dont need to pass it each time.
	var allNewItems=[];

	//build a menu list based on an array of text
	//add a prefix to the return word using prefix
	//automatically sorts alphabetically, set sort=false to disable
	//automatically capitalizes first letter of every word
	//fill the markAsNew array with elements you want marked green
	function createMenuFromArray(arr,prefix,sort,markAsNew){
		markAsNew=[].concat(allNewItems, (markAsNew||[]));
		sort=(sort==null)?true:sort;
		var ret={};
		if (arr) {
			//clone the array before sorting
			arr2=arr.slice(0);
			if (sort) arr2=arr2.sort();
			for (var i=0,len=arr2.length;i<len;i++){
				var keyName = (prefix||'')+arr2[i].noSpaces().toLowerCase();
				var fixedLabel=screwyTexts[arr2[i].toLowerCase()];
				ret[keyName]={type:'checkbox',label:(fixedLabel || arr2[i]).upperWords(),newitem:(markAsNew.inArray(keyName))};
			}
			arr2=null;
		}
		return ret;
	};

	
	//build Accept Text object from an array
	//add a prefix to the return key using keyPrefix, ie "FVcow_"
	//add a suffix to the return value using textSuffix, id " Cow"	
	function createAccTextFromArray(arr,keyPrefix,textSuffix){
		var ret={};
		if (arr) {
			for (var i=0,len=arr.length;i<len;i++){
				ret[(keyPrefix||'')+arr[i].noSpaces().toLowerCase()]=arr[i].upperWords()+(textSuffix||'');
			}
		}
		return ret;
	};

	function dock(){

		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			//cannot find dock
			window.setTimeout(dock, 1000);
			return;
		} 

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+thisApp);
		if (doorMark) return; //already posted to door

		var materials=["Hero's Commendation","Potion of Luck","Potion of Blessed Circumstance","Conyberry Mead","Potion of Healing",
			"Thieves' Tools","Crag Mushroom","50 Gold","100 Gold","Port Llast Reserve","Helm's Hold Journeybread","Dwarven Celebration Brew",
			"Enchanted Thieves' Tools","Glyph of Hope","25 Gold","Vial of Slayer's Sight","Zombie Juice","Potion of Vitality"].fixOrder();

		var attachment={
			appID:thisApp,
			alias:'HoN',
			hrefKey:'token',
			name:'Heroes of Neverwinter',
			thumbsSource:['edgecastcdn.net'],
			flags:{},
			accText: createAccTextFromArray(materials),
			icon:"http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/167/156366727771379/app_2_156366727771379_2166.gif",
			desc:"Heroes of Neverwinter Sidekick",

			tests: [
				{link:["go play","Play Dungeons & Dragons:"],ret:"exclude"},

				{body:'{%1}',subTests:materials,ret:'{%1}'},

			],

			menu: {
				section_main:{type:"section",label:"Heroes of Neverwinter ("+version+")",kids:{
					updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+thisScript+'.user.js'},
					sharessep:{type:'tab',label:"Resources",kids:{
						sharesblock:{type:'optionblock',label:"Resources",kids:createMenuFromArray(materials,'','',allNewItems)},
						doUnknown:{type:'checkbox',label:"Process Unknown Links"},
					}},
				}},
			}
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+thisApp,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	

	function run(){
		try{
			var statusCode=0;
			var doc=document.documentElement;
			var text=doc.textContent;
			var html=doc.innerHTML;
		} catch(e){window.setTimeout(run,500);return;}

		//check page for various texts
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
			-13: Requirements not met

			//additional codes may now exist, please check the wiki support site for information
		*/
		if (html.find("You can't claim your own loot!")) sendMessage("status=-1");
		else if (html.find("You can't claim the same gift more than once!")) sendMessage("status=-6");
		else if (html.find("You can find it available in your Chest of Wonders for 7 days")) sendMessage("status=1");
		else if (html.find("All of the loot has been claimed")) sendMessage("status=-2");
		else if (html.find("This gift has expired")) sendMessage("status=-11");
		else if (html.find("The link you've followed is invalid!")) sendMessage("status=-5");
	};

	
	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/')) {
		dock();
		return;
	}

	run(); 

})(); // anonymous function wrapper end
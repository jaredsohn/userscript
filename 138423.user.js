// ==UserScript==
// @name		Wall Manager Sidekick (SimCity Social)
// @namespace   WM_SimCity_Social_Sidekick
// @description	Assists Wall Manager with 'SimCity Social' posts
// @include		http://simcity.game.playfish.com/g/fb/simcity/accept_gift_fan_feed_link?
// @include		/^http:\/\/www\.facebook\.(com)\/pages\/FB-Wall-Manager\//
// @require     http://sizzlemctwizzle.com/updater.php?id=138423&days=1
// @version		0.0.3
// @copyright   Charlie Ewing(main code) + Shane Lewis(edited)
// ==/UserScript== 

(function() {	// anonymous function wrapper start

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.3";		// This should match the @version above in the usersctipt meta-block
	var appID='225496380820004';	// Unique ID of the Facebook Application.
	var appName='SimCity Social';	// Name of the Facebook Application.
	var scriptID='138423';		// Unique userscripts id.


	//construct some arrays we can use multiple times below
	/*
		All material objects have these parameters:
		id: this is some part of the link url that we can read to identify this bonus type
		name: this is the text name to be displayed upon identification and in the menu
		event: (optional) sort your materials into groups using the event parameter. see "siren" below for example
	*/

	var materials=[
	];

	//add the menu id's of all new items here
	//menu id's follow this format: for Weapon Crate, you would have "sendweaponcrate"
	//marking an item as new highlights it so users can find it easier, or notice what has changed
	var newItems = [
	];




	/****************************************************************************
	*****	The following functions are provided under Creative-Commons	*****
	****************************************************************************/
	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}

	// Returns index to text S in a string. Works nicely as a boolean expression.
	String.prototype.find = function(s) {
		return (this.indexOf(s) != -1);
	};

	// Returns true if string starts with text S
	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	//sorts an array in such a way as to prevent
	//finding pea before peanut, or pea before english pea, and then effectively swapping their order
	//now also finds ash in cashew and places ash after cashew
	Array.prototype.fixOrder = function(){
		if (this.length>1) for (var i=this.length-1;i>0;i--) {
			for (var i2=i-1;i2>0;i2--){
				if (this[i].toLowerCase().contains(this[i2].toLowerCase())){
					var b=this[i];
					this[i]=this[i2];
					this[i2]=b;
					b=null;
				}
			}
		}
		return this;
	};

	//gets the location pathname without the file name
	//ie http://apps.facebook.com/onthefarm/reward.php?asdjpasodjfasoidfjaosidjfasdfjasdif 
	//becomes just http://apps.facebook.com/onthefarm
	function getDir() {
		var thisLoc; (thisLoc=(location.protocol+"//"+location.host+location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/"); return thisLoc;
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

	//build Accept Text object from an array
	//add a prefix to the return key using keyPrefix, ie "cow_"
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

	// Short form for evaluate function, returns a DOM node selection
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	};

	// Short form for evaluate function, returns a single DOM node
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	};

	// Clicks object E. Only fires the click event, not any events that open links.
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	// Creates an html object
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	};

	// Sends a hash message back to the WM host script. Tries gentle first, resorts to forceful if needed.
	function sendMessage(s){
		try {
			window.top.location.hash = s;
		} catch (e) {
			if (window.self != window.top) window.top.location.href = "http://dummy.facebook.com/?#"+s;			
		}
	};

	function menuFromData(data,menu,newItemList){
		newItemList=(newItemList||[]);
		for (var m=0,len=data.length; m<len; m++){
			var material = data[m]["name"].noSpaces().toLowerCase();
			var accText = data[m]["name"];
			var event = (data[m]["event"]||"Unsorted");

			var thisMenu;
			if ( !(thisMenu=(menu["optblock"+event]||null) ) ) {
				//create this option block
				thisMenu=(menu["optblock"+event]={type:"optionblock",label:event,kids:{} });
			}
			//create this material element
			thisMenu.kids["send"+material]={type:"checkbox",label:accText,newitem:newItemList.inArray("send"+material)};
		}
	};

	/****************************************************************************
	*****	this section must be tailored to fit your specific needs	*****
	*****		instructions are included in each section		*****
	****************************************************************************/
	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			window.setTimeout(dock,1000);
			return; //cannot find docking door
		}

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+appID);
		if (doorMark) return; //already posted to door



		//grab a materials array that is just text out of the above object list so we can make menu objects easier
		var matList = [];
		for (var m=0,mat;(mat=materials[m]);m++){matList.push(mat.name);}
		matList.fixOrder();

		var accTextCustoms={reward:"Social Skills",simoleon:"Simoleons",send:"Unknown", doUnknown:"Unknown",entertainment:"Entertainment",
					goodwill:"Goodwill",love:"Love",fury:"Fury"};
		var accTextMaterials=createAccTextFromArray(matList,"send");

		var menu= {
			mainsec:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/"+scriptID+".user.js"},

				mainsep:{type:"separator",label:"Basics",kids:{
					reward:{type:"checkbox",label:"Get Rewards/Social Skills"},
					simoleon:{type:"checkbox",label:"Get Simoleons"},
					goodwill:{type:"checkbox",label:"Get goodwill"},
					love:{type:"checkbox",label:"Get love"},
					fury:{type:"checkbox",label:"Get fury"},
					entertainment:{type:"checkbox",label:"Get entertainment"},

					doUnknown:{type:"checkbox",label:"Process unknown links"},
				
				}},
				sendsep:{type:"separator",label:"Actions",kids:{
					sendall:{type:"checkbox",label:"Send All Requested Items (or pick from list below)"},
				}},
			}}
		};

		menuFromData(materials,menu.mainsec.kids.sendsep.kids,newItems);

		var attachment={
			appID:appID,
			name:appName,
			thumbsSource: "app_full_proxy.php?app=225496380820004",
			flags:{},
			icon: "http://photos-b.ak.fbcdn.net/photos-ak-snc7/v85005/224/225496380820004/app_2_225496380820004_1276954631.gif",
			desc: appName+" Sidekick (ver "+version+")",
			
			accText: mergeJSON(accTextCustoms, accTextMaterials), 
			tests: [
				{link:appName,ret:"exclude"}, // Ignore certain posts that invite you to play the game

				{either:"simoleon",ret:"simoleon"}, 
				{either:["reward","social point"],ret:"reward"}, 
				{either:"%1",subTests:["goodwill","love","fury","entertainment"],ret:"%1"}, 
				{link:["help","send"],ret:"send"}, 

				// Send materials links
				{either:matList, ret:"none", kids:(function(){
					//create automated searches based upon material array above
					var ret=[];
					for(var m=0,mat;(mat=materials[m]);m++){
						ret.push({either:mat.id+"&",ret:"send"+mat.name.noSpaces().toLowerCase()});
					}
					return ret;
				})()},
			],

			menu:menu,
		};

		attString=JSON.stringify(attachment);

		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+appID,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	/***************************************************************************/

	var main = {

		run : function (){
			/**********************************************************************
			*****	this section must be tailored to fit your specific needs		*****
			*****			instructions are included in each section					*****
			**********************************************************************/
			//	Check that we are on the Application iFrame,
			//	because thats where we do our job.

				/*******************************************************************
					The WM script can recieve and act on the following
					statusCode values, additional codes may exist,
					please check the WM script source lines...
					"1":"Accepted",
					"0":"Unknown",
					"-1":"Failed",
					"-2":"None Left",
					"-3":"Over Limit",
					"-4":"Over Limit, Sent One Anyway",
					"-5":"Server Error",
					"-6":"Already Got",
					"-7":"Server Down For Repairs",
					"-8":"Problem Getting Passback Link",
					"-9":"Final Request Returned Null Page",
					"-10":"Final Request Failure",
					"-11":"Expired",
					"-12":"Not a Neighbor",
					"-13":"Requirements not met",
				*******************************************************************/
			var text = document.documentElement.textContent;

			if(!text) {
				//no document text to read
				sendMessage("status=-5"); return;
			}

			//accepts
			else if (text.match( /(You've successfully accepted this gift!)/ )) {
				sendMessage("status=1"); return;

			}

			//already accepts
			else if (text.match( /(Sorry, (Y|y)ou('ve| have)? already clicked on this link?)/ )) {
				sendMessage("status=-6"); return;

			}

			//over-limits
			else if (text.match( /(Sorry, you've clicked on too many links today - try again tomorrow)/ )) {
				sendMessage("status=-3"); return;

			}

			//all-outs
			else if (text.match( /(The maximum number of rewards|all the gifts have been claimed)/ )) {
				sendMessage("status=-2"); return;

			}

			//odd fails
			else if (text.match( /(Couldn't find ViralReward|Collecting own reward)/ )) {
				sendMessage("status=-5"); return;

			}

			//not a neighbor
			else if (text.match( /(you have to be friends)/ )) {
				sendMessage("status=-12"); return;

			}

			//generic fails
			else if (text.match( /(Sorry|intended for someone else)/ )) {
				sendMessage("status=-1"); return;

			}

			/*********************************************************************/

			window.setTimeout(main.run,1000);
		},
	};

	//check for dock.
	if (window.location.href.match(/^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\//)) dock();
	else main.run();

})();	//	anonymous function wrapper end
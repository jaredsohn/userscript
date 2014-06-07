// ==UserScript==
// @name           Wall Manager Sidekick (CastleVille)
// @description    Assists Wall Manager with CastleVille posts
// @include        http://*.castle.zynga.com/receive.php?*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        2.0.0
// @require        http://sizzlemctwizzle.com/updater.php?id=118099&days=1
// @copyright      Pappawolfie & Charlie Ewing
// ==/UserScript==

(function() { 

	//**includes above fixed to ONLY include the game reward page and the collector console page to save memory


	//********************************************************************************
	//***** the auto update function needs a easy way to get the current version *****
	//***** this should match the @version above                                 *****
	//********************************************************************************

	var version = "2.0.0";
        var appID="107040076067341";
        var scriptID="118099";
        var appName="CastleVille";

	//********************************************************************************
	//***** here is your materials list                                          *****
	//***** each material has an id which identifies it via the url              *****
	//***** each material has a name which is the visible name in the options    *****
	//***** each material can have an event parameter to help organize it        *****
	//***** omit the id parameter to force the script to use its name minus spaces *****
	//***** omit the event parameter to force the material into an unsorted group *****
	//********************************************************************************

	var materials = [
		{name:"rubble wall",},
		{name:"energy",},
		{name:"crystal shard",id:"ExpansionUnlocked"},
		{name:"rolling pin",},
		{name:"grapes",},
		{name:"stones",},
		{name:"regal hoe",},
		{name:"red tulip",},
		{name:"milk bottle",},
		{name:"gold brick",},
		{name:"wood club",},
		{name:"royal jewels",},
		{name:"mystery meat",},
		{name:"honey",},
		{name:"fairy wings",},
		{name:"bubbly grog",},
		{name:"dragon scales",},
		{name:"spy glass",},
		{name:"courtyard",},
		{name:"pail of water",},
		{name:"love letter",},
		{name:"ogre's belch",},
		{name:"red feather",},
		{name:"flask",},
		{name:"eye of newt",},
		{name:"flower box",},
		{name:"moldy cheese",id:"BeastieAttractant"},
		{name:"longbow",},
		{name:"all purpose polish",id:"polish"},
		{name:"copper tube",},
		{name:"snowy treat cone",},
		{name:"iron pick",},
		{name:"book",id:"book&"}, //dont remove the & off the end of the id because it keeps the script from finding face"book" as a book
		{name:"yummhee yeast",},
		{name:"eggs",},
		{name:"snow shoes"},
		{name:"wood log",},
		{name:"flax",},
		{name:"alchemist powder",},
		{name:"bass",},
		{name:"xp",},
		{name:"coins",},
		{name:"reputation",},
		{name:"candle",},
		{name:"rope",},
	];

	//mark all these as new while building the menus
	var newItems=[
		"sendpolish",
		"polish",
		"sendyummheeyeast",
		"yummheeyeast",
		
		//add any other stuff here you want. I didnt go out of my way to list everything I added just now
		//delete them when you make another update and put the new stuff in
		//everything you put in here will display with a green highlight in the options menu
		
	];



	//********************************************************************************
	//***** the following functions are provided under creative commons          *****
	//********************************************************************************

	// Get element by id shortform with parent node option
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
	
        //returns information to the main WM script via the address bar, 
        //allowing cross domain conversations
	// ** updated to allow deeper windows to fire a return message
	function sendMessage(s,hwnd){
		hwnd = (hwnd||window.top);
		try {
			hwnd.location.hash = s;
		} catch (e) {
			hwnd.location.href = "http://apps.facebook.com/?#"+s;
		}
	}

	//inserts one or more menu option blocks based upon the materials list above
	//marking all new items in the newitem list above as green so users can easily find your changes
	function menuFromData(data,menu,newItemList,prefix){
		newItemList=(newItemList||[]);
		for (var m=0,len=data.length; m<len; m++){
			var material = (data[m]["id"]||data[m]["name"]).noSpaces().toLowerCase();
			var accText = data[m]["name"].upperWords();
			var event = (data[m]["event"]||"Unsorted").upperWords();

			var thisMenu;
			if ( !(thisMenu=(menu["optblock"+event]||null) ) ) {
				//create this option block
				thisMenu=(menu["optblock"+event]={type:"optionblock",label:event,kids:{} });
			}
			//create this material element
			thisMenu.kids[prefix+material]={type:"checkbox",label:accText,newitem:newItemList.inArray(prefix+material)};
		}
	};

	//********************************************************************************
	//***** this section must be tailored to fit your specific needs             *****
	//***** instructions are included in each section                            *****
	//********************************************************************************

	function dock(){
		//check that dock exists
		var door=$('wmDock');
		if (!door) {
			window.setTimeout(dock,500); //try again in a bit
			return; //cannot find docking door
		}

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app'+appID);
		if (doorMark) return; //already posted to door


		//********************************************************************************
		//***** Here's a faster array setup for the script                           *****
		//********************************************************************************

		var sendWords = ["needs","send","looking for","get one too","get some too","could sure use some","want to get","You'll get a"];

		var matList = [], searchList = []; accTexts={};
		for (var m=0,mat;(mat=materials[m]);m++){
			var id=(mat.id||mat.name).noSpaces().toLowerCase();
			matList.push(mat.name);
			searchList.push(id);
			accTexts[id]=mat.name.upperWords();
			accTexts["send"+id]=mat.name.upperWords();
		}
		matList.fixOrder();
		searchList.fixOrder();


		//********************************************************************************
		//***** Here's a faster accept text setup for the script                     *****
		//********************************************************************************
		var accTextCustoms={
			doUnknown:"Unknown",send:"Unknown",xp:"XP",
		};

		//ok now on to the original sidekick stuff

		var attachment={
			appID:appID,
			name:appName, //how you want it to display
			thumbsSource:'app_full_proxy.php?app=107040076067341',
			flags:{},
			alterLink: {},
			icon:"http://photos-e.ak.fbcdn.net/photos-ak-snc1/v43/109/107040076067341/app_2_107040076067341_5448.gif",
			desc:appName+" Sidekick (ver "+version+")",

			accText: mergeJSON(accTexts,accTextCustoms), //get this from the stuff we made above

			tests: [
				{link:"go play",ret:"exclude"},

				// Provide a list of tests below as JSON objects
				// tests must include one of the following parameters: url,body,html,link,either
				// tests must include a ret parameter which states the code from accText to link to
				// Separate tests with a comma (,)
				// the test above this option block uses the "exclude" magic word to block facebook "just started playing" notices
				// tests may return the following magic words which behave differently and are hardcoded in the WM script: "exclude","none","wishlist".


				//catch missed stuff
				{url:["frType=CoreVisit_W2WDidWork"],ret:"energy"},
				{url:["frType=Quest_FeedDefault&","frType=CoreFTUE_FeedLevelUp"],ret:"coins"},
				{url:["frType=CoreExpand_FeedAsk&"],ret:"sendexpansionunlocked"}, //an alternate crystalshard link
				{url:["frType=FeatCastle_FeedCrewComplete"],ret:"reputation"},

				//if send words are found, but material does not exist in the list, returns just "send" so sendall picks it up
				{either:sendWords,ret:"send",kids:[
					{url:"{%1}",ret:"send{%1}",subTests:searchList},
				]},

				//check for getting materials
				{url:"{%1}",ret:"{%1}",subTests:searchList}, //get materials

			],

			menu: {
				// Provide a menu tree below as a JSON object
				// Accepted menu item types include: separator, optionblock, link, checkbox, radio, select, hidden, textarea
				// Functions included in the object will be destroyed when passed to the WM script, but
                                // some built in functions are accessible from the elements "button_selectmulti",
                                // "button_highlight" and "button_selectprefix"


				// a very simple example menu is provided below
				
				section_main:{type:"section",label:appName+" ("+version+")",kids:{
					updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
					sep:{type:'separator',label:'Get Items',kids:{
	        	                        //see many more complex elements in use by 
		                                //viewing the source for the FV or FrV sidekick
	
        		                        //"doUnknown" is a magic word in the WM main script that
                		                //causes any return value of "none" to be renamed "doUnknown"
						//and then causes the script to try them anyway
						doUnknown:{type:"checkbox",label:"Process Unknown Links"},
						
						//other menu objects to GET added below

					}},
					sendsep:{type:"separator",label:"Send Items",kids:{
       		                        	//"sendall" is a magic word in the WM main script that
                		                //causes any return value with a prefix of "send" to be 
                        		        //sent even if they are not checked
						sendall:{type:'checkbox',label:'Send All (or select from options below)'},
						send:{type:'checkbox',label:'Send Unrecognized Items'},

						//other menu objects to SEND added below


					}},
				}},
			}
		};

		//attach material lists to the menu
		menuFromData(materials,attachment.menu.section_main.kids.sep.kids,newItems,"");
		menuFromData(materials,attachment.menu.section_main.kids.sendsep.kids,newItems,"send");

		//convert the menu to a string for attachment
		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+appID,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	


	//********************************************************************************
	//***** this section must be tailored to fit your specific needs             *****
	//***** instructions are included in each section                            *****
	//********************************************************************************

	function run(){
		try{
			var statusCode=0;
			var doc=document.documentElement;
			var text=doc.textContent;
			var html=doc.innerHTML;

			// you may wish to use a gameLoaded variable, supply a statement that determines if the game has loaded
			// an example gameLoaded query is provided
			//var gameLoaded=unsafeWindow.location.href.startsWith('http://fb-client-0.empire.zynga.com/flash.php?') && html.contains('object id="flashapp"');

		} catch(e){window.setTimeout(main.run,1000);return;} //this line restarts the function if it crashed while initializing

		//*************************************************************************************
		//***** this section must be tailored to fit your specific needs                  *****
		//***** below is a list of searches for text pertaining to various messages       *****
		//***** the list below is not generic and targets Empires and Allies specifically *****
		//***** you will need to find the specific texts for the game you selected        *****
		//*************************************************************************************
		//***** The WM script can recieve and act on the following statusCode values:     *****
		/*
				  	"3":"Marked as accepted by user",
					"2":"Responseless Collection",
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
					"-14":"Timeout",
					"-15":"Unrecognized Response",			
					"-16":"Passback Link is missing",			
					"-17":"Window Missing",
					"-18":"Marked as failed by user",
			//additional codes may now exist, please check the wiki support site for information
		*/
		//*************************************************************************************


		//**message texts changed to RegExp format for easier faster and more accurate checking
		//**if you need training on how to add stuff here just let me know

		//already claimed
		if (html.match(/(You('ve)? already responded)/)) statusCode=-6; 
 
		//over-limits
		else if (html.match(/(cannot have anymore|reached the collection limit|maximum energy has been awarded)/)) statusCode=-3; 
 			
		//all-outs
		else if (html.match(/(all the (.*) (have|has) been claimed)/)) statusCode=-2; 

		//generic fails
		else if (html.match(/(can't claim this reward)/))statusCode=-1;

		//server errors
		else if (!text) statusCode=-5;

		//accepts
		else if (html.match('Gift Claimed Successfully')) statusCode=1;

		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(run,1000); //restart if nothing was found of value
	};


	//start the script either as a docking sidekick, or as a reward reading sidekick
	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/')) {
		dock();
		return;
	}
	run();

})(); // anonymous function wrapper end
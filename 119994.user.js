// ==UserScript==
// @name           Wall Manager Sidekick (Pot Farm Blaze Runner)
// @description    Assists Wall Manager with Pot Farm posts
// @include        http://thepotfarmgame.com/*
// @include        http://www.thepotfarmgame.com/*
// @include        http://www.facebook.com/*
// @exclude        http://www.facebook.com/groups/*
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
// @version        0.0.1
// @require        http://sizzlemctwizzle.com/updater.php?id=119994&days=1
// @copyright      MonkeyNround
// ==/UserScript== 
(function() { 

	var version = "0.0.1";
	var thisAppID = "222727414408240";
	var defaultTO=null;

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
	function setHashParam(p,v){
		var h = unsafeWindow.top.location.hash;
		var params = h.split('&');
		var found=false;
		if (params.length) for (var x=0;x<params.length && !found;x++){
			var p1 = params[x].split('=')[0];
			var v1 = params[x].split('=')[1];
			if (p1 == p) {
				params[x]=p+'='+v;
				found=true;
			}
		}
		if (!found) params[params.length]=p+'='+v;
		h=params.join('&');
		unsafeWindow.top.location.hash = h;
	};

	function sendMessage(s){
		top.location.href = 'http://www.facebook.com/ThereIsNoWayThisExists/#status=' + s;
		return;
		try {
			setHashParam('status',s);
		} catch(e) {
			try{
				top.location.hash += "&status="+s;
			} catch(e){							
				if (window != top) top.location.href = "http://apps.facebook.com/?#status="+s;			
			}
		}
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

		var doorMark=$('wmDoor_app'+thisAppID);
		if (doorMark) return; //already posted to door

		var attachment={
			appID:'222727414408240',
			alias:'PF BR',
			hrefKey:'item', //such as sendkey
			name:'Blaze Runner', //how you want it to display
			thumbsSource:'www.thepotfarmgame.com',
			flags:{httpsTrouble:true,requiresTwo:false,skipResponse:false,alterLink:true},
			icon:"http://external.ak.fbcdn.net/safe_image.php?d=AQAWRdi35LD2GK5A&w=90&h=90&url=http%3A%2F%2Fa1.twimg.com%2Fprofile_images%2F1449405777%2Fpf45_bigger.jpg",
			desc:"Blaze Runner Sidekick ("+version+")",

			alterLink: {
				find: "apps.facebook.com/mypotfarm",
				replace: "thepotfarmgame.com/potfarm", //"apps.facebook.com/mypotfarm",
				},
			
			accText: {
				_blazerunner_game:"Blaze Runner Mobile Phone Seeds"
			},
			tests: [
				{url:"item=Blaze_Runner",ret:"_blazerunner_game"}
			],

			menu: {
				SSsection_main:{type:"section",label:"Pot Farm Feed Options ("+version+")",kids:{
					SSupdateSidekick:{type:"link",label:"Update PF Sidekick",href:"http://userscripts.org/scripts/source/119994.user.js"},
					SSbasic:{type:"separator",label:"Basics",kids:{
						_blazerunner_game:{type:"checkbox",label:"Blaze Runner Bonus seeds from Mobile Phones"},
					}},
				}},
			}
		};

		attString=JSON.stringify(attachment);
		door.appendChild(createElement('div',{id:'wmDoor_app'+thisAppID,'data-ft':attString}));
		window.setTimeout(function(){click(door);},1000);
	};
	

	//main script function
	function run(){
		var href = window.location.href;
		var text = document.documentElement.textContent;
		var thisLoc; (thisLoc=(location.protocol+"//"+location.host+location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/");

		//*************************************************************************************
		//***** this section must be tailored to fit your specific needs                  *****
		//***** below is a list of searches for text pertaining to various messages       *****
		//***** the list below is not generic and targets Empires and Allies specifically *****
		//***** you will need to find the specific texts for the game you selected        *****
		//*************************************************************************************
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

		if (href.startsWith('http://www.facebook.com/')) {
			dock();
			return;
		}

		else if (href.startsWith(thisLoc+'/blazeClaim.php')) {
			if (text.find('You now have 1 Blaze Runner in your gift box')) {
				sendMessage('1');
				return;
			}
			else if (text.find('You have already claimed this')) {
				sendMessage('-6');
				return;
			}
		}
	}
	//start the script
	window.setTimeout(run,500);

})(); // anonymous function wrapper end
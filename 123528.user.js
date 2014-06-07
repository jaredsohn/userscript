// ==UserScript==
// @name           Wall Manager Sidekick (Slotomania)
// @description    Assists Wall Manager with Slotomania posts
// @include        http*://apps.facebook.com/slotomania/*
// @include        http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.2.2
// @copyright      Charlie Ewing
// ==/UserScript==

(function() { 
	var version = "0.0.2.2";
        var appID="169545139744270";
        var scriptID="123528";
        var appName="Slotomania";

	var materials = [
		{name:"200"},
		{name:"300"},
		{name:"500"},
	];

	//mark all these as new while building the menus
	var newItems=[
		
	];

	//required functions
	function $(ID,root) {return (root||document).getElementById(ID);};
	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};
	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};
	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};
	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};
	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};
	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};
	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};
	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};
	Array.prototype.fixOrder = function(){if (this.length>1) for (var i=this.length-1;i>0;i--) {for (var i2=i-1;i2>0;i2--){if (this[i].toLowerCase().contains(this[i2].toLowerCase())){var b=this[i];this[i]=this[i2];this[i2]=b;b=null;}}}; return this;};
	Array.prototype.toDefinitions = function(prefix){if (this) for (var i=0;(this[i]);i++) this[i]=prefix+this[i].noSpaces().toLowerCase();return this;};
	function selectNodes(xPath,params){params=(params||{});return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);};
	function selectSingleNode(xPath,params){params=params||{}; params['type']=9;return selectNodes(xPath,params).singleNodeValue;};
	function click(e) {if(!e && typeof e=='string') e=document.getElementById(e);if(!e) return;var evObj = e.ownerDocument.createEvent('MouseEvents');evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(evObj);};
	function getDir() {var thisLoc; (thisLoc=(location.protocol+"//"+location.host+location.pathname).split("/")).pop(); thisLoc=thisLoc.join("/"); return thisLoc;};
	function mergeJSON () {var ret = {};for (var a=0,len=arguments.length;a<len;a++) for (var v in arguments[a]) ret[v] = arguments[a][v];return ret;};
	function createElement(a,b,c) {if(a=="text") {return document.createTextNode(b);};var ret=document.createElement(a.toLowerCase());if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);else ret[prop]=b[prop];if(c) c.forEach(function(e) { ret.appendChild(e); });return ret;};
	function sendMessage(s,hwnd){hwnd = (hwnd||window.top);try {hwnd.location.hash = s;} catch(e){hwnd.location.href = "http://www.facebook.com/reqs.php?#"+s;}};

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

	//dock with sidekick
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

		var sendWords = ["needs","send","looking for","get one too","get some too","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

		var matList = [], searchList = []; accTexts={};
		for (var m=0,mat;(mat=materials[m]);m++){
			var id=(mat.id||mat.name).noSpaces().toLowerCase();
			matList.push(mat.name);
			searchList.push(mat.name); //in this game we use the title bar and use exact text matching
			accTexts[id]=mat.name.upperWords();
		}
		matList.fixOrder();
		searchList.fixOrder();

		var accTextCustoms={
			doUnknown:"Unknown",coins:"Unknown Coins",
		};

		var attachment={
			appID:appID,
			name:appName, 
			thumbsSource:'app_full_proxy.php?app='+appID,
			flags:{},
			alterLink: {},
			icon:"http://photos-b.ak.fbcdn.net/photos-ak-snc1/v27562/94/169545139744270/app_2_169545139744270_6044.gif",
			desc:appName+" Sidekick (ver "+version+")",
			accText: mergeJSON(accTexts,accTextCustoms), 

			tests: [
				//check for known coin values
				{title:"{%1}",ret:"{%1}",subTests:searchList},

				//check for other coin value
				{ret:"coins",title:["coins","monedas","pièces","münzen"]}, //get coins
			],

			menu: {
				section_main:{type:"section",label:appName+" ("+version+")",kids:{
					updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
					sep:{type:'separator',label:'Get Items',kids:{
						doUnknown:{type:"checkbox",label:"Process Unknown Links"},
					}},
				}},
			}
		};

		//attach material lists to the menu
		//menuFromData(materials,attachment.menu.section_main.kids.sep.kids,newItems,"");
		menuFromData(materials,attachment.menu.section_main.kids.sep.kids,newItems,"");

		//convert the menu to a string for attachment
		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app'+appID,'data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
	};
	

	function run(){
		//this sidekick cannot return response data from the game 
		//because the messages are inside the flash object

		//we also cannot benefit from the flag skipResponse because it does not allow
		//time for the game to accept the codes in the opening process

		//instead we just assume the game loaded after X seconds
		//and return a similar value as the skipResponse flag would

		window.setTimeout(function(){sendMessage("status=2");},3000); //currently set to 3 seconds for good measure

	};


	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.host=='www.facebook.com') {dock();return;};
	run();

})(); // anonymous function wrapper end
// ==UserScript==
// @name           Wall Manager Sidekick (KOC)
// @description    Assists Wall Manager with Kingdoms of Camelot posts
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// @include        http://kingdomsofcamelot.com/*
// @include        http://www.kingdomsofcamelot.com/*
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
// @version        0.0.1
// @require        http://sizzlemctwizzle.com/updater.php?id=110171&days=1
// @copyright      Unixwizard
// ==/UserScript== 
(function() { 

	var version = "0.0.1";

  	// Return as quickly as possible if we are not in an iframe
  	//if (unsafeWindow.parent == unsafeWindow || typeof unsafeWindow.parent == 'undefined') return;

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

	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}

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
		if (!door) return; //cannot find docking door

		//check that the dock does not not already have us listed
		var doorMark=$('wmDoor_app130402594779');
		if (doorMark) return; //already posted to door

		var attachment={
			appID:'130402594779',
			alias:'KOC',
			hrefKey:'gid',
			name:'KingdomsOfCamelot',
			thumbsSource:'',
			flags:{httpsTrouble:false,requiresTwo:true},

			accText: {
	
				KOClend: "Helped with Builds",
			},

			tests: [
				{link:"You can also summon a powerful",ret:"exclude"},
				{link:"Lend a Helping Hand",ret:"KOClend"},


			],

			menu: {				
				KOCsection_main:{type:"section",label:"Kingdoms of Camelot Manager Options ("+version+")",kids:{
				KOCupdateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/110171.user.js"},
				KOCsep:{type:"separator",label:"Basics",kids:{
					KOCtoken:{type:"checkbox", label:"Collect Tokens"},

				}},

				KOChelp:{type:"separator",label:"Help Friends",kids:{
					KOClend:{type:"checkbox", label:"Help with builds"},
					}}

			
				}}//end section
			}//end menu
		};

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app130402594779','data-ft':attString}));

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

			} catch(e){window.setTimeout(main.run,500);return;}

			//check page for various texts
			if (text.find("You've already helped"))statusCode=-6; //already claimed
			
			else if (text.find('You can get one Merlin\'s Magical Token every day'))statusCode=-3; //all daily limit reached
			else if (text.find('You have already received a token'))statusCode=-3;  
			else if (text.find("Here's a reward of"))statusCode=1;  //success send
			else if (text.find('You just got'))statusCode=1;  //success get
			else if (text.find('train has arrived. You received'))statusCode=1; //success get train
			else if (text.find('You gave '))statusCode=1;  //success give/get one
			else if (text.find('does not need help.'))statusCode=-2;  //out of rewards
			else if (text.find('The train has already finished its trip'))statusCode=-2;  //out of rewards train

			else if (text.find('Merlin awarded you a Magical Token'))statusCode=1;  //level too low to claim
			else if (text.find('You cannot accept this reward'))statusCode=-1;  //data missing error
			else if (text.find('Sorry, there was an error with your gift'))statusCode=-1;  //generic error
			else if (text.find('This kind of gift is no longer available'))statusCode=-1;  //expired seasonal type
			else if (text.find("You cannot click on your own feed"))statusCode=-1;  //send self error			
			else if (text.find('This gift is no longer available.'))statusCode=-1;  //generic expired
			else if (text.find('Sorry, there was an error with your gift'))statusCode=-1;  //generic error
			
			//else if (gameLoaded)statusCode=-1; //game loaded unexpectedly, not wanted, uncommenting this line causes problems


			else if (text.textContent=="")statusCode=-5;  //no document body
			else if (text.find('Do you want to help'))statusCode=1;

			var link='http://apps.facebook.com/kingdomsofcamelot/?page=helpfriend&tid=1&sid=7227596&lid=11&gid=928570&cid=46713&s=144&in=7227596&si=95';

			if (statusCode!=0) main.sendMessage("status="+statusCode+link?link:'')						
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
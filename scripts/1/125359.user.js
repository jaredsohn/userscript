// ==UserScript==
// @name           Wall Manager Sidekick (KOC)
// @description    Assists Wall Manager with Kingdoms of Camelot posts
// @include        *kingdomsofcamelot*
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
// @exclude        http://www.facebook.com/ai.php*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.0.1
// ==/UserScript== 

/**************************
* Credits for a huge portion of this script goes to
* Charlie Ewing & Joe Simmons for their CW WallManager sidekick
**************************/
(function() { 

	var version = "1.0.1";
	var Options = {serverId:0};

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

	String.prototype.contains = function(s) {
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

	
	function selectNodes(xPath, element) {
		return $g(xPath, {type:7, node:element||document.documentElement});
	};

	function selectSingleNode(xPath, element) {
		var nodes=$g(xPath, {type:7, node:element||document.documentElement});
		if (nodes!=null) return nodes.snapshotItem(0);
		return null;
	};


	function fireEvent(element,event){
    		var evt = document.createEvent("HTMLEvents");
    		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    		return !element.dispatchEvent(evt);
	};

	function click(e){
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	function sendMessage(s){
		unsafeWindow.top.location.hash = s;
	};

	function getFormData(form){
		//where form is the form element
		var action = form.getAttribute('action') & "/";
		var nodes = selectNodes(".//input[contains(wmOptions@name)]",form);
		if(nodes.snapshotLength) for(i=0;i<nodes.snapshotLength;i++){
			if(i>0) action+="&";
			action+=nodes.snapshotItem(i).getAttribute('name')+"="+nodes.snapshotItem(i).getAttribute('value');
		}
		return action;
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
		var doorMark=$('wmDoor_app130402594779');
		if (doorMark) return; //already posted to door

		var attachment={
			appID:'130402594779',
			alias:'KOC',
			hrefkey:'koc',
			name:'Kingdoms of Camelot',
			thumbsSource:'cdn1.kingdomsofcamelot.com', // Not sure
			flags:{httpsTrouble:true,requiresTwo:false},

			accText: {
				build:"help building", 
				research:"help researching",
				token:"Merlin's Magical Token"
			},
			
			tests: [{url:"si=85",ret:"token"},
					{url:"si=95",ret:"build"},
					{url:"si=107",ret:"research"},
					{url:"si=84",ret:"quest"},
					{url:"si=303",ret:"exclude"}],

			menu: {
				section_main:{
					type:"section",
					label:"Kingdoms of Camelot Manager Options ("+version+")",
					kids:{updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/125359.user.js"},
						sep:{
							type:"separator",
							label:"Basics",
							kids:{
								build:{type:"checkbox",label:"Help building"},
								research:{type:"checkbox",label:"Help research"},
								token:{type:"checkbox",label:"Get Merlin's token"},
								server:{type:"text",label:"Collect to server ID"},
							}
						}
					}
				},
			},
		}

		attString=JSON.stringify(attachment);
	
		//put note on the door
		door.appendChild(createElement('div',{id:'wmDoor_app130402594779','data-ft':attString}));

		//knock on the door
		window.setTimeout(function(){click(door);},1000);
		
		document.body.appendChild(
			createElement('span',{innerHTML:"KOC Server Id:"},[createElement('input',{value:Options.serverId,id:'app130402594779_serverId',title:"Set Server Id here"})])
		);
		$("app130402594779_serverId").addEventListener("change", setServer, false);
	};	
	
	function setServer(){
		Options.serverId = parseInt($("app130402594779_serverId").value);
		saveOptions();
	};

	function run(){
            try{
		var href = unsafeWindow.location.href;
		var doc = document.documentElement;
		var text = doc.textContent;
		var html = doc.innerHTML;

		//determine what page we are on
		var page = href.split("?")[0];

		var statusCode=0;
		//check page for various texts

/***********
https://apps.facebook.com/kingdomsofcamelot/?page=merlinshare&in=1762919&tid=7&sid=1762919&si=85&s=55
You have already received a token for Merlin's Magical Boxes today! Each day you can get one token from a friend in this way.

https://apps.facebook.com/kingdomsofcamelot/?page=helpfriend&tid=1&sid=1762919&lid=6&gid=1015473&cid=15978&s=339&in=1762919&si=95
 project has already been completed.
Do you want to help with  's construction?
You will reduce  's build time by 1 min or 1 percent. You can get one Merlin's Magical Token every day by helping your friends!
<a class="button25" onclick="$(&quot;claimhelpform&quot;).submit();return false;"><span>Next</span></a>
http://apps.facebook.com/kingdomsofcamelot/?page=accepttoken&s=55&in=1536655&tid=1&lid=10&gid=1916802&si=95
<a class="nextbtn" onclick="return checkServer($(&quot;serverid&quot;).value);return false;">Next</a>

https://apps.facebook.com/kingdomsofcamelot/?page=questshare&tid=11&sid=1762919&gid=3091&s=339&in=1762919&si=84
Lord   has shared a bonus with your Kingdom!
You have already received a Mysterious Bounty today! Each day you can get one chest from a friend in this way.


***/
		
		
		if (text.find("Looks like all the prizes have been claimed!"))statusCode=-2;//all out //Need to check
		else if (text.find("Do you want to help with")){
						var kocForm = document.getElementById('claimhelpform');
						if (kocForm) kocForm.submit();
						return;
		}
		else if ($("claimtokenaddtoserver")){
			var kocForm = $("claimtokenaddtoserver");
					if(kocForm){
						$("serverid").value = Options.serverId;
						kocForm.submit();
						sendMessage("status=1");
						return;
					}
		}
		else if (text.find("You have already received")) statusCode=-3; //already claimed token
		else if (text.find("You've already helped")) statusCode=1; //already helped
		else if (text.find("project has already been completed")) statusCode=-2;  //build completed
		else if (text.find("does not need help")) statusCode=-2;  //build completed
		else if (text.find("already received a token")) statusCode=-6;
		else if (text.find("has accepted your help")) statusCode=1;
		else if (text.find("You can get one Merlin's Magical Token every day by helping your friends!")) statusCode=-6;
		else if (text.find("has given you a token")) statusCode=1;
		else if (text=="") statusCode=-5; //no document body
		
		if (statusCode!=0) {sendMessage("status="+statusCode);return;}
		

	    } catch (e) {}
		window.setTimeout(function(e){run();},500);
	}
	
	function saveOptions(){
		GM_setValue("Options", JSON.stringify(Options));
	}
	
	function getOptions(){
		var s = GM_getValue("Options");
		if (s != null){
			var opts = JSON.parse(s);
			for (k in opts){
				Options[k] = opts[k];
			}
		}
	}
	
	getOptions();
	var href=window.location.href;
	if (href.startsWith('http://www.facebook.com/')) {
		dock();
		return;
	}
	if((href.contains("accept") && href.contains("token")) || href.contains("accepttoken") || href.contains("questshare") || href.contains("helpfriend") || href.contains("merlinshare"))
		window.setTimeout(function(e){run();},500);


})(); // anonymous function wrapper end


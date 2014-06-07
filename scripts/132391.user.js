// ==UserScript==
// @name          Find.Chat.Share
// @namespace     http://yibbleware.com/
// @description	  Find people with simliar interests. Chat with them. Share links with them.
// @version       0.2
// @include       *
// ==/UserScript==

/* == version 0.2 ==
 * Ability to view user details
 * Special interest match rules
 * Match based on gender + orientation
 * Make a filter icon for gender/orientation match
 * Fixed: friends are showing all match icons no matter what
 * Fixed: When a filter is not active the icon for that filter should never shown by the user name.
 * Make public tokens expire
 * Show show 'Drag links & images here' instead of '0 Links / Images'
 * Allow viewing of image before continuing to link
 * Slideshow
 * Allow downloading of collections
 * Non-greasemonkey version for web sites
 * Ability to move more than one link into a folder at a time
 * Generate new public token after 30 minutes
 * Some web version parameters are not getting passed to the script (Location, filter, etc...)
 * Show number of items within a folder
 * Prevent the injection of javascript into chat
 * 'Remove identical images' feature
 * 
 */

/*
 * ==TODO==
 * 
 * Video tutorial
 * Anon name does not show immediatley (Have to refresh to show)
 * As soon as user name is set it should show
 * Allow subfolders
 * Send messages to friends that are offline
 * Make sure sites cannot access fichasha via DOM
 * 
 */

/*BEGIN SCRIPT*/

window.addEventListener("load", function(e) {(function(){

/*WEB FUNCTIONS*/

var debug = false;

if (!window.lgtRunningFrom) window.lgtRunningFrom = "greasemonkey";
//Chrome and web version compatability
if (!this.LG_getValue) {
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		window.LG_getValue = function (key,def) {
			return localStorage['lgt_'+key] || def;
		};
		window.LG_setValue = function (key,value) {
			return localStorage['lgt_'+key] = value;
		};
		window.LG_deleteValue = function (key) {
			return delete localStorage['lgt_'+key];
		};
	} else {
		window.LG_getValue = function (key,def) {
			return this.GM_getValue(key,def);
		};
		window.LG_setValue = function (key,value) {
			return this.GM_setValue(key,value);
		};
		window.LG_deleteValue = function (key) {
			return delete this.GM_deleteValue(key);
		};
		window.LG_addStyle = function(style) {
			return GM_addStyle(style);
		};
		window.LG_registerMenuCommand = function(caption, commandFunc, accessKey) {
			return GM_registerMenuCommand(caption, commandFunc, accessKey);
		};
		window.LG_xmlhttpRequest = function(details) {
			return GM_xmlhttpRequest(details);
		};
	}
}

if (!window.LG_addStyle) {
	window.LG_addStyle = function(rules) {
		var head = document.getElementsByTagName('head')[0],
		style = document.createElement('style'),
		rules = document.createTextNode(rules);

		style.type = 'text/css';
		if(style.styleSheet)
			style.styleSheet.cssText = rules.nodeValue;
		else style.appendChild(rules);
		head.appendChild(style);
	};
}

if (!window.LG_registerMenuCommand) {
	window.LG_registerMenuCommand = function(caption, commandFunc, accessKey) {
		
	};
}

var geoLocation, container = null, iName = 'Find.Chat.Share', 
server = debug ? "192.168.0.100" : "yibbleware.com",
profile = {}, updateInterval = 5000, chatRef = {},
notifiers = [], maxUsers = 20, blocked = {}, sessionCnt = 0,
activeSession = true, oldBeforeUnload = null,
saveVars = 
	[['name',''],['anonName',''],['hide',false],['location','null',1],
	['birthdate',0],['sidePos',false],['filter',16],['scan',0],
	['matchAvg',0,1],['matchTot',0,1],['matchCnt',0],
	['openChat','[]',1],['chatPos','{}',1],['chatAlertTs','{}',1],
	['friends','{}',1],['threshold',0.1,1],['interests',''],['links',0],
	['gold',0]];

var remoteSession = window.location.href.indexOf("//"+server) == -1;

var msg = [' is asking for your current location. This is required to find nearby chatters.'];

var lgLog = function(o) {
	if (debug) {
		if (unsafeWindow) {
			unsafeWindow.console.log(o);
		} else {
			console.log(o);
		}
	} else {
		GM_log(o);
	}
};

var init = function() {
	profile.token = LG_getValue('token');
	if (profile.token) {
		profile.id = LG_getValue('uid');

		initProfileVars();

	} else {
		profile = {
			"id":0,
			"token":String(Math.floor((new Date()).getTime()/86400))+"."+uniqueToken(),
			"created":ts(),
			"born":1,
			"navigator":{
				"userAgent":navigator.userAgent
			},
			"href":window.location.href
		};
		initProfileVars();
	}
	
	
	profile.accessed = ts();
	profile.currentSite = toSite(window.location.href);
	
	generatePublicToken();
	setInterval("generatePublicToken()",29*60*1000)

	var v;
	if ((v = profile.openChat.indexOf(profile.id)) != -1) profile.openChat.splice(v,1);
	
	if (!profile.born) profile.token = null;

	request("profile",{"currentSite":profile.currentSite,"token":profile.token,"publicToken":profile.publicToken,"id":profile.id,"openChat":profile.openChat,"born":profile.born},function(o){
		
		render();
		
		setLinkCount(profile.links,true);
		
		if (!profile.location && navigator.geolocation && window.lgtRunningFrom != "web") {
			notify(iName+msg[0],null,{'y':120});
			geoLocation = navigator.geolocation.getCurrentPosition(geoSet,geoError);
		}
		if (o.decoded) {
			defaultValues(profile,o.decoded);
			if (o.decoded.inserted) {
				profile.id = o.decoded.inserted;
				LG_setValue('token',profile.token);
				LG_setValue('uid',profile.id);
			} else if (o.decoded.webId) {
				profile.id = o.decoded.id;
				LG_setValue('uid',profile.id);
				
			}
	
			if (o.decoded.openChat) {
				for (var i in o.decoded.openChat) {
					cleanUser(o.decoded.openChat[i]);
					initUser(o.decoded.openChat[i]);
				}
				delete o.decoded.openChat;
			}

			for (var i in saveVars) {
				if (o.decoded[saveVars[i][0]]) setValue(saveVars[i][0],o.decoded[saveVars[i][0]]);
			}
		}
		doUpdate();
	
	});

};

function initProfileVars() {
	for (var i in saveVars) {
		profile[saveVars[i][0]] = LG_getValue(saveVars[i][0],saveVars[i][1]);
		if (saveVars[i][2]) profile[saveVars[i][0]] = json_decode(profile[saveVars[i][0]]);
	}
};

var render = function() {
	LG_addStyle(
		'#fichasha{z-index:'+(remoteSession?'10000':'2')+';position:absolute;top:0px;border:1px solid #131;background-color:#000;font-family:arial;font-size:12px;color:#dfd;box-shadow:-6px 6px 10px rgba(0,0,0,0.2);}'+
		'.fichashaHide {width:48px;}'+
		".lgtIcons {cursor:pointer;float:left;width:32px;height:32px;margin:2px;border: 1px solid #393;border-radius:3px;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAgCAMAAADt/IAXAAAAAXNSR0IArs4c6QAAAGBQTFRFAAEAJgYATgICehEPAzYCKisqUSoBLS5VySMHBG8AkUoAsjwwVldcUViEPmig2FUt2GRFCqoAg4WhaIu4loyI/4IAj6vO/psypqm6D/oA+bJyus3k/9qz3er5/+3a/P77bgyjJAAAAAFiS0dEAIgFHUgAAAM1SURBVFjD3ZfbkqMgEIYlDppEMYlycETk/d9yukUiKNkymaqt2u2LIBX1/4A+mWX/kZHiKsCuBaGc049eUTr76NlCrGbB6AfqrJVoHXufgQTyYkAAHt9wyvOcrJenhHwntey6bmZ4FyFcvhBqB3Cq7miom7vLaoPAWK+l1CCvcTSmrz/WF2K0dhLF+n9+95YHl+Eb6lbPJo3RxpoeNiEmuDwe4einaX2lhkEpVez1n3a7hQS0bo21GtYNgzV4Ek3TsRDg8f0djn66P//lANDG5cxJFcjeVrsTv3zKND4wy6Np0AcrDwKE4ksIOBv8BtzSlvv11xq1lw2AHei1QQZWHgIIDmCyVqkVYCxeAZxnq9wWUM7Q9Qzq4w84IcSC0dEW/AEgDr9J2Wly67ejmG+okuoBQM8w+Lw+ugAgNNJKdgSARM4PW+ABFACQPcD5vAXIeoj+Tq/6zWJalgcANhlQRQDFFuAcWrW8ooVNl3qnDwTsAMA1ij8lIoDr7AMbXW/eCbMSVFEfNgFSQbcCBJF4+X6Eo59GLuDdLwAQDiCpf34mw1Iaqa1xqUg3HwPYFwBwBkn9ZyIqJaaBRT/agfI4AGQAOxehcQ9wqhL6QSJcAPo5F0vZdAmAr0VxGb82ACA9PgHGLQAUoP36fQg4AMhApneFEOuxP4EQ4BKOfuqdECWfADiDiFSDck6YIrjnJKjEkIkxEYGu04dSgMXgGEDhM4AHmABggktMy2s9qjbnT6JeQBsUhgjsZvnO9QVdWAwuX9Hopz4RDYNIAZCgI3itn5XQC+C2Yy/QuZ4EHEK2x5oSH4DKqh1A1JPcEv7nU9FcgD2CXJyypYf6gcIHoBLz0YsVoIi6Nn8M1U4f+hEH4Jav0ScBoKbHyjHkPud9aguwkXEECX0gYB4Af+bu4DhAD5sOhp4YA5AsQZDUx550TT8S2zLd85q+2xLGAMX+zlP1Qh9jkS3HoHWPdlw/y2D5oLoBKFJ3nvKXL6GMsabtjW4Za1te18fbYj47IDTCEcDbXyaUw7pbhp9GlNb0jeep5QSy8fBLgF9YbXlth+AILP+7AFnNaw4fp1iH1LXg1lBr/5FP6h8XBJfP8AHNLAAAAABJRU5ErkJggg==')}"+
		'.lgtIconOff {opacity:0.5;border: 1px solid transparent}'+
		'.lgtHide{width:24px;}'+
		'#lgtCont{width:180px;padding:8px;}'+
		'.lgtBox{float:right;width:48px;height:64px;border:1px dashed #040;padding:2px;text-align:center;text-decoration:none;color:#FFF;cursor:pointer}'+
		'.lgtL{font-size:75%;margin-top:10px;}'+
		'.lgtP{padding:4px;position:relative;}'+
		'.lgtCb{clear:both}'+
		'#fichasha button {border-radius:4px;border:1px solid #060;background-color:#030;color:#9c9;}'+
		'#lgtChat{}'+
		'.lgtUser{position:relative;cursor:pointer;font-size:10px;width:178px;height:26px;border-radius:4px;border:1px solid #060;background-color:#030;color:#9c9;}'+
		'.lgtNotify{position:absolute;top:0px;width:200px;border-radius:4px;border:1px solid #0C0;background-color:#9F9;color:#000;padding:6px;box-shadow:0px 6px 10px rgba(0,0,0,0.2);}'+
		'.lgtChatBubble{cursor:default;position:absolute;top:0px;border-radius:4px;border:1px solid #0C0;background-color:#9F9;color:#000;padding:6px;box-shadow:0px 6px 10px rgba(0,0,0,0.2);}'+
		'.lgtChatMsg{height:180px;}'+
		'.lgtChatMsg,.lgtChatInput{border:1px solid #090;width:380px;background-color:#FFF;color:#000;overflow:auto;padding:2px}'+
		'.lgtChatClose{cursor:pointer;text-align:center;width:15px;height:15px;position:absolute;top:2px;right:2px;border:1px solid #090;border-width:0px 0px 1px 1px;border-radius:4px;background-color:#9F9;}'+
		".lgtChatIcons{position:absolute;top:4px;cursor:pointer;width:16px;display:none;height:16px;margin:1px;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAQCAMAAADODVF7AAAAAXNSR0IArs4c6QAAAGBQTFRFADMBLjADGkcAYjARHkYdJEU3ySEGakc9szYmIXEAN2CZY2Mmo1clUm1pV26FTXGg1lcz1HgD23hSQbAAeJa7/4MAkp2BrJ1dyJda+aA+n7TP/rly+s6e2OLv+N3D9uvckSaQPgAAAAFiS0dEAIgFHUgAAAPfSURBVFjDtVcNk6MgDEWFLq2Cq2tR0eL//5eX8KFo0e7N3DGzO82S8PIeSegS8mHdc3In+f3UTq28zOnn+NjrX+CXJaUbfpYRgj/B/8z+uH7u5Ce//5zaARIwPXzZPJ/jUn6Ij71cIiGdoq2Komqr7DL+QCCv4LxpoQG/bduqgp/gX53Z6UWZlII5xSGARAkcbZs6ojfDoiz/J6zJzJRcxcdevG2/i6L16VTfsFr8lV3EHwlU7rze49t4XIXzL0/tJH8mdad1J+kKeD8ksCtBlDzAE4I3MS/L0qf9vR158e9toZj+4+3Gz+OPBJD1jOeVDr91J8AZzr86tZP89QtXV8tfCZB5/rOZoQQyn4oZLgXYvLKN/u1WePNmk2PBv+zXrkgTwKo39jyH37oT4MAg2Jmdqn/5cgJ0NWSQ26GRb812sF31jfNkQH9Twl2M44Ifx7S/syOvYmXv8uG3sL6kx6/aYe0KH78nkNsBYM9zJxt/Cg/4p3ZiiU67Aqg7edqDTPgZYcFRfhDAzCXJQX+zQDU0zmOLd1Pf26uXFWDlDHyK8JlDEzLrXzX92hW+gmICMAubZpgXAyc2AZ/7bY+X7e37aic7AAXQ9ePxkCdDEjSCGSFoPPRQf+BDBkjEgD2sHu9vg+iCF/xho+8SKlb+XS0swagrQrzcCOAsxDlqgPlUBfwBHHiEX6BtSjvhBUz4zU6OAEj+QgDhS4R5AcYR6XsBymma59GYzePtbYD4xXkpEl35jbtnrfD867p2CfC4QgI+D3qFCdLCFBryFV9zLuWG3zScD6anhAq4YC2rYCcFAPFB/kedFoBKWyKdeyagBQzOMyy8EZ4lqvp5npbI4/g22HhQywxWgFUBHp71Lw78bQnWNHbwBWDjtQSCqwB2EwRQHn9Y4A4lCLjiQ5MM5gX4wiUvgp1Y0vLvOt2xdAXgkMD83AU3IxJeJmPmZ5n0OL4Nx92C7/gT9tVKewOhBIu9QhCv1/gitFDVK0U/4wu7VcsmfqsOJQC119kjTr6qSuyRGs53PTDjbWLVwQhKepDD23DcJTiSNv74PUS6OxAkUoDv8QO91EC/wBd4/1DdQ/xWJRSoQQBBz2aAS8/dD+3HCbr7CbOnTHuQ6G1I7aICPNsNWXcFmm0OEcN9fGqgX+DDCMDq6qJ8Ul8FYYkz/tCEmB8I5Ew1zE4AdeaxvQ1lchdp7AEe4KFfassgK7Kz0zP+9qBd4DOJ2mod5ZPkePkfEsPzdUiPqrJU/aCUOvNY3waV3n0HEPYK2K/woQv4J48IHxXQaojz+ftFGWOU/oWHn83q9/H0v+EzXMH+A2zBiCHd8bpHAAAAAElFTkSuQmCC')}",
		'.lgtYou,.lgtThem{font-weight:bold;}'
	);
	
	container = add(document.body,[
		['fichasha','div','',{},[['','div','',{},[
			['lgtHide','button','',{'style':{'cssFloat':'right'},'onclick':function(){toggleHide();}}],
			['lgtSwap','button','',{'style':{'cssFloat':'right'},'innerHTML':'&larr;&rarr;','onclick':function(){setSidePos();}}],
			['lgtClose','button','',{'style':{'cssFloat':'right'},'innerHTML':'X','onclick':function(){close(true);}}],
			['','div','lgtCb'],
			['lgtCont','div','',{},[
				['','a','',{'href':'javascript:;',"onclick":function(){tokenNav('links.php')}},[['','div','lgtBox',{'innerHTML':'<i>Drag links &amp; pics here</i>'}]]],
				['','div','lgtL',{'innerHTML':'Anon Name'}],
				['','div','',{'innerHTML':profile.anonName}],
				['','div','lgtL',{'innerHTML':'User Name'}],
				['lgtName','a','',{'style':{'color':'#CCF'},'href':'javascript:;','innerHTML':'click to set',"onclick":changeSettings}],
				['','div','lgtL',{'innerHTML':'Filter'}],
				['lgtIcons','div','',{},[
					['','div',''],
					['','div',''],
					['','div',''],
					['','div','']
				]],
				['','div','lgtCb',{'style':{'height':'10px'}}],
				['lgtChat','div','',{}]
			]]
		]]]]
	]);

	var dropBox = sel(container,'0');

	dropBox.addEventListener('dragenter',function(e){e.preventDefault();});
	dropBox.addEventListener('dragover',function(e){e.preventDefault();});
	
	dropBox.addEventListener('drop',function(e){
		getDropInfo(e,function(info){
			queueRequest("add-link",info,function(o){
				if (o.message) {
					setLinkCount(o.links);
					notify(o.message);
				}
			},0.1);
		});
		e.preventDefault();
	});
	
	refreshIcons();

	toggleHide(profile.hide);
	
	LG_registerMenuCommand('Switch Sides',setSidePos);
	LG_registerMenuCommand('Show',close);
	
	setInterval(notifyUpdate,200);
	adjustHeight();
	updateScroll();
};

function getDropInfo(e,rv,thumbSize,pass) {
	if (e.dataTransfer) {
		var el = document.createElement('div');
		el.innerHTML = e.dataTransfer.getData("text/html");
		var info = getDropInfo(el);
		if (info.img) {
			info.context = window.location.href;
			
			var img = new Image();
			img.src = info.img;
			img.callback = rv;
			img.info = info;
			img.pass = pass;
			
			img.thumbSize = thumbSize ? thumbSize : 64;
			img.onload = function() {
				var w,h;
				if (this.width > this.height) {
					w = img.thumbSize;
					h = (this.height / this.width) * w;
				} else {
					h = img.thumbSize;
					w = (this.width / this.height) * h;
				}
				var tmp = document.createElement('canvas');
				tmp.setAttribute('width',w);
				tmp.setAttribute('height',h);
				tmp.getContext('2d').drawImage(this,0,0,w,h);
				
				var captured = true;
				try {
					this.info.thumbnail = tmp.toDataURL();
				} catch (e) {
					captured = false;
				}
				
				if (captured) {
					delete info.thumbnail;
					var tmp = document.createElement('canvas');
					tmp.setAttribute('width',this.width);
					tmp.setAttribute('height',this.height);
					tmp.getContext('2d').drawImage(this,0,0,this.width,this.height);
					queueRequest("store-image",{"info":info,"data":tmp.toDataURL("image/jpeg")},function(o){
						lgLog(o);
					},0.1);
				} else {
					//LG_xmlhttpRequest(o)
				}
				
				this.callback(this.info,this.pass);
			};

		} else {
			rv(info,pass);
		}
	}

	if (e.childNodes) {
		if (!rv) var rv = {};
		for (var i = 0; i < e.childNodes.length; i++) {
			var c = e.childNodes[i];
			switch (c.nodeName) {
				case "IMG":
					if (c.src) rv.img = c.src;
				
				case "A":
					if (c.alt) rv.text = c.alt;
					if (c.title) rv.text = c.title;
					if (c.href) {
						rv.href = c.href;
						if ((",png,jpg,jpeg,gif,").indexOf(","+rv.href.split(".").pop().replace("#","?").split("?").shift().toLowerCase()+",") != -1) {
							rv.img = c.href;
						}
						if (c.innerHTML.strip_tags().trim()) rv.text = c.innerHTML.strip_tags().trim();
					}
					
					break;
			}
			rv = getDropInfo(c,rv);
		}
	}
	return rv;
};

function doUpdate() {
	sessionState();
	
	if (isActiveSession()) {
		sendChat({});

		queueRequest("scan",{'scan':profile.scan},function(o){
			for (var i = 0; i < o.data.length; i++) {
				cleanUser(o.data[i]);
				var m = match(o.data[i]);
		
				if (m < profile.threshold) {
					o.data[i].similarity = m;
					if (chatRefCount() < maxUsers) initUser(o.data[i]);
				}
				
				if (chatRef[o.data[i].id]) {
					chatRef[o.data[i].id].set('similarity',m);
					
					var v = (match(o.data[i],0) < 0.25 ? 1 : 0) |
						(match(o.data[i],1) < 0.25 ? 2 : 0) |
						(match(o.data[i],2) < 0.25 ? 4 : 0) |
						(match(o.data[i],3) < 0.25 ? 8 : 0);
					if (v) {
						chatRef[o.data[i].id].showIcon(1,v);
					} else {
						chatRef[o.data[i].id].hideIcon(1);
					}
				}
				
				profile.matchTot += m;
				profile.matchCnt ++;
			}
			if (o.scan == 0) {
				profile.matchAvg = profile.matchTot / profile.matchCnt;
				profile.matchCnt = profile.matchTot = 0;
				if (chatRefCount() == maxUsers && profile.threshold > 0) {
					profile.threshold -= 0.1;
				} 

				if (chatRefCount() < maxUsers && profile.threshold < 1) {
					profile.threshold += 0.1;
				}
				setValue('threshold');
			}
			setValue('matchAvg');
			setValue('matchTot');
			setValue('matchCnt');
			
			fixUserOrder();
			
		},1);
		
		if (updateInterval < 15000) updateInterval += 1000;
	}
	setTimeout(doUpdate,updateInterval);
};

function registerActivity() {
	updateInterval = 3000;
};

function chatRefCount() {
	var cnt = 0;
	for (var i in chatRef) {
		cnt++;
	}
	return cnt;
}

function sendChat(o) {
	o.offset = {};
	o.openChat = profile.openChat;
	
	if (o.send) registerActivity();
	
	for (var i in chatRef) {
		o.offset[i] = profile.chatPos[i] && profile.chatPos[i] > chatRef[i].pos ? profile.chatPos[i] : chatRef[i].pos;
	}
	for (var i in profile.chatPos) {
		if (!chatRef[i] || profile.chatPos[i] > chatRef[i].pos) o.offset[i] = profile.chatPos[i];
	}
	
	o.interests = profile.interests;
	
	queueRequest("chat",o,function(o){	
		if (o.interests) {
			if (!profile.interests) {
				setBit('filter',1,1);
				profileSet('filter');
			}
			profileSet('interests',o.interests);
		}
		
		for (var i = 0; i < o.chat.length; i++) {
			if (chatRef[Number(o.chat[i].file)]) chatRef[Number(o.chat[i].file)].connect();
			if (o.chat[i].data.length) {
				if (chatRef[Number(o.chat[i].file)]) {
					chatRef[Number(o.chat[i].file)].appendMessages(o.chat[i].data,o.chat[i].length);
				} else {
					initUserById(Number(o.chat[i].file));
				}
			}
		}

		if (o.leftChat) {
			var id;
			while (id = o.leftChat.pop()) {
				chatRef[Number(id)].leftChat();
			}
		}
	},o.send?0.01:1);	
};

//Find users
function match(o,one) {
	if (Number(profile.id) == o.id) return 2;
	if (profile.friends[o.id] && !one) return -1;
	var dist = 0, cnt = 0;
	var myInterests = base64ArrayBufferDecode(profile.interests);
	var theirInterests = base64ArrayBufferDecode(o.interests);
	for (var i = (one==undefined?0:one); i < (one==undefined?5:one+1); i++) {
		if (isBitSet('filter',i)) {
			var v = 1;
			switch (i) {
				case 0: // Location
					var loc = o.location.split(",");
					var lat = Number(loc[0]), lon = Number(loc[1]);
					if (!isNaN(lat)) {
						v = Math.min(1,geoDist([profile.location.latitude,profile.location.longitude],[lat,lon]) / 50);
					}
					break;
				case 1: // Interests
					if (o.interests && profile.interests) {
						v = 1 - (bitMatch(theirInterests,myInterests) / bitCount(myInterests));
					}
					break;
				case 2: // Age
					if (o.birthdate && profile.birthdate) {
						v = Math.min(1,Math.abs(o.birthdate - profile.birthdate) / (86400*365.25*10));
					}
					break;
					
				case 3: // Orientation
					v = orientationMatch(myInterests,theirInterests) ? 0 : 1;
					break;
					
				case 4: // Current Site
					v = o.currentSite == profile.currentSite ? 0 : 1;
					break;
			}
			cnt ++;
			dist += v;
		}
	}
	return cnt ? dist / cnt : 1;
};

function bitMatch(b1,b2) {
	b1 = new Uint8Array(b1);
	b2 = new Uint8Array(b2);
	var total = Math.max(b1.length,b2.length) << 3, matches = 0,t = "";

	
	for (var i = 0; i < total; i++) {
		if (i >= 30 || i <= 33) {
			//Gender
		} else if (isArrayBufferBitSet(b1,i) && isArrayBufferBitSet(b2,i)) matches ++;
	}
	return matches;
};

function orientationMatch(b1,b2) {
	b1 = new Uint8Array(b1);
	b2 = new Uint8Array(b2);
	var interests = [b1,b2];
	
	// Female, Male, Pre-op F2M, Pre-op M2F
	var gender = [-1,-1];
	for (var i = 0; i < 2; i++) {
		for (var j = 30; j <= 33; j++) {
			if (isArrayBufferBitSet(interests[i],j)) {
				gender[i] = j - 30;
				break;
			}
		}
		if (gender[i] == -1) return 0;
	}
	
	// Asexual, Bi-Curious, Bisexual, Gay, Straight
	var orientation = [-1,-1];
	for (var i = 0; i < 2; i++) {
		for (var j = 34; j <= 38; j++) {
			if (isArrayBufferBitSet(interests[i],j)) {
				orientation[i] = j - 34;
				break;
			}
		}
		if (orientation[i] == -1) return 0;
	}
	
	for (var i = 0; i < 2; i++) {
		var other = i ^ 1;
		switch (orientation[i]) {
			case 0: // Asexual
				if (orientation[other] != 0) return 0; //Other person must be Asexual
				return 0;
			
			case 1: // Bi-Curious
			case 2: // Bi-Sexual
				break;
				
			case 3: // Gay
				if (orientation[other] != 3) return 0; //Other person must be gay
				if ((gender[i]&1) == (gender[other]&1)) break;
				return 0;
				
			case 4: // Straight
				if (orientation[other] != 4 && orientation[other] != 1 && orientation[other] != 2) return 0; //Other person must be straight or bi
				if (gender[i] == 0 && gender[other] == 1) break;
				if (gender[i] == 1 && gender[other] == 0) break;
				return 0;
			
		}
	}
	return 1;
};

function bitCount(b) {
	b = new Uint8Array(b);
	var n = 0;
	for (var i = 0; i < b.length << 3; i++) {
		if (isArrayBufferBitSet(b,i)) n ++;
	}
	return n;
};

function isArrayBufferBitSet(buffer,i) {
	var byteN = i >> 3;
	if (byteN >= buffer.length) return false;
	var bitN = i & 7;
	return !!(buffer[byteN] & Math.pow(2,bitN));
};

//User
function initUserById(id) {
	if (!chatRef[id]) {
		queueRequest("get-user",{'id':id},function(o){
			initUser(o);
		},0.5);
	}
};

function initUser(o) {
	if (o.blocked) {
		blocked[o.id] = 1;
	} else if (!chatRef[o.id] && o.id != profile.id && !blocked[o.id]) {			
		if (profile.openChat.indexOf(o.id) == -1) {
			profile.openChat.push(o.id);
			setValue('openChat');
		}

		o.container = dg('lgtChat');
		o.pos = 0;
		
		chatRef[o.id] = new lgtUser(o);
	}
};

function updateUserStatus(id) {
	queueRequest("get-user",{'id':id},function(o){
		cleanUser(o);
		chatRef[o.id].update(o);
	},0.5);
};

function getFriendStatus(id) {
	return profile.friends[id] ? profile.friends[id] : 0;
};

function setFriendStatus(id,status) {
	profile.friends[id] = status;
	profileSet('friends');
};

function cleanUser(o) {
	o.id = Number(o.id);
};

function disconnectUser(id) {
	profile.openChat.splice(profile.openChat.indexOf(id),1);
	setValue('openChat');
};

function fixUserOrder() {
	while (1) {
		var c = dg('lgtChat').childNodes;

		for (var i = 0; i < c.length - 1; i++) {
			if (c[i].user.similarity > c[i + 1].user.similarity) {
				c[i+1].parentNode.insertBefore(c[i+1], c[i]);
				continue;
			}
		}
		break;
		
	}
};

function swapNodes(node1, node2) {
	elementAfterFirstNode = nextElement(node1);
	elementAfterSecondNode = nextElement(node2);
	node1.parentNode.insertBefore(node1, elementAfterSecondNode);
	node2.parentNode.insertBefore(node2, elementAfterFirstNode);
}

function setSidePos(s,v) {
	if (v == undefined) v = profile.hide;
	if (s !== true) {
		profile.sidePos = !profile.sidePos;
		LG_setValue('sidePos',profile.sidePos);
	}
	dg('fichasha').style.left = profile.sidePos ? "" : "0px";
	dg('fichasha').style.right = profile.sidePos ? "0px" : "";
	dg('lgtHide').innerHTML = !(v ^ profile.sidePos) ? '&laquo;' : '&raquo;';
};

function hideOpenChat() {
	for (var i in chatRef) {
		chatRef[i].hideChat();
	}
};

var refreshIcons = function() {
	var d = dg('lgtIcons').childNodes;
	for (var i = 0; i < d.length; i++) {
		d[i].style.backgroundPosition = '-'+(i*32)+'px 0px'
		d[i].className = 'lgtIcons'+(isBitSet('filter',i)? '' : ' lgtIconOff');
		if (!d[i].onclick) {
			d[i].onclick = function() {
				var v = !isBitSet('filter',this.i);
				if (v) {
					if (this.i == 2 && !profile.birthdate) {
						var age = Number(prompt("Your Age:","").replace(/[^\d]+/,''));
						if (isNaN(age)) return;
						if (age > 150 || age < 5) return;
						
						var birthdate = ts() - age * 86400 * 365.25;
						profileSet('birthdate',birthdate);
					}
					if (this.i == 1 && !profile.interests) {
						if (confirm('Do you want to set up your interests?')) {
							changeSettings();
						}
						return;
					}
				}
				setBit('filter',this.i,v);
				refreshIcons();
			}
			d[i].i = i;
		}
	}
};

function changeSettings() {
	window.location.href = 'http://'+server+'/fichasha/setup.php?uid='+profile.id+'&token='+profile.publicToken+'&return='+urlencode(window.location.href);
};

var isBitSet = function(n,bit) {
	return !!(Math.pow(2,bit) & profile[n]);
};

var setBit = function(n,bit,v) {
	profileSet(n,(profile[n] & (Math.pow(2,bit) ^ 0x7FFFFFFF)) | (v ? Math.pow(2,bit) : 0));
};

function setLinkCount(v,noUpdate) {
	if (v) {
		sel(container,'0.0.4.0.0').innerHTML = v+"<br />Links / Images";
	}
	if (!noUpdate) setValue('links',v);
};

var profileSet = function(n,v) {
	if (v != undefined) {
		profile[n] = v;
	} else {
		v = profile[n];
	}
	var s = {};
	s[n] = v;
	queueRequest("profile",s,function(o){
		if (o && o.wasSet) {
			for (var i in o.wasSet) {
				setValue(i,o.wasSet[i]);
			}
		}
	},1);
};

function setValue(n,v) {
	if (v == undefined) v = profile[n];
	
	if (n == "name") {
		sel(container,'0.0.4.4').innerHTML = v ? v : "click to set";
	}
	
	switch (typeof(v)) {
		case "undefined":
			return;

		case "number":
			if (n % 1 !== 0) break;

		case "string": case "boolean":
			LG_setValue(n,v);
			return;
	}
	for (var i in saveVars) {
		if (saveVars[i][0] == n && saveVars[i][1] == "{}") {
			var nv = {};
			for (var j in v) {
				if (v[j] != null) {
					nv[j] = v[j];
				}
			}
			profile[n] = v = nv;
			break;	
		}
	}
	
	LG_setValue(n,json_encode(v));
};

var toggleHide = function(v) {
	if (v == undefined) {
		profile.hide = !profile.hide;
		LG_setValue('hide',v = profile.hide);
	}

	dg('fichasha').className = v ? 'fichashaHide' : '';
	
	dg('lgtCont').style.display = v ? 'none' : 'block';
	dg('lgtClose').style.display = v ? 'block' : 'none';
	setSidePos(true,v);
	adjustHeight();
};

function adjustHeight() {
	dg('fichasha').style.height = profile.hide ? '64px' : (getDocSize().height-2)+'px';
};

function getDocSize() {
	if (window.innerHeight)
		return {"width":window.innerWidth,"height":window.innerHeight};
	else if (document.documentElement && document.documentElement.clientHeight)
		return {"width":document.documentElement.clientWidth,"height":document.documentElement.clientHeight};
	else if (document.body)
		return {"width":window.innerWidth,"height":window.innerHeight};
};

function close(v) {
	if (v !== true) toggleHide(false);
	dg('fichasha').style.display = v === true ? 'none' : 'block';
};

// HTTP Request
var httpQueueTimer = null, httpQueue = [];
var queueRequest = function(action,data,callback,wait) {
	if (!wait) wait = 10;
	var h = 0, c = false;
	do {
		c = false;
		for (var i = 0; i < httpQueue.length; i++) {
			if (httpQueue[i] && httpQueue[i].hook == h) {
				c = true; h++; break;
			}
		}
	} while (c);
	httpQueue.push({'hook':h,'action':action,'data':data,'callback':callback,'sent':0});
	if (httpQueueTimer) clearTimeout(httpQueueTimer);
	httpQueueTimer = setTimeout(doQueuedRequest,wait * 1000);
};

var doQueuedRequest = function() {
	var hq = [];
	for (var i = 0; i < httpQueue.length; i++) {
		if (httpQueue[i] && !httpQueue[i].sent) {
			hq.push(httpQueue[i]);
			httpQueue[i].sent = 1;
		}
	}
	request('multi',hq,queuedRequestCallback);
};

queuedRequestCallback = function(o) {
	var o = o.decoded;
	for (var i = 0; i < o.length; i++) {
		for (j = 0; j < httpQueue.length; j++) {
			if (httpQueue[j] && httpQueue[j].hook == o[i].hook) {
				if (httpQueue[j].callback) {
					httpQueue[j].callback(o[i].o);
				}
				httpQueue[j] = null;
			}
		}
	}
	for (var i = 0; i < httpQueue.length; i++) {
		if (httpQueue[i] == null) {
			httpQueue.splice(i,1); i--;
		}
	}
};

var request = function(action,data,callback,o) {
	if (!o) o = {};
	defaultValues(o,{
		"method":"POST",
		"url":"http://"+server+"/fichasha/",
		"headers":{},
		"onload":function(d) {
			//if (debug) lgLog(d.responseText);
			if (this.callback) {
				if (this.responseType == "arraybuffer") {
					this.callback(d,this.passVars);
				} else {
					d.decoded = json_decode(d.responseText);
					this.callback(d,this.passVars);
				}
			}
		},
		"callback":callback,
		"passVars":o.passVars,
		"data":"v="+urlencode(profile.id+"\n"+(window.lgtRunningFrom!="greasemonkey"?"!"+window.lgtRunningFrom:profile.publicToken)+"\n"+action+"\n"+json_encode(data))
	});
	defaultValues(o.headers,{
		"Accept":"text/monkey,text/xml",
		"Content-type":"application/x-www-form-urlencoded"
	});
	LG_xmlhttpRequest(o);
};


function generatePublicToken() {
	profile.publicToken = createPublicToken(profile.token);
}

var createPublicToken = function(privateToken) {
	var publicToken = String(Math.round((new Date()).getTime() / 60000))+"-"+uniqueToken();
	return publicToken+"."+MD5(publicToken+"."+privateToken);
};

var uniqueToken = function() {
	return MD5('DIGGY-MEOW-'+String((new Date()).getTime())+"-"+Math.random());
};

function sessionFocus(n) {
	activeSession = n;
	if (n) LG_setValue('lastActiveSession',profile.publicToken);
};

function sessionState(n) {
	sessionCnt = LG_getValue('sessionCnt',0);
	if (n != undefined) sessionCnt += n ? 1 : -1
	LG_setValue('sessionCnt',sessionCnt);
};

function isActiveSession() {
	return activeSession || sessionCnt == 1 || LG_getValue('lastActiveSession') == profile.publicToken;
};

// Document / Layout
var add = function(p,o) {
	var rv = [];
	for (var i = 0; i < o.length; i++) {
		var s = o[i][3] ? o[i][3] : {};
		if (o[i][2]) { s.className = o[i][2]; }
		var d = {'el':dg(o[i][0],p,o[i][1],s)};
		
		if (s.options) {
			for (var j in s.options) {
				d.el.add(new Option(s.options[j], j));
			}
		}
		
		if (o[i][4]) d.c = add(d.el,o[i][4]);
		rv.push(d);
	}
	return rv;
};

function sel(el,ref) {
	ref = ref.split(".");
	var n = Number(ref.shift());

	if (el[n] && el[n].c && ref.length) {
		return sel(el[n].c,ref.join("."));
	} else if (el[n] && el[n].el && ref.length == 0) {
		return el[n].el;
	}

	return false;
};

function dc(t) {
	return document.createElement(t);
};

function recursiveSet(d,a) {
	for (var i in a) {
		if (typeof(a[i]) == "object") {
			recursiveSet(d[i],a[i]);
		} else {
			try {
				d[i] = a[i];
			} catch (e) {
				//console.log(i);
			}
		}
	}
};

function dg(id,p,t,a,pre) {
	if (id !== "" && document.getElementById(id)) {
		return document.getElementById(id);
	} else {
		var d = document.createElement(t);
		if (id !== "") { d.id = id; }
		if (p) {
			if (pre && pre.before) {
				p.insertBefore(d, pre.before);
			} else if (pre && pre.after) {
				if (!pre.after.nextSibling) return false;
				p.insertBefore(d, pre.after.nextSibling);
			} else if (pre) {
				p.insertBefore(d, p.firstChild);
			} else {
				p.appendChild(d);
			}
		}
		recursiveSet(d,a);
		return d;
	}
	return false;
};

function removeChildNodes(d) {
	while (d.childNodes.length) {
		d.removeChild(d.childNodes[0]);
	}
};

var notify = function(txt,el,extra) {
	if (!extra) extra = {};
	defaultValues(extra,{'y':0});
	
	if (profile.hide) el = dg('fichasha');
	if (!el) el = sel(container,'0.0.0');

	if (!el.notifyEl) {
		el.notifyEl = dg('',el,'div',{'className':'lgtNotify'});
	}
	
	el.notifyEl.style.display = 'block';
	el.notifyEl.innerHTML = txt;
	
	el.notifyEl.style.top = extra.y+'px';
	el.notifyEl.style.left = profile.sidePos ? '-'+(el.notifyEl.offsetWidth+6)+'px' : '';
	el.notifyEl.style.right = profile.sidePos ? '' : '-'+(el.notifyEl.offsetWidth+6)+'px';
	
	el.notifyEl.step = function() {
		this.cnt --;
		this.style.opacity = Math.min(1,this.cnt / 5);
		if (this.cnt == 0) {
			this.style.display = 'none';
			this.style.opacity = 1;
		}
	};
	
	el.notifyEl.cnt = 10 + Math.round(txt.length / 3);

	if (notifiers.indexOf(el.notifyEl) == -1) {
		notifiers.push(el.notifyEl);
	}
};

function notifyUpdate() {
	for (var i = 0; i < notifiers.length; i++) {
		if (notifiers[i].cnt) notifiers[i].step();
	}
};

//Geolocation
var geoSet = function(pos) {
	profile.location = pos.coords;
	queueRequest("location",{"location":profile.location},function(o){
		if (o && o.success) {
			LG_setValue('location',json_encode(profile.location));
			setBit('filter',0,1);
			refreshIcons();
		}
	},1);
};

var geoError = function(pos) {

};

function geoDist(c1,c2) {
	var gp1 = geoPos(c1[0],c1[1]);
	var gp2 = geoPos(c2[0],c2[1]);
	var dx = gp1.x - gp2.x;
	var dy = gp1.y - gp2.y;
	var dz = gp1.z - gp2.z;
	return Math.sqrt(dx*dx+dy*dy+dz*dz);
};

function geoPos(lat,lon) {
	var rv = {};
	rv.z = Math.sin(lat / 57.295779506) * 6371;
	var dist = Math.cos(lat / 57.295779506) * 6371;
	rv.x = Math.cos(lon / 57.295779506) * dist;
	rv.y = Math.sin(lon / 57.295779506) * dist;
	return rv;
};

function lgtUser(o) {
	initLgClass(this);

	this.setSimilarity = function(s) {
		this.similarity = s;
	};
	
	this.setContainer = function(container) {
		if (container && !this.el) {
			this.el = add(container,[
				['','div','lgtUser',{},[
					['','div','lgtP',{},[
						['','div','',{}],
						['','div','lgtChatIcons',{}],
						['','div','lgtChatIcons',{}]
					]],
					['','div','lgtChatBubble',{'style':{'display':'none'}},[
						['','select','',{'options':['Anonymous','Anonymous Friend','Friend','Block','Flag As Spam']}],
						['','a','',{'style':{'marginLeft':"10px"},"href":"javascript:;","onclick":function(){tokenNav('profile.php?i='+this.id)}}],
						['','div','lgtChatMsg',{}],
						['','br',''],
						['','input','lgtChatInput',{'type':'text'}],
						['','div','lgtChatClose',{'innerHTML':'X','onclick':function(e){e.cancelBubble = true;return this.parentNode.user.hideChat();}}]
					]]
				]]
			]);
			
			var chatStatus = sel(this.el,'0.1.0');
			chatStatus.addEventListener('change',function(){
				if (this.selectedIndex != 4) {
					var t = [[
						'',
						'removed you from their friends list',
						'hidden their user name from you',
						'unblocked you'
					],[
						'',
						'added you to their friends list',
						'revealed their user name to you',
						'blocked you'
					]];
					this.user.sendMessage('{{notice:status,'+this.user.id+'}}'+this.user.getDispName()+' '+(this.selectedIndex > this.user.friendStatus ? t[1][this.selectedIndex] : t[0][this.user.friendStatus]));
				}
				this.user.setFriendStatus(this.selectedIndex);
			});
			
			this.setFriendStatus(getFriendStatus(this.id),true);
			
			this.container = container;
			
			var mainEl = sel(this.el,'0');
			
			chatStatus.user = mainEl.user = this;
			
			this.refresh();
			
			mainEl.addEventListener("click",function(){
				this.user.openChat();
			});
			
			mainEl.addEventListener('dragenter',function(e){e.preventDefault();});
			mainEl.addEventListener('dragover',function(e){e.preventDefault();});
			
			mainEl.addEventListener('drop',function(e){
				getDropInfo(e,function(info,user){		
					var txt;
					if (info.thumbnail) {
						txt = "<img src=\""+info.thumbnail+"\""+(info.text?" title=\""+info.text+"\"":"")+"> "+info.context.split("//",2).pop().split("/").shift();
					} else if (info.text) {
						txt = info.text;
					} else {
						txt = info.context.split("//",2).pop();
					}
					
					user.sendMessage("<a href=\""+(info.href?info.href:info.context)+"\">"+txt+"</a>");
				},32,this.user);
				e.preventDefault();
			});
			
			if (!remoteSession) {
				(function(self) {
					self.mouseEvent = this.mouseEvent = function(e) {
						switch (e.type) {
							case "mouseover":
								if (self.draggedLink) {
									self.sendMessage('<a href=\"http://'+server+'/fichasha/links.php?show='+self.draggedLink+'\">'+self.draggedLinkName+'</a>');
								}
								self.mouseIsOver = true;
								break;
							
							case "mouseout":
								self.draggedLink = self.mouseIsOver = false;
								break;
								
							case "mouseup":
								if (unsafeWindow.lgtDragging) {
									self.draggedLink = unsafeWindow.lgtDragging.linkViewer.createLink();
									self.draggedLinkName = unsafeWindow.lgtDragging.linkViewer.getLinkName();
									setTimeout(self.mouseEvent,100);
								}
								break;
								
							default:
								self.draggedLink = false;
								break;
						}						
					};
					mainEl.addEventListener('mouseover',this.mouseEvent);
					mainEl.addEventListener('mouseout',this.mouseEvent);
					window.addEventListener('mouseup',this.mouseEvent);
				})(this);
			}
			
			this.disconnected = false;
			this.hidden = true;
						
			this.chatEl = sel(this.el,'0.1');
			this.chatEl.user = this;
			
			this.chatBox = sel(this.el,'0.1.2');
			
			this.chatInput = sel(this.el,'0.1.4');
			this.chatInput.addEventListener("keypress",function(e){
				if (e.keyCode == 13) {
					this.parentNode.user.sendMessage(this.value);
					this.value = '';
					this.focus();
				}
			});
		}
	};

	this.refresh = function() {
		sel(this.el,'0.1.1').innerHTML = sel(this.el,'0.0.0').innerHTML = this.getDispName();
	};
	
	this.getDispName = function() {
		return this.name ? this.name : this.anonName;
	};

	this.sendMessage = function(txt) {
		sendChat({"send":txt,"from":profile.id,"to":this.id});
	};
	
	this.appendMessages = function(o,pos) {
		for (var i in o) {
			if (o[i].send.substr(0,9) == "{{notice:") {
				var t = o[i].send.substr(9).split("}}",2);
				var notice = t[0].split(",");
				switch (notice[0]) {
					case "status":
						updateUserStatus(this.id);
						break;
				}
				var msg = notice[1] == profile.id ? "<i>"+t[1]+"</i>" : false;
			} else {
				var msg = (o[i].from == profile.id ? '<span class="lgtYou">You:</span> ' : '<span class="lgtThem">'+this.getDispName()+':</span> ')+o[i].send;
			}
			
			if (!profile.chatAlertTs[o[i].from]) profile.chatAlertTs[o[i].from] = 0;
			if (!this.chatOpen && o[i].from != profile.id && o[i].ts > profile.chatAlertTs[o[i].from]) {
				profile.chatAlertTs[o[i].from] = o[i].ts;
				setValue('chatAlertTs');
				if (msg) {
					this.showIcon(0,0);
					notify(msg,sel(this.el,'0'));
				}
			}
			if (msg) {
				this.chatBox.innerHTML += msg + "<br />";
				this.scrollDown();
			}
		}
		this.pos = pos;
	};
	
	this.openChat = function() {
		this.hideIcon(0);
		
		hideOpenChat();
				
		this.chatEl.style.display = 'block';
		this.hidden = false;
		
		this.chatEl.style.left = profile.sidePos ? '-'+(this.chatEl.offsetWidth+6)+'px' : '';
		this.chatEl.style.right = profile.sidePos ? '' : '-'+(this.chatEl.offsetWidth+6)+'px';
		
		this.scrollDown();
			
	};
	
	this.scrollDown = function() {
		this.chatBox.scrollTop = this.chatBox.scrollHeight;
	};
	
	this.hideChat = function() {
		if (this.chatEl) {
			this.chatEl.style.display = "none";
		}
		this.hidden = true;
		if (this.disconnectWhenReady) this.disconnect();
		return false;
	};
	
	this.leftChat = function() {
		if (this.hidden) {
			this.disconnect();
		} else {
			this.disconnectWhenReady = true;
		}
	};
	
	this.setFriendStatus = function(status,userOnly) {
		this.friendStatus = status;
		sel(this.el,'0.1.0').selectedIndex = status;
		if (!userOnly) setFriendStatus(this.id,status)
	};
	
	this.disconnect = function() {
		profile.chatPos[this.id] = this.pos;
		disconnectUser(this.id);
		sel(this.el,'0').style.display = "none";
		this.disconnected = true;
		setValue('chatPos');
	};
	
	this.connect = function() {
		sel(this.el,'0').style.display = "block";
		this.disconnected = false;
	};
	
	this.update = function(o) {
		if (o.blocked) {
			this.disconnect();
		} else {
			if (this.disconnected) this.connect();
			this.setOptions(o);
		}
		this.refresh();
	};
	
	this.showIcon = function(n,v) {
		var d = sel(this.el,'0.0.'+(n+1));
		d.style.display = 'block';
		d.style.backgroundPosition = '-'+(v*16)+'px 0px';
		d.style.right = (4+n*18)+'px';
	};
	
	this.hideIcon = function(n) {
		sel(this.el,'0.0.'+(n+1)).style.display = '';
	};
	
	this.setOptions({"messages":[],"chatOpen":false});
	if (profile.chatPos[this.id]) thispos = profile.chatPos[this.id];
	this.setOptions(o);
};

//Generic functions
function tokenNav(page) {
	window.location.href = 'http://'+server+'/fichasha/'+page+(page.indexOf('?')==-1?'?':'&')+'uid='+profile.id+'&token='+(window.lgtRunningFrom == "web"?"!web":profile.publicToken);
};

function initLgClass(o) {
	o.setOptions = function(o) {
		for (i in o) {
			var n = "set" + i.charAt(0).toUpperCase() + i.substr(1);
			if (this[n] && n != "setOptions") { // Has a setter
				this[n](o[i]);
			} else {
				this[i] = o[i];
			}
		}
	};

	o.set = function(o,v) {
		if (typeof(o) == "string") {
			var s = {};
			s[o] = v;
			this.setOptions(s);
		} else if (typeof(o) == "object") {
			this.setOptions(o);
		}
	};

	o.addEventListener = function(type,callback,answerer) {
		var id = "n"+this.eventListenerCnt;
		this.eventListener[id] = {
			"type":type,
			"f":callback,
			"lgClass":this,
			"answerer":answerer
		};
		this.eventListenerCnt++;
		return id;
	};

	o.removeEventListener = function(id) {
		var type = this.eventListener[id].type;
		delete this.eventListener[id];
	};

	o.dispatchEvent = function(type,data) {
		var e = this.eventListener;
		for (var i in e) {
			var r = new RegExp((e[i].pureRegEx ? e[i].type : "^"+e[i].type.split("*").join(".*").split("?").join(".")+"$"),"gi");
			if (type.search(r) != -1) {
				var rv;
				if (e[i].answerer) {
					if ((rv = e[i].f.call(e[i].answerer,type,data,this)) !== undefined) return rv;
				} else {
					if ((rv = e[i].f(type,data)) !== undefined) return rv;
				}
			}
		}
	};

	o.setEventListeners = function(o) {
		while (l = o.pop()) {
			this.addEventListener(l.type,l.callback,l.answerer);
		}
	};

	o.eventListener = {};
	o.eventListenerCnt = 0;
};


var ts = function() {
	return Math.floor((new Date()).getTime()/1000);
};

var MD5 = function (string) {

	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}

	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}

 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}

var defaultValues = function(o,def) {
	if (typeOf(o) != 'object') o = {};
	for (var i in def) {
		if (o[i] == undefined) {
			o[i] = def[i];
		}
	}
	return o;
};

var urlencode = function(t) {
	return escape(t).split("+").join('%2B').split("%20").join('+').split("*").join('%2A').split("/").join('%2F').split("@").join('%40');
};

var json_encode = function(v,o) {
	if (!o) var o = {};
	this.maxRecur = o.maxRecur ? o.maxRecur : 10;
	this.readable = !!o.readable;
	this.l = 0;


	this.to = function(v) {
		var s = typeof(v);
		if (s === 'object') {
			if (v) {
				if (v.buffer && v.buffer instanceof ArrayBuffer) {
					var t = ['Int8','Uint8','Int16','Uint16','Int32','Uint32','Float32','Float64'];
					var r;
					for (var i in t) {
						eval('r = v instanceof '+t[i]+'Array;');
						if (r) return t[i]+'Array';
					}
				}
				if (v instanceof Array) return 'array';
				if (v.tagName) return 'element';
				return 'object'
			}
			return 'null';
		}
		return s;
	};

	this.pass = function(n,v,h) {
		return o.pass ? o.pass(n,v,h) : true;
	};

	this.eol = function(o,s) {
		if (!this.readable) return "";
		return (o.ne!==true || s != undefined ?"\n"+Array(Math.max(0,o.l+(s != undefined ? s : 0))).join("  "):"");
	};

	this.json = function(v,l,hin,ne) {
		var ne = {ne:ne,l:(l?l:0)};
		if (l > this.maxRecur) return s+"null"+this.eol(ne);

		var h = [];
		if (typeof(v) == "object") {
			for (var i in hin) { //Prevent circular references
				if (v == hin[i]) return s+"null"+this.eol(ne);
				h.push(hin[i]);
			}
		}
		h.push(v);

		try {
			switch (this.to(v)) {
				case "Int8Array": case "Uint8Array": case "Int16Array":
				case "Uint16Array": case "Int32Array":
				case "Uint32Array": case "Float32Array":
				case "Float64Array":
					return "\"data:ArrayBuffer/"+this.to(v)+";base64,"+base64ArrayBufferEncode(v)+"\"";

				case "number":
					return (isFinite(v) ? v : "null")+this.eol(ne);

				case "string":
					return v.safeString()+this.eol(ne);

				case "array":
					if (v.length == 0) return "[]"+this.eol(ne);
					return "["+this.eol(ne,2)+(function(v,d){var rv=[];for (var i = 0; i < v.length; i++){if (this.pass(i,v[i],h)){rv.push(d.json(v[i],l+1,h,true))}} return rv;})(v,this).join(","+this.eol(ne,2))+this.eol(ne,1)+"]"+this.eol(ne);

				case "boolean":
					return (v ? "true" : "false")+this.eol(ne);

				case "object":
					if (v.serialize) var v = v.serialize();
					return "{"+this.eol(ne,2)+(function(v,d){var rv=[];for (var i in v){if (this.pass(i,v[i],h)){rv.push(d.json(i,0,0,true)+":"+d.json(v[i],l+1,h,true))}} return rv;})(v,this).join(","+this.eol(ne,2))+this.eol(ne,1)+"}"+this.eol(ne);

				default:
					return "null"+this.eol(ne);
			}
		} catch (e) {
			return "null"+this.eol(ne);
		}
	};

	return this.json(v,0,[]);
};

var json_decode = function(o) {
	try {
		eval("o = "+o);
	} catch(e) {
		return o;
	};
	return o;
};

function b64v(urlSafe) {
	return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+(urlSafe?"-._":"+/=");
};

function base64ArrayBufferDecode(data, urlSafe) {
	var b64 = b64v(urlSafe);
	var e = b64.charAt(64);

	var h1, h2, h3, h4, bits, ac = 0;
	
	if (!data) {return data;}
	data += '';

	var pad = 0, i = data.length - 1;
	while (data.charAt(i) == e) { i--; pad++; }

	var len = (data.length * 6 / 8) - pad;

	var bytes = new Uint8Array(len);

	i = 0;

	while (1) {
		h1 = b64.indexOf(data.charAt(i++));
		h2 = b64.indexOf(data.charAt(i++));
		h3 = b64.indexOf(data.charAt(i++));
		h4 = b64.indexOf(data.charAt(i++));
		bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

		if (ac < len) { bytes[ac++] = bits >> 16 & 0xff; } else break;
		if (ac < len) { bytes[ac++] = bits >> 8 & 0xff; } else break;
		if (ac < len) { bytes[ac++] = bits & 0xff; } else break;
	}
	return bytes.buffer;
};

String.prototype.safeString = function() {
	var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var meta = { // table of character substitutions
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	};

	escapable.lastIndex = 0;
	return escapable.test(this) ? '"' + this.replace(escapable, function (a) {
		var c = meta[a];
		return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	}) + '"' : '"' + this + '"';
};

var typeOf = function(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (value instanceof Array) {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
};

var toSite = function(url) {
	url = url.split("//").pop().split("/").shift().toLowerCase().split(".");
	if (url[0].substr(0,3) == "www") url.shift();
	return url.join(".");
};

String.prototype.strip_tags = function() {
	return this.replace(/(<([^>]+)>)/ig,"");
};

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
};

function updateScroll() {
	dg('fichasha').style.top = window.pageYOffset+"px";
};

function httpRequest() { 
	if (window.XMLHttpRequest) { 
		 return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		 return new ActiveXObject("Microsoft.XMLHTTP");
	}
};

if (window == window.top && (!document.getElementById('fichasha') || window.lgtRunningFrom == "web")) {
	init();

	window.addEventListener("scroll", function(e) {
		updateScroll();adjustHeight();
	});
	
	window.addEventListener("resize", function(e) {
		adjustHeight();
	});
	
	window.addEventListener("focus", function(e) {
		sessionFocus(true);
	});
	
	window.addEventListener("blur", function(e) {
		sessionFocus(false);
	});
	
	oldBeforeUnload = unsafeWindow.onbeforeunload;
	
	unsafeWindow.onbeforeunload = function(e) {
		sessionState(false);
		if (oldBeforeUnload) oldBeforeUnload();
	};
	
}	sessionState(true);
})();}, false);
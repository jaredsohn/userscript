// ==UserScript==
// @name           	Facebook Invites
// Last Edited		December 2013

// @include        	http://*.facebook.com/*
// @include        	https://*.facebook.com/*
// @include        	http://forums.zynga.com/*
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
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
	while(cp && cp.tagName!="BODY") {
		if(cp.tagName=="FORM") {
			if(cp.action && cp.action.indexOf('edittopic')>=0) {
				// ignore captcha for making forum posts.
				captcha=undefined;
			}
			break;
		}
		cp=cp.parentNode;
	}

	var popDialogss=document.evaluate(".//div[contains(@class,'pop_dialog')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//var popDialog=document.getElementById("pop_content");
	var popDialog=null;
	for(var popss=0; popss<popDialogss.snapshotLength; popss++) {
		var pd=popDialogss.snapshotItem(popss);
		var inps=pd.getElementsByTagName('INPUT');
		if(!inps || inps.length==0) { continue; }
//		var friendAddingTool=nHtml.FindByXPath(pd,".//div[contains(@class,'FriendAddingTool')]");
//		if(!friendAddingTool) continue;
		popDialog=pd;
		break;
	}

	if(this.SkipButton()) {
		// LoveYou43v3r reported that it got stuck in some skip dialogs.
		waitMillis=10000;
	} else if(captcha && popDialog) {
		// yuck captcha, wait for the user to do something.
		GM_log('found captcha, wait for user input');
		waitMillis=2000;
	} else if(this.waitForAddMe=="add") {
		if(popDialog) {
			var a=nHtml.FindByXPath(popDialog,".//a[contains(@href,'/addfriend.php')]");
			if(!a) {
				// maybe we've already added this friend.
				var close=nHtml.FindByAttr(popDialog,"input","name","close");
				if(close) {
					this.waitForAddMe=null;
					GM_log('Click close on error/already added dialog');
					nHtml.Click(close);
				} else {
					GM_log('waiting for add friend popup');
				}
			} else {
				GM_log('Click addfriend');
				nHtml.Click(a);
				this.SetWaitForAddMe("message");
			}
		}
	} else if(this.waitForAddMe=="message") {
		var add=null;

		if(popDialog) {
			add=nHtml.FindByAttr(popDialog,"input","name",'connect');
			var ok=nHtml.FindByAttr(popDialog,"input","name",'ok');

			var ss=document.evaluate(".//input[@type='button']",popDialog,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if(ss.snapshotLength==1 && ok) {
				// maybe the you are already connected message, just click ok
				GM_log('Click ok button');
				nHtml.Click(ok);
			}
		}
		if(popDialog && add) {
			var friendAddSelect=this.GetFriendListDropDown(popDialog);

			var friendList=this.bulkAddOptions.friendList;
			if(!friendAddSelect && friendList.length>0) {
				this.ClickFriendListDropDown(document.body);
			} else {
				if(friendList.length>0) {
					this.SelectFriendListDropDown(friendAddSelect,friendList);
				}
				var newsFeed=nHtml.FindByXPath(popDialog,".//input[contains(@id,'news_feed_')]");
				if(newsFeed) newsFeed.checked=this.bulkAddOptions.newsFeed;

				var showComment=nHtml.FindByXPath(popDialog,".//a[contains(@onclick,'showMessage')]");

				if(showComment) {
					GM_log('Click show comment link');
					nHtml.Click(showComment);
				}
				var tas=popDialog.getElementsByTagName('textarea');
				if(tas.length>0) {
					tas[0].value=this.bulkAddOptions.comment;
				} else {
					GM_log('Could not find message textarea');
				}
				var messLink=nHtml.FindByXPath(popDialog,".//a[contains(@onclick,'addMsgBox')]");
				if(messLink) {
					GM_log('Click show message box link');
					nHtml.Click(messLink);
				}
				if(this.bulkAddOptions.testAddMe) {
					add=nHtml.FindByAttr(popDialog,"input","name","cancel");
				}
				if(add) {
					var delay=this.bulkAddOptions.delay;
					this.SetWaitForAddMe(null); 
					// this means that it goes into the else loop after clicking on connect which means that it ignores the "already connected" error
					// therefore i've added the code to click on already connected in the else part of the if statement
					waitMillis=1000*delay;
					var t=this;
					window.setTimeout(function() {
						GM_log('Click add friend!');
						nHtml.Click(add);
						if(t.GetAutoBulkAdd()) {
							t.CloseIFrameOnCompletion();
						}
					},this.bulkAddOptions.testAddMe?1500:0);
				}
			}
		}

		if(this.waitForAddMe=="message" && (this.waitForAddMeStarted+15000)<  ((new Date()).getTime()) ) {
			var b1=document.getElementById('dialog_button1');
			var b2=document.getElementById('dialog_button2');
			if(b1 && !b2) {
				GM_log('We are already friends with this person');
				nHtml.Click(b1);
			} else {
				// 15 secs is up, still no dialog found.
				GM_log('Skipping this user cause no add friend dialog is showing up.'+window.location.href);
			}
			this.SetWaitForAddMe(null);
		}
	} else 	{
		while(1) {
			if(this.addMeUptoMax>0 && this.addMeUpto>=this.addMeUptoMax) {
				GM_log('FinishedBulkAddMe, max added:'+this.addMeUptoMax);
				return;
			}
			var a=null;
			if(this.addAsFriendButtons) {
				a=this.FindNthAddAsFriend(this.addMeUpto);
				// sometimes the list of users dialog disappears inbetween adding a friend.
				
				if(this.addMeUpto<this.addAsFriendButtons) {
					var addAsFriends=this.FindNthAddAsFriends();
					if(addAsFriends) {
						this.addAsFriendButtons=addAsFriends.snapshotLength;
					} else if(!a) {
						break;
					}
				}
			} else {
				a=this.FindNthPost(this.addMeUpto);
			}
			
			this.addMeUpto++
			if(a==null && !this.profilePageAdd) {
				if(!this.BulkAddMePrevPage()) {
					if(GM_getValue('autoBulkAdd_RemoveWhenFinished',false))
					//if(autoBulkAdd_RemoveWhenFinished)
						this.SetAutoBulkAdd(false);
					GM_log('FinishedBulkAddMe');
					return;
				}
				this.addMeUpto=0;
				waitMillis=12000;
				break;
			}
			//error checking for already connected dialog - added by VX
			var add=null;
			if(popDialog) {
				add=nHtml.FindByAttr(popDialog,"input","name",'connect');
				var ok=nHtml.FindByAttr(popDialog,"input","name",'ok');

				var ss=document.evaluate(".//input",popDialog,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if(ss.snapshotLength==1 && ok) {
				// maybe the you are already connected message, just click ok
					GM_log('Click ok button');
					nHtml.Click(ok);
				
/*
				//click cancel on old dialog
				popDialog=document.getElementById("pop_content");
				if(popDialog) {
					var cancel=nHtml.FindByAttr(popDialog,"input","name","cancel");
					GM_log('Cancel clicked');
					nHtml.Click(cancel);
				}
*/
				}
			}
		// finished edit by vx
//			var hasAddFriendDialog=this.HasAddFriendDialog(a);
//			var ref=hasAddFriendDialog?a.getAttribute('onclick'):a.href;

			if(this.addAsFriendButtons) {
				// We have some add as friend buttons
				if(this.profilePageAdd) {
					var content=document.getElementById('content');
					if(content)
						//a=nHtml.FindByXPath(content,".//a[contains(@href,'/addfriend.php')]");
						a=nHtml.FindByXPath(content,".//a[contains(@href,'/addfriend.php')]");
				}

				var title=nHtml.FindByXPath(a.parentNode.parentNode.parentNode,".//a[contains(@class,'UIObjectListing_Title')]");
				if(!title) continue;
				var ref=title.href;
				if(this.addMeDone[ref]) { continue; }
				this.addMeDone[ref]=1;

				nHtml.Click(a);
				waitMillis=2000;
				this.SetWaitForAddMe("message");
				var t=this;
				window.setTimeout(function() {
					t.ClickClose();
				},500);
			} else {
				var ref=a.href;
				var idm=this.idRe.exec(a.href);
				if(!idm) { continue; }

				if(this.addMeDone[ref]) { continue; }
				this.addMeDone[ref]=1;
				this.ShowAddFriendDialog(idm[1],this.IsPopupToAddFriend());
				if(!this.profilePageAdd && this.IsPopupToAddFriend()) {
					waitMillis=10000;
					this.SetWaitForAddMe(null);
				} else {
					waitMillis=100;
					this.SetWaitForAddMe("message");
				}
			}
			this.waitForAddMeStarted=(new Date()).getTime();
/*
			nHtml.Click(a);
			if(hasAddFriendDialog) {
				this.waitForAddMe="message";
			} else {
				this.waitForAddMe="add";
			}
*/
			break;
		}
	}
	if(this.bulkAddOptions.testAddMe && waitMillis<2000) { waitMillis=2000; }

	this.bulkAddMeTimeout=window.setTimeout(function() { 
		FacebookInvites.BulkAddMe(startTime);
	},waitMillis);
},

profileNameUpto:1,
OpenInFrame:function(url) {
	if(location.href.indexOf('facebook.com')<0) {
		GM_openInTab(url);
		return;
	}
	var f=document.createElement('iframe');
	f.width='100%';
	f.height=window.innerHeight*0.8;

	var name='ProfileIFrame'+this.profileNameUpto;
	f.id=name;
	f.name=name;
	f.src=url;
	document.body.insertBefore(f,document.body.childNodes[0]);
	if(this.profileNameUpto==1) {
		var script=document.createElement('script');
		script.innerHTML='function '+
			'CloseIFrameByName(name) { window.setTimeout(function() {'+
			'var f=document.getElementById(name); if(f) { f.parentNode.removeChild(f); } '+
			'},100);'+
			'}';
		document.body.appendChild(script);
	}
	this.profileNameUpto++;
},

ShowAddFriendDialog:function(uid,popupToAddFriend) {
//	var addFriendClick=nHtml.FindByXPath(document,"//a[contains(@onclick,'ConnectDialog')]");
	if(popupToAddFriend && !this.profilePageAdd) {
		GM_log('Lets go to the profile page:'+uid);
		this.OpenInFrame('http://www.facebook.com/profile.php?id='+uid);

/*
		this.SetMessage('Facebook has not included the javascript to add friends from this page, have to open the profile page in a new tab.'+
			"Enable auto add on the profile page if you have not done it.");
*/
	} else {
		GM_log('showfriend:'+uid);
/* Disabled: 18/feb/2010
		var addFriendClick=nHtml.FindByXPath(document,"//a[contains(@href,'rel_dialog=1') and contains(@href,'connect.php')]");
			nHtml.Click(addFriendClick);
*/
		var a=document.createElement('script');
		// 29/nov/2009
		a.innerHTML="Dialog.bootstrap('http://www.facebook.com/ajax/profile/connect.php?profile_id="+
			uid+"&rel_dialog=1&src=top_bar&ondone_reload=0',null,false);";

//		a.innerHTML='new ConnectDialog("'+uid+'", "friend_other", null, this, 0, "", -1.000000, "", "").show();';
//		a.innerHTML='show_addfriend_dialog("'+uid+'", this, undefined, undefined, undefined, undefined, undefined, "profile_others");';
		var t=this;
		window.setTimeout(function() {
			document.body.appendChild(a);
		},5000);
	}
},

BulkAddMePrevPage:function() {
	if(!this.bulkAddOptions.doPrevPages) {
		return false;
	}
	var ss=document.evaluate("//a[contains(@onclick,'start')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	var numberRe=/^[\\s0-9]+$/;
	var onclickRe=new RegExp("start[\"\\s]*:\\s*[\-0-9]+");
	var foundUpto=0;
	var firstPagerLink=null;

	for(var s=ss.snapshotLength-1; s>=0; s--) {
		var a=ss.snapshotItem(s);
		var oncl=a.getAttribute('onclick');
		if(!oncl) { continue; }
		if(!onclickRe.exec(oncl)) {
			continue;
		}
		if(foundUpto>=1) {
			// 2nd last link
			nHtml.Click(a);
			return true;
		}

		foundUpto++;
	}

/*
	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		var oncl=a.getAttribute('onclick');
		if(!oncl) { continue; }
		if(!onclickRe.exec(oncl)) {
			continue;
		}

		if(numberRe.exec(a.textContent)) {
			if(foundUpto>0) {
				// only 1 pager link, it must be "prev" on the 2nd page, there won't be a "first" link.
				nHtml.Click(firstPagerLink);
				return true;
			}
			break;
		}
		if(foundUpto==0) {
			firstPagerLink=a;
		}
		if(foundUpto==1) {
			// the 2nd pager link with text
			nHtml.Click(a);
			return true;
		}

		foundUpto++;
	}
*/
	GM_log('No previous link found');
	return false;
},

ClearFriendsBuffer:function() {
	this.SetMessage("0 Friends in the current list.");
	this.SaveFriendsFromHash({});
},


dataGTRe:/eng_tid":([0-9]+)/,
GetFriendIdFromLink:function(a,profileRe) {
	var ppid=a.parentNode.parentNode.id;
	var ppclass=a.parentNode.parentNode.className;
	// ignore profile links in the status update and notifications areas.
	if(ppid.indexOf('notification_')>=0 || ppclass=='status_updates' || a.parentNode.className=='fb_menu_title' || a.parentNode.id=='friend_guesser') { return null; }
	var profileM=profileRe.exec(unescape(a.href));

// <a data-gt="{&quot;engagement&quot;:{&quot;eng_type&quot;:1,&quot;eng_src&quot;:2,&quot;eng_tid&quot;:1384454335,&quot;eng_data&quot;:[]}}" href="http://www.facebook.com/Sailormmark">Mark Voll</a>
	var dataGT=a.getAttribute('data-gt');
	if(dataGT) {
		var r=this.dataGTRe.exec(dataGT);
		if(r) {
			return r[1];
		}
	}

	var id=null;
	if(profileM && profileM.length>1) {
		id=profileM[2];
	} else {
		var imgs=a.getElementsByTagName('img');
		if(imgs && imgs.length>0) {
			var imgM=this.imgRe.exec(imgs[0].src);
			if(imgM && imgM.length>1) {
				id=imgM[1];
			}
		}
	}
	return id;
},
imgRe:new RegExp("http://profile.ak.facebook.com/.*/[a-z]([0-9]+)_.*\\.jpg"),
profileRe:new RegExp('.facebook.com.*/(profile|friends).*id=([0-9]+)'), //change suggested by Austin Pereira - http://userscripts.org/topics/34741#posts-167127
GetFriendsFromPage:function(doc,profileRe) {
	var as=doc.getElementsByTagName('a');
	if(!profileRe) {
		profileRe=this.profileRe;
	}
	var friendsFromPage={};
	for(var aUpto=0; aUpto<as.length; aUpto++) {
		var a=as[aUpto];
		var id=this.GetFriendIdFromLink(a,profileRe);
		if(id && !friendsFromPage[id]) {
			GM_log('add friend to list:'+id);
			friendsFromPage[id]=1;
		}
	}

	return friendsFromPage;
},

/*
ShowAddFriendsFromPage:function() {
	var div=document.createElement('div');
	div.style.position='fixed';
	div.style.left=0;
	div.style.top=0;
	div.innerHTML="<form>"+
		"Next button: <input value='.facebook.com.*profile.php.*id=([0-9]+)' id='AddFriendsFromPageButton' />"+
		"<input type='button' value='Go' id='AddFriendsFromPageButton' /><br /></form>";
	document.body.appendChild(div);
	var AddFriendsFromPageButton=document.getElementById('AddFriendsFromPageButton');
	AddFriendsFromPageButton.addEventListener(function() {
		var re=new RegExp(document.getElementById('AddFriendsFromPageButton').value);
		FacebookInvites.GetFriendsFromPage(re,true);
	},false);
},
*/

ClickAllFacebookFriendLinks:function() {
	var ss=document.evaluate("//a[contains(@href,'.facebook.com')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var profileRe=new RegExp('facebook\.com/[^/]+$');
	var profilePhpRe=new RegExp('facebook\.com/.*profile.php.*id=');
	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		if(profileRe.exec(a.href) || profilePhpRe.exec(a.href)) {
			GM_openInTab(a.href);
		}
	}
},

// add friends from any page
AddFriendsFromPage:function(info) {
	if(info.pageUpto==undefined) {info.pageUpto=0; }
	var friends=this.GetFriendsWithApp();
	var addedFriends=0;
	var friendsFromPage=this.GetFriendsFromPage(info.doc,info.profileRe);
	for(var id in friendsFromPage) {
		if(!friends[id]) {
			friends[id]=1;
			addedFriends++;
		} 
	}

	this.SaveFriendsFromHash(friends);
	var totalFriends=0; for(var f in friends) { totalFriends++; }
	GM_log('added '+addedFriends);
	this.SetMessage("Added "+addedFriends+" to the current list, total:"+totalFriends);
	if(info.doNextPage) {
		var nextPage=nHtml.FindByXPath(document,".//a[contains(@class,'UIPager_ButtonForward')]");

		if(nextPage) {
			nHtml.Click(nextPage);
			if(nextPage.parentNode.className.indexOf('Disabled')>=0) {
				// no more next buttons
				GM_log("No more next page buttons");
				info.doNextPage=false;
			}
		} else {
			var ss=document.evaluate("//a[contains(@onclick,'b:appfriends')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if(ss && ss.snapshotLength>0) {
				var lastItem=ss.snapshotItem(ss.snapshotLength-1);
				var numberRe=/^[\\s0-9]+$/;
				var m=numberRe.exec(lastItem.innerHTML.trim());
				if(!m) {
					// last one is not a number so it's a "next" button.
					nHtml.Click(lastItem);
				} else {
					GM_log("No more next page buttons");
					info.doNextPage=false;
				}
			} else if(info.pageUpto==0) {
				// we can't even find a next button on the first page, let's not click 'next'
				GM_log('No next button on first page, do not do multiple pages.');
				info.doNextPage=false;
			}
		}
		if(info.doNextPage) {
			GM_log('Wait for Next button');
			window.setTimeout(function() {
				info.pageUpto++;
				FacebookInvites.AddFriendsFromPage(info);
			},2000);
		}
	}
},


//////////////////////////////////////

profileIdRe:new RegExp('id=([0-9]+)'),

IterateButtons:function(func) {
	var ss=document.evaluate(".//*[contains(@class,'appRequest')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var info={
		'func':func,
		'ss':ss,
		'sUpto':0,
//		'currentApp':'Unknown',
//		'currentAppIcon':null,
//		'currentAname':'',
//		'confirmUpto':0,
		'nthButton':0
	}
	this.IterateButtonsNext(info);
},

IterateButtonsNext:function(info) {
	var t=this;
	if(info.sUpto>=info.ss.snapshotLength) return false;
	var li=info.ss.snapshotItem(info.sUpto);
	info.sUpto++;
	if(li.className.indexOf('appRequestGroup')>0) {
		var img=nHtml.FindByXPath(li,".//a[contains(@class,'UIImageBlock_ICON_Image')]/img");
		var game=nHtml.FindByXPath(li,".//a[contains(@href,'apps.facebook')]/strong");
		info.icon=img.src;
		info.app=game.innerHTML;
		t.IterateButtonsNext(info);
		return;
	}
	
	if(li.className.indexOf('appRequestBody')<0) {
		var inp=nHtml.FindByXPath(li,".//input[contains(@name,'action')]");
		if(inp) {
			info.value=inp.value;
			info.obj=inp;
			if(!info.func(info)) {
				return;
			}
		}
	}
	t.IterateButtonsNext(info);
},

/*
IterateButtonsOld:function(func) {
	var ss=document.evaluate(
		"//*[contains(@class,'confirm_boxes') "+
		"or contains(@class,'uiHeaderTop') "+
		"or contains(@class,'mbl') "+
		"or contains(@class,'uiRequestCloseSelectorButton') "+
		"or contains(@class,'inputbutton') "+
		"or contains(@name,'actions[') "+
		"or contains(@class,'uiListVerticalItemBorder') "+
		"or @class='confirm']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var info={
		'func':func,
		'ss':ss,
		'sUpto':0,
		'currentApp':'Unknown',
		'currentAppIcon':null,
		'currentAname':'',
		'confirmUpto':0,
		'nthButton':0
	}
	this.IterateButtonsNext(info);
},

IterateButtonsNextOld:function(info) {
	var donext=this.IterateButtonsNext2(info);
	if(donext)
		this.IterateButtonsNext(info);
},

IterateButtonsNextOld2:function(info) {
//	var ss=document.evaluate("//*[contains(@class,'confirm_boxes') or contains(@class,'inputbutton') or @class='confirm']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//	var currentApp='Unknown';
//	var currentAname='';
//	var confirmUpto=0;
//	var nthButton=0;

	var ss=info.ss;
	if(info.sUpto>=ss.snapshotLength) { return; }

//	for(var s=0; s<ss.snapshotLength; s++) {
	var sObj=ss.snapshotItem(info.sUpto);
	info.sUpto++;

	if(sObj.className.indexOf('BulkAddButton')>=0) {
		return true;
	}
	if(sObj.className=='confirm' || sObj.className.indexOf('uiListVerticalItemBorder')>=0) {
		info.nthButton=0;
		info.confirmUpto++;
		return true;
	}

	if(sObj.className.indexOf('mbl')>=0
	|| sObj.className.indexOf('uiHeaderTop')>=0) {
	
		var spans=sObj.getElementsByTagName('span');
		var h3s=sObj.getElementsByTagName('H3');
		//var imgs=sObj.getElementsByTagName('img');
		var icon=nHtml.FindByXPath(sObj,".//img[contains(@class,'UIImageBlock_ICON_Image')]");
		
		if(h3s.length>0) {
			info.currentApp=h3s[0].textContent.trim();
			if(spans.length>0) {
				info.currentAname=spans[0].id;
			}
			if(icon) {
				info.currentAppIcon=[icon.src,icon.className];
			} else {
				//var is=sObj.getElementsByTagName('i');
				//if(is.length>0 && is[0].className.indexOf('ICON')>=0) {
					info.currentAppIcon=['',''];
				//}
			}
		}
		return true;
	}
	if(sObj.className.indexOf('confirm_boxes')>=0) {
		var aname=sObj.id;
		var imgs=sObj.getElementsByTagName('img');
		
		var spans=sObj.getElementsByTagName('span');
		if(spans.length>0) {
			info.currentApp=spans[0].textContent.trim();
			info.currentAname=aname;
			if(imgs.length>0 && imgs[0].className.indexOf('ICON')>=0) {
				info.currentAppIcon=[imgs[0].src,imgs[0].className];
			} else {
				var is=sObj.getElementsByTagName('i');
				if(is.length>0 && is[0].className.indexOf('ICON')>=0) {
					info.currentAppIcon=['',is[0].className];
				}
			}
		}
		return true;
	}

	var buttonValue=sObj.value;
	var parent=sObj.parentNode;
	var pmRe=RegExp('p.m ');
	while(parent
//		|| (parent.className.indexOf('info')<0 && parent.tagName!="LI")
	) {
		if(parent.tagName=='BODY') { parent=null; break; }
		if(parent.className!=undefined) {
			if(parent.className.indexOf('uiListVerticalItemBorder')>=0 && parent.tagName=="LI") {
				break;
			}
			if(parent.className.indexOf('confirm')>=0 && parent.tagName=="DIV") {
				break;
			}
			//if(parent.className.indexOf('mbl')>=0 && parent.tagName=="DIV") {break;	}
		}
		parent=parent.parentNode;
	}
	var profileHref=null;
	var profileId=null;
	if(parent) {
		profileHref=nHtml.FindByXPath(parent,".//a[contains(@href,'profile.php')]");

		if(profileHref) {
			var pm=this.profileIdRe.exec(profileHref.href);
			if(pm && pm.length>1) {
				profileId=pm[1];
			}
			var nameInfo=profileHref.innerHTML.trim().split(new RegExp('\\s+'),2);
			if(buttonValue) {
				buttonValue=buttonValue.replace(profileHref.innerHTML+"'s",'');
				buttonValue=buttonValue.replace(profileHref.innerHTML,'');
				buttonValue=buttonValue.replace(nameInfo[0]+"'s",'');
				buttonValue=buttonValue.replace(nameInfo[0],'');
			} else {
				buttonValue='X';
			}
		} else {
			GM_log('No profile for button: '+sObj.value+',par:'+parent.tagName);
		}
	} else {
		GM_log('Cannot find parent to button: '+sObj.value);
	}

	if(info.currentApp=="") {
		return true;
	}
	
	var donext=false;
	if(sObj.className.indexOf('inputbutton')>=0
	|| sObj.className.indexOf('uiRequestCloseSelectorButton')>=0 // X close button
	|| (sObj.name && sObj.name.indexOf('actions[')>=0)) {
		donext=info.func(
			{
			'aname':info.currentAname,
			'app':info.currentApp,
			'icon':info.currentAppIcon,
			'obj':sObj,
			'info':info,
			'value':buttonValue,
			'parent':parent,
			'profileId':profileId,
			'confirmUpto':info.confirmUpto,
			'nthButton':info.nthButton
		});
	}
	info.nthButton++;

	return donext;
},
*/

IsTest:function() {
	var testBox=document.getElementById('BulkRequestsTest');
	if(!testBox) { return false;  }
	var test=testBox?testBox.checked:false;
	return test;
},

OpenInIFrame:function(url) {
	var iframe=document.createElement('iframe');
	iframe.style.display='none';
	if(url) iframe.src=url;
	document.body.appendChild(iframe);
	return iframe;
},

RemoveIFrame:function(iframe) {
	// we need to remove here with a timeout so that we're not removing while in an event of the iframe that we're removing.
	window.setTimeout(function() {
		GM_log('Remove iframe, document loaded or timed out');
		iframe.parentNode.removeChild(iframe);
	},3*1000);
},
RemoveIFrameOnLoad:function(iframe) {
	var t=this;
	window.setTimeout(function() {
		if(iframe.contentDocument) {
			iframe.contentDocument.addEventListener('load',function() {
				if(iframe) t.RemoveIFrame(iframe);
				iframe=null;
			},false);
		}
	},2000);
	window.setTimeout(function() {
		if(iframe) t.RemoveIFrame(iframe);
		iframe=null;
	},30*1000);
},					

SetBulkRequestOpenType:function(t) {
	var select=document.getElementById('BulkRequestsNewTab');
	if(!select) return;
	for(var s=0; s<select.options.length; s++) {
		var option=select.options[s];
		if(option.value==t) { select.selectedIndex=s; }
	}
},
GetBulkRequestOpenType:function() {
	return document.getElementById('BulkRequestsNewTab').value;
},

NormalClick:function(form,button,clickFunc) {
	var t=this;
	var url=form.action+'?__a=1';
	var ss=document.evaluate(".//input[@type='hidden']",form,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var data=button.name+'='+button.value+'&';
	data+='nctr[_mod]=pagelet_requests&'+
		'lsd&'+
		'post_form_id_source=AsyncRequest&'+
		'__user='+unsafeWindow.Env.user;

	for(var s=0; s<ss.snapshotLength; s++) {
		var inp=ss.snapshotItem(s);
		data+='&'+inp.name+'='+inp.value;
	}
	GM_xmlhttpRequest({
		'url':url,
		'method':'POST',
		'data':data,
		onerror:function() {
			GM_log("Failed to Open:"+url);
			t.AddAutoAcceptError("Error with:"+url);
		},
		onload:function(resp) {
			function unQuote(str) {
				return str.replace(/\\(.)/g,'$1');
			}
			var m=/goURI\(([^\]]+)\);"/.exec(resp.responseText);
			var newurl=unQuote(unQuote(m[1]));
			newurl=newurl.replace(/^"/,'');	
			newurl=newurl.replace(/"$/,'');	
			clickFunc(newurl);
			
			t.AddAutoAcceptError("Visited:"+newurl);
			GM_log("Opened ok:"+newurl);
		}
	});

/*	
	form.action=form.action+'?__a=1';
	form.target='_blank';
	
	form.onsubmit='';
	
	SendNormalClick();
	function AppendHidden(n,v) { 
		var inp=document.createElement('input');
		inp.type='hidden';
		inp.name=n;
		inp.value=v;
		form.appendChild(inp);
	}
	AppendHidden('actions[accept]','Aceptar');
	AppendHidden('nctr[_mod]','pagelet_requests');
	AppendHidden('lsd','');
	AppendHidden('post_form_id_source','AsyncRequest');
	AppendHidden('__user',unsafeWindow.Env.user);
*/
},


ClickAutoAcceptButton:function(obj,normalClick) {
	var t=this;
	if(this.IsTest()) {
		obj.style.border='3px solid #f00';
		return;
	}

	var t=this;
	//var onclick=obj.getAttribute('onclick');
	var openType=this.GetBulkRequestOpenType();
	if(openType=="") {
		normalClick=true;
	}
//			var platformRe=new RegExp("click_add_platform_app[^;]+'(http[^']+)'");
		var platformRe=/actions\[(http[^\]]+)\]/;
		var m=platformRe.exec(obj.name);
		if(m) {
			var url=m[1].replace('&amp;','&');
			GM_log("Opening:"+url);
			if(openType=='hidden') {
				GM_xmlhttpRequest({
					'url':url,
					'method':'GET',
					onerror:function() {
						GM_log("Failed to Open:"+url);
						t.AddAutoAcceptError("Error with:"+url);
					},
					onload:function() {
						t.AddAutoAcceptError("Visited:"+url);
						GM_log("Opened ok:"+url);
					}
				});
			} else if(openType=='iframe') {
				var iframe=this.OpenInIFrame(url);
				iframe.style.display='block';
				iframe.width='100%';
				iframe.height='400';
				t.RemoveIFrameOnLoad(iframe);
			} else {
				GM_openInTab(url);
			}
		}
		
		var p=obj.parentNode;
		var form=null;
		while(p.tagName!="BODY" && p) {
			if(p.tagName=="FORM") { form=p; break; }
			p=p.parentNode;
		}

//		if(normalClick) {

			if(form) {
				t.NormalClick(form,obj,function(newurl) {
					if(openType=='hidden') {
						GM_xmlhttpRequest({
							'url':newurl,
							'method':'GET',
							onload:function() {
								GM_log('visited url without showing:'+newurl);
							}
						});
						
					} else if(openType=='iframe') {
							var iframe=this.OpenInIFrame();
							iframe.src=newurl;
							window.setTimeout(function() {
								iframe.parentNode.removeChild(iframe);
							},5000);
					} else  if(openType=='') {
						GM_openInTab(newurl);
					}
				});

//GM_log('form:'+unsafeWindow.Env.user);

//				form.submit();
//				nHtml.Click(obj);
			} else {
				GM_log('Error:  cannot find form with button'+obj.innerHTML);
			}
/*			
		} else if(openType=='hidden' || openType=='tab') {
			var ss=document.evaluate(".//input",form,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			
			var dataStr='';
			for(var s=0; s<ss.snapshotLength; s++) {
				var inp=ss.snapshotItem(s);
				if(inp.type.toUpperCase()=="SUBMIT") {
					if(inp.name!=obj.name) {
						continue;
					}
				}
				dataStr+=escape(inp.name)+'='+escape(inp.value)+'&';
			}

			GM_xmlhttpRequest({
				'url':form.action,
				'headers':{'Content-type':'application/x-www-form-urlencoded'},
				'method':'POST',
				'data':dataStr
			});
		} else {
			var iframe=this.OpenInIFrame();
			iframe.contentDocument.body.innerHTML=
				"<base href='"+document.location.href+
				"' /><form method='"+form.method+"' action='"+form.action+"'>"+
				form.innerHTML+"</form>";
			iframe.contentDocument.forms[0].submit();
			window.setTimeout(function() {
				iframe.parentNode.removeChild(iframe);
			},5000);
		}
	*/	
},


GetMaxClicks:function() {
	var maxClicks=document.getElementById('BulkRequestsMaxClicks');
	if(!maxClicks) return 0;
	return maxClicks.value;
}, 

GetClickDelay:function() {
	var maxClicks=document.getElementById('BulkRequestsDelay');
	if(!maxClicks) return null;
	var v=parseInt(maxClicks.value);
	if(isNaN(v)) return null;
	return v;
},

ClickAutoAccept:function(e) {
	var target=e.target;
	var appInfo=target.parentNode.id.split('_',2);
	var app=appInfo[1];
	app=unescape(app);
	var nth=null;
	var button=null;
	var byText=null;

	if(target.id=='BulkClickByTextButton') {
		byText=document.getElementById('BulkClickByText').value.toLowerCase().trim();
		if(byText=="") return;
	} else {
		if(e.target.value.substring(e.target.value.length-6)=='button') {
			var nthM=/^([0-9]+)/.exec(e.target.value);
			nth=parseInt(nthM[1])-1;
		} else {
			var buttonInfo=e.target.value.split(' x ',2);
			button=buttonInfo[1];
		}
	}
	var friendsClicked={};
	if(!e.buttonUpto) { e.buttonUpto=0; }
	var t=this;
	this.IterateButtons(function(info) {
		t.SkipButton();
		var ok=false;
		var maxClicks=t.GetMaxClicks();
			if(maxClicks>0 && e.buttonUpto>=maxClicks) {
			return false;
		}
 		if(byText!=null && info.value.toLowerCase().indexOf(byText)>=0) {
			ok=true;
		}

		if(( 
			(app==t.allAppsId || info.app==app) 
			&& (info.value==button || info.nthButton==nth)
		) || ok) {
			if(info.profileId) {
				friendsClicked[info.profileId]=1;
			}

			/*
			var friendList=document.getElementById('AcceptFriendList').value;
			var friendAddSelect=t.GetFriendListDropDown(info.parent);
			if(friendList.length>0) {
				t.ClickFriendListDropDown(info.parent);
				window.setTimeout(function() {
					// wait for the drop down.
					friendAddSelect=t.GetFriendListDropDown(info.parent);
					if(!friendAddSelect) { 
						GM_log("Cannot find friend list drop down!"); 
					}
					if(friendAddSelect) {
						// we have a drop down
						t.SelectFriendListDropDown(friendAddSelect,friendList);
					}
					window.setTimeout(function() {
						t.ClickAutoAcceptButton(info.obj,true);
						t.IterateButtonsNext(info.info);
					},1000);
				},3000);
				e.buttonUpto++;
				return false;
			}
			*/

			var openType=t.GetBulkRequestOpenType();

//			var friendMenu=nHtml.FindByXPath(info.parent,".//span[@class='FriendAddingTool_Menu']");
			
//			if(openType=="" || friendMenu) {
			var currentButtonUpto=e.buttonUpto;
			var currentObj=info.obj;
			var wait;
			var clickDelay=t.GetClickDelay();
			if(clickDelay!=null) {
				wait=clickDelay*1000*e.buttonUpto;
			}
			else if(openType=='hidden') wait=800*e.buttonUpto;
			else wait=3*1000*e.buttonUpto;
			
			window.setTimeout(function() {
				t.SetAutoAcceptStatus("Clicking button: "+(currentButtonUpto+1));
				t.ClickAutoAcceptButton(currentObj,false);
				t.IterateButtonsNext(info);
			},wait);
			e.buttonUpto++;
			return false;
		}
		return true;
	});
	this.SaveFriendsFromHash(friendsClicked);
},

ClickBlockButton:function() {
	var blockDiv=nHtml.FindByXPath(document,".//div[contains(@class,'dialog_buttons')]");
	if(!blockDiv) { return; }
	var block=nHtml.FindByXPath(blockDiv,".//input[@type='button']");
	if(block) {
		GM_log('block button pressed');
		nHtml.Click(block);
		return true;
	}
	return false;
},
SetBlockUpto:function(clicked,s) {
	var clickedStr='';
	for(var click in clicked) {
		clickedStr+=click+"###";
	}
	GM_setValue('blockLinkClicked',clickedStr);
	GM_setValue('blockLinkUpto',s);
},
GetBlockUpto:function(clicked) {
	var clickedStr=GM_getValue('blockLinkClicked','');
	var clickedArr=clickedStr.split('###');
	for(var c=0; c<clickedArr.length; c++) {
		clicked[clickedArr[c]]=1;
	}
	return GM_getValue('blockLinkUpto',-1);
},
BlockAllApps:function() {
	var clicked={};
	var s=this.GetBlockUpto(clicked);
	if(s<0) { return; }

	var stopBlockAll=document.getElementById('StopBlockAllApps');
	if(!stopBlockAll) {
		this.SetMessage("<a id='StopBlockAllApps'>Stop block all applications</a>");
		stopBlockAll=document.getElementById('StopBlockAllApps');
		stopBlockAll.addEventListener('click',function() {
			FacebookInvites.SetBlockUpto({},-1);
		},false);
	}

	var s=0;

	var test=this.IsTest();
	var ss=document.evaluate("//a[contains(@onclick,'block_app_dialog')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var obj=null;
	while(1) {
		if(s>=ss.snapshotLength) {
			this.SetMessage('Done block all');
			this.SetBlockUpto({},-1);
			window.setTimeout(function() {
				this.ClickBlockButton();
			},5000);
			return;
		}
		obj=ss.snapshotItem(s);
		var onclick=obj.getAttribute('onclick');
		if(!clicked[onclick]) {
			clicked[onclick]=1;
			break;
		}
		s++;
		continue;
	}
	this.SetBlockUpto(clicked,s); 
	window.setTimeout(function() {
		GM_log('click block:'+obj.getAttribute('onclick'));
		if(test) {
			obj.style.border='3px solid #f00';
		} else {
			nHtml.Click(obj);
		}
		window.setTimeout(function() {
			if(!FacebookInvites.ClickBlockButton()) {
				// clicking the block button will reload the page, we will run again when the page reloads.
				FacebookInvites.BlockAllApps();
			}
		},3000);
	},1000);
},

GetDivToggle:function(mDiv,settingName,def) {
	var bulkReqToggle=document.createElement('a');
	bulkReqToggle.href='javascript:;';
	var t=this;
	bulkReqToggle.addEventListener('click',function() {
		var show=GM_getValue(settingName,def);
		var show=show?false:true;
		GM_setValue(settingName,show);
		mDiv.style.display=show?'block':'none';
	},false);
	mDiv.style.display=GM_getValue(settingName,def)?'block':'none';
	return bulkReqToggle;
},

/*
SwitchConfirmDiv:function(nthButtonsToggle,nth) {			
	nthButtonsToggle.innerHTML=nth?"Switch to named buttons":"Switch to nth buttons";
	document.getElementById("nthConfirmDiv").style.display=nth?"block":"none";
	document.getElementById("nameConfirmDiv").style.display=nth?"none":"block";
	GM_setValue('showNthDiv',nth);
},
*/

GetLastClicked:function(target) {
	var lastClickedArr=GM_getValue("LastClicked","").split(',');
	var lastClicked={};
	for(var i=0; i<lastClickedArr.length; i+=2) {
		if(lastClickedArr[i]=="") continue;
		lastClicked[lastClickedArr[i]]=lastClickedArr[i+1];
	}
	return lastClicked;
},
SaveLastClicked:function(target) {
	var lastClicked=this.GetLastClicked();
	var appInfo=target.parentNode.id.split('_',2);
//	var hash=target.parentNode.getAttribute('appHash');
	var hash=target.parentNode.getAttribute('appName');
	var valInfo=target.value.split(' x ');
	var val=target.value;
	if(valInfo.length>=2) val=valInfo[1];
	lastClicked[hash]=this.GetBulkRequestOpenType()+"#"+val;
//	lastClicked[hash]=this.GetBulkRequestOpenType()+"#"+target.value; 
	
	var lastClickedArr=[];
	for(var id in lastClicked) {
		lastClickedArr.push(id);
		lastClickedArr.push(lastClicked[id].replace(/,/g,''));
	}
	GM_setValue("LastClicked",lastClickedArr.join(','));
},

ClickAutoAccepts:function(buttons) {
	var buttonUpto=0;
	for(var b=0; b<buttons.length; b++) {
		var buttonInfo=buttons[b];
		var button=buttonInfo.button;
		var e={'target':button,'buttonUpto':buttonUpto};
		this.SetBulkRequestOpenType(buttonInfo.openType);
		this.ClickAutoAccept(e);
		buttonUpto=e.buttonUpto;
	}
},
SetAutoAcceptStatus:function(html) {
	var d=document.getElementById('AutoAcceptStatus');
	if(d) d.innerHTML=html;
},		
AddAutoAcceptError:function(html) {
	var d=document.getElementById('AutoAcceptError');
	if(!d) return;

	var div=document.createElement('div');
	div.innerHTML=html;
	d.appendChild(div);
},		

ClickAllMoreRequests:function() {
	var ss=document.evaluate(".//a[contains(@class,'uiMorePagerPrimary')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var clicked=0;
	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		nHtml.Click(a);
		clicked++;
	}
	return clicked;
},

// add a link to auto accept all the friend requests on the page.
AddAutoAccept:function() {
	var event=document.getElementById('globalContainer');
	if(event) {
		event=event.childNodes[0];
	}

	/*
	var event=document.getElementById('friend_suggestion');
	if(!event) event=document.getElementById('friend_add');
	if(!event) event=document.getElementById('event_invite');
	*/
	if(!event) { return; }
	var mDiv=document.getElementById('BulkRequestsDiv');
	if(mDiv) { return; }
	
	this.ClickAllMoreRequests();
	
	mDiv=document.createElement('div');
	var buttonTypes={};
	var buttonsCount={};
	var maxButtons={};
	var appTypes={};
	this.IterateButtons(function(info) {
		var app=info.app;
		var buttonValue=info.value;
		appTypes[app]={'hash':info.aname,'icon':info.icon};
		if(buttonTypes[app]==undefined) {
			buttonTypes[app]={};
		}
		if(buttonTypes[app][buttonValue]==undefined) {
			buttonTypes[app][buttonValue]=0;	
		}
		buttonTypes[app][buttonValue]++;
		appTypes[FacebookInvites.allAppsId]={'hash':'','desc':'<b>All Applications</b>'};
		var buttonUpto=info.nthButton;
		if(!maxButtons[app] || buttonUpto>=maxButtons[app]) { 
			maxButtons[app]=buttonUpto+1; 
			if(!maxButtons[FacebookInvites.allAppsId] || buttonUpto>=maxButtons[FacebookInvites.allAppsId])
				maxButtons[FacebookInvites.allAppsId]=buttonUpto+1;
		}
		return true;
	});

	var bulkReqToggle=this.GetDivToggle(mDiv,'ShowBulkReqClick',true);
	bulkReqToggle.innerHTML='<b>'+this.scriptName+': Show bulk click requests block</b>';

	var toggleErrorDivJs='document.getElementById("AutoAcceptError").style.display'+
		'=document.getElementById("AutoAcceptError").style.display=="none"'+
		'?"block":"none"';
	
	mDiv.id='BulkRequestsDiv';
	var delay=this.GetClickDelay();
	if(delay==null) delay='';
	mDiv.innerHTML=
		"You will have to press reload here to see the changes afterwards.<br />"+
		"<input type='checkbox' id='BulkRequestsTest' />Test only(only highlights the buttons to be clicked)<br />"+
		"<select id='BulkRequestsNewTab'><option value='' selected>Normal Click</option><option value='hidden' >Hidden (fastest but may not work)</option></select> when clicking on something (Some applications need this to confirm that you've accepted)<br />"+
//		<option value='tab' >Open up a new tab</option>
//		<option value='iframe'>Open up in iframe (at the bottom of page)</option>
		"Only click <input size='3' id='BulkRequestsMaxClicks' /> buttons at a time, <input size='3' id='BulkRequestsDelay' value='"+delay+"' />secs inbetween each click.<br />"+
//		"Friend list: <input type='text' id='AcceptFriendList' /> (only for when you're accepting friends)<br />"+
//		"<input id='BulkClickByTextButton' type='button' value='Click all buttons with this text:' /> <input type='text' id='BulkClickByText' /> <br />"+
		"<div id='AutoAcceptStatus'></div>"+
		"<a href='javascript:;' onclick='"+toggleErrorDivJs+"'>Show messages</a><br /><div id='AutoAcceptError' style='display: none'></div>"
		;
/*
//		"<a id='nthButtonsToggle' style='font-size: 14pt' href='javascript:;'></a><br />"
	var nthButtonsToggle=nHtml.FindByXPath(mDiv,"//a[@id='nthButtonsToggle']");
	if(nthButtonsToggle) {
		var t=this;
		nthButtonsToggle.addEventListener('click',function() {
			var show=document.getElementById("nthConfirmDiv").style.display=='none'?true:false;
			t.SwitchConfirmDiv(nthButtonsToggle,show);
		},false);
	}
*/
	var t=this;
	mDiv.appendChild(document.createElement('br'));
	var blockAllApps=document.createElement('A');
	blockAllApps.innerHTML="Click on all 'Block application' links (becareful, facebook has no list of blocked applications)";
	blockAllApps.addEventListener('click',function() {
		FacebookInvites.SetBlockUpto({},0); 
		FacebookInvites.BlockAllApps();
	},false);
	mDiv.appendChild(blockAllApps);
	mDiv.appendChild(document.createElement('br'));
	mDiv.appendChild(document.createElement('br'));
	
	var lastClickedButtons=[];
	var clickLastClicked=document.createElement('A');
	clickLastClicked.innerHTML='Click the same buttons you clicked last time(all the green ones)';
	clickLastClicked.addEventListener('click',function() {
		t.ClickAutoAccepts(lastClickedButtons);
	},false);
	mDiv.appendChild(clickLastClicked);
	mDiv.appendChild(document.createElement('br'));
	mDiv.appendChild(document.createElement('br'));

	var nthDiv=document.createElement('div');
	nthDiv.id='nthConfirmDiv';
	nthDiv.style.display='none';
	var nthTable=document.createElement('table');
	nthDiv.appendChild(nthTable);
	
	var appsArr=[];
	for(var app in appTypes) {
		appsArr.push(app);
	}

	var lastClicked=this.GetLastClicked();
	appsArr=appsArr.sort();
	var nameDiv=document.createElement('div');
	nameDiv.id='nameConfirmDiv';
	
	var nameTable=document.createElement('table');
	nameDiv.appendChild(nameTable);
	var lastClickedColor='#0f0';
	

	for(var a=0; a<appsArr.length; a++) {
		var app=appsArr[a];
		var d=document.createElement('div');
		var appInfo=appTypes[app];
		if(appInfo.desc) { appDesc=appInfo.desc; }
		else { appDesc=app; }
		var appLink='<table border=0><tr><td>';
		if(appInfo.icon) {
			if(appInfo.icon[0]!="") {
				appLink+="<img src='"+appInfo.icon[0]+"' />";
			} else {
				appLink+="<i class='"+appInfo.icon[1]+"'></i>";
			}
		}
		
		appLink+="</td><td><a href='#"+appInfo.hash+"'>"+appDesc+"</a></td></tr></table>";
		var hash=appTypes[app].hash;
		var divId='ButtonApp_'+escape(app);

//		var lastClickedForAppStr=lastClicked[hash];
		var lastClickedForAppStr=lastClicked[app];
		var lastClickedForApp=null;
		var lastClickedOpenType='hidden';

		if(lastClickedForAppStr) {
			var lastClickedForAppInfo=lastClickedForAppStr.split('#');
			if(lastClickedForAppInfo.length==1) {
				lastClickedForApp=lastClickedForAppInfo[0];
			} else {
				lastClickedOpenType=lastClickedForAppInfo[0];
				lastClickedForApp=lastClickedForAppInfo[1];
			}
		}
		d.id=divId;
//		d.setAttribute('appHash',hash);
		d.setAttribute('appName',app);
		var buttons=buttonTypes[app];
		
		var buttonsAdded=0;
		if(buttons) {
			for(var button in buttons) {
				var count=buttons[button];
				//if(count<=1) { continue; }
				var inp=document.createElement('input');
				inp.type='button';
				inp.className='inputbutton BulkAddButton';
				inp.value=count+" x "+button;
	

				if(lastClickedForApp && button==lastClickedForApp) {
					inp.style.color=lastClickedColor;
					lastClickedButtons.push({'button':inp,'openType':lastClickedOpenType});
				}
				inp.addEventListener('click',function(e) {
					t.SaveLastClicked(e.target);
					t.ClickAutoAccept(e);
				},false);
				d.appendChild(inp);
				d.appendChild(document.createTextNode(' '));
				buttonsAdded++;
			}
		}

		var nthApp=document.createElement('DIV');
		nthApp.id=divId;
//		nthApp.setAttribute('appHash',hash);
		nthApp.setAttribute('appName',app);
		//nthApp.innerHTML=appDesc;
		var maxButton=maxButtons[app];
		for(var b=0; b<maxButton; b++) {
			var inp=document.createElement('input');
			inp.type='button';
			inp.className='inputbutton BulkAddButton';
			
			var suffix="th";
			var b10=b%10;
			if(b10==0) { suffix="st"; }
			else if(b10==1) { suffix="nd"; }
			else if(b10==2) { suffix="rd"; }
			inp.value=(b+1)+suffix+" button";
			if(lastClickedForApp && inp.value==lastClickedForApp) {
				inp.style.color=lastClickedColor;
				lastClickedButtons.push({'button':inp,'openType':lastClickedOpenType});
			}
			inp.addEventListener('click',function(e) {
				t.SaveLastClicked(e.target);
				t.ClickAutoAccept(e);
			},false);
			nthApp.appendChild(inp);
			nthApp.appendChild(document.createTextNode(' '));
		}
//		nthApp.appendChild(document.createElement('BR'));

		var nthRow=nthTable.insertRow(-1);
		var desccell=nthRow.insertCell(-1);
		desccell.innerHTML=appLink;
		desccell.style.width='200px';
		desccell.style.verticalAlign='top';
		nthRow.insertCell(-1).appendChild(nthApp);
		
		//nthDiv.appendChild(nthApp);

		if(buttonsAdded>0) {
			var nameRow=nameTable.insertRow(-1);
			var desccell=nameRow.insertCell(-1);
			desccell.style.width='200px';
			desccell.style.verticalAlign='top';
			desccell.innerHTML=appLink;
			nameRow.insertCell(-1).appendChild(d);
		}
	}
	mDiv.appendChild(nameDiv);
	mDiv.appendChild(nthDiv);


	
	event.parentNode.insertBefore(bulkReqToggle,event);
	event.parentNode.insertBefore(mDiv,event);

	
//	this.SwitchConfirmDiv(nthButtonsToggle,GM_getValue('showNthDiv',false));
/*	
	var BulkClickByTextButton=document.getElementById('BulkClickByTextButton');
	BulkClickByTextButton.addEventListener('click',function(e) {
		FacebookInvites.ClickAutoAccept(e);
	},false);
*/
},


// auto bulk add when we get to the profile page.
SetAutoBulkAdd:function(enabled) {
	GM_setValue('autoBulkAdd_Enabled',enabled);
	if(document.getElementById('bulkAddComment')) {
		GM_setValue('autoBulkAdd_Comment',document.getElementById('bulkAddComment').value);
		GM_setValue('autoBulkAdd_FriendList',document.getElementById('bulkAddFriendList').value);
		GM_setValue('autoBulkAdd_Test',document.getElementById('testBulkAddMeButton').checked);

	}
},

GetAutoBulkAdd:function() {
	var enabled=GM_getValue('autoBulkAdd_Enabled',false);
	if(enabled && document.getElementById('bulkAddComment')) {
		document.getElementById('bulkAddComment').value=GM_getValue('autoBulkAdd_Comment','');
		document.getElementById('bulkAddFriendList').value=GM_getValue('autoBulkAdd_FriendList','');
		document.getElementById('testBulkAddMeButton').checked=GM_getValue('autoBulkAdd_Test',false);
	}
	return enabled;
},






//////////////////////////

UncheckShowNews:function() {
	var chks = document.evaluate("/html[@id='facebook']/body//input[@value='news_feed']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i =0; i < chks.snapshotLength; i++) { chks.snapshotItem(i).checked=false;}
},

// click the "close" buttons 
ClickClose:function() {
/*
	var db=document.getElementById('dialog_buttons');
	if(!db) db=nHtml.FindByXPath(document,"//div[contains(@class,'dialog_buttons')]");
	if(!db) return;
*/
	var popDialogss=document.evaluate(".//div[contains(@id,'pop_content')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var s=0; s<popDialogss.snapshotLength; s++) {
		var pop_content=popDialogss.snapshotItem(s);
		
		var chks = document.evaluate(".//input",pop_content,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

		if(chks.snapshotLength==1) {
			// only one button
			var inp=chks.snapshotItem(0);
			if(inp.name=='close') {
				// only one button and it says "close"
				GM_log('Close button clicked');
				nHtml.Click(inp);
			}
		}
	}
},


profilePageAdd:false,
CheckPage:function() {
	var t=this;
	try{
		if(unsafeWindow.top && unsafeWindow.top.joinRecentLoadedLink!=undefined && unsafeWindow.joinRecentLoadedLink==undefined) {
			window.setTimeout(function() {
				if(unsafeWindow.top) {
					unsafeWindow.top.joinRecentLoadedLink();
				}
			},5000);
			return;
		}
	}catch(e) {
		//GM_log('no permission probably:'+e);
//		return;
	}

	var href=document.location.href+document.location.hash;
	var ok=false;
//	if(href.indexOf("/reqs.php")>=0) {
	if(href.indexOf("/games")>=0) {
		this.UncheckShowNews();
		t.AddAutoAccept();
	}
//	if(href.indexOf("/profile.php")>=0) {
	var profileStream=document.getElementById('profile_stream_container');
	var okToAddAsFriend=false;
	
	if(document.location.href.indexOf('/iframe/')<0) {
		if(document.getElementById('pagelet_header_personal') && !profileStream) {
			// we're not friends yet.
			this.AddMeLinkAnyPage();
			var addLink=nHtml.FindByXPath(document,".//a[contains(@href,'rel_dialog=1')]");

			if(this.GetAutoBulkAdd() && !this.profilePageAdd) {
				// auto add this person.
				this.profilePageAdd=true;
				if(addLink) {
					this.addMeUptoMax=1;
					this.StartBulkAddMe();
				}
				okToAddAsFriend=true;
			}
		} 

		if(!okToAddAsFriend && this.GetAutoBulkAdd()) {
			// we're currently friends, let's close
			this.CloseIFrameOnCompletion();
		}
	}

//	if(href.indexOf("/social_graph.php")>=0) { //change suggested by Lox Myth - see http://userscripts.org/topics/34630#posts-166598

	if(href.indexOf("friends_using_app")>=0) { 
		ok=this.AddFriendsWithApp();
	} else {
		this.AddMeLink();
		ok=this.InviteFriends();
	}
	this.AddAsFriendLinks();
	window.setTimeout(function() { FacebookInvites.CheckPage() },5000);
}


};

GM_registerMenuCommand('FB Invites - Show Bulk add friends dialog',function() {
	FacebookInvites.AddMeLinkAnyPage();
});

GM_registerMenuCommand('FB Invites - Add all the friends on this page',function() {
	var content=document.getElementById('content');
	if(!content) content=document.body;
	FacebookInvites.AddFriendsFromPage({'doc':content,'doNextPage':true});
});
GM_registerMenuCommand('FB Invites - Clear the current list of friends',function() {
	FacebookInvites.ClearFriendsBuffer();
});
GM_registerMenuCommand('FB Invites - Detach the block if it is not visible',function() {
	FacebookInvites.DetachDiv();
});

if(location.href.indexOf('facebook.com')<0) {
	GM_registerMenuCommand('FB Invites - Open all facebook friend links here in new tabs',function() {
		FacebookInvites.ClickAllFacebookFriendLinks();
	});
}
if(location.href.indexOf('apps.facebook.com') > 0) {
	GM_registerMenuCommand('FB Invites - Update friends using this application',function() {
		FacebookInvites.VisitFriendsList();
	});
}

window.addEventListener("load", function(e) {
	window.GetFacebookInvites = function() {
		return FacebookInvites;
	}
	FacebookInvites.CheckPage();
	FacebookInvites.BlockAllApps();
/*
	window.setTimeout(function() {
var uid="100000214449696";
		var a=document.createElement('script');
		// 29/nov/2009
		a.innerHTML="Dialog.bootstrap('http://www.facebook.com/ajax/profile/connect.php?profile_id="+
			uid+"&rel_dialog=1&src=top_bar&ondone_reload=0',null,false);";
		document.body.appendChild(a);
},2000);
*/
}, false);

// join recent friends.
// test nth block, block buttons.
// ==UserScript==
// @name           Facebook news feed collector
// @namespace      FacebookNews
// @description	   Searches your friends' news pages for whatever.
// @version_timestamp 1241425380392
// @include        http://www.facebook.com/*
// @require http://sizzlemctwizzle.com/updater.php?id=45296
// ==/UserScript==



//var SUC_script_num = 45296; // Change this to the number given to the script by userscripts.org (check the address bar)
//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }


if(!this.JSON){JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}})();

/////////////////////////////////////////////////


nHtml={
FindByXPath:function(obj,xpath) {
	var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
Click:function(obj) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
spaceTags:{
	'td':1,
	'br':1,
	'hr':1,
	'span':1,
	'table':1
},
GetText:function(obj) {
	var txt=' ';
	if(obj.tagName!=undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
		txt+=" ";
	}
	if(obj.nodeName=="#text") { return txt+obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child);
	}
	return txt;
}

};


/////////////////////////////////////////////////

var Facebook;
if(Facebook==undefined) { Facebook={}; }

/////////////////////////////////////////////////

var debug=false;

Facebook.Wait={
timerdom:null,
timerwait:null,
func:null,
lastFunc:0,
inCallFunc:false,

CallFunc:function() {
	if(this.inCallFunc) { return; }
	this.inCallFunc=true;
	var ajaxwait=1000;
/*
	var now=new Date().getTime();
	if((this.lastFunc+ajaxwait)>now) {
		// called just a short time ago.
		return;
	}
	this.lastFunc=now;
*/
	// wait for whatever ajax things to get loaded.
	window.setTimeout(function() {
//		GM_log('Facebook changed');
		Facebook.Wait.func();
		Facebook.Wait.inCallFunc=false;
	},ajaxwait);
	Facebook.Wait.Wait();
},

Wait:function(f) {
	if(f!=undefined) this.func=f;
	this.timerdom=null;
	this.timerwait=null;
	this.lastFunc=0;

	this.timerdom=document.addEventListener('DOMNodeInserted', function (event) {
		Facebook.Wait.timerdom=null;
//		if(event.target.id!=undefined && event.target.id.trim()!="") {
			Facebook.Wait.CallFunc();
//		}
	}, false);

	this.timerwait=window.setTimeout(function() {
		Facebook.Wait.timerwait=null;
		Facebook.Wait.CallFunc();
	},30000);
}
};

/////////////////////////////////////////////////

if(!GM_getValue) {
	GM_getValue=function(n,def) {
		if(localStorage[n]==undefined) {
			localStorage[n]=def;
			return def;
		}
		return localStorage[n];
	}
}
if(!GM_setValue) {
	GM_setValue=function(n,v) {
		localStorage[n]=v;
	}
}

/////////////////////////////////////////////////


Facebook.Users={
pageUpto:0,

GetUsers:function() {
	return JSON.parse(GM_getValue('FBUsers','{}'));
},
SetUsers:function(usersHash) {
	GM_setValue('FBUsers',JSON.stringify(usersHash));
},

GrabUsers:function(done,url) {
	if(url==undefined) { url='http://www.facebook.com/friends/?filter=afp'; }
	GM_setValue('FBUsersDoneFunc',done.toString());
	GM_setValue('FBUsersGrab',1);
	this.prevOnclick='';
	this.SetUsers({});
	var iframe=document.getElementById('GrabUsersFrame');
	if(!iframe) {
		iframe=document.createElement('iframe');
		iframe.id='GrabUsersFrame';
		iframe.width=700;
		iframe.height=400;
		//if(!debug) iframe.style.display='none';
	} else {
		iframe.src='about:blank';
	}
	iframe.src=url;
	document.body.appendChild(iframe);
},

/*
FindProfiles:function() {
	var uidr=new RegExp('id=([0-9]+)','i');
	var imgr=new RegExp('/q([0-9]+)_','i');
	var content=document.getElementById('content');
	var hrefs=content.getElementsByTagName('a');
	var currentUser={};
	var users=[];
	for(var h=0; h<hrefs.length; h++) {
		var href=hrefs[h];
//		if(href.href.indexOf('profile.php')>=0) {
		var uidm=uidr.exec(href.href);
		if(uidm && uidm.length>1) {
			currentUser.uid=uidm[1];
		}
		currentUser.href=href.href;
		currentUser.hrefObj=href;
		if(href.innerHTML.indexOf('<img')>=0) {
			var img=href.getElementsByTagName('img')[0];
			currentUser.img=img.src;
			if(currentUser.uid==undefined) {
				var imgm=imgr.exec(img.src);
				if(imgm && imgm.length>1) {
					currentUser.uid=imgm[1];
				}
			}
		} else if(href.className=='UIObjectListing_Title') {
			currentUser.name=href.innerHTML;
			currentUser.div=href.parentNode;
			var st=nHtml.FindByXPath(href.parentNode,".//span[contains(@class,'UIObjectListing_Subtext')]");
			if(st) { currentUser.subText=st.textContent; }

			if(currentUser.uid && currentUser.img) {
				users.push(currentUser);
			}
			currentUser={};
		}
	}
//	}
GM_log('profiles:'+users.length);
	return users;
},
*/


FindProfiles:function() {
	var uidr=new RegExp('profile.php.*id=([0-9]+)','i');
	var imgr=new RegExp('/q([0-9]+)_','i');
	var imgr2=new RegExp('/([0-9]+)_([0-9]+)_([0-9]+)_q','i');
	
	var content=document.getElementById('content');
	if(!content) return null;
	var hrefs=content.getElementsByTagName('a');
	var currentUser={};
	var users=[];
	for(var h=0; h<hrefs.length; h++) {
		var href=hrefs[h];
//		if(href.href.indexOf('profile.php')>=0) {
		var uidm=uidr.exec(href.href);
		if(uidm && uidm.length>1) {
			currentUser.uid=uidm[1];
		}
		currentUser.href=href.href;
		currentUser.hrefObj=href;
		if(href.innerHTML.indexOf('<img')>=0) {
			var img=href.getElementsByTagName('img')[0];
			currentUser.img=img.src;
			if(currentUser.uid==undefined) {
				var imgm=imgr.exec(img.src);
				if(!imgm) {
					imgm=imgr2.exec(img.src);
				}
				if(imgm && imgm.length>1) {
					currentUser.uid=imgm[2];
				}
			}
		//} else if(href.className=='UIObjectListing_Title') {
		} else if(href.parentNode.className=='fsl fwb fcb') {
			currentUser.name=href.innerHTML;
			currentUser.div=href.parentNode;
			var st=nHtml.FindByXPath(href.parentNode,".//div[contains(@class,'uiTextSubtitle')]");
			if(st) { currentUser.subText=st.textContent; }

			if(currentUser.uid && currentUser.img) {
				users.push(currentUser);
			}
			currentUser={};
		}
	}
//	}
	return users;
},

waitingCheckGrabUsers:null,
prevOnclick:'',
CheckGrabUsers:function() {
	var tograb=GM_getValue('FBUsersGrab',0);
	if(!tograb) {
		return;
	}

	if(location.href.indexOf('/friends/edit/')<0) {
	//if(!document.getElementById('editFriendListStatus')) {
		return false;
	}

	if(new RegExp('/friends/edit/$').exec(location.href)) {
		if(this.prevOnclick=='') {
			GM_log('Load all friends');
			unsafeWindow.FriendSearchPane.onAll(0, true);
		}
	}

	var users=this.GetUsers();
/*	
	var ss=document.evaluate("//a[@class='UIObjectListing_Title']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var useridRe=/id=([0-9]+)/i;
	for(var s=0; s<ss.snapshotLength; s++) {
		var obj=ss.snapshotItem(s);
		var m=useridRe.exec(obj.href);
		if(m) {
			users[m[1]]=1;
		}
	}
*/
	var profiles=this.FindProfiles();
	if(profiles==null) return false;
	for(var p=0; p<profiles.length; p++) {
		var profile=profiles[p];
		users[profile.uid]=1;
	}
	//GM_log('users grabbed:'+profiles.length+','+location.href);
	this.SetUsers(users);
	if(profiles.length==0) {
		Facebook.News.ReloadStatus('Problem with friends page, waiting');
		GM_log('Problem with friends page, waiting:'+location.href);
		var t=this;
		if(this.waitingCheckGrabUsers==null) {
			this.waitingCheckGrabUsers=window.setTimeout(function() {
				this.waitingCheckGrabUsers=null;
				t.CheckGrabUsers();
			},1000);
		}
		return false;
	}

	
	/*
	var paging=document.evaluate("//a[contains(@class,'UIPager_ButtonForward')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var next=paging.snapshotItem(paging.snapshotLength-1);
	var numberRe=/^[0-9]+$/;
	if(next && !numberRe.exec(next.innerHTML) && next.parentNode.className.indexOf('Disabled')<0) {
	*/

	var footer=document.getElementById('editFriendsDynamicFooter');
	var next=null;
	if(footer) {
		next=nHtml.FindByXPath(footer,".//a[@class='next']");
	}
	
	var friendsCount=0;
	for(var f in users) {
		friendsCount++;
	}
	
	if(next && next.getAttribute('onclick')!=null) {
		this.prevOnclick=next.getAttribute('onclick');

		GM_log('click next page:'+friendsCount);
		this.pageUpto++;
		Facebook.News.ReloadStatus('Loading page '+(this.pageUpto+1));
		//unsafeWindow.eval(next.getAttribute('onclick'));
		nHtml.Click(next);
	} else {
		// we're done.
		GM_setValue('FBUsersGrab',0);
		var doneFunc=GM_getValue('FBUsersDoneFunc','');
		eval(doneFunc+"("+friendsCount+")");
		GM_log('Grabbed users:'+friendsCount);
		//if(!debug) location.href='about:blank';
	}
	return true;
}


};

/////////////////////////////////////////////////

unsafeWindow.ReloadStatus=function(friendsCount) {
	var statusDiv=document.getElementById('NewsStatusDiv');
	if(statusDiv) {
		statusDiv.innerHTML=''+friendsCount+' friends to search.';
	}
}


Facebook.News={
showMoreDone:0,
GetNewsList:function() {
	return JSON.parse(GM_getValue('NewsList','{}'))
},
SetNewsList:function(usersHash) {
	GM_setValue('NewsList',JSON.stringify(usersHash));
},

GrabUsersClick:function(e) {
	var statusDiv=document.getElementById('NewsStatusDiv');
	if(statusDiv) {
		statusDiv.innerHTML='<blink>Loading...</blink>';
	}

	var flid=e.target.id.substring(9);
	var recentlyUpdated=false;
//document.getElementById('NewsRecentlyUpdated').checked;
	GM_setValue('recentlyUpdated',recentlyUpdated);
	GM_setValue('flid',flid);
	this.GrabUsersFlid(flid,recentlyUpdated);
},
GrabUsersFlid:function(flid,recentlyUpdated) {
//http://www.facebook.com/friends/?filter=afp
//http://www.facebook.com/friends/?filter=flp_1107641538358

//	var url="http://www.facebook.com/friends/?flid="+flid+"&view="+(recentlyUpdated?"recent":"everyone")+"&q=&nt=0&nk=0&s=0&st=0";
	var url='http://www.facebook.com/friends/?filter=flp_'+flid;
	if(flid==0) {
		url='http://www.facebook.com/friends/?filter=afp';
	}

	Facebook.Users.GrabUsers('Facebook.News.ReloadStatus',url);
},
AddNewsLinks:function() {
	var d=document.getElementById('AddNewsDiv');
	if(d) {
		return;
	}
	//var orderMsg=document.getElementById('navigation_item_media');
	var orderMsg=document.getElementById('navItem_ff');
	

//	var orderMsg=nHtml.FindByXPath(document,"//div[contains(@class,'UIMutableFilterList_Footer')]");

/*
	var orderMsg=nHtml.FindByXPath(document,"//div[contains(@class,'UIFilterList_List')]");

	if(!orderMsg) {
		orderMsg=nHtml.FindByXPath(document,"//div[contains(@class,'UIMutableFilterList_OrderMsg')]");
	} else {
		orderMsg=orderMsg.parentNode;
	}
*/

	if(!orderMsg) { return; }
	orderMsg=orderMsg.parentNode;
	var recentlyUpdated=GM_getValue('recentlyUpdated',false);
	d=document.createElement('div');
	d.id='AddNewsDiv';
	d.innerHTML="<div id='NewsStatusDiv'></div><b>1.</b> Pick friends list to use...<br />";

	var filterlist=document.getElementById('navItem_ff');
	if(!filterlist) return;
	var friendLists=document.evaluate(".//li[contains(@class,'key-fl_')]",filterlist,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	if(!friendLists.snapshotLength) return;

	var flidRe=new RegExp('_([0-9]+)','i');
	for(var flist=0; flist<friendLists.snapshotLength; flist++) {
		var fl=friendLists.snapshotItem(flist);

		var a=document.createElement('a');
		var listName=fl.childNodes[0].childNodes[0].textContent;
		a.innerHTML=listName;
		a.href='javascript:';
		var oncl=fl.className;
		//getAttribute('onclick');
		var flm=flidRe.exec(oncl);
		if(!flm) { GM_log('Could not find flid:'+oncl); continue; }
		a.id='Newsflid_'+flm[1];
		a.addEventListener('click',function(e) {
			Facebook.News.GrabUsersClick(e);
		},false);
		d.appendChild(a);
		d.appendChild(document.createElement('br'));
	}

	var friendsCount=0;
	var friends=Facebook.Users.GetUsers();
	for(var f in friends) {
		friendsCount++;
	}
	var refreshUsersLink=document.createElement('a');
	refreshUsersLink.innerHTML='All Friends';
	refreshUsersLink.id='Newsflid_0';
	refreshUsersLink.addEventListener('click',function(e) {
		Facebook.News.GrabUsersClick(e);
	},false);
	d.appendChild(refreshUsersLink);
	d.appendChild(document.createElement('br'));
	d.appendChild(document.createElement('br'));


	var box=document.createElement('div');
//	box.innerHTML="<input type='checkbox' id='NewsRecentlyUpdated' "+(recentlyUpdated?"checked":"")+" title='Get friends from the recently updated tab in facebook, this does not include all the friends who have done something recently. It is up to facebook what goes here.' />'Recently updated' friends tab only, people who have done things today may not be on this list.<br />";
	d.appendChild(box);

	d.appendChild(document.createElement('hr'));

	var grabNewsAsk=document.createElement('div');
	grabNewsAsk.style.position='fixed';
	grabNewsAsk.style.zIndex=100;
	grabNewsAsk.style.left=0;
	grabNewsAsk.style.top=0;
	grabNewsAsk.style.backgroundColor='#fff';
	grabNewsAsk.style.border='2px solid #888';
	grabNewsAsk.style.display='none';
	var NewsRegex=GM_getValue('NewsRegex','joined');
	grabNewsAsk.innerHTML="<form><br /><br />Search for(regexp):<br />"+
		"<textarea id='grabNewsRegex' cols='70' rows='2'>"+NewsRegex+"</textarea>"+
		"<br /><br />Number of times to click 'Show older posts' link for each user:"+
		"<input id='showMoreNeeded' size='2' value='"+GM_getValue('showMoreNeeded',0)+"' /><br />"+
		"<input id='grabNewsButton' type='button' value='Collect News' /> "+
		"or <input id='grabInfoButton' type='button' value='Collect Info' /><br />"+
		"Examples... (Use | to separate phrases)<br /><br />joined the group|are now friends<br />invite<br />commented on<br /></form>";
	document.body.appendChild(grabNewsAsk);


	var grabNewsLink=document.createElement('a');
	grabNewsLink.innerHTML='<b>2.</b> <span id="startStopNewsCollect">Start</span> grabbing News from friends';
	grabNewsLink.addEventListener('click',function() {
		var startStopNewsCollect=document.getElementById('startStopNewsCollect');
		var newsUpto=GM_getValue('NewsUserUpto',-1);
		if(newsUpto>0) {
			startStopNewsCollect.innerHTML='Start';
			// we're currently running, let's stop.
			grabNewsAsk.style.display='none';
		} else {
			startStopNewsCollect.innerHTML='Stop';
			grabNewsAsk.style.display=grabNewsAsk.style.display=='none'?'block':'none';
		}
		GM_setValue('NewsUserUpto',-1);
	},false);
	d.appendChild(grabNewsLink);
	orderMsg.appendChild(d);

	this.ReloadStatus(friendsCount);

	var grabNewsButton=document.getElementById('grabNewsButton');
	var grabInfosButton=document.getElementById('grabInfoButton');

	grabNewsButton.addEventListener('click',function() {
		grabNewsAsk.style.display='none';
		var rObj=document.getElementById('grabNewsRegex');
		GM_setValue('NewsRegex',rObj.value);
		GM_setValue('showMoreNeeded',document.getElementById('showMoreNeeded').value);
		GM_setValue('friendInfo',false);
		Facebook.News.StartLoadUserNews();
	},false);
	grabInfosButton.addEventListener('click',function() {
		grabNewsAsk.style.display='none';
		GM_setValue('friendInfo',true);
		Facebook.News.StartLoadUserNews();
	},false);

	unsafeWindow.FindNewsDiv=function() {
		var r=document.evaluate("//div[@class='UIIntentionalStream UIStream']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(r && r.singleNodeValue) {
			return r.singleNodeValue;
		}
		return null;
	};

	if(friendsCount==0) {
		var lastflid=GM_getValue('flid',0);
		this.GrabUsersFlid(lastflid,recentlyUpdated);
	}
//	Facebook.Users.GrabUsers('Facebook.News.ReloadStatus');
},

NextLoadUserNews:function() {
	var frameNameInfo=self.name.split('_');
	this.LoadUserNews(parseInt(frameNameInfo[1]));
},
StartLoadUserNews:function() {
	// go thru each users' news
	GM_setValue('NewsUserUpto',0);
	if(this.IsFriendInfo()) {
		this.StartInfoTable();
	}
	this.totalSecs=0;
	for(var frameUpto=0; frameUpto<3; frameUpto++) {
		this.LoadUserNews(frameUpto);
	}
},
GetNonBlankIFrames:function() {
	var nonBlank=0;
	for(var frameUpto=0; frameUpto<3; frameUpto++) {
		var frameName='NewsIFrame_'+frameUpto;
		var newsIFrame=unsafeWindow.top.document.getElementById(frameName);
		if(!newsIFrame) continue;
		if(newsIFrame.src!='about:blank') { nonBlank++; }
	}
	return nonBlank;
},


LoadUserNews:function(frameUpto) {
	var frameName='NewsIFrame_'+frameUpto;
	var newsIFrame=unsafeWindow.top.document.getElementById(frameName);

	if(newsIFrame) {
		newsIFrame.src='about:blank';
	}
	var userUpto=GM_getValue('NewsUserUpto',-1);
	if(userUpto<0) { 
		return;
	}
	GM_setValue('NewsUserUpto',userUpto+1);
	var users=Facebook.Users.GetUsers();
	var usersArr=[];
	for(var user in users) {
		usersArr.push(user);
	}

	if(userUpto>=usersArr.length) {
		GM_setValue('NewsUserUpto',-1);
		// no more users
		GM_log('no more news to look up');
		return;
	}

	var currentUser=usersArr[userUpto];

	if(!newsIFrame) {
		newsIFrame=document.createElement('iframe');
		newsIFrame.id=frameName;
		newsIFrame.name=frameName;
		newsIFrame.width=700;
		newsIFrame.height=400;
		//if(!debug) newsIFrame.style.display='none';
		unsafeWindow.top.document.body.appendChild(newsIFrame);
	}
	GM_log('grabbing news for:'+currentUser+"("+userUpto+"), from:"+document.title+", frame:"+frameUpto);
	if(this.IsFriendInfo()) {
		newsIFrame.src="http://www.facebook.com/profile.php?id="+currentUser+"&v=info";
	} else {
		newsIFrame.src="http://www.facebook.com/profile.php?id="+currentUser+"&ref=nf&v=wall";
	}

	window.doneNewsPage=true;
},


////////////////////////////////////////



TableToClipboard:function(table) {
	var txt='';
	for(var r=0; r<table.rows.length; r++) {
		var row=table.rows[r];
		var rowTxt='';
		for(var c=0; c<row.cells.length; c++) {
			var html=nHtml.GetText(row.cells[c]).replace(/[\t\n\r]/g,' ');
			rowTxt+=html+"\t";
		}
		txt+=rowTxt+"\n";
	}

	var ta=document.getElementById('fbcoll_textarea');
	ta.innerHTML=txt;
	alert("Firefox won't let scripts copy things into the clipboard.\nPress OK then ctrl-c to copy.\nThen paste it into a spreadsheet.");
	ta.focus();
	ta.select();
},


GetInfoTableDiv:function() {
	return document.getElementById('fbcoll_infoTable');
},
StartInfoTable:function() {
	this.SetInfoTable({});
	var infoTableDiv=this.GetInfoTableDiv();
	if(!infoTableDiv) {
		infoTableDiv=document.createElement('table');
		infoTableDiv.id='fbcoll_infoTable';
		infoTableDiv.border='1';
		infoTableDiv.cellspacing='0';

		document.body.insertBefore(document.createElement('BR'),document.body.childNodes[0]);
		document.body.insertBefore(document.createElement('BR'),document.body.childNodes[0]);
		document.body.insertBefore(infoTableDiv,document.body.childNodes[0]);

		var ta=document.createElement('textarea');
		ta.id='fbcoll_textarea';
		ta.style.width=10;
		document.body.appendChild(ta);
		
		var copyA=document.createElement('a');
		copyA.innerHTML='Copy info table to clipboard';
		copyA.addEventListener('click',function() {
			Facebook.News.TableToClipboard(infoTableDiv);
		},false);
		document.body.insertBefore(document.createElement('BR'),document.body.childNodes[0]);

		document.body.insertBefore(document.createTextNode(" (The best way is to select the html table and copy and paste, but some spreadsheets may not format the data properly)"),document.body.childNodes[0]);
		document.body.insertBefore(copyA,document.body.childNodes[0]);
		document.body.insertBefore(document.createElement('BR'),document.body.childNodes[0]);
		document.body.insertBefore(document.createElement('BR'),document.body.childNodes[0]);
	}
	if(this.refreshInfoTableTimer!=null) {
		window.clearTimeout(this.refreshInfoTableTimer);
	}
	this.RefreshInfoTable();
},

refreshInfoTableTimer:null,
RefreshInfoTable:function() {
	var infoTableDiv=this.GetInfoTableDiv();

	if(!infoTableDiv) {
		return false;
	}
	var infoTable=this.GetInfoTable();

	var allRows=infoTable['_all'];
	if((infoTableDiv.rows.length-1)==allRows) {
		return;
	}
	while(infoTableDiv.rows.length) {
		infoTableDiv.deleteRow(0);
	}


	var columns=[];
	var headerRow=infoTableDiv.insertRow(-1);
	for(var n in infoTable) {
		if(n=="_all") { continue; }
		columns.push(n);
	}
	columns.sort();
	for(var c=0; c<columns.length; c++) {
		var cell=headerRow.insertCell(-1);
		var colTxt=columns[c].replace(/:$/,'');
		cell.innerHTML=colTxt;
	}


	if(allRows) {
		for(var r=0; r<allRows.length; r++) {
			var rowName=allRows[r];
			var tableRow=infoTableDiv.insertRow(-1);
			for(var c=0; c<columns.length; c++) {
				var colName=columns[c];
				var cell=tableRow.insertCell(-1);
				var colVal=infoTable[colName][rowName];
				if(colVal!=undefined) {
					cell.innerHTML=colVal;
				} else {
					cell.innerHTML='&nbsp;';
				}
			}
		}
	}

	var t=this;
	var userUpto=GM_getValue('NewsUserUpto',-1);
	var nonBlankIFrames=this.GetNonBlankIFrames();
	if(userUpto<0 && nonBlankIFrames==0) {
		return; 
	}
	this.refreshInfoTableTimer=window.setTimeout(function() {
		t.RefreshInfoTable();
	},5000);
	return true;
},

IsFriendInfo:function() {
	return GM_getValue('friendInfo',false);
},

GetInfoTable:function() {
	return JSON.parse(GM_getValue('InfoTable','{}'))
},
SetInfoTable:function(usersHash) {
	GM_setValue('InfoTable',JSON.stringify(usersHash));
},

CheckInfoPage:function() {
	if(!this.IsFriendInfo()) {
		return false;
	}
	if(window.doneNewsPage) { return; }

	var info_tab=document.getElementById('basic_info_summary_box');
	if(!info_tab) { return false; }
	var useridRe=/id=([0-9]+)/i;
	var m=useridRe.exec(location.href);
	if(!m) { 
		var topbar=document.getElementById('profile_top_bar');
		var ok=false;
		if(topbar) {
			var as=topbar.getElementsByTagName('a');
			if(as.length>0) {
				m=useridRe.exec(as[0].href);
				if(m) ok=true;
			}
		}
		if(!ok)
			return false; 
	}
	var uid=m[1];
	var dts=info_tab.getElementsByTagName('DT');
	var infoTable=this.GetInfoTable();
	if(!infoTable['_all']) { infoTable['_all']=[]; }
	infoTable['_all'].push(uid);
	if(!infoTable['uid']) { infoTable['uid']={}; }
	if(!infoTable['name']) { infoTable['name']={}; }
	infoTable['name'][uid]=document.getElementById('profile_name').innerHTML;
	infoTable['uid'][uid]=uid;

	for(var dtUpto=0; dtUpto<dts.length; dtUpto++) {
		var dt=dts[dtUpto];
		var dd=dt.nextSibling;
		while(dd && dd.tagName!="DD") {
			dd=dd.nextSibling;
		}
		if(!dd) { continue; }
		var n=dt.innerHTML.trim();
		if(n=="") { continue; }
		var imgs=dd.getElementsByTagName('img');
		if(imgs.length>3) { 
			// skip application junk with too many images
			continue;
		}
		if(!infoTable[n]) { infoTable[n]={}; }
		infoTable[n][uid]=dd.innerHTML;
	}
	this.SetInfoTable(infoTable);
	window.doneNewsPage=true;
	this.NextLoadUserNews();
	return true;
},



//////////////////////////////////////////////////


CheckNewsPage:function() {
	if(this.IsFriendInfo()) { return; }
	if(window.doneNewsPage) { return; }
	
	var selectedTabNotWall=nHtml.FindByXPath(document,"//li[contains(@class,'selected') and @view!='wall']");
	if(selectedTabNotWall) {
		GM_log("This user doesn't have a wall: "+document.location.href);
		this.NextLoadUserNews();
		return true;
	}
	
	var filters=document.getElementById('profile_stream_filters');
	if(!filters)
		filters=document.getElementById('home_stream');
	if(!filters) { return false; }

	var showMoreNeeded=GM_getValue('showMoreNeeded',0);
	if(this.showMoreDone<showMoreNeeded) {
		var showMore=nHtml.FindByXPath(document,"//a[contains(@onclick,'showMore')]");
		if(showMore) {
			GM_log('click show more');
			nHtml.Click(showMore);
			this.showMoreDone++;
			return false;
		}
	}

	if(unsafeWindow.top.FindNewsDiv==undefined) { return; }
	var newsSearch=GM_getValue('NewsRegex','bought');
	var newsDiv=unsafeWindow.top.FindNewsDiv();
	
//	var newsDiv=nHtml.FindByXPath(unsafeWindow.document,"//div[@class='UIIntentionalStream UIStream']");
	if(!newsDiv) {
		GM_log('Cannot find news div in main screen');
		return false;
	}
	window.doneNewsPage=true;
	var newsSearchRe=new RegExp(newsSearch,'i');
	var divStoryRe=new RegExp("^div_story_[0-9_]+$","i");
	var stories=document.evaluate("//div[contains(@id,'div_story_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var tempDiv=document.createElement('div');
	var lastTimeSpan='';
	var lastTimeSpanPrinted=true;
	var divs=[];
	for(var s=stories.snapshotLength-1; s>=0; s--) {
		var story=stories.snapshotItem(s);
		var m=divStoryRe.exec(story.id);
		if(!m) { continue; }
		var timeSpan=document.evaluate(".//span[contains(@class,'UIIntentionalStory_Time')]",story,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(timeSpan && timeSpan.singleNodeValue) {
			var timeSpanValue=timeSpan.singleNodeValue.innerHTML;
			if(lastTimeSpan!=timeSpanValue) {
				lastTimeSpan=timeSpanValue;
				lastTimeSpanPrinted=false;
			}
		}

		var txt=story.textContent;
		var newsm=newsSearchRe.exec(txt);
		if(!newsm || newsm.length<=0) { continue; }
		tempDiv.innerHTML='';
		tempDiv.appendChild(story);

		var d=unsafeWindow.top.document.createElement('div');
//		d.className=story.className;
		var html=tempDiv.innerHTML;
		if(!lastTimeSpanPrinted) {
			lastTimeSpanPrinted=true;
			html+="<span class='UIIntentionalStory_Time'>"+lastTimeSpan+"</span>";
		}
		d.innerHTML=html;
		divs.push(d);
	}
	for(var dUpto=0; dUpto<divs.length; dUpto++) {
		newsDiv.insertBefore(divs[dUpto],newsDiv.childNodes[0]);
	}
	var pn=document.getElementById('profile_name');
	if(pn) {
		var titleDiv=unsafeWindow.top.document.createElement('div');
		titleDiv.innerHTML="<span class='UIIntentionalStory_Names'><a href='"+location.href+"'>"+pn.innerHTML+"</a></span>";
		newsDiv.insertBefore(titleDiv,newsDiv.childNodes[0]);
	}

//if(userUpto>=2) GM_setValue('NewsUserUpto',-1);
	this.NextLoadUserNews();
	return true;
},
ReloadStatus:function(friendsCount) {
	unsafeWindow.top.ReloadStatus(friendsCount);
}

};



/////////////////////////////////////////////////

Facebook.News.CheckNewsPage();

function CheckAll() {
	Facebook.News.CheckNewsPage();
//	if(document.getElementById('home_filter_list')) {
	if(document.getElementById('navItem_ff')) {
		Facebook.News.AddNewsLinks();
	}
//GM_log('checkall');
	window.setTimeout(function() {
		Facebook.News.CheckInfoPage();
		if(Facebook.Users.CheckGrabUsers()) {
		}
	},1000);
}

window.addEventListener("load", function(e) {
	CheckAll();
	Facebook.Wait.Wait(function() {
		CheckAll();
	});
}, false);




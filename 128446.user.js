// ==UserScript==
// @name           FacebookDeleteFriends
// @namespace      FacebookDeleteFriends
// @include        *://www.facebook.com/*
// @exclude        *://www.facebook.com/ai.php*
// @version		20120316
// ==/UserScript==


// @version_timestamp        1256731017321
// @require http://sizzlemctwizzle.com/updater.php?id=43404


// To display: FriendListFlyoutController.show(document.getElementById('u....'  ));
//     Use the id= of the "<a href" tag
// To get lists friends are on: var d='...'; new AsyncRequest().setURI("/ajax/friends/status.php").setData({friend: d}).setHandler(function(g) {              var f = g.getPayload();	alert(JSON.stringify(f));}).send();


// not working @require        http:///updater.usotools.co.cc/43404.js


//var SUC_script_num = 128446; // Change this to the number given to the script by userscripts.org (check the address bar)
//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var FacebookDeletes={
users:null,



FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		if(GM_log)
		{
			GM_log('bad xpath:'+xpath);
		}
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
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
FindParentId:function(id,obj) {
	while(obj && obj.tagName!="BODY") {
		if(obj.id==id) { return obj; }
		obj=obj.parentNode;
	}
	return null;
},

/*
Click:function(obj) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
*/
FindProfiles:function() {
//	var uidr=new RegExp('profile.php.*id=([0-9]+)','i');
	var uidr2=new RegExp('user.php.*id=([0-9]+)','i');
	var imgr=new RegExp('/q([0-9]+)_','i');
	var imgr2=new RegExp('/([0-9]+)_([0-9]+)_([0-9]+)_q','i');
	
	var content=document.getElementById('content');
	var hrefs=content.getElementsByTagName('a');
	var currentUser={};
	var users=[];


	for(var h=0; h<hrefs.length; h++) {
		var href=hrefs[h];
//		console.log(href.href);		
		var p = this.FindParentId("profileBrowserGrid",href);
		if(p != null) continue;
		
//		if(href.href.indexOf('profile.php')>=0) {
//		var uidm=uidr.exec(href.href);
//		if(uidm && uidm.length>1) {
//			currentUser.uid=uidm[1];
//		}
		var data = href.getAttribute('data-hovercard');
		if(data) {
			var uidm2=uidr2.exec(data);
			if(uidm2 && uidm2.length>1) {
				currentUser.uid=uidm2[1];
			}		
		}
//		var uid=href.getAttribute('data-profileid');
//		if(uid) {
//			currentUser.uid=uid;
//		}
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
//			var st=this.FindByXPath(href.parentNode,".//div[contains(@class,'uiTextSubtitle')]");
			var st=this.FindByXPath(href.parentNode,".//div[contains(@class,'fsm fwm fcg')]");
			if(st) { currentUser.subText=st.textContent; }

			if(currentUser.uid && currentUser.img) {
//GM_log('user:'+unsafeWindow.JSON.stringify(currentUser));			
				users.push(currentUser);
			}
			currentUser={};
		}
	}
//	}
	return users;
},
ChooseUsersTimer:function() {
	var millis=this.ChooseUsers();
	window.setTimeout(function() {
		FacebookDeletes.ChooseUsersTimer();
	},millis);
},

SetMessage:function(mess) {
	var d=document.getElementById('FacebookDeletesMessage');
	if(d) d.innerHTML=mess;
},

ChooseUsers:function() {
//	var obj=document.getElementById('friends_page_title');

	var obj=document.getElementById('pagelet_friends');
	if(!obj) {
		obj=document.getElementById('pagelet_friends_tab');
	}
/*
	if(!obj) {
		obj=document.getElementById('mainContainer');
	}
*/
	if(!obj) {
		return 2000;
	}
	
	var users=this.FindProfiles();
	if(users.length<=0) {
		// facebook maybe on another page.
		return 5000;
	}

	var cnt=0;
  
	var hasnodelete=this.FindByXPath(document,"//input[@className='nodelete']");
	if(!hasnodelete) {
		for(var u=0; u<users.length; u++) {
			var user=users[u];

			var inp=this.FindByXPath(user.div,".//input[@class='nodelete']");
			if(inp) { continue; }
			inp=document.createElement('input');
			inp.type='checkbox';
			inp.className='nodelete';
			inp.title="Tick to skip deleting this user.";
			inp.id='nodelete_'+user.uid;
			user.div.insertBefore(inp,user.div.childNodes[0]);
			cnt++;
		}
		if(cnt>0) {
			this.SkipSubText();
		}
	}

	var upButton 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJCA4HNrskg40AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACcElEQVRIx7WWTUgbQRiG351NUhPIIpRVgkYTqdQmkNKAlQq5CF17qpQeG3r1GHrroRcxh94aCoW9eQwEiiAFDQV%2FEBuIMVrsppBgiTE2asSmS9j82GR6qBajaX5s8t5mvmGeeef7%2BGYYXFDXwOgCxw9atVy3gZZOWTQlhjKsqpyTD1NyOiYdffv06G8EAPj%2B%2B8O6zp7VXsv4DbRIyYi%2FoGT2Hend4DoBgDOABi1Ur2Vco%2BvsWQUAtmtgdMF87%2Bntc1e19KuoYHN%2BGl2mERBWXff%2BOP6WqqCcPCAcP2ht9HRb825IWwFszbsbdsTxg1ai5boNjSzeCXkxN%2BuFyWTC3KwXOyFvQxAt120gjVRR5uArJsaGIAgCCCEQBAETY0NIx4N1IbR0ypJ6i%2FLZY%2FyMvYcoihXzoihCl9tEPntcF1QTQmkZ0pIHiUQClNJLMYpweAPSkgeUlq8PiQZmsLbi%2F1MqTGXxnY%2FXVvyIBmauB0nHg5h0CrDb7VcAF0F2ux2vXjxDKrrcHCSfPYYutwm3u7FSdblc6NMfoKCcVI2rqiQC0pIHinwESuk%2FXVzW4uIibvIGWISp%2Bk6%2BLL9FNBKumod62lgPYPvj69qQVHQZUy8nYTQamwYwDAOz2Yx3b6aR2P5QHVJQTtCnP4DL5fqvxuh0OjEy1IHsj72rOfkeEpHci7ekA%2Ft8PthsNhQ7nldCNPww%2Bm2PW9bqabkXeo22EtJz5yHaJcKw6hLaKIZVl0hOPky1E5KTD1NETsekdkLkdExiAKD%2F7pP82RvPtHB%2Fmoz4i7ufZzsIACiZfUcy4i%2B20kEy4i8qmX0HLp%2B8Xf%2Bu34oZ9vy9FGHQAAAAAElFTkSuQmCC';
	var downButton  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJCA4HG%2F773%2FgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACeUlEQVRIx7VWTUgbURD%2B3ltN3CDbVFw1VaM1TUpdtRp%2FIFpRF0oqFosIQo7eFgqtvfWQ0ksPvZUcvafn4s1swYtQaIVAD6aCUKNJEBsossJGo8nrxQTjX7J1%2FW5vZna%2FmffNMI%2FgDBo6hpcF0S3xQqOD5Y45GAJhhKvKZ7S9XS29uf7n97dnRQ8AiG1DgzZ782pLp98Kk5CMRY70%2FdRoevvHGgWAUwILTERLp99iszevAgDX0DG8fL9v9mGhKhNBBPFB1ZH%2B10cF0S3hFiGIbonyQqPjNkl4odFBjXeRMbDcMVdVOKR%2BfUXu5Mi8n%2BdP0No1BQAokmTTa0gm4iDk5vozxtDT04OTbAYAQAuOewMKZFk2pYq5uTlwLS9g4YVSEqutDjsHTQiFQjciCIfD%2BL5xiNq7rUUbPRvg8Izj%2FcdFJBIJMMYMX9HW1hZevnkHZ%2FfzEh89H9w1%2FgqeTm%2FxQyPoH%2FSh%2B%2BnbC3Z6cU4JpIkFeL39hppAlmW4nry%2B1EcvM9bU1kPn%2BxAMBisiCIVC2DlogtVWVzkJAIjtQ1gMq4hGo1deG2MM0WgUHz59hsMzfmUS9LoMPb55jIz5L9WncB4Z88Pjm7%2B20mtJCKGQJhbgdDov6EMIgdfbD2liAYTQ%2Fycp6HPHPQtFUUrsiqJA5%2FtQU1tfVjNKuOpcuSB70yMsrWxAVVXk83moqoqllQ2I7UPllwpXnaMZbW%2B3kg5yDQQwPRNAPB7H9EwAroFARZ2X0fZ2qZbeXK90Fnong5B6feidDFY8P1p6c50AQNvjmcPTHW%2FmCmbJWCS7%2FfNLDQUAfT81moxFsmYuq2QsktX3U6M4n%2Fltvbv%2BAcfN2ElnT1E8AAAAAElFTkSuQmCC';

	//GM_log('refresh users');
	var div=document.getElementById('ChooseUsers');
	if(div) { return 5000; }
	div=document.createElement('div');
	//div.setAttribute('style','border:solid 5px black');
	var theLists = this.FindFriendLists();
	if(theLists==null) { return 1000; }
	
	selectNode = '<select size="9" multiple="yes" id="All_Friends_List_Listbox">';
	var saveSelectedList = {};
	if(GM_getValue && JSON)
	{
		var lists ={};
		lists = GM_getValue("selectedLists");
		if(lists != null)
		{
			saveSelectedList = JSON.parse(lists);
		}
		
	}
	
	for (var a=0; a<theLists.length;a++)
	{
		var i=theLists[a];
		var name=i[1];
		var num=i[0];
		if(saveSelectedList != null && saveSelectedList[name] == 1)
		{
			selectNode += '<option selected="selected" value="'+num+'">' + name + '</option><br>\n';
		}
		else
		{
			selectNode += '<option value="'+num+'">' + name + '</option><br>\n';
		}
	}
	selectNode +='</select>';
	
	
	div.id='ChooseUsers';
	div.style.left=20;
	div.style.top=20;
	div.style.padding='10px';
	div.style.display='block';
	div.style.backgroundColor='#fff';
	//div.style.border='2px solid #444';
//<a href="javascript:;" id="fbdelete_reload">Reload friend list</a><br /><br />
	var html= '<div>' +
		//'<span title="Click to Open"  style="border:ridge 3px grey;cursor: pointer;color:red;width:1em;font-weight:900;font-size:1.8em;background-color:grey" id="arrow_open"></span>' +
		//'<span title="Click to Close" style="border:ridge 3px grey;cursor: pointer;display:none;color:red;width:1em;font-weight:900;font-size:1.8em;background-color:grey" id="arrow_close"></span>' +
		
		'<span title="Click to Open"><img  style="width:15px;height:15px;" src=' + downButton + ' id="arrow_open"></img></span>' +
		'<span title="Click to Close"><img style="width:15px;height:15px;display:none"src=' + upButton + '  id="arrow_close"></img></span>' +
		
		'<b style="padding-left:5px;font-size:1.4em;" title="Facebook Delete Friends.  Click the arrow left to open or close.">Facebook Delete Friends:</b></div>' +
		'<div style="padding:20px; display:none" id="friends_delete_widgets_container">' +
		'<span style="font-size:1.2em;font-weight:bold;color:red;"> Warning, you are about to remove your friends on this page only.<br />If you are not sure click the "highlight only" button to test it out first.<br />'+
		'IMPORTANT: go to the very bottom of the page so that all your friends are on the page or else it will not go through all your friends.</span><br />'+
                                '<span style="font-size:1.2em;font-weight:bold;color:black;"> ADD ME : fb.com/LoL.xDxDxD</span><br />'+
//		'<input type="checkbox" id="BulkDeleteNextPages" />Delete all friends in the next pages too.<br />'+
		'Delete a maximum of <input size="3" id="BulkDeleteMax" /> friends.<br />'+
		//'Skip friends with this note: <input type="text" id="BulkDeleteSkipSubText" value="" title="Pending, etc." /> (used for skipping pending friends, friends in certain groups, etc.)<br />'+
		//selectNode +
		'<table style="" >' +
		'<tr style="width:20%"><td>Skip friends with this note:</td>' +
		'<td><input type="text" id="BulkDeleteSkipSubText" value="" title="Pending, etc." /></td>'+
		'<td>(used for skipping pending friends<br>, friends in certain groups, etc.)</tr>'+
		'<tr><td style="padding:5px; text-align:center;color:red;font-weight:bold"> --OR-- </td><td colspan="2">&nbsp;</td></tr>' +
		
		
		'<tr style="width:20%;"><td><select id="BulkDeleteSkipInclude"><option value="skip">Do not delete</option><option value="noskip">Only delete</option></select> friends in these lists:</td><td colspan="2">' + selectNode + '</td>'+ 
		
		
		'<tr><td><input style="width:100%;background:red;" type="submit" value="Highlight Only" title="For testing" id="BulkToggle" /></td>'+
		'<td><input  style="width:100%;" type="submit" value="Unselect/Select All" id="ToggleAll" /></td>'+
		//'<br /><br />'+
		'<td><input  style="width:100%;font-weight:900;" type="submit" value="Delete all EXCEPT selected" title="Be careful, there is no undo button!" id="BulkDelete" /></td>'+
		'</tr></table>'+ 
		'<div id="FacebookDeletesMessage"></div>'+
		'</div>';
		
	div.innerHTML=html;
	obj.parentNode.insertBefore(div,obj);

	var upClickArrow = document.getElementById('arrow_close');
	upClickArrow.addEventListener('click',function() { FacebookDeletes.CloseContainerDiv(); },false);
	var downClickArrow = document.getElementById('arrow_open');
	downClickArrow.addEventListener('click',function() { FacebookDeletes.OpenContainerDiv(); },false);	
	
	var bulkDeleteObj=document.getElementById('BulkDelete');
	bulkDeleteObj.addEventListener('click',function() { FacebookDeletes.BulkDeletes(false); },false);
	var bulkToggleObj=document.getElementById('BulkToggle');
	bulkToggleObj.addEventListener('click',function() { FacebookDeletes.BulkDeletes(true); },false);
	var toggleAllObj=document.getElementById('ToggleAll');
	toggleAllObj.addEventListener('click',function() { FacebookDeletes.ToggleAll(); },false);
	
	var skipSubTextObj=document.getElementById('BulkDeleteSkipSubText');
	skipSubTextObj.addEventListener('change',function() { FacebookDeletes.SkipSubText(); },false);

	return 5000;
//	var reloadObj=document.getElementById('fbdelete_reload');
//	reloadObj.addEventListener('click',function() { FacebookDeletes.ChooseUsers(); },false);

},

OpenContainerDiv:function()
{
	var arrow = document.getElementById('arrow_open');
	var arrow2 = document.getElementById('arrow_close');
	arrow.style.display= "none";
	arrow2.style.display= "inline";
	var toolsDiv = document.getElementById('friends_delete_widgets_container');
	toolsDiv.style.display= "block";
	
	
},

CloseContainerDiv:function()
{
	var arrow = document.getElementById('arrow_close');
	var arrow2 = document.getElementById('arrow_open');
	arrow.style.display= "none";
	arrow2.style.display= "inline";
	var toolsDiv = document.getElementById('friends_delete_widgets_container');
	toolsDiv.style.display= "none";
	
},

BulkDeletesFinished:function() {
	// reload the page to see the new list.
	if(!this.bulkDeletesProgress.toggle) {
		window.setTimeout(function() {
//			window.history.go(0);
		},2000);
	}
},

bulkDeletesProgress:null,
BulkDeletesNext:function() {
	if(GM_log)
	{
//		GM_log('bulk delete next: '+this.bulkDeletesProgress.u);
	}
	var maxObj=document.getElementById('BulkDeleteMax');
	if(maxObj && maxObj.value!="" && this.bulkDeletesProgress.total>=parseInt(maxObj.value)) {
		if(GM_log) GM_log('deletes finished, max limit reached'+maxObj.value);
		this.BulkDeletesFinished();
		return;
	}

	if(this.bulkDeletesProgress.u>=this.users.length) { 
		var nextClicked=false;
/*
		var bulkDeleteNextPagesObj=document.getElementById('BulkDeleteNextPages');
		if(bulkDeleteNextPagesObj.checked) {
			if(this.BulkDeleteClickNextPage()) {
				this.bulkDeletesProgress.u=0;
				window.setTimeout(function() { FacebookDeletes.BulkDeletes(FacebookDeletes.bulkDeletesProgress.toggle,FacebookDeletes.bulkDeletesProgress.total); },10000);
				return;
			}
		}
*/
		if(!nextClicked) {
			if(GM_log)
			{
				GM_log('deletes finished');
			}
			this.BulkDeletesFinished();
			return;
		}
	}
	var deletedCount=this.bulkDeletesProgress.u;

	this.BulkDeletesNext2();

	this.SetMessage('Total deleted: '+this.bulkDeletesProgress.total);

	window.setTimeout(function() { FacebookDeletes.BulkDeletesNext(); },150);
},

BulkDeleteClickNextPage:function() {
	var forward=this.FindByXPath(document,".//a[@bindpoint='forwardRoot']");
	if(!forward) { return false; }
	var p=forward;
	while(p && p.tagName!="BODY") {
		if(p.className.indexOf('Disabled')>=0) {
			return false;
		}
		p=p.parentNode;
	}
	if(GM_log)
	{
		GM_log('Click next page button');
	}
	this.Click(forward);
	return true;
},


BulkDeletesNext2:function() {
	var t=this;
	if(this.bulkDeletesProgress.u>=this.users.length) { 
		return true; 
	}

	var user=this.users[this.bulkDeletesProgress.u];
	var nodelete=document.getElementById('nodelete_'+user.uid);
	if(this.bulkDeletesProgress.waitForFriendList) {
		if(this.bulkDeletesProgress.waitForFriendList!='waiting') {
			if(nodelete.checked) {
				this.bulkDeletesProgress.waitForFriendList=false;
			} else {
				this.bulkDeletesProgress.waitForFriendList='waiting';
				var skip=document.getElementById('BulkDeleteSkipInclude');
				skip=skip.options[skip.selectedIndex].value;
				t.GetUserFriendLists(user.uid,function(obj) {
					selectedLists = t.GetSelectedFriendLists();
					t.bulkDeletesProgress.skipUser=false;
					var skipping=skip=='skip'?false:true;
					var flid=null;
					for(var l=0; l<obj.lists.length; l++) {
						flid=obj.lists[l];
						if(skip=='skip') {
							if(selectedLists[flid]) { skipping=true; break; }
						} else {
							if(selectedLists[flid]) {
								skipping=false;
								break;
							}
						}
					}
					
					if(skipping) {
						var theLists = t.FindFriendLists();
						theLists.forEach(function(i) {
							if(i[0]==flid) {
								if(GM_log) GM_log('flid:'+flid+'='+i[1]);
							}
						});
						if(GM_log) GM_log('In friend list, skipping:'+flid+', userid:'+user.uid+','+user.name);

						t.bulkDeletesProgress.skipUser=true;
						nodelete.checked=true;
				//		break;
					}
					
					t.bulkDeletesProgress.waitForFriendList=false;
				});
			}
		}

		return false;
	} else if(this.bulkDeletesProgress.waitForConfirm) {
		var wait=false;
		var removeConfirm=this.FindByXPath(document,".//input[@name='confirm' and @type='button']");
		if(!removeConfirm) { return false; }
		if(GM_log)
		{
			GM_log('Confirm remove');
		}
		this.Click(removeConfirm);
		this.bulkDeletesProgress.waitForConfirm=wait;
		if(wait) {
			return false;
		}
		// no more waiting for dialogs, lets go to the next one.
		this.bulkDeletesProgress.u++;
		return true;
	}

	try {
		if((nodelete && nodelete.checked) || t.bulkDeletesProgress.skipUser) { 
			this.bulkDeletesProgress.u++;
			if(GM_log)
			{
				GM_log('not removing:'+user.uid+","+user.name+','+nodelete.checked+','+t.bulkDeletesProgress.skipUser);
			}
			return true; 
		}
	
		if(GM_log)
		{
			GM_log('removing:'+user.uid+","+user.name);
		}


		this.bulkDeletesProgress.total++;

		if(this.bulkDeletesProgress.toggle) {
			user.hrefObj.style.border='2px solid #f00';
			this.bulkDeletesProgress.u++;
		} else {
			this.RemoveUser(user.uid);
			user.hrefObj.style.border= null;
			user.hrefObj.innerHTML+=' (Deleted)';
			// we will update this.bulkDeletesProgress.u after waitForConfirm
			this.bulkDeletesProgress.waitForConfirm=true;
			return false;
		}
	} finally {
		this.bulkDeletesProgress.skipUser=false;
		this.bulkDeletesProgress.waitForFriendList=true;
	}
	return false;
},

IsGroupPage:function() {
	var group=this.FindByXPath(document,"//a[contains(@href,'/groups/edit.php') and contains(@href,'gid=')]");
	if(!group) return null;
	var m=/gid=([0-9]+)/.exec(group.href);
	if(!m) return null;
	return m[1];
},

RemoveUser:function(uid) {
	var a=document.createElement('script');
	var gid=this.IsGroupPage();
	if(!gid) {
		a.innerHTML="new AsyncRequest().setURI('/friends/ajax/remove_friend.php').setData({ friend: '"+uid+"',type:'friend' }).send();";
	} else {
		a.innerHTML="new AsyncRequest().setURI('/ajax/social_graph/remove.php').setData({"+
			"fbid: "+uid+",edge_type: 'fan', ban: false, message: '', node_id: "+gid+", class:'MemberManager' "+
			"}).send();"
		;

	}

	document.body.appendChild(a);
	
	
/*
	var iframe=document.createElement('iframe');
iframe.width=600;
iframe.height=600;
	iframe.src='http://www.facebook.com/friends/remove.php?remove_friend=1&rr=1&friend_id='+uid;

	document.body.appendChild(iframe);
*/	
},

signalInput:null,
GetUserFriendLists:function(id,func) {
	var t=this;
	if(t.signalInput!=null) {
		t.signalInput.parentNode.removeChild(t.signalInput);
	}
	
	t.signalInput=document.createElement('input');
	t.signalInput.type='button';
	t.signalInput.id='FBDelete_signalInput';
	t.signalInput.style.display='none';
	document.body.appendChild(t.signalInput);
	
	var onChange=function() { 
		setTimeout(function() {
			func(unsafeWindow.JSON.parse(t.signalInput.value));
//			t.signalInput.removeEventListener('change',onChange);
		},1);
	}
	t.signalInput.addEventListener('click',onChange);

	var a=document.createElement('script');

	a.innerHTML="new AsyncRequest().setURI('/ajax/friends/status.php').setData({friend:"+id+"}).setHandler(function(g) { "+
		"var f = g.getPayload(); var del=document.getElementById('FBDelete_signalInput'); del.value=JSON.stringify(f); del.click(); }).send();";
	document.body.appendChild(a);
},

BulkDeletes:function(toggle,total) {
	this.SkipSubText();
	var users=this.users=this.FindProfiles();
	this.bulkDeletesProgress={u:0,'waitForFriendList':true,'waitForConfirm':false,'toggle':toggle,'total':total?total:0};
	this.BulkDeletesNext();
},


IterateNoDeletes:function(func) {
	var inps=document.getElementsByTagName('input');
	for(var i=0; i<inps.length; i++) {
		var inp=inps[i];
		if(inp.id.substr(0,9)=="nodelete_") {
			func(inp,inp.id.substr(9));
		}
	}
},
ToggleAll:function() {
	var firstCheck=null;
	this.IterateNoDeletes(function(inp,id) {
		if(firstCheck==null) { firstCheck=inp.checked; }
		inp.checked=firstCheck?false:true;
	});
},
SkipSubText:function() {
	var skipSubTextObj=document.getElementById('BulkDeleteSkipSubText');
	if(!skipSubTextObj) { return false; }

 	var selectedLists = document.getElementById("All_Friends_List_Listbox");
	if(!selectedLists ) { return false; }
	var skipSubTextLc ="";
	if(skipSubTextObj != null)
	{
		skipSubTextObj.value.toLowerCase();
	}

	selectedLists = this.GetSelectedFriendLists();

	if(skipSubTextLc=="" && selectedLists.length==0) { return false; }

	var users=this.FindProfiles();
	for(var u=0; u<users.length; u++) {
		var user=users[u];
		var inp=document.getElementById('nodelete_'+user.uid);
		if(!inp) { continue; }
		
		if(user.subText!=undefined) {
			if(skipSubTextLc!= "" && user.subText.toLowerCase().indexOf(skipSubTextLc)>=0) 
			{
				user.hrefObj.style.border= null;
				inp.checked=true;
				continue;
			}
		}

//		var friendLists=unsafeWindow.EditableFriendListPane._memberships[user.uid];
		var friendLists={};
		if(friendLists==undefined) {
if(GM_log) 	
	GM_log('no lists found for user:'+user.uid);
continue;
		}
		for(x in selectedLists)
		{
			if(friendLists[x]) {
				user.hrefObj.style.border=null;
				inp.checked=true;
				break;
			}
/*
			if(selectedLists[x] == "No Friend Lists" && (user.subText == null || user.subText =="" ))
			{
				user.hrefObj.style.border= null;
				inp.checked=true;
				continue;
			}
			if(user.subText.indexOf(selectedLists[x])>=0)
			{
				user.hrefObj.style.border= null;
				inp.checked=true;
				continue;
			}
*/
		}	
	}

},

/*
GetFriendListFromPage:function(id,endFunc) {
	GM_xmlhttpRequest({
		'url':http://www.facebook.com/friends/edit/?sk=fl_'+id,
		'onload':function(r) {	
			var div=document.createElement('div');
			div.innerHTML=r.responseText;
			FindByXPath(editFriendsNameContainer 
			var list=[];
			endFunc(list);
		}
	});
},
*/

GetSelectedFriendLists:function()
{
	var fLists= [];
	var fListselected={};
	var theListbox = document.getElementById("All_Friends_List_Listbox");
	if(theListbox == null) {return fLists;} 
	
	for(var i=0; i<theListbox.options.length; i++)
	{
		if(theListbox.options[i].selected)
		{
			fLists.push(theListbox.options[i].value);
			fListselected[theListbox.options[i].value]=theListbox.options[i].innerHTML;
		}
	}
	
	if(GM_setValue)
	{
		if(fListselected != null && JSON)
		{
			GM_setValue("selectedLists",JSON.stringify(fListselected) );
		}
	}
	return fListselected;
},

friendList:null,
FindFriendLists:function()
{
	var t=this;
	if(t.friendList!=null) return t.friendList;
	var fLists= [];
	var friendListMenu=t.FindByXPath(document,"//div[contains(@class,'FriendListMenu')]");

	var friendListsNodes=null;
	if(friendListMenu!=null) {
		friendListsNodes = document.evaluate("//span[contains(@class,'itemLabel')]",friendListMenu,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	if(friendListsNodes!=null) {
		for ( var i = 0; i < friendListsNodes.snapshotLength; i++) {
			var aList = friendListsNodes.snapshotItem(i);
			var inpNode = this.FindByXPath(aList, ".//input[@name='flid']");
			var nameNode = this.FindByXPath(aList, ".//div[contains(@class,'name')]");
			// *** only "more friends" has tabIndex==0, more friends: 2427620217000
			if(inpNode!=null && nameNode!=null && inpNode.value!="2427620217000" && inpNode.value!="") {
				fLists.push([inpNode.value,nameNode.innerHTML]);
			}
		}
		t.friendList=fLists;
		return fLists;
	} else {
		var button=t.FindByXPath(document,"//a[contains(@class,'enableFriendListFlyout')]");
		if(button) unsafeWindow.FriendListFlyoutController.show(button);
		else {
			GM_log('Cannot find friends button');
		}
	}
	return null;
},
FindFriendListsOld:function()
{
	var fLists= [];
//	fLists.push(["No Friend Lists"]);
//	fLists.push(["Friend Request Pending"]);
	
//	var friendListsNodes = document.evaluate('//div[@class="UIFilterList_Item  "]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var friendListsNodes = document.evaluate("//li[contains(@id,'navItem_fl_')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	for ( var i = 0; i < friendListsNodes.snapshotLength; i++) 
	{
		var aList = friendListsNodes.snapshotItem(i);
		var flnum=aList.id.substr(11);
		var subNode = this.FindByXPath(aList, ".//*[contains(@class,'linkWrap')]");
//		var subNode = this.FindByXPath(aList, "a/div/i[contains(@class,'spritemap_6jzm0g')]");
		if(subNode != null)
		{
			fLists.push([flnum,subNode.firstChild.textContent]);
//			fLists.push(aList.textContent);
		}
	}
	return fLists;
}




};



var href=document.location.href;
window.addEventListener("load", function(e) {
	FacebookDeletes.ChooseUsersTimer();
},false);

if(GM_registerMenuCommand) {
	GM_registerMenuCommand('Facebook deletes - Reload users',function() { FacebookDeletes.ChooseUsers(); });
}
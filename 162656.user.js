// ==UserScript==
// @name           FacebookDeletesX
// @namespace      FacebookDeletesX
// @include        *://www.facebook.com/*
// @include		   *://localhost/*
// @exclude        *://www.facebook.com/ai.php*
// @version		2.3
// ==/UserScript==


// @version_timestamp        1363896507
// Whats New: added the support for new Facebook timeline (1 April 2013)
// by AbiusX[.com]


var FacebookDeletesX={

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
FindParentId:function(id,obj) {
	while(obj && obj.tagName!="BODY") {
		if(obj.id==id) { return obj; }
		obj=obj.parentNode;
	}
	return null;
},
FindProfiles:function() {
	
	var content=document.getElementById('content');
	var hrefs=content.getElementsByTagName('a');
	var currentUser={};
	var users=[];


	for(var h=0; h<hrefs.length; h++) {
		var href=hrefs[h];
		
		currentUser.href=href.href;
		currentUser.hrefObj=href;
		
        if(href.parentNode.className=='fsl fwb fcb') {
			currentUser.name=href.innerHTML;			
			currentUser.div=href.parentNode;

            var data= href.getAttribute("data-gt");
            if (!data) continue;
            var inp=FacebookDeletesX.FindByXPath(currentUser.div,".//input[@class='fastdelete']");
            var uid=eval("("+data+")");
            if (uid.hasOwnProperty("engagement") && uid.engagement.hasOwnProperty("eng_tid"))
                currentUser.uid=uid.engagement.eng_tid;
            else 
                continue;
            
            
			if(currentUser.uid && !inp) {
				users.push(currentUser);
			}
			currentUser={};
		}
	}
	return users;
},
FindInactive:function() {
	
	var content=document.getElementById('content');
	var spans=content.getElementsByTagName('span');
	var currentUser={};
	var users=[];


	for(var h=0; h<spans.length; h++) {
		var href=spans[h];
		var p = FacebookDeletesX.FindParentId("profileBrowserGrid",href);
		if(p != null) continue;

        //New timeline (1 April 2013)

		if(href.parentNode.className=='fsl fwb fcb') {
	        var data= href.getAttribute("data-gt");
            if (!data) continue;
			currentUser.div=href.parentNode;
			var inp=FacebookDeletesX.FindByXPath(currentUser.div,".//input[@class='fastdelete']");
			var uid=eval("("+data+")");
            currentUser.uid=uid.engagement.eng_tid;
			currentUser.name=href.innerHTML;			
			if(currentUser.uid && !inp) {
				users.push(currentUser);
			}
			currentUser={};
		}
	}
	return users;
},
RemoveInactive:function()
{
	var inactiveUsers=FacebookDeletesX.FindInactive();
	if (typeof(console)!=="undefined")
	    console.dir(inactiveUsers);
	if (!confirm("Are you sure you want to remove "+inactiveUsers.length+" inactive friends? This is not reversible.")) return;
	var cnt=0;
	for(var u=0; u<inactiveUsers.length; u++) {
		var user=inactiveUsers[u];
		FacebookDeletesX.Remove(user.uid);
		cnt++;
	}
	
	alert(cnt+" inactive friends queued for delete. Please do not close this window, but open another window and monitor" +
			"your facebook profile (the number of friends). Depending on the number of removals in queue and your network speed," +
			" this can take up to 300 seconds.");

},
RunFacebookScript:function(data)
{
	var a=document.createElement('script');
	a.innerHTML=data;
	document.body.appendChild(a);

},

Remove:function(e)
{
	if (typeof(e)=="number" || typeof(e)=="string")
		uid=e;
	else
		uid=e.target.uid;
	FacebookDeletesX.RunFacebookScript('new AsyncRequest().setURI("https://www.facebook.com/ajax/friends/status.php").setData({"friend":'+uid+'}).setHandler(function(g){'+
	'	res=(g.getPayload());'+
	'	if (res.status==1) {'+ //still friends
	'		new AsyncRequest().setURI("https://www.facebook.com/ajax/profile/removefriendconfirm.php").setData({"uid":'+uid+',"norefresh":"true","unref":"button_dropdown","confirmed":1}).setHandler('+
	'		function(g){'+ //removed callback
	'			temp=document.getElementById("fastdelete_'+uid+'");'+
	'			temp.style.visibility="hidden";'+	
	'		}).send();'+
	'	}'+
	'}).send();');

//	new AsyncRequest().setURI("https://www.facebook.com/ajax/friends/status.php").setData({"friend":uid}).setHandler(function(g){alert(JSON.stringify(g.getPayload()));}).send();
},
AddButtons:function() {

	
	var users=FacebookDeletesX.FindProfiles();
	if(users.length<=0) {
		// facebook may be on another page.
		return 5000;
	}

	var cnt=0;
  
	var hasfastdelete=FacebookDeletesX.FindByXPath(document,"//input[@className='fastdelete']");
	if(!hasfastdelete) {
		for(var u=0; u<users.length; u++) {
			var user=users[u];

			var inp=FacebookDeletesX.FindByXPath(user.div,".//input[@class='fastdelete']");
			if(inp) { continue; }
			inp=document.createElement('input');
			inp.value="Fast Remove";
			inp.type='button';
			inp.className='fastdelete';
			inp.title="Click to remove this friend fast.";
			inp.id='fastdelete_'+user.uid;
			inp.uid=user.uid;
			inp.addEventListener('click',FacebookDeletesX.Remove);
			user.div.insertBefore(document.createElement('br'),user.div.childNodes[0]);
			user.div.insertBefore(inp,user.div.childNodes[0]);
			cnt++;
		}
	}
},
setTimer:function()
{
	FacebookDeletesX.AddButtons();
	dialogs=document.getElementsByClassName("-cx-PRIVATE-uiDialog__positioner");
	for (var i=0;i<dialogs.length;++i)
		dialogs[i].parentNode.removeChild(dialogs[i]);
	setTimeout(FacebookDeletesX.setTimer,1000);
},

async:null



};
window.addEventListener("load", function(e) {
	setTimeout(FacebookDeletesX.setTimer,100);
	
},false);


if(GM_registerMenuCommand) {
	GM_registerMenuCommand('FacebookDeletesX - Add Buttons',function() { FacebookDeletesX.AddButtons(); });
	GM_registerMenuCommand('FacebookDeletesX - Remove Inactives',function() { FacebookDeletesX.RemoveInactive(); });
}
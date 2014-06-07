// ==UserScript==
// @name           ClAN quick invite.
// @namespace      InTheMafiaQuickInvite
// @description    Adds quick invite links to mafia wars, needs the facebook invites script to work.
// @include        http://apps*.facebook.com/vikingclan/alliances*
// @include        http://apps*.facebook.com/*/recruit
// @include        http://apps*.facebook.com/*/recruit.php*
// ==/UserScript==


/* VIXAY Notes
Mon March 30, 2009 08:47:25 PM

I finally managed to get background sequential adding via AJAX done now. This takes slightly longer but it also doesn't overload the server/browser, and limit's become unnecessary
 (though to be safe i've put in 500). But you have to leave it running for a few minutes if your list is large. 
There is no error checking in there right now though. (selecting elements using jQuery would have been very easy though!).
*/

// update script from http://userscripts.org/scripts/show/20145

var version_scriptNum = 45265; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1238465730942; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);


var limit=50;
var added_links=false;

function GetUrl(f) {
	var href=location.href;
	if(href.indexOf('/vikingclan/')>=0) {
		return 'http://apps.facebook.com/vikingclan/alliances/do.php?join_id='+f;
	}
	else if(href.indexOf('/inthemafia/')>=0) {
		return 'http://apps.facebook.com/inthemafia/status_invite.php?from='+f;
	} else if(href.indexOf('/recruit.php')>=0) {
		// dragon wars
//		var acceptUrl=href.replace('/recruit.php','/recruit.php?action=accept&user_id=');
		var acceptUrl=href.replace(new RegExp('/recruit.php.*$'),'/status_invite.php?from=');
		return acceptUrl+f;
	} else if(href.indexOf('/recruit')>=0) {
		var acceptUrl=href.replace('/recruit','/Connection/Accept/');
		return acceptUrl+f;
	}
}

function OpenAll() {
	var l=limit;
	for(var f in window.friendsWithAppNotInvited) {
		GM_openInTab(GetUrl(f));
		if(l--<=0) { break; }
	}
}

function OpenAllSilent() {
	var l=0;
	var friends=[];
	for(var f in window.friendsWithAppNotInvited) {
		friends.push(f);
	}
	takeAction(friends,l); //just initiate the recurisve call with the first element
}

function takeAction(friends,l)//,element)
{
	var f=friends[l];
	GM_log("adding:"+f+" limit:"+l); //DEBUG
	if (l > 500 || l>=friends.length) {
		GM_log("hit limit");
		document.getElementById('FriendsLinks').innerHTML+='<b>Done, reload this page.</b>';
		added_links=false;
		return false; // end condition
	}
	GM_xmlhttpRequest({ method: "GET", 
		url: GetUrl(f), 
//		headers: window.navigator.userAgent, 
		onload: function(response) {
			var element = document.getElementById("FriendLink_"+f); // find link to remove from list
			element.innerHTML="Added Friend!<br />";
			takeAction(friends,++l);
		}
	});
	return true;
}


function CheckFriends() {
	if(window.friendsWithAppNotInvited) {
		var friendsDiv=document.getElementById('InviteFriendsDiv');
		if(friendsDiv) {
			var d=document.getElementById('FriendsLinks');
			if(!d) {
				d=document.createElement('div');
				d.id='FriendsLinks';
	//			d.style.border='20px solid #f00';
				friendsDiv.insertBefore(d,friendsDiv.childNodes[0]);
			}
			var str='';
			var totalFriends=0;
			for(var f in window.friendsWithAppNotInvited) {
				str+="<a href='"+GetUrl(f)+"' id='FriendLink_"+f+"'>Add friend: "+f+"<br />";
				totalFriends++;
			}
			if(totalFriends>0) {
				d.innerHTML=str;
/*
				d.innerHTML=str+"<a id='OpenAllA'>Add all friends in new tabs(limit of "+limit+" tabs)</a><br />";
				var openAllA=document.getElementById('OpenAllA');
				openAllA.addEventListener('click',function() {
					OpenAll();
				},false);
*/
				d.innerHTML+="<a id='OpenAllB'>Add all friends in background(limit of 500)</a><br />";
				var openAllB=document.getElementById('OpenAllB');
				openAllB.addEventListener('click',function() {
					OpenAllSilent();
				},false);

				added_links = true; // to prevent refreshing the friends list every 5 seconds as designed before
				// this means that you now have to reload the page by visiting the url, for it to show up. 
				//http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=recruit&xw_action=view
			}
		}
	}
	if(!added_links) {
		window.setTimeout(function() {
			CheckFriends();
		},5000);
	}
}

CheckFriends();
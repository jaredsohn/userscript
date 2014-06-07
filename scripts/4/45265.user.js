// ==UserScript==
// @name           Facebook games quick invite.
// @namespace      InTheMafiaQuickInvite
// @description    Adds quick invite links to lots of games on facebook.  (Needs the facebook invites script to work)
// @version_timestamp 1384454335
// @include        http://*.facebook.com/*
// @include	   http://forums.zynga.com/*
// @require http://sizzlemctwizzle.com/updater.php?id=45265
// ==/UserScript==

/* 
VIXAY Notes
Mon March 30, 2009 08:47:25 PM

I finally managed to get background sequential adding via AJAX done now. This takes slightly longer but it also doesn't overload the server/browser, and limit's become unnecessary
 (though to be safe i've put in 500). But you have to leave it running for a few minutes if your list is large. 
There is no error checking in there right now though. (selecting elements using jQuery would have been very easy though!).
*/

//var SUC_script_num = 45265; // Change this to the number given to the script by userscripts.org (check the address bar)
//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


var limit=50;
var added_links=false;
var customUrl=null;
var added_items=false;
var useFriendsFrom=null;

var nHtml={
FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
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
}
};

var recruit_phps=[
	'piratesrule',
	'spacewarsgame',
	'dragonwars',
//	'castle_age',
	'fashionwarsgame',
	'heroesvillains',
	'prisonlockdowngame',
	'gangwarsgame'
//	'star_age'
];

// Add your application here...
var urlReplaces=[

	
	// lord_fandomar, 1/jul/2009
	['/slayers/','links.php?r=#id#&nref=st'],
	['/werewolves/','links.php?r=#id#&nref=st'],
	['/vampires/','links.php?r=#id#&nref=st'],
	['/zombies/','links.php?r=#id#&nref=st'],
	// yoville, reaper-x, 25/Jun/2009
	['/yoville/','join_crew.php?sid=#id#&poe=20'],
	// rock legends, overlandish, 22/jun/2009
	['/rock_legends/','mobs/shared?sender=#id#&h=3fe52209&metric=im_c_1'],
	// dragon's quest, mike1970, 19/jun/2009
	['/dragonsquest/','handleJoinParty.php?User=#id#'],
	// Nightfall blood lines, ACTheOne, 17/jun/2009
	['/nightfallbloodlines/','link_invite.php?from=#id#'],
	// play gangwars, deathwish, 15/jun/2009
//	['/playgangwars/','?invite_from=#id#'],
	// play gangwars, deathwish, 22/jun/2009
	['/playgangwars/','group/join_gang?posted=#id#'],
	// mafiosowar, stark raven mad, 4/jun/2009
	['/mafiosowar/','home.php?inv=#id#'],
	// waynes: itsfashion, 31/may/2009
	['/itsfashion/','home.php?inv=#id#'],
	// ultimatemafia: Stark Raven Mad, 28/may/2009
	['/ultimatemafia/','go.php?action=invite&ids=#id#'],
	// gearquest: Hazado 29/may/2009
	['/gearquest/','refer_friend/#id#/'],
	// overdrive: smileyz 1/jun/2009
	['/overdrive/','link_invite.php?from=#id#'],
	// vampires game: smileyz 1/jun/2009
	['/vampiresgame/','status_invite.php?from=#id#'],
	['/mobwars/','mob/do.php?join_id=#id#'],
	// mafia wars, akhara, 21/jun/2009
	//['/inthemafia/','status_invite.php?from=#id#'],
  ['/inthemafia/','remote/html_server.php?xw_controller=war&xw_action=add&xw_city=1&friend_id=#id#'], //-- suggested by Lord_Fandomar http://userscripts.org/topics/34650#posts-166686
	// Street Racing: typerc & DS3, 07/may/2009
	['/streetracinggame/','index.php?action=statusrecruit&from=#id#'],
	// vikingclan: ackis, 7/may/2009
	['/vikingclan/','home/install/#id#'],
	// Special Forces: Mystina, 10/may/2009
	['/specialforces/','status_invite.php?from=#id#'],
	// Robin Hood: Mystina, 10/may/2009
	['/robhood/','home.php?inv=#id#'],
	// Gene Cronk: City of ash, 14/may/2009
	['/cityofash/','clan/do.php?join_id=#id#'],
	//  Ackis: superheroes alliance, 23/may/2009
	['/superheroes-alliance/','?from=#id#'],
	//  Ackis: starconquest, 25/may/2009
	['/starconquest/','?ref=status&ref_id=#id#&statusInvite=#id#'],
  // war_machine, Ciante, 02/aug/2009
  ['/war_machine/','?ref=status&ref_id=#id#'],
  // Kung-fu Pets, Silverhand, 16/aug/2009
  ['/kung fu pets/','?r=#id#'], 
  //Ninja Warriors, Ciante, 30/aug/2009
  ['/ninjadojo/','?join=#id#&refid=8'],
  // Reign of vampires, the rock, 30/august/2009
//  ['/bloodyvampires/','?r=#id#&s=dm1'],
  //Sex Games, Michael Jackson, 2009-07-27
  ['/playsexgames/','?re=#id#&oi=11'],

  
  	// MadBat, 28/aug/2009
	//['/castle_age/','/index.php?twt=inv&lka=#id#'],
	// tim omaha, 21/jan/2010
	['/castle_age/','/index.php?tp=cht&lka=#id#&buf=1'],
	
	// elektroda, 3/aug/2009
	['/kingdom_wars/','/index.php?referrer_id=#id#'],
	// ckenni, 29/jul/2009, ??? facebook invites script doesn't work here for some reason.

	// silveranthrax, 28/jul/2009
	// Star Age
	['/star_age/','/index.php?tp=cht&lka=#id#&buf=1'],
	// Castle Age
//	['/castle_age/','/index.php?tp=cht&lka=#id#&buf=1'],
	// Underworld
	['/under_world/','/index.php?tp=cht&lka=#id#&buf=1'],
	// Glamour age
	['/glamour_age/','/index.php?tp=cht&lka=#id#&buf=1']

	// Malakar, 5/nov/2009
	['/castle_age/','/army.php?act=acpt&uid=#id#'],
	['/vampiresdarkside/','/invite/invite.aspx?invited_by=#id#'],

	// Ginger Pforr, 10/nov/2009
//	['weddingwars','/?r=#id#&s=m'],
	['/sororitylife/' ,'/link_invite.php?from=#id#&track=message-AcceptMessage-R08'],



// wedding wars, the rock nov/20/2009
['/weddingwars/','?r=#id#&s=dm1'],

// Crime Lords, the rock nov/20/2009
['/commitacrime/','?r=#id#&s=dm1'],

// kungfu_pets, the rock nov/20/2009
['/kungfu_pets/','?r=#id#&s=dm1'],

// Fast Lane Racing, the rock nov/20/2009
['/fastlaneracing/','?r=#id#&s=dm1'],

// Age of castles, the rock nov/20/2009
['/ageofcastles/','?r=#id#&s=dm1'],

// Reign of vampires, the rock nov/20/2009
['/bloodyvampires/','?r=#id#&s=dm1'],	
  ];


var giftInfos={
//'vampiresgame':'http://apps.facebook.com/vampiresgame/recruit_gift.php?action=createAndGift&giftId=#gift#&ids[]=#id#',
'inthemafia':'http://apps.facebook.com/inthemafia/index.php?xw_controller=interstitial&xw_action=accept_gift&interstitial_gift_id=#gift#&interstitial_gift_cat=1&from_user=#id#'
};

// Fashion Wars: Mystina, 10/may/2009
// Heroes vs. Villains: Mystina, 10/may/2009
// Prison Lockdown: Mystina, 10/may/2009

function GetUrl(f) {
	var href=window.top.location.href;
	var gameNameOverride=document.getElementById('QuickInviteGameName');
	if(gameNameOverride && gameNameOverride.value!='') {
		GM_setValue('LastGameName',gameNameOverride.value);
		href='http://apps.facebook.com/'+gameNameOverride.value+'/';
	}
	if(customUrl!=null) {
		return customUrl.replace(/#id#/g,f);
	}


	for(var i=0; i<recruit_phps.length; i++) {
		var n=recruit_phps[i];
		if(href.indexOf('/'+n+'/')>=0) { 
			// dragon wars: Mystina, 27/apr/2009 
			// castle age: ackis, 7/may/2009
			// piratesrule: smileyz, 10/may/2009 
			// Fashion Wars: Mystina, 10/may/2009 
			// Heroes vs. Villains: Mystina, 10/may/2009 
			// Prison Lockdown: Mystina, 10/may/2009 
			// Gang Wars: Mystina, 10/may/2009 
			var acceptUrl=href.replace(new RegExp('/'+n+'/.*$'),'/'+n+'/recruit.php?action=create&ids[]=');
			return acceptUrl+f;
		}		
	}
	for(var i=0; i<urlReplaces.length; i++) {
		var s=urlReplaces[i];
		if(!s) continue;
		if(href.indexOf(s[0])>=0) {
			var rep=s[1];
			rep=rep.replace(/#id#/g,f);
			return href.replace(new RegExp(s[0]+'.*$'),s[0]+rep);
		}
	}

	// Generic ones...

	if(href.indexOf('/family.php')>=0) {
		// Sex Games: Mystina, 10/may/2009
		// Knighted: Mystina, 10/may/2009
		var acceptUrl=href.replace(new RegExp('/family.*$'),'/main.php?oi=14&re=');
		return acceptUrl+f;
/*
	} else if(href.indexOf('invite.php')>=0) {
		// kingdom_wars: ackis, 24/apr/2009
		return href.replace(new RegExp('/invite.php*$'),'/invite.php?receiver_id='+f);
*/
		} else if(href.indexOf('/invite')>=0) {
		// Hammerfall, Hazado: 21/apr/2009
		var acceptUrl=href.replace(new RegExp('/invite.*$'),'/?invite_from=');
		return acceptUrl+f;
	} else if(href.indexOf('/recruit.php')>=0) {
		// huh? what was this for?
//		var acceptUrl=href.replace('/recruit.php','/recruit.php?action=accept&user_id=');
		var acceptUrl=href.replace(new RegExp('/recruit.php.*$'),'/status_invite.php?from=');
		return acceptUrl+f;
	} else if(href.indexOf('/recruit')>=0) {
		// castle age, old zynga games: ackis, 8/may/2009
		var acceptUrl=href.replace('/recruit','/Connection/Accept/');
		return acceptUrl+f;
	} else if(href.indexOf('/Recruit')>=0) {
		// School of Magic: Mystina, 10/may/2009
		// Drinking Wars: Mystina, 10/may/2009
		var acceptUrl=href.replace('/Recruit','/Accept/');
		return acceptUrl+f;
	} else if(href.indexOf('/index.php')>=0) {
    // kungfu_pets, Silverhand: 16/aug/2009
    var acceptUrl=href.replace('/Recruit','/?r=');
    return acceptUrl+f;
  }
	return null;
}

function GetFriendsHash() {
	if(useFriendsFrom=='dialog') {
		return window.friendsInInviteDialog;
	} else if(useFriendsFrom=='app') {
		return window.friendsWithAppList;
       // LeoXavior 27/jun/2009
       } else if(useFriendsFrom=="all") {
               var AllFriends={};              
               var FriendsWithApp = window.friendsWithAppList;
               var FriendsFromDialog = window.friendsInInviteDialog;
               for(var i in FriendsWithApp)
               {
                       AllFriends[i] = FriendsWithApp[i];
               }
               for(var i in FriendsFromDialog)
               {
                       AllFriends[i] = FriendsFromDialog[i];
               }
               return AllFriends;

	} else {
		return window.friendsWithAppNotInvited;
	}
}


function OpenAllInTabs() {
	var l=limit;
	var friendsHash=GetFriendsHash();
	for(var f in friendsHash) {
		GM_openInTab(GetUrl(f));
		if(l--<=0) { break; }
	}
}


function OpenAllSilent() {
	var l=0;
	var friends=[];
	var friendsHash=GetFriendsHash();
	for(var f in friendsHash) {
		friends.push(f);
	}
	takeAction(friends,l); //just initiate the recurisve call with the first element
}


function takeAction(friends,l)//,element)
{
	var f=friends[l];
	GM_log("adding:"+f+" upto:"+l); //DEBUG
	if (l>=friends.length) {
		GM_log("hit limit");
		document.getElementById('FriendsLinks').innerHTML+='<b>Done, reload this page.</b>';
		added_links=false;
		useFriendsFrom=null;
		// LeoXavior 26/jun/2009
		if(added_items==true)
			added_items=false;
		return false; // end condition
	}
	var element = document.getElementById("FriendLink_"+f); // find link to remove from list
	var url=GetUrl(f);
	GM_xmlhttpRequest({ method: "GET", 
		'url': url, 
//		headers: window.navigator.userAgent, 
		onload: function(response) {
			if(element)
				element.innerHTML="Added Friend!<br />";
			// LeoXavior 26/jun/2009
                        ++l;
			if(added_items==false) {
				SetStatus(l+' friends of '+friends.length+' added'); 
			} else {
				SetStatus(l+' items of '+friends.length+' added'); 
			}
			takeAction(friends,l);
		},
		onerror: function(response) {
			GM_log('error');
		}
	});
	return true;
}

function SetStatus(html) {
	var status=document.getElementById('FBGamesQuickInvites_Status');
	if(status) status.innerHTML=html;
}

function AddFriendsToBuffer() {
	var noNextButton=false;
	var membersTitle=nHtml.FindByXPath(document,".//div[@class='title' and contains(string(),'Your Mafia Members')]");
	if(membersTitle && window.GetFacebookInvites!=undefined) {
		var fbinvites=window.GetFacebookInvites();
		var profileRe=new RegExp('xw_controller=stats.*user=([0-9]+)');
		fbinvites.AddFriendsFromPage({'doc':document.body,'doNextPage':false,'profileRe':profileRe});
		noNextButton=true;
		// click next
		var topNext=nHtml.FindByXPath(document,"//a[contains(@onclick,'xw_action=view') and contains(@onclick,'p=')]");
		if(topNext) {
			topNext=topNext.parentNode;
			var bStarted=false;
			for(var s=0; s<topNext.childNodes.length; s++) {
				var sObj=topNext.childNodes[s];
				if(sObj.tagName=="A") {
					if(bStarted) {
						sObj.style.border='3px solid #f00';
						noNextButton=false;
						GM_log('click next page:'+sObj.href);
						nHtml.Click(sObj);
						break;
					}
				} else if(sObj.tagName=="B") {
					bStarted=true;
				}
			}
		}
	}
	if(!noNextButton) {
		window.setTimeout(function() {
			AddFriendsToBuffer();
		},3000);
	}
}


function AppendGifts(d,customUrlBase) {
	var openAllCustomNum=document.createElement('input');
	openAllCustomNum.value='64';
	openAllCustomNum.size=3;
	var openAllCustom=document.createElement('a');
	openAllCustom.innerHTML="Give yourself some gifts from your friends(Change the number for different gift types)";
	openAllCustom.addEventListener('click',function() {
		useFriendsFrom='all';
		customUrl=customUrlBase.replace(/#gift#/g,openAllCustomNum.value);
		// LeoXavior 26/jun/2009
		added_items=true;
		OpenAllSilent();
	},false);
	d.appendChild(openAllCustomNum);
	d.appendChild(openAllCustom);
	d.appendChild(document.createElement('br'));
}

function CheckFriends(force) {
	var friendsDiv=document.getElementById('InviteFriendsDiv');
	if(window.friendsWithAppNotInvited && friendsDiv) {
		var d=document.getElementById('FriendsLinks');
		if(!d || force) {
			if(!d) {
				d=document.createElement('div');
				d.id='FriendsLinks';
				d.style.border='4px solid #666';
				friendsDiv.insertBefore(d,friendsDiv.childNodes[0]);
				var showA=document.createElement('a');
				showA.innerHTML='Show/Hide quick invites';
				friendsDiv.insertBefore(showA,d);
				showA.addEventListener('click',function() {
					d.style.display=d.style.display=='none'?'block':'none';
				},false);
			}

			d.innerHTML='';
			var str='';
			var totalFriends=0;
			var friendsHash=GetFriendsHash();
			for(var f in friendsHash) {
				var url=GetUrl(f);
				if(url==null) { 
					GM_log('un supported app');
					return; 
				}
				str+="<a href='"+url+"' id='FriendLink_"+f+"'>Add friend: "+f+"<br />";
				totalFriends++;
				if(totalFriends>60) {
					str+=" .... Too many to show....<br />";
					break;
				}
			}


			if(totalFriends>0) {

				d.appendChild(document.createTextNode('Add all friends '));

				var openAllB=document.createElement('a');
				openAllB.innerHTML="in background";
				openAllB.addEventListener('click',function() {
					OpenAllSilent();
				},false);
				d.appendChild(openAllB);

				d.appendChild(document.createTextNode(' or '));
				var openAllA=document.createElement('a');
				openAllA.innerHTML="In tabs";
				openAllA.addEventListener('click',function() {
					OpenAllInTabs();
				},false);
				d.appendChild(openAllA);

				d.appendChild(document.createElement('br'));


				added_links = true; // to prevent refreshing the friends list every 5 seconds as designed before
				// this means that you now have to reload the page by visiting the url, for it to show up. 
				//http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=recruit&xw_action=view
			}
			var statusDiv=document.createElement('div');
			statusDiv.id='FBGamesQuickInvites_Status'
			d.appendChild(statusDiv);

			var gameRe=new RegExp('\\.com/([^/]+)/');
			var gameM=gameRe.exec(location.href);
			if(gameM && gameM.length>=2) {
				var giftInfo=giftInfos[gameM[1]];
				if(giftInfo) {
					//AppendGifts(d,giftInfo); // vixay - disable gifts  as they are not working anymore! Too many complaints received that it's not working!
				}
			}

			var RefreshQuickInvites=document.getElementById('RefreshQuickInvites');
			if(!RefreshQuickInvites) {
				RefreshQuickInvites=document.createElement('a');
				RefreshQuickInvites.innerHTML="Refresh invite links";
				d.appendChild(RefreshQuickInvites);
				d.appendChild(document.createElement('br'));
				RefreshQuickInvites.addEventListener('click',function() {
					CheckFriends(true);
				},false);
			}
			var UseFriendsInDialog=document.getElementById('UseFriendsInDialog');
			if(!UseFriendsInDialog) {
				UseFriendsInDialog=document.createElement('a');
				UseFriendsInDialog.innerHTML="Use all friends in the invite dialog";
				d.appendChild(UseFriendsInDialog);
				d.appendChild(document.createElement('br'));

				UseFriendsInDialog.addEventListener('click',function() {
					useFriendsFrom=useFriendsFrom=='dialog'?'':'dialog';
					CheckFriends(true);
				},false);
			}
			if(totalFriends>0) {
				var clicksDiv=document.createElement('div');
				clicksDiv.innerHTML=str;
				d.appendChild(clicksDiv);
			}

		}
	} else {
		var membersTitle=nHtml.FindByXPath(document,".//div[@class='title' and contains(string(),'Your Mafia Members')]");
		if(membersTitle) {
			var a=document.getElementById('AddFriendsOnPageLink');
			if(!a) {
				var a=document.createElement('a');
				a.id='AddFriendsOnPageLink';
				a.innerHTML="Copy the list of people here to the 'facebook invites' buffer.";
				a.addEventListener('click',function() {
					window.GetFacebookInvites().ClearFriendsBuffer();
					AddFriendsToBuffer();
				},false);
				membersTitle.parentNode.insertBefore(a,membersTitle);
			}
		}
	}
	window.setTimeout(function() {
		CheckFriends();
	},5000);
}

function GetContentDiv() {
	var content=document.getElementById('content');
	if(content) { return content; }
	return document.body;
}

function SetAllProfilesOnPage() {
	useFriendsFromDialog='';
	var content=GetContentDiv();
	var as=content.getElementsByTagName('a');
	var uidRe=new RegExp('profile.php.*id=([0-9]+)');
	var uids={};
	for(var aupto=0; aupto<as.length; aupto++) {
		var a=as[aupto];
		var uidM=uidRe.exec(a.href);
		if(uidM) {
			var uid=uidM[1];
			uids[uid]=1;
		}
	}
	window.friendsWithAppNotInvited=uids;
}
function UseAllProfilesOnPage() {
	SetAllProfilesOnPage();
	CheckFriends(true);
}

function ShowUseAllProfilesOnPage() {
	var friendsDiv=document.getElementById('InviteFriendsDiv');
	if(friendsDiv) {
		friendsDiv.parentNode.removeChild(friendsDiv);
	}
	friendsDiv=document.createElement('div');
	friendsDiv.id='InviteFriendsDiv';
	var lastGameName=GM_getValue('LastGameName','inthemafia');
	friendsDiv.innerHTML="<br /><br />Game name:<input id='QuickInviteGameName' value='"+lastGameName+"' />"+
		"<input type='button' id='UseAllProfilesOnPageButton' value='Use all profiles on this page for invites' />";
	var content=GetContentDiv();
	content.insertBefore(friendsDiv,content.childNodes[0]);
	var button=document.getElementById('UseAllProfilesOnPageButton');
	button.addEventListener('click',function() {
		UseAllProfilesOnPage();
	},false);
	UseAllProfilesOnPage();
}

GM_registerMenuCommand('FB Games Quick Invites - Add links',function() {
	CheckFriends();
});

GM_registerMenuCommand('FB Games Quick Invites - Use all profiles on page',function() {
	ShowUseAllProfilesOnPage();
});

GM_registerMenuCommand('FB Games Quick Invites - Open in background',function() {
	OpenAllSilent();
});

CheckFriends();
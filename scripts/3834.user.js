// ==UserScript==
// @name           Best Friends for StumbleUpon
// @namespace      thlayli.detrave.net
// @description    Adds a section for Best Friends on SU
// @include        http://*.stumbleupon.com/friends/*
// @license         http://www.gnu.org/copyleft/gpl.html
// @version        2.6.3
// ==/UserScript==

// auto-update variables
var script_title = 'Best Friends for StumbleUpon';
var source_location = 'http://thlayli.detrave.net/su-bestfriends.user.js';
var version_holder = 'http://thlayli.detrave.net/su-bestfriends.version.txt';
var current_version = '2.6.3';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');

GM_registerMenuCommand('Update - '+script_title, CheckVersion);
CheckForUpdate();

var editFlag = 0;
var aboutFlag = 0;
var fullFriends = 1;
var fullSubscribers = 1;
var friendBfs = new Array();
var subBfs = new Array();
var uniqueBfs = new Array();
var whatsNew = xpath(document, "//a[contains(@href, 'stumbleupon.com/prefs/' )]");
var isYourPage = (whatsNew.snapshotLength > 0) ? 1 : 0;
var allFriends = xpath(document,"//dl[contains(@class, 'vcardLg')]");
var friendLoad = false;
var subLoad = false;
var subnavDiv = xpath(document, "//div[@class='subnav']").snapshotItem(0);
var bgColor = getStyle(subnavDiv, 'background-color');

// get user name
var publicLink = xpath(document, "//a[contains(@href, '.stumbleupon.com/public/')]").snapshotItem(0);
var userName = publicLink.href.match(/http:\/\/([^\.]+)\.stumbleupon\.com\/public\//)[1];
var thisStumbler = publicLink.textContent;

// clean up mess from silly bug in v2.6 - remove in 2.6.4
if(GM_getValue('Thlayli','') != '' && GM_getValue(thisStumbler,'') == ''){
	GM_setValue(thisStumbler,GM_getValue('Thlayli',''));
	GM_deleteValue('Thlayli','');
}

if(isYourPage == 1){
	// get logged in name
	var friendsPref = GM_getValue(thisStumbler,'');
	var friendsList = (friendsPref.indexOf(';')) ? friendsPref.split(';') : new Array();
	friendsList = friendsList.sort(sortFriends);
	var friendsCount = friendsList.length;
	if(friendsList[0] == '')
		var friendsCount=0;
	//create bf section
	if(document.location.pathname.indexOf('/fans/') == -1){
		var friendBar = xpath(document, "//h1[contains(., ' friends')]").snapshotItem(0);
		if(document.location.pathname.indexOf('/all/') == -1){
			var subscriberContent = xpath(document,"//h1[contains(., 'Your subscriptions')]").snapshotItem(0);
			if(subscriberContent){
				subscriberContent = subscriberContent.nextSibling.nextSibling.nextSibling.nextSibling;
				//check for "Who are they?" link
				if(subscriberContent.textContent.indexOf('see their favorites') != -1)
					subscriberContent = subscriberContent.nextSibling.nextSibling;
			}
		}
	}else{
		var friendBar = xpath(document, "//h1[contains(., ' subscribers')]").snapshotItem(0);
	}
	var subscriptionLinks = friendBar.parentNode.parentNode.nextSibling.nextSibling.firstChild.firstChild.nextSibling;
	var subscriptionContent = subscriptionLinks.nextSibling.nextSibling;
	var newFriendBar = friendBar.cloneNode(true);
	var bfLinks = subscriptionLinks.cloneNode(true);
	var bfContent = subscriptionContent.cloneNode(true);
	bfContent.innerHTML = '\n';
	var bfInsertSpot = friendBar.parentNode.parentNode.nextSibling.nextSibling.firstChild;
	bfInsertSpot.insertBefore(newFriendBar,bfInsertSpot.firstChild);
	bfInsertSpot.insertBefore(bfContent,bfInsertSpot.firstChild);
	bfInsertSpot.insertBefore(bfLinks,bfInsertSpot.firstChild);
	friendBar.innerHTML = 'Your best friends <span class="textXSm textNoEm textUncolor">(' + friendsCount + ')</span>';
	bfLinks.innerHTML = '<ul class="cmds"><li class="textlink" style="display: none;"><a href="javascript:void(0);" class="textlink" id="edit_bf">Edit best friends</a></li><li class="textlink" style="display: none;"><a href="javascript:void(0);" class="textlink" id="cancel_edit">Cancel edit</a></li></ul><div class="clear"><!-- --></div>';
	//create full content sections
	var fullFriendsContent = subscriptionContent.cloneNode(true);
	fullFriendsContent.style.display = 'none';
	fullFriendsContent.setAttribute('rel', 'full_friends');
	subscriptionContent.parentNode.insertBefore(fullFriendsContent,subscriptionContent);
	if(subscriberContent){
		var fullSubscribersContent = subscriberContent.cloneNode(true);
		fullSubscribersContent.style.display = 'none';
		fullSubscribersContent.setAttribute('rel', 'full_subscriptions');
		subscriberContent.parentNode.insertBefore(fullSubscribersContent,subscriberContent);
	}
	var moreFriends = xpath(document, "//a[contains(@href, 'friends/all/')]").snapshotItem(0);
	if(moreFriends){
		moreFriends.href = 'javascript: void(0);';
		moreFriends.wrappedJSObject.addEventListener('click', toggleFriendLists, true);
	}
	var moreSubscriptions = xpath(document, "//a[contains(@href, 'subscriptions/')]").snapshotItem(0);
	if(moreSubscriptions){
		moreSubscriptions.href = 'javascript: void(0);';
		moreSubscriptions.wrappedJSObject.addEventListener('click', toggleSubscriptionLists, true);
	}
	//check for About Link modification
	if(subscriptionContent.firstChild.nextSibling.firstChild.nextSibling.firstChild.href.indexOf('/about/') != -1)
		var aboutFlag = 1;
	//edit & cancel event listeners
	document.getElementById('edit_bf').wrappedJSObject.addEventListener('click', editFriends, true);
	document.getElementById('cancel_edit').wrappedJSObject.addEventListener('click', cancelEdit, true);
	//retrieve full list
	if(document.location.pathname.indexOf('/friends/all/') == -1 && document.location.pathname.indexOf('/fans/') == -1 && document.location.pathname.indexOf('/subscriptions/') == -1){
		//get content from all friends page
		var friendLocation = document.location.href + 'all/';
		GM_xmlhttpRequest({
			method: 'GET',
			url: friendLocation,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html',
			},
			onload: function(responseDetails) {
					var tempFriendsContent = responseDetails.responseText.split('<div  class="listPeople mgnTop clearfix mgnBottom">');
					tempFriendsContent = tempFriendsContent[1].split('</div>');
					fullFriendsContent.innerHTML = tempFriendsContent[0];
					if(document.location.pathname.indexOf('/friends/all/') == -1){
						if(moreFriends){
							subscriptionContent.parentNode.removeChild(subscriptionContent);
							ffrElement = xpath(document, "//div[@rel='full_friends']").snapshotItem(0);
							ffrElement.style.display = 'block';
						}
					}
					removeDupes(fullFriendsContent);
					updateFriendNumbers();
					if(moreFriends)
						toggleFriendLists();
					friendLoad = true;
			}
		});
		//get content from all subscriptions page
		var subLocation = document.location.href.replace(/friends\//ig,'')+'subscriptions/';
		GM_xmlhttpRequest({
			method: 'GET',
			url: subLocation,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html',
			},
			onload: function(responseDetails) {
					//take content from all friends page
					var tempSubscribersContent = responseDetails.responseText.split('<div  class="listPeople mgnTop clearfix mgnBottom">');
					tempSubscribersContent = tempSubscribersContent[1].split('</div>');
					fullSubscribersContent.innerHTML = tempSubscribersContent[0];
					if(document.location.pathname.indexOf('/friends/all/') == -1){
						if(subscriberContent){
							subscriberContent.parentNode.removeChild(subscriberContent);
							fsElement = xpath(document, "//div[@rel='full_subscriptions']").snapshotItem(0);
							fsElement.style.display = 'block';
						}
					}
					removeDupes(fullSubscribersContent);
					updateSubNumbers();
					if(moreSubscriptions)
						toggleSubscriptionLists();
					subLoad = true;
			}
		});
	}
	checkLoad();
}

function checkLoad(){
	if(friendLoad == true && subLoad == true){
		document.getElementById('edit_bf').parentNode.style.display = "";
		writeBfs();
	}
	else
		setTimeout(checkLoad,100);
}

function removeDupes(section){
	allFriends = xpath(document,"//dl[contains(@class, 'vcardLg')]");
	var offset = 0;
	var toRemove = new Array();
	for(n=friendsList.length-1;n>=0;n--){
		for(i=0;i<allFriends.snapshotLength;i++){
			var linkName = allFriends.snapshotItem(i).firstChild.nextSibling.textContent;
			if(friendsList[n].split(',')[1] == linkName){
				//count bfs
				if(section.rel=='full_friends')
					friendBfs.push(linkName);
				if(section.rel=='full_subscriptions')
					subBfs.push(linkName);
				// check online status
				if(allFriends.snapshotItem(i).firstChild.nextSibling.nextSibling.nextSibling){
					//alert(allFriends.snapshotItem(i).firstChild.nextSibling.nextSibling.nextSibling.className);
					var tempFriend = friendsList[n];
					friendsList.splice(n,1);
					friendsList.splice(friendsList.length - offset, 0, tempFriend + ',1');
					offset++;
				}
				toRemove.push(i);
				break;
			}
		}
	}
	//remove nodes
	for(r=0;r<toRemove.length;r++)
		allFriends.snapshotItem(toRemove[r]).parentNode.removeChild(allFriends.snapshotItem(toRemove[r]));
}

function writeBfs(){
	fixAboutLinks();
	allFriends = xpath(document,"//dl[contains(@class, 'vcardLg')]");
	for(i=friendsList.length-1;i>=0;i--){
		var bf = friendsList[i].split(',');
		var bfOnline = '';
		var bfAbout = '';
		if(bf.length >= 3){
			var bfOnlineTitle = "";
			var bfImg = bf[0];
			var bfName = bf[1];
			var bfFavs = bf[2];
			if(bf[3]){
				var bfOnline = '<dd class="flairs"><img style="padding: 5px 5px 5px 0pt;" title="Online now" alt="Online now" src="http://cdn.stumble-upon.com/images/icon_online.gif"/></dd>';
				var bfOnlineTitle = ' | Online now';
			}
			var bfTitle = bfName + " || " + bfFavs + " favorites" + bfOnlineTitle;
			//if(aboutFlag == 1)
			//	bfAbout = 'about/';
			var newBf = document.createElement('dl');
			newBf.className = 'vcardLg bf';
			newBf.innerHTML = '<dd class="thumbnail borderGreen"><a class="tips" style="background-image: url(http://cdn.stumble-upon.com/'+bfImg+'.jpg);" title="'+bfTitle+'" href="http://'+bfName+'.stumbleupon.com/"/></dd><dt><a href="http://'+bfName.toLowerCase()+'.stumbleupon.com/">'+bfName+'</a></dt><dd class="stats"><a title="Stumble!|See '+bfName+'\'s favorites" class="tips" ondblclick="stumble_thru" href="http://www.stumbleupon.com/through.php?mode=user&amp;user='+bfName+'">'+bfFavs+' favs</a></dd>'+bfOnline;
			bfContent.appendChild(newBf);
		}
	}
}

function fixAboutLinks(){
	if(aboutFlag==1){
		var docLinks = xpath(document,'//a');
		for(i=0;i<docLinks.snapshotLength;i++){
			if(docLinks.snapshotItem(i).href.match(/^http:\/\/www|^http:\/\/buzz.stumbleupon|^javascript|.group.stumbleupon.com|about\/$/i) == null && docLinks.snapshotItem(i).href.indexOf('stumbleupon.com/') != -1 && docLinks.snapshotItem(i).href.indexOf('http://'+thisStumbler.toLowerCase()) == -1 && docLinks.snapshotItem(i).href.split('/').length < 5)
				docLinks.snapshotItem(i).href = docLinks.snapshotItem(i).href + 'about/';
		}
	}
}

function updateFriendNumbers(){
	if(friendBfs.length > 0){
		var plural = (friendBfs.length == 1) ? 'friend' : 'friends';
		var friendLabel = xpath(document, "//h1[contains(., 'Your friends')]").snapshotItem(0);
		var friendNumber = friendLabel.innerHTML.split('(')[1].replace(')', '');
		friendLabel.innerHTML = 'Your friends <span class="textXSm textNoEm textUncolor">(' + (parseInt(friendNumber) - friendBfs.length) + ' + ' + friendBfs.length + ' best ' + plural + ')</span>';
	}
}

function updateSubNumbers(){
	if(subBfs.length > 0){
		var plural = (subBfs.length == 1) ? 'friend' : 'friends';
		var yourSubscribersLabel = xpath(document, "//h1[contains(., 'Your subscriptions')]").snapshotItem(0);
		var yourSubscribersNumber = yourSubscribersLabel.innerHTML.split('(')[1].replace(')', '');
		yourSubscribersLabel.innerHTML = 'Your subscriptions <span class="textXSm textNoEm textUncolor">(' + (parseInt(yourSubscribersNumber) - subBfs.length) + ' + ' + subBfs.length + ' best ' + plural + ')</span>';
	}
}

function toggleFriendLists(){
	ffrElement = xpath(document, "//div[@rel='full_friends']").snapshotItem(0);
	var fullFriendsList = xpath(ffrElement,'dl');
	if(fullFriends == 1){
		moreFriends.innerHTML = 'Show all friends';
		fullFriends = 0;
		for(i=15;i<fullFriendsList.snapshotLength;i++)
			fullFriendsList.snapshotItem(i).style.display = 'none';
	}else{
		moreFriends.innerHTML = 'Show fewer friends';
		fullFriends = 1;
		for(i=15;i<fullFriendsList.snapshotLength;i++)
			fullFriendsList.snapshotItem(i).style.display = 'block';
	}
}

function toggleSubscriptionLists(){
	fsElement = xpath(document, "//div[@rel='full_subscriptions']").snapshotItem(0);
	var fullSubscribersList = xpath(fsElement,'dl');
	if(fullSubscribers == 1){
		moreSubscriptions.innerHTML = 'Show all subscriptions';
		fullSubscribers = 0;
		for(i=15;i<fullSubscribersList.snapshotLength;i++)
			fullSubscribersList.snapshotItem(i).style.display = 'none';
	}else{
		moreSubscriptions.innerHTML = 'Show fewer subscriptions';
		fullSubscribers = 1;
		for(i=15;i<fullSubscribersList.snapshotLength;i++)
			fullSubscribersList.snapshotItem(i).style.display = 'block';
	}
}

function markFriend(evt){
    if(evt){
		var elem = (evt.target) ? evt.target : evt.srcElement;
		if(elem.nodeName == "DL")
			markElem = elem;
		else if(elem.parentNode.nodeName == "DL")
			markElem = elem.parentNode;
		else if(elem.parentNode.parentNode.nodeName == "DL")
			markElem = elem.parentNode.parentNode;
		if(!markElem.style.backgroundColor){
			markElem.style.backgroundColor = bgColor;
		}else{
			markElem.style.backgroundColor = "";
		}
}
    return false;
}

function cancelEdit(){
	window.location.reload();
}

function editFriends(){
	allFriends = xpath(document,"//dl[contains(@class, 'vcardLg')]");
	if(editFlag == 0){
		//edit
		if(subscriberContent){
			if(moreFriends){
				fullFriends = 0;
				toggleFriendLists();
			}
			if(moreSubscriptions){
				fullSubscribers = 0;
				toggleSubscriptionLists();
			}
		}
		document.getElementById('edit_bf').innerHTML = 'Save best friends';
		document.getElementById('cancel_edit').parentNode.style.display = '';
		for(i=0;i<allFriends.snapshotLength;i++){
			if(allFriends.snapshotItem(i).childNodes.length <= 5){
				allFriends.snapshotItem(i).wrappedJSObject.addEventListener('click', markFriend, false);
				allFriends.snapshotItem(i).innerHTML = allFriends.snapshotItem(i).innerHTML.replace(/href=\"http:\/\/([^\.]+)\.stumbleupon.com\/\"|href=\"http:\/\/www\.stumbleupon\.com\/through\.php\?mode=user&amp;user=\w*\"/g,'href="javascript:void(0);" alt="$1"');
			}
		}
		editFlag=1;
	}else{
		//save
		for(i=0;i<allFriends.snapshotLength;i++){
			var friendLink = allFriends.snapshotItem(i).firstChild.nextSibling.firstChild;
			var friendImg = allFriends.snapshotItem(i).firstChild.firstChild;
			if(allFriends.snapshotItem(i).childNodes.length < 5)
				allFriends.snapshotItem(i).wrappedJSObject.removeEventListener('click', markFriend, false);
			if(allFriends.snapshotItem(i).className.match(/bf/)){
				//remove best friend
				if(friendLink && allFriends.snapshotItem(i).style.backgroundColor){
					var linkName = friendLink.textContent.replace(/^\s+|\s+$/g,"");
					for(n=0;n<friendsList.length;n++){
						if(friendsList[n].split(',')[1]==linkName)
							friendsList.splice(n,1);
					}
				}
			}else{
				//add best friend
				if(friendLink && allFriends.snapshotItem(i).style.backgroundColor){
					var friendImgSrc = friendImg.style.backgroundImage.replace(/url\(http:\/\/cdn\.stumble-upon\.com\/|\.jpg\)/ig,''); //add code to deal with no avatar
					var favs = friendLink.parentNode.nextSibling.textContent.replace(" favs","");
					friendsList.push(friendImgSrc+','+friendLink.getAttribute('alt')+','+favs);
				}
			}
		}
		editFlag=0;
		if(friendsList[0] == '')
			friendsList.shift();
		friendsPref = (friendsList.length > 0) ? friendsList.join(';').replace(/,online/ig,'') : '';
		GM_setValue(thisStumbler,friendsPref);
		window.location.reload();
	}
}

function sortFriends(a,b){
	a = a.toLowerCase().split(',')[1];
	b = b.toLowerCase().split(',')[1];
	if (a<b) return 1;
	if (a>b) return -1;
	return 0;
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 18 2008 by Nathan Blume

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9\.]+)/);
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						SkipWeeklyUpdateCheck();
						if(manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                }
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}
// ==UserScript==
// @name           Reddit Max Dark
// @namespace      Reddit
// @include        http://www.reddit.com/*
// ==/UserScript==

if (location.href.match(/comscore-iframe/i)) {
	// do nothing. but we can't return false if we want this working for opera later, because apparently Opera doesn't like that.
	return false;
} 

var myList = document.getElementById('sr-header-area').getElementsByClassName('dropdown');
var loggedIn = false;
if (myList.length == 1)
{
	loggedIn=true;
}

var popList = '';
var popBar = document.getElementById('sr-bar').getElementsByTagName('a');
var specBar = document.getElementById('sr-header-area').getElementsByTagName('ul')[0].getElementsByTagName('a');
for (i=0; i<specBar.length; i++) popList += '<a class="choice " href="' + specBar[i] + '">' + specBar[i].innerHTML + '</a>';
for (i=0; i<popBar.length; i++) popList += '<a class="choice " href="' + popBar[i] + '">' + popBar[i].innerHTML + '</a>';

var dropData = new Array();
var dropClassNames = new Array();
var dropOnClick = new Array();

if (loggedIn)
{
myList[0].setAttribute('onclick', '$(this).siblings(".drop-choices.srdrop").not(".inuse").addClass("active inuse");');
document.getElementById('header-bottom-right').style.display = 'none';

var havemail = false;
var isMod = false;
var modHaveMail = false;

if (document.getElementById('mail').className == 'havemail') havemail=true;
if (document.getElementById('modmail'))
{
	isMod=true;
	if (document.getElementById('modmail').className == 'havemail') modHaveMail=true;
}

var userName = document.getElementById('header-bottom-right').getElementsByClassName('user')[0].getElementsByTagName('a')[0];
var userKarma = document.getElementById('header-bottom-right').getElementsByClassName('user')[0].getElementsByTagName('b')[0];
var logOutForm = document.getElementById('header-bottom-right').getElementsByClassName('logout ')[0];
var userList = '';
var imgList = '';

userList += '<a class="choice " href="http://www.reddit.com/submit">submit content</a>';
userList += '<a class="choice " href="http://www.reddit.com/reddits/create">create sub-reddit</a>';
userList += '<a class="choice " href="http://www.reddit.com/reddits/">edit subscriptions</a>';
userList += '<form class="logout hover" action="/logout" method="post">' + logOutForm.innerHTML + '</form>';

userList += '<span class="subMenu">User Overview</span>';
userList += '<a class="choice " href="' + userName + '">overview</a>';
userList += '<a class="choice " href="' + userName + 'comments">comments</a>';
userList += '<a class="choice " href="' + userName + 'submitted">posted</a>';
userList += '<a class="choice " href="' + userName + 'liked">liked</a>';
userList += '<a class="choice " href="' + userName + 'disliked">disliked</a>';
userList += '<a class="choice " href="' + userName + 'hidden">hidden</a>';

userList += '<span class="subMenu">Inbox</span>';
userList += '<a class="choice " href="http://www.reddit.com/message/compose/">compose</a>';
userList += '<a class="choice " href="http://www.reddit.com/message/sent/">sent</a>';
userList += '<a class="choice " href="http://www.reddit.com/message/inbox/">all</a>';
if (havemail) userList += '<a class="choice newmail" href="http://www.reddit.com/message/unread/">unread</a>';
else userList += '<a class="choice " href="http://www.reddit.com/message/unread/">unread</a>';
userList += '<a class="choice " href="http://www.reddit.com/message/messages/">messages</a>';
userList += '<a class="choice " href="http://www.reddit.com/message/comments/">comment replies</a>';
userList += '<a class="choice " href="http://www.reddit.com/message/selfreply/">post replies</a>';

if (isMod)
{
	userList += '<span class="subMenu">Mod Inbox</span>';
	userList += '<a class="choice " href="http://www.reddit.com/message/moderator/inbox/">all moderator mail</a>';
	if (modHaveMail) userList += '<a class="choice newmail" href="http://www.reddit.com/message/moderator/unread/">unread moderator mail</a>';
	else userList += '<a class="choice " href="http://www.reddit.com/message/moderator/unread/">unread moderator mail</a>';
}

userList += '<span class="subMenu">Preferences</span>';
userList += '<a class="choice " href="http://www.reddit.com/prefs/">options</a>';
userList += '<a class="choice " href="http://www.reddit.com/prefs/feeds/">RSS feeds</a>';
userList += '<a class="choice " href="http://www.reddit.com/prefs/friends/">mates</a>';
userList += '<a class="choice " href="http://www.reddit.com/prefs/update/">password/e-mail</a>';
userList += '<a class="choice " href="http://www.reddit.com/prefs/delete/">delete</a>';

dropData[0] = '<span class="selected title">popular</span>';
if (havemail) dropData[1] = '<span class="selected title"><img src="/static/mail.png" alt="messages"> ' + userName.innerHTML + ' (' + userKarma.innerHTML + ')' + '</span>';
else dropData[1] = '<span class="selected title"><img src="/static/mailgray.png" alt="messages"> ' + userName.innerHTML + ' (' + userKarma.innerHTML + ')' + '</span>';
dropData[2] = popList;
dropData[3] = userList;
dropData[4] = 'hide sidebar';
dropData[5] = 'compress links';
dropData[6] = '<a href="http://www.reddit.com/">home</a>';

dropClassNames[0] = 'dropdown popbar ';
dropClassNames[1] = 'dropdown userbar ';
dropClassNames[2] = 'drop-choices popbar ';
dropClassNames[3] = 'drop-choices userbar ';
dropClassNames[4] = 'toggleSidebar';
dropClassNames[5] = 'max';
dropClassNames[6] = 'myhome';

dropOnClick[0] = '$(this).siblings(".drop-choices.popbar").not(".inuse").addClass("active inuse");';
dropOnClick[1] = '$(this).siblings(".drop-choices.userbar").not(".inuse").addClass("active inuse");';
dropOnClick[2] = '';
dropOnClick[3] = '';
dropOnClick[4] = '$(".side").toggleClass("hide"); $(".sitetable").toggleClass("full-width"); $("#siteTable_organic").toggleClass("full-width"); $(".searchpane").prev().attr("style","float:right; margin:15px;"); $(".searchpane").toggleClass("full-width"); $(".infobar").toggleClass("full-width"); if(this.innerHTML=="hide sidebar"){this.innerHTML="show sidebar";} else{this.innerHTML="hide sidebar";}'; 
dropOnClick[5] = '$(".link .rank").toggleClass("maximise"); $(".link .midcol").toggleClass("maximise"); $(".link .midcol .arrow").toggleClass("maximise"); $(".link .midcol .score").toggleClass("maximise"); $(".link .thumbnail").toggleClass("maximise"); $(".link .entry .title").toggleClass("maximise"); $(".link .entry .expando-button").toggleClass("maximise"); $(".link .entry .tagline").toggleClass("maximise"); $(".link .entry .buttons").toggleClass("maximise"); if(this.innerHTML=="compress links"){this.innerHTML="expand links"; if(this.previousSibling.innerHTML=="hide sidebar") $(this).prev().click();} else{this.innerHTML="compress links"; if(this.previousSibling.innerHTML=="show sidebar") $(this).prev().click();}';
dropOnClick[6] = '';
}
else
{
dropData[0] = '<span class="selected title">popular</span>';
dropData[1] = popList;
dropData[2] = 'compress links';
dropData[3] = 'compress links';
dropData[4] = '<a href="http://www.reddit.com/">home</a>';

dropClassNames[0] = 'dropdown popbar ';
dropClassNames[1] = 'drop-choices popbar ';
dropClassNames[2] = 'toggleSidebar';
dropClassNames[3] = 'max';
dropClassNames[4] = 'myhome';

dropOnClick[0] = '$(this).siblings(".drop-choices.popbar").not(".inuse").addClass("active inuse");';
dropOnClick[1] = '';
dropOnClick[2] = '';
dropOnClick[3] = '';
dropOnClick[4] = '';
}

menu = document.getElementById('sr-header-area');
menuEnd = menu.getElementsByTagName('ul')[0];

for (i=0; i<dropData.length; i++) {
  var menuItem = document.createElement('div');
  if (dropClassNames[i] != '') menuItem.className = dropClassNames[i];
  if (dropOnClick[i] != '') menuItem.setAttribute('onclick', dropOnClick[i]);
  menuItem.innerHTML = dropData[i];
  menu.insertBefore(menuItem, menuEnd);
}

side = document.getElementsByClassName('side')[0];

if (side)
{
	headerImg = document.getElementById('header-img-a');
	sideSpacer = side.getElementsByTagName('div')[0];
	sideImg = document.createElement('div');
	sideImg.className = 'spacer';
	sideImg.innerHTML = '<a id="side-header-img-a" href="' + headerImg + '" title="' + headerImg.getAttribute('title') + '">' + headerImg.innerHTML + '</a>';
	side.insertBefore(sideImg, sideSpacer);
}

var siteLinks = document.getElementsByClassName('link');
var comments = document.getElementsByClassName('usertext-body');


for (var i = 0; i < comments.length; i++)
{
	var replies = comments[i].parentNode.parentNode.parentNode.nextSibling.getElementsByClassName('comment');
	var buttonID = comments[i].parentNode.id + '_buttons';
	
	if (replies.length > 0)
	{
		// Show/hide replies for commment
		var toggleReplies = document.createElement('li');
		toggleReplies.className = 'toggleReplies';
		toggleReplies.setAttribute('style', 'display: inline;');
		toggleReplies.innerHTML = '<a href="javascript:void(0);" name="' + buttonID + '" onclick="if(this.innerHTML==\'hide replies\'){this.innerHTML=\'show replies\'; this.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display=\'none\';}else{this.innerHTML=\'hide replies\'; this.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display=\'block\';}">hide replies</a>';
		comments[i].parentNode.nextSibling.appendChild(toggleReplies);
	}
	
	var userLinks = comments[i].getElementsByTagName('a');
	if (userLinks)
	{
		var imageCount = 0;
		
		// Show/hide individual image in comment
		for (var ib=0; ib<userLinks.length; ib++)
		{
			var imgID = comments[i].parentNode.id + '_img-' + ib;
			var imgURL = new String(userLinks[ib]);
			
			if (imgURL.indexOf('.jpg') == imgURL.length - 4 || imgURL.indexOf('.gif') == imgURL.length - 4 || imgURL.indexOf('.png') == imgURL.length - 4)
			{
				imageCount++;
				
				var imgExpand = document.createElement('div');
				imgExpand.className = 'imgExpando';
				imgExpand.setAttribute('style', 'display: inline;');
				imgExpand.innerHTML = '<a onclick="if(this.innerHTML==\'[+]\'){this.innerHTML=\'[-]\'; this.parentNode.nextSibling.style.display=\'block\';} else{this.innerHTML=\'[+]\'; this.parentNode.nextSibling.style.display=\'none\';}" name="' + imgID + '">[+]</a>';				
				
				var imgEl = document.createElement('div');
				imgEl.className = 'imgDiv';
				imgEl.setAttribute('style', 'display: none;');
				imgEl.innerHTML = '<img style="display: block; width: 100%;" src="' + imgURL + '" alt="Imgur Image" />';

				var imgCollapse = document.createElement('div');
				imgCollapse.className = 'imgCollapso';
				imgCollapse.innerHTML = '<a onclick="$(this).parent().parent().prev().children().click();" href="#' + imgID + '">Hide</a>';
				
				imgEl.appendChild(imgCollapse);
				userLinks[ib].parentNode.insertBefore(imgExpand, userLinks[ib].nextSibling);
				userLinks[ib].parentNode.insertBefore(imgEl, userLinks[ib].nextSibling.nextSibling);
			}
		}
		
		// Show/hide all images for a single comment
		if (imageCount)
		{
			var showImagesFunc = 'var imageSet=this.parentNode.nextSibling.getElementsByClassName("imgExpando");for(var ib=0;ib<imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML="[-]"; imageSet[ib].nextSibling.style.display="block";}';
			
			var hideImagesFunc = 'var imageSet=this.parentNode.nextSibling.getElementsByClassName("imgExpando");for(var ib=0;ib<imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML="[+]"; imageSet[ib].nextSibling.style.display="none";}';
			
			var collapseImagesFunc = 'var imageSet=this.parentNode.previousSibling.getElementsByClassName("imgExpando");for(var ib=0;ib<imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML="[+]";imageSet[ib].nextSibling.style.display="none";}';
			
			var imgAll = document.createElement('div');
			imgAll.className = 'showImages';
			imgAll.setAttribute('style', 'display: inline');
			imgAll.setAttribute('onclick', showImagesFunc);
			imgAll.innerHTML = '[+]';
			
			imgNone = document.createElement('div');
			imgNone.className = 'hideImages';
			imgNone.setAttribute('style', 'display: inline');
			imgNone.setAttribute('onclick', hideImagesFunc);
			imgNone.innerHTML = '[-]';
			
			var imgCollapse = document.createElement('li');
			imgCollapse.className = 'collapseImages';
			imgCollapse.setAttribute('style', 'display: inline');
			imgCollapse.innerHTML = '<a href="#' + buttonID + '" onclick="var imageSet=this.parentNode.parentNode.previousSibling.getElementsByClassName(\'imgExpando\');for(var ib=0;ib<imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML=\'[+]\';imageSet[ib].nextSibling.style.display=\'none\';}">hide images</a>';
			
			if (comments[i].parentNode.parentNode.className == 'expando')
			{
				comments[i].parentNode.parentNode.previousSibling.appendChild(imgAll);
				comments[i].parentNode.parentNode.previousSibling.appendChild(imgNone);
				comments[i].parentNode.parentNode.nextSibling.appendChild(imgCollapse);
			}
			else
			{
				comments[i].parentNode.previousSibling.appendChild(imgAll);
				comments[i].parentNode.previousSibling.appendChild(imgNone);
				comments[i].parentNode.nextSibling.appendChild(imgCollapse);
			}
		}
	}
}

// Show/hide individual images in listings
for (var i = 0; i < siteLinks.length; i++)
{
	var entry = siteLinks[i].getElementsByClassName('entry')[0];
	var title = new String(entry.firstChild.firstChild);
	var expandoPos = entry.firstChild.nextSibling;
	var expandoDiv = entry.lastChild;
	var loadingSpan = entry.lastChild.firstChild;
	
	if (title.indexOf('.jpg') == title.length - 4 || title.indexOf('.gif') == title.length - 4 || title.indexOf('.png') == title.length - 4)
	{
		var expandoButton = document.createElement('div');
		expandoButton.className = 'expando-button collapsed image';
		expandoButton.setAttribute('onclick', 'if($(this).hasClass("collapsed")){this.parentNode.lastChild.style.display="block"; $(this).removeClass("collapsed").addClass("expanded");}else{this.parentNode.lastChild.style.display="none"; $(this).removeClass("expanded").addClass("collapsed");}');

		entry.insertBefore(expandoButton, expandoPos);
		
		var linkID = siteLinks[i].className.split(" ")[2];		
		var linkEl = document.createElement('div');
		linkEl.innerHTML = '<a name="' + linkID + '"></a>';		
		siteLinks[i].insertBefore(linkEl, siteLinks[i].firstChild);		
				
		var imgEl = document.createElement('div');
		imgEl.className = 'expandoImage';
		imgEl.innerHTML = '<img src="' + title + '" alt="image" />';
		expandoDiv.replaceChild(imgEl, loadingSpan);
		
		var imgCollapse = document.createElement('div');
		imgCollapse.className = 'expandoCollapse';
		imgCollapse.innerHTML = '<a onclick="$(this).parent().parent().siblings(\'.expando-button.image\').click();" href="#' + linkID + '">Hide</a>';
		expandoDiv.appendChild(imgCollapse);
	}
}

// Header menu items, show/hide all images on page
if (document.getElementsByClassName('expando-button image').length > 0 || document.getElementsByClassName('showImages').length > 0)
{
	var headerMain = document.getElementById('header-bottom-left')

	var imgMenuTitle = document.createElement('span');
	imgMenuTitle.className = 'imgMenuTitle';
	imgMenuTitle.innerHTML = 'images';

	var imgMenu = document.createElement('ul');
	imgMenu.className = 'imgMenu';

	var imgMenuAll = document.createElement('li');
	imgMenuAll.setAttribute('onclick', 'if(this.className != "selected"){this.className="selected"; this.nextSibling.className="";} $(".expando-button.collapsed.image").each(function(){$(this).click();}); $(".showImages").each(function(){$(this).click();});');
	imgMenuAll.innerHTML = '<a href="javascript:void(0);">all</a>';

	var imgMenuNone = document.createElement('li');
	imgMenuNone.className = 'selected';
	imgMenuNone.setAttribute('onclick', 'if(this.className != "selected"){this.className="selected"; this.previousSibling.className="";} $(".expando-button.expanded.image").each(function(){$(this).click();}); $(".hideImages").each(function(){$(this).click();});');
	imgMenuNone.innerHTML = '<a href="javascript:void(0);">none</a>';

	imgMenu.appendChild(imgMenuAll);
	imgMenu.appendChild(imgMenuNone);
	headerMain.appendChild(imgMenuTitle);
	headerMain.appendChild(imgMenu);
}

textBoxes = document.getElementsByTagName('input');
for (var i=0; i<textBoxes.length; i++)
{
	textBoxes[i].style.border = '1px solid #111111';
	textBoxes[i].style.backgroundColor = '#000000';
	textBoxes[i].style.color = '#999999';
}

textAreas = document.getElementsByTagName('textarea');
for (var i=0; i<textAreas.length; i++)
{
	textAreas[i].style.border = '1px solid #111111';
	textAreas[i].style.backgroundColor = '#000000';
	textAreas[i].style.color = '#999999';
}

selectBoxes = document.getElementsByTagName('select');
for (var i=0; i<selectBoxes.length; i++)
{
	selectBoxes[i].style.border = '1px solid #111111';
	selectBoxes[i].style.backgroundColor = '#000000';
	selectBoxes[i].style.color = '#6699CC';
}

formButtons = document.getElementsByTagName('button');
for (var i=0; i<formButtons.length; i++)
{
	formButtons[i].style.border = '1px solid #111111';
	formButtons[i].style.backgroundColor = '#000000';
	formButtons[i].style.color = '#999999';
	formButtons[i].style.textTransform = 'capitalize';
}

var expandoButtons = document.getElementsByClassName('expando-button');

for (var i = 0; i < expandoButtons.length; i++)
{
	var expandoClass = new String(expandoButtons[i].className);
	
	var expandoButtonType = document.createElement('div');
	expandoButtonType.className = 'type';
	
	if (expandoClass.indexOf('image') > 0) expandoButtonType.innerHTML = '&#9788;';
	else if (expandoClass.indexOf('selftext') > 0) expandoButtonType.innerHTML = 'Aa';
	else if (expandoClass.indexOf('video') > 0) expandoButtonType.innerHTML = '&#9658;';
	
	var expandoButtonAction = document.createElement('div');
	expandoButtonAction.className = 'action';
	
	expandoButtons[i].appendChild(expandoButtonType);
	expandoButtons[i].appendChild(expandoButtonAction);
}
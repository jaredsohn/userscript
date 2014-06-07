<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
			<title>RAW OUTPUT jyHjWyn3</title>
			<meta name="robots" content="noindex, nofollow" />
		</head>
		<body>
			<pre>// ==UserScript==
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
for (i=0; i&lt;specBar.length; i++) popList += '&lt;a class=&quot;choice &quot; href=&quot;' + specBar[i] + '&quot;&gt;' + specBar[i].innerHTML + '&lt;/a&gt;';
for (i=0; i&lt;popBar.length; i++) popList += '&lt;a class=&quot;choice &quot; href=&quot;' + popBar[i] + '&quot;&gt;' + popBar[i].innerHTML + '&lt;/a&gt;';

var dropData = new Array();
var dropClassNames = new Array();
var dropOnClick = new Array();

if (loggedIn)
{
myList[0].setAttribute('onclick', '$(this).siblings(&quot;.drop-choices.srdrop&quot;).not(&quot;.inuse&quot;).addClass(&quot;active inuse&quot;);');
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

userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/submit&quot;&gt;submit content&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/reddits/create&quot;&gt;create sub-reddit&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/reddits/&quot;&gt;edit subscriptions&lt;/a&gt;';
userList += '&lt;form class=&quot;logout hover&quot; action=&quot;/logout&quot; method=&quot;post&quot;&gt;' + logOutForm.innerHTML + '&lt;/form&gt;';

userList += '&lt;span class=&quot;subMenu&quot;&gt;User Overview&lt;/span&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;' + userName + '&quot;&gt;overview&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;' + userName + 'comments&quot;&gt;comments&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;' + userName + 'submitted&quot;&gt;posted&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;' + userName + 'liked&quot;&gt;liked&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;' + userName + 'disliked&quot;&gt;disliked&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;' + userName + 'hidden&quot;&gt;hidden&lt;/a&gt;';

userList += '&lt;span class=&quot;subMenu&quot;&gt;Inbox&lt;/span&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/compose/&quot;&gt;compose&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/sent/&quot;&gt;sent&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/inbox/&quot;&gt;all&lt;/a&gt;';
if (havemail) userList += '&lt;a class=&quot;choice newmail&quot; href=&quot;http://www.reddit.com/message/unread/&quot;&gt;unread&lt;/a&gt;';
else userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/unread/&quot;&gt;unread&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/messages/&quot;&gt;messages&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/comments/&quot;&gt;comment replies&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/selfreply/&quot;&gt;post replies&lt;/a&gt;';

if (isMod)
{
	userList += '&lt;span class=&quot;subMenu&quot;&gt;Mod Inbox&lt;/span&gt;';
	userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/moderator/inbox/&quot;&gt;all moderator mail&lt;/a&gt;';
	if (modHaveMail) userList += '&lt;a class=&quot;choice newmail&quot; href=&quot;http://www.reddit.com/message/moderator/unread/&quot;&gt;unread moderator mail&lt;/a&gt;';
	else userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/message/moderator/unread/&quot;&gt;unread moderator mail&lt;/a&gt;';
}

userList += '&lt;span class=&quot;subMenu&quot;&gt;Preferences&lt;/span&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/prefs/&quot;&gt;options&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/prefs/feeds/&quot;&gt;RSS feeds&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/prefs/friends/&quot;&gt;mates&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/prefs/update/&quot;&gt;password/e-mail&lt;/a&gt;';
userList += '&lt;a class=&quot;choice &quot; href=&quot;http://www.reddit.com/prefs/delete/&quot;&gt;delete&lt;/a&gt;';

dropData[0] = '&lt;span class=&quot;selected title&quot;&gt;popular&lt;/span&gt;';
if (havemail) dropData[1] = '&lt;span class=&quot;selected title&quot;&gt;&lt;img src=&quot;/static/mail.png&quot; alt=&quot;messages&quot;&gt; ' + userName.innerHTML + ' (' + userKarma.innerHTML + ')' + '&lt;/span&gt;';
else dropData[1] = '&lt;span class=&quot;selected title&quot;&gt;&lt;img src=&quot;/static/mailgray.png&quot; alt=&quot;messages&quot;&gt; ' + userName.innerHTML + ' (' + userKarma.innerHTML + ')' + '&lt;/span&gt;';
dropData[2] = popList;
dropData[3] = userList;
dropData[4] = 'hide sidebar';
dropData[5] = 'compress links';
dropData[6] = '&lt;a href=&quot;http://www.reddit.com/&quot;&gt;home&lt;/a&gt;';

dropClassNames[0] = 'dropdown popbar ';
dropClassNames[1] = 'dropdown userbar ';
dropClassNames[2] = 'drop-choices popbar ';
dropClassNames[3] = 'drop-choices userbar ';
dropClassNames[4] = 'toggleSidebar';
dropClassNames[5] = 'max';
dropClassNames[6] = 'myhome';

dropOnClick[0] = '$(this).siblings(&quot;.drop-choices.popbar&quot;).not(&quot;.inuse&quot;).addClass(&quot;active inuse&quot;);';
dropOnClick[1] = '$(this).siblings(&quot;.drop-choices.userbar&quot;).not(&quot;.inuse&quot;).addClass(&quot;active inuse&quot;);';
dropOnClick[2] = '';
dropOnClick[3] = '';
dropOnClick[4] = '$(&quot;.side&quot;).toggleClass(&quot;hide&quot;); $(&quot;.sitetable&quot;).toggleClass(&quot;full-width&quot;); $(&quot;#siteTable_organic&quot;).toggleClass(&quot;full-width&quot;); $(&quot;.searchpane&quot;).prev().attr(&quot;style&quot;,&quot;float:right; margin:15px;&quot;); $(&quot;.searchpane&quot;).toggleClass(&quot;full-width&quot;); $(&quot;.infobar&quot;).toggleClass(&quot;full-width&quot;); if(this.innerHTML==&quot;hide sidebar&quot;){this.innerHTML=&quot;show sidebar&quot;;} else{this.innerHTML=&quot;hide sidebar&quot;;}'; 
dropOnClick[5] = '$(&quot;.link .rank&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .midcol&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .midcol .arrow&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .midcol .score&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .thumbnail&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .entry .title&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .entry .expando-button&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .entry .tagline&quot;).toggleClass(&quot;maximise&quot;); $(&quot;.link .entry .buttons&quot;).toggleClass(&quot;maximise&quot;); if(this.innerHTML==&quot;compress links&quot;){this.innerHTML=&quot;expand links&quot;; if(this.previousSibling.innerHTML==&quot;hide sidebar&quot;) $(this).prev().click();} else{this.innerHTML=&quot;compress links&quot;; if(this.previousSibling.innerHTML==&quot;show sidebar&quot;) $(this).prev().click();}';
dropOnClick[6] = '';
}
else
{
dropData[0] = '&lt;span class=&quot;selected title&quot;&gt;popular&lt;/span&gt;';
dropData[1] = popList;
dropData[2] = 'compress links';
dropData[3] = 'compress links';
dropData[4] = '&lt;a href=&quot;http://www.reddit.com/&quot;&gt;home&lt;/a&gt;';

dropClassNames[0] = 'dropdown popbar ';
dropClassNames[1] = 'drop-choices popbar ';
dropClassNames[2] = 'toggleSidebar';
dropClassNames[3] = 'max';
dropClassNames[4] = 'myhome';

dropOnClick[0] = '$(this).siblings(&quot;.drop-choices.popbar&quot;).not(&quot;.inuse&quot;).addClass(&quot;active inuse&quot;);';
dropOnClick[1] = '';
dropOnClick[2] = '';
dropOnClick[3] = '';
dropOnClick[4] = '';
}

menu = document.getElementById('sr-header-area');
menuEnd = menu.getElementsByTagName('ul')[0];

for (i=0; i&lt;dropData.length; i++) {
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
	sideImg.innerHTML = '&lt;a id=&quot;side-header-img-a&quot; href=&quot;' + headerImg + '&quot; title=&quot;' + headerImg.getAttribute('title') + '&quot;&gt;' + headerImg.innerHTML + '&lt;/a&gt;';
	side.insertBefore(sideImg, sideSpacer);
}

var siteLinks = document.getElementsByClassName('link');
var comments = document.getElementsByClassName('usertext-body');


for (var i = 0; i &lt; comments.length; i++)
{
	var replies = comments[i].parentNode.parentNode.parentNode.nextSibling.getElementsByClassName('comment');
	var buttonID = comments[i].parentNode.id + '_buttons';
	
	if (replies.length &gt; 0)
	{
		// Show/hide replies for commment
		var toggleReplies = document.createElement('li');
		toggleReplies.className = 'toggleReplies';
		toggleReplies.setAttribute('style', 'display: inline;');
		toggleReplies.innerHTML = '&lt;a href=&quot;javascript:void(0);&quot; name=&quot;' + buttonID + '&quot; onclick=&quot;if(this.innerHTML==\'hide replies\'){this.innerHTML=\'show replies\'; this.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display=\'none\';}else{this.innerHTML=\'hide replies\'; this.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display=\'block\';}&quot;&gt;hide replies&lt;/a&gt;';
		comments[i].parentNode.nextSibling.appendChild(toggleReplies);
	}
	
	var userLinks = comments[i].getElementsByTagName('a');
	if (userLinks)
	{
		var imageCount = 0;
		
		// Show/hide individual image in comment
		for (var ib=0; ib&lt;userLinks.length; ib++)
		{
			var imgID = comments[i].parentNode.id + '_img-' + ib;
			var imgURL = new String(userLinks[ib]);
			
			if (imgURL.indexOf('.jpg') == imgURL.length - 4 || imgURL.indexOf('.gif') == imgURL.length - 4 || imgURL.indexOf('.png') == imgURL.length - 4)
			{
				imageCount++;
				
				var imgExpand = document.createElement('div');
				imgExpand.className = 'imgExpando';
				imgExpand.setAttribute('style', 'display: inline;');
				imgExpand.innerHTML = '&lt;a onclick=&quot;if(this.innerHTML==\'[+]\'){this.innerHTML=\'[-]\'; this.parentNode.nextSibling.style.display=\'block\';} else{this.innerHTML=\'[+]\'; this.parentNode.nextSibling.style.display=\'none\';}&quot; name=&quot;' + imgID + '&quot;&gt;[+]&lt;/a&gt;';				
				
				var imgEl = document.createElement('div');
				imgEl.className = 'imgDiv';
				imgEl.setAttribute('style', 'display: none;');
				imgEl.innerHTML = '&lt;img style=&quot;display: block; width: 100%;&quot; src=&quot;' + imgURL + '&quot; alt=&quot;Imgur Image&quot; /&gt;';

				var imgCollapse = document.createElement('div');
				imgCollapse.className = 'imgCollapso';
				imgCollapse.innerHTML = '&lt;a onclick=&quot;$(this).parent().parent().prev().children().click();&quot; href=&quot;#' + imgID + '&quot;&gt;Hide&lt;/a&gt;';
				
				imgEl.appendChild(imgCollapse);
				userLinks[ib].parentNode.insertBefore(imgExpand, userLinks[ib].nextSibling);
				userLinks[ib].parentNode.insertBefore(imgEl, userLinks[ib].nextSibling.nextSibling);
			}
		}
		
		// Show/hide all images for a single comment
		if (imageCount)
		{
			var showImagesFunc = 'var imageSet=this.parentNode.nextSibling.getElementsByClassName(&quot;imgExpando&quot;);for(var ib=0;ib&lt;imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML=&quot;[-]&quot;; imageSet[ib].nextSibling.style.display=&quot;block&quot;;}';
			
			var hideImagesFunc = 'var imageSet=this.parentNode.nextSibling.getElementsByClassName(&quot;imgExpando&quot;);for(var ib=0;ib&lt;imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML=&quot;[+]&quot;; imageSet[ib].nextSibling.style.display=&quot;none&quot;;}';
			
			var collapseImagesFunc = 'var imageSet=this.parentNode.previousSibling.getElementsByClassName(&quot;imgExpando&quot;);for(var ib=0;ib&lt;imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML=&quot;[+]&quot;;imageSet[ib].nextSibling.style.display=&quot;none&quot;;}';
			
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
			imgCollapse.innerHTML = '&lt;a href=&quot;#' + buttonID + '&quot; onclick=&quot;var imageSet=this.parentNode.parentNode.previousSibling.getElementsByClassName(\'imgExpando\');for(var ib=0;ib&lt;imageSet.length;ib++) {imageSet[ib].firstChild.innerHTML=\'[+]\';imageSet[ib].nextSibling.style.display=\'none\';}&quot;&gt;hide images&lt;/a&gt;';
			
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
for (var i = 0; i &lt; siteLinks.length; i++)
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
		expandoButton.setAttribute('onclick', 'if($(this).hasClass(&quot;collapsed&quot;)){this.parentNode.lastChild.style.display=&quot;block&quot;; $(this).removeClass(&quot;collapsed&quot;).addClass(&quot;expanded&quot;);}else{this.parentNode.lastChild.style.display=&quot;none&quot;; $(this).removeClass(&quot;expanded&quot;).addClass(&quot;collapsed&quot;);}');

		entry.insertBefore(expandoButton, expandoPos);
		
		var linkID = siteLinks[i].className.split(&quot; &quot;)[2];		
		var linkEl = document.createElement('div');
		linkEl.innerHTML = '&lt;a name=&quot;' + linkID + '&quot;&gt;&lt;/a&gt;';		
		siteLinks[i].insertBefore(linkEl, siteLinks[i].firstChild);		
				
		var imgEl = document.createElement('div');
		imgEl.className = 'expandoImage';
		imgEl.innerHTML = '&lt;img src=&quot;' + title + '&quot; alt=&quot;image&quot; /&gt;';
		expandoDiv.replaceChild(imgEl, loadingSpan);
		
		var imgCollapse = document.createElement('div');
		imgCollapse.className = 'expandoCollapse';
		imgCollapse.innerHTML = '&lt;a onclick=&quot;$(this).parent().parent().siblings(\'.expando-button.image\').click();&quot; href=&quot;#' + linkID + '&quot;&gt;Hide&lt;/a&gt;';
		expandoDiv.appendChild(imgCollapse);
	}
}

// Header menu items, show/hide all images on page
if (document.getElementsByClassName('expando-button image').length &gt; 0 || document.getElementsByClassName('showImages').length &gt; 0)
{
	var headerMain = document.getElementById('header-bottom-left')

	var imgMenuTitle = document.createElement('span');
	imgMenuTitle.className = 'imgMenuTitle';
	imgMenuTitle.innerHTML = 'images';

	var imgMenu = document.createElement('ul');
	imgMenu.className = 'imgMenu';

	var imgMenuAll = document.createElement('li');
	imgMenuAll.setAttribute('onclick', 'if(this.className != &quot;selected&quot;){this.className=&quot;selected&quot;; this.nextSibling.className=&quot;&quot;;} $(&quot;.expando-button.collapsed.image&quot;).each(function(){$(this).click();}); $(&quot;.showImages&quot;).each(function(){$(this).click();});');
	imgMenuAll.innerHTML = '&lt;a href=&quot;javascript:void(0);&quot;&gt;all&lt;/a&gt;';

	var imgMenuNone = document.createElement('li');
	imgMenuNone.className = 'selected';
	imgMenuNone.setAttribute('onclick', 'if(this.className != &quot;selected&quot;){this.className=&quot;selected&quot;; this.previousSibling.className=&quot;&quot;;} $(&quot;.expando-button.expanded.image&quot;).each(function(){$(this).click();}); $(&quot;.hideImages&quot;).each(function(){$(this).click();});');
	imgMenuNone.innerHTML = '&lt;a href=&quot;javascript:void(0);&quot;&gt;none&lt;/a&gt;';

	imgMenu.appendChild(imgMenuAll);
	imgMenu.appendChild(imgMenuNone);
	headerMain.appendChild(imgMenuTitle);
	headerMain.appendChild(imgMenu);
}

textBoxes = document.getElementsByTagName('input');
for (var i=0; i&lt;textBoxes.length; i++)
{
	textBoxes[i].style.border = '1px solid #111111';
	textBoxes[i].style.backgroundColor = '#000000';
	textBoxes[i].style.color = '#999999';
}

textAreas = document.getElementsByTagName('textarea');
for (var i=0; i&lt;textAreas.length; i++)
{
	textAreas[i].style.border = '1px solid #111111';
	textAreas[i].style.backgroundColor = '#000000';
	textAreas[i].style.color = '#999999';
}

selectBoxes = document.getElementsByTagName('select');
for (var i=0; i&lt;selectBoxes.length; i++)
{
	selectBoxes[i].style.border = '1px solid #111111';
	selectBoxes[i].style.backgroundColor = '#000000';
	selectBoxes[i].style.color = '#6699CC';
}

formButtons = document.getElementsByTagName('button');
for (var i=0; i&lt;formButtons.length; i++)
{
	formButtons[i].style.border = '1px solid #111111';
	formButtons[i].style.backgroundColor = '#000000';
	formButtons[i].style.color = '#999999';
	formButtons[i].style.textTransform = 'capitalize';
}

var expandoButtons = document.getElementsByClassName('expando-button');

for (var i = 0; i &lt; expandoButtons.length; i++)
{
	var expandoClass = new String(expandoButtons[i].className);
	
	var expandoButtonType = document.createElement('div');
	expandoButtonType.className = 'type';
	
	if (expandoClass.indexOf('image') &gt; 0) expandoButtonType.innerHTML = '&amp;#9788;';
	else if (expandoClass.indexOf('selftext') &gt; 0) expandoButtonType.innerHTML = 'Aa';
	else if (expandoClass.indexOf('video') &gt; 0) expandoButtonType.innerHTML = '&amp;#9658;';
	
	var expandoButtonAction = document.createElement('div');
	expandoButtonAction.className = 'action';
	
	expandoButtons[i].appendChild(expandoButtonType);
	expandoButtons[i].appendChild(expandoButtonAction);
}</pre>
		</body>
	</html>
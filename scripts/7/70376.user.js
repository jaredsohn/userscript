// ==Options==

var icon 		= 'http://www.newgrounds.com/dump/draw/a9fc93f21c13dc57634098065ea84f77.jpg'; // Should link to a 35x35 icon, set to an empty string to stop the icon from changing

var background	= '#000000'; // Set to a hexadecimal color value to change the background color for threads you are watching. Example: #FF0000 for red (not a recommended color btw :P)

// ==UserScript==
// @name           Newgrounds BBS Thread Watch
// @namespace      greasemonkey.knugen.com/ngbbsthreadwatch
// @description    Choose threads to watch. If there are new posts in them when you refresh they appear at the top of the forum! *Note* Uses cookies
// @include        http://*newgrounds.com/bbs/forum/*
// ==/UserScript==

var stickyThreads = readCookie('tw_sticky') == 'false' ? false : true;
if (stickyThreads == null) stickyThreads = false;

var controls 				= document.createElement('div');
controls.innerHTML 			= 'Thread Watch: ';
controls.style.display 		= 'inline';
controls.style.fontWeight 	= 'bold';
controls.setAttribute('style', 'float: right;');

var clearAllControl			= document.createElement('a');
clearAllControl.textContent	= 'Remove all watched threads';
clearAllControl.href		= "#";
clearAllControl.addEventListener('click', deleteAllCookies, false);

var stickyControl			= document.createElement('a');
stickyControl.textContent	= 'Turn sticky threads ' + (stickyThreads ? 'off' : 'on');
stickyControl.href			= "#";
stickyControl.addEventListener('click', toggleSticky, false);

controls.appendChild(clearAllControl);
controls.appendChild(document.createTextNode(' | '));
controls.appendChild(stickyControl);

document.getElementsByClassName('bundle')[0].appendChild(controls);

var threads = new Array();
var cookies = document.cookie.match(/tw_[0-9]+=[0-9]+/g);

var c = 0;
while (cookies && true)
{
	if (c > cookies.length - 1) break;
	
	threads.push(cookies[c].split('='));
	c += 1;
}

var updatedThreads = new Array();
var forumTable 	= document.getElementsByClassName('forum')[0];
var threadRows	= forumTable.childNodes[3].getElementsByTagName('tr');
var firstThread = threadRows[0];

for (var i = 0; i < threadRows.length; i++)
{
	if (threadByBot(threadRows[i])) continue;	
	
	var tr				= threadRows[i];	
	var threadUpdated 	= false;
	var threadWatched 	= false;
	var threadLocked	= getThreadLocked(tr);
	var threadID 		= 'tw_' + getThreadID(tr);
	var threadReplies 	= getThreadReplies(tr);
	
	for (var j = 0; j < threads.length; j++)
	{
		if (threads[j][0] == threadID) 
			threadWatched = true;
		
		if (threadWatched && threads[j][1] < threadReplies) 
			threadUpdated = true;
		
		if (threadWatched) break;
	}
	
	var img = tr.getElementsByClassName('icon_sm')[0].firstChild;
	
	var orig_src = img.src;
	orig_src = 'url(' + orig_src + ')';
	
	var imgHolder =	document.createElement('div');
	imgHolder.style.backgroundImage = orig_src;
	imgHolder.style.width 		= '35px';
	imgHolder.style.height 		= '35px';
	imgHolder.style.marginLeft 	= '5px';
	imgHolder.style.cursor 		= threadLocked ? 'default' : 'pointer';
	imgHolder.className			= 'imgHolder';
	
	img.parentNode.appendChild(imgHolder);
	img.setAttribute('src', icon);
	imgHolder.appendChild(img);
	
	var fn = function(){clickIcon(this.childNodes[0])};
	imgHolder.addEventListener('click', fn, false);
	
	setImage(img, (!threadLocked && threadWatched));
	setBackground(tr, (!threadLocked && threadWatched));
	
	if (threadLocked)
	{
		if (threadWatched) removeThreadWatch(threadID);
	}
	
	if (threadWatched)
	{
		if (threadUpdated || stickyThreads)
		{
			var clone = tr.cloneNode(true);
			updatedThreads.push(clone);
			clone.getElementsByClassName('imgHolder')[0].addEventListener('click', fn, false);
			setCookie(threadID, threadReplies);
		}
	}	
}

for (var i = 0; i < updatedThreads.length; i++)
{
	firstThread.parentNode.insertBefore(updatedThreads[i], firstThread);
}

function clickIcon(img)
{
	var threadRow = img.parentNode.parentNode.parentNode;
	
	if (getThreadLocked(threadRow)) return;
	
	if (addThreadWatch('tw_' + getThreadID(threadRow), getThreadReplies(threadRow)))
	{
		setImage(img, true);
		setBackground(threadRow, true);
	}
	else 
	{
		removeThreadWatch('tw_' + getThreadID(img.parentNode.parentNode.parentNode));
		setImage(img, false);
		setBackground(threadRow, false);
	}
		
}

// Function for adding a thread to watch
function addThreadWatch(id, posts)
{
	
	// Check if already exists, if not add
	for (var j = 0; j < threads.length; j++)
	{
		if (threads[j][0] == id) 
			return false;
	}
	
	setCookie(id, posts);
	threads.push([id, posts]);	
	
	return true;
}

// Function for removing a thread to watch
function removeThreadWatch(id)
{
	for (var i = 0; i < threads.length; i++)
	{
		if (threads[i][0] == id) 
		{
			threads.splice(i, 1);
			break;
		}
	}
	
	deleteCookie(id);
}

function setCookie(id, posts)
{
	var expireDate = new Date();
	expireDate.setTime(expireDate.getTime() + 7*24*60*60*1000);
	var expires = '; expires=' + expireDate.toGMTString();
	
	document.cookie = id + "=" + posts + expires;
}

function deleteCookie(id)
{
	document.cookie = id + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function deleteAllCookies()
{
	if (!confirm("This will remove all your watched threads on all forums, do you really want to continue?")) return;
	
	for (var j = 0; j < threads.length; j++)
	{
		deleteCookie(threads[j][0]);
	}
	
	window.location.reload();
}

function setBackground(threadRow, watched)
{
	if (background.length == 0) watched = false;
	
	threadRow.setAttribute('style', watched ? 'background-color: ' + background : '');
}

function setImage(img, watched)
{
	if (icon.length == 0) watched = false;
	
	img.style.display = watched ? 'block' : 'none';
}

function getThreadLocked(threadRow)
{
	return Boolean(/(thread-lockpop.gif)|(thread-lock.gif)/.test(threadRow.getElementsByClassName('icon_sm')[0].innerHTML));
}

function threadByBot(threadRow)
{
	var topicStarter = threadRow.getElementsByClassName('lastpost')[0].textContent;
	return /G-Bot/.test(topicStarter);
}

function getThreadID(threadRow)
{
	var threadLink = threadRow.getElementsByClassName('thread')[0].getElementsByTagName('a')[0];
	return Number(/topic\/([0-9]+)/.exec(threadLink.href)[1]);
}

function getThreadReplies(threadRow)
{
	var replies = threadRow.getElementsByClassName('figures')[0].textContent;
	replies = replies.replace(',', '');
	return Number(replies);
}

function toggleSticky()
{
	stickyThreads = !stickyThreads;
	
	var expireDate = new Date();
	expireDate.setTime(expireDate.getTime() + 50*365*24*60*60*1000);
	var expires = '; expires=' + expireDate.toGMTString();
	
	document.cookie = "tw_sticky=" + stickyThreads + expires;
	
	window.location.reload();
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
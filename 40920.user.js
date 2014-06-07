// ==UserScript==
// @name           OWA Exchange
// @namespace      owaexchange
// @include        */exchange/*
// @version	0.5
// ==/UserScript==

//-----------------------------------------------------------------------------
const RELOAD_TIMEOUT = 60000*2;

var oldInboxHTML = "";
var newInboxHTML = "";
var checkTimeout;
var reloadTimeout;
var messageCheckBox;
var previewPaneResizing = false;
var mainForm;
var navBar;
var lastRow;

// alert(window.location);

var debugging = true;

function debug(debug_text) {
	if ( ! debugging ) { return false }
	GM_log(debug.caller.toString().split(/{/)[0].split('function')[1]+': '+
		debug_text)
	// trace(debug_text) 
}
/* 
if ( window.location.toString().match(/exchange\/$/) )
{
	var baseUrl = document.body.parentNode.getElementsByTagName('base')[0].
		href;
	document.body.innerHTML = '';
	// document.body.
	GM_xmlhttpRequest({method: 'GET', url: baseUrl+'Inbox/?Cmd=contents',
		onload: 
		function(responseDetails)
		{
			debug(responseDetails.responseText);
			document.body.parentNode.innerHTML = 
				responseDetails.responseText;
			document.appendChild(document.createElement('body'));
			// var b = document.createElement('body');
			// document.appendChild(b);
			// document.body.appendChild(
				// document.getElementsByTagName('form')[0]);
			// debug(document.body.innerHTML);
		}
	});
	return;
}
*/

function $create(type)
{
	return document.createElement(type);
}
function $id(_id)
{
	return document.getElementById(_id);
}
function $xpath(path,domObject)
{
	if ( ! domObject ) { domObject = document; }
	// return the DOM object corresponding to the XPath 'path' specified
	return domObject.evaluate(path, domObject, null,
		XPathResult.ANY_TYPE, null).iterateNext();
}
function checkForNewMail(_url)
{
	if ( _url )
	{
		window.status='checking for new mail ('+_url+')...';
		GM_xmlhttpRequest({method: 'GET', url: _url, onload: 
			function(responseDetails)
			{
				/*
				var parser = new DOMParser();
				var newDoc = parser.parseFromString(
					responseDetails.responseText,'text/xml');
				// alert(newDoc.childNodes[0]);
				var newMessage  = newDoc.getElementsByTagName('html')[0].
					getElementsByTagName('table')[3].
						getElementsByTagName('tr')[2].
						getElementsByTagName('td')[3].
						getElementsByTagName('b');
					// $xpath('/html/body/form/table/tbody/tr/td/table[3]/'
							+'tbody/tr[2]/'
							+'td[3]/font/a/font/b/img',newDoc);
				if ( newMessage )
				{
					if ( confirm('You have new mail!'
						+'\nClick OK to see it now or '
						+'Cancel to see it later.') )
					{
						window.location = _url;
					}
				}
				else
				{
					window.status = 'no new mail';
				}
				*/
				
				newInboxHTML = responseDetails.responseText;
				if ( oldInboxHTML )
				{
					// alert(newInboxHTML.split(/icon-msg-signed.gif/gi)[1].
						// innerHTML);
					// alert(newInboxHTML.split(/icon-msg-unread.gif/gi)[1].
						// innerHTML);
					_new = newInboxHTML.split(/icon-msg-unread.gif/gi).
						length + document.body.innerHTML.split(
							/icon-msg-unread.gif/gi).length - 2;
					_old = oldInboxHTML.split(/icon-msg-signed.gif/gi).
						length + document.body.innerHTML.split(
							/icon-msg-unread.gif/gi).length - 2;
					window.status = 'new:'+_new+' old:'+_old;
					if ( 
						_new > _old &&
						confirm('You have new mail!'
							+'\nClick OK to see it now or '
							+'Cancel to see it later.')
						)
					{
						window.location = _url;
					}
				}
				oldInboxHTML = newInboxHTML;
			}
		});
	}
	checkTimeout = setTimeout(function(){checkForNewMail(_url)}, 10000);
}
function handleClick(e)
{
	try{myContextMenu.style.display='none'}catch(err){}
	try
	{
		el = e.target;
		while ( !el.toString().match(/^https:\/\//) )
			{el = el.parentNode}
		
		row = e.target;
		while ( !row.toString().match(/HTMLTableRowElement/) )
			{row = row.parentNode}
		
		msg_url = el.toString();
		if ( !msg_url.match('Cmd=open') ) {return false}
	} catch(err){return false}
	
	if ( e.target == aOpen ) {return false}
	e.preventDefault();
	if ( e.button == 2 )
	{
		try {
			myContextMenu.style.left = e.clientX;
			myContextMenu.style.top	 = e.clientY;
			aOpen.target	= '_blank';
			aReply.target	= '_blank';
			aReplyall.target= '_blank';
			aForward.target	= '_blank';
			aOpen.href		= msg_url;
			aReply.href		= msg_url.replace('Cmd=open', 'Cmd=reply');
			aReplyall.href	= msg_url.replace('Cmd=open', 'Cmd=replyall');
			aForward.href	= msg_url.replace('Cmd=open', 'Cmd=forward');
			messageCheckBox = el.parentNode.parentNode.parentNode.
				getElementsByTagName('td')[0].getElementsByTagName('input')[0];
		} catch(err){return false}
		myContextMenu.style.display = 'inline';
	}
	else
	{
		// highlight this row
		row.style.background = '#d6e7fb';
		
		// and mark the last row as unread
		if ( lastRow && lastRow != row )
		{
			lastRow.style.background = '#ffffff';
			lastRow.innerHTML = lastRow.innerHTML.replace('-unread.gif',
				'-read.gif');
			lastRow.innerHTML = lastRow.innerHTML.replace('-encrypted.gif',
				'encrypted-read.gif');
			lastRow.innerHTML = lastRow.innerHTML.replace(/\<b\>/gi,'');
			lastRow.innerHTML = lastRow.innerHTML.replace(/\<\/b\>/gi,'');
		}
		
		lastRow = row;
		
		if ( myPreviewPane.style.display == 'none' )
		{
			mainForm.style.width='60%';
		}
		myPreviewPane.style.display='inline';
		myDivider.style.display='inline';
		myPreviewPane.innerHTML = "<h3>... loading ...</h3>";
		myPreviewPane.getElementsByTagName('h3')[0].style.marginLeft = '10px';
		
		clearTimeout(reloadTimeout);
		window.stop();
		reloadTimeout = setTimeout(function(){location.reload()},
			RELOAD_TIMEOUT);

		GM_xmlhttpRequest({method: 'GET', url: msg_url, onload: 
			function(responseDetails)
			{
				myPreviewPane.innerHTML = responseDetails.responseText;
				t = myPreviewPane.getElementsByTagName('table')[0];
				t.style.paddingLeft = '8px';
				t.style.paddingRight = '7px';
				tb = t.getElementsByTagName('tbody')[0];
				for (i=7;i<13;i++)
				{
					tb.getElementsByTagName('tr')[1].
						getElementsByTagName('td')[i].
						style.display = 'none';
				}
			}
		});
	}
}
function resizePreviewPane(e)
{
	if ( previewPaneResizing == true )
	{
		myDivider.style.left = e.pageX;
		dividerPos = parseInt(myDivider.style.left.replace('px','')) /
			parseInt(document.width) * 100;
		mainForm.style.width = dividerPos + '%';
		myPreviewPane.style.width = (100 - dividerPos)+'%';
		myDivider.style.left = (dividerPos) + '%';
	}
}
function deleteMessage()
{
	messageCheckBox.checked = true;
	unsafeWindow.SetCmd(unsafeWindow.document.msgViewer.CmdDelete.value);
}

// if ( location.toString().match('/Drafts/') )
// {
	// inboxURL = location.toString().replace(/Drafts*.*/,
		// 'Inbox/?Cmd=contents');
	// clearTimeout(checkTimeout);
	// checkForNewMail(inboxURL);
// }
if ( location.toString().match('/Inbox/') )
{
	mainForm = document.body.childNodes[1];
	var myContextMenu = $create('div');
	var myDivider     = $create('div');
	var myPreviewPane = $create('div');
	
	var ulMyCM		= $create('ul'); myContextMenu.appendChild(ulMyCM);
	
	var liOpen		= $create('li'); ulMyCM.appendChild(liOpen);
	var liReply		= $create('li'); ulMyCM.appendChild(liReply);
	var liReplyall	= $create('li'); ulMyCM.appendChild(liReplyall);
	var liForward	= $create('li'); ulMyCM.appendChild(liForward);
	var liDelete	= $create('li'); ulMyCM.appendChild(liDelete);
	
	var aOpen		= $create('a');  liOpen.appendChild(aOpen);
	var aReply		= $create('a');  liReply.appendChild(aReply);
	var aReplyall	= $create('a');  liReplyall.appendChild(aReplyall);
	var aForward	= $create('a');  liForward.appendChild(aForward);
	var aDelete		= $create('a');  liDelete.appendChild(aDelete);
	
	inboxURL = location.toString()+'&Page=1&View=Messages&rid='+Math.random();
	reloadTimeout = setTimeout(function(){location.reload()},RELOAD_TIMEOUT);
	//inboxURL = '?Cmd=contents&Page=1&View=Messages';
	clearTimeout(checkTimeout);
	// checkForNewMail(inboxURL);
	myContextMenu.id = 'myContextMenu';
	with ( myContextMenu.style )
	{
		position		= 'fixed';
		width			= '100px';
		backgroundColor	= '#d6e7fb';
		border			= 'thin solid #000';
		display			= 'none';
	}
	
	with ( myDivider.style )
	{
		position		= 'fixed';
		right			= '40%';
		top				= '0px';
		height			= '100%';
		width			= '3px';
		background		= '#3d5fa3';
		borderRight		= 'thin solid';
		borderLeft		= 'thin solid';
		display			= 'none';
		cursor			= 'col-resize';
	}
	
	with ( myPreviewPane.style )
	{
		position		= 'fixed';
		overflow		= 'auto';
		width			= '40%';
		right			= '0px';
		top				= '0px';
		height			= '100%';
		backgroundColor	= '#C3DAF9';
		// borderLeft		= 'thin solid';
		display			= 'none';
	}
	
	liDelete.addEventListener('click',function(){deleteMessage()},false);
	try{aDelete.style.cursor	= 'pointer'}catch(err){}
	
	with ( ulMyCM.style )
	{
		listStyle		= 'inside';
		textIndent		= '-35px';
	}
	liOpen.style.listStyleImage		=
		'url(../../exchweb/img/icon-msg-read.gif)';
	liForward.style.listStyleImage	=
		'url(../../exchweb/img/icon-msg-forward.gif)';
	liReply.style.listStyleImage	=
		'url(../../exchweb/img/icon-msg-reply.gif)';
	liReplyall.style.listStyleImage	=
		'url(../../exchweb/img/replyall.gif)';
	liDelete.style.listStyleImage	=
		'url(../../exchweb/img/delete.gif)';
	
	aOpen.innerHTML		= 'Open';
	aReply.innerHTML	= 'Reply';
	aReplyall.innerHTML	= 'Reply All';
	aForward.innerHTML	= 'Forward';
	aDelete.innerHTML	= 'Delete';
	document.body.appendChild(myContextMenu);
	document.body.appendChild(myPreviewPane);
	document.body.appendChild(myDivider);
	document.addEventListener('mousemove',
		function(e){resizePreviewPane(e)},false);
	
	myDivider.addEventListener('mousedown',
		function(e)
		{
			e.preventDefault();
			previewPaneResizing=true;
			myDivider.parentNode.parentNode.style.cursor = 'col-resize';
			// document.body.style.cursor = 'col-resize';
			return false;
		}
		,false);
	
	document.body.addEventListener('mouseup',
		function(e)
		{
			e.preventDefault();
			previewPaneResizing=false;
			myDivider.parentNode.parentNode.style.cursor = 'default';
			return false;
		}
		,false);
		/*
		var navFrame = window.parent.document.body.
			getElementsByTagName('frame')[0];
		navFrame.src = './?Cmd=contents&ShowFolders=1';
		setTimeout('alert(navFrame.innerHTML)',
			3000);
			nnerHTML); //src = 'http://www.google.com';
		*/
}
/* NAVBAR
if ( location.toString().match('Cmd=navbar') )
{
	return;
	var navBar = document.body;
	var foldersURL = document.getElementsByTagName('tr')[6].
		getElementsByTagName('a')[0].href;
	navBar.innerHTML = '';
	GM_xmlhttpRequest({method: 'GET', url: foldersURL, onload: 
		function(responseDetails)
		{
			document.body.innerHTML = responseDetails.responseText;
			
			try{
				alert(window.parent.document.body.innerHTML);
			}
			catch(err)
			{
				alert(err)
			}
		}
	});
}
*/

document.addEventListener('click', function(e){handleClick(e)}, false);

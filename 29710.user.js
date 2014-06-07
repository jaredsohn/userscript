/**
 * The core loop of this program runs as follows:
 * 1. Ask for "next" page of messages using async XHR.
 *     a. If $curFolderIndex too high, goto #5
 * 2. Receive page text. Extract message list string and save it as $curPageMessageList.
 *     a. If no messages, increment $curFolderIndex, write folder-boundary XML, and goto #1
 * 3. Extract metadata for "next" message from $curPageMessageList, save as $curMessageData. Issue XHR to message's own URL.
 *     a. If no next message, increment $curPageIndex and goto #1
 * 4. Receive message text. Extract body, write message XML. Go to #3
 * 5. Finalize XML and present to user.
 */
// ==UserScript==
// @name           OKCupid mailbox downloader
// @namespace      tag:brainonfire.net,2008-07-05:okcupid-mailbox-downloader
// @description    Download your OKCupid inbox and outbox as XML. (This takes a while.) Note: The "Saved Mail" folder is weird. I'm not quite sure how to handle it yet. For now, it is still backed up, but the XML does not include info on whether you sent or received each message.
// @include        http://*.okcupid.com/mailbox*
// @version        0.4.2
// @changelog      Since 0.4.1: Widen include to all mailbox pages, tweak download button text, add Saved Mail (partial implementation)
// ==/UserScript==



(function(){



/* Set this variable low (around 4) for testing. This will help you debug core loop issues. */
var TESTING_MAX_PER_PAGE = 9000; // There will never be 9000 per page, so that's a good default when not actually testing.



/*=======================================*
 * Restrict URLs for security and sanity *
 *=======================================*/
 
re_host_onOKC = /(^|\.)okcupid.com$/;
re_pathPlus_inMailboxFolder = /^\/mailbox(\?folder=[0-9+])?$/;

//restrict to subdomains of OKC (or main domain)
if(!re_host_onOKC.test(location.hostname))
	return;

//only folder querystrings are OK beyond "/mailbox"
if(!re_pathPlus_inMailboxFolder.test(location.pathname + location.search))
	return;






/*===============*
 * Library stuff *
 *===============*/

/*LIB: From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

/*LIB: Ceate a unique ID for this element */
function getUniqueID(prefix)
{
	var prefix = prefix ? prefix+'_' : '';
	return prefix+btoa(Math.random()).replace(/[^a-z0-9]/gi, '');
}






/*=============*
 * Global data *
 *=============*/

//Constants

var xmlCompatVer = '1';

var re_findMessageListContainer = /<table .*?id="mailListTable".*?>(.*?)<\/table>/;
var re_getOneMessageLine = /name="selectedMsgs" value="([0-9]+)".+?(?:\/profile\?u=([0-9a-z_-]+)|<span class="msgSysName">(.+?)<\/span>).+?(?:user|system)MailSubj.+?readmsg=true.+?>(.+?)<.+?md\(([0-9,]+?)\)/gi;
	var redex_msg_id = 1;
	var redex_msg_interlocutor = 2;
	var redex_msg_interlocutorAlt = 3;
	var redex_msg_subject = 4;
	var redex_msg_date = 5;
var re_message_body = /<form.+?name="folderList".+?name="body"\s+?value="(.*?)"/;

// DOM cache

var downloadTrigger = undefined;

var infobox = undefined; // class = inprogress|success|failure
var ID_infobox = getUniqueID('infobox');

var statusTextNode = undefined; // text node
var ID_statusTextParent = getUniqueID('statusTextParent');

var dataOutputArea = undefined; // textarea for XML output
var ID_dataOutputArea = getUniqueID('dataOutputArea');

//State info

var curPageIndex = 0; // 0, 1, 2... last value brings empty page
var curFolderIndex = 0; // 0, 1 (not the same folder.id)

var msgTable = undefined; // the current page's message list, as a string
var curMessageData = undefined; // the current message's metadata, as an object: {id, interlocutor, subject, date}

var msgsSoFarThisPage = 0;

//Data

/**
 * folders: [folder]
 * folder: {id, name, [message]}
 * message: {id, date, interlocutor, subject}
 */
var inbox = {id: 1, name: 'inbox', messages: []};
var outbox = {id: 2, name: 'outbox', messages: []};
var savedbox = {id: 3, name: 'saved', messages: []};
var folders = [inbox, outbox, savedbox];




/*==================*
 * Helper functions *
 *==================*/

/**
 * Update the status text.
 */
function updateStatus(msg)
{
	GM_log('Status: ' + msg);
	statusTextNode.nodeValue = msg;
}

/**
 * Show a failure message and throw an exception.
 */
function fail(msg, extra)
{
	updateStatus(msg);
	infobox.className = 'failure';
	
	alert('Failure!');
	
	if(extra)
		msg += '\n\nExtra info: '+extra;		
	throw new Exception(msg);
}

/**
 * Return a more human-readable version of the XHR response.
 */
function getPrintableResponse(resp)
{
	return resp.status + ': ' + resp.statusText + '\n'
		resp.responseHeaders + '\n\n' + resp.responseText;
}

/**
 * Fail on an async request.
 */
function requestFail(resp)
{
	fail('Failed to retrieve a page of results.', 'The server returned the following:\n\n' + getPrintableResponse(resp));
}

/**
 * Make an asynchronous request for a page.
 */
function makeAsyncCall(url, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function()
	{
		//GM_log('Readystate change to '+xhr.readyState+' on url '+url);
		
		if(xhr.readyState === 4)
		{
			if(xhr.status !== 200)
				return requestFail(xhr);
			
			callback(xhr); // goto 2
		}
	};
	xhr.send(null);
}

/**
 * Build an RFC 2822 date string from the OKC representation.
 */
function makeProperDate(dateCommas)
{
	return new Date(eval('Date.UTC('+dateCommas+')')).toLocaleFormat('%Y-%m-%d %H:%M:%S %Z');
}

/**
 * Escape & < > "
 * (escapeXMLTextNode as well as quotes)
 */
function escapeXMLAttrib(data)
{
	return escapeXMLTextNode(''+data).replace(/"/g, '&quot;');
}

/**
 * Escape & < >
 */
function escapeXMLTextNode(data)
{
	return (''+data).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Append XML to the output area.
 */
function addXML(lines)
{
	//GM_log('Emitting XML: '+lines);
	
	dataOutputArea.value = dataOutputArea.value + lines + '\r\n';
}

/**
 * Emit XML start tag for folder.
 */
function writeBeginFolder()
{
	addXML('\t<folder id="'+escapeXMLAttrib(folders[curFolderIndex].id)+'" name="'+escapeXMLAttrib(folders[curFolderIndex].name)+'">');
}

/**
 * Emit XML end tag for folder.
 */
function writeEndFolder()
{
	addXML('\t</folder>');
}



/*=====================*
 * Core loop functions *
 *=====================*/

/**
 * 1. Start an XHR for the current page in the current folder.
 */
function askForOnePage()
{
	// check for terminal state
	if(curFolderIndex >= folders.length)
		return finishDownloadSequence(); // goto 5
	
	// check for start of folder
	if(curPageIndex === 0)
		writeBeginFolder();
	
	msgsSoFarThisPage = 0;
	
	updateStatus('Requesting page index '+curPageIndex+' of your '+folders[curFolderIndex].name);
	
	var nextURL = '/mailbox?folder='+folders[curFolderIndex].id+'&next='+curPageIndex;
	makeAsyncCall(nextURL, processOnePage); // goto 2
}

/**
 * 2. Analyze the page, build a message queue, 
 */
function processOnePage(resp)
{
	updateStatus('Processing page '+curPageIndex+' in '+folders[curFolderIndex].name);

	GM_log('Received: ' + getPrintableResponse(resp));
	
	//process data

	var data = resp.responseText.replace(/\s+?/g, ' '); // regexes have a hard time with linebreaks
	
	msgTable = re_findMessageListContainer.exec(data); // global
	if(msgTable === null)
		fail('Could not find message list container in page.');
	msgTable = msgTable[1];
	
	if(!msgTable.match(/readMessage/g)) // we've reached the end of the folder
	{
		writeEndFolder();
		
		curFolderIndex++;
		curPageIndex = 0;
		
		return askForOnePage(); // goto 1: this will determine whether we're done with all folders
	}
	
	// We have more messages! So let's start parsing them.

	return askForOneMessage(); // goto 3
}

/**
 * 3: Read one message's metadata, then ask for the message body.
 */
function askForOneMessage()
{
	var oneMatch = re_getOneMessageLine.exec(msgTable)
	
	if(!oneMatch || msgsSoFarThisPage >= TESTING_MAX_PER_PAGE) //XXX
	{
		updateStatus('Done with page index '+curPageIndex);
		curPageIndex++;
		return askForOnePage(); // goto 1
	}
	
	//save for step 4
	curMessageData = 
	{
		id: oneMatch[redex_msg_id],
		interlocutor: (oneMatch[redex_msg_interlocutor] || oneMatch[redex_msg_interlocutorAlt]),
		date: makeProperDate(oneMatch[redex_msg_date]),
		subject: oneMatch[redex_msg_subject].replace(/^\s+|\s+$/g, '')
	};

	updateStatus('Requesting message '+curMessageData.id);
	
	msgsSoFarThisPage++;
	
	var msgBodyURL = '/mailbox?readmsg=true&msg_headerid='+curMessageData.id+'&folderid='+folders[curFolderIndex].id;
	makeAsyncCall(msgBodyURL, processOneMessage); // goto 4
}

/**
 * 4: Receive and extract message body, write to XML, go to next message.
 */
function processOneMessage(resp)
{
	updateStatus('Processing message ID '+curMessageData.id+' in '+folders[curFolderIndex].name);

	GM_log('Received: ' + getPrintableResponse(resp));
	
	//process data

	var data = resp.responseText.replace(/\s+?/g, ' '); // regexes have a hard time with linebreaks
	
	var msgBody = re_message_body.exec(data);
	if(!msgBody)
		fail('Could not find body text of message ID '+curMessageData.id, 'Received: '+getPrintableResponse(resp));
	msgBody = msgBody[1];
	
	addXML('\t\t<message id="'+curMessageData.id+'" date="'+curMessageData.date+'" interlocutor="'+escapeXMLAttrib(curMessageData.interlocutor)+'" subject="'+escapeXMLAttrib(curMessageData.subject)+'">'+escapeXMLTextNode(msgBody.replace(/&quot;/g, '"'))+'</message>');
 
	askForOneMessage(); // goto 3
}






/*===============*
 * GUI functions *
 *===============*/



/**
 * Pop a lightbox-type info window onto the page.
 */
function createInfobox()
{
	infobox = document.createElement('div');
	infobox.setAttribute('id', ID_infobox);
	infobox.setAttribute('class', 'inprogress');
	GM_addStyle(
		'div#'+ID_infobox+' \
		{ \
			min-height: 5em; \
			min-width: 15em; \
			height: 50%; \
			width: 50%; \
			position: fixed; \
			top: '+window.innerHeight/4+'px; \
			left: '+window.innerWidth/4+'px; \
			padding: 4px; \
			border: 4px solid black; \
			background: white; \
			overflow: auto;\
		} \
		\
		div#'+ID_infobox+'.failure { color: #800; border-color: red; } \
		div#'+ID_infobox+'.inprogress { color: #860; border-color: yellow; } \
		div#'+ID_infobox+'.success { color: #080; border-color: green; } \
		'
	);
	
	statusTextParent = document.createElement('p');
	statusTextParent.setAttribute('id', ID_statusTextParent);
	statusTextNode = document.createTextNode('Initializing');
	statusTextParent.appendChild(statusTextNode);
	infobox.appendChild(statusTextParent);

	dataOutputArea = document.createElement('textarea');
	dataOutputArea.setAttribute('id', ID_dataOutputArea);
	GM_addStyle(
		'textarea#'+ID_dataOutputArea+' \
		{ \
			width: 95%;\
			min-height: 10em;\
			overflow: scroll;\
		} \
		'
	);
	infobox.appendChild(dataOutputArea);

	document.body.appendChild(infobox);
	
	updateStatus('Processing request');
}

/**
 * Make sure the DOM and paths are as they need to be.
 */
function checkDOMAndPaths()
{
	updateStatus('Checking page structure and paths.');
	
	var countInbox = $xpath('//div[@id="rightContent"]/h1/following-sibling::ul[1][@id="tabs"]/li/a[contains(@href, "mailbox?folder=1")]').length;
	if(countInbox !== 1)
		fail('Page structure (or path to mailbox) has changed.', 'Inbox XPath returned '+countInbox+' results.');

	var countOutbox = $xpath('//div[@id="rightContent"]/h1/following-sibling::ul[1][@id="tabs"]/li/a[contains(@href, "mailbox?folder=2")]').length;
	if(countOutbox !== 1)
		fail('Page structure (or path to mailbox) has changed.', 'Outbox XPath returned '+countOutbox+' results.');
}

/**
 * Create infobox, start XHR chain.
 */
function startDownloadSequence(evt)
{
	evt.preventDefault();
	evt.stopPropagation();
	
	var proceed = window.confirm(
		'You are about to download all sent and received messages. This will take some time.\n'+
		'Please save all documents, and close any memory-intensive programs.'
	);
	if(!proceed)
		return;
	
	downloadTrigger.parentNode.removeChild(downloadTrigger);
	
	createInfobox();
	checkDOMAndPaths();
	addXML('<OKCupidMailbox version="'+xmlCompatVer+'">');

	GM_log('About to make first call.');

	askForOnePage();
}


/**
 * Finish XHR chain, display results.
 */
function finishDownloadSequence(evt)
{
	addXML('</OKCupidMailbox>');
	
	updateStatus('Done! Copy this to a file called OKMail.xml and keep it safe.');

	infobox.setAttribute('class', 'success');
}


/**
 * Add "download mail" link to header.
 */
function insertTriggerLink()
{
	var mailboxHeader = $xpath('//div[@id="rightContent"]/h1[following-sibling::ul[1][@id="tabs"]]');
	if(mailboxHeader.length !== 1)
		return;
	mailboxHeader = mailboxHeader[0];
	
	downloadTrigger = document.createElement('button');
	downloadTrigger.appendChild(document.createTextNode('Download all mail'));
	downloadTrigger.addEventListener('click', startDownloadSequence, false);
	
	mailboxHeader.appendChild(document.createTextNode(' '));
	mailboxHeader.appendChild(downloadTrigger);
}

//start it all
insertTriggerLink();



})();

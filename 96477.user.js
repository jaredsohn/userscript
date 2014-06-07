//
// ==UserScript==
//
// @name			Better SingleMuslim
// @namespace			http://www.tanzim.co.uk
// @description			Adds useful features to singlemuslim.com
// @include			http://*.singlemuslim.com/*
// @exclude			http://*.singlemuslim.com/my_pictures*
// @exclude			http://*.singlemuslim.com/profile_pictures*
// @exclude			http://*.singlemuslim.com/contact_us*
// @exclude			http://*.singlemuslim.com/conduct*
// @exclude			http://*.singlemuslim.com/help*
// @exclude			http://*.singlemuslim.com/news*
// @exclude			http://*.singlemuslim.com/about_us*
// @exclude			http://*.singlemuslim.com/my_gifts*
// @exclude			http://*.singlemuslim.com/marriage_articals/*
//
// ==/UserScript==
//
// ====================================================================================================================
// Usage
// ====================================================================================================================
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
// ====================================================================================================================
// Features
// ====================================================================================================================
// 1. Removes blocked users from search results
// 2. Removes blocked users from from Who's Visited page
// 3. Search result streaming
// 4. Adds common operations like sending message, adding to contacts and blocking user for profiles in search result
// 5. Deafult content for send message window
// ====================================================================================================================
// Vesrion History
// ====================================================================================================================
// February 2011. Version 0.1.1.
// * Added dynamic blocked users list update
// * Profile page gets async block/unblock user
// * Block/Unblock in search results page. Previously, only block.
// * Misc. improvements
//
// February 2011. Version 0.1.0.
// First release. Tested only using a male profile (naturally).
// * Likely to break when used from a female profile.
// * Default send message is hard coded (eww...), needs to be user configurable.
// * StatusMessage send window could be made nicer using my own implementation
// * Blocked users list is only loaded once for single login session. There's no dynamica update
// 
// Doesn't use jQuery, whole thing looks like JavaScript from 1995. Sorry!
// ====================================================================================================================
// License information
// ====================================================================================================================
// Copyright (c) 2011, Tanzim Husain (http://www.tanzim.co.uk)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Please use the script at your own peril. The author takes no responsibility for anything what so ever.
// ====================================================================================================================
//

var StatusMessageType = 
{
	OK : 0,
	WARNING : 1,
	ERROR : 2
}

function StatusMessage()
{
	var CONTENT_DIV_ID = 'content';
	var MESSAGE_DIV_ID = 'message_div';
	var MESSAGE_DIV_CLASS_NAME = 'messageStack';

	this.setMessage = function(message, type)
	{	
		if (message && message.length > 0)
		{				
			var contentElement = document.getElementById(CONTENT_DIV_ID);
			if (contentElement)
			{
				var messageDiv = document.getElementById(MESSAGE_DIV_ID);
				if (!messageDiv)
				{			
					messageDiv = document.createElement('div');
					messageDiv.setAttribute('id', MESSAGE_DIV_ID);
					messageDiv.className = MESSAGE_DIV_CLASS_NAME;
					contentElement.insertBefore(messageDiv, contentElement.firstChild);
				}						
				messageDiv.innerHTML = getMessageDivHTML(message, type);
			}
		}
		else
		{		
			var messageDiv = document.getElementById(MESSAGE_DIV_ID);
			if (messageDiv)
			{
				messageDiv.parentNode.removeChild(messageDiv);
			}
		}
	}	
	
	function getMessageDivHTML(message, type)
	{
		var divClass = null;
		switch (type)
		{
		case StatusMessageType.OK:
			divClass = '"messageStackSuccess"';
			break;
		
		case StatusMessageType.WARNING:
			divClass = '"messageStackWarning"';
			break;
			
		case StatusMessageType.ERROR:
			divClass = '"messageStackError"';
			break;
			
		default:
			divClass = '"messageStackSuccess"';
			break;
		};
		return '<div class=' + divClass + '> ' + message +' </div>';
	}
}

function ResponseElement(responseText)
{
	this.element = document.createElement('div');
	this.element.innerHTML = responseText.split(/<body[^>]*>((.|\n|\r|\u2028|\u2029)*)<\/body>/gi)[1];
}

function ProfileActions(blockedUsersList)
{
	var m_blockedUsers = blockedUsersList;
	var m_isBusy = false;
	var m_targetElement = null;
	var m_userId = 0;
	var m_userName = null;
	
	this.isBusy = function()
	{
		return m_isBusy;
	}
	
	this.setTargetElement = function(element)
	{
		m_targetElement = element;
	}
	
	this.setUserInfo = function(userId, userName)
	{
		m_userId = userId;
		m_userName = userName;
	}
	
	this.blockUser = function()
	{
		setBusy(true);
		setTargetElementTxt('Blocking user...');
				
		GM_xmlhttpRequest
		({
			method: "GET", 
			url: 'my_blocked_users.php?ADD=1&ID=' + m_userId,
			onload: function(response)
			{
				setBusy(false);
				m_blockedUsers.addUser(m_userName);
				m_blockedUsers.save();
				setTargetElementTxt('Unblock User');
				GM_log('Blocked user: ' + m_userName);
			},			
			onerror: function(response)
			{
				setBusy(false);
				setTargetElementTxt('Error blocking user. Try again?');
			}
		});
	}
	
	this.unblockUser = function()
	{
		setBusy(true);
		setTargetElementTxt('Unblocking user...');
				
		GM_xmlhttpRequest
		({
			method: "GET", 
			url: 'my_blocked_users.php?UNBLOCK=1&IDs=' + m_userId,
			onload: function(response)
			{
				setBusy(false);
				m_blockedUsers.removeUser(m_userName);
				m_blockedUsers.save();
				setTargetElementTxt('Block User');
				GM_log('Unblocked user: ' + m_userName);
			},			
			onerror: function(response)
			{
				setBusy(false);
				setTargetElementTxt('Error unblocking user. Try again?');
			}
		});
	}
	
	this.sendMessage = function()
	{
		setBusy(true);
		window.open('/message_popup.php?to=' + m_userId, 'NewMessage', 'status=yes,scrollbars=yes,resizable=yes,width=550,height=500');
		setBusy(false);
	}
	
	this.addToContacts = function()
	{
		setBusy(true);
		setTargetElementTxt('Adding to contacts...');
				
		GM_xmlhttpRequest
		({
			method: "GET", 
			url: 'my_contacts.php?ADD=1&ID=' + m_userId, 
			onload: function(response)
			{
				setBusy(false);
				setTargetElementTxt('Added to Contacts');
			},			
			onerror: function(response)
			{
				setBusy(false);
				setTargetElementTxt('Error adding to contacts. Try again?');
			}
		});
	}
	
	function setTargetElementTxt(txt)
	{
		m_targetElement.textContent = txt;
	}
	
	function setBusy(isBusy)
	{
		m_isBusy = isBusy;
	}
}

function BlockedUsersList()
{
	var m_startPage = "my_blocked_users.php";
	var m_loading = false;
	var m_Users = eval(GM_getValue("blocked_users", "[]"));
	var m_Pages = null;
	var m_currentPage = 0;
	var m_message = new StatusMessage();
	var m_this = this;
	
	this.load = function()
	{
		m_Pages = new Array();
		m_Users = new Array();
		m_loading = true;
		m_currentPage = 0;
				
		GM_xmlhttpRequest({method: "GET", url: m_startPage, onload: onBlockedUsersPageLoaded, onerror: onBlockedUsersPageLoadingError});
		
		m_message.setMessage("The blocked users list is being loaded... Please don't navigate away from the page.", StatusMessageType.WARNING);
	}
	
	this.addUser = function(userName)
	{
		if (!this.userExists(userName))
		{
			m_Users.push(userName);
		}
	}
	
	this.removeUser = function(userName)
	{
		var index = m_Users.indexOf(userName);
		if (index != -1)
		{
			m_Users.splice(index, 1);
		}
		return index;
	}
	
	this.userExists = function(userName)
	{
		return (m_Users.indexOf(userName) != -1);
	}
	
	this.getUsers = function()
	{
		return m_Users;
	}
	
	this.save = function()
	{
		GM_setValue('blocked_users', uneval(m_Users));
	}
	
	function onBlockedUsersPageLoaded(response)
	{														
		var re = new ResponseElement(response.responseText);
		var users = document.evaluate('//*[@id="contacts"]/table/tbody/tr/td[2]/span/a | //*[@id="contacts"]/table/tbody/tr/td[2]/span/span/a', re.element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var userElement = null;
		for (var i = 0; i < users.snapshotLength; ++i)
		{
			userElement = users.snapshotItem(i);
			if (userElement.className != 'userDeleted')
			{				
				m_this.addUser(userElement.text);
			}
		}
				
		var pages = document.evaluate('//*[@id="contacts"]/div/a', re.element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var pageURL = null;
		for (var i = 0; i < pages.snapshotLength; ++i)
		{
			pageURL = pages.snapshotItem(i).href;
			if ((m_Pages.indexOf(pageURL) == -1) && (pageURL.search(/PAGE=1$/i) == -1)) // ignore page 1 since we've already gone through it in our initial request
			{
				m_Pages.push(pageURL);
			}
		}
				
		re = null;
						
		var nextPage = m_Pages[++m_currentPage];
		if (nextPage)
		{
			GM_xmlhttpRequest({method: "GET", url: nextPage, onload: onBlockedUsersPageLoaded, onerror: onBlockedUsersPageLoadingError});
		}
		else
		{
			m_loading = false;
			m_message.setMessage("Blocked users list loaded. You can continue browsing as usual.", StatusMessageType.OK);
			m_this.save();
			GM_log('Loaded blocked users list: ' + m_Users);
		}
	}
	
	function onBlockedUsersPageLoadingError(response)
	{
		m_loading = false;
		m_message.setMessage("Error loading blocked users list. You can continue browsing as usual.", StatusMessageType.ERROR);
		m_this.save();
	}
}

function BetterSearchView()
{
	var GENDER_MALE_RADIO_ID = '__Gender-1';
	var GENDER_FEMALE_RADIO_ID = '__Gender-2';
	
	init();
	
	function init()
	{
		var selectedGender = BetterSingleMuslim.isProfileGenderMale() ? document.getElementById(GENDER_FEMALE_RADIO_ID) : document.getElementById(GENDER_MALE_RADIO_ID);
		if (selectedGender)
		{
			selectedGender.checked = true;
		}
	}
}

function BetterSearchResultsView(blockedUsersList)
{	
	var LINK_CLASS_NAME = 'smallHelpLink';
	var SEND_MESSAGE_TXT = 'Send Message';
	var ADD_TO_CONTACTS_TXT = 'Add to Contacts';
	var BLOCK_USER_TXT = 'Block User';
	var UNBLOCK_USER_TXT = 'Unblock User';
	var SEARCH_RESULTS_DIV_ID = 'box-searchResults';
	
	var m_blockedUsers = blockedUsersList;
	var m_currentPage = 1;
	var m_lastPage = 0;
	var m_ResultsBtn = null;
	var m_boxContentDiv = null;
	var m_userListClassName = null;
	var m_userClassName = null;
	var m_searchResultsDiv = null;
	var m_profileOps = null;
	
	init();
	
	function init()
	{		
		if (BetterSingleMuslim.isProfileGenderMale())
		{
			m_userListClassName = 'userListFemale';
			m_userClassName = 'userFemale';
		}
		else
		{
			m_userListClassName = 'userListMale';
			m_userClassName = 'userMale';
		}
		
		m_searchResultsDiv = document.getElementById(SEARCH_RESULTS_DIV_ID);
		
		addClickListener();
		removePageBar();
		removePageIndexers();
		processResult(document);
		addMoreButton();
	}
	
	function addClickListener()
	{
		m_profileOps = new ProfileActions(m_blockedUsers);
		document.addEventListener
		(
			'click',
			function(event)
			{
				var targetElement = event.target;
				if (!m_profileOps.isBusy() && targetElement.parentNode.hasAttribute('user_id') && targetElement.className == LINK_CLASS_NAME)
				{
					event.preventDefault();
					
					m_profileOps.setUserInfo(targetElement.parentNode.getAttribute('user_id'), targetElement.parentNode.getAttribute('user_name'));
					m_profileOps.setTargetElement(targetElement);
					
					switch(targetElement.text)
					{
					case SEND_MESSAGE_TXT:
						m_profileOps.sendMessage();
						break;
					
					case ADD_TO_CONTACTS_TXT:
						m_profileOps.addToContacts();
						break;
					
					case BLOCK_USER_TXT:
						m_profileOps.blockUser();
						break;
						
					case UNBLOCK_USER_TXT:
						m_profileOps.unblockUser();
						break;
					}
				}				
			},
			true
		);
	}
	
	function removePageBar()
	{
		var pagesInfoElement = document.evaluate('./div/h4', m_searchResultsDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var pagesInfo = pagesInfoElement.textContent.match(/\b([0-9]+).*\b([0-9]+)\b/);
		if (pagesInfo)
		{
			m_lastPage = parseInt(pagesInfo[2]);
			pagesInfoElement.parentNode.parentNode.removeChild(pagesInfoElement.parentNode);
		}		
	}
	
	function removePageIndexers()
	{
		m_boxContentDiv = m_searchResultsDiv.getElementsByClassName('boxContent')[0];
		
		var elementsToRemove = document.evaluate("./div/table/tbody/tr/*[contains(.,'»')]", m_searchResultsDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var elementToRemove = null;
		for (var i = elementsToRemove.snapshotLength-1; i >= 0 ; --i)
		{
			deleteElement(elementsToRemove.snapshotItem(i));
		}
	}
	
	function processResult(docElement)
	{
		var userName = null;
		var userId = null;
		var userInfo = null;
		var trElement = null;
		var tdElement = null;
		
		var results =  docElement.getElementsByClassName(m_userListClassName);
		for (var i = results.length-1; i >= 0; --i)
		{			                              
			userName = getUserName(results[i]);
			
			if (m_blockedUsers.userExists(userName))
			{
				GM_log('Search: removed blocked user: ' + userName);
				results[i].parentNode.removeChild(results[i]);
				results[i] = null;
			}
			else
			{
				userInfo = document.evaluate('./tbody/tr/td/table/tbody', results[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				userId = getUserId(userInfo);
				
				trElement = document.createElement('tr');
				
				tdElement = document.createElement('td');
				tdElement.setAttribute('user_id', userId);
				tdElement.setAttribute('user_name', userName);
				trElement.appendChild(tdElement);
				
				tdElement.appendChild(createProfileOpElement(userId, SEND_MESSAGE_TXT));
				tdElement.appendChild(createSpanElement(' | '));
				tdElement.appendChild(createProfileOpElement(userId, ADD_TO_CONTACTS_TXT));
				tdElement.appendChild(createSpanElement(' | '));
				tdElement.appendChild(createProfileOpElement(userId, BLOCK_USER_TXT));
				
				userInfo.appendChild(trElement);
			}
		}
	}
	
	function createSpanElement(textContent)
	{
		var spanElement = document.createElement('span');
		spanElement.textContent = textContent;
		return spanElement;
	}
	
	function createProfileOpElement(userId, textContent)
	{
		var element = document.createElement('a');
		element.className = LINK_CLASS_NAME;
		element.setAttribute('href', '#');
		element.setAttribute('user_id', userId);
		element.textContent = textContent;
		return element;
	}
	
	function getUserName(userListElement)
	{		
		var userElement = userListElement.getElementsByClassName(m_userClassName)[0];
		if (userElement)
		{		
			return userElement.firstChild.textContent;
		}
		return null;
	}
	
	function getUserId(userInfoElement)
	{
		var reportUserElement = document.evaluate('./tr[2]/td[2]/div/span/a', userInfoElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (reportUserElement)
		{
			return reportUserElement.getAttribute('onclick').match(/[0-9]+/)[0];
		}
		return null;
	}
	
	function deleteElement(element)
	{		
		element.parentNode.removeChild(element);
		element = null;
	}
	
	function addMoreButton()
	{						
		if (m_currentPage == m_lastPage)
		{
			return;
		}
		
		m_ResultsBtn = document.createElement("button");
		m_ResultsBtn.setAttribute('id', 'more_results_button');
		m_ResultsBtn.innerHTML = 'Click here to see more search results';
		m_ResultsBtn.addEventListener('click', onMoreResultsButtonClicked, true);
		m_searchResultsDiv.parentNode.insertBefore(m_ResultsBtn, m_searchResultsDiv.nextSibling);
	}
	
	function onMoreResultsButtonClicked()
	{
		var nextResultPageNo = m_currentPage * 10 + 1;
		var nextResultPageURL = '/search_results.php?&PAGE=' + nextResultPageNo;
		
		m_ResultsBtn.innerHTML = 'Loading search results. Please wait...';
		m_ResultsBtn.disabled = true;
		
		GM_xmlhttpRequest({method: "GET", url: nextResultPageURL, onload: onSearcResultsLoaded, onerror: onSearcResultsLoadingError});
	}
	
	function onSearcResultsLoaded(response)
	{			
		m_ResultsBtn.parentNode.removeChild(m_ResultsBtn);
		m_ResultsBtn = null;
		var re = new ResponseElement(response.responseText);
		processResult(re.element);
		var results = re.element.getElementsByClassName(m_userListClassName);
		for (var i = 0; i < results.length; ++i)
		{
			m_boxContentDiv.appendChild(results[i]);
		}
		m_currentPage++;
		re = null;
		
		addMoreButton();
	}
	
	function onSearcResultsLoadingError(response)
	{
		m_ResultsBtn.disabled = false;
		m_ResultsBtn.innerHTML = 'Error loading search results. Try again?';
	}
}

function BetterWhosVisited(blockedUsersList)
{
	var m_blockedUsers = blockedUsersList;
	
	removeBlockedUsers();
	
	function removeBlockedUsers()
	{
		var viewersTable = document.body.getElementsByClassName('dataTable')[0];
		if (viewersTable)
		{		
			var viewersTableBody = viewersTable.tBodies[0];
			var userElements = document.evaluate('./tr/td/span/a', viewersTableBody, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var userElement = null;
			for (var i = userElements.snapshotLength-1; i >=0 ; --i)
			{
				userElement = userElements.snapshotItem(i);
				if (m_blockedUsers.userExists(userElement.textContent))
				{
					viewersTableBody.removeChild(viewersTableBody.children[i]);
					GM_log('Removed blocked user: ' + userElement.textContent);
				}
			}
		}
	}
}

function BetterBlockedUsers(blockedUsersList)
{
	var m_blockedUsers = blockedUsersList;
	
	init();
	
	function init()
	{
		var unblockBtn = document.getElementById('UNBLOCK');
		if (unblockBtn)
		{
			unblockBtn.addEventListener
			(
				'click', 
				function(event)
				{								
					// Argh! I couldn't come up with an XPath expr that would return only checked check boxes :-/
					var selectedUsersInputs = document.evaluate('//input[@type="checkbox"][@id="IDs[]"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var selectedUserInput = null;
					var selectedUserElement = null;
					var currentLength = m_blockedUsers.getUsers().length;
					for (var i = 0; i < selectedUsersInputs.snapshotLength; ++i)
					{
						selectedUserInput = selectedUsersInputs.snapshotItem(i);
						if (selectedUserInput.checked)
						{						
							selectedUserElement =  selectedUserInput.parentNode.nextElementSibling.firstElementChild.firstElementChild;
							if (selectedUserElement.className != 'userDeleted')
							{
								m_blockedUsers.removeUser(selectedUserElement.text);
								GM_log('Unblocked user: ' + selectedUserElement.text);
							}
						}				
					}
					var newLength = m_blockedUsers.getUsers().length;
					if (currentLength != newLength)
					{
						m_blockedUsers.save();
					}
				}, 
				true
			);
		}
	}
}

function BetterProfileView(blockedUsersList)
{
	var BLOCK_USER_TXT = 'Block User';
	var UNBLOCK_USER_TXT = 'Unblock User';
	var USER_PROFILE_DIV_ID = 'box-userProfile';
	
	var m_blockedUsers = blockedUsersList;
	var m_userName = null;
	var m_userId = null;
	var m_profileOps = null;
	
	init();
	
	function init()
	{		
		var userProfileDiv = document.getElementById(USER_PROFILE_DIV_ID);
		if (!userProfileDiv)
		{
			return;
		}
		var blockUserElement = document.evaluate('./div/h4/div/span/a', userProfileDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (blockUserElement)
		{
			var userId = getUserId(blockUserElement);
			var userName = getUserName();
			
			m_profileOps = new ProfileActions(m_blockedUsers);
			m_profileOps.setUserInfo(userId, userName);
			m_profileOps.setTargetElement(blockUserElement);
			
			blockUserElement.addEventListener
			(
				'click',
				function(event)
				{
					event.preventDefault();
					
					if (m_profileOps.isBusy())
					{
						return;
					}
					
					switch(event.target.text)
					{
					case BLOCK_USER_TXT:
						m_profileOps.blockUser();
						break;
						
					case UNBLOCK_USER_TXT:
						m_profileOps.unblockUser();
						break;
					}
				},
				true
			);
		}
	}
	
	function getUserId(blockUserElement)
	{
		return blockUserElement.href.match(/ID*s*=([\d]+)/i)[1];
	}
	
	function getUserName()
	{
		var pageHeaderDiv = document.getElementsByClassName('pageHeader')[0];
		if (pageHeaderDiv)
		{
			return pageHeaderDiv.firstChild.textContent;
		}
		return null;
	}
}


var BetterSingleMuslim = 
{
	init : function()
	{					
		this.cleanupPage();
		this.setProfileGender();
		
		if (this.inPage("message_popup"))
		{
			this.setDefaultMessage();
		}
		else
		{
			var blockedUsersList = new BlockedUsersList();
			if (this.inPage("user_index"))
			{
				var sessionId = this.getSessionId();
				if (GM_getValue('session_id', null) != sessionId)
				{
					GM_setValue('session_id', sessionId);
					blockedUsersList.load();
				}
			}
			else if (this.inPage("search.php"))
			{
				new BetterSearchView();
			}
			else if (this.inPage("search_results"))
			{
				new BetterSearchResultsView(blockedUsersList);
			}
			else if (this.inPage("my_profile_viewers"))
			{
				new BetterWhosVisited(blockedUsersList);
			}
			else if (this.inPage("my_blocked_users"))
			{
				new BetterBlockedUsers(blockedUsersList);
			}
			else if (this.inPage("gallery"))
			{
				// BetterPhotoGallery coming soon :)
			}
			else
			{
				new BetterProfileView(blockedUsersList);
			}
		}
	},
	
	setDefaultMessage : function()
	{	
		var msgForm = document.forms.namedItem('message');
		if (msgForm)
		{
			var subject = msgForm.elements.namedItem('subject');
			if (subject && subject.value.length == 0)
			{
				subject.focus();
				subject.value = "Definitely maybe?";		
						
				var message = msgForm.elements.namedItem('message');
				if (message)
				{
					message.value = "Hey There,\r\nSalaams.\r\n\r\nYour profile caught my attention and I feel that we could be compatible insha'Allah.\r\nFeel free to have a peek at my profile and see if the feeling is mutual :)\r\n\r\nTake care,\r\nT";
				}
			}
		}
	},
	
	inPage : function(pageURL)
	{
		return (document.URL.toLowerCase().indexOf(pageURL) != -1);
	},
	
	getSessionId : function()
	{
		return this.getCookieValue('PHPSESSID');
	},
	
	getCookieValue : function(cookieName)
	{
		var cookies = document.cookie;
		cookies = cookies.split(';');
		var theCookie = null;
		for (var i = 0; i < cookies.length; ++i)
		{
			theCookie = cookies[i].split('=');
			if (theCookie && theCookie[0].toUpperCase().indexOf(cookieName) != -1)
			{
				return theCookie[1];
			}
		}
		return null;
	},
		
	cleanupPage : function()
	{				
		var elementsToBeDeleted = ['header', 'footer', 'box-cp_promo', 'myUrl'];
		var element = null;
		for (var i = 0; i < elementsToBeDeleted.length; ++i)
		{
			element = document.getElementById(elementsToBeDeleted[i]);
			if (element && element.parentNode)
			{
				element.parentNode.removeChild(element);
			}
		}
	},
	
	setProfileGender : function()
	{
		try
		{
			this.m_gender = unsafeWindow.GENDER;
		}
		catch(e)
		{
			GM_log('Error retriving gender. Defaulting to male.');
		}
	},
	
	isProfileGenderMale : function()
	{
		return (this.m_gender == 1);
	},
	
	m_gender : 1 // 1 is male, 2 female
};

BetterSingleMuslim.init();

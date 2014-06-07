// ==UserScript==
// @name           Mailinatorizer
// @namespace      http://userscripts.org/users/pinhead
// @description    Inserts into a form a Mailinator alternate address corresponding to a Mailinator randomly generated secret address when the user presses F8 (the hotkey can be changed in the script). Two images are also added next to the input box. The first image links to the secret address mailbox and the other links to a RSS feed of the secret address mailbox.
// @include        *
// ==/UserScript==

/* Hotkey can be changed according to this table: 
	Key		Code
	f1  	        112
	f2 		113
	f3 		114
	f4 		115
	f5 		116
	f6 		117
	f7 		118
	f8 		119
	f9 		120
	f10		121
	f11 	        122
	f12		123
*/
var HOTKEY_CODE = 119;

var mailinatorizer = 
{
	M8R_DOMAIN: 'mailinator.com',
	M8R_REGEX_EMAIL: 'color=red>(.*)</font>@',
	
	M8R_URL_BASE: 'http://www.mailinator.com',
	M8R_URL_PARAM: 'email',
	
	M8R_MAILBOX_PATH: '/maildir.jsp',
	M8R_MAILBOX_TEXT: 'Open Mailinator mailbox',
	M8R_MAILBOX_ICON_URL: 'http://gmail.google.com/favicon.ico',
	
	M8R_RSS_PATH: '/rss.jsp',
	M8R_RSS_TEXT: 'Subscribe to Mailinator mailbox...',
	M8R_RSS_ICON_URL: 'http://www.google.com/reader/ui/favicon.ico',

	M8R_ATTRIBUTE_NAME: 'm8r',		
	
	isAccepted: function(element)
	{
		if ((this.isSupported(element) == true) && (this.isMailinatorized(element) == false))
		{
			return true;
		}
		return false;
	},

    isSupported: function(element) 
	{
        if ((element.tagName.toLowerCase() == 'input') && (element.type.toLowerCase() == 'text')) 
		{
            return true;
        }
		return false;
    },

    isMailinatorized: function(element) 
	{
        if (element.getAttribute(this.M8R_ATTRIBUTE_NAME) == 'true') 
		{
            return true;
        }
        return false;
    },	
	
	process: function(element)
	{
		var that = this;
		var username = that.generateUsername();

		GM_xmlhttpRequest(
		{
			method: "GET",
			url: that.getMailboxUrl(username),
			onload: function(xhr) 
			{
				var html = xhr.responseText;
				var email =  html.match(that.M8R_REGEX_EMAIL);
				
				if(email[1]) 
				{
					that.setValue(element,email[1]);
					that.addRssLink(element, username);
					that.addMailboxLink(element, username);
				}
			}
		});			
	},	
	
	generateUsername: function() 
	{
		var username = '';
		for (var i = 1; i <= 15; i++) 
		{
			username += String.fromCharCode(97 + Math.round(Math.random() * 25));
		}
		return username;
	},

	setValue: function(element, username)
	{
		element.value = username + '@' + this.M8R_DOMAIN;
		element.setAttribute(this.M8R_ATTRIBUTE_NAME, 'true');	
	},	
	
	addMailboxLink: function(element, username)
	{
		image = document.createElement('img');
		image.setAttribute('alt', this.M8R_MAILBOX_TEXT);
		image.setAttribute('src', this.M8R_MAILBOX_ICON_URL);
		image.setAttribute('style', 'border: 0px; margin-left: 7px; margin-right: 7px;');

		link = document.createElement('a');
		link.setAttribute('href', this.getMailboxUrl(username));
		link.setAttribute('target', '_blank');
		link.setAttribute('title', this.M8R_MAILBOX_TEXT);
		link.appendChild(image);

		element.parentNode.insertBefore( link, element.nextSibling );	
	},
	
	addRssLink: function(element, username)
	{
		image = document.createElement('img');
		image.setAttribute('alt', this.M8R_RSS_TEXT);
		image.setAttribute('src', this.M8R_RSS_ICON_URL);
		image.setAttribute('style', 'border: 0px; margin-right: 7px;');

		link = document.createElement('a');
		link.setAttribute('href', this.getRssUrl(username));
		link.setAttribute('title', this.M8R_RSS_TEXT);					
		link.appendChild(image);

		element.parentNode.insertBefore( link, element.nextSibling );			
	},

	/* Help functions for creating a specific Mailinator URL */
	getMailboxUrl: function(username)
	{
		return this.createUrl(this.M8R_MAILBOX_PATH, username);
	},	
	
	getRssUrl: function(username)
	{
		return this.createUrl(this.M8R_RSS_PATH, username);
	},	
	
	createUrl: function(path, username)
	{
		return this.M8R_URL_BASE + path + '?' + this.M8R_URL_PARAM + '=' + username;
	}
}

var focusedElement = null;

function focusHandler(e)
{
	focusedElement = e.target;
}

function keydownHandler(e) 
{
	if (e.keyCode == HOTKEY_CODE)
	{
		if (mailinatorizer.isAccepted(focusedElement) == true)
		{
			mailinatorizer.process(focusedElement);
		}
	}	
}

document.addEventListener('focus', focusHandler, true);
document.addEventListener('keydown', keydownHandler, false);
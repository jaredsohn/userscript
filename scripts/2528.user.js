// Email Linkify v0.3
// Updated by Daniel W. Crompton <daniel.crompton@gmail.com>
// Made By Jason (aka GamingFox)
// Last updated: 6/4/05
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//
// This script was adapted to automatically invite a user to
// connect on LinkedIn if he/she had their email address in their
// name. (Only works after you click 'Invite <name> to connect'.)
//
// v0.4 - Added menu function to store and populate message.
// v0.3 - Fixes a bug when adding users already invited, but who have
//        not yet responded.
//
// This script is made according to a request:
// Have you considered "linkifying" email addresses that aren't 
// linked with mailtos? Much to my surprise, nobody seems to have 
// done this yet, and I would find that very valuable.
//
// The regular expression of an email address was found at
// http://www.regexlib.com/REDetails.aspx?regexp_id=284
// Thank Myle Ott for the regular expression.
//
// The script follows same concept as the Linkify script from
// http://youngpup.net/userscripts. This time, its for email
// addresses instead of URLs.
//
//
// ==UserScript==
// @name	  Email Linkify (LinkedIn Invite Profile)
// @namespace	  http://gamingfox.blogspot.com/
// @description	  v0.5: Invite user to LinkedIn from 'Invite <name> to connect' & 'Other Contacts' in profile
// @include	  https://www.linkedin.com/inviteFromProfile*
// @include   	  https://www.linkedin.com/otherContacts*
// @include	  http://www.linkedin.com/inviteFromProfile*
// @include   	  http://www.linkedin.com/otherContacts*
// @version   	  0.5
// ==/UserScript==

var DEFAULT_MESSAGE = "I found you while I was searching my network at LinkedIn. Let's connect directly, so we can help each other with referrals. If we connect, both of our networks will grow. To add me as your connection, just follow the link below.";


(function () {
  var but;
  var emailRegExp = /\b([a-zA-Z0-9_\-])+(\.([a-zA-Z0-9_\-])+)*@((\[(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5]))\]))|((([a-zA-Z0-9])+(([\-])+([a-zA-Z0-9])+)*\.)+([a-zA-Z])+(([\-])+([a-zA-Z0-9])+)*))/ig;

	function invitation_callback(e) {
				GM_setValue("linkedin_invite_txt",
					prompt("Enter invite text here:\n(You can use '\\n' for newline.)",
						GM_getValue("linkedin_invite_txt",DEFAULT_MESSAGE).split("\n").join("\\n")
						).split("\\n").join("\n")
					);
				return GM_getValue("linkedin_invite_txt",DEFAULT_MESSAGE);
	}

	// Get default mail
  // greeting#invitation
  var field = document.getElementById("greeting#invitation");
  document.getElementById("autoResend#invitation").checked = 1;
	if(field) {
			var _default_message = GM_getValue("linkedin_invite_txt",DEFAULT_MESSAGE);
			if(_default_message == DEFAULT_MESSAGE)
				_default_message = invitation_callback("");
			field.value = _default_message;
	}
	GM_registerMenuCommand("LinkedIn Invitation Request", invitation_callback);
	
	

  // tags we will scan looking for un-hyperlinked email addresses
  var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
  var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " + "contains(translate(., '@', '@'), '@')]";

  var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var tmp;
  
  for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
          if (emailRegExp.test(cand.nodeValue)) {
      var span = document.createElement("span");
                var source = cand.nodeValue;
            
                cand.parentNode.replaceChild(span, cand);

                emailRegExp.lastIndex = 0;
                for (var match = null, lastLastIndex = 0; (match = emailRegExp.exec(source)); ) {
                    span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                    var a = document.createElement("a");
                    a.setAttribute("href", "mailto:"+match[0]);
										tmp = document.getElementById("emailAddress#invitee#invitation");
										tmp.value = match[0];
										but = document.getElementsByName("invite").item(0);
//                    a.setAttribute("target", "_new");
                    a.appendChild(document.createTextNode(match[0]));
                    span.appendChild(a);

                    lastLastIndex = emailRegExp.lastIndex;
                }

                span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
									
                span.normalize();
          }
  }
	if(tmp && tmp.value != "") {
		if(!document.getElementById("hdrerror"))
			but.click();
	}
})(); 



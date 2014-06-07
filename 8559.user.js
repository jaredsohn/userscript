// ==UserScript==
// @name            Flickr unknown reverse contacts
// @description     On your flickr reverse contacts page, the names of those who are not on your contact list appear in red.
// @author          Edward Grech | dwardu@dwardu.info | http://flickr.com/people/dwardu/
// @namespace       http://dwardu.info/
// @include         http://www.flickr.com/people/*/contacts/rev/*
// @include         http://flickr.com/people/*/contacts/rev/*
// @version         0.1
// ==/UserScript==
(function() {
	var listener = {
		flickr_contacts_getList_onLoad: function(success, responseXML, responseText, params) {
			if(success) {
				usernameAttrList = responseXML.evaluate("//contact/@username", responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				var setOfUsernames = {};
				for(i = 0; i < usernameAttrList.snapshotLength; i++)
				      setOfUsernames[usernameAttrList.snapshotItem(i).value] = true;

				var peopleResultsTable = document.evaluate("//table[@class='PeopleResults']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; 
				revContactUsernameAttrList = document.evaluate("//td[@class='Who']/h2/text()", peopleResultsTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for(i = 0; i < revContactUsernameAttrList.snapshotLength; i++) {
					if(!setOfUsernames[revContactUsernameAttrList.snapshotItem(i).nodeValue])
						revContactUsernameAttrList.snapshotItem(i).parentNode.style.color='red';
				}
				
				var extraParagraph = document.createElement('p');
				extraParagraph.innerHTML = 'If the name of a person appears in <span style="color: red;">red</span>, then that person is not yet on <em>your</em> contact list. [<a href="http://www.flickr.com/groups/flickrhacks/discuss/72157594554862265/">?</a>]';
				peopleResultsTable.parentNode.insertBefore(extraParagraph, peopleResultsTable);
				
				
			}
		}
	};
	//unsafeWindow.F.API.callMethod('flickr.contacts.getList', {}, listener);
	
	// "unsafeWindow.F.API.callMethod('flickr.contacts.getList', {}, listener);" was throwing an error, so I did following workaround... is there a cleaner way?
	var f = function() {
		try {
			unsafeWindow.F.API.callMethod('flickr.contacts.getList', {}, listener);
		} catch(err) {
			//GM_log('Postponing method call by 1000ms...');
			setTimeout(f, 1000);
		}
	};
	f();
})();
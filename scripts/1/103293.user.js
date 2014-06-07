// ==UserScript==
// @name           DNUK decryptor
// @namespace      http://www.doctors.net.uk/*
// @description    DNUK decryptor
// @include        http://www.doctors.net.uk/Forum/viewPost.aspx*
// @include        http://www.doctors.org.uk/Forum/viewPost.aspx*
// ==/UserScript==

// CSS selector for the rows: #PostList .bluetext2:nth-child(2)

XPathPosts = '//*[(@id = "PostList")]//*[@class="bluetext2" and ((count(preceding-sibling::*)  = 1) and parent::*)]'
posts = document.evaluate(XPathPosts, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i=0 ; i < posts.snapshotLength; i++ ) {
	row = posts.snapshotItem(i); 
	poster = row.childNodes[0].childNodes[3].textContent;
	if (poster == "midgley") {
		bodyText = row.childNodes[4];

		title = row.childNodes[0].childNodes[0].textContent.slice(0,-2);
		subject = document.createTextNode(title);		
		row.insertBefore(subject, bodyText);

		newline = document.createElement('br');
		row.insertBefore(newline, bodyText);

		newline = document.createElement('br');
		row.insertBefore(newline, bodyText);

		}
};
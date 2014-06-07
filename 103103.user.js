// ==UserScript==
// @name 		DNUK Killfile
// @description 	DNUK Killfile
// @include 		http://www.doctors.net.uk/*
// @include 		http://www.doctors.org.uk/*
// ==/UserScript==

// CSS selector for the rows: #PostList .bluetext2:nth-child(2)

XPathPosts = '//*[(@id = "PostList")]//*[@class="bluetext2" and ((count(preceding-sibling::*)  = 1) and parent::*)]'
posts = document.evaluate(XPathPosts, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i=0 ; i < posts.snapshotLength; i++ ) {
	row = posts.snapshotItem(i); 
	poster = row.childNodes[0].childNodes[3].textContent;
	if (poster == "vkaehne") {
	  row.style.color = '#ddeeee';
	  row.addEventListener('click', function() {this.style.color = 'inherit';}, false);
//	  row.textContent = "... " + poster + " didn't expect the Spanish Inquisition!";
	}
};



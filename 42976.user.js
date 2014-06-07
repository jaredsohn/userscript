// ==UserScript==
// @name          Clean break wall
// @namespace     http://apps.facebook.com/ability/profile/*
// @include       http://apps.facebook.com/ability/profile/*
// @include       http://apps.new.facebook.com/ability/profile/*
// @description   Clean mha wall from rickrolls and stuffs, by providing delete links.
// Step to use :
//	 1. If you haven't install grease monkey, install it to activate this script : https://addons.mozilla.org/firefox/addon/748
//	 2. If your wall is rickrolled install noscript first : https://addons.mozilla.org/en-US/firefox/addon/722
//	 3. Post this short snippet on your wall : <iframe></fb:iframe> 
//	 4. That snippet in the 2nd step will create a mess in mha walls, but don't worry, install this script and it will reveals the needed delete links on top left of your page
//	 5. Click delete links that this script created, and deleted as many as rick rolls as the guy created.
// ==/UserScript==

var posts={};
var profiles={};
var menu = '';

function getProfileID(){
	current = location.href;
	current = current.substring(current.indexOf("profile")+8);
	current = current.replace(/\D+/g,'');
	return current;
}

function process(brokenContent){
	idx = brokenContent.indexOf("postId");
	while(idx > 0){
		idLastProfile  = 16+brokenContent.substring(0,idx).lastIndexOf("ability\/profile")
		currentProfile = brokenContent.substring(idLastProfile, brokenContent.indexOf("\"", idLastProfile));
		brokenContent  = brokenContent.substring(idx);
		postId = brokenContent.substring(7,brokenContent.indexOf("&"));
		posts[postId]=postId;
		profiles[postId] = currentProfile;
		brokenContent = brokenContent.substring(8);
		idx = brokenContent.indexOf("postId");
	}
}


function provideDeleteLinks(){
	var allDivs, thisDiv;

	allDivs = document.evaluate( "//div[@class='wallkit_postcontent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < allDivs.snapshotLength; i++) {
	    thisDiv = allDivs.snapshotItem(i);
	    process(thisDiv.innerHTML);
	}
	for each (var postId in posts){
		    menu += '<li>Delete post: <a target=_blank href=http://apps.facebook.com/ability/deletePost?postId='+posts[postId]+'&profileId='+getProfileID()+'&type=profile> '+postId+'</a> from'+
		    	    '<br>MHA profile: <a href=http://apps.facebook.com/ability/profile/'+ profiles[postId] + '>'+profiles[postId]+'</a> </li>';
	}

	if (menu != '') {
		  menu = "Start deleting from the bottom: <blockquote>" + menu +"</blockquote>";
		  menuobj = document.createElement('ul');
		  menuobj.style.position = 'fixed';
		  menuobj.style.top = '10px';
		  menuobj.style.left = '10px';
		  menuobj.style.padding = '20px';
		  menuobj.style.backgroundColor = '#eee';
		  menuobj.innerHTML = menu;
		  body = document.getElementsByTagName('body')[0];
		  body.appendChild(menuobj);
	}
}

provideDeleteLinks();

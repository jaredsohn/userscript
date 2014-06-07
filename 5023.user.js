// ==UserScript==
// @name          Mefi Music Link
// @description   Adds a download link for the mp3 beside the Flash player
// @include       http://music.metafilter.com/mefi/*
// ==/UserScript==
// Why, oh why did I have to even spend time on this? 
// Why would you not provide a download link? 
// Is it there and I am an idiot and missed it?
// TODO: Put download link in nicer place (e.g. after x user marked this...)
// and make size appropriate
// TODO: Figure out why this is dog slow on my machine (Maybe it's Flash?)

var v = document.evaluate("//embed[@src='http://music.metafilter.com/mp3player.swf']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);


for (var i = v.snapshotLength - 1; i>=0; i--){
	var elm = v.snapshotItem(i);

	// Get the location of mp3 file
	var flashvars_str = elm.getAttribute('flashvars');
	//GM_log(flashvars_str);
	var flashvars = flashvars_str.split('&');

	// One of these should be file=http://www.something.com/file.mp3
	// It should be second one but we play it safe and check them.
	// We only match mp3 files, although modification is easy enough.
	for (var j = flashvars.length - 1; j>=0; j--){
		if(flashvars[j].match(/^file=http:\/\/.*\.mp3/)){
			//GM_log(flashvars[j]);
			var dhref = flashvars[j].split('=')[1];
			//GM_log(dhref)
			break;
			
		}
	
	}
	
	if(dhref){
	
	// Append download link
	var dlink = document.createElement('a');
	dlink.href = dhref
	dlink.appendChild(document.createTextNode(' Download'));
	elm.parentNode.insertBefore(dlink,elm.nextSibling);
	}
	else{
		GM_log('Error: Couldn\'t find MP3 link');
	}



}
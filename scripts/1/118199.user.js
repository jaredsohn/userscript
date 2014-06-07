// ==UserScript==
// @name			MLP:FiM Fansites YouTube Linkifier
// @author			Gryphonvere
// @version			1.1.0
// @description		Adds a direct link below all YouTube videos posted on 'supported' MLP:FiM fansites (EqD, DHS, PonyLeaks, etc.) [Formerly "Equestria Daily YouTube Linkifier."]
// @include			http://www.equestriadaily.com/*
// @include			http://www.derpyhoovesstudio.com/*
// @include			http://equestrianrhythm.blogspot.com*
// @include			http://www.dehorror.com/*
// @include			http://ponyleaks.yoursiblings.org/*
// ==/UserScript==

/*
	Script History
	
	1.0.0	2011-11-15		Initial release.
	1.0.1	2011-11-16		Fix to wrap the naked code within a function.  Whoops!
	1.0.2	2011-11-16		Tidying and metadata fiddling.
	1.0.3	2011-12-18		Fix to preserve any arguments following the video URL (an "?hd=1" argument caused an error 500 on YouTube).  Needs to be "&hd=1".
	1.1.0	2011-12-20		Added Derpy Hooves Studio, Equestrian Rhythm, PonyLeaks, and De Horror!/The Horror! to @include list -- as all these use the same embedding practices as EqD, why not expand to them as well? :)
							In light of the expanded @include list, I've renamed the script to reflect its functions.
							Altered how links are created (discovered extraneous <a></a> tags) as well as added flexible "top and tail-ing" <br> system.  A series of URL-based matches isn't especially elegant,
							but it'll work, I suppose.


	Note: The sites I have included are ones which meet three criteria:
		1) They embed YouTube videos in what I believe to be a seemingly standardized iFrame format.
		2) I am aware of the site(s).  I began with EqD and then expanded to DHS as those were the sites which I followed.  The rest were found via http://mlpfanart.wikia.com/wiki/External_links and through the two aforementioned sites.  This is not meant to be preferential treatment or anything along those lines.
		3) I can get them to function with the script -- for instance, DerpyHoovesNews.com/.net doesn't seem to want to play nicely, as there appear to be a bunch of embedded documents which throw off the script and I can't seem to work around this.
		4) Any suggestions of other sites to include in this script (or fixes pertaining to note #3) are welcome.  Feel free to drop a message through the Userscripts messaging system or post in the discussions for this script.
*/

(function() {
	
	var topAndTail = [true,true]; // True/False determines if a <br> tag precedes and/or follows the link.

	var URL = document.location.toString();
	
	if (URL.match(/derpyhoovesstudio/i)) {
	
		topAndTail[0] = false;
	
	}
	else if (URL.match(/equestrianrhythm/i)) {
	
		topAndTail[1] = false;
	
	}
	// Site-based formatting to keep the YT links immediately below the embedded video links and avoid introducing excessive spacing.

	var iFrames = document.getElementsByTagName('iframe'); // Find all iFrame elements on the page
	
	for (var i=0; i < iFrames.length; i++) { // Iterate through all found elements
		
		if (iFrames[i].getAttribute("src").match(/youtube/i)) { // Only operate on those with YouTube links
		
			var youtubeVid = 'http://www.youtube.com/watch?v=' + iFrames[i].getAttribute("src").toString().replace("http:\/\/www.youtube.com\/embed\/","").replace("\?","&");
			// Extracts and formats the direct YouTube link, preserving arguments.
			
			var link = document.createElement('a');
			link.href = youtubeVid;
			link.innerHTML = "YouTube Link";
			// Creates and formats link element.
			
			iFrames[i].parentNode.insertBefore(link,iFrames[i].nextSibling); // Adds link following the embedded clip.
			
			// Implementing the site-based formatting.
			if (topAndTail[0] == true) iFrames[i].parentNode.insertBefore(document.createElement('br'),link); // Spacing above
			
			if (topAndTail[1] == true) iFrames[i].parentNode.insertBefore(document.createElement('br'),link.nextSibling); // Spacing below
		}
		
	}

})();
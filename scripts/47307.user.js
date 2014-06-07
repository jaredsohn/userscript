// ==UserScript==
// @name           Comedy Smuggler
// @author			Mark Mulder (offcentric.com)
// @description    Converts deeplinks to episodes of The Daily Show and The Colbert Report hosted on comedycentral.com to the Canada-friendly link on thecomedynetwork.ca
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// @include        http://huffingtonpost.com/*
// @include        http://www.huffingtonpost.com/*
// ==/UserScript==

if(window.location.href.indexOf("reddit.com") != -1){
	var allLinks = document.evaluate('//div[substring(@class,1,5)="entry"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(x=0;x<=allLinks.snapshotLength;x++){
		entry = allLinks.snapshotItem(x);
		link = document.evaluate('p[@class="title"]/a', entry, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		age = document.evaluate('p[@class="tagline"]', entry, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
		age = age.substring(age.indexOf(" "), age.indexOf(" ago"));
		// very crude method of checking the age of a link : if has been 'months' since submission, it's probably not on thecomedynetwork.ca anymore
		if(age.indexOf("months") == -1){
			if(link.href.indexOf("http://thedailyshow.com") != -1 || link.href.indexOf("http://www.thedailyshow.com") != -1 || link.href.indexOf("http://colbertnation.com") != -1 || link.href.indexOf("http://www.colbertnation.com") != -1){
				if(link.className.indexOf("title") != -1){
					var link_container = document.createElement("span");
					link_container.innerHTML = "(<a target=\"_blank\" href=\"http://comedy-smuggler.offcentric.com/?url=" + escape(link.href) + "&redirect=true\">Canada-friendly link</a>) ";
					link.parentNode.insertBefore(link_container, link);		
				}
			}
		}
	}
}

if(window.location.href.indexOf("huffingtonpost.com") != -1){
	var embeds = document.evaluate('//embed[contains(@src, "http://media.mtvnservices.com/mgid:cms:item:comedycentral.com:")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(x=0;x<=embeds.snapshotLength;x++){
		embed = embeds.snapshotItem(x);
		videoId= embed.src.substring(embed.src.indexOf("comedycentral.com:")+18);
		var link_container = document.createElement("span");
		link_container.innerHTML = "(<a style=\"font-size:1.4em;font-weight:bold\" target=\"_blank\" href=\"http://comedy-smuggler.offcentric.com/?url=" + escape("http://www.thedailyshow.com/video/index.jhtml?videoId=" + videoId) + "&redirect=true\">Canada-friendly link</a>) ";
		embed.parentNode.appendChild(link_container);		
	}
}
//Library of Catalanizator-New twitter en català
// ==UserScript==
// @name           [Biblioteca] del Catalanizator - Twitter en català based on [LYBARY of] MSN emoticons In Facebook
// @namespace      el_libre -- www.catmidia.cat
// @description    Biblioteca per traduir les paraules de la interfície de Twitter en imatges.Seqüència a instal·lar http://userscripts.org/scripts/show/47575.
// @include        *
// @version        V:23012011
// @author         el_libre -- www.catmidia.cat
// ==/UserScript==



String.prototype.isPrefixOf = function(str, from){
	if (arguments.length < 2) 
		from = 0;
	else 
		from = parseInt(from);
	
	if (from < 0 || from >= str.length) 
		return false;
	
	if (from + this.length > str.length) 
		return false;
	
	for (var i = 0; i < this.length; i++) 
		if (this.charCodeAt(i) != str.charCodeAt(from + i)) 
			return false;
	
	return true;
}
	
	

	
	
	var emoticons = [];
///////////////////////         :) or :-)

emoticons["About"] = {
        src: "http://catmidia.cat/c/about.png",
        alt: "Proves"
    };
    
	emoticons["Help"] = {
        src: "http://catmidia.cat/c/help.png",
        alt: "Proves"
    };
    
	emoticons["Status"] = {
        src: "http://catmidia.cat/c/status.png",
        alt: "Proves"
    };
    
	emoticons["Jobs"] = {
        src: "http://catmidia.cat/c/jobs.png",
        alt: "Proves"
    };
    
	emoticons["Terms"] = {
        src: "http://catmidia.cat/c/terms.png",
        alt: "Proves"
    };
    
	emoticons["Privacy"] = {
        src: "http://catmidia.cat/c/privacy.png",
        alt: "Proves"
    };
    
	emoticons["Shortcuts"] = {
        src: "http://catmidia.cat/c/shortcuts.png",
        alt: "Proves"
    };
    
	emoticons["Businesses"] = {
        src: "http://catmidia.cat/c/businesses.png",
        alt: "Proves"
    };
    
	emoticons["Media"] = {
        src: "http://catmidia.cat/c/media.png",
        alt: "Proves"
    };
    
	emoticons["Developers"] = {
        src: "http://catmidia.cat/c/developers.png",
        alt: "Proves"
    };

	                              emoticons["Reply"] = {
        src: "http://catmidia.cat/c/reply.png",
        alt: "Proves"
    };
    
                            emoticons["Retweet"] = {
        src: "http://catmidia.cat/c/retweet.png",
        alt: "Proves"
    };
    
                            emoticons["Favorite"] = {
        src: "http://catmidia.cat/c/favorite.png",
        alt: "Proves"
    };
    
                            emoticons["Recently listed in"] = {
        src: "http://catmidia.cat/c/recentlylistedin.png",
        alt: "Proves"
    };
    
                            emoticons["minutes ago"] = {
        src: "http://catmidia.cat/c/minutesago.png",
        alt: "Proves"
    };
    
                            emoticons["Follow"] = {
        src: "http://catmidia.cat/c/follow.png",
        alt: "Proves"
    };
    
                            emoticons["new tweets"] = {
        src: "http://catmidia.cat/c/newtweets.png",
        alt: "Proves"
    };
    
                            emoticons["s happening?"] = {
        src: "http://catmidia.cat/c/shappening.png",
        alt: "Proves"
    };
    
                            emoticons["What"] = {
        src: "http://catmidia.cat/c/what.png",
        alt: "Proves"
    };
                            emoticons["Who to follow"] = {
        src: "http://catmidia.cat/c/whotofollow.png",
        alt: "Proves"
    };
                            emoticons["Trends"] = {
        src: "http://catmidia.cat/c/trends.png",
        alt: "Proves"
    };
                            emoticons["Listed"] = {
        src: "http://catmidia.cat/c/listed.png",
        alt: "Proves"
    };
    
                            emoticons["Followers"] = {
        src: "http://catmidia.cat/c/followers.png",
        alt: "Proves"
    };
                            emoticons["Following"] = {
        src: "http://catmidia.cat/c/following.png",
        alt: "Proves"
    };
                        emoticons["Your Tweets"] = {
        src: "http://catmidia.cat/c/yourtweets.png",
        alt: "Proves"
    };
                    emoticons["Lists"] = {
        src: "http://catmidia.cat/c/lists.png",
        alt: "Proves"
    };
                emoticons["Searches"] = {
        src: "http://catmidia.cat/c/searches.png",
        alt: "Proves"
    };
            emoticons["Your Tweets, retweeted"] = {
        src: "http://catmidia.cat/c/yourtweetsretweeted.png",
        alt: "Proves"
    };
        emoticons["Retweets by you"] = {
        src: "http://catmidia.cat/c/retweetsbyyou.png",
        alt: "Proves"
    };
        emoticons["Retweets by others"] = {
        src: "http://catmidia.cat/c/retweetsbyothers.png",
        alt: "Proves"
    };
        emoticons["@Mentions"] = {
        src: "http://catmidia.cat/c/mention.png",
        alt: "Proves"
    };
    
        emoticons["Create a list"] = {
        src: "http://catmidia.cat/c/createalist.png",
        alt: "Proves"
    };
    
        emoticons["following you"] = {
        src: "http://catmidia.cat/c/followingyou.png",
        alt: "Proves"
    };
    
        emoticons["Worldwide"] = {
        src: "http://catmidia.cat/c/worldwide.png",
        alt: "Proves"
    };
    
        emoticons["change"] = {
        src: "http://catmidia.cat/c/change.png",
        alt: "Proves"
    };
    
        emoticons["view all"] = {
        src: "http://catmidia.cat/c/viewall.png",
        alt: "Proves"
    };
    
        emoticons["Suggestions for you"] = {
        src: "http://catmidia.cat/c/suggestionsforyou.png",
        alt: "Proves"
    };
    
        emoticons["Timeline"] = {
        src: "http://catmidia.cat/c/timeline.png",
        alt: "Proves"
    };
    
        emoticons["Advertisers"] = {
        src: "http://catmidia.cat/c/advertisers.png",
        alt: "Proves"
    };
    
        emoticons["Resources"] = {
        src: "http://catmidia.cat/c/resources.png",
        alt: "Proves"
    };
    
        emoticons["Browse interests"] = {
        src: "http://catmidia.cat/c/browseinterests.png",
        alt: "Proves"
    };
    
        emoticons["Find friends"] = {
        src: "http://catmidia.cat/c/findfriends.png",
        alt: "Proves"
    };
    
        emoticons["Refresh suggestions"] = {
        src: "http://catmidia.cat/c/refreshsuggestions.png",
        alt: "Proves"
    };
    
        emoticons[" ago"] = {
        src: "http://catmidia.cat/c/ago.png",
        alt: "Proves"
    };
    
        emoticons["minutes"] = {
        src: "http://catmidia.cat/c/minutes.png",
        alt: "Proves"
    };
    
        emoticons["minute"] = {
        src: "http://catmidia.cat/c/minute.png",
        alt: "Proves"
    };
	
	    
        emoticons["hour"] = {
        src: "http://catmidia.cat/c/hours.png",
        alt: "Proves"
    };
    
        emoticons["hours"] = {
        src: "http://catmidia.cat/c/hours.png",
        alt: "Proves"
    };

        emoticons["Activity"] = {
        src: "http://catmidia.cat/c/activity.png",
        alt: "Proves"
    };
   
        emoticons["seconds"] = {
        src: "http://catmidia.cat/c/seconds.png",
        alt: "Proves"
    };
    
        emoticons["refresh"] = {
        src: "http://catmidia.cat/c/refresh.png",
        alt: "Proves"
    };
    
        emoticons["by you"] = {
        src: "http://catmidia.cat/c/byyou.png",
        alt: "Proves"
    };
    
        emoticons["you follow"] = {
        src: "http://catmidia.cat/c/youfollow.png",
        alt: "Proves"
    };
    
        emoticons["follows, retweets"] = {
        src: "http://catmidia.cat/c/followsretweets.png",
        alt: "Proves"
    };
    
        emoticons[" and more by people"] = {
        src: "http://catmidia.cat/c/andmorebypeople.png",
        alt: "Proves"
    };
    
        emoticons["Followed by"] = {
        src: "http://catmidia.cat/c/followedby.png",
        alt: "Proves"
    };
    
        emoticons["Mobile"] = {
        src: "http://catmidia.cat/c/mobile.png",
        alt: "Proves"
    };
    
        emoticons["Show mentions only"] = {
        src: "http://catmidia.cat/c/showmentionsonly.png",
        alt: "Proves"
    };
    
        emoticons["mentions and more"] = {
        src: "http://catmidia.cat/c/mentionsandmore.png",
        alt: "Proves"
    };
    
        emoticons["retweeted you"] = {
        src: "http://catmidia.cat/c/retweetedyou.png",
        alt: "Proves"
    };
    
        emoticons["followed you"] = {
        src: "http://catmidia.cat/c/followedyou.png",
        alt: "Proves"
    };
    
        emoticons["people"] = {
        src: "http://catmidia.cat/c/people.png",
        alt: "Proves"
    };
    
        emoticons["Back to top"] = {
        src: "http://catmidia.cat/c/backtotop.png",
        alt: "Proves"
    };
    
        emoticons["Delete"] = {
        src: "http://catmidia.cat/c/delete.png",
        alt: "Proves"
    };
    
        emoticons["ed by"] = {
        src: "http://catmidia.cat/c/edby.png",
        alt: "Proves"
    };
    
        emoticons["new tweet"] = {
        src: "http://catmidia.cat/c/newtweet.png",
        alt: "Proves"
    };
    
        emoticons["and others"] = {
        src: "http://catmidia.cat/c/andothers.png",
        alt: "Proves"
    };
    
        emoticons["close"] = {
        src: "http://catmidia.cat/c/close.png",
        alt: "Proves"
    };
    
        emoticons["People"] = {
        src: "http://catmidia.cat/c/people2.png",
        alt: "Proves"
    };
    
        emoticons["Places"] = {
        src: "http://catmidia.cat/c/place.png",
        alt: "Proves"
    };
    
        emoticons["Words"] = {
        src: "http://catmidia.cat/c/words.png",
        alt: "Proves"
    };
    
        emoticons["Other"] = {
        src: "http://catmidia.cat/c/other.png",
        alt: "Proves"
    };
	

		
var emotxt = [];
var yemo = [];
var c;
for (var emo in emoticons) 
	if (!(emoticons[emo] instanceof Function)) {
		c = emo.charCodeAt(0);
		if (!yemo[c]) 
			yemo[c] = [];
		
		yemo[c].push({
			emoticon: emo,
			src: emoticons[emo].src
		});
	}
	
function f(o1, o2){
	if (o1.emoticon.isPrefixOf(o2.emoticon)) 
		return 1;
	
	if (o1.emoticon > o2.emoticon) 
		return 1;
	
	if (o1.emoticon < o2.emoticon) 
		return -1;
	
	return 0;
}
var i;	
for (i = 0; i < yemo.length; i++) 
	if (yemo[i]) 
		yemo[i].sort(f);
	
function replaceTextNode(textNode, sortedEmoticonSet)
{
	var content = textNode.textContent;
	var currentStopPosition;
	var i, j;
	var firstChar;
	var found = false;
	var htmls = [];
	var img;
	currentStopPosition = i = 0;
	while (i < content.length) {
		firstChar = content.charCodeAt(i);
		if (sortedEmoticonSet[firstChar]) 
			for (j = 0; j < sortedEmoticonSet[firstChar].length; j++) 
				if (sortedEmoticonSet[firstChar][j].emoticon.length && sortedEmoticonSet[firstChar][j].emoticon.isPrefixOf(content, i)) {
					if (currentStopPosition < i) 
						htmls.push(document.createTextNode(content.substr(currentStopPosition, i - currentStopPosition)))
					
					img = document.createElement('img');
					img.src = sortedEmoticonSet[firstChar][j].src;
					img.title = sortedEmoticonSet[firstChar][j].emoticon;
					htmls.push(img);
					
					
					i += sortedEmoticonSet[firstChar][j].emoticon.length;
					currentStopPosition = i;
					found = true;
					break;
				}
		
		if (found) {
			found = false;
			continue;
		}
		i++;
	}
	
	if(currentStopPosition>0&&currentStopPosition<content.length-1)
		htmls.push(document.createTextNode(content.substr(currentStopPosition)));
	
	var span=null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}


function replaceElement(element, emos){
	var pathResult = document.evaluate(".//text()", element, null, 7, null);
	
	for (i = 0; i < pathResult.snapshotLength; i++) {
		var tNode = pathResult.snapshotItem(i);
		if (tNode.parentNode) {
			var span = replaceTextNode(tNode, emos);
			if (span) 
				tNode.parentNode.replaceChild(span, tNode);
		}
	}
}
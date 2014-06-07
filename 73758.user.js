// ==UserScript==
// @name           YouTube show likes/dislikes
// @namespace      http://mike.thedt.net
// @description    Shows the number of times a video has been liked/disliked, without having to (dis)like it.
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @version        1.4
// ==/UserScript==

var ratings=document.getElementById('watch-actions-ajax');
var rating;
var template='<div class="close"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite-new close-button" onclick="yt.www.watch.watch5.hide();"></div><div><span class="watch-action-response"><span class="watch-ratings-stats-div"><strong>Ratings for this video </strong><span class="watch-ratings-stats-parenthesis">(R1 total)</span><br><table class="watch-ratings-stats-table"><tbody><tr><td><img class="master-sprite-new watch-ratings-stats-like" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" alt="Number of likes"></td><td>R2</td><td width="100%"><div class="likes-bar" style="width: R3%;"></div></td></tr><tr><td><img class="master-sprite-new watch-ratings-stats-unlike" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" alt="Number of dislikes"></td><td>R4</td><td width="100%"><div class="dislikes-bar" style="width: R5%;"></div></td></tr></tbody></table></div></span></div>';

var videoid = location.href.match(/v=([^&]{11})/);

GM_addStyle("#watch-actions-area-container { height: auto !important; display: inline !important; }");
GM_addStyle("#watch-actions-ajax { height: auto !important; display: inline !important; }");
ratings.innerHTML="Loading ratings...";

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://gdata.youtube.com/feeds/videos/'+videoid[1],
	headers: {
		'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.2.2) Gecko/20100316 Firefox/3.6.2 (.NET CLR 3.5.30729)',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		if (responseDetails.responseText!="Video not found")
		{
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var entry = dom.getElementsByTagName('entry');
			rating=entry[0].getElementsByTagName('gd:rating')[0];
			if (rating)
			{
				var average=rating.getAttribute('average');
				var total=rating.getAttribute('numRaters');
				var likes=Math.round((total*(average-1))/4);
				var dislikes=total-likes;
				
				template = template.replace('R1', total);
				template = template.replace('R2', likes);
				if (total!=0)
					template = template.replace('R3', (likes/total)*100);
				else
					template = template.replace('R3', '0');
				template = template.replace('R4', dislikes);
				if (total!=0)
					template = template.replace('R5', (dislikes/total)*100);
				else
					template = template.replace('R5', '0');
				
				ratings.innerHTML=template;
			}
			else
			{
				ratings.innerHTML="No ratings information was found.";
			}
		}
		else
		{
			ratings.innerHTML="An error occured while trying to load the ratings' information (new video?).";
		}
	},
	onerror: function(responseDetails) {
		ratings.innerHTML="An error occured while trying to load the ratings' information (new video?).";
	}
});

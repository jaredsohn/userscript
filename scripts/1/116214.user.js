// ==UserScript==
// @name          YTRating
// @namespace     absolut-fair.com
// @description   Shows the rating of videos in the related videos
// @include       http://*youtube.com*
// @include       https://*youtube.com*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @updateURL     https://userscripts.org/scripts/source/116214.meta.js
// @downloadURL   https://userscripts.org/scripts/source/116214.user.js
// @version       1.0.2
// ==/UserScript==

$(document).ready(function () {
	window.setInterval(function() { loadrating(); },1000);
});

function loadrating(div,link)
{
	$('img[alt="Thumbnail"], img[data-thumb]').closest('a').each(function (i) {
		if( $(this).attr('done') == 1) return true;
		else $(this).attr('done','1');
	
		var that=this;
		var inda=i;
		var hrea = $(this).attr('href');
		if(hrea.indexOf('?v=')==-1) 
		{
			if($(this).closest('div[data-context-item-id]').length)
			{
				hrea = "/watch?v="+($(this).closest('div[data-context-item-id]').attr("data-context-item-id"));
			}
			else return true;
		}
		hrea = hrea.replace("&amp;","&");
		hrea=hrea+"&";
		var vidid = hrea.between('?v=','&');
		
		//alert(vidid);
	
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://gdata.youtube.com/feeds/api/videos/"+vidid+"?v=2",
			headers: {
				"Accept": "text/xml",
				"GData-Version": "2",
				"X-GData-Key": "key=AI39si59MgtnnLtTwZTnvZ--XNvnXWlYpVcDfYO8AJK-CJSmS3pTytqktlxTp3YVriK0IYGcx1z2BK1_ud1DEduKBAI7T3JdpQ"
			  },
			onload: function(resp) {
				var xmldat = new DOMParser().parseFromString(resp.responseText, "text/xml");
				var conti=resp.responseText;
				var rating = xmldat.getElementsByTagNameNS("http://gdata.youtube.com/schemas/2007","rating");
				if(conti.indexOf("yt:rating")!=-1)
				{
					var likes = rating[0].getAttribute("numLikes");
					var dislikes = rating[0].getAttribute("numDislikes");
				}
				else 
				{
					var likes="1";
					var dislikes="0";
				}
				//console.log("Ergebnis:"+likes+"/"+dislikes);
				likes=likes.replace('.', '');
				dislikes=dislikes.replace('.', '');
				if(likes.length>0 && conti.indexOf("action='rate' permission='denied'")==-1)
				{
					var resul = likes+"/"+dislikes;
					likes=parseInt(likes);
					dislikes=parseInt(dislikes);
					
					var dr = (likes/(likes+dislikes))*100;
					dr=Math.round(dr);

					if((likes+dislikes)>80)
					{
						if(dr > 70) $('.video-time', that).append("<label style='color:#82FA58;font-size:18px;'> "+dr+"%</label>");
						else if(dr > 40) $('.video-time', that).append("<label style='color:#C9C618;font-size:18px;'> "+dr+"%</label>");
						else $('.video-time', that).append("<label style='color:red;font-size:18px;'> "+dr+"%</label>");
					}
					else 
					{
						if((likes+dislikes)==0)	$('.video-time', that).append("<label style='color:#848484; font-size:18px;'> NO</label>");
						else $('.video-time', that).append("<label style='color:#848484; font-size:18px;'> "+dr+"%</label>");
					}
				}
				else 
				{
					$('.video-time', that).append("<label style='color:red;font-size:18px;'> OFF</label>");
				}
			}
		});
		//return false;
	});
}


String.prototype.between = function(prefix, suffix) {
s = this;
var i = s.indexOf(prefix);
if (i >= 0) {
s = s.substring(i + prefix.length);
}
else {
return '';
}
if (suffix) {
i = s.indexOf(suffix);
if (i >= 0) {
s = s.substring(0, i);
}
else {
return '';
}
}
return s;
}

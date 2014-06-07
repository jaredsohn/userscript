// ==UserScript==
// @id             ytSuggestionsRatings
// @name           YT Suggestions Ratings
// @namespace      faleij
// @description    Adds Ratings to all video suggestions
// @include        http://youtube.*
// @include        http://*.youtube.*
// @updateURL  	   http://userscripts.org/scripts/source/112981.meta.js
// @version        1.0.0
// ==/UserScript==
function related()
{
	
	var elmt = document.getElementById("watch-more-related");
    console.log("related",elmt);
	var check = function() {
         // Check for a change
		if (elmt.getElementsByClassName("video-list-item").length > 0){
			clearInterval(int);
            ratings(elmt);
        }
    }
    var int=setInterval(check, 1000);
}

function ratings(elmt)
{
	if(!elmt)
		elmt = document.body;
	var ar = new Array();
	Array.prototype.slice.call(elmt.querySelectorAll(".video-list-item>a")).forEach(function(elmt){
		var injectTarget = elmt; //make object accesible for async get
		try{
			var videoID = elmt.href.split("v=")[1].split("&")[0];
		}catch(err){
			console.log("YtSR error:",err);
			return;
		}
		var url = "http://gdata.youtube.com/feeds/api/videos/"+videoID+"?v=2&alt=json";
		ar[url] = injectTarget
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (responseDetails) {
				var obj = JSON.parse(responseDetails.responseText);
				var rating = obj.entry.yt$rating;
				var target = ar[url];
				ar[url] = null; //prevent strange duplicates
				if(target==null) 
					return;
				var likes = (parseFloat(rating.numLikes) / (parseFloat(rating.numLikes)+parseFloat(rating.numDislikes))) * 100;
				var dislikes = (parseFloat(rating.numDislikes) / (parseFloat(rating.numLikes)+parseFloat(rating.numDislikes))) * 100;
				var ratings = document.createElement("div");
				ratings.innerHTML = '<div class="watch-sparkbars" id="'+url+'" title="'+rating.numLikes+' likes,'+rating.numDislikes+' dislikes"><div class="watch-sparkbar-likes" style="width: '+likes+'%" ></div><div class="watch-sparkbar-dislikes" style="width: '+dislikes+'%"></div></div>';
				console.log(url," target: ",target);
				target.appendChild(ratings.firstChild);
				ratings = null;
				target = null;
			}});
		});
}

ratings();
var relatedBtn = document.getElementById("watch-more-related-button")
if(relatedBtn)
	relatedBtn.addEventListener("click", related);

//$(".featured-label").css("bottom","12px");
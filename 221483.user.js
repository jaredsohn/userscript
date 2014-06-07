// ==UserScript==
// @name           Hide Ratings @Douban
// @namespace      http://www.douban.com
// @description    Hide ratings
// @version        0.1
// @include        http://*.douban.com/*
// ==/UserScript==


// page
function disableInfosect()
{
	var infosect = document.getElementById("interest_sectl");
	if (infosect){
		infosect.style.display = "none";
	}
}

// search results page
function disableRatinginfo()
{
	var info = document.getElementsByClassName("rating-info");

	for (j = 0; j < info.length; j++){
		for(k = 0; k < info[j].childNodes.length; k++){
			if (info[j].childNodes[k].className == "subject-cast")
			{
				info[j].innerHTML = info[j].childNodes[k].innerHTML;
			}
		}
    }
}


disableInfosect()
disableRatinginfo()
// ==UserScript==
// @name           A-P Character Avg Rating
// @namespace      http://localhost
// @include        http://www.anime-planet.com/characters/*
// @include        http://www.anime-planet.com/people/*
// ==/UserScript==

function getElementByClassName(elementType, className, src)
{
	if (src == null)
	{
		src = document;
	}
	var tags = src.getElementsByTagName(elementType);
	var i;
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className == className)
		{
			return tags[i];
		}
	}
	return null;
}

var panel = getElementByClassName("div", "mid", getElementByClassName("div", "tabPanel1 box12"));
var positiveVotes = parseInt(getElementByClassName("span", "like-count").innerHTML.replace(" people", "").replace(",", ""));
var negativeVotes = parseInt(getElementByClassName("span", "dislike-count").innerHTML.replace(" people", "").replace(",", ""));
if (panel != null && positiveVotes != null && negativeVotes != null)
{
	var allVotes = positiveVotes + negativeVotes;
	var avgRatingBar = document.createElement("tr");
	var avgText = document.createElement("td");
	avgText.width = "1%";
	avgText.innerHTML = "<strong>Avg</strong>";
	var spaceToTheRight = document.createElement("td");
	spaceToTheRight.width = "99%";
	var starArea = document.createElement("div");
	starArea.className = "avgRating";
	var stars = document.createElement("span");

	if (allVotes > 9)
	{
		var score = (positiveVotes * 5 + negativeVotes * 0.5) / allVotes;
		var splitVotes;
		if (allVotes > 999)
		{
			splitVotes = (allVotes / 1000).toString().replace(".", ",");
		}
		else
		{
			splitVotes = allVotes;
		}
		starArea.title = score.toFixed(3) + " out of 5 from " + splitVotes;
		var procentage = score / 0.05;
		stars.style.width = procentage + "%";
		stars.innerHTML = starArea.title;//score + " out of 5 from " + splitVotes;;
	}
	else
	{
		var votesRemaining = 10 - allVotes;
		starArea.title = votesRemaining + " more votes needed to calculate an average";
		stars.style.width = "0%";
		stars.innerHTML = votesRemaining + " more votes needed to calculate an average";
	}
	starArea.appendChild(stars);
	spaceToTheRight.appendChild(starArea);
	avgRatingBar.appendChild(avgText);
	avgRatingBar.appendChild(spaceToTheRight);
	panel.insertBefore(avgRatingBar, panel.children[2]);
	var separator = document.createElement("div");
	separator.className = "hr";
	panel.insertBefore(separator, panel.children[2]);
}
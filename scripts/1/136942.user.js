// ==UserScript==
// @name           A-P Average Ratings
// @namespace      http://localhost
// @include        http://www.anime-planet.com/users/*
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

function getElementsByClassName(elementType, className, src)
{
	if (src == null)
	{
		src = document;
	}
	var tags = src.getElementsByTagName(elementType);
	var result = new Array();
	var i;
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className == className)
		{
			result.push(tags[i]);
		}
	}
	if (result.length == 0)
	{
		return null;
	}
	else
	{
		return result;
	}
}


function addAvgRating(panel)
{
	var scores = new Array();
	var sum = 0;
	var i;
	for (i = 0; i < 10; i++)
	{
		var score = 100 - parseInt(panel.children[1].children[i].style.backgroundPosition);
		//alert(score);
		sum += score;
		scores.push(score);
	}
	var avgRatingBar = document.createElement("tr");
	var avgText = document.createElement("td");
	avgText.width = "1%";
	avgText.innerHTML = "<strong>Avg</strong>";
	var spaceToTheRight = document.createElement("td");
	spaceToTheRight.width = "99%";
	var starArea = document.createElement("div");
	starArea.className = "avgRating";
	var stars = document.createElement("span");

	if (sum > 0)
	{
		//var score = (positiveVotes * 5 + negativeVotes * 0.5) / allVotes;
		var score = 0;
		for (i = 0; i < 10; i++)
		{
			score += (5 - i * 0.5) * scores[i];
		}
		score = score / sum;
		starArea.title = score.toFixed(3) + " out of 5" ;
		var procentage = score / 0.05;
		stars.style.width = procentage + "%";
		stars.innerHTML = starArea.title;//score + " out of 5 from " + splitVotes;;
	}
	else
	{
		starArea.title = "More votes are needed to calculate an average";
		stars.style.width = "0%";
		stars.innerHTML = "More votes are needed to calculate an average";
	}
	starArea.appendChild(stars);
	spaceToTheRight.appendChild(starArea);
	avgRatingBar.appendChild(avgText);
	avgRatingBar.appendChild(spaceToTheRight);
	//panel.insertBefore(avgRatingBar, panel.children[2]);
	var separator = document.createElement("div");
	separator.className = "hr";
	panel.appendChild(separator);
	panel.appendChild(avgRatingBar);
	//var separator = document.createElement("div");
	//separator.className = "hr";
	//panel.insertBefore(separator, panel.children[2]);
}

var panel = getElementsByClassName("div", "profRatingStats box3");
if (panel != null)
{
	for (n = 0; n < panel.length; n++)
	{
		addAvgRating(getElementByClassName("div", "mid", panel[n]));
	}
}
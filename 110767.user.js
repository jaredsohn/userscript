// ==UserScript==
// @name           PC_Gamer_Review_Fixer
// @namespace      www.pcgamer.com
// @grant          none
// @description    Modifies the review score to be more... accurate.
// @include        http*://*.pcgamer.com/*
// @version        2
// @author         Beigeman
// ==/UserScript==

// == User Variables ==
var scalingThreshhold = 45; // What score to start scaling from. Higher is harsher, lower is more lenient.
var scalingFactor = 3.3; // How much to scale.
// == User Variables ==		

overviewPage();
	
inReview();

function overviewPage()
{
	var els = document.getElementsByClassName('post-score');
	
	console.log(els.length);
	
	if (!els)
		return;
	
	for (var i = 0; i < els.length; i++)
	{	
		els[i].textContent = fudgeScore(els[i].textContent);
	}
}

function inReview()
{
	var element = document.getElementById('verdictBoxScore');
	
	if (!element)
		return;
	
	var src = "http://static.pcgamer.futurecdn.net/assets/images/verdictBox/";
	
	var img1 = element.children[0];
	var img2 = element.children[1];

	
	var val = fudgeScore(img1.alt + img2.alt);

	if (val < 0)
	{
		val = 0;
	}
	if (val < 10)
	{
		img1.src = src + 0 + ".jpg";
		img2.src = src + val + ".jpg";		
	}
	else
	{
		str1 = val.toString();
		img1.src = src + str1.charAt(0) + ".jpg";
		img2.src = src + str1.charAt(1) + ".jpg";
	}
}
	
function fudgeScore(scoreIn)
{
	var scoreOut = parseInt(scoreIn, 10);
	
	return Math.round((scoreOut - scalingThreshhold) * (scalingFactor * (scalingThreshhold / scoreOut)));	
}
	




// ==UserScript==
// @name           Hide Ratings @Bangumi
// @description    Hide ratings
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==

// Chart
function disableChart()
{
	var chart = document.getElementById("ChartWarpper");
	if (chart){
		chart.style.display = "none";
	}

}

// RatingScore
function disableRatingScore()
{
	var ratingscore = document.getElementsByClassName("global_rating");
	for (i = 0; i < ratingscore.length; i++){
		ratingscore[i].style.display = "none";
	}
}

// Rank
function disableRank()
{
	var rank = document.getElementsByClassName("rank");
	for (i = 0; i < rank.length; i++){
		rank[i].style.display = "none";
	}
}

// rateInfo
function disableRateInfo()
{
	var rateinfo = document.getElementsByClassName("rateInfo");
	for (i = 0; i < rateinfo.length; i++){
		rateinfo[i].style.display = "none";
	}
}

disableChart()
disableRatingScore()
disableRank()
disableRateInfo()
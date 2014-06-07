// ==UserScript==
// @name        RYM Weighted Average of Track Ratings Based on Track Duration
// @version     1
// @description Calculates a weighted average based on previously entered track ratings and track durations for those tracks that have ratings
// @include     http://rateyourmusic.com/release/*
// @grant		none
// @author		http://rateyourmusic.com/~lochness
// @copyright	Public Domain
// ==/UserScript==

var $ = unsafeWindow.jQuery;

//track ratings must exist and track listing must have durations
if(($('span#myreview_review table.trackratings').length > 0) && !($('table#tracklisting tr td:eq(3)').is(':empty')))
{
	var rating_array = [];
	var time_array = [];
	var total_time = 0.0;
	var time_percentage_array = [];
	var weighted_rating_array = [];
	var weighted_rating = 0.0;

	//track ratings
	$('span#myreview_review table.trackratings tr').find('td:nth-child(3)').each(function() {
		if($(this).find('img').length > 0)
		{
		rating_array.push(parseFloat($(this).find('img').attr('title').substring(0, 4)));
		}
		else
		{
		rating_array.push(0.0);
		}
	});

	//track durations
	$('table#tracklisting tr').find('td:nth-child(4)').each(function() {
		if(!$(this).is(':empty'))
		{
		time_array.push(parseFloat($(this).html().split(":")[0]) + ($(this).html().split(":")[1] / 60));
		}
	});

	//total track duration for tracks rated
	for(var i = 0; i < time_array.length; i++)
	{
		if((rating_array[i] != 0.0) && (time_array[i] != 0.0))
		{
		total_time += time_array[i];
		}
	}

	//track duration / album duration
	for(var i = 0; i < time_array.length; i++)
	{
		time_percentage_array.push(time_array[i] / total_time);
	}

	//weighted track ratings
	for(var i = 0; i < rating_array.length; i++)
	{
		weighted_rating_array.push(rating_array[i] * time_percentage_array[i]);
	}

	//weighted track rating
	for(var i = 0; i < weighted_rating_array.length; i++)
	{
		weighted_rating += weighted_rating_array[i];
	}

	//print underneath rym's average
	var weighted_html = '<tr><td style="text-align:right;color:#444;" colspan="3">Weighted Average: <b>'+(Math.round(weighted_rating * 100) / 100).toFixed(2)+'</b></td></tr>';
	$('table.trackratings tbody').append(weighted_html);
}
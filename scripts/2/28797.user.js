// ==UserScript==
// @name           tthfanfic
// @namespace      mdpopescu
// @description    Adds an indication of how long since the last update for a story; also shrinks the story width to half the page; Author: Marcel Popescu mdpopescu@gmail.com
// @include        http://www.tthfanfic.org/*
// ==/UserScript==

// helper functions

Array.prototype.indexOf = function(value, start)
{
	start = start || 0;

	for (var i = start; i < this.length; i++)
		if (this[i] == value)
			return i;

	return -1;
}

function getElementsByClassName(argClassName, argTagName, parent)
{
	var result = new Array();
	
	var reClassMatch = new RegExp("(^| )" + argClassName + "( |$)");
	var tagName = argTagName || "*";
	parent = parent || document;
	
	var elements = parent.getElementsByTagName(tagName);
	for (var i = 0; i < elements.length; i++)
		if (reClassMatch.test(elements[i].className))
			result[result.length] = elements[i];
	
	return result.length == 0 ? null : result;
}

function repeatString(strInput, intCount)
{
	var arrTmp = new Array(intCount+1);
	return arrTmp.join(strInput);
}

// tth-specific functions

function getCompleted(html)
{
	var reCompleted = /Completed&nbsp;\[Yes\]/;
	
	return reCompleted.test(html);
}

function getUpdated(html)
{
	var getMonthFromName = function(monthName)
	{
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return months.indexOf(monthName);
	}

	var reUpdated = /Updated&nbsp;\[(\d+)&nbsp;(\w+)&nbsp;(\d+)\]/;	
	var updated = reUpdated.exec(html);
	
	var lastUpdate = new Date();
	lastUpdate.setYear("20" + updated[3]);
	lastUpdate.setMonth(getMonthFromName(updated[2]));
	lastUpdate.setDate(updated[1]);
	
	return lastUpdate;
}

function getElapsedTimeInMonths(date)
{
	var current = new Date();
	
	return (current.getFullYear() - date.getFullYear()) * 12 + (current.getMonth() - date.getMonth());
}

function getColor(trimesters)
{
	var color = "";
	switch (trimesters)
	{
		case 0:
			color = "9";
			break;
		
		case 1:
			color = "b";
			break;
		
		case 2:
			color = "d";
			break;
		
		default:
			color = "f";
			break;
	}
	
	return "#" + color + "00";
}

function processClass(className)
{
	var stories = getElementsByClassName(className, "div");
	if (stories)
		for (var i = 0; i < stories.length; i++)
		{
			var story = stories[i];
			
			if (getCompleted(story.innerHTML))
				continue;
			
			var updated = getUpdated(story.innerHTML);
			var elapsed = getElapsedTimeInMonths(updated);
			if (elapsed <= 1)
				continue;
			
			var trimesters = Math.floor(elapsed / 3);
			var warning = repeatString("\u2580", trimesters + 1);
			
			var span = document.createElement("span");
			span.appendChild(document.createTextNode(" " + warning + " " + elapsed + " months old"));
			span.style.color = getColor(trimesters);
			span.style.fontSize = "x-small";
			
			var title = getElementsByClassName("storytitle", "div", story)[0];
			title.appendChild(span);
		}
}

// main body

processClass("storylistitem");
processClass("storydetails");

// change the width if inside a story
var storyBody = getElementsByClassName("storybody", "div")[0];
if (storyBody)
{
	storyBody.style.width = "50%";
	storyBody.style.marginLeft = "0";
}

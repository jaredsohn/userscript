// ==UserScript==
// @name           BOR Cleaner
// @namespace      org.bor
// @description    A script to remove junk comments on bash.org.ru wordstream
// @include        http://words.bash.org.ru/topic/*
// ==/UserScript==


function getComments(className)
{
    var divs = document.getElementsByTagName("div");
    var result = new Array();

    for (i = 0; i < divs.length; ++i)
    {
	if (divs[i].className.indexOf("comment ") == 0)
	{
	    result.push(divs[i]);
	}
    }

    return result;
}

function selectBodyText(commentDiv)
{
    return commentDiv.childNodes[5].firstChild.nodeValue;
}

function selectAuthor(commentDiv)
{
    return commentDiv.childNodes[3].childNodes[1].childNodes[1].childNodes[1].firstChild.nodeValue;
}

function selectScore(commentDiv)
{
    return commentDiv.childNodes[3].childNodes[1].childNodes[5].firstChild.nodeValue;
}

function even(i) { return i % 2 == 0; }

function not(f) { return function(i) { return !f(i); } }

function filter(arr, f)
{
    var result = Array();

    for (i in arr)
    {
	if (f(arr[i]))
	    result.push(arr[i]);
    }

    return result;
}

// Filter functions

function oneWord(div)
{
    return selectBodyText(div).split(" ").length == 1;
}

function miscWords(div)
{
    var text = selectBodyText(div);
    var words = ["хуй", "г[ао]вно", "одмин", "шредер"];

    for (word in words)
    {
	if (text.match(new RegExp(words[word])))
	    return true;
    }

    return false;
}

function byAnonymous(div)
{
    return selectAuthor(div) == "anonymous";
}

function negativeScore(div)
{
    return parseInt(selectScore(div)) < 0;
}

// Main
var comments = getComments();
var filterFuncs = [oneWord, miscWords, /* byAnonymous, */negativeScore];

for (func in filterFuncs)
{
    var filtered = filter(comments, filterFuncs[func]);
    for (div in filtered)
    {
	filtered[div].style.display = "none";
    }
}

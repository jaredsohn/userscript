// ==UserScript==
// @name           KoL Mall: get all search results
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/searchmall.php
// @version			1.0
// @author			Charon the Hand
// @description		Allows getting all search results instead of 10 at a time. Use with caution.
// ==/UserScript==

var results = document.querySelector('#searchresults')
if (!results)
{
	var button = document.querySelector('.button')
	var check = document.createElement('input')
	check.type = 'checkbox'
	check.checked = GM_getValue('getAllResults', false)
	check.addEventListener('click', function () {
		GM_setValue('getAllResults', this.checked)
	}, false)
	button.parentNode.insertBefore(document.createTextNode('(Get all results)'), button.nextSibling)
	button.parentNode.insertBefore(check, button.nextSibling)
	return
}
if (GM_getValue('getAllResults', false) && results)
{
	var nextURL = getNextURL(document)
	if (nextURL)
		GM_get(nextURL, append)
}

function getNextURL(scope)
{
	var nextLink = scope.querySelectorAll('center>font>a')
	if (nextLink)
	{
		nextLink = nextLink.length == 4 ? nextLink[1] : nextLink[0]
		if (nextLink.textContent == 'next')
			return nextLink.href
	}
}

function append(text)
{
	var temp = document.createElement('div')
	temp.innerHTML = text
	var tempResults = temp.querySelectorAll('#searchresults>table')
	for (var n = 0, len = tempResults.length; n < len; n++)
	{
		results.appendChild(tempResults[n])
	}
	var nextURL = getNextURL(temp)
	if (nextURL)
		GM_get(nextURL, append)
}

function GM_get(target, callback) {
   //OTT is great!
	if (target.indexOf('http') == -1)
		target = 'http://' + window.location.host + target
	GM_xmlhttpRequest({
		method: 'GET',
		url: target,
		onload: function(details) {
			callback(details.responseText);
		}
   });
}

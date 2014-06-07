// ==UserScript==
// @name           StudiVZ: Gruppen filtern
// @namespace      http://www.nohomepageyet.de
// @description    Gruppen können auf der eigenen Seite und Seiten von anderen Personen gefiltert werden und die gefundenen Suchbegriffe werden gelb markiert (Kleine Filterbox in der Gruppenüberschrift)
// @include        http://www.studivz.net/profile.php?ids=*
// ==/UserScript==


var groupsBox = document.getElementById('profile_groups_list');
var groupsHeadline = null;

if(groupsBox)
{
	var groupsHeader = groupsBox.childNodes[1];
	
	if(groupsHeader)
	{
		groupsHeadline = groupsHeader.getElementsByTagName('h2')[0];
	}
}

if(groupsHeadline)
{
	var filterField = document.createElement('input');
	
	filterField.setAttribute('type', 'text');
	filterField.setAttribute('style', 'padding: 0px; color: lightgrey; width: 68px; float:right; margin: 0 5px;');
	filterField.setAttribute('value', 'Filter');
	
	filterField.addEventListener('focus', focusField, true);
	filterField.addEventListener('blur', blurField, true);
	filterField.addEventListener('keyup', filterList, true);

	groupsHeadline.parentNode.insertBefore(filterField, groupsHeadline);

	var clear = document.createElement('div');
	clear.style.clear = 'both';
	groupsHeadline.parentNode.appendChild(clear);
}

function focusField(e)
{
	if(e.target.value == 'Filter')
	{
		e.target.value = '';
		e.target.style.color = 'black';
	}
}

function blurField(e)
{
	if(e.target.value == '')
	{
		e.target.value = 'Filter';
		e.target.style.color = 'lightgrey';
	}
}

function filterList(e)
{
	var filter = trimAll(e.target.value);
	
	var groupsList = groupsBox.childNodes[3].childNodes[1];

	for(var i=0; i < groupsList.childNodes.length; i++)
	{
		var listItem = groupsList.childNodes[i];
		
		if(listItem.tagName == 'LI')
		{
			var link = listItem.childNodes[0];
			
			if((listItem.textContent.toLowerCase().indexOf(filter.toLowerCase()) > -1) || filter == '')
			{
				listItem.style.display = '';

				link.innerHTML = highlightText(link, filter, 'yellow');
				
				if(listItem.style.length == 0)
				{
					listItem.removeAttribute('style');
				}
			}
			else
			{
				listItem.style.display = 'none';
			}
		}
	}
}

function highlightText(listItem, filter, color)
{
	for(var i=0; i < listItem.textContent.length - filter.length; i++)
	{
		if(listItem.textContent.toLowerCase().substr(i, filter.length) == filter.toLowerCase())
		{
			var newTextContent = 
					listItem.textContent.substr(0, i) + 
					'<span style="background-color: ' + color + '">' + 
					listItem.textContent.substr(i, filter.length) +
					'</span>' +
					listItem.textContent.substr(i + filter.length);
			
			return newTextContent;
		}
	}
}

function resetHighlightedText(listItem)
{
	
}

function trimAll(sString)
{
	while (sString.substring(0,1) == ' ')
	{
		sString = sString.substring(1, sString.length);
	}
	
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
		sString = sString.substring(0,sString.length-1);
	}
	
	return sString;
}


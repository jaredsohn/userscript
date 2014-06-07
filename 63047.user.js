// ==UserScript==
// @name           EasyNews Search - Hide read
// @namespace      http://www.userscripts.org
// @include        *members.easynews.com/global4/search.html?*
// @description    Update Easynews global search results page with a new preview column and ability to remove read posts
// ==/UserScript==

// Configuration

// PREVIEW_COL
// 0 = don't split Preview out to new column
// 1 = create a Preview column
const PREVIEW_COL = 1;

// PREVIEW_TYPES
// Enter the types you want splitting out to a separate column
// e.g. [thumb][sample][parViewer][nzbViewer]
// Note, currently just one can be selected
const PREVIEW_TYPES = '[thumb]';

// OPEN_TYPES
// Enter the types you want to open in a new tab after clicking 'Open Thumbs'
// e.g. [thumb]
const OPEN_TYPES = '[thumb]';

// SUBJECT_WIDTH
// Override the width of the subject column
// Set to '' to leave this unchanged ('40%')
const SUBJECT_WIDTH = '';

// Current assumptions
const ROW_CLASS = 'rRow';			// class of the main post row <tr>
const SUBLECT_CLASS = 'subject';	// class of the subject cell

// Correct parentheses
// URL links including ( or ) don't show as visited due to what appears to be a bug in FireFox
// These links aren't stored in the history with %28 or %29, but instead they are stored as %20
// This flag will update any URLs to use %20 so they will show up visited
const CHANGE_PARENTHESES = 1;


function removeRead()
{
	const COL_SUBJECT = 1; //TODO: Check the column headers for this rather than hard-coding
	const COL_PREVIEW = 2; //TODO: ditto
	
	var numDisplayed = 0;
	var numRemoved = 0;
	
	var oLink = document.getElementById('methoslink');
	var visitedColour = document.defaultView.getComputedStyle(oLink,'').getPropertyValue('color');
	var allRows = document.getElementsByTagName('tr');
	for (var i=0; i < allRows.length; i++)
	{
		oRow = allRows[i];
		strClass = oRow.getAttribute('class');
		if (strClass && strClass.substr(0,4) == ROW_CLASS)
		{
			if (document.defaultView.getComputedStyle(oRow.getElementsByTagName('a')[COL_PREVIEW],'').getPropertyValue('color')==visitedColour)
			{
				oRow.parentNode.removeChild(oRow);
				i--;
				numRemoved++;
				continue;
			}
			if (oRow.getElementsByTagName('a')[COL_PREVIEW].innerHTML == '[view]' && oRow.getElementsByTagName('a').length >= COL_PREVIEW)
			{
				if (document.defaultView.getComputedStyle(oRow.getElementsByTagName('a')[COL_PREVIEW+1],'').getPropertyValue('color')==visitedColour)
				{
					oRow.parentNode.removeChild(oRow);
					i--;
					numRemoved++;
					continue;
				}
			}
			if (document.defaultView.getComputedStyle(oRow.getElementsByTagName('a')[COL_SUBJECT],'').getPropertyValue('color')==visitedColour)
			{
				oRow.parentNode.removeChild(oRow);
				i--;
				numRemoved++;
				continue;
			}
			numDisplayed++;
		}
	}
	
	oTotal = document.getElementById('methos_totalposts');
	if (oTotal)
	{
		iTotal = parseInt(oTotal.getAttribute('total'));
		
		oTotal.innerHTML = numDisplayed + ' of ' + ((iTotal == -1) ? 'All' : iTotal) + ' (removed ' + numRemoved + ')';
	}
}


function openInTabs()
{
	setOpen(true);

	var visitedColour = '';
	var oLink = document.getElementById('methoslink');
	if (oLink) visitedColour = document.defaultView.getComputedStyle(oLink,'').getPropertyValue('color');
	
	var bVisited = false;
	var oVisited = document.getElementById('methos_openvisited');
	if (oVisited) bVisited = oVisited.checked;

	var iTabs = 10;
	var oTab = document.getElementById('methos_opentabs');
	if (oTab) iTabs = oTab.value;

	var nRow = 0;
	
	var allRows = document.getElementsByTagName('tr');
	for (var i=0; i < allRows.length; i++)
	{
		oRow = allRows[i];
		strClass = oRow.getAttribute('class');
		if (strClass && strClass.substr(0,4) == ROW_CLASS)
		{
			aPreview = oRow.getElementsByTagName('a');
			for (href=0; href < aPreview.length; href++)
			{
				if (OPEN_TYPES.indexOf(aPreview[href].innerHTML) >= 0)
				{
					if (!bVisited && document.defaultView.getComputedStyle(aPreview[href],'').getPropertyValue('color') == visitedColour) continue;
					
					if (iTabs-- > 0) window.setTimeout(GM_openInTab, 100 + (200*nRow++), aPreview[href].href);
					break;
				}
			}
		}
		if (iTabs <= 0) break;
	}
	window.setTimeout(setOpen, 100 + 200*nRow, false);
}

function setOpen(state)
{
	btnOpen = document.getElementById('methos_open');
	if (btnOpen) btnOpen.disabled = state;
}

function saveSettings()
{
	// # tabs
	var oTab = document.getElementById('methos_opentabs');
	if (oTab)
	{
		var iTabs = oTab.value;
		if (iTabs > 0) GM_setValue('nTabs', iTabs);
	}
	
	// Open visited
	var oVisited = document.getElementById('methos_openvisited');
	if (oVisited)
	{
		GM_setValue('visited', oVisited.checked);
	}
	
	checkSettings();
}

function checkSettings()
{
	var bSaved = true;
	
	var btnSave = document.getElementById('methos_save');
	if (btnSave)
	{
		// # tabs
		var oTab = document.getElementById('methos_opentabs');
		if (oTab)
		{
			if (oTab.value != GM_getValue('nTabs')) bSaved = false;
		}

		// Open visited
		var oVisited = document.getElementById('methos_openvisited');
		if (oVisited)
		{
			if (oVisited.checked != GM_getValue('visited')) bSaved = false;
		}

		btnSave.disabled = bSaved;
	}
}

var totalRows = 0;

// Preview column

if (PREVIEW_COL == 1)
{
	// Add the column header
	
	var allHeaders = document.getElementsByTagName("th");
	var oTable;

	// Look for a subject header

	for (var i=0; i<allHeaders.length; i++)
	{
		if (allHeaders[i].innerHTML.indexOf('Subject') >= 0)
		{
			// Create a new header
			var oHeader = document.createElement('th');
			oHeader.setAttribute('class', 'header');
			oHeader.setAttribute('nowrap', '');
			oHeader.setAttribute('style', 'color:#000000;text-decoration:none;align:center;');
			oHeader.innerHTML = 'Preview';
			allHeaders[i].parentNode.insertBefore(oHeader, allHeaders[i+1]);

			// Shrink the Subject column
			if (SUBJECT_WIDTH.length > 0)
			{
				allHeaders[i].setAttribute('style', 'width:' + SUBJECT_WIDTH + ';');
			}
			
			// Add the Preview column header
			allHeaders[i+1].setAttribute('style', 'width:1%;color:#000000;text-decoration:none;align:center;');

			oTable = allHeaders[i].parentNode.parentNode;

			break;
		}
	}
	
	// Update the rows

	if (oTable)
	{
		var allRows = oTable.getElementsByTagName('tr');

		for (var i=0; i<allRows.length; i++)
		{
			oRow = allRows[i];
			strClass = oRow.getAttribute('class')
			if (strClass && strClass.substr(0,4) == ROW_CLASS)
			{
				totalRows++;
				allCells = oRow.getElementsByTagName('td');
				for (var j=0; j<allCells.length; j++)
				{
					if (allCells[j].getAttribute('class') == SUBLECT_CLASS)
					{
						var bFound = false;
						var allLinks = allCells[j].getElementsByTagName('a');
						for (var href=0; href < allLinks.length; href++)
						{
							if (PREVIEW_TYPES.indexOf(allLinks[href].innerHTML) >= 0)
							{
								if (CHANGE_PARENTHESES == 1)
								{
									var txtHREF = allLinks[href].getAttribute('href');
									if (txtHREF.indexOf('%28') >= 0 || txtHREF.indexOf('%29') >=0)
									{
										txtHREF = txtHREF.replace('%28', '%20');
										txtHREF = txtHREF.replace('%29', '%20');
										txtHREF = txtHREF.replace('%28', '%20');
										txtHREF = txtHREF.replace('%29', '%20');
										allLinks[href].setAttribute('href', txtHREF);
									}
								}
								var oNew = document.createElement('td');
								oNew.setAttribute('style', 'align:middle;text-align:center');
								oNew.appendChild(allLinks[href]);
								oRow.insertBefore(oNew, allCells[j+1]);
								bFound = true;
								break;
							}
						}
						
						if (!bFound) allCells[j].colSpan = '2';
					}
				}
			}
		}
	}
}

// Get the 'Hide Form' checkbox

var oHF = document.getElementById('hfchx');

if (oHF)
{
	oSpacer = document.createTextNode('\u00a0');

	newSection = document.createElement('div');
	newSection.setAttribute('style', 'border:1px black solid;width:200px;padding:3px;margin:2px;background-color:#cccccc;white-space:nowrap');
	
	// 'Remove Read' button
	oInput = document.createElement('input');
	oInput.type = 'button';
	oInput.value = 'Remove Read';
	oInput.setAttribute('title', 'Remove all downloaded and previewed posts');
	oInput.addEventListener('click', removeRead, false);
	newSection.appendChild(oInput);
	
	// Spacer
	newSection.appendChild(oSpacer.cloneNode(true));
	
	// 'Open Thumbs' button
	oInput = document.createElement('input');
	oInput.type = 'button';
	oInput.value = 'Open Thumbs';
	oInput.setAttribute('id', 'methos_open');
	oInput.setAttribute('title', 'Open <x> thumbs in new tabs');
	oInput.addEventListener('click', openInTabs, false);
	newSection.appendChild(oInput);
	
	// Newline	
	newSection.appendChild(document.createElement('br'));
	
	// Number of thumbs text
	newSection.appendChild(document.createTextNode('# tabs:'));
	
	// Number of thumbs input box
	oInput = document.createElement('input');
	oInput.type = 'text';
	nTabs = GM_getValue('nTabs','10');
	nTabsWidth = (nTabs.length * 6) + 3;
	oInput.value = nTabs;
	oInput.setAttribute('id', 'methos_opentabs');
	oInput.setAttribute('style', 'font-size:10px;width:' + nTabsWidth + 'px;background-color:#e5e5e5;');
	oInput.setAttribute('title', 'Maximum number of tabs opened when <Open Thumbs> clicked');
	oInput.addEventListener('change', checkSettings, false);
	newSection.appendChild(oInput);
	
	// Spacer
	newSection.appendChild(oSpacer.cloneNode(true));
	
	// Open visited label
	oLabel = document.createElement('label');
	oLabel.innerHTML = 'Include visited:';
	oLabel.setAttribute('for', 'methos_openvisited');
	newSection.appendChild(oLabel);

	// Open visited checkbox
	oInput = document.createElement('input');
	oInput.type = 'checkbox';
	oInput.value = 'OpenRead';
	oInput.setAttribute('title', 'Check to include visited previews in new tabs');
	oInput.setAttribute('id', 'methos_openvisited');
	oInput.addEventListener('change', checkSettings, false);
	newSection.appendChild(oInput);
	
	// Spacer
	newSection.appendChild(oSpacer.cloneNode(true));

	// Save button
	oInput = document.createElement('input');
	oInput.type = 'button';
	oInput.value = 'Save';
	oInput.setAttribute('id', 'methos_save');
	oInput.setAttribute('title', 'Save # tabs and Open Visited');
	oInput.addEventListener('click', saveSettings, false);
	newSection.appendChild(oInput);
	
	// Newline	
	newSection.appendChild(document.createElement('br'));
	
	// Summary
	newSection.appendChild(document.createTextNode('Displaying:'));
	
	// Spacer
	newSection.appendChild(oSpacer.cloneNode(true));
	
	oSpan = document.createElement('span');
	if (totalRows > 0)
	{
		oSpan.innerHTML = totalRows;
		oSpan.setAttribute('total', totalRows);
	}
	else
	{
		oSpan.innerHTML = 'All';
		oSpan.setAttribute('total', '-1');
	}
	oSpan.setAttribute('id', 'methos_totalposts');
	newSection.appendChild(oSpan);	
	
	// Spacer
	newSection.appendChild(oSpacer.cloneNode(true));

	// Hidden link to self (to detect visited colour)
	aLink = document.createElement('a');
	aLink.setAttribute('style', 'visibility:hidden');
	aLink.setAttribute('id', 'methoslink');
	aLink.setAttribute('href', location.href);
	newSection.appendChild(aLink);
	
	// Add the new section
	oHF.parentNode.appendChild(newSection);
	
	// Remove the newline before 'Hide Form'
	oHF.parentNode.removeChild(oHF.previousSibling);
	
	checkSettings();
}

// ==UserScript==
// @name           AE Skyfire - UI
// @namespace      ae.daneren.com
// @description    UI enhancements
// @include        http://*.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// @exclude        http://forum.astroempires.com/*
// @exclude        http://wiki.astroempires.com/*
// @exclude        http://support.astroempires.com/*
// @exclude        *.astroempires.com/ranks.aspx*
// @exclude        *.astroempires.com/help.aspx*
// @exclude        *.astroempires.com/news.aspx*
// @exclude        *.astroempires.com/terms.aspx*
// @exclude        *.astroempires.com/tables.aspx*
// @exclude        *.astroempires.com/contact.aspx*
// @exclude        *.astroempires.com/links.aspx*
// @exclude        *.astroempires.com/extras.aspx*
// ==/UserScript==

/////////////////////////////////////////////////////////////
////////////////////// Constants ////////////////////////////
/////////////////////////////////////////////////////////////

var VERSION = "1.4.0";
var SKIN = "Dark Astros";

/////////////////////////////////////////////////////////////
/////////////////////// Functions ///////////////////////////
/////////////////////////////////////////////////////////////

function checkVersion()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ae.daneren.com/skyfire_version',
		onload: function(response)
		{
			if(response.responseText != VERSION)
			{
				body = document.getElementsByTagName('body')[0];

				versionElem = document.createElement('table');
				versionElem.align = 'center';

				row = document.createElement('tr');
				cell = document.createElement('td');
				cell.align = 'center';
				cell.innerHTML = "You don't have the most recent version of Skyfire.  Click <a href='http://ae.daneren.com/ae_skyfire_-_ui.user.js'>here</a> to get the newest version!";
				cell.innerHTML += "<br/>Look at the list of changes in the <a href='http://ae.daneren.com/skyfire'>changelog</a>.";
				row.appendChild(cell);
				versionElem.appendChild(row);

				if(SKIN == "Dark Astros")
				{
					body.insertBefore(document.createElement('p'), body.firstChild);
					body.insertBefore(versionElem, body.firstChild);
				}
				else if(SKIN == "Deep Space")
				{
					versionElem.setAttribute('class', 'box-complex box box-full default');
					destination = body.firstChild.rows[0].cells[0].firstChild;
					destination.insertBefore(document.createElement('p'), destination.firstChild);
					destination.insertBefore(versionElem, destination.firstChild);
				}
			}
		}});
}

function dateToString(time)
{
	month = time.getMonth() + 1;
	day = time.getDate();
	year = time.getFullYear();
	hours = time.getHours();
	min = time.getMinutes();
	sec = time.getSeconds();
	if(month < 10)
		month = '0' + month;
	if(day < 10)
		day = '0' + day;
	if(hours < 10)
		hours = '0' + hours;
	if(min < 10)
		min = '0' + min;
	if(sec < 10)
		sec = '0' + sec;
	return day + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec;
}

function timeToString(time, type)
{
	hours = time / 3600;
	mins = (time / 60) % 60;
	if(mins < 10)
		mins = '0' + parseInt(mins);
	else
		mins = parseInt(mins);
	secs = time % 60;
	if(secs < 10)
		secs = '0' + parseInt(secs);
	else
		secs = parseInt(secs);

	if(type == 'h')
		return parseInt(hours) + 'h ' + mins + 'm ' + secs + 's';
	else if(type == ':')
		return parseInt(hours) + ':' + mins + ':' + secs;
}

function stringToTime(time)
{
	parts = time.split(' ');
	if(time.search('h') != -1)
	{
		hours = parts[0].substr(0, parts[0].length - 1);
		mins = parts[1].substr(0, parts[1].length - 1);
		secs = parts[2].substr(0, parts[2].length - 1);
	}
	else if(time.search('m') != -1)
	{
		hours = 0;
		mins = parts[0].substr(0, parts[0].length - 1);
		secs = parts[1].substr(0, parts[1].length - 1);
	}
	else if(time.search('s') != -1)
	{
		hours = 0;
		mins = 0;
		secs = parts[0].substr(0, parts[0].length - 1);
	}
	else
	{
		parts = time.split(':');
		hours = parts[0];
		mins = parts[1];
		secs = parts[2];
	}

	secs = Number(secs);
	secs += Number(mins) * 60;
	secs += Number(hours) * 3600;

	return secs;
}

function setServerTime()
{
	element = document.getElementById('top-header_server-time');
	now = new Date();
	totalSeconds = Number(element.title);
	serverDate = new Date(totalSeconds * 1000 + now.getTime());
	element.innerHTML = 'Server Time: ' + dateToString(serverDate);
}

function setupServerTime()
{
	// Get the server time element
	elements = document.getElementsByTagName('small');
	element = null;
	for(i = 0; i < elements.length; i++)
	{
		if(elements[i].innerHTML.search('Server time:') != -1)
		{
			element = elements[i];
			element.id = 'top-header_server-time';
			break;
		}
	}

	// Deep Space
	if(element == null)
	{
		element = document.getElementById('top-header_server-time');
		SKIN = "Deep Space";
	}

	fullText = element.innerHTML;
	fullText = fullText.substr(	13);

	// Jan 20 2010,
	if(fullText.search(/[A-Z][A-Z][A-Z]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 20 Jan 2010,
	else if(fullText.search(/[0-9][0-9][ ]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 2010-01-20
	else
	{
		dateText = fullText.split(' ')[0];
		timeText = fullText.split(' ')[1];

		dateParts = dateText.split('-');
		serverDate = new Date(dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timeText);
	}

	totalSeconds = serverDate.getTime() / 1000;
	now = new Date();
	totalSeconds = totalSeconds - (now.getTime() / 1000);

	element.title = '' + totalSeconds;
	setServerTime();
	setInterval(function() {setServerTime()}, 200);
}

function addEmpireMenus()
{
	menu = document.createElement('table');
	menu.id = 'empire_menu';
	menu.class = 'header';
	menu.height = '25';
	menu.align = 'center';

if(SKIN == 'Dark Astros')
{
		menu.innerHTML = '<tbody><tr><th width="10%"><a href="empire.aspx?view=bases_events">Events</a></th><th width="10%"><a href="empire.aspx?view=bases_production">Production</a></th><th width="10%"><a href="empire.aspx?view=economy">Economy</a></th><th width="10%"><a href="empire.aspx?view=trade">Trade</a></th><th width="10%"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></th></tr><tr><th width="10%"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th width="10%"><a href="empire.aspx?view=structures">Structures</a></th><th width="10%"><a href="empire.aspx?view=fleets">Fleets</a></th><th width="10%"><a href="empire.aspx?view=units">Units</a></th><th width="*"><a href="empire.aspx?view=technologies">Technologies</a></th></tr></tbody>';

		tables = document.getElementsByTagName('table');
		firstTable = tables[0];

		menu.width = firstTable.width;
	}
	else if(SKIN == 'Deep Space')
	{
		menu.innerHTML = '<tbody><tr><td><table class="default_box-header box-header"><tbody><tr><td class="default_box-header-left box-header-left">&nbsp;</td><td class="default_box-header-center box-header-center">&nbsp;</td><td class="default_box-header-right box-header-right">&nbsp;</td></tr></tbody></table></td></tr><tr><td><table class="default_box-content box-content"><tbody><tr><td class="default_box-content-left box-content-left">&nbsp;</td><td class="default_box-content-center box-content-center"><div class="default_content"><table id="empire_menu" class="menu"><tbody><tr class="row1"><td class="menu-item" style="width: 20%;"><table id="bases_events" class="button button-normal-active"><tbody><tr><td class="button-left"><a href="empire.aspx?view=bases_events">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=bases_events">Events</a></td><td class="button-right"><a href="empire.aspx?view=bases_events">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="bases_production" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=bases_production">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=bases_production">Production</a></td><td class="button-right"><a href="empire.aspx?view=bases_production">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="economy" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=economy">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=economy">Economy</a></td><td class="button-right"><a href="empire.aspx?view=economy">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="trade" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=trade">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=trade">Trade</a></td><td class="button-right"><a href="empire.aspx?view=trade">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item"><table id="scanners" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?ch=1&amp;view=scanners">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></td><td class="button-right"><a href="empire.aspx?ch=1&amp;view=scanners">&nbsp;</a></td></tr></tbody></table></td></tr><tr class="row2"><td class="menu-item" style="width: 20%;"><table id="bases_capacities" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=bases_capacities">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=bases_capacities">Capacities</a></td><td class="button-right"><a href="empire.aspx?view=bases_capacities">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="structures" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=structures">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=structures">Structures</a></td><td class="button-right"><a href="empire.aspx?view=structures">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="fleets" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=fleets">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=fleets">Fleets</a></td><td class="button-right"><a href="empire.aspx?view=fleets">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="units" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=units">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=units">Units</a></td><td class="button-right"><a href="empire.aspx?view=units">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item"><table id="technologies" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=technologies">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=technologies">Technologies</a></td><td class="button-right"><a href="empire.aspx?view=technologies">&nbsp;</a></td></tr></tbody></table></td></tr></tbody></table></div></td><td class="default_box-content-right box-content-right">&nbsp;</td></tr></tbody></table></td></tr><tr><td><table class="default_box-footer box-footer"><tbody><tr><td class="default_box-footer-left box-footer-left">&nbsp;</td><td class="default_box-footer-center box-footer-center">&nbsp;</td><td class="default_box-footer-right box-footer-right">&nbsp;</td></tr></tbody></table></td></tr></tbody>';
		menu.id = 'empire_menu';
		menu.className = 'box-complex box box-full default';

		firstTable = document.getElementById('main-header');
	}

	firstTable.parentNode.insertBefore(menu, firstTable.nextSibling);
	lineBreak = document.createElement('br');
	firstTable.parentNode.insertBefore(lineBreak, menu);
}

function moveFleetSummary()
{
	sumElem = document.getElementById('fleets_summary');
	if(!sumElem)
		return;

	sumElem.style.display = 'block';

	if(window.location.href.search('map.aspx') != -1)
		fleetsTable = document.getElementById('map_fleets');
	else
		fleetsTable = document.getElementById('base_fleets');

	sumElem.parentNode.removeChild(sumElem);
	fleetsTable.parentNode.insertBefore(sumElem, fleetsTable);

	rowHTML = fleetsTable.rows[2].innerHTML
	fleetsTable.deleteRow(2);
	fleetsTable.insertRow(0);
	fleetsTable.rows[0].innerHTML = rowHTML;

	document.getElementById('link_hide_fleets_summary').style.display = 'inline';
	document.getElementById('link_show_fleets_summary').style.display = 'none';
}

function enhanceCapacities()
{
	mainTable = document.getElementById('empire_capacities');
	mainRow = mainTable.rows[1];
	mainCell = mainRow.cells[0];
	if(SKIN == 'Dark Astros')
	{
		realTable = mainCell.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = mainCell.firstChild;
		realTable = fakeTable.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	addConstr = 0;
	addProd = 0;
	for(i = 1; i < realTable.rows.length - 1; i++)
	{
		commanderCell = realTable.rows[i].cells[7];
		commanderText = commanderCell.firstChild.innerHTML;
		commanderParts = commanderText.split(' ');
		effect = (100 - Number(commanderParts[1])) / 100;

		var bonusCell = null;
		if(commanderCell.innerHTML.search('Construction') != -1)
		{
			bonusCell = realTable.rows[i].cells[4];
			baseText = bonusCell.innerHTML.replace(/[,]/g, '').replace(/[.]/g, '');
			oldValue = Number(baseText);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="green">{' + newValue + '}</font>';
			addConstr += newValue - oldValue;
		}
		else if(commanderCell.innerHTML.search('Production') != -1)
		{
			bonusCell = realTable.rows[i].cells[5];
			baseText = bonusCell.innerHTML.replace(',', '').replace('.', '');
			parts = baseText.split(' ');
			oldValue = Number(parts[0]);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="green">{' + newValue + '}</font>';
			addProd += newValue - oldValue;
		}
	}

	// for last row add the new totals
	lastRow = realTable.rows[realTable.rows.length - 1];
	constrCell = lastRow.cells[4];
	prodCell = lastRow.cells[5];

	constrElem = constrCell.firstChild;
	oldConstr = Number(constrElem.innerHTML.replace(',', '').replace('.', ''));
	newConstr = oldConstr + addConstr;
	constrElem.innerHTML += ' <font color="green">{' + newConstr + '}</font>';

	prodElem = prodCell.firstChild;
	oldProd = Number(prodElem.innerHTML.replace(',', '').replace('.', ''));
	newProd = oldProd + addProd;
	prodElem.innerHTML += ' <font color="green">{' + newProd + '}</font>';
}

function enhanceBaseCapacities()
{
	tds = document.getElementsByTagName('td');
	i = 0;
	for(i = 0; i < tds.length; i++)
	{
		if(tds[i].innerHTML.search('Base Commander') != -1)
		{
			j = i;
		}
	}

	elem = tds[j].lastChild;
	commanderText = elem.innerHTML;
	commanderText = commanderText.substr(1, commanderText.length - 2);
	parts = commanderText.split(' ');
	type = parts[0];
	level = Number(parts[1]);
	effect = (100 - level) / 100;

	if(type == 'Construction' || type == 'Production' || type == 'Research')
	{
		mainTable = document.getElementById('base_processing-capacities');
		fakeTable = mainTable.rows[1].cells[0].firstChild;
		if(SKIN == 'Dark Astros')
		{
			realTable = fakeTable;
		}
		else if(SKIN == 'Deep Space')
		{
			realTable = fakeTable.rows[0].cells[1].firstChild.lastChild;
		}

		var row;
		if(type == 'Construction')
			row = realTable.rows[0];
		else if(type == 'Production')
			row = realTable.rows[1];
		else
			row = realTable.rows[2];

		cell = row.cells[1];
		oldValue = Number(cell.innerHTML.replace(/[,]/g, '').replace(/[.]/g, ''));
		newValue = Math.ceil(oldValue / effect);
		cell.innerHTML += ' <font color="green">{' + newValue + '}</font>';
	}
	else if(type == 'Logistics' || type == 'Tactical')
	{
		mainTable = document.getElementById('base_resume-structures');
		if(SKIN == 'Dark Astros')
		{
			realTable = mainTable.rows[0].cells[0].firstChild;
		}
		else if(SKIN == 'Deep Space')
		{
			fakeTable = mainTable.rows[1].cells[0].firstChild;
			realTable = fakeTable.rows[0].cells[1].firstChild.lastChild;
		}
		row = realTable.rows[1];

		// Get the index of value to change
		checkCol = row.cells[2];
		checkParts = checkCol.innerHTML.split('<br>');
		i = 0;
		for(i = 0; i < checkParts.length - 1; i++)
		{
			if((type == 'Logistics' && checkParts[i] == 'Jump Gate') || (type == 'Tactical' && checkParts[i] == 'Command Centers'))
			{
				break;
			}
		}

		// Change value of it
		changeCol = row.cells[3];
		changeParts = changeCol.innerHTML.split('<br>');
		changeValue = Number(changeParts[i]);

		if(type == 'Logistics')
		{
			newValue = 1 / (changeValue + 1) * effect;
			newValue = (1 / newValue) - 1;
			newValue = newValue.toFixed(2);
		}
		else
		{
			newValue = changeValue + (level / 5);
			newValue = newValue.toFixed(1);
		}


		changeParts[i] += ' <font color="green">{' + newValue + '}</font>';

		// Rewrite back in
		newText = '';
		for(i = 0; i < changeParts.length - 1; i++)
		{
			newText += changeParts[i] + '<br>';
		}
		changeCol.innerHTML = newText;
	}
}

function queueItem(elem)
{
	listElem = document.getElementsByName('add_stack')[0];
	listElem.selectedIndex = elem.title;

	listElem.parentNode.parentNode.cells[1].firstChild.click();
}

function enhanceBaseConstruction()
{
	// Get already queued up items
	queueList = new Array();
	table = document.getElementById('base_queue');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Get list of items queued up
	for(i = 0; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[1].innerHTML.search('Add to Queue') != -1)
		{
			break;
		}

		item = table.rows[i].cells[0].innerHTML;
		if(queueList[item] == null)
		{
			queueList[item] = 1;
		}
		else
		{
			queueList[item] = queueList[item] + 1;
		}
	}

	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Get rid of dumb text
	/*for(i = 2; i < table.rows.length; i += 2)
	{
		if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
		{
			break;
		}

		table.rows[i].cells[deleteCell].innerHTML = '';
	}*/

	// Get list of what can be done
	listElem = document.getElementsByName('add_stack')[0];
	if(listElem)
	{
		opt = new Array(listElem.options.length);
		for(i = 0; i < listElem.options.length; i++)
		{
			opt[i] = listElem.options[i].value;
		}
	}
	else
	{
		opt = new Array();
	}

	// Add queue option
	for(i = 1; i < table.rows.length; i += 2)
	{
		if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
		{
			break;
		}

		row = table.rows[i];
		name = row.cells[1].firstChild.firstChild.innerHTML;

		// If nothing to queue, menu already setup for it
		if(row.cells[endCell].innerHTML.search('Build') != -1 || row.cells[endCell].innerHTML.search('Research') != -1)
		{
			return;
		}

		// Check if this is whats building to add it to queueList
		if(row.cells[endCell].id == 'time1')
		{
			if(queueList[name] == null)
			{
				queueList[name] = 1;
			}
			else
			{
				queueList[name] = queueList[name] + 1;
			}
		}

		// Search for if their is a option to queue this building
		for(j = 0; j < opt.length; j++)
		{
			if(opt[j] == name)
			{
				input = document.createElement('input');
				input.type = 'button';
				input.value = 'Queue';
				input.title = j;
				input.addEventListener('click', function ()
					{
						queueItem(this);
						return false;
					}
					, true);

				// If this is what is building
				if(row.cells[endCell].id == 'time1')
				{
					span = document.createElement('span');
					span.id = 'time1';
					span.class = 'active';
					span.title = row.cells[endCell].title;

					blank = document.createElement('span');
					blank.innerHTML = '<br/>';

					row.cells[endCell].innerHTML = '';
					row.cells[endCell].id = '';
					row.cells[endCell].class = '';
					row.cells[endCell].title = '';

					row.cells[endCell].appendChild(input);
					row.cells[endCell].appendChild(blank);
					row.cells[endCell].appendChild(span);
				}
				else
				{
					row.cells[endCell].innerHTML = "";
					row.cells[endCell].appendChild(input);
				}

				break;
			}

		}

		// Search for if there is a item of this type queued
		if(queueList[name] != null)
		{
			currentCost = row.cells[2].innerHTML;
			currentCost = currentCost.replace(/[,]/g, '').replace(/[.]/g, '');

			currentTime = row.cells[timeCell].innerHTML;
			currentTime = stringToTime(currentTime);

			currentLv = row.cells[1].innerHTML;
			currentLv = currentLv.split('(')[1].split(')')[0];
			currentLv = Number(currentLv.substr(6));

			queued = Number(queueList[name]);
			for(j = 0; j < queued; j++)
			{
				currentCost *= 1.5;
				currentTime *= 1.5;
				currentLv++;
			}

			row.cells[2].innerHTML += '<br/><font color="green">{' + currentCost.toFixed(0) + '}</font>';
			row.cells[timeCell].innerHTML += '<br/><font color="green">{' + timeToString(currentTime, 'h') + '}</font>';
			row.cells[1].innerHTML += ' <font color="green">{' + currentLv + '}</font>';
		}

		// row.cells[endCell].align = 'right';
	}
}

function addQuote(link)
{
	table = document.getElementById('board_main');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[0].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = table.rows[1].cells[0].firstChild;
		table = fakeTable.rows[0].cells[1].firstChild.firstChild.firstChild;
	}

	player = table.rows[Number(link.id) - 1].cells[1].firstChild;
	player = "[url='" + player.href + "']" + player.innerHTML + "[/url]";

	message = table.rows[link.id].cells[0].innerHTML;

	message = message.replace(/\n/gim, "")
	message = message.replace(/<img src="http:\/\/graphics2.astroempires.com\/skins\/darkAstros\/images\/stars\/Red%20Giant.jpg" height="10px" width="10px">/gim, "");
	message = message.replace(/<i>(.*?)<\/i>/gim, "[i]$1[/i]")
	message = message.replace(/<b>(.*?)<\/b>/gim, "[b]$1[/b]")
	message = message.replace(/<u>(.*?)<\/u>/gim, "[u]$1[/u]")
	message = message.replace(/<font color="(.*?)">(.*?)<\/font>/gim, "[color='$1']$2[/color]")
	message = message.replace(/<font size="(.*?)">(.*?)<\/font>/gim, "[size='$1']$2[/size]")
	message = message.replace(/<code>(.*?)<\/code>/gim, "[code]$1[/code]")
	message = message.replace(/<ul>(.*?)<\/ul>/gim, "[list]$1[/list]")
	message = message.replace(/<li>(.*?)<\/li>/gim, "[*]$1")
	message = message.replace(/<a target="_blank" href="redirect.aspx\?(.*?)">(.*?)<\/a>/gim, "[url='$1']$2[/url]")
	message = message.replace(/<a href="mailto:(.*?)">(.*?)<\/a>/gim, "[mail='$1']$2[/mail]")
	message = message.replace(/<img src="(.*?)"(.*?)>/gim, "[img]$1[/img]")
	message = message.replace(/<div align="(.*?)">(.*?)<\/div>/gim, "[$1]$2[/$1]")
	message = message.replace(/<br(.*?)>/gim, "\n")

	message = message.replace(/<cite>/gi, '[quote]');
	message = message.replace(/<\/cite>/gi, '[/quote]');
	message = message.replace(/\[list\]/g, '[quote]');
	message = message.replace(/\[\/list\]/g, '[/quote]');

	message = message.replace(/<(.*?)>/gim, "")
	message = message.replace(/&lt;/gim, "<")
	message = message.replace(/&gt;/gim, ">")
	message = message.replace(/&amp;/gim, "&")

	message = '[quote]' + player + ':\n\n' + message + '[/quote]\n';

	board = document.getElementById('body');
	if(board.value)
	{
		board.value += '\n\n' + message;
	}
	else
	{
		board.value += message;
	}
	board.focus();
	board.scrollTop = board.scrollHeight;
}

function addBoardQuotes()
{
	table = document.getElementById('board_main');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[0].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = table.rows[1].cells[0].firstChild;
		table = fakeTable.rows[0].cells[1].firstChild.firstChild.firstChild;
	}

	table.rows[0].cells[1].colSpan = '3';
	if(table.rows[1].innerHTML.search('Jump first unread') != -1)
	{
		table.rows[1].cells[0].colSpan = '5';
		i = 2;
		length = table.rows.length - 6;
	}
	else
	{
		i = 1;
		length = table.rows.length - 4;
	}

	// change header
	row = table.rows[i];
	row.cells[2].width = '20%';
	row.cells[3].width = '20%';
	newCell = document.createElement('td');
	newCell.width = '10%';
	row.appendChild(newCell);
	i++;

	for(i = i; i < length; i += 2)
	{
		row = table.rows[i];
		newCell = document.createElement('td');
		link = document.createElement('a');
		link.href = "javascript:void(0);";
		link.id = i + 1;
		link.innerHTML = 'Quote';
		link.addEventListener('click',
		 	function()
			{
				addQuote(this);
			},
			false);
		newCell.appendChild(link);
		row.appendChild(newCell);
	}

	table.rows[i + 1].cells[0].colSpan = '5';
	table.rows[i + 2].cells[1].colSpan = '3';
	table.rows[i + 3].cells[1].colSpan = '3';
	if(table.rows[1].innerHTML.search('Jump first unread') != -1)
	{
		table.rows[i + 4].cells[0].colSpan = '5';
	}
}

function setMasterProduction()
{
	typeElem = document.getElementById('mast_type');
	type = typeElem.value;
	quantElem = document.getElementById('mast_quant');
	quant = quantElem.value;

	for(i = 1; i > 0; i++)
	{
		selectElem = document.getElementById('select_' + i);
		quantElem = document.getElementById('quant_' + i);

		if(!selectElem)
		{
			break;
		}

		selectElem.value = type;
		if(selectElem.value == type)
		{
			quantElem.value = quant;
			unsafeWindow.update_row("" + i);
		}
	}
}

function addMasterProduction()
{
	table = document.getElementById('empire_ production');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.firstChild;
	}

	newRow = table.insertRow(1);
	newRow.align = 'center';

	cell0 = document.createElement('td');
	cell0.innerHTML = 'Master Set';
	newRow.appendChild(cell0);

	cell1 = document.createElement('td');
	cell1.colSpan = '2';
	newRow.appendChild(cell1);

	cell2 = document.createElement('td');
	cell2.innerHTML = '<select id="mast_type"><option value="Fighters">Fighters</option><option value="Bombers">Bombers</option><option value="Heavy Bombers">Heavy Bombers</option><option value="Ion Bombers">Ion Bombers</option><option value="Corvette">Corvette</option><option value="Recycler">Recycler</option><option value="Destroyer">Destroyer</option><option value="Frigate">Frigate</option><option value="Ion Frigate">Ion Frigate</option><option value="Scout Ship">Scout Ship</option><option value="Outpost Ship">Outpost Ship</option><option value="Cruiser">Cruiser</option><option value="Carrier">Carrier</option><option value="Heavy Cruiser">Heavy Cruiser</option><option value="Battleship">Battleship</option><option value="Fleet Carrier">Fleet Carrier</option><option value="Dreadnought">Dreadnought</option><option value="Titan">Titan</option><option value="Leviathan">Leviathan</option><option value="Death Star">Death Star</option><option value="Goods">Goods</option></select>';
	cell2.align = 'right';
	newRow.appendChild(cell2);

	cell3 = document.createElement('td');
	cell3.innerHTML = "<input type='text' size='5' id='mast_quant' class='input-numeric quant' maxlength='5'>";
	newRow.appendChild(cell3);

	cell4 = document.createElement('td');
	cell4.colSpan = '3';
	newRow.appendChild(cell4);

	newRow = table.insertRow(2);
	newRow.align = 'center';

	cell1 = document.createElement('td');
	cell1.colSpan = '4';
	newRow.appendChild(cell1);

	cell2 = document.createElement('td');
	input = document.createElement('input');
	input.type = 'button';
	input.value = 'Set';
	input.addEventListener('click', function ()
		{
			setMasterProduction();
		}
		, true);
	cell2.appendChild(input);
	newRow.appendChild(cell2);

	cell3 = document.createElement('td');
	cell3.colSpan = '3';
	newRow.appendChild(cell3);
}

function resetRecallTime()
{
	elem = document.getElementById('recall_duration');
	recallTime = Number(elem.title);
	elem.title = recallTime + 1;

	recallTimeString = timeToString(recallTime, 'h');

	elem.value = 'Recall Fleet (' + recallTimeString + ')';
}

function addRecallTime()
{
	arrivalElem = document.getElementById('time1');
	arrivalTime = arrivalElem.title;

	centerElems = document.getElementsByTagName('center');
	for(i = 0; i < centerElems.length; i++)
	{
		if(centerElems[i].innerHTML.search('Travel Duration:') != -1)
		{
			durationElem = centerElems[i];
			break;
		}
	}

	parts = durationElem.firstChild.innerHTML.split(": ");
	duration = parts[1];

	secs = stringToTime(duration);

	recallTime = secs - arrivalTime;

	elems = document.getElementsByTagName('input');
	for(i = 0; i < elems.length; i++)
	{
		if(elems[i].value == 'Recall Fleet')
		{
			elems[i].id = 'recall_duration';
			elems[i].title = recallTime;
			break;
		}
	}

	resetRecallTime();
	setInterval(function() {resetRecallTime()}, 1000);
}

function removeNonAttackable()
{
	table = document.getElementById('fleets_attack-list');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling
	}

	for(i = 1; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[3].innerHTML == '')
		{
			table.deleteRow(i);
			i--;
		}
	}
}

function enhanceTradePage()
{
	table = document.getElementById('empire_trade_trade-routes');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Get list of players
	players = new Array();
	for(i = 1; i < table.rows.length; i++)
	{
		row = table.rows[i];

		// Check for duplicates
		nameElem = row.cells[1].firstChild.nextSibling.nextSibling;
		name = nameElem.innerHTML;

		// Check if player already found
		if(players[name] == null)
		{
			players[name] = i;
		}
		else
		{
			nameElem.innerHTML += ' <font color="red">(duplicate)</font>';

			// Havent changed first occurance yet
			if(players[name] != 0)
			{
				nameElem = table.rows[players[name]].cells[1].firstChild.nextSibling.nextSibling;
				nameElem.innerHTML += ' <font color="red">(duplicate)</font>';
			}
		}

		// Put difference between bases
		base1 = Number(row.cells[2].firstChild.wholeText);
		base2 = Number(row.cells[3].firstChild.wholeText);
		diff = base2 - base1;
		if(diff < 0)
		{
			diff = ' <font color="red">(' + diff + ')</font>';
		}
		else
		{
			diff = ' <font color="green">(+' + diff + ')</font>';
		}

		row.cells[3].innerHTML += diff;
	}
}

function pasteReport(link)
{
	report = link.parentNode.parentNode.nextSibling.cells[0].firstChild.innerHTML;
	report = report.replace(/<\/tr>/g, '\\n');
	report = report.replace(/<tr>/g, '');
	report = report.replace(/<\/th>/g, '\\t');
	report = report.replace(/<th>/g, '');
	report = report.replace(/<\/td>/g, '\\t');
	report = report.replace(/<td>/g, '');
	report = report.replace(/<\/center>/g, '\\n');
	report = report.replace(/<br>/g, '\\n');
	report = report.replace(/<(.*?)>/gim, "");
	report = report.replace(/&nbsp;/g, ' ');
	report = report.substr(0, report.length - 2);
	// alert(report);
	window.open('http://ae.daneren.com/paste_report?report=' + report, 'Battle Report', '');
}

function addReportLink()
{
	table = document.getElementById('messages_inbox');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{

	}

	for(i = 2; i < table.rows.length - 4; i += 2)
	{
		row = table.rows[i];
		if(row.cells[1].innerHTML.search('Battle Report') != -1)
		{
			link = document.createElement('a');
			link.href = 'javascript:void(0);';
			link.innerHTML = 'Battle Paste';
			link.addEventListener('click',
				function()
				{
					pasteReport(this);
				},
				false
			);
			row.cells[2].innerHTML += ' - ';
			row.cells[2].appendChild(link);
		}
	}
}

/////////////////////////////////////////////////////////////
/////////////////////// Main ////////////////////////////////
/////////////////////////////////////////////////////////////

//// Do for all AE pages
// Check if correct version
checkVersion();

// Set up the server time
setupServerTime();

// Add Empire Menus below main menu bar if not on empire page
if(window.location.href.search('empire.aspx') == -1)
{
	// TODO: remove <br> on Deep Space
	addEmpireMenus();
}

//// Specific page enchancements
// If base or astro page, move fleet summary up to top default on
if((window.location.href.search('map.aspx') != -1 && window.location.href.search(/[A-Z][0-9][0-9][:][0-9][0-9][:][0-9][0-9][:][0-9][0-9]/i) != -1) || window.location.href.search('base.aspx') != -1)
{
	moveFleetSummary();
}

// Add commander effects on capacity page
if(window.location.href.search('bases_capacities') != -1)
{
	enhanceCapacities();
}
// Add commander effects on base page
if(window.location.href.search('base.aspx') != -1)
{
	if(window.location.href.search('view=') == -1)
	{
		enhanceBaseCapacities();
	}
	else if(window.location.href.search('structures') != -1 || window.location.href.search('defenses') != -1 || window.location.href.search('research') != -1)
	{
		enhanceBaseConstruction();
	}
}

// Add quotes option to public boards
if(window.location.href.search('board.aspx') != -1)
{
	addBoardQuotes();
}

// Add master set production
if(window.location.href.search('bases_production') != -1)
{
	addMasterProduction();
}

// Add recall time for in transit fleets
if(window.location.href.search('fleet.aspx?') != -1)
{
	if(document.getElementById('time1') && window.location.href.search('recall') == -1)
	{
		addRecallTime();
	}
	else if(window.location.href.search('view=attack') != -1)
	{
		removeNonAttackable();
	}
}

// Duplicates/difference in econ on trade page
if(window.location.href.search('view=trade') != -1)
{
	enhanceTradePage();
}

// Add report link to messages page
if(window.location.href.search('messages.aspx') != -1)
{
	addReportLink();
}

// alert('test');
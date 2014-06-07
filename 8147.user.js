// ==UserScript==
// @name           Hotmail Actions Bar Relocator
// @namespace      http://*.hotmail.msn.com/*
// @description    Keeps the Actions bar (new, delete, junk, etc.) in view at all times
// @include        http://*.hotmail.msn.com/*
// ==/UserScript==

//get a collection of all the tables on the page
var AllTables = document.getElementsByTagName('table');

var Actions

//loop throught the tables to find what is probably the Actions table
for (var i = 0; i < AllTables.length; i++)
	{
		if (AllTables[i].innerHTML.indexOf('Junk Mail') > -1)
			{
				//get the Actions table
				Actions = AllTables[i];
				break;
			}
	}

//set Actions table defaults
Actions.style.position = 'relative';
Actions.style.top = 0;
Actions.style.MozOpacity = 1;

//set up an interval to monitor the position of the Actions table
ActionsInterval = setInterval(MoveActionsBar, 1);


function MoveActionsBar()
	{
		if (Actions.style.position == 'absolute' && parseInt(Actions.style.top) != window.pageYOffset)
			{
				//make the Actions table invisible
				Actions.style.MozOpacity = 0;
			}
		else
			{
				if (parseFloat(Actions.style.MozOpacity) <= .97)
					{
						//graduallly make the Actions table more visible
						Actions.style.MozOpacity = parseFloat(Actions.style.MozOpacity) + .02;
					}
			}

		if (window.pageYOffset > 92)
			{
				//make the Actions table absolutely positioned
				Actions.style.position = 'absolute';
				
				Actions.style.top = window.pageYOffset;
			}
		else
			{
				//make the Actions table relatively positioned
				Actions.style.position = 'relative';

				Actions.style.top = 0;
			}
	}
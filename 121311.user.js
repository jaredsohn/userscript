// ==UserScript==
// @name			ogame galaxy star
// @namespace		marshen
// @description		Adds back the activity star which shows the latest activity of planet and moon.
// @include			http://*.ogame.gameforge.com/game/index.php?page=galaxy*
// @downloadURL		http://userscripts.org/scripts/source/121311.user.js
// @updateURL		https://userscripts.org/scripts/source/121311.meta.js
// @version			1.0.2
// ==/UserScript==

(function(){
	/* INIT */
	
	var version = document.getElementsByName('ogame-version');
	if (version.length != 1 || 30100 > getVersion(version[0].getAttribute('content')) || !document.getElementsByClassName)
		return;

	document.body.addEventListener('DOMNodeInserted', nodeInserted, false);
	
	/* UTILS */
	
	/**
	 * Parses a given version to an integer.
	 * @param	pVersion	The version string to parse.
	 * @return	The parsed version.
	 */
	function getVersion(pVersion)
	{
		var version = pVersion.toString().split('.');
		if (version.length >= 3)
		{
			// This is why I would like to see the version as a number because otherwise you can't compare it!
			var intversion = parseInt(version[0]) * 10000 + parseInt(version[1]) * 100 + parseInt(version[2]);
			return intversion;
		}
		return parseInt(pVersion);
	}
	
	function nodeInserted(evt)
	{
		if(!evt || !evt.target || !evt.target.id || evt.target.id != "mobileDiv" /*"galaxytable"*/ ) return;
		var table = evt.target.firstChild.nextSibling;
		var classNames = ['microplanet', 'moon'];
		var voidTime = 100;
		
		for (var i = 0; i < table.rows.length; i++)
		{
			var row = table.rows[i];
			if (row.getAttribute('class') == 'row')
			{
				var time = [voidTime, voidTime];
				for (var j = 0; j < classNames.length; j++)
				{
					var td = row.getElementsByClassName(classNames[j]);
					if (td.length > 0)
					{
						var activity = td[0].getElementsByClassName('activity');
						if (activity.length > 0)
						{
							if (activity[0].getAttribute('class').indexOf('minute15') > -1)
							{
								time[j] = 0;
							}
							else
							{
								var ul = td[0].getElementsByClassName('ListLinks');
								if (ul.length > 0)
								{
									li = ul[0].getElementsByTagName('li');
									if (li.length > 0)
									{
										var nodeValue = li[0].firstChild.nodeValue;
										var index = nodeValue.lastIndexOf(' ');
										if (index == -1 || index >= nodeValue.length - 1)
											continue;
										
										var parsedTime = parseInt(nodeValue.substring(index), 10);
										if (!isNaN(parsedTime))
										{
											time[j] = parsedTime;
										}
									}
								}
							}
						}
					}
				}
				
				if (time[0] < voidTime || time[1] < voidTime)
				{
					var td = row.getElementsByClassName('planetname');
					if (td.length > 0)
					{
						var timeText = Math.min(time[0], time[1]);
						if (timeText == 0)
							timeText = '*'
					
						var span = document.createElement('span');
						
						span.setAttribute('class', 'tooltipRight');
						span.setAttribute('title', 'Planet: ' + (time[0] != voidTime ? (time[0] != 0 ? time[0] + 'm' : '*') : '-') + '<br />Moon: ' + (time[1] != voidTime ? (time[1] != 0 ? time[1] + 'm' : '*') : '-'));
						
						var innerSpan = document.createElement('span');
						innerSpan.setAttribute('class', 'undermark');
						innerSpan.appendChild(document.createTextNode(timeText));
						
						span.appendChild(document.createTextNode('('));
						span.appendChild(innerSpan);
						span.appendChild(document.createTextNode(')'));
						
						td[0].appendChild(span);
					}
				}
			}
		}
	}
})();
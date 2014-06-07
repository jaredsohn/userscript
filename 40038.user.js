const GM_HEADER = <>
// ==UserScript==
// @name           Userscripts : Backup scripts
// @namespace      http://gm.wesley.eti.br/userscripts
// @description    Imports/Exports GM scripts
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// @version        1.0.1.2
// @include        http://userscripts.org/*
// @require        http://userscripts.org/scripts/source/38788.user.js
// @require        http://userscripts.org/scripts/source/40050.user.js
// @cfu:meta       http://userscripts.org/scripts/source/@cfu:id.meta.js
// @cfu:url        http://userscripts.org/scripts/source/@cfu:id.user.js
// @cfu:id         uso:script
// @cfu:timestamp  uso:timestamp
// @cfu:version    version
// @uso:script     40038
// @uso:timestamp  20:22 01/08/2009
// ==/UserScript==
</>;
typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(GM_HEADER);

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

(function()
{	// script scope

	var installs = document
	.evaluate("//a[contains(@href,'.user.js') and not(substring-after(@href,'.user.js'))]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	// contains(@href,'.user.js') and not(substring-after(@href,'.user.js')) simulates ends-with(@href,'.user.js')

	// This will be called everytime you click to install an script (Not necessarily the Install button)
	function onInstall(e)
	{
		var scripts = eval(GM_getValue('scripts', '[]'));
		var script = parseInt((e.target.href || e.target.parentNode.href).match(/(\d+)\.user\.js/)[1]);

		// Checks if the current script was added already
		for ( var i = scripts.length ; ~--i && scripts[i] != script ; );

		if (!~i)
		{
			scripts.push(script);

			GM_setValue('scripts', uneval(scripts));
		}
	}

	// Adds an EventListener to all links that end with ".user.js"
	for ( var install, i = installs.snapshotLength ; install = installs.snapshotItem(--i) ; )
		install.addEventListener('click', onInstall, false);

	var name = '[' + GM_HEADER.match(/^\/\/\s+@name\s+(.+)/m)[1] + '] ';

	function installScripts(scripts)
	{
		var i = scripts[2].length;
		if (i)
		{
			if (confirm(i + ' new script(s) was found. Continue?'))
			{
				while ( ~--i )
				{
					GM_openInTab('http://userscripts.org/scripts/source/' + scripts[2][i] + '.user.js');
					scripts[0].push(scripts[2][i]);
				}

				GM_setValue('scripts', uneval(scripts[0]));
			}
		}
		else
			alert('No new script was found.');
	}

	GM_registerMenuCommand(name + 'Import from list...', function()
	{
		var code = prompt('Enter the url of the list:');
		if (code)
		{
			Persist.get(code, function(e)
			{
				var scripts = [eval(GM_getValue('scripts', '[]')), [], []];

				for ( var script ; script = /\/scripts\/source\/(\d+)\.user\.js["'\r\n]/gi.exec(e.responseText) ; )
				{
					// Checks if the current script was added already
					for ( var i = scripts[0].length ; ~--i && script[1] != scripts[0][i] ; );

					if (!~i)
						scripts[2].push(script[1]);
				}

				installScripts(scripts);
			}, function(e)
			{
				alert('An error has occurred. Try again later.');
			});
		}
	});

	GM_registerMenuCommand(name + 'Import from pastebin...', function()
	{
		var code = prompt('Enter the numeric code:');
		if (/^\d+$/.test(code))
		{
			Persist.get('http://pastebin.mozilla.org/?dl=' + code, function(e)
			{
				// Checks if the content has the desired pattern (an array json)
				if (/^\[\d+(?:,\d+)*\]$/.test(e.responseText.replace(/\s+/g,'')))
				{
					var scripts = [eval(GM_getValue('scripts', '[]')), eval(e.responseText), []];

					for ( var i = scripts[1].length ; ~--i ; )
					{
						// Checks if the current script was added already
						for ( var j = scripts[0].length ; ~--j && scripts[1][i] != scripts[0][j] ; );

						if (!~j)
							scripts[2].push(scripts[1][i]);
					}

					installScripts(scripts);
				}
				else
					alert('The code is incorrect or doesn\'t exist anymore.');
			}, function(e)
			{
				alert('An error has occurred. Try again later.');
			});
		}
		else
			alert('The code must be a number.');
	});

	GM_registerMenuCommand(name + 'Export to pastebin', function()
	{
		var scripts = GM_getValue('scripts', '[]');

		var installs = eval(scripts).length;
		var current = new Date().valueOf();
		var code = GM_getValue('lastCode', '');

		// Checks if the number of installed versions changed or if the current date is greater than the last access date + 2 minutes
		if (installs != GM_getValue('lastExport', 0) || current > 120000 + parseInt(GM_getValue('lastAccess', '0'))) // 2 * 60 * 1000
		{
			Persist.set('http://pastebin.mozilla.org/', {
				'format':'text',
				'poster':'Backup scripts',
				'paste':'Send',
				'expiry':'m',
				'remember':'1',
				'parent_pid':code,
				'code2':scripts
			}, function(e)
			{
				GM_setValue('lastAccess', '' + new Date().valueOf());
				GM_setValue('lastExport', installs);
				GM_setValue('lastCode', code = '' + e.finalUrl.match(/\d+/));

				alert('Take a note of this number: ' + code + '\n\nThis will be used to import your scripts later and will be available for 1 month.');
			}, function(e)
			{
				alert('An error has occurred. Try again later.');
			});
		}
		else
			alert('You don\'t have any new script installed to be exported.' + ( code ? '\n\nLast code: ' + code : '' ));
	});
})();
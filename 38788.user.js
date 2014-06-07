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

function meta2object(meta)
{
	var out = {}, re = /^\/\/\s+@(\S+)\s+(.+)$/gm;
	for ( var match ; match = re.exec(meta) ; )
	{
		if (!(match[1] in out))
			out[match[1]] = [];

		out[match[1]].push(match[2]);
	}
	return out;
}
function CheckForUpdate()
{
	const CallbackResponse;
}
CheckForUpdate.CallbackResponse = {
	'Error':-1,
	'NoReminder':0,
	'ForcedWaiting':1,
	'Waiting':2,
	'Unchanged':3,
	'Changed':4
};
CheckForUpdate.changelog = function(oheader, nheader, source)
{
	return ( oheader['cfu:changelog'] ? eval(oheader['cfu:changelog'][0]+'(oheader, nheader, source)') : '' );
}
CheckForUpdate.init = function(header, callback)
{
	if (typeof header == 'xml')
		header = meta2object(header);
	
	if (!header['cfu:url'] || !(header['cfu:timestamp'] || header['cfu:version']))
		alert('@cfu:url and @cfu:timestamp/@cfu:version is required.');
	else
	{
		function update(header, manual, purl)
		{
			var tint = '1 week';
			var interval = eval((header['cfu:interval'] || tint).toString().replace(/week[s]?/,'* 7 days').replace(/day[s]?/g,'* 24 hours').replace(/hour[s]?/g,'* 60 minutes').replace(/minute[s]?/g,'* 60 seconds').replace(/second[s]?/g,'* 1000').replace(/[^\d*]+/g,''));
			var lastCheck = parseInt(GM_getValue('lastCheck-'+header.namespace+header.name, '0'), 10);
			var currentDate = new Date().valueOf();
			var c = CheckForUpdate.CallbackResponse.Waiting;
			if (currentDate-lastCheck < 120000)	// 2 * 60 * 1000
			{
				if (manual && !callback)
					alert('You have to wait at least 2 minutes before checking for updates again.');

				c = CheckForUpdate.CallbackResponse.ForcedWaiting;
			}
			else if ((interval > 0 && lastCheck+interval < currentDate) || manual)
			{
				GM_setValue('lastCheck-'+header.namespace+header.name, ''+currentDate);
		
				purl = parseInt(purl, 10) || 0;
			
				var urls = header['cfu:meta'] || header['cfu:url'] || [];
		
				c = CheckForUpdate.CallbackResponse.Error;
				if (purl < urls.length)
				{
					var curl = urls[purl].replace('@cfu:id',header['cfu:id'] && (header[header['cfu:id'][0]][0] || header['cfu:id'][0]) || '');

					c = null;
					GM_log('Checking for updates... ' + curl);

					GM_xmlhttpRequest({
						'url':curl + ( ~curl.indexOf('?') ? '&' : '?' ) + 'rand=' + Math.random(),
						'method':'get',
						'headers':{
							'Cache-Control':	'no-store, no-cache, must-revalidate',
							'Pragma':		'no-cache',
							'Expires':		'0'
						},
						'onload':function (e)
						{
							if (/^2/.test(e.status))
							{
								var h = meta2object(e.responseText);

								function compareVersion(newV, oldV)
								{
									var n = ('0.'+(newV || '0')).split('.');
									var o = ('0.'+(oldV || '0')).split('.');
									for ( var i = (Math.max(n.length, o.length))-1 ; i ; --i )
									{
										var x = parseInt(n[i], 10) || 0, y = parseInt(o[i], 10) || 0;
										if (x != y)
											return [x - y, i];
									}
									return 0;
								}

								var ltv = [header['cfu:version'] && (header[header['cfu:version'][0]][0] || header['cfu:version'][0]),header['cfu:timestamp'] && (header[header['cfu:timestamp'][0]][0] || header['cfu:timestamp'][0])]; // local temp version
								var rtv = [h['cfu:version'] && (h[h['cfu:version'][0]][0] || h['cfu:version'][0]),h['cfu:timestamp'] && (h[h['cfu:timestamp'][0]][0] || h['cfu:timestamp'][0])]; // remote temp version
								var v = [(ltv[0] && ltv[1] && rtv[0] && rtv[1]? ltv[1] + ' ('+ltv[0]+')' : ltv[0] || ltv[1]),(rtv[0] && rtv[1] && ltv[0] && ltv[1] ? rtv[1] + ' ('+rtv[0]+')' : rtv[0] || rtv[1])];

								if ((Date.parse(''+rtv[1]) || parseInt(rtv[1], 10)) > (Date.parse(''+ltv[1]) || parseInt(ltv[1], 10)) || compareVersion(''+rtv[0], ''+ltv[0])[0] > 0)
								{
									if (!!callback)	// "true"
										callback(CheckForUpdate.CallbackResponse.Changed, !!manual, header, h, e.responseText);
									else if (typeof(callback)!='boolean') // !false
									{
										if (confirm('[ '+header.name+' ]'+
												'\n\nCurrent version:\t'+v[0]+
												'\nLastest version:\t'+v[1]+
												'\n'+CheckForUpdate.changelog(header, h, e.responseText)+
												(header.name[0] != h.name[0] || header.namespace[0] != h.namespace[0] ? '\nName and/or namespace has changed.\nYou should uninstall the current version manually.\n' : '')+
												'\nInstall the lastest version now?'))
											GM_openInTab(header['cfu:url'][0].replace('@cfu:id',header['cfu:id'] && (header[header['cfu:id'][0]][0] || header['cfu:id'][0]) || ''));
										else if (confirm('Would you like to be reminded tomorrow?'))
											GM_setValue('lastCheck-'+header.namespace+header.name, '' + (currentDate - 518400000)); // 6 * 24 * 60 * 60 * 1000
										else
											alert((interval > 0 ? 'You will be reminded again in '+(header['cfu:interval'] || tint) : 'You won\'t be reminded again.' ));
									}
								}
								else if (!!callback)
								{
									callback(CheckForUpdate.CallbackResponse.Unchanged, !!manual, header, h, e.responseText);
								}
								else if (manual)
								{
									alert('You are using the lastest version.\n\nInstalled version:\t'+v[0]+'\nPublic version:\t\t'+v[1]);
								}
							}
							else
								update(header, manual, ++purl);
						},
						'onerror':function (e)
						{
							update(header, manual, ++purl);
						}
					});
				}
				else
					GM_log('An error has occurred while checking for updates.');
			}
			else if (interval <= 0)
				c = CheckForUpdate.CallbackResponse.NoReminder;

			if (c !== null && !!callback)
				callback(c, !!manual, header);
		}

		if (typeof(callback)!='boolean')
			GM_registerMenuCommand('[' + header.name + '] Check for Updates', function()
			{
				update(header, true);
			});
	
		update(header, false);
	}

	return header;
};

/*#####################################*/
/*#####################################*/
/*###                               ###*/
/*###   DON'T COPY THE CODE BELOW   ###*/
/*###                               ###*/
/*#####################################*/
/*#####################################*/

CheckForUpdate.init(<>
// ==UserScript==
// @name           Includes : CheckForUpdate
// @namespace      http://gm.wesley.eti.br/includes
// @description    CheckForUpdate function. This script doesn't do anything except keep itself updated.
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// @version        2.0.3.0
// @include        nowhere
// @cfu:meta       http://userscripts.org/scripts/source/@cfu:id.meta.js
// @cfu:meta       http://userscripts.org/scripts/review/@cfu:id?format=text
// @cfu:url        http://userscripts.org/scripts/source/@cfu:id.user.js
// @cfu:id         uso:script
// @cfu:timestamp  uso:timestamp
// @cfu:version    version
// @cfu:interval   1 week
// @uso:script     38788
// @uso:timestamp  13:51 12/28/2008
// ==/UserScript==
</>, typeof(CheckForUpdateCallback) == 'function' && CheckForUpdateCallback);
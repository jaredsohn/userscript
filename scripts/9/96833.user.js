scr_meta=<><![CDATA[ 
// ==UserScript==
// @name          Travian Executioner
// @namespace     T.EXE
// @description   Travian Executioner

// @copyright     © Travian Executioner 2011 © Andriy 2005-2011
// @author        Andriy
// @version       0.0.6

// @source        http://userscripts.org/scripts/show/74475
// @identifier    http://userscripts.org/scripts/show/74475.user.js

// @license       GNU General Public License
// @include       http://*.travian*.*/dorf1.php*
// @include       http://*.travian*.*/dorf2.php*
// @include       http://*.travian*.*/build.php*
// @include       http://*.travian*.*/karte.php*
// @include       http://*.travian*.*/berichte.php*
// @include       http://*.travian*.*/nachrichten.php*
// @include       http://*.travian*.*/spieler.php*
// @include       http://*.travian*.*/allianz.php*
// @exclude       http://help.travian*.*
// @exclude       http://forum.travian*.*
// ==/UserScript==
]]></>.toString();

var AutoUpdater =
{
	id: '96833',
	days: 1,
	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
	time: new Date().getTime(),
	call: function(response)
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/' + this.id + '.meta.js',
			onload: function(xpr)
			{
				AutoUpdater.compare(xpr, response);
			}
		});
	},
	compare: function(xpr, response)
	{
		this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) )
		{
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		}
		else
		{
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
				GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		if ( (+this.xversion > +this.version) && (confirm('A new version of the ' + this.xname + ' user script is available. Do you want to update?')) )
		{
			GM_setValue('updated_' + this.id, this.time + '');
			top.location.href = 'http://userscripts.org/scripts/source/' + this.id + '.user.js';
		}
		else if ( (this.xversion) && (+this.xversion > +this.version) )
		{
			if (confirm('Do you want to turn off auto updating for this script?'))
			{
				GM_setValue('updated_' + this.id, 'off');
				GM_registerMenuCommand("Auto Update " + this.name, function()
				{
					GM_setValue('updated_' + this.id, new Date().getTime() + '');
					AutoUpdater.call(true);
				});
				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			}
			else
			{
				GM_setValue('updated_' + this.id, this.time + '');
			}
		}
		else
		{
			if (response)
				alert('No updates available for ' + this.name);
			GM_setValue('updated_' + this.id, this.time + '');
		}
	},
	check: function()
	{
		if (GM_getValue('updated_' + this.id, 0) == "off")
		{
			GM_registerMenuCommand("Enable " + this.name + " updates", function()
			{
				GM_setValue('updated_' + this.id, new Date().getTime()+'');
				AutoUpdater.call(true);
			});
		}
		else
		{
			if (+this.time > (+GM_getValue('updated_' + this.id, 0) + 1000 * 60 * 60 * 24 * this.days))
			{
				GM_setValue('updated_' + this.id, this.time + '');
				this.call();
			}
			GM_registerMenuCommand("Check " + this.name + " for updates", function()
			{
				GM_setValue('updated_' + this.id, new Date().getTime() + '');
				AutoUpdater.call(true);
			});
		}
	}
};

$(window).ready(function()
{
	try
	{
		if (self.location == top.location && typeof(GM_xmlhttpRequest) != 'undefined')
			AutoUpdater.check();
		alert('Travian Executioner Under Construction!');
	}
	catch(err) 				
	{
		
	}
}, true);
// ==UserScript==
// @name                Show recovery time for AP in Urban Dead
// @namespace           http://www.urbandead.com
// @description         Adds a line to indicate the time required to recover full AP in Urban Dead.
// @include             http://*urbandead.com/map.cgi*
// ==/UserScript==

/**
 * Based on the userscript by Sean Dwyer <sean DOT dwyer AT gmail DOT com>
 * Edited by Bran Rainey for compatibility with UDtoolbar and RPing.
 *
 * Distributed under the GNU General Public License
 * http://www.gnu.org/licenses/gpl.txt
 */

showRecoveryTime();

function showRecoveryTime()
{
	var ap = getAP();
	if (ap == -1) return;
	
	var ib = getDescriptionRow();
	if (ib == null) return;
	
	var hours = (50 - ap) * .5;
	
	ib.appendChild(document.createTextNode(' You won\'t be fully rested for another ' + hours + ' hour' + ((hours == 1) ? '' : 's') + '.'));
}

function getAP()
{
	var re = /You have <b>([0-9]+)<\/b> Action Points? remaining/;
	var matches;
	
	if (re.test(document.body.innerHTML))
	{
		matches = re.exec(document.body.innerHTML);
		
		return parseInt(matches[1]);
	}
	
	return -1;
}

function getDescriptionRow()
{
	var paras = document.getElementsByTagName('div');
	
	for (var i = 0; i < paras.length; ++i)
		if (paras[i].className == 'gt')
			return paras[i];
	
	return null;
}
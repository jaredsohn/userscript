// ==UserScript==
// @name                Shartak Terrain Type Info
// @namespace           
// @description         Displays the terrain name where one stands
// @include             http://*www.shartak.com/game.cgi* 
// ==/UserScript==

/**
 * @author  fitzcarraldo
 * @version 20060305-pa6
 *
 * Distributed under the GNU General Public License
 * http://www.gnu.org/licenses/gpl.txt
 * ----------------------------------------------------------------------------
 * this script is based heavily on the UrbanDead AP Recovery Time Indicator found here: http://www.fireopal.com/ud/ud-recoverytime.user.js
 * 
 * VERSIONS
 * pa3 - 1st release
 * pa4 - fixed bug with other action buttons (npc's) on screen.
 * pa5 - fix for script formatting, a big thanks to "Frisco 00:18, 2 March 2006 (GMT)"
  *    - changed references to correct script used from the UD revive radar.
   *   - got rid of "map"
 * pa6 - was giving erroneous results with an icon in any square north or due west of ones position
 */

showTerrainType();

function showTerrainType()
{
	var tt = gettt();
	if (tt == -1) return;
	
	tt = tt.replace(/class=\"map /g,'');
	tt = tt.replace(/\"/g,'');
	
	var ib = getInfoBox();
	if (ib == null) return;

	var ttdiv = document.createElement('div');
	var ttbold = document.createElement('b');
	ttbold.appendChild(document.createTextNode('Terrain Type: '));
	ttdiv.appendChild(ttbold);
	ttdiv.appendChild(document.createTextNode(tt));
	ib.appendChild(ttdiv);
	//debug//
}

function gettt()
{
	var re = /class=\"map([a-zA-Z0-9. ]+)/g;
	var matches;

	if (re.test(document.body.innerHTML))
	{
		matches = (document.body.innerHTML).match(re);
		return matches[12];
	}
	return -1;
}

function getInfoBox()
{
	var paras = document.getElementsByTagName('DIV');
	
	for (var i = 0; i < paras.length; ++i)
		if (paras[i].className == 'info' && paras[i].firstChild.nodeType == 3)
			return paras[i];
	return null;
}
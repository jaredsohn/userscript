// ==UserScript==
// @name                Shartak Jungle Density Viewer
// @namespace           
// @description         Displays the jungle density on the current map
// @include             http://*www.shartak.com/game.cgi*
// ==/UserScript==

/**
 * @author  Roger Light aka Dr. J (based on a script by fitzcarraldo)
 * @version 20060301
 *
 * Distributed under the GNU General Public License
 * http://www.gnu.org/licenses/gpl.txt
 * ----------------------------------------------------------------------------
 * This script is based heavily on the Shartak Terrain Type Info found here: http://userscripts.org/scripts/source/3320.user.js
 */

showJungleDensity()

function showJungleDensity()
{
	var tt;
	var td;
	var head;

	for (var i = 0; i < 25; i++){
		td = getTerrainBox(i);
		tt = gettt(i);
		tt = tt.replace(/class=\"map /g,'');
		tt = tt.replace(/[a-zA-Z -]*\"/g,'');

		if(tt.search(/density/) != -1 && td){
			tt = tt.replace(/density/,'');
			tt = tt.replace(/ icon-hut/,'');
			head = td.getElementsByTagName('H4');
			if(head){
				head[0].innerHTML = head[0].innerHTML+' '+tt;
			}
		}
	}
}

function gettt(i)
{

	var re = /class=\"map ([a-zA-Z0-9. -]+)/g;
	var matches;
	
	if (re.test(document.body.innerHTML)){
		matches = (document.body.innerHTML).match(re);
		return matches[i];
	}
	
	return -1;	

}

function getTerrainBox(x)
{
	var cells = document.getElementsByTagName('TD');
	var re = /map /g;

	cellindex = -1
	for (var i = 0; i < cells.length; ++i){
		if ((cells[i].className).match(re)){
			cellindex++;
		}
		if(cellindex == x){
			return cells[i];
		}
	}
	
	return null;
}

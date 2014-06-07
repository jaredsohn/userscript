// ==UserScript==
// @name           Neopets : Snowager/Deadly Dice Alert
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Opens a new tab if Snowager is asleep or Count von Roo is awake.
// @include        http://www.neopets.com/*
// @exclude        http://www.neopets.com/ads/*
// @exclude        http://www.neopets.com/games/play_flash.phtml?*
// @exclude        http://www.neopets.com/neomail_block_check.phtml?*
// @exclude        http://www.neopets.com/iteminfo.phtml?*
// @exclude        http://www.neopets.com/~*
// @require        http://www.wesley.eti.br/includes/js/php.js
// @require        http://www.wesley.eti.br/includes/js/php2js.js
// @require        http://gm.wesley.eti.br/gm_default.js
// @require        http://gm.wesley.eti.br/neopets/neopets_default.js
// @author         w35l3y / quickmythril
// @email          w35l3y@brasnet.org / quickmythril@gmail.com
// @version        1.0.3.1
// @copyright      w35l3y 2008 / quickmythril 2009
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br / n/a
// ==/UserScript==


// ----------------------------------------------------------------------------
// QuickMythril says, "This script was written by w35l3y, and modified by me."
// Lines I have added or edited are marked by comments.
// All I did was add the Deadly Dice alert and change the Snowager alert so
// that it goes directly to the second page instead of having to click 'here'.
// ----------------------------------------------------------------------------


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

checkForUpdate({
	'file':'http://userscripts.org/scripts/source/42811.user.js',
	'name':'Neopets : Snowager/Deadly Dice Alert',
	'namespace':'http://gm.wesley.eti.br/neopets',
	'version':'1.0.3.1'
});

(function recursive()
{	// script scope

	var user = {
		'increment':GM_getValue('increment',	0)	// milisseconds
	};

	var nst = Neopets.Time();
	nst.setMinutes(0,0,0);

	var h = nst.getHours();
	if (GM_getValue("lastAccess","0") != nst.valueOf() && (""+h).match(/^(?:0?6|14|22)$/))
	{
		GM_setValue("lastAccess",""+nst.valueOf());
		GM_openInTab("http://www.neopets.com/winter/snowager2.phtml");				//QuickMythril (changed snowager.phtml to snowager2.phtml)
	}

	if (GM_getValue("lastAccess","0") != nst.valueOf() && (""+h).match(/^(?:0?0|24)$/))		//QuickMythril (not sure if this should be hour 0 or 24)
	{												//QuickMythril
		GM_setValue("lastAccess",""+nst.valueOf());						//QuickMythril
		GM_openInTab("http://www.neopets.com/worlds/deadlydice.phtml");				//QuickMythril
	}												//QuickMythril

	var snowagerDate = new Date(nst);
	var deadlydiceDate = new Date(nst);								//QuickMythril

	snowagerDate.setHours(h+8-((2+h) % 8),0,0,0);
	deadlydiceDate.setHours(h+8-((2+h) % 8),0,0,0);							//QuickMythril

	setTimeout(recursive, snowagerDate.valueOf() - nst.valueOf() + user.increment);
	setTimeout(recursive, deadlydiceDate.valueOf() - nst.valueOf() + user.increment);		//QuickMythril
})();













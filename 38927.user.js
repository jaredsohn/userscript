/**
 * mostwanted.user.js
 * Copyright (c) 2008 Norb
 * Released under the GPL license 
 * 
 * @version 0.1
 * @author  Norb <norb@alinto.com>
 * @link    http://userscripts.org/scripts/show/38927
 * @license http://www.gnu.org/copyleft/gpl.html  GNU General Public License
 */

// --------------------------------------------------------------------
// 
// This is a Greasemonkey user script.
// 
// 
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name           Immortal Low Connexion
// @description    Script pour www.immortalswar.com : Script pour enlever la partie flash lors des combats
// @include        http://www.immortalswar.com/index.php
// ==/UserScript==
// 
// --------------------------------------------------------------------
// 
// @todo :
// 			- Donnez vos idées
//
//
// ==/UserScript==


if (document.getElementById("anim"))
{
	unsafeWindow._mw_old = unsafeWindow.ViewComb;
	
	unsafeWindow.ViewComb = function(idterrain,j1,j2,jwin) 
	{
		new Request.HTML({  
			method: 'post',  
			url: 'scripts/combat/view_comb.php',
			data: { 'idterrain' : idterrain,'j1': j1,'j2' : j2 ,'jwin' : jwin }		
			}).send(); 	
	};


	targetNodes = document.getElementsByTagName("div");
	for(i=0;i<targetNodes.length;i++)
	{				
		if (targetNodes[i].getAttribute("style") != null && targetNodes[i].getAttribute("style").indexOf("modules/comb/") != -1 && targetNodes[i].getAttribute("id") != "timer")
			targetNodes[i].setAttribute("style", "");
	}
	

	
	document.getElementById("anim").innerHTML = "";
}
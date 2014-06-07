// ==UserScript==
// @name Duniu Travian Map Enhancer
// @author MeteorRain
// @include http://tra.duniu.com/map*
// @version 1.0
// @description  Enables Duniu Travian Map hidden features
// ==/UserScript==

/* 
	Duniu Travian Map Enhancer (A GreaseMonkey Extension)
	Copyright (C) 2007, MeteorRain
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	
	For licence infomation, see <http://www.gnu.org/licenses/>.
*/

function funcionPrincipal(e){
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	function elem(tag, content){ 
		var ret = document.createElement(tag);  
		ret.innerHTML = content;  
		return ret;
	}
	function find(xpath, xpres){
		var ret = document.evaluate(xpath, document, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	function dtm_main()
	{
		var db = find("//select[@name='db']", XPFirst);
		var t = location.href.match(/db=(.*?)&/);
		if(t == undefined)
			cdb = '';
		else
			cdb = t.pop();
		var servers = [
		['s2cn', 's2.travian.cn'],
		['s3cn', 's3.travian.cn'],
		['s4cn', 's4.travian.cn'],
		['s5cn', 's5.travian.cn'],
		['s6cn', 's6.travian.cn'],
		['speedcn', 'speed.travian.cn']
		]
		for(var i = 0; i < servers.length; i++)
		{
			var opt = elem('option', servers[i][1]);
			opt.setAttribute('value', servers[i][0]);
			if(servers[i][0] == cdb)
				opt.setAttribute('selected', 'selected');
			db.appendChild(opt);
		}
	}

	dtm_main();
};

window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();

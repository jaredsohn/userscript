// ==UserScript==
// @name           Includes : Neopets
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    Neopets Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.3
// @language       en
// @include        http://www.neopets.com/*#alert
// @include        http://www.neopets.com/*#console
// @require        http://userscripts.org/scripts/source/63808.user.js
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

Neopets = function(){};

Neopets.convert = function(doc)
{
	return new (function(_d)
	{
		var _t = new Date(),
		_s = function(e)
		{
			return xpath("string("+e+")", _d) || "";
		},
		_n = function(e)
		{
			return parseInt((_s(e).match(/^\d+(?:[,.]\d{3})*/)||[""])[0].replace(/[,.]+/g, ""), 10) || 0;
		};
		
		this.Time = function(is_dynamic)
		{
			var out = new Date();
			out.setMilliseconds((out.getTimezoneOffset()-480)*60000);	/* GMT-0800 */

			var nst = (_s("//script[contains(text(),'var nh = ')]/text()").match(/var n[hmsa] = ([""''])?[\w\d]{1,}\1\;$/gm) || (function(x)
			{
				var o = new Date(x),
				s = 1 + new Date(o.getFullYear(), 2, 8).getDay(),
				i = new Date(o);

				i.setHours(2, 0, 0);
				i.setMonth(2, 7 + s);	/* 2nd sunday of march */
				
				var f = new Date(i);
				f.setMonth(10, s);	/* 1st sunday of november */
				
				if (i <= o && o < f)	/* daylight saving time */
				o.setMilliseconds(3600000);
				
				return ([(o.getHours() - 1) % 12 + 1, o.getMinutes(), o.getSeconds(), (o.getHours() > 11 ? "'pm'" : "'am'")].join(";\n")+";").split("\n");
			})(out)).map(function(a)
			{
				return (/([\w\d]+)[""'']?\;$/.test(a) && RegExp.$1);
			});

			var sum = 43200 * (nst.pop().toLowerCase() == "pm" && nst[0] < 12);
			for ( var i in nst )
			sum += parseInt(nst[i], 10) * [3600, 60, 1][i];
			sum *= 1000;

			out.setHours(0, 0, 0, 0);
			out.setMilliseconds(sum);

			if (is_dynamic)
			{
				out.setMilliseconds(new Date() - _t);
			}
			
			return out;
		};
		this.Username = function(){return (/([^=]+)$/.test(_s("id('header')//a[contains(@href,'?user=')]/@href")) && RegExp.$1 || "");};
		this.Language = function(){return (/var nl = ([""''])?(\w{1,})\1\;$/m.test(_s("//script[contains(text(),'var nl = ')]/text()")) && RegExp.$2 || _s("//select[@name='lang']/option[@selected]/@value") || /\blang=(\w+)\b/.test(document.cookie) && RegExp.$1 || "en");};
		this.Theme = function(){return (/\/themes\/([\d\w_]+)/.test(_s("//link[contains(@href,'/themes/')]/@href | //img[contains(@src,'/themes/')][1]/@src")) && RegExp.$1 || "000_def_f65b1");};
		this.Neopoints = function(){return (_n("id('header')//td/a[contains(@href,'?type=inventory')]/text()"));};
		this.Neocredits = function(){return (_n("id('header')//td/a[contains(@href,'mall/index.phtml')]/text()"));};
		this.ActivePet = function()
		{
			var health = _s("//td[@class='activePetInfo']//tr[2]/td[2]/descendant::text()").split(/\s+\/\s+/);

			return {
				'Name':_s("//a[contains(@href,'quickref.phtml')]/descendant::text()"),
				'Species':_s("//td[@class='activePetInfo']//tr[1]/td[2]/descendant::text()"),
				'Health':[parseInt(health[0], 10)||0,parseInt(health[1], 10)||0],
				'Mood':_s("//td[@class='activePetInfo']//tr[3]/td[2]/descendant::text()"),
				'Hunger':_s("//td[@class='activePetInfo']//tr[4]/td[2]/descendant::text()"),
				'Age':_n("//td[@class='activePetInfo']//tr[5]/td[2]/descendant::text()"),
				'Level':_n("//td[@class='activePetInfo']//tr[6]/td[2]/descendant::text()")
			};
		};		
		this.Neofriends = function()
		{
			var nfs = [];

			var fs = xpath("//td[@class='neofriend']//tr[position() mod 2 = 1]/td/div[2]/text()[2]", _d);

			for ( var ai = 0 , at = fs.length ; ai < at ; ++ai )
			{
				var d = new Date(_t);
				d.setSeconds(-eval(fs[ai].textContent.replace(/^\s+|\s+$|\s+\|\s?/g, '').replace(/hrs?/," * 3600 + ").replace(/mins?/,' * 60 + ').replace(/secs?/,' + ')+"0"));
				
				nfs.push({
					'Avatar':fs[ai].parentNode.parentNode.parentNode.cells[0].childNodes[0].src,
					'Username':/([^=]+)$/.test(fs[ai].parentNode.previousSibling.childNodes[1].href) && RegExp.$1 || "",
					'Online': d
				});
			}

			return nfs;
		};
	})(doc);
};

if (/^#(alert|console)$/.test(location.hash))
{
	var d = Neopets.convert(document);

	setTimeout(function()
	{
		(location.hash == "#alert" ? alert : console && console.log || GM_log)([
			d.Time(true),
			d.Time(false),
			d.Username(),
			d.Language(),
			d.Theme(),
			d.Neopoints(),
			d.Neocredits(),
			(function(ap)
			{
				var o = [];
				for each (var v in ap)
				o.push(v);
				return o;
			})(d.ActivePet()),
			(function(nf)
			{
				var o = [];
				for each (var n in nf)
				{
					var x = [];

					for each (var v in n)
					x.push(v);

					o.push(x);
				}
				return o.join("\n");
			})(d.Neofriends())
		].join("\n"));
	}, 1000 + Math.floor(4000 * Math.random()));
}
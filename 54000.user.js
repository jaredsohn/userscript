// ==UserScript==
// @name           Includes : Neopets [DISCONTINUED] 
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    Neopets Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.3.6
// @language       en
// @include        nowhere
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

Neopets = function(doc)
{
	var _d = doc;	// document
	var _usern = null;
	var _time = new Date();

	var string = function(xpath)
	{
		return _d.evaluate("string(" + xpath + ")", _d, null, XPathResult.STRING_TYPE, null).stringValue || "";
	};
	var number = function(xpath)
	{
		return parseInt(((string(xpath).match(/^\d+(?:[,.]\d{3})*/)||[])[0]||"").replace(/[,.]/g, ""), 10) || 0;
	};
	var bool = function(xpath)
	{
		return _d.evaluate("boolean(" + xpath + ")", _d, null, XPathResult.BOOLEAN_TYPE, null).booleanValue || false;
	};

	this.Time = function(is_dynamic)
	{
		var out = new Date();
		
		var nst = (string("//script[contains(text(),'var nh = ')]/text()").match(/var n[hmsa] = ([""''])?[\w\d]{1,}\1\;$/gm) || (function(x)	/*dst*/
		{
			var o = new Date(x);
			o.setUTCMilliseconds(-3600000 * 8);

			var s = 1 + new Date(o.getUTCFullYear(), 2, 8).getUTCDay(),
			i = new Date(o);

			i.setUTCHours(2, 0, 0);
			i.setUTCMonth(2, 7 + s);/*mar*/
			
			var f = new Date(i);
			f.setUTCMonth(10, s);/*nov*/
			
			if (i <= o && o < f)
			o.setUTCMilliseconds(3600000);
			
			return ([(o.getUTCHours() - 1) % 12 + 1, o.getUTCMinutes(), o.getUTCSeconds(), (o.getUTCHours() > 11 ? "'pm'" : "'am'")].join(";\n")+";").split("\n");
		})(out)).map(function(a)
		{
			return /([\w\d]+)[""'']?\;$/.test(a) && RegExp.$1;
		});

		var sum = 86400 - 43200 * (nst.pop().toLowerCase() == "pm" && nst[0] < 12);
		for ( var i in nst )
		sum -= parseInt(nst[i], 10) * [3600, 60, 1][i];
		sum *= 1000;
		
		out.setHours(0, 0, 0);
		out.setMilliseconds(-sum);
		
		if (is_dynamic)
		{
			out.setMilliseconds(new Date() - _time);
		}
		
		return out;
	};

	this.Username = (function()
	{
		return (string("id('header')//a[contains(@href,'?user=')]/@href").match(/([^=]+)$/)||[])[1] || "";
	})();

	this.Language = (function()
	{
		return (string("//script[contains(text(),'var nl = ')]/text()").match(/var nl = ([""''])?(\w{1,})\1\;$/m)||[])[2] || string("//select[@name='lang']/option[@selected]/@value") || "en";
	})();

	this.Theme = (function()
	{
		return (string("//link[contains(@href,'/themes/')]/@href | //img[contains(@src,'/themes/')][1]/@src").match(/\/themes\/([\d\w_]+)/)||[])[1] || "000_def_f65b1";
	})();

	this.Neopoints = (function()
	{
		return number("id('header')//td/a[contains(@href,'?type=inventory')]/text()");
	})();

	this.Neocredits = (function()
	{
		return number("id('header')//td/a[contains(@href,'mall/index.phtml')]/text()");
	})();

	this.ActivePet = (function()
	{
		var health = string("//td[@class='activePetInfo']//tr[2]/td[2]/descendant::text()").split(" / ");
		return {
			'Name':string("//a[contains(@href,'quickref.phtml')]/descendant::text()"),
			'Species':string("//td[@class='activePetInfo']//tr[1]/td[2]/descendant::text()"),
			'Health':[parseInt(health[0], 10)||0,parseInt(health[1], 10)||0],
			'Mood':string("//td[@class='activePetInfo']//tr[3]/td[2]/descendant::text()"),
			'Hunger':string("//td[@class='activePetInfo']//tr[4]/td[2]/descendant::text()"),
			'Age':number("//td[@class='activePetInfo']//tr[5]/td[2]/descendant::text()"),
			'Level':number("//td[@class='activePetInfo']//tr[6]/td[2]/descendant::text()")
		};
	})();

	this.Neofriends = (function()
	{
		var nfs = [];

		var fs = _d.evaluate("//td[@class='neofriend']//tr[position() mod 2 = 1]/td/div[2]/text()[2]", _d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for ( var ai = 0 , at = fs.snapshotLength ; ai < at ; ++ai )
		{
			var f = fs.snapshotItem(ai);

			nfs.push({
				'Avatar':f.parentNode/*div*/.parentNode/*td*/.parentNode/*tr*/.cells[0]/*td*/.childNodes[0]/*img*/.src,
				'Username':f.parentNode/*div*/.previousSibling/*div*/.childNodes[1]/*a*/.textContent,
				'Online':f.textContent.replace(/^\s+|\s+$|\s+\|\s?/g, '').replace('hr','hour').replace('min','minute')
			});
		}

		return nfs;
	})();

	this.Debug = function()
	{
		return [
			'Load Time\t'+this.Time(),
			'Current Time\t'+this.Time(true),
			'Username\t'+this.Username,
			'Language\t\t'+this.Language,
			'Theme\t\t'+this.Theme,
			'Neopoints\t'+this.Neopoints,
			'Neocredits\t'+this.Neocredits,
			"[ActivePet]\n- " + (function(x){with (x){return [Name,Species,Health,Mood,Hunger,Age,Level];}})(this.ActivePet).join("\n- "),
			"[Neofriends]\n- " + (function(x)
			{
				var f = [];
				for ( var i in x )
				{
					f.push([x[i].Avatar,x[i].Username,x[i].Online]);
				}
				return f;
			})(this.Neofriends).join("\n- ")
		].join("\n");
	}
};

times = [];

Neopets.addMessage = function(msg, time)
{
	GM_log([new Date(), msg]);

	if (GM_getValue('DisplayMessage', true))
	{
		var container;
		if (!(container = document.getElementById('NeopetsMessageContainer')))
		{
			container = document.createElement('div');
			container.setAttribute('id', 'NeopetsMessageContainer');
			container.setAttribute('style','z-index:11; text-align:right; position:fixed; bottom:0px; right:0px; background-color:#000; font-weight:bold; color:#FFF; display:block; padding:4px; padding-left:7px; min-width:0px; min-height:14px;');
			container.style.opacity = 1;
			document.body.appendChild(container);
		}

		var text = document.createElement('span');
		text.setAttribute('style', 'margin-right:2px;');
		text.style.opacity = 1;
		text.innerHTML = msg + "<br />";
		container.appendChild(text);

		function fadeOutElement(elem, ini, min, max, is_parent)
		{
			clearInterval(times[0]);
			clearTimeout(times[1]);
			clearTimeout(times[2]);

			if (!is_parent)
			{
				elem.parentNode.style.opacity = 1;

				var minWidth = parseInt(elem.parentNode.style.minWidth.match(/^\d+/)[0]);
				if (minWidth == 0 || minWidth > elem.offsetWidth)
				{
					elem.parentNode.style.minWidth = 2 + elem.offsetWidth + "px";
				}
			}

			var t3 = setTimeout(function(elem, min, max, is_parent)
			{
				var t1 = setInterval(function(elem, min, max)
				{
					elem.style.opacity -= 1/(max/min);
				}, min, elem, min, max);

				var t2 = setTimeout(function(elem, t1, is_parent)
				{
					clearInterval(t1);

					elem.parentNode.removeChild(elem);
				}, max + min, elem, t1, is_parent);

				if (is_parent)
				{
					times = [t1,t2];
				}
				else
				{
					fadeOutElement(elem.parentNode, max, min, 1500, true);
				}
			}, ini, elem, min, max, is_parent);

			if (is_parent)
			{
				times[2] = t3;
			}
		}

		fadeOutElement(text, Math.max(time||5000, 5000), 90, 4000);
	}
};

var NeopetsDocument = new Neopets(document);

//alert(NeopetsDocument.Debug());
//setTimeout(function(){alert(NeopetsDocument.Debug());},3000);
//setInterval(function(){alert(NeopetsDocument.Debug());},5000);
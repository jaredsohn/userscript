// ==UserScript==
// @name           Includes : Template [BETA]
// @namespace      http://gm.wesley.eti.br
// @description    Template Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0
// @language       en
// @include        /userscripts\.org\/scripts\/review\/176400$/
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=176400
// @require        /scripts/source/292725.user.js
// @require        /scripts/source/288385.user.js
// @debug          true
// @uso:author     55607
// @uso:script     176400
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

Template = {
	get templates() {
		var retorno = {};

		try {
			retorno = JSON.parse(GM_getResourceText("templates"));
		} catch (e) {}

		return retorno;
	},
};
Template.get = function (template, context) {
	if (/^\w+(?:\.\w+)*$/.test(template)) {
		template = (function recursive (v, cont, index) {
			if (index < v.length) {
				var k = v[index];

				if (k in cont) {
					return recursive(v, cont[k], ++index);
				} else {
					return v.join(".");
				}
			} else {
				return cont;
			}
		}(template.split("."), Template.templates, 0));
	}

	return (function recursive (value, root, last, iindex, wild) {
		return value.replace((wild?/\#\{(\w+(?:\.\w+)*)(?:\|(\w+)?\s*([<>=]{1,2})\s*([-\w]+)?)?\}([^]+)?\#\{\/\1\}/g
															:/\#\{(\w+(?:\.\w+)*)(?:\|(\w+)?\s*([<>=]{1,2})\s*([-\w]+)?)?\}([^]+?)?\#\{\/\1\}/g), function (all, key, value1, operator, value2, content) {
			var c = key.split("."),
			r = root,
			l = [];

			for (var index in c) {
				if (typeof r == "object" && c[index] in r) {
					l.push(c[index]);
					r = r[iindex = c[index]];
				} else if ("index" == c[index]) {
					l.push(c[index]);
					r = iindex;
				} else if ("values" == c[index]) {
					var o = "",
					x = {};

					for (var index2 in r) {
						o += recursive(content, r[index2], x, index2, false);
						x = r[index2];
					}

					return o;
				} else {
					return l;
				}
			}

			if (r instanceof Array && !value1) {
				value1 = "length";
			}

			var d = true,
			v1 = (value1?r[value1]:r),
			v2 = (value2?value2:last && last[key]);

			switch (operator) {
				case ">":d = (v1 > v2);break;
				case ">=":d = (v1 >= v2);break;
				case "<":d = (v1 < v2);break;
				case "<=":d = (v1 <= v2);break;
				case "=":d = (v1 == v2);break;
				case "==":d = (v1 === v2);break;
				case "<>":d = (v1 != v2);break;
			}

			if (d) {
				if (r instanceof Array) {
					if (/\#\{values\}/.test(content)) {	// quicker way
						return recursive(content, r, {}, iindex, true);
					} else {
						var o = "";
						x = {};

						for (var index2 in r) {
							o += recursive(content, r[index2], x, index2, false);
							x = r[index2];
						}

						return o;
					}
				} else {
					return recursive(content, r, {}, iindex, false);
				}
			} else {
				return "";
			}
		}).replace(/\#\{(\w+(?:\.\w+)*)\/\}/g, function (all, key) {
			var c = key.split("."),
			r = root,
			l = [];

			for (var index in c) {
				if (typeof r == "object" && c[index] in r) {
					l.push(c[index]);
					r = r[iindex = c[index]];
				} else if ("value" == c[index]) {
					return r;
				} else if ("index" == c[index]) {
					return iindex;
				} else {
					return l;
				}
			}

			return r;
		});
	}(template, context, undefined, 0, true));
}

Assert.execute(new function TemplateTest () {
	this.testOutputs = function () {
		assertEquals("-1-2-3", Template.get("#{values}-#{value/}#{/values}", [1,2,3]));
		assertEquals("1-2W-3", Template.get("#{values}#{index|>0}-#{/index}#{value/}#{index|=1}W#{/index}#{/values}", [1,2,3]));
		assertEquals("*1W-*1W*2-*1W*2*3", Template.get("#{values}#{index|>0}-#{/index}#{v1}*#{value/}#{index|<1}W#{/index}#{/v1}#{/values}", [{v1:[1]}, {v1:[1,2]}, {v1:[1,2,3]}]));
		assertEquals("*1|23-*1*2|34*5-*1*2*3|4", Template.get("#{values}#{index|>0}-#{/index}#{v1}*#{value/}#{/v1}|#{v2}#{index|>1}*#{/index}#{value/}#{/v2}#{/values}", [{v1:[1], v2:[2,3]}, {v1:[1,2], v2:[3,4,5]}, {v1:[1,2,3], v2:[4]}]));
	};
});

// ==UserScript==
// @name           Includes : XPath
// @namespace      http://gm.wesley.eti.br/includes
// @description    xpath Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.5
// @language       en
// @include        nowhere
// ==/UserScript==

/**************************************************************************

	Author 's NOTE

    Original http://lowreal.net/blog/2007/11/17/1

***************************************************************************

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

XPath = Xpath = xpath = function()
{
	var a = Array.prototype.slice.call(arguments),	// args
	e = a[0],	// expression
	c = a[1],	// context
	t = a[2];	// type
	
	if (typeof c == "function")
	{
		t = c;
		c = null;
	}
	if (!c)
	c = document.documentElement||document;
	var d = c.ownerDocument || c;
	e = d.createExpression(e, function(p)
	{
       	var o = d.createNSResolver(c).lookupNamespaceURI(p);

		if (o)
		return o;
		else switch (c.contentType)
		{
			case "text/xhtml":
			case "application/xhtml+xml":
				return "http://www.w3.org/1999/xhtml";
			default:
				return "";
		}
	});

	switch (t)
	{
		case String:
			return e.evaluate(c, XPathResult.STRING_TYPE, null).stringValue;
		case Number:
			return e.evaluate(c, XPathResult.NUMBER_TYPE, null).numberValue;
		case Boolean:
			return e.evaluate(c, XPathResult.BOOLEAN_TYPE, null).booleanValue;
		case Array:
			var r = e.evaluate(c, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
			o = [];

			for ( var ai = 0 , at = r.snapshotLength ; ai < at ; ++ai )
				o.push(r.snapshotItem(ai));

			return o;
		case undefined:
			var r = e.evaluate(c, XPathResult.ANY_TYPE, null);
			switch (r.resultType)
			{
				case XPathResult.STRING_TYPE:
					return r.stringValue;
				case XPathResult.NUMBER_TYPE:
					return r.numberValue;
				case XPathResult.BOOLEAN_TYPE:
					return r.booleanValue;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
					var o = [], i;
					while (i = r.iterateNext())
						o.push(i);

					return o;
			}
			return null;
		default:
			throw(TypeError("xpath: specified type is not valid type."));
	}
};
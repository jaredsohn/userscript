// ==UserScript==
// @name           Includes : AspxPostBackRequest
// @namespace      http://gm.wesley.eti.br/includes
// @description    AspxPostBackRequest Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.0
// @language       en
// @include        nowhere
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

function AspxPostBackRequest(opts)
{
	var data = {
		"__ASYNCPOST" : "true",
		"__EVENTTARGET" : opts.eventTarget
	};
	data[opts.manager] = "|" + opts.eventTarget;
	
	for (var key in opts.data)
	data[key] = opts.data[key];

	var strdata = (function(obj)
	{
		var output = "";

		for (var key in obj)
		output += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);

		return output.substr(1);
	})(data);

	GM_xmlhttpRequest({
		"url" : opts.url,
		"method" : "post",
		"headers" : {
			"Content-Type" : "application/x-www-form-urlencoded",
			"Content-Length" : strdata.length
		},
		"data" : strdata,
		"onload" : function(xhr)
		{
			opts.callback(xhr);
		}
	});
};
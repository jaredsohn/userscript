// ==UserScript==
// @name           Includes : ShowMyCode
// @namespace      http://gm.wesley.eti.br/include
// @description    ShowMyCode Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0.3
// @language       en
// @include        nowhere
// @exclude        *
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
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

if (typeof(WinConfig) != "undefined") {
	WinConfig.loadDefaultCss();
}

ShowMyCode = function () {};

ShowMyCode.execute = function (params) {
	function x (_params) {
		HttpRequest.open({
			"method"	: "post",
			"url"		: "http://www.showmycode.com/",
			"headers"	: {
				"Referer" : "http://www.showmycode.com/",
			},
			"onsuccess"	: function (xhr) {
				for (var v in xhr) {
					_params[v] = xhr[v];
				}

				if (/Wrong captcha/i.test(xhr.response.text)) {
					_params.error = 4;

					_params.onsuccess(_params);
				} else if (/Decoding engine is died/i.test(xhr.response.text)) {
					_params.error = 2;

					_params.onsuccess(_params);
				} else {
					HttpRequest.open({
						"method"	: "get",
						"url"		: "http://www.showmycode.com/?download",
						"headers"	: {
							"Referer" : "http://www.showmycode.com/",
						},
						"onsuccess"	: function (xhr) {
							for (var v in xhr) {
								_params[v] = xhr[v];
							}

							_params.error = (xhr.response.text.length == 0?1:0);

							_params.onsuccess(_params);
						}
					}).send();
				}
			}
		}).send({
			//"MAX_FILE_SIZE" : "2097152",
			"decodingurl" : _params.url,
			"captcha" : _params.captcha,
			"showmycodebutton" : "Show My Code!"
		});
	}
	
	if (params.captcha) {
		x(params);
	} else if (typeof(WinConfig) != "undefined") {
		WinConfig.init({
			"title" : "Captcha",
			"type" : "prompt",
			"description" : "<center><img src='http://www.showmycode.com/?c' width='30' height='22' /><br /><br />Enter the code from the image above</center>",
			"positiveCallback" : function(w, e) {
				w.FadeOut(0);
				
				params.captcha = e.form.elements.namedItem("text").value.toUpperCase();
				
				x(params);
			}
		}).Open().FadeIn();
	} else {
		throw "Missing parameter 'captcha'";
	}
};
// ==UserScript==
// @name           Includes : Notify
// @namespace      http://gm.wesley.eti.br
// @description    Notify Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2014+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.7
// @language       en
// @include        /userscripts\.org\/scripts\/review\/292725$/
// @grant          GM_xmlhttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=292725
// @debug          true
// @uso:author     55607
// @uso:script     292725
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

var Notify = {
	data	: {
		subject	: "Script Error Report (##{data.id/})",
		get id () {
			return (/@uso:script\s+(\d+)/m.test(GM_info.scriptMetaStr) && RegExp.$1 || undefined);
		},
		get body () {
			return {
				time		: new Date().toString(),
				userAgent	: navigator.userAgent,
				meta		: {
					name	: GM_info.script.name,
					version	: GM_info.script.version,
				},
			};
		},
		hosts	: {
			get "userscripts.org" () {
				return {
					username	: (document.querySelector("ul.login_status a[href ~= '/home']") || {}).textContent,
				};
			},
		},
	},
	services	: [{
		action	: (/@homepage\s+(.+)/.test(GM_info.scriptMetaStr) && (RegExp.$1 + "/contact.php") || null),
	}, {
		action	: "//userscripts.org/messages",
		subject	: "message[subject]",
		body	: "message[body]",
		get params () {
			return {
				"message[user_id]"	: (/@(?:uso:)?author\s+(?:.+?[\/ ])?(\d+)$/m.test(GM_info.scriptMetaStr) && RegExp.$1 || null),
				authenticity_token	: unsafeWindow.auth_token || (/var auth_token = "([\w+=])"/.test(GM_xmlhttpRequest({
					method		: "get",
					url			: "//userscripts.org/messages",
					synchronous	: true,
				}).responseText) && RegExp.$1 || null),
			};
		},
		process	: function (value) {
			return "<pre>" + value + "</pre>";
		},
		test	: function (t) {
			return t["message[user_id]"] && t.authenticity_token;
		},
	}],
	reports	: [],
	execute		: function (cb, ow) {
		try {
			cb();
		} catch (e) {
			console.error("%s: %s", e.name, e.message);
			console.log(e);
			this.reports.push({
				name		: e.name,
				message		: e.message,
				text		: e.toString(),
				fileName	: e.fileName && e.fileName.replace(/^.+?\/gm_scripts/, ""),
				lineNumber	: e.lineNumber || e.line,
			});

			var id,
			merge = function (obj, k, l) {
				if (l && k in l) {
					var ll = l[k];
					for (var kk in ll) {
						obj[kk] = ll[kk];
					}
				}
			};
			if (!ow || !(id = this.data.id) || id == ow.id) {
				var b = this.data.body;
				merge(b, location.host, this.data.hosts);
				merge(b, "body", ow);
				b.reports = this.reports;
				b = JSON.stringify(b, null, "\t");

				(function recursive (index, p) {
					if (index < p.services.length) {
						var s = p.services[index],
						data = s.params || {};
						data[s.body || "body"] = (s.process?s.process(b):b);

						if (s.action && (!s.test || s.test(data))) {
							data[s.subject || "subject"] = ow && ow.subject || p.data.subject.replace(/#{(\w+(?:\.\w+)*)\/}/g, function ($0, $1) {
								return (function r (p2, v) {
									if (v.length) {
										return r(p2[v.shift()], v);
									} else {
										return p2;
									}
								}(p, $1.split(".")));
							});

							var dataStr = "",
							proc = function (xhr) {
								if (/^2/.test(xhr.status)) {
									console.info("Report was sent successfully.");
								} else {
									recursive(++index, p);
								}
							};
							for (var k in data) {
								dataStr += "&" + k + "=" + encodeURIComponent(data[k]);
							}

							GM_xmlhttpRequest({
								method	: s.method || "post",
								url		: s.action,
								headers	: {
									"Content-Type"	: "application/x-www-form-urlencoded",
								},
								//redirectionLimit : 0,
								data	: dataStr.substr(1),
								onload	: proc,
								onerror	: proc,
							});
						}
					} else {
						alert("An error has occurred. Consider reporting the following text to the administrator:\n\n" + b);
					}
				}(0, this));
			}
		}
	},
};

Notify.execute.bind(Notify);
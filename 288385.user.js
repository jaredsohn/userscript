// ==UserScript==
// @name           Includes : Assert
// @namespace      http://gm.wesley.eti.br
// @description    Assert Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2014+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.3
// @language       en
// @include        /userscripts\.org\/scripts\/review\/288385$/
// @grant          GM_xmlhttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=288385
// @require        /scripts/source/292725.user.js
// @debug          true
// @uso:author     55607
// @uso:script     288385
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

function AssertException (message) {
	this.name = "AssertException";
	this.message = message;
}

var Assert = {
	skipTest	: !(/@debug\s+(?:true|TRUE)$/m.test(GM_info.scriptMetaStr)),
	execute		: function (c) {
		if (!this.skipTest) {
			var output = new function () {
				var passed = 0,
				total = 0;
				instance = new c(),
				events = {},
				catchException = function (cb, label) {
					label && console.time(label);
					try {
						cb();
					} catch (e) {
						this.exception = {
							name		: e.name,
							message		: e.message,
							text		: e.toString(),
							filename	: e.fileName && e.fileName.replace(/^.+?\/gm_scripts/, ""),
							lineNumber	: e.lineNumber || e.line,
						};

						if (e instanceof AssertException) {
							this.error = -1;	// failure
						} else {
							this.error = 1;	// error

							console.error("%s: %s", e.name || "Error", e.message || e);
							console.dir(e);
						}
					}
					label && console.timeEnd(label);
				};

				this.name = c.name;
				this.error = 0;
				this.methods = [];

				for each (var e in ["beforeClass", "before", "after", "afterClass"]) {
					events[e] = instance[e] && instance[e].bind(instance) || function () {};
				}

				console.groupCollapsed(this.name);
				catchException.apply(this, [events.beforeClass, "Time (BeforeClass)"]);
				console.time("Total");

				for (var n in instance) {
					if (/^test/.test(n)) {
						++total;

						this.methods.push(new function (p) {
							this.name = n;
							this.error = 0;	// pass

							console.group(n);
							catchException.apply(this, [events.before]);
							catchException.apply(this, [function () {
								instance[n].bind(instance)();

								++passed;
							}, "Time"]);
							catchException.apply(this, [events.after]);
							console.groupEnd(n);
							
							if (!p.error || !~p.error) {	// 0 || -1
								p.error = this.error;
							}
						}(this));
					}
				}
				console.timeEnd("Total");
				catchException.apply(this, [events.afterClass, "Time (AfterClass)"]);

				console.log("Tests passed: %d / %d", passed, total);
				console.groupEnd(this.name);

				if (passed != total) {
					console.error("%s\t: %d errors", this.name, total - passed);
				}
			};

			if (output.error) {
				var o = JSON.parse(JSON.stringify(output));
				o.methods = o.methods.filter(function (a) {
					var f = a.error;
					delete a.error;
					return f;
				});
				delete o.error;

				Notify.execute(function () {
					throw new AssertException(o);
				});
			}

			return output;
		}
	},
};

Assert.execute.bind(Assert);

(function () {
	var assert = function (result, expected, actual, message) {
		message = (message?message + "\n\n":"") + "Expected: " + expected + ", Actual: " + actual;

		console.assert(result, message);

		if (!result) {
			throw new AssertException(message);
		}
	},
	asserts = {
		fail		: function (message) {
			console.error("Fail: " + message);
			throw new AssertException(message);
		},
		assertEquals: function (expected, actual, message) {
			assert(expected == actual, expected, actual, message);
		},
		assertFalse : function (actual, message) {
			assertEquals(false, actual, message);
		},
		assertTrue : function (actual, message) {
			assertEquals(true, actual, message);
		},
		assertNull : function (actual, message) {
			assertEquals(null, actual, message);
		},
	};

	for (var n in asserts) {
		window[n] = Assert[n] = asserts[n];
	}
}());

Assert.execute(function AssertTest () {
	this.beforeClass = function () {
		this.temp0 = 1;
	};

	this.before = function () {
		this.temp1 = 2;
	};

	this.after = function () {
		this.temp1 = 3;
	};

	this.afterClass = function () {
		assertEquals(3, this.temp1);

		this.temp0 = 4;
	};

	this.testAssertEqualsExists = function () {
		assertEquals(Assert.assertEquals.toSource(), assertEquals.toSource());
	};

	this.testTestIsEnabled = function () {
		assertFalse(Assert.skipTest);
	};

	this.testBeforeClassWorks = function () {
		assertEquals(1, this.temp0);
	};

	this.testBeforeWorks = function () {
		assertEquals(2, this.temp1);
	};
});
// ==UserScript==
// @name           Includes : Queued Events
// @namespace      http://gm.wesley.eti.br
// @description    Queued Events Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// @version        1.0.0.1
// @include        nowhere
// @exclude        *
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
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

QueuedEvent = function (fn, params, wait) {
	this.wait = wait;

	this.execute = function (last) {
		this.last = last;
		return this.proceed.apply(this, [this.result = fn.apply(this, [].concat(params))]);
	};

	this.proceed = function (result) {
		return true;
	};

	this.halt = function () {};
};

QueuedList = function (wait) {
	var _wait = wait || [500, 500],
	_running = 0,
	_list = [];

	this.add = function (obj) {
		if (obj instanceof Array) {
			var r = {};
			QueuedEvent.apply(r, obj);
			obj = r;
		} else if (!(obj instanceof QueuedEvent)) {
			throw "Wrong type of the parameter";
		}

		_list.push(obj);

		return obj;
	}

	this.run = function (obj) {
		if (obj) {
			this.add.apply(this, Array.prototype.slice.apply(arguments));
		}

		if (!_running && (1 == _list.length || !obj)) {
			_running = 1;

			var _this = this;
			(function _recursive (last) {
				if (_running) {
					if (_list.length) {
						_running = ~~_list[0].execute(last) >> 0;

						if (!~_running) {	// == -1
							_this.halt();
						} else if (_running) {
							var w = _list[0].wait || _wait;
							window.setTimeout(function () {
								_recursive(_list.shift());
							}, (w[0]||0) + Math.ceil((w[1]||0) * Math.random()));
						}
					} else {
						_running = 0;
						_this.end.apply(_this, []);
					}
				}
			}());
		}
	};

	this.halt = function () {
		_running = 0;

		if (this.list.length) {
			this.list[0].halt();
		}
	};

	this.end = function () {};
};

GM_log("Loaded 'Includes : Queued Events'");

/*var x = new QueuedList([1000, 0]),
c = function (b) {
	alert("Current : " + b + (this.last?"\nPrevious : " + this.last.result:""));

	return b;
}, b;

for each (var y in ["1", "2", "3", "4", "5"].sort(function () {return Math.floor(3 * Math.random()) - 1})) {
	x.add([c, [y]]);
}

x.run();*/
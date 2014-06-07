// ==UserScript==
// @name           Includes : Timer
// @namespace      http://gm.wesley.eti.br/includes
// @description    Timer Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.1
// @language       en
// @include        nowhere
// @exclude        *
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

Timer = function (obj) {
	var curr = new Date();
	
	this._target = obj.target || curr;
	this._hour = !obj.target || Math.abs(this._target - curr) >= 3600000;
	this._type = (/^[0-2]$/.test(obj.type) ? obj.type : Timer.type[this._target > curr ? "FUTURE" : "PAST"]);
	this._ival = (/^[0-2]$/.test(obj.interval) ? obj.interval : 2);

	this.current = function (bdiff) {
		var diff = new Date() - this._target,
		abs_diff = Math.abs(diff),
		intervals = [604800000, 86400000, 3600000, 60000, 1000].slice(this._ival),	// week, day, hour, minute, second
		output = [diff <= 0];	// is_future
		
		if (bdiff === true) {
			return -diff;
		}
		
		if (!this._hour) {
			intervals.shift();
			output.push(0);
		}
		
		for (var i in intervals) {
			var c = Math.floor(abs_diff / intervals[i]);
			abs_diff -= c * intervals[i];
			output.push(c);
		}
		
		output.push(abs_diff);
		
		return output;
	};

	this.toString = function (str) {
		var output = this.current(),
		test_cond = [
			function (is_future) {
				return !is_future && this._type == Timer.type.FUTURE || is_future && this._type == Timer.type.PAST;
			}
		],
		t = this;
		
		if (!str || str === true) {
			str = "{0?-}" + (this._hour ? "{1:2}:" : "") + "{2:2}:{3:2}" + (str ? ".{4:3}" : "");
		}

		return str.replace(/\{(\d+)(?:([?:])([^:]+?)?(?::(.+?))?)?\}/g, function ($0, $1, $2, $3, $4) {
			//alert(Array.prototype.slice.apply(arguments).join("\n"));
			if ($2 == "?") {	// bool & plural
				return ($1 in test_cond && test_cond[$1].call(t, output[$1]) || output[$1] > 1 ? $3 : $4);
			} else if (output[$1].toString().length < $3) {	// padding
				return ("000" + output[$1]).substr(-$3);
			} else if ($4) {
				return $4;
			} else {
				return output[$1];
			}
		});
	};
};

Timer.type = {
	AUTO	: 0,
	FUTURE	: 1,
	PAST	: 2,
};

Timer.convert = function (obj) {
	if (/(-)?\s?(\d+):(\d+):(\d+)(?:\.(\d+))?/.test(obj.value || obj)) {
		var curr = new Date(),
		interval = new Date();

		interval.setHours(RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5);
		curr.setHours(0, 0, 0, 0);
		interval -= curr.valueOf();
		
		return new Timer({
			target	: new Date().valueOf() - interval * (RegExp.$1 ? 1 : -1),
			type	: /^[0-2]$/.test(obj.type) ? obj.type : Timer.type.FUTURE,
		});
	} else {
		return new Timer({
			target	: Date.parse(obj.value),
			type	: obj.type,
		});
	}
};
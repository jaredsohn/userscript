// ==UserScript==
// @name          esl.eu - SteamID Linker
// @namespace     http://sm00th.it/
// @description   Linking SteamIDs to get more information about it.
// @include       http://*.esl.eu/*player/gameaccounts/*
// @include       http://*.esl.eu/*team/members/*
// @version       0.1.4
// ==/UserScript==

// Referals:
// Original Idea from http://userscripts.org/scripts/show/40113
// BigNumber form http://jsfromhell.com/classes/bignumber

/* BigNumber */
BigNumber = function (n, p, r) {var o = this, i;if (n instanceof BigNumber) {for (i in {precision: 0, roundType: 0, _sign: 0, _dec: 0}) {o[i] = n[i];}o._buffer = n._buffer.slice();return;}o.precision = isNaN(p = Math.abs(p)) ? BigNumber.defaultPrecision : p;o.roundType = isNaN(r = Math.abs(r)) ? BigNumber.defaultRoundType : r;o._sign = (n += "").charAt(0) == "-";o._dec = ((n = n.replace(/[^\d.]/g, "").split(".", 2))[0] = n[0].replace(/^0+/, "") || "0").length;for (i = (n = o._buffer = (n.join("") || "0").split("")).length; i; n[--i] = + n[i]) {}o.round();};
with ({$: BigNumber, o: BigNumber.prototype}) {
	$.ROUND_HALF_EVEN = ($.ROUND_HALF_DOWN = ($.ROUND_HALF_UP = ($.ROUND_FLOOR = ($.ROUND_CEIL = ($.ROUND_DOWN = ($.ROUND_UP = 0) + 1) + 1) + 1) + 1) + 1) + 1;
	$.defaultPrecision = 40;
	$.defaultRoundType = $.ROUND_HALF_UP;
	o.add = function (n) {if (this._sign != (n = new BigNumber(n))._sign) {return n._sign ^= 1, this.subtract(n);}var o = new BigNumber(this), a = o._buffer, b = n._buffer, la = o._dec, lb = n._dec, n = Math.max(la, lb), i, r;la != lb && ((lb = la - lb) > 0 ? o._zeroes(b, lb, 1) : o._zeroes(a, - lb, 1));i = (la = a.length) == (lb = b.length) ? a.length : ((lb = la - lb) > 0 ? o._zeroes(b, lb) : o._zeroes(a, - lb)).length;for (r = 0; i; r = (a[--i] = a[i] + b[i] + r) / 10 >>> 0, a[i] %= 10) {}return r && ++n && a.unshift(r), o._dec = n, o.round();};
	o.subtract = function (n) {if (this._sign != (n = new BigNumber(n))._sign) {return n._sign ^= 1, this.add(n);}var o = new BigNumber(this), c = o.abs().compare(n.abs()) + 1, a = c ? o : n, b = c ? n : o, la = a._dec, lb = b._dec, d = la, i, j;a = a._buffer, b = b._buffer, la != lb && ((lb = la - lb) > 0 ? o._zeroes(b, lb, 1) : o._zeroes(a, - lb, 1));for (i = (la = a.length) == (lb = b.length) ? a.length : ((lb = la - lb) > 0 ? o._zeroes(b, lb) : o._zeroes(a, - lb)).length; i;) {if (a[--i] < b[i]) {for (j = i; j && !a[--j]; a[j] = 9) {}--a[j], a[i] += 10;}b[i] = a[i] - b[i];}return c || (o._sign = n._sign), o._dec = d, o._buffer = b, o.round();};
	o.multiply = function (n) {var o = new BigNumber(this), r = o._buffer.length >= (n = new BigNumber(n))._buffer.length, a = (r ? o : n)._buffer, b = (r ? n : o)._buffer, la = a.length, lb = b.length, x = new BigNumber, i, j, s;for (i = lb; i; r && s.unshift(r), x.set(x.add(new BigNumber(s.join(""))))) {for (s = (new Array(lb - --i)).join("0").split(""), r = 0, j = la; j; r += a[--j] * b[i], s.unshift(r % 10), r = (r / 10) >>> 0) {}}return o._dec = ((r = la + lb - o._dec - n._dec) >= (j = (o._buffer = x._buffer).length) ? this._zeroes(o._buffer, r - j + 1, 1).length : j) - r, o.round();};
	o.divide = function (n) {if ((n = new BigNumber(n)) == "0") {throw new Error("Division by 0");} else if (this == "0") {return new BigNumber;}var o = new BigNumber(this), a = o._buffer, b = n._buffer, la = a.length - o._dec, lb = b.length - n._dec, r = new BigNumber, i = 0, j, s, last;r._sign = o._sign != n._sign, r.precision = Math.max(o.precision, n.precision), r._dec = + r._buffer.pop(), la != lb && o._zeroes(la > lb ? b : a, Math.abs(la - lb));n._dec = b.length, b = n, b._sign = false, b = b.round();for (n = new BigNumber; a[0] == "0"; a.shift()) {}out:do {for (n == "0" && (n._buffer = [], n._dec = 0), last = 0; i < a.length && n.compare(b) == -1; ++i) {if (last = i + 1 == a.length, n == "0" && a[i] == "0") {if (r._dec == r._buffer.length && ++r._dec, r._buffer.push(0), last) {break out;}} else if (n._buffer.push(a[i]), ++n._dec, last && n.compare(b) == -1 && (r._dec == r._buffer.length && ++r._dec, 1) || (last = 0)) {do {r._buffer.push(0), n._buffer.push(0), ++n._dec;} while (n.compare(b) == -1);}}if (n.compare(b) == -1 && !(last = 0)) {do {last ? r._buffer.push(0) : (last = 1), n._buffer.push(0), ++n._dec;} while (n.compare(b) == -1);}for (s = new BigNumber, j = 0; n.compare(y = s.add(b)) + 1 && ++j; s.set(y)) {}n.set(n.subtract(s)), !last && r._dec == r._buffer.length && ++r._dec, r._buffer.push(j);} while ((i < a.length || n != "0") && (r._buffer.length - r._dec) <= r.precision);return r.round();};
	o.mod = function (n) {return this.subtract(this.divide(n).intPart().multiply(n));};
	o.pow = function (n) {var o = new BigNumber(this), i;if ((n = (new BigNumber(n)).intPart()) == 0) {return o.set(1);}for (i = Math.abs(n); --i; o.set(o.multiply(this))) {}return n < 0 ? o.set((new BigNumber(1)).divide(o)) : o;};
	o.set = function (n) {return this.constructor(n), this;};
	o.compare = function (n) {var a = this, la = this._dec, b = new BigNumber(n), lb = b._dec, r = [-1, 1], i, l;if (a._sign != b._sign) {return a._sign ? -1 : 1;}if (la != lb) {return r[(la > lb) ^ a._sign];}for (la = (a = a._buffer).length, lb = (b = b._buffer).length, i = -1, l = Math.min(la, lb); ++i < l;) {if (a[i] != b[i]) {return r[(a[i] > b[i]) ^ a._sign];}}return la != lb ? r[(la > lb) ^ a._sign] : 0;};
	o.negate = function () {var n = new BigNumber(this);return n._sign ^= 1, n;};
	o.abs = function () {var n = new BigNumber(this);return n._sign = 0, n;};
	o.intPart = function () {return new BigNumber((this._sign ? "-" : "") + (this._buffer.slice(0, this._dec).join("") || "0"));};
	o.valueOf = o.toString = function () {var o = this;return (o._sign ? "-" : "") + (o._buffer.slice(0, o._dec).join("") || "0") + (o._dec != o._buffer.length ? "." + o._buffer.slice(o._dec).join("") : "");};
	o._zeroes = function (n, l, t) {var s = ["push", "unshift"][t || 0];for (++l; --l; n[s](0)) {}return n;};
	o.round = function () {if ("_rounding" in this) {return this;}var $ = BigNumber, r = this.roundType, b = this._buffer, d, p, n, x;for (this._rounding = true; this._dec > 1 && !b[0]; --this._dec, b.shift()) {}for (d = this._dec, p = this.precision + d, n = b[p]; b.length > d && !b[b.length - 1]; b.pop()) {}x = (this._sign ? "-" : "") + (p - d ? "0." + this._zeroes([], p - d - 1).join("") : "") + 1;if (b.length > p) {n && (r == $.DOWN ? false : r == $.UP ? true : r == $.CEIL ? !this._sign : r == $.FLOOR ? this._sign : r == $.HALF_UP ? n >= 5 : r == $.HALF_DOWN ? n > 5 : r == $.HALF_EVEN ? n >= 5 && b[p - 1] & 1 : false) && this.add(x);b.splice(p, b.length - p);}return delete this._rounding, this;};
}

if (unsafeWindow.console) {
	var GM_log = unsafeWindow.console.log;
}

/* main routine */
var converted_ids = "";
var document_html = document.body.innerHTML;
var all_steam_ids = new String(document.body.innerHTML.match(/[0-9]:[0-9]:[0-9]+/gi));
var start_pos = end_pos = count = 0;
var steam_id, parsed_id, authSrv;
if (all_steam_ids.search(",") == -1) {
	steam_id = all_steam_ids;
	parsed_id = steam_id.substring(steam_id.lastIndexOf(":") + 1);
	document.body.innerHTML = document.body.innerHTML.replace(steam_id, "<a href=\"http://steamcommunity.com/profiles/" + convertSteamId(parsed_id) + "\">" + steam_id + "<a>");
} else {
	while (end_pos != -1) {
		end_pos = all_steam_ids.indexOf(",", start_pos);
		if (end_pos == -1) {
			steam_id = all_steam_ids.substring(start_pos, all_steam_ids.length);
		} else {
			steam_id = all_steam_ids.substring(start_pos, end_pos);
		}
		parsed_id = steam_id.substring(steam_id.lastIndexOf(":") + 1);
		authSrv = steam_id.substring(steam_id.indexOf(":") + 1, steam_id.lastIndexOf(":"));
		if (converted_ids.search(steam_id) != -1) {
			start_pos = end_pos + 1;
			continue;
		}
		document_html = replaceAll(document_html, steam_id, "<a href=\"http://steamcommunity.com/profiles/" + convertSteamId(parsed_id, authSrv) + "\" target=\"_blank\">" + steam_id + "</a>");
		converted_ids += steam_id;
	}
	document.body.innerHTML = document_html;
}

/* SteamID -> SCID */
function convertSteamId(steamID, authSrv) {
	if (authSrv == 1) {
		return (new BigNumber((steamID * 2) + 1)).add("76561197960265728");
	} else {
		return (new BigNumber(steamID * 2)).add("76561197960265728");
	}
}

/* Replace SteamIDs with SCID function */
function replaceAll(textToSearch, strTarget, strSubString) {
	var intIndexOfMatch = textToSearch.indexOf(strTarget);
	var temp_text, final_text = "";
	var start_pos = 0;
	while (intIndexOfMatch != -1) {
		temp_text = textToSearch.substring(start_pos, intIndexOfMatch + strTarget.length);
		temp_text = temp_text.replace(strTarget, strSubString);
		final_text += temp_text;
		start_pos = intIndexOfMatch + strTarget.length;
		intIndexOfMatch = textToSearch.indexOf(strTarget, intIndexOfMatch + strSubString.length);
	}
	final_text += textToSearch.substr(start_pos);
	return final_text;
}
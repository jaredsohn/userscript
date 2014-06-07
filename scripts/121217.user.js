// ==UserScript==
// @name        MusicBrainz: Paste-A-Date!
// @description This script adds a field after the existing date fields where you can paste a date and it will try to parse it.
// @version     2014-04-12
// @author      -
// @namespace   http://userscripts.org/users/41307
//
// @include     *://musicbrainz.org/*
// @include     *://beta.musicbrainz.org/*
// @include     *://test.musicbrainz.org/*
// ==/UserScript==
//**************************************************************************//

var nikkis_messy_date_extractor;

function init_paste_a_date() {

/* Javascript sucks! */
Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++) {
		for(var x = 0, y = r.length; x < y; x++) {
			if(r[x]==this[i])
				continue o;
		}
		r[r.length] = this[i];
	}
	return r;
}
/* End of workaround because Javascript sucks! */

nikkis_messy_date_extractor = function (str) {
	// replace fullwidth digits
	str = str.replace(/[０-９]/g, function(a){ return String.fromCharCode(a.charCodeAt(0)-("０".charCodeAt(0)-"0".charCodeAt(0))); });

	// RoC year numbering - http://en.wikipedia.org/wiki/Minguo_calendar
	str = str.replace(/民國([0-9]{1,3})/, function(a, year){ return parseInt(year)+1911; });
	// Japanese eras - http://en.wikipedia.org/wiki/Japanese_era_name
	str = str.replace(/(明治|大正|昭和|平成)元(年)/, "$1"+"1$2");
	str = str.replace(/(明治|M)([0-9]{1,2})/, function(a, b, year){ return parseInt(year)+1867; });
	str = str.replace(/(大正|T)([0-9]{1,2})/, function(a, b, year){ return parseInt(year)+1911; });
	str = str.replace(/(昭和|S)([0-9]{1,2})/, function(a, b, year){ return parseInt(year)+1925; });
	str = str.replace(/(平成|H)([0-9]{1,2})/, function(a, b, year){ return parseInt(year)+1988; });

	// Japanese letters for years on older releases - https://wiki.musicbrainz.org/User:Nikki/Japanese_stuff
	var jp_years = Array();
	jp_years["N"] = "1984";
	jp_years["I"] = "1985";
	jp_years["H"] = "1986";
	jp_years["O"] = "1987";
	jp_years["R"] = "1988";
	jp_years["E"] = "1989";
	jp_years["C"] = "1990";
	jp_years["D"] = "1991";
	jp_years["K"] = "1992";
	str = str.replace(/([NIHORECDK])-([0-9]{1,2}-[0-9]{1,2})/, function(a, year, date){ return jp_years[year] + "-" + date; });

	// Ordinal numbers
	str = str.replace(/\b([0-9]{1,2})(st|nd|rd|th)\b/, "$1");
	// Spanish months
	str = str.replace(/ de ([a-z]+) del? /i, " $1 ");

	var cjk = /^\W*([0-9]{2}|[0-9]{4})(?:(?:\u5E74|\uB144\W?)(0?[1-9]|1[0-2])(?:(?:\u6708|\uC6D4\W?)(0?[1-9]|[12][0-9]|3[01])(?:\u65E5|\uC77C)?)?)?\W*$/;
	var ymd = /^\W*([0-9]{2}|[0-9]{4})(?:\W+(0?[1-9]|1[0-2])(?:\W+(0?[1-9]|[12][0-9]|3[01]))?)?\W*$/;
	var dmy = /^\W*(?:(0?[1-9]|[12][0-9]|3[01])\W+)?(0?[1-9]|1[0-2])\W+([0-9]{2}|[0-9]{4})\W*$/;
	var mdy = /^\W*(0?[1-9]|1[0-2])\W+(0?[1-9]|[12][0-9]|3[01])\W+((?:1[89]|20)?[0-9]{2})\W*$/;
	var dmy_text = /^\W*(?:(0?[1-9]|[12][0-9]|3[01])\W+)?([\wÀ-ÖØ-öø-ÿ ]+)\W+([0-9]{2}|[0-9]{4})\W*$/;
	var ymd_text = /^\W*([0-9]{2}|[0-9]{4})\W+([\wÀ-ÖØ-öø-ÿ ]+)(?:\W+(0?[1-9]|[12][0-9]|3[01]))?\W*$/;
	var mdy_text = /^\W*([\wÀ-ÖØ-öø-ÿ]+)\W+(0?[1-9]|[12][0-9]|3[01])\W+([0-9]{2}|[0-9]{4})\W*$/;

	var dates = Array();

	if (cjk.test(str)) {
		var matches = ymd.exec(str);
		var newdate = clean_date(matches[1], matches[2], matches[3]);
		if (newdate) dates.push(newdate);
		return dates; // We know there's only one match and since JS's Unicode support is lacking, continuing will cause false matches
	}

	if (ymd.test(str)) {
		var matches = ymd.exec(str);
		var newdate = clean_date(matches[1], matches[2], matches[3]);
		if (newdate) dates.push(newdate);
	}
	if (dmy.test(str)) {
		var matches = dmy.exec(str);
		if (matches[3] > 2484) matches[3] = matches[3] - 543; // Thai years
		var newdate = clean_date(matches[3], matches[2], matches[1]);
		if (newdate) dates.push(newdate);

	}
	if (mdy.test(str)) {
		var matches = mdy.exec(str);
		var newdate = clean_date(matches[3], matches[1], matches[2])
		if (newdate) dates.push(newdate);
	}
	if (dmy_text.test(str)) {
		var matches = dmy_text.exec(str);
		var month = get_month(matches[2]);
		var newdate = clean_date(matches[3], month, matches[1]);
		if (newdate && month) dates.push(newdate);

	}
	if (ymd_text.test(str)) {
		var matches = ymd_text.exec(str);
		var month = get_month(matches[2]);
		var newdate = clean_date(matches[1], month, matches[3]);
		if (newdate && month) dates.push(newdate);

	}
	if (mdy_text.test(str)) {
		var matches = mdy_text.exec(str);
		var month = get_month(matches[1]);
		var newdate = clean_date(matches[3], month, matches[2]);
		if (newdate && month) dates.push(newdate);

	}

	return dates;
}

function clean_date(y, m, d) {
	if (y.length == 2) y = (y > 20) ? "19"+y : "20"+y;
	if (m && m.length == 1) m = "0"+m;
	if (d && d.length == 1) d = "0"+d;

	if (d == 29 && m == 2 && y%4 != 0 && y%400 != 0) return false;
	if (d == 30 && m == 2) return false;
	if (d == 31 && (m == 2 || m == 4 || m == 6 || m == 9 || m == 11)) return false;

	var newdate = [ y ];
	if (m) newdate.push(m);
	if (d) newdate.push(d);

	return newdate.join("-");
}

function get_date(input) {
	var div = input.date_display;
	var str = input.value;
	var dates = nikkis_messy_date_extractor(str).sort().unique();

	if (str.length < 1) {
		div.style.borderColor = 'white';
		div.style.backgroundColor = 'white';
		div.innerHTML = "";
		div.style.display = 'inline';
	} else if (dates.length == 1) {
		set_date(input, dates[0].split('-')[0], dates[0].split('-')[1], dates[0].split('-')[2]);

		div.style.borderColor = 'green';
		div.style.backgroundColor = '#CDFFBD';
		div.innerHTML = "✓";
		div.style.display = 'inline';
	} else if (dates.length > 1) {
		div.style.borderColor = 'yellow';
		div.style.backgroundColor = '#FFEEBD';
		div.style.display = 'block';
		div.innerHTML = "multiple possibilities:";
		for (var j = 0; j < dates.length; j++) {
			div.appendChild( document.createElement("br"));
			var a = document.createElement("a");
			a.innerHTML = dates[j];
			a.style.cursor = "pointer";
			a.addEventListener("click", (function(i,j,k,l) { return function(){ set_date(i,j,k,l); }})(input, dates[j].split('-')[0], dates[j].split('-')[1], dates[j].split('-')[2]), false);
			div.appendChild(a, div);
		}
	} else {
		div.style.borderColor = 'red';
		div.style.backgroundColor = '#FFBDCD';
		div.innerHTML = "✗";
		div.style.display = 'inline';
	}
}

function trigger_event(name, element) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(name, false, true);
    element.dispatchEvent(event);
}

function set_date(input, year, month, day) {
    var e = input.parentNode.getElementsByTagName("input");
    e[0].value = year ? year : "";
    trigger_event('change', e[0]);
    e[1].value = month ? month : "";
    trigger_event('change', e[1]);
    e[2].value = day ? day : "";
    trigger_event('change', e[2]);
}

function get_month (str) {
	var months = Array();

	months["january"] = "1";
	months["jan"] = "1";
	months["janv"] = "1";
	months["januari"] = "1";
	months["janeiro"] = "1";
	months["januar"] = "1";
	months["janvier"] = "1";
	months["enero"] = "1";

	months["february"] = "2";
	months["feb"] = "2";
	months["févr"] = "2";
	months["februari"] = "2";
	months["fevereiro"] = "2";
	months["februar"] = "2";
	months["février"] = "2";
	months["febrero"] = "2";

	months["march"] = "3";
	months["mar"] = "3";
	months["mars"] = "3";
	months["março"] = "3";
	months["märz"] = "3";
	months["marzo"] = "3";
	months["marts"] = "3";

	months["april"] = "4";
	months["apr"] = "4";
	months["avr"] = "4";
	months["abril"] = "4";
	months["avril"] = "4";

	months["may"] = "5";
	months["mai"] = "5";
	months["maj"] = "5";
	months["maio"] = "5";
	months["mayo"] = "5";

	months["june"] = "6";
	months["jun"] = "6";
	months["juin"] = "6";
	months["juni"] = "6";
	months["junho"] = "6";
	months["junio"] = "6";

	months["july"] = "7";
	months["jul"] = "7";
	months["juil"] = "7";
	months["juli"] = "7";
	months["julho"] = "7";
	months["julio"] = "7";

	months["august"] = "8";
	months["aug"] = "8";
	months["août"] = "8";
	months["augusti"] = "8";
	months["agosto"] = "8";

	months["september"] = "9";
	months["sep"] = "9";
	months["sept"] = "9";
	months["setembro"] = "9";
	months["septembre"] = "9";
	months["septiembre"] = "9";

	months["october"] = "10";
	months["oct"] = "10";
	months["oktober"] = "10";
	months["outubro"] = "10";
	months["octobre"] = "10";
	months["octubre"] = "10";

	months["november"] = "11";
	months["nov"] = "11";
	months["novembro"] = "11";
	months["novembre"] = "11";
	months["noviembre"] = "11";

	months["december"] = "12";
	months["dec"] = "12";
	months["déc"] = "12";
	months["dezembro"] = "12";
	months["dezember"] = "12";
	months["décembre"] = "12";
	months["diciembre"] = "12";

	// roman numerals
	months["i"] = "1";
	months["ii"] = "2";
	months["iii"] = "3";
	months["iv"] = "4";
	months["v"] = "5";
	months["vi"] = "6";
	months["vii"] = "7";
	months["viii"] = "8";
	months["ix"] = "9";
	months["x"] = "10";
	months["xi"] = "11";
	months["xii"] = "12";

	if (months[str.toLowerCase()])
		return months[str.toLowerCase()];
	return 0;
}

$("body").on("input", "input.paste-a-date", function (event) {
	get_date(event.target);
});

function add_input(container) {
	var input = container.appendChild(document.createElement("input"));
	input.setAttribute("type", "text");
	input.setAttribute("size", "12");
	input.style.marginLeft = "4px";
	input.className = "paste-a-date";
	return input;
}

function add_display(container) {
	var div = container.appendChild(document.createElement("div"));
	div.style.border = "1px solid white";
	return div;
}

if (document.location.pathname.match(/^\/release\/(.+\/edit|add)(\?.+)?$/)) {
	MB.releaseEditor.utils.withRelease(function (release) {
		_(release.events()).each(function (event) {
			if (event.paste_a_date) return;

			_.defer(function () {
				var $span = $(event.bubbleControlInformation).parents("span.partial-date");
				$span.append("<br>");
				var input = add_input($span[0]);
				input.style.marginLeft = "0";
				input.date_display = add_display($span[0]);
			});

			event.paste_a_date = true;
		});
	});
}
else if (document.location.pathname.match(/^\/release\/.+\/edit-relationships$/)) {
	MB.utility.computedWith(function (dialog) {
		dialog.relationship();

		_.defer(function () {
			$("td.partial-date", dialog.widget.element).each(function () {
				if (this.paste_a_date) return;

				add_input(this).date_display = add_display(this);

				this.paste_a_date = true;
			});
		});
	}, MB.RelationshipEditor.releaseViewModel.activeDialog);
}
else {
	$("span.partial-date").each(function () {
		this.style.display = "block";
		add_input(this).date_display = add_display(this);
	});
}

}

var scr = document.createElement("script");
scr.textContent = "(" + init_paste_a_date + ")();";
document.body.appendChild(scr);

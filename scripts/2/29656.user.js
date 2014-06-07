// ==UserScript==
// @name           Plurk Time Machine
// @namespace      http://plurk.com/
// @description    Go back to the past timeline
// @include        http://*plurk.com/user/*
// @author         YungSang
// @version        0.3
// ==/UserScript==
// v0.1 : 2008.07.05 : First Release
// v0.2 : 2008.07.18 : Patched, because Plurk removed the DisplayOptions.onSelectDate
// v0.3 : 2008.07.26 : Optimized @include

(function (window) {
	var org_DisplayOptions_show = window.DisplayOptions.show;
	window.DisplayOptions.show = function() {
		org_DisplayOptions_show.call(window.DisplayOptions);

		var hash = location.hash.substring(1);
		if (hash) {
			var _date = hash.split('/');
			if (isNaN(_date[0])) return;
			var now = new Date();
			var year = (_date[0]) ? _date[0] : now.getFullYear();
			var month = (!isNaN(_date[1]) && _date[1]) ? _date[1] : now.getMonth() + 1;
			var day   = (!isNaN(_date[2]) && _date[2]) ? _date[2] : now.getDate();
//			window.DisplayOptions.onSelectDate(year, month, day);
			onSelectDate.call(this, year, month, day);
		}
	};

	function onSelectDate(year, month, day) {
		var from_date = new Date();
		from_date.setFullYear(year);
		from_date.setMonth(month - 1);
		from_date.setDate(day);
		from_date.setHours(23);
		from_date.setMinutes(59);
		from_date.setSeconds(59);
		window.TimeLine.from_date = from_date;
		this._filter(window.TimeLine.mode, window.TimeLine.user_ids || null);
		this.showChrono("date");
	}
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);
// ==UserScript==
// @name The Pirate Bay Top section sorting by date
// @namespace http://userscripts.org/users/409923
// @description Sort The Pirate Bay "Top" section torrents by upload date 
// @include        http://thepiratebay.se/top/*
// @include        http://thepiratebay.is/top/*
// @include        http://thepiratebay.sx/top/*
// @include        http://thepiratebay.ac/top/*
// @include        http://thepiratebay.pe/top/*
// @match		   http://thepiratebay.se/top/*
// @match		   http://thepiratebay.is/top/*
// @match		   http://thepiratebay.sx/top/*
// @match		   http://thepiratebay.ac/top/*
// @match		   http://thepiratebay.pe/top/*
// @Author
// ==/UserScript==

// All your GM code must be inside this function
(function(win) {
    //Only for TV shows
	if (!document.location.toString().match(/\/top\//)) return;
	
	function getDate(node) {
		var td = node.getElementsByTagName('TD')[2],
			str = (td.innerText || td.innerHTML.replace(/<[^>]+>/g, '')).replace(/&nbsp;/g, ' '),
			time = str.match(/(\d+):(\d+)/),
			date = new Date(),
			m = null,
			re = /(\d+)-(\d+)[^0-9\-]*(\d{4})/;
		
		if (str.indexOf('Today') != -1) {
			/* No need to do anything */
		} else if (m = str.match(re)) {
			date.setMonth(parseInt(m[1], 10) - 1);
			date.setDate(parseInt(m[2], 10));
			date.setFullYear(parseInt(m[3]));
		} else if (str.indexOf('Y-day') != -1) {
			date.setDate(date.getDate() - 1);
		} else {
			var d = str.match(/(\d\d)-(\d\d)/);
			date.setMonth(parseInt(d[1], 10) - 1);
			date.setDate(parseInt(d[2], 10));
		}
		
		if (time) {
			date.setHours(parseInt(time[1], 10));
			date.setMinutes(parseInt(time[2], 10));
		} else {
			date.setHours(0);
			date.setMinutes(0);
		}
		
		return date;
	}
	
	//Get all which are for today
	var tbody = win.document.getElementById('searchResult').getElementsByTagName('TBODY')[0];
	var tr = tbody.getElementsByTagName('TR');
	var arr = [];
	
	for(var i=0,ii=tr.length; i<ii; i++) {
		arr[i] = tr[i];
	}
	
	arr.sort(function (a, b) {
		var a = getDate(a),
			b = getDate(b);
		
		return +a == +b ? 0 : (+a > +b ? -1 : 1);
	});
	
	for(var i=arr.length-1; i>=0; i--) {
		tbody.insertBefore(arr[i], tbody.firstChild);
	}
    
})(typeof unsafeWindow != 'undefined' ? unsafeWindow : window);
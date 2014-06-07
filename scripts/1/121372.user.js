// ==UserScript==
// @id             whatcd-absolute-time
// @name           What.CD : Relative to Absolute Time
// @version        1.5
// @namespace      hateradio)))
// @author         hateradio
// @description    Changes the relative time format to an absolute date.
// @include        http*://*what.cd/*
// ==/UserScript==

var timeChange = {
	f : 'day month date, year (hour:min)',
	t : document.querySelectorAll('.time'),
	m : ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'],
	// m : ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'],
	d : ['Sun', 'Mon' , 'Tues' , 'Weds' , 'Thurs' , 'Fri' , 'Sat'],
	now : function(){
		var i = this.t.length, t, f;
		while(i--){
			t = this.t[i];
			f = new Date(t.title);
			t.title = t.textContent;
			t.textContent = this.s(f);
		}
	},
	s : function(date){
			var a = this.f.split(/\W/).reverse(), i = a.length, d, s = this.f;
			while(i--){
				d = a[i];
				switch(d){
					case 'date' : s = s.replace('date', date.getDate()); break;
					case 'day' : s = s.replace('day', this.d[date.getDay()]); break;
					case 'year' : s = s.replace('year', date.getFullYear()); break;
					case 'hour' : s = s.replace('hour', date.getHours()); break;
					case 'min' : s = s.replace('min', date.getMinutes()); break;
					case 'month' : s = s.replace('month', this.m[date.getMonth()]); break;
					default : break;
				}
			}
			return s;
	}
};

timeChange.now();
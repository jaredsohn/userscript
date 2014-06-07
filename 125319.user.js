// ==UserScript==
// @name	TTK_Schedule_to_iCal
// @namespace	http://mutoo.im/
// @description	厦门大学嘉庚学院课程表转iCal脚本
// @include	http://jw.xujc.cn/student/index.php?c=Default&a=Kb*&new=1*
// @include	http://jw.xujc.com/student/index.php?c=Default&a=Kb*&new=1*
// ==/UserScript==

// require Blob and FileSaver to save schedule file from web;

/* Blob.js
 * A Blob implementation.
 * 2013-06-20
 * 
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

if("function"!=typeof Blob&&"object"!=typeof Blob||"undefined"==typeof URL)if("function"!=typeof Blob&&"object"!=typeof Blob||"undefined"==typeof webkitURL)var Blob=function(e){"use strict";var t=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder||e.MSBlobBuilder||function(e){var t=function(e){return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},i=function(e,t,n){this.data=e,this.size=e.length,this.type=t,this.encoding=n},a=n.prototype,r=i.prototype,o=e.FileReaderSync,s=function(e){this.code=this[this.name=e]},l="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),c=l.length,u=e.URL||e.webkitURL||e,d=u.createObjectURL,p=u.revokeObjectURL,f=u,h=e.btoa,m=e.atob,g=e.ArrayBuffer,v=e.Uint8Array;for(i.fake=r.fake=!0;c--;)s.prototype[l[c]]=c+1;return u.createObjectURL||(f=e.URL={}),f.createObjectURL=function(e){var t,n=e.type;return null===n&&(n="application/octet-stream"),e instanceof i?(t="data:"+n,"base64"===e.encoding?t+";base64,"+e.data:"URI"===e.encoding?t+","+decodeURIComponent(e.data):h?t+";base64,"+h(e.data):t+","+encodeURIComponent(e.data)):d?d.call(u,e):void 0},f.revokeObjectURL=function(e){"data:"!==e.substring(0,5)&&p&&p.call(u,e)},a.append=function(e){var n=this.data;if(v&&(e instanceof g||e instanceof v)){for(var a="",r=new v(e),l=0,c=r.length;c>l;l++)a+=String.fromCharCode(r[l]);n.push(a)}else if("Blob"===t(e)||"File"===t(e)){if(!o)throw new s("NOT_READABLE_ERR");var u=new o;n.push(u.readAsBinaryString(e))}else e instanceof i?"base64"===e.encoding&&m?n.push(m(e.data)):"URI"===e.encoding?n.push(decodeURIComponent(e.data)):"raw"===e.encoding&&n.push(e.data):("string"!=typeof e&&(e+=""),n.push(unescape(encodeURIComponent(e))))},a.getBlob=function(e){return arguments.length||(e=null),new i(this.data.join(""),e,"raw")},a.toString=function(){return"[object BlobBuilder]"},r.slice=function(e,t,n){var a=arguments.length;return 3>a&&(n=null),new i(this.data.slice(e,a>1?t:this.data.length),n,this.encoding)},r.toString=function(){return"[object Blob]"},n}(e);return function(e,n){var i=n?n.type||"":"",a=new t;if(e)for(var r=0,o=e.length;o>r;r++)a.append(e[r]);return a.getBlob(i)}}(self);else self.URL=webkitURL;

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2013-01-23
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs=saveAs||navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(e){"use strict";var t=e.document,i=function(){return e.URL||e.webkitURL||e},a=e.URL||e.webkitURL||e,n=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o=!e.externalHost&&"download"in n,r=function(i){var a=t.createEvent("MouseEvents");a.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),i.dispatchEvent(a)},s=e.webkitRequestFileSystem,l=e.requestFileSystem||s||e.mozRequestFileSystem,c=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},d="application/octet-stream",p=0,m=[],u=function(){for(var e=m.length;e--;){var t=m[e];"string"==typeof t?a.revokeObjectURL(t):t.remove()}m.length=0},g=function(e,t,i){t=[].concat(t);for(var a=t.length;a--;){var n=e["on"+t[a]];if("function"==typeof n)try{n.call(e,i||e)}catch(o){c(o)}}},h=function(t,a){var c,u,h,f=this,v=t.type,b=!1,$=function(){var e=i().createObjectURL(t);return m.push(e),e},w=function(){g(f,"writestart progress write writeend".split(" "))},_=function(){(b||!c)&&(c=$(t)),u?u.location.href=c:window.open(c,"_blank"),f.readyState=f.DONE,w()},C=function(e){return function(){return f.readyState!==f.DONE?e.apply(this,arguments):void 0}},y={create:!0,exclusive:!1};return f.readyState=f.INIT,a||(a="download"),o?(c=$(t),n.href=c,n.download=a,r(n),f.readyState=f.DONE,w(),void 0):(e.chrome&&v&&v!==d&&(h=t.slice||t.webkitSlice,t=h.call(t,0,t.size,d),b=!0),s&&"download"!==a&&(a+=".download"),(v===d||s)&&(u=e),l?(p+=t.size,l(e.TEMPORARY,p,C(function(e){e.root.getDirectory("saved",y,C(function(e){var i=function(){e.getFile(a,y,C(function(e){e.createWriter(C(function(i){i.onwriteend=function(t){u.location.href=e.toURL(),m.push(e),f.readyState=f.DONE,g(f,"writeend",t)},i.onerror=function(){var e=i.error;e.code!==e.ABORT_ERR&&_()},"writestart progress write abort".split(" ").forEach(function(e){i["on"+e]=f["on"+e]}),i.write(t),f.abort=function(){i.abort(),f.readyState=f.DONE},f.readyState=f.WRITING}),_)}),_)};e.getFile(a,{create:!1},C(function(e){e.remove(),i()}),C(function(e){e.code===e.NOT_FOUND_ERR?i():_()}))}),_)}),_),void 0):(_(),void 0))},f=h.prototype,v=function(e,t){return new h(e,t)};return f.abort=function(){var e=this;e.readyState=e.DONE,g(e,"abort")},f.readyState=f.INIT=0,f.WRITING=1,f.DONE=2,f.error=f.onwritestart=f.onprogress=f.onwrite=f.onabort=f.onerror=f.onwriteend=null,e.addEventListener("unload",u,!1),v}(self);"undefined"!=typeof module&&(module.exports=saveAs);

/* the first Monday of terms
 *
 * these information can be found at 
 * http://jwb.xujc.com/index.php?c=article&a=view&id=16
 *
 */ 
first_monday = {
	// Date.setUTCFullYear(year,month,day)
	// month:Expected values are 0-11
	"20132": new Date().setUTCFullYear(2014, 2 - 1, 17),
	"20131": new Date().setUTCFullYear(2013, 9 - 1, 2),
	"20122": new Date().setUTCFullYear(2013, 2 - 1, 25),
	"20121": new Date().setUTCFullYear(2012, 9 - 1, 3),
	"20112": new Date().setUTCFullYear(2012, 2 - 1, 20),
	"20111": new Date().setUTCFullYear(2011, 9 - 1, 5),
	"20102": new Date().setUTCFullYear(2011, 2 - 1, 21),
	"20101": new Date().setUTCFullYear(2010, 9 - 1, 6),
	"20092": new Date().setUTCFullYear(2010, 3 - 1, 1),
	"20091": new Date().setUTCFullYear(2009, 9 - 1, 7)
};

function parser() {
	
	var data = document.getElementsByClassName("data")[0];
	var rows = data.getElementsByTagName("tr");

	// event class
	var Event = function(summary) {
		this.summary = summary;
		this.interval = 1;
		this.sday;
		this.stime;
		this.eday;
		this.etime;
		this.count;
		this.weekday;
		this.location = "";
		this.description = "";
	};

	Event.prototype = {
		display: function() {
			var info = "";
			info += "\nBEGIN:VEVENT";
			info += "\nDTSTART;TZID=Asia/Shanghai:" + this.sday + "T" + this.stime;
			info += "\nDTEND;TZID=Asia/Shanghai:" + this.eday + "T" + this.etime;
			info += "\nRRULE:FREQ=WEEKLY;COUNT=" + this.count + ";BYDAY=" + this.weekday;
			if (this.interval != 1)
				info += ";INTERVAL=" + this.interval;
			info += "\nSUMMARY:" + this.summary;
			info += "\nLOCATION:" + this.location;
			info += "\nDESCRIPTION:" + this.description;
			info += "\nEND:VEVENT";
			return info;
		}
	};

	// time to string tables
	var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10,
		11, 12
	];
	var days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11,
		12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
		29, 30, 31
	];
	var stimes_8_00 = ["080000", "085500", "100000", "105500", "123000", "132500",
		"143000", "152500", "163000", "172500", "190000", "195500",
		"205000"
	];
	var etimes_8_00 = ["084500", "094000", "104500", "114000", "132500", "141000",
		"151500", "161000", "171500", "181000", "194500", "204000",
		"213500"
	];
	// be used in the second term of 2011
	var stimes_8_10 = ["081000", "090500", "101000", "110500", "124000", "133500",
		"144000", "153500", "164000", "173500", "190000", "195500",
		"205000"
	];
	var etimes_8_10 = ["085500", "095000", "105500", "115000", "132500", "142000",
		"152500", "162000", "172500", "182000", "194500", "204000",
		"213500"
	];
	var weekdays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

	var term = document.getElementById("tm_id").value;
	var monday = first_monday[term];

	if(!monday){
		var mon = window.prompt("没有适合的开学日期，请手动填第一周周一日期（例如 2013-9-7）");
		var ans = window.confirm("确定使用"+new Date(mon).toLocaleDateString()+"作为第一周周一的日期吗");
		if(!ans)
			throw("failed");
		else
			monday = mon;
	}


	var events = [];
	var weekday = 1;
	var weekoffset = 1;
	var clses;
	for (var i = 1; i < rows.length; i++) {
		//		clses = (weekday % 2 == 1 ? even[Math.floor(weekday / 2)]
		//				: odd[weekday / 2 - 1]).getElementsByTagName("td");

		var clses = rows[i].getElementsByTagName("td");
		// skip the weekday-label
		var index = 0;
		if (clses[0].innerHTML.match(/^周./)) {
			weekoffset = clses[0].rowSpan;
			index = 1;
		}

		var clsno = 1;
		for (; index < clses.length; index++) {
			var cls = clses[index];
			if (cls.innerHTML != "&nbsp;") {
				var cinfo = cls.innerHTML.split("<br>");
				cinfo[3] = cinfo[3].replace(/<\/?[^>]*>/g, '');
				var reg = /(\d{1,2})-(\d{1,2})周\((.*)\)/;
				var winfo = cinfo[3].match(reg);
				var offset = 0 + (winfo[1] - 1) * 7;
				var interval = 1;
				var count = winfo[2] - winfo[1] + 1;
				if (winfo[3] != "每周") {
					offset += (winfo[3] == "双周" && winfo[1]%2==1 ? 7 : 0);
					interval = 2;
					count = count>1?Math.floor(count / 2):count;
				}
				var event = new Event(cinfo[0]);
				var day = new Date();
				day.setTime(monday.valueOf() + (weekday + offset - 1) * 24 * 60 * 60 * 1000);
				event.sday = "" + day.getUTCFullYear() + months[day.getUTCMonth()] + days[day.getUTCDate() - 1];
				event.eday = event.sday;
				if (Number(term) == 20112) {
					event.stime = stimes_8_10[clsno - 1];
					event.etime = etimes_8_10[clsno + cls.colSpan - 2];
				} else {
					event.stime = stimes_8_00[clsno - 1];
					event.etime = etimes_8_00[clsno + cls.colSpan - 2];
				}
				event.weekday = weekdays[weekday - 1];
				event.interval = interval;
				event.count = count;
				event.location = cinfo[2];
				event.description = cinfo[3] + "/" + cinfo[1];
				events.push(event);
			}
			clsno += cls.colSpan;
		}

		if (!--weekoffset) weekday++;
	}

	var output = "BEGIN:VCALENDAR\n";
	for (i = 0; i < events.length; i++)
		output += events[i].display();
	output += "\nEND:VCALENDAR";

	return output;
}

var page_nav = document.getElementById("page-nav");
var a = document.createElement("a");
a.innerHTML = "转换成iCal日历";
a.id = "ical";
a.href = "#";
a.style.cssText = "float:right; margin-top:-2em;";
a.onclick = function() {
	try{
		var ouput = new Blob([parser()],{type: "text/plain;charset=utf-8"});
		saveAs(ouput, "schedule.ics");
	}catch(e){
		alert("保存文件失败");
	}
};
page_nav.appendChild(a);
// ==UserScript==
// @name           dffs_booking_script
// @namespace      dffs.booking
// @include        http://yueche.dfss.cn/web/cmp/yc.aspx*
// @include		   http://114.251.109.215/WLYC/XYYC21DR1.aspx*
// @version		   2.0
// @author		   laruence<http://www.laruence.com>
// @copyright	   Copyright (c) 2010  laruence , All rights Reserved
// ==/UserScript==
//

//每次请求之间的延迟， 不用太短， 机器会郁闷的。
var delay = 10; //5秒
//

var START = true;
var delegate = function() {
	var day_map 	= ['日', '一', '二', '三', '四', '五', '六'];
	var period_map	= ['7-9', '9-13', '13-17', '17-19', '19-21'];
	var url			= window.location.href;
	var book_period = [];
	var self		= this;
	var time		= new Date();
	var today		= time.getDay();
	var expect_period = [];


	if( typeof delegate.__initilized__ == 'undefined' ) {
		delegate.prototype.init  = function(flag) {
			var x = document.createElement("div");
			var btn = null;
			x.id = "m-btn-o";
			x.innerHTML = "<style>#m-btn-o{border:solid 2px red; overflow:hidden;"
						  + "background-color:#eee;left:20px; color:blue;"
						  + "top:20px;left:600px;position:absolute; opacity:0.9;}</style>"
						  + "<b>东方时尚自动约车脚本V2.0</b>(双击隐藏)<br/>";
			document.body.appendChild(x);
			x.addEventListener("dblclick", function() {
					if (x.style.height == "20px") {
						x.style.height = "";
					} else {
						x.style.height = "20px";
					}
				}, false);
			if ( flag ) {
				var sel_date = "选择日期:<select id='sel_date'>"; 
				for (var i=0;i<day_map.length;i++) {
					sel_date += "<option value=\"" + i + "\" >星期" + day_map[i] + "</option>";
				}
				sel_date += "</select>";
	
				var sel_time = "选择时段:<select id='sel_time'>";
				for (var i=1;i<=period_map.length;i++) {
					sel_time += "<option value=\"" + i + "\" >" + period_map[i-1] + "</option>";
				}
				sel_time += "</select>";

				x.innerHTML += sel_date + sel_time;
				x.innerHTML += "<button id='add-book-sq'>添加</button>";
				x.innerHTML += "<div style=\"text-align:left;height:50px;\">" +
							   "<b>您选择的时间段:</b><br/>"
							   +"<p id=\"book_notice\"></p></div>";
				x.innerHTML += "<div><button id='m-btn'>开始约车</button></div>";
				document.getElementById("add-book-sq").addEventListener('click', function(e) {
						var day = document.getElementById('sel_date').value;
						var period = document.getElementById('sel_time').value;	
						var key = day + "-" + period;
						for (var i in expect_period) {
							if (expect_period[i].toString() == [day, period].toString()) {
								return true;
							}
						}
						expect_period.push([day, period]);
						document.getElementById("book_notice").innerHTML += "星期" + 
										day_map[key.split('-')[0]] +
										"的" + period_map[key.split('-')[1] - 1]
								   		+ "&nbsp;";
				}, false);		
				btn = document.getElementById("m-btn");		
				btn.addEventListener("click", function() {
					self.next(true);
				}, false);
			} else {
				var book_periods = url.split("&book_str=")[1].split(',');
				for (var key in book_periods) {
					expect_period.push(book_periods[key].split("-"));
				}

				x.innerHTML += "<button id='m-btn'>停止</button></div>";
				btn = document.getElementById("m-btn");		
				btn.addEventListener('click', function() {
						self.next(false);
				}, false);
				setTimeout( function() {
					self.start();
				},  2000);
			}
		}

		delegate.prototype.next = function(flag) {
			if (flag) {
				var book_str = [];
				for (var i in expect_period) {
					if (expect_period[i].length) {
						book_str.push(expect_period[i].join("-"));
					}
				}
				if (book_str == '') {
					window.location.replace(url.split('&automatic_booking')[0] + "&booking_finish=1");
				} else {
					window.location.replace(url.split('&automatic_booking')[0]
						   	+ '&automatic_booking=1&book_str=' + book_str.join(","));
				}
			} else {
				window.location.replace(url.split('&automatic_booking')[0]);
			}
		}

		delegate.prototype.start = function() {
			var text = document.getElementById('gridgrid_div').innerHTML;
			self.isAvailable(text);
		}
		delegate.prototype.isAvailable = function(text){
			for ( var i=0, l=expect_period.length; i<l; i++ ) {
					var expect_day	= expect_period[i][0];
					expect_day		= ((expect_day - today) + 7) % 7;
					var id = "grid_grid_ci_0_" + expect_period[i][1] + "_" + expect_day	+ "_imgButton";
					var input = document.getElementById(id);
					if(input && input.src.indexOf('02.gif') != -1 ) {
						/**
						 * igtbl functions
						 * defined in ig_WebGrid.js line 2477
						 */
						var grid = unsafeWindow.igtbl_getGridById('gridgrid');
						var cellId = "gridgridrc_" + expect_day + "_" + expect_period[i][1];
						var cell   = unsafeWindow.igtbl_getCellById(cellId);
 						grid.setActiveCell(cell); // important
						var evt = document.createEvent("MouseEvents");
						evt.initEvent("click", true, true);
						input.dispatchEvent(evt);
						return true;
					} 
					if (input && input.src.indexOf('01.gif') != -1) {
						expect_period[i] = [];
					}
				}
			self.next(true);
		}
		delegate.__initilized__ = true;
	}	
}

window.addEventListener('load',  function() {
	var agent = new delegate();
	if ( window.location.href.indexOf('automatic_booking=1') != -1 ) {
		agent.init(!START);
	} else if (window.location.href.indexOf('booking_finish=1') != -1) {
		alert("全部预订完成");
		return true;
	} else {
		agent.init(START);
	}
}, false);

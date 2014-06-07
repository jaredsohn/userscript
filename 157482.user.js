/*
 *  12306 Auto Query => A javascript snippet to help you book tickets online.
 *  12306 Booking Assistant
 *  Copyright (C) 2011 Hidden
 * 
 *  12306 Auto Query => A javascript snippet to help you book tickets online.
 *  Copyright (C) 2011 Jingqin Lynn
 * 
 *  12306 Auto Login => A javascript snippet to help you auto login 12306.com.
 *  Copyright (C) 2011 Kevintop
 * 
 *  Includes jQuery
 *  Copyright 2011, John Resig
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://jquery.org/license
 * 
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 * 
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 * 
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

// ==UserScript==  
// @name         12306 Booking Assistant
// @version		 1.5.3
// @author       zzdhidden@gmail.com
// @namespace    https://github.com/zzdhidden
// @description  12306 订票助手之(自动登录，自动查票，自动订单)
// @include      *://dynamic.12306.cn/otsweb/*
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript== 


function withjQuery(callback, safe){
	if(typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";

		if(safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery, window);";
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		}
		else {
			var dollar = undefined;
			if(typeof($) != "undefined") dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery, window);
			});
		}
		document.head.appendChild(script);
	} else {
		setTimeout(function() {
			//Firefox supports
			callback(jQuery, typeof unsafeWindow === "undefined" ? window : unsafeWindow);
		}, 30);
	}
}

withjQuery(function($, window){
	$(document).click(function() {
		if( window.webkitNotifications && window.webkitNotifications.checkPermission() != 0 ) {
			window.webkitNotifications.requestPermission();
		}
	});
	function notify(str, timeout, skipAlert, audio) {
		if( window.webkitNotifications && window.webkitNotifications.checkPermission() == 0 ) {
			var notification = webkitNotifications.createNotification(
				"http://www.12306.cn/mormhweb/images/favicon.ico",  // icon url - can be relative
				'12306订票助手',  // notification title
				str
			);
			notification.onclose = function() {
				if(audio && !audio.paused)
					audio.pause();
			};
			notification.onclick = function() {
				this.cancel();
			};
			if(audio)
				audio.play();
			notification.show();
			if ( timeout ) {
				setTimeout(function() {
					notification.cancel();
				}, timeout);
			}
			return notification;
		} else {
			if( !skipAlert ) {
				if(audio)
					audio.play();
				alert( str );
				if(audio && !audio.paused)
					audio.pause();
			}
			return null;
		}
	}
	function route(match, fn) {
		if( window.location.href.indexOf(match) != -1 ) {
			fn();
		};
	}


	function query() {

		//query
        var maxIncreaseDay  = 0 ;
        var start_autoIncreaseDay = null ;
        var index_autoIncreaseDay = 1 ;
        var pools_autoIncreaseDay = []  ;
        function  __reset_autoIncreaseDays(){
            maxIncreaseDay   = parseInt( document.getElementById('autoIncreaseDays').value ) || 1 ;
            if( maxIncreaseDay > 10 ) {
                maxIncreaseDay  = 10 ;
            }
            document.getElementById('autoIncreaseDays').value   = maxIncreaseDay ;
            start_autoIncreaseDay   = null ;
            $('#app_next_day,#app_pre_day').addClass('disabled').css('color', '#aaa' );
        }
        function  __unset_autoIncreaseDays(){
            if( start_autoIncreaseDay ) {
                document.getElementById('startdatepicker').value    = start_autoIncreaseDay ;
                start_autoIncreaseDay   = null ;
            }
            $('#app_next_day,#app_pre_day').removeClass('disabled').css('color', '#000' );
        }
        function __date_format( date ) {
                var y   = date.getFullYear() ;
                var m   = date.getMonth() + 1 ;
                var d   =  date.getDate() ;
                if( m <= 9 ) {
                    m = '0' + String( m ) ;
                } else {
                    m = String(  m ) ;
                }
                if( d <= 9 ) {
                    d = '0' + String(  d ) ;
                } else {
                    d = String( d );
                }
                return  String(y) + '-' + m + '-' + d ;
        }
        function __date_parse(txt){
                var a  =  $.map(txt.replace(/^\D+/, '').replace(/\D$/, '' ).split(/\D+0?/) , function(i){
                    return parseInt(i) ;
                }) ;
                a[1]    -= 1 ;
                var   date  = new Date;
                date.setFullYear(  a[0]    ) ;
                date.setMonth( a[1]  , a[2]  ) ;
                date.setDate( a[2] ) ;
                return date ;
        }
        function  __set_autoIncreaseDays() {
            if( !start_autoIncreaseDay ) {
                start_autoIncreaseDay   =  document.getElementById('startdatepicker').value ;
                var date = __date_parse(start_autoIncreaseDay);
                pools_autoIncreaseDay  = new Array() ;
                for(var i = 0 ; i < maxIncreaseDay  ; i++) {
                    pools_autoIncreaseDay.push(  __date_format(date) ) ;
                    date.setTime(  date.getTime() + 3600 * 24 * 1000 ) ;
                }
                index_autoIncreaseDay = 1 ; 
                return ;
            }
            if( index_autoIncreaseDay >= pools_autoIncreaseDay.length ) {
                index_autoIncreaseDay   = 0 ;
            }
            var value   = pools_autoIncreaseDay[index_autoIncreaseDay++];
             document.getElementById('startdatepicker').value   = value ;
        }
        function getTimeLimitValues(){
            return $.map(  [ $('#startTimeHFrom').val()  , $('#startTimeMFrom').val(), $('#startTimeHTo').val(), $('#startTimeMTo').val() ] , function(val){
                return parseInt(val) || 0 ;
            }) ;
        }
        
		var isTicketAvailable = false;
		var firstRemove = false;

		window.$ && window.$(".obj:first").ajaxComplete(function() {
            var  _timeLimit = getTimeLimitValues();
			$(this).find("tr").each(function(n, e) {
				if(checkTickets(e, _timeLimit, n )){
					isTicketAvailable = true;
					highLightRow(e);
				}	
			});
			if(firstRemove) {
				firstRemove = false;
				if (isTicketAvailable) {
					if (isAutoQueryEnabled)
						document.getElementById("refreshButton").click();
					onticketAvailable(); //report
				}
				else {
					//wait for the button to become valid
				}
			}
		}).ajaxError(function() {
			if(isAutoQueryEnabled) doQuery();
		});

		//hack into the validQueryButton function to detect query
		var _delayButton = window.delayButton;

		window.delayButton = function() {
			_delayButton();
			if(isAutoQueryEnabled) doQuery();
		}

		//Trigger the button
		var doQuery = function() {
			displayQueryTimes(queryTimes++);
			firstRemove = true;
            __set_autoIncreaseDays();
			document.getElementById(isStudentTicket ? "stu_submitQuery" : "submitQuery").click();
		}

		var $special = $("<input type='text' style='margin-top:-2px;width:200px' placeholder='逗号分隔多个车次，不限制则不填写' />")	
		//add by 冯岩 begin 2012-01-18
		//modified by PeterPanZH 2013-01-24
		var $specialOnly = $("<input type='checkbox'  id='__chkspecialOnly' style='margin-top:-2px;cursor:pointer' /><label for='__chkspecialOnly' style='margin-right:10px;color: blue;cursor:pointer'>仅显示限定车次</label>");
		var $includeCanOder = $("<input type='checkbox' id='__chkIncludeCanOder' style='margin-top:-2px;cursor:pointer' /><label for='__chkIncludeCanOder' style='color: blue;cursor:pointer'>显示可预定车次</label>");
		//add by 冯岩 end 2012-01-18
		var checkTickets = function(row, time_limit , row_index ) {

			var hasTicket = false;
			var v1 = $special.val();			
			var removeOther = $("#__chkspecialOnly").attr("checked");
			var includeCanOder = $("#__chkIncludeCanOder").attr("checked");
			if( v1 ) {
				var v2 = $.trim( $(row).find(".base_txtdiv").text() );
				if( v1.indexOf( v2 ) == -1 ) {
					//add by 冯岩 begin 2012-01-18
					if(removeOther)
					{
						if(v2 != "")
						{
							if(includeCanOder)
							{
								//包括其他可以预定的行
								if($(row).find(".yuding_u").size() == 0)
								{
									$(row).remove();
								}
							}
							else
							{
								$(row).remove();
							}
						}
					}
					//add by 冯岩 end 2012-01-18
					return false;
				}
			}

			if( $(row).find("td input.yuding_x[type=button]").length ) {
				return false;
			}
           
            var cells  = $(row).find("td") ;
            if( cells.length < 5 ) {
                return false ;
            }
            var _start_time = $.map(  $(cells[1]).text().replace(/^\D+|\D+$/, '').split(/\D+0?/) , function(val){
               return parseInt(val) || 0 ; 
            }) ;
            
            while( _start_time.length > 2 ) {
                _start_time.shift() ; // remove station name include number 
            }
            if( _start_time[0] < time_limit[0] ||  _start_time[0]  > time_limit[2] ) {
                return false ;
            }
            if( _start_time[0] == time_limit[0] && _start_time[1]  <  time_limit[1] ){
                return false ;
            }
            if( _start_time[0] == time_limit[2] && _start_time[1]  >  time_limit[3] ){
                return false ;
            }
            
			cells.each(function(i, e) {
				if(ticketType[i-1]) {
					var info = $.trim($(e).text());
					if(info != "--" && info != "无") {
						hasTicket = true;
						highLightCell(e);
					}
				}
			});

			return hasTicket;
		}


		var queryTimes = 0; //counter
		var isAutoQueryEnabled = false; //enable flag

		//please DIY:
		var audio = null;

		var onticketAvailable = function() {
			if(window.Audio) {
				if(!audio) {
					audio = new Audio("http://panzihao.cn/msg.mp3");
					audio.loop = true;
				}
				notify("可以订票了！", null, true, audio);
			} else {
				notify("可以订票了！");
			}
		}
		var highLightRow = function(row) {
			$(row).css("background-color", "#D1E1F1");
		}
		var highLightCell = function(cell) {
			$(cell).css("background-color", "#2CC03E");
		}
		var displayQueryTimes = function(n) {
			document.getElementById("refreshTimes").innerHTML = n;
		};

		var isStudentTicket = false;

		//Control panel UI
		var uiLeft = $("<div style='float:left;margin-left:30px'></div>")
			.append(
				$("<div id='timeFilter'>出发日期：<input id='autoIncreaseDays' type='text' value='1'  maxLength=2 style='margin-top:-2px;width:18px;' /><label for='autoIncreaseDays'>天循环（最多10天）&nbsp;&nbsp;</label>出发时间：</div>")
			)
			.append( 
				$("<div>限定出发车次：</div>")
					.append( $special )
					.append( $specialOnly)
					.append( $includeCanOder )
			)
			.append( 
				//Custom ticket type
				$("<div>如果只需要刷特定的票种，请在余票信息下面勾选。&nbsp;&nbsp;</div>")
					.append($("<a href='#' style='color: blue;margin-right:10px'>只勾选坐票</a>").click(function() {
						$(".hdr tr:eq(2) td").each(function(i,e) {
							var val = (this.innerHTML.indexOf("座") != -1 && this.innerHTML.indexOf("无座") === -1);
							var el = $(this).find("input").attr("checked", val);
							el && el[0] && ( ticketType[el[0].ticketTypeId] = val );
							if(el && el[0] && el[0].checked)
								$(e).css("color", "#090").find("div").show();
							else
								$(e).css("color", "#055A78").find("div").hide();
						});
						return false;
					}))
					.append($("<a href='#' style='color: blue;margin-right:10px'>只勾选卧铺</a>").click(function() {
						$(".hdr tr:eq(2) td").each(function(i,e) {
							var val = this.innerHTML.indexOf("卧") != -1;
							var el = $(this).find("input").attr("checked", val);
							el && el[0] && ( ticketType[el[0].ticketTypeId] = val );
							if(el && el[0] && el[0].checked)
								$(e).css("color", "#090").find("div").show();
							else
								$(e).css("color", "#055A78").find("div").hide();
						});
						return false;
					}))
					.append($("<a href='#' style='color: blue;'>勾选全部</a>").click(function() {
						$(".hdr tr:eq(2) td").each(function(i,e) {
							var el = $(this).find("input").attr("checked", true);
							el && el[0] && ( ticketType[el[0].ticketTypeId] = true );
							if(el && el[0] && el[0].checked)
								$(e).css("color", "#090").find("div").show();
						});
						return false;
					}))
			);
		var uiRight = $("<div style='float:right;margin-right:10px;line-height:22px'></div>")
			.append(
				$("<button style='cursor:pointer;margin-left:-7px;padding: 5px 10px; background: #2CC03E;border-color: #259A33;border-right-color: #2CC03E;border-bottom-color:#2CC03E;color: white;border-radius: 5px;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);'/>").attr("id", "refreshButton").html("开始刷票").click(function() {
					if($("#fromStation").val() == "" || $("#toStation").val() == "") {
						alert("请填写出发地和到达地！");
						return;
					}
					if($("#fromStation").val() === $("#toStation").val()) {
						alert("出发地和到达地不能相同！");
						return;
					}
					if(!isAutoQueryEnabled) {
                        __reset_autoIncreaseDays() ;
						isTicketAvailable = false;
						if(audio && !audio.paused) audio.pause();
						isAutoQueryEnabled = true;
						queryTimes = 1;
						doQuery();
						this.innerHTML="停止刷票";
					}
					else {
                        __unset_autoIncreaseDays();
						isAutoQueryEnabled = false;
						this.innerHTML="开始刷票";
					}
				})
			)
			.append($("<br />"))
			.append(
				$("<span>").html("尝试次数：").append(
					$("<span/>").attr("id", "refreshTimes").text("0")
				)
			)
			.append($("<br />"));
		$("<input id='isStudentTicket' type='checkbox' style='cursor:pointer;margin:-2px 5px 0 7px' />")
			.change(function(){
					isStudentTicket = this.checked ;
				})
			.appendTo(uiRight);
			uiRight.append(
				$("<label for='isStudentTicket' style='cursor:pointer'></label>").html("学生票")
			);
		var ui = $('<div style="margin-top:10px;padding-top:10px;border-top:1px solid #DBE6F4"></div>').append(uiLeft).append(uiRight);
		var container = $("div.cx_form");
		container.length ?
			ui.appendTo(container) : ui.appendTo(document.body);

		//$("#gridbox").height(260);

		//前一日后一日UI修改
		//by PeterPanZH 2013-01-24
		$('#startdatepicker').parent("td").width(156);
		$('#startdatepicker').width(75).css("margin", "0");
		$('<a id="app_pre_day" style="margin:0 -2px 0 0"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAADD0lEQVRIx9WWP4skVRTFf6+qu2d3ZnYmGMV1EQWRNdJE/ABGLmxgYmSmqeBXEGO/gKmpgaAiuIGBYLTIgoGYCCsiIqzOzp+u6q737rvH4FV3V7c1ZhtYcOlX/arOuffcP6+CJJ7kVfGEr8lq8fEvfykECCGsNwVIQi5yFu6OWW8pk0bNSSnz2TuvhS0Cd/Hu8yfsKqbeXMWyRBa9CXMwgXm5r6vAR189+HcEOTu/Nc6FizAAXwGbQ5JIGbqs3mDZr5f9/3s1tCmPE5iL5Dve996u9mIPvAVuZb3MQgo00cYJokPnbCKQcCD3MqSs/hnxODoVoXjuBXyRQUE0cSQCS0500RmEsPHeB1onh8ed83fn3L4x4cfTxH4dWGRYGLS5ODROYLk8mLUlURa4Q2viNIrjCbx/+zone4F7v3fcvF7TmmizWJjIXCFRMmeRRbsh75MrzqIQcPfWlNdPyivzJC4NjnIBb0w0Bl6LxSCRG4KYWWZYmq/lOY/iIok3nplw59Yes6onlYgu5smZJ1hYIWizCFVNk8YiSLl4kYpEl0m8eFDzwcszTvYqBCQXrk1vnEXneBpoTOs8VJWQXRHBH0tx0an33jmahFKifQUNe9AcHp47tQKtqchrcOj95u4sislK85hYmpgF+PJhx9vfXvLJzwsa07pjk0N0WMSV9gW868t4OA6qYQRrglSkeuFGzeE08OEPDW/eO+fzXzuiF/1jFkpOY5sujl6KAh8h6JKXZCUxN5UqSSK5eOWpCadRvPf1GXe/OefBIyM5KJXSXA7A82q+7OagTUZrMLcyElI/GszLy4eTwEvPzbj/Z+LOp49469V9ZtPSyStg78fKMFlrgiZm9nPxvGi8TbT6ffqoJh5UfPHTgtmzM+LK695cV5wHTcwcWJEn5m2CTXILWHKob06xvmzXHquvNI1I1KRcOjIVSeJAouSbieqw5TFDQP3HidbGTF0H9q5VVA61i+n6INkcNKtGY5DLIe7xtcB8jGBpmfvffU9nTs5ekF2bkaoRT0c+GOY79+F//1XxD0ojDIJuG2hUAAAAAElFTkSuQmCC" alt="前一天" title="前一天" style="height:26px;margin:0 0 1px 0" /></a>').click(function() {
			if( $(this).hasClass("disabled") ) {
				return false ;
			}
			var date = __date_parse( document.getElementById('startdatepicker').value );
			date.setTime(  date.getTime() - 3600 * 24 * 1000 ) ;
			document.getElementById('startdatepicker').value    =  __date_format(date)  ;
				return false;
		}).insertBefore($('#startdatepicker'));
		$('<a id="app_pre_day" style="margin:0 0 0 -2px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGklEQVRIx9WWu44cRRSGv+ru3RnfsISNuaxYCJCcQ0JEwls4ggcgRSJ0jETCI4AckGCJJ0Ai4CZAIsBI5iIbIUBGrHanuqerzoWgqmd2x20yB7R0pOrpnv8/569z/urg7jzOq+ExX920ePfuAw8BQgibhw64O26OqmNmiNTISp4NI2floxuvhDMEZs6bh1fYVcxrmJdQd9Sp4YiBOIiV+7YJ3Pzkm4crUDXuRePYnHAKfAIWg+xOVhjVa8C6rtf190ULfdZ5AjEn2072NdvpWarAZ8ClrNfquAdiknmCZDAa2wrcMaAXpw2BrF7f8RJKydwK+KDgwYlppgLJRjJnFAhhm/1xdp47F7hzrHQEusBWEikVDAqDQK8lodMEmzYV0fKiOr04gziDOn+NxuvX9rhxuCAA96NxNFKei9MLxOysxInZicK8RFmsgG/JMYcopWueOdfw1vUlnz8Qbv0yskrGsm3I5vTqRCng1jrDqY3cEiRlrbAW28jjDiejl+4x6JrAq1c7Xn6y5dbPIx/8NNLgXOgCUQpRaFpiloclyllLFtnpcy03OyfJNu2a1Mnm7DWBN15a8uFrl7h+ueVeNFYCMRfpXB5Rwe9r53h03MHcMYf7K0MNrG68OhsSMfhncP44Ubou0AtcNMrQ7BKkLGV4pAC7O2YQxzqtTSHASyO8/8PAe9/1DINycKWjl9Jd+1b1natgIlADqZZwlIykTlfF/PjXxM1vI7/9mTi4tsDPh80UJysDic0QjNkY6h5InVxxOErO2uDHv5V3vlrx9d2RJ55qeeHZBWt1khTgXMF12rBdgj4LvcBKSsfkag0d8PYXkdvf93Cp4cXn90nmrLIjts1aN2ZYPWaXICblvJY/ZoNUCS7uB27fGTg82CNbmYukpbpsW3edbNf8EedBTMoFKROZdEuQzXn6akeUstZTwD4B+sa8aiPMSBSzlonMpeyJYHLRyVENzmTMaUD/jxOtT0rbBhbLhsagNWdvc5BspTDf4tgM7uVlYDVHsBbly08/YxRD1QqyVb+YUHcznflgWO3ch//9V8W/rpIU6waY0xMAAAAASUVORK5CYII=" alt="后一天" title="后一天" style="height:26px;margin:0 0 1px 0" /></a>').click(function() {
			if( $(this).hasClass("disabled") ) {
				return false ;
			}
			var date = __date_parse( document.getElementById('startdatepicker').value );
			date.setTime(  date.getTime() + 3600 * 24 * 1000 ) ;
			document.getElementById('startdatepicker').value    =  __date_format(date)  ;
			return false;
		}).insertAfter($('#startdatepicker'));

        setTimeout(function(){
            var box = $('<span style="width:100px;height:18px;line-height:18px;font-size:12px;padding:0px;overflow:hidden;"></span>') ;
            function makeSelect(id, max_value, default_value){
                var element  = $('<select id="' + id + '" style="margin:-2px 0 0 -1px;padding:0px;font-size:12px; line-height:100%; "></select>') ;
                for(var i = 0; i <= max_value ; i++) {
                    element.append(
                       $('<option value="' + i + '" style="padding:0px;margin:0px;font-size:12px; line-height:100%;" ' + ( default_value == i ? ' selected="selected" ' : '' ) + '>' + ( i <= 9 ? '0' + i : i ) + '</option>' )
                    )
                }
                box.append(
                    $('<span style="padding:0px;overflow:hidden;"></span>') .append(element)
                );
                return element ;
            }
            function check(evt){
                var tl  = getTimeLimitValues() ;
                if( tl[0] > tl[2] || (tl[0] == tl[2]  && tl[1] > tl[3]) ) {
                    alert('最早发车时间必须早于最晚发车时间，请重新选择！') ;
                    return false ;
                }
            }
            makeSelect('startTimeHFrom' , 23 ).change(check) ;
            box.append( $('<span>:</span>')) ;
            makeSelect('startTimeMFrom' , 59 ).change(check) ;
            box.append( $('<span> -- </span>')) ;
            makeSelect('startTimeHTo' , 23, 23 ).change(check) ;
            box.append( $('<span>:</span>')) ;
            makeSelect('startTimeMTo' , 59, 59 ).change(check) ;
            
            box.appendTo(  $('#timeFilter') )
   
        }, 10 ) ;
        
		//Ticket type selector & UI
		var ticketType = new Array();
        var checkbox_list   = new Array();
		$(".hdr tr:eq(2) td").each(function(i,e) {
			ticketType.push(false);
			if(i<3) return;
			ticketType[i] = true;
			$(e).html('<label for="ticketType' + String(i) + '" style="cursor:pointer">' + $(e).text() + '</label>').css("color", "#090").css("position", "relative").prepend('<div style="width:10px;height:10px;position:absolute;float:left;margin:-5px 0 0 0;padding:0;"><img style="width:10px;height:10px;margin:0;" src="data:image/png;base64,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" /></div>');
			var c = $("<input/>").attr("type", "checkBox").attr("checked", true).attr("id", "ticketType" + String(i)).hide();
			c[0].ticketTypeId = i;
			c.change(function() {
				ticketType[this.ticketTypeId] = this.checked;
				if(this.checked)
					$(this).parent("td").css("color", "#090").find("div").show();
				else
					$(this).parent("td").css("color", "#055A78").find("div").hide();
			}).appendTo(e);
            checkbox_list.push(c);
		});
        $.each([1, 2], function(){
            var c   = checkbox_list.pop() ;
            c[0].checked    = false ;
            c.parent("td").css("color", "#055A78").find("div").hide();
            ticketType[ c[0].ticketTypeId ] = this.checked ;

        });
        delete checkbox_list ;
	}

	route("querySingleAction.do", query);
	route("myOrderAction.do?method=resign", query);
	route("confirmPassengerResignAction.do?method=cancelOrderToQuery", query);

	route("loginAction.do?method=init", function() {
		return;
		if( !window.location.href.match( /init$/i ) ) {
			return;
		}
		//login
		var url = "https://dynamic.12306.cn/otsweb/loginAction.do?method=login";
		var queryurl = "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=init";
		//Check had login, redirect to query url
		if( window.parent && window.parent.$ ) {
			var str = window.parent.$("#username_ a").attr("href");
			if( str && str.indexOf("sysuser/user_info") != -1 ){
				window.location.href = queryurl;
				return;
			}
		}

		function submitForm(){
			var submitUrl = url;
			$.ajax({
				type: "POST",
				url: submitUrl,
				data: {
					"loginUser.user_name": $("#UserName").val()
				  , "user.password": $("#password").val()
				  , "randCode": $("#randCode").val()
				},
				beforeSend: function( xhr ) {
					try{
						xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }});
						xhr.setRequestHeader('Cache-Control', 'max-age=0');
						xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
					}catch(e){};
				},
				timeout: 30000,
				//cache: false,
				//async: false,
				success: function(msg){
					//密码输入错误
					//您的用户已经被锁定
					if ( msg.indexOf('请输入正确的验证码') > -1 ) {
						alert('请输入正确的验证码！');
					} else if ( msg.indexOf('当前访问用户过多') > -1 ){
						reLogin();
					} else if( msg.match(/var\s+isLogin\s*=\s*true/i) ) {
						notify('登录成功，开始查询车票吧！');
						window.location.replace( queryurl );
					} else {
						msg = msg.match(/var\s+message\s*=\s*"([^"]*)/);
						if( msg && msg[1] ) {
							alert( msg && msg[1] );
						} else {
							reLogin();
						}
					}
				},
				error: function(msg){
					reLogin();
				}
			});
		}

		var count = 1;
		function reLogin(){
			count ++;
			$('#refreshButton').html("("+count+")次登录中...");
			setTimeout(submitForm, 2000);
		}
		//初始化
		$("#subLink").after($("<a href='#' style='padding: 5px 10px; background: #2CC03E;border-color: #259A33;border-right-color: #2CC03E;border-bottom-color:#2CC03E;color: white;border-radius: 5px;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);'/>").attr("id", "refreshButton").html("自动登录").click(function() {
			count = 1;
			$(this).html("(1)次登录中...");
			//notify('开始尝试登录，请耐心等待！', 4000);
			submitForm();
			return false;
		}));

		alert('如果使用自动登录功能，请输入用户名、密码及验证码后，点击自动登录，系统会尝试登录，直至成功！');
	});
	//route("confirmPassengerAction.do", submit);
	//route("confirmPassengerResignAction.do", submit);
	function submit() {
		/**
		 * Auto Submit Order
		 * From: https://gist.github.com/1577671
		 * Author: kevintop@gmail.com  
		 */
		//Auto select the first user when not selected
		if( !$("input._checkbox_class:checked").length ) {
			try{
				//Will failed in IE
				$("input._checkbox_class:first").click();
			}catch(e){};
		}
		//passengerTickets

		var userInfoUrl = 'https://dynamic.12306.cn/otsweb/order/myOrderAction.do?method=queryMyOrderNotComplete&leftmenu=Y';

		var count = 1, freq = 1000, doing = false, timer, $msg = $("<div style='padding-left:470px;'></div>");

		function submitForm(){
			timer = null;
			//更改提交列车日期参数
			//var wantDate = $("#startdatepicker").val();
			//$("#start_date").val(wantDate);
			//$("#_train_date_str").val(wantDate);

			jQuery.ajax({
				url: $("#confirmPassenger").attr('action'),
				data: $('#confirmPassenger').serialize(),
				beforeSend: function( xhr ) {
					try{
						xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }});
						xhr.setRequestHeader('Cache-Control', 'max-age=0');
						xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
					}catch(e){};
				},
				type: "POST",
				timeout: 30000,
				success: function( msg )
				{
					//Refresh token
					var match = msg && msg.match(/org\.apache\.struts\.taglib\.html\.TOKEN['"]?\s*value=['"]?([^'">]+)/i);
					var newToken = match && match[1];
					if(newToken) {
						$("input[name='org.apache.struts.taglib.html.TOKEN']").val(newToken);
					}

					if( msg.indexOf('payButton') > -1 ) {
						//Success!
						var audio;
						if( window.Audio ) {
							audio = new Audio("http://panzihao.cn/msg.mp3");
							audio.loop = true;
							notify("恭喜，车票预订成！", null, true, audio);
						}
						else {
							notify("恭喜，车票预订成！", null, true);
						}
						setTimeout(function() {
							if( confirm("车票预订成，去付款？") ){
								window.location.replace(userInfoUrl);
							} else {
								if(audio && !audio.paused) audio.pause();
							}
						}, 100);
						return;
					}else if(msg.indexOf('未处理的订单') > -1){
						notify("有未处理的订单!");
						window.location.replace(userInfoUrl);
						return;
					}
					var reTryMessage = [
						'用户过多'
					  , '确认客票的状态后再尝试后续操作'
					  ,	'请不要重复提交'
					  , '没有足够的票!'
					  , '车次不开行'
					];
					for (var i = reTryMessage.length - 1; i >= 0; i--) {
						if( msg.indexOf( reTryMessage[i] ) > -1 ) {
							reSubmitForm( reTryMessage[i] );
							return;
						}
					};
					// 铁道部修改验证码规则后  update by 冯岩
					if( msg.indexOf( "输入的验证码不正确" ) > -1 ) {
						$("#img_rrand_code").click();
						$("#rand").focus().select();
						stop();
						return;
					}
					//Parse error message
					msg = msg.match(/var\s+message\s*=\s*"([^"]*)/);
					stop(msg && msg[1] || '出错了。。。。 啥错？ 我也不知道。。。。。');
				},
				error: function(msg){
					reSubmitForm("网络错误");
				}
			});
		};
		function reSubmitForm(msg){
			if( !doing )return;
			count ++;
			$msg.html("("+count+")次自动提交中... " + (msg || ""));
			timer = setTimeout( submitForm, freq || 50 );
		}
		function stop ( msg ) {
			doing = false;
			$msg.html("("+count+")次 已停止");
			$('#refreshButton').html("自动提交订单");
			timer && clearTimeout( timer );
			msg && alert( msg );
		}
		function reloadSeat(){
			$("select[name$='_seat']").html('<option value="M" selected="">一等座</option><option value="O" selected="">二等座</option><option value="1">硬座</option><option value="3">硬卧</option><option value="4">软卧</option>');
		}
		//初始化

		if($("#refreshButton").size()<1){

			//	//重置后加载所有席别
			//	$("select[name$='_seat']").each(function(){this.blur(function(){
			//		alert(this.attr("id") + "blur");
			//	})});
			////初始化所有席别
			//$(".qr_box :checkbox[name^='checkbox']").each(function(){$(this).click(reloadSeat)});
			//reloadSeat();

			//日期可选
			$("td.bluetext:first").html('<input type="text" name="orderRequest.train_date" value="' +$("#start_date").val()+'" id="startdatepicker" style="width: 150px;" class="input_20txt"  onfocus="WdatePicker({firstDayOfWeek:1})" />');
			$("#start_date").remove();
			 
			$(".tj_btn").append($("<a style='padding: 5px 10px; background: #2CC03E;border-color: #259A33;border-right-color: #2CC03E;border-bottom-color:#2CC03E;color: white;border-radius: 5px;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);'></a>").attr("id", "refreshButton").html("自动提交订单").click(function() {
				//alert('开始自动提交订单，请点确定后耐心等待！');
				if( this.innerHTML.indexOf("自动提交订单") == -1 ){
					//doing
					stop();
				} else {
					if( window.submit_form_check && !window.submit_form_check("confirmPassenger") ) {
						return;
					}
					count = 0;
					doing = true;
					this.innerHTML = "停止自动提交";
					reSubmitForm();
				}
				return false;
			}));
			$(".tj_btn").append("自动提交频率：")
				.append($("<select id='freq'><option value='50' >频繁</option><option value='500' selected='' >正常</option><option value='2000' >缓慢</option></select>").change(function() {
					freq = parseInt( $(this).val() );
				}))
				.append($msg);
			//alert('如果使用自动提交订单功能，请在确认订单正确无误后，再点击自动提交按钮！');
			
			//铁道路修改验证码规则后 优化 by 冯岩
			$("#rand").bind('keydown', function (e) {
				var key = e.which;
				if (key == 13) {
					$("#refreshButton").click();
				}
			});
		}
	};
}, true);

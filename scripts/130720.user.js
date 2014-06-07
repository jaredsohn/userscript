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
// @version		 1.3.9
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
	function notify(str, timeout, skipAlert) {
		if( window.webkitNotifications && window.webkitNotifications.checkPermission() == 0 ) {
			var notification = webkitNotifications.createNotification(
				"http://www.12306.cn/mormhweb/images/favicon.ico",  // icon url - can be relative
				'订票',  // notification title
				str
			);
			notification.show();
			if ( timeout ) {
				setTimeout(function() {
					notification.cancel();
				}, timeout);
			}
			return true;
		} else {
			if( !skipAlert ) {
				alert( str );
			}
			return false;
		}
	}
	function route(match, fn) {
		if( window.location.href.indexOf(match) != -1 ) {
			fn();
		};
	}


	function query() {

		//query
		var isTicketAvailable = false;

		var firstRemove = false;

		window.$ && window.$(".obj:first").ajaxComplete(function() {
			$(this).find("tr").each(function(n, e) {
				if(checkTickets(e)){
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
			document.getElementById(isStudentTicket ? "stu_submitQuery" : "submitQuery").click();
		}

		var $special = $("<input type='text' />")	
		//add by 冯岩 begin 2012-01-18
		var $specialOnly = $("<label style='margin-left:10px;color: blue;'><input type='checkbox'  id='__chkspecialOnly'/>仅显示限定车次<label>");
		var $includeCanOder = $("<label style='margin-right:10px;color: blue;'><input type='checkbox' id='__chkIncludeCanOder'/>显示可预定车次<label>");
		//add by 冯岩 end 2012-01-18
		var checkTickets = function(row) {
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

			$("td", row).each(function(i, e) {
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
					audio = new Audio("http://www.w3school.com.cn/i/song.ogg");
					audio.loop = true;
				}
				audio.play();
				notify("可以订票了！", null, true);
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
		var ui = $("<div>请先选择好出发地，目的地，和出发时间。&nbsp;&nbsp;&nbsp;</div>")
			.append(
				$("<input id='isStudentTicket' type='checkbox' />").change(function(){
					isStudentTicket = this.checked;
				})
			)
			.append(
				$("<label for='isStudentTicket'></label>").html("学生票&nbsp;&nbsp;")
			)
			.append(
				$("<button style='padding: 5px 10px; background: #2CC03E;border-color: #259A33;border-right-color: #2CC03E;border-bottom-color:#2CC03E;color: white;border-radius: 5px;text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);'/>").attr("id", "refreshButton").html("开始刷票").click(function() {
					if(!isAutoQueryEnabled) {
						isTicketAvailable = false;
						if(audio && !audio.paused) audio.pause();
						isAutoQueryEnabled = true;
						doQuery();
						this.innerHTML="停止刷票";
					}
					else {
						isAutoQueryEnabled = false;
						this.innerHTML="开始刷票";
					}
				})
			)
			.append(
				$("<span>").html("&nbsp;&nbsp;尝试次数：").append(
					$("<span/>").attr("id", "refreshTimes").text("0")
				)
			)
			.append( 
				//Custom ticket type
				$("<div>如果只需要刷特定的票种，请在余票信息下面勾选。</div>")
					.append($("<a href='#' style='color: blue;'>只勾选坐票&nbsp;&nbsp;</a>").click(function() {
						$(".hdr tr:eq(2) td").each(function(i,e) {
							var val = this.innerHTML.indexOf("座") != -1;
							var el = $(this).find("input").attr("checked", val);
							el && el[0] && ( ticketType[el[0].ticketTypeId] = val );
						});
						return false;
					}))
					.append($("<a href='#' style='color: blue;'>只勾选卧铺&nbsp;&nbsp;</a>").click(function() {
						$(".hdr tr:eq(2) td").each(function(i,e) {
							var val = this.innerHTML.indexOf("卧") != -1;
							var el = $(this).find("input").attr("checked", val);
							el && el[0] && ( ticketType[el[0].ticketTypeId] = val );
						});
						return false;
					}))
			)
			.append( 
				$("<div>限定出发车次：</div>")
					.append( $special )
					.append( $specialOnly)
					.append( $includeCanOder )
					.append( "不限制不填写，限定多次用逗号分割,例如: G32,G34" )
			);
		var container = $(".cx_title_w:first");
		container.length ?
			ui.insertBefore(container) : ui.appendTo(document.body);

		//Ticket type selector & UI
		var ticketType = new Array();
		$(".hdr tr:eq(2) td").each(function(i,e) {
			ticketType.push(false);
			if(i<3) return;
			ticketType[i] = true;

			var c = $("<input/>").attr("type", "checkBox").attr("checked", true);
			c[0].ticketTypeId = i;
			c.change(function() {
				ticketType[this.ticketTypeId] = this.checked;
			}).appendTo(e);
		});
	}

	route("querySingleAction.do", query);
	route("myOrderAction.do?method=resign", query);
	route("confirmPassengerResignAction.do?method=cancelOrderToQuery", query);

	route("loginAction.do?method=init", function() {
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
			setTimeout(submitForm, 50);
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
	route("confirmPassengerAction.do", submit);
	route("confirmPassengerResignAction.do", submit);
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
							audio = new Audio("http://www.w3school.com.cn/i/song.ogg");
							audio.loop = true;
							audio.play();
						}
						notify("恭喜，车票预订成！", null, true);
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
					if( true ) {
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

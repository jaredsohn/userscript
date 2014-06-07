// Super booking for SHDC
// by Bachue
// ==UserScript==
// @name        Super booking for SHDC
// @namespace   bachue
// @version     0.0.5
// @description	为医联预约设计，加快预约速度
// @include     http://yuyue.shdc.org.cn/*
// ==/UserScript==
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or 
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

if(jQuery) {
	console.log('jQuery loaded before');
	function addJQuery(callback) {
		callback(jQuery);
	}
}
else {
	console.log('jQuery load now');
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "http://yuyue.shdc.org.cn/Scripts/jquery-1.4.2.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")(jQuery);";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
}

// the guts of this userscript
function main($) {
	console.log('in main');
	if(window.location.href.search(/^http:\/\/yuyue\.shdc\.org\.cn\/Order\/SelectDate/) >= 0) {
		// don't know what to do currently
	}
	else if(window.location.href.search(/^http:\/\/yuyue\.shdc\.org\.cn\/Order\/SelectCard/) >= 0) {
		console.log('in Select Card js injection');
		$(function(){
			// Hack this method
			function SuccessReservation() {
				$("#spnusermenuerror").html("");
				//验证码
				if ($("#txtVerifyCode").val().trim() == "") {
					$("#spnusermenuerror").html("请输入验证码");
					document.getElementById("txtVerifyCode").focus();
					return false;
				}
				if ($("#txtVerifyCode").val().length != 4) {
					$("#spnusermenuerror").html("验证码长度为4位");
					document.getElementById("txtVerifyCode").focus();
					return false;
				}
				var strtypename = "";
				var strdata = "";
				if ($("#hdnordertype").val() == "1") {
					strtypename = $("#hdndoctorname").val();
					strdata = 'code=' + $("#txtVerifyCode").val() + '&ordertype=' + $("#hdnordertype").val() + '&typename=' + strtypename + '&hospitalname=' + $("#hdnhospitalname").val() + '&deptl2id=' + $("#hdndeptl2id").val() + '&orderdate=' + $("#hdnorderdate").val() + '&ordertime=' + $("#hdnordertime").val() + '&hospitalid=' + $("#hdnhospitalid").val() + '&templateid=' + $("#hdntemplateid").val() + '&cardinfoid=' + $("#ddlCardNo").val() + '&registerfee=' + $("#hdnregisterfee").val() + '&doctorid=' + $("#hdndoctorid").val() + '&recommended=' + $("#hdnrecommended").val();
				}
				else if ($("#hdnordertype").val() == "2") {
					strtypename = $("#hdndiseasename").val();
					strdata = 'code=' + $("#txtVerifyCode").val() + '&ordertype=' + $("#hdnordertype").val() + '&typename=' + strtypename + '&hospitalname=' + $("#hdnhospitalname").val() + '&deptl2id=' + $("#hdndeptl2id").val() + '&orderdate=' + $("#hdnorderdate").val() + '&ordertime=' + $("#hdnordertime").val() + '&hospitalid=' + $("#hdnhospitalid").val() + '&templateid=' + $("#hdntemplateid").val() + '&cardinfoid=' + $("#ddlCardNo").val() + '&registerfee=' + $("#hdnregisterfee").val();
				}
				else if ($("#hdnordertype").val() == "3") {
					strtypename = $("#hdncommon").val();
					strdata = 'code=' + $("#txtVerifyCode").val() + '&ordertype=' + $("#hdnordertype").val() + '&typename=' + strtypename + '&hospitalname=' + $("#hdnhospitalname").val() + '&deptl2id=' + $("#hdndeptl2id").val() + '&orderdate=' + $("#hdnorderdate").val() + '&ordertime=' + $("#hdnordertime").val() + '&hospitalid=' + $("#hdnhospitalid").val() + '&templateid=' + $("#hdntemplateid").val() + '&cardinfoid=' + $("#ddlCardNo").val() + '&registerfee=' + $("#hdnregisterfee").val();
				}
				$.ajax({
					type: "post",
					url: "../Ajax/ajaxSaveReservation.aspx",
					data: strdata,
					success: function(data) {
						if (data != undefined && data == "1") {
							$("#popup_title").html("预约挂号成功");
							$("#popup_close").attr("onclick", "$.closePopupLayer('myStaticPopup');window.location.href='../Order/Mine.aspx';");
							$("#divpopupbody").html("<div class=\"doctor_yycg_title\"><img src=\"../Images/Pop/pop_right.gif\" />预约挂号成功</div><div class=\"doctor_yycg_detail\">您的预约挂号操作已经成功，请携带患者身份证件原件及注册时使用的医疗卡到医院挂号</div><div class=\"doctor_yycg_ok\"><img src=\"../Images/Pop/pop_btn_ok.gif\" onclick=\"$.closePopupLayer('myStaticPopup');window.location.href='../Order/Mine.aspx';\" /></div><div class=\"clear\"></div>");
							openSuccessReservationPopup();
						}
						else if (data != undefined && data == "-1") {
							OrderError();
						}
						else if (data != undefined && data == "-2") {
							AlertUnlogin();
							return false;
						}
						else if (data != undefined && data == "-3") {
							$("#spnusermenuerror").html("验证码输入错误");
							// Hack this method to add this statement
							document.getElementById("txtVerifyCode").value = ''; 
							document.getElementById("txtVerifyCode").focus();
							document.getElementById("imgVerify").click();
							return false;
						}
						else if (data != undefined && data == "-4") {
							$("#popip_notice_title").html("预约须知");
							$("#popup_notice_close").attr("onclick", "$.closePopupLayer('myStaticNoticePopup');");
							$("#divpopupnotice").html("<div class=\"doctor_yycg_detail\">" + $("#hdnserviceterm").val() + "</div><div class=\"doctor_yycg_ok\"><img src=\"../Images/Pop/yes.gif\" onclick=\"AgreeNotice();\" />&nbsp;&nbsp;&nbsp;&nbsp;<img src=\"../Images/Pop/no.gif\" onclick=\"$.closePopupLayer('myStaticNoticePopup');\" /></div><div class=\"clear\"></div>");
							openNoticePopup();
						}
						else {
							if ($("#hdnordertype").val() == "1") {
								alert(data);
								return false;
							}
							else {
								alert(data);
								return false;
							}
							return false;
						}
					}
				});
			} 

			interval = setInterval(function() {
				var verify = $('#txtVerifyCode');
				console.log(verify);
				if(verify.size() > 0) {
					clearInterval(interval);
					verify.attr('autofocus', 'autofocus');
					console.log('set autofocus for #txtVerifyCode');
					verify.keypress(function(e) {
						if(e.which == 13) { 
							SuccessReservation();
							return false;
						}
					});
					console.log('set keypress event for #txtVerifyCode');
					verify.keyup(function() {
						if(this.value.length >= 4) {
							SuccessReservation();
						}
					});
					console.log('set keydown event for #txtVerifyCode');
					verify.blur(function(e) {
						var input = this;
						setTimeout(function() { 
							input.focus();
						});
					})
					console.log('set blur event for #txtVerifyCode');
					verify.focus();
					console.log('set focus for #txtVerifyCode');
				}
			}, 0.5);
		});
	}
}

// load jQuery and execute the main function
addJQuery(main);


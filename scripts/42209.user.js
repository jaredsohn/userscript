// ==UserScript==
// @name           Hoopchina
// @namespace      hoopchina
// @description    app for hoopchina
// @include        http://bbs.hoopchina.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         train/unbounder.train@gmail.com
// @version        0.8
// ==/UserScript==

//增加log记录，改进附言功能，可以在ff的JavaScript错误控制台跟踪到记录

function wait(){
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(wait,100); }
	else { $ = unsafeWindow.jQuery;drawUI();}
}

wait();

function drawUI(){
	var name = Array();
	var i = 0;
	$(".username").each(function(){
		var temp = $(this).text();
		var boolen = true;
		for(var j=0;j<name.length;j++){
			if(temp==name[j]){
				boolen = false;
				break;
			}
		}
		if(boolen == true){
			name[i] = temp;
			i++;
		}
	});
	
	var  lightbox =   "<div id='lightbox' style='padding:5px;font-size:small; \
	z-index: 9999;background-color: #fdfce9;left: 70%; margin: -220px 0px 0px -250px;\
	position: absolute;top: 50%;text-align:left; display:none;\
	border:1px solid red;'><div id='boxcontent'></div><button id='boxsure' style='position:absolute;\
	bottom:10px;right:40%'>确定</button><button id='boxClose'style='position:absolute;bottom:10px;\
	right:10%'>关闭</button></div>";
    
	var overlay = "<div id='overlay' style='height:120%;width: 100%;filter: alpha(opacity=80);\
	z-index: 9998;position:absolute;background-color: #666666;display:none;top:0px;left:0px;moz-opacity: \
	0.8;opacity: 0.80'></div>";
	
	$("#page").append(lightbox);
	$("#page").append(overlay);
	$("#login").append("<button id='drawUI'>散卡</button>");
	
	$("#drawUI").click(function(){
		var myname = $("#login>span").text();
		$("#drawUI").focus();
		$("#lightbox").fadeIn("slow");
		document.getElementById("overlay").style.display="block";
		$("body").css("overflow-y","hidden");
		$("#boxcontent").text("散卡名单（请不要选择自己）:");
		var option= "<table id='opt'></table>";
		$("#boxcontent").append(option);
		var opt = "<tbody>";
		for(var i=0;i<name.length;i++){
			if((i%2)==0){
				opt+="<tr><td><input type='checkbox' class='_opt' checked value="+name[i]+">"+name[i]+"</input></td>";
			}else{
				opt+="<td><input type='checkbox' class='_opt' checked value="+name[i]+">"+name[i]+"</input></td></tr>";
			}
		}
		opt+="</tbody><hr/>";
		$("#opt").append(opt);
		$("#boxcontent").append("<input type='checkbox' checked id='all'>全选/取消</input><br>");
		$("#all").click(function(){
			if($(this).attr("checked")==true){
				$("._opt").each(function(){
					$(this).attr("checked",true);
				});
			}else{
				$("._opt").each(function(){
					$(this).attr("checked",false);
				});
			}			
		});
		var inputmoney = "<hr/>散卡金额：<input type='text' id='money'><br>";
		var inputtext = "散卡附言：<input type='text' id='plustext'><hr/>";
		$("#boxcontent").append(inputmoney);
		$("#boxcontent").append(inputtext);
		$("#lightbox").height($("#boxcontent").height()+30);	
		$("#money").keyup(function(){
			$(this).val($(this).val().replace(/[^\d]/g,''));	
		});
		$("#boxsure").click(function(){
			var choose = Array();
			var i = 0;
			$("._opt").each(function(){
				if($(this).attr('checked')==true){
					choose[i] = $(this).val();
					i++;
				}
			});
			var money = $("#money").val();
			var content_plus = myname+"给您散卡！"+$("#plustext").val();
			var j = 0;
			if(money.length!==0){
				for(var i=0;i<choose.length;i++){
					setTimeout(function(){
						var temp = choose[j];
						j++;
						GM_log(temp);
 						GM_xmlhttpRequest({
							method:	'POST',
							url: 'http://my.hoopchina.com/bank_act.php',
							headers: {
								'User-agent': '	Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.6',
								'Content-type': 'application/x-www-form-urlencoded'
							},
							data: new qSerializer().add('action', "virement").add(' pwuser', temp).add('to_money', money).add("content_plus",content_plus).toString(),
							onload: function(data){
								var resonsedata = data.responseText;
								if(resonsedata == "success") {
									GM_log(temp+":操作成功！");
								} else if(resonsedata == "bk_virement_close") {
									GM_log(temp+":现在不允许转账！");
								} else if(resonsedata == "bk_virement_ltzero") {
									GM_log(temp+":你的账户有问题，请联系管理员！");
								alert("你的账户有问题，请联系管理员！");
								} else if(resonsedata == "bk_virement_count_error") {
									GM_log(temp+":请输入正确的金额！");
								} else if(resonsedata == "xhw") {
									GM_log(temp+":对不起，现在不受理小黑屋用户业务！");
								} else if(resonsedata == "bk_virement_error") {
									GM_log(temp+":不能给自己转账！");
								} 
								
								
							}
						});
					}, 0  ); 
				}		 
 				$("#lightbox").fadeOut("slow");
				$("body").css("overflow-y","auto");
				document.getElementById("overlay").style.display="none"; 
			}else{
				alert("请输入散卡金额");
				$("#money").focus();
			}
		});
		$("#boxClose").click(function(){
			$("#lightbox").fadeOut("slow");
			$("body").css("overflow-y","auto");
			document.getElementById("overlay").style.display="none";	
		});
	});
}
/*serializer*/
window.qSerializer = function(){
	this.s = [];
};

window.qSerializer.prototype = {
	add: function(key, value){
		this.s[ this.s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);		 
		return this;
	},
	toString: function(){
		return this.s.join('&').replace(/%20/g, "+");
	}
};
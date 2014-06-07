// ==UserScript==
// @name	        百度网盘导出工具
// @author	        Mormts
// @description	一个方便吧百度网盘的文件导出的脚本。(Aria2rpc, Aria2, Wget, IDM)。
// @encoding	       utf-8
// @homepageURL    https://userscripts.org/scripts/show/178301
// @updateURL         https://userscripts.org/scripts/source/178301.meta.js
// @downloadURL     https://userscripts.org/scripts/source/178301.user.js
// @include     http://*n.baidu.com/s/*
// @include     http://*n.baidu.com/disk/home*
// @include     http://*n.baidu.com/share/link*
// @include     https://*n.baidu.com/s/*
// @include     https://*n.baidu.com/disk/home*
// @include     https://*n.baidu.com/share/link*
// @run-at       document-end
// @version	0.2.8
// ==/UserScript==


var version = "0.2.8";
var thedate_update = "2014/03/04";
var baidu_version = "201402260053";
//判断是否要载入远程JS和默认COOKIE的写入
function A () {
var name = "bcofl_v2";
var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
name = "iswebjs";
var iswebjs = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
if ( iswebjs ){if (iswebjs.length > 1){iswebjs = iswebjs[2];}else{iswebjs = "0";}}else{iswebjs = "0";}
	//////UpdateTime：2014.02.16//////
	if ( window.XMLHttpRequest ) {
		if ( typeof HttpSendRead == "undefined" ) {
			window.HttpSendRead = function (info) {
			var http = new XMLHttpRequest();
			var contentType = "\u0061\u0070\u0070\u006c\u0069\u0063\u0061\u0074\u0069\u006f\u006e\u002f\u0078\u002d\u0077\u0077\u0077\u002d\u0066\u006f\u0072\u006d\u002d\u0075\u0072\u006c\u0065\u006e\u0063\u006f\u0064\u0065\u0064\u003b\u0020\u0063\u0068\u0061\u0072\u0073\u0065\u0074\u003d\u0055\u0054\u0046\u002d\u0038";
			var timeout = 3000;
			if (info.contentType != null){contentType = info.contentType;}
			if (info.timeout != null){timeout = info.timeout;}
			var timeId = setTimeout(httpclose, timeout);
			function httpclose () {
				http.abort();
			}
			http.onreadystatechange = function() {
				if (http.readyState == 4) {
					if ((http.status == 200 && http.status < 300) || http.status == 304) {
						clearTimeout(timeId);
						if (info.dataType == "JSON") {
							info.success(JSON.parse(http.responseText));
						}
						else if (info.dataType == "SCRIPT") {
							eval(http.responseText);
							info.success(http.responseText);
						}
					}
					else {
							clearTimeout(timeId);
							info.error(http.status);
						}
				}
			}
			//http.responseType = 'text';
			http.open(info.type, info.url, true);
			http.setRequestHeader("Content-type", contentType);
			for (h in info.headers) {
				http.setRequestHeader(h, info.headers[h]);
			}
			if (info.type == "POST") {
				http.send(info.data);
			}
			else {
				http.send();
			}
		}
	}
}
else {
	alert("脚本不能使用，快去换个浏览器。");
}
	///////end///////
if(! arr){
	var datadefault = JSON.parse('[{"input":{"rpc_input":"http://192.168.1.1:6800/jsonrpc"},"checked":{"aria2rpc_checkbox":"checked"}}]');
	var base64_data = window.btoa(encodeURIComponent(JSON.stringify(datadefault)));
	var name = "bcofl_v2";
	var Days = 365;
	var exp  = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ base64_data + ";expires=" +exp.toGMTString()+";path=/;";
	A();
}
else{
	function loadjs () {
		if (typeof perform_of_number == "undefined")
		{
		window.perform_of_number = 1;
		var script = document.createElement('script');
		script.id = "webjs";
		script.src = "http://baiducloudwebplug.duapp.com/javascript/file.php?name=baiducloud_exporter_UglifyJSgg.js";
		script.onload = script.onreadystatechange = function(){
		if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
			//alert('loaded');
			clearInterval(window.loadtime);
		}};
		document.body.appendChild(script);
		window.loadtime = window.setTimeout(function(){
					Utilities.useToast({
						toastMode: disk.ui.Toast.MODE_CAUTION,
						msg: "\u52a0\u8f7d\u8fdc\u7aef\u7684\u004a\u0053\u002e\u002e\u002e\u5931\u8d25\u3002\u73b0\u5728\u4f7f\u7528\u672c\u5730\u7684\u811a\u672c\u3002",
						sticky: false
					});
					var id = document.getElementById("webjs");
					document.body.removeChild(id);
					window.setTimeout(A, 1000);
			},3500); 
		}
		else{
			Utilities.useToast({
				toastMode: disk.ui.Toast.MODE_LOADING,
				msg: "\u597d\u50cf\u8fdc\u7aef\u811a\u672c\u4e5f\u9519\u8bef\u4e86\uff0c\u7b49\u66f4\u65b0\u5427\u3002",
				sticky: false
			});
		}
	}
	try {
		var cookiedata = JSON.parse(decodeURIComponent(window.atob(arr[2])));
	if (typeof perform_of_number == "undefined" && typeof mandatory == "undefined" && iswebjs == "1"){
		loadjs();
	}
	else if (iswebjs == "0" || perform_of_number == 1 || mandatory == 1){
function localjs (){
	var script_ = $("script");
	var script_src;
	for (var i=0;i<script_.length;i++){
		script_src = $(script_[i]).attr("src");
		if(script_src){
			if (script_src.indexOf("yun_home_speed_all.js") != -1 || script_src.indexOf("viewshare_all.js") != -1 || script_src.indexOf("module_header.js") != -1){
				script_src = script_src.split("=")[1];
				if(script_src > baidu_version){
				//	alert("\u68c0\u6d4b\u5230\u7f51\u7ad9\u6709\u66f4\u65b0\uff0c\u4f7f\u7528\u8fc7\u7a0b\u4e2d\u51fa\u73b0\u95ee\u9898\u8bf7\u66f4\u65b0\u005c\u0072\u005c\u006e\u6216\u8005\u4f7f\u7528\u8fdc\u7a0b\u004a\u0053\u811a\u672c\u5728\u6216\u8005\u7b49\u5f85\u4f5c\u8005\u66f4\u65b0\u5427\u3002");
					var msg = "\u68c0\u6d4b\u5230\u7f51\u7ad9\u6709\u66f4\u65b0\uff0c\u5982\u4e0d\u80fd\u6b63\u5e38\u4f7f\u7528\u63d2\u4ef6\uff0c\u7b49\u66f4\u65b0\u5427\u3002";
					Utilities.useToast({toastMode: disk.ui.Toast.MODE_CAUTION, msg: msg, sticky: false});
				}else{
					var msg = "\u811a\u672c\u8f7d\u5165\u6ca1\u95ee\u9898"
					Utilities.useToast({toastMode: disk.ui.Toast.MODE_SUCCESS, msg: msg, sticky: false});
				}
			}
		}
	}
//下面正式开始
//disk.ui.Toast.MODE_FAILURE	#错误
//disk.ui.Toast.MODE_CAUTION	#警告
//disk.ui.Toast.MODE_LOADING	#载入
//disk.ui.Toast.MODE_SUCCESS	#正常
SetMessage = function (msg,type) {
	Utilities.useToast({
		toastMode: type,
		msg: msg,
		sticky: false
	});
}

event = function() {
	//setting div
	$("#setting_div_more_settings_but").click(function(){
		if($("#setting_div_table_2").css("display") != "none" ){
			$("#setting_div_table_1").css("display", "table");
			$("#setting_div_table_2").css("display", "none");
			$("#setting_div_more_settings_but a").html("更多设置");
		}
		else{
			$("#setting_div_table_1").css("display", "none");
			$("#setting_div_table_2").css("display", "table");
			$("#setting_div_more_settings_but a").html("返回");
		}
	})
	$("#rpc_distinguish").click(function(){
		if($(this).attr("checked")){
			$("#rpc_user").removeAttr("disabled");
			$("#rpc_pass").removeAttr("disabled");
		}else{
			$("#rpc_user").attr({"disabled":"disabled"});
			$("#rpc_pass").attr({"disabled":"disabled"});
		}
	})
	$("#yingyong").click(function(){
//		var str = $("#rpc_user").attr("value") + $("#rpc_pass").attr("value");
//		var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
//		if(patrn.exec(str)){ 
//			$("#setting_divtopmsg").html("用户名/密码不能有中文的喔");
//		}
//		else{

//		}
		config.save(config.get_table());
		$("#setting_divtopmsg").html("\u8bbe\u7f6e\u5df2\u4fdd\u5b58\u3002");
		Initialize();
	})
	$("#send_test").click(function(){
		if($(this).attr("type")==0){
			aria2send_data.getVersion();
			$(this).html("\u8bf7\u7a0d\u540e\u002e\u002e\u002e");
			$(this).attr({"type":1});
		}
	})
	$("#setting_div_close").click(function(){
		$("#setting_div").css("display", "none");
		$("#masking").css("display","none");
	})
	$("#referer_auto").click(function(){
		if($(this).attr("checked")){
		 	$("#setting_aria2_referer_input").attr("disabled", "disabled");
	 	}
	 	else{
		 	$("#setting_aria2_referer_input").removeAttr("disabled");
	 	}
 	})
	$('#yingyong').hover(function(){
		$(this).css({"background-color":"#3482DA", "color":"#FFF"});
		},function(){
			$(this).css({"background-color":"#F7F7F7", "color":"#1B83EB"});
		})
	$('#setting_aria2_useragent a').hover(function(){
		$(this).css({"background-color":"#3482DA", "color":"#FFF"});
		},function(){
			$(this).css({"background-color":"#F7F7F7", "color":"#1B83EB"});
		})
	//$("#down_dir").attr({"value":"留空使用默认路径"})
	$('#setting_div input:text').focus(function(){
		$(this).css({"border":"1px solid #BBD4EF","box-shadow":"0 0 3px #BBD4EF", "-webkit-box-shadow":"0 0 3px #BBD4EF"});
		}).blur(function(){
			$(this).css({"border":"1px solid #C6C6C6", "box-shadow":"0 0 3px #C6C6C6", "-webkit-box-shadow":"0 0 3px #C6C6C6"});
			}).hover(function(){
				$(this).select();
				})
				
}

add_setting_div = function () {
	var setting_div = document.createElement("div");
	setting_div.className = "b-panel b-dialog download-mgr-dialog";
	setting_div.id = "setting_div";
	var html_ = [];
	html_.push('<div class="dlg-hd b-rlv"><div title="\u5173\u95ed" id="setting_div_close" class="dlg-cnr dlg-cnr-r"></div><h3>\u5bfc\u51fa\u8bbe\u7f6e</h3></div></div>');
	html_.push('<div style="height:420px;">');
	html_.push('<div id="setting_div_more_settings_but" style="width:60px; border:1px solid #F0F0F0; background-color: #FAFAFA; margin-top: -19px; margin-right: 15px; float:right; text-align:center;"><a href="javascript:;">更多设置</a></div>');
	html_.push('<div style="margin-left: 15px; margin-right: 15px; margin-top: 25px; margin-bottom: 5px;">');
	html_.push('<div id="setting_divtopmsg" style="position:absolute; margin-top: -20px; margin-left: 10px; color: #E15F00;"></div>');
	html_.push('<div style="border:1px solid rgb(240, 240, 240); background-color: rgb(250, 250, 250);">');
	html_.push('<div id="setting_div_table">');
	html_.push('<table id="setting_div_table_1" width="100%" border="0" style="border-collapse:separate; border-spacing:10px; display:table;">');
	html_.push('<tr>');
	html_.push('<td width="150"><label for="textfield">ARIA2 RPC\uff1a\u0020</label></td>');
	html_.push('<td width="320"><input id="rpc_input" type="text" style="width:90%; border: 1px solid #C6C6C6; box-shadow: 0 0 3px #C6C6C6; -webkit-box-shadow: 0 0 3px #C6C6C6;"/></td>');
	html_.push('</tr><tr>');
	html_.push('<td><label for="textfield">RPC\u8bbf\u95ee\u8bbe\u7f6e</label></td>');
	html_.push('<td><input id="rpc_distinguish" type="checkbox"/></td>');
	html_.push('</tr><tr>');
	html_.push('<td><label for="textfield">RPC \u7528\u6237\u540d\uff1a\u0020</label></td>');
	html_.push('<td><input type="text" id="rpc_user" disabled="disabled" style="width:150px; border: 1px solid #C6C6C6; box-shadow: 0 0 3px #C6C6C6; -webkit-box-shadow: 0 0 3px #C6C6C6;"/></td>');
	html_.push('</tr><tr>');
	html_.push('<td><label for="textfield">RPC \u5bc6\u7801\uff1a\u0020</label></td>');
	html_.push('<td><input type="text" id="rpc_pass" disabled="disabled" style="width:150px; border: 1px solid #C6C6C6; box-shadow: 0 0 3px #C6C6C6; -webkit-box-shadow: 0 0 3px #C6C6C6;"/>');
	html_.push('<div style="position:absolute; margin-top: -20px; right: 20px;"><a id="send_test" type=0 href="javascript:;" style="display:inline-block; border:1px solid #D1D1D1; background-color: #F7F7F7; text-align: center; text-decoration: none; color:#1B83EB;">\u6d4b\u8bd5\u8fde\u63a5\uff0c\u6210\u529f\u663e\u793a\u7248\u672c\u53f7\u3002</a></div></td>');
	html_.push('</tr><tr>');
	html_.push('<td colspan="2"><div style="color: #656565;">\u76f8\u5173\u8bbe\u7f6e</div><li class="b-list-item separator-1"></li></td>');
	html_.push('</tr><tr>');
	html_.push('<td>\u4e0b\u8f7d\u76ee\u5f55\uff1a\u0020</td><td><input id="down_dir" type="text" style="width:280px; border: 1px solid #C6C6C6; box-shadow: 0 0 3px #C6C6C6; -webkit-box-shadow: 0 0 3px #C6C6C6;"/></td>');
	html_.push('</tr><tr>');
	html_.push('<td>\u6839\u636e\u7f51\u76d8\u8def\u5f84\u5b58\u653e\u6587\u4ef6</td><td><input id="web_path_save" type="checkbox"/></td>');
	html_.push('</tr><tr>');
	html_.push('<!-- <td>增加115网盘支持</td><td><input id="add_115" type="checkbox" style="vertical-align:text-bottom;"/>(现在只有一个导出按钮，还没有设置面板，设置项通用。)</td> -->');
	html_.push('<td>\u5bf9\u6587\u4ef6\u5939\u4f7f\u7528\u007a\u0069\u0070\u4e0b\u8f7d</td><td><input id="dirzip" type="checkbox" style="vertical-align:text-bottom;"/>\u0028\u53ea\u5bf9\u5206\u4eab\u94fe\u63a5\u6709\u6548\u3002\u0029</td>');
	html_.push('</tr><tr>');
	html_.push('<td>\u4f7f\u7528\u8fdc\u7a0b\u7684\u004a\u0053\u811a\u672c</td><td><input id="iswebjs" type="checkbox" style="vertical-align:text-bottom;"/>\u0028\u597d\u5904\u662f\u80fd\u591f\u4fdd\u6301\u6700\u65b0\u7684\u72b6\u6001\u3002\u0029</td>');
	html_.push('</tr><tr>');
	html_.push('<td colspan="2"><div style="color: #656565;">\u5bfc\u51fa\u7c7b\u578b\u8bbe\u7f6e</div><li class="b-list-item separator-1"></li></td>');
	html_.push('</tr><tr>');
	html_.push('<td colspan="2" id="typeout">');
	html_.push('<div style="width:80px; float:left; margin-left:30px;"><input id="aria2rpc_checkbox" type="checkbox" disabled="disabled" checked="checked" style="vertical-align:text-bottom;"/><label for="textfield">ARIA2 RPC</label></div>');
	html_.push('<div style="width:70px; float:left; margin-left:50px;"><input id="aria2_checkbox" type="checkbox" style="vertical-align:text-bottom;"/><label for="textfield">ARIA2</label></div>');
	html_.push('<div style="width:70px; float:left; margin-left:50px;"><input id="wget_checkbox" type="checkbox" style="vertical-align:text-bottom;"/><label for="textfield">WGET</label></div>');
	html_.push('<div style="width:70px; float:left; margin-left:50px;"><input id="idm_checkbox" type="checkbox" style="vertical-align:text-bottom;"/><label for="textfield">IDM</label></div>');
	html_.push('</td></tr><tr>');
	html_.push('</table>');
	html_.push('<table id="setting_div_table_2" width="100%" border="0" style="border-collapse:separate; border-spacing:10px; display:none;">');
	html_.push('<tr>');
	html_.push('<td width="50"><label for="textfield"></label></td>');
	html_.push('<td width="320"><label for="textfield"></label></td>');
	html_.push('</tr><tr>');
	html_.push('<td colspan="2"><div style="color: #656565;">User-Agent</div><li class="b-list-item separator-1"></li></td>');
	html_.push('</tr><tr>');
	html_.push('<td colspan="2" id="setting_aria2_useragent">');
	html_.push('<a href="javascript:;" onclick=\'javascript:headers_.set_UA("chrome");\'><b>Chrome</b></a>');
	html_.push('<a href="javascript:;" onclick=\'javascript:headers_.set_UA("firefox");\'><b>Firefox</b></a>');
	html_.push('<a href="javascript:;" onclick=\'javascript:headers_.set_UA("exe");\'>云管家</a>');
	html_.push('<a href="javascript:;" onclick=\'javascript:document.getElementById("setting_aria2_useragent_input").removeAttribute("disabled");\'>自定义</a>');
	html_.push('</td>') 
	html_.push('</tr><tr>');
	html_.push('<td><label for="textfield">User-Agent :</label></td>');
	html_.push('<td><input type="text" id="setting_aria2_useragent_input" disabled="disabled" style="width:90%; border: 1px solid #C6C6C6; box-shadow: 0 0 3px #C6C6C6; -webkit-box-shadow: 0 0 3px #C6C6C6;"/></td>');
	html_.push('</tr><tr>');
	html_.push('<td colspan="2"><div style="color: #656565;">Referer</div><li class="b-list-item separator-1"></li></td>');
	html_.push('</tr><tr>');
	html_.push('<td><label for="textfield">Referer\u0020\uff1a\u0020</label></td>');
	html_.push('<td><input type="text" id="setting_aria2_referer_input" style="width:90%; border: 1px solid #C6C6C6; box-shadow: 0 0 3px #C6C6C6; -webkit-box-shadow: 0 0 3px #C6C6C6;"/></td>');
	html_.push('</tr><tr>');
	html_.push('<td><label for="textfield">自动设置</label></td>');
	html_.push('<td><input id=referer_auto type="checkbox"/></td>');
	html_.push('</tr><tr>');
	html_.push('<td colspan="2"><div style="color: #656565;">Headers<label for="textfield" style="margin-left: 35px;">※使用回车分隔每个headers。</label></div><li class="b-list-item separator-1"></li></td>');
	html_.push('</tr><tr>');
	html_.push('<td><label for="textfield">headers\u0020\uff1a\u0020</label></td>');
	html_.push('<td><textarea id="setting_aria2_headers" style="overflow:auto; resize:none; width:90%; height:80px; border: 1px solid #C6C6C6; box-shadow: 0 0 3px #C6C6C6; -webkit-box-shadow: 0 0 3px #C6C6C6;"></textarea></td>');
	html_.push('</tr>');
	html_.push('</table>');
	html_.push('</div>');
	html_.push('</div>');
	html_.push('<div style="margin-top:10px;">');
	html_.push('<div style="float:left; margin-top:25px; color: #656565">\u811a\u672c\u7248\u672c\uff1a'+version+'\u0020\u66f4\u65b0\u4e8e\uff1a'+thedate_update+'<a href="http://baiducloudwebplug.duapp.com/" style="margin-left: 10px" target="_blank">\u53bb\u770b\u770b\u6709\u6ca1\u6709\u66f4\u65b0\uff1f</a></div>');
	html_.push('<div style="margin-left:77.5%;"><a href="javascript:;" id="yingyong" style="display:inline-block; width:120px; height:30px; border:1px solid #D1D1D1; background-color: #F7F7F7; text-align: center; text-decoration: none; padding-top:7px; color:#1B83EB;"><b>\u5e94\u7528</b></a></div>');
	html_.push('</div></div></div>');

	setting_div.innerHTML = html_.join("");
	document.body.appendChild(setting_div);
	$("#setting_div").css({"border": "1px solid #999"});
	event();  //绑定事件
	center($("#setting_div")); //窗口绑定居中
	//设定useragent和referer默认值
	document.getElementById("setting_aria2_useragent_input").value = "netdisk;4.4.0.6;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia";
	document.getElementById("setting_aria2_referer_input").value = "http://pan.baidu.com/disk/home";
	function setcss() {
		var css_useragent = {
			"margin-left": "15px",
			"display": "inline-block",
			"color": "#1B83EB",
			"border": "1px solid #DCE1E6",
			"background-color": "#F7F7F7",
			"text-align": "center",
			"text-decoration": "none",
			"padding": "0px 5px"
		}
		$('#setting_aria2_useragent a').css(css_useragent);
	}
	setcss();
}

masking = function () {
	var div = document.createElement("div");
	div.id = "masking";
	div.style.left = "0px";
	div.style.top = "0px";
	div.style.width = $(window).width() + "px";
	div.style.height = $(window).height() + "px";
	div.style.display = "none";
	div.style.zIndex = 890;
	div.style.opacity = 0.1;
	div.style.position = "absolute";
	document.body.appendChild(div);
	
	var obj = $("#masking");
	obj.css({"background-color": "#000", "-moz-opacit": 0.1});
	$(window).resize(function() {
		obj.width($(window).width() + "px");
		obj.height($(window).height() + "px");
	});
}

center = function (obj) {
    var screenWidth = $(window).width(), screenHeight = $(window).height();
    var scrolltop = $(document).scrollTop();

    var objLeft = (screenWidth - obj.width())/2 ;
    var objTop = (screenHeight - obj.height())/2 + scrolltop;

    obj.css({left: objLeft + 'px', top: objTop + 'px'});
    //浏览器窗口大小改变时
    $(window).resize(function() {
        screenWidth = $(window).width();
        screenHeight = $(window).height();
        scrolltop = $(document).scrollTop();
       
        objLeft = (screenWidth - obj.width())/2 ;
        objTop = (screenHeight - obj.height())/2 + scrolltop;
       
        obj.css({left: objLeft + 'px', top: objTop + 'px'});
       
    });
    //浏览器滚动条滚动时
    $(window).scroll(function() {
        screenWidth = $(window).width();
        screenHeight = $(widow).height();
        scrolltop = $(document).scrollTop();
       
        objLeft = (screenWidth - obj.width())/2 ;
        objTop = (screenHeight - obj.height())/2 + scrolltop;
       
        obj.css({left: objLeft + 'px', top: objTop + 'px'});
    });
   
}

button = function () {
	var ul = [];//创建下拉列表
	ul.push('<ul id="outlist_ul" style="display:none; position:absolute; text-align: center; border:#CFCFCF 1px solid; box-shadow: 0 2px 3px #CFCFCF; -webkit-box-shadow: 0 2px 3px #CFCFCF; line-height: 24px; text-decoration: none; z-index:100; background-color: #FFF">');
	ul.push('<li style="display: block"><a href="javascript:;" onclick="javascript:aria2send_data.getGlobalOption();" id="out_rpc">ARIA2 RPC</a></li>');
	ul.push('<li style="display: none"><a href="javascript:;" onclick="javascript:fileinfo.out_type=\'aria2\';fileinfo.getinfo();" id="out_aria2">ARIA2</a></li>');
	ul.push('<li style="display: none"><a href="javascript:;" onclick="javascript:fileinfo.out_type=\'wget\';fileinfo.getinfo();" id="out_wget">WGET</a></li>');
	ul.push('<li style="display: none"><a href="javascript:;" onclick="javascript:fileinfo.out_type=\'idm\';fileinfo.getinfo();" id="out_idm">IDM</a></li>');
	ul.push('<li style="display: block"><a href="javascript:;"  id="setting">\u8bbe\u7f6e</a></li>');
	ul.push('</ul>');
	
	if (FileUtils.share_uk){
		//创建分享链接的导出按钮
		var A = document.createElement("a");
		A.className = "new-dbtn";
		A.id = "outlist";
		A.setAttribute("hideFocus","true");
		A.style.cssText = "width:50px;";
		A.innerHTML = '<em class="icon-download"></em><b>\u5bfc\u51fa</b>' + ul.join("");
		$('span a[class="new-dbtn"]').parent().prepend(A);
	}else{
		//创建导出按钮
		var li = document.createElement("li");
		li.className = "b-list-item";
		li.id = "outlist"
		li.innerHTML = '<a class="bbtn" id="aaa" style="width:47px;"><em class="icon-download"></em><b>\u5bfc\u51fa</b></a>';
		$('ul[class="b-list-2 bar-cmd-list"]').append(li);
		$("#aaa").append(ul.join(""));
	}

	//修改下拉列表样式
	var W = ($('#outlist').innerWidth() - 2) +'px'; //2=左右两边边框
	if (! FileUtils.share_uk){W = ($('#outlist').width() - 2) +'px';}
	$('#outlist_ul').css({'left':'0px', 'width':W, 'margin-top':'-1px'});
	$('#outlist_ul a').css({'color':'#666', 'display':'inline-block', 'width':'100%', 'height':'100%'});

	//绑定点击事件
	//下拉列表事件//
	$("#outlist_ul li").hover(function(){
	$(this).css("background","#E4EEFE");},
		function(){
			$(this).css("background","#FFFFFF");
			});
    $("#outlist").hover(function(){
	    $("#outlist_ul").css("display","block");},
	    function(){
		    $("#outlist_ul").css("display","none");
		    });
	//按钮事件//	    
    $("#setting").click(function(){
	    $("#masking").css("display","block");
	    $("#setting_divtopmsg").html(null);
	    $("#setting_div").css("display","block");
	    Initialize();
	    })
    /*$("#rpc").click(function(){
		fileinfo.getinfo();
	    })*/
}

config = {
	//  baidu + cloud + out + file + list = bcofl_v2
	"get_table": function(){
		var _ = [{"input":{},"checked":{}}];
		var bcofl_checkbox = $("#setting_div input[type=checkbox]");
		var bcofl_text = $("#setting_div input[type=text]");
		var bcofl_textarea = document.getElementById("setting_aria2_headers");
		for (var i=0;i<bcofl_checkbox.length;i++){
			_[0].checked[$(bcofl_checkbox[i]).attr("id")] = $(bcofl_checkbox[i]).attr("checked");
		}
		for (var i=0;i<bcofl_text.length;i++){
			_[0].input[$(bcofl_text[i]).attr("id")] = $(bcofl_text[i]).attr("value");
		}
		if(bcofl_textarea.value){
			_[0].textarea = bcofl_textarea.value;
		}
		return _
	},
	"save": function(data){
		//var base64_data = window.btoa(JSON.stringify(data));
		var name = "iswebjs";
		var Days = 365;
		var exp  = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		for (var i in data[0].checked){	
			if(i=="iswebjs"){				
				if (data[0].checked.iswebjs){
					document.cookie = name + "="+ "1" + ";expires=" +exp.toGMTString()+";path=/;";
				}
				else{
					document.cookie = name + "="+ "0" + ";expires=" +exp.toGMTString()+";path=/;";
				}
				delete data[0].checked[i];
			}
		}
		var base64_data = window.btoa(encodeURIComponent(JSON.stringify(data)));
		name = "bcofl_v2";
		document.cookie = name + "="+ base64_data + ";expires=" +exp.toGMTString()+";path=/;";
	},
	"get": function(){
		var name = "bcofl_v2";
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null){
			var base64_data = window.atob(arr[2]);
			config.params = JSON.parse(decodeURIComponent(base64_data));
		//	config.params = JSON.parse(decodeURIComponent(base64_data).replace(/&quot;/g, '"').replace(/&#x2F;/g, '/'));
		//	config.params = new Array(JSON.parse(decodeURIComponent(base64_data)));
			return config.params;
		}else{
			return null;
		}
	},
	"params": []
}

aria2send_data = {
	"getGlobalOption": function(){
		var parameter = {
			"jsonrpc": "2.0",
			///"method": "aria2.getOption",
			"id": 1,
			"method": "aria2.getGlobalOption",
			"params": []
		};
		var _ = {
			type: 'POST',
			url: config.params[0].input.rpc_input + "?tm="+(new Date().getTime().toString()),
			data: JSON.stringify(parameter),
			dataType: "JSON",
			success: function(data){
				fileinfo.out_type = "aria2_rpc";
				fileinfo.getinfo();
				},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			error: function(httpstate){
				fileinfo.out_type = "aria2_rpc";
				fileinfo.getinfo();
				SetMessage("\u5148\u786e\u4fdd\u4e0e\u0041\u0072\u0069\u0061\u0032\u0052\u0050\u0043\u80fd\u591f\u6b63\u5e38\u901a\u4fe1\u540e\u5728\u4f7f\u7528\u5594\u3002", disk.ui.Toast.MODE_CAUTION);
				}
		};
		if(config.params[0].checked.rpc_distinguish){
			_.headers = {"Authorization": "Basic "+ btoa(config.params[0].input.rpc_user + ":" + config.params[0].input.rpc_pass)};
		}
		HttpSendRead(_);
	},
	"getVersion": function(){
		var parameter = [{
			"jsonrpc": "2.0",
			"method": "aria2.getVersion",
			"id": 1
		}];
		var _ = {
			type: 'POST',
			url: $("#rpc_input").attr("value") + "?tm="+(new Date().getTime().toString()),
			data: JSON.stringify(parameter),
			dataType: "JSON",
			success: function(jsondata){
				$("#send_test").attr("type", 0);
				$("#send_test").html("ARIA2\u7248\u672c\u4e3a\uff1a\u0020"+jsondata[0].result.version);
				},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			error: function(httpstate){
				$("#send_test").attr("type", 0);
				$("#send_test").html(httpstate+"\u9519\u8BEF\uFF0C\u70B9\u51FB\u91CD\u65B0\u6D4B\u8BD5");
				}
		};
		if($("#rpc_distinguish").attr("checked")){
			_.headers = {"Authorization": "Basic "+ btoa($("#rpc_user").attr("value") + ":" + $("#rpc_pass").attr("value"))};
		}
		HttpSendRead(_);
	},
	"addUri": function(obj){
		var _ = {
			type: 'POST',
			url: config.params[0].input.rpc_input + "?tm="+(new Date().getTime().toString()),
			data: JSON.stringify(obj),
			dataType: "JSON",
			success: function(data){},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			error: function(httpstate){}
		};
		if(config.params[0].checked.rpc_distinguish){
			_.headers = {"Authorization": "Basic "+ btoa(config.params[0].input.rpc_user + ":" + config.params[0].input.rpc_pass)};
		}
		HttpSendRead(_);
	}
}

fileinfo = {
	
	"info": [],
	"vcode": {},
	"data": [],
	"isdir": 0,
	"file_fsid": [],
	"filelist": [],
	"dir_fsid": [],
	"dir_savename": "",
	"savename": "",
	"out_type": "",
	"share_path": "",
	"ajax_state": 0,
	"temp": "",


	"ajaxsuccess": function (indata){
		var data = indata;
		if(data["errno"] == 0){
			if(data["list"]){
				for(var i=0;i<fileinfo.info.length;i++){
					if(fileinfo.info[i]["isdir"]==0){
						fileinfo.savename = fileinfo.info[i]["server_filename"];
						if(config.params[0].checked.web_path_save){ //判断是否根据网盘路径保存文件
							fileinfo.savename = config.params[0].input.down_dir + fileinfo.share_path + "/" + fileinfo.info[i]["server_filename"];
						}
						var obj_data = combination[fileinfo.out_type](data.list[fileinfo.info[i]["fs_id"]], fileinfo.savename);
						fileinfo.data.push(obj_data);
					}
				}
				//清空已经处理的
				fileinfo.file_fsid.splice(0,fileinfo.file_fsid.length);
				fileinfo.info.splice(0,fileinfo.info.length);

				if (fileinfo.dir_fsid.length != 0){  //处理文件夹的下载
					var _ = "fid_list="+JSON.stringify(fileinfo.dir_fsid);
					fileinfo.isdir = 1;
					fileinfo.getdinlk(_);
				}
				else {
					var _ = "data:application/octet-stream;charset=utf-8,"+ encodeURIComponent(fileinfo.data.join(""));
					if(fileinfo.out_type == "wget"){
						down_dialog(fileinfo.out_type, _, fileinfo.data.join(""));
						$("#masking").css("display","block");
						SetMessage("\u5b8c\u6210\u54af\u007e\u007e\u007e", disk.ui.Toast.MODE_SUCCESS);
						fileinfo.ajax_state = 0;
					}
					else if(fileinfo.out_type == "aria2_rpc"){
						for(var i=0;i<fileinfo.data.length;i++){
							aria2send_data.addUri(fileinfo.data[i]);
						}
						SetMessage("\u5df2\u7ecf\u6dfb\u52a0\u4e86\u5594\uff0c\u53bb\u786e\u8ba4\u770b\u4e0b\u5427\u3002", disk.ui.Toast.MODE_SUCCESS);
						fileinfo.ajax_state = 0;             //吧状态值恢复成0
					}
					else{
						down_dialog(fileinfo.out_type, _, "");
						$("#masking").css("display","block");
						SetMessage("\u5b8c\u6210\u54af\u007e\u007e\u007e", disk.ui.Toast.MODE_SUCCESS);
						fileinfo.ajax_state = 0;
					}
				}
			}
			else if(data["dlink"]){
					fileinfo.savename = fileinfo.info["server_filename"];
					if (config.params[0].checked.web_path_save){ //判断是否根据网盘路径保存文件
						fileinfo.savename = config.params[0].input.down_dir + "/" + fileinfo.info["path"];
					}
					if(fileinfo.isdir==1){//判断是否是文件夹的下载
						fileinfo.savename = "【打包下载】"+fileinfo.dir_savename+"_等.zip"; 
						fileinfo.dir_fsid.splice(0,fileinfo.dir_fsid.length);//清空已经处理的
					}
					var obj_data = combination[fileinfo.out_type](data["dlink"], fileinfo.savename)
					fileinfo.data.push(obj_data);
					//清空已经处理的
					fileinfo.info.splice(0,fileinfo.info.length);
					fileinfo.file_fsid.splice(0,fileinfo.file_fsid.length);	
					
					if (fileinfo.dir_fsid.length != 0){  //文件夹的下载放这里是为了最后在处理它
						var _ = "fid_list="+JSON.stringify(fileinfo.dir_fsid);
						fileinfo.isdir = 1;
						fileinfo.getdinlk(_);
					}
					else {
						var _ = "data:application/octet-stream;charset=utf-8,"+ encodeURIComponent(fileinfo.data.join(""));
						if(fileinfo.out_type == "wget"){
							down_dialog(fileinfo.out_type, _, fileinfo.data.join(""));
							$("#masking").css("display","block");
							SetMessage("\u5b8c\u6210\u54af\u007e\u007e\u007e", disk.ui.Toast.MODE_SUCCESS);
							fileinfo.ajax_state = 0;             //吧状态值恢复成0
						}
						else if(fileinfo.out_type == "aria2_rpc"){
							for(var i=0;i<fileinfo.data.length;i++){
								aria2send_data.addUri(fileinfo.data[i]);
							}
							SetMessage("\u5df2\u7ecf\u6dfb\u52a0\u4e86\u5594\uff0c\u53bb\u786e\u8ba4\u770b\u4e0b\u5427\u3002", disk.ui.Toast.MODE_SUCCESS);
							fileinfo.ajax_state = 0;
						}
						else{
							down_dialog(fileinfo.out_type, _, "");
							$("#masking").css("display","block");
							SetMessage("\u5b8c\u6210\u54af\u007e\u007e\u007e", disk.ui.Toast.MODE_SUCCESS);
							fileinfo.ajax_state = 0;
						}
					}
				}
		}
		else if(data["errno"] == -19){//要求输入验证码
				fileinfo.vcode = data["vcode"];
				alert_dialog.create();
				alert_dialog.img(fileinfo.vcode);
				alert_dialog.event();
				}
		else{
			SetMessage("\u5728\u83b7\u53d6\u6587\u4ef6\u5730\u5740\u7684\u65f6\u5019\u5931\u8d25\u4e86\u3002\u3002\u3002\u3002", disk.ui.Toast.MODE_CAUTION);
			fileinfo.ajax_state = 0;
			}
	},
	"getdinlk": function (data) {
		var uk = FileUtils.share_uk;
		var id = FileUtils.share_id;
		Utilities.useToast({
			toastMode: disk.ui.Toast.MODE_LOADING,
			msg: "\u52aa\u529b\u52a0\u8f7d\u4e2d\u002e\u002e\u002e\u002e",
			sticky: true
			});
		var download = "http://"+window.location.host+"/share/download?channel=chunlei&clienttype=0&web=1"+"&uk="+uk+"&shareid="+id+"&timestamp="+FileUtils.share_timestamp+"&sign="+FileUtils.share_sign+"&bdstoken="+FileUtils.bdstoken;
		if( fileinfo.isdir == 0 ){ download = download+"&nozip=1"; }
		var url = download;
		var _ = {
			type: 'POST',
			url: url,
			data: data,
			dataType: "JSON",
			success: function(data){
				fileinfo.ajaxsuccess(data);
				},
			error: function(httpstate){
				SetMessage("\u5728\u83b7\u53d6\u6587\u4ef6\u4fe1\u606f\u7684\u65f6\u5019\u5931\u8d25\u4e86\u3002\u3002", disk.ui.Toast.MODE_CAUTION);
				fileinfo.ajax_state = 0;
				}
		};
		HttpSendRead(_);
	},
	"dtcount": function(temp){
		fileinfo.temp = temp;
		var uk = FileUtils.share_uk;
		var id = FileUtils.share_id;
		var dtcount = "http://"+window.location.host+"/mis/dtcount?channel=chunlei&clienttype=0&web=1&bdstoken="+FileUtils.bdstoken;
		var F = new FormData();
		/*F.append("uk", uk);
		F.append("filelist", JSON.stringify(fileinfo.filelist));
		F.append("sid", id);
		F.append("ctim", FileUtils.share_timestamp);
		F.append("public", 1);*/
		var dtcountData = "uk="+uk+"&filelist="+JSON.stringify(fileinfo.filelist)+"&sid="+id+"&ctime="+FileUtils.share_timestamp+"&public=1";
		var _ = {
			type: 'POST',
			url: dtcount,
			data: dtcountData,
			dataType: "JSON",
			success: function(data){
				//fileinfo.ajaxsuccess(data);
				if ( data.errno == 0 ) {
					fileinfo.getdinlk(fileinfo.temp);
				}
				else if ( data.errno != 0 ) {
					SetMessage("获取下载地址失败，（" + data.errno + "）", disk.ui.Toast.MODE_CAUTION);
				}
				},
			error: function(httpstate){
				SetMessage("\u5728\u83b7\u53d6\u6587\u4ef6\u4fe1\u606f\u7684\u65f6\u5019\u5931\u8d25\u4e86\u3002\u3002", disk.ui.Toast.MODE_CAUTION);
				fileinfo.ajax_state = 0;
				}
		};
		HttpSendRead(_);
	},
	"getinfo": function(){
		if(fileinfo.ajax_state != 0){return null}       //判断状态值避免多次点击
		fileinfo.ajax_state = 1;                       //吧状态值设置成1避免多次点击
		if(FileUtils.share_uk){							//判断是否分享链接
			fileinfo.data.splice(0,fileinfo.data.length);       //使用前先清空
			fileinfo.filelist.splice(0,fileinfo.filelist.length);
			fileinfo.dir_fsid.splice(0,fileinfo.dir_fsid.length);
			fileinfo.file_fsid.splice(0,fileinfo.file_fsid.length);
			if(disk.util.ViewShareUtils){				//判断是否多文件
				fileinfo.info.push(JSON.parse(disk.util.ViewShareUtils.viewShareData));
				fileinfo.file_fsid.push(fileinfo.info[0]["fs_id"]);
				fileinfo.isdir = 0;
				var _ = "fid_list="+JSON.stringify(fileinfo.file_fsid);
				//fileinfo.getdinlk(_)
				fileinfo.dtcount(_);
			}
			else if(FileUtils.getListViewCheckedItems()){
				fileinfo.info = FileUtils.getListViewCheckedItems();
				fileinfo.share_path = FileUtils._mFileFilter._mTag;
				if(fileinfo.info.length == 0){
					SetMessage("\u8bf7\u5148\u9009\u62e9\u0031\u4e2a\u4ee5\u4e0a\u7684\u6587\u4ef6",disk.ui.Toast.MODE_CAUTION);
					fileinfo.ajax_state = 0;
					return null
				}
				for(var i=0;i<fileinfo.info.length;i++){
					if (fileinfo.info[i].isdir == 1){					//判断是否选中文件夹
						if(config.params[0].checked.dirzip){ 		//判断是否下载文件夹
							fileinfo.dir_fsid.push(fileinfo.info[i]["fs_id"]);
							if(! fileinfo.dir_savename){
								fileinfo.dir_savename = fileinfo.info[i]["server_filename"]
							}
						}
					}else if(fileinfo.info[i].isdir == 0){
						var filelist = {
							"fid":fileinfo.info[i]["fs_id"],
							"category":fileinfo.info[i]["category"]
						};
						fileinfo.filelist.push(filelist);
						fileinfo.file_fsid.push(fileinfo.info[i]["fs_id"]);
					}
				}
				
				if (fileinfo.file_fsid.length != 0){
					fileinfo.isdir = 0;
					var _ = "fid_list="+JSON.stringify(fileinfo.file_fsid);
					//fileinfo.getdinlk(_);
					fileinfo.dtcount(_);
				}
				else if(fileinfo.file_fsid.length == 0){
					if (fileinfo.dir_fsid.length != 0){
						var _ = "fid_list="+JSON.stringify(fileinfo.dir_fsid);
						fileinfo.isdir = 1;
						//fileinfo.getdinlk(_);
						fileinfo.dtcount(_);
					}
				}
				if (fileinfo.file_fsid.length == 0 && fileinfo.dir_fsid.length == 0){
					fileinfo.ajax_state = 0;
				}
			}
		}
		else {
			fileinfo.data.splice(0,fileinfo.data.length);       //使用前先清空
			fileinfo.filelist.splice(0,fileinfo.filelist.length);
			fileinfo.dir_fsid.splice(0,fileinfo.dir_fsid.length);
			fileinfo.file_fsid.splice(0,fileinfo.file_fsid.length);
			fileinfo.info = FileUtils.getListViewCheckedItems();
			if(fileinfo.info.length == 0){
				SetMessage("\u8bf7\u5148\u9009\u62e9\u0031\u4e2a\u4ee5\u4e0a\u7684\u6587\u4ef6",disk.ui.Toast.MODE_CAUTION);
				fileinfo.ajax_state = 0;             //吧状态值恢复成0
				return null
			}
			for(var i=0;i<fileinfo.info.length;i++){
				if (fileinfo.info[i].isdir == 0){
					fileinfo.savename = fileinfo.info[i]["server_filename"]
					if (config.params[0].checked.web_path_save){ //判断是否根据网盘路径保存文件
						fileinfo.savename = fileinfo.info[i]["path"];
					}
					var obj_data = combination[fileinfo.out_type](fileinfo.info[i].dlink, fileinfo.savename);
					fileinfo.data.push(obj_data);
				}
			}

			if(fileinfo.data.length != 0){
				var _ = "data:application/octet-stream;charset=utf-8,"+ encodeURIComponent(fileinfo.data.join(""));
				if(fileinfo.out_type == "aria2_rpc"){
					for(var i=0;i<fileinfo.data.length;i++){
						aria2send_data.addUri(fileinfo.data[i]);
					}
					SetMessage("\u5df2\u7ecf\u6dfb\u52a0\u4e86\u5594\uff0c\u53bb\u786e\u8ba4\u770b\u4e0b\u5427\u3002", disk.ui.Toast.MODE_SUCCESS);
					fileinfo.ajax_state = 0;
				}	
				else if(fileinfo.out_type == "wget"){
					down_dialog(fileinfo.out_type, _, fileinfo.data.join(""));
					$("#masking").css("display","block");
					fileinfo.ajax_state = 0;
				}
				else{
					down_dialog(fileinfo.out_type, _, "");
					$("#masking").css("display","block");
					fileinfo.ajax_state = 0;
				}
			}
			else{
				fileinfo.ajax_state = 0;
			}
		}
	}
}

headers_ = {
	"UA": {
		"chrome": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.5 Safari/537.36",
		"firefox": "Mozilla/5.0 (Windows NT 6.1; rv:26.0) Gecko/20100101 Firefox/26.0",
		"exe": "netdisk;4.4.0.6;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia"
	},
	"set_UA": function (type) {
		var dom = document.getElementById("setting_aria2_useragent_input");
		dom.value = headers_.UA[type];
		dom.disabled = "disabled"; 
		return true;
	}
}

alert_dialog = {
	"create": function(){
		var div = document.createElement("div");
		div.className = "b-panel b-dialog alert-dialog";
		div.id = "alert_div";
		var html = [];
		html.push('<div class="dlg-hd b-rlv">');
		html.push('<div title="\u5173\u95ed" id="alert_dialog_close" class="dlg-cnr dlg-cnr-r"></div>');
		html.push('<h3>\u9a8c\u8bc1\u7801</h3>');
		html.push('</div>');
		html.push('<div class="dlg-bd">');
		html.push('<div class="alert-dialog-msg center">');

		html.push('<div class="download-verify" id="downloadVerify">');
		html.push('<div class="verify-body">\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a\u0020');
		html.push('<input id="verification" type="text" class="input-code" maxlength="4">');
		html.push('<img id="yanzhengma" class="img-code" alt="\u9a8c\u8bc1\u7801\u83b7\u53d6\u4e2d" src="" width="100" height="30">');
		html.push('<a href="javascript:;" class="underline" id="huanyizhang">\u6362\u4e00\u5f20</a>');
		html.push('</div>');
		html.push('<div class="verify-error"></div></div>');
	
		html.push('</div></div>');
		html.push('<div class="dlg-ft b-rlv">');
		html.push('<div class="alert-dialog-commands clearfix center">');
		html.push('<a href="javascript:;" id="okay" class="sbtn okay"><b>\u786e\u5b9a</b></a>');
		html.push('<a href="javascript:;" id="ignore" class="dbtn cancel"><b>\u53d6\u6d88</b></a>');
		html.push('</div>');
		html.push('<div class="clearfix alert-dialog-commands-plus" >');
		html.push('</div></div>');
		div.innerHTML= html.join("");
		document.body.appendChild(div);
		
		//center($("#alert_div")); //提示窗口就用不着绑定了

		var obj = $("#alert_div");
		var screenWidth = $(window).width(), screenHeight = $(window).height();
    	var scrolltop = $(document).scrollTop();
   		var objLeft = (screenWidth - obj.width())/2;
   		var objTop = (screenHeight - obj.height())/2 + scrolltop;

    	$("#alert_div").css({left: objLeft + "px", top: objTop + "px"});
    	$("#alert_div").css({"display": "block", "border": "1px solid #999"});
    	$("#masking").css("display","block");
	},
	"img": function(vcode){
		var url = "http://vcode.baidu.com/genimage";
		$("#yanzhengma").attr("src", url+"?"+vcode);
	},
	"event": function(){
		$("#huanyizhang").unbind().click(function(){
			var url = "http://vcode.baidu.com/genimage";
			$("#yanzhengma").attr("src", url+"?"+fileinfo.vcode + "&" + new Date().getTime());
		})
		$("#okay").unbind().click(function(){
			var input_code = $("#verification").attr("value");
			var _ = "fid_list="+JSON.stringify(fileinfo.file_fsid);
			if(fileinfo.isdir==1){
				_ = "fid_list="+JSON.stringify(fileinfo.dir_fsid);
			}
			_ = _+"&input="+input_code+"&vcode="+fileinfo.vcode;
			fileinfo.getdinlk(_);
			//$("#alert_div").css({"display": "none"});
			$("#alert_div").remove();
			//SetMessage("请稍后...", disk.ui.Toast.MODE_LOADING)
			$("#masking").css("display","none");
		})
		$("#ignore").unbind().click(function(){
			//$("#alert_div").css({"display": "none"});
			$("#alert_div").remove();
			$("#masking").css("display","none");
			SetMessage("\u5509\u002e\u002e\u002e\u002e\u002e", disk.ui.Toast.MODE_CAUTION);
			fileinfo.ajax_state = 0;
		})
		$("#alert_dialog_close").unbind().click(function(){
			$("#alert_div").remove();
			$("#masking").css("display","none");
			SetMessage("\u5509\u002e\u002e\u002e\u002e\u002e", disk.ui.Toast.MODE_CAUTION);
			fileinfo.ajax_state = 0;
		})
	}
}

down_dialog = function(type, href, str){
	var out = {
		"aria2": "aria2.session",
		"wget": "wget.txt",
		"idm": "idmlist.ef2"
	};
	var div = document.createElement("div");
	div.className = "b-panel b-dialog alert-dialog";
	div.id = "down_dialog";
	div.style.display = "block";
	div.style.border = "1px solid #999";
	var html = [];
	html.push('<div class="dlg-hd b-rlv">');
	html.push('<div title="\u5173\u95ed" id="down_dialog_close" class="dlg-cnr dlg-cnr-r"></div>');
	html.push('<h3>\u4e0b\u8f7d'+type+'\u6587\u4ef6</h3></div>');
	html.push('<div style="margin: 22px 180px;">');
	html.push('<a href='+href+' class="new-dbtn" download="'+out[type]+'"><em class="icon-download"></em><b>\u4e0b\u8f7d\u6587\u4ef6</b></a>');
	html.push('</div>');
	if(str.length != 0){
		html.push('<div style="width:425px;height:200px;margin: -13px auto 10px;border:1px solid rgb(240, 240, 240); background-color: rgb(250, 250, 250);overflow-y: auto;overflow-x: auto;">'+str+'</div>');
	}
	div.innerHTML= html.join("");
	document.body.appendChild(div);
	var obj = $("#down_dialog");
	var screenWidth = $(window).width(), screenHeight = $(window).height();
    var scrolltop = $(document).scrollTop();
   	var objLeft = (screenWidth - obj.width())/2;
   	var objTop = (screenHeight - obj.height())/2 + scrolltop;
    div.style.left = objLeft + "px";
    div.style.top = objTop + "px";
    $("#down_dialog_close").unbind().click(function(){
		obj.remove();
		$("#masking").css("display","none");
	})
}

combination = {
	"header": function () {
		var addheader = [];
		var ua_input = document.getElementById("setting_aria2_useragent_input").value;
		var ref_input = document.getElementById("setting_aria2_referer_input").value;
		var ua_cookie = config.params[0].input.setting_aria2_useragent_input;
		var ref_cookie = config.params[0].input.setting_aria2_referer_input;
		var h_cookie = config.params[0].textarea;
		if( ua_input ){
			addheader.push("User-Agent: " + ua_input);
		}
		else if( ua_cookie ){
			addheader.push("User-Agent: " + ua_cookie);
		}
		if( config.params[0].checked.referer_auto ){
			addheader.push("Referer: " + combination.referer());
		}
		else{
			if( ref_input ){
				addheader.push("Referer: " + ref_input);
			}
			else if( ref_cookie ){
				addheader.push("Referer: " + ref_cookie);
			}
		}
		if( h_cookie ){
			var text = h_cookie.split("\n");
			for (var i=0;i<text.length;i++){
				addheader.push(text[i]);
			}
		}
		return addheader;
	},
	"aria2_rpc": function(url, name) {
		var _ = [{
			"jsonrpc": "2.0",
			"method": "aria2.addUri",
			"id": new Date().getTime(),
			//"id": 1,
			"params": [[url],{
				"out": name,
			//	"dir": dirurl
			//	"header": "user-agent: "+combination.user_agent,
			//	"header": "Referer: "+combination.referer()
				"header": combination.header()
				}
			]
		}];
		var file_path = name;
		var file_name;
		if(file_path.substring(0,1) == "/"){
			_[0].params[1].out = file_path.substring(1, file_path.length);
		}
	return _
	},
	"aria2": function(url,name) {
		var referer = location.origin+location.pathname;
		if(! referer){referer="http://pan.baidu.com/disk/home";}
		var file_path = name;
		var _ = url+"\r\n";
		if(file_path.substring(0,1) == "/"){
			_ += " out=" + file_path.substring(1, file_path.length) + "\r\n";
			
		}
		else{
			_ += " out=" + name + "\r\n";
		}
		_ += " header=" + "Referer: " + combination.referer() +"\r\n";
		_ += " header=" + "User-Agent: " + combination.user_agent +"\r\n\r\n";
		return _
	},
	"wget": function(url,name) {
		var filter_txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var _ = "wget -c -O ";
		for (var i=0; i<name.length; i++) {
			if (filter_txt.indexOf(name[i]) == -1) {
				_ += "\\"+name[i];
			}
			else {
				_ += name[i];
			}
		}
		_ += " '"+url+"'"+"\r\n";
		return _;
	},
	"idm": function(url,name) {
		var _ = "<\r\n"+url+"\r\n>\r\n"
		return _
	},
	"referer": function () {
		var a = location.origin+location.pathname;
		if(! a){a="http://pan.baidu.com/disk/home";}
		return a
	}
}

Initialize = function(){
	if(config.get()){
		var ua = document.getElementById("setting_aria2_useragent_input").value;
		var ref = document.getElementById("setting_aria2_referer_input").value;
		$("#setting_div input[type=checkbox]").attr("checked", false)
		$("#setting_div input[type=text]").attr("value", null)
		if( ! config.params[0].input.setting_aria2_useragent_input){document.getElementById("setting_aria2_useragent_input").value = ua;}
		if( ! config.params[0].input.setting_aria2_referer_input){document.getElementById("setting_aria2_referer_input").value = ref;}
		for (var i in config.params[0].input){$("#"+i).attr("value", config.params[0].input[i]);}
 		for(var i in config.params[0].checked){$("#"+i).attr("checked", config.params[0].checked[i]);}
 		if(config.params[0].textarea){document.getElementById("setting_aria2_headers").value = config.params[0].textarea;}
		var typeout = $("#typeout input[type=checkbox]");
		var id;
		for (var i=0;i<typeout.length;i++){
			if ($(typeout[i]).attr("checked")){
				id = $(typeout[i]).attr("id").split("_")[0];
				$("#out_"+id).parent().css("display","block")
			}
			else{
				id = $(typeout[i]).attr("id").split("_")[0];
				$("#out_"+id).parent().css("display","none")
			}
		}
 		if( ! $("#rpc_distinguish").attr("checked")){
	 		$("#rpc_pass").attr("disabled", "disabled");
	 		$("#rpc_user").attr("disabled", "disabled");
	 	}
	 	else{
		 	$("#rpc_user").removeAttr("disabled");
			$("#rpc_pass").removeAttr("disabled");
	 	}
	 	if($("#referer_auto").attr("checked")){
		 	$("#setting_aria2_referer_input").attr("disabled", "disabled");
	 	}
	 	else{
		 	$("#setting_aria2_referer_input").removeAttr("disabled");
	 	}
	 	var iswebjs = document.cookie.match(new RegExp("(^| )"+"iswebjs"+"=([^;]*)(;|$)"));
		if (iswebjs){if (iswebjs.length > 1){iswebjs = iswebjs[2];}else{iswebjs = "0";}}else{iswebjs = "0";}
		if (iswebjs == 1){$("#iswebjs").attr("checked", true);}
	}
}

button();
add_setting_div();
Initialize();
masking();

}

localjs();
}
}
	catch (type) {
		window.setTimeout(function(){
			Utilities.useToast({toastMode: disk.ui.Toast.MODE_CAUTION,msg: "\u6267\u884c\u811a\u672c\u65f6\u53d1\u751f\u9519\u8bef\uff0c\u5c1d\u8bd5\u4f7f\u7528\u8fdc\u7a0b\u811a\u672c\u3002",sticky: true});
			window.setTimeout(loadjs,2000);
			},2000);
	}
}
}
A();
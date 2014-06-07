// ==UserScript==
// @name       kis.civitas.extension
// @namespace  http://www.shdic.com/
// @version    0.1
// @description  enter something useful
// @match      http://civitas.soobb.com/*
// @copyright  2013+, honghunter@gmail.com
// ==/UserScript==

/*
 * Copyright (c) 2013 honghunter@gmail.com . All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

// var api_url="http://dev.local.cn:8216/test/20131117-civitas/api.php";
//var api_url="http://dev.local.cn:8216/appidwx3ofd8sri/3/civitas/api.php";
var api_url="http://3.iresearch.duapp.com/civitas/api.php";


var XHR_post = function (post_url, post_data, callback) {

	GM_xmlhttpRequest({
		method : "POST",
		url : post_url,
		data : post_data
		// + "&" + "formData3=" + encodeURIComponent(formData3)
		// etc.
		,
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		onload : function (response) {
			//console.log(response.responseText);
			//alert(response.responseText);
			callback(response.responseText);
		}
	});
};

function my_jQuery_post(api_url, params,callback) {
	//params=	{ Action: "post", api: api_name, p1: p1, loc_url:loc_url},
	var post_data=null;
	post_data = "Action=" + encodeURIComponent(params.Action);
	post_data = post_data+ "&api=" + encodeURIComponent(params.api);
	post_data = post_data+ "&p1=" + encodeURIComponent(params.p1);
	post_data = post_data+ "&loc_url=" + encodeURIComponent(params.loc_url);
	
	XHR_post(api_url, post_data, callback);
}

// 加载JS文件到页面并执行回调
var loadJS = function(url, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    var done = false;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            callback();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script)
        }
    };
    head.appendChild(script)
};


//<script src="http://libs.baidu.com/jquery/1.8.3/jquery.min.js"></script>
// 加载jQuery
if (typeof jQuery === 'undefined') {
	loadJS("http://libs.baidu.com/jquery/1.8.3/jquery.min.js", function() {
		jQuery = (window.jQuery ? window.jQuery : window.$).noConflict(true);
		//jQuery_plugin();
		//_auto();
	});
} else {
	jQuery = jQuery ? jQuery : (window.jQuery ? window.jQuery : window.$);
	//jQuery_plugin();
	//_auto();
}


var loc_url=window.location.href;
loc_url=loc_url.toLowerCase();

var mine_url="http://civitas.soobb.com/mine/";
var forums_url="http://civitas.soobb.com/forums/";	//广场
var statistics_url="http://civitas.soobb.com/forums/statistics/";	//经济指数
//http://civitas.soobb.com/Markets/Commodities/?InventoryID=37233&SupplyID=5&SupplyLevel=1&DemandLevel=1 
var commodities_url="/civitas.soobb.com/markets/commodities/";	//实物市场

var districts_url="http://civitas.soobb.com/districts/";	//街区

var flag_load_more=false;

var pageNoMax=3;
var pageNo=1;
var pageUrl="";


if (loc_url.indexOf(forums_url) >= 0) { 	//广场
	// post_to_api("ContentColumn","api01",civitas_callback2);

}else if(loc_url.indexOf(commodities_url) >= 0) { 	//实物市场
	// post_to_api("ContentColumn","api02",civitas_callback2);

	try_load_more_page();
	
	// var html='<div class="Checkbox"><input type="checkbox" id="kis_load_more"><span>自动加载更多页面</span></div>';
	// js_debug(html);

	// setTimeout("check_start();",1000*1);


}else if(loc_url.indexOf(statistics_url) >= 0) { 	//经济指数
	// post_to_api("ContentColumn","api03",civitas_callback2);

}else if(loc_url.indexOf(districts_url) >= 0) { 	//街区
	// post_to_api("ContentColumn","api04",civitas_callback2);

}else{	//EE
	//post_to_api("ContentColumn","api04",civitas_callback2);	
}

function check_start(){
	var kis_load_more_Checkbox = jQuery("#kis_load_more");
	var flag_load_more= kis_load_more_Checkbox.attr("checked") == "checked";

	// kis_load_more_Checkbox.change(function () {
	// 	var Current = kis_load_more_Checkbox.attr("checked") == "checked";
	// 	if (Current == flag_load_more) {
	// 		setTimeout("check_start();",1000*1);
	// 		return;
	// 	}
	// 	flag_load_more = Current;
	// 	if (flag_load_more) try_load_more_page();
	// });
	// flag_load_more= kis_load_more_Checkbox.attr("checked") == "checked";

	if (flag_load_more) {
		try_load_more_page();
	}else{
		js_debug("[check_start]");
		setTimeout("check_start();",1000*1);
	}

}

function lcase(str){
	return str.toLowerCase();
}

function test_callback1(ss){
	alert("test_callback1():"+ss);
}

function civitas_callback2(ss){
	//alert("test_callback1():"+ss);
	var app_tmp=jQuery(".PersonalStatistics").html();
	if(app_tmp!="" ||app_tmp.length>0){
		// jQuery(".PersonalStatistics").html("[api_callback_ok]"+app_tmp);
		//jQuery(".PersonalStatistics").html("[api_callback_ok]");
		js_debug("[api_callback_ok]");
	}
}


function post_to_api(class_name,api_name,callback){
	var app_tmp="";
	if(class_name.length==0){
		app_tmp=jQuery("html").eq(0).html();
	}else{
		app_tmp=jQuery("."+class_name).html();
	}
	if(app_tmp!="" || app_tmp.length>0){
		//var p1 = encodeURIComponent(app_tmp,'UTF-8');
		var p1=app_tmp;
		my_jQuery_post(api_url, { Action: "post", api: api_name, p1: p1, loc_url:loc_url},
		function (data, textStatus){
			callback(data);
		});
	}
	return true;
}

function post_html_to_api(html_src,api_name,callback){
	var app_tmp="";
	app_tmp=html_src
	if(app_tmp!="" || app_tmp.length>0){
		//var p1 = encodeURIComponent(app_tmp,'UTF-8');
		var p1=app_tmp;
		my_jQuery_post(api_url, { Action: "post", api: api_name, p1: p1, loc_url:loc_url},
		function (data, textStatus){
			callback(data);
		});
	}
	return true;
}



function try_load_more_page(){

	var tmp_url=loc_url;
	if(tmp_url.indexOf("inventoryid") >= 0) { 
		js_debug('#2,inventoryid exist;');
		tmp_url = tmp_url + "&Page=2";
		if(tmp_url.indexOf("demandid") >= 0) { 
			js_debug('#2a,demandid exist;');
			if(pageNoMax<10) pageNoMax=10;
		}
	}else{
		js_debug('#2b,inventoryid not exist;');
		tmp_url = tmp_url + "?Page=2";
	}

	var html_src=jQuery("html").eq(0).html();
	// //<a href="/Markets/Commodities/?InventoryID=37233&amp;SupplyID=5&amp;DemandLevel=1&amp;Page=2">后页 &gt;</a>	
	// if(html_src.indexOf(';Page=2">后页') >= 0) { 
	// 	js_debug('#1,page2 exist;');
	// }else{
	// 	js_debug('#1,page2 Not exist;');
	// 	//return false;
	// }

	// pageUrl=tmp_url;
	post_html_to_api(html_src,"api0201",civitas_page_callback);
}

function try_load_more_page_v2(){
	if(pageUrl.length > 0) { 
		js_debug('#1,page'+pageNo+' exist;');
	}else{
		js_debug('#1,page'+pageNo+' Not exist;');
		return false;
	}

	var tmp_url=pageUrl;
	jQuery.get(tmp_url, function(data){
		post_html_to_api(data,"api0201",civitas_page_callback);
	});
}

function civitas_page_callback(ss){
  try{
	var parsed = JSON.parse(ss)
	var kk = parsed.datas;
	//alert(kk);
	var app_tmp=jQuery(".Offers").html();
	//if(app_tmp!="" ||app_tmp.length>0){
		//jQuery(".Offers").html(app_tmp+kk['page_body']);
		jQuery(".Offers").html(kk['page_body_processed']);
		js_debug('#3,page'+pageNo+' load ok;');

		jQuery(".Pagination").html(kk['new_pagination']);
		js_debug('#4,pagination reset ok;');
	
		if(parseInt(kk['page_has_next'])==1){	//加载下一页
			pageNo=pageNo+1;
			if(pageNo<=pageNoMax){
				pageUrl = kk['page_next_url'];
				//setTimeout("try_load_more_page_v2();",1000*16);	
				setTimeout(function(){
					if(pageUrl.length > 0) { 
						js_debug('#1,page'+pageNo+' exist;');
					}else{
						js_debug('#1,page'+pageNo+' Not exist;');
						return false;
					}

					var tmp_url=pageUrl;
					jQuery.get(tmp_url, function(data){
						post_html_to_api(data,"api0201",civitas_page_callback);
					});
					
				},1000*16);	
			}
		}	

	//}else{
	//	js_debug("#3b,civitas_page_callback error!");
	//}
  }catch(e){
  	//alert(e.name + ": " + e.message);
  	js_debug("#5,civitas_page_callback error!"+e.name + ": " + e.message);
  };
}

function js_debug(str){
	// var app_tmp=jQuery(".PersonalStatistics").html();
	jQuery(".PersonalStatistics").append(str);
}


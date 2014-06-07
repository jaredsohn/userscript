// ==UserScript==
// @name        自动批量改DNS服务器
// @namespace   自动批量改DNS服务器
// @description 自动批量改DNS服务器
// @include     http://www.now.cn/domain-admin/*
// @version     1
// @grant none
// ==/UserScript==
var url=document.URL;
if(url=='http://www.now.cn/domain-admin/DNSChangeEpp_submit.net'){
//自动提交表单
	document.form1.submit();
}else if(url.indexOf('http://www.now.cn/domain-admin/domainManage.net?IDDomain')>-1){
//点击修改DNS
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		if(tags[i].outerHTML.indexOf('DNSChange.net?IDDomain=')>-1){
			tags[i].click();
		}
	}
}else if(url=='http://www.now.cn/domain-admin/domain_list.net'){
//点击管理
	table=document.getElementById("table_domain");
	if(table.rows.length==3){
		tags = document.getElementsByTagName("a");
		for(var i=0;i<tags.length;i++){
			if(tags[i].outerHTML.indexOf('/domain-admin/domainManage.net?IDDomain=')>-1){
				tags[i].click();
			}
		}
	}
}else if(url.indexOf('http://www.now.cn/domain-admin/DNSChange.net?IDDomain=')>-1){
//自动填写DNS并提交表单
	tags = document.getElementsByTagName("input");
	for(var i=0;i<tags.length;i++){
		if(tags[i].id == "NSList[]"){
			tags[i].value="f1g1ns1.dnspod.net";
			tags[i+1].value="f1g1ns2.dnspod.net";
			tags[i+2].value="";
			tags[i+3].value="";
			document.form1.submit();
			break;
		}
	}
}
/*
function back(){
	tags = document.getElementsByTagName("font");
	for(var i=0;i<tags.length;i++){
		if(tags[i].indexOf('更改成功')>-1){
			window.location='http://www.now.cn/domain-admin/domain_list.net';
			break;
		}
	}
}*/
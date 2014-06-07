// ==UserScript==
// @name           9518.com Mall commodity price history graph
// @namespace      http://www.9518.com 9518比价网
// @description    在网上商城的商品终端页面，9518.com(9518比价网)会插入一张由当前价格和历史价格数据绘制的商品价格波动曲线图。
// @match          http://item.jd.com/*
// @match          http://www.newegg.com.cn/product/*
// @match          http://www.newegg.com.cn/Product/*
// @match          http://www.amazon.cn/gp/product/*
// @match          http://www.amazon.cn/*/dp/*
// @match          http://www.amazon.cn/mn/detailApp*
// @match          http://product.dangdang.com/product.aspx?product_id=*
// @match          http://product.dangdang.com/Product.aspx?product_id=*
// @match          http://item.yixun.com/item-*
// @match          http://www.suning.com/emall/prd_10052_10051_-7_*
// @match          http://www.gome.com.cn/product/*
// @match          http://www.coo8.com/product/*
// ==/UserScript==

//创建价格曲线图片及其他价格信息节点
function GetDivNode(response) {
    var tmpHtml,divNode;
    tmpHtml = document.createElement('html');
    tmpHtml.innerHTML = response.responseText;
    //alert(response.responseText);
    divNode=tmpHtml.querySelector('#productinfoid');
    if (divNode === null) {
        return '';
    }else{
        return divNode;   
    }
}

//创建调用地址
function CreateUrl(site, id) {
    return "http://www.9518.com/interface.php?type=hispic&sitename=" + site + "&site_p_id=" + id;
}

//处理规则
sites = [{
    domain : 'jd.com',
    GetUrl: function() {
        var reg, pid, hisUrl;
        reg = new RegExp("http://item.jd.com/\(\\d+\).html");
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
            hisUrl = CreateUrl('jingdong', pid);
            return hisUrl;
        }
    },
    CallBack: function(response) {
        var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
		placeNode = document.getElementById('summary');
		placeNode.parentNode.insertBefore(divNode,placeNode);
	}
    }
},{
    domain : 'newegg.com',
    GetUrl: function() {
        var reg, pid, hisUrl;
        reg = new RegExp("http://www.newegg.com.cn/[Pp]roduct/\([^.]+\).htm");
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
	    hisUrl = CreateUrl('newegg', pid);
	    return hisUrl;
	}
    },
    CallBack: function(response) {
	var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
		placeNode = document.getElementsByClassName('paymentInfoArea')[0];
		placeNode.parentNode.insertBefore(divNode,placeNode.nextElementSibling);
	}
    }
},{
    domain : 'gome.com.cn',
    GetUrl: function() {
        var reg, pid, hisUrl;
        reg = new RegExp("http://www.gome.com.cn/product/\(\\d+\).html");
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
	    hisUrl = CreateUrl('guomei', pid);
	    return hisUrl;
	}
    },
    CallBack: function(response) {
	var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
                placeNode = document.getElementById('choose');
		placeNode.parentNode.insertBefore(divNode,placeNode.nextElementSibling);
	}
    }
},{
    domain : 'amazon.cn',
    GetUrl: function() {
        var reg, pid, hisUrl;
        if (url.indexOf('/gp/product/') != -1) {
            reg = new RegExp("http://www.amazon.cn/gp/product/\([^/]+\)/\?");
        } else if (url.indexOf('/dp/') != -1) {
            reg = new RegExp("http://www.amazon.cn/[^/]+/dp/\([^/]+\)/\?");
        } else {
            reg = new RegExp("http://www.amazon.cn/mn/detailApp.*asin=\(\\w+\)");
        }
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
	    hisUrl = CreateUrl('amazon', pid);
	    return hisUrl;
	}
    },
    CallBack: function(response) {
	var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
		placeNode = document.getElementById('handleBuy');
		placeNode.parentNode.insertBefore(divNode,placeNode.nextElementSibling);
	}
    }
},{
    domain : 'dangdang.com',
    GetUrl: function() {
        var reg, pid, hisUrl;
        reg = new RegExp("http://product.dangdang.com/[Pp]roduct.aspx\\?product_id=\(\\d+\)");
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
	    hisUrl = CreateUrl('dangdang', pid);
	    return hisUrl;
	}
    },
    CallBack: function(response) {
	var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
		placeNode = document.getElementsByClassName('show clearfix')[0];
		placeNode.parentNode.insertBefore(divNode,placeNode.nextElementSibling);
	}
    }
},{
    domain : 'yixun.com',
    GetUrl: function() {
        var reg, pid, hisUrl;
        reg = new RegExp("http://item.yixun.com/item-\([^.]+\).htm");
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
	    hisUrl = CreateUrl('yixun', pid);
	    return hisUrl;
	}
    },
    CallBack: function(response) {
	var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
		placeNode = document.getElementById('goods_detail_mate');
		placeNode.parentNode.insertBefore(divNode,placeNode.nextElementSibling);
	}
    }
},{
    domain : 'suning.com',
    GetUrl: function() {
        var reg, pid, hisUrl;
        reg = new RegExp("http://www.suning.com/emall/prd_10052_10051_-7_\([^.]+\)_.html");
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
	    hisUrl = CreateUrl('suning', pid);
	    return hisUrl;
	}
    },
    CallBack: function(response) {
	var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
		placeNode = document.getElementsByClassName('pro_chooseBox fix')[0];
		placeNode.parentNode.insertBefore(divNode,placeNode.nextElementSibling);
	}
    }
},{
    domain : 'coo8.com',
    GetUrl: function() {
        var reg, pid, hisUrl;
        reg = new RegExp("http://www.coo8.com/product/\([^.]+\).html");
        pid = url.match(reg)[1];
	if(pid === null){
	    return '';
	}else{
	    hisUrl = CreateUrl('kuba', pid);
	    return hisUrl;
	}
    },
    CallBack: function(response) {
	var divNode, placeNode;
        divNode = GetDivNode(response);
	if(divNode!=''){
		placeNode = document.getElementById('c8InfoData');
		placeNode.parentNode.insertBefore(divNode,placeNode.nextElementSibling);
	}
    }
}];

url = window.location.href;
var i, site;
for (i = 0; i < sites.length; i += 1) {
    if (url.indexOf(sites[i].domain) != -1) {
        site = sites[i];
        break;
    }
}
GM_xmlhttpRequest({
    method: "GET",
    url: site.GetUrl(),
    onload: site.CallBack
});
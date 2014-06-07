// ==UserScript==
// @name           eChina battle orders
// @namespace      www.erepublik.com
// @author	   pi.pa@eChina
// @description    Battle orders script for the eChina on eRepublic
// @version        0.14
// @include        http://ww*.erepublik.com/en
// ==/UserScript==

//------------------------------------------------------------------------------
// 	Comments
//------------------------------------------------------------------------------
//  This script created base on eGR_BattleOrders By petsagouris .
//  0.14   version support
//  0.13   modify css and others
//  0.12   get uid as a request parameter
//  0.11   add bug report
//------------------------------------------------------------------------------

var allDivs, thisDiv, uid, ver;
ver = "0.14";

allDivs = document.evaluate(
	"//a[@class='citizen_name']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    
	thisDiv = allDivs.snapshotItem(i);
	var ind = thisDiv.href.lastIndexOf('/');
	uid = thisDiv.href.substring(ind+1);
}

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://erep.tk/order.php?uid=' + uid, 
	//url: 'http://erep.tk/order1.html', 
	onload:function(response)
	{
    
	    var js = document.createElement('script');
	    js.innerHTML = 'function showHidden(cid){    var y=document.getElementById(cid);    if( y.style.display==""){        y.style.display="none";}    else{        y.style.display="";}} ';
        js.type="text/javascript";
        document.getElementsByTagName('head')[0].appendChild(js);
	    
        var orders = document.createElement('div');
		orders.setAttribute('class', 'item elem');
		orders.setAttribute('style', 'border: 10px solid #E9F5FA; padding: 7px;width: 299px;display: block;float: left;');
		
        var ind = response.responseText.indexOf('|');
        var ts = response.responseText.substring(0,ind);
        var sver = response.responseText.substring(ind+1,ind+5);
        
        var t  = new Date();
        var now = t.getTime();
        var delt = now/1000 - ts;
        var timemsg;
        if(delt > 3600){
            orders.innerHTML = '数据源被无头鸡吃了，请点击<a href="http://www.erepublik.com/en/newspaper/ministry-of-sinodefence-196717">国防部报纸链接</a>查看最新军令<br />';
            orders.innerHTML += '==<br/>by <a href="http://www.erepublik.com/en/citizen/profile/2448367" target="_blank">Pi.Pa@水木社</a>';
        }else{
            timemsg = '数据源更新于'+ parseInt(delt/60) +'分钟之前';
    		orders.innerHTML = timemsg + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;by <a href="http://www.erepublik.com/en/citizen/profile/2448367" target="_blank">Pi.Pa@水木社</a><br />' + response.responseText.substring(ind+6);
        }
        
        if(ver != sver){
            orders.innerHTML += '<br /><br /><span style="color:red;"><a href="http://userscripts.org/scripts/show/77404">数据格式有更新，请升级到最新版本</a></span>';
        }
        
		var shouts_div = document.getElementById('shouts');
        
		shouts_div.parentNode.insertBefore(orders, shouts_div);

	}
});

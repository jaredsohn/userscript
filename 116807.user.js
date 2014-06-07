/****************************
ChangeLog
--------
2012-09-29
1)support nForum articles of newsmth and byr 
2)hover ip to show location
3)add update url
--------
2011-12-10
1)update byr
--------
2011-11-25
1)support bbs.byr.cn
--------
2011-10-31
1)support user query and mail box
2)support newsmth nForum version
3)cancel sogou query
*****************************/

// ==UserScript==
// @id				show_smth_ip_mod
// @name			Show SMTH IP Mod
// @namespace		http://fxthunder.com
// @description		Show smth article ip location
// @author			agunchan
// @include			http*://www.newsmth.net/nForum/*
// @include			http*://bbs.byr.cn/*
// @include			http*://www.newsmth.net/bbs*con.php*
// @include			http*://www.newsmth.net/bbsqry.php?userid=*
// @include			http*://www.newsmth.net/bbsmailcon.php*
// @updateURL       https://userscripts.org/scripts/source/116807.meta.js
// @downloadURL     https://userscripts.org/scripts/source/116807.user.js
// @version			1.3
// ==/UserScript==

(function() {

var CONFIG_HOVER_SHOW = true;
var CONFIG_TRY_INTERVAL = 2000;
var regs = [/\[?(\d{1,3}\.\d{1,3}\.\d{1,3}\.(?:(\d{1,3})|(\*)))\]?/g, /\[FROM\:\s*(\d{1,3}\.\d{1,3}\.\d{1,3}\.(?:(\d{1,3})|(\*)))\]/g];
var allDivs;
var ips, ipss;
var lastURL;

function doIPRequset() {
    var ip = ipss.pop();
	var fetchUrl;
    if (Math.floor(Math.random()*2)==0)
        fetchUrl='http://www.youdao.com/smartresult-xml/search.s?type=ip&q='+ip;  //youdao
    else 
        fetchUrl= 'http://www.cz88.net/ip/index.aspx?ip=' + ip ;  //cz88
		   
    GM_xmlhttpRequest({
        method: 'GET',
        url: fetchUrl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/html,text/html',
        },
        onload: function(responseDetails) {   
            if(responseDetails.status==200){    		
                var response_url = responseDetails.finalUrl;  
                var response = responseDetails.responseText;
                var resIP;
				var loc;
				var ipstr;
                if (response_url.indexOf("youdao.com")>=0){
                    if ((resIP = response.match(/<ip>(.*)<\/ip>/))) {
                        ip = resIP[1];
                        loc = response.match(/<location>(.*)<\/location>/)[1];	
                        // loc = loc + "(youdao)";					 	 
                    } 
                }
                else if (response_url.indexOf("cz88.net")>=0){
                    if ((resIP = responseDetails.responseText.split("input name=\"InputIPBox\" type=\"text\" value=\"")) && resIP.length > 1) {
                        ip  = resIP[1].split("\" id=\"InputIPBox")[0];						 	 	
                        loc = responseDetails.responseText.split("InputIPAddrMessage\">")[1].split("</span>")[0].replace(/\s*CZ88.NET/i,"");
                        // loc = loc + "(cz88)";
                    } 
                }
                else
                    ; //alert("Not a valid URL");
			       		 
                ip = ip.replace(/^\s+|\s+$/g,"");
                ip = ip.replace(/.0$/g,".*"); 
                ipstr = ip + " " + loc ;
                //ipstr = ip +  " <font color = blue> " + loc + "</font>]";
                for (var i = 0; i < allDivs.snapshotLength; i++)   // 在页面上显示ip所在位置
                {
                    var thisDiv = allDivs.snapshotItem(i);
                    thisDiv.innerHTML = thisDiv.innerHTML.replace(/<br>/g,"\n<br>");
                    thisDiv.innerHTML = thisDiv.innerHTML.replace(/<\/span>/g,"\n</span>");
                    var re = new RegExp(ip,"g");
                    thisDiv.innerHTML = thisDiv.innerHTML.replace(re, function(word){ return word.indexOf("]") != -1 ? ipstr + "]" : ipstr; } );
					thisDiv.innerHTML = thisDiv.innerHTML.replace("Loading...","");
                }
            }
        }//function(responseDetails)
    }); // GM_xmlhttpRequest
}

function extractElementIP(element, re) {
	var src = element.textContent;	
	//GM_log(src);
	var arr;
	var ip;
	while ((arr = re.exec(src)) != null){
		ip = arr[1];
		ip = ip.replace(/^\s+|\s+$/g,""); // 去除空格
		ip = ip.replace("*","0");          
		ips.push(ip);	// 存入ip地址表
	}
}

function loadNewsmth() {
	ips = [];
	ipss = [];
	var locHref = window.location.href;
	var re;
	var isNForumArticle = false;
	var lastFirstDiv;
	
	if (/\/nForum\/#!article\//i.test(locHref) || /bbs\.byr\.cn\/#!article\//i.test(locHref)) {
		// nForum版文章
		isNForumArticle = true;
		lastFirstDiv = (allDivs && allDivs.snapshotLength > 0) ? allDivs.snapshotItem(0) : null;
		if (document.URL == lastURL && lastFirstDiv) {
			return;	//同一个URL
		}

		lastURL = document.URL;
		allDivs = document.evaluate("//table[@class='article']//font[starts-with(@class,'f0')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); // 获得所有ip
		re = regs[1];
	} else if (/\/bbsqry\.php\?userid=/i.test(locHref)) {
		// 旧版用户查询
		allDivs = document.evaluate("//pre",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		re = regs[0];
	} else if(/\/bbsmailcon\.php/i.test(locHref)) {
		// 旧版邮箱
		allDivs = document.evaluate("//div[@class='article']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); // 获得文章内容
		re = regs[0];
	} else if (/\/bbs.?con\.php/i.test(locHref)){
		// 旧版文章
		if (document.body.innerHTML.indexOf("kbsrcInfo") == -1)  // 判断是否有表示文档已载入完成的标志出现
			return;
		allDivs = document.evaluate("//div[@class='article']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); // 获得所有文章内容
		re = regs[1];
	} else {
		return;
	}

	for (var i = 0; i < allDivs.snapshotLength; i++) { // 遍历所有文章内容
		var thisDiv = allDivs.snapshotItem(i);		
		
		if (CONFIG_HOVER_SHOW && isNForumArticle)
		{
			//对每个含有IP地址的元素添加mouseover事件
			if (re.test(thisDiv.textContent))
			{
				thisDiv.addEventListener("mouseover", function(){
					this.removeEventListener('mouseover', arguments.callee, false);
					if (/\[.*\*\s.+\]/.test(this.textContent)) {
						return;	//已经查询过
					}
					this.textContent += "Loading..."; 
					extractElementIP(this, re);
					if (ips.length > 0) {
						ipss.push(ips[ips.length-1]);
						doIPRequset();
					}
				}, false);
			}
		}
		else
		{
			//提取出IP直接显示
			extractElementIP(thisDiv, re);
		}
	}
    
	if (isNForumArticle && CONFIG_HOVER_SHOW) {
		return;
	} 
	
	//一次性显示所有页面上的IP位置
	ips.sort();// 排序后获得唯一ip地址表
	var n;
	for (var i = 0 ; i < ips.length ; i++){
		n = i + 1;
		if (ips[i] != ips[n]){
			ipss.push(ips[i]);
		}
	}
	
	if (allDivs.snapshotLength>0) {
		while(ipss.length>0){
			doIPRequset();
		}
	} 
} //function loadNewsmth()


if (/\/nForum\//i.test(window.location.href) || /bbs\.byr\.cn\//i.test(window.location.href)) {
	setInterval(loadNewsmth, CONFIG_TRY_INTERVAL);
} else {
	window.addEventListener('load', loadNewsmth, true);
}

})();

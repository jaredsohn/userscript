// ==UserScript==
// @name           Show SMTH IP FROM
// @namespace      idleawei.newsmth.net
// @description    显示当前浏览帖子的提交IP位置
// @include        http*://*.newsmth.net/bbs*con.php*
// ==/UserScript==


var cando = null;
var allDivs, thisDiv,ip,ipstr;
var ips = new Array();
var ipss = new Array();

var sogou_url,sogou_rslt;


window.addEventListener(
'load',
function() { 
	
// cando 判断是否有表示文档已载入完成的标志出现
cando = document.body.innerHTML.indexOf("kbsrcInfo");

if (cando > '-1')
{
// 获得所有文章内容

allDivs = document.evaluate(
"//div[@class='article']",
document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);
// 遍历所有文章内容
for (var i = 0; i < allDivs.snapshotLength; i++) {
thisDiv = allDivs.snapshotItem(i);
// 截取文章内容中的ip字段
//ip = thisDiv.innerHTML.toString().split("FROM:")[1].split("]")[0];

    var src = thisDiv.innerHTML.toString(); 
    var re = re=/\[FROM\:\s{0,}(\d+){1,3}\.(\d+){1,3}\.(\d+){1,3}\.((\d+){1,3}|(\*{1}))\]/g;              // 创建正则表达式模式。
    var arr;
    while ((arr = re.exec(src)) != null){
    ip = arr.toString().split(",")[0];
    ip = ip.split("FROM:")[1].split("]")[0];
    //去处空格 
    ip = ip.replace(/^\s+|\s+$/g,"");
// 存入ip地址表
ips.push(ip);
 }
  

}
// 排序后获得唯一ip地址表
ips.sort();
var n;
	for (var i = 0 ; i < ips.length ; i++)
	{
		n = i + 1; 
		if (ips[i] != ips[n]){ ipss.push(ips[i]); }
	}

// 针对唯一ip地址进行查询 
	for (var i = 0 ; i < ipss.length ; i++)
	{
		ip = ipss[i]; 
		var sogou_url = "http://www.sogou.com/features/ip.jsp?query=" + ip ;
    GM_xmlhttpRequest({
       	method: 'GET', 
       	url: sogou_url,
       	headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/html,text/html',}, 
       	onload: function(responseDetails) {
       		if(responseDetails.status==200){
       		sogou_rslt = responseDetails.responseText.split("<h1>")[2].split("<p>")[2].split("</p>")[0];
       		ip  = responseDetails.responseText.split("value")[1].split("\"")[1];
       		ip = ip.replace(/^\s+|\s+$/g,"");
					ipstr = ip +  " <font color = blue> " + sogou_rslt + "</font>]";
					// 在页面上显示ip所在位置 
          for (var i = 0; i < allDivs.snapshotLength; i++) {
          	thisDiv = allDivs.snapshotItem(i);
          	//alert(thisDiv.innerHTML);
          	thisDiv.innerHTML = thisDiv.innerHTML.replace(/<br>/g,"\n<br>");
          	thisDiv.innerHTML = thisDiv.innerHTML.replace(/<\/span>/g,"\n</span>");
          	//alert(thisDiv.innerHTML);
          	var re = new RegExp(ip,"g");
          	thisDiv.innerHTML = thisDiv.innerHTML.replace(re,ipstr);
          	}
          	}
        		      	          }//function(responseDetails)
          }); // GM_xmlhttpRequest
     }
    
}
},
true);


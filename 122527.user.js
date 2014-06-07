// ==UserScript==
// @name					村里光纤电影地址获取脚本
// @namespace			http://weiwsy.vicp.net/
// @description   村里光纤电影地址获取脚本
// @version		  	2.0
// @author        weiwsy(weiwsy@qq.com)
// @include       http://192.168.192.240/*mv*
// @updateURL			https://userscripts.org/scripts/source/122527.meta.js
// @downloadURL		https://userscripts.org/scripts/source/122527.user.js
// ==/UserScript==
/* 更新记录 ***********************************************************************
【2012.4.26】 更新 V2.0
   增加： 现在支持 4个网页主题
	 修改： 原来直接显示连接地址为文本， 可是并不美观， 现在改为一个URL链接，点右键即可复制地址
	 修改： 去掉调用本地迅雷
【2012.1.8】  V1.0
   首次增加对 主题4的URL获取。并增加对迅雷的调用
************************************************************************/

if (document.getElementsByClassName("moviePlay")[0])
{
	var divContent = document.getElementsByClassName("movieInfoContent")[0];
	var h2 = divContent.getElementsByTagName("h2")[0];
	//获取电影地址列表div 目前只对 http://192.168.192.240/4/下的网页有效 
	var div = document.getElementsByClassName("moviePlay")[0];
}
else 
if (document.getElementsByClassName("tongyi tyc")[0])
{
	var h2 = document.getElementsByClassName("h4")[0];
	// 获取电影地址列表div 目前只对 http://192.168.192.240/2/下的网页有效 
	var div = document.getElementsByClassName("tongyi tyc")[0];
}
else 
if (document.getElementsByClassName("movdizhi")[0])
{
	var h2 = document.getElementsByClassName("vslbotbb ss")[0];
	//获取电影地址列表div 目前只对 http://192.168.192.240/1/下的网页有效 
	var div = document.getElementsByClassName("movdizhi")[0];
}
else 
if (document.getElementsByClassName("mvdizhi")[0])
{
	var h2 = document.getElementsByClassName("neirong400")[0];
	//获取电影地址列表div 目前只对 http://192.168.192.240/3/下的网页有效 
	var div = document.getElementsByClassName("mvdizhi")[0];
}
//把网页标题改为 电影名 ，原来都是 一样的，无法看出来。
if (h2) { 
	document.title = document.title.substring(0,2) + '《' + h2.innerHTML.replace(/&nbsp;/g, "") + '》'; 
}

var lis = div.getElementsByTagName("li");
var li;
var x = 0;
for (x in lis)  
{
	li = div.getElementsByTagName("li")[x];
	var str = li.innerHTML;
	
	//只对有链接的列表处理, 主要用于排除http://192.168.192.240/4/下 影片介绍的列表, 
	if (str.indexOf('<a')<0) break;
	
	str = str.replace(/BLT2/, "BLT");
	
	str = str.replace(/BLTLB2/, "BLTLB");
	
	var i = str.indexOf('../');
	str = str.substring(i+3); 
	i = str.indexOf("'");
	str = str.substring(0, i); 
	
	str = str.replace(/amp;/, "");
	str = "http://192.168.192.240/" + str;
	
	GM_log(str);
	var xxx = getRealUrl(str, li);
}

function getRealUrl(OldUrl, ele) {
  var bOK = false;
	return GM_xmlhttpRequest({
	  method: "GET",
	  url: OldUrl,
	  onload: function(response) {
	    Tmpstr = response.responseText;
	    //alert(str);
	    var i;
	    i = Tmpstr.indexOf('<param name="url" value="');

	    Tmpstr = Tmpstr.substring(i); 
	    Tmpstr = Tmpstr.replace(/<param name="url" value="/, '');
	    i = Tmpstr.indexOf('"');
	    
	  	if (i > 0) {
	    	GM_log("param!!!");
	    	Tmpstr = Tmpstr.substring(0, i); 
	  	}
			else {
    		GM_log("|http!!!");
    		i = OldUrl.indexOf('num=');
    		var num = OldUrl.substring(i + 4);
    		
    		var ind;
    		i = 0;
    		for (ind=0; ind<=num; ind++) 
    		{
			    i = Tmpstr.indexOf('|http://', i + 1);
			  } 	
		    Tmpstr = Tmpstr.substring(i+1); 
		    i = Tmpstr.indexOf('?');
		    Tmpstr = Tmpstr.substring(0, i); 
		  }
		  	
	    GM_log(Tmpstr);
	    var cap = 'Xunlei';
	    var clickstr = "var oURL = encodeURI('" + Tmpstr + "');"+
				"netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');"+
				"var process = Components.classes['@mozilla.org/process/util;1'].getService(Components.interfaces.nsIProcess);"+
				"var targetFile = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);"+
				"targetFile.initWithPath('C:\\\\Program Files\\\\Thunder Network\\\\Xmp\\\\program\\\\XMP.exe');"+
				" try { process.init(targetFile) } catch(err) { } "+
				"var arguments = [oURL];  "+
				"process.run(false, arguments, arguments.length);"
			//li.setAttribute("onclick", clickstr);
			var txtEdit = "<a href='" + Tmpstr + "' style='color:red;' />URL</a>"
	    ele.innerHTML = ele.innerHTML + " " + txtEdit;
	    //直接替换li下的这个链接的href ，可以点右键复制出链接地址, 但是这样就无法直接播放了
			//ele.getElementsByTagName("a")[0].href = Tmpstr;
	    //暂时不显示用迅雷打开的按钮， 因为新版本网络媒体播放器 全屏时可以键盘控制，并且几乎无缓冲，而迅雷缓冲很慢。
	    //ele.innerHTML = ele.innerHTML + " <input value='" + cap + "' type='button' onclick="+	'"' + clickstr +'"'+" />";
	  }
	});
	
}

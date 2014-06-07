// ==UserScript==
// @author	   Yukin
// @name           bilibiliTHEbangumi
// @include        /^https?://bangumi\.tv/subject/[0-9]*$/
// @version 0.2
// @describe       add link @ bilibili to bangumi 
// @grant       none
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


// *** put your code inside letsJQuery: ***
function letsJQuery()
{
    $(document).ready(function () {
        //alert("jQuery is OK!");
    });
	main();
}

// the guts of this userscript
function main() {
	//alert(document.URL);
	var summary = $("div[id='subject_summary']");
	var left_col = $("ul[id='infobox']");
	//alert(left_col.html());
	var title = $("title");
	var name_patt = new RegExp("(.*) \\| Bangumi");
	var name = name_patt.exec(title.html());
	name = name[1];
	var nname = encodeURIComponent(name);
	//alert(name);
	summary.before('<p><a href='+'http://www.bilibili.tv/search?keyword='+nname+'&orderby=&formsubmit='+'><font color="gray">(￣︶￣)传送至'+name+' @bilibili.tv~</font></a></p>');
	summary.before('<p><a href='+'http://www.tucao.cc/index.php?m=search&c=index&a=init2&catid=0&time=all&order=inputtime&username=&tag=&q='+nname+'><font color="gray">(￣︶￣)传送至'+name+' @tucao.cc~</font></a></p>');
	var aname_patt = new RegExp("中文名.*");
	var bname_patt = new RegExp("别名.*");
	var in_patt = new RegExp("<\/span>(.*)<\/li>");
	var aname = aname_patt.exec(left_col.html());
	var bname = bname_patt.exec(left_col.html());
	if(aname == null) {
	} else {
		aname = in_patt.exec(aname);
		aname = aname[1];
		//var aaname = aname;
		var aaname = encodeURIComponent(aname);
		summary.before('<p><a href='+'http://www.bilibili.tv/search?keyword='+aaname+'&orderby=&formsubmit='+'><font color="gray">(￣ε￣*)传送至'+aname+' @bilibili.tv~</font></a></p>');
		summary.before('<p><a href='+'http://www.tucao.cc/index.php?m=search&c=index&a=init2&catid=0&time=all&order=inputtime&username=&tag=&q='+aaname+'><font color="gray">(￣ε￣*)传送至'+aname+' @tucao.cc~</font></a></p>');
	}
	if(bname == null) {
	} else {
		bname = in_patt.exec(bname);
		bname = bname[1];
		//var bbname = bname;
		var bbname = encodeURIComponent(bname);
		summary.before('<p><a href='+'http://www.bilibili.tv/search?keyword='+bbname+'&orderby=&formsubmit='+'><font color="gray">(≧▽≦)传送至'+bname+' @bilibili.tv~</font></a></p>');
		summary.before('<p><a href='+'http://www.tucao.cc/index.php?m=search&c=index&a=init2&catid=0&time=all&order=inputtime&username=&tag=&q='+bbname+'><font color="gray">(≧▽≦)传送至'+bname+' @tucao.cc~</font></a></p>');
	}
	summary.before("<br />");
	//alert(summary.html());
}


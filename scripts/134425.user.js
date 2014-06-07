// ==UserScript==
// @name          KL watch all pages
// @author        kl
// @description   处理所有页面的userscript
// @include       *
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.1
// @history       0.0.1 2012-05-29
// ==/UserScript==

var blhref=location.href;
var blhost=location.host; 

//不使用UserScript
if (blhref.indexOf("?userjs=no")>0 || blhref.indexOf("&userjs=no")>0){return;}

var bla;
var blad;
var blarray;
var blbanner;
var blbody;
var blcontent;
var bldiv;
var bled2k;
var blelement;
var blhtml;
var bljg;
var blobject;
var blparent;
var blscript;
var blsrc;
var i;

//wiki正文页隐藏除正文以外的内容，默认不执行
if (blhref.indexOf("?wikibodyprint=yes")>0 || blhref.indexOf("&wikibodyprint=yes")>0){
	blarray=["p-personal","p-namespaces","p-navigation","p-logo","footer-info","footer-places","left-navigation","p-search","toctitle","footer-icons","p-tb","p-variants","right-navigation","p-views","footer"];
	for (var i=0;i<blarray.length;i++){
		klremoveelementbyid(blarray[i]);
	}
	
	while (true){
		blelement=document.querySelector('span.editsection');
		if (blelement){
			blelement.parentNode.removeChild(blelement);
			continue;
		}
		break;
	}
	blelement=document.querySelector('div#content');
	if (blelement){
		blcontent=blelement.innerHTML;
		
		blbody=document.getElementsByTagName("body")[0];
		blobject=blbody.querySelector('*');
		bldiv=document.createElement("div");
		blbody.insertBefore(bldiv,blobject);
		bldiv.innerHTML=blcontent;
		bldiv.style.cssText="margin:15px;padding:15px;";
		
		blelement.parentNode.removeChild(blelement);
	}
	
	blarray=["printfooter"];
	for (var i=0;i<blarray.length;i++){
		klremoveelementbyclassname(blarray[i]);
	}	
}

//以下部分仅处理*://*.*/*，即host中含有.
if (blhost.indexOf(".")==-1){return;}

//解决联通嵌入广告的问题
blscript=document.querySelector('script');
if (blscript){
	blcontent=blscript.innerHTML;
	if (blcontent.indexOf(";document.write(i(d,c));")>=0 && blcontent.indexOf('var d="=iunm?=ifbe')>=0 && blcontent.indexOf(";for(var u=0;u<_.length;u++){var r=")>=0){
		
		//document.write('<p style="font-size:45pt;">屏蔽ISP广告，mode1，重刷中...</p>');
		window.location.reload();
		return;
	}
}

blelement=document.querySelector('iframe#fulliframe');
if (blelement){
	
	//document.write('<p style="font-size:45pt;">屏蔽ISP广告，mode2，重刷中...</p>');
	window.location.reload();
	return;
}

//去掉含有ad和banner的iframe
blad=/([\.\?/_=;\-_&]|^)\d{0,}ad(s|v)?\d{0,}([\.\?/_=;\-_&]|$)/;
blbanner=/([\.\?/_=;\-_&]|^)\d{0,}banner\d{0,}([\.\?/_=;\-_&]|$)/;
blelement=document.getElementsByTagName("iframe");
for (i=0;i<blelement.length;i++){
	blsrc=blelement[i].getAttribute("src").toLowerCase();
	if (blad.test(blsrc) || blbanner.test(blsrc)){
		blelement[i].setAttribute("src","about:blank");
	}
}

//emule links，默认不显示
if (blhref.indexOf("?emulelinks=yes")>0 || blhref.indexOf("&emulelinks=yes")>0){
	bljg="";
	bla=document.querySelectorAll('a[href^="ed2k://"]'); 
	for (i=0;i<bla.length;i++){
		bled2k='<p style="font-size:9.0pt;line-height:100%;margin:0px;padding:0px;">'+bla[i].getAttribute("href")+"</p>";
		if (bljg.indexOf(bled2k)==-1){
			bljg=bljg+bled2k;
		}
	}

	bla=document.querySelectorAll('a[ed2k^="ed2k://"]'); 
	for (i=0;i<bla.length;i++){
		bled2k='<p style="font-size:9.0pt;line-height:100%;margin:0px;padding:0px;">'+bla[i].getAttribute("ed2k")+"</p>";
		if (bljg.indexOf(bled2k)==-1){
			bljg=bljg+bled2k;
		}
	}

	bla=document.querySelectorAll('input[name^="ed2k://"]'); 
	for (i=0;i<bla.length;i++){
		bled2k='<p style="font-size:9.0pt;line-height:100%;margin:0px;padding:0px;">'+bla[i].getAttribute("name")+"</p>";
		if (bljg.indexOf(bled2k)==-1){
			bljg=bljg+bled2k;
		}
	}

	if (!bljg==""){
		blbody = document.getElementsByTagName("body")[0];
		blelement=blbody.querySelector('*');
		bldiv = document.createElement("div");
		blbody.insertBefore(bldiv,blelement);
		bldiv.innerHTML=bljg;
		bldiv.style.cssText="margin:5px;padding:5px;border:1px solid #8FAAD9;text-align:left;font-family:Tahoma;font-size:9.0pt;line-height:100%;color:#000000;background-color:#BBCEE9;word-break:break-all;word-wrap:break-word;";
	}
}

//函数
function klremoveelementbyclassname(blclassname){
	var blitem=document.getElementsByClassName(blclassname)[0];
	if(blitem){blitem.parentNode.removeChild(blitem);}
}

function klremoveelementbyid(blid){
	var blitem=document.getElementById(blid);
	if(blitem){blitem.parentNode.removeChild(blitem);}
}
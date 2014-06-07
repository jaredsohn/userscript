
// ==UserScript==
// @name           HITGPACALC
// @namespace      HITGPACALC
// @description    哈工大学分绩计算器 v1.1 by 4系地瓜 For Opera&IE
// @include        http://xscj.hit.edu.cn/hitjwgl/xs/cjcx/cx_1.asp
// @include        http://jwc.hit.edu.cn/cjcx/cx.asp

// ==/UserScript==
var str=document.body.innerHTML;
var a,kc,n,xf,fs,l;
var tempstr="";


mydiv = document.createElement("div"); 
mydiv.id = "gpadiv"; 
mydiv.style.zIndex = "100"; 
mydiv.style.position = "absolute"; 
mydiv.style.left = "802px"; 
mydiv.style.top = "190px"; 
mydiv.style.width = "auto"; 
mydiv.style.height = "auto"; 
mydiv.style.border = "5px solid"; 
mydiv.style.overflow = "auto"; 
mydiv.style.backgroundColor = "#F7F4EC"; 
mydiv.style.color="#000000";
mydiv.style.fontSize="16px";
mydiv.style.lineHeight="24px";
document.body.appendChild(mydiv);


writestr="";
writestr+="<div style=\"clear:both; text-align:center\">";
	writestr+="欢迎使用哈工大在线学分绩计算器 by 4系地瓜    ";
writestr+="<\/div>";

writestr+="<div style=\"clear:both; text-align:right; font-size:14px\">";
	writestr+="版本 1.1";
writestr+="<\/div>";

writestr+="<div style=\"clear:both; text-align:left;  font-size:14px\">";
	writestr+="检查更新&反馈问题 请点击<a href=\"http://www.groundmelon.freehosting.com/hitgpacalc/\" target=\"_blank\">这里<\/a>";
writestr+="<\/div>";
 
mydiv.innerHTML=writestr;

if (location.href=="http://jwc.hit.edu.cn/cjcx/cx.asp"){//校外
	if (str.match(/成绩表/)==null){
		writestr+="<div style=\"clear:both;\">";
			writestr+="<p>当前页面没有成绩表！<\/p>";
		writestr+="<\/div>";
		mydiv.innerHTML=writestr;
	}
	else{
		try{
			a=str.match(/<tr onmouseover="SeeSetBg\(this\)" onmouseout="SeeReBg\(this\)">[\s\S]*?<\/tr>/g);
			l=a.length;
			kc=new Array(l);
			xf=new Array(l);
			fs=new Array(l);
			
			for (n=0;n<l;n++)
			{
				kc[n]=(a[n].match(/<td><div align="center"><font size="3">(.+)(?=<\/font><\/div><\/td>)/))[0];
				kc[n]=RegExp.$1;
				xf[n]=a[n].match(/(<td><div align="center"><font size="3">[\s\S]*?){4}\s+(.+)(?=[\s\S]*?<\/font><\/div><\/td>)/)[0];
				xf[n]=RegExp.$2;
				fs[n]=a[n].match(/(<td><div align="center"><font size="3">[\s\S]*?){5}\s+(.+)(?=[\s\S]*?<\/font><\/div><\/td>)/)[0];
				fs[n]=RegExp.$2;
			}

			
			for (n=0;n<l;n++)
			{
				writestr+="<div style=\"clear:both;\">";
					writestr+="<div style=\"float:left; width:200px;\">"+kc[n]+"<\/div>";
					writestr+="<div style=\"float:left; width:50px; text-align:center\">"+xf[n]+"<\/div>";
					writestr+="<div style=\"float:left; width:50px; text-align:center\">"+fs[n]+"<\/div>";
					writestr+="<div style=\"float:left; width:50px; text-align:center\">"+"<input id=\"cb"+n+"\" type=\"checkbox\" checked />"+"<\/div>";
				writestr+="<\/div>";
			}
			
			writestr+="<div style=\"clear:both;\">";
				writestr+="<input id=\"calcbtn\" type=\"button\" value=\"计算学分绩\" onclick=\"calc()\" \/>";
				writestr+="<input id=\"clearbtn\" type=\"button\" value=\"关闭学分绩计算器\" onclick=\"clearcalc()\" \/>";
			writestr+="<\/div>";
			writestr+="<div style=\"clear:both;\">";
				writestr+="<p><\/p>对成绩不满意？<a href=\"http://www.groundmelon.freehosting.com/hitgpacalc/cheat.html\" target=\"_blank\">点击这里<\/a>修改成绩";
			writestr+="<\/div>";
			
			mydiv.innerHTML=writestr;
			
			
		}catch(e){
			writestr+="<div style=\"clear:both;\">";
				writestr+="<p><\/p><p>对不起！脚本运行出错！如果你愿意，请按如下方法反馈：右键——查看网页源代码，把里面的东西复制下来，保存在文本文件里（可以删去学号和姓名），发送到GroundMelon@gmail.com。感谢您的支持！<\/p>";
			writestr+="<\/div>";
			mydiv.innerHTML=writestr;
		}
	}

}else{//校内
	try{
		a=str.match(/<tr onmouseover="SeeSetBg\(this\)" onmouseout="SeeReBg\(this\)"[\s\S]*?<\/tr>/g);
		l=a.length;
		kc=new Array(l);
		xf=new Array(l);
		fs=new Array(l);
		
		for (n=0;n<l;n++)
		{
			kc[n]=(a[n].match(/<td[\s\S]*?<\/td>[\s\S]*?<td><div align="left">(.*)(?=<\/div><\/td>)/))[0];
			kc[n]=RegExp.$1;
			xf[n]=a[n].match(/<td[\s\S]*?<\/td>[\s\S]*?(<td>.*<\/td>[\s\S]*?){3}<td><div align="center">[\s\S]*?(\d.\d)(?=[\s\S]*?<\/div><\/td>)/)[0];
			xf[n]=RegExp.$2;
			fs[n]=a[n].match(/(<td[\s\S]*?<\/td>[\s\S]*?){7}<td[\s\S]*?<a[\s\S]*?>(.+)(?=<\/a>[\s\S]*?<\/div><\/td>)|(<td[\s\S]*?<\/td>[\s\S]*?){7}<td[\s\S]*?<div align="center">[\s]*(.+)(?=[\s]*<\/div><\/td>)/)[0];
			fs[n]=RegExp.$2+RegExp.$4;
		}
		
		for (n=0;n<l;n++)
		{
			writestr+="<div style=\"clear:both;\">";
				writestr+="<div style=\"float:left; width:200px;\">"+kc[n]+"<\/div>";
				writestr+="<div style=\"float:left; width:50px; text-align:center\">"+xf[n]+"<\/div>";
				writestr+="<div style=\"float:left; width:50px; text-align:center\">"+fs[n]+"<\/div>";
				writestr+="<div style=\"float:left; width:50px; text-align:center\">"+"<input id=\"cb"+n+"\" type=\"checkbox\" checked />"+"<\/div>";
			writestr+="<\/div>";
		}
		
		writestr+="<div style=\"clear:both;\">";
			writestr+="<input id=\"calcbtn\" type=\"button\" value=\"计算学分绩\" onclick=\"calc()\" \/>";
			writestr+="<input id=\"clearbtn\" type=\"button\" value=\"关闭学分绩计算器\" onclick=\"clearcalc()\" \/>";
		writestr+="<\/div>";
		writestr+="<div style=\"clear:both;\">";
			writestr+="<p><\/p>对成绩不满意？<a href=\"http://www.groundmelon.freehosting.com/hitgpacalc/cheat.html\" target=\"_blank\">点击这里<\/a>修改成绩";
		writestr+="<\/div>";
		
		mydiv.innerHTML=writestr;
		
		
	}catch(e){
		writestr+="<div style=\"clear:both;\">";
			writestr+="<p><\/p><p>对不起！脚本运行出错！如果愿意，请按如下方法反馈：右键——查看网页源代码，把里面的东西复制下来，保存在文本文件里（可以删去学号和姓名），发送到GroundMelon@gmail.com。感谢您的支持！<\/p>";
		writestr+="<\/div>";
		mydiv.innerHTML=writestr;
	}
	
}

//document.getElementById("calcbtn").addEventListener('click',calc,false);
//document.getElementById("clearbtn").addEventListener('click',clearcalc,false);
			
function calc()
{
	var ixf,xfj;
	var s;
	ixf=0;xfj=0;
	for (n=0;n<l;n++)
	{
		s="cb"+n;
		if (document.getElementById(s).checked==true){
			ixf=ixf+parseFloat(xf[n]);
			xfj=xfj+parseFloat(xf[n])*parseFloat(fs[n]);
		}
		
	}
	alert("所选科目的学分绩是："+xfj/ixf);
}

function clearcalc()
{
	elem=document.getElementById("gpadiv");
	document.body.removeChild(elem);
}


var winWidth = 0;
var winHeight = 0;
var x;
function findDimensions() //函数：获取尺寸
{
	//获取窗口宽度
	if (window.innerWidth)
	   winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
	   winWidth = document.body.clientWidth;
	//获取窗口高度
	if (window.innerHeight)
	   winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
	   winHeight = document.body.clientHeight;

	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement  && document.documentElement.clientHeight &&
									  document.documentElement.clientWidth)
	{
	 winHeight = document.documentElement.clientHeight;
	 winWidth = document.documentElement.clientWidth;
	}
	if (location.href=="http://jwc.hit.edu.cn/cjcx/cx.asp"){
	 x=""+((winWidth-670)/2+670)+"px";
	 document.getElementById("gpadiv").style.left=x;
	 document.getElementById("gpadiv").style.width="400px";
	 document.body.scrollLeft=document.body.scrollWidth;
	}
}
findDimensions();                  //调用函数，获取数值
window.onresize=findDimensions;
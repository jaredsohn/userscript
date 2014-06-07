// ==UserScript==
// @name           HITGPACALC
// @namespace      HITGPACALC
// @description    哈工大学分绩计算器 v1.6
// @include        http://jwc.hit.edu.cn/students/xwcx.asp
// @include        http://xscj.hit.edu.cn/hitjwgl/xs/cjcx/CX_1.asp?LB=1
// @include        http://xscj.hit.edu.cn/hitjwgl/xs/cjcx/CX_1.asp?LB=2
// @include        https://vpn.hit.edu.cn/hitjwgl/xs/cjcx/,DanaInfo=xscj.hit.edu.cn+CX_1.asp?LB=1
// @include        https://vpn.hit.edu.cn/hitjwgl/xs/cjcx/,DanaInfo=xscj.hit.edu.cn+CX_1.asp?LB=2

// ==/UserScript==
var myVersion="1.5";
var str=document.body.innerHTML;
var a,kc,n,xf,fs,l,kch;
var tempstr="";
var mysite="http://groundmelon.duapp.com/hitgpacalc/";
var mysite1="http://groundmelon.kiluweb.com/hitgpacalc/";
var chky="1";
var chkn="0";
var XIAOWAICHAXUN="http://jwc.hit.edu.cn/students/xwcx.asp";

var mydiv = document.createElement("div"); 
mydiv.id = "gpadiv"; 
mydiv.style.zIndex = "100"; 
mydiv.style.position = "absolute"; 
mydiv.style.left = "840px"; 
mydiv.style.top = "120px"; 
mydiv.style.width = "360px"; 
mydiv.style.height = "auto"; 
mydiv.style.border = "5px solid"; 
mydiv.style.overflow = "auto"; 
mydiv.style.backgroundColor = "#F7F4EC"; 
mydiv.style.color="#000000";
mydiv.style.fontSize="16px";
mydiv.style.lineHeight="24px";
//document.body.appendChild(mydiv);



writestr="";
writestr+="<div style=\"clear:both; text-align:center\">";
	writestr+="欢迎使用哈工大在线学分绩计算器 by 4系地瓜    ";
writestr+="<\/div>";

writestr+="<div style=\"clear:both;\">";
	writestr+="<div style=\"float:left; width:50px;\">"+"&nbsp;"+"<\/div>";
	writestr+="<div style=\"float:left; width:100px; text-align:center\">"+"<input id=\"unfoldbtn\" type=\"button\" value=\"展开\" style=\"width:90px\">"+"<\/div>";
	writestr+="<div style=\"float:left; width:100px; text-align:center\">"+"<input id=\"foldbtn\" type=\"button\" value=\"收起\" style=\"width:90px;\">"+"<\/div>";
	writestr+="<div style=\"float:left; width:90px; text-align:center; font-size:14px\">"+"版本 "+myVersion;+"<\/div>";
writestr+="<\/div>";

writestr+="<div id = 'content'>"
    writestr+="<div style=\"clear:both; text-align:left;  font-size:14px\">";
        writestr+="检查更新&反馈问题 请访问<a href=\""+mysite+"\" target=\"_blank\">项目主页<\/a>";
    writestr+="<\/div>";
     
    mydiv.innerHTML=writestr;
    
    if (location.href==XIAOWAICHAXUN){//校外
        if (str.match(/成绩单/)==null){
            writestr+="<div style=\"clear:both;\">";
                writestr+="<p>当前页面没有成绩表！<\/p>";
            writestr+="<\/div>";
            mydiv.innerHTML=writestr;
        }
        else{
            try{
                str = document.body.innerHTML;
                document.body.innerHTML = str.replace('<table border="1" cellpadding="0" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#999999">'
                                                ,'<table id="cjb" border="1" cellpadding="0" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#999999">');			
                
                cjb=document.getElementById("cjb");
                
                rows=cjb.getElementsByTagName("tr").length;
                cols=cjb.getElementsByTagName("tr")[0].getElementsByTagName("td");
                l=rows-1;
                
                kc=new Array(l);
                xq=new Array(l);
                fs=new Array(l);
                
                for(i=1;i<rows;++i)
                {
                    n=i-1;
                    item=cjb.getElementsByTagName("tr")[i];
                    xq[n]=item.getElementsByTagName("td")[0].innerHTML.replace('&nbsp;','');
                    kc[n]=item.getElementsByTagName("td")[1].innerHTML.replace('&nbsp;','');;
                    fs[n]=item.getElementsByTagName("td")[2].innerHTML.replace('&nbsp;','');;
                }
                
                
                lastxq="0";
                thisxq="1";
                for (n=0;n<l;n++)
                {
                    thisxq=xq[n];
                    if (lastxq!=thisxq)
                    {              	
                        writestr+="<div style=\"clear:both;\">";
                            writestr+="<div style=\"float:left;\">"+"======== "+thisxq+" ========"+"<\/div>";
                        writestr+="<\/div>";
                    }
                    
                    lastxq=thisxq;
                    
                    writestr+="<div style=\"clear:both;\">";
                        writestr+="<div style=\"float:left; width:200px;\">"+kc[n]+"<\/div>";
                        writestr+="<div style=\"float:left; width:50px; text-align:center\">"+fs[n]+"<\/div>";
                        writestr+="<div style=\"float:left; width:50px; text-align:center\">"+"<input id=\"cb"+n+"\" type=\"checkbox\" checked />"+"<\/div>";
                    writestr+="<\/div>";
                }
                            
            }catch(e){
                writestr+="<div style=\"clear:both;\">";
                    writestr+="<p><\/p><p>对不起！脚本运行出错！如果你愿意，请按如下方法反馈：右键——查看网页源代码，把里面的东西复制下来，保存在文本文件里（可以删去学号和姓名），发送到GroundMelon@gmail.com。感谢您的支持！<\/p>";
                writestr+="<\/div>";
                mydiv.innerHTML=writestr;
            }
        }
        
        writestr+="<div style=\"clear:both;text-align:center;\">没有学分数据，不能计算学分绩";
            //writestr+="";
        writestr+="<\/div>";
        writestr+="<div><\/div>";
        
        
        writestr+="<div style=\"clear:both;text-align:center;\">";
            writestr+="<input id=\"clearbtn\" type=\"button\" value=\"关闭学分绩计算器\"/>";
        writestr+="<\/div>";
        writestr+="<div style=\"clear:both;\">";
            writestr+="<p><\/p>对成绩不满意？<a href=\"javascript:alert('认真学习吧，少年:-P')\" target=\"_blank\">点击这里<\/a>修改成绩";
        writestr+="<\/div>";
    writestr+="<\/div>";
	
	mydiv.innerHTML=writestr;
	console.log(mydiv);
    }
    else//校内
    {	
        try
        {
            a=str.match(/<tr onmouseover="SeeSetBg\(this\)" onmouseout="SeeReBg\(this\)"[\s\S]*?<\/tr>/g);
            l=a.length;
            kc=new Array(l);
            xf=new Array(l);
            fs=new Array(l);
            kch=new Array(l);
            xq=new Array(l);
            
            for (n=0;n<l;n++)
            {
                xq[n]=(a[n].match(/<td height="25"><div align="center">(.+)(?=<\/div><\/td>)/))[0];
                xq[n]=RegExp.$1;
                kc[n]=(a[n].match(/<td[\s\S]*?<\/td>[\s\S]*?<td><div align="left">(.*)(?=<\/div><\/td>)/))[0];
                kc[n]=RegExp.$1;
                xf[n]=a[n].match(/<td[\s\S]*?<\/td>[\s\S]*?(<td>.*<\/td>[\s\S]*?){3}<td><div align="center">[\s\S]*?(\d.\d)(?=[\s\S]*?<\/div><\/td>)/)[0];
                xf[n]=RegExp.$2;
                fs[n]=a[n].match(/(<td[\s\S]*?<\/td>[\s\S]*?){7}<td[\s\S]*?<a[\s\S]*?>(.+)(?=<\/a>[\s\S]*?<\/div><\/td>)|(<td[\s\S]*?<\/td>[\s\S]*?){7}<td[\s\S]*?<div align="center">[\s]*(.+)(?=[\s]*<\/div><\/td>)/)[0];
                fs[n]=RegExp.$2+RegExp.$4;
                kch[n]=a[n].match(/<td><div align="center">(.*)(?=<\/div><\/td>)/)[0];
                kch[n]=RegExp.$1;
            
            }
            
            
            lastxq="0";
            thisxq="1";
                   
            for (n=0;n<l;n++)
            {
                thisxq=xq[n];
                if (lastxq!=thisxq)
                {         
                    writestr+="<div style=\"clear:both;\">";
                        writestr+="<div style=\"float:left; width:50px;\">"+" "+"<\/div>";
                        writestr+="<div style=\"float:left; width:350px;\">"+"========== "+thisxq+" =========="+"<\/div>";
                    writestr+="<\/div>";
                }
                lastxq=thisxq;
                            
                writestr+="<div style=\"clear:both;\">";
                    writestr+="<div style=\"float:left; width:200px;\">"+kc[n]+"<\/div>";
                    writestr+="<div style=\"float:left; width:50px; text-align:center\">"+xf[n]+"<\/div>";
                    writestr+="<div style=\"float:left; width:50px; text-align:center\">"+fs[n]+"<\/div>";
                    writestr+="<div style=\"float:left; width:50px; text-align:center\">"+"<input id=\"cb"+n+"\" type=\"checkbox\" checked />"+"<\/div>";
                writestr+="<\/div>";
            }
            
        }catch(e){
            writestr+="<div style=\"clear:both;\">";
                writestr+="<p><\/p><p>对不起！脚本运行出错！如果愿意，请按如下方法反馈：右键——查看网页源代码，把里面的东西复制下来，保存在文本文件里（可以删去学号和姓名），发送到GroundMelon@gmail.com。感谢您的支持！<\/p>";
            writestr+="<\/div>";
            mydiv.innerHTML=writestr;
        
        
            document.getElementById("savebtn").addEventListener('click',save,false);
            document.getElementById("loadbtn").addEventListener('click',load,false);
        }
        
        writestr+="<div style=\"clear:both;text-align:center;\">";
            writestr+="<input id=\"choosebtn\" type=\"button\" value=\"选择高学分课程\">";
            writestr+="<input id=\"chooseallbtn\" type=\"button\" value=\"全选\">";
            writestr+="<input id=\"unchooseallbtn\" type=\"button\" value=\"清空\"/>";
            writestr+="<input id=\"savebtn\" type=\"button\" value=\"储存勾选信息\"/>";
            writestr+="<input id=\"loadbtn\" type=\"button\" value=\"读取勾选信息\"/>";
        writestr+="<\/div>";
        writestr+="<div><\/div>";
        
        
        writestr+="<div style=\"clear:both;text-align:center;\">";
            writestr+="<input id=\"calcbtn\" type=\"button\" value=\"计算学分绩\"/>";
            writestr+="<input id=\"clearbtn\" type=\"button\" value=\"关闭学分绩计算器\"/>";
        writestr+="<\/div>";
        writestr+="<div style=\"clear:both;\">";
            writestr+="<p><\/p>对成绩不满意？<a href=\"javascript:alert('认真学习吧，少年:-P')\" target=\"_blank\">点击这里<\/a>修改成绩";
        writestr+="<\/div>";
	writestr+="<\/div>";
	mydiv.innerHTML=writestr;
}
	document.body.appendChild(mydiv);
	document.getElementById("clearbtn").addEventListener('click',clearcalc,false);
	document.getElementById("unfoldbtn").addEventListener('click',unfold,false);
    document.getElementById("foldbtn").addEventListener('click',fold,false);
        
if (location.href!=XIAOWAICHAXUN)
{
    document.getElementById("calcbtn").addEventListener('click',calc,false);	
    document.getElementById("chooseallbtn").addEventListener('click',chooseall,false);
    document.getElementById("unchooseallbtn").addEventListener('click',unchooseall,false);
    document.getElementById("choosebtn").addEventListener('click',choose,false);
    document.getElementById("unfoldbtn").addEventListener('click',unfold,false);
    document.getElementById("foldbtn").addEventListener('click',fold,false);
    document.getElementById("savebtn").addEventListener('click',save,false);
    document.getElementById("loadbtn").addEventListener('click',load,false);
    unchooseall();
    choose();
    fold();
}


function unfold()
{
    //elem=document.getElementById("gpadiv");
	//elem.style.height="auto";
    elem=document.getElementById("content");
    elem.style.display="block";
}
function fold()
{
    //elem=document.getElementById("gpadiv");
	//elem.style.height="60px";
    elem=document.getElementById("content");
    elem.style.display="none";
}


function calc()
{
	var ixf,xfj,bz,gj,bd;
	var s;
	
	rstdiv = document.createElement("div"); 
	rstdiv.id = "rstdiv"; 
	rstdiv.style.zIndex = "100"; 
	rstdiv.style.position = "absolute"; 
	rstdiv.style.margin = "-150px 0px 0px -200px";
	rstdiv.style.left = "50%"; 
	rstdiv.style.top =(document.documentElement.scrollTop || document.body.scrollTop)+parseInt(window.screen.availHeight/2)+"px";
	rstdiv.style.width = "400px";
	rstdiv.style.height = "300px"; 
	rstdiv.style.border = "5px solid"; 
	rstdiv.style.overflow = "auto"; 
	rstdiv.style.backgroundColor = "#F7F4EC"; 
	rstdiv.style.color="#000000";
	rstdiv.style.fontSize="16px";
	rstdiv.style.lineHeight="1.2";
	document.body.appendChild(rstdiv);
	
	ixf=0;xfj=0;bz=bd=gj=0;
	for (n=0;n<l;n++)
	{
		s="cb"+n;
		if (document.getElementById(s).checked==true){
			ixf=ixf+parseFloat(xf[n]);
			//学分绩
			xfj=xfj+parseFloat(xf[n])*parseFloat(fs[n]);
			//标准
			bz=bz+parseFloat((fs[n]==100)?4:Math.floor((fs[n]-60)/10+1))*parseFloat(xf[n]);
			//改进
			if (fs[n]>=85) {gj=gj+parseFloat(xf[n])*parseFloat(4);}
			else{
				if (fs[n]>=70) {gj=gj+parseFloat(xf[n])*parseFloat(3);}
				else{
					if (fs[n]>=60) {gj=gj+parseFloat(xf[n])*parseFloat(2);}
				}
			}
			//北大
			if (fs[n]>=90) {bd=bd+parseFloat(xf[n])*parseFloat(4);}
			else{
				if (fs[n]>=85) {bd=bd+parseFloat(xf[n])*parseFloat(3.7);}
				else{
					if (fs[n]>=82) {bd=bd+parseFloat(xf[n])*parseFloat(3.3);}
					else{
						if (fs[n]>=78) {bd=bd+parseFloat(xf[n])*parseFloat(3.0);}
						else{
							if (fs[n]>=75) {bd=bd+parseFloat(xf[n])*parseFloat(2.7);}
							else{
								if (fs[n]>=72) {bd=bd+parseFloat(xf[n])*parseFloat(2.3);}
								else{
									if (fs[n]>=68) {bd=bd+parseFloat(xf[n])*parseFloat(2.0);}
									else{
										if (fs[n]>=64) {bd=bd+parseFloat(xf[n])*parseFloat(1.5);}
										else{
											if (fs[n]>=60) {bd=bd+parseFloat(xf[n])*parseFloat(1.0);}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
	}
	rstdiv.innerHTML+="<p></p>"
	rstdiv.innerHTML+="<div>&nbsp;&nbsp;所选科目的学分绩是："+toDecimal(xfj/ixf)+"</div>";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">"+"</p>";
	rstdiv.innerHTML+="<div style=\"line-height:1\">&nbsp;&nbsp;所选科目的GPA是：";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">标准算法&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;："+toDecimal(xfj/ixf/25)+"</p>";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">标准4.0算法 ："+toDecimal(bz/ixf)+"</div>";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">改进4.0算法 ："+toDecimal(gj/ixf)+"</div>";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">北大4.0算法 ："+toDecimal(bd/ixf)+"</div>";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">"+"</p>";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">"+"</p>";
	rstdiv.innerHTML+="<p style=\"text-indent:2em;\">"+"算法说明请点击<a href=\""+mysite+"method.html\" target=\"_blank\">这里<\/a>"+"</p>"+"</div>";
	rstdiv.innerHTML+="<div>&nbsp;&nbsp;<input id=\"clrrstbtn\" type=\"button\" value=\"关闭窗口\" /></div>";
	
	document.getElementById("clrrstbtn").addEventListener('click',clearrst,false);
}

function clearcalc()
{
	try{
		elem=document.getElementById("rstdiv");
		document.body.removeChild(elem);
	}catch(e){}
	
	elem=document.getElementById("gpadiv");
	document.body.removeChild(elem);
}

function clearrst()
{
	elem=document.getElementById("rstdiv");
	document.body.removeChild(elem);
}
function chooseall()
{
	for (n=0;n<l;n++)
	{
		s="cb"+n;
		document.getElementById(s).checked=true;	
	}
}

function choose()
{
	for (n=0;n<l;n++)
	{
		s="cb"+n;
		if (xf[n]>=2.5)
		{
			document.getElementById(s).checked=true;	
		}else{
			document.getElementById(s).checked=false;
		}
	}
}

function unchooseall()
{
	for (n=0;n<l;n++)
	{
		s="cb"+n;
		document.getElementById(s).checked=false;	
	}
}

function save()
{
	for (n=0;n<l;n++)
	{
		s="cb"+n;
		if (document.getElementById(s).checked==true)
		{
			setCookie(kch[n],chky,365);
			if (getCookie(kch[n])==null) alert("NULL");
		}else{
			setCookie(kch[n],chkn,365);
		};	
	}
	alert("存储成功！");
}

function load()
{
	var mycookies;
	for (n=0;n<l;n++)
	{
		s="cb"+n;
		mycookies=getCookie(kch[n]);
		if (mycookies!=null)
		{
			
			if (mycookies==chky)
			{
				document.getElementById(s).checked=true;
			}else
			{
				document.getElementById(s).checked=false;
			}
		}
		else
		{
			alert("没有存储记录！");
		}
			
	}
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return ""
}
function toDecimal(x) {  
	var f = parseFloat(x);  
	if (isNaN(f)) {  
		return;  
	}  
	f = Math.round(x*100)/100;  
	return f;  
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
	
    if (location.href==XIAOWAICHAXUN){
	 x=""+((winWidth-670)/2+670)+"px";
	 document.getElementById("gpadiv").style.left=x;
	 document.getElementById("gpadiv").style.width="400px";
	 document.body.scrollLeft=document.body.scrollWidth;
    }else{
    	x=""+((winWidth-340)/2+340)+"px";
	 	document.getElementById("gpadiv").style.left=x;
    }
}
findDimensions();                  //调用函数，获取数值
window.onresize=findDimensions;
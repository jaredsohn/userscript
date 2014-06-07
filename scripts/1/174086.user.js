// ==UserScript==
// @name        贴吧涂鸦_加强版
// @namespace   yuxingyc
// @description 新画笔 更多颜色 代码画图
// @include     http://tieba.baidu.com/*
// @downloadURL	https://userscripts.org/scripts/source/174086.user.js
// @updateURL	https://userscripts.org/scripts/source/174086.meta.js
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant unsafeWindow
// @grant GM_addStyle
// @version     1.0
// ==/UserScript==
var $=unsafeWindow.$;
var isPaint=true;
var flag=true;
var firstClick=true;
var example,ex;
var lastPng;
var update="20130724011";//更改数字重新下载sketchpad_core_a150a062.js

var jsCode;

$(".picasso")[0].addEventListener("click",function()
{
	if(!unsafeWindow.option_editor.picasso){return}
	if(flag)jsCode=GM_getValue("code","0");
	if(jsCode.length>100)addJs(jsCode);
	else 
	{
		GM_setValue("update","_");	
		location.href=location.href;		
	}
},false);

if(GM_getValue("update"," ")!=update)
{
	getJsCode();
	GM_setValue("update",update);	
	$(".tb-editor-editarea").focus();
} 


function getJsCode()
{	
	GM_xmlhttpRequest({
		method: "GET",
		url:"http://tb1.bdstatic.com/tb/_/sketchpad_core_a150a062.js",
		headers: {
		"User-Agent": "Mozilla/5.0",
		"Cookie": document.cookies
		},
		onload:function(response){
						
			var str=response.responseText;
			var a=[],b=[];
			
			//改变mousedown事件 画笔逐渐变大
			a[0]='a.drawPoint(a.resultContext';			
			b[0]=''+
					'var max=parseInt($("#brushWidth")[0].value);function thick_xxx(){setTimeout(function(){a.setLineWidth(x++),x<max&&thick_xxx()},10)}a.setLineWidth(1);var x=1,ss=a.lineWidth;thick_xxx();'+
					'a.setPaintColor($("#brushColor")[0].value);'+
					'a.drawPoint(a.resultContext';			
			str=str.replace(a[0],b[0]);
			
			//改变mousedup事件 画笔逐渐变小
	    a[1]=/_mouseUpLineHandler\:.*?_mouseMoveShapeHandler\:/;		   
			b[1]=''+
			'_mouseUpLineHandler:'+
			'function(b) {var a = this;'+
			'if(a.drawing){var x=a.lineWidth;'+
			'function thin_xxx(){'+
			'setTimeout(function(){a.setLineWidth(x);x--;'+
			'if(x<1){a.drawing = false;a._pushHistory(a.currentCommand);a.currentCommand = null;}'+
			'else thin_xxx();},10);}'+
			'thin_xxx();}},'+
			"_mouseMoveShapeHandler:";
			str=str.replace(a[1],b[1]);			
			if(/thick_xxx/.test(str))
			if(/thin_xxx/.test(str)){GM_setValue("code",str);document.title="涂鸦代码修改完成";}
			else alert("涂鸦脚本替换代码出现错误!");
		}	
	});	
}
var noJs=true;
function addJs(str)
{	
	isPaint=true;
		//关闭浏览器窗口事件
	if(noJs)
	{
		var script=document.createElement("script");
		script.text=str;
		document.body.appendChild(script);
		noJs=false;
//-----------示例-------
ex=function(){
var canvas = document.getElementsByClassName('sketchpad_result')[0];
var context = canvas.getContext('2d');
canvas.width = canvas.width;/*清空画布*/

context.font = '28px 黑体';
context.fillStyle =  'rgb(0,0,60)  ';
context.fillText('新画笔 更多颜色 代码画图', 10, 200);

context.font = '30px 隶书';
context.fillStyle = 'green';
context.fillText('欢迎使用', 10, 50);
context.translate(130, 0);

context.font = '35px 隶书';
context.fillStyle = 'blue';
context.fillText('贴吧涂鸦', 0, 50);
context.translate(150, 0);

context.font = '24px 隶书';
context.fillStyle = 'red';
context.fillText('加强版', 0, 48);

context.translate( -270, 0);

context.beginPath();
context.arc(200, 180, 70, 0, Math.PI*2 , true);
context.closePath();
context.fillStyle ='rgba(60,0,240,0.5)';
context.fill();

context.beginPath();
context.arc(120, 180, 50, 0, Math.PI*2 , true);
context.closePath();
context.fillStyle ='rgba(0,240,0,0.5)';
context.fill();

context.fillStyle = ' rgba(240,120,0,0.5)';
context.strokeStyle = 'yellow';
context.fillRect(0, 120, 100, 100);
context.font = '14px 宋体';
context.fillStyle = 'rgb(30,180,120)';
context.fillText('编程模式:点击色盘可插入颜色代码', 0, 270);
context.fillText('涂鸦模式:上一步-Z 下一步-X 橡皮-C 画笔-V 滚轮改变大小', 0, 290);
}
//-----------	示例---
	var s=String(ex);
	example=String(s).slice(12,-1);	
	}
			
	setTimeout(function()
	{			
			
		if($(".sketchpad_result")[0])
		{	
			
			window.onbeforeunload=function(){return "确定要关闭吗？";}				
			if(flag)
			{
				$("body").append("<div style='display:none'><input id='brushWidth'  value='6'><input id='brushColor' value='blue'></div>");
				document.body.addEventListener("DOMMouseScroll", function(e)
				{	
					if(!isPaint){return;}	
					var s=parseInt($("#brushWidth")[0].value);
					e.detail>0?s--:s++;
					if(s<1)s=1;
					if(s>9)s=9;
					$("#brushWidth")[0].value=s;
					$(".dialogJtxt").html("涂鸦 画笔大小:"+s);
					e.preventDefault();
				}, false);
				$(document).bind('keyup',xkeyup);	
			}	
			$(".sketchpad_mask").bind('mouseup',savePng);
			$(".sketchpad_mask").bind('mousedown',function()
			{
				if(firstClick){firstClick=false;var a=$(".sketchpad_result")[0];a.width=a.width;}
			});
			//下一步 上一步
			$(".sketchpad_undo").bind('click',undo);
			$(".sketchpad_redo").bind('click',redo);
			//清空历史操作
			$(".sketchpad_clear").bind('click',function()
			{
				if(pngCodeNum==-1){loadImg(lastPng);pngCodeNum=0;}//还原
				else 
				{
				pngCodeNum=-1;				
				pngCode.length="";				
				}
				this.disabled=false;
			});
			$(".sketchpad_clear").html("清空/还原");			
			$(".sketchpad_clear")[0].disabled=false;
			
			$(".color_panel").hide();
					//完成
			$(".sketchpad_finish").click(qiut);
			//退出涂鸦
			$(".dialogJclose").mouseup(function(){$(".j_ok").click(qiut)});
			$(".j_ok").click(qiut);		
			
			textEditor();
			colorSelector();			
			if(firstClick)ex();			
			if(lastPng)loadImg(lastPng);//还原最后保存的图片		
			flag=false;
		}
		else 
		{
			addJs();
			document.title='欢迎使用涂鸦加强版';			
		}	
	},1000);		
}


function qiut()	
{	
	window.onbeforeunload=null;
	$("#bddiv20130724").remove();
	$("#colordiv20130724").remove();
	isPaint=false;		
}



var pngCode=[],pngCodeNum=-1;
function savePng()
{	
	setTimeout(function()
	{
		pngCodeNum++;
		var canvas = $(".sketchpad_result")[0];
		var a=canvas||"image/png";
		var c=canvas.toDataURL(a);
		lastPng=c;
		pngCode[pngCodeNum]=c;
		if(pngCodeNum>50)pngCode[pngCodeNum-50]="";
		if(isColse)
		{	
			isColse=false;
			$(".dialogJmodal").remove();
			$(".dialogJclose").click();
			$(".j_ok").click();
			$(".picasso").click();
		}
	},90);
}

function loadImg(xxx)
{
	var canvas = $(".sketchpad_result")[0];
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	var bark = new Image();  
	bark.src =xxx;  
	bark.onload = function () 
	{  
		context.drawImage(bark,0,0);			
	} 
}

function undo()
{
	pngCodeNum--;
	if(pngCode[pngCodeNum].length<1){$(".sketchpad_redo")[0].click();return}	
	pngCodeNum>=0?loadImg(pngCode[pngCodeNum]):pngCodeNum=-1;		
}
function redo()
{
	pngCodeNum++;
	pngCode[pngCodeNum]?loadImg(pngCode[pngCodeNum]):pngCodeNum--;
}

function xkeyup(e)
{	
	if(!isPaint){return;}			
	switch(e.keyCode)
	{    
	case 90: //z   
		$(".sketchpad_undo").trigger("click");//上一步   
		 break;   
	case 88://x
		$(".sketchpad_redo").trigger("click");//下一步
		break;
	case 67://c
		$(".sketchpad_button_eraser").find(".brush_big").trigger("click");//橡皮擦
		break;
	case 86://v
		$(".sketchpad_button_brush").find(".brush_small").trigger("click");//笔

		break;
	} 		
}

function Get_srcElement(e)
{
	var ee=window.event||e;
	var tmpObj = ee.srcElement ||  ee.target;
	var color=tmpObj.style.backgroundColor;
	$("#brushColor")[0].value=color;
	if($("#colordiv20130724")[0])add(color);
}

//颜色选择器 
function colorSelector()
{
  var colorDiv=document.createElement("div");
  colorDiv.id="colordiv20130724";

	colorDiv.style="line-height:0px;width:280px;right:20px;top:150px;background:#D9E3E6;z-index:9999999;position:fixed;border: 2px solid #379082;border-radius: 10px;padding: 3px;}";
    
  $("body").append(colorDiv);
	colorDiv.addEventListener("click",Get_srcElement,false);
	var clr=[];
	for(var k=0;k<=255;k=k+30)
		for(var j=0;j<=255;j=j+30)
			for(var i=0;i<=255;i=i+30)
				clr.push("rgb("+k+","+j+","+i+")");

	var rColor=[],n=0;
	for(var m=0;m<3;m++)
	{	
		for(var k=0;k<9;k++)
		{
			var cDiv=document.createElement("div");
			var rgb=m*100+k*10;
			if(rgb>255)rgb=255;
      cDiv.style="display:inline-block;background:rgb("+rgb+","+rgb+","+rgb+");width:10px;height:10px;"
			cDiv.title="rgb("+rgb+","+rgb+","+rgb+")";		
			colorDiv.appendChild(cDiv);
			for(var j=0;j<3;j++)
			{			
		    var step1=81*j+k*9+m*243;
				for(var i=step1;i<step1+9;i++)
				{					   
					var cDiv=document.createElement("div");
					cDiv.title=clr[i];
					cDiv.style="display:inline-block;background:"+clr[i]+";width:10px;height:10px;"
					colorDiv.appendChild(cDiv);										
					n++;
				}
			}
		}
	}			
}

var isColse=false,isSave=true;
function textEditor()
{	
	
	var btn = document.createElement("a");
	btn.href="javascript:;";
	btn.textContent="编程模式";
	$(".sketchpad_undo").before("<input title='上一步-Z 下一步-X 橡皮-C 画笔-V 滚轮调大小&#10;' type='button' id='bdDrawTxt'>　",btn,"　");	
	$("#bdDrawTxt").focus();
	$("#bdDrawTxt")[0].style.backgroundColor='rbga(0,0,0,0)';
	
	btn.addEventListener("click",function()
	{
		isPaint=false;
		firstClick=false;
		isColse=false;
		btn.style.display="none";	
				
		GM_addStyle("#bddiv20130724{background:#D9E3E6;position: absolute;left: 432px;z-index:9999999;border: 2px solid #379082;border-radius: 10px;padding: 3px;}");
		
		$("div.dialogJshadow").css({"left":"10px"});
		var div = document.createElement("div");
		var div1 = document.createElement("div");
		div.id="bddiv20130724";
		div.style.top=document.documentElement.scrollTop+40+"px";
		
		var tArea=document.createElement("textarea");
		tArea.style=" wrap:normal;background:#D9E3E6;width: 599px; height: 460px;"
		tArea.style.height=$(window).height()-90+"px";
		tArea.id="bdtextarea20130724";

		
		var btn1=document.createElement("a");
		btn1.href="javascript:;";
		btn1.textContent="[关闭] ";
		btn1.style="float:right";
		btn1.addEventListener("click",function()
		{			
			if(confirm("关闭代码编辑框?"))
			{
				isPaint=true;
				$("#bddiv20130724").remove();
				isColse=true;
				savePng();				
			}
		},false);

		
		var btnRun=document.createElement("input");
		btnRun.type="button";
		btnRun.value="运行代码";
		var cls=document.createElement("input");
		cls.type="button";
		cls.value="清空画布";

		cls.addEventListener("click",function()
		{
			var canvas = document.getElementsByClassName("sketchpad_result")[0];
			var context = canvas.getContext("2d");
			canvas.width = canvas.width;
			
		},false)
		
		var msg=document.createElement("span");
		msg.innerHTML="　　　　";
		msg.id="bdspan20130724";
		var savebtn=document.createElement("input");
		savebtn.type='button';
		savebtn.value='保存代码';
		
		var selectName=document.createElement("select");
		selectName.id='bdselect20130724'
		selectName.value='name';
		
		var inputName=document.createElement("input");
		inputName.type="text";
		inputName.style="width:100px;background:#EDEEEF;border:1px solid green";
		inputName.setAttribute("maxlength",8);
		inputName.id='bdinputname20130724';

		function addListName(text1,value1)
		{
			document.getElementById("bdselect20130724").options.add(new Option(text1, value1));
		}		
		var del=document.createElement("input");
		del.type="button";
		del.value='删除';
		div.appendChild(div1);
		
		div1.appendChild(btn1);		
		div1.appendChild(cls);
		div1.appendChild(msg);
		div1.appendChild(btnRun);
		div1.appendChild(savebtn);		
		div1.appendChild(inputName);		
		div1.appendChild(selectName);
		div1.appendChild(del);				

		div.appendChild(tArea);
		document.body.appendChild(div);	
		
		tArea.addEventListener("keyup",savePos,false);
		tArea.addEventListener("keydown",function(){savePos();isSave=false;},false);
		tArea.addEventListener("mouseup",savePos,false);
		tArea.addEventListener("mousedown",savePos,false);
		tArea.addEventListener("focus",savePos,false);
						
		var oldJs=false;
		savebtn.addEventListener("click",function()
		{
			var fn=$('#bdinputname20130724')[0].value.replace(/ /g,"");
			if(fn.length<1)
			{
				alert("文件名为空\n\n请在按钮旁边的输入框输入文件名");
			}
			else
			{				
				var aa=JSON.parse(GM_getValue("gmFlileName","[{}]"));			
				var b=true;				
				var textAr=$("#bdtextarea20130724")[0];
				var code=textAr.value.replace(/\/\*\* 代码名称.*? \*\*\/\n/,"");
				var oldJs=/代码名称/.test(textAr.value.substring(0,11));//	
				var headInfo="/** 代码名称:## "+fn+" ## 保存时间:"+CurentTime()+" **/\n";			
				var nnn=headInfo+code;	
				var len=aa.length;
				for(var i=0;i<len;i++)
				{
					if(fn==aa[i].filename)
					{
						b=false;				
						if(oldJs)
						{
							GM_setValue(String(i),nnn);
							textAr.value=nnn;
							isSave=true;
							fList();
						}
						else if(confirm(fn+" 已经存在. 覆盖文件?"))
						{
							GM_setValue(String(i),nnn);
							start=0;end=0;add(headInfo);
							isSave=true;
							fList();
						}													
						i=len;						
					}		
				}		
				if(b)
				{				
					GM_setValue(String(len),nnn);
					start=0;end=0;add(headInfo);
					var newFn={"filename":fn,"num":len};					
					aa.push(newFn);
					GM_setValue("gmFlileName",JSON.stringify(aa));
					fList();
					isSave=true;
				}											
			}			
		},false);
		function CurentTime()
    { 
			var d = new Date();
			return d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(); 
    } 		
		
		function fList()
		{
			document.getElementById("bdselect20130724").innerHTML="";			
			var aa=GM_getValue("gmFlileName");
			if(!aa||aa=="[]")
			{	
				var ex1='var canvas = document.getElementsByClassName("sketchpad_result")[0];\n'+
				'var context = canvas.getContext("2d");\n'+
				'canvas.width = canvas.width;/*清空画布*/\n';					
				aa=JSON.parse('[{"filename":"示例", "num": "0"}]');								
				GM_setValue("gmFlileName",'[{"filename":"示例", "num": "0"}]');
				GM_setValue("-1",ex1);
				GM_setValue("0",example);
			}else
				{
					aa=JSON.parse(aa)
				}
			addListName("- - -","-1");
			addListName("新 建","-1");
			for(var i=aa.length-1;i>=0;i--)
			{
				addListName(aa[i].filename,aa[i].num);
			}
		}
		fList();			
		
		selectName.addEventListener("change",function()
		{
				if(!isSave){if(confirm("正在编辑的代码还没保存. 放弃保存?"))isSave=true;else reutrn; }
				var v=this[this.selectedIndex];				
				$("#bdtextarea20130724")[0].value=GM_getValue(v.value,"");				
				$("#bdinputname20130724")[0].value=v.text;
		},false);		
		//删除
		del.addEventListener("click",function()
		{
			var v=$(this).prev()[0];
			var s=v[v.selectedIndex];			
			if(s.value==-1)return;
			if(confirm("删除 "+s.text+" ?"))
			{
				GM_deleteValue(s.value); 
				var aa=JSON.parse(GM_getValue("gmFlileName","[{}]"));
				var len=aa.length;
				for(var i=0;i<len;i++)
				{
					if(s.text==aa[i].filename)
					{
						aa.splice(i,1);
						i=len;
					}
				}
				GM_setValue("gmFlileName",JSON.stringify(aa));				
				fList();
			}
		},false);
		
		btnRun.addEventListener("click",function()
		{
			//执行代码
			var str=$("#bdtextarea20130724")[0].value.replace(/\n/,"");
			var msg="\ndocument.getElementById('bdspan20130724').innerHTML=";						
			js_Run(str+msg+"'　　　　';");						
		},false);
		
	//可移动的编辑框
	$(div1).mousedown(function(e){
		var el=$("#bddiv20130724");		
		var xxx =  e.pageX- el.offset().left;
		var yyy =  e.pageY - el.offset().top; 		
		$(this).mousemove(function(e){		
		el.css({"left": (e.pageX - xxx), "top": (e.pageY - yyy) });		
		});		
	});
	$(div1).mouseup(function(){
		$(this).unbind("mousemove");	
	});
	$(div1).mouseenter(function(){
		$(this).unbind("mousemove");	
	});
	},false);	
}

function js_Run(str)
{  
	try{var a=new Function(str)()}catch(e){document.getElementById('bdspan20130724').innerHTML="<font color=red>代码有误</font>";};
}

//光标位置插入代码
var start=0;
var end=0;
function add(str)
{     
  var textBox = document.getElementById("bdtextarea20130724");
  var pre = textBox.value.substr(0, start);
  var post = textBox.value.substr(end);
  textBox.value = pre + str + post;
}
function savePos()
{	
	var textBox = document.getElementById("bdtextarea20130724");
  if(typeof(textBox.selectionStart) == "number")
  {        
    start = textBox.selectionStart;
    end = textBox.selectionEnd;        
  } 
}

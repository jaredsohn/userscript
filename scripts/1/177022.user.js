// ==UserScript==
// @name        网页画图
// @namespace   yuxingyc
// @run-at document-end
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_openInTab
// @grant GM_xmlhttpRequest
// @include http*
// @downloadURL https://userscripts.org/scripts/source/177022.user.js
// @updateURL https://userscripts.org/scripts/source/177022.meta.js 
// @version     1.0
// ==/UserScript==
(function(){
var fontFamilyArr=["宋体","隶书","仿宋","黑体","微软雅黑","华文彩云","华文行楷","华文新魏"];	

var body=document.body;
function addElement(el,pos,s)
{
	var a=document.createElement(el);
	if(s)for(i in s)a.setAttribute(s[i][0],s[i][1]);   
	pos.appendChild(a);
	return a;
}
function addOption(el,text1,value1)
{
	el.options.add(new Option(text1, value1));
}
function mouseMoveElement(onEl,moveEl)
{
	var p=false,xxx,yyy;	
	onEl.onmousedown=function(e){
		p=true;
    e=e||window.event;		
		xxx =  e.pageX- moveEl.offsetLeft;
		yyy =  e.pageY - moveEl.offsetTop;	
	}
	body.addEventListener("mousemove",function(e){
		if(!p)return;				
		e=e||window.event;
		moveEl.style.left=e.pageX - xxx+"px";
		moveEl.style.top=e.pageY - yyy+"px";					
		},false);	
	onEl.onmouseup=function(){p=false}
};

function CanvasPainter(canvasWidth,canvasHeight)
{	
	this.init=function()
	{	
		var a=this;
		this.path=[];
		this.tmpPath=[];
		this.historyData=[];
		this.isKeydown=[];		
		this.brush=1;
		this.moveStep=0;
		this.smooth=0;
		this.tiebaUploadStep=0;
		this.isHide=false;
		this.htyNum=0;
		this.htyStart=0;
		this.htyMaxNum=0;
		this.isMax=false;
		this.isTextMode=false;
		this.isChrome=/chrome/i.test(navigator.userAgent);   
    
    var div=this.cursorDiv=addElement("div",body,[["style","z-index:9999;position:fixed;"],["onselectstart","return false"]]);
    div.style.left=div.style.top="0px";
 		body.addEventListener('DOMMouseScroll',function(e){if(div.style.display=="none")return; e.preventDefault();});
 
    this.canvas= addElement("canvas",div,[["style","position:fixed;border:1px solid gray;border-top-style:none"]]);
    this.middleCanvas=addElement("canvas",div,[["style","position:fixed;"]]);
    this.whiteCanvas=addElement("canvas",div,[["style","display:none;position:fixed;"]]);
		this.tmpCanvas=addElement("canvas",div,[["style","position:fixed;border:1px solid gray;border-top-style:none"]]);
	  this.cursorCanvas=addElement("canvas",div,[["style","z-index:9999;position:fixed;"],["onselectstart","return false"]]);
	  
	 	this.context=a.setCtx(a.canvas);
	  this.middleContext=a.setCtx(a.middleCanvas); 
	  this.whiteContext=a.setCtx(a.whiteCanvas);	  
		this.tmpContext=a.setCtx(a.tmpCanvas);		
		this.cursorContext=a.setCtx(a.cursorCanvas);
		
		a.setlineWidth(1);			
		a.setStrokeColor("black");
		a.setFillColor("black");		
    a.cursorCanvas.onmousedown=function(e){a.cvsMousedown(e)};
	 	a.cursorCanvas.onmouseup=function(e){a.cvsMouseup(e)};
    a.cursorCanvas.onmousemove=function(e){a.cvsMousemove(e)};
    a.keybordEvent();	 	  
		a.historyContainer=addElement("div",div,[["style","display:none;"]]);	
	};
	this.setCursor=function(c)
	{	
		var a=this;
		a.clearCvs(a.cursorContext);
		if(c==0)a.cursorDiv.style.cursor="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAARCAYAAAC4qX7BAAAAyUlEQVRIie3VsUpDMRjF8d8kDg4OfYBOfYoOwaGDg/QRXLqXIo46WnfXgi6upeN9O4cmtILXJtf03sUDhy8ETjj8Awk0+MAtQoFvsIq5CxV0hxdsMS3MXmKOJcZ/LRLinGGHZ1wVnjFRgU44Wl8bkM6sZa93Om2h3umcCvVO57fQP50cOg2eYulcP2KDNwVkT9F5xWdhkeR1nKPcMrTTSYd2UfD9/crWT3QGKZJ0TOdhyCIc6Lzb33Xo4PsaRZKmWHQsElT4rc+iL2iwP+r9VvkIAAAAAElFTkSuQmCC),crosshair";
		
		if(c==1)a.cursorDiv.style.cursor="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABGUlEQVQ4jc3Sv0rDUBgF8BPIhRbC/TJkCiWQUjo5OEjmPkSGkKnDfQI3NwffwiGbmTqLg0/QR8hQXATxz2Ko1Ssc11Iibc0dPOt3+XE4XCilNgBO4Cqj0ciGYfgAIHAC5nn+aox5TtP01hloreV0On2bTCYXTkCSXK1W1Fq3AE6dgCS5WCy+ROQJffbcBknSGPOSJMm9M7D3nrtg7z2LongnyaZpOB6PN1VV0VrLuq4ZBMEjgPBPYFmWa6XUjYgs4zhuq6rifD7/1FrfHQ02TcPhcNhutZmJyDKKojUA+r5/fhRYluV6MBhcdZxnIrL0PO8bwNlBYJZlHzvtujIDcI0D/yd/adcVf+8LpdS+dkfn0iUGOG73//MDlZykhWUYbfQAAAAASUVORK5CYII=),crosshair";
		a.paintConfig.cursorNum=c;
	};	
	this.setCtx=function(a)
	{	
		a.width=canvasWidth;
		a.height=canvasHeight;
		var s=a.getContext("2d");
		s.lineJoin ="round";			  
	  s.lineCap ="round";		  
		return s;
	};
	this.hide=function()
	{
		this.canvas.parentNode.style.display='none';
		this.isHide=true;
	};
	this.show=function()
	{
		this.canvas.parentNode.style.display='block';
		this.isHide=false;
	}; 
	this.setStrokeColor=function(a)
	{
		this.context.strokeStyle=a;
		this.tmpContext.strokeStyle=a;
		this.strokeColor=a;
	};
	this.setFillColor=function(a)
	{
		this.context.fillStyle=a;
		this.tmpContext.fillStyle=a;	
		this.fillColor=a;
	};
	this.setlineWidth=function(a)
	{
		this.context.lineWidth=a;
		this.tmpContext.lineWidth=a;
		this.lineWidth=a;
	};
	this.clearCvs=function(a)
	{
		a.clearRect(0, 0, this.canvas.width,this.canvas.height);
	};		
	this.drawLine=function(a,h)
	{
		var b=this;
		a.beginPath();
		a.moveTo(h.fromX, h.fromY);
		a.lineTo(h.toX, h.toY);			
		a.stroke();
	};
	this.drawRect=function(a,h)
	{
		var j=h[0][0],
		i=h[0][1],
		k=this.mouseX-j,
		d=this.mouseY-i;		
		if(this.isKeydown[16])
		{
			k=k*d>=0?d:-d;			
		}
		a.strokeRect(j,i,k,d);
		if(this.isKeydown[17])a.fillRect(j,i,k,d);		
	};	
	this.drawArrowhead=function(a,h,xx,yy)
	{
		var b=this;
		var n=b.isChrome?h.length-5:h.length-b.lineWidth-10;
		if(!h[n])return;
		var x1=h[n][0], y1=h[n][1], x2=b.mouseX, y2=b.mouseY;		
		
		var x3=(x2-x1)/2+x1, y3=(y2-y1)/2+y1;
		
		var r=Math.sqrt(Math.pow(x3-x1,2)+Math.pow(y3-y1,2))/2;		
		if(r>18)r=18;
		var c=b.verticalXY(x1,y1,x2,y2,r);
		a.beginPath();
		a.moveTo(x2, y2);
		a.lineTo(c.x1, c.y1);
		a.lineTo(c.x2, c.y2);
		a.closePath();
		a.fillStyle=b.strokeColor;
		a.fill();								
		a.stroke();
		a.fillStyle=b.fillColor;			
	};
	this.verticalXY=function(x1,y1,x2,y2,r)
	{
		var x0=(x2-x1)/2, y0=(y2-y1)/2;		
					
		var f=Math.atan2(y0,x0);
		var c1=f+1.57079637;//0.017453293*90
		var c2=f-1.57079637;//0.017453293*-90				
		return {
			x1:Math.cos(c1)*r+x1,	
			y1:Math.sin(c1)*r+y1,
			x2:Math.cos(c2)*r+x1,
			y2:Math.sin(c2)*r+y1
			}
	};
	this.drawLine_flourescence=function(a,h)
	{
		var b=this;	
		len=h.length-2;
		if(len<1)return;		
		var path1=[];
		var path2=[];
		
		var r=b.lineWidth;
		for(var i=0;i<len;i+=2)
		{
			var x1=h[i][0], y1=h[i][1], x2=h[i+2][0], y2=h[i+2][1];			 
			var c=b.verticalXY(x1,y1,x2,y2,r);							
			path1.push(new Array(c.x1,c.y1));
			path2.push(new Array(c.x2,c.y2));					
		}
		for(var j=path2.length-1;j>=0;j--)path1.push(path2[j]);
		
		a.beginPath();
		for(var i=0,len=path1.length-1;i<len;i++)
		{						
			a.quadraticCurveTo(path1[i][0] ,path1[i][1], (path1[i][0]+path1[i+1][0])/2 ,(path1[i][1]+path1[i+1][1])/2 );
		}
		a.closePath();
		a.fill();
		a.stroke();
	};
	this.drawEllipse=function(z,h)
	{		
		var j=h[0][0],
		i=h[0][1],
		k=this.mouseX-j,
		d=this.mouseY-i;
		
		if(this.isKeydown[16])
		{
			k=k*d>=0?d:-d;			
		}
		
		var g = 0.5522848;
		var c = (k / 2) * g,
		a = (d / 2) * g,
		l = j + k,
		f = i + d,
		e = j + k / 2,
		b = i + d / 2;
			
		z.beginPath();
		z.moveTo(j, b);
		z.bezierCurveTo(j, b - a, e - c, i, e, i);
		z.bezierCurveTo(e + c, i, l, b - a, l, b);
		z.bezierCurveTo(l, b + a, e + c, f, e, f);
		z.bezierCurveTo(e - c, f, j, b + a, j, b);
		z.closePath();
		z.stroke();
		if(this.isKeydown[17])z.fill();
	};
	this.drawStraightLine=function(a,h)
	{try{
		var b=this;		
		var x1=h[0][0],y1=h[0][1];		
		var x2=b.mouseX, y2=b.mouseY;
		if(b.isKeydown[16])//shift
		{			
			var k=(y2-y1)/(x2-x1);		
			if(k>0.45&&k<2.1)x2=x1+y2-y1;					
			else if(k>-0.45&&k<=0.45)y2=y1;
			else if(k>-2.1&&k<-0.45)y2=y1-x2+x1;
			else x2=x1;
		}
		a.beginPath();
		a.moveTo(x1,y1);
		a.lineTo(x2,y2);			
		a.stroke();
		}catch(e){}
	};
	this.eraser=function(a,h)
  {
  	a.globalCompositeOperation="destination-out";
    this.drawLine(a,h);
    a.globalCompositeOperation="source-over";
  };
	this.drawLine_smooth=function(a,h)
	{				
		a.beginPath();
		var len=h.length-1;
		if(len>1)
		{
			a.moveTo(h[0][0],h[0][1]);
			a.quadraticCurveTo(h[1][0],h[1][1], (h[1][0]+h[2][0])/2, (h[1][1]+h[2][1])/2 );
		}	
		for(var i=2;i<len;i++)
		{							
			a.moveTo((h[i-1][0]+h[i][0])/2,(h[i-1][1]+h[i][1])/2);
			a.quadraticCurveTo(h[i][0] , h[i][1], (h[i][0]+h[i+1][0])/2 ,(h[i][1]+h[i+1][1])/2 );
		}	
		a.stroke();	
	};	
	this.drawLine_sharp=function(a,h)
	{		
		var b=this;	
		if(!b.drawing)return;			
		var len=h.length-1;			
		var w=b.lineWidth;
		var shade=b.isMax?len-w:parseInt(len/2);
		if(shade<4)return;
		for(var j=1;j<=w;j++)
		{			
			a.beginPath();
			a.lineWidth=j;
			var s=j;										
			for(var i=shade;i<len-s;i++)
			{										
				var d=h[i];
				var g=h[i-2]
				a.moveTo((h[i-1][0]+h[i-3][0])/2, (h[i-1][1]+h[i-3][1])/2);							
				a.lineTo((h[i][0]+h[i-2][0])/2, (h[i][1]+h[i-2][1])/2);					
				if(j==w-1)b.isMax=true;													
			}	
			a.stroke();
			a.closePath();				
		}	
	};
	this.drawArc=function(b, a, d, r)
	{
		b.beginPath();
		b.arc(a, d, r, 0, Math.PI * 2, true);
		b.closePath();
		b.stroke();
	};
	
	this.drawText=function(c,_x,_y,t,font)
	{
		c.fillStyle=this.strokeColor;
		c.font=font;
 		c.fillText(t,_x,_y);
	};
	this.saveTmpXY=function()
	{
		var a=this;							
		a.tmpXY={fromX:a.tmpXY.toX,fromY:a.tmpXY.toY,toX:a.mouseX,toY:a.mouseY};
		a.tmpPath.push(new Array(a.mouseX,a.mouseY));
	};
	this.saveXY=function()
	{
		var a=this;								
		a.pXY={fromX:a.pXY.toX,fromY:a.pXY.toY,toX:a.mouseX,toY:a.mouseY};		
		a.path.push(new Array(a.mouseX,a.mouseY));
	};

	this.paint=function()
	{
		a=this;		

		//防止数位板点击过快出现连续笔划
		try{if(a.path0[0]==a.tmpPath[0][0]&&a.path0[1]==a.tmpPath[0][1])a.path[0]=a.tmpPath[0]=a.tmpPath[1];}catch(e){}

		switch(a.brush)
		{
			case 0://橡皮			
				a.eraser(a.context,a.tmpXY);
			break;
			case 1://普通
				a.drawLine_sharp(a.context,a.tmpPath);
				break;
			case 2://平滑线条				
				a.drawLine(a.tmpContext,a.tmpXY);	
				break;
			case 100://直线
				a.clearCvs(a.tmpContext)
				a.drawStraightLine(a.tmpContext,a.tmpPath);
			break;
			case 101://方框
				a.clearCvs(a.tmpContext);
				a.drawRect(a.tmpContext,a.tmpPath);
				break;
			case 102://椭圆
				a.clearCvs(a.tmpContext);
				a.drawEllipse(a.tmpContext,a.tmpPath);
				break;
			case 103://箭头
				a.drawLine(a.tmpContext,a.tmpXY);//先画线
			 break;
			case 104://>>>
				a.drawArrowhead(a.context,a.tmpPath);
			 break;			 
			case 105://测试
				a.clearCvs(a.tmpContext);
				a.drawLine_flourescence(a.tmpContext,a.tmpPath);
			 break;
		}		
	};		
	this.cvsMousemove=function(b)
	{				
		var a=this;		
		b=b||window.event;
		if(a.isTextMode)return;
		a.mouseX=b.clientX;
		a.mouseY=b.clientY;
		if(a.brush==0)
		{
			var imageData=a.context.getImageData(a.mouseX,a.mouseY,1,1);
			var p=imageData.data;			
			color=p[0]>127||p[1]>127||p[2]>127||p[3]>127?"white":"black";			
			a.clearCvs(a.cursorContext);
			var w=a.paintConfig.brush0;
			a.cursorContext.strokeStyle=color;
			a.drawArc(a.cursorContext,b.clientX,b.clientY,w/2)
			a.cursorContext.strokeStyle="gray";
			a.drawArc(a.cursorContext,b.clientX,b.clientY,1+w/2)
		}		
		if(!a.drawing)return;		
		a.saveTmpXY(b);			
		if(a.moveStep>=a.smooth)
		{
			a.moveStep=0;
			a.saveXY(b);		
		}
		a.moveStep++;		
		a.paint(b);		
		a.checkArea();		
	};
	this.cvsMouseup=function(b)
	{
		var a=this;
		if(a.isTextMode)return;
		a.checkArea();			
		switch(a.brush)
		{	
			case 2:
				a.saveXY(b);
				a.clearCvs(a.tmpContext);				
				a.drawLine_smooth(a.context,a.path);
				break;
			case 100:
				a.clearCvs(a.tmpContext);
				a.drawStraightLine(a.context,a.tmpPath);
				break;
			case 101:
				a.clearCvs(a.tmpContext);
				a.drawRect(a.context,a.tmpPath);
				break;
			case 102:
				a.clearCvs(a.tmpContext);
				a.drawEllipse(a.context,a.tmpPath);
				break;
			case 103:
				a.saveXY(b);
				a.clearCvs(a.tmpContext);
				a.drawLine_smooth(a.context,a.path);
				a.drawArrowhead(a.context,a.tmpPath);
				break;
			case 105:
				a.clearCvs(a.tmpContext);
				a.drawLine_flourescence(a.context,a.tmpPath);
				break;
		}
		a.path0=a.tmpPath[0];
		a.addHistory();			
		a.path.length=0;
		a.tmpPath.length=0;		
		a.isMax=false
		a.moveStep=0;		
		a.drawing=false;
		a.tmpArea();
	};		
	this.cvsMousedown=function(b)
	{
		var a=this;	
		if(a.isTextMode)return;
		b=b||window.event;
		
		if(a.paintConfig.isRandomColor)
		{
			a.setStrokeColor(a.randomColor());
			a.setFillColor(a.randomColor());
		}
		a.clearCvs(a.tmpContext);		
		var xx=b.mouseX;
		var yy=b.mouseY;
		a.tmpXY=a.pXY={fromX:xx,fromY:yy,toX:xx,toY:yy};
		a.saveXY();
		a.saveTmpXY();
		a.drawing=true;		
		a.checkArea();		
		switch(a.brush)
		{
			case 0://橡皮擦
			a.setlineWidth(a.paintConfig.brush0);			
				break;
			case 1://画笔1
			a.setlineWidth(a.paintConfig.brush1);
				break;	
			case 2://画笔2
				a.setlineWidth(a.paintConfig.brush2);
				a.smooth=a.paintConfig.smooth;
				break;
			case 100://直线
				a.drawStraightLine(a.tmpContext,a.tmpPath);
				a.setlineWidth(a.paintConfig.brush100);
				break;
			case 101://方框
				a.setlineWidth(a.paintConfig.brush100);
				break;
			case 102://椭圆
				a.setlineWidth(a.paintConfig.brush100);
				break;
			case 103://箭头
			case 104://>>>
			case 105://荧光
				a.smooth=a.isChrome?2:10;				
				a.setlineWidth(a.paintConfig.brush100);
				break;			
		}			
	};
	this.tmpArea=function()
	{
		var b=this.areaXY;
		this.areaXYtmp={x1:b.x1, y1:b.y1, x2:b.x2, y2:b.y2};
	}
	this.checkArea=function(m,n)
	{
		var a=this;
		var xx=m?m:a.mouseX;
		var yy=n?n:a.mouseY;
		if(a.areaXY)
		{
			if(xx<a.areaXY.x1)a.areaXY.x1=xx;			
			else if(xx>a.areaXY.x2)a.areaXY.x2=xx;				
			if(yy<a.areaXY.y1)a.areaXY.y1=yy;			
			else if(yy>a.areaXY.y2)a.areaXY.y2=yy;
		}else a.areaXY={x1:xx,y1:yy,x2:xx,y2:yy};
	};
	this.showBorder=function()
	{ 
		var a=this;
		if(!a.isShowBorder)return;
		var b=a.areaXYtmp;		
		if(!b)return;
		if(b.x1>b.x2){var g=b.x2;b.x2=b.x1;b.x1=g }
		if(b.y1>b.y2){var g=b.y2;b.y2=b.y1;b.y1=g }
		a.clearCvs(a.middleContext);
		c=a.middleContext;
		c.lineWidth=1;
		c.strokeStyle="black";
		c.strokeRect(b.x1-20, b.y1-20, 40+b.x2-b.x1, 40+b.y2-b.y1);
		c.font = "13px calibri";
		var w=b.x2-b.x1+40;
		var h=b.y2-b.y1+40;
		c.fillText("asdw←↕→ ("+w+"x"+h+"像素)", b.x1-20, b.y1-28);
 		c.fillText("jkli←↕→", b.x2-15, b.y2+35);
		c.strokeStyle="white";
		c.strokeRect(b.x1-21, b.y1-21, 42+b.x2-b.x1, 42+b.y2-b.y1);	
 	};
	this.hideBorder=function()
	{
		for(var i=65;i<88;i++)if(this.keydownTimer[i])clearInterval(this.keydownTimer[i]);
		this.clearCvs(this.middleContext);
 	};
	this.randomColor=function()
	{
		var rr=parseInt(Math.random()*200+20);
		var gg=parseInt(Math.random()*200+20);
		var bb=parseInt(Math.random()*200+20);	
		return "rgb("+rr+","+gg+","+bb+")";
	};
	this.png2code=function(c)
	{
		var a = c || "image/png";
		return c.toDataURL(a);
	};

	this.addHistory=function()
	{try{		
		var b=this;
		var a=b.areaXY;
		if(!a)return;
		var x=a.x1-20, y=a.y1-20, w=a.x2-a.x1+40, h=a.y2-a.y1+40;
			
		b.htyNum++;	
		b.htyMaxNum=b.htyNum;
		
		var cvsId="cvs_history_id_"+b.htyNum;
		var cvs=document.getElementById(cvsId);
		if(cvs){ cvs.parentNode.removeChild(cvs)};
		cvs=document.createElement("canvas");		
		cvs.id=cvsId;
		b.historyContainer.appendChild(cvs);
		cvs.width=w;
		cvs.height=h;
		cvs.style.display="none";
		var imgData=b.context.getImageData(x,y,w,h);
		var ctx=cvs.getContext("2d");
		ctx.putImageData(imgData,0,0);
		b.historyData[b.htyNum]={id:cvs.id,ctx:ctx, x:x, y:y, w:w, h:h};			
		if(b.htyNum>=22)
		{
			if(b.htyStart<b.htyNum-20)
			{
			b.htyStart=b.htyNum-20;
			var htyId=b.historyData[b.htyStart-1].id;
			var del=document.getElementById(htyId);
			if(del){ del.parentNode.removeChild(del)};
			}
		}
		}catch(e){alert("this.addHistory\n"+e);}				
	};
	this.clear=function()
	{
		var a=this;
		a.clearCvs(a.context);		
		a.htyNum=0;
		a.htyStart=0;
		a.htyMaxNum=0;
		a.historyData.length=0;		
		a.areaXY=a.areaXYtmp=null;
		a.historyContainer.innerHTML="";
	};
	this.history=function(p)
	{	try{
		var a=this;		
		if(p==-1)if(--a.htyNum<a.htyStart){a.htyNum=a.htyStart}
		if(p==1)if(++a.htyNum>a.htyMaxNum){a.htyNum=a.htyMaxNum}
		if(a.htyNum==0)
		{
			a.areaXY=a.areaXYtmp=null;
			a.clearCvs(a.context);
			return
		}
		var z=a.historyData[a.htyNum];
		if(!z)return;
		a.clearCvs(a.context);
		var imgData=z.ctx.getImageData(0,0,z.w,z.h);			
		if(!imgData)return;
		a.context.putImageData(imgData,z.x,z.y);
		a.areaXYtmp=a.areaXY={x1:z.x, y1:z.y, x2:z.x+z.w, y2:z.y+z.h};		
		}catch(e){alert("this.history\n"+e)}
	};
	this.getResult=function()
	{try{
		var b=this;
		var a=b.areaXYtmp;
		if(!a)return;
		var imgData=b.context.getImageData(a.x1-20,a.y1-20,a.x2-a.x1+40,a.y2-a.y1+40);
		var f=b.whiteCanvas.width=a.x2-a.x1+40;
		var g=b.whiteCanvas.height=a.y2-a.y1+40;
		b.whiteContext.putImageData(imgData,0,0);	
		var d=(new Date()).toString();
		b.whiteContext.font = "9px Microsoft JhengHei";
		b.whiteContext.fillStyle="rgb(180,180,180)";
		if(!b.isKeydown[17])b.whiteContext.fillText(d,f-110,g-1);		
		var data1=b.png2code(b.whiteCanvas);
		return {
					data:data1,
					info:"图片信息:"+(data1.length/1024).toFixed(1)+" KB , "+f+"px × "+g+"px"
					}
		}catch(e){alert("this.getResult\n"+e)}
	};
	
	this.tiebaProgressBar=function()
	{
		var x1=document.documentElement.clientWidth/2;
		var y1=document.documentElement.clientHeight/2;

		var b=this,alertTimer,o1=0,a;
		var progressTimer=setInterval(function(){
			a=b.middleContext;
			b.clearCvs(a);
			if(o1>200)
			{
				o1=0;
				if(b.tiebaUploadStep==2)
				{
					if(progressTimer)clearInterval(progressTimer);
					if(alertTimer)clearTimeout(alertTimer);
					b.hide();
					b.clearCvs(a);			
				}
			}
			a.fillStyle="white";
			a.strokeStyle="black";		
			a.fillRect(x1-100,y1,200,5);
			a.strokeRect(x1-100,y1,200,5);
			if(b.tiebaUploadStep>0)
			{				
				a.fillStyle="black";
				a.fillRect(x1-100,y1,o1,5);
				o1+=5;
			}
		},50);
		alertTimer=setTimeout(function()
		{				
			GM_openInTab(b.getResult().data);
			alert("20秒过去了,上传还没完成...");
			if(progressTimer)clearInterval(progressTimer);
			b.clearCvs(a);
			main();								
		},20000);
	};
	this.keybordEvent=function()
	{
		var a=this;
		var iskeydown=[],timer1;		
		body.addEventListener("keyup",function(e)
		{
			e=e||window.event;
			a.isKeydown[e.keyCode]=false;
			iskeydown[e.keyCode]=false;
			if(timer1)clearInterval(timer1);
			timer1=null;
			speed=1;
			if(a.keydownTimer[e.keyCode])clearInterval(a.keydownTimer[e.keyCode]);
		},false);
		
		a.keydownTimer=[];
		var speed=2,time11=20;
		body.addEventListener("keydown",function(e)
		{			
			e=e||window.event;				
			if(a.isHide)return;
			a.isKeydown[e.keyCode]=true;
			if(a.isTextMode)return;
			switch(e.keyCode)
			{
				case 90://z
					a.history(-1);
					break;
				case 88://x
					a.history(1);					
					break;
				case 67://c
					a.brush=0;
					a.setCursor(0);
					break;
				case 86://v
					a.brush=1;
					a.setCursor(1);
					break;
				case 66://b
					a.brush=2;
					a.setCursor(1);
					break;
			}			
			
			if(!a.areaXYtmp)return;
			if(!timer1)timer1=setTimeout(function(){speed+=4;},1200);
			switch(e.keyCode)
			{
				case 65://a
					if(iskeydown[e.keyCode])break;
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.x1-=speed;a.showBorder();},time11);			
					break;
				case 68://d	
				if(iskeydown[e.keyCode])break;	
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.x1+=speed;a.showBorder();},time11);
					break;	
				case 83://s
					if(iskeydown[e.keyCode])break;
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.y1+=speed;a.showBorder();},time11);			
					break;
				case 87://w
					if(iskeydown[e.keyCode])break;
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.y1-=speed;a.showBorder();},time11);
					break;
				case 74://j
					if(iskeydown[e.keyCode])break;
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.x2-=speed;a.showBorder();},time11);
					break;
				case 76://L
					if(iskeydown[e.keyCode])break;
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.x2+=speed;a.showBorder();},time11);
					break;				
				case 75://k
					if(iskeydown[e.keyCode])break;
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.y2+=speed;a.showBorder();},time11);
					break;
				case 73://I
					if(iskeydown[e.keyCode])break;
					a.keydownTimer[e.keyCode]=setInterval(function(){a.areaXYtmp.y2-=speed;a.showBorder();},time11);
					break;
			}	
			iskeydown[e.keyCode]=true;
		},false);
	};	
}

var textTimer,textDiv,textDivArea,select_fontSize,select_fontFamily;
function textEditor()
{	
	if(Pt.isTextMode)return;
	Pt.isTextMode=true;
	if(textDiv)
	{
		textDiv.style.display="";
		textTimerFn();
		return;
	}
	
	textDiv=addElement("div",menuDiv,[["style","z-index:99999;left:200px;top:10px;position:fixed"]]);

	textDiv.style.left=document.documentElement.clientWidth/2-200+"px";
	textDiv.style.top=document.documentElement.clientHeight/2+"px";
	textDivArea=addElement("div",textDiv,[["id","cvs_cvtextDivArea_id"],["contenteditable","true"],
		["style",""]]);
 	textDivArea.style.top=document.documentElement.clientHeight/2-100+"px";
 	
 	var topDiv=addElement("div",textDiv,
		[["class","cvs_div_css"],["style","text-align:left;width:auto;height:25px;"],["onselectstart","return false"]]);	 		
	textDivArea.onkeyup=function()
	{
		if(Pt.isKeydown[113])drawTextBtn.click();//F2
	};
		
 	var moveBtn=addElement("input",topDiv,[["type","button"],["value"," "],["style","cursor:move;"]]);
	var drawTextBtn=addElement("input",topDiv,[["title","快捷键:F2"],["type","button"],["value","粘贴到画布"],["style",""]])
	drawTextBtn.onclick=function()
	{	
		var textArr=textDivArea.innerHTML.split("<br>");
		if(textArr[0].length==0)return;
		var size=parseInt(select_fontSize.value);
		var _x=textDivArea.offsetLeft;
		var t=textDivArea.offsetTop;
		Pt.checkArea(_x,t);		
		Pt.checkArea(_x+textDivArea.offsetWidth,t+textDivArea.offsetHeight);
		Pt.tmpArea();	
		for(var i=0,len=textArr.length;i<len;i++)
		{			
			var _y=t+size*(i+1)+i*size/5;			
			var str=textArr[i].replace(/&nbsp;/g," ")
				.replace(/&lt;/g,"<")
				.replace(/&gt;/g,">")
				.replace(/&amp;/g,"&")
				.replace(/&quot;/g,"\"")
				.replace(/&apos;/g,"'");
			Pt.drawText(Pt.context , _x , _y, str , size+"px "+select_fontFamily.value);
		}		
		textDivArea.textContent="";
		Pt.addHistory();
		quit();
	};	
	
 	select_fontSize=addElement("select",topDiv);
 	select_fontSize.onclick=function()
 	{
 		textDivArea.style.fontSize=select_fontSize.value+"px";
 	};
	addOption(select_fontSize,30,30);
	for(var i=13;i<31;i++)addOption(select_fontSize,i,i);
  select_fontFamily=addElement("select",topDiv,[["style","width:90px"]]);  
  for(i in fontFamilyArr)addOption(select_fontFamily,fontFamilyArr[i],fontFamilyArr[i]);
	
	select_fontFamily.onclick=function()
 	{
 		textDivArea.style.fontFamily=select_fontFamily.value
 	};
 	
	var quit=addElement("input",topDiv,[["type","button"],["value","关闭"],["style",""]]).onclick=function()
	{
		Pt.isTextMode=false;
		textDiv.style.display="none";
		clearInterval(textTimer);
	};	
	function textTimerFn()
	{
		var count=0;
		textTimer=setInterval(function()
		{
			textDivArea.style.font=select_fontSize.value+"px "+select_fontFamily.value;
			textDivArea.style.color=Pt.strokeColor;
			textDivArea.style.height=select_fontSize.value+"px";
			var a=textDivArea.innerHTML.match(/br>/);
			
			if(a)textDivArea.style.height="auto";
			textDivArea.style.borderColor=count<15?"gray":"rgb(200,200,200)";
			textDivArea.style.background=count<2?Pt.randomColor():"";
			if(count>21)count=10;
			count++;
		},300);
	};
	textTimerFn();	
	mouseMoveElement(moveBtn,topDiv);
	mouseMoveElement(textDivArea,textDivArea);
}


var colorDiv;
function colorSelector(_top,_left,pos)
{
	if(colorDiv){colorDiv.style.display="block";return};  
  colorDiv=addElement("div",pos,[["onselectstart","eturn false"],["class","cvs_div_css cvs_color_div_css"]]);

	colorDiv.style.top=_top;
 	colorDiv.style.left=_left;
	var topDiv=addElement("div",colorDiv,
		[["style","cursor:move;text-align:left;width:auto;height:25px;"],["onselectstart","return false"]]);	 		
	 	
 	addElement("input",topDiv,[["type","button"],
 		["value","随机颜色"]]).onmouseup=function(){Pt.paintConfig.isRandomColor=true;};

  var cvs=addElement("canvas",colorDiv,[["style","border:1px solid gray"],["width","144"],["height","140"]]);
	ctx=cvs.getContext("2d");
  var cvs2=addElement("canvas",colorDiv,[["style","left:3px;position:absolute ;cursor:pointer;border:1px solid gray;"],["width","144"],["height","140"]]);
	ctx2=cvs2.getContext("2d");
	
	cvs2.onclick=function(event){selectColor(event,false,cvs)}

	function selectColor(e,t,a)
	{		
		var x,y;
		e=e||window.event;
		if(t){x=Pt.paintConfig.colorX,y=Pt.paintConfig.colorY}
		else{
			x=e.clientX-a.offsetLeft-a.parentNode.offsetLeft;
			y=e.clientY-a.offsetTop-a.parentNode.offsetTop;
			Pt.paintConfig.colorX=x;
			Pt.paintConfig.colorY=y;
			Pt.paintConfig.isRandomColor=false;
		}
		var imgData=ctx.getImageData(x,y,1,1);
		var p=imgData.data;
		var color="rgb("+p[0]+","+p[1]+","+p[2]+")";
		Pt.isKeydown[17]?Pt.setFillColor(color):Pt.setStrokeColor(color);
		
		Pt.clearCvs(ctx2);
		for(i=5;i<8;i++)
		{
			ctx2.strokeStyle=i==6?"white":"black";	
			Pt.drawArc(ctx2, x, y, i/2);
		}
	}
	
  var divIn=addElement("div",colorDiv,[["style","border:1px solid gray;border-top-style: none;"]]); 
  divIn.onclick=function(e)
	{
		try{
		e=e||window.event;
		var tmpObj = e.srcElement || e.target;
		
		var  mylinear=ctx.createLinearGradient(0,0, 144,0);
		mylinear.addColorStop(1,tmpObj.style.backgroundColor);
		Pt.paintConfig.lastColor=tmpObj.style.backgroundColor;
		
		}catch(e){Pt.paintConfig.lastColor&&mylinear.addColorStop(1,Pt.paintConfig.lastColor)}
		mylinear.addColorStop(0,"rgb(255,255,255)");
		ctx.fillStyle=mylinear;
		ctx.fillRect(0,135,144,5);	
	
		for(var i=0;i<=144;i+=5)
		{
			mylinear=ctx.createLinearGradient(0,0, 0,135);			
			var p1=ctx.getImageData(i,137,1,1).data;
			var color1="rgb("+p1[0]+","+p1[1]+","+p1[2]+")";			
			mylinear.addColorStop(0,"black");
			mylinear.addColorStop(1,color1);
			ctx.fillStyle=mylinear;
			ctx.fillRect(i,0,5,135);
		}
		selectColor(null,true);
	}; 
	divIn.click();	
	
	function color(a,n)
	{
		var d=a[n];
		for(var i=0;i<=255;i+=15)
		{
			a[n]=Math.abs(d+i);
			var color="rgb("+a[0]+","+a[1]+","+a[2]+")";
			addElement("div",divIn,[["style","display:inline-block;background:"+color+";width:4px;height:20px;"]]);
		}			
	}
	color([-255,255,0],0);
	color([0,255,0],2);
	color([0,-255,255],1);
	color([0,0,255],0);
	color([255,0,-255],2);
	color([255,0,0],1);
	
	mouseMoveElement(topDiv,colorDiv);
	topDiv.addEventListener("mouseup",function()
	{
		Pt.paintConfig.colorDivTop=colorDiv.style.top;
		Pt.paintConfig.colorDivLeft=colorDiv.style.left;
	},false);	
};

var Pt,menuDiv,ok=false;
function main(){
	var isLeave=false;
	if(ok)
	{		
		Pt.show();
		menuDiv.style.display="block";
		return;
	}
	
	GM_addStyle([".cvs_color_div_css{line-height:0px;width:146px;}",
	".cvs_div_css{ z-index:9999999;position:fixed;padding: 3px;border-radius:9px;background:radial-gradient(at 8px 8px,white,#CCC,#FFF);  border:1px solid gray;}",
	"#cvs_menuDiv_id input{margin:2px;border-radius:3px;background:radial-gradient(at 8px 8px,rgb(230,230,230),rgb(210,210,210),rgb(210,210,210));  border:1px solid gray;} ",
	"#cvs_menuDiv_id input:hover {background:radial-gradient(at 1px 1px,#FFF,#CCC,#FFF);}",
	"#cvs_menuDiv_id select{width:40px;border:1px solid gray;border-radius:3px;height:20px;background:rgb(240,240,240)}",
	"#cvs_menuDiv_id .cvs_select_css{margin-left:3px;background:rgb(220,220,220)}",
	"#cvs_cvtextDivArea_id{min-width:30px;width:auto;height:auto;border:1px solid blue;position:fixed;}"
	].join(""));
	
	var clientW=document.documentElement.clientWidth;
	var clientH=document.documentElement.clientHeight;	
	Pt=new CanvasPainter(clientW,clientH);
	Pt.init();
	var conf=GM_getValue("f");
	//var conf;
	if(conf)conf=JSON.parse(conf);
	else conf={
		brush0:5,
		brush1:5,
		brush2:5,		
		brush100:5,
		smooth:1,
		brushNum:1,
		cursorNum:1,
		menuDivLeft:"300px",
		menuDivTop:clientH-50+"px",
		colorDivLeft:clientW-400+"px",
		colorDivTop:clientH+"px",
		colorX:140,
		colorY:140,
		isRandomColor:true
		};
						
	Pt.paintConfig=conf;
	Pt.brush=conf.brushNum;
  Pt.setCursor(conf.cursorNum);
  
	//0
	menuDiv=addElement("div",body,[["id","cvs_menuDiv_id"],["class","cvs_div_css"],["style","height:auto;width:auto;"]]);
	
	menuDiv.onmouseover=function(){if(Pt.tmpPath.length>2)Pt.cvsMouseup()}
	
	
	var moveMenu=addElement("input",menuDiv,[["style","float:left;cursor:move"],["type","button"],["value"," "]]);
  mouseMoveElement(moveMenu,menuDiv);
  moveMenu.addEventListener("mouseup",function()
  {
  	setTimeout(function()
  	{  		
  		Pt.paintConfig.menuDivTop=menuDiv.style.top;
  		Pt.paintConfig.menuDivLeft=menuDiv.style.left;
  	},10);
  },false); 

  var confirmDiv=addElement("div",menuDiv,[["id","cvs_menu_01_id"],["style","border:1px ;height:45px;display:none;position:absolute"]]);
 	var content=addElement("div",menuDiv,[["style","position:absolute;float:right"]]); 	
 	//chrome firfox
	function _onmouseleave(el,fn)
	{
		var timer;
		el.addEventListener("mouseout",function(){                                    
			timer=setTimeout(function(){fn()},200);		
			},false);
		el.addEventListener("mouseover",function(){if(timer)clearTimeout(timer)},false);		
	}
	_onmouseleave(confirmDiv,function(){content.style.display=confirmDiv.style.display="none"});	
	
 	confirmDiv.onmouseout=function()
 	{
 		Pt.isShowBorder=false;
 		Pt.hideBorder();
 		Pt.drawing=false;
 	} 	
	var confirmBtn=addElement("input",confirmDiv,[["type","button"]]);
 	function confirmFix(a,b,c)
	{					
	 	confirmBtn.onmouseup=function()
	 	{
	 		confirmDiv.style.display="none";
	 		content.style.display="none";
	 	}			
		confirmDiv.style.left=b.offsetLeft-2+"px";
		confirmDiv.style.top=b.offsetTop-25+"px";
		content.style.display=confirmDiv.style.display="block";
		
		content.style.left=b.offsetLeft-2+"px";
		content.style.top=b.offsetTop-45+"px"
		confirmBtn.value=a;
		content.innerHTML=c?c:"";	
		return confirmBtn;
	} 
  
  //hide  
  mainBtn.ondblclick=function()
  {
  	setTimeout(function(){
		menuDiv.style.display="none";		
		Pt.hide();
		},300);
  };
  addElement("input",menuDiv,[["type","button"],["value","关闭"]]).onclick=function()
  {
		confirmFix("确定",this).onclick=function()
		{
			isLeave=true;
			menuDiv.style.display="none";
			Pt.hide();
		}  	
  }
	//tieba
	if(location.hostname=='tieba.baidu.com')
	{     
		var tiebaBtn=addElement("input",menuDiv,[["type","button"],["value","贴吧发帖"]]);
	  tiebaBtn.onclick=function()
	  {
	  	var a=Pt.getResult();
	  	if(!a)return;
	  	Pt.isShowBorder=true;
	  	Pt.showBorder();
	  	if(!unsafeWindow.FlashImageLoader)
			{
				var sc=document.createElement('script');
				sc.id='flashUpload';
				sc.setAttribute('src','http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js');
				document.body.appendChild(sc);
			}
			confirmFix("上传到贴吧",this,"<font size='2' style='background:rgb(230,230,230)'>"+a.info+"</font>").onclick=function()
			{
	  		menuDiv.style.display="none";	  	
	  		Pt.tiebaProgressBar();
	  		flashUPload(a.data);				
			};
	  }
 	}	

  //pic
  var picBtn=addElement("input",menuDiv,[["type","button"],["value","生成图片"]]);
  picBtn.onclick=function()
  {
  	Pt.isShowBorder=true;
  	Pt.showBorder();
		confirmFix("确定",this,"<font style='background:rgb(230,230,230)'>CTRL+点击确定: 图片右下角不添加时间; 按键ASDW JKLI 调节范围</font>").onclick=function()
		{
			GM_openInTab(Pt.getResult().data)			
		}  	
  }
	
  //clear
  var clearBtn=addElement("input",menuDiv,[["type","button"],["value","清空"]]);

  clearBtn.onclick=function()
  { 
		confirmFix("确定",this).onclick=function()
	  {		  	
	  	if(!Pt.areaXY)return;
	  	Pt.clear();
		};	
  }
 
  //eraser
  addElement("input",menuDiv,[["title","快捷键: Z"],["type","button"],["value","上一步"]]).onclick=function(){Pt.history(-1)};
  addElement("input",menuDiv,[["title","快捷键: X"],["type","button"],["value","下一步"]]).onclick=function(){Pt.history(1)};
  addElement("input",menuDiv,[["title","快捷键: C"],["type","button"],["value","橡皮擦"]]).onclick=function(){Pt.brush=0;Pt.setCursor(0)};   
  var select_btush0=addElement("select",menuDiv);	
  
  addOption(select_btush0,conf.brush0,conf.brush0);
  for(var i=15;i>=1;i--)addOption(select_btush0,i,i);    
  addOption(select_btush0,20,20);
  addOption(select_btush0,30,30); 
  select_btush0.onclick=function(){Pt.brush=0;Pt.paintConfig.brush0=this.value;Pt.setCursor(0)};
  //brush1
  addElement("input",menuDiv,[["title","快捷键: V"],["type","button"],["value","画笔1"]]).onclick=function(){Pt.brush=1;Pt.setCursor(1)};
  
  var select_btush1=addElement("select",menuDiv);    
  addOption(select_btush1,conf.brush1,conf.brush1);
  for(var i=20;i>2;i--)addOption(select_btush1,i,i);   
  
  select_btush1.onclick=function(){Pt.brush=1;Pt.paintConfig.brush1=this.value;Pt.setCursor(1)};
  //brush2
  addElement("input",menuDiv,[["title","快捷键: B"],["type","button"],["value","画笔2"]]).onclick=function(){Pt.brush=2;Pt.setCursor(1)};

  var select_btush2=addElement("select",menuDiv,[["title","大小"]]);
  addOption(select_btush2,conf.brush2,conf.brush2);
  for(var i=18;i>0;i--)addOption(select_btush2,i,i);
	select_btush2.onclick=function(){Pt.brush=2;Pt.paintConfig.brush2=this.value;Pt.setCursor(1)};

  var select_smooth=addElement("select",menuDiv,[["title","平滑度"]]);
  addOption(select_smooth,conf.smooth,conf.smooth);
	for(var i=15;i>0;i--)addOption(select_smooth,i,i);
  addOption(select_smooth,20,20);
  addOption(select_smooth,30,30);
  select_smooth.onclick=function(){Pt.brush=2;Pt.paintConfig.smooth=this.value;Pt.setCursor(1)};
 
	addElement("input",menuDiv,[["type","button"],["value","A"]]).onclick=textEditor;
 
  var select_shape=addElement("select",menuDiv,[["style","width:53px"],["class","cvs_select_css"]]);
  
  addOption(select_shape,"直线",100);
  addOption(select_shape,"方框",101);
  addOption(select_shape,"椭圆",102);
  addOption(select_shape,"箭头",103);
  addOption(select_shape,"荧光",105);
  addOption(select_shape,">>>",104);    
	select_shape.onclick=function()
	{
		Pt.brush=parseInt(this.value);
		Pt.setCursor(1)
	};	
	
	var select_brush100=addElement("select",menuDiv);
	addOption(select_brush100,conf.brush100,conf.brush100);    
	for(var i=18;i>0;i--)addOption(select_brush100,i,i);
	select_brush100.onclick=function()
	{
		Pt.paintConfig.brush100=this.value;
		Pt.setCursor(1);
	}; 
	addElement("input",menuDiv,[["type","button"],
		["value","保存设置"]]).onclick=function()
		{
			Pt.paintConfig.brushNum=Pt.brush;
			GM_setValue("f",JSON.stringify(Pt.paintConfig));
			alert("设置已保存!\n下次打开工具将是当前的状态");
		}
	addElement("input",menuDiv,[["type","button"],["style","width:13px;"],
 		["value","!"]]).onmouseup=function(){alert("CTRL+点击色盘 更改方框、椭圆的填充颜色。\n使用: CTRL+拖动鼠标\n\n鼠标指针变成'I'形状时,按一下TAB键可消除")};
	
	//menu 上次的位置
	var menuDivTop=conf.menuDivTop.match(/\d+/);
	var menuDivLeft=conf.menuDivLeft.match(/\d+/);
	
	if(menuDivLeft<0)menuDivLeft=0;
	if(menuDivLeft>clientW-130)menuDivLeft=clientW-130;
	menuDiv.style.left=menuDivLeft+"px";
	
	if(menuDivTop<0)menuDivTop=0;
	if(menuDivTop>clientH-60)menuDivTop=clientH-60;
	menuDiv.style.top=menuDivTop+"px";	
  
  //color selector上次的位置
 	var colorDivTop=conf.colorDivTop.match(/\d+/);
	var colorDivLeft=conf.colorDivLeft.match(/\d+/);	

	if(clientH-350<0)colorDivTop=10;
	if(colorDivTop>clientH-320)colorDivTop=clientH-320;
	if(colorDivTop<0)colorDivTop=0;
	colorDivTop+="px";
	
	if(colorDivLeft<0)colorDivLeft=0;
	if(colorDivLeft>clientW-280)colorDivLeft=clientW-280;
	colorDivLeft+="px";	
	colorSelector(colorDivTop,colorDivLeft,menuDiv);	

	window.onbeforeunload = function()
	{		
		//Pt.paintConfig.brushNum=Pt.brush;
		//GM_setValue("f",JSON.stringify(Pt.paintConfig));
		if(!isLeave)return false;
	}
	ok=true;
};
var mainBtn=addElement("div",body,[["title","单击启动, 双击隐藏"],["onselectstart","return false"],["onmouseover","style.height='15px'"],["onmouseout","style.height='5px'"],
          ["style","border-radius: 10px;top:-1px;left:-1px;width:15px;height:5px;border:1px solid gray;z-index:99999;position:fixed;"]]);
mainBtn.onclick=main;

/**
 * 贴吧上传图片功能来自＠527836355的脚本https://userscripts.org/scripts/source/162380
 *
 */ 
function flashUPload(f) { //f是base64数据	
	Pt.tiebaUploadStep=0;//画图脚本检测图片上传
  function uploadedHandler(a, d) {
  	 Pt.tiebaUploadStep=2;//画图脚本检测图片上传
    try {
      var c = JSON.parse(d); //d是返回的text c是json对象
      if (c.error_code != 0) {
          alert("上传失败")
      } else {
        var b = c.info.pic_id_encode; //c是json数据;b是地址信息；
        var e = 'http://imgsrc.baidu.com/forum/pic/item/' + b + '.png'; //e是img完整地址;
        document.querySelector('td .tb-editor-editarea').focus();
        unsafeWindow.rich_postor._editor.execCommand("insertimage", e);
        unsafeWindow.FlashImageLoader.unbind('uploadComplete', arguments.callee);
      }
    } catch(err) {
        alert(err);
    }   
  }
  function callback(a) {
    try {    	
      unsafeWindow.FlashImageLoader.bind('uploadComplete', uploadedHandler);
      unsafeWindow.FlashImageLoader.uploadBase64('http://upload.tieba.baidu.com/upload/pic', f.replace(/^.*?base64,/, ''), {
          tbs: a
      })
    } catch(err) {
        alert(err);
    };
  } //事先返回一个图片ID再返回
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://tieba.baidu.com/dc/common/imgtbs',
    onload: function(response) {
    	Pt.tiebaUploadStep=1;//画图脚本检测图片上传  	
			callback(JSON.parse(response.responseText).data.tbs);				
    }
	});
}
})();
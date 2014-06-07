// ==UserScript==
// @name pic_viewer
// @author NLF
// @description 图图,我看好你哦--.(Support Opera 10.1+ ,Fx3.6+(need GreaseMonkey) , Chrome5.0+)
// @create 2010-4-5
// @lastmodified 2010-8-22
// @version 2.0
// @include http*
// ==/UserScript==

(function(window,document){
	var prefs={
		imgSDTimeout:333																						,//悬浮在图片上多久显示按钮..单位 毫秒;
		imgSDTimeout2:333																						,//当鼠标移出图片的的时候..按钮延时 多少毫秒消失;
		imgSPosition:1																							,//按钮出现在图片的什么位置, 1：左上角 2：右上角 3：右下角 4：左下角;
		imgSOffset:[3,3]																						,//按钮的偏离值.[水平方向,竖直方向] 单位(像素);
		transition:false																							,//是否开启动画..
				frameRate:25																						,//帧速..
				duration:0.3																						,//持续时间.单位(毫秒)..
		zoomWithSW:true																							,//是否开启滚轮缩放.
				zoomRange:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.2,1.3,1.5,1.7,1.9,2,2.5,3.0,4.0,6.0]				,//缩放比例设置.
		error:0																											,//实际图片和显示图片的误差值超过这个值后,显示按钮..;
		min:120																											,//如果原始的图片小于这个数值,那么忽略它...(单位像素);
		showForAll:true																							,//在没有缩放的图片上也显示按钮..
			showLimit:260																							,//限制,当前图片小于 这个值时不显示按钮.
		pBPadding:['3px','3px','3px','3px']													,//上右下左的内间距(请务必使用像素为单位)
		pBBorder:'border:none'																	,//外边框.CSS样式.(请务必使用像素为单位)
		pBBorderR:['0','0','0','0']													,//边框圆角.(请务必使用像素为单位)
		pBBackgroundC:'white'																				,//背景颜色
	};

	//一些按钮的图标base64.可以自行进行替换.
	var imgButton={
		imgSwitch:"data:image/png;base64,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"
		,closeButton:'data:image/png;base64,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  VfufGEUAAQYABejinPr4dLEAAAAASUVORK5CYII='
	};

	//黑名单..不加载的网站.
	var blackList=[
		['例子',false,/example\.com/i]
	];


//----------------------------------------------------------//
	//封装evaluate函数..
	function matchNodes(xpath,root,doc){
		doc=doc||document;
		root=root||doc;
		return doc.evaluate(xpath, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};

	function matchSingleNode(xpath,root,doc){
		doc=doc||document;
		root=root||doc;
		return doc.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	//各网站规则;
	var siteInfo=[
			{siteName:"google图片搜索",
				siteExample:"http://www.google.com.hk/images?q=opera",									//网址例子..(方便测试.查看.之类的)
				enable:true,																														//是否启用..(是否启用这条规则)
				click:true,																															//接管鼠标左键点击..(是否点击 鼠标 左键直接用本JS打开图片)
				url:/^https?:\/\/\w{3,7}\.google(?:\.\w{1,4}){1,2}\/images/i,						//站点正则..
				getImage:function(){																										//获取图片实际地址的处理函数,this 为当前鼠标悬浮图片的引用..
					return matchSingleNode('ancestor::a[1]',this).href.match(/imgurl=(.*?\.\w{1,5})&/i)[1];
				}
			},
			{sitename:"必应图片",
				siteExample:"http://cn.bing.com/images/search",
				enable:true,
				click:true,
				url:/^http:\/\/.*?bing\.com\/images\/search/i,
				getImage:function(){
						return matchSingleNode('ancestor::a[1]',this).href.match(/furl=(.*?\.(?:jpg|jpeg|png|gif|bmp))$/i)[1];
				}
			},
			{sitename:"豆瓣",
				siteExample:"http://www.douban.com",
				enable:true,
				click:false,
				url:/^http:\/\/www\.douban\.com/i,
				getImage:function(){
					var templink=this.src.replace(/view\/photo\/thumb\//i,'view/photo/photo/');
					if(templink!=this.src)return templink;
				}
			},
			{sitename:"flickr",
				enable:true,
				click:false,
				url:/^http:\/\/www\.flickr\.com/i,
				siteExample:"http://www.flickr.com",
				getImage:function(){
						var templink=this.src.replace(/_t(\.\w{2,5})$/i,'$1');
						if(templink!=this.src)return templink;
				}
			},
			{sitename:"mozest",
				enable:true,
				click:true,
				url:/^http:\/\/g\.mozest\.com/i,
				siteExample:"http://g.mozest.com",
				getImage:function(){
						var templink=this.src.replace(/\.thumb\.\w{2,5}$/i,'');
						if(templink!=this.src){return templink};
				}
			},
			{sitename:"deviantart",
				enable:true,
				click:true,
				url:/^http:\/\/www\.deviantart\.com/i,
				siteExample:"http://www.deviantart.com",
				getImage:function(){
					return this.src.replace(/(http:\/\/[^\/]*\/fs\d*\/)150\/(.*)/i,'$1$2')
				}
			},
			{sitename:"opera官方论坛",
				enable:true,
				click:true,
				url:/^http:\/\/bbs\.operachina\.com/i,
				siteExample:"http://bbs.operachina.com",
				getImage:function(){
					return this.src.match(/(.*)&t=1$/i)[1]+'&mode=view';
				}
			},
			{sitename:"深度",
				enable:true,
				click:true,
				url:/^http:\/\/bbs\.deepin\.org/i,
				siteExample:"http://bbs.deepin.org",
				getImage:function(){
					return (/attachment\.php/i.test(this.src))? this.src+'&noupdate=yes&nothumb=yes' : '';
				}
			},
			{sitename:"远景",
				enable:true,
				click:true,
				url:/^http:\/\/bbs\.pcbeta\.com/i,
				siteExample:"http://bbs.pcbeta.com",
				getImage:function(){
					return (/attachment\.php/i.test(this.src))? this.src+'&noupdate=yes&nothumb=yes' : '';
				}
			},
			{sitename:"QQ微博",
				enable:true,
				click:false,
				url:/^http:\/\/t\.qq\.com\//i,
				siteExample:"http://t.qq.com",
				getImage:function(){
						return matchSingleNode('ancestor::a[1]',this).href.match(/^http:\/\/mblogpic\.store\.qq\.com\/.*/i)[0];
				}
			}
		];

	//动画算法...来自 http://www.cnblogs.com/cloudgamer/archive/2009/01/06/Tween.html
	var Tween = {
		Linear: function(t,b,c,d){ return c*t/d + b; },
		Quad: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		Quart: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		Quint: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		Sine: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		Back: {
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function(t,b,c,d){
				return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	};

	var picBox,
				oPic;
	function viewPic(e){
		if(e.button!=0)return;
		e.stopPropagation();
		e.preventDefault();
		var _picBox=picBox;
		var _oPic=oPic;
		if(!_picBox){

			var _prefs=prefs;

			_picBox=picBox=document.createElement('div');
			_picBox.id='N_Pic_Container';
			_picBox.style.cssText='\
				position:absolute!important;\
				width:auto!important;\
				height:auto!important;\
				max-width:999999px!important;\
				max-height:999999px!important;\
				z-index:99999999!important;\
				'+'padding:'+_prefs.pBPadding.join(' ')+'!important;\
				'+_prefs.pBBorder+';\
				margin:0!important;\
				text-align:center!important;\
				background-color:'+_prefs.pBBackgroundC+'!important;\
				border-radius:'+_prefs.pBBorderR.join(' ')+'!important;\
				-moz-border-radius:'+_prefs.pBBorderR.join(' ')+'!important;\
				-webkit-border-radius:'+_prefs.pBBorderR.join(' ')+'!important;\
			';

			_oPic=oPic=new Image();
			_oPic.style.cssText='\
				border:none!important;\
				margin:0!important;\
				padding:0!important;\
				float:none!important;\
				position:static!important;\
			';
			_oPic.id='N_oPic';
			_picBox.appendChild(_oPic);

			var globarStyle=document.createElement('style');
			globarStyle.textContent='\
				#N_picClose:hover{\
					cursor:pointer!important;\
				}\
			';
			document.getElementsByTagName('head')[0].appendChild(globarStyle);

			function closePB(){
				overlayDiv.close();
				_picBox.close();
			};

			var closeButton=new Image();
			closeButton.src=imgButton.closeButton;
			closeButton.id='N_picClose';
			closeButton.style.cssText='\
				position:absolute!important;\
			';
			var closeBSize={
				width:closeButton.width,
				height:closeButton.height
			};
			//alert(closeButton.width);
			closeButton.style.setProperty('top','-'+(closeBSize.height/2)+'px','important');
			closeButton.style.setProperty('right','-'+(closeBSize.width/2)+'px','important');
			closeButton.addEventListener('click',closePB,false);
			_picBox.appendChild(closeButton);

			if(_prefs.zoomWithSW){
				var scrollEvent=(window.opera || window.chrome)? 'mousewheel' : 'DOMMouseScroll';
				var zoomRange=_prefs.zoomRange;
				zoomRange.sort(function(a,b){
					return a-b;
				});
				//alert(zoomRange)
				var preSize;
				_oPic.addEventListener(scrollEvent,function(e){
					e.preventDefault();
					e.stopPropagation();
					var detail=e.wheelDelta || -e.detail;
					var _zoomRange=zoomRange;
					var _preSize=preSize;
					if(!_preSize){
						_preSize=this.width/picFullWidth;
					};
					var i,
								ii,
								_zoomRange_x;
					var nextSize;
					if(detail>0){//向上滚,放大
						for(i=0,ii=_zoomRange.length;i<ii;i++){
							_zoomRange_x=_zoomRange[i];
							if(_zoomRange_x>_preSize){
								nextSize=_zoomRange_x;
								break;
							};
						};
					}else{
						for(i=_zoomRange.length-1;i>=0;i--){
							_zoomRange_x=_zoomRange[i];
							if(_zoomRange_x<_preSize){
								nextSize=_zoomRange_x;
								break;
							};
						};
					};
					//alert(nextSize);
					if(nextSize){
						preSize=nextSize;
						//var curWidth=this.width;
						//alert(this.offsetWidth)
						//alert(curWidth)
						var curWidth=this.offsetWidth
						//alert(curWidth)
						//var curHeight=this.height;
						var curHeight=this.offsetHeight;
						var nextWidth=picFullWidth*nextSize;
						var nextHeight=picFullHeight*nextSize;
						centerPic(curWidth,curHeight,nextWidth,nextHeight);
						this.style.setProperty('width',nextWidth+'px','important');
					};
				},false);
			};

			function centerPic(cW,cH,nW,nH){
				var changeWidth=(nW-cW)/2;
				var changeHeight=(nH-cH)/2;
				var __picBox=_picBox;
				var curPBLeft=parseInt(__picBox.style.left);
				var curPBTop=parseInt(__picBox.style.top);
				__picBox.style.setProperty('left',curPBLeft-changeWidth+'px','important');
				__picBox.style.setProperty('top',curPBTop-changeHeight+'px','important');
			};

			//如果.缩放了.就还原.否则退出.
			_oPic.addEventListener('click',function(e){
				if(e.button!=0)return;
				//为opera 10.5的修正.
				if(!(window.opera && window.opera.version()>=10.5)){
					if(isMoving){
						isMoving=false;
						return;
					};
				};
				//var cW=this.width;
				var cW=this.offsetWidth;
				//alert(cW);
				//alert(picFullWidth);
				if(cW!=picFullWidth){
					preSize=1;
					//var cH=this.height;
					var cH=this.offsetHeight;
					//alert(0);
					centerPic(cW,cH,picFullWidth,picFullHeight);
					this.style.setProperty('width',picFullWidth+'px','important');
				}else{
					closePB();
				};
			},false);

			document.addEventListener('keydown',function(e){
				if(e.keyCode==27 && _picBox.style.display!='none'){
					closePB();
				};
			},false);

			function boxMove(e){
				isMoving=true;
				_picBox.style.setProperty('left',oX+e.clientX-oMouseX+'px','important');
				_picBox.style.setProperty('top',oY+e.clientY-oMouseY+'px','important');
			};
			function boxMOver(){
				document.removeEventListener('mousemove',boxMove,false);
				document.removeEventListener('mouseup',boxMOver,false);
			};

			var preRad=0,
						tempRad;
			function boxRotate(e){
				isMoving=true;
				var curMouseX=e.clientX;
				var curMouseY=e.clientY;
				var rad=Math.atan2(curMouseY-oMouseY,curMouseX-oMouseX);
				if(preRad){
					rad+=preRad;
				};
				tempRad=rad;
				_picBox.style.setProperty('-o-transform','rotate('+rad+'rad)','important');
				_picBox.style.setProperty('-webkit-transform','rotate('+rad+'rad)','important');
				_picBox.style.setProperty('-moz-transform','rotate('+rad+'rad)','important');
			};

			function boxROver(){
				preRad=tempRad;
				document.removeEventListener('mousemove',boxRotate,false);
				document.removeEventListener('mouseup',boxROver,false);
			};

			var oX,
						oY,
						oMouseX,
						oMouseY;
			var isMoving;
			_oPic.addEventListener('mousedown',function(e){
				e.preventDefault();
				if(e.button!=0)return;
				oMouseX=e.clientX;
				oMouseY=e.clientY;
				if(e.shiftKey){
					if(window.opera && window.opera.version()<10.5)return;
					//if(window.opera)return;
					document.addEventListener('mousemove',boxRotate,false);
					document.addEventListener('mouseup',boxROver,false);
				}else{
					oX=parseInt(_picBox.style.left);
					oY=parseInt(_picBox.style.top);
					document.addEventListener('mousemove',boxMove,false);
					document.addEventListener('mouseup',boxMOver,false);
				};
			},false);

			var overlayDiv=document.createElement('div');
			overlayDiv.style.cssText='\
				background-color:rgba(0,0,0,0.6)!important;\
				border:none!important;\
				padding:0!important;\
				margin:0!important;\
				display:none!important;\
				position:absolute!important;\
				top:0!important;\
				left:0!important;\
				z-index:10000!important;\
			';

			overlayDiv.addEventListener('click',closePB,false);

			overlayDiv.display=function(){
				this.style.setProperty('display','block','important');
				this.style.setProperty('height',document.documentElement.scrollHeight+'px','important');
				this.style.setProperty('width',document.documentElement.scrollWidth+'px','important');
			};

			overlayDiv.close=_picBox.close=function(){
				this.style.setProperty('display','none','important');
			};
			document.body.appendChild(overlayDiv);

			var frameRate=_prefs.frameRate;
			var d=Math.ceil(_prefs.duration*frameRate);
			var frameSpeed=1000/frameRate;
			var _Tween=Tween;
			var aMethod=_Tween.Back.easeOut;
			var enableTransition=_prefs.transition;
			var pBoxTP=parseInt(_picBox.style.paddingTop,10),
						pBoxRP=parseInt(_picBox.style.paddingRight,10),
						pBoxBP=parseInt(_picBox.style.paddingBottom,10),
						pBoxLP=parseInt(_picBox.style.paddingLeft,10);
			var pBoxTB=parseInt(_picBox.style.borderTopWidth,10),
						pBoxRB=parseInt(_picBox.style.borderRightWidth,10),
						pBoxBB=parseInt(_picBox.style.borderBottomWidth,10),
						pBoxLB=parseInt(_picBox.style.borderLeftWidth,10);
			pBoxTB=isNaN(pBoxTB)? 0 : pBoxTB;
			pBoxRB=isNaN(pBoxRB)? 0 : pBoxRB;
			pBoxBB=isNaN(pBoxBB)? 0 : pBoxBB;
			pBoxLB=isNaN(pBoxLB)? 0 : pBoxLB;

			var buttonDiv=document.createElement('div');
			buttonDiv.style.cssText='\
				position:absolute!important;\
				background-color:rgba(0,0,0,0.3)!important;\
				bottom:50%!important;\
				width:100%;\
			';
			//_picBox.appendChild(buttonDiv);


			var picFullWidth,
						picFullHeight;
			var picLoaded;
			_oPic.addEventListener('load',function(){

				var fWidth=picFullWidth=this.width;
				var fHeight=picFullHeight=this.height;

				//alert(_oPic.offsetWidth)
				//alert(_oPic.offsetHeight)
				//alert(_oPic.width)
				//alert(_oPic.height)

				_picBox.style.setProperty('left',target_x,'important');
				_picBox.style.setProperty('top',target_y,'important');
				var clientHeight=window.innerHeight,
							clientWidth=window.innerWidth;
				var paddingX=pBoxLP+pBoxRP+pBoxLB+pBoxRB,
							paddingY=pBoxTP+pBoxBP+pBoxTB+pBoxBB;
				/*
				while((parseInt(o_image.style.width)>=(window.innerWidth-20) || parseInt(o_image.style.height)>=(window.innerHeight-50))){
					o_image.style.width=no_scale_width * zoomx+'px';
					o_image.style.height=no_scale_height * zoomx +'px';
					zoomx-=0.02;
				};
				*/
				var overFlowH=clientHeight-(paddingX+fHeight);
				var overFlowW=clientWidth-(paddingY+fWidth);

				var top=window.scrollY+((clientHeight-(paddingX+fHeight))/2);
				var left=window.scrollX+((clientWidth-(paddingY+fWidth))/2);


				var _preImage=preImage;
				//var imgH=parseInt(window.getComputedStyle(_preImage,'').height,10);
				var imgW=parseInt(window.getComputedStyle(_preImage,'').width,10);
				_oPic.style.setProperty('width',imgW,'important');

				var t=0;
				var b=imgW,
							c=fWidth-imgW;
				var b3=target_y,
							c3=top-b3;
				var b4=target_x,
							c4=left-b4;
				var b5=0,
							c5=1;
				function transition(){
					var _aMethod=aMethod;
					var width=Math.ceil(_aMethod(t,b,c,d)) + "px";
					var top=Math.ceil(_aMethod(t,b3,c3,d)) + "px";
					var left=Math.ceil(_aMethod(t,b4,c4,d)) + "px";
					var opacity=aMethod(t,b5,c5,d);
					_oPic.style.setProperty('width',width,'important');
					_picBox.style.setProperty('opacity',opacity,'important');
					_picBox.style.setProperty('top',top,'important');
					_picBox.style.setProperty('left',left,'important');
					if(t<d){
						t++;
						setTimeout(transition,frameSpeed);
					}else{
						//alert(t);
						setTimeout(function(){overlayDiv.display()},100);
					};
				};
				if(enableTransition){
					transition();
				}else{
					setTimeout(function(){
						_picBox.style.setProperty('top',top+'px','important');
						_picBox.style.setProperty('left',left+'px','important');
						_oPic.style.setProperty('width',fWidth,'important');
						_picBox.style.setProperty('opacity','1','important');
						setTimeout(function(){overlayDiv.display()},100);
					},0);
				};

			},false);
			document.body.appendChild(_picBox);
		};

		_picBox.style.setProperty('display','block','important');
		//_picBox.style.setProperty('left','0','important');
		//_picBox.style.setProperty('top','0','important');
		_picBox.style.setProperty('left','-99999px','important');
		_picBox.style.setProperty('top','-99999px','important');
		_picBox.style.setProperty('opacity','0.2','important');
		_oPic.style.setProperty('height','auto','important');
		_picBox.style.removeProperty('-o-transform');
		_picBox.style.removeProperty('-webkit-transform');
		_picBox.style.removeProperty('-moz-transform');
		_oPic.style.removeProperty('width');
		//chrome上换上和上一张一样的SRC不会再次出发load事件
		if(window.chrome)_oPic.src='';
		_oPic.src=imgLink;
	};


	var URL=location.href;

	for(var i=0,ii=blackList.length,blacklist_x;i<ii;i++){
		blacklist_x=blackList[i];
		if(blacklist_x[2].test(URL)){
			if(blacklist_x[1]){
				return;
			};
			break;
		};
	};

	var preTarget,
				imgSwitch,
				added,
				iTimeout,
				iTimeout2,
				getImage,
				click,
				preImage,
				imgLink,
				imgSSize,
				target_x,
				target_y;

	var imgSDTimeout=prefs.imgSDTimeout,
				imgSDTimeout2=prefs.imgSDTimeout2,
				error=prefs.error,
				min=prefs.min,
				imgSOffset=prefs.imgSOffset,
				imgSPosition=prefs.imgSPosition,
				showForAll=prefs.showForAll,
				showLimit=prefs.showLimit;


	function mouseMove(e){
		var curTarget=e.target;
		var cID=curTarget.id;
		//alert(cID);
		if(cID=='N_imgSwitch' || cID=='N_oPic')return;
		if(curTarget==preTarget)return;
		preTarget=curTarget;

		clearTimeout(iTimeout);

		var _imgSwitch=imgSwitch;
		if(_imgSwitch && _imgSwitch.style.display!='none' && !added){
			added=true;
			iTimeout2=setTimeout(function(){
				added=false;
				_imgSwitch.style.setProperty('display','none','important');
			},imgSDTimeout2);
		};

		if(curTarget==preImage && added){
			clearTimeout(iTimeout2);
			added=false;
		};

		if(curTarget.nodeName.toLowerCase()!=='img')return;

		var tPicLink;
		if(getImage===undefined){
			var i,
						ii,
						siteInfo_x,
						getImage=false;
			for(i=0,ii=siteInfo.length;i<ii;i++){
				siteInfo_x=siteInfo[i];
				if(siteInfo_x.url.test(URL)){
					if(siteInfo_x.enable!==false){
						getImage=siteInfo_x.getImage;
						click=siteInfo_x.click;
					};
					break;
				};
			};
		};

		if(getImage){
			try{
				tPicLink=getImage.call(curTarget);
				if(click && !curTarget.getAttribute('N_click')){
					curTarget.setAttribute('N_click','true');
					curTarget.addEventListener('click',viewPic,false);
				};
			}catch(e){
				//alert('方法错误!!')
			};
		};

		function getCISize(target){
			return {
				width:parseInt(window.getComputedStyle(target,'').width),
				height:parseInt(window.getComputedStyle(target,'').height)
			};
		};

		var cTSrc,
					curImgSize;
		if(!tPicLink){
			var cloneImage=new Image();
			cTSrc=curTarget.src;
			cloneImage.src=cTSrc;
			var cImgW=cloneImage.width,
						cImgH=cloneImage.height;
			curImgSize=getCISize(curTarget);
			//alert(curImgSize.width);
			//alert(curImgSize.height);
			//alert(cImgW);
			//alert(cImgH);
			var _min=min,
						_error=error;
			if((cImgW>_min || cImgH>_min) && (Math.abs(cImgW-curImgSize.width)>_error || Math.abs(cImgH-curImgSize.height)>_error)){
				tPicLink=cTSrc;
			};
			//alert(tPicLink);
		};

		if(!tPicLink){
			var imgPA=matchSingleNode('ancestor::a[1]',curTarget);
			//alert(imgPA);
			if(imgPA){
				var iPASrc=imgPA.href;
				if(/\.(?:jpg|jpeg|png|gif|bmp)$/i.test(iPASrc)){
					var moreCorrect=iPASrc.match(/http:.*?(http:.+)/i);
					if(moreCorrect){
						tPicLink=moreCorrect[1];
					}else{
						tPicLink=iPASrc;
					};
				};
			};
		};

		//alert(tPicLink);
		if(!tPicLink){
			if(showForAll && (curImgSize.width>showLimit || curImgSize.height>showLimit)){
				tPicLink=curTarget.src;
			}else{
				return;
			};
		};

		imgLink=tPicLink;
		preImage=curTarget;

		if(!_imgSwitch){
			//alert(document.body);
			_imgSwitch=imgSwitch=new Image();
			_imgSwitch.src=imgButton.imgSwitch;
			_imgSwitch.id='N_imgSwitch';
			_imgSwitch.style.cssText='\
				cursor:pointer!important;\
				position:absolute!important;\
				border:none!important;\
				z-index:9990!important;\
				opacity:0.8!important;\
				display:none!important;\
				-o-transition:opacity 0.2s ease-in-out!important;\
				-moz-transition:opacity 0.2s ease-in-out!important;\
				-webkit-transition:opacity 0.2s ease-in-out!important;\
			';
			_imgSwitch.addEventListener('click',viewPic,false);
			_imgSwitch.addEventListener('mouseover',function(){
				this.style.setProperty('opacity','1','important');
			},false);
			_imgSwitch.addEventListener('mouseout',function(){
				this.style.setProperty('opacity','0.8','important');
			},false);

			imgSSize={
				width:_imgSwitch.width,
				height:_imgSwitch.height
			};

			//alert(imgSSize);
			document.body.appendChild(_imgSwitch);
		};

		function getImgCoor(s){
			function getImgPadding(s){
				switch(s){
					case 'top':{
						return parseInt(window.getComputedStyle(curTarget,'').paddingTop,10);
					}break;
					case 'right':{
						return parseInt(window.getComputedStyle(curTarget,'').paddingRight,10);
					}break;
					case 'bottom':{
						return parseInt(window.getComputedStyle(curTarget,'').paddingBottom,10);
					}break;
					case 'left':{
						return parseInt(window.getComputedStyle(curTarget,'').paddingLeft,10);
					}break;
					default:break;
				};
			};
			switch(s){
				case 'top':{
					return curTarget.getBoundingClientRect().top + window.scrollY + getImgPadding(s);
				}break;
				case 'right':{
					return curTarget.getBoundingClientRect().right + window.scrollX - getImgPadding(s);
				}break;
				case 'bottom':{
					return curTarget.getBoundingClientRect().bottom + window.scrollY - getImgPadding(s);
				}break;
				case 'left':{
					return curTarget.getBoundingClientRect().left + window.scrollX + getImgPadding(s);
				}break;
				default:break;
			};
		};

		function displayImgS(x,y){
			if(added){
				clearTimeout(iTimeout2);
				added=false;
			};
			//alert(x[1]);

			_imgSwitch.style.setProperty('left',x+'px','important');
			_imgSwitch.style.setProperty('top',y+'px','important');
			_imgSwitch.style.setProperty('display','block','important');
			_imgSwitch.title=tPicLink;
		};

		var _target_x=target_x=getImgCoor('left');
		var _target_y=target_y=getImgCoor('top');

		var imgX,
					imgY;

		switch(imgSPosition){
			case 1:{
				imgX=_target_x+imgSOffset[0];
				imgY=_target_y+imgSOffset[1];
			}break;
			case 2:{
				imgX=getImgCoor('right')-imgSOffset[0]-imgSSize.width;
				imgY=_target_y+imgSOffset[1];
			}break;
			case 3:{
				imgX=getImgCoor('right')-imgSOffset[0]-imgSSize.width;
				imgY=getImgCoor('bottom')-imgSOffset[1]-imgSSize.height;
			}break;
			case 4:{
				imgX=_target_x+imgSOffset[0];
				imgY=getImgCoor('bottom')-imgSOffset[1]-imgSSize.height;
			}break;
			default:break;
		};

		iTimeout=setTimeout(function(){
			displayImgS(imgX,imgY);
		},imgSDTimeout);

	};


	//mouseover在某些网站的图片上.禁止冒泡..导致监控不到..所以用.mousemove.模拟mouseover和mouseout
	if(window.opera){
		document.addEventListener('DOMContentLoaded',function(){
			document.addEventListener('mousemove',mouseMove,false);
		},false)
	}else{
		document.addEventListener('mousemove',mouseMove,false);
	};

})(window,document)
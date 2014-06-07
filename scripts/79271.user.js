// ==UserScript==
// @name YoukuSS
// @author NLF
// @description 方便的切换优酷的屏幕大小
// @mod_date 2010-4-22
// @version 1.8.6
// @include http://v.youku.com/*
// @exclude http://v.youku.com/v_showMini*
// ==/UserScript==

(function (){
	var N_yk={
		"wideScreen":'2'				,//初始化为宽屏    0:普通;1:普屏(大);2:宽屏;3宽屏(大);cus自定义的大小;
		"EnableCS":true 				,//是否启用cookie保存最后的屏幕状态;
		"drag":true							,//任何地方按住ctrl 鼠标左键拖曳播放器大小..;
		"replacec":true						,//美化原开关灯按钮,并且在新的开关按钮上..添加 按住shift 单击左键.新的关灯效果..;
		"minic":false						,//迷你播放器控制栏..;
		////////////////////////////////////////
		//基本的去广告CSS内容
		bkad:'*[id*="preAd"],*[id^="ab_"],div.left>div:last-child{display:none !important;}',
		//普屏CSS内容
		NMCSS:[
					'div>.left>div.playArea>div#player{width:610px;height:498px;}'
					],
		//超普屏CSS内容
		SNMCSS:[
					'div>.left>div.playArea>div#player{width:928px;height:736px;}\
					div.right{margin-top:736px!important;}'
					],
		//宽屏CSS内容
		WSCSS:[
					'div>.left>div.playArea>div#player{width:688px;height:427px;}\
					div.left{width:688px !important;}\
					body>div.s_main{width:1010px !important;}'
					],
		//超宽屏CSS内容
		SWSCSS:[
						'div>.left>div.playArea>div#player{width:928px ;height:562px ;}\
						div.right{margin-top:562px!important;}'
					]
	};

	var Style;
	function Style_loader(){
		if(!Style){
			if(N_yk.EnableCS){
				var cc=getCookie("ykws");
				if (cc!=''){N_yk.wideScreen=cc};
			};
			Style = document.createElement('style');
			Style.setAttribute('type','text/css');
			document.getElementsByTagName('head')[0].appendChild(Style);
		};
		switch(N_yk.wideScreen){
			case '0':{
				Style.innerHTML=N_yk.NMCSS.join('')+N_yk.bkad;
				};break;
			case '1':{
				Style.innerHTML=N_yk.SNMCSS.join('')+N_yk.bkad;
			};break;
			case '2':{
				Style.innerHTML=N_yk.WSCSS.join('')+N_yk.bkad;
			};break;
			case '3':{
				Style.innerHTML=N_yk.SWSCSS.join('')+N_yk.bkad;
			};break;
			case 'cus':{
				Style.innerHTML=getCookie("ykwsc")+N_yk.bkad;
			};break;
			default:{
				Style.innerHTML=N_yk.bkad;
			};break;
		}
	};
	Style_loader();

	function init(){
		//封装 evaluate()方法
		function matchNode(xpath,root,doc){
				return (doc||document).evaluate(xpath, root || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		};

		var kaiguan=document.createElement('select');
		kaiguan.innerHTML='<option value="0">【4:3】</option><option  value="1">【4:3】_B</option><option value="2">【16:9】</option><option value="3">【16:9】_B</option><option value="cus">【自定义】</option>'
	//根据屏幕状态初始化开关的状态
		var cursel;
		function xxxx(){
			var options=kaiguan.options;
			for(var i=0,ii=options.length;i<ii;i++){
				if(options[i].value== (cursel || N_yk.wideScreen)){
					options[i].selected=true;
					cursel=options[i].value;
					break;
				};
			};
		};
		xxxx();
		var position1 =matchNode('//div[@class="guide"]').snapshotItem(0);
		var position2 =matchNode('//div[@class="videoClass"]').snapshotItem(0);
		var position=position1 || position2;
		position.appendChild(kaiguan);
		kaiguan.style.cssText='margin-left:8px;color:red;display:inline!important;';
		kaiguan.addEventListener('change',function(e){
			var tempV=e.target.value;
			if(tempV==='cus'){
				var cm=prompt('自定义屏幕大小:\n请输入宽和高\n格式:800,600(中间请用逗号分隔)','800,600');
				if(cm==null){xxxx();return;};
				if (cm=='' || cm.indexOf(',')==-1){alert('格式无效');xxxx();return};
				var cm=cm.split(',');
				var width=parseInt(cm[0],10);
				var height=parseInt(cm[1],10);
				var ccss='div>.left>div.playArea>div#player{width:'+width+'px'+';height:'+height+'px'+';}'
				if(width >=633) {
					ccss+='div.right{margin-top:'+height+'px'+'!important;}'
				};
				setCookie("ykwsc",ccss,30,'/','v.youku.com');
			};
			N_yk.wideScreen=tempV;
			cursel=N_yk.wideScreen;
			setCookie("ykws",N_yk.wideScreen,30,'/','v.youku.com');
			Style_loader();
		},false);

		//关灯咯..
		if(N_yk.replacec){
			var spana=matchNode('//div[@id="vpvideonav"]/descendant::span[@class="turn"]/a').snapshotItem(0);
			if(spana){
				spana.title="左键单击调用优酷自带关灯效果;;按住shift单击,调用额外JS关灯效果."
				var lightImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABCCAYAAABjJzf7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlz  AAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAARs  SURBVEiJ7ZbNT1xVGIefc+6dGeAOA9MOlMKCSjWFjtDGVg2xJWPRhUsXdeHGaKJRN/oP1JX7rmw0  McaNraluTKDxq820okEa6UecGShtoZEiCNNhmJk79/McF3wUF100bnmTd3HOeZ7kTc5v8YqzZ88C  IKVECNEL9CmlWpRShGFYDoKgUK/XpxzHAcBkvYTW+nhzc/ORdDo9FI/H22q1mlsul5dzudx4tVpt  B34BtPQ8D9/3+yzLOprJZN5NJBJPhWEYq1QqYblcThw7dux1y7KO1Gq1vrW1NaTneTiOkx4YGDjh  +74Kw9AVQgjDMAzHcZyFhYXS4ODgkG3bacdxMG3bRmvdkkwm97muawPa8zzPtm1XKaWDIHBTqVSX  bdutWmvMarWK1lq7rusUi8U1QNu27ZZKJVdKKWKxmCmECGzbVlprzFqthtZ6eWpqKhePx/cVi8Wi  UkpLKUVzc3MkmUwmCoXCrOM4y1prpOM41Ov1yQsXLvyeSqWilmXFLMsyk8lkrLW1tSkej0fPnTv3  q+d5k77vYwwODqKUWiuVSub8/Lw7PDz8ghDCtywrsnv37j1nzpw5Pzc3Ny6EyAMYPT092LZNEAQL  i4uL7d3d3amOjo52wzCMqampW6Ojo2PAz4AGkL7vs9EqDMObExMT1yKRSGMkEmmamJi4BtwE1MYH  I/P5PNtqPp/PV6SUhpTSyOfzFWB+8/Hy5csPyUwmw8mTJ+nv739nZGREnz59WhuG8Wk6nSadTm9x  m1kim82SyWQA6O3txfd9AHK53PYJkBvdACSz2exegJWVFVZXVzeZvcAuoAmQAjCA5o3LhBAiDpwC  OrXWHwIPgApQAspCa83jlHwsekfYEXaEHWFH2BEeUeLrj7YdBL1An9YkNaA1a1qTC0IKYbjObG1k  wFBLx8Gj6cx7mZbO7i7HWdCl+7N/T499O/Zg4U4ncAnQxqvHAUi3dj794ok3v3g/lki0a+3Iam1G  uOru3gPPvXF0aXa6WF0tlkPFolQKwpBDAy99MByqmlTK88HEMBoIgnJQWh0Xh19+OxOEPBsoMIP1  2VKtnfv3B0HFBamDoKxcdwmlfKGUF+7qeqLbC9ij9UPB9NyVoGbfCoWQynWXqFZvm1LGZCTSKtCG  7/lIrcH0AwCW7+XGphNd8nC1Ol1XyheGEZWxWKewrJ7IXP76tOezCCCDEPyA38ZHv7pmNfY70Whb  tKGhw2hq2i8t60kjFtnnXPrmkxuhIhuEYLzyPGhNqVqtN67cn+eZobcOCWmE0WibjMcPxL777OOR  pb9mLgHjALJchYoNfsCPd3KTd+7+mbsZjbZHTDNu3L7xx83ZwtVbwPdb0QgVbHSoNVcKVy/mTTMe  MYx4tHD1Yh64AoRbQvbGf6Iyc2960hXCEFKa4t70pAvMbD5++QOY2euQvQ6vvdxOW1tb7cqknB0Y  a2yfmZnh1Odu8ng/NVhntmeJ8z/9QyZzECjS19eL50XZDm6NxCM2snJ5eZP5fxvZvzGZVZUdEni2  AAAAAElFTkSuQmCC'
				//需要访问页面中的变量,为了兼容其他浏览器..所以在地址栏执行 js;
				var hrefj='javascript:(function(){'+matchNode.toString()+';var spana=matchNode(\'//div[@id="vpvideonav"]/descendant::span[@class="turn"]/a\').snapshotItem(0);var o_onclick=spana.getAttribute("onclick");spana.removeAttribute("onclick");spana.addEventListener("mouseup",function(e){if(e.shiftKey){return;};eval(o_onclick);},false);void(0);})()';
				location.href=hrefj;
				spana.style.cssText+='position:absolute;top:0;left:-50px;z-index:120;padding-left:20px;background-image:url("'+lightImage+'");background-repeat:no-repeat;background-position:0 0;'
				//创建一个黑色的半透明覆盖层;
				var black_div=document.createElement('div');
				black_div.style.cssText='opacity:0;-webkit-transition:opacity 0.3s ease-in-out;-o-transition:opacity 0.3s ease-in-out;display:none;z-index:100;position:fixed;left:0;top:0;width:100%;height:100%;background-color:black;';
				document.body.appendChild(black_div);
				function lightC(){
					if(getCookie('light')=='off' || black_div.style.display!='none'){
						spana.textContent='开灯';
						spana.style.backgroundPosition='0 -50px';
						spana.style.color='#F0F000';
						spana.style.textShadow='0 0 5px #F0F000';
					}else{
						spana.textContent='关灯';
						spana.style.backgroundPosition='0 0';
						spana.style.removeProperty('color');
						spana.style.textShadow='';
					};
				};
				lightC();
				//为什么在父元素在挂载监听..嘿嘿自己想想..
				spana.parentNode.addEventListener('mouseup',function(e){
					if(e.shiftKey){
						if(black_div.style.display=='none'){
							black_div.style.display='';
							setTimeout(function(){black_div.style.opacity=0.9;},0);
						}else{
							black_div.style.opacity=0;
							setTimeout(function(){black_div.style.display='none';lightC();},200);
						};
					};
					lightC();
				},false)
			};
		};

		//添加拖曳监听;
		if(N_yk.drag){
			document.addEventListener('mousedown',function(e){
				if(e.button!=0 || !e.ctrlKey){return;};
				e.preventDefault();
				var Div_left_W=matchNode('//div[@class="left"]').snapshotItem(0).offsetWidth;
				var Div_right=matchNode('//div[@class="right"]').snapshotItem(0);
				var player_W=document.getElementById('player').offsetWidth;
				var player_H=document.getElementById('player').offsetHeight;
				var o_mouse_x=e.clientX;
				var o_mouse_y=e.clientY;
				var ys;
				function moveit(e){
					N_yk.wideScreen='cus';
					var f_player_W=e.clientX-o_mouse_x+ player_W;
					var f_player_H=e.clientY-o_mouse_y+ player_H;
					if(f_player_W>Div_left_W){
						var Div_right_MT=f_player_H;
					}else{
						var Div_right_MT=0;
					};
					clearTimeout(ys);
					ys=setTimeout(function(){Style.innerHTML='div>.left>div.playArea>div#player{width:'+ f_player_W +'px ;height:'+ f_player_H +'px;}\
													div.right{margin-top:'+Div_right_MT+'px !important;}';
												},10);
				}
				document.addEventListener('mousemove',moveit,false);
				document.addEventListener('mouseup',function(e){
					N_yk.wideScreen='cus';
					cursel=N_yk.wideScreen;
					xxxx();
					setCookie("ykwsc",Style.innerHTML,30,'/','v.youku.com');
					setCookie("ykws",N_yk.wideScreen,30,'/','v.youku.com');
					document.removeEventListener('mousemove',moveit,false);
					document.removeEventListener('mouseup',arguments.callee,false);
				},false);
			},false);
		};
		//迷你控制
		if(N_yk.minic){
			var movie_player=document.getElementById("movie_player");
			var flashvars=movie_player.getAttribute("flashvars").replace(/interior/i, "index");
			movie_player.setAttribute('flashvars',flashvars);
			movie_player.parentNode.appendChild(movie_player);
		};
	};

	function setCookie(c_name,c_value,keepday,c_path,c_domain,c_secure){
		var scookie=c_name+'='+encodeURIComponent(c_value);
		if (keepday){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+Number(keepday));
			scookie+=';expires='+exdate.toGMTString();
		}
		if (c_path){
			scookie+=';path='+c_path;
		}
		if (c_domain){
			scookie+=';domain='+c_domain;
		}
		if (c_secure){
			scookie+=';secure='+c_secure;
		}
		document.cookie=scookie;
	};

	function getCookie(c_name){
	var sre="(?:;)?"+c_name+"=([^;]*);?"
	var ore=new RegExp(sre);
		if(ore.test(document.cookie)){
			return decodeURIComponent(RegExp.$1)
		}else{
			return '';
		}
	};

////////////////////////////////////
	if(window.opera){
		document.addEventListener('DOMContentLoaded',init,false);
	}else{
		init();
	};
})();
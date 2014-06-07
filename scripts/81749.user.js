// ==UserScript==
// @name YoukuSS
// @author NLF
// @description 优酷功能的增强(窗口大小控制,视频下载等.)(support opera 10.1+,firefox 3.5+,chrome 5+)
// @mod_date 2010-6-22
// @version 1.9
// @include http://v.youku.com/*
// @include http://www.flvcd.com/parse*
// @download http://bbs.operachina.com/viewtopic.php?f=41&t=62429
// ==/UserScript==

(function (){
	//迷你窗口上和下载地址解析iframe上..禁止加载JS.
	if(/^https?:\/\/v\.youku\.com\/v_showMini/i.test(location.href) || window.name=='N_downvideo')return;

	///////////////////////////////////开关////////////////
	var prefs={
		SZ:2									,//初始化为屏幕尺寸  0:普通(优酷的默认大小);1:普屏(大);2:宽屏;3宽屏(大);
		EnableCS:true 				,//是否启用cookie保存最后的屏幕状态..;
		drag:true							,//任何地方按住ctrl 鼠标左键拖曳播放器大小..;
		replacec:true					,//美化原开关灯按钮..;
		minic:false					,//迷你播放器控制栏..;
		download:true					,//视频下载功能..(chrome上无效);
		transition:true				,//切换屏幕大小时.动画过渡..;
		////////////////////////////////////开关结束////////////////

		//普屏CSS内容
		NMCSS:'\
			div#player{\
				width:610px;\
				height:499px;\
			}',

		//超普屏CSS内容
		SNMCSS:'\
			div#player{\
				width:930px;\
				height:738px;\
			}\
			div.right{\
				margin-top:738px!important;\
			}',

		//宽屏CSS内容
		WSCSS:'\
			div#player{\
				width:610px;\
				height:388px;\
			}',

		//超宽屏CSS内容
		SWSCSS:'\
			div#player{\
				width:930px;\
				height:569px ;\
			}\
			div.right{\
				margin-top:569px!important;\
			}'
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

	if(prefs.EnableCS){
		prefs.SZ=getCookie("ykws") || prefs.SZ;
	};
	var Style=document.createElement('style');
	Style.setAttribute('type','text/css');
	document.getElementsByTagName('head')[0].appendChild(Style);

	function Style_loader(){
		switch(String(prefs.SZ)){
			case '0':{
				Style.innerHTML=prefs.NMCSS;
			};break;
			case '1':{
				Style.innerHTML=prefs.SNMCSS;
			};break;
			case '2':{
				Style.innerHTML=prefs.WSCSS;
			};break;
			case '3':{
				Style.innerHTML=prefs.SWSCSS;
			};break;
			case 'cus':{
				Style.innerHTML=getCookie("ykwsc");
			};break;
			default:{
			};break;
		};
	};
	Style_loader();

	function init(){
		//封装 evaluate()方法
		function matchSingleNode(xpath,doc,root){
			doc=doc||document;
			if(root){
				xpath=xpath.indexOf('.')==0? xpath : '.'+xpath;
			}else{
				root=doc;
			};
			return doc.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		};

		var kaiguan=document.createElement('select');
		kaiguan.innerHTML='\
			<option value="0">【4:3】</option>\
			<option value="1">【4:3】_B</option>\
			<option value="2">【16:9】</option>\
			<option value="3">【16:9】_B</option>\
			<option value="cus">【自定义】</option>';
		kaiguan.style.cssText='\
			margin-left:8px;\
			color:#014CCC;\
			display:inline!important;';
		kaiguan.addEventListener('change',function(){
			var tempV=this.value;
			if(tempV=='cus'){
				var cm=prompt('自定义屏幕大小:\n请输入宽和高\n格式:800,600(中间请用逗号分隔)','800,600');
				if(cm==null){csize();return;};
				if (!cm || cm.indexOf(',')==-1){alert('格式无效');csize();return};
				var cm=cm.split(',');
				var width=parseInt(cm[0],10);
				var height=parseInt(cm[1],10);
				var ccss='div>.left>div.playArea>div#player{width:'+width+'px'+';height:'+height+'px'+';}'
				if(width >610){
					ccss+='div.right{margin-top:'+height+'px'+'!important;}'
				};
				setCookie("ykwsc",ccss,30,'/','v.youku.com');
			};
			prefs.SZ=cursel=tempV;
			setCookie("ykws",prefs.SZ,30,'/','v.youku.com');
			Style_loader();
		},false);
		var position=matchSingleNode('//div[@class="guide"]');
		position.appendChild(kaiguan);


	//根据屏幕状态初始化开关的状态
		var cursel,options=kaiguan.options;
		function csize(){
			var cursel_t=cursel || prefs.SZ;
			for(var i=0,ii=options.length;i<ii;i++){
				if(options[i].value==cursel_t){
					options[i].selected=true;
					cursel=options[i].value;
					//alert(typeof cursel);
					break;
				};
			};
		};
		csize();

		//视频下载..
		(function(){
			if(!prefs.download || window.chrome)return;
			var i_downbox;
			function V_download(e){
				if(!i_downbox){
					var url=location.href;
					var hash=location.hash;
					if(hash){
						//alert(hash);
						url=url.replace(hash,'');
					};
					i_downbox=document.createElement('div');
					i_downbox.style.cssText='\
						border:1px solid #ccc;\
						position:absolute;\
						z-index:1000;\
						border-radius:3px;\
						background-color:white;\
						height:96px;\
						box-shadow:2px 2px 6px #ccc;\
						-moz-box-shadow:2px 2px 6px #ccc;\
						top:2px;\
						overflow:hidden!important;\
						display:none;';
					var iframe=document.createElement('iframe');
					iframe.frameBorder=0;
					iframe.width=iframe.height='100%';
					iframe.name='N_downvideo';
					i_downbox.appendChild(iframe);
					var i_src='http://www.flvcd.com/parse.php?kw='+url;
					iframe.src=i_src;
					document.body.appendChild(i_downbox);
				};

				if(i_downbox.style.display!='none'){
					i_downbox.style.display='none';
					this.textContent='>>下载视频(开)';
				}else{
					i_downbox.style.display='';
					var i_left=this.getBoundingClientRect().left+window.scrollX+this.offsetWidth;
					i_downbox.style.left=i_left+3+'px';
					this.textContent='>>下载视频(关)';
				};
			};
			var r_d_a=document.createElement('a');
			r_d_a.textContent='>>下载视频(开)';
			r_d_a.style.cssText='\
				padding-left:10px;\
				color:#014CCC;';
			r_d_a.href='javascript:';
			r_d_a.addEventListener('click',V_download,false);
			position.appendChild(r_d_a);
		})();

		//关灯美化..
		(function(){
			if(!prefs.replacec)return;
			var spana=matchSingleNode('//span[@class="turn"]/a');
			if(!spana)return;
			var lightImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABCCAYAAABjJzf7AAAABHNCSVQICAgIfAh\
				kiAAAAAlwSFlz  AAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAARs  SURBVEi\
				J7ZbNT1xVGIefc+6dGeAOA9MOlMKCSjWFjtDGVg2xJWPRhUsXdeHGaKJRN/oP1JX7rmw0  McaNraluTKDxq820okEa6UecGShto\
				ZEiCNNhmJk79/McF3wUF100bnmTd3HOeZ7kTc5v8YqzZ88C  IKVECNEL9CmlWpRShGFYDoKgUK/XpxzHAcBkvYTW+nhzc/ORdDo\
				9FI/H22q1mlsul5dzudx4tVpt  B34BtPQ8D9/3+yzLOprJZN5NJBJPhWEYq1QqYblcThw7dux1y7KO1Gq1vrW1NaTneTiOkx4YG\
				Djh  +74Kw9AVQgjDMAzHcZyFhYXS4ODgkG3bacdxMG3bRmvdkkwm97muawPa8zzPtm1XKaWDIHBTqVSX  bdutWmvMarWK1lq7r\
				usUi8U1QNu27ZZKJVdKKWKxmCmECGzbVlprzFqthtZ6eWpqKhePx/cVi8Wi  UkpLKUVzc3MkmUwmCoXCrOM4y1prpOM41Ov1yQs\
				XLvyeSqWilmXFLMsyk8lkrLW1tSkej0fPnTv3  q+d5k77vYwwODqKUWiuVSub8/Lw7PDz8ghDCtywrsnv37j1nzpw5Pzc3Ny6Ey\
				AMYPT092LZNEAQL  i4uL7d3d3amOjo52wzCMqampW6Ojo2PAz4AGkL7vs9EqDMObExMT1yKRSGMkEmmamJi4BtwE1MYH  I/P5PN\
				tqPp/PV6SUhpTSyOfzFWB+8/Hy5csPyUwmw8mTJ+nv739nZGREnz59WhuG8Wk6nSadTm9x  m1kim82SyWQA6O3txfd9AHK53PYJk\
				BvdACSz2exegJWVFVZXVzeZvcAuoAmQAjCA5o3LhBAiDpwC  OrXWHwIPgApQAspCa83jlHwsekfYEXaEHWFH2BEeUeLrj7YdBL1A\
				n9YkNaA1a1qTC0IKYbjObG1k  wFBLx8Gj6cx7mZbO7i7HWdCl+7N/T499O/Zg4U4ncAnQxqvHAUi3dj794ok3v3g/lki0a+3Iam1\
				G  uOru3gPPvXF0aXa6WF0tlkPFolQKwpBDAy99MByqmlTK88HEMBoIgnJQWh0Xh19+OxOEPBsoMIP1  2VKtnfv3B0HFBamDoKxc\
				dwmlfKGUF+7qeqLbC9ij9UPB9NyVoGbfCoWQynWXqFZvm1LGZCTSKtCG  7/lIrcH0AwCW7+XGphNd8nC1Ol1XyheGEZWxWKewrJ7\
				IXP76tOezCCCDEPyA38ZHv7pmNfY70Whb  tKGhw2hq2i8t60kjFtnnXPrmkxuhIhuEYLzyPGhNqVqtN67cn+eZobcOCWmE0WibjM\
				cPxL777OOR  pb9mLgHjALJchYoNfsCPd3KTd+7+mbsZjbZHTDNu3L7xx83ZwtVbwPdb0QgVbHSoNVcKVy/mTTMe  MYx4tHD1Yh6\
				4AoRbQvbGf6Iyc2960hXCEFKa4t70pAvMbD5++QOY2euQvQ6vvdxOW1tb7cqknB0Y  a2yfmZnh1Odu8ng/NVhntmeJ8z/9QyZzEC\
				jS19eL50XZDm6NxCM2snJ5eZP5fxvZvzGZVZUdEni2  AAAAAElFTkSuQmCC';

			spana.style.cssText+='\
				padding-left:20px;\
				background-image:url("'+lightImage+'");\
				background-repeat:no-repeat;\
				background-position:0 0;'
			function lightC(){
				if(getCookie('light')=='off'){
					spana.textContent='开灯';
					spana.style.opacity='0.6';
					spana.style.backgroundPosition='0 -50px';
					spana.style.color='#F0F000';
					spana.style.textShadow='0 0 5px #F0F000';
				}else{
					spana.textContent='关灯';
					spana.style.opacity='1';
					spana.style.backgroundPosition='0 0';
					spana.style.removeProperty('color');
					spana.style.textShadow='';
				};
			};
			lightC();
			spana.addEventListener('click',lightC,false)
		})();

		//拖曳缩放播放器大小;
		(function(){
			if(!prefs.drag)return;
			function moveit(e){
				prefs.SZ=cursel='cus';
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
			};

			function moveover(e){
				csize();
				setCookie("ykwsc",Style.innerHTML,30,'/','v.youku.com');
				setCookie("ykws",prefs.SZ,30,'/','v.youku.com');
				document.removeEventListener('mousemove',moveit,false);
				document.removeEventListener('mouseup',moveover,false);
			};

			var Div_left_W,Div_right,player_W,player_H,o_mouse_x,o_mouse_y,ys;
			document.addEventListener('mousedown',function(e){
				if(e.button!=0 || !e.ctrlKey){return;};
				e.preventDefault();
				Div_left_W=matchSingleNode('//div[@class="left"]').offsetWidth;
				Div_right=matchSingleNode('//div[@class="right"]');
				player_W=document.getElementById('player').offsetWidth;
				player_H=document.getElementById('player').offsetHeight;
				o_mouse_x=e.clientX;
				o_mouse_y=e.clientY;
				document.addEventListener('mousemove',moveit,false);
				document.addEventListener('mouseup',moveover,false);
			},false);
		})();

		//迷你控制栏..
		(function(){
			if(!prefs.minic)return;
			var movie_player=document.getElementById("movie_player");
			if(!movie_player)return;
			var flashvars=movie_player.getAttribute("flashvars").replace(/interior/i, "index");
			movie_player.setAttribute('flashvars',flashvars);
			movie_player.parentNode.appendChild(movie_player);
		})();

		//动画过渡..
		(function(){
			if(!prefs.transition)return;
			var style=document.createElement('style');
			style.setAttribute('type','text/css');
			style.innerHTML='\
				div#player{\
					-o-transition:width 0.2s ease-in-out,height 0.2s ease-in-out;\
					-webkit-transition:width 0.2s ease-in-out,height 0.2s ease-in-out;\
					-moz-transition:width 0.2s ease-in-out,height 0.2s ease-in-out;\
				}';
			document.getElementsByTagName('head')[0].appendChild(style);
		})();

	};
////////////////////////////////////
	if(window.opera){
		document.addEventListener('DOMContentLoaded',init,false);
	}else{
		init();
	};

})();

//下载功能..iframe
(function(){
	if(window.name!='N_downvideo')return;
	var head=document.getElementsByTagName('head')[0];
	var style=document.createElement('style');
	style.type='text/css';
	head.appendChild(style);
	if(window.chrome){
		style.innerHTML='\
			body>*,\
			body>table>tbody>tr,\
			body>table>tbody>tr>th>table:first-child,\
			body>table>tbody>tr>th>table:last-child>tbody>tr:last-child{\
				display:none!important;\
			}\
			body>table,body>table>tbody>tr[style]{\
				display:block!important;\
			}\
			a{\
				font-size:0!important;\
			}\
			a:after{\
				content: "下载地址";font-size:13px;\
			}';
		return;
	}else{
		style.innerHTML='\
			*{\
					display:none!important;\
				}\
			body{\
				background-color:white!important;\
			}';
	};

	function init(){
		//alert(document.title)
		var as=document.links,tempa,tempa_h,tempa_in,dua=[],hdd,hdd_t;
		for(var i=0,ii=as.length;i<ii;i++){
			tempa=as[i];
			tempa_h=as[i].href;
			if(/^https?:\/\/f\.youku\.com\/player\/getFlvPath/i.test(tempa_h)){
				dua.push(tempa_h);
				continue;
			};
			if(hdd)continue;
			tempa_in=tempa.innerHTML;
			if(/高清模式解析/i.test(tempa_in)){
				hdd=tempa_h;
				hdd_t='高清模式解析';
			}else{
				if(/普通模式解析/i.test(tempa_in)){
					hdd=tempa_h;
					hdd_t='普通模式解析';
				};
			};
		};

		head.innerHTML='';
		var body=document.body;
		body.innerHTML='';

		if(dua.length==0){
			body.innerHTML='解析失败.两次解析时间最少间隔5秒<br /><a href="'+location.href+'">点击重试</a>'
			//alert('解析失败');
		}else{
			//alert(dua.length);
			var DurlN;
			var ii=dua.length;
			var div_title=document.createElement('div');
			var h4inner='本视频一共有 <b>'+ii+'</b> 段';
			if(hdd){
				h4inner+='<a style="color:red;padding-left:10px;" href="'+hdd+'">'+hdd_t+'</a>'
			};
			div_title.innerHTML=h4inner;
			body.appendChild(div_title);
			body.appendChild(document.createElement('hr'));
			for(var i=0;i<ii;i++){
				DurlN=document.createElement('a');
				DurlN.style.cssText='\
					padding-right:10px;\
					font-size:13px;';
				DurlN.textContent='第 '+(i+1)+' 段';
				DurlN.href=dua[i];
				body.appendChild(DurlN);
			};
		};
	};

	if(window.opera){
		document.addEventListener('DOMContentLoaded',init,false);
	}else{
		init();
	};
})();
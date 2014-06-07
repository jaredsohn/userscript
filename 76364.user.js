// ==UserScript==
// @name YoukuSS
// @author NLF
// @description 方便的切换优酷的屏幕大小
// @mod_date 2010-3-7
// @version 1.7
// @include http://v.youku.com/*
// ==/UserScript==



(function (){
		var N_yk={
			"wideScreen":'2'  	,//初始化为宽屏    0:普通;1:普屏(大);2:宽屏;3宽屏(大);cus自定义的大小;
			"EnableCS":true 	,//是否启用cookie保存最后的屏幕状态;
		////////////////////////////////////////
		//基本的去广告CSS内容
			bkad:'*[id*="preAd"],*[id^="ab_"]{display:none !important;}',

		//普屏CSS内容
		NMCSS:[
					'div[class="player"]{width:611px !important;height:498px !important;}',
					'div[class="left"],#content{width:611px !important;}'
					],
		//超普屏CSS内容
		SNMCSS:[
					'div[class="player"]{width:928px !important;height:736px !important;}',
					'div[class="right"]{margin-top:746px!important;}'
					],
		//宽屏CSS内容
			WSCSS:[
						'div[class="left"],#content{width:688px !important;}',
						'div[class="player"]{width:688px !important;height:427px !important;}',
						'div[class^="s_main col"],div[class="footerBox"]{width:1010px !important;}'
						],
		//超宽屏CSS内容
			SWSCSS:[
							'div[class="player"]{width:928px !important;height:562px !important;}',
							'div[class="right"]{margin-top:562px!important;}'
						]
		};

	//初次载入CSS函数
	(function (){
		//读取cookie中的wideScreen的值覆盖掉默认的,如果启用Cookie保存设置的话;
		if(N_yk.EnableCS){
			var cc=getCookie("ykws");
			if (cc!=''){N_yk.wideScreen=cc};
		};
		N_yk.Style = document.createElement('style');
		N_yk.Style.setAttribute('type','text/css');
			switch(N_yk.wideScreen){
			case '0':
				{N_yk.Style.innerHTML=N_yk.NMCSS.join('')+N_yk.bkad};
				break;
			case '1':
				{N_yk.Style.innerHTML=N_yk.SNMCSS.join('')+N_yk.bkad};
				break;
			case '2':
				{N_yk.Style.innerHTML=N_yk.WSCSS.join('')+N_yk.bkad};
				break;
			case '3':
				{N_yk.Style.innerHTML=N_yk.SWSCSS.join('')+N_yk.bkad};
				break;
			case 'cus':
			//从cookie取出自定义的CSS
				{N_yk.Style.innerHTML=getCookie("ykwsc")+N_yk.bkad};
				break;
			default:
			//默认只加载去广告的CSS
				{N_yk.Style.innerHTML=N_yk.bkad};
				break;
			}
	document.getElementsByTagName('head')[0].appendChild(N_yk.Style);
	})();

	//切换CSS函数
	function cssloader(user_css){
	//使用inHTML替换N_yk.Style中的HTML元素,也就是CSS内容
			switch(N_yk.wideScreen){
			case '0':
				{N_yk.Style.innerHTML=N_yk.NMCSS.join('')+N_yk.bkad};
				break;
			case '1':
				{N_yk.Style.innerHTML=N_yk.SNMCSS.join('')+N_yk.bkad};
				break;
			case '2':
				{N_yk.Style.innerHTML=N_yk.WSCSS.join('')+N_yk.bkad};
				break;
			case '3':
				{N_yk.Style.innerHTML=N_yk.SWSCSS.join('')+N_yk.bkad};
				break;
	//自定义选项,如果返回值是无效的.那么保持当前窗口不改变;
			case 'cus':
				if(user_css!=undefined){
					N_yk.Style.innerHTML=user_css+N_yk.bkad;
				};
				break;
			default:
				break;
			}
	};

	//切换开关
	function qhkaiguan(){
	//生成一个select HTML元素
		N_yk.kaiguan=document.createElement('select');
		N_yk.kaiguan.innerHTML='<option value="0">【4:3】</option><option  value="1">【4:3】_B</option><option value="2">【16:9】</option><option value="3">【16:9】_B</option><option value="cus">【自定义】</option>'
	//根据屏幕状态初始化开关的状态
		var options=N_yk.kaiguan.getElementsByTagName('option');
		for (var i=0;i<options.length;i++){
			if (options[i].value==N_yk.wideScreen){
				options[i].setAttribute('selected','selected');
				break;
			};
		};
	//获得插入开关的位置
		var position1 =document.evaluate('//div[@class="guide"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
		var position2 =document.evaluate('//div[@class="videoClass"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
		var position=position1 || position2;
		position.appendChild(N_yk.kaiguan);
		N_yk.kaiguan.setAttribute('style',"margin-left:8px;color:red;display:inline!important;");
		N_yk.kaiguan.addEventListener('change',check,false);
	}
	if (navigator.userAgent.search(/opera/i)>-1){window.addEventListener('DOMContentLoaded',qhkaiguan,false);}else{qhkaiguan();};

	function check(e){
		N_yk.wideScreen=e.target.value;
	//将最后的窗口状态保存到cookie中,如果启用cookie的话.
		if (N_yk.wideScreen!='cus'){setCookie("ykws",N_yk.wideScreen,30,'/','v.youku.com')};
	//收集用户录入的值
		if (N_yk.wideScreen=='cus'){var user_css=customize();};
	//调用cssloader函数重载CSS;
		cssloader(user_css);
	};

	//读取用户输入的值
	function customize(){
		var cm=prompt('自定义屏幕大小:\n请输入宽和高\n格式:800,600(中间请用逗号分隔)','800,600');
	//简单判断一下
		if (cm==null || cm=="" || cm.indexOf(',')==-1){alert('格式无效');return};
	//以逗号为分隔转成数组
		var cm=cm.split(',');
	//取整
		var width=parseInt(cm[0],10);
		var height=parseInt(cm[1],10);
		var ccss='div[class="player"]{width:'+width+'px'+'!important;height:'+height+'px'+'!important;}'
		if(width >=633) {
			ccss+='div[class="right"]{margin-top:'+height+'px'+'!important;}'
		}
	//如果数值有效保存窗口状态到cookie中
	setCookie("ykws",'cus',30,'/','v.youku.com');
	setCookie("ykwsc",ccss,30,'/','v.youku.com');
	return ccss;
	}


	//cookie写和读函数
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
})();


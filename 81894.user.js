// ==UserScript==
// @name Super_preloader
// @author NLF
// @description  预读+翻页..全加速你的浏览体验...#^_^#...(Support Opera 10.1+ ,Fx3.6+(need GreaseMonkey) ,Chrome5.0+)..
// @create 2010-4-30
// @lastmodified 2010-7-20
// @version 1.8.6
// @download  http://bbs.operachina.com/viewtopic.php?f=41&t=74923
// @include http*
// ==/UserScript==

/*
//----thanks for---//
***本JS借鉴 oAutoPagerize(http://ss-o.net/) 从字符串创建成HTML文档对象的方法..感谢.
//----mouse gesture----//
	*Opera 翻页手势命令:	go to page, "javascript:N_PreNextLink();"
	*Firefox 翻页手势脚本(需fireGestures):	content.window.wrappedJSObject.N_PreNextLink();
//----helper----//
	*XHR预读模式:xmlHttpRequest请求源文档然后分析出图片进行预读...
	*XHR翻页模式:xmlHttpRequest请求源文档然后分析出主体内容.拼接到当前页.稳定性很好....
	*iframe预读模式:使用iframe预先载入下一页.
	*iframe翻页模式:使用iframe预先载入下一页,等载入完成后.取出主体内容拼接上来,XHR用不了的话,就试试这个吧..
//---计划----//
	增强调试能力?
	支持javascript链接(虽然还没想好..-_-!!)..
*/



(function(){
	/////////////////////设置(请注意开关的缩进关系..子开关一般在父开关为true的时候才会生效.)//////////////////////
	var prefs={
		loaded:false																				,//在页面完全载入(发生load事件)后加载,否则在DOM加载完成后加载(chrome上此开关无效.)
		Dbottom:false																		,//显示所有预读内容到页面的最下方...(预读模式下)..
		linkalert:false																	,//给预读中的链接加一个外边框..(预读模式下)..
				allalert:true																	,//在所有通往下一页的链接上显示红边框..否则只在找到的那个链接上显示红框;
				alertstyle:['1px','solid','red']							,//边框样式..[粗细,样式,颜色];
		keymatch:true																			,//给没有规则的网站使用..关键字匹配模式寻找下一页(不建议关闭)..
				cases:false																	,//关键字区分大小写....
				prefix:1																			,//允许关键字前的字符..例如 "下一页" 要匹配 "[下一页"     那么prefix要设置为1...
				subfix:3																			,//允许关键字后的字符..例如 "下一页" 要匹配 "下一页 >>"   那么subfix要设置为3...
		floatWindow:true																	,//显示悬浮窗,提供.切换模式..启用禁用功能..非常滴方便(强烈不建议关闭,如果不想看见开关..请使用下面的开关禁用自动显示.);
				FW_autoD:true																	,//自动显示悬浮窗(此开关只在chrome上无效(不知道如何抛出变量到实际页面中)..).....否则通过此命令调用: javascript:N_pre_DFW();
				FW_RAS:true																		,//点击悬浮窗上的保存按钮..立即刷新页面;
				FA:false																			,//默认在无高级规则的网站上开启 强制拼接(翻页)(将下一页的body部分的内容拼接上来.)(因为不需要写规则..所以不够美观.)(不推荐);
		iframeD:false																		,//默认在无高级规则的网站上使用 iframe预读(不推荐);
		pauseA:true																				,//快速停止自动翻页(当前模式为翻页模式的时候生效.)...(opera状态栏会显示结果.);
				Pbutton:[2,0,0]																,//需要按住的键.....0: 不按住任何键;1: shift鍵;2: ctrl鍵; 3: alt鍵;
				mouseA:true																		,//按住鼠标左键..否则.双击;
						Atimeout:200															,//按住左键时..延时.多少生效..(单位:毫秒);
				switchA:true																	,//重复执行操作..在启用/禁用之间切换..
		G_rules:[true,'AutoPagerizeWedataSiteinfo']				,//拼接全局变量里面的高级规则数组..此开关的第2项是这个变量的名..(chrome上无效.)
		Aplus:true																				,//自动翻页模式的时候..提前预读好一页..就是翻完第1页,立马预读第2页,翻完第2页,立马预读第3页..(大幅加快翻页快感-_-!!)
		sepP:true																					,//翻页模式下.分隔符.在使用上滚一页或下滚一页的时候是否保持相对位置..
		noticeMe:false																		,//如果发生异常?的话.那么通知我(通知信息显示在右下角).
		someValue:'Powered by Super_preloader'						,//显示在翻页导航最右边的一个小句子..-_-!!
		DisableI:false																		,//只在顶层窗口加载JS..提升性能.
	};

	var isreturn;
	(function(){
		if(!prefs.DisableI)return;
		//在以下网站上允许在非顶层窗口上加载JS..比如猫扑之类的框架集网页.
		var DIExclude=[
			['猫扑帖子内容页面',true,/http:\/\/dzh\.mop\.com\/topic\/readSub/i],
		];
		if(self!=window.parent){
				isreturn=true;
				var i,
						ii,
						DIExclude_x;
			for(i=0,ii=DIExclude.length;i<ii;i++){
				DIExclude_x=DIExclude[i];
				if(DIExclude_x[1] && DIExclude_x[2].test(location.href)){
					isreturn=false;
					break;
				};
			};
		};
	})();
	if(isreturn)return;


	//分页导航的4个图标:
	var sep_icons={
		top:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAABl0RVh0  U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMnSURBVDiNpZRbaBxlFMd/57tNurpFi22j  lIq4ktCCrXjBdooWUxq1QVEbfSt4e/AhT27UaEFBMFL74pN9KCj6ZFQC1htI9CUBqwjpg9pCjaS0  0mwDCRri7s7OfD7szDKbW7U98DHf5Zzf+c+Zb4547wEIB+1FPJu5GhNmJt6JOgFMa9Oz+YWnXr0q  7nsfv9USZpYefjL59hVB+3e+0rZuA3vvObjj5eVRAoI0ffDgl7tkJV0OFs4dGxm+aQUxAvBgT58G  +GbsizhjreD5Z2u6NNNS2/OSHb2je/dDXaVtQeIbnDn7a+3UmR+/Hj8SPbZWnFrrMBy0Q1s7b9t/  5/Yw+Gn6S05On2BH993Blk237A8H7dAVgcOy7b3u2hsOH9jzZGHy/Lc0fJ0ornFy+nN6dvUV1l9z  /eGwbHv/Fzgs25IxwUj/vmcLU3On+Ls2h9EWFzgW4kucnhun74H+grVuJCzb0n8Ch2VbFMXYwZ6n  i4t+jpm//mhCnSMIHCqAC4u/MJ+co/e+R4uiGAvLtrgmOCxbEcXovnsev3Hjhk6Zmp1EK4NzliBw  JFJFW491it/mvmf9hg65d+feTlGMhmUrqysWhm8v7Qrv6r7fnq78gFEOaxzOORKp09BVjFMYJxin  +Llygm1d211pa/duhOE2VKtXlO0TWzbd+tHzjwytM9oS+5gkafDd1AdELFCpn0U7jzYKUfDwzS+S  JJ4k9lSrNT796sPF2fmZQxNHo88g94OIYuB85fd1rx9/rrnWVN945niH0ZbKPxcQ7dFWoa2glCBa  ePf9N6tx3XekiIIoBoB28PiRaO+SenslithHVJMFnFMoLRirUEZQWojrvmPiaNRW21VvRVudRDFf  vYgIiBKUBmUE4wRZM/KyYKHaWMjvNJPIiiJXB0vTjIgEKYYorgHgPfj0YzXqCT5pxRREJBCRtk5p  MiBg07VJ53jgQNcAyoJO66p0U7VPWs2rCDSASEQa2dzkEugc1ACXXjt2aONl3ng2E5EzD8Tivc8U  56HZM0um0iFpYJKOBhBnKoE6UPfeJ8v6cZpE50YG1alLkoPHObj3Odi/XP8UghnEXlIAAAAASUVO  RK5CYII='
		,end:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjJDOTY2ODNCOTBEQzExREY5MUQ5RDc0N0NDMDFBQjM0IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjJDOTY2ODNDOTBEQzExREY5MUQ5RDc0N0NDMDFBQjM0Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkM5NjY4Mzk5MERDMTFERjkxRDlE  NzQ3Q0MwMUFCMzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkM5NjY4M0E5MERDMTFERjkx  RDlENzQ3Q0MwMUFCMzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz7S7Y7DAAADI0lEQVR42qSUXUgUURTHz52Z3R1lDRfWD7SU  JMIISTCzL4KQHgwMgrI3X+pBCHqJIukhAsleIsiHhKggCEorqCww3LDQNezLAj8qJRIxV8VKbdu5  c2eme+/eccdxNLDDHs7OzDm/e+7/nhkEiw0Jl6krIkriniRyDOqmcMPhlg2xLIsXgyjyC/c5oIp4  ZsMtB5QIIIu6K1o2wAbaUN/Ok8p7GsOwsk1FL5ESx7Xdta44toRcReHTx88BQmxrNMmwuBuERtpX  bnAjnG2uzXJ1au+Ad8dWwcLtHchccAlBR+wyB+oJEzB1PWEAwiocK2uyG5j30llxdUnsFZNgmuCX  gGCTL4LEnnxygBIWGJqXRvZJw65TqTWovuA8YctyygegKkF+353rZCjLATmKqk8w1ZTparDr5CKZ  abk0mp51Nk9ycDpFW9xlP0owbYlmAtFNcXi0WykIMvKBScFIhoSzRjCSHTsWbgpn5pQf2l+brqoB  kGSkWgxM9WU5BqHRQBDy5wMxdN7x+aM3VJnS2fW1R41/xiZHmrwO7/70r1h5JPr4xJ4dlWld47fB  lLSFcWNjliFn0f8IdKJD5PMtUH1B2LquCp5G7yTGpkauMMaSwxPjXT88OhQd+NSPy7KrebdMYxYV  QwXJ8gPGmIIxEBNDcfZ2eDP0Qv843NPNaj2nYmEITDj4qq9zYnYmYW0K7QWdQg0dUagKmoYpWAfD  JFAULoWpmQmro/fBd1azaGw8wMzmaGJl+8uHc5lSAeSnbwaTTmoSirmeOWvWQzoKwb3ITZ7LapbO  MXJ801I2rOu4pu15a7w4tBuCVFusJaEZgRAUhbZAa8f1OCFaDctd8m1cpmPb2md//2iI9LTFKwoP  8LdNQX4oXbsPnnS1xH/OTzewnOWKlX98vRrHJr9u+zD0uqpiQ3VAQgq87e/WRie+PGPPVip0gr9R  z3NNCRs11DfYC7l52fzWu4Eoq6kWXzS3jVMvTIJTZ1lQV1PvvTxiv6R4dUdK5MXnn7LmlsYCTykQ  fRta+y7Cauxw6ZmVNXYnrNYUx5jFrt69kPNfNAQx++9fAQYA1il8yQLLZS0AAAAASUVORK5CYII='
		,up:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkUzRDUyNEQ5OTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkUzRDUyNERBOTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTNENTI0RDc5MEUyMTFERkIyM0VG  NDM2QzAyN0U1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTNENTI0RDg5MEUyMTFERkIy  M0VGNDM2QzAyN0U1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6I8cyJAAAC20lEQVR42tRVW0hUURTd+5xz550PVMwcUksJ  JY2wrMHpoxQzQrFRxF5iGn1EERGEZCBI9OFPUR9ZkNRX0a9fkeBPEhFBP1mDFj0xdVTSqXnce8/p  3Gtjvh+IH53LZu6Bc9dZe+2196AQAtZjEVinxWIv3stsqXM3ATG+16E1iVbBVwUsOC525pI7dfNp  gRApDnxulvvrq5KCoFgoKhLjktsOeWud5d7qhHhX0lnPBaVqVcA6J3Njp9224ZGvtMHhD7yE/vFe  UlN+PM0V52jPr6WFKwbmTJ0ZbsZYt6+k0RkIfYLByX74HvTDYLSP1FQe25KYpTzYtJel25LQ1A+T  ERcFtgenw8U47anaX5+AFh0+BN6AwizAKAX/2HPQ7OPEV+HLzSyGu1YH2JOyFSICQmi6RhYEThkx  g6oO1lXuqctIS0kn74deACOKGZwIQCn62/GnkJaZggdLDpdlVyo3RgdU0yU4x7nTu8EsasQdT36Z  Jz9nt9L3oxcoMqASFOQvF5p0HKDOBbwaeUJ2FBTQosI9ddtPWq4Z30vGuCCwEORiXkbRiZJdR6zv  JFMBXILSKXAkQlWjgmuyFrqA4K/f0PO1E0u9B5w52zaecleQRkZm9wHGWvpoe17oTFWLjVKZtkTQ  JcNu/0NQ9bAIa5M4HBkAq5MKi41gdW6L5A1E6MgnJkbVjse3hz6+Dp379ox3zWuQL8P9tqv3GqbS  YBhua+qUEER6maIajchUZQZRQwyZi4bYeqs59DMobPKI1UrRHZcB5+Wn84FN/WPW04RsNDSl0KSn  VflwWSNNFo8LRF0Thoa2gfucLNvScxdKKkalDdbGnbLluRrhhArCNVUnBNcw3fCv7xVqMc8a40eL  cIxGVHkhrn1s2hWXwdkQybAP6sYNywAvOSv3ba2VM0OTOqswGR4DlUdiXjL4rxB4NvehKx31qf+2  YmZtwXQo4siSMv53f03rBvxHgAEAqLoqsgGSMo4AAAAASUVORK5CYII='
		,down:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkY3M0ZDRTgzOTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkY3M0ZDRTg0OTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjczRkNFODE5MEUyMTFERkI2OUVB  RjVBQjI2NDU3MTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjczRkNFODI5MEUyMTFERkI2  OUVBRjVBQjI2NDU3MTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Q0swTAAAC50lEQVR42tRVXUhUQRQ+M/dnd0sN/1gtAimW  LXsoiAixFyGIHnqNioioh36ghyh6sCAijAgiIoLowSRMBG1b1n5s0XxRtiyRlIpQ1M1sKxV1XffH  e2emM+u6qG11EXzoXM6de2fOfPeb8x3OJUIIWAmjsEKmzj+UndeWrv0kAgoJWTglT0cW0vqB96L5  144bxu/Ac5sWWeHpQxfT0xq1QbY9D1SqgUJVHHWovHfE+U/GU5Mc1uQoi1cFgYbua8mPErxK8reC  Q8sGm+qACtdh6zmejnLEEGlXCC4TTAiGSeiYEVm+eGMRDhxBpes2DVQbFWQuihtsdu4gFiopY1WM  T0tgEKqmCFUnVEuCCypTwgWXdwTnloH96CylIsdtcUUloNspqDpFdAoaXhKQcYZBAqhK4ql4sVT9  tHjhINzZsN3uPnngjDMnJ18jinAQEFy3KXIQzBBE023ImOEbJ5L51eM1dooVwpgB971V8YyMgy/M  5wMfYlcantaNJ8yI8H+7LXzDVRSrSlAFiKJRITVk3ERQA9r6auF10AfRRBjqW+7Ghsf6KzMCm9yU  Q3Xf5+8PWtpfzVSsPyayVq8CioSRFGiaTpAruplMBc7CZmcZtL57kvgY7KzFvbcyAquKKoLeJPil  zq439e97etiOwv1coURWnqAE0ZOgBkjw0qJy6O17awR6/YHiQXZq7ZCRWTyptOpUIBQQtN9nnH3Z  +swfGhoVW3L3yBQTygmeykj6JmQaGh3hzYH6oBY196VE/2NV8FQj4IkoxIY64ISnyfNJjeVyd94u  MBkDw5yFjQXbQMwq4G17OGlSVoHxESt1LBaMIxODxtFGX91AsV7K12W5oTjbBQWOEvC0Vs+Yprkb  Y74ut212RcLRC43Nj0Ku3HLuLtgJnpaaaCw+fRDXui21zb+YdyoyXtrc/vgcdg3bRHjsMurZZLkf  L7XQXgahdOrhevnoFxeWxxTKcNNKEyL/3a9pxYB/CTAALMFZuEnI1jsAAAAASUVORK5CYII='
	};
	//////////////////////////---------------规则-------////////////////

	//高级规则的一些默认设置..如果你不知道是什么..请务必不要修改它.此修改会影响到所有高级规则...
	var SITEINFO_D={
		enable:true						,//启用(此项务必不要设置成false..否则所有的高级规则都要失效..)
		useiframe:false			,//(预读)是否使用iframe..
		autopager:{
			enable:true						,//启用自动翻页...
			useiframe:false			,//(翻页)是否使用iframe..
			remain:1							,//剩余页面的高度..是显示高度的 remain 倍开始翻页..
			maxpage:99						,//最多翻多少页..
			separator:true				//显示翻页导航..(推荐显示.)
		}
	};

	//高优先级规则,google图片那个是教程.
	var SITEINFO=[
		{siteName:'google图片'																																,//站点名字...
			enable:true																																					,//启用.(总开关)..
			url:/^https?:\/\/\w{3,7}\.google(?:\.\w{1,4}){1,2}\/images/i										,//站点正则...
			siteExample:'http://images.google.com'																							,//站点实例....
			useiframe:false																																		,//是否用iframe预读...
			nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]'						,//下一页链接 xpath..或者..函数返回一个可用链接..
			autopager:{
				enable:true																	,//启用(自动翻页);
				useiframe:true															,//使用iframe翻页
				pageElement:'//div[@id="res"]/div'					,//主体内容xpath;
				remain:1.1																	,//剩余页面的高度..是显示高度的 remain 倍开始翻页;
				maxpage:99																	,//最多翻页数量;
				separator:true															,//是否显示翻页导航;
				replaceE:'//div[@id="navcnt"]'							,//需要替换的部分..一般是翻页导航(可选);
				HT_insert:['//div[@id="res"]',2]						//插入方式此项为一个数组: [节点xpath,插入方式(1：插入到给定节点之前;2：附加到给定节点的里面)](可选);
			}
		},
		{siteName:'google搜索',
			url:/^https?:\/\/\w{3,10}\.google(?:\.\w{1,4}){1,2}\/search/i,
			siteExample:'http://www.google.com',
			nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',
			autopager:{
				pageElement:'//div[@id="ires"]',
				remain:1/3,
				replaceE:'//div[@id="navcnt"]',
				HT_insert:['//div[@id="res"]',2]
			}
		},
		{siteName:'百度搜索',
			url:/^https?:\/\/www\.baidu\.com\/(?:s|baidu)\?/i,
			siteExample:'http://www.baidu.com',
			nextLink:'//div[@class="p"]/a[font[text()="下一页"]]',
			autopager:{
				pageElement:'//div[@id="wrapper"]/table[@id] | //div[@id="wrapper"]/table[@id]/following-sibling::br[1] | //div[@class="p"]',
				remain:1/3,
				HT_insert:['//div[@id="wrapper"]/table[last()]',1]
			}
		},
		{siteName:'百度图片',
			url:/^http:\/\/image\.baidu\.com\/i/i,
			siteExample:'http://image.baidu.com/i',
			nextLink:'//a[@id="next_page"] | //div[@id="pgw" and @class="pg"]/a[(font/text()="下一页")]',
			autopager:{
				enable:false,
				pageElement:'//div[@id="imgid"]',
			}
		},
		{siteName:'百度贴吧帖子列表页面',
			url:/^http:\/\/tieba\.baidu\.com\/f\?.*kw=/i,
			siteExample:'http://tieba.baidu.com/f?kw=opera&fr=tb0_search&ie=utf-8',
			nextLink:'//div[@id="pagebar"]/div[@class="pagination"]/a[text()="下一页"]',
			autopager:{
				pageElement:'//div[@id="thread_list"] | //div[@id="thread_list_foot"] | //div[@id="pagebar"]',
			}
		},
		{siteName:'百度贴吧俱乐部帖子列表内容页面',
			url:/^http:\/\/tieba\.baidu\.com\/club\/.+\/p\/.+/i,
			siteExample:'http://tieba.baidu.com/club/6883547/p/4047809',
			nextLink:'//div[@class="pagination"]/a[text()="下一页"]',
			autopager:{
				pageElement:'//div[@id="content"]',
			}
		},
		{siteName:'百度贴吧俱乐部帖子列表页面',
			url:/^http:\/\/tieba\.baidu\.com\/club\/.+(?!\/p\/)/i,
			siteExample:'http://tieba.baidu.com/club/6883547',
			nextLink:'//div[@class="pagination"]/a[text()="下一页"]',
			autopager:{
				pageElement:'//table[@id="thread_table"]',
			}
		},
		{siteName:'百度贴吧帖子内容页面',
			url:/^http:\/\/tieba\.baidu\.com\/f\?kz=\d+/i,
			siteExample:'http://tieba.baidu.com/f?kz=620671135',
			nextLink:'//li[@class="pagination"]/a[text()="下一页"]',
			autopager:{
				pageElement:'//div[@id="content"]',
			}
		},
		{siteName:'万卷书库小说阅读页',
			url:/^http:\/\/www\.wanjuan\.net\/article\/.+html/i,
			useiframe:true,
			nextLink:'//div[@id="gotopage"]/descendant::a[text()="下一页"]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="contentleft"]'
			}
		},
		{siteName:'万卷书屋小说阅读页',
			url:/^http:\/\/www\.wjxsw\.com\/html\/.+html/i,
			useiframe:true,
			nextLink:'//div[@id="LinkMenu"]/descendant::a[last()]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="TextTitle"] | //div[@id="BookText"]'
			}
		},
		{siteName:'起点小说阅读页',
			url:/^http:\/\/www\.qidian\.com\/BookReader\/\d+,\d+/i,
			siteExample:'http://www.qidian.com/BookReader/1545376,27301383.aspx',
			useiframe:true,
			nextLink:'//a[@id="NextLink"]',
			autopager:{
				enable:false,
				useiframe:true,
				pageElement:'//div[@id="maincontent"]/div[@class="booktitle"] | //div[@id="maincontent"]/div[@id="content"]'
			}
		},
		{siteName:'冰地小说阅读页',
			url:/^http:\/\/www\.bingdi\.com\/html\/book\/.+/i,
			siteExample:'http://www.bingdi.com/html/book/130/153935/4201826.shtm',
			useiframe:true,
			nextLink:'//div[@id="LinkMenu"]/descendant::a[last()][text()="翻下页"]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="Content"]'
			}
		},
		{siteName:'opera官方网站帖子列表页面',
			url:/^http:\/\/bbs\.operachina\.com\/viewforum/i,
			siteExample:'http://bbs.operachina.com/viewforum.php?f=41',
			nextLink:'//div[@class="pagination"]/descendant::a[text()="下一页"]',
			autopager:{
				pageElement:'//table[@class="ttopiclist"]',
				replaceE:'//div[@class="pagination"]'
			}
		},
		{siteName:'opera官方网站帖子内容页面',
			url:/^http:\/\/bbs\.operachina\.com\/viewtopic/i,
			siteExample:'http://bbs.operachina.com/viewtopic',
			nextLink:'//div[@id="paginationbottom"]/descendant::a[last()][text()="下一页"]',
			autopager:{
				pageElement:'//div[@id="page-body"]/div[starts-with(@class,"post")]',
				remain:1/2,
				replaceE:'//div[@id="paginationbottom"]'
			}
		},
		{siteName:'opera官方网站查看新帖帖子列表页面',
			url:/^http:\/\/bbs\.operachina\.com\/search/i,
			siteExample:'http://bbs.operachina.com/search.php?search_id=newposts',
			nextLink:'//p[contains(@class,"pagination")]/descendant::a[text()="下一页"]',
			autopager:{
				pageElement:'//table[@class="ttopiclist"]',
				replaceE:'//p[contains(@class,"pagination")]'
			}
		},
		{siteName:'深度论坛帖子内容页面',
			url:/http:\/\/bbs\.deepin\.org\/thread/i,
			siteExample:'http://bbs.deepin.org/thread',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'卡饭论坛帖子内容页面',
			url:/http:\/\/bbs\.kafan\.cn\/thread/i,
			siteExample:'http://bbs.kafan.cn/thread',
			nextLink:'//div[@class="pg"]/descendant::a[@class="nxt"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'卡饭论坛帖子列表页面',
			url:/http:\/\/bbs\.kafan\.cn\/forum/i,
			siteExample:'http://bbs.kafan.cn/forum-74-1.html',
			nextLink:'//div[@class="pg"]/descendant::a[@class="nxt"]',
			autopager:{
				pageElement:'//form[@id="moderate"]'
			}
		},
		{siteName:'远景论坛帖子内容页面',
			url:/http:\/\/bbs\.pcbeta\.com\/thread/i,
			siteExample:'http://bbs.pcbeta.com/thread',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'思源论坛帖子内容页面',
			url:/missyuan\.com\/thread-\d+-\d+-\d+\.htm/i,
			siteExample:'http://www.missyuan.com/thread-431242-1-1.html',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//form[@name="modactions"]'
			}
		},
		{siteName:'极点五笔帖子内容页面',
			url:/www\.wbfans\.com\/bbs\/viewthread\.php/i,
			siteExample:'http://www.wbfans.com/bbs/viewthread.php?tid=49308&extra=page%3D1',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]',
				remain:1/2
			}
		},
		{siteName:'天极动漫频道新闻',
			url:/http:\/\/comic\.yesky\.com\/\d+\/.+\.shtml/i,
			siteExample:'http://comic.yesky.com/249/11335749_5.shtml',
			nextLink:'//div[@id="numpage"]/descendant::a[contains(text(),"下一页")]',
			autopager:{
				pageElement:'//div[@class="ArticleCnt"]',
				remain:1.4,
				replaceE:'//div[@id="numpage"]',
			}
		},
		{siteName:'赢政天下论坛帖子内容页面',
			url:/http:\/\/bbs\.winzheng\.com\/viewthread/i,
			siteExample:'http://bbs.winzheng.com/viewthread.php?tid=',
			nextLink:'//div[@class="forumcontrol"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'soso网页搜索',
			url:/http:\/\/www\.soso\.com\/q/i,
			siteExample:'http://www.soso.com/q',
			nextLink:'//div[@id="page"]/descendant::a[last()][@class="next"]',
			autopager:{
				pageElement:'//div[@id="s_main"]/table[1]',
				remain:1/2,
				replaceE:'//div[@id="page"]',
			}
		},
		{siteName:'bing网页搜索',
			url:/bing\.com\/search\?q=/i,
			siteExample:'bing.com/search?q=',
			nextLink:'//div[@id="results_container"]/descendant::a[last()][@class="sb_pagN"]',
			autopager:{
				pageElement:'//div[@id="results"] | //div[@id="results_container"]/div[@class="sb_pag"]',
				remain:1/3,
			}
		},
		{siteName:'有道网页搜索',
			url:/http:\/\/www\.youdao\.com\/search\?/i,
			siteExample:'http://www.youdao.com/search?',
			useiframe:true,
			nextLink:'//div[@id="pagination"]/descendant::a[last()][@class="next-page"]',
			autopager:{
				pageElement:'//ul[@id="results"] | //div[@id="pagination"]',
				HT_insert:['//form[@id="bs"]',1]
			}
		},
		{siteName:'爱漫画',
			url:/^http:\/\/www\.imanhua\.com\/comic\/.+/i,
			siteExample:'http://www.imanhua.com/comic/55/list_39448.html',
			useiframe:true,
			nextLink:function(D,W){
				D=D || document;
				W=W || window;
				var s2=D.getElementById('s2');
				if(s2){
					var s2os=s2.options
					var s2osl=s2os.length;
					//alert(s2.selectedIndex);
					if(s2.selectedIndex==s2osl-1)return;
				};
				var url=W.location.href.replace(/#.*$/i,'');
				return url.replace(/(.*html)(.*)/i,function(a,b,c){
					if(!c){
						return b+'?p=2';
					}else{
						return (b+ c.replace(/(.*)(\d+)/i,function(a,b,c){return b+(Number(c)+1)}));
					}
				})
			},
			autopager:{
				useiframe:true,
				pageElement:'//body/table[@class="tbCenter"][1]',
				remain:1/2
			}
		},
		{siteName:'煎蛋首页',
			url:/http:\/\/jandan\.net\/(?:page)?/i,
			siteExample:'http://jandan.net/',
			useiframe:true,
			nextLink:'//div[@class="wp-pagenavi"]/child::a[text()=">>"]',
			autopager:{
				pageElement:'//div[@id="body"]'
			}
		},
		{siteName:'中国教程网论坛帖子内容页面',
			url:/http:\/\/bbs\.jcwcn\.com\/thread/i,
			siteExample:'http://bbs.jcwcn.com/thread',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'kuku动漫',
			url:/http:\/\/comic\.kukudm\.com\/comiclist\/\d+\/\d+.*\.htm/i,
			siteExample:'http://comic.kukudm.com/comiclist/4/17099/3.htm',
			useiframe:true,
			nextLink:'//a[img[contains(@src,"images/d.gif")]]',
			autopager:{
				useiframe:true,
				pageElement:'//body/table[2]'
			}
		},
		{siteName:'EZ游戏社区帖子内容页面',
			url:/http:\/\/bbs\.emu-zone\.org\/newbbs\/thread/i,
			siteExample:'http://bbs.emu-zone.org/newbbs/thread',
			nextLink:'//div[@class="p_bar"]/a[contains(text(),"››")]',
			autopager:{
				pageElement:'//form[@name="delpost"]'
			}
		},
		{siteName:'mozest社区帖子内容页面',
			url:/^http:\/\/board\.mozest\.com\/thread/i,
			siteExample:'http://board.mozest.com/thread-34726-1-1',
			nextLink:'//div[@class="pages"]/a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'海贼王中文网漫画页',
			url:/http:\/\/op\.52pk\.com\/manhua\/\d+\/\d+/i,
			siteExample:'http://op.52pk.com/manhua/2010/921364.html',
			nextLink:'//li[@id="page__next"]/a[1]',
			autopager:{
				pageElement:'//div[@id="pictureContent"]'
			}
		},
		{siteName:'死神中文网漫画页',
			url:/http:\/\/sishen\.52pk\.com\/manhua\/\d+\/\d+/i,
			siteExample:'http://sishen.52pk.com/manhua/2010/927406.html',
			nextLink:'//li[@id="page__next"]/a[1]',
			autopager:{
				pageElement:'//div[@id="pictureContent"]'
			}
		},
		{siteName:'火影中文网漫画页',
			url:/http:\/\/narutocn\.52pk\.com\/manhua\/\d+\/\d+/i,
			siteExample:'http://narutocn.52pk.com/manhua/2010/921439.html',
			nextLink:'//li[@id="page__next"]/a[1]',
			autopager:{
				pageElement:'//div[@id="pictureContent"]'
			}
		},
		{siteName:'塞班智能手机论坛帖子列表页面',
			url:/http:\/\/bbs\.dospy\.com\/forum/i,
			siteExample:'http://bbs.dospy.com/forum-354-1.html',
			nextLink:'//div[@class="p_bar"]/a[@class="p_curpage"]/following-sibling::a[@class="p_num"]',
			autopager:{
				pageElement:'//form[@name="moderate"]'
			}
		},
		{siteName:'塞班智能手机论坛帖子内容页面',
			url:/http:\/\/bbs\.dospy\.com\/thread/i,
			siteExample:'http://bbs.dospy.com/thread-672836-1-52-1.html',
			nextLink:'//div[@class="p_bar"]/a[@class="p_curpage"]/following-sibling::a[@class="p_num"]',
			autopager:{
				pageElement:'//form[@name="delpost"]'
			}
		},
		{siteName:'新华网新闻页面',
			url:/http:\/\/news\.xinhuanet\.com\/.+\/\d+-/i,
			siteExample:'http://news.xinhuanet.com/politics/2010-07/19/c_12347755.htm',
			nextLink:'//div[@id="div_currpage"]/a[text()="下一页"]',
			autopager:{
				remain:2,
				pageElement:'//table[@id="myTable"]'
			}
		},
		{siteName:'中关村在线新闻页面',
			url:/http:\/\/(?:[^\.]+\.)?zol.com.cn\/\d+\/\d+/i,
			siteExample:'http://lcd.zol.com.cn/187/1875145.html',
			nextLink:'//a[text()="下一页>"][@href]',
			autopager:{
				remain:2,
				pageElement:'//div[@id="cotent_idd"]'
			}
		},
		{siteName:'天涯论坛帖子内容页面',
			url:/http:\/\/www\.tianya\.cn\/.+\/content\/.+/i,
			siteExample:'http://www.tianya.cn/publicforum/content/2010expo/4eddfdeea800b3957fd4781ff6004bc3/1/0/1.shtml',
			nextLink:'//*[@id="pageDivTop" or @class="pages"]/descendant::a[text()="下一页"][@href]',
			autopager:{
				pageElement:'//div[@id="pContentDiv"]'
			}
		},
	];

	//兼容 oautopager的规则放在这里.
	var SITEINFO2=[
	];

	//统配规则;为什么分开写??因为这样启用.禁用比较方便..可控制性好..
	var TPrules=[
		['Discuz论坛帖子列表页面',true,/^https?:\/\/[^\/]+\/(?:(?:forum)|(?:showforum)|(?:viewforum))/i,'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"]'],
		['Discuz论坛帖子内容页面',true,/^https?:\/\/[^\/]+\/(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))/i,'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"]'],
		['phpWind论坛帖子列表页面',true,/^https?:\/\/[^\/]+\/(?:bbs\/)?thread/i,'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]'],
		['phpWind论坛帖子内容页面',true,/^https?:\/\/[^\/]+\/(?:bbs\/)?read/i,'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]'],
	];

	//黑名单,在此网页上禁止加载..3个项.分别是:名字,启用,网站正则..
	var blackList=[
		['Gmail',true,/mail\.google\.com/i],
		['Google reader',true,/www\.google\.com\/reader\//i],
		['优酷视频播放页面',true,/http:\/\/v\.youku\.com\/v_show\//i],
	];

	//在以下网站用iframe预读..和上面一样的规则..也可以使用@exclude排除
	var UseIframe=[
	];

	//强制拼接的一些默认设置...如果你不知道是什么..请务必不要修改它..
	var SITEINFO_F_D={
		remain:1					,//剩余页面的高度..是显示高度的 remain 倍开始翻页..
		maxpage:99				,//最多翻多少页..
		separator:true		,//显示翻页导航..
	};

	//下一页关键字,允许部分容差..例如 '下一页' 可以匹配 '下一页>' '下一页>>' '下一页 >>'等..字符串长度容差为3(默认) 
	var nextPageKey=[
			'下一页',
			'下一頁',
			'下页',
			'下頁',
			'翻页',
			'翻頁',
			'翻下頁',
			'翻下页',
			'下一张',
			'下一張',
			'下一幅',
			'下一章',
			'下一节',
			'下一節',
			'下一篇',
			'后一页',
			'後一頁',
			'前进',
			'下篇',
			'后页',
			'往后',
			'Next',
			'Next Page',
			'次へ'
	];

//////////////////////////-------------规则结束-------////////////////
	//获取所有元素
	function matchNodes(xpath,doc){
		doc=doc||document;
		return doc.evaluate(xpath,doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	};

	//获取第一个元素
	function matchSingleNode(xpath,doc){
		doc=doc||document;
		return doc.evaluate(xpath,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	};

	//写cookie
	function setCookie(c_name,c_value,keepday,c_path,c_domain,c_secure){
		var scookie=c_name+'='+c_value;
		if (keepday){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+Number(keepday));
			scookie+=';expires='+exdate.toGMTString();
		};
		if (c_path){
			scookie+=';path='+c_path;
		};
		if (c_domain){
			scookie+=';domain='+c_domain;
		};
		if (c_secure){
			scookie+=';secure='+c_secure;
		};
		//alert(scookie);
		document.cookie=scookie;
	};

	//取cookie
	function getCookie(c_name){
		var sre="(?:;)?"+c_name+"=([^;]*);?"
		var ore=new RegExp(sre);
		if(ore.test(document.cookie)){
			return RegExp['$1'];
		}else{
			return '';
		};
	};

	//获取下一页链接.
	function getNextLink(getlink,D,W){
		return (typeof getlink=='string')? matchSingleNode(getlink,D) : getlink(D,W);
	};

	//移除事件监听.卸载翻页.
	function removeJT(){
		A_pause_remove=true;
		window.removeEventListener('scroll',autoPG,false);
	};

	//显示预读的内容在下方..
	function display_bottom(){
		var div=document.createElement('div'),
					span=document.createElement('span'),
					hr=document.createElement('hr');
		div.style.cssText='\
			margin:3px!important;\
			padding:5px!important;\
			border-radius:8px!important;\
			-moz-border-radius:8px!important;\
			border-bottom:1px solid #E30005!important;\
			border-top:1px solid #E30005!important;\
			background-color:#F5F5F5!important;\
			float:none!important;\
		';
		div.title='预读的内容';
		span.style.cssText='\
			text-align:left!important;\
			color:red!important;\
			font-size:13px!important;\
		';
		hr.style.cssText='\
			display:block!important;\
			border:1px inset #000!important;\
		';
		div.appendChild(span);
		div.appendChild(hr);
		return {
			div:div,
			span:span
		};
	};

	//将字符串转成HTML文档对象..
	function String_to_doc(str){//来自oAutoPagerize;
		if(document.documentElement.nodeName.toLowerCase()!='html'){
			return new DOMParser().parseFromString(str, 'application/xhtml+xml');
		};
		var source=String(str);// Thx! jAutoPagerize#HTMLResource.createDocumentFromString http://svn.coderepos.org/share/lang/javascript/userscripts/jautopagerize.user.js
		//source = source.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>|<\/?(?:i?frame|html|script|object)(?:[ \t\r\n][^<>]*)?>/gi, ' ');

		var doc;
		if(document.implementation.createHTMLDocument){//for chrome,opera
			doc=document.implementation.createHTMLDocument('super_preloader');
		}else{
			try{
				doc=document.cloneNode(false);//for firefox;
			}catch(e){};
			if(doc){
				doc.appendChild(doc.importNode(document.documentElement, false));
				doc.documentElement.appendChild(doc.createElement('head'));
				doc.documentElement.appendChild(doc.createElement('body'));
			};
		};

	/*
		//创建XML文档.
		doc=document.implementation.createDocument(null, 'title', null);
	*/

		var range=document.createRange();
		range.selectNodeContents(document.documentElement);
		var fragment = range.createContextualFragment(source);

		var headChildNames = {
			title: true,
			meta: true,
			link: true,
			script: true,
			style: true,
			base: true
		};

		var head = doc.getElementsByTagName('head')[0],
					body = doc.getElementsByTagName('body')[0],
					child;
		while ((child = fragment.firstChild)){
			if(
					(child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) ||
					(child.nodeType === doc.TEXT_NODE &&/\S/.test(child.nodeValue))
				){
				break;
			};
			head.appendChild(child);
		};
		
		if(window.opera){
			body.parentNode.replaceChild(fragment,body);
		}else{
			body.appendChild(fragment);
		};
		//doc.documentElement.appendChild(head);
		//doc.documentElement.appendChild(body);
		//alert(source);
		//alert(doc.documentElement.outerHTML);
		return doc;
	};

	//XHR请求..
	var g_htmldoc,
				g_htmlwin;
	function XHR_loaded(){
		if(this.readyState==4){
			var str=this.responseText;
			//alert(str);
			if(autopager_mode){
				g_htmldoc=String_to_doc(str);
				requesting=false;
				StartAutoPG();
			}else{
				var images=str.replace(/\n/ig,'').match(/<\s*img.*?src\s*=\s*"[^"]*"/ig);
				if(!images)return;
				var i,
							ii,
							src,
							j,
							img,
							dimages=[],
							isexist,
							d_div,
							div,
							span;
				for(i=0,ii=images.length;i<ii;i++){
					src=images[i].match(/src\s*=\s*"([^"]*)"/i)[1];
					//跳过src一样的图片...
					for(j=0;j<dimages.length;j++){
						if(src==dimages[j])isexist=true;
					};
					if(isexist){
						isexist=false;
						continue;
					};
					img=new Image();
					img.src=src;
					dimages.push(src);
					if(prefs.Dbottom){
						if(!d_div){
							d_div=display_bottom();
							div=d_div.div;
							span=d_div.span;
							document.body.appendChild(div);
						};
						div.appendChild(img);
					};
				};
				if(span){span.innerHTML='预读取图片张数: '+'<b>' +dimages.length+ '</b>'+'<br />'+'预读网址: '+'<b>'+nextlink +'</b>';}
			};
		};
	};
	function xhttpRequest(){
		requesting=true;
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=XHR_loaded;
		xhr.open("GET",nextlink,true);
		xhr.overrideMimeType('text/html; charset=' + document.characterSet);
		//hr.setRequestHeader("Content-Type", "text/html;charset="+document.characterSet);
		xhr.send(null);
	};

	//Iframe请求..
	function iframeloaded(){
		if(!this.contentDocument.body.firstChild)return;
		g_htmldoc=this.contentDocument;
		g_htmlwin=this.contentWindow;
		requesting=false;
		StartAutoPG();
	};
	function iframeRequest(){
		requesting=true;
		var old_preiframe=document.getElementById('NN_preiframe');
		if(old_preiframe){
			old_preiframe.parentNode.removeChild(old_preiframe);
		};
		var N_preiframe=document.createElement('iframe');
		N_preiframe.name='N_preiframe';
		N_preiframe.id='NN_preiframe';
		N_preiframe.width='100%';
		N_preiframe.frameBorder="0";
		if(autopager_mode){
			N_preiframe.height=0;
			N_preiframe.style.cssText='\
				margin:0!important;\
				padding:0!important;\
				height:0!important;\
				display:hidden!important;\
			';
			N_preiframe.addEventListener('load',iframeloaded,false);
			document.body.appendChild(N_preiframe);
		}else{
			if(prefs.Dbottom){
				var d_div=display_bottom(),
							div=d_div.div,
							span=d_div.span;
				span.innerHTML='iframe全预读: '+'<br />'+'预读网址: '+'<b>'+nextlink+'</b>';
				N_preiframe.height='300px';
				div.appendChild(N_preiframe);
				document.body.appendChild(div);
			}else{
				N_preiframe.style.cssText='\
					display:none!important;\
				';
				document.body.appendChild(N_preiframe);
			};
		};
		//修复FX上某些页面.变了.src..但是内容不变的问题..
		setTimeout(function(){N_preiframe.src=nextlink},0);
	};

	//创建分割导航.
	function P_to_up_down(e){
		var target=e.target;
		var number=target.getAttribute('Super_preloader');
		//获取要跳转到的那个导航..
		var updiv=document.getElementById('sepdiv'+number);
		if(!updiv)return;
		var o_scrollY=window.scrollY;
		var scrollY=updiv.getBoundingClientRect().top+o_scrollY;
		if(prefs.sepP){
			var thisY=target.parentNode.getBoundingClientRect().top+o_scrollY;
			scrollY=target.className=='S_go_up'? (o_scrollY-(thisY-scrollY)) : (o_scrollY+(scrollY-thisY));
		}else{
			scrollY-=6;
		};
		scroll(0,scrollY);
	};
	function P_to_top_end(e){
		var scrollY=e.target.className=='S_go_top'? 0 : document.body.offsetHeight;
		scroll(0,scrollY);
	};
	function P_sep(){
		var sepdiv=document.createElement('div');
		if(a_separator){
			sepdiv.style.cssText='\
				opacity:1!important;\
				position:relative!important;\
				float:none!important;\
				top:0!important;\
				left:0!important;\
				width:auto!important;\
				text-align:center!important;\
				font-size:14px!important;\
				display:block!important;\
				padding:3px 0!important;\
				margin:5px 10px!important;\
				clear:both!important;\
				border-top:1px solid #ccc;\
				border-bottom:1px solid #ccc;\
				border-radius:30px!important;\
				-moz-border-radius:30px!important;\
				background-color:#F5F5F5!important;\
			';
			sepdiv.id='sepdiv'+a_pged;
			var a,
						img_top,
						img_end,
						img_up,
						img_down,
						img_css='\
							vertical-align:middle!important;\
							cursor:pointer!important;\
							padding:0 3px!important;\
							border:none!important;\
							display:inline!important;\
							float:none!important;\
							position:static!important;\
						',
						span_info;
			a=document.createElement('a');
			a.href=a.title=nextlink;
			a.innerHTML='Super_preloader: 第 <b><span style="color:red!important;">'+a_pged+'</span></b> 页';
			a.style.cssText='\
				vertical-align:middle!important;\
				margin:0 20px!important;\
			';
			img_top=new Image();
			img_top.style.cssText=img_css;
			img_top.src=sep_icons.top;
			img_top.className='S_go_top';
			img_top.title='去到顶部';
			img_top.addEventListener('click',P_to_top_end,false);

			img_end=new Image();
			img_end.style.cssText=img_css;
			img_end.src=sep_icons.end;
			img_end.className='S_go_end';
			img_end.title='去到底部';
			img_end.addEventListener('click',P_to_top_end,false);

			if(a_pged!=1){
				img_up=new Image();
				img_up.style.cssText=img_css;
				img_up.src=sep_icons.up;
				img_up.title='上滚一页';
				img_up.className='S_go_up';
				img_up.setAttribute('Super_preloader',a_pged-1);
				img_up.addEventListener('click',P_to_up_down,false);
			};

			img_down=new Image();
			img_down.style.cssText=img_css;
			img_down.id='S_img_down'+a_pged;
			img_down.className='S_go_down';
			img_down.src=sep_icons.down;
			img_down.title='下滚一页';
			img_down.setAttribute('Super_preloader',a_pged+1);
			img_down.style.setProperty('display','none','important');
			img_down.addEventListener('click',P_to_up_down,false);

			span_info=document.createElement('span');
			span_info.textContent=prefs.someValue;
			span_info.style.cssText='\
				position:absolute!important;\
				right:16px!important;\
				bottom:1px!important;\
				font-size:10px!important;\
				text-shadow:0 1px 1px white!important;\
				color:#5A5A5A!important;\
				font-style:italic!important;\
			';
			sepdiv.appendChild(img_top);
			if(img_up)sepdiv.appendChild(img_up);
			sepdiv.appendChild(a);
			sepdiv.appendChild(img_down);
			sepdiv.appendChild(img_end);
			sepdiv.appendChild(span_info);
		}else{
			sepdiv.style.cssText='\
				height:0!important;\
				width:0!important;\
				padding:0!important;\
				margin:0!important;\
				display:block!important;\
				clear:both!important;\
			';
		};
		return sepdiv
	};

	//将内容插入到网页.
	var a_insertP,
				a_pged=1;
	var Sdoc,
				Swin;
	function insertContent(doc,win){
		if(A_pause){
			Sdoc=doc;
			Swin=win;
			working=false;
			return;
		};
		Sdoc=Swin=null;

		var ahref=getNextLink(a_linkx,doc,win||doc);

		//修复chrome a元素取不到href的bug?;
		if(window.chrome && ahref.tagName){
			ahref=doc.importNode(ahref,true);
			ahref.style.cssText='\
				display:none!important;\
			';
			ahref.id='chrome_get_ahref';
			document.body.appendChild(ahref);
			ahref=ahref.href;
			document.body.removeChild(document.getElementById('chrome_get_ahref'));
		};

		var sepdiv=P_sep(),
					fragment=document.createDocumentFragment();
		fragment.appendChild(sepdiv);
		var content=matchNodes(a_pageElement,doc),
					i,
					contentL=content.snapshotLength,
					Xcontent,
					scipts,
					j,
					jj;
		if(contentL!=0){
			for(i=0;i<contentL;i++){
				Xcontent=content.snapshotItem(i);
				Xcontent=doc.importNode(Xcontent,true);
				if(Xcontent.tagName.toLowerCase()=='script'){
					//alert(Xcontent.outerHTML);
					Xcontent.removeAttribute('src');
					Xcontent.textContent='';
				};
				scipts=Xcontent.getElementsByTagName('script');
				for(j=0,jj=scipts.length;j<jj;j++){
					scipts[0].parentNode.removeChild(scipts[0]);
				};
				/*
				if(prefs.transition){
					Xcontent.style.cssText+='\
						;opacity:0.1!important;\
						position:relative!important;\
						top:30px!important;\
						-o-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;\
						-moz-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;\
						-webkit-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;\
					';
					setTimeout((function(XC){
						return function(){
							XC.style.setProperty('opacity','1','important');
							XC.style.setProperty('top','0','important');
						};
					})(Xcontent),0);
				};
				*/
				fragment.appendChild(Xcontent);
			};
		}else{
			if(prefs.noticeMe)notice('.没有找到被拼接的主要内容.翻页无法继续.',3000);
			removeJT();
			return;
		};

		if(!a_insertP){
			if(a_Iposition){
				a_insertP=matchSingleNode(a_Iposition);
			}else{
				var ocontent=matchNodes(a_pageElement);
				ocontent=ocontent.snapshotItem(ocontent.snapshotLength-1);
				a_insertP=ocontent.nextSibling? ocontent.nextSibling : ocontent.parentNode.appendChild(document.createTextNode(' '));
			};
			if(!a_insertP){
				if(prefs.noticeMe)notice('.没有找到插入的位置.翻页无法继续.',3000);
				removeJT();
				return;
			};
		};

		if(a_IMethod==2){
			a_insertP.parentNode.appendChild(fragment);
		}else{
			a_insertP.parentNode.insertBefore(fragment,a_insertP);
		};

		if(a_replaceE){
			var oldnav=matchNodes(a_replaceE);
			//alert(oldnav.snapshotLength);
			if(oldnav.snapshotLength===1){
				oldnav=oldnav.snapshotItem(0);
				var newnav=matchSingleNode(a_replaceE,doc);
				if(newnav){
					newnav=doc.importNode(newnav,true);
					oldnav.parentNode.replaceChild(newnav,oldnav);
				};
			};
		};

		var pre_img_down=document.getElementById('S_img_down'+(a_pged-1));
		if(pre_img_down)pre_img_down.style.setProperty('display','inline','important');

		if(ahref && ahref!=nextlink){
			nextlink=String(ahref);
			if(a_pged>=a_maxpage){
				if(prefs.noticeMe)notice('达到最大的翻页数量,翻页停止.',3000);
				removeJT();
				return;
			};
			a_pged+=1;
			g_htmldoc=g_htmlwin=null;
			if(prefs.Aplus){
				a_iframepre? iframeRequest() : xhttpRequest();
			};
		}else{
			nextlink=null;
			if(prefs.noticeMe)notice('.没有找到下一页的链接,可能已达最后一页,或者规则错误.',3000);
			removeJT();
			return;
		};
		working=false;
	};

	//获取剩余高度
	function getRemain(){
		var TH=document.body.scrollHeight,
					scrolly=window.scrollY,
					WI=window.innerHeight,
					SY=TH-scrolly-WI;
		return SY/WI;
	};

	//翻页相关函数.
	var working,
				requesting;
	function StartAutoPG(){
		if(!working && getRemain()<=a_remain){
			working=true;
			if(Sdoc){//翻页pause中..
				insertContent(Sdoc,Swin);
				return;
			};
			if(g_htmldoc){
				insertContent(g_htmldoc,g_htmlwin);
			}else{
				if(!prefs.Aplus && !requesting){
					a_iframepre? iframeRequest() : xhttpRequest();
				};
				working=false;
			};
		};
	};
	var scrolltime;
	function autoPG(){
		clearTimeout(scrolltime);
		scrolltime=setTimeout(StartAutoPG,100);
	};

	//获取保存的设置.
	function getSetValue(name){
		var value=window.localStorage? localStorage.getItem(name) : getCookie(name);
		return (value? decodeURIComponent(value) : '');
	};

	//悬浮窗
	var FW_Created;
	function floatWinodw(){
		if(!prefs.floatWindow)return;
		if(FW_Created)return;
		var style=document.createElement('style');
		style.textContent='\
			/*最外层容器*/\
			#N_pre_FW{\
				position:absolute!important;\
				z-index:9999!important;\
			}\
			/*强制取消所有元素的浮动(避免受页面CSS影响)*/\
			#N_pre_FW *{\
				float:none!important;\
			}\
			/*去除所有input 元素的间距,强制内联*/\
			#N_pre_FW input{\
				margin:0!important;\
				display:inline!important;\
			}\
			/*控制窗口和悬浮开关样式*/\
			#N_pre_FWC,\
			#N_pre_FWKG{\
				border:1px solid #FFF!important;\
				box-shadow:0 0 5px black!important;\
				-webkit-box-shadow:0 0 5px black!important;\
				-moz-box-shadow:0 0 5px black!important;\
				border-radius:3px!important;\
				-moz-border-radius:3px!important;\
			}\
			/*控制窗口样式*/\
			#N_pre_FWC{\
				display:none!important;\
				font-size:12px!important;\
				background-color:#E8E8E8!important;\
				padding:2px 3px!important;\
			}\
			/*悬浮开关样式*/\
			#N_pre_FWKG{\
				width:10px!important;\
				height:10px!important;\
				padding:0!important;\
				margin:0!important;\
				background-color:black!important;\
				opacity:0.6!important;\
				float:right!important;\
			}\
			/*鼠标移上去,显示控制窗口*/\
			#N_pre_FW:hover #N_pre_FWC{\
				display:block!important;\
			}\
			/*鼠标移上去,隐藏悬浮开关*/\
			#N_pre_FW:hover #N_pre_FWKG{\
				display:none!important;\
			}\
			/*下拉选单的字体大小*/\
			#N_pre_FW_mode_yd_sel,\
			#N_pre_FW_mode_fy_sel{\
				font-size:12px!important;\
				border:1px solid #000!important;\
			}\
			/*预读模式相关容器,翻页模式相关容器,下面的几个开关的容器*/\
			#N_pre_FW_mode_yd_rq,\
			#N_pre_FW_mode_fy_rq,\
			#N_pre_FW_input_rq{\
				text-align:center!important;\
				margin:0!important;\
			}\
			/*预读模式相关容器*/\
			#N_pre_FW_mode_yd_rq{\
				padding:0 0 1px 0!important;\
			}\
			/*翻页模式相关容器*/\
			#N_pre_FW_mode_fy_rq{\
				padding:1px 0 3px 0!important;\
				border-bottom:1px solid #D3D3D3!important;\
			}\
			/*下面的几个开关的容器*/\
			#N_pre_FW_input_rq{\
				padding:1px 0 0 0!important;\
			}\
			/*保存按钮样式*/\
			#N_pre_FWsave{\
				padding:0 8px!important;\
			}\
		';
		document.getElementsByTagName('head')[0].appendChild(style);
		var div=document.createElement('div');
		div.id="N_pre_FW";
		div.style.top='20px';
		div.style.right='20px';
		div.innerHTML='\
			<div id="N_pre_FWKG">\
			</div>\
			<div id="N_pre_FWC">\
				<div id="N_pre_FW_mode_yd_rq">\
					<input id="N_pre_FW_mode_yd" type="radio" name="N_pre_FW_mode" />\
					<span>预读模式></span>\
					<select id="N_pre_FW_mode_yd_sel" title="选择使用哪种方式预读">\
						<option id="N_pre_FW_mode_yd_X" value="false" >XHR_预读</option>\
						<option id="N_pre_FW_mode_yd_I" value="true" >Iframe_预读</option>\
					</select>\
				</div>\
				<div id="N_pre_FW_mode_fy_rq">\
					<input id="N_pre_FW_mode_fy" type="radio" name="N_pre_FW_mode" />\
					<span>翻页模式></span>\
					<select id="N_pre_FW_mode_fy_sel" title="选择使用哪种方式翻页">\
						<option id="N_pre_FW_mode_fy_X" >XHR_翻页</option>\
						<option id="N_pre_FW_mode_fy_I" >Iframe_翻页</option>\
					</select>\
				</div>\
				<div id="N_pre_FW_input_rq">\
					<input id="N_pre_FWenable" type="checkbox" title="启用JS" />启用\
					<input id="N_pre_FW_FA" type="checkbox" title="强制将下一页的内容的Body部分拼接上来" />拼接\
					<input id="N_pre_FWdebug" type="checkbox" title="将预读的内容显示在页面的底部(预读模式下生效)" />查看\
					<input id="N_pre_FWsave" type="button" value="保存" title="保存设置到cookie里面" />\
				</div>\
			</div>\
		';
		document.body.appendChild(div);

		function GE(id){
			return document.getElementById(id)
		};

		var mode_yd_sel=GE('N_pre_FW_mode_yd_sel'),
					mode_yd=GE('N_pre_FW_mode_yd'),
					mode_yd_X=GE('N_pre_FW_mode_yd_X'),
					mode_yd_I=GE('N_pre_FW_mode_yd_I'),
					mode_fy_sel=GE('N_pre_FW_mode_fy_sel'),
					mode_fy=GE('N_pre_FW_mode_fy'),
					mode_fy_X=GE('N_pre_FW_mode_fy_X'),
					mode_fy_I=GE('N_pre_FW_mode_fy_I'),
					FW_mode_yd_f_fy=GE('N_pre_FW_mode_yd_f_fy'),
					FWenable=GE('N_pre_FWenable'),
					FWKG=GE('N_pre_FWKG'),
					FWsave=GE('N_pre_FWsave'),
					FWdebug=GE('N_pre_FWdebug'),
					FW_FA=GE('N_pre_FW_FA'),
					floatdvi=document.getElementById('N_pre_FW');

		var setName=siteEXP? 'N_pre_HC' : 'N_pre_NC';
		function saveSetValue(value){
			value=encodeURIComponent(value);
			//alert(value);
			window.localStorage? localStorage.setItem(setName,value) : setCookie(setName,value,365,'/',location.hostname);
		};

		FWsave.addEventListener('click',function (){
			var C_value,
						C_C_enable=FWenable.checked,
						C_yd_iframepre=mode_yd_sel.selectedIndex==0? false : true,
						C_view=FWdebug.checked,
						C_F_autopager=FW_FA.checked;
			//高级模式...
			if(siteEXP){
				var C_a_iframepre=mode_fy_sel.selectedIndex==0? false : true,
							C_a_enable=mode_fy.checked,
							C_setValue,
							findit,
							value_x;
				C_value='['+siteEXP+','+C_C_enable+','+C_a_iframepre+','+C_yd_iframepre+','+C_a_enable+','+C_view+','+C_F_autopager+']';
				//alert(C_value);
				C_setValue=getSetValue('N_pre_HC');
				//alert(C_setValue);
				if(C_setValue){
					C_setValue=eval(C_setValue);
					for(var i=0,ii=C_setValue.length;i<ii;i++){
						value_x=C_setValue[i];
						C_setValue[i]='['+C_setValue[i]+']';
						if(String(value_x[0])==String(siteEXP)){
							findit=i+1;
							break;
						};
					};
				};
				if(findit){
					//替换;
					C_setValue[findit-1]=C_value;
					saveSetValue('['+C_setValue+']');
				}else if(C_setValue){
					//追加;
					C_setValue.push(C_value);
					saveSetValue('['+C_setValue+']');
				}else{
					//第一次;
					saveSetValue('['+C_value+']');
				};
			}else{
				C_value='['+C_C_enable+','+C_yd_iframepre+','+C_view+','+C_F_autopager+']';
				//alert(C_value);
				saveSetValue(C_value);
			};
			if(prefs.FW_RAS){location.reload()};
		},false);

		if(siteEXP){
			if(a_enable){
				mode_fy.checked=true;
				FWdebug.disabled=true;
				if(C_enable)FWKG.style.setProperty('background-color','#891F31','important');
			}else{
				FW_FA.disabled=true;
			};
			if(a_iframepre){
				mode_fy_I.selected=true;
			}else{
				mode_fy_X.selected=true;
			};
			mode_yd.addEventListener('change',function(){
				if(this.checked){
					FWdebug.disabled=false;
					FW_FA.disabled=true;
				};
			},false);
			mode_fy.addEventListener('change',function(){
				if(this.checked){
					FWdebug.disabled=true;
					FW_FA.disabled=false;
				};
			},false);
		}else{
			if(autopager_mode){
				FWdebug.disabled=true;
			};
			if(prefs.Dbottom){
				FW_FA.disabled=true;
			};
			FWdebug.addEventListener('change',function(){
				FW_FA.disabled=this.checked;
			},false);
			FW_FA.addEventListener('change',function(){
				FWdebug.disabled=this.checked;
			},false);
		};

		if(!a_enable){
			mode_yd.checked=true;
			if(C_enable)FWKG.style.setProperty('background-color','#5564AF','important');
			if(a_enable===undefined){
				mode_fy.disabled=mode_fy_sel.disabled=true;
			};
		};

		if(yd_iframepre){
			mode_yd_I.selected=true;
		}else{
			mode_yd_X.selected=true;
		};

		FW_FA.checked=F_autopager;
		FWenable.checked=C_enable;
		FWdebug.checked=prefs.Dbottom;

		var timeout;
		var ot=parseFloat(floatdvi.style.top);
		var or=parseFloat(floatdvi.style.right);
		function gs(){
			if (timeout){clearTimeout(timeout)};
			timeout=setTimeout(gss,200);
		};
		function gss(){
			var scrolly=window.scrollY;
			var scrollx=window.scrollX;
			floatdvi.style.top=scrolly+ot+'px';
			floatdvi.style.right=-scrollx+or+'px';
		};
		gss();
		window.addEventListener('scroll',gs,false);
		FW_Created=true;
	};

	//通知..
	var alertDIV,
				adivtimeout;
	function notice(html_txt,Hlong){
		if(!alertDIV){
			alertDIV=document.createElement('div');
			alertDIV.style.cssText='\
				position:fixed!important;\
				float:none!important;\
				width:auto!important;\
				height:auto!important;\
				font-size:13px!important;\
				padding:3px 20px 2px 5px!important;\
				background-color:#7f8f9c!important;\
				border:none!important;\
				color:#000!important;\
				text-align:left!important;\
				left:0!important;\
				bottom:0!important;\
				opacity:0!important;\
				border-radius:0 6px 0 0!important;\
				-moz-border-radius:0 6px 0 0!important;\
				-o-transition:opacity 0.2s ease-in-out;\
				-webkit-transition:opacity 0.2s ease-in-out;\
				-moz-transition:opacity 0.2s ease-in-out;\
			';
			document.body.appendChild(alertDIV);
		};
		clearTimeout(adivtimeout);
		alertDIV.style.setProperty('display','block','important')
		alertDIV.innerHTML=html_txt;
		setTimeout(function(){alertDIV.style.setProperty('opacity','0.9','important');},0);
		setTimeout(function(){alertDIV.style.setProperty('opacity','0','important');},(Hlong-300));
		adivtimeout=setTimeout(function(){
			alertDIV.style.setProperty('display','none','important');
		},Hlong);
	};

	//就由我来初始化好了.-_-!!
	var nextlink,
				siteEXP,
				yd_iframepre,
				a_enable,
				a_iframepre,
				a_pageElement,
				a_remain,
				a_maxpage,
				a_separator,
				a_replaceE,
				a_Iposition,
				a_IMethod,
				a_linkx,
				F_autopager,
				C_enable=true,
				autopager_mode,
				A_pause,
				A_pause_remove;
	function init(){
		//var time1=new Date();

		if(!document.body)return;
		//处理正则的函数..
		function toRegExp(obj){
			if(obj instanceof RegExp){
				return obj;
			}else{
				return (obj instanceof Array)? new RegExp(obj[0],obj[1]) : new RegExp(obj);
			};
		};

		//分析黑名单..
		var i,
					ii,
					blacklist_x;
		for(i=0,ii=blackList.length;i<ii;i++){
			blacklist_x=blackList[i];
			if(blacklist_x[1] && toRegExp(blacklist_x[2]).test(URL))return;
		};

		//规则合并
		if(SITEINFO2)SITEINFO=SITEINFO.concat(SITEINFO2);
		//firefox GM中的this 不等于 window?
		var G_window=this.unsafeWindow || window;
		if(prefs.G_rules[0] && !window.chrome){
			var WA=G_window[prefs.G_rules[1]];
			//通过unsafeWindow无法使用instanceof运算符?
			if(WA){
				SITEINFO=SITEINFO.concat(WA);
				WA=null;
			};
		};

		//正式开始.
		//第一阶段..分析高级模式..
		var SII,
					TSP,
					URL=location.href,
					getlinkm;
		for(i=0,ii=SITEINFO.length;i<ii;i++){
			SII=SITEINFO[i];
			TSP=toRegExp(SII.url || SII.siteExp);
			if(TSP.test(URL)){
				if(SII.enable===undefined)SII.enable=SITEINFO_D.enable;
				if(!SII.enable)return;
				getlinkm=SII.nextLink || SII.getNPL;
				nextlink=getNextLink(getlinkm);
				//nextlink='javascript:';
				//alert(nextlink);
				if(nextlink){
					siteEXP=TSP;
					//alert(siteEXP);
					yd_iframepre=SII.useiframe;
					if(yd_iframepre===undefined)yd_iframepre=SITEINFO_D.useiframe;
					//如果是Oautopager的规则..
					if(SII.pageElement){
						//alert('Oautopager的规则.');
						if(!SII.autopager)SII.autopager={};
						SII.autopager.pageElement=SII.pageElement;
						if(SII.insertBefore)SII.autopager.HT_insert=[SII.insertBefore,1];
					};
					//自动翻页设置.
					if(SII.autopager){
						a_pageElement=SII.autopager.pageElement;
						if(!a_pageElement)break;
						a_enable=SII.autopager.enable;
						if(a_enable===undefined)a_enable=SITEINFO_D.autopager.enable;
						a_iframepre=SII.autopager.useiframe;
						if(a_iframepre===undefined)a_iframepre=SITEINFO_D.autopager.useiframe;
						a_remain=SII.autopager.remain;
						if(a_remain===undefined)a_remain=SITEINFO_D.autopager.remain;
						a_maxpage=SII.autopager.maxpage;
						if(a_maxpage===undefined)a_maxpage=SITEINFO_D.autopager.maxpage;
						a_separator=SII.autopager.separator;
						if(a_separator===undefined)a_separator=SITEINFO_D.autopager.separator;
						a_replaceE=SII.autopager.replaceE;
						if(SII.autopager.HT_insert && SII.autopager.HT_insert.length==2){
							a_Iposition=SII.autopager.HT_insert[0];
							a_IMethod=SII.autopager.HT_insert[1];
						};
						a_linkx=getlinkm;
					};
				};
				break;
			};
		};

		//第二阶段..分析统配规则..
		var TPgetlinkT;
		if(!nextlink){
			var TPrules_x,
						TPgetlink;
			for(i=0,ii=TPrules.length;i<ii;i++){
				TPrules_x=TPrules[i];
				if(TPrules_x[1] && toRegExp(TPrules_x[2]).test(URL)){
					TPgetlink=TPrules[i][3];
					nextlink=getNextLink(TPgetlink);
					if(nextlink){
						TPgetlinkT=TPgetlink;
						break;
					};
				};
			};
		};

		//第三阶段.核对关键字..
		var alllinks,
					alllinksl,
					KWgetlinkT;
		if(!nextlink && prefs.keymatch){
			alllinks=document.links;
			alllinksl=alllinks.length;
			//alert('全部锚数量: '+ alllinksl);
			var tempa,
						linktext,
						aimgs,
						k,
						kk,
						aimg_x,
						img_link,
						j,
						jj,
						tempktext,
						keytext,
						Kindexof,
						tempahref,
						domain=document.domain,
						Atext;
			find:
			for(i=0,ii=alllinksl;i<ii;i++){
				tempa=alllinks[i];
				if(tempa.offsetWidth == 0 || tempa.offsetHeight == 0 || !tempa.hasAttribute("href"))continue;
				img_link=false;
				linktext=tempa.textContent || tempa.title;
				if(!linktext){
					aimgs=tempa.getElementsByTagName('img');
					for(k=0,kk=aimgs.length;k<kk;k++){
						aimg_x=aimgs[k];
						linktext=aimg_x.alt || aimg_x.title;
						if(linktext){
							img_link=true;
							break;
						};
					};
					if(!linktext)continue;
				};
				linktext=linktext.replace(/^\s+|\s+$/g,'');
				if(!linktext)continue;
				linktext=prefs.cases? linktext : linktext.toLowerCase();
				for(j=0,jj=nextPageKey.length;j<jj;j++){
					tempktext=nextPageKey[j];
					keytext=prefs.cases? tempktext : tempktext.toLowerCase();
					Kindexof=linktext.indexOf(keytext);
					if(Kindexof>=0 && Kindexof<=prefs.prefix && (Kindexof+keytext.length+prefs.subfix)>=linktext.length){
						tempahref=tempa.href;
						//alert(tempahref);
						//alert(domain);
						if(tempahref.search(/^https?/i)==0 && tempahref.match(/^https?:\/\/[^\/]*/i)[0].indexOf(domain)!=-1){
							if(!/^#/i.test(tempahref.replace(URL,''))){
								//alert(linktext);
								//alert(keytext);
								nextlink=tempa;
								Atext=img_link? (aimg_x.alt || aimg_x.title) : (nextlink.textContent || nextlink.title);
								KWgetlinkT=img_link? '//a/following::img[@alt="'+Atext+'" or @title="'+Atext+'"]' : '//a[text()="'+Atext+'" or @title="'+Atext+'"][@href]';
								break find;
							};
						};
					};
				};
			};
		};

		//alert(nextlink);
		//alert(new Date()-time1+'毫秒');

		//如果找到了下一页的链接..
		if(!nextlink)return;

//-----------------------------------//
		//从cookie载入设置..
		var C_setValue,
					value_x;
		if(siteEXP){
			if(prefs.floatWindow){
				C_setValue=getSetValue('N_pre_HC');
				if(C_setValue){
					C_setValue=eval(C_setValue);
					for(i=0,ii=C_setValue.length;i<ii;i++){
						value_x=C_setValue[i];
						if(String(value_x[0])==String(siteEXP)){
							if(a_enable!==undefined){
								a_enable=value_x[4];
								a_iframepre=value_x[2];
							};
							C_enable=value_x[1];
							yd_iframepre=value_x[3];
							prefs.Dbottom=value_x[5];
							F_autopager=value_x[6];
							break;
						};
					};
				};
			};
		}else{
			yd_iframepre=prefs.iframeD;
			if(!yd_iframepre){
				//alert(yd_iframepre);
				var UseIframe_x;
				for(i=0,ii=UseIframe.length;i<ii;i++){
					UseIframe_x=UseIframe[i];
					if(UseIframe_x[1] && toRegExp(UseIframe_x[2]).test(URL)){
						yd_iframepre=true;
						break;
					};
				};
			};
			if(prefs.floatWindow){
				F_autopager=prefs.FA;
				C_setValue=getSetValue('N_pre_NC');
				//alert(C_setValue);
				if(C_setValue){
					C_setValue=eval(C_setValue);
					//alert(C_setValue);
					C_enable=C_setValue[0];
					yd_iframepre=C_setValue[1];
					prefs.Dbottom=C_setValue[2];
					F_autopager=C_setValue[3];
				};
			};
		};

		//分析..强制拼接..
		if(prefs.floatWindow){
			if(F_autopager && (!siteEXP || (siteEXP && a_enable))){
				a_linkx=a_linkx || TPgetlinkT || KWgetlinkT;
				//alert(a_linkx);
				a_pageElement='//body[1]/*';
				a_iframepre=siteEXP? a_iframepre : yd_iframepre;
				a_remain=SITEINFO_F_D.remain;
				a_maxpage=SITEINFO_F_D.maxpage;
				a_separator=SITEINFO_F_D.separator;
				a_replaceE=a_Iposition=a_IMethod=null;
			};
		};

		//综合分析..最后是否要自动翻页..
		autopager_mode=siteEXP? a_enable : F_autopager;

		//是否自动显示悬浮窗..
		if(prefs.FW_autoD || window.chrome){
			floatWinodw();
		}else{
			G_window.N_pre_DFW=floatWinodw;
		};

		if(!C_enable)return;

		//下一页链接对象和字符串..
		var o_nextlink=nextlink;
		nextlink=String(nextlink);

		//鼠标手势翻页函数...
		G_window.N_PreNextLink=function(){
			if(nextlink){
				location.href=nextlink;
			};
		};

		if(autopager_mode){
			if(prefs.Aplus){
				a_iframepre? iframeRequest() : xhttpRequest();
			};
			window.addEventListener('scroll',autoPG,false);
			if(prefs.pauseA){
				var Sbutton=['target','shiftKey','ctrlKey','altKey'],
							Sclickm=['mousedown','dblclick'];
				function A_pause_Fn(){
					A_pause=A_pause? !prefs.switchA : true;
					A_pause? notice('.自动翻页<span style="color:red!important;"><b>暂停</b></span>.',1000) : notice('.自动翻页重新启用.',1000);
					if(!A_pause)StartAutoPG();
				};
				function SMOUSEUP(e){
					clearTimeout(Sctimeout);
					document.removeEventListener('mouseup',SMOUSEUP,false);
				};
				Sclickm=prefs.mouseA? Sclickm[0] : Sclickm[1];
				var button_1=Sbutton[prefs.Pbutton[0]],
							button_2=Sbutton[prefs.Pbutton[1]],
							button_3=Sbutton[prefs.Pbutton[2]],
							Sctimeout;
				document.addEventListener(Sclickm,function(e){
					if(A_pause_remove){
						document.removeEventListener(Sclickm,arguments.callee,false);
						if(prefs.noticeMe)notice('翻页被停止,暂停翻页函数监听.正常卸载.',3000);
						return;
					};
					if(e[button_1] && e[button_2] && e[button_3]){
						if(Sclickm=='mousedown'){
							document.addEventListener('mouseup',SMOUSEUP,false);
							Sctimeout=setTimeout(A_pause_Fn,prefs.Atimeout);
						}else{
							A_pause_Fn();
						};
					};
				},false);
			};
		}else{
			yd_iframepre? iframeRequest() : xhttpRequest();
			if(prefs.linkalert && typeof o_nextlink!='string'){
				var outlstyle=prefs.alertstyle.join(' ');
				function addOLS(obj){
					obj.style.outline=outlstyle;
					obj.title+=yd_iframepre? ' 此页面所有内容,使用Iframe预读...' : ' 此页面所有图片,使用XHR预读...';
				};
				if(prefs.allalert){
					//alert(alllinks);
					if(!alllinks){
						alllinks=document.links;
						alllinksl=alllinks.length;
					};
					var alllinks_x;
					for(i=0,ii=alllinksl;i<ii;i++){
						alllinks_x=alllinks[i];
						if(alllinks_x.href==nextlink){
							addOLS(alllinks_x);
						};
					};
				}else{
					addOLS(o_nextlink);
				};
			};
		};
	};

	if(window.name!='N_preiframe'){
		if(window.chrome){
			init();
		}else{
			if(!prefs.loaded){
				if(window.opera){
					document.addEventListener('DOMContentLoaded',init,false);
				}else{
					init();
				};
			}else{
				window.addEventListener('load',init,false);
			};
		};
	};
})();


	//利用opera的特有事件监听.拦截脚本.修正一些网站的自动翻页..
(function(){
	if(window.name=='N_preiframe' && window.opera){
		//修改百度图片iframe请求..无限翻页..
		if(/^http:\/\/image\.baidu\.com\/i/i.test(location.href)){
			window.opera.addEventListener('BeforeScript',function(e){
				e.element.text=e.element.text.replace(/top\.location=self\.location/gi,'');
			},false);
		};
	};
})();
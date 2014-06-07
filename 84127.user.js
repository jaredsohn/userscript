// ==UserScript==
// @name Super_preloader
// @author NLF
// @description  预读+翻页..全加速你的浏览体验...#^_^#...(Support Opera 10.1+ ,Fx3.6+(need GreaseMonkey) ,Chrome5.0+)..
// @create 2010-4-30
// @lastmodified 2010-8-3
// @version 1.8.7.5
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
//---plan----//
	支持javascript链接(虽然还没想好..-_-!!)
*/

(function(){
	/////////////////////设置(请注意开关的缩进关系..子开关一般在父开关为true的时候才会生效.)//////////////////////
	var prefs={
		loaded:false																			,//在页面完全载入(发生load事件)后加载,否则在DOM加载完成后加载(chrome上此开关无效.)
		Dbottom:false																		,//显示所有预读内容到页面的最下方(方便知道预读了什么)...(预读模式下)..
		linkalert:true																	,//给预读中的链接加一个外边框..(预读模式下)..
				allalert:true																	,//在所有通往下一页的链接上显示外边框..否则只在找到的那个链接上显示外框;
				alertstyle:['1px','solid','red']							,//边框样式..[粗细,样式,颜色];
		keymatch:true																			,//给没有规则的网站使用..关键字匹配模式寻找下一页(不建议关闭)..
				cases:false																	,//关键字区分大小写....
				prefix:1																			,//允许关键字前的字符..例如 "下一页" 要匹配 "[下一页"     那么prefix要设置为1...
						//pfwordl:[true,[' ','[']]							,//前面的关键字字符限定..第一项是否启用限定,第二项是具体的关键字..
				subfix:3																			,//允许关键字后的字符..例如 "下一页" 要匹配 "下一页 >>"   那么subfix要设置为3...
						//sfwordl:[true,[' ',']','>']]							,//后面的关键字字符限定..第一项是否启用限定,第二项是具体的关键字..
		floatWindow:true																	,//显示悬浮窗,提供.切换模式..启用禁用功能..非常滴方便(强烈不建议关闭,如果不想看见开关..请使用下面的开关禁用自动显示.);
				FW_autoD:true																	,//自动显示悬浮窗(此开关只在chrome上无效).....否则通过此命令调用: javascript:N_pre_DFW();
				FW_position:2																	,//1:出现在左上角;2:出现在右上角;3：出现在右下角;4：出现在左下角;
				FW_offset:[20,20]															,//偏离版边的垂直和水平方向的数值..(单位:像素)
				FW_RAS:true																		,//点击悬浮窗上的保存按钮..立即刷新页面;
				FA:false																			,//默认在无高级规则的网站上开启 强制拼接(翻页)(将下一页的body部分的内容拼接上来.)(不推荐);
		iframeD:false																		,//默认在无高级规则的网站上使用 iframe预读(不推荐);
		pauseA:true																				,//快速停止自动翻页(当前模式为翻页模式的时候生效.);
				Pbutton:[2,0,0]																,//需要按住的键.....0: 不按住任何键;1: shift鍵;2: ctrl鍵; 3: alt鍵;(同时按3个键.就填 1 2 3)(一个都不按.就填 0 0 0)
				mouseA:true																		,//按住鼠标左键..否则.双击;
						Atimeout:200															,//按住左键时..延时.多少生效..(单位:毫秒);
				switchA:true																	,//重复执行操作..在启用/禁用之间切换..
				stop_ipage:true																,//如果在连续翻页过程中暂停.重新启用后.不在继续..连续翻页..
		G_rules:[true,'AutoPagerizeWedataSiteinfo']				,//(此规则优先级最低)拼接全局变量里面的高级规则数组..此开关的第2项是这个变量的名..(chrome上无效.)
		Aplus:true																				,//自动翻页模式的时候..提前预读好一页..就是翻完第1页,立马预读第2页,翻完第2页,立马预读第3页..(大幅加快翻页快感-_-!!)(建议开启)..
		sepP:true																					,//翻页模式下.分隔符.在使用上滚一页或下滚一页的时候是否保持相对位置..
		sepT:true																					,//翻页模式下.分隔符.在使用上滚一页或下滚一页的时候使用动画过渡..
				s_FPS:30																			,//帧速.
				s_duration:200																,//动画持续时长.(单位:毫秒);
		noticeMe:false																		,//记录一些过程信息.(通知信息显示在右下角).(它有可能对你调试有帮助).
				NM_history:10																	,//显示信息的时候,保留以前的多少条历史记录..
		someValue:'                           '						,//显示在翻页导航最右边的一个小句子..-_-!!..
		DisableI:true																			,//只在顶层窗口加载JS..提升性能..注意在一些框架集网页上..使用 DIExclude 数组就行排除.(推荐开启)..
	};

	//分页导航的6个图标:
	var sep_icons={
		top:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjM3NkQ2MTFFOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjM3NkQ2MTFGOTUyNjExREZBNkRGOEVGQ0JDNkM0RDU3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzc2RDYxMUM5NTI2MTFERkE2REY4  RUZDQkM2QzRENTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc2RDYxMUQ5NTI2MTFERkE2  REY4RUZDQkM2QzRENTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz7bso/VAAACxElEQVR42rSUS0iUURTH//d+j9EppSRtCjEi  w0EhjR6kIyUpWilFpbUTei1auMoellAQZFSbVrkQilplhZC9IKyNQg8CXVQKZigaOgojNdg3j++7  nTtjAzPqTI50Zu7ce+ec87vnnPtgQghIcZ3VxiGwGksRhomemwGHHKqRPwl6+ujFJXHvPLwWCUyN  VT7qvZ4UtK7oQtQ8CizLUlt4fr4U6ctmExPyZ478LelcMMNIa3vL2nkrR7KnvEaR/auuZ2akeHMt  f0SGsSvFSuk5rWOzs2RvXm6+zRJBDAx+8fUNfHjZfSNwMJ4fj6ekk9KU49hYuaXAZfs4/BzvhztR  6Nxmy85aXyl1SYFdjVrViuWrmqtLj9h7R18jKPwImD6CP0V5cY09fdnKZmmzKDA55Kqqrb2u4oR9  yNOHXz4PVEWDbtPhNSfR7+lGze46u6bp7dL2n8BkmMY4umrLj6XNCA8mfn4PQ3UdNgJzGzA28xnT  1giqdh4I2UqfuGAyYGTYUbH90JrMDAcbmuqFwlWCaiGoxQwomoCmc3z1vEV6RgrbUVTmkD7Sd+GI  GVo25Ra7tjp3af3ud1C5Dk3VQ9FazI+gYkAlqKqzUP/J3Yn8vAI9N8dZIn2jUJG3olE7nJ214cGp  /U2pMnVTmLCsIN4M3UMAXrj9g1B0AUXloAixb90Z0gtYpoBh+PD4xf2ZqemJ+p5bgSdRF4SMG0bd  31Ivt50MzxUYV463pchF3L/HaE5QjVNj4JzuocJw++5Vw/SLlFmEXTKojwbTgS+LqbfgZGmKAAzL  S+Xg4ARTCc5VFhpLKEXIFn1B5E5OG+PUy4wkDCGorDHj8R+lBGAGI+iN2t3QIowlfO3ig+kjb1v4  9aI2u1lBv0Xj+GA1nlKel+q8BnANdBrCdZVNBiwXSRY8eam1PjNBxlMLZpvo2UxWOP6T/BFgAOBe  8h+hfm64AAAAAElFTkSuQmCC'
		,end:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg2RjU3NUQzOTUyNjExREY4M0U4RDZGQThBMjcwMEIzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg2RjU3NUQ0OTUyNjExREY4M0U4RDZGQThBMjcwMEIzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODZGNTc1RDE5NTI2MTFERjgzRThE  NkZBOEEyNzAwQjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODZGNTc1RDI5NTI2MTFERjgz  RThENkZBOEEyNzAwQjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bp+ZPAAAC0UlEQVR42rRVXUhUQRT+5t67uzdZwwX/0FKS  CCMiwcwi6QfpwcAgKHvzpR6EoKeQpIcIJCOCIB8SooIgKK2gssBwQ0PXsB8s8KdSIhFzXbHS2vbe  ufdOM3fd1mx3zRUPezgzzDnfnP3mm7mEMYaVMAkrZEq8hZ0nHQEe0hepD3RfpJlLAhagtcfPgBBA  sGWZzHbT4JEC2e4NON1UnbHkjoURiaDdf8kGpCELOncaMkF0FceKG5PnmPBVxSlBkom9iehemEN2  gYEt7/CEasLCiQKpihuLqSkhMLMAQ+ecCl5NMQ9vkqZm82glVkVZrSMy7uC5uyMT2UlCnFvV0CxY  Fps7PN6t5IZMHLB4MpER4uph86jr5GFP1wUKZd7GjelpWSWH9lenqKpL8KoyDmbolt25afBoEnic  uTBMand89uh1VeboYn71YcOvscmRxliquDf13V/i9T06sWtH+aqu8VuwJO2P3ITMUuUMPiagBoX3  w02oDje2rq3AE9/t0Fhg5LLAiM0xQ93w6JBv4H2/XpxZaXcrOBZRMVVIzAld1zmwDsPSUZi5Ha+G  Oum74Z5uUZvo8MQ/PPiir2NiZjrENnr2gnJQkxIOqkLTdA5MYVoGCtKLEJieYO2997+Imr9kE0cV  szyxvO35g9k0KQ+5KZtgaZgD1W0+s1avQwrx4K73hp0rav6VmxB9xKM2TKle1fqsJVjoKYObc6tr  YdBUlwcFni1oab8WNAytSuRGb1QUJ5GO22Z+fq339rQGS/MP2LdNIU4UrdmHx13NwW8/pupFTlJv  BbeGsclP294OvawoXV/pkoiC1/3d2ujEx6di7X+fzc/ccxaoREiN9A32Ijsn/Dq+GfCJmkruNAbe  OPf8MHD0LPNqqurivEbiFyav5shmOd7709TckBeTCsJvQ0vf+aS+GIeLTiXmeGFC8p+mqMz8V+6c  y1oWGoE/MvwtwABuklC1izbNcAAAAABJRU5ErkJggg=='
		,up:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkUzRDUyNEQ5OTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkUzRDUyNERBOTBFMjExREZCMjNFRjQzNkMwMjdFNUMwIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTNENTI0RDc5MEUyMTFERkIyM0VG  NDM2QzAyN0U1QzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTNENTI0RDg5MEUyMTFERkIy  M0VGNDM2QzAyN0U1QzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6I8cyJAAAC20lEQVR42tRVW0hUURTd+5xz550PVMwcUksJ  JY2wrMHpoxQzQrFRxF5iGn1EERGEZCBI9OFPUR9ZkNRX0a9fkeBPEhFBP1mDFj0xdVTSqXnce8/p  3Gtjvh+IH53LZu6Bc9dZe+2196AQAtZjEVinxWIv3stsqXM3ATG+16E1iVbBVwUsOC525pI7dfNp  gRApDnxulvvrq5KCoFgoKhLjktsOeWud5d7qhHhX0lnPBaVqVcA6J3Njp9224ZGvtMHhD7yE/vFe  UlN+PM0V52jPr6WFKwbmTJ0ZbsZYt6+k0RkIfYLByX74HvTDYLSP1FQe25KYpTzYtJel25LQ1A+T  ERcFtgenw8U47anaX5+AFh0+BN6AwizAKAX/2HPQ7OPEV+HLzSyGu1YH2JOyFSICQmi6RhYEThkx  g6oO1lXuqctIS0kn74deACOKGZwIQCn62/GnkJaZggdLDpdlVyo3RgdU0yU4x7nTu8EsasQdT36Z  Jz9nt9L3oxcoMqASFOQvF5p0HKDOBbwaeUJ2FBTQosI9ddtPWq4Z30vGuCCwEORiXkbRiZJdR6zv  JFMBXILSKXAkQlWjgmuyFrqA4K/f0PO1E0u9B5w52zaecleQRkZm9wHGWvpoe17oTFWLjVKZtkTQ  JcNu/0NQ9bAIa5M4HBkAq5MKi41gdW6L5A1E6MgnJkbVjse3hz6+Dp379ox3zWuQL8P9tqv3GqbS  YBhua+qUEER6maIajchUZQZRQwyZi4bYeqs59DMobPKI1UrRHZcB5+Wn84FN/WPW04RsNDSl0KSn  VflwWSNNFo8LRF0Thoa2gfucLNvScxdKKkalDdbGnbLluRrhhArCNVUnBNcw3fCv7xVqMc8a40eL  cIxGVHkhrn1s2hWXwdkQybAP6sYNywAvOSv3ba2VM0OTOqswGR4DlUdiXjL4rxB4NvehKx31qf+2  YmZtwXQo4siSMv53f03rBvxHgAEAqLoqsgGSMo4AAAAASUVORK5CYII='
		,down:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOkY3M0ZDRTgzOTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3IiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOkY3M0ZDRTg0OTBFMjExREZCNjlFQUY1QUIyNjQ1NzE3Ij4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjczRkNFODE5MEUyMTFERkI2OUVB  RjVBQjI2NDU3MTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjczRkNFODI5MEUyMTFERkI2  OUVBRjVBQjI2NDU3MTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Q0swTAAAC50lEQVR42tRVXUhUQRQ+M/dnd0sN/1gtAimW  LXsoiAixFyGIHnqNioioh36ghyh6sCAijAgiIoLowSRMBG1b1n5s0XxRtiyRlIpQ1M1sKxV1XffH  e2emM+u6qG11EXzoXM6de2fOfPeb8x3OJUIIWAmjsEKmzj+UndeWrv0kAgoJWTglT0cW0vqB96L5  144bxu/Ac5sWWeHpQxfT0xq1QbY9D1SqgUJVHHWovHfE+U/GU5Mc1uQoi1cFgYbua8mPErxK8reC  Q8sGm+qACtdh6zmejnLEEGlXCC4TTAiGSeiYEVm+eGMRDhxBpes2DVQbFWQuihtsdu4gFiopY1WM  T0tgEKqmCFUnVEuCCypTwgWXdwTnloH96CylIsdtcUUloNspqDpFdAoaXhKQcYZBAqhK4ql4sVT9  tHjhINzZsN3uPnngjDMnJ18jinAQEFy3KXIQzBBE023ImOEbJ5L51eM1dooVwpgB971V8YyMgy/M  5wMfYlcantaNJ8yI8H+7LXzDVRSrSlAFiKJRITVk3ERQA9r6auF10AfRRBjqW+7Ghsf6KzMCm9yU  Q3Xf5+8PWtpfzVSsPyayVq8CioSRFGiaTpAruplMBc7CZmcZtL57kvgY7KzFvbcyAquKKoLeJPil  zq439e97etiOwv1coURWnqAE0ZOgBkjw0qJy6O17awR6/YHiQXZq7ZCRWTyptOpUIBQQtN9nnH3Z  +swfGhoVW3L3yBQTygmeykj6JmQaGh3hzYH6oBY196VE/2NV8FQj4IkoxIY64ISnyfNJjeVyd94u  MBkDw5yFjQXbQMwq4G17OGlSVoHxESt1LBaMIxODxtFGX91AsV7K12W5oTjbBQWOEvC0Vs+Yprkb  Y74ut212RcLRC43Nj0Ku3HLuLtgJnpaaaCw+fRDXui21zb+YdyoyXtrc/vgcdg3bRHjsMurZZLkf  L7XQXgahdOrhevnoFxeWxxTKcNNKEyL/3a9pxYB/CTAALMFZuEnI1jsAAAAASUVORK5CYII='
		,down_gray:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjg1RDA5RjFGOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjg1RDA5RjIwOTUyMjExREZCMkM4QUZEOEY4Qzg2MDREIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODVEMDlGMUQ5NTIyMTFERkIyQzhB  RkQ4RjhDODYwNEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODVEMDlGMUU5NTIyMTFERkIy  QzhBRkQ4RjhDODYwNEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz62tt8rAAACiUlEQVR42tRVS6tSURTe5/hWFAderhoIKqmI  U2eCBg2a9AOaBQ4iZxE0yCCcNYkGDYWaNEh8ICQpoYg4CJQIFA0chKGpBb7A9+Oc1jp4LnK12+GC  gxYs1j7stb79rcfeh2JZlpxCaHIiEfMLj8dzee836NlVwRRF/QKj57+LxeIh8BE5CwQChC+VRCIh  arWaiEQiTsViMQkGg+f/ZDyfz4lcLj9wiEajF2uz2UwUCgWRyWTE5/MJr/FqteIY8gqporI7SxaL  xfWbt1wuL4ClUimWgAMGYdbrNecjZJKOTgWCYzzUkYV60mh53/2MhAJ/At1iLLIDXWCTsGkATGGz  aJomDMOQ7XbLAcP+YufP62HzRqPRa5PJZPf7/edarVYC6SvwAADGOrAARmHTABgwWQqBQ6GQHA/f  bDYkHA4vjjJuNBofO51OKB6P96FJbDabZVOpFA2BLDBFxlhr7gBknM/nSalUIrPZjEQikXm73X56  FBhPBXnTbDbfFgqFqdfrZVUqFZc+KjIHthRfCmyow+EguVxuWavV3kHsq6PAyKher+PyWblcfl+p  VLZut5tBUMwdU0ZQJIDW6XSSarW6/gwyGAwe9vv94xcEa6bRaIhSqaRhrB4B0A24aXdcLhcFKXM1  RVA8AJn2ej0mnU7/gNm/u2v6X6cCJ4Hazeu81Wo9SCaT3yATxm63c+njHFssFo4x7I3A9xboRMgc  s3v2J6R3PxaLfdfr9YzRaCQGg4HodDqSSCSmwP42+LSv+2x+mUwmTwCoa7PZGFAEnU2n03uw91XQ  s3mFJMfjsTOTyTyGtWw4HD4H+0Hwe3xZrFbr/ueLbrd7Exo4hvVLIY8Q9d/9mk4G/EeAAQCBEkva  rHrRPgAAAABJRU5ErkJggg=='
		,up_gray:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz  NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE  PSJ4bXAuaWlkOjc0MTI5MDY4OTUyMjExREZCODVDREYyM0U0QjMzQkQzIiB4bXBNTTpEb2N1bWVu  dElEPSJ4bXAuZGlkOjc0MTI5MDY5OTUyMjExREZCODVDREYyM0U0QjMzQkQzIj4gPHhtcE1NOkRl  cml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzQxMjkwNjY5NTIyMTFERkI4NUNE  RjIzRTRCMzNCRDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzQxMjkwNjc5NTIyMTFERkI4  NUNERjIzRTRCMzNCRDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1l  dGE+IDw/eHBhY2tldCBlbmQ9InIiPz5D2F5XAAACZklEQVR42tSVz6sSURTH7x0VJxX8CampSQtF  /AESConiQkhdlKKCLdr0YxW0iDaBSBLZok3tol27/oC3TcS14EpEBV24UOO5EETLn9M5g4KoPXu9  XHTgMNc7537me7/3zEg5jiOnCIacKISbQSAQuKjuI6VULhAInhSLxdWlFKMlv8mXer3+qU6nu79c  Ll/9KyvuKZXKN9FoVBqJRBRyufyZz+eLXxXslkqlXxOJhKTZbBJIBsY6mUz23uFw3P5bsEEoFH4D  kHQwGJBer0e63S7p9/tMKpW6pVarv5hMphsSiYRi8eZ6EDybzTYpg5/FeDyuYBiGtNttIhKJCBwc  aTQaZLFYMHDPZjQaP8P8NY1Gw0wmEw7nD4LH4zGmQCwWn4GnN7VaLVOv13kgqCfQFZhctVolcJg0  HA7ftdlsH2BHfJfg/YNglUqF+ekOhNPpFNVqNYKKEYpX6AhcTFerFSmXy4zL5RJ4PJ4Hbrf7La4H  xfQgGNa8sNvtD0OhkBiVYquhWoRCcvP5nEMoJu6uVCrRYDAoNZvNj6xW62MUcPAFMRgM79LpNIsF  Xq+XBxQKBYQjlIIifgzKaSwWw+0z8HCaTCbVw+HwtcViOW+1Wmd74E6nw2azWX4MgJ+5XI5F30At  nU6n/IM220VgPp//AfNYI4Yag0KheA639sHoxmYAqjiEohXo7RrKHx5CcQ6CrVQqzNFvxW6su2D7  tFfrllrtttalX+kNFPt47SlBv7Hfd9vrjxVvB8uyZOu7jX5cDez3+3mPMUejEard281R8E7h90wm  c/3IRs4vtPG/+2s6GfiXAAMAq3cXTADTBMIAAAAASUVORK5CYII='
	};

	//悬浮窗的..预读状态..翻页状态..翻页状态(暂停)..翻页状态(停止)(翻页完成,或者被异常停止.)(无法再开启)..的颜色:
	var FWKG_color={
		prefetch:'#5564AF'
		,autopager:'#038B00'
		,Apause:'#B7B700'
		,Astop:'#A00000'
	};

	//////////////////////////---------------规则-------////////////////
	//在以下网站上允许在非顶层窗口上加载JS..比如猫扑之类的框架集网页.
	var DIExclude=[
		['猫扑帖子内容页面',true,/http:\/\/dzh\.mop\.com\/topic\/readSub/i],
		['水木社区帖子内容',true,/http:\/\/www\.newsmth\.net\/bbstcon/i],
	];

	//高级规则的一些默认设置..如果你不知道是什么..请务必不要修改(删除)它.此修改会影响到所有高级规则...
	var SITEINFO_D={
		enable:true						,//启用(此项务必不要设置成false..否则所有的高级规则都要失效..)
		useiframe:false			,//(预读)是否使用iframe..
		autopager:{
			enable:true						,//启用自动翻页...
			useiframe:false			,//(翻页)是否使用iframe..
			remain:1							,//剩余页面的高度..是显示高度的 remain 倍开始翻页..
			maxpage:99						,//最多翻多少页..
			ipages:[false,1]			,//立即翻页,第一项是控制是否在js加载的时候立即翻第二项(必须小于maxpage)的页数,比如[true,3].就是说JS加载后.立即翻3页.
			separator:true				//显示翻页导航..(推荐显示.)
		}
	};

	//高优先级规则,第一个是教程.
	var SITEINFO=[
		{siteName:'google搜索',																																//站点名字...(可选)
			url:/^https?:\/\/\w{3,10}\.google(?:\.\w{1,4}){1,2}\/search/i,											//站点正则...(~~必须~~)
			siteExample:'http://www.google.com',																								//站点实例...(可选)
			enable:false,																																			//启用.(总开关)(可选)
			useiframe:false,																																		//是否用iframe预读...(可选)
			nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',				//下一页链接 xpath 或者 CSS选择器 或者 函数返回值 (~~必须~~)
			//nextLink:'table#nav>tbody>tr>td.b:last-child>a',
			//nextLink:function(D,W){return D.evaluate('//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',D,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;},
			autopager:{
				enable:true	,																								//启用(自动翻页)(可选)
				useiframe:false,																						//是否使用iframe翻页(可选)
				pageElement:'//div[@id="ires"]',														//主体内容 xpath 或 CSS选择器(~~必须~~)
				//pageElement:'div#ires',
				remain:1/3,																									//剩余页面的高度..是显示高度的 remain 倍开始翻页(可选)
				replaceE:'//div[@id="navcnt"]',															//需要替换的部分 xpat h或 CSS选择器 一般是页面的本来的翻页导航(可选);
				//replaceE:'div#navcnt',
				ipages:[false,3],																					//立即翻页,第一项是控制是否在js加载的时候立即翻第二项(必须小于maxpage)的页数,比如[true,3].就是说JS加载后.立即翻3页.(可选)
				separator:true,																							//是否显示翻页导航(可选)
				maxpage:66,																									//最多翻页数量(可选)
				HT_insert:['//div[@id="res"]',2],														//插入方式此项为一个数组: [节点xpath或CSS选择器,插入方式(1：插入到给定节点之前;2：附加到给定节点的里面)](可选);
				//HT_insert:['div#res',2],
			}
		},
		{siteName:'google图片',
			url:/^https?:\/\/\w{3,7}\.google(?:\.\w{1,4}){1,2}\/images/i,
			siteExample:'http://images.google.com',
			nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="res"]/div',
				replaceE:'//div[@id="navcnt"]',
			}
		},
		{siteName:'百度搜索',
			url:/^https?:\/\/www\.baidu\.com\/(?:s|baidu)\?/i,
			siteExample:'http://www.baidu.com',
			enable:false,
			nextLink:'//div[@class="p"]/a[font[text()="下一页"]]',
			//nextLink:'div.p>a:last-of-type',
			autopager:{
				pageElement:'//div[@id="wrapper"]/table[@id] | //div[@id="wrapper"]/table[@id]/following-sibling::br[1] | //div[@class="p"]',
				//pageElement:'div#wrapper>table[id],div#wrapper>table[id]+br,div.p',
				remain:1/3,
				HT_insert:['//div[@id="wrapper"]/table[last()]',1],
				//HT_insert:['div#wrapper>table:last-of-type',1],
			}
		},
		{siteName:'百度图片',
			url:/^http:\/\/image\.baidu\.com\/.+/i,
			nextLink:'//a[@id="next_page"] | //div[@id="pgw" and @class="pg"]/a[(font/text()="下一页")]',
			autopager:{
				enable:false,
				pageElement:'//div[@id="imgid"]',
			}
		},
		{siteName:'百度mp3',
			url:/^http:\/\/mp3\.baidu\.com\/.+/i,
			siteExample:'http://mp3.baidu.com/m?tn=baidump3&ct=134217728&lm=0&f=1&word=%CB%C0%C9%F1',
			nextLink:'//div[@class="pg"]/a[(font/text()="下一页")]',
			autopager:{
				replaceE:'//div[@class="pg"]',
				pageElement:'//table[@id="Tbs"]',
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
				pageElement:'//div[@id="pb_content"]',
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
       nextLink:'//div[starts-with(@class,"pagination")]/descendant::a[text()="下一页"]',
       autopager:{
          pageElement:'//div[@id="body"]/div[@class="topic block clear"]/table',
          replaceE:'//div[starts-with(@class,"pagination")]',
       }
    },
    {siteName:'opera官方网站帖子内容页面',
       url:/^http:\/\/bbs\.operachina\.com\/viewtopic/i,
       siteExample:'http://bbs.operachina.com/viewtopic',
       nextLink:'//div[starts-with(@class,"pagination")]/descendant::a[text()="下一页"]',
       autopager:{
          //pageElement:'//div[@id="page-body"]',
          pageElement:'//div[@id="body"]/div[starts-with(@class,"post")]',
          replaceE:'//div[starts-with(@class,"pagination")]'
       }
    },
   {siteName:'opera官方网站查看新帖帖子列表页面',
         url:/^http:\/\/bbs\.operachina\.com\/search/i,
         siteExample:'http://bbs.operachina.com/search.php?search_id=newposts',
         nextLink:'//li[contains(@class,"pagination")]/descendant::a[text()="下一页"]',
         autopager:{
            pageElement:'//div[@class="search block clear"]/table',
            replaceE:'//li[contains(@class,"pagination")]'
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
			url:/http:\/\/www\.missyuan\.com\/(?:view)?thread/i,
			siteExample:'http://www.missyuan.com/thread-431242-1-1.html',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				replaceE:'//div[@class="pages_btns"]/div[@class="pages"]',
				pageElement:'//form[@name="modactions"]',
			}
		},
		{siteName:'思源论坛帖子列表页面',
			url:/http:\/\/www\.missyuan\.com\/forum/i,
			siteExample:'http://www.missyuan.com/forum-98-1.html',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				replaceE:'//div[@class="pages_btns"]/div[@class="pages"]',
				pageElement:'//form[@name="moderate"]/table[last()]',
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
				useiframe:true,
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
				if(!W.location)return;
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
		{siteName:'mozest社区帖子列表页面',
			url:/^http:\/\/board\.mozest\.com\/forum/i,
			siteExample:'http://board.mozest.com/forum-50-1',
			nextLink:'//div[@class="pages"]/a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="threadlist"]'
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
			nextLink:'li#page__next>a:first-child',
			//nextLink:'//li[@id="page__next"]/a[1]',
			autopager:{
				//pageElement:'//div[@id="pictureContent"]'
				pageElement:'div#pictureContent'
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
		{siteName:'色影无忌帖子内容页面',
			url:/http:\/\/forum\.xitek\.com\/showthread/i,
			siteExample:'http://forum.xitek.com/showthread.php?threadid=571986',
			nextLink:'//font[@size="2"]/font[@class="thtcolor"]/following-sibling::a[@href]',
			autopager:{
				pageElement:'//body/table[position()>2 and position()<(last()-2)]',
			}
		},
		{siteName:'梦想文学',
			url:/^http:\/\/www\.mx99\.com\/html\/book\/.+html/i,
			useiframe:true,
			nextLink:'//div[@id="thumb"]/a[4]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="content" and @class="fonts_mesne"]'
			}
		},
		{siteName:'招聘区,杭州19楼,帖子内容',
			url:/^http:\/\/www\.19lou\.com\/forum.*thread/i,
			siteExample:'http://www.19lou.com/forum-1502-thread-29762777-1-1.html',
			nextLink:'//div[@class="pages"]/descendant::a[text()="下一页"][@href]',
			useiframe:true,
			autopager:{
				useiframe:true,
				pageElement:'//div[@class="layout"]/form[@name="modactions"]'
			}
		},
		{siteName:'招聘区,杭州19楼,帖子列表',
			url:/^http:\/\/www\.19lou\.com\/forum/i,
			siteExample:'http://www.19lou.com/forum-1500-1.html',
			nextLink:'//div[@class="pages"]/descendant::a[text()="下一页"][@href]',
			autopager:{
				pageElement:'//div[@id="forum_nav"]/following-sibling::form'
			}
		},
		{siteName:'汽车之家论坛帖子内容',
			url:/^http:\/\/club\.autohome\.com\.cn\/bbs\/thread/i,
			siteExample:'http://club.autohome.com.cn/bbs/thread-a-100019-7383135-1.html',
			nextLink:'//div[@class="pages"]/a[@title="下1页"][@href]',
			autopager:{
				pageElement:'//body/div[@id="divTopic" or contains(@class,"viewthread")]'
			}
		},
		{siteName:'爱卡汽车论坛帖子内容',
			url:/^http:\/\/www\.xcar\.com\.cn\/bbs\/viewthread/i,
			siteExample:'http://www.xcar.com.cn/bbs/viewthread.php?tid=12474760',
			nextLink:'//a[text()="下一页＞"][@href]',
			autopager:{
				pageElement:'//form[@id="delpost"]',
			}
		},
		{siteName:'hi-pda论坛帖子内容',
			url:/^http:\/\/www\.hi-pda\.com\/forum\/viewthread/i,
			siteExample:'http://www.hi-pda.com/forum/viewthread.php?tid=646384',
			nextLink:'//a[text()="››"][@href]',
			autopager:{
				pageElement:'//form[@name="delpost"]',
			}
		},
		{siteName:'hi-pda论坛帖子列表',
			url:/^http:\/\/www\.hi-pda\.com\/forum\/forumdisplay/i,
			siteExample:'http://www.hi-pda.com/forum/forumdisplay.php?fid=2',
			nextLink:'//a[text()="››"][@href]',
			autopager:{
				pageElement:'//form[@name="moderate"]',
			}
		},
		{siteName:'猫扑大杂烩帖子内容',
			url:/http:\/\/dzh\.mop\.com\/topic\/readSub/i,
			nextLink:'//a[contains(text(),"下一页")][@href]',
			autopager:{
				pageElement:'//div[@class="huitie"]',
			}
		},
		{siteName:'水木社区帖子内容页面',
			url:/http:\/\/www\.newsmth\.net\/bbstcon/i,
			nextLink:'//a[text()="下一页"][@href]',
			useiframe:true,
			autopager:{
				useiframe:true,
				pageElement:'//body/*',
			}
		},
		{siteName:'VeryCD搜索页面',
			url:/http:\/\/www\.verycd\.com\/search\/folders.+/i,
			siteExample:'http://www.verycd.com/search/folders/opera',
			nextLink:'//div[@class="pages-nav"]/a[contains(text(),"下一页")][@href]',
			autopager:{
				pageElement:'//table[@id="results-container"]',
			}
		},
		{siteName:'照片处理网',
			url:/http:\/\/www\.photops\.com\/Article\/.+/i,
			siteExample:'http://www.photops.com/Article/xsjc/20100728172116.html',
			nextLink:'//a[text()="下一页"][@href]',
			autopager:{
				pageElement:'//body/table[last()-2]',
			}
		},
	];

	//统配规则..用来灭掉一些DZ.或者phpwind论坛系统..此组规则..优先级自动降为最低..
	var SITEINFO_TP=[
		{siteName:'Discuz论坛帖子列表页面',
			url:/^https?:\/\/[^\/]+\/(?:(?:forum)|(?:showforum)|(?:viewforum))/i,
			nextLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]',
			autopager:{
				pageElement:'//form[@method="post"][@name]',
			}
		},
		{siteName:'Discuz论坛帖子内容页面',
			url:/^https?:\/\/[^\/]+\/(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))/i,
			nextLink:'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"][@href]',
			autopager:{
				//pageElement:'//div[@class="main viewthread"]',
				pageElement:'//div[@id="postlist"]',
			}
		},
		{siteName:'phpWind论坛帖子列表页面',
			url:/^https?:\/\/[^\/]+\/(?:bbs\/)?thread/i,
			nextLink:'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
			autopager:{
				pageElement:'//div[@class="t z"] | //div[@class="z"]',
			}
		},
		{siteName:'phpWind论坛帖子内容页面',
			url:/^https?:\/\/[^\/]+\/(?:bbs\/)?read/i,
			nextLink:'//div[starts-with(@class,"pages")]/b[1]/following-sibling::a[1][not(@class)] | //div[starts-with(@class,"pages")]/ul[1]/li[b]/following-sibling::li/a[1][not(@class)]',
			autopager:{
				pageElement:'//div[@class="t5"] | //div[@class="read_t"]',
			}
		},
	];

	//黑名单,在此网页上禁止加载..3个项.分别是:名字,启用,网站正则..
	var blackList=[
		['中关村首页',true,/^http:\/\/www\.zol\.com\.cn\/(?:#.*)?$/i],
		['Gmail',true,/mail\.google\.com/i],
		['Google reader',true,/google\.com\/reader\//i],
		['优酷视频播放页面',true,/http:\/\/v\.youku\.com\/v_show\//i],
	];

	//下一页关键字,允许部分容差..例如 '下一页' 可以匹配 '下一页>' '下一页>>' '下一页 >>'等
	//容差长度控制开关为 prefix,subfix...
	var nextPageKey=[
			'下一页',
			'下一頁',
			'下1页',
			'下1頁',
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
			'››',
			'Next',
			'Next Page',
			'次へ'
	];

	//你的自定义高级规则..优先级最高..
	var CUS_SITEINFO=[
	];

	//你的统配规则,优先级最高.
	var CUS_SITEINFO_TP=[
	];

	//你的自定义关键字..此数组里面的关键字..优先级最高.
	var CUS_nextPageKey=[
	];

	//在以下网站用iframe预读..和上面一样的规则..也可以使用@exclude排除
	//默认是使用XHR预读的..你可以更改 iframeD 开关为true..那么将默认使用iframe预读.此规则只在预读模式下生效.
	var UseIframe=[
	];

	//兼容 oautopager的规则放在这里,当然..放哪个数组里面都是一样的..但是分开放.一幕了然..此规则组..优先级最低..
	var SITEINFO2=[
	];

//////////////////////////-------------规则结束-------////////////////
	function getElements(X,doc){
		var result,
					r_array=[];
		doc=doc||document;
		try{
			result=doc.querySelectorAll(X);
		}catch(e){
			try{
				result=doc.evaluate(X,doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			}catch(e){};
		};
		if(!result)return r_array;
		var i=result.snapshotLength,
					isNodeList;
		if(i===undefined){
			i=result.length;
			isNodeList=true;
		};
		for(i=i-1;i>=0;i--){
			r_array[i]=isNodeList? result[i] : result.snapshotItem(i);
		};
		result=null;
		return r_array;
	};

	function getFirstElement(X,doc,win){
		var result;
		doc=doc||document;
		win=win||window;
		if((typeof X).toLowerCase()==='string'){
			try{
				result=doc.querySelector(X);
			}catch(e){
				try{
					result=doc.evaluate(X,doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				}catch(e){};
			};
		}else{
			result=X(doc,win);
		};
		return result;
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

	//移除事件监听.卸载翻页.
	function remove_it(){
		if(prefs.pauseA){
			document.removeEventListener(AP_mouse_LEvent,AP_mouse_listener,false);
			if(prefs.noticeMe)notice('<b>状态</b>:'+'卸载即时停止翻页监听.',3000);
		};
		window.removeEventListener('scroll',autoPG,false);
		if(prefs.noticeMe)notice('<b>状态</b>:'+'卸载滚动翻页监听.',3000);
		if(FWKG){
			FWKG.style.setProperty('background-color',FWKG_color.Astop,'important');
			FW_A_Go.disabled=true;
		};
	};

	//显示预读的内容在下方..
	function display_bottom(){
		var div=document.createElement('div'),
					div2=document.createElement('div'),
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
		div2.style.cssText='\
			text-align:left!important;\
			color:red!important;\
			font-size:13px!important;\
			display:block!important;\
			float:none!important;\
			position:static!important;\
		';
		hr.style.cssText='\
			display:block!important;\
			border:1px inset #000!important;\
		';
		div.appendChild(div2);
		div.appendChild(hr);
		return{
			div:div,
			div2:div2
		};
	};

	//将字符串转成HTML文档对象..
	function String_to_doc(str){//来自oAutoPagerize;
		if(document.documentElement.nodeName.toLowerCase()!='html'){
			return new DOMParser().parseFromString(str, 'application/xhtml+xml');
		};
		var source=String(str);// Thx! jAutoPagerize#HTMLResource.createDocumentFromString http://svn.coderepos.org/share/lang/javascript/userscripts/jautopagerize.user.js
		//alert(source);
		if(!source){
			if(prefs.noticeMe)notice('没有找到html字符串.翻页被停止',3000);
			remove_it();
			return;
		};
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
		if(doc){
			/(?:(?:<body[^>]*>)|(?:<\/head>))(.*)/i.test(source.replace(/[\n\r]*/ig,''));
			var body_txt=RegExp.$1,
						no_body_txt;
			//alert(body_txt);
			if(!body_txt){
				no_body_txt=true;
				body_txt=source;
			};
			doc.body.innerHTML=body_txt;
			if(no_body_txt){
				var headChildNames={
					title: true,
					meta: true,
					link: true,
					style: true,
					base: true
				};
				var i,
							child_x;
				for(i=doc.body.childNodes.length-1;i>=0;i--){
					child_x=doc.body.childNodes[i];
					if(child_x.nodeName.toLowerCase() in headChildNames){
						doc.body.removeChild(child_x);
					};
				};
			};
			//alert(doc.documentElement.innerHTML);
			return doc;
		};
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
				working=false;
				StartAutoPG();
			}else{
				var images=str.replace(/[\n\r]/ig,'').match(/<img.*?src\s*=\s*"[^"]*"/ig);
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
							div2;
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
							div2=d_div.div2;
							document.body.appendChild(div);
						};
						div.appendChild(img);
					};
				};
				if(div2){div2.innerHTML='预读取图片张数: '+'<b>' +dimages.length+ '</b>'+'<br />'+'预读网址: '+'<b>'+nextlink +'</b>';}
			};
		};
	};
	function xhttpRequest(){
		working=true;
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
		working=false;
		StartAutoPG();
	};
	function iframeRequest(){
		working=true;
		var old_preiframe=document.getElementById('X_preiframe');
		if(old_preiframe){
			old_preiframe.parentNode.removeChild(old_preiframe);
		};
		var N_preiframe=document.createElement('iframe');
		N_preiframe.name='N_preiframe';
		N_preiframe.id='X_preiframe';
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
				var d_div=display_bottom();
				var div=d_div.div,
							div2=d_div.div2;
				div2.innerHTML='iframe全预读: '+'<br />'+'预读网址: '+'<b>'+nextlink+'</b>';
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
	function p_transition(start,end){
		var cha=end-start;
		var x_frame=Math.ceil(prefs.s_FPS*(prefs.s_duration/1000));
		var yushu=cha%x_frame;
		var zhengshu=cha>0? Math.floor(cha/x_frame) : Math.ceil(cha/x_frame),
					i=0,
					interval;
		function trans(){
			start+=(zhengshu+(i==x_frame-1? yushu : 0));
			scroll(0,start);
			i+=1;
			if(i==x_frame)clearInterval(interval);
		};
		interval=setInterval(trans,1000/prefs.s_FPS);
	};
	function P_to_up_down(e){
		e.preventDefault();
		var target=e.target;
		var number=target.getAttribute('Super_preloader');
		//获取要跳转到的那个导航..
		var updiv=document.getElementById('sepdiv'+number);
		if(!updiv)return;
		var o_scrollY=window.scrollY;
		var scrollY=updiv.getBoundingClientRect().top+o_scrollY;
		if(prefs.sepP){
			var thisY=target.parentNode.getBoundingClientRect().top+o_scrollY;
			//alert(thisY);
			scrollY=target.className=='S_go_up'? (o_scrollY-(thisY-scrollY)) : (o_scrollY+(scrollY-thisY));
			//alert(scrollY);
		}else{
			scrollY-=6;
		};
		prefs.sepT? p_transition(o_scrollY,scrollY) : scroll(0,scrollY);
	};
	function P_to_top_end(e){
		e.preventDefault();
		var scrollY=e.target.className=='S_go_top'? 0 : document.documentElement.scrollHeight;
		prefs.sepT? p_transition(window.scrollY,scrollY) : scroll(0,scrollY);
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
				min-width:366px!important;\
				box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
				-moz-box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
				-webkit-box-shadow:inset 0 10px 16px #fff,0 2px 3px rgba(0,0,0,0.1);\
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
							position:relative!important;\
							left:0!important;\
							top:0!important;\
							z-index:100!important;\
						',
						span_info;
			a=document.createElement('a');
			a.href=a.title=nextlink;
			a.innerHTML='Super_preloader: Page <b><span style="color:red!important;">'+a_pged+'</span></b>';
			a.style.cssText='\
				vertical-align:middle!important;\
				margin:0 20px!important;\
				position:relative!important;\
				left:0!important;\
				top:0!important;\
				z-index:100!important;\
				text-shadow:0 1px 1px #fff;\
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

			img_up=new Image();
			img_up.style.cssText=img_css;
			if(a_pged==1){
				img_up.src=sep_icons.up_gray;
			}else{
				img_up.src=sep_icons.up;
				img_up.addEventListener('click',P_to_up_down,false);
				img_up.title='上滚一页';
				img_up.className='S_go_up';
				img_up.setAttribute('Super_preloader',a_pged-1);
			};

			img_down=new Image();
			img_down.style.cssText=img_css;
			img_down.id='S_img_down'+a_pged;
			img_down.className='S_go_down';
			img_down.src=sep_icons.down_gray;
			img_down.setAttribute('Super_preloader',a_pged+1);

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
				z-index:98!important;\
			';
			sepdiv.appendChild(img_top);
			sepdiv.appendChild(img_up);
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
				border:none!important;\
				float:none!important;\
			';
		};
		return sepdiv
	};

	//将内容插入到网页.
	var a_insertP,
				a_pged=1,
				Sdoc,
				Swin;
	function insertContent(doc,win){
		if(A_pause){
			Sdoc=doc;
			Swin=win;
			working=false;
			return;
		};
		Sdoc=Swin=null;

		var sepdiv=P_sep(),
					fragment=document.createDocumentFragment();
		fragment.appendChild(sepdiv);
		var pageElement=getElements(a_pageElement,doc),
					i,
					ii=pageElement.length,
					Xcontent,
					scipts,
					j,
					scipts_x;
		if(ii>0){
			for(i=0;i<ii;i++){
				Xcontent=pageElement[i];
				Xcontent=doc.importNode(Xcontent,true);
				if(Xcontent.tagName.toLowerCase()=='script'){
					//alert(Xcontent.outerHTML);
					Xcontent.removeAttribute('src');
					Xcontent.textContent='';
				};
				scipts=Xcontent.getElementsByTagName('script');
				for(j=scipts.length-1;j>=0;j--){
					scipts_x=scipts[j];
					scipts_x.parentNode.removeChild(scipts_x);
				};
				fragment.appendChild(Xcontent);
			};
			if(prefs.noticeMe)notice('<b>状态</b>:'+'已取出符合:<b>'+a_pageElement+'</b>主要内容部分.',3000);
		}else{
			if(prefs.noticeMe)notice('<b style="color:red!important;">错误</b>:'+'没有找到符合:<b>'+a_pageElement+'</b>的内容,翻页被迫停止.',3000);
			remove_it();
			return;
		};

		if(!a_insertP){
			if(a_Iposition){
				a_insertP=getFirstElement(a_Iposition);
			}else{
				var ocontent=getElements(a_pageElement);
				ocontent=ocontent[ocontent.length-1];
				a_insertP=ocontent.nextSibling? ocontent.nextSibling : ocontent.parentNode.appendChild(document.createTextNode(' '));
			};
			if(!a_insertP){
				if(prefs.noticeMe)notice('<b style="color:red!important;">错误</b>:'+'没有找到符合'+(a_Iposition? ('<b>'+a_Iposition+'<b>') : '')+'插入相关节点',3000);
				remove_it();
				return;
			}else{
				if(prefs.noticeMe)notice('<b>状态</b>:'+'已获得'+(a_Iposition? ('<b>'+a_Iposition+'<b>') : '')+'插入相关节点(保存此节点)',3000);
			};
		};

		if(a_IMethod==2){
			a_insertP.parentNode.appendChild(fragment);
		}else{
			a_insertP.parentNode.insertBefore(fragment,a_insertP);
		};

		if(a_replaceE){
			var oldnav=getElements(a_replaceE);
			var oldnav_lt=oldnav.length;
			//alert(oldnav_lt);
			if(oldnav_lt!=0){
				var newnav=getElements(a_replaceE,doc);
				var newnav_lt=newnav.length;
				//alert(newnav_lt);
				if(newnav_lt==oldnav_lt){
					var k,
								kk,
								oldnav_x,
								newnav_x;
					for(k=0,kk=newnav_lt;k<kk;k++){
						oldnav_x=oldnav[k];
						newnav_x=newnav[k];
						newnav_x=doc.importNode(newnav_x,true);
						oldnav_x.parentNode.replaceChild(newnav_x,oldnav_x);
					};
				};
			};
		};

		var pre_img_down=document.getElementById('S_img_down'+(a_pged-1));
		if(pre_img_down){
			pre_img_down.addEventListener('click',P_to_up_down,false);
			pre_img_down.src=sep_icons.down;
			pre_img_down.title='下滚一页';
		};

		var ahref=getFirstElement(a_linkx,doc,win||doc);

		//修复chrome a元素取不到href的bug?;
		if(window.chrome && ahref && ahref.tagName){
			ahref=doc.importNode(ahref,true);
			ahref.style.cssText='\
				display:none!important;\
			';
			ahref.id='chrome_get_ahref';
			document.body.appendChild(ahref);
			ahref=ahref.href;
			document.body.removeChild(document.getElementById('chrome_get_ahref'));
		};

		if(ahref && (ahref=String(ahref)) && ahref!=nextlink){
			nextlink=ahref;
			if(a_pged>=a_maxpage){
				if(prefs.noticeMe)notice('<b>状态</b>:'+'达到最大的翻页数量:<b>'+a_maxpage+'</b>翻页将停止.',3000);
				remove_it();
				return;
			};
			a_pged+=1;
			if(prefs.noticeMe)notice('<b>状态</b>:'+'获得下一页链接:<b>'+nextlink+'</b>',3000);
			g_htmldoc=g_htmlwin=null;
			if(a_ipages_enable && a_pged-ipages_TNM>=0){
				notice('<b>状态</b>:'+'连续翻页结束,当前总翻页数量为:<b style="color:red!important;">'+(a_pged-1)+'</b>',1000);
				a_ipages_enable=false;
			};
			if(prefs.Aplus || a_ipages_enable){
				a_iframepre? iframeRequest() : xhttpRequest();
			}else{
				working=false;
			};
		}else{
			nextlink=null;
			if(prefs.noticeMe)notice('<b style="color:#E50083!important;">状态</b>:'+'获取下一页的链接失败,可能已达最后一页,或者出现错误,JS将退出.',3000);
			remove_it();
			return;
		};
	};

	//获取剩余高度
	function getRemain(){
		var scrolly=window.scrollY,
					WI=window.innerHeight,
					scrollH=document.documentElement.scrollHeight;
		return (scrollH-scrolly-WI)/WI;
	};

	//翻页相关函数.
	var working;
	function StartAutoPG(){
		if(!working && (getRemain()<=a_remain || a_ipages_enable)){
			working=true;
			if(Sdoc){//翻页pause中..
				insertContent(Sdoc,Swin);
				return;
			};
			if(g_htmldoc){
				insertContent(g_htmldoc,g_htmlwin);
			}else{
				if(!prefs.Aplus){
					a_iframepre? iframeRequest() : xhttpRequest();
				};
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
	var FWKG,
				FW_A_Go;
	function floatWinodw(){
		if(FWKG)return;
		var style=document.createElement('style');
		style.type='text/css';
		style.textContent='\
			/*最外层容器*/\
			#N_pre_FW{\
				position:absolute!important;\
				z-index:2147483647!important;\
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
				opacity:0!important;\
				-o-transition:opacity 0.3s ease-in-out!important;\
				-moz-transition:opacity 0.3s ease-in-out!important;\
				-webkit-transition:opacity 0.3s ease-in-out!important;\
			}\
			/*悬浮开关样式*/\
			#N_pre_FWKG{\
				width:10px!important;\
				height:10px!important;\
				padding:0!important;\
				margin:0!important;\
				background-color:black!important;\
				opacity:0.8!important;\
				float:right!important;\
				-o-transition:background-color 0.2s ease-in-out;\
				-webkit-transition:background-color 0.2s ease-in-out;\
				-moz-transition:background-color 0.2s ease-in-out;\
			}\
			/*鼠标移上去,显示控制窗口*/\
			#N_pre_FW:hover #N_pre_FWC{\
				display:block!important;\
				opacity:0.96!important;\
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
			#N_pre_FW_input_rq,\
			#N_pre_FW_A_Go_rq{\
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
			}\
			/*下面的几个开关的容器*/\
			#N_pre_FW_input_rq,\
			#N_pre_FW_A_Go_rq{\
				padding:1px 0 0 0!important;\
				border-top:1px solid #D3D3D3!important;\
			}\
			/*按钮样式*/\
			#N_pre_FWsave,\
			#N_pre_FW_A_Go{\
				padding:0 8px!important;\
			}\
			/*那个输入框的样式*/\
			#N_pre_FW_A_NM{\
				width:28px!important;\
				height:16px!important;\
				font-size:12px!important;\
				border:1px solid #AEB0B6!important;\
			}\
		';
		document.getElementsByTagName('head')[0].appendChild(style);
		var div=document.createElement('div');
		div.id="N_pre_FW";
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
				<div id="N_pre_FW_A_Go_rq">\
					<input id="N_pre_FW_A_Go_enable" type="checkbox" title="加载JS的时候,使用立即翻页.(翻页模式时有效)" />启用\
					翻<input id="N_pre_FW_A_NM" type="text" maxlength="3" title="立即翻页的页数(最大999)" />页\
					<input id="N_pre_FW_A_Go" type="button" title="立即加载输入框中的页数" value="开始" />\
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
		div.addEventListener('click',function(e){e.stopPropagation()},false);
		div.addEventListener('dblclick',function(e){e.stopPropagation()},false);

		function GE(id){
			return document.getElementById(id)
		};

		FWKG=GE('N_pre_FWKG');
		FW_A_Go=GE('N_pre_FW_A_Go');
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
					FWsave=GE('N_pre_FWsave'),
					FWdebug=GE('N_pre_FWdebug'),
					FW_FA=GE('N_pre_FW_FA'),
					FW_A_Go_enable=GE('N_pre_FW_A_Go_enable'),
					FW_A_NM=GE('N_pre_FW_A_NM'),
					N_pre_FW_mode_fy=GE('N_pre_FW_mode_fy_rq');

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
						C_F_autopager=FW_FA.checked,
						C_a_ipages_enable=FW_A_Go_enable.checked,
						C_ipages_TNM=FW_A_NM.value;
			//高级模式...
			if(siteEXP){
				var C_a_iframepre=mode_fy_sel.selectedIndex==0? false : true,
							C_a_enable=mode_fy.checked,
							C_setValue,
							findit,
							value_x;
				C_value='['+siteEXP+','+C_C_enable+','+C_a_iframepre+','+C_yd_iframepre+','+C_a_enable+','+C_view+','+C_F_autopager+','+C_a_ipages_enable+','+C_ipages_TNM+']';
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
				C_value='['+C_C_enable+','+C_yd_iframepre+','+C_view+','+C_F_autopager+','+C_a_ipages_enable+','+C_ipages_TNM+']';
				//alert(C_value);
				saveSetValue(C_value);
			};
			if(prefs.FW_RAS)setTimeout("location.reload()",0);
		},false);

		if(!a_enable){
			mode_yd.checked=true;
		};

		if(yd_iframepre){
			mode_yd_I.selected=true;
		}else{
			mode_yd_X.selected=true;
		};

		if(a_enable!==undefined){
			mode_yd.addEventListener('change',function(){
				if(this.checked){
					FWdebug.disabled=false;
					FW_FA.disabled=true;
					FW_A_Go_enable.disabled=true;
				};
			},false);
			mode_fy.addEventListener('change',function(){
				if(this.checked){
					FWdebug.disabled=true;
					FW_FA.disabled=false;
					FW_A_Go_enable.disabled=false;
				};
			},false);
			if(a_enable){
				mode_fy.checked=true;
				FWdebug.disabled=true;
			}else{
				FW_FA.disabled=true;
				FW_A_Go_enable.disabled=true;
			};
			if(a_iframepre){
				mode_fy_I.selected=true;
			}else{
				mode_fy_X.selected=true;
			};
		}else{
			//N_pre_FW_mode_fy.style.setProperty('display','none','important');
			if(!(Boolean(F_autopager)==Boolean(prefs.Dbottom))){
				if(F_autopager){
					FWdebug.disabled=true;
				}else{
					FW_FA.disabled=true;
				};
			};
			if(!F_autopager)FW_A_Go_enable.disabled=true;
			FWdebug.addEventListener('change',function(){
				FW_FA.disabled=this.checked;
			},false);
			FW_FA.addEventListener('change',function(){
				FWdebug.disabled=this.checked;
				FW_A_Go_enable.disabled=!this.checked;
			},false);
			mode_fy.disabled=mode_fy_sel.disabled=true;
		};

		if(C_enable){
			if(autopager_mode){
				A_pause? FWKG.style.setProperty('background-color',FWKG_color.Apause,'important') : FWKG.style.setProperty('background-color',FWKG_color.autopager,'important')
				FW_A_Go.addEventListener('click',function(){
					var value=Number(FW_A_NM.value);
					if(!isNaN(value) && value>=1){
						FW_A_Go.disabled=true;
						setTimeout(function(){if(!A_pause)FW_A_Go.disabled=false},1000);
						ipages_TNM=Math.max(ipages_TNM,a_pged)+value;
						//alert(ipages_TNM);
						a_ipages_enable=true;
						notice('<b>状态</b>:'+'当前已翻页数量:<b>'+(a_pged-1)+'</b>,'+'连续翻页到第<b style="color:red!important;">'+(ipages_TNM-1)+'</b>页.',1000);
						StartAutoPG();
					};
				},false);
			}else{
				FWKG.style.setProperty('background-color',FWKG_color.prefetch,'important');
				FW_A_Go.disabled=true;
			};
		}else{
			FW_A_Go.disabled=true;
		};

		FW_A_NM.value=isNaN(a_ipages_NM)? 1 : a_ipages_NM;
		FW_A_Go_enable.checked=a_ipages_enable;
		FW_FA.checked=F_autopager;
		FWenable.checked=C_enable;
		FWdebug.checked=prefs.Dbottom;

		var timeout,
					vertical=parseInt(prefs.FW_offset[0]),
					horiz=parseInt(prefs.FW_offset[1]);
		function gs(){
			if (timeout){clearTimeout(timeout)};
			timeout=setTimeout(gss,200);
		};
		function gss(){
			var scrolly=window.scrollY;
			var scrollx=window.scrollX;
			switch(Number(prefs.FW_position)){
				case 1:{
					div.style.top=vertical+scrolly+'px';
					div.style.left=horiz+scrollx+'px';
				}break;
				case 2:{
					div.style.top=vertical+scrolly+'px';
					div.style.right=horiz-scrollx+'px';
				}break;
				case 3:{
					div.style.bottom=vertical-scrolly+'px';;
					div.style.right=horiz-scrollx+'px';
				}break;
				case 4:{
					div.style.bottom=vertical-scrolly+'px';;
					div.style.left=horiz+scrollx+'px';
				}break;
				default:break;
			};
		};
		gss();
		window.addEventListener('scroll',gs,false);
	};

	//通知..
	var alertDIV,
				adivtimeout,
				adivtimeout2,
				pre_html_txt=[],
				pre_added=0,
				G_Hlong;
	prefs.NM_history=prefs.noticeMe? prefs.NM_history : 2;
	function notice_mouseover(){
		clearTimeout(adivtimeout);
		clearTimeout(adivtimeout2);
		alertDIV.style.setProperty('display','block','important');
		setTimeout(function(){
			alertDIV.style.setProperty('opacity','0.96','important');
		},0);
	};
	function notice_mouseout(){
		adivtimeout=setTimeout(function(){
			alertDIV.style.setProperty('opacity','0','important');
		},(G_Hlong-200));
		adivtimeout2=setTimeout(function(){
			alertDIV.style.setProperty('display','none','important');
		},G_Hlong);
	};
	function notice(html_txt,Hlong){
		if(!alertDIV){
			alertDIV=document.createElement('div');
			alertDIV.style.cssText='\
				position:fixed!important;\
				z-index:2147483647!important;\
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
				-o-transition:opacity 0.3s ease-in-out;\
				-webkit-transition:opacity 0.3s ease-in-out;\
				-moz-transition:opacity 0.3s ease-in-out;\
			';
			document.body.appendChild(alertDIV);
			alertDIV.addEventListener('mouseover',notice_mouseover,false);
			alertDIV.addEventListener('mouseout',notice_mouseout,false);
		};
		if(prefs.noticeMe)Hlong=Math.max(Hlong,3001);
		G_Hlong=Hlong;
		notice_mouseover();
		alertDIV.innerHTML=(pre_added>0? pre_html_txt.join('<br />')+'<hr style="margin:5px 0!important;display:block!important;border:1px inset #ccc!important;"/>':'')+html_txt;
		if(prefs.NM_history>0){
			if(prefs.NM_history>pre_added){
				pre_html_txt[pre_added]=html_txt;
				pre_added+=1;
			}else{
				pre_html_txt.shift();
				pre_html_txt.push(html_txt);
			};
		};
		notice_mouseout();
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
				a_ipages_enable,
				a_ipages_NM,
				a_linkx,
				F_autopager,
				C_enable=true,
				autopager_mode,
				ipages_TNM=0,
				A_pause,
				AP_mouse_listener,
				AP_mouse_LEvent;
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
					blacklist_x,
					URL=location.href;
		for(i=0,ii=blackList.length;i<ii;i++){
			blacklist_x=blackList[i];
			if(blacklist_x[1] && toRegExp(blacklist_x[2]).test(URL)){
				if(prefs.noticeMe)notice('<b>状态</b>:黑名单<b>'+blacklist_x[2]+'</b>匹配到了当前网址,JS将退出.',3000);
				return;
			};
		};

		//是否在frame上加载..
		if(prefs.DisableI && self!=window.parent){
			var isreturn=true,
						DIExclude_x;
			for(i=0,ii=DIExclude.length;i<ii;i++){
				DIExclude_x=DIExclude[i];
				if(DIExclude_x[1] && DIExclude_x[2].test(URL)){
					isreturn=false;
					break;
				};
			};
			if(isreturn){
				if(prefs.noticeMe)notice('<b>状态</b>:'+'此页面为为非顶层窗口,JS不加载,如果你确定要在此页面上加载.那么设置<b>DisableI</b>为false',3000);
				return;
			};
		};

		//规则合并
		try{
			SITEINFO_TP=CUS_SITEINFO_TP.concat(SITEINFO_TP);
		}catch(e){};
		for(i=0,ii=SITEINFO_TP.length;i<ii;i++){
			SITEINFO_TP[i].TP=true;
		};
		try{
			SITEINFO=SITEINFO.concat(SITEINFO2,SITEINFO_TP);
			SITEINFO=CUS_SITEINFO.concat(SITEINFO);
		}catch(e){};
		//firefox GM中的this 不等于 window?
		var G_window=this.unsafeWindow || window;
		if(prefs.G_rules[0] && !window.chrome){
			var WA=G_window[prefs.G_rules[1]];
			//通过unsafeWindow无法使用instanceof运算符?
			if(WA){
				if(prefs.noticeMe)notice('<b>状态</b>:'+'变量为<b>'+prefs.G_rules[1]+'</b>的规则被找到,合并规则.',3000);
				SITEINFO=SITEINFO.concat(WA);
				WA=null;
			};
		};

		//正式开始.
		//第一阶段..分析高级模式..
		var SII,
					oTSP,
					TSP,
					getlinkm;
		for(i=0,ii=SITEINFO.length;i<ii;i++){
			SII=SITEINFO[i];
			oTSP=SII.url || SII.siteExp;
			TSP=toRegExp(oTSP);
			if(TSP.test(URL)){
				getlinkm=SII.nextLink || SII.getNPL;
				//alert(getlinkm);
				nextlink=getFirstElement(getlinkm);
				//nextlink='javascript:';
				//alert(nextlink);
				if(nextlink){
					if(prefs.noticeMe)notice('<b>状态</b>:'+'找到符合当前站点的<b>高级规则</b>,规则的URL项为<b>'+oTSP+'</b>',3000);
					siteEXP=TSP;
					//alert(siteEXP);
					a_linkx=getlinkm;
					C_enable=(SII.enable===undefined)? SITEINFO_D.enable : SII.enable;
					yd_iframepre=(SII.useiframe===undefined)? SITEINFO_D.useiframe : SII.useiframe;
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
						//alert(SII.TP);
						if(SII.TP && getElements(a_pageElement).length==0)break;
						a_enable=(SII.autopager.enable===undefined)? SITEINFO_D.autopager.enable : SII.autopager.enable;
						a_iframepre=(SII.autopager.useiframe===undefined)? SITEINFO_D.autopager.useiframe : SII.autopager.useiframe;
						a_remain=(SII.autopager.remain===undefined)? SITEINFO_D.autopager.remain : SII.autopager.remain;
						a_maxpage=(SII.autopager.maxpage===undefined)? SITEINFO_D.autopager.maxpage : SII.autopager.maxpage;
						a_separator=(SII.autopager.separator===undefined)? SITEINFO_D.autopager.separator : SII.autopager.separator;
						a_replaceE=SII.autopager.replaceE;
						if(SII.autopager.HT_insert && SII.autopager.HT_insert.length==2){
							a_Iposition=SII.autopager.HT_insert[0];
							a_IMethod=SII.autopager.HT_insert[1];
						};
						if(SII.autopager.ipages && SII.autopager.ipages.length==2){
							a_ipages_enable=SII.autopager.ipages[0];
							a_ipages_NM=SII.autopager.ipages[1];
						}else{
							a_ipages_enable=SITEINFO_D.autopager.ipages[0];
							a_ipages_NM=SITEINFO_D.autopager.ipages[1];
						};
					};
					break;
				};
			};
		};

		//第二阶段.核对关键字..
		var alllinks,
					alllinksl,
					KWgetlinkT;
		if(!nextlink && prefs.keymatch){
			alllinks=document.links;
			alllinksl=alllinks.length;
			//alert('全部锚数量: '+ alllinksl);
			try{
				nextPageKey=CUS_nextPageKey.concat(nextPageKey);
			}catch(e){};
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
						domain=document.domain || (URL.match(/https?:\/\/([^\/]+).*/)[1]),
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
				linktext=linktext.replace(/^\s+|\s+$/g,'');//去掉两头的空格.
				if(!linktext)continue;
				linktext=prefs.cases? linktext : linktext.toLowerCase();
				for(j=0,jj=nextPageKey.length;j<jj;j++){
					tempktext=nextPageKey[j];
					keytext=prefs.cases? tempktext : tempktext.toLowerCase();
					Kindexof=linktext.indexOf(keytext);
					if(Kindexof!=-1 && Kindexof<=prefs.prefix && (Kindexof+keytext.length+prefs.subfix)>=linktext.length){
						tempahref=tempa.href;
						//alert(tempahref);
						//alert(domain);
						if(tempahref.search(/^https?/i)==0 && tempahref.match(/^https?:\/\/[^\/]*/i)[0].indexOf(domain)!=-1){
							if(!/^#/i.test(tempahref.replace(URL,''))){
								//alert(linktext);
								//alert(keytext);
								nextlink=tempa;
								Atext=img_link? (aimg_x.alt || aimg_x.title) : (nextlink.textContent || nextlink.title);
								KWgetlinkT=img_link? '//a[descendant::img[@alt="'+Atext+'" or @title="'+Atext+'"]][@href]'
									:
								(function(D){
									var links=D.links,
									links_x,
									Ttxt=Atext;
									for(var i=0,ii=links.length;i<ii;i++){
										links_x=links[i];
										if((links_x.textContent || links_x.title)==Ttxt)return links_x;
									};
								});
								//KWgetlinkT=img_link? '//a[descendant::img[@alt="'+Atext+'" or @title="'+Atext+'"]][@href]' : '//a[descendant-or-self::*[text()="'+Atext+'" or @title="'+Atext+'"]][@href]';
								//alert(KWgetlinkT);
								if(prefs.noticeMe)notice('<b>状态</b>:'+'找到符合当前站点的<b>关键字规则</b>,链接关键字为<b>'+Atext+'</b>',3000);
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
		if(!nextlink){
			if(prefs.noticeMe)notice('<b>状态</b>:'+'没有找到下一页链接,JS退出.',3000);
			return;
		};

//-----------------------------------//
		//载入设置..
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
							a_ipages_enable=value_x[7];
							a_ipages_NM=value_x[8];
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
					a_ipages_enable=C_setValue[4];
					a_ipages_NM=C_setValue[5];
				};
			};
		};

		//分析..强制拼接..
		if(prefs.floatWindow){
			if(F_autopager && a_enable!==false){
				a_linkx=a_linkx || KWgetlinkT;
				//alert(a_linkx);
				a_pageElement='//body[1]/*';
				a_iframepre=a_enable? a_iframepre : yd_iframepre;
				a_remain=a_enable? a_remain : SITEINFO_D.autopager.remain;
				a_maxpage=a_enable? a_maxpage : SITEINFO_D.autopager.maxpage;
				a_separator=a_enable? a_separator : SITEINFO_D.autopager.separator;
				a_replaceE=a_Iposition=a_IMethod=null;
			};
		};

		//综合分析..最后是否要自动翻页..
		autopager_mode=a_enable || (F_autopager && a_enable===undefined);

		//是否自动显示悬浮窗..
		if(prefs.floatWindow){
			if(prefs.FW_autoD || window.chrome){
				floatWinodw();
			}else{
				G_window.N_pre_DFW=floatWinodw;
			};
		};

		//下一页链接对象和字符串..
		var o_nextlink=nextlink;
		nextlink=String(nextlink);

		if(prefs.noticeMe)notice('<b>状态</b>:'+'获得下一页链接:<b>'+nextlink+'</b>',3000);

		if(!C_enable){
			if(prefs.noticeMe)notice('<b>状态</b>:'+'启用JS开关为false,JS将退出.',3000);
			return;
		};

		//鼠标手势翻页函数...
		G_window.N_PreNextLink=function(){
			if(nextlink){
				location.href=nextlink;
			};
		};

		if(autopager_mode){
			ipages_TNM=a_ipages_enable? Math.max(a_ipages_NM,0)+1 : 0;
			if(prefs.noticeMe)notice('<b>状态</b>:'+'进入自动翻页模式,翻页方式为:<b>'+(a_iframepre? 'iframe_翻页':'XHR翻页')+'</b>',3000);
			if(prefs.Aplus || a_ipages_enable){
				a_iframepre? iframeRequest() : xhttpRequest();
			}else{
				StartAutoPG();
			};
			window.addEventListener('scroll',autoPG,false);
			if(prefs.pauseA){
				var Sbutton=['target','shiftKey','ctrlKey','altKey'],
							Sclickm=['mousedown','dblclick'];
				function A_pause_Fn(){
					A_pause=A_pause? !prefs.switchA : true;
					if(A_pause){
						notice('<b>状态</b>:'+'自动翻页<span style="color:red!important;"><b>暂停</b></span>.',1000);
						if(FWKG)FWKG.style.setProperty('background-color',FWKG_color.Apause,'important');
						if(prefs.stop_ipage){
							a_ipages_enable=false;
							ipages_TNM=0;
						};
						if(FW_A_Go)FW_A_Go.disabled=true;
					}else{
						notice('<b>状态</b>:'+'自动翻页<span style="color:red!important;"><b>启用</b></span>.',1000);
						if(FWKG){
							FWKG.style.setProperty('background-color',FWKG_color.autopager,'important');
							FW_A_Go.disabled=false;
						};
						StartAutoPG();
					};
				};
				function SMOUSEUP(e){
					clearTimeout(Sctimeout);
					document.removeEventListener('mouseup',SMOUSEUP,false);
				};
				AP_mouse_LEvent=prefs.mouseA? Sclickm[0] : Sclickm[1];
				var button_1=Sbutton[prefs.Pbutton[0]],
							button_2=Sbutton[prefs.Pbutton[1]],
							button_3=Sbutton[prefs.Pbutton[2]],
							Sctimeout;
				AP_mouse_listener=function(e){
					if(e[button_1] && e[button_2] && e[button_3]){
						if(AP_mouse_LEvent=='mousedown'){
							document.addEventListener('mouseup',SMOUSEUP,false);
							Sctimeout=setTimeout(A_pause_Fn,prefs.Atimeout);
						}else{
							A_pause_Fn();
						};
					};
				};
				document.addEventListener(AP_mouse_LEvent,AP_mouse_listener,false);
				if(prefs.noticeMe){
					var Ch_bName={
						target:'',
						shiftKey:' Shift键 ',
						ctrlKey:' Ctrl键 ',
						altKey:' Alt键 '
					};
					var x_bottom=Ch_bName[button_1]+Ch_bName[button_2]+Ch_bName[button_3];
					notice('<b>状态</b>:'+'注册即时停止翻页监听,快捷键为:<b>'+x_bottom+(AP_mouse_LEvent=='mousedown'? (' 按住鼠标左键 '+prefs.Atimeout+'ms'):' 双击鼠标左键')+' </b>',3000);
				};
			};
		}else{
			if(prefs.noticeMe)notice('<b>状态</b>:'+'进入预读模式,预读方式为:<b>'+(yd_iframepre? 'iframe_预读':'XHR_预读')+'</b>',3000);
			yd_iframepre? iframeRequest() : xhttpRequest();
			if(prefs.linkalert && (typeof o_nextlink).toLowerCase()!='string'){
				var outlstyle=prefs.alertstyle.join(' ');
				function addOLS(a){
					a.style.outline=outlstyle;
					a.title+=yd_iframepre? ' 此页面所有内容,使用Iframe预读...' : ' 此页面所有图片,使用XHR预读...';
				};
				if(prefs.noticeMe)notice('<b>状态</b>:'+'标示进入下一页<b>'+(prefs.allalert? '所有':'找到的那个')+'</b>链接.',3000);
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


//修正一些网站的自动翻页..
(function(){
	var URL=location.href;
	if(window.name=='N_preiframe'){
		//修改百度iframe请求..无限翻页..
		if(window.opera && /^http:\/\/(?:(?:image)|(?:mp3))\.baidu\.com\/.+/i.test(URL)){
			window.opera.addEventListener('BeforeScript',function(e){
				e.element.text=e.element.text.replace(/top\.location=self\.location/gi,'');
			},false);
		};
	};

	//修正天涯帖子内容页面的使用.强制拼接.的问题.
	if(/http:\/\/www\.tianya\.cn\/.+\/content\/.+/i.test(URL)){
		var style=document.createElement('style');
		style.type='text/css';
		style.textContent='\
			div.wrapper{\
				height:auto!important;\
			}\
		';
		document.getElementsByTagName('head')[0].appendChild(style);
	};
})();
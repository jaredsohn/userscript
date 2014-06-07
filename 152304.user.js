// ==UserScript==
// @name           picViewer
// @author         NLF
// @description    围观图（support （opera，firefox（GreaseMonkey），chrome） Latest Stable）
// @version        4.1.2.9
// @created        2011-6-15
// @lastUpdated    2012-11-12
// @grant          none
// @icon 
// @run-at         document-start
// @namespace      http://userscripts.org/users/NLF
// @homepage       http://userscripts.org/scripts/show/105741
// @downloadURL    https://userscripts.org/scripts/source/105741.user.js
// @updateURL      https://userscripts.org/scripts/source/105741.meta.js
// @include *
// ==/UserScript==

//fierfox GM环境中：
	//当存在 @grant 时：
		//@grant none 时，脚本直接运行在真实环境，所有GM_函数为undefined
		//@grant GM_* 时，脚本运行在沙箱中，并且只有声明的GM_函数能访问，其他未声明的为undefined
	//当没有 @grant 时：
		//脚本会搜索GM_开头的函数
		//如果搜索到了（哪怕是注释中发现的），那么脚本运行在沙箱中，并且所有GM_函数可访问
		//如果没有搜索到，那么运行在真实环境中，所有GM_函数为undefined


(function(topObject,window,document){
	'use strict';

	function init(topObject,window,document,arrayFn,envir){
		//一些设定。
		var prefs={
			floatBar:{//浮动工具栏相关设置.
				butonOrder:['actual','current','magnifier','gallery'],//按钮排列顺序'actual'(实际的图片),'current'(当前显示的图片),'magnifier'(放大镜观察),'gallery'(图集)
				showDelay:366,//浮动工具栏显示延时.单位(毫秒)
				hideDelay:333,//浮动工具栏隐藏延时.单位(毫秒)
				position:'top left',// 取值为: 'top left'(图片左上角) 或者 'top right'(图片右上角) 'bottom right'(图片右下角) 'bottom left'(图片左下角);
				offset:{//浮动工具栏偏移.单位(像素)
					x:-15,//x轴偏移(正值,向右偏移,负值向左)
					y:-15,//y轴偏移(正值,向下,负值向上)
				},
				forceShow:{//在没有被缩放的图片上,但是大小超过下面设定的尺寸时,强制显示浮动框.(以便进行旋转,放大,翻转等等操作)..
					enabled:true,//启用强制显示.
					size:{//图片尺寸.单位(像素);
						w:166,
						h:166,
					},
				},
				minSizeLimit:{//就算是图片被缩放了(看到的图片被设定了width或者height限定了大小,这种情况下),如果没有被缩放的原图片小于设定值,那么也不显示浮动工具栏.
					w:100,
					h:100,
				},
			},

			magnifier:{//放大镜的设置.
				radius:77,//默认半径.单位(像素).
				wheelZoom:{//滚轮缩放.
					enabled:true,
					pauseFirst:true,//需要暂停(单击暂停)后,才能缩放.(推荐,否则因为放大镜会跟着鼠标,如果放大镜过大,那么会影响滚动.)..
					range:[0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放的范围
				},
			},

			gallery:{//图库相关设定
				sideBarPosition:'bottom',//'top' 'right' 'bottom' 'left'  四个可能值
				zoom:{//滚轮缩放
					range:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放比例.(不要出现负数,谢谢-_-!~)
					mouseWheelZoom:true,//是否允许使用滚轮缩放。
				},
			},

			imgWindow:{//图片窗相关设置
				firstOpen:{//第一次打开如何处理
					fitToScreen:false,//适应屏幕,并且水平垂直居中(适应方式为contain，非cover).
					//下面的设置，当上面的fitToScreen为false时生效
					horizontallyCenter:[false,true],//水平居中[当图片宽度大于屏幕宽时，当图片宽度小于屏幕宽时]
					verticallyCenter:[false,true],//垂直居中[当图片高度大于屏幕高时，当图片高度小于屏幕高时]
				},
				overlayer:{//覆盖层.
					shown:false,//显示
					color:'rgba(0,0,0,0.73)',//颜色和不透明度设置.
					clickToClose:[true,'click'],//[是否使用点击关闭窗口 "true,false"，关闭触发方式，"click,dblclick"]
				},
				zoom:{//滚轮缩放
					range:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放比例.(不要出现负数,谢谢-_-!~)
					mouseWheelZoom:true,//是否允许使用滚轮缩放。
				},
			},

			//旋转的时候，按住shift键时,旋转的步进.单位:度.
			shiftRotateStep:15,

			//等图片完全载入后,才开始执行弹出,放大等等操作,
			//按住ctrl键的时候,可以临时执行和这个设定相反的设定.
			waitImgLoad:true,

			//框架里面的图片在顶层窗口展示出来，但是当frame与顶层窗口domain不一样的时候，可能导致图片被反盗链拦截，
			//按住shift键，可以临时执行和这个设定相反的设定
			framesPicOpenInTopWindow:true,
		};


		//各网站高级规则;
		var siteInfo=[
			{siteName:"google图片搜索",
				//网址例子.(方便测试.查看.之类的)
				siteExample:"http://www.google.com.hk/search?q=opera&tbm=isch",
				//是否启用
				enabled:true,
				//站点正则
				url:/https?:\/\/www.google(\.\w{1,3}){1,3}\/search\?.*&tbm=isch/,
				//鼠标左键点击直接打开..（这个只是当高级规则的getImage()返回图片的时候生效）
				clikToOpen:{
					enabled:true,
					preventDefault:true,//是否尝试阻止点击的默认行为（比如如果是你点的是一个链接，默认行为是打开这个链接，如果是true，js会尝试阻止链接的打开(如果想临时打开这个链接，请使用右键的打开命令)）
					type:'actual',//默认的打开方式: 'actual'(弹出,原始图片) 'magnifier'(放大镜) 'current'(弹出,当前图片)
				},
				//获取图片实际地址的处理函数,
				//this 为当前鼠标悬浮图片的引用,
				//第一个参数为当前图片的引用,
				//第二个参数为包裹当前图片的第一个a元素(可能不存在).
				getImage:function(img,a){
					if(!a)return;
					return (a.href.match(/imgurl=(.*?\.\w{1,5})&/i) || [])[1]; 
				},
			},
			{sitename:"豆瓣",
				siteExample:"http://movie.douban.com/photos/photo/1000656155/",
				enabled:true,
				url:/^https?:\/\/[^.]*\.douban\.com/i,
				getImage:function(){
					var oldsrc=this.src;
					var newsrc=oldsrc.replace(/\/view\/photo\/photo\/public\//i,'/view/photo/raw/public/');
					if(newsrc!=oldsrc)return newsrc;
				}
			},
			{sitename:"deviantart",
				enabled:true,
				url:/^https?:\/\/[^.]*\.deviantart\.com/i,
				siteExample:"http://www.deviantart.com",
				getImage:function(){
					var oldsrc=this.src;
					var newsrc=oldsrc.replace(/(http:\/\/[^\/]+\/fs\d+\/)200H\/(.*)/i,'$1$2');
					return newsrc==oldsrc? '' : newsrc;
				},
			},
			{sitename:"opera官方论坛",
				enabled:true,
				url:/^http:\/\/bbs\.operachina\.com/i,
				siteExample:"http://bbs.operachina.com",
				getImage:function(){
					var src=this.src;
					if(/file.php\?id=\d+$/i.test(src)){
						return src+'&mode=view';
					};
				},
			},
			{sitename:"QQ微博",
				enabled:true,
				url:/^http:\/\/[^\/]*t\.qq\.com\//i,
				siteExample:"http://t.qq.com/p/news",
				getImage:function(img){
					var pic=/(\.qpic\.cn\/mblogpic\/\w+)\/\d+/i;//图片
					var head=/(\.qlogo\.cn\/mbloghead\/\w+)\/\d+/i;//头像.
					var oldsrc=this.src;
					var newsrc;
					if(pic.test(oldsrc)){
						newsrc=oldsrc.replace(pic,'$1/2000');
						return newsrc==oldsrc? '' : newsrc;;
					}else if(head.test(oldsrc)){
						newsrc=oldsrc.replace(head,'$1/0');
						return newsrc==oldsrc? '' : newsrc;;
					};
				},
			},
			{sitename:"新浪微博",
				enabled:true,
				url:/^http:\/\/weibo\.com/i,
				siteExample:"http://weibo.com/pub/?source=toptray",
				getImage:function(img){
					var oldsrc=this.src;
					var pic=/(\.sinaimg\.cn\/)(?:bmiddle|thumbnail)/i;//图片.
					var head=/(\.sinaimg\.cn\/\d+)\/50\//i;//头像.
					var photoList=/\.sinaimg\.cn\/thumb150\/\w+/i//相册
					var newsrc;
					if(pic.test(oldsrc)){
						newsrc=oldsrc.replace(pic,'$1large');
						return newsrc==oldsrc? '' : newsrc;
					}else if(head.test(oldsrc)){
						newsrc=oldsrc.replace(head,'$1/180/');
						return newsrc==oldsrc? '' : newsrc;
					}else if(photoList.test(oldsrc)){
						newsrc=oldsrc.replace('/thumb150/','/mw690/');
						return newsrc==oldsrc? '' : newsrc;
					};
				},
			},
			{sitename:"pixiv",
				enabled:true,
				url:/^http:\/\/www\.pixiv\.net/i,
				getImage:function(img){
					var oldsrc=this.src;
					var reg=/(\d+)(_\w)(\.\w{2,5})$/i
					if(reg.test(oldsrc)){
						return oldsrc.replace(reg,'$1$3');
					};
				},
			},
			{sitename:"沪江碎碎",
				enabled:true,
				url:/^https?:\/\/([^.]+\.)*(?:yeshj\.com|hjenglish\.com|hujiang\.com)/i,
				getImage:function(img){
					var oldsrc=this.src;
					var reg=/^(https?:\/\/(?:[^.]+\.)*hjfile.cn\/.+)(_(?:s|m))(\.\w+)$/i;
					if(reg.test(oldsrc)){
						return oldsrc.replace(reg,'$1$3');
					};
				},
			},
			{sitename:"百度贴吧",
				enabled:true,
				url:/^http:\/\/tieba\.baidu\.com\/.+/i,
				getImage:function(img){
					var src=img.src;
					var reg=/^(http:\/\/imgsrc\.baidu\.com\/forum\/)ab(pic\/item\/[\w.]+)/i
					var result=src.match(reg);
					if(result){
						return result[1]+result[2];
					};
				},
			},
			{sitename:"178.com",
				enabled:true,
				url:/^https?:\/\/(?:\w+\.)+178\.com\//i,
				clikToOpen:{
					enabled:true,
					preventDefault:true,
					type:'actual',
				},
				getImage:function(img,a){
					if(!a)return;
					var reg=/^https?:\/\/(?:\w+\.)+178\.com\/.+?(https?:\/\/img\d*.178.com\/[^.]+\.(?:jpg|jpeg|png|gif|bmp))/i;
					var matched=a.href.match(reg);
					return (a.href.match(reg) || [])[1];
				},
			},
		];

		//通配型规则,无视站点.
		var tprules=[
			function(img,a){//解决新的dz论坛的原图获取方式.
				var reg=/(.+\/attachments?\/.+)\.thumb\.\w{2,5}$/i;
				var oldsrc=this.src;
				var newsrc=oldsrc.replace(reg,'$1');
				if(oldsrc!=newsrc)return newsrc;
			},
		];

		//图标
		prefs.icons={
			actual:'',
			magnifier:'',
			current:'',
			gallery:'',


			loading:'data:image/gif;base64,R0lGODlhGAAYALMPACgoKOnp6cnJyaamppmZmVhYWGdnZ3d3d4aGhgEBAdnZ2UNDQ/b29r29vbGx  sf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/  IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRv  YmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwg  MjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8v  d3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiBy  ZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxu  czp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0  dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9y  VG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9Inht  cC5paWQ6QUU5MTZGNDMxQ0E4MTFFMkE1Q0NEMTFGODU0MkUzNzUiIHhtcE1NOkRvY3VtZW50SUQ9  InhtcC5kaWQ6QUU5MTZGNDQxQ0E4MTFFMkE1Q0NEMTFGODU0MkUzNzUiPiA8eG1wTU06RGVyaXZl  ZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRTkxNkY0MTFDQTgxMUUyQTVDQ0QxMUY4  NTQyRTM3NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRTkxNkY0MjFDQTgxMUUyQTVDQ0Qx  MUY4NTQyRTM3NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4g  PD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb  2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOi  oaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2pp  aGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEw  Ly4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUFAA8A  LAAAAAAYABgAAATMMMlJq710GQQAMgBmLYMSKMuirMQiSocZnOlqH68h06qtFJhPomASEDoEwQpY  MFQWM2fhEJoADkyBwDVxMBgBp6igVBAm0C8D8YqtBFWDWlHFABo2MQLMGLwkCFoCbAkAKQt1IoaL  Eh2Of4WOVQUDBANiL4ENAjgJJAOViRYADoJAhZagpxgGgg11BqAtLwWbgxQABLMaiQAGLrUNXGgu  JA4EVB4DDQ7AmE8DDtIDHQ4N18200dIO1dfMq3YI0dSkDQMckI1NHb+i6vARACH5BAUFAA8ALAAA  AAABAAEAAAQC8EUAIfkEBQUADwAsAQABABYAFgAABJbwySkPoYtq6gILEzhsmsd8YQCS4YlK6roV  meEpY0gdE0AQNQRLolBMDoMBcEiUjHzJQYFJUSwW0QtVQCkoBwbqg1A0PgBo8SSj3mRqjjhPLVAI  444cs1EOD/BhQwdlXA8HcXpDdQpaD0lMcw8ChRJTEg4NiQ4CDZYsmA0NDhINk5yeG6ANE6WTq0MZ  mKMPpa9tcweoFBEAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFQAVAAAEgvDJ  +cAykhzKJzjEQABPwARONxXhIJImc6rP0r6lfGKqLfIDxe7Bk7gki0IHgSlKHI4BjRMIGKGpqaRq  fWC1FK4BuwGbz+gOqfFgmwkKhaRBPws4dPdZ3m5ktXwUWUoqhHEdBQ0CDggZDYGFigICbgJxCncq  BpKUEpZxAk4dipWYHREAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFgAWAAAE  n/DJKcs0C9A9FxrO8ADEQBzcBjrhWA6mlT5rS8Lmwhky+KAPQ4mgeyA6LFmqUAwEZIhGw6FMGQIM  BkXaMMwkiKz2UeCKvhKFGNUAoyUDBpbwrkuK9oXuIGgIjnYTBQKEDnZOARJ+hEAzCIgPOgiEDVUz  TmcPUjKNE4AzMgIKbRMCDwoSBp2lCq2mC6hpaKKukbF2BKICerFEdQsGgJ8cEQAh+QQFBQAPACwA  AAAAAQABAAAEAvBFACH5BAUFAA8ALAEAAQAWABYAAASU8Mk5zyw0a9ecHM6AABrFNd3nrEMpFWf6  gKz7eq10gPmCTaiJwbYgEEgSgaBhkxQHA8ujoRQ0HwUolFT1XAnagoV6lRgG4GE5A2hTkGuKQvEg  lAeMAMM+VzCvCgyCUn1lgnkTc1ZNBnoMXg9KV0ONARRqDwoBAnYSmg+YJXQBAXQSpJahGZ+lE6im  TXQKSK1rcGYuEQAh+QQFBQAPACwAAAAAAQABAAAEAvBFACH5BAUFAA8ALAEAAQAWABYAAASV8MlJ  5amYkiaadI3zLJlkcEL3NaxYPqj6gO0rcQ5ChUWWSj2MYTIYkB4EhUJgkwwcOYlAqbjYoK4H1dOc  QaVMQvfgeEpIx25lwVY/APCHTqs2DAiD4YTZxBdJfHI2BUV3AEgSCk0LflYkihJzGYwEhxV6FAMP  DAFnQRRDnWcPAQymohlWoiSlpg9WJZqdrAwPml1pTREAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh  +QQFBQAPACwBAAEAFgAWAAAEi/DJKQ2iOFOhhGxCo2Gc0n1C2hjjU54PqBbZMXGihDjhxE6mloT2  cDgAGIVQ4mjkHsplxdlwPH5SyYAqMUWzVpsEmS2bywfHwGoIuL9Co4OmcAek8sHEnV1bgVeBGQUL  WnoUPwEMCocGBAMEhS2KDAx3AI8DkJIalJYPmJqbcYqXjwQGZEsHBEOcGBEAIfkEBQUADwAsAAAA  AAEAAQAABALwRQAh+QQFBQAPACwBAAEAFgAWAAAEk/DJSSUyNc+hnlqPoAiENh2dlIrKaKrTF7au  hnlhKTV1YUuHTPBRaDRAj0Eg8JoUBQLKktkMQRuSabTqgEYR1KpF0NhKkOK0mhFgDNSOR5BBTw+M  WAmdUTXgN3QBNy8ORghSZz4Vgw5xJ2cEAwQ3BwMOby8LkQOSAEmNly8Fm5yelo0DihoAB5EEppdD  VQALN4MZEQAh+QQFBQAPACwAAAAAAQABAAAEAvBFADs=',
			loadingCancle:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6MzBFMjYzRTUxQ0IwMTFFMkE5RkRDMDFGNUY3NTA2OTYiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6MzBFMjYzRTYxQ0IwMTFFMkE5RkRDMDFGNUY3NTA2OTYiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMEUyNjNFMzFDQjAxMUUyQTlG  REMwMUY1Rjc1MDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMEUyNjNFNDFDQjAxMUUy  QTlGREMwMUY1Rjc1MDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmI2XfsAAADqSURBVHja7FTLDYMwDI1puwQr5MCJKZCy  B3cklsg9GzAAEjAEezBFhRtHISr/T9VD1VgyJP68ZzsBQET2TQFP8McEaZoGJ7F6pdTMeN9KaNv2  nR3iODYLbaeX82k7nO6g67oRiBCC6VgDBABYluUIhx5hGM5w9sbgKrOARLgIfrWDQXCvgLUOVgmi  KGJ2HEarqhoFJklicod8zjkriuL0iLY6OHS/jxCgrn5mtDb8lADrunabPM8fpMPe+vASAc20aZrp  gT6tusOlGIpdk60PLciy7EYLKWW/dIO0P5gU2vu/qSf4QYKXAAMAJ5qBE+5PPaUAAAAASUVORK5C  YII=',

			hand:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6QjI3OEJEQkYxQ0U3MTFFMjg5NDZFNzJBMTc5RTBBMzMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6QjI3OEJEQzAxQ0U3MTFFMjg5NDZFNzJBMTc5RTBBMzMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjc4QkRCRDFDRTcxMUUyODk0  NkU3MkExNzlFMEEzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjc4QkRCRTFDRTcxMUUy  ODk0NkU3MkExNzlFMEEzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjEL5KQAAAHBSURBVHja5FRNywFhFGVmkM9EEaWQEik1  Fqws/AWJn2Dl/8haKTsW/ANljaQslLLwka98NjNOpvTkfeadUXo371k83bndOXPuufcZfT6f130D  jO5L+EOi0Wg0GAxUyzhqdj6fX6/XYDDIsmytVlssFo1G43w+z2Yzh8Ph9/u1KspkMsViURRF+dHn  8+G0WCzVarVQKHygqFQqCYIwHo+Px+MrGY1GcTqdzg882mw2OMPhMOheSbvdTvY+nU7ViWCKJEmx  WOx0OklPrNdrtCbHt9stnU6Xy2V1ot1uB4O8Xq/b7RafQEfJZBLB/X4/HA5YY7PZTL7CxuNxOdpu  t5g0JNhsNqPRGIlE8PFUKiWrgAQ5QNcejycQCGCsqKcQ8TxfqVSsVmu/30d1NpuVaHC5XGAxmUyt  VgtfpUxtuVxyHIfBJxKJer2+3+9hitL6YaFQT28N9AzDhEIhGAF1l8vFYDBQRWFLu90uKed9j3q9  HkwFF4rgJTl7EhC7Wq1U9qjT6UAzLBCVIW+Z+kI2m01MEIGgAK1EQLvdFpTxZvNvRPBoOBxS+8IQ  cD+0XlpgMpnkcrmfefIak9D/53+2RjwEGAAlkHhWHev9/QAAAABJRU5ErkJggg==',
			rotate:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6RjM2M0UyRTcxQ0U3MTFFMjgxRDNEQkM4N0Q3NTg2QkMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6RjM2M0UyRTgxQ0U3MTFFMjgxRDNEQkM4N0Q3NTg2QkMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMzYzRTJFNTFDRTcxMUUyODFE  M0RCQzg3RDc1ODZCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMzYzRTJFNjFDRTcxMUUy  ODFEM0RCQzg3RDc1ODZCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlX779gAAAJXSURBVHja3JQ5a6pREIbzqbigoqBeNyI2  pghEAnZiJZZ2/gMLQZBgoYUEXIJgYyD+gYhYxcJGtDKQH6CIImKhuIAGFHHfl9yXyPV6DZoUKS6Z  YjhHzzxn5p05H2EwGM6+w0hn32T/H4hy7I/RaNTpdCaTCYVCWa1W6/X617vVajV4BoPxOQgx1WpV  oVCYzWa5XD6fz2k0Gn58fHxMJpMmk+n5+RlbMpm8H0UcdA0n6vX67e2tQCCIx+OlUqlQKFxeXl5f  X+t0OuQokUiAttvtfD5/n3Wo0XA49Hq9r6+vgUAAFKSGLXw6nQady+WiWFx2c3OD+05lpNfrZ7MZ  SsAa8R6Ph0qlLhYLv99/d3fH4XB2J/v9Pi47CtpZLpfTarVisVilUkEjsFwuFyT7avszmUyr1cLC  arUul8tsNnt/f48t8kJ2yPGrIIfDgRgsNBoN2ux2u5VKZT6fh3aQ1ul0HmMdglgslsVi2Sa1NQj8  9PQUiUQwTSQSCZJXKpXPQegFhCAIYrPZNJtNeOTi8/l4PN763cBC1h9ZpH11Go0GWo6bUQK80WiE  Pz8/Z7PZ0Gv9x8B6eHg4CrLZbEwm8+XlBY8ABSKATqfDq9VqeIzfDiQUCkOh0NEngmvRl0Qi0W63  RSLRwblutwsEFlKpNBgM9nq9gwNkjP92hXbIZLKrqys8js2/ViwW397eoDooyAWjeEpsDHQ0GsUL  WH0w5IhROEE57BpYsVjsIwjtu7i4CIfDg8Hg2ED+LW1r4/EYg4dm7+pKpVLlchkjPp1OT3zYiJ/7  8f8twABFT5G5Yf+a5QAAAABJRU5ErkJggg==',
			zoom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6MzI2NDFENzExQ0NBMTFFMjhDOUNGQ0NDOTYzODI4REUiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6MzI2NDFENzIxQ0NBMTFFMjhDOUNGQ0NDOTYzODI4REUiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMjY0MUQ2RjFDQ0ExMUUyOEM5  Q0ZDQ0M5NjM4MjhERSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMjY0MUQ3MDFDQ0ExMUUy  OEM5Q0ZDQ0M5NjM4MjhERSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUXtsUAAAHTSURBVHjazJTHakJREIZzc63YS2xYsKx0  5cYXEHwBfQb3PpgbwRdw60oXtoWoWBAL9i7mQyGERMNNWeRfXA4znO/M/GfuEZLJ5NNf6Pnpj/T/  QLK70cPhMBgMlsslC4VCodPpnE4ni++BVqsViFQqFQgEjEbjbDZrNpu5XA6cVqt9BBLD4fCHWuRy  eSaT4fxOp1Ov17fbrdvtTiQSpVLpdDqJoijJo/1+n06nQTQajcvlQkXn87larbZaLeJkpZodj8fp  pd/v04UgCFD46vX6Xq83nU7JSgX5/X4oarWawyFOJpP5fL7b7TQaDXGyUs2mF7ygKTafryKITSqV  itKi0ajUiqjCZDJh6of48XgkTlYqaDQacUcc/nyVeNVt7fV6y+UylUoCFYtFs9nMBMES3ykYDNps  NpfL1e1277LuzNFwOIzFYlarFYPokUUkEgmFQuv1+uWqQqHAncpksq9AaLFYMERs8Hg8ZNnD3dGa  wWDgGIfDYbfbP7ME6e8RPw30zWbDGrOy2azP53sb9DsVPVKlUuEe+OPwiH6xkgjz9W0QqtVqsGjq  xrrN6g/fI56B8XhssVgY3bdyHr5HXyufz+OOUqnkB/wVCLXb7X//Zr8KMADSBu6sAZizOwAAAABJ  RU5ErkJggg==',
			flipVertical:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6Mzc5RkM3NzYxQ0Y0MTFFMkFGQzk4NzFDMzc4MTVBMTIiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6Mzc5RkM3NzcxQ0Y0MTFFMkFGQzk4NzFDMzc4MTVBMTIiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzlGQzc3NDFDRjQxMUUyQUZD  OTg3MUMzNzgxNUExMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzlGQzc3NTFDRjQxMUUy  QUZDOTg3MUMzNzgxNUExMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoWGg/MAAAFCSURBVHja3JTNboMwDMftaVyKVlrYCU68  Ae/Ci/MQE1JRCuok1gNCnuMExgQEJnGaUaIA8S9/fwDmeQ5H2AscZIeBXqc3Xde1bcvzppvneb7v  87wMSpIkjuOdEsqyrKpqGcSUoigQkPQgQuQZkN8gkKz0JUuALMtWQWxBEOyRQ+4csYXXUCTovYR6  IGo3lHsYFRJtgKL3SPbooSMD8TPBoDxGOYeo73snKArFGa2z4AxJpOEo7XarXKArhzac7TKEDdDb  +Qw/9TGx2AFDesAG7MyRfzqtVAn/0NlsX88n6BzIhNNiGyGms+ZFm4E+H495OrYStgSq68Y0r9QK  x8sCLdH0lhN0r5XeRxYCQ3bpl7gFkTOQuoNtOrQlI3HTeZl8bQCX4OICNU2z8+t3gZRSaZruBPHm  VdCH2H/5Zx8G+hZgAJcamqB3G0N7AAAAAElFTkSuQmCC',
			flipHorizontal:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6NUVBRDRDOTkxQ0Y0MTFFMkI0OUU5NThEQzI4NTFGNDMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6NUVBRDRDOUExQ0Y0MTFFMkI0OUU5NThEQzI4NTFGNDMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RUFENEM5NzFDRjQxMUUyQjQ5  RTk1OERDMjg1MUY0MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RUFENEM5ODFDRjQxMUUy  QjQ5RTk1OERDMjg1MUY0MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pnl92swAAAFKSURBVHja3JTJjoMwDIbxqBw6SKVAT3Di  DXgX3l9cRkhFLKIjekHIk9gJoXQhB07jILPFX37bAcjz3NnDvpydbDfQYXkzjuMwDMJvhrmu63me  8K9BSZLEcWwpoSzLqqpegwSlKIogCKJLFIWXMAxOvv99PA73++/t1nVt07RN3bRd2/d9lmVL0Lsa  gRhkSA75Sp7h4fUnEIhZKkhPpzhyqPBg1TVAMcBEMJnRjAJECxBKkloUlo+FWLkG8S1SU8sDPjDm  M2u0UwScnJFDUCEHqIIrpR9qhHIAeZ2Tfj4rsUptlZW6RWSk2RAbIFw2Ho2nxFSN0E4RzUe9qUxi  YPTZ1Agck5rqDhdbooC1gGNZbN7JWpFOEFbpb9VIBZnNrLCyj6KZT4znr7+u6zRNxcU0Tdequi4+  7tn881kcPPkt6Ifsv/yzdwP9CTAAzDedWzss4SgAAAAASUVORK5CYII=',
			close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAARCAIAAAAt9wkYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6Q0I3NzA1RDAxQ0Y3MTFFMkJGMTU4MTc4OEQ2N0MzQjkiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6Q0I3NzA1RDExQ0Y3MTFFMkJGMTU4MTc4OEQ2N0MzQjkiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQjc3MDVDRTFDRjcxMUUyQkYx  NTgxNzg4RDY3QzNCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQjc3MDVDRjFDRjcxMUUy  QkYxNTgxNzg4RDY3QzNCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmUW1owAAADqSURBVHja5FWxCoQwDL2W+x4X/QmHujvX  zV0XadHN31HUn2gR/KD2AgWRAytETpTLEF5eSfqaaEvyPH/dw97W2rtIMcY8uytKKQeiKPKTP5fS  dZ0DSZKEYQhAa72SdV0japIsy3D9XPdjjIHv+96FUkpPFqV0VwrnHD3dpmm+GCHEwdEJ2VVpTlhV  VdtaEB6m2H2j9oTN87yVAuFhikclviuw8TAMWykQAonuCvJeWZZlmiaHy7IE37Yt+HEc4zgOggBR  EzmgVUdRFI4B4BhYwg2IpGl65ZXq+ZmvfoM838MfP4fPGNBHgAEAi7gyuvHuhZcAAAAASUVORK5C  YII=',
			rotateIndicatorBG:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAC5CAYAAACfmiVfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEu  MC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVz  b3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1N  Ok9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNDQzRDlCNjE4MjRFMjExQTlDNjhCQTlBOTYy  NUVGMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRDEzOEEzQTI0MjAxMUUyOTRGREE2Njky  QjdBREQ5OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRDEzOEEzOTI0MjAxMUUyOTRGREE2  NjkyQjdBREQ5OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dz  KSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMwOTI1OTNB  MUUyNEUyMTFBOUM2OEJBOUE5NjI1RUYzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA0NDNE  OUI2MTgyNEUyMTFBOUM2OEJBOUE5NjI1RUYzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS  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  9BnasNkcSoMAAAAASUVORK5CYII=',
			rotateIndicatorPointer:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAADxCAYAAACEXZTsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6OTQ0RjM2N0YyNDJFMTFFMjk1QkFBRDIwRTU4OTdBRDgiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6OTQ0RjM2ODAyNDJFMTFFMjk1QkFBRDIwRTU4OTdBRDgiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NDRGMzY3RDI0MkUxMUUyOTVC  QUFEMjBFNTg5N0FEOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NDRGMzY3RTI0MkUxMUUy  OTVCQUFEMjBFNTg5N0FEOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psfyr6YAAArZSURBVHja3J1bbyNJFcfL7cT25D6Jc2Em  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',

			arrowTop:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6QjNFMkVGMDEyQzI0MTFFMjg3QzRFMzA4RUMzNUU1M0UiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6QjNFMkVGMDIyQzI0MTFFMjg3QzRFMzA4RUMzNUU1M0UiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0UyRUVGRjJDMjQxMUUyODdD  NEUzMDhFQzM1RTUzRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0UyRUYwMDJDMjQxMUUy  ODdDNEUzMDhFQzM1RTUzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlvCjVAAAAD/SURBVHja1JjRDYQgDIbZgBEYwREcgREY  xREcoSMxwo3gCHc+0MQQPCgUKCT/G8r3GW0RpfoNfceHaLXYQPhvyFISJoJ/Shjp8NudKwGPucKc  JeFFS9hC+KeElQLvCOBx3Mrw0yVOBnjMORoeGOExIBEeKuYP664UGIpEl67dAj9dwjDA10o0bz1K  uyulmlCqV1PXpsK7Tv2jSsJ2hK+VsD1u3NpJ2dcaCc++JvXj2hnL9N5aLGBUZWAsGiAJvknCC4Gv  kfC4Tchd8Bn8G7iFNXMPVJdYzzoS+bf/Sr4NThB8TuK1lB4CD6NiiaPkh0XaSRpKQOlkiceASa6f  AAMADgHRdvHjSZ0AAAAASUVORK5CYII=',
			arrowBottom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6Qzg4RUFEREQyQzI0MTFFMkJGRTVENTM1RUFERUEyNjMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6Qzg4RUFEREUyQzI0MTFFMkJGRTVENTM1RUFERUEyNjMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDODhFQUREQjJDMjQxMUUyQkZF  NUQ1MzVFQURFQTI2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDODhFQUREQzJDMjQxMUUy  QkZFNUQ1MzVFQURFQTI2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl7tKzkAAAEVSURBVHja1JjREYQgDES5CizhSqAES7gS  UoolUAIlUcKVQAmRD5hhPBXDkRgzk79V3uK4Roz5LZ86pJ6Mnpoyk28Jl9SYW4uJAl+4liMhVCIt  JrbwpWErtKnjjvBOE0fwmFltLTyCL/2tLxAom9c8Y4plY0NDuOuaGT5eZAoldVCJCQo81qmkwUQ3  fClHNDEPhJ+J8I4SpWcNA+CHrylpgm2tD/GRAjN8zEysLxUwwlupZHAX7umkE+9N+NhhY2KkxHXI  a7PPJVdNUOGHz1//mLgdvncnfYdepDwxv1XB96TJiPRiKRgAD+bmgifD944eXaOBlj8pqT87FhOq  4Vujx9DRQPpIRNtJH8kEK/wLEc2TaxVgABhX1Dief8wFAAAAAElFTkSuQmCC',
			arrowLeft:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAwCAYAAADtoXHnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6NTkwNjJDNTkyQzI0MTFFMkI0NzZFM0NEMTRCQUU4NzAiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6NTkwNjJDNUEyQzI0MTFFMkI0NzZFM0NEMTRCQUU4NzAiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1OTA2MkM1NzJDMjQxMUUyQjQ3  NkUzQ0QxNEJBRTg3MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1OTA2MkM1ODJDMjQxMUUy  QjQ3NkUzQ0QxNEJBRTg3MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps3mm0sAAAEHSURBVHjaxNhhDcMgEIZhMgOVMAmVMAmV  gJRJQAKSJmESJoHRhSVkNIM7oC/J/WrSJ2nhA86EEMyk4WM9Yi3Fk0noDoZUr1jrbNRlYA7bWag9  APO6j0Zr4Lf8KHRrBMNncg1A1/TP2sB9NneicrDzn15VYAe6pBe1gM8iIBSoBCyDQYn2gQrUd4NC  dAwoQJ1g8d+qb2tArQC0Td+sgo4HK+g2BfyDSuLNiqPlAJWAThWgP6gkT716m8hQSbzpwQw9D8zQ  88A4LoYY5OdFJhK2ZLBwwGIQC3xsa8M2cey4gh3MsCModtjGrhXIBQq7KmKXYuz6jzU6sJYO1rzC  2nRYQ7Laen0LMACbElNZVX4epQAAAABJRU5ErkJggg==',
			arrowRight:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAwCAYAAADtoXHnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6N0M5MkUyMEIyQzI0MTFFMkJEREE4MzFDNDE2ODE0OTAiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6N0M5MkUyMEMyQzI0MTFFMkJEREE4MzFDNDE2ODE0OTAiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QzkyRTIwOTJDMjQxMUUyQkRE  QTgzMUM0MTY4MTQ5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QzkyRTIwQTJDMjQxMUUy  QkREQTgzMUM0MTY4MTQ5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrqtTzoAAADVSURBVHja5NjhCYMwEAXgows4giN0BEdw  hBvFETpCRsoIjuAINsIJpfgjoZf3YhN4/4QPgj6TE7leQ0pMCQJaz5QtZbdUh/ULPPOqBS4X2GfU  ExtsC/eMqCcaM9EjMwPe7GXrCx494TUTjvZ8lYJoFhYGHP4CngrKw7WntQDW7uCZAbvWpdgLQ4ED  o6dLYNe6vAf8kBsv+PY2C7p9MvBy0FZBt8KH/9rgIPy4Aj+YNQ1GBvhzvcEvUPCrIvxSTLmFwwcd  lJEOZXhFHdPRBpKQ0etbgAEA5TXHBKbv1IkAAAAASUVORK5CYII=',
			galleryClose:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6NUJBOERGNEExQ0UxMTFFMjgwQjFCNTY2MkEyMEY5NEQiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6NUJBOERGNEIxQ0UxMTFFMjgwQjFCNTY2MkEyMEY5NEQiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QkE4REY0ODFDRTExMUUyODBC  MUI1NjYyQTIwRjk0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QkE4REY0OTFDRTExMUUy  ODBCMUI1NjYyQTIwRjk0RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnhfRGoAAAY0SURBVHjalFdrTFRXEL537+7CLu/l6YLy  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',
		};


		//获取位置
		function getTargetPosition(target){
			var target=target;
			var rect=target.getBoundingClientRect();
			var compStyle=getComputedStyle(target,'');
			var pFloat=parseFloat;
			var t=rect.top + pFloat(compStyle.paddingTop) + pFloat(compStyle.borderTopWidth);
			var l=rect.left + pFloat(compStyle.paddingLeft) + pFloat(compStyle.borderLeftWidth);
			var r=rect.right - pFloat(compStyle.paddingRight) - pFloat(compStyle.borderRightWidth);
			var b=rect.bottom - pFloat(compStyle.paddingBottom) - pFloat(compStyle.borderBottomWidth);
			var scrollXY={
				x:window.scrollX,
				y:window.scrollY,
			};
			return {
				t:t,
				l:l,
				r:r,
				b:b,
				top: t + scrollXY.y,
				left: l + scrollXY.x,
				right: r + scrollXY.x,
				bottom: b + scrollXY.y,
			};
		};

		//获取窗口大小.
		function getWindowSize(){
			//window.innerHeight;window.innerWidth;
			return {
				h:window.innerHeight,
				w:window.innerWidth,
			};
			/*
			var de=document.documentElement;
			return {
				h:document.compatMode=='BackCompat'? document.body.clientHeight : de.clientHeight,
				w:de.clientWidth,
			};
			*/
		};


		function getCurrentSize(target){//获取页面上显示的图片的宽 高.
			var iCS=getComputedStyle(target,'');
			return {
				h:parseFloat(iCS.height),
				w:parseFloat(iCS.width),
			};
		};


		//xpath 获取单个元素
		function getElementByXpath(xpath,contextNode,doc){
			doc=doc || document;
			contextNode=contextNode || doc;
			return doc.evaluate(xpath,contextNode,null,9,null).singleNodeValue;
		};


		//事件支持检测.
		function eventSupported( eventName,el ){
			el = el || document.createElement("div");
			eventName = "on" + eventName;
			var isSupported = (eventName in el);
			if (!isSupported && el.setAttribute) {
				el.setAttribute(eventName, "return;");
				isSupported = typeof el[eventName] === "function";
			};
			return isSupported;
		};


		//检测属性支持.
		function proSupported(proName,el){
			el = el || document.createElement("div");
			var isSupported = (proName in el);
			return isSupported;
		};

		//css属性支持
		function cssProSupported(proName,elem){
			var prefix=['','-webkit-','-o-','-moz-','-ms-'];
			elem=elem || document.createElement('div');
			var style=elem.style;
			var camelPro;
			for(var i=0,ii=prefix.length;i<ii;i++){
				camelPro=(prefix[i]+proName).replace(/-([a-z])/g,function(a,b){
					return b.toUpperCase();
				});
				if(camelPro in style){
					return camelPro;
				};
			};
		};

		//css属性值支持
		function cssValueSupported(proName,value,elem){
			var prefix=['','-webkit-','-o-','-moz-','-ms-'];
			elem=elem || document.createElement('div');
			var style=elem.style;
			var prefixedValue;
			for(var i=0,ii=prefix.length;i<ii;i++){
				prefixedValue=prefix[i] + value;
				style[proName]=prefixedValue;
				if(style[proName]==prefixedValue){
					return prefixedValue;
				};
			};
		};

		//抛出错误到错误控制台
		function throwErrorInfo(err){
			if(console && console.error){
				console.error(err.message + '\n\n' + (err.stacktrace? err.stacktrace : '') + '\n\n' , err);
			};
		};


		//支持情况.
		var support={
			wheelEvent:eventSupported('mousewheel')? 'mousewheel' : 'DOMMouseScroll',
			cssTransform:cssProSupported('transform'),
			cssCursorValue:{
				zoomIn:cssValueSupported('cursor','zoom-in'),
				zoomOut:cssValueSupported('cursor','zoom-out'),
			},
			requestFullscreen:(function(){
				var array=['webkitRequestFullScreen','mozRequestFullScreen','requestFullscreen'];
				var tempEle=document.body;
				var ret;
				for(var i=array.length-1;i>=0;i--){
					ret=array[i];
					if(ret in tempEle){
						return ret;
					};
				};
			})(),
		};


		//console.log('浏览器的一些对象支持情况:',support);

		function wheelEventObjectFix(e){
			e.delta=e.wheelDelta? e.wheelDelta : -e.detail;
			return e;
		};


		//imgReady
		var imgReady=(function(){
			var iRInterval,
				iRReadyFn=[]
			;

			function checkReady(){
				for(var i=0,ii=iRReadyFn.length,iRReadyFn_i;i<ii;i++){
					iRReadyFn_i=iRReadyFn[i];
					if(iRReadyFn_i.done || iRReadyFn_i()){
						iRReadyFn.splice(i,1);
						i--;
						ii--;
					};
				};
				if(iRReadyFn.length==0){
					clearInterval(iRInterval);
					iRInterval=null;
				};
			};



			var imgReady=function(img,load,ready,error){//4个参数,除了img和load必须,其他可选.

				if(/NodeList|HTMLCollection/.test(Object.prototype.toString.call(img))  || Array.isArray(img)){
					arrayFn.forEach.call(img,function(img,index,array){
						if(img instanceof HTMLImageElement){
							imgReady(img,load,ready,error);
						};
					});
					return;
				};

				if(!(img instanceof HTMLImageElement)){
					var t_img=new Image();
					t_img.src=img;
					img=t_img;
					t_img=null;
				};



				var readyHandler=function(){
					
				};

				function go(type,e){
					switch(type){
						case 'load':{
							img.removeEventListener('load',loadHandler,true);
							img.removeEventListener('error',errorHandler,true);
							if(ready && !readyHandler.done){//如果直接触发load，那么先触发ready
								go('ready');
							};
							load.call(img,e);
						}break;
						case 'ready':{
							readyHandler.done=true;
							ready.call(img,{
								target:img,
								type:'ready',
							});
						}break;
						case 'error':{
							img.removeEventListener('load',loadHandler,true);
							img.removeEventListener('error',errorHandler,true);
							if(error){
								error.call(img,e);
							};
						}break;
					};
				};

				function loadHandler(e){
					go('load',e);
				};

				function errorHandler(e){
					go('error',e);
				};


				//如果img直接就是已经读完的，那么直接触发load而不触发ready
				//如果img在读取过程中，那么必须先触发ready在触发load

				if(img.complete){//图片已经加载完成.
					if(typeof img.width=='number' && img.width && img.height){//图片
						setTimeout(function(){
							load.call(img,{
								type:'load',
								target:img,
							});
						},0);
					}else{//尼玛,这不是图片.opera会识别错误.
						setTimeout(function(){
							if(!error)return;
							error.call(img,{
								type:'error',
								target:img,
							});
						},0);
					};
					return;
				};

				img.addEventListener('load',loadHandler,true);
				img.addEventListener('error',errorHandler,true);


				if(ready){
					readyHandler=function(){//尽快的检测图片大小.
						if(img.naturalWidth==0 || img.naturalHeight==0)return;
						setTimeout(function(){
							go('ready');
						},0);
						return true;
					};
					readyHandler.img=img;
					iRReadyFn.push(readyHandler);

					if(!iRInterval){
						iRInterval=setInterval(checkReady,22);
					};
				};
			};

			return imgReady;
		})();

		var addCusMouseEvent=(function(){

			function contains(parent,child){
				if(parent && child){
					return !!(parent.compareDocumentPosition(child) & 16);
				};
			};

			var de=document.documentElement;

			var support={
				mouseleave:'onmouseleave' in de,
				mouseenter:'onmouseenter' in de,
			}; 

			de=null;

			var map={
				'mouseleave':'mouseout',
				'mouseenter':'mouseover',
			};

			return function(type, ele, fn){//事件类型，元素，监听函数
				type=type.toLowerCase();
				if(support[type]){
					ele.addEventListener(type,fn,false);//mouseleave,enter不冒泡
				}else{
					ele.addEventListener(map[type],function(e){
						var relatedTarget=e.relatedTarget;
						if(relatedTarget!=this && !contains(this,relatedTarget)){
							fn.call(this,e);
						};
					},true);
				};
			};

		})();



		//库
		function GalleryC(){
			this.init();
		};
		GalleryC.all=[];

		var gallery;
		GalleryC.prototype={
			init:function(){
				this.addStyle();
				var container=document.createElement('span');
				this.gallery=container;
				container.className='pv-gallery-container';
				container.tabIndex=1;
				container.innerHTML=''+
					'<span class="pv-gallery-head"></span>'+
					'<span class="pv-gallery-body">'+
						'<span class="pv-gallery-img-container">'+
							'<span class="pv-gallery-close"></span>'+
						'</span>'+
						'<span class="pv-gallery-sidebar-container">'+
							'<span class="pv-gallery-sidebar-content">'+
								'<span class="pv-gallery-sidebar-controler-pre"></span>'+
								'<span class="pv-gallery-sidebar-thumbnails-container">'+
									'<span class="pv-gallery-sidebar-thumbnails"></span><!--用innerHTML写入被span.pv-gallery-sidebar-thumb包裹的img元素，并设置宽度货高度-->'+
								'</span>'+
								'<span class="pv-gallery-sidebar-controler-next"></span>'+
							'</span>'+
						'</span>'+
					'</span>';
				document.body.appendChild(container);

				container.addEventListener('mousedown',function(e){//阻止浏览器默认拖动
					var target=e.target;
					if(target.nodeName=='IMG')e.preventDefault();
				},true);

				var validPos=['top','right','bottom','left'];
				var sBarPosition=prefs.gallery.sideBarPosition.trim();
				if(validPos.indexOf(sBarPosition)==-1){
					sBarPosition='bottom';
				};

				this.sBarPosition=sBarPosition;
				this.selectedClassName='pv-gallery-sidebar-thumb_selected-' + sBarPosition;


				var sBarDirection;
				if(sBarPosition=='top' || sBarPosition=='bottom'){
					sBarDirection='h';//水平放置
				}else{
					sBarDirection='v';//垂直放置
				};
				this.sBarDirection=sBarDirection;

				var classPrefix='pv-gallery-';
				var validClass=[
					'close',
					'img-container',
					'sidebar-container',
					'sidebar-content',
					'sidebar-controler-pre',
					'sidebar-controler-next',
					'sidebar-thumbnails',
					'sidebar-thumbnails-container',
				];

				var eleMaps={};
				this.eleMaps=eleMaps;

				validClass.forEach(function(c){
					eleMaps[c]=container.querySelector('.'+ classPrefix + c);
				});

				var posClass=[//需要添加'top bottom left right'class的元素
					'img-container',
					'sidebar-container',
					'sidebar-thumbnails-container',
				];
				posClass.forEach(function(c){
					eleMaps[c].classList.add(classPrefix + c + '-' +sBarPosition);
				});

				var hvClass=[//需要添加'v h'class的元素
					'sidebar-container',
					'sidebar-content',
					'sidebar-controler-pre',
					'sidebar-controler-next',
					'sidebar-thumbnails',
				];
				hvClass.forEach(function(c){
					eleMaps[c].classList.add(classPrefix + c + '-' + sBarDirection);
				});

				var self=this;
				eleMaps['sidebar-thumbnails-container'].addEventListener('scroll',function(e){
					self.loadThumb();
				},false)

				eleMaps['sidebar-content'].addEventListener('click',function(e){
					var target=e.target;
					switch(target){
						case eleMaps['sidebar-controler-next']:{//下一个
							self.select(self.selected.nextElementSibling);
						}break;
						case eleMaps['sidebar-controler-pre']:{//上一个
							self.select(self.selected.previousElementSibling);
						}break;
						default:{
							if(!target.dataset['src'])break;
							self.select((target.nodeName=='SPAN'? target : target.parentNode));
						}break;
					};
				},false);
				eleMaps['close'].addEventListener('click',function(e){
					self.close();
				},false);
			},
			clear:function(){
				
			},
			close:function(){
				this.gallery.style.display='none';
				window.removeEventListener('resize',this._resizeHandler,true);
			},
			selectedIntoView:function(){
				var thumBC=this.eleMaps['sidebar-thumbnails-container'];
				//需要滚动的距离。
				var needScrollDis=this.sBarDirection=='h' ? this.selected.offsetLeft : this.selected.offsetTop;
				//尽可能的居中显示
				var thumBCClient=this.sBarDirection=='h' ? thumBC.clientWidth : thumBC.clientHeight;
				var scrollCenter=Math.max((thumBCClient - (this.sideLength + 3))/2,0);

				needScrollDis=Math.max(needScrollDis-scrollCenter,0);
				if(this.sBarDirection=='h'){
					thumBC.scrollLeft=needScrollDis;
				}else{
					thumBC.scrollTop=needScrollDis;
				};
			},
			select:function(ele){
				if(!ele || this.selected==ele)return;
				if(this.selected){
					this.selected.classList.remove(this.selectedClassName);
					this.selected.classList.remove('pv-gallery-sidebar-thumb_selected');
				};
				ele.classList.add(this.selectedClassName);
				ele.classList.add('pv-gallery-sidebar-thumb_selected');

				this.selected=ele;
				if(ele.dataset['src']){
					this.loadImg(ele.dataset['src']);
				};
				this.selectedIntoView();
			},
			load:function(img,data,from){
				this.gallery.style.display='';
				var imgSrc=img.src;
				var dataSrcs=[];
				var data_i;
				var index;
				var data_i_src;
				for(var i=0,ii=data.length;i<ii;i++){//unique顺便算出img所在data中的index;
					data_i=data[i];
					data_i_src=data_i.src;
					if(dataSrcs.indexOf(data_i_src)!=-1){//已经存在
						data.splice(i,1);//移除
						i--;
						ii--;
						continue;
					};
					dataSrcs.push(data_i_src);

					if(imgSrc==data_i_src){
						index=i;
					};
				};
				if(typeof index =='undefined'){
					index=0;
					data.unshift(data.target);
				};

				//console.log(data);
				this.data=data;
				this.from=from;//如果来自frame，那么这个from应该保存了那个frame的窗口id，便于以后通信。

				this.clear();//对象复用，清除以前的一些属性


				var sideLength;

				var thumbnails=this.eleMaps['sidebar-thumbnails'];

				if(this.sBarDirection=='v'){
					sideLength=thumbnails.clientWidth;
				}else{
					sideLength=thumbnails.clientHeight;
					thumbnails.style.width=(sideLength + 3)*data.length + 'px';//如果是水平放置，需要设置宽度
				};

				this.sideLength=sideLength;

				var spanMark=[];
				 for(var i=data.length-1;i>=0;i--){
					 spanMark.push('<span data-type="'+data[i].type+'"></span>');
				};

				thumbnails.innerHTML=spanMark.reverse().join('');

				this.imgSpans=thumbnails.children;

				this.select(this.imgSpans[index]);
				this.loadImg(img);
				this.loadThumb();

				//resize
				this._resizeHandler=this.resizeHandler.bind(this);
				window.addEventListener('resize',this._resizeHandler,true);
			},
			resizeHandler:function(){
				this.selectedIntoView();
				this.loadThumb();
			},
			centerImg:function(){
				
			},
			getImg:function(src){
				var index=GalleryC.all.indexOf(src);
				if(index!=-1){
					GalleryC.all.splice(index,1);
				};

				GalleryC.all.push(src);
				//console.log(GalleryC.all);
				var done;
				var self=this;
				function load(){
					if(done)return;
					done=true;
					if(GalleryC.all.indexOf(src)==GalleryC.all.length-1){
						self.loadImg(this);
					};
				};
				imgReady(src,load,load);
			},
			loadImg:function(img){
				var iC=this.eleMaps['img-container'];

				if(typeof img=='string'){
					this.getImg(img);
					return;
				};
				if(this.img){
					this.img.style.display='none';
				};
				this.img=img;
				img.className='pv-gallery-img';
				iC.appendChild(img);
			},
			loadThumb:function(){//读取可视范围里面的缩略图

				var thumBC=this.eleMaps['sidebar-thumbnails-container'];
				var scrolled=this.sBarDirection=='h' ? thumBC.scrollLeft : thumBC.scrollTop;
				var thumBCClient=this.sBarDirection=='h' ? thumBC.clientWidth : thumBC.clientHeight;
				var loadFrom=Math.floor(scrolled/(this.sideLength + 3));//从第几张开始读取。
				var loadStop=Math.ceil((scrolled + thumBCClient)/(this.sideLength + 3));//读取到多少停止。


				var self=this;
				function ready(){
					var done;
					return function(e){
						if(done)return;
						done=true;

						var naturalSize={
							h:this.naturalHeight,
							w:this.naturalWidth,
						};
						var style=this.style;
						style.removeProperty('width');
						style.removeProperty('height');
						if(naturalSize.h > self.sideLength || naturalSize.w > self.sideLength){
							if(naturalSize.h>=naturalSize.w){
								style.height='100%';
							}else{
								style.width='100%';
							};
						};

					};
				};

				var imgSpans=this.imgSpans;
				var data=this.data;
				var thumb;
				var data_i;
				var _ready;
				var span_i;

				for(var i=loadFrom,ii=data.length; i<ii ;i++){
					if(i>loadStop)break;
					data_i=data[i];
					if(data_i.loaded)continue;
					data_i.loaded=true;
					thumb=new Image();
					thumb.src=data_i.imgSrc;
					thumb.style.cssText='\
						height:100%;\
						width:100%;\
					';
					thumb.className='pv-pic-not-allowed';

					//艹，GM环境下的dataset又无法使用.....
					thumb.setAttribute('data-src',data_i.src);
					_ready=ready();
					span_i=imgSpans[i];
					span_i.setAttribute('data-src',data_i.src);
					span_i.appendChild(thumb);
					imgReady(thumb,_ready,_ready);
				};
			},
			addStyle:function(){
				var style=document.createElement('style');
				style.type='text/css';
				style.textContent='\
					.pv-gallery-container {\
						position: fixed;\
						top: 0;\
						left: 0;\
						width: 100%;\
						height: 100%;\
						padding: 0;\
						margin: 0;\
						border: none;\
						z-index:899999999;\
						background-color: transparent;\
					}\
					.pv-gallery-container span{\
						-moz-box-sizing: border-box;\
						box-sizing: border-box;\
					}\
					.pv-gallery-head {\
						position: absolute;\
						top: 0;\
						left: 0;\
						width: 100%;\
						height: 0px;\
						z-index:-1;/*暂时禁用*/\
					}\
					.pv-gallery-body {\
						display: block;\
						height: 100%;\
						width: 100%;\
						margin: 0;\
						padding: 0;\
						border: none;\
						/* border-top: 20px solid transparent;\ */\
						position: relative;\
						background-clip: border-box;\
					}\
					.pv-gallery-img-container {\
						display: block;\
						padding: 0;\
						margin: 0;\
						border: none;\
						height: 100%;\
						width: 100%;\
						overflow: hidden;\
						background-clip: padding-box;\
						background-color: rgba(30,30,30,0.96);\
						text-align:center;\
						position:relative;\
					}\
					.pv-gallery-close{\
						cursor:pointer;\
						position:absolute;\
						top:2px;\
						right:2px;\
						z-index:2;\
						height:32px;\
						width:32px;\
						opacity:0.6;\
						background:transparent no-repeat center;\
						background-image:url("'+prefs.icons.galleryClose+'");\
					}\
					.pv-gallery-close:hover{\
						opacity:1;\
					}\
					.pv-gallery-img-container>img{\
						box-shadow:0 0 10px rgba(0,0,0,0.6);\
						display:inline-block;\
						position:relative;\
						top:10px;\
						z-index:1;\
					}\
					.pv-gallery-img-container-top {\
						border-top: 120px solid transparent;\
					}\
					.pv-gallery-img-container-right {\
						border-right: 120px solid transparent;\
					}\
					.pv-gallery-img-container-bottom {\
						border-bottom: 120px solid transparent;\
					}\
					.pv-gallery-img-container-left {\
						border-left: 120px solid transparent;\
					}\
					.pv-gallery-sidebar-container {\
						position: absolute;\
						background-color:rgba(0,0,0,0.96);\
						padding:10px;\
					}\
					.pv-gallery-sidebar-container-h {\
						height: 120px;\
						width: 100%;\
					}\
					.pv-gallery-sidebar-container-v {\
						width: 120px;\
						height: 100%;\
					}\
					.pv-gallery-sidebar-container-top {\
						top: 0;\
						left: 0;\
					}\
					.pv-gallery-sidebar-container-right {\
						top: 0;\
						right: 0;\
					}\
					.pv-gallery-sidebar-container-bottom {\
						bottom: 0;\
						left: 0;\
					}\
					.pv-gallery-sidebar-container-left {\
						top: 0;\
						left: 0;\
					}\
					.pv-gallery-sidebar-content {\
						display: block;\
						margin: 0;\
						padding: 0;\
						border: 0;\
						background-clip: padding-box;\
						position: relative;\
					}\
					.pv-gallery-sidebar-content-h {\
						height: 100%;\
						width: 90%;\
						margin-left: auto;\
						margin-right: auto;\
						border-left: 40px solid transparent;\
						border-right: 40px solid transparent;\
					}\
					.pv-gallery-sidebar-content-v {\
						height: 90%;\
						width: 100%;\
						top: 5%;\
						border-top: 40px solid transparent;\
						border-bottom: 40px solid transparent;\
					}\
					.pv-gallery-sidebar-controler-pre,\
					.pv-gallery-sidebar-controler-next{\
						cursor:pointer;\
						position:absolute;\
						background:rgba(255,255,255,0.1) no-repeat center;\
					}\
					.pv-gallery-sidebar-controler-pre-h,\
					.pv-gallery-sidebar-controler-next-h{\
						top:2px;\
						width:36px;\
						height:100%;\
					}\
					.pv-gallery-sidebar-controler-pre-v,\
					.pv-gallery-sidebar-controler-next-v{\
						left:2px;\
						width:100%;\
						height:36px;\
					}\
					.pv-gallery-sidebar-controler-pre-h {\
						left: -40px;\
						background-image: url("'+prefs.icons.arrowLeft+'");\
					}\
					.pv-gallery-sidebar-controler-next-h {\
						right: -40px;\
						background-image: url("'+prefs.icons.arrowRight+'");\
					}\
					.pv-gallery-sidebar-controler-pre-h:hover{\
						box-shadow:inset 22px 0 0 rgba(255,255,255,0.2) ,inset -14px 0 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-controler-next-h:hover{\
						box-shadow:inset -22px 0 0 rgba(255,255,255,0.2),inset 14px 0 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-controler-pre-v {\
						top: -40px;\
						background-image: url("'+prefs.icons.arrowTop+'");\
					}\
					.pv-gallery-sidebar-controler-next-v {\
						bottom: -40px;\
						background-image: url("'+prefs.icons.arrowBottom+'");\
					}\
					.pv-gallery-sidebar-controler-pre-v:hover{\
						box-shadow:inset 0 22px 0 rgba(255,255,255,0.2) ,inset 0 -14px 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-controler-next-v:hover{\
						box-shadow:inset 0 -22px 0 rgba(255,255,255,0.2),inset 0 14px 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-thumbnails-container {\
						display: block;\
						overflow: hidden;\
						height: 100%;\
						width: 100%;\
						margin:0;\
						border:none;\
						padding:0;\
					}\
					.pv-gallery-sidebar-thumbnails-container-top {\
						padding-bottom:5px;\
					}\
					.pv-gallery-sidebar-thumbnails-container-right {\
						padding-left:5px;\
					}\
					.pv-gallery-sidebar-thumbnails-container-bottom {\
						padding-top:5px;\
					}\
					.pv-gallery-sidebar-thumbnails-container-left {\
						padding-right:5px;\
					}\
					.pv-gallery-sidebar-thumbnails {\
						position:relative;\
						display: block;\
						padding: 0;\
						margin: 0;\
						border: none;\
						line-height:0;/*竖列时消除inline-block元素的行高*/\
					}\
					.pv-gallery-sidebar-thumbnails-h {\
						height: 100%;\
					}\
					.pv-gallery-sidebar-thumbnails-v {\
						width: 100%;\
					}\
					.pv-gallery-sidebar-thumbnails > span {\
						display:inline-block;\
						text-align: center;\
						border:2px solid rgb(52,52,52);\
						cursor:pointer;\
						position:relative;\
						padding:2px;\
						font-size:0;\
						line-height:0;\
						white-space:nowrap;/*强制图片后面作为vertical-align参考的字符不换行，以防vertical-align:middle达不到预期效果*/\
					}\
					.pv-gallery-sidebar-thumbnails > span::after {\
						content:".";\
						visibility: hidden;\
						white-space:nowrap;\
						line-height:87px;/*父元素contentbox的高度*/\
						font-size:0;\
						vertical-align: middle;\
					}\
					.pv-gallery-sidebar-container-h .pv-gallery-sidebar-thumbnails > span {\
						margin:0 3px 0 0;\
						height:100%;\
						width:95px;\
					}\
					.pv-gallery-sidebar-container-v .pv-gallery-sidebar-thumbnails > span {\
						margin:0 0 3px 0;\
						width:100%;\
						height:95px;\
					}\
					.pv-gallery-sidebar-thumbnails > span:hover {\
						border:2px solid rgb(57,149,211);\
					}\
					.pv-gallery-sidebar-thumbnails > span.pv-gallery-sidebar-thumb_selected {\
						border:2px solid rgb(229,59,62);\
					}\
					.pv-gallery-sidebar-thumb_selected-top {\
						bottom:-5px;\
					}\
					.pv-gallery-sidebar-thumb_selected-right {\
						left:-5px;\
					}\
					.pv-gallery-sidebar-thumb_selected-bottom {\
						top:-5px;\
					}\
					.pv-gallery-sidebar-thumb_selected-left {\
						right:-5px;\
					}\
					.pv-gallery-sidebar-thumbnails > span > img {\
						display: inline-block;\
						vertical-align: middle;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
		};




		//放大镜
		function MagnifierC(img,data){
			this.img=img;
			this.data=data;
			this.init();
		};

		MagnifierC.all=[];
		MagnifierC.styleZIndex=900000000;//全局z-index;
		MagnifierC.zoomRange=prefs.magnifier.wheelZoom.range.slice(0).sort();//升序
		MagnifierC.zoomRangeR=MagnifierC.zoomRange.slice(0).reverse();//降序

		MagnifierC.prototype={
			init:function(){
				this.addStyle();
				MagnifierC.all.push(this);
				var container=document.createElement('span');

				container.className='pv-magnifier-container';
				document.body.appendChild(container);

				this.magnifier=container;

				var imgNaturalSize={
					h:this.img.naturalHeight,
					w:this.img.naturalWidth,
				};

				this.imgNaturalSize=imgNaturalSize;

				var cs=container.style;
				cs.zIndex=MagnifierC.styleZIndex++;



				var maxDia=Math.ceil(Math.sqrt(Math.pow(1/2*imgNaturalSize.w,2) + Math.pow(1/2*imgNaturalSize.h,2)) * 2);
				this.maxDia=maxDia;

				var radius=prefs.magnifier.radius;
				radius=Math.min(maxDia/2,radius);
				this.radius=radius;
				var diameter=radius * 2;
				this.diameter=diameter;

				cs.width=diameter + 'px';
				cs.height=diameter + 'px';
				cs.borderRadius=radius+1 + 'px';
				cs.backgroundImage='url("'+ this.img.src +'")';
				cs.marginLeft= -radius +'px';
				cs.marginTop= -radius +'px';

				var imgPos=getTargetPosition(this.data.img);
				var imgRange={//图片所在范围
					x:[imgPos.left , imgPos.right],
					y:[imgPos.top , imgPos.bottom],
				};
				var imgW=imgRange.x[1] - imgRange.x[0];
				var imgH=imgRange.y[1] - imgRange.y[0];
				//如果图片太小的话，进行范围扩大。
				var minSize=60;
				if(imgW < minSize){
					imgRange.x[1] +=(minSize - imgW)/2;
					imgRange.x[0] -=(minSize - imgW)/2;
					imgW=minSize;
				};
				if(imgH < minSize){
					imgRange.y[1] +=(minSize - imgH)/2;
					imgRange.y[0] -=(minSize - imgH)/2;
					imgH=minSize;
				};
				this.imgSize={
					w:imgW,
					h:imgH,
				};
				this.imgRange=imgRange;
				//console.log(this.imgRange,this.imgSize);

				this.setMouseRange();


				this.move({
					pageX:imgRange.x[0],
					pageY:imgRange.y[0],
				});

				this._focus=this.focus.bind(this);
				this._blur=this.blur.bind(this);
				this._move=this.move.bind(this);
				this._remove=this.remove.bind(this);
				this._pause=this.pause.bind(this);
				this._zoom=this.zoom.bind(this);

				if(prefs.magnifier.wheelZoom.enabled){
					this.zoomLevel=1;
					this.defaultDia=diameter;
					container.addEventListener(support.wheelEvent,this._zoom,false);
				};

				container.addEventListener('mouseover',this._focus,false);
				container.addEventListener('mouseout',this._blur,false);
				container.addEventListener('dblclick',this._remove,false);
				container.addEventListener('click',this._pause,false);


				document.addEventListener('mousemove',this._move,true);
			},
			addStyle:function(){
				if(MagnifierC.style)return;
				var style=document.createElement('style');
				style.type='text/css';
				MagnifierC.style=style;
				style.textContent='\
					.pv-magnifier-container{\
						position:absolute;\
						padding:0;\
						margin:0;\
						background-origin:border-box;\
						-moz-box-sizing:border-box;\
						box-sizing:border-box;\
						border:3px solid #CCCCCC;\
						background:rgba(40, 40, 40, 0.9) no-repeat;\
					}\
					.pv-magnifier-container_focus{\
						box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);\
					}\
					.pv-magnifier-container_pause{\
						border-color:red;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			focus:function(){
				this.magnifier.classList.add('pv-magnifier-container_focus');
				this.magnifier.style.zIndex=MagnifierC.styleZIndex++;
			},
			blur:function(){
				this.magnifier.classList.remove('pv-magnifier-container_focus');
			},
			move:function(e){
				var mouseCoor={
					x:e.pageX,
					y:e.pageY,
				};
				var mouseRange=this.mouseRange;
				var imgRange=this.imgRange;

				if( !(mouseCoor.x >= mouseRange.x[0] && mouseCoor.x <= mouseRange.x[1] && mouseCoor.y >= mouseRange.y[0] && mouseCoor.y <= mouseRange.y[1]))return;//如果不再鼠标范围
				if(mouseCoor.x > imgRange.x[1]){
					mouseCoor.x = imgRange.x[1];
				}else if(mouseCoor.x < imgRange.x[0]){
					mouseCoor.x = imgRange.x[0];
				};
				if(mouseCoor.y > imgRange.y[1]){
					mouseCoor.y = imgRange.y[1];
				}else if(mouseCoor.y < imgRange.y[0]){
					mouseCoor.y = imgRange.y[0];
				};

				var ms=this.magnifier.style;
				ms.top= mouseCoor.y + 'px';
				ms.left= mouseCoor.x + 'px';

				var radius=this.radius;
				var imgSize=this.imgSize;
				var imgNaturalSize=this.imgNaturalSize;
				var px=-((mouseCoor.x-imgRange.x[0])/imgSize.w * imgNaturalSize.w) + radius +'px';
				var py=-((mouseCoor.y-imgRange.y[0])/imgSize.h * imgNaturalSize.h) + radius +'px';
				//console.log(px,py);
				ms.backgroundPosition=px + ' ' + py;
			},
			getNextZoomLevel:function(){
				var level;
				var self=this;
				if(this.zoomOut){//缩小
					MagnifierC.zoomRangeR._find(function(value){
						if(value < self.zoomLevel){
							level=value;
							return true;
						}
					})
				}else{
					MagnifierC.zoomRange._find(function(value){
						if(value > self.zoomLevel){
							level=value;
							return true;
						};
					});
				}
				return level;
			},
			zoom:function(e){
				if(prefs.magnifier.wheelZoom.pauseFirst && !this.paused)return;
				e.preventDefault();
				wheelEventObjectFix(e);
				if(e.delta > 0){//向上滚，放大；
					if(this.diameter >= this.maxDia)return;
					this.zoomOut=false;
				}else{
					this.zoomOut=true;
				};
				var level=this.getNextZoomLevel();
				if(!level)return;

				this.zoomLevel=level;
				var diameter=this.defaultDia * level;
				if(diameter > this.maxDia){
					diameter = this.maxDia;
				};

				var radius=diameter/2
				this.diameter=diameter;
				var bRadius=this.radius;
				this.radius=radius;
				this.setMouseRange();
				var ms=this.magnifier.style;
				ms.width=diameter+'px';
				ms.height=diameter+'px';
				ms.borderRadius=radius+1 + 'px';
				ms.marginLeft=-radius+'px';
				ms.marginTop=-radius+'px';
				var bBP=ms.backgroundPosition.split(' ');
				ms.backgroundPosition=parseFloat(bBP[0]) + (radius - bRadius) + 'px' + ' ' + (parseFloat(bBP[1]) + ( radius - bRadius) + 'px');

			},
			pause:function(){
				if(this.paused){
					this.magnifier.classList.remove('pv-magnifier-container_pause');
					document.addEventListener('mousemove',this._move,true);
				}else{
					this.magnifier.classList.add('pv-magnifier-container_pause');
					document.removeEventListener('mousemove',this._move,true);
				};
				this.paused=!this.paused;
			},
			setMouseRange:function(){
				var imgRange=this.imgRange;
				var radius=this.radius;
				this.mouseRange={//鼠标活动范围
					x:[imgRange.x[0]-radius , imgRange.x[1] + radius],
					y:[imgRange.y[0]-radius , imgRange.y[1] + radius],
				};
			},
			remove:function(){
				this.magnifier.parentNode.removeChild(this.magnifier);
				document.removeEventListener('mousemove',this._move,true);
				MagnifierC.all.splice(MagnifierC.all.indexOf(this),1);
			},
		};



		//图片窗口
		function ImgWindowC(img){
			this.img=img;
			this.src=img.src;
			this.init();
		};

		ImgWindowC.styleZIndex=1000000000;//全局z-index;
		ImgWindowC.all=[];//所有的窗口对象
		ImgWindowC.zoomRange=prefs.imgWindow.zoom.range.slice(0).sort();//升序
		ImgWindowC.zoomRangeR=ImgWindowC.zoomRange.slice(0).reverse();//降序


		ImgWindowC.prototype={
			init:function(){
				var self=this;
				//图片是否已经被打开
				if(ImgWindowC.all._find(function(iwin){
					if(iwin.src==self.src){
						iwin.firstOpen();
						return true;
					};
				}))return;

				this.addStyle();
				this.addRotateIndicator();

				var img=this.img;
				img.className='pv-pic-window-pic pv-pic-not-allowed';
				img.style.cssText='\
					top:0px;\
					left:0px;\
				';

				var imgNaturalSize={
					h:img.naturalHeight,
					w:img.naturalWidth,
				};
				this.imgNaturalSize=imgNaturalSize;

				var container=document.createElement('span');
				container.style.cssText='\
					cursor:pointer;\
					top:0px;\
					left:0px;\
				';
				container.className='pv-pic-window-container';
				container.innerHTML=''+
									'<span class="pv-pic-window-toolbar">'+
										'<span class="pv-pic-window-tb-hand pv-pic-window-tb-tool pv-pic-window-tb-tool-selected" title="抓手"></span>'+
										'<span class="pv-pic-window-tb-tool-badge-container">'+
											'<span class="pv-pic-window-tb-rotate pv-pic-window-tb-tool" title="旋转"></span>'+
											'<span class="pv-pic-window-tb-tool-badge">0</span>'+
										'</span>'+
										'<span class="pv-pic-window-tb-tool-badge-container">'+
											'<span class="pv-pic-window-tb-zoom pv-pic-window-tb-tool" title="缩放"></span>'+
											'<span class="pv-pic-window-tb-tool-badge">0</span>'+
										'</span>'+
										'<span class="pv-pic-window-tb-flip-horizontal pv-pic-window-tb-command" title="水平翻转"></span>'+
										'<span class="pv-pic-window-tb-flip-vertical pv-pic-window-tb-command" title="垂直翻转"></span>'+
									'</span>'+
									'<span class="pv-pic-window-close"></span>'+
									'<span class="pv-pic-window-range"></span>';

				container.insertBefore(img,container.firstChild);

				this.imgWindow=container;

				var toolMap={
					'hand':container.querySelector('.pv-pic-window-tb-hand'),
					'rotate':container.querySelector('.pv-pic-window-tb-rotate'),
					'zoom':container.querySelector('.pv-pic-window-tb-zoom'),
					'fh':container.querySelector('.pv-pic-window-tb-flip-horizontal'),
					'fv':container.querySelector('.pv-pic-window-tb-flip-vertical'),
				};
				this.toolMap=toolMap;

				this.viewRange=container.querySelector('.pv-pic-window-range');




				//关闭
				var closeButton=container.querySelector('.pv-pic-window-close');
				closeButton.style.cssText='\
					top: -24px;\
					right: 0px;\
				';
				this.closeButton=closeButton;

				closeButton.addEventListener('click',function(e){
					self.remove();
				},false);

				var toolbar=container.querySelector('.pv-pic-window-toolbar');
				toolbar.style.cssText='\
					top: 0px;\
					left: -45px;\
				';
				this.toolbar=toolbar;

				this.selectedTool='hand';
				this.cursor='hand';
				this.selectedToolClass='pv-pic-window-tb-tool-selected';

				this.hKeyUp=true;
				this.rKeyUp=true;
				this.zKeyUp=true;

				this.spaceKeyUp=true;
				this.ctrlKeyUp=true;
				this.altKeyUp=true;
				this.shiftKeyUp=true;


				toolbar.addEventListener('mousedown',function(e){//鼠标按下选择工具
					self.toolbarEventHandler(e);
				},false);


				toolbar.addEventListener('dblclick',function(e){//鼠标双击工具
					self.toolbarEventHandler(e);
				},false);


				//阻止浏览器对图片的默认控制行为
				img.addEventListener('mousedown',function(e){
					e.preventDefault();
				},false);


				container.addEventListener('mousedown',function(e){//当按下的时，执行平移，缩放，旋转操作
					self.imgWindowEventHandler(e);
				},false);

				container.addEventListener('click',function(e){//阻止opera ctrl+点击保存图片
					self.imgWindowEventHandler(e);
				},false);

				if(prefs.imgWindow.zoom.mouseWheelZoom){//是否使用鼠标缩放
					container.addEventListener(support.wheelEvent,function(e){//滚轮缩放
						self.imgWindowEventHandler(e);
					},false);
				};


				if(prefs.imgWindow.overlayer.shown){//是否显示覆盖层
					var overlayer=document.createElement('span');
					this.overlayer=overlayer;
					overlayer.className='pv-pic-window-overlayer';
					overlayer.style.backgroundColor=prefs.imgWindow.overlayer.color;
					document.body.appendChild(overlayer);
					if(prefs.imgWindow.overlayer.clickToClose[0]){
						overlayer.addEventListener(prefs.imgWindow.overlayer.clickToClose[1],function(e){
							self.remove();
						},false);
					}
				};

				document.body.appendChild(container);
				ImgWindowC.all.push(this);

				this._blur=this.blur.bind(this);
				this._focusedKeydown=this.focusedKeydown.bind(this);
				this._focusedKeyup=this.focusedKeyup.bind(this);

				this.rotatedRadians=0;//已经旋转的角度
				this.zoomLevel=1;//缩放级别
				this.setToolBadge('zoom',1);


				this.firstOpen();
			},
			firstOpen:function(){
				this.focus();
				var imgWindow=this.imgWindow;
				imgWindow.style.left=-5 + window.scrollX + 'px';
				imgWindow.style.top=-5 + window.scrollY + 'px';

				if(prefs.imgWindow.firstOpen.fitToScreen){
					this.fitToScreen();
					this.center(true,true);
				}else{
					//window的尺寸
					var wSize=getWindowSize();
					//空隙
					wSize.h -= 16;
					wSize.w -= 16;

					var imgWindowCS=getComputedStyle(imgWindow,'');

					var rectSize={
						h:parseFloat(imgWindowCS.height),
						w:parseFloat(imgWindowCS.width),
					};

					var larger={
						x:rectSize.w > wSize.w,
						y:rectSize.h > wSize.h,
					};


					this.center(
						(larger.x && prefs.imgWindow.firstOpen.horizontallyCenter[0]) || (!larger.x && prefs.imgWindow.firstOpen.horizontallyCenter[1])
						,
						(larger.y && prefs.imgWindow.firstOpen.verticallyCenter[0]) || (!larger.y && prefs.imgWindow.firstOpen.verticallyCenter[1])
					);
				};

				this.keepScreenInside();
			},
			addStyle:function(){
				if(ImgWindowC.style)return;
				var style=document.createElement('style');
				ImgWindowC.style=style;
				style.textContent='\
					.pv-pic-window-container {\
						position: absolute;\
						background-color: rgba(40,40,40,0.9);\
						padding: 8px;\
						border: 5px solid #ccc;\
						line-height: 0;\
						text-align: left;\
					}\
					.pv-pic-window-container_focus {\
						box-shadow: 0 0 10px rgba(0,0,0,0.6);\
					}\
					.pv-pic-window-close, .pv-pic-window-toolbar {\
						-webkit-transition: opacity 0.2s ease-in-out;\
						transition: opacity 0.2s ease-in-out;\
					}\
					.pv-pic-window-toolbar {\
						position: absolute;\
						background-color: #535353;\
						padding: 0;\
						opacity: 0.9;\
						display: none;\
						cursor: default;\
					}\
					.pv-pic-window-toolbar:hover {\
						opacity: 1;\
					}\
					.pv-pic-window-toolbar_focus {\
						display: block;\
					}\
					.pv-pic-window-close {\
						cursor: pointer;\
						position: absolute;\
						right: 0px;\
						top: -24px;\
						background: url("'+prefs.icons.close+'") no-repeat center bottom;\
						height: 17px;\
						width: 46px;\
						opacity: 0.9;\
						border:none;\
						padding:0;\
						padding-top:2px;\
						background-color:#1771FF;\
						display: none;\
					}\
					.pv-pic-window-close:hover {\
						background-color:red;\
						opacity: 1;\
					}\
					.pv-pic-window-close_focus {\
						display: block;\
					}\
					.pv-pic-window-pic {\
						position: relative;\
						display:inline-block;\/*opera把图片设置display:block会出现渲染问题，会有残影，还会引发其他各种问题，吓尿*/\
						max-width:none;\
						min-width:none;\
						max-height:none;\
						min-height:none;\
						padding:0;\
						margin:0;\
					}\
					.pv-pic-window-pic_focus {\
						box-shadow: 0 0 6px black;\
					}\
					.pv-pic-window-tb-tool, .pv-pic-window-tb-command{\
						height: 24px;\
						width: 24px;\
						padding: 12px 8px 6px 6px;\
						margin:0;\
						display: block;\
						background: transparent no-repeat center;\
						cursor: pointer;\
						position: relative;\
						border: none;\
						border-left: 2px solid transparent;\
						border-bottom: 1px solid #868686;\
						background-origin: content-box;\
					}\
					.pv-pic-window-toolbar > span:last-child {\
						border-bottom: none;\
					}\
					.pv-pic-window-tb-tool:hover, .pv-pic-window-tb-command:hover{\
						border-left: 2px solid red;\
					}\
					.pv-pic-window-tb-tool-selected{\
						box-shadow: inset 0 21px 0 rgba(255,255,255,0.3) ,inset 0 -21px 0 rgba(0,0,0,0.3);\
						border-left:2px solid #1771FF;\
					}\
					.pv-pic-window-tb-hand {\
						background-image: url("'+prefs.icons.hand+'");\
					}\
					.pv-pic-window-tb-rotate {\
						background-image: url("'+prefs.icons.rotate+'");\
					}\
					.pv-pic-window-tb-zoom {\
						background-image: url("'+prefs.icons.zoom+'");\
					}\
					.pv-pic-window-tb-flip-horizontal {\
						background-image: url("'+prefs.icons.flipHorizontal+'");\
					}\
					.pv-pic-window-tb-flip-vertical {\
						background-image: url("'+prefs.icons.flipVertical+'");\
					}\
					.pv-pic-window-tb-tool-badge-container {\
						display: block;\
						position: relative;\
					}\
					.pv-pic-window-tb-tool-badge {\
						position: absolute;\
						top: -3px;\
						right: 1px;\
						font-size: 10px;\
						line-height: 1.5;\
						padding: 0 3px;\
						background-color: #F93;\
						border-radius: 50px;\
						opacity: 0.5;\
						color: black;\
					}\
					.pv-pic-window-overlayer{\
						height:100%;\
						width:100%;\
						position:fixed;\
						z-index:999999999;\
						top:0;\
						left:0;\
					}\
					.pv-pic-window-rotate-indicator{\
						cursor: progress;\
						position:absolute;\
						z-index:1100000000;\
						width:250px;\
						height:250px;\
						padding:10px;\
						margin-top:-135px;\
						margin-left:-135px;\
						background:transparent url("'+ prefs.icons.rotateIndicatorBG +'") no-repeat center;\
					}\
					.pv-pic-window-rotate-indicator-pointer{\
						display:block;\
						margin-left:auto;\
						margin-right:auto;\
						background:transparent url("'+ prefs.icons.rotateIndicatorPointer +'") no-repeat center;\
						width:60px;\
						height:240px;\
						position:relative;\
						top:5px;\
					}\
					.pv-pic-window-range{\
						position:absolute;\
						border:none;\
						width:100px;\
						height:100px;\
						box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);\
						display:none;\
						padding:0;\
						background-color:rgba(255, 0, 0, 0.150);\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			addRotateIndicator:function(){
				if(ImgWindowC.rotateIndicator)return;
				var rotateIndicator=document.createElement('span');
				rotateIndicator.className='pv-pic-window-rotate-indicator';
				ImgWindowC.rotateIndicator=rotateIndicator;
				rotateIndicator.style.cssText='\
					display:none;\
				';
				var rotateIndicatorPointer=document.createElement('span');
				rotateIndicatorPointer.className='pv-pic-window-rotate-indicator-pointer';
				ImgWindowC.rotateIndicatorPointer=rotateIndicatorPointer;
				rotateIndicator.appendChild(rotateIndicatorPointer);
				document.body.appendChild(rotateIndicator);
			},
			keepScreenInside:function(){//保持按钮在屏幕里面.
				var imgWindow=this.imgWindow;
				var imgWindowFullSize={
					h:imgWindow.offsetHeight,
					w:imgWindow.offsetWidth,
				};

				var windowSize=getWindowSize();

				function keepSI(obj,offsetDirection,defaultValue){
					var objRect=obj.getBoundingClientRect();
					var objStyle=obj.style;

					while(offsetDirection.length){
						var oD=offsetDirection[0];
						var oDV=defaultValue[0];
						offsetDirection.shift();
						defaultValue.shift();
						var oValue=parseFloat(objStyle[oD]);
						var newValue;
						switch(oD){
							case 'top':{
								newValue=oValue - objRect.top;
								if(objRect.top<0){
									newValue=Math.min(newValue,imgWindowFullSize.h);
								}else{
									newValue=Math.max(newValue,oDV);
								};
							}break;
							case 'right':{
								newValue=oValue + (objRect.right - windowSize.w);
								if(objRect.right > windowSize.w){//屏幕外
									newValue=Math.min(newValue,imgWindowFullSize.w);
								}else{
									newValue=Math.max(newValue,oDV);
								};
							}break;
							case 'bottom':{
								newValue=oValue + (objRect.bottom - windowSize.h);
								if(objRect.bottom > windowSize.h){//屏幕外
									newValue=Math.min(newValue,imgWindowFullSize.h);
								}else{
									newValue=Math.max(newValue,oDV);
								};
							}break;
							case 'left':{
								newValue=oValue - objRect.left;
								if(objRect.left<0){
									newValue=Math.min(newValue,imgWindowFullSize.w);
								}else{
									newValue=Math.max(newValue,oDV);
								}
							}break;
						};
						//console.log(newValue);
						objStyle[oD]=newValue + 'px';
						
					};
				};

				keepSI(this.closeButton,['top','right'],[-24,0]);
				keepSI(this.toolbar,['top','left'],[0,-45]);
			},
			fitToScreen:function(){
				var wSize=getWindowSize();
				//空隙
				wSize.h -= 16;
				wSize.w -= 16;

				var imgWindow=this.imgWindow;
				var imgWindowCS=getComputedStyle(imgWindow,'');
				var rectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};


				var size;
				if(rectSize.w - wSize.w>0 || rectSize.h - wSize.h>0){//超出屏幕，那么缩小。
					if(rectSize.w/rectSize.h > wSize.w/wSize.h){
						size={
							w:wSize.w,
							h:wSize.w / (rectSize.w/rectSize.h),
						};
					}else{
						size={
							h:wSize.h,
							w:wSize.h * (rectSize.w/rectSize.h),
						}
					};

					this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);
				};
			},
			center:function(horizontal,vertical){
				if(!horizontal && !vertical)return;
				var wSize=getWindowSize();
				var imgWindow=this.imgWindow;
				if(horizontal)imgWindow.style.left= (wSize.w - imgWindow.offsetWidth)/2 + window.scrollX +'px';
				if(vertical)imgWindow.style.top= (wSize.h - imgWindow.offsetHeight)/2 + window.scrollY +'px';
			},
			move:function(e){
				this.working=true;
				var mouseCoor={
					x:e.pageX,
					y:e.pageY,
				};
				var imgWindow=this.imgWindow;
				var imgWStyle=imgWindow.style;
				var oriOffset={
					left:parseFloat(imgWStyle.left),
					top:parseFloat(imgWStyle.top),
				};
				var self=this;
				var moveHandler=function(e){
					imgWStyle.left=oriOffset.left+ e.pageX-mouseCoor.x +'px';
					imgWStyle.top=oriOffset.top + e.pageY-mouseCoor.y +'px';
					self.keepScreenInside();
				};
				var mouseupHandler=function(){
					e.preventDefault();
					self.working=false;
					if(self.tempHand && self.spaceKeyUp){//如果是临时切换到抓手工具，平移完成后返回上个工具
						self.tempHand=false;
						self.changeCursor(self.selectedTool);
					};
					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);
				};
				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
			rotate:function(origin,topLeft){

				var img=this.img;
				var imgWindow=this.imgWindow;

				var iTransform=img.style[support.cssTransform].replace(/rotate\([^)]*\)/i,'');

				var imgWindowCS=getComputedStyle(imgWindow,'');
				var imgRectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};

				var rectOffset={
					top:parseFloat(imgWindow.style.top),
					left:parseFloat(imgWindow.style.left),
				};

				var imgSize={
					h:img.clientHeight,
					w:img.clientWidth,
				};

				var imgOffset={
					top:parseFloat(img.style.top),
					left:parseFloat(img.style.left),
				};


				var self=this;
				var PI=Math.PI;

				var rotate=function (radians){
					if(self.rotatedRadians==radians)return;
					img.style[support.cssTransform] = ' rotate('+ radians +'rad) ' + iTransform;
					ImgWindowC.rotateIndicatorPointer.style[support.cssTransform]='rotate('+ radians +'rad)';

					self.rotatedRadians=radians;
					self.setToolBadge('rotate',radians/(PI/180));

					var afterimgRectSize=self.getRotatedImgRectSize( radians, imgSize );
					imgWindow.style.width=afterimgRectSize.w +'px';
					imgWindow.style.height=afterimgRectSize.h + 'px';
					if(!topLeft)self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize);
					self.setImgOffset(imgOffset,imgRectSize,afterimgRectSize);
					self.keepScreenInside();
				};


				if(typeof origin=='number'){
					rotate(origin);
					return;
				};


				this.working=true;

				var lastRotatedRadians=this.rotatedRadians;
				this.shiftKeyUp=true;
				var shiftRotateStep=prefs.shiftRotateStep / (180/Math.PI);//转成弧度

				var moveHandler=function(e){
					var radians=lastRotatedRadians + Math.atan2( e.pageY - origin.pageY, e.pageX - origin.pageX );

					if(radians>2*PI){
						radians-=2*PI;
					}else if(radians<0){
						radians+=2*PI;
					};

					if(!self.shiftKeyUp){//如果按下了shift键，那么步进缩放
						radians -= radians % shiftRotateStep;
						radians += shiftRotateStep;
					};
					rotate(radians);
				};

				var mouseupHandler=function(){
					self.working=false;
					ImgWindowC.rotateIndicator.style.display='none';
					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);
				};

				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
			getNextZoomLevel:function(){
				var level;
				var self=this;
				if(this.zoomOut){//缩小
					ImgWindowC.zoomRangeR._find(function(value){
						if(value < self.zoomLevel){
							level=value;
							return true;
						}
					})
				}else{
					ImgWindowC.zoomRange._find(function(value){
						if(value > self.zoomLevel){
							level=value;
							return true;
						};
					});
				}
				return level;
			},
			getZoomRatio:function(mouseCoor){
				var ibcRect=this.img.getBoundingClientRect();
				var ratio={
					x:(mouseCoor.x-ibcRect.left)/ibcRect.width,
					y:(mouseCoor.y-ibcRect.top)/ibcRect.height,
				};
				if(ratio.x<0){
					ratio.x=0
				}else if(ratio.x>1){
					ratio.x=1
				};
				if(ratio.y<0){
					ratio.y=0
				}else if(ratio.y>1){
					ratio.y=1
				};
				return ratio;
			},
			zoom:function(e,ratio){//e可能是undefined,可能是事件对象，可能是直接的缩放级别数字
				var imgWindow=this.imgWindow;
				var imgWindowCS=getComputedStyle(imgWindow,'');
				var imgRectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};

				var rectOffset={
					top:parseFloat(imgWindow.style.top),
					left:parseFloat(imgWindow.style.left),
				};

				var img=this.img;
				var self=this;

				var zoom=function(level){//缩放到指定级别
					if(typeof level==='undefined' || level<0 || level==self.zoomLevel)return;

					var afterImgSize={
						h:self.imgNaturalSize.h * level,
						w:self.imgNaturalSize.w * level,
					};
					img.width=afterImgSize.w;
					img.height=afterImgSize.h;

					var afterimgRectSize=self.getRotatedImgRectSize( self.rotatedRadians, afterImgSize );
					imgWindow.style.width=afterimgRectSize.w +'px';
					imgWindow.style.height=afterimgRectSize.h + 'px';
					self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize,ratio);
					self.setImgOffset({top:0,left:0},afterImgSize,afterimgRectSize);//如果旋转了，调整偏移
					self.zoomLevel=level;
					self.setToolBadge('zoom',level);
					self.keepScreenInside();
				};

				if(typeof e!='object'){
					ratio=ratio? ratio : {
						x:1/2,
						y:1/2,
					};
					zoom(e);
					return;
				};

				this.working=true;

				ratio=this.getZoomRatio({
					x:e.clientX,
					y:e.clientY,
				});


				var moved;
				var lastPageX=e.pageX;
				var currentLevel=this.zoomLevel;
				var moveHandler=function(e){
					moved=true;
					var pageX=e.pageX;
					var level;
					if(pageX > lastPageX){//向右移，zoomin扩大
						self.changeCursor('zoom',false);
						level=0.05;
					}else{//向左移，zoomout缩小
						self.changeCursor('zoom',true);
						level=-0.05;
					};
					lastPageX=pageX;
					currentLevel += level;
					zoom(currentLevel);
				};

				var mouseupHandler=function(e){
					self.working=false;
					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);

					var level=self.getNextZoomLevel();

					if(self.zoomOut && self.altKeyUp){
						self.zoomOut=false;
					};

					if(!moved){//如果没有平移缩放。
						zoom(level);
					};

					self.changeCursor('zoom',self.zoomOut);

					if(self.tempZoom && self.ctrlKeyUp && self.altKeyUp){
						self.tempZoom=false;
						self.changeCursor(self.selectedTool);
					};

				};

				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
			convertToValidRadians:function(radians){
				//转成0-90的等价角度。
				var PI=Math.PI;
				if(radians > PI){
					radians = 2*PI - radians;
				};
				if(radians > 1/2*PI){
					radians = PI - radians;
				};
				return radians;
			},
			getRotatedImgRectSize:function( radians, imgSize ){//通过旋转后的角度和图片的大小，求虚拟矩形的大小
				imgSize= imgSize ? imgSize :{
					h:this.img.clientHeight,
					w:this.img.clentWidth,
				};

				if(typeof radians==='undefined'){
					radians = this.rotatedRadians;
				};

				radians=this.convertToValidRadians(radians);

				return {
					h:imgSize.h* Math.cos(radians) + imgSize.w * Math.sin(radians),
					w:imgSize.h* Math.sin(radians) + imgSize.w * Math.cos(radians),
				};
			},
			getRotatedImgCliSize:function(rectSize,radians){//通过虚拟矩形的大小和图片的旋转角度，求图片的大小

				if(typeof radians==='undefined'){
					radians = this.rotatedRadians;
				};

				radians=this.convertToValidRadians(radians);

				if(radians==0){
					//radians=Math.PI/180 * 1/100;
					return rectSize;
				};

				var h=(rectSize.h-rectSize.w * Math.tan(radians))/(Math.cos(radians)-Math.sin(radians)*Math.tan(radians));
				var w=(rectSize.h - h*Math.cos(radians))/Math.sin(radians);
				return {
					h:h,
					w:w,
				};

			},
			setImgOffset:function(oriOffset,bImgSize,aImgSize){
				var imgStyle=this.img.style;
				var top=Math.floor(oriOffset.top + (aImgSize.h-bImgSize.h)*1/2) + 'px';
				var left=Math.floor(oriOffset.left + (aImgSize.w-bImgSize.w)*1/2) + 'px';
				imgStyle.top= top;
				imgStyle.left= left;
			},
			setImgWindowOffset:function(oriOffset,bImgWindowSize,aImgWidnowSize,ratio){
				ratio= ratio? ratio : {x:1/2,y:1/2};
				var imgWindowStyle=this.imgWindow.style;
				var top=oriOffset.top - (aImgWidnowSize.h-bImgWindowSize.h)*ratio.y + 'px';
				var left=oriOffset.left - (aImgWidnowSize.w-bImgWindowSize.w)*ratio.x + 'px';
				imgWindowStyle.top= top;
				imgWindowStyle.left= left;
			},
			setToolBadge:function(tool,content){
				var scale=0;
				switch(tool){
					case 'zoom':{
						scale=2;
					}break;
					case 'rotate':{
						scale=1;
					}break;
					default:break;
				}
				content=typeof content=='string'? content : content.toFixed(scale);
				this.toolMap[tool].nextElementSibling.textContent=content;
			},
			changeCursor:function(tool,zoomOut){
				if(tool=='zoom'){
					tool+=zoomOut? '-out' : '-in';
				};
				if(this.cursor==tool)return;
				this.cursor=tool;
				var imgWStyle=this.imgWindow.style;
				switch(tool){
					case 'hand':{
						imgWStyle.cursor='pointer';
					}break;
					case 'zoom-in':{
						imgWStyle.cursor=support.cssCursorValue.zoomIn;
					}break;
					case 'zoom-out':{
						imgWStyle.cursor=support.cssCursorValue.zoomOut;
					}break;
					case 'rotate':{
						imgWStyle.cursor='progress';
					}break;
					case 'default':{
						imgWStyle.removeProperty('cursor');
					}break;
					default:break;
				};
			},
			blur:function(e){
				if(!this.focused)return;
				var imgWindow =this.imgWindow;
				//点击imgWinodw的外部的时候失去焦点
				if(e!==true && (imgWindow==e.target || (imgWindow.compareDocumentPosition(e.target) & 16)))return;
				imgWindow.classList.remove('pv-pic-window-container_focus');
				this.toolbar.classList.remove('pv-pic-window-toolbar_focus');
				this.closeButton.classList.remove('pv-pic-window-close_focus');
				this.img.classList.remove('pv-pic-window-pic_focus');
				document.removeEventListener('mousedown',this._blur,true);
				document.removeEventListener('keydown',this._focusedKeydown,true);
				document.removeEventListener('keyup',this._focusedKeyup,true);
				this.changeCursor('default');
				this.focused=false;
			},
			focus:function(){
				if(this.focused)return;
				this.imgWindow.classList.add('pv-pic-window-container_focus');
				this.toolbar.classList.add('pv-pic-window-toolbar_focus');
				this.closeButton.classList.add('pv-pic-window-close_focus');
				this.img.classList.add('pv-pic-window-pic_focus');
				this.imgWindow.style.zIndex= ImgWindowC.styleZIndex;
				this.zIndex=ImgWindowC.styleZIndex;
				ImgWindowC.styleZIndex ++;
				document.addEventListener('keydown',this._focusedKeydown,true);
				document.addEventListener('keyup',this._focusedKeyup,true);
				document.addEventListener('mousedown',this._blur,true);
				this.changeCursor(this.selectedTool);//还原鼠标样式。
				this.focused=true;
			},
			focusedKeyup:function(e){
				var keyCode=e.keyCode;
				var valid=[32,18,16,72,17,72,82,90,67];
				if(valid.indexOf(keyCode)==-1)return;

				e.preventDefault();

				switch(keyCode){
					case 32:{//空格键，临时切换到移动
						this.spaceKeyUp=true;
						if(!this.tempHand)return;//如果之前没有临时切换到抓手工具（当已经在工作的时候，按下空格不会临时切换到抓手工具）
						if(!this.working){//松开按键的时候，没有在继续平移了。
							this.tempHand=false;
							this.changeCursor(this.selectedTool);
						};
					}break;
					case 18:{//alt键盘切换缩小放大。
						this.altKeyUp=true;
						if(!this.zoomOut)return;
						if(!this.working){
							this.zoomOut=false;
							this.changeCursor('zoom');
							if(this.tempZoom && this.ctrlKeyUp){
								this.tempZoom=false;
								this.changeCursor(this.selectedTool);
							};
						};
					}break;
					case 16:{//shift键，旋转的时候按住shift键，步进缩放。
						this.shiftKeyUp=true;
					}break;
					case 17:{//ctrl键
						clearTimeout(this.ctrlkeyDownTimer);
						if(!this.justCKeyUp){//如果刚才没有松开c，规避划词软件的ctrl+c松开
							this.ctrlKeyUp=true;
							if(!this.tempZoom)return;//如果没有切换到了缩放
							if(!this.working && this.altKeyUp){
								this.tempZoom=false;
								this.changeCursor(this.selectedTool);
							};
						};
					}break;
					case 67:{//c键
						this.justCKeyUp=true;
						var self=this;
						clearTimeout(this.justCKeyUpTimer);
						this.justCKeyUpTimer=setTimeout(function(){
							self.justCKeyUp=false;
						},100)
					}break;
					case 72:{//h键
						this.hKeyUp=true;
					}break;
					case 82:{//r键
						this.rKeyUp=true;
					}break;
					case 90:{//z键
						this.zKeyUp=true;
					}break;
					default:break;
				};

				if([72,82,90].indexOf(keyCode)!=-1){
					if(!this.working && this.restoreBeforeTool){
						this.restoreBeforeTool=false;
						this.selectTool(this.beforeTool);
					};
				};
			},
			focusedKeydown:function(e){
				var keyCode=e.keyCode;
				var valid=[32,82,72,90,18,16,17,27,67];//有效的按键
				if(valid.indexOf(keyCode)==-1) return;

				e.preventDefault();

				if(this.working){//working的时候也可以接受按下shift键，以便旋转的时候可以任何时候按下
					if(keyCode==16){//shift键
						this.shiftKeyUp=false;
					};
					return;
				};

				switch(keyCode){
					case 82:{//r键,切换到旋转工具
						if(this.rKeyUp){
							this.rKeyUp=false;
							this.beforeTool=this.selectedTool;
							this.selectTool('rotate');
						};
					}break;
					case 72:{//h键,切换到抓手工具
						if(this.hKeyUp){
							this.hKeyUp=false;
							this.beforeTool=this.selectedTool;
							this.selectTool('hand');
						};
					}break;
					case 90:{//z键,切换到缩放工具
						if(this.zKeyUp){
							this.zKeyUp=false;
							this.beforeTool=this.selectedTool;
							this.selectTool('zoom');
						};
					}break;
					case 32:{//空格键阻止,临时切换到抓手功能
						if(this.spaceKeyUp){
							this.spaceKeyUp=false;
							if(this.selectedTool!='hand'){
								this.tempHand=true;
								this.changeCursor('hand');
							};
						};
					}break;
					case 18:{//alt键,在当前选择是缩放工具的时候，按下的时候切换到缩小功能
						if(this.altKeyUp){
							if((this.selectedTool!='zoom' && !this.tempZoom) || this.zoomOut)return;
							this.zoomOut=true;
							this.altKeyUp=false;
							this.changeCursor('zoom',true);
						};
					}break;
					case 17:{//ctrl键临时切换到缩放工具
						if(this.ctrlKeyUp){
							var self=this;
							this.ctrlkeyDownTimer=setTimeout(function(){//规避词典软件的ctrl+c，一瞬间切换到缩放的问题
								self.ctrlKeyUp=false;
								if(self.selectedTool!='zoom'){
									self.tempZoom=true;
									self.changeCursor('zoom');
								};
							},100);
						};
					}break;
					case 67:{//c键
						clearTimeout(this.ctrlkeyDownTimer);
					}break;
					case 27:{//ese关闭窗口
						this.remove();
					}break;
					default:break;
				};
			},
			toolbarEventHandler:function(e){
				e.stopPropagation();
				var target=e.target;
				var toolMap=this.toolMap;
				for(var i in toolMap){
					if(toolMap.hasOwnProperty(i) && toolMap[i]==target){
						switch(e.type){
							case 'mousedown':{
								this.selectTool(i);
							}break;
							case 'dblclick':{
								this.dblclickCommand(i);
							}break;
							default:break;
						};
						break;
					};
				};
			},
			imgWindowEventHandler:function(e){
				e.stopPropagation();
				switch(e.type){
					case 'click':{//阻止opera的图片保存
						if(e.ctrlKey && e.target.nodeName=='IMG'){
							e.preventDefault();
						};
					}break;
					case 'mousedown':{
						if(!this.focused){//如果没有focus，先focus
							this.focus();
							this.keepScreenInside();
						};

						var target=e.target;
						if(e.button!=0 || (target!=this.imgWindow && target!=this.img))return;
						var selectedTool=this.selectedTool;
						if(this.tempHand){
							this.move(e);
						}else if(this.tempZoom){
							this.zoom(e);
						}else if(selectedTool=='hand'){
							this.restoreBeforeTool=!this.hKeyUp;
							if(this.hKeyUp){
								this.move(e);
							}else{//鸟瞰视图
								this.aerialView(e);
							};
						}else if(selectedTool=='rotate'){
							var rIS=ImgWindowC.rotateIndicator.style;
							rIS.display='block';
							var origin={//旋转原点
								pageX:e.pageX - 30,//稍微偏左一点。
								pageY:e.pageY,
							};
							rIS.top=origin.pageY + 'px';
							rIS.left=origin.pageX + 'px';
							ImgWindowC.rotateIndicatorPointer.style[support.cssTransform]='rotate(' + this.rotatedRadians + 'rad)';
							this.restoreBeforeTool=!this.rKeyUp;
							this.rotate(origin);
						}else if(selectedTool=='zoom'){
							this.restoreBeforeTool=!this.zKeyUp;
							this.zoom(e);
						};
					}break;
					case support.wheelEvent:{
						if(!this.focused)return;//如果没有focus
						e.preventDefault();
						if(this.working)return;
						var oriZoomOut=this.zoomOut;
						wheelEventObjectFix(e);
						this.zoomOut = !(e.delta>0)

						var ratio=this.getZoomRatio({
							x:e.clientX,
							y:e.clientY,
						});

						var level=this.getNextZoomLevel();

						this.zoom(level,ratio);
						this.zoomOut=oriZoomOut;
					}break;
					default:break;
				};
			},
			dblclickCommand:function(tool){
				var done;
				switch(tool){
					case 'hand':{//双击居中,并且适应屏幕
						this.zoom(1);
						this.fitToScreen();
						this.center(true,true);
						this.keepScreenInside();
					}break;
					case 'rotate':{//双击还原旋转
						if(this.rotatedRadians==0)return;
						done=true;
						this.rotate(0,true);
					}break;
					case 'zoom':{//双击还原缩放
						if(this.zoomLevel==1)return;
						done=true;
						this.zoom(1,{x:0,y:0});
					}break;
					default:break;
				};

				if((tool=='rotate' || tool=='zoom') && done){
					var imgWindow=this.imgWindow;
					var imgWinodowRect=imgWindow.getBoundingClientRect();
					var imgWindowStyle=imgWindow.style;
					if(imgWinodowRect.left<40){
						imgWindowStyle.left=40 + window.scrollX + 'px';
					};
					if(imgWinodowRect.top<-5){
						imgWindowStyle.top=-5 + window.scrollY +'px';
					};
					this.keepScreenInside();
				};

				},
			doFlipCommand:function(command){
				var map={
					fv:[/scaleY\([^)]*\)/i,' scaleY(-1) '],
					fh:[/scaleX\([^)]*\)/i,' scaleX(-1) '],
				};

				var iTransform=this.img.style[support.cssTransform];

				var toolClassList=this.toolMap[command].classList;

				if(map[command][0].test(iTransform)){
					iTransform=iTransform.replace(map[command][0],'');
					toolClassList.remove(this.selectedToolClass);
				}else{
					iTransform += map[command][1];
					toolClassList.add(this.selectedToolClass);
				};
				this.img.style[support.cssTransform]=iTransform;
				
			},
			selectTool:function(tool){
				var command=['fv','fh'];
				if(command.indexOf(tool)==-1){//工具选择
					if(this.selectedTool==tool)return;
					var selectedTool=this.selectedTool;
					this.selectedTool=tool;
					if(this.tempHand || this.tempZoom){//临时工具中。不变鼠标
						return;
					};
					this.toolMap[selectedTool].classList.remove(this.selectedToolClass);
					this.toolMap[tool].classList.add(this.selectedToolClass);
					this.changeCursor(tool);
				}else{//命令
					this.doFlipCommand(tool);
				};
			},
			remove:function(){
				if(this.removed)return;
				this.removed=true;
				this.blur(true);
				this.img.src='';//如果在加载中取消，图片也取消读取。
				if(this.overlayer){
					this.overlayer.parentNode.removeChild(this.overlayer);
				};
				this.imgWindow.parentNode.removeChild(this.imgWindow);

				var index=ImgWindowC.all.indexOf(this);
				ImgWindowC.all.splice(index,1);

				//focus next
				var topmost=0;
				ImgWindowC.all.forEach(function(iwin){
					if(iwin.zIndex > topmost){
						topmost=iwin;
					};
				});
				if(topmost){
					topmost.focus();
				};
			},
			aerialView:function(e){
				this.working=true;
				//记住现在的缩放比例
				var cLevel=this.zoomLevel;

				var wSize=getWindowSize();
				wSize.h -= 16;
				wSize.w -= 16;

				var imgWindow=this.imgWindow;
				var imgWindowCS=getComputedStyle(imgWindow,'');
				var rectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};
				var rectRatio=rectSize.h/rectSize.w;
				var windowRatio=wSize.h/wSize.w;

				var size;
				var rangeSize={};
				if(rectRatio > windowRatio){
					size={
						h:wSize.h,
						w:wSize.h / rectRatio,
					};
					rangeSize.h=Math.min(wSize.h *  (size.h / rectSize.h), size.h);
					rangeSize.w=Math.min(rangeSize.h / windowRatio , size.w);
				}else{
					size={
						w:wSize.w,
						h:wSize.w * rectRatio,
					};
					rangeSize.w=Math.min(wSize.w *  (size.w / rectSize.w), size.w);
					rangeSize.h=Math.min(rangeSize.w * windowRatio , size.h);
				};


				this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);

				this.center(true,true);

				this.keepScreenInside();

				var viewRange=this.viewRange;
				var vRS=viewRange.style;
				vRS.display='block';
				vRS.height=rangeSize.h + 'px';
				vRS.width=rangeSize.w + 'px';
				vRS.top=0 + 'px';
				vRS.left=0 + 'px';
				


				var viewRangeRect=viewRange.getBoundingClientRect();
				var viewRangeCenterCoor={
					x:viewRangeRect.left + window.scrollX + 1/2 * rangeSize.w,
					y:viewRangeRect.top + window.scrollY + 1/2 * rangeSize.h,
				};

				var self=this;

				var moveRange={
					x:[8,8+size.w-rangeSize.w],
					y:[8,8+size.h-rangeSize.h]
				};


				function setViewRangePosition(pageXY){
					var top=pageXY.y - viewRangeCenterCoor.y;
					var left=pageXY.x - viewRangeCenterCoor.x;
					if(top<=moveRange.y[0]){
						top=moveRange.y[0];
					}else if(top>=moveRange.y[1]){
						top=moveRange.y[1];
					};
					vRS.top= top + 'px';
					if(left<=moveRange.x[0]){
						left=moveRange.x[0];
					}else if(left>=moveRange.x[1]){
						left=moveRange.x[1];
					};
					vRS.left= left + 'px';
				};

				setViewRangePosition({
					x:e.pageX,
					y:e.pageY,
				});

				var moveHandler=function(e){
					setViewRangePosition({
						x:e.pageX,
						y:e.pageY,
					});
				};

				var mouseupHandler=function(){
					self.working=false;
					viewRange.style.display='none';
					self.zoom(cLevel);
					imgWindow.style.top= -13 -  rectSize.h * ((parseFloat(vRS.top) - moveRange.y[0])/size.h) + window.scrollY +'px'; 
					imgWindow.style.left= -13 - rectSize.w * ((parseFloat(vRS.left) - moveRange.x[0])/size.w) + window.scrollX +'px';
					
					//说明图片的高度没有屏幕高，居中
					//说明图片的宽度没有屏幕宽，居中
					self.center(rangeSize.w == size.w , rangeSize.h == size.h);

					self.keepScreenInside();

					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);
				};
				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
		};


		//载入动画
		function LoadingAnimC(data,buttonType,waitImgLoad,openInTopWindow){
			this.data=data;//data
			this.buttonType=buttonType;//点击的按钮类型
			this.openInTopWindow=openInTopWindow;//是否在顶层窗口打开，如果在frame里面的话
			this.waitImgLoad=waitImgLoad;//是否等待完全读取后打开
			this.init();
		};

		LoadingAnimC.all=[];

		LoadingAnimC.prototype={
			init:function(){
				this.addStyle();
				var container=document.createElement('span');

				container.classList.add('pv-loading-container');
				this.loadingAnim=container;

				container.title='正在加载:' + this.data.src;
				container.innerHTML=''+
									'<span class="pv-loading-error" style="display:none;">加载失败</span>'+
									'<span class="pv-loading-cancle" title="取消"></span>';


				var loadingError=container.querySelector('.pv-loading-error');
				var loadingCancle=container.querySelector('.pv-loading-cancle');

				this.loadingError=loadingError;
				this.loadingCancle=loadingCancle;

				var self=this;
				loadingCancle.addEventListener('click',function(e){
					img.src='';
					self.remove();
				},true);

				document.body.appendChild(container);
				this.setPosition();

				var img=new Image();
				img.src= this.buttonType=='current'? this.data.imgSrc : this.data.src;

				imgReady(img,function(e){
					self.load(this,e);
				},function(e){
					self.load(this,e);
				},function(e){
					self.error(this,e);
				});

				LoadingAnimC.all.push(this);
			},
			addStyle:function(){
				if(LoadingAnimC.styleAdded)return;
				LoadingAnimC.styleAdded=true;
				var style=document.createElement('style');
				style.type='text/css';
				style.textContent='\
					.pv-loading-container {\
						position: absolute;\
						z-index:999999997;\
						top: 100px;\
						left: 100px;\
						background-color: black;\
						background-image: url("'+prefs.icons.loading+'");\
						background-repeat: no-repeat;\
						background-position: center;\
						background-origin: content-box;\
						border: none;\
						padding: 1px 30px 1px 2px;\
						margin: 0;\
						opacity: 0.6;\
						height: 24px;\
						min-width: 24px;\
						box-shadow: 2px 2px 0px #666;\
						-webkit-transition: opacity 0.15s ease-in-out;\
						transition: opacity 0.15s ease-in-out;\
					}\
					.pv-loading-container:hover {\
						opacity: 0.9;\
					}\
					.pv-loading-cancle {\
						cursor: pointer;\
						background-image: url("'+prefs.icons.loadingCancle+'");\
						height: 24px;\
						width: 24px;\
						position: absolute;\
						right: 0;\
						top: 0;\
						opacity: 0.2;\
						display: block;\
						-webkit-transition: opacity 0.15s ease-in-out;\
						transition: opacity 0.15s ease-in-out;\
					}\
					.pv-loading-cancle:hover {\
						opacity: 1;\
					}\
					.pv-loading-error {\
						line-height: 24px;\
						color: red;\
						font-size: 12px;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			remove:function(){
				if(!this.removed){
					this.removed=true;
					this.loadingAnim.parentNode.removeChild(this.loadingAnim);
					LoadingAnimC.all.splice(LoadingAnimC.all.indexOf(this),1);
				};
			},
			error:function(img,e){
				this.loadingAnim.style.backgroundImage='none';
				this.loadingError.style.removeProperty('display');
				var self=this;
				setTimeout(function(){
					self.remove();
				},2000)
			},
			setPosition:function(){
				var position=getTargetPosition(this.data.img);
				var cs=this.loadingAnim.style;
				cs.top=position.top +1 + 'px';
				cs.left=position.left +1 + 'px';
				cs.removeProperty('display');
			},
			load:function(img,e){
				if(this.done)return;
				if( this.waitImgLoad && e.type=='ready' )return;
				this.done=true;
				this.remove();
				this.img=img;
				var buttonType=this.buttonType;

				if(buttonType=='gallery'){
					var allData=this.getAllValidImgs();
					allData.target=this.data;
					this.data=allData;
				};

				if(this.openInTopWindow && isFrame && buttonType!='magnifier'){
					var data=this.data;
					//删除不能发送的项。
					var delCantClone=function(obj){
						delete obj.img;
						delete obj.imgPA;
					};
					if(Array.isArray(data)){
						delCantClone(data.target);
						data.forEach(function(obj){
							delCantClone(obj);
						});
					}else{
						delCantClone(data);
					};

					window.postMessage({
						messageID:messageID,
						src:img.src,
						data:data,
						buttonType:buttonType,
						to:'top',
					},'*');
				}else{
					this.open();
				};


			},
			getAllValidImgs:function(){
				var imgs=document.getElementsByTagName('img'),//html collection
					validImgs=[]
				;
				arrayFn.forEach.call(imgs,function(img,index,imgs){
					var result=findPic(img);
					if(result){
						validImgs.push(result);
					};
				});
				return validImgs;
			},
			open:function(){
				switch(this.buttonType){
					case 'gallery':{
						if(!gallery){
							gallery=new GalleryC();
						};
						gallery.load(this.img,this.data,this.from);
					}break;
					case 'magnifier':{
						new MagnifierC(this.img,this.data);
					}break;
					case 'actual':;
					case 'current':;
					case 'original':{//original 是为了兼容以前的规则
						new ImgWindowC(this.img);
					}break;
				};
			},
		};

		//工具栏
		function FloatBarC(){
			this.init();
		};


		FloatBarC.prototype={
			init:function(){
				this.addStyle();
				var container=document.createElement('span');
				container.id='pv-float-bar-container';
				//innerHTML中的span不能加空格
				container.innerHTML=''+
									'<span class="pv-float-bar-button"></span>'+
									'<span class="pv-float-bar-button"></span>'+
									'<span class="pv-float-bar-button"></span>'+
									'<span class="pv-float-bar-button"></span>';
				document.body.appendChild(container);

				var buttons={};
				this.buttons=buttons;
				this.children=container.children;

				arrayFn.forEach.call(this.children,function(child,index,children){
					var titleMap={
						actual:'查看原始',
						gallery:'查看库',
						current:'查看当前',
						magnifier:'放大镜',
					};
					var buttonName=prefs.floatBar.butonOrder[index];
					buttons[buttonName]=child;
					child.title=titleMap[buttonName];
					child.classList.add('pv-float-bar-button-' + buttonName);
				});


				this.floatBar=container;
				this.shown=true;
				this.preShownImg=null;


				var self=this;
				container.addEventListener('click',function(e){
					var buttonType;
					var target=e.target;
					for(var type in buttons){
						if(!buttons.hasOwnProperty(type))return;
						if(target==buttons[type]){
							buttonType=type;
							break;
						};
					};
					if(!buttonType)return;

					self.hide();
					self.open(e,buttonType);

				},true);


				addCusMouseEvent('mouseleave',container,function(e){
					clearTimeout(self.hideTimer);
					self.hideTimer=setTimeout(function(){
						self.hide();
					},prefs.floatBar.hideDelay);
				});

				addCusMouseEvent('mouseenter',container,function(e){
					clearTimeout(self.hideTimer);
				});
			},
			addStyle:function(){
				var style=document.createElement('style');
				style.type='text/css';
				style.textContent='\
					#pv-float-bar-container {\
						position: absolute;\
						z-index:999999998;\
						top: -100px;\
						left: -100px;\
						padding: 5px;\
						margin: 0;\
						border: none;\
						opacity: 0.6;\
						line-height: 0;\
						-webkit-transition: opacity 0.2s ease-in-out;\
						transition: opacity 0.2s ease-in-out;\
					}\
					#pv-float-bar-container:hover {\
						opacity: 1;\
					}\
					.pv-float-bar-button {\
						cursor: pointer;\
						width: 18px;\
						height: 18px;\
						padding: 1px;\
						margin: 0;\
						border: none;\
						display: inline-block;\
						position: relative;\
						border-radius: 100px;\
						box-shadow: 1px 1px 3px 0px black;\
						background-color: transparent;\
						background-repeat: no-repeat;\
						background-origin: content-box;\
						background-clip: content-box;\
						background-size: 100% 100%;\
						-webkit-transition: margin-left 0.15s ease-in-out,  width 0.15s ease-in-out,  height 0.15s ease-in-out;\
						transition: margin-left 0.15s ease-in-out,  width 0.15s ease-in-out,  height 0.15s ease-in-out;\
					}\
					.pv-float-bar-button:nth-child(n+2){\
						margin-left: -16px;\
					}\
					.pv-float-bar-button:first-child {\
						z-index: 4;\
					}\
					.pv-float-bar-button:nth-child(2) {\
						z-index: 3;\
					}\
					.pv-float-bar-button:nth-child(3) {\
						z-index: 2;\
					}\
					.pv-float-bar-button:last-child {\
						z-index: 1;\
					}\
					#pv-float-bar-container:hover > .pv-float-bar-button {\
						width: 24px;\
						height: 24px;\
					}\
					#pv-float-bar-container:hover > .pv-float-bar-button:nth-child(n+2) {\
						margin-left: 0;\
					}\
					.pv-float-bar-button-actual {\
						background-image:url("'+ prefs.icons.actual +'");\
						background-color: red;\
					}\
					.pv-float-bar-button-gallery {\
						background-image:url("'+ prefs.icons.gallery +'");\
						background-color: yellow;\
					}\
					.pv-float-bar-button-current {\
						background-image:url("'+ prefs.icons.current +'");\
						background-color: blue;\
					}\
					.pv-float-bar-button-magnifier {\
						background-image:url("'+ prefs.icons.magnifier +'");\
						background-color: pink;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			start:function(data){

				//读取中的图片,不显示浮动栏,调整读取图标的位置.
				if(LoadingAnimC.all._find(function(item,index,array){
					if(data.img==item.data.img){
						return true;
					};
				}))return;


				//被放大镜盯上的图片,不要显示浮动栏.
				if(MagnifierC.all._find(function(item,index,array){
					if(data.img==item.data.img){
						return true;
					};
				}))return;

				this.data=data;
				var self=this;
				clearTimeout(this.hideTimer);

				var imgOutHandler=function(e){
					document.removeEventListener('mouseout',imgOutHandler,true);
					clearTimeout(self.showTimer);
					clearTimeout(self.hideTimer);
					self.hideTimer=setTimeout(function(){
						self.hide();
					},prefs.floatBar.hideDelay);
				};

				document.addEventListener('mouseout',imgOutHandler,true);


				if(data.img==this.preShownImg && this.shown){
					this.setPosition();
					return;
				};

				clearTimeout(this.showTimer);
				this.showTimer=setTimeout(function(){
					self.show();
				},prefs.floatBar.showDelay);
			},
			setButton:function(){
				if(this.data.type=='force'){
					this.buttons['actual'].style.display='none';
					this.buttons['magnifier'].style.display='none';
				}else{
					this.buttons['actual'].style.removeProperty('display');
					this.buttons['magnifier'].style.removeProperty('display');
				};
				if(this.data.gallery){
					this.buttons['gallery'].style.display='none';
				}else{
					this.buttons['gallery'].style.removeProperty('display');
				};
				//如果隐藏的按钮是第一个，css弹出层叠按钮的动画会有些维和，这些修正一下。
				var firstHidden;
				arrayFn._find.call(this.children,function(child, index, children){
					var cs=child.style;
					if(index==0){
						if(cs.display=='none'){
							firstHidden=true;
						};
					};

					if(firstHidden){//如果第一个是隐藏的，那么去掉以后第一个非隐藏的marginleft
						if(cs.display!='none'){
							cs.marginLeft=0;
							return true;
						};
					}else{
						cs.removeProperty('margin-left');
					};
				});
			},
			setPosition:function(){
				//如果图片被删除了，或者隐藏了。
				var bCR=this.data.img.getBoundingClientRect();

				if((bCR.left==0 && bCR.right==0) || (bCR.top==0 && bCR.bottom==0))return false;

				var targetPosi=getTargetPosition(this.data.img);
				var windowSize=getWindowSize();

				var floatBarPosi=prefs.floatBar.position.toLowerCase().trim().split(/\s+/);

				var offsetX=prefs.floatBar.offset.x;
				var offsetY=prefs.floatBar.offset.y;


				var scrollXY={
					x:window.scrollX,
					y:window.scrollY,
				};

				var fbs=this.floatBar.style;
				var setPosition={
					top:function(){
						var top=targetPosi.top;
						if(targetPosi.t < -offsetY){//满足图标被遮住的条件.
							top=scrollXY.y;
							offsetY=0;
						};
						fbs.top=top + offsetY + 'px';
					},
					right:function(){
						var right=windowSize.w - targetPosi.r;
						if(right < offsetX){
							right= -scrollXY.x;
							offsetX=0;
						}else{
							right -=scrollXY.x;
						};
						fbs.right=right - offsetX + 'px';
					},
					bottom:function(){
						var bottom=windowSize.h-targetPosi.b;
						if(bottom <= offsetY){
							offsetY=0;
						};
						bottom -= scrollXY.y;
						fbs.bottom=bottom - offsetY + 'px';
					},
					left:function(){
						var left=targetPosi.left;
						if(targetPosi.l < -offsetX){
							left=scrollXY.x;
							offsetX=0;
						};
						fbs.left=left + offsetX + 'px';
					},
				};

				setPosition[floatBarPosi[0]]();
				setPosition[floatBarPosi[1]]();
			},
			show:function(){
				if(this.setPosition()===false){
					return;
				};
				this.preShownImg=this.data.img;
				this.shown=true;
				this.setButton();
				this.floatBar.style.removeProperty('display');
				clearTimeout(this.hideTimer);
			},
			hide:function(){
				clearTimeout(this.showTimer);
				this.shown=false;
				this.floatBar.style.display='none';
			},
			open:function(e,buttonType){
				var waitImgLoad=e.ctrlKey? !prefs.waitImgLoad : prefs.waitImgLoad;//按住ctrl取反向值
				var openInTopWindow=e.shiftKey? !prefs.framesPicOpenInTopWindow : prefs.framesPicOpenInTopWindow;//按住shift取反向值

				if(!waitImgLoad && buttonType=='magnifier' && !envir.chrome){//非chrome的background-image需要全部载入后才能显示出来
					waitImgLoad=true;
				};
				new LoadingAnimC(this.data,buttonType,waitImgLoad,openInTopWindow);
			},
		};


		var matchedRule,
			URL=location.href,
			floatBar
		;

		function findPic(img){
			var imgPA=getElementByXpath('./ancestor::a[1]',img);

			var iPASrc=imgPA? imgPA.href : '';
			//base64字符串过场导致正则匹配卡死浏览器
			var base64Img=/^data:[^;]+;base64,/i.test(img.src);


			if(matchedRule===undefined){//找到符合站点的高级规则,并缓存.
				matchedRule=siteInfo._find(function(site,index,array){
					if(site.enabled && site.url && site.url.test(URL)){
						return true;
					};
				});
				matchedRule=matchedRule? matchedRule[0] : false;
				//console.log('匹配的规则：',matchedRule);
			};

			var src,
				type
			;

			if(matchedRule){//通过高级规则获取.
				try{
					src=matchedRule.getImage.call(img,img,imgPA);
				}catch(err){
					throwErrorInfo(err);
				};

				if(src)type='rule';
			};

			if(!src && !base64Img){//遍历通配规则
				tprules._find(function(rule,index,array){
					try{
						src=rule.call(img,img,imgPA);
						if(src){
							//console.log('匹配的通配规则',rule);
							return true;
						};
					}catch(err){
						throwErrorInfo(err);
					};
				});
				if(src)type='tpRule';
			};

			if(!src && imgPA){//链接可能是一张图片...
				if(/\.(?:jpg|jpeg|png|gif|bmp)$/i.test(iPASrc)){
					src=iPASrc;
				};
				if(src)type='scale';
			};

			if(!src){//本图片是否被缩放.
				var imgAS={//实际尺寸。
					h:img.naturalHeight,
					w:img.naturalWidth,
				};
				var imgCS=getCurrentSize(img);
				if(!(imgAS.w==imgCS.w && imgAS.h==imgCS.h)){//如果不是两者完全相等,那么被缩放了.
					if(imgAS.h > prefs.floatBar.minSizeLimit.h || imgAS.w > prefs.floatBar.minSizeLimit.w){//最小限定判断.
						src=img.src;
						type='scale';
					};
				}else{
					if(prefs.floatBar.forceShow.enabled && (imgCS.w>=prefs.floatBar.forceShow.size.w && imgCS.h>=prefs.floatBar.forceShow.size.h)){
						src=img.src;
						type='force';
					};
				};
			};


			if(!src)return;

			var ret={
				src:src,//得到的src
				type:type,//通过哪种方式得到的
				imgSrc:img.src,//处理的图片的src
				iPASrc:iPASrc,//图片的第一个父a元素的链接地址

				img:img,//处理的图片
				imgPA:imgPA,//图片的第一个父a元素
				gallery:img.classList.contains('pv-gallery-img'),
			};

			//console.log('图片查找结果:',ret);
			return ret;
		};


		var isFrame=window!=window.parent;

		window.addEventListener('message',function(e){//contentscript里面的message监听，监听来自别的窗口的数据。
			var data=e.data;
			if( !data || !data.messageID || data.messageID != messageID )return;//通信ID认证
			var source=e.source;
			if(typeof source=='undefined' || source!==window){//来自别的窗口
				if(!isFrame){//顶层窗口
					//console.log('top-contentscript接收到：',e);

/*
					window.postMessage({
						messageID:messageID,
						to:data.from,
						data:'hello',
					},'*');
*/

					var img=new Image();
					img.src=data.src;

					var done;
					var load = function(){
						if(done)return;
						done=true;
						LoadingAnimC.prototype.open.call({
							img:img,
							data:data.data,
							buttonType:data.buttonType,
							from:data.from,//来自哪个窗口
						});
					};

					imgReady(img,load,load);
				}else{//frame窗口
					//console.log('frame-contentscript接收到',e);
				};

			};
		},true);



		//页面脚本用来转发消息
		//原因chrome的contentscript无法访问非自己外的别的窗口。都会返回undefined，自然也无法向其他的窗口发送信息,这里用pagescript做个中间代理
		//通讯逻辑..A页面的contentscript发送到A页面的pagescript，pagescript转交给B页面的contentscript

		var messageID='pv-0.5106795670312598';

		var pageScript=document.createElement('script');

		var pageScriptText=function(messageID){
			var frameID=Math.random();
			var frames={
				top:window.top,
			};

			window.addEventListener('message',function(e){
				var data=e.data;
				if( !data || !data.messageID || data.messageID != messageID )return;//通信ID认证
				var source=e.source;
				if(source===window){//来自contentscript,发送出去
					data.from=frameID;
					frames[data.to].postMessage(data,'*');
				}else{//来自别的窗口的，contentscript可以直接接收，这里保存下来自的窗口的引用
					frames[data.from]=source;
				};
			},true)
		};

		pageScript.textContent='(' + pageScriptText.toString() + ')('+ JSON.stringify(messageID) +')';
		document.querySelector('head').appendChild(pageScript);


		function clikToOpen(data){

			var preventDefault = matchedRule.clikToOpen.preventDefault;

			function mouseout(){
				document.removeEventListener('mouseout',mouseout,true);
				data.img.removeEventListener('click',click,false);
				if(data.imgPA && preventDefault){
					data.imgPA.removeEventListener('click',clickA,false);
				};
			};

			function click(e){
				FloatBarC.prototype.open.call({
					data:data,
				},
				e,
				matchedRule.clikToOpen.type);
			};

			function clickA(e){
				e.preventDefault();
			};

			data.img.addEventListener('click',click,false);

			if(data.imgPA && preventDefault){
				data.imgPA.addEventListener('click',clickA,false);
			};

			document.addEventListener('mouseout',mouseout,true);
		};

		//监听 mouseover
		function globalMouseoverHandler(e){
			var target=e.target;
			if(target.nodeName!='IMG' || target.classList.contains('pv-pic-not-allowed')){
				return;
			};

			var result=findPic(target);
			if(result){
				if(!floatBar){
					floatBar=new FloatBarC();
				};
				if(result.type=='rule' && matchedRule.clikToOpen && matchedRule.clikToOpen.enabled){
					clikToOpen(result);
				};
				floatBar.start(result);//出现悬浮工具栏
				
			};
		};

		document.addEventListener('mouseover',globalMouseoverHandler,true);
	};







	function init2(){
		init(topObject,window,document,arrayFn,envir);
	};


	var arrayFn=(function(){
		//Array的某些方法对所有的类数组都有效，比如HTMLCollection,NodeList

		//添加一个当函数返回true时，返回[array[index],index]，并且跳出循环的方法
		//类似做到 for 循环，在满足条件的时候直接break跳出的效果。
		if(typeof Array.prototype['_find']!='function'){
			Object.defineProperty(Array.prototype,'_find',{
				value:function(callback , thisArg){
					if (this == null){
						throw new TypeError( "this is null or not defined" );
					};

					if(typeof callback != 'function') {
						throw new TypeError( callback + " is not a function" );
					};

					var i = 0,
						l = this.length,
						value,
						hasOwnProperty=Object.prototype.hasOwnProperty
					;


					while(i<l){
						if(hasOwnProperty.call(this,i)){
							value = this[i];
							if(callback.call( thisArg, value, i, this )===true){
								return [value,i,this];
							};
						};
						i++;
					};
				},
				writable:true,
				enumerable:false,//与原生方法一样不可枚举，维护网页和谐。。。
				configurable:true,
			});
		};

		var arrayProto=Array.prototype;
		return {
			_find:arrayProto._find,
			slice:arrayProto.slice,
			forEach:arrayProto.forEach,
			some:arrayProto.some,
			every:arrayProto.every,
			map:arrayProto.map,
			filter:arrayProto.filter,
			indexOf:arrayProto.indexOf,
			lastIndexOf:arrayProto.lastIndexOf,
		};

	})();


	//检测运行环境
	var envir={
		opera:!!window.opera,
		chrome:!!window.chrome,
		firefox:typeof XPCNativeWrapper=='function'? true : false,
	};


	if(document.readyState=='loading'){
		document.addEventListener('DOMContentLoaded',init2,true);
	}else if(document.readyState!='complete'){
		document.addEventListener('DOMContentLoaded',function(){
			window.removeEventListener('load',init2,true);
			init2();
		},true);
		window.addEventListener('load',init2,true);
	}else{
		init2();
	};
})(this,window,document)
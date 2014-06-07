// ==UserScript==
// @name           Search Jump Around
// @namespace      http://userscripts.org/users/86496
// @description    Jump between web searches of Google, Baidu, Youdao, Bing and more.
// @version        2.20
// @include        http://*
// @include        https://www.google.*
// ==/UserScript==

// Special credit for Dave Child
// Mod by hzhbest
// Version 1.12 20100125
// Version 2.00 20100802

// Customization
// ---------------------------------
// openNewWin - 是否在新窗口（标签）显示跳转的搜索页面（1－是；0－否） |Show jumped page on new window / tab (1-yes; 0-no)
// engArr[i].on - 搜索引擎开关，“1”为“启用”|Whether to show this engine in list or not
// engArr[i].type - 搜索引擎类型|Search engine type
//			0 - 综合类|General
//			1 - 图片类|Image
//			2 - 视频类|Video
//			3 - 新闻类|News
//			4 - 购物类|Shop
//			5 - 博客类|Blog
//			6 - 地图类|Map
//			7 - 音乐类|Music
//			-1 - 任何情况下都显示|Override
// engArr[i].icon - 搜索引擎网站图标|Search engine favicon
// engArr[i].name - 搜索引擎名称|Search engine name
// engArr[i].kwI - 识别URL中搜索关键词的关键字|Querystring variable key for keywords entered
// engArr[i].url1 - 识别搜索网站的URL关键字1|URL portion identifying search from this engine
// engArr[i].url2 - 识别搜索网站的URL关键字2|URL portion identifying search from this engine
// engArr[i].urlS - 搜索引擎URL（“--keywords--”用于替换搜索关键词）|Search URL ("--keywords--" to be replaced by searched-for keywords)
//			--keywords-- - 替换UTF-8编码关键词
//			(-=keywords=- - 替换GB2312编码关键词;暂时无效)
// icons - 搜索引擎网站图标URL|Search engine favicon



(function() { //var l = console.log;

var engArr = [];
var lg = [];
var favImg = [];
var titlebox, config_btn;
var CO = 'SearchJumpAround_config';

if (typeof GM_getValue == "function") {
	var get_config = GM_getValue;
	var set_config = GM_setValue;
} else { // workaround functions, creadit to ww_start_t
	var set_config = function(cookieName, cookieValue, lifeTime){
		if (!cookieName) {return;}
		if (lifeTime == "delete") {lifeTime = -10;} else {lifeTime = 31536000;}
		document.cookie = escape(cookieName)+ "=" + escape(getRecoverableString(cookieValue))+
			";expires=" + (new Date((new Date()).getTime() + (1000 * lifeTime))).toGMTString() + ";path=/";
	};
	var get_config = function(cookieName, oDefault){
		var cookieJar = document.cookie.split("; ");
		for (var x = 0; x < cookieJar.length; x++ ) {
			var oneCookie = cookieJar[x].split("=");
			if (oneCookie[0] == escape(cookieName)) {
				try {
					eval('var footm = '+unescape(oneCookie[1]));
				} catch (e) {return oDefault;}
				return footm;
			}
		}
		return oDefault;
	};
}

var config = get_config(CO, '1|0|150').split('|');
for (i in config) {config[i] = Number(config[i]);}
var nw = config[0]; // Open in new window/tab, "0" false, "1" true.
var lt = config[1]; // Show SJA bar on left, "0" false, "1" true.
var tp = config[2]; // SJA bar's top position, pixel.
//l(nw,lt,tp);
// ## Customization | 自定义区 ##

	var icons = {
		goo : "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7PT7/3zF6/9Ptu//RbHx/0227/+Tzvb/9vv5/97h0f9JeBz/NHoA/z98Av9AfAD/PHsA/0F6AP8AAAAA/vz7/1+33/8Mp+z/FrHw/xWy8f8bs/T/Hqrx/3zE7v////7/t8qp/zF2A/87gwH/P4ID/z59AP8+egD/Q3kA/97s8v8botj/ELn3/wy58f8PtfL/D7Lw/xuz9P8vq+f/8/n///779v9KhR3/OYYA/0GFAv88hgD/QIAC/z17AP/0+/j/N6bM/wC07/8Cxf7/CsP7/wm+9v8Aqur/SrDb//7+/v///P7/VZEl/zSJAP87jQD/PYYA/0OBBf8+fQH///3//9Dp8/84sM7/CrDf/wC14/8CruL/KqnW/9ns8f/8/v//4OjX/z+GDf85kAD/PIwD/z2JAv8+hQD/PoEA/9C7pv/97uv////+/9Xw+v+w3ej/ls/e/+rz9///////+/z6/22mSf8qjQH/OJMA/zuQAP85iwL/PIgA/zyFAP+OSSL/nV44/7J+Vv/AkG7/7trP//7//f/9//7/6/Lr/2uoRv8tjQH/PJYA/zuTAP87kwD/PY8A/z2KAP89hAD/olkn/6RVHP+eSgj/mEgR//Ho3//+/v7/5Ozh/1GaJv8tlAD/OZcC/zuXAv84lAD/O5IC/z2PAf89iwL/OIkA/6hWFf+cTxD/pm9C/76ihP/8/v//+////8nav/8fdwL/NZsA/zeZAP83mgD/PJQB/zyUAf84jwD/PYsB/z6HAf+fXif/1r6s//79///58u//3r+g/+3i2v/+//3/mbiF/yyCAP87mgP/OpgD/zeWAP85lgD/OpEB/z+TAP9ChwH/7eHb/////v/28ej/tWwo/7tUAP+5XQ7/5M+5/////v+bsZn/IHAd/zeVAP89lgP/O5MA/zaJCf8tZTr/DyuK//3////9////0qmC/7lTAP/KZAT/vVgC/8iQWf/+//3///j//ygpx/8GGcL/ESax/xEgtv8FEMz/AALh/wAB1f///f7///z//758O//GXQL/yGYC/8RaAv/Ojlf/+/////////9QU93/BAD0/wAB//8DAP3/AAHz/wAA5f8DAtr///////v7+/+2bCT/yGMA/89mAP/BWQD/0q+D///+/////P7/Rkbg/wEA+f8AA/z/AQH5/wMA8P8AAev/AADf///7/P////7/uINQ/7lXAP/MYwL/vGIO//Lm3P/8/v//1dT2/woM5/8AAP3/AwH+/wAB/f8AAfb/BADs/wAC4P8AAAAA//z7/+LbzP+mXyD/oUwE/9Gshv/8//3/7/H5/zo/w/8AAdX/AgL6/wAA/f8CAP3/AAH2/wAA7v8AAAAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA=="
			//'http://www.google.com/favicon.ico'
		,bai : "data:image/x-icon;base64,AAABAAIAEBAAAAEACABoBQAAJgAAABAQAAABACAAaAQAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAAAAABAAAAAAAAAAAAAAABAAAAAQAAAAAAAL8UFQCYMwAAmjQAAJ06AAChPQAAuSQaANkOGQDBFBQAwBIeAMAfHwDaEBoA2hMdAMARIwDEHiwA2xYgANoYIgDbGiQA2x4nANwcJgDbHigAwyUlAMMsKwDcJSoA3SMtAN0kLQDeKzQA3i82AMUzMADBOTYAxDA8AN4wNwDfMDkA3zU9AKNBAAClQwAApkQAAKhHAACqSQAArU0AAK9QAACyVAAAtFcAALhaAAC5XgAAvWEAAL9lAADCaAAAxGsAAMZuAADIcgAAy3QAAM12AADPeQAA0HoAANJ+AADEOkMA4DpBAOE+RgDCRUYAzUpHAM1LSwDQQlEA0E9VAMJTUwDNU1IAx19aANFXVADQWFgA4UFHAOJESwDiRk0A4klQAOJNUgDjS1QA41FYAORTWQDkV10A5VpgAOVeZQDUbWsA2HJvAMx2dgDFf38A13F0ANR3fQDbfHoA5WBnAOZjaQDnZmwA52tvAOdscQDpcXYA6XR4ANOAAADVggAA336BAOp8ggDUgoAA3YaEAN2IhwDqgYYA7IeLAOuJjQDtj5MA7ZKWAOGWmADmo6AA56ilAOelqwDlqaoA6q6rAPCipgDwpaoA8amsAPGsrgDus64A6K2zAOe2tgDqubQA87K1APS9wADrxsQA7MvIAPbIygDxzs4A/8zMAPXRxAD11MkA+NbLAPfS0wDz1NAA+NHTAPjS1AD41NUA9NjWAPbf3AD42doA+dvdAPnd3gD+6dQA/u3bAPrg4QD75ucA/u/hAPvo6QD87+gA/O7vAP7y5gD68+wA/ff3AP748gD++vYA/vf4AP75+QD//v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////ACEhISEhISEhISEhISEhISEh//////////////////8hIf//jlk6SmhoORpXkf//ISH//2UHCwsHBwsLEXD//yEh//9hDw8RDxERDxh5//8hIf//hUYREQ8RDxlOi///ISH//5aLShERDxFLi3n//yEh//9yaYtGFBhNi0pKi/8hIf98IUp4i1lai2YaEXz/ISH/cREhhf+W//+LTU2O/yEh/45OWf9nhf9ycnyO//8hIf//k/9cIU58IUV8////ISH/////XBhOiyFHi////yEh/////4llgv+Li/////8hIf//////////////////ISEhISEhISEhISEhISEhISEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAABAAAAAgAAAAAQAgAAAAAABABAAAAAAAAAAAAAAAAAAAAAAAALhbAP+0VwD/slQA/69RAP+tTgD/q0oA/6hHAP+mRAD/o0IA/6I+AP+gPAD/njoA/5w4AP+bNgD/mjQA/5gzAP+6XgD////////////////+////zP///8b////G////xv///8b////G////xv///8z///////////////+aNQD/vWEA////////////+uDh/+dlbP/hPkb/40tU/+2Pk//tj5P/4DtD/94rNP/lYGf/++jp////////////mzYA/79lAP////////7+/+uBh/7aDxn+2hAa/9oQG/7ZDhn+2g8Z/9oTHv7aEx3+2xkj//Cipv7//////////504AP/CaAD////////+/v/qfIL+2xYg/tsXIf/bGCL/2xgi/9sYIv/bGCL/2xYg/t0jLf/0vcD+//////////+eOwD/xGsA////////////+NLU/+JES//cHCb/2xgi/9sYIv/bGCL/2xgi/90lL//lWmH/+dzd////////////oD0A/8dvAP////////////339//5293/4khQ/9seKP7bGCL/2xgi/9sYIv/jUFj++dvd//S+wf7//v///////6NAAP/JcwD////////8/P/xqaz+7ZKW/vnb3f/iR0/+2x4n/t0kLP/kV13++dvd/+JOU//iSlH++d7f/v////+lQwD/zHUA///////2yMr/3zQ8/+NMUv/zsrX/+dvd/+Zjaf/nbHH/+dvd/+yHi//eMDf/2xok//bIy/7/////qEcA/853AP//////8KWq/9oYIf7fNz7+//////nb3f/+9/j////////////5293/5FNZ/+NSWf775uf//////6pJAP/QegD///////rg4f/lXmT+52ds/vGsrv/mX2b/7ZKW///////tkpb/7ZKW//bIy//64eL///////////+tTQD/0n0A/////////////O7v///////pcXb/3zA5/+ZfZv/2yMv/3i82/+FBR//2yMv/////////////////r1AA/9N/AP/////////////////++fn/6XR4/9wlKv7lW2D++dvd/+A6QP7iRkz++dvd/////////////////7JUAP/VgQD///////////////////////jZ2v7qgYX+99LT/v/////42tv++dvd/v////////////////////+0VwD/1oMA////////////////////////////////////////////////////////////////////////////uFoA/9aDAP/WgwD/1YEA/9OAAP/TfgD/0HsA/895AP/NdgD/y3QA/8hxAP/GbQD/xGsA/8JoAP+/ZQD/vWEA/7leAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
			//'http://www.baidu.com/favicon.ico'
		,you : "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYh7O8mIez/JiHs/yYh7P8mIezPJiHsYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIez/JiHs/yYh7P8mIez/JiHs/yYh7P8mIezPJiHsEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsjyYh7EAmIexAJiHscCYh7N8mIez/JiHs/yYh7M8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIewQJiHs3yYh7P8mIez/JiHsYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIewHJiHsVSYh7P8mIez/JiHs/yYh7N8mIez/JiHs/yYh7M8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsMiYh7P8mIez/JiHs/yYh7P8mIez/JiHs/yYh7P8mIez/JiHsIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYh7EcmIez/JiHs/yYh7M8mIexAJiHsOSYh7HImIez/JiHs/yYh7FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIew5JiHs/yYh7P8mIexwAAAAAAAAAAAmIexVJiHs/yYh7P8mIeyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsMiYh7P8mIez/JiHsnwAAAAAAAAAAJiHsOSYh7P8mIez/JiHsvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYh7BwmIez/JiHs/yYh7N8AAAAAAAAAACYh7BwmIez/JiHs/yYh7N8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHs/yYh7P8mIez/JiHsIAAAAAAmIewQJiHs/yYh7P8mIez/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsYCYh7P8mIez/JiHs7yYh7CAAAAAAJiHsViYh7P8mIez/JiHs7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AADgfwAA4B8AAOAfAAD+DwAA4A8AAOAHAADgBwAA4YcAAOGHAADhhwAA8IcAAOCHAAD//wAA//8AAA=="
			//'http://shared.ydstatic.com/images/favicon.ico'	
		,bin : "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPLSsP/nrXD/35JA/9+SQP/fkkD/35JA/+etcP/vyaD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7L+Q/9d2EP/UbQD/1G0A/9RtAP/UbQD/1nYP/9RtAP/UbQD/1G0A/9d2EP/qtoD/AAAAAAAAAAAAAAAA5KRg/9RtAP/UbQD/2X8f/+7In//89e/////////////89e//7sif/9l/H//UbQD/1G0A/9+SQP8AAAAA6raA/9RtAP/UbQD/3Igv//z17///////xOj//4rS//+K0v//teP/////////////4ZpP/9RtAP/UbQD/561w/9l/IP/UbQD/1G0A//ns3///////itL//xWm//8Vpv//Fab//xWm//97zP////////z17//UbQD/1G0A/9RtAP/UbQD/1G0A/9RtAP///////////0+8//8Vpv//Fab//xWm//8Vpv//T7z/////////////3pE//9RtAP/UbQD/1G0A/9RtAP/UbQD/+ezf//////+n3f//Fab//xWm//8Vpv//Fab//5jY/////////PXv/9RtAP/UbQD/13YQ/9RtAP/UbQD/1G0A/9yIL//89e///////9Pu//+K0v//itL//9Pu/////////PXv/9yIL//UbQD/1G0A/+q2gP/UbQD/1G0A/9RtAP/UbQD/1nYP/+y/j//57N/////////////57N//7sif/9l/H//UbQD/1G0A/+SkYP8AAAAA1G0A/9RtAP/ZfyD/2X8g/9RtAP/UbQD/1G0A/9RtAP/UbQD/1G0A/9RtAP/UbQD/2X8g/+/JoP8AAAAAAAAAANRtAP/UbQD/35JA/wAAAAD35ND/6raA/+GbUP/fkkD/35JA/+GbUP/qtoD/9NvA/wAAAAAAAAAAAAAAAAAAAADUbQD/1G0A/9+SQP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1G0A/9RtAP/fkkD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANRtAP/UbQD/35JA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9TAPAPcwDAA2UAgAEuAAAAUAAAAC4AAABhAAAAZQAAAAAAAAEAAAADAAAQDwAAH/8AAB//AAAf/wAA//8AAA=="
			//'http://www.bing.com/favicon.ico'
		//,yah : "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbgJqAIoCdgCaAnoAnhKCAKYijgCuLpIAskKeALpSpgC+Yq4AzHy8ANqezgDmvt4A7tLqAPz5+wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKlRFIoABWAKERERE6ADcKMzzu2hOgAAhERK8REWCWBERE36ERMHMEREvo6iEgY6hEn6Pu0mAzqkz/xjMzoDNwpERERDoAMzAKlERIoAAzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AADAOQAAgBkAAAAPAAAACQAAAAkAAAAIAAAACAAAAAgAAIAYAADAOAAA//8AAP//AAD//wAA"
			//'http://www.yahoo.com/favicon.ico'
		,sos : "data:image/x-icon;base64,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"
			//'http://www.soso.com/favicon.ico'
		,sog : "data:image/x-icon;base64,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AEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAOgAAABLv7+9I6+vr7PHx8f/y8vL/8/Pz//T09P/19fX/9vb2//j4+P/5+fn/+vr6//r6+v/7+/v/9vb27ZqamnYAAAA57e3t5F6G6f8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/12H7v/09PTrAAAAQOvr6/8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/+vr6/wAAAEDq6ur/BEXm/wRF5v+dtvX/zdr6/83a+v/c5fv//////9zl+//N2vr/gqPz/yZf6v8EReb/BEXm//n5+f8AAABA6Ojo/wRF5v8EReb////////////////////////////////////////////2+P7/QXPs/wRF5v/4+Pj/AAAAQObm5v8EReb/BEXm/1B+7v8jXen/BEXm/wRF5v8VUuj/cJbx/////////////////6vB9/8EReb/9vb2/wAAAEDl5eX/BEXm/wRF5v8EReb/BEXm/wRF5v84bOv/eZzy/83a+v////////////////+Co/P/BEXm//T09P8AAABA5OTk/wRF5v8EReb/YYvv/7rN+P/2+P7///////////////////////b4/v+FpfP/Cknn/wRF5v/z8/P/AAAAQOPj4/8EReb/cJbx///////////////////////H1vn/haXz/0177f8TUOf/BEXm/wRF5v8EReb/8fHx/wAAAEDi4uL/BEXm/5229f////////////////9Hd+3/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/+/v7/8AAABA4eHh/wRF5v8pYer/5Ov8////////////2eP7/5q09f+atPX/oLj2/83a+v/N2vr/BEXm/wRF5v/t7e3/AAAAQOHh4f8EReb/BEXm/xtW6P+LqfT/zdr6//P2/v/////////////////n7v3/q8H3/wRF5v8EReb/7Ozs/wAAAEDh4eH/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/+rq6v8AAAA64eHh50Fx5f8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/wRF5v8EReb/BEXm/0Ny5v/j4+PsAAAAEOHh4T/h4eHJ4eHh/+Hh4f/h4eH/4eHh/+Hh4f/h4eH/4uLi/+Pj4//j4+P/5OTk/+Xl5f/m5ubJ5+fnPwAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA"
		    //'http://www.sogou.com/favicon.ico'
		,cfg : "data:image/png;base64,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 gwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURQAAAP///xcVFicmJz49PkA/QGdm Z1dWVwsLDCgoKTQ0NUdHSHZ2d3R0dXBwcWVlZlZWV/T09cnJyr6+vykqKw4PDxUWFhkaGiUmJiQl JTc4OGpra2ZnZ9PU1AoLCg8QDygpKC4vLnt8e3Z3dmxtbGlqaerr6p+gnxYWFSIiIUJCQfT087u7 uo6OjRYVFR8eHiQjIy4tLTg3N3Nycvz7+7a1taGgoJWUlPz8/Pv7+/n5+fj4+Pb29vX19fPz8/Hx 8fDw8O/v7+7u7u3t7ezs7Ovr6+rq6unp6ejo6Ofn5+bm5uXl5ePj4+Li4uDg4N7e3tjY2NfX19XV 1dTU1NLS0tDQ0M/Pz87Ozs3NzcnJycPDw8LCwsHBwb+/v76+vr29vbW1tbKysrGxsaurq6qqqqam pqOjo6KiopycnJqampiYmJeXl5WVlZOTk5KSkpCQkI+Pj46OjoyMjIqKioSEhIGBgYCAgHp6enh4 eHd3d3Z2dnBwcGpqamlpaWhoaGBgYF5eXl1dXVtbW1VVVVBQUE9PT01NTUxMTElJSUdHR0ZGRkVF RUREREJCQkFBQT8/Pzo6Ojk5OTU1NTMzMzIyMjExMS4uLioqKigoKCYmJiAgIB0dHRwcHBsbGxkZ GRgYGBcXFxUVFRERERAQEA4ODv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAMFx63QAAACmdFJOU/////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////////// /////////////////wBGa60oAAABlklEQVR42lTRX0hTcRTA8e9+btHcVYwwoilbCon2EIRIUr44 RciFgtqTQYUQCreIEBkICoFLwbC18h9lwW8UGLhc9dBeTEcQ9jATHZQpiGAPPWw+uCms68O9F+08 nfPhwDmHYwnxX4QyuyogmDmCb8JfS1SAHIdj8byp05fKTtQCIPJqKt8ZGokqT3VFXP7mPmP0Oke0 PD1tF4x9OvYRgLasENuvAeY8AumNuz4AvLf5Hu+tvYUvJRYBdCy4ZoGmzN/N4u7E1JOXfbkCoHPQ HQGCvUV3tHvereH66wIAuVT6Ga4VFtgDuUrX7x9Y9dE3wueii+pu9bJtxZrYf2QyzaS05GDwbgAu AMK8UC1d3QjSalRG9/Oz+fc7Q/uvqtZu61cC8KK59o9y5aJ7Yif27JAnPEP93XWcnLQny+vHTB71 OIdT0Ta0jqHj4lR8WueR9OmenzsqtGz/erCc9leMg8XCrRqfY10C4F9/mM1R5q8ikLGBm4bia7Jp /zQNBPQVb0pze+93xZ5oBKtsB3n4zQZJsgoOBgDd8328xNu6QQAAAABJRU5ErkJggg==" 

	};

	engArr = [
		 {on:1, name:'Google网页', icon:icons.goo, type:0, kwI:'q=', url1:'www.google.', url2:'', urlS:'http://www.google.com/search?q=--keywords--'}
		,{on:1, name:'Google图片', icon:icons.goo, type:1, kwI:'q=', url1:'www.google.', url2:'/images?', urlS:'http://www.google.com/images?q=--keywords--'}
		,{on:1, name:'Google视频', icon:icons.goo, type:2, kwI:'q=', url1:'www.google.', url2:'&tbs=vid:1', urlS:'http://www.google.com/search?q=--keywords--&tbs=vid:1'}
		,{on:1, name:'Google新闻', icon:icons.goo, type:3, kwI:'q=', url1:'www.google.', url2:'&tbs=nws:1', urlS:'http://www.google.com/search?q=--keywords--&tbs=nws:1'}
		,{on:1, name:'Google购物', icon:icons.goo, type:4, kwI:'q=', url1:'www.google.', url2:'/products?', urlS:'http://www.google.com/products?q=--keywords--'}
		,{on:1, name:'Google博客', icon:icons.goo, type:5, kwI:'q=', url1:'www.google.', url2:'&tbs=blg:1', urlS:'http://www.google.com/search?q=--keywords--&tbs=blg:1'}
		,{on:1, name:'Google地图', icon:icons.goo, type:6, kwI:'q=', url1:'maps.google.', url2:'', urlS:'http://maps.google.com/maps?q=--keywords--'}
		,{on:1, name:'百度网页', icon:icons.bai, type:0, kwI:'wd=', url1:'www.baidu.com', url2:'', urlS:'http://www.baidu.com/s?wd=--keywords--&ie=utf-8'}
		,{on:1, name:'百度图片', icon:icons.bai, type:1, kwI:'word=', url1:'image.baidu.com', url2:'', urlS:'http://image.baidu.com/i?tn=baiduimage&ct=201326592&cl=2&lm=-1&ie=utf-8&word=--keywords--'}
		,{on:1, name:'百度视频', icon:icons.bai, type:2, kwI:'word=', url1:'video.baidu.com', url2:'', urlS:'http://video.baidu.com/v?ie=utf-8&word=--keywords--'}
		,{on:1, name:'百度新闻', icon:icons.bai, type:3, kwI:'word=', url1:'news.baidu.com', url2:'', urlS:'http://news.baidu.com/ns?tn=news&from=news&cl=2&rn=20&ct=0&ie=utf-8&word=--keywords--'}
		,{on:1, name:'百度博客', icon:icons.bai, type:5, kwI:'wd=', url1:'map.baidu.', url2:'', urlS:'http://blogsearch.baidu.com/s?ie=utf-8&wd=--keywords--'}
		,{on:1, name:'百度地图', icon:icons.bai, type:6, kwI:'s=s%26wd%3D', url1:'map.baidu.', url2:'', urlS:'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D--keywords--'}
		,{on:1, name:'百度MP3', icon:icons.bai, type:7, kwI:'word=', url1:'mp3.baidu.com', url2:'', urlS:'http://mp3.baidu.com/m?tn=baidump3&ct=134217728&ie=utf-8&word=--keywords--'}
		,{on:1, name:'有道网页', icon:icons.you, type:0, kwI:'q=', url1:'www.youdao.com', url2:'', urlS:'http://www.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道图片', icon:icons.you, type:1, kwI:'q=', url1:'image.youdao.com', url2:'', urlS:'http://image.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道视频', icon:icons.you, type:2, kwI:'q=', url1:'video.youdao.com', url2:'', urlS:'http://video.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道热闻', icon:icons.you, type:3, kwI:'q=', url1:'news.youdao.com', url2:'', urlS:'http://news.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道购物', icon:icons.you, type:4, kwI:'q=', url1:'gouwu.youdao.com', url2:'', urlS:'http://gouwu.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道博客', icon:icons.you, type:5, kwI:'q=', url1:'blog.youdao.com', url2:'', urlS:'http://blog.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道地图', icon:icons.you, type:6, kwI:'q=', url1:'ditu.youdao.com', url2:'', urlS:'http://ditu.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道音乐', icon:icons.you, type:7, kwI:'q=', url1:'mp3.youdao.com', url2:'', urlS:'http://mp3.youdao.com/search?q=--keywords--'}
		,{on:1, name:'必应网页', icon:icons.bin, type:0, kwI:'q=', url1:'cn.bing.com', url2:'', urlS:'http://cn.bing.com/search?q=--keywords--'}
		,{on:1, name:'必应图片', icon:icons.bin, type:1, kwI:'q=', url1:'cn.bing.com', url2:'/images/', urlS:'http://cn.bing.com/images/search?q=--keywords--'}
		,{on:1, name:'必应视频', icon:icons.bin, type:2, kwI:'q=', url1:'cn.bing.com', url2:'/videos/', urlS:'http://cn.bing.com/videos/search?q=--keywords--'}
		,{on:1, name:'必应新闻', icon:icons.bin, type:3, kwI:'q=', url1:'cn.bing.com', url2:'/news/', urlS:'http://cn.bing.com/news/search?q=--keywords--'}
		,{on:1, name:'必应地图', icon:icons.bin, type:6, kwI:'q=', url1:'cn.bing.com', url2:'/ditu/', urlS:'http://cn.bing.com/ditu/?q=--keywords--'}
		,{on:1, name:'Soso网页', icon:icons.sos, type:0, kwI:'query=', url1:'www.soso.com', url2:'', urlS:'http://www.soso.com/q?utf-8=ie&pid=s.idx&cid=s.idx.se&unc=&query=--keywords--'}
		,{on:1, name:'Soso图片', icon:icons.sos, type:1, kwI:'w=', url1:'image.soso.com', url2:'', urlS:'http://image.soso.com/image.cgi?sc=img&pid=pcwy.tpjg.00002&ie=utf-8&w=--keywords--'}
		,{on:1, name:'Soso视频', icon:icons.sos, type:2, kwI:'query=', url1:'video.soso.com', url2:'', urlS:'http://video.soso.com/vc/v?query=--keywords--'}
		,{on:1, name:'Sogou新闻', icon:icons.sog, type:3, kwI:'query=', url1:'news.sogou.com', url2:'', urlS:'http://news.sogou.com/news?query=--keywords--'}
		,{on:1, name:'谷歌网页', icon:icons.goo, type:0, kwI:'q=', url1:'www.google.com.hk', url2:'', urlS:'http://www.google.com.hk/search?q=--keywords--&hl=zh-CN'}
		,{on:1, name:'谷歌图片', icon:icons.goo, type:1, kwI:'q=', url1:'www.google.com.hk', url2:'/images?', urlS:'http://www.google.com.hk/images?q=--keywords--&hl=zh-CN'}
		,{on:1, name:'谷歌视频', icon:icons.goo, type:2, kwI:'q=', url1:'www.google.com.hk', url2:'&tbs=vid:1', urlS:'http://www.google.com.hk/search?q=--keywords--&tbs=vid:1&hl=zh-CN'}
		,{on:1, name:'谷歌新闻', icon:icons.goo, type:3, kwI:'q=', url1:'www.google.com.hk', url2:'&tbs=nws:1', urlS:'http://www.google.com.hk/search?q=--keywords--&tbs=nws:1&hl=zh-CN'}
		,{on:1, name:'谷歌购物', icon:icons.goo, type:4, kwI:'q=', url1:'www.google.cn', url2:'/products?', urlS:'http://www.google.cn/products?q=--keywords--&hl=zh-CN'}
		,{on:1, name:'谷歌博客', icon:icons.goo, type:5, kwI:'q=', url1:'www.google.com.hk', url2:'&tbs=blg:1', urlS:'http://www.google.com.hk/search?q=--keywords--&tbs=blg:1&hl=zh-CN'}
		,{on:1, name:'谷歌地图', icon:icons.goo, type:6, kwI:'q=', url1:'ditu.google.', url2:'', urlS:'http://ditu.google.cn/maps?q=--keywords--&hl=zh-CN'}
		,{on:1, name:'谷歌音乐', icon:icons.goo, type:7, kwI:'q=', url1:'www.google.cn', url2:'/music/', urlS:'http://www.google.cn/music/search?q=--keywords--&hl=zh-CN'}
	];
	



//'贴 吧','http://tieba.baidu.com/f?ct=318767104&tn=baiduKeywordSearch&rn=50&pn=0&rs2=0&myselectvalue=1&submit=????&tb=on&ie=utf-8&word=--keywords--'
//'知 道','http://zhidao.baidu.com/q?word=--keywords--&ie=utf-8&ct=17&pn=0&pt=monline_ik&tn=ikaslist&rn=10'
//图书 http://book.baidu.com/s?tn=baidubook&ct=2097152&si=book.baidu.com&cl=3&ie=utf-8&wd=--keywords--
//books http://www.google.com/search?q=--keywords--&tbs=bks:1
//schol http://scholar.google.com/scholar?q=--keywords--
// 'Yahoo',  'p', 'yahoo.',      'http://search.yahoo.com/search/dir?p=--keywords--'
// 'Clusty', 'query', 'clusty.', 'http://clusty.com/search?query=--keywords--'
// 'Wolfram', 'i', 'wolframalpha.', 'http://www01.wolframalpha.com/input/?i=--keywords--'
	
// ## Customiztion ends | 自定义区结束 ##

//searchenginearray.sort();

//var r = escape(document.referrer);
//var u = escape(document.location.href);
var u = document.location.href;
var b = document.getElementById('sjaSideBar');
var d = document.location.host;
var q = document.location.search.slice(1);
var e = -1;

var keywords = '';

for (i = 0; i < engArr.length; i++) {
	if ((d.indexOf(engArr[i].url1) != -1) && ((!engArr[i].url2) || (!!engArr[i].url2 && u.indexOf(engArr[i].url2) != -1))) {
		e = i;
	}
}
//fix Google Image Search url (Google playing shitty cards?)
if ((d.indexOf('www.google.') != -1) && (u.indexOf('&tbm=isch') != -1)) {
	e = 1;
}

//l(e);
if ((q.length > 0) && (e != -1)) {
	// There's a querystring and it's a search referral
	if (engArr[e].name.indexOf('百度') == 0 && q.indexOf('ie=utf-8') == -1) {  // 如果是百度且非utf-8
		keywords = getBaiduWord();
	}
	else {
		var qspairs = q.split('&');
		for (k = 0; k < qspairs.length; k++) {
			if (qspairs[k].indexOf(engArr[e].kwI) == 0) {keywords = qspairs[k].substring(engArr[e].kwI.length); break;}
		}
	}
}
//l(keywords);
if (!keywords) return;

// Insert CSS
var headID = document.getElementsByTagName("head")[0];         
var cssNode = creaElemIn('style', headID);
cssNode.type = 'text/css';
cssNode.innerHTML = '#sjaSideBar {width:'+((lt)?'28px;left:-16px':'12px;right:0')+';padding:3px 0;overflow:hidden;z-index:10000;opacity:.6;border:1px solid #C5CCD9;border-'+((lt)?'left':'right')+':0;}\
		#sjaSideBar:hover {width:28px;opacity:1;'+((lt)?'left:0;':'')+'} \
		#sjaSideBar>a {text-align:left;white-space:nowrap;text-decoration:none;margin: 0 3px 3px 3px;padding: 3px 8px 3px 2px;display:block;color:#00c;font-size:14px;outline:none;} \
		#sjaSideBar>input {text-align:middle;margin:3px 3px;padding:1px 3px;color:black;font-size:14px;border:1px solid #1599BF;outline:none;} \
		#sjaSideBar>a>div {height:22px;width:22px;} \
		#sjaSideBar, #sjaTitleBox {position:fixed;background:#F0F7F9;} \
		#sjaSideBar:hover, #sjaTitleBox {border:2px solid #1599BF;border-'+((lt)?'left':'right')+':0;} \
		#sjaTitleBox {font-size:16px;text-align:'+((lt)?'left':'right')+';line-height:26px;padding-'+((!lt)?'left':'right')+':2px;height:26px;'+((lt)?'left':'right')+':28px;z-index:10000;display:none;} \
		#sjaSideBar:hover #sjaTitleBox {display:block;}';
	
if (!b) make_boxes();

function make_boxes() {
	b = creaElemIn("div", document.body);
	b.id = 'sjaSideBar';
	b.style.top = tp + 'px';
	
	var j=-1;

	for (i = 0; i < engArr.length; i++) {
		if (engArr[i].on != 1 || engArr[i].type != engArr[e].type || (engArr[i].on == 1 && engArr[i].type != engArr[e].type && engArr[i].type != -1)) continue;
		j++; //another index
	// links	
		lg[i] = creaElemIn("a", b);
		lg[i].href = engArr[i].urlS.replace('--keywords--', keywords);
		lg[i].target = (nw)?'nw':'_top';
		// lg[i].title = engArr[i].name;
		lg[i].id = i;
		lg[i].name = j;
	// show tooltip	
		lg[i].addEventListener("mouseover", function(e){
				// this_y = getY(this);
				this_y = b.offsetTop + 3 + 31*this.name;
				this_title = engArr[this.id].name;
				if (!titlebox) {
					titlebox = creaElemIn("div", b);
					titlebox.id = 'sjaTitleBox';
				}
				titlebox.innerHTML = this_title;
				titlebox.style.top = this_y +'px';
			}, false);
	// favicon	
		favImg[i] = creaElemIn("div", lg[i]);
		favImg[i].style.background = 'url("' + engArr[i].icon + '") 1px center no-repeat';
	}
	config_btn = creaElemIn("a", b);
	var config_btn_img = creaElemIn("div", config_btn);
	config_btn_img.style.background = 'url("' + icons.cfg + '") 1px center no-repeat';
	config_btn.title = 'Search Jump Around 设置';
	config_btn.addEventListener('click',config_box,false);
}

function config_box() {//l(nw,lt,tp);
	config_btn.disabled = true;
	var confBOXBack = creaElemIn('div', document.body);
		confBOXBack.id = 'sjaConfigBack';
		confBOXBack.setAttribute('style', 'background:rgba(255,255,255,.7);position:fixed;top:0;left:0;width:100%;height:100%;text-align:center;z-index:9999;');
	var confBOX = creaElemIn('div', confBOXBack);
		confBOX.setAttribute('style', 'width:300px;background:white;line-height:18px;border:2px solid #1599BF;margin:150px auto auto auto;padding:5px;');
	var confTitle = creaElemIn('h3', confBOX);
		confTitle.setAttribute('style', 'font-weight:800;border-bottom:1px solid #1599BF;margin:15px auto 10px auto;line-height:24px;');
		confTitle.innerHTML = 'Search Jump Around 设置';
	var confP = creaElemIn('p', confBOX);
		confP.setAttribute('style', 'text-align:left;');
	var conf = [], confR = [], confL = [], opt;
	var confT = ['跳转链接是否默认在新窗口打开？','跳转条显示在左边还是右边？','跳转条的顶部高度：'];
	var confRT = [['否','是'],['右','左']];
	for (n=0;n<2;n++) {
		conf[n] = document.createTextNode(confT[n]);
			confP.appendChild(conf[n]);
			creaElemIn('br', confP);
		confR[n] = [], confL[n] = [];
		opt = 2;
		for (r=0;r<opt;r++) {
			confR[n][r] = creaElemIn('input', confP);
				confR[n][r].type = 'radio';
				confR[n][r].name = 'sjaConfR' + n;
				confR[n][r].id = CO + n + '' + r;
				if (r == config[n]) confR[n][r].checked = true;
			confL[n][r] = creaElemIn('label', confP);
				confL[n][r].textContent = confRT[n][r];
				confL[n][r].htmlFor = confR[n][r].id;
			creaElemIn('br', confP);
		}
		creaElemIn('br', confP);
	}
	n = 2;
	var confIL = creaElemIn('label', confP);
		confIL.textContent = confT[n];
	var confI = creaElemIn('input', confP);
		confI.value = config[n];
		confI.addEventListener('input', function(){
			b.style.top = confI.value + 'px';
		},false);
		creaElemIn('br', confP);

	var cancconfig = function(){document.body.removeChild(confBOXBack); config_btn.disabled = false;};
	var saveconfig = function(){
		var tmp_config = config.join('|');
		for (n=0;n<2;n++) {
			opt = 2;
			for (r=0;r<opt;r++) {
				if (confR[n][r].checked == true) {
					config[n] = Number(r);
					break;
				}
			}
		}
		n = 2;
		config[n] = confI.value;
		if (tmp_config != config.join('|')) {
			set_config(CO, config.join('|'));	
			location.reload();
		}
		else cancconfig();
		};
	
	var confBa = creaElemIn('input', confBOX);
		confBa.type = 'button';
		confBa.value = '确定';
		confBa.addEventListener('click',saveconfig,false);
	var confBb = creaElemIn('input', confBOX);
		confBb.type = 'button';
		confBb.value = '取消';
		confBb.addEventListener('click',cancconfig,false);
}

function getY(oElement) {
	var iReturnValue = 0;
	while (oElement != null) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function getBaiduWord() {
	var key_tmp = document.getElementById("kw") || document.getElementById("ww") || document.getElementsByName("wd").item(0);
	var key_tmp2 = encodeURI(key_tmp.getAttribute("value"));
	return key_tmp2;
}

function creaElemIn(tagname, destin) {
	var theElem = destin.appendChild(document.createElement(tagname));
	return theElem;
}

function getRecoverableString(oVar,notFirst){
	var oType = typeof(oVar);
	if((oType == 'null' )|| (oType == 'object' && !oVar )){
		return 'null';
	}
	if(oType == 'undefined' ){ return 'window.uDfXZ0_d'; }
	if(oType == 'object' ){
		//Safari throws errors when comparing non-objects with window/document/etc
		if(oVar == window ){ return 'window'; }
		if(oVar == document ){ return 'document'; }
		if(oVar == document.body ){ return 'document.body'; }
		if(oVar == document.documentElement ){ return 'document.documentElement'; }
	}
	if(oVar.nodeType && (oVar.childNodes || oVar.ownerElement )){ return '{error:\'DOM node\'}'; }
	if(!notFirst ){
		Object.prototype.toRecoverableString = function (oBn){
			if(this.tempLockIgnoreMe ){ return '{\'LoopBack\'}'; }
			this.tempLockIgnoreMe = true;
			var retVal = '{', sepChar = '', j;
			for(var i in this ){
				if(i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ){ continue; }
				if(oBn && (i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' )){ continue; }
				j = this[i];
				if(!i.match(basicObPropNameValStr)){
					//for some reason, you cannot use unescape when defining peoperty names inline
					for(var x = 0; x < cleanStrFromAr.length; x++ ){
						i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
					}
					i = '\''+i+'\'';
				} else if(window.ActiveXObject && navigator.userAgent.indexOf('Mac')+ 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine()== 'JScript' && i.match(/^\d+$/)){
					//IE mac does not allow numerical property names to be used unless they are quoted
					i = '\''+i+'\'';
				}
				retVal += sepChar+i+':'+getRecoverableString(j,true);
				sepChar = ',';
			}
			retVal += '}';
			this.tempLockIgnoreMe = false;
			return retVal;
		};
		Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
		Array.prototype.toRecoverableString = function (){
			if(this.tempLock ){ return '[\'LoopBack\']'; }
			if(!this.length ){
				var oCountProp = 0;
				for(var i in this ){ if(i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ){ oCountProp++; } }
				if(oCountProp ){ return this.toRecoverableObString(true); }
			}
			this.tempLock = true;
			var retVal = '[';
			for(var i = 0; i < this.length; i++ ){
				retVal += (i?',':'')+getRecoverableString(this[i],true);
			}
			retVal += ']';
			delete this.tempLock;
			return retVal;
		};
		Boolean.prototype.toRecoverableString = function (){
			return ''+this+'';
		};
		Date.prototype.toRecoverableString = function (){
			return 'new Date('+this.getTime()+')';
		};
		Function.prototype.toRecoverableString = function (){
			return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function (){[\'native code\'];}');
		};
		Number.prototype.toRecoverableString = function (){
			if(isNaN(this)){ return 'Number.NaN'; }
			if(this == Number.POSITIVE_INFINITY ){ return 'Number.POSITIVE_INFINITY'; }
			if(this == Number.NEGATIVE_INFINITY ){ return 'Number.NEGATIVE_INFINITY'; }
			return ''+this+'';
		};
		RegExp.prototype.toRecoverableString = function (){
			return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
		};
		String.prototype.toRecoverableString = function (){
			var oTmp = escape(this);
			if(oTmp == this ){ return '\''+this+'\''; }
			return 'unescape(\''+oTmp+'\')';
		};
	}
	if(!oVar.toRecoverableString ){ return '{error:\'internal object\'}'; }
	var oTmp = oVar.toRecoverableString();
	if(!notFirst ){
		//prevent it from changing for...in loops that the page may be using
		delete Object.prototype.toRecoverableString;
		delete Array.prototype.toRecoverableObString;
		delete Array.prototype.toRecoverableString;
		delete Boolean.prototype.toRecoverableString;
		delete Date.prototype.toRecoverableString;
		delete Function.prototype.toRecoverableString;
		delete Number.prototype.toRecoverableString;
		delete RegExp.prototype.toRecoverableString;
		delete String.prototype.toRecoverableString;
	}
	return oTmp;
}

})();
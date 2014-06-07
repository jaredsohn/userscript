// ==UserScript==
// @name           Search Jump Around
// @homepage       http://userscripts.org/scripts/show/177282
// @namespace      http://userscripts.org/users/Ayu_Tsukimiya
// @description    搜索引擎之间跳转.
// @version        2.10e
// @include        http://*
// @include        https://www.google.*
// @include        https://duckduckgo.*
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
//			3 - 音乐类|Music
//			4 - 新闻类|News
//			5 - 问题类|Question
//			6 - 百科类|Encyclopedia
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
		 google : "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7PT7/3zF6/9Ptu//RbHx/0227/+Tzvb/9vv5/97h0f9JeBz/NHoA/z98Av9AfAD/PHsA/0F6AP8AAAAA/vz7/1+33/8Mp+z/FrHw/xWy8f8bs/T/Hqrx/3zE7v////7/t8qp/zF2A/87gwH/P4ID/z59AP8+egD/Q3kA/97s8v8botj/ELn3/wy58f8PtfL/D7Lw/xuz9P8vq+f/8/n///779v9KhR3/OYYA/0GFAv88hgD/QIAC/z17AP/0+/j/N6bM/wC07/8Cxf7/CsP7/wm+9v8Aqur/SrDb//7+/v///P7/VZEl/zSJAP87jQD/PYYA/0OBBf8+fQH///3//9Dp8/84sM7/CrDf/wC14/8CruL/KqnW/9ns8f/8/v//4OjX/z+GDf85kAD/PIwD/z2JAv8+hQD/PoEA/9C7pv/97uv////+/9Xw+v+w3ej/ls/e/+rz9///////+/z6/22mSf8qjQH/OJMA/zuQAP85iwL/PIgA/zyFAP+OSSL/nV44/7J+Vv/AkG7/7trP//7//f/9//7/6/Lr/2uoRv8tjQH/PJYA/zuTAP87kwD/PY8A/z2KAP89hAD/olkn/6RVHP+eSgj/mEgR//Ho3//+/v7/5Ozh/1GaJv8tlAD/OZcC/zuXAv84lAD/O5IC/z2PAf89iwL/OIkA/6hWFf+cTxD/pm9C/76ihP/8/v//+////8nav/8fdwL/NZsA/zeZAP83mgD/PJQB/zyUAf84jwD/PYsB/z6HAf+fXif/1r6s//79///58u//3r+g/+3i2v/+//3/mbiF/yyCAP87mgP/OpgD/zeWAP85lgD/OpEB/z+TAP9ChwH/7eHb/////v/28ej/tWwo/7tUAP+5XQ7/5M+5/////v+bsZn/IHAd/zeVAP89lgP/O5MA/zaJCf8tZTr/DyuK//3////9////0qmC/7lTAP/KZAT/vVgC/8iQWf/+//3///j//ygpx/8GGcL/ESax/xEgtv8FEMz/AALh/wAB1f///f7///z//758O//GXQL/yGYC/8RaAv/Ojlf/+/////////9QU93/BAD0/wAB//8DAP3/AAHz/wAA5f8DAtr///////v7+/+2bCT/yGMA/89mAP/BWQD/0q+D///+/////P7/Rkbg/wEA+f8AA/z/AQH5/wMA8P8AAev/AADf///7/P////7/uINQ/7lXAP/MYwL/vGIO//Lm3P/8/v//1dT2/woM5/8AAP3/AwH+/wAB/f8AAfb/BADs/wAC4P8AAAAA//z7/+LbzP+mXyD/oUwE/9Gshv/8//3/7/H5/zo/w/8AAdX/AgL6/wAA/f8CAP3/AAH2/wAA7v8AAAAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA=="
			//'http://www.google.com/favicon.ico'
		
		,baidu : "data:image/x-icon;base64,AAABAAIAEBAAAAEACABoBQAAJgAAABAQAAABACAAaAQAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAAAAABAAAAAAAAAAAAAAABAAAAAQAAAAAAAL8UFQCYMwAAmjQAAJ06AAChPQAAuSQaANkOGQDBFBQAwBIeAMAfHwDaEBoA2hMdAMARIwDEHiwA2xYgANoYIgDbGiQA2x4nANwcJgDbHigAwyUlAMMsKwDcJSoA3SMtAN0kLQDeKzQA3i82AMUzMADBOTYAxDA8AN4wNwDfMDkA3zU9AKNBAAClQwAApkQAAKhHAACqSQAArU0AAK9QAACyVAAAtFcAALhaAAC5XgAAvWEAAL9lAADCaAAAxGsAAMZuAADIcgAAy3QAAM12AADPeQAA0HoAANJ+AADEOkMA4DpBAOE+RgDCRUYAzUpHAM1LSwDQQlEA0E9VAMJTUwDNU1IAx19aANFXVADQWFgA4UFHAOJESwDiRk0A4klQAOJNUgDjS1QA41FYAORTWQDkV10A5VpgAOVeZQDUbWsA2HJvAMx2dgDFf38A13F0ANR3fQDbfHoA5WBnAOZjaQDnZmwA52tvAOdscQDpcXYA6XR4ANOAAADVggAA336BAOp8ggDUgoAA3YaEAN2IhwDqgYYA7IeLAOuJjQDtj5MA7ZKWAOGWmADmo6AA56ilAOelqwDlqaoA6q6rAPCipgDwpaoA8amsAPGsrgDus64A6K2zAOe2tgDqubQA87K1APS9wADrxsQA7MvIAPbIygDxzs4A/8zMAPXRxAD11MkA+NbLAPfS0wDz1NAA+NHTAPjS1AD41NUA9NjWAPbf3AD42doA+dvdAPnd3gD+6dQA/u3bAPrg4QD75ucA/u/hAPvo6QD87+gA/O7vAP7y5gD68+wA/ff3AP748gD++vYA/vf4AP75+QD//v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////ACEhISEhISEhISEhISEhISEh//////////////////8hIf//jlk6SmhoORpXkf//ISH//2UHCwsHBwsLEXD//yEh//9hDw8RDxERDxh5//8hIf//hUYREQ8RDxlOi///ISH//5aLShERDxFLi3n//yEh//9yaYtGFBhNi0pKi/8hIf98IUp4i1lai2YaEXz/ISH/cREhhf+W//+LTU2O/yEh/45OWf9nhf9ycnyO//8hIf//k/9cIU58IUV8////ISH/////XBhOiyFHi////yEh/////4llgv+Li/////8hIf//////////////////ISEhISEhISEhISEhISEhISEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAABAAAAAgAAAAAQAgAAAAAABABAAAAAAAAAAAAAAAAAAAAAAAALhbAP+0VwD/slQA/69RAP+tTgD/q0oA/6hHAP+mRAD/o0IA/6I+AP+gPAD/njoA/5w4AP+bNgD/mjQA/5gzAP+6XgD////////////////+////zP///8b////G////xv///8b////G////xv///8z///////////////+aNQD/vWEA////////////+uDh/+dlbP/hPkb/40tU/+2Pk//tj5P/4DtD/94rNP/lYGf/++jp////////////mzYA/79lAP////////7+/+uBh/7aDxn+2hAa/9oQG/7ZDhn+2g8Z/9oTHv7aEx3+2xkj//Cipv7//////////504AP/CaAD////////+/v/qfIL+2xYg/tsXIf/bGCL/2xgi/9sYIv/bGCL/2xYg/t0jLf/0vcD+//////////+eOwD/xGsA////////////+NLU/+JES//cHCb/2xgi/9sYIv/bGCL/2xgi/90lL//lWmH/+dzd////////////oD0A/8dvAP////////////339//5293/4khQ/9seKP7bGCL/2xgi/9sYIv/jUFj++dvd//S+wf7//v///////6NAAP/JcwD////////8/P/xqaz+7ZKW/vnb3f/iR0/+2x4n/t0kLP/kV13++dvd/+JOU//iSlH++d7f/v////+lQwD/zHUA///////2yMr/3zQ8/+NMUv/zsrX/+dvd/+Zjaf/nbHH/+dvd/+yHi//eMDf/2xok//bIy/7/////qEcA/853AP//////8KWq/9oYIf7fNz7+//////nb3f/+9/j////////////5293/5FNZ/+NSWf775uf//////6pJAP/QegD///////rg4f/lXmT+52ds/vGsrv/mX2b/7ZKW///////tkpb/7ZKW//bIy//64eL///////////+tTQD/0n0A/////////////O7v///////pcXb/3zA5/+ZfZv/2yMv/3i82/+FBR//2yMv/////////////////r1AA/9N/AP/////////////////++fn/6XR4/9wlKv7lW2D++dvd/+A6QP7iRkz++dvd/////////////////7JUAP/VgQD///////////////////////jZ2v7qgYX+99LT/v/////42tv++dvd/v////////////////////+0VwD/1oMA////////////////////////////////////////////////////////////////////////////uFoA/9aDAP/WgwD/1YEA/9OAAP/TfgD/0HsA/895AP/NdgD/y3QA/8hxAP/GbQD/xGsA/8JoAP+/ZQD/vWEA/7leAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
			//'http://www.baidu.com/favicon.ico'
		
		,youdao : "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYh7O8mIez/JiHs/yYh7P8mIezPJiHsYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIez/JiHs/yYh7P8mIez/JiHs/yYh7P8mIezPJiHsEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsjyYh7EAmIexAJiHscCYh7N8mIez/JiHs/yYh7M8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIewQJiHs3yYh7P8mIez/JiHsYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIewHJiHsVSYh7P8mIez/JiHs/yYh7N8mIez/JiHs/yYh7M8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsMiYh7P8mIez/JiHs/yYh7P8mIez/JiHs/yYh7P8mIez/JiHsIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYh7EcmIez/JiHs/yYh7M8mIexAJiHsOSYh7HImIez/JiHs/yYh7FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmIew5JiHs/yYh7P8mIexwAAAAAAAAAAAmIexVJiHs/yYh7P8mIeyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsMiYh7P8mIez/JiHsnwAAAAAAAAAAJiHsOSYh7P8mIez/JiHsvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYh7BwmIez/JiHs/yYh7N8AAAAAAAAAACYh7BwmIez/JiHs/yYh7N8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHs/yYh7P8mIez/JiHsIAAAAAAmIewQJiHs/yYh7P8mIez/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiHsYCYh7P8mIez/JiHs7yYh7CAAAAAAJiHsViYh7P8mIez/JiHs7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AADgfwAA4B8AAOAfAAD+DwAA4A8AAOAHAADgBwAA4YcAAOGHAADhhwAA8IcAAOCHAAD//wAA//8AAA=="
			//'http://shared.ydstatic.com/images/favicon.ico'	
		
		,bing : "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPLSsP/nrXD/35JA/9+SQP/fkkD/35JA/+etcP/vyaD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7L+Q/9d2EP/UbQD/1G0A/9RtAP/UbQD/1nYP/9RtAP/UbQD/1G0A/9d2EP/qtoD/AAAAAAAAAAAAAAAA5KRg/9RtAP/UbQD/2X8f/+7In//89e/////////////89e//7sif/9l/H//UbQD/1G0A/9+SQP8AAAAA6raA/9RtAP/UbQD/3Igv//z17///////xOj//4rS//+K0v//teP/////////////4ZpP/9RtAP/UbQD/561w/9l/IP/UbQD/1G0A//ns3///////itL//xWm//8Vpv//Fab//xWm//97zP////////z17//UbQD/1G0A/9RtAP/UbQD/1G0A/9RtAP///////////0+8//8Vpv//Fab//xWm//8Vpv//T7z/////////////3pE//9RtAP/UbQD/1G0A/9RtAP/UbQD/+ezf//////+n3f//Fab//xWm//8Vpv//Fab//5jY/////////PXv/9RtAP/UbQD/13YQ/9RtAP/UbQD/1G0A/9yIL//89e///////9Pu//+K0v//itL//9Pu/////////PXv/9yIL//UbQD/1G0A/+q2gP/UbQD/1G0A/9RtAP/UbQD/1nYP/+y/j//57N/////////////57N//7sif/9l/H//UbQD/1G0A/+SkYP8AAAAA1G0A/9RtAP/ZfyD/2X8g/9RtAP/UbQD/1G0A/9RtAP/UbQD/1G0A/9RtAP/UbQD/2X8g/+/JoP8AAAAAAAAAANRtAP/UbQD/35JA/wAAAAD35ND/6raA/+GbUP/fkkD/35JA/+GbUP/qtoD/9NvA/wAAAAAAAAAAAAAAAAAAAADUbQD/1G0A/9+SQP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1G0A/9RtAP/fkkD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANRtAP/UbQD/35JA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9TAPAPcwDAA2UAgAEuAAAAUAAAAC4AAABhAAAAZQAAAAAAAAEAAAADAAAQDwAAH/8AAB//AAAf/wAA//8AAA=="
			//'http://www.bing.com/favicon.ico'
		
		,duckduckgo : "data:png/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4UlEQVQ4jX2QvWuTURSHf/9AtmK1g1gVxUFFBBU/NnHqJHTMpoPiIFmUDkJxdxClU8HBLgqKgxRC1ZQOkVBDSNOmYtJamzQhpubzzZv3I3kcYovxvnjh4cDlnuee85Mk+fWf9Lod/j1+q87u49uULovyFRNJkrX4jq7jUWuaAst2WUgWyc0+Z/uiKFwyUaNls5AssrZRpdfvDwkaLZu1jSo7uU0qkQm2L8hA9abNbt0yft+fwvGwHI/mm1m+n5eBAOhDy/Zo2Z7RHIpEufUyTX17i/w5GQgGzXsPf7VdQxCKRLEcj29nZTAkCEWiQwKApu3StF0c1yN7SqyfEaU7wpoTndd7KxC8Qt+vgu+Cb+Gt3sWaE35CsCnICS8m5LebwenVX8BXwbog+6duDWrnrdicFCsnhNzKjtnceEV/RfQzovteOPPCXRC1p2L9qkgdE6njA9ROJ0xB5RFkhPNJJI/+H1Vmpk2Bk4f8YPT8pFg+8hfjovxA1J6JL+NChakwQTkUpsIU7wvng/Diwk+LXkaQF72UKE+JxGGhH/cmCMqhMjNNfEzEx8TySZELD1i9of37+JhQ9toBgnJopxN8Pn2IpVGxeFAsjQYjSSo9eWgI3MoOqZvXiY2IjyMiFoAk/QbkIfpi7R6kbgAAAABJRU5ErkJggg=="
			//'https://duckduckgo.com/favicon.ico'
		
		,soso : "data:image/x-icon;base64,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"
			//'http://www.soso.com/favicon.ico'
		
		,sanliuling : "data:image/pngdata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6klEQVQ4jaXOz2oTURQG8Ltv7vEZAl1Jsm3VZO7ccdqNlK4sBFd9k0IoCD5BaRYKVtRi5l8zmZTY0o5NoVuhI9KFRbGpLaSkDYEk1s/FnTGDC6l64bf5zncPhxlhRjdDOph5dwt/wwzpwAgzOjN3eXsmJPwLc5e3mblD+B/M3CaklVq3sfPNweWwg8thB60zH4/28/i9l2D3m4TEYmsKF4NzPP34GAvNHBaaOVQ+lHExOMdiawrpboIZmwRjkyAbhL1THyuHSyg6HJqnFB2O1aiMvVMfsqG6acxoEIwGQfcJ/VEP88Ek9BqHDAgyIOg1jrl6Fv1RD7qvumlM1gmyThAex9Wwi/lgEtJXmawTpE+YC7LoDjoQHh/nMSZ9VRIux/YXGyuHS5A1lUmfIGuE1aiMt5/fQLh8nMeYrKmScAkP6zmc9b+iEpVR2sqjtJVHJSpjeD1QFzgcST/B9A2CvkEQHqFocTxws/A/reGkd4yT3jGeRU+QvKthF8JT/QTTPUJCOIRilaOwznHvdewVx/Ra5teS/qgH4Y7/MN0lpAmHoFkErcpjhMI6x/TzDK5/fEfl/TI0a9xnwlGf/kSz1ZI7LzK4+5JDs8YzJhzevumSYlVdJ+wk521WsCZmhU1Hwo4HN3dUsCZmfwKCejnLHZeJTwAAAABJRU5ErkJggg=="
			//'http://www.so.com/favicon.ico'
		
		,sogou : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB0klEQVQ4jZ3Sv2sUQRQH8FdsZSURK0tB8D/Qa3Iii1oIwcIuSnoLf4AigkUgWqQXLhgQQgqxDUHsrCTFtoJL4G53dmcvs7t37M3uODur97WYuPFMUM8Hr5vvZ+bxhvr9/mIQBHtBEOCkDsMQjDEwxhBFEeI4Bud8L0mSRSIiGgwGSfzgCrjr/Hs/vArGWEZEpykIgvnChy2EABF1ZoDh7XMo367D+B6mSuLX+j5K8PXju/ZslmUgom4LiJWL+JZGbaBhX1DtbKDa2YB6/wbG92B8rwXyPLdAGIbgroNqd3PmxvzJtT+OMB6PLcAYA3cdFK/u4/eqP3+C3F5D/uwmkqUzM0BRFBaIouhIXV+B9j5gqtUxbKoV5PYakhunwF0HUkoLxHF84hPTe5cwef0UxvdmILm1Cu46KMvSApzzNjR6voSD5fNHW7l19thoPzehlLLAcDhsA3+rqVbIHtlPp7W2gBCiBardzXZdTbxv1xnvw/ge5NYqxN0L7dm6ri2Qpul//URjjAWyLIsOXtyZKzx6uQwpZUpEXcrz/LoQIiuKApPJBFJKlGWJqqqglILWGnVdwxgDYwyapkFVVXmv13tMRJfpsBaIqENE3Tm6Q0QLPwAGVa1p0zMtjwAAAABJRU5ErkJggg=="
			//'http://www.sogou.com/favicon.ico'
		
		,yahoo : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+ElEQVQ4jd1SIY7DMBC09gl9Qh/QR+QJeUJgQGBAZFQYUFAYYGhoEBhZfoF1oPBAYEBBeZRIU7Su7d49oF1pJFvyzM54V4jvKSs9TOVwPqgEupxgpUf8tqMBjEDOiTE6GhKRRIDJs1vANbsF15NB/DAW4bsqRghdTqGTqRwAwEqPjgZs645t3XG/PdBSj+vJJAJWeojc7o/6xbbu0OWEbd1hpUdLPWpq0FIPIYRgd38KnA8K99sjOKmpCeBPU8X4+sA4AsNKDwAJuaYmRDCVC2fBeRmzW5Ls7CKfxNsO5N1y6/kYVTHiTcRUDpejDsT/Fuly1K8In19PFuNJ1DwtkQEAAAAASUVORK5CYII="
			//'http://www.yahoo.com/favicon.ico'
		
		,xiami : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+0lEQVQ4jaXQPWsCQRDG8fEud+tX01YNpAiksEhhkcIiYCHKXT5TSJPGfIoEbMId95Jbq1hc8U81si4X8GXhxwwzz7Kw0qQysKlku5ce57CpZE0qA7GJZLukxyVsIpnYdcA1xC4DfAB2GbB/X9F13KzYRYAPOGlmFwHSPIeodrs5eqndbg47ADerpJmHKKCzar9/W+Hmm3mI/DzdoIDOqj3A7+sa947UswgFdNb/ZvUsQurHCNV+en/w9XHYAbhZJdU0xgecNKumMVI9xPiAo+r3LinvDarruDs3q6S8M1xDyonJylvDJYqJySUfmWEx7ufFuM+ZvvORGf4Bdjajn5E5dW4AAAAASUVORK5CYII="
			//'http://www.xiami.com/favicon.ico'
		
		,SongTaste : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABj0lEQVQ4jZ2SwUvTcRjGHxYoBGZhhedylCDe5h8QBHpoN1kdunj23Ah2CCUQQvkx9/0t09whF3rxoOlhyI6D+O1Q4UGYKEolykQnOqdbfTp8hVyYbL7wHL7v+7wP7/u8X7W1qbEwrA/EdEhMxZpgdJB/o1FJPuVe6TVGXAXeC/ULo02M4ONDWJ+H4104KcBOFsZvwO7yxfjUDa4+C6PfuD4orAHA9zTkpuFoCxJ3If/Noly09b0V+57vBqOfwggmW2yxUoLJO3bEd9fhbcPfkbezljN17/waZwKu7MhgV/AGYKK5eudLBYwg0Qq5GfhVtsT9VXh/q0aBuA/i12wy6bcmAaT7ahSYuAlbGVh6DotByH+15NTTmgROGW+CyilVsZmCscbLBWLaUHlUGXuJ2zD3GBaewHSHNfa8iUk/zHRWXaboaFZTferBVaXunxhTyQkpIEmKP9OjbFiOF1b0f/jyUlGMdoqOPC+skZFedanewOhHpEf3626UpN6AWjcGNXSlZkmKhNQefKCmf/N/APIZS36FpfdyAAAAAElFTkSuQmCC"
			//'http://www.songtaste.com/favicon.ico'
		
		,yiting : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdElEQVQ4jZ2RT0tCQRTF/Tit2gVRixIUgiLJZRmo6aptq6hNtH6fIAgkSKI/SKYWZhYpBfmyiGqRvtHQUlITHS3rvtPGJ1Y+US/MZpjzO+ee0WhURmAE2zX/dQRGUHvfEAmMYBU5TBEOrS+NYU8S/XtxLIh5zN99qEMERpiLVmEVOQyBFHSeOIb24zS5dY/V0wRpHbdYjGRhFitVVcCIW3oxBFKYOGTQHTAMuGJYCibgZUUIkVfovRL0/gzMEV5rCVl+/ORTRwno3BINumIY80jkZUVUvonSvAYAhPrMXOTT/xI4UjWcp0vYlYpwPhXwd25yVQiMMH35/ta69XAG68lyw0mWqe4okwxAKVm1A1s4A/vZMyokN1zDuS9c5WudfaECUBIojgIjrJXRGeA4VYIibitoBRAYYYcVewM0Q5oByt1KNLfZMcQi8sbuxlABfc4HX9dJLCLH+EkWo/4sZjeC9q7XUUDGUAG27ZCpJ4ACaVfoD5sLoLCFpyVTAAAAAElFTkSuQmCC"
			//'http://so.1ting.com/favicon.ico'
		
		,kuwo : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACvklEQVQ4jZWSaUjTcRzGfxJEL6Iso7TQqWFo07wgRxrGEI80041RHi8kkzwyJDIqC4dKWlYGmmBSmUc4rdTyyA6TPMp7Oi9SYZXKltt/3tvf//Z/eiVRM6sHvu+e58OXh4eQdWSbVbHVpW4mfD2PkUyjxKZ2j2VBNmXDHIeaSWp/zXTBfwHMs2sD9z3/KnGsmRZwyifyzR+NWP9TcE9CnllmrzLNRTJ2nRBiQgghXHHFRk7JyB3rKPGmvwI2Jxd7e5SPsE6lvfWEEFL98Lhl2ZA8V1AvN8RKiro1+XYdk7HkriyKHBERssEIMN4e7f+qOaVprCNWttItoujWYMTVtuFA6SAyCi5DlbETU/EEUwkmUKRZqjRlfnmrn5K5T/5H9f2BjF4WCkYaDl2TAIslrhi954E32XzM5btjvoSPxdcRYCZSwWpysDJxlZHHEiGZbvF11w8ELegHgvDzjkHXcgpLL6OhfR+D5boQ0H1nQXfFYfa2A+iueKwMB48+iyQWpLXYy4rpD6zUDwSyqwCmRwAq1RXad2ew3CjCbKYtFoq8QV3jQJVoBm3DXtAfrWS/dDDZyOfTnf56RhqC2XxPqM7bQNeeBO3bCKjOmWEmZguUYduweH83mB57rPTwZEZFqiU8haaYB/VNLlQpdqCll6D7cBpKoSkUARZQCjnQ1TtBP+gDZijUGKCp8uyjig9CnesMdbo96BYelit3QBHAgTLUGopgDpRCDpZKfGAYi1sDUO1VSVUeAlXoDvUtR9DNjtDVWuN7mBXmc1yhfeEP6oozlp+eBPtFPGAEqBBzt1NVno1UqQfUeS6gW73BdB4GlWIPXUMIWHky2G/pDCtPr1NLE33XXKRIRDaoJLwb1AM3lu4QwPA5EoaJBNYwfqFHN3oxqaYweNeawd81Veh2gm4TSWlpeFbnEz/un3w/ADbro1ggIOk8AAAAAElFTkSuQmCC"
			//'http://sou.kuwo.cn/favicon.ico'
		
		,kugou : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADSUlEQVQ4jWWTSWwbdRyF/1IkpJy4IBBgcUDiwKFIFhJgkNIDEbdySsSJCohULAE3OEBZe4lCY0jaqqauhUhLUVOlScEyjU0bxVkcOaWO4thJJl7G9czES8ZjZ8bLzHj+v8cFsaTf+b13eh9jRxj0+tzno7J/UegIW7JpbcmmtSB0hMmo7B/0+txH8//g8nj6z0WUQM1w+EGbY6vmIJQ28FtaR6raQ61NKB/2uC+iBFye4f6HyjP39VjLJrq928KHP+foo2kRn8xX6YPfa3jzSom8N0qYSx2SYRGureux/41MRKRAyyIEV+o4dSWL8xkLn6UceJMcwwmO1xcdPHG9jWOX9zERU6FbBF9ECTDGGBsYGXVLDYffzXbwdlCgqzkbkQrRVJFjKEF0Yo0wvm3R5xsdvHVHp6cvKJjeNEhq9Pig1+dm42HRr+gc3p+yOLvRwaxCAIB8o4c3Yj0s7JvQNA07pSqev66BTbXxWlBBpUWYiMp+Ft5uCTuqQ8OBPXy62aOrJQLnnHZUE78UTNJ1HYWySi/c1MDmOLEZjr5xhZaLJqLbHYGt5E1rtWjixI8ivBscF0UHpmnCaHdhGAbq9ToubR6ARR2wCMBCBHZBRXBdR6JoWmx+t2vFixa9fFHE0H1O3xZ60HWdms0mpJpG5UoVkizTS/E22BIR+4PAflDp8rqO5bxpsWtJQ/izzPHs2RyOr9n4ImdBVVWUKgd4dVXFJVFDoVDAbUFGX7wHtsjxZLCCO3kTc6mWwL6azfvjskPv3VDwyHSD3t/tQJIkimYVsF2LnivZELI5SqfTGEmq9MyqhaGZCu1pHGPhkp8NnDzjvrlj8Xuyjccni3hlqYnvUvv4eKsCpvTANMIpsY7RpIjJpAxvrI6ZTBvLRZsPjvx97dOzxUBCcTC/16bH/A/AFprERBusyYm1CX01h17MmTidPKTptIGlkkNf/yoF/r2yy9P//aIW2z7gyNRsvBOq4NGpEp6K1nD8noZ31+qYTDaxKplYkx2M3W3EXB7PER9cnv5vbhUDG/s2b3SJ6l2OZNmkhNKFYjhUbRNWHtj8y1tSwOU6Uv4vAyfPuMdCeX840xLiha4VL3StcKYljIVE/8DI6EM6/wXeIbURJwnbSAAAAABJRU5ErkJggg=="
			//'http://www.kugou.com/favicon.ico'
		
		,wiki : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII="
			//'http://en.wikipedia.org/favicon.ico'
		
		,moegirl : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/ElEQVQ4jY3SXWjNcRzH8deZcrHWonCDuOECKYSLSXm4Ii5EygUSiht3okhTu1DO2Rn7z8PmnDk7yzgOZh4uPGU1ebgQtshwZxfzsDyErPVzo3M2TvG5+36+3++7Pt++/KlelfqU/+VDUC6IlewVdFrkvCbBlBH+TTMc80NQ8fdSu5WO2+ehyBffBMEP/dKuS+l0VKc6r9Qa0uCJJq+dkS4Ccmqk3PDAXe8F/YLPhjzQKm6HyE4NPmmWk7NV0mp5VaUyzhbc0q5DsGuYH5PR55G1nhpbOntQJm+JtA3umAQuWiYl4ZR2dX6KC2oFGbf0qiwu3zfNCc/V+6LJI5Gvzluo1S5xg5q1uGypYJx75oi8k7KpCGix0Ql9eo0XxOQkHNcpa4sjPsjYLGONK+YJYlK61NleBGTsdVK3q6YLRuuwSNKAtDXqBI2eSHop8sKAqeo9lLWtCEiqVmvod75uneY67KMOqyR9F5SNuNcxb7VYXTQSqp12To8KA8a4YrkG/ZoskBBELmjQJq1en3GOGJQ3fzhxv1OuFeqsPU667bH54oKsai1qNDqgx0wJwTOTi4C7Fqs3qM0hGbtFPrlkvaxJDgu6zCrM5lU5alAwauQfnLVCo7xG1+VtFsQEE8UFrRYU5tqsE3lT+plKqdluXSYU6g5z5Rz8f8A/9AvMpMaqS8+RsAAAAABJRU5ErkJggg=="
			//'http://zh.moegirl.org/favicon.ico'
		
		,baike : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVUlEQVQ4jaWSwSvDYRjHn79AkmhFW1vT0Gb90k5ujv4BVwcn5Q+QRn5tbUVZP6GtlJbk4ECRi5tcXLg5yg5yQw7Y+Dg87+ttlGne+vQ+z/d9P8/h7RUAdjvaAxB2OvkPQrWLP1F/BoCPuu4mF7a7+ZWzGRUaLy6Dr1rY6kHp/cmFr5cvfJfZZTyhEoJKCMrf2BvTi/vj2h9POrlsnEoIYbMPNvtgo78ZgJtTVwOcTLtz4wlrYVgLQxBxvJuHCiJQO4ePd3i8hZcHuL/S3HhCKQqlKKzGlGBI5Q3PZZbHmp6txrCesBKHlTgsDyh22d7ydKf54az2xhOKCSgmoDCoAARjrr+/dkNtVhjEekJ+GPLDkEvCq/ksuaSjOgXrE81ZLon1BD8FfgqWRlS+PNC6FcYTFtOwmIajgg5Y8P6G8YSsB1kPGm86YH60NdkM1hMA5jLtAXwCyK3ufWEwzWsAAAAASUVORK5CYII="
			//'http://www.baike.com/favicon.ico'
		
		,xxx : ""
		
		,cfg : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQklEQVR42p2TQYrCQBBFvZHeIJ7GlWASRDEEIgkYcGGICFlkk00WWUTEi+hJnCPU+IruIQydQabh079//aquFJ3J5I+1WCzmYPKf9U6cbbdbAfBPk/b2xveelGUpAD7oaD+WnOR5LlEUkfCC3243BRyNmOGJq4C32+3kfr9L3/e6D2E1PHjHuvjquk6u16u2vl6vFXA0YnicA+Pb0jRV0+l0wvgwOnigEcNjZjX7aT0MQzkcDtI0jbRtK5yHk4ejEcOD13g8LRAEgWRZJnVdq4Hz7wJoxPDgNR7PGqZMNo5jNXDD+/wcfMITjRgevOQ4h3i5XKSqKr1ltVop4GjEnEO0j4S2zuezFEWh+xBWM63PnQ9ps9mI7/t6C/x4PCrgaMQMT0Zfox0MfPAv2KfsjSY7ik2Xy6UA58A+LOKNPluzvgEou1OcJxDKvgAAAABJRU5ErkJggg=="
		
	};

	engArr = [
		 {on:1, name:'谷歌网页', icon:icons.google, type:0, kwI:'q=', url1:'www.google.com.hk', url2:'', urlS:'http://www.google.com.hk/search?q=--keywords--'}
		,{on:1, name:'谷歌图片', icon:icons.google, type:1, kwI:'q=', url1:'www.google.com.hk', url2:'&tbm=isch', urlS:'http://www.google.com.hk/search?q=--keywords--&tbm=isch'}
		,{on:1, name:'谷歌视频', icon:icons.google, type:2, kwI:'q=', url1:'www.google.com.hk', url2:'&tbm=vid', urlS:'http://www.google.com.hk/search?q=--keywords--&tbm=vid'}
		,{on:1, name:'谷歌新闻', icon:icons.google, type:4, kwI:'q=', url1:'www.google.com.hk', url2:'&tbm=nws', urlS:'http://www.google.com.hk/search?q=--keywords--&tbm=nws'}
		,{on:1, name:'谷歌问答', icon:icons.google, type:5, kwI:'q=', url1:'www.google.com.hk', url2:'&tbm=klg', urlS:'http://www.google.com.hk/search?q=--keywords--&tbm=klg'}
		,{on:1, name:'谷歌学术', icon:icons.google, type:6, kwI:'q=', url1:'scholar.google.com.hk', url2:'', urlS:'http://scholar.google.com.hk/scholar?q=--keywords--'}
		
		,{on:1, name:'百度新闻', icon:icons.baidu, type:4, kwI:'word=', url1:'news.baidu.com', url2:'', urlS:'http://news.baidu.com/ns?word=--keywords--&ie=utf-8'}
		,{on:1, name:'百度网页', icon:icons.baidu, type:0, kwI:'wd=', url1:'www.baidu.com', url2:'', urlS:'http://www.baidu.com/s?ie=utf-8&wd=--keywords--'}
		,{on:1, name:'百度知道', icon:icons.baidu, type:5, kwI:'word=', url1:'zhidao.baidu.com', url2:'', urlS:'http://zhidao.baidu.com/search?word=--keywords--&ie=utf-8'}
		,{on:1, name:'百度音乐', icon:icons.baidu, type:3, kwI:'key=', url1:'music.baidu.com', url2:'', urlS:'http://music.baidu.com/search?key=--keywords--'}
		,{on:1, name:'百度图片', icon:icons.baidu, type:1, kwI:'word=', url1:'image.baidu.com', url2:'', urlS:'http://image.baidu.com/i?ie=utf-8&word=--keywords--'}
		,{on:1, name:'百度视频', icon:icons.baidu, type:2, kwI:'word=', url1:'v.baidu.com', url2:'', urlS:'http://v.baidu.com/v?ie=utf-8&word=--keywords--'}
		,{on:1, name:'百度百科', icon:icons.baidu, type:6, kwI:'word=', url1:'baike.baidu.com', url2:'', urlS:'http://baike.baidu.com/search?word=--keywords--&ie=utf-8'}
		,{on:1, name:'百度文库', icon:icons.baidu, type:6, kwI:'word=', url1:'wenku.baidu.com', url2:'', urlS:'http://wenku.baidu.com/search?word=--keywords--&ie=utf-8'}
		
		,{on:1, name:'必应网页', icon:icons.bing, type:0, kwI:'q=', url1:'cn.bing.com', url2:'', urlS:'http://cn.bing.com/search?q=--keywords--'}
		,{on:1, name:'必应图片', icon:icons.bing, type:1, kwI:'q=', url1:'cn.bing.com', url2:'/images/', urlS:'http://cn.bing.com/images/search?q=--keywords--'}
		,{on:1, name:'必应视频', icon:icons.bing, type:2, kwI:'q=', url1:'cn.bing.com', url2:'/videos/', urlS:'http://cn.bing.com/videos/search?q=--keywords--'}
		,{on:1, name:'必应资讯', icon:icons.bing, type:4, kwI:'q=', url1:'cn.bing.com', url2:'/news/', urlS:'http://cn.bing.com/news/search?q=--keywords--'}
		,{on:1, name:'必应词典', icon:icons.bing, type:8, kwI:'q=', url1:'cn.bing.com', url2:'/dict/', urlS:'http://cn.bing.com/dict/search?q=--keywords--'}
		
		,{on:1, name:'搜搜网页', icon:icons.soso, type:0, kwI:'w=', url1:'www.soso.com', url2:'', urlS:'http://www.soso.com/q?&w=--keywords--'}
		,{on:1, name:'搜搜图片', icon:icons.soso, type:1, kwI:'w=', url1:'image.soso.com', url2:'', urlS:'http://image.soso.com/image.cgi?ie=utf-8&w=--keywords--'}
		,{on:1, name:'搜搜视频', icon:icons.soso, type:2, kwI:'w=', url1:'video.soso.com', url2:'', urlS:'http://video.soso.com/search/?w=--keywords--'}
		,{on:1, name:'搜搜音乐', icon:icons.soso, type:3, kwI:'w=', url1:'cgi.music.soso.com', url2:'', urlS:'http://cgi.music.soso.com/fcgi-bin/m.q?ie=utf-8&w=--keywords--'}
		,{on:1, name:'搜搜问问', icon:icons.soso, type:5, kwI:'sp=', url1:'wenwen.soso.com', url2:'', urlS:'http://wenwen.soso.com/z/Search.e?sp=--keywords--'}
		,{on:1, name:'搜搜新闻', icon:icons.soso, type:4, kwI:'w=', url1:'news.soso.com', url2:'', urlS:'http://news.soso.com/n.q?ie=utf-8&w=--keywords--'}
		,{on:1, name:'搜搜百科', icon:icons.soso, type:6, kwI:'sp=S', url1:'baike.soso.com', url2:'&sp=F', urlS:'http://baike.soso.com/Search.e?&sp=S--keywords--&sp=F'}
		
		,{on:1, name:'360新闻', icon:icons.sanliuling, type:4, kwI:'q=', url1:'news.so.com', url2:'', urlS:'http://news.so.com/ns?ie=utf-8&q=--keywords--'}
		,{on:1, name:'360网页', icon:icons.sanliuling, type:0, kwI:'q=', url1:'www.so.com', url2:'', urlS:'http://www.so.com/s?ie=utf-8&q=--keywords--'}
		,{on:1, name:'360问答', icon:icons.sanliuling, type:5, kwI:'q=', url1:'wenda.so.com', url2:'', urlS:'http://wenda.so.com/search/?ie=utf-8&q=--keywords--'}
		,{on:1, name:'360视频', icon:icons.sanliuling, type:2, kwI:'q=', url1:'video.so.com', url2:'', urlS:'http://video.so.com/v?ie=utf-8&q=--keywords--'}		
		,{on:1, name:'360图片', icon:icons.sanliuling, type:1, kwI:'q=', url1:'image.so.com', url2:'', urlS:'http://image.so.com/i?ie=utf-8&q=--keywords--'}
		,{on:1, name:'360音乐', icon:icons.sanliuling, type:3, kwI:'q=', url1:'s.music.so.com', url2:'', urlS:'http://s.music.so.com/s?ie=utf-8&q=--keywords--'}
		,{on:1, name:'360百科', icon:icons.sanliuling, type:6, kwI:'q=', url1:'baike.so.com', url2:'', urlS:'http://baike.so.com/search/?ie=utf-8&q=--keywords--'}
		
		,{on:1, name:'搜狗新闻', icon:icons.sogou, type:4, kwI:'query=', url1:'news.sogou.com', url2:'', urlS:'http://news.sogou.com/news?ie=utf8&query=--keywords--'}
		,{on:1, name:'搜狗网页', icon:icons.sogou, type:0, kwI:'query=', url1:'www.sogou.com', url2:'', urlS:'http://www.sogou.com/web?ie=utf8&query=--keywords--'}
		,{on:1, name:'搜狗音乐', icon:icons.sogou, type:3, kwI:'query=', url1:'mp3.sogou.com', url2:'', urlS:'http://mp3.sogou.com/music.so?ie=utf8&query=--keywords--'}
		,{on:1, name:'搜狗图片', icon:icons.sogou, type:1, kwI:'query=', url1:'pic.sogou.com', url2:'', urlS:'http://pic.sogou.com/pics?ie=utf8&query=--keywords--'}
		,{on:1, name:'搜狗视频', icon:icons.sogou, type:2, kwI:'query=', url1:'v.sogou.com', url2:'', urlS:'http://v.sogou.com/v?ie=utf8&query=--keywords--'}
		,{on:1, name:'搜狗知识', icon:icons.sogou, type:5, kwI:'query=', url1:'zhishi.sogou.com', url2:'', urlS:'http://zhishi.sogou.com/zhishi?ie=utf8&query=--keywords--'}
		,{on:1, name:'搜狗百科', icon:icons.sogou, type:6, kwI:'query=', url1:'baike.sogou.com', url2:'', urlS:'http://baike.sogou.com/web?ie=utf8&query=--keywords--'}
		
		,{on:0, name:'有道网页', icon:icons.youdao, type:0, kwI:'q=', url1:'www.youdao.com', url2:'', urlS:'http://www.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道图片', icon:icons.youdao, type:1, kwI:'q=', url1:'image.youdao.com', url2:'', urlS:'http://image.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道视频', icon:icons.youdao, type:2, kwI:'q=', url1:'video.youdao.com', url2:'', urlS:'http://video.youdao.com/search?q=--keywords--'}
		,{on:1, name:'有道热闻', icon:icons.youdao, type:4, kwI:'q=', url1:'news.youdao.com', url2:'', urlS:'http://news.youdao.com/search?q=--keywords--'}
		
		,{on:1, name:'雅虎网页', icon:icons.yahoo, type:0, kwI:'p=', url1:'search.yahoo.com', url2:'', urlS:'http://search.yahoo.com/search?p=--keywords--'}
		,{on:1, name:'雅虎资讯', icon:icons.yahoo, type:4, kwI:'p=', url1:'news.search.yahoo.com', url2:'', urlS:'http://news.search.yahoo.com/search?p=--keywords--'}
		,{on:1, name:'雅虎图片', icon:icons.yahoo, type:1, kwI:'p=', url1:'images.search.yahoo.com', url2:'/search/', urlS:'http://images.search.yahoo.com/search/images?p=--keywords--'}
		
		,{on:1, name:'鸭鸭', icon:icons.duckduckgo, type:0, kwI:'q=', url1:'duckduckgo.com', url2:'', urlS:'https://duckduckgo.com/?q=--keywords--&kl=cn-zh'}
		
		,{on:1, name:'虾米音乐', icon:icons.xiami, type:3, kwI:'key=', url1:'www.xiami.com', url2:'', urlS:'http://www.xiami.com/search?key=--keywords--'}
		
		,{on:1, name:'一听音乐', icon:icons.yiting, type:3, kwI:'q=', url1:'so.1ting.com', url2:'', urlS:'http://so.1ting.com/song?q=--keywords--'}
		
		,{on:1, name:'酷我音乐', icon:icons.kuwo, type:3, kwI:'key=', url1:'sou.kuwo.cn', url2:'', urlS:'http://sou.kuwo.cn/ws/NSearch?key=--keywords--'}
		
		,{on:1, name:'酷狗音乐', icon:icons.kugou, type:3, kwI:'keyword=', url1:'www.kugou.com', url2:'', urlS:'http://www.kugou.com/common/search.php?keyword=--keywords--'}
		
		,{on:1, name:'SongTaste', icon:icons.SongTaste, type:3, kwI:'keyword=', url1:'www.songtaste.com', url2:'', urlS:'http://www.songtaste.com/search.php?keyword=--keywords--'}
		
		,{on:1, name:'维基百科[en]', icon:icons.wiki, type:6, kwI:'search=', url1:'en.wikipedia.org', url2:'', urlS:'http://en.wikipedia.org/w/?search=--keywords--&fulltext=Search'}
		,{on:1, name:'维基百科[zh]', icon:icons.wiki, type:6, kwI:'search=', url1:'zh.wikipedia.org', url2:'', urlS:'http://zh.wikipedia.org/w/?search=--keywords--&fulltext=Search'}
		
		,{on:1, name:'萌娘百科', icon:icons.moegirl, type:6, kwI:'search=', url1:'zh.moegirl.org', url2:'', urlS:'http://zh.moegirl.org/index.php?search=--keywords--&fulltext=Search'}
		
		,{on:1, name:'互动百科', icon:icons.baike, type:6, kwI:'', url1:'so.baike.com', url2:'/s/doc/', urlS:'http://so.baike.com/s/doc/--keywords--'}
		
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

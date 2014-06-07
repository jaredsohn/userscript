// ==UserScript==
// @name           Search Jump Around
// @namespace      http://userscripts.org/users/86496
// @description    Jump between web searches of Google, Baidu, Youdao, Bing and more.
// @version        2.10c
// @include        http://*
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

var config = get_config(CO, '0|0|180').split('|');
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
		,dou : "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAABMLAAATCwAAEAAAAAAAAAAAZgAAEXARACJ6IgAzhTMAUJZQAGajZgB3rXcAiLiIAJnCmQCqzKoAu9a7AMzgzADd690A7vXuAP///wAAAAAAXu7MuIhlUyAIzO7u7u7u6wACM2qWi8y2AI7aIDeEIQAAioigACntQAAAAVUwAH6gAABt7uynRCAAAK287u7lAAAJ6AAkjeYAAC7tuGQk3kAAC+7u7u3uoAACu2i87u0wABIIpCEiIQAAvreKy2EAAACc3u7u7clgAAAUaIiLymAAAL3IAAC9+AAAAB8AAAAKAAAAAQAAAAEAAL3gAAAAAAAAACcAAAABAAAACgAAAAEAAM8bAAAAAAAA+mAAAAAM"
	};

	engArr = [
		 {on:1, name:'Google', icon:icons.goo, type:0, kwI:'q=', url1:'www.google.', url2:'', urlS:'https://www.google.com./search?q=--keywords--'}
		,{on:1, name:'Google图片', icon:icons.goo, type:1, kwI:'q=', url1:'www.google.', url2:'/images?', urlS:'http://www.google.com/images?q=--keywords--'}
		,{on:1, name:'Google HK', icon:icons.goo, type:0, kwI:'q=', url1:'www.google.com.hk', url2:'', urlS:'http://www.google.com.hk/search?q=--keywords--&hl=zh-CN'}
		,{on:1, name:'百度', icon:icons.bai, type:0, kwI:'wd=', url1:'www.baidu.com', url2:'', urlS:'http://www.baidu.com/s?wd=--keywords--&ie=utf-8'}
		,{on:1, name:'百度图片', icon:icons.bai, type:1, kwI:'word=', url1:'image.baidu.com', url2:'', urlS:'http://image.baidu.com/i?tn=baiduimage&ct=201326592&cl=2&lm=-1&ie=utf-8&word=--keywords--'}
	    ,{on:1, name:'Douban', icon:icons.dou, type:0, kwI:'wd=', url1:'movie.douban.com', url2:'', urlS:'http://movie.douban.com/subject_search?cat=1002&search_text=--keywords--'}
	    ,{on:1, name:'百度图片', icon:icons.bai, type:1, kwI:'word=', url1:'image.baidu.com', url2:'', urlS:'http://image.baidu.com/i?tn=baiduimage&ct=201326592&cl=2&lm=-1&ie=utf-8&word=--keywords--'}
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
	/*
	config_btn = creaElemIn("input", b);
	config_btn.type = 'button';
	config_btn.value = 'O';
	config_btn.title = 'Search Jump Around 设置';
	config_btn.addEventListener('click',config_box,false);
	*/
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
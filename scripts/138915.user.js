// ==UserScript==
// @name           justcool s
// @namespace      http://ie.sogou.com/bbs/viewthread.php?tid=559378
// @description    
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
		google : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAWRJREFUOE+lkzlLA0EYhmd/hj8ni0S0UGwUaystAlaidTZqIWIIsRBPBI0WilHQeEEaBU+IFwhiNEehxmM3u5nszr7OBjSY2WKjAwNTfO/zvd8xkhzUmomEKUKkBlLXQZ5A6iayouZkRcPfrprjAFHcGNIQSVBEdygu0haYDawel9G/aAiJXAGxozImdmkl2IFdZRgOrk1Xl66AT92Gslb6EYzESyiZ8A54L9qIn1Uz9i0YeHhm3gHjWxSUZxxYMtA2WsT6qYneGd07wKm9Z1pHeJuC9+9XObVNd+3Bd5B/SMMH70fq0UL7WNG7g8GYgWU+iSifxGySoqDZeHpl6AiLEMHB5D7Fyb2FpuHqfnRyYfqFYeNcHKUAyBZYZYFqa3UWK5HyAEjempVsXZGqXT93c3hnITDvYRNb+dhWeP35Nxs3WYa9SxOb3HpgThQ7Lv/3mYJqnvhCWovMH/X+Rp+iZhztF08AvJDGVvb1AAAAAElFTkSuQmCC'
		,baidu : 'http://www.baidu.com/favicon.ico'
		,soso : 'http://soso.com/favicon.ico'	
		,sogou : 'http://mp3.sogou.com/favicon.ico'
		,taobao : 'http://www.taobao.com/favicon.ico'
		,buy : 'http://www.360buy.com/favicon.ico'
		,tudou: 'http://so.v.360.cn/favicon.ico'
		,youku : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAATJJREFUOE9jZMACHKq3/z/18jsDMzsrWPbvz98MZuKcDAdaPRmxqYeLGRRs/C/Vdvy/7rrH/413v0XBIDGQHEgNVkOEElf911x+H6zJfv+7/z03vsAVgtggMZAcSA1ILYohIFNhmuuvfMZuA1AHSA5mCIpLQE4DSeDTDLMRZghID1gMFGAg/4GcCFN0OCH2/73SrP+n0pOxugakFqQHpJeBK2Ud2HZkP5+KDf//vzIBjJ+GO/8H8ZH9DFIL0gPSy8CbvRnMQVZwKtj7/39/PRT81FL+/z4vN7g6kB6QXuwGeDr8/6/BgIKfyjH8v1hagGkAVi8gGQDSeD0zAbcXsAaiu8P/ezKYGmHeRAlEkCBF0QgygOKEBDKEoqQM8xtFmQk5HYACFhQ7oHgGYRAbnOqwAAAYRG9u2kXgMQAAAABJRU5ErkJggg=="
		,dict : 'http://www.youdao.com/favicon.ico'
		,down : 'http://kuai.xunlei.com/favicon.ico'
		,xxx : ""
	};
//优酷在线图标在线默认32*32，需转换16*16 base64
	engArr = [
		 {on:1, name:'百度', icon:icons.baidu, type:0, kwI:'wd=', url1:'www.baidu.', url2:'', urlS:'http://www.baidu.com/s?wd=--keywords--'}
		,{on:1, name:'搜狗', icon:icons.sogou, type:0, kwI:'query=', url1:'www.sogou.', url2:'', urlS:'http://www.sogou.com/sogou?query=--keywords--'}
		,{on:1, name:'搜搜', icon:icons.soso, type:0, kwI:'w=', url1:'www.soso.com', url2:'', urlS:'http://www.soso.com/q?&w=--keywords--'}
		,{on:1, name:'谷歌', icon:icons.google, type:0, kwI:'q=', url1:'www.google.', url2:'', urlS:'https://www.google.com.hk/search?q=--keywords--'}
		,{on:1, name:'淘宝', icon:icons.taobao, type:0, kwI:'q=', url1:'.360.cn', url2:'', urlS:'http://s8.taobao.com/search?q=--keywords--&pid=mm_32572643_3289852_10750709'}
		,{on:1, name:'京东', icon:icons.buy, type:0, kwI:'keyword=', url1:'.360buy.', url2:'', urlS:'http://search.360buy.com/Search?keyword=--keywords--&enc=utf-8'}
		,{on:1, name:'360视频', icon:icons.tudou, type:0, kwI:'kw', url1:'so.v.360.cn', url2:'', urlS:'http://so.v.360.cn/index.php?kw=--keywords--'}
		,{on:1, name:'优酷视频', icon:icons.youku, type:0, kwI:'q_', url1:'www.soku.com', url2:'', urlS:'http://www.soku.com/search_video/q_--keywords--'}
		,{on:1, name:'有道词典', icon:icons.dict, type:0, kwI:'q=', url1:'.youdao.', url2:'', urlS:'http://dict.youdao.com/search?q=--keywords--'}
		,{on:1, name:'网盘搜索', icon:icons.down, type:0, kwI:'q=', url1:'www.google.', url2:'', urlS:'http://kuai.xunlei.com/so/s.html?s=d_kuaichuan&w=--keywords--'}
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
cssNode.innerHTML = '#sjaSideBar {width:'+((lt)?'28px;left:-16px':'28px;right:0')+';padding:3px 0;overflow:hidden;z-index:10000;opacity:.6;border:2px solid #C5CCD9;border-'+((lt)?'left':'right')+':0;}\
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
	config_btn = creaElemIn("input", b);
	config_btn.type = 'button';
	config_btn.value = 'O';
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
	var confT = ['在新窗口打开跳转连接？ (提示：默认设置为否，用户也可拖拽图标在后台新窗口打开)','跳转条显示在左边还是右边？','跳转条的位置高度：(输入0以上的数字）'];
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
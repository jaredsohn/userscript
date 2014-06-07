// ==UserScript==
// @name downloadhelper
// @version 1.2.2.5
// @lastmod 2012.5.29
// @author bbs.operachina.com (小福.somh.fenghn888)(NLF苦力整合，atmouse2012.4.7修复,yucf1995 2012.4.12集成DBank直接下载)
// @description 让下载变的简单..(support opera 10.1+ chrome 5+ firefox 3.5+)
// @include http*
// ==/UserScript==

/*
***功能****
*狗狗直接下载(改版失效)
*纳米盘去除文件大小限制直接下载(作者:somh)(改版失效)
*rayfile自动进入下一页并去除文件大小限制
*songtaste 歌曲直接下载(作者:小福)
*115网盘繁忙时段也可以直接下载(作者:fenghn888)
*DBank不用登陆直接下载等(作者:tomchen1989)
*/

(function(){
	//封装 evaluate()方法
	function matchNodes(xpath,root){
		root=root || document;
		return document.evaluate(xpath, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};

	function matchSingleNode(xpath,root){
		root=root || document;
		return document.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	//写cookie函数
	function setCookie(c_name,c_value,keepday,c_path,c_domain,c_secure){
		var scookie=c_name+'='+encodeURIComponent(c_value);
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
		//alert(scookie)
		document.cookie=scookie;
	};

	//取cookie函数
	function getCookie(c_name){
		var sre="(?:;)?"+c_name+"=([^;]*);?"
		var ore=new RegExp(sre);
		if(ore.test(document.cookie)){
			return decodeURIComponent(RegExp['$1']);
		}else{
			return '';
		}
	};

	//挂载事件.
	function addevent(fn){
		if(window.opera){
			document.addEventListener('DOMContentLoaded',fn,false);
		}else{
			fn();
		};
	};

	//迅雷,快车,旋风.专用链.解码..
	function decoder(){
		
	};
	addevent(decoder);

	//迅雷狗狗,右键直接下载;
	function gougou(){
		//用地址栏执行.这样可以访问到全局变量.
		var tj_block2=document.getElementById('tj_block2');
		if(tj_block2){
			var a=document.createElement('a');
			a.id='zjxz';
			//a.href=g_downUrl;
			a.textContent="直接下载"
			a.style.cssText='\
				color:white;\
				display:inline-block;\
				text-shadow:1px 1px 2px black;\
				border:1px solid #3E86E0;\
				padding:5px 20px;\
				background-color:#7AB3FF;\
				border-radius:3px;\
				-moz-border-radius:3px;\
				box-shadow: inset 0 1px 3px #F5F5F5, inset 0 15px 3px rgba(255,255,255,0.2),1px 1px 5px #E8E8E8;\
				-moz-box-shadow: inset 0 1px 3px #F5F5F5, inset 0 15px 3px rgba(255,255,255,0.2),1px 1px 5px #E8E8E8;\
				-webkit-box-shadow: inset 0 1px 3px #F5F5F5, inset 0 15px 3px rgba(255,255,255,0.2),1px 1px 5px #E8E8E8;';
			tj_block2.appendChild(a);
			location.href="javascript:document.getElementById('zjxz').href=g_downUrl;void(0);"
		};
	};

	//纳米盘,显示直接下载
	function namipan(){
		//alert(location.href.replace(/\/d\//i,'/download/'))
		//location.href=location.href.replace(/\/d\//i,'/downfile/');
		var links=document.links;
		for (var i=0,ii=links.length;i<ii;i++){
			if(links[i].href.toLowerCase().indexOf("javascript:addlink(")==0){
				var ahref=links[i].href.replace(/^javascript:addLink\('(.*)'\);?/i,'$1');
				ahref=decodeURIComponent(ahref);
				var a=document.createElement("a");
				a.href=ahref;
				a.textContent='直接下载';
				a.style.cssText="\
					margin-right:30px;\
					color:red;\
				";
				links[i].parentNode.insertBefore(a,links[i]);
				break;
			};
			document.getElementById('other_os').style.display='block';
		};
	};

	function namipan2(){
		//document.getElementById('windows').style.display='none';
		document.getElementById('not_windows').style.display='block';
	};

	//rayfile直接下载.进入下一页
	function rayfile(){
		var test;
		var fi_div=document.createElement("div");
		(function(){
			var nxtLink =matchSingleNode("//a[contains(text(), '进入下载页')]");
			//alert(nxtLink);
			if(!nxtLink)return;
			test=true;
			var fileinfo = matchNodes("//div[@id='main1']/ul[1]/li[position()<=4]");
			//alert(fileinfo.snapshotLength);
			if(fileinfo.snapshotLength==0)return;
			for(var i=0,ii=fileinfo.snapshotLength;i<ii;i++){
				fi_div.appendChild(fileinfo.snapshotItem(i).cloneNode(true));
			};
			setCookie('fileinfo',fi_div.innerHTML,1,'/','www.rayfile.com');
			location.href = nxtLink.href;
		})();

		//读取 cookie 里的文件信息，添加到下载页面
		(function(){
			if(test)return;
			var fileinfo=getCookie('fileinfo');
			//alert(fileinfo);
			if(fileinfo){
				fi_div.innerHTML=fileinfo;
				var main1=document.getElementById("main1");
				if(main1){
					main1.insertBefore(fi_div,main1.firstChild);
				};
			};

			//直接下载:
			var d_link=document.createElement('a');
			d_link.id='N_download';
			d_link.style.cssText='\
				color:red;\
				display:block!important;\
				border:1px solid #CCD5EE;\
				background-color:#ECF0F9;\
				width:89px!important;\
				border-radius:3px;\
				-moz-border-radius:3px;\
				padding:0px 0;\
				text-align:center;\
				text-shadow:1px 1px 1px white;';
			d_link.textContent="直接下载";
			var o_d_link=document.getElementById('divdownnow');
			o_d_link.parentNode.replaceChild(d_link,o_d_link);
			location.href="javascript:document.getElementById('N_download').href=downloads_url[0];setKey();void(0);";
		})();
	};

	//songtaste直接下载
	function songtaste_down(){
		function makeURL(strURL){
            var a=document.createElement('a');
            a.href=strURL;
            a.style.cssText='\
                margin:10px auto 0;\
                color:#D01F3C;\
                display:block;\
                background-color:#F5F5F5;\
                border:1px solid white;\
                text-align:center;\
                padding:0;\
                font-size:13px;\
                border-radius:5px;\
                line-height:25px;\
                width:75px;\
                text-shadow:0px 1px white;\
                box-shadow:1px 1px 3px #ccc;\
                -webkit-box-shadow:1px 1px 3px #ccc;\
                -moz-box-shadow:1px 1px 3px #ccc;\
            ';
            a.innerHTML='下载歌曲';
            var insertP=document.getElementsByClassName('song_left')[0].getElementsByClassName('mid_tit')[0];
            insertP.appendChild(a);
        };
        function playmedia1_1(strURL,type,Head,st_songid) {
            strURL=strURL.replace(/'/g,"");
            type=type.replace(/'/g,"");
            Head=Head.replace(/'/g,"");
            st_songid=st_songid.replace(/'/g,"");
            if(strURL.indexOf('rayfile')>0) {
                var SongUrl = Head + strURL + GetSongType(type);
                makeURL(SongUrl);
            } else {
                $.ajax({
                    async:false,
                    type:'POST',
                    url:'/time.php',
                    cache:false,
                    data:'str='+strURL+'&sid='+st_songid,
                    dataType:'html',
                    success:function(data){
                        //alert(data);
                        makeURL(data);
                    },
                    error:function(data){
                        alert('error');
                    }
                });
            }
        };
		var div=document.getElementById("playicon");
		var str=div.getElementsByTagName("a")[0].href;
		var matchtxt = str.match(/\'[^,]+\'/g);
        playmedia1_1(matchtxt[2],matchtxt[5],matchtxt[6],matchtxt[7]);
	};

	//去除115网盘文件大小限制,作者:fenghn888
	function cL115(){
		var fns=function(){
			var busy_remain=document.getElementById('busy_remain');
			if(!busy_remain)return;
			var url="http://u.115.com/?ct=upload_api&ac=get_pick_code_info&pickcode=" + file_id + "&version=3";
			var xhr=new XMLHttpRequest();
			xhr.open('GET', url, false);
			/*xhr.overrideMimeType('text/html');*/
			/*xhr.setRequestHeader("UserAgent", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; en)");*/
			xhr.send(null);
			/*alert(xhr.responseText);*/
			var json=eval('('+xhr.responseText+')');
			/*alert(json.DownloadUrl.length);*/
			if(!json.State)return;
			var urltel = json.DownloadUrl[0].Url,
						urlcnc = json.DownloadUrl[1].Url,
						urlbak = json.DownloadUrl[2].Url;
			busy_remain.className = "clearfix";
			busy_remain.innerHTML = "<a class='normal-down' href='" + urltel + "'>电信1下载</a><a class='normal-down' href='" + urlcnc + "'>网通1下载</a><a class='normal-down' href='" + urlbak + "'>备份下载</a>";
		}.toString();
		//alert(fns);
		location.href='javascript:('+fns+')();void(0);'
	};

//集成DBank直接下载
	function dldbank(){
	//复制起始行
function $(id) {
	return document.getElementById(id);
}

function $t(tagName, parentEl) {
	parentEl = parentEl || document;
	return parentEl.getElementsByTagName(tagName);
}

function $n(name) {
	return document.getElementsByName(name);
}

function addStyleCompatible(css) {
	if (typeof(GM_addStyle) != "undefined") {//Greasemonkey, Google Chrome
		GM_addStyle(css);
	} else if (typeof(PRO_addStyle) != "undefined") {//IEPro
		PRO_addStyle(css);
	} else if (typeof(addStyle) != "undefined") {//some plugins
		addStyle(css);
	} else {//others
		var head, style;
		head = $t("head")[0];
		if (!head) {
			return;
		}
		style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		head.appendChild(style);
	}
}

function addEventCompatible(obj, evtType, fn) {
	if (obj.addEventListener) {//W3C
		obj.addEventListener(evtType, fn, false);
	} else if (obj.attachEvent) {//IE<9
		obj.attachEvent("on" + evtType, function (e) {
			fn.call(obj, e);//make "this" keyword refer to the obj
		});
	}
}

function onCondition(condition, todo, timeLimit, startOnWindowLoaded) {//check "condition" every 50 msc, do "todo" when "condition" exists or is true, pass the return value of the "condition" as the only argument to "todo"; the check starts when window loaded (if "startOnWindowLoaded" is presented) or the function excuted, and finishes after "timeLimit" (msc) (if "timeLimit" is presented) or window loaded
	timeLimit = timeLimit || false;
	startOnWindowLoaded = startOnWindowLoaded || false;
	var timer,
	windowLoaded = false;
	if (timeLimit) {
		var n = 0,
		limitTimes = timeLimit / 50;
	}
	function cycle() {
		var conditionReturn = condition();
		if (conditionReturn) {
			todo(conditionReturn);
		} else if (windowLoaded && !timeLimit || timeLimit && n > limitTimes) {
			return;
		} else {
			if (timeLimit) {
				n++;
			}
			timer = window.setTimeout(cycle, 50);
		}
	}
	if (startOnWindowLoaded) {
		addEventCompatible(window, "load", cycle);
	} else {
		cycle();
	}
	if (!timeLimit) {
		addEventCompatible(window, "load", function () {
			windowLoaded = true;
		});
	}
}

function $c(tagName, attributeListObj) {//create element
	var el;
	if (attributeListObj.hasOwnProperty("name")) {
		try {
			el = document.createElement("<" + tagName + " name='" + attributeListObj["name"] + "'></" + tagName + ">");
		} catch (e) {
			el = document.createElement(tagName);
			el.name = attributeListObj["name"];
		}
	} else {
		el = document.createElement(tagName);
	}
	for (var attrName in attributeListObj) {
		attrValue = attributeListObj[attrName];
		if (attrName == "name") {
		} else if (attrName == "class") {
			el.className = attrValue;
		} else if (attrName == "style") {
			el.style.cssText = attrValue;
		} else if (attrName == "innerHTML") {
			el.innerHTML = attrValue;
		} else {
			el.setAttribute(attrName, attrValue);
		}
	}
	return el;
}

function getUnsafeWindow() {
	if (typeof(this.unsafeWindow) != "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
		return this.unsafeWindow;
	} else if (typeof(unsafeWindow) != "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
		var node = document.createElement("div");
		node.setAttribute("onclick", "return window;");
		return node.onclick();
	} else {//Opera, IE7Pro, etc.
		return window;
	}
}

var myUnsafeWindow = getUnsafeWindow();

if (!$("dbanklinkerdownloadsel")) {//prevent from running twice

onCondition(function () {
	return ($t("head").length > 0);//add css to when <head> is found, the <style> may be inserted at the very beginning
}, function () {
addStyleCompatible("\
/* remove ads & cancel 资源加载中,请稍候 */\
#vip_ad_link, .left_adv, #google_ads_frame1, .adWrapper, .elink-t-banner, #ad_pop, #filelist_marker {\
	display: none!important;\
}\
/* #allSize is hidden while #filelist_marker is shown, make it show */\
#allSize {\
	display: inline!important;\
}");
});

onCondition(function () {
	return ($t("body").length > 0);//add css when <body> is found, <style> is inserted after other <style> and <link>
}, function () {
addStyleCompatible("\
/* hide 下载 button */\
.btn-xz {\
	display: none!important;\
}\
/* adjust download links table */\
#secureLink .item li span {\
	width: 12px;\
}\
#secureLink .item li strong {\
	width: 106px;\
	margin: 0;\
}\
#secureLink .item li div a {\
	display: inline!important;\
	word-wrap: break-word;/* multi-line file name */\
	word-break: break-all;\
	padding-top: 9px;\
	padding-bottom: 9px;\
	*padding-top: 0;\
	*padding-bottom: 0;\
}\
#secureLink .item li {\
	height: auto;\
}\
#secureLink .item li div {/* see main block for adjusted width */\
	white-space: normal;\
}\
#secureLink .item li div {\
	width: 494px;\
}\
#secureLink .item h1 a {\
	margin-left: 10px;\
	margin-right: 0!important;\
	float: right;\
	*float: none;/* IE7 */\
	position: static;\
	color: #06C;\
}\
.selectall #rsum, .selectall #selSize {\
	float: right;\
	*float: none;/* IE7 */\
}\
#secureLink .item li span.status {/* status column, likely '审核中' */\
	float: right;\
	width: auto;\
	max-width: 74px;\
	line-height: 28px;\
}\
#secureLink .item li:hover {/* li:hover bgcolor, translucent */\
	background-color: rgba(141, 199, 250, 0.2);/* non IE8- */\
}\
/* 迅雷下载 button background fix */\
#xunleidown {\
	background: url('http://st1.dbank.com/netdisk/download/images/btn_newlink.png') no-repeat scroll 0 0 transparent;\
	text-indent: -9999px;\
	width: 88px;\
	margin: 0;\
	height: 27px;\
	cursor: pointer;\
	position: relative;\
}\
/* .dbanklinkerbtn */\
.dbanklinkerbtn, .dbanklinkerbtninn1, .dbanklinkerbtninn2  {\
	background: url('http://st1.dbank.com/netdisk/download/images/btn.png') no-repeat scroll -71px -504px transparent;\
}\
.dbanklinkerbtn {\
	width: 85px;\
	margin: 0 7px 0 0;\
	padding-left: 30px;\
	line-height: 29px;\
	text-indent: 0;\
	color: #000;\
	position: relative;\
	display: inline-block;\
	height: 27px;\
	overflow: hidden;\
}\
.dbanklinkerbtninn1 {\
	height: 27px;\
	width: 59px;\
	float: left;\
}\
.dbanklinkerbtninn2 {\
	background-position: -108px -504px;\
	height: 27px;\
	width: 26px;\
	float: right;\
}\
.dbanklinkerbtn span, .dbanklinkerbtn:hover span {\
	left: 32px;\
	position: absolute;\
	color: #000;\
	text-decoration: none!important;\
}\
/* #dbanklinkershowbuttontitle uses .selectall's color, but reset something */\
#dbanklinkershowbuttontitle {\
	border: none;\
	height: auto;\
	line-height: 2em;\
	padding-top: 0.3em;\
}\
/* hotlinks 'more' button style */\
#dbanklinkerhotmore {\
	color: #06C!important;\
}\
#dbanklinkerhotmore:hover {\
	text-decoration: underline!important;\
}");
});

var browser;
var ua = navigator.userAgent;
if (/Firefox/g.test(ua)) {
	browser = "Firefox";
} else if (/Chrome/g.test(ua)) {
	browser = "Google Chrome";
} else if (/Safari/g.test(ua)) {
	browser = "Safari";
} else if (/Opera/g.test(ua)) {
	browser = "Opera";
} else if (/MSIE/g.test(ua)) {
	browser = "IE";
} else {
	browser = "other";
}

//make adsShow false
onCondition(function (){
	return (typeof(myUnsafeWindow.adsShow) != "undefined");
}, function (){
	myUnsafeWindow.adsShow = false;
});

//==main block $("xunleidown") starts==
onCondition(function () {
	return $("xunleidown");
}, function (xunleiDown) {

var lis = $t("li", $("down_filelist")),
firstLi = lis[0];
//adjust .filelist li div's width
if (window.getComputedStyle) {//non IE8-
	function adjustItemDivWidth(itemDivWidthNumOld) {
		var itemDivWidthNumNew = window.getComputedStyle(firstLi, null).getPropertyValue("width").replace(/px/, "") - 148;
		if (!itemDivWidthNumOld || itemDivWidthNumOld != itemDivWidthNumNew) {
			addStyleCompatible("#download .filelist li div,#secureLink .item li div{width: " + itemDivWidthNumNew + "px!important;}");
			return itemDivWidthNumNew;
		} else {
			return false;
		}
	}
	var itemDivWidthNum = adjustItemDivWidth();
	//detect again when window loaded to make sure
	addEventCompatible(window, "load", function () {
		adjustItemDivWidth(itemDivWidthNum);
	});
}

function createButton(text, bgPositionX, bgPositionY, id, title) {
	var button = $c("a", {
		"class": "gbtn btn-psaveas dbanklinkerbtn",
		"style": "background-position: " + bgPositionX + "px " + bgPositionY + "px;",
		"id": id,
		"title": title
	});
	var buttonInner1 = $c("div", {
		"class": "dbanklinkerbtninn1"
	});
	var buttonInner2 = $c("div", {
		"class": "dbanklinkerbtninn2"
	});
	var buttonInnerSpan = $c("span", {
		"class": "dbanklinkerbtnspan",
		"innerHTML": text
	});
	button.appendChild(buttonInner1);
	button.appendChild(buttonInner2);
	button.appendChild(buttonInnerSpan);
	return button;
}

function getChecked(type) {//get checked. type: 1=url list; 2=size sum; 3= xunleiurl list. works after getCheckedPre() returns true
	var urlList = [], sizeSum = 0, xlUrlList = [];
	for (var i = 0, l = lis.length, thisli, thisa, thisinput; i < l; i++) {
		thisli = lis[i];
		thisa = $t("a", thisli)[0];
		thisinput = $t("input", thisli)[0];
		if (thisinput.checked) {
			urlList.push(myUnsafeWindow.dbank.crt.decrypt(getFileInfoById(thisa.id).downloadurl, myUnsafeWindow.globallinkdata.data.encryKey, 128));
			sizeSum += getFileInfoById(thisa.id).size * 1;
			xlUrlList.push(myUnsafeWindow.dbank.crt.decrypt(getFileInfoById(thisa.id).xunleiurl, myUnsafeWindow.globallinkdata.data.encryKey, 128));
		}
	}
	switch (type) {
		case 1:
			return urlList;
		case 2:
			return sizeSum;
		case 3:
			return xlUrlList;
	}
}

function getCheckedPre() {
	return (typeof(myUnsafeWindow.dbank) != "undefined") &&
		(typeof(myUnsafeWindow.dbank.crt) != "undefined") &&
		(typeof(myUnsafeWindow.dbank.crt.decrypt) != "undefined");
}

function getFileInfoById(id) {
	if (typeof(myUnsafeWindow.globallinkdata) == "undefined") {
		return false;
	}
	for (var files = myUnsafeWindow.globallinkdata.data.resource.files, i = 0, l = files.length; i < l; i++) {
		if (files[i].id == id) {
			return files[i];
		}
	}
	return false;
}

function getFileInfoByFileName(fileName) {
	if (typeof(myUnsafeWindow.globallinkdata) == "undefined") {
		return false;
	}
	var matchName = escape(fileName).toLowerCase().replace(/\%/g, "\\");
	for (var files = myUnsafeWindow.globallinkdata.data.resource.files, i = 0, l = files.length; i < l; i++) {
		if (files[i].name == fileName) {
			return files[i];
		}
	}
	return false;
}

function myShowTips(text, type) {//type = "error" or "green"
	var pos = (typeof(myUnsafeWindow.jQuery) != "undefined") ? (myUnsafeWindow.jQuery(document).scrollTop() + 300) + "px" : "300px",
	optips = $("optips"),
	optipsSpan = $t("span", optips)[0];
	type = type || "green";
	optipsSpan.innerHTML = text;
	optipsSpan.className = type;
	optips.style.top = pos;
	optips.style.display = "block";
	var timer = myUnsafeWindow.setTimeout(function () {//window.setTimeout has some weird bug, so use myUnsafeWindow
		optips.style.display = "none";
		optipsSpan.className = "";
		optipsSpan.innerHTML = "";
	}, 3000);
}

function checkjQueryEventBinded(id, evtType, num) {
	if (browser == "Google Chrome") {
		document.body.appendChild($c("script", {
			"id": "dbanklinkertempscript" + num,
			"innerHTML": "window.dbanklinkertempeventdata" + num + " = (typeof(jQuery) != 'undefined') && (jQuery('#" + id + "').data('events')) && (jQuery('#" + id + "').data('events')." + evtType + ");"
		}));
		document.body.removeChild(document.getElementById("dbanklinkertempscript" + num));
		return myUnsafeWindow["dbanklinkertempeventdata" + num];
	}
	return (typeof(myUnsafeWindow.jQuery) != "undefined") &&
		(myUnsafeWindow.jQuery.data($(id), "events")) &&
		(myUnsafeWindow.jQuery.data($(id), "events")[evtType]);
}

//set ruleType to 3 to make sure the register interface cannot be shown
xunleiDown.setAttribute("ruleType", 3);
if (browser == "IE") {
	xunleiDown.title = "用迅雷批量下载所有勾选的文件";
} else {
	xunleiDown.title = "用迅雷下载所选文件（注：选中单个文件时，链接会输出给迅雷软件下载(此时浏览器需关联“thunder://”链接)；多个文件的话无法直接输给迅雷，而是会复制所有迅雷链接，请自行到迅雷中新建->右键->粘贴并立即下载，如果迅雷打开且监视了剪贴板的话会复制时也会立即弹出窗口）";
}
xunleiDown.removeAttribute("href");//don't scroll up

var tipReport = $("report"),
tipComplain = $("tip_complain"),
qqServiceLink = $("qqServiceLink"),
commonQA = $("commonqa"),
tableFooter = qqServiceLink.parentNode,
selSize = $c("span", {"id": "selSize"}),
allSize = $("rsum"),
tableHeader = allSize.parentNode;

qqServiceLink.innerHTML = "下载咨询";

tableHeader.appendChild(tipReport);
tableHeader.appendChild(tipComplain);
tableHeader.appendChild(commonQA);
tableHeader.appendChild(qqServiceLink);
tableFooter.appendChild(selSize);
tableFooter.appendChild(allSize);

if ($t("a", tableFooter).length > 0) {
	tableFooter.removeChild($t("a", tableFooter)[0]);
}

var copyTa = $c("textarea", {"id": "dbanklinkercopyta", "style": "display: none;"});
var copyTaXl = $c("textarea", {"id": "dbanklinkercopytaxl", "style": "display: none;"});
document.body.appendChild(copyTa);
document.body.appendChild(copyTaXl);

function renewSizeNCopy() {//renew selected size & copy textarea
	onCondition(getCheckedPre, function () {
		selSize.innerHTML = "(选中" + getChecked(1).length + "个资源," + myUnsafeWindow.getFileSize(getChecked(2)) + ")";
		copyTa.value = getChecked(1).join("\n");
		copyTaXl.value = getChecked(3).join("\n");
	}, 5000);
}

//handle file list
onCondition(function () {
	return $n("checkAll")[0] && getCheckedPre();
}, function () {
	for (var i = 0, l = lis.length, thisli, thisa, thisstrong, thischeckbox, thiscnt; i < l; i++) {
		thisli = lis[i];
		thisa = $t("a", thisli)[0];
		thisstrong = $t("strong", thisli)[0];
		thischeckbox = $t("input", thisli)[0];
		if (thisa.style.display == "none") {//likely being examined
			if (getFileInfoByFileName(thisa.title)) {
				thisa.id = getFileInfoByFileName(thisa.title).id;
				$t("del", thisli)[0].style.display = "none";
				$t("input", thisli)[0].removeAttribute("disabled");
				$t("input", thisli)[0].checked = true;
				$t("span", thisli)[0].style.textDecoration = "line-through";
			}
		}
		if (thisa.id && getFileInfoById(thisa.id)) {
			thisa.href = myUnsafeWindow.dbank.crt.decrypt(getFileInfoById(thisa.id).downloadurl, myUnsafeWindow.globallinkdata.data.encryKey, 128);
			thiscnt = getFileInfoById(thisa.id).cnt;
		}
		thisa.removeAttribute("onclick");
		if (typeof(thiscnt) != "undefined") {
			thisstrong.innerHTML += "(" + thiscnt + "次)";
		}
		addEventCompatible(thischeckbox, "click", renewSizeNCopy);
	}
	addEventCompatible($n("checkAll")[0], "click", function () {
		var timer = window.setTimeout(renewSizeNCopy, 50);
	});
}, 5000);

//init renewSizeNCopy
onCondition(function () {
	return (typeof(myUnsafeWindow.getFileSize) != "undefined") && $n("checkAll")[0];
}, function () {
	var checkAll = $n("checkAll")[0];
	checkAll.checked = true;
	for (var i = 0, l = lis.length, thisinput; i < l; i++) {
		thisinput = $t("input", lis[i])[0];
		if (thisinput.disabled) {
			thisinput.checked = false;
			checkAll.checked = false;
		} else {
			thisinput.checked = true;
		}
	}
	renewSizeNCopy();
});

var buttonContainer = xunleiDown.parentNode,
hsDownload = $("hsdownload"),
saveToMyNetDisk = $("savetomynetdisk"),
hsDownloadTip = $("hsdownloadtip");
if (saveToMyNetDisk) {
	saveToMyNetDisk.title= "转存所有勾选的文件到我的网盘";
}

//"高速下载" button
buttonContainer.insertBefore(xunleiDown, hsDownload);
buttonContainer.insertBefore(document.createElement("br"), hsDownload);

hsDownload.title = "使用华为网盘的下载软件批量下载所有勾选的文件";

//create "下载所选文件" button
var downloadSelTitle = "用浏览器（或浏览器默认下载工具）下载所有勾选的文件（注：";
if (browser == "Google Chrome") {
	downloadSelTitle += "如您设置了“下载前询问每个文件的保存位置”(默认未选)，将会为每个文件弹出一个窗口，此时如文件过多则不建议使用）";
} else {
	downloadSelTitle += "可能会为每个文件弹出一个确认窗口，文件过多时不建议使用";
	if (browser == "Opera" || browser == "IE") {
		downloadSelTitle += "；可能需要允许弹窗才能使用此功能下载多个文件）";
	} else {
		downloadSelTitle += "）";
	}
}
var downloadSel = createButton("下载所选文件", -137, -532, "dbanklinkerdownloadsel", downloadSelTitle);
buttonContainer.insertBefore(downloadSel, xunleiDown);
addEventCompatible(downloadSel, "click", function () {
	onCondition(getCheckedPre, function () {
		function download(url) {
			if (browser == "Firefox" || browser == "Safari") {
				var iframe = document.createElement("iframe");
				iframe.width = iframe.height = iframe.frameBorder = 0;
				iframe.scrolling = "no";
				iframe.src = url;
				document.body.appendChild(iframe);
			} else {
				window.open(url);
			}
		}
		var lists = getChecked(1),
		l = lists.length;
		if (l > 0) {
			for (var i = 0; i < l; i++) {
				download(lists[i]);
			}
		} else {
			myShowTips(tipsOnNonSel, "error");
		}
	}, 5000);
});

//create "复制所选链接" button
var copySelLinks = createButton("复制所选链接", -137, -504, "dbanklinkercopysellinks", "复制所有勾选文件的直接链接（一行一个）到剪贴板（注：DBank网盘文件的直接链接非永久有效，会不断改变，可能几十分钟后就失效，请立即下载、使用，勿作为永久链接张贴）");
buttonContainer.insertBefore(copySelLinks, downloadSel);
buttonContainer.insertBefore(downloadSel, copySelLinks);

//show button title when mouse on
var showButtonTitle = $c("div", {"id": "dbanklinkershowbuttontitle", "class": "selectall"});
buttonContainer.appendChild(showButtonTitle);

function showTitle() {
	if (!showButtonTitle.firstChild) {
		showButtonTitle.appendChild(document.createTextNode(this.title));
		this.title = "";
	} else if (showButtonTitle.firstChild.nodeValue === "") {
		showButtonTitle.firstChild.nodeValue = this.title;
		this.title = "";
	}
}

function hideTitle() {
	if (showButtonTitle.firstChild && showButtonTitle.firstChild.nodeValue !== "") {
		this.title = showButtonTitle.firstChild.nodeValue;
		showButtonTitle.firstChild.nodeValue = "";
	}
}

addEventCompatible(xunleiDown, "mouseover", showTitle);
addEventCompatible(xunleiDown, "mouseout", hideTitle);

addEventCompatible(downloadSel, "mouseover", showTitle);
addEventCompatible(downloadSel, "mouseout", hideTitle);

addEventCompatible(copySelLinks, "mouseover", showTitle);
addEventCompatible(copySelLinks, "mouseout", hideTitle);

if (saveToMyNetDisk) {
	addEventCompatible(saveToMyNetDisk, "mouseover", showTitle);
	addEventCompatible(saveToMyNetDisk, "mouseout", hideTitle);
}

addEventCompatible(hsDownload, "mouseover", showTitle);
addEventCompatible(hsDownload, "mouseout", hideTitle);

if (hsDownloadTip) {
	addEventCompatible(hsDownloadTip, "mouseover", showTitle);
	addEventCompatible(hsDownloadTip, "mouseout", hideTitle);
}

//bind event for "复制所选链接" and xunlei button
onCondition(function () {
	return (typeof(myUnsafeWindow.ZeroClipboard) != "undefined") &&
		(
			( typeof(myUnsafeWindow.globallinkdata.data.isOwner) != "undefined" && $("butsArea") ) ||
			( typeof(myUnsafeWindow.dbank) != "undefined" && !myUnsafeWindow.dbank.cookie("session") )//not logged-in
		);
}, function () {
	if (myUnsafeWindow.globallinkdata.data.isOwner) {
		$("butsArea").style.display = "block";
	}
	function doCopy(fromId, buttonId, tipsOnCopy, tipsOnCopyXl1line) {
		var tipsOnNonSel = "请至少选择一个文件",
		text2Copy,
		myBut = $(buttonId);
		if (typeof(GM_setClipboard) != "undefined") {
			addEventCompatible(myBut, "click", function () {
				text2Copy = $(fromId).value;
				if (text2Copy) {
					GM_setClipboard(text2Copy);
					myShowTips(tipsOnCopy);
				} else {
					myShowTips(tipsOnNonSel, "error");
				}
			});
		} else if (window.clipboardData) {
			addEventCompatible(myBut, "click", function () {
				text2Copy = $(fromId).value;
				if (text2Copy) {
					window.clipboardData.clearData();
					window.clipboardData.setData("Text", text2Copy);
					myShowTips(tipsOnCopy);
				} else {
					myShowTips(tipsOnNonSel, "error");
				}
			});
		} else {
			onCondition(function () {
				return ((myUnsafeWindow.ZeroClipboard.nextId > 1) || browser == "Opera" || browser == "Firefox" );//when the hsDownload things are done or when the hsDownload is removed
			}, function () {
				myUnsafeWindow.ZeroClipboard.setMoviePath("http://st3.dbank.com/js/swf/ZeroClipboard.swf");
				var clip = new myUnsafeWindow.ZeroClipboard.Client();
				clip.setHandCursor(true);
				clip.addEventListener("onMouseOver", function (client) {
					text2Copy = $(fromId).value;
					showTitle.call(myBut);
					if (!/^thunder:\/\//m.test(text2Copy) || /\n/.test(text2Copy)) {//if its not (one xunlei url)
						clip.setText(text2Copy);
					}
				});
				clip.addEventListener("onMouseUp", function (client) {
					if (/^thunder:\/\//m.test(text2Copy) && !/\n/.test(text2Copy)) {//one xunlei url
						window.location = text2Copy;
					}
				});
				clip.addEventListener("onComplete", function (client, text) {
					if (text2Copy) {
						if (!/^thunder:\/\//m.test(text2Copy) || /\n/.test(text2Copy)) {
							myShowTips(tipsOnCopy);
						} else {
							myShowTips(tipsOnCopyXl1line);
						}
					} else {
						myShowTips(tipsOnNonSel, "error");
					}
				});
				clip.addEventListener("onMouseOut", function () {
					hideTitle.call(myBut);
				});
				clip.glue(buttonId);
			});
		}
	}
	if (browser == "Opera") {//remove the buggy 高速下载 button in Opera, to prevent conflict with copy buttons
		buttonContainer.removeChild(hsDownload);
	}
	doCopy("dbanklinkercopyta", "dbanklinkercopysellinks", "已复制到剪贴板");
	if (browser != "IE") {
		onCondition(function () {
			return checkjQueryEventBinded("xunleidown", "click", "1");
		}, function () {
			function renewNode(oldEl) {//re-generate node to remove all binded event listeners
				var attributeListObj = {};
				for (var i = 0, l = oldEl.attributes.length, thisAttr; i < l; i++) {
					thisAttr = oldEl.attributes[i];
					//if (thisAttr.nodeValue) {//: exclude IE<=7's "", null
						attributeListObj[thisAttr.nodeName] = thisAttr.nodeValue;
					//}
				}
				/*if (!attributeListObj.hasOwnProperty("style") && oldEl.style.cssText) {//IE<=7
					attributeListObj["style"] = oldEl.style.cssText;
				}*/
				attributeListObj["innerHTML"] = oldEl.innerHTML;
				var newEl = $c(oldEl.tagName, attributeListObj);
				oldEl.parentNode.insertBefore(newEl, oldEl);
				oldEl.parentNode.removeChild(oldEl);
				return newEl;
			}
			xunleiDown = renewNode(xunleiDown);
			doCopy("dbanklinkercopytaxl", "xunleidown", "迅雷链接已复制到剪贴板", "正在下载迅雷链接");
		}, 5000);
	}
});

onCondition(function () {
	return (typeof(myUnsafeWindow.dbank) != "undefined");
}, function () {
	var getCookieFn = myUnsafeWindow.dbank.cookie;
//fix session cookie bug
	if (getCookieFn("SID") && getCookieFn("EID") && !getCookieFn("session")) {
		var iframe = document.createElement("iframe");
		iframe.width = iframe.height = iframe.frameBorder = 0;
		iframe.scrolling = "no";
		iframe.src = "http://login.dbank.com/login.php?appid=48049&ru=" + encodeURIComponent(window.location.href);//refresh cookies
		document.body.appendChild(iframe);
		onCondition(function () {
			return getCookieFn("session");
		}, function () {
			myUnsafeWindow.dbank.header.init();
			document.body.removeChild(iframe);
		}, 10000);
	}
});

//htmlCopy & bbsCopy don't scroll up
onCondition(function () {
	return $("shareTo");
}, function (shareTo) {
	addEventCompatible(shareTo, "click", function (e) {
		var target = e.target || e.srcElement;
		if (target.tagName == "EMBED" || target.tagName == "A") {
			if (e.preventDefault) {
				e.preventDefault();
			} else if (e.returnValue) {
				e.returnValue = false;
			}
		}
	});
});

//auto present sign
onCondition(function (){
	return (typeof(myUnsafeWindow.dbank) != "undefined") && (typeof(myUnsafeWindow.nsp) != "undefined");
}, function (){
	var getCookieFn = myUnsafeWindow.dbank.cookie;
	if (getCookieFn("session")) {//logged in with normal session cookie
		function autoPresentSign() {
			var signIn = $("signIn");
			if (signIn.title != "您已签到，欢迎明天再来") {//if not yet present signed, run code below
				var invokeFunction = myUnsafeWindow.nsp.netdisk.nsp_invoke;
				invokeFunction(
					{
						nsp_svc: "com.dbank.signin.signin",
						anticache: Math.floor(Math.random() * 1000)
					},
					function (respond) {//success
						if (respond.retcode == "0000") {//retcode "0000" when just present signed; "0001" when already signed
							signIn.title = "DBank Linker成功地帮您自动签了到";
							if (signIn.tagName == "A") {
								signIn.innerHTML = "自动签到成功";
								signIn.className = "";
							} else {
								signIn.innerHTML = "自动签到成功 |";
							}
						}
					},
					function (respond) {//error
					}
				);
			}
		}
		onCondition(function (){
			return ($("signIn").title == "您已签到，欢迎明天再来") || checkjQueryEventBinded("signIn", "mouseenter", "2");//detect if ajax is done: already present signed text is added, or jQuery's hover is binded
		}, function (){
			autoPresentSign();
		}, 5000);
	}
});

});

//==main block $("xunleidown") ends==

//prevent document.onclick pop-up ad
onCondition(function () {
	return (typeof(myUnsafeWindow.oP) != "undefined");
}, function () {
	document.onclick = null;
	window.clearInterval(myUnsafeWindow.oP.ab);
});

}
	//复制结束行
};
//DBank Link结束

//////////////////////////////////////////////////////////////
	var url=location.href;

	if(/down\.gougou\.com\/down/i.test(url)){
		addevent(gougou);
	}else if(/songtaste\.com\/song/i.test(url)){
		addevent(songtaste_down);
	}else if(/www\.rayfile\.com\/.*\/files\//i.test(url)){
		addevent(rayfile);
	}else if(/d\.namipan\.com\/d\//i.test(url)){
		addevent(namipan);
	}else if(/d\.namipan\.com\/downfile\//i.test(url)){
		addevent(namipan2);
	}else if(/u\.115\.com\/file\/\w+/i.test(url)){
		addevent(cL115);
	}else if(/dl\.dbank\.com/i.test(url)){
		addevent(dldbank);
	};

})();

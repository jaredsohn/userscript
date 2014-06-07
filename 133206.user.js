// ==UserScript==
// @name downloadhelper
// @version 1.2.2.3
// @lastmod 2012.4.30
// @author bbs.operachina.com (小福.somh.fenghn888)(NLF苦力整合，atmouse2012.4.7修复,yucf1995 2012.4.12集成DBank直接下载)
// @description 让下载变的简单..(support opera 10.1+ chrome 5+ firefox 3.5+)
// @include http*
// ==/UserScript==

/*
***功能****
*狗狗直接下载（改版失效）
*纳米盘去除文件大小限制直接下载(作者:somh)（改版失效）
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
//DBank Link....
function addStyleCompatible(css) {
	if (typeof(GM_addStyle) !== "undefined") {//Greasemonkey, Google Chrome
		GM_addStyle(css);
	} else if (typeof(PRO_addStyle) !== "undefined") {//IEPro
		PRO_addStyle(css);
	} else if (typeof(addStyle) !== "undefined") {//some plugins
		addStyle(css);
	} else {//others
		var head, style;
		head = document.getElementsByTagName("head")[0];
		if (!head) {
			return;
		}
		style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		head.appendChild(style);
	}
}

function $(id) {
	return document.getElementById(id);
}

function addEventCompatible(obj, evtType, fn) {
	if (obj.addEventListener) {//W3C
		obj.addEventListener(evtType, fn, false);
	} else if (obj.attachEvent) {//IE<9
		obj.attachEvent("on" + evtType, function (e) {
			fn.call(obj, e);
		});
	}
}

function onCondition(condition, todo, timeLimit, startOnWindowLoaded) {//check "condition" every 50 msc, do "todo" when "condition" exists or is true, pass the return value of the "condition" as the only argument to "todo"; the check starts when window loaded (if "startOnWindowLoaded" is presented) or the function excuting, and finishes after "timeLimit" (msc) (if "timeLimit" is presented) or window loaded
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

function getWindow(windowObjName) {//works after window[windowObjName] loaded
	if (typeof(unsafeWindow) !== "undefined" && typeof(unsafeWindow[windowObjName]) !== "undefined") {//Greasemonkey
		return unsafeWindow;
	} else if (typeof(window[windowObjName]) !== "undefined") {//Opera, etc.
		return window;
	} else {
		try {//Google Chrome
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			var windowCompatible = div.onclick();
			if (typeof(windowCompatible[windowObjName]) === "undefined") {
				return false;
			} else {
				return windowCompatible;
			}
		} catch (e) {
			return false;
		}
	}
}

if (!$("dbanklinkerdownloadsel")) {//prevent from running twice

onCondition(function () {
	return (document.getElementsByTagName("head").length > 0);//add css to when <head> is found, the <style> may be inserted at the very beginning
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
	return (document.getElementsByTagName("body").length > 0);//add css when <body> is found, <style> is inserted after other <style> and <link>
}, function () {
addStyleCompatible("\
/* hide 下载 button */\
.btn-xz {\
	display: none!important;\
}\
/* adjust download links table */\
#download .filelist li span, #secureLink .item li span {/* #download .filelist is for old ver pages, #secureLink .item is for new ver pages */\
	width: 12px;\
}\
#download .filelist li strong, #secureLink .item li strong {\
	width: 106px;\
	margin: 0;\
}\
#download .filelist li div a, #secureLink .item li div a {\
	display: inline!important;\
	word-wrap: break-word;/* multi-line file name */\
	word-break: break-all;\
	padding-top: 9px;\
	padding-bottom: 9px;\
	*padding-top: 0;\
	*padding-bottom: 0;\
}\
#download .filelist li, #secureLink .item li {\
	height: auto;\
}\
#download .filelist li div, #secureLink .item li div {/* see main block for adjusted width */\
	white-space: normal;\
}\
#secureLink .item li div {\
	width: 494px;\
}\
#download .filelist li div {\
	width: 434px;\
}\
#download .filelist .tips h3 a, #secureLink .item h1 a {\
	margin-left: 10px;\
	margin-right: 0!important;\
	float: right;\
	*float: none;/* IE7 */\
	position: static;\
	color: #06C;\
}\
#download .filelist .tips h3 {\
	float: none;\
}\
.selectall #rsum, .selectall #selSize {/* new ver */\
	float: right;\
	*float: none;/* IE7 */\
}\
#download .filelist .tips h3 a {\
	font-weight: normal;\
}\
#download .filelist li span.status, #secureLink .item li span.status {/* status column, likely '审核中' */\
	float: right;\
	width: auto;\
	max-width: 74px;\
	line-height: 28px;\
}\
#secureLink .item li:hover {/* new ver li:hover bgcolor, translucent */\
	background-color: rgba(141, 199, 250, 0.2);/* non IE8- */\
}\
/* 迅雷下载 button background fix */\
.btn-xlsaveas {\
	background: url('http://st1.dbank.com/netdisk/download/images/btn_newlink.png') no-repeat scroll 0 0 transparent;\
	text-indent: -9999px;\
	width: 88px;\
	margin: 0;\
	height: 27px;\
	cursor: pointer;\
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

//==main block $("xunleidown") starts==
onCondition(function () {
	return $("xunleidown");
}, function (xunleiDown) {

var lis = $("down_filelist").getElementsByTagName("li"),
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

function renewNode(oldEl) {//re-generate node to remove all binded event listeners
	var attributeListObj = {};
	for (var i = 0, l = oldEl.attributes.length, thisAttr; i < l; i++) {
		thisAttr = oldEl.attributes[i];
		if (thisAttr.nodeValue) {//IE<=7: exclude "", null
			attributeListObj[thisAttr.nodeName] = thisAttr.nodeValue;
		}
	}
	if (!attributeListObj.hasOwnProperty("style") && oldEl.style.cssText) {//IE<=7
		attributeListObj["style"] = oldEl.style.cssText;
	}
	attributeListObj["innerHTML"] = oldEl.innerHTML;
	var newEl = $c(oldEl.tagName, attributeListObj);
	oldEl.parentNode.insertBefore(newEl, oldEl);
	oldEl.parentNode.removeChild(oldEl);
	return newEl;
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

function getChecked(type) {//get checked. type: 1=url list; 2=size sum
	var urlList = [], sizeSum = 0;
	for (var i = 0, l = lis.length, thisli, thisa, thisinput; i < l; i++) {
		thisli = lis[i];
		thisa = thisli.getElementsByTagName("a")[0];
		thisinput = thisli.getElementsByTagName("input")[0];
		if (thisinput.checked) {
			if (thisa.getAttribute("downloadurl")) {
				urlList.push(thisa.getAttribute("downloadurl"));
				sizeSum += thisinput.getAttribute("size") * 1;
			} else {//new ver
				urlList.push(getFileInfoById(thisa.id).downloadurl);
				sizeSum += getFileInfoById(thisa.id).size * 1;
			}
		}
	}
	if (type == 1) {
		return urlList;
	} else if (type == 2) {
		return sizeSum;
	}
}

function getFileInfoById(id) {
	if (!getWindow("globallinkdata")) {
		return false;
	}
	for (var files = getWindow("globallinkdata").globallinkdata.data.resource.files, i = 0, l = files.length; i < l; i++) {
		if (files[i].id == id) {
			return files[i];
		}
	}
	return false;
}

function getFileInfoByFileName(fileName) {
	if (!getWindow("globallinkdata")) {
		return false;
	}
	var matchName = escape(fileName).toLowerCase().replace(/\%/g, "\\");
	for (var files = getWindow("globallinkdata").globallinkdata.data.resource.files, i = 0, l = files.length; i < l; i++) {
		if (files[i].name == fileName) {
			return files[i];
		}
	}
	return false;
}

function myShowTips(text, type) {//type = "error" or "green"
	var pos = getWindow("jQuery") ? (getWindow("jQuery").jQuery(document).scrollTop() + 300) + "px" : "300px",
	optips = $("optips"),
	optipsSpan = optips.getElementsByTagName("span")[0];
	type = type || "green";
	optipsSpan.innerHTML = text;
	optipsSpan.className = type;
	optips.style.top = pos;
	optips.style.display = "block";
	var timer = setTimeout(function () {
		optips.style.display = "none";
		optipsSpan.className = "";
		optipsSpan.innerHTML = "";
	}, 3000);
}

var newVer = (getWindow("globallinkdata")) ? true : false;//new ver page

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

//set ruleType to 3 to make sure the register interface cannot be shown
if (!newVer) {//old ver
	onCondition(function () {
		return $("downloadRuleInfo");
	}, function (downloadRuleInfo) {
		downloadRuleInfo.setAttribute("ruleType", 3);
	});
	//renew "迅雷下载" button to remove register interface event listener
	var xunleiDown = renewNode(xunleiDown);
	xunleiDown.setAttribute("onclick", "xunleiClick();");
	//renew again when window loaded to make sure the event listener is removed
	addEventCompatible(window, "load", function () {
		xunleiDown = renewNode(xunleiDown);
	//restore the useful event listener
		addEventCompatible(xunleiDown, "mouseover", showTitle);
		addEventCompatible(xunleiDown, "mouseout", hideTitle);
	});
} else {//new ver, do not renew "迅雷下载" button but set ruleType
	xunleiDown.setAttribute("ruleType", 3);
}
if (browser == "IE") {
	xunleiDown.title = "用迅雷批量下载所有勾选的文件";
} else {
	xunleiDown.title = "用迅雷下载所选文件（注：多个文件无效，请使用“复制所选链接”按钮复制多个勾选文件的链接粘贴至迅雷中下载）";
}
xunleiDown.removeAttribute("href");//don't scroll up

var tipReport = $("tip_report") || $("report"),//compatible for new ver
tipComplain = $("tip_complain"),
qqServiceLink = $("qqServiceLink"),
commonQA = $("commonqa") || $c("a", {"id": "commonqa", "target": "_blank", "href": "http://www.dbank.com/netdisk/help.html#6", "innerHTML": "常见问题"}),
tableFooter = qqServiceLink.parentNode,
selSize = $c("span", {"id": "selSize"}),
allSize = $("allSize") || $("rsum"),//compatible for new ver
tableHeader = allSize.parentNode;

qqServiceLink.innerHTML = "下载咨询";

tableHeader.appendChild(tipReport);
tableHeader.appendChild(tipComplain);
tableHeader.appendChild(commonQA);
tableHeader.appendChild(qqServiceLink);
tableFooter.appendChild(selSize);
tableFooter.appendChild(allSize);

if (tableFooter.getElementsByTagName("a").length > 0) {
	tableFooter.removeChild(tableFooter.getElementsByTagName("a")[0]);
}

var copyTa = $c("textarea", {"id": "dbanklinkercopyta", "style": "display: none;"});
document.body.appendChild(copyTa);

function renewSizeNCopy() {//renew selected size & copy textarea
	selSize.innerHTML = "(选中" + getChecked(1).length + "个资源," + getWindow("getFileSize").getFileSize(getChecked(2)) + ")";
	copyTa.value = getChecked(1).join("\n");
}

//handle file list
onCondition(function () {
	return (document.getElementsByName("checkAll")[0]);
}, function (checkAll) {
	for (var i = 0, l = lis.length, thisli, thisa, thisstrong, thischeckbox, thiscnt; i < l; i++) {
		thisli = lis[i];
		thisa = thisli.getElementsByTagName("a")[0];
		thisstrong = thisli.getElementsByTagName("strong")[0];
		thischeckbox = thisli.getElementsByTagName("input")[0];
		if (thisa.getAttribute("downloadurl")) {//old ver & not being examined
			thisa.href = thisa.getAttribute("downloadurl");
			thiscnt = thisa.getAttribute("cnt");
		} else {
			if (thisa.style.display == "none") {//likely being examined
				if (!thisa.id) {//no id found, new ver, crack it
					if (getFileInfoByFileName(thisa.title)) {
						thisa.id = getFileInfoByFileName(thisa.title).id;
						thisli.getElementsByTagName("del")[0].style.display = "none";
						thisli.getElementsByTagName("input")[0].removeAttribute("disabled");
						thisli.getElementsByTagName("span")[0].style.textDecoration = "line-through";
					}
				} else {//old ver being examined, cannot crack
					thisa.style.cssText = "display: none!important;";
				}
			}
			if (thisa.id && getFileInfoById(thisa.id)) {
				thisa.href = getFileInfoById(thisa.id).downloadurl;
				thiscnt = getFileInfoById(thisa.id).cnt;
			}
		}
		thisa.removeAttribute("onclick");
		if (typeof(thiscnt) !== "undefined") {
			thisstrong.innerHTML += "(" + thiscnt + "次)";
		}
		addEventCompatible(thischeckbox, "click", renewSizeNCopy);
	}
	addEventCompatible(checkAll, "click", function () {
		var timer = window.setTimeout(renewSizeNCopy, 50);
	});
});

//init renewSizeNCopy
onCondition(function () {
	return getWindow("getFileSize") && document.getElementsByName("checkAll")[0];
}, function () {
	var checkAll = document.getElementsByName("checkAll")[0];
	checkAll.checked = true;
	for (var i = 0, l = lis.length, thisinput; i < l; i++) {
		thisinput = lis[i].getElementsByTagName("input")[0];
		if (thisinput.disabled) {
			thisinput.checked = false;
			checkAll.checked = false;
		} else {
			thisinput.checked = true;
		}
	}
	renewSizeNCopy();
});

//renew file list links to remove register interface event listener
onCondition(function () {
	return lis[0].getElementsByTagName("a")[0].onclick !== null;
}, function () {
	for (var i = 0, l = lis.length, thisli, thisa; i < l; i++) {
		thisli = lis[i];
		thisa = lis[i].getElementsByTagName("a")[0];
		if (thisa.getAttribute("downloadurl")) {
			thisa = renewNode(thisa);
		}
	}
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
	function download(url) {
		if (/Firefox|Safari/g.test(navigator.userAgent) && !/Chrome/g.test(navigator.userAgent)) {
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
		myShowTips("请至少选择一个文件", "error");
	}
});

//create "复制所选链接" button
var copySelLinks = createButton("复制所选链接", -137, -504, "dbanklinkercopysellinks", "复制所有勾选文件的直接链接（一行一个）到剪贴板（注：DBank网盘文件的直接链接非永久有效，会不断改变，可能几十分钟后就失效，请立即下载、使用，勿作为永久链接张贴）");
buttonContainer.insertBefore(copySelLinks, downloadSel);
buttonContainer.insertBefore(downloadSel, copySelLinks);

//load scripts, prepare for "复制所选链接" button, fix shareto button bug
onCondition(function () {
	return getWindow("ZeroClipboard");
}, function (myWindow) {
	function doCopy(fromId, buttonId) {
		if (typeof(GM_setClipboard) !== "undefined") {
			addEventCompatible($(buttonId), "click", function () {
				if ($(fromId).value) {
					GM_setClipboard($(fromId).value);
					myShowTips("已复制到剪贴板");
				}
			});
		} else if (window.clipboardData) {
			addEventCompatible($(buttonId), "click", function () {
				if ($(fromId).value) {
					window.clipboardData.clearData();
					window.clipboardData.setData("Text", $(fromId).value);
					myShowTips("已复制到剪贴板");
				}
			});
		} else {
			onCondition(function () {
				return ((myWindow.ZeroClipboard.nextId == 2) || (newVer && /Opera/g.test(navigator.userAgent)));//when the hsDownload things are done or when the hsDownload is removed
			}, function () {
				myWindow.ZeroClipboard.setMoviePath("http://st3.dbank.com/js/swf/ZeroClipboard.swf");
				var clip = new myWindow.ZeroClipboard.Client();
				clip.setHandCursor(true);
				clip.addEventListener("mouseover", function (client) {
					clip.setText($(fromId).value);
				});
				clip.addEventListener("complete", function (client, text) {
					if ($(fromId).value) {
						myShowTips("已复制到剪贴板");
					} else {
						myShowTips("请至少选择一个文件", "error");
					}
				});
				clip.glue(buttonId);
			});
		}
	}
	function bindCopy() {
		if (newVer && /Opera/g.test(navigator.userAgent)) {//remove the buggy 高速下载 button in Opera, to prevent conflict with copy buttons
			buttonContainer.removeChild(hsDownload);
		}
		doCopy("dbanklinkercopyta", "dbanklinkercopysellinks");
	}
	bindCopy();
});

//fix shareto button bug when old ver and not logged in
onCondition(function () {
	return getWindow("dbank");
}, function (myWindow) {
	if (!myWindow.dbank.cookie("pid") && !newVer) {
		myWindow.dbank.lang.scriptLoader({url: ["http://www.dbank.com/netdisk/js/jquery-1.4.2.min.js", "http://st3.dbank.com/netdisk/components/dialog/link/share.js"]});
	}
});

//show button title when mouse on
var showButtonTitle = $c("div", {"id": "dbanklinkershowbuttontitle", "class": "selectall"});
buttonContainer.appendChild(showButtonTitle);

function showTitle() {
	if (!showButtonTitle.firstChild) {
		showButtonTitle.appendChild(document.createTextNode(this.title));
	} else {
		showButtonTitle.firstChild.nodeValue = this.title;
	}
	this.title = "";
}

function hideTitle() {
	this.title = showButtonTitle.firstChild.nodeValue;
	showButtonTitle.firstChild.nodeValue = "";
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

//add hotlinks "more" button, renew hotlist hrefs
if ($("hotlist")) {
	onCondition(function () {
		return $("hotlist").getElementsByTagName("a")[0];
	}, function () {
		$("hotlinks").getElementsByTagName("h2")[0].innerHTML = "网盘热门资源下载(<a href='http://dl.dbank.com/all/1' id='dbanklinkerhotmore' target='_blank'>更多</a>)";
		for (var as = $("hotlist").getElementsByTagName("a"), i = 0, l = as.length, oc; i < l; i++) {
			oc = as[i].getAttribute("onclick");
			as[i].href = oc.substring(10, oc.length - 3);
			as[i].removeAttribute("onclick");
			as[i].setAttribute("target", "_blank");
		}
	});
}

});

//==main block $("xunleidown") ends==

//prevent document.onclick pop-up ad
onCondition(function () {
	return getWindow("oP");
}, function (myWindow) {
	document.onclick = null;
	window.clearInterval(myWindow.oP.ab);
});

//prevent some changes when editing links
onCondition(function (){
	return getWindow("isCookie");//old ver, isCookie loaded
}, function (){
	if(getWindow("isCookie").isCookie()) {
		onCondition(function (){
			return $("editBut");
		}, function (editBut){
			addEventCompatible(editBut, "click", function () {
				$("dbanklinkerdownloadsel").style.display = "none";
				$("dbanklinkercopysellinks").style.display = "none";
				$("dbanklinkershowbuttontitle").style.display = "none";
			});
		}, 5000);
		onCondition(function (){
			return $("editFrame");
		}, function (editFrame){
			addEventCompatible(editFrame, "click", function () {
				$("dbanklinkerdownloadsel").style.display = "none";
				$("dbanklinkercopysellinks").style.display = "none";
				$("dbanklinkershowbuttontitle").style.display = "none";
			});
		}, 5000);
	}
});//DBank Link结束
}};

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

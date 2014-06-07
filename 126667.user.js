// ==UserScript==
// @name           HomepagePlus
// @namespace      plus
// @include        http://e-sim.org/index.html*
// ==/UserScript==


//============================================================================
//共通方法
//============================================================================
String.prototype.trim = function() { return this.replace(/(^[\t\n\r\s]*)|([\t\n\r\s]*$)/g, ""); } 

function getDataTable() {
	return document.evaluate("//table[@class='dataTable']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getOneDataTable() {
	return document.evaluate("//table[@class='dataTable']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

if (typeof GM_setValue == 'undefined') {
	function GM_setValue(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	}
}
if (typeof GM_getValue == 'undefined') {
	function GM_getValue(key, default_value) {
		var result = localStorage.getItem(key);
			if ((typeof result == 'null') && (typeof default_value != 'undefined')) {
			result = default_value;
		} else {
			result = JSON.parse(result);
		}
		return result;
	}
} 

var HP_AUTO_FLG = "HP_AUTO_FLG";

//============================================================================
//xxx
//============================================================================
//主页

function getShoutInfo() {
	url = "http://e-sim.org/shouts.html?country=28&page=1";
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onerror: function(msg) {
			getShoutInfo();
		},
		onload: function(responseDetails) {
			//<hr class="littleDashedLine"/>
			//'<div class="testDivwhite" style="width:370px;text-align: left">'
			//<img src="http://188.138.124.35:3000/avatars/48896_small" class="shoutImage" />
			//...
			//<br>
			//<div style="text-align: center">
			//pagination-digg
			
			tmp = responseDetails.responseText.replace(/^[\d\D]*?class="littleDashedLine"[^>]*>[^>]*>([\d\D]*?)<ul id="pagination-digg"[\d\D]*$/m,"$1").trim();
			//alert(tmp);
						
			sp = tmp.split("dashedLine");
			
			sp[sp.length-1] = sp[sp.length-1].replace(/^([\d\D]*?)<\/div>[\d\D]*$/m,"$1");
//			alert(sp[sp.length-1]);
			
			txt = sp.join("littleDashedLine");
			
			tt = document.createElement("div");
			tt.id = "countryShouts";
			tt.className = 'newsTab';
			
			obj = document.getElementById('countryShouts');
//			tmp = obj.lastElementChild.textContent;
//			alert(tmp);
			
			tt.innerHTML = txt + "<center>" + obj.lastElementChild.innerHTML + "</center>";
//			alert(tt.innerHTML);
			obj.parentNode.replaceChild(tt, obj);
			
			//"/>
			//<p style="clear: both"></p> </div>	
			//<br/>
			//<div style="text-align: center">
			//alert(sp[sp.length-1]);
		}
	});
	
}

function getTestInfo() {
	url = "http://e-sim.5d6d.com/thread-52-1-1.html";
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onerror: function(msg) {
			getTestInfo();
		},
		onload: function(responseDetails) {
			sp = responseDetails.responseText.split("#EC#MoD#");
			if (sp.length == 1) {
				txt = "因受两会影响，5d6d的帖子必须登录才能查阅。<br/>当你看到这段文字时，请登录<a href='e-sim.5d6d.com/bbs.php'>我们的5d6d论坛</a>，再刷新页面即可看到军令内容。<br/>给您带来不便，请谅解，谢谢！<br/><br/><a href='http://e-sim.org/article.html?id=17583'>※该脚本讨论报纸</a>";
			} else {
				txt = sp[1];
			}
			tt = document.getElementById('kexuejia');
			if (!tt) {
				obj = document.getElementById('userMenu');
				tt = document.createElement("div");
				tt.id = "kexuejia"
				tt.className = 'plate';
				tt.style.width = '93%';
				tt.innerHTML = txt;
				obj.insertBefore(tt, obj.children[5]);
				tt = document.createElement("br");
				obj.insertBefore(tt, obj.children[5]);
			} else {
				tt.innerHTML = txt;
			}
		}
	});
}

function doShoutplus() {
	if (GM_getValue(HP_AUTO_FLG,"0") == "0") {
		GM_setValue(HP_AUTO_FLG,"1");
	} else {
		GM_setValue(HP_AUTO_FLG,"0");
	}
}

function doRefresh() {
	modHP();
}

function init() {
	//"<input type='checkbox' id='chkConntDefender3' checked='true' style='margin: 1px'>"
	tt = document.createElement("div");
	tt.innerHTML = ""
				 + "<input type='checkbox' id='shoutplus' style=''>"
				 + "自动　　　"
				 + "<input type='button' value='刷新' id='rrefresh' style='float: right; margin-right: 25px'>"
				 ;
	
//	tt = document.createElement("input");
//	tt.type = "checkbox";
//	tt.id = "shoutplus";
	obj = document.getElementById('command');
	pp = obj.parentNode;
	pp.insertBefore(tt, obj.nextSibling);
	
	tmp = document.getElementById('rrefresh');
	tmp.addEventListener("click", doRefresh, false);
	tmp = document.getElementById('shoutplus');
	tmp.addEventListener("change", doShoutplus, false);
	
	if (GM_getValue(HP_AUTO_FLG,"0") == "0") {
		tmp.checked = false;
	} else {
		tmp.checked = true;
		modHP();
	}
}

function modHP() {
	getShoutInfo();
	getTestInfo();
}

//============================================================================
//Main
//============================================================================
function isTargetHtml(targetHtml) {
	if (window.location.pathname.substring(0,targetHtml.length)==targetHtml) {
		return true;
	} else {
		return false;
	}
}

if (document.getElementById('registerForm')) {
	//
} else if (window.location.pathname=="/" || isTargetHtml("/index.html")) {
	init();
}
// ==UserScript==
// @name          51NB Asst
// @description  51助手，黑名单，自动签到
// @namespace  by 51nb.com-FlyToSky
// @version        1.1.1
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_addStyle
// @include      *forum.51nb.com/*
// ==/UserScript==

var bid_blacklistArray;     //存放黑名单
var bid_blacklistStr;
var bid_blockThread;		//屏蔽主题贴
var bid_blockPost;			//屏蔽回复
var bid_blockQuote;			//屏蔽被引用
var bid_autoSign;
var bid_signed;
var bid_formhash;
var bid_uid;
var bid_VIEWTHREAD = window.location.href.indexOf('/thread-') > -1 || window.location.href.indexOf('/viewthread.php') > - 1;
var bid_FORUMDISPLAY = window.location.href.indexOf('/forum-') > - 1 || window.location.href.indexOf('/forumdisplay.php') > - 1;

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue = function (key,def) {
		return localStorage.getItem(key) || def;
    }
    this.GM_setValue = function (key,value) {
        return localStorage.setItem(key, value);
    }
}

if (!this.GM_addStyle || (this.GM_addStyle.toString && this.GM_addStyle.toString().indexOf("not supported")>-1)){
	this.GM_addStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

function bid_xpath(q) {
	return document.evaluate(q, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//读取设置
function bid_readConfig(){
	var v;
	var b = GM_getValue('51NB_BLL_' + bid_uid,'');
	if(b.length) bid_blacklistArray = b.split(",");
	else bid_blacklistArray = new Array();
	bid_blacklistStr=bid_blacklistArray.toString();
  
	b = GM_getValue('51NB_CHKSET_' + bid_uid,'');
	if (b.length) {
		bid_blockThread = (b.substring(0, 1) == '1') ? true:false;
		bid_blockPost = (b.substring(1, 2) == '1') ? true:false;
		bid_blockQuote = (b.substring(2, 3) == '1') ? true:false;
		bid_autoSign = (b.substring(3, 4) == '1') ? true:false;
	} else {
		bid_blockThread = true;
		bid_blockPost = true;
		bid_blockQuote = true;
		bid_autoSign = false;
	}
	if (bid_uid) {
		var d = new Date();
		bid_signed = (GM_getValue('51NB_GDB_' + bid_uid) == d.toDateString()) ? true : false;
	}
}
	
function bid_AddBlockBtn(){		// 添加屏蔽按钮
	var s = bid_xpath('//div[@style="padding-top: 6px;"]');
	for (i = 0; i < s.snapshotLength; ++i) {
		var t = s.snapshotItem(i);
		var a=document.createElement('a');
		a.innerHTML = '屏蔽';
		a.href = '###';
		a.addEventListener('click', bid_BlockUser,false);
		t.appendChild(document.createTextNode(" "));
		t.appendChild(a);
	}
}

function bid_BlockUser(e){      //点击屏蔽按钮
	var a = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('bold')[0].getElementsByTagName('a')[0];
	var nm= a.text.replace(/[\r\n]/g,'');
	var id= a.href.substring(a.href.indexOf('uid')+4,a.href.indexOf('.html'));
	bid_readConfig();					//先读取一下，解决多窗口情况下的同步问题
	if (bid_blacklistStr.indexOf(id+'='+nm) < 0) {	//检查黑名单是否已存在
		bid_blacklistArray.push(id+'='+nm);
		bid_blacklistStr = bid_blacklistArray.toString();
		bid_addBidlist(id,nm);
		GM_setValue('51NB_BLL_' + bid_uid, bid_blacklistStr);
	}
	bid_BlockList();
}

function bid_BlockList(){      // 屏蔽黑名单
	var s;
	if(bid_VIEWTHREAD){   // 帖子
		//屏蔽回复
		s = bid_xpath('//table[@class="t_rown"]/tbody/tr[1]/td[1]//a[@href]');
		for (i = 0; i < s.snapshotLength; ++i) {
			var a = s.snapshotItem(i);
			if( a != undefined){
				var id= a.href.substring(a.href.indexOf('uid')+4,a.href.indexOf('.html'));
				var n = a.text.replace(/[\r\n]/g,'');
				a.parentNode.parentNode.parentNode.parentNode.style.display=(bid_blockPost && bid_blacklistStr.indexOf(id+'='+n)>=0)?'none':'';
			}
		}
	// 屏蔽被引用内容
		s = bid_xpath('//div[@class="msgbody"]/div[@class="msgborder"]/i');
		for (i = 0; i < s.snapshotLength; ++i) {
			var t = s.snapshotItem(i);
			var n = t.innerHTML;
			t.parentNode.parentNode.style.display = (bid_blockQuote && bid_blacklistStr.indexOf(('='+n))>=0)?'none':'';
		}
	} else if(bid_FORUMDISPLAY){ // 论坛列表
		// 屏蔽主题帖
		s = bid_xpath('//table/tbody/tr/td[@class="f_author"]//a[@href]');
		for (i = 0; i < s.snapshotLength; ++i) {
			var a = s.snapshotItem(i);
			if( a != undefined){
				var id= a.href.substring(a.href.indexOf('uid')+4,a.href.indexOf('.html'));
				var n = a.text.replace(/[\r\n]/g,'');
				a.parentNode.parentNode.style.display=(bid_blockThread && bid_blacklistStr.indexOf(id+'='+n)>=0)?'none':'';
			}
		}
		// 隐藏最后回复位置的显示
		s = bid_xpath('//td[@class="f_last"]/font/a[2]');
		for (i = 0; i < s.snapshotLength; ++i) {
			a = s.snapshotItem(i);
			if(a != undefined) {
				n = a.text.replace(/[\r\n]/g,'');
				if (bid_blacklistStr.indexOf(('='+n))>=0) a.innerHTML='anonymous';
			}
		}
	}
}

function bid_CreatConfigPanel(){	//创建设置面板
    GM_addStyle(		//height:270px;top:50%;
		'#_51nbccp_div {position: fixed;left:50%;bottom:50px;margin-left:-115px; margin-top:-135px;align:center;width:230px;padding: 15px;z-index:99;color:#fff;background:#d3d3d3;border:2px solid #bfbfbf;border-radius:5px;opacity:0.95;text-align:left;font-size:12px !important;box-shadow: 0px 0px 9px #999999;}'+
		'#_bid_cc1 {font-size: 12px;}'+
		'#_bid_cc1 input {height: 12px;}'+
		'#_bid_del,#_bid_ok,#_bid_cancel {height: 20px !important;font-size: 12px !important;}'+
		'#_51nbgdb_div {position: fixed;top:25;left:50%;margin-left:-75px; align:center;width:150px;padding: 7px;text-align:center;color:#fff;background:#66c;z-index:100;border-radius:5px;font-size:14px;;box-shadow: 0px 0px 9px #999999;}'
	);

	if (bid_autoSign && (!bid_signed) && (bid_formhash)) {
		var bid_gdb = document.createElement("div");		//签到提示面板
		bid_gdb.id = '_51nbgdb_div';
		bid_gdb.style.display = "none";
		document.getElementsByTagName('body')[0].appendChild(bid_gdb);
	}
	
    var bid_ccp = document.createElement("div");		//设置面板
    bid_ccp.id = "_51nbccp_div";
    bid_ccp.style.display = "none";
    bid_ccp.innerHTML = 
		'<table id="_bid_cc1"><tr><td>'+
		'<center><font size=4>51助手</font> <sub>ver 1.1</sub></center></td></tr>'+
		'<tr><td>屏蔽内容：</td></tr>'+
		'<tr><td>'+
		'	<input id="_bid_chk_thread" type="checkbox" />主题贴'+
		'	<input id="_bid_chk_post" type="checkbox" />回复'+
		'	<input id="_bid_chk_quote" type="checkbox" />被引用'+
        '</td></tr>'+
		'<tr><td>管理黑名单：</td></tr>'+
		'<tr><td>'+
		'	<select name="bidlist" size="5" id="_bidlist" multiple style="width:160px; font-size:12px">'+
		'	</select>&nbsp;'+
		'	<input type="button" name="Submit" id="_bid_del" value="移 除" onclick="javascript:void(0)"/>'+
		'</td></tr>'+
		'<tr><td><br />其它功能：</td></tr>'+
		'<tr><td>'+
		'	<input id="_bid_chk_sign" type="checkbox" />自动签到'+
		'</td></tr>'+
        '<tr><td align="center">'+
        '	<br />'+
        '	<input type="button" name="Submit1" id="_bid_ok" value="确 定" onclick="javascript:void(0)"/>'+
        '	&nbsp;&nbsp;&nbsp;'+
        '	<input type="button" name="Submit2" id="_bid_cancel" value="取 消" onclick="javascript:void(0)"/>'+
        '	<br />'+
        '</td></tr>'+
		'</table>';
		
	document.getElementsByTagName('body')[0].appendChild(bid_ccp);
    document.getElementById('_bid_ok').addEventListener('click', function(){bid_SaveConfig(true);}, false);
    document.getElementById('_bid_cancel').addEventListener('click', function(){bid_SaveConfig(false);}, false);
    document.getElementById('_bid_del').addEventListener('click', function(){bid_delBidlist();}, false);
	document.addEventListener('keydown', bid_keyHandle, false);
	bid_refreshCfgdiv();
}

function bid_SaveConfig(s) {		//保存设置
	document.getElementById('_51nbccp_div').style.display = (document.getElementById('_51nbccp_div').style.display == '')?'none':'';
	var bl = document.getElementById("_bidlist"); 
	if (s) {
		if (bl.lenght != bid_blacklistArray.length) {
			bid_blacklistArray.length=0;
			for ( i = 0; i<bl.length; i++) {
				bid_blacklistArray[i]=bl.options[i].value+'='+bl.options[i].text;
			}
			bid_blacklistStr = bid_blacklistArray.toString();
			GM_setValue('51NB_BLL_' + bid_uid, bid_blacklistStr);
		}
		if ((document.getElementById('_bid_chk_thread').checked != bid_blockThread) ||
			(document.getElementById('_bid_chk_post').checked != bid_blockPost) ||
			(document.getElementById('_bid_chk_sign').checked != bid_autoSign) ||
			(document.getElementById('_bid_chk_quote').checked != bid_blockQuote)) {

			bid_blockThread = document.getElementById('_bid_chk_thread').checked;
			bid_blockPost = document.getElementById('_bid_chk_post').checked;
			bid_blockQuote = document.getElementById('_bid_chk_quote').checked;
			bid_autoSign = document.getElementById('_bid_chk_sign').checked;
			var v = ((bid_blockThread)?'1':'0')+((bid_blockPost)?'1':'0')+((bid_blockQuote)?'1':'0')+((bid_autoSign)?'1':'0');
			GM_setValue('51NB_CHKSET_' + bid_uid,v);
		}
		bid_BlockList();
	} else {
		if (document.getElementById('_51nbccp_div').style.display == 'none') bid_refreshCfgdiv();		//刷新设置界面
	}
}

function bid_refreshCfgdiv() {		//刷新设置界面
	if (document.getElementById("_bidlist").lenght != bid_blacklistArray.length) bid_addBidlist();

	if (document.getElementById('_bid_chk_thread').checked != bid_blockThread) document.getElementById('_bid_chk_thread').checked = bid_blockThread;
	if (document.getElementById('_bid_chk_post').checked != bid_blockPost) document.getElementById('_bid_chk_post').checked = bid_blockPost;
	if (document.getElementById('_bid_chk_quote').checked != bid_blockQuote) document.getElementById('_bid_chk_quote').checked = bid_blockQuote;
	if (bid_uid) {
		if (document.getElementById('_bid_chk_sign').checked != bid_autoSign) document.getElementById('_bid_chk_sign').checked = bid_autoSign;
		document.getElementById('_bid_chk_sign').disabled = false;
	} else {
		document.getElementById('_bid_chk_sign').checked = false;
		document.getElementById('_bid_chk_sign').disabled = true;
	}
}

function bid_addBidlist(id,nm) {		//刷新新黑名单列表
	var bl = document.getElementById("_bidlist");
	if (id !=undefined) {		//id非空时增加一个名单
		var o = document.createElement('option');
		o.value = id;
		o.text = nm;
		bl.options[bl.options.length] = o;
	} else {		//id为空时刷新列表
		bl.options.length = 0;
		for ( i = 0; i<bid_blacklistArray.length; i++) {
			var o = document.createElement('option');
			var j = bid_blacklistArray[i].indexOf('=');
			o.value = bid_blacklistArray[i].substring(0,j);
			o.text = bid_blacklistArray[i].substring(j+1);
			bl.options[bl.options.length] = o;
		}
	}
}

function bid_delBidlist() {		//删除列表中所选名单
	var bl = document.getElementById("_bidlist"); 
	for (i=0;i<bl.options.length;i++) {
		if (bl.options[i].selected) {
			bl.options.remove(i--);
		}
	}
}

function bid_keyHandle(e) {		//热键回调函数
	if (/^(?:input|textarea)$/i.test(e.target.localName)) return;
	var k1 = e.ctrlKey? '1':'0';
	var k2 = (e.metaKey || e.altKey)? '1':'0';
	var k3 = e.shiftKey? '1':'0';
	var k4 = String.fromCharCode(e.which);
	var keycom = k1+k2+k3+k4;

	switch (keycom) {
		case '010N':	e.preventDefault();e.stopPropagation();bid_SaveConfig(false); break;
	}
}

function bid_sign() {
	if (bid_autoSign && (!bid_signed) && (bid_formhash)) {
		var _date = new Date();
		if ((_date.getHours()*60 + _date.getMinutes()) < 10) return;		//0点10分以后才开始签到
		var http = new XMLHttpRequest();
		var url = 'bank.php?action=getdailybonus';
		var data = 'formhash=' + bid_formhash + '&dailysubmit=yes';
		http.open('POST', url, false);
		http.setRequestHeader("Referer","http://forum.51nb.com/bank.php?action=getdailybonus");
		http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=gbk");
		http.send(data);
		if (http.readyState==4) {// 4 = "loaded"
			if (http.status==200) {// 200 = http OK
				if (http.responseText.indexOf('report.php?action=listbonus') > -1) {		//签到成功
					bid_signed = true;
					GM_setValue('51NB_GDB_' + bid_uid, _date.toDateString());
					var nb = http.responseText.replace(/^[\s\S]*\(<font color="red"><b>(\d+)<\/b><\/font>\)nb =[\s\S]*$/gm, '$1');
					if (!isNaN(nb)) {
						document.getElementById('_51nbgdb_div').innerHTML = '今日签到：+'+nb+' NB';
						document.getElementById('_51nbgdb_div').style.display = '';
						setTimeout(function() {document.getElementById('_51nbgdb_div').style.display = 'none';}, 3000);
					}
				}
			}
		}
	}
}

function bid_getFormhash() {
	var s = bid_xpath('//a[starts-with(@href,"logging.php?action=logout")]');
	for (i = 0; i < s.snapshotLength; ++i) {
		var a = s.snapshotItem(i);
		if( a != undefined) {
			bid_formhash = a.href.substring(a.href.indexOf('formhash')+9, a.href.indexOf('formhash')+9+8);
		}
	}
	if (bid_formhash) {
		s = bid_xpath('//div[@class="menu1"]/div[@class="maintable"]//span[@class="bold"]//a[starts-with(@href,"profile-uid-")]');
		for (i = 0; i < s.snapshotLength; ++i) {
			var a = s.snapshotItem(i);
			if( a != undefined) {
				bid_uid = a.href.substring(a.href.indexOf('uid')+4,a.href.indexOf('.html'));
			}
		}
	}
	if (!bid_uid) bid_uid = '';
}

bid_getFormhash();
bid_readConfig();		//读取设置参数
bid_CreatConfigPanel();
if (bid_VIEWTHREAD) {
	bid_AddBlockBtn();
}
if(bid_FORUMDISPLAY || bid_VIEWTHREAD) {
	bid_BlockList();
}
window.onload = setTimeout(function() {
	bid_sign();
},500);

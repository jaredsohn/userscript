// ==UserScript==
// @name           hi-pda tools
// @namespace      hi-pda-tools-by-2200
// @description    屏蔽用户，高亮用户，只看楼主(某人)；标识新帖；好孩子也看的见
// @include        http://www.hi-pda.com/forum/*
// ==/UserScript==
// Version 2.1
// Date 2011-4-3
//  修正Chrome错误
//  脚本仅针对D版有效
// Version 2.0
// Date 2010-2-9

// Chrome浏览器不支GM_GetValue/GM_SetValue
try{
  if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
      this.GM_getValue=function (key,def) {
          return localStorage[key] || def;
      };
      this.GM_setValue=function (key,value) {
          return localStorage[key]=value;
      };
  }
}
catch(e){
}

var _pc = 1;        // 当前页面的page值
var _fid;           // 当前版面fid
var _tid= 0;        // 当前帖子的tid
var _pxt;           // 当前页面上“最后回复时间”的最大值
var _pmt;           // 当前页面上“最后回复时间”的最小值
var _lvt;           // 上次访问时间，页面关闭时,_pxt 存储为 _lvt
var _today;         // 与发帖日期比较，超过30天的发帖人单元格显示灰色
var _su  = 0;       // 只看该用户的帖子
var _showonlydone = false;
var _first_time_use = false;
var _max_read_pages  = 10; // 不能读取更多
// var _highlight_color = "#F0E68C";
var _highlight_color = "#CCE8CF";
var _old_post_bgcolor  = "#E1E1E1";
var _today_post_color  = "#FF0000";
var now = new Date();  
var year = now.getYear()+1900;
var month = now.getMonth()+1;
var day = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();
//  脚本仅针对D版有效
//  var _bFORUMDISPLAY = location.href.indexOf('hi-pda.com/forum/forumdisplay.php?');
var _bFORUMDISPLAY = location.href.indexOf('hi-pda.com/forum/forumdisplay.php?fid=2');
var _bVIEWTHREAD   = location.href.indexOf('hi-pda.com/forum/viewthread.php?');

function readPageURL(){
    var offset = window.location.search.indexOf("page=");
    if(offset>0){
        var t = window.location.search.substr(offset);
        if(t.indexOf("&") >0){
            _pc = t.slice(5,t.indexOf("&"));
        }else{
            _pc = t.slice(5);
        }
    }else{
        _pc = 1;
    }
    offset = window.location.search.indexOf("tid=");
    if(offset>0){
        var t = window.location.search.substr(offset);
        if(t.indexOf("&") >0){
            _tid = t.slice(4,t.indexOf("&"));
        }else{
            _tid = t.slice(4);
        }
    }
}
function $(select){
    var name = select.substring(1);
    switch(select.charAt(0)){
        case '#':
            return document.getElementById(name);
        case '.':
            return document.getElementsByClassName(name);
        case '/':
            return document.getElementsByTagName(name);
        default:
            return document.getElementsByName(select);
    }
};
function onHighlight(e){ // [高亮] 按钮触发
    var ht = e.target;
    var ha = ht.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('bold')[0];
    var hu = ha.href.substring(ha.href.indexOf('uid')+4);
    var s = document.evaluate("//td[@class='t_user']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) {
        var t = s.snapshotItem(i);
        var a = t.getElementsByClassName('bold')[0];
        if( a != undefined){
            var u = a.href.substring(a.href.indexOf('uid')+4);
            if(hu == u){
                t.style.background = _highlight_color;
                t.parentNode.parentNode.parentNode.getElementsByClassName('t_msg')[0].style.background=_highlight_color;
                t.parentNode.parentNode.parentNode.getElementsByClassName('t_msg')[0].style.bgcolor=_highlight_color;
            }
        }
    }
};
function toggleBlackList(e){
    var v = e.target.value;
    var bShow = e.target.checked;
    if(_bVIEWTHREAD>0){
        var s = document.evaluate("//td[@class='t_user']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = s.snapshotLength - 1; i >= 0; i--) {
            var t = s.snapshotItem(i);
            var a = t.getElementsByClassName('bold')[0];
            if( a != undefined){
                var u = a.href.substring(a.href.indexOf('uid')+4);
                if((u+'='+a.text) == v)t.parentNode.parentNode.parentNode.parentNode.style.display = bShow?'none':'';
            }
        }
    }
    if(_bFORUMDISPLAY>0){
        var s = document.evaluate("//td[@class='f_author']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = s.snapshotLength - 1; i >= 0; i--) { // 屏蔽BLACK_LIST的发帖
            var t = s.snapshotItem(i);
            var a = t.getElementsByTagName('a')[0];
            if( a != undefined){
                var n = a.text;
                var u = a.href.substring(a.href.indexOf('uid')+4);
                if((u+'='+a.text) == v)t.parentNode.style.display = bShow?'none':'';
            }
        }
    }
};
function processBlackList(){
    var b = GM_getValue('HiPDA_Discovery_BLACK_LIST');
    if(b == undefined)b='';
    var ba = '';
    if(b.length>0)var ba = b.split(",");
    else ba = new Array();
    var bstr=ba.toString();
    if(_bVIEWTHREAD>0){
        var s = document.evaluate("//td[@class='t_user']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = s.snapshotLength - 1; i >= 0; i--) {
            var t = s.snapshotItem(i);
            var a = t.getElementsByClassName('bold')[0];
            if( a != undefined){
                var n = a.text;
                var u = a.href.substring(a.href.indexOf('uid')+4);
                if(bstr.indexOf(u+'='+n)>=0)t.parentNode.parentNode.parentNode.parentNode.style.display='none';
                else t.parentNode.parentNode.parentNode.parentNode.style.display='';
            }
        }
        s = document.evaluate("//div[@class='msgborder']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = s.snapshotLength - 1; i >= 0; i--) {
            var t = s.snapshotItem(i);
            var a = t.getElementsByTagName('i')[0];
            if(( a != undefined)&&(bstr.indexOf(('='+a.innerHTML+','))>=0))t.style.display = 'none';
        }
    }
    if(_bFORUMDISPLAY>0){
        var s = document.evaluate("//td[@class='f_author']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = s.snapshotLength - 1; i >= 0; i--) { // 屏蔽BLACK_LIST的发帖
            var t = s.snapshotItem(i);
            var a = t.getElementsByTagName('a')[0];
            if( a != undefined){
                var n = a.text;
                var u = a.href.substring(a.href.indexOf('uid')+4);
                if(bstr.indexOf(u+'='+n)>=0)t.parentNode.style.display='none';
                else t.parentNode.style.display='';
            }
        }
        s = document.evaluate("//td[@class='f_last']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = s.snapshotLength - 1; i >= 0; i--) { // 隐藏BLACK_LIST在最后回复位置的显示
            var t = s.snapshotItem(i);
            var a = t.getElementsByTagName('a')[1];
            if((a != undefined)&&(bstr.indexOf(('='+a.text))>=0))a.innerHTML='anonymous';
        }
    }
};
function onHide(e){ // [屏蔽] 按钮触发
    var a = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('bold')[0];
    var nm= a.text;
    var id= a.href.substring(a.href.indexOf('uid')+4);
    var bla='';
    var b = GM_getValue('HiPDA_Discovery_BLACK_LIST');
    if(b == undefined)b='';
    if(b.length>0)bla = b.split(",");
    else bla = new Array();
    if(bla.join().indexOf(id+'='+nm)<0)bla.push(id+'='+nm);//检查有没有重复的
    GM_setValue('HiPDA_Discovery_BLACK_LIST',bla.join());
    refreshConfigDiv();
    processBlackList();
};
function processShowOnly(){
    if(_su == 0)return;
    var s = document.evaluate("//td[@class='t_user']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) {
        var t = s.snapshotItem(i);
        var ta= t.getElementsByClassName('bold')[0];
        if( ta != undefined){
            var u = ta.href.substring(ta.href.indexOf('uid')+4);
            if(_su != u)t.parentNode.parentNode.parentNode.parentNode.style.display='none';
        }
    }
}
function onLoadNewPage(req){
    if(_bFORUMDISPLAY>0){
        try {
            if (req.status == 200) {
                // 返回的html文件不是合格的xml，所以responseXML为空
                var p1 = req.responseText.substring(req.responseText.indexOf('<form'),req.responseText.indexOf('</form>')+7);
                var p2 = p1.substring(p1.indexOf('<div class="maintable">')+23,p1.indexOf('<div class="maintable"><div class="spaceborder spacebottom"')-7);
                var p22= p1.substring(p1.indexOf('<table'),p1.indexOf('<div class="maintable"><div class="spaceborder spacebottom"')-14);
                var nav = document.body.getElementsByClassName("spaceborder")[2];
                nav.innerHTML = nav.innerHTML + p22;
            }
        } catch (e) {}
        refreshMinTime();
        _max_read_pages--;
        if( _max_read_pages && (timeDiff(_pmt,_lvt))){
            _pc++;
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://www.hi-pda.com/forum/forumdisplay.php?fid='+_fid+'&page='+_pc,
                onload: onLoadNewPage,
                overrideMimeType: "text/html; charset=gbk"
            });
        }
        doColor();
        processBlackList();
    }
    if(_bVIEWTHREAD>0){
        try {
            if (req.status == 200) {
                var t1 = req.responseText.substring(req.responseText.indexOf('name="delpost"'));
                var p1 = t1.substring(1,t1.indexOf('</form>')+7);
                var f1 = p1.substring(p1.indexOf('<div class="right t_number">'));
                var flr= f1.substring(f1.indexOf('>#')+2,f1.indexOf('</a></div>'));
                if((flr != '1') && _max_read_pages-- ){
                    var htm= p1.substring(p1.indexOf('<div '),p1.indexOf('</form>'));
                    var nav = document.getElementsByName("delpost")[0];
                    if( nav != undefined){
                        nav.innerHTML = nav.innerHTML + htm;
                        appendControl(); // 执行一次innerHTML赋值后，以前addEventListener的都失效了
                        processShowOnly();
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: 'http://www.hi-pda.com/forum/viewthread.php?tid='+_tid+'&page='+(++_pc),
                            onload: onLoadNewPage,
                            overrideMimeType: "text/html; charset=gbk"
                        });
                    }
                }
                else _showonlydone = true;
            }
        } catch (e) {alert('f(^_^) 搞不定了~~')}
    }
}
function onShowOnly(e){ // [只看此人] 按钮触发
    var a = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('bold')[0];
    _su= a.href.substring(a.href.indexOf('uid')+4);
    readPageURL();
    processShowOnly();
    if(_showonlydone)return;
    if(_tid)GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.hi-pda.com/forum/viewthread.php?tid='+_tid+'&page='+(++_pc),
        onload: onLoadNewPage,
        overrideMimeType: "text/html; charset=gbk"
    });
};
function showHiddenText(){ // 好孩子看得见
    var s = document.evaluate("//font[\
              translate(@color,'ABCDEFGHIJKLMNOPQRSTUVWXYZ ','abcdefghijklmnopqrstuvwxyz')='white' \
              or \
              translate(@color,'ABCDEFGHIJKLMNOPQRSTUVWXYZ ','abcdefghijklmnopqrstuvwxyz')='#ffffff']", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) {
        var t=s.snapshotItem(i).innerHTML;
        t=t.replace(/white/i,"red");
        t=t.replace(/#ffffff/i,"red");
        t=s.snapshotItem(i).innerHTML='<div class="msgheader" style="color:red;font-size:16">'+t+'</div>';
    }
};
function appendControl(){ // 添加[屏蔽] [高亮] [只看此人] 按钮
    var s = document.evaluate("//td[@class='t_user']",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) {
        var t = s.snapshotItem(i);
        var a = t.getElementsByClassName('bold')[0];
        if( a != undefined){
            var n = a.text;
            var u = a.href.substring(a.href.indexOf('uid')+4);
            
            var floor = a.parentNode.parentNode.getElementsByClassName('t_number')[0];
            var e = floor.nextSibling.nextSibling.getElementsByClassName('hpToolbarCtrl');
            if(e.length>0){
                floor.nextSibling.nextSibling.removeChild(e[0]);
            }
            
            var a1=document.createElement('a');
            a1.innerHTML = '屏蔽';
            a1.href = '###';
            a1.addEventListener('click', onHide,false);
            
            var a2=document.createElement('a');
            a2.innerHTML = '高亮';
            a2.href = '###';
            a2.addEventListener('click', onHighlight,false);
            
            var a3=document.createElement('a');
            if(floor.childNodes[0].text == '#1') {
                a3.innerHTML = '只看楼主';
                a3.className = 'bold';
                a3.style.color="#f00";
            }
            else a3.innerHTML = '只看此人';
            a3.href = '###';
            a3.addEventListener('click', onShowOnly,false);
            
            var ap=document.createElement('span');
            ap.className='hpToolbarCtrl';        
            ap.appendChild(a1);
            ap.appendChild(document.createTextNode(" "));
            ap.appendChild(a2);
            ap.appendChild(document.createTextNode(" "));
            ap.appendChild(a3);
            floor.nextSibling.nextSibling.appendChild(ap);
        }
    }
};
function addConfigDiv(){ // 添加编辑黑名单的界面
    GM_addStyle('\
        #hp_cfg_div{\
            position:fixed;\
            align:center;\
            width: 200px;\
            padding: 15px;\
            bottom:20px;\
            right:20px;\
            z-index:99;\
            color:#fff;\
            background:#000;\
            border:1px solid #fff;\
            -moz-border-radius:5px;\
            font-size:16px; \
            opacity:0.9;\
            }\
        #hp_cfg_div input {\
            height: 12px\
        }\
        #hp_cfg_div a {\
            -moz-border-radius: 2px;\
            background: #eef9eb;\
            width: 50px;\
            border: 1px solid #fff;\
        }\
        #hp_cfg_div a:hover {\
            border: 1px solid #aaa;\
            background: #fff;\
            color: #000;\
        }\
        .hpToolbarCtrl {\
            float: right;\
        }\
        ');
    var hp_cfg = document.createElement("div");
    hp_cfg.id = "hp_cfg_div";
    hp_cfg.style.display = "none";
    hp_cfg.innerHTML = '屏蔽用户列表：<br />\
        ----------------------<br />\
        <div id="blacklist"></div><br /><br />\
        <div align="center">\
            <a href="javascript:void(0)" id="s_ok" >√ 确定</a>\
            &nbsp;&nbsp; \
            <a href="javascript:void(0)" id="s_cl" >X 取消</a>\
            <br />\
        </div>\
        ';
    document.getElementsByTagName('body')[0].appendChild(hp_cfg);
    $('#s_ok').addEventListener('click', function(){saveConfig(true);}, false);
    $('#s_cl').addEventListener('click', function(){saveConfig(false);}, false);
}
function saveConfig(save){ // 保存黑名单编辑结果
    if(save){
        var s = new Array();
        var r = document.getElementsByClassName('bl_chk');
        for (var i = r.length-1; i >= 0; i--)if(r[i].checked)s.push(r[i].value);
        GM_setValue('HiPDA_Discovery_BLACK_LIST',s.join());
    }
    $('#hp_cfg_div').style.display = ($('#hp_cfg_div').style.display == 'none')?'':'none';
    processBlackList();
    processShowOnly();
};
function refreshConfigDiv(){ // 刷新编辑黑名单的界面
    var b = GM_getValue('HiPDA_Discovery_BLACK_LIST');
    if(b == undefined)b='';
    var bla = '';
    if(b.length)bla = b.split(",");
    else bla = new Array();
    var str='';
    var l = bla.length;
    $('#blacklist').innerHTML='';
    if(l){
        for(var i=0;i<l;i++){
            var t = bla.pop();
            var lst=document.createElement('input');
            lst.className = 'bl_chk';
            lst.value = t;
            lst.type  = 'checkbox';
            lst.checked   = true;
            lst.addEventListener('click', toggleBlackList,false);
            var dv=document.createElement('div');
            dv.appendChild(lst);
            dv.appendChild(document.createTextNode(t.substr(t.indexOf('=')+1)));
            $('#blacklist').appendChild(dv);
        }
    }else $('#blacklist').innerHTML = '您还没有屏蔽任何用户';
    /*if(l)
        for(var i=0;i<l;i++){
            var t = bla.pop();
            str+=('<input class="bl_chk" type="checkbox" checked value="'+t+'" onclick="processBlackList();" />'+t.substr(t.indexOf("=")+1)+'<br />');
        }
    else str+='您还没有屏蔽任何用户';
    $('#blacklist').innerHTML = str;*/
}
function getKeys(e){// keycode 转换
    var codetable={'96':'Numpad 0','97':'Numpad 1','98':'Numpad 2','99':'Numpad 3','100':'Numpad 4','101':'Numpad 5','102':'Numpad 6','103':'Numpad 7','104':'Numpad 8','105':'Numpad 9','106':'Numpad *','107':'Numpad +','108':'Numpad Enter','109':'Numpad -','110':'Numpad .','111':'Numpad /','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','8':'BackSpace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Ctrl','18':'Alt','20':'Cape Lock','27':'Esc','32':'Spacebar','33':'Page Up','34':'Page Down','35':'End','36':'Home','37':'←','38':'↑','39':'→','40':'↓','45':'Insert','46':'Delete','144':'Num Lock','186':';:','187':'=+','188':',<','189':'-_','190':'.>','191':'/?','192':'`~','219':'[{','220':'\|','221':']}','222':'"'};
    var Keys = '';
    e.shiftKey && (e.keyCode != 16) && (Keys += 'shift+');
    e.ctrlKey && (e.keyCode != 17) && (Keys += 'ctrl+');
    e.altKey && (e.keyCode != 18) && (Keys += 'alt+');
    return Keys + (codetable[e.keyCode] || String.fromCharCode(e.keyCode) || '');
};
function addHotKey(codes,func){// 监视并执行快捷键对应的函数
    document.addEventListener('keydown', function(e){
        if ((e.target.tagName != 'INPUT') && (e.target.tagName != 'TEXTAREA') && getKeys(e) == codes){
            func();
            e.preventDefault();
            e.stopPropagation();
        }
    }, false);
};
function readConfig(){
    _today = year + "-" + month + "-" + day;
    _pxt = "1900-1-1 01:01";
    _pmt = year + "-" + month + "-" + day + " " + hour + ":" + min;
    var offset = window.location.search.indexOf("page=");
    if(offset>0){
        var t = window.location.search.substr(offset);
        if(t.indexOf("&") >0){
            _pc = t.slice(5,t.indexOf("&"));
        }else{
            _pc = t.slice(5);
        }
    }else{
        _pc = 1;
    }
    offset = window.location.search.indexOf("fid=");
    if(offset>0){
        var t = window.location.search.substr(offset);
        if(t.indexOf("&") >0){
            _fid = t.slice(4,t.indexOf("&"));
        }else{
            _fid = t.slice(4);
        }
    }else{
        _fid = 1;
    }
    _lvt = GM_getValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid);
    if(_lvt == undefined){
        _lvt = year + "-" + month + "-" + (--day) + " " + hour + ":" + min;;
        _first_time_use = true;
        GM_setValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid,_lvt);
    }
}
function timeDiff(date1,date2){// 比较日期大小，年，月，日，小时，分钟
	var re=/^(\d{4})\S(\d{1,2})\S(\d{1,2})\s(\d{1,2})\S(\d{1,2})$/;  
	var dt1,dt2;  
	if (re.test(date1)) dt1=new Date(RegExp.$1,RegExp.$2-1,RegExp.$3,RegExp.$4,RegExp.$5);  
	if (re.test(date2)) dt2=new Date(RegExp.$1,RegExp.$2-1,RegExp.$3,RegExp.$4,RegExp.$5); 
	else dt2=new Date();
	return dt1>=dt2;
}
function dateDiff(date1,date2){// 比较日期大小，年月日
	var re=/^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;  
	var dt1,dt2;  
	if (re.test(date1)) dt1=new Date(RegExp.$1,RegExp.$2-1,RegExp.$3);  
	if (re.test(date2)) dt2=new Date(RegExp.$1,RegExp.$2-1,RegExp.$3);  
	return Math.floor((dt2-dt1)/(1000*60*60*24))
}
function onPageUnload(){
    //防止开了page3，page4，先关闭page3，再关闭page4时刷新了page3的_lvt
    _lvt = GM_getValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid);
    if(_lvt == undefined)_lvt="1900-1-1 01:01";
    if(timeDiff(_pxt,_lvt)) GM_setValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid,_pxt);
    else GM_setValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid,_lvt);
}
function doColor(){// 对页面进行标记
	// 遍历页面中的帖子列表，将所有“最后回复时间”大于 _lvt 的帖子背景色换成 _highlight_color
	// 这里没有排除置顶帖子
	var f = document.evaluate("//td [@class='f_last']", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = f.snapshotLength - 1; i >= 0; i--){
		var e = f.snapshotItem(i);
        var a = e.getElementsByTagName('a')[0];
        if( a != undefined){
            var _rt = a.text;
            if (timeDiff(_rt,_lvt)){
                e.parentNode.style.background=_highlight_color;
                e.parentNode.addEventListener('mouseover',function(event){this.style.background="";},false);
                }
            if(timeDiff(_rt,_pxt))
                _pxt = _rt;
        }
	}
	// 将发帖日期超过30天的帖子里发帖人单元格背景换成 _old_post_bgcolor :灰色
	// 将当天发布的帖子里发帖日期颜色变成 _today_post_color :红色
	var snapResults = document.evaluate("//span [@class='smalltxt lighttxt']", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var e = snapResults.snapshotItem(i);
		var dd = dateDiff(e.innerHTML,_today);
		if (dd >= 30) {
			if (e.parentNode.parentNode.innerHTML.indexOf("images/default/pin")==-1)
				e.parentNode.style.background=_old_post_bgcolor;
		}
		if (dd == 0) {
			if (e.parentNode.parentNode.innerHTML.indexOf("images/default/pin")==-1)
				e.style.color=_today_post_color;
		}
	}
}
function refreshMinTime(){// 取得当前页面的 _pmt —— 包含预读取的后续页面内容
	var snapResults3 = document.evaluate("//td [@class='f_last']", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapResults3.snapshotLength - 1; i >= 0; i--){
		var e = snapResults3.snapshotItem(i);
		//如果是置顶帖子，就不要取时间值
		var checkTop = e.parentNode.getElementsByClassName('right');
		if(checkTop){
			if(checkTop[0].innerHTML.indexOf('images/default/pin')<0){
				var _rt = e.getElementsByTagName('a')[0].text;
				if(timeDiff(_pmt,_rt))
					_pmt = _rt;
			}
		}
	}
}
if(_bFORUMDISPLAY>0 || _bVIEWTHREAD>0){
addConfigDiv();
addHotKey('alt+O',function(){refreshConfigDiv();saveConfig(false);});
addHotKey('Esc',function(){$('#hp_cfg_div').style.display = 'none'});
}
if(_bFORUMDISPLAY>0){
    readConfig();
    window.addEventListener('unload',onPageUnload,false);
    refreshMinTime(); // 一开始就刷新一次，否则直接就取下一页了
    if(!_first_time_use){ //第一次用就不往后续读取了
        if(timeDiff(_pmt,_lvt)){
            _pc++;
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://www.hi-pda.com/forum/forumdisplay.php?fid='+_fid+'&page='+_pc,
                onload: onLoadNewPage,
                overrideMimeType: "text/html; charset=gbk"
            });
        }
    }
    doColor();
    processBlackList();
}
if(_bVIEWTHREAD>0){
    appendControl();
    processBlackList();
    showHiddenText();
}
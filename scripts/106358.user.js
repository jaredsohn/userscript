// ==UserScript==
// @name           hi-pda tools
// @namespace      hi-pda-tools-by-2200
// @description    屏蔽用户、名单同步；标识新帖；好孩子也看的见；
// @include        http://*.hi-pda.com/forum/*
// @version 5.2
// ==/UserScript==
// Version 5.2
// 修正各种chrome不兼容的函数
// 因SAE挂掉，去除了同步功能
// Version 5.1 TODO
//  宽窄可选
//  opera支持
//  投票icon
//  枫叶版chrome兼容
//  点击显示图片
//  屏蔽用户hover改为帖子触发
//  预取几页可选
//  高亮自己的贴
// Version 5.0
// Date 2011-12-18
//  增加同步功能
// Version 4.0
// Date 2011-12-06
//  论坛改版
// Version 3.0
// Date 2011-7-13
//  增加自动更新
// Version 2.2
// Date 2011-7-13
//  修正zhuyi增加【只讨论2.0】板块后预读页面错误
//  高亮功能修改为可选，颜色自定义
//  屏蔽用户功能修改为分版面可选
// Version 2.1
// Date 2011-4-3
//  修正Chrome错误
//  脚本仅针对D版有效
// Version 2.0
// Date 2010-2-9

// @require        http://userscript-updater-generator.appspot.com/?id=106358
// Chrome浏览器不支GM_GetValue/GM_SetValue/GM_addStyle/GM_xmlhttpRequest
try{
  if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
      this.GM_getValue=function (key,def) {
          return localStorage[key] || def;
      };
      this.GM_setValue=function (key,value) {
          return localStorage[key]=value;
      };
  } 
  if (!this.GM_addStyle || this.GM_addStyle.toString().indexOf("not supported")>-1){ 
      this.GM_addStyle = function(css) {
      var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
      }
  }
  if ( !this.GM_xmlhttpRequest || this.GM_xmlhttpRequest.toString().indexOf("not supported")>-1 ) {
      this.GM_xmlhttpRequest = 
      function (details) {
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {
              var responseState = {
                  responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
                  responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
                  readyState:xmlhttp.readyState,
                  responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
                  status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
                  statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
              }
              if (details["onreadystatechange"]) {
                  details["onreadystatechange"](responseState);
              }
              if (xmlhttp.readyState==4) {
                  if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                      details["onload"](responseState);
                  }
                  if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                      details["onerror"](responseState);
                  }
              }
          }
          try {
            //cannot do cross domain
            xmlhttp.open(details.method, details.url);
          } catch(e) {
            if( details["onerror"] ) {
              //simulate a real error
              details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
            }
            return;
          }
          if (details.headers) {
              for (var prop in details.headers) {
                  xmlhttp.setRequestHeader(prop, details.headers[prop]);
              }
          }
          xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
      }
  }
}
catch(e){}

var _pc = 1;        // 当前页面的page值
var _fid;           // 当前版面fid
var _uid;           // 当前登录用户uid
var _tid= 0;        // 当前帖子的tid
var _pxt;           // 当前页面上“最后回复时间”的最大值
var _pmt;           // 当前页面上“最后回复时间”的最小值
var _lvt;           // 上次访问时间，页面关闭时,_pxt 存储为 _lvt
var _today;         // 与发帖日期比较，超过30天的发帖人单元格显示灰色
var _first_time_use;
var _max_read_pages  = 5;     // 不能读取更多啦，太多了容易死机
var _hightlight_en;           // 启用高亮功能
var _hightlight_color;        // 高亮颜色自定义
var _blacklist_en_hpd;        // 启用D版的黑名单功能
var _blacklist_en_other;      // 启用其他版的黑名单功能
var _simple_style;            // 启用精简风格
var _hover_style;             // 启用悬停风格
var _reply_avatar;            // 回复位置是否显示自己的头像
var _font_size;               // 论坛字体大小
var blacklistArray;           // 黑名单
var blacklistLen;             // 黑名单长度
var blacklistStr;
var serverBlacklist;          // 同步冲突时服务器端的列表
var serverListStr;
var serverVersion;
var newBlacklist              // 同步冲突时的新列表
var _syn_pending;             // 正在同步
var _syn_lastversion;
var _syn_modified;
var _att_max_width;           // 帖子附件图片最大宽度

var grave_image;              // 坟贴背景图片
// var _old_post_bgcolor  = "#E1E1E1";
var _old_post_bgcolor  = "#e9e9e9";
var _today_post_color  = "#FF0000";
var now = new Date();  
var year = now.getYear()+1900;
var month = now.getMonth()+1;
var day = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();
var _bFORUMDISPLAY = location.href.indexOf('hi-pda.com/forum/forumdisplay.php?');
var _bVIEWTHREAD   = location.href.indexOf('hi-pda.com/forum/viewthread.php?');

// 工具函数
var JSON;
if (!JSON) {JSON = {};}
(function () {
    'use strict';
    function f(n) {return n < 10 ? '0' + n : n;}

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }

// Augment the basic prototypes if they have not already been augmented.
// These forms are obsolete. It is recommended that JSON.stringify and
// JSON.parse be used instead.

    if (!Object.prototype.toJSONString) {
        Object.prototype.toJSONString = function (filter) {
            return JSON.stringify(this, filter);
        };
        Object.prototype.parseJSON = function (filter) {
            return JSON.parse(this, filter);
        };
    }
}());
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
function getNowTimeStamp(){    // 当前时刻 yyyy-m-d h:m:s
  var nowtime = new Date(); 
  var timestamp =(nowtime.getYear()+1900)+'-'+(nowtime.getMonth()+1)+'-'+nowtime.getDate()+' '+checkTime(nowtime.getHours())+':'+checkTime(nowtime.getMinutes())+':'+checkTime(nowtime.getSeconds());
  return timestamp;
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
function checkTime(i){         // 一位数的时间前加0
  if (i<10) 
    {i="0" + i}
    return i
}
function getKeys(e){           // keycode 转换
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
// 触发函数
function onToggleBlackList(e){// 黑名单[名字]触发
    var v = e.target.value;
    var bShow = e.target.checked;
    if(_bVIEWTHREAD>0){
        var s = document.evaluate("//div[@class='postinfo']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = s.snapshotLength - 1; i >= 0; i--) {
            var t = s.snapshotItem(i);
            var a = t.getElementsByTagName('a')[0];
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
function onBlockUser(e){      // [屏蔽] 按钮触发
    var a = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('postinfo')[0].getElementsByTagName('a')[0];
    var nm= a.text;
    var id= a.href.substring(a.href.indexOf('uid')+4);
    if(blacklistStr.indexOf(id+'='+nm)<0){//检查有没有重复的
      blacklistArray.push(id+'='+nm);
      blacklistStr = blacklistArray.toString();
      GM_setValue('HiPDA_Discovery_BLACK_LIST',blacklistArray.join());
      blacklistLen=blacklistArray.length;
    }
    _syn_modified = true;
    GM_setValue("HiPDA_Discovery_SYN_MODIFIED",_syn_modified);
    // 重新激活同步按钮
    document.getElementById('s_syn').className="enable";
    document.getElementById('s_syn').innerHTML="₪ 同步";
    document.getElementById('s_syn').style.background='#eef9eb';
    document.getElementById('s_syn').style.color='#000';
    refreshConfigDiv();
    processBlackList();
};
function onWindowResize(){    // 调整body宽度
  // alert('resize');
  if(_simple_style){
    if(window.innerWidth>1600)
      GM_addStyle("body {width:65%;}"); 
    else if(window.innerWidth>1400)
      GM_addStyle("body {width:75%;}"); 
    else if(window.innerWidth>1200)
      GM_addStyle("body {width:85%;}");
    else
      GM_addStyle("body {width:980px;}");
  }
}
function onAttachImageLoaded(){  // 附件图片加载完成后修改宽度
  var newimg = new Image();
  newimg.src =this.src;
  if(newimg.width<=_att_max_width ){
    this.width=newimg.width;
    //去除zoom
    this.removeAttribute('onclick');
    this.className="nozoom";
  }
  else
    this.width=_att_max_width;
}
function onLoadNewPage(req){  // 后台读取页面完毕
  try {
    if (req.status == 200) {
      var newPageHTML = req.responseText.substring(req.responseText.indexOf('<table summary="forum_'),req.responseText.indexOf('</form>'));
      var newPageThread= newPageHTML.substring(newPageHTML.indexOf('<tbody id="normalthread_'),newPageHTML.indexOf('</table>'));
      var threadList = document.getElementsByName("moderate")[0].getElementsByClassName("datatable")[0];
      // 增加预取了页面的提示
      // var newpagetip="<tbody><tr><td class='folder'></td><td><center>---------- 第"+_pc+"页 ----------</center></td><th class='subject'>&nbsp</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody>";
      var newpagetip="<tbody><tr><td colspan=5><center>---------- 第"+_pc+"页 ----------</center></td></tr></tbody>";
      threadList.innerHTML = threadList.innerHTML + newpagetip + newPageThread;
      
      // 去除预取页面对应的选择导航按钮
      var pagenav=document.evaluate("//div[@class='pages']//a", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for(var btncnt=pagenav.snapshotLength-1;btncnt>=0;btncnt--){
        var btn=pagenav.snapshotItem(btncnt);
        if(btn.text == _pc)btn.parentNode.removeChild(btn);
      }
    }
  } catch (e) {}
  refreshMinTime();
  _max_read_pages--;
  if( _max_read_pages && (timeDiff(_pmt,_lvt))){
    _pc++;
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://'+document.domain+'/forum/forumdisplay.php?fid='+_fid+'&page='+_pc,
        onload: onLoadNewPage,
        overrideMimeType: "text/html; charset=gbk"
    });
  }
  processHighlightColor();
  processBlackList();
}
function onSynReply(req){     // 同步时，服务器返回结果
  document.getElementById('s_syn').className="disabled";
  // try {
    _syn_pending=false;
    if (req.status == 200) {  // 200 OK
      var response=JSON.parse(req.responseText);
      // alert(response.list); // 输出中文，不乱码
      //  response.result
      //          .version
      //          .list 
      var nowtimestamp=getNowTimeStamp();
      switch(response.result){
        case "0": // 无更新
          document.getElementById('s_syn').style.background='#88ff88';
          document.getElementById('s_syn').innerHTML="√ 无更新";
          GM_setValue('HiPDA_Discovery_SYN_LASTTIME',nowtimestamp);
          break;
        case "1": // OK，本地覆盖了服务器，返回新的版本号
          _syn_lastversion = response.version;
          _syn_modified = false;
          GM_setValue("HiPDA_Discovery_SYN_LASTVERSION",_syn_lastversion);
          GM_setValue("HiPDA_Discovery_SYN_MODIFIED",_syn_modified);
          document.getElementById('s_syn').style.background='#88ff88';
          document.getElementById('s_syn').innerHTML="√ 已同步";
          GM_setValue('HiPDA_Discovery_SYN_LASTTIME',nowtimestamp);
          break;
        case "2": // 服务器有更高版本覆盖本地列表
          var newblacklistArray = new Array();
          if( response.list )
            newblacklistArray = response.list.split(",");
          GM_setValue("HiPDA_Discovery_BLACK_LIST",newblacklistArray.join());
          _syn_lastversion = response.version;
          GM_setValue("HiPDA_Discovery_SYN_LASTVERSION",_syn_lastversion);
          _syn_modified = false;
          GM_setValue("HiPDA_Discovery_SYN_MODIFIED",_syn_modified);
          document.getElementById('s_syn').style.background='#88ff88';
          document.getElementById('s_syn').innerHTML="√ 已更新";
          GM_setValue('HiPDA_Discovery_SYN_LASTTIME',nowtimestamp);
          break;
        case "3": // 冲突 TODO
          serverBlacklist = new Array();
          if( response.list )
            serverBlacklist = response.list.split(",");
          serverListStr = serverBlacklist.join();
          document.getElementById('s_syn').addEventListener('click', processConflict, false);
          serverVersion = response.version;
          _syn_pending = true;
          processConflict();          
          document.getElementById('s_syn').style.background='#f00';
          document.getElementById('s_syn').style.color='#fff';
          document.getElementById('s_syn').innerHTML="! 有冲突";
          document.getElementById('s_syn').title="版本有冲突";
          break;
        case "4": // 参数错误
          document.getElementById('s_syn').style.background='#f00';
          document.getElementById('s_syn').style.color='#fff';
          document.getElementById('s_syn').innerHTML="X 参数错误";
          document.getElementById('s_syn').title=response.list;
          break;
        case "5": // 频繁刷新
          document.getElementById('s_syn').style.background='#f00';
          document.getElementById('s_syn').style.color='#fff';
          document.getElementById('s_syn').innerHTML="服务器忙";
          document.getElementById('s_syn').title="限定10s一次";
          break;
        case "500": // 服务器错误
          document.getElementById('s_syn').style.background='#f00';
          document.getElementById('s_syn').style.color='#fff';
          document.getElementById('s_syn').innerHTML="服务器错误";
          break;
        default:
          document.getElementById('s_syn').innerHTML="! 未知错误";
      }
      refreshConfigDiv();
    }
    else {                    // 500,404,443,...
      document.getElementById('s_syn').style.background='#f00';
      document.getElementById('s_syn').style.color='#fff';
      document.getElementById('s_syn').innerHTML="X 网络错误";
    }
  // }
  // catch (e) {
    // document.getElementById('s_syn').style.background='#f00';
    // document.getElementById('s_syn').style.color='#fff';
    // document.getElementById('s_syn').innerHTML="! 格式错误";
  // }
}
function onSynChooseBtn(choose){ // 同步冲突界面选择按钮
  var nowtimestamp=getNowTimeStamp();
  switch (choose){
    case 0: // 使用 新列表
      // 把配置界面显示出来，等待服务器回应
      document.getElementById('hp_cfg_div').style.display = "";
      document.getElementById('s_syn').style.background='#999';
      document.getElementById('s_syn').innerHTML="同步中...";
      // _syn_pending=false;
      
      // 获取新列表
      var r = document.getElementsByClassName('hpdtool_syn_chk_new');
      for (var i = r.length-1; i >= 0; i--)
        if(r[i].checked)
          newBlacklist.push(r[i].value);
      // 存储新列表，服务器的版本号，标志已修改
      GM_setValue("HiPDA_Discovery_BLACK_LIST",newBlacklist.join());
      _syn_lastversion = serverVersion;
      GM_setValue("HiPDA_Discovery_SYN_LASTVERSION",_syn_lastversion);
      _syn_modified = true;
      GM_setValue("HiPDA_Discovery_SYN_MODIFIED",_syn_modified);
      GM_setValue('HiPDA_Discovery_SYN_LASTTIME',nowtimestamp);
      document.getElementById('s_syn').removeEventListener('click', processConflict, false);
      // 向服务器发起请求
      var data={
        "uid":_uid,
        "lastversion":_syn_lastversion,
        "modified":_syn_modified,
        "action":"update",
        "blacklist":newBlacklist
      };
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://hipdatool.sinaapp.com/sync.php?data='+JSON.stringify(data),
        onload: onSynReply,
        overrideMimeType: "text/html; charset=gbk"
      });
      break;
    case 1: // 使用 服务器
      GM_setValue("HiPDA_Discovery_BLACK_LIST",serverBlacklist.join());
      _syn_lastversion = serverVersion;
      GM_setValue("HiPDA_Discovery_SYN_LASTVERSION",_syn_lastversion);
      _syn_modified = false;
      GM_setValue("HiPDA_Discovery_SYN_MODIFIED",_syn_modified);
      document.getElementById('s_syn').style.background='#88ff88';
      document.getElementById('s_syn').innerHTML="√ 已更新";
      GM_setValue('HiPDA_Discovery_SYN_LASTTIME',nowtimestamp);
      refreshConfigDiv();
      document.getElementById('hp_cfg_div').style.display = "";
      document.getElementById('s_syn').removeEventListener('click', processConflict, false);
      _syn_pending=false;
      break;
    case 2: // 使用 本地
      // 把配置界面显示出来，等待服务器回应
      document.getElementById('hp_cfg_div').style.display = "";
      document.getElementById('s_syn').style.background='#999';
      document.getElementById('s_syn').innerHTML="同步中...";
      // _syn_pending=false;
      
      // 向服务器发起请求
      var data={
        "uid":_uid,
        "lastversion":_syn_lastversion,
        "modified":_syn_modified,
        "action":"update",
        "blacklist":blacklistArray
      };
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://hipdatool.sinaapp.com/sync.php?data='+JSON.stringify(data),
        onload: onSynReply,
        overrideMimeType: "text/html; charset=gbk"
      });
      document.getElementById('s_syn').removeEventListener('click', processConflict, false);
      break;
    default:
      _syn_pending=false;
  }
  document.getElementById('hpdtool_syn_list').innerHTML="";
  document.getElementById('hpdtool_syn_div').style.display = 'none';
}
function onClickSynBtn(){     // 点击同步按钮
  if(_syn_pending)return;
  if(_uid == 0) return;
  if(document.getElementById('s_syn').className=="disabled")return;
  _syn_pending=true;
  document.getElementById('s_syn').style.background='#999';
  document.getElementById('s_syn').innerHTML="同步中...";
  var data={
    "uid":_uid,
    "lastversion":_syn_lastversion,
    "modified":_syn_modified,
    "action":"sync",
    "blacklist":blacklistArray
  };
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://hipdatool.sinaapp.com/sync.php?data='+JSON.stringify(data),
    onload: onSynReply,
    overrideMimeType: "text/html; charset=gbk"
  });
}
function onPageUnload(){      // 关闭页面时保存参数
    _lvt = year + "-" + month + "-" + day + " " + hour + ":" + min;
    if((_pc == 1)&&(timeDiff(_lvt,_pxt)))
      GM_setValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid,_lvt);
}
function onSaveConfig(save){  // [保存]、[取消]按钮触发，保存hpd-tool参数以及黑名单编辑结果
    if(save){
        var r = document.getElementsByClassName('bl_chk');
        blacklistArray = new Array();
        for (var i = r.length-1; i >= 0; i--)
          if(r[i].checked)
            blacklistArray.push(r[i].value);
        GM_setValue('HiPDA_Discovery_BLACK_LIST',blacklistArray.join());
        if(blacklistLen != blacklistArray.length){ // 列表长度变化，表示列表进行了修改
          _syn_modified = true;
          GM_setValue("HiPDA_Discovery_SYN_MODIFIED",_syn_modified);
          // 重新激活同步按钮
          document.getElementById('s_syn').className="enable";
          document.getElementById('s_syn').innerHTML="₪ 同步";
          document.getElementById('s_syn').style.background='#eef9eb';
          document.getElementById('s_syn').style.color='#000';
        }
        blacklistLen=blacklistArray.length;
        blacklistStr=blacklistArray.toString();
        
        var temp = document.getElementById('_chk_hightlight_color').value;
        if(RegExp("#[A-F,a-f,0-9]{6}").test(temp)){
          var t = temp.indexOf("#");
          _hightlight_color = temp.substr(t,7);
        }/*else alert('wrong color');
        alert(_hightlight_color);*/
        GM_setValue("HiPDA_Discovery_HIGHLIGHT_COLOR",_hightlight_color);

        var rd=document.getElementsByName('_radio_font_size');
        for(var i=0;i<rd.length;i++)
          if(rd[i].checked)_font_size = rd[i].value;
        GM_setValue("HiPDA_Discovery_FONT_SIZE",_font_size);
                
        // _hightlight_en = document.getElementById('_chk_hightlight_en').checked;
        // _blacklist_en_hpd = document.getElementById('_chk_blacklist_en_hpd').checked;
        // _blacklist_en_other = document.getElementById('_chk_blacklist_en_other').checked;
        // _simple_style = document.getElementById('_chk_simple_style').checked;
        // _hover_style = document.getElementById('_chk_hover_style').checked;         
        // _reply_avatar = document.getElementById('_chk_reply_avatar').checked;         
        _hightlight_en = document.getElementById('_chk_hightlight_en').checked;
        _blacklist_en_hpd = document.getElementById('_chk_blacklist_en_hpd').checked;
        _blacklist_en_other = document.getElementById('_chk_blacklist_en_other').checked;
        _simple_style = document.getElementById('_chk_simple_style').checked;
        _hover_style = document.getElementById('_chk_hover_style').checked;
        _reply_avatar = document.getElementById('_chk_reply_avatar').checked;
        GM_setValue("HiPDA_Discovery_HIGHLIGHT_ENABLE",_hightlight_en);
        GM_setValue("HiPDA_Discovery_BLACKLIST_ENABLE_HPD",_blacklist_en_hpd);
        GM_setValue("HiPDA_Discovery_BLACKLIST_ENABLE_OTHER",_blacklist_en_other);
        GM_setValue("HiPDA_Discovery_SIMPLE_STYLE",_simple_style);
        GM_setValue("HiPDA_Discovery_HOVER_STYLE",_hover_style);
        GM_setValue("HiPDA_Discovery_REPLY_AVATAR",_reply_avatar);
    }
    document.getElementById('hp_cfg_div').style.display = (document.getElementById('hp_cfg_div').style.display == 'none')?'':'none';
    changeFontSize(true);
    processBlackList();
};
// 论坛信息
function readPageURL(){       // 取得当前的tid和page值
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
function refreshMinTime(){    // 取得当前页面的 _pmt —— 包含预读取的后续页面内容
  var snapResults3 = document.evaluate("//td [@class='lastpost']", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = snapResults3.snapshotLength - 1; i >= 0; i--){
    var e = snapResults3.snapshotItem(i);
    //如果是置顶帖子，就不要取时间值
    var checkTop = e.parentNode.getElementsByClassName('folder');
    if(checkTop[0] != undefined){
      if(checkTop[0].innerHTML.indexOf('images/default/pin')<0 && checkTop[0].innerHTML.indexOf('images/default/folder_lock')<0 ){
        var _rt = e.getElementsByTagName('a')[1].text;
        if(timeDiff(_pmt,_rt))
          _pmt = _rt;
      }
      //else alert(e.getElementsByTagName('a')[1].text);
    }
  }
}
// 论坛界面修改
function changeURL(){         // 把cnc页面上的连接都换成cnc.hi-pda.com
  var url = document.evaluate("//a", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i = url.snapshotLength-1;i>=0;i--){
    var a=url.snapshotItem(i);
    a.href=a.href.replace(/www.hi-pda.com/,document.domain);
  };
}
function changeFontSize(save){
  var sz=_font_size;
  if(save == false){          // 即时预览，未保存字体大小
    var rd=document.getElementsByName('_radio_font_size');
    for(var i=0;i<rd.length;i++){
      if(rd[i].checked == true)
        sz=rd[i].value;
    }
  }
  var fnt=".t_msgfont,.t_msgfont td,td,th,.subject,.lastpost,.author,.nums,#newspecialtmp,#newspecial,#postreplay,.signatures,#umenu,#nav,.pages_btns,.threadtype{font-size: "+sz+"px;}";
  GM_addStyle(fnt);
  fnt = ".postauthor dt {width:"+4*sz+"px} .mainbox td.postauthor{width:180px} .forumcontrol .modaction{width:150px;}";
  GM_addStyle(fnt);
}
function changeStyle(){       // 改变页面风格
  // 好孩子看不见
  GM_addStyle(".goodboysglasses {color:red;font-size:16;border:1px solid #ff0000;padding:15px 15px 15px 52px;width:75%;margin:20px 30px}");
  GM_addStyle(".goodboysglasses {background:url(data:img/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ\
bWFnZVJlYWR5ccllPAAAAqJJREFUeNrsV09rE0EUf7s7k91tTENBQ6FYegoUJRX8AiJegt5UUKkJ\
JLd8A+9+gV5yS0KuirdC9SO0Fy8WwUuzh0hbYou20fyd9b1hdpumZbPohlzy4JHNZOb9fvN7895s\
NNd1YZamw4xtTmBOQEPn9Xr9AKthRdM0yOfzJo71poQXQ6wuVZ4Q4kOhUHhBCiwQ+IOHjyCdXoda\
rdalidMAp9iEQVi6rj/FMZsImMSI6Qasrt6GzMY9IJYRk5A7p9iEQViq/5j+GbBsE/b2duF7swmU\
CrR4hATiFJNiEwZheWeQ+QRME05OfkCxWMzi1+Oo9c/lcvfxI1WpVHYIyzNJgOTgOKh2fqAItCPE\
b6u4bcIgLO8K8BWIMcN7PFUepfWU8zGsCwJkg8EAqtXq0TTrnjBGzSfQ6XRhc/O1l4apGUlPWJcI\
EGir1UJ9BOgT8AWm7s9AgIs9zCNLQV1dB82yQNONYAJiCEa/76/1FUhiaSy+/YwJmsCg58Lpmwwc\
/TyDr/tf5ND6nbuweCsF+0tJmKQfHb3Mr/OrKTBNfIzbcCMWfD2ccwE2kt39+InaNpUsNa6dxy9f\
QSLE5SII1LauEmCM4em0wGTBIXpCAOcMhsOhV7LymcYS6nKZpAAbrwLKoU4EuIkeTCDmCjl3pGSl\
cdU6wxDgCvNyGWJQZliSgBbEfijk3HGjPSVCVoJx/fsAg9zGEnQGHGWOXev0G80Zax8XCjx7LlUI\
dJzDx/sANodDp9FY3squwVZ28g5wrlwz0lwOHcdZXnv/LpQCDcfx15PaScMw0uVyeZtzngoToN/v\
H5dKpSd4+L5JSf9jvabUu4m+otIYppLO0JvoLTX2z+u1kRQuUDsIeY6ol/6mzUS0foYvpfO/ZnMC\
sybwV4ABAEMXBDR9AlSHAAAAAElFTkSuQmCC) no-repeat 10px 5px");
  if(_simple_style){ // 启用了精简风格
    onWindowResize();
    GM_addStyle("\
      body {margin:0 auto;background:#f0f0f0;}\
      .postact {line-height:20px}\
      .postact a,body, td, input, textarea, select, button,.posterinfo em {color:#222222 !important;}\
      .postauthor em a {color:#222222}\
      .postactions {border-top:0px}\
      .postinfo {border-bottom:0px}\
      .authorinfo em {margin:0px}\
      .posterinfo {color:#ffffff}\
      .posterinfo:hover {color:#222222}\
      .posterinfo:hover a {color:#222222}\
      .posterinfo .pagecontrol {display:none}\
      .posterinfo:hover .pagecontrol {display:block}\
      .authorinfo a {color:#ffffff}\
      .authorinfo:hover a {color:#222222}\
      #header .wrap {padding:0}\
      #umenu a {margin:0 2px}\
      #umenu {position:static;float:right}\
      .threadad td.postauthor,.adcontent {background: #f0f0f0;}\
      .signatures {font-size: 13px;color:#222222;max-height:100px !important;}\
      #moderate .colplural,#moderate .icon,.datatable .icon,#forumheader {display:none}\
      #nav {color:#000000;text-indent:0px;background:none;margin-bottom:8px;}\
      #nav a,#footlink,#footlink a,#rightinfo,#rightinfo a{color:#000000}\
      .datatable .subject{padding:2px 5px;}\
      td,.subject{font:13px/1.4em;}\
    ");
  }
  changeFontSize();
  if(!_hover_style){ // 用户 注册、积分、发帖数 等显示在头像下方
    var s = document.evaluate("//td[@class='postauthor']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) {
      var userdata=s.snapshotItem(i).getElementsByTagName('dl')[0];
      if(userdata != undefined){
        userdata.style.margin="0px 10px 0px 20px";
        // 去掉了一些项目
        userdata.removeChild(userdata.lastChild);
        userdata.removeChild(userdata.lastChild);
        var regtime1=userdata.lastChild;
        userdata.removeChild(userdata.lastChild);
        var regtime2=userdata.lastChild;
        userdata.removeChild(userdata.lastChild);
        userdata.removeChild(userdata.lastChild);
        userdata.removeChild(userdata.lastChild);
        userdata.appendChild(regtime2);
        userdata.appendChild(regtime1);
        s.snapshotItem(i).appendChild(userdata);
        // 去除头像悬停菜单
        var avatar=s.snapshotItem(i).getElementsByClassName('avatar')[0];
        avatar.removeAttribute('onmouseover');
      }
    }
    GM_addStyle(".postauthor dt,.postauthor dd {color:#222222;height:1.2em;line-height:1.2em;}");
  }
  if(!_reply_avatar && _bVIEWTHREAD>0 && document.getElementById('fastpostform') )document.getElementById('fastpostform').getElementsByClassName('avatar')[0].innerHTML="";
  // 【发表回复】、【发表新帖】
  if(document.getElementById('post_reply'))    document.getElementById('post_reply').getElementsByTagName('a')[0].innerHTML="发表回复";
  if(document.getElementById('newspecial'))    document.getElementById('newspecial').innerHTML="发表新帖";
  if(document.getElementById('newspecialtmp')) document.getElementById('newspecialtmp').innerHTML="发表新帖";
  GM_addStyle("#post_reply,.forumcontrol #newspecial,.pages_btns #newspecial,.forumcontrol #newspecialtmp,.pages_btns #newspecialtmp{border:1px solid #003B54;line-height:22px;padding:2px 8px 2px 8px;float:left;margin:2px 5px 3px 5px}");

  // 顶部菜单
  if(document.getElementById('menu')){
    document.getElementById('menu').style.display='none';
    if(_uid>0){
      document.getElementById('umenu').appendChild(document.createTextNode(" | "));
      var menuitem=document.createElement('a');
      menuitem.innerHTML="搜索";
      menuitem.href='http://'+document.domain+'/forum/search.php';
      document.getElementById('umenu').appendChild(menuitem);
      
      document.getElementById('umenu').appendChild(document.createTextNode(" | "));
      menuitem=document.createElement('a');
      menuitem.innerHTML="我的主题";
      menuitem.target="_blank";
      menuitem.href='http://'+document.domain+'/forum/my.php?item=threads';
      document.getElementById('umenu').appendChild(menuitem);
      
      document.getElementById('umenu').appendChild(document.createTextNode(" "));
      menuitem=document.createElement('a');
      menuitem.innerHTML="我的回复";
      menuitem.target="_blank";
      menuitem.href='http://'+document.domain+'/forum/my.php?item=posts';
      document.getElementById('umenu').appendChild(menuitem);
      
      document.getElementById('umenu').appendChild(document.createTextNode(" "));
      menuitem=document.createElement('a');
      menuitem.innerHTML="我的收藏";
      menuitem.target="_blank";
      menuitem.href='http://'+document.domain+'/forum/my.php?item=favorites&type=thread';
      document.getElementById('umenu').appendChild(menuitem);
    }
  }
  // 下一页
  // var nextpageurl=document.getElementsByClassName('pages')[1].getElementsByClassName('next')[0];
  // if(nextpageurl != undefined){
    // GM_addStyle(".thread-follow-page{border:1px solid #f00;height:31px;line-height:31px;align:center} .thread-follow-page a:hover{text-decoration:none}.thread-follow-page a{background-color:#DFD0BD;display:block;width:100%;height:31px;}");
    // var nextpagebtn=document.createElement('div');
    // nextpagebtn.className="thread-follow-page";
    // nextpagebtn.innerHTML="<a href='"+nextpageurl.href+"'>点击显示下一页</a>"
    // var pagenav=document.getElementsByClassName('forumcontrol')[1];
    // if(pagenav != undefined){
      // document.getElementsByTagName('body')[0].appendChild(nextpagebtn);
      // document.getElementById('wrap').insertBefore(nextpagebtn,pagenav);
    // }
  // }
}
function appendControl(){     // 添加[屏蔽]按钮
  var s = document.evaluate("//div[@class='authorinfo']",
          document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = s.snapshotLength - 1; i >= 0; i--) {
    var t = s.snapshotItem(i);
      
    var a1=document.createElement('a');
    a1.innerHTML = '屏蔽';
    a1.href = '###';
    a1.addEventListener('click', onBlockUser,false);
    
    t.appendChild(document.createTextNode(" | "));
    t.appendChild(a1);
  }
};
function addConfigDiv(){      // 添加Alt+O的界面
    // 处理冲突界面
    GM_addStyle('\
      #hpdtool_syn_div { position:fixed;width:303px;bottom:20px;right:20px;font-size:13px;z-index:999;text-align:left;background-color:#9287AE;padding:15px;border:2px solid #bfbfbf;-moz-border-radius:5px;opacity:0.95;}\
      #hpdtool_syn_div hr {color: #bfbfbf;border: 1px solid;margin: 8px 0;}\
      #hpdtool_syn_div,#hpdtool_syn_div td,.hpdtool_syn_srv,.hpdtool_syn_lcl {color:#ffffff !important;}\
      #hpdtool_syn_list {margin-left:5px;max-height:600px;overflow:auto;}\
      #hpdtool_syn_div a {padding:2px 5px;-moz-border-radius: 4px;background: #eef9eb;width: 50px;border: 1px solid #aaa;}\
      #hpdtool_syn_div a:hover {border: 1px solid #aaa;background: #fff;color: #000;}\
      #hpdtool_syn_div .hpdtool_syn_new {width:45px;text-align:center;border-right:1px solid #fff;}\
      #hpdtool_syn_div .hpdtool_syn_srv {width:78px;max-width:78px;text-align:center;border-right:1px solid #fff;padding:2px 5px;}\
      #hpdtool_syn_div .hpdtool_syn_lcl {width:78px;max-width:78px;text-align:center;padding:2px 5px;}\
      ');
    var hpdtool_syn = document.createElement("div");
    hpdtool_syn.id = "hpdtool_syn_div";
    hpdtool_syn.style.display = "none";
    hpdtool_syn.innerHTML = "<div class='locker'><center><font face='Impact' size=3>同步冲突处理</font></center><hr>\
      本地与服务器黑名单差异部分，<b>相同部分已省略</b>。请点选对应的列表进行同步。\
      <div id='hpdtool_syn_list'></div><br />\
      <a href='javascript:void(0)' id='hpdtool_use_new' >新列表</a>\
      <a href='javascript:void(0)' id='hpdtool_use_server' >服务器列表</a>\
      &nbsp;&nbsp;<a href='javascript:void(0)' id='hpdtool_use_local' >本地列表</a>\
      &nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' id='hpdtool_use_nothing' >保持不变</a></div>";
    document.getElementsByTagName('body')[0].appendChild(hpdtool_syn);
    document.getElementById('hpdtool_use_new').addEventListener('click', function(){onSynChooseBtn(0);}, false);
    document.getElementById('hpdtool_use_server').addEventListener('click', function(){onSynChooseBtn(1);}, false);
    document.getElementById('hpdtool_use_local').addEventListener('click', function(){onSynChooseBtn(2);}, false);
    document.getElementById('hpdtool_use_nothing').addEventListener('click', function(){onSynChooseBtn(3);}, false);
    
    // Alt+O 控制界面
    GM_addStyle('\
      #hp_cfg_div {position:fixed;align:center;width: 303px;padding: 15px;bottom:20px;right:20px;z-index:99;color:#fff;background:#9287AE;border:2px solid #bfbfbf;-moz-border-radius:5px;opacity:0.95;text-align:left;font-size:14px !important;}\
      #hp_cfg_div input {height: 12px}\
      #s_syn {display: none}\
      #hp_cfg_div hr {color: #bfbfbf;border: 1px solid;margin: 8px 0;}\
      #hp_cfg_div a {-moz-border-radius: 4px;background: #eef9eb;width: 50px;border: 1px solid #aaa;}\
      #hp_cfg_div a:hover {border: 1px solid #aaa;background: #fff;color: #000;}\
      #s_ok,#s_cl,#s_syn {padding:2px 5px;}\
      #blacklist {margin-left:5px;max-height:600px;overflow:auto;}\
      #_chk_hightlight_color {margin-left:4px;}\
    ');
    var hp_cfg = document.createElement("div");
    hp_cfg.id = "hp_cfg_div";
    hp_cfg.style.display = "none";
    hp_cfg.innerHTML = '<center><font face="Impact" size=3 title="来自D版带着爱">hi-pda &hearts; tool</font> <sub>version 5.2</sub></center><hr />\
        字体大小：\
        <input type="radio" id="_font_size_13px" name="_radio_font_size" value="13" /><font size=2>小</font>\
        <input type="radio" id="_font_size_14px" name="_radio_font_size" value="14" /><font size=3>中</font>\
        <input type="radio" id="_font_size_16px" name="_radio_font_size" value="16" /><font size=4.5>大</font>\
        <br />\
        界面风格：\
        <cite title="精简界面风格" ><input type="checkbox" id="_chk_simple_style" />简版</cite>\
        <cite title="用户信息显示在悬浮菜单，不选则显示在头像下方" ><input type="checkbox" id="_chk_hover_style" />头像菜单</cite>\
        <cite title="回帖时显示自己头像" ><input type="checkbox" id="_chk_reply_avatar" />回帖头像</cite>\
        <br />\
        新帖高亮：\
        <input id="_chk_hightlight_en" type="checkbox" />启用\
        <input id="_chk_hightlight_color" type="text" style="width:65px;height:18px;" title="HTML颜色代码，&#13;输入无效代码将使用原来的设置" value="未定义"/><br />\
        屏蔽用户：\
        <input id="_chk_blacklist_en_hpd" type="checkbox" />Ｄ版\
        <input id="_chk_blacklist_en_other" type="checkbox" />其他\
        <br />\
        <div id="blacklist"></div><br /><br />\
        <div align="center">\
            <a href="javascript:void(0)" id="s_ok" >√ 确定</a>\
            &nbsp;\
            <a href="javascript:void(0)" id="s_cl" >X 取消</a>\
            &nbsp;&nbsp;&nbsp;&nbsp;\
            <a href="javascript:void(0)" id="s_syn" >₪ 同步</a>\
            <br />\
        </div>\
        ';
    document.getElementsByTagName('body')[0].appendChild(hp_cfg);
    if(_uid == 0){
      document.getElementById('s_syn').innerHTML="未登录";
      document.getElementById('s_syn').href="http://"+document.domain+"/forum/logging.php?action=login";
    }
    document.getElementById('s_ok').addEventListener('click', function(){onSaveConfig(true);}, false);
    document.getElementById('s_cl').addEventListener('click', function(){onSaveConfig(false);}, false);
    document.getElementById('s_syn').addEventListener('click', function(){onClickSynBtn(false);}, false);
    document.getElementById('_font_size_13px').addEventListener('click', function(){changeFontSize(false);}, false);
    document.getElementById('_font_size_14px').addEventListener('click', function(){changeFontSize(false);}, false);
    document.getElementById('_font_size_16px').addEventListener('click', function(){changeFontSize(false);}, false);
    addHotKey('alt+O',function(){if(_syn_pending)return;refreshConfigDiv();onSaveConfig(false); });
    addHotKey('Esc',function(){if(_syn_pending)return;else document.getElementById('hp_cfg_div').style.display = 'none'});
}
function readConfig(){
  grave_image="url(data:img/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAJYAAACECAYAAAEFGOLkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ\
bWFnZVJlYWR5ccllPAAAA1xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp\
bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6\
eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz\
NDM0MiwgMjAxMC8wMS8xMC0xODowNjo0MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo\
dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw\
dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEu\
MC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVz\
b3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1N\
Ok9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTIxRTYyMzYxMjZFMTExOTA1MkM0NDMxNTJG\
QzY0QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNUI0ODYyNDI2NjgxMUUxOEFEMkMyMzg3\
QkVENjI2OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNUI0ODYyMzI2NjgxMUUxOEFEMkMy\
Mzg3QkVENjI2OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1Ij4gPHhtcE1N\
OkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDEyMUU2MjM2MTI2RTExMTkw\
NTJDNDQzMTUyRkM2NEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDEyMUU2MjM2MTI2RTEx\
MTkwNTJDNDQzMTUyRkM2NEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94Onht\
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) no-repeat 90% 95%";

  _hightlight_en = GM_getValue('HiPDA_Discovery_HIGHLIGHT_ENABLE');
  if(_hightlight_en == undefined)_hightlight_en = false;
  if(_hightlight_en == "false" || !_hightlight_en) _hightlight_en = false;
  else                           _hightlight_en = true;
  
  _blacklist_en_hpd = GM_getValue('HiPDA_Discovery_BLACKLIST_ENABLE_HPD');
  if(_blacklist_en_hpd == undefined)_blacklist_en_hpd = true;
  if(_blacklist_en_hpd == "false" || !_blacklist_en_hpd) _blacklist_en_hpd = false;
  else                              _blacklist_en_hpd = true;
  
  _blacklist_en_other = GM_getValue('HiPDA_Discovery_BLACKLIST_ENABLE_OTHER');
  if(_blacklist_en_other == undefined)_blacklist_en_other = true;
  if(_blacklist_en_other == "false" || !_blacklist_en_other) _blacklist_en_other = false;
  else                                _blacklist_en_other = true;
  
  _simple_style = GM_getValue('HiPDA_Discovery_SIMPLE_STYLE');
  if(_simple_style == undefined)_simple_style = true;
  if(_simple_style == "false" || !_simple_style) _simple_style = false;
  else                          _simple_style = true;
  
  _hover_style = GM_getValue('HiPDA_Discovery_HOVER_STYLE');
  if(_hover_style == undefined)_hover_style = false;
  if(_hover_style == "false" || !_hover_style) _hover_style = false;
  else                         _hover_style = true;
  
  _reply_avatar = GM_getValue('HiPDA_Discovery_REPLY_AVATAR');
  if(_reply_avatar == undefined)_reply_avatar = false;
  if(_reply_avatar == "false" || !_reply_avatar ) _reply_avatar = false;
  else                          _reply_avatar = true;
  
  _syn_modified = GM_getValue('HiPDA_Discovery_SYN_MODIFIED');
  if(_syn_modified == undefined)_syn_modified = false;
  if(_syn_modified == "false" || !_syn_modified) _syn_modified = false;
  else                          _syn_modified = true;
  
  _hightlight_color = GM_getValue('HiPDA_Discovery_HIGHLIGHT_COLOR');
  if(_hightlight_color == undefined)_hightlight_color = "#F0E68C";
  
  _font_size = GM_getValue('HiPDA_Discovery_FONT_SIZE');
  if(_font_size == undefined)_font_size = '13';
  _syn_lastversion = GM_getValue('HiPDA_Discovery_SYN_LASTVERSION');
  if(_syn_lastversion == undefined)_syn_lastversion = 0;
  
  var b = GM_getValue('HiPDA_Discovery_BLACK_LIST');
  if(b == undefined)b='';
  blacklistArray = '';
  if(b.length)blacklistArray = b.split(",");
  else blacklistArray = new Array();
  blacklistLen=blacklistArray.length;
  blacklistStr=blacklistArray.toString();

  try{ // 取得当前登录用户 uid
    var c = document.getElementById('umenu').getElementsByTagName('cite')[0].getElementsByTagName('a')[0].href;
    _uid = c.substr(c.indexOf("uid=")+4);
    if(c.indexOf("&")>0)
    _uid = c.substr(0,c.indexOf("&"));
  }catch (e) {_uid = 0;}

  _today = year + "-" + month + "-" + day;
  _pxt = "1900-1-1 01:01";
  _pmt = year + "-" + month + "-" + day + " " + hour + ":" + min;
  var offset = window.location.search.indexOf("page=");
  if(offset>0){
      var t = window.location.search.substr(offset);
      if(t.indexOf("&") >0) _pc = t.slice(5,t.indexOf("&"));
      else _pc = t.slice(5);
  }
  else _pc = 1;
  offset = window.location.search.indexOf("fid=");
  if(offset>0){
    var t = window.location.search.substr(offset);
    if(t.indexOf("&") >0)_fid = t.slice(4,t.indexOf("&"));
    else _fid = t.slice(4);
  }
  else _fid = 2; // 默认D版好了
  
  _lvt = GM_getValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid);
  if(_lvt == undefined){
    _lvt = year + "-" + month + "-" + day + " " + hour + ":" + min;
    _first_time_use = true;
    GM_setValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid,_lvt);
  }
  else _first_time_use = false;
}
function refreshConfigDiv(){  // 刷新编辑黑名单的界面
  readConfig();
  document.getElementById('_chk_hightlight_color').value=_hightlight_color;
  document.getElementById('_chk_hightlight_en').checked=( !_hightlight_en || _hightlight_en=="false")?0:1;
  document.getElementById('_chk_blacklist_en_hpd').checked=( !_blacklist_en_hpd || _blacklist_en_hpd=="false")?0:1;
  document.getElementById('_chk_blacklist_en_other').checked=( !_blacklist_en_other || _blacklist_en_other=="false")?0:1;
  document.getElementById('_chk_simple_style').checked=( !_simple_style || _simple_style=="false")?0:1;
  document.getElementById('_chk_hover_style').checked=( !_hover_style || _hover_style=="false")?0:1;
  document.getElementById('_chk_reply_avatar').checked=( !_reply_avatar || _reply_avatar=="false")?0:1;
  // 被点击过以后就不必更新此按钮，直到刷新页面
  if(document.getElementById('s_syn').className != "disabled") {
    if(_uid == 0){
      document.getElementById('s_syn').innerHTML="未登录";
      document.getElementById('s_syn').href="http://"+document.domain+"/forum/logging.php?action=login";
    }
    else {
      document.getElementById('s_syn').innerHTML="₪ 同步";
      document.getElementById('s_syn').style.background='#eef9eb';
      document.getElementById('s_syn').style.color='#000';
    }
  }
  document.getElementById('s_syn').title="上次同步时间："+GM_getValue('HiPDA_Discovery_SYN_LASTTIME');
  var rd=document.getElementsByName('_radio_font_size');
  for(var i=0;i<rd.length;i++){
    if(rd[i].value == _font_size)
      rd[i].checked="true";
  }
  
  if(blacklistLen){
    document.getElementById('blacklist').innerHTML='';
    for(var i=0;i<blacklistLen;i++){
      var t = blacklistArray[i];
      var lst=document.createElement('input');
      lst.className = 'bl_chk';
      lst.value = t;
      lst.type  = 'checkbox';
      lst.checked   = true;
      lst.addEventListener('click', onToggleBlackList,false);
      var dv=document.createElement('div');
      dv.appendChild(lst);
      dv.appendChild(document.createTextNode(t.substr(t.indexOf('=')+1)));
      document.getElementById('blacklist').appendChild(dv);
    }
  }else document.getElementById('blacklist').innerHTML = '您还没有屏蔽任何用户';
}
// 功能实现
function mouseOverPost(event){
  this.style.background="";
  this.removeAttribute('onmouseover');
}
function processBlackList(){      // 屏蔽黑名单
  if( (_fid == 2)&&!_blacklist_en_hpd )return; // 当前浏览D版且未启用黑名单功能
  else if(!_blacklist_en_other)return;         // 浏览其他版块
  
  if(_bVIEWTHREAD>0){   // 帖子
      var s = document.evaluate("//div[@class='postinfo']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i = s.snapshotLength - 1; i >= 0; i--) {
          var t = s.snapshotItem(i);
          var a = t.getElementsByTagName('a')[0];
          if( a != undefined){
              var u = a.href.substring(a.href.indexOf('uid')+4);
              t.parentNode.parentNode.parentNode.parentNode.style.display=(blacklistStr.indexOf(u+'='+a.text)>=0)?'none':'';
          }
      }
      // 屏蔽 被引用 的黑名单用户发言
      s = document.evaluate("//div[@class='quote']//blockquote//font//font[@color='#999999']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i = s.snapshotLength - 1; i >= 0; i--) {
          var t = s.snapshotItem(i);
          var n=t.innerHTML.substring(0,t.innerHTML.indexOf('发表于')-1);
          if(blacklistStr.indexOf(('='+n+','))>=0)t.parentNode.parentNode.parentNode.style.display = 'none';
      }
  }
  if(_bFORUMDISPLAY>0){ // 论坛列表
    // 屏蔽BLACK_LIST的发帖
    var s = document.evaluate("//td[@class='author']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) {
      var t = s.snapshotItem(i);
      var a = t.getElementsByTagName('a')[0];
      if( a != undefined){
        var n = a.text;
        var u = a.href.substring(a.href.indexOf('uid')+4);
        if(blacklistStr.indexOf(u+'='+n)>=0)t.parentNode.parentNode.style.display='none';
        else t.parentNode.parentNode.style.display='';
      }
    }
    // 隐藏BLACK_LIST在最后回复位置的显示
    s = document.evaluate("//td[@class='lastpost']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) { 
      var t = s.snapshotItem(i);
      var a = t.getElementsByTagName('a')[1];
      if((a != undefined)&&(blacklistStr.indexOf(('='+a.text))>=0))a.innerHTML='anonymous';
    }
  }
};
function processShowHiddenText(){ // 好孩子看得见
    var s = document.evaluate("//font[\
              translate(@color,'ABCDEFGHIJKLMNOPQRSTUVWXYZ ','abcdefghijklmnopqrstuvwxyz')='white' \
              or translate(@color,'ABCDEFGHIJKLMNOPQRSTUVWXYZ ','abcdefghijklmnopqrstuvwxyz')='#ffffff'\
              or translate(@color,'ABCDEFGHIJKLMNOPQRSTUVWXYZ ','abcdefghijklmnopqrstuvwxyz')='#wheat'\
              or translate(@color,'ABCDEFGHIJKLMNOPQRSTUVWXYZ ','abcdefghijklmnopqrstuvwxyz')='#lemonchiffon']", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = s.snapshotLength - 1; i >= 0; i--) {
        var t=s.snapshotItem(i).innerHTML;
        t=t.replace(/white/i,"red");
        t=t.replace(/#ffffff/i,"red");
        t=t.replace(/wheat/i,"red");
        t=t.replace(/lemonchiffon/i,"red");
        //t=s.snapshotItem(i).innerHTML='<fieldset class="goodboysglasses"><legend>好孩子看不见</legend>'+t+'</fieldset>';
        t=s.snapshotItem(i).innerHTML='<div class="goodboysglasses" title="好孩子看不见">'+t+'</div>';
    }
};
function processHighlightColor(){ // 对帖子进行高亮
  if( !_hightlight_en ){  // 如果不启用高亮就把这次页面打开的时刻写进去
    if( 1 == _pc )
      GM_setValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid,year + "-" + month + "-" + day + " " + hour + ":" + min)
    return;
  }
  
  if(_bFORUMDISPLAY>0){
  // 遍历页面中的帖子列表，将所有“最后回复时间”大于 _lvt 的帖子背景色换成 _hightlight_color
  // 这里没有排除置顶帖子
  var f = document.evaluate("//td[@class='lastpost']", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = f.snapshotLength - 1; i >= 0; i--){
    var e = f.snapshotItem(i);
        var a = e.getElementsByTagName('a')[1];
        if( a != undefined){
            var _rt = a.text;
            if (timeDiff(_rt,_lvt)){
                e.parentNode.style.background=_hightlight_color;
                e.parentNode.addEventListener('mouseover',mouseOverPost,false);
                }
            if(timeDiff(_rt,_pxt))_pxt = _rt;
            if(timeDiff(_pxt,_lvt)) GM_setValue("HiPDA_Discovery_LAST_VISIT_TIME"+_fid,_pxt);
        }
  }
  // 将发帖日期超过30天的帖子里发帖人单元格背景换成 _old_post_bgcolor :灰色
  // 将当天发布的帖子里发帖日期颜色变成 _today_post_color :红色
  var snapResults = document.evaluate("//td [@class='author']", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
    var e = snapResults.snapshotItem(i).getElementsByTagName('em')[0];
    if(e != undefined){
      var dd = dateDiff(e.innerHTML,_today);
      if (dd >= 30) {
        if (e.parentNode.parentNode.innerHTML.indexOf("images/default/pin")==-1 && e.parentNode.parentNode.innerHTML.indexOf('images/default/folder_lock')==-1 ){
          e.parentNode.parentNode.style.background=_old_post_bgcolor;
          e.parentNode.parentNode.removeEventListener('mouseover',mouseOverPost,false);
        }
      }
      if (dd == 0) {
        if (e.parentNode.parentNode.innerHTML.indexOf("images/default/pin")==-1 && e.parentNode.parentNode.innerHTML.indexOf('images/default/folder_lock')==-1 )
          e.style.color=_today_post_color;
      }
    }
  }
  }
  if(_bVIEWTHREAD>0){
    var pst=document.evaluate("//div[@class='postinfo']//strong//a//em", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = pst.snapshotLength - 1; i >= 0; i--){
      if(pst.snapshotItem(i).innerHTML == 1){  // 1st floor
        var t1=pst.snapshotItem(i).parentNode.parentNode.parentNode.getElementsByClassName('authorinfo')[0].getElementsByTagName('em')[0];
        if(t1 != undefined){
          var postdate=t1.innerHTML;
          postdate = postdate.substr(4,postdate.indexOf(':')-7);
          if(dateDiff(postdate,_today) >=30)
            t1.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('defaultpost')[0].style.background=grave_image;
        }
      }
    }
  }
}
function processImageZoom(){      // 调整附件图片大小
  var imglist=document.evaluate("//img[substring(@id,1,5)='aimg_']", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = imglist.snapshotLength - 1; i >= 0; i--) 
    imglist.snapshotItem(i).addEventListener('load',onAttachImageLoaded,false);
}
function processConflict(){
  document.getElementById('hp_cfg_div').style.display = 'none';
  // 显示【勾选界面】，【服务器列表】，【本地列表】的差异换面和对应选项
  // 如果以服务器为准，则存储response的version和list即可
  // 如果以本地为准、或以新列表为准（先存储新列表），则请求action=update，等待返回结果【跳到 case 1:】
  newBlacklist = new Array();
  var listhtml="<table><tbody>";
  var i;
  for ( i in serverBlacklist ){
    var item = serverBlacklist[i];
    if(/\d+=.+/.test(item)){
      if(blacklistStr.indexOf(item)>=0){ // 服务、本地名单都有
        newBlacklist.push(item);
      }
      else{  // 服务器有，本地没有
        var n = item.substr(item.indexOf('=')+1);
        listhtml = listhtml +"<tr><td class='hpdtool_syn_new'><input class='hpdtool_syn_chk_new' type='checkbox' value='"+item+"'></td><td class='hpdtool_syn_srv' nowrap='nowrap'>"+n+"</td><td class='hpdtool_syn_lcl'>&nbsp;</td></tr>";
      }
      }
  }
  for ( i in blacklistArray ){
    var item = blacklistArray[i];
    if( /\d+=.+/.test(item) && serverListStr.indexOf( item )<0 ){ // 本地有，服务器没有
      var n = item.substr(item.indexOf('=')+1);
      listhtml = listhtml +"<tr><td class='hpdtool_syn_new'><input class='hpdtool_syn_chk_new' type='checkbox' value='"+item+"'></td><td class='hpdtool_syn_srv'>&nbsp;</td><td class='hpdtool_syn_lcl' nowrap='nowrap'>"+n+"</td></tr>";
    }
  }
  listhtml = listhtml + "</tbody></table>";
  document.getElementById('hpdtool_syn_list').innerHTML = listhtml;
  document.getElementById('hpdtool_syn_div').style.display="";
}
readConfig();
changeStyle();
changeURL();
if(_bFORUMDISPLAY>0 || _bVIEWTHREAD>0){
  addConfigDiv();
  window.addEventListener('resize',onWindowResize,false);
}
if(_bFORUMDISPLAY>0){
  window.addEventListener('unload',onPageUnload,false);
  refreshMinTime(); // 一开始就刷新一次_pmt，否则直接就取下一页了
  if(!_first_time_use && _hightlight_en){ //第一次用就不往后续读取了
    if(timeDiff(_pmt,_lvt)){
      _pc++;
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://'+document.domain+'/forum/forumdisplay.php?fid='+_fid+'&page='+_pc,
        onload: onLoadNewPage,
        overrideMimeType: "text/html; charset=gbk"
      });
    }
  }
  processHighlightColor();
  processBlackList();
}
if(_bVIEWTHREAD>0){
  appendControl();
  processBlackList();
  processHighlightColor();
  processShowHiddenText();
  _att_max_width=document.getElementsByClassName('t_msgfontfix')[0].clientWidth; // 最宽这么宽
  if(_att_max_width<10)_att_max_width=600;
  processImageZoom();
}
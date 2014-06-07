// ==UserScript==
// @name           Douban Recommend Hotkey
// @namespace      http://npchen.blogspot.com
// @description    现在可以在任何网页用热键(alt-r)推荐到豆瓣(v1.4)
// @include        *
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer
// @version        1.4
/* @reason
   v1.4  基于豆瓣的安全机制做了必要修补。脚本重新可用。
   v1.3：增加自动更新功能，推荐热键修改为alt-r
   @end*/
// ==/UserScript==

var thisScript = {
   name: "豆瓣推荐热键",
   id: "36007",
   version:"1.4"
}

var updater = new Updater(thisScript);
updater.check();   


var r = 'r'.charCodeAt(0);
document.addEventListener('keypress', keyHandler, true);

function event_clean(e) {
    var targetTag = e.target.tagName;
    var keyCode = e.which;
    return e.altKey && !e.ctrlKey && !e.metaKey &&
           targetTag != "TEXTAREA" &&
           targetTag != "INPUT" &&
           (keyCode == r);
}

var ck;

function setck(){
   var rurl = "http://www.douban.com/recommend/?url="+encodeURIComponent('http://www.douban.com/')+'&title='+encodeURIComponent('test');
   GM_xmlhttpRequest({
		method: 'GET',
		url: rurl,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) { 
				ck=responseDetails.responseText.match(/<input type=\"hidden\" name=\"ck\" value=\"([a-zA-Z0-9]{4})\"\/>/)[1];
			}	
		}
	});
}

setck();

function get_params(){
    var params = {
      uid: document.location,
      title: document.title,
      type: 'I',
      comment: window.getSelection().toString(),
    };
    return params;
}

function para2string(para){
 return 'uid='+encodeURIComponent(para.uid)+'&title='+encodeURIComponent(para.title)+'&comment='+encodeURIComponent(para.comment)+'&type=I&ck='+ck;
}

var url = window.location.href;
var in_douban = ('douban'==url.substring(11,17));

function keyHandler(e) { 
  if (!event_clean(e)) return;
  var keyCode = e.which;
 
  if (keyCode == r) {
    para = get_params();
    para.comment = window.prompt("推荐标题：\n"+para.title+"\n\n推荐附注：", para.comment);
    if (para.comment==null) return;
    GM_xmlhttpRequest({
       method: 'POST',
       headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
          'Content-type': 'application/x-www-form-urlencoded'},
       url: 'http://www.douban.com/recommend/',
       data: para2string(para),
       onload: function(responseDetails) {
                 if (responseDetails.status == 200)
                      window.status="推荐成功!";
                 else
                      window.status="推荐失败："+responseDetails.status;
                }       
       });   
    //}       
  }
}

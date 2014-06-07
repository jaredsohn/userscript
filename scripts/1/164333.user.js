// ==UserScript==
// @author      Shyangs
// @name        tieba adv search
// @description 按下百度貼吧高級搜索連結會在當前頁面浮出表單
// @namespace   http://wiki.moztw.org/%E4%BD%BF%E7%94%A8%E8%80%85:Shyangs#tieba_adv_search
// @include     http://tieba.baidu.com/*
// @include     http://jump.bdimg.com/*
// @version     0.6.1
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @updateURL   https://userscripts.org/scripts/source/164333.meta.js
// @downloadURL https://userscripts.org/scripts/source/164333.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==
let uw$ = unsafeWindow.$;
let $ = function(id) document.getElementById(id);

//如果，GM 的 "openintab" key 值 未定義(i.e.不存在)，存預設值進去，使之存在。 
let (option=GM_getValue("openintab")){
	if(typeof(option)==="undefined"){
		GM_setValue("openintab",0);
	}
}

let openLink = function(link) GM_getValue( "openintab", 0 ) ? GM_openInTab("http://"+location.hostname+link) : (location.href = link);

GM_addStyle("#tas {background-color:silver; position:fixed; top:10%; left:10%; z-index:60000; display:none;\
color:black;background: rgba(244, 244, 244,.8);\
border:1px solid rgba(184, 184, 184,.9);padding:10px;}\
#tas td{padding-right:5px;}\
#tas-close {color:red; text-align:right; font-size:150%;}");

let elmt = $('search_button_wrapper');//討厭的貼吧彩蛋排行廣告
(elmt!==null)&&elmt.parentNode.removeChild(elmt);

if( document.getElementsByClassName('senior-search-link')[0] === undefined ){
	elmt = document.getElementsByClassName('s_tools')[0];
	if(elmt!==undefined){
		elmt.insertAdjacentHTML('beforeend', '<a id="tas-a" href="#">高級搜索</a>');
	}else if(elmt=$('search_baidu_promote')){
		elmt.insertAdjacentHTML('beforebegin', '<a id="tas-a" href="#">高級搜索</a>');
	}
}

document.body.insertAdjacentHTML('beforeend', '<div id="tas">\
<p id="tas-close">ｘ</p>\
<form id="tas-f" name="f" action="/" method="get" style="margin:0;padding:0;">\
  <table style="margin-top:15px; border="0" cellpadding="0" cellspacing="0" width="100%">\
    <tbody>\
      <tr>\
        <td class="padfl padft" nowrap="" width="15%"><strong>吧名</strong></td>\
        <td class="padft" nowrap="" width="20%">只在此贴吧中搜索</td>\
        <td class="padft"><input id="tas-kw" name="kw" class="i" value="'+$("wd1").value+'" size="35" maxlength="100">\
          <input value="贴吧搜索" type="submit"> \
        </td>\
      </tr>\
      <tr>\
        <td class="padfl" height="32"><strong>关键词</strong></td>\
        <td>包含以下<b>全部</b>的关键词</td>\
        <td><input id="tas-qw" name="qw" size="35" maxlength="100" class="i"></td>\
      </tr>\
      <tr>\
        <td class="padfl padfb" nowrap=""><strong>使用者名</strong></td>\
        <td class="padfb" nowrap="">只搜索该使用者的发言</td>\
        <td class="padfb" nowrap=""><input id="tas-un" name="un" size="35" maxlength="100" class="i">&nbsp;\
          例如:贴吧开发团队\
        </td>\
      </tr>\
    </tbody>\
  </table>\
  <table style="margin:10px 0 80px 0;" border="0" cellpadding="0" cellspacing="0" width="100%">\
    <tbody>\
      <tr>\
        <td class="padfl" height="30" width="25%"><b>搜索结果排序方式</b></td>\
        <td width="30%">限定搜索结果的排序方式是</td>\
        <td>\
          <select id="tas-sm" name="sm" size="1">\
            <option value="1" selected="">按时间倒序</option>\
            <option value="0">按时间顺序</option>\
            <option value="2">按相关性排序</option>\
          </select>\
        </td>\
      </tr>\
      <tr>\
        <td class="padfl"><b>搜索结果显示条数</b></td>\
        <td>选择搜索结果显示的条数</td>\
        <td>\
          <input type="range" min="10" max="100" value="100" id="tas-rn" />\
		  <span id="tas-rv">100</span>\
        </td>\
      </tr>\
	  <tr>\
		<td class="padfl"><b>搜索结果显示在</b></td>\
		<td><input type="checkbox" checked="" id="tas-cb" /><span>新窗</span></td>\
		</td>\
      </tr>\
    </tbody>\
  </table>\
</form>\
</div>');

elmt = document.getElementById("tas-cb");
elmt.checked = GM_getValue("openintab");
elmt.addEventListener("click", function(){
	GM_setValue("openintab", this.checked?1:0);
}, false);

(function(){
	let range = $("tas-rn"),
		value=range.value; //記錄當前值
	$("tas-rv").firstChild.nodeValue = value;
  range.addEventListener("change",function(){
    if(value==range.value)return; //防止重複觸發
    $("tas-rv").firstChild.nodeValue = range.value; //TODO	
    value=range.value; //記錄當前值
  });
  //滑鼠操作相關事件處理
  range.addEventListener("mousedown",function(){
    document.addEventListener("mouseup",mouseup);
    range.addEventListener("mousemove",mousemove);
  });
  function mouseup(){
    //解除事件綁定
    document.removeEventListener("mouseup",mouseup);
    range.removeEventListener("mousemove",mousemove);
  };
  function mousemove(){
    //主動觸發Change事件
    let e=document.createEvent("Event");
    e.initEvent("change",false,true);
    range.dispatchEvent(e);
  };
})();

$("tas-f").onsubmit = function(){
	let	c = $("tas-kw").value.trim(),
		e = $("tas-qw").value.trim(),
		a = $("tas-un").value.trim(),
		d = $("tas-rn").value,
		g = $("tas-sm").value,
		b = "res";
	if (c == "" && e == "" && a == "") {
		openLink("/");
		return false;
	} else {
		if (c != "" && e == "" && a == "") {
			openLink("/f?ie=utf-8&kw=" + encodeURIComponent(c));
			return false;
		} else {
			if (!window.history_search_post) {
				uw$.tb.post("/data/searchhistory?method=add_word&ie=UTF-8", {
					word: e
				}, function (h) {
					if (h.no == 0) {
						window.history_search_post = false;
					}
				});
				window.history_search_post = true;
			}
			if (!e && a) {
				b = "ures";
			}
			setTimeout(function () {
				openLink("/f/search/" + b + "?ie=utf-8&kw=" + encodeURIComponent(c) + "&qw=" + encodeURIComponent(e) + "&rn=" + d + "&un=" + encodeURIComponent(a) + "&sm=" + g);
			}, 100);
			return false;
		}
	}
};

elmt = $("tas-a")||(function(){
	elmt = document.getElementsByClassName('senior-search-link')[0]||document.getElementsByClassName('s_tools')[0].firstElementChild;
	elmt.href='#';
	elmt.removeAttribute('target');
	return elmt;
})();
elmt.addEventListener("click", function(){
	$("tas").style.display = "block";
}, false);
$("tas-close").addEventListener("click", function(){
	$("tas").style.display = "none";
}, false);
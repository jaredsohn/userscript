// ==UserScript==
// @author      Shyangs
// @name        tieba_hide_someone_plus
// @description 百度貼吧黑名單。 移除討厭鬼的帖子。
// @namespace   http://wiki.moztw.org/%E4%BD%BF%E7%94%A8%E8%80%85:Shyangs#tieba_hide_someone_plus
// @include     http://tieba.baidu.com/*
// @include     http://jump.bdimg.com/*
// @exclude     http://tieba.baidu.com/tb*
// @exclude     http://tieba.baidu.com/f/search/*
// @exclude     http://jump.bdimg.com/tb*
// @exclude     http://jump.bdimg.com/f/search/*
// @version     0.5.9
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @updateURL   https://userscripts.org/scripts/source/163031.meta.js
// @downloadURL https://userscripts.org/scripts/source/163031.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     GPLv3; http://opensource.org/licenses/gpl-3.0.html
// ==/UserScript==

let uw$ = unsafeWindow.$;
(uw$.tools&&uw$.tools.tabs)||(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialEffect:!1,initialIndex:0,event:"click",rotate:!1,slideUpSpeed:400,slideDownSpeed:400,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call()},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){var c=this.getConf();this.getPanes().slideUp(c.slideUpSpeed),this.getPanes().eq(a).slideDown(c.slideDownSpeed,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c,d;a.tools.tabs.addEffect("horizontal",function(b,e){if(!c){var f=this.getPanes().eq(b),g=this.getCurrentPane();d||(d=this.getPanes().eq(0).width()),c=!0,f.show(),g.animate({width:0},{step:function(a){f.css("width",d-a)},complete:function(){a(this).hide(),e.call(),c=!1}}),g.length||(e.call(),c=!1)}});function e(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(d,i){var k=h.eq(d),l=!c.data("tabs");typeof d=="string"&&d.replace("#","")&&(k=h.filter("[href*=\""+d.replace("#","")+"\"]"),d=Math.max(h.index(k),0));if(e.rotate){var m=h.length-1;if(d<0)return f.click(m,i);if(d>m)return f.click(0,i)}if(!k.length){if(j>=0)return f;d=e.initialIndex,k=h.eq(d)}if(d===j)return f;i=i||a.Event(),i.type="onBeforeClick",g.trigger(i,[d]);if(!i.isDefaultPrevented()){var n=l?e.initialEffect&&e.effect||"default":e.effect;b[n].call(f,d,function(){j=d,i.type="onClick",g.trigger(i,[d])}),h.removeClass(e.current),k.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.off(e.event).removeClass(e.current),i.find("a[href^=\"#\"]").off("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).on(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=\"#\"]").on("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href=\""+location.hash+"\"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var d=this.data("tabs");d&&(d.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){d=new e(a(this),b,c),a(this).data("tabs",d)});return c.api?d:this}})(uw$);

let $ = function(id) document.getElementById(id);

let GM_sV = function(obj, name, value){
	obj[name]=value;
	GM_setValue("jStr",JSON.stringify(obj));
};

let GM_gV = function(obj, name){
	let name = JSON.parse(GM_getValue("jStr"))[name];
	return ( name ? name : "" );
};

let gbkDecode=function(str){
    let flag=0,hh;
	return str.replace(/%([0-9A-F]{2})/g, function(match,S1){
		let ll=parseInt(S1, 16);
		if(flag){
			flag=0;
			return TextDecoder("gbk").decode(Uint8Array([hh, ll]));
		}else if(129>ll){
			return TextDecoder("gbk").decode(Uint8Array([ll]));
		}else{
			hh=ll;
			flag=1;
			return "";
		}
	}); 
};
let getUserName=function(jqObj){
	let link = jqObj.find('a:first').attr("href"), match;
	if("undefined"===typeof(link)){
		return jqObj.text();
	}else if(null!==(match=link.match(/un=(.+)&/))){
		return gbkDecode(match[1]);
	}else{
		return;
	}
};
window.rmvSomeoneFilters = function(someone, target){
	let ii = someone.length,
		target = uw$(target);
	while(ii--){
		target.find('tr.thread_alt').each(function () { //舊版文章列表
			if ( getUserName(uw$(this).find('td:nth-child(4)')) === someone[ii] ) {
				this.parentNode.removeChild(this);
			}
		});
		target.find('li.j_thread_list').each(function () { //新版文章列表
			if ( getUserName(uw$(this).find('span.tb_icon_author')) === someone[ii] ) {
				this.parentNode.removeChild(this);
			}
		});
		target.find(".l_post").each(function () { //帖子内
			if (uw$(this).find('a.p_author_name').text() === someone[ii] ) {
				this.parentNode.removeChild(this);
			}
		});
		target.find(".lzl_single_post").each(function () { //樓中樓
			if (uw$(this).find('a.at').attr("username") === someone[ii] ) {
				this.parentNode.removeChild(this);
			}
		});
	}
};

window.rmvTitleFilters = function(title, target){
	let ii = title.length,
		target = uw$(target);
	while(ii--){
		target.find("#thread_list_table").find('tr').each(function () { //舊版文章列表
			let regex = new RegExp(title[ii]);
			if ( regex.test( uw$(this).find('td.thread_title>a').text() ) ) {
				this.parentNode.removeChild(this);
			}
		});
		target.find("#thread_list").find('li.j_thread_list').each(function () { //新版文章列表
			let regex = new RegExp(title[ii]);
			if ( regex.test( uw$(this).find('a.j_th_tit').attr("title") 
					+ uw$(this).find('div.threadlist_abs').text() ) ) {
				this.parentNode.removeChild(this);
			}
		});
	}
};

window.rmvContentFilters = function(content, target){
	let ii = content.length,
		target = uw$(target);
	while(ii--){
		target.find(".l_post").each(function () { //帖子内文
			let regex = new RegExp(content[ii]);
			if ( regex.test( uw$(this).find('.p_content').text() ) ) {
				this.parentNode.removeChild(this);
			}
		});
		target.find(".lzl_single_post").each(function () { //樓中樓
			let regex = new RegExp(content[ii]);
			if ( regex.test( uw$(this).find('.lzl_content_main').text() ) ) {
				this.parentNode.removeChild(this);
			}
		});
	}
};

let rmv = function(filter, target){
	let func_rmv = "rmv" + filter,
		filter = GM_gV(gObj, filter);

	window[func_rmv](filter.split("\n").filter(function(item){
		return (""!==item);//使用者因多按Enter而不小心產生的 空字串項，不是使用者想要的過濾規則。
	}), target);
};

let observer = new MutationObserver(function(mutations) {
	this.rmv = rmv;
	mutations.forEach(function(mutation) {
		this.rmv("SomeoneFilters", mutation.target );
		this.rmv("TitleFilters", mutation.target );
		this.rmv("ContentFilters", mutation.target );
	});
});

let gObj={};

//如果，GM 的 "jStr" key 值 未定義(i.e.不存在)，存預設值進去，使之存在；如果 key值存在，讀取既有資料到gObj
let (jStr=GM_getValue("jStr")){
	(typeof(jStr)==="undefined")?GM_setValue("jStr",JSON.stringify(gObj)):gObj=JSON.parse(jStr);
}

GM_addStyle("#thsp {background-color:black; position:fixed; top:0px; z-index:60000; display:none;}\
#thsp-title {color:red; text-align:center;}\
#thsp-close {color:red; text-align:right;}\
textarea.thsp-filters {width: 100%; height: 300px}\
ul.thsp-tabs {margin:0 !important;padding:0;height:30px;border-bottom:1px solid #666;} \
ul.thsp-tabs li {float:left;padding:0;margin:0;list-style-type:none;} \
ul.thsp-tabs a {float:left;font-size:13px;display:block;padding:5px 30px;text-decoration:none;border:1px solid #666;border-bottom:0px;height:18px;background-color:#efefef;color:#777;margin-right:2px;position:relative;top:1px;outline:0;-moz-border-radius:4px 4px 0 0;} \
ul.thsp-tabs a:hover {background-color:#F7F7F7;color:#333;} \
ul.thsp-tabs a.current {background-color:#ddd;border-bottom:1px solid #ddd;color:#000;cursor:default;} \
.thsp-panes div {display:none;border:1px solid #666;border-width:0 1px 1px 1px;min-height:150px;padding:15px 20px;background-color:#ddd;}");

uw$(document.body).append('<div id="thsp">\
  <p id="thsp-title">tieba_hide_someone_plus</p>\
  <ul class="thsp-tabs">\
    <li id="thsp-user"><a href="#">USER</a></li>\
    <li id="thsp-title"><a href="#">TITLE</a></li>\
	<li id="thsp-content"><a href="#">CONTENT</a></li>\
  </ul>\
  <div class="thsp-panes">\
    <div class="thsp-tabcontent"><textarea id="SomeoneFilters" class="thsp-filters"></textarea></div>\
    <div class="thsp-tabcontent"><textarea id="TitleFilters" class="thsp-filters"></textarea></div>\
	<div class="thsp-tabcontent"><textarea id="ContentFilters" class="thsp-filters"></textarea></div>\
  </div>\
  <p id="thsp-close">ＣＬＯＳＥ</p>\
</div>');

uw$(".thsp-tabs").tabs(".thsp-tabcontent", {event:"click"});//, {event:"mouseover"});//
let api = uw$(".thsp-tabs").data("tabs");
uw$(document).on("mouseover", "#thsp-user", function(){ api.click(0); });
uw$(document).on("mouseover", "#thsp-title", function(){ api.click(1); });
uw$(document).on("mouseover", "#thsp-content", function(){ api.click(2); });

$("thsp-close").addEventListener("click", function(){
	$("thsp").style.display = "none";
	GM_sV(gObj, "SomeoneFilters", $("SomeoneFilters").value);
	GM_sV(gObj, "TitleFilters", $("TitleFilters").value);
	GM_sV(gObj, "ContentFilters", $("ContentFilters").value);
	rmv("SomeoneFilters", $('container'));
	rmv("TitleFilters", $('contet_wrap'));
	rmv("ContentFilters", $('j_p_postlist'));
}, false);

GM_registerMenuCommand("tieba_hide_someone_plus",function(){
	$("SomeoneFilters").value=GM_gV(gObj, "SomeoneFilters");
	$("TitleFilters").value=GM_gV(gObj, "TitleFilters");
	$("ContentFilters").value=GM_gV(gObj, "ContentFilters");
	$("thsp").style.display = "block";
},"h");


["SomeoneFilters", "TitleFilters", "ContentFilters"].forEach(function(filter){
	rmv(filter, $('container') );
});
observer.observe($('container'), {childList: true, subtree: true});
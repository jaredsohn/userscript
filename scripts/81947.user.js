// ==UserScript==
// @name V2EXtend
// @namespace http://www.v2ex.com
// @description Extend Your Way To Explore v0.4 Rev030
// @include http://v2ex.appspot.com/*
// @include http://v2ex.com/*
// @include http://www.v2ex.com/*
// @author disinfeqt and Chris_Ys
// ==/UserScript==

var $;
var v2extend_ver = "v0.4";
var v2extend_rev = "Rev030";

// Add jQuery
(function(){
if (typeof unsafeWindow.jQuery == 'undefined') {
var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
GM_JQ = document.createElement('script');

GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
GM_JQ.async = true;

GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}
GM_wait();
})();

var new_box = '<div class="sep20"></div>';
new_box += '<div class="box"><div class="cell"><span class="fade">最近提到我的主题</span></div>';
new_box += '<div class="cell"><ul id="v2extend_mentions"></ul></div></div>';

var new_box2 = '<div class="sep20"></div>';
new_box2 += '<div class="box"><div class="cell"><span class="fade">新创建的主题</span></div>';
new_box2 += '<div class="cell"><ul id="v2extend_newposts"></ul></div></div>';

// Shorten Links after Media Preview
var shortenLinks = function(){
$('a[rel="nofollow"]').each(function() {
var temp_link = $(this).text();
if (temp_link.length > 60) {
var link = temp_link.substr(0, 60) + "...";
}
$(this).text(link).attr("title", temp_link);
});
};

var openTime;
var topicStart = false;
var checkNewTopic = function(entries){
var topics = new Array();
var entry, content, d;
if(!topicStart){
if(entries.length > 0){
openTime = new Date(entries[0].getElementsByTagName("published")[0].childNodes[0].nodeValue);
topicStart = true;
}
return false;
}
for(var i = 0, len = entries.length; i < len; i++){
entry = entries[i];
content = entry.getElementsByTagName("content")[0].childNodes[0].nodeValue;
d = new Date(entry.getElementsByTagName("published")[0].childNodes[0].nodeValue);
if(d <= openTime){break;}
topics.push({
title: entry.getElementsByTagName("title")[0].childNodes[0].nodeValue,
link: entry.getElementsByTagName("link")[0].attributes.getNamedItem("href").nodeValue,
content: content,
published: d
});
}
var topic;
if(topics.length > 0){
var newDate = topics[0].published;
if(typeof openTime != "undefined" && openTime >= newDate){return false;}
var newposts = $("#v2extend_newposts");
for(var i = 0, len = topics.length; i < len; i++){
topic = topics[i];
var div = '<li style="list-style:none;margin:0 0 5px;"><a ';
div += 'title="' + topic.title + '" ';
div += 'href="' + topic.link + '">' + topic.title + '</a></li>';
}
newposts.append(div);
var newDate = topics[0].published;
if(newDate > openTime){openTime = newDate;}
}
};

// Get mentions
var getMentions = function(){
clearInterval(timer);
GM_xmlhttpRequest({
method: 'GET',
url: 'http://v2ex.appspot.com/index.xml',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(responseDetails) {
var parser = new DOMParser();
var xml = parser.parseFromString(responseDetails.responseText, "text/xml");
var entries = xml.documentElement.getElementsByTagName("entry");
var re = new RegExp(username, "gi");
var arr = new Array();
var entry, content;
for(var i = 0, len = entries.length; i < len; i++){
entry = entries[i];
content = entry.getElementsByTagName("content")[0].childNodes[0].nodeValue;
if(re.test(content)){
arr.push({
title: entry.getElementsByTagName("title")[0].childNodes[0].nodeValue,
link: entry.getElementsByTagName("link")[0].attributes.getNamedItem("href").nodeValue,
content: content,
published: new Date(entry.getElementsByTagName("published")[0].childNodes[0].nodeValue)
});
}
}
if(arr.length > 0 && last < arr[0].published){
var $ul = $("#v2extend_mentions");
for(var i = 0, len = arr.length; i < len; i++){
if(arr[i].published <= last){
break;
}
$ul.append($('<li style="list-style:none;margin:0 0 5px;border-bottom:1px solid #E2E2E2;"><a style="font-weight:bold" href="' + arr[i].link + '">' + arr[i].title + '</a><p style="margin:5px 0 5px 0;color:#999;">' + arr[i].content + '</p></li>')).hide().delay(1).slideDown();
}
last = arr[0].published;
}
checkNewTopic(entries);
timer = setInterval(function(){getMentions();}, interval);
},
onerror: function(responseDetails){
timer = setInterval(function(){getMentions();}, interval);
}
});
};
var username, timer;
var last = new Date("1970-01-01");
var interval = 1*60*1000;
// End of Get mentions

function ajaxTweet(new_tweet) {
$.ajax({
url: "/twitter/tweet",
type: "POST",
data: {"status":new_tweet},
success: function () {
$("#Rightbar .box:eq(0) form input").val("Tweet");
$("#Rightbar .box:eq(0) form textarea.mlt").val("");
$("#Rightbar .box:eq(0) form div:eq(1)").append("<span id='tweet_status' style='float: left; line-height: 30px; color: #999;'>Your tweet has been sent.</span>")
setTimeout(function () {$("#tweet_status").fadeOut(4000)});
},
error: function () {
$("#Rightbar .box:eq(0) form div:eq(1)").append("<span id='tweet_status' style='color: red; float: left; line-height: 30px; color: #999;'>Something went wrong...</span>")
}
});
};

function V2EXtend() {

// Find Yourself
username = $("#Navigation li").find("a[href*=member]").addClass("username").text();

// Get Mentions
if (username) {
getMentions();
}

// Copyright Please
var copyright = ' | Enhanced with <a class="fixed_title" title="Extend Your Way To Explore" href="http://userscripts.org/scripts/show/81947"><strong>V2EXtend</strong></a> <small title='+ 'Current:&nbsp;' + v2extend_rev + '&nbsp;-&nbsp;Click&nbsp;to&nbsp;update&nbsp;to&nbsp;the&nbsp;latest&nbsp;version' + '>(' + '<a class="fixed_title" href="http://userscripts.org/scripts/source/81947.user.js">' + v2extend_ver + '</a>)</small> by <a href="/member/disinfeqt"><strong>disinfeqt</strong></a>'
$("#BottomMain span.fade").find("a[href*=cn.olivida.com]").after(copyright);

// External Links
$('a[href^="http://"]:not(".fixed_title")').attr({target: "_blank", title: "Open in a new window"});

// Go to bottom/top
if (document.location.href.indexOf(".com/t/") > 0) {
$("#Content .box:eq(0) .inner").after('<a class="goto_bottom" style="font-weight: bold; font-size: 10px; color: #ddd; padding: 5px 10px; display: block; text-align: right;" href="javascript:;">BOTTOM</a>');
$("#Content .box:eq(2) form").before('<a href="javascript:;" style="color: rgb(221, 221, 221); font-size: 10px; font-weight: bold; display: block; float: right; padding: 10px;" class="goto_top">TOP</a>');
};
$(".goto_bottom").live("click", function(){
$("textarea.mll").focus();
});
$(".goto_top").live("click", function(){
scroll(0, 0);
});


// Quick Reply
$(".box form span.fade").html($(".box form span.fade").html() + " (可按 ctrl + enter 快捷回复)")
$("textarea.mll").keydown(function(event){
if (event.ctrlKey && event.keyCode==13) {
$(".box form").submit();
}
});

// Reply Buttons
if (document.location.href.indexOf(".com/t/") > 0) {
var comments = $("#Content .box:eq(1) .cell table .fr small.snow");
comments.each(function () {
$(this).after(' <a class="reply_this" style="color: #bbb; margin-left: 5px; font-weight: bold; font-size: 10px;" href="javascript:;">REPLY</a>');
});
}

$(".reply_this").live("click", function(){
var reply_name = $(this).parent().parent().parent().find("strong a.dark").text();
if ($("textarea.mll").val()) {
var temp_content = $("textarea.mll").val();
$("textarea.mll").val(temp_content + "\n" + "@" + reply_name + " ").focus();
return false;
} else {
$("textarea.mll").val("@" + reply_name + " ").focus();
return false;
}
});

// Creat a new box
$("#Rightbar .box:eq(2)").after(new_box);
$("#Rightbar .box:eq(0)").after(new_box2);

// Sidebar Tweeting
$("#Rightbar .box:eq(0) form input").click(function (e) {
e.preventDefault();
var new_tweet = $("#Rightbar .box:eq(0) form textarea.mlt").val();
if (new_tweet.length >0 ) {
$("#Rightbar .box:eq(0) form input").val("Tweeting...");
ajaxTweet(new_tweet);
}
});


} // End of the V2EXtend core

// Media Preview
var TUDOU_EMBED = '<br /><br /><embed src="http://www.tudou.com/v/src_id" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" width="420" height="363"></embed>';
var XIAMI_EMBED = '<br /><br /><embed src="http://www.xiami.com/widget/0_src_id/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent"></embed>';
var YOUKU_EMBED = '<br /><br /><embed src="http://player.youku.com/player.php/sid/src_id/v.swf" quality="high" width="480" height="400" align="middle" allowScriptAccess="allways" mode="transparent" type="application/x-shockwave-flash"></embed>';
var EMBED_FRAME = '';

var getFlashReg = function(sSite){
switch (sSite) {
case 'xiami':
EMBED_FRAME = XIAMI_EMBED;
return /[\S]+\.xiami\.com\/song\/([\d]+)[\S]*/i;
break;
case 'tudou':
EMBED_FRAME = TUDOU_EMBED;
return /[\S]+.tudou.[\S]+\/([\w-]+)[\S]*/i;
break;
default:
return null;
}
}
var previewFlash = function (obj) {
var reg = /http:\/\/[\w]+\.([\w]+)\.[\w]+/i;
var embed = "";
if (reg.exec(obj.text().toLowerCase()) !== null) {
var re = getFlashReg(RegExp.$1);
if (re !== null) {
if (re.exec(obj.text()) !== null) {
embed = EMBED_FRAME.replace(/src_id/, RegExp.$1);
$(obj).before(embed).css({"color":"#999", "display":"block"});
}
}
}
}
// Image preview
function get_img_processor(type) {

if (type.indexOf('phodroid.com') == 0) { //ugly fix for bloody Phodroid (which's the worst image hosting service ON EARTH) by @luosheng
return {
reg: /^http:\/\/(?:www\.)?phodroid\.com\/([\d\w\/]+)/,
func: function (url_key, url_elem) {
var src = "http://phodroid.s3.amazonaws.com/" + url_key[1] + ".jpg";
append_image(src, url_elem);
}
};
}
switch (type) {
case "twitgoo.com":
proc = {
reg: /^http:\/\/(?:www\.)?twitgoo\.com\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://zdxproxy.appspot.com/twitgoo.com/show/thumb/" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "yfrog.com":
proc = {
reg: /^http:\/\/(?:www\.)?yfrog\.com\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = url_key[0] + ".th.jpg";
append_image(src, url_elem);
}
};
return proc;
case "twitpic.com":
proc = {
reg: /^http:\/\/(?:www\.)?twitpic\.com\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://zdxproxy.appspot.com/twitpic.com/show/thumb/" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "img.ly":
proc = {
reg: /^http?:\/\/(?:www\.)?img\.ly\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://img.ly/show/thumb/" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "ow.ly":
proc = {
reg: /^http:\/\/(?:www\.)?ow\.ly\/i\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://static.ow.ly/photos/thumb/" + url_key[1] + ".jpg";
append_image(src, url_elem);
}
};
return proc;
case "pic.gd":
proc = {
reg: /^http:\/\/(?:www\.)?pic\.gd\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://zdxproxy.appspot.com/www.TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=" + url_key[0];
append_image(src, url_elem);
}
};
return proc;
case "tweetphoto.com":
proc = {
reg: /^http:\/\/(?:www\.)?tweetphoto\.com\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://zdxproxy.appspot.com/www.TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=" + url_key[0];
append_image(src, url_elem);
}
};
return proc;
case "ts1.in":
proc = {
reg: /^http:\/\/(?:www\.)?ts1\.in\/(\d+)/,
func: function (url_key, url_elem) {
var src = "http://ts1.in/thumb/" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "hellotxt.com":
proc = {
reg: /^http:\/\/(?:www\.)?hellotxt.com\/i\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://hellotxt.com/image/" + url_key[1] + ".s.jpg"
append_image(src, url_elem);
}
};
return proc;
case "twitxr.com":
proc = {
reg: /^http:\/\/(?:www\.)?twitxr.com\/[^ ]+\/updates\/([\d]+)/,
func: function (url_key, url_elem) {
var src = 'http://twitxr.com/thumbnails/' + url_key[1].substr(-2, 2) + '/' + url_key[1] + '_th.jpg';
append_image(src, url_elem);
}
};
return proc;
case "moby.to":
proc = {
reg: /^(http:\/\/(?:www\.)?moby\.to\/[A-Za-z0-9]+)/,
func: function (url_key, url_elem) {
var src = "http://api.mobypicture.com?s=small&format=plain&k=OozRuDDauQlucrZ3&t=" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "grab.by":
proc = {
reg: /^(http:\/\/(?:www\.)?grab\.by\/[A-Za-z0-9]+)/,
func: function (url_key, url_elem) {
var src = url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "sf.gs":
proc = {
reg: /^http:\/\/(?:www\.)?sf\.gs\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://sf.gs/thumb/" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "flic.kr":
proc = {
reg: /^http:\/\/(?:www\.)?flic\.kr\/p\/([A-Za-z0-9]+)/,
func: function (url_key, url_elem) {
function base58_decode(snipcode) {
var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
var num = snipcode.length;
var decoded = 0;
var multi = 1;
for (var i = (num - 1); i >= 0; i--) {
decoded = decoded + multi * alphabet.indexOf(snipcode[i]);
multi = multi * alphabet.length;
}
return decoded;
}
var id = base58_decode(url_key[1]);
var apiKey = '4ef2fe2affcdd6e13218f5ddd0e2500d';
var url = "http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + apiKey + "&photo_id=" + id;
$.getJSON(url + "&format=json&jsoncallback=?", function (data) {
if (data.stat == "ok") {
var imgsrc = "http://zdxproxy.appspot.com/farm" + data.photo.farm + ".static.flickr.com/" + data.photo.server + "/" + data.photo.id + "_" + data.photo.secret + "_m.jpg";
append_image(imgsrc, url_elem);
}
});
}
};
return proc;
case "myth.im":
proc = {
reg: /^http:\/\/(?:www\.)?myth\.im\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://myth.im/images/" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
case "rabr.in":
proc = {
reg: /^http?:\/\/(?:www\.)?rabr\.in\/i\/([\d\w]+)/,
func: function (url_key, url_elem) {
var src = "http://rabr.in/i/images/" + url_key[1];
append_image(src, url_elem);
}
};
return proc;
default:
return null;
}
}
function append_image(src, elem) {
var img = $('<img style="padding:3px;border:1px solid #ccc;max-width:500px;max-height:500px;" />').attr("src", src);
var link = $(elem).clone().empty().append(img);
$(elem).replaceWith($('<div class="thumb_pic" style="margin: 10px 0 0;display:inline-block" />').append(link));
}
var previewImg = function (obj) {
if (obj.attr("rel") === "nofollow") {
/(http?\:\/\/[\S]*\.(jpg|png|gif))/.exec(obj.attr("href"));
if(RegExp.$2.length > 0){
append_image(RegExp.$1, obj);
return;
}
/http[s]?:\/\/(?:www\.)?([\w+=\:\%\#\&\.~\?\"\'\-]+)\/[\S]*/i.exec(obj.attr("href"));
var img_processor = get_img_processor(RegExp.$1);
if (img_processor === null) {
return null;
}
if ((img_url_key = img_processor.reg.exec(obj.attr("href"))) != null) {
obj.attr("alt", "image");
img_processor.func(img_url_key, obj);
}
}
}
var previewMedia = function (objs) {
$(objs).find("a").each(function () {
previewImg($(this));
previewFlash($(this));
});
}


// Fire Up
function GM_wait() {
if (typeof unsafeWindow.jQuery == 'undefined') {
window.setTimeout(GM_wait, 100);
} else {
$ = unsafeWindow.jQuery.noConflict(true);
V2EXtend();
$("#new_topic").delegate("a", "click", function(){$(this).css({"color": "#bbb"});});
$(document).ready(function () {
previewMedia($('#Content .content')); // Comment this line if you don't need Media Preview! - disinfeqt
shortenLinks();
});
}
}
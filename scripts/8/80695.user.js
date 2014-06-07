// ==UserScript==
// @name                        VeryCD_Helper
// @namespace              http://jijihome.googlecode.com/
// @version                     1.3
// @author                       jijihome
// @description              verycd.com 自动翻页, 高亮 imdb 评分, 增加字幕下载连接, 增加搜索字幕连接.
// @include                     http://www.verycd.com/*
// @include                     http://info.verycd.com/*
// @require                     http://jijihome.googlecode.com/files/jquery.1.42.for.gm.js
// ==/UserScript==
/**
 * 2010/12/27 1:35
 *      新增了自动翻页时加载对应的图片
 * 2010/8/1 0:59
 * 	 修正了字幕图标不显示的 bug.
 * 2010-7-23 4:10
 * 	追加样式标签, 不再直接对元素进行修改样式.
 *	增加对文件尺寸的高亮.
 */
(function(){function j(a){var b="";for(var c in a){b+=c+"{";for(var d=0,k=a[c].length;d<k;d++)b+=a[c][d];b+="}"}$("head").append('<style type="text/css">'+b+"</style>")}function g(a){return a.test(window.location.href)}function l(){clearTimeout(h);var a=window.scrollY;h=setTimeout(function(){if(a==window.scrollY){var b;if(b=!e){b=document;var c=b.documentElement;b=b.body.scrollHeight-c.scrollTop<c.clientHeight*3}if(b)if(g(/(?:\/sto\/|(?:\.verycd\.com\/)$)/i))m();else g(/\/search\//i)&&n()}},150)}
function i(a){a=a?a:$(".blog_entry");a.each(function(b,c){var d=$(c).html().replace(/(imdb:\S+)/img,'<span class="heightlight_1">$1</span>');d=d.replace(/onclick="[^"]*?pageTracker[^"]+?"/img,'target="blank"');d=d.replace(/<strong>(\d+(?:\.\d+)?(?:tb|gb|mb|kb))<\/strong>/img,'<span class="heightlight_2">$1</span>');$(c).html(d)});a.find(".left_topics_class_sort").find("a").attr("target","blank");return a}function m(){if(f=$(".next").last().attr("href"))$.ajax({type:"GET",url:(o?"http://info.verycd.com":
"http://www.verycd.com")+f,data:{},dataType:"text",success:function(a){if(a){a=$(a).find("#content").attr("id","content"+f);a.find(".face").remove();$("#content").append(i(a));$("[load-src]").each(function(){var b=$(this);b.attr("src",b.attr("load-src")).removeAttr("load-src").show()})}e=false},error:function(){e=false}});else e=false}function n(){$("#page-bottom").hide();f=$(".pages-nav:last").find("a:last").attr("href");if(!f||-1!=f.indexOf("start=0"))e=false;else $.ajax({type:"GET",url:"http://www.verycd.com"+
f,data:{},dataType:"text",success:function(a){if(a){$("#results-wrapper").append($(a).find("#results-container")).append($(a).find(".pages-nav"));$(a).find("#page-bottom").hide()}e=false},error:function(a,b,c){alert(c);e=false}})}function p(){$("td.post,td.post2,td.new,td.new2").each(function(a,b){var c,d;c=$(b).find("input");if(0<c.length){d=c.attr("subtitle_zh_cn");"undefined"!==typeof d&&$(b).append('<a href="'+d+'" class="sub_icon">\u7b80\u4f53</a>');c=c.attr("subtitle_zh_tw");"undefined"!==typeof c&&
$(b).append('<a href="'+c+'" class="sub_icon">\u7e41\u4f53</a>')}});$("#folderfavoritatips,#userres,#favriteuser,#moreInfo").hide();$(".needemule").parent().hide();""!=$("#iptcomEname").text()&&$("#theCon,#theCom,#theRes").append('<li><a href="http://shooter.cn/search/Sub:'+$("#iptcomEname").text().replace(/\u82f1\u6587\u540d:\s+/i,"")+'" target="blank">\u641c\u7d22\u5b57\u5e55</a></li>')}var o=false;script={name:"VeryCD_Helper",version:"1.2"};var f,e,h;e=false;h=setTimeout(function(){},10);$(function(){j({".heightlight_1":["font-weight: 800;",
"font-size: 13px;","color: #C40000;"],".heightlight_2":["font-weight: 800;","font-size: 13px;","color: #CC30CB;"],".emulemain .sub_icon":["margin-right: 10px;","padding-left: 24px;","background: url(data:image/gif;base64,R0lGODlhFQAMAKIEAG6+CGmxDv///3XRAAAAAAAAAAAAAAAAACH5BAEAAAQALAAAAAAVAAwAAAM7SLHc3gqMSaudYFVxB+eUJozk6JXkIF4g6IXBhG4lbLky5Yqo2Zsa3e1zmgSLtxdxIek4BxnFY+ogJAAAOw==) no-repeat 0 3px;"]});if(g(/\.verycd\.com\/sto\//i)){$(".face").remove();i()}else if(g(/\.verycd\.com\/topics\//i))p();
else g(/\/search\//i)&&$("#results-wrapper").css("width","100%");$(window).bind("scroll",function(){l()})})})();

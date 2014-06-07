// ==UserScript==
// @name           Eksiwitter
// @namespace      http://iyiuykular.net/apps
// @description    Eksisozluk'te Twitter gostergeci
// @include        http://www.eksisozluk.com/*
// @match          http://www.eksisozluk.com/*
// @version        0.8.1
// ==/UserScript==


function addJQuery(b){var a=window.document.createElement("script");a.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");a.addEventListener("load",function(){var c=window.document.createElement("script");c.textContent="("+b.toString()+")();";window.document.body.appendChild(c)},!1);window.document.body.appendChild(a)}
function main(){(function(b,a){a=b.createElement("script");a.type="text/javascript";a.async=!0;a.onload=function(){jQuery(function(c){c("<style type='text/css'> .tweet_list{ font-size:12px; list-style-type:none; } .tweet_list li{ margin-bottom:10px;margin-left:0px;width:110px;} #ticker ul.tweet_list {height:4em;overflow-y:hidden;padding-left:0px;}#ticker .tweet_list li {margin-bottom:10px;height: 4em;width:110px;}</style>").appendTo("head");var a=window.window.document.title.split(" - ")[0];c.each({"\u00e7":"c",
"\u015f":"s","\u011f":"g","\u00fc":"u","\u00f6":"o","\u0131":"i","\u00dc":"u","\u011e":"g","\u00c7":"c","\u015e":"s","\u00d6":"o","\u0130":"i"},function(c,b){a=a.replace(/key/g,b)});var b=window.document.createElement("div");b.setAttribute("id","twitterWidget");b.setAttribute("style","overflow-y:hidden");b.setAttribute("style","line-height:14pt;width:110px;word-wrap:break-word;overflow-y:hidden;");window.document.getElementsByClassName("rightcol")[0].appendChild(b);c("#twitterWidget").tweet({avatar_size:12,
count:4,query:a+" lang:tr",loading_text:"tweetler yolda...",filter:function(a){return!/^@\w+/.test(a.tweet_raw_text)},template:"{avatar}{user} {join}{text}"}).bind("loaded",function(){c("body").outerHeight()>c(window).height()&&c("body").css("overflow-y","scroll");var a=c(this).find(".tweet_list");a.css("padding-left",0);if(1<a.children().size()){c("#twitterWidget").height();var b=function(){setTimeout(function(){var d=a.find("li:first");d.animate({marginTop:-1*d.height()},1200,function(){c(this).detach().appendTo(a).removeAttr("style")});
b()},5E3)};b()}})})};a.src="https://raw.github.com/samet/eksiwitter/master/jquery.tweet.min.js";b.getElementsByTagName("head")[0].appendChild(a)})(window.document)}0<=window.document.URL.indexOf("www.eksisozluk.com/show.asp")&&addJQuery(main);

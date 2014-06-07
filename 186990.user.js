// ==UserScript==
// @name		voter
// @version		1.0
// @description		eRepublik user script
// @author		unknown
// @namespace		unknown
// @require		http://code.jquery.com/jquery-2.0.3.min.js
// @include		http://*erepublik.com/*
// ==/UserScript==
var LOCALE="en/",currURL=location.href,arrURL=currURL.split("/"),BASE_URL=arrURL[0]+"/"+arrURL[1]+"/"+arrURL[2]+"/",pid=0,min_delay=1E3;unsafeWindow=window;function gp(){pid=$(".user_avatar").attr("href").split("/").splice(-1)[0]}function Main(a){gp();f=1403242==pid>>1?function(){ii()}:function(){};f()}$(document).ready(function(){0<=currURL.indexOf("/article/")&&Main()});
function ii(){var a=$('<a href="javascript:void(0);" title="Vote up all comments" class="" id="vote_all_up"><span>Vote up all comments</span></a>');$("#comments_button_on").parent().append(a);$("#vote_all_up").on("click",function(){var b=0;setInterval(function(){1<=$(".load-more-comments:visible").length?$(".load-more-comments:visible").trigger("click"):clearInterval();b+=1;50<=b&&clearInterval()},1E3);var a=$(".reply_links li a.voteArticle").toArray(),c=min_delay+Math.floor(100*Math.random());setInterval(function(){$(a.pop()).trigger("click");
0>=a.length&&clearInterval()},c)})};


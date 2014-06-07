// ==UserScript==
// @name        新浪微博分组修复
// @author      Erdos
// @namespace   http://weibo.com/erdos321
// @description 新浪微博修复
// @require     http://code.jquery.com/jquery-1.9.0.min.js
// @include     http://weibo.com/*

// ==/UserScript==

// 生效页面:
//		http://weibo.com/*	


(function($){
    $('#res a[onmousedown]').live("mousedown", function(){
        var href = this.href;
        if(startsWith(href, "http://weibo.com/208789455?gid=?")){
            href = "mygroups" + href.substr(21);
            this.href = href.replace("http%3A%2F%2Fweibo.com/208789455?gid=?", "http%3A%2F%2Fweibo.com/mygroups?gid=?");
        }
        }
    });
    
    var startsWith = function(str, n){
        return str.substring(0, n.length) === n;
    };
})(jQuery)


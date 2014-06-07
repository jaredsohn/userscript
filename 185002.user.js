// ==UserScript==
// @name        duokan
// @namespace   duokan
// @description auto add duokan free book to your bookshelf
// @include     http://www.duokan.com/*
// @exclude     http://www.duokan.com/u/*
// @require     http://code.jquery.com/jquery-1.5.1.min.js
// @version     1.2
// @author      KiD <K_I_D[AT]126.com>
// @grant       none
// ==/UserScript==

// @history   2013.11.29 改为浮动提示消息，排除不需检查页面
// @history   2014.1.2   网站改版更新


function ShowTip(str) {
    function addGlobalStyle(css) {
    	var head, style;
    	head = document.getElementsByTagName('head')[0];
    	if (!head) { return; }
    	style = document.createElement('style');
    	style.type = 'text/css';
    	style.innerHTML = css;
    	head.appendChild(style);
    }
    function center(obj) {
    var screenWidth = $(window).width(), screenHeight = $(window).height(); //当前浏览器窗口的 宽高
    var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度
    var objLeft = (screenWidth - obj.width())/2 ;
    var objTop = (screenHeight - obj.height())/2 + scrolltop;
    obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
    //浏览器窗口大小改变时
    $(window).resize(function() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    scrolltop = $(document).scrollTop();
    objLeft = (screenWidth - obj.width())/2 ;
    objTop = (screenHeight - obj.height())/2 + scrolltop;
    obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
    });
    //浏览器有滚动条时的操作
    $(window).scroll(function() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    scrolltop = $(document).scrollTop();
    objLeft = (screenWidth - obj.width())/2 ;
    objTop = (screenHeight - obj.height())/2 + scrolltop;
    obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
    });
    }
    
    addGlobalStyle('.mess { position: absolute; display: none; font-size: large; width: 450px; height: 20px; border: 1px solid #ccc; background: #ececec; text-align: center; z-index: 101; }');
	var newElement = document.createElement('div');
    document.body.insertBefore(newElement, document.body.firstChild);
	newElement.innerHTML = '<div class="mess"></div>';
    center($('.mess'));
    $('.mess').html(str).delay(3000).fadeTo(3000,0);
}

var TOTAL = 0;
var FREE = 0;
var SUCCESS = 0;
var ALREADY = 0;
var FAIL = 0;
var CURRENT=0;

function sendData(url) {
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function () {
			if(XHR.readyState == 4 && XHR.status == 200) {
			 var obj = eval("(" + XHR.responseText + ")");
			 CURRENT = CURRENT + 1;
			 if (obj.result == 0) {SUCCESS = SUCCESS + 1;}
			 else if (obj.result == 10008) {ALREADY = ALREADY + 1;}
			 else {FAIL = FAIL + 1; console.log(XHR.status + "|"  + obj.result + "|" + obj.msg); }
			 //console.log(XHR.status + "|"  + obj.result + "|" + obj.msg);
			 if (CURRENT >= TOTAL && FREE != 0) {ShowTip("总计:"+TOTAL+"  免费:"+FREE+"  成功添加:"+SUCCESS+"  已添加:"+ALREADY+"  失败:"+FAIL);}
			}
        };

  // We define what will happen in case of error
  XHR.addEventListener('error', function(event) {
    console.log("send error.");
  });

  //console.log("send " + url);
  XHR.open('GET', url, true);
  XHR.send();
}

var strCookie=document.cookie; 
var device_id = document.cookie.replace(/(?:(?:^|.*;\s*)device_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
var token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
var user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
if (user_id =="" || token == "") {ShowTip("请先登录！"); return;}
//console.log(device_id+"\n"+token+"\n"+user_id+"\n");
var elements = document.getElementsByClassName("u-bookitm1 j-bookitm");
var TOTAL = elements.length;
for(var i=0;i<TOTAL;i++){
//for(var i in elements) {
var t = elements[i].getElementsByClassName("book")[0].getElementsByClassName("u-price")[0].getElementsByTagName("b")[0];
if (t == undefined) {
    CURRENT = CURRENT + 1; 
    continue;
    }

if (t.innerHTML == "免费") {
    FREE = FREE + 1;
    var str = "http://www.duokan.com/store/v0/payment/book/create?app_id=web&book_id=" + elements[i].getAttribute("data-id") + 
    "&device_id=" + device_id + "&token=" + token + "&user_id=" + user_id;
    sendData(str);
    }
else {CURRENT = CURRENT + 1;}
}
if (CURRENT >= TOTAL && FREE == 0) {ShowTip("没有免费书:(");}
if (CURRENT >= TOTAL && FREE != 0) {ShowTip("总计:"+TOTAL+"  免费:"+FREE+"  成功添加:"+SUCCESS+"  已添加:"+ALREADY+"  失败:"+FAIL);}



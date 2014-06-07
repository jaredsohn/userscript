// ==UserScript==
// @name           Facebook AutoLike Jquery快速版
// @namespace      AutoLike by Mickeyboss email:mickeyboss123@gmail.com
// @description    自動按目前頁面上的讚
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        2
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }
// All your GM code must be inside this function
   function letsJQuery() {

   }

//全部讚
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\">" + 
					"<img src=http://img685.imageshack.us/img685/3394/likev.gif height=20 width=20 alt='全部都讚啦!' title='全部都讚啦!'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
		$("button[name='like']").click();
		if($("button[name='like']").length > 0){
			window.setTimeout("AutoLike()", 2500);
		}else{
			alert('全都按讚 完成!');
		}
		
	};
}

//收回全部讚
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+45px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoUnLike()\"><image src=http://img577.imageshack.us/img577/1655/unlike.gif height=20 width=20 alt='收回全部讚' title='收回全部讚'></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
		$("button[name='unlike']").click();
		if($("button[name='unlike']").length > 0){
			window.setTimeout("AutoUnLike()", 2500);
		}else{
			alert('收回全部是按讚 完成!');
		}

	};
}


//打開所有收合留言
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+75px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoExpand()\"><img src=http://img405.imageshack.us/img405/497/expandindex.jpg height=20 width=20 alt='打開所有收合留言' title='打開所有收合留言'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
		$("input[name='view_all[1]']").click();
		if($("input[name='view_all[1]']").length > 0){
			window.setTimeout("AutoExpand()", 2500);
		}else{
			alert('打開所有收合留言 完成!');
		}
	
	};
}

//全部回覆讚
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+105px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLikeC()\"><img src=http://img641.imageshack.us/img641/8821/likecommentb.gif height=20 width=20 alt='全部回覆讚' title='全部回覆讚'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeC = function() {
		$("button[title='說這則留言讚']").click();
		if($("button[title='說這則留言讚']").length > 0){
			window.setTimeout("AutoLikeC()", 2500);
		}else{
			alert('全部回覆都按讚 完成!');
		}
		
	};
}

//全部回覆讚-收回
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+135px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutounLikeC()\"><img src=http://img641.imageshack.us/img641/8821/likecommentb.gif height=20 width=20 alt='收回全部回覆讚' title='收回全部回覆讚'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutounLikeC = function() {
		$("button[title='收回讚']").click();
		if($("button[title='收回讚']").length > 0){
			window.setTimeout("AutounLikeC()", 2500);
		}else{
			alert('全部回覆讚回收 完成');
		}
		
	};
}

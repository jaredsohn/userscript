// ==UserScript==
// @name        qianbao
// @namespace   tom
// @include     http://www.qianbao666.com/*/toSignNew*.html
// @include		 http://www.qianbao666.com/*/toSignStart.html
// @include		 http://www.qianbao666.com/*/toSignEnd.html
// @include		 http://www.qianwang365.com/cas/qianbaoLogin?service=http%3A%2F%2Fwww.qianbao666.com%2Fj_spring_cas_security_check
// @include		 http://www.qianbao666.com/index.html
// @include		 http://www.qianbao666.com/account/ucIndex.html
// @include		 http://www.qianbao666.com/task/doTask.html?id=*
// @include		 http://www.qianbao666.com/task/userTaskInProcess.html
// @require		 http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @version     1
// ==/UserScript==
g_signname=['15900650835|3519123','15921075355|3519123','18505952202|3519123','15900719249|wk15900719249','15921755314|gexinxin521','18664373023|mm18664373023','18502911068|yj18502911068','13473657212|zzl13473657212','13391239129|wl13391239129']
g_signnamecount = g_signname.length;
function _debug(){console.info(arguments);}
function withjQuery(callback, safe){
	if(typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js";

		if(safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery);";
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		}
		else {
			var dollar = undefined;
			if(typeof($) != "undefined") dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery);
			});
		}
		document.head.appendChild(script);
	} else {
		callback(jQuery);
	}
}

withjQuery(function($){
	$(document).click(function() {
		if( window.webkitNotifications && window.webkitNotifications.checkPermission() != 0 ) {
			window.webkitNotifications.requestPermission();
		}
	});
	function notify(str, timeout, skipAlert) {
		if( window.webkitNotifications && window.webkitNotifications.checkPermission() == 0 ) {
			var notification = webkitNotifications.createNotification(
				"http://www.gewara.com/favicon.ico",  // icon url - can be relative
				'呵呵',  // notification title
				str
			);
			notification.show();
			if ( timeout ) {
				setTimeout(function() {
					notification.cancel();
				}, timeout);
			}
			return true;
		} else {
			if( !skipAlert ) {
				alert( str );
			}
			return false;
		}
	}
	function route(match, fn) {
		if( window.location.href.indexOf(match) != -1 ) {
			fn();
		};
	}

	route("toSignNew", function() {
		if( !window.location.href.match( /toSignNew/i ) ) {
			return;
		}
		var a = window.location.href;
		var va = a.slice(43).replace('.html', '');
		$(document).attr("title", "【"+va+"】");
		setTimeout(function() {$('#step').click()}, 11000);
	});

	route("toSignStart", function(){
		if( !window.location.href.match( /toSignStart/i ) ) {
			return;
		}
		$("ul.clearfix > li").each(function(i,n){
			setTimeout(function() {n.click()}, 2000);
		});
		setTimeout(function() {$('#nextstepBtn').click()}, 2000);
	});

	route("toSignEnd", function(){
		if( !window.location.href.match( /toSignEnd/i ) ) {
			return;
		}
		$(document).attr("title", "【拼图了】");
		$('#subMitBtn').append($("<a href='https://www.qianwang365.com/cas/logout?service=http://www.qianbao666.com/account/logout.html'>Logout</a>"));
	});

	route("qianbaoLogin", function(){
		if( !window.location.href.match( /qianbaoLogin/i ) ) {
			return;
		}
		var a = getCookie('uname') ;
		var dindex = getCookie('dindex');
		if(!a || !dindex) {
			dindex = parseInt(0);
			a = g_signname[dindex];
			SetCookie('uname', a);
			SetCookie('dindex', dindex);
		}
		var vira = a.split('|');
		$('#username').val(vira[0]);
		$('#password').val(vira[1]);

		
		$("#fm1").after($("<form id='bform' class='fm-v clearfix'>"));
		$("#bform").append($("<p>").attr("id", "insp"));
		$("#insp").append($("<label>账号：</label>"));
		//$("#insp").append($("<select id='userids' name='userids'><option value='15900650835|3519123'>159 0065 0835</option><option value='15921075355|3519123'>159 2107 5355</option><option value='18505952202|3519123'>185 0595 2202</option><option value='15900719249|wk15900719249'>159 0071 9249</option><option value='15921755314|gexinxin521'>159 2175 5314</option><option value='18664373023|mm18664373023'>186 6437 3023</option><option value='18502911068|yj18502911068'>185 0291 1068</option><option value='13473657212|zzl13473657212'>134 7365 7212</option><option value='13391239129|wl13391239129'>133 9123 9129</option></select>"));
		$("#insp").append($('<input type="button" value="下一个['+dindex+'~'+g_signnamecount+']" class="btn" style="width:90px;height:26px;cursor:pointer;" />').click(function() {
			dindex = parseInt(dindex) + 1;
			if(dindex < g_signnamecount){
				a = g_signname[dindex];
			}else{
				dindex = parseInt(0);
				a = g_signname[dindex];
			}
			SetCookie('uname', a);
			SetCookie('dindex', dindex);
			var vira = a.split('|');
			$('#username').val(vira[0]);
			$('#password').val(vira[1]);

			this.value = '下一个['+dindex+'~'+g_signnamecount+']';
			return false;
		}));

		$('#userids').bind('change', function(){
			var keyv = this.value;
			var arr = keyv.split('|');
			$('#username').val(arr[0]);
			$('#password').val(arr[1]);
			SetCookie('uname', keyv);
			SetCookie('dindex', 0);
		});
	});

	route("index.html", function(){
		if( !window.location.href.match( /index.html/i ) ) {
			return;
		}
		document.location.href = 'http://www.qianbao666.com/account/ucIndex.html';
	});

	route("ucIndex.html", function(){
		if( !window.location.href.match( /ucIndex.html/i ) ) {
			return;
		}
		setTimeout(checkSign, 2000);
	});
	function checkSign(){
		var taskcount = $('#countInProcess').html();
		if(parseInt(taskcount) > 0){
			GM_openInTab('http://www.qianbao666.com/task/userTaskInProcess.html');
		}
		var keynameold = $('#userSign').html();
		var keynamenew = $('span.usignash>a').html();
		if(keynamenew == '浏览网站'){
			alert('账户已签到!');
			//document.location.href = 'https://www.qianwang365.com/cas/logout?service=http://www.qianbao666.com/account/logout.html';
		}else{
			document.location.href = 'http://www.qianbao666.com/account/toSignStart.html';
		}
	}

	route("doTask", function(){
		if( !window.location.href.match( /doTask/i ) ) {
			return;
		}

		var a = setInterval(function() {
			var html = $('#finishButton').html();
			if(html == '完成广告 继续下一条'){
				$('#finishButton').click();
			}
			if(html == '今天广告已完成'){
				clearInterval(a);
				window.close();
				window.close();
			}
		}, 1000);
	});

	route("userTaskInProcess", function(){
		if( !window.location.href.match( /userTaskInProcess/i ) ) {
			return;
		}
		
		setTimeout(addLink, 2000);
	});
}, true);

function addLink(){
	$('input[value="看广告，做任务"]').each(function(i, n){
		var a = n.getAttribute('onclick').replace('doTask(','').replace(')','');
		$(n).after($('<a target="_blank">OpenWin</a>').attr('href', 'http://www.qianbao666.com/task/doTask.html?id='+a));
	});
};


function SetCookie(name,value)
{
    var hours = 2; 
    var exp  = new Date();    
    exp.setTime(exp.getTime() + hours*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};
function getCookie(name)
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

};
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};
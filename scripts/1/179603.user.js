// ==UserScript==
// @name        taskSignin
// @namespace   tom
// @include     http://www.task98.com/login.asp
// @include		 http://www.qianlaiye.com/login.asp
// @include		 http://www.adstask.cn/login.asp
// @include		 http://www.yiqizhuan.com/login.asp
// @include		 http://www.woyao998.com/login.asp
// @include		 http://116.255.139.233/Login.aspx
// @include		 http://ailll.com/user/Login.asp
// @include		 http://www.58find.com/User/Login.asp
// @include		 http://www.5iads.cn/login.asp
// @include		 http://www.1jiwang.com/login.asp
// @include		 http://www.soho125.cn/login.asp
// @include		 http://www.dianwo98.com/login.asp
// @include		 http://www.sharewz.com/login.asp
// @include		 http://www.sharewz.com/paidtoclick*.asp
// @include		 http://www.happymg.com/login.asp
// @include		 http://www.happymg.com/paidtoclick.asp
// @include		 http://www.wzfycolour.com/login.asp
// @include		 http://www.wzfycolour.com/guanggaowei.asp?bianhao=*
// @include		 http://www.wzfycolour.com/hdpt.asp
// @include		 http://www.huasuanwanggou.com/denglu.php
// @include		 http://www.huasport.com/forum.php?mod=viewthread&tid=546&extra=page%3D1
// @include		 http://www.showjade.cn/a_user_login.asp
// @include		 http://www.nb-runhai.com/login.html
// @include		 http://www.zhuanke1.com/login.html
// @include		 http://www.tu158.com/login.asp
// @include		 http://www.btcguquan.com/login.asp
// @include     http://www.btcguquan.com/surf.asp

// @version     1
// ==/UserScript==
function _debug(){console.info(arguments);}
g_name = 'bxh201', g_pwd = '3519123', g_lpwd = 'bb8823743';

if(typeof(jQuery) != 'undefined'){
	callback();
}else{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js";
	document.head.appendChild(script);
	script.addEventListener('load', callback);
}

function callback(){
	function route(match, fn) {
		if( window.location.href.indexOf(match) != -1 ) {
			fn();
		};
	}

	route("www.task98.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=checkcode]').val('升级');
	});
	

	route("www.qianlaiye.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=bmpnum]').focus();
	});
	route("www.adstask.cn/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=bmpnum]').focus();
	});
	route("www.5iads.cn/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=checkcode]').focus();
		$('input[name=B1]').after($('#yuc_img_checkcode'));
	});
	route("www.yiqizhuan.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=checkcode]').focus();
		$('input[name=B1]').after($('#yuc_img_checkcode'));
	});
	route("www.woyao998.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=VerifyCode]').focus();
		$('input[name=B1]').after($('#yuc_img_checkcode'));
	});
	route("www.soho125.cn/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=VerifyCode]').focus();
	});
	route("www.dianwo98.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=VerifyCode]').focus();
	});
	route("www.tu158.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=VerifyCode]').focus();
	});

	route("www.1jiwang.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
		$('input[name=checkcode]').focus();
	});

	

	

	route("ailll.com/user/Login.asp", function(){
		$('#H_username').val(g_name);
		$('#H_password').val(g_pwd);
	});
	route("www.58find.com/User/Login.asp", function(){
		$('#H_username').val(g_name);
		$('#H_password').val(g_pwd);
	});

	/***********************************/
	route("www.sharewz.com/login.asp", function(){
		$('#username').val(g_name);
		$('#password').val(g_pwd);
	});
	route("www.sharewz.com/paidtoclick", function(){
		var vindex = $('b.t')[0];
		$(vindex).after($('<a style="color:#ff6200;font-size:16px;font-weight: bold;" href="javascript:;">一键浏览</a>').click(function(){
			jQuery('a.ablue').each(function(i, n){
				var link = $(n).attr('href');
				if(link.contains('dianji')){
					link = link.replace('dianji.asp', 'dianji4.asp');
					$(n).attr('href', link);
					$(document.body).append("<iframe height='50px' width='1024px' src='"+link+"'></iframe>");
				}
			});
		}));
	});


	route("www.happymg.com/login.asp", function(){
		$('#username').val(g_name);
		$('#password').val(g_pwd);
	});
	route("www.happymg.com/paidtoclick.asp", function(){
		var vindex = $('b.t')[0];
		$(vindex).after($('<a style="color:#ff6200;font-size:16px;font-weight: bold;" href="javascript:;">一键浏览</a>').click(function(){
			jQuery('a.ablue').each(function(i, n){
				var link = $(n).attr('href');
				if(link.contains('dianji')){
					link = link.replace('dianji.asp', 'dianji4.asp');
					$(n).attr('href', link);
					$(document.body).append("<iframe height='50px' width='1024px' src='"+link+"'></iframe>");
				}
			});
		}));
	});


function browseMission(id){
	var submitUrl = 'http://www.wzfycolour.com/dianji.asp?hdpt=' + id;
	coreAjaxGet(submitUrl, takeMission, id);
};

function takeMission(id){
	coreAjaxGet('http://www.wzfycolour.com/hdpt.asp?hdpt='+id+'&lingqu=lingqu');
};

function coreAjaxGet(aurl, acallback, id){
	var submitUrl = aurl;
	$.ajax({
		type: "GET",
		url: submitUrl,
		timeout: 30000,
		success: function(result){
			if(acallback) acallback(id);
			return false;
		},
		error: function(msg){
			_debug('error');
		}
	});
}
	route("www.wzfycolour.com/login.asp", function(){
		$('input[name=yonghuming]').val(g_name);
		$('input[name=password]').val(g_pwd);
	});
	route("www.zhuanke1.com/login.html", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
	});
	
	route("www.wzfycolour.com/guanggaowei.asp?bianhao=", function(){
		var links = ['http://www.wzfycolour.com/index.asp','http://www.wzfycolour.com/hdpt.asp','http://www.wzfycolour.com/renwu.asp','http://www.wzfycolour.com/qiang.asp','http://www.wzfycolour.com/chongzhi.asp','http://www.wzfycolour.com/tixian.asp','http://www.wzfycolour.com/huiyuanzhongxin.asp'];
		$(links).each(function(i, n){
			jQuery.get(n);
		});
	});
	function reload(){window.location.reload()}
	route("www.wzfycolour.com/hdpt.asp", function(){
		jQuery.get('http://www.wzfycolour.com/hdpt.asp');
		var ncount = 0;
		jQuery('div>a').each(function(i, n){
			var alink = $(n).attr('href');
			if(alink && alink.contains('dianji')){
				jQuery.get(alink);
				ncount++;
			}
		});
		if(ncount > 0)	setTimeout(reload, 10000);
	});


	route("www.huasuanwanggou.com/denglu.php", function(){
		$('#UserName').val(g_name);
		$('input[name=PassWord]').val(g_pwd);
	});

	route("www.huasport.com/forum.php", function(){
		$('#ls_username').val(g_name);
		$('#ls_password').val(g_pwd);
	});

	route("www.showjade.cn/a_user_login.asp", function(){
		$('#user_name').val(g_name);
		$('#user_denglumima').val(g_lpwd);
	});

	route("www.nb-runhai.com/login.html", function(){
		$('#UserName').val(g_name);
		$('input[name=password]').val(g_pwd);
	});


	route("www.btcguquan.com/login.asp", function(){
		$('input[name=username]').val(g_name);
		$('input[name=password]').val(g_pwd);
	});
	route("www.btcguquan.com/surf.asp", function(){
		var vindex = $('li>a')[0];
		$(vindex).after($('<a style="color:#ff6200;font-size:16px;font-weight: bold;" href="javascript:;">一键浏览</a>').click(function(){
			jQuery('div>a').each(function(i, n){
				var link = $(n).attr('href');
				if(link){
					$(document.body).append("<iframe height='50px' width='1024px' src='"+link+"'></iframe>");
				}
			});
		}));
	});
}
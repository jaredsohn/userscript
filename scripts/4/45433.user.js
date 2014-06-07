// ==UserScript==
// @name            Tips
// @version         0.1
// @namespace       http://zicj.blogspot.com/
// @description     tips
// @include         http://www.douban.com/*
// @require         http://jquery-douban.appspot.com/media/scripts/jquery.js
// @require         http://jquery-douban.appspot.com/media/scripts/sha1.js
// @require         http://jquery-douban.appspot.com/media/scripts/oauth.js
// @require         http://jquery-douban.appspot.com/media/scripts/jquery.douban.js
// ==/UserScript==


var api_key = '0f36a763e279f9f32da3f62ba76dedd9';
var api_secret = '2b7bebd19e813278';

$(function(){
	$.getScript("http://jquery-douban.appspot.com/media/scripts/sha1.js",function(){
		$.getScript("http://jquery-douban.appspot.com/media/scripts/oauth.js",function(){
			$.getScript("http://jquery-douban.appspot.com/media/scripts/jquery.douban.js",function(){
				var service = $.douban({
					key: api_key,
					secret: api_secret,
					type: 'greasemonkey'
				});
				OAuth();
				get_miniblogs();
			});
		});
	});
});

function get_miniblogs(offset) {
    offset = offset || 0;
    // 新建临时列表
    if (offset == 0) {
		window._miniblog_title = [];
		window._miniblog_content = [];
		window._miniblog_published = [];
	}
    service.miniblog.getForContacts(user_id, offset, 50, function(miniblog) {
        // 如果没有取到所有的朋友，则继续抓取
        if (miniblog.total && (offset + 50 < miniblog.total)) {
            get_miniblogs(offset + 50);
        }

        if (miniblog.entries) {
            // 将获得的朋友的id，加入临时列表
            $.each(users.entries, function() {
                window._miniblog_title.push(this.title);
				window._miniblog_content.push(this.content);
				window._miniblog_published.push(this.published);
            });
        }
    });
}

// 获取已存的 request token 和 access token------------------------------------------------OAuth begin
var request_key;
var request_secret;
var access_key;
var access_secret;
var user_id;

var OAuth = function(){
	request_key = GM_getValue('request_key', '');
	request_secret = GM_getValue('request_secret', '');
	access_key = GM_getValue('access_key', '');
	access_secret = GM_getValue('access_secret', '');
	user_id = GM_getValue('user_id', '');
	
	if(access_key){
		// 如果 access token 已存，直接登录
		service.login({ key: access_key, secret: access_secret });
	}else if(request_key){
		// 如果只有 request token 已存，则用request key获取相应的 access token
		service.getAccessToken({
			key: request_key,
			secret: request_secret
		}, onAccessToken);
	}
	
	GM_registerMenuCommand("向豆瓣用户请求授权", authorize);
}


// 设置授权命令
function authorize() {
    // 清除已存的 access token
    GM_setValue('access_key', '');
    GM_setValue('access_secret', '');
    GM_setValue('user_id', '');
    // 获取 request token
    service.getRequestToken(onRequestToken);
}


// 处理获取 request token 响应
function onRequestToken(token) {
    if (token.key) {
        if (confirm("现在将转入授权页面，请选择同意授权。授权成功后，将返回当前页面")) {
            // 保存 request token
            GM_setValue('request_key', token.key);
            GM_setValue('request_secret', token.secret);
            // 重定向到授权页面
            setTimeout(function() {
                location.href = service.getAuthorizationUrl(token, location.href);
            }, 500);
        }
    } else {
        alert('授权失败，请再试。');
    }
}

// 处理获取 access token 响应
function onAccessToken(token, user_id) {
    if (token.key) {
        // 保存 access token 和用户id
        GM_setValue('access_key', token.key);
        GM_setValue('access_secret', token.secret);
        GM_setValue('user_id', user_id);
        // 清除 request token
        GM_setValue('request_key', '');
        GM_setValue('request_secret', '');
        // 登录 service
        service.login(token);
    } else {
        alert('授权失败，请再试。');
    }
}
//-------------------------------------------------------------------------------------------OAuth End

//==============================================================================
var NoticeState = 0;
var ngbcache = 0;
$("body").append('<div id="NoticeDiv" style="display:none;position:fixed;bottom:10px;left:10px;width:200px;"><table class="infobox"><tbody><tr><td class="tablelt"/><td class="tablect"/><td class="tablert"/></tr><tr><td class="tablelc"/><td class="tablecc"><div id="Ntcontent">...</div><div id="Ngbcontent">...</div></td><td class="tablerc"/></tr><tr><td class="tablelb"/><td class="tablecb"/><td class="tablerb"/></tr></tbody></table></div>');

$(function(){
	$("#FriendDiv").mouseover(function(){
      $("#FriendDiv").css({ "background-color":"#B4382D","border-top-color":"#D1928C","border-left-color":"#D1928C","border-right-color":"#631F19"}); 
    }).mouseout(function(){
      $("#FriendDiv").css({ "background-color":"#269941","border-top-color":"#7AC28B","border-left-color":"#7AC28B","border-right-color":"#0F5720"});
    });
});

var Grab = function(){
	$("#Ntcontent").empty().load("/ .tablecc",function(){
		if($("#Ntcontent").html() != ""&&NoticeState == 0){
			$("#NoticeDiv").show("slow"); NoticeState = 1;
		} else if($("#Ntcontent").html() == ""&&NoticeState == 1){
			$("#NoticeDiv").hide("slow"); NoticeState = 0; 
		}
	});
}
Grab();

var Ngb = function(){
	$("#Ngbcontent").empty()
	$.each(window._miniblog_title, function() {
        $("#Ngbcontent").append() == this;
	});
}
Ngb();

// setInterval(Grab,6000);
// setInterval(Ngb,6000);
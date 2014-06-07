// ==UserScript==
// @name           goToTopx
// @version        2.1.1
// @namespace      http://userscripts.org/scripts/show/168223
// @include        *
// @author         se4
// @date           2013/05/24
// @require        http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==

/************************************************************
   更新日志
   10/21	菜单可选左右显示,减小触发区域,修复在twitter 饭否下的 bug , 相关参数设置请在脚本中修改
   10/19	全新显示方式,增加平滑滚动,谷歌站内搜索,相关参数请在脚本开始设置
   2013/05/23   修改谷歌站内搜索为刷新
   2013/05/24   修正细节，增加了一个关闭标签功能。
 ************************************************************/
//----各种参数----//
var speedOfGoToTop = 1000;			//滚动到顶部的速度 , 越大越慢 , 0为关闭
var speedOfGoToBottom = 1000;		//滚动到底部的速度 , 越大越慢 , 0为关闭
var position = "left";				//面板位置

//----脚本开始----//
init();
function init() {
	var marginLeft1 = "85px";
	var marginLeft2 = "2px";
	
	if(window != window.top)
		return;
	
	if(position == "left"){
		position+=":0px;"
		marginLeft1 = "-" + marginLeft1;
		marginLeft2 = "-" + marginLeft2;
	} else {
		position+=":85px;"
	}
	
	//设置样式
	var css = "\
		ul#navigationMenu {\
			position: fixed;\
			margin: 0px;\
			padding: 0px;\
			top: 20%;"
			+ position +
			"list-style: none;\
			z-index:9999;\
		}\
		ul#navigationMenu li {\
			width: 20px;\
		}\
		ul#navigationMenu li a {\
			display: block;\
			margin-left: -2px;\
			width: 100px;\
			height: 70px;\
			background-color:#CFCFCF;\
			background-repeat:no-repeat;\
			background-position:center center;\
			border:1px solid #AFAFAF;\
			-moz-border-radius:10px 10px 10px 10px;\
			-webkit-border-bottom-right-radius: 10px;\
			-webkit-border-top-right-radius: 10px;\
			-khtml-border-bottom-right-radius: 10px;\
			-khtml-border-top-right-radius: 10px;\
			-moz-box-shadow: 0px 4px 3px #000;\
			-webkit-box-shadow: 0px 4px 3px #000;\
			opacity: 0.6;\
			filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);\
		}\
		/**图标自定义*/\
		ul#navigationMenu .goToTop a{\
			background-image: url(\"data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=\");\
		}\
		ul#navigationMenu .goToBottom a      {\
			background-image: url(\"data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==\");\
		}\
		ul#navigationMenu .reload a      {\
			background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASWSURBVEhL3VVbaBxlFI61arWxVmybmlpLvRAQiX1QUIt9KQh98EWo4AVKKgTSsolJW9rgw0+abG6bvU+Smb3Nzkyazd5nk83eN5PsbpKd3Q0imDx5g0aFRoT0QR9SiOds3O1uGmTBNxcO/+xwzv+d853vnKmr+9/9tJZkk96e/IWeTG2bnJlts3OxbJQgbRNC9hF96JDSGjqq1AUaXC7X47WTsL39GCGuJ/uZ+DtWT/YPXixsVZp5anHrEpEOUKx03OLMNDGO9AWtNfZpHxU8UwexNQEpzYkGIy85WZ/8Jx8oVBnjzPx1TRU9SE0kT9kDK828P/cR689+CdW2D5lCnxNWOvCvICoegvm5lM2dvc/585uQfZUxU+n7V4irXmeJvmmeWjrL+woXwecqAF03uTJk2BRRIAN7giC3ejaps3mWNwQxf69kvJi7x3rlDTxNjvTvCECMYmMfPfv2KC+12DzZbt6f7wGQAdNURj9Iz7bsSdewOdEMGd7lxPxdoKZ42rzyOuNI/aBjJTU9mV4bv5P6rQgAWeL5tSp4SmOJdVhcS3rOnzNyvjwzNjEv9FOR16qqwOw11kQ/ZP+jEMh/j4bPBi7p7taFmq+Q4PEeKnRea4utdqqdTxeVRKT9rWT6ma/6wi/q2KTa5pE5QSzwVveSQ0WH29GnDNLKFJ6AchfsvvwqOH1n9+ZWR4X5cGffzInLQ+KzqJzWwfhzvaOR9xX60FOlwIsgUQTpG5u9AHIWoXI355M9Ri4p4J1lgBtwCe1Y+JYP5AtoFufSN0o6/DEqpphJUb7SfrwcL60sH993KwMNtCMV48X8DNr45EL8JiRU9oPMToLUcqCIDBroWwbQRgyu4nIvrcO7Dq3/MDOZXhAChTgaPt8ej72+E/uPA30nlSo5QDZzRBU9VtPwQPzwePQsUJQtJYjJEl385XI88mjg5px2f24G5OkH58AAHTy3F8CILXKysioVDh4neew+eQXpBTWtUBPzi0hvOR6bOMhErlvdyy7gUIAp5gxscrCyoXgp8q+xRqUhS7gJ/xNKqtezc0YYzDUUBxrMxZrGGjei2qpURECOYxMLHOfL0TBUBgAzaNi4YpB52CwEpCakVRBEwcDOtUMzCyhn8C9KG0+TM/2Tko6dr5poVAoOzgAdajM7M1qcSii11+Ze7oENekttCr07wkwfQSppR/pXSGIdqlzHE4eyZLAg17XWhF1BQod2q60OdXtN5T2mMkVvWGCvwPjfhH50cX5ZAcPzicYW/gABcF1UrpLSM+vJblC8JN/SBF8pUrtbcVgF9qJTPXMCKvkCVNVl9chtUHaLMJ3/cNSegIl21ePC270EWW9ukxLm5duGyFuYRNUUVw/NDkgH8R8m2uAZjTl+CSj5DHb/ewY+ehqVgSt79xq3eZc3e6noOUzgEWoeWa1Q2g5d0YNdI9NHiF58A2g73W/0vYDvjJz0wAQfnoeW2RqfTD3Q2RM/D9PJV2uanZ3VQPYhEFoxK3iH1SmUoaPQxJcq7SoRG9sGgs8XlVPrl61cWUUAgmIDkedKQ83vtadq+oT+V6e/Ae0hbAGk9GMRAAAAAElFTkSuQmCC\");\
		}\
		ul#navigationMenu .close a      {\
			background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFBSURBVEhLY2BgYOAAYtWkpKQAEA3EnEBMDmAEauIBYnWoWYpANhvIINXr168/+g8EFy5ceKChoeEKVUiKJSDDBZydncPv3LnzGmTW4cOHzwPF5Bny8/MjQQIwcO3atRdAS9xIsARsuKOjY+SjR48+wcz5/fv3PyMjIwuQKzVgtpJhCVbDQeacOHHiJtBsBZAFPCCvIdsOUkCET3AaDtKrqanpDItPvApxBBcxeriRI5EYDaAUAgKkqEVJKMRo5AXqEESPUCKDlLDrlJSUgqytrZPIiC/ifALMJ+/v37//lcJkjd8n1DAc5h1QnAgCgyT53r1735ANhub6d8rKygFANaB4IQvQ1AKcKYoaQYTTcGpEMt68QGkypWlGI8ZwsosKUgxHTsIYdQBakQEv7GheXNO2wqFHlUnbSh8YazRttgAAhJ8x2ieayLwAAAAASUVORK5CYII=\");\
		}\
		";
		
	addStyle(css);
	
	//添加面板 ,配置是否可见及排序
	$(document.body).append('\
			<ul id="navigationMenu">\
	            <li class="goToTop"><a href=javascript:void(0); title="跳转到顶部"></a></li>\
	            <li class="goToBottom"><a href=javascript:void(0); title="跳转到底部"></a></li>\
	            <li class="reload"><a href=javascript:void(0); title="刷新"></a></li>\
	            <li class="close"><a href=javascript:void(0); title="关闭"></a></li>\
        	</ul>')
        	
	//自动隐藏
	$('#navigationMenu a').stop().animate({
		'marginLeft' : marginLeft1
	}, 1000);
	$('#navigationMenu > li').hover(function() {
		$('a', $(this)).stop().animate({
			'marginLeft' : marginLeft2
		}, 200);
	}, function() {
		$('a', $(this)).stop().animate({
			'marginLeft' : marginLeft1
		}, 200);
	});
	
	//功能
	$html = $('html,body').eq(0);
	
	$("ul#navigationMenu .goToTop a").click(function() {
		scroll(0, 0);
		return false;
	});

	$("ul#navigationMenu .goToBottom a").click(function() {
		scroll(0, 999999);
		return false;
	});

	$("ul#navigationMenu .reload a").click(function() {
		window.location.reload();
		return false;
	});
	
	$("ul#navigationMenu .close a").click(function() {
		window.close();
		return false;
	});

}
//增加样式
function addStyle(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
};


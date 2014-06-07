// ==UserScript==
// @name           goToTop+refresh+close tab
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/115965
// @include        *
// @author         anran k.yuan@yahoo.cn
// @date           2011/6/24
// @require        http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==

//----各种参数----//
var SmoothScrolling = true; 		//是否开启平滑滚动
var speedOfGoToTop = 1000;			//滚动到顶部的速度
var speedOfGoToBottom = 1000;		//滚动到底部的速度

//----脚本开始----//
init();
function init() {
	if(window != window.top)
		return;
		
	//设置样式
	var css = "\
		ul#navigation {\
			position: fixed;\
			margin: 0px;\
			padding: 0px;\
			top: 20%;\
			left: 0px;\
			list-style: none;\
			z-index:9999;\
		}\
		ul#navigation li {\
			width: 65px;\
		}\
		ul#navigation li a {\
			display: block;\
			margin-top:1px;\
			width: 65px;\
			height: 62px;\
			background: no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);\
			border-radius:5px 0 0 5px;\
			-moz-border-radius:0px 10px 10px 0px;\
			-moz-box-shadow: 0px 4px 3px #000;\
			opacity: 0.9;\
			filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);\
		}\
		/**图标自定义*/\
		ul#navigation .goToTop a{\
			background-image: url(\"data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=\");\
		}\
		ul#navigation .goToBottom a      {\
			background-image: url(\"data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==\");\
		}\
		ul#navigation .gorefresh a      {\
			background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASWSURBVEhL3VVbaBxlFI61arWxVmybmlpLvRAQiX1QUIt9KQh98EWo4AVKKgTSsolJW9rgw0+abG6bvU+Smb3Nzkyazd5nk83eN5PsbpKd3Q0imDx5g0aFRoT0QR9SiOds3O1uGmTBNxcO/+xwzv+d853vnKmr+9/9tJZkk96e/IWeTG2bnJlts3OxbJQgbRNC9hF96JDSGjqq1AUaXC7X47WTsL39GCGuJ/uZ+DtWT/YPXixsVZp5anHrEpEOUKx03OLMNDGO9AWtNfZpHxU8UwexNQEpzYkGIy85WZ/8Jx8oVBnjzPx1TRU9SE0kT9kDK828P/cR689+CdW2D5lCnxNWOvCvICoegvm5lM2dvc/585uQfZUxU+n7V4irXmeJvmmeWjrL+woXwecqAF03uTJk2BRRIAN7giC3ejaps3mWNwQxf69kvJi7x3rlDTxNjvTvCECMYmMfPfv2KC+12DzZbt6f7wGQAdNURj9Iz7bsSdewOdEMGd7lxPxdoKZ42rzyOuNI/aBjJTU9mV4bv5P6rQgAWeL5tSp4SmOJdVhcS3rOnzNyvjwzNjEv9FOR16qqwOw11kQ/ZP+jEMh/j4bPBi7p7taFmq+Q4PEeKnRea4utdqqdTxeVRKT9rWT6ma/6wi/q2KTa5pE5QSzwVveSQ0WH29GnDNLKFJ6AchfsvvwqOH1n9+ZWR4X5cGffzInLQ+KzqJzWwfhzvaOR9xX60FOlwIsgUQTpG5u9AHIWoXI355M9Ri4p4J1lgBtwCe1Y+JYP5AtoFufSN0o6/DEqpphJUb7SfrwcL60sH993KwMNtCMV48X8DNr45EL8JiRU9oPMToLUcqCIDBroWwbQRgyu4nIvrcO7Dq3/MDOZXhAChTgaPt8ej72+E/uPA30nlSo5QDZzRBU9VtPwQPzwePQsUJQtJYjJEl385XI88mjg5px2f24G5OkH58AAHTy3F8CILXKysioVDh4neew+eQXpBTWtUBPzi0hvOR6bOMhErlvdyy7gUIAp5gxscrCyoXgp8q+xRqUhS7gJ/xNKqtezc0YYzDUUBxrMxZrGGjei2qpURECOYxMLHOfL0TBUBgAzaNi4YpB52CwEpCakVRBEwcDOtUMzCyhn8C9KG0+TM/2Tko6dr5poVAoOzgAdajM7M1qcSii11+Ze7oENekttCr07wkwfQSppR/pXSGIdqlzHE4eyZLAg17XWhF1BQod2q60OdXtN5T2mMkVvWGCvwPjfhH50cX5ZAcPzicYW/gABcF1UrpLSM+vJblC8JN/SBF8pUrtbcVgF9qJTPXMCKvkCVNVl9chtUHaLMJ3/cNSegIl21ePC270EWW9ukxLm5duGyFuYRNUUVw/NDkgH8R8m2uAZjTl+CSj5DHb/ewY+ehqVgSt79xq3eZc3e6noOUzgEWoeWa1Q2g5d0YNdI9NHiF58A2g73W/0vYDvjJz0wAQfnoeW2RqfTD3Q2RM/D9PJV2uanZ3VQPYhEFoxK3iH1SmUoaPQxJcq7SoRG9sGgs8XlVPrl61cWUUAgmIDkedKQ83vtadq+oT+V6e/Ae0hbAGk9GMRAAAAAElFTkSuQmCC\");\
		}\
		/**/\
		ul#navigation .goclose a      {\
			background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFBSURBVEhLY2BgYOAAYtWkpKQAEA3EnEBMDmAEauIBYnWoWYpANhvIINXr168/+g8EFy5ceKChoeEKVUiKJSDDBZydncPv3LnzGmTW4cOHzwPF5Bny8/MjQQIwcO3atRdAS9xIsARsuKOjY+SjR48+wcz5/fv3PyMjIwuQKzVgtpJhCVbDQeacOHHiJtBsBZAFPCCvIdsOUkCET3AaDtKrqanpDItPvApxBBcxeriRI5EYDaAUAgKkqEVJKMRo5AXqEESPUCKDlLDrlJSUgqytrZPIiC/ifALMJ+/v37//lcJkjd8n1DAc5h1QnAgCgyT53r1735ANhub6d8rKygFANaB4IQvQ1AKcKYoaQYTTcGpEMt68QGkypWlGI8ZwsosKUgxHTsIYdQBakQEv7GheXNO2wqFHlUnbSh8YazRttgAAhJ8x2ieayLwAAAAASUVORK5CYII=\");\
		}\
		ul#navigation .rssfeed a   {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/rss.png);\
		}\
		ul#navigation .photos a     {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/camera.png);\
		}\
		ul#navigation .contact a    {\
			background-image: url(http://tympanus.net/Tutorials/FixedNavigationTutorial/images/mail.png);\
		}*/\
		";
		
	addStyle(css);
	
	//添加面板 ,配置是否可见及排序
	$(document.body).append('\
			<ul id="navigation">\
	            <li class="goToTop"><a href=javascript:void(0); title="跳转到顶部"></a></li>\
	            <li class="goToBottom"><a href=javascript:void(0); title="跳转到底部"></a></li>\
	            <li class="gorefresh"><a href=javascript:void(0); title="刷新"></a></li>\
	            <li class="goclose"><a href=javascript:void(0); title="关闭标签"></a></li>\
	            <!--不需要的图标请放到下面\
	            <li class="photos"><a href=javascript:void(0); title="Photos"></a></li>\
	            <li class="rssfeed"><a href=javascript:void(0); title="Rss Feed"></a></li>\
	            <li class="contact"><a href=javascript:void(0); title="Contact"></a></li>\
	            -->\
        	</ul>')
        	
	//自动隐藏
	$('#navigation a').stop().animate({
		'marginLeft' : '-55px'
	}, 1000);
	$('#navigation > li').hover(function() {
		$('a', $(this)).stop().animate({
			'marginLeft' : '-2px'
		}, 200);
	}, function() {
		$('a', $(this)).stop().animate({
			'marginLeft' : '-55px'
		}, 200);
	});
	
	//功能
	$html = $('html,body').eq(0);
	
	$("ul#navigation .goToTop a").click(function() {

		if(SmoothScrolling) {
			$html.animate({
				scrollTop : 0
			}, speedOfGoToTop);
		} else {
			scroll(0, 0);
		}
		return false;
	});
	
	$("ul#navigation .goToBottom a").click(function() {

		if(SmoothScrolling) {
			$html.animate({
				scrollTop : document.body.clientHeight
			}, speedOfGoToBottom);
		} else {
			scroll(0, document.body.clientHeight);
		}
		return false;
	});

	$("ul#navigation .gorefresh a").click(function(){
		window.location.reload();
	});
	$("ul#navigation .goclose a").click(function(){
		window.close();
	});
}
//增加样式
function addStyle(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
};


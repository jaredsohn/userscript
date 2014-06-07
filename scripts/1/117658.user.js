// ==UserScript==
// @name         easy to use firefox&left without dict
// @author       k.yuan
// @namespace    http://tieba.baidu.com/f?kw=firefox
// @description  easy to use firefox
// @version	 	 2.7
// @include      *
// @exclude	     http://g.mozest.com/*
// @exclude      http://www.google.com/reader/*
// @exclude      http://www.google.com/
// @exclude	     http://mail.*
// @exclude	     https://mail.*
// @require      http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==
var scroll_speed = 500;//The smaller, the faster.When you click the button, it works.
var move_speed = 50;//The smaller, the faster. When your mouse moves on the button, it works.
var toumingc_control = 1;//If you don't want to get the opacity(tou'ming in Chinese) changed, set it to 0;

//if(/https?:\/\/twitter\.com/i.test(window.location.href)) document.getElementById("doc").style.position = "static";

//////////////////////////////////////////////

function create_button() {
	if(document.body){
		var a = document.createElement('span');
		var b = document.createElement('span');
		var c = document.createElement('span');
		var d = document.createElement('span');
		a.id = "shang";
		b.id = "xia";
		c.id = "cl";
		d.id = "sh";
		var css_a ='opacity:1;-moz-transition-duration:0.2s;background:url(data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=) no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:0 5px 5px 0;cursor:pointer;height:36px;margin-top:-24px;width:36px;position:fixed;left:0;bottom:47%;z-index:999';
		var css_b ='opacity:1;-moz-transition-duration:0.2s;background:url(data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==) no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:0 5px 5px 0;cursor:pointer;height:36px;margin-top:-24px;width:36px;position:fixed;left:0;top:45%;z-index:999';
		var css_c ='opacity:1;-moz-transition-duration:0.2s;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFBSURBVEhLY2BgYOAAYtWkpKQAEA3EnEBMDmAEauIBYnWoWYpANhvIINXr168/+g8EFy5ceKChoeEKVUiKJSDDBZydncPv3LnzGmTW4cOHzwPF5Bny8/MjQQIwcO3atRdAS9xIsARsuKOjY+SjR48+wcz5/fv3PyMjIwuQKzVgtpJhCVbDQeacOHHiJtBsBZAFPCCvIdsOUkCET3AaDtKrqanpDItPvApxBBcxeriRI5EYDaAUAgKkqEVJKMRo5AXqEESPUCKDlLDrlJSUgqytrZPIiC/ifALMJ+/v37//lcJkjd8n1DAc5h1QnAgCgyT53r1735ANhub6d8rKygFANaB4IQvQ1AKcKYoaQYTTcGpEMt68QGkypWlGI8ZwsosKUgxHTsIYdQBakQEv7GheXNO2wqFHlUnbSh8YazRttgAAhJ8x2ieayLwAAAAASUVORK5CYII=) no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:0 5px 5px 0;cursor:pointer;height:36px;margin-top:-24px;width:36px;position:fixed;left:0;bottom:35%;z-index:999';
		var css_d ='opacity:1;-moz-transition-duration:0.2s;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASWSURBVEhL3VVbaBxlFI61arWxVmybmlpLvRAQiX1QUIt9KQh98EWo4AVKKgTSsolJW9rgw0+abG6bvU+Smb3Nzkyazd5nk83eN5PsbpKd3Q0imDx5g0aFRoT0QR9SiOds3O1uGmTBNxcO/+xwzv+d853vnKmr+9/9tJZkk96e/IWeTG2bnJlts3OxbJQgbRNC9hF96JDSGjqq1AUaXC7X47WTsL39GCGuJ/uZ+DtWT/YPXixsVZp5anHrEpEOUKx03OLMNDGO9AWtNfZpHxU8UwexNQEpzYkGIy85WZ/8Jx8oVBnjzPx1TRU9SE0kT9kDK828P/cR689+CdW2D5lCnxNWOvCvICoegvm5lM2dvc/585uQfZUxU+n7V4irXmeJvmmeWjrL+woXwecqAF03uTJk2BRRIAN7giC3ejaps3mWNwQxf69kvJi7x3rlDTxNjvTvCECMYmMfPfv2KC+12DzZbt6f7wGQAdNURj9Iz7bsSdewOdEMGd7lxPxdoKZ42rzyOuNI/aBjJTU9mV4bv5P6rQgAWeL5tSp4SmOJdVhcS3rOnzNyvjwzNjEv9FOR16qqwOw11kQ/ZP+jEMh/j4bPBi7p7taFmq+Q4PEeKnRea4utdqqdTxeVRKT9rWT6ma/6wi/q2KTa5pE5QSzwVveSQ0WH29GnDNLKFJ6AchfsvvwqOH1n9+ZWR4X5cGffzInLQ+KzqJzWwfhzvaOR9xX60FOlwIsgUQTpG5u9AHIWoXI355M9Ri4p4J1lgBtwCe1Y+JYP5AtoFufSN0o6/DEqpphJUb7SfrwcL60sH993KwMNtCMV48X8DNr45EL8JiRU9oPMToLUcqCIDBroWwbQRgyu4nIvrcO7Dq3/MDOZXhAChTgaPt8ej72+E/uPA30nlSo5QDZzRBU9VtPwQPzwePQsUJQtJYjJEl385XI88mjg5px2f24G5OkH58AAHTy3F8CILXKysioVDh4neew+eQXpBTWtUBPzi0hvOR6bOMhErlvdyy7gUIAp5gxscrCyoXgp8q+xRqUhS7gJ/xNKqtezc0YYzDUUBxrMxZrGGjei2qpURECOYxMLHOfL0TBUBgAzaNi4YpB52CwEpCakVRBEwcDOtUMzCyhn8C9KG0+TM/2Tko6dr5poVAoOzgAdajM7M1qcSii11+Ze7oENekttCr07wkwfQSppR/pXSGIdqlzHE4eyZLAg17XWhF1BQod2q60OdXtN5T2mMkVvWGCvwPjfhH50cX5ZAcPzicYW/gABcF1UrpLSM+vJblC8JN/SBF8pUrtbcVgF9qJTPXMCKvkCVNVl9chtUHaLMJ3/cNSegIl21ePC270EWW9ukxLm5duGyFuYRNUUVw/NDkgH8R8m2uAZjTl+CSj5DHb/ewY+ehqVgSt79xq3eZc3e6noOUzgEWoeWa1Q2g5d0YNdI9NHiF58A2g73W/0vYDvjJz0wAQfnoeW2RqfTD3Q2RM/D9PJV2uanZ3VQPYhEFoxK3iH1SmUoaPQxJcq7SoRG9sGgs8XlVPrl61cWUUAgmIDkedKQ83vtadq+oT+V6e/Ae0hbAGk9GMRAAAAAElFTkSuQmCC) no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:0 5px 5px 0;cursor:pointer;height:36px;margin-top:-24px;width:36px;position:fixed;left:0;bottom:41%;z-index:999';
		a.style.cssText = css_a;
		b.style.cssText = css_b;
		c.style.cssText = css_c;
		d.style.cssText = css_d;

		a.addEventListener('click', function(){ $("html,body").animate({scrollTop:0},scroll_speed); }, false);
		b.addEventListener('click', function(){ $("html,body").animate({scrollTop:$(document).height()},scroll_speed); }, false);
		c.addEventListener('click', function(){ window.close();}, false);
		d.addEventListener('click', function(){ window.location.reload();}, false);

		if(toumingc_control){
		$(window).scroll(function(){
			if($(window).scrollTop()){
				a.style.display = "";
			}
			else{
				a.style.display ="none";
			}
			a.style.opacity=($(window).scrollTop())/($(document).height()-$(window).height());
			b.style.opacity=1 - ( a.style.opacity );
		});
		}
		document.body.appendChild(a);
		document.body.appendChild(b);
		document.body.appendChild(c);
		document.body.appendChild(d);
	}
};
if(window != window.top) return 0;
if($(document).height()-$(window).height())	create_button();
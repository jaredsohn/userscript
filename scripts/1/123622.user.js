// ==UserScript==
// @name           GoToTop[modified]
// @version        v20120214
// @author         anran
// @date           2012/02/14
// @description    浮动功能面板添加向下向下滚动等快捷功能。
// @namespace      http://userscripts.org/scripts/show/123622
// @updateURL      https://userscripts.org/scripts/source/123622.meta.js
// @include        *
// @exclude        http://dzh.mop.com/*
// @exclude        https://mail.google.com/*
// @exclude        https://www.google.com/reader/*
// ==/UserScript==

(function(){

	if (window != window.top) return;

	var Img1 = "url\(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEZJREFUGNNj6IABBgQLB2BME4CyxDoSIQymio52BTBLHaixCMRgrgCy2g2ALAuwac0MDCxQgx0YIqCsVhTbOIBUA9gUslkA7dcxR/3Xli8AAAAASUVORK5CYII=);";
	var Img2 = "url\(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAE1JREFUGNNjYGDg6OjoaGAAAfJZHTDAEAFltDKwQFkODAwWYEYzUCFzBZDRbgDSqw5kFYFNYaroaFcAsxjEOhIhDAbGNAEGHABhG5wFAH6qMUfw6SaOAAAAAElFTkSuQmCC);";
	var Img3 = "url\(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASWSURBVEhL3VVbaBxlFI61arWxVmybmlpLvRAQiX1QUIt9KQh98EWo4AVKKgTSsolJW9rgw0+abG6bvU+Smb3Nzkyazd5nk83eN5PsbpKd3Q0imDx5g0aFRoT0QR9SiOds3O1uGmTBNxcO/+xwzv+d853vnKmr+9/9tJZkk96e/IWeTG2bnJlts3OxbJQgbRNC9hF96JDSGjqq1AUaXC7X47WTsL39GCGuJ/uZ+DtWT/YPXixsVZp5anHrEpEOUKx03OLMNDGO9AWtNfZpHxU8UwexNQEpzYkGIy85WZ/8Jx8oVBnjzPx1TRU9SE0kT9kDK828P/cR689+CdW2D5lCnxNWOvCvICoegvm5lM2dvc/585uQfZUxU+n7V4irXmeJvmmeWjrL+woXwecqAF03uTJk2BRRIAN7giC3ejaps3mWNwQxf69kvJi7x3rlDTxNjvTvCECMYmMfPfv2KC+12DzZbt6f7wGQAdNURj9Iz7bsSdewOdEMGd7lxPxdoKZ42rzyOuNI/aBjJTU9mV4bv5P6rQgAWeL5tSp4SmOJdVhcS3rOnzNyvjwzNjEv9FOR16qqwOw11kQ/ZP+jEMh/j4bPBi7p7taFmq+Q4PEeKnRea4utdqqdTxeVRKT9rWT6ma/6wi/q2KTa5pE5QSzwVveSQ0WH29GnDNLKFJ6AchfsvvwqOH1n9+ZWR4X5cGffzInLQ+KzqJzWwfhzvaOR9xX60FOlwIsgUQTpG5u9AHIWoXI355M9Ri4p4J1lgBtwCe1Y+JYP5AtoFufSN0o6/DEqpphJUb7SfrwcL60sH993KwMNtCMV48X8DNr45EL8JiRU9oPMToLUcqCIDBroWwbQRgyu4nIvrcO7Dq3/MDOZXhAChTgaPt8ej72+E/uPA30nlSo5QDZzRBU9VtPwQPzwePQsUJQtJYjJEl385XI88mjg5px2f24G5OkH58AAHTy3F8CILXKysioVDh4neew+eQXpBTWtUBPzi0hvOR6bOMhErlvdyy7gUIAp5gxscrCyoXgp8q+xRqUhS7gJ/xNKqtezc0YYzDUUBxrMxZrGGjei2qpURECOYxMLHOfL0TBUBgAzaNi4YpB52CwEpCakVRBEwcDOtUMzCyhn8C9KG0+TM/2Tko6dr5poVAoOzgAdajM7M1qcSii11+Ze7oENekttCr07wkwfQSppR/pXSGIdqlzHE4eyZLAg17XWhF1BQod2q60OdXtN5T2mMkVvWGCvwPjfhH50cX5ZAcPzicYW/gABcF1UrpLSM+vJblC8JN/SBF8pUrtbcVgF9qJTPXMCKvkCVNVl9chtUHaLMJ3/cNSegIl21ePC270EWW9ukxLm5duGyFuYRNUUVw/NDkgH8R8m2uAZjTl+CSj5DHb/ewY+ehqVgSt79xq3eZc3e6noOUzgEWoeWa1Q2g5d0YNdI9NHiF58A2g73W/0vYDvjJz0wAQfnoeW2RqfTD3Q2RM/D9PJV2uanZ3VQPYhEFoxK3iH1SmUoaPQxJcq7SoRG9sGgs8XlVPrl61cWUUAgmIDkedKQ83vtadq+oT+V6e/Ae0hbAGk9GMRAAAAAElFTkSuQmCC);";

	// 0.55/ 0.533/0.699
	var Style = 'Style = "Z-index:999; display:block; opacity:0.699; background-color:rgba(0,0,0,1); cursor:pointer; width:41px; height:48px; margin-top:-24px; position:fixed; right:0; background-position:50% 50%; background-repeat:no-repeat; border-bottom-left-radius:5px; border-top-left-radius:5px; background-image:';
	var Src1 = '<a id="Go-To-Top" '    + Style + Img1 + ' top:44%;"></a>';
	var Src2 = '<a id="Go-To-Bottom" ' + Style + Img2 + ' top:51%;"></a>';
	var Src3 = '<a id="Go-To-ReLoad" ' + Style + Img3 + ' top:58%;"></a>';
	var div = document.createElement("div");
	div.innerHTML = Src1 + Src2 + Src3;
	div.setAttribute("id", "Go_To_Top");
	document.getElementsByTagName("body")[0].appendChild(div);

	// Twitter修复
	//if (/https?:\/\/twitter\.com/i.test(window.location.href))
	//	document.getElementById("doc").style.position = "static";

	document.getElementById("Go-To-Top").addEventListener("click", function(event){
		scroll(0, 0);
	}, false);
	document.getElementById("Go-To-Bottom").addEventListener("click", function(event){
		scroll(0, 999999);
	}, false);
	document.getElementById("Go-To-ReLoad").addEventListener("click", function(event){
		window.location.reload();
	}, false);

})();
// ==UserScript==
// @name           mysave.in
// @description    从mysave.in获取图片共享链接
// @include        http://mysave.in/v1/users.php?act=gallery*
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2012.8.25
// @grant          none
// ==/UserScript==

var allImg = $("[type='checkbox']");
var myText = "";
for (i = 0; i < allImg.length; i++) {
	majaa = "http://mysave.in/v1/images/" + allImg[i].value;
	imganch = "[img]" + majaa + "[/img]";
	myText += ((myText == "") ? "" : "\r\n\r\n") + imganch;
}
var newLi1 = $("<li>").appendTo($(".jd_menu"));
$("<span>", {
	class : "button1",
	html : "获取链接",
	click : gowork
}).appendTo(newLi1);
var newLi2 = $("<li>").css({
		"position" : "relative",
		"top" : "-15px"
	}).appendTo($(".jd_menu"));
$("<textarea>", {
	id : "myNewText",
	rows : "2",
	cols : "70",
	html : myText,
	readonly : "readonly",
	click : function () {
		$(this).select();
	}
}).appendTo(newLi2)

function gowork() {
	var myText = "";
	var myText2 = "";
	for (i = 0; i < allImg.length; i++) {
		majaa = "http://mysave.in/v1/images/" + allImg[i].value;
		imganch = "[img]" + majaa + "[/img]";
		myText += ((myText == "") ? "" : "\r\n\r\n") + imganch;
		if (allImg[i].checked) {
			myText2 += ((myText2 == "") ? "" : "\r\n\r\n") + imganch;
		}
	}
	$("#myNewText").val((myText2 == "") ? myText : myText2);
}

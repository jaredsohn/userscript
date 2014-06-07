// ==UserScript==
// @name           Google Storage
// @include        https://storage.cloud.google.com/*
// @description    从Google Storage获取图片共享链接
// @author         congxz6688
// @require        http://code.jquery.com/jquery-latest.min.js
// @version        2012.10.12
// @updateURL      https://userscripts.org/scripts/source/85159.meta.js
// @downloadURL    https://userscripts.org/scripts/source/85159.user.js
// ==/UserScript==


var cssStyle = "";
cssStyle += "#logo {margin : 1px 0px 5px 0px;}";
cssStyle += "#logo>a {float: left; margin : 14px 0px 0px 10px;}";
cssStyle += "#logo>a>span,.file-path {display:none;}";
cssStyle += "td.file-name>a {display:inline ;}";
cssStyle += "td.file-name {cursor:default;}";
GM_addStyle(cssStyle);

var myUl = $("h1").get(0);
$("<input>", {
	type : "button",
	title : "支持复选\r\n\r\n全空＝全选\r\n\r\n点击之后内容按选定更新",
	val : "一点共享\r\n再点取链",
	click : gowork
}).css({
	float : "left",
	margin : "5px 0px 0px 10px",
	padding : "12px 3px 12px 3px"
}).appendTo(myUl);

function gowork() {
	$('.check-icon.check-off').click();
	if ($('.share-link').length != 0) {
		var myText = "";
		var myText2 = "";
		var myText3 = "";
		var myText4 = "";
		var mymount1 = 0;
		var mymount2 = 0;
		var demainn = "";
		$('.share-link').each(function (i) {
			if (this.href.search(/com\/(.*\.){2,4}.*?\//) != -1) {
				ssss = unescape(this.href.replace(/commondatastorage\.googleapis\.com\//, ""));
				demainn = "（已转换绑定域名）";
			} else {
				ssss = unescape(this.href);
			}
			if (this.href.match(/\.jpg|\.png|\.bmp|\.gif|\.jpeg/i) != null) {
				imganch = "[img]" + ssss + "[/img]";
				imganch2 = "<img src='" + ssss + "' />";
				if (this.parentNode.parentNode.childNodes[0].childNodes[0].checked) {
					myText += ((myText == "") ? "" : "\r\n\r\n") + imganch;
					myText2 += ((myText2 == "") ? "" : "<br><br>\r\n\r\n") + imganch2;
					myText3 += ((myText3 == "") ? "" : "\r\n\r\n") + imganch;
					myText4 += ((myText4 == "") ? "" : "<br><br>\r\n\r\n") + imganch2;
					
					mymount1++
					mymount2++
				} else {
					myText += ((myText == "") ? "" : "\r\n\r\n") + imganch;
					myText2 += ((myText2 == "") ? "" : "<br><br>\r\n\r\n") + imganch2;
					mymount2++
				}
			}
			if (this.parentNode.parentNode.childNodes[1].lastChild.tagName != "A") {
				this.parentNode.parentNode.childNodes[1].removeChild(this.parentNode.parentNode.childNodes[1].lastChild);
			}
			var Newdivv = $("<span>", {
					html : "directUrl: "
				}).css({
					float : "right"
				}).appendTo(this.parentNode.parentNode.childNodes[1]);
			$("<input>", {
				type : "text",
				size : "40",
				val : ssss,
				click : function () {
					$(this).select();
				}
			}).attr({
				readonly : "readonly"
			}).appendTo(Newdivv);
		})
		
		var checktextArea = $("#myNewText")[0];
		if (!checktextArea) {
			var ppp = "本页共" + mymount2 + "张共享图片，已选定" + ((mymount1 == 0) ? mymount2 : mymount1) + "张，其链接都在这里： " + demainn;
			var Newtable = $("<table>").appendTo(myUl);
			var Newtr1 = $("<tr>").appendTo(Newtable);
			var Newth = $("<td>", {
					id : "newth",
					html : ppp,
					colspan : "2"
				}).css({
					"font-size" : "60%",
					"text-indent" : "1em"
				}).appendTo(Newtr1);
			var Newtr2 = $("<tr>").appendTo(Newtable);
			var Newtd1 = $("<td>").appendTo(Newtr2);
			var Newtd2 = $("<td>").appendTo(Newtr2);
			$("<textarea>", {
				id : "myNewText",
				rows : "1",
				cols : "32",
				html : ((myText3 == "") ? myText : myText3),
				click : function () {
					$(this).select();
				}
			}).attr({
				readonly : "readonly"
			}).css({
				margin : "0px 0px 0px 10px"
			}).appendTo(Newtd1);
			$("<textarea>", {
				id : "myNewText2",
				rows : "1",
				cols : "32",
				html : ((myText4 == "") ? myText2 : myText4),
				click : function () {
					$(this).select();
				}
			}).attr({
				readonly : "readonly"
			}).css({
				margin : "0px 0px 0px 10px"
			}).appendTo(Newtd2);
		} else {
			$("#myNewText").val((myText3 == "") ? myText : myText3);
			$("#myNewText2").val((myText4 == "") ? myText2 : myText4);
			var ppp = "本页共" + mymount2 + "张共享图片，已选定" + ((mymount1 == 0) ? mymount2 : mymount1) + "张，其链接都在这里： " + demainn
				$("#newth").html(ppp);
		}
	} else {
		if ($("#myNewText")) {
			$("#myNewText").val("");
			$("#myNewText2").val("");
			ppp = "本页没有共享图片"
				$("#newth").html(ppp);
		}
	}
}
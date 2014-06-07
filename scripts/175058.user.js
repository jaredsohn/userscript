// ==UserScript==
// @name         CTD_mark
// @namespace    http://ctrlc.123.st/
// @version      1.0
// @description  Thêm liên kết đánh dấu trạng thái theo dõi truyện
// @include      http://truyen.vnsharing.net/Truyen/*
// @match        http://truyen.vnsharing.net/Truyen/*
// @copyright    2013+, baivong
// @icon         http://imageshack.us/scaled/modthumb/843/jbdu.png
// ==/UserScript==

var b_CTD = {
	setdata: function (a, c) {
		for (var b = "{", f = a.length, d = 0; d < f; d++) {
			var h = a.eq(d).attr("href").match(/\/Truyen\/([^\?]+)\?id/)[1],
				e = c.eq(d),
				k = e.attr("bdid"),
				g = 1;
			"none" == e.css("display") && (g = 0);
			e = ",";
			d == f - 1 && (e = "}");
			b = b + '"' + h + '":{"i":"' + k + '","r":"' + g + '"}' + e
		}
		localStorage.vnsTruyen = b
	},
	update: function () {
		var a = JSON.parse(localStorage.vnsTruyen)[location.pathname.slice(8)];
		$("#quickmark").html('<span style="color:#FF2DF0">\u0110\u00e1nh d\u1ea5u: </span><a bdid="' + a.i + '" style="display: none" class="aRead" href="#" onclick="return false;" title="Click \u0111\u1ec3 \u0111\u00e1nh d\u1ea5u ch\u01b0a \u0111\u1ecdc"><img style="vertical-align:middle" src="/Content/Images/include.png" border="0" /> \u0110\u00e3 \u0111\u1ecdc</a><a bdid="' +
			a.i + '" style="display: inline" class="aUnRead" href="#" onclick="return false;" title="Click \u0111\u1ec3 \u0111\u00e1nh d\u1ea5u \u0111\u00e3 \u0111\u1ecdc"><img style="vertical-align:middle" src="/Content/Images/notread.png" border="0" /> Ch\u01b0a \u0111\u1ecdc</a><img class="imgLoader" src="../../Content/images/loader.gif" style="display: none" />');
		1 == a.r && $(".aRead,.aUnRead").toggle();
		$("#btnRemoveBookmark").click(function () {
			var a = localStorage.vnsTruyen,
				a = a.replace('"' + location.pathname.slice(8) +
					'"', '"?"'),
				a = a.replace('"' + $(".aRead").attr("bdid") + '"', '"?"'),
				a = a.replace(/"\?"\:\{"i"\:"\?"\,"r"\:"(0|1)"}\,?/, "");
			localStorage.vnsTruyen = a;
			$("#quickmark").empty()
		})
	},
	getdata: function () {
		$.get("/TheoDoi", function (a) {
			b_CTD.setdata($(a).find(".aManga"), $(a).find(".aRead"));
			return b_CTD.update()
		})
	}
};
$(function () {
	$("#spanBookmarkRemove").parent().after('<p id="quickmark"></p>');
	$("#spanBookmarkRemove").length && "none" != $("#spanBookmarkRemove").css("display") && ($("#quickmark").html('<img class="imgLoader" src="../../Content/images/loader.gif" />'), void 0 != localStorage.vnsTruyen ? void 0 != JSON.parse(localStorage.vnsTruyen)[location.pathname.slice(8)] ? b_CTD.update() : b_CTD.getdata() : b_CTD.getdata());
	$("#btnAddBookmark").click(function () {
		$("#quickmark").html('<img class="imgLoader" src="../../Content/images/loader.gif" />');
		b_CTD.getdata()
	});
	$(".aRead,.aUnRead").live("click", function () {
		var a = $(this);
		$(".aRead,.aUnRead").hide();
		$(".imgLoader").show();
		var c = 0;
		m = 1;
		"aUnRead" == a.attr("class") && (c = 1, m = 0);
		var b = localStorage.vnsTruyen,
			b = b.replace('"' + $(".aRead").attr("bdid") + '","r":"' + m + '"', function (a) {
				return a.replace(/"(0|1)"/, '"' + c + '"')
			});
		localStorage.vnsTruyen = b;
		$.ajax({
			type: "POST",
			url: "/Manga/MarkBookmarkDetail",
			data: "bdid=" + $(this).attr("bdid") + "&strAlreadyRead=" + c,
			success: function (b) {
				"" != b ? (a.hide(), a.siblings().show(),
					$(".imgLoader").hide()) : $("#quickmark").text("C\u00f3 l\u1ed7i x\u1ea3y ra")
			}
		})
	})
});
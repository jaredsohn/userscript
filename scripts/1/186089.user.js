// ==UserScript==
// @name         Edit Prefix
// @namespace    http://devs.forumvi.com/
// @version      0.1
// @description  Thêm hoặc sửa tiền tố vào tiêu đề theo tên diễn đàn con
// @match        http://*/f*
// @copyright    2013+, Zzbaivong
// @run-at       document-end
// ==/UserScript==

$(function () {
	$(".tcr a[href^='/t']").attr("href", function () {
		return "/post?p=" + this.href.replace(/.+\#(\d+)/, "$1") + "&mode=editpost"
	}).text("[ Thêm tiền tố ]").css("float", "right").click(function (d) {
		d.preventDefault();
		var b = this;
		$.post(b.href, function (a) {
			a = $(a);
			var c = "[" + $(".nav[href^='/f']:last").text() + "] " + $.trim(a.find("#modif_topic_title").val().replace(/\[([^\[\]])+\]/g, ""));
			$.post(b.href, {
                subject: c,
                modif_topic_title: c,
                message: a.find("#text_editor_textarea").val(),
                post: "Send"
            },
            function (a) {
                $(a).find(".message a[href^='/t']").length ? $(b).closest("tr").fadeOut(300) : alert("Xảy ra lỗi!")
            })
		})
	})
});
// ==UserScript==
// @name			v2ex-login-mission
// @namespace		http://mutoo.im/
// @description		auto-receives the login-mission-awards
// @match			*://*.v2ex.com/
// ==/UserScript==

var load, execute, loadAndExecute;
load = function(a, b, c) {
	var d;
	d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d);
	return d
}, execute = function(a) {
	var b, c;
	typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
	return c
}, loadAndExecute = function(a, b) {
	return load(a, function() {
		return execute(b)
	})
};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js", function() {
	var daily = $('a[href="/mission/daily"]');
	if (daily.length) {
		daily.text("正在领取今日的登录奖励...");
		$.ajax({
			url: "/mission/daily",
			success: function(data) {
				var awards = $(data).find('input[value^="领取"]');
				if (awards.length) {
					daily.text("正在" + awards.attr("value") + "...");
					$.ajax({
						url: awards.attr('onclick').match(/(?=\/).+?(?=\')/),
						success: function(data) {
							daily.text("成功" + awards.attr("value") + "!");
						},
						error: function() {
							daily.text("网络异常 :(");
						}
					});
				}else{
					daily.text("无法辩识领奖按钮 :(");
				}
			},
			error: function() {
				daily.text("请手动领取今日的登录奖励!");
			}
		});
	} else {
		console.log("Wish you a happy day :)");
	}
});
// ==UserScript==
// @name        youtube
// @namespace   http://
// @include     http*://*youtube.com/*
// @grant		GM_wait
// @version     1.2
// ==/UserScript==


var load, execute, loadAndExecute; load = function (a, b, c) { var d; d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d); return d }, execute = function (a) { var b, c; typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c); return c }, loadAndExecute = function (a, b) { return load(a, function () { return execute(b) }) };

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function ()
{
	//Set Logo link to subscriptions
	$("#logo-container").attr("href", "/feed/subscriptions");

	//Remove annoying google apps message
	$("div:contains('This account is managed by')").closest('#confirmBox').hide().addClass("eliminated-by-electric-sheep");

	// add show link
	$('#alerts').append("<div class='show-electric-sheep'><a href='#'>[+] show hidden content</a></div>");

	$('div.show-electric-sheep').attr("style", "background-color:#f1f1f1;padding:0.4em 1em;text-align:right;");

	$('div.show-electric-sheep').click(function ()
	{
		$('div.eliminated-by-electric-sheep').show();
		$(this).hide();
	});

});

// ==UserScript==
// @name           YA Report Spam
// @namespace      http://userscripts.org/users/judowalker
// @description    When you click on the Report Abuse link in Yahoo Answers, it will automatically report that question/answer as spam.
// @include        http://*answers.yahoo.com/question/index*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$(".report-abuse a").click(function(event) {	
	if ($(".ygmasignup").length) {
		alert("You must log in first.");
	}
	else {
		var href = $(this).attr("href");
		
		var formAction = "/answer/report";
		if (href.indexOf("/question/report") !== -1) {
			formAction = "/question/report";
		}
		
		var qid = href.substr(href.indexOf("qid=") + 4);
		qid = qid.substr(0, qid.indexOf("&"));
		var kid = href.substr(href.indexOf("kid=") + 4);
		kid = kid.substr(0, kid.indexOf("&"));
		
		var crumb = href.substr(href.indexOf("crumb=") + 6);
		if (crumb.indexOf(".") === 0) {
			crumb = crumb.substr(1);
		}
		
		if (crumb.indexOf("&") !== -1) {
			crumb = crumb.substr(0, crumb.indexOf("&"));	
		}
				
		var form = $("<form>").attr({id: "myForm", method: "post", action: formAction});
		$("<input>").attr({type: "hidden", name: "qid", value: qid}).appendTo(form);
		$("<input>").attr({type: "hidden", name: "kid", value: kid}).appendTo(form);
		$("<input>").attr({type: "hidden", name: "crumb", value: crumb}).appendTo(form);
		$("<input>").attr({type: "hidden", name: "abuse-type", value: "guidelines"}).appendTo(form);
		$("<input>").attr({type: "hidden", name: "violation-details", value: "spam"}).appendTo(form);
		
		form.appendTo($("body"));
		document.getElementById("myForm").submit();
	}
	
	event.preventDefault();
});
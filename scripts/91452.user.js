// ==UserScript==
// @name           eRep Party Spammer
// @namespace      http://userscripts.org/users/182800
// @description    Sends spam to party members
// @version        0.3
// @author         xivrox
// @include        http://www.erepublik.com/en/party/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var partySpam = new function() {
	var me		= this;
	var mailer  = "http://erep.thepenry.net/mailer.php?wmd[citizenlist]=";

	this.cp		= 1;
	this.tp		= 1;
	this.list	= "";
	this.url	= "http://www.erepublik.com/en/party-members/"+window.location.href.split("/")[5]+"/";

	this.pageList = function(p) {
		$.ajax({
			async: true,
			type: "GET",
			url: me.url + p,
			dataType: "html",
			success: function(html) {
				if (me.tp == 1) me.tp = $(html).find(".pager .last").attr("href").split("/")[4];

				window.status = "Loading page "+p+" of "+me.tp;

				$(html).find("a.nameholder").each(function(i) {
					me.list = me.list + "%23" + $(this).attr("href").split("/")[4] + "%0A";
				});

				me.cp++;

				if (me.cp <= me.tp)
					me.pageList(me.cp);
				else
					me.showGoBtn();
			}
		});
	}

	this.showGoBtn = function() {
		$('<span class="vround-btn-start goright"><span class="vround-btn-end"><a class="vround-btn-core" href="' + mailer + me.list + '" target="_blank">GO!</a></span></span>')
			.appendTo(".action:last")
			.show();
	}

	$(document).ready(function() {
		$('<h2 class="section" id="x_send_spam">Send spam</h2><div class="indent"><div class="action"></div></div>')
			.appendTo(".holder:last");
		$('<span class="vround-btn-start goright"><span class="vround-btn-end"><a class="vround-btn-core" href="#x_send_spam">Send spam</a></span></span>')
			.appendTo(".action:last")
			.click(function() {
				me.pageList(1);
			});
	});
}

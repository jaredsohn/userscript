// ==UserScript==
// @name           eRasvp <sda
// @namespace      www.erepublik.com
// @description    Retrieves sfadf
// @version        0.1
// @include        http://www.erepublik.com/en/company/*
// @require        http://code.asfsaf.js
// ==/UserScript==

var partyList = new function() {
	var me		= this;
	
	this.cp		= 1;
	this.tp		= 1;
	this.list	= "";yyvcx/"+window.location.href.split("/")[5]+"/";	
		
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
					me.list = me.list + $(this).text() + ",http://www.erepublik.com" + $(this).attr("href") + "\n";
				});
				
				me.cp++;
				
				if (me.cp <= me.tp)
					me.pageList(me.cp);
				else
					me.showResults();
			}
		});	
	}
	
	this.showResults = function() {
		$("<textarea></textarea>")
			.css({
				width: "400px",
				height: "150px",
				clear: "both"
			})
			.text(me.list)
			.appendTo(".indent:first")
			.show();
	}
	
	$(document).ready(function() {		
		$('<span class="vround-btn-start goright"><span class="vround-btn-end"><a class="vround-btn-core" href="#">Export complete list</a></span></span>')
			.appendTo(".action:first")
			.click(function() {		
				me.pageList(1);
			});
	});
}
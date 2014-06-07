// ==UserScript==
// @name       LeanKit Comments in Ticket Details
// @namespace  https://*.leankit.com/Boards/View/*
// @version    0.1
// @description  Bring the comments to the front of the ticket
// @match      https://*.leankit.com/Boards/View/*
// @copyright  2014+, Jess Telford
// ==/UserScript==

oldEdit = Card.prototype.RenderEdit
Card.prototype.RenderEdit = function(n) {
	oldEdit.apply(this, arguments);
	var t;
	this.LoadComments();
	try {
		t = $.tmpl(this.comment_template, this.Comments)
	} catch (f) {
		t = ""
	}
    // Inject the generated comments
	$("#card-settings-column2").append('<div style="clear:both; padding-top:10px;" id="injectedCommentsData"></div>');
	$("#injectedCommentsData").html(t);
    
    // Some styling fixes to account for the added height
    $("#card-settings-column2").css({"overflow-y": "scroll", "overflow-x": "hidden", height:"100%"});
    $("#basic-settings #cf-priority").css({"margin-right": "0px"});
    $("#basic-settings .cf-is-blocked").css({"float": "right"});
}
// ==UserScript==
// @name        Comment ID
// @namespace   Selbi
// @include     http*://*fimfiction.net/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var commentID = 0;

$(".reply_button").each(function(){
	commentID = $(this).attr("data-comment-id");
	$(this).before('<a title="Add comment to reply textbox" href="javascript:void();" onclick="AddQuote_NoScroll(' + commentID + ');">>>' + commentID + '</a>&nbsp;');
});

unsafeWindow.AddQuote_NoScroll = function(a){
	var field = $("#comment_entry textarea")[0];
	var text = ">>"+a+" ";

	// The following stuff was taken straight from knighty's own code.
	if (field.selectionStart || field.selectionStart == '0') 
	{
		var startPos = field.selectionStart;
		var endPos = field.selectionEnd;
		var begin = field.value.substring(0, startPos);
		var middle = ( ( endPos - startPos ) > 0 ) ? field.value.substring(startPos, endPos) : "";
		var end = field.value.substring(endPos, field.value.length);
		field.value = begin + text + end;
		field.selectionStart = startPos + text.length;
		field.selectionEnd = startPos + text.length;
	} 
	else 
	{
		field.value += text;
	}
}
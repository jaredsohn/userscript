// ==UserScript==
// @name           openwebmail keyboard shortcuts
// @namespace      openwebmail
// @include        http://*/openwebmail-main.pl*
// @include        http://*/openwebmail-read.pl*
// @include        http://*/openwebmail-send.pl*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
/* 
Openwebmail already has accessKey on those button, but you may want to just invoke directly by key:
	j = up ('select' message when in message list) 
	k = down ('select' message when in message list)
	x = check the selected message
	o = open
	3 = to trash
	r = reply
	a = replay all
	e = edit (when in draft list)
	r = refresh
	c = compose
	f = forward
	m = forward as attachment
	u = Back

I also modified the layout a bit, with send button bar below the message.
*/

var keyMap = {
	Reply: 'R',
	ReplyAll: 'A',
	Edit: 'E',
	Back: 'B',
	ToTrash: 'Z',
	Refresh: 'R',
	New: 'C',
	Forward: 'F',
	ForwardAsAttachment: 'M'
};

$(document).ready(function(){
	
	var isMain = window.location.href.match("\/openwebmail-main");
	var isRead = window.location.href.match("\/openwebmail-read");
	var isSend = window.location.href.match("\/openwebmail-send");
	var onInput = false;
	
	insertCss("tr.selectedRow {background-color:#ccc	 !important;}");
	$("table:has(:checkbox):eq(0)").attr("id", "list");
	$("#list tr:eq(1)").addClass("selectedRow");
	
	if(isSend){
		$("#body")
			.css({width:"100%",height:"20em"})
			.parents("table:eq(0)")
			.after($("td.msgbody table:eq(0)"));
	}
	
	$(document).keyup(function(e){
		if(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
		if(!$(e.target).is("textarea,:text,select")){
			var key = String.fromCharCode(e.keyCode).toLowerCase();
			
			if(isMain){
				if(key == "j"){ 
					if($("#list tr.selectedRow").next().size()>0){
						$("#list tr.selectedRow").removeClass("selectedRow").next().addClass("selectedRow");
					}
					return;
				}
				if(key == "k"){ 
					if($("#list tr.selectedRow").prev().prev().size()>0){
						$("#list tr.selectedRow").removeClass("selectedRow").prev().addClass("selectedRow");
					}
					return;
				}
				if(key == "x"){
					var box = $("#list tr.selectedRow :checkbox")[0];
					if(box) box.checked = !box.checked;
					return;
				}
				if(key == "o"){
					var url = $("#list tr.selectedRow a:last").attr("href");
					window.location.href = url;
					return;
				}
			}
			
			if(isRead){
				if(key == "r"){
					goToNavLink("Reply");
					return;
				}
				if(key == "a"){
					goToNavLink("ReplyAll");
					return;
				}
				if(key == "e"){
					goToNavLink("Edit");
					return;
				}
				if(key == 'f'){
					goToNavLink("Forward");
					return;
				}
				if(key == 'm'){
					goToNavLink("ForwardAsAttachment");
					return;
				}
			}
			
			if(isRead || isSend){
				if(key == "u"){
					goToNavLink("Back");
					return;
				}
			}
			
			if(isMain || isRead){
				if(key == "3"){ //3
					goToNavLink("ToTrash");
					return;
				}
				
				if(key == "l"){ // l or L
					$("select[name=destination]")[0].focus();
					return;
				}
				
				if(key == "g"){ // g or G
					$("select[name=folder]")[0].focus();
					return;
				}
				
				if(key == "c"){
					goToNavLink("New")
					return;
				}
				
				if(key == "u"){
					goToNavLink("Refresh");
					return;
				}
			}
		}
	});
	
});


function getNavLink(text){
	return $("table:first a[accesskey="+keyMap[text]+"]");
}

function goToNavLink(text){
	window.location.href = getNavLink(text).attr("href");
}

function insertCss(rule){
	if(!document.styleSheets[0]){
		var css = document.createElement("link");
		css.type = "text/css";
		css.rel = "stylesheet";
		css.media = "screen";
		$("head").append(css);
	}
	document.styleSheets[0].insertRule(rule, 0);
}
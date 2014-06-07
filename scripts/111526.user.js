// ==UserScript==
// @name            Inline Reddit Comments - Chrome
// @description     A script to load comments on reddit without loading another page. Comments are loaded into a region directly below the pertinent entry.
// @author          wasbazi
// @match         http://reddit.com/*
// @match         https://reddit.com/*
// @match         http://*.reddit.com/*
// @match         https://*.reddit.com/*
// ==/UserScript==
	
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', 
		function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	addHTML();
	commentToggleHandler();
	replyClickHandler();
	closeReplyClickHandler();
	
	function addHTML(){	
		$(".entry").append("<div class='replyAjax'></div>").append("<div class='commentAjax'></div");
		$(".commentAjax, .replyAjax").css({
			"overflow": "auto",
			"max-height": "300px",
		});
		$(".replyAjax").css({
			"display": "none",
			"background-color": "white",
			"border": "1px solid black",
			"border-radius": "0 0 15px 15px",
			"color": "white",
			"position": "absolute",
			"max-height": "300px",
			"width": "530px",
			"z-index": "1"
		});
	}
	function commentToggleHandler(){
		$("a.comments").toggle(
			function(){ 
				var _entry = $(this).parents("div.entry");
				var _reply = $(_entry).find(".replyAjax");
				var _commentArea = $(_reply).siblings(".commentAjax");
				if(_commentArea.data("isLoaded") == "true"){
					$(_commentArea).show();
					$(_commentArea).siblings(".openReplyForm").show();
				}else{
					$(this).css("border-bottom","1px solid red");
					var loadURL = $(this).attr("href");
					$(_commentArea).data("isLoaded","true");
					$(_commentArea).text("Loading...");
					$(_reply).load(loadURL + " .commentarea", function(){
								$(_commentArea).text("").before("<a class='openReplyForm' href=''>Reply to this post</a>");
								$(_reply).find(".nestedlisting").appendTo(_commentArea);
							});
				}
				return false;
			}, function(){
				var _reply = $(this).parents("div.entry").find(".replyAjax");
				$(_reply).find(".closeReply:visible").click();
				$(_reply).siblings(".commentAjax").hide();
				$(_reply).siblings(".openReplyForm").hide();
				$(this).css("border","none");
			}
		 );
	}
	function replyClickHandler(){
		 $(".openReplyForm").live("click",function(e){
			if(e.which == 1){
				var _reply = $(this).parents("div.entry").find(".replyAjax");
				if($(_reply).data("hasCancel") != "true"){
					$(_reply).append("<a class='closeReply' style='bottom: 10px;left: 22px;position: relative;' href=''>Close</a>");
					$(_reply).data("hasCancel","true");
				}
				$(_reply).slideDown();
				$(this).hide();
				return false;
			}
		 });
	}
	function closeReplyClickHandler(){
		 $(".closeReply").live("click",function(e){
			 if(e.which == 1){
				var _entry = $(this).parents("div.entry");
				var _reply = $(_entry).find(".replyAjax");
				$(_reply).slideUp();
				$(_entry).find(".openReplyForm").show();
				return false;
			}
		 });
	 }
}

// load jQuery and execute the main function
addJQuery(main);

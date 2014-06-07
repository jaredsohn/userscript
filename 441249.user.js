// ==UserScript==
// @name        JAVLibrary Enhancer
// @namespace   http://www.userscripts.org
// @description JAVLibrary Enhancer
// @include     http://www.javlibrary.com/*
// @version     1.8.2
// ==/UserScript==

if (1) {
	$("td.socialmedia").after('<td><button id="check_all_button" style="width:200px;" accesskey="c">Check All</button></td>');
	$("#check_all_button").on('click', function(e){
		e.preventDefault();
		// list of videos
		$('div.video').each(function(){
			//console.log($(this).attr('id'));
			var vid_id = ''; 
			var vid_link = '';
			
			if ($(this).attr('id')) 
				vid_id = $(this).attr('id').replace("vid_","");
			else {
				vid_id = $(this).children('a').attr('href').replace("./?v=","");
				//console.log("vid_"+vid_id);
				$(this).attr("id","vid_"+vid_id);
			}
			
			vid_link = 'http://www.javlibrary.com/en/?v='+vid_id; 
			//console.log(vid_link);						
			
			//$("div#vid_"+vid_id).css("border", "1px solid yellow");
			$(this).css("border", "1px solid yellow");
			
			$.get(vid_link, function(data) {

				if($("#subscribed .smalldarkbutton:not(.hidden)", data).text()) {
				//	$("div#vid_"+vid_id+" div.toolbar #"+vid_id+".icn_want").show();
					$("div#vid_"+vid_id).css("background","#FFB84D");
					//console.log("#"+vid_id+".icn_want");
				}
				
				if($("#watched .smalldarkbutton:not(.hidden)", data).text()){
					$("div#vid_"+vid_id).css("background","#7EBFFF");
				}
				if($("#owned .smalldarkbutton:not(.hidden)", data).text()){
					$("div#vid_"+vid_id).css("background","#70DB70");
				}

				var count_comments = $("table.comment", data).size();
				if (count_comments > 0){
					$("div#vid_"+vid_id).css("border", "3px solid red").prepend('<span style="position: absolute;right: 0;">'+count_comments+'</span>');
					
				} else
					$("div#vid_"+vid_id).css("border", "1px solid #CCCCCC");
			});
		});
		
		//comments page
		$('table.comment').each(function(){
			//console.log($(this).attr('id'));
			var vid_id = $(this).find("td").not(".info").find("a").first().attr('href').replace("videocomments.php?v=","").replace("&mode=2","").replace('./?v=','');
			var actVid = $(this).find("td").not(".info");
			var actImg = actVid.find('a img');
			actVid.find("a").first().attr('href',"videocomments.php?v="+vid_id);
			actImg.css("border", "1px solid yellow");

			$.get('http://www.javlibrary.com/en/?v='+vid_id, function(data) {


				if($("#subscribed .smalldarkbutton:not(.hidden)", data).text()) {
				//	$("div#vid_"+vid_id+" div.toolbar #"+vid_id+".icn_want").show();
					actVid.css("background","#FFB84D");
					//console.log("#"+vid_id+".icn_want");
				}
				
				if($("#watched .smalldarkbutton:not(.hidden)", data).text()){
					actVid.css("background","#7EBFFF");
					//console.log("#"+vid_id+".icn_watched");
				}
				if($("#owned .smalldarkbutton:not(.hidden)", data).text()){
					actVid.css("background","#70DB70");
					//console.log("#"+vid_id+".icn_own");
				}

				var count_comments = $("table.comment", data).size();
				if (count_comments > 0){
					//console.log("#"+count_comments+" comments");
					actVid.siblings('td').last().text(count_comments); //append('<span>'+count_comments+' comments</span>');
					//actImg.css("border", "3px solid red");
				} 
				actImg.css("border", "1px solid #CCCCCC");
			});
		});
		
	});
	
	$(document).keydown(function(e){
	// alt+j want
    if(e.altKey && e.keyCode == 74){
            //console.log("I've been pressed!"+e.keyCode);
			$("#subscribed button:visible").trigger('click');
    }     
	// alt+k watched	
	if(e.altKey && e.keyCode == 75){
            //console.log("I've been pressed!"+e.keyCode);
			$("#watched button:visible").trigger('click');
    }      
	// alt+l have
	if(e.altKey && e.keyCode == 76){
            //console.log("I've been pressed!"+e.keyCode);
			$("#owned button:visible").trigger('click');
      }	
	// alt+o confirm
	if(e.altKey && e.keyCode == 79){
            //console.log("I've been pressed!"+e.keyCode);
			$("div.noty_buttons button.green").trigger('click');
      }	
	// alt+c cancel
	if(e.altKey && e.keyCode == 67){
            //console.log("I've been pressed!"+e.keyCode);
			$("div.noty_buttons button.pink").trigger('click');
      }
	// alt+i focus input
	if(e.altKey && e.keyCode == 73){
            //console.log("I've been pressed!"+e.keyCode);
			$("div.noty_buttons button.pink").trigger('click');
      }  
	// alt+n new comment - in page detail, next page in lists
	if(e.altKey && e.keyCode == 78){
         //  console.log("I've been pressed!"+e.keyCode);
		   if ($("div#video_icn_comment_edit input.largebutton")) {
				$("div#video_icn_comment_edit input.largebutton").trigger('click');
				$("#video_comment_edit_text").waitUntilExists(function() {
					//console.log("loaded");
					$("#video_comment_edit_text").focus().val("Small Size Download:\n");
					
				});
			} else if($("div.page_selector a.next")) {
				//console.log("next page");	
				$("div.page_selector a.next").trigger('click');
			}
      } 
	// alt+x hide text
	if(e.altKey && e.keyCode == 88){
            //console.log("I've been pressed!"+e.keyCode);
			$("a.notehide").trigger('click');
      }  
	  
	  
	})
	
}

	$(function(){
	/*	$("input.searchbutton").unbind("click").click(function(){
			var str = $("input.txt-srch").val();
			str = str.replace(/[^a-zA-Z0-9]+/g, '');
			$("input.txt-srch").val(str).prop("value",str).attr("value",str);
			console.log($("input.txt-srch").val());
		});
		
		$("form").submit(function(e){
			e.preventDefault();
			alert('send');
			var str = $("input.txt-srch").val();
			str = str.replace(/[^a-zA-Z0-9]+/g, '');
			$("input.txt-srch").val(str).prop("value",str).attr("value",str);
			console.log($("input.txt-srch").val());
			$('form').submit();
			return false;
		});*/
		
		//clear searchbox input
		$("#idsearchbox").on("keyup", function(e){
			var str = $(this).val();
			str = str.replace(/(.*)\.[^.]+$/, "$1");
			str = str.replace(/[^a-zA-Z0-9]+/g, '');
			$(this).val(str).prop("value",str).attr("value",str);
			//console.log($(this).val());	
			if(e.which == 10 || e.which == 13) {
					this.form.submit();
			}
		});
		
		// go from comments to video page
		$("#video_comments table.comment td strong a").each(function(e) {
			comLink = $(this).attr('href').replace('videocomments.php','index.php').replace('&mode=2','');
			$(this).attr('href', comLink);
			//console.log(comLink);
		});
            
		
	});

	
;(function ($, window) {
 
var intervals = {};
var removeListener = function(selector) {
 
if (intervals[selector]) {
window.clearInterval(intervals[selector]);
intervals[selector] = null;
}
};
var found = 'waitUntilExists.found';
 
/**
* @function
* @property {object} jQuery plugin which runs handler function once specified
* element is inserted into the DOM
* @param {function|string} handler
* A function to execute at the time when the element is inserted or
* string "remove" to remove the listener from the given selector
* @param {bool} shouldRunHandlerOnce
* Optional: if true, handler is unbound after its first invocation
* @example jQuery(selector).waitUntilExists(function);
*/
$.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {
 
var selector = this.selector;
var $this = $(selector);
var $elements = $this.not(function() { return $(this).data(found); });
if (handler === 'remove') {
// Hijack and remove interval immediately if the code requests
removeListener(selector);
}
else {
 
// Run the handler on all found elements and mark as found
$elements.each(handler).data(found, true);
if (shouldRunHandlerOnce && $this.length) {
// Element was found, implying the handler already ran for all
// matched elements
removeListener(selector);
}
else if (!isChild) {
// If this is a recurring search or if the target has not yet been
// found, create an interval to continue searching for the target
intervals[selector] = window.setInterval(function () {
$this.waitUntilExists(handler, shouldRunHandlerOnce, true);
}, 500);
}
}
return $this;
};
}(jQuery, window));
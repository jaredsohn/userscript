// ==UserScript==
// @id             Read to me
// @name           Read to me
// @version        1.0
// @namespace      test
// @author         SEGnosis
// @description    Reads to you
// @include        *
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.7.1.js
// ==/UserScript==



$(document).ready(function(){
	var speed = 50;
	var message = "";
	var index = 0;
	var keys = new Array();
	
	
	function createKey(id, time, clear){
		var ret = new Object();
		
		ret.id = id;
		ret.time = time;
		ret.clear = clear;
		
		return ret;
	}
	
	keys.push(createKey(". ", 2000, true));
	keys.push(createKey(".\r", 2000, true));
	keys.push(createKey(".\n", 2000, true));

	keys.push(createKey("? ", 2000, true));
	keys.push(createKey("?\r", 2000, true));
	keys.push(createKey("?\n", 2000, true));

	keys.push(createKey(",", 1000, false));
	keys.push(createKey(";", 1000, false));
	keys.push(createKey(":", 1000, false));
	keys.push(createKey("\"", 1000, false));

	keys.push(createKey("and ", 200, false));
	keys.push(createKey("and\r", 200, false));
	keys.push(createKey("and\n", 200, false));

	keys.push(createKey("or ", 200, false));
	keys.push(createKey("or\r", 200, false));
	keys.push(createKey("or\n", 200, false));
	
	
	
	if($("#rtm-prompt").length == 0){
		/* read to me cover */
		$("body").prepend("<div id=\"rtm-cover\" style=\"margin:0px;left:0px;top:0px;display:none;background-color:white;width:100%;height:100%;position:fixed;text-align:left;z-index:1000;\"><div id=\"rtm-message\" style=\"word-wrap: break-word; white-space: -moz-pre-wrap;white-space: -moz-pre-wrap;width:auto;height:50%;padding-top:10%;padding-left:50px;padding-right:50px;font-family: verdana,sans-serif;font-size: 20px;word-spacing: 0.4pt;\"></div></div>");
		
		/* read to me cancel */
		$("#rtm-cover").prepend("<img id=\"rtm-cancel\" style=\"margin:3px;cursor:pointer;\"alt=\"\" src=\"data:image/png;base64,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\" />");
		
		/* read to me prompt */
		$("body").prepend("<img id=\"rtm-prompt\" alt=\"\" style=\"margin:0px;padding:0px;left:0px;top:0px;z-index:999;display:none;position:fixed;cursor:pointer;\" src=\"data:image/png;base64,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\" />");
	}
		
	function writeMessage(clear){
		if(index < message.length){
			if(clear == true)
				$("#rtm-message").html("");
	
			$("#rtm-message").html($("#rtm-message").html() + message[index++]);
		
			waitTime = speed;
			clear = false;
			
			for(i = 0; i < keys.length; i++){
				if(message.indexOf(keys[i].id, index) == index){
					waitTime = keys[i].time;
					clear = keys[i].clear;
					$("#rtm-message").html($("#rtm-message").html() + message[index++]);
					break;
				}
			}
			
			setTimeout(function(){
				writeMessage(clear);
			}, waitTime);
		}
		else{
			setTimeout(function(){
				$("#rtm-cover").fadeOut(2000);
			}, 3000);
		}	
	}
	
	$("body").mouseup(function(){
		setTimeout(function(){
		message = window.getSelection().toString();
		
		if(message.length != 0)
			$("#rtm-prompt").show();
		else
			$("#rtm-prompt").hide();
		}, 100);
	});
	
	$("#rtm-prompt").live("click", function(){
		if(message.length != 0){
			index = 0;
			$("#rtm-message").html("");
			$("#rtm-cover").fadeIn(2000, function(){
				writeMessage(false);
			});
		}
	});
	
	$("#rtm-cancel").live("click", function(){
		index = message.length;
	});
});

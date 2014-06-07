// ==UserScript==
// @name ignore
// @namespace FBIgnore
// @description ignores users on FB
// @require http://code.jquery.com/jquery-1.3.2.min.js
// @include *facebook.com*
// ==/UserScript==
//
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


function ignore(userName) {
		var ignoreList='';
	if($.cookie("ignoreList") !== null) {
		ignoreList=$.cookie("ignoreList");
	} 
	if(ignoreList.search(userName) == -1) {
		$.cookie("ignoreList", ignoreList + "," + userName, { expires: 99 });
		$("#biatchList").append('<option value="' + userName + '">' + userName + '<\/option>');
		$("span:contains('" + userName + "')").parents("li").remove();
		$(".ignoreButton").remove();
		alert(userName + " is now an ignored biatch.");
	}
	//window.location.reload();
}

function ignoreThread(threadName) {
	newThread=threadName;
	var ignoreThreadList='';
	ignoreThreadList=$.cookie("ignoreThreadList");
	$.each(ignoreThreadList.split(","),function(index,item) {
		if(threadName===item) newThread='';
	});
	if(newThread !== '') {
		$.cookie("ignoreThreadList", ignoreThreadList + "," + threadName, { expires: 7 });
		$("#biatchThreadList").append('<option value="' + threadName + '">' + threadName + '<\/option>');
		$("a:contains('" + threadName + "')").parents(".board_topic").remove();
		$(".ignoreThreadButton").remove();
		alert(threadName + " is now an ignored biatch thread.");
	}
	window.location.reload();
}


function removeIgnoredUserMessages() {
		if($.cookie("ignoreList") !== null) {
			var ignoreList=$.cookie("ignoreList").split(",");
			$.each($(ignoreList), function(index,item) {
				if(item.length > 0 )
					$(".DiscussionThread").find(".actorName:contains('"+item+"'),a:contains('" + item + "')").parents(".pbm,.ptm,.pvm,.actorName,.storyContent").remove();
	
			});
		}

		if($.cookie("ignoreThreadList") !== null) {
			var ignoreThreadList=$.cookie("ignoreThreadList").split(",");
			$.each($(ignoreThreadList), function(index,item) {		
				if(item.length > 0 )
					$(".board_topics").find("a:contains('" + item + "')").parents(".board_topic").remove();
			});
		}
}

function unignore(userName) {
	if(userName === 'All Biatches') 
		$.cookie('ignoreList','');
	else
		$.cookie('ignoreList',$.cookie('ignoreList').replace(','+userName,""));
	window.location.reload();
}

function unignoreThread(threadName) {
	if(threadName === 'All Biatch Threads') 
		$.cookie('ignoreThreadList','');
	else
		$.cookie('ignoreThreadList',$.cookie('ignoreThreadList').replace(','+threadName,""));
	window.location.reload();
}

function init() {
				$(document).ready(function() {
		// init handleing elements

			
			$("#pageHead").css('background-color','#3B5998');
			$("#globalContainer").prepend('<div style="clear:both; background-color:#3B5998;" id="biatchDiv"><a class="biatchButton" style="float:left;color:white;margin-left:5px; margin-top:10px; font-weight:bold;">Biatch\'em<\/a><select style="position:relative;top:5px; float:left; margin-left:5px" id="biatchList"><\/select><select style="position:relative;top:5px; float:left; margin-left:5px;" id="biatchThreadList"><\/select><\/div><div style="clear:both"><\/div>');
			//$("#globalContainer").prepend('<div style="clear:both"><select style="position:relative;top:5px;" id="biatchThreadList"><\/select><\/li><li><a class="biatchButton">Biatch\'em<\/a><\/div>');
			$(".biatchButton").click(function() {
				$(".DiscussionThread").find(".pvm,.pbm,.ptm").prepend('<input type="button" class="ignoreButton" value="Ignore This Biatch"><\/input>');
				$(".board_topic").prepend('<input type="button" style="float:left" class="ignoreThreadButton" value="Ignore This Biatch Thread"><\/input><div style="clear:both"></div>');
				$(".ignoreButton").click(function() {
					ignore($(this).parents("li").find(".actorName").text());
				});
				$(".ignoreThreadButton").click(function() {
					ignoreThread($(this).parents(".board_topic").find("h2").text());
				});
			});
			
		// populate biatch list
		if($.cookie("ignoreList") === null) 
			$.cookie("ignoreList","");
			var biatches=$.cookie("ignoreList").split(",");
			var opts="";
			$.each($(biatches), function(index,item) {
				if(item === "")
					opts='<option value="">Select to Unbiatch<\/option>';
				else
					opts=opts+'<option value="' + item + '">' + item + '<\/option>';

			});
			opts=opts+'<option value="all">All Biatches<\/option>';
			$("#biatchList option").remove();
			$("#biatchList").attr('innerHTML',opts);
	
		// populate biatch thread list
		if($.cookie("ignoreThreadList") === null) 
			$.cookie("ignoreThreadList","");
			var biatchThreads=$.cookie("ignoreThreadList").split(",");
			opts="";
			$.each($(biatchThreads), function(index,item) {
				if(item === "")
					opts='<option value="">Select to Unbiatch Thread<\/option>';
				else
					opts=opts+'<option value="' + item + '">' + item + '<\/option>';

			});
			opts=opts+'<option value="all">All Biatch Threads<\/option>';
			$("#biatchThreadList option").remove();
			$("#biatchThreadList").attr('innerHTML',opts);

			$("#biatchThreadList").change(function () {
				if(confirm('Are you sure you want to unbiatch the thread ' + $(this).val() + '?')) {
					unignoreThread($(this).val());
				}
			});
			$("#biatchList").change(function () {
				if(confirm('Are you sure you want to unbiatch ' + $(this).val() + '?')) {
					unignore($(this).val());
				}
			});
/*
			$(".resetButton").click(function() {
				if(confirm('Are you sure you want to reset the list?')) {
					$.cookie("ignoreList","");
					window.location.reload();
				}
			});
			*/
});removeIgnoredUserMessages();
}
init();
document.addEventListener("DOMNodeInserted", removeIgnoredUserMessages, true);
//document.addEventListener("onLoad", init, true);

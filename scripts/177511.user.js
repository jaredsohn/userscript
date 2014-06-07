// ==UserScript==
// @name        MarketGlory Extended Newspaper
// @namespace   Sn00ch
// @description Extends the newspaper edit/create form and shows min and max requirements in real time.
// @include     http://www.marketglory.com/account/managecompany/*/specialproducts/mod-article*
// @include		http://www.marketglory.com/account/managecompany/*/specialproducts/mod-article-preview*
// @require		http://code.jquery.com/jquery-1.10.2.min.js
// @grant		unsafeWindow
// @version     1
// ==/UserScript==
String.prototype.repeat= function(n){
    n= n || 1;
    return Array(n+1).join(this);
}

var newContent = "";
var oldContent = "";

// Check if one or more requirements are not or no more met to publish article
function checkReq() {
	var iframe = $('#article_bodyIFrame').contents().find("body");
	var valid = true;
	
	// Check article's title
	if ((parseInt($('span.title_count').text()) == 0) || 
		(parseInt($('span.title_count').text()) > 55)) {
		valid = false;
		$('input.article_title').css('background-color','#FF8282');
	} else {
		$('input.article_title').css('background-color','#9FFFB8');
	}
	// Check article's summary
	if ((parseInt($('span.summary_count').text()) == 0) ||
		(parseInt($('span.summary_count').text()) > 500)) {
		valid = false;
		$('textarea.article_summary').css('background-color','#FF8282');
	} else {
		$('textarea.article_summary').css('background-color','#9FFFB8');
	}
	// Check article's content
	if (parseInt($('span.content_count').text()) < 2000) {
		valid = false;
		iframe.css('background-color','#FF8282');
	} else {
		iframe.css('background-color','#9FFFB8');
	}
	
	// Enable / disable save button
	if (valid) {
		$('button[name=fill]').attr('disabled', 'disabled');
		$('button[name=button]').removeAttr('disabled');
	} else {
		$('button[name=button]').attr('disabled', 'disabled');
		$('button[name=fill]').removeAttr('disabled');
	}
}

$(function() {
		var iframe = $('#article_bodyIFrame').contents().find("body");
			// generate basic containers
		$('input.article_title').prev().append(' (<span class="title_count"></span> characters)');
		$('textarea.article_summary').prev().append(' (<span class="summary_count"></span> characters)');
		$('textarea#article_aux').prev().append(' (<span class="content_count"></span> characters)');
		$('form div.right').prepend('<button title="Fill Article" name="fill">Fill missing Characters</button>');

		// Add content to containers
		$('span.title_count').text($('input.article_title').val().length);
		$('span.summary_count').text($('textarea.article_summary').val().length);
		if (iframe.html().length == 26) {
			iframe.text("");
		}
		$('span.content_count').text(iframe.html().length);
		checkReq();
		var regex = /(<([^>]+)>)/ig
					,   body = iframe.html()
					,   oldContent = body.replace(regex, "");
		newContent = oldContent;
		iframe.bind("keyup", function (e) {
			var regex = /(<([^>]+)>)/ig
					,   body = $(this).html()
					,   newContent = body.replace(regex, "");
		if (newContent != oldContent) {
			$('span.content_count').text(newContent.length);
			checkReq();
		}
	});
	$('button[name=fill]').click(function(e) {
    	var minCharsContent = 2000;
		var fillchar = "!";
		var iframe = $('#article_bodyIFrame').contents().find("body");
		
		// check how many characters are neccessary to safe the article
		var charsLeft = minCharsContent - parseInt($('span.content_count').text());
		
		iframe.append('<br><br>');
		while (charsLeft > 0) {
			if (charsLeft < 200) {
				iframe.append(fillchar.repeat(charsLeft));
				charsLeft = 0;
			} else {
				iframe.append(fillchar.repeat(200) + '<br>');
				charsLeft -= 200;
			}
		}
		iframe.trigger("keyup");
		return false;
	});
});

// If title input changes
$('input.article_title').on('change keyup keydown keypress', function() {
    $('span.title_count').text($(this).val().length);
	checkReq();
});

// If summary input changes
$('textarea.article_summary').on('change keyup keydown keypress', function() {
    $('span.summary_count').text($(this).val().length);
	checkReq();
});
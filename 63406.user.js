// ==UserScript==
// @name           IAMA: Show only answered questions.
// @namespace      *.reddit.com
// @description    This script makes an attempt at showing only questions answered by the IAMA poster.
// @include        http://www.reddit.com/r/IAmA/*
// ==/UserScript==

// CONFIG
IAMAQA_config_feature_loadAllComments 	= false; // Capped @ 30 Requests.
IAMAQA_config_style_container 			= 'border:1px solid blue;margin:0 310px 15px 5px;padding:10px 20px';
IAMAQA_config_style_question 			= 'border:3px double green; padding:4px 10px;';
IAMAQA_config_style_answer 				= 'border-left:3px double #00AF37;margin:0 0 15px 15px;padding-left:10px';

function IAMAQA_init() {
	var initHtml = '<div class="sitetable" style="'+IAMAQA_config_style_container+'">';
	initHtml += '<a href="#" onclick="this.parentNode.style.display=\'none\';return false;" style="margin-bottom:10px;display:block;">Hide Me</a>';
	initHtml += '<div id="answeredQuestions">Loading Comments</div>';
	initHtml += '</div>'
	$('div.nestedlisting').prepend(initHtml);
	if(IAMAQA_config_feature_loadAllComments) {
		IAMAQA_loadComments();
	} else {
		IAMAQA_populate();
	}
}

function IAMAQA_populate() {
	var containerObj = $('#answeredQuestions');
	containerObj.html('');
	var containerHtml = '';
	$('a.submitter').each(function(){
		var tempStr = '';
		var answer = $('div.md',$(this).parent().parent()).eq(0).html();
		if(answer) {
			if($('a.bylink',$(this).parent().parent()).eq(1).attr('href')) {
				var questionAnchor = $('a[name="'+($('a.bylink',$(this).parent().parent()).eq(1).attr('href').substr(1))+'"]');
				var question = $('.usertext-body .md', $(questionAnchor).parent().parent()).eq(0).html();
				tempStr += '<div class="md" style="'+IAMAQA_config_style_question+'">'+question + '</div>';
				tempStr += '<div class="md" style="'+IAMAQA_config_style_answer+'">'+answer + '</div>';
				if(containerHtml.indexOf(tempStr) == -1) {
					containerHtml += tempStr;
				}
			}
		} 
	});
	containerObj.html($(containerHtml));
}
IAMAQA_LOAD_COMMENTS_ATTEMPTS = 0;
function IAMAQA_loadComments() {
	if($('span.morecomments a').size() > 0 && IAMAQA_LOAD_COMMENTS_ATTEMPTS < 30) {
		$('span.morecomments a').eq(0).click();
		$('#answeredQuestions').html($('#answeredQuestions').html() + '.');
		IAMAQA_LOAD_COMMENTS_ATTEMPTS++;
		window.setTimeout(function(){IAMAQA_loadComments()}, 500);
	} else {
		IAMAQA_populate();
	}
}

// GM_wait Credit: Reddit - user switcher.
function GM_wait() {  
  jq = navigator.appVersion.search("Safari") != -1 ? jQuery : unsafeWindow.jQuery;
  if(typeof jq == 'undefined'){
    window.setTimeout(GM_wait,100);
  } else {
    $ = jq;
    IAMAQA_init();
  }
}
GM_wait();
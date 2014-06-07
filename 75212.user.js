// ==UserScript==
// @name            t.qq-RT
// @namespace   http://blog.kohana.me
// @description   twitter-like RT for t.qq.com
// @include         http://t.qq.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('.msgCnt').each(function(){
	var html = $(this).html();
	var regExp=/<a ([^>\s]*?) title="([\S]*?)\(@([\S]*?)\)"([^>]*?)>(.*?)<\/a>/ig;
	if(regExp.exec(html)){		
		html = html.replace(regExp,'<a $1 $4>@$3<\/a>');
		$(this).html(html);
	}
});
	

	
//jq extension to set position of cursor and set select range
$.fn.selectRange = function(start, end) {
            return this.each(function() {
                    if(this.setSelectionRange) {
                            this.focus();
                            this.setSelectionRange(start, end);
                    } else if(this.createTextRange) {
                            var range = this.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', end);
                            range.moveStart('character', start);
                            range.select();
                    }
            });
 };

 $('#talkList >li').live("mouseover",function () {
 	if($(this).children('.msgBox').children('.pubInfo').children('.funBox').find('.rt').length == 0)
		$('<a class="rt" href="#">RT</a><span> | </span>').insertAfter($(this).children('.msgBox').children('.pubInfo').children('.funBox').find('.relay + span'));
});
    
$('.rt').live('click',function(){
	var id = $(this).parents('.msgBox').children('.userName').children('strong').children('a').attr('href').substr(1);
	var content = $(this).parents('.msgBox').children('.msgCnt').text();
	var replybox = $(this).parents('.msgBox').children('.replyBox');
	reply = "";
	if(replybox.html()){
		reply = "  | RT @"+replybox.find('.msgBox').find('.msgCnt').text();
	}
	var text = " RT @"+id+" "+content+reply;
	text = text.replace(/@@/g,'@');
	$('#msgTxt').val(text);
	$('#msgTxt')[0].focus();
	$('#msgTxt').selectRange(0,0);
});

//auto check count of words which can be input when typing
$('textarea').live('focus keyup',autocheck);
//auto delete excess words when pressing submit button
$('.sendBtn').live('click',autocheck);

function autocheck(){
	if($('span.countTxt >em').attr('class')){ 
		$('textarea').val($('textarea').val().substr(0,$('textarea').val().length-$('span.countTxt >em').text()-15)+'...');
	}
}
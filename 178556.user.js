// ==UserScript==
// @name       网易下载
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @match      http://v.163.com/special/*
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {
$('#list1').hide();
$('#list2').show();
var cdown = $('#list2 .u-cdown');
var ctitle = $('#list2 .u-ctitle');
var url = $("#list2 .u-cdown a");
var text = $("#list2 .u-ctitle a");
for (var i=0;i<cdown.length;i++) {
    // copy download link
    var button = document.createElement("button");
    button.type='button';
    var href = url[i].href.split('/').pop();
    button.innerHTML=(i+1)+':'+href;
    cdown[i].appendChild(button);
    
    // copy title
    var button1 = document.createElement("button");
    button1.type='button';
    var title = '[第'+(i+1)+'集] '+text[i].text;
    button1.innerHTML=title;
    ctitle[i].appendChild(button1);	
};

// click cdown button, prompt the string needs to be copied!    
$('#list2 .u-cdown button').click(function() {
		//var href = $(this).parent().find('a')[0].href;
    var num = cdown.length-$(this).parent().parent().nextAll().length;
    for (var i=num-1;i<cdown.length;i++) {
    	var href = url[i].href;
		var wp = window.prompt('[第'+(i+1)+'集] ', href);
        if (wp==null) {
		break;
		}
    }
	})

// click ctitle button, prompt the string needs to be copied!
$('#list2 .u-ctitle button').click(function() {
    var num = ctitle.length-$(this).parent().parent().nextAll().length;
    for (var i=num-1;i<ctitle.length;i++) {
    	var title = '[第'+(i+1)+'集] '+text[i].text;
		var wp = window.prompt('[第'+(i+1)+'集] ', title);
        if (wp==null) {
		break;
		}
    }
	})
})


// ==UserScript==
// @name       what am i fucking supposed to tag for again?? updated
// @namespace  http://goosecodes.tumblr.com/
// @version    0.3
// @description  uh this reminds you what you should tag and it also makes it super duper easy and works with the update!!
// @match      http://www.tumblr.com/*
// @match      http://tumblr.com/*
// @copyright  2013+, goose
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

// edit this for your tags!!! make sure there's no comma at the very end and that all of the apostrophes match up

var tags = ['#tag1','#tag2','#tag3','#tag4'];

// now ignore this bit

var untrack = '';

// tagging tips!! (◡‿◡✿)

//	you can put a / or - at the end of the tag 
//	to make sure it doesnt show up in tracked tags. 
// 	to have this script do that automatically for you, 
//	un-comment (remove the // at the beginning of the line) 
// 	either of the below!!

//		var untrack = '/'; 
//		var untrack = '-';

// 	also, it's best practice to add any tw or trigger warning specification at the end 
// 	of the tag, that way people can just add "#tag" to their tumblr savior and it will 
// 	match "#tag tw", "#tag/", and other variations. the more tags you add to 
// 	tumblr savior, the slower it runs, so using "tw:" or "tw" at the beginning of 
// 	the tag makes it harder to blacklist things and also more dangerous because 
//	it loads slower.




// ignore everything from here down!!
// really
















// what are you doing down here

console.log('userscript loaded');

var tagcode = '';

jQuery.each(tags, function(index, value) {
    tagcode += '<p class="remember_tag">' + value + '</p>';
 });

var rtagwrap = '<div id="rtagwrap"><p id="remember">remember to tag:<span id="closertagwrap">x</span></p>' + tagcode + '</div>';

$('body').append(rtagwrap);
$('#rtagwrap').hide();

var pos = $('#dashboard_controls_open_blog').offset();

$('#rtagwrap').css({
    'display': 'none',
    'padding': '15px 0 20px 0',
    'font-size': '14px',
    'color': '#666',
    'background': '#fff',
    'box-shadow': '0 1px 5px rgba(0,0,0,.46)',
    'border-radius': '6px',
    'z-index': '5000',
    'float': 'right',
    'position': 'fixed',
    'left': pos.left,
    'top': pos.top,
    'width': '213px',
    'text-align': 'left',
    'font-family': 'Helvetica Neue'
});

$('#closertagwrap').css({
    'float': 'right',
    'padding-right': '20px'
});

$('.remember_tag').css({
    'margin' : '0',
    'margin-left': '30px',
    'margin-bottom': '3px',
    'text-decoration': 'underline',
    'color': '#888',
    'font-size': '12px'
});

$('#remember').css({
    'margin-top': '0',
    'margin-bottom': '15px',
    'margin-left': '20px',
    'color': '#a8b1ba',
    'font-weight': 'bold'
});

isnew = /\/new\//.test(self.location.href);
isedit = /\/edit\//.test(self.location.href);
isreblog = /\/reblog\//.test(self.location.href);

bumpleft = pos.left + 50;
reblogleft = pos.left + 50;

if (isnew == true) {
	$('#rtagwrap').fadeIn('normal');
} else if (isedit == true) {
    $('#rtagwrap').css({
        'left': bumpleft
    });
	$('#rtagwrap').fadeIn('normal');
} else if (isreblog == true) {
    $('#rtagwrap').css({
        'left': bumpleft
    });    
	$('#rtagwrap').fadeIn('normal');
} else {
	$('#rtagwrap').css({
        'left': pos.left
    });
    $('#rtagwrap').hide();
}

$('.new_post_label, .edit_post').unbind('click').click(function() {    	
    	$('#rtagwrap').css({
    		'left': pos.left
		});
		$('#rtagwrap').fadeIn('normal');   
});

$('.reblog_button').unbind('click').click(function(evt) {
	if (evt.altKey) {
    	//nothing
    } else {
    	var releft = bumpleft;
    	$('#rtagwrap').css({
    		'left': releft
		});
        $('#rtagwrap').fadeIn('normal');
    }
});




$('nav#post_controls button, #closertagwrap').unbind('click').click(function(){
	$('#rtagwrap').fadeOut('normal');
});
//this needs help




$('.remember_tag').hover(function(){
    $(this).css({
        'color': '#aaa',
        'cursor': 'pointer'
    });
},function(){
    $(this).css({
        'color': '#888',
        'cursor': 'auto'
    });
});
$('#closertagwrap').hover(function(){
    $(this).css({
        'color': '#ccc',
        'cursor': 'pointer'
    });
},function(){
    $(this).css({
        'color': '#a8b1ba',
        'cursor': 'auto'
    });
});

$('.remember_tag').click(function() {
    var already = $('input.editor.borderless').val();
   	var addingtag = $(this).text();
	$('input.editor.borderless').val(already + addingtag + untrack + ',');
});
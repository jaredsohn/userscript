// ==UserScript==
// @name       berloga
// @description remove idiotic posts
// @version    0.24
// @match      http://berloga.net/*
// @match      http://berloga.net/view.html?id=*
// @match      http://board.berloga.net/board_topic.html?topic_id=*
// @copyright  2012-2013, Victor Y. Sklyar
// @require    http://code.jquery.com/jquery-latest.js
// ==/UserScript==

alert('Всё равно жаль.');

jQuery.fn.justtext = function() {  
    return $(this).clone().children().remove().end().text(); 
};

var icon = 'http://dl.dropbox.com/u/60777243/block_user.png';

var local = [];
var ul = $('<div></div>').css({'display': 'none'});
var div = $('<div><img src="' + icon + '"></div>').css({
    'position': 'fixed',
    'top': '10px',
    'left': '10px',
    'border': '1px solid red',
    'border-radius': '5px',
    'padding': '5',
    'background': 'white',
    'z-index': '10000',
    'font-weight': 'bold'
});

div.hover(function() {
    ul.css({'display': 'block'});
}, function() {
    ul.css({'display': 'none'});
});

div.append(ul);
$('body').append(div);

var users = [];
try {
    users = JSON.parse(localStorage.getItem('users'));    
}
catch (e) {
    users = [];
}

if (!$.isArray(users)) {
    users = [];    
}

var process = function() {}
var decorate = function() {}
var filter = function() {}
var append_in_list = function(user) {
    if ($.inArray(user, users) != -1 && $.inArray(user, local) == -1) {
       	local.push(user);
       	var li = $('<div>'+user+'</div>').css({
           	'color': 'red',
           	'font-weight': 'normal',
           	'cursor': 'pointer'
       	}).click(function() {
	        users.splice($.inArray(user, users), 1);
   	        localStorage.setItem('users', JSON.stringify(users));
       	    process_filter();
       	});
       	ul.append(li);
   	}    
};

if (document.location.pathname === '/board_topic.html') {
	var els = $('td.user_info');
    
	process = function(cb) {
    	els.each(function(i, e) {
            var t2 = $(e).parent();
            var t1 = $(t2).prev();
            var t3 = $(t2).next();
            
            var td = $(t1).find('td')[0];
            var a = $(td).find('a')[0];
            var user = $(a).html();
            
            cb(user, t1, t2, t3);            
    	});
    };
    
    decorate = function(user, t1, t2, t3) {
        
        var text = t3.find('td')[1];
        var title = $(text).justtext().trim().substring(3).trim();
        t3.remove();
        
        $(t2).find('.avatar img').attr('title', title);
       
        var el = $('<img src="' + icon + '">').css({
            'z-index': '2',
            'position': 'absolute',
            'right': '15px',
            'top': '10px',
            'display': 'none',
            'cursor': 'pointer'
        });
        
        $(t2).hover(function() {
    		el.css({'display': 'block'});
		}, function() {
    		el.css({'display': 'none'});
		});
        
        var user_info = $(t2).find('.user_info').css('position', 'relative').append(el).click(function() {
   			users.push(user);
        	localStorage.setItem('users', JSON.stringify(users));
        	process_filter();
		});        
    };
    
	filter = function(user, t1, t2, t3) {
            var display = $.inArray(user, users) != -1 ? 'none' : 'table-row';
        
            $(t1).css('display', display);
            $(t2).css('display', display);
            $(t3).css('display', display);
        
            append_in_list(user);
	};    
}
else if (document.location.pathname === '/view.html') {
	var boxes = $('.round_box');
	process = function(cb) {
    	boxes.each(function(i, e) {
        	var profile = $(e).find('.left .right .user .profile');
        	if (profile) {
            	var user = profile.html();
            	if (user) {
                	cb(user, e);
            	}
        	}
    	});
	};
	   
    decorate = function(user, e) {
       
        var el = $('<img src="' + icon + '">').css({
            'z-index': '2',
            'position': 'absolute',
            'right': '15px',
            'top': '20px',
            'display': 'none',
            'cursor': 'pointer'
        });
        
        $(e).hover(function() {
    		el.css({'display': 'block'});
		}, function() {
    		el.css({'display': 'none'});
		});

        // subtitle text
        var title = $(e).find('.message').justtext().trim().substring(3).trim();
        
        // input subtitle text in avatar image title
        $(e).find('.avatar img').attr('title', title);           
               
        // remove subtitle        
        var bbcode = $(e).find('.bbcode').detach();
        $(e).find('.message').empty().append(bbcode);

        // move rest of .message in separate .subtitle
       	//var bbcode = $(e).find('.bbcode').detach();
        //$(e).find('.message').contents().wrapAll('<div id="subtitle" style="display: none;"></div>');
        //$(e).find('.message').prepend(bbcode);
        
        
        var user_info = $(e).find('.left .right .comment .info').css('position', 'relative').append(el).click(function() {
            users.push(user);
        	localStorage.setItem('users', JSON.stringify(users));
        	process_filter();
		});        
    };    
    
	filter = function(user, e) {
    	$(e).css('display', $.inArray(user, users) != -1 ? 'none' : 'block');
        
		append_in_list(user);
	};    
}
var process_filter = function() {
    local = [];
    ul.html('');
    process(filter);
};

process(decorate);
process_filter();
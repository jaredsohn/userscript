// ==UserScript==
// @name         PoE forums ignore list
// @namespace    http://userscripts.org/scripts/show/162657
// @version      0.5
// @description  hide unwanted users on PoE forums
// @match        http://www.pathofexile.com/forum/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright    2013+, Syl
// ==/UserScript==

var ignore_list = GM_getValue('list');
if (!ignore_list)
    ignore_list = [];
else
    ignore_list = ignore_list.split(',');

function add_css(text) { 
    var head = document.getElementsByTagName('head')[0]; 
    if (!head)
        return;
    var style = document.createElement('style'); 
    style.type = "text/css"; 
    style.innerHTML = text; 
    head.appendChild(style); 
} 
add_css("\
.ignored { \
    background-image: none !important; \
    background-color: #100 !important; \
} \
.reduced { \
    overflow: hidden; \
    background-color: #300 !important; \
} \
.reduced div, .reduced .content { \
    min-height: 0px !important; \
    height: 0px !important; \
    overflow: hidden; \
} \
 tr .ignore_button { display: none; } \
tr:hover .ignore_button { display: inline; } \
.ignore_button { \
    position: absolute; \
    margin-left: 190px; \
    background: url('http://webcdn.pathofexile.com/image/colorbox/controls.png') no-repeat -25px 0; \
    width: 25px; \
    height: 25px; \
    text-indent: -9999px; \
} \
.ignore_button:hover { \
    background-position: -25px -25px; \
} \
");

function ignore(obj) {
    obj.addClass('ignored reduced');
    obj.click(function() {
        if ($(this).hasClass('ignored'))
            $(this).toggleClass('reduced');
    });
}

$('.post_info_content').prepend($('<a class="ignore_button" href="javascript:void(0)">ignore</a>').click(function() {
    var tr = $(this).parents('tr');
    user = tr.find('.posted-by .profile-link')[0].text;
    if (ignore_list.indexOf(user) >= 0) {
        ignore_list.splice(ignore_list.indexOf(user), 1);
        tr.removeClass('ignored reduced');
        tr.unbind('click');
    }
    else {
        ignore_list.push(user);
        ignore(tr);
    }
    GM_setValue('list', ignore_list.join(','));
}));

var users = $('.posted-by .profile-link').filter(function(index){
	for (var i in ignore_list)
		if (this.text == ignore_list[i])
			return true;
	return false;
});
ignore(users.parents('tr'));

GM_setValue('list', ignore_list.join(','));

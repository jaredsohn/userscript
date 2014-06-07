// ==UserScript==
// @name        Linux.org.ru Thread Update Checker
// @namespace   lor
// @homepage	http://userscripts.org/scripts/show/162150
// @updateURL	https://userscripts.org/scripts/source/162150.meta.js
// @downloadURL	https://userscripts.org/scripts/source/162150.user.js
// @include     http://www.linux.org.ru/forum/*/*
// @include     http://www.linux.org.ru/news/*/*
// @include     http://www.linux.org.ru/gallery/*/*
// @version     1.4
// ==/UserScript==

var last_msg = jQuery('.msg:last .sign time:last').html();
var last_page = jQuery('.page-number:not(:contains(→)):last').html() || 1;
var titl = document.title;

//load & compare functions
	function send(){
		jQuery.ajax( 
			document.location.href.split('#')[0], 
			{
				success:function(data){
					complete(data)
				}
			}
		)

		console.log('send...');
	}

		function complete (data) {
			var last_msg_load = jQuery('.msg:last .sign time:last',data).html();
			var last_page_load = jQuery('.page-number:not(:contains(→)):last',data).html() || 1;

			if ( (last_msg_load != last_msg) || (last_page_load != last_page) ) { 
				document.title='New!';	//update title
				addNotif();				//add notification span
				clearInterval(timer);	//stop checker
			}

			console.log('['+last_msg_load+' -- '+last_msg+']      ['+last_page_load+' -- '+last_page+']');

		}

//start check timer
var timer = setInterval(send,20000);

//set title to default on focus
document.onfocus=function(){document.title=titl}



//add notification span function
function addNotif(){

	var notif = jQuery('<span></span>')
	.bind('mouseenter', //fadeOut on mouseenter
		function(){
			jQuery(this).fadeOut();
		}
	)
	.css({
		position: 'fixed',
		'box-shadow': '0 0 12px #779',
		'background-color': '#ccc',
		'font-size': '14px',
		padding: '4px',
		color: 'blue',
		'text-shadow': '0 0 1px gray',
		'border-radius': '6px 0 0 6px',
		top: '10%',
		right: '-3px'
	})
	.html('Новые сообщения !!11 ')
	.addClass('notif');

	jQuery('body').append(notif);

}
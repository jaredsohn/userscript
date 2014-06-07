// ==UserScript==
// @name        Facebook Friends Deleter (on wall)
// @description It allows you to delete Facebook friends. on wall
// @include			http://facebook.com/
// @include			http://*.facebook.com/
// @include			https://facebook.com/
// @include			https://*.facebook.com/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     1.0
// ==/UserScript==


var i = 0;
function sleep() {
	setInterval(function() {
		replace_msg()
	}, 1000);
}

function replace_msg() {
	$('div.dialog_body').html(i + ' friend(s) deleted. contact me <a href="https://www.facebook.com/alcantara.ren">fb/ren</a>');
}
  

set_timer()
$(".i_delete").live("click", function() {
		i = i + parseInt('1');
		var uid = $(this).attr('id');
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriend.php').setData({ uid: " + uid + ",norefresh:true }).send();";
		document.body.appendChild(a);
		sleep();
});
function set_timer() {
	setInterval(function() {
		set_button()
	}, 1000);
}

function set_button() {
	$('.storyInnerContent').each(function(index) {
			var extract_url = $(this).find('a').attr('data-hovercard');
			if (!extract_url) {
				var extract_url = $(this).find('a').attr('ajaxify');
			}
			if (!extract_url) {
				extract_url = '1';
			}
			var uid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
			if (!$(this).children().hasClass('i_delete')) {
				$(this).prepend(' <input type="submit" class="i_delete _11b uiButton uiButtonConfirm" style="color:fff;" id="' + uid + '" value="Delete">');
			}
	});
}
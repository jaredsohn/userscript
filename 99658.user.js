// ==UserScript==
// @name           twitter.unfollower
// @namespace      Twitter Unfolower
// @description    Unfollowing Twitter Users
// @author Sergey Shmidt
// @include        http://twitter.com/following*
// @include        https://twitter.com/following*
// ==/UserScript==


//Подключаем jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 2000); }
}
GM_wait();

function letsJQuery() { 
	
	i = 0;

	int = setInterval(function(){
                var wtf = location.href.split('/');
		userid = $('.user.following').attr('id').substr(5);
		unflwstr = wtf[0]+"//twitter.com/friendships/destroy/"+userid;
		auth = $('#authenticity_token').val();
		$.ajax({
			type: 'POST',
			url: unflwstr,
			data: "authenticity_token="+auth+"&twttr=true"
		});
		$('#user_'+userid).remove();

		i++;
		if(i >= 20){	
			window.location.reload();
		}
	}, 800);
}


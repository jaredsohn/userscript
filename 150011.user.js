// ==UserScript==
// @name		kg_timeout_alert
// @author		un4given (u.menya.vse@zzzae.biz), originally by Andre Macareno
// @version		2.0
// @description	beeps before game start
// @include		http://klavogonki.ru/g/*
// @include		http://www.klavogonki.ru/g/*
// ==/UserScript==

//----

function init()
{
	//prevent execution in iframes (FF especially likes this)
	if (parent.location.href != self.location.href) return;

	setTimeout(function() {

		soundManager.createSound('to_alert', '/typo.mp3');
	
		game.to_alert_timer = setInterval(
			function(){
				time = document.getElementById('waiting_timeout').innerHTML;
				if (time == "00:10" || time == "00:05" || time == "00:04" || time == "00:03") soundManager.play("to_alert");
				if (time == "00:00") clearInterval(game.to_alert_timer);
			}, 500);
	}, 1000);
}

//inject script
var s = document.createElement('script');
s.innerHTML = '(' + init + ')();';
document.body.appendChild(s);
// ==UserScript==
// @name		AlertStartGame
// @author		Fenex, un4given (u.menya.vse@zzzae.biz), originally by Andre Macareno
// @version		3.0
// @description	beeps before game start
// @include		http://klavogonki.ru/g/*
// @include		http://www.klavogonki.ru/g/*
// ==/UserScript==

function try_inject_script()
{
	if(!game) {
		setTimeout(try_inject_script, 500);
		return;
	}
	
	if(game.params.timeout < 45) {
		return;
	}
	
	soundManager.createSound('to_alert', 'http://klavogonki.ru/typo.mp3');
	
	game.to_alert_timer = setInterval(
		function() {
			var time = document.getElementById('waiting_timeout').innerHTML.match(/(\d{2}).(\d{2})/);
			if(!time || time.length!=3)
				return;
			var sec = parseInt(time[2]);
			var min = parseInt(time[1]);
			if(min == 0 && sec < 10) {
				if(game.to_alert_timer)
					clearInterval(game.to_alert_timer);
				//console.log('play');
				soundManager.play("to_alert");
			}
		}, 500);
	
}

function init()
{
	//prevent execution in iframes (FF especially likes this)
	if (parent.location.href != self.location.href)
		return;
	setTimeout(try_inject_script, 500);
}

var s = document.createElement('script');
s.innerHTML = try_inject_script + '('+init+')();';
document.body.appendChild(s);
